import time

from bs4 import BeautifulSoup as bs
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait


def search(query, driver):
    """
    Searches for a given query on Amazon and extracts product details.

    Parameters:
        query: The search query.
        driver: Selenium WebDriver instance.

    Returns: Lists of product names, prices, links, images, and brands.
    """
    url = f"https://www.amazon.in/s?k={query.replace(' ', '+')}"

    try:
        driver.get(url)
        time.sleep(1)
        # Wait for products to load
        WebDriverWait(driver, 15).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "div.s-result-item"))
        )

        # Add a small delay to ensure all elements are loaded
        time.sleep(2)

        # Parse the page source
        soup = bs(driver.page_source, "html.parser")

        # Get all product sections
        product_sections = soup.find_all("div", class_="a-section a-spacing-base")

        if not product_sections:
            return None, None, None, None, None

        return extract_product_data(product_sections)

    except Exception as e:
        return None, None, None, None, None


def extract_product_data(product_sections):
    """
    Extracts product data from the found product sections.

    Parameters:
        product_sections: List of product section elements

    Returns: Lists of product names, prices, links, images, and brands.
    """
    names = []
    prices = []
    links = []
    images = []
    brands = []

    try:
        # Process up to 5 products
        count = 0
        for section in product_sections:
            # Skip if we already have 5 products
            if count >= 5:
                break

            # Skip if this is not a product section (some sections might be ads or other content)
            if not section.find("h2", class_="a-size-base-plus") and not section.find(
                "h2", class_="a-size-mini"
            ):
                continue

            # Extract brand
            brand_element = section.find("span", class_="a-size-base-plus a-color-base")
            if not brand_element:
                brand_element = section.find("h2", class_="a-size-mini").find("span")

            brand = brand_element.text.strip() if brand_element else "N/A"

            # Extract product name
            name_element = section.find("h2", class_="a-size-base-plus")
            if not name_element:
                name_element = section.find("h2", class_="a-size-mini")

            if name_element and name_element.find("span"):
                name = name_element.find("span").text.strip()
            else:
                name = "N/A"

            # Extract price (updated to include ₹ symbol)
            price_element = section.find("span", class_="a-price-whole")
            if price_element:
                # Get the price text and add ₹ if not already present
                price_text = price_element.text.strip()
                if price_text and not price_text.startswith("₹"):
                    price_text = f"₹{price_text}"
                price = price_text
            else:
                # Check for alternative price element (a-offscreen)
                price_element = section.find("span", class_="a-offscreen")
                if price_element:
                    price_text = price_element.text.strip()
                    price = price_text if price_text else "₹N/A"
                else:
                    price = "₹N/A"

            # Extract link
            link_element = section.find("a", class_="a-link-normal s-no-outline")
            if not link_element:
                link_element = section.find(
                    "a", class_="a-link-normal s-underline-text"
                )

            link = link_element.get("href") if link_element else "N/A"
            if link != "N/A" and not link.startswith("http"):
                link = "https://www.amazon.in" + link

            # Extract image
            img_element = section.find("img", class_="s-image")
            image = img_element.get("src") if img_element else "N/A"

            # Only add valid products
            if name != "N/A" and price != "₹N/A" and link != "N/A" and image != "N/A":
                names.append(name)
                prices.append(price)
                links.append(link)
                images.append(image)
                brands.append(brand)
                count += 1

        return names, prices, links, images, brands

    except Exception as e:
        return None, None, None, None, None