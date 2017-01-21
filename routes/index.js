var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
require('./db.js');
var TweetDb = mongoose.model('TweetMongo');


var fs = require('fs');



//Twitter Stuff
//var Twit = require('twit');
//var config = require('config');//






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
		console.log(currentDay);
		res.render('addTweet', {'currYear': currentYear, 'currDay': currentDay});
});

router.post('/add-tweet',function(req,res,next){
	console.log(req.body.tweetText);
	console.log(req.body.month);
	console.log(req.body.day);
	console.log(req.body.year);
	
	console.log(req.body.pic);


	// var newTweet = new TweetDb({
	// 	req.body.dat

	// });
});



module.exports = router;
