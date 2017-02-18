var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
require('./db.js');
var TweetDb = mongoose.model('TweetMongo');
var fs = require('fs');
var multer = require('multer');
var schedule = require('node-schedule');

//Saves to memory storage
var upload = multer({ storage: multer.memoryStorage({}) });
//Saves to actual uploads folder
//var upload2 = multer({ dest: './public/uploads/' });

//Twitter Stuff
var Twit = require('twit');
var config = {
	 consumer_key: process.env.Twitter_consumer_key,
	 consumer_secret: process.env.Twitter_consumer_secret,
	 access_token: process.env.Twitter_access_token,
	 access_token_secret: process.env.Twitter_access_token_secret,
};


var T=new Twit(config);





var counter=0;

var j = schedule.scheduleJob({second: 55}, function(){
  var now=new Date();
  console.log(now);
  now.setHours(0);
  now.setMinutes(0);
  now.setSeconds(0);
  now.setMilliseconds(0);
		TweetDb.find({"date":now},function(err,allItems){
			if (err){
				console.log(err);
				return;
			}
			else if(allItems){
				allItems.forEach(function(tweet){
					T.post('media/upload', { media_data: tweet.pic}, function(err, data, response){
						var id = data.media_id_string;
						var tweetMe = {
							status: tweet.text,
							media_ids: [id]
						}
						T.post('statuses/update', tweetMe, function(err){
							if(err){
		      					console.log(err);
		      				}
		      				else{
		      					console.log("removing just tweeted item");
						 		tweet.remove(function (err) {
						 			if(err){
						 				console.log(err);

						 			}
						 			else{
						 				router.get('/stored-tweets', function(req,res){
						 					res.redirect('/stored-tweets');
						 				});
						 			}
					    		});
		      				}//end else
		    			});
					});
				});//end for each
			}//end of if
		});




});





//DATE STUFF

var rule2 = new schedule.RecurrenceRule();
rule2.hour = 21;
rule2.minute=45;
rule2.dayOfWeek = new schedule.Range(0,6);
var dailyJob = schedule.scheduleJob(rule2, function(){
	console.log('Official Daily Checker');

//PUT STUFF HERE




});//END OF DAILY JOB


/* GET home page. */
router.get('/', function(req, res, next) {
	//welcome to smiski bot?
  res.render('index', { title: 'Express' });
});

router.get('/stored-tweets',function(req,res,next){
	TweetDb.find({},function(err,allItems){
		res.render('stored-tweets', {'allTweets': allItems});
	});
});



//Add Tweets
router.get('/add-tweet',function(req,res,next){
		var currentYear = new Date().getFullYear();
		var currentDay = new Date().getDate()+1;
		res.render('addTweet', {'currYear': currentYear, 'currDay': currentDay});
});


router.post('/add-tweet',  upload.single('pic'),function(req,res,next){
	var month = 0;
	switch(req.body.month){
		case 'January':
			month = 0;
			break;
		case 'February':
			month = 1;
			break;
		case 'March':
			month = 2;
			break;
		case 'April':
			month = 3;
			break;
		case 'May':
			month = 4;
			break;
		case 'June':
			month = 5;
			break;
		case 'July':
			month = 6;
			break;
		case 'August':
			month = 7;
			break;
		case 'September':
			month = 8;
			break;
		case 'October':
			month = 9;
			break;
		case 'November':
			month = 10;
			break;
		case 'December':
			month = 11;
			break;
	}

	var date= new Date(req.body.year, month, req.body.day, 0, 0, 0);
	//var nowUTC= new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0,0);
	search=req.body.tweetText;

	var base64 = req.file.buffer.toString('base64');
	var newTweet = new TweetDb({
		text: req.body.tweetText,
		pic: base64,
		date: date,
	});
	newTweet.save(function(err,item, count){
		if (err){
			console.log("there is an error");
		}
		else{	
			res.redirect('/stored-tweets');
		}
	});
});

router.get('/api/storeTweets', function(req, res) {
    TweetDb.find({},function(err, tweets, count){
    	res.json(tweets.map(function(ele){
    		return {
    			'date' : ele.date, 
    			'base64': ele.pic,
    		};
    	}));
	});
});


module.exports = router;
