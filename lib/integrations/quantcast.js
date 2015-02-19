
/**
 * Quantcast.
 */

exports.name = 'Quantcast';

exports.pattern = /edge.quantserve.com/;

exports.settings = function () {
  if (!window.__qc.qopts.qacct) return false;

  return { pCode: window.__qc.qopts.qacct };
};
