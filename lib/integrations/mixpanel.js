
/**
 * Mixpanel.
 */

module.exports = {
  name: 'Mixpanel',
  pattern: /\.mxpnl\.com/,
  settings: function () {
    return { token: window.mixpanel.config.token };
  }
};
