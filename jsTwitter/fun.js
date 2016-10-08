/*
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
        console.log(tweet);
      }
    });

  }
});*/



//GETS TRENDS FROM A PLACE
/*
Twitter.get('trends/place', {id: 23424775}, function(error, response, trends) {
      if (!error) {
        

      	var get_trends = JSON.stringify(response);
        fs.writeFile('get_trends.json', get_trends, (err) => {
 			if (err) throw err;
  		console.log('It\'s saved!');
  	});

      } else{
      	console.log(error);
      }
    });
*/


//GETS AVAILABLE TRENDS FROM TWITTER

/*
Twitter.get('trends/available', function(error, response) {
      if (!error) {
        var save_test = JSON.stringify(response);
        fs.writeFile('response.json', save_test, (err) => {
 			if (err) throw err;
  		console.log('It\'s saved!');
});
      } else{
      	console.log(error);
      }
    });
*/