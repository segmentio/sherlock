
/**
 * Intercom.
 */

module.exports = {
  name: "Intercom",
  pattern: "(api\\.intercom\\.io\\/api\\/js\\/library\\.js|static\\.intercomcdn\\.com\\/intercom\\.v1\\.js)",
  settings: function(){
    return {
      Intercom: window.intercomSettings.app_id
    }
  }
};