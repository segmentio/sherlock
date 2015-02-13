
/**
 * Dependencies.
 */

var assert  = require('assert');
var request = require('supertest');
var app     = require('..');

/**
 * Settings.
 */

var route = '/?url=';

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
      var url = 'stevenmiller888.github.io';
      request(app)
        .get(route + url)
        .expect(200)
        .end(done);
    });
    
    it('should 400 if no url is present', function(done){
      var url = '';
      request(app)
        .get(route + url)
        .expect(400)
        .end(function(err, res){
          if (err) return done(err);
          done();
        });
    });
  });
});