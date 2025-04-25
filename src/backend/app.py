import json
import os
import subprocess
import sys
import threading
import time
from functools import wraps
from pathlib import Path

import firebase_admin
from firebase_admin import auth, credentials, initialize_app
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)

# Improved CORS configuration - single source of truth
cors_config = {
    "origins": ["https://minstyle.netlify.app", "http://localhost:8080"],
    "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    "allow_headers": ["Authorization", "Content-Type"],
    "supports_credentials": True,
    "max_age": 86400
}

# Initialize CORS with the configuration
CORS(app, resources={r"/api/*": cors_config})

# Get the root directory of the project
BASE_DIR = Path(__file__).parent.parent

# Global variable to track scraping status
scraping_in_progress = False
last_scrape_start_time = 0

def initialize_firebase():
    # Get Firebase config from environment variables
    firebase_config = {
        "type": os.environ.get("FIREBASE_TYPE"),
        "project_id": os.environ.get("FIREBASE_PROJECT_ID"),
        "private_key_id": os.environ.get("FIREBASE_PRIVATE_KEY_ID"),
        "private_key": os.environ.get("FIREBASE_PRIVATE_KEY").replace('\\n', '\n'),
        "client_email": os.environ.get("FIREBASE_CLIENT_EMAIL"),
        "client_id": os.environ.get("FIREBASE_CLIENT_ID"),
        "auth_uri": os.environ.get("FIREBASE_AUTH_URI"),
        "token_uri": os.environ.get("FIREBASE_TOKEN_URI"),
        "auth_provider_x509_cert_url": os.environ.get("FIREBASE_AUTH_PROVIDER_CERT_URL"),
        "client_x509_cert_url": os.environ.get("FIREBASE_CLIENT_CERT_URL")
    }
    
    # Validate that we have all required config
    if not all(firebase_config.values()):
        raise ValueError("Missing one or more required Firebase environment variables")
    
    # Create credentials from the config dictionary
    cred = credentials.Certificate(firebase_config)
    initialize_app(cred)

try:
    initialize_firebase()
except Exception as e:
    print(f"Failed to initialize Firebase: {str(e)}")
    # Exit if Firebase is critical for your app
    # sys.exit(1)

# Custom exception for Firebase errors
class FirebaseAuthError(Exception):
    def __init__(self, message, code=401):
        super().__init__(message)
        self.code = code

