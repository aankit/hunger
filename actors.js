//////////////////////////////////////////////////////////////////////////////
//																			//
//						Humans, Seeds, Oil, Animals, Fish					//
//																			//
//////////////////////////////////////////////////////////////////////////////
//First is the Actor Prototype (is that the right use of this word/concept?)
var Actor = function(game, originXY, constraints, fillColor){
	this.position = placeActor(game, originXY, constraints);
	this.edges = [];
	this.diameter = 15;
	var a = 0;
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
		ellipse(x, y, d, d);
	};

	this.addEdges = function(actor){
		this.edges.push(actor);
	};
};

var Human = function(game, firstName, originXY){
	this.firstName = firstName;
	var constraints = ["Mountain", "Pasture", "Desert", "Crop Land", "Forest"];
	var fillColor = color(192,118,100);
	Actor.call(this, game, originXY, constraints, fillColor);
};

var Oil = function(game, wellName, originXY){
	this.wellName = wellName;
	var constraints = ["Salt Water"];
	var fillColor = color(0,0,0);
	Actor.call(this, game, originXY, constraints, fillColor);
};

var Seed = function(game, seedName, originXY){
	this.seedName = seedName;
	var constraints = ["Forest", "Pasture", "Crop Land", "Mountain"];
	var fillColor = color(218,165,32);
	Actor.call(this, game, originXY, constraints, fillColor);
};

var Animal = function(game, animalName, originXY){
	this.animalName = animalName;
	var constraints = ["Forest", "Pasture", "Crop Land", "Mountain"];
	var fillColor = color(218,165,32);
	Actor.call(this, game, originXY, constraints, fillColor);
};

var Fish = function(game, fishName, originXY){
	this.fishName = fishName;
	var constraints = ["Fresh Water", "Salt Water"];
	var fillColor = color(192,192,192);
	Actor.call(this, game, originXY, constraints, fillColor);
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