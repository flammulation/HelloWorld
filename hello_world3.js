var express = require('express');
var path = require('path');  
var app = express();
var router = express.Router();

app.use(router);
app.use(express.static(path.join(__dirname, '/public')));

router.all('/', function (req, res, next) {  
  console.log('Someone made a request!');
  next();
});
router.get('/', function (req, res) {  
  res.render('index.html');
});

router.get('/secret/:key', function (req, res) {  
  var key = req.params.key;
  res.end('Password: ' + key);
});
router.get('/example/:text', function(req, res) {
    res.render('example.html');
});

app.use(function(req, res, next) {  
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.listen(80);  
module.exports = app;
