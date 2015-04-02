import os
from food_api import app

def runserver():
	port = int(os.environ.get('PORT', 3000))
	app.run('0.0.0.0', port=port)

if __name__ == '__main__':
	runserver()