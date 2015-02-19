
/**
 * KISSmetrics.
 */

exports.name = 'KISSmetrics';

exports.pattern = /(doug1izaerwt3|d1n7kk4vfnecsc|d1991e1bwxgrnr)\.cloudfront\.net/;

exports.settings = function () {
  var apiKey = window._kmk || window.KM_KEY;
  if (!apiKey) return false;

  return { apiKey: apiKey };
};
