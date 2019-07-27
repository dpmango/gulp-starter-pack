//////////
// SHARER.js
//////////
(function($, APP) {
  APP.Plugins.Sharer = {
    refresh: function() {
      // it's automatically inits for initial load
      // not need to initialize
      // $('[data-sharer]').sharer();
      window.Sharer.init();
    },
  };
})(jQuery, window.APP);
