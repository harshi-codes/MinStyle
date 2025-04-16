import json
import os
import subprocess
import sys
import threading
import time
from pathlib import Path

from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Get the root directory of the project
BASE_DIR = Path(__file__).parent.parent

# Global variable to track scraping status
scraping_in_progress = False
last_scrape_start_time = 0


# Route to handle the search request
@app.route("/api/search", methods=["POST"])
def handle_search():
    global scraping_in_progress, last_scrape_start_time
    data = request.get_json()

    # Validate required fields
    required_fields = ["style", "color", "vibe", "gender", "event"]
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400

    try:
        # Check if scraping is already in progress
        if scraping_in_progress:
            return jsonify(
                {
                    "status": "Scraping already in progress",
                    "message": "Products will be available shortly",
                }
            )

        # Set scraping flag
        scraping_in_progress = True
        last_scrape_start_time = time.time()

        # Run the scraper in a separate thread to avoid blocking
        def run_scraper():
            global scraping_in_progress
            try:
                # Prepare the command to run your scraper
                scraper_path = BASE_DIR / "backend" / "scraping" / "scraper.py"
                print(scraper_path)
                cmd = [
                    sys.executable,  # Uses the same Python interpreter
                    str(scraper_path),
                    "--style",
                    data["style"],
                    "--color",
                    data["color"],
                    "--vibe",
                    data["vibe"],
                    "--gender",
                    data["gender"],
                    "--event",
                    data["event"],
                ]

                # Print the command for debugging
                print(f"Running command: {' '.join(cmd)}")

                # Run the scraper with the correct working directory
                process = subprocess.Popen(
                    cmd,
                    stdout=subprocess.PIPE,
                    stderr=subprocess.PIPE,
                    cwd=str(
                        BASE_DIR / "backend" / "scraping"
                    ),  # Run from scraping directory
                )
                stdout, stderr = process.communicate()

                if process.returncode != 0:
                    print(f"Scraper error: {stderr.decode()}")
                else:
                    print(f"Scraper output: {stdout.decode()}")

            except Exception as e:
                print(f"Error in scraper thread: {str(e)}")
            finally:
                scraping_in_progress = False

        # Start the scraper in a background thread
        threading.Thread(target=run_scraper).start()

        return jsonify(
            {
                "status": "Scraping started",
                "message": "Products will be available shortly",
            }
        )

    except Exception as e:
        scraping_in_progress = False
        return jsonify({"error": str(e)}), 500


# Products endpoint with polling support
@app.route("/api/products", methods=["GET"])
def get_products():
    global scraping_in_progress, last_scrape_start_time

    try:
        products_path = BASE_DIR / ".." / "_cache" / "products.json"

        # Check if scraping is in progress or if file exists
        if scraping_in_progress or not products_path.exists():
            # If scraping started recently (within last 5 minutes), wait
            if time.time() - last_scrape_start_time < 300:  # 5 minutes timeout
                return (
                    jsonify(
                        {"status": "pending", "message": "Products are being fetched"}
                    ),
                    202,
                )  # Accepted status code
            else:
                return jsonify({"error": "Products not found after timeout"}), 404

        # If we get here, products should be available
        with open(products_path, "r") as f:
            products = json.load(f)

        return jsonify({"status": "success", "products": products})

    except json.JSONDecodeError:
        return jsonify({"error": "Error parsing products data"}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5002, debug=True)
