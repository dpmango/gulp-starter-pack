// store in global variables berore pageReady();
var aboutSwiper = {
  instance: undefined,
  disableOn: 992
}


function initSliders(){
  // TODO - wrong selector on barba.js changes

  // INIT CHECKERS
  var aboutSelector = '[js-about-swiper]'

  if ( $(aboutSelector).length > 0 ){
    if ( _window.width() >= aboutSwiper.disableOn ) {
      if ( aboutSwiper.instance !== undefined ) {
        aboutSwiper.instance.destroy( true, true );
        aboutSwiper.instance = undefined
      }
      // return
    } else {
      if ( aboutSwiper.instance === undefined ) {

        // ABOUT SWIPER
        aboutSwiper.instance = new Swiper(aboutSelector, {
          wrapperClass: "swiper-wrapper",
          slideClass: "about__slider-slide",
          direction: 'horizontal',
          loop: false,
          watchOverflow: false,
          setWrapperSize: false,
          // spaceBetween: 36,
          slidesPerView: 'auto',
          normalizeSlideIndex: true,
          freeMode: true,
          preventClicks: true,
          breakpoints: {
            // when window width is <= 992px
            992: {
              spaceBetween: 36,
            },
            576: {
              spaceBetween: 20,
            },
            414: {
              spaceBetween: 10
            }
          }
        })

      }
    }
  }
}
