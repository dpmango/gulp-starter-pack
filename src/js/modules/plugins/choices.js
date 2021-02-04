//////////
// CHOICES
//////////
(function ($, APP) {
  APP.Plugins.Choises = {
    init: function () {
      // https://github.com/jshjohnson/Choices
      let $elements = $('.js-choices');
      if ($elements.length === 0) return;

      $elements.each(function (i, el) {
        let isSerchable = $(el).data('searchable') ? true : false;
        let shouldSort = $(el).data('sort') ? true : false;

        const choices = new Choices(el, {
          silent: false,
          searchEnabled: isSerchable,
          searchChoices: isSerchable,
          searchResultLimit: 5,
          searchFields: ['label', 'value'],
          shouldSort: shouldSort,
          shouldSortItems: shouldSort,
          loadingText: 'Загрузка...',
          noResultsText: 'Не найдено',
          noChoicesText: 'Нет доступных опций',
          itemSelectText: '',
        });
      });
    },
  };
})(jQuery, window.APP);
