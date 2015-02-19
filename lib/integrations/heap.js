
/**
 * Heap.
 */

exports.name = 'Heap';

exports.pattern = /\.heapanalytics\.com\/(js\/heap-\d+\.js)/;

exports.settings = function () {
  if (!window.heap) return false;

  return { appId: window.heap.appid };
};
