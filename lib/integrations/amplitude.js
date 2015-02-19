
/**
 * Amplitude.
 */

exports.name = 'Amplitude';

exports.pattern = /(api\.amplitude\.com|d24n15hnbwhuhn\.cloudfront\.net)/;

exports.settings = function () {
  if (!window.amplitude) return false;

  return { apiKey: window.amplitude.options.apiKey };
};
