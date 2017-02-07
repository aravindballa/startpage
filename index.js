var express = require('express');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3300;
var googleTrends = require('google-trends-api');

var app = express();

//setting the static files
app.use(express.static('./public'));

app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.get('/',function(req,res){
	googleTrends.hotTrendsDetail('IN')
		.then(function(results){
			var channel = results.rss.channel[0];
			var options = {
				weekday: "long", year: "numeric", month: "short",
				day: "numeric", hour: "2-digit", minute: "2-digit"
			};
		    
			var trends = {};
			for(i = 0; i<4; i++) {
				trends[i] =  {
					title: channel.item[i].title[0],
					date: new Date(channel.item[0].pubDate).toLocaleTimeString("en-us", options),
					link: channel.item[i].title[0].split(' ').join('+')
				}
			}
			
			res.render('index', {trends: trends});
		})
		.catch(function(err){
		    console.log(err);
	});
});

function getTrends(){
	googleTrends.hotTrendsDetail('IN')
		.then(function(results){
			var channel = results.rss.channel[0];
			var options = {
				weekday: "long", year: "numeric", month: "short",
				day: "numeric", hour: "2-digit", minute: "2-digit"
			};
		    console.log(channel.item[0]);
			var trends = {};
			for(i = 0; i<4; i++) {
				trends[i] =  {
					title: channel.item[i].title[0],
					date: new Date(channel.item[0].pubDate).toLocaleTimeString("en-us", options)
				}
			}
			
		})
		.catch(function(err){
		    console.log(err);
	});
}

//getTrends();

app.listen(port, function () {
  console.log("listening on port 3300");
});
