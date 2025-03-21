import {
  require_react
} from "./chunk-4JI2AD7N.js";
import {
  __toESM
} from "./chunk-CEQRFMJQ.js";

// node_modules/react-slideshow-image/dist/react-slideshow-image.esm.js
var import_react = __toESM(require_react());

// node_modules/resize-observer-polyfill/dist/ResizeObserver.es.js
var MapShim = function() {
  if (typeof Map !== "undefined") {
    return Map;
  }
  function getIndex(arr, key) {
    var result = -1;
    arr.some(function(entry, index2) {
      if (entry[0] === key) {
        result = index2;
        return true;
      }
      return false;
    });
    return result;
  }
  return (
    /** @class */
    function() {
      function class_1() {
        this.__entries__ = [];
      }
      Object.defineProperty(class_1.prototype, "size", {
        /**
         * @returns {boolean}
         */
        get: function() {
          return this.__entries__.length;
        },
        enumerable: true,
        configurable: true
      });
      class_1.prototype.get = function(key) {
        var index2 = getIndex(this.__entries__, key);
        var entry = this.__entries__[index2];
        return entry && entry[1];
      };
      class_1.prototype.set = function(key, value) {
        var index2 = getIndex(this.__entries__, key);
        if (~index2) {
          this.__entries__[index2][1] = value;
        } else {
          this.__entries__.push([key, value]);
        }
      };
      class_1.prototype.delete = function(key) {
        var entries = this.__entries__;
        var index2 = getIndex(entries, key);
        if (~index2) {
          entries.splice(index2, 1);
        }
      };
      class_1.prototype.has = function(key) {
        return !!~getIndex(this.__entries__, key);
      };
      class_1.prototype.clear = function() {
        this.__entries__.splice(0);
      };
      class_1.prototype.forEach = function(callback, ctx) {
        if (ctx === void 0) {
          ctx = null;
        }
        for (var _i = 0, _a = this.__entries__; _i < _a.length; _i++) {
          var entry = _a[_i];
          callback.call(ctx, entry[1], entry[0]);
        }
      };
      return class_1;
    }()
  );
}();
var isBrowser = typeof window !== "undefined" && typeof document !== "undefined" && window.document === document;
var global$1 = function() {
  if (typeof global !== "undefined" && global.Math === Math) {
    return global;
  }
  if (typeof self !== "undefined" && self.Math === Math) {
    return self;
  }
  if (typeof window !== "undefined" && window.Math === Math) {
    return window;
  }
  return Function("return this")();
}();
var requestAnimationFrame$1 = function() {
  if (typeof requestAnimationFrame === "function") {
    return requestAnimationFrame.bind(global$1);
  }
  return function(callback) {
    return setTimeout(function() {
      return callback(Date.now());
    }, 1e3 / 60);
  };
}();
var trailingTimeout = 2;
function throttle(callback, delay) {
  var leadingCall = false, trailingCall = false, lastCallTime = 0;
  function resolvePending() {
    if (leadingCall) {
      leadingCall = false;
      callback();
    }
    if (trailingCall) {
      proxy();
    }
  }
  function timeoutCallback() {
    requestAnimationFrame$1(resolvePending);
  }
  function proxy() {
    var timeStamp = Date.now();
    if (leadingCall) {
      if (timeStamp - lastCallTime < trailingTimeout) {
        return;
      }
      trailingCall = true;
    } else {
      leadingCall = true;
      trailingCall = false;
      setTimeout(timeoutCallback, delay);
    }
    lastCallTime = timeStamp;
  }
  return proxy;
}
var REFRESH_DELAY = 20;
var transitionKeys = ["top", "right", "bottom", "left", "width", "height", "size", "weight"];
var mutationObserverSupported = typeof MutationObserver !== "undefined";
var ResizeObserverController = (
  /** @class */
  function() {
    function ResizeObserverController2() {
      this.connected_ = false;
      this.mutationEventsAdded_ = false;
      this.mutationsObserver_ = null;
      this.observers_ = [];
      this.onTransitionEnd_ = this.onTransitionEnd_.bind(this);
      this.refresh = throttle(this.refresh.bind(this), REFRESH_DELAY);
    }
    ResizeObserverController2.prototype.addObserver = function(observer) {
      if (!~this.observers_.indexOf(observer)) {
        this.observers_.push(observer);
      }
      if (!this.connected_) {
        this.connect_();
      }
    };
    ResizeObserverController2.prototype.removeObserver = function(observer) {
      var observers2 = this.observers_;
      var index2 = observers2.indexOf(observer);
      if (~index2) {
        observers2.splice(index2, 1);
      }
      if (!observers2.length && this.connected_) {
        this.disconnect_();
      }
    };
    ResizeObserverController2.prototype.refresh = function() {
      var changesDetected = this.updateObservers_();
      if (changesDetected) {
        this.refresh();
      }
    };
    ResizeObserverController2.prototype.updateObservers_ = function() {
      var activeObservers = this.observers_.filter(function(observer) {
        return observer.gatherActive(), observer.hasActive();
      });
      activeObservers.forEach(function(observer) {
        return observer.broadcastActive();
      });
      return activeObservers.length > 0;
    };
    ResizeObserverController2.prototype.connect_ = function() {
      if (!isBrowser || this.connected_) {
        return;
      }
      document.addEventListener("transitionend", this.onTransitionEnd_);
      window.addEventListener("resize", this.refresh);
      if (mutationObserverSupported) {
        this.mutationsObserver_ = new MutationObserver(this.refresh);
        this.mutationsObserver_.observe(document, {
          attributes: true,
          childList: true,
          characterData: true,
          subtree: true
        });
      } else {
        document.addEventListener("DOMSubtreeModified", this.refresh);
        this.mutationEventsAdded_ = true;
      }
      this.connected_ = true;
    };
    ResizeObserverController2.prototype.disconnect_ = function() {
      if (!isBrowser || !this.connected_) {
        return;
      }
      document.removeEventListener("transitionend", this.onTransitionEnd_);
      window.removeEventListener("resize", this.refresh);
      if (this.mutationsObserver_) {
        this.mutationsObserver_.disconnect();
      }
      if (this.mutationEventsAdded_) {
        document.removeEventListener("DOMSubtreeModified", this.refresh);
      }
      this.mutationsObserver_ = null;
      this.mutationEventsAdded_ = false;
      this.connected_ = false;
    };
    ResizeObserverController2.prototype.onTransitionEnd_ = function(_a) {
      var _b = _a.propertyName, propertyName = _b === void 0 ? "" : _b;
      var isReflowProperty = transitionKeys.some(function(key) {
        return !!~propertyName.indexOf(key);
      });
      if (isReflowProperty) {
        this.refresh();
      }
    };
    ResizeObserverController2.getInstance = function() {
      if (!this.instance_) {
        this.instance_ = new ResizeObserverController2();
      }
      return this.instance_;
    };
    ResizeObserverController2.instance_ = null;
    return ResizeObserverController2;
  }()
);
var defineConfigurable = function(target, props) {
  for (var _i = 0, _a = Object.keys(props); _i < _a.length; _i++) {
    var key = _a[_i];
    Object.defineProperty(target, key, {
      value: props[key],
      enumerable: false,
      writable: false,
      configurable: true
    });
  }
  return target;
};
var getWindowOf = function(target) {
  var ownerGlobal = target && target.ownerDocument && target.ownerDocument.defaultView;
  return ownerGlobal || global$1;
};
var emptyRect = createRectInit(0, 0, 0, 0);
function toFloat(value) {
  return parseFloat(value) || 0;
}
function getBordersSize(styles) {
  var positions = [];
  for (var _i = 1; _i < arguments.length; _i++) {
    positions[_i - 1] = arguments[_i];
  }
  return positions.reduce(function(size, position) {
    var value = styles["border-" + position + "-width"];
    return size + toFloat(value);
  }, 0);
}
function getPaddings(styles) {
  var positions = ["top", "right", "bottom", "left"];
  var paddings = {};
  for (var _i = 0, positions_1 = positions; _i < positions_1.length; _i++) {
    var position = positions_1[_i];
    var value = styles["padding-" + position];
    paddings[position] = toFloat(value);
  }
  return paddings;
}
function getSVGContentRect(target) {
  var bbox = target.getBBox();
  return createRectInit(0, 0, bbox.width, bbox.height);
}
function getHTMLElementContentRect(target) {
  var clientWidth = target.clientWidth, clientHeight = target.clientHeight;
  if (!clientWidth && !clientHeight) {
    return emptyRect;
  }
  var styles = getWindowOf(target).getComputedStyle(target);
  var paddings = getPaddings(styles);
  var horizPad = paddings.left + paddings.right;
  var vertPad = paddings.top + paddings.bottom;
  var width = toFloat(styles.width), height = toFloat(styles.height);
  if (styles.boxSizing === "border-box") {
    if (Math.round(width + horizPad) !== clientWidth) {
      width -= getBordersSize(styles, "left", "right") + horizPad;
    }
    if (Math.round(height + vertPad) !== clientHeight) {
      height -= getBordersSize(styles, "top", "bottom") + vertPad;
    }
  }
  if (!isDocumentElement(target)) {
    var vertScrollbar = Math.round(width + horizPad) - clientWidth;
    var horizScrollbar = Math.round(height + vertPad) - clientHeight;
    if (Math.abs(vertScrollbar) !== 1) {
      width -= vertScrollbar;
    }
    if (Math.abs(horizScrollbar) !== 1) {
      height -= horizScrollbar;
    }
  }
  return createRectInit(paddings.left, paddings.top, width, height);
}
var isSVGGraphicsElement = function() {
  if (typeof SVGGraphicsElement !== "undefined") {
    return function(target) {
      return target instanceof getWindowOf(target).SVGGraphicsElement;
    };
  }
  return function(target) {
    return target instanceof getWindowOf(target).SVGElement && typeof target.getBBox === "function";
  };
}();
function isDocumentElement(target) {
  return target === getWindowOf(target).document.documentElement;
}
function getContentRect(target) {
  if (!isBrowser) {
    return emptyRect;
  }
  if (isSVGGraphicsElement(target)) {
    return getSVGContentRect(target);
  }
  return getHTMLElementContentRect(target);
}
function createReadOnlyRect(_a) {
  var x = _a.x, y = _a.y, width = _a.width, height = _a.height;
  var Constr = typeof DOMRectReadOnly !== "undefined" ? DOMRectReadOnly : Object;
  var rect = Object.create(Constr.prototype);
  defineConfigurable(rect, {
    x,
    y,
    width,
    height,
    top: y,
    right: x + width,
    bottom: height + y,
    left: x
  });
  return rect;
}
function createRectInit(x, y, width, height) {
  return { x, y, width, height };
}
var ResizeObservation = (
  /** @class */
  function() {
    function ResizeObservation2(target) {
      this.broadcastWidth = 0;
      this.broadcastHeight = 0;
      this.contentRect_ = createRectInit(0, 0, 0, 0);
      this.target = target;
    }
    ResizeObservation2.prototype.isActive = function() {
      var rect = getContentRect(this.target);
      this.contentRect_ = rect;
      return rect.width !== this.broadcastWidth || rect.height !== this.broadcastHeight;
    };
    ResizeObservation2.prototype.broadcastRect = function() {
      var rect = this.contentRect_;
      this.broadcastWidth = rect.width;
      this.broadcastHeight = rect.height;
      return rect;
    };
    return ResizeObservation2;
  }()
);
var ResizeObserverEntry = (
  /** @class */
  /* @__PURE__ */ function() {
    function ResizeObserverEntry2(target, rectInit) {
      var contentRect = createReadOnlyRect(rectInit);
      defineConfigurable(this, { target, contentRect });
    }
    return ResizeObserverEntry2;
  }()
);
var ResizeObserverSPI = (
  /** @class */
  function() {
    function ResizeObserverSPI2(callback, controller, callbackCtx) {
      this.activeObservations_ = [];
      this.observations_ = new MapShim();
      if (typeof callback !== "function") {
        throw new TypeError("The callback provided as parameter 1 is not a function.");
      }
      this.callback_ = callback;
      this.controller_ = controller;
      this.callbackCtx_ = callbackCtx;
    }
    ResizeObserverSPI2.prototype.observe = function(target) {
      if (!arguments.length) {
        throw new TypeError("1 argument required, but only 0 present.");
      }
      if (typeof Element === "undefined" || !(Element instanceof Object)) {
        return;
      }
      if (!(target instanceof getWindowOf(target).Element)) {
        throw new TypeError('parameter 1 is not of type "Element".');
      }
      var observations = this.observations_;
      if (observations.has(target)) {
        return;
      }
      observations.set(target, new ResizeObservation(target));
      this.controller_.addObserver(this);
      this.controller_.refresh();
    };
    ResizeObserverSPI2.prototype.unobserve = function(target) {
      if (!arguments.length) {
        throw new TypeError("1 argument required, but only 0 present.");
      }
      if (typeof Element === "undefined" || !(Element instanceof Object)) {
        return;
      }
      if (!(target instanceof getWindowOf(target).Element)) {
        throw new TypeError('parameter 1 is not of type "Element".');
      }
      var observations = this.observations_;
      if (!observations.has(target)) {
        return;
      }
      observations.delete(target);
      if (!observations.size) {
        this.controller_.removeObserver(this);
      }
    };
    ResizeObserverSPI2.prototype.disconnect = function() {
      this.clearActive();
      this.observations_.clear();
      this.controller_.removeObserver(this);
    };
    ResizeObserverSPI2.prototype.gatherActive = function() {
      var _this = this;
      this.clearActive();
      this.observations_.forEach(function(observation) {
        if (observation.isActive()) {
          _this.activeObservations_.push(observation);
        }
      });
    };
    ResizeObserverSPI2.prototype.broadcastActive = function() {
      if (!this.hasActive()) {
        return;
      }
      var ctx = this.callbackCtx_;
      var entries = this.activeObservations_.map(function(observation) {
        return new ResizeObserverEntry(observation.target, observation.broadcastRect());
      });
      this.callback_.call(ctx, entries, ctx);
      this.clearActive();
    };
    ResizeObserverSPI2.prototype.clearActive = function() {
      this.activeObservations_.splice(0);
    };
    ResizeObserverSPI2.prototype.hasActive = function() {
      return this.activeObservations_.length > 0;
    };
    return ResizeObserverSPI2;
  }()
);
var observers = typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : new MapShim();
var ResizeObserver = (
  /** @class */
  /* @__PURE__ */ function() {
    function ResizeObserver2(callback) {
      if (!(this instanceof ResizeObserver2)) {
        throw new TypeError("Cannot call a class as a function.");
      }
      if (!arguments.length) {
        throw new TypeError("1 argument required, but only 0 present.");
      }
      var controller = ResizeObserverController.getInstance();
      var observer = new ResizeObserverSPI(callback, controller, this);
      observers.set(this, observer);
    }
    return ResizeObserver2;
  }()
);
[
  "observe",
  "unobserve",
  "disconnect"
].forEach(function(method) {
  ResizeObserver.prototype[method] = function() {
    var _a;
    return (_a = observers.get(this))[method].apply(_a, arguments);
  };
});
var index = function() {
  if (typeof global$1.ResizeObserver !== "undefined") {
    return global$1.ResizeObserver;
  }
  return ResizeObserver;
}();
var ResizeObserver_es_default = index;

