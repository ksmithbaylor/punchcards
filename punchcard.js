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

function* githubJSON(path) {
  var response = yield request(base + path, options);
  return JSON.parse(response.body);
}

module.exports = co.wrap(function*(username) {
  function* usernameToReposPromise(username) {
    var url = '/users/' + username + '/repos';
    return yield githubJSON(url);
  }

  function nameToPunchcard(name) {
    var url = '/repos/' + username + '/' + name + '/stats/punch_card';
    return githubJSON(url);
  }

  function squashTimes(times) {
    return _.reduce(times, (a, b) => [a[0], a[1], a[2] + b[2]]);
  }

  var repos = yield usernameToReposPromise(username);
  var names = _.pluck(repos, 'name');
  var stats = yield _.map(names, nameToPunchcard);
  var byTime = _.zip.apply(null, stats);
  var rolledUp = _.map(byTime, squashTimes);

  return JSON.stringify(rolledUp);
});
