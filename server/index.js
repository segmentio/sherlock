
/**
 * Dependencies.
 */

var detective = require('../lib/detective');
var favicon = require('koa-favicon');
var logger = require('koa-logger');
var thunkify = require('thunkify');
var json = require('koa-json');
var koa = require('koa');

/**
 * App.
 */

var app = module.exports = koa();

/**
 * Favicon catcher.
 */

app.use(favicon());

/**
 * Logging.
 */

app.use(logger());

/**
 * JSON output helper.
 */

app.use(json({ pretty: app.env === 'development' }));

/**
 * Thunkify
 */

detective.analyze = thunkify(detective.analyze.bind(detective));

/**
 * URL required.
 */

app.use(function *(next) {
  var url = this.query.url;
  if (!url) this.throw(403, 'You need to provide a ?url= query argument.');
  this.body = yield detective.analyze(url);
});

/**
 * Error-handing.
 */

app.on('error', function (err, ctx) {
  if (app.env !== 'testing') console.error(err.stack);
});
