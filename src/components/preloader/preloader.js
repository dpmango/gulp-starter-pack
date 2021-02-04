//////////
// Preloader
//////////
(function ($, APP) {
  APP.Components.Preloader = {
    loaded: function () {
      $('#barba-wrapper').addClass('is-preloaded');

      setTimeout(() => {
        APP.Plugins.AOS.init();
      }, 400);
    },
  };
})(jQuery, window.APP);
