//////////
// HEADER
//////////

// disable / enable scroll by setting negative margin to page-content eq. to prev. scroll
// this methods helps to prevent page-jumping on setting body height to 100%

(function($, APP) {
  APP.Plugins.ScrollBlock = {
    data: {
      y: _window.scrollTop(),
      blocked: false,
      direction: undefined,
      lastForScrollDir: 0,
      lastForBodyLock: 0,
    },
    getData: function() {
      return this.data;
    },
    disableScroll: function() {
      this.data.lastForBodyLock = _window.scrollTop();
      this.data.blocked = true;
      $('.page__content').css({
        'margin-top': '-' + this.data.lastForBodyLock + 'px',
      });
      $('body').addClass('body-lock');
    },

    enableScroll: function(isOnload) {
      this.data.blocked = false;
      this.data.direction = 'up'; // keeps header
      $('.page__content').css({
        'margin-top': '-' + 0 + 'px',
      });
      $('body').removeClass('body-lock');
      if (!isOnload) {
        _window.scrollTop(this.data.lastForBodyLock);
        this.data.lastForBodyLock = 0;
      }
    },

    blockScroll: function(isOnload) {
      if (isOnload) {
        this.enableScroll(isOnload);
        return;
      }
      if ($('[js-hamburger]').is('.is-active')) {
        this.disableScroll();
      } else {
        this.enableScroll();
      }
    },
    getWindowScroll: function() {
      if (this.data.blocked) return;

      var wScroll = _window.scrollTop();
      this.data.y = wScroll;
      this.data.direction = wScroll > this.data.lastForScrollDir ? 'down' : 'up';

      this.data.lastForScrollDir = wScroll <= 0 ? 0 : wScroll;
    },
    listenScroll: function() {
      _window.on('scroll', this.getWindowScroll.bind(this));
    },
  };
})(jQuery, window.APP);
