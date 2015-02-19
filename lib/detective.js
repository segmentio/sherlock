
/**
 * Dependencies.
 */

var debug = require('debug')('analytics-detective');
var integrations = require('./integrations');
var normalize = require('normalize-url');
var Nightmare = require('nightmare');
var each = require('for-each');

/**
 * Analyze the url.
 *
 * @param {String} url
 * @param {Function} callback
 */

exports.analyze = function (url, callback) {
  debug('starting analysis for %s', url);

  var nightmare = new Nightmare({ loadImages: false });
  var results = {};

  nightmare
    .on('error', function (msg) {
      debug('error on page: %s\n%s', msg);
    })
    .goto(normalize(url))
    .evaluate(sources, function (sources) {
      debug('%d remote script tags found', sources.length);
      var matched = providers(sources);
      debug('providers matched: %s', Object.keys(matched).join(', '));

      var attempts = {};

      each(matched, function (integration) {
        attempts[integration.name] = 0;

        nightmare.evaluate(integration.settings, settings);

        function settings(settings) {
          var count = ++attempts[integration.name];

          if (settings) {
            debug('settings for %s', integration.name, settings);
            results[integration.name] = settings;
          } else if (count <= 5) {
            debug('retrying %s in 500ms', integration.name);
            nightmare.wait(500).evaluate(integration.settings, settings);
          } else {
            debug('could not retrieve settings for %s', integration.name);
          }
        }
      });
    })
    .run(function (err) {
      if (err) {
        debug('nightmare/phantom error: %s', err.stack);
        callback(err);
      } else {
        debug('analysis complete for %s', url);
        callback(null, results);
      }
    });
};

/**
 * Get all providers.
 *
 * @param {Array} sources
 * @return {Array} payload
 */

function providers(sources) {
  var payload = {};
  each(sources, function (src) {
    each(integrations, function (integration) {
      var provider = integration.pattern;
      if (src.match(provider)) payload[integration.name] = integration;
    });
  });
  return payload;
}

/**
 * Get all script sources.
 *
 * @return {Array}
 */

function sources() {
  return [].slice.call(document.getElementsByTagName('script'))
    .filter(function (js) {
      var src = js.src || '';
      var absolute = src.indexOf('//') === 0 || src.indexOf('http') === 0;
      return src || absolute;
    })
    .map(function (js) {
      return js.src;
    });
}