# Optimized Firebase authentication decorator
def firebase_authenticated(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        # Skip authentication for OPTIONS requests (CORS preflight)
        if request.method == 'OPTIONS':
            return f(*args, **kwargs)
            
        auth_header = request.headers.get("Authorization")
        if not auth_header:
            raise FirebaseAuthError("Authorization header is missing", 401)

        if not auth_header.startswith("Bearer "):
            raise FirebaseAuthError(
                "Invalid authorization header format. Expected 'Bearer <token>'", 401
            )

        try:
            token = auth_header.split(" ")[1]
            decoded_token = auth.verify_id_token(token)
            request.user = decoded_token
        except auth.ExpiredIdTokenError:
            raise FirebaseAuthError("Token has expired", 401)
        except auth.RevokedIdTokenError:
            raise FirebaseAuthError("Token has been revoked", 401)
        except auth.InvalidIdTokenError:
            raise FirebaseAuthError("Token is invalid", 401)
        except Exception as e:
            raise FirebaseAuthError(f"Authentication failed: {str(e)}", 401)

        return f(*args, **kwargs)
    return decorated_function

# Error handler for Firebase auth errors
@app.errorhandler(FirebaseAuthError)
def handle_firebase_auth_error(e):
    response = jsonify({"error": str(e)})
    response.status_code = e.code
    return response

# Global after_request handler for CORS headers
@app.after_request
def add_cors_headers(response):
    # Only add CORS headers for API routes
    if request.path.startswith('/api/'):
        response.headers.add('Access-Control-Allow-Origin', ', '.join(cors_config['origins']))
        response.headers.add('Access-Control-Allow-Headers', ', '.join(cors_config['allow_headers']))
        response.headers.add('Access-Control-Allow-Methods', ', '.join(cors_config['methods']))
        response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response

# Authentication routes
@app.route("/api/auth/signup", methods=["POST", "OPTIONS"])
def signup():
    if request.method == "OPTIONS":
        return jsonify({"status": "ok"}), 200
        
    data = request.get_json()
    if not data or "email" not in data or "password" not in data:
        return jsonify({"error": "Email and password are required"}), 400

    try:
        user = auth.create_user(email=data["email"], password=data["password"])
        return jsonify({
            "uid": user.uid,
            "email": user.email,
            "email_verified": user.email_verified,
        }), 201
    except auth.EmailAlreadyExistsError:
        return jsonify({"error": "Email already exists"}), 400
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": f"User creation failed: {str(e)}"}), 500

@app.route("/api/auth/login", methods=["POST", "OPTIONS"])
def login():
    if request.method == "OPTIONS":
        return jsonify({"status": "ok"}), 200
        
    data = request.get_json()
    if not data or "idToken" not in data:
        return jsonify({"error": "ID token is required"}), 400

    try:
        decoded_token = auth.verify_id_token(data["idToken"])
        return jsonify({
            "uid": decoded_token["uid"],
            "email": decoded_token["email"],
            "email_verified": decoded_token.get("email_verified", False),
        }), 200
    except Exception as e:
        return jsonify({"error": f"Token verification failed: {str(e)}"}), 401

# Protected routes
@app.route("/api/auth/verify", methods=["POST", "OPTIONS"])
@firebase_authenticated
def verify_token():
    if request.method == "OPTIONS":
        return jsonify({"status": "ok"}), 200
    return jsonify({"user": request.user, "message": "Token is valid"}), 200

@app.route("/api/auth/user", methods=["GET", "OPTIONS"])
@firebase_authenticated
def get_user():
    if request.method == "OPTIONS":
        return jsonify({"status": "ok"}), 200
        
    try:
        user = auth.get_user(request.user["uid"])
        return jsonify({
            "uid": user.uid,
            "email": user.email,
            "email_verified": user.email_verified,
            "display_name": user.display_name,
            "photo_url": user.photo_url,
        }), 200
    except auth.UserNotFoundError:
        return jsonify({"error": "User not found"}), 404
    except Exception as e:
        return jsonify({"error": f"Failed to get user: {str(e)}"}), 500

# Other protected routes follow the same pattern...

@app.route("/api/search", methods=["POST", "OPTIONS"])
@firebase_authenticated
def handle_search():
    if request.method == "OPTIONS":
        return jsonify({"status": "ok"}), 200
        
    global scraping_in_progress, last_scrape_start_time
    data = request.get_json()

    required_fields = ["style", "color", "vibe", "gender", "event"]
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400

    try:
        if scraping_in_progress:
            return jsonify({
                "status": "Scraping already in progress",
                "message": "Products will be available shortly",
            })

        scraping_in_progress = True
        last_scrape_start_time = time.time()

        def run_scraper():
            global scraping_in_progress
            try:
                scraper_path = BASE_DIR / "backend" / "scraping" / "scraper.py"
                cmd = [
                    sys.executable,
                    str(scraper_path),
                    "--style", data["style"],
                    "--color", data["color"],
                    "--vibe", data["vibe"],
                    "--gender", data["gender"],
                    "--event", data["event"],
                ]

                process = subprocess.Popen(
                    cmd,
                    stdout=subprocess.PIPE,
                    stderr=subprocess.PIPE,
                    cwd=str(BASE_DIR / "backend" / "scraping"),
                )
                process.communicate()

            except Exception as e:
                print(f"Error in scraper thread: {str(e)}")
            finally:
                scraping_in_progress = False

        threading.Thread(target=run_scraper).start()

        return jsonify({
            "status": "Scraping started",
            "message": "Products will be available shortly",
        })

    except Exception as e:
        scraping_in_progress = False
        return jsonify({"error": str(e)}), 500

@app.route("/api/products", methods=["GET", "OPTIONS"])
@firebase_authenticated  
def get_products():
    if request.method == "OPTIONS":
        return jsonify({"status": "ok"}), 200
        
    global scraping_in_progress, last_scrape_start_time

    try:
        base_dir_parent = BASE_DIR.parent
        products_path = base_dir_parent / "_cache" / "products.json"

        if scraping_in_progress:
            if time.time() - last_scrape_start_time < 300:
                return jsonify({
                    "status": "pending", 
                    "message": "Products are being fetched"
                }), 202
            scraping_in_progress = False
            return jsonify({"error": "Products not found after timeout"}), 404

        if not products_path.exists():
            return jsonify({"error": "Products not found"}), 404

        with open(products_path, "r") as f:
            products = json.load(f)

        return jsonify({"status": "success", "products": products})

    except json.JSONDecodeError:
        return jsonify({"error": "Error parsing products data"}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5002, debug=True)