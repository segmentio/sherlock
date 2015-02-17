
/**
 * Alexa.
 */

module.exports = {
  name: 'Alexa',
  pattern: '//d31qbv1cthcecs.cloudfront.net/atrk.js',
  settings: function() {
    return {
      accountId: window._atrk_opts.atrk_acct,
      domain: window._atrk_opts.domain
    };
  }
};
