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
  var result = yield request(gh('zen'), options);
  return username + ' says ' + result.body;
});

function gh(str) {
  return 'https://api.github.com/' + str;
}
