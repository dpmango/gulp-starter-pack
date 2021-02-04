//////////
// Photoswipe
//////////
(function ($, APP) {
  APP.Plugins.Photoswipe = {
    data: {
      pswpItems: [],
      curThumbnail: undefined,
      curSlideIndex: 0,
    },
    init: function (fromPjax) {
      this.eventListeners();
    },
    eventListeners: function () {
      _document.on('click', '.js-open-pswp', function (e) {
        e.preventDefault();

        var $curLink = $(this);

        APP.Plugins.Photoswipe.getThumbData($curLink);
        APP.Plugins.Photoswipe.buildItems($curLink);
        APP.Plugins.Photoswipe.openPSWP($curLink);
      });
    },
    getThumbData: function ($originLink) {
      // reset
      this.data.curSlideIndex = 0;
      this.data.curThumbnail = undefined;

      // get swiper slide index
      var $swiper = $originLink.closest('.swiper-container');
      var isPhotoSwiper = $swiper.is('.js-swiper-photos');

      if ($swiper.length > 0) {
        var swiperInst = $swiper[0].swiper;
        if (swiperInst && !isPhotoSwiper) {
          this.data.curSlideIndex = $swiper[0].swiper.realIndex;
        } else {
          this.data.curSlideIndex = $originLink.closest('.swiper-slide').index();
        }
      }

      // get thumbnail for getThumbBoundsFn func
      this.data.curThumbnail = $originLink.find('img');
    },
    buildItems: function ($originLink) {
      var _this = this;
      var $elements = $originLink.closest('.swiper-container').find('.js-open-pswp');
      if ($elements.length === 0) return;

      this.data.pswpItems = [];
      $elements.each(function (i, element) {
        var $element = $(element);
        var isSlideDuplicate = $element.closest('.swiper-slide-duplicate').length > 0;
        var targetImg = $element.find('img');

        // swiper dupplicates filter
        if (isSlideDuplicate) return true;

        // push to data array
        if ($element.data('pswp-source') !== undefined) {
          // build from attributes if pswp-source type
          var size = $element.data('size').split('x');

          var pswpObj = {
            src: $element.attr('data-href'),
            msrc: targetImg[0].src, // small image placeholder, main (large) image loads on top of it
            w: parseInt(size[0], 10),
            h: parseInt(size[1], 10),
          };

          // optional attributes (caption)
          var $title = $element.find('[data-pswp-title]');
          var $subtitle = $element.find('[data-pswp-subtitle]');
          var $stats = $element.find('[data-pswp-stats]');

          if ($title.length > 0) {
            pswpObj.title = $title.html();
          }

          if ($subtitle.length > 0) {
            pswpObj.subtitle = $subtitle.html();
          }

          if ($stats.length > 0) {
            pswpObj.stats = $stats.html();
          }

          _this.data.pswpItems.push(pswpObj);
        } else {
          if (!targetImg) return true;

          _this.data.pswpItems.push({
            src: targetImg[0].src,
            msrc: targetImg[0].src,
            w: targetImg[0].naturalWidth,
            h: targetImg[0].naturalHeight,
          });
        }
      });
    },
    openPSWP: function ($originLink) {
      var $pswpElement = $('.pswp');
      if ($pswpElement.length === 0) return;

      var items = this.data.pswpItems;
      var curThumbnail = this.data.curThumbnail;

      var options = {
        index: this.data.curSlideIndex,
        shareEl: false,
        history: false,
        getThumbBoundsFn: function (index) {
          var pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
          var targetThumbnail = curThumbnail;

          if (curThumbnail.closest('.swiper-container').length > 0) {
            var isPhotoSwiper = curThumbnail.closest('.swiper-container').is('.js-swiper-photos');
            if (!isPhotoSwiper) {
              targetThumbnail = curThumbnail
                .closest('.swiper-container')
                .find('.swiper-slide-active img');
            } else {
              targetThumbnail = curThumbnail
                .closest('.swiper-container')
                .find('.swiper-slide')
                .eq(index)
                .find('img');
            }
          }

          var rect = targetThumbnail[0].getBoundingClientRect();
          return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
        },
        addCaptionHTMLFn: function (item, captionEl) {
          var captionHtml = '';
          if (item.title) {
            captionHtml = item.title;
          }

          if (item.subtitle) {
            captionHtml += ` ${item.subtitle}`;
          }

          if (item.stats) {
            captionHtml += `<br/>${item.stats}`;
          }

          captionEl.children[0].innerHTML = captionHtml;
          return true;
        },
      };

      // Initializes and opens PhotoSwipe
      var gallery = new PhotoSwipe($pswpElement[0], PhotoSwipeUI_Default, items, options);
      gallery.init();

      // Sync active slide in swiper
      gallery.listen('beforeChange', function () {
        var $swiper = $originLink.closest('.swiper-container');
        if ($swiper.length > 0) {
          var swiper = $swiper[0].swiper;
          if (swiper.params.loop) {
            swiper.slideToLoop(gallery.getCurrentIndex());
          } else {
            swiper.slideTo(gallery.getCurrentIndex());
          }
        }
      });
    },
  };
})(jQuery, window.APP);
