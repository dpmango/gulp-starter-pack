// force scroll to top on initial load
window.onbeforeunload = function(){
  window.scrollTo(0,0)
}

$(window).on("load", function(){
  $.ready.then(function(){
    window.onLoadTrigger()
  });
})

$(document).ready(function(){

  //////////
  // Global variables
  //////////

  var _window = $(window);
  var _document = $(document);
  var lastScrollBodyLock = 0;
  var lastScrollDir = 0;

  var easingSwing = [.02, .01, .47, 1]; // default jQuery easing

  var scroll = {
    y: _window.scrollTop(),
    direction: undefined,
    blocked: false,
    lastForBodyLock: 0,
    lastForScrollDir: 0
  }

  var header = {
    container: undefined,
    bottomPoint: undefined
  }

  var browser = {
    isRetinaDisplay: isRetinaDisplay(),
    isIe: msieversion(),
    isMobile: isMobile()
  }

  var sliders = [] // collection of all sliders

  ////////////
  // LIST OF FUNCTIONS
  ////////////

  // some functions should be called once only
  legacySupport();
  // preloaderDone();

  // The new container has been loaded and injected in the wrapper.
  function pageReady(fromPjax){
    getHeaderParams();
    updateHeaderActiveClass();
    closeMobileMenu();

    initSliders();
    initPopups();
    initMasks();
    initSelectric();
    initScrollMonitor();
    initValidations();

    // AVAILABLE in _components folder
    // copy paste in main.js and initialize here
    // revealFooter();
    // initPerfectScrollbar();
    // initCountDown();
    // initLazyLoad();
    // initTeleport();
    // parseSvg();
  }

  // The transition has just finished and the old Container has been removed from the DOM.
  function pageCompleated(fromPjax){
    if ( fromPjax ){
      window.onLoadTrigger()
    }
  }

  // some plugins work best with onload triggers
  window.onLoadTrigger = function onLoad(){
    preloaderDone();
    initLazyLoad();
  }

  // this is a master function which should have all functionality
  pageReady();
  pageCompleated();

  // scroll/resize listeners
  _window.on('scroll', getWindowScroll);
  _window.on('scroll', scrollHeader);
  // debounce/throttle examples
  // _window.on('resize', throttle(revealFooter, 100));
  _window.on('resize', debounce(setBreakpoint, 200))



  //////////
  // COMMON
  //////////

  // detectors
  function isRetinaDisplay() {
    if (window.matchMedia) {
        var mq = window.matchMedia("only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen  and (min-device-pixel-ratio: 1.3), only screen and (min-resolution: 1.3dppx)");
        return (mq && mq.matches || (window.devicePixelRatio > 1));
    }
  }

  function isMobile(){
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      return true
    } else {
      return false
    }
  }

  function msieversion() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
      return true
    } else {
      return false
    }
  }

  function legacySupport(){
    // svg support for laggy browsers
    svg4everybody();

    // Viewport units buggyfill
    window.viewportUnitsBuggyfill.init({
      force: false,
      refreshDebounceWait: 150,
      appendToBody: true
    });

    if ( browser.isIe ){
      $('body').addClass('is-ie');

      // ie pollyfil for picture tag
      // (will be called on itialization - use as lazy load callback)
      // picturefill();
    }

    if ( browser.isMobile ){
      $('body').addClass('is-mobile');
    }
  }

  // preloader
  function preloaderDone(){
    $('#barba-wrapper').addClass('is-preloaded');
  }

  // Prevent # behavior
	_document
    .on('click', '[href="#"]', function(e) {
      e.preventDefault();
    })
    .on('click', '[js-link]', function(e){
      var dataHref = $(this).data('href');
      if (dataHref && dataHref !== "#"){
        e.preventDefault();
        e.stopPropagation();
        Barba.Pjax.goTo(dataHref);
      }
    })
    // prevent going the same link (if barba is connected)
    .on('click', 'a, [js-link]', function(e){
      var href = $(this).data('href') || $(this).attr('href');
      var path = window.location.pathname

      if ( href === path.slice(1, path.length) ){
        e.preventDefault();
        e.stopPropagation();
      }
    })
    // scroll to section
    .on('click', 'a[href^="#section"]', function() { // section scroll
      var el = $(this).attr('href');
      var topTarget = $(el).offset().top

      // $('body, html').animate({scrollTop: topTarget}, 1000);
      TweenLite.to(window, 1, {
        scrollTo: {y: $(el).offset().top, autoKill:false},
        ease: easingSwing
      });

      return false;
    })

  // just store global variable with scroll distance
  function getWindowScroll(){
    if ( scroll.blocked ) return

    var wScroll = _window.scrollTop()
    scroll.y = wScroll
    scroll.direction = wScroll > scroll.lastForScrollDir ? "down" : "up"

    scroll.lastForScrollDir = wScroll <= 0 ? 0 : wScroll;
  }


  // HEADER SCROLL
  function getHeaderParams(){
    var $header = $('.header')
    var headerOffsetTop = 0
    var headerHeight = $header.outerHeight() + headerOffsetTop

    header = {
      container: $header,
      bottomPoint: headerHeight
    }
  }

  function scrollHeader(){
    if ( header.container !== undefined ){
      var fixedClass = 'is-fixed';
      var visibleClass = 'is-fixed-visible';

      if ( scroll.blocked ) return

      if ( scroll.y > header.bottomPoint ){
        header.container.addClass(fixedClass);

        if ( (scroll.y > header.bottomPoint * 2) && scroll.direction === "up" ){
          header.container.addClass(visibleClass);
        } else {
          header.container.removeClass(visibleClass);
        }
      } else {
        // emulate position absolute by giving negative transform on initial scroll
        var normalized = Math.floor(normalize(scroll.y, header.bottomPoint, 0, 0, 100))
        var reverseNormalized = (100 - normalized) * -1
        reverseNormalized = reverseNormalized * 1.2 // a bit faster transition

        header.container.css({
          "transform": 'translate3d(0,'+ reverseNormalized +'%,0)',
        })

        header.container.removeClass(fixedClass);
      }
    }
  }

  ////////////////////
  // HAMBURGER TOGGLER
  ////////////////////
  // disable / enable scroll by setting negative margin to page-content eq. to prev. scroll
  // this methods helps to prevent page-jumping on setting body height to 100%
  function disableScroll() {
    scroll.lastForBodyLock = _window.scrollTop();
    scroll.blocked = true
    $('.page__content').css({
      'margin-top': '-' + scroll.lastForBodyLock + 'px'
    });
    $('body').addClass('body-lock');
  }

  function enableScroll(isOnload) {
    scroll.blocked = false
    scroll.direction = "up" // keeps header
    $('.page__content').css({
      'margin-top': '-' + 0 + 'px'
    });
    $('body').removeClass('body-lock');
    if ( !isOnload ){
      _window.scrollTop(scroll.lastForBodyLock)
      scroll.lastForBodyLock = 0;
    }
  }

  function blockScroll(isOnload) {
    if ( isOnload ){
      enableScroll(isOnload)
      return
    }
    if ($('[js-hamburger]').is('.is-active')) {
      disableScroll();
    } else {
      enableScroll();
    }
  };

  _document.on('click', '[js-hamburger]', function(){
    $(this).toggleClass('is-active');
    $('.mobile-navi').toggleClass('is-active');

    blockScroll();
  });

  function closeMobileMenu(isOnload){
    $('[js-hamburger]').removeClass('is-active');
    $('.mobile-navi').removeClass('is-active');

    blockScroll(isOnload);
  }


  // SET ACTIVE CLASS IN HEADER
  // * could be removed in production and server side rendering when header is inside barba-container
  function updateHeaderActiveClass(){
    $('.header__menu li').each(function(i,val){
      if ( $(val).find('a').attr('href') == window.location.pathname.split('/').pop() ){
        $(val).addClass('is-active');
      } else {
        $(val).removeClass('is-active')
      }
    });
  }



  /***************
  * PAGE SPECIFIC *
  ***************/

  _document
    .on('click', '[js-inner-page-btn]', function(){

    })


  /**********
  * PLUGINS *
  **********/


  //////////
  // SLIDERS
  //////////
  function initSliders(){

    // EXAMPLE SWIPER
    new Swiper('[js-slider]', {
      wrapperClass: "swiper-wrapper",
      slideClass: "example-slide",
      direction: 'horizontal',
      loop: false,
      watchOverflow: true,
      setWrapperSize: false,
      spaceBetween: 0,
      slidesPerView: 'auto',
      // loop: true,
      normalizeSlideIndex: true,
      // centeredSlides: true,
      freeMode: true,
      // effect: 'fade',
      autoplay: {
        delay: 5000,
      },
      navigation: {
        nextEl: '.example-next',
        prevEl: '.example-prev',
      },
      breakpoints: {
        // when window width is <= 992px
        992: {
          autoHeight: true
        }
      }
    })

  }

  //////////
  // MODALS
  //////////

  function initPopups(){
    // Magnific Popup
    var startWindowScroll = 0;
    $('[js-popup]').magnificPopup({
      type: 'inline',
      fixedContentPos: true,
      fixedBgPos: true,
      overflowY: 'auto',
      closeBtnInside: true,
      preloader: false,
      midClick: true,
      removalDelay: 300,
      mainClass: 'popup-buble',
      callbacks: {
        beforeOpen: function() {
          startWindowScroll = _window.scrollTop();
          // $('html').addClass('mfp-helper');
        },
        close: function() {
          // $('html').removeClass('mfp-helper');
          _window.scrollTop(startWindowScroll);
        }
      }
    });

    $('[js-popup-gallery]').magnificPopup({
  		delegate: 'a',
  		type: 'image',
  		tLoading: 'Загрузка #%curr%...',
  		mainClass: 'popup-buble',
  		gallery: {
  			enabled: true,
  			navigateByImgClick: true,
  			preload: [0,1]
  		},
  		image: {
  			tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
  		}
  	});
  }

  function closeMfp(){
    $.magnificPopup.close();
  }

  ////////////
  // UI
  ////////////

  // textarea autoExpand
  _document
    .one('focus.autoExpand', '.ui-group textarea', function(){
        var savedValue = this.value;
        this.value = '';
        this.baseScrollHeight = this.scrollHeight;
        this.value = savedValue;
    })
    .on('input.autoExpand', '.ui-group textarea', function(){
        var minRows = this.getAttribute('data-min-rows')|0, rows;
        this.rows = minRows;
        rows = Math.ceil((this.scrollHeight - this.baseScrollHeight) / 17);
        this.rows = minRows + rows;
    });

  // Masked input
  function initMasks(){
    $("[js-dateMask]").mask("99.99.99",{placeholder:"ДД.ММ.ГГ"});
    $("input[type='tel']").mask("+7 (000) 000-0000", {placeholder: "+7 (___) ___-____"});
  }

  // selectric
  function initSelectric(){
    var $select = $('[js-select]')
    if ( $select.length === 0 ) return

    $select.selectric({
      maxHeight: 300,
      arrowButtonMarkup: '<b class="button"><svg class="ico ico-select-down"><use xlink:href="img/sprite.svg#ico-select-down"></use></svg></b>',

      onInit: function(element, data){
        var $elm = $(element),
            $wrapper = $elm.closest('.' + data.classes.wrapper);

        $wrapper.find('.label').html($elm.attr('placeholder'));
      },
      onBeforeOpen: function(element, data){
        var $elm = $(element),
            $wrapper = $elm.closest('.' + data.classes.wrapper);

        $wrapper.find('.label').data('value', $wrapper.find('.label').html()).html($elm.attr('placeholder'));
      },
      onBeforeClose: function(element, data){
        var $elm = $(element),
            $wrapper = $elm.closest('.' + data.classes.wrapper);

        $wrapper.find('.label').html($wrapper.find('.label').data('value'));
      }
    });
  }

  ////////////
  // SCROLLMONITOR - WOW LIKE
  ////////////
  function initScrollMonitor(){
    $('.wow').each(function(i, el){

      var elWatcher = scrollMonitor.create( $(el) );

      var delay;
      if ( getWindowWidth() <= 767 ){
        delay = 0
      } else {
        delay = $(el).data('animation-delay');
      }

      var animationClass = $(el).data('animation-class') || "wowFadeUp"

      var animationName = $(el).data('animation-name') || "wowFade"

      elWatcher.enterViewport(throttle(function() {
        $(el).addClass(animationClass);
        $(el).css({
          'animation-name': animationName,
          'animation-delay': delay,
          'visibility': 'visible'
        });
      }, 100, {
        'leading': true
      }));
      // elWatcher.exitViewport(throttle(function() {
      //   $(el).removeClass(animationClass);
      //   $(el).css({
      //     'animation-name': 'none',
      //     'animation-delay': 0,
      //     'visibility': 'hidden'
      //   });
      // }, 100));
    });

  }

  ////////////////
  // FORM VALIDATIONS
  ////////////////

  // jQuery validate plugin
  // https://jqueryvalidation.org
  function initValidations(){
    // GENERIC FUNCTIONS
    var validateErrorPlacement = function(error, element) {
      error.addClass('ui-input__validation');
      error.appendTo(element.parent("div"));
    }
    var validateHighlight = function(element) {
      $(element).addClass("has-error");
    }
    var validateUnhighlight = function(element) {
      $(element).removeClass("has-error");
    }
    var validateSubmitHandler = function(form) {
      $(form).addClass('loading');
      $.ajax({
        type: "POST",
        url: $(form).attr('action'),
        data: $(form).serialize(),
        success: function(response) {
          $(form).removeClass('loading');
          var data = $.parseJSON(response);
          if (data.status == 'success') {
            // do something I can't test
          } else {
              $(form).find('[data-error]').html(data.message).show();
          }
        }
      });
    }

    var validatePhone = {
      required: true,
      normalizer: function(value) {
          var PHONE_MASK = '+X (XXX) XXX-XXXX';
          if (!value || value === PHONE_MASK) {
              return value;
          } else {
              return value.replace(/[^\d]/g, '');
          }
      },
      minlength: 11,
      digits: true
    }

    /////////////////////
    // REGISTRATION FORM
    ////////////////////
    $(".js-registration-form").validate({
      errorPlacement: validateErrorPlacement,
      highlight: validateHighlight,
      unhighlight: validateUnhighlight,
      submitHandler: validateSubmitHandler,
      rules: {
        last_name: "required",
        first_name: "required",
        email: {
          required: true,
          email: true
        },
        password: {
          required: true,
          minlength: 6,
        }
        // phone: validatePhone
      },
      messages: {
        last_name: "Заполните это поле",
        first_name: "Заполните это поле",
        email: {
            required: "Заполните это поле",
            email: "Email содержит неправильный формат"
        },
        password: {
            required: "Заполните это поле",
            email: "Пароль мимимум 6 символов"
        },
        // phone: {
        //     required: "Заполните это поле",
        //     minlength: "Введите корректный телефон"
        // }
      }
    });

    // when multiple forms share functionality

    // var subscriptionValidationObject = {
    //   errorPlacement: validateErrorPlacement,
    //   highlight: validateHighlight,
    //   unhighlight: validateUnhighlight,
    //   submitHandler: validateSubmitHandler,
    //   rules: {
    //     email: {
    //       required: true,
    //       email: true
    //     }
    //   },
    //   messages: {
    //     email: {
    //       required: "Fill this field",
    //       email: "Email is invalid"
    //     }
    //   }
    // }

    // call/init
    // $("[js-subscription-validation]").validate(subscriptionValidationObject);
    // $("[js-subscription-validation-footer]").validate(subscriptionValidationObject);
    // $("[js-subscription-validation-menu]").validate(subscriptionValidationObject);
  }

  //////////
  // BARBA PJAX
  //////////

  Barba.Pjax.Dom.containerClass = "page";
  var transitionInitElement

  var FadeTransition = Barba.BaseTransition.extend({
    start: function() {
      Promise
        .all([this.newContainerLoading, this.fadeOut()])
        .then(this.fadeIn.bind(this));
    },

    fadeOut: function() {
      var _this = this;
      var $oldPage = $(this.oldContainer)
      var $newPage = $(this.newContainer);
      var deferred = Barba.Utils.deferred();

      TweenLite.to($oldPage, .5, {
        opacity: 0,
        ease: Power1.easeIn,
        onComplete: function() {
          deferred.resolve();
        }
      });

      return deferred.promise
    },

    fadeIn: function() {
      var _this = this;
      var $oldPage = $(this.oldContainer)
      var $newPage = $(this.newContainer);

      $(this.oldContainer).hide();

      $newPage.css({
        visibility : 'visible',
        opacity : 0
      });

      TweenLite.to(window, .15, {
        scrollTo: {y: 0, autoKill: false},
        ease: easingSwing
      });

      TweenLite.to($newPage, .5, {
        opacity: 1,
        ease: Power1.easeOut,
        onComplete: function() {
          triggerBody()
          _this.done();
        }
      });

    }
  });

  // set barba transition
  Barba.Pjax.getTransition = function() {
    return FadeTransition;
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

  Barba.Prefetch.init();
  Barba.Pjax.start();

  // initialized transition
  Barba.Dispatcher.on('linkClicked', function(el) {
    transitionInitElement = el instanceof jQuery ? el : $(el)
  });

  // The new container has been loaded and injected in the wrapper.
  Barba.Dispatcher.on('newPageReady', function(currentStatus, oldStatus, container, newPageRawHTML) {
    pageReady(true);
  });

  // The transition has just finished and the old Container has been removed from the DOM.
  Barba.Dispatcher.on('transitionCompleted', function(currentStatus, oldStatus) {
    pageCompleated(true);
  });

  // some plugins get bindings onNewPage only that way
  function triggerBody(){
    $(window).scroll();
    $(window).resize();
  }

  //////////
  // DEVELOPMENT HELPER
  //////////
  function setBreakpoint(){
    var wHost = window.location.host.toLowerCase()
    var displayCondition = wHost.indexOf("localhost") >= 0 || wHost.indexOf("surge") >= 0
    if (displayCondition){
      var wWidth = getWindowWidth();
      var wHeight = _window.height()

      var content = "<div class='dev-bp-debug'>"+wWidth+" x "+wHeight+"</div>";

      $('.page').append(content);
      setTimeout(function(){
        $('.dev-bp-debug').fadeOut();
      },1000);
      setTimeout(function(){
        $('.dev-bp-debug').remove();
      },1500)
    }
  }

});


// HELPERS and PROTOTYPE FUNCTIONS

// LINEAR NORMALIZATION
function normalize(value, fromMin, fromMax, toMin, toMax) {
  var pct = (value - fromMin) / (fromMax - fromMin);
  var normalized = pct * (toMax - toMin) + toMin;

  //Cap output to min/max
  if (normalized > toMax) return toMax;
  if (normalized < toMin) return toMin;
  return normalized;
}

// get window width (not to forget about ie, win, scrollbars, etc)
function getWindowWidth(){
  return window.innerWidth
}
