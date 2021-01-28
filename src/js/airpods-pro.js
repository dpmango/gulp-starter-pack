!(function() {
  function e(t, r, n) {
    function i(o, s) {
      if (!r[o]) {
        if (!t[o]) {
          var p = 'function' == typeof require && require;
          if (!s && p) return p(o, !0);
          if (a) return a(o, !0);
          var c = new Error("Cannot find module '" + o + "'");
          throw ((c.code = 'MODULE_NOT_FOUND'), c);
        }
        var u = (r[o] = { exports: {} });
        t[o][0].call(
          u.exports,
          function(e) {
            var r = t[o][1][e];
            return i(r ? r : e);
          },
          u,
          u.exports,
          e,
          t,
          r,
          n
        );
      }
      return r[o].exports;
    }
    for (var a = 'function' == typeof require && require, o = 0; o < n.length; o++) i(n[o]);
    return i;
  }
  return e;
})()(
  {
    1: [
      function(e, t, r) {
        'use strict';
        function n() {
          this._createElemnts(), this._bindEvents();
        }
        var i = n.prototype;
        (i._bindEvents = function() {
          this._onResize = this._resize.bind(this);
        }),
          (i._createElemnts = function() {
            this.span = document.createElement('span');
            var e = this.span.style;
            (e.visibility = 'hidden'),
              (e.position = 'absolute'),
              (e.top = '0'),
              (e.bottom = '0'),
              (e.zIndex = '-1'),
              (this.span.innerHTML = '&nbsp;'),
              (this.iframe = document.createElement('iframe'));
            var t = this.iframe.style;
            (t.position = 'absolute'),
              (t.top = '0'),
              (t.left = '0'),
              (t.width = '100%'),
              (t.height = '100%'),
              this.span.appendChild(this.iframe),
              document.body.appendChild(this.span);
          }),
          (i.detect = function(e) {
            (this.originalSize = e || 17),
              (this.currentSize = parseFloat(window.getComputedStyle(this.span)['font-size'])),
              this.currentSize > this.originalSize && this._onResize(),
              this.isDetecting ||
                (this.iframe.contentWindow.addEventListener('resize', this._onResize),
                (this.isDetecting = !0));
          }),
          (i._resize = function(e) {
            (this.currentSize = parseFloat(window.getComputedStyle(this.span)['font-size'])),
              this.originalSize < this.currentSize
                ? document.documentElement.classList.add('text-zoom')
                : document.documentElement.classList.remove('text-zoom'),
              window.dispatchEvent(new Event('resize'));
          }),
          (i.remove = function() {
            this.isDetecting &&
              (this.iframe.contentWindow.removeEventListener('resize', this._onResize),
              (this.isDetecting = !1));
          }),
          (i.destroy = function() {
            this.remove(),
              this.span &&
                this.span.parentElement &&
                this.span.parentElement.removeChild(this.span),
              (this.span = null),
              (this.iframe = null);
          }),
          (t.exports = new n());
      },
      {},
    ],
    2: [
      function(e, t, r) {
        'use strict';
        t.exports = { BreakpointsDelegate: e('./ac-breakpoints-delegate/BreakpointsDelegate') };
      },
      { './ac-breakpoints-delegate/BreakpointsDelegate': 3 },
    ],
    3: [
      function(e, t, r) {
        'use strict';
        function n(e) {
          (this._customEvent = new s(
            u,
            this._onBreakpointListenerAdded.bind(this),
            this._onBreakpointListenerRemoved.bind(this)
          )),
            this.setBreakpoints(l);
        }
        var i = e('@marcom/ac-shared-instance').SharedInstance,
          a = e('@marcom/ac-object'),
          o = e('@marcom/ac-window-delegate').WindowDelegate,
          s = e('@marcom/ac-window-delegate').WindowDelegateCustomEvent,
          p =
            (e('@marcom/ac-event-emitter').EventEmitter,
            'ac-breakpoints-delegate:BreakpointsDelegate'),
          c = '2.1.1',
          u = 'breakpoint',
          g = 'resize orientationchange',
          l = {
            large: { 'min-width': 1069, 'max-width': 1441, content: 980, oldie: !0 },
            xlarge: { 'min-width': 1442, content: 980 },
            medium: { 'min-width': 736, 'max-width': 1068, content: 692 },
            small: { 'min-width': 320, 'max-width': 735, content: 288, 'max-device-width': 768 },
          },
          h = {
            minWidth: 'min-width',
            maxWidth: 'max-width',
            maxDeviceWidth: 'max-device-width',
            content: 'content',
            oldIE: 'oldie',
          },
          f = n.prototype;
        (f.initialize = function() {
          (this._breakpoint = null),
            (this._lastBreakpoint = null),
            this._handleOldIE(),
            (this._breakpointOrder = this._setBreakpointOrder()),
            this._isOldIE || this._handleResize();
        }),
          (f.getCustomEvent = function() {
            return this._customEvent;
          }),
          (f.getBreakpoint = function() {
            return this._customEvent.active || this._handleResize(), this._breakpoint;
          }),
          (f.setBreakpoints = function(e) {
            (this.breakpoints = a.clone(e)), this.initialize();
          }),
          (f._handleResize = function() {
            var e,
              t,
              r,
              n,
              i = o.clientWidth(),
              a = this._breakpointOrder.length;
            for (
              t = 0;
              t < a &&
              ((r = this._breakpointOrder[t]), (n = this.breakpoints[r]), !(n._breakPosition > i));
              t++
            );
            return (
              t > 0 && (t -= 1),
              (e = this.breakpoints[this._breakpointOrder[t]]),
              this._breakpoint
                ? void (
                    e.name !== this._breakpoint.name &&
                    ((this._lastBreakpoint = this._breakpoint),
                    (this._breakpoint = e),
                    o.trigger(u, { incoming: this._breakpoint, outgoing: this._lastBreakpoint }))
                  )
                : void (this._breakpoint = e)
            );
          }),
          (f._setBreakpointOrder = function() {
            var e,
              t = 0,
              r = [],
              n = [],
              i = h.minWidth;
            for (e in this.breakpoints)
              this.breakpoints.hasOwnProperty(e) &&
                ((this.breakpoints[e].name = e), r.push(this.breakpoints[e][i]));
            return (
              r.sort(function(e, t) {
                return e - t;
              }),
              r.forEach(function(e) {
                var t;
                for (t in this.breakpoints)
                  this.breakpoints.hasOwnProperty(t) && this.breakpoints[t][i] === e && n.push(t);
              }, this),
              n.forEach(function(e, r) {
                (this.breakpoints[e]._breakPosition = t),
                  n[r + 1] && (t = this.breakpoints[n[r + 1]][i]);
              }, this),
              n
            );
          }),
          (f._handleOldIE = function() {
            var e = document.documentElement,
              t = h.oldIE;
            if (!(e.className.indexOf('no-' + t) > -1 || e.className.indexOf(t) === -1)) {
              (this._isOldIE = !0),
                this._replaceBreakpoints(function(e) {
                  return e[t] === !0;
                });
              var r;
              for (r in this.breakpoints)
                if (this.breakpoints.hasOwnProperty(r))
                  return void (this._breakpoint = this.breakpoints[r]);
            }
          }),
          (f._replaceBreakpoints = function(e) {
            var t,
              r,
              n = {};
            for (t in this.breakpoints)
              this.breakpoints.hasOwnProperty(t) &&
                ((r = this.breakpoints[t]), e(r) && (n[t] = a.clone(this.breakpoints[t])));
            this.breakpoints = n;
          }),
          (f._onBreakpointListenerAdded = function() {
            o.on(g, this._handleResize, this);
          }),
          (f._onBreakpointListenerRemoved = function() {
            o.off(g, this._handleResize, this);
          }),
          (t.exports = i.share(p, c, n));
      },
      {
        '@marcom/ac-event-emitter': 36,
        '@marcom/ac-object': 42,
        '@marcom/ac-shared-instance': 76,
        '@marcom/ac-window-delegate': 83,
      },
    ],
    4: [
      function(e, t, r) {
        'use strict';
        t.exports = { DOMEmitter: e('./ac-dom-emitter/DOMEmitter') };
      },
      { './ac-dom-emitter/DOMEmitter': 5 },
    ],
    5: [
      function(e, t, r) {
        'use strict';
        function n(e) {
          null !== e &&
            ((this.el = e),
            (this._bindings = {}),
            (this._delegateFuncs = {}),
            (this._eventEmitter = new o()));
        }
        var i,
          a =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function(e) {
                  return typeof e;
                }
              : function(e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                },
          o = e('ac-event-emitter').EventEmitter,
          s = e('./DOMEmitterEvent'),
          p = {
            addEventListener: e('@marcom/ac-dom-events/addEventListener'),
            removeEventListener: e('@marcom/ac-dom-events/removeEventListener'),
            dispatchEvent: e('@marcom/ac-dom-events/dispatchEvent'),
          },
          c = {
            querySelectorAll: e('@marcom/ac-dom-traversal/querySelectorAll'),
            matchesSelector: e('@marcom/ac-dom-traversal/matchesSelector'),
          },
          u = 'dom-emitter';
        (i = n.prototype),
          (i.on = function() {
            return (
              this._normalizeArgumentsAndCall(Array.prototype.slice.call(arguments, 0), this._on),
              this
            );
          }),
          (i.once = function() {
            return (
              this._normalizeArgumentsAndCall(Array.prototype.slice.call(arguments, 0), this._once),
              this
            );
          }),
          (i.off = function() {
            return (
              this._normalizeArgumentsAndCall(Array.prototype.slice.call(arguments, 0), this._off),
              this
            );
          }),
          (i.has = function(e, t, r, n) {
            var i, a;
            if (('string' == typeof t ? ((i = t), (a = r)) : ((a = t), (n = r)), i)) {
              var o = this._getDelegateFuncBindingIdx(e, i, a, n, !0);
              return o > -1;
            }
            return !(
              !this._eventEmitter || !this._eventEmitter.has.apply(this._eventEmitter, arguments)
            );
          }),
          (i.trigger = function(e, t, r, n) {
            (e = this._parseEventNames(e)), (e = this._cleanStringData(e));
            var i,
              a,
              o,
              s = e.length;
            for (
              'string' == typeof t ? ((i = this._cleanStringData(t)), (a = r)) : ((a = t), (n = r)),
                o = 0;
              o < s;
              o++
            )
              this._triggerDOMEvents(e[o], a, i);
            return this;
          }),
          (i.emitterTrigger = function(e, t, r) {
            if (!this._eventEmitter) return this;
            (e = this._parseEventNames(e)), (e = this._cleanStringData(e)), (t = new s(t, this));
            var n,
              i = e.length;
            for (n = 0; n < i; n++) this._eventEmitter.trigger(e[n], t, r);
            return this;
          }),
          (i.propagateTo = function(e, t) {
            return this._eventEmitter.propagateTo(e, t), this;
          }),
          (i.stopPropagatingTo = function(e) {
            return this._eventEmitter.stopPropagatingTo(e), this;
          }),
          (i.stopImmediatePropagation = function() {
            return this._eventEmitter.stopImmediatePropagation(), this;
          }),
          (i.destroy = function() {
            this._triggerInternalEvent('willdestroy'), this.off();
            var e;
            for (e in this) this.hasOwnProperty(e) && (this[e] = null);
          }),
          (i._parseEventNames = function(e) {
            return e ? e.split(' ') : [e];
          }),
          (i._onListenerEvent = function(e, t) {
            var r = new s(t, this);
            this._eventEmitter.trigger(e, r, !1);
          }),
          (i._setListener = function(e) {
            (this._bindings[e] = this._onListenerEvent.bind(this, e)),
              p.addEventListener(this.el, e, this._bindings[e]);
          }),
          (i._removeListener = function(e) {
            p.removeEventListener(this.el, e, this._bindings[e]), (this._bindings[e] = null);
          }),
          (i._triggerInternalEvent = function(e, t) {
            this.emitterTrigger(u + ':' + e, t);
          }),
          (i._normalizeArgumentsAndCall = function(e, t) {
            var r = {};
            if (0 === e.length) return void t.call(this, r);
            if ('string' == typeof e[0] || null === e[0])
              return (
                (e = this._cleanStringData(e)),
                (r.events = e[0]),
                'string' == typeof e[1]
                  ? ((r.delegateQuery = e[1]), (r.callback = e[2]), (r.context = e[3]))
                  : ((r.callback = e[1]), (r.context = e[2])),
                void t.call(this, r)
              );
            var n,
              i,
              a = ':',
              o = e[0];
            for (n in o)
              o.hasOwnProperty(n) &&
                ((r = {}),
                (i = this._cleanStringData(n.split(a))),
                (r.events = i[0]),
                (r.delegateQuery = i[1]),
                (r.callback = o[n]),
                (r.context = e[1]),
                t.call(this, r));
          }),
          (i._registerDelegateFunc = function(e, t, r, n, i) {
            var a = this._delegateFunc.bind(this, e, t, r, i);
            return (
              (this._delegateFuncs[t] = this._delegateFuncs[t] || {}),
              (this._delegateFuncs[t][e] = this._delegateFuncs[t][e] || []),
              this._delegateFuncs[t][e].push({ func: n, context: i, delegateFunc: a }),
              a
            );
          }),
          (i._cleanStringData = function(e) {
            var t = !1;
            'string' == typeof e && ((e = [e]), (t = !0));
            var r,
              n,
              i,
              a = [],
              o = e.length;
            for (r = 0; r < o; r++) {
              if (((n = e[r]), 'string' == typeof n)) {
                if ('' === n || ' ' === n) continue;
                for (i = n.length; ' ' === n[0]; ) (n = n.slice(1, i)), i--;
                for (; ' ' === n[i - 1]; ) (n = n.slice(0, i - 1)), i--;
              }
              a.push(n);
            }
            return t ? a[0] : a;
          }),
          (i._unregisterDelegateFunc = function(e, t, r, n) {
            if (this._delegateFuncs[t] && this._delegateFuncs[t][e]) {
              var i,
                a = this._getDelegateFuncBindingIdx(e, t, r, n);
              return (
                a > -1 &&
                  ((i = this._delegateFuncs[t][e][a].delegateFunc),
                  this._delegateFuncs[t][e].splice(a, 1),
                  0 === this._delegateFuncs[t][e].length && (this._delegateFuncs[t][e] = null)),
                i
              );
            }
          }),
          (i._unregisterDelegateFuncs = function(e, t) {
            if (this._delegateFuncs[t] && (null === e || this._delegateFuncs[t][e]))
              if (null !== e) this._unbindDelegateFunc(e, t);
              else {
                var r;
                for (r in this._delegateFuncs[t])
                  this._delegateFuncs[t].hasOwnProperty(r) && this._unbindDelegateFunc(r, t);
              }
          }),
          (i._unbindDelegateFunc = function(e, t) {
            for (var r, n, i = 0; this._delegateFuncs[t][e] && this._delegateFuncs[t][e][i]; )
              (r = this._delegateFuncs[t][e][i]),
                (n = this._delegateFuncs[t][e][i].length),
                this._off({ events: e, delegateQuery: t, callback: r.func, context: r.context }),
                this._delegateFuncs[t][e] && n === this._delegateFuncs[t][e].length && i++;
            r = n = null;
          }),
          (i._unregisterDelegateFuncsByEvent = function(e) {
            var t;
            for (t in this._delegateFuncs)
              this._delegateFuncs.hasOwnProperty(t) && this._unregisterDelegateFuncs(e, t);
          }),
          (i._delegateFunc = function(e, t, r, n, i) {
            if (this._targetHasDelegateAncestor(i.target, t)) {
              var o = Array.prototype.slice.call(arguments, 0),
                s = o.slice(4, o.length);
              (n = n || window), 'object' === a(i.detail) && (s[0] = i.detail), r.apply(n, s);
            }
          }),
          (i._targetHasDelegateAncestor = function(e, t) {
            for (var r = e; r && r !== this.el && r !== document.documentElement; ) {
              if (c.matchesSelector(r, t)) return !0;
              r = r.parentNode;
            }
            return !1;
          }),
          (i._on = function(e) {
            var t = e.events,
              r = e.callback,
              n = e.delegateQuery,
              i = e.context,
              a = e.unboundCallback || r;
            (t = this._parseEventNames(t)),
              t.forEach(
                function(e, t, r, n, i) {
                  this.has(i) || this._setListener(i),
                    'string' == typeof n && (e = this._registerDelegateFunc(i, n, e, t, r)),
                    this._triggerInternalEvent('willon', {
                      evt: i,
                      callback: e,
                      context: r,
                      delegateQuery: n,
                    }),
                    this._eventEmitter.on(i, e, r),
                    this._triggerInternalEvent('didon', {
                      evt: i,
                      callback: e,
                      context: r,
                      delegateQuery: n,
                    });
                }.bind(this, r, a, i, n)
              ),
              (t = r = a = n = i = null);
          }),
          (i._off = function(e) {
            var t = e.events,
              r = e.callback,
              n = e.delegateQuery,
              i = e.context,
              a = e.unboundCallback || r;
            if ('undefined' != typeof t)
              (t = this._parseEventNames(t)),
                t.forEach(
                  function(e, t, r, n, i) {
                    if (
                      'string' != typeof n ||
                      'function' != typeof t ||
                      (e = this._unregisterDelegateFunc(i, n, t, r))
                    )
                      return 'string' == typeof n && 'undefined' == typeof e
                        ? void this._unregisterDelegateFuncs(i, n)
                        : void (
                            ('string' == typeof i &&
                              'undefined' == typeof e &&
                              (this._unregisterDelegateFuncsByEvent(i), 'string' == typeof n)) ||
                            (this._triggerInternalEvent('willoff', {
                              evt: i,
                              callback: e,
                              context: r,
                              delegateQuery: n,
                            }),
                            this._eventEmitter.off(i, e, r),
                            this._triggerInternalEvent('didoff', {
                              evt: i,
                              callback: e,
                              context: r,
                              delegateQuery: n,
                            }),
                            this.has(i) || this._removeListener(i))
                          );
                  }.bind(this, r, a, i, n)
                ),
                (t = r = a = n = i = null);
            else {
              this._eventEmitter.off();
              var o;
              for (o in this._bindings) this._bindings.hasOwnProperty(o) && this._removeListener(o);
              for (o in this._delegateFuncs)
                this._delegateFuncs.hasOwnProperty(o) && (this._delegateFuncs[o] = null);
            }
          }),
          (i._once = function(e) {
            var t = e.events,
              r = e.callback,
              n = e.delegateQuery,
              i = e.context;
            (t = this._parseEventNames(t)),
              t.forEach(
                function(e, t, r, n) {
                  return 'string' == typeof r
                    ? this._handleDelegateOnce(n, e, t, r)
                    : (this.has(n) || this._setListener(n),
                      this._triggerInternalEvent('willonce', {
                        evt: n,
                        callback: e,
                        context: t,
                        delegateQuery: r,
                      }),
                      this._eventEmitter.once.call(this, n, e, t),
                      void this._triggerInternalEvent('didonce', {
                        evt: n,
                        callback: e,
                        context: t,
                        delegateQuery: r,
                      }));
                }.bind(this, r, i, n)
              ),
              (t = r = n = i = null);
          }),
          (i._handleDelegateOnce = function(e, t, r, n) {
            return (
              this._triggerInternalEvent('willonce', {
                evt: e,
                callback: t,
                context: r,
                delegateQuery: n,
              }),
              this._on({
                events: e,
                context: r,
                delegateQuery: n,
                callback: this._getDelegateOnceCallback.bind(this, e, t, r, n),
                unboundCallback: t,
              }),
              this._triggerInternalEvent('didonce', {
                evt: e,
                callback: t,
                context: r,
                delegateQuery: n,
              }),
              this
            );
          }),
          (i._getDelegateOnceCallback = function(e, t, r, n) {
            var i = Array.prototype.slice.call(arguments, 0),
              a = i.slice(4, i.length);
            t.apply(r, a), this._off({ events: e, delegateQuery: n, callback: t, context: r });
          }),
          (i._getDelegateFuncBindingIdx = function(e, t, r, n, i) {
            var a = -1;
            if (this._delegateFuncs[t] && this._delegateFuncs[t][e]) {
              var o,
                s,
                p = this._delegateFuncs[t][e].length;
              for (o = 0; o < p; o++)
                if (
                  ((s = this._delegateFuncs[t][e][o]),
                  i && 'undefined' == typeof r && (r = s.func),
                  s.func === r && s.context === n)
                ) {
                  a = o;
                  break;
                }
            }
            return a;
          }),
          (i._triggerDOMEvents = function(e, t, r) {
            var n = [this.el];
            r && (n = c.querySelectorAll(r, this.el));
            var i,
              a = n.length;
            for (i = 0; i < a; i++)
              p.dispatchEvent(n[i], e, { bubbles: !0, cancelable: !0, detail: t });
          }),
          (t.exports = n);
      },
      {
        './DOMEmitterEvent': 6,
        '@marcom/ac-dom-events/addEventListener': 7,
        '@marcom/ac-dom-events/dispatchEvent': 8,
        '@marcom/ac-dom-events/removeEventListener': 10,
        '@marcom/ac-dom-traversal/matchesSelector': 30,
        '@marcom/ac-dom-traversal/querySelectorAll': 31,
        'ac-event-emitter': 134,
      },
    ],
    6: [
      function(e, t, r) {
        'use strict';
        var n,
          i =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function(e) {
                  return typeof e;
                }
              : function(e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                },
          a = {
            preventDefault: e('@marcom/ac-dom-events/preventDefault'),
            stopPropagation: e('@marcom/ac-dom-events/stopPropagation'),
            target: e('@marcom/ac-dom-events/target'),
          },
          o = function(e, t) {
            (this._domEmitter = t),
              (this.originalEvent = e || {}),
              (this._originalTarget = a.target(this.originalEvent)),
              (this.target = this._originalTarget || this._domEmitter.el),
              (this.currentTarget = this._domEmitter.el),
              (this.timeStamp = this.originalEvent.timeStamp || Date.now()),
              this._isDOMEvent(this.originalEvent)
                ? 'object' === i(this.originalEvent.detail) &&
                  (this.data = this.originalEvent.detail)
                : e && ((this.data = this.originalEvent), (this.originalEvent = {}));
          };
        (n = o.prototype),
          (n.preventDefault = function() {
            a.preventDefault(this.originalEvent);
          }),
          (n.stopPropagation = function() {
            a.stopPropagation(this.originalEvent);
          }),
          (n.stopImmediatePropagation = function() {
            this.originalEvent.stopImmediatePropagation &&
              this.originalEvent.stopImmediatePropagation(),
              this._domEmitter.stopImmediatePropagation();
          }),
          (n._isDOMEvent = function(e) {
            return !!(
              this._originalTarget ||
              ('undefined' !== document.createEvent &&
                'undefined' != typeof CustomEvent &&
                e instanceof CustomEvent)
            );
          }),
          (t.exports = o);
      },
      {
        '@marcom/ac-dom-events/preventDefault': 9,
        '@marcom/ac-dom-events/stopPropagation': 12,
        '@marcom/ac-dom-events/target': 13,
      },
    ],
    7: [
      function(e, t, r) {
        'use strict';
        var n = e('./utils/addEventListener'),
          i = e('./shared/getEventType');
        t.exports = function(e, t, r, a) {
          return (t = i(e, t)), n(e, t, r, a);
        };
      },
      { './shared/getEventType': 11, './utils/addEventListener': 14 },
    ],
    8: [
      function(e, t, r) {
        'use strict';
        var n = e('./utils/dispatchEvent'),
          i = e('./shared/getEventType');
        t.exports = function(e, t, r) {
          return (t = i(e, t)), n(e, t, r);
        };
      },
      { './shared/getEventType': 11, './utils/dispatchEvent': 15 },
    ],
    9: [
      function(e, t, r) {
        'use strict';
        t.exports = function(e) {
          (e = e || window.event), e.preventDefault ? e.preventDefault() : (e.returnValue = !1);
        };
      },
      {},
    ],
    10: [
      function(e, t, r) {
        'use strict';
        var n = e('./utils/removeEventListener'),
          i = e('./shared/getEventType');
        t.exports = function(e, t, r, a) {
          return (t = i(e, t)), n(e, t, r, a);
        };
      },
      { './shared/getEventType': 11, './utils/removeEventListener': 16 },
    ],
    11: [
      function(e, t, r) {
        'use strict';
        var n = e('@marcom/ac-prefixer/getEventType');
        t.exports = function(e, t) {
          var r, i;
          return (
            (r = 'tagName' in e ? e.tagName : e === window ? 'window' : 'document'),
            (i = n(t, r)),
            i ? i : t
          );
        };
      },
      { '@marcom/ac-prefixer/getEventType': 52 },
    ],
    12: [
      function(e, t, r) {
        'use strict';
        t.exports = function(e) {
          (e = e || window.event), e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = !0);
        };
      },
      {},
    ],
    13: [
      function(e, t, r) {
        'use strict';
        t.exports = function(e) {
          return (e = e || window.event), 'undefined' != typeof e.target ? e.target : e.srcElement;
        };
      },
      {},
    ],
    14: [
      function(e, t, r) {
        'use strict';
        t.exports = function(e, t, r, n) {
          return e.addEventListener ? e.addEventListener(t, r, !!n) : e.attachEvent('on' + t, r), e;
        };
      },
      {},
    ],
    15: [
      function(e, t, r) {
        'use strict';
        e('@marcom/ac-polyfills/CustomEvent'),
          (t.exports = function(e, t, r) {
            var n;
            return (
              e.dispatchEvent
                ? ((n = r ? new CustomEvent(t, r) : new CustomEvent(t)), e.dispatchEvent(n))
                : ((n = document.createEventObject()),
                  r && 'detail' in r && (n.detail = r.detail),
                  e.fireEvent('on' + t, n)),
              e
            );
          });
      },
      { '@marcom/ac-polyfills/CustomEvent': void 0 },
    ],
    16: [
      function(e, t, r) {
        'use strict';
        t.exports = function(e, t, r, n) {
          return (
            e.removeEventListener ? e.removeEventListener(t, r, !!n) : e.detachEvent('on' + t, r), e
          );
        };
      },
      {},
    ],
    17: [
      function(e, t, r) {
        'use strict';
        t.exports = 8;
      },
      {},
    ],
    18: [
      function(e, t, r) {
        'use strict';
        t.exports = 11;
      },
      {},
    ],
    19: [
      function(e, t, r) {
        'use strict';
        t.exports = 9;
      },
      {},
    ],
    20: [
      function(e, t, r) {
        'use strict';
        t.exports = 1;
      },
      {},
    ],
    21: [
      function(e, t, r) {
        'use strict';
        t.exports = 3;
      },
      {},
    ],
    22: [
      function(e, t, r) {
        'use strict';
        var n = e('../isNode');
        t.exports = function(e, t) {
          return !!n(e) && ('number' == typeof t ? e.nodeType === t : t.indexOf(e.nodeType) !== -1);
        };
      },
      { '../isNode': 26 },
    ],
    23: [
      function(e, t, r) {
        'use strict';
        var n = e('./isNodeType'),
          i = e('../COMMENT_NODE'),
          a = e('../DOCUMENT_FRAGMENT_NODE'),
          o = e('../ELEMENT_NODE'),
          s = e('../TEXT_NODE'),
          p = [o, s, i, a],
          c = ' must be an Element, TextNode, Comment, or Document Fragment',
          u = [o, s, i],
          g = ' must be an Element, TextNode, or Comment',
          l = [o, a],
          h = ' must be an Element, or Document Fragment',
          f = ' must have a parentNode';
        t.exports = {
          parentNode: function(e, t, r, i) {
            if (((i = i || 'target'), (e || t) && !n(e, l))) throw new TypeError(r + ': ' + i + h);
          },
          childNode: function(e, t, r, i) {
            if (((i = i || 'target'), (e || t) && !n(e, u))) throw new TypeError(r + ': ' + i + g);
          },
          insertNode: function(e, t, r, i) {
            if (((i = i || 'node'), (e || t) && !n(e, p))) throw new TypeError(r + ': ' + i + c);
          },
          hasParentNode: function(e, t, r) {
            if (((r = r || 'target'), !e.parentNode)) throw new TypeError(t + ': ' + r + f);
          },
        };
      },
      {
        '../COMMENT_NODE': 17,
        '../DOCUMENT_FRAGMENT_NODE': 18,
        '../ELEMENT_NODE': 20,
        '../TEXT_NODE': 21,
        './isNodeType': 22,
      },
    ],
    24: [
      function(e, t, r) {
        'use strict';
        var n = e('./internal/isNodeType'),
          i = e('./DOCUMENT_FRAGMENT_NODE');
        t.exports = function(e) {
          return n(e, i);
        };
      },
      { './DOCUMENT_FRAGMENT_NODE': 18, './internal/isNodeType': 22 },
    ],
    25: [
      function(e, t, r) {
        'use strict';
        var n = e('./internal/isNodeType'),
          i = e('./ELEMENT_NODE');
        t.exports = function(e) {
          return n(e, i);
        };
      },
      { './ELEMENT_NODE': 20, './internal/isNodeType': 22 },
    ],
    26: [
      function(e, t, r) {
        'use strict';
        t.exports = function(e) {
          return !(!e || !e.nodeType);
        };
      },
      {},
    ],
    27: [
      function(e, t, r) {
        'use strict';
        var n = e('./internal/validate');
        t.exports = function(e) {
          return n.childNode(e, !0, 'remove'), e.parentNode ? e.parentNode.removeChild(e) : e;
        };
      },
      { './internal/validate': 23 },
    ],
    28: [
      function(e, t, r) {
        'use strict';
        t.exports = window.Element
          ? (function(e) {
              return (
                e.matches ||
                e.matchesSelector ||
                e.webkitMatchesSelector ||
                e.mozMatchesSelector ||
                e.msMatchesSelector ||
                e.oMatchesSelector
              );
            })(Element.prototype)
          : null;
      },
      {},
    ],
    29: [
      function(e, t, r) {
        'use strict';
        e('@marcom/ac-polyfills/Array/prototype.indexOf');
        var n = e('@marcom/ac-dom-nodes/isNode'),
          i = e('@marcom/ac-dom-nodes/COMMENT_NODE'),
          a = e('@marcom/ac-dom-nodes/DOCUMENT_FRAGMENT_NODE'),
          o = e('@marcom/ac-dom-nodes/DOCUMENT_NODE'),
          s = e('@marcom/ac-dom-nodes/ELEMENT_NODE'),
          p = e('@marcom/ac-dom-nodes/TEXT_NODE'),
          c = function(e, t) {
            return (
              !!n(e) && ('number' == typeof t ? e.nodeType === t : t.indexOf(e.nodeType) !== -1)
            );
          },
          u = [s, o, a],
          g = ' must be an Element, Document, or Document Fragment',
          l = [s, p, i],
          h = ' must be an Element, TextNode, or Comment',
          f = ' must be a string';
        t.exports = {
          parentNode: function(e, t, r, n) {
            if (((n = n || 'node'), (e || t) && !c(e, u))) throw new TypeError(r + ': ' + n + g);
          },
          childNode: function(e, t, r, n) {
            if (((n = n || 'node'), (e || t) && !c(e, l))) throw new TypeError(r + ': ' + n + h);
          },
          selector: function(e, t, r, n) {
            if (((n = n || 'selector'), (e || t) && 'string' != typeof e))
              throw new TypeError(r + ': ' + n + f);
          },
        };
      },
      {
        '@marcom/ac-dom-nodes/COMMENT_NODE': 17,
        '@marcom/ac-dom-nodes/DOCUMENT_FRAGMENT_NODE': 18,
        '@marcom/ac-dom-nodes/DOCUMENT_NODE': 19,
        '@marcom/ac-dom-nodes/ELEMENT_NODE': 20,
        '@marcom/ac-dom-nodes/TEXT_NODE': 21,
        '@marcom/ac-dom-nodes/isNode': 26,
        '@marcom/ac-polyfills/Array/prototype.indexOf': void 0,
      },
    ],
    30: [
      function(e, t, r) {
        'use strict';
        var n = e('@marcom/ac-dom-nodes/isElement'),
          i = e('./internal/validate'),
          a = e('./internal/nativeMatches'),
          o = e('./shims/matchesSelector');
        t.exports = function(e, t) {
          return i.selector(t, !0, 'matchesSelector'), !!n(e) && (a ? a.call(e, t) : o(e, t));
        };
      },
      {
        './internal/nativeMatches': 28,
        './internal/validate': 29,
        './shims/matchesSelector': 32,
        '@marcom/ac-dom-nodes/isElement': 25,
      },
    ],
    31: [
      function(e, t, r) {
        'use strict';
        e('@marcom/ac-polyfills/Array/prototype.slice');
        var n = e('./internal/validate'),
          i = e('./shims/querySelectorAll'),
          a = 'querySelectorAll' in document;
        t.exports = function(e, t) {
          return (
            (t = t || document),
            n.parentNode(t, !0, 'querySelectorAll', 'context'),
            n.selector(e, !0, 'querySelectorAll'),
            a ? Array.prototype.slice.call(t.querySelectorAll(e)) : i(e, t)
          );
        };
      },
      {
        './internal/validate': 29,
        './shims/querySelectorAll': 33,
        '@marcom/ac-polyfills/Array/prototype.slice': void 0,
      },
    ],
    32: [
      function(e, t, r) {
        'use strict';
        var n = e('../querySelectorAll');
        t.exports = function(e, t) {
          var r,
            i = e.parentNode || document,
            a = n(t, i);
          for (r = 0; r < a.length; r++) if (a[r] === e) return !0;
          return !1;
        };
      },
      { '../querySelectorAll': 31 },
    ],
    33: [
      function(e, t, r) {
        'use strict';
        e('@marcom/ac-polyfills/Array/prototype.indexOf');
        var n = e('@marcom/ac-dom-nodes/isElement'),
          i = e('@marcom/ac-dom-nodes/isDocumentFragment'),
          a = e('@marcom/ac-dom-nodes/remove'),
          o = '_ac_qsa_',
          s = function(e, t) {
            var r;
            if (t === document) return !0;
            for (r = e; (r = r.parentNode) && n(r); ) if (r === t) return !0;
            return !1;
          },
          p = function(e) {
            'recalc' in e ? e.recalc(!1) : document.recalc(!1), window.scrollBy(0, 0);
          };
        t.exports = function(e, t) {
          var r,
            n = document.createElement('style'),
            c = o + (Math.random() + '').slice(-6),
            u = [];
          for (
            t = t || document,
              document[c] = [],
              i(t) ? t.appendChild(n) : document.documentElement.firstChild.appendChild(n),
              n.styleSheet.cssText =
                '*{display:recalc;}' +
                e +
                '{ac-qsa:expression(document["' +
                c +
                '"] && document["' +
                c +
                '"].push(this));}',
              p(t);
            document[c].length;

          )
            (r = document[c].shift()),
              r.style.removeAttribute('ac-qsa'),
              u.indexOf(r) === -1 && s(r, t) && u.push(r);
          return (document[c] = null), a(n), p(t), u;
        };
      },
      {
        '@marcom/ac-dom-nodes/isDocumentFragment': 24,
        '@marcom/ac-dom-nodes/isElement': 25,
        '@marcom/ac-dom-nodes/remove': 27,
        '@marcom/ac-polyfills/Array/prototype.indexOf': void 0,
      },
    ],
    34: [
      function(e, t, r) {
        'use strict';
        t.exports = { EventEmitterMicro: e('./ac-event-emitter-micro/EventEmitterMicro') };
      },
      { './ac-event-emitter-micro/EventEmitterMicro': 35 },
    ],
    35: [
      function(e, t, r) {
        'use strict';
        function n() {
          this._events = {};
        }
        var i = n.prototype;
        (i.on = function(e, t) {
          (this._events[e] = this._events[e] || []), this._events[e].unshift(t);
        }),
          (i.once = function(e, t) {
            function r(i) {
              n.off(e, r), void 0 !== i ? t(i) : t();
            }
            var n = this;
            this.on(e, r);
          }),
          (i.off = function(e, t) {
            if (this.has(e)) {
              if (1 === arguments.length)
                return (this._events[e] = null), void delete this._events[e];
              var r = this._events[e].indexOf(t);
              r !== -1 && this._events[e].splice(r, 1);
            }
          }),
          (i.trigger = function(e, t) {
            if (this.has(e))
              for (var r = this._events[e].length - 1; r >= 0; r--)
                void 0 !== t ? this._events[e][r](t) : this._events[e][r]();
          }),
          (i.has = function(e) {
            return e in this._events != !1 && 0 !== this._events[e].length;
          }),
          (i.destroy = function() {
            for (var e in this._events) this._events[e] = null;
            this._events = null;
          }),
          (t.exports = n);
      },
      {},
    ],
    36: [
      function(e, t, r) {
        'use strict';
        t.exports.EventEmitter = e('./ac-event-emitter/EventEmitter');
      },
      { './ac-event-emitter/EventEmitter': 37 },
    ],
    37: [
      function(e, t, r) {
        'use strict';
        var n =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function(e) {
                  return typeof e;
                }
              : function(e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                },
          i = 'EventEmitter:propagation',
          a = function(e) {
            e && (this.context = e);
          },
          o = a.prototype,
          s = function() {
            return (
              this.hasOwnProperty('_events') || 'object' === n(this._events) || (this._events = {}),
              this._events
            );
          },
          p = function(e, t) {
            var r = e[0],
              i = e[1],
              a = e[2];
            if (
              ('string' != typeof r &&
                'object' !== ('undefined' == typeof r ? 'undefined' : n(r))) ||
              null === r ||
              Array.isArray(r)
            )
              throw new TypeError('Expecting event name to be a string or object.');
            if ('string' == typeof r && !i)
              throw new Error('Expecting a callback function to be provided.');
            if (i && 'function' != typeof i) {
              if (
                'object' !== ('undefined' == typeof r ? 'undefined' : n(r)) ||
                'object' !== ('undefined' == typeof i ? 'undefined' : n(i))
              )
                throw new TypeError('Expecting callback to be a function.');
              a = i;
            }
            if ('object' === ('undefined' == typeof r ? 'undefined' : n(r)))
              for (var o in r) t.call(this, o, r[o], a);
            'string' == typeof r &&
              ((r = r.split(' ')),
              r.forEach(function(e) {
                t.call(this, e, i, a);
              }, this));
          },
          c = function(e, t) {
            var r, n, i;
            if (((r = s.call(this)[e]), r && 0 !== r.length))
              for (
                r = r.slice(), this._stoppedImmediatePropagation = !1, n = 0, i = r.length;
                n < i && (!this._stoppedImmediatePropagation && !t(r[n], n));
                n++
              );
          },
          u = function(e, t, r) {
            var n = -1;
            c.call(this, t, function(e, t) {
              if (e.callback === r) return (n = t), !0;
            }),
              n !== -1 && e[t].splice(n, 1);
          };
        (o.on = function() {
          var e = s.call(this);
          return (
            p.call(this, arguments, function(t, r, n) {
              (e[t] = e[t] || (e[t] = [])), e[t].push({ callback: r, context: n });
            }),
            this
          );
        }),
          (o.once = function() {
            return (
              p.call(this, arguments, function(e, t, r) {
                var n = function i(n) {
                  t.call(r || this, n), this.off(e, i);
                };
                this.on(e, n, this);
              }),
              this
            );
          }),
          (o.off = function(e, t) {
            var r = s.call(this);
            if (0 === arguments.length) this._events = {};
            else if (
              !e ||
              ('string' != typeof e &&
                'object' !== ('undefined' == typeof e ? 'undefined' : n(e))) ||
              Array.isArray(e)
            )
              throw new TypeError('Expecting event name to be a string or object.');
            if ('object' === ('undefined' == typeof e ? 'undefined' : n(e)))
              for (var i in e) u.call(this, r, i, e[i]);
            if ('string' == typeof e) {
              var a = e.split(' ');
              1 === a.length
                ? t
                  ? u.call(this, r, e, t)
                  : (r[e] = [])
                : a.forEach(function(e) {
                    r[e] = [];
                  });
            }
            return this;
          }),
          (o.trigger = function(e, t, r) {
            if (!e) throw new Error('trigger method requires an event name');
            if ('string' != typeof e) throw new TypeError('Expecting event names to be a string.');
            if (r && 'boolean' != typeof r)
              throw new TypeError('Expecting doNotPropagate to be a boolean.');
            return (
              (e = e.split(' ')),
              e.forEach(function(e) {
                c.call(
                  this,
                  e,
                  function(e) {
                    e.callback.call(e.context || this.context || this, t);
                  }.bind(this)
                ),
                  r ||
                    c.call(this, i, function(r) {
                      var n = e;
                      r.prefix && (n = r.prefix + n), r.emitter.trigger(n, t);
                    });
              }, this),
              this
            );
          }),
          (o.propagateTo = function(e, t) {
            var r = s.call(this);
            r[i] || (this._events[i] = []), r[i].push({ emitter: e, prefix: t });
          }),
          (o.stopPropagatingTo = function(e) {
            var t = s.call(this);
            if (!e) return void (t[i] = []);
            var r,
              n = t[i],
              a = n.length;
            for (r = 0; r < a; r++)
              if (n[r].emitter === e) {
                n.splice(r, 1);
                break;
              }
          }),
          (o.stopImmediatePropagation = function() {
            this._stoppedImmediatePropagation = !0;
          }),
          (o.has = function(e, t, r) {
            var n = s.call(this),
              i = n[e];
            if (0 === arguments.length) return Object.keys(n);
            if (!i) return !1;
            if (!t) return i.length > 0;
            for (var a = 0, o = i.length; a < o; a++) {
              var p = i[a];
              if (r && t && p.context === r && p.callback === t) return !0;
              if (t && !r && p.callback === t) return !0;
            }
            return !1;
          }),
          (t.exports = a);
      },
      {},
    ],
    38: [
      function(e, t, r) {
        'use strict';
        function n(e) {
          var t = e.length;
          if (t % 4 > 0) throw new Error('Invalid string. Length must be a multiple of 4');
          return '=' === e[t - 2] ? 2 : '=' === e[t - 1] ? 1 : 0;
        }
        function i(e) {
          return (3 * e.length) / 4 - n(e);
        }
        function a(e) {
          var t,
            r,
            i,
            a,
            o,
            s = e.length;
          (a = n(e)), (o = new g((3 * s) / 4 - a)), (r = a > 0 ? s - 4 : s);
          var p = 0;
          for (t = 0; t < r; t += 4)
            (i =
              (u[e.charCodeAt(t)] << 18) |
              (u[e.charCodeAt(t + 1)] << 12) |
              (u[e.charCodeAt(t + 2)] << 6) |
              u[e.charCodeAt(t + 3)]),
              (o[p++] = (i >> 16) & 255),
              (o[p++] = (i >> 8) & 255),
              (o[p++] = 255 & i);
          return (
            2 === a
              ? ((i = (u[e.charCodeAt(t)] << 2) | (u[e.charCodeAt(t + 1)] >> 4)),
                (o[p++] = 255 & i))
              : 1 === a &&
                ((i =
                  (u[e.charCodeAt(t)] << 10) |
                  (u[e.charCodeAt(t + 1)] << 4) |
                  (u[e.charCodeAt(t + 2)] >> 2)),
                (o[p++] = (i >> 8) & 255),
                (o[p++] = 255 & i)),
            o
          );
        }
        function o(e) {
          return c[(e >> 18) & 63] + c[(e >> 12) & 63] + c[(e >> 6) & 63] + c[63 & e];
        }
        function s(e, t, r) {
          for (var n, i = [], a = t; a < r; a += 3)
            (n = ((e[a] << 16) & 16711680) + ((e[a + 1] << 8) & 65280) + (255 & e[a + 2])),
              i.push(o(n));
          return i.join('');
        }
        function p(e) {
          for (
            var t, r = e.length, n = r % 3, i = '', a = [], o = 16383, p = 0, u = r - n;
            p < u;
            p += o
          )
            a.push(s(e, p, p + o > u ? u : p + o));
          return (
            1 === n
              ? ((t = e[r - 1]), (i += c[t >> 2]), (i += c[(t << 4) & 63]), (i += '=='))
              : 2 === n &&
                ((t = (e[r - 2] << 8) + e[r - 1]),
                (i += c[t >> 10]),
                (i += c[(t >> 4) & 63]),
                (i += c[(t << 2) & 63]),
                (i += '=')),
            a.push(i),
            a.join('')
          );
        }
        (r.byteLength = i), (r.toByteArray = a), (r.fromByteArray = p);
        for (
          var c = [],
            u = [],
            g = 'undefined' != typeof Uint8Array ? Uint8Array : Array,
            l = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
            h = 0,
            f = l.length;
          h < f;
          ++h
        )
          (c[h] = l[h]), (u[l.charCodeAt(h)] = h);
        (u['-'.charCodeAt(0)] = 62), (u['_'.charCodeAt(0)] = 63);
      },
      {},
    ],
    39: [
      function(e, t, r) {
        (function(t) {
          'use strict';
          function n() {
            try {
              var e = new Uint8Array(1);
              return (
                (e.__proto__ = {
                  __proto__: Uint8Array.prototype,
                  foo: function() {
                    return 42;
                  },
                }),
                42 === e.foo() &&
                  'function' == typeof e.subarray &&
                  0 === e.subarray(1, 1).byteLength
              );
            } catch (t) {
              return !1;
            }
          }
          function i() {
            return o.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
          }
          function a(e, t) {
            if (i() < t) throw new RangeError('Invalid typed array length');
            return (
              o.TYPED_ARRAY_SUPPORT
                ? ((e = new Uint8Array(t)), (e.__proto__ = o.prototype))
                : (null === e && (e = new o(t)), (e.length = t)),
              e
            );
          }
          function o(e, t, r) {
            if (!(o.TYPED_ARRAY_SUPPORT || this instanceof o)) return new o(e, t, r);
            if ('number' == typeof e) {
              if ('string' == typeof t)
                throw new Error(
                  'If encoding is specified then the first argument must be a string'
                );
              return u(this, e);
            }
            return s(this, e, t, r);
          }
          function s(e, t, r, n) {
            if ('number' == typeof t) throw new TypeError('"value" argument must not be a number');
            return 'undefined' != typeof ArrayBuffer && t instanceof ArrayBuffer
              ? h(e, t, r, n)
              : 'string' == typeof t
              ? g(e, t, r)
              : f(e, t);
          }
          function p(e) {
            if ('number' != typeof e) throw new TypeError('"size" argument must be a number');
            if (e < 0) throw new RangeError('"size" argument must not be negative');
          }
          function c(e, t, r, n) {
            return (
              p(t),
              t <= 0
                ? a(e, t)
                : void 0 !== r
                ? 'string' == typeof n
                  ? a(e, t).fill(r, n)
                  : a(e, t).fill(r)
                : a(e, t)
            );
          }
          function u(e, t) {
            if ((p(t), (e = a(e, t < 0 ? 0 : 0 | j(t))), !o.TYPED_ARRAY_SUPPORT))
              for (var r = 0; r < t; ++r) e[r] = 0;
            return e;
          }
          function g(e, t, r) {
            if ((('string' == typeof r && '' !== r) || (r = 'utf8'), !o.isEncoding(r)))
              throw new TypeError('"encoding" must be a valid string encoding');
            var n = 0 | m(t, r);
            e = a(e, n);
            var i = e.write(t, r);
            return i !== n && (e = e.slice(0, i)), e;
          }
          function l(e, t) {
            var r = t.length < 0 ? 0 : 0 | j(t.length);
            e = a(e, r);
            for (var n = 0; n < r; n += 1) e[n] = 255 & t[n];
            return e;
          }
          function h(e, t, r, n) {
            if ((t.byteLength, r < 0 || t.byteLength < r))
              throw new RangeError("'offset' is out of bounds");
            if (t.byteLength < r + (n || 0)) throw new RangeError("'length' is out of bounds");
            return (
              (t =
                void 0 === r && void 0 === n
                  ? new Uint8Array(t)
                  : void 0 === n
                  ? new Uint8Array(t, r)
                  : new Uint8Array(t, r, n)),
              o.TYPED_ARRAY_SUPPORT ? ((e = t), (e.__proto__ = o.prototype)) : (e = l(e, t)),
              e
            );
          }
          function f(e, t) {
            if (o.isBuffer(t)) {
              var r = 0 | j(t.length);
              return (e = a(e, r)), 0 === e.length ? e : (t.copy(e, 0, 0, r), e);
            }
            if (t) {
              if (
                ('undefined' != typeof ArrayBuffer && t.buffer instanceof ArrayBuffer) ||
                'length' in t
              )
                return 'number' != typeof t.length || Q(t.length) ? a(e, 0) : l(e, t);
              if ('Buffer' === t.type && $(t.data)) return l(e, t.data);
            }
            throw new TypeError(
              'First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.'
            );
          }
          function j(e) {
            if (e >= i())
              throw new RangeError(
                'Attempt to allocate Buffer larger than maximum size: 0x' +
                  i().toString(16) +
                  ' bytes'
              );
            return 0 | e;
          }
          function d(e) {
            return +e != e && (e = 0), o.alloc(+e);
          }
          function m(e, t) {
            if (o.isBuffer(e)) return e.length;
            if (
              'undefined' != typeof ArrayBuffer &&
              'function' == typeof ArrayBuffer.isView &&
              (ArrayBuffer.isView(e) || e instanceof ArrayBuffer)
            )
              return e.byteLength;
            'string' != typeof e && (e = '' + e);
            var r = e.length;
            if (0 === r) return 0;
            for (var n = !1; ; )
              switch (t) {
                case 'ascii':
                case 'latin1':
                case 'binary':
                  return r;
                case 'utf8':
                case 'utf-8':
                case void 0:
                  return W(e).length;
                case 'ucs2':
                case 'ucs-2':
                case 'utf16le':
                case 'utf-16le':
                  return 2 * r;
                case 'hex':
                  return r >>> 1;
                case 'base64':
                  return Y(e).length;
                default:
                  if (n) return W(e).length;
                  (t = ('' + t).toLowerCase()), (n = !0);
              }
          }
          function v(e, t, r) {
            var n = !1;
            if (((void 0 === t || t < 0) && (t = 0), t > this.length)) return '';
            if (((void 0 === r || r > this.length) && (r = this.length), r <= 0)) return '';
            if (((r >>>= 0), (t >>>= 0), r <= t)) return '';
            for (e || (e = 'utf8'); ; )
              switch (e) {
                case 'hex':
                  return I(this, t, r);
                case 'utf8':
                case 'utf-8':
                  return O(this, t, r);
                case 'ascii':
                  return M(this, t, r);
                case 'latin1':
                case 'binary':
                  return C(this, t, r);
                case 'base64':
                  return T(this, t, r);
                case 'ucs2':
                case 'ucs-2':
                case 'utf16le':
                case 'utf-16le':
                  return R(this, t, r);
                default:
                  if (n) throw new TypeError('Unknown encoding: ' + e);
                  (e = (e + '').toLowerCase()), (n = !0);
              }
          }
          function y(e, t, r) {
            var n = e[t];
            (e[t] = e[r]), (e[r] = n);
          }
          function _(e, t, r, n, i) {
            if (0 === e.length) return -1;
            if (
              ('string' == typeof r
                ? ((n = r), (r = 0))
                : r > 2147483647
                ? (r = 2147483647)
                : r < -2147483648 && (r = -2147483648),
              (r = +r),
              isNaN(r) && (r = i ? 0 : e.length - 1),
              r < 0 && (r = e.length + r),
              r >= e.length)
            ) {
              if (i) return -1;
              r = e.length - 1;
            } else if (r < 0) {
              if (!i) return -1;
              r = 0;
            }
            if (('string' == typeof t && (t = o.from(t, n)), o.isBuffer(t)))
              return 0 === t.length ? -1 : b(e, t, r, n, i);
            if ('number' == typeof t)
              return (
                (t = 255 & t),
                o.TYPED_ARRAY_SUPPORT && 'function' == typeof Uint8Array.prototype.indexOf
                  ? i
                    ? Uint8Array.prototype.indexOf.call(e, t, r)
                    : Uint8Array.prototype.lastIndexOf.call(e, t, r)
                  : b(e, [t], r, n, i)
              );
            throw new TypeError('val must be string, number or Buffer');
          }
          function b(e, t, r, n, i) {
            function a(e, t) {
              return 1 === o ? e[t] : e.readUInt16BE(t * o);
            }
            var o = 1,
              s = e.length,
              p = t.length;
            if (
              void 0 !== n &&
              ((n = String(n).toLowerCase()),
              'ucs2' === n || 'ucs-2' === n || 'utf16le' === n || 'utf-16le' === n)
            ) {
              if (e.length < 2 || t.length < 2) return -1;
              (o = 2), (s /= 2), (p /= 2), (r /= 2);
            }
            var c;
            if (i) {
              var u = -1;
              for (c = r; c < s; c++)
                if (a(e, c) === a(t, u === -1 ? 0 : c - u)) {
                  if ((u === -1 && (u = c), c - u + 1 === p)) return u * o;
                } else u !== -1 && (c -= c - u), (u = -1);
            } else
              for (r + p > s && (r = s - p), c = r; c >= 0; c--) {
                for (var g = !0, l = 0; l < p; l++)
                  if (a(e, c + l) !== a(t, l)) {
                    g = !1;
                    break;
                  }
                if (g) return c;
              }
            return -1;
          }
          function E(e, t, r, n) {
            r = Number(r) || 0;
            var i = e.length - r;
            n ? ((n = Number(n)), n > i && (n = i)) : (n = i);
            var a = t.length;
            if (a % 2 !== 0) throw new TypeError('Invalid hex string');
            n > a / 2 && (n = a / 2);
            for (var o = 0; o < n; ++o) {
              var s = parseInt(t.substr(2 * o, 2), 16);
              if (isNaN(s)) return o;
              e[r + o] = s;
            }
            return o;
          }
          function w(e, t, r, n) {
            return H(W(t, e.length - r), e, r, n);
          }
          function x(e, t, r, n) {
            return H(X(t), e, r, n);
          }
          function k(e, t, r, n) {
            return x(e, t, r, n);
          }
          function S(e, t, r, n) {
            return H(Y(t), e, r, n);
          }
          function A(e, t, r, n) {
            return H(G(t, e.length - r), e, r, n);
          }
          function T(e, t, r) {
            return 0 === t && r === e.length ? Z.fromByteArray(e) : Z.fromByteArray(e.slice(t, r));
          }
          function O(e, t, r) {
            r = Math.min(e.length, r);
            for (var n = [], i = t; i < r; ) {
              var a = e[i],
                o = null,
                s = a > 239 ? 4 : a > 223 ? 3 : a > 191 ? 2 : 1;
              if (i + s <= r) {
                var p, c, u, g;
                switch (s) {
                  case 1:
                    a < 128 && (o = a);
                    break;
                  case 2:
                    (p = e[i + 1]),
                      128 === (192 & p) && ((g = ((31 & a) << 6) | (63 & p)), g > 127 && (o = g));
                    break;
                  case 3:
                    (p = e[i + 1]),
                      (c = e[i + 2]),
                      128 === (192 & p) &&
                        128 === (192 & c) &&
                        ((g = ((15 & a) << 12) | ((63 & p) << 6) | (63 & c)),
                        g > 2047 && (g < 55296 || g > 57343) && (o = g));
                    break;
                  case 4:
                    (p = e[i + 1]),
                      (c = e[i + 2]),
                      (u = e[i + 3]),
                      128 === (192 & p) &&
                        128 === (192 & c) &&
                        128 === (192 & u) &&
                        ((g = ((15 & a) << 18) | ((63 & p) << 12) | ((63 & c) << 6) | (63 & u)),
                        g > 65535 && g < 1114112 && (o = g));
                }
              }
              null === o
                ? ((o = 65533), (s = 1))
                : o > 65535 &&
                  ((o -= 65536), n.push(((o >>> 10) & 1023) | 55296), (o = 56320 | (1023 & o))),
                n.push(o),
                (i += s);
            }
            return P(n);
          }
          function P(e) {
            var t = e.length;
            if (t <= ee) return String.fromCharCode.apply(String, e);
            for (var r = '', n = 0; n < t; )
              r += String.fromCharCode.apply(String, e.slice(n, (n += ee)));
            return r;
          }
          function M(e, t, r) {
            var n = '';
            r = Math.min(e.length, r);
            for (var i = t; i < r; ++i) n += String.fromCharCode(127 & e[i]);
            return n;
          }
          function C(e, t, r) {
            var n = '';
            r = Math.min(e.length, r);
            for (var i = t; i < r; ++i) n += String.fromCharCode(e[i]);
            return n;
          }
          function I(e, t, r) {
            var n = e.length;
            (!t || t < 0) && (t = 0), (!r || r < 0 || r > n) && (r = n);
            for (var i = '', a = t; a < r; ++a) i += q(e[a]);
            return i;
          }
          function R(e, t, r) {
            for (var n = e.slice(t, r), i = '', a = 0; a < n.length; a += 2)
              i += String.fromCharCode(n[a] + 256 * n[a + 1]);
            return i;
          }
          function L(e, t, r) {
            if (e % 1 !== 0 || e < 0) throw new RangeError('offset is not uint');
            if (e + t > r) throw new RangeError('Trying to access beyond buffer length');
          }
          function D(e, t, r, n, i, a) {
            if (!o.isBuffer(e)) throw new TypeError('"buffer" argument must be a Buffer instance');
            if (t > i || t < a) throw new RangeError('"value" argument is out of bounds');
            if (r + n > e.length) throw new RangeError('Index out of range');
          }
          function N(e, t, r, n) {
            t < 0 && (t = 65535 + t + 1);
            for (var i = 0, a = Math.min(e.length - r, 2); i < a; ++i)
              e[r + i] = (t & (255 << (8 * (n ? i : 1 - i)))) >>> (8 * (n ? i : 1 - i));
          }
          function F(e, t, r, n) {
            t < 0 && (t = 4294967295 + t + 1);
            for (var i = 0, a = Math.min(e.length - r, 4); i < a; ++i)
              e[r + i] = (t >>> (8 * (n ? i : 3 - i))) & 255;
          }
          function U(e, t, r, n, i, a) {
            if (r + n > e.length) throw new RangeError('Index out of range');
            if (r < 0) throw new RangeError('Index out of range');
          }
          function B(e, t, r, n, i) {
            return (
              i || U(e, t, r, 4, 3.4028234663852886e38, -3.4028234663852886e38),
              J.write(e, t, r, n, 23, 4),
              r + 4
            );
          }
          function V(e, t, r, n, i) {
            return (
              i || U(e, t, r, 8, 1.7976931348623157e308, -1.7976931348623157e308),
              J.write(e, t, r, n, 52, 8),
              r + 8
            );
          }
          function z(e) {
            if (((e = K(e).replace(te, '')), e.length < 2)) return '';
            for (; e.length % 4 !== 0; ) e += '=';
            return e;
          }
          function K(e) {
            return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, '');
          }
          function q(e) {
            return e < 16 ? '0' + e.toString(16) : e.toString(16);
          }
          function W(e, t) {
            t = t || 1 / 0;
            for (var r, n = e.length, i = null, a = [], o = 0; o < n; ++o) {
              if (((r = e.charCodeAt(o)), r > 55295 && r < 57344)) {
                if (!i) {
                  if (r > 56319) {
                    (t -= 3) > -1 && a.push(239, 191, 189);
                    continue;
                  }
                  if (o + 1 === n) {
                    (t -= 3) > -1 && a.push(239, 191, 189);
                    continue;
                  }
                  i = r;
                  continue;
                }
                if (r < 56320) {
                  (t -= 3) > -1 && a.push(239, 191, 189), (i = r);
                  continue;
                }
                r = (((i - 55296) << 10) | (r - 56320)) + 65536;
              } else i && (t -= 3) > -1 && a.push(239, 191, 189);
              if (((i = null), r < 128)) {
                if ((t -= 1) < 0) break;
                a.push(r);
              } else if (r < 2048) {
                if ((t -= 2) < 0) break;
                a.push((r >> 6) | 192, (63 & r) | 128);
              } else if (r < 65536) {
                if ((t -= 3) < 0) break;
                a.push((r >> 12) | 224, ((r >> 6) & 63) | 128, (63 & r) | 128);
              } else {
                if (!(r < 1114112)) throw new Error('Invalid code point');
                if ((t -= 4) < 0) break;
                a.push(
                  (r >> 18) | 240,
                  ((r >> 12) & 63) | 128,
                  ((r >> 6) & 63) | 128,
                  (63 & r) | 128
                );
              }
            }
            return a;
          }
          function X(e) {
            for (var t = [], r = 0; r < e.length; ++r) t.push(255 & e.charCodeAt(r));
            return t;
          }
          function G(e, t) {
            for (var r, n, i, a = [], o = 0; o < e.length && !((t -= 2) < 0); ++o)
              (r = e.charCodeAt(o)), (n = r >> 8), (i = r % 256), a.push(i), a.push(n);
            return a;
          }
          function Y(e) {
            return Z.toByteArray(z(e));
          }
          function H(e, t, r, n) {
            for (var i = 0; i < n && !(i + r >= t.length || i >= e.length); ++i) t[i + r] = e[i];
            return i;
          }
          function Q(e) {
            return e !== e;
          }
          var Z = e('base64-js'),
            J = e('ieee754'),
            $ = e('isarray');
          (r.Buffer = o),
            (r.SlowBuffer = d),
            (r.INSPECT_MAX_BYTES = 50),
            (o.TYPED_ARRAY_SUPPORT =
              void 0 !== t.TYPED_ARRAY_SUPPORT ? t.TYPED_ARRAY_SUPPORT : n()),
            (r.kMaxLength = i()),
            (o.poolSize = 8192),
            (o._augment = function(e) {
              return (e.__proto__ = o.prototype), e;
            }),
            (o.from = function(e, t, r) {
              return s(null, e, t, r);
            }),
            o.TYPED_ARRAY_SUPPORT &&
              ((o.prototype.__proto__ = Uint8Array.prototype),
              (o.__proto__ = Uint8Array),
              'undefined' != typeof Symbol &&
                Symbol.species &&
                o[Symbol.species] === o &&
                Object.defineProperty(o, Symbol.species, { value: null, configurable: !0 })),
            (o.alloc = function(e, t, r) {
              return c(null, e, t, r);
            }),
            (o.allocUnsafe = function(e) {
              return u(null, e);
            }),
            (o.allocUnsafeSlow = function(e) {
              return u(null, e);
            }),
            (o.isBuffer = function(e) {
              return !(null == e || !e._isBuffer);
            }),
            (o.compare = function(e, t) {
              if (!o.isBuffer(e) || !o.isBuffer(t))
                throw new TypeError('Arguments must be Buffers');
              if (e === t) return 0;
              for (var r = e.length, n = t.length, i = 0, a = Math.min(r, n); i < a; ++i)
                if (e[i] !== t[i]) {
                  (r = e[i]), (n = t[i]);
                  break;
                }
              return r < n ? -1 : n < r ? 1 : 0;
            }),
            (o.isEncoding = function(e) {
              switch (String(e).toLowerCase()) {
                case 'hex':
                case 'utf8':
                case 'utf-8':
                case 'ascii':
                case 'latin1':
                case 'binary':
                case 'base64':
                case 'ucs2':
                case 'ucs-2':
                case 'utf16le':
                case 'utf-16le':
                  return !0;
                default:
                  return !1;
              }
            }),
            (o.concat = function(e, t) {
              if (!$(e)) throw new TypeError('"list" argument must be an Array of Buffers');
              if (0 === e.length) return o.alloc(0);
              var r;
              if (void 0 === t) for (t = 0, r = 0; r < e.length; ++r) t += e[r].length;
              var n = o.allocUnsafe(t),
                i = 0;
              for (r = 0; r < e.length; ++r) {
                var a = e[r];
                if (!o.isBuffer(a))
                  throw new TypeError('"list" argument must be an Array of Buffers');
                a.copy(n, i), (i += a.length);
              }
              return n;
            }),
            (o.byteLength = m),
            (o.prototype._isBuffer = !0),
            (o.prototype.swap16 = function() {
              var e = this.length;
              if (e % 2 !== 0) throw new RangeError('Buffer size must be a multiple of 16-bits');
              for (var t = 0; t < e; t += 2) y(this, t, t + 1);
              return this;
            }),
            (o.prototype.swap32 = function() {
              var e = this.length;
              if (e % 4 !== 0) throw new RangeError('Buffer size must be a multiple of 32-bits');
              for (var t = 0; t < e; t += 4) y(this, t, t + 3), y(this, t + 1, t + 2);
              return this;
            }),
            (o.prototype.swap64 = function() {
              var e = this.length;
              if (e % 8 !== 0) throw new RangeError('Buffer size must be a multiple of 64-bits');
              for (var t = 0; t < e; t += 8)
                y(this, t, t + 7),
                  y(this, t + 1, t + 6),
                  y(this, t + 2, t + 5),
                  y(this, t + 3, t + 4);
              return this;
            }),
            (o.prototype.toString = function() {
              var e = 0 | this.length;
              return 0 === e
                ? ''
                : 0 === arguments.length
                ? O(this, 0, e)
                : v.apply(this, arguments);
            }),
            (o.prototype.equals = function(e) {
              if (!o.isBuffer(e)) throw new TypeError('Argument must be a Buffer');
              return this === e || 0 === o.compare(this, e);
            }),
            (o.prototype.inspect = function() {
              var e = '',
                t = r.INSPECT_MAX_BYTES;
              return (
                this.length > 0 &&
                  ((e = this.toString('hex', 0, t)
                    .match(/.{2}/g)
                    .join(' ')),
                  this.length > t && (e += ' ... ')),
                '<Buffer ' + e + '>'
              );
            }),
            (o.prototype.compare = function(e, t, r, n, i) {
              if (!o.isBuffer(e)) throw new TypeError('Argument must be a Buffer');
              if (
                (void 0 === t && (t = 0),
                void 0 === r && (r = e ? e.length : 0),
                void 0 === n && (n = 0),
                void 0 === i && (i = this.length),
                t < 0 || r > e.length || n < 0 || i > this.length)
              )
                throw new RangeError('out of range index');
              if (n >= i && t >= r) return 0;
              if (n >= i) return -1;
              if (t >= r) return 1;
              if (((t >>>= 0), (r >>>= 0), (n >>>= 0), (i >>>= 0), this === e)) return 0;
              for (
                var a = i - n,
                  s = r - t,
                  p = Math.min(a, s),
                  c = this.slice(n, i),
                  u = e.slice(t, r),
                  g = 0;
                g < p;
                ++g
              )
                if (c[g] !== u[g]) {
                  (a = c[g]), (s = u[g]);
                  break;
                }
              return a < s ? -1 : s < a ? 1 : 0;
            }),
            (o.prototype.includes = function(e, t, r) {
              return this.indexOf(e, t, r) !== -1;
            }),
            (o.prototype.indexOf = function(e, t, r) {
              return _(this, e, t, r, !0);
            }),
            (o.prototype.lastIndexOf = function(e, t, r) {
              return _(this, e, t, r, !1);
            }),
            (o.prototype.write = function(e, t, r, n) {
              if (void 0 === t) (n = 'utf8'), (r = this.length), (t = 0);
              else if (void 0 === r && 'string' == typeof t) (n = t), (r = this.length), (t = 0);
              else {
                if (!isFinite(t))
                  throw new Error(
                    'Buffer.write(string, encoding, offset[, length]) is no longer supported'
                  );
                (t = 0 | t),
                  isFinite(r)
                    ? ((r = 0 | r), void 0 === n && (n = 'utf8'))
                    : ((n = r), (r = void 0));
              }
              var i = this.length - t;
              if (
                ((void 0 === r || r > i) && (r = i),
                (e.length > 0 && (r < 0 || t < 0)) || t > this.length)
              )
                throw new RangeError('Attempt to write outside buffer bounds');
              n || (n = 'utf8');
              for (var a = !1; ; )
                switch (n) {
                  case 'hex':
                    return E(this, e, t, r);
                  case 'utf8':
                  case 'utf-8':
                    return w(this, e, t, r);
                  case 'ascii':
                    return x(this, e, t, r);
                  case 'latin1':
                  case 'binary':
                    return k(this, e, t, r);
                  case 'base64':
                    return S(this, e, t, r);
                  case 'ucs2':
                  case 'ucs-2':
                  case 'utf16le':
                  case 'utf-16le':
                    return A(this, e, t, r);
                  default:
                    if (a) throw new TypeError('Unknown encoding: ' + n);
                    (n = ('' + n).toLowerCase()), (a = !0);
                }
            }),
            (o.prototype.toJSON = function() {
              return { type: 'Buffer', data: Array.prototype.slice.call(this._arr || this, 0) };
            });
          var ee = 4096;
          (o.prototype.slice = function(e, t) {
            var r = this.length;
            (e = ~~e),
              (t = void 0 === t ? r : ~~t),
              e < 0 ? ((e += r), e < 0 && (e = 0)) : e > r && (e = r),
              t < 0 ? ((t += r), t < 0 && (t = 0)) : t > r && (t = r),
              t < e && (t = e);
            var n;
            if (o.TYPED_ARRAY_SUPPORT) (n = this.subarray(e, t)), (n.__proto__ = o.prototype);
            else {
              var i = t - e;
              n = new o(i, void 0);
              for (var a = 0; a < i; ++a) n[a] = this[a + e];
            }
            return n;
          }),
            (o.prototype.readUIntLE = function(e, t, r) {
              (e = 0 | e), (t = 0 | t), r || L(e, t, this.length);
              for (var n = this[e], i = 1, a = 0; ++a < t && (i *= 256); ) n += this[e + a] * i;
              return n;
            }),
            (o.prototype.readUIntBE = function(e, t, r) {
              (e = 0 | e), (t = 0 | t), r || L(e, t, this.length);
              for (var n = this[e + --t], i = 1; t > 0 && (i *= 256); ) n += this[e + --t] * i;
              return n;
            }),
            (o.prototype.readUInt8 = function(e, t) {
              return t || L(e, 1, this.length), this[e];
            }),
            (o.prototype.readUInt16LE = function(e, t) {
              return t || L(e, 2, this.length), this[e] | (this[e + 1] << 8);
            }),
            (o.prototype.readUInt16BE = function(e, t) {
              return t || L(e, 2, this.length), (this[e] << 8) | this[e + 1];
            }),
            (o.prototype.readUInt32LE = function(e, t) {
              return (
                t || L(e, 4, this.length),
                (this[e] | (this[e + 1] << 8) | (this[e + 2] << 16)) + 16777216 * this[e + 3]
              );
            }),
            (o.prototype.readUInt32BE = function(e, t) {
              return (
                t || L(e, 4, this.length),
                16777216 * this[e] + ((this[e + 1] << 16) | (this[e + 2] << 8) | this[e + 3])
              );
            }),
            (o.prototype.readIntLE = function(e, t, r) {
              (e = 0 | e), (t = 0 | t), r || L(e, t, this.length);
              for (var n = this[e], i = 1, a = 0; ++a < t && (i *= 256); ) n += this[e + a] * i;
              return (i *= 128), n >= i && (n -= Math.pow(2, 8 * t)), n;
            }),
            (o.prototype.readIntBE = function(e, t, r) {
              (e = 0 | e), (t = 0 | t), r || L(e, t, this.length);
              for (var n = t, i = 1, a = this[e + --n]; n > 0 && (i *= 256); )
                a += this[e + --n] * i;
              return (i *= 128), a >= i && (a -= Math.pow(2, 8 * t)), a;
            }),
            (o.prototype.readInt8 = function(e, t) {
              return t || L(e, 1, this.length), 128 & this[e] ? (255 - this[e] + 1) * -1 : this[e];
            }),
            (o.prototype.readInt16LE = function(e, t) {
              t || L(e, 2, this.length);
              var r = this[e] | (this[e + 1] << 8);
              return 32768 & r ? 4294901760 | r : r;
            }),
            (o.prototype.readInt16BE = function(e, t) {
              t || L(e, 2, this.length);
              var r = this[e + 1] | (this[e] << 8);
              return 32768 & r ? 4294901760 | r : r;
            }),
            (o.prototype.readInt32LE = function(e, t) {
              return (
                t || L(e, 4, this.length),
                this[e] | (this[e + 1] << 8) | (this[e + 2] << 16) | (this[e + 3] << 24)
              );
            }),
            (o.prototype.readInt32BE = function(e, t) {
              return (
                t || L(e, 4, this.length),
                (this[e] << 24) | (this[e + 1] << 16) | (this[e + 2] << 8) | this[e + 3]
              );
            }),
            (o.prototype.readFloatLE = function(e, t) {
              return t || L(e, 4, this.length), J.read(this, e, !0, 23, 4);
            }),
            (o.prototype.readFloatBE = function(e, t) {
              return t || L(e, 4, this.length), J.read(this, e, !1, 23, 4);
            }),
            (o.prototype.readDoubleLE = function(e, t) {
              return t || L(e, 8, this.length), J.read(this, e, !0, 52, 8);
            }),
            (o.prototype.readDoubleBE = function(e, t) {
              return t || L(e, 8, this.length), J.read(this, e, !1, 52, 8);
            }),
            (o.prototype.writeUIntLE = function(e, t, r, n) {
              if (((e = +e), (t = 0 | t), (r = 0 | r), !n)) {
                var i = Math.pow(2, 8 * r) - 1;
                D(this, e, t, r, i, 0);
              }
              var a = 1,
                o = 0;
              for (this[t] = 255 & e; ++o < r && (a *= 256); ) this[t + o] = (e / a) & 255;
              return t + r;
            }),
            (o.prototype.writeUIntBE = function(e, t, r, n) {
              if (((e = +e), (t = 0 | t), (r = 0 | r), !n)) {
                var i = Math.pow(2, 8 * r) - 1;
                D(this, e, t, r, i, 0);
              }
              var a = r - 1,
                o = 1;
              for (this[t + a] = 255 & e; --a >= 0 && (o *= 256); ) this[t + a] = (e / o) & 255;
              return t + r;
            }),
            (o.prototype.writeUInt8 = function(e, t, r) {
              return (
                (e = +e),
                (t = 0 | t),
                r || D(this, e, t, 1, 255, 0),
                o.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)),
                (this[t] = 255 & e),
                t + 1
              );
            }),
            (o.prototype.writeUInt16LE = function(e, t, r) {
              return (
                (e = +e),
                (t = 0 | t),
                r || D(this, e, t, 2, 65535, 0),
                o.TYPED_ARRAY_SUPPORT
                  ? ((this[t] = 255 & e), (this[t + 1] = e >>> 8))
                  : N(this, e, t, !0),
                t + 2
              );
            }),
            (o.prototype.writeUInt16BE = function(e, t, r) {
              return (
                (e = +e),
                (t = 0 | t),
                r || D(this, e, t, 2, 65535, 0),
                o.TYPED_ARRAY_SUPPORT
                  ? ((this[t] = e >>> 8), (this[t + 1] = 255 & e))
                  : N(this, e, t, !1),
                t + 2
              );
            }),
            (o.prototype.writeUInt32LE = function(e, t, r) {
              return (
                (e = +e),
                (t = 0 | t),
                r || D(this, e, t, 4, 4294967295, 0),
                o.TYPED_ARRAY_SUPPORT
                  ? ((this[t + 3] = e >>> 24),
                    (this[t + 2] = e >>> 16),
                    (this[t + 1] = e >>> 8),
                    (this[t] = 255 & e))
                  : F(this, e, t, !0),
                t + 4
              );
            }),
            (o.prototype.writeUInt32BE = function(e, t, r) {
              return (
                (e = +e),
                (t = 0 | t),
                r || D(this, e, t, 4, 4294967295, 0),
                o.TYPED_ARRAY_SUPPORT
                  ? ((this[t] = e >>> 24),
                    (this[t + 1] = e >>> 16),
                    (this[t + 2] = e >>> 8),
                    (this[t + 3] = 255 & e))
                  : F(this, e, t, !1),
                t + 4
              );
            }),
            (o.prototype.writeIntLE = function(e, t, r, n) {
              if (((e = +e), (t = 0 | t), !n)) {
                var i = Math.pow(2, 8 * r - 1);
                D(this, e, t, r, i - 1, -i);
              }
              var a = 0,
                o = 1,
                s = 0;
              for (this[t] = 255 & e; ++a < r && (o *= 256); )
                e < 0 && 0 === s && 0 !== this[t + a - 1] && (s = 1),
                  (this[t + a] = (((e / o) >> 0) - s) & 255);
              return t + r;
            }),
            (o.prototype.writeIntBE = function(e, t, r, n) {
              if (((e = +e), (t = 0 | t), !n)) {
                var i = Math.pow(2, 8 * r - 1);
                D(this, e, t, r, i - 1, -i);
              }
              var a = r - 1,
                o = 1,
                s = 0;
              for (this[t + a] = 255 & e; --a >= 0 && (o *= 256); )
                e < 0 && 0 === s && 0 !== this[t + a + 1] && (s = 1),
                  (this[t + a] = (((e / o) >> 0) - s) & 255);
              return t + r;
            }),
            (o.prototype.writeInt8 = function(e, t, r) {
              return (
                (e = +e),
                (t = 0 | t),
                r || D(this, e, t, 1, 127, -128),
                o.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)),
                e < 0 && (e = 255 + e + 1),
                (this[t] = 255 & e),
                t + 1
              );
            }),
            (o.prototype.writeInt16LE = function(e, t, r) {
              return (
                (e = +e),
                (t = 0 | t),
                r || D(this, e, t, 2, 32767, -32768),
                o.TYPED_ARRAY_SUPPORT
                  ? ((this[t] = 255 & e), (this[t + 1] = e >>> 8))
                  : N(this, e, t, !0),
                t + 2
              );
            }),
            (o.prototype.writeInt16BE = function(e, t, r) {
              return (
                (e = +e),
                (t = 0 | t),
                r || D(this, e, t, 2, 32767, -32768),
                o.TYPED_ARRAY_SUPPORT
                  ? ((this[t] = e >>> 8), (this[t + 1] = 255 & e))
                  : N(this, e, t, !1),
                t + 2
              );
            }),
            (o.prototype.writeInt32LE = function(e, t, r) {
              return (
                (e = +e),
                (t = 0 | t),
                r || D(this, e, t, 4, 2147483647, -2147483648),
                o.TYPED_ARRAY_SUPPORT
                  ? ((this[t] = 255 & e),
                    (this[t + 1] = e >>> 8),
                    (this[t + 2] = e >>> 16),
                    (this[t + 3] = e >>> 24))
                  : F(this, e, t, !0),
                t + 4
              );
            }),
            (o.prototype.writeInt32BE = function(e, t, r) {
              return (
                (e = +e),
                (t = 0 | t),
                r || D(this, e, t, 4, 2147483647, -2147483648),
                e < 0 && (e = 4294967295 + e + 1),
                o.TYPED_ARRAY_SUPPORT
                  ? ((this[t] = e >>> 24),
                    (this[t + 1] = e >>> 16),
                    (this[t + 2] = e >>> 8),
                    (this[t + 3] = 255 & e))
                  : F(this, e, t, !1),
                t + 4
              );
            }),
            (o.prototype.writeFloatLE = function(e, t, r) {
              return B(this, e, t, !0, r);
            }),
            (o.prototype.writeFloatBE = function(e, t, r) {
              return B(this, e, t, !1, r);
            }),
            (o.prototype.writeDoubleLE = function(e, t, r) {
              return V(this, e, t, !0, r);
            }),
            (o.prototype.writeDoubleBE = function(e, t, r) {
              return V(this, e, t, !1, r);
            }),
            (o.prototype.copy = function(e, t, r, n) {
              if (
                (r || (r = 0),
                n || 0 === n || (n = this.length),
                t >= e.length && (t = e.length),
                t || (t = 0),
                n > 0 && n < r && (n = r),
                n === r)
              )
                return 0;
              if (0 === e.length || 0 === this.length) return 0;
              if (t < 0) throw new RangeError('targetStart out of bounds');
              if (r < 0 || r >= this.length) throw new RangeError('sourceStart out of bounds');
              if (n < 0) throw new RangeError('sourceEnd out of bounds');
              n > this.length && (n = this.length), e.length - t < n - r && (n = e.length - t + r);
              var i,
                a = n - r;
              if (this === e && r < t && t < n) for (i = a - 1; i >= 0; --i) e[i + t] = this[i + r];
              else if (a < 1e3 || !o.TYPED_ARRAY_SUPPORT)
                for (i = 0; i < a; ++i) e[i + t] = this[i + r];
              else Uint8Array.prototype.set.call(e, this.subarray(r, r + a), t);
              return a;
            }),
            (o.prototype.fill = function(e, t, r, n) {
              if ('string' == typeof e) {
                if (
                  ('string' == typeof t
                    ? ((n = t), (t = 0), (r = this.length))
                    : 'string' == typeof r && ((n = r), (r = this.length)),
                  1 === e.length)
                ) {
                  var i = e.charCodeAt(0);
                  i < 256 && (e = i);
                }
                if (void 0 !== n && 'string' != typeof n)
                  throw new TypeError('encoding must be a string');
                if ('string' == typeof n && !o.isEncoding(n))
                  throw new TypeError('Unknown encoding: ' + n);
              } else 'number' == typeof e && (e = 255 & e);
              if (t < 0 || this.length < t || this.length < r)
                throw new RangeError('Out of range index');
              if (r <= t) return this;
              (t >>>= 0), (r = void 0 === r ? this.length : r >>> 0), e || (e = 0);
              var a;
              if ('number' == typeof e) for (a = t; a < r; ++a) this[a] = e;
              else {
                var s = o.isBuffer(e) ? e : W(new o(e, n).toString()),
                  p = s.length;
                for (a = 0; a < r - t; ++a) this[a + t] = s[a % p];
              }
              return this;
            });
          var te = /[^+\/0-9A-Za-z-_]/g;
        }.call(
          this,
          'undefined' != typeof global
            ? global
            : 'undefined' != typeof self
            ? self
            : 'undefined' != typeof window
            ? window
            : {}
        ));
      },
      { 'base64-js': 38, ieee754: 40, isarray: 41 },
    ],
    40: [
      function(e, t, r) {
        'use strict';
        (r.read = function(e, t, r, n, i) {
          var a,
            o,
            s = 8 * i - n - 1,
            p = (1 << s) - 1,
            c = p >> 1,
            u = -7,
            g = r ? i - 1 : 0,
            l = r ? -1 : 1,
            h = e[t + g];
          for (
            g += l, a = h & ((1 << -u) - 1), h >>= -u, u += s;
            u > 0;
            a = 256 * a + e[t + g], g += l, u -= 8
          );
          for (
            o = a & ((1 << -u) - 1), a >>= -u, u += n;
            u > 0;
            o = 256 * o + e[t + g], g += l, u -= 8
          );
          if (0 === a) a = 1 - c;
          else {
            if (a === p) return o ? NaN : (h ? -1 : 1) * (1 / 0);
            (o += Math.pow(2, n)), (a -= c);
          }
          return (h ? -1 : 1) * o * Math.pow(2, a - n);
        }),
          (r.write = function(e, t, r, n, i, a) {
            var o,
              s,
              p,
              c = 8 * a - i - 1,
              u = (1 << c) - 1,
              g = u >> 1,
              l = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
              h = n ? 0 : a - 1,
              f = n ? 1 : -1,
              j = t < 0 || (0 === t && 1 / t < 0) ? 1 : 0;
            for (
              t = Math.abs(t),
                isNaN(t) || t === 1 / 0
                  ? ((s = isNaN(t) ? 1 : 0), (o = u))
                  : ((o = Math.floor(Math.log(t) / Math.LN2)),
                    t * (p = Math.pow(2, -o)) < 1 && (o--, (p *= 2)),
                    (t += o + g >= 1 ? l / p : l * Math.pow(2, 1 - g)),
                    t * p >= 2 && (o++, (p /= 2)),
                    o + g >= u
                      ? ((s = 0), (o = u))
                      : o + g >= 1
                      ? ((s = (t * p - 1) * Math.pow(2, i)), (o += g))
                      : ((s = t * Math.pow(2, g - 1) * Math.pow(2, i)), (o = 0)));
              i >= 8;
              e[r + h] = 255 & s, h += f, s /= 256, i -= 8
            );
            for (o = (o << i) | s, c += i; c > 0; e[r + h] = 255 & o, h += f, o /= 256, c -= 8);
            e[r + h - f] |= 128 * j;
          });
      },
      {},
    ],
    41: [
      function(e, t, r) {
        'use strict';
        var n = {}.toString;
        t.exports =
          Array.isArray ||
          function(e) {
            return '[object Array]' == n.call(e);
          };
      },
      {},
    ],
    42: [
      function(e, t, r) {
        'use strict';
        t.exports = {
          clone: e('./clone'),
          create: e('./create'),
          defaults: e('./defaults'),
          extend: e('./extend'),
          getPrototypeOf: e('./getPrototypeOf'),
          isDate: e('./isDate'),
          isEmpty: e('./isEmpty'),
          isRegExp: e('./isRegExp'),
          toQueryParameters: e('./toQueryParameters'),
        };
      },
      {
        './clone': 43,
        './create': 44,
        './defaults': 45,
        './extend': 46,
        './getPrototypeOf': 47,
        './isDate': 48,
        './isEmpty': 49,
        './isRegExp': 50,
        './toQueryParameters': 51,
      },
    ],
    43: [
      function(e, t, r) {
        'use strict';
        var n =
          'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
            ? function(e) {
                return typeof e;
              }
            : function(e) {
                return e &&
                  'function' == typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? 'symbol'
                  : typeof e;
              };
        e('@marcom/ac-polyfills/Array/isArray');
        var i = e('./extend'),
          a = Object.prototype.hasOwnProperty,
          o = function s(e, t) {
            var r;
            for (r in t)
              a.call(t, r) &&
                (null === t[r]
                  ? (e[r] = null)
                  : 'object' === n(t[r])
                  ? ((e[r] = Array.isArray(t[r]) ? [] : {}), s(e[r], t[r]))
                  : (e[r] = t[r]));
            return e;
          };
        t.exports = function(e, t) {
          return t ? o({}, e) : i({}, e);
        };
      },
      { './extend': 46, '@marcom/ac-polyfills/Array/isArray': void 0 },
    ],
    44: [
      function(e, t, r) {
        'use strict';
        var n =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function(e) {
                  return typeof e;
                }
              : function(e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                },
          i = function() {};
        t.exports = function(e) {
          if (arguments.length > 1) throw new Error('Second argument not supported');
          if (null === e || 'object' !== ('undefined' == typeof e ? 'undefined' : n(e)))
            throw new TypeError('Object prototype may only be an Object.');
          return 'function' == typeof Object.create
            ? Object.create(e)
            : ((i.prototype = e), new i());
        };
      },
      {},
    ],
    45: [
      function(e, t, r) {
        'use strict';
        var n =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function(e) {
                  return typeof e;
                }
              : function(e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                },
          i = e('./extend');
        t.exports = function(e, t) {
          if ('object' !== ('undefined' == typeof e ? 'undefined' : n(e)))
            throw new TypeError('defaults: must provide a defaults object');
          if (((t = t || {}), 'object' !== ('undefined' == typeof t ? 'undefined' : n(t))))
            throw new TypeError('defaults: options must be a typeof object');
          return i({}, e, t);
        };
      },
      { './extend': 46 },
    ],
    46: [
      function(e, t, r) {
        'use strict';
        e('@marcom/ac-polyfills/Array/prototype.forEach');
        var n = Object.prototype.hasOwnProperty;
        t.exports = function() {
          var e, t;
          return (
            (e = arguments.length < 2 ? [{}, arguments[0]] : [].slice.call(arguments)),
            (t = e.shift()),
            e.forEach(function(e) {
              if (null != e) for (var r in e) n.call(e, r) && (t[r] = e[r]);
            }),
            t
          );
        };
      },
      { '@marcom/ac-polyfills/Array/prototype.forEach': void 0 },
    ],
    47: [
      function(e, t, r) {
        'use strict';
        var n =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function(e) {
                  return typeof e;
                }
              : function(e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                },
          i = Object.prototype.hasOwnProperty;
        t.exports = function(e) {
          if (Object.getPrototypeOf) return Object.getPrototypeOf(e);
          if ('object' !== ('undefined' == typeof e ? 'undefined' : n(e)))
            throw new Error('Requested prototype of a value that is not an object.');
          if ('object' === n(this.__proto__)) return e.__proto__;
          var t,
            r = e.constructor;
          if (i.call(e, 'constructor')) {
            if (((t = r), !delete e.constructor)) return null;
            (r = e.constructor), (e.constructor = t);
          }
          return r ? r.prototype : null;
        };
      },
      {},
    ],
    48: [
      function(e, t, r) {
        'use strict';
        t.exports = function(e) {
          return '[object Date]' === Object.prototype.toString.call(e);
        };
      },
      {},
    ],
    49: [
      function(e, t, r) {
        'use strict';
        var n =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function(e) {
                  return typeof e;
                }
              : function(e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                },
          i = Object.prototype.hasOwnProperty;
        t.exports = function(e) {
          var t;
          if ('object' !== ('undefined' == typeof e ? 'undefined' : n(e)))
            throw new TypeError('ac-base.Object.isEmpty : Invalid parameter - expected object');
          for (t in e) if (i.call(e, t)) return !1;
          return !0;
        };
      },
      {},
    ],
    50: [
      function(e, t, r) {
        'use strict';
        t.exports = function(e) {
          return !!window.RegExp && e instanceof RegExp;
        };
      },
      {},
    ],
    51: [
      function(e, t, r) {
        'use strict';
        var n =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function(e) {
                  return typeof e;
                }
              : function(e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                },
          i = e('@marcom/ac-url/joinSearchParams');
        t.exports = function(e) {
          if ('object' !== ('undefined' == typeof e ? 'undefined' : n(e)))
            throw new TypeError('toQueryParameters error: argument is not an object');
          return i(e, !1);
        };
      },
      { '@marcom/ac-url/joinSearchParams': 80 },
    ],
    52: [
      function(e, t, r) {
        'use strict';
        var n = e('./utils/eventTypeAvailable'),
          i = e('./shared/camelCasedEventTypes'),
          a = e('./shared/windowFallbackEventTypes'),
          o = e('./shared/prefixHelper'),
          s = {};
        t.exports = function p(e, t) {
          var r, c, u;
          if (((t = t || 'div'), (e = e.toLowerCase()), t in s || (s[t] = {}), (c = s[t]), e in c))
            return c[e];
          if (n(e, t)) return (c[e] = e);
          if (e in i)
            for (u = 0; u < i[e].length; u++)
              if (((r = i[e][u]), n(r.toLowerCase(), t))) return (c[e] = r);
          for (u = 0; u < o.evt.length; u++)
            if (((r = o.evt[u] + e), n(r, t))) return o.reduce(u), (c[e] = r);
          return 'window' !== t && a.indexOf(e) ? (c[e] = p(e, 'window')) : (c[e] = !1);
        };
      },
      {
        './shared/camelCasedEventTypes': 53,
        './shared/prefixHelper': 54,
        './shared/windowFallbackEventTypes': 55,
        './utils/eventTypeAvailable': 56,
      },
    ],
    53: [
      function(e, t, r) {
        'use strict';
        t.exports = {
          transitionend: ['webkitTransitionEnd', 'MSTransitionEnd'],
          animationstart: ['webkitAnimationStart', 'MSAnimationStart'],
          animationend: ['webkitAnimationEnd', 'MSAnimationEnd'],
          animationiteration: ['webkitAnimationIteration', 'MSAnimationIteration'],
          fullscreenchange: ['MSFullscreenChange'],
          fullscreenerror: ['MSFullscreenError'],
        };
      },
      {},
    ],
    54: [
      function(e, t, r) {
        'use strict';
        var n = ['-webkit-', '-moz-', '-ms-'],
          i = ['Webkit', 'Moz', 'ms'],
          a = ['webkit', 'moz', 'ms'],
          o = function() {
            this.initialize();
          },
          s = o.prototype;
        (s.initialize = function() {
          (this.reduced = !1), (this.css = n), (this.dom = i), (this.evt = a);
        }),
          (s.reduce = function(e) {
            this.reduced ||
              ((this.reduced = !0),
              (this.css = [this.css[e]]),
              (this.dom = [this.dom[e]]),
              (this.evt = [this.evt[e]]));
          }),
          (t.exports = new o());
      },
      {},
    ],
    55: [
      function(e, t, r) {
        'use strict';
        t.exports = ['transitionend', 'animationstart', 'animationend', 'animationiteration'];
      },
      {},
    ],
    56: [
      function(e, t, r) {
        'use strict';
        var n = { window: window, document: document };
        t.exports = function(e, t) {
          var r;
          return (
            (e = 'on' + e),
            t in n || (n[t] = document.createElement(t)),
            (r = n[t]),
            e in r ||
              ('setAttribute' in r && (r.setAttribute(e, 'return;'), 'function' == typeof r[e]))
          );
        };
      },
      {},
    ],
    57: [
      function(e, t, r) {
        'use strict';
        t.exports = { majorVersionNumber: '3.x' };
      },
      {},
    ],
    58: [
      function(e, t, r) {
        'use strict';
        function n(e) {
          (e = e || {}),
            a.call(this),
            (this.id = s.getNewID()),
            (this.executor = e.executor || o),
            this._reset(),
            (this._willRun = !1),
            (this._didDestroy = !1);
        }
        var i,
          a = e('@marcom/ac-event-emitter-micro').EventEmitterMicro,
          o = e('./sharedRAFExecutorInstance'),
          s = e('./sharedRAFEmitterIDGeneratorInstance');
        (i = n.prototype = Object.create(a.prototype)),
          (i.run = function() {
            return this._willRun || (this._willRun = !0), this._subscribe();
          }),
          (i.cancel = function() {
            this._unsubscribe(), this._willRun && (this._willRun = !1), this._reset();
          }),
          (i.destroy = function() {
            var e = this.willRun();
            return (
              this.cancel(),
              (this.executor = null),
              a.prototype.destroy.call(this),
              (this._didDestroy = !0),
              e
            );
          }),
          (i.willRun = function() {
            return this._willRun;
          }),
          (i.isRunning = function() {
            return this._isRunning;
          }),
          (i._subscribe = function() {
            return this.executor.subscribe(this);
          }),
          (i._unsubscribe = function() {
            return this.executor.unsubscribe(this);
          }),
          (i._onAnimationFrameStart = function(e) {
            (this._isRunning = !0),
              (this._willRun = !1),
              this._didEmitFrameData || ((this._didEmitFrameData = !0), this.trigger('start', e));
          }),
          (i._onAnimationFrameEnd = function(e) {
            this._willRun || (this.trigger('stop', e), this._reset());
          }),
          (i._reset = function() {
            (this._didEmitFrameData = !1), (this._isRunning = !1);
          }),
          (t.exports = n);
      },
      {
        './sharedRAFEmitterIDGeneratorInstance': 66,
        './sharedRAFExecutorInstance': 67,
        '@marcom/ac-event-emitter-micro': 34,
      },
    ],
    59: [
      function(e, t, r) {
        'use strict';
        function n(e) {
          (e = e || {}),
            this._reset(),
            this.updatePhases(),
            (this.eventEmitter = new a()),
            (this._willRun = !1),
            (this._totalSubscribeCount = -1),
            (this._requestAnimationFrame = window.requestAnimationFrame),
            (this._cancelAnimationFrame = window.cancelAnimationFrame),
            (this._boundOnAnimationFrame = this._onAnimationFrame.bind(this)),
            (this._boundOnExternalAnimationFrame = this._onExternalAnimationFrame.bind(this));
        }
        var i,
          a = e('@marcom/ac-event-emitter-micro/EventEmitterMicro');
        (i = n.prototype),
          (i.frameRequestedPhase = 'requested'),
          (i.startPhase = 'start'),
          (i.runPhases = ['update', 'external', 'draw']),
          (i.endPhase = 'end'),
          (i.disabledPhase = 'disabled'),
          (i.beforePhaseEventPrefix = 'before:'),
          (i.afterPhaseEventPrefix = 'after:'),
          (i.subscribe = function(e, t) {
            return (
              this._totalSubscribeCount++,
              this._nextFrameSubscribers[e.id] ||
                (t
                  ? this._nextFrameSubscribersOrder.unshift(e.id)
                  : this._nextFrameSubscribersOrder.push(e.id),
                (this._nextFrameSubscribers[e.id] = e),
                this._nextFrameSubscriberArrayLength++,
                this._nextFrameSubscriberCount++,
                this._run()),
              this._totalSubscribeCount
            );
          }),
          (i.subscribeImmediate = function(e, t) {
            return (
              this._totalSubscribeCount++,
              this._subscribers[e.id] ||
                (t
                  ? this._subscribersOrder.splice(this._currentSubscriberIndex + 1, 0, e.id)
                  : this._subscribersOrder.unshift(e.id),
                (this._subscribers[e.id] = e),
                this._subscriberArrayLength++,
                this._subscriberCount++),
              this._totalSubscribeCount
            );
          }),
          (i.unsubscribe = function(e) {
            return (
              !!this._nextFrameSubscribers[e.id] &&
              ((this._nextFrameSubscribers[e.id] = null),
              this._nextFrameSubscriberCount--,
              0 === this._nextFrameSubscriberCount && this._cancel(),
              !0)
            );
          }),
          (i.getSubscribeID = function() {
            return (this._totalSubscribeCount += 1);
          }),
          (i.destroy = function() {
            var e = this._cancel();
            return (
              this.eventEmitter.destroy(),
              (this.eventEmitter = null),
              (this.phases = null),
              (this._subscribers = null),
              (this._subscribersOrder = null),
              (this._nextFrameSubscribers = null),
              (this._nextFrameSubscribersOrder = null),
              (this._rafData = null),
              (this._boundOnAnimationFrame = null),
              (this._onExternalAnimationFrame = null),
              e
            );
          }),
          (i.useExternalAnimationFrame = function(e) {
            if ('boolean' == typeof e) {
              var t = this._isUsingExternalAnimationFrame;
              return (
                e &&
                  this._animationFrame &&
                  (this._cancelAnimationFrame.call(window, this._animationFrame),
                  (this._animationFrame = null)),
                !this._willRun ||
                  e ||
                  this._animationFrame ||
                  (this._animationFrame = this._requestAnimationFrame.call(
                    window,
                    this._boundOnAnimationFrame
                  )),
                (this._isUsingExternalAnimationFrame = e),
                e ? this._boundOnExternalAnimationFrame : t || !1
              );
            }
          }),
          (i.updatePhases = function() {
            this.phases || (this.phases = []),
              (this.phases.length = 0),
              this.phases.push(this.frameRequestedPhase),
              this.phases.push(this.startPhase),
              Array.prototype.push.apply(this.phases, this.runPhases),
              this.phases.push(this.endPhase),
              (this._runPhasesLength = this.runPhases.length),
              (this._phasesLength = this.phases.length);
          }),
          (i._run = function() {
            if (!this._willRun)
              return (
                (this._willRun = !0),
                0 === this.lastFrameTime && (this.lastFrameTime = performance.now()),
                (this._animationFrameActive = !0),
                this._isUsingExternalAnimationFrame ||
                  (this._animationFrame = this._requestAnimationFrame.call(
                    window,
                    this._boundOnAnimationFrame
                  )),
                this.phase === this.disabledPhase &&
                  ((this.phaseIndex = 0), (this.phase = this.phases[this.phaseIndex])),
                !0
              );
          }),
          (i._cancel = function() {
            var e = !1;
            return (
              this._animationFrameActive &&
                (this._animationFrame &&
                  (this._cancelAnimationFrame.call(window, this._animationFrame),
                  (this._animationFrame = null)),
                (this._animationFrameActive = !1),
                (this._willRun = !1),
                (e = !0)),
              this._isRunning || this._reset(),
              e
            );
          }),
          (i._onAnimationFrame = function(e) {
            for (
              this._subscribers = this._nextFrameSubscribers,
                this._subscribersOrder = this._nextFrameSubscribersOrder,
                this._subscriberArrayLength = this._nextFrameSubscriberArrayLength,
                this._subscriberCount = this._nextFrameSubscriberCount,
                this._nextFrameSubscribers = {},
                this._nextFrameSubscribersOrder = [],
                this._nextFrameSubscriberArrayLength = 0,
                this._nextFrameSubscriberCount = 0,
                this.phaseIndex = 0,
                this.phase = this.phases[this.phaseIndex],
                this._isRunning = !0,
                this._willRun = !1,
                this._didRequestNextRAF = !1,
                this._rafData.delta = e - this.lastFrameTime,
                this.lastFrameTime = e,
                this._rafData.fps = 0,
                this._rafData.delta >= 1e3 && (this._rafData.delta = 0),
                0 !== this._rafData.delta && (this._rafData.fps = 1e3 / this._rafData.delta),
                this._rafData.time = e,
                this._rafData.naturalFps = this._rafData.fps,
                this._rafData.timeNow = Date.now(),
                this.phaseIndex++,
                this.phase = this.phases[this.phaseIndex],
                this.eventEmitter.trigger(this.beforePhaseEventPrefix + this.phase),
                this._currentSubscriberIndex = 0;
              this._currentSubscriberIndex < this._subscriberArrayLength;
              this._currentSubscriberIndex++
            )
              null !== this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]] &&
                this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]]
                  ._didDestroy === !1 &&
                this._subscribers[
                  this._subscribersOrder[this._currentSubscriberIndex]
                ]._onAnimationFrameStart(this._rafData);
            for (
              this.eventEmitter.trigger(this.afterPhaseEventPrefix + this.phase),
                this._runPhaseIndex = 0;
              this._runPhaseIndex < this._runPhasesLength;
              this._runPhaseIndex++
            ) {
              for (
                this.phaseIndex++,
                  this.phase = this.phases[this.phaseIndex],
                  this.eventEmitter.trigger(this.beforePhaseEventPrefix + this.phase),
                  this._currentSubscriberIndex = 0;
                this._currentSubscriberIndex < this._subscriberArrayLength;
                this._currentSubscriberIndex++
              )
                null !== this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]] &&
                  this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]]
                    ._didDestroy === !1 &&
                  this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]].trigger(
                    this.phase,
                    this._rafData
                  );
              this.eventEmitter.trigger(this.afterPhaseEventPrefix + this.phase);
            }
            for (
              this.phaseIndex++,
                this.phase = this.phases[this.phaseIndex],
                this.eventEmitter.trigger(this.beforePhaseEventPrefix + this.phase),
                this._currentSubscriberIndex = 0;
              this._currentSubscriberIndex < this._subscriberArrayLength;
              this._currentSubscriberIndex++
            )
              null !== this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]] &&
                this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]]
                  ._didDestroy === !1 &&
                this._subscribers[
                  this._subscribersOrder[this._currentSubscriberIndex]
                ]._onAnimationFrameEnd(this._rafData);
            this.eventEmitter.trigger(this.afterPhaseEventPrefix + this.phase),
              this._willRun
                ? ((this.phaseIndex = 0), (this.phaseIndex = this.phases[this.phaseIndex]))
                : this._reset();
          }),
          (i._onExternalAnimationFrame = function(e) {
            this._isUsingExternalAnimationFrame && this._onAnimationFrame(e);
          }),
          (i._reset = function() {
            this._rafData || (this._rafData = {}),
              (this._rafData.time = 0),
              (this._rafData.delta = 0),
              (this._rafData.fps = 0),
              (this._rafData.naturalFps = 0),
              (this._rafData.timeNow = 0),
              (this._subscribers = {}),
              (this._subscribersOrder = []),
              (this._currentSubscriberIndex = -1),
              (this._subscriberArrayLength = 0),
              (this._subscriberCount = 0),
              (this._nextFrameSubscribers = {}),
              (this._nextFrameSubscribersOrder = []),
              (this._nextFrameSubscriberArrayLength = 0),
              (this._nextFrameSubscriberCount = 0),
              (this._didEmitFrameData = !1),
              (this._animationFrame = null),
              (this._animationFrameActive = !1),
              (this._isRunning = !1),
              (this._shouldReset = !1),
              (this.lastFrameTime = 0),
              (this._runPhaseIndex = -1),
              (this.phaseIndex = -1),
              (this.phase = this.disabledPhase);
          }),
          (t.exports = n);
      },
      { '@marcom/ac-event-emitter-micro/EventEmitterMicro': 35 },
    ],
    60: [
      function(e, t, r) {
        'use strict';
        var n = e('./SingleCallRAFEmitter'),
          i = function(e) {
            (this.phase = e),
              (this.rafEmitter = new n()),
              this._cachePhaseIndex(),
              (this.requestAnimationFrame = this.requestAnimationFrame.bind(this)),
              (this.cancelAnimationFrame = this.cancelAnimationFrame.bind(this)),
              (this._onBeforeRAFExecutorStart = this._onBeforeRAFExecutorStart.bind(this)),
              (this._onBeforeRAFExecutorPhase = this._onBeforeRAFExecutorPhase.bind(this)),
              (this._onAfterRAFExecutorPhase = this._onAfterRAFExecutorPhase.bind(this)),
              this.rafEmitter.on(this.phase, this._onRAFExecuted.bind(this)),
              this.rafEmitter.executor.eventEmitter.on(
                'before:start',
                this._onBeforeRAFExecutorStart
              ),
              this.rafEmitter.executor.eventEmitter.on(
                'before:' + this.phase,
                this._onBeforeRAFExecutorPhase
              ),
              this.rafEmitter.executor.eventEmitter.on(
                'after:' + this.phase,
                this._onAfterRAFExecutorPhase
              ),
              (this._frameCallbacks = []),
              (this._currentFrameCallbacks = []),
              (this._nextFrameCallbacks = []),
              (this._phaseActive = !1),
              (this._currentFrameID = -1),
              (this._cancelFrameIdx = -1),
              (this._frameCallbackLength = 0),
              (this._currentFrameCallbacksLength = 0),
              (this._nextFrameCallbacksLength = 0),
              (this._frameCallbackIteration = 0);
          },
          a = i.prototype;
        (a.requestAnimationFrame = function(e, t) {
          return (
            t === !0 &&
            this.rafEmitter.executor.phaseIndex > 0 &&
            this.rafEmitter.executor.phaseIndex <= this.phaseIndex
              ? this._phaseActive
                ? ((this._currentFrameID = this.rafEmitter.executor.subscribeImmediate(
                    this.rafEmitter,
                    !0
                  )),
                  this._frameCallbacks.push(this._currentFrameID, e),
                  (this._frameCallbackLength += 2))
                : ((this._currentFrameID = this.rafEmitter.executor.subscribeImmediate(
                    this.rafEmitter,
                    !1
                  )),
                  this._currentFrameCallbacks.push(this._currentFrameID, e),
                  (this._currentFrameCallbacksLength += 2))
              : ((this._currentFrameID = this.rafEmitter.run()),
                this._nextFrameCallbacks.push(this._currentFrameID, e),
                (this._nextFrameCallbacksLength += 2)),
            this._currentFrameID
          );
        }),
          (a.cancelAnimationFrame = function(e) {
            (this._cancelFrameIdx = this._nextFrameCallbacks.indexOf(e)),
              this._cancelFrameIdx > -1
                ? this._cancelNextAnimationFrame()
                : ((this._cancelFrameIdx = this._currentFrameCallbacks.indexOf(e)),
                  this._cancelFrameIdx > -1
                    ? this._cancelCurrentAnimationFrame()
                    : ((this._cancelFrameIdx = this._frameCallbacks.indexOf(e)),
                      this._cancelFrameIdx > -1 && this._cancelRunningAnimationFrame()));
          }),
          (a._onRAFExecuted = function(e) {
            for (
              this._frameCallbackIteration = 0;
              this._frameCallbackIteration < this._frameCallbackLength;
              this._frameCallbackIteration += 2
            )
              this._frameCallbacks[this._frameCallbackIteration + 1](e.time, e);
            (this._frameCallbacks.length = 0), (this._frameCallbackLength = 0);
          }),
          (a._onBeforeRAFExecutorStart = function() {
            Array.prototype.push.apply(
              this._currentFrameCallbacks,
              this._nextFrameCallbacks.splice(0, this._nextFrameCallbacksLength)
            ),
              (this._currentFrameCallbacksLength = this._nextFrameCallbacksLength),
              (this._nextFrameCallbacks.length = 0),
              (this._nextFrameCallbacksLength = 0);
          }),
          (a._onBeforeRAFExecutorPhase = function() {
            (this._phaseActive = !0),
              Array.prototype.push.apply(
                this._frameCallbacks,
                this._currentFrameCallbacks.splice(0, this._currentFrameCallbacksLength)
              ),
              (this._frameCallbackLength = this._currentFrameCallbacksLength),
              (this._currentFrameCallbacks.length = 0),
              (this._currentFrameCallbacksLength = 0);
          }),
          (a._onAfterRAFExecutorPhase = function() {
            this._phaseActive = !1;
          }),
          (a._cachePhaseIndex = function() {
            this.phaseIndex = this.rafEmitter.executor.phases.indexOf(this.phase);
          }),
          (a._cancelRunningAnimationFrame = function() {
            this._frameCallbacks.splice(this._cancelFrameIdx, 2), (this._frameCallbackLength -= 2);
          }),
          (a._cancelCurrentAnimationFrame = function() {
            this._currentFrameCallbacks.splice(this._cancelFrameIdx, 2),
              (this._currentFrameCallbacksLength -= 2);
          }),
          (a._cancelNextAnimationFrame = function() {
            this._nextFrameCallbacks.splice(this._cancelFrameIdx, 2),
              (this._nextFrameCallbacksLength -= 2),
              0 === this._nextFrameCallbacksLength && this.rafEmitter.cancel();
          }),
          (t.exports = i);
      },
      { './SingleCallRAFEmitter': 62 },
    ],
    61: [
      function(e, t, r) {
        'use strict';
        var n = e('./RAFInterface'),
          i = function() {
            this.events = {};
          },
          a = i.prototype;
        (a.requestAnimationFrame = function(e) {
          return (
            this.events[e] || (this.events[e] = new n(e)), this.events[e].requestAnimationFrame
          );
        }),
          (a.cancelAnimationFrame = function(e) {
            return (
              this.events[e] || (this.events[e] = new n(e)), this.events[e].cancelAnimationFrame
            );
          }),
          (t.exports = new i());
      },
      { './RAFInterface': 60 },
    ],
    62: [
      function(e, t, r) {
        'use strict';
        var n = e('./RAFEmitter'),
          i = function(e) {
            n.call(this, e);
          },
          a = (i.prototype = Object.create(n.prototype));
        (a._subscribe = function() {
          return this.executor.subscribe(this, !0);
        }),
          (t.exports = i);
      },
      { './RAFEmitter': 58 },
    ],
    63: [
      function(e, t, r) {
        'use strict';
        var n = e('./RAFInterfaceController');
        t.exports = n.cancelAnimationFrame('update');
      },
      { './RAFInterfaceController': 61 },
    ],
    64: [
      function(e, t, r) {
        'use strict';
        var n = e('./RAFInterfaceController');
        t.exports = n.requestAnimationFrame('draw');
      },
      { './RAFInterfaceController': 61 },
    ],
    65: [
      function(e, t, r) {
        'use strict';
        var n = e('./RAFInterfaceController');
        t.exports = n.requestAnimationFrame('external');
      },
      { './RAFInterfaceController': 61 },
    ],
    66: [
      function(e, t, r) {
        'use strict';
        var n = e('@marcom/ac-shared-instance').SharedInstance,
          i = e('../.release-info.js').majorVersionNumber,
          a = function() {
            this._currentID = 0;
          };
        (a.prototype.getNewID = function() {
          return this._currentID++, 'raf:' + this._currentID;
        }),
          (t.exports = n.share('@marcom/ac-raf-emitter/sharedRAFEmitterIDGeneratorInstance', i, a));
      },
      { '../.release-info.js': 57, '@marcom/ac-shared-instance': 76 },
    ],
    67: [
      function(e, t, r) {
        'use strict';
        var n = e('@marcom/ac-shared-instance').SharedInstance,
          i = e('../.release-info.js').majorVersionNumber,
          a = e('./RAFExecutor');
        t.exports = n.share('@marcom/ac-raf-emitter/sharedRAFExecutorInstance', i, a);
      },
      { '../.release-info.js': 57, './RAFExecutor': 59, '@marcom/ac-shared-instance': 76 },
    ],
    68: [
      function(e, t, r) {
        'use strict';
        var n = e('./RAFInterfaceController');
        t.exports = n.requestAnimationFrame('update');
      },
      { './RAFInterfaceController': 61 },
    ],
    69: [
      function(e, t, r) {
        'use strict';
        t.exports = { ShaderPlayer2D: e('./ac-shader-player-2d/ShaderPlayer2D') };
      },
      { './ac-shader-player-2d/ShaderPlayer2D': 72 },
    ],
    70: [
      function(e, t, r) {
        'use strict';
        var n =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function(e) {
                  return typeof e;
                }
              : function(e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                },
          i = function(e) {
            (this.w = 0),
              (this.x = 0),
              (this.y = 0),
              (this.z = 0),
              0 !== e &&
                (Array.isArray(e)
                  ? this._setFromArray(e)
                  : 'object' === ('undefined' == typeof e ? 'undefined' : n(e))
                  ? this._setFromObject(e)
                  : 'number' == typeof e
                  ? this._setFromHexNumber(e)
                  : 'string' == typeof e && this._setFromHexString(e));
          },
          a = i.prototype;
        (a._setFromArray = function(e) {
          this._replaceColorVals.apply(this, e);
        }),
          (a._setFromObject = function(e) {
            this._replaceColorVals(e.r, e.g, e.b, e.a);
          }),
          (a._setFromHexNumber = function(e) {
            this._setFromHexString(e.toString(16));
          }),
          (a._setFromHexString = function(e) {
            var t = this._hexToRGB(e);
            this._setFromObject(t);
          }),
          (a._replaceColorVals = function(e, t, r, n) {
            this._replaceColorVal('w', e),
              this._replaceColorVal('x', t),
              this._replaceColorVal('y', r),
              this._replaceColorVal('z', n);
          }),
          (a._replaceColorVal = function(e, t) {
            'undefined' != typeof t &&
              ((t /= 255), t < 0 ? (t = 0) : t > 1 && (t = 1), (this[e] = t));
          }),
          (a._hexToRGB = function(e) {
            var t = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
            e = e.replace(t, function(e, t, r, n) {
              return t + t + r + r + n + n;
            });
            var r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
            return r
              ? { r: parseInt(r[1], 16), g: parseInt(r[2], 16), b: parseInt(r[3], 16) }
              : null;
          }),
          (t.exports = i);
      },
      {},
    ],
    71: [
      function(e, t, r) {
        'use strict';
        var n = function(e) {
            (this.extensions = {}), (this.context = e);
          },
          i = n.prototype;
        (i.get = function(e) {
          if ('undefined' != typeof this.extensions[e]) return this.extensions[e];
          var t,
            r = this.context;
          return (
            (t =
              'EXT_texture_filter_anisotropic' === e
                ? r.getExtension('EXT_texture_filter_anisotropic') ||
                  r.getExtension('MOZ_EXT_texture_filter_anisotropic') ||
                  r.getExtension('WEBKIT_EXT_texture_filter_anisotropic')
                : 'WEBGL_compressed_texture_s3tc' === e
                ? r.getExtension('WEBGL_compressed_texture_s3tc') ||
                  r.getExtension('MOZ_WEBGL_compressed_texture_s3tc') ||
                  r.getExtension('WEBKIT_WEBGL_compressed_texture_s3tc')
                : 'WEBGL_compressed_texture_pvrtc' === e
                ? r.getExtension('WEBGL_compressed_texture_pvrtc') ||
                  r.getExtension('WEBKIT_WEBGL_compressed_texture_pvrtc')
                : r.getExtension(e)),
            null === t ? ((this.extensions[e] = null), null) : ((this.extensions[e] = t), t)
          );
        }),
          (t.exports = n);
      },
      {},
    ],
    72: [
      function(e, t, r) {
        'use strict';
        function n(e) {
          c.call(this),
            (this.options = u(j, e || {})),
            (this.rafEmitter = e.rafEmitter || new l()),
            (this.className = e.className || this.className),
            (this.activeClassName = e.activeClassName || this.activeClassName),
            (this._currentSize = {}),
            (this._textureController = null),
            (this._texturesReady = !0),
            (this._shouldUpdate = !0),
            (this._progressValue = null),
            (this._renderingReady = !1),
            (this._didBindBreakpoint = !1),
            (this._renderCount = 0),
            (this._didRender = !1),
            (this._shouldUpdate = !1),
            (this._shouldResizeOnDraw = !1),
            (this._shouldRenderThisFrame = !1),
            (this._shouldResizeOnDrawThisFrame = !1),
            (this._textureKeyMap = {}),
            (this._textureValMap = {}),
            (this._textureUpdateMap = {}),
            (this._pointer = [0, 0]),
            (this.devicePixelRatio = this._getDevicePixelRatio()),
            (this._breakpointName = this.getCurrentBreakpointName()),
            this._setBreakpointSizes(),
            (this._boundOnUpdate = this._onUpdate.bind(this)),
            (this._boundOnDraw = this._onDraw.bind(this)),
            this.initialize(),
            (this.domEmitter = new h(this.el)),
            this.rafEmitter.on('update', this._boundOnUpdate),
            this.rafEmitter.on('draw', this._boundOnDraw),
            (this._getSizesLength() > 1 || this.options.reloadOnBreakpoint) &&
              ((this._didBindBreakpoint = !0),
              (this._boundOnShaderPlayer2DBreakpoint = this._onShaderPlayer2DBreakpoint.bind(this)),
              f.on('breakpoint', this._boundOnShaderPlayer2DBreakpoint)),
            this._bindDOMEvents();
        }
        var i =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function(e) {
                  return typeof e;
                }
              : function(e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                },
          a = e('./WebGLRenderer'),
          o = e('./Color'),
          s = e('./TextureController'),
          p = e('./vertexShader'),
          c = e('@marcom/ac-event-emitter-micro').EventEmitterMicro,
          u = e('@marcom/ac-object/defaults'),
          g = e('@marcom/ac-object/clone'),
          l = e('@marcom/ac-raf-emitter/RAFEmitter'),
          h = e('@marcom/ac-dom-emitter').DOMEmitter,
          f = e('@marcom/ac-viewport').Viewport,
          j = {
            sizes: {},
            vertexShader: p,
            antialias: !1,
            preserveDrawingBuffer: !1,
            transparent: !1,
            mipmap: 1,
            reloadOnBreakpoint: !1,
            clearColor: 0,
            autoClearColor: !1,
            allowXLarge: !1,
            backgroundOpacity: 0,
            vertexShadersPath: null,
            fragmentShadersPath: null,
            invertX: !1,
            invertY: !1,
            uniforms: {},
            minFilter: 'LINEAR_MIPMAP_LINEAR',
            magFilter: 'LINEAR',
          },
          d = {
            update: 'update',
            draw: 'draw',
            textureLoadStart: 'texture-load-start',
            textureReloadStart: 'texture-reload-start',
            textureLoad: 'texture-load',
            texturesComplete: 'textures-complete',
            resize: 'resize',
          },
          m = (n.prototype = Object.create(c.prototype));
        (m.rendersBeforeVisible = 1),
          (m.className = 'webgl-object'),
          (m.activeClassName = 'active'),
          (m.initialize = function() {
            (this.options.uniforms = this._appendIncludedUniforms(this.options.uniforms)),
              (this.renderer = this.createRenderer()),
              this.options.textures && this._setTextureUniforms(this.options.textures),
              this._initializeRenderer(),
              (this.el = this.renderer.el),
              (this.el.className = this.className),
              this.setSize();
          }),
          (m.load = function() {
            this._textureController &&
              (this.trigger(d.textureLoadStart), this._textureController.load());
          }),
          (m.run = function() {
            (this._shouldRender = !0), this._run();
          }),
          (m.cancel = function() {
            this.rafEmitter.cancel();
          }),
          (m.render = function() {
            (this._shouldRender = !0), this._render();
          }),
          (m.createRenderer = function() {
            return new a(this, this._getRendererOptions());
          }),
          (m.setClearColor = function(e) {
            (e = e || this.options.clearColor),
              (this.options.clearColor = e),
              this.renderer.setClearColor(this._getClearColor(e));
          }),
          (m.setBackgroundOpacity = function(e) {
            (this.options.backgroundOpacity = e), this.setClearColor();
          }),
          (m.setTextureMagFilter = function(e, t) {
            var r = this.getTexture(e);
            return r || 'undefined' === this.renderer.context[t]
              ? ((r.texture.magFilter = this.renderer.context[t]), !0)
              : null;
          }),
          (m.setTextureMinFilter = function(e, t) {
            var r = this.getTexture(e);
            return r || 'undefined' === this.renderer.context[t]
              ? ((r.texture.minFilter = this.renderer.context[t]), !0)
              : null;
          }),
          (m.createTextureController = function(e) {
            (e = e || {}),
              this.options.allowXLarge && (e.allowXLarge = !0),
              this.options.magFilter && (e.magFilter = this.options.magFilter),
              this.options.minFilter && (e.minFilter = this.options.minFilter),
              (this._textureController = new s(this, e)),
              (this._boundOnTextureControllerLoad = this._onTextureControllerLoad.bind(this)),
              (this._boundOnTextureControllerComplete = this._onTextureControllerComplete.bind(
                this
              )),
              (this._boundOnTextureControllerReadyStateChanged = this._onTextureControllerReadyStateChanged.bind(
                this
              )),
              this._textureController.on('load', this._boundOnTextureControllerLoad),
              this._textureController.on('complete', this._boundOnTextureControllerComplete),
              this._textureController.on(
                'readystatechanged',
                this._boundOnTextureControllerReadyStateChanged
              );
          }),
          (m.getSizesForBreakpoint = function(e) {
            return (
              (e = e || f.getBreakpoint().name),
              this.options.sizes[e] || (e = 'defaults'),
              { name: e, sizes: this.options.sizes[e] }
            );
          }),
          (m.getUniform = function(e) {
            return this.renderer ? this.renderer.getUniform(e) : null;
          }),
          (m.setUniform = function(e, t) {
            return !!this.renderer && this.renderer.setUniform(e, t);
          }),
          (m.getAttribute = function(e) {
            return this.renderer ? this.renderer.getAttribute(e) : null;
          }),
          (m.setAttribute = function(e, t) {
            return !!this.renderer && this.renderer.setAttribute(e, t);
          }),
          (m.setUniforms = function(e) {
            if ('object' !== ('undefined' == typeof e ? 'undefined' : i(e))) return !1;
            var t;
            for (t in e) e.hasOwnProperty(t) && this.setUniform(t, e[t]);
          }),
          (m.setSize = function(e, t) {
            'undefined' != typeof e && (this.width = e),
              'undefined' != typeof t && (this.height = t),
              (this._shouldResizeOnDraw = !0),
              this._run();
          }),
          (m.setBasePath = function(e) {
            this._textureController && (this._textureController.options.basePath = e);
          }),
          (m.setActive = function() {
            this.el.classList.add(this.activeClassName), (this._renderingReady = !0);
          }),
          (m.setInactive = function() {
            this.el.classList.remove(this.activeClassName),
              (this._renderCount = 0),
              (this._renderingReady = !1);
          }),
          (m.getTexture = function(e) {
            return this.renderer && this._textureController
              ? ('undefined' != typeof this._textureKeyMap[e] && (e = this._textureKeyMap[e]),
                this._textureController.getTexture(e))
              : null;
          }),
          (m.setTexture = function(e, t) {}),
          (m.getCurrentBreakpointName = function() {
            var e = f.getBreakpoint().name;
            return this.options.allowXLarge || 'xlarge' !== e || (e = 'large'), e;
          }),
          (m.getTextures = function() {
            var e,
              t = {};
            for (e in this._textureKeyMap)
              this._textureKeyMap.hasOwnProperty(e) && (t[e] = this.getTexture(e));
            return t;
          }),
          (m.getTextureControllerTextures = function() {
            if (!this._textureController) return null;
            var e,
              t = {},
              r = this._textureController._textureLoader.textures;
            for (e in r) r.hasOwnProperty(e) && (t[e] = r[e].texture);
            return t;
          }),
          (m.refreshTexture = function(e) {
            this._textureUpdateMap[e] = !0;
          }),
          (m.destroy = function() {
            this.rafEmitter.destroy(),
              this._textureController && this._textureController.destroy(),
              this._didBindBreakpoint && f.off('breakpoint', this._boundOnShaderPlayer2DBreakpoint),
              this.domEmitter.destroy();
            var e;
            for (e in this) this.hasOwnProperty(e) && (this[e] = null);
            c.prototype.destroy.call(this);
          }),
          (m._onTextureControllerLoad = function(e) {
            this.trigger(d.textureLoad, e);
          }),
          (m._onTextureControllerComplete = function() {
            (this._texturesReady = !0), this.trigger(d.texturesComplete);
          }),
          (m._onTextureControllerReadyStateChanged = function(e) {
            this._texturesReady = e.texturesReady;
          }),
          (m._setTextureUniforms = function(e) {
            var t,
              r,
              n,
              i = this.renderer.context;
            for (t in e)
              e.hasOwnProperty(t) &&
                ((n = e[t]),
                (r = n.name || t),
                this._textureController || this.createTextureController(),
                n.el || this._texturesRequired++,
                (this._textureKeyMap[t] = r),
                (this._textureValMap[r] = t),
                (this.options.uniforms[t] = {
                  type: 'sampler2D',
                  value: this._textureController.createTexture(i, r, n),
                }));
          }),
          (m._setTime = function(e) {
            this.setUniform('time', e / 1e3);
          }),
          (m._setResolution = function() {
            this.setUniform('resolution', [this.width, this.height]);
          }),
          (m._setPointer = function(e, t) {
            this.options.invertX && (e = 1 - e),
              this.options.invertY && (t = 1 - t),
              (this._pointer[0] = e),
              (this._pointer[1] = t),
              (this._pointerChanged = !0),
              this.trigger('pointer', this._pointer);
          }),
          (m._getDevicePixelRatio = function() {
            return this.options.devicePixelRatio
              ? this.options.devicePixelRatio
              : window.devicePixelRatio || 1;
          }),
          (m._onShaderPlayer2DBreakpoint = function(e) {
            var t = this.getCurrentBreakpointName();
            this._breakpointName !== t &&
              ((this._breakpointName = t),
              this._shouldChangeSize(t) && this._setBreakpointSizes(),
              this.options.reloadOnBreakpoint &&
                this._textureController &&
                ((this._texturesReady = !1),
                this.setInactive(),
                this._textureController.load(),
                this.trigger(d.textureReloadStart)));
          }),
          (m._getSizesLength = function() {
            return Object.keys(this.options.sizes).length;
          }),
          (m._shouldChangeSize = function(e) {
            var t = this.getSizesForBreakpoint(e);
            return (
              t.sizes.width !== this._currentSize.sizes.width ||
              t.sizes.height !== this._currentSize.sizes.height
            );
          }),
          (m._setBreakpointSizes = function() {
            var e = this.getSizesForBreakpoint();
            (this._currentSize = e),
              this.setSize(e.sizes.width, e.sizes.height),
              this.trigger(d.resize);
          }),
          (m._appendIncludedUniforms = function(e) {
            return (
              (e = e || {}),
              e.progress || (e.progress = { type: 'float', value: 0 }),
              e.time || (e.time = { type: 'float', value: 0 }),
              e.resolution || (e.resolution = { type: 'vec2', value: [this.width, this.height] }),
              e.pointer || (e.pointer = { type: 'vec2', value: [0, 0] }),
              g(e, !0)
            );
          }),
          (m._setInitialUniforms = function() {
            if (this.options && this.options.uniforms) {
              var e;
              for (e in this.options.uniforms)
                this.options.uniforms.hasOwnProperty(e) &&
                  this.setUniform(e, this.options.uniforms[e].value);
            }
          }),
          (m._onUpdate = function(e) {
            (this._shouldRenderThisFrame = this._shouldRender),
              (this._shouldResizeOnDrawThisFrame = this._shouldResizeOnDraw),
              (this._shouldRender = !1),
              (this._shouldResizeOnDraw = !1),
              this._shouldRenderThisFrame && this.trigger(d.update, e);
          }),
          (m._onDraw = function(e) {
            this._shouldResizeOnDrawThisFrame && this._setSize(),
              this._pointerChanged && this.setUniform('pointer', this._pointer),
              this._shouldRenderThisFrame &&
                (this._setTime(e.time), this.trigger(d.draw, e), this._render());
          }),
          (m._refreshTexture = function(e) {
            var t = this.getTexture(e);
            return t
              ? (this.setUniform(e, t.texture.bind(t.unit)), void t.texture.setPixels(t.el))
              : null;
          }),
          (m._bindDOMEvents = function() {
            this.domEmitter.on('mousemove', this._handleMouseMove, this),
              this.domEmitter.on('touchmove', this._handleTouchMove, this);
          }),
          (m._getClearColor = function(e) {
            var t = new o(e);
            return (t.z = this.options.backgroundOpacity), t;
          }),
          (m._initializeRenderer = function() {
            this.renderer.initialize(this._getRendererOptions());
          }),
          (m._getRendererOptions = function() {
            return {
              clearColor: this._getClearColor(this.options.clearColor),
              transparent: this.options.transparent,
              fragmentShader: this.options.fragmentShader,
              vertexShader: this.options.vertexShader,
              uniforms: this.options.uniforms,
              antialias: this.options.antialias,
            };
          }),
          (m._handleMouseMove = function(e) {
            this._setPointer(
              e.originalEvent.offsetX / this.width,
              1 - e.originalEvent.offsetY / this.height
            );
          }),
          (m._handleTouchMove = function(e) {
            this._setPointer(
              e.originalEvent.touches[0].offsetX / this.width,
              1 - e.originalEvent.touches[0].offsetY / this.height
            );
          }),
          (m._run = function() {
            this.rafEmitter.run();
          }),
          (m._render = function() {
            if (this.renderer && this._texturesReady) {
              if (
                (this._didRender ||
                  (this._setInitialUniforms(), (this._didRender = !0), this.run()),
                this._renderCount++,
                !this._renderingReady)
              ) {
                if (this._renderCount < this.rendersBeforeVisible) return;
                this.setActive();
              }
              this.renderer.render(this.scene, this.camera);
            }
          }),
          (m._setSize = function() {
            this._setResolution(),
              this.renderer &&
                this.renderer.setSize(
                  this.width * this.devicePixelRatio,
                  this.height * this.devicePixelRatio,
                  this.options.mipmap
                ),
              this.el &&
                ((this.el.style.width = this.width + 'px'),
                (this.el.style.height = this.height + 'px'));
          }),
          (t.exports = n);
      },
      {
        './Color': 70,
        './TextureController': 73,
        './WebGLRenderer': 74,
        './vertexShader': 75,
        '@marcom/ac-dom-emitter': 4,
        '@marcom/ac-event-emitter-micro': 34,
        '@marcom/ac-object/clone': 43,
        '@marcom/ac-object/defaults': 45,
        '@marcom/ac-raf-emitter/RAFEmitter': 58,
        '@marcom/ac-viewport': 81,
      },
    ],
    73: [
      function(e, t, r) {
        'use strict';
        var n,
          i = e('@marcom/ac-event-emitter-micro').EventEmitterMicro,
          a = e('@marcom/ac-object/defaults'),
          o = e('@marcom/ac-texture-loader').TextureLoader,
          s = e('gl-texture2d'),
          p = function(e, t) {
            i.call(this),
              (this.options = t || {}),
              (this.controller = e),
              (this.options.basePath = this.options.basePath || window.location.pathname),
              (this._textureLoader = new o(this.options)),
              (this._texturesRequired = 0),
              (this._texturesLoaded = 0),
              this._textureLoader.on('load', this._handleTextureLoaderLoaded.bind(this));
          };
        (n = p.prototype = Object.create(i.prototype)),
          (n.createTexture = function(e, t, r) {
            if (this._textureLoader.textures[t])
              throw 'Existing texture "' + t + '" already registered.';
            if (!e) throw 'Textures require a WebGL context in order to be created.';
            return (
              (r = a(this.options, r || {})),
              this._textureLoader.createTexture(e, t, r),
              r.el ? this.createTextureFromElement(e, t, r.el) : this._texturesRequired++,
              this.getTexture(t)
            );
          }),
          (n.createTextureFromElement = function(e, t, r) {
            var n = s(e, r),
              i = this.getTextureDimensions(r);
            (this._textureLoader.textures[t].texture = n),
              (this._textureLoader.textures[t].isElement = !0),
              (this._textureLoader.textures[t].el = r),
              this.bindTexture(t, n, i.width, i.height);
          }),
          (n.getTexture = function(e) {
            return this._textureLoader ? this._textureLoader.textures[e] : null;
          }),
          (n.load = function(e) {
            if (((e = a(this.options, e || {})), (this._texturesLoaded = 0), this._textureLoader)) {
              var t;
              for (t in this._textureLoader.textures)
                this._textureLoader.textures.hasOwnProperty(t) &&
                  !this._textureLoader.textures[t].isElement &&
                  this._textureLoader.load(t, e);
            }
          }),
          (n.bindTexture = function(e, t, r, n) {
            this._isPowerOfTwo(r) && this._isPowerOfTwo(n)
              ? (t.generateMipmap(),
                this.options.magFilter && (t.magFilter = t.gl[this.options.magFilter]),
                this.options.minFilter && (t.minFilter = t.gl[this.options.minFilter]))
              : ((t.magFilter = t.gl.LINEAR),
                (t.minFilter = t.gl.LINEAR),
                (t.wrapT = t.gl.CLAMP_TO_EDGE),
                (t.wrapS = t.gl.CLAMP_TO_EDGE)),
              this.controller.shader && this.controller.renderer.bindTexture(e);
          }),
          (n.getTextureDimensions = function(e) {
            var t = e.width,
              r = e.height;
            return (
              e instanceof HTMLVideoElement && ((t = e.videoWidth), (r = e.videoHeight)),
              { width: t, height: r }
            );
          }),
          (n.destroy = function() {
            this._textureLoader.destroy();
            var e;
            for (e in this) this.hasOwnProperty(e) && (this[e] = null);
            i.prototype.destroy.call(this);
          }),
          (n._handleTextureLoaderLoaded = function(e) {
            if (this.controller && this.controller.renderer) {
              var t = this.controller._textureValMap[e.name],
                r = this.getTextureDimensions(e.el);
              this.bindTexture(t, e.texture, r.width, r.height);
            }
            this.trigger('load', e),
              this._texturesLoaded++,
              this._texturesLoaded === this._texturesRequired && this.trigger('complete');
          }),
          (n._isPowerOfTwo = function(e) {
            return 0 === (e & (e - 1));
          }),
          (t.exports = p);
      },
      {
        '@marcom/ac-event-emitter-micro': 34,
        '@marcom/ac-object/defaults': 45,
        '@marcom/ac-texture-loader': 78,
        'gl-texture2d': 156,
      },
    ],
    74: [
      function(e, t, r) {
        'use strict';
        var n,
          i = e('@marcom/ac-event-emitter-micro').EventEmitterMicro,
          a = e('./ExtensionsController'),
          o = e('a-big-triangle'),
          s = e('gl-shader-core'),
          p = { clearDepth: 1, clearColor: [0, 0, 0, 0], clearStencil: 0 },
          c = [
            'OES_texture_float',
            'OES_texture_float_linear',
            'OES_texture_half_float',
            'OES_texture_half_float_linear',
            'OES_standard_derivatives',
          ],
          u = function(e, t) {
            i.call(this), (this.options = this._initializeOptions(t)), (this.controller = e);
            var r = document.createElement('canvas'),
              n =
                r.getContext('webgl', this.options) ||
                r.getContext('experimental-webgl', this.options);
            return n
              ? ((this.el = r), void (this.context = n))
              : (this.trigger('error', 'Unable to initialize WebGL'), null);
          };
        (n = u.prototype = Object.create(u.prototype)),
          (n.initialize = function(e) {
            var t = this.context;
            (this.options = this._initializeOptions(e)),
              (this._shouldClearColor = !0),
              (this.options._transformedUniforms = this.transformShaderParameters(
                this.options.uniforms
              )),
              this.options.attributes &&
                (this.options._transformedAttributes = this.transformShaderParameters(
                  this.options.attributes
                ));
            var r = {};
            r.clearFlags =
              void 0 === this.options.clearFlags
                ? t.COLOR_BUFFER_BIT | t.DEPTH_BUFFER_BIT
                : this.options.clearFlags;
            var n;
            for (n in p)
              p.hasOwnProperty(n) &&
                ((r[n] = p[n]), 'undefined' != typeof this.options[n] && (r[n] = this.options[n]));
            (this._renderSettings = r),
              (this.shader = this.createShader(
                t,
                this.options.vertexShader,
                this.options.fragmentShader,
                this.options._transformedUniforms,
                this.options._transformedAttributes
              )),
              t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL, !0),
              t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1),
              (this.extensions = new a(this.context));
            var i = c.length;
            for (n = 0; n < i; n++) this.extensions.get(c[n]);
            this.bindShader();
          }),
          (n.createShader = function(e, t, r, n, i) {
            var a = this._normalizeShaderParams({
              context: e,
              vertexShader: t,
              fragmentShader: r,
              uniforms: n || [],
              attributes: i || [],
            });
            return s(a.context, a.vertexShader, a.fragmentShader, a.uniforms, a.attributes);
          }),
          (n.linkProgram = function(e, t, r) {
            var n = e.createProgram();
            e.attachShader(n, t), e.attachShader(n, r), e.linkProgram(n), e.useProgram(n);
          }),
          (n.bindShader = function() {
            this.shader.bind();
          }),
          (n.bindTextures = function() {
            if (this.controller && this.controller.options && this.controller.options.textures) {
              var e,
                t = this.controller.options.textures;
              for (e in t) t.hasOwnProperty(e) && this.bindTexture(e);
            }
          }),
          (n.bindTexture = function(e, t) {
            var r = this.controller.getTexture(e);
            return (
              !!r &&
              void (t || this.controller._textureUpdateMap[e]
                ? (this.controller._refreshTexture(e), (this.controller._textureUpdateMap[e] = !1))
                : this.setUniform(e, r.texture.bind(r.unit)))
            );
          }),
          (n.setClearColor = function(e) {
            (this._renderSettings.clearColor = e), (this._shouldClearColor = !0);
          }),
          (n.clearColor = function() {
            var e = this.context,
              t = this._renderSettings;
            e.bindFramebuffer(e.FRAMEBUFFER, null),
              t.clearFlags & e.STENCIL_BUFFER_BIT && e.clearStencil(t.clearStencil),
              t.clearFlags & e.COLOR_BUFFER_BIT &&
                e.clearColor(t.clearColor.w, t.clearColor.x, t.clearColor.y, t.clearColor.z),
              t.clearFlags & e.DEPTH_BUFFER_BIT && e.clearDepth(t.clearDepth),
              t.clearFlags &&
                e.clear(e.COLOR_BUFFER_BIT | e.DEPTH_BUFFER_BIT | e.STENCIL_BUFFER_BIT);
          }),
          (n.render = function() {
            (this.options.autoClearColor || this._shouldClearColor) &&
              (this.clearColor(), (this._shouldClearColor = !1)),
              this.bindShader(),
              this.bindTextures(),
              o(this.context);
          }),
          (n.updateShader = function(e) {
            (e = e || {}),
              e.uniforms && (e.uniforms = this.transformShaderParameters(e.uniforms)),
              (e.vertexShader = e.vertexShader || this.options.vertexShader),
              (e.fragmentShader = e.fragmentShader || this.options.fragmentShader),
              (e.uniforms = e.uniforms || this.options.uniforms),
              (e.attributes = e.attributes || this.options.attributes),
              (e = this._normalizeShaderParams(e)),
              this.shader.dispose(),
              (this.shader = this.createShader(
                this.context,
                e.vertexShader,
                e.fragmentShader,
                e.uniforms,
                e.attributes
              )),
              (this.options.vertexShader = e.vertexShader),
              (this.options.fragmentShader = e.fragmentShader),
              (this.options.uniforms = e.uniforms),
              (this.options.attributes = e.attributes);
          }),
          (n.getUniform = function(e) {
            return this._hasUniform(e) ? this.options.uniforms[e].value : null;
          }),
          (n.setUniform = function(e, t) {
            this._hasUniform(e) &&
              ((this.options.uniforms[e].value = t), (this.shader.uniforms[e] = t));
          }),
          (n.getAttribute = function(e, t) {
            return this.shader ? this.shader.attributes[e] : null;
          }),
          (n.setAttribute = function(e, t) {
            this.shader && (this.shader.attributes[e] = t);
          }),
          (n.setSize = function(e, t, r) {
            var n = e * r,
              i = t * r;
            this.el.setAttribute('width', n),
              this.el.setAttribute('height', i),
              (this.el.style.width = e + 'px'),
              (this.el.style.height = t + 'px'),
              this.context.viewport(0, 0, 0 | n, 0 | i);
          }),
          (n.transformShaderParameters = function(e) {
            e = e || {};
            var t,
              r = [];
            for (t in e) e.hasOwnProperty(t) && r.push({ name: t, type: e[t].type });
            return r;
          }),
          (n.destroy = function() {
            this.shader.dispose(), i.prototype.destroy.call(this);
          }),
          (n._normalizeShaderParams = function(e) {
            return (
              this.options.setFloatPrecision !== !1 &&
                (e.fragmentShader = 'precision highp float;\n' + e.fragmentShader),
              e
            );
          }),
          (n._initializeOptions = function(e) {
            return (e.alpha = e.transparent), e;
          }),
          (n._hasUniform = function(e) {
            return this.options || this.options.uniforms || this.options.uniforms[e];
          }),
          (t.exports = u);
      },
      {
        './ExtensionsController': 71,
        '@marcom/ac-event-emitter-micro': 34,
        'a-big-triangle': 131,
        'gl-shader-core': 155,
      },
    ],
    75: [
      function(e, t, r) {
        'use strict';
        t.exports =
          'attribute vec3 position;\t\t\t\t\tvarying vec2 vUV;\t\t\t\t\tvoid main() {\t\t\t\t\t\tgl_Position = vec4(position, 1.0);\t\t\t\t\t\tvUV = position.xy * 0.5 + 0.5;\t\t\t\t\t}';
      },
      {},
    ],
    76: [
      function(e, t, r) {
        'use strict';
        t.exports = { SharedInstance: e('./ac-shared-instance/SharedInstance') };
      },
      { './ac-shared-instance/SharedInstance': 77 },
    ],
    77: [
      function(e, t, r) {
        'use strict';
        var n =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function(e) {
                  return typeof e;
                }
              : function(e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                },
          i = window,
          a = 'AC',
          o = 'SharedInstance',
          s = i[a],
          p = (function() {
            var e = {};
            return {
              get: function(t, r) {
                var n = null;
                return e[t] && e[t][r] && (n = e[t][r]), n;
              },
              set: function(t, r, n) {
                return (
                  e[t] || (e[t] = {}),
                  'function' == typeof n ? (e[t][r] = new n()) : (e[t][r] = n),
                  e[t][r]
                );
              },
              share: function(e, t, r) {
                var n = this.get(e, t);
                return n || (n = this.set(e, t, r)), n;
              },
              remove: function(t, r) {
                var i = 'undefined' == typeof r ? 'undefined' : n(r);
                if ('string' === i || 'number' === i) {
                  if (!e[t] || !e[t][r]) return;
                  return void (e[t][r] = null);
                }
                e[t] && (e[t] = null);
              },
            };
          })();
        s || (s = i[a] = {}), s[o] || (s[o] = p), (t.exports = s[o]);
      },
      {},
    ],
    78: [
      function(e, t, r) {
        'use strict';
        t.exports = { TextureLoader: e('./ac-texture-loader/TextureLoader') };
      },
      { './ac-texture-loader/TextureLoader': 79 },
    ],
    79: [
      function(e, t, r) {
        'use strict';
        function n(e) {
          i.call(this),
            (e = e || {}),
            (this.options = o.defaults(u, e)),
            (this.textureUnitCount = 0),
            (this._boundOnBreakpoint = this._onBreakpoint.bind(this)),
            c.on('breakpoint', this._boundOnBreakpoint),
            this._onBreakpoint(),
            (this.textures = {});
        }
        var i = e('@marcom/ac-event-emitter-micro').EventEmitterMicro,
          a = e('gl-texture2d'),
          o = e('@marcom/ac-object'),
          s = e('ac-cname').cname,
          p = e('@marcom/ac-dom-emitter').DOMEmitter,
          c = e('@marcom/ac-viewport').Viewport,
          u = {
            basePath: '/',
            ignoreBreakpoint: !1,
            type: 'image',
            extension: 'png',
            allowXLarge: !1,
            timeout: 5e3,
          },
          g = ['mp4'],
          l = (n.prototype = Object.create(i.prototype));
        (l.createTexture = function(e, t, r) {
          var n = this._getTextureDOMElement(r);
          return (
            (this.textures[t] = {
              texture: {},
              el: n,
              unit: this.textureUnitCount,
              context: e,
              options: r || {},
            }),
            this.textureUnitCount++,
            this.textures[t].texture
          );
        }),
          (l.load = function(e, t) {
            if ('string' != typeof e) return !1;
            var r = this.textures[e];
            r || (this.createTexture(e, t), (r = this.textures[e]));
            var n = o.defaults(r.options, t || {}),
              i = this.getAssetPath(e, n),
              a = new XMLHttpRequest();
            return (
              a.open('GET', i, !0),
              (a.responseType = 'arraybuffer'),
              (a.onload = this._handleXHRLoaded.bind(this, e, r, n, a)),
              a.send(null),
              r.texture
            );
          }),
          (l.emptyTextureCache = function() {
            var e;
            for (e in this.textures)
              this.textures.hasOwnProperty(e) && this.textures[e].texture.dispose();
            this.textures = {};
          }),
          (l.getAssetPath = function(e, t) {
            t = o.defaults(this.options, t || {});
            var r = t.basePath,
              n = t.extension,
              i = '',
              a = '_2x';
            if (((n = '.' + n), !t.ignoreBreakpoint)) {
              var p = this.breakpointName;
              'xlarge' !== p || t.allowXLarge || (p = 'large'), (i += '_' + p);
            }
            if (t.retina === !0) i += a;
            else if (t.retina === !1) i += '';
            else {
              var c = '';
              window.devicePixelRatio > 1.5 && (c = a), (i += c);
            }
            return s.formatUrl(r, e + i, n);
          }),
          (l.cancelXHR = function() {}),
          (l.destroy = function() {
            this.emptyTextureCache(),
              this.cancelXHR(),
              c.off('breakpoint', this._boundOnBreakpoint);
            var e;
            for (e in this) this.hasOwnProperty(e) && (this[e] = null);
          }),
          (l._getTextureDOMElement = function(e) {
            var t = 'img';
            return g.indexOf(e.extension) > -1 && (t = 'video'), document.createElement(t);
          }),
          (l._handleXHRLoaded = function(e, t, r, n) {
            if (n.status >= 400) return this.trigger('error', { name: e, xhr: n }), void (n = null);
            var i = window.URL || window.webkitURL,
              a = 'image',
              o = t.el.tagName.toLowerCase();
            'video' === o && (a = 'video');
            var s = new Uint8Array(n.response),
              c = new Blob([s], { type: a + '/' + r.extension }),
              u = i.createObjectURL(c),
              g = new p(t.el),
              l = 'load';
            'video' === o && (l = 'canplay'),
              g.on(l, this._onImageBlobTextureLoaded.bind(this, e, t, g, n)),
              (t.el.src = u);
          }),
          (l._onImageBlobTextureLoaded = function(e, t, r, n) {
            (t.texture = a(t.context, t.el)),
              (this.textures[e] = t),
              this.trigger('load', { name: e, texture: t.texture, el: t.el }),
              r.destroy(),
              (n = r = null);
          }),
          (l._onBreakpoint = function() {
            this.breakpointName = c.getBreakpoint().name;
          }),
          (t.exports = n);
      },
      {
        '@marcom/ac-dom-emitter': 4,
        '@marcom/ac-event-emitter-micro': 34,
        '@marcom/ac-object': 42,
        '@marcom/ac-viewport': 81,
        'ac-cname': 132,
        'gl-texture2d': 156,
      },
    ],
    80: [
      function(e, t, r) {
        'use strict';
        t.exports = function(e, t) {
          var r = '&',
            n = '';
          if (e) {
            var i = Object.keys(e),
              a = i.length - 1;
            i.forEach(function(t, i) {
              var o = e[t];
              (t = t.trim()),
                (o = o && 'string' == typeof o ? o.trim() : o),
                (o = null === o ? '' : '=' + o);
              var s = t + o + (i === a ? '' : r);
              n = n ? n.concat(s) : s;
            });
          }
          return n && t !== !1 ? '?' + n : n;
        };
      },
      {},
    ],
    81: [
      function(e, t, r) {
        'use strict';
        t.exports = { Viewport: e('./ac-viewport/Viewport') };
      },
      { './ac-viewport/Viewport': 82 },
    ],
    82: [
      function(e, t, r) {
        'use strict';
        function n(e) {
          var t,
            r = o;
          for (t in r) r.hasOwnProperty(t) ? (this[t] = r[t]) : (i[t] = r[t]);
          this.addCustomEvent(s.getCustomEvent());
        }
        var i,
          a = e('@marcom/ac-shared-instance').SharedInstance,
          o = e('@marcom/ac-window-delegate').WindowDelegate,
          s = e('@marcom/ac-breakpoints-delegate').BreakpointsDelegate,
          p = 'ac-viewport:Viewport',
          c = '3.2.0';
        (i = n.prototype),
          (i.getBreakpoint = function() {
            return s.getBreakpoint();
          }),
          (i.setBreakpoints = function(e) {
            return s.setBreakpoints(e);
          }),
          (t.exports = a.share(p, c, n));
      },
      {
        '@marcom/ac-breakpoints-delegate': 2,
        '@marcom/ac-shared-instance': 76,
        '@marcom/ac-window-delegate': 83,
      },
    ],
    83: [
      function(e, t, r) {
        'use strict';
        t.exports = {
          WindowDelegate: e('./ac-window-delegate/WindowDelegate'),
          WindowDelegateOptimizer: e('./ac-window-delegate/WindowDelegateOptimizer'),
          WindowDelegateCustomEvent: e('./ac-window-delegate/WindowDelegateCustomEvent'),
        };
      },
      {
        './ac-window-delegate/WindowDelegate': 86,
        './ac-window-delegate/WindowDelegateCustomEvent': 87,
        './ac-window-delegate/WindowDelegateOptimizer': 88,
      },
    ],
    84: [
      function(e, t, r) {
        'use strict';
        var n = e('@marcom/ac-event-emitter').EventEmitter,
          i = function() {
            (this._emitter = new n()), (this._customEvents = {});
          },
          a = i.prototype;
        (a.on = function(e, t, r) {
          return this._activateCustomEvents(e), this._emitterOn.apply(this, arguments), this;
        }),
          (a.once = function(e, t, r) {
            return this._emitterOnce.apply(this, arguments), this;
          }),
          (a.off = function(e, t, r) {
            return this._emitterOff.apply(this, arguments), this._deactivateCustomEvents(e), this;
          }),
          (a.has = function(e, t, r) {
            return this._emitter.has.apply(this._emitter, arguments);
          }),
          (a.trigger = function() {
            return this._emitter.trigger.apply(this._emitter, arguments), this;
          }),
          (a.propagateTo = function() {
            return this._emitter.propagateTo.apply(this._emitter, arguments), this;
          }),
          (a.stopPropagatingTo = function() {
            return this._emitter.stopPropagatingTo.apply(this._emitter, arguments), this;
          }),
          (a.add = function(e) {
            this._customEvents[e.name] = e;
          }),
          (a.canHandleCustomEvent = function(e) {
            return this._customEvents.hasOwnProperty(e);
          }),
          (a.isHandlingCustomEvent = function(e) {
            return !(!this._customEvents[e] || !this._customEvents[e].active);
          }),
          (a._activateCustomEvents = function(e) {
            var t,
              r,
              n = e.split(' '),
              i = n.length;
            for (r = 0; r < i; r++)
              (t = n[r]),
                this._customEvents[t] &&
                  !this._customEvents[t].active &&
                  (this._customEvents[t].initialize(), (this._customEvents[t].active = !0));
          }),
          (a._deactivateCustomEvents = function(e) {
            var t;
            if (e && 0 !== e.length) {
              var r = e.split(' '),
                n = r.length;
              for (t = 0; t < n; t++) this._deactivateCustomEvent(r[t]);
            } else
              for (t in this._customEvents)
                this._customEvents.hasOwnProperty(t) && this._deactivateCustomEvent(t);
          }),
          (a._deactivateCustomEvent = function(e) {
            !this.has(e) &&
              this._customEvents[e] &&
              this._customEvents[e].active &&
              (this._customEvents[e].deinitialize(), (this._customEvents[e].active = !1));
          }),
          (a._emitterOn = function() {
            this._emitter.on.apply(this._emitter, arguments);
          }),
          (a._emitterOnce = function() {
            this._emitter.once.apply(this._emitter, arguments);
          }),
          (a._emitterOff = function() {
            this._emitter.off.apply(this._emitter, arguments);
          }),
          (t.exports = i);
      },
      { '@marcom/ac-event-emitter': 36 },
    ],
    85: [
      function(e, t, r) {
        'use strict';
        var n,
          i = e('@marcom/ac-event-emitter').EventEmitter,
          a = function(e) {
            i.call(this),
              (this.optimizers = e),
              (this._events = {}),
              (this._properties = {}),
              this._initialize();
          };
        (n = a.prototype = new i(null)),
          (n.canOptimizeEvent = function(e) {
            return this._events.hasOwnProperty(e);
          }),
          (n.canOptimizeProperty = function(e) {
            return this._properties.hasOwnProperty(e);
          }),
          (n.isOptimizingEvent = function(e) {
            return !(!this._events[e] || !this._events[e].active);
          }),
          (n.isOptimizingProperty = function(e) {
            return !(!this._properties[e] || !this._properties[e].active);
          }),
          (n.add = function(e) {
            this._setOptimizerEvents(e),
              this._setOptimizerProperties(e),
              e.on('update', this._onUpdate, this),
              e.on('activate', this._onActivate, this),
              e.on('deactivate', this._onDeactivate, this);
          }),
          (n.get = function(e) {
            return this.isOptimizingProperty(e) ? this._properties[e].value : null;
          }),
          (n.set = function(e, t) {
            return !!this._properties[e] && ((this._properties[e].value = t), this);
          }),
          (n.getOptimizerByEvent = function(e) {
            return this._events[e] ? this._events[e] : null;
          }),
          (n._initialize = function() {
            var e;
            for (e in this.optimizers)
              this.optimizers.hasOwnProperty(e) && this.add(this.optimizers[e]);
          }),
          (n._onUpdate = function(e) {
            this.set(e.prop, e.val);
          }),
          (n._onActivate = function(e) {
            var t,
              r = e.propertyNames,
              n = r.length;
            for (t = 0; t < n; t++) this._properties[r[t]].active = !0;
          }),
          (n._onDeactivate = function(e) {
            var t,
              r = e.propertyNames,
              n = r.length;
            for (t = 0; t < n; t++) this._properties[r[t]].active = !1;
          }),
          (n._setOptimizerEvents = function(e) {
            var t,
              r = e.eventNames,
              n = r.length;
            for (t = 0; t < n; t++) this._setOptimizerEvent(r[t], e);
          }),
          (n._setOptimizerEvent = function(e, t) {
            this._events[e] || (this._events[e] = t);
          }),
          (n._setOptimizerProperties = function(e) {
            var t,
              r = e.propertyNames,
              n = r.length;
            for (t = 0; t < n; t++) this._setOptimizerProperty(r[t]);
          }),
          (n._setOptimizerProperty = function(e) {
            this._properties.hasOwnProperty(e) ||
              ((this._properties[e] = {}),
              (this._properties[e].active = !1),
              (this._properties[e].value = null));
          }),
          (t.exports = a);
      },
      { '@marcom/ac-event-emitter': 36 },
    ],
    86: [
      function(e, t, r) {
        'use strict';
        function n() {
          (this._emitter = new o(window)),
            (this._controllers = { optimizer: new s(u), customEvent: new p() });
          var e;
          for (e in c)
            c.hasOwnProperty(e) &&
              ((this[e] = this._getProperty.bind(this, e)), (c[e] = c[e].bind(this)));
          this._bindEvents();
        }
        var i,
          a = e('@marcom/ac-shared-instance').SharedInstance,
          o = e('@marcom/ac-dom-emitter').DOMEmitter,
          s = e('./OptimizerController'),
          p = e('./CustomEventController'),
          c = e('./queries/queries'),
          u = e('./optimizers/optimizers'),
          g = 'ac-window-delegate:WindowDelegate',
          l = '3.0.2';
        (i = n.prototype),
          (i.on = function(e, t, r) {
            var n = this._seperateCustomEvents(e);
            return (
              this._optimizeEvents(n.standardEvents),
              this._customEventOn(n.customEvents, t, r),
              this._emitterOn.apply(this, arguments),
              this
            );
          }),
          (i.once = function(e, t, r) {
            var n = this._seperateCustomEvents(e);
            return (
              this._optimizeEvents(n.standardEvents),
              this._customEventOnce(n.customEvents, t, r),
              this._emitterOnce.apply(this, arguments),
              this
            );
          }),
          (i.off = function(e, t, r) {
            var n = this._seperateCustomEvents(e),
              i = !1;
            if (
              (e || (i = !0),
              this._customEventOff(n.customEvents, t, r, i),
              this._emitterOff.apply(this, arguments),
              i)
            )
              try {
                var a;
                for (a in this._controllers.optimizer._events)
                  this._controllers.optimizer._events.hasOwnProperty(a) &&
                    this._shouldDeoptimizeEvent(a, !0) &&
                    this._deoptimizeEvent(a);
                this._bindEvents();
              } catch (o) {}
            return this;
          }),
          (i.has = function(e, t, r) {
            return this._emitter.has.apply(this._emitter, arguments);
          }),
          (i.trigger = function() {
            return this._emitter.trigger.apply(this._emitter, arguments), this;
          }),
          (i.emitterTrigger = function() {
            return this._emitter.emitterTrigger.apply(this._emitter, arguments), this;
          }),
          (i.propagateTo = function() {
            return this._emitter.propagateTo.apply(this._emitter, arguments), this;
          }),
          (i.stopPropagatingTo = function() {
            return this._emitter.stopPropagatingTo.apply(this._emitter, arguments), this;
          }),
          (i.addOptimizer = function(e) {
            return this._controllers.optimizer.add(e), this;
          }),
          (i.addCustomEvent = function(e) {
            return this._controllers.customEvent.add(e), this;
          }),
          (i._emitterOn = function() {
            this._emitter.on.apply(this._emitter, arguments);
          }),
          (i._emitterOnce = function() {
            this._emitter.once.apply(this._emitter, arguments);
          }),
          (i._emitterOff = function() {
            this._emitter.off.apply(this._emitter, arguments);
          }),
          (i._onEventUnbound = function(e) {
            var t = e.data.evt;
            this._shouldDeoptimizeEvent(t) && this._deoptimizeEvent(t);
          }),
          (i._customEventOn = function(e, t, r) {
            0 !== e.length && this._controllers.customEvent.on(e.join(' '), t, r);
          }),
          (i._customEventOnce = function(e, t, r) {
            0 !== e.length && this._controllers.customEvent.once(e.join(' '), t, r);
          }),
          (i._customEventOff = function(e, t, r, n) {
            if (n || 0 !== e.length)
              return n && 0 === e.length
                ? void this._controllers.customEvent.off()
                : void this._controllers.customEvent.off(e.join(' '), t, r);
          }),
          (i._getProperty = function(e, t) {
            var r = null;
            return t || (r = this._getOptimizedValue(e)), null === r && (r = c[e].call(this, t)), r;
          }),
          (i._optimizeEvents = function(e) {
            var t,
              r,
              n = e.length;
            for (r = 0; r < n; r++)
              (t = e[r]), this._shouldOptimizeEvent(t) && this._optimizeEvent(t);
          }),
          (i._shouldOptimizeEvent = function(e) {
            return !(
              !this._controllers.optimizer.canOptimizeEvent(e) ||
              this._controllers.optimizer.isOptimizingEvent(e)
            );
          }),
          (i._shouldDeoptimizeEvent = function(e, t) {
            return !(
              !this._controllers.optimizer.isOptimizingEvent(e) ||
              !(t || this._emitter._eventEmitter._events[e].length <= 1)
            );
          }),
          (i._optimizeEvent = function(e) {
            var t = this._controllers.optimizer.getOptimizerByEvent(e);
            t.activate(), this._emitterOn(e, t.callback, t);
          }),
          (i._deoptimizeEvent = function(e) {
            var t = this._controllers.optimizer.getOptimizerByEvent(e);
            t.deactivate(), this._emitterOff(e, t.callback, t);
          }),
          (i._getOptimizedValue = function(e) {
            return this._controllers.optimizer.get(e);
          }),
          (i._seperateCustomEvents = function(e) {
            var t = { customEvents: [], standardEvents: [] };
            if ('string' == typeof e) {
              var r,
                n,
                i = e.split(' '),
                a = i.length;
              for (n = 0; n < a; n++)
                (r = i[n]),
                  this._controllers.customEvent.canHandleCustomEvent(r)
                    ? t.customEvents.push(r)
                    : t.standardEvents.push(r);
            }
            return t;
          }),
          (i._bindEvents = function() {
            this._emitter.on('dom-emitter:didoff', this._onEventUnbound, this);
          }),
          (t.exports = a.share(g, l, n));
      },
      {
        './CustomEventController': 84,
        './OptimizerController': 85,
        './optimizers/optimizers': 91,
        './queries/queries': 100,
        '@marcom/ac-dom-emitter': 4,
        '@marcom/ac-shared-instance': 76,
      },
    ],
    87: [
      function(e, t, r) {
        'use strict';
        function n(e, t, r) {
          i.call(this),
            (this.name = e),
            (this.active = !1),
            (this._initializeFunc = t),
            (this._deinitializeFunc = r);
        }
        var i = e('@marcom/ac-event-emitter').EventEmitter,
          a = (n.prototype = new i(null));
        (a.initialize = function() {
          return this._initializeFunc && this._initializeFunc(), this;
        }),
          (a.deinitialize = function() {
            return this._deinitializeFunc && this._deinitializeFunc(), this;
          }),
          (t.exports = n);
      },
      { '@marcom/ac-event-emitter': 36 },
    ],
    88: [
      function(e, t, r) {
        'use strict';
        function n(e, t) {
          i.call(this),
            (this.active = !1),
            (this.eventNames = e.eventNames),
            (this.propertyNames = e.propertyNames),
            (this.options = e.options || {}),
            (this.callback = t);
        }
        var i = e('@marcom/ac-event-emitter').EventEmitter,
          a = (n.prototype = new i(null));
        (a.update = function(e, t) {
          this.trigger('update', { prop: e, val: t });
        }),
          (a.activate = function() {
            (this.active = !0), this.trigger('activate', this);
          }),
          (a.deactivate = function() {
            (this.active = !1), this.trigger('deactivate', this);
          }),
          (t.exports = n);
      },
      { '@marcom/ac-event-emitter': 36 },
    ],
    89: [
      function(e, t, r) {
        'use strict';
        var n = e('../../WindowDelegateOptimizer'),
          i = e('../../queries/queries'),
          a = {
            eventNames: ['resize'],
            propertyNames: ['clientWidth', 'clientHeight', 'innerWidth', 'innerHeight'],
          },
          o = new n(a, function(e) {
            var t,
              r = a.propertyNames,
              n = r.length;
            for (t = 0; t < n; t++) this.update(r[t], i[r[t]](!0));
          });
        t.exports = o;
      },
      { '../../WindowDelegateOptimizer': 88, '../../queries/queries': 100 },
    ],
    90: [
      function(e, t, r) {
        'use strict';
        var n = e('../../WindowDelegateOptimizer'),
          i = e('../../queries/queries'),
          a = {
            eventNames: ['scroll'],
            propertyNames: ['scrollX', 'scrollY', 'maxScrollX', 'maxScrollY'],
          },
          o = new n(a, function(e) {
            var t,
              r = a.propertyNames,
              n = r.length;
            for (t = 0; t < n; t++) this.update(r[t], i[r[t]](!0));
          });
        t.exports = o;
      },
      { '../../WindowDelegateOptimizer': 88, '../../queries/queries': 100 },
    ],
    91: [
      function(e, t, r) {
        'use strict';
        var n = e('./events/resize'),
          i = e('./events/scroll');
        t.exports = [n, i];
      },
      { './events/resize': 89, './events/scroll': 90 },
    ],
    92: [
      function(e, t, r) {
        'use strict';
        var n = function(e) {
          return document.documentElement.clientHeight;
        };
        t.exports = n;
      },
      {},
    ],
    93: [
      function(e, t, r) {
        'use strict';
        var n = function(e) {
          return document.documentElement.clientWidth;
        };
        t.exports = n;
      },
      {},
    ],
    94: [
      function(e, t, r) {
        'use strict';
        var n = function(e) {
          return window.innerHeight || this.clientHeight(e);
        };
        t.exports = n;
      },
      {},
    ],
    95: [
      function(e, t, r) {
        'use strict';
        var n = function(e) {
          return window.innerWidth || this.clientWidth(e);
        };
        t.exports = n;
      },
      {},
    ],
    96: [
      function(e, t, r) {
        'use strict';
        var n = function(e) {
          return document.body.scrollWidth - this.innerWidth();
        };
        t.exports = n;
      },
      {},
    ],
    97: [
      function(e, t, r) {
        'use strict';
        var n = function(e) {
          return document.body.scrollHeight - this.innerHeight();
        };
        t.exports = n;
      },
      {},
    ],
    98: [
      function(e, t, r) {
        'use strict';
        var n = function(e) {
          var t = window.pageXOffset;
          if (!t) {
            var r = document.documentElement || document.body.parentNode || document.body;
            t = r.scrollLeft;
          }
          return t;
        };
        t.exports = n;
      },
      {},
    ],
    99: [
      function(e, t, r) {
        'use strict';
        var n = function(e) {
          var t = window.pageYOffset;
          if (!t) {
            var r = document.documentElement || document.body.parentNode || document.body;
            t = r.scrollTop;
          }
          return t;
        };
        t.exports = n;
      },
      {},
    ],
    100: [
      function(e, t, r) {
        'use strict';
        var n = e('./methods/innerWidth'),
          i = e('./methods/innerHeight'),
          a = e('./methods/clientWidth'),
          o = e('./methods/clientHeight'),
          s = e('./methods/scrollX'),
          p = e('./methods/scrollY'),
          c = e('./methods/maxScrollX'),
          u = e('./methods/maxScrollY');
        t.exports = {
          innerWidth: n,
          innerHeight: i,
          clientWidth: a,
          clientHeight: o,
          scrollX: s,
          scrollY: p,
          maxScrollX: c,
          maxScrollY: u,
        };
      },
      {
        './methods/clientHeight': 92,
        './methods/clientWidth': 93,
        './methods/innerHeight': 94,
        './methods/innerWidth': 95,
        './methods/maxScrollX': 96,
        './methods/maxScrollY': 97,
        './methods/scrollX': 98,
        './methods/scrollY': 99,
      },
    ],
    101: [
      function(e, t, r) {
        'use strict';
        t.exports = { version: '3.0.10', major: '3.x', majorMinor: '3.0' };
      },
      {},
    ],
    102: [
      function(e, t, r) {
        'use strict';
        function n(e, t) {
          if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
        }
        function i(e, t) {
          if (!e)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return !t || ('object' != typeof t && 'function' != typeof t) ? e : t;
        }
        function a(e, t) {
          if ('function' != typeof t && null !== t)
            throw new TypeError(
              'Super expression must either be null or a function, not ' + typeof t
            );
          (e.prototype = Object.create(t && t.prototype, {
            constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 },
          })),
            t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : (e.__proto__ = t));
        }
        var o = (function() {
            function e(e, t) {
              for (var r = 0; r < t.length; r++) {
                var n = t[r];
                (n.enumerable = n.enumerable || !1),
                  (n.configurable = !0),
                  'value' in n && (n.writable = !0),
                  Object.defineProperty(e, n.key, n);
              }
            }
            return function(t, r, n) {
              return r && e(t.prototype, r), n && e(t, n), t;
            };
          })(),
          s = e('@marcom/ac-event-emitter-micro').EventEmitterMicro,
          p = e('./Model/AnimSystemModel'),
          c = e('./Keyframes/Keyframe'),
          u = e('./Keyframes/KeyframeCSSClass'),
          g = e('./Keyframes/KeyframeDiscreteEvent'),
          l = e('./ScrollGroup'),
          h = e('./TimeGroup'),
          f = e('./.release-info'),
          j = {
            update: e('@marcom/ac-raf-emitter/update'),
            cancelUpdate: e('@marcom/ac-raf-emitter/cancelUpdate'),
            external: e('@marcom/ac-raf-emitter/external'),
            draw: e('@marcom/ac-raf-emitter/draw'),
          },
          d = null,
          m = (function(e) {
            function t() {
              n(this, t);
              var e = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
              if (d)
                throw 'You cannot create multiple AnimSystems. You probably want to create multiple groups instead. You can have unlimited groups on a page';
              return (
                (d = e),
                (e.groups = []),
                (e.scrollSystems = []),
                (e.timeSystems = []),
                (e._forceUpdateRAFId = -1),
                (e._initialized = !1),
                (e.model = p),
                (e.version = f.version),
                (e.onScroll = e.onScroll.bind(e)),
                (e.onResizedDebounced = e.onResizedDebounced.bind(e)),
                (e.onResizeImmediate = e.onResizeImmediate.bind(e)),
                e
              );
            }
            return (
              a(t, e),
              o(t, [
                {
                  key: 'initialize',
                  value: function() {
                    this._initialized ||
                      ((this._initialized = !0),
                      (this.timeSystems = []),
                      (this.scrollSystems = []),
                      (this.groups = []),
                      this.setupEvents(),
                      this.initializeResizeFilter(),
                      this.initializeModel(),
                      this.createDOMGroups(),
                      this.createDOMKeyframes());
                  },
                },
                {
                  key: 'remove',
                  value: function() {
                    var e = this;
                    return Promise.all(
                      this.groups.map(function(e) {
                        return e.remove();
                      })
                    ).then(function() {
                      (e.groups = null),
                        (e.scrollSystems = null),
                        (e.timeSystems = null),
                        window.clearTimeout(p.RESIZE_TIMEOUT),
                        window.removeEventListener('scroll', e.onScroll),
                        window.removeEventListener('resize', e.onResizeImmediate),
                        (e._events = {}),
                        (e._initialized = !1);
                    });
                  },
                },
                {
                  key: 'destroy',
                  value: function() {
                    return this.remove();
                  },
                },
                {
                  key: 'createTimeGroup',
                  value: function(e) {
                    var t = new h(e, this);
                    return (
                      this.groups.push(t),
                      this.timeSystems.push(t),
                      this.trigger(p.EVENTS.ON_GROUP_CREATED, t),
                      t
                    );
                  },
                },
                {
                  key: 'createScrollGroup',
                  value: function(e) {
                    if (!e) throw 'AnimSystem scroll based groups must supply an HTMLElement';
                    var t = new l(e, this);
                    return (
                      this.groups.push(t),
                      this.scrollSystems.push(t),
                      this.trigger(p.EVENTS.ON_GROUP_CREATED, t),
                      t
                    );
                  },
                },
                {
                  key: 'removeGroup',
                  value: function(e) {
                    var t = this;
                    return Promise.all(
                      e.keyframeControllers.map(function(t) {
                        return e.removeKeyframeController(t);
                      })
                    ).then(function() {
                      var r = t.groups.indexOf(e);
                      r !== -1 && t.groups.splice(r, 1),
                        (r = t.scrollSystems.indexOf(e)),
                        r !== -1 && t.scrollSystems.splice(r, 1),
                        (r = t.timeSystems.indexOf(e)),
                        r !== -1 && t.timeSystems.splice(r, 1),
                        e.destroy();
                    });
                  },
                },
                {
                  key: 'createDOMGroups',
                  value: function() {
                    var e = this;
                    document.body.setAttribute('data-anim-scroll-group', 'body'),
                      document.querySelectorAll('[data-anim-scroll-group]').forEach(function(t) {
                        return e.createScrollGroup(t);
                      }),
                      document.querySelectorAll('[data-anim-time-group]').forEach(function(t) {
                        return e.createTimeGroup(t);
                      }),
                      this.trigger(p.EVENTS.ON_DOM_GROUPS_CREATED, this.groups);
                  },
                },
                {
                  key: 'createDOMKeyframes',
                  value: function() {
                    var e = this,
                      t = [];
                    [c.DATA_ATTRIBUTE, u.DATA_ATTRIBUTE, g.DATA_ATTRIBUTE].forEach(function(e) {
                      for (var r = 0; r < 12; r++) t.push(e + (0 === r ? '' : '-' + (r - 1)));
                    });
                    for (var r = 0; r < t.length; r++)
                      for (
                        var n = t[r], i = document.querySelectorAll('[' + n + ']'), a = 0;
                        a < i.length;
                        a++
                      ) {
                        var o = i[a],
                          s = JSON.parse(o.getAttribute(n));
                        this.addKeyframe(o, s);
                      }
                    j.update(function() {
                      e.groups.forEach(function(e) {
                        return e.onKeyframesDirty({ silent: !0 });
                      }),
                        e.groups.forEach(function(e) {
                          return e.trigger(p.EVENTS.ON_DOM_KEYFRAMES_CREATED, e);
                        }),
                        e.trigger(p.EVENTS.ON_DOM_KEYFRAMES_CREATED, e),
                        e.groups.forEach(function(e) {
                          e.forceUpdate({ waitForNextUpdate: !1, silent: !0 }), e.reconcile();
                        }),
                        e.onScroll();
                    }, !0);
                  },
                },
                {
                  key: 'initializeResizeFilter',
                  value: function() {
                    if (!p.cssDimensionsTracker) {
                      var e =
                        document.querySelector('.cssDimensionsTracker') ||
                        document.createElement('div');
                      e.setAttribute('cssDimensionsTracker', 'true'),
                        (e.style.position = 'fixed'),
                        (e.style.top = '0'),
                        (e.style.width = '100%'),
                        (e.style.height = '100vh'),
                        (e.style.pointerEvents = 'none'),
                        (e.style.visibility = 'hidden'),
                        (e.style.zIndex = '-1'),
                        document.documentElement.appendChild(e),
                        (p.cssDimensionsTracker = e);
                    }
                  },
                },
                {
                  key: 'initializeModel',
                  value: function() {
                    (p.pageMetrics.windowHeight = p.cssDimensionsTracker.clientHeight),
                      (p.pageMetrics.windowWidth = p.cssDimensionsTracker.clientWidth),
                      (p.pageMetrics.scrollY = window.scrollY || window.pageYOffset),
                      (p.pageMetrics.scrollX = window.scrollX || window.pageXOffset),
                      (p.pageMetrics.breakpoint = p.getBreakpoint());
                    var e = document.documentElement.getBoundingClientRect();
                    (p.pageMetrics.documentOffsetX = e.left + p.pageMetrics.scrollX),
                      (p.pageMetrics.documentOffsetY = e.top + p.pageMetrics.scrollY);
                  },
                },
                {
                  key: 'setupEvents',
                  value: function() {
                    window.removeEventListener('scroll', this.onScroll),
                      window.addEventListener('scroll', this.onScroll),
                      window.removeEventListener('resize', this.onResizeImmediate),
                      window.addEventListener('resize', this.onResizeImmediate);
                  },
                },
                {
                  key: 'onScroll',
                  value: function() {
                    (p.pageMetrics.scrollY = window.scrollY || window.pageYOffset),
                      (p.pageMetrics.scrollX = window.scrollX || window.pageXOffset);
                    for (var e = 0, t = this.scrollSystems.length; e < t; e++)
                      this.scrollSystems[e]._onScroll();
                    this.trigger(p.PageEvents.ON_SCROLL, p.pageMetrics);
                  },
                },
                {
                  key: 'onResizeImmediate',
                  value: function() {
                    var e = p.cssDimensionsTracker.clientWidth,
                      t = p.cssDimensionsTracker.clientHeight;
                    if (e !== p.pageMetrics.windowWidth || t !== p.pageMetrics.windowHeight) {
                      (p.pageMetrics.windowWidth = e),
                        (p.pageMetrics.windowHeight = t),
                        (p.pageMetrics.scrollY = window.scrollY || window.pageYOffset),
                        (p.pageMetrics.scrollX = window.scrollX || window.pageXOffset);
                      var r = document.documentElement.getBoundingClientRect();
                      (p.pageMetrics.documentOffsetX = r.left + p.pageMetrics.scrollX),
                        (p.pageMetrics.documentOffsetY = r.top + p.pageMetrics.scrollY),
                        window.clearTimeout(p.RESIZE_TIMEOUT),
                        (p.RESIZE_TIMEOUT = window.setTimeout(this.onResizedDebounced, 250)),
                        this.trigger(p.PageEvents.ON_RESIZE_IMMEDIATE, p.pageMetrics);
                    }
                  },
                },
                {
                  key: 'onResizedDebounced',
                  value: function() {
                    var e = this;
                    j.update(function() {
                      var t = p.pageMetrics.breakpoint,
                        r = p.getBreakpoint(),
                        n = r !== t;
                      if (n) {
                        (p.pageMetrics.previousBreakpoint = t), (p.pageMetrics.breakpoint = r);
                        for (var i = 0, a = e.groups.length; i < a; i++)
                          e.groups[i]._onBreakpointChange();
                        e.trigger(p.PageEvents.ON_BREAKPOINT_CHANGE, p.pageMetrics);
                      }
                      for (var o = 0, s = e.groups.length; o < s; o++)
                        e.groups[o].forceUpdate({ waitForNextUpdate: !1 });
                      e.trigger(p.PageEvents.ON_RESIZE_DEBOUNCED, p.pageMetrics);
                    }, !0);
                  },
                },
                {
                  key: 'forceUpdate',
                  value: function() {
                    var e = this,
                      t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                      r = t.waitForNextUpdate,
                      n = void 0 === r || r,
                      i = t.silent,
                      a = void 0 !== i && i;
                    this._forceUpdateRAFId !== -1 && j.cancelUpdate(this._forceUpdateRAFId);
                    var o = function() {
                      for (var t = 0, r = e.groups.length; t < r; t++) {
                        var n = e.groups[t];
                        n.forceUpdate({ waitForNextUpdate: !1, silent: a });
                      }
                      return -1;
                    };
                    this._forceUpdateRAFId = n ? j.update(o, !0) : o();
                  },
                },
                {
                  key: 'addKeyframe',
                  value: function(e, t) {
                    var r = this.getGroupForTarget(e);
                    return (r = r || this.getGroupForTarget(document.body)), r.addKeyframe(e, t);
                  },
                },
                {
                  key: 'getGroupForTarget',
                  value: function(e) {
                    if (e._animInfo && e._animInfo.group) return e._animInfo.group;
                    for (var t = e; t; ) {
                      if (t._animInfo && t._animInfo.isGroup) return t._animInfo.group;
                      t = t.parentElement;
                    }
                  },
                },
                {
                  key: 'getControllerForTarget',
                  value: function(e) {
                    return e._animInfo && e._animInfo.controller ? e._animInfo.controller : null;
                  },
                },
              ]),
              t
            );
          })(s);
        t.exports = window.AC.SharedInstance.share('AnimSystem', f.major, m);
      },
      {
        './.release-info': 101,
        './Keyframes/Keyframe': 103,
        './Keyframes/KeyframeCSSClass': 104,
        './Keyframes/KeyframeDiscreteEvent': 106,
        './Model/AnimSystemModel': 107,
        './ScrollGroup': 115,
        './TimeGroup': 116,
        '@marcom/ac-event-emitter-micro': 34,
        '@marcom/ac-raf-emitter/cancelUpdate': 63,
        '@marcom/ac-raf-emitter/draw': 64,
        '@marcom/ac-raf-emitter/external': 65,
        '@marcom/ac-raf-emitter/update': 68,
      },
    ],
    103: [
      function(e, t, r) {
        'use strict';
        function n(e, t) {
          if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
        }
        var i = (function() {
            function e(e, t) {
              for (var r = 0; r < t.length; r++) {
                var n = t[r];
                (n.enumerable = n.enumerable || !1),
                  (n.configurable = !0),
                  'value' in n && (n.writable = !0),
                  Object.defineProperty(e, n.key, n);
              }
            }
            return function(t, r, n) {
              return r && e(t.prototype, r), n && e(t, n), t;
            };
          })(),
          a = e('../Model/AnimSystemModel'),
          o = e('@marcom/sm-math-utils'),
          s = e('../Model/EasingFunctions'),
          p = e('../Model/UnitBezier'),
          c = e('../utils/arrayToObject'),
          u = e('../utils/toValidAnchor'),
          g = (function() {
            function e(t, r) {
              n(this, e),
                (this.controller = t),
                (this.anchors = []),
                (this.jsonProps = r),
                (this.ease = t.group.defaultEase),
                (this.easeFunctionString = a.KeyframeDefaults.easeFunctionString),
                (this.easeFunction = s[this.easeFunctionString]),
                (this.start = 0),
                (this.end = 0),
                (this.localT = 0),
                (this.curvedT = 0),
                (this.id = 0),
                (this.event = ''),
                (this.needsEventDispatch = !1),
                (this.snapAtCreation = !1),
                (this.isEnabled = !1),
                (this.animValues = {}),
                (this.breakpointMask = 'SMLX'),
                (this.disabledWhen = []),
                (this.keyframeType = a.KeyframeTypes.Interpolation),
                (this.hold = !1);
            }
            return (
              i(e, [
                {
                  key: 'destroy',
                  value: function() {
                    (this.controller = null),
                      (this.disabledWhen = null),
                      (this.anchors = null),
                      (this.jsonProps = null),
                      (this.easeFunction = null),
                      (this.animValues = null);
                  },
                },
                {
                  key: 'remove',
                  value: function() {
                    return this.controller.removeKeyframe(this);
                  },
                },
                {
                  key: 'parseOptions',
                  value: function(e) {
                    var t = this;
                    if (
                      ((this.jsonProps = e),
                      e.relativeTo &&
                        console.error(
                          "KeyframeError: relativeTo has been removed. Use 'anchors' property instead. Found 'relativeTo':\"" +
                            e.relativeTo +
                            '"'
                        ),
                      '' !== e.anchors && e.anchors
                        ? ((this.anchors = []),
                          (e.anchors = Array.isArray(e.anchors) ? e.anchors : [e.anchors]),
                          e.anchors.forEach(function(r, n) {
                            var i = u(r, t.controller.group.element);
                            if (!i) {
                              var a = '';
                              return (
                                'string' == typeof r &&
                                  (a =
                                    ' Provided value was a string, so a failed attempt was made to find anchor with the provided querystring in group.element, or in the document.'),
                                void console.warn(
                                  'Keyframe on',
                                  t.controller.element,
                                  ' failed to find anchor at index ' + n + ' in array',
                                  e.anchors,
                                  '. Anchors must be JS Object references, Elements references, or valid query selector strings. ' +
                                    a
                                )
                              );
                            }
                            t.anchors.push(i), t.controller.group.metrics.add(i);
                          }))
                        : ((this.anchors = []), (e.anchors = [])),
                      e.ease ? (this.ease = parseFloat(e.ease)) : (e.ease = this.ease),
                      e.hasOwnProperty('snapAtCreation')
                        ? (this.snapAtCreation = e.snapAtCreation)
                        : (e.snapAtCreation = this.snapAtCreation),
                      e.easeFunction
                        ? (this.easeFunction = e.easeFunction)
                        : (e.easeFunction = this.easeFunctionString),
                      e.breakpointMask
                        ? (this.breakpointMask = e.breakpointMask)
                        : (e.breakpointMask = this.breakpointMask),
                      e.disabledWhen
                        ? (this.disabledWhen = Array.isArray(e.disabledWhen)
                            ? e.disabledWhen
                            : [e.disabledWhen])
                        : (e.disabledWhen = this.disabledWhen),
                      e.hasOwnProperty('hold') ? (this.hold = e.hold) : (e.hold = this.hold),
                      (this.easeFunction = s[e.easeFunction]),
                      !s.hasOwnProperty(e.easeFunction))
                    ) {
                      var r = p.fromCSSString(e.easeFunction);
                      r
                        ? (this.easeFunction = r)
                        : console.error(
                            "Keyframe parseOptions cannot find EasingFunction named '" +
                              e.easingFunction +
                              "'"
                          );
                    }
                    for (var n in e)
                      if (a.KeyframeJSONReservedWords.indexOf(n) === -1) {
                        var i = e[n];
                        if (Array.isArray(i)) {
                          if (
                            ((this.animValues[
                              n
                            ] = this.controller.group.expressionParser.parseArray(this, i)),
                            void 0 === this.controller.tweenProps[n] ||
                              !this.controller._ownerIsElement)
                          ) {
                            var o = 0;
                            this.controller._ownerIsElement ||
                              (o = this.controller.element[n] || 0);
                            var c = new a.TargetValue(
                              o,
                              a.KeyframeDefaults.epsilon,
                              this.snapAtCreation
                            );
                            this.controller.tweenProps[n] = c;
                          }
                          var g = this.controller.tweenProps[n];
                          if (e.epsilon) g.epsilon = e.epsilon;
                          else {
                            var l = Math.abs(this.animValues[n][0] - this.animValues[n][1]),
                              h = Math.min(0.001 * l, g.epsilon, a.KeyframeDefaults.epsilon);
                            g.epsilon = Math.max(h, 1e-4);
                          }
                        }
                      }
                    (this.keyframeType = this.hold
                      ? a.KeyframeTypes.InterpolationForward
                      : a.KeyframeTypes.Interpolation),
                      e.event && (this.event = e.event);
                  },
                },
                {
                  key: 'overwriteProps',
                  value: function(e) {
                    this.animValues = {};
                    var t = Object.assign({}, this.jsonProps, e);
                    this.controller.updateKeyframe(this, t);
                  },
                },
                {
                  key: 'updateLocalProgress',
                  value: function(e) {
                    if (this.start === this.end || e < this.start || e > this.end)
                      return (
                        (this.localT = e < this.start ? 0 : e > this.end ? 1 : 0),
                        void (this.curvedT = this.easeFunction(this.localT))
                      );
                    var t = (e - this.start) / (this.end - this.start),
                      r = this.hold ? this.localT : 0;
                    (this.localT = o.clamp(t, r, 1)),
                      (this.curvedT = this.easeFunction(this.localT));
                  },
                },
                {
                  key: 'reconcile',
                  value: function(e) {
                    var t = this.animValues[e],
                      r = this.controller.tweenProps[e];
                    (r.initialValue = t[0]),
                      (r.target = t[0] + this.curvedT * (t[1] - t[0])),
                      r.current !== r.target &&
                        ((r.current = r.target),
                        this.needsEventDispatch ||
                          ((this.needsEventDispatch = !0),
                          this.controller.keyframesRequiringDispatch.push(this)));
                  },
                },
                {
                  key: 'reset',
                  value: function(e) {
                    this.localT = e || 0;
                    var t = this.ease;
                    this.ease = 1;
                    for (var r in this.animValues) this.reconcile(r);
                    this.ease = t;
                  },
                },
                {
                  key: 'onDOMRead',
                  value: function(e) {
                    var t = this.animValues[e],
                      r = this.controller.tweenProps[e];
                    r.target = t[0] + this.curvedT * (t[1] - t[0]);
                    var n = r.current;
                    r.current += (r.target - r.current) * this.ease;
                    var i = r.current - r.target;
                    i < r.epsilon && i > -r.epsilon && ((r.current = r.target), (i = 0)),
                      '' === this.event ||
                        this.needsEventDispatch ||
                        ((i > r.epsilon || i < -r.epsilon || (0 === i && n !== r.current)) &&
                          ((this.needsEventDispatch = !0),
                          this.controller.keyframesRequiringDispatch.push(this)));
                  },
                },
                {
                  key: 'isInRange',
                  value: function(e) {
                    return e >= this.start && e <= this.end;
                  },
                },
                {
                  key: 'setEnabled',
                  value: function(e) {
                    e = e || c(Array.from(document.documentElement.classList));
                    var t = this.breakpointMask.indexOf(a.pageMetrics.breakpoint) !== -1,
                      r = !1;
                    return (
                      this.disabledWhen.length > 0 &&
                        (r = this.disabledWhen.some(function(t) {
                          return 'undefined' != typeof e[t];
                        })),
                      (this.isEnabled = t && !r),
                      this.isEnabled
                    );
                  },
                },
                {
                  key: 'evaluateConstraints',
                  value: function() {
                    (this.start = this.controller.group.expressionParser.parseTimeValue(
                      this,
                      this.jsonProps.start
                    )),
                      (this.end = this.controller.group.expressionParser.parseTimeValue(
                        this,
                        this.jsonProps.end
                      )),
                      this.evaluateInterpolationConstraints();
                  },
                },
                {
                  key: 'evaluateInterpolationConstraints',
                  value: function() {
                    for (var e in this.animValues) {
                      var t = this.jsonProps[e];
                      this.animValues[e] = this.controller.group.expressionParser.parseArray(
                        this,
                        t
                      );
                    }
                  },
                },
              ]),
              e
            );
          })();
        (g.DATA_ATTRIBUTE = 'data-anim-tween'), (t.exports = g);
      },
      {
        '../Model/AnimSystemModel': 107,
        '../Model/EasingFunctions': 108,
        '../Model/UnitBezier': 112,
        '../utils/arrayToObject': 117,
        '../utils/toValidAnchor': 118,
        '@marcom/sm-math-utils': 124,
      },
    ],
    104: [
      function(e, t, r) {
        'use strict';
        function n(e, t) {
          if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
        }
        function i(e, t) {
          if (!e)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return !t || ('object' != typeof t && 'function' != typeof t) ? e : t;
        }
        function a(e, t) {
          if ('function' != typeof t && null !== t)
            throw new TypeError(
              'Super expression must either be null or a function, not ' + typeof t
            );
          (e.prototype = Object.create(t && t.prototype, {
            constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 },
          })),
            t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : (e.__proto__ = t));
        }
        var o =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function(e) {
                  return typeof e;
                }
              : function(e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                },
          s = (function() {
            function e(e, t) {
              for (var r = 0; r < t.length; r++) {
                var n = t[r];
                (n.enumerable = n.enumerable || !1),
                  (n.configurable = !0),
                  'value' in n && (n.writable = !0),
                  Object.defineProperty(e, n.key, n);
              }
            }
            return function(t, r, n) {
              return r && e(t.prototype, r), n && e(t, n), t;
            };
          })(),
          p = e('./Keyframe'),
          c = e('../Model/AnimSystemModel.js'),
          u = (function(e) {
            function t(e, r) {
              n(this, t);
              var a = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, r));
              return (
                (a.keyframeType = c.KeyframeTypes.CSSClass),
                (a._triggerType = t.TRIGGER_TYPE_CSS_CLASS),
                (a.cssClass = ''),
                (a.friendlyName = ''),
                (a.style = { on: null, off: null }),
                (a.toggle = !1),
                (a.isApplied = !1),
                a
              );
            }
            return (
              a(t, e),
              s(t, [
                {
                  key: 'parseOptions',
                  value: function(e) {
                    if (!this.controller._ownerIsElement)
                      throw new TypeError('CSS Keyframes cannot be applied to JS Objects');
                    if (
                      ((e.x = void 0),
                      (e.y = void 0),
                      (e.scale = void 0),
                      (e.scaleX = void 0),
                      (e.scaleY = void 0),
                      (e.rotation = void 0),
                      (e.opacity = void 0),
                      (e.hold = void 0),
                      void 0 !== e.toggle && (this.toggle = e.toggle),
                      void 0 !== e.cssClass)
                    )
                      (this._triggerType = t.TRIGGER_TYPE_CSS_CLASS),
                        (this.cssClass = e.cssClass),
                        (this.friendlyName = '.' + this.cssClass),
                        void 0 === this.controller.tweenProps.targetClasses &&
                          (this.controller.tweenProps.targetClasses = { add: [], remove: [] });
                    else {
                      if (void 0 === e.style || !this.isValidStyleProperty(e.style))
                        throw new TypeError(
                          "KeyframeCSSClass no 'cssClass` property found. If using `style` property its also missing or invalid"
                        );
                      if (
                        ((this._triggerType = t.TRIGGER_TYPE_STYLE_PROPERTY),
                        (this.style = e.style),
                        (this.friendlyName = 'style'),
                        (this.toggle = void 0 !== this.style.off || this.toggle),
                        this.toggle && void 0 === this.style.off)
                      ) {
                        this.style.off = {};
                        for (var r in this.style.on) this.style.off[r] = '';
                      }
                      void 0 === this.controller.tweenProps.targetStyles &&
                        (this.controller.tweenProps.targetStyles = {});
                    }
                    if (
                      (void 0 === e.end && (e.end = e.start),
                      (e.toggle = this.toggle),
                      this._triggerType === t.TRIGGER_TYPE_CSS_CLASS)
                    )
                      this.isApplied = this.controller.element.classList.contains(this.cssClass);
                    else {
                      var n = getComputedStyle(this.controller.element);
                      this.isApplied = !0;
                      for (var i in this.style.on)
                        if (n[i] !== this.style.on[i]) {
                          this.isApplied = !1;
                          break;
                        }
                    }
                    p.prototype.parseOptions.call(this, e),
                      (this.animValues[this.friendlyName] = [0, 0]),
                      void 0 === this.controller.tweenProps[this.friendlyName] &&
                        (this.controller.tweenProps[this.friendlyName] = new c.TargetValue(
                          0,
                          1,
                          !1
                        )),
                      (this.keyframeType = c.KeyframeTypes.CSSClass);
                  },
                },
                {
                  key: 'updateLocalProgress',
                  value: function(e) {
                    (this.isApplied && !this.toggle) ||
                      (this.start !== this.end
                        ? !this.isApplied && e >= this.start && e <= this.end
                          ? this._apply()
                          : this.isApplied &&
                            this.toggle &&
                            (e < this.start || e > this.end) &&
                            this._unapply()
                        : !this.isApplied && e >= this.start
                        ? this._apply()
                        : this.isApplied && this.toggle && e < this.start && this._unapply());
                  },
                },
                {
                  key: '_apply',
                  value: function() {
                    if (this._triggerType === t.TRIGGER_TYPE_CSS_CLASS)
                      this.controller.tweenProps.targetClasses.add.push(this.cssClass),
                        (this.controller.needsClassUpdate = !0);
                    else {
                      for (var e in this.style.on)
                        this.controller.tweenProps.targetStyles[e] = this.style.on[e];
                      this.controller.needsStyleUpdate = !0;
                    }
                    this.isApplied = !0;
                  },
                },
                {
                  key: '_unapply',
                  value: function() {
                    if (this._triggerType === t.TRIGGER_TYPE_CSS_CLASS)
                      this.controller.tweenProps.targetClasses.remove.push(this.cssClass),
                        (this.controller.needsClassUpdate = !0);
                    else {
                      for (var e in this.style.off)
                        this.controller.tweenProps.targetStyles[e] = this.style.off[e];
                      this.controller.needsStyleUpdate = !0;
                    }
                    this.isApplied = !1;
                  },
                },
                {
                  key: 'isValidStyleProperty',
                  value: function(e) {
                    if (!e.hasOwnProperty('on')) return !1;
                    if ('object' !== o(e.on))
                      throw new TypeError(
                        'KeyframeCSSClass `style` property should be in the form of: {on:{visibility:hidden, otherProperty: value}}'
                      );
                    if (this.toggle && e.hasOwnProperty('off') && 'object' !== o(e.off))
                      throw new TypeError(
                        'KeyframeCSSClass `style` property should be in the form of: {on:{visibility:hidden, otherProperty: value}}'
                      );
                    return !0;
                  },
                },
                { key: 'reconcile', value: function(e, t) {} },
                { key: 'onDOMRead', value: function(e, t) {} },
                { key: 'evaluateInterpolationConstraints', value: function() {} },
              ]),
              t
            );
          })(p);
        (u.TRIGGER_TYPE_CSS_CLASS = 0),
          (u.TRIGGER_TYPE_STYLE_PROPERTY = 1),
          (u.DATA_ATTRIBUTE = 'data-anim-classname'),
          (t.exports = u);
      },
      { '../Model/AnimSystemModel.js': 107, './Keyframe': 103 },
    ],
    105: [
      function(e, t, r) {
        'use strict';
        function n(e, t) {
          if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
        }
        function i(e, t) {
          if (!e)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return !t || ('object' != typeof t && 'function' != typeof t) ? e : t;
        }
        function a(e, t) {
          if ('function' != typeof t && null !== t)
            throw new TypeError(
              'Super expression must either be null or a function, not ' + typeof t
            );
          (e.prototype = Object.create(t && t.prototype, {
            constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 },
          })),
            t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : (e.__proto__ = t));
        }
        var o = (function() {
            function e(e, t) {
              for (var r = 0; r < t.length; r++) {
                var n = t[r];
                (n.enumerable = n.enumerable || !1),
                  (n.configurable = !0),
                  'value' in n && (n.writable = !0),
                  Object.defineProperty(e, n.key, n);
              }
            }
            return function(t, r, n) {
              return r && e(t.prototype, r), n && e(t, n), t;
            };
          })(),
          s = function y(e, t, r) {
            null === e && (e = Function.prototype);
            var n = Object.getOwnPropertyDescriptor(e, t);
            if (void 0 === n) {
              var i = Object.getPrototypeOf(e);
              return null === i ? void 0 : y(i, t, r);
            }
            if ('value' in n) return n.value;
            var a = n.get;
            if (void 0 !== a) return a.call(r);
          },
          p = e('../Model/AnimSystemModel'),
          c = (e('./Keyframe'), e('./KeyframeCSSClass')),
          u = e('../Model/InferKeyframeFromProps'),
          g = e('../utils/arrayToObject'),
          l = e('../Model/UUID'),
          h = e('@marcom/ac-event-emitter-micro').EventEmitterMicro,
          f = e('@marcom/decompose-css-transform'),
          j = {
            update: e('@marcom/ac-raf-emitter/update'),
            external: e('@marcom/ac-raf-emitter/external'),
            draw: e('@marcom/ac-raf-emitter/draw'),
          },
          d = Math.PI / 180,
          m = {
            create: e('gl-mat4/create'),
            rotateX: e('gl-mat4/rotateX'),
            rotateY: e('gl-mat4/rotateY'),
            rotateZ: e('gl-mat4/rotateZ'),
            scale: e('gl-mat4/scale'),
          },
          v = (function(e) {
            function t(e, r) {
              n(this, t);
              var a = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
              return (
                (a._events.draw = []),
                (a.uuid = l()),
                (a.group = e),
                (a.element = r),
                (a._ownerIsElement = a.element instanceof Element),
                a._ownerIsElement
                  ? (a.friendlyName =
                      a.element.tagName + '.' + Array.from(a.element.classList).join('.'))
                  : (a.friendlyName = a.element.friendlyName || a.uuid),
                (a.element._animInfo = a.element._animInfo || new p.AnimInfo(e, a)),
                (a.element._animInfo.controller = a),
                (a.element._animInfo.group = a.group),
                a.element._animInfo.controllers.push(a),
                (a.tweenProps = a.element._animInfo.tweenProps),
                (a.eventObject = new p.EventObject(a)),
                (a.needsStyleUpdate = !1),
                (a.needsClassUpdate = !1),
                (a.elementMetrics = a.group.metrics.add(a.element)),
                (a.attributes = []),
                (a.keyframes = {}),
                (a._allKeyframes = []),
                (a._activeKeyframes = []),
                (a.keyframesRequiringDispatch = []),
                a.updateCachedValuesFromElement(),
                (a.boundsMin = 0),
                (a.boundsMax = 0),
                (a.mat2d = new Float32Array(6)),
                (a.mat4 = m.create()),
                (a.needsWrite = !0),
                (a.onDOMWriteImp = a._ownerIsElement
                  ? a.onDOMWriteForElement
                  : a.onDOMWriteForObject),
                a
              );
            }
            return (
              a(t, e),
              o(t, [
                {
                  key: 'destroy',
                  value: function() {
                    if (this.element._animInfo) {
                      this.element._animInfo.controller === this &&
                        (this.element._animInfo.controller = null);
                      var e = this.element._animInfo.controllers.indexOf(this);
                      e !== -1 && this.element._animInfo.controllers.splice(e, 1),
                        0 === this.element._animInfo.controllers.length
                          ? (this.element._animInfo = null)
                          : ((this.element._animInfo.controller = this.element._animInfo.controllers[
                              this.element._animInfo.controllers.length - 1
                            ]),
                            (this.element._animInfo.group = this.element._animInfo.controller.group));
                    }
                    (this.eventObject.controller = null),
                      (this.eventObject.element = null),
                      (this.eventObject.keyframe = null),
                      (this.eventObject.tweenProps = null),
                      (this.eventObject = null),
                      (this.elementMetrics = null),
                      (this.group = null),
                      (this.keyframesRequiringDispatch = null);
                    for (var r = 0; r < this._allKeyframes.length; r++)
                      this._allKeyframes[r].destroy();
                    (this._allKeyframes = null),
                      (this._activeKeyframes = null),
                      (this.attributes = null),
                      (this.keyframes = null),
                      (this.element = null),
                      (this.tweenProps = null),
                      s(
                        t.prototype.__proto__ || Object.getPrototypeOf(t.prototype),
                        'destroy',
                        this
                      ).call(this);
                  },
                },
                {
                  key: 'remove',
                  value: function() {
                    return this.group.removeKeyframeController(this);
                  },
                },
                {
                  key: 'updateCachedValuesFromElement',
                  value: function() {
                    var e = this;
                    if (this._ownerIsElement) {
                      var t = getComputedStyle(this.element),
                        r = f(this.element, !0),
                        n = p.KeyframeDefaults.epsilon,
                        i = !1;
                      ['x', 'y', 'z'].forEach(function(t, a) {
                        e.tweenProps[t] = new p.TargetValue(r.translation[a], n, i);
                      }),
                        (this.tweenProps.rotation = new p.TargetValue(r.eulerRotation[2], n, i)),
                        ['rotationX', 'rotationY', 'rotationZ'].forEach(function(t, a) {
                          e.tweenProps[t] = new p.TargetValue(r.eulerRotation[a], n, i);
                        }),
                        (this.tweenProps.scaleZ = new p.TargetValue(r.scale[0], n, i)),
                        ['scaleX', 'scaleY', 'scale'].forEach(function(t, a) {
                          e.tweenProps[t] = new p.TargetValue(r.scale[a], n, i);
                        }),
                        (this.tweenProps.opacity = new p.TargetValue(parseFloat(t.opacity), n, i));
                    }
                  },
                },
                {
                  key: 'addKeyframe',
                  value: function(e) {
                    var t = u(e);
                    if (!t)
                      throw new Error(
                        'AnimSystem Cannot create keyframe for from options `' + e + '`'
                      );
                    var r = new t(this, e);
                    return (
                      r.parseOptions(e),
                      (r.id = this._allKeyframes.length),
                      this._allKeyframes.push(r),
                      r
                    );
                  },
                },
                {
                  key: 'needsUpdate',
                  value: function() {
                    for (var e = 0, t = this.attributes.length; e < t; e++) {
                      var r = this.attributes[e],
                        n = this.tweenProps[r],
                        i = Math.abs(n.current - n.target);
                      if (i > n.epsilon) return !0;
                    }
                    return !1;
                  },
                },
                {
                  key: 'updateLocalProgress',
                  value: function(e) {
                    for (var t = 0, r = this.attributes.length; t < r; t++) {
                      var n = this.attributes[t],
                        i = this.keyframes[this.attributes[t]];
                      if (1 !== i.length) {
                        var a = this.getNearestKeyframeForAttribute(n, e);
                        a && a.updateLocalProgress(e);
                      } else i[0].updateLocalProgress(e);
                    }
                  },
                },
                {
                  key: 'reconcile',
                  value: function() {
                    for (var e = 0, t = this.attributes.length; e < t; e++) {
                      var r = this.attributes[e],
                        n = this.getNearestKeyframeForAttribute(r, this.group.position.local);
                      n.updateLocalProgress(this.group.position.local),
                        n.snapAtCreation && n.reconcile(r);
                    }
                  },
                },
                {
                  key: 'determineActiveKeyframes',
                  value: function(e) {
                    var t = this;
                    e = e || g(Array.from(document.documentElement.classList));
                    var r = this._activeKeyframes,
                      n = this.attributes;
                    (this._activeKeyframes = []), (this.attributes = []), (this.keyframes = {});
                    for (var i = 0; i < this._allKeyframes.length; i++) {
                      var a = this._allKeyframes[i];
                      if (a.setEnabled(e)) {
                        this._activeKeyframes.push(a);
                        for (var o in a.animValues)
                          (this.keyframes[o] = this.keyframes[o] || []),
                            this.keyframes[o].push(a),
                            this.attributes.indexOf(o) === -1 &&
                              (this.attributes.push(o), (this.tweenProps[o].isActive = !0));
                      }
                    }
                    var s = r.filter(function(e) {
                      return t._activeKeyframes.indexOf(e) === -1;
                    });
                    if (0 !== s.length) {
                      var p = n.filter(function(e) {
                        return t.attributes.indexOf(e) === -1;
                      });
                      if (0 !== p.length)
                        if (((this.needsWrite = !0), this._ownerIsElement))
                          j.external(function() {
                            var e = [
                                'x',
                                'y',
                                'z',
                                'scale',
                                'scaleX',
                                'scaleY',
                                'rotation',
                                'rotationX',
                                'rotationY',
                                'rotationZ',
                              ],
                              r = p.filter(function(t) {
                                return e.indexOf(t) !== -1;
                              });
                            r.length > 0 && t.element.style.removeProperty('transform');
                            for (var n = 0, i = p.length; n < i; ++n) {
                              var a = p[n],
                                o = t.tweenProps[a];
                              (o.current = o.target),
                                (o.isActive = !1),
                                'opacity' === a && t.element.style.removeProperty('opacity');
                            }
                            for (var u = 0, g = s.length; u < g; ++u) {
                              var l = s[u];
                              l instanceof c && l._unapply();
                            }
                          }, !0);
                        else
                          for (var u = 0, l = p.length; u < l; ++u) {
                            var h = this.tweenProps[p[u]];
                            (h.current = h.target), (h.isActive = !1);
                          }
                    }
                  },
                },
                {
                  key: 'onDOMRead',
                  value: function(e) {
                    for (var t = 0, r = this.attributes.length; t < r; t++) {
                      var n = this.attributes[t];
                      this.tweenProps[n].previousValue = this.tweenProps[n].current;
                      var i = this.getNearestKeyframeForAttribute(n, e.local);
                      i && i.onDOMRead(n),
                        this.tweenProps[n].previousValue !== this.tweenProps[n].current &&
                          (this.needsWrite = !0);
                    }
                  },
                },
                {
                  key: 'onDOMWrite',
                  value: function() {
                    (this.needsWrite || this.needsClassUpdate || this.needsStyleUpdate) &&
                      ((this.needsWrite = !1), this.onDOMWriteImp(), this.handleEventDispatch());
                  },
                },
                {
                  key: 'onDOMWriteForObject',
                  value: function() {
                    for (var e = 0, t = this.attributes.length; e < t; e++) {
                      var r = this.attributes[e];
                      this.element[r] = this.tweenProps[r].current;
                    }
                  },
                },
                {
                  key: 'onDOMWriteForElement',
                  value: function() {
                    var e = this.tweenProps;
                    if (e.z.isActive || e.rotationX.isActive || e.rotationY.isActive) {
                      var t = this.mat4;
                      if (
                        ((t[0] = 1),
                        (t[1] = 0),
                        (t[2] = 0),
                        (t[3] = 0),
                        (t[4] = 0),
                        (t[5] = 1),
                        (t[6] = 0),
                        (t[7] = 0),
                        (t[8] = 0),
                        (t[9] = 0),
                        (t[10] = 1),
                        (t[11] = 0),
                        (t[12] = 0),
                        (t[13] = 0),
                        (t[14] = 0),
                        (t[15] = 1),
                        e.x.isActive || e.y.isActive || e.z.isActive)
                      ) {
                        var r = e.x.current,
                          n = e.y.current,
                          i = e.z.current;
                        (t[12] = t[0] * r + t[4] * n + t[8] * i + t[12]),
                          (t[13] = t[1] * r + t[5] * n + t[9] * i + t[13]),
                          (t[14] = t[2] * r + t[6] * n + t[10] * i + t[14]),
                          (t[15] = t[3] * r + t[7] * n + t[11] * i + t[15]);
                      }
                      if (e.rotation.isActive || e.rotationZ.isActive) {
                        var a = (e.rotation.current || e.rotationZ.current) * d;
                        m.rotateZ(t, t, a);
                      }
                      if (e.rotationX.isActive) {
                        var o = e.rotationX.current * d;
                        m.rotateX(t, t, o);
                      }
                      if (e.rotationY.isActive) {
                        var s = e.rotationY.current * d;
                        m.rotateY(t, t, s);
                      }
                      (e.scale.isActive || e.scaleX.isActive || e.scaleY.isActive) &&
                        m.scale(t, t, [e.scale.current, e.scale.current, 1]),
                        (this.element.style.transform =
                          'matrix3d(' +
                          t[0] +
                          ',' +
                          t[1] +
                          ',' +
                          t[2] +
                          ',' +
                          t[3] +
                          ',' +
                          t[4] +
                          ',' +
                          t[5] +
                          ',' +
                          t[6] +
                          ',' +
                          t[7] +
                          ',' +
                          t[8] +
                          ',' +
                          t[9] +
                          ',' +
                          t[10] +
                          ',' +
                          t[11] +
                          ',' +
                          t[12] +
                          ',' +
                          t[13] +
                          ',' +
                          t[14] +
                          ',' +
                          t[15] +
                          ')');
                    } else if (
                      e.x.isActive ||
                      e.y.isActive ||
                      e.rotation.isActive ||
                      e.rotationZ.isActive ||
                      e.scale.isActive ||
                      e.scaleX.isActive ||
                      e.scaleY.isActive
                    ) {
                      var p = this.mat2d;
                      if (
                        ((p[0] = 1),
                        (p[1] = 0),
                        (p[2] = 0),
                        (p[3] = 1),
                        (p[4] = 0),
                        (p[5] = 0),
                        e.x.isActive || e.y.isActive)
                      ) {
                        var c = e.x.current,
                          u = e.y.current,
                          g = p[0],
                          l = p[1],
                          h = p[2],
                          f = p[3],
                          j = p[4],
                          v = p[5];
                        (p[0] = g),
                          (p[1] = l),
                          (p[2] = h),
                          (p[3] = f),
                          (p[4] = g * c + h * u + j),
                          (p[5] = l * c + f * u + v);
                      }
                      if (e.rotation.isActive || e.rotationZ.isActive) {
                        var y = (e.rotation.current || e.rotationZ.current) * d,
                          _ = p[0],
                          b = p[1],
                          E = p[2],
                          w = p[3],
                          x = p[4],
                          k = p[5],
                          S = Math.sin(y),
                          A = Math.cos(y);
                        (p[0] = _ * A + E * S),
                          (p[1] = b * A + w * S),
                          (p[2] = _ * -S + E * A),
                          (p[3] = b * -S + w * A),
                          (p[4] = x),
                          (p[5] = k);
                      }
                      e.scale.isActive
                        ? ((p[0] = p[0] * e.scale.current),
                          (p[1] = p[1] * e.scale.current),
                          (p[2] = p[2] * e.scale.current),
                          (p[3] = p[3] * e.scale.current),
                          (p[4] = p[4]),
                          (p[5] = p[5]))
                        : (e.scaleX.isActive || e.scaleY.isActive) &&
                          ((p[0] = p[0] * e.scaleX.current),
                          (p[1] = p[1] * e.scaleX.current),
                          (p[2] = p[2] * e.scaleY.current),
                          (p[3] = p[3] * e.scaleY.current),
                          (p[4] = p[4]),
                          (p[5] = p[5])),
                        (this.element.style.transform =
                          'matrix(' +
                          p[0] +
                          ', ' +
                          p[1] +
                          ', ' +
                          p[2] +
                          ', ' +
                          p[3] +
                          ', ' +
                          p[4] +
                          ', ' +
                          p[5] +
                          ')');
                    }
                    if (
                      (e.opacity.isActive && (this.element.style.opacity = e.opacity.current),
                      this.needsStyleUpdate)
                    ) {
                      for (var T in this.tweenProps.targetStyles)
                        null !== this.tweenProps.targetStyles[T] &&
                          (this.element.style[T] = this.tweenProps.targetStyles[T]),
                          (this.tweenProps.targetStyles[T] = null);
                      this.needsStyleUpdate = !1;
                    }
                    this.needsClassUpdate &&
                      (this.tweenProps.targetClasses.add.length > 0 &&
                        this.element.classList.add.apply(
                          this.element.classList,
                          this.tweenProps.targetClasses.add
                        ),
                      this.tweenProps.targetClasses.remove.length > 0 &&
                        this.element.classList.remove.apply(
                          this.element.classList,
                          this.tweenProps.targetClasses.remove
                        ),
                      (this.tweenProps.targetClasses.add.length = 0),
                      (this.tweenProps.targetClasses.remove.length = 0),
                      (this.needsClassUpdate = !1));
                  },
                },
                {
                  key: 'handleEventDispatch',
                  value: function() {
                    if (0 !== this.keyframesRequiringDispatch.length) {
                      for (var e = 0, t = this.keyframesRequiringDispatch.length; e < t; e++) {
                        var r = this.keyframesRequiringDispatch[e];
                        (r.needsEventDispatch = !1),
                          (this.eventObject.keyframe = r),
                          (this.eventObject.pageMetrics = p.pageMetrics),
                          (this.eventObject.event = r.event),
                          this.trigger(r.event, this.eventObject);
                      }
                      this.keyframesRequiringDispatch.length = 0;
                    }
                    if (0 !== this._events.draw.length) {
                      (this.eventObject.keyframe = null), (this.eventObject.event = 'draw');
                      for (var n = this._events.draw.length - 1; n >= 0; n--)
                        this._events.draw[n](this.eventObject);
                    }
                  },
                },
                {
                  key: 'updateAnimationConstraints',
                  value: function() {
                    for (var e = this, t = 0, r = this._activeKeyframes.length; t < r; t++)
                      this._activeKeyframes[t].evaluateConstraints();
                    this.attributes.forEach(function(t) {
                      1 !== e.keyframes[t].length && e.keyframes[t].sort(p.KeyframeComparison);
                    }),
                      this.updateDeferredPropertyValues();
                  },
                },
                {
                  key: 'refreshMetrics',
                  value: function() {
                    var e = new Set([this.element]);
                    this._allKeyframes.forEach(function(t) {
                      return t.anchors.forEach(function(t) {
                        return e.add(t);
                      });
                    }),
                      this.group.metrics.refreshCollection(e),
                      (this.group.keyframesDirty = !0);
                  },
                },
                {
                  key: 'updateDeferredPropertyValues',
                  value: function() {
                    for (var e = 0, t = this.attributes.length; e < t; e++) {
                      var r = this.attributes[e],
                        n = this.keyframes[r],
                        i = n[0];
                      if (!(i.keyframeType > p.KeyframeTypes.InterpolationForward))
                        for (var a = 0, o = n.length; a < o; a++) {
                          var s = n[a];
                          if (null === s.jsonProps[r][0]) {
                            if (0 === a) {
                              s.animValues[r][0] = this.tweenProps[r].initialValue;
                              continue;
                            }
                            s.animValues[r][0] = n[a - 1].animValues[r][1];
                          }
                          if (null === s.jsonProps[r][1]) {
                            if (a === o - 1)
                              throw new RangeError(
                                "AnimSystem - last keyframe cannot defer it's end value! " +
                                  r +
                                  ':[' +
                                  s.jsonProps[r][0] +
                                  ',null]'
                              );
                            s.animValues[r][1] = n[a + 1].animValues[r][0];
                          }
                        }
                    }
                  },
                },
                {
                  key: 'getBounds',
                  value: function(e) {
                    (this.boundsMin = Number.MAX_VALUE), (this.boundsMax = -Number.MAX_VALUE);
                    for (var t = 0, r = this.attributes.length; t < r; t++)
                      for (var n = this.keyframes[this.attributes[t]], i = 0; i < n.length; i++) {
                        var a = n[i];
                        (this.boundsMin = Math.min(a.start, this.boundsMin)),
                          (this.boundsMax = Math.max(a.end, this.boundsMax)),
                          (e.min = Math.min(a.start, e.min)),
                          (e.max = Math.max(a.end, e.max));
                      }
                  },
                },
                {
                  key: 'getNearestKeyframeForAttribute',
                  value: function(e, t) {
                    t = void 0 !== t ? t : this.group.position.local;
                    var r = null,
                      n = Number.POSITIVE_INFINITY,
                      i = this.keyframes[e];
                    if (void 0 === i) return null;
                    var a = i.length;
                    if (0 === a) return null;
                    if (1 === a) return i[0];
                    for (var o = 0; o < a; o++) {
                      var s = i[o];
                      if (s.isInRange(t)) {
                        r = s;
                        break;
                      }
                      var p = Math.min(Math.abs(t - s.start), Math.abs(t - s.end));
                      p < n && ((n = p), (r = s));
                    }
                    return r;
                  },
                },
                {
                  key: 'getAllKeyframesForAttribute',
                  value: function(e) {
                    return this.keyframes[e];
                  },
                },
                {
                  key: 'updateKeyframe',
                  value: function(e, t) {
                    var r = this;
                    e.parseOptions(t),
                      e.evaluateConstraints(),
                      (this.group.keyframesDirty = !0),
                      j.update(function() {
                        r.trigger(p.EVENTS.ON_KEYFRAME_UPDATED, e),
                          r.group.trigger(p.EVENTS.ON_KEYFRAME_UPDATED, e);
                      }, !0);
                  },
                },
                {
                  key: 'removeKeyframe',
                  value: function(e) {
                    var t = this,
                      r = this._allKeyframes.indexOf(e);
                    return r === -1
                      ? Promise.resolve(null)
                      : (this._allKeyframes.splice(r, 1),
                        (this.group.keyframesDirty = !0),
                        new Promise(function(r) {
                          t.group.rafEmitter.executor.eventEmitter.once('before:draw', function() {
                            r(e), e.destroy();
                          });
                        }));
                  },
                },
                {
                  key: 'updateAnimation',
                  value: function(e, t) {
                    return (
                      this.group.gui &&
                        console.warn(
                          'KeyframeController.updateAnimation(keyframe,props) has been deprecated. Please use updateKeyframe(keyframe,props)'
                        ),
                      this.updateKeyframe(e, t)
                    );
                  },
                },
              ]),
              t
            );
          })(h);
        t.exports = v;
      },
      {
        '../Model/AnimSystemModel': 107,
        '../Model/InferKeyframeFromProps': 110,
        '../Model/UUID': 111,
        '../utils/arrayToObject': 117,
        './Keyframe': 103,
        './KeyframeCSSClass': 104,
        '@marcom/ac-event-emitter-micro': 34,
        '@marcom/ac-raf-emitter/draw': 64,
        '@marcom/ac-raf-emitter/external': 65,
        '@marcom/ac-raf-emitter/update': 68,
        '@marcom/decompose-css-transform': 122,
        'gl-mat4/create': 145,
        'gl-mat4/rotateX': 147,
        'gl-mat4/rotateY': 148,
        'gl-mat4/rotateZ': 149,
        'gl-mat4/scale': 150,
      },
    ],
    106: [
      function(e, t, r) {
        'use strict';
        function n(e, t) {
          if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
        }
        function i(e, t) {
          if (!e)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return !t || ('object' != typeof t && 'function' != typeof t) ? e : t;
        }
        function a(e, t) {
          if ('function' != typeof t && null !== t)
            throw new TypeError(
              'Super expression must either be null or a function, not ' + typeof t
            );
          (e.prototype = Object.create(t && t.prototype, {
            constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 },
          })),
            t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : (e.__proto__ = t));
        }
        var o = (function() {
            function e(e, t) {
              for (var r = 0; r < t.length; r++) {
                var n = t[r];
                (n.enumerable = n.enumerable || !1),
                  (n.configurable = !0),
                  'value' in n && (n.writable = !0),
                  Object.defineProperty(e, n.key, n);
              }
            }
            return function(t, r, n) {
              return r && e(t.prototype, r), n && e(t, n), t;
            };
          })(),
          s = function g(e, t, r) {
            null === e && (e = Function.prototype);
            var n = Object.getOwnPropertyDescriptor(e, t);
            if (void 0 === n) {
              var i = Object.getPrototypeOf(e);
              return null === i ? void 0 : g(i, t, r);
            }
            if ('value' in n) return n.value;
            var a = n.get;
            if (void 0 !== a) return a.call(r);
          },
          p = e('./Keyframe'),
          c = e('../Model/AnimSystemModel.js'),
          u = (function(e) {
            function t(e, r) {
              n(this, t);
              var a = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, r));
              return (
                (a.keyframeType = c.KeyframeTypes.Event),
                (a.isApplied = !1),
                (a.hasDuration = !1),
                (a.isCurrentlyInRange = !1),
                a
              );
            }
            return (
              a(t, e),
              o(t, [
                {
                  key: 'parseOptions',
                  value: function(e) {
                    (e.x = void 0),
                      (e.y = void 0),
                      (e.scale = void 0),
                      (e.scaleX = void 0),
                      (e.scaleY = void 0),
                      (e.rotation = void 0),
                      (e.style = void 0),
                      (e.cssClass = void 0),
                      (e.rotation = void 0),
                      (e.opacity = void 0),
                      (e.hold = void 0),
                      void 0 === e.end && (e.end = e.start),
                      (this.event = e.event),
                      (this.animValues[this.event] = [0, 0]),
                      'undefined' == typeof this.controller.tweenProps[this.event] &&
                        (this.controller.tweenProps[this.event] = new c.TargetValue(0, 1, !1)),
                      s(
                        t.prototype.__proto__ || Object.getPrototypeOf(t.prototype),
                        'parseOptions',
                        this
                      ).call(this, e),
                      (this.keyframeType = c.KeyframeTypes.Event);
                  },
                },
                {
                  key: 'updateLocalProgress',
                  value: function(e) {
                    if (this.hasDuration) {
                      var t = this.isCurrentlyInRange,
                        r = e >= this.start && e <= this.end;
                      if (t === r) return;
                      return (
                        (this.isCurrentlyInRange = r),
                        void (r && !t
                          ? this._trigger(this.event + ':enter')
                          : t && !r && this._trigger(this.event + ':exit'))
                      );
                    }
                    !this.isApplied && e >= this.start
                      ? ((this.isApplied = !0), this._trigger(this.event))
                      : this.isApplied &&
                        e < this.start &&
                        ((this.isApplied = !1), this._trigger(this.event + ':reverse'));
                  },
                },
                {
                  key: '_trigger',
                  value: function(e) {
                    (this.controller.eventObject.event = e),
                      (this.controller.eventObject.keyframe = this),
                      this.controller.trigger(e, this.controller.eventObject);
                  },
                },
                {
                  key: 'evaluateConstraints',
                  value: function() {
                    s(
                      t.prototype.__proto__ || Object.getPrototypeOf(t.prototype),
                      'evaluateConstraints',
                      this
                    ).call(this),
                      (this.hasDuration = this.start !== this.end);
                  },
                },
                {
                  key: 'reset',
                  value: function(e) {
                    (this.isApplied = !1),
                      (this.isCurrentlyInRange = !1),
                      s(
                        t.prototype.__proto__ || Object.getPrototypeOf(t.prototype),
                        'reset',
                        this
                      ).call(this, e);
                  },
                },
                { key: 'onDOMRead', value: function(e, t) {} },
                { key: 'reconcile', value: function(e, t) {} },
                { key: 'evaluateInterpolationConstraints', value: function() {} },
              ]),
              t
            );
          })(p);
        (u.DATA_ATTRIBUTE = 'data-anim-event'), (t.exports = u);
      },
      { '../Model/AnimSystemModel.js': 107, './Keyframe': 103 },
    ],
    107: [
      function(e, t, r) {
        'use strict';
        function n(e, t) {
          if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
        }
        var i = {
          GUI_INSTANCE: null,
          ANIM_INSTANCE: null,
          VIEWPORT_EMITTER_ELEMENT: void 0,
          LOCAL_STORAGE_KEYS: {
            GuiPosition: 'anim-ui.position',
            GroupCollapsedStates: 'anim-ui.group-collapsed-states',
            scrollY: 'anim-ui.scrollY-position',
            path: 'anim-ui.path',
          },
          RESIZE_TIMEOUT: -1,
          BREAKPOINTS: [
            { name: 'S', mediaQuery: 'only screen and (max-width: 735px)' },
            { name: 'M', mediaQuery: 'only screen and (max-width: 1068px)' },
            { name: 'L', mediaQuery: 'only screen and (min-width: 1442px)' },
            { name: 'L', mediaQuery: 'only screen and (min-width: 1069px)' },
          ],
          getBreakpoint: function() {
            for (var e = 0; e < i.BREAKPOINTS.length; e++) {
              var t = i.BREAKPOINTS[e],
                r = window.matchMedia(t.mediaQuery);
              if (r.matches) return t.name;
            }
          },
          KeyframeDefaults: {
            ease: 1,
            epsilon: 0.05,
            easeFunctionString: 'linear',
            easeFunction: 'linear',
            hold: !1,
            snapAtCreation: !1,
            toggle: !1,
            breakpointMask: 'SMLX',
            event: '',
            disabledWhen: [],
            cssClass: '',
          },
          KeyframeTypes: { Interpolation: 0, InterpolationForward: 1, CSSClass: 2, Event: 3 },
          EVENTS: {
            ON_DOM_KEYFRAMES_CREATED: 'ON_DOM_KEYFRAMES_CREATED',
            ON_DOM_GROUPS_CREATED: 'ON_DOM_GROUPS_CREATED',
            ON_GROUP_CREATED: 'ON_GROUP_CREATED',
            ON_KEYFRAME_UPDATED: 'ON_KEYFRAME_UPDATED',
            ON_TIMELINE_START: 'ON_TIMELINE_START',
            ON_TIMELINE_UPDATE: 'ON_TIMELINE_UPDATE',
            ON_TIMELINE_COMPLETE: 'ON_TIMELINE_COMPLETE',
          },
          PageEvents: {
            ON_SCROLL: 'ON_SCROLL',
            ON_RESIZE_IMMEDIATE: 'ON_RESIZE_IMMEDIATE',
            ON_RESIZE_DEBOUNCED: 'ON_RESIZE_DEBOUNCED',
            ON_BREAKPOINT_CHANGE: 'ON_BREAKPOINT_CHANGE',
          },
          KeyframeJSONReservedWords: [
            'event',
            'cssClass',
            'style',
            'anchors',
            'start',
            'end',
            'epsilon',
            'easeFunction',
            'ease',
            'breakpointMask',
            'disabledWhen',
          ],
          TweenProps: function a() {
            n(this, a);
          },
          TargetValue: function o(e, t, r) {
            n(this, o),
              (this.epsilon = parseFloat(t)),
              (this.snapAtCreation = r),
              (this.initialValue = e),
              (this.target = e),
              (this.current = e),
              (this.previousValue = e),
              (this.isActive = !1);
          },
          AnimInfo: function(e, t) {
            var r = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            (this.isGroup = r),
              (this.group = e),
              (this.controller = t),
              (this.controllers = []),
              (this.tweenProps = new i.TweenProps());
          },
          Progress: function() {
            (this.local = 0), (this.localUnclamped = 0), (this.lastPosition = 0);
          },
          ViewableRange: function(e, t) {
            (this.a = e.top - t),
              this.a < 0 && (this.a = e.top),
              (this.b = e.top),
              (this.d = e.bottom),
              (this.c = Math.max(this.d - t, this.b));
          },
          pageMetrics: new (function() {
            (this.scrollX = 0),
              (this.scrollY = 0),
              (this.windowWidth = 0),
              (this.windowHeight = 0),
              (this.documentOffsetX = 0),
              (this.documentOffsetY = 0),
              (this.previousBreakpoint = ''),
              (this.breakpoint = '');
          })(),
          EventObject: function(e) {
            (this.controller = e),
              (this.element = this.controller.element),
              (this.keyframe = null),
              (this.event = ''),
              (this.tweenProps = this.controller.tweenProps);
          },
          KeyframeComparison: function(e, t) {
            return e.start < t.start ? -1 : e.start > t.start ? 1 : 0;
          },
        };
        t.exports = i;
      },
      {},
    ],
    108: [
      function(e, t, r) {
        'use strict';
        function n(e, t) {
          if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
        }
        var i = function a() {
          n(this, a),
            (this.linear = function(e) {
              return e;
            }),
            (this.easeInQuad = function(e) {
              return e * e;
            }),
            (this.easeOutQuad = function(e) {
              return e * (2 - e);
            }),
            (this.easeInOutQuad = function(e) {
              return e < 0.5 ? 2 * e * e : -1 + (4 - 2 * e) * e;
            }),
            (this.easeInSin = function(e) {
              return 1 + Math.sin((Math.PI / 2) * e - Math.PI / 2);
            }),
            (this.easeOutSin = function(e) {
              return Math.sin((Math.PI / 2) * e);
            }),
            (this.easeInOutSin = function(e) {
              return (1 + Math.sin(Math.PI * e - Math.PI / 2)) / 2;
            }),
            (this.easeInElastic = function(e) {
              return 0 === e ? e : (0.04 - 0.04 / e) * Math.sin(25 * e) + 1;
            }),
            (this.easeOutElastic = function(e) {
              return ((0.04 * e) / --e) * Math.sin(25 * e);
            }),
            (this.easeInOutElastic = function(e) {
              return (e -= 0.5) < 0
                ? (0.02 + 0.01 / e) * Math.sin(50 * e)
                : (0.02 - 0.01 / e) * Math.sin(50 * e) + 1;
            }),
            (this.easeOutBack = function(e) {
              return (e -= 1), e * e * (2.70158 * e + 1.70158) + 1;
            }),
            (this.easeInCubic = function(e) {
              return e * e * e;
            }),
            (this.easeOutCubic = function(e) {
              return --e * e * e + 1;
            }),
            (this.easeInOutCubic = function(e) {
              return e < 0.5 ? 4 * e * e * e : (e - 1) * (2 * e - 2) * (2 * e - 2) + 1;
            }),
            (this.easeInQuart = function(e) {
              return e * e * e * e;
            }),
            (this.easeOutQuart = function(e) {
              return 1 - --e * e * e * e;
            }),
            (this.easeInOutQuart = function(e) {
              return e < 0.5 ? 8 * e * e * e * e : 1 - 8 * --e * e * e * e;
            }),
            (this.easeInQuint = function(e) {
              return e * e * e * e * e;
            }),
            (this.easeOutQuint = function(e) {
              return 1 + --e * e * e * e * e;
            }),
            (this.easeInOutQuint = function(e) {
              return e < 0.5 ? 16 * e * e * e * e * e : 1 + 16 * --e * e * e * e * e;
            });
        };
        t.exports = new i();
      },
      {},
    ],
    109: [
      function(e, t, r) {
        'use strict';
        function n(e, t) {
          if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
        }
        var i = (function() {
            function e(e, t) {
              for (var r = 0; r < t.length; r++) {
                var n = t[r];
                (n.enumerable = n.enumerable || !1),
                  (n.configurable = !0),
                  'value' in n && (n.writable = !0),
                  Object.defineProperty(e, n.key, n);
              }
            }
            return function(t, r, n) {
              return r && e(t.prototype, r), n && e(t, n), t;
            };
          })(),
          a = e('./AnimSystemModel'),
          o = function(e, t) {
            return void 0 === e || null === e ? t : e;
          },
          s = (function() {
            function e() {
              n(this, e), this.clear();
            }
            return (
              i(e, [
                {
                  key: 'clear',
                  value: function() {
                    this._metrics = new WeakMap();
                  },
                },
                {
                  key: 'destroy',
                  value: function() {
                    this._metrics = null;
                  },
                },
                {
                  key: 'add',
                  value: function(e) {
                    var t = this._metrics.get(e);
                    if (t) return t;
                    var r = new p(e);
                    return this._metrics.set(e, r), this._refreshMetrics(e, r);
                  },
                },
                {
                  key: 'get',
                  value: function(e) {
                    return this._metrics.get(e);
                  },
                },
                {
                  key: 'refreshCollection',
                  value: function(e) {
                    var t = this;
                    e.forEach(function(e) {
                      return t._refreshMetrics(e, null);
                    });
                  },
                },
                {
                  key: 'refreshMetrics',
                  value: function(e) {
                    return this._refreshMetrics(e);
                  },
                },
                {
                  key: '_refreshMetrics',
                  value: function(e, t) {
                    if (((t = t || this._metrics.get(e)), !(e instanceof Element)))
                      return (
                        (t.width = o(e.width, 0)),
                        (t.height = o(e.height, 0)),
                        (t.top = o(e.top, o(e.y, 0))),
                        (t.left = o(e.left, o(e.x, 0))),
                        (t.right = t.left + t.width),
                        (t.bottom = t.top + t.height),
                        t
                      );
                    if (void 0 === e.offsetWidth) {
                      var r = e.getBoundingClientRect();
                      return (
                        (t.width = r.width),
                        (t.height = r.height),
                        (t.top = a.pageMetrics.scrollY + r.top),
                        (t.left = a.pageMetrics.scrollX + r.left),
                        (t.right = t.left + t.width),
                        (t.bottom = t.top + t.height),
                        t
                      );
                    }
                    (t.width = e.offsetWidth),
                      (t.height = e.offsetHeight),
                      (t.top = a.pageMetrics.documentOffsetY),
                      (t.left = a.pageMetrics.documentOffsetX);
                    for (var n = e; n; )
                      (t.top += n.offsetTop), (t.left += n.offsetLeft), (n = n.offsetParent);
                    return (t.right = t.left + t.width), (t.bottom = t.top + t.height), t;
                  },
                },
              ]),
              e
            );
          })(),
          p = (function() {
            function e(t) {
              n(this, e),
                (this.top = 0),
                (this.bottom = 0),
                (this.left = 0),
                (this.right = 0),
                (this.height = 0),
                (this.width = 0);
            }
            return (
              i(e, [
                {
                  key: 'toString',
                  value: function() {
                    return (
                      'top:' +
                      this.top +
                      ', bottom:' +
                      this.bottom +
                      ', left:' +
                      this.left +
                      ', right:' +
                      this.right +
                      ', height:' +
                      this.height +
                      ', width:' +
                      this.width
                    );
                  },
                },
                {
                  key: 'toObject',
                  value: function() {
                    return {
                      top: this.top,
                      bottom: this.bottom,
                      left: this.left,
                      right: this.right,
                      height: this.height,
                      width: this.width,
                    };
                  },
                },
              ]),
              e
            );
          })();
        t.exports = s;
      },
      { './AnimSystemModel': 107 },
    ],
    110: [
      function(e, t, r) {
        'use strict';
        var n = e('./AnimSystemModel'),
          i = e('../Keyframes/Keyframe'),
          a = e('../Keyframes/KeyframeDiscreteEvent'),
          o = e('../Keyframes/KeyframeCSSClass'),
          s = function(e) {
            for (var t in e) {
              var r = e[t];
              if (n.KeyframeJSONReservedWords.indexOf(t) === -1 && Array.isArray(r)) return !0;
            }
            return !1;
          };
        t.exports = function(e) {
          if (void 0 !== e.cssClass || void 0 !== e.style) {
            if (s(e))
              throw 'CSS Keyframes cannot tween values, please use multiple keyframes instead';
            return o;
          }
          if (s(e)) return i;
          if (e.event) return a;
          throw (delete e.anchors, 'Could not determine tween type based on ' + JSON.stringify(e));
        };
      },
      {
        '../Keyframes/Keyframe': 103,
        '../Keyframes/KeyframeCSSClass': 104,
        '../Keyframes/KeyframeDiscreteEvent': 106,
        './AnimSystemModel': 107,
      },
    ],
    111: [
      function(e, t, r) {
        'use strict';
        t.exports = function() {
          for (var e = '', t = 0; t < 8; t++) {
            var r = (16 * Math.random()) | 0;
            (8 !== t && 12 !== t && 16 !== t && 20 !== t) || (e += '-'),
              (e += (12 === t ? 4 : 16 === t ? (3 & r) | 8 : r).toString(16));
          }
          return e;
        };
      },
      {},
    ],
    112: [
      function(e, t, r) {
        'use strict';
        function n(e, t) {
          if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
        }
        var i = (function() {
            function e(e, t) {
              for (var r = 0; r < t.length; r++) {
                var n = t[r];
                (n.enumerable = n.enumerable || !1),
                  (n.configurable = !0),
                  'value' in n && (n.writable = !0),
                  Object.defineProperty(e, n.key, n);
              }
            }
            return function(t, r, n) {
              return r && e(t.prototype, r), n && e(t, n), t;
            };
          })(),
          a = 1e-5,
          o = Math.abs,
          s = 5,
          p = (function() {
            function e(t, r, i, a) {
              n(this, e),
                (this.cp = new Float32Array(6)),
                (this.cp[0] = 3 * t),
                (this.cp[1] = 3 * (i - t) - this.cp[0]),
                (this.cp[2] = 1 - this.cp[0] - this.cp[1]),
                (this.cp[3] = 3 * r),
                (this.cp[4] = 3 * (a - r) - this.cp[3]),
                (this.cp[5] = 1 - this.cp[3] - this.cp[4]);
            }
            return (
              i(e, [
                {
                  key: 'sampleCurveX',
                  value: function(e) {
                    return ((this.cp[2] * e + this.cp[1]) * e + this.cp[0]) * e;
                  },
                },
                {
                  key: 'sampleCurveY',
                  value: function(e) {
                    return ((this.cp[5] * e + this.cp[4]) * e + this.cp[3]) * e;
                  },
                },
                {
                  key: 'sampleCurveDerivativeX',
                  value: function(e) {
                    return (3 * this.cp[2] * e + 2 * this.cp[1]) * e + this.cp[0];
                  },
                },
                {
                  key: 'solveCurveX',
                  value: function(e) {
                    var t, r, n, i, p, c;
                    for (n = e, c = 0; c < s; c++) {
                      if (((i = this.sampleCurveX(n) - e), o(i) < a)) return n;
                      if (((p = this.sampleCurveDerivativeX(n)), o(p) < a)) break;
                      n -= i / p;
                    }
                    if (((t = 0), (r = 1), (n = e), n < t)) return t;
                    if (n > r) return r;
                    for (; t < r; ) {
                      if (((i = this.sampleCurveX(n)), o(i - e) < a)) return n;
                      e > i ? (t = n) : (r = n), (n = 0.5 * (r - t) + t);
                    }
                    return n;
                  },
                },
                {
                  key: 'solve',
                  value: function(e) {
                    return this.sampleCurveY(this.solveCurveX(e));
                  },
                },
              ]),
              e
            );
          })(),
          c = /\d*\.?\d+/g;
        (p.fromCSSString = function(e) {
          var t = e.match(c);
          if (4 !== t.length) throw 'UnitBezier could not convert ' + e + ' to cubic-bezier';
          var r = t.map(Number),
            n = new p(r[0], r[1], r[2], r[3]);
          return n.solve.bind(n);
        }),
          (t.exports = p);
      },
      {},
    ],
    113: [
      function(e, t, r) {
        'use strict';
        function n(e, t) {
          if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
        }
        var i =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function(e) {
                  return typeof e;
                }
              : function(e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                },
          a = (function() {
            function e(e, t) {
              for (var r = 0; r < t.length; r++) {
                var n = t[r];
                (n.enumerable = n.enumerable || !1),
                  (n.configurable = !0),
                  'value' in n && (n.writable = !0),
                  Object.defineProperty(e, n.key, n);
              }
            }
            return function(t, r, n) {
              return r && e(t.prototype, r), n && e(t, n), t;
            };
          })(),
          o = e('./Interpreter'),
          s = new (e('../Model/ElementMetricsLookup'))(),
          p = (function() {
            function e(t) {
              n(this, e),
                (this.group = t),
                (this.data = { target: null, anchors: null, metrics: this.group.metrics });
            }
            return (
              a(
                e,
                [
                  {
                    key: 'parseArray',
                    value: function(e, t) {
                      return [this.parseExpression(e, t[0]), this.parseExpression(e, t[1])];
                    },
                  },
                  {
                    key: 'parseExpression',
                    value: function(t, r) {
                      if (!r) return null;
                      if ('number' == typeof r) return r;
                      if ('string' != typeof r)
                        throw 'Expression must be a string, received ' +
                          ('undefined' == typeof r ? 'undefined' : i(r));
                      return (
                        (this.data.target = t.controller.element),
                        (this.data.anchors = t.anchors),
                        (this.data.keyframe = t.keyframe),
                        e._parse(r, this.data)
                      );
                    },
                  },
                  {
                    key: 'parseTimeValue',
                    value: function(e, t) {
                      if ('number' == typeof t) return t;
                      var r = this.group.expressionParser.parseExpression(e, t);
                      return this.group.convertScrollPositionToTValue(r);
                    },
                  },
                  {
                    key: 'destroy',
                    value: function() {
                      this.group = null;
                    },
                  },
                ],
                [
                  {
                    key: 'parse',
                    value: function(t, r) {
                      return (
                        (r = r || {}),
                        r &&
                          (s.clear(),
                          r.target && s.add(r.target),
                          r.anchors &&
                            r.anchors.forEach(function(e) {
                              return s.add(e);
                            })),
                        (r.metrics = s),
                        e._parse(t, r)
                      );
                    },
                  },
                  {
                    key: '_parse',
                    value: function(e, t) {
                      return o.Parse(e).execute(t);
                    },
                  },
                ]
              ),
              e
            );
          })();
        (p.programs = o.programs), (window.ExpressionParser = p), (t.exports = p);
      },
      { '../Model/ElementMetricsLookup': 109, './Interpreter': 114 },
    ],
    114: [
      function(e, t, r) {
        'use strict';
        function n(e, t) {
          if (!e)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return !t || ('object' != typeof t && 'function' != typeof t) ? e : t;
        }
        function i(e, t) {
          if ('function' != typeof t && null !== t)
            throw new TypeError(
              'Super expression must either be null or a function, not ' + typeof t
            );
          (e.prototype = Object.create(t && t.prototype, {
            constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 },
          })),
            t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : (e.__proto__ = t));
        }
        function a(e, t) {
          if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
        }
        var o = (function() {
            function e(e, t) {
              for (var r = 0; r < t.length; r++) {
                var n = t[r];
                (n.enumerable = n.enumerable || !1),
                  (n.configurable = !0),
                  'value' in n && (n.writable = !0),
                  Object.defineProperty(e, n.key, n);
              }
            }
            return function(t, r, n) {
              return r && e(t.prototype, r), n && e(t, n), t;
            };
          })(),
          s = e('../Model/AnimSystemModel'),
          p = e('@marcom/sm-math-utils'),
          c = {},
          u = {
            smoothstep: function(e, t, r) {
              return (r = u.clamp((r - e) / (t - e), 0, 1)), r * r * (3 - 2 * r);
            },
            deg: function(e) {
              return (180 * e) / Math.PI;
            },
            rad: function(e) {
              return (e * Math.PI) / 180;
            },
            random: function(e, t) {
              return Math.random() * (t - e) + e;
            },
            atan: Math.atan2,
          };
        Object.getOwnPropertyNames(Math).forEach(function(e) {
          return u[e] ? null : (u[e.toLowerCase()] = Math[e]);
        }),
          Object.getOwnPropertyNames(p).forEach(function(e) {
            return u[e] ? null : (u[e.toLowerCase()] = p[e]);
          });
        var g = null,
          l = {
            ANCHOR_CONST: 'a',
            ALPHA: 'ALPHA',
            LPAREN: '(',
            RPAREN: ')',
            PLUS: 'PLUS',
            MINUS: 'MINUS',
            MUL: 'MUL',
            DIV: 'DIV',
            INTEGER_CONST: 'INTEGER_CONST',
            FLOAT_CONST: 'FLOAT_CONST',
            COMMA: ',',
            EOF: 'EOF',
          },
          h = {
            NUMBERS: /\d|\d\.\d/,
            DIGIT: /\d/,
            OPERATOR: /[-+*\/]/,
            PAREN: /[()]/,
            WHITE_SPACE: /\s/,
            ALPHA: /[a-zA-Z]|%/,
            ALPHANUMERIC: /[a-zA-Z0-9]/,
            OBJECT_UNIT: /^(t|l|b|r|%w|%h|%|h|w)$/,
            GLOBAL_METRICS_UNIT: /^(px|vh|vw)$/,
            ANY_UNIT: /^(t|l|b|r|%w|%h|%|h|w|px|vh|vw)$/,
            MATH_FUNCTION: new RegExp('\\b(' + Object.keys(u).join('|') + ')\\b', 'i'),
          },
          f = {
            round: 1,
            clamp: 3,
            lerp: 3,
            random: 2,
            atan: 2,
            floor: 1,
            ceil: 1,
            abs: 1,
            cos: 1,
            sin: 1,
            smoothstep: 3,
            rad: 1,
            deg: 1,
            pow: 2,
            calc: 1,
          },
          j = function A(e, t) {
            a(this, A), (this.type = e), (this.value = t);
          };
        (j.ONE = new j('100', 100)), (j.EOF = new j(l.EOF, null));
        var d = function T(e) {
            a(this, T), (this.type = e);
          },
          m = (function(e) {
            function t(e, r) {
              a(this, t);
              var i = n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, 'UnaryOp'));
              return (i.token = i.op = e), (i.expr = r), i;
            }
            return i(t, e), t;
          })(d),
          v = (function(e) {
            function t(e, r, i) {
              a(this, t);
              var o = n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, 'BinOp'));
              return (o.left = e), (o.op = r), (o.right = i), o;
            }
            return i(t, e), t;
          })(d),
          y = (function(e) {
            function t(e, r) {
              a(this, t);
              var i = n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, 'MathOp'));
              if (((i.op = e), (i.list = r), f[e.value] && r.length !== f[e.value]))
                throw new Error(
                  "Incorrect number of arguments for '" +
                    e.value +
                    "'. Received " +
                    r.length +
                    ', expected ' +
                    f[e.value]
                );
              return i;
            }
            return i(t, e), t;
          })(d),
          _ = (function(e) {
            function t(e) {
              a(this, t);
              var r = n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, 'Num'));
              return (r.token = e), (r.value = e.value), r;
            }
            return i(t, e), t;
          })(d),
          b =
            ((function(e) {
              function t(e) {
                a(this, t);
                var r = n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, 'Unit'));
                return (r.token = e), (r.value = e.value), r;
              }
              return i(t, e), t;
            })(d),
            (function(e) {
              function t(e, r, i) {
                a(this, t);
                var o = n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, 'RefValue'));
                return (o.num = e), (o.ref = r), (o.unit = i), o;
              }
              return i(t, e), t;
            })(d)),
          E = (function(e) {
            function t(e, r) {
              a(this, t);
              var i = n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, 'CSSValue'));
              return (i.ref = e), (i.propertyName = r), i;
            }
            return i(t, e), t;
          })(d),
          w = (function(e) {
            function t(e, r) {
              a(this, t);
              var i = n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, 'PropValue'));
              return (i.ref = e), (i.propertyName = r), i;
            }
            return i(t, e), t;
          })(d),
          x = (function() {
            function e(t) {
              a(this, e),
                (this.text = t),
                (this.pos = 0),
                (this['char'] = this.text[this.pos]),
                (this.tokens = []);
              for (var r = void 0; (r = this.getNextToken()) && r !== j.EOF; ) this.tokens.push(r);
              this.tokens.push(r);
            }
            return (
              o(e, [
                {
                  key: 'advance',
                  value: function() {
                    this['char'] = this.text[++this.pos];
                  },
                },
                {
                  key: 'skipWhiteSpace',
                  value: function() {
                    for (; null != this['char'] && h.WHITE_SPACE.test(this['char']); )
                      this.advance();
                  },
                },
                {
                  key: 'name',
                  value: function() {
                    for (var e = ''; null != this['char'] && h.ALPHA.test(this['char']); )
                      (e += this['char']), this.advance();
                    return new j(l.ALPHA, e);
                  },
                },
                {
                  key: 'number',
                  value: function() {
                    for (var e = ''; null != this['char'] && h.DIGIT.test(this['char']); )
                      (e += this['char']), this.advance();
                    if (null != this['char'] && '.' === this['char']) {
                      for (
                        e += this['char'], this.advance();
                        null != this['char'] && h.DIGIT.test(this['char']);

                      )
                        (e += this['char']), this.advance();
                      return new j(l.FLOAT_CONST, parseFloat(e));
                    }
                    return new j(l.INTEGER_CONST, parseInt(e));
                  },
                },
                {
                  key: 'getNextToken',
                  value: function() {
                    for (; null != this['char']; )
                      if (h.WHITE_SPACE.test(this['char'])) this.skipWhiteSpace();
                      else {
                        if (h.DIGIT.test(this['char'])) return this.number();
                        if (',' === this['char']) return this.advance(), new j(l.COMMA, ',');
                        if (h.OPERATOR.test(this['char'])) {
                          var e = '',
                            t = this['char'];
                          switch (t) {
                            case '+':
                              e = l.PLUS;
                              break;
                            case '-':
                              e = l.MINUS;
                              break;
                            case '*':
                              e = l.MUL;
                              break;
                            case '/':
                              e = l.DIV;
                          }
                          return this.advance(), new j(e, t);
                        }
                        if (h.PAREN.test(this['char'])) {
                          var r = '',
                            n = this['char'];
                          switch (n) {
                            case '(':
                              r = l.LPAREN;
                              break;
                            case ')':
                              r = l.RPAREN;
                          }
                          return this.advance(), new j(r, n);
                        }
                        if (h.ALPHA.test(this['char'])) return this.name();
                        this.error('Unexpected character ' + this['char']);
                      }
                    return j.EOF;
                  },
                },
              ]),
              e
            );
          })(),
          k = (function() {
            function e(t) {
              a(this, e), (this.lexer = t), (this.pos = 0);
            }
            return (
              o(e, [
                {
                  key: 'error',
                  value: function t(e) {
                    var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : '',
                      n = this.lexer.text.slice(this.pos - 3, this.pos + 3),
                      t = new Error(
                        e + ' in "' + this.lexer.text + '" near "' + n + '". ' + r + ' '
                      );
                    throw (console.error(t.message, g ? g.keyframe || g.target : ''), t);
                  },
                },
                {
                  key: 'consume',
                  value: function(e) {
                    var t = this.currentToken;
                    return (
                      t.type === e
                        ? (this.pos += 1)
                        : this.error(
                            'Invalid token ' + this.currentToken.value + ', expected ' + e
                          ),
                      t
                    );
                  },
                },
                {
                  key: 'consumeList',
                  value: function(e) {
                    e.includes(this.currentToken)
                      ? (this.pos += 1)
                      : this.error(
                          'Invalid token ' + this.currentToken.value + ', expected ' + tokenType
                        );
                  },
                },
                {
                  key: 'expr',
                  value: function() {
                    for (
                      var e = this.term();
                      this.currentToken.type === l.PLUS || this.currentToken.type === l.MINUS;

                    ) {
                      var t = this.currentToken;
                      switch (t.value) {
                        case '+':
                          this.consume(l.PLUS);
                          break;
                        case '-':
                          this.consume(l.MINUS);
                      }
                      e = new v(e, t, this.term());
                    }
                    return e;
                  },
                },
                {
                  key: 'term',
                  value: function() {
                    for (
                      var e = this.factor();
                      this.currentToken.type === l.MUL || this.currentToken.type === l.DIV;

                    ) {
                      var t = this.currentToken;
                      switch (t.value) {
                        case '*':
                          this.consume(l.MUL);
                          break;
                        case '/':
                          this.consume(l.DIV);
                      }
                      e = new v(e, t, this.factor());
                    }
                    return e;
                  },
                },
                {
                  key: 'factor',
                  value: function() {
                    if (this.currentToken.type === l.PLUS)
                      return new m(this.consume(l.PLUS), this.factor());
                    if (this.currentToken.type === l.MINUS)
                      return new m(this.consume(l.MINUS), this.factor());
                    if (
                      this.currentToken.type === l.INTEGER_CONST ||
                      this.currentToken.type === l.FLOAT_CONST
                    ) {
                      var e = new _(this.currentToken);
                      if (
                        ((this.pos += 1),
                        h.OPERATOR.test(this.currentToken.value) ||
                          this.currentToken.type === l.RPAREN ||
                          this.currentToken.type === l.COMMA ||
                          this.currentToken.type === l.EOF)
                      )
                        return e;
                      if (
                        this.currentToken.type === l.ALPHA &&
                        this.currentToken.value === l.ANCHOR_CONST
                      )
                        return (
                          this.consume(l.ALPHA), new b(e, this.anchorIndex(), this.unit(h.ANY_UNIT))
                        );
                      if (this.currentToken.type === l.ALPHA)
                        return (
                          '%a' === this.currentToken.value &&
                            this.error('%a is invalid, try removing the %'),
                          new b(e, null, this.unit())
                        );
                      this.error('Expected a scaling unit type', "Such as 'h' / 'w'");
                    } else {
                      if (h.OBJECT_UNIT.test(this.currentToken.value))
                        return new b(new _(j.ONE), null, this.unit());
                      if (this.currentToken.value === l.ANCHOR_CONST) {
                        this.consume(l.ALPHA);
                        var t = this.anchorIndex();
                        if (h.OBJECT_UNIT.test(this.currentToken.value))
                          return new b(new _(j.ONE), t, this.unit());
                      } else if (this.currentToken.type === l.ALPHA) {
                        if (
                          'css' === this.currentToken.value ||
                          'prop' === this.currentToken.value
                        ) {
                          var r = 'css' === this.currentToken.value ? E : w;
                          this.consume(l.ALPHA), this.consume(l.LPAREN);
                          var n = this.propertyName(),
                            i = null;
                          return (
                            this.currentToken.type === l.COMMA &&
                              (this.consume(l.COMMA),
                              this.consume(l.ALPHA),
                              (i = this.anchorIndex())),
                            this.consume(l.RPAREN),
                            new r(i, n)
                          );
                        }
                        if (h.MATH_FUNCTION.test(this.currentToken.value)) {
                          var a = this.currentToken.value.toLowerCase();
                          if ('number' == typeof u[a])
                            return this.consume(l.ALPHA), new _(new j(l.ALPHA, u[a]));
                          var o = j[a] || new j(a, a),
                            s = [];
                          this.consume(l.ALPHA), this.consume(l.LPAREN);
                          var p = null;
                          do
                            this.currentToken.value === l.COMMA && this.consume(l.COMMA),
                              (p = this.expr()),
                              s.push(p);
                          while (this.currentToken.value === l.COMMA);
                          return this.consume(l.RPAREN), new y(o, s);
                        }
                      } else if (this.currentToken.type === l.LPAREN) {
                        this.consume(l.LPAREN);
                        var c = this.expr();
                        return this.consume(l.RPAREN), c;
                      }
                    }
                    this.error('Unexpected token ' + this.currentToken.value);
                  },
                },
                {
                  key: 'propertyName',
                  value: function() {
                    for (
                      var e = '';
                      this.currentToken.type === l.ALPHA || this.currentToken.type === l.MINUS;

                    )
                      (e += this.currentToken.value), (this.pos += 1);
                    return e;
                  },
                },
                {
                  key: 'unit',
                  value: function() {
                    var e =
                        arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : h.ANY_UNIT,
                      t = this.currentToken;
                    return t.type === l.ALPHA && e.test(t.value)
                      ? (this.consume(l.ALPHA),
                        new j(
                          l.ALPHA,
                          (t.value = t.value.replace(/%(h|w)/, '$1').replace('%', 'h'))
                        ))
                      : void this.error('Expected unit type');
                  },
                },
                {
                  key: 'anchorIndex',
                  value: function() {
                    var e = this.currentToken;
                    return e.type === l.INTEGER_CONST
                      ? (this.consume(l.INTEGER_CONST), new _(e))
                      : void this.error(
                          'Invalid anchor reference',
                          '. Should be something like a0, a1, a2'
                        );
                  },
                },
                {
                  key: 'parse',
                  value: function() {
                    var e = this.expr();
                    return (
                      this.currentToken !== j.EOF &&
                        this.error('Unexpected token ' + this.currentToken.value),
                      e
                    );
                  },
                },
                {
                  key: 'currentToken',
                  get: function() {
                    return this.lexer.tokens[this.pos];
                  },
                },
              ]),
              e
            );
          })(),
          S = (function() {
            function e(t) {
              a(this, e), (this.parser = t), (this.root = t.parse());
            }
            return (
              o(
                e,
                [
                  {
                    key: 'visit',
                    value: function(e) {
                      var t = this[e.type];
                      if (!t) throw new Error('No visit method named, ' + t);
                      var r = t.call(this, e);
                      return r;
                    },
                  },
                  {
                    key: 'BinOp',
                    value: function(e) {
                      switch (e.op.type) {
                        case l.PLUS:
                          return this.visit(e.left) + this.visit(e.right);
                        case l.MINUS:
                          return this.visit(e.left) - this.visit(e.right);
                        case l.MUL:
                          return this.visit(e.left) * this.visit(e.right);
                        case l.DIV:
                          return this.visit(e.left) / this.visit(e.right);
                      }
                    },
                  },
                  {
                    key: 'RefValue',
                    value: function(e) {
                      var t = this.unwrapReference(e),
                        r = e.unit.value,
                        n = e.num.value,
                        i = g.metrics.get(t);
                      switch (r) {
                        case 'h':
                          return 0.01 * n * i.height;
                        case 't':
                          return 0.01 * n * i.top;
                        case 'vh':
                          return 0.01 * n * s.pageMetrics.windowHeight;
                        case 'vw':
                          return 0.01 * n * s.pageMetrics.windowWidth;
                        case 'px':
                          return n;
                        case 'w':
                          return 0.01 * n * i.width;
                        case 'b':
                          return 0.01 * n * i.bottom;
                        case 'l':
                          return 0.01 * n * i.left;
                        case 'r':
                          return 0.01 * n * i.right;
                      }
                    },
                  },
                  {
                    key: 'PropValue',
                    value: function(e) {
                      var t = null === e.ref ? g.target : g.anchors[e.ref.value];
                      return t[e.propertyName];
                    },
                  },
                  {
                    key: 'CSSValue',
                    value: function(t) {
                      var r = this.unwrapReference(t),
                        n = getComputedStyle(r).getPropertyValue(t.propertyName);
                      return '' === n ? 0 : e.Parse(n).execute(g);
                    },
                  },
                  {
                    key: 'Num',
                    value: function(e) {
                      return e.value;
                    },
                  },
                  {
                    key: 'UnaryOp',
                    value: function(e) {
                      return e.op.type === l.PLUS
                        ? +this.visit(e.expr)
                        : e.op.type === l.MINUS
                        ? -this.visit(e.expr)
                        : void 0;
                    },
                  },
                  {
                    key: 'MathOp',
                    value: function(e) {
                      var t = this,
                        r = e.list.map(function(e) {
                          return t.visit(e);
                        });
                      return u[e.op.value].apply(null, r);
                    },
                  },
                  {
                    key: 'unwrapReference',
                    value: function(e) {
                      return null === e.ref
                        ? g.target
                        : (e.ref.value >= g.anchors.length &&
                            console.error(
                              'Not enough anchors supplied for expression ' +
                                this.parser.lexer.text,
                              g.target
                            ),
                          g.anchors[e.ref.value]);
                    },
                  },
                  {
                    key: 'execute',
                    value: function(e) {
                      return (g = e), this.visit(this.root);
                    },
                  },
                ],
                [
                  {
                    key: 'Parse',
                    value: function(t) {
                      return c[t] || (c[t] = new e(new k(new x(t))));
                    },
                  },
                ]
              ),
              e
            );
          })();
        (S.programs = c), (t.exports = S);
      },
      { '../Model/AnimSystemModel': 107, '@marcom/sm-math-utils': 124 },
    ],
    115: [
      function(e, t, r) {
        'use strict';
        function n(e, t) {
          if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
        }
        function i(e, t) {
          if (!e)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return !t || ('object' != typeof t && 'function' != typeof t) ? e : t;
        }
        function a(e, t) {
          if ('function' != typeof t && null !== t)
            throw new TypeError(
              'Super expression must either be null or a function, not ' + typeof t
            );
          (e.prototype = Object.create(t && t.prototype, {
            constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 },
          })),
            t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : (e.__proto__ = t));
        }
        var o = (function() {
            function e(e, t) {
              for (var r = 0; r < t.length; r++) {
                var n = t[r];
                (n.enumerable = n.enumerable || !1),
                  (n.configurable = !0),
                  'value' in n && (n.writable = !0),
                  Object.defineProperty(e, n.key, n);
              }
            }
            return function(t, r, n) {
              return r && e(t.prototype, r), n && e(t, n), t;
            };
          })(),
          s = function m(e, t, r) {
            null === e && (e = Function.prototype);
            var n = Object.getOwnPropertyDescriptor(e, t);
            if (void 0 === n) {
              var i = Object.getPrototypeOf(e);
              return null === i ? void 0 : m(i, t, r);
            }
            if ('value' in n) return n.value;
            var a = n.get;
            if (void 0 !== a) return a.call(r);
          },
          p = e('@marcom/ac-event-emitter-micro').EventEmitterMicro,
          c = e('@marcom/sm-math-utils'),
          u = e('./utils/arrayToObject'),
          g = e('./Model/AnimSystemModel'),
          l = e('./Model/ElementMetricsLookup'),
          h = e('./Parsing/ExpressionParser'),
          f = e('./Keyframes/KeyframeController'),
          j = {
            create: e('@marcom/ac-raf-emitter/RAFEmitter'),
            update: e('@marcom/ac-raf-emitter/update'),
            draw: e('@marcom/ac-raf-emitter/draw'),
          },
          d = (function(e) {
            function t(e, r) {
              n(this, t);
              var a = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
              return (
                (a.anim = r),
                (a.element = e),
                (a.name = a.name || e.getAttribute('data-anim-scroll-group')),
                (a.isEnabled = !0),
                (a.position = new g.Progress()),
                (a.metrics = new l()),
                a.metrics.add(a.element),
                (a.expressionParser = new h(a)),
                (a.boundsMin = 0),
                (a.boundsMax = 0),
                (a.timelineUpdateRequired = !1),
                (a._keyframesDirty = !1),
                (a.viewableRange = a.createViewableRange()),
                (a.defaultEase = g.KeyframeDefaults.ease),
                (a.keyframeControllers = []),
                a.updateProgress(a.getPosition()),
                (a.onDOMRead = a.onDOMRead.bind(a)),
                (a.onDOMWrite = a.onDOMWrite.bind(a)),
                (a.gui = null),
                a.finalizeInit(),
                a
              );
            }
            return (
              a(t, e),
              o(t, [
                {
                  key: 'finalizeInit',
                  value: function() {
                    (this.element._animInfo = new g.AnimInfo(this, null, !0)),
                      this.setupRAFEmitter();
                  },
                },
                {
                  key: 'destroy',
                  value: function() {
                    this.expressionParser.destroy(), (this.expressionParser = null);
                    for (var e = 0, r = this.keyframeControllers.length; e < r; e++)
                      this.keyframeControllers[e].destroy();
                    (this.keyframeControllers = null),
                      (this.position = null),
                      (this.viewableRange = null),
                      this.gui && (this.gui.destroy(), (this.gui = null)),
                      this.metrics.destroy(),
                      (this.metrics = null),
                      this.rafEmitter.destroy(),
                      (this.rafEmitter = null),
                      (this.anim = null),
                      this.element._animInfo &&
                        this.element._animInfo.group === this &&
                        ((this.element._animInfo.group = null), (this.element._animInfo = null)),
                      (this.element = null),
                      (this.isEnabled = !1),
                      s(
                        t.prototype.__proto__ || Object.getPrototypeOf(t.prototype),
                        'destroy',
                        this
                      ).call(this);
                  },
                },
                {
                  key: 'removeKeyframeController',
                  value: function(e) {
                    var t = this;
                    if (!this.keyframeControllers.includes(e)) return Promise.resolve();
                    var r = e._allKeyframes;
                    return (
                      (e._allKeyframes = []),
                      (this.keyframesDirty = !0),
                      new Promise(function(n) {
                        j.draw(function() {
                          var i = t.keyframeControllers.indexOf(e);
                          return i === -1
                            ? void n()
                            : (t.keyframeControllers.splice(i, 1),
                              e.onDOMWrite(),
                              r.forEach(function(e) {
                                return e.destroy();
                              }),
                              e.destroy(),
                              t.gui && t.gui.create(),
                              void n());
                        });
                      })
                    );
                  },
                },
                {
                  key: 'remove',
                  value: function() {
                    return this.anim.removeGroup(this);
                  },
                },
                {
                  key: 'setupRAFEmitter',
                  value: function(e) {
                    var t = this;
                    this.rafEmitter && this.rafEmitter.destroy(),
                      (this.rafEmitter = e || new j.create()),
                      this.rafEmitter.on('update', this.onDOMRead),
                      this.rafEmitter.on('draw', this.onDOMWrite),
                      this.rafEmitter.once('external', function() {
                        return t.reconcile();
                      });
                  },
                },
                {
                  key: 'requestDOMChange',
                  value: function() {
                    return !!this.isEnabled && this.rafEmitter.run();
                  },
                },
                {
                  key: 'onDOMRead',
                  value: function() {
                    this.keyframesDirty && this.onKeyframesDirty();
                    for (var e = 0, t = this.keyframeControllers.length; e < t; e++)
                      this.keyframeControllers[e].onDOMRead(this.position);
                  },
                },
                {
                  key: 'onDOMWrite',
                  value: function() {
                    for (var e = 0, t = this.keyframeControllers.length; e < t; e++)
                      this.keyframeControllers[e].onDOMWrite(this.position);
                    this.needsUpdate() && this.requestDOMChange();
                  },
                },
                {
                  key: 'needsUpdate',
                  value: function() {
                    if (this._keyframesDirty) return !0;
                    for (var e = 0, t = this.keyframeControllers.length; e < t; e++)
                      if (this.keyframeControllers[e].needsUpdate()) return !0;
                    return !1;
                  },
                },
                {
                  key: 'addKeyframe',
                  value: function(e, t) {
                    var r = this.getControllerForTarget(e);
                    return (
                      null === r && ((r = new f(this, e)), this.keyframeControllers.push(r)),
                      (this.keyframesDirty = !0),
                      r.addKeyframe(t)
                    );
                  },
                },
                {
                  key: 'forceUpdate',
                  value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                      t = e.waitForNextUpdate,
                      r = void 0 === t || t,
                      n = e.silent,
                      i = void 0 !== n && n;
                    this.isEnabled &&
                      (this.refreshMetrics(),
                      (this.timelineUpdateRequired = !0),
                      r ? (this.keyframesDirty = !0) : this.onKeyframesDirty({ silent: i }));
                  },
                },
                {
                  key: 'onKeyframesDirty',
                  value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                      t = e.silent,
                      r = void 0 !== t && t;
                    this.determineActiveKeyframes(),
                      (this.keyframesDirty = !1),
                      this.metrics.refreshMetrics(this.element),
                      (this.viewableRange = this.createViewableRange());
                    for (var n = 0, i = this.keyframeControllers.length; n < i; n++)
                      this.keyframeControllers[n].updateAnimationConstraints();
                    this.updateBounds(),
                      this.updateProgress(this.getPosition()),
                      r || this._onScroll(),
                      this.gui && this.gui.create();
                  },
                },
                {
                  key: 'refreshMetrics',
                  value: function() {
                    var e = new Set([this.element]);
                    this.keyframeControllers.forEach(function(t) {
                      e.add(t.element),
                        t._allKeyframes.forEach(function(t) {
                          return t.anchors.forEach(function(t) {
                            return e.add(t);
                          });
                        });
                    }),
                      this.metrics.refreshCollection(e),
                      (this.viewableRange = this.createViewableRange());
                  },
                },
                {
                  key: 'reconcile',
                  value: function() {
                    for (var e = 0, t = this.keyframeControllers.length; e < t; e++)
                      this.keyframeControllers[e].reconcile();
                  },
                },
                {
                  key: 'determineActiveKeyframes',
                  value: function(e) {
                    e = e || u(Array.from(document.documentElement.classList));
                    for (var t = 0, r = this.keyframeControllers.length; t < r; t++)
                      this.keyframeControllers[t].determineActiveKeyframes(e);
                  },
                },
                {
                  key: 'updateBounds',
                  value: function() {
                    if (0 === this.keyframeControllers.length)
                      return (this.boundsMin = 0), void (this.boundsMax = 0);
                    for (
                      var e = { min: Number.POSITIVE_INFINITY, max: Number.NEGATIVE_INFINITY },
                        t = 0,
                        r = this.keyframeControllers.length;
                      t < r;
                      t++
                    )
                      this.keyframeControllers[t].getBounds(e);
                    var n = this.convertTValueToScrollPosition(e.min),
                      i = this.convertTValueToScrollPosition(e.max);
                    i - n < g.pageMetrics.windowHeight
                      ? ((e.min = this.convertScrollPositionToTValue(
                          n - 0.5 * g.pageMetrics.windowHeight
                        )),
                        (e.max = this.convertScrollPositionToTValue(
                          i + 0.5 * g.pageMetrics.windowHeight
                        )))
                      : ((e.min -= 0.001), (e.max += 0.001)),
                      (this.boundsMin = e.min),
                      (this.boundsMax = e.max),
                      (this.timelineUpdateRequired = !0);
                  },
                },
                {
                  key: 'createViewableRange',
                  value: function() {
                    return new g.ViewableRange(
                      this.metrics.get(this.element),
                      g.pageMetrics.windowHeight
                    );
                  },
                },
                {
                  key: '_onBreakpointChange',
                  value: function(e, t) {
                    (this.keyframesDirty = !0), this.determineActiveKeyframes();
                  },
                },
                {
                  key: 'updateProgress',
                  value: function(e) {
                    return this.hasDuration()
                      ? ((this.position.localUnclamped =
                          (e - this.viewableRange.a) /
                          (this.viewableRange.d - this.viewableRange.a)),
                        void (this.position.local = c.clamp(
                          this.position.localUnclamped,
                          this.boundsMin,
                          this.boundsMax
                        )))
                      : void (this.position.local = this.position.localUnclamped = 0);
                  },
                },
                {
                  key: 'performTimelineDispatch',
                  value: function() {
                    for (var e = 0, t = this.keyframeControllers.length; e < t; e++)
                      this.keyframeControllers[e].updateLocalProgress(this.position.local);
                    this.trigger(g.EVENTS.ON_TIMELINE_UPDATE, this.position.local),
                      (this.timelineUpdateRequired = !1),
                      this.position.lastPosition !== this.position.local &&
                        (this.position.lastPosition <= this.boundsMin &&
                        this.position.localUnclamped > this.boundsMin
                          ? this.trigger(g.EVENTS.ON_TIMELINE_START, this)
                          : this.position.lastPosition >= this.boundsMin &&
                            this.position.localUnclamped < this.boundsMin
                          ? this.trigger(g.EVENTS.ON_TIMELINE_START + ':reverse', this)
                          : this.position.lastPosition <= this.boundsMax &&
                            this.position.localUnclamped >= this.boundsMax
                          ? this.trigger(g.EVENTS.ON_TIMELINE_COMPLETE, this)
                          : this.position.lastPosition >= this.boundsMax &&
                            this.position.localUnclamped < this.boundsMax &&
                            this.trigger(g.EVENTS.ON_TIMELINE_COMPLETE + ':reverse', this)),
                      null !== this.gui && this.gui.onScrollUpdate(this.position);
                  },
                },
                {
                  key: '_onScroll',
                  value: function(e) {
                    if (!this.isEnabled) return !1;
                    void 0 === e && (e = this.getPosition()), this.updateProgress(e);
                    var t =
                        this.position.lastPosition === this.boundsMin ||
                        this.position.lastPosition === this.boundsMax,
                      r =
                        this.position.localUnclamped === this.boundsMin ||
                        this.position.localUnclamped === this.boundsMax;
                    if (!this.timelineUpdateRequired && t && r && this.position.lastPosition === e)
                      return void (this.position.local = this.position.localUnclamped);
                    if (
                      this.timelineUpdateRequired ||
                      (this.position.localUnclamped > this.boundsMin &&
                        this.position.localUnclamped < this.boundsMax)
                    )
                      return (
                        this.performTimelineDispatch(),
                        this.requestDOMChange(),
                        void (this.position.lastPosition = this.position.localUnclamped)
                      );
                    var n =
                        this.position.lastPosition > this.boundsMin &&
                        this.position.lastPosition < this.boundsMax,
                      i =
                        this.position.localUnclamped <= this.boundsMin ||
                        this.position.localUnclamped >= this.boundsMax;
                    if (n && i)
                      return (
                        this.performTimelineDispatch(),
                        this.requestDOMChange(),
                        void (this.position.lastPosition = this.position.localUnclamped)
                      );
                    var a =
                        this.position.lastPosition < this.boundsMin &&
                        this.position.localUnclamped > this.boundsMax,
                      o =
                        this.position.lastPosition > this.boundsMax &&
                        this.position.localUnclamped < this.boundsMax;
                    (a || o) &&
                      (this.performTimelineDispatch(),
                      this.requestDOMChange(),
                      (this.position.lastPosition = this.position.localUnclamped)),
                      null !== this.gui && this.gui.onScrollUpdate(this.position);
                  },
                },
                {
                  key: 'convertScrollPositionToTValue',
                  value: function(e) {
                    return this.hasDuration()
                      ? c.map(e, this.viewableRange.a, this.viewableRange.d, 0, 1)
                      : 0;
                  },
                },
                {
                  key: 'convertTValueToScrollPosition',
                  value: function(e) {
                    return this.hasDuration()
                      ? c.map(e, 0, 1, this.viewableRange.a, this.viewableRange.d)
                      : 0;
                  },
                },
                {
                  key: 'hasDuration',
                  value: function() {
                    return this.viewableRange.a !== this.viewableRange.d;
                  },
                },
                {
                  key: 'getPosition',
                  value: function() {
                    return g.pageMetrics.scrollY;
                  },
                },
                {
                  key: 'getControllerForTarget',
                  value: function(e) {
                    if (!e._animInfo || !e._animInfo.controllers) return null;
                    if (e._animInfo.controller && e._animInfo.controller.group === this)
                      return e._animInfo.controller;
                    for (var t = e._animInfo.controllers, r = 0, n = t.length; r < n; r++)
                      if (t[r].group === this) return t[r];
                    return null;
                  },
                },
                {
                  key: 'trigger',
                  value: function(e, t) {
                    if ('undefined' != typeof this._events[e])
                      for (var r = this._events[e].length - 1; r >= 0; r--)
                        void 0 !== t ? this._events[e][r](t) : this._events[e][r]();
                  },
                },
                {
                  key: 'keyframesDirty',
                  set: function(e) {
                    (this._keyframesDirty = e), this._keyframesDirty && this.requestDOMChange();
                  },
                  get: function() {
                    return this._keyframesDirty;
                  },
                },
              ]),
              t
            );
          })(p);
        t.exports = d;
      },
      {
        './Keyframes/KeyframeController': 105,
        './Model/AnimSystemModel': 107,
        './Model/ElementMetricsLookup': 109,
        './Parsing/ExpressionParser': 113,
        './utils/arrayToObject': 117,
        '@marcom/ac-event-emitter-micro': 34,
        '@marcom/ac-raf-emitter/RAFEmitter': 58,
        '@marcom/ac-raf-emitter/draw': 64,
        '@marcom/ac-raf-emitter/update': 68,
        '@marcom/sm-math-utils': 124,
      },
    ],
    116: [
      function(e, t, r) {
        'use strict';
        function n(e, t) {
          if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
        }
        function i(e, t) {
          if (!e)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return !t || ('object' != typeof t && 'function' != typeof t) ? e : t;
        }
        function a(e, t) {
          if ('function' != typeof t && null !== t)
            throw new TypeError(
              'Super expression must either be null or a function, not ' + typeof t
            );
          (e.prototype = Object.create(t && t.prototype, {
            constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 },
          })),
            t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : (e.__proto__ = t));
        }
        var o = (function() {
            function e(e, t) {
              for (var r = 0; r < t.length; r++) {
                var n = t[r];
                (n.enumerable = n.enumerable || !1),
                  (n.configurable = !0),
                  'value' in n && (n.writable = !0),
                  Object.defineProperty(e, n.key, n);
              }
            }
            return function(t, r, n) {
              return r && e(t.prototype, r), n && e(t, n), t;
            };
          })(),
          s = function h(e, t, r) {
            null === e && (e = Function.prototype);
            var n = Object.getOwnPropertyDescriptor(e, t);
            if (void 0 === n) {
              var i = Object.getPrototypeOf(e);
              return null === i ? void 0 : h(i, t, r);
            }
            if ('value' in n) return n.value;
            var a = n.get;
            if (void 0 !== a) return a.call(r);
          },
          p = e('./ScrollGroup'),
          c = e('@marcom/sm-math-utils'),
          u = 0,
          g = { create: e('@marcom/ac-raf-emitter/RAFEmitter') },
          l = (function(e) {
            function t(e, r) {
              n(this, t),
                e || ((e = document.createElement('div')), (e.className = 'TimeGroup-' + u++));
              var a = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, r));
              return (
                (a.name = a.name || e.getAttribute('data-anim-time-group')),
                (a._isPaused = !0),
                (a._repeats = 0),
                (a._isReversed = !1),
                (a._timeScale = 1),
                a
              );
            }
            return (
              a(t, e),
              o(t, [
                {
                  key: 'finalizeInit',
                  value: function() {
                    if (!this.anim)
                      throw 'TimeGroup not instantiated correctly. Please use `AnimSystem.createTimeGroup(el)`';
                    (this.defaultEase = 1),
                      (this.onPlayTimeUpdate = this.onPlayTimeUpdate.bind(this)),
                      s(
                        t.prototype.__proto__ || Object.getPrototypeOf(t.prototype),
                        'finalizeInit',
                        this
                      ).call(this);
                  },
                },
                {
                  key: 'progress',
                  value: function(e) {
                    if (void 0 === e)
                      return 0 === this.boundsMax ? 0 : this.position.local / this.boundsMax;
                    var t = e * this.boundsMax;
                    (this.timelineUpdateRequired = !0), this._onScroll(t);
                  },
                },
                {
                  key: 'time',
                  value: function(e) {
                    return void 0 === e
                      ? this.position.local
                      : ((e = c.clamp(e, this.boundsMin, this.boundsMax)),
                        (this.timelineUpdateRequired = !0),
                        void this._onScroll(e));
                  },
                },
                {
                  key: 'play',
                  value: function(e) {
                    this.reversed(!1),
                      (this.isEnabled = !0),
                      (this._isPaused = !1),
                      this.time(e),
                      this._playheadEmitter.run();
                  },
                },
                {
                  key: 'reverse',
                  value: function(e) {
                    this.reversed(!0),
                      (this.isEnabled = !0),
                      (this._isPaused = !1),
                      this.time(e),
                      this._playheadEmitter.run();
                  },
                },
                {
                  key: 'reversed',
                  value: function(e) {
                    return void 0 === e ? this._isReversed : void (this._isReversed = e);
                  },
                },
                {
                  key: 'restart',
                  value: function() {
                    this._isReversed
                      ? (this.progress(1), this.reverse(this.time()))
                      : (this.progress(0), this.play(this.time()));
                  },
                },
                {
                  key: 'pause',
                  value: function(e) {
                    this.time(e), (this._isPaused = !0);
                  },
                },
                {
                  key: 'paused',
                  value: function(e) {
                    return void 0 === e
                      ? this._isPaused
                      : ((this._isPaused = e), this._isPaused || this.play(), this);
                  },
                },
                {
                  key: 'onPlayTimeUpdate',
                  value: function(e) {
                    if (!this._isPaused) {
                      var r = c.clamp(e.delta / 1e3, 0, 0.5);
                      this._isReversed && (r = -r);
                      var n = this.time(),
                        i = n + r * this._timeScale;
                      if (this._repeats === t.REPEAT_FOREVER || this._repeats > 0) {
                        var a = !1;
                        !this._isReversed && i > this.boundsMax
                          ? ((i -= this.boundsMax), (a = !0))
                          : this._isReversed && i < 0 && ((i = this.boundsMax + i), (a = !0)),
                          a &&
                            (this._repeats =
                              this._repeats === t.REPEAT_FOREVER
                                ? t.REPEAT_FOREVER
                                : this._repeats - 1);
                      }
                      this.time(i);
                      var o = !this._isReversed && this.position.local !== this.duration,
                        s = this._isReversed && 0 !== this.position.local;
                      o || s ? this._playheadEmitter.run() : this.paused(!0);
                    }
                  },
                },
                {
                  key: 'updateProgress',
                  value: function(e) {
                    return this.hasDuration()
                      ? ((this.position.localUnclamped = e),
                        void (this.position.local = c.clamp(
                          this.position.localUnclamped,
                          this.boundsMin,
                          this.boundsMax
                        )))
                      : void (this.position.local = this.position.localUnclamped = 0);
                  },
                },
                {
                  key: 'updateBounds',
                  value: function() {
                    if (0 === this.keyframeControllers.length)
                      return (this.boundsMin = 0), void (this.boundsMax = 0);
                    for (
                      var e = { min: Number.POSITIVE_INFINITY, max: Number.NEGATIVE_INFINITY },
                        t = 0,
                        r = this.keyframeControllers.length;
                      t < r;
                      t++
                    )
                      this.keyframeControllers[t].getBounds(e);
                    (this.boundsMin = 0),
                      (this.boundsMax = e.max),
                      (this.viewableRange.a = this.viewableRange.b = 0),
                      (this.viewableRange.c = this.viewableRange.d = this.boundsMax),
                      (this.timelineUpdateRequired = !0);
                  },
                },
                {
                  key: 'setupRAFEmitter',
                  value: function(e) {
                    (this._playheadEmitter = new g.create()),
                      this._playheadEmitter.on('update', this.onPlayTimeUpdate),
                      s(
                        t.prototype.__proto__ || Object.getPrototypeOf(t.prototype),
                        'setupRAFEmitter',
                        this
                      ).call(this, e);
                  },
                },
                {
                  key: 'timeScale',
                  value: function(e) {
                    return void 0 === e ? this._timeScale : ((this._timeScale = e), this);
                  },
                },
                {
                  key: 'repeats',
                  value: function(e) {
                    return void 0 === e ? this._repeats : void (this._repeats = e);
                  },
                },
                {
                  key: 'getPosition',
                  value: function() {
                    return this.position.local;
                  },
                },
                {
                  key: 'convertScrollPositionToTValue',
                  value: function(e) {
                    return e;
                  },
                },
                {
                  key: 'convertTValueToScrollPosition',
                  value: function(e) {
                    return e;
                  },
                },
                {
                  key: 'hasDuration',
                  value: function() {
                    return this.duration > 0;
                  },
                },
                {
                  key: 'destroy',
                  value: function() {
                    this._playheadEmitter.destroy(),
                      (this._playheadEmitter = null),
                      s(
                        t.prototype.__proto__ || Object.getPrototypeOf(t.prototype),
                        'destroy',
                        this
                      ).call(this);
                  },
                },
                {
                  key: 'duration',
                  get: function() {
                    return (
                      this.keyframesDirty && this.onKeyframesDirty({ silent: !0 }), this.boundsMax
                    );
                  },
                },
              ]),
              t
            );
          })(p);
        (l.REPEAT_FOREVER = -1), (t.exports = l);
      },
      {
        './ScrollGroup': 115,
        '@marcom/ac-raf-emitter/RAFEmitter': 58,
        '@marcom/sm-math-utils': 124,
      },
    ],
    117: [
      function(e, t, r) {
        'use strict';
        var n = function(e) {
          return e.reduce(function(e, t) {
            return (e[t] = t), e;
          }, {});
        };
        t.exports = n;
      },
      {},
    ],
    118: [
      function(e, t, r) {
        'use strict';
        t.exports = function(e, t) {
          if ('string' != typeof e) return e;
          try {
            return (t || document).querySelector(e) || document.querySelector(e);
          } catch (r) {
            return !1;
          }
        };
      },
      {},
    ],
    119: [
      function(e, t, r) {
        'use strict';
        function n(e, t) {
          if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
        }
        function i(e, t) {
          if (!e)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return !t || ('object' != typeof t && 'function' != typeof t) ? e : t;
        }
        function a(e, t) {
          if ('function' != typeof t && null !== t)
            throw new TypeError(
              'Super expression must either be null or a function, not ' + typeof t
            );
          (e.prototype = Object.create(t && t.prototype, {
            constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 },
          })),
            t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : (e.__proto__ = t));
        }
        var o = (function() {
            function e(e, t) {
              for (var r = 0; r < t.length; r++) {
                var n = t[r];
                (n.enumerable = n.enumerable || !1),
                  (n.configurable = !0),
                  'value' in n && (n.writable = !0),
                  Object.defineProperty(e, n.key, n);
              }
            }
            return function(t, r, n) {
              return r && e(t.prototype, r), n && e(t, n), t;
            };
          })(),
          s = function f(e, t, r) {
            null === e && (e = Function.prototype);
            var n = Object.getOwnPropertyDescriptor(e, t);
            if (void 0 === n) {
              var i = Object.getPrototypeOf(e);
              return null === i ? void 0 : f(i, t, r);
            }
            if ('value' in n) return n.value;
            var a = n.get;
            if (void 0 !== a) return a.call(r);
          },
          p = e('@marcom/ac-event-emitter-micro').EventEmitterMicro,
          c = e('@marcom/anim-system/Model/AnimSystemModel'),
          u = {
            create: e('@marcom/ac-raf-emitter/RAFEmitter'),
            update: e('@marcom/ac-raf-emitter/update'),
            draw: e('@marcom/ac-raf-emitter/draw'),
          },
          g = function() {},
          l = 0,
          h = (function(e) {
            function t(e) {
              n(this, t);
              var r = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
              return (
                (r.el = e.el),
                (r.gum = e.gum),
                (r.componentName = e.componentName),
                (r._keyframeController = null),
                r
              );
            }
            return (
              a(t, e),
              o(t, [
                {
                  key: 'destroy',
                  value: function() {
                    (this.el = null),
                      (this.gum = null),
                      (this._keyframeController = null),
                      s(
                        t.prototype.__proto__ || Object.getPrototypeOf(t.prototype),
                        'destroy',
                        this
                      ).call(this);
                  },
                },
                {
                  key: 'addKeyframe',
                  value: function(e) {
                    var t = e.el || this.el;
                    return (e.group || this.anim).addKeyframe(t, e);
                  },
                },
                {
                  key: 'addDiscreteEvent',
                  value: function(e) {
                    e.event = e.event || 'Generic-Event-Name-' + l++;
                    var t = void 0 !== e.end && e.end !== e.start,
                      r = this.addKeyframe(e);
                    return (
                      t
                        ? (e.onEnterOnce && r.controller.once(e.event + ':enter', e.onEnterOnce),
                          e.onExitOnce && r.controller.once(e.event + ':exit', e.onExitOnce),
                          e.onEnter && r.controller.on(e.event + ':enter', e.onEnter),
                          e.onExit && r.controller.on(e.event + ':exit', e.onExit))
                        : (e.onEventOnce && r.controller.once(e.event, e.onEventOnce),
                          e.onEventReverseOnce &&
                            r.controller.once(e.event + ':reverse', e.onEventReverseOnce),
                          e.onEvent && r.controller.on(e.event, e.onEvent),
                          e.onEventReverse &&
                            r.controller.on(e.event + ':reverse', e.onEventReverse)),
                      r
                    );
                  },
                },
                {
                  key: 'addRAFLoop',
                  value: function(e) {
                    var t = ['start', 'end'];
                    if (
                      !t.every(function(t) {
                        return e.hasOwnProperty(t);
                      })
                    )
                      return void console.log(
                        'BubbleGum.BaseComponent::addRAFLoop required options are missing: ' +
                          t.join(' ')
                      );
                    var r = new u.create();
                    r.on('update', e.onUpdate || g),
                      r.on('draw', e.onDraw || g),
                      r.on('draw', function() {
                        return r.run();
                      });
                    var n = e.onEnter,
                      i = e.onExit;
                    return (
                      (e.onEnter = function() {
                        r.run(), n ? n() : 0;
                      }),
                      (e.onExit = function() {
                        r.cancel(), i ? i() : 0;
                      }),
                      this.addDiscreteEvent(e)
                    );
                  },
                },
                {
                  key: 'addContinuousEvent',
                  value: function(e) {
                    e.onDraw ||
                      console.log(
                        'BubbleGum.BaseComponent::addContinuousEvent required option `onDraw` is missing. Consider using a regular keyframe if you do not need a callback'
                      ),
                      (e.event = e.event || 'Generic-Event-Name-' + l++);
                    var t = this.addKeyframe(e);
                    return t.controller.on(e.event, e.onDraw), t;
                  },
                },
                { key: 'mounted', value: function() {} },
                { key: 'onResizeImmediate', value: function(e) {} },
                { key: 'onResizeDebounced', value: function(e) {} },
                { key: 'onBreakpointChange', value: function(e) {} },
                {
                  key: 'anim',
                  get: function() {
                    return this.gum.anim;
                  },
                },
                {
                  key: 'keyframeController',
                  get: function() {
                    return (
                      this._keyframeController ||
                      (this._keyframeController = this.anim.getControllerForTarget(this.el))
                    );
                  },
                },
                {
                  key: 'pageMetrics',
                  get: function() {
                    return c.pageMetrics;
                  },
                },
              ]),
              t
            );
          })(p);
        t.exports = h;
      },
      {
        '@marcom/ac-event-emitter-micro': 34,
        '@marcom/ac-raf-emitter/RAFEmitter': 58,
        '@marcom/ac-raf-emitter/draw': 64,
        '@marcom/ac-raf-emitter/update': 68,
        '@marcom/anim-system/Model/AnimSystemModel': 107,
      },
    ],
    120: [
      function(e, t, r) {
        'use strict';
        function n(e, t) {
          if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
        }
        function i(e, t) {
          if (!e)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return !t || ('object' != typeof t && 'function' != typeof t) ? e : t;
        }
        function a(e, t) {
          if ('function' != typeof t && null !== t)
            throw new TypeError(
              'Super expression must either be null or a function, not ' + typeof t
            );
          (e.prototype = Object.create(t && t.prototype, {
            constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 },
          })),
            t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : (e.__proto__ = t));
        }
        var o = (function() {
            function e(e, t) {
              for (var r = 0; r < t.length; r++) {
                var n = t[r];
                (n.enumerable = n.enumerable || !1),
                  (n.configurable = !0),
                  'value' in n && (n.writable = !0),
                  Object.defineProperty(e, n.key, n);
              }
            }
            return function(t, r, n) {
              return r && e(t.prototype, r), n && e(t, n), t;
            };
          })(),
          s = e('@marcom/ac-event-emitter-micro').EventEmitterMicro,
          p = e('@marcom/delayed-initializer'),
          c = e('@marcom/anim-system'),
          u = e('@marcom/anim-system/Model/AnimSystemModel'),
          g = e('./ComponentMap'),
          l = {},
          h = (function(e) {
            function t(e) {
              n(this, t);
              var r = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
              return (
                (r.el = e),
                (r.anim = c),
                (r.components = []),
                r.el.getAttribute('data-anim-scroll-group') ||
                  r.el.setAttribute('data-anim-scroll-group', 'bubble-gum-group'),
                c.on(u.EVENTS.ON_DOM_GROUPS_CREATED, function(e) {
                  (r.componentsInitialized = !1), r.initComponents(), r.setupEvents();
                }),
                c.on(u.EVENTS.ON_DOM_KEYFRAMES_CREATED, function() {
                  r.components.forEach(function(e) {
                    return e.mounted();
                  }),
                    r.trigger(t.EVENTS.DOM_COMPONENTS_MOUNTED);
                }),
                p.add(function() {
                  return c.initialize();
                }),
                r
              );
            }
            return (
              a(t, e),
              o(
                t,
                [
                  {
                    key: 'initComponents',
                    value: function() {
                      var e = Array.prototype.slice.call(
                        this.el.querySelectorAll('[data-component-list]')
                      );
                      this.el.hasAttribute('data-component-list') && e.push(this.el);
                      for (var t = 0; t < e.length; t++)
                        for (
                          var r = e[t],
                            n = r.getAttribute('data-component-list'),
                            i = n.split(' '),
                            a = 0,
                            o = i.length;
                          a < o;
                          a++
                        ) {
                          var s = i[a];
                          '' !== s && ' ' !== s && this.addComponent({ el: r, componentName: s });
                        }
                      this.componentsInitialized = !0;
                    },
                  },
                  {
                    key: 'setupEvents',
                    value: function() {
                      (this.onResizeDebounced = this.onResizeDebounced.bind(this)),
                        (this.onResizeImmediate = this.onResizeImmediate.bind(this)),
                        (this.onBreakpointChange = this.onBreakpointChange.bind(this)),
                        c.on(u.PageEvents.ON_RESIZE_IMMEDIATE, this.onResizeImmediate),
                        c.on(u.PageEvents.ON_RESIZE_DEBOUNCED, this.onResizeDebounced),
                        c.on(u.PageEvents.ON_BREAKPOINT_CHANGE, this.onBreakpointChange);
                    },
                  },
                  {
                    key: 'addComponent',
                    value: function(e) {
                      var r = e.el,
                        n = e.componentName,
                        i = e.data;
                      if (!g.hasOwnProperty(n))
                        throw "BubbleGum::addComponent could not add component to '" +
                          r.className +
                          "'. No component type '" +
                          n +
                          "' found!";
                      var a = g[n];
                      if (!t.componentIsSupported(a, n))
                        return (
                          void 0 === l[n] &&
                            (console.log(
                              "BubbleGum::addComponent unsupported component '" +
                                n +
                                "'. Reason: '" +
                                n +
                                ".IS_SUPPORTED' returned false"
                            ),
                            (l[n] = !0)),
                          null
                        );
                      var o = r.dataset.componentList || '';
                      o.includes(n) ||
                        (r.dataset.componentList = o
                          .split(' ')
                          .concat(n)
                          .join(' '));
                      var s = new a({
                        el: r,
                        data: i,
                        componentName: e.componentName,
                        gum: this,
                        pageMetrics: u.pageMetrics,
                      });
                      return this.components.push(s), this.componentsInitialized && s.mounted(), s;
                    },
                  },
                  {
                    key: 'removeComponent',
                    value: function(e) {
                      var t = this.components.indexOf(e);
                      t !== -1 &&
                        (this.components.splice(t, 1),
                        (e.el.dataset.componentList = e.el.dataset.componentList
                          .split(' ')
                          .filter(function(t) {
                            return t !== e.componentName;
                          })
                          .join(' ')),
                        e.destroy());
                    },
                  },
                  {
                    key: 'getComponentOfType',
                    value: function(e) {
                      var t =
                          arguments.length > 1 && void 0 !== arguments[1]
                            ? arguments[1]
                            : document.documentElement,
                        r = '[data-component-list*=' + e + ']',
                        n = t.matches(r) ? t : t.querySelector(r);
                      return n
                        ? this.components.find(function(t) {
                            return t instanceof g[e] && t.el === n;
                          })
                        : null;
                    },
                  },
                  {
                    key: 'getComponentsOfType',
                    value: function(e) {
                      var t =
                          arguments.length > 1 && void 0 !== arguments[1]
                            ? arguments[1]
                            : document.documentElement,
                        r = '[data-component-list*=' + e + ']',
                        n = t.matches(r) ? [t] : Array.from(t.querySelectorAll(r));
                      return this.components.filter(function(t) {
                        return t instanceof g[e] && n.includes(t.el);
                      });
                    },
                  },
                  {
                    key: 'getComponentsForElement',
                    value: function(e) {
                      return this.components.filter(function(t) {
                        return t.el === e;
                      });
                    },
                  },
                  {
                    key: 'onResizeImmediate',
                    value: function() {
                      this.components.forEach(function(e) {
                        return e.onResizeImmediate(u.pageMetrics);
                      });
                    },
                  },
                  {
                    key: 'onResizeDebounced',
                    value: function() {
                      this.components.forEach(function(e) {
                        return e.onResizeDebounced(u.pageMetrics);
                      });
                    },
                  },
                  {
                    key: 'onBreakpointChange',
                    value: function() {
                      this.components.forEach(function(e) {
                        return e.onBreakpointChange(u.pageMetrics);
                      });
                    },
                  },
                ],
                [
                  {
                    key: 'componentIsSupported',
                    value: function(e, t) {
                      var r = e.IS_SUPPORTED;
                      if (void 0 === r) return !0;
                      if ('function' != typeof r)
                        return (
                          console.error(
                            'BubbleGum::addComponent error in "' +
                              t +
                              '".IS_SUPPORTED - it should be a function which returns true/false'
                          ),
                          !0
                        );
                      var n = e.IS_SUPPORTED();
                      return void 0 === n
                        ? (console.error(
                            'BubbleGum::addComponent error in "' +
                              t +
                              '".IS_SUPPORTED - it should be a function which returns true/false'
                          ),
                          !0)
                        : n;
                    },
                  },
                ]
              ),
              t
            );
          })(s);
        (h.EVENTS = { DOM_COMPONENTS_MOUNTED: 'DOM_COMPONENTS_MOUNTED' }), (t.exports = h);
      },
      {
        './ComponentMap': 121,
        '@marcom/ac-event-emitter-micro': 34,
        '@marcom/anim-system': 102,
        '@marcom/anim-system/Model/AnimSystemModel': 107,
        '@marcom/delayed-initializer': 123,
      },
    ],
    121: [
      function(e, t, r) {
        'use strict';
        t.exports = { BaseComponent: e('./BaseComponent') };
      },
      { './BaseComponent': 119 },
    ],
    122: [
      function(e, t, r) {
        'use strict';
        var n = {
            create: e('gl-mat4/create'),
            invert: e('gl-mat4/invert'),
            clone: e('gl-mat4/clone'),
            transpose: e('gl-mat4/transpose'),
          },
          i = {
            create: e('gl-vec3/create'),
            dot: e('gl-vec3/dot'),
            normalize: e('gl-vec3/normalize'),
            length: e('gl-vec3/length'),
            cross: e('gl-vec3/cross'),
            fromValues: e('gl-vec3/fromValues'),
          },
          a = {
            create: e('gl-vec4/create'),
            transformMat4: e('gl-vec4/transformMat4'),
            fromValues: e('gl-vec4/fromValues'),
          },
          o = (Math.PI / 180, 180 / Math.PI),
          s = 0,
          p = 1,
          c = 3,
          u = 4,
          g = 5,
          l = 7,
          h = 11,
          f = 12,
          j = 13,
          d = 15,
          m = function(e, t) {
            t = t || !1;
            for (
              var r = n.clone(e),
                s = i.create(),
                p = i.create(),
                u = i.create(),
                g = a.create(),
                f = a.create(),
                j = (i.create(), 0);
              j < 16;
              j++
            )
              r[j] /= r[d];
            var m = n.clone(r);
            (m[c] = 0), (m[l] = 0), (m[h] = 0), (m[d] = 1);
            var b = (r[3], r[7], r[11], r[12]),
              E = r[13],
              w = r[14],
              x = (r[15], a.create());
            if (_(r[c]) && _(r[l]) && _(r[h])) g = a.fromValues(0, 0, 0, 1);
            else {
              (x[0] = r[c]), (x[1] = r[l]), (x[2] = r[h]), (x[3] = r[d]);
              var k = n.invert(n.create(), m),
                S = n.transpose(n.create(), k);
              g = a.transformMat4(g, x, S);
            }
            (s[0] = b), (s[1] = E), (s[2] = w);
            var A = [i.create(), i.create(), i.create()];
            (A[0][0] = r[0]),
              (A[0][1] = r[1]),
              (A[0][2] = r[2]),
              (A[1][0] = r[4]),
              (A[1][1] = r[5]),
              (A[1][2] = r[6]),
              (A[2][0] = r[8]),
              (A[2][1] = r[9]),
              (A[2][2] = r[10]),
              (p[0] = i.length(A[0])),
              i.normalize(A[0], A[0]),
              (u[0] = i.dot(A[0], A[1])),
              (A[1] = v(A[1], A[0], 1, -u[0])),
              (p[1] = i.length(A[1])),
              i.normalize(A[1], A[1]),
              (u[0] /= p[1]),
              (u[1] = i.dot(A[0], A[2])),
              (A[2] = v(A[2], A[0], 1, -u[1])),
              (u[2] = i.dot(A[1], A[2])),
              (A[2] = v(A[2], A[1], 1, -u[2])),
              (p[2] = i.length(A[2])),
              i.normalize(A[2], A[2]),
              (u[1] /= p[2]),
              (u[2] /= p[2]);
            var T = i.cross(i.create(), A[1], A[2]);
            if (i.dot(A[0], T) < 0)
              for (j = 0; j < 3; j++)
                (p[j] *= -1), (A[j][0] *= -1), (A[j][1] *= -1), (A[j][2] *= -1);
            (f[0] = 0.5 * Math.sqrt(Math.max(1 + A[0][0] - A[1][1] - A[2][2], 0))),
              (f[1] = 0.5 * Math.sqrt(Math.max(1 - A[0][0] + A[1][1] - A[2][2], 0))),
              (f[2] = 0.5 * Math.sqrt(Math.max(1 - A[0][0] - A[1][1] + A[2][2], 0))),
              (f[3] = 0.5 * Math.sqrt(Math.max(1 + A[0][0] + A[1][1] + A[2][2], 0))),
              A[2][1] > A[1][2] && (f[0] = -f[0]),
              A[0][2] > A[2][0] && (f[1] = -f[1]),
              A[1][0] > A[0][1] && (f[2] = -f[2]);
            var O = a.fromValues(f[0], f[1], f[2], 2 * Math.acos(f[3])),
              P = y(f);
            return (
              t &&
                ((u[0] = Math.round(u[0] * o * 100) / 100),
                (u[1] = Math.round(u[1] * o * 100) / 100),
                (u[2] = Math.round(u[2] * o * 100) / 100),
                (P[0] = Math.round(P[0] * o * 100) / 100),
                (P[1] = Math.round(P[1] * o * 100) / 100),
                (P[2] = Math.round(P[2] * o * 100) / 100),
                (O[3] = Math.round(O[3] * o * 100) / 100)),
              {
                translation: s,
                scale: p,
                skew: u,
                perspective: g,
                quaternion: f,
                eulerRotation: P,
                axisAngle: O,
              }
            );
          },
          v = function(e, t, r, n) {
            var a = i.create();
            return (
              (a[0] = r * e[0] + n * t[0]),
              (a[1] = r * e[1] + n * t[1]),
              (a[2] = r * e[2] + n * t[2]),
              a
            );
          },
          y = function(e) {
            var t,
              r,
              n,
              a = e[3] * e[3],
              o = e[0] * e[0],
              s = e[1] * e[1],
              p = e[2] * e[2],
              c = o + s + p + a,
              u = e[0] * e[1] + e[2] * e[3];
            return u > 0.499 * c
              ? ((r = 2 * Math.atan2(e[0], e[3])),
                (n = Math.PI / 2),
                (t = 0),
                i.fromValues(t, r, n))
              : u < -0.499 * c
              ? ((r = -2 * Math.atan2(e[0], e[3])),
                (n = -Math.PI / 2),
                (t = 0),
                i.fromValues(t, r, n))
              : ((r = Math.atan2(2 * e[1] * e[3] - 2 * e[0] * e[2], o - s - p + a)),
                (n = Math.asin((2 * u) / c)),
                (t = Math.atan2(2 * e[0] * e[3] - 2 * e[1] * e[2], -o + s - p + a)),
                i.fromValues(t, r, n));
          },
          _ = function(e) {
            return Math.abs(e) < 1e-4;
          },
          b = function(e) {
            var t = String(getComputedStyle(e).transform).trim(),
              r = n.create();
            if ('none' === t || '' === t) return r;
            var i,
              a,
              o = t.slice(0, t.indexOf('('));
            if ('matrix3d' === o)
              for (i = t.slice(9, -1).split(','), a = 0; a < i.length; a++) r[a] = parseFloat(i[a]);
            else {
              if ('matrix' !== o) throw new TypeError('Invalid Matrix Value');
              for (i = t.slice(7, -1).split(','), a = i.length; a--; ) i[a] = parseFloat(i[a]);
              (r[s] = i[0]),
                (r[p] = i[1]),
                (r[f] = i[4]),
                (r[u] = i[2]),
                (r[g] = i[3]),
                (r[j] = i[5]);
            }
            return r;
          };
        t.exports = function(e, t) {
          var r = b(e);
          return m(r, t);
        };
      },
      {
        'gl-mat4/clone': 144,
        'gl-mat4/create': 145,
        'gl-mat4/invert': 146,
        'gl-mat4/transpose': 151,
        'gl-vec3/create': 161,
        'gl-vec3/cross': 162,
        'gl-vec3/dot': 163,
        'gl-vec3/fromValues': 164,
        'gl-vec3/length': 165,
        'gl-vec3/normalize': 166,
        'gl-vec4/create': 167,
        'gl-vec4/fromValues': 168,
        'gl-vec4/transformMat4': 169,
      },
    ],
    123: [
      function(e, t, r) {
        'use strict';
        var n = !1,
          i = !1,
          a = [];
        t.exports = {
          NUMBER_OF_FRAMES_TO_WAIT: 30,
          add: function(e) {
            var t = this;
            if ((i && e(), a.push(e), !n)) {
              n = !0;
              var r = document.documentElement.scrollHeight,
                o = 0,
                s = function p() {
                  var e = document.documentElement.scrollHeight;
                  if (r !== e) o = 0;
                  else if ((o++, o >= t.NUMBER_OF_FRAMES_TO_WAIT))
                    return void a.forEach(function(e) {
                      return e();
                    });
                  (r = e), requestAnimationFrame(p);
                };
              requestAnimationFrame(s);
            }
          },
        };
      },
      {},
    ],
    124: [
      function(e, t, r) {
        'use strict';
        t.exports = {
          lerp: function(e, t, r) {
            return t + (r - t) * e;
          },
          map: function(e, t, r, n, i) {
            return n + ((i - n) * (e - t)) / (r - t);
          },
          mapClamp: function(e, t, r, n, i) {
            var a = n + ((i - n) * (e - t)) / (r - t);
            return Math.max(n, Math.min(i, a));
          },
          norm: function(e, t, r) {
            return (e - t) / (r - t);
          },
          clamp: function(e, t, r) {
            return Math.max(t, Math.min(r, e));
          },
          randFloat: function(e, t) {
            return Math.random() * (t - e) + e;
          },
          randInt: function(e, t) {
            return Math.floor(Math.random() * (t - e) + e);
          },
        };
      },
      {},
    ],
    125: [
      function(e, t, r) {
        'use strict';
        t.exports = {
          browser: {
            safari: !1,
            chrome: !1,
            firefox: !1,
            ie: !1,
            opera: !1,
            android: !1,
            edge: !1,
            version: { string: '', major: 0, minor: 0, patch: 0, documentMode: !1 },
          },
          os: {
            osx: !1,
            ios: !1,
            android: !1,
            windows: !1,
            linux: !1,
            fireos: !1,
            chromeos: !1,
            version: { string: '', major: 0, minor: 0, patch: 0 },
          },
        };
      },
      {},
    ],
    126: [
      function(e, t, r) {
        'use strict';
        t.exports = {
          browser: [
            {
              name: 'edge',
              userAgent: 'Edge',
              version: ['rv', 'Edge'],
              test: function(e) {
                return (
                  e.ua.indexOf('Edge') > -1 || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' === e.ua
                );
              },
            },
            { name: 'chrome', userAgent: 'Chrome' },
            {
              name: 'firefox',
              test: function(e) {
                return e.ua.indexOf('Firefox') > -1 && e.ua.indexOf('Opera') === -1;
              },
              version: 'Firefox',
            },
            { name: 'android', userAgent: 'Android' },
            {
              name: 'safari',
              test: function(e) {
                return e.ua.indexOf('Safari') > -1 && e.vendor.indexOf('Apple') > -1;
              },
              version: 'Version',
            },
            {
              name: 'ie',
              test: function(e) {
                return e.ua.indexOf('IE') > -1 || e.ua.indexOf('Trident') > -1;
              },
              version: ['MSIE', 'rv'],
              parseDocumentMode: function() {
                var e = !1;
                return document.documentMode && (e = parseInt(document.documentMode, 10)), e;
              },
            },
            { name: 'opera', userAgent: 'Opera', version: ['Version', 'Opera'] },
          ],
          os: [
            {
              name: 'windows',
              test: function(e) {
                return e.ua.indexOf('Windows') > -1;
              },
              version: 'Windows NT',
            },
            {
              name: 'osx',
              userAgent: 'Mac',
              test: function(e) {
                return e.ua.indexOf('Macintosh') > -1;
              },
            },
            {
              name: 'ios',
              test: function(e) {
                return e.ua.indexOf('iPhone') > -1 || e.ua.indexOf('iPad') > -1;
              },
              version: ['iPhone OS', 'CPU OS'],
            },
            {
              name: 'linux',
              userAgent: 'Linux',
              test: function(e) {
                return (
                  (e.ua.indexOf('Linux') > -1 || e.platform.indexOf('Linux') > -1) &&
                  e.ua.indexOf('Android') === -1
                );
              },
            },
            {
              name: 'fireos',
              test: function(e) {
                return e.ua.indexOf('Firefox') > -1 && e.ua.indexOf('Mobile') > -1;
              },
              version: 'rv',
            },
            {
              name: 'android',
              userAgent: 'Android',
              test: function(e) {
                return e.ua.indexOf('Android') > -1;
              },
            },
            { name: 'chromeos', userAgent: 'CrOS' },
          ],
        };
      },
      {},
    ],
    127: [
      function(e, t, r) {
        'use strict';
        function n(e) {
          return new RegExp(e + '[a-zA-Z\\s/:]+([0-9_.]+)', 'i');
        }
        function i(e, t) {
          if ('function' == typeof e.parseVersion) return e.parseVersion(t);
          var r = e.version || e.userAgent;
          'string' == typeof r && (r = [r]);
          for (var i, a = r.length, o = 0; o < a; o++)
            if (((i = t.match(n(r[o]))), i && i.length > 1)) return i[1].replace(/_/g, '.');
          return !1;
        }
        function a(e, t, r) {
          for (var n, a, o = e.length, s = 0; s < o; s++)
            if (
              ('function' == typeof e[s].test
                ? e[s].test(r) === !0 && (n = e[s].name)
                : r.ua.indexOf(e[s].userAgent) > -1 && (n = e[s].name),
              n)
            ) {
              if (((t[n] = !0), (a = i(e[s], r.ua)), 'string' == typeof a)) {
                var p = a.split('.');
                (t.version.string = a),
                  p &&
                    p.length > 0 &&
                    ((t.version.major = parseInt(p[0] || 0)),
                    (t.version.minor = parseInt(p[1] || 0)),
                    (t.version.patch = parseInt(p[2] || 0)));
              } else
                'edge' === n &&
                  ((t.version.string = '12.0.0'),
                  (t.version.major = '12'),
                  (t.version.minor = '0'),
                  (t.version.patch = '0'));
              return (
                'function' == typeof e[s].parseDocumentMode &&
                  (t.version.documentMode = e[s].parseDocumentMode()),
                t
              );
            }
          return t;
        }
        function o(e) {
          var t = {};
          return (t.browser = a(p.browser, s.browser, e)), (t.os = a(p.os, s.os, e)), t;
        }
        var s = e('./defaults'),
          p = e('./dictionary');
        t.exports = o;
      },
      { './defaults': 125, './dictionary': 126 },
    ],
    128: [
      function(e, t, r) {
        'use strict';
        var n = {
          ua: window.navigator.userAgent,
          platform: window.navigator.platform,
          vendor: window.navigator.vendor,
        };
        t.exports = e('./parseUserAgent')(n);
      },
      { './parseUserAgent': 127 },
    ],
    129: [
      function(e, t, r) {
        'use strict';
        function n(e, t) {
          i.call(this),
            (this._id = e || o.ID),
            (this._options = Object.assign({}, o.OPTIONS, t)),
            (this._allowDOMEventDispatch = !1),
            (this._allowElementStateData = !1),
            (this._options.removeNamespace =
              'boolean' != typeof this._options.removeNamespace || this._options.removeNamespace),
            (this._el = this._initViewportEl(this._id)),
            (this._resizing = !1),
            (this._mediaQueryLists = {
              resolution: { retina: window.matchMedia(c.RETINA) },
              orientation: {
                portrait: window.matchMedia(c.PORTRAIT),
                landscape: window.matchMedia(c.LANDSCAPE),
              },
            }),
            (this._viewport = this._getViewport(this._options.removeNamespace)),
            (this._retina = this._getRetina(this._mediaQueryLists.resolution.retina)),
            (this._orientation = this._initOrientation()),
            this._addListeners(),
            this._updateElementStateData();
        }
        var i = e('@marcom/ac-event-emitter-micro').EventEmitterMicro,
          a = e('@marcom/ac-raf-emitter/update'),
          o = { ID: 'viewport-emitter', OPTIONS: { removeNamespace: !0 } },
          s = {
            DOM_DISPATCH: 'data-viewport-emitter-dispatch',
            STATE: 'data-viewport-emitter-state',
          },
          p = '::before',
          c = {
            RETINA:
              'only screen and (-webkit-min-device-pixel-ratio: 1.5), screen and (min-resolution: 1.5dppx), screen and (min-resolution: 144dpi)',
            PORTRAIT: 'only screen and (orientation: portrait)',
            LANDSCAPE: 'only screen and (orientation: landscape)',
          },
          u = {
            any: 'change:any',
            orientation: 'change:orientation',
            retina: 'change:retina',
            viewport: 'change:viewport',
          };
        Object.defineProperty(n, 'DOM_DISPATCH_ATTRIBUTE', {
          get: function() {
            return s.DOM_DISPATCH;
          },
        }),
          Object.defineProperty(n, 'DOM_STATE_ATTRIBUTE', {
            get: function() {
              return s.STATE;
            },
          });
        var g = (n.prototype = Object.create(i.prototype));
        Object.defineProperty(g, 'id', {
          get: function() {
            return this._id;
          },
        }),
          Object.defineProperty(g, 'element', {
            get: function() {
              return this._el;
            },
          }),
          Object.defineProperty(g, 'mediaQueryLists', {
            get: function() {
              return this._mediaQueryLists;
            },
          }),
          Object.defineProperty(g, 'viewport', {
            get: function() {
              return this._viewport;
            },
          }),
          Object.defineProperty(g, 'retina', {
            get: function() {
              return this._retina;
            },
          }),
          Object.defineProperty(g, 'orientation', {
            get: function() {
              return this._orientation;
            },
          }),
          Object.defineProperty(g, 'hasDomDispatch', {
            get: function() {
              return this._allowDOMEventDispatch;
            },
          }),
          (g.destroy = function() {
            this._removeListeners();
            for (var e in this._options) this._options[e] = null;
            for (var t in this._mediaQueryLists) {
              var r = this._mediaQueryLists[t];
              for (var n in r) r[n] = null;
            }
            (this._id = null),
              (this._el = null),
              (this._viewport = null),
              (this._retina = null),
              (this._orientation = null),
              i.prototype.destroy.call(this);
          }),
          (g._initViewportEl = function(e) {
            var t = document.getElementById(e);
            return (
              t ||
                ((t = document.createElement('div')),
                (t.id = e),
                (t = document.body.appendChild(t))),
              t.hasAttribute(s.DOM_DISPATCH) ||
                (t.setAttribute(s.DOM_DISPATCH, ''), (this._allowDOMEventDispatch = !0)),
              t.hasAttribute(s.STATE) || (this._allowElementStateData = !0),
              t
            );
          }),
          (g._dispatch = function(e, t) {
            var r = {
              viewport: this._viewport,
              orientation: this._orientation,
              retina: this._retina,
            };
            if (this._allowDOMEventDispatch) {
              var n = new CustomEvent(e, { detail: t }),
                i = new CustomEvent(u.any, { detail: r });
              this._el.dispatchEvent(n), this._el.dispatchEvent(i);
            }
            this.trigger(e, t), this.trigger(u.any, r);
          }),
          (g._addListeners = function() {
            (this._onOrientationChange = this._onOrientationChange.bind(this)),
              (this._onRetinaChange = this._onRetinaChange.bind(this)),
              (this._onViewportChange = this._onViewportChange.bind(this)),
              (this._onViewportChangeUpdate = this._onViewportChangeUpdate.bind(this)),
              this._mediaQueryLists.orientation.portrait.addListener(this._onOrientationChange),
              this._mediaQueryLists.orientation.landscape.addListener(this._onOrientationChange),
              this._mediaQueryLists.resolution.retina.addListener(this._onRetinaChange),
              window.addEventListener('resize', this._onViewportChange);
          }),
          (g._removeListeners = function() {
            this._mediaQueryLists.orientation.portrait.removeListener(this._onOrientationChange),
              this._mediaQueryLists.orientation.landscape.removeListener(this._onOrientationChange),
              this._mediaQueryLists.resolution.retina.removeListener(this._onRetinaChange),
              window.removeEventListener('resize', this._onViewportChange);
          }),
          (g._updateElementStateData = function() {
            if (this._allowElementStateData) {
              var e = JSON.stringify({
                viewport: this._viewport,
                orientation: this._orientation,
                retina: this._retina,
              });
              this._el.setAttribute(s.STATE, e);
            }
          }),
          (g._getViewport = function(e) {
            var t = window.getComputedStyle(this._el, p).content;
            return t ? ((t = t.replace(/["']/g, '')), e ? t.split(':').pop() : t) : null;
          }),
          (g._getRetina = function(e) {
            return e.matches;
          }),
          (g._getOrientation = function(e) {
            var t = this._orientation;
            if (e.matches) {
              var r = /portrait|landscape/;
              return e.media.match(r)[0];
            }
            return t;
          }),
          (g._initOrientation = function() {
            var e = this._getOrientation(this._mediaQueryLists.orientation.portrait);
            return e ? e : this._getOrientation(this._mediaQueryLists.orientation.landscape);
          }),
          (g._onViewportChange = function() {
            this._resizing || ((this._resizing = !0), a(this._onViewportChangeUpdate));
          }),
          (g._onViewportChangeUpdate = function() {
            var e = this._viewport;
            if (
              ((this._viewport = this._getViewport(this._options.removeNamespace)),
              e !== this._viewport)
            ) {
              var t = { from: e, to: this._viewport };
              this._updateElementStateData(), this._dispatch(u.viewport, t);
            }
            this._resizing = !1;
          }),
          (g._onRetinaChange = function(e) {
            var t = this._retina;
            if (((this._retina = this._getRetina(e)), t !== this._retina)) {
              var r = { from: t, to: this._retina };
              this._updateElementStateData(), this._dispatch(u.retina, r);
            }
          }),
          (g._onOrientationChange = function(e) {
            var t = this._orientation;
            if (((this._orientation = this._getOrientation(e)), t !== this._orientation)) {
              var r = { from: t, to: this._orientation };
              this._updateElementStateData(), this._dispatch(u.orientation, r);
            }
          }),
          (t.exports = n);
      },
      { '@marcom/ac-event-emitter-micro': 34, '@marcom/ac-raf-emitter/update': 68 },
    ],
    130: [
      function(e, t, r) {
        'use strict';
        var n = e('./ViewportEmitter');
        t.exports = new n();
      },
      { './ViewportEmitter': 129 },
    ],
    131: [
      function(e, t, r) {
        'use strict';
        function n(e) {
          var t = s.get(e),
            r = t && (t._triangleBuffer.handle || t._triangleBuffer.buffer);
          if (!r || !e.isBuffer(r)) {
            var n = a(e, new Float32Array([-1, -1, -1, 4, 4, -1]));
            (t = o(e, [{ buffer: n, type: e.FLOAT, size: 2 }])),
              (t._triangleBuffer = n),
              s.set(e, t);
          }
          t.bind(), e.drawArrays(e.TRIANGLES, 0, 3), t.unbind();
        }
        var i = 'undefined' == typeof WeakMap ? e('weak-map') : WeakMap,
          a = e('gl-buffer'),
          o = e('gl-vao'),
          s = new i();
        t.exports = n;
      },
      { 'gl-buffer': 143, 'gl-vao': 160, 'weak-map': 176 },
    ],
    132: [
      function(e, t, r) {
        'use strict';
        t.exports = { cname: e('./ac-cname/cname') };
      },
      { './ac-cname/cname': 133 },
    ],
    133: [
      function(e, t, r) {
        'use strict';
        function n(e) {
          return n.addPrefix(e);
        }
        var i = e('ac-path').path;
        (n._prefix = (function() {
          var e = '/global/elements/blank.gif';
          return e.replace(/global\/.*/, '');
        })()),
          (n.addPrefix = function(e) {
            return i.isAbsolute(e)
              ? e
              : (n._assertRootRelative(e),
                (e = n._prefix + e.replace(/^\//, '')),
                (e = e.replace(/(^.+)(\/105\/)/, '$1/')));
          }),
          (n.formatUrl = function(e, t, r, a) {
            var o = i.format({ dirname: e, filename: t, extname: r }, a);
            if (i.isAbsolute(o)) return o;
            n._assertRootRelative(e);
            var s = n.addPrefix(o);
            return s;
          }),
          (n._assertRootRelative = function(e) {
            if (!i.isRootRelative(e))
              throw new URIError('Only root-relative paths are currently supported');
          }),
          (t.exports = n);
      },
      { 'ac-path': 136 },
    ],
    134: [
      function(e, t, r) {
        t.exports.EventEmitter = e('./ac-event-emitter/EventEmitter');
      },
      { './ac-event-emitter/EventEmitter': 135 },
    ],
    135: [
      function(e, t, r) {
        'use strict';
        var n = 'EventEmitter:propagation',
          i = function(e) {
            e && (this.context = e);
          },
          a = i.prototype,
          o = function() {
            return (
              this.hasOwnProperty('_events') ||
                'object' == typeof this._events ||
                (this._events = {}),
              this._events
            );
          },
          s = function(e, t) {
            var r = e[0],
              n = e[1],
              i = e[2];
            if (('string' != typeof r && 'object' != typeof r) || null === r || Array.isArray(r))
              throw new TypeError('Expecting event name to be a string or object.');
            if ('string' == typeof r && !n)
              throw new Error('Expecting a callback function to be provided.');
            if (n && 'function' != typeof n) {
              if ('object' != typeof r || 'object' != typeof n)
                throw new TypeError('Expecting callback to be a function.');
              i = n;
            }
            if ('object' == typeof r) for (var a in r) t.call(this, a, r[a], i);
            'string' == typeof r &&
              ((r = r.split(' ')),
              r.forEach(function(e) {
                t.call(this, e, n, i);
              }, this));
          },
          p = function(e, t) {
            var r, n, i;
            if (((r = o.call(this)[e]), r && 0 !== r.length))
              for (
                r = r.slice(), this._stoppedImmediatePropagation = !1, n = 0, i = r.length;
                n < i && (!this._stoppedImmediatePropagation && !t(r[n], n));
                n++
              );
          },
          c = function(e, t, r) {
            var n = -1;
            p.call(this, t, function(e, t) {
              if (e.callback === r) return (n = t), !0;
            }),
              n !== -1 && e[t].splice(n, 1);
          };
        (a.on = function() {
          var e = o.call(this);
          return (
            s.call(this, arguments, function(t, r, n) {
              (e[t] = e[t] || (e[t] = [])), e[t].push({ callback: r, context: n });
            }),
            this
          );
        }),
          (a.once = function() {
            return (
              s.call(this, arguments, function(e, t, r) {
                var n = function(i) {
                  t.call(r || this, i), this.off(e, n);
                };
                this.on(e, n, this);
              }),
              this
            );
          }),
          (a.off = function(e, t) {
            var r = o.call(this);
            if (0 === arguments.length) this._events = {};
            else if (!e || ('string' != typeof e && 'object' != typeof e) || Array.isArray(e))
              throw new TypeError('Expecting event name to be a string or object.');
            if ('object' == typeof e) for (var n in e) c.call(this, r, n, e[n]);
            if ('string' == typeof e) {
              var i = e.split(' ');
              1 === i.length
                ? t
                  ? c.call(this, r, e, t)
                  : (r[e] = [])
                : i.forEach(function(e) {
                    r[e] = [];
                  });
            }
            return this;
          }),
          (a.trigger = function(e, t, r) {
            if (!e) throw new Error('trigger method requires an event name');
            if ('string' != typeof e) throw new TypeError('Expecting event names to be a string.');
            if (r && 'boolean' != typeof r)
              throw new TypeError('Expecting doNotPropagate to be a boolean.');
            return (
              (e = e.split(' ')),
              e.forEach(function(e) {
                p.call(
                  this,
                  e,
                  function(e) {
                    e.callback.call(e.context || this.context || this, t);
                  }.bind(this)
                ),
                  r ||
                    p.call(this, n, function(r) {
                      var n = e;
                      r.prefix && (n = r.prefix + n), r.emitter.trigger(n, t);
                    });
              }, this),
              this
            );
          }),
          (a.propagateTo = function(e, t) {
            var r = o.call(this);
            r[n] || (this._events[n] = []), r[n].push({ emitter: e, prefix: t });
          }),
          (a.stopPropagatingTo = function(e) {
            var t = o.call(this);
            if (!e) return void (t[n] = []);
            var r,
              i = t[n],
              a = i.length;
            for (r = 0; r < a; r++)
              if (i[r].emitter === e) {
                i.splice(r, 1);
                break;
              }
          }),
          (a.stopImmediatePropagation = function() {
            this._stoppedImmediatePropagation = !0;
          }),
          (a.has = function(e, t, r) {
            var n = o.call(this),
              i = n[e];
            if (0 === arguments.length) return Object.keys(n);
            if (!i) return !1;
            if (!t) return i.length > 0;
            for (var a = 0, s = i.length; a < s; a++) {
              var p = i[a];
              if (r && t && p.context === r && p.callback === t) return !0;
              if (t && !r && p.callback === t) return !0;
            }
            return !1;
          }),
          (t.exports = i);
      },
      {},
    ],
    136: [
      function(e, t, r) {
        'use strict';
        t.exports = { path: e('./ac-path/path') };
      },
      { './ac-path/path': 137 },
    ],
    137: [
      function(e, t, r) {
        'use strict';
        function n(e) {
          return n.parse(e);
        }
        (n.basename = function(e, t) {
          n._assertStr(e);
          var r,
            i = e.match(/[^\/]*$/)[0];
          return t && ((r = i.match(new RegExp('(.*)' + t + '$'))), r && (i = r[1])), i;
        }),
          (n.dirname = function(e) {
            n._assertStr(e);
            var t = e.match(/^(.*)\b\/|.*/);
            return t[1] || e;
          }),
          (n.extname = function(e) {
            n._assertStr(e);
            var t = e.match(/\.[^.]*$/);
            return t ? t[0] : '';
          }),
          (n.filename = function(e) {
            return n._assertStr(e), n.basename(e, n.extname(e));
          }),
          (n.format = function(e, t) {
            n._assertObj(e);
            var r = e.dirname ? e.dirname + '/' : '';
            return (
              e.basename
                ? (r += e.basename)
                : e.filename && ((r += e.filename), e.extname && (r += e.extname)),
              t &&
                ('string' == typeof t
                  ? (r += '?' + t)
                  : Object.prototype.toString.call(t) === Object.prototype.toString.call([]) &&
                    (r += '?' + t.join('&'))),
              r
            );
          }),
          (n.isAbsolute = function(e) {
            return n._assertStr(e), !!e.match(/(^http(s?))/);
          }),
          (n.isRootRelative = function(e) {
            return n._assertStr(e), !!e.match(/^\/(?!\/)/);
          }),
          (n.parse = function(e) {
            return (
              n._assertStr(e),
              {
                dirname: n.dirname(e),
                basename: n.basename(e),
                filename: n.filename(e),
                extname: n.extname(e),
              }
            );
          }),
          (n._assertStr = function(e) {
            n._assertType(e, 'string');
          }),
          (n._assertObj = function(e) {
            n._assertType(e, 'object');
          }),
          (n._assertType = function(e, t) {
            var r = typeof e;
            if ('undefined' === r || r !== t)
              throw new TypeError('path param must be of type ' + t);
          }),
          (t.exports = n);
      },
      {},
    ],
    138: [
      function(e, t, r) {
        'use strict';
        'use restrict';
        function n(e) {
          var t = 32;
          return (
            (e &= -e),
            e && t--,
            65535 & e && (t -= 16),
            16711935 & e && (t -= 8),
            252645135 & e && (t -= 4),
            858993459 & e && (t -= 2),
            1431655765 & e && (t -= 1),
            t
          );
        }
        var i = 32;
        (r.INT_BITS = i),
          (r.INT_MAX = 2147483647),
          (r.INT_MIN = -1 << (i - 1)),
          (r.sign = function(e) {
            return (e > 0) - (e < 0);
          }),
          (r.abs = function(e) {
            var t = e >> (i - 1);
            return (e ^ t) - t;
          }),
          (r.min = function(e, t) {
            return t ^ ((e ^ t) & -(e < t));
          }),
          (r.max = function(e, t) {
            return e ^ ((e ^ t) & -(e < t));
          }),
          (r.isPow2 = function(e) {
            return !(e & (e - 1) || !e);
          }),
          (r.log2 = function(e) {
            var t, r;
            return (
              (t = (e > 65535) << 4),
              (e >>>= t),
              (r = (e > 255) << 3),
              (e >>>= r),
              (t |= r),
              (r = (e > 15) << 2),
              (e >>>= r),
              (t |= r),
              (r = (e > 3) << 1),
              (e >>>= r),
              (t |= r),
              t | (e >> 1)
            );
          }),
          (r.log10 = function(e) {
            return e >= 1e9
              ? 9
              : e >= 1e8
              ? 8
              : e >= 1e7
              ? 7
              : e >= 1e6
              ? 6
              : e >= 1e5
              ? 5
              : e >= 1e4
              ? 4
              : e >= 1e3
              ? 3
              : e >= 100
              ? 2
              : e >= 10
              ? 1
              : 0;
          }),
          (r.popCount = function(e) {
            return (
              (e -= (e >>> 1) & 1431655765),
              (e = (858993459 & e) + ((e >>> 2) & 858993459)),
              (16843009 * ((e + (e >>> 4)) & 252645135)) >>> 24
            );
          }),
          (r.countTrailingZeros = n),
          (r.nextPow2 = function(e) {
            return (
              (e += 0 === e),
              --e,
              (e |= e >>> 1),
              (e |= e >>> 2),
              (e |= e >>> 4),
              (e |= e >>> 8),
              (e |= e >>> 16),
              e + 1
            );
          }),
          (r.prevPow2 = function(e) {
            return (
              (e |= e >>> 1),
              (e |= e >>> 2),
              (e |= e >>> 4),
              (e |= e >>> 8),
              (e |= e >>> 16),
              e - (e >>> 1)
            );
          }),
          (r.parity = function(e) {
            return (e ^= e >>> 16), (e ^= e >>> 8), (e ^= e >>> 4), (e &= 15), (27030 >>> e) & 1;
          });
        var a = new Array(256);
        !(function(e) {
          for (var t = 0; t < 256; ++t) {
            var r = t,
              n = t,
              i = 7;
            for (r >>>= 1; r; r >>>= 1) (n <<= 1), (n |= 1 & r), --i;
            e[t] = (n << i) & 255;
          }
        })(a),
          (r.reverse = function(e) {
            return (
              (a[255 & e] << 24) |
              (a[(e >>> 8) & 255] << 16) |
              (a[(e >>> 16) & 255] << 8) |
              a[(e >>> 24) & 255]
            );
          }),
          (r.interleave2 = function(e, t) {
            return (
              (e &= 65535),
              (e = 16711935 & (e | (e << 8))),
              (e = 252645135 & (e | (e << 4))),
              (e = 858993459 & (e | (e << 2))),
              (e = 1431655765 & (e | (e << 1))),
              (t &= 65535),
              (t = 16711935 & (t | (t << 8))),
              (t = 252645135 & (t | (t << 4))),
              (t = 858993459 & (t | (t << 2))),
              (t = 1431655765 & (t | (t << 1))),
              e | (t << 1)
            );
          }),
          (r.deinterleave2 = function(e, t) {
            return (
              (e = (e >>> t) & 1431655765),
              (e = 858993459 & (e | (e >>> 1))),
              (e = 252645135 & (e | (e >>> 2))),
              (e = 16711935 & (e | (e >>> 4))),
              (e = 65535 & (e | (e >>> 16))),
              (e << 16) >> 16
            );
          }),
          (r.interleave3 = function(e, t, r) {
            return (
              (e &= 1023),
              (e = 4278190335 & (e | (e << 16))),
              (e = 251719695 & (e | (e << 8))),
              (e = 3272356035 & (e | (e << 4))),
              (e = 1227133513 & (e | (e << 2))),
              (t &= 1023),
              (t = 4278190335 & (t | (t << 16))),
              (t = 251719695 & (t | (t << 8))),
              (t = 3272356035 & (t | (t << 4))),
              (t = 1227133513 & (t | (t << 2))),
              (e |= t << 1),
              (r &= 1023),
              (r = 4278190335 & (r | (r << 16))),
              (r = 251719695 & (r | (r << 8))),
              (r = 3272356035 & (r | (r << 4))),
              (r = 1227133513 & (r | (r << 2))),
              e | (r << 2)
            );
          }),
          (r.deinterleave3 = function(e, t) {
            return (
              (e = (e >>> t) & 1227133513),
              (e = 3272356035 & (e | (e >>> 2))),
              (e = 251719695 & (e | (e >>> 4))),
              (e = 4278190335 & (e | (e >>> 8))),
              (e = 1023 & (e | (e >>> 16))),
              (e << 22) >> 22
            );
          }),
          (r.nextCombination = function(e) {
            var t = e | (e - 1);
            return (t + 1) | (((~t & -~t) - 1) >>> (n(e) + 1));
          });
      },
      {},
    ],
    139: [
      function(e, t, r) {
        'use strict';
        function n() {
          (this.argTypes = []),
            (this.shimArgs = []),
            (this.arrayArgs = []),
            (this.arrayBlockIndices = []),
            (this.scalarArgs = []),
            (this.offsetArgs = []),
            (this.offsetArgIndex = []),
            (this.indexArgs = []),
            (this.shapeArgs = []),
            (this.funcName = ''),
            (this.pre = null),
            (this.body = null),
            (this.post = null),
            (this.debug = !1);
        }
        function i(e) {
          var t = new n();
          (t.pre = e.pre), (t.body = e.body), (t.post = e.post);
          var r = e.args.slice(0);
          t.argTypes = r;
          for (var i = 0; i < r.length; ++i) {
            var o = r[i];
            if ('array' === o || ('object' == typeof o && o.blockIndices)) {
              if (
                ((t.argTypes[i] = 'array'),
                t.arrayArgs.push(i),
                t.arrayBlockIndices.push(o.blockIndices ? o.blockIndices : 0),
                t.shimArgs.push('array' + i),
                i < t.pre.args.length && t.pre.args[i].count > 0)
              )
                throw new Error('cwise: pre() block may not reference array args');
              if (i < t.post.args.length && t.post.args[i].count > 0)
                throw new Error('cwise: post() block may not reference array args');
            } else if ('scalar' === o) t.scalarArgs.push(i), t.shimArgs.push('scalar' + i);
            else if ('index' === o) {
              if ((t.indexArgs.push(i), i < t.pre.args.length && t.pre.args[i].count > 0))
                throw new Error('cwise: pre() block may not reference array index');
              if (i < t.body.args.length && t.body.args[i].lvalue)
                throw new Error('cwise: body() block may not write to array index');
              if (i < t.post.args.length && t.post.args[i].count > 0)
                throw new Error('cwise: post() block may not reference array index');
            } else if ('shape' === o) {
              if ((t.shapeArgs.push(i), i < t.pre.args.length && t.pre.args[i].lvalue))
                throw new Error('cwise: pre() block may not write to array shape');
              if (i < t.body.args.length && t.body.args[i].lvalue)
                throw new Error('cwise: body() block may not write to array shape');
              if (i < t.post.args.length && t.post.args[i].lvalue)
                throw new Error('cwise: post() block may not write to array shape');
            } else {
              if ('object' != typeof o || !o.offset)
                throw new Error('cwise: Unknown argument type ' + r[i]);
              (t.argTypes[i] = 'offset'),
                t.offsetArgs.push({ array: o.array, offset: o.offset }),
                t.offsetArgIndex.push(i);
            }
          }
          if (t.arrayArgs.length <= 0) throw new Error('cwise: No array arguments specified');
          if (t.pre.args.length > r.length)
            throw new Error('cwise: Too many arguments in pre() block');
          if (t.body.args.length > r.length)
            throw new Error('cwise: Too many arguments in body() block');
          if (t.post.args.length > r.length)
            throw new Error('cwise: Too many arguments in post() block');
          return (
            (t.debug = !!e.printCode || !!e.debug),
            (t.funcName = e.funcName || 'cwise'),
            (t.blockSize = e.blockSize || 64),
            a(t)
          );
        }
        var a = e('./lib/thunk.js');
        t.exports = i;
      },
      { './lib/thunk.js': 141 },
    ],
    140: [
      function(e, t, r) {
        'use strict';
        function n(e, t, r) {
          var n,
            i,
            a = e.length,
            o = t.arrayArgs.length,
            s = t.indexArgs.length > 0,
            p = [],
            c = [],
            u = 0,
            g = 0;
          for (n = 0; n < a; ++n) c.push(['i', n, '=0'].join(''));
          for (i = 0; i < o; ++i)
            for (n = 0; n < a; ++n)
              (g = u),
                (u = e[n]),
                0 === n
                  ? c.push(['d', i, 's', n, '=t', i, 'p', u].join(''))
                  : c.push(
                      ['d', i, 's', n, '=(t', i, 'p', u, '-s', g, '*t', i, 'p', g, ')'].join('')
                    );
          for (c.length > 0 && p.push('var ' + c.join(',')), n = a - 1; n >= 0; --n)
            (u = e[n]), p.push(['for(i', n, '=0;i', n, '<s', u, ';++i', n, '){'].join(''));
          for (p.push(r), n = 0; n < a; ++n) {
            for (g = u, u = e[n], i = 0; i < o; ++i) p.push(['p', i, '+=d', i, 's', n].join(''));
            s &&
              (n > 0 && p.push(['index[', g, ']-=s', g].join('')),
              p.push(['++index[', u, ']'].join(''))),
              p.push('}');
          }
          return p.join('\n');
        }
        function i(e, t, r, i) {
          for (
            var a = t.length,
              o = r.arrayArgs.length,
              s = r.blockSize,
              p = r.indexArgs.length > 0,
              c = [],
              u = 0;
            u < o;
            ++u
          )
            c.push(['var offset', u, '=p', u].join(''));
          for (var u = e; u < a; ++u)
            c.push(['for(var j' + u + '=SS[', t[u], ']|0;j', u, '>0;){'].join('')),
              c.push(['if(j', u, '<', s, '){'].join('')),
              c.push(['s', t[u], '=j', u].join('')),
              c.push(['j', u, '=0'].join('')),
              c.push(['}else{s', t[u], '=', s].join('')),
              c.push(['j', u, '-=', s, '}'].join('')),
              p && c.push(['index[', t[u], ']=j', u].join(''));
          for (var u = 0; u < o; ++u) {
            for (var g = ['offset' + u], l = e; l < a; ++l)
              g.push(['j', l, '*t', u, 'p', t[l]].join(''));
            c.push(['p', u, '=(', g.join('+'), ')'].join(''));
          }
          c.push(n(t, r, i));
          for (var u = e; u < a; ++u) c.push('}');
          return c.join('\n');
        }
        function a(e) {
          for (var t = 0, r = e[0].length; t < r; ) {
            for (var n = 1; n < e.length; ++n) if (e[n][t] !== e[0][t]) return t;
            ++t;
          }
          return t;
        }
        function o(e, t, r) {
          for (var n = e.body, i = [], a = [], o = 0; o < e.args.length; ++o) {
            var s = e.args[o];
            if (!(s.count <= 0)) {
              var p = new RegExp(s.name, 'g'),
                c = '',
                u = t.arrayArgs.indexOf(o);
              switch (t.argTypes[o]) {
                case 'offset':
                  var g = t.offsetArgIndex.indexOf(o),
                    l = t.offsetArgs[g];
                  (u = l.array), (c = '+q' + g);
                case 'array':
                  c = 'p' + u + c;
                  var h = 'l' + o,
                    f = 'a' + u;
                  if (0 === t.arrayBlockIndices[u])
                    1 === s.count
                      ? 'generic' === r[u]
                        ? s.lvalue
                          ? (i.push(['var ', h, '=', f, '.get(', c, ')'].join('')),
                            (n = n.replace(p, h)),
                            a.push([f, '.set(', c, ',', h, ')'].join('')))
                          : (n = n.replace(p, [f, '.get(', c, ')'].join('')))
                        : (n = n.replace(p, [f, '[', c, ']'].join('')))
                      : 'generic' === r[u]
                      ? (i.push(['var ', h, '=', f, '.get(', c, ')'].join('')),
                        (n = n.replace(p, h)),
                        s.lvalue && a.push([f, '.set(', c, ',', h, ')'].join('')))
                      : (i.push(['var ', h, '=', f, '[', c, ']'].join('')),
                        (n = n.replace(p, h)),
                        s.lvalue && a.push([f, '[', c, ']=', h].join('')));
                  else {
                    for (
                      var j = [s.name], d = [c], m = 0;
                      m < Math.abs(t.arrayBlockIndices[u]);
                      m++
                    )
                      j.push('\\s*\\[([^\\]]+)\\]'), d.push('$' + (m + 1) + '*t' + u + 'b' + m);
                    if (((p = new RegExp(j.join(''), 'g')), (c = d.join('+')), 'generic' === r[u]))
                      throw new Error(
                        'cwise: Generic arrays not supported in combination with blocks!'
                      );
                    n = n.replace(p, [f, '[', c, ']'].join(''));
                  }
                  break;
                case 'scalar':
                  n = n.replace(p, 'Y' + t.scalarArgs.indexOf(o));
                  break;
                case 'index':
                  n = n.replace(p, 'index');
                  break;
                case 'shape':
                  n = n.replace(p, 'shape');
              }
            }
          }
          return [i.join('\n'), n, a.join('\n')].join('\n').trim();
        }
        function s(e) {
          for (var t = new Array(e.length), r = !0, n = 0; n < e.length; ++n) {
            var i = e[n],
              a = i.match(/\d+/);
            (a = a ? a[0] : ''),
              0 === i.charAt(0) ? (t[n] = 'u' + i.charAt(1) + a) : (t[n] = i.charAt(0) + a),
              n > 0 && (r = r && t[n] === t[n - 1]);
          }
          return r ? t[0] : t.join('');
        }
        function p(e, t) {
          for (
            var r = (t[1].length - Math.abs(e.arrayBlockIndices[0])) | 0,
              p = new Array(e.arrayArgs.length),
              u = new Array(e.arrayArgs.length),
              g = 0;
            g < e.arrayArgs.length;
            ++g
          )
            (u[g] = t[2 * g]), (p[g] = t[2 * g + 1]);
          for (var l = [], h = [], f = [], j = [], d = [], g = 0; g < e.arrayArgs.length; ++g) {
            e.arrayBlockIndices[g] < 0
              ? (f.push(0), j.push(r), l.push(r), h.push(r + e.arrayBlockIndices[g]))
              : (f.push(e.arrayBlockIndices[g]),
                j.push(e.arrayBlockIndices[g] + r),
                l.push(0),
                h.push(e.arrayBlockIndices[g]));
            for (var m = [], v = 0; v < p[g].length; v++)
              f[g] <= p[g][v] && p[g][v] < j[g] && m.push(p[g][v] - f[g]);
            d.push(m);
          }
          for (var y = ['SS'], _ = ["'use strict'"], b = [], v = 0; v < r; ++v)
            b.push(['s', v, '=SS[', v, ']'].join(''));
          for (var g = 0; g < e.arrayArgs.length; ++g) {
            y.push('a' + g), y.push('t' + g), y.push('p' + g);
            for (var v = 0; v < r; ++v)
              b.push(['t', g, 'p', v, '=t', g, '[', f[g] + v, ']'].join(''));
            for (var v = 0; v < Math.abs(e.arrayBlockIndices[g]); ++v)
              b.push(['t', g, 'b', v, '=t', g, '[', l[g] + v, ']'].join(''));
          }
          for (var g = 0; g < e.scalarArgs.length; ++g) y.push('Y' + g);
          if ((e.shapeArgs.length > 0 && b.push('shape=SS.slice(0)'), e.indexArgs.length > 0)) {
            for (var E = new Array(r), g = 0; g < r; ++g) E[g] = '0';
            b.push(['index=[', E.join(','), ']'].join(''));
          }
          for (var g = 0; g < e.offsetArgs.length; ++g) {
            for (var w = e.offsetArgs[g], x = [], v = 0; v < w.offset.length; ++v)
              0 !== w.offset[v] &&
                (1 === w.offset[v]
                  ? x.push(['t', w.array, 'p', v].join(''))
                  : x.push([w.offset[v], '*t', w.array, 'p', v].join('')));
            0 === x.length ? b.push('q' + g + '=0') : b.push(['q', g, '=', x.join('+')].join(''));
          }
          var k = c(
            []
              .concat(e.pre.thisVars)
              .concat(e.body.thisVars)
              .concat(e.post.thisVars)
          );
          (b = b.concat(k)), b.length > 0 && _.push('var ' + b.join(','));
          for (var g = 0; g < e.arrayArgs.length; ++g) _.push('p' + g + '|=0');
          e.pre.body.length > 3 && _.push(o(e.pre, e, u));
          var S = o(e.body, e, u),
            A = a(d);
          A < r ? _.push(i(A, d[0], e, S)) : _.push(n(d[0], e, S)),
            e.post.body.length > 3 && _.push(o(e.post, e, u)),
            e.debug &&
              console.log(
                '-----Generated cwise routine for ',
                t,
                ':\n' + _.join('\n') + '\n----------'
              );
          var T = [e.funcName || 'unnamed', '_cwise_loop_', p[0].join('s'), 'm', A, s(u)].join(''),
            O = new Function(
              ['function ', T, '(', y.join(','), '){', _.join('\n'), '} return ', T].join('')
            );
          return O();
        }
        var c = e('uniq');
        t.exports = p;
      },
      { uniq: 175 },
    ],
    141: [
      function(e, t, r) {
        'use strict';
        function n(e) {
          var t = ["'use strict'", 'var CACHED={}'],
            r = [],
            n = e.funcName + '_cwise_thunk';
          t.push(['return function ', n, '(', e.shimArgs.join(','), '){'].join(''));
          for (
            var a = [],
              o = [],
              s = [
                [
                  'array',
                  e.arrayArgs[0],
                  '.shape.slice(',
                  Math.max(0, e.arrayBlockIndices[0]),
                  e.arrayBlockIndices[0] < 0 ? ',' + e.arrayBlockIndices[0] + ')' : ')',
                ].join(''),
              ],
              p = [],
              c = [],
              u = 0;
            u < e.arrayArgs.length;
            ++u
          ) {
            var g = e.arrayArgs[u];
            r.push(['t', g, '=array', g, '.dtype,', 'r', g, '=array', g, '.order'].join('')),
              a.push('t' + g),
              a.push('r' + g),
              o.push('t' + g),
              o.push('r' + g + '.join()'),
              s.push('array' + g + '.data'),
              s.push('array' + g + '.stride'),
              s.push('array' + g + '.offset|0'),
              u > 0 &&
                (p.push(
                  'array' +
                    e.arrayArgs[0] +
                    '.shape.length===array' +
                    g +
                    '.shape.length+' +
                    (Math.abs(e.arrayBlockIndices[0]) - Math.abs(e.arrayBlockIndices[u]))
                ),
                c.push(
                  'array' +
                    e.arrayArgs[0] +
                    '.shape[shapeIndex+' +
                    Math.max(0, e.arrayBlockIndices[0]) +
                    ']===array' +
                    g +
                    '.shape[shapeIndex+' +
                    Math.max(0, e.arrayBlockIndices[u]) +
                    ']'
                ));
          }
          e.arrayArgs.length > 1 &&
            (t.push(
              'if (!(' +
                p.join(' && ') +
                ")) throw new Error('cwise: Arrays do not all have the same dimensionality!')"
            ),
            t.push(
              'for(var shapeIndex=array' +
                e.arrayArgs[0] +
                '.shape.length-' +
                Math.abs(e.arrayBlockIndices[0]) +
                '; shapeIndex-->0;) {'
            ),
            t.push(
              'if (!(' +
                c.join(' && ') +
                ")) throw new Error('cwise: Arrays do not all have the same shape!')"
            ),
            t.push('}'));
          for (var u = 0; u < e.scalarArgs.length; ++u) s.push('scalar' + e.scalarArgs[u]);
          r.push(['type=[', o.join(','), '].join()'].join('')),
            r.push('proc=CACHED[type]'),
            t.push('var ' + r.join(',')),
            t.push(
              [
                'if(!proc){',
                'CACHED[type]=proc=compile([',
                a.join(','),
                '])}',
                'return proc(',
                s.join(','),
                ')}',
              ].join('')
            ),
            e.debug && console.log('-----Generated thunk:\n' + t.join('\n') + '\n----------');
          var l = new Function('compile', t.join('\n'));
          return l(i.bind(void 0, e));
        }
        var i = e('./compile.js');
        t.exports = n;
      },
      { './compile.js': 140 },
    ],
    142: [
      function(e, t, r) {
        'use strict';
        function n(e, t, r) {
          var i = 0 | e[r];
          if (i <= 0) return [];
          var a,
            o = new Array(i);
          if (r === e.length - 1) for (a = 0; a < i; ++a) o[a] = t;
          else for (a = 0; a < i; ++a) o[a] = n(e, t, r + 1);
          return o;
        }
        function i(e, t) {
          var r, n;
          for (r = new Array(e), n = 0; n < e; ++n) r[n] = t;
          return r;
        }
        function a(e, t) {
          switch (('undefined' == typeof t && (t = 0), typeof e)) {
            case 'number':
              if (e > 0) return i(0 | e, t);
              break;
            case 'object':
              if ('number' == typeof e.length) return n(e, t, 0);
          }
          return [];
        }
        t.exports = a;
      },
      {},
    ],
    143: [
      function(e, t, r) {
        'use strict';
        function n(e, t, r, n, i) {
          (this.gl = e), (this.type = t), (this.handle = r), (this.length = n), (this.usage = i);
        }
        function i(e, t, r, n, i, a) {
          var o = i.length * i.BYTES_PER_ELEMENT;
          if (a < 0) return e.bufferData(t, i, n), o;
          if (o + a > r) throw new Error('gl-buffer: If resizing buffer, must not specify offset');
          return e.bufferSubData(t, a, i), r;
        }
        function a(e, t) {
          for (var r = p.malloc(e.length, t), n = e.length, i = 0; i < n; ++i) r[i] = e[i];
          return r;
        }
        function o(e, t) {
          for (var r = 1, n = t.length - 1; n >= 0; --n) {
            if (t[n] !== r) return !1;
            r *= e[n];
          }
          return !0;
        }
        function s(e, t, r, i) {
          if (
            ((r = r || e.ARRAY_BUFFER),
            (i = i || e.DYNAMIC_DRAW),
            r !== e.ARRAY_BUFFER && r !== e.ELEMENT_ARRAY_BUFFER)
          )
            throw new Error(
              'gl-buffer: Invalid type for webgl buffer, must be either gl.ARRAY_BUFFER or gl.ELEMENT_ARRAY_BUFFER'
            );
          if (i !== e.DYNAMIC_DRAW && i !== e.STATIC_DRAW && i !== e.STREAM_DRAW)
            throw new Error(
              'gl-buffer: Invalid usage for buffer, must be either gl.DYNAMIC_DRAW, gl.STATIC_DRAW or gl.STREAM_DRAW'
            );
          var a = e.createBuffer(),
            o = new n(e, r, a, 0, i);
          return o.update(t), o;
        }
        var p = e('typedarray-pool'),
          c = e('ndarray-ops'),
          u = e('ndarray'),
          g = ['uint8', 'uint8_clamped', 'uint16', 'uint32', 'int8', 'int16', 'int32', 'float32'],
          l = n.prototype;
        (l.bind = function() {
          this.gl.bindBuffer(this.type, this.handle);
        }),
          (l.unbind = function() {
            this.gl.bindBuffer(this.type, null);
          }),
          (l.dispose = function() {
            this.gl.deleteBuffer(this.handle);
          }),
          (l.update = function(e, t) {
            if (
              ('number' != typeof t && (t = -1),
              this.bind(),
              'object' == typeof e && 'undefined' != typeof e.shape)
            ) {
              var r = e.dtype;
              if (
                (g.indexOf(r) < 0 && (r = 'float32'), this.type === this.gl.ELEMENT_ARRAY_BUFFER)
              ) {
                var n = gl.getExtension('OES_element_index_uint');
                r = n && 'uint16' !== r ? 'uint32' : 'uint16';
              }
              if (r === e.dtype && o(e.shape, e.stride))
                0 === e.offset && e.data.length === e.shape[0]
                  ? (this.length = i(this.gl, this.type, this.length, this.usage, e.data, t))
                  : (this.length = i(
                      this.gl,
                      this.type,
                      this.length,
                      this.usage,
                      e.data.subarray(e.offset, e.shape[0]),
                      t
                    ));
              else {
                var s = p.malloc(e.size, r),
                  l = u(s, e.shape);
                c.assign(l, e),
                  t < 0
                    ? (this.length = i(this.gl, this.type, this.length, this.usage, s, t))
                    : (this.length = i(
                        this.gl,
                        this.type,
                        this.length,
                        this.usage,
                        s.subarray(0, e.size),
                        t
                      )),
                  p.free(s);
              }
            } else if (Array.isArray(e)) {
              var h;
              (h = this.type === this.gl.ELEMENT_ARRAY_BUFFER ? a(e, 'uint16') : a(e, 'float32')),
                t < 0
                  ? (this.length = i(this.gl, this.type, this.length, this.usage, h, t))
                  : (this.length = i(
                      this.gl,
                      this.type,
                      this.length,
                      this.usage,
                      h.subarray(0, e.length),
                      t
                    )),
                p.free(h);
            } else if ('object' == typeof e && 'number' == typeof e.length)
              this.length = i(this.gl, this.type, this.length, this.usage, e, t);
            else {
              if ('number' != typeof e && void 0 !== e)
                throw new Error('gl-buffer: Invalid data type');
              if (t >= 0) throw new Error('gl-buffer: Cannot specify offset when resizing buffer');
              (e = 0 | e),
                e <= 0 && (e = 1),
                this.gl.bufferData(this.type, 0 | e, this.usage),
                (this.length = e);
            }
          }),
          (t.exports = s);
      },
      { ndarray: 173, 'ndarray-ops': 172, 'typedarray-pool': 174 },
    ],
    144: [
      function(e, t, r) {
        function n(e) {
          var t = new Float32Array(16);
          return (
            (t[0] = e[0]),
            (t[1] = e[1]),
            (t[2] = e[2]),
            (t[3] = e[3]),
            (t[4] = e[4]),
            (t[5] = e[5]),
            (t[6] = e[6]),
            (t[7] = e[7]),
            (t[8] = e[8]),
            (t[9] = e[9]),
            (t[10] = e[10]),
            (t[11] = e[11]),
            (t[12] = e[12]),
            (t[13] = e[13]),
            (t[14] = e[14]),
            (t[15] = e[15]),
            t
          );
        }
        t.exports = n;
      },
      {},
    ],
    145: [
      function(e, t, r) {
        function n() {
          var e = new Float32Array(16);
          return (
            (e[0] = 1),
            (e[1] = 0),
            (e[2] = 0),
            (e[3] = 0),
            (e[4] = 0),
            (e[5] = 1),
            (e[6] = 0),
            (e[7] = 0),
            (e[8] = 0),
            (e[9] = 0),
            (e[10] = 1),
            (e[11] = 0),
            (e[12] = 0),
            (e[13] = 0),
            (e[14] = 0),
            (e[15] = 1),
            e
          );
        }
        t.exports = n;
      },
      {},
    ],
    146: [
      function(e, t, r) {
        function n(e, t) {
          var r = t[0],
            n = t[1],
            i = t[2],
            a = t[3],
            o = t[4],
            s = t[5],
            p = t[6],
            c = t[7],
            u = t[8],
            g = t[9],
            l = t[10],
            h = t[11],
            f = t[12],
            j = t[13],
            d = t[14],
            m = t[15],
            v = r * s - n * o,
            y = r * p - i * o,
            _ = r * c - a * o,
            b = n * p - i * s,
            E = n * c - a * s,
            w = i * c - a * p,
            x = u * j - g * f,
            k = u * d - l * f,
            S = u * m - h * f,
            A = g * d - l * j,
            T = g * m - h * j,
            O = l * m - h * d,
            P = v * O - y * T + _ * A + b * S - E * k + w * x;
          return P
            ? ((P = 1 / P),
              (e[0] = (s * O - p * T + c * A) * P),
              (e[1] = (i * T - n * O - a * A) * P),
              (e[2] = (j * w - d * E + m * b) * P),
              (e[3] = (l * E - g * w - h * b) * P),
              (e[4] = (p * S - o * O - c * k) * P),
              (e[5] = (r * O - i * S + a * k) * P),
              (e[6] = (d * _ - f * w - m * y) * P),
              (e[7] = (u * w - l * _ + h * y) * P),
              (e[8] = (o * T - s * S + c * x) * P),
              (e[9] = (n * S - r * T - a * x) * P),
              (e[10] = (f * E - j * _ + m * v) * P),
              (e[11] = (g * _ - u * E - h * v) * P),
              (e[12] = (s * k - o * A - p * x) * P),
              (e[13] = (r * A - n * k + i * x) * P),
              (e[14] = (j * y - f * b - d * v) * P),
              (e[15] = (u * b - g * y + l * v) * P),
              e)
            : null;
        }
        t.exports = n;
      },
      {},
    ],
    147: [
      function(e, t, r) {
        function n(e, t, r) {
          var n = Math.sin(r),
            i = Math.cos(r),
            a = t[4],
            o = t[5],
            s = t[6],
            p = t[7],
            c = t[8],
            u = t[9],
            g = t[10],
            l = t[11];
          return (
            t !== e &&
              ((e[0] = t[0]),
              (e[1] = t[1]),
              (e[2] = t[2]),
              (e[3] = t[3]),
              (e[12] = t[12]),
              (e[13] = t[13]),
              (e[14] = t[14]),
              (e[15] = t[15])),
            (e[4] = a * i + c * n),
            (e[5] = o * i + u * n),
            (e[6] = s * i + g * n),
            (e[7] = p * i + l * n),
            (e[8] = c * i - a * n),
            (e[9] = u * i - o * n),
            (e[10] = g * i - s * n),
            (e[11] = l * i - p * n),
            e
          );
        }
        t.exports = n;
      },
      {},
    ],
    148: [
      function(e, t, r) {
        function n(e, t, r) {
          var n = Math.sin(r),
            i = Math.cos(r),
            a = t[0],
            o = t[1],
            s = t[2],
            p = t[3],
            c = t[8],
            u = t[9],
            g = t[10],
            l = t[11];
          return (
            t !== e &&
              ((e[4] = t[4]),
              (e[5] = t[5]),
              (e[6] = t[6]),
              (e[7] = t[7]),
              (e[12] = t[12]),
              (e[13] = t[13]),
              (e[14] = t[14]),
              (e[15] = t[15])),
            (e[0] = a * i - c * n),
            (e[1] = o * i - u * n),
            (e[2] = s * i - g * n),
            (e[3] = p * i - l * n),
            (e[8] = a * n + c * i),
            (e[9] = o * n + u * i),
            (e[10] = s * n + g * i),
            (e[11] = p * n + l * i),
            e
          );
        }
        t.exports = n;
      },
      {},
    ],
    149: [
      function(e, t, r) {
        function n(e, t, r) {
          var n = Math.sin(r),
            i = Math.cos(r),
            a = t[0],
            o = t[1],
            s = t[2],
            p = t[3],
            c = t[4],
            u = t[5],
            g = t[6],
            l = t[7];
          return (
            t !== e &&
              ((e[8] = t[8]),
              (e[9] = t[9]),
              (e[10] = t[10]),
              (e[11] = t[11]),
              (e[12] = t[12]),
              (e[13] = t[13]),
              (e[14] = t[14]),
              (e[15] = t[15])),
            (e[0] = a * i + c * n),
            (e[1] = o * i + u * n),
            (e[2] = s * i + g * n),
            (e[3] = p * i + l * n),
            (e[4] = c * i - a * n),
            (e[5] = u * i - o * n),
            (e[6] = g * i - s * n),
            (e[7] = l * i - p * n),
            e
          );
        }
        t.exports = n;
      },
      {},
    ],
    150: [
      function(e, t, r) {
        function n(e, t, r) {
          var n = r[0],
            i = r[1],
            a = r[2];
          return (
            (e[0] = t[0] * n),
            (e[1] = t[1] * n),
            (e[2] = t[2] * n),
            (e[3] = t[3] * n),
            (e[4] = t[4] * i),
            (e[5] = t[5] * i),
            (e[6] = t[6] * i),
            (e[7] = t[7] * i),
            (e[8] = t[8] * a),
            (e[9] = t[9] * a),
            (e[10] = t[10] * a),
            (e[11] = t[11] * a),
            (e[12] = t[12]),
            (e[13] = t[13]),
            (e[14] = t[14]),
            (e[15] = t[15]),
            e
          );
        }
        t.exports = n;
      },
      {},
    ],
    151: [
      function(e, t, r) {
        function n(e, t) {
          if (e === t) {
            var r = t[1],
              n = t[2],
              i = t[3],
              a = t[6],
              o = t[7],
              s = t[11];
            (e[1] = t[4]),
              (e[2] = t[8]),
              (e[3] = t[12]),
              (e[4] = r),
              (e[6] = t[9]),
              (e[7] = t[13]),
              (e[8] = n),
              (e[9] = a),
              (e[11] = t[14]),
              (e[12] = i),
              (e[13] = o),
              (e[14] = s);
          } else
            (e[0] = t[0]),
              (e[1] = t[4]),
              (e[2] = t[8]),
              (e[3] = t[12]),
              (e[4] = t[1]),
              (e[5] = t[5]),
              (e[6] = t[9]),
              (e[7] = t[13]),
              (e[8] = t[2]),
              (e[9] = t[6]),
              (e[10] = t[10]),
              (e[11] = t[14]),
              (e[12] = t[3]),
              (e[13] = t[7]),
              (e[14] = t[11]),
              (e[15] = t[15]);
          return e;
        }
        t.exports = n;
      },
      {},
    ],
    152: [
      function(e, t, r) {
        'use strict';
        function n(e, t, r, n, i, a, o) {
          (this._gl = e),
            (this._program = t),
            (this._location = r),
            (this._dimension = n),
            (this._name = i),
            (this._constFunc = a),
            (this._relink = o);
        }
        function i(e, t, r, i, a, o, s) {
          for (var p = ['gl', 'v'], c = [], u = 0; u < i; ++u) p.push('x' + u), c.push('x' + u);
          p.push(
            [
              'if(x0.length===void 0){return gl.vertexAttrib',
              i,
              'f(v,',
              c.join(),
              ')}else{return gl.vertexAttrib',
              i,
              'fv(v,x0)}',
            ].join('')
          );
          var g = Function.apply(void 0, p),
            l = new n(e, t, r, i, o, g, s);
          Object.defineProperty(a, o, {
            set: function(t) {
              return e.disableVertexAttribArray(l._location), g(e, l._location, t), t;
            },
            get: function() {
              return l;
            },
            enumerable: !0,
          });
        }
        function a(e, t, r, n) {
          for (var a = {}, o = 0, s = r.length; o < s; ++o) {
            var p = r[o],
              c = p.name,
              u = p.type,
              g = e.getAttribLocation(t, c);
            switch (u) {
              case 'bool':
              case 'int':
              case 'float':
                i(e, t, g, 1, a, c, n);
                break;
              default:
                if (!(u.indexOf('vec') >= 0))
                  throw new Error('gl-shader: Unknown data type for attribute ' + c + ': ' + u);
                var l = u.charCodeAt(u.length - 1) - 48;
                if (l < 2 || l > 4)
                  throw new Error('gl-shader: Invalid data type for attribute ' + c + ': ' + u);
                i(e, t, g, l, a, c, n);
            }
          }
          return a;
        }
        t.exports = a;
        var o = n.prototype;
        (o.pointer = function(e, t, r, n) {
          var i = this._gl;
          i.vertexAttribPointer(this._location, this._dimension, e || i.FLOAT, !!t, r || 0, n || 0),
            this._gl.enableVertexAttribArray(this._location);
        }),
          Object.defineProperty(o, 'location', {
            get: function() {
              return this._location;
            },
            set: function(e) {
              e !== this._location &&
                ((this._location = e),
                this._gl.bindAttribLocation(this._program, e, this._name),
                this._gl.linkProgram(this._program),
                this._relink());
            },
          });
      },
      {},
    ],
    153: [
      function(e, t, r) {
        'use strict';
        function n(e) {
          var t = new Function('y', 'return function(){return y}');
          return t(e);
        }
        function i(e, t, r, i) {
          function s(r) {
            var n = new Function(
              'gl',
              'prog',
              'locations',
              'return function(){return gl.getUniform(prog,locations[' + r + '])}'
            );
            return n(e, t, i);
          }
          function p(e, t, r) {
            switch (r) {
              case 'bool':
              case 'int':
              case 'sampler2D':
              case 'samplerCube':
                return 'gl.uniform1i(locations[' + t + '],obj' + e + ')';
              case 'float':
                return 'gl.uniform1f(locations[' + t + '],obj' + e + ')';
              default:
                var n = r.indexOf('vec');
                if (!(0 <= n && n <= 1 && r.length === 4 + n)) {
                  if (0 === r.indexOf('mat') && 4 === r.length) {
                    var i = r.charCodeAt(r.length - 1) - 48;
                    if (i < 2 || i > 4)
                      throw new Error(
                        'gl-shader: Invalid uniform dimension type for matrix ' + name + ': ' + r
                      );
                    return 'gl.uniformMatrix' + i + 'fv(locations[' + t + '],false,obj' + e + ')';
                  }
                  throw new Error('gl-shader: Unknown uniform data type for ' + name + ': ' + r);
                }
                var i = r.charCodeAt(r.length - 1) - 48;
                if (i < 2 || i > 4) throw new Error('gl-shader: Invalid data type');
                switch (r.charAt(0)) {
                  case 'b':
                  case 'i':
                    return 'gl.uniform' + i + 'iv(locations[' + t + '],obj' + e + ')';
                  case 'v':
                    return 'gl.uniform' + i + 'fv(locations[' + t + '],obj' + e + ')';
                  default:
                    throw new Error(
                      'gl-shader: Unrecognized data type for vector ' + name + ': ' + r
                    );
                }
            }
          }
          function c(e, t) {
            if ('object' != typeof t) return [[e, t]];
            var r = [];
            for (var n in t) {
              var i = t[n],
                a = e;
              (a += parseInt(n) + '' === n ? '[' + n + ']' : '.' + n),
                'object' == typeof i ? r.push.apply(r, c(a, i)) : r.push([a, i]);
            }
            return r;
          }
          function u(n) {
            for (
              var a = ['return function updateProperty(obj){'], o = c('', n), s = 0;
              s < o.length;
              ++s
            ) {
              var u = o[s],
                g = u[0],
                l = u[1];
              i[l] && a.push(p(g, l, r[l].type));
            }
            a.push('return obj}');
            var h = new Function('gl', 'prog', 'locations', a.join('\n'));
            return h(e, t, i);
          }
          function g(e) {
            switch (e) {
              case 'bool':
                return !1;
              case 'int':
              case 'sampler2D':
              case 'samplerCube':
                return 0;
              case 'float':
                return 0;
              default:
                var t = e.indexOf('vec');
                if (0 <= t && t <= 1 && e.length === 4 + t) {
                  var r = e.charCodeAt(e.length - 1) - 48;
                  if (r < 2 || r > 4) throw new Error('gl-shader: Invalid data type');
                  return 'b' === e.charAt(0) ? a(r, !1) : a(r);
                }
                if (0 === e.indexOf('mat') && 4 === e.length) {
                  var r = e.charCodeAt(e.length - 1) - 48;
                  if (r < 2 || r > 4)
                    throw new Error(
                      'gl-shader: Invalid uniform dimension type for matrix ' + name + ': ' + e
                    );
                  return a([r, r]);
                }
                throw new Error('gl-shader: Unknown uniform data type for ' + name + ': ' + e);
            }
          }
          function l(e, t, a) {
            if ('object' == typeof a) {
              var o = h(a);
              Object.defineProperty(e, t, {
                get: n(o),
                set: u(a),
                enumerable: !0,
                configurable: !1,
              });
            } else
              i[a]
                ? Object.defineProperty(e, t, {
                    get: s(a),
                    set: u(a),
                    enumerable: !0,
                    configurable: !1,
                  })
                : (e[t] = g(r[a].type));
          }
          function h(e) {
            var t;
            if (Array.isArray(e)) {
              t = new Array(e.length);
              for (var r = 0; r < e.length; ++r) l(t, r, e[r]);
            } else {
              t = {};
              for (var n in e) l(t, n, e[n]);
            }
            return t;
          }
          var f = o(r, !0);
          return { get: n(h(f)), set: u(f), enumerable: !0, configurable: !0 };
        }
        var a = e('dup'),
          o = e('./reflect');
        t.exports = i;
      },
      { './reflect': 154, dup: 142 },
    ],
    154: [
      function(e, t, r) {
        'use strict';
        function n(e, t) {
          for (var r = {}, n = 0; n < e.length; ++n)
            for (var i = e[n].name, a = i.split('.'), o = r, s = 0; s < a.length; ++s) {
              var p = a[s].split('[');
              if (p.length > 1) {
                p[0] in o || (o[p[0]] = []), (o = o[p[0]]);
                for (var c = 1; c < p.length; ++c) {
                  var u = parseInt(p[c]);
                  c < p.length - 1 || s < a.length - 1
                    ? (u in o || (c < p.length - 1 ? (o[u] = []) : (o[u] = {})), (o = o[u]))
                    : t
                    ? (o[u] = n)
                    : (o[u] = e[n].type);
                }
              } else
                s < a.length - 1
                  ? (p[0] in o || (o[p[0]] = {}), (o = o[p[0]]))
                  : t
                  ? (o[p[0]] = n)
                  : (o[p[0]] = e[n].type);
            }
          return r;
        }
        t.exports = n;
      },
      {},
    ],
    155: [
      function(e, t, r) {
        'use strict';
        function n(e, t, r, n) {
          (this.gl = e),
            (this.handle = t),
            (this.attributes = null),
            (this.uniforms = null),
            (this.types = null),
            (this.vertexShader = r),
            (this.fragmentShader = n);
        }
        function i(e, t, r, n) {
          for (var i = 0; i < n.length; ++i) r[i] = e.getUniformLocation(t, n[i].name);
        }
        function a(e, t, r, i, a) {
          var o = e.createShader(e.VERTEX_SHADER);
          if (
            (e.shaderSource(o, t), e.compileShader(o), !e.getShaderParameter(o, e.COMPILE_STATUS))
          ) {
            var s = e.getShaderInfoLog(o);
            throw (console.error('gl-shader: Error compling vertex shader:', s),
            new Error('gl-shader: Error compiling vertex shader:' + s));
          }
          var p = e.createShader(e.FRAGMENT_SHADER);
          if (
            (e.shaderSource(p, r), e.compileShader(p), !e.getShaderParameter(p, e.COMPILE_STATUS))
          ) {
            var s = e.getShaderInfoLog(p);
            throw (console.error('gl-shader: Error compiling fragment shader:', s),
            new Error('gl-shader: Error compiling fragment shader:' + s));
          }
          var c = e.createProgram();
          if (
            (e.attachShader(c, p),
            e.attachShader(c, o),
            a.forEach(function(t) {
              'number' == typeof t.location && e.bindAttribLocation(c, t.location, t.name);
            }),
            e.linkProgram(c),
            !e.getProgramParameter(c, e.LINK_STATUS))
          ) {
            var s = e.getProgramInfoLog(c);
            throw (console.error('gl-shader: Error linking shader program:', s),
            new Error('gl-shader: Error linking shader program:' + s));
          }
          var u = new n(e, c, o, p);
          return u.updateExports(i, a), u;
        }
        var o = e('./lib/create-uniforms'),
          s = e('./lib/create-attributes'),
          p = e('./lib/reflect');
        (n.prototype.bind = function() {
          this.gl.useProgram(this.handle);
        }),
          (n.prototype.dispose = function() {
            var e = this.gl;
            e.deleteShader(this.vertexShader),
              e.deleteShader(this.fragmentShader),
              e.deleteProgram(this.handle);
          }),
          (n.prototype.updateExports = function(e, t) {
            var r = new Array(e.length),
              n = this.handle,
              a = this.gl,
              c = i.bind(void 0, a, n, r, e);
            c(),
              (this.types = { uniforms: p(e), attributes: p(t) }),
              (this.attributes = s(a, n, t, c)),
              Object.defineProperty(this, 'uniforms', o(a, n, e, r));
          }),
          (t.exports = a);
      },
      { './lib/create-attributes': 152, './lib/create-uniforms': 153, './lib/reflect': 154 },
    ],
    156: [
      function(e, t, r) {
        'use strict';
        function n(e) {
          (m = [
            e.LINEAR,
            e.NEAREST_MIPMAP_LINEAR,
            e.LINEAR_MIPMAP_NEAREST,
            e.LINEAR_MIPMAP_NEAREST,
          ]),
            (v = [
              e.NEAREST,
              e.LINEAR,
              e.NEAREST_MIPMAP_NEAREST,
              e.NEAREST_MIPMAP_LINEAR,
              e.LINEAR_MIPMAP_NEAREST,
              e.LINEAR_MIPMAP_LINEAR,
            ]),
            (y = [e.REPEAT, e.CLAMP_TO_EDGE, e.MIRRORED_REPEAT]);
        }
        function i(e) {
          return (
            ('undefined' != typeof HTMLCanvasElement && e instanceof HTMLCanvasElement) ||
            ('undefined' != typeof HTMLImageElement && e instanceof HTMLImageElement) ||
            ('undefined' != typeof HTMLVideoElement && e instanceof HTMLVideoElement) ||
            ('undefined' != typeof ImageData && e instanceof ImageData)
          );
        }
        function a(e, t, r) {
          var n = e.gl,
            i = n.getParameter(n.MAX_TEXTURE_SIZE);
          if (t < 0 || t > i || r < 0 || r > i)
            throw new Error('gl-texture2d: Invalid texture size');
          return (
            (e._shape = [t, r]),
            e.bind(),
            n.texImage2D(n.TEXTURE_2D, 0, e.format, t, r, 0, e.format, e.type, null),
            (e._mipLevels = [0]),
            e
          );
        }
        function o(e, t, r, n, i, a) {
          (this.gl = e),
            (this.handle = t),
            (this.format = i),
            (this.type = a),
            (this._shape = [r, n]),
            (this._mipLevels = [0]),
            (this._magFilter = e.NEAREST),
            (this._minFilter = e.NEAREST),
            (this._wrapS = e.CLAMP_TO_EDGE),
            (this._wrapT = e.CLAMP_TO_EDGE),
            (this._anisoSamples = 1);
          var o = this,
            s = [this._wrapS, this._wrapT];
          Object.defineProperties(s, [
            {
              get: function() {
                return o._wrapS;
              },
              set: function(e) {
                return (o.wrapS = e);
              },
            },
            {
              get: function() {
                return o._wrapT;
              },
              set: function(e) {
                return (o.wrapT = e);
              },
            },
          ]),
            (this._wrapVector = s);
          var p = [this._shape[0], this._shape[1]];
          Object.defineProperties(p, [
            {
              get: function() {
                return o._shape[0];
              },
              set: function(e) {
                return (o.width = e);
              },
            },
            {
              get: function() {
                return o._shape[1];
              },
              set: function(e) {
                return (o.height = e);
              },
            },
          ]),
            (this._shapeVector = p);
        }
        function s(e, t) {
          return 3 === e.length
            ? 1 === t[2] && t[1] === e[0] * e[2] && t[0] === e[2]
            : 1 === t[0] && t[1] === e[0];
        }
        function p(e, t, r, n, i, a, o, p) {
          var c = p.dtype,
            u = p.shape.slice();
          if (u.length < 2 || u.length > 3)
            throw new Error('gl-texture2d: Invalid ndarray, must be 2d or 3d');
          var g = 0,
            l = 0,
            h = s(u, p.stride.slice());
          'float32' === c
            ? (g = e.FLOAT)
            : 'float64' === c
            ? ((g = e.FLOAT), (h = !1), (c = 'float32'))
            : 'uint8' === c
            ? (g = e.UNSIGNED_BYTE)
            : ((g = e.UNSIGNED_BYTE), (h = !1), (c = 'uint8'));
          var m = 1;
          if (2 === u.length)
            (l = e.LUMINANCE),
              (u = [u[0], u[1], 1]),
              (p = f(p.data, u, [p.stride[0], p.stride[1], 1], p.offset));
          else {
            if (3 !== u.length) throw new Error('gl-texture2d: Invalid shape for texture');
            if (1 === u[2]) l = e.ALPHA;
            else if (2 === u[2]) l = e.LUMINANCE_ALPHA;
            else if (3 === u[2]) l = e.RGB;
            else {
              if (4 !== u[2]) throw new Error('gl-texture2d: Invalid shape for pixel coords');
              l = e.RGBA;
            }
            m = u[2];
          }
          if (
            ((l !== e.LUMINANCE && l !== e.ALPHA) ||
              (i !== e.LUMINANCE && i !== e.ALPHA) ||
              (l = i),
            l !== i)
          )
            throw new Error('gl-texture2d: Incompatible texture format for setPixels');
          var v = p.size,
            y = o.indexOf(n) < 0;
          if ((y && o.push(n), g === a && h))
            0 === p.offset && p.data.length === v
              ? y
                ? e.texImage2D(e.TEXTURE_2D, n, i, u[0], u[1], 0, i, a, p.data)
                : e.texSubImage2D(e.TEXTURE_2D, n, t, r, u[0], u[1], i, a, p.data)
              : y
              ? e.texImage2D(
                  e.TEXTURE_2D,
                  n,
                  i,
                  u[0],
                  u[1],
                  0,
                  i,
                  a,
                  p.data.subarray(p.offset, p.offset + v)
                )
              : e.texSubImage2D(
                  e.TEXTURE_2D,
                  n,
                  t,
                  r,
                  u[0],
                  u[1],
                  i,
                  a,
                  p.data.subarray(p.offset, p.offset + v)
                );
          else {
            var b;
            b = a === e.FLOAT ? d.mallocFloat32(v) : d.mallocUint8(v);
            var E = f(b, u, [u[2], u[2] * u[0], 1]);
            g === e.FLOAT && a === e.UNSIGNED_BYTE ? _(E, p) : j.assign(E, p),
              y
                ? e.texImage2D(e.TEXTURE_2D, n, i, u[0], u[1], 0, i, a, b.subarray(0, v))
                : e.texSubImage2D(e.TEXTURE_2D, n, t, r, u[0], u[1], i, a, b.subarray(0, v)),
              a === e.FLOAT ? d.freeFloat32(b) : d.freeUint8(b);
          }
        }
        function c(e) {
          var t = e.createTexture();
          return (
            e.bindTexture(e.TEXTURE_2D, t),
            e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.NEAREST),
            e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.NEAREST),
            e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE),
            e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE),
            t
          );
        }
        function u(e, t, r, n, i) {
          var a = e.getParameter(e.MAX_TEXTURE_SIZE);
          if (t < 0 || t > a || r < 0 || r > a)
            throw new Error('gl-texture2d: Invalid texture shape');
          if (i === e.FLOAT && !e.getExtension('OES_texture_float'))
            throw new Error('gl-texture2d: Floating point textures not supported on this platform');
          var s = c(e);
          return e.texImage2D(e.TEXTURE_2D, 0, n, t, r, 0, n, i, null), new o(e, s, t, r, n, i);
        }
        function g(e, t, r, n, i, a) {
          var s = c(e);
          return e.texImage2D(e.TEXTURE_2D, 0, i, i, a, t), new o(e, s, r, n, i, a);
        }
        function l(e, t) {
          var r = t.dtype,
            n = t.shape.slice(),
            i = e.getParameter(e.MAX_TEXTURE_SIZE);
          if (n[0] < 0 || n[0] > i || n[1] < 0 || n[1] > i)
            throw new Error('gl-texture2d: Invalid texture size');
          var a = s(n, t.stride.slice()),
            p = 0;
          'float32' === r
            ? (p = e.FLOAT)
            : 'float64' === r
            ? ((p = e.FLOAT), (a = !1), (r = 'float32'))
            : 'uint8' === r
            ? (p = e.UNSIGNED_BYTE)
            : ((p = e.UNSIGNED_BYTE), (a = !1), (r = 'uint8'));
          var u = 0;
          if (2 === n.length)
            (u = e.LUMINANCE),
              (n = [n[0], n[1], 1]),
              (t = f(t.data, n, [t.stride[0], t.stride[1], 1], t.offset));
          else {
            if (3 !== n.length) throw new Error('gl-texture2d: Invalid shape for texture');
            if (1 === n[2]) u = e.ALPHA;
            else if (2 === n[2]) u = e.LUMINANCE_ALPHA;
            else if (3 === n[2]) u = e.RGB;
            else {
              if (4 !== n[2]) throw new Error('gl-texture2d: Invalid shape for pixel coords');
              u = e.RGBA;
            }
          }
          p !== e.FLOAT || e.getExtension('OES_texture_float') || ((p = e.UNSIGNED_BYTE), (a = !1));
          var g,
            l,
            h = t.size;
          if (a)
            g =
              0 === t.offset && t.data.length === h
                ? t.data
                : t.data.subarray(t.offset, t.offset + h);
          else {
            var m = [n[2], n[2] * n[0], 1];
            l = d.malloc(h, r);
            var v = f(l, n, m, 0);
            ('float32' !== r && 'float64' !== r) || p !== e.UNSIGNED_BYTE
              ? j.assign(v, t)
              : _(v, t),
              (g = l.subarray(0, h));
          }
          var y = c(e);
          return (
            e.texImage2D(e.TEXTURE_2D, 0, u, n[0], n[1], 0, u, p, g),
            a || d.free(l),
            new o(e, y, n[0], n[1], u, p)
          );
        }
        function h(e) {
          if (arguments.length <= 1)
            throw new Error('gl-texture2d: Missing arguments for texture2d constructor');
          if ((m || n(e), 'number' == typeof arguments[1]))
            return u(
              e,
              arguments[1],
              arguments[2],
              arguments[3] || e.RGBA,
              arguments[4] || e.UNSIGNED_BYTE
            );
          if (Array.isArray(arguments[1]))
            return u(
              e,
              0 | arguments[1][0],
              0 | arguments[1][1],
              arguments[2] || e.RGBA,
              arguments[3] || e.UNSIGNED_BYTE
            );
          if ('object' == typeof arguments[1]) {
            var t = arguments[1],
              r = i(t) ? t : t.raw;
            if (r)
              return g(
                e,
                r,
                0 | t.width,
                0 | t.height,
                arguments[2] || e.RGBA,
                arguments[3] || e.UNSIGNED_BYTE
              );
            if (t.shape && t.data && t.stride) return l(e, t);
          }
          throw new Error('gl-texture2d: Invalid arguments for texture2d constructor');
        }
        var f = e('ndarray'),
          j = e('ndarray-ops'),
          d = e('typedarray-pool');
        t.exports = h;
        var m = null,
          v = null,
          y = null,
          _ = function(e, t) {
            j.muls(e, t, 255);
          },
          b = o.prototype;
        Object.defineProperties(b, {
          minFilter: {
            get: function() {
              return this._minFilter;
            },
            set: function(e) {
              this.bind();
              var t = this.gl;
              if (
                (this.type === t.FLOAT &&
                  m.indexOf(e) >= 0 &&
                  (t.getExtension('OES_texture_float_linear') || (e = t.NEAREST)),
                v.indexOf(e) < 0)
              )
                throw new Error('gl-texture2d: Unknown filter mode ' + e);
              return t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, e), (this._minFilter = e);
            },
          },
          magFilter: {
            get: function() {
              return this._magFilter;
            },
            set: function(e) {
              this.bind();
              var t = this.gl;
              if (
                (this.type === t.FLOAT &&
                  m.indexOf(e) >= 0 &&
                  (t.getExtension('OES_texture_float_linear') || (e = t.NEAREST)),
                v.indexOf(e) < 0)
              )
                throw new Error('gl-texture2d: Unknown filter mode ' + e);
              return t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, e), (this._magFilter = e);
            },
          },
          mipSamples: {
            get: function() {
              return this._anisoSamples;
            },
            set: function(e) {
              var t = this._anisoSamples;
              if (((this._anisoSamples = 0 | Math.max(e, 1)), t !== this._anisoSamples)) {
                var r = this.gl.getExtension('EXT_texture_filter_anisotropic');
                r &&
                  this.gl.texParameterf(
                    this.gl.TEXTURE_2D,
                    r.TEXTURE_MAX_ANISOTROPY_EXT,
                    this._anisoSamples
                  );
              }
              return this._anisoSamples;
            },
          },
          wrapS: {
            get: function() {
              return this._wrapS;
            },
            set: function(e) {
              if ((this.bind(), y.indexOf(e) < 0))
                throw new Error('gl-texture2d: Unknown wrap mode ' + e);
              return (
                this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, e),
                (this._wrapS = e)
              );
            },
          },
          wrapT: {
            get: function() {
              return this._wrapT;
            },
            set: function(e) {
              if ((this.bind(), y.indexOf(e) < 0))
                throw new Error('gl-texture2d: Unknown wrap mode ' + e);
              return (
                this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, e),
                (this._wrapT = e)
              );
            },
          },
          wrap: {
            get: function() {
              return this._wrapVector;
            },
            set: function(e) {
              if ((Array.isArray(e) || (e = [e, e]), 2 !== e.length))
                throw new Error('gl-texture2d: Must specify wrap mode for rows and columns');
              for (var t = 0; t < 2; ++t)
                if (y.indexOf(e[t]) < 0) throw new Error('gl-texture2d: Unknown wrap mode ' + e);
              (this._wrapS = e[0]), (this._wrapT = e[1]);
              var r = this.gl;
              return (
                this.bind(),
                r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_S, this._wrapS),
                r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_T, this._wrapT),
                e
              );
            },
          },
          shape: {
            get: function() {
              return this._shapeVector;
            },
            set: function(e) {
              if (Array.isArray(e)) {
                if (2 !== e.length) throw new Error('gl-texture2d: Invalid texture shape');
              } else e = [0 | e, 0 | e];
              return a(this, 0 | e[0], 0 | e[1]), [0 | e[0], 0 | e[1]];
            },
          },
          width: {
            get: function() {
              return this._shape[0];
            },
            set: function(e) {
              return (e = 0 | e), a(this, e, this._shape[1]), e;
            },
          },
          height: {
            get: function() {
              return this._shape[1];
            },
            set: function(e) {
              return (e = 0 | e), a(this, this._shape[0], e), e;
            },
          },
        }),
          (b.bind = function(e) {
            var t = this.gl;
            return (
              void 0 !== e && t.activeTexture(t.TEXTURE0 + (0 | e)),
              t.bindTexture(t.TEXTURE_2D, this.handle),
              void 0 !== e ? 0 | e : t.getParameter(t.ACTIVE_TEXTURE) - t.TEXTURE0
            );
          }),
          (b.dispose = function() {
            this.gl.deleteTexture(this.handle);
          }),
          (b.generateMipmap = function() {
            this.bind(), this.gl.generateMipmap(this.gl.TEXTURE_2D);
            for (var e = Math.min(this._shape[0], this._shape[1]), t = 0; e > 0; ++t, e >>>= 1)
              this._mipLevels.indexOf(t) < 0 && this._mipLevels.push(t);
          }),
          (b.setPixels = function(e, t, r, n) {
            var a = this.gl;
            this.bind(),
              Array.isArray(t)
                ? ((n = r), (r = 0 | t[1]), (t = 0 | t[0]))
                : ((t = t || 0), (r = r || 0)),
              (n = n || 0);
            var o = i(e) ? e : e.raw;
            if (o) {
              var s = this._mipLevels.indexOf(n) < 0;
              s
                ? (a.texImage2D(a.TEXTURE_2D, 0, this.format, this.format, this.type, o),
                  this._mipLevels.push(n))
                : a.texSubImage2D(a.TEXTURE_2D, n, t, r, this.format, this.type, o);
            } else {
              if (!(e.shape && e.stride && e.data))
                throw new Error('gl-texture2d: Unsupported data type');
              if (
                e.shape.length < 2 ||
                t + e.shape[1] > this._shape[1] >>> n ||
                r + e.shape[0] > this._shape[0] >>> n ||
                t < 0 ||
                r < 0
              )
                throw new Error('gl-texture2d: Texture dimensions are out of bounds');
              p(a, t, r, n, this.format, this.type, this._mipLevels, e);
            }
          });
      },
      { ndarray: 173, 'ndarray-ops': 172, 'typedarray-pool': 174 },
    ],
    157: [
      function(e, t, r) {
        'use strict';
        function n(e, t, r) {
          t ? t.bind() : e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, null);
          var n = 0 | e.getParameter(e.MAX_VERTEX_ATTRIBS);
          if (r) {
            if (r.length > n) throw new Error('gl-vao: Too many vertex attributes');
            for (var i = 0; i < r.length; ++i) {
              var a = r[i];
              if (a.buffer) {
                var o = a.buffer,
                  s = a.size || 4,
                  p = a.type || e.FLOAT,
                  c = !!a.normalized,
                  u = a.stride || 0,
                  g = a.offset || 0;
                o.bind(), e.enableVertexAttribArray(i), e.vertexAttribPointer(i, s, p, c, u, g);
              } else {
                if ('number' == typeof a) e.vertexAttrib1f(i, a);
                else if (1 === a.length) e.vertexAttrib1f(i, a[0]);
                else if (2 === a.length) e.vertexAttrib2f(i, a[0], a[1]);
                else if (3 === a.length) e.vertexAttrib3f(i, a[0], a[1], a[2]);
                else {
                  if (4 !== a.length) throw new Error('gl-vao: Invalid vertex attribute');
                  e.vertexAttrib4f(i, a[0], a[1], a[2], a[3]);
                }
                e.disableVertexAttribArray(i);
              }
            }
            for (; i < n; ++i) e.disableVertexAttribArray(i);
          } else {
            e.bindBuffer(e.ARRAY_BUFFER, null);
            for (var i = 0; i < n; ++i) e.disableVertexAttribArray(i);
          }
        }
        t.exports = n;
      },
      {},
    ],
    158: [
      function(e, t, r) {
        'use strict';
        function n(e) {
          (this.gl = e),
            (this._elements = null),
            (this._attributes = null),
            (this._elementsType = e.UNSIGNED_SHORT);
        }
        function i(e) {
          return new n(e);
        }
        var a = e('./do-bind.js');
        (n.prototype.bind = function() {
          a(this.gl, this._elements, this._attributes);
        }),
          (n.prototype.update = function(e, t, r) {
            (this._elements = t),
              (this._attributes = e),
              (this._elementsType = r || this.gl.UNSIGNED_SHORT);
          }),
          (n.prototype.dispose = function() {}),
          (n.prototype.unbind = function() {}),
          (n.prototype.draw = function(e, t, r) {
            r = r || 0;
            var n = this.gl;
            this._elements ? n.drawElements(e, t, this._elementsType, r) : n.drawArrays(e, r, t);
          }),
          (t.exports = i);
      },
      { './do-bind.js': 157 },
    ],
    159: [
      function(e, t, r) {
        'use strict';
        function n(e, t, r, n, i, a) {
          (this.location = e),
            (this.dimension = t),
            (this.a = r),
            (this.b = n),
            (this.c = i),
            (this.d = a);
        }
        function i(e, t, r) {
          (this.gl = e),
            (this._ext = t),
            (this.handle = r),
            (this._attribs = []),
            (this._useElements = !1),
            (this._elementsType = e.UNSIGNED_SHORT);
        }
        function a(e, t) {
          return new i(e, t, t.createVertexArrayOES());
        }
        var o = e('./do-bind.js');
        (n.prototype.bind = function(e) {
          switch (this.dimension) {
            case 1:
              e.vertexAttrib1f(this.location, this.a);
              break;
            case 2:
              e.vertexAttrib2f(this.location, this.a, this.b);
              break;
            case 3:
              e.vertexAttrib3f(this.location, this.a, this.b, this.c);
              break;
            case 4:
              e.vertexAttrib4f(this.location, this.a, this.b, this.c, this.d);
          }
        }),
          (i.prototype.bind = function() {
            this._ext.bindVertexArrayOES(this.handle);
            for (var e = 0; e < this._attribs.length; ++e) this._attribs[e].bind(this.gl);
          }),
          (i.prototype.unbind = function() {
            this._ext.bindVertexArrayOES(null);
          }),
          (i.prototype.dispose = function() {
            this._ext.deleteVertexArrayOES(this.handle);
          }),
          (i.prototype.update = function(e, t, r) {
            if ((this.bind(), o(this.gl, t, e), this.unbind(), (this._attribs.length = 0), e))
              for (var i = 0; i < e.length; ++i) {
                var a = e[i];
                'number' == typeof a
                  ? this._attribs.push(new n(i, 1, a))
                  : Array.isArray(a) &&
                    this._attribs.push(new n(i, a.length, a[0], a[1], a[2], a[3]));
              }
            (this._useElements = !!t), (this._elementsType = r || this.gl.UNSIGNED_SHORT);
          }),
          (i.prototype.draw = function(e, t, r) {
            r = r || 0;
            var n = this.gl;
            this._useElements ? n.drawElements(e, t, this._elementsType, r) : n.drawArrays(e, r, t);
          }),
          (t.exports = a);
      },
      { './do-bind.js': 157 },
    ],
    160: [
      function(e, t, r) {
        'use strict';
        function n(e) {
          (this.bindVertexArrayOES = e.bindVertexArray.bind(e)),
            (this.createVertexArrayOES = e.createVertexArray.bind(e)),
            (this.deleteVertexArrayOES = e.deleteVertexArray.bind(e));
        }
        function i(e, t, r, i) {
          var s,
            p = e.createVertexArray ? new n(e) : e.getExtension('OES_vertex_array_object');
          return (s = p ? a(e, p) : o(e)), s.update(t, r, i), s;
        }
        var a = e('./lib/vao-native.js'),
          o = e('./lib/vao-emulated.js');
        t.exports = i;
      },
      { './lib/vao-emulated.js': 158, './lib/vao-native.js': 159 },
    ],
    161: [
      function(e, t, r) {
        function n() {
          var e = new Float32Array(3);
          return (e[0] = 0), (e[1] = 0), (e[2] = 0), e;
        }
        t.exports = n;
      },
      {},
    ],
    162: [
      function(e, t, r) {
        function n(e, t, r) {
          var n = t[0],
            i = t[1],
            a = t[2],
            o = r[0],
            s = r[1],
            p = r[2];
          return (e[0] = i * p - a * s), (e[1] = a * o - n * p), (e[2] = n * s - i * o), e;
        }
        t.exports = n;
      },
      {},
    ],
    163: [
      function(e, t, r) {
        function n(e, t) {
          return e[0] * t[0] + e[1] * t[1] + e[2] * t[2];
        }
        t.exports = n;
      },
      {},
    ],
    164: [
      function(e, t, r) {
        function n(e, t, r) {
          var n = new Float32Array(3);
          return (n[0] = e), (n[1] = t), (n[2] = r), n;
        }
        t.exports = n;
      },
      {},
    ],
    165: [
      function(e, t, r) {
        function n(e) {
          var t = e[0],
            r = e[1],
            n = e[2];
          return Math.sqrt(t * t + r * r + n * n);
        }
        t.exports = n;
      },
      {},
    ],
    166: [
      function(e, t, r) {
        function n(e, t) {
          var r = t[0],
            n = t[1],
            i = t[2],
            a = r * r + n * n + i * i;
          return (
            a > 0 &&
              ((a = 1 / Math.sqrt(a)), (e[0] = t[0] * a), (e[1] = t[1] * a), (e[2] = t[2] * a)),
            e
          );
        }
        t.exports = n;
      },
      {},
    ],
    167: [
      function(e, t, r) {
        function n() {
          var e = new Float32Array(4);
          return (e[0] = 0), (e[1] = 0), (e[2] = 0), (e[3] = 0), e;
        }
        t.exports = n;
      },
      {},
    ],
    168: [
      function(e, t, r) {
        function n(e, t, r, n) {
          var i = new Float32Array(4);
          return (i[0] = e), (i[1] = t), (i[2] = r), (i[3] = n), i;
        }
        t.exports = n;
      },
      {},
    ],
    169: [
      function(e, t, r) {
        function n(e, t, r) {
          var n = t[0],
            i = t[1],
            a = t[2],
            o = t[3];
          return (
            (e[0] = r[0] * n + r[4] * i + r[8] * a + r[12] * o),
            (e[1] = r[1] * n + r[5] * i + r[9] * a + r[13] * o),
            (e[2] = r[2] * n + r[6] * i + r[10] * a + r[14] * o),
            (e[3] = r[3] * n + r[7] * i + r[11] * a + r[15] * o),
            e
          );
        }
        t.exports = n;
      },
      {},
    ],
    170: [
      function(e, t, r) {
        'use strict';
        function n(e) {
          for (var t = new Array(e), r = 0; r < e; ++r) t[r] = r;
          return t;
        }
        t.exports = n;
      },
      {},
    ],
    171: [
      function(e, t, r) {
        function n(e) {
          return (
            !!e.constructor &&
            'function' == typeof e.constructor.isBuffer &&
            e.constructor.isBuffer(e)
          );
        }
        function i(e) {
          return (
            'function' == typeof e.readFloatLE && 'function' == typeof e.slice && n(e.slice(0, 0))
          );
        }
        t.exports = function(e) {
          return null != e && (n(e) || i(e) || !!e._isBuffer);
        };
      },
      {},
    ],
    172: [
      function(e, t, r) {
        'use strict';
        function n(e) {
          if (!e) return s;
          for (var t = 0; t < e.args.length; ++t) {
            var r = e.args[t];
            0 === t
              ? (e.args[t] = { name: r, lvalue: !0, rvalue: !!e.rvalue, count: e.count || 1 })
              : (e.args[t] = { name: r, lvalue: !1, rvalue: !0, count: 1 });
          }
          return e.thisVars || (e.thisVars = []), e.localVars || (e.localVars = []), e;
        }
        function i(e) {
          return o({
            args: e.args,
            pre: n(e.pre),
            body: n(e.body),
            post: n(e.proc),
            funcName: e.funcName,
          });
        }
        function a(e) {
          for (var t = [], r = 0; r < e.args.length; ++r) t.push('a' + r);
          var n = new Function(
            'P',
            [
              'return function ',
              e.funcName,
              '_ndarrayops(',
              t.join(','),
              ') {P(',
              t.join(','),
              ');return a0}',
            ].join('')
          );
          return n(i(e));
        }
        var o = e('cwise-compiler'),
          s = { body: '', args: [], thisVars: [], localVars: [] },
          p = {
            add: '+',
            sub: '-',
            mul: '*',
            div: '/',
            mod: '%',
            band: '&',
            bor: '|',
            bxor: '^',
            lshift: '<<',
            rshift: '>>',
            rrshift: '>>>',
          };
        !(function() {
          for (var e in p) {
            var t = p[e];
            (r[e] = a({
              args: ['array', 'array', 'array'],
              body: { args: ['a', 'b', 'c'], body: 'a=b' + t + 'c' },
              funcName: e,
            })),
              (r[e + 'eq'] = a({
                args: ['array', 'array'],
                body: { args: ['a', 'b'], body: 'a' + t + '=b' },
                rvalue: !0,
                funcName: e + 'eq',
              })),
              (r[e + 's'] = a({
                args: ['array', 'array', 'scalar'],
                body: { args: ['a', 'b', 's'], body: 'a=b' + t + 's' },
                funcName: e + 's',
              })),
              (r[e + 'seq'] = a({
                args: ['array', 'scalar'],
                body: { args: ['a', 's'], body: 'a' + t + '=s' },
                rvalue: !0,
                funcName: e + 'seq',
              }));
          }
        })();
        var c = { not: '!', bnot: '~', neg: '-', recip: '1.0/' };
        !(function() {
          for (var e in c) {
            var t = c[e];
            (r[e] = a({
              args: ['array', 'array'],
              body: { args: ['a', 'b'], body: 'a=' + t + 'b' },
              funcName: e,
            })),
              (r[e + 'eq'] = a({
                args: ['array'],
                body: { args: ['a'], body: 'a=' + t + 'a' },
                rvalue: !0,
                count: 2,
                funcName: e + 'eq',
              }));
          }
        })();
        var u = {
          and: '&&',
          or: '||',
          eq: '===',
          neq: '!==',
          lt: '<',
          gt: '>',
          leq: '<=',
          geq: '>=',
        };
        !(function() {
          for (var e in u) {
            var t = u[e];
            (r[e] = a({
              args: ['array', 'array', 'array'],
              body: { args: ['a', 'b', 'c'], body: 'a=b' + t + 'c' },
              funcName: e,
            })),
              (r[e + 's'] = a({
                args: ['array', 'array', 'scalar'],
                body: { args: ['a', 'b', 's'], body: 'a=b' + t + 's' },
                funcName: e + 's',
              })),
              (r[e + 'eq'] = a({
                args: ['array', 'array'],
                body: { args: ['a', 'b'], body: 'a=a' + t + 'b' },
                rvalue: !0,
                count: 2,
                funcName: e + 'eq',
              })),
              (r[e + 'seq'] = a({
                args: ['array', 'scalar'],
                body: { args: ['a', 's'], body: 'a=a' + t + 's' },
                rvalue: !0,
                count: 2,
                funcName: e + 'seq',
              }));
          }
        })();
        var g = [
          'abs',
          'acos',
          'asin',
          'atan',
          'ceil',
          'cos',
          'exp',
          'floor',
          'log',
          'round',
          'sin',
          'sqrt',
          'tan',
        ];
        !(function() {
          for (var e = 0; e < g.length; ++e) {
            var t = g[e];
            (r[t] = a({
              args: ['array', 'array'],
              pre: { args: [], body: 'this_f=Math.' + t, thisVars: ['this_f'] },
              body: { args: ['a', 'b'], body: 'a=this_f(b)', thisVars: ['this_f'] },
              funcName: t,
            })),
              (r[t + 'eq'] = a({
                args: ['array'],
                pre: { args: [], body: 'this_f=Math.' + t, thisVars: ['this_f'] },
                body: { args: ['a'], body: 'a=this_f(a)', thisVars: ['this_f'] },
                rvalue: !0,
                count: 2,
                funcName: t + 'eq',
              }));
          }
        })();
        var l = ['max', 'min', 'atan2', 'pow'];
        !(function() {
          for (var e = 0; e < l.length; ++e) {
            var t = l[e];
            (r[t] = a({
              args: ['array', 'array', 'array'],
              pre: { args: [], body: 'this_f=Math.' + t, thisVars: ['this_f'] },
              body: { args: ['a', 'b', 'c'], body: 'a=this_f(b,c)', thisVars: ['this_f'] },
              funcName: t,
            })),
              (r[t + 's'] = a({
                args: ['array', 'array', 'scalar'],
                pre: { args: [], body: 'this_f=Math.' + t, thisVars: ['this_f'] },
                body: { args: ['a', 'b', 'c'], body: 'a=this_f(b,c)', thisVars: ['this_f'] },
                funcName: t + 's',
              })),
              (r[t + 'eq'] = a({
                args: ['array', 'array'],
                pre: { args: [], body: 'this_f=Math.' + t, thisVars: ['this_f'] },
                body: { args: ['a', 'b'], body: 'a=this_f(a,b)', thisVars: ['this_f'] },
                rvalue: !0,
                count: 2,
                funcName: t + 'eq',
              })),
              (r[t + 'seq'] = a({
                args: ['array', 'scalar'],
                pre: { args: [], body: 'this_f=Math.' + t, thisVars: ['this_f'] },
                body: { args: ['a', 'b'], body: 'a=this_f(a,b)', thisVars: ['this_f'] },
                rvalue: !0,
                count: 2,
                funcName: t + 'seq',
              }));
          }
        })();
        var h = ['atan2', 'pow'];
        !(function() {
          for (var e = 0; e < h.length; ++e) {
            var t = h[e];
            (r[t + 'op'] = a({
              args: ['array', 'array', 'array'],
              pre: { args: [], body: 'this_f=Math.' + t, thisVars: ['this_f'] },
              body: { args: ['a', 'b', 'c'], body: 'a=this_f(c,b)', thisVars: ['this_f'] },
              funcName: t + 'op',
            })),
              (r[t + 'ops'] = a({
                args: ['array', 'array', 'scalar'],
                pre: { args: [], body: 'this_f=Math.' + t, thisVars: ['this_f'] },
                body: { args: ['a', 'b', 'c'], body: 'a=this_f(c,b)', thisVars: ['this_f'] },
                funcName: t + 'ops',
              })),
              (r[t + 'opeq'] = a({
                args: ['array', 'array'],
                pre: { args: [], body: 'this_f=Math.' + t, thisVars: ['this_f'] },
                body: { args: ['a', 'b'], body: 'a=this_f(b,a)', thisVars: ['this_f'] },
                rvalue: !0,
                count: 2,
                funcName: t + 'opeq',
              })),
              (r[t + 'opseq'] = a({
                args: ['array', 'scalar'],
                pre: { args: [], body: 'this_f=Math.' + t, thisVars: ['this_f'] },
                body: { args: ['a', 'b'], body: 'a=this_f(b,a)', thisVars: ['this_f'] },
                rvalue: !0,
                count: 2,
                funcName: t + 'opseq',
              }));
          }
        })(),
          (r.any = o({
            args: ['array'],
            pre: s,
            body: {
              args: [{ name: 'a', lvalue: !1, rvalue: !0, count: 1 }],
              body: 'if(a){return true}',
              localVars: [],
              thisVars: [],
            },
            post: { args: [], localVars: [], thisVars: [], body: 'return false' },
            funcName: 'any',
          })),
          (r.all = o({
            args: ['array'],
            pre: s,
            body: {
              args: [{ name: 'x', lvalue: !1, rvalue: !0, count: 1 }],
              body: 'if(!x){return false}',
              localVars: [],
              thisVars: [],
            },
            post: { args: [], localVars: [], thisVars: [], body: 'return true' },
            funcName: 'all',
          })),
          (r.sum = o({
            args: ['array'],
            pre: { args: [], localVars: [], thisVars: ['this_s'], body: 'this_s=0' },
            body: {
              args: [{ name: 'a', lvalue: !1, rvalue: !0, count: 1 }],
              body: 'this_s+=a',
              localVars: [],
              thisVars: ['this_s'],
            },
            post: { args: [], localVars: [], thisVars: ['this_s'], body: 'return this_s' },
            funcName: 'sum',
          })),
          (r.prod = o({
            args: ['array'],
            pre: { args: [], localVars: [], thisVars: ['this_s'], body: 'this_s=1' },
            body: {
              args: [{ name: 'a', lvalue: !1, rvalue: !0, count: 1 }],
              body: 'this_s*=a',
              localVars: [],
              thisVars: ['this_s'],
            },
            post: { args: [], localVars: [], thisVars: ['this_s'], body: 'return this_s' },
            funcName: 'prod',
          })),
          (r.norm2squared = o({
            args: ['array'],
            pre: { args: [], localVars: [], thisVars: ['this_s'], body: 'this_s=0' },
            body: {
              args: [{ name: 'a', lvalue: !1, rvalue: !0, count: 2 }],
              body: 'this_s+=a*a',
              localVars: [],
              thisVars: ['this_s'],
            },
            post: { args: [], localVars: [], thisVars: ['this_s'], body: 'return this_s' },
            funcName: 'norm2squared',
          })),
          (r.norm2 = o({
            args: ['array'],
            pre: { args: [], localVars: [], thisVars: ['this_s'], body: 'this_s=0' },
            body: {
              args: [{ name: 'a', lvalue: !1, rvalue: !0, count: 2 }],
              body: 'this_s+=a*a',
              localVars: [],
              thisVars: ['this_s'],
            },
            post: {
              args: [],
              localVars: [],
              thisVars: ['this_s'],
              body: 'return Math.sqrt(this_s)',
            },
            funcName: 'norm2',
          })),
          (r.norminf = o({
            args: ['array'],
            pre: { args: [], localVars: [], thisVars: ['this_s'], body: 'this_s=0' },
            body: {
              args: [{ name: 'a', lvalue: !1, rvalue: !0, count: 4 }],
              body: 'if(-a>this_s){this_s=-a}else if(a>this_s){this_s=a}',
              localVars: [],
              thisVars: ['this_s'],
            },
            post: { args: [], localVars: [], thisVars: ['this_s'], body: 'return this_s' },
            funcName: 'norminf',
          })),
          (r.norm1 = o({
            args: ['array'],
            pre: { args: [], localVars: [], thisVars: ['this_s'], body: 'this_s=0' },
            body: {
              args: [{ name: 'a', lvalue: !1, rvalue: !0, count: 3 }],
              body: 'this_s+=a<0?-a:a',
              localVars: [],
              thisVars: ['this_s'],
            },
            post: { args: [], localVars: [], thisVars: ['this_s'], body: 'return this_s' },
            funcName: 'norm1',
          })),
          (r.sup = o({
            args: ['array'],
            pre: { body: 'this_h=-Infinity', args: [], thisVars: ['this_h'], localVars: [] },
            body: {
              body: 'if(_inline_1_arg0_>this_h)this_h=_inline_1_arg0_',
              args: [{ name: '_inline_1_arg0_', lvalue: !1, rvalue: !0, count: 2 }],
              thisVars: ['this_h'],
              localVars: [],
            },
            post: { body: 'return this_h', args: [], thisVars: ['this_h'], localVars: [] },
          })),
          (r.inf = o({
            args: ['array'],
            pre: { body: 'this_h=Infinity', args: [], thisVars: ['this_h'], localVars: [] },
            body: {
              body: 'if(_inline_1_arg0_<this_h)this_h=_inline_1_arg0_',
              args: [{ name: '_inline_1_arg0_', lvalue: !1, rvalue: !0, count: 2 }],
              thisVars: ['this_h'],
              localVars: [],
            },
            post: { body: 'return this_h', args: [], thisVars: ['this_h'], localVars: [] },
          })),
          (r.argmin = o({
            args: ['index', 'array', 'shape'],
            pre: {
              body: '{this_v=Infinity;this_i=_inline_0_arg2_.slice(0)}',
              args: [
                { name: '_inline_0_arg0_', lvalue: !1, rvalue: !1, count: 0 },
                { name: '_inline_0_arg1_', lvalue: !1, rvalue: !1, count: 0 },
                { name: '_inline_0_arg2_', lvalue: !1, rvalue: !0, count: 1 },
              ],
              thisVars: ['this_i', 'this_v'],
              localVars: [],
            },
            body: {
              body:
                '{if(_inline_1_arg1_<this_v){this_v=_inline_1_arg1_;for(var _inline_1_k=0;_inline_1_k<_inline_1_arg0_.length;++_inline_1_k){this_i[_inline_1_k]=_inline_1_arg0_[_inline_1_k]}}}',
              args: [
                { name: '_inline_1_arg0_', lvalue: !1, rvalue: !0, count: 2 },
                { name: '_inline_1_arg1_', lvalue: !1, rvalue: !0, count: 2 },
              ],
              thisVars: ['this_i', 'this_v'],
              localVars: ['_inline_1_k'],
            },
            post: { body: '{return this_i}', args: [], thisVars: ['this_i'], localVars: [] },
          })),
          (r.argmax = o({
            args: ['index', 'array', 'shape'],
            pre: {
              body: '{this_v=-Infinity;this_i=_inline_0_arg2_.slice(0)}',
              args: [
                { name: '_inline_0_arg0_', lvalue: !1, rvalue: !1, count: 0 },
                { name: '_inline_0_arg1_', lvalue: !1, rvalue: !1, count: 0 },
                { name: '_inline_0_arg2_', lvalue: !1, rvalue: !0, count: 1 },
              ],
              thisVars: ['this_i', 'this_v'],
              localVars: [],
            },
            body: {
              body:
                '{if(_inline_1_arg1_>this_v){this_v=_inline_1_arg1_;for(var _inline_1_k=0;_inline_1_k<_inline_1_arg0_.length;++_inline_1_k){this_i[_inline_1_k]=_inline_1_arg0_[_inline_1_k]}}}',
              args: [
                { name: '_inline_1_arg0_', lvalue: !1, rvalue: !0, count: 2 },
                { name: '_inline_1_arg1_', lvalue: !1, rvalue: !0, count: 2 },
              ],
              thisVars: ['this_i', 'this_v'],
              localVars: ['_inline_1_k'],
            },
            post: { body: '{return this_i}', args: [], thisVars: ['this_i'], localVars: [] },
          })),
          (r.random = a({
            args: ['array'],
            pre: { args: [], body: 'this_f=Math.random', thisVars: ['this_f'] },
            body: { args: ['a'], body: 'a=this_f()', thisVars: ['this_f'] },
            funcName: 'random',
          })),
          (r.assign = a({
            args: ['array', 'array'],
            body: { args: ['a', 'b'], body: 'a=b' },
            funcName: 'assign',
          })),
          (r.assigns = a({
            args: ['array', 'scalar'],
            body: { args: ['a', 'b'], body: 'a=b' },
            funcName: 'assigns',
          })),
          (r.equals = o({
            args: ['array', 'array'],
            pre: s,
            body: {
              args: [
                { name: 'x', lvalue: !1, rvalue: !0, count: 1 },
                { name: 'y', lvalue: !1, rvalue: !0, count: 1 },
              ],
              body: 'if(x!==y){return false}',
              localVars: [],
              thisVars: [],
            },
            post: { args: [], localVars: [], thisVars: [], body: 'return true' },
            funcName: 'equals',
          }));
      },
      { 'cwise-compiler': 139 },
    ],
    173: [
      function(e, t, r) {
        function n(e, t) {
          return e[0] - t[0];
        }
        function i() {
          var e,
            t = this.stride,
            r = new Array(t.length);
          for (e = 0; e < r.length; ++e) r[e] = [Math.abs(t[e]), e];
          r.sort(n);
          var i = new Array(r.length);
          for (e = 0; e < i.length; ++e) i[e] = r[e][1];
          return i;
        }
        function a(e, t) {
          var r = ['View', t, 'd', e].join('');
          t < 0 && (r = 'View_Nil' + e);
          var n = 'generic' === e;
          if (t === -1) {
            var a =
                'function ' +
                r +
                '(a){this.data=a;};var proto=' +
                r +
                ".prototype;proto.dtype='" +
                e +
                "';proto.index=function(){return -1};proto.size=0;proto.dimension=-1;proto.shape=proto.stride=proto.order=[];proto.lo=proto.hi=proto.transpose=proto.step=function(){return new " +
                r +
                '(this.data);};proto.get=proto.set=function(){};proto.pick=function(){return null};return function construct_' +
                r +
                '(a){return new ' +
                r +
                '(a);}',
              o = new Function(a);
            return o();
          }
          if (0 === t) {
            var a =
                'function ' +
                r +
                '(a,d) {this.data = a;this.offset = d};var proto=' +
                r +
                ".prototype;proto.dtype='" +
                e +
                "';proto.index=function(){return this.offset};proto.dimension=0;proto.size=1;proto.shape=proto.stride=proto.order=[];proto.lo=proto.hi=proto.transpose=proto.step=function " +
                r +
                '_copy() {return new ' +
                r +
                '(this.data,this.offset)};proto.pick=function ' +
                r +
                '_pick(){return TrivialArray(this.data);};proto.valueOf=proto.get=function ' +
                r +
                '_get(){return ' +
                (n ? 'this.data.get(this.offset)' : 'this.data[this.offset]') +
                '};proto.set=function ' +
                r +
                '_set(v){return ' +
                (n ? 'this.data.set(this.offset,v)' : 'this.data[this.offset]=v') +
                '};return function construct_' +
                r +
                '(a,b,c,d){return new ' +
                r +
                '(a,d)}',
              o = new Function('TrivialArray', a);
            return o(g[e][0]);
          }
          var a = ["'use strict'"],
            s = p(t),
            c = s.map(function(e) {
              return 'i' + e;
            }),
            u =
              'this.offset+' +
              s
                .map(function(e) {
                  return 'this.stride[' + e + ']*i' + e;
                })
                .join('+'),
            l = s
              .map(function(e) {
                return 'b' + e;
              })
              .join(','),
            h = s
              .map(function(e) {
                return 'c' + e;
              })
              .join(',');
          a.push(
            'function ' + r + '(a,' + l + ',' + h + ',d){this.data=a',
            'this.shape=[' + l + ']',
            'this.stride=[' + h + ']',
            'this.offset=d|0}',
            'var proto=' + r + '.prototype',
            "proto.dtype='" + e + "'",
            'proto.dimension=' + t
          ),
            a.push(
              "Object.defineProperty(proto,'size',{get:function " +
                r +
                '_size(){return ' +
                s
                  .map(function(e) {
                    return 'this.shape[' + e + ']';
                  })
                  .join('*'),
              '}})'
            ),
            1 === t
              ? a.push('proto.order=[0]')
              : (a.push("Object.defineProperty(proto,'order',{get:"),
                t < 4
                  ? (a.push('function ' + r + '_order(){'),
                    2 === t
                      ? a.push(
                          'return (Math.abs(this.stride[0])>Math.abs(this.stride[1]))?[1,0]:[0,1]}})'
                        )
                      : 3 === t &&
                        a.push(
                          'var s0=Math.abs(this.stride[0]),s1=Math.abs(this.stride[1]),s2=Math.abs(this.stride[2]);if(s0>s1){if(s1>s2){return [2,1,0];}else if(s0>s2){return [1,2,0];}else{return [1,0,2];}}else if(s0>s2){return [2,0,1];}else if(s2>s1){return [0,1,2];}else{return [0,2,1];}}})'
                        ))
                  : a.push('ORDER})')),
            a.push('proto.set=function ' + r + '_set(' + c.join(',') + ',v){'),
            n
              ? a.push('return this.data.set(' + u + ',v)}')
              : a.push('return this.data[' + u + ']=v}'),
            a.push('proto.get=function ' + r + '_get(' + c.join(',') + '){'),
            n ? a.push('return this.data.get(' + u + ')}') : a.push('return this.data[' + u + ']}'),
            a.push('proto.index=function ' + r + '_index(', c.join(), '){return ' + u + '}'),
            a.push(
              'proto.hi=function ' +
                r +
                '_hi(' +
                c.join(',') +
                '){return new ' +
                r +
                '(this.data,' +
                s
                  .map(function(e) {
                    return [
                      '(typeof i',
                      e,
                      "!=='number'||i",
                      e,
                      '<0)?this.shape[',
                      e,
                      ']:i',
                      e,
                      '|0',
                    ].join('');
                  })
                  .join(',') +
                ',' +
                s
                  .map(function(e) {
                    return 'this.stride[' + e + ']';
                  })
                  .join(',') +
                ',this.offset)}'
            );
          var f = s.map(function(e) {
              return 'a' + e + '=this.shape[' + e + ']';
            }),
            j = s.map(function(e) {
              return 'c' + e + '=this.stride[' + e + ']';
            });
          a.push(
            'proto.lo=function ' +
              r +
              '_lo(' +
              c.join(',') +
              '){var b=this.offset,d=0,' +
              f.join(',') +
              ',' +
              j.join(',')
          );
          for (var d = 0; d < t; ++d)
            a.push(
              'if(typeof i' +
                d +
                "==='number'&&i" +
                d +
                '>=0){d=i' +
                d +
                '|0;b+=c' +
                d +
                '*d;a' +
                d +
                '-=d}'
            );
          a.push(
            'return new ' +
              r +
              '(this.data,' +
              s
                .map(function(e) {
                  return 'a' + e;
                })
                .join(',') +
              ',' +
              s
                .map(function(e) {
                  return 'c' + e;
                })
                .join(',') +
              ',b)}'
          ),
            a.push(
              'proto.step=function ' +
                r +
                '_step(' +
                c.join(',') +
                '){var ' +
                s
                  .map(function(e) {
                    return 'a' + e + '=this.shape[' + e + ']';
                  })
                  .join(',') +
                ',' +
                s
                  .map(function(e) {
                    return 'b' + e + '=this.stride[' + e + ']';
                  })
                  .join(',') +
                ',c=this.offset,d=0,ceil=Math.ceil'
            );
          for (var d = 0; d < t; ++d)
            a.push(
              'if(typeof i' +
                d +
                "==='number'){d=i" +
                d +
                '|0;if(d<0){c+=b' +
                d +
                '*(a' +
                d +
                '-1);a' +
                d +
                '=ceil(-a' +
                d +
                '/d)}else{a' +
                d +
                '=ceil(a' +
                d +
                '/d)}b' +
                d +
                '*=d}'
            );
          a.push(
            'return new ' +
              r +
              '(this.data,' +
              s
                .map(function(e) {
                  return 'a' + e;
                })
                .join(',') +
              ',' +
              s
                .map(function(e) {
                  return 'b' + e;
                })
                .join(',') +
              ',c)}'
          );
          for (var m = new Array(t), v = new Array(t), d = 0; d < t; ++d)
            (m[d] = 'a[i' + d + ']'), (v[d] = 'b[i' + d + ']');
          a.push(
            'proto.transpose=function ' +
              r +
              '_transpose(' +
              c +
              '){' +
              c
                .map(function(e, t) {
                  return e + '=(' + e + '===undefined?' + t + ':' + e + '|0)';
                })
                .join(';'),
            'var a=this.shape,b=this.stride;return new ' +
              r +
              '(this.data,' +
              m.join(',') +
              ',' +
              v.join(',') +
              ',this.offset)}'
          ),
            a.push('proto.pick=function ' + r + '_pick(' + c + '){var a=[],b=[],c=this.offset');
          for (var d = 0; d < t; ++d)
            a.push(
              'if(typeof i' +
                d +
                "==='number'&&i" +
                d +
                '>=0){c=(c+this.stride[' +
                d +
                ']*i' +
                d +
                ')|0}else{a.push(this.shape[' +
                d +
                ']);b.push(this.stride[' +
                d +
                '])}'
            );
          a.push('var ctor=CTOR_LIST[a.length+1];return ctor(this.data,a,b,c)}'),
            a.push(
              'return function construct_' +
                r +
                '(data,shape,stride,offset){return new ' +
                r +
                '(data,' +
                s
                  .map(function(e) {
                    return 'shape[' + e + ']';
                  })
                  .join(',') +
                ',' +
                s
                  .map(function(e) {
                    return 'stride[' + e + ']';
                  })
                  .join(',') +
                ',offset)}'
            );
          var o = new Function('CTOR_LIST', 'ORDER', a.join('\n'));
          return o(g[e], i);
        }
        function o(e) {
          if (c(e)) return 'buffer';
          if (u)
            switch (Object.prototype.toString.call(e)) {
              case '[object Float64Array]':
                return 'float64';
              case '[object Float32Array]':
                return 'float32';
              case '[object Int8Array]':
                return 'int8';
              case '[object Int16Array]':
                return 'int16';
              case '[object Int32Array]':
                return 'int32';
              case '[object Uint8Array]':
                return 'uint8';
              case '[object Uint16Array]':
                return 'uint16';
              case '[object Uint32Array]':
                return 'uint32';
              case '[object Uint8ClampedArray]':
                return 'uint8_clamped';
            }
          return Array.isArray(e) ? 'array' : 'generic';
        }
        function s(e, t, r, n) {
          if (void 0 === e) {
            var i = g.array[0];
            return i([]);
          }
          'number' == typeof e && (e = [e]), void 0 === t && (t = [e.length]);
          var s = t.length;
          if (void 0 === r) {
            r = new Array(s);
            for (var p = s - 1, c = 1; p >= 0; --p) (r[p] = c), (c *= t[p]);
          }
          if (void 0 === n) {
            n = 0;
            for (var p = 0; p < s; ++p) r[p] < 0 && (n -= (t[p] - 1) * r[p]);
          }
          for (var u = o(e), l = g[u]; l.length <= s + 1; ) l.push(a(u, l.length - 1));
          var i = l[s + 1];
          return i(e, t, r, n);
        }
        var p = e('iota-array'),
          c = e('is-buffer'),
          u = 'undefined' != typeof Float64Array,
          g = {
            float32: [],
            float64: [],
            int8: [],
            int16: [],
            int32: [],
            uint8: [],
            uint16: [],
            uint32: [],
            array: [],
            uint8_clamped: [],
            buffer: [],
            generic: [],
          };
        t.exports = s;
      },
      { 'iota-array': 170, 'is-buffer': 171 },
    ],
    174: [
      function(e, t, r) {
        (function(t, n) {
          'use strict';
          function i(e) {
            if (e) {
              var t = e.length || e.byteLength,
                r = v.log2(t);
              E[r].push(e);
            }
          }
          function a(e) {
            i(e.buffer);
          }
          function o(e) {
            var e = v.nextPow2(e),
              t = v.log2(e),
              r = E[t];
            return r.length > 0 ? r.pop() : new ArrayBuffer(e);
          }
          function s(e) {
            return new Uint8Array(o(e), 0, e);
          }
          function p(e) {
            return new Uint16Array(o(2 * e), 0, e);
          }
          function c(e) {
            return new Uint32Array(o(4 * e), 0, e);
          }
          function u(e) {
            return new Int8Array(o(e), 0, e);
          }
          function g(e) {
            return new Int16Array(o(2 * e), 0, e);
          }
          function l(e) {
            return new Int32Array(o(4 * e), 0, e);
          }
          function h(e) {
            return new Float32Array(o(4 * e), 0, e);
          }
          function f(e) {
            return new Float64Array(o(8 * e), 0, e);
          }
          function j(e) {
            return _ ? new Uint8ClampedArray(o(e), 0, e) : s(e);
          }
          function d(e) {
            return new DataView(o(e), 0, e);
          }
          function m(e) {
            e = v.nextPow2(e);
            var t = v.log2(e),
              r = w[t];
            return r.length > 0 ? r.pop() : new n(e);
          }
          var v = e('bit-twiddle'),
            y = e('dup');
          t.__TYPEDARRAY_POOL ||
            (t.__TYPEDARRAY_POOL = {
              UINT8: y([32, 0]),
              UINT16: y([32, 0]),
              UINT32: y([32, 0]),
              INT8: y([32, 0]),
              INT16: y([32, 0]),
              INT32: y([32, 0]),
              FLOAT: y([32, 0]),
              DOUBLE: y([32, 0]),
              DATA: y([32, 0]),
              UINT8C: y([32, 0]),
              BUFFER: y([32, 0]),
            });
          var _ = 'undefined' != typeof Uint8ClampedArray,
            b = t.__TYPEDARRAY_POOL;
          b.UINT8C || (b.UINT8C = y([32, 0])), b.BUFFER || (b.BUFFER = y([32, 0]));
          var E = b.DATA,
            w = b.BUFFER;
          (r.free = function(e) {
            if (n.isBuffer(e)) w[v.log2(e.length)].push(e);
            else {
              if (
                ('[object ArrayBuffer]' !== Object.prototype.toString.call(e) && (e = e.buffer), !e)
              )
                return;
              var t = e.length || e.byteLength,
                r = 0 | v.log2(t);
              E[r].push(e);
            }
          }),
            (r.freeUint8 = r.freeUint16 = r.freeUint32 = r.freeInt8 = r.freeInt16 = r.freeInt32 = r.freeFloat32 = r.freeFloat = r.freeFloat64 = r.freeDouble = r.freeUint8Clamped = r.freeDataView = a),
            (r.freeArrayBuffer = i),
            (r.freeBuffer = function(e) {
              w[v.log2(e.length)].push(e);
            }),
            (r.malloc = function(e, t) {
              if (void 0 === t || 'arraybuffer' === t) return o(e);
              switch (t) {
                case 'uint8':
                  return s(e);
                case 'uint16':
                  return p(e);
                case 'uint32':
                  return c(e);
                case 'int8':
                  return u(e);
                case 'int16':
                  return g(e);
                case 'int32':
                  return l(e);
                case 'float':
                case 'float32':
                  return h(e);
                case 'double':
                case 'float64':
                  return f(e);
                case 'uint8_clamped':
                  return j(e);
                case 'buffer':
                  return m(e);
                case 'data':
                case 'dataview':
                  return d(e);
                default:
                  return null;
              }
              return null;
            }),
            (r.mallocArrayBuffer = o),
            (r.mallocUint8 = s),
            (r.mallocUint16 = p),
            (r.mallocUint32 = c),
            (r.mallocInt8 = u),
            (r.mallocInt16 = g),
            (r.mallocInt32 = l),
            (r.mallocFloat32 = r.mallocFloat = h),
            (r.mallocFloat64 = r.mallocDouble = f),
            (r.mallocUint8Clamped = j),
            (r.mallocDataView = d),
            (r.mallocBuffer = m),
            (r.clearCache = function() {
              for (var e = 0; e < 32; ++e)
                (b.UINT8[e].length = 0),
                  (b.UINT16[e].length = 0),
                  (b.UINT32[e].length = 0),
                  (b.INT8[e].length = 0),
                  (b.INT16[e].length = 0),
                  (b.INT32[e].length = 0),
                  (b.FLOAT[e].length = 0),
                  (b.DOUBLE[e].length = 0),
                  (b.UINT8C[e].length = 0),
                  (E[e].length = 0),
                  (w[e].length = 0);
            });
        }.call(
          this,
          'undefined' != typeof global
            ? global
            : 'undefined' != typeof self
            ? self
            : 'undefined' != typeof window
            ? window
            : {},
          e('buffer').Buffer
        ));
      },
      { 'bit-twiddle': 138, buffer: 39, dup: 142 },
    ],
    175: [
      function(e, t, r) {
        'use strict';
        function n(e, t) {
          for (var r = 1, n = e.length, i = e[0], a = e[0], o = 1; o < n; ++o)
            if (((a = i), (i = e[o]), t(i, a))) {
              if (o === r) {
                r++;
                continue;
              }
              e[r++] = i;
            }
          return (e.length = r), e;
        }
        function i(e) {
          for (var t = 1, r = e.length, n = e[0], i = e[0], a = 1; a < r; ++a, i = n)
            if (((i = n), (n = e[a]), n !== i)) {
              if (a === t) {
                t++;
                continue;
              }
              e[t++] = n;
            }
          return (e.length = t), e;
        }
        function a(e, t, r) {
          return 0 === e.length ? e : t ? (r || e.sort(t), n(e, t)) : (r || e.sort(), i(e));
        }
        t.exports = a;
      },
      {},
    ],
    176: [
      function(e, t, r) {
        !(function() {
          'use strict';
          function e(t) {
            t.permitHostObjects___ && t.permitHostObjects___(e);
          }
          function r(e) {
            return !(e.substr(0, h.length) == h && '___' === e.substr(e.length - 3));
          }
          function n(e) {
            if (e !== Object(e)) throw new TypeError('Not an object: ' + e);
            var t = e[f];
            if (t && t.key === e) return t;
            if (l(e)) {
              t = { key: e };
              try {
                return g(e, f, { value: t, writable: !1, enumerable: !1, configurable: !1 }), t;
              } catch (r) {
                return;
              }
            }
          }
          function i(e) {
            return (e.prototype = null), Object.freeze(e);
          }
          function a() {
            v ||
              'undefined' == typeof console ||
              ((v = !0),
              console.warn(
                'WeakMap should be invoked as new WeakMap(), not WeakMap(). This will be an error in the future.'
              ));
          }
          if ('undefined' == typeof ses || !ses.ok || ses.ok()) {
            'undefined' != typeof ses && (ses.weakMapPermitHostObjects = e);
            var o = !1;
            if ('function' == typeof WeakMap) {
              var s = WeakMap;
              if ('undefined' != typeof navigator && /Firefox/.test(navigator.userAgent));
              else {
                var p = new s(),
                  c = Object.freeze({});
                if ((p.set(c, 1), 1 === p.get(c))) return void (t.exports = WeakMap);
                o = !0;
              }
            }
            var u = (Object.prototype.hasOwnProperty, Object.getOwnPropertyNames),
              g = Object.defineProperty,
              l = Object.isExtensible,
              h = 'weakmap:',
              f = h + 'ident:' + Math.random() + '___';
            if (
              'undefined' != typeof crypto &&
              'function' == typeof crypto.getRandomValues &&
              'function' == typeof ArrayBuffer &&
              'function' == typeof Uint8Array
            ) {
              var j = new ArrayBuffer(25),
                d = new Uint8Array(j);
              crypto.getRandomValues(d),
                (f =
                  h +
                  'rand:' +
                  Array.prototype.map
                    .call(d, function(e) {
                      return (e % 36).toString(36);
                    })
                    .join('') +
                  '___');
            }
            if (
              (g(Object, 'getOwnPropertyNames', {
                value: function(e) {
                  return u(e).filter(r);
                },
              }),
              'getPropertyNames' in Object)
            ) {
              var m = Object.getPropertyNames;
              g(Object, 'getPropertyNames', {
                value: function(e) {
                  return m(e).filter(r);
                },
              });
            }
            !(function() {
              var e = Object.freeze;
              g(Object, 'freeze', {
                value: function(t) {
                  return n(t), e(t);
                },
              });
              var t = Object.seal;
              g(Object, 'seal', {
                value: function(e) {
                  return n(e), t(e);
                },
              });
              var r = Object.preventExtensions;
              g(Object, 'preventExtensions', {
                value: function(e) {
                  return n(e), r(e);
                },
              });
            })();
            var v = !1,
              y = 0,
              _ = function() {
                function e(e, t) {
                  var r,
                    i = n(e);
                  return i ? (c in i ? i[c] : t) : ((r = s.indexOf(e)), r >= 0 ? p[r] : t);
                }
                function t(e) {
                  var t = n(e);
                  return t ? c in t : s.indexOf(e) >= 0;
                }
                function r(e, t) {
                  var r,
                    i = n(e);
                  return (
                    i
                      ? (i[c] = t)
                      : ((r = s.indexOf(e)),
                        r >= 0 ? (p[r] = t) : ((r = s.length), (p[r] = t), (s[r] = e))),
                    this
                  );
                }
                function o(e) {
                  var t,
                    r,
                    i = n(e);
                  return i
                    ? c in i && delete i[c]
                    : ((t = s.indexOf(e)),
                      !(t < 0) &&
                        ((r = s.length - 1),
                        (s[t] = void 0),
                        (p[t] = p[r]),
                        (s[t] = s[r]),
                        (s.length = r),
                        (p.length = r),
                        !0));
                }
                this instanceof _ || a();
                var s = [],
                  p = [],
                  c = y++;
                return Object.create(_.prototype, {
                  get___: { value: i(e) },
                  has___: { value: i(t) },
                  set___: { value: i(r) },
                  delete___: { value: i(o) },
                });
              };
            (_.prototype = Object.create(Object.prototype, {
              get: {
                value: function(e, t) {
                  return this.get___(e, t);
                },
                writable: !0,
                configurable: !0,
              },
              has: {
                value: function(e) {
                  return this.has___(e);
                },
                writable: !0,
                configurable: !0,
              },
              set: {
                value: function(e, t) {
                  return this.set___(e, t);
                },
                writable: !0,
                configurable: !0,
              },
              delete: {
                value: function(e) {
                  return this.delete___(e);
                },
                writable: !0,
                configurable: !0,
              },
            })),
              'function' == typeof s
                ? !(function() {
                    function r() {
                      function t(e, t) {
                        return u ? (c.has(e) ? c.get(e) : u.get___(e, t)) : c.get(e, t);
                      }
                      function r(e) {
                        return c.has(e) || (!!u && u.has___(e));
                      }
                      function n(e) {
                        var t = !!c['delete'](e);
                        return u ? u.delete___(e) || t : t;
                      }
                      this instanceof _ || a();
                      var p,
                        c = new s(),
                        u = void 0,
                        g = !1;
                      return (
                        (p = o
                          ? function(e, t) {
                              return (
                                c.set(e, t), c.has(e) || (u || (u = new _()), u.set(e, t)), this
                              );
                            }
                          : function(e, t) {
                              if (g)
                                try {
                                  c.set(e, t);
                                } catch (r) {
                                  u || (u = new _()), u.set___(e, t);
                                }
                              else c.set(e, t);
                              return this;
                            }),
                        Object.create(_.prototype, {
                          get___: { value: i(t) },
                          has___: { value: i(r) },
                          set___: { value: i(p) },
                          delete___: { value: i(n) },
                          permitHostObjects___: {
                            value: i(function(t) {
                              if (t !== e) throw new Error('bogus call to permitHostObjects___');
                              g = !0;
                            }),
                          },
                        })
                      );
                    }
                    o && 'undefined' != typeof Proxy && (Proxy = void 0),
                      (r.prototype = _.prototype),
                      (t.exports = r),
                      Object.defineProperty(WeakMap.prototype, 'constructor', {
                        value: WeakMap,
                        enumerable: !1,
                        configurable: !0,
                        writable: !0,
                      });
                  })()
                : ('undefined' != typeof Proxy && (Proxy = void 0), (t.exports = _));
          }
        })();
      },
      {},
    ],
    177: [
      function(e, t, r) {
        'use strict';
        function n(e, t) {
          if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
        }
        function i(e, t) {
          if (!e)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return !t || ('object' != typeof t && 'function' != typeof t) ? e : t;
        }
        function a(e, t) {
          if ('function' != typeof t && null !== t)
            throw new TypeError(
              'Super expression must either be null or a function, not ' + typeof t
            );
          (e.prototype = Object.create(t && t.prototype, {
            constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 },
          })),
            t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : (e.__proto__ = t));
        }
        var o = (function() {
            function e(e, t) {
              for (var r = 0; r < t.length; r++) {
                var n = t[r];
                (n.enumerable = n.enumerable || !1),
                  (n.configurable = !0),
                  'value' in n && (n.writable = !0),
                  Object.defineProperty(e, n.key, n);
              }
            }
            return function(t, r, n) {
              return r && e(t.prototype, r), n && e(t, n), t;
            };
          })(),
          s = e('@marcom/bubble-gum/BaseComponent'),
          p = (function(e) {
            function t(e) {
              n(this, t);
              var r = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
              (r.copyEls = Array.from(r.el.querySelectorAll('[data-fade-copy]'))),
                (r.anchorEl = document.querySelector('.section-comfort .copy-scroll-container'));
              var a = 'S' === e.pageMetrics.breakpoint ? 122 : 302,
                o = 60,
                s = 85,
                p = 47,
                c = 98;
              return (
                r.addKeyframe({
                  el: r.copyEls[2],
                  start: 'a0t + ' + a + 'vh + ' + o + 'vh',
                  end: 'a0t + ' + a + 'vh + ' + (o + 10) + 'vh',
                  opacity: [0, 1],
                  ease: 1,
                  anchors: [r.anchorEl],
                  breakpointMask: 'XLM',
                }),
                r.addKeyframe({
                  el: r.copyEls[2],
                  start: 'a0t + ' + a + 'vh + ' + p + 'vh',
                  end: 'a0t + ' + a + 'vh + ' + (p + 10) + 'vh',
                  opacity: [0, 1],
                  ease: 1,
                  anchors: [r.anchorEl],
                  breakpointMask: 'S',
                }),
                r.addKeyframe({
                  el: r.copyEls[1],
                  start: 'a0t + ' + a + 'vh + ' + (o + 2) + 'vh',
                  end: 'a0t + ' + a + 'vh + ' + (o + 12) + 'vh',
                  opacity: [0, 1],
                  ease: 1,
                  anchors: [r.anchorEl],
                  breakpointMask: 'XLM',
                }),
                r.addKeyframe({
                  el: r.copyEls[1],
                  start: 'a0t + ' + a + 'vh + ' + (p + 2) + 'vh',
                  end: 'a0t + ' + a + 'vh + ' + (p + 12) + 'vh',
                  opacity: [0, 1],
                  ease: 1,
                  anchors: [r.anchorEl],
                  breakpointMask: 'S',
                }),
                r.addKeyframe({
                  el: r.copyEls[0],
                  start: 'a0t + ' + a + 'vh + ' + (o + 4) + 'vh',
                  end: 'a0t + ' + a + 'vh + ' + (o + 14) + 'vh',
                  opacity: [0, 1],
                  ease: 1,
                  anchors: [r.anchorEl],
                  breakpointMask: 'XLM',
                }),
                r.addKeyframe({
                  el: r.copyEls[0],
                  start: 'a0t + ' + a + 'vh + ' + (p + 4) + 'vh',
                  end: 'a0t + ' + a + 'vh + ' + (p + 14) + 'vh',
                  opacity: [0, 1],
                  ease: 1,
                  anchors: [r.anchorEl],
                  breakpointMask: 'S',
                }),
                r.addKeyframe({
                  el: r.copyEls[0],
                  start: 'a0t + ' + a + 'vh + ' + (o + s) + 'vh',
                  end: 'a0t + ' + a + 'vh + ' + (o + s + 10) + 'vh',
                  opacity: [1, 0],
                  ease: 1,
                  anchors: [r.anchorEl],
                  breakpointMask: 'XLM',
                }),
                r.addKeyframe({
                  el: r.copyEls[0],
                  start: 'a0t + ' + a + 'vh + ' + (p + c) + 'vh',
                  end: 'a0t + ' + a + 'vh + ' + (p + c + 5) + 'vh',
                  opacity: [1, 0],
                  ease: 1,
                  anchors: [r.anchorEl],
                  breakpointMask: 'S',
                }),
                r.addKeyframe({
                  el: r.copyEls[1],
                  start: 'a0t + ' + a + 'vh + ' + (o + s + 2) + 'vh',
                  end: 'a0t + ' + a + 'vh + ' + (o + s + 12) + 'vh',
                  opacity: [1, 0],
                  ease: 1,
                  anchors: [r.anchorEl],
                  breakpointMask: 'XLM',
                }),
                r.addKeyframe({
                  el: r.copyEls[1],
                  start: 'a0t + ' + a + 'vh + ' + (p + c) + 'vh',
                  end: 'a0t + ' + a + 'vh + ' + (p + c + 5) + 'vh',
                  opacity: [1, 0],
                  ease: 1,
                  anchors: [r.anchorEl],
                  breakpointMask: 'S',
                }),
                r.addKeyframe({
                  el: r.copyEls[2],
                  start: 'a0t + ' + a + 'vh + ' + (o + s + 4) + 'vh',
                  end: 'a0t + ' + a + 'vh + ' + (o + s + 14) + 'vh',
                  opacity: [1, 0],
                  ease: 1,
                  anchors: [r.anchorEl],
                  breakpointMask: 'XLM',
                }),
                r.addKeyframe({
                  el: r.copyEls[2],
                  start: 'a0t + ' + a + 'vh + ' + (p + c) + 'vh',
                  end: 'a0t + ' + a + 'vh + ' + (p + c + 5) + 'vh',
                  opacity: [1, 0],
                  ease: 1,
                  anchors: [r.anchorEl],
                  breakpointMask: 'S',
                }),
                r
              );
            }
            return (
              a(t, e),
              o(t, null, [
                {
                  key: 'IS_SUPPORTED',
                  value: function() {
                    return !document.documentElement.classList.contains('fallback');
                  },
                },
              ]),
              t
            );
          })(s);
        t.exports = p;
      },
      { '@marcom/bubble-gum/BaseComponent': 119 },
    ],
    178: [
      function(e, t, r) {
        'use strict';
        function n(e, t) {
          if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
        }
        function i(e, t) {
          if (!e)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return !t || ('object' != typeof t && 'function' != typeof t) ? e : t;
        }
        function a(e, t) {
          if ('function' != typeof t && null !== t)
            throw new TypeError(
              'Super expression must either be null or a function, not ' + typeof t
            );
          (e.prototype = Object.create(t && t.prototype, {
            constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 },
          })),
            t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : (e.__proto__ = t));
        }
        var o = (function() {
            function e(e, t) {
              for (var r = 0; r < t.length; r++) {
                var n = t[r];
                (n.enumerable = n.enumerable || !1),
                  (n.configurable = !0),
                  'value' in n && (n.writable = !0),
                  Object.defineProperty(e, n.key, n);
              }
            }
            return function(t, r, n) {
              return r && e(t.prototype, r), n && e(t, n), t;
            };
          })(),
          s = e('@marcom/bubble-gum/BaseComponent'),
          p = (function(e) {
            function t(e) {
              n(this, t);
              var r = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
              (r.copyEls = Array.from(r.el.querySelectorAll('[data-copy]'))),
                (r.isSmall = 'S' === e.pageMetrics.breakpoint),
                (r.timings = r.copyEls.map(function(e) {
                  return '' !== e.dataset.copy
                    ? r.isSmall && e.hasAttribute('data-copy-small')
                      ? +e.dataset.copySmall
                      : +e.dataset.copy
                    : 50;
                }));
              var a = r.isSmall ? 50 : 100,
                o = +r.copyEls[r.copyEls.length - 1].dataset.timeOffset || a;
              return (
                (r.el.style.height = 100 + r.timings[r.timings.length - 1] + o + 'vh'),
                r.copyEls.forEach(function(e, t) {
                  e.classList.add('copy-' + (t + 1));
                  var n = r.timings[t],
                    i = n + a,
                    o = r.isSmall ? 50 : 80,
                    s = a;
                  e.hasAttribute('data-copy-fade-at') && (i = +e.dataset.copyFadeAt),
                    e.hasAttribute('data-copy-fade-at-small') &&
                      r.isSmall &&
                      (i = +e.dataset.copyFadeAtSmall),
                    e.hasAttribute('data-translate-by') && (o = +e.dataset.translateBy),
                    e.hasAttribute('data-translate-by-small') &&
                      r.isSmall &&
                      (o = +e.dataset.translateBySmall),
                    e.hasAttribute('data-time-offset') && (s = +e.dataset.timeOffset),
                    r.addKeyframe({
                      el: e,
                      start: 'a0t + ' + n + 'vh',
                      end: 'a0t + ' + n + 'vh + ' + 0.2 * a + 'vh',
                      opacity: [0, 1],
                      ease: 1,
                      anchors: [r.el],
                    }),
                    r.addKeyframe({
                      el: e,
                      start: 'a0t + ' + i + 'vh - ' + 0.2 * a + 'vh',
                      end: 'a0t + ' + i + 'vh',
                      opacity: [1, 0],
                      ease: 1,
                      anchors: [r.el],
                    }),
                    e.hasAttribute('data-copy-fade-at') &&
                      r.addKeyframe({
                        el: e,
                        start: 'a0t + ' + i + 'vh - 10vh',
                        end: 'a0t + ' + i + 'vh',
                        y: [-o / 2, -o / 2 - 10],
                        ease: 1,
                        anchors: [r.el],
                      }),
                    e.hasAttribute('data-no-translate') ||
                      r.addKeyframe({
                        el: e,
                        start: 'a0t + ' + n + 'vh',
                        end: 'a0t + ' + n + 'vh + ' + s + 'vh',
                        y: [o / 2, -o / 2],
                        ease: 1,
                        anchors: [r.el],
                      }),
                    r.addKeyframe({
                      el: e,
                      start: 'a0t + ' + n + 'vh - 50vh',
                      end: 'a0t + ' + n + 'vh + ' + s + 'vh + 50vh',
                      cssClass: 'will-change',
                      toggle: !0,
                      anchors: [r.el],
                    }),
                    r.addKeyframe({
                      el: e,
                      start: 'a0t + ' + n + 'vh',
                      end: 'a0t + ' + n + 'vh + ' + s + 'vh',
                      cssClass: 'active',
                      toggle: !0,
                      anchors: [r.el],
                    }),
                    Array.from(e.children).forEach(function(e) {
                      return e.setAttribute('tabindex', 0);
                    });
                }),
                r
              );
            }
            return (
              a(t, e),
              o(t, null, [
                {
                  key: 'IS_SUPPORTED',
                  value: function() {
                    return !document.documentElement.classList.contains('fallback');
                  },
                },
              ]),
              t
            );
          })(s);
        t.exports = p;
      },
      { '@marcom/bubble-gum/BaseComponent': 119 },
    ],
    179: [
      function(e, t, r) {
        'use strict';
        function n(e, t) {
          if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
        }
        function i(e, t) {
          if (!e)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return !t || ('object' != typeof t && 'function' != typeof t) ? e : t;
        }
        function a(e, t) {
          if ('function' != typeof t && null !== t)
            throw new TypeError(
              'Super expression must either be null or a function, not ' + typeof t
            );
          (e.prototype = Object.create(t && t.prototype, {
            constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 },
          })),
            t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : (e.__proto__ = t));
        }
        var o = (function() {
            function e(e, t) {
              for (var r = 0; r < t.length; r++) {
                var n = t[r];
                (n.enumerable = n.enumerable || !1),
                  (n.configurable = !0),
                  'value' in n && (n.writable = !0),
                  Object.defineProperty(e, n.key, n);
              }
            }
            return function(t, r, n) {
              return r && e(t.prototype, r), n && e(t, n), t;
            };
          })(),
          s = e('@marcom/bubble-gum/BaseComponent'),
          p = e('@marcom/anim-system/Parsing/ExpressionParser'),
          c = (function(e) {
            function t(e) {
              n(this, t);
              var r = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
              return (
                (r.handleFocus = r.handleFocus.bind(r)),
                document.addEventListener('keyup', function() {
                  document.activeElement && r.handleFocus(document.activeElement);
                }),
                r
              );
            }
            return (
              a(t, e),
              o(
                t,
                [
                  {
                    key: 'handleFocus',
                    value: function(e) {
                      if (e.parentElement._animInfo) {
                        var t = this.anim.getControllerForTarget(e.parentElement),
                          r = t.getNearestKeyframeForAttribute('y', 0),
                          n = p.parse(r.jsonProps.start + ' + 25vh', { anchors: [r.anchors[0]] });
                        window.scrollTo(0, Math.round(n));
                      }
                    },
                  },
                ],
                [
                  {
                    key: 'IS_SUPPORTED',
                    value: function() {
                      return !document.documentElement.classList.contains('fallback');
                    },
                  },
                ]
              ),
              t
            );
          })(s);
        t.exports = c;
      },
      {
        '@marcom/anim-system/Parsing/ExpressionParser': 113,
        '@marcom/bubble-gum/BaseComponent': 119,
      },
    ],
    180: [
      function(e, t, r) {
        'use strict';
        function n(e, t) {
          if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
        }
        function i(e, t) {
          if (!e)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return !t || ('object' != typeof t && 'function' != typeof t) ? e : t;
        }
        function a(e, t) {
          if ('function' != typeof t && null !== t)
            throw new TypeError(
              'Super expression must either be null or a function, not ' + typeof t
            );
          (e.prototype = Object.create(t && t.prototype, {
            constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 },
          })),
            t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : (e.__proto__ = t));
        }
        var o = (function() {
            function e(e, t) {
              for (var r = 0; r < t.length; r++) {
                var n = t[r];
                (n.enumerable = n.enumerable || !1),
                  (n.configurable = !0),
                  'value' in n && (n.writable = !0),
                  Object.defineProperty(e, n.key, n);
              }
            }
            return function(t, r, n) {
              return r && e(t.prototype, r), n && e(t, n), t;
            };
          })(),
          s = e('@marcom/ac-event-emitter-micro').EventEmitterMicro,
          p = (function(e) {
            function t(e) {
              n(this, t);
              var r = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
              return (
                (r.basePath = e.basePath),
                (r.buckets = e.buckets),
                (r.numPadding = e.numPadding),
                (r.images = []),
                (r.imagesLeftToLoad = []),
                (r.currentFrameIndicator = []),
                (r.currentBucket = 0),
                (r.stopLoading = !1),
                r.buckets.forEach(function(e) {
                  r.images.push(new Array(e.numImages));
                }),
                r.buckets.forEach(function(e) {
                  Object.defineProperties(e, {
                    firstImageLoaded: { value: !1, writable: !0 },
                    canPlayThrough: { value: !1, writable: !0 },
                    loadingCompleted: { value: !1, writable: !0 },
                    stage1Completed: { value: !1, writable: !0 },
                    numImagesStage1: { value: Math.round(0.75 * e.numImages), writable: !1 },
                  }),
                    r.imagesLeftToLoad.push(r.createLoadingQueue(e));
                }, r),
                (r.onImageLoaded = r.onImageLoaded.bind(r)),
                r.on(t.IMAGE_LOADED, r.onImageLoaded),
                r
              );
            }
            return (
              a(t, e),
              o(t, [
                {
                  key: 'loadPriorityImages',
                  value: function() {
                    (this.priorityQueue = this.createPriorityQueue()),
                      this.priorityQueue.forEach(function(e) {
                        Object.defineProperty(e, 'priorityFramesLoaded', {
                          value: !1,
                          writable: !0,
                        });
                      });
                    for (var e = 0, t = this.priorityQueue[0].length - 1; e < t; e++)
                      this.loadImage(this.priorityQueue[0].shift(), 0, !0);
                  },
                },
                {
                  key: 'createPriorityQueue',
                  value: function() {
                    for (var e = [], t = 0, r = this.buckets.length; t < r; t++)
                      if (this.buckets[t].priorityFrames) e.push(this.buckets[t].priorityFrames);
                      else {
                        var n = [];
                        n.push(0),
                          n.push(this.buckets[t].numImages - 1),
                          n.push(Math.round((this.buckets[t].numImages - 1) / 2)),
                          e.push(n);
                      }
                    return e;
                  },
                },
                {
                  key: 'splitArray',
                  value: function(e, t, r) {
                    var n = Math.floor(t.length / 2),
                      i = t[n],
                      a = e[i];
                    e[i] = { value: a, bucket: r };
                    var o = t.slice(0, n),
                      s = t.slice(n + 1);
                    return (
                      o.length && this.splitArray(e, o, r + 1),
                      s.length && this.splitArray(e, s, r + 1),
                      e
                    );
                  },
                },
                {
                  key: 'createLoadingQueue',
                  value: function(e) {
                    for (
                      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0.5,
                        r = e.numImages,
                        n = [],
                        i = 0;
                      i < r;
                      i++
                    )
                      n.push(i);
                    var a = this.splitArray(n, n, 0)
                      .sort(function(e, n) {
                        var i = e.bucket - n.bucket;
                        return 0 !== i ? i : Math.abs(e.value - r * t) - Math.abs(n.value - r * t);
                      })
                      .map(function(e) {
                        return e.value;
                      });
                    return a;
                  },
                },
                {
                  key: 'loadImage',
                  value: function(e, r, n) {
                    var i = this;
                    if (!this.stopLoading) {
                      if (this.images[r][e]) {
                        if (!n) return this.loadNextImage(r);
                        if (r < this.buckets.length) return this.loadNextPriorityImage(r);
                      }
                      var a = new Image(),
                        o = function p(o) {
                          a.removeEventListener('load', p),
                            i.trigger(t.IMAGE_LOADED, {
                              img: a,
                              bucket: r,
                              value: e,
                              priorityFlag: n,
                            });
                        },
                        s = String(e).padStart(this.numPadding, '0');
                      a.addEventListener('load', o),
                        (a.src = this.basePath + '/' + this.buckets[r].path + '/' + s + '.jpg');
                    }
                  },
                },
                {
                  key: 'onImageLoaded',
                  value: function(e) {
                    this.buckets[e.bucket].firstImageLoaded ||
                      ((this.buckets[e.bucket].firstImageLoaded = !0),
                      this.trigger(t.FIRST_IMAGE_LOADED, e)),
                      (this.images[e.bucket][e.value] = e.img),
                      e.priorityFlag
                        ? this.loadNextPriorityImage(e.bucket)
                        : this.dynamicBucketLoading
                        ? this.stage1CompletedForAllBuckets
                          ? this.loadNextImage(this.currentBucket)
                          : this.checkBucketForStage1(this.currentBucket)
                        : this.loadNextImage(e.bucket);
                  },
                },
                {
                  key: 'loadNextPriorityImage',
                  value: function(e) {
                    this.priorityQueue[e].length
                      ? this.loadImage(this.priorityQueue[e].shift(), e, !0)
                      : 0 === this.priorityQueue[e].length &&
                        (this.priorityQueue[e].priorityFramesLoaded ||
                          ((this.priorityQueue[e].priorityFramesLoaded = !0),
                          this.trigger(t.BUCKET_PRIORITY_IMAGES_LOADED, e),
                          this.trigger(t.CAN_PLAY_THROUGH, e)),
                        this.checkPriorityBuckets());
                  },
                },
                {
                  key: 'loadNextImage',
                  value: function(e) {
                    this.imagesLeftToLoad[e].length > this.buckets[e].numImagesStage1
                      ? this.loadImage(this.imagesLeftToLoad[e].shift(), e, !1)
                      : this.imagesLeftToLoad[e].length &&
                        (this.buckets[e].stage1Completed || (this.buckets[e].stage1Completed = !0),
                        this.stage1CompletedForAllBuckets
                          ? this.loadImage(this.imagesLeftToLoad[e].shift(), e, !1)
                          : this.checkBucketForStage1(this.currentBucket)),
                      0 === this.imagesLeftToLoad[e].length &&
                        (this.buckets[e].loadingCompleted ||
                          ((this.buckets[e].loadingCompleted = !0),
                          this.trigger(t.BUCKET_LOADING_COMPLETE, e)),
                        this.checkBuckets(e));
                  },
                },
                {
                  key: 'checkBucketForStage1',
                  value: function(e) {
                    this.buckets[e].stage1Completed
                      ? (e !== this.buckets.length - 1 &&
                          this.imagesLeftToLoad[e + 1].length >
                            this.buckets[e + 1].numImagesStage1 &&
                          this.loadImage(this.imagesLeftToLoad[e + 1].shift(), e + 1, !1),
                        0 !== e &&
                          (e !== this.buckets.length - 1
                            ? this.buckets[e + 1].stage1Completed &&
                              this.imagesLeftToLoad[e - 1].length >
                                this.buckets[e - 1].numImagesStage1 &&
                              this.loadImage(this.imagesLeftToLoad[e - 1].shift(), e - 1, !1)
                            : this.imagesLeftToLoad[e - 1].length >
                                this.buckets[e - 1].numImagesStage1 &&
                              this.loadImage(this.imagesLeftToLoad[e - 1].shift(), e - 1, !1)),
                        this.checkBucketsForStage1Completion())
                      : this.loadImage(this.imagesLeftToLoad[e].shift(), e, !1);
                  },
                },
                {
                  key: 'checkBucketsForStage1Completion',
                  value: function() {
                    var e = this.buckets.findIndex(function(e) {
                      return !e.stage1Completed;
                    });
                    e > -1
                      ? this.loadNextImage(e)
                      : (this.stage1CompletedForAllBuckets ||
                          ((this.stage1CompletedForAllBuckets = !0),
                          this.trigger(t.STAGE1_LOADING_COMPLETE, this)),
                        this.loadImage(
                          this.imagesLeftToLoad[this.currentBucket].shift(),
                          this.currentBucket,
                          !1
                        ));
                  },
                },
                {
                  key: 'checkBuckets',
                  value: function(e) {
                    var r = void 0;
                    (r =
                      this.buckets[e + 1] && !this.buckets[e + 1].loadingCompleted
                        ? e + 1
                        : this.buckets[e - 1] && !this.buckets[e - 1].loadingCompleted
                        ? e - 1
                        : this.buckets.findIndex(function(e) {
                            return !e.loadingCompleted;
                          })),
                      r > -1 ? this.loadNextImage(r) : this.trigger(t.LOADING_COMPLETE, this);
                  },
                },
                {
                  key: 'checkPriorityBuckets',
                  value: function() {
                    var e = this.priorityQueue.findIndex(function(e) {
                      return !e.priorityFramesLoaded;
                    });
                    e > 0
                      ? this.loadNextPriorityImage(e)
                      : this.trigger(t.PRIORITY_LOADING_COMPLETE, this);
                  },
                },
                {
                  key: 'stop',
                  value: function() {
                    this.stopLoading = !0;
                  },
                },
              ]),
              t
            );
          })(s);
        (p.FIRST_IMAGE_LOADED = 'FIRST_IMAGE_LOADED'),
          (p.IMAGE_LOADED = 'IMAGE_LOADED'),
          (p.BUCKET_PRIORITY_IMAGES_LOADED = 'BUCKET_PRIORITY_IMAGES_LOADED'),
          (p.BUCKET_LOADING_COMPLETE = 'BUCKET_LOADING_COMPLETE'),
          (p.CAN_PLAY_THROUGH = 'CAN_PLAY_THROUGH'),
          (p.PRIORITY_LOADING_COMPLETE = 'PRIORITY_LOADING_COMPLETE'),
          (p.LOADING_COMPLETE = 'LOADING_COMPLETE'),
          (t.exports = p);
      },
      { '@marcom/ac-event-emitter-micro': 34 },
    ],
    181: [
      function(e, t, r) {
        'use strict';
        function n(e, t) {
          if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
        }
        function i(e, t) {
          if (!e)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return !t || ('object' != typeof t && 'function' != typeof t) ? e : t;
        }
        function a(e, t) {
          if ('function' != typeof t && null !== t)
            throw new TypeError(
              'Super expression must either be null or a function, not ' + typeof t
            );
          (e.prototype = Object.create(t && t.prototype, {
            constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 },
          })),
            t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : (e.__proto__ = t));
        }
        var o = (function() {
            function e(e, t) {
              for (var r = 0; r < t.length; r++) {
                var n = t[r];
                (n.enumerable = n.enumerable || !1),
                  (n.configurable = !0),
                  'value' in n && (n.writable = !0),
                  Object.defineProperty(e, n.key, n);
              }
            }
            return function(t, r, n) {
              return r && e(t.prototype, r), n && e(t, n), t;
            };
          })(),
          s = e('@marcom/ac-event-emitter-micro').EventEmitterMicro,
          p = (function(e) {
            function t(e) {
              n(this, t);
              var r = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
              return (
                (r.id = e.imagePath),
                (r.friendlyName = '' + (e.sectionName || r.id)),
                (r.desiredIndex = 0),
                (r.displayIndex = -1),
                (r.numImages = e.numImages),
                (r.imagePath = e.imagePath),
                (r.canDraw = !1),
                (r.scaleEnabled = e.scaleEnabled),
                (r.images = []),
                (r.retinaEnabled = e.retinaEnabled),
                (r.canvas = null),
                (r.ctx = null),
                r.setup(e),
                r
              );
            }
            return (
              a(t, e),
              o(t, [
                {
                  key: 'setup',
                  value: function(e) {
                    (this.canvas = document.createElement('canvas')), (this.canvas.id = this.id);
                    var t = { alpha: !0 };
                    e && e.powerPreference && (t.powerPreference = e.powerPreference),
                      (this.ctx = this.canvas.getContext('2d', t));
                  },
                },
                {
                  key: 'renderIndex',
                  value: function(e) {
                    if (this.images[e]) return void this.drawImage(e);
                    for (var t = Number.MAX_SAFE_INTEGER, r = e; r >= 0; r--)
                      if (this.images[r]) {
                        t = r;
                        break;
                      }
                    for (var n = Number.MAX_SAFE_INTEGER, i = e, a = this.images.length; i < a; i++)
                      if (this.images[i]) {
                        n = i;
                        break;
                      }
                    this.images[t] ? this.drawImage(t) : this.images[n] && this.drawImage(n);
                  },
                },
                {
                  key: 'drawImage',
                  value: function(e) {
                    (this.displayIndex = e),
                      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                    var t = Math.floor(
                        (this.canvas.width - this.images[this.displayIndex].naturalWidth) / 2
                      ),
                      r = Math.floor(
                        (this.canvas.height - this.images[this.displayIndex].naturalHeight) / 2
                      );
                    this.ctx.drawImage(this.images[this.displayIndex], t, r);
                  },
                },
                {
                  key: 'setSize',
                  value: function(e, t) {
                    var r = this.retinaEnabled ? 2 : 1;
                    (this.canvas.style.width = e / r + 'px'),
                      (this.canvas.style.height = t / r + 'px'),
                      (this.canvas.parentElement.style.width = e / r + 'px'),
                      (this.canvas.parentElement.style.height = t / r + 'px'),
                      (this.canvas.width = e),
                      (this.canvas.height = t);
                  },
                },
                {
                  key: 'percent',
                  get: function() {
                    return this.desiredIndex / this.images.length;
                  },
                  set: function(e) {
                    this.canDraw &&
                      ((this.desiredIndex = Math.round(e * this.images.length)),
                      this.renderIndex(this.desiredIndex));
                  },
                },
              ]),
              t
            );
          })(s);
        t.exports = p;
      },
      { '@marcom/ac-event-emitter-micro': 34 },
    ],
    182: [
      function(e, t, r) {
        'use strict';
        function n(e, t) {
          if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
        }
        function i(e, t) {
          if (!e)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return !t || ('object' != typeof t && 'function' != typeof t) ? e : t;
        }
        function a(e, t) {
          if ('function' != typeof t && null !== t)
            throw new TypeError(
              'Super expression must either be null or a function, not ' + typeof t
            );
          (e.prototype = Object.create(t && t.prototype, {
            constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 },
          })),
            t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : (e.__proto__ = t));
        }
        var o = (function() {
            function e(e, t) {
              for (var r = 0; r < t.length; r++) {
                var n = t[r];
                (n.enumerable = n.enumerable || !1),
                  (n.configurable = !0),
                  'value' in n && (n.writable = !0),
                  Object.defineProperty(e, n.key, n);
              }
            }
            return function(t, r, n) {
              return r && e(t.prototype, r), n && e(t, n), t;
            };
          })(),
          s = e('@marcom/bubble-gum/BaseComponent'),
          p = (function(e) {
            function t(e) {
              n(this, t);
              var r = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
              (r.options = r.el.dataset || {}),
                (r.videoEl = r.el.querySelector('video') || r.el),
                (r.pauseRelativeTo = r.videoEl.getAttribute('data-pause-relative-to')),
                (r.replay = r.videoEl.hasAttribute('data-replay')),
                (r.autoReplay = r.videoEl.hasAttribute('data-auto-replay'));
              var a = document.querySelector('.section-experience .replay-button-wrapper'),
                o = a.cloneNode(!0);
              if (
                (o.classList.add('new-replay-button-wrapper'),
                document.querySelector('.section-experience .sticky-copy-lockup').prepend(o),
                r.replay)
              ) {
                r.replayButtons = document.querySelectorAll(
                  '[data-replay-for="' + r.videoEl.id + '"]'
                );
                var s = !0,
                  p = !1,
                  c = void 0;
                try {
                  for (
                    var u, g = r.replayButtons[Symbol.iterator]();
                    !(s = (u = g.next()).done);
                    s = !0
                  ) {
                    var l = u.value;
                    l.addEventListener('click', r._delayedPlay.bind(r));
                  }
                } catch (h) {
                  (p = !0), (c = h);
                } finally {
                  try {
                    !s && g['return'] && g['return']();
                  } finally {
                    if (p) throw c;
                  }
                }
              }
              return (r.caseLight = document.querySelector('.case-light')), r;
            }
            return (
              a(t, e),
              o(
                t,
                [
                  {
                    key: 'mounted',
                    value: function() {
                      var e = this;
                      (this.endFrame = this.el.querySelector('[data-video-endframe]')),
                        (this.videoComponent = this.gum.getComponentOfType(
                          'VideoViewportSource',
                          this.videoEl
                        )),
                        this.videoComponent.video.addEventListener(
                          'ended',
                          this._onMediaEnded.bind(this)
                        ),
                        this.videoComponent.video.addEventListener('play', this._onPlay.bind(this)),
                        this.autoReplay
                          ? (this.addDiscreteEvent({
                              event: 'Video: Play - Auto Replay',
                              start: this.options.playStart || 't - 100vh',
                              end: this.options.playEnd || 'b',
                              anchors: [this.pauseRelativeTo],
                              breakpointMask: 'XLM',
                              onEnter: function() {
                                return e.videoComponent.queueVideoPlayback();
                              },
                              onExit: function() {
                                return e.videoComponent.pauseVideoPlayback();
                              },
                            }),
                            this.addDiscreteEvent({
                              event: 'Video: Reset',
                              start: this.options.playStart || 't - 100vh',
                              end: this.options.playEnd || 'b',
                              anchors: [this.pauseRelativeTo],
                              breakpointMask: 'XLM',
                              onExit: function() {
                                return e.reset();
                              },
                            }),
                            this.addDiscreteEvent({
                              event: 'Video: Play - Auto Replay',
                              start: this.options.playStartSmall || 't - 100vh',
                              end: this.options.playEndSmall || 'b',
                              anchors: [this.pauseRelativeTo],
                              breakpointMask: 'S',
                              onExit: function() {
                                return e.reset();
                              },
                            }),
                            this.addDiscreteEvent({
                              event: 'Video: Reset',
                              start: this.options.playStartSmall || 't - 100vh',
                              end: this.options.playEndSmall || 'b',
                              anchors: [this.pauseRelativeTo],
                              breakpointMask: 'S',
                              onExit: function() {
                                return e.reset();
                              },
                            }))
                          : (this.addDiscreteEvent({
                              event: 'Video: Play',
                              start: this.options.playStart || 't - 100vh',
                              end: this.options.playEnd || 'b',
                              anchors: [this.pauseRelativeTo],
                              breakpointMask: 'XLM',
                              onEnterOnce: function() {
                                return e.videoComponent.queueVideoPlayback();
                              },
                            }),
                            this.addDiscreteEvent({
                              event: 'Video: Play',
                              start: this.options.playStartSmall || 't - 100vh',
                              end: this.options.playEndSmall || 'b',
                              anchors: [this.pauseRelativeTo],
                              breakpointMask: 'S',
                              onEnterOnce: function() {
                                return e.videoComponent.queueVideoPlayback();
                              },
                            }));
                    },
                  },
                  {
                    key: 'reset',
                    value: function() {
                      this.videoComponent.video.pause(),
                        (this.videoComponent.video.currentTime = 0),
                        this._hideReplayButton(),
                        this.endFrame && this.endFrame.classList.add('hide'),
                        this.caseLight.classList.add('go-on-state'),
                        this.caseLight.classList.remove('animate');
                    },
                  },
                  {
                    key: '_onMediaEnded',
                    value: function() {
                      if (this.replayButtons) {
                        var e = !0,
                          t = !1,
                          r = void 0;
                        try {
                          for (
                            var n, i = this.replayButtons[Symbol.iterator]();
                            !(e = (n = i.next()).done);
                            e = !0
                          ) {
                            var a = n.value;
                            a.classList.add('is-paused'),
                              (a.disabled = !1),
                              a.removeAttribute('aria-hidden');
                          }
                        } catch (o) {
                          (t = !0), (r = o);
                        } finally {
                          try {
                            !e && i['return'] && i['return']();
                          } finally {
                            if (t) throw r;
                          }
                        }
                      }
                      this.endFrame &&
                        (this.endFrame.classList.remove('hide'),
                        this.videoComponent.video.classList.add('hide')),
                        this.replay ||
                          this.autoReplay ||
                          this.gum.removeComponent(this.videoComponent),
                        this.caseLight.classList.add('go-on-state'),
                        this.caseLight.classList.remove('animate');
                    },
                  },
                  {
                    key: '_onPlay',
                    value: function() {
                      this.videoComponent.video.classList.remove('hide'),
                        this.caseLight.classList.remove('go-on-state'),
                        this.caseLight.classList.remove('go-green'),
                        this.caseLight.classList.add('animate');
                    },
                  },
                  {
                    key: '_delayedPlay',
                    value: function() {
                      var e = this;
                      this._hideReplayButton(),
                        this.endFrame && this.endFrame.classList.add('hide'),
                        setTimeout(function() {
                          e.videoComponent.video.play();
                        }, 1e3);
                    },
                  },
                  {
                    key: '_hideReplayButton',
                    value: function() {
                      if (this.replayButtons) {
                        var e = !0,
                          t = !1,
                          r = void 0;
                        try {
                          for (
                            var n, i = this.replayButtons[Symbol.iterator]();
                            !(e = (n = i.next()).done);
                            e = !0
                          ) {
                            var a = n.value;
                            a.classList.remove('is-paused'),
                              (a.disabled = !0),
                              a.setAttribute('aria-hidden', !0);
                          }
                        } catch (o) {
                          (t = !0), (r = o);
                        } finally {
                          try {
                            !e && i['return'] && i['return']();
                          } finally {
                            if (t) throw r;
                          }
                        }
                      }
                    },
                  },
                ],
                [
                  {
                    key: 'IS_SUPPORTED',
                    value: function() {
                      return !document.documentElement.classList.contains('fallback');
                    },
                  },
                ]
              ),
              t
            );
          })(s);
        t.exports = p;
      },
      { '@marcom/bubble-gum/BaseComponent': 119 },
    ],
    183: [
      function(e, t, r) {
        'use strict';
        function n(e, t) {
          if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
        }
        function i(e, t) {
          if (!e)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return !t || ('object' != typeof t && 'function' != typeof t) ? e : t;
        }
        function a(e, t) {
          if ('function' != typeof t && null !== t)
            throw new TypeError(
              'Super expression must either be null or a function, not ' + typeof t
            );
          (e.prototype = Object.create(t && t.prototype, {
            constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 },
          })),
            t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : (e.__proto__ = t));
        }
        var o = (function() {
            function e(e, t) {
              for (var r = 0; r < t.length; r++) {
                var n = t[r];
                (n.enumerable = n.enumerable || !1),
                  (n.configurable = !0),
                  'value' in n && (n.writable = !0),
                  Object.defineProperty(e, n.key, n);
              }
            }
            return function(t, r, n) {
              return r && e(t.prototype, r), n && e(t, n), t;
            };
          })(),
          s = e('@marcom/bubble-gum/BaseComponent'),
          p = (function(e) {
            function t(e) {
              n(this, t);
              var r = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)),
                a = e.data;
              (r.copyEl = r.el.querySelector('[data-custom-copy]')),
                (r.scrollSequenceContainer = document.querySelector('.scroll-sequence')),
                (r.refCopyEls = r.el.querySelectorAll('[data-fade-reference] [data-copy]')),
                (r.pins = r.el.querySelectorAll('.pin-custom'));
              var o = document.getElementById('07-flip-reveal-guts');
              return (
                r.addKeyframe({
                  el: r.copyEl,
                  start: 'a0t + ' + a[0].start + 'vh - 25vh',
                  end: 'a0t + ' + a[0].start + 'vh - 15vh',
                  opacity: [0, 1],
                  ease: 1,
                  anchors: [r.scrollSequenceContainer],
                  breakpointMask: 'XLM',
                }),
                r.addKeyframe({
                  el: r.copyEl,
                  start: 'a0t + ' + a[0].start + 'vh - 20vh',
                  end: 'a0t + ' + a[0].start + 'vh - 10vh',
                  opacity: [0, 1],
                  ease: 1,
                  anchors: [r.scrollSequenceContainer],
                  breakpointMask: 'S',
                }),
                r.addKeyframe({
                  el: r.copyEl,
                  start: 'a0t + ' + a[0].start + 'vh - 100vh',
                  end: 'a0t + ' + a[0].start + 'vh + css(height, a1)',
                  y: ['0', '-css(height, a1)/2 - 50vh'],
                  easeFunction: 'easeInSin',
                  ease: 1,
                  anchors: [r.scrollSequenceContainer, o],
                  breakpointMask: 'XLM',
                }),
                r.addKeyframe({
                  el: r.copyEl,
                  start: 'a0t + ' + a[0].start + 'vh - 150vh',
                  end: 'a0t + ' + a[0].start + 'vh + css(height, a1) - 50vh',
                  y: ['0', '-60vh'],
                  easeFunction: 'easeInSin',
                  ease: 1,
                  anchors: [r.scrollSequenceContainer, o],
                  breakpointMask: 'S',
                }),
                r.addKeyframe({
                  el: r.copyEl,
                  start: 'a0t + ' + a[0].start + 'vh + css(height, a1) - 10vh',
                  end: 'a0t + ' + a[0].start + 'vh + css(height, a1)',
                  opacity: [1, 0],
                  ease: 1,
                  anchors: [r.scrollSequenceContainer, o],
                  breakpointMask: 'XLM',
                }),
                r.addKeyframe({
                  el: r.copyEl,
                  start: 'a0t + ' + a[0].start + 'vh + css(height, a1)*0.75 - 60vh',
                  end: 'a0t + ' + a[0].start + 'vh + css(height, a1)*0.75 - 50vh',
                  opacity: [1, 0],
                  ease: 1,
                  anchors: [r.scrollSequenceContainer, o],
                  breakpointMask: 'S',
                }),
                r
              );
            }
            return (
              a(t, e),
              o(
                t,
                [
                  {
                    key: 'mounted',
                    value: function() {
                      var e = this,
                        t = this.gum.getComponentOfType(
                          'CopyMagic',
                          this.el.querySelector('.copy-scroll-container')
                        );
                      t.copyEls.forEach(function(t, r) {
                        if (r > 0 && r < 5) {
                          var n = e.anim
                              .getControllerForTarget(t)
                              .getNearestKeyframeForAttribute('y'),
                            i = 1 === r || 3 === r ? [0.4, 1] : [0.5, 1];
                          e.addKeyframe({
                            el: e.pins[r - 1],
                            start: n.jsonProps.start,
                            end: n.jsonProps.end,
                            scale: i,
                            anchors: n.jsonProps.anchors,
                            breakpointMask: 'XLM',
                          });
                        }
                      });
                    },
                  },
                ],
                [
                  {
                    key: 'IS_SUPPORTED',
                    value: function() {
                      return !document.documentElement.classList.contains('fallback');
                    },
                  },
                ]
              ),
              t
            );
          })(s);
        t.exports = p;
      },
      { '@marcom/bubble-gum/BaseComponent': 119 },
    ],
    184: [
      function(e, t, r) {
        'use strict';
        function n(e) {
          if (Array.isArray(e)) {
            for (var t = 0, r = Array(e.length); t < e.length; t++) r[t] = e[t];
            return r;
          }
          return Array.from(e);
        }
        function i(e, t) {
          if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
        }
        function a(e, t) {
          if (!e)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return !t || ('object' != typeof t && 'function' != typeof t) ? e : t;
        }
        function o(e, t) {
          if ('function' != typeof t && null !== t)
            throw new TypeError(
              'Super expression must either be null or a function, not ' + typeof t
            );
          (e.prototype = Object.create(t && t.prototype, {
            constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 },
          })),
            t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : (e.__proto__ = t));
        }
        function s(e) {
          return { X: 'large', L: 'large', M: 'medium', S: 'small' }[e];
        }
        var p = (function() {
            function e(e, t) {
              for (var r = 0; r < t.length; r++) {
                var n = t[r];
                (n.enumerable = n.enumerable || !1),
                  (n.configurable = !0),
                  'value' in n && (n.writable = !0),
                  Object.defineProperty(e, n.key, n);
              }
            }
            return function(t, r, n) {
              return r && e(t.prototype, r), n && e(t, n), t;
            };
          })(),
          c = e('@marcom/bubble-gum/BaseComponent'),
          u = e('@marcom/useragent-detect'),
          g = e('./ImageSequencePlayer'),
          l = e('./ImageLoadingManager'),
          h = e('./sequence/timings'),
          f = e('../overview/analytics'),
          j = e('../overview/initializeNormalSectionEngagement'),
          d = e('../overview/constants'),
          m = e('../overview/sizes'),
          v = 4,
          y = 'high-performance',
          _ = function() {
            try {
              var e = document.createElement('canvas'),
                t =
                  u.os.osx && u.os.version.minor < 14
                    ? e.getContext('webgl')
                    : e.getContext('webgl', { powerPreference: y }),
                r = t.getExtension('WEBGL_debug_renderer_info'),
                n = t.getParameter(r.UNMASKED_RENDERER_WEBGL);
              return n;
            } catch (i) {
              return i;
            }
          },
          b = (function() {
            var e = _();
            if ('string' != typeof e) return !1;
            var t = function(t) {
              return e.toLowerCase().indexOf(t) > -1;
            };
            return t('iris') || t('intel');
          })(),
          E = (function(e) {
            function t(e) {
              i(this, t);
              var r = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
              (r.imageSequenceContainer = r.el.querySelector('.image-sequence')),
                (r.canvasContainer = r.el.querySelector('.canvas-container')),
                (r.imageAirpods = r.el.querySelector('.image-airpods')),
                (r.localnav = document.getElementById('ac-localnav')),
                (r.heroCopy = r.el.querySelector('[data-hero-copy]')),
                (r.retinaEnabled = !1),
                (r.currentViewport = s(e.pageMetrics.breakpoint)),
                r.retinaEnabled && (r.currentViewport += window.devicePixelRatio > 1 ? '_2x' : ''),
                (r.isSmall = r.currentViewport.includes('small')),
                (r.buckets = [
                  {
                    path: '01-hero-lightpass',
                    numImages: 148,
                    priorityFrames: [0, 80, 120, 137],
                    sectionName: 'hero',
                  },
                  {
                    path: '02-head-bob-turn',
                    numImages: 132,
                    priorityFrames: [20, 55, 99, 131],
                    scaleEnabled: !0,
                    sectionName: 'comfort-lifestyle',
                  },
                  {
                    path: '03-flip-for-guts',
                    numImages: 89,
                    priorityFrames: [0, 20, 36, 50, 67, 88],
                    sectionName: 'comfort-fit',
                  },
                  {
                    path: '04-explode-tips',
                    numImages: 139,
                    priorityFrames: [0, 90, 122, 138],
                    sectionName: 'comfort-size',
                  },
                  {
                    path: '05-flip-for-nc',
                    numImages: 140,
                    priorityFrames: [0, 25, 53, 76, 97, 129],
                    sectionName: 'noise-cancellation',
                  },
                  {
                    path: '06-transparency-head',
                    numImages: 177,
                    priorityFrames: [3, 35, 86, 109, 140],
                    scaleEnabled: !0,
                    sectionName: 'transparency',
                  },
                  {
                    path: '07-flip-reveal-guts',
                    numImages: r.isSmall ? 95 : 69,
                    priorityFrames: r.isSmall ? [0, 46, 73, 94] : [0, 46, 68],
                    sectionName: 'audio-quality',
                  },
                  {
                    path: '08-turn-for-chip',
                    numImages: 90,
                    priorityFrames: [0, 23, 47, 79, 89],
                    sectionName: 'performance',
                  },
                  {
                    path: '09-scoop-turn',
                    numImages: 235,
                    priorityFrames: [0, 40, 70, 234],
                    sectionName: 'design',
                  },
                  {
                    path: '10-fall-into-case',
                    numImages: 290,
                    priorityFrames: [0, 26, 52, 96, 194, 231, 244],
                    sectionName: 'battery',
                  },
                ]),
                r.generateTimings(),
                r.setOrientationClass(e.pageMetrics);
              var n = window.location.origin.replace('.ic-local', '');
              (r.basePath =
                n +
                '/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/' +
                r.currentViewport),
                (r.imageLoadingManager = new l({
                  basePath: r.basePath,
                  buckets: r.buckets,
                  numPadding: v,
                })),
                (r.imageSequences = new Array(r.buckets.length));
              for (var o = 0, p = r.buckets.length; o < p; o++) {
                var c = {
                  numImages: r.buckets[o].numImages,
                  imagePath: r.buckets[o].path,
                  scaleEnabled: r.buckets[o].scaleEnabled || !1,
                  retinaEnabled: r.retinaEnabled,
                  sectionName: r.buckets[o].sectionName,
                };
                b && (c.powerPreference = y), (r.imageSequences[o] = new g(c));
              }
              var u = r.addDiscreteEvent({
                  start: 'a0t + ' + h[9][0].start + 'vh + 25vh',
                  anchors: [r.el],
                  onEvent: function(e) {
                    document.body.classList.remove('lights-on'),
                      r.localnav.classList.add('ac-localnav-dark');
                  },
                  onEventReverse: function(e) {
                    e.controller.group.position.local < f.start ||
                      (document.body.classList.add('lights-on'),
                      r.localnav.classList.remove('ac-localnav-dark'));
                  },
                }),
                f = r.addDiscreteEvent({
                  start: 'a0t + ' + h[5][0].end + 'vh - 100vh',
                  anchors: [r.el],
                  onEvent: function(e) {
                    e.controller.group.position.local > u.start ||
                      (document.body.classList.add('lights-on'),
                      r.localnav.classList.remove('ac-localnav-dark'));
                  },
                  onEventReverse: function(e) {
                    document.body.classList.remove('lights-on'),
                      r.localnav.classList.add('ac-localnav-dark');
                  },
                });
              return (r.initAnimation = r.initAnimation.bind(r)), r;
            }
            return (
              o(t, e),
              p(
                t,
                [
                  {
                    key: 'generateTimings',
                    value: function() {
                      var e = 'large';
                      this.isSmall && (e = 'small'),
                        (h = h[e]),
                        h.forEach(function(e, t) {
                          e.forEach(function(r, n) {
                            if (0 !== t)
                              if (0 !== n) r.start = e[n - 1].end + r.buffer;
                              else {
                                var i = h[t - 1].length;
                                r.start = h[t - 1][i - 1].end + r.buffer;
                              }
                            else
                              0 === n ? (r.start = r.buffer) : (r.start = e[n - 1].end + r.buffer);
                            r.end = r.start + r.duration;
                          });
                        }),
                        (this.animKeyframes = new Array(this.buckets.length)),
                        this.setContainerHeight();
                    },
                  },
                  {
                    key: 'setContainerHeight',
                    value: function() {
                      var e = h.length,
                        t = h[e - 1].length,
                        r = h[e - 1][t - 1].end + h[e - 1][t - 1].canvasExtendTiming;
                      (this.el.style.height = r + 100 + 'vh'), this.anim.forceUpdate();
                    },
                  },
                  {
                    key: 'initAnimation',
                    value: function(e, t) {
                      var r = this.anim.addKeyframe(this.imageSequences[e], {
                        start: 'a0t + ' + t.start + 'vh',
                        end: 'a0t + ' + t.end + 'vh',
                        percent: t.percent,
                        anchors: [this.el],
                        snapAtCreation: !0,
                        ease: 0.2,
                      });
                      return (this.imageSequences[e].canDraw = !0), r;
                    },
                  },
                  {
                    key: 'initZindexKeyframes',
                    value: function(e, t) {
                      var r = this;
                      if (
                        (this.buckets[e].scaleEnabled &&
                          (9 !== e &&
                            this.anim.addKeyframe(this.imageSequences[e].canvas, {
                              start: 'a0t + ' + t[0].start + 'vh',
                              end: 'a0t + ' + t[0].start + 'vh + 30vh',
                              opacity: [0, 1],
                              anchors: [this.el],
                            }),
                          1 !== e &&
                            9 !== e &&
                            this.anim.addKeyframe(this.imageSequences[e].canvas, {
                              start: 'a0t + ' + t[0].end + 'vh - 20vh',
                              end: 'a0t + ' + t[0].end + 'vh',
                              opacity: [1, 0],
                              anchors: [this.el],
                            }),
                          this.anim.addKeyframe(this.imageSequences[e].canvas, {
                            start: 'a0t + ' + t[0].start + 'vh',
                            end: 'a0t + ' + t[0].end + 'vh',
                            scale: ['100vw/w', '100vw/w'],
                            anchors: [this.el],
                            disabledWhen: ['portrait'],
                            breakpointMask: 'XLM',
                          }),
                          this.anim.addKeyframe(this.imageSequences[e].canvas, {
                            start: 'a0t + ' + t[0].start + 'vh',
                            end: 'a0t + ' + t[0].end + 'vh',
                            scale: ['100vh/h', '100vh/h'],
                            anchors: [this.el],
                            disabledWhen: ['landscape'],
                            breakpointMask: 'XLM',
                          })),
                        0 !== e)
                      ) {
                        var n = t[t.length - 1].canvasExtendTiming || 0;
                        this.anim.addKeyframe(this.imageSequences[e].canvas, {
                          start: 'a0t + ' + t[0].start + 'vh',
                          end: 'a0t + ' + t[t.length - 1].end + 'vh + ' + n + 'vh',
                          scale: ['100vw/w', '100vw/w'],
                          anchors: [this.el],
                          disabledWhen: ['no-scale'],
                          breakpointMask: 'S',
                        });
                      }
                      if (
                        (0 === e &&
                          (this.anim.addKeyframe(this.imageSequences[e].canvas, {
                            start: 'a0t',
                            end: 'a0t + ' + t[1].end + 'vh',
                            scale: [
                              'min(100vh/h - 52px/50vh, 1.3)',
                              'min(100vh/h - 52px/50vh, 1.3) - 0.2',
                            ],
                            anchors: [this.el],
                            breakpointMask: 'XL',
                            disabledWhen: ['portrait'],
                          }),
                          this.anim.addKeyframe(this.imageSequences[e].canvas, {
                            start: 'a0t',
                            end: 'a0t + ' + t[1].end + 'vh',
                            scale: [
                              'min(100vw/w - 52px/50vh, 1.3)',
                              'min(100vw/w - 52px/50vh, 1.3) - 0.2',
                            ],
                            anchors: [this.el],
                            breakpointMask: 'XL',
                            disabledWhen: ['landscape'],
                          }),
                          this.anim.addKeyframe(this.imageSequences[e].canvas, {
                            start: 'a0t',
                            end: 'a0t + ' + t[1].end + 'vh',
                            scale: [
                              'max(100vw/w - 52px/50vh, 0.95)',
                              'max(100vw/w - 52px/50vh, 0.95) - 0.2',
                            ],
                            anchors: [this.el],
                            breakpointMask: 'M',
                            disabledWhen: ['landscape'],
                          }),
                          this.anim.addKeyframe(this.imageSequences[e].canvas, {
                            start: 'a0t',
                            end: 'a0t + ' + t[1].end + 'vh',
                            scale: [
                              'max(100vw/w - 52px/50vh, 1.3)',
                              'min(100vw/w - 52px/50vh, 1.3) - 0.2',
                            ],
                            anchors: [this.el],
                            breakpointMask: 'M',
                            disabledWhen: ['portrait'],
                          }),
                          this.anim.addKeyframe(this.imageSequences[e].canvas, {
                            start: 'a0t',
                            end: 'a0t + ' + t[1].end + 'vh',
                            scale: [1, 1.2],
                            anchors: [this.el],
                            breakpointMask: 'S',
                          })),
                        2 === e &&
                          (this.isSmall ||
                            (this.anim.addKeyframe(this.imageSequences[e].canvas, {
                              start: 'a0t + ' + t[1].end + 'vh - 80vh',
                              end: 'a0t + ' + t[1].end + 'vh - 50vh',
                              scale: ['100vw/w', 1],
                              anchors: [this.el],
                              disabledWhen: ['portrait'],
                              breakpointMask: 'XL',
                            }),
                            this.anim.addKeyframe(this.imageSequences[e].canvas, {
                              start: 'a0t + ' + t[1].end + 'vh - 80vh',
                              end: 'a0t + ' + t[1].end + 'vh - 50vh',
                              scale: ['100vh/h', 1],
                              anchors: [this.el],
                              disabledWhen: ['landscape'],
                              breakpointMask: 'XL',
                            }),
                            this.anim.addKeyframe(this.imageSequences[e].canvas, {
                              start: 'a0t + ' + t[1].end + 'vh - 80vh',
                              end: 'a0t + ' + t[1].end + 'vh - 50vh',
                              scale: ['100vw/w', 1.1],
                              anchors: [this.el],
                              disabledWhen: ['portrait'],
                              breakpointMask: 'M',
                            }),
                            this.anim.addKeyframe(this.imageSequences[e].canvas, {
                              start: 'a0t + ' + t[1].end + 'vh - 80vh',
                              end: 'a0t + ' + t[1].end + 'vh - 50vh',
                              scale: ['100vh/h', 1.1],
                              anchors: [this.el],
                              disabledWhen: ['landscape'],
                              breakpointMask: 'M',
                            })),
                          this.anim.addKeyframe(this.imageSequences[e].canvas, {
                            start: 'a0t + ' + t[0].start + 'vh',
                            end: 'a0t + ' + t[0].end + 'vh',
                            scale: ['100vw/w', '100vw/w'],
                            anchors: [this.el],
                            disabledWhen: ['no-scale'],
                            breakpointMask: 'S',
                          }),
                          this.anim.addKeyframe(this.imageSequences[e].canvas, {
                            start: 'a0t + ' + t[0].start + 'vh + 100vh',
                            end: 'a0t + ' + t[0].start + 'vh + 120vh',
                            opacity: [1, 0.3],
                            anchors: [this.el],
                            breakpointMask: 'S',
                          }),
                          this.anim.addKeyframe(this.imageSequences[e].canvas, {
                            start: 'a0t + ' + t[0].start + 'vh + 210vh',
                            end: 'a0t + ' + t[0].start + 'vh + 230vh',
                            opacity: [0.3, 1],
                            anchors: [this.el],
                            breakpointMask: 'S',
                          }),
                          this.anim.addKeyframe(this.imageSequences[e].canvas, {
                            start: 'a0t + ' + t[0].end + 'vh - 40vh',
                            end: 'a0t + ' + t[0].end + 'vh - 10vh',
                            y: [0, '-7vh'],
                            anchors: [this.el],
                            breakpointMask: 'S',
                          })),
                        3 === e &&
                          (this.anim.addKeyframe(this.imageSequences[e].canvas, {
                            start: 'a0t + ' + t[0].start + 'vh',
                            end: 'a0t + ' + t[0].end + 'vh',
                            scale: [1.1, 1.1],
                            anchors: [this.el],
                            breakpointMask: 'M',
                          }),
                          this.anim.addKeyframe(this.imageSequences[e].canvas, {
                            start: 'a0t + ' + t[0].start + 'vh - ' + t[0].buffer + 'vh',
                            end: 'a0t + ' + t[0].start + 'vh - ' + t[0].buffer + 'vh + 10vh',
                            opacity: [1, 0.3],
                            anchors: [this.el],
                            breakpointMask: 'S',
                          }),
                          this.anim.addKeyframe(this.imageSequences[e].canvas, {
                            start: 'a0t + ' + t[0].start + 'vh - 10vh',
                            end: 'a0t + ' + t[0].start + 'vh',
                            opacity: [0.3, 1],
                            anchors: [this.el],
                            breakpointMask: 'S',
                          }),
                          this.anim.addKeyframe(this.imageSequences[e].canvas, {
                            start: 'a0t + ' + t[0].start + 'vh',
                            end: 'a0t + ' + t[0].end + 'vh',
                            y: ['-7vh', '-7vh'],
                            anchors: [this.el],
                            breakpointMask: 'S',
                          })),
                        4 === e &&
                          (this.anim.addKeyframe(this.imageSequences[e].canvas, {
                            start: 'a0t + ' + t[0].start + 'vh',
                            end: 'a0t + ' + t[0].end + 'vh',
                            scale: [1.1, 1.1],
                            anchors: [this.el],
                            breakpointMask: 'M',
                          }),
                          this.anim.addKeyframe(this.imageSequences[e].canvas, {
                            start: 'a0t + ' + t[1].start + 'vh + 20vh',
                            end: 'a0t + ' + t[1].start + 'vh + 40vh',
                            scale: [1.1, 1],
                            anchors: [this.el],
                            breakpointMask: 'M',
                          }),
                          this.anim.addKeyframe(this.imageSequences[e].canvas, {
                            start: 'a0t + ' + t[1].start + 'vh - 70vh',
                            end: 'a0t + ' + t[1].start + 'vh - 50vh',
                            opacity: [1, 0.3],
                            anchors: [this.el],
                            breakpointMask: 'XLM',
                          }),
                          this.anim.addKeyframe(this.imageSequences[e].canvas, {
                            start: 'a0t + ' + t[1].start + 'vh + 30vh',
                            end: 'a0t + ' + t[1].start + 'vh + 50vh',
                            opacity: [0.3, 1],
                            anchors: [this.el],
                            breakpointMask: 'XLM',
                          }),
                          this.anim.addKeyframe(this.imageSequences[e].canvas, {
                            start: 'a0t + ' + t[0].start + 'vh',
                            end: 'a0t + ' + t[0].start + 'vh + 20vh',
                            opacity: [1, 0.3],
                            anchors: [this.el],
                            breakpointMask: 'S',
                          }),
                          this.anim.addKeyframe(this.imageSequences[e].canvas, {
                            start: 'a0t + ' + t[0].end + 'vh - 20vh',
                            end: 'a0t + ' + t[0].end + 'vh',
                            opacity: [0.3, 1],
                            anchors: [this.el],
                            breakpointMask: 'S',
                          }),
                          this.anim.addKeyframe(this.imageSequences[e].canvas, {
                            start: 'a0t + ' + t[2].end + 'vh - 10vh',
                            end: 'a0t + ' + t[2].end + 'vh',
                            opacity: [1, 0],
                            anchors: [this.el],
                          }),
                          this.anim.addKeyframe(this.imageSequences[e].canvas, {
                            start: 'a0t + ' + t[0].start + 'vh',
                            end: 'a0t + ' + t[2].end + 'vh',
                            y: ['-7vh', '-7vh'],
                            anchors: [this.el],
                            breakpointMask: 'S',
                          }),
                          this.anim.addKeyframe(this.imageSequences[e].canvas, {
                            start: 'a0t + ' + t[1].start + 'vh + 20vh',
                            end: 'a0t + ' + t[1].end + 'vh - 10vh',
                            scale: [1, 0.9],
                            anchors: [this.el],
                            breakpointMask: 'S',
                          }),
                          this.gum.addComponent({
                            componentName: 'WaveAnimation',
                            el: document.querySelector('.section-anc .wave-animation'),
                            data: t,
                          })),
                        6 === e)
                      ) {
                        this.anim.addKeyframe(this.imageSequences[e].canvas, {
                          start: 'a0t + ' + t[0].start + 'vh - 100vh',
                          end: 'a0t + ' + t[0].start + 'vh + css(height)',
                          scale: [1.2, 1.2],
                          x: [-120, -120],
                          y: ['css(height)/2 + 50vh', 0],
                          anchors: [this.el],
                          easeFunction: 'easeInSin',
                          breakpointMask: 'XL',
                        }),
                          this.anim.addKeyframe(this.imageSequences[e].canvas, {
                            start: 'a0t + ' + t[0].start + 'vh - 100vh',
                            end: 'a0t + ' + t[0].start + 'vh + css(height)',
                            scale: [1.2, 1.2],
                            x: [-80, -80],
                            y: ['css(height)/2 + 50vh', 0],
                            anchors: [this.el],
                            easeFunction: 'easeInSin',
                            breakpointMask: 'M',
                          }),
                          this.anim.addKeyframe(this.imageSequences[e].canvas, {
                            start: 'a0t + ' + t[0].start + 'vh - 150vh',
                            end: 'a0t + ' + t[0].start + 'vh + css(height) - 50vh',
                            y: ['css(height)', 0],
                            anchors: [this.el],
                            breakpointMask: 'S',
                          }),
                          this.anim.addKeyframe(this.imageSequences[e].canvas, {
                            start: 'a0t + ' + t[1].start + 'vh + 5vh',
                            end: 'a0t + ' + t[1].end + 'vh',
                            scale: [1.2, 1],
                            x: [-120, 0],
                            anchors: [this.el],
                            breakpointMask: 'XL',
                          }),
                          this.anim.addKeyframe(this.imageSequences[e].canvas, {
                            start: 'a0t + ' + t[1].start + 'vh + 5vh',
                            end: 'a0t + ' + t[1].end + 'vh',
                            scale: [1.2, 1],
                            x: [-80, 0],
                            anchors: [this.el],
                            breakpointMask: 'M',
                          });
                        var i = this.animKeyframes[e][0],
                          a = this.animKeyframes[e][1],
                          o = this.isSmall
                            ? 'css(height, a1)*0.75 - 40vh'
                            : 'css(height, a1) - 10vh';
                        i.overwriteProps({
                          start: i.jsonProps.start,
                          end: i.jsonProps.start + ' + ' + o,
                          anchors: [this.el, this.imageSequences[e].canvas],
                        }),
                          a.overwriteProps({
                            start: i.jsonProps.start + ' + ' + o,
                            end: a.jsonProps.end,
                            anchors: [this.el, this.imageSequences[e].canvas],
                          }),
                          this.gum.addComponent({
                            componentName: 'QualityCopy',
                            el: document.querySelector('.section-quality'),
                            data: t,
                          });
                      }
                      7 === e &&
                        (this.anim.addKeyframe(this.imageSequences[e].canvas, {
                          start: 'a0t + ' + t[0].end + 'vh + 70vh',
                          end: 'a0t + ' + t[0].end + 'vh + 80vh',
                          opacity: [1, 0.3],
                          anchors: [this.el],
                          breakpointMask: 'XLM',
                        }),
                        this.anim.addKeyframe(this.imageSequences[e].canvas, {
                          start: 'a0t + ' + t[2].start + 'vh - 10vh',
                          end: 'a0t + ' + t[2].start + 'vh',
                          opacity: [0.3, 1],
                          anchors: [this.el],
                          breakpointMask: 'XLM',
                        }),
                        this.anim.addKeyframe(this.imageSequences[e].canvas, {
                          start: 'a0t + ' + t[0].start + 'vh + 38vh',
                          end: 'a0t + ' + t[0].end + 'vh',
                          scale: [1, 0.8],
                          y: [0, 100],
                          anchors: [this.el],
                          breakpointMask: 'S',
                        }),
                        this.anim.addKeyframe(this.imageSequences[e].canvas, {
                          start: 'a0t + ' + t[0].end + 'vh + 40vh',
                          end: 'a0t + ' + t[0].end + 'vh + 50vh',
                          opacity: [1, 0.3],
                          anchors: [this.el],
                          breakpointMask: 'S',
                        }),
                        this.anim.addKeyframe(this.imageSequences[e].canvas, {
                          start: 'a0t + ' + t[2].start + 'vh - 20vh',
                          end: 'a0t + ' + t[2].start + 'vh',
                          opacity: [0.3, 1],
                          anchors: [this.el],
                          breakpointMask: 'S',
                        }),
                        this.anim.addKeyframe(this.imageSequences[e].canvas, {
                          start: 'a0t + ' + t[0].end + 'vh + 40vh',
                          end: 'a0t + ' + t[0].end + 'vh + 80vh',
                          scale: [0.8, 1],
                          y: [100, 0],
                          anchors: [this.el],
                          breakpointMask: 'S',
                        })),
                        8 === e &&
                          (this.anim.addKeyframe(this.imageSequences[e].canvas, {
                            start: 'a0t + ' + t[0].start + 'vh + 10vh',
                            end: 'a0t + ' + t[0].start + 'vh + 20vh',
                            scale: [1, '100vh/h'],
                            ease: 0.8,
                            anchors: [this.el],
                            disabledWhen: ['landscape', 'no-scale'],
                          }),
                          this.anim.addKeyframe(this.imageSequences[e].canvas, {
                            start: 'a0t + ' + t[0].start + 'vh + 10vh',
                            end: 'a0t + ' + t[0].start + 'vh + 20vh',
                            scale: [1, '100vw/w'],
                            ease: 0.8,
                            anchors: [this.el],
                            disabledWhen: ['portrait', 'no-scale'],
                          }),
                          this.anim.addKeyframe(this.imageSequences[e].canvas, {
                            start: 'a0t + ' + t[0].end + 'vh - 10vh',
                            end: 'a0t + ' + t[0].end + 'vh + 25vh',
                            y: [0, '20vh'],
                            ease: 0.8,
                            anchors: [this.el],
                            breakpointMask: 'XLM',
                          })),
                        9 === e &&
                          (this.anim.addKeyframe(this.imageSequences[e].canvas, {
                            start: 'a0t + ' + t[0].start + 'vh - 20vh',
                            end: 'a0t + ' + t[0].start + 'vh + 25vh',
                            y: ['20vh', 0],
                            anchors: [this.el],
                            easeFunction: 'easeOutQuad',
                            breakpointMask: 'XLM',
                          }),
                          this.anim.addKeyframe(this.imageSequences[e].canvas, {
                            start: 'a0t + ' + t[0].start + 'vh + 60vh',
                            end: 'a0t + ' + t[0].start + 'vh + 80vh',
                            opacity: [1, 0.3],
                            anchors: [this.el],
                            breakpointMask: 'S',
                          }),
                          this.anim.addKeyframe(this.imageSequences[e].canvas, {
                            start: 'a0t + ' + t[1].start + 'vh - 20vh',
                            end: 'a0t + ' + t[1].start + 'vh',
                            opacity: [0.3, 1],
                            anchors: [this.el],
                            breakpointMask: 'S',
                          }),
                          this.isSmall ||
                            this.anim.addKeyframe(this.imageSequences[e].canvas, {
                              start: 'a0t + ' + t[3].end + 'vh + 20vh',
                              end: 'a0t + ' + t[3].end + 'vh + 30vh',
                              opacity: [1, 0],
                              anchors: [this.el],
                              breakpointMask: 'XLM',
                            }),
                          this.anim.addKeyframe(this.imageSequences[e].canvas, {
                            start: 'a0t + ' + t[2].end + 'vh',
                            end: 'a0t + ' + t[2].end + 'vh + 20vh',
                            opacity: [1, 0],
                            anchors: [this.el],
                            breakpointMask: 'S',
                          }),
                          this.anim.addKeyframe(this.imageSequences[e].canvas, {
                            start: 'a0t + ' + t[0].start + 'vh',
                            end: 'a0t + ' + t[0].end + 'vh',
                            scale: ['100vw/w', '100vw/w'],
                            anchors: [this.el],
                            disabledWhen: ['portrait'],
                            breakpointMask: 'XLM',
                          }),
                          this.anim.addKeyframe(this.imageSequences[e].canvas, {
                            start: 'a0t + ' + t[0].start + 'vh',
                            end: 'a0t + ' + t[0].end + 'vh',
                            scale: ['100vh/h', '100vh/h'],
                            anchors: [this.el],
                            disabledWhen: ['landscape'],
                            breakpointMask: 'XLM',
                          }),
                          this.anim.addKeyframe(this.imageSequences[e].canvas, {
                            start: 'a0t + ' + t[0].end + 'vh + 6vh',
                            end: 'a0t + ' + t[0].end + 'vh + 7vh',
                            scale: [1, 1],
                            anchors: [this.el],
                            breakpointMask: 'XLM',
                          }),
                          this.anim.addKeyframe(this.imageSequences[e].canvas.parentElement, {
                            start: 'a0t + ' + t[2].start + 'vh',
                            end: 'a0t + ' + t[2].end + 'vh',
                            cssClass: 'scrim',
                            toggle: !0,
                            anchors: [this.el],
                            breakpointMask: 'XLM',
                          }),
                          this.anim.addKeyframe(this.imageSequences[e].canvas, {
                            start: 'a0t + ' + t[2].end + 'vh - 20vh',
                            end: 'a0t + ' + t[2].end + 'vh - 5vh',
                            y: [0, 0],
                            anchors: [this.el],
                            breakpointMask: 'M',
                          }),
                          this.anim.addKeyframe(this.imageSequences[e].canvas, {
                            start: 'a0t + ' + t[1].end + 'vh - 20vh',
                            end: 'a0t + ' + t[1].end + 'vh',
                            y: [0, '-5vh'],
                            anchors: [this.el],
                            breakpointMask: 'S',
                          }));
                      var s = 0,
                        p = 0;
                      t[t.length - 1].canvasExtendTiming &&
                        (s = t[t.length - 1].canvasExtendTiming),
                        t[0].canvasPrependTiming && (p = t[0].canvasPrependTiming),
                        this.addDiscreteEvent({
                          el: this.imageSequences[e],
                          start: 'a0t + ' + t[0].start + 'vh - ' + p + 'vh',
                          end: 'a0t + ' + t[t.length - 1].end + 'vh + ' + s + 'vh',
                          event: 'canvas-to-front',
                          anchors: [this.el],
                          onEnter: function(t) {
                            (r.imageSequences[e].canvas.parentElement.style.zIndex =
                              r.buckets.length + 1),
                              (r.imageSequences[e].canvas.parentElement.style.opacity = 1);
                          },
                          onExit: function(t) {
                            (r.imageSequences[e].canvas.parentElement.style.zIndex =
                              '' + (r.buckets.length - e)),
                              (r.imageSequences[e].canvas.parentElement.style.opacity = 0);
                          },
                        });
                    },
                  },
                  {
                    key: 'initBucketKeyframes',
                    value: function() {
                      var e = this;
                      this.buckeyKeyframes = new Array(this.buckets.length);
                      for (
                        var t = function(t, r) {
                            var n = h[t][0].canvasPrependTiming
                                ? 'a0t + ' +
                                  h[t][0].start +
                                  'vh - ' +
                                  h[t][0].canvasPrependTiming +
                                  ' - 20vh'
                                : 'a0t + ' + h[t][0].start + 'vh - 25vh - 20vh',
                              i = h[t][h[t].length - 1].canvasExtendTiming
                                ? 'a0t + ' +
                                  h[t][h[t].length - 1].end +
                                  'vh + ' +
                                  h[t][h[t].length - 1].canvasExtendTiming +
                                  ' - 20vh'
                                : 'a0t + ' + h[t][h[t].length - 1].end + 'vh - 25vh - 20vh';
                            e.buckeyKeyframes[t] = e.addDiscreteEvent({
                              el: e.imageSequences[t],
                              start: n,
                              end: i,
                              event: 'update-current-bucket',
                              anchors: [e.el],
                              onEnter: function(r) {
                                e.imageLoadingManager.currentBucket = t;
                              },
                            });
                          },
                          r = 0,
                          n = this.buckets.length;
                        r < n;
                        r++
                      )
                        t(r, n);
                    },
                  },
                  {
                    key: 'appendCanvas',
                    value: function(e) {
                      var t = document.createElement('div');
                      t.classList.add('canvas-wrapper'),
                        t.classList.add('wrapper-' + (e.bucket + 1)),
                        t.appendChild(this.imageSequences[e.bucket].canvas),
                        this.imageSequences[e.bucket].setSize(
                          m[this.currentViewport].width,
                          m[this.currentViewport].height
                        ),
                        this.canvasContainer.appendChild(t);
                    },
                  },
                  {
                    key: 'mounted',
                    value: function() {
                      var e = this;
                      this.gum.addComponent({
                        componentName: 'FocusHandler',
                        el: document.querySelector('.main'),
                      }),
                        this.imageLoadingManager.on(l.FIRST_IMAGE_LOADED, function(t) {
                          (e.imageSequences[t.bucket].images =
                            e.imageLoadingManager.images[t.bucket]),
                            e.appendCanvas(t),
                            0 === t.bucket &&
                              document.querySelector('.section-hero').classList.add('animate');
                        }),
                        this.imageLoadingManager.on(l.CAN_PLAY_THROUGH, function(t) {
                          if (!e.fallback) {
                            var r = [];
                            h[t].forEach(function(n) {
                              r.push(e.initAnimation(t, n));
                            }),
                              (e.animKeyframes[t] = r),
                              e.initZindexKeyframes(t, h[t]),
                              e.imageSequences[t].canvas.setAttribute(
                                'data-analytics-section-engagement',
                                'name:' + e.imageSequences[t].friendlyName + ',isActive:false'
                              ),
                              e.gum.addComponent({
                                componentName: 'SectionAnalytics',
                                el: e.imageSequences[t].canvas,
                                data: {
                                  sequenceKeyframe: e.animKeyframes[t],
                                  sectionName: e.buckets[t].sectionName,
                                  imagesLeftToLoad: e.imageLoadingManager.imagesLeftToLoad[t],
                                  totalImages: e.buckets[t].numImages,
                                  padding: v,
                                  bucketPath: e.buckets[t].path,
                                },
                              });
                          }
                        }),
                        this.imageLoadingManager.once(l.PRIORITY_LOADING_COMPLETE, function(t) {
                          e.initBucketKeyframes(),
                            (e.imageLoadingManager.dynamicBucketLoading = !0);
                          for (var r = 24, i = 0; i < r; i++)
                            e.imageLoadingManager.loadImage(
                              e.imageLoadingManager.imagesLeftToLoad[0].shift(),
                              0,
                              !1
                            );
                          var a = [].concat(
                            n(document.querySelectorAll('[data-analytics-section-custom]'))
                          );
                          a.forEach(function(t) {
                            e.gum.addComponent({
                              componentName: 'SectionAnalytics',
                              el: t,
                              sectionName: t.dataset.analyticsSectionCustom,
                            });
                          });
                        }),
                        this.imageLoadingManager.once(l.LOADING_COMPLETE, function(t) {
                          for (var r = 0, n = e.buckets.length; r < n; r++)
                            e.buckeyKeyframes[r].remove();
                        }),
                        this.imageLoadingManager.loadPriorityImages(),
                        setTimeout(function() {
                          e.imageLoadingManager.priorityQueue[0].priorityFramesLoaded ||
                            e.switchToFallback();
                        }, 3e3);
                    },
                  },
                  {
                    key: 'setOrientationClass',
                    value: function(e) {
                      e.windowWidth / e.windowHeight > 16 / 9
                        ? (document.documentElement.classList.add('landscape'),
                          document.documentElement.classList.remove('portrait'))
                        : (document.documentElement.classList.remove('landscape'),
                          document.documentElement.classList.add('portrait')),
                        'S' === e.breakpoint && e.windowWidth <= 414
                          ? document.documentElement.classList.add('no-scale')
                          : document.documentElement.classList.remove('no-scale'),
                        this.anim.forceUpdate();
                    },
                  },
                  {
                    key: 'checkForFallback',
                    value: function(e) {
                      var t = 'L' === e.breakpoint || 'X' === e.breakpoint,
                        r = 'M' === e.breakpoint,
                        n = 'S' === e.breakpoint;
                      (((t || r) && e.windowHeight < d.MIN_HEIGHT_LARGE) ||
                        (r && e.windowHeight > d.MAX_HEIGHT_MEDIUM) ||
                        (n &&
                          (e.windowWidth > d.MAX_WIDTH_SMALL ||
                            e.windowWidth < d.MIN_WIDTH_SMALL ||
                            e.windowHeight > d.MAX_HEIGHT_SMALL))) &&
                        this.switchToFallback();
                    },
                  },
                  {
                    key: 'applyfallbackClasses',
                    value: function() {
                      document.documentElement.classList.add('fallback'),
                        document.documentElement.classList.remove('no-fallback'),
                        document.body.classList.remove('lights-on'),
                        this.localnav.classList.add('ac-localnav-dark'),
                        document.querySelector('.section-hero').classList.add('animate');
                    },
                  },
                  {
                    key: 'initiateFallbackTracking',
                    value: function() {
                      (f.section.options.dataAttribute = 'analytics-fallback-section-engagement'),
                        j(f.section),
                        f.analytics.passiveTracker(
                          { eVar70: 'fallback' },
                          { overwriteStorageItem: !0 }
                        );
                    },
                  },
                  {
                    key: 'switchToFallback',
                    value: function() {
                      (this.fallback = !0),
                        this.applyfallbackClasses(),
                        this.imageLoadingManager.stop();
                      var e = document.querySelectorAll('[data-component-list="CopyMagic"]');
                      e.forEach(function(e) {
                        return (e.style.height = null);
                      }),
                        this.anim.remove()['catch'](function(e) {}),
                        this.initiateFallbackTracking();
                    },
                  },
                  {
                    key: 'onBreakpointChange',
                    value: function(e) {
                      ('large' !== this.currentViewport ||
                        ('L' !== e.breakpoint && 'X' !== e.breakpoint)) &&
                        this.switchToFallback();
                    },
                  },
                  {
                    key: 'onResizeDebounced',
                    value: function(e) {
                      this.setOrientationClass(e), this.checkForFallback(e);
                    },
                  },
                ],
                [
                  {
                    key: 'IS_SUPPORTED',
                    value: function() {
                      return !document.documentElement.classList.contains('fallback');
                    },
                  },
                ]
              ),
              t
            );
          })(c);
        t.exports = E;
      },
      {
        '../overview/analytics': 192,
        '../overview/constants': 193,
        '../overview/initializeNormalSectionEngagement': 194,
        '../overview/sizes': 196,
        './ImageLoadingManager': 180,
        './ImageSequencePlayer': 181,
        './sequence/timings': 190,
        '@marcom/bubble-gum/BaseComponent': 119,
        '@marcom/useragent-detect': 128,
      },
    ],
    185: [
      function(e, t, r) {
        'use strict';
        function n(e, t) {
          if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
        }
        function i(e, t) {
          if (!e)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return !t || ('object' != typeof t && 'function' != typeof t) ? e : t;
        }
        function a(e, t) {
          if ('function' != typeof t && null !== t)
            throw new TypeError(
              'Super expression must either be null or a function, not ' + typeof t
            );
          (e.prototype = Object.create(t && t.prototype, {
            constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 },
          })),
            t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : (e.__proto__ = t));
        }
        var o =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function(e) {
                  return typeof e;
                }
              : function(e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                },
          s = (function() {
            function e(e, t) {
              for (var r = 0; r < t.length; r++) {
                var n = t[r];
                (n.enumerable = n.enumerable || !1),
                  (n.configurable = !0),
                  'value' in n && (n.writable = !0),
                  Object.defineProperty(e, n.key, n);
              }
            }
            return function(t, r, n) {
              return r && e(t.prototype, r), n && e(t, n), t;
            };
          })(),
          p = e('@marcom/bubble-gum/BaseComponent'),
          c = e('../overview/analytics'),
          u = e('../overview/manifest.json'),
          g = (function(e) {
            function t(e) {
              n(this, t);
              var r = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
              return (
                (r._tracking = !1),
                (r._tracked = !1),
                (r._timeout = null),
                (r._end = r._end.bind(r)),
                (r._start = r._start.bind(r)),
                (r._engage = r._engage.bind(r)),
                (r.options = r._setOptions(e)),
                (r.data = {
                  eVar201: '%ImagesOnEnter',
                  eVar202: '%ImagesOnExit',
                  eVar203: '%FileSizeOnEnter',
                  eVar204: '%FileSizeOnExit',
                  eVar206: 'D=pageName',
                }),
                (r.currentViewport = r.getViewportFullName(e.pageMetrics.breakpoint)),
                r
              );
            }
            return (
              a(t, e),
              s(
                t,
                [
                  {
                    key: '_setOptions',
                    value: function(e) {
                      var t = {};
                      return (
                        e &&
                          e.data &&
                          Object.keys(e.data).forEach(function(r) {
                            t[r] = e.data[r];
                          }),
                        t
                      );
                    },
                  },
                  {
                    key: '_start',
                    value: function() {
                      this._timeout ||
                        this._tracked ||
                        (this._timeout = setTimeout(this._engage, 1e3));
                    },
                  },
                  {
                    key: '_end',
                    value: function() {
                      this._tracked ||
                        (this._timeout && this._clearTimeout(),
                        this._tracking && this._disengage());
                    },
                  },
                  {
                    key: '_engage',
                    value: function() {
                      (this._tracking = !0), c.section.startSectionEngagement(this.el);
                    },
                  },
                  {
                    key: '_disengage',
                    value: function() {
                      (this._tracked = !0),
                        c.analytics.passiveTracker(
                          {
                            eVar200: 'D=prop34',
                            eVar201: '' + this.data.eVar201,
                            eVar202: '' + this.data.eVar202,
                            eVar203: '' + this.data.eVar203,
                            eVar204: '' + this.data.eVar204,
                            eVar206: '' + this.data.eVar206,
                            events:
                              'event382=' +
                              this.data.eVar201 +
                              ',event383=' +
                              this.data.eVar202 +
                              ',event384=' +
                              this.data.eVar203 +
                              ',event385=' +
                              this.data.eVar204,
                          },
                          { overwriteAppMeasurementValues: !0 }
                        ),
                        c.section.endSectionEngagement(this.el);
                    },
                  },
                  {
                    key: '_clearTimeout',
                    value: function() {
                      clearTimeout(this._timeout), (this._timeout = null);
                    },
                  },
                  {
                    key: 'calcPercentage',
                    value: function(e) {
                      return Math.round(100 * (1 - e / this.options.totalImages));
                    },
                  },
                  {
                    key: 'getBucketFileSizeOnEnterAndExit',
                    value: function(e) {
                      var t = this,
                        r = e.reduce(function(e, r) {
                          var n = String(r).padStart(t.options.padding, '0');
                          return (
                            e +
                            parseInt(u[t.currentViewport][t.options.bucketPath].assets[n + '.jpg'])
                          );
                        }, 0);
                      return parseInt(
                        u[this.currentViewport][this.options.bucketPath].totalSize - r
                      );
                    },
                  },
                  {
                    key: 'mounted',
                    value: function() {
                      var e = this;
                      if (
                        (c.section.addSection(this.el),
                        c.section.initializeSection(this.el),
                        this.options.sequenceKeyframe)
                      ) {
                        c.analytics.passiveTracker({ eVar70: 'enhanced' });
                        var t = this.options.sequenceKeyframe[0],
                          r = this.options.sequenceKeyframe[
                            this.options.sequenceKeyframe.length - 1
                          ];
                        this.addDiscreteEvent({
                          start: t.jsonProps.start,
                          anchors: t.jsonProps.anchors,
                          event: this.sectionName + '-analytics:start',
                          onEvent: function(t) {
                            (e.data.eVar201 = e.calcPercentage(e.options.imagesLeftToLoad.length)),
                              (e.data.eVar203 = e.getBucketFileSizeOnEnterAndExit(
                                e.options.imagesLeftToLoad
                              )),
                              e._start();
                          },
                        }),
                          this.addDiscreteEvent({
                            start: r.jsonProps.end,
                            anchors: t.jsonProps.anchors,
                            event: this.sectionName + '-analytics:end',
                            onEvent: function(t) {
                              (e.data.eVar202 = e.calcPercentage(
                                e.options.imagesLeftToLoad.length
                              )),
                                (e.data.eVar204 = e.getBucketFileSizeOnEnterAndExit(
                                  e.options.imagesLeftToLoad
                                )),
                                e._end();
                            },
                          });
                      }
                    },
                  },
                  {
                    key: 'onBreakpointChange',
                    value: function(e) {
                      this.currentViewport !== e.breakpoint &&
                        (this.currentViewport = this.getViewportFullName(e.breakpoint));
                    },
                  },
                  {
                    key: 'getViewportFullName',
                    value: function(e) {
                      return { X: 'large', L: 'large', M: 'medium', S: 'small' }[e];
                    },
                  },
                ],
                [
                  {
                    key: 'IS_SUPPORTED',
                    value: function() {
                      return 'object' === o(c.section);
                    },
                  },
                ]
              ),
              t
            );
          })(p);
        t.exports = g;
      },
      {
        '../overview/analytics': 192,
        '../overview/manifest.json': 195,
        '@marcom/bubble-gum/BaseComponent': 119,
      },
    ],
    186: [
      function(e, t, r) {
        'use strict';
        function n(e, t) {
          if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
        }
        function i(e) {
          var t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
          return t ? [parseInt(t[1], 16), parseInt(t[2], 16), parseInt(t[3], 16)] : null;
        }
        var a = (function() {
            function e(e, t) {
              for (var r = 0; r < t.length; r++) {
                var n = t[r];
                (n.enumerable = n.enumerable || !1),
                  (n.configurable = !0),
                  'value' in n && (n.writable = !0),
                  Object.defineProperty(e, n.key, n);
              }
            }
            return function(t, r, n) {
              return r && e(t.prototype, r), n && e(t, n), t;
            };
          })(),
          o = e('@marcom/ac-shader-player-2d').ShaderPlayer2D,
          s = e('./../waves/fragShader'),
          p = (function() {
            function e(t, r, i, a, p) {
              var c = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 65;
              n(this, e),
                (this.el = t),
                (this.textures = i),
                (this.animate = this.animate.bind(this)),
                (this.setTapering = this.setTapering.bind(this)),
                (this.opts = r[1]);
              var u = this.opts.height,
                g = this.opts.width;
              p
                ? ((g = this.opts.width / 2),
                  (u = this.opts.height / 2),
                  a && (u = this.opts.height / 4))
                : a && (u = this.opts.height / 2),
                (this.frameRate = 1e3 / c),
                (this.previousTime = 0),
                (this.shaderValues = Object.values(r)),
                this.shaderValues.shift();
              var l = {};
              (i = {}),
                (l.showInverse = { type: 'bool', value: a ? 1 : 0 }),
                (l.taperIn = { type: 'float', value: 0 }),
                (l.taperOut = { type: 'float', value: 0 }),
                (l.waveColor = {
                  type: 'vec4',
                  value: this.getNormalizedColor(this.opts.waveColor),
                }),
                (l.inverseColor = {
                  type: 'vec4',
                  value: this.getNormalizedColor(this.opts.inverseColor),
                }),
                this.shaderValues.forEach(function(e, t) {
                  for (var r in e) l['' + r + (t + 1)] = { type: 'float', value: e[r] };
                }),
                this.textures.forEach(function(e, t) {
                  i['slitTex' + (t + 1)] = {
                    name: e,
                    extension: 'jpeg',
                    ignoreBreakpoint: !0,
                    retina: !1,
                  };
                }),
                (this.shaderPlayer = new o({
                  fragmentShader: s,
                  antialias: !0,
                  sizes: { defaults: { width: g, height: u } },
                  uniforms: l,
                  textures: i,
                })),
                this.shaderPlayer.setBasePath(
                  window.location.origin +
                    '/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/textures'
                ),
                this.shaderPlayer.on(
                  'textures-complete',
                  function() {
                    this.shaderPlayer.run(),
                      this.animate(),
                      this.shaderPlayer.trigger('wave-ready');
                  }.bind(this)
                ),
                this.shaderPlayer.on(
                  'update',
                  function(e) {
                    var t = (e.time / 5e3) % 1;
                    this.shaderPlayer.setUniform('progress', t);
                  }.bind(this)
                ),
                this.el.appendChild(this.shaderPlayer.el),
                this.shaderPlayer.load(),
                (this.count = 0);
            }
            return (
              a(e, [
                {
                  key: 'play',
                  value: function() {
                    this.shaderPlayer.run(), (this.isReady = !0);
                  },
                },
                {
                  key: 'pause',
                  value: function() {
                    this.shaderPlayer.cancel(), (this.isReady = !1);
                  },
                },
                {
                  key: 'setTapering',
                  value: function(e, t) {
                    this.shaderPlayer.setUniform('taperIn', e),
                      this.shaderPlayer.setUniform('taperOut', t);
                  },
                },
                {
                  key: 'animate',
                  value: function() {
                    var e = void 0,
                      t = void 0;
                    this.isReady &&
                      ((e = Date.now()),
                      (t = e - this.previousTime),
                      t >= this.frameRate &&
                        ((this.count += this.opts.globalTimeScale / 100),
                        this.shaderPlayer.setUniform('time', this.count),
                        this.shaderPlayer.render(),
                        (this.previousTime = e))),
                      requestAnimationFrame(this.animate);
                  },
                },
                {
                  key: 'getNormalizedColor',
                  value: function(e) {
                    var t = i(e);
                    return (
                      (t = t.map(function(e) {
                        return e / 255;
                      })),
                      t.push(1),
                      t
                    );
                  },
                },
              ]),
              e
            );
          })();
        t.exports = p;
      },
      { './../waves/fragShader': 197, '@marcom/ac-shader-player-2d': 69 },
    ],
    187: [
      function(e, t, r) {
        'use strict';
        function n(e, t) {
          if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
        }
        function i(e, t) {
          if (!e)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return !t || ('object' != typeof t && 'function' != typeof t) ? e : t;
        }
        function a(e, t) {
          if ('function' != typeof t && null !== t)
            throw new TypeError(
              'Super expression must either be null or a function, not ' + typeof t
            );
          (e.prototype = Object.create(t && t.prototype, {
            constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 },
          })),
            t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : (e.__proto__ = t));
        }
        var o = (function() {
            function e(e, t) {
              for (var r = 0; r < t.length; r++) {
                var n = t[r];
                (n.enumerable = n.enumerable || !1),
                  (n.configurable = !0),
                  'value' in n && (n.writable = !0),
                  Object.defineProperty(e, n.key, n);
              }
            }
            return function(t, r, n) {
              return r && e(t.prototype, r), n && e(t, n), t;
            };
          })(),
          s = e('@marcom/bubble-gum/BaseComponent'),
          p = (function(e) {
            function t(e) {
              n(this, t);
              var r = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
              return (
                (r['case'] = r.el.querySelector('.image-airpods-pro-case')),
                (r.caseLight = document.querySelector('.case-light')),
                (r.screenLockup = r.el.querySelector('.screen-lockup')),
                (r.screens = Array.from(r.el.querySelectorAll('.device-screen'))),
                (r.anchorEl = document.querySelector('.section-experience .copy-scroll-container')),
                r
              );
            }
            return (
              a(t, e),
              o(
                t,
                [
                  {
                    key: 'mounted',
                    value: function() {
                      this.copyMagic = this.gum.getComponentOfType('CopyMagic', this.anchorEl);
                      var e = this.copyMagic.copyEls.length;
                      this.addKeyframe({
                        el: this['case'],
                        start: 'a0t + ' + this.copyMagic.timings[1] + 'vh - 20vh',
                        end: 'a0t + ' + this.copyMagic.timings[1] + 'vh',
                        opacity: [0, 1],
                        anchors: [this.anchorEl],
                      }),
                        this.addKeyframe({
                          el: this['case'],
                          start: 'a0t + ' + this.copyMagic.timings[1] + 'vh - 10vh',
                          end: 'a0t + ' + this.copyMagic.timings[1] + 'vh + 30vh',
                          scale: [1.1, 1],
                          anchors: [this.anchorEl],
                        }),
                        this.addKeyframe({
                          el: this.screenLockup,
                          start: 'a0t + ' + this.copyMagic.timings[1] + 'vh',
                          end: 'a0t + ' + this.copyMagic.timings[1] + 'vh + 20vh',
                          opacity: [0, 1],
                          anchors: [this.anchorEl],
                        });
                      for (var t = 2; t < e; t++)
                        this.addKeyframe({
                          el: this.screens[t - 1],
                          start: 'a0t + ' + this.copyMagic.timings[t] + 'vh',
                          cssClass: 'show',
                          toggle: !0,
                          anchors: [this.anchorEl],
                        }),
                          2 === t &&
                            this.addKeyframe({
                              el: this.caseLight,
                              start: 'a0t + ' + this.copyMagic.timings[t] + 'vh',
                              cssClass: 'go-green',
                              toggle: !0,
                              anchors: [this.anchorEl],
                            });
                      var r = this.anim.getControllerForTarget(this.copyMagic.copyEls[e - 1]),
                        n = r.getNearestKeyframeForAttribute('opacity', 1);
                      n.remove();
                      var i = r.getNearestKeyframeForAttribute('.active');
                      i.overwriteProps({ start: i.jsonProps.start, end: i.jsonProps.start });
                    },
                  },
                ],
                [
                  {
                    key: 'IS_SUPPORTED',
                    value: function() {
                      return !document.documentElement.classList.contains('fallback');
                    },
                  },
                ]
              ),
              t
            );
          })(s);
        t.exports = p;
      },
      { '@marcom/bubble-gum/BaseComponent': 119 },
    ],
    188: [
      function(e, t, r) {
        'use strict';
        function n(e, t) {
          if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
        }
        function i(e, t) {
          if (!e)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return !t || ('object' != typeof t && 'function' != typeof t) ? e : t;
        }
        function a(e, t) {
          if ('function' != typeof t && null !== t)
            throw new TypeError(
              'Super expression must either be null or a function, not ' + typeof t
            );
          (e.prototype = Object.create(t && t.prototype, {
            constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 },
          })),
            t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : (e.__proto__ = t));
        }
        function o(e) {
          return { X: 'xlarge', L: 'large', M: 'medium', S: 'small' }[e];
        }
        var s = (function() {
            function e(e, t) {
              var r = [],
                n = !0,
                i = !1,
                a = void 0;
              try {
                for (
                  var o, s = e[Symbol.iterator]();
                  !(n = (o = s.next()).done) && (r.push(o.value), !t || r.length !== t);
                  n = !0
                );
              } catch (p) {
                (i = !0), (a = p);
              } finally {
                try {
                  !n && s['return'] && s['return']();
                } finally {
                  if (i) throw a;
                }
              }
              return r;
            }
            return function(t, r) {
              if (Array.isArray(t)) return t;
              if (Symbol.iterator in Object(t)) return e(t, r);
              throw new TypeError('Invalid attempt to destructure non-iterable instance');
            };
          })(),
          p = (function() {
            function e(e, t) {
              for (var r = 0; r < t.length; r++) {
                var n = t[r];
                (n.enumerable = n.enumerable || !1),
                  (n.configurable = !0),
                  'value' in n && (n.writable = !0),
                  Object.defineProperty(e, n.key, n);
              }
            }
            return function(t, r, n) {
              return r && e(t.prototype, r), n && e(t, n), t;
            };
          })(),
          c = e('@marcom/bubble-gum/BaseComponent'),
          u = e('@marcom/viewport-emitter'),
          g = 3,
          l = (function(e) {
            function t(e) {
              n(this, t);
              var r = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
              if (
                ((r.video = r.el),
                (r.options = e.data || {}),
                (r.enableXLarge = r.el.hasAttribute('data-src-xlarge')),
                (r.enableRetina = r.el.hasAttribute('data-enable-retina')),
                r.enableRetina &&
                  ((r.isRetina = u._retina),
                  u.on('change:retina', function(e) {
                    (r.isRetina = e.to === !0), r.load(r.currentViewport);
                  })),
                (r.enablePortrait = r.el.hasAttribute('data-enable-portrait')),
                r.enablePortrait)
              ) {
                var a = u.orientation;
                r.video.parentElement.classList.add('video-' + a),
                  'portrait' === a && (r.isPortrait = !0),
                  u.on('change:orientation', function(e) {
                    (r.isPortrait = 'portrait' === e.to),
                      r.video.parentElement.classList.remove('video-' + e.from),
                      r.video.parentElement.classList.add('video-' + e.to),
                      r.load(r.currentViewport);
                  });
              }
              (r.sources = {}),
                t
                  .OBJECT_ENTRIES(r.video.dataset)
                  .filter(function(e) {
                    var t = s(e, 1),
                      r = t[0];
                    return 0 === r.indexOf('src');
                  })
                  .forEach(function(e) {
                    var t = s(e, 2),
                      n = t[0],
                      i = t[1],
                      a = n.replace(/^src/, '').toLowerCase();
                    r.sources[a] = i;
                  });
              var p = void 0;
              return (
                Object.defineProperty(r, 'currentViewport', {
                  set: function(e) {
                    (p = o(e)), r.load(p);
                  },
                  get: function() {
                    return p;
                  },
                }),
                (r.currentViewport = e.pageMetrics.breakpoint),
                (r.previousSource = null),
                (r.inLoadArea = !1),
                (r.loadKeyframe = r.addDiscreteEvent({
                  event: 'Video: Load',
                  start: r.options.loadAreaStart || 't - 200vh',
                  end: r.options.loadAreaEnd || 'b + 200vh',
                  onEnter: function() {
                    (r.inLoadArea = !0), r.load();
                  },
                  onExit: function() {
                    r.inLoadArea = !1;
                  },
                })),
                r
              );
            }
            return (
              a(t, e),
              p(
                t,
                [
                  { key: 'mounted', value: function() {} },
                  {
                    key: 'onBreakpointChange',
                    value: function(e) {
                      this.currentViewport = e.breakpoint;
                    },
                  },
                  {
                    key: 'load',
                    value: function(e) {
                      if (this.inLoadArea) {
                        e = e || this.currentViewport;
                        var t = this.sources[e];
                        this.enableXLarge || 'xlarge' !== e || (t = this.sources.large),
                          this.isRetina && t && (t = t.replace(/.mp4/gi, '_2x.mp4')),
                          this.isPortrait && t && (t = t.replace(/.mp4/gi, '_portrait.mp4')),
                          t &&
                            t !== this.previousSource &&
                            ((this.video.autoplay =
                              this.video.readyState >= g && !this.video.paused),
                            (this.video.src = this.previousSource = t),
                            this.video.load());
                      }
                    },
                  },
                  {
                    key: 'queueVideoPlayback',
                    value: function() {
                      var e = this;
                      'function' == typeof this._onCanPlay &&
                        this.video.removeEventListener('canplay', this._onCanPlay),
                        this.video.readyState < g
                          ? ((this._onCanPlay = function() {
                              e.video.play(), e.video.removeEventListener('canplay', e._onCanPlay);
                            }),
                            this.video.addEventListener('canplay', this._onCanPlay))
                          : this.video.play();
                    },
                  },
                  {
                    key: 'pauseVideoPlayback',
                    value: function() {
                      this.video.paused || this.video.pause();
                    },
                  },
                ],
                [
                  {
                    key: 'OBJECT_ENTRIES',
                    value: function(e) {
                      for (var t = Object.keys(e), r = t.length, n = new Array(r); r--; )
                        n[r] = [t[r], e[t[r]]];
                      return n;
                    },
                  },
                  {
                    key: 'IS_SUPPORTED',
                    value: function() {
                      return !document.documentElement.classList.contains('fallback');
                    },
                  },
                ]
              ),
              t
            );
          })(c);
        t.exports = l;
      },
      { '@marcom/bubble-gum/BaseComponent': 119, '@marcom/viewport-emitter': 130 },
    ],
    189: [
      function(e, t, r) {
        'use strict';
        function n(e, t) {
          if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
        }
        function i(e, t) {
          if (!e)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return !t || ('object' != typeof t && 'function' != typeof t) ? e : t;
        }
        function a(e, t) {
          if ('function' != typeof t && null !== t)
            throw new TypeError(
              'Super expression must either be null or a function, not ' + typeof t
            );
          (e.prototype = Object.create(t && t.prototype, {
            constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 },
          })),
            t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : (e.__proto__ = t));
        }
        var o = (function() {
            function e(e, t) {
              for (var r = 0; r < t.length; r++) {
                var n = t[r];
                (n.enumerable = n.enumerable || !1),
                  (n.configurable = !0),
                  'value' in n && (n.writable = !0),
                  Object.defineProperty(e, n.key, n);
              }
            }
            return function(t, r, n) {
              return r && e(t.prototype, r), n && e(t, n), t;
            };
          })(),
          s = e('@marcom/bubble-gum/BaseComponent'),
          p = e('./../waves/noise.json'),
          c = e('./ShaderPlayer'),
          u = e('@marcom/ac-raf-emitter/draw'),
          g = (function(e) {
            function t(e) {
              n(this, t);
              var r = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)),
                a = e.data;
              r.anchorEl = document.querySelector('.scroll-sequence');
              var o = r.el.querySelector('.wave-container'),
                s = r.el.querySelector('.curtain.left'),
                p = r.el.querySelector('.curtain.right'),
                c = r.el.querySelector('.curtain.noise');
              return (
                (r.playPauseButton = document.querySelector('.play-pause')),
                (r.isSmall = 'S' === e.pageMetrics.breakpoint),
                (r.handleControl = r.handleControl.bind(r)),
                r.initWaveAnimation(a),
                r.addKeyframe({
                  start: 'a0t + ' + a[1].end + 'vh',
                  end: 'a0t + ' + a[2].end + 'vh - 50vh',
                  cssClass: 'show',
                  toggle: !0,
                  anchors: [r.anchorEl],
                  breakpointMask: 'XLM',
                }),
                r.addKeyframe({
                  start: 'a0t + ' + a[1].end + 'vh',
                  end: 'a0t + ' + a[2].end + 'vh - 25vh',
                  cssClass: 'show',
                  toggle: !0,
                  anchors: [r.anchorEl],
                  breakpointMask: 'S',
                }),
                r.playPauseButton &&
                  (r.addKeyframe({
                    el: r.playPauseButton,
                    start: 'a0t + ' + a[1].end + 'vh + 80vh',
                    end: 'a0t + ' + a[2].end + 'vh - 50vh',
                    cssClass: 'show',
                    toggle: !0,
                    anchors: [r.anchorEl],
                    breakpointMask: 'XLM',
                  }),
                  r.addKeyframe({
                    el: r.playPauseButton,
                    start: 'a0t + ' + a[1].end + 'vh + 15vh',
                    end: 'a0t + ' + a[2].end + 'vh - 60vh',
                    cssClass: 'show',
                    toggle: !0,
                    anchors: [r.anchorEl],
                    breakpointMask: 'S',
                  })),
                r.addKeyframe({
                  start: 'a0t + ' + a[1].end + 'vh - 50vh',
                  end: 'a0t + ' + a[2].end + 'vh + 50vh',
                  cssClass: 'will-change',
                  toggle: !0,
                  anchors: [r.anchorEl],
                  breakpointMask: 'XLM',
                }),
                r.addKeyframe({
                  start: 'a0t + ' + a[1].end + 'vh - 50vh',
                  end: 'a0t + ' + a[2].end + 'vh + 50vh',
                  cssClass: 'will-change',
                  toggle: !0,
                  anchors: [r.anchorEl],
                  breakpointMask: 'S',
                }),
                r.addKeyframe({
                  el: o,
                  start: 'a0t + ' + a[2].end + 'vh - 75vh',
                  end: 'a0t + ' + a[2].end + 'vh - 51vh',
                  scaleY: [1, 0],
                  opacity: [1, 0],
                  anchors: [r.anchorEl],
                  breakpointMask: 'XLM',
                }),
                r.addKeyframe({
                  el: o,
                  start: 'a0t + ' + a[2].end + 'vh - 80vh',
                  end: 'a0t + ' + a[2].end + 'vh - 56vh',
                  scaleY: [1, 0],
                  opacity: [1, 0],
                  anchors: [r.anchorEl],
                  breakpointMask: 'S',
                }),
                r.addKeyframe({
                  el: s,
                  start: 'a0t + ' + a[1].end + 'vh + 50vh',
                  end: 'a0t + ' + a[1].end + 'vh + 125vh',
                  x: [0, 1200],
                  anchors: [r.anchorEl],
                  breakpointMask: 'XLM',
                }),
                r.addKeyframe({
                  el: s,
                  start: 'a0t + ' + a[1].end + 'vh',
                  end: 'a0t + ' + a[1].end + 'vh + 25vh',
                  x: [0, 600],
                  anchors: [r.anchorEl],
                  breakpointMask: 'S',
                }),
                r.addKeyframe({
                  el: p,
                  start: 'a0t + ' + a[1].end + 'vh + 125vh',
                  end: 'a0t + ' + a[1].end + 'vh + 175vh',
                  x: [0, 1200],
                  anchors: [r.anchorEl],
                  breakpointMask: 'XLM',
                }),
                r.addKeyframe({
                  el: p,
                  start: 'a0t + ' + a[1].end + 'vh + 25vh',
                  end: 'a0t + ' + a[1].end + 'vh + 50vh',
                  x: [0, 600],
                  anchors: [r.anchorEl],
                  breakpointMask: 'S',
                }),
                r.addKeyframe({
                  el: c,
                  start: 'a0t + ' + a[1].end + 'vh + 175vh',
                  end: 'a0t + ' + a[1].end + 'vh + 275vh',
                  x: [0, 1200],
                  anchors: [r.anchorEl],
                  breakpointMask: 'XLM',
                }),
                r.addKeyframe({
                  el: c,
                  start: 'a0t + ' + a[1].end + 'vh + 85vh',
                  end: 'a0t + ' + a[1].end + 'vh + 125vh',
                  x: [0, 600],
                  anchors: [r.anchorEl],
                  breakpointMask: 'S',
                }),
                r
              );
            }
            return (
              a(t, e),
              o(
                t,
                [
                  {
                    key: 'initWaveAnimation',
                    value: function(e) {
                      var t = this,
                        r = ['1', 'all'],
                        n = this.el.querySelector('.wave.left'),
                        i = this.el.querySelector('.wave.right');
                      (this.noiseWave = new c(n, p.Wave, r, !1, this.isSmall)),
                        (this.fullWave = new c(i, p.Wave, r, !0, this.isSmall));
                      var a = new Promise(function(e) {
                          return t.noiseWave.shaderPlayer.on('wave-ready', function() {
                            return e();
                          });
                        }),
                        o = new Promise(function(e) {
                          return t.fullWave.shaderPlayer.on('wave-ready', function() {
                            return e();
                          });
                        });
                      Promise.all([a, o]).then(function() {
                        t.noiseWave.setTapering(0.9, 1.1),
                          t.addDiscreteEvent({
                            start: 'a0t + ' + e[1].end + 'vh',
                            end: 'a0t + ' + e[2].end + 'vh - 20vh',
                            event: 'play-wave',
                            anchors: [t.anchorEl],
                            breakpointMask: 'XLM',
                            onEnter: function() {
                              t.playAnimation();
                            },
                            onExit: function() {
                              t.pauseAnimation();
                            },
                          }),
                          t.addDiscreteEvent({
                            start: 'a0t + ' + e[1].end + 'vh',
                            end: 'a0t + ' + e[2].end + 'vh + 20vh',
                            event: 'play-wave-s',
                            anchors: [t.anchorEl],
                            breakpointMask: 'S',
                            onEnter: function() {
                              t.playAnimation();
                            },
                            onExit: function() {
                              t.pauseAnimation();
                            },
                          }),
                          t.addContinuousEvent({
                            start: 'a0t + ' + e[1].end + 'vh + 150vh',
                            end: 'a0t + ' + e[1].end + 'vh + 250vh',
                            event: 'taper-wave',
                            taperValue: [2, 0.35],
                            anchors: [t.anchorEl],
                            breakpointMask: 'XLM',
                            onDraw: function(e) {
                              t.fullWave.setTapering(0, e.tweenProps.taperValue.current);
                            },
                          }),
                          t.addContinuousEvent({
                            start: 'a0t + ' + e[1].end + 'vh + 400vh',
                            end: 'a0t + ' + e[1].end + 'vh + 450vh',
                            event: 'taper-wave-2',
                            taperValue: [0.35, 0.1],
                            anchors: [t.anchorEl],
                            breakpointMask: 'XLM',
                            onDraw: function(e) {
                              t.fullWave.setTapering(0, e.tweenProps.taperValue.current);
                            },
                          }),
                          t.addContinuousEvent({
                            start: 'a0t + ' + e[1].end + 'vh + 80vh',
                            end: 'a0t + ' + e[1].end + 'vh + 120vh',
                            event: 'taper-wave-s',
                            taperValue: [2, 0.15],
                            anchors: [t.anchorEl],
                            breakpointMask: 'S',
                            easeFunction: 'easeOutSin',
                            onDraw: function(e) {
                              t.fullWave.setTapering(0, e.tweenProps.taperValue.current);
                            },
                          }),
                          t.addContinuousEvent({
                            start: 'a0t + ' + e[1].end + 'vh + 245vh',
                            end: 'a0t + ' + e[1].end + 'vh + 290vh',
                            event: 'taper-wave-s2',
                            taperValue: [0.15, 0.05],
                            anchors: [t.anchorEl],
                            breakpointMask: 'S',
                            onDraw: function(e) {
                              t.fullWave.setTapering(0, e.tweenProps.taperValue.current);
                            },
                          }),
                          t.playPauseButton &&
                            t.playPauseButton.addEventListener('click', t.handleControl);
                      });
                    },
                  },
                  {
                    key: 'playAnimation',
                    value: function() {
                      this.noiseWave.play(),
                        this.fullWave.play(),
                        this.playPauseButton && this.buttonPlayClass();
                    },
                  },
                  {
                    key: 'pauseAnimation',
                    value: function() {
                      this.noiseWave.pause(),
                        this.fullWave.pause(),
                        this.playPauseButton && this.buttonPauseClass();
                    },
                  },
                  {
                    key: 'buttonPlayClass',
                    value: function() {
                      var e = this;
                      this.playPauseButton.classList.add('playing'),
                        this.playPauseButton.classList.add('icon-pausecircle'),
                        this.playPauseButton.classList.remove('icon-playcircle'),
                        u(function() {
                          e.playPauseButton.setAttribute(
                            'data-analytics-title',
                            'pause | wave animation'
                          ),
                            e.playPauseButton.setAttribute(
                              'data-analytics-click',
                              'prop3:pause | wave animation'
                            );
                        });
                    },
                  },
                  {
                    key: 'buttonPauseClass',
                    value: function() {
                      var e = this;
                      this.playPauseButton.classList.remove('icon-pausecircle'),
                        this.playPauseButton.classList.add('icon-playcircle'),
                        u(function() {
                          e.playPauseButton.setAttribute(
                            'data-analytics-title',
                            'play | wave animation'
                          ),
                            e.playPauseButton.setAttribute(
                              'data-analytics-click',
                              'prop3:play | wave animation'
                            );
                        });
                    },
                  },
                  {
                    key: 'handleControl',
                    value: function(e) {
                      var t = this.playPauseButton.classList.contains('icon-pausecircle');
                      t ? this.pauseAnimation() : this.playAnimation();
                    },
                  },
                ],
                [
                  {
                    key: 'IS_SUPPORTED',
                    value: function() {
                      return !document.documentElement.classList.contains('fallback');
                    },
                  },
                ]
              ),
              t
            );
          })(s);
        t.exports = g;
      },
      {
        './../waves/noise.json': 198,
        './ShaderPlayer': 186,
        '@marcom/ac-raf-emitter/draw': 64,
        '@marcom/bubble-gum/BaseComponent': 119,
      },
    ],
    190: [
      function(e, t, r) {
        'use strict';
        var n = {
          large: [
            [
              { buffer: 0, duration: 110, percent: [0, 0.935], canvasPrependTiming: 50 },
              { buffer: 390, duration: 10, percent: [0.935, 1], canvasExtendTiming: 10 },
            ],
            [
              { buffer: 10, duration: 150, percent: [0, 0.8] },
              { buffer: 0, duration: 50, percent: [0.8, 1], canvasExtendTiming: 50 },
            ],
            [
              { buffer: 0, duration: 50, percent: [0, 0.2] },
              { buffer: 0, duration: 100, percent: [0.2, 1], canvasExtendTiming: 90 },
            ],
            [
              { buffer: 90, duration: 80, percent: [0, 0.6] },
              { buffer: 60, duration: 60, percent: [0.6, 1], canvasExtendTiming: 15 },
            ],
            [
              { buffer: 15, duration: 150, percent: [0, 0] },
              { buffer: 0, duration: 90, percent: [0, 0.54] },
              { buffer: 540, duration: 50, percent: [0.54, 1] },
            ],
            [{ buffer: 0, duration: 260, percent: [0, 1] }],
            [
              { buffer: 100, duration: 90, percent: [0, 0], canvasPrependTiming: 100 },
              { buffer: 0, duration: 50, percent: [0, 0.67] },
              { buffer: 110, duration: 50, percent: [0.67, 1], canvasExtendTiming: 110 },
            ],
            [
              { buffer: 110, duration: 70, percent: [0, 0.47], canvasPrependTiming: 0 },
              { buffer: 70, duration: 10, percent: [0.47, 0.52] },
              { buffer: 100, duration: 30, percent: [0.52, 0.88] },
              { buffer: 170, duration: 30, percent: [0.88, 1], canvasExtendTiming: 70 },
            ],
            [{ buffer: 70, duration: 200, percent: [0, 1], canvasExtendTiming: 110 }],
            [
              { buffer: 110, duration: 80, percent: [0, 0.23], canvasPrependTiming: 20 },
              { buffer: 80, duration: 50, percent: [0.23, 0.33] },
              { buffer: 50, duration: 60, percent: [0.33, 0.67] },
              { buffer: 30, duration: 100, percent: [0.67, 1], canvasExtendTiming: 100 },
            ],
          ],
          small: [
            [
              { buffer: 0, duration: 110, percent: [0, 0.92], canvasPrependTiming: 50 },
              { buffer: 200, duration: 10, percent: [0.92, 1], canvasExtendTiming: 10 },
            ],
            [{ buffer: 10, duration: 150, percent: [0, 1] }],
            [{ buffer: 0, duration: 100, percent: [0, 1] }],
            [
              { buffer: 110, duration: 80, percent: [0, 0.57], canvasPrependTiming: 110 },
              { buffer: 60, duration: 80, percent: [0.57, 1] },
            ],
            [
              { buffer: 0, duration: 150, percent: [0, 0] },
              { buffer: 0, duration: 90, percent: [0, 0.34] },
              { buffer: 310, duration: 80, percent: [0.34, 1] },
            ],
            [{ buffer: 0, duration: 260, percent: [0, 1] }],
            [
              { buffer: 100, duration: 90, percent: [0, 0], canvasPrependTiming: 100 },
              { buffer: 0, duration: 25, percent: [0, 0.48] },
              { buffer: 50, duration: 25, percent: [0.48, 0.77] },
              { buffer: 50, duration: 50, percent: [0.77, 1], canvasExtendTiming: 100 },
            ],
            [
              { buffer: 100, duration: 70, percent: [0, 0.45], canvasPrependTiming: 0 },
              { buffer: 40, duration: 50, percent: [0.45, 0.5] },
              { buffer: 60, duration: 50, percent: [0.5, 0.87] },
              { buffer: 40, duration: 20, percent: [0.87, 1], canvasExtendTiming: 50 },
            ],
            [
              { buffer: 50, duration: 80, percent: [0, 0.35] },
              { buffer: 0, duration: 25, percent: [0.35, 0.68] },
              { buffer: 0, duration: 50, percent: [0.68, 1], canvasExtendTiming: 40 },
            ],
            [
              { buffer: 40, duration: 120, percent: [0, 0.34], canvasPrependTiming: 20 },
              { buffer: 50, duration: 80, percent: [0.34, 0.66] },
              { buffer: 150, duration: 80, percent: [0.66, 1], canvasExtendTiming: 20 },
            ],
          ],
        };
        t.exports = n;
      },
      {},
    ],
    191: [
      function(e, t, r) {
        'use strict';
        function n() {
          var e = window.innerHeight,
            t = window.innerWidth;
          if (
            ((c.l || c.m) && e < c.MIN_HEIGHT_LARGE) ||
            (c.m && e > c.MAX_HEIGHT_MEDIUM) ||
            (c.s && (t > c.MAX_WIDTH_SMALL || t < c.MIN_WIDTH_SMALL || e > c.MAX_HEIGHT_SMALL)) ||
            (c.s && document.documentElement.classList.contains('no-touch')) ||
            c.xs ||
            document.documentElement.classList.contains('text-zoom')
          )
            return (
              document.documentElement.classList.add('fallback'),
              document.documentElement.classList.remove('no-fallback'),
              (u.section.options.dataAttribute = 'analytics-fallback-section-engagement'),
              g(u.section),
              u.analytics.passiveTracker({ eVar70: 'fallback' }, { overwriteStorageItem: !0 }),
              !0
            );
        }
        function i() {
          var e = document.querySelector('.main');
          setTimeout(function() {
            try {
              document.querySelector('.modal').classList.add('theme-dark');
            } catch (e) {}
          }, 100),
            a.BREAKPOINTS.forEach(function(e) {
              var t = e.mediaQuery.match('1442px'),
                r = e.mediaQuery.match('1068px'),
                n = e.mediaQuery.match('1069px');
              t && ((e.name = 'X'), (e.mediaQuery = e.mediaQuery.replace('1442', '1681'))),
                r && (e.mediaQuery = e.mediaQuery.replace('1068', '1023')),
                n && (e.mediaQuery = e.mediaQuery.replace('1069', '1024'));
            }),
            new o(e);
        }
        var a = e('@marcom/anim-system/Model/AnimSystemModel'),
          o = e('@marcom/bubble-gum'),
          s = e('@marcom/bubble-gum/ComponentMap'),
          p = e('@marcom/ac-accessibility/TextZoom'),
          c = e('./overview/constants'),
          u = e('./overview/analytics'),
          g = e('./overview/initializeNormalSectionEngagement'),
          l = {
            ScrollSequence: e('./components/ScrollSequence'),
            CopyMagic: e('./components/CopyMagic'),
            ComfortCopy: e('./components/ComfortCopy'),
            QualityCopy: e('./components/QualityCopy'),
            FocusHandler: e('./components/FocusHandler'),
            WaveAnimation: e('./components/WaveAnimation'),
            Simplicity: e('./components/Simplicity'),
            VideoViewportSource: e('./components/VideoViewportSource'),
            InlineVideo: e('./components/InlineVideo'),
            SectionAnalytics: e('./components/SectionAnalytics'),
          };
        Object.assign(s, l), p.detect(), n() || i();
      },
      {
        './components/ComfortCopy': 177,
        './components/CopyMagic': 178,
        './components/FocusHandler': 179,
        './components/InlineVideo': 182,
        './components/QualityCopy': 183,
        './components/ScrollSequence': 184,
        './components/SectionAnalytics': 185,
        './components/Simplicity': 187,
        './components/VideoViewportSource': 188,
        './components/WaveAnimation': 189,
        './overview/analytics': 192,
        './overview/constants': 193,
        './overview/initializeNormalSectionEngagement': 194,
        '@marcom/ac-accessibility/TextZoom': 1,
        '@marcom/anim-system/Model/AnimSystemModel': 107,
        '@marcom/bubble-gum': 120,
        '@marcom/bubble-gum/ComponentMap': 121,
      },
    ],
    192: [
      function(e, t, r) {
        'use strict';
        var n = e('./initializeNormalSectionEngagement'),
          i = void 0;
        try {
          i = e('@marcom/ac-analytics');
        } catch (a) {}
        var o = document.documentElement.classList.contains('fallback'),
          s = { customInitialization: !0 };
        s.dataAttribute = o
          ? 'analytics-fallback-section-engagement'
          : 'analytics-section-engagement';
        var p = function() {
            return {
              analytics: i,
              page: new i.observer.Page(),
              link: new i.observer.Link(),
              click: new i.observer.Click(),
              section: new i.observer.Section(s),
            };
          },
          c = p();
        o && n(c.section), (t.exports = c);
      },
      { './initializeNormalSectionEngagement': 194, '@marcom/ac-analytics': void 0 },
    ],
    193: [
      function(e, t, r) {
        'use strict';
        var n = e('@marcom/viewport-emitter'),
          i = {
            l: 'large' === n._viewport,
            m: 'medium' === n._viewport,
            s: 'small' === n._viewport,
            xs: 'xsmall' === n._viewport || 'smaller' === n._viewport,
            MAX_HEIGHT_MEDIUM: 1200,
            MAX_WIDTH_SMALL: 414,
            MIN_WIDTH_SMALL: 375,
            MAX_HEIGHT_SMALL: 1e3,
            MIN_HEIGHT_LARGE: 651,
          };
        t.exports = i;
      },
      { '@marcom/viewport-emitter': 130 },
    ],
    194: [
      function(e, t, r) {
        'use strict';
        function n(e) {
          if (Array.isArray(e)) {
            for (var t = 0, r = Array(e.length); t < e.length; t++) r[t] = e[t];
            return r;
          }
          return Array.from(e);
        }
        function i(e) {
          var t = [].concat(
            n(document.querySelectorAll('[data-analytics-fallback-section-engagement]'))
          );
          e.clearSections(),
            t.forEach(function(t) {
              e.addSection(t), e.initializeSection(t);
            });
        }
        t.exports = i;
      },
      {},
    ],
    195: [
      function(e, t, r) {
        t.exports = {
          large: {
            '03-flip-for-guts': {
              assets: {
                '0000.jpg': 71,
                '0001.jpg': 71,
                '0002.jpg': 70,
                '0003.jpg': 69,
                '0004.jpg': 68,
                '0005.jpg': 68,
                '0006.jpg': 67,
                '0007.jpg': 66,
                '0008.jpg': 65,
                '0009.jpg': 64,
                '0010.jpg': 63,
                '0011.jpg': 62,
                '0012.jpg': 61,
                '0013.jpg': 60,
                '0014.jpg': 59,
                '0015.jpg': 57,
                '0016.jpg': 56,
                '0017.jpg': 54,
                '0018.jpg': 53,
                '0019.jpg': 50,
                '0020.jpg': 48,
                '0021.jpg': 46,
                '0022.jpg': 43,
                '0023.jpg': 41,
                '0024.jpg': 37,
                '0025.jpg': 35,
                '0026.jpg': 33,
                '0027.jpg': 30,
                '0028.jpg': 27,
                '0029.jpg': 25,
                '0030.jpg': 24,
                '0031.jpg': 22,
                '0032.jpg': 19,
                '0033.jpg': 18,
                '0034.jpg': 17,
                '0035.jpg': 5,
                '0036.jpg': 6,
                '0037.jpg': 6,
                '0038.jpg': 6,
                '0039.jpg': 6,
                '0040.jpg': 6,
                '0041.jpg': 6,
                '0042.jpg': 6,
                '0043.jpg': 6,
                '0044.jpg': 6,
                '0045.jpg': 6,
                '0046.jpg': 7,
                '0047.jpg': 7,
                '0048.jpg': 7,
                '0049.jpg': 7,
                '0050.jpg': 7,
                '0051.jpg': 8,
                '0052.jpg': 8,
                '0053.jpg': 8,
                '0054.jpg': 9,
                '0055.jpg': 9,
                '0056.jpg': 9,
                '0057.jpg': 10,
                '0058.jpg': 10,
                '0059.jpg': 11,
                '0060.jpg': 11,
                '0061.jpg': 12,
                '0062.jpg': 12,
                '0063.jpg': 13,
                '0064.jpg': 13,
                '0065.jpg': 13,
                '0066.jpg': 14,
                '0067.jpg': 14,
                '0068.jpg': 14,
                '0069.jpg': 14,
                '0070.jpg': 15,
                '0071.jpg': 15,
                '0072.jpg': 15,
                '0073.jpg': 15,
                '0074.jpg': 15,
                '0075.jpg': 15,
                '0076.jpg': 15,
                '0077.jpg': 15,
                '0078.jpg': 16,
                '0079.jpg': 16,
                '0080.jpg': 17,
                '0081.jpg': 17,
                '0082.jpg': 17,
                '0083.jpg': 17,
                '0084.jpg': 18,
                '0085.jpg': 18,
                '0086.jpg': 18,
                '0087.jpg': 18,
                '0088.jpg': 18,
                '0088_2x.jpg': 365,
              },
              totalSize: 2706,
            },
            '04-explode-tips': {
              assets: {
                '0000.jpg': 20,
                '0000_2x.jpg': 109,
                '0001.jpg': 20,
                '0002.jpg': 20,
                '0003.jpg': 20,
                '0004.jpg': 20,
                '0005.jpg': 20,
                '0006.jpg': 20,
                '0007.jpg': 20,
                '0008.jpg': 20,
                '0009.jpg': 20,
                '0010.jpg': 20,
                '0011.jpg': 20,
                '0012.jpg': 20,
                '0013.jpg': 20,
                '0014.jpg': 20,
                '0015.jpg': 20,
                '0016.jpg': 20,
                '0017.jpg': 20,
                '0018.jpg': 20,
                '0019.jpg': 20,
                '0020.jpg': 20,
                '0021.jpg': 20,
                '0022.jpg': 20,
                '0023.jpg': 20,
                '0024.jpg': 20,
                '0025.jpg': 20,
                '0026.jpg': 20,
                '0027.jpg': 20,
                '0028.jpg': 20,
                '0029.jpg': 21,
                '0030.jpg': 21,
                '0031.jpg': 21,
                '0032.jpg': 21,
                '0033.jpg': 21,
                '0034.jpg': 20,
                '0035.jpg': 20,
                '0036.jpg': 20,
                '0037.jpg': 20,
                '0038.jpg': 20,
                '0039.jpg': 20,
                '0040.jpg': 20,
                '0041.jpg': 20,
                '0042.jpg': 20,
                '0043.jpg': 20,
                '0044.jpg': 20,
                '0045.jpg': 20,
                '0046.jpg': 20,
                '0047.jpg': 20,
                '0048.jpg': 20,
                '0049.jpg': 19,
                '0050.jpg': 20,
                '0051.jpg': 19,
                '0052.jpg': 19,
                '0053.jpg': 20,
                '0054.jpg': 20,
                '0055.jpg': 19,
                '0056.jpg': 19,
                '0057.jpg': 19,
                '0058.jpg': 19,
                '0059.jpg': 19,
                '0060.jpg': 19,
                '0061.jpg': 19,
                '0062.jpg': 19,
                '0063.jpg': 21,
                '0064.jpg': 21,
                '0065.jpg': 21,
                '0066.jpg': 21,
                '0067.jpg': 21,
                '0068.jpg': 23,
                '0069.jpg': 23,
                '0070.jpg': 23,
                '0071.jpg': 24,
                '0072.jpg': 24,
                '0073.jpg': 24,
                '0074.jpg': 24,
                '0075.jpg': 24,
                '0076.jpg': 24,
                '0077.jpg': 24,
                '0078.jpg': 24,
                '0079.jpg': 24,
                '0080.jpg': 24,
                '0081.jpg': 24,
                '0082.jpg': 24,
                '0083.jpg': 24,
                '0083_2x.jpg': 120,
                '0084.jpg': 24,
                '0085.jpg': 24,
                '0086.jpg': 24,
                '0087.jpg': 24,
                '0088.jpg': 24,
                '0089.jpg': 24,
                '0090.jpg': 24,
                '0091.jpg': 24,
                '0092.jpg': 23,
                '0093.jpg': 23,
                '0094.jpg': 23,
                '0095.jpg': 23,
                '0096.jpg': 22,
                '0097.jpg': 22,
                '0098.jpg': 21,
                '0099.jpg': 20,
                '0100.jpg': 19,
                '0101.jpg': 19,
                '0102.jpg': 19,
                '0103.jpg': 19,
                '0104.jpg': 19,
                '0105.jpg': 19,
                '0106.jpg': 19,
                '0107.jpg': 19,
                '0108.jpg': 19,
                '0109.jpg': 19,
                '0110.jpg': 19,
                '0111.jpg': 19,
                '0112.jpg': 19,
                '0113.jpg': 19,
                '0114.jpg': 19,
                '0115.jpg': 19,
                '0116.jpg': 19,
                '0117.jpg': 19,
                '0118.jpg': 19,
                '0119.jpg': 19,
                '0120.jpg': 19,
                '0121.jpg': 19,
                '0122.jpg': 19,
                '0123.jpg': 19,
                '0124.jpg': 19,
                '0125.jpg': 19,
                '0126.jpg': 19,
                '0127.jpg': 19,
                '0128.jpg': 18,
                '0129.jpg': 18,
                '0130.jpg': 18,
                '0131.jpg': 18,
                '0132.jpg': 18,
                '0133.jpg': 18,
                '0134.jpg': 18,
                '0135.jpg': 18,
                '0136.jpg': 18,
                '0137.jpg': 18,
                '0138.jpg': 18,
                '0138_2x.jpg': 97,
              },
              totalSize: 3165,
            },
            '01-hero-lightpass': {
              assets: {
                '0000.jpg': 36,
                '0000_2x.jpg': 125,
                '0001.jpg': 30,
                '0002.jpg': 31,
                '0003.jpg': 32,
                '0004.jpg': 34,
                '0005.jpg': 35,
                '0006.jpg': 36,
                '0007.jpg': 37,
                '0008.jpg': 38,
                '0009.jpg': 39,
                '0010.jpg': 40,
                '0011.jpg': 41,
                '0012.jpg': 41,
                '0013.jpg': 42,
                '0014.jpg': 43,
                '0015.jpg': 43,
                '0016.jpg': 44,
                '0017.jpg': 45,
                '0018.jpg': 45,
                '0019.jpg': 45,
                '0020.jpg': 46,
                '0021.jpg': 46,
                '0022.jpg': 47,
                '0023.jpg': 47,
                '0024.jpg': 47,
                '0025.jpg': 48,
                '0026.jpg': 48,
                '0027.jpg': 48,
                '0028.jpg': 48,
                '0029.jpg': 49,
                '0030.jpg': 49,
                '0031.jpg': 49,
                '0032.jpg': 49,
                '0033.jpg': 49,
                '0034.jpg': 50,
                '0035.jpg': 50,
                '0036.jpg': 50,
                '0037.jpg': 50,
                '0038.jpg': 50,
                '0039.jpg': 50,
                '0040.jpg': 50,
                '0041.jpg': 51,
                '0042.jpg': 51,
                '0043.jpg': 51,
                '0044.jpg': 51,
                '0045.jpg': 51,
                '0046.jpg': 51,
                '0047.jpg': 51,
                '0048.jpg': 51,
                '0049.jpg': 51,
                '0050.jpg': 51,
                '0051.jpg': 51,
                '0052.jpg': 51,
                '0053.jpg': 51,
                '0054.jpg': 51,
                '0055.jpg': 51,
                '0056.jpg': 51,
                '0057.jpg': 51,
                '0058.jpg': 51,
                '0059.jpg': 51,
                '0060.jpg': 51,
                '0061.jpg': 51,
                '0062.jpg': 51,
                '0063.jpg': 51,
                '0064.jpg': 51,
                '0065.jpg': 51,
                '0066.jpg': 51,
                '0067.jpg': 51,
                '0068.jpg': 51,
                '0069.jpg': 51,
                '0070.jpg': 51,
                '0071.jpg': 51,
                '0072.jpg': 51,
                '0073.jpg': 51,
                '0074.jpg': 51,
                '0075.jpg': 51,
                '0076.jpg': 51,
                '0077.jpg': 51,
                '0078.jpg': 51,
                '0079.jpg': 51,
                '0080.jpg': 51,
                '0081.jpg': 51,
                '0082.jpg': 51,
                '0083.jpg': 51,
                '0084.jpg': 51,
                '0085.jpg': 51,
                '0086.jpg': 51,
                '0087.jpg': 51,
                '0088.jpg': 51,
                '0089.jpg': 51,
                '0090.jpg': 51,
                '0091.jpg': 51,
                '0092.jpg': 50,
                '0093.jpg': 50,
                '0094.jpg': 50,
                '0095.jpg': 50,
                '0096.jpg': 50,
                '0097.jpg': 49,
                '0098.jpg': 49,
                '0099.jpg': 49,
                '0100.jpg': 49,
                '0101.jpg': 49,
                '0102.jpg': 49,
                '0103.jpg': 49,
                '0104.jpg': 49,
                '0105.jpg': 49,
                '0106.jpg': 49,
                '0107.jpg': 49,
                '0108.jpg': 48,
                '0109.jpg': 48,
                '0110.jpg': 48,
                '0111.jpg': 48,
                '0112.jpg': 47,
                '0113.jpg': 47,
                '0114.jpg': 46,
                '0115.jpg': 45,
                '0116.jpg': 45,
                '0117.jpg': 44,
                '0118.jpg': 43,
                '0119.jpg': 41,
                '0120.jpg': 40,
                '0121.jpg': 39,
                '0122.jpg': 38,
                '0123.jpg': 37,
                '0124.jpg': 36,
                '0125.jpg': 35,
                '0126.jpg': 33,
                '0127.jpg': 31,
                '0128.jpg': 30,
                '0129.jpg': 28,
                '0130.jpg': 26,
                '0131.jpg': 25,
                '0132.jpg': 23,
                '0133.jpg': 21,
                '0134.jpg': 19,
                '0135.jpg': 18,
                '0136.jpg': 16,
                '0137.jpg': 15,
                '0137_2x.jpg': 71,
                '0138.jpg': 15,
                '0139.jpg': 14,
                '0140.jpg': 14,
                '0141.jpg': 13,
                '0142.jpg': 13,
                '0143.jpg': 12,
                '0144.jpg': 12,
                '0145.jpg': 12,
                '0146.jpg': 11,
                '0147.jpg': 11,
              },
              totalSize: 6570,
            },
            '02-head-bob-turn': {
              assets: {
                '0000.jpg': 14,
                '0001.jpg': 18,
                '0002.jpg': 19,
                '0003.jpg': 20,
                '0004.jpg': 22,
                '0005.jpg': 23,
                '0006.jpg': 24,
                '0007.jpg': 25,
                '0008.jpg': 27,
                '0009.jpg': 28,
                '0010.jpg': 30,
                '0011.jpg': 32,
                '0012.jpg': 34,
                '0013.jpg': 35,
                '0014.jpg': 37,
                '0015.jpg': 38,
                '0016.jpg': 39,
                '0017.jpg': 40,
                '0018.jpg': 42,
                '0019.jpg': 44,
                '0020.jpg': 46,
                '0021.jpg': 48,
                '0022.jpg': 50,
                '0023.jpg': 51,
                '0024.jpg': 53,
                '0025.jpg': 54,
                '0026.jpg': 55,
                '0027.jpg': 57,
                '0028.jpg': 58,
                '0029.jpg': 59,
                '0030.jpg': 61,
                '0031.jpg': 62,
                '0032.jpg': 64,
                '0033.jpg': 66,
                '0034.jpg': 69,
                '0035.jpg': 71,
                '0036.jpg': 72,
                '0037.jpg': 74,
                '0038.jpg': 76,
                '0039.jpg': 78,
                '0040.jpg': 79,
                '0041.jpg': 82,
                '0042.jpg': 84,
                '0043.jpg': 86,
                '0044.jpg': 88,
                '0045.jpg': 90,
                '0046.jpg': 92,
                '0047.jpg': 94,
                '0048.jpg': 95,
                '0049.jpg': 97,
                '0050.jpg': 98,
                '0051.jpg': 99,
                '0052.jpg': 99,
                '0053.jpg': 100,
                '0054.jpg': 99,
                '0055.jpg': 99,
                '0056.jpg': 99,
                '0057.jpg': 98,
                '0058.jpg': 98,
                '0059.jpg': 97,
                '0060.jpg': 96,
                '0061.jpg': 95,
                '0062.jpg': 93,
                '0063.jpg': 93,
                '0064.jpg': 93,
                '0065.jpg': 93,
                '0066.jpg': 93,
                '0067.jpg': 92,
                '0068.jpg': 93,
                '0069.jpg': 94,
                '0070.jpg': 94,
                '0071.jpg': 94,
                '0072.jpg': 94,
                '0073.jpg': 94,
                '0074.jpg': 95,
                '0075.jpg': 95,
                '0076.jpg': 95,
                '0077.jpg': 94,
                '0078.jpg': 94,
                '0079.jpg': 94,
                '0080.jpg': 94,
                '0081.jpg': 94,
                '0082.jpg': 95,
                '0083.jpg': 95,
                '0084.jpg': 96,
                '0085.jpg': 96,
                '0086.jpg': 96,
                '0087.jpg': 96,
                '0088.jpg': 96,
                '0089.jpg': 96,
                '0090.jpg': 96,
                '0091.jpg': 95,
                '0092.jpg': 95,
                '0093.jpg': 94,
                '0094.jpg': 94,
                '0095.jpg': 94,
                '0096.jpg': 92,
                '0097.jpg': 92,
                '0098.jpg': 92,
                '0099.jpg': 92,
                '0100.jpg': 91,
                '0101.jpg': 91,
                '0102.jpg': 90,
                '0103.jpg': 89,
                '0104.jpg': 88,
                '0105.jpg': 88,
                '0106.jpg': 87,
                '0107.jpg': 86,
                '0108.jpg': 86,
                '0109.jpg': 85,
                '0110.jpg': 84,
                '0111.jpg': 84,
                '0112.jpg': 84,
                '0113.jpg': 83,
                '0114.jpg': 82,
                '0115.jpg': 82,
                '0116.jpg': 82,
                '0117.jpg': 81,
                '0118.jpg': 80,
                '0119.jpg': 79,
                '0120.jpg': 79,
                '0121.jpg': 78,
                '0122.jpg': 78,
                '0123.jpg': 77,
                '0124.jpg': 76,
                '0125.jpg': 76,
                '0126.jpg': 75,
                '0127.jpg': 74,
                '0128.jpg': 74,
                '0129.jpg': 73,
                '0130.jpg': 73,
                '0131.jpg': 72,
              },
              totalSize: 10063,
            },
            '07-flip-reveal-guts': {
              assets: {
                '0000.jpg': 28,
                '0000_2x.jpg': 119,
                '0001.jpg': 28,
                '0002.jpg': 28,
                '0003.jpg': 28,
                '0004.jpg': 28,
                '0005.jpg': 28,
                '0006.jpg': 28,
                '0007.jpg': 28,
                '0008.jpg': 28,
                '0009.jpg': 27,
                '0010.jpg': 27,
                '0011.jpg': 28,
                '0012.jpg': 28,
                '0013.jpg': 30,
                '0014.jpg': 31,
                '0015.jpg': 31,
                '0016.jpg': 32,
                '0017.jpg': 32,
                '0018.jpg': 31,
                '0019.jpg': 31,
                '0020.jpg': 31,
                '0021.jpg': 32,
                '0022.jpg': 33,
                '0023.jpg': 33,
                '0024.jpg': 33,
                '0025.jpg': 33,
                '0026.jpg': 33,
                '0027.jpg': 33,
                '0028.jpg': 33,
                '0029.jpg': 34,
                '0030.jpg': 36,
                '0031.jpg': 38,
                '0032.jpg': 38,
                '0033.jpg': 38,
                '0034.jpg': 37,
                '0035.jpg': 35,
                '0036.jpg': 33,
                '0037.jpg': 33,
                '0038.jpg': 33,
                '0039.jpg': 33,
                '0040.jpg': 33,
                '0041.jpg': 34,
                '0042.jpg': 34,
                '0043.jpg': 34,
                '0044.jpg': 34,
                '0045.jpg': 34,
                '0046.jpg': 34,
                '0046_2x.jpg': 143,
                '0047.jpg': 34,
                '0048.jpg': 34,
                '0049.jpg': 35,
                '0050.jpg': 36,
                '0051.jpg': 37,
                '0052.jpg': 37,
                '0053.jpg': 37,
                '0054.jpg': 37,
                '0055.jpg': 37,
                '0056.jpg': 37,
                '0057.jpg': 36,
                '0058.jpg': 35,
                '0059.jpg': 34,
                '0060.jpg': 33,
                '0061.jpg': 32,
                '0062.jpg': 31,
                '0063.jpg': 31,
                '0064.jpg': 31,
                '0065.jpg': 31,
                '0066.jpg': 30,
                '0067.jpg': 31,
                '0068.jpg': 31,
                '0068_2x.jpg': 136,
              },
              totalSize: 2644,
            },
            '05-flip-for-nc': {
              assets: {
                '0000.jpg': 16,
                '0000_2x.jpg': 97,
                '0001.jpg': 16,
                '0002.jpg': 16,
                '0003.jpg': 16,
                '0004.jpg': 16,
                '0005.jpg': 15,
                '0006.jpg': 15,
                '0007.jpg': 15,
                '0008.jpg': 14,
                '0009.jpg': 14,
                '0010.jpg': 13,
                '0011.jpg': 12,
                '0012.jpg': 12,
                '0013.jpg': 11,
                '0014.jpg': 11,
                '0015.jpg': 10,
                '0016.jpg': 9,
                '0017.jpg': 9,
                '0018.jpg': 9,
                '0019.jpg': 8,
                '0020.jpg': 8,
                '0021.jpg': 8,
                '0022.jpg': 8,
                '0023.jpg': 8,
                '0024.jpg': 8,
                '0025.jpg': 8,
                '0026.jpg': 8,
                '0027.jpg': 8,
                '0028.jpg': 9,
                '0029.jpg': 9,
                '0030.jpg': 10,
                '0031.jpg': 11,
                '0032.jpg': 11,
                '0033.jpg': 11,
                '0034.jpg': 12,
                '0035.jpg': 12,
                '0036.jpg': 12,
                '0037.jpg': 12,
                '0038.jpg': 12,
                '0039.jpg': 12,
                '0040.jpg': 12,
                '0041.jpg': 12,
                '0042.jpg': 12,
                '0043.jpg': 12,
                '0044.jpg': 12,
                '0045.jpg': 13,
                '0046.jpg': 13,
                '0047.jpg': 13,
                '0048.jpg': 13,
                '0049.jpg': 13,
                '0050.jpg': 13,
                '0051.jpg': 13,
                '0052.jpg': 13,
                '0053.jpg': 13,
                '0054.jpg': 13,
                '0055.jpg': 13,
                '0056.jpg': 13,
                '0057.jpg': 13,
                '0058.jpg': 13,
                '0059.jpg': 13,
                '0060.jpg': 13,
                '0061.jpg': 13,
                '0062.jpg': 13,
                '0063.jpg': 13,
                '0064.jpg': 13,
                '0065.jpg': 13,
                '0066.jpg': 13,
                '0067.jpg': 13,
                '0068.jpg': 13,
                '0069.jpg': 13,
                '0070.jpg': 13,
                '0071.jpg': 13,
                '0072.jpg': 13,
                '0073.jpg': 13,
                '0074.jpg': 13,
                '0075.jpg': 13,
                '0076.jpg': 13,
                '0076_2x.jpg': 86,
                '0077.jpg': 13,
                '0078.jpg': 13,
                '0079.jpg': 13,
                '0080.jpg': 13,
                '0081.jpg': 13,
                '0082.jpg': 13,
                '0083.jpg': 13,
                '0084.jpg': 13,
                '0085.jpg': 13,
                '0086.jpg': 13,
                '0087.jpg': 12,
                '0088.jpg': 12,
                '0089.jpg': 12,
                '0090.jpg': 12,
                '0091.jpg': 12,
                '0092.jpg': 12,
                '0093.jpg': 12,
                '0094.jpg': 11,
                '0095.jpg': 11,
                '0096.jpg': 11,
                '0097.jpg': 11,
                '0097_2x.jpg': 77,
                '0098.jpg': 11,
                '0099.jpg': 11,
                '0100.jpg': 11,
                '0101.jpg': 10,
                '0102.jpg': 10,
                '0103.jpg': 10,
                '0104.jpg': 10,
                '0105.jpg': 10,
                '0106.jpg': 10,
                '0107.jpg': 10,
                '0108.jpg': 9,
                '0109.jpg': 9,
                '0110.jpg': 9,
                '0111.jpg': 9,
                '0112.jpg': 9,
                '0113.jpg': 8,
                '0114.jpg': 8,
                '0115.jpg': 8,
                '0116.jpg': 8,
                '0117.jpg': 8,
                '0118.jpg': 8,
                '0119.jpg': 8,
                '0120.jpg': 7,
                '0121.jpg': 7,
                '0122.jpg': 7,
                '0123.jpg': 7,
                '0124.jpg': 7,
                '0125.jpg': 7,
                '0126.jpg': 7,
                '0127.jpg': 7,
                '0128.jpg': 6,
                '0129.jpg': 6,
                '0129_2x.jpg': 60,
                '0130.jpg': 6,
                '0131.jpg': 6,
                '0132.jpg': 6,
                '0133.jpg': 6,
                '0134.jpg': 6,
                '0135.jpg': 6,
                '0136.jpg': 5,
                '0137.jpg': 5,
                '0138.jpg': 5,
                '0139.jpg': 5,
              },
              totalSize: 1836,
            },
            '06-transparency-head': {
              assets: {
                '0000.jpg': 60,
                '0001.jpg': 60,
                '0002.jpg': 61,
                '0003.jpg': 62,
                '0004.jpg': 63,
                '0005.jpg': 64,
                '0006.jpg': 65,
                '0007.jpg': 65,
                '0008.jpg': 66,
                '0009.jpg': 67,
                '0010.jpg': 67,
                '0011.jpg': 67,
                '0012.jpg': 68,
                '0013.jpg': 68,
                '0014.jpg': 68,
                '0015.jpg': 68,
                '0016.jpg': 68,
                '0017.jpg': 68,
                '0018.jpg': 68,
                '0019.jpg': 68,
                '0020.jpg': 68,
                '0021.jpg': 68,
                '0022.jpg': 69,
                '0023.jpg': 69,
                '0024.jpg': 69,
                '0025.jpg': 69,
                '0026.jpg': 69,
                '0027.jpg': 69,
                '0028.jpg': 69,
                '0029.jpg': 69,
                '0030.jpg': 69,
                '0031.jpg': 69,
                '0032.jpg': 69,
                '0033.jpg': 70,
                '0034.jpg': 70,
                '0035.jpg': 70,
                '0036.jpg': 70,
                '0037.jpg': 70,
                '0038.jpg': 70,
                '0039.jpg': 70,
                '0040.jpg': 70,
                '0041.jpg': 70,
                '0042.jpg': 70,
                '0043.jpg': 70,
                '0044.jpg': 70,
                '0045.jpg': 70,
                '0046.jpg': 70,
                '0047.jpg': 70,
                '0048.jpg': 70,
                '0049.jpg': 70,
                '0050.jpg': 70,
                '0051.jpg': 70,
                '0052.jpg': 70,
                '0053.jpg': 70,
                '0054.jpg': 70,
                '0055.jpg': 70,
                '0056.jpg': 70,
                '0057.jpg': 70,
                '0058.jpg': 69,
                '0059.jpg': 69,
                '0060.jpg': 69,
                '0061.jpg': 69,
                '0062.jpg': 69,
                '0063.jpg': 69,
                '0064.jpg': 68,
                '0065.jpg': 68,
                '0066.jpg': 68,
                '0067.jpg': 68,
                '0068.jpg': 68,
                '0069.jpg': 68,
                '0070.jpg': 68,
                '0071.jpg': 67,
                '0072.jpg': 67,
                '0073.jpg': 67,
                '0074.jpg': 67,
                '0075.jpg': 67,
                '0076.jpg': 67,
                '0077.jpg': 68,
                '0078.jpg': 68,
                '0079.jpg': 68,
                '0080.jpg': 68,
                '0081.jpg': 68,
                '0082.jpg': 67,
                '0083.jpg': 67,
                '0084.jpg': 67,
                '0085.jpg': 67,
                '0086.jpg': 67,
                '0087.jpg': 67,
                '0088.jpg': 67,
                '0089.jpg': 67,
                '0090.jpg': 67,
                '0091.jpg': 67,
                '0092.jpg': 67,
                '0093.jpg': 66,
                '0094.jpg': 66,
                '0095.jpg': 66,
                '0096.jpg': 65,
                '0097.jpg': 65,
                '0098.jpg': 65,
                '0099.jpg': 64,
                '0100.jpg': 63,
                '0101.jpg': 63,
                '0102.jpg': 66,
                '0103.jpg': 67,
                '0104.jpg': 70,
                '0105.jpg': 72,
                '0106.jpg': 75,
                '0107.jpg': 76,
                '0108.jpg': 77,
                '0109.jpg': 78,
                '0110.jpg': 79,
                '0111.jpg': 81,
                '0112.jpg': 83,
                '0113.jpg': 86,
                '0114.jpg': 88,
                '0115.jpg': 89,
                '0116.jpg': 92,
                '0117.jpg': 91,
                '0118.jpg': 91,
                '0119.jpg': 91,
                '0120.jpg': 91,
                '0121.jpg': 90,
                '0122.jpg': 90,
                '0123.jpg': 90,
                '0124.jpg': 89,
                '0125.jpg': 89,
                '0126.jpg': 89,
                '0127.jpg': 89,
                '0128.jpg': 90,
                '0129.jpg': 90,
                '0130.jpg': 90,
                '0131.jpg': 90,
                '0132.jpg': 90,
                '0133.jpg': 91,
                '0134.jpg': 91,
                '0135.jpg': 90,
                '0136.jpg': 90,
                '0137.jpg': 90,
                '0138.jpg': 89,
                '0139.jpg': 89,
                '0140.jpg': 89,
                '0141.jpg': 89,
                '0142.jpg': 89,
                '0143.jpg': 89,
                '0144.jpg': 89,
                '0145.jpg': 89,
                '0146.jpg': 89,
                '0147.jpg': 89,
                '0148.jpg': 89,
                '0149.jpg': 89,
                '0150.jpg': 88,
                '0151.jpg': 88,
                '0152.jpg': 88,
                '0153.jpg': 87,
                '0154.jpg': 87,
                '0155.jpg': 88,
                '0156.jpg': 88,
                '0157.jpg': 88,
                '0158.jpg': 89,
                '0159.jpg': 89,
                '0160.jpg': 90,
                '0161.jpg': 90,
                '0162.jpg': 91,
                '0163.jpg': 91,
                '0164.jpg': 93,
                '0165.jpg': 94,
                '0166.jpg': 95,
                '0167.jpg': 95,
                '0168.jpg': 95,
                '0169.jpg': 95,
                '0170.jpg': 95,
                '0171.jpg': 94,
                '0172.jpg': 94,
                '0173.jpg': 92,
                '0174.jpg': 91,
                '0175.jpg': 89,
                '0176.jpg': 89,
              },
              totalSize: 13500,
            },
            '08-turn-for-chip': {
              assets: {
                '0000.jpg': 25,
                '0001.jpg': 25,
                '0002.jpg': 25,
                '0003.jpg': 24,
                '0004.jpg': 25,
                '0005.jpg': 25,
                '0006.jpg': 25,
                '0007.jpg': 25,
                '0008.jpg': 25,
                '0009.jpg': 25,
                '0010.jpg': 25,
                '0011.jpg': 24,
                '0012.jpg': 24,
                '0013.jpg': 24,
                '0014.jpg': 23,
                '0015.jpg': 23,
                '0016.jpg': 22,
                '0017.jpg': 21,
                '0018.jpg': 21,
                '0019.jpg': 20,
                '0020.jpg': 19,
                '0021.jpg': 18,
                '0022.jpg': 18,
                '0023.jpg': 17,
                '0024.jpg': 17,
                '0025.jpg': 16,
                '0026.jpg': 16,
                '0027.jpg': 16,
                '0028.jpg': 16,
                '0029.jpg': 16,
                '0030.jpg': 15,
                '0031.jpg': 15,
                '0032.jpg': 15,
                '0033.jpg': 16,
                '0034.jpg': 16,
                '0035.jpg': 16,
                '0036.jpg': 16,
                '0037.jpg': 16,
                '0038.jpg': 16,
                '0039.jpg': 16,
                '0040.jpg': 16,
                '0041.jpg': 16,
                '0042.jpg': 16,
                '0043.jpg': 16,
                '0044.jpg': 16,
                '0045.jpg': 17,
                '0046.jpg': 17,
                '0047.jpg': 17,
                '0048.jpg': 18,
                '0049.jpg': 18,
                '0050.jpg': 19,
                '0051.jpg': 19,
                '0052.jpg': 20,
                '0053.jpg': 20,
                '0054.jpg': 21,
                '0055.jpg': 21,
                '0056.jpg': 22,
                '0057.jpg': 22,
                '0058.jpg': 23,
                '0059.jpg': 23,
                '0060.jpg': 24,
                '0061.jpg': 24,
                '0062.jpg': 25,
                '0063.jpg': 26,
                '0064.jpg': 26,
                '0065.jpg': 27,
                '0066.jpg': 27,
                '0067.jpg': 28,
                '0068.jpg': 29,
                '0069.jpg': 29,
                '0070.jpg': 30,
                '0071.jpg': 30,
                '0072.jpg': 31,
                '0073.jpg': 31,
                '0074.jpg': 31,
                '0075.jpg': 31,
                '0076.jpg': 31,
                '0077.jpg': 31,
                '0078.jpg': 31,
                '0079.jpg': 31,
                '0079_2x.jpg': 172,
                '0080.jpg': 31,
                '0081.jpg': 32,
                '0082.jpg': 32,
                '0083.jpg': 33,
                '0084.jpg': 33,
                '0085.jpg': 34,
                '0086.jpg': 34,
                '0087.jpg': 34,
                '0088.jpg': 34,
                '0089.jpg': 34,
                '0089_2x.jpg': 175,
              },
              totalSize: 2430,
            },
            '09-scoop-turn': {
              assets: {
                '0000.jpg': 43,
                '0001.jpg': 42,
                '0002.jpg': 42,
                '0003.jpg': 41,
                '0004.jpg': 41,
                '0005.jpg': 41,
                '0006.jpg': 41,
                '0007.jpg': 40,
                '0008.jpg': 40,
                '0009.jpg': 40,
                '0010.jpg': 41,
                '0011.jpg': 41,
                '0012.jpg': 41,
                '0013.jpg': 41,
                '0014.jpg': 42,
                '0015.jpg': 42,
                '0016.jpg': 43,
                '0017.jpg': 43,
                '0018.jpg': 44,
                '0019.jpg': 44,
                '0020.jpg': 45,
                '0021.jpg': 45,
                '0022.jpg': 46,
                '0023.jpg': 46,
                '0024.jpg': 46,
                '0025.jpg': 46,
                '0026.jpg': 47,
                '0027.jpg': 47,
                '0028.jpg': 46,
                '0029.jpg': 45,
                '0030.jpg': 45,
                '0031.jpg': 45,
                '0032.jpg': 45,
                '0033.jpg': 45,
                '0034.jpg': 45,
                '0035.jpg': 45,
                '0036.jpg': 44,
                '0037.jpg': 44,
                '0038.jpg': 43,
                '0039.jpg': 43,
                '0040.jpg': 43,
                '0041.jpg': 42,
                '0042.jpg': 41,
                '0043.jpg': 40,
                '0044.jpg': 41,
                '0045.jpg': 39,
                '0046.jpg': 38,
                '0047.jpg': 36,
                '0048.jpg': 34,
                '0049.jpg': 32,
                '0050.jpg': 31,
                '0051.jpg': 29,
                '0052.jpg': 28,
                '0053.jpg': 27,
                '0054.jpg': 25,
                '0055.jpg': 24,
                '0056.jpg': 23,
                '0057.jpg': 23,
                '0058.jpg': 23,
                '0059.jpg': 23,
                '0060.jpg': 23,
                '0061.jpg': 23,
                '0062.jpg': 23,
                '0063.jpg': 23,
                '0064.jpg': 23,
                '0065.jpg': 22,
                '0066.jpg': 22,
                '0067.jpg': 22,
                '0068.jpg': 23,
                '0069.jpg': 23,
                '0070.jpg': 23,
                '0071.jpg': 23,
                '0072.jpg': 23,
                '0073.jpg': 23,
                '0074.jpg': 23,
                '0075.jpg': 23,
                '0076.jpg': 23,
                '0077.jpg': 23,
                '0078.jpg': 23,
                '0079.jpg': 23,
                '0080.jpg': 23,
                '0081.jpg': 23,
                '0082.jpg': 23,
                '0083.jpg': 23,
                '0084.jpg': 23,
                '0085.jpg': 23,
                '0086.jpg': 23,
                '0087.jpg': 23,
                '0088.jpg': 23,
                '0089.jpg': 23,
                '0090.jpg': 23,
                '0091.jpg': 23,
                '0092.jpg': 23,
                '0093.jpg': 23,
                '0094.jpg': 23,
                '0095.jpg': 23,
                '0096.jpg': 23,
                '0097.jpg': 23,
                '0098.jpg': 23,
                '0099.jpg': 23,
                '0100.jpg': 23,
                '0101.jpg': 23,
                '0102.jpg': 23,
                '0103.jpg': 23,
                '0104.jpg': 23,
                '0105.jpg': 23,
                '0106.jpg': 23,
                '0107.jpg': 23,
                '0108.jpg': 23,
                '0109.jpg': 23,
                '0110.jpg': 23,
                '0111.jpg': 23,
                '0112.jpg': 23,
                '0113.jpg': 23,
                '0114.jpg': 23,
                '0115.jpg': 23,
                '0116.jpg': 23,
                '0117.jpg': 23,
                '0118.jpg': 23,
                '0119.jpg': 23,
                '0120.jpg': 23,
                '0121.jpg': 23,
                '0122.jpg': 23,
                '0123.jpg': 23,
                '0124.jpg': 23,
                '0125.jpg': 23,
                '0126.jpg': 23,
                '0127.jpg': 23,
                '0128.jpg': 23,
                '0129.jpg': 23,
                '0130.jpg': 23,
                '0131.jpg': 23,
                '0132.jpg': 23,
                '0133.jpg': 23,
                '0134.jpg': 23,
                '0135.jpg': 23,
                '0136.jpg': 23,
                '0137.jpg': 23,
                '0138.jpg': 23,
                '0139.jpg': 23,
                '0140.jpg': 23,
                '0141.jpg': 23,
                '0142.jpg': 23,
                '0143.jpg': 23,
                '0144.jpg': 23,
                '0145.jpg': 23,
                '0146.jpg': 23,
                '0147.jpg': 23,
                '0148.jpg': 23,
                '0149.jpg': 23,
                '0150.jpg': 23,
                '0151.jpg': 23,
                '0152.jpg': 22,
                '0153.jpg': 22,
                '0154.jpg': 22,
                '0155.jpg': 22,
                '0156.jpg': 22,
                '0157.jpg': 22,
                '0158.jpg': 22,
                '0159.jpg': 22,
                '0160.jpg': 22,
                '0161.jpg': 22,
                '0162.jpg': 22,
                '0163.jpg': 22,
                '0164.jpg': 23,
                '0165.jpg': 23,
                '0166.jpg': 23,
                '0167.jpg': 23,
                '0168.jpg': 23,
                '0169.jpg': 23,
                '0170.jpg': 24,
                '0171.jpg': 24,
                '0172.jpg': 24,
                '0173.jpg': 24,
                '0174.jpg': 24,
                '0175.jpg': 25,
                '0176.jpg': 25,
                '0177.jpg': 25,
                '0178.jpg': 26,
                '0179.jpg': 26,
                '0180.jpg': 27,
                '0181.jpg': 27,
                '0182.jpg': 28,
                '0183.jpg': 29,
                '0184.jpg': 29,
                '0185.jpg': 30,
                '0186.jpg': 31,
                '0187.jpg': 32,
                '0188.jpg': 33,
                '0189.jpg': 33,
                '0190.jpg': 34,
                '0191.jpg': 34,
                '0192.jpg': 34,
                '0193.jpg': 35,
                '0194.jpg': 35,
                '0195.jpg': 35,
                '0196.jpg': 36,
                '0197.jpg': 36,
                '0198.jpg': 36,
                '0199.jpg': 36,
                '0200.jpg': 37,
                '0201.jpg': 37,
                '0202.jpg': 37,
                '0203.jpg': 37,
                '0204.jpg': 38,
                '0205.jpg': 38,
                '0206.jpg': 38,
                '0207.jpg': 39,
                '0208.jpg': 39,
                '0209.jpg': 40,
                '0210.jpg': 40,
                '0211.jpg': 40,
                '0212.jpg': 40,
                '0213.jpg': 41,
                '0214.jpg': 41,
                '0215.jpg': 41,
                '0216.jpg': 41,
                '0217.jpg': 41,
                '0218.jpg': 40,
                '0219.jpg': 40,
                '0220.jpg': 40,
                '0221.jpg': 40,
                '0222.jpg': 40,
                '0223.jpg': 40,
                '0224.jpg': 39,
                '0225.jpg': 40,
                '0226.jpg': 39,
                '0227.jpg': 39,
                '0228.jpg': 39,
                '0229.jpg': 39,
                '0230.jpg': 39,
                '0231.jpg': 39,
                '0232.jpg': 39,
                '0233.jpg': 39,
                '0234.jpg': 39,
                '0234_2x.jpg': 187,
              },
              totalSize: 7352,
            },
            '10-fall-into-case': {
              assets: {
                '0000.jpg': 39,
                '0001.jpg': 39,
                '0002.jpg': 39,
                '0003.jpg': 39,
                '0004.jpg': 39,
                '0005.jpg': 39,
                '0006.jpg': 39,
                '0007.jpg': 39,
                '0008.jpg': 39,
                '0009.jpg': 39,
                '0010.jpg': 39,
                '0011.jpg': 39,
                '0012.jpg': 39,
                '0013.jpg': 39,
                '0014.jpg': 39,
                '0015.jpg': 39,
                '0016.jpg': 38,
                '0017.jpg': 38,
                '0018.jpg': 38,
                '0019.jpg': 38,
                '0020.jpg': 38,
                '0021.jpg': 38,
                '0022.jpg': 38,
                '0023.jpg': 38,
                '0024.jpg': 38,
                '0025.jpg': 37,
                '0026.jpg': 37,
                '0027.jpg': 36,
                '0028.jpg': 36,
                '0029.jpg': 36,
                '0030.jpg': 34,
                '0031.jpg': 27,
                '0032.jpg': 25,
                '0033.jpg': 24,
                '0034.jpg': 23,
                '0035.jpg': 22,
                '0036.jpg': 21,
                '0037.jpg': 21,
                '0038.jpg': 19,
                '0039.jpg': 18,
                '0040.jpg': 17,
                '0041.jpg': 16,
                '0042.jpg': 15,
                '0043.jpg': 14,
                '0044.jpg': 13,
                '0045.jpg': 12,
                '0046.jpg': 11,
                '0047.jpg': 11,
                '0048.jpg': 10,
                '0049.jpg': 10,
                '0050.jpg': 9,
                '0051.jpg': 8,
                '0052.jpg': 7,
                '0053.jpg': 7,
                '0054.jpg': 7,
                '0055.jpg': 7,
                '0056.jpg': 7,
                '0057.jpg': 7,
                '0058.jpg': 7,
                '0059.jpg': 7,
                '0060.jpg': 7,
                '0061.jpg': 7,
                '0062.jpg': 7,
                '0063.jpg': 7,
                '0064.jpg': 7,
                '0065.jpg': 7,
                '0066.jpg': 7,
                '0067.jpg': 7,
                '0068.jpg': 7,
                '0069.jpg': 7,
                '0070.jpg': 8,
                '0071.jpg': 9,
                '0072.jpg': 10,
                '0073.jpg': 11,
                '0074.jpg': 11,
                '0075.jpg': 12,
                '0076.jpg': 12,
                '0077.jpg': 13,
                '0078.jpg': 13,
                '0079.jpg': 14,
                '0080.jpg': 14,
                '0081.jpg': 14,
                '0082.jpg': 15,
                '0083.jpg': 15,
                '0084.jpg': 15,
                '0085.jpg': 16,
                '0086.jpg': 16,
                '0087.jpg': 16,
                '0088.jpg': 16,
                '0089.jpg': 16,
                '0090.jpg': 17,
                '0091.jpg': 17,
                '0092.jpg': 17,
                '0093.jpg': 17,
                '0094.jpg': 17,
                '0095.jpg': 17,
                '0096.jpg': 17,
                '0096_2x.jpg': 92,
                '0097.jpg': 17,
                '0098.jpg': 17,
                '0099.jpg': 17,
                '0100.jpg': 17,
                '0101.jpg': 17,
                '0102.jpg': 17,
                '0103.jpg': 17,
                '0104.jpg': 17,
                '0105.jpg': 17,
                '0106.jpg': 17,
                '0107.jpg': 17,
                '0108.jpg': 17,
                '0109.jpg': 17,
                '0110.jpg': 18,
                '0111.jpg': 19,
                '0112.jpg': 20,
                '0113.jpg': 20,
                '0114.jpg': 20,
                '0115.jpg': 21,
                '0116.jpg': 21,
                '0117.jpg': 22,
                '0118.jpg': 22,
                '0119.jpg': 23,
                '0120.jpg': 23,
                '0121.jpg': 24,
                '0122.jpg': 25,
                '0123.jpg': 26,
                '0124.jpg': 26,
                '0125.jpg': 27,
                '0126.jpg': 28,
                '0127.jpg': 28,
                '0128.jpg': 28,
                '0129.jpg': 28,
                '0130.jpg': 28,
                '0131.jpg': 28,
                '0132.jpg': 28,
                '0133.jpg': 28,
                '0134.jpg': 28,
                '0135.jpg': 28,
                '0136.jpg': 27,
                '0137.jpg': 27,
                '0138.jpg': 27,
                '0139.jpg': 27,
                '0140.jpg': 27,
                '0141.jpg': 27,
                '0142.jpg': 27,
                '0143.jpg': 26,
                '0144.jpg': 25,
                '0145.jpg': 25,
                '0146.jpg': 24,
                '0147.jpg': 23,
                '0148.jpg': 23,
                '0149.jpg': 22,
                '0150.jpg': 22,
                '0151.jpg': 21,
                '0152.jpg': 21,
                '0153.jpg': 21,
                '0154.jpg': 20,
                '0155.jpg': 20,
                '0156.jpg': 20,
                '0157.jpg': 20,
                '0158.jpg': 20,
                '0159.jpg': 19,
                '0160.jpg': 19,
                '0161.jpg': 19,
                '0162.jpg': 19,
                '0163.jpg': 19,
                '0164.jpg': 18,
                '0165.jpg': 18,
                '0166.jpg': 18,
                '0167.jpg': 18,
                '0168.jpg': 18,
                '0169.jpg': 18,
                '0170.jpg': 18,
                '0171.jpg': 18,
                '0172.jpg': 18,
                '0173.jpg': 18,
                '0174.jpg': 18,
                '0175.jpg': 18,
                '0176.jpg': 18,
                '0177.jpg': 18,
                '0178.jpg': 18,
                '0179.jpg': 18,
                '0180.jpg': 18,
                '0181.jpg': 18,
                '0182.jpg': 18,
                '0183.jpg': 18,
                '0184.jpg': 18,
                '0185.jpg': 18,
                '0186.jpg': 18,
                '0187.jpg': 18,
                '0188.jpg': 18,
                '0189.jpg': 18,
                '0190.jpg': 18,
                '0191.jpg': 18,
                '0192.jpg': 18,
                '0193.jpg': 18,
                '0194.jpg': 18,
                '0194_2x.jpg': 98,
                '0195.jpg': 18,
                '0196.jpg': 18,
                '0197.jpg': 18,
                '0198.jpg': 18,
                '0199.jpg': 18,
                '0200.jpg': 18,
                '0201.jpg': 18,
                '0202.jpg': 18,
                '0203.jpg': 18,
                '0204.jpg': 18,
                '0205.jpg': 18,
                '0206.jpg': 18,
                '0207.jpg': 18,
                '0208.jpg': 18,
                '0209.jpg': 18,
                '0210.jpg': 18,
                '0211.jpg': 18,
                '0212.jpg': 18,
                '0213.jpg': 18,
                '0214.jpg': 18,
                '0215.jpg': 17,
                '0216.jpg': 17,
                '0217.jpg': 16,
                '0218.jpg': 16,
                '0219.jpg': 16,
                '0220.jpg': 15,
                '0221.jpg': 15,
                '0222.jpg': 15,
                '0223.jpg': 15,
                '0224.jpg': 14,
                '0225.jpg': 14,
                '0226.jpg': 14,
                '0227.jpg': 14,
                '0228.jpg': 14,
                '0229.jpg': 14,
                '0230.jpg': 14,
                '0231.jpg': 14,
                '0232.jpg': 14,
                '0233.jpg': 14,
                '0234.jpg': 14,
                '0235.jpg': 14,
                '0236.jpg': 14,
                '0237.jpg': 14,
                '0238.jpg': 14,
                '0239.jpg': 14,
                '0240.jpg': 14,
                '0241.jpg': 14,
                '0242.jpg': 13,
                '0243.jpg': 13,
                '0244.jpg': 13,
                '0245.jpg': 13,
                '0246.jpg': 13,
                '0247.jpg': 13,
                '0248.jpg': 13,
                '0249.jpg': 13,
                '0250.jpg': 13,
                '0251.jpg': 13,
                '0252.jpg': 12,
                '0253.jpg': 12,
                '0254.jpg': 12,
                '0255.jpg': 12,
                '0256.jpg': 11,
                '0257.jpg': 11,
                '0258.jpg': 11,
                '0259.jpg': 11,
                '0260.jpg': 11,
                '0261.jpg': 10,
                '0262.jpg': 10,
                '0263.jpg': 10,
                '0264.jpg': 10,
                '0265.jpg': 10,
                '0266.jpg': 10,
                '0267.jpg': 10,
                '0268.jpg': 10,
                '0269.jpg': 10,
                '0270.jpg': 9,
                '0271.jpg': 9,
                '0272.jpg': 9,
                '0273.jpg': 9,
                '0274.jpg': 9,
                '0275.jpg': 9,
                '0276.jpg': 9,
                '0277.jpg': 8,
                '0278.jpg': 8,
                '0279.jpg': 8,
                '0280.jpg': 8,
                '0281.jpg': 8,
                '0282.jpg': 8,
                '0283.jpg': 8,
                '0284.jpg': 8,
                '0285.jpg': 8,
                '0286.jpg': 7,
                '0287.jpg': 7,
                '0288.jpg': 7,
                '0289.jpg': 7,
              },
              totalSize: 5522,
            },
          },
          medium: {
            '03-flip-for-guts': {
              assets: {
                '0000.jpg': 35,
                '0002.jpg': 34,
                '0001.jpg': 35,
                '0003.jpg': 34,
                '0004.jpg': 34,
                '0005.jpg': 33,
                '0006.jpg': 33,
                '0007.jpg': 33,
                '0008.jpg': 32,
                '0009.jpg': 32,
                '0010.jpg': 31,
                '0011.jpg': 31,
                '0012.jpg': 30,
                '0013.jpg': 30,
                '0014.jpg': 29,
                '0015.jpg': 28,
                '0016.jpg': 28,
                '0017.jpg': 27,
                '0018.jpg': 26,
                '0019.jpg': 25,
                '0020.jpg': 24,
                '0021.jpg': 23,
                '0022.jpg': 22,
                '0023.jpg': 21,
                '0024.jpg': 19,
                '0025.jpg': 18,
                '0026.jpg': 17,
                '0027.jpg': 16,
                '0028.jpg': 14,
                '0029.jpg': 13,
                '0030.jpg': 12,
                '0031.jpg': 11,
                '0032.jpg': 10,
                '0033.jpg': 9,
                '0034.jpg': 8,
                '0035.jpg': 3,
                '0036.jpg': 3,
                '0037.jpg': 3,
                '0038.jpg': 3,
                '0039.jpg': 3,
                '0040.jpg': 3,
                '0041.jpg': 3,
                '0042.jpg': 3,
                '0043.jpg': 4,
                '0044.jpg': 4,
                '0045.jpg': 4,
                '0046.jpg': 4,
                '0047.jpg': 4,
                '0048.jpg': 4,
                '0049.jpg': 4,
                '0050.jpg': 4,
                '0051.jpg': 5,
                '0052.jpg': 5,
                '0053.jpg': 5,
                '0054.jpg': 5,
                '0055.jpg': 5,
                '0056.jpg': 6,
                '0057.jpg': 6,
                '0058.jpg': 6,
                '0059.jpg': 6,
                '0060.jpg': 7,
                '0061.jpg': 7,
                '0062.jpg': 7,
                '0063.jpg': 7,
                '0064.jpg': 8,
                '0065.jpg': 8,
                '0066.jpg': 8,
                '0067.jpg': 8,
                '0068.jpg': 8,
                '0069.jpg': 8,
                '0070.jpg': 8,
                '0071.jpg': 9,
                '0072.jpg': 9,
                '0073.jpg': 9,
                '0074.jpg': 9,
                '0075.jpg': 9,
                '0076.jpg': 9,
                '0077.jpg': 9,
                '0078.jpg': 9,
                '0079.jpg': 10,
                '0080.jpg': 10,
                '0081.jpg': 10,
                '0082.jpg': 10,
                '0083.jpg': 10,
                '0084.jpg': 11,
                '0085.jpg': 11,
                '0086.jpg': 11,
                '0087.jpg': 11,
                '0088.jpg': 11,
                '0088_2x.jpg': 174,
              },
              totalSize: 1397,
            },
            '01-hero-lightpass': {
              assets: {
                '0000.jpg': 16,
                '0000_2x.jpg': 67,
                '0001.jpg': 17,
                '0002.jpg': 17,
                '0003.jpg': 18,
                '0004.jpg': 19,
                '0005.jpg': 19,
                '0006.jpg': 20,
                '0007.jpg': 21,
                '0008.jpg': 21,
                '0009.jpg': 22,
                '0010.jpg': 23,
                '0011.jpg': 23,
                '0012.jpg': 24,
                '0013.jpg': 24,
                '0014.jpg': 25,
                '0015.jpg': 25,
                '0016.jpg': 25,
                '0017.jpg': 26,
                '0018.jpg': 26,
                '0019.jpg': 26,
                '0020.jpg': 26,
                '0021.jpg': 27,
                '0022.jpg': 27,
                '0023.jpg': 27,
                '0024.jpg': 27,
                '0025.jpg': 27,
                '0026.jpg': 27,
                '0027.jpg': 28,
                '0028.jpg': 28,
                '0029.jpg': 28,
                '0030.jpg': 28,
                '0031.jpg': 28,
                '0032.jpg': 28,
                '0033.jpg': 28,
                '0034.jpg': 28,
                '0035.jpg': 28,
                '0036.jpg': 29,
                '0037.jpg': 29,
                '0038.jpg': 29,
                '0039.jpg': 29,
                '0040.jpg': 29,
                '0041.jpg': 29,
                '0042.jpg': 29,
                '0043.jpg': 29,
                '0044.jpg': 29,
                '0045.jpg': 29,
                '0046.jpg': 29,
                '0047.jpg': 29,
                '0048.jpg': 29,
                '0049.jpg': 29,
                '0050.jpg': 29,
                '0051.jpg': 29,
                '0052.jpg': 29,
                '0053.jpg': 29,
                '0054.jpg': 29,
                '0055.jpg': 29,
                '0056.jpg': 29,
                '0057.jpg': 29,
                '0058.jpg': 29,
                '0059.jpg': 29,
                '0060.jpg': 29,
                '0061.jpg': 29,
                '0062.jpg': 29,
                '0063.jpg': 29,
                '0064.jpg': 29,
                '0065.jpg': 29,
                '0066.jpg': 29,
                '0067.jpg': 29,
                '0068.jpg': 30,
                '0069.jpg': 29,
                '0070.jpg': 29,
                '0071.jpg': 29,
                '0072.jpg': 29,
                '0073.jpg': 29,
                '0074.jpg': 29,
                '0075.jpg': 29,
                '0076.jpg': 29,
                '0077.jpg': 29,
                '0078.jpg': 29,
                '0079.jpg': 29,
                '0080.jpg': 29,
                '0081.jpg': 29,
                '0082.jpg': 29,
                '0083.jpg': 29,
                '0084.jpg': 29,
                '0085.jpg': 29,
                '0086.jpg': 29,
                '0087.jpg': 29,
                '0088.jpg': 29,
                '0089.jpg': 29,
                '0090.jpg': 29,
                '0091.jpg': 29,
                '0092.jpg': 29,
                '0093.jpg': 29,
                '0094.jpg': 29,
                '0095.jpg': 29,
                '0096.jpg': 29,
                '0097.jpg': 29,
                '0098.jpg': 28,
                '0099.jpg': 28,
                '0100.jpg': 28,
                '0101.jpg': 28,
                '0102.jpg': 28,
                '0103.jpg': 28,
                '0104.jpg': 28,
                '0105.jpg': 28,
                '0106.jpg': 28,
                '0107.jpg': 28,
                '0108.jpg': 28,
                '0109.jpg': 28,
                '0110.jpg': 27,
                '0111.jpg': 27,
                '0112.jpg': 27,
                '0113.jpg': 27,
                '0114.jpg': 26,
                '0115.jpg': 26,
                '0116.jpg': 25,
                '0117.jpg': 25,
                '0118.jpg': 24,
                '0119.jpg': 24,
                '0120.jpg': 23,
                '0121.jpg': 22,
                '0122.jpg': 22,
                '0123.jpg': 21,
                '0124.jpg': 20,
                '0125.jpg': 20,
                '0126.jpg': 19,
                '0127.jpg': 18,
                '0128.jpg': 17,
                '0129.jpg': 16,
                '0130.jpg': 15,
                '0131.jpg': 14,
                '0132.jpg': 13,
                '0133.jpg': 12,
                '0134.jpg': 11,
                '0135.jpg': 10,
                '0136.jpg': 9,
                '0137.jpg': 8,
                '0137_2x.jpg': 36,
                '0138.jpg': 8,
                '0139.jpg': 7,
                '0140.jpg': 7,
                '0141.jpg': 7,
                '0142.jpg': 7,
                '0143.jpg': 6,
                '0144.jpg': 6,
                '0145.jpg': 6,
                '0146.jpg': 6,
                '0147.jpg': 5,
              },
              totalSize: 3728,
            },
            '02-head-bob-turn': {
              assets: {
                '0000.jpg': 7,
                '0001.jpg': 9,
                '0002.jpg': 10,
                '0003.jpg': 10,
                '0004.jpg': 11,
                '0005.jpg': 12,
                '0006.jpg': 13,
                '0007.jpg': 13,
                '0008.jpg': 14,
                '0009.jpg': 15,
                '0010.jpg': 16,
                '0011.jpg': 17,
                '0012.jpg': 18,
                '0013.jpg': 19,
                '0014.jpg': 20,
                '0015.jpg': 21,
                '0016.jpg': 21,
                '0017.jpg': 22,
                '0018.jpg': 23,
                '0019.jpg': 24,
                '0020.jpg': 25,
                '0021.jpg': 26,
                '0022.jpg': 27,
                '0023.jpg': 28,
                '0024.jpg': 28,
                '0025.jpg': 29,
                '0026.jpg': 29,
                '0027.jpg': 30,
                '0028.jpg': 31,
                '0029.jpg': 31,
                '0030.jpg': 32,
                '0031.jpg': 33,
                '0032.jpg': 34,
                '0033.jpg': 35,
                '0034.jpg': 36,
                '0035.jpg': 37,
                '0036.jpg': 38,
                '0037.jpg': 39,
                '0038.jpg': 40,
                '0039.jpg': 41,
                '0040.jpg': 41,
                '0041.jpg': 42,
                '0042.jpg': 43,
                '0043.jpg': 45,
                '0044.jpg': 46,
                '0045.jpg': 47,
                '0046.jpg': 48,
                '0047.jpg': 49,
                '0048.jpg': 49,
                '0049.jpg': 50,
                '0050.jpg': 51,
                '0051.jpg': 51,
                '0052.jpg': 51,
                '0053.jpg': 52,
                '0054.jpg': 51,
                '0055.jpg': 51,
                '0056.jpg': 51,
                '0057.jpg': 50,
                '0058.jpg': 50,
                '0059.jpg': 50,
                '0060.jpg': 49,
                '0061.jpg': 48,
                '0062.jpg': 47,
                '0063.jpg': 47,
                '0064.jpg': 47,
                '0065.jpg': 47,
                '0066.jpg': 47,
                '0067.jpg': 46,
                '0068.jpg': 47,
                '0069.jpg': 47,
                '0070.jpg': 47,
                '0071.jpg': 47,
                '0072.jpg': 47,
                '0073.jpg': 47,
                '0074.jpg': 48,
                '0075.jpg': 48,
                '0076.jpg': 47,
                '0077.jpg': 47,
                '0078.jpg': 47,
                '0079.jpg': 47,
                '0080.jpg': 47,
                '0081.jpg': 47,
                '0082.jpg': 47,
                '0083.jpg': 47,
                '0084.jpg': 47,
                '0085.jpg': 47,
                '0086.jpg': 47,
                '0087.jpg': 47,
                '0088.jpg': 47,
                '0089.jpg': 47,
                '0090.jpg': 47,
                '0091.jpg': 47,
                '0092.jpg': 47,
                '0093.jpg': 46,
                '0094.jpg': 46,
                '0095.jpg': 46,
                '0096.jpg': 46,
                '0097.jpg': 46,
                '0098.jpg': 46,
                '0099.jpg': 45,
                '0100.jpg': 45,
                '0101.jpg': 45,
                '0102.jpg': 45,
                '0103.jpg': 44,
                '0104.jpg': 44,
                '0105.jpg': 44,
                '0106.jpg': 43,
                '0107.jpg': 43,
                '0108.jpg': 43,
                '0109.jpg': 42,
                '0110.jpg': 42,
                '0111.jpg': 42,
                '0112.jpg': 42,
                '0113.jpg': 41,
                '0114.jpg': 41,
                '0115.jpg': 41,
                '0116.jpg': 41,
                '0117.jpg': 40,
                '0118.jpg': 40,
                '0119.jpg': 40,
                '0120.jpg': 39,
                '0121.jpg': 39,
                '0122.jpg': 39,
                '0123.jpg': 38,
                '0124.jpg': 38,
                '0125.jpg': 38,
                '0126.jpg': 37,
                '0127.jpg': 37,
                '0128.jpg': 36,
                '0129.jpg': 36,
                '0130.jpg': 36,
                '0131.jpg': 36,
              },
              totalSize: 5105,
            },
            '04-explode-tips': {
              assets: {
                '0000.jpg': 12,
                '0000_2x.jpg': 57,
                '0001.jpg': 12,
                '0002.jpg': 12,
                '0003.jpg': 12,
                '0004.jpg': 12,
                '0005.jpg': 12,
                '0006.jpg': 12,
                '0007.jpg': 12,
                '0008.jpg': 12,
                '0009.jpg': 12,
                '0010.jpg': 12,
                '0011.jpg': 12,
                '0012.jpg': 12,
                '0013.jpg': 12,
                '0014.jpg': 12,
                '0015.jpg': 12,
                '0016.jpg': 12,
                '0017.jpg': 12,
                '0018.jpg': 12,
                '0019.jpg': 12,
                '0020.jpg': 12,
                '0021.jpg': 12,
                '0022.jpg': 12,
                '0023.jpg': 12,
                '0024.jpg': 12,
                '0025.jpg': 12,
                '0026.jpg': 12,
                '0027.jpg': 12,
                '0028.jpg': 12,
                '0029.jpg': 12,
                '0030.jpg': 12,
                '0031.jpg': 12,
                '0032.jpg': 12,
                '0033.jpg': 12,
                '0034.jpg': 12,
                '0035.jpg': 12,
                '0036.jpg': 12,
                '0037.jpg': 12,
                '0038.jpg': 12,
                '0039.jpg': 12,
                '0040.jpg': 12,
                '0041.jpg': 12,
                '0042.jpg': 12,
                '0043.jpg': 12,
                '0044.jpg': 12,
                '0045.jpg': 12,
                '0046.jpg': 12,
                '0047.jpg': 11,
                '0048.jpg': 11,
                '0049.jpg': 11,
                '0050.jpg': 11,
                '0051.jpg': 11,
                '0052.jpg': 11,
                '0053.jpg': 11,
                '0054.jpg': 11,
                '0055.jpg': 11,
                '0056.jpg': 11,
                '0057.jpg': 11,
                '0058.jpg': 11,
                '0059.jpg': 11,
                '0060.jpg': 11,
                '0061.jpg': 11,
                '0062.jpg': 11,
                '0063.jpg': 12,
                '0064.jpg': 12,
                '0065.jpg': 12,
                '0066.jpg': 12,
                '0067.jpg': 12,
                '0068.jpg': 13,
                '0069.jpg': 13,
                '0070.jpg': 14,
                '0071.jpg': 14,
                '0072.jpg': 14,
                '0073.jpg': 14,
                '0074.jpg': 14,
                '0075.jpg': 14,
                '0076.jpg': 14,
                '0077.jpg': 14,
                '0078.jpg': 14,
                '0079.jpg': 14,
                '0080.jpg': 14,
                '0081.jpg': 14,
                '0082.jpg': 14,
                '0083.jpg': 14,
                '0083_2x.jpg': 64,
                '0084.jpg': 14,
                '0085.jpg': 14,
                '0086.jpg': 14,
                '0087.jpg': 14,
                '0088.jpg': 14,
                '0089.jpg': 14,
                '0090.jpg': 14,
                '0091.jpg': 14,
                '0092.jpg': 14,
                '0093.jpg': 13,
                '0094.jpg': 13,
                '0095.jpg': 13,
                '0096.jpg': 13,
                '0097.jpg': 13,
                '0098.jpg': 12,
                '0099.jpg': 12,
                '0100.jpg': 11,
                '0101.jpg': 11,
                '0102.jpg': 11,
                '0103.jpg': 11,
                '0104.jpg': 11,
                '0105.jpg': 11,
                '0106.jpg': 11,
                '0107.jpg': 11,
                '0108.jpg': 11,
                '0109.jpg': 11,
                '0110.jpg': 11,
                '0111.jpg': 11,
                '0112.jpg': 11,
                '0113.jpg': 11,
                '0114.jpg': 11,
                '0115.jpg': 11,
                '0116.jpg': 11,
                '0117.jpg': 11,
                '0118.jpg': 11,
                '0119.jpg': 11,
                '0120.jpg': 11,
                '0121.jpg': 11,
                '0122.jpg': 11,
                '0123.jpg': 11,
                '0124.jpg': 11,
                '0125.jpg': 11,
                '0126.jpg': 11,
                '0127.jpg': 11,
                '0128.jpg': 11,
                '0129.jpg': 10,
                '0130.jpg': 10,
                '0131.jpg': 10,
                '0132.jpg': 10,
                '0133.jpg': 10,
                '0134.jpg': 10,
                '0135.jpg': 10,
                '0136.jpg': 10,
                '0137.jpg': 10,
                '0138.jpg': 10,
                '0138_2x.jpg': 51,
              },
              totalSize: 1828,
            },
            '05-flip-for-nc': {
              assets: {
                '0000.jpg': 10,
                '0000_2x.jpg': 51,
                '0001.jpg': 10,
                '0002.jpg': 9,
                '0003.jpg': 9,
                '0004.jpg': 9,
                '0005.jpg': 9,
                '0006.jpg': 9,
                '0007.jpg': 9,
                '0008.jpg': 8,
                '0009.jpg': 8,
                '0010.jpg': 8,
                '0011.jpg': 7,
                '0012.jpg': 7,
                '0013.jpg': 7,
                '0014.jpg': 6,
                '0015.jpg': 6,
                '0016.jpg': 5,
                '0017.jpg': 5,
                '0018.jpg': 5,
                '0019.jpg': 5,
                '0020.jpg': 5,
                '0021.jpg': 5,
                '0022.jpg': 5,
                '0023.jpg': 5,
                '0024.jpg': 4,
                '0025.jpg': 4,
                '0026.jpg': 4,
                '0027.jpg': 5,
                '0028.jpg': 5,
                '0029.jpg': 5,
                '0030.jpg': 6,
                '0031.jpg': 6,
                '0032.jpg': 6,
                '0033.jpg': 7,
                '0034.jpg': 7,
                '0035.jpg': 7,
                '0036.jpg': 7,
                '0037.jpg': 7,
                '0038.jpg': 7,
                '0039.jpg': 7,
                '0040.jpg': 7,
                '0041.jpg': 7,
                '0042.jpg': 7,
                '0043.jpg': 7,
                '0044.jpg': 7,
                '0045.jpg': 7,
                '0046.jpg': 7,
                '0047.jpg': 7,
                '0048.jpg': 7,
                '0049.jpg': 7,
                '0050.jpg': 7,
                '0051.jpg': 7,
                '0052.jpg': 7,
                '0053.jpg': 8,
                '0054.jpg': 8,
                '0055.jpg': 8,
                '0056.jpg': 8,
                '0057.jpg': 8,
                '0058.jpg': 8,
                '0059.jpg': 8,
                '0060.jpg': 8,
                '0061.jpg': 8,
                '0062.jpg': 8,
                '0063.jpg': 8,
                '0064.jpg': 8,
                '0065.jpg': 8,
                '0066.jpg': 8,
                '0067.jpg': 8,
                '0068.jpg': 8,
                '0069.jpg': 8,
                '0070.jpg': 8,
                '0071.jpg': 8,
                '0072.jpg': 8,
                '0073.jpg': 8,
                '0074.jpg': 8,
                '0075.jpg': 8,
                '0076.jpg': 8,
                '0076_2x.jpg': 44,
                '0077.jpg': 8,
                '0078.jpg': 8,
                '0079.jpg': 8,
                '0080.jpg': 8,
                '0081.jpg': 8,
                '0082.jpg': 8,
                '0083.jpg': 7,
                '0084.jpg': 7,
                '0085.jpg': 7,
                '0086.jpg': 7,
                '0087.jpg': 7,
                '0088.jpg': 7,
                '0089.jpg': 7,
                '0090.jpg': 7,
                '0091.jpg': 7,
                '0092.jpg': 7,
                '0093.jpg': 7,
                '0094.jpg': 7,
                '0095.jpg': 7,
                '0096.jpg': 6,
                '0097.jpg': 6,
                '0097_2x.jpg': 39,
                '0098.jpg': 6,
                '0099.jpg': 6,
                '0100.jpg': 6,
                '0101.jpg': 6,
                '0102.jpg': 6,
                '0103.jpg': 6,
                '0104.jpg': 6,
                '0105.jpg': 6,
                '0106.jpg': 6,
                '0107.jpg': 5,
                '0108.jpg': 5,
                '0109.jpg': 5,
                '0110.jpg': 5,
                '0111.jpg': 5,
                '0112.jpg': 5,
                '0113.jpg': 5,
                '0114.jpg': 5,
                '0115.jpg': 5,
                '0116.jpg': 5,
                '0117.jpg': 5,
                '0118.jpg': 4,
                '0119.jpg': 4,
                '0120.jpg': 4,
                '0121.jpg': 4,
                '0122.jpg': 4,
                '0123.jpg': 4,
                '0124.jpg': 4,
                '0125.jpg': 4,
                '0126.jpg': 4,
                '0127.jpg': 4,
                '0128.jpg': 4,
                '0129.jpg': 4,
                '0129_2x.jpg': 29,
                '0130.jpg': 4,
                '0131.jpg': 3,
                '0132.jpg': 3,
                '0133.jpg': 3,
                '0134.jpg': 3,
                '0135.jpg': 3,
                '0136.jpg': 3,
                '0137.jpg': 3,
                '0138.jpg': 3,
                '0139.jpg': 3,
              },
              totalSize: 1050,
            },
            '07-flip-reveal-guts': {
              assets: {
                '0000.jpg': 15,
                '0000_2x.jpg': 62,
                '0001.jpg': 15,
                '0002.jpg': 15,
                '0003.jpg': 15,
                '0004.jpg': 15,
                '0005.jpg': 15,
                '0006.jpg': 15,
                '0007.jpg': 15,
                '0008.jpg': 15,
                '0009.jpg': 15,
                '0010.jpg': 15,
                '0011.jpg': 15,
                '0012.jpg': 16,
                '0013.jpg': 17,
                '0014.jpg': 17,
                '0015.jpg': 18,
                '0016.jpg': 18,
                '0017.jpg': 18,
                '0018.jpg': 17,
                '0019.jpg': 17,
                '0020.jpg': 17,
                '0021.jpg': 18,
                '0022.jpg': 18,
                '0023.jpg': 18,
                '0024.jpg': 18,
                '0025.jpg': 19,
                '0026.jpg': 18,
                '0027.jpg': 19,
                '0028.jpg': 19,
                '0029.jpg': 19,
                '0030.jpg': 20,
                '0031.jpg': 21,
                '0032.jpg': 21,
                '0033.jpg': 21,
                '0034.jpg': 21,
                '0035.jpg': 20,
                '0036.jpg': 18,
                '0037.jpg': 18,
                '0038.jpg': 18,
                '0039.jpg': 19,
                '0040.jpg': 19,
                '0041.jpg': 19,
                '0042.jpg': 19,
                '0043.jpg': 19,
                '0044.jpg': 19,
                '0045.jpg': 19,
                '0046.jpg': 19,
                '0046_2x.jpg': 76,
                '0047.jpg': 19,
                '0048.jpg': 19,
                '0049.jpg': 20,
                '0050.jpg': 20,
                '0051.jpg': 21,
                '0052.jpg': 21,
                '0053.jpg': 21,
                '0054.jpg': 21,
                '0055.jpg': 21,
                '0056.jpg': 20,
                '0057.jpg': 20,
                '0058.jpg': 19,
                '0059.jpg': 19,
                '0060.jpg': 18,
                '0061.jpg': 18,
                '0062.jpg': 17,
                '0063.jpg': 17,
                '0064.jpg': 17,
                '0065.jpg': 17,
                '0066.jpg': 17,
                '0067.jpg': 17,
                '0068.jpg': 17,
                '0068_2x.jpg': 71,
              },
              totalSize: 1456,
            },
            '06-transparency-head': {
              assets: {
                '0000.jpg': 31,
                '0001.jpg': 31,
                '0002.jpg': 32,
                '0003.jpg': 32,
                '0004.jpg': 33,
                '0005.jpg': 34,
                '0006.jpg': 34,
                '0007.jpg': 34,
                '0008.jpg': 35,
                '0009.jpg': 35,
                '0010.jpg': 35,
                '0011.jpg': 36,
                '0012.jpg': 36,
                '0013.jpg': 36,
                '0014.jpg': 36,
                '0015.jpg': 36,
                '0016.jpg': 36,
                '0017.jpg': 36,
                '0018.jpg': 36,
                '0019.jpg': 36,
                '0020.jpg': 36,
                '0021.jpg': 36,
                '0022.jpg': 36,
                '0023.jpg': 36,
                '0024.jpg': 36,
                '0025.jpg': 36,
                '0026.jpg': 36,
                '0027.jpg': 36,
                '0028.jpg': 36,
                '0029.jpg': 36,
                '0030.jpg': 36,
                '0031.jpg': 36,
                '0032.jpg': 36,
                '0033.jpg': 36,
                '0034.jpg': 36,
                '0035.jpg': 36,
                '0036.jpg': 36,
                '0037.jpg': 36,
                '0038.jpg': 36,
                '0039.jpg': 36,
                '0040.jpg': 36,
                '0041.jpg': 36,
                '0042.jpg': 36,
                '0043.jpg': 36,
                '0044.jpg': 36,
                '0045.jpg': 36,
                '0046.jpg': 36,
                '0047.jpg': 36,
                '0048.jpg': 36,
                '0049.jpg': 36,
                '0050.jpg': 36,
                '0051.jpg': 36,
                '0052.jpg': 36,
                '0053.jpg': 36,
                '0054.jpg': 36,
                '0055.jpg': 36,
                '0056.jpg': 36,
                '0057.jpg': 36,
                '0058.jpg': 36,
                '0059.jpg': 36,
                '0060.jpg': 36,
                '0061.jpg': 36,
                '0062.jpg': 36,
                '0063.jpg': 36,
                '0064.jpg': 36,
                '0065.jpg': 36,
                '0066.jpg': 36,
                '0067.jpg': 35,
                '0068.jpg': 35,
                '0069.jpg': 35,
                '0070.jpg': 35,
                '0071.jpg': 35,
                '0072.jpg': 35,
                '0073.jpg': 35,
                '0074.jpg': 35,
                '0075.jpg': 35,
                '0076.jpg': 35,
                '0077.jpg': 35,
                '0078.jpg': 35,
                '0079.jpg': 35,
                '0080.jpg': 35,
                '0081.jpg': 35,
                '0082.jpg': 35,
                '0083.jpg': 35,
                '0084.jpg': 35,
                '0085.jpg': 35,
                '0086.jpg': 35,
                '0087.jpg': 35,
                '0088.jpg': 35,
                '0089.jpg': 35,
                '0090.jpg': 34,
                '0091.jpg': 34,
                '0092.jpg': 34,
                '0093.jpg': 34,
                '0094.jpg': 34,
                '0095.jpg': 34,
                '0096.jpg': 34,
                '0097.jpg': 34,
                '0098.jpg': 33,
                '0099.jpg': 33,
                '0100.jpg': 33,
                '0101.jpg': 33,
                '0102.jpg': 34,
                '0103.jpg': 35,
                '0104.jpg': 37,
                '0105.jpg': 38,
                '0106.jpg': 39,
                '0107.jpg': 40,
                '0108.jpg': 40,
                '0109.jpg': 41,
                '0110.jpg': 41,
                '0111.jpg': 42,
                '0112.jpg': 43,
                '0113.jpg': 45,
                '0114.jpg': 46,
                '0115.jpg': 46,
                '0116.jpg': 48,
                '0117.jpg': 48,
                '0118.jpg': 48,
                '0119.jpg': 48,
                '0120.jpg': 48,
                '0121.jpg': 48,
                '0122.jpg': 47,
                '0123.jpg': 47,
                '0124.jpg': 47,
                '0125.jpg': 47,
                '0126.jpg': 47,
                '0127.jpg': 47,
                '0128.jpg': 47,
                '0129.jpg': 47,
                '0130.jpg': 47,
                '0131.jpg': 47,
                '0132.jpg': 47,
                '0133.jpg': 47,
                '0134.jpg': 47,
                '0135.jpg': 47,
                '0136.jpg': 47,
                '0137.jpg': 47,
                '0138.jpg': 47,
                '0139.jpg': 47,
                '0140.jpg': 47,
                '0141.jpg': 47,
                '0142.jpg': 47,
                '0143.jpg': 47,
                '0144.jpg': 47,
                '0145.jpg': 47,
                '0146.jpg': 47,
                '0147.jpg': 47,
                '0148.jpg': 47,
                '0149.jpg': 47,
                '0150.jpg': 47,
                '0151.jpg': 47,
                '0152.jpg': 47,
                '0153.jpg': 46,
                '0154.jpg': 46,
                '0155.jpg': 47,
                '0156.jpg': 47,
                '0157.jpg': 47,
                '0158.jpg': 47,
                '0159.jpg': 47,
                '0160.jpg': 48,
                '0161.jpg': 48,
                '0162.jpg': 49,
                '0163.jpg': 49,
                '0164.jpg': 49,
                '0165.jpg': 50,
                '0166.jpg': 51,
                '0167.jpg': 51,
                '0168.jpg': 51,
                '0169.jpg': 50,
                '0170.jpg': 50,
                '0171.jpg': 50,
                '0172.jpg': 49,
                '0173.jpg': 48,
                '0174.jpg': 47,
                '0175.jpg': 46,
                '0176.jpg': 46,
              },
              totalSize: 7062,
            },
            '08-turn-for-chip': {
              assets: {
                '0000.jpg': 14,
                '0001.jpg': 14,
                '0002.jpg': 14,
                '0003.jpg': 14,
                '0004.jpg': 14,
                '0005.jpg': 14,
                '0006.jpg': 14,
                '0007.jpg': 14,
                '0008.jpg': 14,
                '0009.jpg': 14,
                '0010.jpg': 14,
                '0011.jpg': 14,
                '0012.jpg': 14,
                '0013.jpg': 14,
                '0014.jpg': 13,
                '0015.jpg': 13,
                '0016.jpg': 13,
                '0017.jpg': 12,
                '0018.jpg': 12,
                '0019.jpg': 11,
                '0020.jpg': 11,
                '0021.jpg': 10,
                '0022.jpg': 10,
                '0023.jpg': 10,
                '0024.jpg': 9,
                '0025.jpg': 9,
                '0026.jpg': 9,
                '0027.jpg': 9,
                '0028.jpg': 9,
                '0029.jpg': 9,
                '0030.jpg': 9,
                '0031.jpg': 9,
                '0032.jpg': 9,
                '0033.jpg': 9,
                '0034.jpg': 9,
                '0035.jpg': 9,
                '0036.jpg': 9,
                '0037.jpg': 9,
                '0038.jpg': 9,
                '0039.jpg': 9,
                '0040.jpg': 9,
                '0041.jpg': 9,
                '0042.jpg': 9,
                '0043.jpg': 9,
                '0044.jpg': 9,
                '0045.jpg': 9,
                '0046.jpg': 10,
                '0047.jpg': 10,
                '0048.jpg': 10,
                '0049.jpg': 10,
                '0050.jpg': 11,
                '0051.jpg': 11,
                '0052.jpg': 11,
                '0053.jpg': 12,
                '0054.jpg': 12,
                '0055.jpg': 12,
                '0056.jpg': 12,
                '0057.jpg': 13,
                '0058.jpg': 13,
                '0059.jpg': 13,
                '0060.jpg': 13,
                '0061.jpg': 14,
                '0062.jpg': 14,
                '0063.jpg': 14,
                '0064.jpg': 15,
                '0065.jpg': 15,
                '0066.jpg': 15,
                '0067.jpg': 16,
                '0068.jpg': 16,
                '0069.jpg': 16,
                '0070.jpg': 17,
                '0071.jpg': 17,
                '0072.jpg': 17,
                '0073.jpg': 17,
                '0074.jpg': 17,
                '0075.jpg': 17,
                '0076.jpg': 17,
                '0077.jpg': 17,
                '0078.jpg': 17,
                '0079.jpg': 17,
                '0079_2x.jpg': 88,
                '0080.jpg': 17,
                '0081.jpg': 18,
                '0082.jpg': 18,
                '0083.jpg': 18,
                '0084.jpg': 18,
                '0085.jpg': 19,
                '0086.jpg': 19,
                '0087.jpg': 19,
                '0088.jpg': 19,
                '0089.jpg': 19,
                '0089_2x.jpg': 92,
              },
              totalSize: 1351,
            },
            '09-scoop-turn': {
              assets: {
                '0000.jpg': 23,
                '0001.jpg': 23,
                '0002.jpg': 22,
                '0003.jpg': 22,
                '0004.jpg': 22,
                '0005.jpg': 22,
                '0006.jpg': 22,
                '0007.jpg': 21,
                '0008.jpg': 21,
                '0009.jpg': 21,
                '0010.jpg': 21,
                '0011.jpg': 22,
                '0012.jpg': 22,
                '0013.jpg': 22,
                '0014.jpg': 22,
                '0015.jpg': 22,
                '0016.jpg': 23,
                '0017.jpg': 23,
                '0018.jpg': 23,
                '0019.jpg': 23,
                '0020.jpg': 24,
                '0021.jpg': 24,
                '0022.jpg': 24,
                '0023.jpg': 25,
                '0024.jpg': 25,
                '0025.jpg': 24,
                '0026.jpg': 24,
                '0027.jpg': 24,
                '0028.jpg': 24,
                '0029.jpg': 24,
                '0030.jpg': 24,
                '0031.jpg': 24,
                '0032.jpg': 24,
                '0033.jpg': 24,
                '0034.jpg': 24,
                '0035.jpg': 24,
                '0036.jpg': 24,
                '0037.jpg': 23,
                '0038.jpg': 23,
                '0039.jpg': 23,
                '0040.jpg': 23,
                '0041.jpg': 22,
                '0042.jpg': 22,
                '0043.jpg': 22,
                '0044.jpg': 22,
                '0045.jpg': 21,
                '0046.jpg': 20,
                '0047.jpg': 19,
                '0048.jpg': 18,
                '0049.jpg': 18,
                '0050.jpg': 17,
                '0051.jpg': 16,
                '0052.jpg': 15,
                '0053.jpg': 14,
                '0054.jpg': 14,
                '0055.jpg': 13,
                '0056.jpg': 13,
                '0057.jpg': 13,
                '0058.jpg': 12,
                '0059.jpg': 12,
                '0060.jpg': 12,
                '0061.jpg': 12,
                '0062.jpg': 12,
                '0063.jpg': 12,
                '0064.jpg': 12,
                '0065.jpg': 12,
                '0066.jpg': 12,
                '0067.jpg': 12,
                '0068.jpg': 12,
                '0069.jpg': 12,
                '0070.jpg': 12,
                '0071.jpg': 12,
                '0072.jpg': 12,
                '0073.jpg': 12,
                '0074.jpg': 12,
                '0075.jpg': 12,
                '0076.jpg': 12,
                '0077.jpg': 12,
                '0078.jpg': 12,
                '0079.jpg': 12,
                '0080.jpg': 12,
                '0081.jpg': 12,
                '0082.jpg': 12,
                '0083.jpg': 12,
                '0084.jpg': 12,
                '0085.jpg': 12,
                '0086.jpg': 12,
                '0087.jpg': 12,
                '0088.jpg': 12,
                '0089.jpg': 12,
                '0090.jpg': 12,
                '0091.jpg': 12,
                '0092.jpg': 12,
                '0093.jpg': 12,
                '0094.jpg': 12,
                '0095.jpg': 12,
                '0096.jpg': 12,
                '0097.jpg': 12,
                '0098.jpg': 12,
                '0099.jpg': 12,
                '0100.jpg': 12,
                '0101.jpg': 12,
                '0102.jpg': 12,
                '0103.jpg': 12,
                '0104.jpg': 12,
                '0105.jpg': 12,
                '0106.jpg': 13,
                '0107.jpg': 12,
                '0108.jpg': 13,
                '0109.jpg': 13,
                '0110.jpg': 13,
                '0111.jpg': 13,
                '0112.jpg': 13,
                '0113.jpg': 13,
                '0114.jpg': 13,
                '0115.jpg': 13,
                '0116.jpg': 13,
                '0117.jpg': 13,
                '0118.jpg': 13,
                '0119.jpg': 13,
                '0120.jpg': 13,
                '0121.jpg': 13,
                '0122.jpg': 13,
                '0123.jpg': 13,
                '0124.jpg': 13,
                '0125.jpg': 13,
                '0126.jpg': 13,
                '0127.jpg': 13,
                '0128.jpg': 13,
                '0129.jpg': 12,
                '0130.jpg': 13,
                '0131.jpg': 13,
                '0132.jpg': 13,
                '0133.jpg': 13,
                '0134.jpg': 13,
                '0135.jpg': 13,
                '0136.jpg': 13,
                '0137.jpg': 13,
                '0138.jpg': 13,
                '0139.jpg': 13,
                '0140.jpg': 12,
                '0141.jpg': 12,
                '0142.jpg': 12,
                '0143.jpg': 12,
                '0144.jpg': 12,
                '0145.jpg': 12,
                '0146.jpg': 12,
                '0147.jpg': 12,
                '0148.jpg': 12,
                '0149.jpg': 12,
                '0150.jpg': 12,
                '0151.jpg': 12,
                '0152.jpg': 12,
                '0153.jpg': 12,
                '0154.jpg': 12,
                '0155.jpg': 12,
                '0156.jpg': 12,
                '0157.jpg': 12,
                '0158.jpg': 12,
                '0159.jpg': 12,
                '0160.jpg': 12,
                '0161.jpg': 12,
                '0162.jpg': 12,
                '0163.jpg': 12,
                '0164.jpg': 12,
                '0165.jpg': 12,
                '0166.jpg': 12,
                '0167.jpg': 12,
                '0168.jpg': 12,
                '0169.jpg': 13,
                '0170.jpg': 13,
                '0171.jpg': 13,
                '0172.jpg': 13,
                '0173.jpg': 13,
                '0174.jpg': 13,
                '0175.jpg': 13,
                '0176.jpg': 14,
                '0177.jpg': 14,
                '0178.jpg': 14,
                '0179.jpg': 14,
                '0180.jpg': 15,
                '0181.jpg': 15,
                '0182.jpg': 15,
                '0183.jpg': 16,
                '0184.jpg': 16,
                '0185.jpg': 17,
                '0186.jpg': 17,
                '0187.jpg': 18,
                '0188.jpg': 18,
                '0189.jpg': 18,
                '0190.jpg': 18,
                '0191.jpg': 18,
                '0192.jpg': 19,
                '0193.jpg': 19,
                '0194.jpg': 19,
                '0195.jpg': 19,
                '0196.jpg': 19,
                '0197.jpg': 19,
                '0198.jpg': 20,
                '0199.jpg': 20,
                '0200.jpg': 20,
                '0201.jpg': 20,
                '0202.jpg': 20,
                '0203.jpg': 20,
                '0204.jpg': 20,
                '0205.jpg': 21,
                '0206.jpg': 21,
                '0207.jpg': 21,
                '0208.jpg': 21,
                '0209.jpg': 22,
                '0210.jpg': 22,
                '0211.jpg': 22,
                '0212.jpg': 22,
                '0213.jpg': 22,
                '0214.jpg': 22,
                '0215.jpg': 22,
                '0216.jpg': 22,
                '0217.jpg': 22,
                '0218.jpg': 22,
                '0219.jpg': 22,
                '0220.jpg': 22,
                '0221.jpg': 21,
                '0222.jpg': 21,
                '0223.jpg': 21,
                '0224.jpg': 21,
                '0225.jpg': 21,
                '0226.jpg': 21,
                '0227.jpg': 21,
                '0228.jpg': 21,
                '0229.jpg': 21,
                '0230.jpg': 21,
                '0231.jpg': 21,
                '0232.jpg': 21,
                '0233.jpg': 21,
                '0234.jpg': 21,
                '0234_2x.jpg': 92,
              },
              totalSize: 3943,
            },
            '10-fall-into-case': {
              assets: {
                '0000.jpg': 21,
                '0001.jpg': 21,
                '0002.jpg': 21,
                '0003.jpg': 21,
                '0004.jpg': 21,
                '0005.jpg': 21,
                '0006.jpg': 21,
                '0007.jpg': 21,
                '0008.jpg': 21,
                '0009.jpg': 21,
                '0010.jpg': 21,
                '0011.jpg': 21,
                '0012.jpg': 21,
                '0013.jpg': 21,
                '0014.jpg': 21,
                '0015.jpg': 21,
                '0016.jpg': 21,
                '0017.jpg': 21,
                '0018.jpg': 21,
                '0019.jpg': 21,
                '0020.jpg': 21,
                '0021.jpg': 21,
                '0022.jpg': 21,
                '0023.jpg': 21,
                '0024.jpg': 21,
                '0025.jpg': 20,
                '0026.jpg': 20,
                '0027.jpg': 20,
                '0028.jpg': 19,
                '0029.jpg': 19,
                '0030.jpg': 19,
                '0031.jpg': 15,
                '0032.jpg': 14,
                '0033.jpg': 13,
                '0034.jpg': 13,
                '0035.jpg': 12,
                '0036.jpg': 12,
                '0037.jpg': 11,
                '0038.jpg': 10,
                '0039.jpg': 10,
                '0040.jpg': 9,
                '0041.jpg': 9,
                '0042.jpg': 8,
                '0043.jpg': 7,
                '0044.jpg': 7,
                '0045.jpg': 6,
                '0046.jpg': 6,
                '0047.jpg': 5,
                '0048.jpg': 5,
                '0049.jpg': 5,
                '0050.jpg': 4,
                '0051.jpg': 4,
                '0052.jpg': 3,
                '0053.jpg': 3,
                '0054.jpg': 3,
                '0055.jpg': 3,
                '0056.jpg': 3,
                '0057.jpg': 3,
                '0058.jpg': 3,
                '0059.jpg': 3,
                '0060.jpg': 3,
                '0061.jpg': 3,
                '0062.jpg': 3,
                '0063.jpg': 3,
                '0064.jpg': 3,
                '0065.jpg': 3,
                '0066.jpg': 3,
                '0067.jpg': 3,
                '0068.jpg': 3,
                '0069.jpg': 3,
                '0070.jpg': 4,
                '0071.jpg': 4,
                '0072.jpg': 5,
                '0073.jpg': 5,
                '0074.jpg': 6,
                '0075.jpg': 6,
                '0076.jpg': 6,
                '0077.jpg': 7,
                '0078.jpg': 7,
                '0079.jpg': 7,
                '0080.jpg': 7,
                '0081.jpg': 8,
                '0082.jpg': 8,
                '0083.jpg': 8,
                '0084.jpg': 8,
                '0085.jpg': 8,
                '0086.jpg': 8,
                '0087.jpg': 8,
                '0088.jpg': 9,
                '0089.jpg': 9,
                '0090.jpg': 9,
                '0091.jpg': 9,
                '0092.jpg': 9,
                '0093.jpg': 9,
                '0094.jpg': 9,
                '0095.jpg': 9,
                '0096.jpg': 9,
                '0096_2x.jpg': 47,
                '0097.jpg': 9,
                '0098.jpg': 9,
                '0099.jpg': 9,
                '0100.jpg': 9,
                '0101.jpg': 9,
                '0102.jpg': 9,
                '0103.jpg': 9,
                '0104.jpg': 9,
                '0105.jpg': 9,
                '0106.jpg': 9,
                '0107.jpg': 9,
                '0108.jpg': 9,
                '0109.jpg': 10,
                '0110.jpg': 10,
                '0111.jpg': 10,
                '0112.jpg': 11,
                '0113.jpg': 11,
                '0114.jpg': 11,
                '0115.jpg': 12,
                '0116.jpg': 12,
                '0117.jpg': 12,
                '0118.jpg': 12,
                '0119.jpg': 12,
                '0120.jpg': 13,
                '0121.jpg': 13,
                '0122.jpg': 14,
                '0123.jpg': 14,
                '0124.jpg': 15,
                '0125.jpg': 15,
                '0126.jpg': 16,
                '0127.jpg': 16,
                '0128.jpg': 16,
                '0129.jpg': 16,
                '0130.jpg': 16,
                '0131.jpg': 16,
                '0132.jpg': 16,
                '0133.jpg': 16,
                '0134.jpg': 16,
                '0135.jpg': 16,
                '0136.jpg': 16,
                '0137.jpg': 16,
                '0138.jpg': 15,
                '0139.jpg': 15,
                '0140.jpg': 15,
                '0141.jpg': 15,
                '0142.jpg': 15,
                '0143.jpg': 15,
                '0144.jpg': 14,
                '0145.jpg': 14,
                '0146.jpg': 13,
                '0147.jpg': 13,
                '0148.jpg': 13,
                '0149.jpg': 13,
                '0150.jpg': 12,
                '0151.jpg': 12,
                '0152.jpg': 12,
                '0153.jpg': 12,
                '0154.jpg': 12,
                '0155.jpg': 11,
                '0156.jpg': 11,
                '0157.jpg': 11,
                '0158.jpg': 11,
                '0159.jpg': 11,
                '0160.jpg': 11,
                '0161.jpg': 10,
                '0162.jpg': 10,
                '0163.jpg': 10,
                '0164.jpg': 10,
                '0165.jpg': 10,
                '0166.jpg': 10,
                '0167.jpg': 10,
                '0168.jpg': 10,
                '0169.jpg': 10,
                '0170.jpg': 10,
                '0171.jpg': 10,
                '0172.jpg': 10,
                '0173.jpg': 10,
                '0174.jpg': 10,
                '0175.jpg': 10,
                '0176.jpg': 10,
                '0177.jpg': 10,
                '0178.jpg': 10,
                '0179.jpg': 10,
                '0180.jpg': 10,
                '0181.jpg': 10,
                '0182.jpg': 10,
                '0183.jpg': 10,
                '0184.jpg': 10,
                '0185.jpg': 10,
                '0186.jpg': 10,
                '0187.jpg': 10,
                '0188.jpg': 10,
                '0189.jpg': 10,
                '0190.jpg': 10,
                '0191.jpg': 10,
                '0192.jpg': 10,
                '0193.jpg': 10,
                '0194.jpg': 10,
                '0194_2x.jpg': 50,
                '0195.jpg': 10,
                '0196.jpg': 10,
                '0197.jpg': 10,
                '0198.jpg': 10,
                '0199.jpg': 10,
                '0200.jpg': 10,
                '0201.jpg': 10,
                '0202.jpg': 10,
                '0203.jpg': 10,
                '0204.jpg': 10,
                '0205.jpg': 10,
                '0206.jpg': 10,
                '0207.jpg': 10,
                '0208.jpg': 10,
                '0209.jpg': 10,
                '0210.jpg': 10,
                '0211.jpg': 10,
                '0212.jpg': 10,
                '0213.jpg': 10,
                '0214.jpg': 10,
                '0215.jpg': 10,
                '0216.jpg': 9,
                '0217.jpg': 9,
                '0218.jpg': 9,
                '0219.jpg': 9,
                '0220.jpg': 8,
                '0221.jpg': 8,
                '0222.jpg': 8,
                '0223.jpg': 8,
                '0224.jpg': 8,
                '0225.jpg': 7,
                '0226.jpg': 7,
                '0227.jpg': 7,
                '0228.jpg': 7,
                '0229.jpg': 7,
                '0230.jpg': 7,
                '0231.jpg': 7,
                '0232.jpg': 7,
                '0233.jpg': 7,
                '0234.jpg': 7,
                '0235.jpg': 7,
                '0236.jpg': 7,
                '0237.jpg': 7,
                '0238.jpg': 7,
                '0239.jpg': 7,
                '0240.jpg': 7,
                '0241.jpg': 7,
                '0242.jpg': 7,
                '0243.jpg': 7,
                '0244.jpg': 7,
                '0245.jpg': 7,
                '0246.jpg': 7,
                '0247.jpg': 7,
                '0248.jpg': 7,
                '0249.jpg': 7,
                '0250.jpg': 7,
                '0251.jpg': 7,
                '0252.jpg': 7,
                '0253.jpg': 6,
                '0254.jpg': 6,
                '0255.jpg': 6,
                '0256.jpg': 6,
                '0257.jpg': 6,
                '0258.jpg': 6,
                '0259.jpg': 6,
                '0260.jpg': 5,
                '0261.jpg': 5,
                '0262.jpg': 5,
                '0263.jpg': 5,
                '0264.jpg': 5,
                '0265.jpg': 5,
                '0266.jpg': 5,
                '0267.jpg': 5,
                '0268.jpg': 5,
                '0269.jpg': 5,
                '0270.jpg': 5,
                '0271.jpg': 5,
                '0272.jpg': 5,
                '0273.jpg': 4,
                '0274.jpg': 4,
                '0275.jpg': 4,
                '0276.jpg': 4,
                '0277.jpg': 4,
                '0278.jpg': 4,
                '0279.jpg': 4,
                '0280.jpg': 4,
                '0281.jpg': 4,
                '0282.jpg': 4,
                '0283.jpg': 4,
                '0284.jpg': 4,
                '0285.jpg': 4,
                '0286.jpg': 3,
                '0287.jpg': 3,
                '0288.jpg': 3,
                '0289.jpg': 3,
              },
              totalSize: 2975,
            },
          },
          small: {
            '02-head-bob-turn': {
              assets: {
                '0000.jpg': 5,
                '0001.jpg': 5,
                '0002.jpg': 5,
                '0003.jpg': 6,
                '0004.jpg': 6,
                '0005.jpg': 7,
                '0006.jpg': 8,
                '0007.jpg': 8,
                '0008.jpg': 9,
                '0009.jpg': 9,
                '0010.jpg': 10,
                '0011.jpg': 11,
                '0012.jpg': 12,
                '0013.jpg': 13,
                '0014.jpg': 13,
                '0015.jpg': 14,
                '0016.jpg': 14,
                '0017.jpg': 15,
                '0018.jpg': 15,
                '0019.jpg': 16,
                '0020.jpg': 17,
                '0021.jpg': 18,
                '0022.jpg': 19,
                '0023.jpg': 20,
                '0024.jpg': 20,
                '0025.jpg': 21,
                '0026.jpg': 21,
                '0027.jpg': 22,
                '0028.jpg': 22,
                '0029.jpg': 23,
                '0030.jpg': 23,
                '0031.jpg': 24,
                '0032.jpg': 24,
                '0033.jpg': 25,
                '0034.jpg': 26,
                '0035.jpg': 26,
                '0036.jpg': 27,
                '0037.jpg': 27,
                '0038.jpg': 28,
                '0039.jpg': 29,
                '0040.jpg': 29,
                '0041.jpg': 30,
                '0042.jpg': 30,
                '0043.jpg': 31,
                '0044.jpg': 32,
                '0045.jpg': 32,
                '0046.jpg': 33,
                '0047.jpg': 33,
                '0048.jpg': 33,
                '0049.jpg': 34,
                '0050.jpg': 34,
                '0051.jpg': 34,
                '0052.jpg': 35,
                '0053.jpg': 35,
                '0054.jpg': 35,
                '0055.jpg': 35,
                '0056.jpg': 35,
                '0057.jpg': 35,
                '0058.jpg': 35,
                '0059.jpg': 35,
                '0060.jpg': 35,
                '0061.jpg': 34,
                '0062.jpg': 34,
                '0063.jpg': 34,
                '0064.jpg': 34,
                '0065.jpg': 34,
                '0066.jpg': 34,
                '0067.jpg': 33,
                '0068.jpg': 33,
                '0069.jpg': 33,
                '0070.jpg': 33,
                '0071.jpg': 33,
                '0072.jpg': 32,
                '0073.jpg': 32,
                '0074.jpg': 32,
                '0075.jpg': 32,
                '0076.jpg': 32,
                '0077.jpg': 31,
                '0078.jpg': 31,
                '0079.jpg': 31,
                '0080.jpg': 31,
                '0081.jpg': 31,
                '0082.jpg': 31,
                '0083.jpg': 31,
                '0084.jpg': 31,
                '0085.jpg': 31,
                '0086.jpg': 31,
                '0087.jpg': 31,
                '0088.jpg': 30,
                '0089.jpg': 30,
                '0090.jpg': 30,
                '0091.jpg': 30,
                '0092.jpg': 29,
                '0093.jpg': 29,
                '0094.jpg': 29,
                '0095.jpg': 29,
                '0096.jpg': 28,
                '0097.jpg': 28,
                '0098.jpg': 27,
                '0099.jpg': 27,
                '0100.jpg': 27,
                '0101.jpg': 27,
                '0102.jpg': 26,
                '0103.jpg': 26,
                '0104.jpg': 25,
                '0105.jpg': 25,
                '0106.jpg': 25,
                '0107.jpg': 24,
                '0108.jpg': 24,
                '0109.jpg': 23,
                '0110.jpg': 23,
                '0111.jpg': 23,
                '0112.jpg': 22,
                '0113.jpg': 22,
                '0114.jpg': 21,
                '0115.jpg': 21,
                '0116.jpg': 21,
                '0117.jpg': 20,
                '0118.jpg': 20,
                '0119.jpg': 19,
                '0120.jpg': 19,
                '0121.jpg': 18,
                '0122.jpg': 18,
                '0123.jpg': 18,
                '0124.jpg': 17,
                '0125.jpg': 17,
                '0126.jpg': 16,
                '0127.jpg': 16,
                '0128.jpg': 16,
                '0129.jpg': 15,
                '0130.jpg': 15,
                '0131.jpg': 15,
              },
              totalSize: 3243,
            },
            '04-explode-tips': {
              assets: {
                '0000.jpg': 12,
                '0000_2x.jpg': 48,
                '0001.jpg': 12,
                '0002.jpg': 12,
                '0003.jpg': 12,
                '0004.jpg': 12,
                '0005.jpg': 12,
                '0006.jpg': 12,
                '0007.jpg': 12,
                '0008.jpg': 12,
                '0009.jpg': 12,
                '0010.jpg': 12,
                '0011.jpg': 12,
                '0012.jpg': 12,
                '0013.jpg': 12,
                '0014.jpg': 11,
                '0015.jpg': 11,
                '0016.jpg': 11,
                '0017.jpg': 11,
                '0018.jpg': 11,
                '0019.jpg': 11,
                '0020.jpg': 11,
                '0021.jpg': 11,
                '0022.jpg': 11,
                '0023.jpg': 11,
                '0024.jpg': 11,
                '0025.jpg': 10,
                '0026.jpg': 10,
                '0027.jpg': 10,
                '0028.jpg': 10,
                '0029.jpg': 9,
                '0030.jpg': 9,
                '0031.jpg': 9,
                '0032.jpg': 8,
                '0033.jpg': 8,
                '0034.jpg': 8,
                '0035.jpg': 7,
                '0036.jpg': 7,
                '0037.jpg': 7,
                '0038.jpg': 7,
                '0039.jpg': 6,
                '0040.jpg': 6,
                '0041.jpg': 6,
                '0042.jpg': 6,
                '0043.jpg': 5,
                '0044.jpg': 5,
                '0045.jpg': 5,
                '0046.jpg': 5,
                '0047.jpg': 5,
                '0048.jpg': 5,
                '0049.jpg': 5,
                '0050.jpg': 5,
                '0051.jpg': 5,
                '0052.jpg': 5,
                '0053.jpg': 5,
                '0054.jpg': 5,
                '0055.jpg': 5,
                '0056.jpg': 5,
                '0057.jpg': 5,
                '0058.jpg': 5,
                '0059.jpg': 5,
                '0060.jpg': 5,
                '0061.jpg': 5,
                '0062.jpg': 5,
                '0063.jpg': 6,
                '0064.jpg': 6,
                '0065.jpg': 6,
                '0066.jpg': 6,
                '0067.jpg': 6,
                '0068.jpg': 7,
                '0069.jpg': 7,
                '0070.jpg': 8,
                '0071.jpg': 8,
                '0072.jpg': 8,
                '0073.jpg': 8,
                '0074.jpg': 8,
                '0075.jpg': 8,
                '0076.jpg': 8,
                '0077.jpg': 8,
                '0078.jpg': 8,
                '0079.jpg': 8,
                '0080.jpg': 8,
                '0081.jpg': 8,
                '0082.jpg': 8,
                '0083.jpg': 8,
                '0083_2x.jpg': 34,
                '0084.jpg': 8,
                '0085.jpg': 8,
                '0086.jpg': 8,
                '0087.jpg': 8,
                '0088.jpg': 8,
                '0089.jpg': 8,
                '0090.jpg': 8,
                '0091.jpg': 8,
                '0092.jpg': 8,
                '0093.jpg': 7,
                '0094.jpg': 7,
                '0095.jpg': 7,
                '0096.jpg': 7,
                '0097.jpg': 7,
                '0098.jpg': 6,
                '0099.jpg': 6,
                '0100.jpg': 5,
                '0101.jpg': 5,
                '0102.jpg': 5,
                '0103.jpg': 5,
                '0104.jpg': 5,
                '0105.jpg': 5,
                '0106.jpg': 5,
                '0107.jpg': 6,
                '0108.jpg': 6,
                '0109.jpg': 6,
                '0110.jpg': 7,
                '0111.jpg': 7,
                '0112.jpg': 7,
                '0113.jpg': 8,
                '0114.jpg': 8,
                '0115.jpg': 9,
                '0116.jpg': 9,
                '0117.jpg': 9,
                '0118.jpg': 10,
                '0119.jpg': 10,
                '0120.jpg': 10,
                '0121.jpg': 10,
                '0122.jpg': 10,
                '0123.jpg': 10,
                '0124.jpg': 10,
                '0125.jpg': 10,
                '0126.jpg': 10,
                '0127.jpg': 10,
                '0128.jpg': 10,
                '0129.jpg': 10,
                '0130.jpg': 10,
                '0131.jpg': 10,
                '0132.jpg': 10,
                '0133.jpg': 10,
                '0134.jpg': 10,
                '0135.jpg': 10,
                '0136.jpg': 10,
                '0137.jpg': 10,
                '0138.jpg': 10,
                '0138_2x.jpg': 40,
              },
              totalSize: 1256,
            },
            '01-hero-lightpass': {
              assets: {
                '0000.jpg': 8,
                '0000_2x.jpg': 34,
                '0001.jpg': 8,
                '0002.jpg': 9,
                '0003.jpg': 9,
                '0004.jpg': 9,
                '0005.jpg': 10,
                '0006.jpg': 10,
                '0007.jpg': 10,
                '0008.jpg': 10,
                '0009.jpg': 11,
                '0010.jpg': 11,
                '0011.jpg': 11,
                '0012.jpg': 11,
                '0013.jpg': 11,
                '0014.jpg': 12,
                '0015.jpg': 12,
                '0016.jpg': 12,
                '0017.jpg': 12,
                '0018.jpg': 12,
                '0019.jpg': 12,
                '0020.jpg': 12,
                '0021.jpg': 13,
                '0022.jpg': 13,
                '0023.jpg': 13,
                '0024.jpg': 13,
                '0025.jpg': 13,
                '0026.jpg': 13,
                '0027.jpg': 13,
                '0028.jpg': 13,
                '0029.jpg': 13,
                '0030.jpg': 13,
                '0031.jpg': 13,
                '0032.jpg': 13,
                '0033.jpg': 13,
                '0034.jpg': 13,
                '0035.jpg': 14,
                '0036.jpg': 14,
                '0037.jpg': 14,
                '0038.jpg': 14,
                '0039.jpg': 14,
                '0040.jpg': 14,
                '0041.jpg': 14,
                '0042.jpg': 14,
                '0043.jpg': 14,
                '0044.jpg': 14,
                '0045.jpg': 14,
                '0046.jpg': 14,
                '0047.jpg': 14,
                '0048.jpg': 14,
                '0049.jpg': 14,
                '0050.jpg': 14,
                '0051.jpg': 14,
                '0052.jpg': 14,
                '0053.jpg': 14,
                '0054.jpg': 14,
                '0055.jpg': 14,
                '0056.jpg': 14,
                '0057.jpg': 14,
                '0058.jpg': 14,
                '0059.jpg': 14,
                '0060.jpg': 14,
                '0061.jpg': 14,
                '0062.jpg': 14,
                '0063.jpg': 14,
                '0064.jpg': 14,
                '0065.jpg': 14,
                '0066.jpg': 14,
                '0067.jpg': 14,
                '0068.jpg': 14,
                '0069.jpg': 14,
                '0070.jpg': 14,
                '0071.jpg': 14,
                '0072.jpg': 14,
                '0073.jpg': 14,
                '0074.jpg': 14,
                '0075.jpg': 14,
                '0076.jpg': 14,
                '0077.jpg': 14,
                '0078.jpg': 14,
                '0079.jpg': 14,
                '0080.jpg': 14,
                '0081.jpg': 14,
                '0082.jpg': 14,
                '0083.jpg': 14,
                '0084.jpg': 14,
                '0085.jpg': 14,
                '0086.jpg': 14,
                '0087.jpg': 14,
                '0088.jpg': 14,
                '0089.jpg': 14,
                '0090.jpg': 14,
                '0091.jpg': 14,
                '0092.jpg': 14,
                '0093.jpg': 14,
                '0094.jpg': 14,
                '0095.jpg': 14,
                '0096.jpg': 14,
                '0097.jpg': 14,
                '0098.jpg': 14,
                '0099.jpg': 14,
                '0100.jpg': 14,
                '0101.jpg': 14,
                '0102.jpg': 14,
                '0103.jpg': 13,
                '0104.jpg': 13,
                '0105.jpg': 13,
                '0106.jpg': 13,
                '0107.jpg': 13,
                '0108.jpg': 13,
                '0109.jpg': 13,
                '0110.jpg': 13,
                '0111.jpg': 13,
                '0112.jpg': 13,
                '0113.jpg': 13,
                '0114.jpg': 13,
                '0115.jpg': 12,
                '0116.jpg': 12,
                '0117.jpg': 12,
                '0118.jpg': 12,
                '0119.jpg': 12,
                '0120.jpg': 11,
                '0121.jpg': 11,
                '0122.jpg': 11,
                '0123.jpg': 10,
                '0124.jpg': 10,
                '0125.jpg': 10,
                '0126.jpg': 9,
                '0127.jpg': 9,
                '0128.jpg': 8,
                '0129.jpg': 8,
                '0130.jpg': 7,
                '0131.jpg': 7,
                '0132.jpg': 6,
                '0133.jpg': 6,
                '0134.jpg': 5,
                '0135.jpg': 5,
                '0136.jpg': 5,
                '0137.jpg': 4,
                '0137_2x.jpg': 20,
                '0138.jpg': 4,
                '0139.jpg': 4,
                '0140.jpg': 3,
                '0141.jpg': 3,
                '0142.jpg': 3,
                '0143.jpg': 3,
                '0144.jpg': 3,
                '0145.jpg': 3,
                '0146.jpg': 3,
                '0147.jpg': 3,
              },
              totalSize: 1800,
            },
            '03-flip-for-guts': {
              assets: {
                '0000.jpg': 14,
                '0001.jpg': 14,
                '0002.jpg': 14,
                '0003.jpg': 14,
                '0004.jpg': 14,
                '0005.jpg': 14,
                '0006.jpg': 14,
                '0007.jpg': 14,
                '0008.jpg': 13,
                '0009.jpg': 13,
                '0010.jpg': 13,
                '0011.jpg': 13,
                '0012.jpg': 12,
                '0013.jpg': 12,
                '0014.jpg': 12,
                '0015.jpg': 11,
                '0016.jpg': 11,
                '0017.jpg': 11,
                '0018.jpg': 10,
                '0019.jpg': 10,
                '0020.jpg': 10,
                '0021.jpg': 9,
                '0022.jpg': 9,
                '0023.jpg': 8,
                '0024.jpg': 8,
                '0025.jpg': 7,
                '0026.jpg': 7,
                '0027.jpg': 7,
                '0028.jpg': 6,
                '0029.jpg': 6,
                '0030.jpg': 6,
                '0031.jpg': 6,
                '0032.jpg': 6,
                '0033.jpg': 6,
                '0034.jpg': 6,
                '0035.jpg': 3,
                '0036.jpg': 3,
                '0037.jpg': 3,
                '0038.jpg': 3,
                '0039.jpg': 3,
                '0040.jpg': 4,
                '0041.jpg': 4,
                '0042.jpg': 4,
                '0043.jpg': 4,
                '0044.jpg': 4,
                '0045.jpg': 4,
                '0046.jpg': 4,
                '0047.jpg': 4,
                '0048.jpg': 4,
                '0049.jpg': 4,
                '0050.jpg': 5,
                '0051.jpg': 5,
                '0052.jpg': 5,
                '0053.jpg': 5,
                '0054.jpg': 5,
                '0055.jpg': 6,
                '0056.jpg': 6,
                '0057.jpg': 6,
                '0058.jpg': 6,
                '0059.jpg': 7,
                '0060.jpg': 7,
                '0061.jpg': 7,
                '0062.jpg': 7,
                '0063.jpg': 8,
                '0064.jpg': 8,
                '0065.jpg': 8,
                '0066.jpg': 9,
                '0067.jpg': 9,
                '0068.jpg': 9,
                '0069.jpg': 9,
                '0070.jpg': 9,
                '0071.jpg': 9,
                '0072.jpg': 9,
                '0073.jpg': 9,
                '0074.jpg': 10,
                '0075.jpg': 10,
                '0076.jpg': 10,
                '0077.jpg': 10,
                '0078.jpg': 10,
                '0079.jpg': 10,
                '0080.jpg': 11,
                '0081.jpg': 11,
                '0082.jpg': 11,
                '0083.jpg': 11,
                '0084.jpg': 11,
                '0085.jpg': 11,
                '0086.jpg': 11,
                '0087.jpg': 11,
                '0088.jpg': 11,
                '0088_2x.jpg': 101,
              },
              totalSize: 848,
            },
            '05-flip-for-nc': {
              assets: {
                '0000.jpg': 9,
                '0000_2x.jpg': 40,
                '0001.jpg': 9,
                '0002.jpg': 9,
                '0003.jpg': 9,
                '0004.jpg': 9,
                '0005.jpg': 9,
                '0006.jpg': 8,
                '0007.jpg': 8,
                '0008.jpg': 8,
                '0009.jpg': 7,
                '0010.jpg': 7,
                '0011.jpg': 7,
                '0012.jpg': 6,
                '0013.jpg': 6,
                '0014.jpg': 6,
                '0015.jpg': 5,
                '0016.jpg': 5,
                '0017.jpg': 5,
                '0018.jpg': 4,
                '0019.jpg': 4,
                '0020.jpg': 4,
                '0021.jpg': 4,
                '0022.jpg': 4,
                '0023.jpg': 4,
                '0024.jpg': 4,
                '0025.jpg': 4,
                '0026.jpg': 4,
                '0027.jpg': 4,
                '0028.jpg': 4,
                '0029.jpg': 5,
                '0030.jpg': 5,
                '0031.jpg': 5,
                '0032.jpg': 6,
                '0033.jpg': 6,
                '0034.jpg': 6,
                '0035.jpg': 6,
                '0036.jpg': 6,
                '0037.jpg': 6,
                '0038.jpg': 6,
                '0039.jpg': 6,
                '0040.jpg': 6,
                '0041.jpg': 6,
                '0042.jpg': 6,
                '0043.jpg': 6,
                '0044.jpg': 6,
                '0045.jpg': 6,
                '0046.jpg': 6,
                '0047.jpg': 6,
                '0048.jpg': 6,
                '0049.jpg': 6,
                '0050.jpg': 6,
                '0051.jpg': 6,
                '0052.jpg': 6,
                '0053.jpg': 6,
                '0054.jpg': 6,
                '0055.jpg': 6,
                '0056.jpg': 6,
                '0057.jpg': 6,
                '0058.jpg': 6,
                '0059.jpg': 7,
                '0060.jpg': 7,
                '0061.jpg': 7,
                '0062.jpg': 7,
                '0063.jpg': 7,
                '0064.jpg': 7,
                '0065.jpg': 7,
                '0066.jpg': 7,
                '0067.jpg': 7,
                '0068.jpg': 7,
                '0069.jpg': 7,
                '0070.jpg': 7,
                '0071.jpg': 7,
                '0072.jpg': 7,
                '0073.jpg': 7,
                '0074.jpg': 7,
                '0075.jpg': 7,
                '0076.jpg': 7,
                '0076_2x.jpg': 30,
                '0077.jpg': 7,
                '0078.jpg': 7,
                '0079.jpg': 7,
                '0080.jpg': 7,
                '0081.jpg': 7,
                '0082.jpg': 6,
                '0083.jpg': 6,
                '0084.jpg': 6,
                '0085.jpg': 6,
                '0086.jpg': 6,
                '0087.jpg': 6,
                '0088.jpg': 6,
                '0089.jpg': 6,
                '0090.jpg': 6,
                '0091.jpg': 6,
                '0092.jpg': 6,
                '0093.jpg': 6,
                '0094.jpg': 6,
                '0095.jpg': 6,
                '0096.jpg': 6,
                '0097.jpg': 6,
                '0097_2x.jpg': 26,
                '0098.jpg': 5,
                '0099.jpg': 5,
                '0100.jpg': 5,
                '0101.jpg': 5,
                '0102.jpg': 5,
                '0103.jpg': 5,
                '0104.jpg': 5,
                '0105.jpg': 5,
                '0106.jpg': 5,
                '0107.jpg': 5,
                '0108.jpg': 5,
                '0109.jpg': 4,
                '0110.jpg': 4,
                '0111.jpg': 4,
                '0112.jpg': 4,
                '0113.jpg': 4,
                '0114.jpg': 4,
                '0115.jpg': 4,
                '0116.jpg': 4,
                '0117.jpg': 4,
                '0118.jpg': 4,
                '0119.jpg': 4,
                '0120.jpg': 4,
                '0121.jpg': 4,
                '0122.jpg': 3,
                '0123.jpg': 3,
                '0124.jpg': 3,
                '0125.jpg': 3,
                '0126.jpg': 3,
                '0127.jpg': 3,
                '0128.jpg': 3,
                '0129.jpg': 3,
                '0129_2x.jpg': 17,
                '0130.jpg': 3,
                '0131.jpg': 3,
                '0132.jpg': 3,
                '0133.jpg': 3,
                '0134.jpg': 3,
                '0135.jpg': 3,
                '0136.jpg': 2,
                '0137.jpg': 2,
                '0138.jpg': 2,
                '0139.jpg': 2,
              },
              totalSize: 880,
            },
            '07-flip-reveal-guts': {
              assets: {
                '0000.jpg': 11,
                '0000_2x.jpg': 40,
                '0001.jpg': 11,
                '0002.jpg': 11,
                '0003.jpg': 11,
                '0004.jpg': 10,
                '0005.jpg': 11,
                '0006.jpg': 11,
                '0007.jpg': 11,
                '0008.jpg': 10,
                '0009.jpg': 10,
                '0010.jpg': 10,
                '0011.jpg': 11,
                '0012.jpg': 11,
                '0013.jpg': 11,
                '0014.jpg': 11,
                '0015.jpg': 12,
                '0016.jpg': 11,
                '0017.jpg': 11,
                '0018.jpg': 11,
                '0019.jpg': 10,
                '0020.jpg': 10,
                '0021.jpg': 10,
                '0022.jpg': 10,
                '0023.jpg': 10,
                '0024.jpg': 11,
                '0025.jpg': 11,
                '0026.jpg': 12,
                '0027.jpg': 12,
                '0028.jpg': 13,
                '0029.jpg': 14,
                '0030.jpg': 15,
                '0031.jpg': 15,
                '0032.jpg': 16,
                '0033.jpg': 16,
                '0034.jpg': 16,
                '0035.jpg': 15,
                '0036.jpg': 15,
                '0037.jpg': 16,
                '0038.jpg': 16,
                '0039.jpg': 16,
                '0040.jpg': 16,
                '0041.jpg': 17,
                '0042.jpg': 17,
                '0043.jpg': 17,
                '0044.jpg': 17,
                '0045.jpg': 17,
                '0046.jpg': 17,
                '0046_2x.jpg': 68,
                '0047.jpg': 17,
                '0048.jpg': 17,
                '0049.jpg': 17,
                '0050.jpg': 17,
                '0051.jpg': 17,
                '0052.jpg': 17,
                '0053.jpg': 16,
                '0054.jpg': 17,
                '0055.jpg': 17,
                '0056.jpg': 17,
                '0057.jpg': 17,
                '0058.jpg': 17,
                '0059.jpg': 17,
                '0060.jpg': 17,
                '0061.jpg': 17,
                '0062.jpg': 17,
                '0063.jpg': 17,
                '0064.jpg': 17,
                '0065.jpg': 17,
                '0066.jpg': 17,
                '0067.jpg': 16,
                '0068.jpg': 16,
                '0068_2x.jpg': 66,
                '0069.jpg': 16,
                '0070.jpg': 16,
                '0071.jpg': 16,
                '0072.jpg': 16,
                '0073.jpg': 16,
                '0074.jpg': 17,
                '0075.jpg': 17,
                '0076.jpg': 18,
                '0077.jpg': 19,
                '0078.jpg': 20,
                '0079.jpg': 21,
                '0080.jpg': 21,
                '0081.jpg': 20,
                '0082.jpg': 19,
                '0083.jpg': 17,
                '0084.jpg': 17,
                '0085.jpg': 17,
                '0086.jpg': 16,
                '0087.jpg': 15,
                '0088.jpg': 15,
                '0089.jpg': 14,
                '0090.jpg': 14,
                '0091.jpg': 14,
                '0092.jpg': 14,
                '0093.jpg': 14,
                '0094.jpg': 14,
              },
              totalSize: 1581,
            },
            '06-transparency-head': {
              assets: {
                '0000.jpg': 29,
                '0001.jpg': 29,
                '0002.jpg': 29,
                '0003.jpg': 30,
                '0004.jpg': 30,
                '0005.jpg': 30,
                '0006.jpg': 30,
                '0007.jpg': 30,
                '0008.jpg': 30,
                '0009.jpg': 31,
                '0010.jpg': 31,
                '0011.jpg': 31,
                '0012.jpg': 32,
                '0013.jpg': 32,
                '0014.jpg': 32,
                '0015.jpg': 32,
                '0016.jpg': 32,
                '0017.jpg': 32,
                '0018.jpg': 32,
                '0019.jpg': 32,
                '0020.jpg': 33,
                '0021.jpg': 33,
                '0022.jpg': 32,
                '0023.jpg': 33,
                '0024.jpg': 32,
                '0025.jpg': 32,
                '0026.jpg': 32,
                '0027.jpg': 32,
                '0028.jpg': 32,
                '0029.jpg': 32,
                '0030.jpg': 32,
                '0031.jpg': 32,
                '0032.jpg': 32,
                '0033.jpg': 32,
                '0034.jpg': 32,
                '0035.jpg': 32,
                '0036.jpg': 32,
                '0037.jpg': 32,
                '0038.jpg': 32,
                '0039.jpg': 32,
                '0040.jpg': 32,
                '0041.jpg': 32,
                '0042.jpg': 32,
                '0043.jpg': 32,
                '0044.jpg': 32,
                '0045.jpg': 32,
                '0046.jpg': 32,
                '0047.jpg': 32,
                '0048.jpg': 32,
                '0049.jpg': 32,
                '0050.jpg': 31,
                '0051.jpg': 32,
                '0052.jpg': 32,
                '0053.jpg': 31,
                '0054.jpg': 31,
                '0055.jpg': 31,
                '0056.jpg': 31,
                '0057.jpg': 31,
                '0058.jpg': 31,
                '0059.jpg': 31,
                '0060.jpg': 31,
                '0061.jpg': 31,
                '0062.jpg': 31,
                '0063.jpg': 31,
                '0064.jpg': 31,
                '0065.jpg': 31,
                '0066.jpg': 31,
                '0067.jpg': 31,
                '0068.jpg': 31,
                '0069.jpg': 31,
                '0070.jpg': 31,
                '0071.jpg': 31,
                '0072.jpg': 31,
                '0073.jpg': 31,
                '0074.jpg': 31,
                '0075.jpg': 31,
                '0076.jpg': 31,
                '0077.jpg': 31,
                '0078.jpg': 31,
                '0079.jpg': 31,
                '0080.jpg': 31,
                '0081.jpg': 30,
                '0082.jpg': 30,
                '0083.jpg': 31,
                '0084.jpg': 31,
                '0085.jpg': 30,
                '0086.jpg': 31,
                '0087.jpg': 31,
                '0088.jpg': 30,
                '0089.jpg': 30,
                '0090.jpg': 30,
                '0091.jpg': 30,
                '0092.jpg': 30,
                '0093.jpg': 30,
                '0094.jpg': 30,
                '0095.jpg': 30,
                '0096.jpg': 30,
                '0097.jpg': 30,
                '0098.jpg': 30,
                '0099.jpg': 30,
                '0100.jpg': 30,
                '0101.jpg': 30,
                '0102.jpg': 31,
                '0103.jpg': 32,
                '0104.jpg': 34,
                '0105.jpg': 35,
                '0106.jpg': 36,
                '0107.jpg': 37,
                '0108.jpg': 37,
                '0109.jpg': 38,
                '0110.jpg': 38,
                '0111.jpg': 39,
                '0112.jpg': 40,
                '0113.jpg': 41,
                '0114.jpg': 41,
                '0115.jpg': 42,
                '0116.jpg': 43,
                '0117.jpg': 44,
                '0118.jpg': 44,
                '0119.jpg': 44,
                '0120.jpg': 44,
                '0121.jpg': 43,
                '0122.jpg': 43,
                '0123.jpg': 43,
                '0124.jpg': 43,
                '0125.jpg': 43,
                '0126.jpg': 43,
                '0127.jpg': 43,
                '0128.jpg': 43,
                '0129.jpg': 43,
                '0130.jpg': 43,
                '0131.jpg': 43,
                '0132.jpg': 44,
                '0133.jpg': 43,
                '0134.jpg': 44,
                '0135.jpg': 43,
                '0136.jpg': 43,
                '0137.jpg': 43,
                '0138.jpg': 43,
                '0139.jpg': 43,
                '0140.jpg': 43,
                '0141.jpg': 43,
                '0142.jpg': 43,
                '0143.jpg': 43,
                '0144.jpg': 44,
                '0145.jpg': 44,
                '0146.jpg': 44,
                '0147.jpg': 44,
                '0148.jpg': 44,
                '0149.jpg': 44,
                '0150.jpg': 44,
                '0151.jpg': 44,
                '0152.jpg': 44,
                '0153.jpg': 44,
                '0154.jpg': 44,
                '0155.jpg': 44,
                '0156.jpg': 44,
                '0157.jpg': 44,
                '0158.jpg': 45,
                '0159.jpg': 45,
                '0160.jpg': 45,
                '0161.jpg': 46,
                '0162.jpg': 46,
                '0163.jpg': 46,
                '0164.jpg': 46,
                '0165.jpg': 46,
                '0166.jpg': 46,
                '0167.jpg': 46,
                '0168.jpg': 47,
                '0169.jpg': 47,
                '0170.jpg': 46,
                '0171.jpg': 46,
                '0172.jpg': 46,
                '0173.jpg': 46,
                '0174.jpg': 46,
                '0175.jpg': 46,
                '0176.jpg': 46,
              },
              totalSize: 6396,
            },
            '08-turn-for-chip': {
              assets: {
                '0000.jpg': 14,
                '0001.jpg': 14,
                '0002.jpg': 14,
                '0003.jpg': 15,
                '0004.jpg': 15,
                '0005.jpg': 16,
                '0006.jpg': 16,
                '0007.jpg': 17,
                '0008.jpg': 18,
                '0009.jpg': 19,
                '0010.jpg': 20,
                '0011.jpg': 20,
                '0012.jpg': 20,
                '0013.jpg': 20,
                '0014.jpg': 21,
                '0015.jpg': 22,
                '0016.jpg': 22,
                '0017.jpg': 21,
                '0018.jpg': 20,
                '0019.jpg': 19,
                '0020.jpg': 18,
                '0021.jpg': 17,
                '0022.jpg': 17,
                '0023.jpg': 16,
                '0024.jpg': 15,
                '0025.jpg': 15,
                '0026.jpg': 15,
                '0027.jpg': 14,
                '0028.jpg': 14,
                '0029.jpg': 14,
                '0030.jpg': 13,
                '0031.jpg': 13,
                '0032.jpg': 13,
                '0033.jpg': 13,
                '0034.jpg': 13,
                '0035.jpg': 13,
                '0036.jpg': 13,
                '0037.jpg': 13,
                '0038.jpg': 13,
                '0039.jpg': 12,
                '0040.jpg': 12,
                '0041.jpg': 12,
                '0042.jpg': 12,
                '0043.jpg': 12,
                '0044.jpg': 13,
                '0045.jpg': 13,
                '0046.jpg': 13,
                '0047.jpg': 13,
                '0048.jpg': 14,
                '0049.jpg': 14,
                '0050.jpg': 15,
                '0051.jpg': 15,
                '0052.jpg': 15,
                '0053.jpg': 16,
                '0054.jpg': 16,
                '0055.jpg': 17,
                '0056.jpg': 17,
                '0057.jpg': 18,
                '0058.jpg': 18,
                '0059.jpg': 19,
                '0060.jpg': 19,
                '0061.jpg': 19,
                '0062.jpg': 20,
                '0063.jpg': 20,
                '0064.jpg': 20,
                '0065.jpg': 21,
                '0066.jpg': 21,
                '0067.jpg': 21,
                '0068.jpg': 22,
                '0069.jpg': 22,
                '0070.jpg': 23,
                '0071.jpg': 23,
                '0072.jpg': 23,
                '0073.jpg': 23,
                '0074.jpg': 23,
                '0075.jpg': 24,
                '0076.jpg': 23,
                '0077.jpg': 23,
                '0078.jpg': 23,
                '0079.jpg': 23,
                '0079_2x.jpg': 104,
                '0080.jpg': 23,
                '0081.jpg': 23,
                '0082.jpg': 24,
                '0083.jpg': 24,
                '0084.jpg': 25,
                '0085.jpg': 25,
                '0086.jpg': 26,
                '0087.jpg': 26,
                '0088.jpg': 26,
                '0089.jpg': 26,
                '0089_2x.jpg': 108,
              },
              totalSize: 1837,
            },
            '09-scoop-turn': {
              assets: {
                '0000.jpg': 26,
                '0001.jpg': 26,
                '0002.jpg': 25,
                '0003.jpg': 25,
                '0004.jpg': 25,
                '0005.jpg': 24,
                '0006.jpg': 24,
                '0007.jpg': 24,
                '0008.jpg': 24,
                '0009.jpg': 24,
                '0010.jpg': 24,
                '0011.jpg': 24,
                '0012.jpg': 24,
                '0013.jpg': 24,
                '0014.jpg': 25,
                '0015.jpg': 25,
                '0016.jpg': 25,
                '0017.jpg': 25,
                '0018.jpg': 26,
                '0019.jpg': 26,
                '0020.jpg': 27,
                '0021.jpg': 27,
                '0022.jpg': 27,
                '0023.jpg': 27,
                '0024.jpg': 27,
                '0025.jpg': 27,
                '0026.jpg': 28,
                '0027.jpg': 28,
                '0028.jpg': 28,
                '0029.jpg': 28,
                '0030.jpg': 28,
                '0031.jpg': 29,
                '0032.jpg': 29,
                '0033.jpg': 30,
                '0034.jpg': 30,
                '0035.jpg': 31,
                '0036.jpg': 31,
                '0037.jpg': 31,
                '0038.jpg': 31,
                '0039.jpg': 31,
                '0040.jpg': 30,
                '0041.jpg': 29,
                '0042.jpg': 27,
                '0043.jpg': 26,
                '0044.jpg': 25,
                '0045.jpg': 23,
                '0046.jpg': 22,
                '0047.jpg': 20,
                '0048.jpg': 18,
                '0049.jpg': 17,
                '0050.jpg': 15,
                '0051.jpg': 14,
                '0052.jpg': 13,
                '0053.jpg': 12,
                '0054.jpg': 11,
                '0055.jpg': 10,
                '0056.jpg': 9,
                '0057.jpg': 9,
                '0058.jpg': 9,
                '0059.jpg': 9,
                '0060.jpg': 9,
                '0061.jpg': 9,
                '0062.jpg': 9,
                '0063.jpg': 9,
                '0064.jpg': 9,
                '0065.jpg': 9,
                '0066.jpg': 9,
                '0067.jpg': 9,
                '0068.jpg': 9,
                '0069.jpg': 9,
                '0070.jpg': 9,
                '0071.jpg': 9,
                '0072.jpg': 9,
                '0073.jpg': 9,
                '0074.jpg': 9,
                '0075.jpg': 9,
                '0076.jpg': 9,
                '0077.jpg': 9,
                '0078.jpg': 9,
                '0079.jpg': 9,
                '0080.jpg': 9,
                '0081.jpg': 9,
                '0082.jpg': 9,
                '0083.jpg': 9,
                '0084.jpg': 9,
                '0085.jpg': 9,
                '0086.jpg': 9,
                '0087.jpg': 9,
                '0088.jpg': 9,
                '0089.jpg': 9,
                '0090.jpg': 9,
                '0091.jpg': 9,
                '0092.jpg': 9,
                '0093.jpg': 9,
                '0094.jpg': 9,
                '0095.jpg': 9,
                '0096.jpg': 9,
                '0097.jpg': 9,
                '0098.jpg': 9,
                '0099.jpg': 9,
                '0100.jpg': 9,
                '0101.jpg': 9,
                '0102.jpg': 9,
                '0103.jpg': 9,
                '0104.jpg': 9,
                '0105.jpg': 9,
                '0106.jpg': 9,
                '0107.jpg': 9,
                '0108.jpg': 9,
                '0109.jpg': 9,
                '0110.jpg': 9,
                '0111.jpg': 9,
                '0112.jpg': 9,
                '0113.jpg': 9,
                '0114.jpg': 9,
                '0115.jpg': 9,
                '0116.jpg': 9,
                '0117.jpg': 9,
                '0118.jpg': 9,
                '0119.jpg': 9,
                '0120.jpg': 9,
                '0121.jpg': 9,
                '0122.jpg': 9,
                '0123.jpg': 9,
                '0124.jpg': 9,
                '0125.jpg': 9,
                '0126.jpg': 9,
                '0127.jpg': 9,
                '0128.jpg': 9,
                '0129.jpg': 9,
                '0130.jpg': 9,
                '0131.jpg': 9,
                '0132.jpg': 9,
                '0133.jpg': 9,
                '0134.jpg': 9,
                '0135.jpg': 9,
                '0136.jpg': 9,
                '0137.jpg': 9,
                '0138.jpg': 9,
                '0139.jpg': 9,
                '0140.jpg': 9,
                '0141.jpg': 9,
                '0142.jpg': 9,
                '0143.jpg': 9,
                '0144.jpg': 9,
                '0145.jpg': 9,
                '0146.jpg': 9,
                '0147.jpg': 9,
                '0148.jpg': 9,
                '0149.jpg': 9,
                '0150.jpg': 9,
                '0151.jpg': 9,
                '0152.jpg': 9,
                '0153.jpg': 9,
                '0154.jpg': 9,
                '0155.jpg': 9,
                '0156.jpg': 9,
                '0157.jpg': 9,
                '0158.jpg': 9,
                '0159.jpg': 9,
                '0160.jpg': 9,
                '0161.jpg': 9,
                '0162.jpg': 9,
                '0163.jpg': 9,
                '0164.jpg': 9,
                '0165.jpg': 9,
                '0166.jpg': 9,
                '0167.jpg': 9,
                '0168.jpg': 9,
                '0169.jpg': 9,
                '0170.jpg': 9,
                '0171.jpg': 9,
                '0172.jpg': 9,
                '0173.jpg': 9,
                '0174.jpg': 10,
                '0175.jpg': 10,
                '0176.jpg': 10,
                '0177.jpg': 10,
                '0178.jpg': 11,
                '0179.jpg': 11,
                '0180.jpg': 11,
                '0181.jpg': 12,
                '0182.jpg': 12,
                '0183.jpg': 12,
                '0184.jpg': 13,
                '0185.jpg': 13,
                '0186.jpg': 13,
                '0187.jpg': 14,
                '0188.jpg': 14,
                '0189.jpg': 14,
                '0190.jpg': 14,
                '0191.jpg': 14,
                '0192.jpg': 14,
                '0193.jpg': 15,
                '0194.jpg': 14,
                '0195.jpg': 14,
                '0196.jpg': 14,
                '0197.jpg': 14,
                '0198.jpg': 14,
                '0199.jpg': 14,
                '0200.jpg': 14,
                '0201.jpg': 15,
                '0202.jpg': 15,
                '0203.jpg': 15,
                '0204.jpg': 15,
                '0205.jpg': 15,
                '0206.jpg': 16,
                '0207.jpg': 16,
                '0208.jpg': 16,
                '0209.jpg': 16,
                '0210.jpg': 16,
                '0211.jpg': 17,
                '0212.jpg': 17,
                '0213.jpg': 17,
                '0214.jpg': 17,
                '0215.jpg': 17,
                '0216.jpg': 17,
                '0217.jpg': 17,
                '0218.jpg': 17,
                '0219.jpg': 17,
                '0220.jpg': 17,
                '0221.jpg': 17,
                '0222.jpg': 17,
                '0223.jpg': 17,
                '0224.jpg': 17,
                '0225.jpg': 17,
                '0226.jpg': 17,
                '0227.jpg': 17,
                '0228.jpg': 17,
                '0229.jpg': 17,
                '0230.jpg': 17,
                '0231.jpg': 17,
                '0232.jpg': 17,
                '0233.jpg': 17,
                '0234.jpg': 17,
                '0234_2x.jpg': 76,
              },
              totalSize: 3428,
            },
            '10-fall-into-case': {
              assets: {
                '0000.jpg': 17,
                '0001.jpg': 17,
                '0002.jpg': 17,
                '0003.jpg': 17,
                '0004.jpg': 17,
                '0005.jpg': 17,
                '0006.jpg': 17,
                '0007.jpg': 17,
                '0008.jpg': 17,
                '0009.jpg': 17,
                '0010.jpg': 17,
                '0011.jpg': 17,
                '0012.jpg': 17,
                '0013.jpg': 17,
                '0014.jpg': 17,
                '0015.jpg': 17,
                '0016.jpg': 17,
                '0017.jpg': 17,
                '0018.jpg': 17,
                '0019.jpg': 16,
                '0020.jpg': 16,
                '0021.jpg': 17,
                '0022.jpg': 17,
                '0023.jpg': 17,
                '0024.jpg': 17,
                '0025.jpg': 17,
                '0026.jpg': 17,
                '0027.jpg': 17,
                '0028.jpg': 17,
                '0029.jpg': 17,
                '0030.jpg': 17,
                '0031.jpg': 17,
                '0032.jpg': 17,
                '0033.jpg': 16,
                '0034.jpg': 16,
                '0035.jpg': 16,
                '0036.jpg': 15,
                '0037.jpg': 15,
                '0038.jpg': 14,
                '0039.jpg': 14,
                '0040.jpg': 13,
                '0041.jpg': 13,
                '0042.jpg': 12,
                '0043.jpg': 12,
                '0044.jpg': 11,
                '0045.jpg': 10,
                '0046.jpg': 9,
                '0047.jpg': 8,
                '0048.jpg': 8,
                '0049.jpg': 7,
                '0050.jpg': 6,
                '0051.jpg': 5,
                '0052.jpg': 4,
                '0053.jpg': 4,
                '0054.jpg': 4,
                '0055.jpg': 4,
                '0056.jpg': 4,
                '0057.jpg': 4,
                '0058.jpg': 4,
                '0059.jpg': 4,
                '0060.jpg': 4,
                '0061.jpg': 4,
                '0062.jpg': 4,
                '0063.jpg': 4,
                '0064.jpg': 4,
                '0065.jpg': 4,
                '0066.jpg': 4,
                '0067.jpg': 4,
                '0068.jpg': 4,
                '0069.jpg': 4,
                '0070.jpg': 5,
                '0071.jpg': 6,
                '0072.jpg': 7,
                '0073.jpg': 7,
                '0074.jpg': 8,
                '0075.jpg': 9,
                '0076.jpg': 9,
                '0077.jpg': 9,
                '0078.jpg': 10,
                '0079.jpg': 11,
                '0080.jpg': 11,
                '0081.jpg': 11,
                '0082.jpg': 12,
                '0083.jpg': 12,
                '0084.jpg': 13,
                '0085.jpg': 13,
                '0086.jpg': 13,
                '0087.jpg': 13,
                '0088.jpg': 13,
                '0089.jpg': 14,
                '0090.jpg': 14,
                '0091.jpg': 14,
                '0092.jpg': 14,
                '0093.jpg': 14,
                '0094.jpg': 14,
                '0095.jpg': 14,
                '0096.jpg': 14,
                '0096_2x.jpg': 53,
                '0097.jpg': 14,
                '0098.jpg': 15,
                '0099.jpg': 15,
                '0100.jpg': 15,
                '0101.jpg': 15,
                '0102.jpg': 15,
                '0103.jpg': 15,
                '0104.jpg': 14,
                '0105.jpg': 14,
                '0106.jpg': 14,
                '0107.jpg': 14,
                '0108.jpg': 14,
                '0109.jpg': 14,
                '0110.jpg': 13,
                '0111.jpg': 15,
                '0112.jpg': 15,
                '0113.jpg': 15,
                '0114.jpg': 16,
                '0115.jpg': 16,
                '0116.jpg': 16,
                '0117.jpg': 16,
                '0118.jpg': 16,
                '0119.jpg': 17,
                '0120.jpg': 18,
                '0121.jpg': 19,
                '0122.jpg': 20,
                '0123.jpg': 20,
                '0124.jpg': 20,
                '0125.jpg': 20,
                '0126.jpg': 20,
                '0127.jpg': 20,
                '0128.jpg': 20,
                '0129.jpg': 20,
                '0130.jpg': 20,
                '0131.jpg': 20,
                '0132.jpg': 20,
                '0133.jpg': 20,
                '0134.jpg': 20,
                '0135.jpg': 20,
                '0136.jpg': 19,
                '0137.jpg': 19,
                '0138.jpg': 18,
                '0139.jpg': 18,
                '0140.jpg': 17,
                '0141.jpg': 17,
                '0142.jpg': 16,
                '0143.jpg': 16,
                '0144.jpg': 15,
                '0145.jpg': 15,
                '0146.jpg': 15,
                '0147.jpg': 14,
                '0148.jpg': 14,
                '0149.jpg': 13,
                '0150.jpg': 13,
                '0151.jpg': 13,
                '0152.jpg': 12,
                '0153.jpg': 12,
                '0154.jpg': 12,
                '0155.jpg': 12,
                '0156.jpg': 12,
                '0157.jpg': 12,
                '0158.jpg': 11,
                '0159.jpg': 11,
                '0160.jpg': 11,
                '0161.jpg': 11,
                '0162.jpg': 11,
                '0163.jpg': 11,
                '0164.jpg': 11,
                '0165.jpg': 11,
                '0166.jpg': 11,
                '0167.jpg': 10,
                '0168.jpg': 11,
                '0169.jpg': 11,
                '0170.jpg': 11,
                '0171.jpg': 11,
                '0172.jpg': 11,
                '0173.jpg': 10,
                '0174.jpg': 11,
                '0175.jpg': 11,
                '0176.jpg': 11,
                '0177.jpg': 11,
                '0178.jpg': 11,
                '0179.jpg': 11,
                '0180.jpg': 11,
                '0181.jpg': 11,
                '0182.jpg': 11,
                '0183.jpg': 11,
                '0184.jpg': 11,
                '0185.jpg': 11,
                '0186.jpg': 11,
                '0187.jpg': 11,
                '0188.jpg': 11,
                '0189.jpg': 11,
                '0190.jpg': 11,
                '0191.jpg': 11,
                '0192.jpg': 11,
                '0193.jpg': 11,
                '0194.jpg': 11,
                '0194_2x.jpg': 39,
                '0195.jpg': 11,
                '0196.jpg': 11,
                '0197.jpg': 11,
                '0198.jpg': 11,
                '0199.jpg': 11,
                '0200.jpg': 11,
                '0201.jpg': 11,
                '0202.jpg': 11,
                '0203.jpg': 11,
                '0204.jpg': 11,
                '0205.jpg': 11,
                '0206.jpg': 11,
                '0207.jpg': 11,
                '0208.jpg': 11,
                '0209.jpg': 11,
                '0210.jpg': 11,
                '0211.jpg': 11,
                '0212.jpg': 11,
                '0213.jpg': 11,
                '0214.jpg': 10,
                '0215.jpg': 10,
                '0216.jpg': 10,
                '0217.jpg': 10,
                '0218.jpg': 9,
                '0219.jpg': 9,
                '0220.jpg': 9,
                '0221.jpg': 9,
                '0222.jpg': 9,
                '0223.jpg': 9,
                '0224.jpg': 8,
                '0225.jpg': 8,
                '0226.jpg': 8,
                '0227.jpg': 8,
                '0228.jpg': 8,
                '0229.jpg': 8,
                '0230.jpg': 8,
                '0231.jpg': 8,
                '0232.jpg': 8,
                '0233.jpg': 8,
                '0234.jpg': 8,
                '0235.jpg': 8,
                '0236.jpg': 8,
                '0237.jpg': 8,
                '0238.jpg': 8,
                '0239.jpg': 8,
                '0240.jpg': 8,
                '0241.jpg': 8,
                '0242.jpg': 8,
                '0243.jpg': 8,
                '0244.jpg': 7,
                '0245.jpg': 7,
                '0246.jpg': 7,
                '0247.jpg': 7,
                '0248.jpg': 7,
                '0249.jpg': 7,
                '0250.jpg': 7,
                '0251.jpg': 7,
                '0252.jpg': 7,
                '0253.jpg': 7,
                '0254.jpg': 7,
                '0255.jpg': 7,
                '0256.jpg': 6,
                '0257.jpg': 6,
                '0258.jpg': 6,
                '0259.jpg': 6,
                '0260.jpg': 6,
                '0261.jpg': 6,
                '0262.jpg': 6,
                '0263.jpg': 6,
                '0264.jpg': 6,
                '0265.jpg': 6,
                '0266.jpg': 6,
                '0267.jpg': 5,
                '0268.jpg': 5,
                '0269.jpg': 5,
                '0270.jpg': 5,
                '0271.jpg': 5,
                '0272.jpg': 5,
                '0273.jpg': 5,
                '0274.jpg': 5,
                '0275.jpg': 5,
                '0276.jpg': 5,
                '0277.jpg': 5,
                '0278.jpg': 5,
                '0279.jpg': 5,
                '0280.jpg': 4,
                '0281.jpg': 4,
                '0282.jpg': 4,
                '0283.jpg': 4,
                '0284.jpg': 4,
                '0285.jpg': 4,
                '0286.jpg': 4,
                '0287.jpg': 4,
                '0288.jpg': 4,
                '0289.jpg': 7,
              },
              totalSize: 3357,
            },
          },
        };
      },
      {},
    ],
    196: [
      function(e, t, r) {
        'use strict';
        var n = {
          large: { width: 1458, height: 820 },
          medium: { width: 998, height: 560 },
          small: { width: 414, height: 736 },
        };
        t.exports = n;
      },
      {},
    ],
    197: [
      function(e, t, r) {
        'use strict';
        var n =
          'varying vec2 vUV;\nuniform float time;\nuniform vec2 resolution;\nuniform float amplitude1;\nuniform float progress1;\nuniform float speed1;\nuniform float inverse1;\nuniform float amplitude2;\nuniform float progress2;\nuniform float speed2;\nuniform float inverse2;\nuniform float amplitude3;\nuniform float progress3;\nuniform float speed3;\nuniform float inverse3;\nuniform float amplitude4;\nuniform float progress4;\nuniform float speed4;\nuniform float inverse4;\nuniform float amplitude5;\nuniform float progress5;\nuniform float speed5;\nuniform float inverse5;\nuniform float amplitude6;\nuniform float progress6;\nuniform float speed6;\nuniform float inverse6;\nuniform sampler2D slitTex1;\nuniform sampler2D slitTex2;\nuniform float opacity1;\nuniform float opacity2;\nuniform float opacity3;\nuniform float opacity4;\nuniform float opacity5;\nuniform float opacity6;\nuniform float thickness1;\nuniform float thickness2;\nuniform float thickness3;\nuniform float thickness4;\nuniform float thickness5;\nuniform float thickness6;\nuniform float smoothing1;\nuniform float smoothing2;\nuniform float smoothing3;\nuniform float smoothing4;\nuniform float smoothing5;\nuniform float smoothing6;\nuniform float low1;\nuniform float high1;\nuniform float low2;\nuniform float high2;\nuniform float low3;\nuniform float high3;\nuniform float low4;\nuniform float high4;\nuniform float low5;\nuniform float high5;\nuniform float low6;\nuniform float high6;\nuniform vec4 waveColor;\nuniform vec4 inverseColor;\nuniform bool showInverse;\n// tapering\nuniform float taperIn;\nuniform float taperOut;\n\n\n\nvoid main() {\n\n//   vec2 vUV = gl_FragCoord.xy/resolution.xy;\n\n//   vec2 samplePoint = vec2(progress,vUV.x);\n\n  // Sample point on X axis for current frame\n  vec2 samplePoint1 = vec2(fract(time*speed1),vUV.x);\n  vec2 samplePoint2 = vec2(fract(time*speed2),vUV.x);\n  vec2 samplePoint3 = vec2(fract(time*speed3),vUV.x);\n  vec2 samplePoint4 = vec2(fract(time*speed4),vUV.x);\n  vec2 samplePoint5 = vec2(fract(time*speed5),vUV.x);\n  vec2 samplePoint6 = vec2(fract(time*speed6),vUV.x);\n\n  float height1 = texture2D(slitTex1, samplePoint1).r * amplitude1;\n  height1 *= smoothstep(taperOut, taperIn, vUV.x) + height1*0.1; // taper amplitude 0.1\n  height1 = 0.5 + height1/2.;\n  float height2 = texture2D(slitTex2, samplePoint2).r * amplitude2;\n  height2 *= smoothstep(taperOut, taperIn, vUV.x) + height2*0.1;\n  height2 = 0.5 + height2/2.;\n  float height3 = texture2D(slitTex2, samplePoint3).r * amplitude3;\n  height3 *= smoothstep(taperOut, taperIn, vUV.x) + height3*0.1;\n  height3 = 0.5 + height3/2.;\n  float height4 = texture2D(slitTex2, samplePoint4).r * amplitude4;\n  height4 *= smoothstep(taperOut, taperIn, vUV.x) + height4*0.1;\n  height4 = 0.5 + height4/2.;\n  float height5 = texture2D(slitTex2, samplePoint5).r * amplitude5;\n  height5 *= smoothstep(taperOut, taperIn, vUV.x) + height5*0.1;\n  height5 = 0.5 + height5/2.;\n  float height6 = texture2D(slitTex2, samplePoint6).r * amplitude6;\n  height6 *= smoothstep(taperOut, taperIn, vUV.x) + height6*0.1;\n  height6 = 0.5 + height6/2.;\n\n  // Difference in smoothstep values decides sharpness\n  // Higher value thickens the line\n  float wave1 = smoothstep(thickness1/100.+smoothing1/resolution.y,thickness1/100., abs(height1-vUV.y));\n  vec4 color1 = mix(vec4(0.), waveColor, vec4(vec3(wave1), 1.));\n  if (showInverse == true) {\n    wave1 = smoothstep(thickness1/100.+smoothing1/resolution.y,thickness1/100., abs(height1-(1.-vUV.y)));\n\tvec4 inverseWaveColor1 = mix(vec4(0.), inverseColor, vec4(vec3(wave1), 1.));\n\tcolor1 = mix(color1, inverseWaveColor1, 0.5)*2.;\n  }\n\n  float wave2 = smoothstep(thickness2/100.+smoothing2/resolution.y,thickness2/100., abs(height2-vUV.y));\n  vec4 color2 = mix(vec4(0.), waveColor, vec4(vec3(wave2), 1.));\n  if (showInverse == true) {\n    wave2 = smoothstep(thickness2/100.+smoothing2/resolution.y,thickness2/100., abs(height2-(1.-vUV.y)));\n\tvec4 inverseWaveColor2 = mix(vec4(0.), inverseColor, vec4(vec3(wave2), 1.));\n\tcolor2 = mix(color2, inverseWaveColor2, 0.5)*2.;\n  }\n\n  float wave3 = smoothstep(thickness3/100.+smoothing3/resolution.y,thickness3/100., abs(height3-vUV.y));\n  vec4 color3 = mix(vec4(0.), waveColor, vec4(vec3(wave3), 1.));\n  if (showInverse == true) {\n    wave3 = smoothstep(thickness3/100.+smoothing3/resolution.y,thickness3/100., abs(height3-(1.-vUV.y)));\n\tvec4 inverseWaveColor3 = mix(vec4(0.), inverseColor, vec4(vec3(wave3), 1.));\n\tcolor3 = mix(color3, inverseWaveColor3, 0.5)*2.;\n  }\n\n  float wave4 = smoothstep(thickness4/100.+smoothing4/resolution.y,thickness4/100., abs(height4-vUV.y));\n  vec4 color4 = mix(vec4(0.), waveColor, vec4(vec3(wave4), 1.));\n  if (showInverse == true) {\n    wave4 = smoothstep(thickness4/100.+smoothing4/resolution.y,thickness4/100., abs(height4-(1.-vUV.y)));\n\tvec4 inverseWaveColor4 = mix(vec4(0.), inverseColor, vec4(vec3(wave4), 1.));\n\tcolor4 = mix(color4, inverseWaveColor4, 0.5)*2.;\n  }\n\n  float wave5 = smoothstep(thickness5/100.+smoothing5/resolution.y,thickness5/100., abs(height5-vUV.y));\n  vec4 color5 = mix(vec4(0.), waveColor, vec4(vec3(wave5), 1.));\n  if (showInverse == true) {\n    wave5 = smoothstep(thickness5/100.+smoothing5/resolution.y,thickness5/100., abs(height5-(1.-vUV.y)));\n\tvec4 inverseWaveColor5 = mix(vec4(0.), inverseColor, vec4(vec3(wave5), 1.));\n\tcolor5 = mix(color5, inverseWaveColor5, 0.5)*2.;\n  }\n  float wave6 = smoothstep(thickness6/100.+smoothing6/resolution.y,thickness6/100., abs(height6-vUV.y));\n  vec4 color6 = mix(vec4(0.), waveColor, vec4(vec3(wave6), 1.));\n  if (showInverse == true) {\n    wave6 = smoothstep(thickness6/100.+smoothing6/resolution.y,thickness6/100., abs(height6-(1.-vUV.y)));\n\tvec4 inverseWaveColor6 = mix(vec4(0.), inverseColor, vec4(vec3(wave6), 1.));\n\tcolor6 = mix(color6, inverseWaveColor6, 0.5)*2.;\n  }\n\n  color1 *= smoothstep(low1,high1, abs(height1));\n  color2 *= smoothstep(low2,high2, abs(height2));\n  color3 *= smoothstep(low3,high3, abs(height3));\n  color4 *= smoothstep(low4,high4, abs(height4));\n  color5 *= smoothstep(low5,high5, abs(height5));\n  color6 *= smoothstep(low6,high6, abs(height6));\n  color1 *=opacity1;\n  color2 *=opacity2;\n  color3 *=opacity3;\n  color4 *=opacity4;\n  color5 *=opacity5;\n  color6 *=opacity6;\n  vec4 firstHalfColor = mix(mix(color1, color2, 0.5)*2., color3, 0.5)*2.;\n  vec4 secondHalfColor = mix(mix(color4, color5, 0.5)*2., color6, 0.5)*2.;\n  gl_FragColor = mix(firstHalfColor, secondHalfColor, 0.5)*2.;\n}';
        t.exports = n;
      },
      {},
    ],
    198: [
      function(e, t, r) {
        t.exports = {
          Wave: {
            1: {
              width: 1e3,
              height: 800,
              globalTimeScale: 1,
              waveColor: '#ffffff',
              inverseColor: '#02cc01',
            },
            2: {
              amplitude: 0.7149400986610289,
              speed: 0.5,
              opacity: 0.5570824524312896,
              low: 0.4894291754756871,
              high: 0.7600422832980972,
              thickness: 1.25,
              smoothing: 0.01,
            },
            3: {
              amplitude: 0.8,
              speed: 0.5,
              opacity: 0.24136715997181113,
              low: 0.4105003523608175,
              high: 0.726215644820296,
              thickness: 1.13,
              smoothing: 0.01,
            },
            4: {
              amplitude: 0.7487667371388301,
              speed: 0.5,
              opacity: 0.3653981677237491,
              low: 0.060958421423537704,
              high: 0.5683579985905567,
              thickness: 0.1,
              smoothing: 0.01,
            },
            5: {
              amplitude: 0.91,
              speed: 0.5,
              opacity: 0.20754052149400987,
              low: 0.20754052149400987,
              high: 0.6247357293868921,
              thickness: 0.56,
              smoothing: 0.01,
            },
            6: {
              amplitude: 0.5119802677942212,
              speed: 0.4668780831571529,
              opacity: 0.7825933756166314,
              low: 1,
              high: 0.23009161381254403,
              thickness: 0.38407329105003524,
              smoothing: 0.01,
            },
            7: {
              amplitude: 0.1624383368569415,
              speed: 0.5,
              opacity: 1,
              low: 0.35412262156448204,
              high: 0.7374911909795631,
              thickness: 0.2,
              smoothing: 0.1,
            },
          },
        };
      },
      {},
    ],
  },
  {},
  [191]
);
