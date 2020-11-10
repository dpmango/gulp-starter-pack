//////////
// Features
//////////
(function($, APP) {
  APP.Components.Features = {
    data: {
      cards: [],
    },
    init: function(fromPjax) {
      this.getCards();
      if (!fromPjax) {
        this.listenScroll();
        // this.listenResize();
      }
    },
    listenScroll: function() {
      _window.on('scroll', this.scrollHandler.bind(this));
    },
    listenResize: function() {
      _window.on('resize', debounce(this.getCards.bind(this), 100));
    },
    getCards: function() {
      this.data.cards = [];
      var $cards = $('.js-stack-scroll');
      if ($cards.length === 0) return;

      var cards = [];
      $cards.each(function(i, card) {
        var $card = $(card);
        var top = $card.offset().top;
        var height = $card.height();
        var bottom = top + height;

        cards.push({
          $card: $card,
          top: top,
          height: height,
          bottom: bottom,
        });
      });

      this.data.cards = cards;
    },
    scrollHandler: function() {
      var _data = this.data;
      if (_data.cards.length !== 0) {
        var scroll = APP.Plugins.ScrollBlock.getData();
        var scrollBottom = scroll.y + window.innerHeight;

        var pastScrolled = _data.cards.filter(x => scrollBottom > x.bottom);

        console.log({ pastScrolled: pastScrolled });

        // do noting whith last card
        if (pastScrolled.length && pastScrolled.length < _data.cards.length) {
          var current = pastScrolled[pastScrolled.length - 1]; // last of past scrolled
          current.$card.removeClass('is-past');

          // update past
          var pastWithoutCurrent = pastScrolled.filter(x => x.top !== current.top);
          pastWithoutCurrent.forEach(x => {
            x.$card.addClass('is-past');
          });

          var diff = scrollBottom - current.bottom;
          // normalize diff in scroll (when start, when end, to css N, to css N)
          // greater devision in 2'nd param means earlier animation start (faster as number close to Zero)
          var normY = normalize(diff, current.height / 5, current.height, 0, 40);
          var normOpacity = normalize(diff, current.height / 2, current.height, 0, 1);
          var normScale = normalize(diff, current.height / 5, current.height, 0, 0.1);
          var normOpacityReverse = 1 - normOpacity;
          var normScaleReverse = 1 - normScale;

          current.$card.css({
            transform: `translate3d(0,-${normY}px,0) scale(${normScaleReverse}, ${normScaleReverse})`,
            opacity: normOpacityReverse,
          });
        }
      }
    },
  };
})(jQuery, window.APP);
