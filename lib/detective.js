
/**
 * Dependencies.
 */

var debug = require('debug')('analytics-detective');
var integrations = require('./integrations');
var normalize = require('normalize-url');
var Nightmare = require('nightmare');
var each = require('for-each');

/**
 * Analyze a `url`.
 *
 * @param {String} url
 * @param {Function} callback
 */

exports.analyze = function (url, callback) {
  debug('starting: %s', url);

  var nightmare = new Nightmare({ loadImages: false });
  var results = {};
  var attempts = {};

  nightmare
    .on('error', error)
    .goto(normalize(url))
    .evaluate(tags, evaluate)
    .run(function (err) {
      callback(err, results);
    });

  function error(msg) {
    debug('error: %s', msg);
  }

  function evaluate(tags) {
    var matches = match(tags);

    debug('scripts: %d', tags.length);
    debug('matches: %s', Object.keys(matches).join(', '));

    each(matches, function (integration) {
      var name = integration.name;
      var capture = integration.settings;
      attempts[name] = 0;

      nightmare.evaluate(capture, update);

      function update(settings) {
        if (settings) {
          debug('settings: %s', name, settings);
          results[name] = settings;
        } else if (++attempts[name] <= 5) {
          debug('retrying: %s', name);
          nightmare.wait(500).evaluate(capture, update);
        } else {
          debug('no settings: %s', name);
          results[name] = {};
        }
      }
    });
  }
};

/**
 * Get all matching `tags`.
 *
 * @param {Array} tags
 * @return {Array}
 */

function match(tags) {
  var ret = {};

  each(tags, function (tag) {
    each(integrations, function (integration) {
      if (tag.match(integration.pattern)) ret[integration.name] = integration;
    });
  });

  return ret;
}

/**
 * Get all of the script tags on a page.
 *
 * @return {Array}
 */

function tags() {
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
