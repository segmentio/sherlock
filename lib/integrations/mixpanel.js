
/**
 * Mixpanel.
 */

module.exports = {
  name: 'Mixpanel',
  pattern: '\\.mxpnl\\.com',
  settings: function(){
    return {
      'Mixpanel': {
        token: window.mixpanel.config.token
      }
    };
  }
};