
/**
 * Mixpanel.
 */

module.exports = {
  name: 'Mixpanel',
  pattern: '\\.mxpnl\\.com',
  settings: function(){
    return {
      'Mixpanel': window.mixpanel.config.token
    };
  }
};