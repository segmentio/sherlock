
/**
 * Quantcast.
 */

exports.name = 'Quantcast';

exports.pattern = /edge.quantserve.com/;

exports.settings = function () {
  var pCode = window.__qc.qopts.qacct;
  if (!pCode) return false;

  return { pCode: pCode };
};
