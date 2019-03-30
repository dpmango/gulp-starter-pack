// PRE-initialization
APP = window.APP || {};
APP.Dev = APP.Dev || {};
APP.Browser = APP.Browser || {};
APP.Modules = APP.Modules || {};
APP.Componenets = APP.Componenets || {};

// force scroll to top on initial load
window.onbeforeunload = function() {
  window.scrollTo(0, 0);
};

// shorthand operators
var _window = $(window);
var _document = $(document);
var easingSwing = [0.02, 0.01, 0.47, 1]; // default jQuery easing

(function($, APP) {
  APP.Initilizer = function() {
    var app = {};

    app.init = function() {
      app.initGlobalPlugins();
      app.initPlugins();
      app.initComponenets();
    };

    app.onLoadTrigger = function() {
      APP.Modules.Preloader.loaded();
      APP.Modules.LazyLoadImages.init();
    };

    app.refresh = function() {
      app.initPlugins();
      app.initComponenets();
    };

    app.destroy = function() {};

    // pjax triggers
    app.newPageReady = function() {
      app.refresh();
    };

    app.transitionCompleted = function() {
      APP.Modules.AOS.refresh();
      app.onLoadTrigger();
    };

    // combine types
    app.initGlobalPlugins = function() {
      APP.Dev.Credentials.logCredentials();
      APP.Dev.Breakpoint.listenResize();
      APP.Browser().methods.setBodyTags();
      APP.Modules.LegacySupport.init();
      APP.Modules.ScrollBlock.listenScroll();
      APP.Modules.Clicks.init();
      APP.Modules.AOS.init();
      APP.Modules.Barba.init();
    };

    app.initPlugins = function() {
      APP.Modules.Sliders.init();
      APP.Modules.Modals.init();
      APP.Modules.Masks.init();
      APP.Modules.Selectric.init();
      APP.Modules.ScrollReveal.init();
      APP.Modules.TextareaAutoExpand.init();
      APP.Modules.Validations.init();

      // APP.Modules.Countdown.init();
      // APP.Modules.FooterReveal.init();
    };

    app.initComponenets = function() {
      APP.Componenets.Header.init();
      APP.Componenets.Test.init();
    };

    return app;
  };

  // a.k.a. ready
  $(function() {
    APP.Initilizer().init();
  });

  $(window).on('load', function() {
    $.ready.then(function() {
      APP.Initilizer().onLoadTrigger();
    });
  });
})(jQuery, window.APP);
