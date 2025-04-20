import json
import os
import random
from pathlib import Path
from typing import List

import util


def merge_and_randomize_products(
	input_filenames: List[str], output_filename: str
) -> None:
	"""
	Merge products from multiple JSON files in _cache folder, randomize their order,
	add website info, and save to a new file.

	Args:
		input_filenames: List of JSON filenames (not full paths) from _cache folder
		output_filename: Filename for the merged JSON (will be saved in _cache folder)
	"""
	# Get the root directory (go up 3 levels from current script location)
	script_dir = Path(__file__).parent
	root_dir = script_dir.parent.parent.parent
	cache_dir = root_dir / "_cache"

	all_products = []

	for filename in input_filenames:
		try:
			file_path = cache_dir / filename
			# Extract website name from filename (without extension)
			website = os.path.splitext(filename)[0]
			website = website.replace('_', ' ').title()

			with open(file_path, "r", encoding="utf-8") as f:
				data = json.load(f)

				# Extract P1-P5 products and add website field
				for key in sorted(data.keys()):
					if (
						key.startswith("P")
						and key[1:].isdigit()
						and 1 <= int(key[1:]) <= 7
					):
						product = data[key]
						product["website"] = website
						all_products.append(product)

		except Exception as e:
			util.log(f"Error processing file {filename}: {str(e)}")
			continue

	# Randomize the order of products
	random.shuffle(all_products)

	# Create output path
	output_path = cache_dir / output_filename

	# Save to output file
	with open(output_path, "w", encoding="utf-8") as f:
		json.dump(all_products, f, indent=2, ensure_ascii=False)

	util.log(f"Successfully merged {len(all_products)} products to {output_path}")
