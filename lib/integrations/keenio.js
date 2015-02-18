
/**
 * Keen.io.
 */

module.exports = {
  name: 'Keen.io',
  pattern: /https?:\/\/d26b395fwzu5fz.cloudfront.net\/(.+)\/keen.min.js/,
  settings: function () {
    return {
      projectId: window.client.projectId(),
      writeKey: window.client.writeKey()
    };
  }
};
