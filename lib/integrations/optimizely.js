
/**
 * Optimizely.
 */

exports.name = 'Optimizely';

exports.pattern = /cdn.optimizely.com/;

exports.settings = function () {
  return {
    projectId: window.optimizely.getProjectId(),
    accountId: window.optimizely.getAccountId()
  };
};
