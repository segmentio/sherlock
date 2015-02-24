
/**
 * Totango.
 */

exports.name = 'Totango';

exports.pattern = /s3.amazonaws.com\/totango-cdn/;

exports.settings = function () {
  var service_id = window.totango_options.service_id;
  if (!service_id) return false;

  return { serviceId: service_id };
};
