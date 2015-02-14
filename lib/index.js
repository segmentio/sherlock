
/**
 * Dependencies.
 */

var path = require('path');
var fs   = require('fs');

/**
 * Root.
 */

var root = path.resolve(__dirname + '/../');

/**
 * Integrations.
 */

var integrations = [];

/**
 * A little automation.
 */

var files = fs.readdirSync(root + '/lib/integrations');
files.forEach(function(file){
  var integration = require(root + '/lib/integrations/' + file);
  var name = integration.name;
  integrations.push(integration);
});

/**
 * Expose `integrations`.
 */

module.exports = integrations;
