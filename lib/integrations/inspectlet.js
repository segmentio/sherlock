
/**
 * Inspectlet.
 */

exports.name = 'Inspectlet';

exports.pattern = /cdn.inspectlet.com/;

exports.settings = function () {
  return { wid: window.__insp.wid };
};
