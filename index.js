var http = require('http');
var final = require('finalhandler');
var router = require('router')();

router.get('/', function (req, res) {
  res.end('hello world\n');
});

var server = http.createServer(function (req, res) {
  router(req, res, final(req, res));
});

server.listen(5555);
