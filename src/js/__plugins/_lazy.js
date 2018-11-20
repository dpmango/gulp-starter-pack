//////////
// LAZY LOAD
//////////
function initLazyLoad(){
  _document.find('[js-lazy]').Lazy({
    threshold: 500,
    enableThrottle: true,
    throttle: 100,
    scrollDirection: 'vertical',
    effect: 'fadeIn',
    effectTime: 350,
    // visibleOnly: true,
    // placeholder: "data:image/gif;base64,R0lGODlhEALAPQAPzl5uLr9Nrl8e7...",
    onError: function(element) {
        console.log('error loading ' + element.data('src'));
    },
    beforeLoad: function(element){
      // element.attr('style', '')
    }
  });
}
