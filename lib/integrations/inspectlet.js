
/**
 * Inspectlet.
 */

exports.name = 'Inspectlet';

exports.pattern = /cdn.inspectlet.com/;

exports.settings = function () {
  if (!window.__insp) return false;

  return { wid: window.__insp.wid };
};
