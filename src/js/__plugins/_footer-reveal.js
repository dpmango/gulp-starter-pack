// FOOTER REVEAL
function revealFooter() {
  var footer = $('[js-reveal-footer]');
  if (footer.length > 0) {
    var footerHeight = footer.outerHeight();
    var maxHeight = _window.height() - footerHeight > 100;
    if (maxHeight && !msieversion() ) {
      $('body').css({
        'margin-bottom': footerHeight
      });
      footer.css({
        'position': 'fixed',
        'z-index': -10
      });
    } else {
      $('body').css({
        'margin-bottom': 0
      });
      footer.css({
        'position': 'static',
        'z-index': 10
      });
    }
  }
}
