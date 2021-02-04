//////////
// MASKS
//////////
(function ($, APP) {
  APP.Plugins.Masks = {
    init: function () {
      $('.js-datepicker').mask('9999.99.99', { placeholder: 'дд.мм.гггг' });
      $('[js-dateMask]').mask('99.99.99', { placeholder: 'ДД.ММ.ГГ' });
      $("input[type='tel']").mask('+7 (000) 000-0000', { placeholder: '+7 (___) ___-____' });
    },
  };
})(jQuery, window.APP);
