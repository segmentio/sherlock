
/**
 * Customer.io.
 */

module.exports = {
  name: 'Customer.io',
  pattern: "\\.customer\\.io",
  settings: function() {
    var script = document.getElementById("cio-tracker");
    return {
      'Customer.io': script.getAttribute("data-site-id")
    };
  }
};