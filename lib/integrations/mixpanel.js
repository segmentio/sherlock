
/**
 * Mixpanel.
 */

exports.name = 'Mixpanel';

exports.pattern = /\.mxpnl\.com/;

exports.settings = function () {
  return { token: window.mixpanel.config.token };
};
