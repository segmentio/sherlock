
/**
 * Olark.
 */

exports.name = 'Olark';

exports.pattern = /static.olark.com/;

exports.settings = function () {
  var siteId = window.olark._.siteId;
  if (!siteId) return false;

  return { siteId: siteId };
};
