var http = require('http');
var fs = require('fs');
var final = require('finalhandler');
var router = require('router')();
var punchcard = require('./punchcard');

router.get('/', function (req, res) {
  fs.createReadStream('index.html').pipe(res);
});

router.get('/users/:user/', function (req, res) {
  res.end(JSON.stringify(punchcard(req.params.user)));
});

var server = http.createServer(function (req, res) {
  router(req, res, final(req, res));
});

server.listen(5555);
