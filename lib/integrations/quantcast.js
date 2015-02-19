
/**
 * Quantcast.
 */

exports.name = 'Quantcast';

exports.pattern = /edge.quantserve.com/;

exports.settings = function () {
  return { pCode: window.__qc.qopts.qacct };
};
