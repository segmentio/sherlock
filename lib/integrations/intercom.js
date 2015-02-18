
/**
 * Intercom.
 */

exports.name = 'Intercom';

exports.pattern = /https?:\/\/widget.intercom.io\/widget\//;

exports.settings = function () {
  var appId;

  if (window.intercomSettings) appId = window.intercomSettings.app_id;
  if (window.analytics) appId = window.analytics._integrations.Intercom.options.appId;

  return { appId: appId };
};
