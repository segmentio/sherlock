
/**
 * Customer.io.
 */

exports.name = 'Customer.io';

exports.pattern = /\.customer\.io/;

exports.settings = function () {
  var script = document.getElementById('cio-tracker');
  return { siteId: script.getAttribute('data-site-id') };
};
