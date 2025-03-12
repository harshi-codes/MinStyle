import time

import query_prompt
import util

# Get user input
query = query_prompt.prompt_to_query()

driver = util.openBrowser()

# TODO: Add multithreading for scrapers
a = util.scrape("amazon", query, driver)
time.sleep(2)
b = util.scrape("myntra", query, driver)
driver.quit()

time.sleep(2)
driver = util.openBrowser()
c = util.scrape("ajio", query, driver)

driver.quit()
