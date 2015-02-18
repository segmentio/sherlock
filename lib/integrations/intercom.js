
/**
 * Intercom.
 */

exports.name = 'Intercom';

exports.pattern = /(api\.intercom\.io\/api\/js\/library\.js|static\.intercomcdn\.com\/intercom\.v1\.js)/;

exports.settings = function () {
  var appId;

  if (window.intercomSettings) appId = window.intercomSettings.app_id;
  if (window.analytics) appId = window.analytics._integrations.Intercom.options.appId;

  return { appId: appId };
};
