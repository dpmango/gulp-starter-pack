(function ($, APP) {
  APP.Dev.Breakpoint = {
    setBreakpoint: function () {
      var wHost = window.location.host.toLowerCase();
      var displayCondition =
        wHost.indexOf('localhost') >= 0 ||
        wHost.indexOf('surge') >= 0 ||
        wHost.indexOf('netlify') >= 0;
      if (displayCondition) {
        var wWidth = window.innerWidth;
        var wHeight = _window.height();

        var content = "<div class='dev-bp-debug'>" + wWidth + ' x ' + wHeight + '</div>';

        $('.page').append(content);
        setTimeout(function () {
          $('.dev-bp-debug').fadeOut();
        }, 1000);
        setTimeout(function () {
          $('.dev-bp-debug').remove();
        }, 1500);
      }
    },
    listenResize: function () {
      $(window).on('resize', debounce(this.setBreakpoint, 200));
    },
  };
})(jQuery, window.APP);
