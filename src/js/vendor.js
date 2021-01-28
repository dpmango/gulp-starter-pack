// import $ from 'jquery';
import svg4everybody from 'svg4everybody';
import picturefill from 'picturefill';
import viewportUnitsBuggyfill from 'viewport-units-buggyfill';
import objectFitImages from 'object-fit-images/dist/ofi.es-modules.js';
import Swiper, { Navigation, Pagination } from 'swiper';
import magnificPopup from 'magnific-popup';
import AOS from 'aos';
import validate from 'jquery-validation';
import mask from 'jquery-mask-plugin';
import selectric from 'jquery-selectric';
import Barba from 'barba.js';
import Lazy from 'jquery-lazy';
// import LazyAV from 'jquery-lazy/plugins/jquery.lazy.av.min.js';
// import LazyPicture from 'jquery-lazy/plugins/jquery.lazy.picture.min.js';
import { TweenMax, TimelineMax, Power2 } from 'gsap/all';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';
import { disablePageScroll, enablePageScroll, clearQueueScrollLocks } from 'scroll-lock';

// uncomment plugins you want to use (from /js/__extras folder)

// import scrollMonitor from 'scrollmonitor';
// import sharer from 'sharer.js';
// import ClipboardJS from 'clipboard';
// import PhotoSwipe from 'photoswipe';
// // eslint-disable-next-line camelcase
// import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default';
// import datepicker from 'air-datepicker';
// import datepickerEn from 'air-datepicker/dist/js/i18n/datepicker.en.js';
// import autofillEvent from 'autofill-event';

// expose imports to window to use in app.js
// (jquery is exposed in expose-loader)
// window.jQuery = $;
// window.$ = $;
window.svg4everybody = svg4everybody;
window.picturefill = picturefill;
window.objectFitImages = objectFitImages;
window.viewportUnitsBuggyfill = viewportUnitsBuggyfill;
Swiper.use([Navigation, Pagination]);
window.Swiper = Swiper;
window.magnificPopup = magnificPopup;
window.AOS = AOS;
window.validate = validate;
window.mask = mask;
window.selectric = selectric;
window.Barba = Barba;
window.Lazy = Lazy;
window.ScrollToPlugin = ScrollToPlugin;
window.TweenMax = TweenMax;
// window.TimelineMax = TimelineMax;
window.debounce = debounce;
window.throttle = throttle;
window.disablePageScroll = disablePageScroll;
window.enablePageScroll = enablePageScroll;
window.clearQueueScrollLocks = clearQueueScrollLocks;

// window.scrollMonitor = scrollMonitor;
// window.sharer = sharer;
// window.ClipboardJS = ClipboardJS;
// window.PhotoSwipe = PhotoSwipe;
// // eslint-disable-next-line camelcase
// window.PhotoSwipeUI_Default = PhotoSwipeUI_Default;
// window.datepicker = datepicker;
// window.autofillEvent = autofillEvent;
