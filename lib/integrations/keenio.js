
/**
 * Keen.io.
 */

module.exports = {
  name: 'Keen.io',
  pattern: 'api\\.keen\\.io',
  settings: function(){
    return {
      'Keen.io': {
        projectId: Object.keys(window._Keen.clients)[0]
      }
    }
  }
};
