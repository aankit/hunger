var createGame = function(){
	activeSquares = displayWidth * displayHeight;
};

var Actor = function(age, lifespan, size){
  //this.uid = uid;
  this.age = age;
  this.lifespan= lifespan;
  this.size = size;
  this.display = function(x, y){
    ellipse(x,y, this.size, this.size);
  };
};

var Human = function(name, gender, mother, father){
	this.name = name;
	this.gender = gender;
	this.mother = mother;
	this.father = father;
	this.lifespan = function(){
		if(this.gender === '0'){
			lifespan = 82;
		} else {
			lifespan = 85;
		}
	};
	Actor.call(this, 0, this.lifespan, 10);
};

function setup() {
  createCanvas(640, 480);
  createGame();
  h = new Human('Aankit', 0, 'Vibhuti', 'Barry');
}

function draw() {
  h.display(100, 100);
  
}
