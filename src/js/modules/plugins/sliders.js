//////////
// SLIDERS
//////////
(function($, APP) {
  APP.Plugins.Sliders = {
    data: {
      swipers: {
        assets: undefined,
      },
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

      const buildProps = name => {
        return {
          watchOverflow: true,
          setWrapperSize: false,
          slidesPerView: 'auto',
          normalizeSlideIndex: false,
          freeMode: true,
          pagination: {
            el: `.swiper-${name}-pagination`,
            type: 'bullets',
            clickable: true,
          },
        };
      };

      var buildSwiper = (name, eProps) => {
        let props = buildProps(name);

        const el = $(`.js-swiper-${name}`);
        if (!el) return;

        // build props from data-
        let cProps = {};
        const dataBefore = el.data('offset-before');
        const dataAfter = el.data('offset-after');
        if (dataBefore) {
          cProps = {
            slidesOffsetBefore: dataBefore,
          };
        }
        if (dataBefore) {
          cProps = {
            ...cProps,
            slidesOffsetAfter: dataAfter,
          };
        }

        let swiper = new Swiper(`.js-swiper-${name}:not(.swiper-container-initialized)`, {
          ...props,
          ...eProps,
          ...cProps,
        });
        return swiper;
      };

      // ASSETS
      this.data.swipers.assets = buildSwiper('assets', {
        spaceBetween: 40,
        // freeModeSticky: true,
      });
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