// node_modules/@tweenjs/tween.js/dist/tween.esm.js
var Easing = {
  Linear: {
    None: function(amount) {
      return amount;
    }
  },
  Quadratic: {
    In: function(amount) {
      return amount * amount;
    },
    Out: function(amount) {
      return amount * (2 - amount);
    },
    InOut: function(amount) {
      if ((amount *= 2) < 1) {
        return 0.5 * amount * amount;
      }
      return -0.5 * (--amount * (amount - 2) - 1);
    }
  },
  Cubic: {
    In: function(amount) {
      return amount * amount * amount;
    },
    Out: function(amount) {
      return --amount * amount * amount + 1;
    },
    InOut: function(amount) {
      if ((amount *= 2) < 1) {
        return 0.5 * amount * amount * amount;
      }
      return 0.5 * ((amount -= 2) * amount * amount + 2);
    }
  },
  Quartic: {
    In: function(amount) {
      return amount * amount * amount * amount;
    },
    Out: function(amount) {
      return 1 - --amount * amount * amount * amount;
    },
    InOut: function(amount) {
      if ((amount *= 2) < 1) {
        return 0.5 * amount * amount * amount * amount;
      }
      return -0.5 * ((amount -= 2) * amount * amount * amount - 2);
    }
  },
  Quintic: {
    In: function(amount) {
      return amount * amount * amount * amount * amount;
    },
    Out: function(amount) {
      return --amount * amount * amount * amount * amount + 1;
    },
    InOut: function(amount) {
      if ((amount *= 2) < 1) {
        return 0.5 * amount * amount * amount * amount * amount;
      }
      return 0.5 * ((amount -= 2) * amount * amount * amount * amount + 2);
    }
  },
  Sinusoidal: {
    In: function(amount) {
      return 1 - Math.cos(amount * Math.PI / 2);
    },
    Out: function(amount) {
      return Math.sin(amount * Math.PI / 2);
    },
    InOut: function(amount) {
      return 0.5 * (1 - Math.cos(Math.PI * amount));
    }
  },
  Exponential: {
    In: function(amount) {
      return amount === 0 ? 0 : Math.pow(1024, amount - 1);
    },
    Out: function(amount) {
      return amount === 1 ? 1 : 1 - Math.pow(2, -10 * amount);
    },
    InOut: function(amount) {
      if (amount === 0) {
        return 0;
      }
      if (amount === 1) {
        return 1;
      }
      if ((amount *= 2) < 1) {
        return 0.5 * Math.pow(1024, amount - 1);
      }
      return 0.5 * (-Math.pow(2, -10 * (amount - 1)) + 2);
    }
  },
  Circular: {
    In: function(amount) {
      return 1 - Math.sqrt(1 - amount * amount);
    },
    Out: function(amount) {
      return Math.sqrt(1 - --amount * amount);
    },
    InOut: function(amount) {
      if ((amount *= 2) < 1) {
        return -0.5 * (Math.sqrt(1 - amount * amount) - 1);
      }
      return 0.5 * (Math.sqrt(1 - (amount -= 2) * amount) + 1);
    }
  },
  Elastic: {
    In: function(amount) {
      if (amount === 0) {
        return 0;
      }
      if (amount === 1) {
        return 1;
      }
      return -Math.pow(2, 10 * (amount - 1)) * Math.sin((amount - 1.1) * 5 * Math.PI);
    },
    Out: function(amount) {
      if (amount === 0) {
        return 0;
      }
      if (amount === 1) {
        return 1;
      }
      return Math.pow(2, -10 * amount) * Math.sin((amount - 0.1) * 5 * Math.PI) + 1;
    },
    InOut: function(amount) {
      if (amount === 0) {
        return 0;
      }
      if (amount === 1) {
        return 1;
      }
      amount *= 2;
      if (amount < 1) {
        return -0.5 * Math.pow(2, 10 * (amount - 1)) * Math.sin((amount - 1.1) * 5 * Math.PI);
      }
      return 0.5 * Math.pow(2, -10 * (amount - 1)) * Math.sin((amount - 1.1) * 5 * Math.PI) + 1;
    }
  },
  Back: {
    In: function(amount) {
      var s = 1.70158;
      return amount * amount * ((s + 1) * amount - s);
    },
    Out: function(amount) {
      var s = 1.70158;
      return --amount * amount * ((s + 1) * amount + s) + 1;
    },
    InOut: function(amount) {
      var s = 1.70158 * 1.525;
      if ((amount *= 2) < 1) {
        return 0.5 * (amount * amount * ((s + 1) * amount - s));
      }
      return 0.5 * ((amount -= 2) * amount * ((s + 1) * amount + s) + 2);
    }
  },
  Bounce: {
    In: function(amount) {
      return 1 - Easing.Bounce.Out(1 - amount);
    },
    Out: function(amount) {
      if (amount < 1 / 2.75) {
        return 7.5625 * amount * amount;
      } else if (amount < 2 / 2.75) {
        return 7.5625 * (amount -= 1.5 / 2.75) * amount + 0.75;
      } else if (amount < 2.5 / 2.75) {
        return 7.5625 * (amount -= 2.25 / 2.75) * amount + 0.9375;
      } else {
        return 7.5625 * (amount -= 2.625 / 2.75) * amount + 0.984375;
      }
    },
    InOut: function(amount) {
      if (amount < 0.5) {
        return Easing.Bounce.In(amount * 2) * 0.5;
      }
      return Easing.Bounce.Out(amount * 2 - 1) * 0.5 + 0.5;
    }
  }
};
var now;
if (typeof self === "undefined" && typeof process !== "undefined" && process.hrtime) {
  now = function() {
    var time = process.hrtime();
    return time[0] * 1e3 + time[1] / 1e6;
  };
} else if (typeof self !== "undefined" && self.performance !== void 0 && self.performance.now !== void 0) {
  now = self.performance.now.bind(self.performance);
} else if (Date.now !== void 0) {
  now = Date.now;
} else {
  now = function() {
    return (/* @__PURE__ */ new Date()).getTime();
  };
}
var now$1 = now;
var Group = (
  /** @class */
  function() {
    function Group2() {
      this._tweens = {};
      this._tweensAddedDuringUpdate = {};
    }
    Group2.prototype.getAll = function() {
      var _this = this;
      return Object.keys(this._tweens).map(function(tweenId) {
        return _this._tweens[tweenId];
      });
    };
    Group2.prototype.removeAll = function() {
      this._tweens = {};
    };
    Group2.prototype.add = function(tween) {
      this._tweens[tween.getId()] = tween;
      this._tweensAddedDuringUpdate[tween.getId()] = tween;
    };
    Group2.prototype.remove = function(tween) {
      delete this._tweens[tween.getId()];
      delete this._tweensAddedDuringUpdate[tween.getId()];
    };
    Group2.prototype.update = function(time, preserve) {
      if (time === void 0) {
        time = now$1();
      }
      if (preserve === void 0) {
        preserve = false;
      }
      var tweenIds = Object.keys(this._tweens);
      if (tweenIds.length === 0) {
        return false;
      }
      while (tweenIds.length > 0) {
        this._tweensAddedDuringUpdate = {};
        for (var i = 0; i < tweenIds.length; i++) {
          var tween = this._tweens[tweenIds[i]];
          var autoStart = !preserve;
          if (tween && tween.update(time, autoStart) === false && !preserve) {
            delete this._tweens[tweenIds[i]];
          }
        }
        tweenIds = Object.keys(this._tweensAddedDuringUpdate);
      }
      return true;
    };
    return Group2;
  }()
);
var Interpolation = {
  Linear: function(v, k) {
    var m = v.length - 1;
    var f = m * k;
    var i = Math.floor(f);
    var fn = Interpolation.Utils.Linear;
    if (k < 0) {
      return fn(v[0], v[1], f);
    }
    if (k > 1) {
      return fn(v[m], v[m - 1], m - f);
    }
    return fn(v[i], v[i + 1 > m ? m : i + 1], f - i);
  },
  Bezier: function(v, k) {
    var b = 0;
    var n = v.length - 1;
    var pw = Math.pow;
    var bn = Interpolation.Utils.Bernstein;
    for (var i = 0; i <= n; i++) {
      b += pw(1 - k, n - i) * pw(k, i) * v[i] * bn(n, i);
    }
    return b;
  },
  CatmullRom: function(v, k) {
    var m = v.length - 1;
    var f = m * k;
    var i = Math.floor(f);
    var fn = Interpolation.Utils.CatmullRom;
    if (v[0] === v[m]) {
      if (k < 0) {
        i = Math.floor(f = m * (1 + k));
      }
      return fn(v[(i - 1 + m) % m], v[i], v[(i + 1) % m], v[(i + 2) % m], f - i);
    } else {
      if (k < 0) {
        return v[0] - (fn(v[0], v[0], v[1], v[1], -f) - v[0]);
      }
      if (k > 1) {
        return v[m] - (fn(v[m], v[m], v[m - 1], v[m - 1], f - m) - v[m]);
      }
      return fn(v[i ? i - 1 : 0], v[i], v[m < i + 1 ? m : i + 1], v[m < i + 2 ? m : i + 2], f - i);
    }
  },
  Utils: {
    Linear: function(p0, p1, t) {
      return (p1 - p0) * t + p0;
    },
    Bernstein: function(n, i) {
      var fc = Interpolation.Utils.Factorial;
      return fc(n) / fc(i) / fc(n - i);
    },
    Factorial: /* @__PURE__ */ function() {
      var a = [1];
      return function(n) {
        var s = 1;
        if (a[n]) {
          return a[n];
        }
        for (var i = n; i > 1; i--) {
          s *= i;
        }
        a[n] = s;
        return s;
      };
    }(),
    CatmullRom: function(p0, p1, p2, p3, t) {
      var v0 = (p2 - p0) * 0.5;
      var v1 = (p3 - p1) * 0.5;
      var t2 = t * t;
      var t3 = t * t2;
      return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;
    }
  }
};
var Sequence = (
  /** @class */
  function() {
    function Sequence2() {
    }
    Sequence2.nextId = function() {
      return Sequence2._nextId++;
    };
    Sequence2._nextId = 0;
    return Sequence2;
  }()
);
var mainGroup = new Group();
var Tween = (
  /** @class */
  function() {
    function Tween2(_object, _group) {
      if (_group === void 0) {
        _group = mainGroup;
      }
      this._object = _object;
      this._group = _group;
      this._isPaused = false;
      this._pauseStart = 0;
      this._valuesStart = {};
      this._valuesEnd = {};
      this._valuesStartRepeat = {};
      this._duration = 1e3;
      this._initialRepeat = 0;
      this._repeat = 0;
      this._yoyo = false;
      this._isPlaying = false;
      this._reversed = false;
      this._delayTime = 0;
      this._startTime = 0;
      this._easingFunction = Easing.Linear.None;
      this._interpolationFunction = Interpolation.Linear;
      this._chainedTweens = [];
      this._onStartCallbackFired = false;
      this._id = Sequence.nextId();
      this._isChainStopped = false;
      this._goToEnd = false;
    }
    Tween2.prototype.getId = function() {
      return this._id;
    };
    Tween2.prototype.isPlaying = function() {
      return this._isPlaying;
    };
    Tween2.prototype.isPaused = function() {
      return this._isPaused;
    };
    Tween2.prototype.to = function(properties, duration) {
      this._valuesEnd = Object.create(properties);
      if (duration !== void 0) {
        this._duration = duration;
      }
      return this;
    };
    Tween2.prototype.duration = function(d) {
      this._duration = d;
      return this;
    };
    Tween2.prototype.start = function(time) {
      if (this._isPlaying) {
        return this;
      }
      this._group && this._group.add(this);
      this._repeat = this._initialRepeat;
      if (this._reversed) {
        this._reversed = false;
        for (var property in this._valuesStartRepeat) {
          this._swapEndStartRepeatValues(property);
          this._valuesStart[property] = this._valuesStartRepeat[property];
        }
      }
      this._isPlaying = true;
      this._isPaused = false;
      this._onStartCallbackFired = false;
      this._isChainStopped = false;
      this._startTime = time !== void 0 ? typeof time === "string" ? now$1() + parseFloat(time) : time : now$1();
      this._startTime += this._delayTime;
      this._setupProperties(this._object, this._valuesStart, this._valuesEnd, this._valuesStartRepeat);
      return this;
    };
    Tween2.prototype._setupProperties = function(_object, _valuesStart, _valuesEnd, _valuesStartRepeat) {
      for (var property in _valuesEnd) {
        var startValue = _object[property];
        var startValueIsArray = Array.isArray(startValue);
        var propType = startValueIsArray ? "array" : typeof startValue;
        var isInterpolationList = !startValueIsArray && Array.isArray(_valuesEnd[property]);
        if (propType === "undefined" || propType === "function") {
          continue;
        }
        if (isInterpolationList) {
          var endValues = _valuesEnd[property];
          if (endValues.length === 0) {
            continue;
          }
          endValues = endValues.map(this._handleRelativeValue.bind(this, startValue));
          _valuesEnd[property] = [startValue].concat(endValues);
        }
        if ((propType === "object" || startValueIsArray) && startValue && !isInterpolationList) {
          _valuesStart[property] = startValueIsArray ? [] : {};
          for (var prop in startValue) {
            _valuesStart[property][prop] = startValue[prop];
          }
          _valuesStartRepeat[property] = startValueIsArray ? [] : {};
          this._setupProperties(startValue, _valuesStart[property], _valuesEnd[property], _valuesStartRepeat[property]);
        } else {
          if (typeof _valuesStart[property] === "undefined") {
            _valuesStart[property] = startValue;
          }
          if (!startValueIsArray) {
            _valuesStart[property] *= 1;
          }
          if (isInterpolationList) {
            _valuesStartRepeat[property] = _valuesEnd[property].slice().reverse();
          } else {
            _valuesStartRepeat[property] = _valuesStart[property] || 0;
          }
        }
      }
    };
    Tween2.prototype.stop = function() {
      if (!this._isChainStopped) {
        this._isChainStopped = true;
        this.stopChainedTweens();
      }
      if (!this._isPlaying) {
        return this;
      }
      this._group && this._group.remove(this);
      this._isPlaying = false;
      this._isPaused = false;
      if (this._onStopCallback) {
        this._onStopCallback(this._object);
      }
      return this;
    };
    Tween2.prototype.end = function() {
      this._goToEnd = true;
      this.update(Infinity);
      return this;
    };
    Tween2.prototype.pause = function(time) {
      if (time === void 0) {
        time = now$1();
      }
      if (this._isPaused || !this._isPlaying) {
        return this;
      }
      this._isPaused = true;
      this._pauseStart = time;
      this._group && this._group.remove(this);
      return this;
    };
    Tween2.prototype.resume = function(time) {
      if (time === void 0) {
        time = now$1();
      }
      if (!this._isPaused || !this._isPlaying) {
        return this;
      }
      this._isPaused = false;
      this._startTime += time - this._pauseStart;
      this._pauseStart = 0;
      this._group && this._group.add(this);
      return this;
    };
    Tween2.prototype.stopChainedTweens = function() {
      for (var i = 0, numChainedTweens = this._chainedTweens.length; i < numChainedTweens; i++) {
        this._chainedTweens[i].stop();
      }
      return this;
    };
    Tween2.prototype.group = function(group) {
      this._group = group;
      return this;
    };
    Tween2.prototype.delay = function(amount) {
      this._delayTime = amount;
      return this;
    };
    Tween2.prototype.repeat = function(times) {
      this._initialRepeat = times;
      this._repeat = times;
      return this;
    };
    Tween2.prototype.repeatDelay = function(amount) {
      this._repeatDelayTime = amount;
      return this;
    };
    Tween2.prototype.yoyo = function(yoyo) {
      this._yoyo = yoyo;
      return this;
    };
    Tween2.prototype.easing = function(easingFunction) {
      this._easingFunction = easingFunction;
      return this;
    };
    Tween2.prototype.interpolation = function(interpolationFunction) {
      this._interpolationFunction = interpolationFunction;
      return this;
    };
    Tween2.prototype.chain = function() {
      var tweens = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        tweens[_i] = arguments[_i];
      }
      this._chainedTweens = tweens;
      return this;
    };
    Tween2.prototype.onStart = function(callback) {
      this._onStartCallback = callback;
      return this;
    };
    Tween2.prototype.onUpdate = function(callback) {
      this._onUpdateCallback = callback;
      return this;
    };
    Tween2.prototype.onRepeat = function(callback) {
      this._onRepeatCallback = callback;
      return this;
    };
    Tween2.prototype.onComplete = function(callback) {
      this._onCompleteCallback = callback;
      return this;
    };
    Tween2.prototype.onStop = function(callback) {
      this._onStopCallback = callback;
      return this;
    };
    Tween2.prototype.update = function(time, autoStart) {
      if (time === void 0) {
        time = now$1();
      }
      if (autoStart === void 0) {
        autoStart = true;
      }
      if (this._isPaused)
        return true;
      var property;
      var elapsed;
      var endTime = this._startTime + this._duration;
      if (!this._goToEnd && !this._isPlaying) {
        if (time > endTime)
          return false;
        if (autoStart)
          this.start(time);
      }
      this._goToEnd = false;
      if (time < this._startTime) {
        return true;
      }
      if (this._onStartCallbackFired === false) {
        if (this._onStartCallback) {
          this._onStartCallback(this._object);
        }
        this._onStartCallbackFired = true;
      }
      elapsed = (time - this._startTime) / this._duration;
      elapsed = this._duration === 0 || elapsed > 1 ? 1 : elapsed;
      var value = this._easingFunction(elapsed);
      this._updateProperties(this._object, this._valuesStart, this._valuesEnd, value);
      if (this._onUpdateCallback) {
        this._onUpdateCallback(this._object, elapsed);
      }
      if (elapsed === 1) {
        if (this._repeat > 0) {
          if (isFinite(this._repeat)) {
            this._repeat--;
          }
          for (property in this._valuesStartRepeat) {
            if (!this._yoyo && typeof this._valuesEnd[property] === "string") {
              this._valuesStartRepeat[property] = // eslint-disable-next-line
              // @ts-ignore FIXME?
              this._valuesStartRepeat[property] + parseFloat(this._valuesEnd[property]);
            }
            if (this._yoyo) {
              this._swapEndStartRepeatValues(property);
            }
            this._valuesStart[property] = this._valuesStartRepeat[property];
          }
          if (this._yoyo) {
            this._reversed = !this._reversed;
          }
          if (this._repeatDelayTime !== void 0) {
            this._startTime = time + this._repeatDelayTime;
          } else {
            this._startTime = time + this._delayTime;
          }
          if (this._onRepeatCallback) {
            this._onRepeatCallback(this._object);
          }
          return true;
        } else {
          if (this._onCompleteCallback) {
            this._onCompleteCallback(this._object);
          }
          for (var i = 0, numChainedTweens = this._chainedTweens.length; i < numChainedTweens; i++) {
            this._chainedTweens[i].start(this._startTime + this._duration);
          }
          this._isPlaying = false;
          return false;
        }
      }
      return true;
    };
    Tween2.prototype._updateProperties = function(_object, _valuesStart, _valuesEnd, value) {
      for (var property in _valuesEnd) {
        if (_valuesStart[property] === void 0) {
          continue;
        }
        var start = _valuesStart[property] || 0;
        var end = _valuesEnd[property];
        var startIsArray = Array.isArray(_object[property]);
        var endIsArray = Array.isArray(end);
        var isInterpolationList = !startIsArray && endIsArray;
        if (isInterpolationList) {
          _object[property] = this._interpolationFunction(end, value);
        } else if (typeof end === "object" && end) {
          this._updateProperties(_object[property], start, end, value);
        } else {
          end = this._handleRelativeValue(start, end);
          if (typeof end === "number") {
            _object[property] = start + (end - start) * value;
          }
        }
      }
    };
    Tween2.prototype._handleRelativeValue = function(start, end) {
      if (typeof end !== "string") {
        return end;
      }
      if (end.charAt(0) === "+" || end.charAt(0) === "-") {
        return start + parseFloat(end);
      } else {
        return parseFloat(end);
      }
    };
    Tween2.prototype._swapEndStartRepeatValues = function(property) {
      var tmp = this._valuesStartRepeat[property];
      var endValue = this._valuesEnd[property];
      if (typeof endValue === "string") {
        this._valuesStartRepeat[property] = this._valuesStartRepeat[property] + parseFloat(endValue);
      } else {
        this._valuesStartRepeat[property] = this._valuesEnd[property];
      }
      this._valuesEnd[property] = tmp;
    };
    return Tween2;
  }()
);
var nextId = Sequence.nextId;
var TWEEN = mainGroup;
var getAll = TWEEN.getAll.bind(TWEEN);
var removeAll = TWEEN.removeAll.bind(TWEEN);
var add = TWEEN.add.bind(TWEEN);
var remove = TWEEN.remove.bind(TWEEN);
var update = TWEEN.update.bind(TWEEN);

