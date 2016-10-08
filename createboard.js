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


Promise.all([board,red,black]).then(function(i){
	var tmpBoard = i[0];
	
	for(var y = 0; y <= 9; y++) {
		for(var x = 0;x <= 9;x++) {
			if(testgame.board[x,y] == 'r') {
				tmpBoard.composite(i[1],x*25,y*25);
			}
			if(testgame.board[x,y] == 'b') {
				tmpBoard.composite(i[2],x*25,y*25);
			}
			
		}
	}
	
	tmpBoard.write("newBoard.jpg");
});
