//HELPER FUNCTIONS

//thanks stackoverflow!
function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

function placeActor(game, constraints, xy){
	var pos = getPos(xy);
	var keepLooking = true;
	var position = 0;
	while(keepLooking){
		var temp = Math.floor(random(0,game.board.length));
		console.log(constraints);
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

function getBounds(game, origin){
	var xDeltaMax = ((game.boardX - origin.xpos) < 10 ? game.boardX : (origin.xpos + 10));
	var xDeltaMin = ((origin.xpos - 0) < 10 ? 0 : (origin.xpos - 10));
	var yDeltaMax = ((game.boardY - origin.ypos) < 10 ? origin.ypos : (origin.ypos + 10));
	var yDeltaMin = ((origin.ypos - 0) < 10 ? 0 : (origin.ypos - 10));
}