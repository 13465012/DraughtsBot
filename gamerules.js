function Game(player1, player2) {
	this.red = player1;
	this.black = player2;
	this.board = [
	// 0 , 1 , 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9
	 ['e','r','e','r','e','r','e','r','e','r'], // 0
	 ['r','e','r','e','r','e','r','e','r','e'], // 1
	 ['e','r','e','r','e','r','e','r','e','r'], // 2
	 ['e','e','e','e','e','e','e','e','e','e'], // 3
	 ['e','e','e','e','e','e','e','e','e','e'], // 4
	 ['e','e','e','e','e','e','e','e','e','e'], // 5
	 ['e','e','e','e','e','e','e','e','e','e'], // 6
	 ['b','e','b','e','b','e','b','e','b','e'], // 7
	 ['e','b','e','b','e','b','e','b','e','b'], // 8
	 ['b','e','b','e','b','e','b','e','b','e']  // 9
	
	];
}
var testgame = new Game("p1","p2");

var jimp  = require("jimp");
var board = new jimp.read("Images/DraughtsBoard.png");
var red = new jimp.read("Images/RedDraughtsPeice.png");
var black = new jimp.read("Images/BlackDraughtsPeice.png");
var blackKing = new jimp.read("Images/BlackDraughtsPeiceKing.png");
var redKing = new jimp.read("Images/RedDraughtsPeiceKing.png");	
	

// check diagnals immediately around the piece location

function checkmove(sY,sX,eY,eX,color,king,gboard) {
	console.log(sX + " - " + sY);
	console.log(gboard[sX][sY]);
	console.log(eX + " - " + eY);
	console.log(gboard[eX][eY]);
	
	// end location valid
	if(eX < 0 || eX > 9 || eY < 0 || eY > 9 || eY == sY || eX == sX) {
		console.log("end location invalid! - ");
		return false;
	}
	
	// check horizontal and vertical move is attempted
	if(sX == eX || sY == eY) {
		console.log("horizontal move! - ");
		return false;
	}
	
	// check distance too far
	if( Math.abs(sX - eX) > 2 ||  Math.abs(sY - eY) > 2 ) {
		console.log("too far! - ");
		return false;
	}
	
	// check standard diagnal
	if(Math.abs(sX - eX) + Math.abs(sY - eY) == 2) {
		if(gboard[eX][eY] != 'e') {
			console.log("not empty! - ");
			return false;
		}
		else {
			if(king == true) {
				return true;
			}
			else {
				if(color == 'r' && eY < sY) {
					console.log("can't go back(red)! - ");
					return false;
				}
				else {
					if(color == 'b' && eY > sY) {
						console.log("can't go back(black)! - ");
						return false;
					}
					else {
						return true;
					}
				}
			}
		}
	}
	// check attack diagnal
	else {
		if(gboard[eX][eY] == 'e') {
			// identify horizontal direction
			var tmpeX = 0;
			if(eX > sX) {
				tmpeX =- 1;
			}
			else {
				tmpeX =+ 1;
			}
			// identify vertical direction
			var tmpeY = 0;
			if(eY > sY) {
				tmpeY =- 1;
			}
			else {
				tmpeY =+ 1;
			}
			
			// if red
			if(color == 'r' && (gboard[eX + tmpeX][eY + tmpeY] == 'b' || gboard[eX + tmpeX][eY + tmpeY] == 'n')) {
				return true;
			}
			else {
			// if black
			if(color == 'b' && (gboard[eX + tmpeX][eY + tmpeY] == 'r' || gboard[eX + tmpeX][eY + tmpeY] == 't')) {
				return true;
			}
			else {
				return false;
			}
			}
		}
		else {
			return false;
		}
	}
	
	return null;
}

