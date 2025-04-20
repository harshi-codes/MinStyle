import argparse
import concurrent.futures
import sys
import threading
import time

import query_prompt
import util
from merge_products import merge_and_randomize_products

input_files = [
	"ajio.json",
	"amazon.json",
	"myntra.json",
	"rare_rabbit.json",
	"westside.json",
]
output_file = "products.json"


def scrape_site(name, query):
	print("Starting the scraper")
	start_time = time.time()
	driver = util.openBrowser()
	try:
		result = util.scrape(name, query, driver)
		elapsed = time.time() - start_time
		util.log(f"✅ {name} completed in {elapsed:.2f}s")
		return name, result
	except Exception as e:
		util.log(f"❌ Error in {name} scraper: {e}")
		return name, None
	finally:

		driver.quit()


def main():
	# Set up argument parser
	parser = argparse.ArgumentParser(description="Fashion product scraper")
	parser.add_argument("--style", required=True, help="Clothing style")
	parser.add_argument("--color", required=True, help="Color preference")
	parser.add_argument("--vibe", required=True, help="Desired vibe")
	parser.add_argument("--gender", required=True, help="Gender")
	parser.add_argument("--event", required=True, help="Event type")

	args = parser.parse_args()

	# Generate query using the provided arguments
	query = query_prompt.generate_from_args(
		args.style, args.color, args.vibe, args.gender, args.event
	)

	if not query:
		util.log("❌ Failed to generate search query")
		return

	results = {}
	sites = ["amazon", "myntra", "ajio", "rare_rabbit", "westside"]

	util.log(f"Starting scraping for query: '{query}'")
	start_time = time.time()

	with concurrent.futures.ThreadPoolExecutor(max_workers=len(sites)) as executor:
		future_to_site = {
			executor.submit(scrape_site, site, query): site for site in sites
		}

		for future in concurrent.futures.as_completed(future_to_site):
			site_name, result = future.result()
			if result:
				results[site_name] = result

	total_time = time.time() - start_time
	util.log(f"\nScraping complete in {total_time:.2f} seconds! Summary:")
	for site, result in results.items():
		if result:
			product_count = len(result)
			util.log(f"✅ {site}: {product_count} products found")
		else:
			util.log(f"❌ {site}: No products found")

	util.log(f"\nResults saved to cache directory.")
	merge_and_randomize_products(input_files, output_file)


if __name__ == "__main__":
	main()
