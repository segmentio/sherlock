
/**
 * Dependencies.
 */

var os = require('os');

/**
 * Initialize stats middleware with `opts`
 *
 * @param {Object} opts
 */

module.exports = function(opts){
  opts = opts || {};
  var path = opts.path || '/ping';

  return function *stats(next){
    if (path !== this.path) return yield next;
    
    var obj = {
      timestamp: Date.now(),
      uptime: process.uptime(),
      application: {
        pid: process.pid,
        title: process.title,
        argv: process.argv,
        versions: process.versions,
        node_env: process.env.NODE_ENV
      },
      resources: {
        memory: process.memoryUsage(),
        loadavg: os.loadavg(),
        cpu: os.cpus(),
        nics: os.networkInterfaces()
      },
      system: {
        arch: process.arch,
        platform: process.platform,
        type: os.type(),
        release: os.release(),
        hostname: os.hostname(),
        uptime: os.uptime(),
        cores: os.cpus().length,
        memory: os.totalmem()
      }
    };
    
    this.body = obj;
  }
}
