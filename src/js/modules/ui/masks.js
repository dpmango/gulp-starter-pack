//////////
// MASKS
//////////
(function($, APP) {
  APP.Plugins.Masks = {
    init: function() {
      $('[js-dateMask]').mask('99.99.99', { placeholder: 'ДД.ММ.ГГ' });
      $("input[type='tel']").mask('+7 (000) 000-0000', { placeholder: '+7 (___) ___-____' });
    },
  };
})(jQuery, window.APP);
