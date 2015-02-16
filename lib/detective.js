
/**
 * Dependencies.
 */

var Nightmare = require('nightmare');
var integrations = require('./');
var array = require('array');
var noop = function(){};

/**
 * Analyze the url.
 *
 * @param {String} url
 * @param {Function} fn
 */

exports.analyze = function(url, fn){
  var nightmare = new Nightmare();
  var results;

  nightmare
    .on('error', noop )
    .goto(normalize(url))
    .wait()
    .evaluate(sources, function(sources){
      results = providers(sources, integrations);
    });
    
  integrations.each(function(integration, i){
    var settings = integration.settings;
    nightmare.evaluate(settings, function(setting){
      if (!setting) return;
      var result = results.find(function(result){ return result.name === setting.name; });
      if (result) {
        delete setting.name;
        result.settings = setting;
      }
    });
  });

  nightmare.run(function(err, nightmare){
    fn(err, results);
  });
}

/**
 * Get all providers.
 *
 * @param {Array} sources
 * @param {Array} tool
 * @return {Array} payload
 */

function providers(sources, tools){
  var payload = array();
  for (var i = 0; i < sources.length; ++i) {
    var src = sources[i];
    tools.each(function(tool, i){
      var provider = tool.pattern;
      if (src.match(provider)) payload.push({ name: tool.name });
    });
  }
  return payload;
};

/**
 * Get all script sources
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
