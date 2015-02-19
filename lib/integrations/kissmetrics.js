
/**
 * KISSmetrics.
 */

exports.name = 'KISSmetrics';

exports.pattern = /(doug1izaerwt3|d1n7kk4vfnecsc|d1991e1bwxgrnr)\.cloudfront\.net/;

exports.settings = function () {
  if (!window._kmk && !window.KM_KEY) return false;

  return { apiKey: window._kmk || window.KM_KEY };
};
