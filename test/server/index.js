
/**
 * Module dependencies.
 */

var serve = require('koa-static');
var path = require('path');
var koa = require('koa');

/**
 * Locals.
 */

var app = module.exports = koa();

/**
 * Middleware.
 */

app.use(serve(path.resolve(__dirname, '../fixtures')));
