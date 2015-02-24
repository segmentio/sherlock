
/**
 * Totango.
 */

exports.name = 'Totango';

exports.pattern = /s3\.amazonaws\.com\/totango\-cdn/;

exports.settings = function () {
  var serviceId = window.totango_options.service_id;
  if (!serviceId) return false;

  return { serviceId: serviceId };
};
