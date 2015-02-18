var integrations = require('../lib/integrations');
var assert = require('assert');
var vm = require('vm');

describe('integrations', function () {
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
});

function evaluate(integration, ctx, expected) {
  var fn = 'settings = (' + integration.settings.toString() + ')()';
  vm.runInNewContext(fn, ctx);

  assert.deepEqual(ctx.settings, expected);
}
