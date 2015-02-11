
/**
 * Dependencies.
 */

var detective  = require('./lib/detective');
var bodyParser = require('koa-body-parser');
var favicon    = require('koa-favicon');
var koaLogger  = require('koa-logger');
var json       = require('koa-json');
var koa        = require('koa');

/**
 * App.
 */

var app = module.exports = koa();

/**
 * Configuration.
 */

app.name = 'Analytics Detective';
app.port = process.env.PORT || 8001;
app.start = function (port) {
  var name = this.name;
  port = port || this.port;

  this.listen(port, function () {
    console.log('\n  %s listening at http://localhost:%d/\n', name, port);
  });
};

/**
 * Favicon catcher.
 */

app.use(favicon());

/**
 * Logging.
 */

app.use(koaLogger());

/**
 * Body parsing.
 */

app.use(bodyParser());

/**
 * JSON output helper.
 */

app.use(json({ pretty: true }));

/**
 * URL required.
 */

app.use(function*(next){
  var url = this.request.query.url;
  if (!url) this.throw('url required', 400);
  this.state.url = url;
  yield next;
});

/**
 * Detective.
 */

app.use(function*(next){
  var url = this.state.url;  
  var results = yield detective.analyze(url);
  this.body = results;
});

/**
 * Start.
 */
 
if (!module.parent) app.start();
