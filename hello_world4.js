var express = require('express');
var app = express();
var path = require('path');
const port = 8080;
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
router.get('/api/weather/:zip', function (req, res) {
  var zip = req.params.zip;
  var data = "";
  var https = require('https');
  var options = {
    host: 'www.ncdc.noaa.gov',
    port: 80,
    path: '/cdo-web/api/v2/',
    method: 'GET',
    headers : { token: 'owJENFdfCZwPsshGEvpAxUddCsPXWyqP' }
  };

  console.log("options:" + options);
  https.request(options, function(res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      data = chunk
    });
  }).end();
  res.render('return.html', {data:data});
});
router.get('/weather/:zip', function (req, res) {
  var zip = req.params.zip;
  res.render('weather.html', {zip_code:zip});
});
router.get('/weather', function (req, res) {
  res.render('weather.html', {zip_code:''});
});

app.use(router);
app.listen(port, ip, function () {
  console.log(`server is running on ${ip}:${port}`);
});
module.exports = app;

