var _ = require('lodash');
var co = require('co');
var request = require('co-request');

var options = {
  headers: {
    'User-Agent': 'user-punchcards',
    'Authorization': 'token ' + process.env['TOKEN']
  }
};

var base = 'https://api.github.com';

module.exports = co.wrap(function*(username) {
  var reposUrl = base + '/users/' + username + '/repos';
  var result = yield request(reposUrl, options);
  return username + ' says ' + result.body;
});
