//////////////////////////////////////////////////////////////////////////////
//																			//
//						Humans, Seeds, Oil, Animals, Fish					//
//																			//
//////////////////////////////////////////////////////////////////////////////
//First is the Actor Prototype (is that the right use of this word/concept?)
var Actor = function(game, originXY, xr, yr, constraints, fillColor, _a){
	this.position = placeActor(game, originXY, constraints);
	this.edges = [];
	this.diameter = 15;
	var a = _a;
	this.display = function(){
		if(this.edges.length===0) {
			a += 0.1;
		} else {
			a = 0;
		}
		fill(fillColor);
		strokeWeight(2);
		stroke(0);
		var x = this.position.xpos*game.squareWidth+game.squareWidth/2;
		var y = this.position.ypos*game.squareWidth+game.squareWidth/2 - abs(sin(a)) * 10;
		var d = this.diameter;
		ellipse(x, y, xr, yr);
	};

	this.addEdges = function(actor){
		this.edges.push(actor);
	};
};

var Human = function(game, firstName, originXY){
	this.firstName = firstName;
	var constraints = ["Mountain", "Pasture", "Desert", "Crop Land", "Forest"];
	var fillColor = color(192,118,100);
	var xr = 12;
	var yr = 12;
	Actor.call(this, game, originXY, xr, yr, constraints, fillColor, 0);
};

var Oil = function(game, wellName, originXY){
	this.wellName = wellName;
	var constraints = ["Salt Water"];
	var fillColor = color(0,0,0);
	var xr = 15;
	var yr = 15;
Actor.call(this, game, originXY, xr, yr, constraints, fillColor, .25);
};

var Seed = function(game, seedName, originXY){
	this.seedName = seedName;
	var constraints = ["Forest", "Pasture", "Crop Land", "Mountain"];
	var fillColor = color(255,204,153);
	var xr = 15;
	var yr = 10;
	Actor.call(this, game, originXY, xr, yr, constraints, fillColor, .5);
};

var Animal = function(game, animalName, originXY){
	this.animalName = animalName;
	var constraints = ["Forest", "Pasture", "Crop Land", "Mountain"];
	var fillColor = color(218,165,32);
	var xr = 15;
	var yr = 15;
	Actor.call(this, game, originXY, xr, yr, constraints, fillColor, .75);
};

var Fish = function(game, fishName, originXY){
	this.fishName = fishName;
	var constraints = ["Fresh Water", "Salt Water"];
	var fillColor = color(192,192,192);
	var xr = 15;
	var yr = 10;
	Actor.call(this, game, originXY, xr, yr, constraints, fillColor, 1);
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