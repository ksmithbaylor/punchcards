var _ = require('lodash');
var co = require('co');

module.exports = co.wrap(function*(username, cb) {
  var result = 'hello world';
  return JSON.stringify(result);
});
