(function($, APP) {
  APP.Plugins.TextareaAutoExpand = {
    init: function() {
      // textarea autoExpand
      _document
        .one('focus.autoExpand', '.ui-group textarea', function() {
          var savedValue = this.value;
          this.value = '';
          this.baseScrollHeight = this.scrollHeight;
          this.value = savedValue;
        })
        .on('input.autoExpand', '.ui-group textarea', function() {
          var minRows = this.getAttribute('data-min-rows') | 0,
            rows;
          this.rows = minRows;
          rows = Math.ceil((this.scrollHeight - this.baseScrollHeight) / 17);
          this.rows = minRows + rows;
        });
    },
  };
})(jQuery, window.APP);
