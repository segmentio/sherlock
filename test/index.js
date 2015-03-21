
/**
 * Module dependencies.
 */

var server = require('./server/index.js');
var assert = require('assert');
var Sherlock = require('..');

/**
 * Initialize Sherlock.
 */

var sherlock = Sherlock();

/**
 * Sherlock.
 */

describe('sherlock.analyze(url)', function () {
  this.slow('3s');
  this.timeout('10s');

  before(function (done) {
    server.listen(8002, done);
  });

  after(function (done) {
    server.close(done);
  });
});