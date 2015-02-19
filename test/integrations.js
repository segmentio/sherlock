var integrations = require('../lib/integrations');
var assert = require('assert');
var vm = require('vm');

describe('integrations', function () {
  describe('Adroll', function () {
    var integration = integrations['Adroll'];

    it('should match all the correct URLs via pattern', function () {
      var urls = [
        'http://s.adroll.com/j/roundtrip.js',
        'https://s.adroll.com/j/roundtrip.js'
      ];

      urls.forEach(function (url) {
        assert(url.match(integration.pattern), url + ' should have been matched');
      });
    });

    it('should return the right settings object', function () {
      var ctx = {
        window: {
          adroll_adv_id: 'a',
          adroll_pix_id: 'b'
        }
      };

      evaluate(integration, ctx, {
        advertisingId: 'a',
        pixelId: 'b'
      });
    });
  });

  describe('Alexa', function () {
    var integration = integrations['Alexa'];

    it('should match all the correct URLs via pattern', function () {
      var urls = [
        '//d31qbv1cthcecs.cloudfront.net/atrk.js'
      ];

      urls.forEach(function (url) {
        assert(url.match(integration.pattern), url + ' should have been matched');
      });
    });

    it('should return the right settings object', function () {
      var ctx = {
        window: {
          _atrk_opts: {
            atrk_acct: 'a',
            domain: 'b'
          }
        }
      };

      evaluate(integration, ctx, {
        accountId: 'a',
        domain: 'b'
      });
    });
  });

  describe('Amplitude', function () {
    var integration = integrations['Amplitude'];

    it('should match all the correct URLs via pattern', function () {
      var urls = [
        'api.amplitude.com',
        'd24n15hnbwhuhn.cloudfront.net'
      ];

      urls.forEach(function (url) {
        assert(url.match(integration.pattern), url + ' should have been matched');
      });
    });

    it('should return the right settings object', function () {
      var ctx = {
        window: {
          amplitude: {
            options: {
              apiKey: 'a'
            }
          }
        }
      };

      evaluate(integration, ctx, { apiKey: 'a' });
    });
  });

  describe('Customer.io', function () {
    var integration = integrations['Customer.io'];

    it('should match all the correct URLs via pattern', function () {
      var urls = [
        '.customer.io'
      ];

      urls.forEach(function (url) {
        assert(url.match(integration.pattern), url + ' should have been matched');
      });
    });

    it('should return the right settings object', function () {
      var ctx = {
        document: {
          getElementById: function () {
            return {
              getAttribute: function () {
                return 'a';
              }
            };
          }
        }
      };

      evaluate(integration, ctx, { siteId: 'a' });
    });
  });

  describe('FullStory', function () {
    var integration = integrations['FullStory'];

    it('should match all the correct URLs via pattern', function () {
      var urls = [
        'https://www.fullstory.com/s/fs.js'
      ];

      urls.forEach(function (url) {
        assert(url.match(integration.pattern), url + ' should have been matched');
      });
    });

    it('should return the right settings object', function () {
      var ctx = {
        window: {
          _fs_org: 'a'
        }
      };

      evaluate(integration, ctx, { fsOrg: 'a' });
    });
  });

  describe('Google Analytics', function () {
    var integration = integrations['Google Analytics'];

    it('should match all the correct URLs via pattern', function () {
      var urls = [
        'google-analytics.com/analytics.js',
        'google-analytics.com/urchin.js',
        'google-analytics.com/ga_exp.js',
        'google-analytics.com/ga.js',
        'google-analytics.com/u/ga_debug.js',
        'google-analytics.com/u/ga_beta.js',
        'google-analytics.com/u/ga.js',
        'google-analytics.com/cx/api.js',
        'google-analytics.com/collect'
      ];

      urls.forEach(function (url) {
        assert(url.match(integration.pattern), url + ' should have been matched');
      });
    });

    it('should return the right settings object for the universal script', function () {
      var ctx = {
        window: {
          ga: {
            getAll: function () {
              return [
                {
                  get: function () {
                    return 'UA-XXXXX-XX';
                  }
                }
              ];
            }
          }
        }
      };

      evaluate(integration, ctx, { trackingId: 'UA-XXXXX-XX' });
    });

    it('should return the right settings object for the classic script', function () {
      var ctx = {
        window: {
          _gat: {
            _getTrackerByName: function () {
              return {
                _getAccount: function () {
                  return 'UA-XXXXX-XX';
                }
              };
            }
          }
        }
      };

      evaluate(integration, ctx, { trackingId: 'UA-XXXXX-XX' });
    });
  });

  describe('Google Tag Manager', function () {
    var integration = integrations['Google Tag Manager'];

    it('should match all the correct URLs via pattern', function () {
      var urls = [
        '.googletagmanager.com'
      ];

      urls.forEach(function (url) {
        assert(url.match(integration.pattern), url + ' should have been matched');
      });
    });

    it('should return the right settings object', function () {
      var ctx = {
        window: {
          google_tag_manager: {
            a: true,
            b: true
          }
        }
      };

      evaluate(integration, ctx, { containerId: 'b' });
    });
  });

  describe('Heap', function () {
    var integration = integrations['Heap'];

    it('should match all the correct URLs via pattern', function () {
      var urls = [
        '.heapanalytics.com/js/heap-123.js'
      ];

      urls.forEach(function (url) {
        assert(url.match(integration.pattern), url + ' should have been matched');
      });
    });

    it('should return the right settings object', function () {
      var ctx = {
        window: {
          heap: {
            appid: 'a'
          }
        }
      };

      evaluate(integration, ctx, { appId: 'a' });
    });
  });

  describe('Inspectlet', function () {
    var integration = integrations['Inspectlet'];

    it('should match all the correct URLs via pattern', function () {
      var urls = [
        'https://cdn.inspectlet.com/inspectlet.js'
      ];

      urls.forEach(function (url) {
        assert(url.match(integration.pattern), url + ' should have been matched');
      });
    });

    it('should return the right settings object for direct integration', function () {
      var ctx = {
        window: {
          __insp: {
            wid: 21923940
          }
        }
      };

      evaluate(integration, ctx, { wid: 21923940 });
    });

    it('should return the right settings object for segment integration', function () {
      var ctx = {
        window: {
          __insp: {
            wid: 21923940
          }
        }
      };

      evaluate(integration, ctx, { wid: 21923940 });
    });
  });

  describe('Intercom', function () {
    var integration = integrations['Intercom'];

    it('should match all the correct URLs via pattern', function () {
      var urls = [
        'api.intercom.io/api/js/library.js',
        'https://widget.intercom.io/widget/'
      ];

      urls.forEach(function (url) {
        assert(url.match(integration.pattern), url + ' should have been matched');
      });
    });

    it('should return the right settings object for direct integration', function () {
      var ctx = {
        window: {
          intercomSettings: {
            app_id: 'a'
          }
        }
      };

      evaluate(integration, ctx, { appId: 'a' });
    });

    it('should return the right settings object for segment integration', function () {
      var ctx = {
        window: {
          analytics: {
            _integrations: {
              Intercom: {
                options: {
                  appId: 'a'
                }
              }
            }
          }
        }
      };

      evaluate(integration, ctx, { appId: 'a' });
    });
  });

  describe('Keen.io', function () {
    var integration = integrations['Keen.io'];

    it('should match all the correct URLs via pattern', function () {
      var urls = [
        'http://d26b395fwzu5fz.cloudfront.net/abc123/keen.min.js',
        'https://d26b395fwzu5fz.cloudfront.net/def456/keen.min.js'
      ];

      urls.forEach(function (url) {
        assert(url.match(integration.pattern), url + ' should have been matched');
      });
    });

    it('should return the right settings object', function () {
      var ctx = {
        window: {
          client: {
            projectId: function () {
              return 'a';
            },
            writeKey: function () {
              return 'b';
            }
          }
        }
      };

      evaluate(integration, ctx, {
        projectId: 'a',
        writeKey: 'b'
      });
    });
  });

  describe('KISSmetrics', function () {
    var integration = integrations['KISSmetrics'];

    it('should match all the correct URLs via pattern', function () {
      var urls = [
        'doug1izaerwt3.cloudfront.net',
        'd1n7kk4vfnecsc.cloudfront.net',
        'd1991e1bwxgrnr.cloudfront.net'
      ];

      urls.forEach(function (url) {
        assert(url.match(integration.pattern), url + ' should have been matched');
      });
    });

    it('should return the right settings object', function () {
      var ctx = {
        window: {
          _kmk: 'a'
        }
      };

      evaluate(integration, ctx, { apiKey: 'a' });
    });
  });

  describe('Mixpanel', function () {
    var integration = integrations['Mixpanel'];

    it('should match all the correct URLs via pattern', function () {
      var urls = [
        '.mxpnl.com'
      ];

      urls.forEach(function (url) {
        assert(url.match(integration.pattern), url + ' should have been matched');
      });
    });

    it('should return the right settings object', function () {
      var ctx = {
        window: {
          mixpanel: {
            config: {
              token: 'a'
            }
          }
        }
      };

      evaluate(integration, ctx, { token: 'a' });
    });
  });

  describe('Olark', function () {
    var integration = integrations['Olark'];

    it('should match all the correct URLs via pattern', function () {
      var urls = [
        'http://static.olark.com/jsclient/loader0.js'
      ];

      urls.forEach(function (url) {
        assert(url.match(integration.pattern), url + ' should have been matched');
      });
    });

    it('should return the right settings object', function () {
      var ctx = {
        window: {
          olark: {
            _: {
              siteId: '1232-123-12-112'
            }
          }
        }
      };

      evaluate(integration, ctx, { siteId: '1232-123-12-112' });
    });
  });

  describe('Optimizely', function () {
    var integration = integrations['Optimizely'];

    it('should match all the correct URLs via pattern', function () {
      var urls = [
        'cdn.optimizely.com'
      ];

      urls.forEach(function (url) {
        assert(url.match(integration.pattern), url + ' should have been matched');
      });
    });

    it('should return the right settings object', function () {
      var ctx = {
        window: {
          optimizely: {
            getProjectId: function () {
              return 'a';
            },
            getAccountId: function () {
              return 'b';
            }
          }
        }
      };

      evaluate(integration, ctx, {
        projectId: 'a',
        accountId: 'b'
      });
    });
  });

  describe('TrackJS', function () {
    var integration = integrations['TrackJS'];

    it('should match all the correct URLs via pattern', function () {
      var urls = [
        'dl1d2m8ri9v3j.cloudfront.net',
        'd2zah9y47r7bi2.cloudfront.net',
        'usage.trackjs.com'
      ];

      urls.forEach(function (url) {
        assert(url.match(integration.pattern), url + ' should have been matched');
      });
    });

    it('should return the right settings object', function () {
      var ctx = {
        window: {
          _trackJs: {
            token: 'a'
          }
        }
      };

      evaluate(integration, ctx, { token: 'a' });
    });
  });

  describe('Woopra', function () {
    var integration = integrations['Woopra'];

    it('should match all the correct URLs via pattern', function () {
      var urls = [
        'http://static.woopra.com/js/w.js'
      ];

      urls.forEach(function (url) {
        assert(url.match(integration.pattern), url + ' should have been matched');
      });
    });

    it('should return the right settings object', function () {
      var ctx = {
        window: {
          woopraTracker: {
            config: function () {
              return {
                domain: 'test.com',
                cookie_name: 'hello',
                cookie_path: '/',
                ping: true,
                ping_interval: 12000,
                idle_timeout: 300000,
                download_tracking: true,
                outgoing_tracking: false,
                outgoing_ignore_subdomain: true,
                download_pause: 200,
                outgoing_pause: 400,
                ignore_query_url: false,
                hide_campaign: true
              };
            }
          }
        }
      };

      evaluate(integration, ctx, {
        domain: 'test.com',
        cookie_name: 'hello',
        cookie_path: '/',
        ping: true,
        ping_interval: 12000,
        idle_timeout: 300000,
        download_tracking: true,
        outgoing_tracking: false,
        outgoing_ignore_subdomain: true,
        download_pause: 200,
        outgoing_pause: 400,
        ignore_query_url: false,
        hide_campaign: true
      });
    });
  });
});

function evaluate(integration, ctx, expected) {
  var fn = 'settings = (' + integration.settings.toString() + ')()';
  vm.runInNewContext(fn, ctx);

  assert.deepEqual(ctx.settings, expected);
}
