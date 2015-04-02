import os

from flask import Flask, request, Response
from flask import render_template, url_for, redirect, send_from_directory
from flask import send_file, make_response, abort

from food_api import app

# routing for API endpoints (generated from the models designated as API_MODELS)
from food_api import api_manager
from food_api.models import *

for model_name in app.config['API_MODELS']:
	model_class = app.config['API_MODELS'][model_name]
	api_manager.create_api(model_class, methods=['GET', 'POST'])