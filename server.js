// server.js
// where your node app starts

// init project
var express = require('express');
var moment = require('moment'); //just added moment!  have fun!
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (request, response) {
  response.sendFile(__dirname+'/views/index.html', function(err){
    if(err)
      console.log("Couldn't send file");
    else
      console.log('File served');
  });
});

app.get('/:dateString', function(req, res){
  var json = {'unix': null, 'natural': null};
  var date = req.params.dateString;
  // A valid unix date is a min of 8nos. long
  if(req.params.dateString.match(/^\d{8,}$/g))
    date = moment(date, 'X');
  else
    date = moment(date, 'MMMM D, YYYY');
  
  if(date.isValid()){
    json.unix = date.format('X');
    json.natural = date.format('MMMM D, YYYY');
  }  
  res.json(json);
});

app.get('/api/ip', function(req, res){
  var json = {};
  var sys = req.headers['user-agent'].split(' ').slice(1,4).join(' ');
  res.jsonp({
    'ip': req.headers["x-forwarded-for"].split(',')[0],
    'language': req.headers['accept-language'].split(',')[0],
    'system': sys.substr(1, sys.length - 2)
  });
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
