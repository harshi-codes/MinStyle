import os
from functools import wraps

import firebase_admin
from firebase_admin import auth, credentials
from flask import jsonify, request


def initialize_firebase():
    # Try to get config from environment variables first
    firebase_config = {
        "type": os.getenv('FIREBASE_TYPE', 'service_account'),
        "project_id": os.getenv('FIREBASE_PROJECT_ID'),
        "private_key_id": os.getenv('FIREBASE_PRIVATE_KEY_ID'),
        "private_key": os.getenv('FIREBASE_PRIVATE_KEY').replace('\\n', '\n'),
        "client_email": os.getenv('FIREBASE_CLIENT_EMAIL'),
        "client_id": os.getenv('FIREBASE_CLIENT_ID'),
        "auth_uri": os.getenv('FIREBASE_AUTH_URI', 'https://accounts.google.com/o/oauth2/auth'),
        "token_uri": os.getenv('FIREBASE_TOKEN_URI', 'https://oauth2.googleapis.com/token'),
        "auth_provider_x509_cert_url": os.getenv('FIREBASE_AUTH_PROVIDER_CERT_URL', 'https://www.googleapis.com/oauth2/v1/certs'),
        "client_x509_cert_url": os.getenv('FIREBASE_CLIENT_CERT_URL')
    }
    
    # Check if all required environment variables are present
    if all(firebase_config.values()):
        cred = credentials.Certificate(firebase_config)
    else:
        # Fall back to file if environment variables aren't set
        service_account_path = BASE_DIR / "backend" / "config" / "firebase_service_account.json"
        if not service_account_path.exists():
            raise FileNotFoundError(
                "Firebase configuration not found in environment variables or file"
            )
        cred = credentials.Certificate(str(service_account_path))
    
    firebase_admin.initialize_app(cred)


# Custom exception for Firebase errors
class FirebaseAuthError(Exception):
    def __init__(self, message, code=401):
        super().__init__(message)
        self.code = code


# Decorator to protect routes that require authentication
def firebase_authenticated(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        # Get the authorization token from the header
        auth_header = request.headers.get("Authorization")
        if not auth_header:
            raise FirebaseAuthError("Authorization header is missing", 401)

        # Extract the token (format: Bearer <token>)
        try:
            token = auth_header.split(" ")[1]
        except IndexError:
            raise FirebaseAuthError("Invalid authorization header format", 401)

        try:
            # Verify the token
            decoded_token = auth.verify_id_token(token)
            request.user = decoded_token  # Store user info in request object
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


# User management functions
class FirebaseAuthManager:
    @staticmethod
    def create_user(email, password):
        try:
            user = auth.create_user(email=email, password=password)
            return {
                "uid": user.uid,
                "email": user.email,
                "email_verified": user.email_verified,
            }
        except auth.EmailAlreadyExistsError:
            raise FirebaseAuthError("Email already exists", 400)
        except ValueError as e:
            raise FirebaseAuthError(str(e), 400)
        except Exception as e:
            raise FirebaseAuthError(f"User creation failed: {str(e)}", 500)

    @staticmethod
    def verify_user(token):
        try:
            decoded_token = auth.verify_id_token(token)
            return decoded_token
        except Exception as e:
            raise FirebaseAuthError(f"Token verification failed: {str(e)}", 401)

    @staticmethod
    def get_user(uid):
        try:
            user = auth.get_user(uid)
            return {
                "uid": user.uid,
                "email": user.email,
                "email_verified": user.email_verified,
                "display_name": user.display_name,
                "photo_url": user.photo_url,
            }
        except auth.UserNotFoundError:
            raise FirebaseAuthError("User not found", 404)
        except Exception as e:
            raise FirebaseAuthError(f"Failed to get user: {str(e)}", 500)

    @staticmethod
    def update_user(uid, **kwargs):
        try:
            user = auth.update_user(uid, **kwargs)
            return {
                "uid": user.uid,
                "email": user.email,
                "email_verified": user.email_verified,
                "display_name": user.display_name,
                "photo_url": user.photo_url,
            }
        except auth.UserNotFoundError:
            raise FirebaseAuthError("User not found", 404)
        except Exception as e:
            raise FirebaseAuthError(f"Failed to update user: {str(e)}", 500)

    @staticmethod
    def delete_user(uid):
        try:
            auth.delete_user(uid)
            return {"success": True}
        except auth.UserNotFoundError:
            raise FirebaseAuthError("User not found", 404)
        except Exception as e:
            raise FirebaseAuthError(f"Failed to delete user: {str(e)}", 500)

    @staticmethod
    def generate_password_reset_link(email):
        try:
            link = auth.generate_password_reset_link(email)
            return {"reset_link": link}
        except auth.UserNotFoundError:
            raise FirebaseAuthError("User not found", 404)
        except Exception as e:
            raise FirebaseAuthError(f"Failed to generate reset link: {str(e)}", 500)

    @staticmethod
    def generate_email_verification_link(email):
        try:
            link = auth.generate_email_verification_link(email)
            return {"verification_link": link}
        except auth.UserNotFoundError:
            raise FirebaseAuthError("User not found", 404)
        except Exception as e:
            raise FirebaseAuthError(
                f"Failed to generate verification link: {str(e)}", 500
            )
