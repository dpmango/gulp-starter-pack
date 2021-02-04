//////////
// SCROLLREVEAL
//////////
(function ($, APP) {
  APP.Plugins.ScrollReveal = {
    init: function (fromPjax) {
      // REVEAL animations
      var $reveals = $('[js-reveal]');

      if ($reveals.length === 0) return;

      var animatedClass = 'is-animated';
      var pageTransitionTimeout = 500;

      $('[js-reveal]').each(function (i, el) {
        var type = $(el).data('type') || 'enterViewport';

        // onload type
        if (type === 'onload') {
          var interval = setInterval(function () {
            // if (!preloaderActive){
            if (fromPjax) {
              // wait till transition overlay is fullyanimated
              setTimeout(function () {
                $(el).addClass(animatedClass);
                clearInterval(interval);
              }, pageTransitionTimeout);
            } else {
              $(el).addClass(animatedClass);
              clearInterval(interval);
            }
            // }
          }, 100);
          return;
        }

        // halfy enter
        if (type === 'halflyEnterViewport') {
          var scrollListener = throttle(function () {
            var vScrollBottom = _window.scrollTop() + _window.height();
            var elTop = $(el).offset().top;
            var triggerPoint = elTop + $(el).height() / 2;

            if (vScrollBottom > triggerPoint) {
              $(el).addClass(animatedClass);
              window.removeEventListener('scroll', scrollListener, false); // clear debounce func
            }
          }, 100);

          window.addEventListener('scroll', scrollListener, false);
          return;
        }

        // regular (default) type
        var elWatcher = scrollMonitor.create($(el));
        elWatcher.enterViewport(
          throttle(
            function () {
              $(el).addClass(animatedClass);
            },
            100,
            {
              leading: true,
            }
          )
        );
      });
    },
  };
})(jQuery, window.APP);
