////////////
// SVG FUNCTIONS
////////////

function parseSvg() {
  var _this = $('.header__logo svg');
  if (_this.length > 0) {
    centerTransformOrigin(_this, 'logo-mark');
  }
}

// sets transform origin to center for a target class (inside svg target_el)
function centerTransformOrigin(targetEl, targetClass) {
  var findClass = '.' + targetClass;
  var myElement = targetEl.find(findClass);

  var bb = myElement.get(0).getBBox();
  var cx = bb.x + bb.width / 2;
  var cy = bb.y + bb.height / 2;

  var bodyStyle =
    '<style>' +
    '.' +
    $(target_el)
      .parent()
      .parent()
      .attr('class') +
    ' .' +
    targetClass +
    ' { transform-origin: ' +
    cx +
    'px ' +
    cy +
    'px' +
    '; }</style>';
  $(bodyStyle).appendTo('body');
}
