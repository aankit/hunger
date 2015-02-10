var createGame = function(){
	activeSquares = displayWidth/20 * displayHeight/20;
	for(i=0;i<displayWidth;i+=20){
		line(i, 0, i, displayHeight);
	}
	for (j=0;j<displayHeight;j+=20){
		line(0, j, displayWidth, j);
	}
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
  createCanvas(window.innerWidth, window.innerHeight);
  createGame();
  h = new Human('Aankit', 0, 'Vibhuti', 'Barry');
}

function draw() {
  h.display(100, 100);
  
}
