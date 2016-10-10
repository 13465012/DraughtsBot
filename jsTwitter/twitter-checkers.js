var TwitterPackage = require('twitter');
var fs = require('fs');
var destroy = require('destroy');
var request = require('request');

var secret = {
	consumer_key: "ZsIqRRWvxDT1waQkGAD1tMpma",
	consumer_secret: "rPMdaOmtDqMDPyfgAHNcKhwCavsK4jgfz3wU8Pko0Fn8bDbCpU",
	access_token_key: "784730853817606144-lqCDSz9drO8ONyzSlC0FenHLzoMlj0t",
	access_token_secret: "aiiNdiWvxSnVTrND5GJicgRYh8c7ZhXvEnoZSMLOohnCA"
}

var Twitter = new TwitterPackage(secret);
console.log("started \u{26AB}");


var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

download('http://thecatapi.com/api/images/get?format=src&type=gif', 'image.jpg', function(){
  console.log('done');
});


// Load your image
var data = require('fs').readFileSync('image.jpg');

// Make post request on media endpoint. Pass file data as media parameter
Twitter.post('media/upload', {media: data}, function(error, media, response) {

  if (!error) {

    // If successful, a media object will be returned.
    console.log(media);

    // Lets tweet it
    var status = {
      status: 'I am a tweet',
      media_ids: media.media_id_string // Pass the media id string
    }

    Twitter.post('statuses/update', status, function(error, tweet, response) {
      if (!error) {
        console.log("Tweet posted!");

var url = "http://developer.cumtd.com/api/v2.2/json/GetStop?" +
    "key=d99803c970a04223998cabd90a741633" +
    "&stop_id=it"

request({
    url: 'http://catfacts-api.appspot.com/api/facts',
    json: true
}, function (error, response, body) {

    if (!error && response.statusCode === 200) {
        console.log(body.facts) // Print the json response
    }
})
      }
    });

  }
});

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



/*




//STREAMING DATA -> WILL SHOW A LIST OF ALL NEW TWEETS
var trackingHashes = "lincolnHack16 lincolnHack16Bot";

function startStream(defaultCallingHashtag, colorToMove ){

		Twitter.stream('statuses/filter', {track: trackingHashes }, function(stream) {
			stream.on('data', function(tweet) {


				var gridTemplate =	"\r\n" + topLeft + topMiddle + topRight + "\r\n" +
									"\r\n" + middleLeft + middleMiddle + middleRight + "\r\n" +
									"\r\n" + bottomLeft + bottomMiddle + bottomRight;

				var blackDefault = "\u{2B1B}";
				var topLeft = blackDefault;
				var topMiddle = blackDefault;
				var topRight = blackDefault;
				var middleLeft = blackDefault;
				var middleMiddle = blackDefault;
				var middleRight = blackDefault;
				var bottomLeft = blackDefault;
				var bottomMiddle = blackDefault;
				var bottomRight = blackDefault;

var gridTemplate =	"\r\n" + topLeft + topMiddle + topRight + "\r\n" +
									"\r\n" + middleLeft + middleMiddle + middleRight + "\r\n" +
									"\r\n" + bottomLeft + bottomMiddle + bottomRight;



				var botReply = {
					status: 'Ok @' + tweet.user.screen_name + " " + gridTemplate,
    			in_reply_to_status_id: tweet.id_str // Pass the media id string
    		}


    		Twitter.post('statuses/update', botReply,  function(error, tweet, response){
    			if(error){
    				console.log(error);
    			}
  			console.log('USER: ' + tweet.user.name + '\n' + 'TEXT: ' + tweet.text + '\n' + 'TWEET_ID: ' + tweet.id + '\n' + 'USER_NAME: ' + tweet.user.screen_name  + '\n');  // Tweet body.
  			console.log("closing stream");
  			restartStream();
  		});
    	});

			stream.on('error', function(error) {
				console.log(error);
			});
		});
};

startStream();

function restartStream(){
	destroy(firstTwitterStream);
	startStream();
}



*/