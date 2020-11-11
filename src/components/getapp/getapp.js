//////////
// GetApp
//////////
(function($, APP) {
  APP.Components.GetApp = {
    data: {
      $btn: undefined,
    },
    init: function(fromPjax) {
      if (!fromPjax) {
        this.getDeviceInfo();
        this.listenScroll();
      }
    },
    getDeviceInfo: function() {
      var $apple = $('.getapp__apple');
      var $android = $('.getapp__android');

      var isIosDevice = APP.Browser().data.isIosDevice;
      var isAndroidDevice = APP.Browser().data.isAndroidDevice;

      this.data.$btn = undefined;

      if (isIosDevice && $apple.length) {
        this.data.$btn = $apple;
      } else if (isAndroidDevice && $android.length) {
        this.data.$btn = $android;
      }
    },
    listenScroll: function() {
      _window.on('scroll', throttle(this.scrollHandler.bind(this), 100));
    },
    scrollHandler: function() {
      if (this.data.$btn !== undefined) {
        var scroll = APP.Plugins.ScrollBlock.getData();

        if (scroll.blocked) return;

        if (scroll.y > 200) {
          this.data.$btn.addClass('is-visible');
        } else {
          this.data.$btn.removeClass('is-visible');
        }
      }
    },
  };
})(jQuery, window.APP);
