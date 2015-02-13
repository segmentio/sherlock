
/**
 * Heap.
 */

module.exports = {
  name: 'Heap',
  pattern: 'heapanalytics\\.com\\/(js\\/heap\\.js|h|api)',
  settings: function(){
    return {
      'Heap': {
        appId: window.heap.appid
      }
    }
  }
};
