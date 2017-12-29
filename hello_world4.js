var express = require('express');
var app = express();
var path = require('path');
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

app.use(router);
app.listen(port, ip, function () {
  console.log(`server is running on ${ip}:${port}`);
});
module.exports = app;

