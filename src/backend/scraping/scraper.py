import time

import query_prompt
import util

# Get user input
query = query_prompt.prompt_to_query()

driver = util.openBrowser()

# TODO: Add multithreading for scrapers
# TODO: MAYBE and a big MAYBE add a whole ass thrift store

a = util.scrape("amazon", query, driver)
time.sleep(2)
b = util.scrape("myntra", query, driver)
driver.quit()

time.sleep(2)
driver = util.openBrowser()
c = util.scrape("ajio", query, driver)
driver.quit()

time.sleep(2)
driver = util.openBrowser()
d = util.scrape("rare_rabbit", query, driver)
driver.quit()

time.sleep(2)
driver = util.openBrowser()
e = util.scrape("westside", query, driver)
driver.quit()
