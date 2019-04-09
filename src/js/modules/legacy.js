//////////
// LEGACY
//////////
(function($, APP) {
  APP.Plugins.LegacySupport = {
    init: function() {
      // svg support for laggy browsers
      svg4everybody();

      // Viewport units buggyfill
      window.viewportUnitsBuggyfill.init({
        force: false,
        refreshDebounceWait: 150,
        appendToBody: true,
      });
    },
  };
})(jQuery, window.APP);
