//////////
// Clipboard
//////////
(function($, APP) {
  APP.Plugins.Clipboard = {
    init: function() {
      new ClipboardJS('.js-clipboard');
    },
  };
})(jQuery, window.APP);
