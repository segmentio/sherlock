
/**
 * Module dependencies.
 */

var detective = require('../lib/detective');
var server = require('./server');
var assert = require('assert');
var path = require('path');

/**
 * Detective.
 */

describe('detective.analyze(url)', function () {
  this.slow('7s');
  this.timeout('10s');

  before(function (done) {
    server.listen(8002, done);
  });

  describe('Google Analytics', function () {
    it('should detect classic script', function *() {
      var url = fixture('google-analytics/classic.html');
      var results = yield detective.analyze(url);

      detected(results, 'Google Analytics', { trackingId: 'UA-XXXXX-X' })
    });

    it('should detect universal script', function *() {
      var url = fixture('google-analytics/universal.html');
      var results = yield detective.analyze(url);

      detected(results, 'Google Analytics', { trackingId: 'UA-XXXX-Y' })
    });
  });
  describe('Google Tag Manager', function () {
    it('should detect script', function *() {
      var url = fixture('google-tag-manager/index.html');
      var results = yield detective.analyze(url);

      detected(results, 'Google Tag Manager', { containerId: 'GTM-KF7RSC' })
    });
  });
  describe('Mixpanel', function () {
    it('should detect script', function *() {
      var url = fixture('mixpanel/index.html');
      var results = yield detective.analyze(url);

      detected(results, 'Mixpanel', { token: 'YOUR TOKEN' })
    });
  });
  describe('FullStory', function () {
    it('should detect script', function *() {
      var url = fixture('fullstory/index.html');
      var results = yield detective.analyze(url);

      detected(results, 'FullStory', { fsOrg: '<FS_ORG>' })
    });
  });
  describe('TrackJS', function () {
    it('should detect script', function *() {
      var url = fixture('trackjs/index.html');
      var results = yield detective.analyze(url);

      detected(results, 'TrackJS', { token: 'YOUR_TOKEN' })
    });
  });
  describe('KISSmetrics', function () {
    it('should detect script', function *() {
      var url = fixture('kissmetrics/index.html');
      var results = yield detective.analyze(url);

      detected(results, 'KISSmetrics', { apiKey: '57a0897d0c675651f450229d65ccf4a605112804' })
    });
  });
});

function fixture(file) {
  return 'http://localhost:8002/' + file;
}

function detected(results, name, settings) {
  var found = results.integrations.filter(function (integration) {
    return integration.name === name;
  })[0];

  assert.deepEqual(found, {
    name: name,
    settings: settings
  });
}
