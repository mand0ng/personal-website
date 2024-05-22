import os, subprocess
from flask import Flask, jsonify, Blueprint, request
from flask_sqlalchemy import SQLAlchemy
from apscheduler.schedulers.background import BackgroundScheduler
from flask_cors import CORS
from dotenv import load_dotenv
from datetime import datetime, timezone
import requests
import uuid
import time
import threading

db = SQLAlchemy()
load_dotenv()

# REACT_APP_SOCKET_URL = os.getenv("REACT_APP_SOCKET_URL", "http://localhost:3001")
# REACT_APP_SOCKET_URL = os.getenv("REACT_APP_SOCKET_URL", "http://localhost/ws")
EXPRESS_SERVER = "https://my-personal-website-craqo.ondigitalocean.app/exp"

class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(128), unique=True, nullable=False)
    active = db.Column(db.Boolean(), default=True, nullable=False)

    def __init__(self, email):
        self.email = email

class ProductResult(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(1000))
    img = db.Column(db.String(1000))
    url = db.Column(db.String(1000))
    price = db.Column(db.Float)
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))
    search_text = db.Column(db.String(255))
    source = db.Column(db.String(255))

    def __init__(self, name, img, url, price, search_text, source):
        self.name = name
        self.url = url
        self.img = img
        self.price = price
        self.search_text = search_text
        self.source = source

class TodaysProductDeal(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(1000))
    img = db.Column(db.String(1000))
    url = db.Column(db.String(1000))
    promo = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))

    def __init__(self, name, img, url, promo):
        self.name = name
        self.img = img
        self.url = url 
        self.promo = promo

def create_app():

    app = Flask(__name__)
    app.config.from_object("config.Config")
    
    db.init_app(app)

    CORS(app)


    # Initialize scheduler / cron
    scheduler = BackgroundScheduler()
    scheduler.start()

    def my_cron_job():
        print("This is a cron job!")

    # cron for testing, runs every minute
    scheduler.add_job(my_cron_job, trigger='cron', minute='*')

    # # cron for testing, runs every 1 am 
    # scheduler.add_job(my_cron_job, trigger='cron', hour=1, minute=0)
    


    ### Helpers ###
    def res(response, code):
        return jsonify(response), 200
    

    def delay_method(data):
        time.sleep(3)
        pass_data_to_websocket(data)
        return
    
    
    def pass_data_to_websocket(data):

        express_endpoint = 'http://localhost:3001/data-from-flask'
        # express_endpoint = EXPRESS_SERVER + '/data-from-flask'
        print("pass_data_to_websocket:", express_endpoint)
        # try:
        response = requests.post(express_endpoint, json=data)
        print("pass_data_to_websocket response :", response)
        if response.status_code == 200:
            print("Data passed to Express inside WebSocket successfully")
        else:
            print("Failed to pass data to Express inside WebSocket")
        # except Exception as e:
            # print("Error:", e)

        return

    
    def procces_scraped_data(results, mode):
        MODE_1 = os.getenv("SCRAPER_MODE_1", "1")
        MODE_2 = os.getenv("SCRAPER_MODE_2", "2")

        print("Processing data with mode:", mode)

        # save to db 
        if mode == MODE_2:

            # delete previous data 
            TodaysProductDeal.query.delete()

            for result in results:
                product = TodaysProductDeal(
                    name=result.get("name"),
                    img=result.get("img"),
                    url=result.get("url"),
                    promo=result.get("promo")
                )
                db.session.add(product)
            db.session.commit()
            print("submit_results: mode==2, saving results to db")
        elif mode == MODE_1:
            pass_data_to_websocket(results)
            print("submit_results: mode==1, passing results to ws")

        return
    
    
    def run_scraper(url, search_text, mode, session_id):
        # command = f"python3 ./scraper/__init__.py {url} \"{search_text}\" /api/results {mode} {session_id}"
        command = f"python3 ./scraper/__init__.py {url} \"{search_text}\" /api/results {mode} {session_id}"
        subprocess.Popen(command, shell=True)
        
        # DEBUG..
        # pass_data_to_websocket({"hello":"world", "session_id": session_id})
        # data = {"hello":"world", "session_id": session_id}
        # thread = threading.Thread(target=delay_method, args=(data,))
        # thread.start()


    ### "/api/*" ###
    api_bp = Blueprint('api', __name__, url_prefix='/api')

    @api_bp.route("/test", methods=["GET"])
    def test():
        return res({"message": "Hello World"}, 200)

    @api_bp.route("/search", methods=["POST"])
    def search():
        url = "https://amazon.ca"
        search_text = request.json.get('search_text')
        session_id = str(uuid.uuid4())

        run_scraper(url,search_text, os.getenv("SCRAPER_MODE_1", "1"), session_id)

        return res({'message': 'Scraper Initialized', "session_id": session_id}, 200)
        

    @api_bp.route('/results', methods=['POST'])
    def submit_results():
        data = request.json
        results = data.get('data')
        mode = data.get("mode")
        session_id = data.get("session_id")

        print("Received data:", data)

        procces_scraped_data(results, mode)

        # pass_data_to_websocket(results)

        print("submit_results: done")
        return res({'message': 'Pass data to WS successfully'}, 200)
        

    @api_bp.route("/fetch-todays-deal", methods=["GET"])
    def fetch_todays_deal():
        print("fetch_todays_deal: fetching todays product deals")
        todays_product_deals = TodaysProductDeal.query.all()

        # if len(todays_product_deals) == 0:
        #     # call scraper
        #     url = "https://amazon.ca"
        #     search_text = "test"
        #     mode = 2
        #     run_scraper(url, search_text, mode)


        data = []
        for product in todays_product_deals:
            item = {
                "name":product.name,
                "img_url":product.img,
                "promo":product.promo,
                "url":product.url
            }
            data.append(item)

        print("fetch_todays_deal: ", len(todays_product_deals) )


        return res({"data":data}, 200)
        
    
    # BLUEPRINTS 
    app.register_blueprint(api_bp)

    return app