
/**
 * Google Tag Manager.
 */

exports.name = 'Google Tag Manager';

exports.pattern = /\.googletagmanager\.com/;

exports.settings = function () {
  var containerId = Object.keys(window.google_tag_manager)[1];
  if (!containerId) return false;

  return { containerId: containerId };
};
