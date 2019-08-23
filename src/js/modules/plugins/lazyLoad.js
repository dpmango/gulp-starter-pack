////////////////////
// LAZY LOAD
////////////////////
(function($, APP) {
  APP.Plugins.LazyLoadImages = {
    init: function() {
      var _this = this;
      var $lazy = _document.find('[js-lazy]');
      if ($lazy.length === 0) {
        APP.Plugins.LegacySupport.fixImages();
        AOS.refresh();
        return;
      }

      $lazy.Lazy({
        threshold: 300,
        enableThrottle: true,
        throttle: 100,
        scrollDirection: 'vertical',
        // effect: 'fadeIn',
        // effectTime: 350,
        // visibleOnly: true,
        // placeholder: "data:image/gif;base64,R0lGODlhEALAPQAPzl5uLr9Nrl8e7...",
        onError: function(element) {
          // eslint-disable-next-line no-console
          console.log('error loading ' + element.data('src'));
          try {
            element.attr('src', element.data('src'));
          } catch (e) {
            // eslint-disable-next-line no-console
            console.log('eroor appending src', e);
          }
        },
        beforeLoad: function(element) {
          // element.attr('style', '')
        },
        afterLoad: function(element) {
          _this.animateLazy(element);
        },
        onFinishedAll: function() {
          APP.Plugins.LegacySupport.fixImages();
          AOS.refresh();
        },
      });
    },
    animateLazy: function(element) {
      var fadeTimeout = 250;
      var $scaler = element.closest('.scaler');
      $scaler.addClass('is-loaded');

      if ($scaler.length === 0) {
        $(element).addClass('is-loaded');
      }

      if ($scaler.is('.no-bg-onload')) {
        setTimeout(function() {
          $scaler.addClass('is-bg-hidden');
        }, fadeTimeout);
      }
    },
  };
})(jQuery, window.APP);
