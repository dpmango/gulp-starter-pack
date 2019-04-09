(function($, APP) {
  APP.Plugins.Countdown = {
    init: function() {
      if ($('[js-countdown]').length > 0) {
        var $this = $('[js-countdown]');
        var endDate = new Date($this.data('timestamp')).getTime();
        var $days = $this.find('[js-days]');
        var $hours = $this.find('[js-hours]');
        var $minutes = $this.find('[js-minutes]');
        var $seconds = $this.find('[js-seconds]');

        // Update the count down every 1 second
        var x = setInterval(function() {
          // Get todays date and time
          var now = new Date().getTime();

          // Find the distance between now an the count down date
          var distance = endDate - now;

          // Time calculations for days, hours, minutes and seconds
          var days = Math.floor(distance / (1000 * 60 * 60 * 24));
          var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          var seconds = Math.floor((distance % (1000 * 60)) / 1000);

          // Display the result in the element with id="demo"
          $days.find('.counter__number').html(days.pad(2));
          $days.find('.counter__name').html(pluralize('day', days));
          $hours.find('.counter__number').html(hours.pad(2));
          $hours.find('.counter__name').html(pluralize('hour', hours));
          $minutes.find('.counter__number').html(hours.pad(2));
          $minutes.find('.counter__name').html(pluralize('min', minutes));
          $seconds.find('.counter__number').html(seconds.pad(2));
          $seconds.find('.counter__name').html(pluralize('sec', minutes));

          // If the count down is finished, write some text
          if (distance < 0) {
            clearInterval(x);
            // document.getElementById("#days").innerHTML = "EXPIRED";
          }
        }, 1000);
      }
    },
  };
})(jQuery, window.APP);
