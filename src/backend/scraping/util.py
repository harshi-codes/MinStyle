import json
import os
import platform
import shutil

from selenium import webdriver
from selenium.webdriver.chrome.options import Options as ChromeOptions
from selenium.webdriver.edge.options import Options as EdgeOptions
from selenium.webdriver.firefox.options import Options as FirefoxOptions


def openBrowser():
    """
    Initializes and returns a Selenium WebDriver instance based on the operating system.

    Supported browsers:
    - Windows: Microsoft Edge (headless mode)
    - macOS/Linux: Uses Chrome or Firefox if available; otherwise, falls back to Safari.

    Returns:
        webdriver instance: An initialized WebDriver object.

    Raises:
        Exception: If no supported browser is found.
    """
    os_name = platform.system()

    if os_name == "Windows":
        options = EdgeOptions()
        options.add_argument("--headless")  # Run in headless mode
        options.add_argument("--disable-gpu")
        options.add_argument(
            "user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        )
        return webdriver.Edge(options=options)

    elif os_name in ["Darwin", "Linux"]:  # macOS or Linux
        if shutil.which("google-chrome") or shutil.which("chrome"):
            options = ChromeOptions()
            options.add_argument("--headless")
            options.add_argument(
                "user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
            )
            return webdriver.Chrome(options=options)

        elif shutil.which("firefox"):
            options = FirefoxOptions()
            options.add_argument("--headless")
            options.add_argument(
                "user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
            )
            return webdriver.Firefox(options=options)

        elif os_name == "Darwin":  # macOS Safari (no headless mode)
            driver = webdriver.Safari()
            driver.execute_script(
                "navigator.__defineGetter__('userAgent', () => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')"
            )
            return driver

        else:
            raise Exception("No supported browser found. Install Chrome or Firefox.")

    else:
        raise Exception("Unsupported OS. Only Windows, macOS, and Linux are supported.")


def storeInJson(site, **values):
    """
    Stores extracted data into a JSON file inside a cache directory.

    If the file already exists, the function will update its contents with new data.

    Parameters:
        site (str): The name of the site, used to create the JSON file name.
        **values: Arbitrary keyword arguments representing the data to be stored.

    Returns:
        None
    """
    # Making the JSON file
    file = site + ".json"
    cache_dir = os.path.join(
        os.path.dirname(os.path.abspath(__file__)), "..", "..", "..", "_cache"
    )
    filename = os.path.join(cache_dir, file)

    # Ensure the cache directory exists
    os.makedirs(cache_dir, exist_ok=True)

    try:
        # Load existing data if the file exists
        try:
            with open(filename, "r", encoding="utf-8") as file:
                data = json.load(file)

            # If the existing data is a list, convert it to a dictionary
            if isinstance(data, list):

                data = {}  # Reset to an empty dictionary

        except (FileNotFoundError, json.JSONDecodeError):
            data = {}

        # Merge new values into the existing dictionary
        data.update(values)

        # Save updated data back to the file
        with open(filename, "w", encoding="utf-8") as file:
            json.dump(data, file, indent=4, ensure_ascii=False)

        print(f"Data stored successfully in {filename}!")

    except Exception as e:
        print(f"Error: {e}")


def scrape(module_name, query, driver):
    """
    Search for products using the specified module and store results in JSON.

    Parameters:
        module_name: The module name to use (e.g., 'amazon', 'myntra')
        query: The search query string
        driver: Selenium WebDriver instance
        limit: Maximum number of products to retrieve (default: 5)

    Returns:
        dict: The product data that was stored in JSON
    """
    try:
        # Dynamically import the module
        module = __import__(module_name)

        # Extract product data
        names, prices, links, images, brands = module.search(query, driver)

        # Store results in JSON if valid data is found
        if names and prices and links and images and brands:
            product_data = {
                f"P{i+1}": {
                    "name": n,
                    "price": f"{p}",
                    "link": l,
                    "image": img,
                    "brand": b,
                }
                for i, (n, p, l, img, b) in enumerate(
                    zip(names, prices, links, images, brands)
                )
                if i < 5
            }

            # Store in JSON file using the provided module name
            storeInJson(module_name, **product_data)

            return product_data
        else:
            print(f"No valid product data found from {module_name}")
            return None

    except ImportError:
        print(f"Module '{module_name}' not found")
        return None
    except Exception as e:
        print(f"Error searching with {module_name}: {e}")
        return None
