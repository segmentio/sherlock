
/**
 * Adroll.
 */

exports.name = 'Adroll';

exports.pattern = /http(s)?:\/\/(.)\.adroll\.com\/j\/roundtrip\.js/;

exports.settings = function () {
  return {
    advertisingId: window.adroll_adv_id,
    pixelId: window.adroll_pix_id
  };
};
