var mongoose = require ('mongoose');


var TweetMongo = new mongoose.Schema({
	text: String,
	pic: String,
	date: {type: Date},
});

mongoose.model('TweetMongo', TweetMongo);

mongoose.connect('mongodb://localhost/smiskibot');