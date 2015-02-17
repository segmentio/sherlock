
/**
 * Adroll.
 */

module.exports = {
  name: 'Adroll',
  pattern: 'http(s)?://s.adroll.com/j/roundtrip.js',
  settings: function() {
    return {
      name: 'Adroll',
      advertisingId: window.adroll_adv_id,
      pixelId: window.adroll_pix_id
    };
  }
};
