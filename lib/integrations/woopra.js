
/**
 * Woopra.
 */

exports.name = 'Woopra';

exports.pattern = /static.woopra.com/;

exports.settings = function () {
  if (!window.woopraTracker) return false;

  var config = window.woopraTracker.config();
  return {
    domain: config.domain,
    cookie_name: config.cookie_name,
    cookie_path: config.cookie_path,
    ping: config.ping,
    ping_interval: config.ping_interval,
    idle_timeout: config.idle_timeout,
    download_tracking: config.download_tracking,
    outgoing_tracking: config.outgoing_tracking,
    outgoing_ignore_subdomain: config.outgoing_ignore_subdomain,
    download_pause: config.download_pause,
    outgoing_pause: config.outgoing_pause,
    ignore_query_url: config.ignore_query_url,
    hide_campaign: config.hide_campaign
  };
};
