var http = require('http');
var fs = require('fs');
var final = require('finalhandler');
var router = require('router')();
var punchcard = require('./punchcard');

router.get('/', (req, res) =>
           fs.createReadStream('index.html').pipe(res));

router.get('/users/:user/', (req, res) =>
           punchcard(req.params.user).then(result => res.end(result)));

http.createServer((req, res) => router(req, res, final(req, res))).listen(5555);
