// var titleScreen();
var Game = function(familyNames){
	//how big is the game, this will be important to creating
	//a balanced world
	var squareWidth = 20;
	this.boardX = displayWidth/squareWidth;
	this.boardY = displayHeight/squareWidth;
	this.boardSize = this.boardX *  this.boardY;
	this.board = new Array(this.boardSize);
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
	//let's use real ages to set up the game
	//and climate change to change the game
	//create the grid first
	strokeWeight(0.2);
	stroke(100,150,75);
	this.world = {
		freshWater: {
			p: 0.02,
			c: color(138, 207, 237),
			n: "Fresh Water",
			s: 0
		},
		saltWater: {
			p: 0.70,
			c: color(15, 111, 171),
			n: "Salt Water",
			s: 0
		},
		cropLand: {
			p: 0.03,
			c: color(133, 105, 45),
			n: "Crop Land",
			s: 0
		},
		pasture: {
			p: 0.07,
			c: color(45, 133, 51),
			n: "Pasture",
			s: 0
		},
		forest: {
			p: 0.06,
			c: color(12, 99, 18),
			n: "Forest",
			s: 0
		},
		desert: {
			p: 0.06,
			c: color(219, 215, 77),
			n: "Desert",
			s: 0
		},
		mountain: {
			p: 0.06,
			c: color(99, 99, 99),
			n: "Mountain",
			s: 0
		}
	};
	//populate the world with resouces
	var lastSquare = 0;
	for (var resource in this.world){
		if (this.world.hasOwnProperty(resource)){
			n = Math.floor(this.world[resource].p * this.boardSize);
			startingSquare = lastSquare;
			for(i=startingSquare;i<(startingSquare+n);i++){
				this.board[i]=this.world[resource];
				lastSquare ++;
			}
		}
	}
	// console.log(this.board.indexOf("Crop Land"))
	this.board = shuffle(this.board);
	for (var i in this.board){
		try {
			colortoUse = this.board[i].c;
		}
		catch (err){
			this.board[i]=this.world.cropLand;
		}
		fill(this.board[i].c);
		var y = Math.floor(i/this.boardX)*squareWidth;
		console.log(y);
		rect((i%this.boardX)*squareWidth,y,squareWidth, squareWidth);
	}
};



function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

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
