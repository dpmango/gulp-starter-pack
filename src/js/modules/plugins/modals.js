//////////
// MODALS
//////////
(function($, APP) {
  APP.Plugins.Modals = {
    init: function() {
      var startWindowScroll = 0;
      $('[js-popup]').magnificPopup({
        type: 'inline',
        fixedContentPos: true,
        fixedBgPos: true,
        overflowY: 'auto',
        closeBtnInside: true,
        preloader: false,
        midClick: true,
        removalDelay: 300,
        mainClass: 'popup-buble',
        callbacks: {
          beforeOpen: function() {
            startWindowScroll = _window.scrollTop();
            // $('html').addClass('mfp-helper');
          },
          close: function() {
            // $('html').removeClass('mfp-helper');
            _window.scrollTop(startWindowScroll);
          },
        },
      });

      $('[js-popup-gallery]').magnificPopup({
        delegate: 'a',
        type: 'image',
        tLoading: 'Загрузка #%curr%...',
        mainClass: 'popup-buble',
        gallery: {
          enabled: true,
          navigateByImgClick: true,
          preload: [0, 1],
        },
        image: {
          tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
        },
      });
    },
    destroy: function() {
      // ... code ...
    },
  };
})(jQuery, window.APP);
