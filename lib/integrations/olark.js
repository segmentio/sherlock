
/**
 * Olark.
 */

exports.name = 'Olark';

exports.pattern = /static.olark.com/;

exports.settings = function () {
  if (!window.olark) return false;

  return { siteId: window.olark._.siteId };
};
