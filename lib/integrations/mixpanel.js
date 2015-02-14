
/**
 * Mixpanel.
 */

module.exports = {
  name: 'Mixpanel',
  pattern: '\\.mxpnl\\.com',
  settings: function(){
    return {
      name: 'Mixpanel',
      token: window.mixpanel.config.token
    };
  }
};
