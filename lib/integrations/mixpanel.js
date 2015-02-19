
/**
 * Mixpanel.
 */

exports.name = 'Mixpanel';

exports.pattern = /\.mxpnl\.com/;

exports.settings = function () {
  var token = window.mixpanel.config.token;
  if (!token) return false;

  return { token: token };
};
