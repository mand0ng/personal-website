import os
from dotenv import load_dotenv

load_dotenv()

basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):
    SQLALCHEMY_DATABASE_URI = os.getenv("DB_URL", "postgresql://root:root@postgres:5432/postgres_db")
    SQLALCHEMY_TRACK_MODIFICATIONS = False