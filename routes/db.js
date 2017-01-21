var mongoose = require ('mongoose');


var TweetMongo = new mongoose.Schema({
	text: String,
	pic: String,
	month: Number,
	day: Number,
	year: Number,
});

mongoose.model('TweetMongo', TweetMongo);

mongoose.connect('mongodb://localhost/smiskibot');