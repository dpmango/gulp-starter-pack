var slickNextArrow = '<div class="slick-prev"><svg class="ico ico-back-arrow"><use xlink:href="img/sprite.svg#ico-back-arrow"></use></svg></div>';
var slickPrevArrow = '<div class="slick-next"><svg class="ico ico-next-arrow"><use xlink:href="img/sprite.svg#ico-next-arrow"></use></svg></div>'

// General purpose sliders
$('[js-slider]').each(function(i, slider){
  var self = $(slider);

  // set data attributes on slick instance to control
  if (self && self !== undefined) {
    self.slick({
      autoplay: self.data('slick-autoplay') !== undefined ? true : false,
      dots: self.data('slick-dots') !== undefined ? true : false,
      arrows: self.data('slick-arrows') !== undefined ? true : false,
      prevArrow: slickNextArrow,
      nextArrow: slickPrevArrow,
      infinite: self.data('slick-infinite') !== undefined ? true : true,
      speed: 300,
      slidesToShow: 1,
      accessibility: false,
      adaptiveHeight: true,
      draggable: self.data('slick-no-controls') !== undefined ? false : true,
      swipe: self.data('slick-no-controls') !== undefined ? false : true,
      swipeToSlide: self.data('slick-no-controls') !== undefined ? false : true,
      touchMove: self.data('slick-no-controls') !== undefined ? false : true
    });
  }

})

// other individual sliders goes here
$('[js-myCustomSlider]').slick({

})
