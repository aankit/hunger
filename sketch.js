// var titleScreen();
var Game = function(){
	//how big is the game, this will be important to creating
	//a balanced world
	this.squareWidth = 20;
	this.boardX = 62;
	this.boardY = 31;
	this.boardSize = this.boardX * this.boardY;
	this.board = new Array(this.boardSize);
	//stuff on the board
	this.actors = [];
	//draw the grid
	strokeWeight(0.2);
	stroke(100,150,75);
	for(i=0;i<=this.boardX;i+=this.squareWidth){
		line(i, 0, i, displayHeight);
	}
	for (j=0;j<this.boardY;j+=this.squareWidth){
		line(0, j, displayWidth, j);
	}
	//create the game board
	strokeWeight(0.2);
	stroke(100,150,75);
	this.world = {
		freshWater: {
			p: 0.02,
			c: color(138, 207, 237),
			n: "Fresh Water",
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
			c: color(155, 237, 147),
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
			c: color(75, 75, 75),
			n: "Mountain",
			s: 0
		},
		saltWater: {
			p: 0.70,
			c: color(15, 111, 171),
			n: "Salt Water",
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
	this.board = shuffle(this.board);
	for (var i=0;i<this.board.length;i++){
		try {
			colortoUse = this.board[i].c;
		}
		catch (err){
			this.board[i]=this.world.cropLand;
		}
		fill(this.board[i].c);
		var y = Math.floor(i/this.boardX)*this.squareWidth;
		var x = (i%this.boardX)*this.squareWidth
		rect(x,y,this.squareWidth, this.squareWidth);
	}


};

// function placeHuman(){
// 	for (var i in this.board)
// }


function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

//Seeds, Humans, Oil
//
//First is the Actor Prototype (is that the right use of this word/concept?)
var Actor = function(position){
	this.position = position;
	this.edges = [];
	this.diameter = 10;
	this.getFill = function(){
		var red = 0;
		var green = 0;
		var blue = 0;
		//need to add more age levels to this...
		//maybe each family has a base color and age goes from light to dark?
		return color(red, green, blue);
	};

	this.display = function(){
		this.fillColor = this.getFill();
		fill(this.fillColor);
		ellipse(
			this.position.x*game.squareWidth-game.squareWidth/2,
			this.position.y*game.squareWidth-game.squareWidth/2,
			this.diameter, this.diameter);
	};

	this.addEdges = function(actor){
		this.edges.push(actor);
	};
};

var Human = function(firstName, position){
	this.firstName = firstName;
	Actor.call(this, position);
};

var Family = function(surname, home){
	this.surname = surname;
	this.home = {};
	this.home.xSquare = home.x;
	this.home.ySquare = home.y;
	this.members = [];
	this.addMember = function(human){
		this.members.push(human);
	};

};

var h, game;

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	// titleScreen(); this will allow people to enter the game
	game = new Game();
	p = {x: 3, y: 3}
	h = new Human("Aankit", p);
	//how do I want to make humans?
}

function draw() {
	h.display();
}
