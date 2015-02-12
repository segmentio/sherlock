
/**
 * Keen.io.
 */

module.exports = {
  name: 'Keen.io',
  pattern: "api\\.keen\\.io",
  settings: function(){
    return {
      'Keen.io': Object.keys(window._Keen.clients)[0]
    }
  }
};
