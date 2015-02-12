
/**
 * Google Analytics.
 */

module.exports = {
  name: 'Google Analytics',
  pattern: 'google-analytics\\.com\\/(analytics\\.js|urchin\\.js|ga_exp\\.js|ga\\.js|u\\/ga_debug\\.js|u\\/ga_beta\\.js|u\\/ga\\.js|cx\\/api\\.js|collect)',
  settings: function(){
    var trackingId;
    ga(function(tracker) {
      trackingId = tracker.get('trackingId');
    });
    return {
      'Google Analytics': trackingId || ''
    }
  }
};