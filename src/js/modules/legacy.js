//////////
// LEGACY
//////////
(function ($, APP) {
  APP.Plugins.LegacySupport = {
    init: function () {
      // svg support for laggy browsers
      svg4everybody();

      if (!APP.Browser().data.isIe) {
        // Viewport units buggyfill
        window.viewportUnitsBuggyfill.init({
          force: false,
          refreshDebounceWait: 150,
          appendToBody: true,
        });
      }
    },
    fixImages: function () {
      if (APP.Browser().data.isIe) {
        // if LAZY LOAD is used, move initialization to afterFinishAll
        picturefill();
        objectFitImages();
      }
    },
  };
})(jQuery, window.APP);
