
/**
 * TrackJS.
 */

module.exports = {
  name: 'TrackJS',
  pattern: /(dl1d2m8ri9v3j\.cloudfront\.net|d2zah9y47r7bi2\.cloudfront\.net|usage\.trackjs\.com)/,
  settings: function () {
    return { token: window._trackJs.token };
  }
}
