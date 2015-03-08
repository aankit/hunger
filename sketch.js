// var titleScreen();

var Game = function(){
	//this is our setup condensed
	this.createGame = function(){
		this.squareWidth = 25;
		this.boardX = 50;
		this.boardY = 23;
		this.boardSize = this.boardX * this.boardY;
		this.board = new Array(this.boardSize);
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
					this.board[i]={
						'resourceType': this.world[resource],
						'occupied': false
					};
					lastSquare ++;
				}
			}
		}
		this.board = shuffle(this.board);

		//oh bad code! I say, bad code chap.
		for (var i=0;i<this.board.length-1;i++){
			if(this.board[i]===undefined){
					this.board[i]={
					'resourceType': this.world.cropLand,
					'occupied': false
				};
			}
		}
	};
	
	//helper functions
	this.getXY = function(i){
		var p = {
			ypos: Math.floor(i/this.boardX)*this.squareWidth,
			xpos: (i%this.boardX)*this.squareWidth
		};
		return p;
	};
	this.display = function(){
		for (var i=0;i<this.board.length;i++){
			var fillColor = this.board[i].resourceType.c;
			var p = this.getXY(i);
			fill(fillColor);
			rect(p.xpos,p.ypos,this.squareWidth, this.squareWidth);
		}
	};
	
};

//Helper functions

function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

function placeActor(game, constraints){
	var keepLooking = true;
	var position = 0;
	while(keepLooking){
		var temp = Math.floor(random(0,game.board.length));
		var tempIndex = constraints.indexOf(game.board[temp].resourceType.n);
		if (tempIndex>-1){
			if(game.board[temp].occupied===false){
				game.board[temp].occupied = true;
				position = temp;
				keepLooking = false;
			} else {
				//<( | )>this could be a place to do something later.
			}
		}
	}
	return game.getXY(position);
}

//////////////////////////////////////////////////////////////////////////////
//																			//
//						Humans, Seeds, Oil, Animals, Fish					//
//																			//
//////////////////////////////////////////////////////////////////////////////
//First is the Actor Prototype (is that the right use of this word/concept?)
var Actor = function(game, constraints, fillColor){
	this.position = placeActor(game, constraints);
	this.edges = [];
	this.diameter = 15;
	var a = 0;
	this.display = function(){
		if(this.edges.length===0) {
			a += 0.1;
		} else {
			a = 0;
		}
		fill(this.getFill());
		strokeWeight(2);
		stroke(0);
		var x = this.position.xpos+game.squareWidth/2;
		var y = this.position.ypos+game.squareWidth/2 - abs(sin(a)) * 10;
		var d = this.diameter;
		ellipse(x, y, d, d);
	};

	this.addEdges = function(actor){
		this.edges.push(actor);
	};
};

var Human = function(game, firstName){
	this.firstName = firstName;
	var constraints = ["Mountain", "Pasture", "Desert", "Crop Land", "Forest"];
	var fillColor = color(192,118,100);
	Actor.call(this, game, constraints, fillColor);
};

var Oil = function(game, wellName){
	this.wellName = wellName;
	var constraints = ["Salt Water"];
	var fillColor = color(0,0,0);
	Actor.call(this, game, constraints, fillColor);
};

var Seed = function(game, seedName){
	this.seedName = seedName;
	var constraints = ["Forest", "Pasture", "Crop Land", "Mountain"];
	var fillColor = color(218,165,32);
	Actor.call(this, game, constraints, fillColor);
};

var Animal = function(game, animalName){
	this.animalName = animalName;
	var constraints = ["Forest", "Pasture", "Crop Land", "Mountain"];
	var fillColor = color(218,165,32);
	Actor.call(this, game, constraints, fillColor);
};

var Fish = function(game, fishName){
	this.fishName = fishName;
	var constraints = ["Fresh Water", "Salt Water"];
	var fillColor = color(192,192,192);
	Actor.call(this, game, constraints, fillColor);
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


//////////////////////////////////////////////////////////////////////////////
//																			//
//									MAIN SKETCH								//
//																			//
//////////////////////////////////////////////////////////////////////////////

var h, game;

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	// titleScreen(); this will allow people to enter the game
	game = new Game();
	game.createGame();
	//how do I want to make humans?
	// for (var actor in game.actors){
	// 	console.log(game.actors[actor]);
	// }
}

function draw() {
	game.display();
	for (var actor in game.actors){
		game.actors[actor].display();
	}

}
