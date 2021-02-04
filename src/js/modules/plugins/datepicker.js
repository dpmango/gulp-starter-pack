//////////
// DatePicker
//////////
(function ($, APP) {
  APP.Plugins.DatePicker = {
    init: function (fromPjax) {
      if (!fromPjax) {
        this.eventListeners();
      }
      let $datepicker = $('.js-datepicker');

      if ($datepicker.length === 0) return;

      // initialization
      $datepicker.each(function (i, picker) {
        let $picker = $(picker);

        // prevent native calendar on mobile
        $picker.attr('type', 'text');

        $picker.datepicker({
          language: 'en',
          inline: false,
          // range: true,
          dateFormat: 'yyyy-mm-dd',
          firstDay: 1,
          minView: 'days',
        });
      });
    },
    eventListeners: function () {
      let _this = this;
    },
  };
})(jQuery, window.APP);
