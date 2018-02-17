// wait till image is loaded
// could be useful for barba custom animations
var targetImage = $newContainer.find('.one-member__photo').find('[js-lazy]');
var targetImageLazyInstance = targetImage.Lazy({
  chainable: false,
  afterLoad: function(element) {
    var img = new Image();
    img.onload = function() {
      callbackFunction();
    };
    img.src = element.attr('src');
  }
})
targetImageLazyInstance.force(targetImage);
