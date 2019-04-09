//////////
// SLIDERS
//////////
(function($, APP) {
  APP.Plugins.Sliders = {
    init: function() {
      // EXAMPLE SWIPER
      new Swiper('[js-slider]', {
        wrapperClass: 'swiper-wrapper',
        slideClass: 'example-slide',
        direction: 'horizontal',
        loop: false,
        watchOverflow: true,
        setWrapperSize: false,
        spaceBetween: 0,
        slidesPerView: 'auto',
        // loop: true,
        normalizeSlideIndex: true,
        // centeredSlides: true,
        freeMode: true,
        // effect: 'fade',
        autoplay: {
          delay: 5000,
        },
        navigation: {
          nextEl: '.example-next',
          prevEl: '.example-prev',
        },
        breakpoints: {
          // when window width is <= 992px
          992: {
            autoHeight: true,
          },
        },
      });
    },
    destroy: function() {
      // ... code ...
    },
  };
})(jQuery, window.APP);
