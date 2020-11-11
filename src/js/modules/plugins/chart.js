//////////
// Chart
//////////
(function($, APP) {
  APP.Plugins.Chart = {
    data: {
      charts: [],
    },
    init: function(fromPjax) {
      this.resetData();
      if (!fromPjax) {
        this.listenScroll();
      }
    },
    resetData: function() {
      this.data.charts = [];
    },
    renderAllCharts: function() {
      var _this = this;
      var $charts = $('.js-chart');
      if ($charts.length === 0) return;
      $charts.each(function(i, chart) {
        _this.renderChart(chart);
      });
    },
    listenScroll: function() {
      // Attached animation on entering viewport
      var $charts = $('.js-chart-scroll:not(.is-rendered)');

      if ($charts.length === 0) return;
      $charts.each(function(i, el) {
        var $el = $(el);
        var elWatcher = scrollMonitor.create($el);

        elWatcher.enterViewport(
          throttle(
            function() {
              APP.Plugins.Chart.renderChart($el);
            },
            100,
            {
              leading: true,
            }
          )
        );
      });
    },
    // manual initialization
    renderChart: function($chart) {
      var _this = this;
      if ($chart.length === 0) return;
      if ($chart.is('.is-rendered')) return;

      var chartCtx = $chart[0].getContext('2d');

      // getting data- attributes
      var elData = {
        labels: $chart.data('labels'),
        values: $chart.data('values'),
        negative: $chart.data('negative'),
      };

      // seed (can be removed on prod)
      if (elData.values === 'seed') {
        elData.values = _this.seedValues();
      }
      if (elData.labels === 'seed') {
        elData.labels = _this.seedValues();
      }

      // console.log(elData);

      var gradientFill = chartCtx.createLinearGradient(0, 0, 0, 150);
      if (!elData.negative) {
        gradientFill.addColorStop(0, 'rgba(52, 199, 89, 0.3)');
        gradientFill.addColorStop(1, 'rgba(52, 199, 89, 0)');
      } else {
        gradientFill.addColorStop(0, 'rgba(255, 113, 91, 0.3)');
        gradientFill.addColorStop(1, 'rgba(255, 113, 91, 0)');
      }

      var borderColor = !elData.negative ? '#34C759' : '#FF715B';

      var data = {
        labels: elData.labels,
        datasets: [
          {
            // yAxisID: 'y-axis-0',
            backgroundColor: gradientFill,
            borderColor: borderColor,
            fill: true,
            borderWidth: 2,
            data: elData.values,
            pointRadius: 0,
            tension: 0.4,
          },
        ],
      };

      var options = {
        maintainAspectRatio: false,
        onResize: () => {},
        legend: {
          display: false,
        },
        tooltips: {
          display: false,
        },
        elements: {
          point: {
            display: false,
          },
        },
        // scales
        scales: {
          xAxes: [
            {
              display: false,
            },
          ],
          yAxes: [
            {
              stacked: true,
              display: false,
            },
          ],
        },
      };

      // initialize
      var chartinstance = new Chart(chartCtx, {
        type: 'line',
        data: data,
        options: options,
      });

      this.data.charts.push({
        element: $chart,
        instance: chartinstance,
      });

      $chart.addClass('is-rendered');
    },
    seedValues: function() {
      const arr = [...Array(20).keys()];
      return arr.map(x => seedRandom());
    },
  };
})(jQuery, window.APP);
