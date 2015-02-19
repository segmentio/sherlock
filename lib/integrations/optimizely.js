
/**
 * Optimizely.
 */

exports.name = 'Optimizely';

exports.pattern = /cdn.optimizely.com/;

exports.settings = function () {
  if (!window.optimizely) return false;

  return {
    projectId: window.optimizely.getProjectId(),
    accountId: window.optimizely.getAccountId()
  };
};
