
/**
 * Dependencies.
 */

var each = require('each-module');
var path = require('path');

/**
 * A little automation.
 */

each(path.resolve(__dirname, 'integrations'), function (name, mod) {
  exports[mod.name] = mod;
});
