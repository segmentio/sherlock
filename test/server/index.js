
/**
 * Module dependencies.
 */

var resolve = require('path').resolve;
var serve = require('serve-static');
var http = require('http');

/**
 * Export a vanilla server that serves the fixtures dir statically.
 */

module.exports = http.createServer(serve(resolve(__dirname, '../fixtures')));