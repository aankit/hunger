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


function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	// titleScreen(); this will allow people to enter the game
	game = new Game();
	game.createGame();
	//how do I want to make humans, animals, fish, seeds, and oil.
	var origin = {
		xpos : Math.random(0, game.boardX),
		ypos: Math.random(0, game.boardY)
	};
	actors.player = new Human(game, player, origin);
	
	actors.seed = new Seed(game, seed, actors.player.position);
	// actors.well = new Oil(game, well);
	// actors.animal = new Animal(game, animal);
	// actors.fish = new Fish(game, fish);
}

function draw() {
	game.display();
	for (var actor in actors){
		actors[actor].display();
	}

}







	// //keep track of the board
	// this.actors = {};
	// this.actors["Patel"] = new Human(this, "Aankit");

