
/**
 * Mixpanel.
 */

exports.name = 'Mixpanel';

exports.pattern = /\.mxpnl\.com/;

exports.settings = function () {
  if (!window.mixpanel) return false;

  return { token: window.mixpanel.config.token };
};
