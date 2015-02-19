
/**
 * Dependencies.
 */

var request = require('supertest');
var assert = require('assert');
var app = require('..');

/**
 * Set the env.
 */

app.env = 'testing';

/**
 * Tests.
 */

describe('server', function () {
  it('should expose a koa app', function *() {
    assert(app);
    assert(app.use);
  });

  describe('GET /?url=<url>', function () {
    this.slow('5s');
    this.timeout('15s');

    before(function* () {
      app = app.listen();
    });

    it('should 403 if no url is present', function (done) {
      this.slow(200);
      this.timeout('1s');

      request(app)
        .get('/')
        .expect(403)
        .end(function () {
          done();
        });
    });

    it('should properly handle dbarnes.info', function (done) {
      request(app)
        .get('/')
        .query({ url: 'dbarnes.info' })
        .expect(200, {
          'Google Analytics': {
            trackingId: 'UA-34996343-1'
          }
        })
        .end(done);
    });

    it('should properly handle starbucks.com', function (done) {
      request(app)
        .get('/')
        .query({ url: 'starbucks.com' })
        .expect(200, {
          'Google Analytics': {
            trackingId: 'UA-9155837-1'
          },
          'Google Tag Manager': {
            containerId: 'GTM-NQ2H5B'
          },
          'Optimizely': {
            accountId: '6558036',
            projectId: '6558036'
          }
        })
        .end(done);
    });

    it('should properly handle piazza.com', function (done) {
      request(app)
        .get('/')
        .query({ url: 'piazza.com' })
        .expect(200, {
          'Google Analytics': {
            trackingId: 'UA-21514163-1'
          }
        })
        .end(done);
    });
  });
});
