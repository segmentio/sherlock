
/**
 * Dependencies.
 */

var debug        = require('debug')('detective');
var inspect      = require('util').inspect;
var Nightmare    = require('nightmare');
var thunkify     = require('thunkify');
var integrations = require('./');

/**
 * Detective.
 */

function Detective(){
  if (!(this instanceof Detective)) return new Detective();
  this.results = { 'integrations': [] };
}

/**
 * Analyze.
 *
 * @param {String} url
 * @param {Function} fn
 */

Detective.prototype.analyze = function(url, fn){
  debug('Analyzing ' + url);
  var self = this;
  
  var nightmare = new Nightmare();
  
  nightmare
    .on('error', function(msg){ return; })
    .goto(normalize(url))
    .wait()
    .evaluate(sources, function(sources){
      debug('Found sources... ' + sources);
      var res = providers(sources);
      debug('Found providers...' + inspect(res));
      self.results['integrations'] = res;
    });

  for (var integration in integrations) {
    var settings = integrations[integration].settings;
    nightmare.evaluate(settings, function(keys){
      debug('Found key... ' + inspect(keys));
      if (keys) var key = Object.keys(keys)[0];
      if (keys && key) {
        for (var i = 0; i < self.results['integrations'].length; i++){
          if (self.results['integrations'][i].name === key) self.results['integrations'][i].settings = keys[key];
        }
      }
    });
  }

  nightmare.run(function(err, nightmare){
    debug('Finished! Here are the results: ' + inspect(self.results));
    fn(err, self.results);
  });
}

/**
 * Get all providers.
 *
 * @param {Array} sources
 * @return {Object} payload
 */

function providers(sources){
  debug('Getting providers...');
  var payload = [];
  for (var i = 0; i < sources.length; ++i) {
    var src = sources[i]; 
    for (var name in integrations) {
      var provider = integrations[name].pattern;
      if (!src.match(new RegExp(provider))) continue;
      payload.push({ name: name });
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

/**
 * Thunkify.
 */

var detective = Detective();
detective.analyze = thunkify(detective.analyze.bind(detective));

/**
 * Expose `detective`.
 */

module.exports = detective;
