//////////
// SLIDERS
//////////
(function($, APP) {
  APP.Plugins.Sliders = {
    data: {
      swipers: [],
      responsiveSwipers: {
        productsSwiper: {
          instances: [],
          enableOn: 991,
        },
      },
    },
    init: function(fromPjax) {
      if (!fromPjax) {
        this.initSwipers();
        this.initSwiperDataTree();
        this.initResponsiveSwipers();
        this.listenResize();
      }
    },
    reinit: function() {
      // without resize listeners double check
      this.initSwipers();
      this.initSwiperDataTree();
      this.initResponsiveSwipers();
    },
    update: function(selector) {
      var $swiper;
      // if selector passed - update only with selector
      if (selector) {
        $swiper = $(`${selector}.swiper-container-initialized`);
      } else {
        $swiper = $('.swiper-container-initialized');
      }

      if ($swiper.length > 0) {
        $swiper.each(function(i, swiper) {
          $(swiper)[0].swiper.update();
        });
      }
    },
    listenResize: function() {
      _window.on('resize', debounce(this.initResponsiveSwipers.bind(this), 200));
    },
    initSwipers: function() {
      var $page = $('.page').last();

      // PDP gallery (initialization as a group)
      // gallery main is dependand on thumbs
      var haveGalleryThumbs = $page.find('.js-pdpGallery-thumbs').length > 0;
      var haveGalleryMain = $page.find('.js-pdpGallery-main').length > 0;
      if (haveGalleryThumbs && haveGalleryMain) {
        var selector = '.js-pdpGallery-thumbs:not(.swiper-container-initialized)';
        var $thumbs = $page.find(selector);
        // if ($thumbs.length === 0) return;

        $thumbs.each(function(i, thumb) {
          var id = $(thumb).data('swiper-group-id');
          new Swiper(thumb, {
            slideToClickedSlide: false,
            preventClicks: false,
            preventClicksPropagation: false,
            watchOverflow: true,
            setWrapperSize: false,
            spaceBetween: 5,
            slidesPerView: 'auto',
            normalizeSlideIndex: true,
            direction: 'vertical',
            on: {
              init: function() {
                initGallerySwiper(id, this);
              },
            },
          });
        });
      }

      function initGallerySwiper(id, thumbsInstance) {
        // PDP main
        var selector = `.js-pdpGallery-main[data-swiper-group-id="${id}"]`;
        if ($page.find(selector).length > 0) {
          new Swiper(selector, {
            loop: true,
            watchOverflow: true,
            setWrapperSize: false,
            initialSlide: 0,
            spaceBetween: 5,
            centeredSlides: true,
            slidesPerView: 'auto',
            normalizeSlideIndex: false,
            freeMode: false,
            pagination: {
              el: '.swiper-pagination',
              type: 'bullets',
              clickable: true,
            },
            thumbs: {
              swiper: thumbsInstance,
            },
          });
        }
      }
    },
    initSwiperDataTree: function() {
      var productsSwiper = '.js-products-swiper';
      if ($(productsSwiper).length > 0) {
        this.initSwiperTree(productsSwiper, 'productsSwiper');
      }
    },
    initResponsiveSwipers: function() {
      var productsSwiper = '.js-products-swiper';
      if ($(productsSwiper).length > 0) {
        this.responsiveSwiperConstructor(productsSwiper, 'productsSwiper', {
          watchOverflow: true,
          setWrapperSize: false,
          spaceBetween: 0,
          slidesPerView: 'auto',
          freeMode: true,
          freeModeSticky: true,
        });
      }
    },
    initSwiperTree: function(selector, name) {
      var _this = this;
      _this.data.responsiveSwipers[name].instances = [];
      $(selector).each(function(i, sw) {
        _this.data.responsiveSwipers[name].instances.push(undefined);
      });
    },
    responsiveSwiperConstructor: function(selector, objName, options) {
      var dataObj = this.data.responsiveSwipers[objName];

      $(selector).each(function(idx, element) {
        if (window.innerWidth <= dataObj.enableOn) {
          if (dataObj.instances[idx] === undefined) {
            dataObj.instances[idx] = new Swiper(element, options);
          }
        } else {
          if (dataObj.instances[idx] !== undefined) {
            dataObj.instances[idx].destroy(true, true);
            dataObj.instances[idx] = undefined;
          }
        }
      });

      this.data.responsiveSwipers[objName] = dataObj;
    },

    destroy: function() {
      // ... code ...
    },
  };
})(jQuery, window.APP);
