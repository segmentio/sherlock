
/**
 * FullStory.
 */

module.exports = {
  name: 'FullStory',
  pattern: /https:\/\/www\.fullstory\.com\/s\/fs\.js/,
  settings: function () {
    return {
      fsOrg: window._fs_org
    }
  }
};
