
/**
 * Woopra.
 */

exports.name = 'Woopra';

exports.pattern = /static.woopra.com/;

exports.settings = function () {
  var config = window.woopraTracker.config();
  if (!config) return false;

  return {
    domain: config.domain,
    cookieName: config.cookie_name,
    cookiePath: config.cookie_path,
    ping: config.ping,
    pingInterval: config.ping_interval,
    idleTimeout: config.idle_timeout,
    downloadTracking: config.download_tracking,
    outgoingTracking: config.outgoing_tracking,
    outgoingIgnoreSubdomains: config.outgoing_ignore_subdomain,
    downloadPause: config.download_pause,
    outgoingPause: config.outgoing_pause,
    ignoreQueryUrl: config.ignore_query_url,
    hideCampaign: config.hide_campaign
  };
};
