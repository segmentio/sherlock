
/**
 * Customer.io.
 */

exports.name = 'Customer.io';

exports.pattern = /\.customer\.io/;

exports.settings = function () {
  var script = document.getElementById('cio-tracker');
  if (!script) return false;

  return { siteId: script.getAttribute('data-site-id') };
};
