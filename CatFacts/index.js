			var TwitterPackage = require('twitter');
			var fs = require('fs');
			var request = require('request');

			//Twitter Keys
var secret = {
consumer_key: "",
consumer_secret: "",
access_token_key: "",
access_token_secret: ""
			}

			//Define new twitter variable
			var Twitter = new TwitterPackage(secret);

			console.log("started Console");

			Twitter.stream('statuses/filter', {track: '#catFact'},  function(stream) {

				stream.on('data', function(tweet) {

					var data = require('fs').readFileSync('image.gif');
					var download = function(uri, filename, callback){
				request.head(uri, function(err, res, body){
					console.log('content-type:', res.headers['content-type']);
					console.log('content-length:', res.headers['content-length']);

					request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
				});
			};

			download('http://thecatapi.com/api/images/get?format=src&type=gif', 'image.gif', function(){
				console.log('done');
			});

			var url = "http://catfacts-api.appspot.com/api/facts?number=1";

			request({
				url: url,
				json: true
			}, function (error, response, body) {

				if (!error && response.statusCode === 200) {
					fs.writeFile('message.txt', body.facts, (err) => {
						if (err) throw err;
						console.log('It\'s saved!');
					});
				}
			})

			var catFactText = fs.readFileSync("message.txt").toString();
			console.log(catFactText);
					// Make post request on media endpoint. Pass file data as media parameter
			Twitter.post('media/upload', {media: data}, function(error, media, response) {

				if (!error) {

			    // If successful, a media object will be returned.
			    console.log(media);
			    var statusString = "Okay @" + tweet.user.screen_name + '\u{2757}' + " " + catFactText;
			    // Lets tweet it
			    var status = {
			    	status: statusString,
			    	in_reply_to_status_id: tweet.id_str,
			      media_ids: media.media_id_string // Pass the media id string
			  }

			  Twitter.post('statuses/update', status, function(error, tweet, response) {
			  	if (!error) {
			  		console.log("Replying to: " + tweet.in_reply_to_screen_name + "\n" + "Message: " + tweet.text);
			  	}
			  });

			}
		});

				});

				stream.on('error', function(error) {
					console.log(error);
				});
			});
			