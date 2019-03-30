// Object style
// APP.Modules.ObjectModuleDemo.init();
(function($, APP) {
  APP.Modules.DemoObjectModule = {
    init: function() {
      // ... code ...
    },
    destroy: function() {
      // ... code ...
    },
  };
})(jQuery, window.APP);

// Constructor style
// var module = new APP.Modules.ContrcutorModuleDemo('.header', params)
// module.init()
(function($, APP) {
  APP.Modules.DemoContrcutorModule = function(el, data) {
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
// new APP.Modules.ContrcutorModuleDemo('foo').getData()
(function($, APP) {
  APP.Modules.DemoContrcutorModule2 = function(foo, bar) {
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
