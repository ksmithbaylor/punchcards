import _ from 'lodash';
import co from 'co';
import request from 'co-request';

const options = { headers: {
  'User-Agent': 'user-punchcards',
  'Authorization': 'token ' + process.env['TOKEN'] } };

const base = 'https://api.github.com';

function* gh(path) {
  let response = yield request(base + path, options);
  return JSON.parse(response.body); }

function* usernameToRepos(username) {
  return yield gh(`/users/${username}/repos`); }

const squashTimes = times =>
  _.reduce(times, (a, b) => [a[0], a[1], a[2] + b[2]]);

const nameToPunchcard = username =>
  name => gh(`/repos/${username}/${name}/stats/punch_card`);

module.exports = co.wrap(function*(username) {
  const repos = yield usernameToRepos(username);
  const names = _.pluck(repos, 'name');
  const stats = yield _.map(names, nameToPunchcard(username));
  const times = _.zip.apply(null, stats);

  return _.map(times, squashTimes);
});
