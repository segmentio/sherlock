
/**
 * Dependencies.
 */

var debug = require('debug')('sherlock');
var normalize = require('normalize-url');
var Nightmare = require('nightmare');

/**
 * Expose `Sherlock`.
 */

module.exports = Sherlock;

/**
 * Sherlock.
 */

function Sherlock() {
  if (!(this instanceof Sherlock)) return new Sherlock();
  this.services = [];
}

/**
 * Analyze a `url`.
 *
 * @param {String} url
 * @param {Function} callback
 */

Sherlock.prototype.analyze = function(url, callback) {
  debug('starting: %s', url);

  var nightmare = new Nightmare({ loadImages: false });
  var services = this.services;
  var results = {};
  var attempts = {};

  nightmare
    .on('error', function (msg) {
      debug('error: %s', msg);
    })
    .on('resourceRequested', function (data, req) {
      var type = data.headers['Content-Type'];
      var isCSS = /http:\/\/.+?\.css/gi;
      var url = data.url;
      
      var shouldAbort = isCSS.test(url) || type === 'text/css';
      if (shouldAbort) req.abort();
    })
    .goto(normalize(url))
    .evaluate(scripts, detect)
    .run(function (err) {
      callback(err, results);
    });

  function detect(tags) {
    debug('scripts: %d', tags.length);

    var matches = match(services, tags);
    debug('matches: %s', Object.keys(matches).join(', '));

    matches.forEach(function (service) {
      var name = service.name;
      var extract = service.settings;

      if (!extract) {
        results[name] = true;
        return;
      }

      attempts[name] = 0;
      nightmare.evaluate(extract, update);

      function update(settings) {
        if (settings) {
          debug('settings: %s', name, settings);
          results[name] = settings;
        } else if (++attempts[name] <= 5) {
          debug('retrying: %s', name);
          nightmare.wait(500).evaluate(extract, update);
        } else {
          debug('no settings: %s', name);
          results[name] = {};
        }
      }
    });
  }
};

/**
 * Use a plugin.
 *
 * @param {Object} plugin
 * @returns {Sherlock}
 */

Sherlock.prototype.use = function (plugin) {
  if (Array.isArray(plugin)) {
    plugin.forEach(this.use, this);
  } else {
    this.services.push(plugin);
  }

  return this;
};

/**
 * Get all matching `tags`.
 *
 * @param {Array:Object} services
 * @param {Array:String} scripts
 * @return {Array:Object}
 */

function match(services, scripts) {
  return services.filter(function (service) {
    if (!service.script) return false;
    return scripts.some(function (src) {
      if (typeof service.script === 'string') {
        return service.script === src;
      } else if (service.script instanceof RegExp) {
        return service.script.test(src);
      } else if (typeof service.script === 'function') {
        return !!service.script(src);
      } else {
        return false;
      }
    });
  });
}

/**
 * Get all of the script tags on a page.
 *
 * @return {Array:String}
 */

function scripts() {
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
