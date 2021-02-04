//////////////////////////////////
// HELPERS and PROTOTYPE FUNCTIONS
//////////////////////////////////

// LINEAR NORMALIZATION
function normalize(value, fromMin, fromMax, toMin, toMax) {
  var pct = (value - fromMin) / (fromMax - fromMin);
  var normalized = pct * (toMax - toMin) + toMin;

  //Cap output to min/max
  if (normalized > toMax) return toMax;
  if (normalized < toMin) return toMin;
  return normalized;
}

// get window width (not to forget about ie, win, scrollbars, etc)
function getWindowWidth() {
  return window.innerWidth;
}

// manually trigger events to start certain plugins
function triggerBody() {
  $(window).scroll();
  $(window).resize();
}

// Format with spaces
function formatNumberWithSpaces(num) {
  return num
    .toFixed(0)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

// Add padding to numbers (a.k.a format by mask 00)
// use (9).pad(2) // output - 09
Number.prototype.pad = function (size) {
  var s = String(this);
  while (s.length < (size || 2)) {
    s = '0' + s;
  }
  return s;
};

// check if certain breakpoint was went through
function hasCrossedBreakpoint(prevResize, curWidth, targetBp) {
  if (
    (curWidth >= targetBp && prevResize <= targetBp) ||
    (curWidth <= targetBp && prevResize >= targetBp)
  ) {
    return true;
  }
  return false;
}

// Plurize (russian)
// использование Plurize(number, 'пешеход', 'пешехода', 'пешеходов')
// автоматическая генерация как в английском не работает из-за склонений
// например "1 пешеход", "2 пешехода", "5 пешеходов"
// или "1 человек", "2 человека", "5 человек"  {1 и 5} - одиникавые
function Plurize(number, one, two, five) {
  var n = Math.abs(number);
  n %= 100;
  if (n >= 5 && n <= 20) {
    return five;
  }
  n %= 10;
  if (n === 1) {
    return one;
  }
  if (n >= 2 && n <= 4) {
    return two;
  }
  return five;
}

// convert hex to rgba
function rgba(hex, alpha) {
  var r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
  } else {
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
  }
}

// MEDIA Condition helper function
function mediaCondition(cond) {
  var disabledBp;
  var conditionMedia = cond.substring(1);
  var conditionPosition = cond.substring(0, 1);

  if (conditionPosition === '<') {
    disabledBp = getWindowWidth() < conditionMedia;
  } else if (conditionPosition === '>') {
    disabledBp = getWindowWidth() > conditionMedia;
  }

  return disabledBp;
}
