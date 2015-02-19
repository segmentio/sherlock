
/**
 * Adroll.
 */

exports.name = 'Adroll';

exports.pattern = /http(s)?:\/\/(.)\.adroll\.com\/j\/roundtrip\.js/;

exports.settings = function () {
  var advertisingId = window.adroll_adv_id;
  var pixelId = window.adroll_pix_id;
  if (!advertisingId || !pixelId) return false;

  return {
    advertisingId: advertisingId,
    pixelId: pixelId
  };
};
