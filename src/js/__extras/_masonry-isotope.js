//////////
// MASONRY
//////////
function initMasonry() {
  if ($('[js-masonry]').length > 0) {
    $('[js-masonry]').each(function(i, masonry) {
      var $masonry = $(masonry);
      var $grid;
      var masonryOption = {
        // layoutMode: 'masonry',
        layoutMode: 'packery',
        itemSelector: '[js-masonry-card]',
        percentPosition: true,
        // gutter: 36,
        // masonry: {
        //   columnWidth: '[js-masonry-grid-sizer]'
        // },
        packery: {
          // https://packery.metafizzy.co/options.html
          columnWidth: '[js-masonry-grid-sizer]',
          originLeft: true,
          originTop: true,
          gutter: 0,
        },
      };
      $grid = $masonry.isotope(masonryOption);
    });
  }
}

// masonry click handlers
_document.on('click', '[js-masonry-filter] a', function() {
  var $this = $(this);
  var gridTarget = $this.closest('[js-masonry-filter]').data('target');
  var $masonryGrid = $('[js-masonry][data-for="' + gridTarget + '"]');
  var dataFilter = $this.data('filter');

  $masonryGrid.isotope({
    filter: function() {
      if (!dataFilter) return true; // if filter is blank - show all

      var cardFilters = $(this)
        .data('filter')
        .split(' ');
      return cardFilters.indexOf(dataFilter) !== -1;
    },
  });

  $this
    .parent()
    .siblings()
    .find('a')
    .removeClass('is-active');
  $this.addClass('is-active');
});
