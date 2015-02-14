// var titleScreen();

var Game = function(familyNames){
	//how big is the game, this will be important to creating
	//a balanced world
	var squareWidth = 20;
	this.boardSize = displayWidth/squareWidth * displayHeight/squareWidth;
	this.board = 
	this.families = [];
	strokeWeight(0.2);
	stroke(100,150,75);
	for(i=0;i<=displayWidth;i+=20){
		line(i, 0, i, displayHeight);
	}
	for (j=0;j<displayHeight;j+=20){
		line(0, j, displayWidth, j);
	}
	//next places the families
	for (i=0;i<familyNames.length;i++){
		var familyHome = {
			x: random(0,displayWidth),
			y: random(0,displayHeight)
		};
		this.families.push(new Family(familyNames[i], familyHome));
	}
	//then setup resources the resources - 
	//fresh water, salt water, arable land, forest, mountain, desert, ice
	//let's use real percentages to set up the game
	//and climate change to change the game
	//create the grid first
	strokeWeight(0.2);
	stroke(100,150,75);
	this.world={
		freshWater: 5,
		saltWater: 70,
		mountains: 5,
		arableLand: 5,
		forest: 5,
		desert: 5,
		ice: 5
	};
	//create a map wiht resources and families
	this.map = {};
	//what if we iterate over the entire map one resource at a time? sure, why not
	for (resource in this.world){
		r = random();
		r *= 
	}
		// for(i=0;i<displayWidth;i+=squareWidth){
		// 	for (j=0;j<displayHeight;j+=squareWidth){
				
		// 	}
		// }
};

var Actor = function(age, lifespan, links){
  //this.uid = uid;
	this.age = age;
	this.lifespan= lifespan;
	this.links = links;
	this.size = this.links*10;
	this.getFill = function(){
		var red;
		var green;
		var blue;
		//need to add more age levels to this...
		//maybe each family has a base color and age goes from light to dark?
		if(this.age < 18){
			red = 255;
			green = 0;
			blue = 0;
		} else {
			red = 0;
			green = 255;
			blue = 0;
		}
		return color(red, green, blue);
	};
	this.display = function(){
		this.fillColor = this.getFill(age);
		fill(this.fillColor);
		ellipse(this.x,this.y, this.size, this.size);
	};
};

var Human = function(firstName, gender, family){
	this.firstName = firstName;
	this.gender = gender;
	this.links = [];
	this.lifespan = function(){
		if(this.gender === '0'){
			lifespan = 82;
		} else {
			lifespan = 85;
		}
	};
	this.addLinks = function(actor){
		this.links.push(actor);
		// line()
	};
	this.getLinks = function(){

	};
	//dietary needs
	//taste wants
	Actor.call(this, 0, this.lifespan, 10);
};

var Family = function(surname, home){
	this.surname = surname;
	this.home = {};
	this.home.xSquare = home.x;
	this.home.ySquare = home.y;
	this.members = [];
	this.addMember = function(human){
		this.members.push(human);
		//determine board position
		
		//what are some other things that happen when we add
		//a member to the family?
	};

};

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  // titleScreen(); this will allow people to enter the game
  var familyNames = ['Patel', 'Pratap'];
  var game = new Game(familyNames);
  //how do I want to make humans?
}

function draw() {
  
}
