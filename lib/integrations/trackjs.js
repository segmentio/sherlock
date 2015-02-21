
/**
 * TrackJS.
 */

exports.name = 'Track JS';

exports.pattern = /(dl1d2m8ri9v3j|d2zah9y47r7bi2)\.cloudfront\.net|usage\.trackjs\.com/;

exports.settings = function () {
  var token = window._trackJs.token;
  if (!token) return false;

  return { token: token };
};
