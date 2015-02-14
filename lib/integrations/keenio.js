
/**
 * Keen.io.
 */

module.exports = {
  name: 'Keen.io',
  pattern: 'api\\.keen\\.io',
  settings: function(){
    return {
      name: 'Keen.io',
      projectId: Object.keys(window._Keen.clients)[0]
    }
  }
};
