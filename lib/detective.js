
/**
 * Dependencies.
 */

var integrations = require('./');
var Nightmare = require('nightmare');
var noop = function(){};

/**
 * Analyze the url.
 *
 * @param {String} url
 * @param {Function} fn
 */

exports.analyze = function(url, fn){
  var nightmare = new Nightmare();
  var results = {};

  nightmare
    .on('error', noop )
    .goto(normalize(url))
    .wait()
    .evaluate(sources, function(sources){
      results.integrations = providers(sources, integrations);
    });

  for (var integration in integrations) {
    var settings = integrations[integration].settings;
    nightmare.evaluate(settings, function(setting){
      if (!setting) return;
      for (var i = 0; i < results.integrations.length; i++){
        if (results.integrations[i].name === setting.name) {
          delete setting.name;
          results.integrations[i].settings = setting;
        }
      }
    });
  }

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
  var payload = [];
  for (var i = 0; i < sources.length; ++i) {
    var src = sources[i];
    for (var name in tools) {
      var provider = tools[name].pattern;
      if (!src.match(provider)) continue;
      payload.push({ name: tools[name].name });
      break;
    }
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
