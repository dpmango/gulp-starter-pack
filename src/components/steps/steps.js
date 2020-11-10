//////////
// Steps
//////////
(function($, APP) {
  APP.Components.Steps = {
    data: {
      sections: [],
      images: [],
    },
    init: function(fromPjax) {
      this.getSections();
      if (!fromPjax) {
        this.listenScroll();
        this.listenResize();
      }
    },
    listenScroll: function() {
      _window.on('scroll', this.scrollHandler.bind(this));
    },
    listenResize: function() {
      _window.on('resize', debounce(this.getSections.bind(this), 100));
    },
    getSections: function() {
      this.data.sections = [];
      var $sections = $('.js-steps-sections [data-step]');
      if ($sections.length === 0) return;

      var sections = [];
      $sections.each(function(i, section) {
        var $section = $(section);
        var top = $section.offset().top;
        var height = $section.height();
        var bottom = top + height;

        sections.push({
          $section: $section,
          top: top,
          height: height,
          bottom: bottom,
        });
      });

      this.data.sections = sections;

      // images
      this.data.images = [];
      var $images = $('.js-steps-phone [data-step]');
      if ($images.length === 0) return;

      var images = [];
      $images.each(function(i, image) {
        images.push($(image));
      });

      this.data.images = images;
    },
    scrollHandler: function() {
      var _data = this.data;
      if (_data.sections.length !== 0) {
        var scroll = APP.Plugins.ScrollBlock.getData();
        var scrollBottom = scroll.y + window.innerHeight;

        var pastScrolled = _data.sections.filter(x => scrollBottom > x.bottom - x.height / 2.5);

        if (pastScrolled.length) {
          var current = pastScrolled[pastScrolled.length - 1]; // last of past scrolled
          var curId = current.$section.data('step');

          _data.images.forEach(img => {
            var imgId = img.data('step');
            if (imgId === curId) {
              img.addClass('is-active');
            } else {
              img.removeClass('is-active');
            }
          });
        }
      }
    },
  };
})(jQuery, window.APP);
