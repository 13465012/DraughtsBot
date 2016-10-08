function Game(player1, player2) {
	this.red = player1;
	this.black = player2;
	this.board = [
	//0,1,2,3,4,5,6,7,8,9
	 [e,r,e,r,e,r,e,r,e,r], //0
	 [r,e,r,e,r,e,r,e,r,e], //1
	 [e,r,e,r,e,r,e,r,e,r], //2
	 [e,e,e,e,e,e,e,e,e,e], //3
	 [e,e,e,e,e,e,e,e,e,e], //4
	 [e,e,e,e,e,e,e,e,e,e], //5
	 [e,e,e,e,e,e,e,e,e,e], //6
	 [b,e,b,e,b,e,b,e,b,e], //7
	 [e,b,e,b,e,b,e,b,e,b], //8
	 [b,e,b,e,b,e,b,e,b,e]  //9
	
	];
}

testgame = new Game("test1","test2");


Promise.all([horse,test]).then(function(i){
	board = i[1];
	board.composite(i[0],0,0)
	    .write("test.jpg");
	board.composite(i[0],50,50)
	    .write("test.jpg");
	board.composite(i[0],100,100)
	    .write("test.jpg");
});
