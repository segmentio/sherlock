
/**
 * FullStory.
 */

exports.name = 'FullStory';

exports.pattern = /https:\/\/www\.fullstory\.com\/s\/fs\.js/;

exports.settings = function () {
  return { fsOrg: window._fs_org };
};
