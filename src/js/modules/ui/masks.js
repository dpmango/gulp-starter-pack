//////////
// MASKS
//////////
(function($, APP) {
  APP.Plugins.Masks = {
    init: function() {
      $('[js-dateMask]').mask('99.99.99', { placeholder: 'ДД.ММ.ГГ' });
      $("input[type='tel']").mask('+44 0000 000000', { placeholder: '+44' });
    },
  };
})(jQuery, window.APP);
