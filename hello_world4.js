var express = require('express');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

var path = require('path');
var router = express.Router();

router.all('/', function (req, res, next) {  
  console.log('Someone made a request!');
  next();
});
router.get('/', function (req, res) {  
  res.render('index.html');
});

router.get('/example/:text', function(req, res) {
    res.render('example.html');
});

app.use(function(req, res, next) {  
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(router);
app.listen(80, function () {
  console.log('Ready');
});
module.exports = app;

