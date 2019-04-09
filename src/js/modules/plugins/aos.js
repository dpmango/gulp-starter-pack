//////////
// AOS
//////////
(function($, APP) {
  APP.Plugins.AOS = {
    init: function() {
      AOS.init({
        // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
        offset: 120, // offset (in px) from the original trigger point
        delay: 0, // values from 0 to 3000, with step 50ms
        duration: 400, // values from 0 to 3000, with step 50ms
        easing: 'ease-in', // default easing for AOS animations
        once: true, // whether animation should happen only once - while scrolling down
        mirror: false, // whether elements should animate out while scrolling past them
        anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
      });
    },

    refresh: function() {
      AOS.refreshHard();
    },
  };
})(jQuery, window.APP);
