
/**
 * Dependencies.
 */

var debug   = require('debug')('detective');
var inspect = require('util').inspect;
var path    = require('path');
var fs      = require('fs');

/**
 * Root.
 */

var root = path.resolve(__dirname + '/../');

/**
 * A little automation.
 */

var files = fs.readdirSync(root + '/lib/integrations');
files.forEach(function(file){
  var integration = require(root + '/lib/integrations/' + file);
  var name = integration.name;
  exports[name] = integration;
});

debug('exporting... \n\n' + inspect(exports) + '\n\n');
