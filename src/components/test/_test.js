(function($, APP) {
  APP.Componenets.Test = {
    init: function() {
      $(document).on('click', function() {
        console.log('click');
      });
    },
  };
})(jQuery, window.APP);
