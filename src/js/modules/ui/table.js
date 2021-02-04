//////////
// TABLE
//////////
(function ($, APP) {
  APP.Plugins.Table = {
    init: function (fromPjax) {
      if (!fromPjax) {
        this.eventListeners();
        this.listenResize();
      }
      this.checkScrollbars();
    },

    eventListeners: function () {},
    listenResize: function () {
      _window.on('resize', debounce(this.checkScrollbars.bind(this), 100));
    },
    checkScrollbars: function () {
      const $tables = $('.table-scroller, .dash__nav-scroller');
      if ($tables.length === 0) return;

      const hasScrollBar = function ($el) {
        return {
          x: $el.find('table, ul').width() > $el.width(),
          y: $el.find('table, ul').height() > $el.height(),
        };
      };

      $tables.each(function (i, table) {
        let $table = $(table);
        let hasScrollbar = hasScrollBar($table);

        if (hasScrollbar.x) {
          $table.addClass('has-scrollbar');
        } else {
          $table.removeClass('has-scrollbar');
        }
      });
    },
  };
})(jQuery, window.APP);
