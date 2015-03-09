//Board File

var Game = function(){
	//this is our setup condensed
	this.createGame = function(){
		this.squareWidth = 25;
		this.boardX = 50;
		this.boardY = 23;
		this.boardSize = this.boardX * this.boardY;
		this.board = new Array(this.boardSize);

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
				startingSquare = lastSquare; //stacking up all the resources
				for(i=startingSquare;i<(startingSquare+n);i++){
					this.board[i]={
						'resourceType': this.world[resource],
						'occupied': false
					};
					lastSquare ++;
				}
			}
		}
		//oh bad code! I say, bad code chap.
		for (var i=0;i<this.board.length;i++){
			if(this.board[i]===undefined){
					console.log('here');
					this.board[i]={
					'resourceType': this.world.cropLand,
					'occupied': false
				};
			}
		}
		//shuffle the resources
		this.board = shuffle(this.board);
	};
	
	//helper functions
	this.getXY = function(pos){
		var p = {
			xpos: (pos%this.boardX)*this.squareWidth,
			ypos: Math.floor(pos/this.boardX)*this.squareWidth
		};
		return p;
	};

	this.getArr = function(xy){
		var p = xy.xpos + xy.ypos*this.boardX;
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