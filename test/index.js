
var assert = require('assert');
var server = require('./server');
var Sherlock = require('..');
var url = require('url');

describe('Sherlock()', function () {
  it('should be a function', function () {
    assert.equal(typeof Sherlock, 'function');
  });

  it('should be a constructor', function () {
    var sherlock = new Sherlock();
    assert(sherlock instanceof Sherlock);
  });

  it('should not require the new keyword', function () {
    var sherlock = Sherlock();
    assert(sherlock instanceof Sherlock);
  });

  it('should initialize an empty list of services', function () {
    var sherlock = new Sherlock();
    assert.deepEqual(sherlock.services, []);
  });
});

describe('Sherlock#use(plugin)', function () {
  it('should add a single service to the list', function () {
    var sherlock = new Sherlock();
    sherlock.use({ name: 'A' });
    assert.deepEqual(sherlock.services, [ { name: 'A' } ]);
  });

  it('should add an array of services', function () {
    var sherlock = new Sherlock();
    sherlock.use([ { name: 'A' }, { name: 'B' } ]);
    assert.deepEqual(sherlock.services, [
      { name: 'A' },
      { name: 'B' }
    ]);
  });
});

describe('Sherlock#analyze(url)', function () {
  before(function (done) {
    server.listen(7500, done);
  });

  describe('service.name', function () {
    it('should use the name on the results object', function (done) {
      Sherlock()
        .use({
          name: 'example',
          script: 'http://www.example.com/'
        })
        .analyze(fixture('example'), function (err, results) {
          if (err) return done(err);
          assert('example' in results);
          done();
        });
    });
  });

  describe('service.script', function () {
    it('should detect our custom tracker with a string', function (done) {
      Sherlock()
        .use({
          name: 'example',
          script: 'http://www.example.com/'
        })
        .analyze(fixture('example'), function (err, results) {
          if (err) return done(err);
          assert.deepEqual(results, { example: true });
          done();
        });
    });

    it('should detect our custom tracker with a regex', function (done) {
      Sherlock()
        .use({
          name: 'example',
          script: /example\.com/
        })
        .analyze(fixture('example'), function (err, results) {
          if (err) return done(err);
          assert.deepEqual(results, { example: true });
          done();
        });
    });

    it('should detect our custom tracker with a function', function (done) {
      Sherlock()
        .use({
          name: 'example',
          script: function (src) {
            return src.indexOf('example.com') > -1;
          }
        })
        .analyze(fixture('example'), function (err, results) {
          if (err) return done(err);
          assert.deepEqual(results, { example: true });
          done();
        });
    });
  });

  describe('service.settings', function () {
    it('should extract the settings from the page', function (done) {
      Sherlock()
        .use({
          name: 'example',
          script: 'http://www.example.com/',
          settings: function () {
            return window.example.id;
          }
        })
        .analyze(fixture('example'), function (err, results) {
          if (err) return done(err);
          assert.deepEqual(results, { example: 'abc123' });
          done();
        });
    });
  });
});

/**
 * Generate a fixture URL.
 *
 * @param {String} name
 * @returns {String}
 */

function fixture(name) {
  return url.resolve('http://localhost:7500/', name);
}
