
/**
 * Heap.
 */

module.exports = {
  name: 'Heap',
  pattern: /\.heapanalytics\.com\/(js\/heap-\d+\.js)/,
  settings: function () {
    return { appId: window.heap.appid };
  }
};
