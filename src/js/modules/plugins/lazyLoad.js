////////////////////
// LAZY LOAD
////////////////////
(function ($, APP) {
  APP.Plugins.LazyLoadImages = {
    init: function () {
      var $lazy = _document.find('[js-lazy]:not(.is-loaded)');
      if ($lazy.length === 0) {
        APP.Plugins.LegacySupport.fixImages();
        return;
      }

      this.initLazy($lazy);
    },
    load: function (DOMelement) {
      var $lazy = $(DOMelement);

      this.initLazy($lazy);
    },
    initLazy: function ($lazy) {
      var _this = this;
      $lazy.Lazy({
        threshold: APP.Browser().data.isMobile ? 500 : 800,
        enableThrottle: true,
        throttle: 100,
        scrollDirection: 'vertical',
        // effect: 'fadeIn',
        // effectTime: 350,
        // visibleOnly: true,
        // placeholder: "data:image/gif;base64,R0lGODlhEALAPQAPzl5uLr9Nrl8e7...",
        onError: function (element) {
          // eslint-disable-next-line no-console
          console.log('error loading ' + element.data('src'));
          try {
            element.attr('src', element.data('src'));
          } catch (e) {
            // eslint-disable-next-line no-console
            console.log('eroor appending src', e);
          }
        },
        beforeLoad: function (element) {
          // element.attr('style', '')
        },
        afterLoad: function (element) {
          APP.Plugins.LegacySupport.fixImages();
          _this.animateLazy(element);
        },
      });

      triggerBody();
    },
    animateLazy: function (element) {
      var fadeTimeout = 250;
      var $scaler = element.closest('.scaler');
      $scaler.addClass('is-loaded');

      if ($scaler.length === 0) {
        $(element).addClass('is-loaded');
      }

      if ($scaler.is('.no-bg-onload')) {
        setTimeout(function () {
          $scaler.addClass('is-bg-hidden');
        }, fadeTimeout);
      }
    },
  };
})(jQuery, window.APP);
