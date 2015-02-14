
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

describe('analytics-detective', function(){
  describe('server', function(){
    it('should expose a koa app', function*(){
      assert(app);
      assert(app.use);
    });
  });

  describe('GET /?url=<url>', function(){
    before(function*(){
      app = app.listen();
    });

    it('should 200', function(done){
      this.slow('10s')
      this.timeout('15s');

      request(app)
        .get('/')
        .query({ url: 'stevenmiller888.github.io' })
        .expect(200)
        .end(done);
    });

    it('should 400 if no url is present', function(done){
      request(app)
        .get('/')
        .expect(403)
        .end(function(){
          done();
        });
    });
  });
});
