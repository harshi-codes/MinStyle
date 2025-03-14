import time

from bs4 import BeautifulSoup as bs
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait


def search(query, driver):
    """
    Searches for a given query on Rare Rabbit and extracts product details.
    """
    url = f"https://thehouseofrare.com/search?q={query.replace(' ', '+')}"

    try:
        driver.get(url)
        time.sleep(1)
        # Wait for product containers to load
        WebDriverWait(driver, 15).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, ".product-detail"))
        )

        # Scroll down multiple times to ensure images load
        for _ in range(3):
            driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            time.sleep(1)
            driver.execute_script("window.scrollTo(0, 0);")
            time.sleep(1)

        # Wait for lazyloaded images to appear
        WebDriverWait(driver, 10).until(
            lambda d: d.find_elements(By.CSS_SELECTOR, "img[data-srcset], img[srcset]")
        )

        # Small extra wait to ensure images have time to load
        time.sleep(2)

        soup = bs(driver.page_source, "html.parser")
        product_containers = soup.find_all("div", class_="product-detail")[:5]

        if not product_containers:
            print("No results found. Possible class name change.")
            return None, None, None, None, None

        return extract_product_data(product_containers)

    except Exception as e:
        print(f"Error in search function: {e}")
        return None, None, None, None, None


def extract_product_data(product_containers):
    """
    Extracts product data from the parsed HTML.
    """
    base_url = "https://thehouseofrare.com"
    names, prices, links, images, brands = [], [], [], [], []

    try:
        for product in product_containers:
            # Get product name and subtitle
            name_tag = product.find("h3", class_="main-title")
            sub_title_tag = product.find("h4", class_="sub-title")
            product_name = name_tag.text.strip() if name_tag else "No Name"
            sub_title = sub_title_tag.text.strip() if sub_title_tag else ""
            names.append(f"{product_name} - {sub_title}" if sub_title else product_name)

            # Brand is always Rare Rabbit
            brands.append("Rare Rabbit")

            # Get price and discount price
            price_tag = product.find("span", class_="regular-price")
            discount_tag = product.find("span", class_="best-price-text")
            price = price_tag.text.strip() if price_tag else "N/A"
            discount_price = discount_tag.text.strip() if discount_tag else None
            prices.append(f"{price} ({discount_price})" if discount_price else price)

            # Get product link
            link_tag = product.find("a", class_="product-link")
            product_link = (
                base_url + link_tag["href"]
                if link_tag and link_tag.get("href")
                else "No Link"
            )
            links.append(product_link)

            # Extract image by navigating to the parent container
            try:
                # Get the parent div that contains the product-detail
                parent_container = product.parent

                # From the parent, find the img tag within the product-main-inner
                if parent_container:
                    # Find the product-main-inner div which contains the image
                    product_main_inner = parent_container.find(
                        "div", class_="product-main-inner"
                    )

                    if product_main_inner:
                        # Find image within the product-main-inner
                        # First look for image-link which contains the img tag
                        image_link = product_main_inner.find("a", class_="image-link")

                        if image_link:
                            # Try to find the img tag
                            img_tag = image_link.find("img")

                            if img_tag:
                                # Check for data-srcset (lazy loading attribute)
                                data_srcset = img_tag.get("data-srcset")
                                if data_srcset:
                                    # Get highest resolution image
                                    highest_res = data_srcset.split(",")[-1].split()[0]
                                    images.append(highest_res)
                                    continue

                                # Check for srcset (already loaded images)
                                srcset = img_tag.get("srcset")
                                if srcset:
                                    highest_res = srcset.split(",")[-1].split()[0]
                                    images.append(highest_res)
                                    continue

                                # Try data-src attribute
                                data_src = img_tag.get("data-src")
                                if data_src:
                                    images.append(data_src)
                                    continue

                                # Fallback to src attribute
                                src = img_tag.get("src")
                                if src:
                                    images.append(src)
                                    continue

                                images.append("No Image")
                            else:
                                images.append("No Image")
                        else:
                            # If no image-link found, try to find any img tag
                            img_tag = product_main_inner.find("img")
                            if img_tag:
                                src = img_tag.get("data-src") or img_tag.get("src")
                                if src:
                                    images.append(src)
                                else:
                                    images.append("No Image")
                            else:
                                images.append("No Image")
                    else:
                        # If no product-main-inner, try to find image in the parent container
                        img_tag = parent_container.find("img")
                        if img_tag:
                            src = img_tag.get("data-src") or img_tag.get("src")
                            if src:
                                images.append(src)
                            else:
                                images.append("No Image")
                        else:
                            images.append("No Image")
                else:
                    images.append("No Image")
            except Exception as e:
                print(f"Error extracting image: {e}")
                images.append("No Image")

        return names, prices, links, images, brands

    except Exception as e:
        print(f"Error in extract_product_data: {e}")
        return None, None, None, None, None
