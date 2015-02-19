
/**
 * FullStory.
 */

exports.name = 'FullStory';

exports.pattern = /https:\/\/www\.fullstory\.com\/s\/fs\.js/;

exports.settings = function () {
  var fsOrg = window._fs_org;
  if (!fsOrg) return false;

  return { fsOrg: fsOrg };
};
