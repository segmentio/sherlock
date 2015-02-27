
/**
 * Module dependencies.
 */

var server = require('./server/index.js');
var assert = require('assert');
var sherlock = require('..');

/**
 * Detective.
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

  describe('AdRoll', function () {
    it('should detect script', function (done) {
      var url = fixture('adroll/index.html');

      sherlock.analyze(url, function (err, results) {
        if (err) return done(err);

        assert.deepEqual(results, {
          'AdRoll': {
            advId: 'FSQJWMMZ2NEAZH6XWKVCNO',
            pixId: 'N6HGWT4ALRDRXCAO5PLTB6'
          }
        });

        done();
      });
    });
  });

  describe('Alexa', function () {
    it('should detect script', function (done) {
      var url = fixture('alexa/index.html');

      sherlock.analyze(url, function (err, results) {
        if (err) return done(err);

        assert.deepEqual(results, {
          'Alexa': {
            account: 'mWuej1aAkN00qu',
            domain: 'segment.io'
          }
        });

        done();
      });
    });
  });

  describe('Amplitude', function () {
    it('should detect script', function (done) {
      var url = fixture('amplitude/index.html');
      sherlock.analyze(url, function (err, results) {
        if (err) return done(err);

        assert.deepEqual(results, { 'Amplitude': { apiKey: 'ad3c426eb736d7442a65da8174bc1b1b' } });

        done();
      });
    });
  });

  describe('Customer.io', function () {
    it('should detect script', function (done) {
      var url = fixture('customer-io/index.html');
      sherlock.analyze(url, function (err, results) {
        if (err) return done(err);

        assert.deepEqual(results, { 'Customer.io': { siteId: 'YOUR SITE ID HERE' } });

        done();
      });

    });
  });

  describe('Drip', function () {
    it('should detect script', function (done) {
      var url = fixture('drip/index.html');

      sherlock.analyze(url, function (err, results) {
        if (err) return done(err);

        assert.deepEqual(results, { 'Drip': { account: '2522147' } });

        done();
      });
    });
  });

  describe('FullStory', function () {
    it('should detect script', function (done) {
      var url = fixture('fullstory/index.html');

      sherlock.analyze(url, function (err, results) {
        if (err) return done(err);

        assert.deepEqual(results, { 'FullStory': { org: '<FS_ORG>' } });

        done();
      });
    });
  });

  describe('Google Analytics', function () {
    it('should detect classic script', function (done) {
      var url = fixture('google-analytics/classic.html');

      sherlock.analyze(url, function (err, results) {
        if (err) return done(err);

        assert.deepEqual(results, { 'Google Analytics': { trackingId: 'UA-XXXXX-X' } });

        done();
      });
    });

    it('should detect universal script', function (done) {
      var url = fixture('google-analytics/universal.html');

      sherlock.analyze(url, function (err, results) {
        if (err) return done(err);

        assert.deepEqual(results, { 'Google Analytics': { trackingId: 'UA-XXXX-Y' } });

        done();
      });
    });
  });

  describe('Google Tag Manager', function () {
    it('should detect script', function (done) {
      var url = fixture('google-tag-manager/index.html');

      sherlock.analyze(url, function (err, results) {
        if (err) return done(err);

        assert.deepEqual(results, { 'Google Tag Manager': { containerId: 'GTM-KF7RSC' } });

        done();
      });
    });
  });

  describe('Heap', function () {
    it('should detect script', function (done) {
      var url = fixture('heap/index.html');

      sherlock.analyze(url, function (err, results) {
        if (err) return done(err);

        assert.deepEqual(results, { 'Heap': { appId: '1535634150' } });

        done();
      });
    });
  });

  describe('Inspectlet', function () {
    it('should detect script', function (done) {
      var url = fixture('inspectlet/index.html');

      sherlock.analyze(url, function (err, results) {
        if (err) return done(err);

        assert.deepEqual(results, { 'Inspectlet': { wid: 3456789878 } });

        done();
      });
    });
  });

  describe('Intercom', function () {
    it('should detect script', function (done) {
      var url = fixture('intercom/index.html');

      sherlock.analyze(url, function (err, results) {
        if (err) return done(err);

        assert.deepEqual(results, { 'Intercom': { appId: '<APP_ID>' } });

        done();
      });
    });
  });

  describe('Keen IO', function () {
    it('should detect script', function (done) {
      var url = fixture('keen-io/index.html');

      sherlock.analyze(url, function (err, results) {
        if (err) return done(err);

        assert.deepEqual(results, {
          'Keen IO': {
            projectId: '5408d3f4e875963a9a2e60f7',
            writeKey: 'd258e01d5bb452dcc244b1b458d26b891a72599edae9291d49de6fb365c2a916e35b740331ab1aa0b7a30845d34f0c09f3c560ba59a6f810e49fe13eeeb8dda98b9ee9deae8ca4bf3f6ecd3950ba455ccedd514e1327d2026eac5446168d60723aedcf5a8899c5888b4878527eaafd8c'
          }
        });

        done();
      });
    });
  });

  describe('KISSmetrics', function () {
    it('should detect script', function (done) {
      var url = fixture('kissmetrics/index.html');

      sherlock.analyze(url, function (err, results) {
        if (err) return done(err);

        assert.deepEqual(results, { 'KISSmetrics': { apiKey: '57a0897d0c675651f450229d65ccf4a605112804' } });

        done();
      });
    });
  });

  describe('Mixpanel', function () {
    it('should detect script', function (done) {
      var url = fixture('mixpanel/index.html');

      sherlock.analyze(url, function (err, results) {
        if (err) return done(err);

        assert.deepEqual(results, {
          'Mixpanel': {
            token: 'YOUR TOKEN',
            people: false,
            trackAllPages: true,
            trackCategorizedPages: false,
            trackNamedPages: true
          }
        });

        done();
      });
    });
  });

  describe('Olark', function () {
    it('should detect script', function (done) {
      var url = fixture('olark/index.html');

      sherlock.analyze(url, function (err, results) {
        if (err) return done(err);

        assert.deepEqual(results, { 'Olark': { siteId: '6185-174-10-1457' } });

        done();
      });
    });
  });

  describe('Optimizely', function () {
    it('should detect script', function (done) {
      var url = fixture('optimizely/index.html');

      sherlock.analyze(url, function (err, results) {
        if (err) return done(err);

        assert.deepEqual(results, {
          'Optimizely': {
            projectId: '170430035',
            accountId: '170430035'
          }
        });

        done();
      });
    });
  });

  describe('Quantcast', function () {
    it('should detect script', function (done) {
      var url = fixture('quantcast/index.html');

      sherlock.analyze(url, function (err, results) {
        if (err) return done(err);

        assert.deepEqual(results, { 'Quantcast': { pCode: 'p-test123' } });

        done();
      });
    });
  });

  describe('Totango', function () {
    it('should detect script', function (done) {
      var url = fixture('totango/index.html');

      sherlock.analyze(url, function (err, results) {
        if (err) return done(err);

        assert.deepEqual(results, { 'Totango': { serviceId: 'SP-0000-00' } });

        done();
      });
    });
  });

  describe('Track JS', function () {
    it('should detect script', function (done) {
      var url = fixture('trackjs/index.html');

      sherlock.analyze(url, function (err, results) {
        if (err) return done(err);

        assert.deepEqual(results, { 'Track JS': { token: 'YOUR_TOKEN' } });

        done();
      });
    });
  });

  describe('Woopra', function () {
    it('should detect script', function (done) {
      var url = fixture('woopra/index.html');

      sherlock.analyze(url, function (err, results) {
        if (err) return done(err);

        assert.deepEqual(results, {
          'Woopra': {
            domain: 'test.com',
            cookieName: 'hello',
            cookiePath: '/',
            ping: true,
            pingInterval: 12000,
            idleTimeout: 300000,
            downloadTracking: true,
            outgoingTracking: false,
            outgoingIgnoreSubdomains: true,
            downloadPause: 200,
            outgoingPause: 400,
            ignoreQueryUrl: false,
            hideCampaign: true
          }
        });

        done();
      });
    });
  });
});

function fixture(file) {
  return 'http://localhost:8002/' + file;
}
