//////////
// BARBA PJAX
//////////
(function ($, APP) {
  APP.Plugins.Barba = {
    getData: function () {
      return this.data;
    },
    init: function () {
      // config
      Barba.Pjax.Dom.containerClass = 'page';
      this.data = this.data || {};
      this.data.transitionInitElement = '';

      // initilization path
      this.getTransition();
      Barba.Prefetch.init();
      Barba.Pjax.start();
      this.listenEvents();
    },
    getTransition: function () {
      // set barba transition
      var _this = this;
      Barba.Pjax.getTransition = function () {
        return _this.transitions.FadeTransition;
        // return _this.transitions.HideShowTransition;

        // when there are multiple transitions on project
        // if ( transitionInitElement ){
        //   if ( transitionInitElement.attr('data-transition') ){
        //     var transition = transitionInitElement.data('transition');
        //     // console.log(transition)
        //     // if ( transition === "project" ){
        //     //   return ProjectTransition
        //     // }
        //   }
        //   return FadeTransition;
        // } else {
        //   // first visit + back button (history is blank)
        //   window.location.href = Barba.HistoryManager.history[1].url
        // }
      };
    },
    transitions: {
      HideShowTransition: Barba.BaseTransition.extend({
        start: function () {
          this.newContainerLoading.then(this.finish.bind(this));
        },

        finish: function () {
          document.body.scrollTop = 0;
          this.done();
        },
      }),
      FadeTransition: Barba.BaseTransition.extend({
        start: function () {
          Promise.all([this.newContainerLoading, this.fadeOut()]).then(this.fadeIn.bind(this));
        },

        fadeOut: function () {
          var _this = this;
          var $oldPage = $(this.oldContainer);
          var $newPage = $(this.newContainer);
          var deferred = Barba.Utils.deferred();

          TweenLite.to($oldPage, 0.5, {
            opacity: 0,
            ease: Power1.easeIn,
            onComplete: function () {
              deferred.resolve();
            },
          });

          return deferred.promise;
        },

        fadeIn: function () {
          var _this = this;
          var $oldPage = $(this.oldContainer);
          var $newPage = $(this.newContainer);

          $(this.oldContainer).hide();

          $newPage.css({
            visibility: 'visible',
            opacity: 0,
          });

          TweenLite.to(window, 0.15, {
            scrollTo: { y: 0, autoKill: false },
            ease: easingSwing,
          });

          TweenLite.to($newPage, 0.5, {
            opacity: 1,
            ease: Power1.easeOut,
            onComplete: function () {
              _this.done();
            },
          });
        },
      }),
    },
    listenEvents: function () {
      // initialized transition
      var _this = this;
      Barba.Dispatcher.on('linkClicked', function (el) {
        _this.data.transitionInitElement = el instanceof jQuery ? el : $(el);
      });

      // The new container has been loaded and injected in the wrapper.
      Barba.Dispatcher.on(
        'newPageReady',
        function (currentStatus, oldStatus, container, newPageRawHTML) {
          APP.Initilizer().newPageReady();
        }
      );

      // The transition has just finished and the old Container has been removed from the DOM.
      Barba.Dispatcher.on('transitionCompleted', function (currentStatus, oldStatus) {
        APP.Initilizer().transitionCompleted();
      });
    },
  };
})(jQuery, window.APP);
