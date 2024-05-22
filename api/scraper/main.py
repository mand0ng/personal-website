import asyncio
from playwright.async_api import async_playwright
import json
import os
from amazon import get_product as get_amazon_product, get_todays_deal_product as get_product_deal
from requests import post
from dotenv import load_dotenv

load_dotenv()

AMAZON = "https://amazon.ca"
# API_BASE_URL = os.getenv("API_BASE_URL", "http://localhost:5000")
# API_BASE_URL = "http://localhost"
API_BASE_URL = "https://my-personal-website-craqo.ondigitalocean.app"

URLS = {
    AMAZON: {
        "search_field_query": 'input[name="field-keywords"]',
        "search_button_query": 'input[value="Go"]',
        "product_selector": "div.s-card-container"
    }
}

available_urls = URLS.keys()


# def load_auth():
#     FILE = os.path.join("scraper", "auth.json")
#     with open(FILE, "r") as f:
#         return json.load(f)


# cred = load_auth()
# auth = f'{cred["username"]}:{cred["password"]}'
# browser_url = f'wss://{auth}@{cred["host"]}'


async def search(metadata, page, search_text):
    print(f"Searching for {search_text} on {page.url}")
    search_field_query = metadata.get("search_field_query")
    search_button_query = metadata.get("search_button_query")

    if search_field_query and search_button_query:
        print("Filling input field")
        search_box = await page.wait_for_selector(search_field_query)
        await search_box.type(search_text)
        print("Pressing search button")
        button = await page.wait_for_selector(search_button_query)
        await button.click()
    else:
        raise Exception("Could not search.")

    await page.wait_for_load_state()
    return page


async def get_products(page, search_text, selector, get_product):
    print("Retreiving products.")
    product_divs = await page.query_selector_all(selector)
    valid_products = []
    words = search_text.split(" ")

    async with asyncio.TaskGroup() as tg:
        for div in product_divs:
            async def task(p_div):
                product = await get_product(p_div)

                if not product["price"] or not product["url"]:
                    return

                for word in words:
                    if not product["name"] or word.lower() not in product["name"].lower():
                        break
                else:
                    valid_products.append(product)

            tg.create_task(task(div))

    return valid_products

async def get_todays_deal(page, selector, get_product):
    print("Retreving products")
    valid_products = []
    product_divs = await page.query_selector_all(selector)
    
    async with asyncio.TaskGroup() as tg:
        for div in product_divs:
            async def task(p_div):
                product = await get_product(p_div)
                valid_products.append(product)

            await tg.create_task(task(div))

    return valid_products


def save_results(results):
    data = {"results": results}
    FILE = os.path.join("Scraper", "results.json")
    with open(FILE, "w") as f:
        json.dump(data, f)


def post_results(results, endpoint, mode, search_text=None, source=None, session_id=None):
    headers = {
        "Content-Type": "application/json"
    }
    
    data = {"data": {"results":results, "session_id":session_id}, "mode": mode}

    if search_text is not None:
        data["search_text"] = search_text
    if source is not None:
        data["source"] = source

    print("Sending request to", endpoint)
    response = post(API_BASE_URL + endpoint,
                    headers=headers, json=data)
    print("Status code:", response.status_code)

# url = amazon.ca 
# search text 
# /results
async def main(url, search_text, response_route, session_id):
    metadata = URLS.get(url)
    if not metadata:
        print("Invalid URL.")
        return

    async with async_playwright() as pw:
        print('Connecting to browser.')
        # browser = await pw.chromium.connect_over_cdp(browser_url)
        browser = await pw.chromium.launch()
        page = await browser.new_page()
        print("Connected.")
        await page.goto(url, timeout=120000)
        print("Loaded initial page.")
        search_page = await search(metadata, page, search_text)

        def func(x): return None
        if url == AMAZON:
            func = get_amazon_product
        else:
            raise Exception('Invalid URL')

        results = await get_products(search_page, search_text, metadata["product_selector"], func)
        print("Saving results.")
        MODE_1 = os.getenv("SCRAPER_MODE_1", "1")
        post_results(results, response_route, MODE_1, search_text, url, session_id)

        await browser.close()


async def todays_deal_scraper(url, response_route):

    async with async_playwright() as pw:
        print("Connecting to browser")
        browser = await pw.chromium.launch()
        page = await browser.new_page()
        print("Connected")
        await page.goto(url, timeout=120000)
        print("Loaded initial page.")

        selector = "li.feed-carousel-card._deals-shoveler-v2_style_dealCard__1HqkZ._deals-shoveler-v2_style_dealCardMinHeight__3YZz0"
        results = await get_todays_deal(page, selector, get_product_deal)
        print("Saving results")

        MODE_2 = os.getenv("SCRAPER_MODE_2", "2")
        post_results(results, response_route, MODE_2)

        await browser.close()


if __name__ == "__main__":
    # test script
    asyncio.run(main(AMAZON, "ryzen 9 3950x"))