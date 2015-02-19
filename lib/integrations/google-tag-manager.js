
/**
 * Google Tag Manager.
 */

exports.name = 'Google Tag Manager';

exports.pattern = /\.googletagmanager\.com/;

exports.settings = function () {
  if (!window.google_tag_manager) return false;

  return { containerId: Object.keys(window.google_tag_manager)[1] };
};
