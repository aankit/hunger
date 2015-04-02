from food_api import app
from food_api import db

class Food(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String(200))
	group = db.Column(db.String(200))

	def __init__(self, name, group):
		self.name = name
		self.group = group

	def __repr__(self):
		return '<Food %r>' % self.name

class Water(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	gallons = db.Column(db.Integer)
	usage = db.Column(db.String(200))
	food_id = db.Column(db.Integer, db.ForeignKey('food.id'))
	food = db.relationship('Food', backref=db.backref('water', lazy='dynamic'))

	def __init__(self, gallons, usage, food_id):
		self.gallons = gallons
		self.usage = usage
		self.food_id = food_id

	def __repr__(self):
		return '<Water %r>' % self.gallons

class Environment(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String(200))
	category = db.Column(db.String(200))
	food_id = db.Column(db.Integer, db.ForeignKey('food.id'))
	food = db.relationship('Food', backref='environment')

	def __init__(self, name, category, food_id):
		self.name = name.title()
		self.category = category.title()
		self.food_id = food_id

	def __repr__(self):
		return '<Environment %r>' % self.name

class People(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String(200))
	consumption = db.Column(db.Integer)
	culture = db.Column(db.String(200))
	income = db.Column(db.Integer)
	food_id = db.Column(db.Integer, db.ForeignKey('food.id'))
	food = db.relationship('Food', backref='people')

	def __init__(self, name, consumption, culture, income, food_id):
		self.name = name.title()
		self.consumption = consumption
		self.culture = culture.title()
		self.income = income.title()
		self.food_id = food_id

	def __repr__(self):
		return '<People %r>' % self.name

class Policy(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String(200))
	locale = db.Column(db.String(200))
	food_id = db.Column(db.Integer, db.ForeignKey('food.id'))
	food = db.relationship('Food', backref='policy')

	def __init__(self, name, locale, food_id):
		self.name = name.title()
		self.category = locale.title()
		self.food_id = food_id

	def __repr__(self):
		return '<Food %r>' % self.name

class Fuel(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String(200))
	quantity = db.Column(db.Integer)
	food_id = db.Column(db.Integer, db.ForeignKey('food.id'))
	food = db.relationship('Food', backref='fuel')

	def __init__(self, name, quantity, food_id):
		self.name = name.title()
		self.quantity = quantity
		self.food_id = food_id

	def __repr__(self):
		return '<Fuel %r>' % self.name

# models for which we want to create API endpoints
app.config['API_MODELS'] = { 'food': Food, 
	'water': Water, 
	'environment': Environment, 
	'people': People, 
	'policy': Policy, 
	'fuel': Fuel
	}

# # models for which we want to create CRUD-style URL endpoints,
# # and pass the routing onto our AngularJS application
# app.config['CRUD_URL_MODELS'] = { 'post': Post }
