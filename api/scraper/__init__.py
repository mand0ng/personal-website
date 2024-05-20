from main import main, todays_deal_scraper
import sys
import asyncio
import os
from dotenv import load_dotenv

if __name__ == '__main__':
    # Extract command-line arguments
    if len(sys.argv) < 5:
        print('Usage: python -m package_name url search_text endpoint')
        sys.exit(1)

    load_dotenv()
    MODE_1 = os.getenv("SCRAPER_MODE_1", "1")
    MODE_2 = os.getenv("SCRAPER_MODE_2", "2")
    
    url = sys.argv[1]
    search_text = sys.argv[2]
    endpoint = sys.argv[3]
    mode = sys.argv[4]
    session_id = sys.argv[5]

    # Run the scraper asynchronously
    if mode == MODE_1:
        asyncio.run(main(url, search_text, endpoint, session_id))
        # print("mode1: " +mode)
    else:
        # print("mode2: " +mode)
        asyncio.run(todays_deal_scraper(url, endpoint))
    