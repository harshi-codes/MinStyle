import concurrent.futures
import threading
import time

import query_prompt
import util

# TODO: If a site doesnt provide any results, program will ignore that json file and show the results of other.
# TODO: Add a failsafe incase all the sites fails to show results.
# TODO: Make a proper log file instead of printing it on terminal.


def scrape_site(name, query):
    start_time = time.time()
    driver = util.openBrowser()
    try:
        result = util.scrape(name, query, driver)
        elapsed = time.time() - start_time
        print(f"✅ {name} completed in {elapsed:.2f}s")
        return name, result
    except Exception as e:
        print(f"❌ Error in {name} scraper: {e}")
        return name, None
    finally:
        driver.quit()


def main():
    # Get user input
    query = query_prompt.prompt_to_query()

    results = {}
    sites = ["amazon", "myntra", "ajio", "rare_rabbit", "westside"]

    print(f"Starting scraping for query: '{query}'")
    start_time = time.time()

    with concurrent.futures.ThreadPoolExecutor(max_workers=len(sites)) as executor:
        # Start all scrapers at once
        future_to_site = {
            executor.submit(scrape_site, site, query): site for site in sites
        }

        # Process results as they complete
        for future in concurrent.futures.as_completed(future_to_site):
            site_name, result = future.result()
            if result:
                results[site_name] = result

    # Calculate total time
    total_time = time.time() - start_time

    # Print a summary of results
    print(f"\nScraping complete in {total_time:.2f} seconds! Summary:")
    for site, result in results.items():
        if result:
            product_count = len(result)
            print(f"✅ {site}: {product_count} products found")
        else:
            print(f"❌ {site}: No products found")

    print(f"\nResults saved to cache directory.")
    return results


if __name__ == "__main__":
    main()
