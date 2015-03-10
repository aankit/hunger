// var TitleScreen = function(){

// };

//////////////////////////////////////////////////////////////////////////////
//																			//
//									MAIN SKETCH								//
//																			//
//////////////////////////////////////////////////////////////////////////////

var game;

var actors = {};
var player = "Toumai";
var well = "Drake";
var seed = "Wheat";
var animal = "Bird";
var fish = "Fish";

var originSelected = false;
var destinationSelected = false;
var link = {
	'originx' : 0,
	'originy' : 0
};
var lines = [];

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	// titleScreen(); this will allow people to enter the game
	game = new Game();
	game.createGame();
	//how do I want to make humans, animals, fish, seeds, and oil.
	var origin = {
		xpos : Math.floor(random(0, game.boardX)),
		ypos: Math.floor(random(0, game.boardY))
	};
	// console.log(origin);
	actors.player = new Human(game, player, origin);
	
	actors.seed = new Seed(game, seed, actors.player.position);
	actors.well = new Oil(game, well, actors.player.position);
	actors.animal = new Animal(game, animal, actors.player.position);
	actors.fish = new Fish(game, fish, actors.player.position);
}

function draw() {
	game.display();
	for (var actor in actors){
		actors[actor].display();
	}
	if(lines.length>0){
		for (var i=0;i<lines.length;i++){
			// console.log(lines[i]);
			ellipse(lines[i].originx, lines[i].originy, 1, 1);
			ellipse(lines[i].destx, lines[i].desty, 1, 1);
			line(lines[i].originx, lines[i].originy,lines[i].destx, lines[i].desty);
		}
	}
}

function mousePressed() {

	if(originSelected===true){
		link.destx = mouseX;
		link.desty = mouseY;
		lines.push(link);
		console.log(lines);
		originSelected = false;
	} else if(originSelected===false){
		link.originx = mouseX;
		link.originy = mouseY;
		originSelected = true;
	}
	// prevent default
	return false;
}

function mousDragged(){

}
