
/**
 * Dependencies.
 */

var Nightmare = require('nightmare');
var integrations = require('./');
var noop = function(){};

/**
 * Analyze the url.
 *
 * @param {String} url
 * @param {Function} fn
 */

exports.analyze = function(url, fn){
  var nightmare = new Nightmare();
  var recognized = {};
  var results = [];

  nightmare
    .on('error', noop)
    .goto(normalize(url))
    .evaluate(sources, function(sources){
      recognized = providers(sources);
    });

  integrations.forEach(function(integration){
    nightmare.evaluate(integration.settings, function(settings){
      if (!settings) return;

      var result = recognized.filter(function(result) {
        return result.name === settings.name;
      });

      if (result.length) {
        result = result[0];
        var name = settings.name;
        delete settings.name;
        result.settings = settings;
        results.push(result);
      }
    });
  });

  nightmare.run(function(err, nightmare){
    fn(err, results);
  });
};

/**
 * Get all providers.
 *
 * @param {Array} sources
 * @return {Array} payload
 */

function providers(sources){
  var payload = [];
  for (var i = 0; i < sources.length; ++i) {
    var src = sources[i];
    integrations.forEach(function(integration){
      var provider = integration.pattern;
      if (src.match(provider)) payload.push({ name: integration.name });
    });
  }
  return payload;
};

/**
 * Get all script sources.
 *
 * @return {Array}
 */

function sources(){
  var all = document.getElementsByTagName('script');
  return [].reduce.call(all, function(arr, js){
    var src = js.src || '';
    var absolute = 0 == src.indexOf('//') || 0 == src.indexOf('http');
    if (!src || !absolute) return arr;
    arr.push(src);
    return arr;
  }, []);
}

/**
 * Normalize the URL.
 *
 * @param {String} url
 * @return {String} url
 */
		
function normalize(url){
  if (!~url.indexOf('//')) url = '//' + url;
  if (!~url.indexOf(':')) url = ':' + url;
  if (!~url.indexOf('https') && !~url.indexOf('http')) url = 'http' + url;
  return url;
}
