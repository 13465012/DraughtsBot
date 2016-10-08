var jimp  = require("jimp");

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

var testgame = new Game("test1","test2");

var board = new jimp.read("Images/DraughtsBoard.png");
var red = new jimp.read("Images/RedDraughtsPeice.png");
var black = new jimp.read("Images/BlackDraughtsPeice.png");
var blackKing = new jimp.read("Images/BlackDraughtsPeiceKing.png");
var redKing = new jimp.read("Images/RedDraughtsPeiceKing.png");



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
