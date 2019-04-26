//////////
// TELEPORT
//////////
(function($, APP) {
  APP.Plugins.Teleport = {
    data: {
      teleports: [],
    },
    init: function() {
      this.getElements();
      this.teleport();
      this.listenResize();
    },
    getElements: function() {
      var _this = this;
      var $teleports = $('[js-teleport]');
      if ($teleports.length === 0) {
        return;
      }
      $teleports.each(function(i, tp) {
        var $el = $(tp);

        _this.data.teleports.push({
          el: $el,
          html: $el.html(),
        });
      });
    },

    listenResize: function() {
      _window.on('resize', debounce(this.teleport.bind(this), 200));
    },
    teleport: function() {
      if (this.data.teleports.length === 0) {
        return;
      }

      $.each(this.data.teleports, function(i, obj) {
        var $el = obj.el;
        var $target = $('[data-teleport-target=' + $el.data('teleport-to') + ']');
        var conditionMedia = $el.data('teleport-condition').substring(1);
        var conditionPosition = $el.data('teleport-condition').substring(0, 1);

        if ($target && obj.html && conditionPosition) {
          var condition;

          if (conditionPosition === '<') {
            condition = window.innerWidth < conditionMedia;
          } else if (conditionPosition === '>') {
            condition = window.innerWidth > conditionMedia;
          }

          if (condition) {
            $target.html(obj.html);
            $el.html('');
          } else {
            $el.html(obj.html);
            $target.html('');
          }
        }
      });
    },
  };
})(jQuery, window.APP);
