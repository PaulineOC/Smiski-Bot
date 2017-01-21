var express = require('express');
var router = express.Router();

//var Twit = require('twit');
//var config = require('config');//

var mongoose = require('mongoose');
require('./db.js');

var TweetDb = mongoose.model('TweetMongo');

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
router.get('/add-tweets',function(req,res,next){
		res.render('addTweets', {'allTweets': allItems});
});



module.exports = router;
