// SLICK - UNSLICK EXAMPLE
// used when slick should be disabled on certain breakpoints

var _socialsSlickMobile = $('.socials__wrapper');
var socialsSlickMobileOptions = {
  mobileFirst: true,
  dots: true,
  responsive: [
    {
      breakpoint: 0,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      }
    },
    {
      breakpoint: 568,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      }

    },
    {
      breakpoint: 992,
      settings: "unslick"
    }

  ]
}
_socialsSlickMobile.slick(socialsSlickMobileOptions);

_window.on('resize', debounce(function(e){
  if ( _window.width() > 992 ) {
    if (_socialsSlickMobile.hasClass('slick-initialized')) {
      _socialsSlickMobile.slick('unslick');
    }
    return
  }
  if (!_socialsSlickMobile.hasClass('slick-initialized')) {
    return _socialsSlickMobile.slick(socialsSlickMobileOptions);
  }
}, 300));
