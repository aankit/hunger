// var titleScreen();
var Game = function(){
	//how big is the game, this will be important to creating
	//a balanced world
	this.squareWidth = 25;
	this.boardX = 50;
	this.boardY = 25;
	this.boardSize = this.boardX * this.boardY;
	this.board = new Array(this.boardSize);
	this.getXY = function(i){
		var p = {
			ypos: Math.floor(i/this.boardX)*this.squareWidth,
			xpos: (i%this.boardX)*this.squareWidth
		};
		return p;
	};
	//keep track of the board
	this.actors = {};
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
	this.display = function(){
		for (var i=0;i<this.board.length;i++){
			try {
				colortoUse = this.board[i].c;
			}
			catch (err){
				this.board[i]=this.world.cropLand;
			}
			var p = this.getXY(i);
			fill(this.board[i].c);
			rect(p.xpos,p.ypos,this.squareWidth, this.squareWidth);
		}
	};
	var hpos = this.getXY(placeHuman(this.board));
	this.actors["Patel"] = new Human("Aankit", hpos);
};

function placeHuman(arr){
	var keepLooking = true;
	while(keepLooking){
		var temp = Math.floor(random(0,arr.length));
		var index = ["Mountain", "Pasture", "Desert", "Crop Land", "Forest"].indexOf(arr[temp].n);
		if (index>-1){
			keepLooking = false;
			return temp;
		}
	}
}


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
	this.diameter = 15;
	var a = 0;
	this.getFill = function(){
		var red = 192;
		var green = 118;
		var blue = 255;
		//need to add more age levels to this...
		//maybe each family has a base color and age goes from light to dark?
		return color(red, green, blue);
	};

	this.display = function(){
		if(this.edges.length===0) {
			a += 0.1;
		} else {
			a = 0;
		}
		fill(this.getFill());
		noStroke();
		var x = this.position.xpos+game.squareWidth/2;
		var y = this.position.ypos+game.squareWidth/2 - abs(sin(a)) * 10;
		var d = this.diameter;
		console.log(d);
		ellipse(x,y, d, d);
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
	//how do I want to make humans?
	for (var actor in game.actors){
		console.log(game.actors[actor]);
	}
}

function draw() {
	game.display();
	for (var actor in game.actors){
		game.actors[actor].display();
	}

}
