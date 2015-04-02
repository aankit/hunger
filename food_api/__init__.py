import os
import json
from flask import Flask, request, Response
from flask import render_template, send_from_directory, url_for
from flask.ext.sqlalchemy import SQLAlchemy
from flask.ext.restless import APIManager

app = Flask(__name__)

app.config.from_object('food_api.settings')

app.url_map.strict_slashes = False

db = SQLAlchemy(app)

api_manager = APIManager(app, flask_sqlalchemy_db=db)

import food_api.routes

