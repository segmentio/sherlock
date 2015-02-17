
/**
 * Dependencies.
 */

var integrations = require('./integrations');
var normalize = require('normalize-url');
var Nightmare = require('nightmare');
var each = require('for-each');

/**
 * Analyze the url.
 *
 * @param {String} url
 * @param {Function} fn
 */

exports.analyze = function(url, fn){
  var nightmare = new Nightmare({ loadImages: false });
  var results = {};

  nightmare
    .on('error', fn)
    .goto(normalize(url))
    .evaluate(sources, function(sources){
      each(providers(sources), function (integration) {
        nightmare.evaluate(integration.settings, function(settings){
          results[integration.name] = settings;
        });
      });
    })
    .run(function(err, nightmare){
      if (err) return fn(err);
      fn(null, results);
    });
};

/**
 * Get all providers.
 *
 * @param {Array} sources
 * @return {Array} payload
 */

function providers(sources){
  var payload = {};
  each(sources, function (src) {
    each(integrations, function (integration) {
      var provider = integration.pattern;
      if (src.match(provider)) payload[integration.name] = integration;
    });
  });
  return payload;
};

/**
 * Get all script sources.
 *
 * @return {Array}
 */

function sources(){
  return [].slice.call(document.getElementsByTagName('script'))
    .filter(function (js) {
      var src = js.src || '';
      var absolute = 0 == src.indexOf('//') || 0 == src.indexOf('http');
      return src || absolute;
    })
    .map(function (js) {
      return js.src;
    });
}
