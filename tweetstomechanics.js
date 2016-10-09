var Jimp = require("jimp");
var tweetUser1 = "@LozzerElliott";
var tweetText = "@DraughtsBot I want to start a game with @StephenFry";
console.log(tweetUser1 + ": " + tweetText);
if(tweetText.indexOf("start") > -1 && tweetText.indexOf("game") > -1){
	var tweetUser2 = tweetText.substring((tweetText.substring(1)).indexOf("@")+1);
	console.log("@DraughtsBot: Sure. " + tweetUser1 + " vs. " + tweetUser2 +"! What's your preferred colour " + tweetUser1 + " (red/black)? Black starts first.");
}
var tweetText = tweetUser1 + ": @DraughtsBot Black.";
console.log(tweetUser1 + ": " + tweetText);
if(tweetText.indexOf("black") > -1 || tweetText.indexOf("Black") > -1){
	var tweetUser1Colour = "Black";
	var tweetUser2Colour = "Red";
} else if(tweetText.indextOf("Red") > -1 || tweetText.indexOf("red") > - 1){
	var tweetUser1Colour = "Red";
	var tweetUser2Colour = "Black";
}
var currentColour = "Black";
if(tweetUser1Colour = "Black"){
	var currentUser = 1;
	console.log("@DraughtsBot: " + tweetUser1 + " Okay here's the board, tweet me the co-ordinates of the piece you want to move and where to move it.");
}else if(tweetUser1Colour = "Red"){
	var currentUser = 2;
	console.log("@DraughtBot:" + tweetUser2 + " Okay here's the board, tweet me the co-ordinates of the piece you want to move and where to move it.");
}