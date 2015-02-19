
/**
 * Adroll.
 */

exports.name = 'Adroll';

exports.pattern = /http(s)?:\/\/(.)\.adroll\.com\/j\/roundtrip\.js/;

exports.settings = function () {
  if (!window.adroll_adv_id || !window.adroll_pix_id) return false;

  return {
    advertisingId: window.adroll_adv_id,
    pixelId: window.adroll_pix_id
  };
};
