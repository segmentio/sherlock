
/**
 * Module dependencies.
 */

var detective = require('../lib/detective');
var server = require('./server');
var assert = require('assert');

/**
 * Detective.
 */

describe('detective.analyze(url)', function () {
  this.slow('3s');
  this.timeout('10s');

  before(function (done) {
    server.listen(8002, done);
  });

  describe('Adroll', function () {
    it('should detect script', function *() {
      var url = fixture('adroll/index.html');
      var results = yield detective.analyze(url);

      assert.deepEqual(results, {
        'Adroll': {
          advertisingId: 'FSQJWMMZ2NEAZH6XWKVCNO',
          pixelId: 'N6HGWT4ALRDRXCAO5PLTB6'
        }
      });
    });
  });
  
  describe.only('Alexa', function () {
    it('should detect script', function *() {
      var url = fixture('alexa/index.html');
      var results = yield detective.analyze(url);

      assert.deepEqual(results, {
        'Alexa': {
          accountId: 'mWuej1aAkN00qu',
          domain: 'segment.io'
        }
      });
    });
  });

  describe('Amplitude', function () {
    it('should detect script', function *() {
      var url = fixture('amplitude/index.html');
      var results = yield detective.analyze(url);

      assert.deepEqual(results, { 'Amplitude': { apiKey: 'ad3c426eb736d7442a65da8174bc1b1b' } });
    });
  });

  describe('Customer.io', function () {
    it('should detect script', function *() {
      var url = fixture('customer-io/index.html');
      var results = yield detective.analyze(url);

      assert.deepEqual(results, { 'Customer.io': { siteId: 'YOUR SITE ID HERE' } });
    });
  });
  
  describe('FullStory', function () {
    it('should detect script', function *() {
      var url = fixture('fullstory/index.html');
      var results = yield detective.analyze(url);

      assert.deepEqual(results, { 'FullStory': { fsOrg: '<FS_ORG>' } });
    });
  });

  describe('Google Analytics', function () {
    it('should detect classic script', function *() {
      var url = fixture('google-analytics/classic.html');
      var results = yield detective.analyze(url);

      assert.deepEqual(results, { 'Google Analytics': { trackingId: 'UA-XXXXX-X' } });
    });

    it('should detect universal script', function *() {
      var url = fixture('google-analytics/universal.html');
      var results = yield detective.analyze(url);

      assert.deepEqual(results, { 'Google Analytics': { trackingId: 'UA-XXXX-Y' } });
    });
  });

  describe('Google Tag Manager', function () {
    it('should detect script', function *() {
      var url = fixture('google-tag-manager/index.html');
      var results = yield detective.analyze(url);

      assert.deepEqual(results, { 'Google Tag Manager': { containerId: 'GTM-KF7RSC' } });
    });
  });

  describe('Heap', function () {
    it('should detect script', function *() {
      var url = fixture('heap/index.html');
      var results = yield detective.analyze(url);

      assert.deepEqual(results, { 'Heap': { appId: '1535634150' } });
    });
  });

  describe('Keen.io', function () {
    it('should detect script', function *() {
      var url = fixture('keen-io/index.html');
      var results = yield detective.analyze(url);

      assert.deepEqual(results, {
        'Keen.io': {
          projectId: '5408d3f4e875963a9a2e60f7',
          writeKey: 'd258e01d5bb452dcc244b1b458d26b891a72599edae9291d49de6fb365c2a916e35b740331ab1aa0b7a30845d34f0c09f3c560ba59a6f810e49fe13eeeb8dda98b9ee9deae8ca4bf3f6ecd3950ba455ccedd514e1327d2026eac5446168d60723aedcf5a8899c5888b4878527eaafd8c'
        }
      });
    });
  });
  
  describe('KISSmetrics', function () {
    it('should detect script', function *() {
      var url = fixture('kissmetrics/index.html');
      var results = yield detective.analyze(url);

      assert.deepEqual(results, { 'KISSmetrics': { apiKey: '57a0897d0c675651f450229d65ccf4a605112804' } });
    });
  });

  describe('Mixpanel', function () {
    it('should detect script', function *() {
      var url = fixture('mixpanel/index.html');
      var results = yield detective.analyze(url);

      assert.deepEqual(results, { 'Mixpanel': { token: 'YOUR TOKEN' } });
    });
  });

  describe('TrackJS', function () {
    it('should detect script', function *() {
      var url = fixture('trackjs/index.html');
      var results = yield detective.analyze(url);

      assert.deepEqual(results, { 'TrackJS': { token: 'YOUR_TOKEN' } });
    });
  });
});

function fixture(file) {
  return 'http://localhost:8002/' + file;
}
