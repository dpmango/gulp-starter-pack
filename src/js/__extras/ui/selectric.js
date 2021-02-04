////////////////////
// SELECTRIC PLUGIN
////////////////////
(function ($, APP) {
  APP.Plugins.Selectric = {
    init: function () {
      var $select = $('[js-select]');
      if ($select.length === 0) return;

      $select.selectric({
        maxHeight: 300,
        disableOnMobile: false,
        nativeOnMobile: true,
        arrowButtonMarkup:
          '<b class="button"><svg class="ico ico-select-down"><use xlink:href="img/sprite.svg#ico-select-down"></use></svg></b>',

        onInit: function (element, data) {
          var $elm = $(element),
            $wrapper = $elm.closest('.' + data.classes.wrapper);

          $wrapper.find('.label').html($elm.attr('placeholder'));
        },
        onBeforeOpen: function (element, data) {
          var $elm = $(element),
            $wrapper = $elm.closest('.' + data.classes.wrapper);

          $wrapper
            .find('.label')
            .data('value', $wrapper.find('.label').html())
            .html($elm.attr('placeholder'));
        },
        onBeforeClose: function (element, data) {
          var $elm = $(element),
            $wrapper = $elm.closest('.' + data.classes.wrapper);

          $wrapper.find('.label').html($wrapper.find('.label').data('value'));
        },
      });
    },
  };
})(jQuery, window.APP);
