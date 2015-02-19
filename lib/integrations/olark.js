
/**
 * Olark.
 */

exports.name = 'Olark';

exports.pattern = /static.olark.com/;

exports.settings = function () {
  return { siteId: window.olark._.siteId };
};
