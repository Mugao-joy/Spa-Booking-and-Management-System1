import {
  require_react
} from "./chunk-4JI2AD7N.js";
import {
  __toESM
} from "./chunk-CEQRFMJQ.js";

// node_modules/react-paystack/dist/index.es.js
var import_react = __toESM(require_react());
var __assign = function() {
  __assign = Object.assign || function __assign2(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
function __rest(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
}
var cachedScripts = [];
function usePaystackScript() {
  var src = "https://js.paystack.co/v1/inline.js";
  var _a = (0, import_react.useState)({
    loaded: false,
    error: false
  }), state = _a[0], setState = _a[1];
  (0, import_react.useEffect)(function() {
    if (cachedScripts.includes(src)) {
      setState({
        loaded: true,
        error: false
      });
    } else {
      cachedScripts.push(src);
      var script_1 = document.createElement("script");
      script_1.src = src;
      script_1.async = true;
      var onScriptLoad_1 = function() {
        setState({
          loaded: true,
          error: false
        });
      };
      var onScriptError_1 = function() {
        var index = cachedScripts.indexOf(src);
        if (index >= 0)
          cachedScripts.splice(index, 1);
        script_1.remove();
        setState({
          loaded: true,
          error: true
        });
      };
      script_1.addEventListener("load", onScriptLoad_1);
      script_1.addEventListener("complete", onScriptLoad_1);
      script_1.addEventListener("error", onScriptError_1);
      document.body.appendChild(script_1);
      return function() {
        script_1.removeEventListener("load", onScriptLoad_1);
        script_1.removeEventListener("error", onScriptError_1);
      };
    }
  }, [src]);
  return [state.loaded, state.error];
}
var callPaystackPop = function(paystackArgs) {
  var handler = window.PaystackPop && window.PaystackPop.setup(paystackArgs);
  handler && handler.openIframe();
};
function usePaystackPayment(hookConfig) {
  var _a = usePaystackScript(), scriptLoaded = _a[0], scriptError = _a[1];
  function initializePayment(_a2) {
    var config = _a2.config, onSuccess = _a2.onSuccess, onClose = _a2.onClose;
    if (scriptError) {
      throw new Error("Unable to load paystack inline script");
    }
    var args = __assign(__assign({}, hookConfig), config);
    var publicKey = args.publicKey, firstname = args.firstname, lastname = args.lastname, phone = args.phone, email = args.email, amount = args.amount, reference = args.reference, _b = args.metadata, metadata = _b === void 0 ? {} : _b, _c = args.currency, currency = _c === void 0 ? "NGN" : _c, channels = args.channels, _d = args.label, label = _d === void 0 ? "" : _d, _e = args.plan, plan = _e === void 0 ? "" : _e, _f = args.quantity, quantity = _f === void 0 ? "" : _f, _g = args.subaccount, subaccount = _g === void 0 ? "" : _g, _h = args.transaction_charge, transaction_charge = _h === void 0 ? 0 : _h, _j = args.bearer, bearer = _j === void 0 ? "account" : _j, split = args.split, split_code = args.split_code;
    if (scriptLoaded) {
      var paystackArgs = {
        callback: onSuccess ? onSuccess : function() {
          return null;
        },
        onClose: onClose ? onClose : function() {
          return null;
        },
        key: publicKey,
        ref: reference,
        email,
        firstname,
        lastname,
        phone,
        amount,
        currency,
        plan,
        quantity,
        channels,
        subaccount,
        transaction_charge,
        bearer,
        label,
        metadata,
        split,
        split_code,
        "data-custom-button": args["data-custom-button"] || ""
      };
      callPaystackPop(paystackArgs);
    }
  }
  (0, import_react.useEffect)(function() {
    if (scriptError) {
      throw new Error("Unable to load paystack inline script");
    }
  }, [scriptError]);
  return initializePayment;
}
var PaystackButton = function(_a) {
  var text = _a.text, className = _a.className, children = _a.children, onSuccess = _a.onSuccess, onClose = _a.onClose, config = __rest(_a, ["text", "className", "children", "onSuccess", "onClose"]);
  var initializePayment = usePaystackPayment(config);
  return import_react.default.createElement("button", { className, onClick: function() {
    return initializePayment({ config, onSuccess, onClose });
  } }, text || children);
};
var PaystackContext = (0, import_react.createContext)({
  config: {},
  initializePayment: function() {
    return null;
  },
  onSuccess: function() {
    return null;
  },
  onClose: function() {
    return null;
  }
});
var PaystackProvider = function(_a) {
  var children = _a.children, onSuccess = _a.onSuccess, onClose = _a.onClose, config = __rest(_a, ["children", "onSuccess", "onClose"]);
  var initializePayment = usePaystackPayment(config);
  return import_react.default.createElement(PaystackContext.Provider, { value: { config, initializePayment, onSuccess, onClose } }, children);
};
var PaystackConsumerChild = function(_a) {
  var children = _a.children, ref = _a.ref;
  var _b = (0, import_react.useContext)(PaystackContext), config = _b.config, initializePayment = _b.initializePayment, onSuccess = _b.onSuccess, onClose = _b.onClose;
  var completeInitializePayment = function() {
    return initializePayment({ config, onSuccess, onClose });
  };
  return children({ initializePayment: completeInitializePayment, ref });
};
var PaystackConsumer = (0, import_react.forwardRef)(function(_a, ref) {
  var children = _a.children, paraSuccess = _a.onSuccess, paraClose = _a.onClose, others = __rest(_a, ["children", "onSuccess", "onClose"]);
  var onSuccess = paraSuccess ? paraSuccess : function() {
    return null;
  };
  var onClose = paraClose ? paraClose : function() {
    return null;
  };
  return import_react.default.createElement(
    PaystackProvider,
    __assign({}, others, { onSuccess, onClose }),
    import_react.default.createElement(PaystackConsumerChild, { ref }, children)
  );
});
export {
  PaystackButton,
  PaystackConsumer,
  usePaystackPayment
};
//# sourceMappingURL=react-paystack.js.map
