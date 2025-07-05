from flask import Flask
from routes import router
from models import Base
from dbconnect import engine


app = Flask(__name__)
app.register_blueprint(router)
Base.metadata.create_all(bind=engine)
