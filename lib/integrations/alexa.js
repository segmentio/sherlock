
/**
 * Alexa.
 */

exports.name = 'Alexa';

exports.pattern = /\/\/d31qbv1cthcecs\.cloudfront\.net\/atrk\.js/;

exports.settings = function () {
  var accountId = window._atrk_opts.atrk_acct;
  var domain = window._atrk_opts.domain;
  if (!accountId || !domain) return false;

  return {
    accountId: accountId,
    domain: domain
  };
};
