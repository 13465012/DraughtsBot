var TwitterPackage = require('twitter');
var fs = require('fs');
var request = require('request');
var data = require('fs').readFileSync('image.jpg');

//Twitter Keys
var secret = {
	consumer_key: "ZsIqRRWvxDT1waQkGAD1tMpma",
	consumer_secret: "rPMdaOmtDqMDPyfgAHNcKhwCavsK4jgfz3wU8Pko0Fn8bDbCpU",
	access_token_key: "784730853817606144-lqCDSz9drO8ONyzSlC0FenHLzoMlj0t",
	access_token_secret: "aiiNdiWvxSnVTrND5GJicgRYh8c7ZhXvEnoZSMLOohnCA"
}

//Define new twitter variable
var Twitter = new TwitterPackage(secret);

console.log("started Console");

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