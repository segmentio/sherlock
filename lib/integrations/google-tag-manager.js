
/**
 * Google Tag Manager.
 */

module.exports = {
  name: 'Google Tag Manager',
  pattern: /\.googletagmanager\.com/,
  settings: function () {
    return { containerId: Object.keys(window.google_tag_manager)[1] };
  }
};
