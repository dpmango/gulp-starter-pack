'use strict';

$(document).ready(function () {

  //////////
  // Global variables
  //////////

  var _window = $(window);
  var _document = $(document);

  //////////
  // COMMON
  //////////

  // Prevent # behavior
  $('[href="#"]').click(function (e) {
    e.preventDefault();
  });

  // Smoth scroll
  $('a[href^="#section"]').click(function () {
    var el = $(this).attr('href');
    $('body, html').animate({
      scrollTop: $(el).offset().top }, 1000);
    return false;
  });

  // HEADER SCROLL
  _window.scrolled(10, function () {
    // scrolled is a constructor for scroll delay listener
    var vScroll = _window.scrollTop();
    var header = $('.header').not('.header--static');
    var headerHeight = header.height();
    var heroHeight = $('.hero').outerHeight() - headerHeight;

    if (vScroll > headerHeight) {
      header.addClass('header--transformed');
    } else {
      header.removeClass('header--transformed');
    }

    if (vScroll > heroHeight) {
      header.addClass('header--fixed');
    } else {
      header.removeClass('header--fixed');
    }
  });

  // scrollbars
  $('.scrollbar-dynamic').scrollbar();

  //////////
  // SLIDERS
  //////////

  $('.trending__wrapper').slick({
    autoplay: true,
    dots: false,
    arrows: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    centerMode: true,
    variableWidth: true
  });

  //////////
  // MODALS
  //////////
  $('*[data-modal]').on('click', function () {
    // remove all active first
    $('.modal').removeClass('opened');

    // find by id
    var target = $(this).data('modal');
    $('#' + target).addClass('opened');

    window.location.hash = target;
  });

  $('.modal__close').on('click', function () {
    $(this).closest('.modal').removeClass('opened');
    window.location.hash = "";
  });

  // CHECK SAVED STATE
  if (window.location.hash) {
    var hash = window.location.hash.substring(1);
    $('#' + hash).addClass('opened');
  }

  // Magnific Popup
  // var startWindowScroll = 0;
  // $('.popup-with-zoom-anim').magnificPopup({
  //   type: 'inline',
  //   fixedContentPos: true,
  //   fixedBgPos: true,
  //   overflowY: 'auto',
  //   closeBtnInside: true,
  //   preloader: false,
  //   midClick: true,
  //   removalDelay: 300,
  //   mainClass: 'my-mfp-zoom-in',
  //   callbacks: {
  //     beforeOpen: function() {
  //       startWindowScroll = _window.scrollTop();
  //       $('html').addClass('mfp-helper');
  //     },
  //     close: function() {
  //       $('html').removeClass('mfp-helper');
  //       _window.scrollTop(startWindowScroll);
  //     }
  //   }
  // });
  //
  // $('.popup-with-move-anim').magnificPopup({
  //   type: 'inline',
  //   fixedContentPos: false,
  //   fixedBgPos: true,
  //   overflowY: 'auto',
  //   closeBtnInside: true,
  //   preloader: false,
  //   midClick: true,
  //   removalDelay: 300,
  //   mainClass: 'my-mfp-slide-bottom'
  // });
  //
  // $('.popup-gallery').magnificPopup({
  // 	delegate: 'a',
  // 	type: 'image',
  // 	tLoading: 'Loading image #%curr%...',
  // 	mainClass: 'mfp-img-mobile',
  // 	gallery: {
  // 		enabled: true,
  // 		navigateByImgClick: true,
  // 		preload: [0,1]
  // 	},
  // 	image: {
  // 		tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
  // 	}
  // });

  // Masked input
  $("#date").mask("99/99/9999", { placeholder: "mm/dd/yyyy" });
  $("input[name='phone']").mask("9 (999) 999-9999");
  $("#tin").mask("99-9999999");
  $("#ssn").mask("999-99-9999");

  // DATEPICKER
  $('.js-datepicker').datepicker({
    language: 'en',
    range: true,
    multipleDatesSeparator: " - "
  });

  // RANGESLIDER
  var rangeSlider = document.querySelector('.js-rangeslider');

  if ($('.js-rangeslider').length > 0) {
    noUiSlider.create(rangeSlider, {
      start: [90, 120],
      connect: true,
      tooltips: true,
      step: 1,
      // pips: { // Show a scale with the slider
      // 	mode: 'steps',
      // 	stepped: true,
      // 	density: 4
      // },
      range: {
        'min': [80],
        'max': [120]
      }
    });

    // method to get current value
    // rangeSlider.noUiSlider.get();

    // docs on noUiSlider
    // https://refreshless.com/nouislider/slider-read-write/
  }

  // STICKY MAP RESULTS
  _window.scrolled(10, function () {
    var stickyEl = $('.results__map');
    var windowBottomScroll = _window.scrollTop() + _window.height();
    var stopPoint = _document.height() - $('footer').outerHeight();

    if (windowBottomScroll >= stopPoint) {
      stickyEl.addClass('results__map--stop');
    } else if (windowBottomScroll < stopPoint) {
      stickyEl.removeClass('results__map--stop');
    }
  });

  // OPTIONAL
  // hero parallax on mousemove

  var movementStrength = 50;
  var height = movementStrength / _window.height();
  var width = movementStrength / _window.width();
  $(".hero").mousemove(function (e) {
    var pageX = e.pageX - _window.width() / 2;
    var pageY = e.pageY - _window.height() / 2;
    var newvalueX = width * pageX * -1 - 25;
    var newvalueY = height * pageY * -1 - 50;
    $('.hero-bg').css("background-position", newvalueX + "px     " + newvalueY + "px");
  });

  // INPUTS FOCUS

  // Codedrops based - pure javascript
  (function () {
    // trim polyfill : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
    if (!String.prototype.trim) {
      (function () {
        // Make sure we trim BOM and NBSP
        var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
        String.prototype.trim = function () {
          return this.replace(rtrim, '');
        };
      })();
    }

    [].slice.call(document.querySelectorAll('.input--dynamic input')).forEach(function (inputEl) {
      // in case the input is already filled..
      if (inputEl.value.trim() !== '') {
        classie.add(inputEl.parentNode, 'input--focused');
      }

      // events:
      inputEl.addEventListener('focus', onInputFocus);
      inputEl.addEventListener('blur', onInputBlur);
    });

    function onInputFocus(ev) {
      classie.add(ev.target.parentNode, 'input--focused');
    }

    function onInputBlur(ev) {
      if (ev.target.value.trim() === '') {
        classie.remove(ev.target.parentNode, 'input--focused');
      }
    }
  })();
});