var _ = require('lodash');
var co = require('co');
var request = require('co-request');

var options = {
  headers: {
    'User-Agent': 'user-punchcards',
    'Authorization': 'token ' + process.env['TOKEN']
  }
};

module.exports = co.wrap(function*(username, cb) {
  var result = yield request('https://api.github.com/zen', options);
  return username + ' says ' + result.body;
});
