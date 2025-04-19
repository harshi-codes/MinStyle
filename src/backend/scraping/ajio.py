import time
import util
from bs4 import BeautifulSoup as bs
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait


def search(query, driver):
    """
    Searches for a given query on Ajio and extracts basic product details.

    Parameters:
        query: The search query entered by the user.
        driver: Selenium WebDriver instance.

    Returns: lists of product names, prices, brands, links, and images.
    """
    url = f"https://www.ajio.com/search/?text={query.replace(' ', '%20')}"

    try:
        driver.get(url)
        time.sleep(1)
        # Wait for products to load
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located(
                (By.CSS_SELECTOR, "div.item.rilrtl-products-list__item")
            )
        )

        # Add a small delay to let any lazy-loaded content appear
        WebDriverWait(driver, 3).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "img.rilrtl-lazy-img"))
        )

        # Parse the page source
        soup = bs(driver.page_source, "html.parser")

        # Extract all product containers
        product_containers = soup.find_all(
            "div", class_="item rilrtl-products-list__item item"
        )[:5]

        if not product_containers:
            util.log("No results found. Possible class name change.")
            return None, None, None, None, None  # Return 5 None values

        return extract_product_data(product_containers)

    except Exception as e:
        util.log(f"Error: {e}")
        return None, None, None, None, None

    finally:
        driver.quit()


def extract_product_data(product_containers):
    """
    Extracts product data from the parsed HTML.

    Parameters:
        product_containers: List of product elements (div.item.rilrtl-products-list__item)

    Returns: Lists of product names, prices, links, images, and brands.
    """
    base_url = "https://www.ajio.com"
    names, prices, links, images, brands = [], [], [], [], []

    try:
        for product in product_containers:
            # Extract product link
            link_tag = product.find("a", class_="rilrtl-products-list__link")
            if link_tag and link_tag.get("href"):
                product_link = (
                    base_url + link_tag.get("href")
                    if not link_tag.get("href").startswith("http")
                    else link_tag.get("href")
                )
                links.append(product_link)
            else:
                links.append("No Link")

            # Extract product name
            name_tag = product.find("div", class_="nameCls")
            names.append(name_tag.text.strip() if name_tag else "No Name")

            # Extract brand name
            brand_tag = product.find("div", class_="brand")
            brand_name = (
                brand_tag.strong.text.strip()
                if brand_tag and brand_tag.strong
                else "No Brand Name"
            )
            brands.append(brand_name)

            # Extract the FINAL price (sale price if available)
            sale_price_div = product.find("div", class_="_305pl _243Gp")
            if sale_price_div:
                sale_price_span = sale_price_div.find("div")  # Find inner div containing sale price
                if sale_price_span:
                    # Keep the original price text (with ₹ symbol if present)
                    sale_price_text = sale_price_span.text.strip()
                    if sale_price_text:
                        # If ₹ is not already present, add it
                        if not sale_price_text.startswith("₹"):
                            sale_price_text = f"₹{sale_price_text}"
                        prices.append(sale_price_text)
                    else:
                        prices.append("₹N/A")
                else:
                    prices.append("₹N/A")
            else:
                # No sale price, use the regular price
                price_tag = product.find("span", class_="price")
                if price_tag:
                    price_text = price_tag.text.strip()
                    if price_text:
                        # If ₹ is not already present, add it
                        if not price_text.startswith("₹"):
                            price_text = f"₹{price_text}"
                        prices.append(price_text)
                    else:
                        prices.append("₹N/A")
                else:
                    prices.append("₹N/A")

            # Extract product image
            img_tag = product.find("img")
            images.append(
                img_tag["src"] if img_tag and img_tag.has_attr("src") else "No Image"
            )

        return names, prices, links, images, brands

    except Exception as e:
        util.log("Error in extract_ajio_product_data:", e)
        return None, None, None, None, None