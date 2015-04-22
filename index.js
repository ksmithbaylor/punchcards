var http = require('http');
var fs = require('fs');
var final = require('finalhandler');
var router = require('router')();

router.get('/', function (req, res) {
  fs.createReadStream('index.html').pipe(res);
});

router.get('/users/:user/', function (req, res) {
  res.end(req.params.user + '\n');
});

var server = http.createServer(function (req, res) {
  router(req, res, final(req, res));
});

server.listen(5555);
