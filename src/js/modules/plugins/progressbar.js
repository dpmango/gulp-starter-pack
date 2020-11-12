//////////
// progressbar
//////////
(function($, APP) {
  APP.Plugins.Progressbar = {
    data: {
      collectionSwiper: undefined,
    },
    init: function() {
      var _this = this;
      var $collection = $('.js-radial-collection');

      if ($collection.length) {
        var bar = new ProgressBar.Circle($collection[0], {
          strokeWidth: 13,
          easing: 'linear',
          duration: 4000,
          color: '#FFFFFF',
          trailColor: '#FFFFFF',
          // trailWidth: 1,
          // svgStyle: null,
        });

        _this.data.collectionSwiper = bar;

        // initial start
        this.animateReset('collectionSwiper', 0);
      }
    },
    animateReset: function(name) {
      var bar = this.data[name];

      bar.set(0);
      bar.animate(1);
    },
    destroy: function() {
      // ... code ...
    },
  };
})(jQuery, window.APP);
