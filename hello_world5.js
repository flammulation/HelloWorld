var express = require('express');
var app = express();
var path = require('path');
var https = require('https');
var request = require('request');
const port = 80;
const ip = '0.0.0.0';

app.set('views', path.join(__dirname, '/views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(__dirname + '/public'));

var router = express.Router();
router.get('/', function (req, res) {  
  res.render('index.html');
});
router.get('/ejs', function (req, res) {  
  res.render('ejs.html', { title: 'Hello World! ~rendered by ejs' });
});
router.get('/api', function (req, res) {  
  res.render('api.html');
});
router.get('/api/weather/zip/:zip', function (req, res) {
  var zip = req.params.zip;
  request('https://api.openweathermap.org/data/2.5/forecast?zip=' + zip + ',us&APPID=dca3ec2ce1a99d83cb5f756faf74e3b7&units=imperial', function(error, response, body) {
    var weather = {notfound:error};
    if (!error) weather = JSON.stringify(body);
    res.render('return.html', {data:weather});
  });
});
router.get('/api/weather/gps/:lat:lon', function (req, res) {
  var lattitude = req.params.lat;
  var longitude = req.params.lon;
  request('https://api.openweathermap.org/data/2.5/forecast?lat=" + lattitude + "&lon=" + longitude + "&APPID=dca3ec2ce1a99d83cb5f756faf74e3b7&units=imperial', function(error, response, body) {
    var weather = {notfound:error};
    if (!error) weather = JSON.stringify(body);
    res.render('return.html', {data:weather});
  });
});
router.get('/weather', function (req, res) {
  res.render('weather.html', {zip_code:''});
});

app.use(router);
app.listen(port, ip, function () {
  console.log(`server is running on ${ip}:${port}`);
});
module.exports = app;

