////////////
// SVG FUNCTIONS
////////////

function parseSvg(){
  var _this = $('.header__logo svg');
  if ( _this.length > 0 ){
    centerTransformOrigin(_this, 'logo-mark');
  }
}

// sets transform origin to center for a target class (inside svg target_el)
function centerTransformOrigin(target_el, target_class){
  var findClass = "." + target_class;
  var my_element = target_el.find(findClass);

  var bb = my_element.get(0).getBBox();
  var cx = bb.x + bb.width / 2;
  var cy = bb.y + bb.height / 2;

  var bodyStyle = "<style>"+ "." + $(target_el).parent().parent().attr('class') + " ." + target_class + " { transform-origin: "+cx + 'px ' + cy + 'px'+"; }</style>"
  $( bodyStyle ).appendTo( "body" )
}
