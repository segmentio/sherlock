
/**
 * Google Analytics.
 */

exports.name = 'Google Analytics';

exports.pattern = /google-analytics.com/;

exports.settings = function () {
  var trackingId = '';

  if (window.ga) trackingId = getUniversal();
  if (window._gat) trackingId = getClassic();

  return { trackingId: trackingId };

  function getUniversal() {
    var tracker = window.ga.getAll()[0];
    return tracker.get('trackingId');
  }

  function getClassic() {
    var pageTracker = window._gat._getTrackerByName();
    return pageTracker._getAccount();
  }
};
