//////////
// SLIDERS
//////////
(function($, APP) {
  APP.Plugins.Sliders = {
    data: {
      swipers: [],
      responsiveSwipers: {
        featuredProducts: {
          instance: undefined,
          disableOn: 1201,
        },
      },
    },
    init: function() {
      this.initSwipers();
      this.initResponsiveSwipers();
      this.listenResize();
    },
    reinit: function() {
      // without resize listeners double check
      this.initSwipers();
      this.initResponsiveSwipers(true);
    },
    listenResize: function() {
      _window.on('resize', debounce(this.initResponsiveSwipers.bind(this), 200));
    },
    initSwipers: function() {
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

    initResponsiveSwipers: function(isHardReset) {
      var featuredProducts = '[js-featured-products-swiper]';
      if ($(featuredProducts).length > 0) {
        this.initFeaturedProductsSwiper(featuredProducts);
      }
    },
    initFeaturedProductsSwiper: function(selector) {
      var dataObj = this.data.responsiveSwipers.featuredProducts;

      if ($(selector).length > 0) {
        if (window.innerWidth >= dataObj.disableOn) {
          if (dataObj.instance !== undefined) {
            dataObj.instance.destroy(true, true);
            dataObj.instance = undefined;
          }
        } else {
          if (dataObj.instance === undefined) {
            dataObj.instance = new Swiper(selector, {
              slidesPerView: 'auto',
              breakpoints: {
                992: {
                  spaceBetween: 0,
                },
              },
            });
          }
        }
      }
    },
    destroy: function() {
      // ... code ...
    },
  };
})(jQuery, window.APP);
