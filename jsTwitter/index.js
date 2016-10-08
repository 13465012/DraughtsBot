var TwitterPackage = require('twitter');
var data = require('fs').readFileSync('image.jpg');
var fs = require('fs');

var secret = {
  consumer_key: "ZsIqRRWvxDT1waQkGAD1tMpma",
  consumer_secret: "rPMdaOmtDqMDPyfgAHNcKhwCavsK4jgfz3wU8Pko0Fn8bDbCpU",
  access_token_key: "784730853817606144-lqCDSz9drO8ONyzSlC0FenHLzoMlj0t",
  access_token_secret: "aiiNdiWvxSnVTrND5GJicgRYh8c7ZhXvEnoZSMLOohnCA"
}

var Twitter = new TwitterPackage(secret);
console.log("started \u{26AB}");


//POSTING TWEET -> WILL POST A TWEET WITH TEXT = {STATUS}
/*
Twitter.post('statuses/update', {status: 'Hello Lincoln'},  function(error, tweet, response){
  if(error){
    console.log(error);
  }
  console.log(tweet);  // Tweet body.
  console.log(response);  // Raw response object.
});
*/

//STREAMING DATA -> WILL SHOW A LIST OF ALL NEW TWEETS
var trackingHashes = "lincolnHack16 lincolnHack16Bot";

var gridTemplate = [
					["\r\n"],
					["\u{2B1B}", "\u{2B1B}", "\u{2B1B} \r\n"],
                    ["\u{2B1B}", "\u{2B1B}", "\u{2B1B} \r\n"],
                    ["\u{2B1B}", "\u{2B1B}", "\u{2B1B} \r\n"]
                    ];
var gridTemplateString = gridTemplate.toString();
var gridTemplateString = gridTemplateString.replace(",", " ");

Twitter.stream('statuses/filter', {track: trackingHashes }, function(stream) {
	stream.on('data', function(tweet) {

    	console.log('USER: ' + tweet.user.name + '\n' + 'TEXT: ' + tweet.text + '\n' + 'TWEET_ID: ' + tweet.id + '\n' + 'USER_NAME: ' + tweet.user.screen_name  + '\n');

    	var botReply = {
     		status: 'Hello @' + tweet.user.screen_name + " " + gridTemplateString,
    		in_reply_to_status_id: tweet.id_str // Pass the media id string
    	}


		Twitter.post('statuses/update', botReply,  function(error, tweet, response){
			if(error){
			console.log(error);
			}
  			console.log('USER: ' + tweet.user.name + '\n' + 'TEXT: ' + tweet.text + '\n' + 'TWEET_ID: ' + tweet.id + '\n' + 'USER_NAME: ' + tweet.user.screen_name  + '\n');  // Tweet body.
			console.log(response);
		});
  });

  stream.on('error', function(error) {
    console.log(error);
  });
});

