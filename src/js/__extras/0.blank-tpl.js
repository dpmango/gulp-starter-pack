// Object style
// APP.Plugins.ObjectModuleDemo.init();
(function($, APP) {
  APP.Plugins.DemoObjectModule = {
    init: function() {
      // ... code ...
    },
    destroy: function() {
      // ... code ...
    },
  };
})(jQuery, window.APP);

// Constructor style
// var module = new APP.Plugins.ContrcutorModuleDemo('.header', params)
// module.init()
(function($, APP) {
  APP.Plugins.DemoContrcutorModule = function(el, data) {
    var $el = $(el);

    this.init = function() {
      // ... code ...
      // $el.plugin({data})
      // ... code ...
    };

    // also possible to initilize straigtaway without assigning via new
    // this.init(); - but not reccomended (each constructor call will init again?)
  };
})(jQuery, window.APP);

// Constructor style returnable methods
// new APP.Plugins.ContrcutorModuleDemo('foo').getData()
(function($, APP) {
  APP.Plugins.DemoContrcutorModule2 = function(foo, bar) {
    var methods = {};

    methods.init = function() {
      // ... code ...
    };

    methods.getData = function() {
      return {
        foo: foo,
        bar: bar,
      };
    };

    return methods; // return inner methods to global scope
  };
})(jQuery, window.APP);
