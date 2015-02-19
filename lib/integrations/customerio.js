
/**
 * Customer.io.
 */

exports.name = 'Customer.io';

exports.pattern = /\.customer\.io/;

exports.settings = function () {
  var script = document.getElementById('cio-tracker');
  var siteId = script.getAttribute('data-site-id');
  if (!siteId) return false;

  return { siteId: siteId };
};
