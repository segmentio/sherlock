
/**
 * Keen.io.
 */

exports.name = 'Keen.io';

exports.pattern = /https?:\/\/d26b395fwzu5fz\.cloudfront\.net\/(.+)\/keen\.min\.js/;

exports.settings = function () {
  if (!window.client) return false;

  return {
    projectId: window.client.projectId(),
    writeKey: window.client.writeKey()
  };
};
