
/**
 * Adroll.
 */

exports.name = 'AdRoll';

exports.pattern = /http(s)?:\/\/(.)\.adroll\.com\/j\/roundtrip\.js/;

exports.settings = function () {
  var advId = window.adroll_adv_id;
  var pixId = window.adroll_pix_id;
  if (!advId || !pixId) return false;

  return {
    advId: advId,
    pixId: pixId
  };
};
