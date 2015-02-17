
/**
 * Google Analytics.
 */

module.exports = {
  name: 'Google Analytics',
  pattern: 'google-analytics\\.com\\/(analytics\\.js|urchin\\.js|ga_exp\\.js|ga\\.js|u\\/ga_debug\\.js|u\\/ga_beta\\.js|u\\/ga\\.js|cx\\/api\\.js|collect)',
  settings: function(){
    var trackingId = '';

    if (window.ga) trackingId = getUniversal();
    if (window._gat) trackingId = getClassic();

    return { trackingId: trackingId };

    function getUniversal(){
      var tracker = ga.getAll()[0];
      var trackingId = tracker.get('trackingId');
      return trackingId;
    }

    function getClassic(){
      var pageTracker = _gat._getTrackerByName();
      var accountId = pageTracker._getAccount();
      return accountId;
    }
  }
};
