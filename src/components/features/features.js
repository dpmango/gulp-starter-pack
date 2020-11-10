//////////
// Features
//////////
(function($, APP) {
  APP.Components.Features = {
    data: {
      cards: undefined,
      cardTops: [],
    },
    init: function(fromPjax) {
      this.getCards();
      if (!fromPjax) {
        this.listenScroll();
        this.listenResize();
      }
    },
    listenScroll: function() {
      _window.on('scroll', this.scrollHandler.bind(this));
    },
    listenResize: function() {
      // _window.on('resize', debounce(this.getHeaderParams.bind(this), 100));
    },
    getCards: function() {
      var $cards = $('.js-stack-scroll');
      if ($cards.length === 0) return;
      $cards.each(function(i, card) {
        var $card = $(card);
      });

      this.data.cards = $cards;
    },
    scrollHandler: function() {
      // get scroll params from blocker function
      var scroll = APP.Plugins.ScrollBlock.getData();
    },
  };
})(jQuery, window.APP);
