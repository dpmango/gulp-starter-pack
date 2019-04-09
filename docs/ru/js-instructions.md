# Работа с JS

Логика подключения основана на модульности и компонентной системе, чтобы упростить дебаг и не раздувать js файлы на много строк. Также помогает держать понятную структуру разбивая большие функции на методы и выносить общие функции чтобы не повторяться. Не используется webpack для самописного js кода, так как для проектов по верстке большинство клиентов хотят получить файл который можно будет редактировать самостоятельно на CMS без необходиомости запускать сборку.

Рекомендую повторить раздел ООП в функциональном стиле тут - https://learn.javascript.ru/oop 
Также подключить дополнения `eslint` и `prettier` к своему текстовому редактору, он будет выдавать ошибки если что то делается неправильно

### Точки входа
- **src/js/venodor.js** - для подключения библиотек/плагинов, предварительно установленных в node_modules. Работет на webpack и es6 синтаксисе. Gulp таск для этого файла - `javascript:vendor`
- **src/js/app.js** - главный файл, содержит только подключение модулей из `src/js/modules` и компонентов из `src/components/**/*.js`. Рекомендуется писать на es5 синтаксисе, однако babel также подключен и es6  фичи будут конвертированы в es5. Gulp таск для этого файла - `javascript:app`

### Обьект APP
В сборке собирается 2 файла - `dist/js/vendor.js` (от webpack) и `dist/js/app.js` (просто склеивает все модули и компоненты в один файл) , поэтому чтобы они знали о существовании друг друга, все манипуляции происходят через глобальный обьект APP (window.APP)

- APP.Dev - модули для разработки (например рендер размера экрана)
- APP.Browser - модули с информацией о браузере (например isIE, isMobile)
- APP.Plugins - модули плагинов и глоабальных функций (например слайдеры, модальные окна)
- APP.Components - модули, уникальные для компонента (например шапка или карточка товара)


## Подключение плагинов
Рассмотрим на примере подключения Swiper.js
1. Добавить заивисимость `yarn add swiper` с сохранением в `dependencies` package.json
2. Подключить библиотеку в `vendor.js` 

```js
// импортируем под именем Swiper из пакета swiper
import Swiper from 'swiper';

// раскрываем обьект на глобальном уровне через присвоение
window.Swiper = Swiper;
```

3. Добавить компонент в `src/js/modules`

В обертке window.APP и присвоением имени модуля к глобальному APP. Этот компонент просто приклеится внизу `dist/js/app.js` файла и не будет инициализироваться самостоятельно. Он только делает методы модуля доступными на уровне window. В инспекторе можно попробовать набрать `APP.Plugins.Sliders` и увидеть доступные функции. Если набрать `APP.Plugins.Sliders.init()` - произойдет инициализация модуля.

```js
(function($, APP) {
  APP.Plugins.Sliders = {
    init: function() {
      new Swiper('[js-slider]', {
        // ... swiper options ...
      });
    },
    destroy: function() {
      // ... code ...
    },
  };
})(jQuery, window.APP);
```


4. Инициализировать плагин в `src/js/app.js`
Так как в основном многостраничные проекты работают на pjax, нам нужен полный контроль над инициализацией нужных плагинов и компонентов. Этим и занимается файл `app.js`. Здесь разбита логика подключения модулей на разные события - первоначальная загрузка, смена страницы и другие подобные.

```js
// основная инициализация
app.init = function() {
  app.initGlobalPlugins();
  app.initPlugins();
  app.initComponents();
};

// плагины которые должны подключиться один при загрузке страницы
app.initGlobalPlugins = function() { }

// плагины которые зависят от содержимого страницы
app.initPlugins = function() {
    // .. Так как Слайдеры это плагин которые зависят от содержимого страницы подключаем здесь
    APP.Plugins.Sliders.init();
}

// подключение компонетов из `src/components` - уникальные функции для конкретного блока(компонента)
app.initComponents = function() { }

// Хук который запускается когда готова смена страницы
app.newPageReady = function() {
  app.refresh();
};

// вызывается refresh который заново запускает все плагины и компоненты (за исключением глобальных)
app.refresh = function() {
  app.initPlugins();
  app.initComponents();
};
```

## Подключение компонентов
В целом все похоже на подключение плагина, только пропускаем добавление зависимости в `vendor.js`
На примере компонента шапки

1. Создаем папку `src/components/header`, там `*.js` файл с любым названием, реккомендую повторяющую название папки чтобы проще было искать через поиск `header.js` , или `index.js`

```js
(function($, APP) {
  APP.Components.Header = {
    // обьект data держит переменные или какие то данные
    data: {
      header: {
        container: undefined,
        bottomPoint: undefined,
      },
    },
    // главная функция - инициализатор
    init: function() {
      this.getHeaderParams();
      this.hamburgerClickListener();
      this.listenScroll();
      this.listenResize();
    },
    // записываем данные в обьект data компонента
    getHeaderParams: function() {
      var $header = $('.header');
      var headerOffsetTop = 0;
      var headerHeight = $header.outerHeight() + headerOffsetTop;
      
      // доступно через this
      this.data.header = {
        container: $header,
        bottomPoint: headerHeight,
      };
    },
    hamburgerClickListener: function() {
      // начинаем слушать событие на клик
      _document.on('click', '[js-hamburger]', function() {
        // можно вызвать любой другой метод, так как APP доступен глобально
        // например заблокируем скрол на странице
        APP.Plugins.ScrollBlock.blockScroll();
      });
    },
    // слушаем события на скролл и ресайз
    listenScroll: function() {
      _window.on('scroll', this.scrollHeader.bind(this));
    },
    listenResize: function() {
      // у .on свой контекст this, поэтому нужен .bind(this)
      _window.on('resize', debounce(this.getHeaderParams.bind(this), 100));
      // (или) альтернативный вариант
      var _this = this; // ссылаемся на this на верхнем уровне
      _window.on('resize', debounce(_this.getHeaderParams, 100));
    },
    // обработка скролла
    scrollHeader: function() {
      // получаем данные из this.data
      if (this.data.header.container !== undefined) {
        // .. code
      }
    },
  };
})(jQuery, window.APP);
```


2. Инициализировать компонент в `src/js/app.js`
```js
    app.initComponents = function() {
      APP.Components.Header.init();
    };
```

