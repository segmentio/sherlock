
/**
 * Heap.
 */

exports.name = 'Heap';

exports.pattern = /\.heapanalytics\.com\/(js\/heap-\d+\.js)/;

exports.settings = function () {
  return { appId: window.heap.appid };
};