// node_modules/react-slideshow-image/dist/react-slideshow-image.esm.js
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
var getStartingIndex = function getStartingIndex2(children, defaultIndex) {
  if (defaultIndex && defaultIndex < import_react.default.Children.count(children)) {
    return defaultIndex;
  }
  return 0;
};
var getResponsiveSettings = function getResponsiveSettings2(wrapperWidth, responsive) {
  if (typeof window !== "undefined" && Array.isArray(responsive)) {
    return responsive.find(function(each) {
      return each.breakpoint <= wrapperWidth;
    });
  }
  return;
};
var EASING_METHODS = {
  linear: Easing.Linear.None,
  ease: Easing.Quadratic.InOut,
  "ease-in": Easing.Quadratic.In,
  "ease-out": Easing.Quadratic.Out,
  cubic: Easing.Cubic.InOut,
  "cubic-in": Easing.Cubic.In,
  "cubic-out": Easing.Cubic.Out
};
var getEasing = function getEasing2(easeMethod) {
  if (easeMethod) {
    return EASING_METHODS[easeMethod];
  }
  return EASING_METHODS.linear;
};
var showPreviousArrow = function showPreviousArrow2(_ref, currentIndex, moveSlides) {
  var prevArrow = _ref.prevArrow, infinite = _ref.infinite;
  var isDisabled = currentIndex <= 0 && !infinite;
  var props = {
    "data-type": "prev",
    "aria-label": "Previous Slide",
    disabled: isDisabled,
    onClick: moveSlides
  };
  if (prevArrow) {
    return import_react.default.cloneElement(prevArrow, _extends({
      className: (prevArrow.props.className || "") + " nav " + (isDisabled ? "disabled" : "")
    }, props));
  }
  var className = "nav default-nav " + (isDisabled ? "disabled" : "");
  return import_react.default.createElement("button", Object.assign({
    type: "button",
    className
  }, props), import_react.default.createElement("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24"
  }, import_react.default.createElement("path", {
    d: "M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"
  })));
};
var showNextArrow = function showNextArrow2(properties, currentIndex, moveSlides, responsiveSettings) {
  var nextArrow = properties.nextArrow, infinite = properties.infinite, children = properties.children;
  var slidesToScroll = 1;
  if (responsiveSettings) {
    slidesToScroll = responsiveSettings == null ? void 0 : responsiveSettings.settings.slidesToScroll;
  } else if ("slidesToScroll" in properties) {
    slidesToScroll = properties.slidesToScroll || 1;
  }
  var isDisabled = currentIndex >= import_react.default.Children.count(children) - slidesToScroll && !infinite;
  var props = {
    "data-type": "next",
    "aria-label": "Next Slide",
    disabled: isDisabled,
    onClick: moveSlides
  };
  if (nextArrow) {
    return import_react.default.cloneElement(nextArrow, _extends({
      className: (nextArrow.props.className || "") + " nav " + (isDisabled ? "disabled" : "")
    }, props));
  }
  var className = "nav default-nav " + (isDisabled ? "disabled" : "");
  return import_react.default.createElement("button", Object.assign({
    type: "button",
    className
  }, props), import_react.default.createElement("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24"
  }, import_react.default.createElement("path", {
    d: "M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"
  })));
};
var showDefaultIndicator = function showDefaultIndicator2(isCurrentPageActive, key, indicatorProps) {
  return import_react.default.createElement("li", {
    key
  }, import_react.default.createElement("button", Object.assign({
    type: "button",
    className: "each-slideshow-indicator " + (isCurrentPageActive ? "active" : "")
  }, indicatorProps)));
};
var showCustomIndicator = function showCustomIndicator2(isCurrentPageActive, key, indicatorProps, eachIndicator) {
  return import_react.default.cloneElement(eachIndicator, _extends({
    className: eachIndicator.props.className + " " + (isCurrentPageActive ? "active" : ""),
    key
  }, indicatorProps));
};
var showIndicators = function showIndicators2(props, currentIndex, navigate, responsiveSettings) {
  var children = props.children, indicators = props.indicators;
  var slidesToScroll = 1;
  if (responsiveSettings) {
    slidesToScroll = responsiveSettings == null ? void 0 : responsiveSettings.settings.slidesToScroll;
  } else if ("slidesToScroll" in props) {
    slidesToScroll = props.slidesToScroll || 1;
  }
  var pages = Math.ceil(import_react.default.Children.count(children) / slidesToScroll);
  return import_react.default.createElement("ul", {
    className: "indicators"
  }, Array.from({
    length: pages
  }, function(_, key) {
    var indicatorProps = {
      "data-key": key,
      "aria-label": "Go to slide " + (key + 1),
      onClick: navigate
    };
    var isCurrentPageActive = Math.floor((currentIndex + slidesToScroll - 1) / slidesToScroll) === key;
    if (typeof indicators === "function") {
      return showCustomIndicator(isCurrentPageActive, key, indicatorProps, indicators(key));
    }
    return showDefaultIndicator(isCurrentPageActive, key, indicatorProps);
  }));
};
var defaultProps = {
  duration: 5e3,
  transitionDuration: 1e3,
  defaultIndex: 0,
  infinite: true,
  autoplay: true,
  indicators: false,
  arrows: true,
  pauseOnHover: true,
  easing: "linear",
  canSwipe: true,
  cssClass: "",
  responsive: []
};
var FadeZoom = import_react.default.forwardRef(function(props, ref) {
  var _useState = (0, import_react.useState)(getStartingIndex(props.children, props.defaultIndex)), index2 = _useState[0], setIndex = _useState[1];
  var wrapperRef = (0, import_react.useRef)(null);
  var innerWrapperRef = (0, import_react.useRef)(null);
  var tweenGroup = (0, import_react.useRef)(new Group());
  var timeout = (0, import_react.useRef)();
  var resizeObserver = (0, import_react.useRef)();
  var childrenCount = (0, import_react.useMemo)(function() {
    return import_react.default.Children.count(props.children);
  }, [props.children]);
  var applyStyle = (0, import_react.useCallback)(function() {
    if (innerWrapperRef.current && wrapperRef.current) {
      var wrapperWidth = wrapperRef.current.clientWidth;
      var fullwidth = wrapperWidth * childrenCount;
      innerWrapperRef.current.style.width = fullwidth + "px";
      for (var _index = 0; _index < innerWrapperRef.current.children.length; _index++) {
        var eachDiv = innerWrapperRef.current.children[_index];
        if (eachDiv) {
          eachDiv.style.width = wrapperWidth + "px";
          eachDiv.style.left = _index * -wrapperWidth + "px";
          eachDiv.style.display = "block";
        }
      }
    }
  }, [wrapperRef, innerWrapperRef, childrenCount]);
  var initResizeObserver = (0, import_react.useCallback)(function() {
    if (wrapperRef.current) {
      resizeObserver.current = new ResizeObserver_es_default(function(entries) {
        if (!entries)
          return;
        applyStyle();
      });
      resizeObserver.current.observe(wrapperRef.current);
    }
  }, [wrapperRef, applyStyle]);
  var play = (0, import_react.useCallback)(function() {
    var autoplay = props.autoplay, children = props.children, duration = props.duration, infinite = props.infinite;
    if (autoplay && import_react.default.Children.count(children) > 1 && (infinite || index2 < import_react.default.Children.count(children) - 1)) {
      timeout.current = setTimeout(moveNext, duration);
    }
  }, [props, index2]);
  (0, import_react.useEffect)(function() {
    initResizeObserver();
    return function() {
      tweenGroup.current.removeAll();
      clearTimeout(timeout.current);
      removeResizeObserver();
    };
  }, [initResizeObserver, tweenGroup]);
  (0, import_react.useEffect)(function() {
    clearTimeout(timeout.current);
    play();
  }, [index2, props.autoplay, play]);
  (0, import_react.useEffect)(function() {
    applyStyle();
  }, [childrenCount, applyStyle]);
  (0, import_react.useImperativeHandle)(ref, function() {
    return {
      goNext: function goNext() {
        moveNext();
      },
      goBack: function goBack() {
        moveBack();
      },
      goTo: function goTo(index3, options) {
        if (options != null && options.skipTransition) {
          setIndex(index3);
        } else {
          moveTo(index3);
        }
      }
    };
  });
  var removeResizeObserver = function removeResizeObserver2() {
    if (resizeObserver.current && wrapperRef.current) {
      resizeObserver.current.unobserve(wrapperRef.current);
    }
  };
  var pauseSlides = function pauseSlides2() {
    if (props.pauseOnHover) {
      clearTimeout(timeout.current);
    }
  };
  var startSlides = function startSlides2() {
    var pauseOnHover = props.pauseOnHover, autoplay = props.autoplay, duration = props.duration;
    if (pauseOnHover && autoplay) {
      timeout.current = setTimeout(function() {
        return moveNext();
      }, duration);
    }
  };
  var moveNext = function moveNext2() {
    var children = props.children, infinite = props.infinite;
    if (!infinite && index2 === import_react.default.Children.count(children) - 1) {
      return;
    }
    transitionSlide((index2 + 1) % import_react.default.Children.count(children));
  };
  var moveBack = function moveBack2() {
    var children = props.children, infinite = props.infinite;
    if (!infinite && index2 === 0) {
      return;
    }
    transitionSlide(index2 === 0 ? import_react.default.Children.count(children) - 1 : index2 - 1);
  };
  var preTransition = function preTransition2(event) {
    var currentTarget = event.currentTarget;
    if (currentTarget.dataset.type === "prev") {
      moveBack();
    } else {
      moveNext();
    }
  };
  var animate = function animate2() {
    requestAnimationFrame(animate2);
    tweenGroup.current.update();
  };
  var transitionSlide = function transitionSlide2(newIndex) {
    var existingTweens = tweenGroup.current.getAll();
    if (!existingTweens.length) {
      var _innerWrapperRef$curr;
      if (!((_innerWrapperRef$curr = innerWrapperRef.current) != null && _innerWrapperRef$curr.children[newIndex])) {
        newIndex = 0;
      }
      clearTimeout(timeout.current);
      var value = {
        opacity: 0,
        scale: 1
      };
      animate();
      var tween = new Tween(value, tweenGroup.current).to({
        opacity: 1,
        scale: props.scale
      }, props.transitionDuration).onUpdate(function(value2) {
        if (!innerWrapperRef.current) {
          return;
        }
        innerWrapperRef.current.children[newIndex].style.opacity = value2.opacity;
        innerWrapperRef.current.children[index2].style.opacity = 1 - value2.opacity;
        innerWrapperRef.current.children[index2].style.transform = "scale(" + value2.scale + ")";
      });
      tween.easing(getEasing(props.easing));
      tween.onStart(function() {
        if (typeof props.onStartChange === "function") {
          props.onStartChange(index2, newIndex);
        }
      });
      tween.onComplete(function() {
        if (innerWrapperRef.current) {
          setIndex(newIndex);
          innerWrapperRef.current.children[index2].style.transform = "scale(1)";
        }
        if (typeof props.onChange === "function") {
          props.onChange(index2, newIndex);
        }
      });
      tween.start();
    }
  };
  var moveTo = function moveTo2(gotoIndex) {
    if (gotoIndex !== index2) {
      transitionSlide(gotoIndex);
    }
  };
  var navigate = function navigate2(event) {
    var currentTarget = event.currentTarget;
    if (!currentTarget.dataset.key) {
      return;
    }
    if (parseInt(currentTarget.dataset.key) !== index2) {
      moveTo(parseInt(currentTarget.dataset.key));
    }
  };
  return import_react.default.createElement("div", {
    dir: "ltr",
    "aria-roledescription": "carousel"
  }, import_react.default.createElement("div", {
    className: "react-slideshow-container " + (props.cssClass || ""),
    onMouseEnter: pauseSlides,
    onMouseOver: pauseSlides,
    onMouseLeave: startSlides
  }, props.arrows && showPreviousArrow(props, index2, preTransition), import_react.default.createElement("div", {
    className: "react-slideshow-fadezoom-wrapper " + props.cssClass,
    ref: wrapperRef
  }, import_react.default.createElement("div", {
    className: "react-slideshow-fadezoom-images-wrap",
    ref: innerWrapperRef
  }, (import_react.default.Children.map(props.children, function(thisArg) {
    return thisArg;
  }) || []).map(function(each, key) {
    return import_react.default.createElement("div", {
      style: {
        opacity: key === index2 ? "1" : "0",
        zIndex: key === index2 ? "1" : "0"
      },
      "data-index": key,
      key,
      "aria-roledescription": "slide",
      "aria-hidden": key === index2 ? "false" : "true"
    }, each);
  }))), props.arrows && showNextArrow(props, index2, preTransition)), props.indicators && showIndicators(props, index2, navigate));
});
FadeZoom.defaultProps = defaultProps;
var Fade = import_react.default.forwardRef(function(props, ref) {
  return import_react.default.createElement(FadeZoom, Object.assign({}, props, {
    scale: 1,
    ref
  }));
});
Fade.defaultProps = defaultProps;
var Zoom = import_react.default.forwardRef(function(props, ref) {
  return import_react.default.createElement(FadeZoom, Object.assign({}, props, {
    ref
  }));
});
Zoom.defaultProps = defaultProps;
var Slide = import_react.default.forwardRef(function(props, ref) {
  var _useState = (0, import_react.useState)(getStartingIndex(props.children, props.defaultIndex)), index2 = _useState[0], setIndex = _useState[1];
  var _useState2 = (0, import_react.useState)(0), wrapperSize = _useState2[0], setWrapperSize = _useState2[1];
  var wrapperRef = (0, import_react.useRef)(null);
  var innerWrapperRef = (0, import_react.useRef)(null);
  var tweenGroup = (0, import_react.useRef)(new Group());
  var responsiveSettings = (0, import_react.useMemo)(function() {
    return getResponsiveSettings(wrapperSize, props.responsive);
  }, [wrapperSize, props.responsive]);
  var slidesToScroll = (0, import_react.useMemo)(function() {
    if (responsiveSettings) {
      return responsiveSettings.settings.slidesToScroll;
    }
    return props.slidesToScroll || 1;
  }, [responsiveSettings, props.slidesToScroll]);
  var slidesToShow = (0, import_react.useMemo)(function() {
    if (responsiveSettings) {
      return responsiveSettings.settings.slidesToShow;
    }
    return props.slidesToShow || 1;
  }, [responsiveSettings, props.slidesToShow]);
  var childrenCount = (0, import_react.useMemo)(function() {
    return import_react.default.Children.count(props.children);
  }, [props.children]);
  var eachChildSize = (0, import_react.useMemo)(function() {
    return wrapperSize / slidesToShow;
  }, [wrapperSize, slidesToShow]);
  var timeout = (0, import_react.useRef)();
  var resizeObserver = (0, import_react.useRef)();
  var startingSwipePosition;
  var dragging = false;
  var distanceSwiped = 0;
  var translateType = props.vertical ? "translateY" : "translateX";
  var swipeAttributeType = props.vertical ? "clientY" : "clientX";
  var swipePageAttributeType = props.vertical ? "pageY" : "pageX";
  var applyStyle = (0, import_react.useCallback)(function() {
    if (innerWrapperRef.current) {
      var fullSize = wrapperSize * innerWrapperRef.current.children.length;
      var attribute = props.vertical ? "height" : "width";
      innerWrapperRef.current.style[attribute] = fullSize + "px";
      if (props.vertical && wrapperRef.current) {
        wrapperRef.current.style[attribute] = wrapperSize + "px";
      }
      for (var _index = 0; _index < innerWrapperRef.current.children.length; _index++) {
        var eachDiv = innerWrapperRef.current.children[_index];
        if (eachDiv) {
          if (!props.vertical) {
            eachDiv.style[attribute] = eachChildSize + "px";
          }
          eachDiv.style.display = "block";
        }
      }
    }
  }, [wrapperSize, eachChildSize]);
  var initResizeObserver = (0, import_react.useCallback)(function() {
    if (wrapperRef.current) {
      resizeObserver.current = new ResizeObserver_es_default(function(entries) {
        if (!entries)
          return;
        setSize();
      });
      resizeObserver.current.observe(wrapperRef.current);
    }
  }, [wrapperRef]);
  var play = (0, import_react.useCallback)(function() {
    var autoplay = props.autoplay, infinite = props.infinite, duration = props.duration;
    if (autoplay && (infinite || index2 < childrenCount - 1)) {
      timeout.current = setTimeout(moveNext, duration);
    }
  }, [props, childrenCount, index2]);
  (0, import_react.useEffect)(function() {
    applyStyle();
  }, [wrapperSize, applyStyle]);
  (0, import_react.useEffect)(function() {
    initResizeObserver();
    return function() {
      tweenGroup.current.removeAll();
      clearTimeout(timeout.current);
      removeResizeObserver();
    };
  }, [wrapperRef, initResizeObserver, tweenGroup]);
  (0, import_react.useEffect)(function() {
    clearTimeout(timeout.current);
    play();
  }, [index2, wrapperSize, props.autoplay, play]);
  (0, import_react.useImperativeHandle)(ref, function() {
    return {
      goNext: function goNext() {
        moveNext();
      },
      goBack: function goBack() {
        moveBack();
      },
      goTo: function goTo(index3, options) {
        if (options != null && options.skipTransition) {
          setIndex(index3);
        } else {
          moveTo(index3);
        }
      }
    };
  });
  var removeResizeObserver = function removeResizeObserver2() {
    if (resizeObserver && wrapperRef.current) {
      resizeObserver.current.unobserve(wrapperRef.current);
    }
  };
  var pauseSlides = function pauseSlides2() {
    if (props.pauseOnHover) {
      clearTimeout(timeout.current);
    }
  };
  var swipe = function swipe2(event) {
    if (props.canSwipe && dragging) {
      var position;
      if (window.TouchEvent && event.nativeEvent instanceof TouchEvent) {
        position = event.nativeEvent.touches[0][swipePageAttributeType];
      } else {
        position = event.nativeEvent[swipeAttributeType];
      }
      if (position && startingSwipePosition) {
        var translateValue = eachChildSize * (index2 + getOffset());
        var distance = position - startingSwipePosition;
        if (!props.infinite && index2 === childrenCount - slidesToScroll && distance < 0) {
          return;
        }
        if (!props.infinite && index2 === 0 && distance > 0) {
          return;
        }
        distanceSwiped = distance;
        translateValue -= distanceSwiped;
        innerWrapperRef.current.style.transform = translateType + "(-" + translateValue + "px)";
      }
    }
  };
  var moveNext = function moveNext2() {
    if (!props.infinite && index2 === childrenCount - slidesToScroll) {
      return;
    }
    var nextIndex = calculateIndex(index2 + slidesToScroll);
    transitionSlide(nextIndex);
  };
  var moveBack = function moveBack2() {
    if (!props.infinite && index2 === 0) {
      return;
    }
    var previousIndex = index2 - slidesToScroll;
    if (previousIndex % slidesToScroll) {
      previousIndex = Math.ceil(previousIndex / slidesToScroll) * slidesToScroll;
    }
    transitionSlide(previousIndex);
  };
  var goToSlide = function goToSlide2(_ref) {
    var currentTarget = _ref.currentTarget;
    if (!currentTarget.dataset.key) {
      return;
    }
    var datasetKey = parseInt(currentTarget.dataset.key);
    moveTo(datasetKey * slidesToScroll);
  };
  var moveTo = function moveTo2(index3) {
    transitionSlide(calculateIndex(index3));
  };
  var calculateIndex = function calculateIndex2(nextIndex) {
    if (nextIndex < childrenCount && nextIndex + slidesToScroll > childrenCount) {
      if ((childrenCount - slidesToScroll) % slidesToScroll) {
        return childrenCount - slidesToScroll;
      }
      return nextIndex;
    }
    return nextIndex;
  };
  var startSlides = function startSlides2() {
    if (dragging) {
      endSwipe();
    } else if (props.pauseOnHover && props.autoplay) {
      timeout.current = setTimeout(moveNext, props.duration);
    }
  };
  var moveSlides = function moveSlides2(_ref2) {
    var dataset = _ref2.currentTarget.dataset;
    if (dataset.type === "next") {
      moveNext();
    } else {
      moveBack();
    }
  };
  var renderPreceedingSlides = function renderPreceedingSlides2() {
    return import_react.default.Children.toArray(props.children).slice(-slidesToShow).map(function(each, index3) {
      return import_react.default.createElement("div", {
        "data-index": index3 - slidesToShow,
        "aria-roledescription": "slide",
        "aria-hidden": "true",
        key: index3 - slidesToShow
      }, each);
    });
  };
  var renderTrailingSlides = function renderTrailingSlides2() {
    if (!props.infinite && slidesToShow === slidesToScroll) {
      return;
    }
    return import_react.default.Children.toArray(props.children).slice(0, slidesToShow).map(function(each, index3) {
      return import_react.default.createElement("div", {
        "data-index": childrenCount + index3,
        "aria-roledescription": "slide",
        "aria-hidden": "true",
        key: childrenCount + index3
      }, each);
    });
  };
  var setSize = function setSize2() {
    var attribute = props.vertical ? "clientHeight" : "clientWidth";
    if (props.vertical) {
      if (innerWrapperRef.current) {
        setWrapperSize(innerWrapperRef.current.children[0][attribute]);
      }
    } else {
      if (wrapperRef.current) {
        setWrapperSize(wrapperRef.current[attribute]);
      }
    }
  };
  var startSwipe = function startSwipe2(event) {
    if (props.canSwipe) {
      if (window.TouchEvent && event.nativeEvent instanceof TouchEvent) {
        startingSwipePosition = event.nativeEvent.touches[0][swipePageAttributeType];
      } else {
        startingSwipePosition = event.nativeEvent[swipeAttributeType];
      }
      clearTimeout(timeout.current);
      dragging = true;
    }
  };
  var endSwipe = function endSwipe2() {
    if (props.canSwipe) {
      dragging = false;
      if (Math.abs(distanceSwiped) / wrapperSize > 0.2) {
        if (distanceSwiped < 0) {
          moveNext();
        } else {
          moveBack();
        }
      } else {
        if (Math.abs(distanceSwiped) > 0) {
          transitionSlide(index2, 300);
        }
      }
    }
  };
  var animate = function animate2() {
    requestAnimationFrame(animate2);
    tweenGroup.current.update();
  };
  var transitionSlide = function transitionSlide2(toIndex, animationDuration) {
    var transitionDuration = animationDuration || props.transitionDuration;
    var currentIndex = index2;
    var existingTweens = tweenGroup.current.getAll();
    if (!wrapperRef.current) {
      return;
    }
    var attribute = props.vertical ? "clientHeight" : "clientWidth";
    var childSize = wrapperRef.current[attribute] / slidesToShow;
    if (!existingTweens.length) {
      clearTimeout(timeout.current);
      var value = {
        margin: -childSize * (currentIndex + getOffset()) + distanceSwiped
      };
      var tween = new Tween(value, tweenGroup.current).to({
        margin: -childSize * (toIndex + getOffset())
      }, transitionDuration).onUpdate(function(value2) {
        if (innerWrapperRef.current) {
          innerWrapperRef.current.style.transform = translateType + "(" + value2.margin + "px)";
        }
      });
      tween.easing(getEasing(props.easing));
      animate();
      var newIndex = toIndex;
      if (newIndex < 0) {
        newIndex = childrenCount - slidesToScroll;
      } else if (newIndex >= childrenCount) {
        newIndex = 0;
      }
      tween.onStart(function() {
        if (typeof props.onStartChange === "function") {
          props.onStartChange(index2, newIndex);
        }
      });
      tween.onComplete(function() {
        distanceSwiped = 0;
        if (typeof props.onChange === "function") {
          props.onChange(index2, newIndex);
        }
        setIndex(newIndex);
      });
      tween.start();
    }
  };
  var isSlideActive = function isSlideActive2(key) {
    return key < index2 + slidesToShow && key >= index2;
  };
  var getOffset = function getOffset2() {
    if (!props.infinite) {
      return 0;
    }
    return slidesToShow;
  };
  var style = {
    transform: translateType + "(-" + (index2 + getOffset()) * eachChildSize + "px)"
  };
  return import_react.default.createElement("div", {
    dir: "ltr",
    "aria-roledescription": "carousel"
  }, import_react.default.createElement("div", {
    className: "react-slideshow-container",
    onMouseEnter: pauseSlides,
    onMouseOver: pauseSlides,
    onMouseLeave: startSlides,
    onMouseDown: startSwipe,
    onMouseUp: endSwipe,
    onMouseMove: swipe,
    onTouchStart: startSwipe,
    onTouchEnd: endSwipe,
    onTouchCancel: endSwipe,
    onTouchMove: swipe
  }, props.arrows && showPreviousArrow(props, index2, moveSlides), import_react.default.createElement("div", {
    className: "react-slideshow-wrapper slide " + (props.cssClass || ""),
    ref: wrapperRef
  }, import_react.default.createElement("div", {
    className: "images-wrap " + (props.vertical ? "vertical" : "horizontal"),
    style,
    ref: innerWrapperRef
  }, props.infinite && renderPreceedingSlides(), (import_react.default.Children.map(props.children, function(thisArg) {
    return thisArg;
  }) || []).map(function(each, key) {
    var isThisSlideActive = isSlideActive(key);
    return import_react.default.createElement("div", {
      "data-index": key,
      key,
      className: isThisSlideActive ? "active" : "",
      "aria-roledescription": "slide",
      "aria-hidden": isThisSlideActive ? "false" : "true"
    }, each);
  }), renderTrailingSlides())), props.arrows && showNextArrow(props, index2, moveSlides, responsiveSettings)), !!props.indicators && showIndicators(props, index2, goToSlide, responsiveSettings));
});
Slide.defaultProps = defaultProps;
export {
  Fade,
  Slide,
  Zoom
};
//# sourceMappingURL=react-slideshow-image.js.map
