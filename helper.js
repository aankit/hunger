//HELPER FUNCTIONS

//thanks stackoverflow!
function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

function placeActor(game, originXY, constraints){
	var keepLooking = true;
	var position = 0;
	var bounds = getBounds(game, originXY);
	while(keepLooking){
		var temp = {
			xpos : Math.floor(random(bounds.xMin,bounds.xMax)),
			ypos : Math.floor(random(bounds.yMin,bounds.yMax))
		};
		var arrTemp = game.getArr(temp);
		// console.log(arrTemp);
		var tempIndex = constraints.indexOf(game.board[arrTemp].resourceType.n);
		if (tempIndex>-1){
			// console.log(temp);
			if(game.board[arrTemp].occupied===false){
				game.board[arrTemp].occupied = true;
				position = temp;
				keepLooking = false;
			} else {
				//<( | )>this could be a place to do something later.
			}
		}
	}
	return position;
}

function getBounds(game, origin){
	var r = 5;
	var xMax = ((game.boardX - origin.xpos) < r ? game.boardX : (origin.xpos + r));
	var xMin = ((origin.xpos - 0) < r ? 0 : (origin.xpos - r));
	var yMax = ((game.boardY - origin.ypos) < r ? origin.ypos : (origin.ypos + r));
	var yMin = ((origin.ypos - 0) < r ? 0 : (origin.ypos - r));
	var bounds = {
		'xMax' : xMax,
		'xMin' : xMin,
		'yMax' : yMax,
		'yMin' : yMin
	};
	return bounds;
}