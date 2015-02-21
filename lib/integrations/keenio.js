
/**
 * Keen.io.
 */

exports.name = 'Keen IO';

exports.pattern = /https?:\/\/d26b395fwzu5fz\.cloudfront\.net\/(.+)\/keen\.min\.js/;

exports.settings = function () {
  var projectId = window.client.projectId();
  var writeKey = window.client.writeKey();
  if (!projectId || !writeKey) return false;

  return {
    projectId: projectId,
    writeKey: writeKey
  };
};
