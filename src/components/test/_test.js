(function($, APP) {
  APP.Components.Test = {
    init: function() {
      $(document).on('click', function() {
        console.log('click');
      });
    },
  };
})(jQuery, window.APP);
