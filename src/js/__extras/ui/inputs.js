//////////
// INPUT FOCUSES
//////////
(function ($, APP) {
  APP.Plugins.InputFocuses = {
    init: function () {
      this.focuses();
      // this.clearable();
    },
    focuses: function () {
      var $elements = $('.js-input-focus');
      if ($elements.length === 0) return;

      $elements.each(function (i, container) {
        var $container = $(container);
        var $input = $container.find('input, textarea');
        if ($input.length === 0) return true;

        $input.on('focus', function () {
          $container.addClass('is-focused');
        });

        $input.on('blur change', function () {
          toggler();
        });

        toggler();

        $input.checkAndTriggerAutoFillEvent();

        function toggler() {
          if ($input.val().trim() !== '') {
            $container.addClass('is-focused');
          } else {
            $container.removeClass('is-focused');
          }
        }
      });
    },
    // clearable: function() {
    //   var $elements = $('.js-input-clearable');
    //   if ($elements.length === 0) return;

    //   $elements.each(function(i, container) {
    //     var $container = $(container);
    //     var $input = $container.find('input');
    //     var $clearBtn = $container.find('.ui-input-clear');

    //     // show/hide clear button
    //     $input.on('keyup', function() {
    //       if ($input.val().trim() !== '') {
    //         $container.addClass('is-clearbable');
    //       } else {
    //         $container.removeClass('is-clearbable');
    //       }
    //     });

    //     // reset input value
    //     $clearBtn.on('click', function() {
    //       $input.val('');
    //       $container.removeClass('is-clearbable');
    //     });
    //   });
    // },
  };
})(jQuery, window.APP);
