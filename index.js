var http = require('http');
var fs = require('fs');
var final = require('finalhandler');
var router = require('router')();
var punchcard = require('./punchcard');

function static(path, file, type) {
  router.get(path, (req, res) => {
    res.writeHead(200, {'Content-Type': type});
    fs.createReadStream(file).pipe(res);
  });
}

static('/', 'index.html', 'text/html');
static('/d3.min.js', 'node_modules/d3/d3.min.js', 'text/javascript');

router.get('/users/:user/', (req, res) => {
  punchcard(req.params.user).then(result => res.end(result));
});

http.createServer((req, res) => {
  router(req, res, final(req, res));
}).listen(5555);
