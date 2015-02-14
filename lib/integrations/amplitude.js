
/**
 * Amplitude.
 */

module.exports = {
  name: 'Amplitude',
  pattern: '(api\\.amplitude\\.com|d24n15hnbwhuhn\\.cloudfront\\.net)',
  settings: function() {
    return {
      name: 'Amplitude',
      apiKey: window.amplitude.options.apiKey
    };
  }
};
