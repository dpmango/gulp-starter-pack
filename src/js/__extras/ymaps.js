//////////
// YMAPS
//////////
(function($, APP) {
  APP.Plugins.Ymaps = {
    data: {
      scriptsCreated: false,
      ymapsLoaded: false,
    },
    init: function() {
      if ($('.js-ymap').length > 0) {
        if (this.data.ymapsLoaded) {
          ymaps.ready(this.initMaps.bind(this));
        } else {
          this.tryLoadScripts();
        }
      }
    },
    createScripts: function() {
      var ymapsK = '9ba9a278-xxxxxxxxx';
      var ymapsScript = document.createElement('script');
      ymapsScript.type = 'text/javascript';
      ymapsScript.src = 'https://api-maps.yandex.ru/2.1/?apikey=' + ymapsK + '&lang=ru_RU';
      $('head').append(ymapsScript);
      this.data.scriptsCreated = true;
    },
    tryLoadScripts: function() {
      var _this = this;
      if (!_this.data.scriptsCreated) {
        _this.createScripts();
      }

      var ticker = setInterval(readyChecker, 250);
      function readyChecker() {
        if (!_this.data.ymapsLoaded) {
          try {
            if (ymaps.ready()) {
              _this.data.ymapsLoaded = true;
              _this.init(); // reinit
              clearInterval(ticker);
            }
          } catch (e) {
            // console.log('maps not ready yeat, another try');
          }
        }
      }
    },
    initMaps: function() {
      var _this = this;
      $('.js-ymap').each(function(i, domElement) {
        _this.drawMap(domElement);
      });
    },
    drawMap: function(domElement) {
      var _this = this;
      var $domElement = $(domElement);
      if ($domElement.length === 0) return;

      var myMap;
      var params = {
        center: _this.geoStringToArr($domElement.data('center')),
        zoom: $domElement.data('zoom') || 10,
        placeholder: {
          geodata: _this.geoStringToArr($domElement.data('placeholder')),
          caption: $domElement.data('placeholder-caption'),
          balloon: $domElement.data('placeholder-balloon'),
        },
      };

      console.log(params);
      if (!params.center) return;

      // CREATE MAP INSTANCE
      myMap = new ymaps.Map(domElement, {
        center: params.center,
        zoom: params.zoom,
      });

      // CONTROLS
      myMap.controls.remove('trafficControl');
      myMap.controls.remove('searchControl');
      myMap.controls.remove('fullscreenControl');
      myMap.controls.remove('rulerControl');
      myMap.controls.remove('geolocationControl');
      myMap.controls.remove('routeEditor');
      myMap.controls.remove('typeSelector');
      // myMap.controls.remove('zoomControl');

      // PLACEHOLDER
      if (params.placeholder.geodata) {
        var placeholder = new ymaps.Placemark(
          params.placeholder.geodata,
          {
            balloonContent: params.placeholder.balloon,
            iconCaption: params.placeholder.caption,
          },
          {
            preset: 'islands#redIcon',
          }
        );

        myMap.geoObjects.add(placeholder);
      }
    },
    geoStringToArr: function(str) {
      var split = str.split(',');
      if (split.length === 2) {
        return [parseFloat(split[0]), parseFloat(split[1])];
      }

      return false;
    },
  };
})(jQuery, window.APP);
