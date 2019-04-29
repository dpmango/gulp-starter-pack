//////////
// HEADER
//////////
(function($, APP) {
  APP.Components.Header = {
    data: {
      header: {
        container: undefined,
        bottomPoint: undefined,
      },
    },
    init: function(fromPjax) {
      if (!fromPjax) {
        this.getHeaderParams();
        this.hamburgerClickListener();
        this.listenScroll();
        this.listenResize();
      }

      this.setMenuClass();
      this.controlHeaderClass();
    },
    getHeaderParams: function() {
      var $header = $('.header');
      var headerOffsetTop = 0;
      var headerHeight = $header.outerHeight() + headerOffsetTop;

      this.data.header = {
        container: $header,
        bottomPoint: headerHeight,
      };
    },
    closeMobileMenu: function(isOnload) {
      $('[js-hamburger]').removeClass('is-active');
      $('.mobile-navi').removeClass('is-active');

      APP.Plugins.ScrollBlock.blockScroll(isOnload);
    },
    hamburgerClickListener: function() {
      _document.on('click', '[js-hamburger]', function() {
        $(this).toggleClass('is-active');
        $('.mobile-navi').toggleClass('is-active');

        APP.Plugins.ScrollBlock.blockScroll();
      });
    },
    listenScroll: function() {
      _window.on('scroll', this.scrollHeader.bind(this));
    },
    listenResize: function() {
      _window.on('resize', debounce(this.getHeaderParams.bind(this), 100));
    },
    scrollHeader: function() {
      if (this.data.header.container !== undefined) {
        var fixedClass = 'is-fixed';
        var visibleClass = 'is-fixed-visible';

        // get scroll params from blocker function
        var scroll = APP.Plugins.ScrollBlock.getData();

        if (scroll.blocked) return;

        if (scroll.y > this.data.header.bottomPoint) {
          this.data.header.container.addClass(fixedClass);

          if (scroll.y > this.data.header.bottomPoint * 2 && scroll.direction === 'up') {
            this.data.header.container.addClass(visibleClass);
          } else {
            this.data.header.container.removeClass(visibleClass);
          }
        } else {
          // emulate position absolute by giving negative transform on initial scroll
          var normalized = Math.floor(normalize(scroll.y, this.data.header.bottomPoint, 0, 0, 100));
          var reverseNormalized = (100 - normalized) * -1;
          reverseNormalized = reverseNormalized * 1.2; // a bit faster transition

          this.data.header.container.css({
            transform: 'translate3d(0,' + reverseNormalized + '%,0)',
          });

          this.data.header.container.removeClass(fixedClass);
        }
      }
    },
    setMenuClass: function() {
      // SET ACTIVE CLASS IN HEADER
      var headerMenuList = $('.header__menu li');
      if (headerMenuList.length === 0) return;

      headerMenuList.each(function(i, val) {
        if (
          $(val)
            .find('a')
            .attr('href') === window.location.pathname.split('/').pop()
        ) {
          $(val).addClass('is-active');
        } else {
          $(val).removeClass('is-active');
        }
      });
    },
    controlHeaderClass: function() {
      this.data.header.container.attr('data-modifier', false);

      var $modifierElement = $('.page')
        .last()
        .find('[js-header-class]');

      if ($modifierElement.length > 0) {
        this.data.header.container.attr('data-modifier', $modifierElement.data('class'));
      }
    },
  };
})(jQuery, window.APP);
