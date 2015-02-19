
/**
 * Alexa.
 */

exports.name = 'Alexa';

exports.pattern = /\/\/d31qbv1cthcecs\.cloudfront\.net\/atrk\.js/;

exports.settings = function () {
  if (!window._atrk_opts) return false;

  return {
    accountId: window._atrk_opts.atrk_acct,
    domain: window._atrk_opts.domain
  };
};
