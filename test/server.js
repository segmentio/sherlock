
/**
 * Module dependencies.
 */

var http = require('http');
var path = require('path');
var serve = require('serve-static');

/**
 * Single export.
 */

module.exports = http.createServer(serve(path.join(__dirname, 'fixtures')));
