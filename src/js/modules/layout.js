//////////
// LAYOUT
//////////
(function(APP) {
  APP.Plugins.LAYOUT = {
    data: {
      stickToWindow: undefined,
      containerAlign: undefined,
      heights: undefined,
    },
    init: function() {
      this.getData();
      this.applyLayout();
      this.listenResize();
    },
    getData: function() {
      this.data.stickToWindow = $('.js-stick-to-window');
      this.data.containerAlign = $('.js-container-align');
      this.data.heights = $('.js-set-height');
    },
    listenResize: function() {
      window.addEventListener('resize', debounce(this.applyLayout.bind(this), 100));
    },
    applyLayout: function() {
      var _this = this;
      if (_this.data.stickToWindow) {
        [].forEach.call(_this.data.stickToWindow, el => {
          var $el = $(el);
          var position = $el.data('position');
          var stopWatching = $el.data('stop') ? mediaCondition($el.data('stop')) : null;
          var setMarginPx = 0;

          if (stopWatching === null || !stopWatching) {
            // reset from previous resive
            el.style.margin = 0;

            // get position of element to window
            var refPosLeft = el.getBoundingClientRect().left;

            // is container keeper
            var keepContainer = $el.data('keep-container');

            // set values
            if (position === 'left') {
              setMarginPx = refPosLeft * -1;
              el.style.marginLeft = `${setMarginPx}px`;

              if (keepContainer) {
                el.style.paddingLeft = `${setMarginPx * -1}px`;
              }
            } else if (position === 'right') {
              var wWidth = window.innerWidth;
              var elWidth = width(el);
              var elMarginRight = Math.abs(parseInt(el.style.marginLeft));

              setMarginPx = (wWidth - refPosLeft - (elWidth - elMarginRight)) * -1;
              el.style.marginRight = `${setMarginPx}px`;
              if (keepContainer) {
                el.style.paddingRight = `${setMarginPx * -1}px`;
              }
            }
          } else {
            el.attr('style', '');
          }
        });
      }

      // container align
      if (_this.data.containerAlign) {
        [].forEach.call(_this.data.containerAlign, el => {
          var $el = $(el);
          var stopWatching = $el.data('stop') ? mediaCondition($el.data('stop')) : null;
          var type = $el.data('type');
          var position = $el.data('position');
          var selector = $el.data('selector');

          if (stopWatching === null || !stopWatching) {
            // get reference container
            var referenceContainer = $('.container');
            if (selector) {
              referenceContainer = $(selector);
            }

            const wWidth = window.innerWidth;
            var refPos = referenceContainer[0].getBoundingClientRect();
            var containerPad = window.innerWidth < 768 ? 20 : 40;

            if (position === 'right') {
              // reset styles
              el.setAttribute('style', '');

              // calulcations
              var elPos = el[0].getBoundingClientRect();
              var refPosRight = wWidth - (refPos.left + refPos.width);
              var elPosRight = wWidth - (elPos.left + elPos.width);
              var diff = refPosRight - elPosRight;

              if (type && type === 'padding') {
                el.style.paddingRight = `${diff + containerPad}px`;
              } else {
                el.style.marginRight = `${diff}px`;
              }
            } else {
              if (type && type === 'padding') {
                el.style.paddingLeft = `${refPos.left + containerPad}px`;
              } else if (type && type === 'slider') {
                var slider = el.closest('.swiper-container');
                var offset = refPos.left + containerPad;
                slider.setAttribute('data-offset-before', offset);
                slider.setAttribute('data-offset-after', offset);
                if (slider && slider.swiper) {
                  slider.swiper.params.slidesOffsetBefore = offset;
                  slider.swiper.params.slidesOffsetAfter = offset;
                  APP.Plugins.Sliders.update();
                }
              } else {
                el.style.marginLeft = `${refPos.left}px`;
              }
            }
          } else {
            el.setAttribute('style', '');
          }
        });
      }

      // heights
      if (_this.data.heights) {
        [].forEach.call(_this.data.heights, el => {
          var $el = $(el);
          var stopWatching = $el.data('stop') ? mediaCondition($el.data('stop')) : null;

          if (stopWatching === null || !stopWatching) {
            var childrenHeight = $(el)
              .children()
              .height();

            var marginBottom = window.innerWidth < 568 ? 30 : 70;

            el.style.height = `${childrenHeight + marginBottom}px`;
          } else {
            el.style.height = '';
          }
        });
      }
    },
  };
})(window.APP);
