
/**
 * Intercom.
 */

module.exports = {
  name: 'Intercom',
  pattern: '(api\\.intercom\\.io\\/api\\/js\\/library\\.js|static\\.intercomcdn\\.com\\/intercom\\.v1\\.js)',
  settings: function(){
    var appId;
    
    if (window.intercomSettings) appId = window.intercomSettings.app_id;
    if (window.analytics) appId = window.analytics._integrations.Intercom.options.appId;
  
    return {
      name: 'Intercom',
      appId: appId
    }
  }
};
