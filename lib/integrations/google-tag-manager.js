
/**
 * Google Tag Manager.
 */

module.exports = {
  name: 'Google Tag Manager',
  pattern: '\\.googletagmanager\\.com',
  settings: function(){
    return {
      name: 'Google Tag Manager',
      containerId: Object.keys(window.google_tag_manager)[1]
    }
  }
};
