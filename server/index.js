
/**
 * Dependencies.
 */

var detective = require('../lib/detective');
var favicon = require('koa-favicon');
var logger = require('koa-logger');
var thunkify = require('thunkify');
var json = require('koa-json');
var cors = require('koa-cors');
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
 * CORS.
 */

app.use(cors());

/**
 * Logging.
 */

app.use(logger());

/**
 * Ping.
 */

app.use(function *(next) {
  if (this.path === '/ping') return this.status = 200;
  yield next;
});

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

app.use(function *() {
  var url = this.query.url;
  if (!url) this.throw(403, 'You need to provide a ?url= query argument.');
  this.body = yield detective.analyze(url);
});

/**
 * Error-handing.
 */

app.on('error', function (err) {
  if (app.env !== 'testing') console.error(err.stack);
});

/**
 * Config.
 */

app.name = 'Analytics Detective';
app.port = 8001;

/**
 * Start.
 */

app.listen(app.port, function () {
  console.log('\n Query %s at http://localhost:%d/?url=<url>\n', app.name, app.port);
});