// x and y are reversed due to array mechanics sY will need to take value for sX and vice versa
function turn(color,sY,sX,eY,eX) {
	
	console.log(testgame.board);
	Promise.all([board,red,black,redKing,blackKing]).then(function(i){
	var tmpBoard = i[0];
	
	
	for(var x = 0; x <= 9; x++) {
		for(var y = 0;y <= 9;y++) {
			if(testgame.board[x][y] == 'r') {
				tmpBoard.composite(i[1],y*25,x*25);
			}
			if(testgame.board[x][y] == 'b') {
				tmpBoard.composite(i[2],y*25,x*25);
			}
			if(testgame.board[x][y] == 't') {
				tmpBoard.composite(i[3],y*25,x*25);
			}
			if(testgame.board[x][y] == 'n') {
				tmpBoard.composite(i[4],y*25,x*25);
			}
			
			
		}
	}
	
	tmpBoard.write("newBoard2.jpg");
	});
	
	// is unit valid?
	var val = false;
	if(testgame.board[sX][sY] == 'e') {
		val = false;
	}
	else {
		if(color == 'r' && (testgame.board[sX][sY] == 'r' || testgame.board[sX][sY] == 't')) {
			val = true;
		}
		else {
			if(color == 'b' && (testgame.board[sX][sY] == 'b' || testgame.board[sX][sY] == 'n')) {
			val = true;
			}
			else {
				val = false;
			}
		}
	}
	
	if(!val) {
		return false;
	}
	
	// king?
	var king = false;
	if(testgame.board[sX][sY] == 't' || testgame.board[sX][sY] == 'n') {
		king = true;
	}
	
	
	// Valid move?
	if(checkmove(sY,sX,eY,eX,'r',king,testgame.board) == true) {
		
		// remove piece if taken
		if( Math.abs(sX - eX) == 2 ||  Math.abs(sY - eY) == 2) {
			// identify horizontal direction
			var tmpeX = 0;
			if(eX > sX) {
				tmpeX =- 1;
			}
			else {
				tmpeX =+ 1;
			}
			// identify vertical direction
			var tmpeY = 0;
			if(eY > sY) {
				tmpeY =- 1;
			}
			else {
				tmpeY =+ 1;
			}
			
			testgame.board[tmpeX][tmpeY] == 'e';
		}
		
		// move piece
		
		var tmppiece = testgame.board[sX][sY];
		testgame.board[sX][sY] = 'e';
		testgame.board[eX][eY] = tmppiece;
		console.log(tmppiece);
		
		// becomes king?
		if(color == 'r' && eY == 9) {
			testgame.board[eX][eY] = 't';
		}
		if(color == 'b' && eY == 9) {
			testgame.board[eX][eY] = 'n';
		}
	}
	console.log(testgame.board);
		Promise.all([board,red,black,redKing,blackKing]).then(function(i){
	var tmpBoard = i[0];
	
	
	for(var x = 0; x <= 9; x++) {
		for(var y = 0;y <= 9;y++) {
			if(testgame.board[x][y] == 'r') {
				tmpBoard.composite(i[1],y*25,x*25);
			}
			if(testgame.board[x][y] == 'b') {
				tmpBoard.composite(i[2],y*25,x*25);
			}
			if(testgame.board[x][y] == 't') {
				tmpBoard.composite(i[3],y*25,x*25);
			}
			if(testgame.board[x][y] == 'n') {
				tmpBoard.composite(i[4],y*25,x*25);
			}
			
			
		}
	}
	
	tmpBoard.write("newBoard3.jpg");
	});
}

turn('r',1,2,2,3);
//console.log(checkmove(1,2,3,4,'r',false,board));


/* function checksurroundRED(x,y) {
					
	var results = [null,null,	// top left
				   null,null,	// top right
				   null,null,	// bottom right
				   null,null	// bottom left
	];
	
	// check top left
	if(x > 0 && y > 0) {
		if(board[x-1][y-1] != 'e') {
			// enemy?
			if(board[x-1][y-1] == 'b' || board[x-1][y-1] == 'n') {
				// check + 1
				if(x > 1 && y > 1) {
					if(board[x-1][y-1] != 'e') {
						results[1] = false;
					}
					else {
						results[1] = true;
					}
				}
				else {
					results[1] = false;
				}
			}
			else {
				results[0] = false;
				results[1] = false;
			}
		}
		else {
			results[0] = true;
			results[1] = false;
		}
	}
	else {
		results[0] = false;
		results[1] = false;
	}
	
	// check top right
	if(x > 0 && y < 9) {
		if(board[x][y] != 'e') {
			// enemy?
			if(board[x-1][y-1] == 'b' || board[x-1][y-1] == 'n') {
		
			}
		}
		else {
			results[2] = true;
			results[3] = false;
		}
	}
	else {
		results[2] = false;
		results[3] = false;
	}
} */