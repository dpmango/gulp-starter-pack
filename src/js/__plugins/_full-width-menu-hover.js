// MENU HOVER
var menuDebounceTime = 300 // how much time user have to hover dropdown menu?
_document
  .on('mouseenter', '[js-dropdown-menu]', debounce(function(){
    $(this).parent().addClass('is-hovered');
    var target = $(this).data('target');
    $('.dropdown-menu[data-for='+ target +']').addClass('is-active');
  }, menuDebounceTime))
  .on('mouseleave', '[js-dropdown-menu]', debounce(function(){
    $(this).parent().removeClass('is-hovered');
    var target = $(this).data('target');
    $('.dropdown-menu[data-for='+ target +']').removeClass('is-active');
  }, menuDebounceTime))

  // reverse (keep hovered menu active)
  .on('mouseenter', '.dropdown-menu[data-for]', debounce(function(){
    $(this).addClass('is-active');
    var target = $(this).data('for');
    $('[js-dropdown-menu][data-target='+ target +']').parent().addClass('is-hovered');
  }, menuDebounceTime))
  .on('mouseleave', '.dropdown-menu[data-for]', debounce(function(){
    $(this).removeClass('is-active');
    var target = $(this).data('for');
    $('[js-dropdown-menu][data-target='+ target +']').parent().removeClass('is-hovered');
  }, menuDebounceTime))


// MOBILE NAVI
function addMobileMenuClasses(){
  var $selector = $('[js-mobile-navi-menu] li');

  if ( $selector.length > 0 ){
    $selector.each(function(i,li){
      if ( $(li).find('ul').length > 0 ){
        $(li).addClass('have-ul');
      }
    })
  }
}

// click handlers
_document
  .on('click', '[js-mobile-navi-menu] li a', throttle(function(e){
    var $this = $(this);
    var $li = $this.parent();
    var haveLi = $li.is('.have-ul');
    if ( haveLi ) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      return
    }
    var $ul = $li.find('ul');
    var $siblings = $li.siblings()

    // clear all first
    $siblings.removeClass('is-opened');
    $siblings.find('ul').slideUp(250);

    // add classes and togglers
    $ul.slideToggle(250);
    $li.toggleClass('is-opened');

  },250, {leading: true}))

  // second level click
  .on('click', '[js-mobile-navi-menu] li ul', function(e){
    e.stopPropagation();
  });
