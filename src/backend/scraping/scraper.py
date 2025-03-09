import ajio
import amazon
import myntra
import util

# Get user input
query = input("Enter query: ")

## Ask gemini to get the query in good form
## I need a specific clothing search recommendation. Based on these parameters:
## - Style: [insert style]
## - Color: [insert color]
## - Vibe: [insert vibe]
## - Gender: [insert gender]
## - Event: [insert event]
##
## Give me a single, concise search term without slashes or brackets that combines all these elements. Keep it under 10 words so it works effectively on e-commerce sites.

driver = util.openBrowser()

# Extract product data
names, prices, links, images, brands = myntra.search(query, driver)

# Store results in JSON if valid data is found
if names and prices and links and images and brands:
    product_data = {
        f"P{i+1}": {"name": n, "price": f"{p}", "link": l, "image": img, "brand": b}
        for i, (n, p, l, img, b) in enumerate(zip(names, prices, links, images, brands))
    }

    util.storeInJson("myntra", **product_data)

driver.quit()
