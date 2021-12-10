/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 58:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var reactIs = __webpack_require__(594);

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
var REACT_STATICS = {
  childContextTypes: true,
  contextType: true,
  contextTypes: true,
  defaultProps: true,
  displayName: true,
  getDefaultProps: true,
  getDerivedStateFromError: true,
  getDerivedStateFromProps: true,
  mixins: true,
  propTypes: true,
  type: true
};
var KNOWN_STATICS = {
  name: true,
  length: true,
  prototype: true,
  caller: true,
  callee: true,
  arguments: true,
  arity: true
};
var FORWARD_REF_STATICS = {
  '$$typeof': true,
  render: true,
  defaultProps: true,
  displayName: true,
  propTypes: true
};
var MEMO_STATICS = {
  '$$typeof': true,
  compare: true,
  defaultProps: true,
  displayName: true,
  propTypes: true,
  type: true
};
var TYPE_STATICS = {};
TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;
TYPE_STATICS[reactIs.Memo] = MEMO_STATICS;

function getStatics(component) {
  // React v16.11 and below
  if (reactIs.isMemo(component)) {
    return MEMO_STATICS;
  } // React v16.12 and above


  return TYPE_STATICS[component['$$typeof']] || REACT_STATICS;
}

var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = Object.prototype;
function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
  if (typeof sourceComponent !== 'string') {
    // don't hoist over string (html) components
    if (objectPrototype) {
      var inheritedComponent = getPrototypeOf(sourceComponent);

      if (inheritedComponent && inheritedComponent !== objectPrototype) {
        hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
      }
    }

    var keys = getOwnPropertyNames(sourceComponent);

    if (getOwnPropertySymbols) {
      keys = keys.concat(getOwnPropertySymbols(sourceComponent));
    }

    var targetStatics = getStatics(targetComponent);
    var sourceStatics = getStatics(sourceComponent);

    for (var i = 0; i < keys.length; ++i) {
      var key = keys[i];

      if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
        var descriptor = getOwnPropertyDescriptor(sourceComponent, key);

        try {
          // Avoid failures from read-only properties
          defineProperty(targetComponent, key, descriptor);
        } catch (e) {}
      }
    }
  }

  return targetComponent;
}

module.exports = hoistNonReactStatics;


/***/ }),

/***/ 516:
/***/ ((module) => {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),

/***/ 970:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var hasMap = typeof Map === 'function' && Map.prototype;
var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, 'size') : null;
var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === 'function' ? mapSizeDescriptor.get : null;
var mapForEach = hasMap && Map.prototype.forEach;
var hasSet = typeof Set === 'function' && Set.prototype;
var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, 'size') : null;
var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === 'function' ? setSizeDescriptor.get : null;
var setForEach = hasSet && Set.prototype.forEach;
var hasWeakMap = typeof WeakMap === 'function' && WeakMap.prototype;
var weakMapHas = hasWeakMap ? WeakMap.prototype.has : null;
var hasWeakSet = typeof WeakSet === 'function' && WeakSet.prototype;
var weakSetHas = hasWeakSet ? WeakSet.prototype.has : null;
var hasWeakRef = typeof WeakRef === 'function' && WeakRef.prototype;
var weakRefDeref = hasWeakRef ? WeakRef.prototype.deref : null;
var booleanValueOf = Boolean.prototype.valueOf;
var objectToString = Object.prototype.toString;
var functionToString = Function.prototype.toString;
var match = String.prototype.match;
var bigIntValueOf = typeof BigInt === 'function' ? BigInt.prototype.valueOf : null;
var gOPS = Object.getOwnPropertySymbols;
var symToString = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? Symbol.prototype.toString : null;
var hasShammedSymbols = typeof Symbol === 'function' && typeof Symbol.iterator === 'object';
var isEnumerable = Object.prototype.propertyIsEnumerable;

var gPO = (typeof Reflect === 'function' ? Reflect.getPrototypeOf : Object.getPrototypeOf) || (
    [].__proto__ === Array.prototype // eslint-disable-line no-proto
        ? function (O) {
            return O.__proto__; // eslint-disable-line no-proto
        }
        : null
);

var inspectCustom = __webpack_require__(503).custom;
var inspectSymbol = inspectCustom && isSymbol(inspectCustom) ? inspectCustom : null;
var toStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag !== 'undefined' ? Symbol.toStringTag : null;

module.exports = function inspect_(obj, options, depth, seen) {
    var opts = options || {};

    if (has(opts, 'quoteStyle') && (opts.quoteStyle !== 'single' && opts.quoteStyle !== 'double')) {
        throw new TypeError('option "quoteStyle" must be "single" or "double"');
    }
    if (
        has(opts, 'maxStringLength') && (typeof opts.maxStringLength === 'number'
            ? opts.maxStringLength < 0 && opts.maxStringLength !== Infinity
            : opts.maxStringLength !== null
        )
    ) {
        throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
    }
    var customInspect = has(opts, 'customInspect') ? opts.customInspect : true;
    if (typeof customInspect !== 'boolean' && customInspect !== 'symbol') {
        throw new TypeError('option "customInspect", if provided, must be `true`, `false`, or `\'symbol\'`');
    }

    if (
        has(opts, 'indent')
        && opts.indent !== null
        && opts.indent !== '\t'
        && !(parseInt(opts.indent, 10) === opts.indent && opts.indent > 0)
    ) {
        throw new TypeError('options "indent" must be "\\t", an integer > 0, or `null`');
    }

    if (typeof obj === 'undefined') {
        return 'undefined';
    }
    if (obj === null) {
        return 'null';
    }
    if (typeof obj === 'boolean') {
        return obj ? 'true' : 'false';
    }

    if (typeof obj === 'string') {
        return inspectString(obj, opts);
    }
    if (typeof obj === 'number') {
        if (obj === 0) {
            return Infinity / obj > 0 ? '0' : '-0';
        }
        return String(obj);
    }
    if (typeof obj === 'bigint') {
        return String(obj) + 'n';
    }

    var maxDepth = typeof opts.depth === 'undefined' ? 5 : opts.depth;
    if (typeof depth === 'undefined') { depth = 0; }
    if (depth >= maxDepth && maxDepth > 0 && typeof obj === 'object') {
        return isArray(obj) ? '[Array]' : '[Object]';
    }

    var indent = getIndent(opts, depth);

    if (typeof seen === 'undefined') {
        seen = [];
    } else if (indexOf(seen, obj) >= 0) {
        return '[Circular]';
    }

    function inspect(value, from, noIndent) {
        if (from) {
            seen = seen.slice();
            seen.push(from);
        }
        if (noIndent) {
            var newOpts = {
                depth: opts.depth
            };
            if (has(opts, 'quoteStyle')) {
                newOpts.quoteStyle = opts.quoteStyle;
            }
            return inspect_(value, newOpts, depth + 1, seen);
        }
        return inspect_(value, opts, depth + 1, seen);
    }

    if (typeof obj === 'function') {
        var name = nameOf(obj);
        var keys = arrObjKeys(obj, inspect);
        return '[Function' + (name ? ': ' + name : ' (anonymous)') + ']' + (keys.length > 0 ? ' { ' + keys.join(', ') + ' }' : '');
    }
    if (isSymbol(obj)) {
        var symString = hasShammedSymbols ? String(obj).replace(/^(Symbol\(.*\))_[^)]*$/, '$1') : symToString.call(obj);
        return typeof obj === 'object' && !hasShammedSymbols ? markBoxed(symString) : symString;
    }
    if (isElement(obj)) {
        var s = '<' + String(obj.nodeName).toLowerCase();
        var attrs = obj.attributes || [];
        for (var i = 0; i < attrs.length; i++) {
            s += ' ' + attrs[i].name + '=' + wrapQuotes(quote(attrs[i].value), 'double', opts);
        }
        s += '>';
        if (obj.childNodes && obj.childNodes.length) { s += '...'; }
        s += '</' + String(obj.nodeName).toLowerCase() + '>';
        return s;
    }
    if (isArray(obj)) {
        if (obj.length === 0) { return '[]'; }
        var xs = arrObjKeys(obj, inspect);
        if (indent && !singleLineValues(xs)) {
            return '[' + indentedJoin(xs, indent) + ']';
        }
        return '[ ' + xs.join(', ') + ' ]';
    }
    if (isError(obj)) {
        var parts = arrObjKeys(obj, inspect);
        if (parts.length === 0) { return '[' + String(obj) + ']'; }
        return '{ [' + String(obj) + '] ' + parts.join(', ') + ' }';
    }
    if (typeof obj === 'object' && customInspect) {
        if (inspectSymbol && typeof obj[inspectSymbol] === 'function') {
            return obj[inspectSymbol]();
        } else if (customInspect !== 'symbol' && typeof obj.inspect === 'function') {
            return obj.inspect();
        }
    }
    if (isMap(obj)) {
        var mapParts = [];
        mapForEach.call(obj, function (value, key) {
            mapParts.push(inspect(key, obj, true) + ' => ' + inspect(value, obj));
        });
        return collectionOf('Map', mapSize.call(obj), mapParts, indent);
    }
    if (isSet(obj)) {
        var setParts = [];
        setForEach.call(obj, function (value) {
            setParts.push(inspect(value, obj));
        });
        return collectionOf('Set', setSize.call(obj), setParts, indent);
    }
    if (isWeakMap(obj)) {
        return weakCollectionOf('WeakMap');
    }
    if (isWeakSet(obj)) {
        return weakCollectionOf('WeakSet');
    }
    if (isWeakRef(obj)) {
        return weakCollectionOf('WeakRef');
    }
    if (isNumber(obj)) {
        return markBoxed(inspect(Number(obj)));
    }
    if (isBigInt(obj)) {
        return markBoxed(inspect(bigIntValueOf.call(obj)));
    }
    if (isBoolean(obj)) {
        return markBoxed(booleanValueOf.call(obj));
    }
    if (isString(obj)) {
        return markBoxed(inspect(String(obj)));
    }
    if (!isDate(obj) && !isRegExp(obj)) {
        var ys = arrObjKeys(obj, inspect);
        var isPlainObject = gPO ? gPO(obj) === Object.prototype : obj instanceof Object || obj.constructor === Object;
        var protoTag = obj instanceof Object ? '' : 'null prototype';
        var stringTag = !isPlainObject && toStringTag && Object(obj) === obj && toStringTag in obj ? toStr(obj).slice(8, -1) : protoTag ? 'Object' : '';
        var constructorTag = isPlainObject || typeof obj.constructor !== 'function' ? '' : obj.constructor.name ? obj.constructor.name + ' ' : '';
        var tag = constructorTag + (stringTag || protoTag ? '[' + [].concat(stringTag || [], protoTag || []).join(': ') + '] ' : '');
        if (ys.length === 0) { return tag + '{}'; }
        if (indent) {
            return tag + '{' + indentedJoin(ys, indent) + '}';
        }
        return tag + '{ ' + ys.join(', ') + ' }';
    }
    return String(obj);
};

function wrapQuotes(s, defaultStyle, opts) {
    var quoteChar = (opts.quoteStyle || defaultStyle) === 'double' ? '"' : "'";
    return quoteChar + s + quoteChar;
}

function quote(s) {
    return String(s).replace(/"/g, '&quot;');
}

function isArray(obj) { return toStr(obj) === '[object Array]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
function isDate(obj) { return toStr(obj) === '[object Date]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
function isRegExp(obj) { return toStr(obj) === '[object RegExp]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
function isError(obj) { return toStr(obj) === '[object Error]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
function isString(obj) { return toStr(obj) === '[object String]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
function isNumber(obj) { return toStr(obj) === '[object Number]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
function isBoolean(obj) { return toStr(obj) === '[object Boolean]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }

// Symbol and BigInt do have Symbol.toStringTag by spec, so that can't be used to eliminate false positives
function isSymbol(obj) {
    if (hasShammedSymbols) {
        return obj && typeof obj === 'object' && obj instanceof Symbol;
    }
    if (typeof obj === 'symbol') {
        return true;
    }
    if (!obj || typeof obj !== 'object' || !symToString) {
        return false;
    }
    try {
        symToString.call(obj);
        return true;
    } catch (e) {}
    return false;
}

function isBigInt(obj) {
    if (!obj || typeof obj !== 'object' || !bigIntValueOf) {
        return false;
    }
    try {
        bigIntValueOf.call(obj);
        return true;
    } catch (e) {}
    return false;
}

var hasOwn = Object.prototype.hasOwnProperty || function (key) { return key in this; };
function has(obj, key) {
    return hasOwn.call(obj, key);
}

function toStr(obj) {
    return objectToString.call(obj);
}

function nameOf(f) {
    if (f.name) { return f.name; }
    var m = match.call(functionToString.call(f), /^function\s*([\w$]+)/);
    if (m) { return m[1]; }
    return null;
}

function indexOf(xs, x) {
    if (xs.indexOf) { return xs.indexOf(x); }
    for (var i = 0, l = xs.length; i < l; i++) {
        if (xs[i] === x) { return i; }
    }
    return -1;
}

function isMap(x) {
    if (!mapSize || !x || typeof x !== 'object') {
        return false;
    }
    try {
        mapSize.call(x);
        try {
            setSize.call(x);
        } catch (s) {
            return true;
        }
        return x instanceof Map; // core-js workaround, pre-v2.5.0
    } catch (e) {}
    return false;
}

function isWeakMap(x) {
    if (!weakMapHas || !x || typeof x !== 'object') {
        return false;
    }
    try {
        weakMapHas.call(x, weakMapHas);
        try {
            weakSetHas.call(x, weakSetHas);
        } catch (s) {
            return true;
        }
        return x instanceof WeakMap; // core-js workaround, pre-v2.5.0
    } catch (e) {}
    return false;
}

function isWeakRef(x) {
    if (!weakRefDeref || !x || typeof x !== 'object') {
        return false;
    }
    try {
        weakRefDeref.call(x);
        return true;
    } catch (e) {}
    return false;
}

function isSet(x) {
    if (!setSize || !x || typeof x !== 'object') {
        return false;
    }
    try {
        setSize.call(x);
        try {
            mapSize.call(x);
        } catch (m) {
            return true;
        }
        return x instanceof Set; // core-js workaround, pre-v2.5.0
    } catch (e) {}
    return false;
}

function isWeakSet(x) {
    if (!weakSetHas || !x || typeof x !== 'object') {
        return false;
    }
    try {
        weakSetHas.call(x, weakSetHas);
        try {
            weakMapHas.call(x, weakMapHas);
        } catch (s) {
            return true;
        }
        return x instanceof WeakSet; // core-js workaround, pre-v2.5.0
    } catch (e) {}
    return false;
}

function isElement(x) {
    if (!x || typeof x !== 'object') { return false; }
    if (typeof HTMLElement !== 'undefined' && x instanceof HTMLElement) {
        return true;
    }
    return typeof x.nodeName === 'string' && typeof x.getAttribute === 'function';
}

function inspectString(str, opts) {
    if (str.length > opts.maxStringLength) {
        var remaining = str.length - opts.maxStringLength;
        var trailer = '... ' + remaining + ' more character' + (remaining > 1 ? 's' : '');
        return inspectString(str.slice(0, opts.maxStringLength), opts) + trailer;
    }
    // eslint-disable-next-line no-control-regex
    var s = str.replace(/(['\\])/g, '\\$1').replace(/[\x00-\x1f]/g, lowbyte);
    return wrapQuotes(s, 'single', opts);
}

function lowbyte(c) {
    var n = c.charCodeAt(0);
    var x = {
        8: 'b',
        9: 't',
        10: 'n',
        12: 'f',
        13: 'r'
    }[n];
    if (x) { return '\\' + x; }
    return '\\x' + (n < 0x10 ? '0' : '') + n.toString(16).toUpperCase();
}

function markBoxed(str) {
    return 'Object(' + str + ')';
}

function weakCollectionOf(type) {
    return type + ' { ? }';
}

function collectionOf(type, size, entries, indent) {
    var joinedEntries = indent ? indentedJoin(entries, indent) : entries.join(', ');
    return type + ' (' + size + ') {' + joinedEntries + '}';
}

function singleLineValues(xs) {
    for (var i = 0; i < xs.length; i++) {
        if (indexOf(xs[i], '\n') >= 0) {
            return false;
        }
    }
    return true;
}

function getIndent(opts, depth) {
    var baseIndent;
    if (opts.indent === '\t') {
        baseIndent = '\t';
    } else if (typeof opts.indent === 'number' && opts.indent > 0) {
        baseIndent = Array(opts.indent + 1).join(' ');
    } else {
        return null;
    }
    return {
        base: baseIndent,
        prev: Array(depth + 1).join(baseIndent)
    };
}

function indentedJoin(xs, indent) {
    if (xs.length === 0) { return ''; }
    var lineJoiner = '\n' + indent.prev + indent.base;
    return lineJoiner + xs.join(',' + lineJoiner) + '\n' + indent.prev;
}

function arrObjKeys(obj, inspect) {
    var isArr = isArray(obj);
    var xs = [];
    if (isArr) {
        xs.length = obj.length;
        for (var i = 0; i < obj.length; i++) {
            xs[i] = has(obj, i) ? inspect(obj[i], obj) : '';
        }
    }
    var syms = typeof gOPS === 'function' ? gOPS(obj) : [];
    var symMap;
    if (hasShammedSymbols) {
        symMap = {};
        for (var k = 0; k < syms.length; k++) {
            symMap['$' + syms[k]] = syms[k];
        }
    }

    for (var key in obj) { // eslint-disable-line no-restricted-syntax
        if (!has(obj, key)) { continue; } // eslint-disable-line no-restricted-syntax, no-continue
        if (isArr && String(Number(key)) === key && key < obj.length) { continue; } // eslint-disable-line no-restricted-syntax, no-continue
        if (hasShammedSymbols && symMap['$' + key] instanceof Symbol) {
            // this is to prevent shammed Symbols, which are stored as strings, from being included in the string key section
            continue; // eslint-disable-line no-restricted-syntax, no-continue
        } else if ((/[^\w$]/).test(key)) {
            xs.push(inspect(key, obj) + ': ' + inspect(obj[key], obj));
        } else {
            xs.push(key + ': ' + inspect(obj[key], obj));
        }
    }
    if (typeof gOPS === 'function') {
        for (var j = 0; j < syms.length; j++) {
            if (isEnumerable.call(obj, syms[j])) {
                xs.push('[' + inspect(syms[j]) + ']: ' + inspect(obj[syms[j]], obj));
            }
        }
    }
    return xs;
}


/***/ }),

/***/ 459:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = __webpack_require__(704);

function emptyFunction() {}
function emptyFunctionWithReset() {}
emptyFunctionWithReset.resetWarningCache = emptyFunction;

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    var err = new Error(
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
    err.name = 'Invariant Violation';
    throw err;
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,

    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };

  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),

/***/ 216:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (false) { var throwOnDirectAccess, ReactIs; } else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(459)();
}


/***/ }),

/***/ 704:
/***/ ((module) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),

/***/ 975:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;
/** @license React v17.0.2
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/*
 Modernizr 3.0.0pre (Custom Build) | MIT
*/
var aa=__webpack_require__(735),m=__webpack_require__(516),r=__webpack_require__(146);function y(a){for(var b="https://reactjs.org/docs/error-decoder.html?invariant="+a,c=1;c<arguments.length;c++)b+="&args[]="+encodeURIComponent(arguments[c]);return"Minified React error #"+a+"; visit "+b+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}if(!aa)throw Error(y(227));var ba=new Set,ca={};function da(a,b){ea(a,b);ea(a+"Capture",b)}
function ea(a,b){ca[a]=b;for(a=0;a<b.length;a++)ba.add(b[a])}
var fa=!("undefined"===typeof window||"undefined"===typeof window.document||"undefined"===typeof window.document.createElement),ha=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,ia=Object.prototype.hasOwnProperty,
ja={},ka={};function la(a){if(ia.call(ka,a))return!0;if(ia.call(ja,a))return!1;if(ha.test(a))return ka[a]=!0;ja[a]=!0;return!1}function ma(a,b,c,d){if(null!==c&&0===c.type)return!1;switch(typeof b){case "function":case "symbol":return!0;case "boolean":if(d)return!1;if(null!==c)return!c.acceptsBooleans;a=a.toLowerCase().slice(0,5);return"data-"!==a&&"aria-"!==a;default:return!1}}
function na(a,b,c,d){if(null===b||"undefined"===typeof b||ma(a,b,c,d))return!0;if(d)return!1;if(null!==c)switch(c.type){case 3:return!b;case 4:return!1===b;case 5:return isNaN(b);case 6:return isNaN(b)||1>b}return!1}function B(a,b,c,d,e,f,g){this.acceptsBooleans=2===b||3===b||4===b;this.attributeName=d;this.attributeNamespace=e;this.mustUseProperty=c;this.propertyName=a;this.type=b;this.sanitizeURL=f;this.removeEmptyString=g}var D={};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a){D[a]=new B(a,0,!1,a,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(a){var b=a[0];D[b]=new B(b,1,!1,a[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(a){D[a]=new B(a,2,!1,a.toLowerCase(),null,!1,!1)});
["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(a){D[a]=new B(a,2,!1,a,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a){D[a]=new B(a,3,!1,a.toLowerCase(),null,!1,!1)});
["checked","multiple","muted","selected"].forEach(function(a){D[a]=new B(a,3,!0,a,null,!1,!1)});["capture","download"].forEach(function(a){D[a]=new B(a,4,!1,a,null,!1,!1)});["cols","rows","size","span"].forEach(function(a){D[a]=new B(a,6,!1,a,null,!1,!1)});["rowSpan","start"].forEach(function(a){D[a]=new B(a,5,!1,a.toLowerCase(),null,!1,!1)});var oa=/[\-:]([a-z])/g;function pa(a){return a[1].toUpperCase()}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a){var b=a.replace(oa,
pa);D[b]=new B(b,1,!1,a,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a){var b=a.replace(oa,pa);D[b]=new B(b,1,!1,a,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(a){var b=a.replace(oa,pa);D[b]=new B(b,1,!1,a,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(a){D[a]=new B(a,1,!1,a.toLowerCase(),null,!1,!1)});
D.xlinkHref=new B("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(a){D[a]=new B(a,1,!1,a.toLowerCase(),null,!0,!0)});
function qa(a,b,c,d){var e=D.hasOwnProperty(b)?D[b]:null;var f=null!==e?0===e.type:d?!1:!(2<b.length)||"o"!==b[0]&&"O"!==b[0]||"n"!==b[1]&&"N"!==b[1]?!1:!0;f||(na(b,c,e,d)&&(c=null),d||null===e?la(b)&&(null===c?a.removeAttribute(b):a.setAttribute(b,""+c)):e.mustUseProperty?a[e.propertyName]=null===c?3===e.type?!1:"":c:(b=e.attributeName,d=e.attributeNamespace,null===c?a.removeAttribute(b):(e=e.type,c=3===e||4===e&&!0===c?"":""+c,d?a.setAttributeNS(d,b,c):a.setAttribute(b,c))))}
var ra=aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,sa=60103,ta=60106,ua=60107,wa=60108,xa=60114,ya=60109,za=60110,Aa=60112,Ba=60113,Ca=60120,Da=60115,Ea=60116,Fa=60121,Ga=60128,Ha=60129,Ia=60130,Ja=60131;
if("function"===typeof Symbol&&Symbol.for){var E=Symbol.for;sa=E("react.element");ta=E("react.portal");ua=E("react.fragment");wa=E("react.strict_mode");xa=E("react.profiler");ya=E("react.provider");za=E("react.context");Aa=E("react.forward_ref");Ba=E("react.suspense");Ca=E("react.suspense_list");Da=E("react.memo");Ea=E("react.lazy");Fa=E("react.block");E("react.scope");Ga=E("react.opaque.id");Ha=E("react.debug_trace_mode");Ia=E("react.offscreen");Ja=E("react.legacy_hidden")}
var Ka="function"===typeof Symbol&&Symbol.iterator;function La(a){if(null===a||"object"!==typeof a)return null;a=Ka&&a[Ka]||a["@@iterator"];return"function"===typeof a?a:null}var Ma;function Na(a){if(void 0===Ma)try{throw Error();}catch(c){var b=c.stack.trim().match(/\n( *(at )?)/);Ma=b&&b[1]||""}return"\n"+Ma+a}var Oa=!1;
function Pa(a,b){if(!a||Oa)return"";Oa=!0;var c=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(b)if(b=function(){throw Error();},Object.defineProperty(b.prototype,"props",{set:function(){throw Error();}}),"object"===typeof Reflect&&Reflect.construct){try{Reflect.construct(b,[])}catch(k){var d=k}Reflect.construct(a,[],b)}else{try{b.call()}catch(k){d=k}a.call(b.prototype)}else{try{throw Error();}catch(k){d=k}a()}}catch(k){if(k&&d&&"string"===typeof k.stack){for(var e=k.stack.split("\n"),
f=d.stack.split("\n"),g=e.length-1,h=f.length-1;1<=g&&0<=h&&e[g]!==f[h];)h--;for(;1<=g&&0<=h;g--,h--)if(e[g]!==f[h]){if(1!==g||1!==h){do if(g--,h--,0>h||e[g]!==f[h])return"\n"+e[g].replace(" at new "," at ");while(1<=g&&0<=h)}break}}}finally{Oa=!1,Error.prepareStackTrace=c}return(a=a?a.displayName||a.name:"")?Na(a):""}
function Qa(a){switch(a.tag){case 5:return Na(a.type);case 16:return Na("Lazy");case 13:return Na("Suspense");case 19:return Na("SuspenseList");case 0:case 2:case 15:return a=Pa(a.type,!1),a;case 11:return a=Pa(a.type.render,!1),a;case 22:return a=Pa(a.type._render,!1),a;case 1:return a=Pa(a.type,!0),a;default:return""}}
function Ra(a){if(null==a)return null;if("function"===typeof a)return a.displayName||a.name||null;if("string"===typeof a)return a;switch(a){case ua:return"Fragment";case ta:return"Portal";case xa:return"Profiler";case wa:return"StrictMode";case Ba:return"Suspense";case Ca:return"SuspenseList"}if("object"===typeof a)switch(a.$$typeof){case za:return(a.displayName||"Context")+".Consumer";case ya:return(a._context.displayName||"Context")+".Provider";case Aa:var b=a.render;b=b.displayName||b.name||"";
return a.displayName||(""!==b?"ForwardRef("+b+")":"ForwardRef");case Da:return Ra(a.type);case Fa:return Ra(a._render);case Ea:b=a._payload;a=a._init;try{return Ra(a(b))}catch(c){}}return null}function Sa(a){switch(typeof a){case "boolean":case "number":case "object":case "string":case "undefined":return a;default:return""}}function Ta(a){var b=a.type;return(a=a.nodeName)&&"input"===a.toLowerCase()&&("checkbox"===b||"radio"===b)}
function Ua(a){var b=Ta(a)?"checked":"value",c=Object.getOwnPropertyDescriptor(a.constructor.prototype,b),d=""+a[b];if(!a.hasOwnProperty(b)&&"undefined"!==typeof c&&"function"===typeof c.get&&"function"===typeof c.set){var e=c.get,f=c.set;Object.defineProperty(a,b,{configurable:!0,get:function(){return e.call(this)},set:function(a){d=""+a;f.call(this,a)}});Object.defineProperty(a,b,{enumerable:c.enumerable});return{getValue:function(){return d},setValue:function(a){d=""+a},stopTracking:function(){a._valueTracker=
null;delete a[b]}}}}function Va(a){a._valueTracker||(a._valueTracker=Ua(a))}function Wa(a){if(!a)return!1;var b=a._valueTracker;if(!b)return!0;var c=b.getValue();var d="";a&&(d=Ta(a)?a.checked?"true":"false":a.value);a=d;return a!==c?(b.setValue(a),!0):!1}function Xa(a){a=a||("undefined"!==typeof document?document:void 0);if("undefined"===typeof a)return null;try{return a.activeElement||a.body}catch(b){return a.body}}
function Ya(a,b){var c=b.checked;return m({},b,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:null!=c?c:a._wrapperState.initialChecked})}function Za(a,b){var c=null==b.defaultValue?"":b.defaultValue,d=null!=b.checked?b.checked:b.defaultChecked;c=Sa(null!=b.value?b.value:c);a._wrapperState={initialChecked:d,initialValue:c,controlled:"checkbox"===b.type||"radio"===b.type?null!=b.checked:null!=b.value}}function $a(a,b){b=b.checked;null!=b&&qa(a,"checked",b,!1)}
function ab(a,b){$a(a,b);var c=Sa(b.value),d=b.type;if(null!=c)if("number"===d){if(0===c&&""===a.value||a.value!=c)a.value=""+c}else a.value!==""+c&&(a.value=""+c);else if("submit"===d||"reset"===d){a.removeAttribute("value");return}b.hasOwnProperty("value")?bb(a,b.type,c):b.hasOwnProperty("defaultValue")&&bb(a,b.type,Sa(b.defaultValue));null==b.checked&&null!=b.defaultChecked&&(a.defaultChecked=!!b.defaultChecked)}
function cb(a,b,c){if(b.hasOwnProperty("value")||b.hasOwnProperty("defaultValue")){var d=b.type;if(!("submit"!==d&&"reset"!==d||void 0!==b.value&&null!==b.value))return;b=""+a._wrapperState.initialValue;c||b===a.value||(a.value=b);a.defaultValue=b}c=a.name;""!==c&&(a.name="");a.defaultChecked=!!a._wrapperState.initialChecked;""!==c&&(a.name=c)}
function bb(a,b,c){if("number"!==b||Xa(a.ownerDocument)!==a)null==c?a.defaultValue=""+a._wrapperState.initialValue:a.defaultValue!==""+c&&(a.defaultValue=""+c)}function db(a){var b="";aa.Children.forEach(a,function(a){null!=a&&(b+=a)});return b}function eb(a,b){a=m({children:void 0},b);if(b=db(b.children))a.children=b;return a}
function fb(a,b,c,d){a=a.options;if(b){b={};for(var e=0;e<c.length;e++)b["$"+c[e]]=!0;for(c=0;c<a.length;c++)e=b.hasOwnProperty("$"+a[c].value),a[c].selected!==e&&(a[c].selected=e),e&&d&&(a[c].defaultSelected=!0)}else{c=""+Sa(c);b=null;for(e=0;e<a.length;e++){if(a[e].value===c){a[e].selected=!0;d&&(a[e].defaultSelected=!0);return}null!==b||a[e].disabled||(b=a[e])}null!==b&&(b.selected=!0)}}
function gb(a,b){if(null!=b.dangerouslySetInnerHTML)throw Error(y(91));return m({},b,{value:void 0,defaultValue:void 0,children:""+a._wrapperState.initialValue})}function hb(a,b){var c=b.value;if(null==c){c=b.children;b=b.defaultValue;if(null!=c){if(null!=b)throw Error(y(92));if(Array.isArray(c)){if(!(1>=c.length))throw Error(y(93));c=c[0]}b=c}null==b&&(b="");c=b}a._wrapperState={initialValue:Sa(c)}}
function ib(a,b){var c=Sa(b.value),d=Sa(b.defaultValue);null!=c&&(c=""+c,c!==a.value&&(a.value=c),null==b.defaultValue&&a.defaultValue!==c&&(a.defaultValue=c));null!=d&&(a.defaultValue=""+d)}function jb(a){var b=a.textContent;b===a._wrapperState.initialValue&&""!==b&&null!==b&&(a.value=b)}var kb={html:"http://www.w3.org/1999/xhtml",mathml:"http://www.w3.org/1998/Math/MathML",svg:"http://www.w3.org/2000/svg"};
function lb(a){switch(a){case "svg":return"http://www.w3.org/2000/svg";case "math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function mb(a,b){return null==a||"http://www.w3.org/1999/xhtml"===a?lb(b):"http://www.w3.org/2000/svg"===a&&"foreignObject"===b?"http://www.w3.org/1999/xhtml":a}
var nb,ob=function(a){return"undefined"!==typeof MSApp&&MSApp.execUnsafeLocalFunction?function(b,c,d,e){MSApp.execUnsafeLocalFunction(function(){return a(b,c,d,e)})}:a}(function(a,b){if(a.namespaceURI!==kb.svg||"innerHTML"in a)a.innerHTML=b;else{nb=nb||document.createElement("div");nb.innerHTML="<svg>"+b.valueOf().toString()+"</svg>";for(b=nb.firstChild;a.firstChild;)a.removeChild(a.firstChild);for(;b.firstChild;)a.appendChild(b.firstChild)}});
function pb(a,b){if(b){var c=a.firstChild;if(c&&c===a.lastChild&&3===c.nodeType){c.nodeValue=b;return}}a.textContent=b}
var qb={animationIterationCount:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,
floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},rb=["Webkit","ms","Moz","O"];Object.keys(qb).forEach(function(a){rb.forEach(function(b){b=b+a.charAt(0).toUpperCase()+a.substring(1);qb[b]=qb[a]})});function sb(a,b,c){return null==b||"boolean"===typeof b||""===b?"":c||"number"!==typeof b||0===b||qb.hasOwnProperty(a)&&qb[a]?(""+b).trim():b+"px"}
function tb(a,b){a=a.style;for(var c in b)if(b.hasOwnProperty(c)){var d=0===c.indexOf("--"),e=sb(c,b[c],d);"float"===c&&(c="cssFloat");d?a.setProperty(c,e):a[c]=e}}var ub=m({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});
function vb(a,b){if(b){if(ub[a]&&(null!=b.children||null!=b.dangerouslySetInnerHTML))throw Error(y(137,a));if(null!=b.dangerouslySetInnerHTML){if(null!=b.children)throw Error(y(60));if(!("object"===typeof b.dangerouslySetInnerHTML&&"__html"in b.dangerouslySetInnerHTML))throw Error(y(61));}if(null!=b.style&&"object"!==typeof b.style)throw Error(y(62));}}
function wb(a,b){if(-1===a.indexOf("-"))return"string"===typeof b.is;switch(a){case "annotation-xml":case "color-profile":case "font-face":case "font-face-src":case "font-face-uri":case "font-face-format":case "font-face-name":case "missing-glyph":return!1;default:return!0}}function xb(a){a=a.target||a.srcElement||window;a.correspondingUseElement&&(a=a.correspondingUseElement);return 3===a.nodeType?a.parentNode:a}var yb=null,zb=null,Ab=null;
function Bb(a){if(a=Cb(a)){if("function"!==typeof yb)throw Error(y(280));var b=a.stateNode;b&&(b=Db(b),yb(a.stateNode,a.type,b))}}function Eb(a){zb?Ab?Ab.push(a):Ab=[a]:zb=a}function Fb(){if(zb){var a=zb,b=Ab;Ab=zb=null;Bb(a);if(b)for(a=0;a<b.length;a++)Bb(b[a])}}function Gb(a,b){return a(b)}function Hb(a,b,c,d,e){return a(b,c,d,e)}function Ib(){}var Jb=Gb,Kb=!1,Lb=!1;function Mb(){if(null!==zb||null!==Ab)Ib(),Fb()}
function Nb(a,b,c){if(Lb)return a(b,c);Lb=!0;try{return Jb(a,b,c)}finally{Lb=!1,Mb()}}
function Ob(a,b){var c=a.stateNode;if(null===c)return null;var d=Db(c);if(null===d)return null;c=d[b];a:switch(b){case "onClick":case "onClickCapture":case "onDoubleClick":case "onDoubleClickCapture":case "onMouseDown":case "onMouseDownCapture":case "onMouseMove":case "onMouseMoveCapture":case "onMouseUp":case "onMouseUpCapture":case "onMouseEnter":(d=!d.disabled)||(a=a.type,d=!("button"===a||"input"===a||"select"===a||"textarea"===a));a=!d;break a;default:a=!1}if(a)return null;if(c&&"function"!==
typeof c)throw Error(y(231,b,typeof c));return c}var Pb=!1;if(fa)try{var Qb={};Object.defineProperty(Qb,"passive",{get:function(){Pb=!0}});window.addEventListener("test",Qb,Qb);window.removeEventListener("test",Qb,Qb)}catch(a){Pb=!1}function Rb(a,b,c,d,e,f,g,h,k){var l=Array.prototype.slice.call(arguments,3);try{b.apply(c,l)}catch(n){this.onError(n)}}var Sb=!1,Tb=null,Ub=!1,Vb=null,Wb={onError:function(a){Sb=!0;Tb=a}};function Xb(a,b,c,d,e,f,g,h,k){Sb=!1;Tb=null;Rb.apply(Wb,arguments)}
function Yb(a,b,c,d,e,f,g,h,k){Xb.apply(this,arguments);if(Sb){if(Sb){var l=Tb;Sb=!1;Tb=null}else throw Error(y(198));Ub||(Ub=!0,Vb=l)}}function Zb(a){var b=a,c=a;if(a.alternate)for(;b.return;)b=b.return;else{a=b;do b=a,0!==(b.flags&1026)&&(c=b.return),a=b.return;while(a)}return 3===b.tag?c:null}function $b(a){if(13===a.tag){var b=a.memoizedState;null===b&&(a=a.alternate,null!==a&&(b=a.memoizedState));if(null!==b)return b.dehydrated}return null}function ac(a){if(Zb(a)!==a)throw Error(y(188));}
function bc(a){var b=a.alternate;if(!b){b=Zb(a);if(null===b)throw Error(y(188));return b!==a?null:a}for(var c=a,d=b;;){var e=c.return;if(null===e)break;var f=e.alternate;if(null===f){d=e.return;if(null!==d){c=d;continue}break}if(e.child===f.child){for(f=e.child;f;){if(f===c)return ac(e),a;if(f===d)return ac(e),b;f=f.sibling}throw Error(y(188));}if(c.return!==d.return)c=e,d=f;else{for(var g=!1,h=e.child;h;){if(h===c){g=!0;c=e;d=f;break}if(h===d){g=!0;d=e;c=f;break}h=h.sibling}if(!g){for(h=f.child;h;){if(h===
c){g=!0;c=f;d=e;break}if(h===d){g=!0;d=f;c=e;break}h=h.sibling}if(!g)throw Error(y(189));}}if(c.alternate!==d)throw Error(y(190));}if(3!==c.tag)throw Error(y(188));return c.stateNode.current===c?a:b}function cc(a){a=bc(a);if(!a)return null;for(var b=a;;){if(5===b.tag||6===b.tag)return b;if(b.child)b.child.return=b,b=b.child;else{if(b===a)break;for(;!b.sibling;){if(!b.return||b.return===a)return null;b=b.return}b.sibling.return=b.return;b=b.sibling}}return null}
function dc(a,b){for(var c=a.alternate;null!==b;){if(b===a||b===c)return!0;b=b.return}return!1}var ec,fc,gc,hc,ic=!1,jc=[],kc=null,lc=null,mc=null,nc=new Map,oc=new Map,pc=[],qc="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function rc(a,b,c,d,e){return{blockedOn:a,domEventName:b,eventSystemFlags:c|16,nativeEvent:e,targetContainers:[d]}}function sc(a,b){switch(a){case "focusin":case "focusout":kc=null;break;case "dragenter":case "dragleave":lc=null;break;case "mouseover":case "mouseout":mc=null;break;case "pointerover":case "pointerout":nc.delete(b.pointerId);break;case "gotpointercapture":case "lostpointercapture":oc.delete(b.pointerId)}}
function tc(a,b,c,d,e,f){if(null===a||a.nativeEvent!==f)return a=rc(b,c,d,e,f),null!==b&&(b=Cb(b),null!==b&&fc(b)),a;a.eventSystemFlags|=d;b=a.targetContainers;null!==e&&-1===b.indexOf(e)&&b.push(e);return a}
function uc(a,b,c,d,e){switch(b){case "focusin":return kc=tc(kc,a,b,c,d,e),!0;case "dragenter":return lc=tc(lc,a,b,c,d,e),!0;case "mouseover":return mc=tc(mc,a,b,c,d,e),!0;case "pointerover":var f=e.pointerId;nc.set(f,tc(nc.get(f)||null,a,b,c,d,e));return!0;case "gotpointercapture":return f=e.pointerId,oc.set(f,tc(oc.get(f)||null,a,b,c,d,e)),!0}return!1}
function vc(a){var b=wc(a.target);if(null!==b){var c=Zb(b);if(null!==c)if(b=c.tag,13===b){if(b=$b(c),null!==b){a.blockedOn=b;hc(a.lanePriority,function(){r.unstable_runWithPriority(a.priority,function(){gc(c)})});return}}else if(3===b&&c.stateNode.hydrate){a.blockedOn=3===c.tag?c.stateNode.containerInfo:null;return}}a.blockedOn=null}
function xc(a){if(null!==a.blockedOn)return!1;for(var b=a.targetContainers;0<b.length;){var c=yc(a.domEventName,a.eventSystemFlags,b[0],a.nativeEvent);if(null!==c)return b=Cb(c),null!==b&&fc(b),a.blockedOn=c,!1;b.shift()}return!0}function zc(a,b,c){xc(a)&&c.delete(b)}
function Ac(){for(ic=!1;0<jc.length;){var a=jc[0];if(null!==a.blockedOn){a=Cb(a.blockedOn);null!==a&&ec(a);break}for(var b=a.targetContainers;0<b.length;){var c=yc(a.domEventName,a.eventSystemFlags,b[0],a.nativeEvent);if(null!==c){a.blockedOn=c;break}b.shift()}null===a.blockedOn&&jc.shift()}null!==kc&&xc(kc)&&(kc=null);null!==lc&&xc(lc)&&(lc=null);null!==mc&&xc(mc)&&(mc=null);nc.forEach(zc);oc.forEach(zc)}
function Bc(a,b){a.blockedOn===b&&(a.blockedOn=null,ic||(ic=!0,r.unstable_scheduleCallback(r.unstable_NormalPriority,Ac)))}
function Cc(a){function b(b){return Bc(b,a)}if(0<jc.length){Bc(jc[0],a);for(var c=1;c<jc.length;c++){var d=jc[c];d.blockedOn===a&&(d.blockedOn=null)}}null!==kc&&Bc(kc,a);null!==lc&&Bc(lc,a);null!==mc&&Bc(mc,a);nc.forEach(b);oc.forEach(b);for(c=0;c<pc.length;c++)d=pc[c],d.blockedOn===a&&(d.blockedOn=null);for(;0<pc.length&&(c=pc[0],null===c.blockedOn);)vc(c),null===c.blockedOn&&pc.shift()}
function Dc(a,b){var c={};c[a.toLowerCase()]=b.toLowerCase();c["Webkit"+a]="webkit"+b;c["Moz"+a]="moz"+b;return c}var Ec={animationend:Dc("Animation","AnimationEnd"),animationiteration:Dc("Animation","AnimationIteration"),animationstart:Dc("Animation","AnimationStart"),transitionend:Dc("Transition","TransitionEnd")},Fc={},Gc={};
fa&&(Gc=document.createElement("div").style,"AnimationEvent"in window||(delete Ec.animationend.animation,delete Ec.animationiteration.animation,delete Ec.animationstart.animation),"TransitionEvent"in window||delete Ec.transitionend.transition);function Hc(a){if(Fc[a])return Fc[a];if(!Ec[a])return a;var b=Ec[a],c;for(c in b)if(b.hasOwnProperty(c)&&c in Gc)return Fc[a]=b[c];return a}
var Ic=Hc("animationend"),Jc=Hc("animationiteration"),Kc=Hc("animationstart"),Lc=Hc("transitionend"),Mc=new Map,Nc=new Map,Oc=["abort","abort",Ic,"animationEnd",Jc,"animationIteration",Kc,"animationStart","canplay","canPlay","canplaythrough","canPlayThrough","durationchange","durationChange","emptied","emptied","encrypted","encrypted","ended","ended","error","error","gotpointercapture","gotPointerCapture","load","load","loadeddata","loadedData","loadedmetadata","loadedMetadata","loadstart","loadStart",
"lostpointercapture","lostPointerCapture","playing","playing","progress","progress","seeking","seeking","stalled","stalled","suspend","suspend","timeupdate","timeUpdate",Lc,"transitionEnd","waiting","waiting"];function Pc(a,b){for(var c=0;c<a.length;c+=2){var d=a[c],e=a[c+1];e="on"+(e[0].toUpperCase()+e.slice(1));Nc.set(d,b);Mc.set(d,e);da(e,[d])}}var Qc=r.unstable_now;Qc();var F=8;
function Rc(a){if(0!==(1&a))return F=15,1;if(0!==(2&a))return F=14,2;if(0!==(4&a))return F=13,4;var b=24&a;if(0!==b)return F=12,b;if(0!==(a&32))return F=11,32;b=192&a;if(0!==b)return F=10,b;if(0!==(a&256))return F=9,256;b=3584&a;if(0!==b)return F=8,b;if(0!==(a&4096))return F=7,4096;b=4186112&a;if(0!==b)return F=6,b;b=62914560&a;if(0!==b)return F=5,b;if(a&67108864)return F=4,67108864;if(0!==(a&134217728))return F=3,134217728;b=805306368&a;if(0!==b)return F=2,b;if(0!==(1073741824&a))return F=1,1073741824;
F=8;return a}function Sc(a){switch(a){case 99:return 15;case 98:return 10;case 97:case 96:return 8;case 95:return 2;default:return 0}}function Tc(a){switch(a){case 15:case 14:return 99;case 13:case 12:case 11:case 10:return 98;case 9:case 8:case 7:case 6:case 4:case 5:return 97;case 3:case 2:case 1:return 95;case 0:return 90;default:throw Error(y(358,a));}}
function Uc(a,b){var c=a.pendingLanes;if(0===c)return F=0;var d=0,e=0,f=a.expiredLanes,g=a.suspendedLanes,h=a.pingedLanes;if(0!==f)d=f,e=F=15;else if(f=c&134217727,0!==f){var k=f&~g;0!==k?(d=Rc(k),e=F):(h&=f,0!==h&&(d=Rc(h),e=F))}else f=c&~g,0!==f?(d=Rc(f),e=F):0!==h&&(d=Rc(h),e=F);if(0===d)return 0;d=31-Vc(d);d=c&((0>d?0:1<<d)<<1)-1;if(0!==b&&b!==d&&0===(b&g)){Rc(b);if(e<=F)return b;F=e}b=a.entangledLanes;if(0!==b)for(a=a.entanglements,b&=d;0<b;)c=31-Vc(b),e=1<<c,d|=a[c],b&=~e;return d}
function Wc(a){a=a.pendingLanes&-1073741825;return 0!==a?a:a&1073741824?1073741824:0}function Xc(a,b){switch(a){case 15:return 1;case 14:return 2;case 12:return a=Yc(24&~b),0===a?Xc(10,b):a;case 10:return a=Yc(192&~b),0===a?Xc(8,b):a;case 8:return a=Yc(3584&~b),0===a&&(a=Yc(4186112&~b),0===a&&(a=512)),a;case 2:return b=Yc(805306368&~b),0===b&&(b=268435456),b}throw Error(y(358,a));}function Yc(a){return a&-a}function Zc(a){for(var b=[],c=0;31>c;c++)b.push(a);return b}
function $c(a,b,c){a.pendingLanes|=b;var d=b-1;a.suspendedLanes&=d;a.pingedLanes&=d;a=a.eventTimes;b=31-Vc(b);a[b]=c}var Vc=Math.clz32?Math.clz32:ad,bd=Math.log,cd=Math.LN2;function ad(a){return 0===a?32:31-(bd(a)/cd|0)|0}var dd=r.unstable_UserBlockingPriority,ed=r.unstable_runWithPriority,fd=!0;function gd(a,b,c,d){Kb||Ib();var e=hd,f=Kb;Kb=!0;try{Hb(e,a,b,c,d)}finally{(Kb=f)||Mb()}}function id(a,b,c,d){ed(dd,hd.bind(null,a,b,c,d))}
function hd(a,b,c,d){if(fd){var e;if((e=0===(b&4))&&0<jc.length&&-1<qc.indexOf(a))a=rc(null,a,b,c,d),jc.push(a);else{var f=yc(a,b,c,d);if(null===f)e&&sc(a,d);else{if(e){if(-1<qc.indexOf(a)){a=rc(f,a,b,c,d);jc.push(a);return}if(uc(f,a,b,c,d))return;sc(a,d)}jd(a,b,d,null,c)}}}}
function yc(a,b,c,d){var e=xb(d);e=wc(e);if(null!==e){var f=Zb(e);if(null===f)e=null;else{var g=f.tag;if(13===g){e=$b(f);if(null!==e)return e;e=null}else if(3===g){if(f.stateNode.hydrate)return 3===f.tag?f.stateNode.containerInfo:null;e=null}else f!==e&&(e=null)}}jd(a,b,d,e,c);return null}var kd=null,ld=null,md=null;
function nd(){if(md)return md;var a,b=ld,c=b.length,d,e="value"in kd?kd.value:kd.textContent,f=e.length;for(a=0;a<c&&b[a]===e[a];a++);var g=c-a;for(d=1;d<=g&&b[c-d]===e[f-d];d++);return md=e.slice(a,1<d?1-d:void 0)}function od(a){var b=a.keyCode;"charCode"in a?(a=a.charCode,0===a&&13===b&&(a=13)):a=b;10===a&&(a=13);return 32<=a||13===a?a:0}function pd(){return!0}function qd(){return!1}
function rd(a){function b(b,d,e,f,g){this._reactName=b;this._targetInst=e;this.type=d;this.nativeEvent=f;this.target=g;this.currentTarget=null;for(var c in a)a.hasOwnProperty(c)&&(b=a[c],this[c]=b?b(f):f[c]);this.isDefaultPrevented=(null!=f.defaultPrevented?f.defaultPrevented:!1===f.returnValue)?pd:qd;this.isPropagationStopped=qd;return this}m(b.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():"unknown"!==typeof a.returnValue&&
(a.returnValue=!1),this.isDefaultPrevented=pd)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():"unknown"!==typeof a.cancelBubble&&(a.cancelBubble=!0),this.isPropagationStopped=pd)},persist:function(){},isPersistent:pd});return b}
var sd={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(a){return a.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},td=rd(sd),ud=m({},sd,{view:0,detail:0}),vd=rd(ud),wd,xd,yd,Ad=m({},ud,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:zd,button:0,buttons:0,relatedTarget:function(a){return void 0===a.relatedTarget?a.fromElement===a.srcElement?a.toElement:a.fromElement:a.relatedTarget},movementX:function(a){if("movementX"in
a)return a.movementX;a!==yd&&(yd&&"mousemove"===a.type?(wd=a.screenX-yd.screenX,xd=a.screenY-yd.screenY):xd=wd=0,yd=a);return wd},movementY:function(a){return"movementY"in a?a.movementY:xd}}),Bd=rd(Ad),Cd=m({},Ad,{dataTransfer:0}),Dd=rd(Cd),Ed=m({},ud,{relatedTarget:0}),Fd=rd(Ed),Gd=m({},sd,{animationName:0,elapsedTime:0,pseudoElement:0}),Hd=rd(Gd),Id=m({},sd,{clipboardData:function(a){return"clipboardData"in a?a.clipboardData:window.clipboardData}}),Jd=rd(Id),Kd=m({},sd,{data:0}),Ld=rd(Kd),Md={Esc:"Escape",
Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Nd={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",
119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Od={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Pd(a){var b=this.nativeEvent;return b.getModifierState?b.getModifierState(a):(a=Od[a])?!!b[a]:!1}function zd(){return Pd}
var Qd=m({},ud,{key:function(a){if(a.key){var b=Md[a.key]||a.key;if("Unidentified"!==b)return b}return"keypress"===a.type?(a=od(a),13===a?"Enter":String.fromCharCode(a)):"keydown"===a.type||"keyup"===a.type?Nd[a.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:zd,charCode:function(a){return"keypress"===a.type?od(a):0},keyCode:function(a){return"keydown"===a.type||"keyup"===a.type?a.keyCode:0},which:function(a){return"keypress"===
a.type?od(a):"keydown"===a.type||"keyup"===a.type?a.keyCode:0}}),Rd=rd(Qd),Sd=m({},Ad,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Td=rd(Sd),Ud=m({},ud,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:zd}),Vd=rd(Ud),Wd=m({},sd,{propertyName:0,elapsedTime:0,pseudoElement:0}),Xd=rd(Wd),Yd=m({},Ad,{deltaX:function(a){return"deltaX"in a?a.deltaX:"wheelDeltaX"in a?-a.wheelDeltaX:0},
deltaY:function(a){return"deltaY"in a?a.deltaY:"wheelDeltaY"in a?-a.wheelDeltaY:"wheelDelta"in a?-a.wheelDelta:0},deltaZ:0,deltaMode:0}),Zd=rd(Yd),$d=[9,13,27,32],ae=fa&&"CompositionEvent"in window,be=null;fa&&"documentMode"in document&&(be=document.documentMode);var ce=fa&&"TextEvent"in window&&!be,de=fa&&(!ae||be&&8<be&&11>=be),ee=String.fromCharCode(32),fe=!1;
function ge(a,b){switch(a){case "keyup":return-1!==$d.indexOf(b.keyCode);case "keydown":return 229!==b.keyCode;case "keypress":case "mousedown":case "focusout":return!0;default:return!1}}function he(a){a=a.detail;return"object"===typeof a&&"data"in a?a.data:null}var ie=!1;function je(a,b){switch(a){case "compositionend":return he(b);case "keypress":if(32!==b.which)return null;fe=!0;return ee;case "textInput":return a=b.data,a===ee&&fe?null:a;default:return null}}
function ke(a,b){if(ie)return"compositionend"===a||!ae&&ge(a,b)?(a=nd(),md=ld=kd=null,ie=!1,a):null;switch(a){case "paste":return null;case "keypress":if(!(b.ctrlKey||b.altKey||b.metaKey)||b.ctrlKey&&b.altKey){if(b.char&&1<b.char.length)return b.char;if(b.which)return String.fromCharCode(b.which)}return null;case "compositionend":return de&&"ko"!==b.locale?null:b.data;default:return null}}
var le={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function me(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return"input"===b?!!le[a.type]:"textarea"===b?!0:!1}function ne(a,b,c,d){Eb(d);b=oe(b,"onChange");0<b.length&&(c=new td("onChange","change",null,c,d),a.push({event:c,listeners:b}))}var pe=null,qe=null;function re(a){se(a,0)}function te(a){var b=ue(a);if(Wa(b))return a}
function ve(a,b){if("change"===a)return b}var we=!1;if(fa){var xe;if(fa){var ye="oninput"in document;if(!ye){var ze=document.createElement("div");ze.setAttribute("oninput","return;");ye="function"===typeof ze.oninput}xe=ye}else xe=!1;we=xe&&(!document.documentMode||9<document.documentMode)}function Ae(){pe&&(pe.detachEvent("onpropertychange",Be),qe=pe=null)}function Be(a){if("value"===a.propertyName&&te(qe)){var b=[];ne(b,qe,a,xb(a));a=re;if(Kb)a(b);else{Kb=!0;try{Gb(a,b)}finally{Kb=!1,Mb()}}}}
function Ce(a,b,c){"focusin"===a?(Ae(),pe=b,qe=c,pe.attachEvent("onpropertychange",Be)):"focusout"===a&&Ae()}function De(a){if("selectionchange"===a||"keyup"===a||"keydown"===a)return te(qe)}function Ee(a,b){if("click"===a)return te(b)}function Fe(a,b){if("input"===a||"change"===a)return te(b)}function Ge(a,b){return a===b&&(0!==a||1/a===1/b)||a!==a&&b!==b}var He="function"===typeof Object.is?Object.is:Ge,Ie=Object.prototype.hasOwnProperty;
function Je(a,b){if(He(a,b))return!0;if("object"!==typeof a||null===a||"object"!==typeof b||null===b)return!1;var c=Object.keys(a),d=Object.keys(b);if(c.length!==d.length)return!1;for(d=0;d<c.length;d++)if(!Ie.call(b,c[d])||!He(a[c[d]],b[c[d]]))return!1;return!0}function Ke(a){for(;a&&a.firstChild;)a=a.firstChild;return a}
function Le(a,b){var c=Ke(a);a=0;for(var d;c;){if(3===c.nodeType){d=a+c.textContent.length;if(a<=b&&d>=b)return{node:c,offset:b-a};a=d}a:{for(;c;){if(c.nextSibling){c=c.nextSibling;break a}c=c.parentNode}c=void 0}c=Ke(c)}}function Me(a,b){return a&&b?a===b?!0:a&&3===a.nodeType?!1:b&&3===b.nodeType?Me(a,b.parentNode):"contains"in a?a.contains(b):a.compareDocumentPosition?!!(a.compareDocumentPosition(b)&16):!1:!1}
function Ne(){for(var a=window,b=Xa();b instanceof a.HTMLIFrameElement;){try{var c="string"===typeof b.contentWindow.location.href}catch(d){c=!1}if(c)a=b.contentWindow;else break;b=Xa(a.document)}return b}function Oe(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return b&&("input"===b&&("text"===a.type||"search"===a.type||"tel"===a.type||"url"===a.type||"password"===a.type)||"textarea"===b||"true"===a.contentEditable)}
var Pe=fa&&"documentMode"in document&&11>=document.documentMode,Qe=null,Re=null,Se=null,Te=!1;
function Ue(a,b,c){var d=c.window===c?c.document:9===c.nodeType?c:c.ownerDocument;Te||null==Qe||Qe!==Xa(d)||(d=Qe,"selectionStart"in d&&Oe(d)?d={start:d.selectionStart,end:d.selectionEnd}:(d=(d.ownerDocument&&d.ownerDocument.defaultView||window).getSelection(),d={anchorNode:d.anchorNode,anchorOffset:d.anchorOffset,focusNode:d.focusNode,focusOffset:d.focusOffset}),Se&&Je(Se,d)||(Se=d,d=oe(Re,"onSelect"),0<d.length&&(b=new td("onSelect","select",null,b,c),a.push({event:b,listeners:d}),b.target=Qe)))}
Pc("cancel cancel click click close close contextmenu contextMenu copy copy cut cut auxclick auxClick dblclick doubleClick dragend dragEnd dragstart dragStart drop drop focusin focus focusout blur input input invalid invalid keydown keyDown keypress keyPress keyup keyUp mousedown mouseDown mouseup mouseUp paste paste pause pause play play pointercancel pointerCancel pointerdown pointerDown pointerup pointerUp ratechange rateChange reset reset seeked seeked submit submit touchcancel touchCancel touchend touchEnd touchstart touchStart volumechange volumeChange".split(" "),
0);Pc("drag drag dragenter dragEnter dragexit dragExit dragleave dragLeave dragover dragOver mousemove mouseMove mouseout mouseOut mouseover mouseOver pointermove pointerMove pointerout pointerOut pointerover pointerOver scroll scroll toggle toggle touchmove touchMove wheel wheel".split(" "),1);Pc(Oc,2);for(var Ve="change selectionchange textInput compositionstart compositionend compositionupdate".split(" "),We=0;We<Ve.length;We++)Nc.set(Ve[We],0);ea("onMouseEnter",["mouseout","mouseover"]);
ea("onMouseLeave",["mouseout","mouseover"]);ea("onPointerEnter",["pointerout","pointerover"]);ea("onPointerLeave",["pointerout","pointerover"]);da("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));da("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));da("onBeforeInput",["compositionend","keypress","textInput","paste"]);da("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));
da("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));da("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Xe="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Ye=new Set("cancel close invalid load scroll toggle".split(" ").concat(Xe));
function Ze(a,b,c){var d=a.type||"unknown-event";a.currentTarget=c;Yb(d,b,void 0,a);a.currentTarget=null}
function se(a,b){b=0!==(b&4);for(var c=0;c<a.length;c++){var d=a[c],e=d.event;d=d.listeners;a:{var f=void 0;if(b)for(var g=d.length-1;0<=g;g--){var h=d[g],k=h.instance,l=h.currentTarget;h=h.listener;if(k!==f&&e.isPropagationStopped())break a;Ze(e,h,l);f=k}else for(g=0;g<d.length;g++){h=d[g];k=h.instance;l=h.currentTarget;h=h.listener;if(k!==f&&e.isPropagationStopped())break a;Ze(e,h,l);f=k}}}if(Ub)throw a=Vb,Ub=!1,Vb=null,a;}
function G(a,b){var c=$e(b),d=a+"__bubble";c.has(d)||(af(b,a,2,!1),c.add(d))}var bf="_reactListening"+Math.random().toString(36).slice(2);function cf(a){a[bf]||(a[bf]=!0,ba.forEach(function(b){Ye.has(b)||df(b,!1,a,null);df(b,!0,a,null)}))}
function df(a,b,c,d){var e=4<arguments.length&&void 0!==arguments[4]?arguments[4]:0,f=c;"selectionchange"===a&&9!==c.nodeType&&(f=c.ownerDocument);if(null!==d&&!b&&Ye.has(a)){if("scroll"!==a)return;e|=2;f=d}var g=$e(f),h=a+"__"+(b?"capture":"bubble");g.has(h)||(b&&(e|=4),af(f,a,e,b),g.add(h))}
function af(a,b,c,d){var e=Nc.get(b);switch(void 0===e?2:e){case 0:e=gd;break;case 1:e=id;break;default:e=hd}c=e.bind(null,b,c,a);e=void 0;!Pb||"touchstart"!==b&&"touchmove"!==b&&"wheel"!==b||(e=!0);d?void 0!==e?a.addEventListener(b,c,{capture:!0,passive:e}):a.addEventListener(b,c,!0):void 0!==e?a.addEventListener(b,c,{passive:e}):a.addEventListener(b,c,!1)}
function jd(a,b,c,d,e){var f=d;if(0===(b&1)&&0===(b&2)&&null!==d)a:for(;;){if(null===d)return;var g=d.tag;if(3===g||4===g){var h=d.stateNode.containerInfo;if(h===e||8===h.nodeType&&h.parentNode===e)break;if(4===g)for(g=d.return;null!==g;){var k=g.tag;if(3===k||4===k)if(k=g.stateNode.containerInfo,k===e||8===k.nodeType&&k.parentNode===e)return;g=g.return}for(;null!==h;){g=wc(h);if(null===g)return;k=g.tag;if(5===k||6===k){d=f=g;continue a}h=h.parentNode}}d=d.return}Nb(function(){var d=f,e=xb(c),g=[];
a:{var h=Mc.get(a);if(void 0!==h){var k=td,x=a;switch(a){case "keypress":if(0===od(c))break a;case "keydown":case "keyup":k=Rd;break;case "focusin":x="focus";k=Fd;break;case "focusout":x="blur";k=Fd;break;case "beforeblur":case "afterblur":k=Fd;break;case "click":if(2===c.button)break a;case "auxclick":case "dblclick":case "mousedown":case "mousemove":case "mouseup":case "mouseout":case "mouseover":case "contextmenu":k=Bd;break;case "drag":case "dragend":case "dragenter":case "dragexit":case "dragleave":case "dragover":case "dragstart":case "drop":k=
Dd;break;case "touchcancel":case "touchend":case "touchmove":case "touchstart":k=Vd;break;case Ic:case Jc:case Kc:k=Hd;break;case Lc:k=Xd;break;case "scroll":k=vd;break;case "wheel":k=Zd;break;case "copy":case "cut":case "paste":k=Jd;break;case "gotpointercapture":case "lostpointercapture":case "pointercancel":case "pointerdown":case "pointermove":case "pointerout":case "pointerover":case "pointerup":k=Td}var w=0!==(b&4),z=!w&&"scroll"===a,u=w?null!==h?h+"Capture":null:h;w=[];for(var t=d,q;null!==
t;){q=t;var v=q.stateNode;5===q.tag&&null!==v&&(q=v,null!==u&&(v=Ob(t,u),null!=v&&w.push(ef(t,v,q))));if(z)break;t=t.return}0<w.length&&(h=new k(h,x,null,c,e),g.push({event:h,listeners:w}))}}if(0===(b&7)){a:{h="mouseover"===a||"pointerover"===a;k="mouseout"===a||"pointerout"===a;if(h&&0===(b&16)&&(x=c.relatedTarget||c.fromElement)&&(wc(x)||x[ff]))break a;if(k||h){h=e.window===e?e:(h=e.ownerDocument)?h.defaultView||h.parentWindow:window;if(k){if(x=c.relatedTarget||c.toElement,k=d,x=x?wc(x):null,null!==
x&&(z=Zb(x),x!==z||5!==x.tag&&6!==x.tag))x=null}else k=null,x=d;if(k!==x){w=Bd;v="onMouseLeave";u="onMouseEnter";t="mouse";if("pointerout"===a||"pointerover"===a)w=Td,v="onPointerLeave",u="onPointerEnter",t="pointer";z=null==k?h:ue(k);q=null==x?h:ue(x);h=new w(v,t+"leave",k,c,e);h.target=z;h.relatedTarget=q;v=null;wc(e)===d&&(w=new w(u,t+"enter",x,c,e),w.target=q,w.relatedTarget=z,v=w);z=v;if(k&&x)b:{w=k;u=x;t=0;for(q=w;q;q=gf(q))t++;q=0;for(v=u;v;v=gf(v))q++;for(;0<t-q;)w=gf(w),t--;for(;0<q-t;)u=
gf(u),q--;for(;t--;){if(w===u||null!==u&&w===u.alternate)break b;w=gf(w);u=gf(u)}w=null}else w=null;null!==k&&hf(g,h,k,w,!1);null!==x&&null!==z&&hf(g,z,x,w,!0)}}}a:{h=d?ue(d):window;k=h.nodeName&&h.nodeName.toLowerCase();if("select"===k||"input"===k&&"file"===h.type)var J=ve;else if(me(h))if(we)J=Fe;else{J=De;var K=Ce}else(k=h.nodeName)&&"input"===k.toLowerCase()&&("checkbox"===h.type||"radio"===h.type)&&(J=Ee);if(J&&(J=J(a,d))){ne(g,J,c,e);break a}K&&K(a,h,d);"focusout"===a&&(K=h._wrapperState)&&
K.controlled&&"number"===h.type&&bb(h,"number",h.value)}K=d?ue(d):window;switch(a){case "focusin":if(me(K)||"true"===K.contentEditable)Qe=K,Re=d,Se=null;break;case "focusout":Se=Re=Qe=null;break;case "mousedown":Te=!0;break;case "contextmenu":case "mouseup":case "dragend":Te=!1;Ue(g,c,e);break;case "selectionchange":if(Pe)break;case "keydown":case "keyup":Ue(g,c,e)}var Q;if(ae)b:{switch(a){case "compositionstart":var L="onCompositionStart";break b;case "compositionend":L="onCompositionEnd";break b;
case "compositionupdate":L="onCompositionUpdate";break b}L=void 0}else ie?ge(a,c)&&(L="onCompositionEnd"):"keydown"===a&&229===c.keyCode&&(L="onCompositionStart");L&&(de&&"ko"!==c.locale&&(ie||"onCompositionStart"!==L?"onCompositionEnd"===L&&ie&&(Q=nd()):(kd=e,ld="value"in kd?kd.value:kd.textContent,ie=!0)),K=oe(d,L),0<K.length&&(L=new Ld(L,a,null,c,e),g.push({event:L,listeners:K}),Q?L.data=Q:(Q=he(c),null!==Q&&(L.data=Q))));if(Q=ce?je(a,c):ke(a,c))d=oe(d,"onBeforeInput"),0<d.length&&(e=new Ld("onBeforeInput",
"beforeinput",null,c,e),g.push({event:e,listeners:d}),e.data=Q)}se(g,b)})}function ef(a,b,c){return{instance:a,listener:b,currentTarget:c}}function oe(a,b){for(var c=b+"Capture",d=[];null!==a;){var e=a,f=e.stateNode;5===e.tag&&null!==f&&(e=f,f=Ob(a,c),null!=f&&d.unshift(ef(a,f,e)),f=Ob(a,b),null!=f&&d.push(ef(a,f,e)));a=a.return}return d}function gf(a){if(null===a)return null;do a=a.return;while(a&&5!==a.tag);return a?a:null}
function hf(a,b,c,d,e){for(var f=b._reactName,g=[];null!==c&&c!==d;){var h=c,k=h.alternate,l=h.stateNode;if(null!==k&&k===d)break;5===h.tag&&null!==l&&(h=l,e?(k=Ob(c,f),null!=k&&g.unshift(ef(c,k,h))):e||(k=Ob(c,f),null!=k&&g.push(ef(c,k,h))));c=c.return}0!==g.length&&a.push({event:b,listeners:g})}function jf(){}var kf=null,lf=null;function mf(a,b){switch(a){case "button":case "input":case "select":case "textarea":return!!b.autoFocus}return!1}
function nf(a,b){return"textarea"===a||"option"===a||"noscript"===a||"string"===typeof b.children||"number"===typeof b.children||"object"===typeof b.dangerouslySetInnerHTML&&null!==b.dangerouslySetInnerHTML&&null!=b.dangerouslySetInnerHTML.__html}var of="function"===typeof setTimeout?setTimeout:void 0,pf="function"===typeof clearTimeout?clearTimeout:void 0;function qf(a){1===a.nodeType?a.textContent="":9===a.nodeType&&(a=a.body,null!=a&&(a.textContent=""))}
function rf(a){for(;null!=a;a=a.nextSibling){var b=a.nodeType;if(1===b||3===b)break}return a}function sf(a){a=a.previousSibling;for(var b=0;a;){if(8===a.nodeType){var c=a.data;if("$"===c||"$!"===c||"$?"===c){if(0===b)return a;b--}else"/$"===c&&b++}a=a.previousSibling}return null}var tf=0;function uf(a){return{$$typeof:Ga,toString:a,valueOf:a}}var vf=Math.random().toString(36).slice(2),wf="__reactFiber$"+vf,xf="__reactProps$"+vf,ff="__reactContainer$"+vf,yf="__reactEvents$"+vf;
function wc(a){var b=a[wf];if(b)return b;for(var c=a.parentNode;c;){if(b=c[ff]||c[wf]){c=b.alternate;if(null!==b.child||null!==c&&null!==c.child)for(a=sf(a);null!==a;){if(c=a[wf])return c;a=sf(a)}return b}a=c;c=a.parentNode}return null}function Cb(a){a=a[wf]||a[ff];return!a||5!==a.tag&&6!==a.tag&&13!==a.tag&&3!==a.tag?null:a}function ue(a){if(5===a.tag||6===a.tag)return a.stateNode;throw Error(y(33));}function Db(a){return a[xf]||null}
function $e(a){var b=a[yf];void 0===b&&(b=a[yf]=new Set);return b}var zf=[],Af=-1;function Bf(a){return{current:a}}function H(a){0>Af||(a.current=zf[Af],zf[Af]=null,Af--)}function I(a,b){Af++;zf[Af]=a.current;a.current=b}var Cf={},M=Bf(Cf),N=Bf(!1),Df=Cf;
function Ef(a,b){var c=a.type.contextTypes;if(!c)return Cf;var d=a.stateNode;if(d&&d.__reactInternalMemoizedUnmaskedChildContext===b)return d.__reactInternalMemoizedMaskedChildContext;var e={},f;for(f in c)e[f]=b[f];d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=b,a.__reactInternalMemoizedMaskedChildContext=e);return e}function Ff(a){a=a.childContextTypes;return null!==a&&void 0!==a}function Gf(){H(N);H(M)}function Hf(a,b,c){if(M.current!==Cf)throw Error(y(168));I(M,b);I(N,c)}
function If(a,b,c){var d=a.stateNode;a=b.childContextTypes;if("function"!==typeof d.getChildContext)return c;d=d.getChildContext();for(var e in d)if(!(e in a))throw Error(y(108,Ra(b)||"Unknown",e));return m({},c,d)}function Jf(a){a=(a=a.stateNode)&&a.__reactInternalMemoizedMergedChildContext||Cf;Df=M.current;I(M,a);I(N,N.current);return!0}function Kf(a,b,c){var d=a.stateNode;if(!d)throw Error(y(169));c?(a=If(a,b,Df),d.__reactInternalMemoizedMergedChildContext=a,H(N),H(M),I(M,a)):H(N);I(N,c)}
var Lf=null,Mf=null,Nf=r.unstable_runWithPriority,Of=r.unstable_scheduleCallback,Pf=r.unstable_cancelCallback,Qf=r.unstable_shouldYield,Rf=r.unstable_requestPaint,Sf=r.unstable_now,Tf=r.unstable_getCurrentPriorityLevel,Uf=r.unstable_ImmediatePriority,Vf=r.unstable_UserBlockingPriority,Wf=r.unstable_NormalPriority,Xf=r.unstable_LowPriority,Yf=r.unstable_IdlePriority,Zf={},$f=void 0!==Rf?Rf:function(){},ag=null,bg=null,cg=!1,dg=Sf(),O=1E4>dg?Sf:function(){return Sf()-dg};
function eg(){switch(Tf()){case Uf:return 99;case Vf:return 98;case Wf:return 97;case Xf:return 96;case Yf:return 95;default:throw Error(y(332));}}function fg(a){switch(a){case 99:return Uf;case 98:return Vf;case 97:return Wf;case 96:return Xf;case 95:return Yf;default:throw Error(y(332));}}function gg(a,b){a=fg(a);return Nf(a,b)}function hg(a,b,c){a=fg(a);return Of(a,b,c)}function ig(){if(null!==bg){var a=bg;bg=null;Pf(a)}jg()}
function jg(){if(!cg&&null!==ag){cg=!0;var a=0;try{var b=ag;gg(99,function(){for(;a<b.length;a++){var c=b[a];do c=c(!0);while(null!==c)}});ag=null}catch(c){throw null!==ag&&(ag=ag.slice(a+1)),Of(Uf,ig),c;}finally{cg=!1}}}var kg=ra.ReactCurrentBatchConfig;function lg(a,b){if(a&&a.defaultProps){b=m({},b);a=a.defaultProps;for(var c in a)void 0===b[c]&&(b[c]=a[c]);return b}return b}var mg=Bf(null),ng=null,og=null,pg=null;function qg(){pg=og=ng=null}
function rg(a){var b=mg.current;H(mg);a.type._context._currentValue=b}function sg(a,b){for(;null!==a;){var c=a.alternate;if((a.childLanes&b)===b)if(null===c||(c.childLanes&b)===b)break;else c.childLanes|=b;else a.childLanes|=b,null!==c&&(c.childLanes|=b);a=a.return}}function tg(a,b){ng=a;pg=og=null;a=a.dependencies;null!==a&&null!==a.firstContext&&(0!==(a.lanes&b)&&(ug=!0),a.firstContext=null)}
function vg(a,b){if(pg!==a&&!1!==b&&0!==b){if("number"!==typeof b||1073741823===b)pg=a,b=1073741823;b={context:a,observedBits:b,next:null};if(null===og){if(null===ng)throw Error(y(308));og=b;ng.dependencies={lanes:0,firstContext:b,responders:null}}else og=og.next=b}return a._currentValue}var wg=!1;function xg(a){a.updateQueue={baseState:a.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null},effects:null}}
function yg(a,b){a=a.updateQueue;b.updateQueue===a&&(b.updateQueue={baseState:a.baseState,firstBaseUpdate:a.firstBaseUpdate,lastBaseUpdate:a.lastBaseUpdate,shared:a.shared,effects:a.effects})}function zg(a,b){return{eventTime:a,lane:b,tag:0,payload:null,callback:null,next:null}}function Ag(a,b){a=a.updateQueue;if(null!==a){a=a.shared;var c=a.pending;null===c?b.next=b:(b.next=c.next,c.next=b);a.pending=b}}
function Bg(a,b){var c=a.updateQueue,d=a.alternate;if(null!==d&&(d=d.updateQueue,c===d)){var e=null,f=null;c=c.firstBaseUpdate;if(null!==c){do{var g={eventTime:c.eventTime,lane:c.lane,tag:c.tag,payload:c.payload,callback:c.callback,next:null};null===f?e=f=g:f=f.next=g;c=c.next}while(null!==c);null===f?e=f=b:f=f.next=b}else e=f=b;c={baseState:d.baseState,firstBaseUpdate:e,lastBaseUpdate:f,shared:d.shared,effects:d.effects};a.updateQueue=c;return}a=c.lastBaseUpdate;null===a?c.firstBaseUpdate=b:a.next=
b;c.lastBaseUpdate=b}
function Cg(a,b,c,d){var e=a.updateQueue;wg=!1;var f=e.firstBaseUpdate,g=e.lastBaseUpdate,h=e.shared.pending;if(null!==h){e.shared.pending=null;var k=h,l=k.next;k.next=null;null===g?f=l:g.next=l;g=k;var n=a.alternate;if(null!==n){n=n.updateQueue;var A=n.lastBaseUpdate;A!==g&&(null===A?n.firstBaseUpdate=l:A.next=l,n.lastBaseUpdate=k)}}if(null!==f){A=e.baseState;g=0;n=l=k=null;do{h=f.lane;var p=f.eventTime;if((d&h)===h){null!==n&&(n=n.next={eventTime:p,lane:0,tag:f.tag,payload:f.payload,callback:f.callback,
next:null});a:{var C=a,x=f;h=b;p=c;switch(x.tag){case 1:C=x.payload;if("function"===typeof C){A=C.call(p,A,h);break a}A=C;break a;case 3:C.flags=C.flags&-4097|64;case 0:C=x.payload;h="function"===typeof C?C.call(p,A,h):C;if(null===h||void 0===h)break a;A=m({},A,h);break a;case 2:wg=!0}}null!==f.callback&&(a.flags|=32,h=e.effects,null===h?e.effects=[f]:h.push(f))}else p={eventTime:p,lane:h,tag:f.tag,payload:f.payload,callback:f.callback,next:null},null===n?(l=n=p,k=A):n=n.next=p,g|=h;f=f.next;if(null===
f)if(h=e.shared.pending,null===h)break;else f=h.next,h.next=null,e.lastBaseUpdate=h,e.shared.pending=null}while(1);null===n&&(k=A);e.baseState=k;e.firstBaseUpdate=l;e.lastBaseUpdate=n;Dg|=g;a.lanes=g;a.memoizedState=A}}function Eg(a,b,c){a=b.effects;b.effects=null;if(null!==a)for(b=0;b<a.length;b++){var d=a[b],e=d.callback;if(null!==e){d.callback=null;d=c;if("function"!==typeof e)throw Error(y(191,e));e.call(d)}}}var Fg=(new aa.Component).refs;
function Gg(a,b,c,d){b=a.memoizedState;c=c(d,b);c=null===c||void 0===c?b:m({},b,c);a.memoizedState=c;0===a.lanes&&(a.updateQueue.baseState=c)}
var Kg={isMounted:function(a){return(a=a._reactInternals)?Zb(a)===a:!1},enqueueSetState:function(a,b,c){a=a._reactInternals;var d=Hg(),e=Ig(a),f=zg(d,e);f.payload=b;void 0!==c&&null!==c&&(f.callback=c);Ag(a,f);Jg(a,e,d)},enqueueReplaceState:function(a,b,c){a=a._reactInternals;var d=Hg(),e=Ig(a),f=zg(d,e);f.tag=1;f.payload=b;void 0!==c&&null!==c&&(f.callback=c);Ag(a,f);Jg(a,e,d)},enqueueForceUpdate:function(a,b){a=a._reactInternals;var c=Hg(),d=Ig(a),e=zg(c,d);e.tag=2;void 0!==b&&null!==b&&(e.callback=
b);Ag(a,e);Jg(a,d,c)}};function Lg(a,b,c,d,e,f,g){a=a.stateNode;return"function"===typeof a.shouldComponentUpdate?a.shouldComponentUpdate(d,f,g):b.prototype&&b.prototype.isPureReactComponent?!Je(c,d)||!Je(e,f):!0}
function Mg(a,b,c){var d=!1,e=Cf;var f=b.contextType;"object"===typeof f&&null!==f?f=vg(f):(e=Ff(b)?Df:M.current,d=b.contextTypes,f=(d=null!==d&&void 0!==d)?Ef(a,e):Cf);b=new b(c,f);a.memoizedState=null!==b.state&&void 0!==b.state?b.state:null;b.updater=Kg;a.stateNode=b;b._reactInternals=a;d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=e,a.__reactInternalMemoizedMaskedChildContext=f);return b}
function Ng(a,b,c,d){a=b.state;"function"===typeof b.componentWillReceiveProps&&b.componentWillReceiveProps(c,d);"function"===typeof b.UNSAFE_componentWillReceiveProps&&b.UNSAFE_componentWillReceiveProps(c,d);b.state!==a&&Kg.enqueueReplaceState(b,b.state,null)}
function Og(a,b,c,d){var e=a.stateNode;e.props=c;e.state=a.memoizedState;e.refs=Fg;xg(a);var f=b.contextType;"object"===typeof f&&null!==f?e.context=vg(f):(f=Ff(b)?Df:M.current,e.context=Ef(a,f));Cg(a,c,e,d);e.state=a.memoizedState;f=b.getDerivedStateFromProps;"function"===typeof f&&(Gg(a,b,f,c),e.state=a.memoizedState);"function"===typeof b.getDerivedStateFromProps||"function"===typeof e.getSnapshotBeforeUpdate||"function"!==typeof e.UNSAFE_componentWillMount&&"function"!==typeof e.componentWillMount||
(b=e.state,"function"===typeof e.componentWillMount&&e.componentWillMount(),"function"===typeof e.UNSAFE_componentWillMount&&e.UNSAFE_componentWillMount(),b!==e.state&&Kg.enqueueReplaceState(e,e.state,null),Cg(a,c,e,d),e.state=a.memoizedState);"function"===typeof e.componentDidMount&&(a.flags|=4)}var Pg=Array.isArray;
function Qg(a,b,c){a=c.ref;if(null!==a&&"function"!==typeof a&&"object"!==typeof a){if(c._owner){c=c._owner;if(c){if(1!==c.tag)throw Error(y(309));var d=c.stateNode}if(!d)throw Error(y(147,a));var e=""+a;if(null!==b&&null!==b.ref&&"function"===typeof b.ref&&b.ref._stringRef===e)return b.ref;b=function(a){var b=d.refs;b===Fg&&(b=d.refs={});null===a?delete b[e]:b[e]=a};b._stringRef=e;return b}if("string"!==typeof a)throw Error(y(284));if(!c._owner)throw Error(y(290,a));}return a}
function Rg(a,b){if("textarea"!==a.type)throw Error(y(31,"[object Object]"===Object.prototype.toString.call(b)?"object with keys {"+Object.keys(b).join(", ")+"}":b));}
function Sg(a){function b(b,c){if(a){var d=b.lastEffect;null!==d?(d.nextEffect=c,b.lastEffect=c):b.firstEffect=b.lastEffect=c;c.nextEffect=null;c.flags=8}}function c(c,d){if(!a)return null;for(;null!==d;)b(c,d),d=d.sibling;return null}function d(a,b){for(a=new Map;null!==b;)null!==b.key?a.set(b.key,b):a.set(b.index,b),b=b.sibling;return a}function e(a,b){a=Tg(a,b);a.index=0;a.sibling=null;return a}function f(b,c,d){b.index=d;if(!a)return c;d=b.alternate;if(null!==d)return d=d.index,d<c?(b.flags=2,
c):d;b.flags=2;return c}function g(b){a&&null===b.alternate&&(b.flags=2);return b}function h(a,b,c,d){if(null===b||6!==b.tag)return b=Ug(c,a.mode,d),b.return=a,b;b=e(b,c);b.return=a;return b}function k(a,b,c,d){if(null!==b&&b.elementType===c.type)return d=e(b,c.props),d.ref=Qg(a,b,c),d.return=a,d;d=Vg(c.type,c.key,c.props,null,a.mode,d);d.ref=Qg(a,b,c);d.return=a;return d}function l(a,b,c,d){if(null===b||4!==b.tag||b.stateNode.containerInfo!==c.containerInfo||b.stateNode.implementation!==c.implementation)return b=
Wg(c,a.mode,d),b.return=a,b;b=e(b,c.children||[]);b.return=a;return b}function n(a,b,c,d,f){if(null===b||7!==b.tag)return b=Xg(c,a.mode,d,f),b.return=a,b;b=e(b,c);b.return=a;return b}function A(a,b,c){if("string"===typeof b||"number"===typeof b)return b=Ug(""+b,a.mode,c),b.return=a,b;if("object"===typeof b&&null!==b){switch(b.$$typeof){case sa:return c=Vg(b.type,b.key,b.props,null,a.mode,c),c.ref=Qg(a,null,b),c.return=a,c;case ta:return b=Wg(b,a.mode,c),b.return=a,b}if(Pg(b)||La(b))return b=Xg(b,
a.mode,c,null),b.return=a,b;Rg(a,b)}return null}function p(a,b,c,d){var e=null!==b?b.key:null;if("string"===typeof c||"number"===typeof c)return null!==e?null:h(a,b,""+c,d);if("object"===typeof c&&null!==c){switch(c.$$typeof){case sa:return c.key===e?c.type===ua?n(a,b,c.props.children,d,e):k(a,b,c,d):null;case ta:return c.key===e?l(a,b,c,d):null}if(Pg(c)||La(c))return null!==e?null:n(a,b,c,d,null);Rg(a,c)}return null}function C(a,b,c,d,e){if("string"===typeof d||"number"===typeof d)return a=a.get(c)||
null,h(b,a,""+d,e);if("object"===typeof d&&null!==d){switch(d.$$typeof){case sa:return a=a.get(null===d.key?c:d.key)||null,d.type===ua?n(b,a,d.props.children,e,d.key):k(b,a,d,e);case ta:return a=a.get(null===d.key?c:d.key)||null,l(b,a,d,e)}if(Pg(d)||La(d))return a=a.get(c)||null,n(b,a,d,e,null);Rg(b,d)}return null}function x(e,g,h,k){for(var l=null,t=null,u=g,z=g=0,q=null;null!==u&&z<h.length;z++){u.index>z?(q=u,u=null):q=u.sibling;var n=p(e,u,h[z],k);if(null===n){null===u&&(u=q);break}a&&u&&null===
n.alternate&&b(e,u);g=f(n,g,z);null===t?l=n:t.sibling=n;t=n;u=q}if(z===h.length)return c(e,u),l;if(null===u){for(;z<h.length;z++)u=A(e,h[z],k),null!==u&&(g=f(u,g,z),null===t?l=u:t.sibling=u,t=u);return l}for(u=d(e,u);z<h.length;z++)q=C(u,e,z,h[z],k),null!==q&&(a&&null!==q.alternate&&u.delete(null===q.key?z:q.key),g=f(q,g,z),null===t?l=q:t.sibling=q,t=q);a&&u.forEach(function(a){return b(e,a)});return l}function w(e,g,h,k){var l=La(h);if("function"!==typeof l)throw Error(y(150));h=l.call(h);if(null==
h)throw Error(y(151));for(var t=l=null,u=g,z=g=0,q=null,n=h.next();null!==u&&!n.done;z++,n=h.next()){u.index>z?(q=u,u=null):q=u.sibling;var w=p(e,u,n.value,k);if(null===w){null===u&&(u=q);break}a&&u&&null===w.alternate&&b(e,u);g=f(w,g,z);null===t?l=w:t.sibling=w;t=w;u=q}if(n.done)return c(e,u),l;if(null===u){for(;!n.done;z++,n=h.next())n=A(e,n.value,k),null!==n&&(g=f(n,g,z),null===t?l=n:t.sibling=n,t=n);return l}for(u=d(e,u);!n.done;z++,n=h.next())n=C(u,e,z,n.value,k),null!==n&&(a&&null!==n.alternate&&
u.delete(null===n.key?z:n.key),g=f(n,g,z),null===t?l=n:t.sibling=n,t=n);a&&u.forEach(function(a){return b(e,a)});return l}return function(a,d,f,h){var k="object"===typeof f&&null!==f&&f.type===ua&&null===f.key;k&&(f=f.props.children);var l="object"===typeof f&&null!==f;if(l)switch(f.$$typeof){case sa:a:{l=f.key;for(k=d;null!==k;){if(k.key===l){switch(k.tag){case 7:if(f.type===ua){c(a,k.sibling);d=e(k,f.props.children);d.return=a;a=d;break a}break;default:if(k.elementType===f.type){c(a,k.sibling);
d=e(k,f.props);d.ref=Qg(a,k,f);d.return=a;a=d;break a}}c(a,k);break}else b(a,k);k=k.sibling}f.type===ua?(d=Xg(f.props.children,a.mode,h,f.key),d.return=a,a=d):(h=Vg(f.type,f.key,f.props,null,a.mode,h),h.ref=Qg(a,d,f),h.return=a,a=h)}return g(a);case ta:a:{for(k=f.key;null!==d;){if(d.key===k)if(4===d.tag&&d.stateNode.containerInfo===f.containerInfo&&d.stateNode.implementation===f.implementation){c(a,d.sibling);d=e(d,f.children||[]);d.return=a;a=d;break a}else{c(a,d);break}else b(a,d);d=d.sibling}d=
Wg(f,a.mode,h);d.return=a;a=d}return g(a)}if("string"===typeof f||"number"===typeof f)return f=""+f,null!==d&&6===d.tag?(c(a,d.sibling),d=e(d,f),d.return=a,a=d):(c(a,d),d=Ug(f,a.mode,h),d.return=a,a=d),g(a);if(Pg(f))return x(a,d,f,h);if(La(f))return w(a,d,f,h);l&&Rg(a,f);if("undefined"===typeof f&&!k)switch(a.tag){case 1:case 22:case 0:case 11:case 15:throw Error(y(152,Ra(a.type)||"Component"));}return c(a,d)}}var Yg=Sg(!0),Zg=Sg(!1),$g={},ah=Bf($g),bh=Bf($g),ch=Bf($g);
function dh(a){if(a===$g)throw Error(y(174));return a}function eh(a,b){I(ch,b);I(bh,a);I(ah,$g);a=b.nodeType;switch(a){case 9:case 11:b=(b=b.documentElement)?b.namespaceURI:mb(null,"");break;default:a=8===a?b.parentNode:b,b=a.namespaceURI||null,a=a.tagName,b=mb(b,a)}H(ah);I(ah,b)}function fh(){H(ah);H(bh);H(ch)}function gh(a){dh(ch.current);var b=dh(ah.current);var c=mb(b,a.type);b!==c&&(I(bh,a),I(ah,c))}function hh(a){bh.current===a&&(H(ah),H(bh))}var P=Bf(0);
function ih(a){for(var b=a;null!==b;){if(13===b.tag){var c=b.memoizedState;if(null!==c&&(c=c.dehydrated,null===c||"$?"===c.data||"$!"===c.data))return b}else if(19===b.tag&&void 0!==b.memoizedProps.revealOrder){if(0!==(b.flags&64))return b}else if(null!==b.child){b.child.return=b;b=b.child;continue}if(b===a)break;for(;null===b.sibling;){if(null===b.return||b.return===a)return null;b=b.return}b.sibling.return=b.return;b=b.sibling}return null}var jh=null,kh=null,lh=!1;
function mh(a,b){var c=nh(5,null,null,0);c.elementType="DELETED";c.type="DELETED";c.stateNode=b;c.return=a;c.flags=8;null!==a.lastEffect?(a.lastEffect.nextEffect=c,a.lastEffect=c):a.firstEffect=a.lastEffect=c}function oh(a,b){switch(a.tag){case 5:var c=a.type;b=1!==b.nodeType||c.toLowerCase()!==b.nodeName.toLowerCase()?null:b;return null!==b?(a.stateNode=b,!0):!1;case 6:return b=""===a.pendingProps||3!==b.nodeType?null:b,null!==b?(a.stateNode=b,!0):!1;case 13:return!1;default:return!1}}
function ph(a){if(lh){var b=kh;if(b){var c=b;if(!oh(a,b)){b=rf(c.nextSibling);if(!b||!oh(a,b)){a.flags=a.flags&-1025|2;lh=!1;jh=a;return}mh(jh,c)}jh=a;kh=rf(b.firstChild)}else a.flags=a.flags&-1025|2,lh=!1,jh=a}}function qh(a){for(a=a.return;null!==a&&5!==a.tag&&3!==a.tag&&13!==a.tag;)a=a.return;jh=a}
function rh(a){if(a!==jh)return!1;if(!lh)return qh(a),lh=!0,!1;var b=a.type;if(5!==a.tag||"head"!==b&&"body"!==b&&!nf(b,a.memoizedProps))for(b=kh;b;)mh(a,b),b=rf(b.nextSibling);qh(a);if(13===a.tag){a=a.memoizedState;a=null!==a?a.dehydrated:null;if(!a)throw Error(y(317));a:{a=a.nextSibling;for(b=0;a;){if(8===a.nodeType){var c=a.data;if("/$"===c){if(0===b){kh=rf(a.nextSibling);break a}b--}else"$"!==c&&"$!"!==c&&"$?"!==c||b++}a=a.nextSibling}kh=null}}else kh=jh?rf(a.stateNode.nextSibling):null;return!0}
function sh(){kh=jh=null;lh=!1}var th=[];function uh(){for(var a=0;a<th.length;a++)th[a]._workInProgressVersionPrimary=null;th.length=0}var vh=ra.ReactCurrentDispatcher,wh=ra.ReactCurrentBatchConfig,xh=0,R=null,S=null,T=null,yh=!1,zh=!1;function Ah(){throw Error(y(321));}function Bh(a,b){if(null===b)return!1;for(var c=0;c<b.length&&c<a.length;c++)if(!He(a[c],b[c]))return!1;return!0}
function Ch(a,b,c,d,e,f){xh=f;R=b;b.memoizedState=null;b.updateQueue=null;b.lanes=0;vh.current=null===a||null===a.memoizedState?Dh:Eh;a=c(d,e);if(zh){f=0;do{zh=!1;if(!(25>f))throw Error(y(301));f+=1;T=S=null;b.updateQueue=null;vh.current=Fh;a=c(d,e)}while(zh)}vh.current=Gh;b=null!==S&&null!==S.next;xh=0;T=S=R=null;yh=!1;if(b)throw Error(y(300));return a}function Hh(){var a={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};null===T?R.memoizedState=T=a:T=T.next=a;return T}
function Ih(){if(null===S){var a=R.alternate;a=null!==a?a.memoizedState:null}else a=S.next;var b=null===T?R.memoizedState:T.next;if(null!==b)T=b,S=a;else{if(null===a)throw Error(y(310));S=a;a={memoizedState:S.memoizedState,baseState:S.baseState,baseQueue:S.baseQueue,queue:S.queue,next:null};null===T?R.memoizedState=T=a:T=T.next=a}return T}function Jh(a,b){return"function"===typeof b?b(a):b}
function Kh(a){var b=Ih(),c=b.queue;if(null===c)throw Error(y(311));c.lastRenderedReducer=a;var d=S,e=d.baseQueue,f=c.pending;if(null!==f){if(null!==e){var g=e.next;e.next=f.next;f.next=g}d.baseQueue=e=f;c.pending=null}if(null!==e){e=e.next;d=d.baseState;var h=g=f=null,k=e;do{var l=k.lane;if((xh&l)===l)null!==h&&(h=h.next={lane:0,action:k.action,eagerReducer:k.eagerReducer,eagerState:k.eagerState,next:null}),d=k.eagerReducer===a?k.eagerState:a(d,k.action);else{var n={lane:l,action:k.action,eagerReducer:k.eagerReducer,
eagerState:k.eagerState,next:null};null===h?(g=h=n,f=d):h=h.next=n;R.lanes|=l;Dg|=l}k=k.next}while(null!==k&&k!==e);null===h?f=d:h.next=g;He(d,b.memoizedState)||(ug=!0);b.memoizedState=d;b.baseState=f;b.baseQueue=h;c.lastRenderedState=d}return[b.memoizedState,c.dispatch]}
function Lh(a){var b=Ih(),c=b.queue;if(null===c)throw Error(y(311));c.lastRenderedReducer=a;var d=c.dispatch,e=c.pending,f=b.memoizedState;if(null!==e){c.pending=null;var g=e=e.next;do f=a(f,g.action),g=g.next;while(g!==e);He(f,b.memoizedState)||(ug=!0);b.memoizedState=f;null===b.baseQueue&&(b.baseState=f);c.lastRenderedState=f}return[f,d]}
function Mh(a,b,c){var d=b._getVersion;d=d(b._source);var e=b._workInProgressVersionPrimary;if(null!==e)a=e===d;else if(a=a.mutableReadLanes,a=(xh&a)===a)b._workInProgressVersionPrimary=d,th.push(b);if(a)return c(b._source);th.push(b);throw Error(y(350));}
function Nh(a,b,c,d){var e=U;if(null===e)throw Error(y(349));var f=b._getVersion,g=f(b._source),h=vh.current,k=h.useState(function(){return Mh(e,b,c)}),l=k[1],n=k[0];k=T;var A=a.memoizedState,p=A.refs,C=p.getSnapshot,x=A.source;A=A.subscribe;var w=R;a.memoizedState={refs:p,source:b,subscribe:d};h.useEffect(function(){p.getSnapshot=c;p.setSnapshot=l;var a=f(b._source);if(!He(g,a)){a=c(b._source);He(n,a)||(l(a),a=Ig(w),e.mutableReadLanes|=a&e.pendingLanes);a=e.mutableReadLanes;e.entangledLanes|=a;for(var d=
e.entanglements,h=a;0<h;){var k=31-Vc(h),v=1<<k;d[k]|=a;h&=~v}}},[c,b,d]);h.useEffect(function(){return d(b._source,function(){var a=p.getSnapshot,c=p.setSnapshot;try{c(a(b._source));var d=Ig(w);e.mutableReadLanes|=d&e.pendingLanes}catch(q){c(function(){throw q;})}})},[b,d]);He(C,c)&&He(x,b)&&He(A,d)||(a={pending:null,dispatch:null,lastRenderedReducer:Jh,lastRenderedState:n},a.dispatch=l=Oh.bind(null,R,a),k.queue=a,k.baseQueue=null,n=Mh(e,b,c),k.memoizedState=k.baseState=n);return n}
function Ph(a,b,c){var d=Ih();return Nh(d,a,b,c)}function Qh(a){var b=Hh();"function"===typeof a&&(a=a());b.memoizedState=b.baseState=a;a=b.queue={pending:null,dispatch:null,lastRenderedReducer:Jh,lastRenderedState:a};a=a.dispatch=Oh.bind(null,R,a);return[b.memoizedState,a]}
function Rh(a,b,c,d){a={tag:a,create:b,destroy:c,deps:d,next:null};b=R.updateQueue;null===b?(b={lastEffect:null},R.updateQueue=b,b.lastEffect=a.next=a):(c=b.lastEffect,null===c?b.lastEffect=a.next=a:(d=c.next,c.next=a,a.next=d,b.lastEffect=a));return a}function Sh(a){var b=Hh();a={current:a};return b.memoizedState=a}function Th(){return Ih().memoizedState}function Uh(a,b,c,d){var e=Hh();R.flags|=a;e.memoizedState=Rh(1|b,c,void 0,void 0===d?null:d)}
function Vh(a,b,c,d){var e=Ih();d=void 0===d?null:d;var f=void 0;if(null!==S){var g=S.memoizedState;f=g.destroy;if(null!==d&&Bh(d,g.deps)){Rh(b,c,f,d);return}}R.flags|=a;e.memoizedState=Rh(1|b,c,f,d)}function Wh(a,b){return Uh(516,4,a,b)}function Xh(a,b){return Vh(516,4,a,b)}function Yh(a,b){return Vh(4,2,a,b)}function Zh(a,b){if("function"===typeof b)return a=a(),b(a),function(){b(null)};if(null!==b&&void 0!==b)return a=a(),b.current=a,function(){b.current=null}}
function $h(a,b,c){c=null!==c&&void 0!==c?c.concat([a]):null;return Vh(4,2,Zh.bind(null,b,a),c)}function ai(){}function bi(a,b){var c=Ih();b=void 0===b?null:b;var d=c.memoizedState;if(null!==d&&null!==b&&Bh(b,d[1]))return d[0];c.memoizedState=[a,b];return a}function ci(a,b){var c=Ih();b=void 0===b?null:b;var d=c.memoizedState;if(null!==d&&null!==b&&Bh(b,d[1]))return d[0];a=a();c.memoizedState=[a,b];return a}
function di(a,b){var c=eg();gg(98>c?98:c,function(){a(!0)});gg(97<c?97:c,function(){var c=wh.transition;wh.transition=1;try{a(!1),b()}finally{wh.transition=c}})}
function Oh(a,b,c){var d=Hg(),e=Ig(a),f={lane:e,action:c,eagerReducer:null,eagerState:null,next:null},g=b.pending;null===g?f.next=f:(f.next=g.next,g.next=f);b.pending=f;g=a.alternate;if(a===R||null!==g&&g===R)zh=yh=!0;else{if(0===a.lanes&&(null===g||0===g.lanes)&&(g=b.lastRenderedReducer,null!==g))try{var h=b.lastRenderedState,k=g(h,c);f.eagerReducer=g;f.eagerState=k;if(He(k,h))return}catch(l){}finally{}Jg(a,e,d)}}
var Gh={readContext:vg,useCallback:Ah,useContext:Ah,useEffect:Ah,useImperativeHandle:Ah,useLayoutEffect:Ah,useMemo:Ah,useReducer:Ah,useRef:Ah,useState:Ah,useDebugValue:Ah,useDeferredValue:Ah,useTransition:Ah,useMutableSource:Ah,useOpaqueIdentifier:Ah,unstable_isNewReconciler:!1},Dh={readContext:vg,useCallback:function(a,b){Hh().memoizedState=[a,void 0===b?null:b];return a},useContext:vg,useEffect:Wh,useImperativeHandle:function(a,b,c){c=null!==c&&void 0!==c?c.concat([a]):null;return Uh(4,2,Zh.bind(null,
b,a),c)},useLayoutEffect:function(a,b){return Uh(4,2,a,b)},useMemo:function(a,b){var c=Hh();b=void 0===b?null:b;a=a();c.memoizedState=[a,b];return a},useReducer:function(a,b,c){var d=Hh();b=void 0!==c?c(b):b;d.memoizedState=d.baseState=b;a=d.queue={pending:null,dispatch:null,lastRenderedReducer:a,lastRenderedState:b};a=a.dispatch=Oh.bind(null,R,a);return[d.memoizedState,a]},useRef:Sh,useState:Qh,useDebugValue:ai,useDeferredValue:function(a){var b=Qh(a),c=b[0],d=b[1];Wh(function(){var b=wh.transition;
wh.transition=1;try{d(a)}finally{wh.transition=b}},[a]);return c},useTransition:function(){var a=Qh(!1),b=a[0];a=di.bind(null,a[1]);Sh(a);return[a,b]},useMutableSource:function(a,b,c){var d=Hh();d.memoizedState={refs:{getSnapshot:b,setSnapshot:null},source:a,subscribe:c};return Nh(d,a,b,c)},useOpaqueIdentifier:function(){if(lh){var a=!1,b=uf(function(){a||(a=!0,c("r:"+(tf++).toString(36)));throw Error(y(355));}),c=Qh(b)[1];0===(R.mode&2)&&(R.flags|=516,Rh(5,function(){c("r:"+(tf++).toString(36))},
void 0,null));return b}b="r:"+(tf++).toString(36);Qh(b);return b},unstable_isNewReconciler:!1},Eh={readContext:vg,useCallback:bi,useContext:vg,useEffect:Xh,useImperativeHandle:$h,useLayoutEffect:Yh,useMemo:ci,useReducer:Kh,useRef:Th,useState:function(){return Kh(Jh)},useDebugValue:ai,useDeferredValue:function(a){var b=Kh(Jh),c=b[0],d=b[1];Xh(function(){var b=wh.transition;wh.transition=1;try{d(a)}finally{wh.transition=b}},[a]);return c},useTransition:function(){var a=Kh(Jh)[0];return[Th().current,
a]},useMutableSource:Ph,useOpaqueIdentifier:function(){return Kh(Jh)[0]},unstable_isNewReconciler:!1},Fh={readContext:vg,useCallback:bi,useContext:vg,useEffect:Xh,useImperativeHandle:$h,useLayoutEffect:Yh,useMemo:ci,useReducer:Lh,useRef:Th,useState:function(){return Lh(Jh)},useDebugValue:ai,useDeferredValue:function(a){var b=Lh(Jh),c=b[0],d=b[1];Xh(function(){var b=wh.transition;wh.transition=1;try{d(a)}finally{wh.transition=b}},[a]);return c},useTransition:function(){var a=Lh(Jh)[0];return[Th().current,
a]},useMutableSource:Ph,useOpaqueIdentifier:function(){return Lh(Jh)[0]},unstable_isNewReconciler:!1},ei=ra.ReactCurrentOwner,ug=!1;function fi(a,b,c,d){b.child=null===a?Zg(b,null,c,d):Yg(b,a.child,c,d)}function gi(a,b,c,d,e){c=c.render;var f=b.ref;tg(b,e);d=Ch(a,b,c,d,f,e);if(null!==a&&!ug)return b.updateQueue=a.updateQueue,b.flags&=-517,a.lanes&=~e,hi(a,b,e);b.flags|=1;fi(a,b,d,e);return b.child}
function ii(a,b,c,d,e,f){if(null===a){var g=c.type;if("function"===typeof g&&!ji(g)&&void 0===g.defaultProps&&null===c.compare&&void 0===c.defaultProps)return b.tag=15,b.type=g,ki(a,b,g,d,e,f);a=Vg(c.type,null,d,b,b.mode,f);a.ref=b.ref;a.return=b;return b.child=a}g=a.child;if(0===(e&f)&&(e=g.memoizedProps,c=c.compare,c=null!==c?c:Je,c(e,d)&&a.ref===b.ref))return hi(a,b,f);b.flags|=1;a=Tg(g,d);a.ref=b.ref;a.return=b;return b.child=a}
function ki(a,b,c,d,e,f){if(null!==a&&Je(a.memoizedProps,d)&&a.ref===b.ref)if(ug=!1,0!==(f&e))0!==(a.flags&16384)&&(ug=!0);else return b.lanes=a.lanes,hi(a,b,f);return li(a,b,c,d,f)}
function mi(a,b,c){var d=b.pendingProps,e=d.children,f=null!==a?a.memoizedState:null;if("hidden"===d.mode||"unstable-defer-without-hiding"===d.mode)if(0===(b.mode&4))b.memoizedState={baseLanes:0},ni(b,c);else if(0!==(c&1073741824))b.memoizedState={baseLanes:0},ni(b,null!==f?f.baseLanes:c);else return a=null!==f?f.baseLanes|c:c,b.lanes=b.childLanes=1073741824,b.memoizedState={baseLanes:a},ni(b,a),null;else null!==f?(d=f.baseLanes|c,b.memoizedState=null):d=c,ni(b,d);fi(a,b,e,c);return b.child}
function oi(a,b){var c=b.ref;if(null===a&&null!==c||null!==a&&a.ref!==c)b.flags|=128}function li(a,b,c,d,e){var f=Ff(c)?Df:M.current;f=Ef(b,f);tg(b,e);c=Ch(a,b,c,d,f,e);if(null!==a&&!ug)return b.updateQueue=a.updateQueue,b.flags&=-517,a.lanes&=~e,hi(a,b,e);b.flags|=1;fi(a,b,c,e);return b.child}
function pi(a,b,c,d,e){if(Ff(c)){var f=!0;Jf(b)}else f=!1;tg(b,e);if(null===b.stateNode)null!==a&&(a.alternate=null,b.alternate=null,b.flags|=2),Mg(b,c,d),Og(b,c,d,e),d=!0;else if(null===a){var g=b.stateNode,h=b.memoizedProps;g.props=h;var k=g.context,l=c.contextType;"object"===typeof l&&null!==l?l=vg(l):(l=Ff(c)?Df:M.current,l=Ef(b,l));var n=c.getDerivedStateFromProps,A="function"===typeof n||"function"===typeof g.getSnapshotBeforeUpdate;A||"function"!==typeof g.UNSAFE_componentWillReceiveProps&&
"function"!==typeof g.componentWillReceiveProps||(h!==d||k!==l)&&Ng(b,g,d,l);wg=!1;var p=b.memoizedState;g.state=p;Cg(b,d,g,e);k=b.memoizedState;h!==d||p!==k||N.current||wg?("function"===typeof n&&(Gg(b,c,n,d),k=b.memoizedState),(h=wg||Lg(b,c,h,d,p,k,l))?(A||"function"!==typeof g.UNSAFE_componentWillMount&&"function"!==typeof g.componentWillMount||("function"===typeof g.componentWillMount&&g.componentWillMount(),"function"===typeof g.UNSAFE_componentWillMount&&g.UNSAFE_componentWillMount()),"function"===
typeof g.componentDidMount&&(b.flags|=4)):("function"===typeof g.componentDidMount&&(b.flags|=4),b.memoizedProps=d,b.memoizedState=k),g.props=d,g.state=k,g.context=l,d=h):("function"===typeof g.componentDidMount&&(b.flags|=4),d=!1)}else{g=b.stateNode;yg(a,b);h=b.memoizedProps;l=b.type===b.elementType?h:lg(b.type,h);g.props=l;A=b.pendingProps;p=g.context;k=c.contextType;"object"===typeof k&&null!==k?k=vg(k):(k=Ff(c)?Df:M.current,k=Ef(b,k));var C=c.getDerivedStateFromProps;(n="function"===typeof C||
"function"===typeof g.getSnapshotBeforeUpdate)||"function"!==typeof g.UNSAFE_componentWillReceiveProps&&"function"!==typeof g.componentWillReceiveProps||(h!==A||p!==k)&&Ng(b,g,d,k);wg=!1;p=b.memoizedState;g.state=p;Cg(b,d,g,e);var x=b.memoizedState;h!==A||p!==x||N.current||wg?("function"===typeof C&&(Gg(b,c,C,d),x=b.memoizedState),(l=wg||Lg(b,c,l,d,p,x,k))?(n||"function"!==typeof g.UNSAFE_componentWillUpdate&&"function"!==typeof g.componentWillUpdate||("function"===typeof g.componentWillUpdate&&g.componentWillUpdate(d,
x,k),"function"===typeof g.UNSAFE_componentWillUpdate&&g.UNSAFE_componentWillUpdate(d,x,k)),"function"===typeof g.componentDidUpdate&&(b.flags|=4),"function"===typeof g.getSnapshotBeforeUpdate&&(b.flags|=256)):("function"!==typeof g.componentDidUpdate||h===a.memoizedProps&&p===a.memoizedState||(b.flags|=4),"function"!==typeof g.getSnapshotBeforeUpdate||h===a.memoizedProps&&p===a.memoizedState||(b.flags|=256),b.memoizedProps=d,b.memoizedState=x),g.props=d,g.state=x,g.context=k,d=l):("function"!==typeof g.componentDidUpdate||
h===a.memoizedProps&&p===a.memoizedState||(b.flags|=4),"function"!==typeof g.getSnapshotBeforeUpdate||h===a.memoizedProps&&p===a.memoizedState||(b.flags|=256),d=!1)}return qi(a,b,c,d,f,e)}
function qi(a,b,c,d,e,f){oi(a,b);var g=0!==(b.flags&64);if(!d&&!g)return e&&Kf(b,c,!1),hi(a,b,f);d=b.stateNode;ei.current=b;var h=g&&"function"!==typeof c.getDerivedStateFromError?null:d.render();b.flags|=1;null!==a&&g?(b.child=Yg(b,a.child,null,f),b.child=Yg(b,null,h,f)):fi(a,b,h,f);b.memoizedState=d.state;e&&Kf(b,c,!0);return b.child}function ri(a){var b=a.stateNode;b.pendingContext?Hf(a,b.pendingContext,b.pendingContext!==b.context):b.context&&Hf(a,b.context,!1);eh(a,b.containerInfo)}
var si={dehydrated:null,retryLane:0};
function ti(a,b,c){var d=b.pendingProps,e=P.current,f=!1,g;(g=0!==(b.flags&64))||(g=null!==a&&null===a.memoizedState?!1:0!==(e&2));g?(f=!0,b.flags&=-65):null!==a&&null===a.memoizedState||void 0===d.fallback||!0===d.unstable_avoidThisFallback||(e|=1);I(P,e&1);if(null===a){void 0!==d.fallback&&ph(b);a=d.children;e=d.fallback;if(f)return a=ui(b,a,e,c),b.child.memoizedState={baseLanes:c},b.memoizedState=si,a;if("number"===typeof d.unstable_expectedLoadTime)return a=ui(b,a,e,c),b.child.memoizedState={baseLanes:c},
b.memoizedState=si,b.lanes=33554432,a;c=vi({mode:"visible",children:a},b.mode,c,null);c.return=b;return b.child=c}if(null!==a.memoizedState){if(f)return d=wi(a,b,d.children,d.fallback,c),f=b.child,e=a.child.memoizedState,f.memoizedState=null===e?{baseLanes:c}:{baseLanes:e.baseLanes|c},f.childLanes=a.childLanes&~c,b.memoizedState=si,d;c=xi(a,b,d.children,c);b.memoizedState=null;return c}if(f)return d=wi(a,b,d.children,d.fallback,c),f=b.child,e=a.child.memoizedState,f.memoizedState=null===e?{baseLanes:c}:
{baseLanes:e.baseLanes|c},f.childLanes=a.childLanes&~c,b.memoizedState=si,d;c=xi(a,b,d.children,c);b.memoizedState=null;return c}function ui(a,b,c,d){var e=a.mode,f=a.child;b={mode:"hidden",children:b};0===(e&2)&&null!==f?(f.childLanes=0,f.pendingProps=b):f=vi(b,e,0,null);c=Xg(c,e,d,null);f.return=a;c.return=a;f.sibling=c;a.child=f;return c}
function xi(a,b,c,d){var e=a.child;a=e.sibling;c=Tg(e,{mode:"visible",children:c});0===(b.mode&2)&&(c.lanes=d);c.return=b;c.sibling=null;null!==a&&(a.nextEffect=null,a.flags=8,b.firstEffect=b.lastEffect=a);return b.child=c}
function wi(a,b,c,d,e){var f=b.mode,g=a.child;a=g.sibling;var h={mode:"hidden",children:c};0===(f&2)&&b.child!==g?(c=b.child,c.childLanes=0,c.pendingProps=h,g=c.lastEffect,null!==g?(b.firstEffect=c.firstEffect,b.lastEffect=g,g.nextEffect=null):b.firstEffect=b.lastEffect=null):c=Tg(g,h);null!==a?d=Tg(a,d):(d=Xg(d,f,e,null),d.flags|=2);d.return=b;c.return=b;c.sibling=d;b.child=c;return d}function yi(a,b){a.lanes|=b;var c=a.alternate;null!==c&&(c.lanes|=b);sg(a.return,b)}
function zi(a,b,c,d,e,f){var g=a.memoizedState;null===g?a.memoizedState={isBackwards:b,rendering:null,renderingStartTime:0,last:d,tail:c,tailMode:e,lastEffect:f}:(g.isBackwards=b,g.rendering=null,g.renderingStartTime=0,g.last=d,g.tail=c,g.tailMode=e,g.lastEffect=f)}
function Ai(a,b,c){var d=b.pendingProps,e=d.revealOrder,f=d.tail;fi(a,b,d.children,c);d=P.current;if(0!==(d&2))d=d&1|2,b.flags|=64;else{if(null!==a&&0!==(a.flags&64))a:for(a=b.child;null!==a;){if(13===a.tag)null!==a.memoizedState&&yi(a,c);else if(19===a.tag)yi(a,c);else if(null!==a.child){a.child.return=a;a=a.child;continue}if(a===b)break a;for(;null===a.sibling;){if(null===a.return||a.return===b)break a;a=a.return}a.sibling.return=a.return;a=a.sibling}d&=1}I(P,d);if(0===(b.mode&2))b.memoizedState=
null;else switch(e){case "forwards":c=b.child;for(e=null;null!==c;)a=c.alternate,null!==a&&null===ih(a)&&(e=c),c=c.sibling;c=e;null===c?(e=b.child,b.child=null):(e=c.sibling,c.sibling=null);zi(b,!1,e,c,f,b.lastEffect);break;case "backwards":c=null;e=b.child;for(b.child=null;null!==e;){a=e.alternate;if(null!==a&&null===ih(a)){b.child=e;break}a=e.sibling;e.sibling=c;c=e;e=a}zi(b,!0,c,null,f,b.lastEffect);break;case "together":zi(b,!1,null,null,void 0,b.lastEffect);break;default:b.memoizedState=null}return b.child}
function hi(a,b,c){null!==a&&(b.dependencies=a.dependencies);Dg|=b.lanes;if(0!==(c&b.childLanes)){if(null!==a&&b.child!==a.child)throw Error(y(153));if(null!==b.child){a=b.child;c=Tg(a,a.pendingProps);b.child=c;for(c.return=b;null!==a.sibling;)a=a.sibling,c=c.sibling=Tg(a,a.pendingProps),c.return=b;c.sibling=null}return b.child}return null}var Bi,Ci,Di,Ei;
Bi=function(a,b){for(var c=b.child;null!==c;){if(5===c.tag||6===c.tag)a.appendChild(c.stateNode);else if(4!==c.tag&&null!==c.child){c.child.return=c;c=c.child;continue}if(c===b)break;for(;null===c.sibling;){if(null===c.return||c.return===b)return;c=c.return}c.sibling.return=c.return;c=c.sibling}};Ci=function(){};
Di=function(a,b,c,d){var e=a.memoizedProps;if(e!==d){a=b.stateNode;dh(ah.current);var f=null;switch(c){case "input":e=Ya(a,e);d=Ya(a,d);f=[];break;case "option":e=eb(a,e);d=eb(a,d);f=[];break;case "select":e=m({},e,{value:void 0});d=m({},d,{value:void 0});f=[];break;case "textarea":e=gb(a,e);d=gb(a,d);f=[];break;default:"function"!==typeof e.onClick&&"function"===typeof d.onClick&&(a.onclick=jf)}vb(c,d);var g;c=null;for(l in e)if(!d.hasOwnProperty(l)&&e.hasOwnProperty(l)&&null!=e[l])if("style"===
l){var h=e[l];for(g in h)h.hasOwnProperty(g)&&(c||(c={}),c[g]="")}else"dangerouslySetInnerHTML"!==l&&"children"!==l&&"suppressContentEditableWarning"!==l&&"suppressHydrationWarning"!==l&&"autoFocus"!==l&&(ca.hasOwnProperty(l)?f||(f=[]):(f=f||[]).push(l,null));for(l in d){var k=d[l];h=null!=e?e[l]:void 0;if(d.hasOwnProperty(l)&&k!==h&&(null!=k||null!=h))if("style"===l)if(h){for(g in h)!h.hasOwnProperty(g)||k&&k.hasOwnProperty(g)||(c||(c={}),c[g]="");for(g in k)k.hasOwnProperty(g)&&h[g]!==k[g]&&(c||
(c={}),c[g]=k[g])}else c||(f||(f=[]),f.push(l,c)),c=k;else"dangerouslySetInnerHTML"===l?(k=k?k.__html:void 0,h=h?h.__html:void 0,null!=k&&h!==k&&(f=f||[]).push(l,k)):"children"===l?"string"!==typeof k&&"number"!==typeof k||(f=f||[]).push(l,""+k):"suppressContentEditableWarning"!==l&&"suppressHydrationWarning"!==l&&(ca.hasOwnProperty(l)?(null!=k&&"onScroll"===l&&G("scroll",a),f||h===k||(f=[])):"object"===typeof k&&null!==k&&k.$$typeof===Ga?k.toString():(f=f||[]).push(l,k))}c&&(f=f||[]).push("style",
c);var l=f;if(b.updateQueue=l)b.flags|=4}};Ei=function(a,b,c,d){c!==d&&(b.flags|=4)};function Fi(a,b){if(!lh)switch(a.tailMode){case "hidden":b=a.tail;for(var c=null;null!==b;)null!==b.alternate&&(c=b),b=b.sibling;null===c?a.tail=null:c.sibling=null;break;case "collapsed":c=a.tail;for(var d=null;null!==c;)null!==c.alternate&&(d=c),c=c.sibling;null===d?b||null===a.tail?a.tail=null:a.tail.sibling=null:d.sibling=null}}
function Gi(a,b,c){var d=b.pendingProps;switch(b.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return null;case 1:return Ff(b.type)&&Gf(),null;case 3:fh();H(N);H(M);uh();d=b.stateNode;d.pendingContext&&(d.context=d.pendingContext,d.pendingContext=null);if(null===a||null===a.child)rh(b)?b.flags|=4:d.hydrate||(b.flags|=256);Ci(b);return null;case 5:hh(b);var e=dh(ch.current);c=b.type;if(null!==a&&null!=b.stateNode)Di(a,b,c,d,e),a.ref!==b.ref&&(b.flags|=128);else{if(!d){if(null===
b.stateNode)throw Error(y(166));return null}a=dh(ah.current);if(rh(b)){d=b.stateNode;c=b.type;var f=b.memoizedProps;d[wf]=b;d[xf]=f;switch(c){case "dialog":G("cancel",d);G("close",d);break;case "iframe":case "object":case "embed":G("load",d);break;case "video":case "audio":for(a=0;a<Xe.length;a++)G(Xe[a],d);break;case "source":G("error",d);break;case "img":case "image":case "link":G("error",d);G("load",d);break;case "details":G("toggle",d);break;case "input":Za(d,f);G("invalid",d);break;case "select":d._wrapperState=
{wasMultiple:!!f.multiple};G("invalid",d);break;case "textarea":hb(d,f),G("invalid",d)}vb(c,f);a=null;for(var g in f)f.hasOwnProperty(g)&&(e=f[g],"children"===g?"string"===typeof e?d.textContent!==e&&(a=["children",e]):"number"===typeof e&&d.textContent!==""+e&&(a=["children",""+e]):ca.hasOwnProperty(g)&&null!=e&&"onScroll"===g&&G("scroll",d));switch(c){case "input":Va(d);cb(d,f,!0);break;case "textarea":Va(d);jb(d);break;case "select":case "option":break;default:"function"===typeof f.onClick&&(d.onclick=
jf)}d=a;b.updateQueue=d;null!==d&&(b.flags|=4)}else{g=9===e.nodeType?e:e.ownerDocument;a===kb.html&&(a=lb(c));a===kb.html?"script"===c?(a=g.createElement("div"),a.innerHTML="<script>\x3c/script>",a=a.removeChild(a.firstChild)):"string"===typeof d.is?a=g.createElement(c,{is:d.is}):(a=g.createElement(c),"select"===c&&(g=a,d.multiple?g.multiple=!0:d.size&&(g.size=d.size))):a=g.createElementNS(a,c);a[wf]=b;a[xf]=d;Bi(a,b,!1,!1);b.stateNode=a;g=wb(c,d);switch(c){case "dialog":G("cancel",a);G("close",a);
e=d;break;case "iframe":case "object":case "embed":G("load",a);e=d;break;case "video":case "audio":for(e=0;e<Xe.length;e++)G(Xe[e],a);e=d;break;case "source":G("error",a);e=d;break;case "img":case "image":case "link":G("error",a);G("load",a);e=d;break;case "details":G("toggle",a);e=d;break;case "input":Za(a,d);e=Ya(a,d);G("invalid",a);break;case "option":e=eb(a,d);break;case "select":a._wrapperState={wasMultiple:!!d.multiple};e=m({},d,{value:void 0});G("invalid",a);break;case "textarea":hb(a,d);e=
gb(a,d);G("invalid",a);break;default:e=d}vb(c,e);var h=e;for(f in h)if(h.hasOwnProperty(f)){var k=h[f];"style"===f?tb(a,k):"dangerouslySetInnerHTML"===f?(k=k?k.__html:void 0,null!=k&&ob(a,k)):"children"===f?"string"===typeof k?("textarea"!==c||""!==k)&&pb(a,k):"number"===typeof k&&pb(a,""+k):"suppressContentEditableWarning"!==f&&"suppressHydrationWarning"!==f&&"autoFocus"!==f&&(ca.hasOwnProperty(f)?null!=k&&"onScroll"===f&&G("scroll",a):null!=k&&qa(a,f,k,g))}switch(c){case "input":Va(a);cb(a,d,!1);
break;case "textarea":Va(a);jb(a);break;case "option":null!=d.value&&a.setAttribute("value",""+Sa(d.value));break;case "select":a.multiple=!!d.multiple;f=d.value;null!=f?fb(a,!!d.multiple,f,!1):null!=d.defaultValue&&fb(a,!!d.multiple,d.defaultValue,!0);break;default:"function"===typeof e.onClick&&(a.onclick=jf)}mf(c,d)&&(b.flags|=4)}null!==b.ref&&(b.flags|=128)}return null;case 6:if(a&&null!=b.stateNode)Ei(a,b,a.memoizedProps,d);else{if("string"!==typeof d&&null===b.stateNode)throw Error(y(166));
c=dh(ch.current);dh(ah.current);rh(b)?(d=b.stateNode,c=b.memoizedProps,d[wf]=b,d.nodeValue!==c&&(b.flags|=4)):(d=(9===c.nodeType?c:c.ownerDocument).createTextNode(d),d[wf]=b,b.stateNode=d)}return null;case 13:H(P);d=b.memoizedState;if(0!==(b.flags&64))return b.lanes=c,b;d=null!==d;c=!1;null===a?void 0!==b.memoizedProps.fallback&&rh(b):c=null!==a.memoizedState;if(d&&!c&&0!==(b.mode&2))if(null===a&&!0!==b.memoizedProps.unstable_avoidThisFallback||0!==(P.current&1))0===V&&(V=3);else{if(0===V||3===V)V=
4;null===U||0===(Dg&134217727)&&0===(Hi&134217727)||Ii(U,W)}if(d||c)b.flags|=4;return null;case 4:return fh(),Ci(b),null===a&&cf(b.stateNode.containerInfo),null;case 10:return rg(b),null;case 17:return Ff(b.type)&&Gf(),null;case 19:H(P);d=b.memoizedState;if(null===d)return null;f=0!==(b.flags&64);g=d.rendering;if(null===g)if(f)Fi(d,!1);else{if(0!==V||null!==a&&0!==(a.flags&64))for(a=b.child;null!==a;){g=ih(a);if(null!==g){b.flags|=64;Fi(d,!1);f=g.updateQueue;null!==f&&(b.updateQueue=f,b.flags|=4);
null===d.lastEffect&&(b.firstEffect=null);b.lastEffect=d.lastEffect;d=c;for(c=b.child;null!==c;)f=c,a=d,f.flags&=2,f.nextEffect=null,f.firstEffect=null,f.lastEffect=null,g=f.alternate,null===g?(f.childLanes=0,f.lanes=a,f.child=null,f.memoizedProps=null,f.memoizedState=null,f.updateQueue=null,f.dependencies=null,f.stateNode=null):(f.childLanes=g.childLanes,f.lanes=g.lanes,f.child=g.child,f.memoizedProps=g.memoizedProps,f.memoizedState=g.memoizedState,f.updateQueue=g.updateQueue,f.type=g.type,a=g.dependencies,
f.dependencies=null===a?null:{lanes:a.lanes,firstContext:a.firstContext}),c=c.sibling;I(P,P.current&1|2);return b.child}a=a.sibling}null!==d.tail&&O()>Ji&&(b.flags|=64,f=!0,Fi(d,!1),b.lanes=33554432)}else{if(!f)if(a=ih(g),null!==a){if(b.flags|=64,f=!0,c=a.updateQueue,null!==c&&(b.updateQueue=c,b.flags|=4),Fi(d,!0),null===d.tail&&"hidden"===d.tailMode&&!g.alternate&&!lh)return b=b.lastEffect=d.lastEffect,null!==b&&(b.nextEffect=null),null}else 2*O()-d.renderingStartTime>Ji&&1073741824!==c&&(b.flags|=
64,f=!0,Fi(d,!1),b.lanes=33554432);d.isBackwards?(g.sibling=b.child,b.child=g):(c=d.last,null!==c?c.sibling=g:b.child=g,d.last=g)}return null!==d.tail?(c=d.tail,d.rendering=c,d.tail=c.sibling,d.lastEffect=b.lastEffect,d.renderingStartTime=O(),c.sibling=null,b=P.current,I(P,f?b&1|2:b&1),c):null;case 23:case 24:return Ki(),null!==a&&null!==a.memoizedState!==(null!==b.memoizedState)&&"unstable-defer-without-hiding"!==d.mode&&(b.flags|=4),null}throw Error(y(156,b.tag));}
function Li(a){switch(a.tag){case 1:Ff(a.type)&&Gf();var b=a.flags;return b&4096?(a.flags=b&-4097|64,a):null;case 3:fh();H(N);H(M);uh();b=a.flags;if(0!==(b&64))throw Error(y(285));a.flags=b&-4097|64;return a;case 5:return hh(a),null;case 13:return H(P),b=a.flags,b&4096?(a.flags=b&-4097|64,a):null;case 19:return H(P),null;case 4:return fh(),null;case 10:return rg(a),null;case 23:case 24:return Ki(),null;default:return null}}
function Mi(a,b){try{var c="",d=b;do c+=Qa(d),d=d.return;while(d);var e=c}catch(f){e="\nError generating stack: "+f.message+"\n"+f.stack}return{value:a,source:b,stack:e}}function Ni(a,b){try{console.error(b.value)}catch(c){setTimeout(function(){throw c;})}}var Oi="function"===typeof WeakMap?WeakMap:Map;function Pi(a,b,c){c=zg(-1,c);c.tag=3;c.payload={element:null};var d=b.value;c.callback=function(){Qi||(Qi=!0,Ri=d);Ni(a,b)};return c}
function Si(a,b,c){c=zg(-1,c);c.tag=3;var d=a.type.getDerivedStateFromError;if("function"===typeof d){var e=b.value;c.payload=function(){Ni(a,b);return d(e)}}var f=a.stateNode;null!==f&&"function"===typeof f.componentDidCatch&&(c.callback=function(){"function"!==typeof d&&(null===Ti?Ti=new Set([this]):Ti.add(this),Ni(a,b));var c=b.stack;this.componentDidCatch(b.value,{componentStack:null!==c?c:""})});return c}var Ui="function"===typeof WeakSet?WeakSet:Set;
function Vi(a){var b=a.ref;if(null!==b)if("function"===typeof b)try{b(null)}catch(c){Wi(a,c)}else b.current=null}function Xi(a,b){switch(b.tag){case 0:case 11:case 15:case 22:return;case 1:if(b.flags&256&&null!==a){var c=a.memoizedProps,d=a.memoizedState;a=b.stateNode;b=a.getSnapshotBeforeUpdate(b.elementType===b.type?c:lg(b.type,c),d);a.__reactInternalSnapshotBeforeUpdate=b}return;case 3:b.flags&256&&qf(b.stateNode.containerInfo);return;case 5:case 6:case 4:case 17:return}throw Error(y(163));}
function Yi(a,b,c){switch(c.tag){case 0:case 11:case 15:case 22:b=c.updateQueue;b=null!==b?b.lastEffect:null;if(null!==b){a=b=b.next;do{if(3===(a.tag&3)){var d=a.create;a.destroy=d()}a=a.next}while(a!==b)}b=c.updateQueue;b=null!==b?b.lastEffect:null;if(null!==b){a=b=b.next;do{var e=a;d=e.next;e=e.tag;0!==(e&4)&&0!==(e&1)&&(Zi(c,a),$i(c,a));a=d}while(a!==b)}return;case 1:a=c.stateNode;c.flags&4&&(null===b?a.componentDidMount():(d=c.elementType===c.type?b.memoizedProps:lg(c.type,b.memoizedProps),a.componentDidUpdate(d,
b.memoizedState,a.__reactInternalSnapshotBeforeUpdate)));b=c.updateQueue;null!==b&&Eg(c,b,a);return;case 3:b=c.updateQueue;if(null!==b){a=null;if(null!==c.child)switch(c.child.tag){case 5:a=c.child.stateNode;break;case 1:a=c.child.stateNode}Eg(c,b,a)}return;case 5:a=c.stateNode;null===b&&c.flags&4&&mf(c.type,c.memoizedProps)&&a.focus();return;case 6:return;case 4:return;case 12:return;case 13:null===c.memoizedState&&(c=c.alternate,null!==c&&(c=c.memoizedState,null!==c&&(c=c.dehydrated,null!==c&&Cc(c))));
return;case 19:case 17:case 20:case 21:case 23:case 24:return}throw Error(y(163));}
function aj(a,b){for(var c=a;;){if(5===c.tag){var d=c.stateNode;if(b)d=d.style,"function"===typeof d.setProperty?d.setProperty("display","none","important"):d.display="none";else{d=c.stateNode;var e=c.memoizedProps.style;e=void 0!==e&&null!==e&&e.hasOwnProperty("display")?e.display:null;d.style.display=sb("display",e)}}else if(6===c.tag)c.stateNode.nodeValue=b?"":c.memoizedProps;else if((23!==c.tag&&24!==c.tag||null===c.memoizedState||c===a)&&null!==c.child){c.child.return=c;c=c.child;continue}if(c===
a)break;for(;null===c.sibling;){if(null===c.return||c.return===a)return;c=c.return}c.sibling.return=c.return;c=c.sibling}}
function bj(a,b){if(Mf&&"function"===typeof Mf.onCommitFiberUnmount)try{Mf.onCommitFiberUnmount(Lf,b)}catch(f){}switch(b.tag){case 0:case 11:case 14:case 15:case 22:a=b.updateQueue;if(null!==a&&(a=a.lastEffect,null!==a)){var c=a=a.next;do{var d=c,e=d.destroy;d=d.tag;if(void 0!==e)if(0!==(d&4))Zi(b,c);else{d=b;try{e()}catch(f){Wi(d,f)}}c=c.next}while(c!==a)}break;case 1:Vi(b);a=b.stateNode;if("function"===typeof a.componentWillUnmount)try{a.props=b.memoizedProps,a.state=b.memoizedState,a.componentWillUnmount()}catch(f){Wi(b,
f)}break;case 5:Vi(b);break;case 4:cj(a,b)}}function dj(a){a.alternate=null;a.child=null;a.dependencies=null;a.firstEffect=null;a.lastEffect=null;a.memoizedProps=null;a.memoizedState=null;a.pendingProps=null;a.return=null;a.updateQueue=null}function ej(a){return 5===a.tag||3===a.tag||4===a.tag}
function fj(a){a:{for(var b=a.return;null!==b;){if(ej(b))break a;b=b.return}throw Error(y(160));}var c=b;b=c.stateNode;switch(c.tag){case 5:var d=!1;break;case 3:b=b.containerInfo;d=!0;break;case 4:b=b.containerInfo;d=!0;break;default:throw Error(y(161));}c.flags&16&&(pb(b,""),c.flags&=-17);a:b:for(c=a;;){for(;null===c.sibling;){if(null===c.return||ej(c.return)){c=null;break a}c=c.return}c.sibling.return=c.return;for(c=c.sibling;5!==c.tag&&6!==c.tag&&18!==c.tag;){if(c.flags&2)continue b;if(null===
c.child||4===c.tag)continue b;else c.child.return=c,c=c.child}if(!(c.flags&2)){c=c.stateNode;break a}}d?gj(a,c,b):hj(a,c,b)}
function gj(a,b,c){var d=a.tag,e=5===d||6===d;if(e)a=e?a.stateNode:a.stateNode.instance,b?8===c.nodeType?c.parentNode.insertBefore(a,b):c.insertBefore(a,b):(8===c.nodeType?(b=c.parentNode,b.insertBefore(a,c)):(b=c,b.appendChild(a)),c=c._reactRootContainer,null!==c&&void 0!==c||null!==b.onclick||(b.onclick=jf));else if(4!==d&&(a=a.child,null!==a))for(gj(a,b,c),a=a.sibling;null!==a;)gj(a,b,c),a=a.sibling}
function hj(a,b,c){var d=a.tag,e=5===d||6===d;if(e)a=e?a.stateNode:a.stateNode.instance,b?c.insertBefore(a,b):c.appendChild(a);else if(4!==d&&(a=a.child,null!==a))for(hj(a,b,c),a=a.sibling;null!==a;)hj(a,b,c),a=a.sibling}
function cj(a,b){for(var c=b,d=!1,e,f;;){if(!d){d=c.return;a:for(;;){if(null===d)throw Error(y(160));e=d.stateNode;switch(d.tag){case 5:f=!1;break a;case 3:e=e.containerInfo;f=!0;break a;case 4:e=e.containerInfo;f=!0;break a}d=d.return}d=!0}if(5===c.tag||6===c.tag){a:for(var g=a,h=c,k=h;;)if(bj(g,k),null!==k.child&&4!==k.tag)k.child.return=k,k=k.child;else{if(k===h)break a;for(;null===k.sibling;){if(null===k.return||k.return===h)break a;k=k.return}k.sibling.return=k.return;k=k.sibling}f?(g=e,h=c.stateNode,
8===g.nodeType?g.parentNode.removeChild(h):g.removeChild(h)):e.removeChild(c.stateNode)}else if(4===c.tag){if(null!==c.child){e=c.stateNode.containerInfo;f=!0;c.child.return=c;c=c.child;continue}}else if(bj(a,c),null!==c.child){c.child.return=c;c=c.child;continue}if(c===b)break;for(;null===c.sibling;){if(null===c.return||c.return===b)return;c=c.return;4===c.tag&&(d=!1)}c.sibling.return=c.return;c=c.sibling}}
function ij(a,b){switch(b.tag){case 0:case 11:case 14:case 15:case 22:var c=b.updateQueue;c=null!==c?c.lastEffect:null;if(null!==c){var d=c=c.next;do 3===(d.tag&3)&&(a=d.destroy,d.destroy=void 0,void 0!==a&&a()),d=d.next;while(d!==c)}return;case 1:return;case 5:c=b.stateNode;if(null!=c){d=b.memoizedProps;var e=null!==a?a.memoizedProps:d;a=b.type;var f=b.updateQueue;b.updateQueue=null;if(null!==f){c[xf]=d;"input"===a&&"radio"===d.type&&null!=d.name&&$a(c,d);wb(a,e);b=wb(a,d);for(e=0;e<f.length;e+=
2){var g=f[e],h=f[e+1];"style"===g?tb(c,h):"dangerouslySetInnerHTML"===g?ob(c,h):"children"===g?pb(c,h):qa(c,g,h,b)}switch(a){case "input":ab(c,d);break;case "textarea":ib(c,d);break;case "select":a=c._wrapperState.wasMultiple,c._wrapperState.wasMultiple=!!d.multiple,f=d.value,null!=f?fb(c,!!d.multiple,f,!1):a!==!!d.multiple&&(null!=d.defaultValue?fb(c,!!d.multiple,d.defaultValue,!0):fb(c,!!d.multiple,d.multiple?[]:"",!1))}}}return;case 6:if(null===b.stateNode)throw Error(y(162));b.stateNode.nodeValue=
b.memoizedProps;return;case 3:c=b.stateNode;c.hydrate&&(c.hydrate=!1,Cc(c.containerInfo));return;case 12:return;case 13:null!==b.memoizedState&&(jj=O(),aj(b.child,!0));kj(b);return;case 19:kj(b);return;case 17:return;case 23:case 24:aj(b,null!==b.memoizedState);return}throw Error(y(163));}function kj(a){var b=a.updateQueue;if(null!==b){a.updateQueue=null;var c=a.stateNode;null===c&&(c=a.stateNode=new Ui);b.forEach(function(b){var d=lj.bind(null,a,b);c.has(b)||(c.add(b),b.then(d,d))})}}
function mj(a,b){return null!==a&&(a=a.memoizedState,null===a||null!==a.dehydrated)?(b=b.memoizedState,null!==b&&null===b.dehydrated):!1}var nj=Math.ceil,oj=ra.ReactCurrentDispatcher,pj=ra.ReactCurrentOwner,X=0,U=null,Y=null,W=0,qj=0,rj=Bf(0),V=0,sj=null,tj=0,Dg=0,Hi=0,uj=0,vj=null,jj=0,Ji=Infinity;function wj(){Ji=O()+500}var Z=null,Qi=!1,Ri=null,Ti=null,xj=!1,yj=null,zj=90,Aj=[],Bj=[],Cj=null,Dj=0,Ej=null,Fj=-1,Gj=0,Hj=0,Ij=null,Jj=!1;function Hg(){return 0!==(X&48)?O():-1!==Fj?Fj:Fj=O()}
function Ig(a){a=a.mode;if(0===(a&2))return 1;if(0===(a&4))return 99===eg()?1:2;0===Gj&&(Gj=tj);if(0!==kg.transition){0!==Hj&&(Hj=null!==vj?vj.pendingLanes:0);a=Gj;var b=4186112&~Hj;b&=-b;0===b&&(a=4186112&~a,b=a&-a,0===b&&(b=8192));return b}a=eg();0!==(X&4)&&98===a?a=Xc(12,Gj):(a=Sc(a),a=Xc(a,Gj));return a}
function Jg(a,b,c){if(50<Dj)throw Dj=0,Ej=null,Error(y(185));a=Kj(a,b);if(null===a)return null;$c(a,b,c);a===U&&(Hi|=b,4===V&&Ii(a,W));var d=eg();1===b?0!==(X&8)&&0===(X&48)?Lj(a):(Mj(a,c),0===X&&(wj(),ig())):(0===(X&4)||98!==d&&99!==d||(null===Cj?Cj=new Set([a]):Cj.add(a)),Mj(a,c));vj=a}function Kj(a,b){a.lanes|=b;var c=a.alternate;null!==c&&(c.lanes|=b);c=a;for(a=a.return;null!==a;)a.childLanes|=b,c=a.alternate,null!==c&&(c.childLanes|=b),c=a,a=a.return;return 3===c.tag?c.stateNode:null}
function Mj(a,b){for(var c=a.callbackNode,d=a.suspendedLanes,e=a.pingedLanes,f=a.expirationTimes,g=a.pendingLanes;0<g;){var h=31-Vc(g),k=1<<h,l=f[h];if(-1===l){if(0===(k&d)||0!==(k&e)){l=b;Rc(k);var n=F;f[h]=10<=n?l+250:6<=n?l+5E3:-1}}else l<=b&&(a.expiredLanes|=k);g&=~k}d=Uc(a,a===U?W:0);b=F;if(0===d)null!==c&&(c!==Zf&&Pf(c),a.callbackNode=null,a.callbackPriority=0);else{if(null!==c){if(a.callbackPriority===b)return;c!==Zf&&Pf(c)}15===b?(c=Lj.bind(null,a),null===ag?(ag=[c],bg=Of(Uf,jg)):ag.push(c),
c=Zf):14===b?c=hg(99,Lj.bind(null,a)):(c=Tc(b),c=hg(c,Nj.bind(null,a)));a.callbackPriority=b;a.callbackNode=c}}
function Nj(a){Fj=-1;Hj=Gj=0;if(0!==(X&48))throw Error(y(327));var b=a.callbackNode;if(Oj()&&a.callbackNode!==b)return null;var c=Uc(a,a===U?W:0);if(0===c)return null;var d=c;var e=X;X|=16;var f=Pj();if(U!==a||W!==d)wj(),Qj(a,d);do try{Rj();break}catch(h){Sj(a,h)}while(1);qg();oj.current=f;X=e;null!==Y?d=0:(U=null,W=0,d=V);if(0!==(tj&Hi))Qj(a,0);else if(0!==d){2===d&&(X|=64,a.hydrate&&(a.hydrate=!1,qf(a.containerInfo)),c=Wc(a),0!==c&&(d=Tj(a,c)));if(1===d)throw b=sj,Qj(a,0),Ii(a,c),Mj(a,O()),b;a.finishedWork=
a.current.alternate;a.finishedLanes=c;switch(d){case 0:case 1:throw Error(y(345));case 2:Uj(a);break;case 3:Ii(a,c);if((c&62914560)===c&&(d=jj+500-O(),10<d)){if(0!==Uc(a,0))break;e=a.suspendedLanes;if((e&c)!==c){Hg();a.pingedLanes|=a.suspendedLanes&e;break}a.timeoutHandle=of(Uj.bind(null,a),d);break}Uj(a);break;case 4:Ii(a,c);if((c&4186112)===c)break;d=a.eventTimes;for(e=-1;0<c;){var g=31-Vc(c);f=1<<g;g=d[g];g>e&&(e=g);c&=~f}c=e;c=O()-c;c=(120>c?120:480>c?480:1080>c?1080:1920>c?1920:3E3>c?3E3:4320>
c?4320:1960*nj(c/1960))-c;if(10<c){a.timeoutHandle=of(Uj.bind(null,a),c);break}Uj(a);break;case 5:Uj(a);break;default:throw Error(y(329));}}Mj(a,O());return a.callbackNode===b?Nj.bind(null,a):null}function Ii(a,b){b&=~uj;b&=~Hi;a.suspendedLanes|=b;a.pingedLanes&=~b;for(a=a.expirationTimes;0<b;){var c=31-Vc(b),d=1<<c;a[c]=-1;b&=~d}}
function Lj(a){if(0!==(X&48))throw Error(y(327));Oj();if(a===U&&0!==(a.expiredLanes&W)){var b=W;var c=Tj(a,b);0!==(tj&Hi)&&(b=Uc(a,b),c=Tj(a,b))}else b=Uc(a,0),c=Tj(a,b);0!==a.tag&&2===c&&(X|=64,a.hydrate&&(a.hydrate=!1,qf(a.containerInfo)),b=Wc(a),0!==b&&(c=Tj(a,b)));if(1===c)throw c=sj,Qj(a,0),Ii(a,b),Mj(a,O()),c;a.finishedWork=a.current.alternate;a.finishedLanes=b;Uj(a);Mj(a,O());return null}
function Vj(){if(null!==Cj){var a=Cj;Cj=null;a.forEach(function(a){a.expiredLanes|=24&a.pendingLanes;Mj(a,O())})}ig()}function Wj(a,b){var c=X;X|=1;try{return a(b)}finally{X=c,0===X&&(wj(),ig())}}function Xj(a,b){var c=X;X&=-2;X|=8;try{return a(b)}finally{X=c,0===X&&(wj(),ig())}}function ni(a,b){I(rj,qj);qj|=b;tj|=b}function Ki(){qj=rj.current;H(rj)}
function Qj(a,b){a.finishedWork=null;a.finishedLanes=0;var c=a.timeoutHandle;-1!==c&&(a.timeoutHandle=-1,pf(c));if(null!==Y)for(c=Y.return;null!==c;){var d=c;switch(d.tag){case 1:d=d.type.childContextTypes;null!==d&&void 0!==d&&Gf();break;case 3:fh();H(N);H(M);uh();break;case 5:hh(d);break;case 4:fh();break;case 13:H(P);break;case 19:H(P);break;case 10:rg(d);break;case 23:case 24:Ki()}c=c.return}U=a;Y=Tg(a.current,null);W=qj=tj=b;V=0;sj=null;uj=Hi=Dg=0}
function Sj(a,b){do{var c=Y;try{qg();vh.current=Gh;if(yh){for(var d=R.memoizedState;null!==d;){var e=d.queue;null!==e&&(e.pending=null);d=d.next}yh=!1}xh=0;T=S=R=null;zh=!1;pj.current=null;if(null===c||null===c.return){V=1;sj=b;Y=null;break}a:{var f=a,g=c.return,h=c,k=b;b=W;h.flags|=2048;h.firstEffect=h.lastEffect=null;if(null!==k&&"object"===typeof k&&"function"===typeof k.then){var l=k;if(0===(h.mode&2)){var n=h.alternate;n?(h.updateQueue=n.updateQueue,h.memoizedState=n.memoizedState,h.lanes=n.lanes):
(h.updateQueue=null,h.memoizedState=null)}var A=0!==(P.current&1),p=g;do{var C;if(C=13===p.tag){var x=p.memoizedState;if(null!==x)C=null!==x.dehydrated?!0:!1;else{var w=p.memoizedProps;C=void 0===w.fallback?!1:!0!==w.unstable_avoidThisFallback?!0:A?!1:!0}}if(C){var z=p.updateQueue;if(null===z){var u=new Set;u.add(l);p.updateQueue=u}else z.add(l);if(0===(p.mode&2)){p.flags|=64;h.flags|=16384;h.flags&=-2981;if(1===h.tag)if(null===h.alternate)h.tag=17;else{var t=zg(-1,1);t.tag=2;Ag(h,t)}h.lanes|=1;break a}k=
void 0;h=b;var q=f.pingCache;null===q?(q=f.pingCache=new Oi,k=new Set,q.set(l,k)):(k=q.get(l),void 0===k&&(k=new Set,q.set(l,k)));if(!k.has(h)){k.add(h);var v=Yj.bind(null,f,l,h);l.then(v,v)}p.flags|=4096;p.lanes=b;break a}p=p.return}while(null!==p);k=Error((Ra(h.type)||"A React component")+" suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display.")}5!==V&&(V=2);k=Mi(k,h);p=
g;do{switch(p.tag){case 3:f=k;p.flags|=4096;b&=-b;p.lanes|=b;var J=Pi(p,f,b);Bg(p,J);break a;case 1:f=k;var K=p.type,Q=p.stateNode;if(0===(p.flags&64)&&("function"===typeof K.getDerivedStateFromError||null!==Q&&"function"===typeof Q.componentDidCatch&&(null===Ti||!Ti.has(Q)))){p.flags|=4096;b&=-b;p.lanes|=b;var L=Si(p,f,b);Bg(p,L);break a}}p=p.return}while(null!==p)}Zj(c)}catch(va){b=va;Y===c&&null!==c&&(Y=c=c.return);continue}break}while(1)}
function Pj(){var a=oj.current;oj.current=Gh;return null===a?Gh:a}function Tj(a,b){var c=X;X|=16;var d=Pj();U===a&&W===b||Qj(a,b);do try{ak();break}catch(e){Sj(a,e)}while(1);qg();X=c;oj.current=d;if(null!==Y)throw Error(y(261));U=null;W=0;return V}function ak(){for(;null!==Y;)bk(Y)}function Rj(){for(;null!==Y&&!Qf();)bk(Y)}function bk(a){var b=ck(a.alternate,a,qj);a.memoizedProps=a.pendingProps;null===b?Zj(a):Y=b;pj.current=null}
function Zj(a){var b=a;do{var c=b.alternate;a=b.return;if(0===(b.flags&2048)){c=Gi(c,b,qj);if(null!==c){Y=c;return}c=b;if(24!==c.tag&&23!==c.tag||null===c.memoizedState||0!==(qj&1073741824)||0===(c.mode&4)){for(var d=0,e=c.child;null!==e;)d|=e.lanes|e.childLanes,e=e.sibling;c.childLanes=d}null!==a&&0===(a.flags&2048)&&(null===a.firstEffect&&(a.firstEffect=b.firstEffect),null!==b.lastEffect&&(null!==a.lastEffect&&(a.lastEffect.nextEffect=b.firstEffect),a.lastEffect=b.lastEffect),1<b.flags&&(null!==
a.lastEffect?a.lastEffect.nextEffect=b:a.firstEffect=b,a.lastEffect=b))}else{c=Li(b);if(null!==c){c.flags&=2047;Y=c;return}null!==a&&(a.firstEffect=a.lastEffect=null,a.flags|=2048)}b=b.sibling;if(null!==b){Y=b;return}Y=b=a}while(null!==b);0===V&&(V=5)}function Uj(a){var b=eg();gg(99,dk.bind(null,a,b));return null}
function dk(a,b){do Oj();while(null!==yj);if(0!==(X&48))throw Error(y(327));var c=a.finishedWork;if(null===c)return null;a.finishedWork=null;a.finishedLanes=0;if(c===a.current)throw Error(y(177));a.callbackNode=null;var d=c.lanes|c.childLanes,e=d,f=a.pendingLanes&~e;a.pendingLanes=e;a.suspendedLanes=0;a.pingedLanes=0;a.expiredLanes&=e;a.mutableReadLanes&=e;a.entangledLanes&=e;e=a.entanglements;for(var g=a.eventTimes,h=a.expirationTimes;0<f;){var k=31-Vc(f),l=1<<k;e[k]=0;g[k]=-1;h[k]=-1;f&=~l}null!==
Cj&&0===(d&24)&&Cj.has(a)&&Cj.delete(a);a===U&&(Y=U=null,W=0);1<c.flags?null!==c.lastEffect?(c.lastEffect.nextEffect=c,d=c.firstEffect):d=c:d=c.firstEffect;if(null!==d){e=X;X|=32;pj.current=null;kf=fd;g=Ne();if(Oe(g)){if("selectionStart"in g)h={start:g.selectionStart,end:g.selectionEnd};else a:if(h=(h=g.ownerDocument)&&h.defaultView||window,(l=h.getSelection&&h.getSelection())&&0!==l.rangeCount){h=l.anchorNode;f=l.anchorOffset;k=l.focusNode;l=l.focusOffset;try{h.nodeType,k.nodeType}catch(va){h=null;
break a}var n=0,A=-1,p=-1,C=0,x=0,w=g,z=null;b:for(;;){for(var u;;){w!==h||0!==f&&3!==w.nodeType||(A=n+f);w!==k||0!==l&&3!==w.nodeType||(p=n+l);3===w.nodeType&&(n+=w.nodeValue.length);if(null===(u=w.firstChild))break;z=w;w=u}for(;;){if(w===g)break b;z===h&&++C===f&&(A=n);z===k&&++x===l&&(p=n);if(null!==(u=w.nextSibling))break;w=z;z=w.parentNode}w=u}h=-1===A||-1===p?null:{start:A,end:p}}else h=null;h=h||{start:0,end:0}}else h=null;lf={focusedElem:g,selectionRange:h};fd=!1;Ij=null;Jj=!1;Z=d;do try{ek()}catch(va){if(null===
Z)throw Error(y(330));Wi(Z,va);Z=Z.nextEffect}while(null!==Z);Ij=null;Z=d;do try{for(g=a;null!==Z;){var t=Z.flags;t&16&&pb(Z.stateNode,"");if(t&128){var q=Z.alternate;if(null!==q){var v=q.ref;null!==v&&("function"===typeof v?v(null):v.current=null)}}switch(t&1038){case 2:fj(Z);Z.flags&=-3;break;case 6:fj(Z);Z.flags&=-3;ij(Z.alternate,Z);break;case 1024:Z.flags&=-1025;break;case 1028:Z.flags&=-1025;ij(Z.alternate,Z);break;case 4:ij(Z.alternate,Z);break;case 8:h=Z;cj(g,h);var J=h.alternate;dj(h);null!==
J&&dj(J)}Z=Z.nextEffect}}catch(va){if(null===Z)throw Error(y(330));Wi(Z,va);Z=Z.nextEffect}while(null!==Z);v=lf;q=Ne();t=v.focusedElem;g=v.selectionRange;if(q!==t&&t&&t.ownerDocument&&Me(t.ownerDocument.documentElement,t)){null!==g&&Oe(t)&&(q=g.start,v=g.end,void 0===v&&(v=q),"selectionStart"in t?(t.selectionStart=q,t.selectionEnd=Math.min(v,t.value.length)):(v=(q=t.ownerDocument||document)&&q.defaultView||window,v.getSelection&&(v=v.getSelection(),h=t.textContent.length,J=Math.min(g.start,h),g=void 0===
g.end?J:Math.min(g.end,h),!v.extend&&J>g&&(h=g,g=J,J=h),h=Le(t,J),f=Le(t,g),h&&f&&(1!==v.rangeCount||v.anchorNode!==h.node||v.anchorOffset!==h.offset||v.focusNode!==f.node||v.focusOffset!==f.offset)&&(q=q.createRange(),q.setStart(h.node,h.offset),v.removeAllRanges(),J>g?(v.addRange(q),v.extend(f.node,f.offset)):(q.setEnd(f.node,f.offset),v.addRange(q))))));q=[];for(v=t;v=v.parentNode;)1===v.nodeType&&q.push({element:v,left:v.scrollLeft,top:v.scrollTop});"function"===typeof t.focus&&t.focus();for(t=
0;t<q.length;t++)v=q[t],v.element.scrollLeft=v.left,v.element.scrollTop=v.top}fd=!!kf;lf=kf=null;a.current=c;Z=d;do try{for(t=a;null!==Z;){var K=Z.flags;K&36&&Yi(t,Z.alternate,Z);if(K&128){q=void 0;var Q=Z.ref;if(null!==Q){var L=Z.stateNode;switch(Z.tag){case 5:q=L;break;default:q=L}"function"===typeof Q?Q(q):Q.current=q}}Z=Z.nextEffect}}catch(va){if(null===Z)throw Error(y(330));Wi(Z,va);Z=Z.nextEffect}while(null!==Z);Z=null;$f();X=e}else a.current=c;if(xj)xj=!1,yj=a,zj=b;else for(Z=d;null!==Z;)b=
Z.nextEffect,Z.nextEffect=null,Z.flags&8&&(K=Z,K.sibling=null,K.stateNode=null),Z=b;d=a.pendingLanes;0===d&&(Ti=null);1===d?a===Ej?Dj++:(Dj=0,Ej=a):Dj=0;c=c.stateNode;if(Mf&&"function"===typeof Mf.onCommitFiberRoot)try{Mf.onCommitFiberRoot(Lf,c,void 0,64===(c.current.flags&64))}catch(va){}Mj(a,O());if(Qi)throw Qi=!1,a=Ri,Ri=null,a;if(0!==(X&8))return null;ig();return null}
function ek(){for(;null!==Z;){var a=Z.alternate;Jj||null===Ij||(0!==(Z.flags&8)?dc(Z,Ij)&&(Jj=!0):13===Z.tag&&mj(a,Z)&&dc(Z,Ij)&&(Jj=!0));var b=Z.flags;0!==(b&256)&&Xi(a,Z);0===(b&512)||xj||(xj=!0,hg(97,function(){Oj();return null}));Z=Z.nextEffect}}function Oj(){if(90!==zj){var a=97<zj?97:zj;zj=90;return gg(a,fk)}return!1}function $i(a,b){Aj.push(b,a);xj||(xj=!0,hg(97,function(){Oj();return null}))}function Zi(a,b){Bj.push(b,a);xj||(xj=!0,hg(97,function(){Oj();return null}))}
function fk(){if(null===yj)return!1;var a=yj;yj=null;if(0!==(X&48))throw Error(y(331));var b=X;X|=32;var c=Bj;Bj=[];for(var d=0;d<c.length;d+=2){var e=c[d],f=c[d+1],g=e.destroy;e.destroy=void 0;if("function"===typeof g)try{g()}catch(k){if(null===f)throw Error(y(330));Wi(f,k)}}c=Aj;Aj=[];for(d=0;d<c.length;d+=2){e=c[d];f=c[d+1];try{var h=e.create;e.destroy=h()}catch(k){if(null===f)throw Error(y(330));Wi(f,k)}}for(h=a.current.firstEffect;null!==h;)a=h.nextEffect,h.nextEffect=null,h.flags&8&&(h.sibling=
null,h.stateNode=null),h=a;X=b;ig();return!0}function gk(a,b,c){b=Mi(c,b);b=Pi(a,b,1);Ag(a,b);b=Hg();a=Kj(a,1);null!==a&&($c(a,1,b),Mj(a,b))}
function Wi(a,b){if(3===a.tag)gk(a,a,b);else for(var c=a.return;null!==c;){if(3===c.tag){gk(c,a,b);break}else if(1===c.tag){var d=c.stateNode;if("function"===typeof c.type.getDerivedStateFromError||"function"===typeof d.componentDidCatch&&(null===Ti||!Ti.has(d))){a=Mi(b,a);var e=Si(c,a,1);Ag(c,e);e=Hg();c=Kj(c,1);if(null!==c)$c(c,1,e),Mj(c,e);else if("function"===typeof d.componentDidCatch&&(null===Ti||!Ti.has(d)))try{d.componentDidCatch(b,a)}catch(f){}break}}c=c.return}}
function Yj(a,b,c){var d=a.pingCache;null!==d&&d.delete(b);b=Hg();a.pingedLanes|=a.suspendedLanes&c;U===a&&(W&c)===c&&(4===V||3===V&&(W&62914560)===W&&500>O()-jj?Qj(a,0):uj|=c);Mj(a,b)}function lj(a,b){var c=a.stateNode;null!==c&&c.delete(b);b=0;0===b&&(b=a.mode,0===(b&2)?b=1:0===(b&4)?b=99===eg()?1:2:(0===Gj&&(Gj=tj),b=Yc(62914560&~Gj),0===b&&(b=4194304)));c=Hg();a=Kj(a,b);null!==a&&($c(a,b,c),Mj(a,c))}var ck;
ck=function(a,b,c){var d=b.lanes;if(null!==a)if(a.memoizedProps!==b.pendingProps||N.current)ug=!0;else if(0!==(c&d))ug=0!==(a.flags&16384)?!0:!1;else{ug=!1;switch(b.tag){case 3:ri(b);sh();break;case 5:gh(b);break;case 1:Ff(b.type)&&Jf(b);break;case 4:eh(b,b.stateNode.containerInfo);break;case 10:d=b.memoizedProps.value;var e=b.type._context;I(mg,e._currentValue);e._currentValue=d;break;case 13:if(null!==b.memoizedState){if(0!==(c&b.child.childLanes))return ti(a,b,c);I(P,P.current&1);b=hi(a,b,c);return null!==
b?b.sibling:null}I(P,P.current&1);break;case 19:d=0!==(c&b.childLanes);if(0!==(a.flags&64)){if(d)return Ai(a,b,c);b.flags|=64}e=b.memoizedState;null!==e&&(e.rendering=null,e.tail=null,e.lastEffect=null);I(P,P.current);if(d)break;else return null;case 23:case 24:return b.lanes=0,mi(a,b,c)}return hi(a,b,c)}else ug=!1;b.lanes=0;switch(b.tag){case 2:d=b.type;null!==a&&(a.alternate=null,b.alternate=null,b.flags|=2);a=b.pendingProps;e=Ef(b,M.current);tg(b,c);e=Ch(null,b,d,a,e,c);b.flags|=1;if("object"===
typeof e&&null!==e&&"function"===typeof e.render&&void 0===e.$$typeof){b.tag=1;b.memoizedState=null;b.updateQueue=null;if(Ff(d)){var f=!0;Jf(b)}else f=!1;b.memoizedState=null!==e.state&&void 0!==e.state?e.state:null;xg(b);var g=d.getDerivedStateFromProps;"function"===typeof g&&Gg(b,d,g,a);e.updater=Kg;b.stateNode=e;e._reactInternals=b;Og(b,d,a,c);b=qi(null,b,d,!0,f,c)}else b.tag=0,fi(null,b,e,c),b=b.child;return b;case 16:e=b.elementType;a:{null!==a&&(a.alternate=null,b.alternate=null,b.flags|=2);
a=b.pendingProps;f=e._init;e=f(e._payload);b.type=e;f=b.tag=hk(e);a=lg(e,a);switch(f){case 0:b=li(null,b,e,a,c);break a;case 1:b=pi(null,b,e,a,c);break a;case 11:b=gi(null,b,e,a,c);break a;case 14:b=ii(null,b,e,lg(e.type,a),d,c);break a}throw Error(y(306,e,""));}return b;case 0:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:lg(d,e),li(a,b,d,e,c);case 1:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:lg(d,e),pi(a,b,d,e,c);case 3:ri(b);d=b.updateQueue;if(null===a||null===d)throw Error(y(282));
d=b.pendingProps;e=b.memoizedState;e=null!==e?e.element:null;yg(a,b);Cg(b,d,null,c);d=b.memoizedState.element;if(d===e)sh(),b=hi(a,b,c);else{e=b.stateNode;if(f=e.hydrate)kh=rf(b.stateNode.containerInfo.firstChild),jh=b,f=lh=!0;if(f){a=e.mutableSourceEagerHydrationData;if(null!=a)for(e=0;e<a.length;e+=2)f=a[e],f._workInProgressVersionPrimary=a[e+1],th.push(f);c=Zg(b,null,d,c);for(b.child=c;c;)c.flags=c.flags&-3|1024,c=c.sibling}else fi(a,b,d,c),sh();b=b.child}return b;case 5:return gh(b),null===a&&
ph(b),d=b.type,e=b.pendingProps,f=null!==a?a.memoizedProps:null,g=e.children,nf(d,e)?g=null:null!==f&&nf(d,f)&&(b.flags|=16),oi(a,b),fi(a,b,g,c),b.child;case 6:return null===a&&ph(b),null;case 13:return ti(a,b,c);case 4:return eh(b,b.stateNode.containerInfo),d=b.pendingProps,null===a?b.child=Yg(b,null,d,c):fi(a,b,d,c),b.child;case 11:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:lg(d,e),gi(a,b,d,e,c);case 7:return fi(a,b,b.pendingProps,c),b.child;case 8:return fi(a,b,b.pendingProps.children,
c),b.child;case 12:return fi(a,b,b.pendingProps.children,c),b.child;case 10:a:{d=b.type._context;e=b.pendingProps;g=b.memoizedProps;f=e.value;var h=b.type._context;I(mg,h._currentValue);h._currentValue=f;if(null!==g)if(h=g.value,f=He(h,f)?0:("function"===typeof d._calculateChangedBits?d._calculateChangedBits(h,f):1073741823)|0,0===f){if(g.children===e.children&&!N.current){b=hi(a,b,c);break a}}else for(h=b.child,null!==h&&(h.return=b);null!==h;){var k=h.dependencies;if(null!==k){g=h.child;for(var l=
k.firstContext;null!==l;){if(l.context===d&&0!==(l.observedBits&f)){1===h.tag&&(l=zg(-1,c&-c),l.tag=2,Ag(h,l));h.lanes|=c;l=h.alternate;null!==l&&(l.lanes|=c);sg(h.return,c);k.lanes|=c;break}l=l.next}}else g=10===h.tag?h.type===b.type?null:h.child:h.child;if(null!==g)g.return=h;else for(g=h;null!==g;){if(g===b){g=null;break}h=g.sibling;if(null!==h){h.return=g.return;g=h;break}g=g.return}h=g}fi(a,b,e.children,c);b=b.child}return b;case 9:return e=b.type,f=b.pendingProps,d=f.children,tg(b,c),e=vg(e,
f.unstable_observedBits),d=d(e),b.flags|=1,fi(a,b,d,c),b.child;case 14:return e=b.type,f=lg(e,b.pendingProps),f=lg(e.type,f),ii(a,b,e,f,d,c);case 15:return ki(a,b,b.type,b.pendingProps,d,c);case 17:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:lg(d,e),null!==a&&(a.alternate=null,b.alternate=null,b.flags|=2),b.tag=1,Ff(d)?(a=!0,Jf(b)):a=!1,tg(b,c),Mg(b,d,e),Og(b,d,e,c),qi(null,b,d,!0,a,c);case 19:return Ai(a,b,c);case 23:return mi(a,b,c);case 24:return mi(a,b,c)}throw Error(y(156,b.tag));
};function ik(a,b,c,d){this.tag=a;this.key=c;this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null;this.index=0;this.ref=null;this.pendingProps=b;this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null;this.mode=d;this.flags=0;this.lastEffect=this.firstEffect=this.nextEffect=null;this.childLanes=this.lanes=0;this.alternate=null}function nh(a,b,c,d){return new ik(a,b,c,d)}function ji(a){a=a.prototype;return!(!a||!a.isReactComponent)}
function hk(a){if("function"===typeof a)return ji(a)?1:0;if(void 0!==a&&null!==a){a=a.$$typeof;if(a===Aa)return 11;if(a===Da)return 14}return 2}
function Tg(a,b){var c=a.alternate;null===c?(c=nh(a.tag,b,a.key,a.mode),c.elementType=a.elementType,c.type=a.type,c.stateNode=a.stateNode,c.alternate=a,a.alternate=c):(c.pendingProps=b,c.type=a.type,c.flags=0,c.nextEffect=null,c.firstEffect=null,c.lastEffect=null);c.childLanes=a.childLanes;c.lanes=a.lanes;c.child=a.child;c.memoizedProps=a.memoizedProps;c.memoizedState=a.memoizedState;c.updateQueue=a.updateQueue;b=a.dependencies;c.dependencies=null===b?null:{lanes:b.lanes,firstContext:b.firstContext};
c.sibling=a.sibling;c.index=a.index;c.ref=a.ref;return c}
function Vg(a,b,c,d,e,f){var g=2;d=a;if("function"===typeof a)ji(a)&&(g=1);else if("string"===typeof a)g=5;else a:switch(a){case ua:return Xg(c.children,e,f,b);case Ha:g=8;e|=16;break;case wa:g=8;e|=1;break;case xa:return a=nh(12,c,b,e|8),a.elementType=xa,a.type=xa,a.lanes=f,a;case Ba:return a=nh(13,c,b,e),a.type=Ba,a.elementType=Ba,a.lanes=f,a;case Ca:return a=nh(19,c,b,e),a.elementType=Ca,a.lanes=f,a;case Ia:return vi(c,e,f,b);case Ja:return a=nh(24,c,b,e),a.elementType=Ja,a.lanes=f,a;default:if("object"===
typeof a&&null!==a)switch(a.$$typeof){case ya:g=10;break a;case za:g=9;break a;case Aa:g=11;break a;case Da:g=14;break a;case Ea:g=16;d=null;break a;case Fa:g=22;break a}throw Error(y(130,null==a?a:typeof a,""));}b=nh(g,c,b,e);b.elementType=a;b.type=d;b.lanes=f;return b}function Xg(a,b,c,d){a=nh(7,a,d,b);a.lanes=c;return a}function vi(a,b,c,d){a=nh(23,a,d,b);a.elementType=Ia;a.lanes=c;return a}function Ug(a,b,c){a=nh(6,a,null,b);a.lanes=c;return a}
function Wg(a,b,c){b=nh(4,null!==a.children?a.children:[],a.key,b);b.lanes=c;b.stateNode={containerInfo:a.containerInfo,pendingChildren:null,implementation:a.implementation};return b}
function jk(a,b,c){this.tag=b;this.containerInfo=a;this.finishedWork=this.pingCache=this.current=this.pendingChildren=null;this.timeoutHandle=-1;this.pendingContext=this.context=null;this.hydrate=c;this.callbackNode=null;this.callbackPriority=0;this.eventTimes=Zc(0);this.expirationTimes=Zc(-1);this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0;this.entanglements=Zc(0);this.mutableSourceEagerHydrationData=null}
function kk(a,b,c){var d=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return{$$typeof:ta,key:null==d?null:""+d,children:a,containerInfo:b,implementation:c}}
function lk(a,b,c,d){var e=b.current,f=Hg(),g=Ig(e);a:if(c){c=c._reactInternals;b:{if(Zb(c)!==c||1!==c.tag)throw Error(y(170));var h=c;do{switch(h.tag){case 3:h=h.stateNode.context;break b;case 1:if(Ff(h.type)){h=h.stateNode.__reactInternalMemoizedMergedChildContext;break b}}h=h.return}while(null!==h);throw Error(y(171));}if(1===c.tag){var k=c.type;if(Ff(k)){c=If(c,k,h);break a}}c=h}else c=Cf;null===b.context?b.context=c:b.pendingContext=c;b=zg(f,g);b.payload={element:a};d=void 0===d?null:d;null!==
d&&(b.callback=d);Ag(e,b);Jg(e,g,f);return g}function mk(a){a=a.current;if(!a.child)return null;switch(a.child.tag){case 5:return a.child.stateNode;default:return a.child.stateNode}}function nk(a,b){a=a.memoizedState;if(null!==a&&null!==a.dehydrated){var c=a.retryLane;a.retryLane=0!==c&&c<b?c:b}}function ok(a,b){nk(a,b);(a=a.alternate)&&nk(a,b)}function pk(){return null}
function qk(a,b,c){var d=null!=c&&null!=c.hydrationOptions&&c.hydrationOptions.mutableSources||null;c=new jk(a,b,null!=c&&!0===c.hydrate);b=nh(3,null,null,2===b?7:1===b?3:0);c.current=b;b.stateNode=c;xg(b);a[ff]=c.current;cf(8===a.nodeType?a.parentNode:a);if(d)for(a=0;a<d.length;a++){b=d[a];var e=b._getVersion;e=e(b._source);null==c.mutableSourceEagerHydrationData?c.mutableSourceEagerHydrationData=[b,e]:c.mutableSourceEagerHydrationData.push(b,e)}this._internalRoot=c}
qk.prototype.render=function(a){lk(a,this._internalRoot,null,null)};qk.prototype.unmount=function(){var a=this._internalRoot,b=a.containerInfo;lk(null,a,null,function(){b[ff]=null})};function rk(a){return!(!a||1!==a.nodeType&&9!==a.nodeType&&11!==a.nodeType&&(8!==a.nodeType||" react-mount-point-unstable "!==a.nodeValue))}
function sk(a,b){b||(b=a?9===a.nodeType?a.documentElement:a.firstChild:null,b=!(!b||1!==b.nodeType||!b.hasAttribute("data-reactroot")));if(!b)for(var c;c=a.lastChild;)a.removeChild(c);return new qk(a,0,b?{hydrate:!0}:void 0)}
function tk(a,b,c,d,e){var f=c._reactRootContainer;if(f){var g=f._internalRoot;if("function"===typeof e){var h=e;e=function(){var a=mk(g);h.call(a)}}lk(b,g,a,e)}else{f=c._reactRootContainer=sk(c,d);g=f._internalRoot;if("function"===typeof e){var k=e;e=function(){var a=mk(g);k.call(a)}}Xj(function(){lk(b,g,a,e)})}return mk(g)}ec=function(a){if(13===a.tag){var b=Hg();Jg(a,4,b);ok(a,4)}};fc=function(a){if(13===a.tag){var b=Hg();Jg(a,67108864,b);ok(a,67108864)}};
gc=function(a){if(13===a.tag){var b=Hg(),c=Ig(a);Jg(a,c,b);ok(a,c)}};hc=function(a,b){return b()};
yb=function(a,b,c){switch(b){case "input":ab(a,c);b=c.name;if("radio"===c.type&&null!=b){for(c=a;c.parentNode;)c=c.parentNode;c=c.querySelectorAll("input[name="+JSON.stringify(""+b)+'][type="radio"]');for(b=0;b<c.length;b++){var d=c[b];if(d!==a&&d.form===a.form){var e=Db(d);if(!e)throw Error(y(90));Wa(d);ab(d,e)}}}break;case "textarea":ib(a,c);break;case "select":b=c.value,null!=b&&fb(a,!!c.multiple,b,!1)}};Gb=Wj;
Hb=function(a,b,c,d,e){var f=X;X|=4;try{return gg(98,a.bind(null,b,c,d,e))}finally{X=f,0===X&&(wj(),ig())}};Ib=function(){0===(X&49)&&(Vj(),Oj())};Jb=function(a,b){var c=X;X|=2;try{return a(b)}finally{X=c,0===X&&(wj(),ig())}};function uk(a,b){var c=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;if(!rk(b))throw Error(y(200));return kk(a,b,null,c)}var vk={Events:[Cb,ue,Db,Eb,Fb,Oj,{current:!1}]},wk={findFiberByHostInstance:wc,bundleType:0,version:"17.0.2",rendererPackageName:"react-dom"};
var xk={bundleType:wk.bundleType,version:wk.version,rendererPackageName:wk.rendererPackageName,rendererConfig:wk.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:ra.ReactCurrentDispatcher,findHostInstanceByFiber:function(a){a=cc(a);return null===a?null:a.stateNode},findFiberByHostInstance:wk.findFiberByHostInstance||
pk,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null};if("undefined"!==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__){var yk=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!yk.isDisabled&&yk.supportsFiber)try{Lf=yk.inject(xk),Mf=yk}catch(a){}}__webpack_unused_export__=vk;__webpack_unused_export__=uk;
__webpack_unused_export__=function(a){if(null==a)return null;if(1===a.nodeType)return a;var b=a._reactInternals;if(void 0===b){if("function"===typeof a.render)throw Error(y(188));throw Error(y(268,Object.keys(a)));}a=cc(b);a=null===a?null:a.stateNode;return a};__webpack_unused_export__=function(a,b){var c=X;if(0!==(c&48))return a(b);X|=1;try{if(a)return gg(99,a.bind(null,b))}finally{X=c,ig()}};__webpack_unused_export__=function(a,b,c){if(!rk(b))throw Error(y(200));return tk(null,a,b,!0,c)};
__webpack_unused_export__=function(a,b,c){if(!rk(b))throw Error(y(200));return tk(null,a,b,!1,c)};__webpack_unused_export__=function(a){if(!rk(a))throw Error(y(40));return a._reactRootContainer?(Xj(function(){tk(null,null,a,!1,function(){a._reactRootContainer=null;a[ff]=null})}),!0):!1};exports.unstable_batchedUpdates=Wj;__webpack_unused_export__=function(a,b){return uk(a,b,2<arguments.length&&void 0!==arguments[2]?arguments[2]:null)};
__webpack_unused_export__=function(a,b,c,d){if(!rk(c))throw Error(y(200));if(null==a||void 0===a._reactInternals)throw Error(y(38));return tk(a,b,c,!1,d)};__webpack_unused_export__="17.0.2";


/***/ }),

/***/ 788:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function checkDCE() {
  /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
  if (
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined' ||
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== 'function'
  ) {
    return;
  }
  if (false) {}
  try {
    // Verify that the code above has been dead code eliminated (DCE'd).
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (err) {
    // DevTools shouldn't crash React, no matter what.
    // We should still report in case we break this code.
    console.error(err);
  }
}

if (true) {
  // DCE check should happen before ReactDOM bundle executes so that
  // DevTools can report bad minification during injection.
  checkDCE();
  module.exports = __webpack_require__(975);
} else {}


/***/ }),

/***/ 697:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var b="function"===typeof Symbol&&Symbol.for,c=b?Symbol.for("react.element"):60103,d=b?Symbol.for("react.portal"):60106,e=b?Symbol.for("react.fragment"):60107,f=b?Symbol.for("react.strict_mode"):60108,g=b?Symbol.for("react.profiler"):60114,h=b?Symbol.for("react.provider"):60109,k=b?Symbol.for("react.context"):60110,l=b?Symbol.for("react.async_mode"):60111,m=b?Symbol.for("react.concurrent_mode"):60111,n=b?Symbol.for("react.forward_ref"):60112,p=b?Symbol.for("react.suspense"):60113,q=b?
Symbol.for("react.suspense_list"):60120,r=b?Symbol.for("react.memo"):60115,t=b?Symbol.for("react.lazy"):60116,v=b?Symbol.for("react.block"):60121,w=b?Symbol.for("react.fundamental"):60117,x=b?Symbol.for("react.responder"):60118,y=b?Symbol.for("react.scope"):60119;
function z(a){if("object"===typeof a&&null!==a){var u=a.$$typeof;switch(u){case c:switch(a=a.type,a){case l:case m:case e:case g:case f:case p:return a;default:switch(a=a&&a.$$typeof,a){case k:case n:case t:case r:case h:return a;default:return u}}case d:return u}}}function A(a){return z(a)===m}exports.AsyncMode=l;exports.ConcurrentMode=m;exports.ContextConsumer=k;exports.ContextProvider=h;exports.Element=c;exports.ForwardRef=n;exports.Fragment=e;exports.Lazy=t;exports.Memo=r;exports.Portal=d;
exports.Profiler=g;exports.StrictMode=f;exports.Suspense=p;exports.isAsyncMode=function(a){return A(a)||z(a)===l};exports.isConcurrentMode=A;exports.isContextConsumer=function(a){return z(a)===k};exports.isContextProvider=function(a){return z(a)===h};exports.isElement=function(a){return"object"===typeof a&&null!==a&&a.$$typeof===c};exports.isForwardRef=function(a){return z(a)===n};exports.isFragment=function(a){return z(a)===e};exports.isLazy=function(a){return z(a)===t};
exports.isMemo=function(a){return z(a)===r};exports.isPortal=function(a){return z(a)===d};exports.isProfiler=function(a){return z(a)===g};exports.isStrictMode=function(a){return z(a)===f};exports.isSuspense=function(a){return z(a)===p};
exports.isValidElementType=function(a){return"string"===typeof a||"function"===typeof a||a===e||a===m||a===g||a===f||a===p||a===q||"object"===typeof a&&null!==a&&(a.$$typeof===t||a.$$typeof===r||a.$$typeof===h||a.$$typeof===k||a.$$typeof===n||a.$$typeof===w||a.$$typeof===x||a.$$typeof===y||a.$$typeof===v)};exports.typeOf=z;


/***/ }),

/***/ 594:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(697);
} else {}


/***/ }),

/***/ 447:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/** @license React v17.0.2
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var l=__webpack_require__(516),n=60103,p=60106;exports.Fragment=60107;exports.StrictMode=60108;exports.Profiler=60114;var q=60109,r=60110,t=60112;exports.Suspense=60113;var u=60115,v=60116;
if("function"===typeof Symbol&&Symbol.for){var w=Symbol.for;n=w("react.element");p=w("react.portal");exports.Fragment=w("react.fragment");exports.StrictMode=w("react.strict_mode");exports.Profiler=w("react.profiler");q=w("react.provider");r=w("react.context");t=w("react.forward_ref");exports.Suspense=w("react.suspense");u=w("react.memo");v=w("react.lazy")}var x="function"===typeof Symbol&&Symbol.iterator;
function y(a){if(null===a||"object"!==typeof a)return null;a=x&&a[x]||a["@@iterator"];return"function"===typeof a?a:null}function z(a){for(var b="https://reactjs.org/docs/error-decoder.html?invariant="+a,c=1;c<arguments.length;c++)b+="&args[]="+encodeURIComponent(arguments[c]);return"Minified React error #"+a+"; visit "+b+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}
var A={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},B={};function C(a,b,c){this.props=a;this.context=b;this.refs=B;this.updater=c||A}C.prototype.isReactComponent={};C.prototype.setState=function(a,b){if("object"!==typeof a&&"function"!==typeof a&&null!=a)throw Error(z(85));this.updater.enqueueSetState(this,a,b,"setState")};C.prototype.forceUpdate=function(a){this.updater.enqueueForceUpdate(this,a,"forceUpdate")};
function D(){}D.prototype=C.prototype;function E(a,b,c){this.props=a;this.context=b;this.refs=B;this.updater=c||A}var F=E.prototype=new D;F.constructor=E;l(F,C.prototype);F.isPureReactComponent=!0;var G={current:null},H=Object.prototype.hasOwnProperty,I={key:!0,ref:!0,__self:!0,__source:!0};
function J(a,b,c){var e,d={},k=null,h=null;if(null!=b)for(e in void 0!==b.ref&&(h=b.ref),void 0!==b.key&&(k=""+b.key),b)H.call(b,e)&&!I.hasOwnProperty(e)&&(d[e]=b[e]);var g=arguments.length-2;if(1===g)d.children=c;else if(1<g){for(var f=Array(g),m=0;m<g;m++)f[m]=arguments[m+2];d.children=f}if(a&&a.defaultProps)for(e in g=a.defaultProps,g)void 0===d[e]&&(d[e]=g[e]);return{$$typeof:n,type:a,key:k,ref:h,props:d,_owner:G.current}}
function K(a,b){return{$$typeof:n,type:a.type,key:b,ref:a.ref,props:a.props,_owner:a._owner}}function L(a){return"object"===typeof a&&null!==a&&a.$$typeof===n}function escape(a){var b={"=":"=0",":":"=2"};return"$"+a.replace(/[=:]/g,function(a){return b[a]})}var M=/\/+/g;function N(a,b){return"object"===typeof a&&null!==a&&null!=a.key?escape(""+a.key):b.toString(36)}
function O(a,b,c,e,d){var k=typeof a;if("undefined"===k||"boolean"===k)a=null;var h=!1;if(null===a)h=!0;else switch(k){case "string":case "number":h=!0;break;case "object":switch(a.$$typeof){case n:case p:h=!0}}if(h)return h=a,d=d(h),a=""===e?"."+N(h,0):e,Array.isArray(d)?(c="",null!=a&&(c=a.replace(M,"$&/")+"/"),O(d,b,c,"",function(a){return a})):null!=d&&(L(d)&&(d=K(d,c+(!d.key||h&&h.key===d.key?"":(""+d.key).replace(M,"$&/")+"/")+a)),b.push(d)),1;h=0;e=""===e?".":e+":";if(Array.isArray(a))for(var g=
0;g<a.length;g++){k=a[g];var f=e+N(k,g);h+=O(k,b,c,f,d)}else if(f=y(a),"function"===typeof f)for(a=f.call(a),g=0;!(k=a.next()).done;)k=k.value,f=e+N(k,g++),h+=O(k,b,c,f,d);else if("object"===k)throw b=""+a,Error(z(31,"[object Object]"===b?"object with keys {"+Object.keys(a).join(", ")+"}":b));return h}function P(a,b,c){if(null==a)return a;var e=[],d=0;O(a,e,"","",function(a){return b.call(c,a,d++)});return e}
function Q(a){if(-1===a._status){var b=a._result;b=b();a._status=0;a._result=b;b.then(function(b){0===a._status&&(b=b.default,a._status=1,a._result=b)},function(b){0===a._status&&(a._status=2,a._result=b)})}if(1===a._status)return a._result;throw a._result;}var R={current:null};function S(){var a=R.current;if(null===a)throw Error(z(321));return a}var T={ReactCurrentDispatcher:R,ReactCurrentBatchConfig:{transition:0},ReactCurrentOwner:G,IsSomeRendererActing:{current:!1},assign:l};
exports.Children={map:P,forEach:function(a,b,c){P(a,function(){b.apply(this,arguments)},c)},count:function(a){var b=0;P(a,function(){b++});return b},toArray:function(a){return P(a,function(a){return a})||[]},only:function(a){if(!L(a))throw Error(z(143));return a}};exports.Component=C;exports.PureComponent=E;exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=T;
exports.cloneElement=function(a,b,c){if(null===a||void 0===a)throw Error(z(267,a));var e=l({},a.props),d=a.key,k=a.ref,h=a._owner;if(null!=b){void 0!==b.ref&&(k=b.ref,h=G.current);void 0!==b.key&&(d=""+b.key);if(a.type&&a.type.defaultProps)var g=a.type.defaultProps;for(f in b)H.call(b,f)&&!I.hasOwnProperty(f)&&(e[f]=void 0===b[f]&&void 0!==g?g[f]:b[f])}var f=arguments.length-2;if(1===f)e.children=c;else if(1<f){g=Array(f);for(var m=0;m<f;m++)g[m]=arguments[m+2];e.children=g}return{$$typeof:n,type:a.type,
key:d,ref:k,props:e,_owner:h}};exports.createContext=function(a,b){void 0===b&&(b=null);a={$$typeof:r,_calculateChangedBits:b,_currentValue:a,_currentValue2:a,_threadCount:0,Provider:null,Consumer:null};a.Provider={$$typeof:q,_context:a};return a.Consumer=a};exports.createElement=J;exports.createFactory=function(a){var b=J.bind(null,a);b.type=a;return b};exports.createRef=function(){return{current:null}};exports.forwardRef=function(a){return{$$typeof:t,render:a}};exports.isValidElement=L;
exports.lazy=function(a){return{$$typeof:v,_payload:{_status:-1,_result:a},_init:Q}};exports.memo=function(a,b){return{$$typeof:u,type:a,compare:void 0===b?null:b}};exports.useCallback=function(a,b){return S().useCallback(a,b)};exports.useContext=function(a,b){return S().useContext(a,b)};exports.useDebugValue=function(){};exports.useEffect=function(a,b){return S().useEffect(a,b)};exports.useImperativeHandle=function(a,b,c){return S().useImperativeHandle(a,b,c)};
exports.useLayoutEffect=function(a,b){return S().useLayoutEffect(a,b)};exports.useMemo=function(a,b){return S().useMemo(a,b)};exports.useReducer=function(a,b,c){return S().useReducer(a,b,c)};exports.useRef=function(a){return S().useRef(a)};exports.useState=function(a){return S().useState(a)};exports.version="17.0.2";


/***/ }),

/***/ 735:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(447);
} else {}


/***/ }),

/***/ 666:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/** @license React v0.20.2
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f,g,h,k;if("object"===typeof performance&&"function"===typeof performance.now){var l=performance;exports.unstable_now=function(){return l.now()}}else{var p=Date,q=p.now();exports.unstable_now=function(){return p.now()-q}}
if("undefined"===typeof window||"function"!==typeof MessageChannel){var t=null,u=null,w=function(){if(null!==t)try{var a=exports.unstable_now();t(!0,a);t=null}catch(b){throw setTimeout(w,0),b;}};f=function(a){null!==t?setTimeout(f,0,a):(t=a,setTimeout(w,0))};g=function(a,b){u=setTimeout(a,b)};h=function(){clearTimeout(u)};exports.unstable_shouldYield=function(){return!1};k=exports.unstable_forceFrameRate=function(){}}else{var x=window.setTimeout,y=window.clearTimeout;if("undefined"!==typeof console){var z=
window.cancelAnimationFrame;"function"!==typeof window.requestAnimationFrame&&console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills");"function"!==typeof z&&console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills")}var A=!1,B=null,C=-1,D=5,E=0;exports.unstable_shouldYield=function(){return exports.unstable_now()>=
E};k=function(){};exports.unstable_forceFrameRate=function(a){0>a||125<a?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):D=0<a?Math.floor(1E3/a):5};var F=new MessageChannel,G=F.port2;F.port1.onmessage=function(){if(null!==B){var a=exports.unstable_now();E=a+D;try{B(!0,a)?G.postMessage(null):(A=!1,B=null)}catch(b){throw G.postMessage(null),b;}}else A=!1};f=function(a){B=a;A||(A=!0,G.postMessage(null))};g=function(a,b){C=
x(function(){a(exports.unstable_now())},b)};h=function(){y(C);C=-1}}function H(a,b){var c=a.length;a.push(b);a:for(;;){var d=c-1>>>1,e=a[d];if(void 0!==e&&0<I(e,b))a[d]=b,a[c]=e,c=d;else break a}}function J(a){a=a[0];return void 0===a?null:a}
function K(a){var b=a[0];if(void 0!==b){var c=a.pop();if(c!==b){a[0]=c;a:for(var d=0,e=a.length;d<e;){var m=2*(d+1)-1,n=a[m],v=m+1,r=a[v];if(void 0!==n&&0>I(n,c))void 0!==r&&0>I(r,n)?(a[d]=r,a[v]=c,d=v):(a[d]=n,a[m]=c,d=m);else if(void 0!==r&&0>I(r,c))a[d]=r,a[v]=c,d=v;else break a}}return b}return null}function I(a,b){var c=a.sortIndex-b.sortIndex;return 0!==c?c:a.id-b.id}var L=[],M=[],N=1,O=null,P=3,Q=!1,R=!1,S=!1;
function T(a){for(var b=J(M);null!==b;){if(null===b.callback)K(M);else if(b.startTime<=a)K(M),b.sortIndex=b.expirationTime,H(L,b);else break;b=J(M)}}function U(a){S=!1;T(a);if(!R)if(null!==J(L))R=!0,f(V);else{var b=J(M);null!==b&&g(U,b.startTime-a)}}
function V(a,b){R=!1;S&&(S=!1,h());Q=!0;var c=P;try{T(b);for(O=J(L);null!==O&&(!(O.expirationTime>b)||a&&!exports.unstable_shouldYield());){var d=O.callback;if("function"===typeof d){O.callback=null;P=O.priorityLevel;var e=d(O.expirationTime<=b);b=exports.unstable_now();"function"===typeof e?O.callback=e:O===J(L)&&K(L);T(b)}else K(L);O=J(L)}if(null!==O)var m=!0;else{var n=J(M);null!==n&&g(U,n.startTime-b);m=!1}return m}finally{O=null,P=c,Q=!1}}var W=k;exports.unstable_IdlePriority=5;
exports.unstable_ImmediatePriority=1;exports.unstable_LowPriority=4;exports.unstable_NormalPriority=3;exports.unstable_Profiling=null;exports.unstable_UserBlockingPriority=2;exports.unstable_cancelCallback=function(a){a.callback=null};exports.unstable_continueExecution=function(){R||Q||(R=!0,f(V))};exports.unstable_getCurrentPriorityLevel=function(){return P};exports.unstable_getFirstCallbackNode=function(){return J(L)};
exports.unstable_next=function(a){switch(P){case 1:case 2:case 3:var b=3;break;default:b=P}var c=P;P=b;try{return a()}finally{P=c}};exports.unstable_pauseExecution=function(){};exports.unstable_requestPaint=W;exports.unstable_runWithPriority=function(a,b){switch(a){case 1:case 2:case 3:case 4:case 5:break;default:a=3}var c=P;P=a;try{return b()}finally{P=c}};
exports.unstable_scheduleCallback=function(a,b,c){var d=exports.unstable_now();"object"===typeof c&&null!==c?(c=c.delay,c="number"===typeof c&&0<c?d+c:d):c=d;switch(a){case 1:var e=-1;break;case 2:e=250;break;case 5:e=1073741823;break;case 4:e=1E4;break;default:e=5E3}e=c+e;a={id:N++,callback:b,priorityLevel:a,startTime:c,expirationTime:e,sortIndex:-1};c>d?(a.sortIndex=c,H(M,a),null===J(L)&&a===J(M)&&(S?h():S=!0,g(U,c-d))):(a.sortIndex=e,H(L,a),R||Q||(R=!0,f(V)));return a};
exports.unstable_wrapCallback=function(a){var b=P;return function(){var c=P;P=b;try{return a.apply(this,arguments)}finally{P=c}}};


/***/ }),

/***/ 146:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(666);
} else {}


/***/ }),

/***/ 503:
/***/ (() => {

/* (ignored) */

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

// EXTERNAL MODULE: ../../../node_modules/react/index.js
var react = __webpack_require__(735);
// EXTERNAL MODULE: ../../../node_modules/object-inspect/index.js
var object_inspect = __webpack_require__(970);
var object_inspect_default = /*#__PURE__*/__webpack_require__.n(object_inspect);
;// CONCATENATED MODULE: ../../../node_modules/panorama-polyfill/lib/utils/format.js

// Based on https://github.com/browserify/node-util/blob/4b1c0c79790d9968eabecd2e9c786454713e200f/util.js#L33
function format(value, ...substitutions) {
    if (typeof value !== 'string') {
        return [value, ...substitutions].map(inspect).join(' ');
    }
    let result = String(value).replace(/%[sdj%]/g, (x) => {
        if (x === '%%')
            return '%';
        if (substitutions.length === 0)
            return x;
        switch (x) {
            case '%s':
                return String(substitutions.unshift());
            case '%d':
                return String(Number(substitutions.unshift()));
            case '%j':
                try {
                    return JSON.stringify(substitutions.unshift());
                }
                catch (_a) {
                    return '[Circular]';
                }
            default:
                return x;
        }
    });
    for (const x of substitutions) {
        if (typeof x !== 'object' || x === null) {
            result += ` ${x}`;
        }
        else {
            result += ` ${inspect(x)}`;
        }
    }
    return result;
}
const inspect = (value) => object_inspect_default()(transformValueForFormat(value));
function transformValueForFormat(originalValue) {
    const visitedValues = new Map();
    return transform(originalValue);
    function transform(value) {
        if (visitedValues.has(value))
            return visitedValues.get(value);
        const result = rawTransform(value);
        visitedValues.set(value, result);
        return result;
    }
    function rawTransform(value) {
        if (typeof value !== 'object' || value == null)
            return value;
        if (value instanceof Date || value instanceof RegExp)
            return value;
        if (Array.isArray(value))
            return value.map(transform);
        if (value instanceof Set)
            return new Set([...value].map(transform));
        if (value instanceof Map) {
            return new Map([...value].map(([k, v]) => [transform(k), transform(v)]));
        }
        if (isPanelBase(value)) {
            return Object.assign(Object.assign({}, value), { style: { inspect: () => '[VCSSStyleDeclaration]' } });
        }
        const newObject = {};
        for (const [k, v] of Object.entries(value)) {
            newObject[k] = transform(v);
        }
        Object.setPrototypeOf(newObject, Object.getPrototypeOf(value));
        return newObject;
    }
}
const isPanelBase = (value) => 'paneltype' in value &&
    'rememberchildfocus' in value &&
    'SetPanelEvent' in value &&
    'RunScriptInPanelContext' in value;

;// CONCATENATED MODULE: ../../../node_modules/panorama-polyfill/lib/utils/console.js

function write(text) {
    for (const line of text.split('\n')) {
        if (line.length > 2047) {
            const postfix = '... (line have been trimmed because of a length limit)';
            $.Warning(`${line.slice(0, 2047 - postfix.length)}${postfix}`);
        }
        else {
            $.Msg(line);
        }
    }
}
function assert(value, message = 'console.assert', ...args) {
    if (!value) {
        error(new Error(`Assertion failed: ${message}`), ...args);
    }
}
function error(...args) {
    $.Warning(format(...args));
}
const warn = error;
function log(...args) {
    write(format(...args));
}
const debug = log;
const info = log;
const times = new Map();
function time(label = 'default') {
    label = `${label}`;
    if (times.has(label)) {
        warn(`Timer '${label}' already exists`);
        return;
    }
    times.set(label, Date.now());
}
function timeEnd(label = 'default') {
    label = `${label}`;
    const startTime = times.get(label);
    if (startTime == null) {
        warn(`Timer '${label} does not exist'`);
        return;
    }
    times.delete(label);
    write(`${label}: ${Date.now() - startTime}ms`);
}
function trace(message = '', ...args) {
    const errorObject = {
        message: format(message, ...args),
        name: 'Trace',
        stack: '',
    };
    Error.captureStackTrace(errorObject, trace);
    write(format(errorObject.stack));
}
function clear() { }
function dir() {
    throw new Error('console.dir is not implemented');
}
function dirxml() {
    throw new Error('console.dirxml is not implemented');
}
function table() {
    throw new Error('console.table is not implemented');
}
function count() {
    throw new Error('console.count is not implemented');
}
function countReset() {
    throw new Error('console.countReset is not implemented');
}
function group() {
    throw new Error('console.group is not implemented');
}
function groupCollapsed() {
    throw new Error('console.groupCollapsed is not implemented');
}
function groupEnd() {
    throw new Error('console.groupEnd is not implemented');
}
function profile() {
    throw new Error('console.profile is not implemented');
}
function profileEnd() {
    throw new Error('console.profileEnd is not implemented');
}
function timeStamp() {
    throw new Error('console.timeStamp is not implemented');
}
const console_console = {
    assert,
    warn,
    error,
    log,
    debug,
    info,
    time,
    timeEnd,
    trace,
    clear,
    dir,
    dirxml,
    table,
    count,
    countReset,
    group,
    groupCollapsed,
    groupEnd,
    profile,
    profileEnd,
    timeStamp,
};

;// CONCATENATED MODULE: ../../../node_modules/panorama-polyfill/lib/console.js

// eslint-disable-next-line no-new-func
const global = new Function('return this')();
global.console = console_console;

;// CONCATENATED MODULE: ../../../node_modules/panorama-polyfill/lib/utils/timers.js
const intervals = new Map();
let nextIntervalId = -100000;
const timers_setTimeout = (callback, timeout = 0, ...args) => $.Schedule(timeout / 1000, () => callback(...args));
function timers_setInterval(callback, timeout = 0, ...args) {
    timeout /= 1000;
    nextIntervalId -= 1;
    const intervalId = nextIntervalId;
    const run = () => {
        intervals.set(intervalId, $.Schedule(timeout, run));
        callback(...args);
    };
    intervals.set(intervalId, $.Schedule(timeout, run));
    return intervalId;
}
const setImmediate = (callback, ...args) => $.Schedule(0, () => callback(...args));
function clearTimer(handle) {
    if (typeof handle === 'number') {
        // $.CancelScheduled throws on expired or non-existent timer handles
        try {
            if (handle < -100000) {
                $.CancelScheduled(intervals.get(handle));
            }
            else {
                $.CancelScheduled(handle);
            }
        }
        catch (_a) { }
    }
}


;// CONCATENATED MODULE: ../../../node_modules/panorama-polyfill/lib/timers.js

// eslint-disable-next-line no-new-func
const timers_global = new Function('return this')();
timers_global.setInterval = timers_setInterval;
timers_global.clearInterval = clearTimer;
timers_global.setTimeout = timers_setTimeout;
timers_global.clearTimeout = clearTimer;
timers_global.setImmediate = setImmediate;
timers_global.clearImmediate = clearTimer;

;// CONCATENATED MODULE: ../../../node_modules/react-panorama/dist/esm/react-panorama.production.js
/**
 * React Panorama (https://github.com/ark120202/react-panorama)
 * @version 0.1.2
 * @license MIT
 */
function r(e,n,r){(0,react.useEffect)(()=>{const t=GameEvents.Subscribe(e,n);return()=>GameEvents.Unsubscribe(t)},r)}function i(e,n,r){(0,react.useEffect)(()=>{const t=$.RegisterForUnhandledEvent(e,n);return()=>$.UnregisterForUnhandledEvent(e,t)},r)}function l(e,r){const[i,l]=n(()=>CustomNetTables.GetTableValue(e,r));return t(()=>{const t=CustomNetTables.SubscribeNetTableListener(e,(e,t,n)=>{r===t&&l(n)});return()=>CustomNetTables.UnsubscribeNetTableListener(t)},[e,r]),i}function a(e){const[r,i]=(0,react.useState)(()=>CustomNetTables.GetAllTableValues(e).reduce((e,t)=>Object.assign(Object.assign({},e),{[t.key]:t.value}),{}));return (0,react.useEffect)(()=>{const t=CustomNetTables.SubscribeNetTableListener(e,(e,t,n)=>{i(e=>Object.assign(Object.assign({},e),{[t]:n}))});return()=>CustomNetTables.UnsubscribeNetTableListener(t)},[e]),r}var u;const o=()=>{},c=Promise.resolve();const s=Symbol("_reactPanoramaSymbol"),f=(()=>{let e=$.GetContextPanel();for(;e;){if("DotaHud"===e.id)return e;e=e.GetParent()}})(),d=null!==(u=f.FindChild("__react_panorama_temporary_host__"))&&void 0!==u?u:$.CreatePanel("Panel",f,"__react_panorama_temporary_host__");d.RemoveAndDeleteChildren(),d.visible=!1;const p=new Function("return this")();for(const e of["Panel","Label","Image","DOTAAbilityImage","DOTAItemImage","DOTAHeroImage","DOTACountryFlagImage","DOTALeagueImage","EconItemImage","AnimatedImageStrip","DOTAEmoticon","Movie","DOTAHeroMovie","DOTAScenePanel","DOTAEconItem","ProgressBar","CircularProgressBar","ProgressBarWithMiddle","DOTAUserName","DOTAUserRichPresence","DOTAAvatarImage","Countdown","Button","TextButton","ToggleButton","RadioButton","TextEntry","NumberEntry","Slider","SlottedSlider","DropDown","ContextMenuScript","Carousel","CarouselNav","DOTAHUDOverlayMap","DOTAMinimap","HTML","CustomLayoutPanel","GenericPanel"])p[e]=e;function m(e,t,n){return e(n={path:t,exports:{},require:function(e,t){return function(){throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/(null==t&&n.path)}},n.exports),n.exports}var h=Object.getOwnPropertySymbols,g=Object.prototype.hasOwnProperty,y=Object.prototype.propertyIsEnumerable;function b(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}var v=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},n=0;n<10;n++)t["_"+String.fromCharCode(n)]=n;if("0123456789"!==Object.getOwnPropertyNames(t).map((function(e){return t[e]})).join(""))return!1;var r={};return"abcdefghijklmnopqrst".split("").forEach((function(e){r[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},r)).join("")}catch(e){return!1}}()?Object.assign:function(e,t){for(var n,r,i=b(e),l=1;l<arguments.length;l++){for(var a in n=Object(arguments[l]))g.call(n,a)&&(i[a]=n[a]);if(h){r=h(n);for(var u=0;u<r.length;u++)y.call(n,r[u])&&(i[r[u]]=n[r[u]])}}return i},T=m((function(e,t){var n,r,i,l,a;if("undefined"==typeof window||"function"!=typeof MessageChannel){var u=null,o=null,c=function(){if(null!==u)try{var e=t.unstable_now();u(!0,e),u=null}catch(e){throw setTimeout(c,0),e}},s=Date.now();t.unstable_now=function(){return Date.now()-s},n=function(e){null!==u?setTimeout(n,0,e):(u=e,setTimeout(c,0))},r=function(e,t){o=setTimeout(e,t)},i=function(){clearTimeout(o)},l=function(){return!1},a=t.unstable_forceFrameRate=function(){}}else{var f=window.performance,d=window.Date,p=window.setTimeout,m=window.clearTimeout;if("undefined"!=typeof console){var h=window.cancelAnimationFrame;"function"!=typeof window.requestAnimationFrame&&console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills"),"function"!=typeof h&&console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills")}if("object"==typeof f&&"function"==typeof f.now)t.unstable_now=function(){return f.now()};else{var g=d.now();t.unstable_now=function(){return d.now()-g}}var y=!1,b=null,v=-1,T=5,x=0;l=function(){return t.unstable_now()>=x},a=function(){},t.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing framerates higher than 125 fps is not unsupported"):T=0<e?Math.floor(1e3/e):5};var S=new MessageChannel,E=S.port2;S.port1.onmessage=function(){if(null!==b){var e=t.unstable_now();x=e+T;try{b(!0,e)?E.postMessage(null):(y=!1,b=null)}catch(e){throw E.postMessage(null),e}}else y=!1},n=function(e){b=e,y||(y=!0,E.postMessage(null))},r=function(e,n){v=p((function(){e(t.unstable_now())}),n)},i=function(){m(v),v=-1}}function w(e,t){var n=e.length;e.push(t);e:for(;;){var r=n-1>>>1,i=e[r];if(!(void 0!==i&&0<P(i,t)))break e;e[r]=t,e[n]=i,n=r}}function k(e){return void 0===(e=e[0])?null:e}function C(e){var t=e[0];if(void 0!==t){var n=e.pop();if(n!==t){e[0]=n;e:for(var r=0,i=e.length;r<i;){var l=2*(r+1)-1,a=e[l],u=l+1,o=e[u];if(void 0!==a&&0>P(a,n))void 0!==o&&0>P(o,a)?(e[r]=o,e[u]=n,r=u):(e[r]=a,e[l]=n,r=l);else{if(!(void 0!==o&&0>P(o,n)))break e;e[r]=o,e[u]=n,r=u}}}return t}return null}function P(e,t){var n=e.sortIndex-t.sortIndex;return 0!==n?n:e.id-t.id}var _=[],z=[],N=1,I=null,D=3,O=!1,R=!1,M=!1;function A(e){for(var t=k(z);null!==t;){if(null===t.callback)C(z);else{if(!(t.startTime<=e))break;C(z),t.sortIndex=t.expirationTime,w(_,t)}t=k(z)}}function j(e){if(M=!1,A(e),!R)if(null!==k(_))R=!0,n(U);else{var t=k(z);null!==t&&r(j,t.startTime-e)}}function U(e,n){R=!1,M&&(M=!1,i()),O=!0;var a=D;try{for(A(n),I=k(_);null!==I&&(!(I.expirationTime>n)||e&&!l());){var u=I.callback;if(null!==u){I.callback=null,D=I.priorityLevel;var o=u(I.expirationTime<=n);n=t.unstable_now(),"function"==typeof o?I.callback=o:I===k(_)&&C(_),A(n)}else C(_);I=k(_)}if(null!==I)var c=!0;else{var s=k(z);null!==s&&r(j,s.startTime-n),c=!1}return c}finally{I=null,D=a,O=!1}}function F(e){switch(e){case 1:return-1;case 2:return 250;case 5:return 1073741823;case 4:return 1e4;default:return 5e3}}var Q=a;t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(e){e.callback=null},t.unstable_continueExecution=function(){R||O||(R=!0,n(U))},t.unstable_getCurrentPriorityLevel=function(){return D},t.unstable_getFirstCallbackNode=function(){return k(_)},t.unstable_next=function(e){switch(D){case 1:case 2:case 3:var t=3;break;default:t=D}var n=D;D=t;try{return e()}finally{D=n}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=Q,t.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=D;D=e;try{return t()}finally{D=n}},t.unstable_scheduleCallback=function(e,l,a){var u=t.unstable_now();if("object"==typeof a&&null!==a){var o=a.delay;o="number"==typeof o&&0<o?u+o:u,a="number"==typeof a.timeout?a.timeout:F(e)}else a=F(e),o=u;return e={id:N++,callback:l,priorityLevel:e,startTime:o,expirationTime:a=o+a,sortIndex:-1},o>u?(e.sortIndex=o,w(z,e),null===k(_)&&e===k(z)&&(M?i():M=!0,r(j,o-u))):(e.sortIndex=a,w(_,e),R||O||(R=!0,n(U))),e},t.unstable_shouldYield=function(){var e=t.unstable_now();A(e);var n=k(_);return n!==I&&null!==I&&null!==n&&null!==n.callback&&n.startTime<=e&&n.expirationTime<I.expirationTime||l()},t.unstable_wrapCallback=function(e){var t=D;return function(){var n=D;D=t;try{return e.apply(this,arguments)}finally{D=n}}}})),x=m((function(e){e.exports=T})),S=m((function(t){
/** @license React v0.25.1
 * react-reconciler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
t.exports=function n(r){var i=v,l=react,a=x;function u(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var o=l.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;o.hasOwnProperty("ReactCurrentDispatcher")||(o.ReactCurrentDispatcher={current:null}),o.hasOwnProperty("ReactCurrentBatchConfig")||(o.ReactCurrentBatchConfig={suspense:null});var c="function"==typeof Symbol&&Symbol.for,s=c?Symbol.for("react.element"):60103,f=c?Symbol.for("react.portal"):60106,d=c?Symbol.for("react.fragment"):60107,p=c?Symbol.for("react.strict_mode"):60108,m=c?Symbol.for("react.profiler"):60114,h=c?Symbol.for("react.provider"):60109,g=c?Symbol.for("react.context"):60110,y=c?Symbol.for("react.concurrent_mode"):60111,b=c?Symbol.for("react.forward_ref"):60112,T=c?Symbol.for("react.suspense"):60113,S=c?Symbol.for("react.suspense_list"):60120,E=c?Symbol.for("react.memo"):60115,w=c?Symbol.for("react.lazy"):60116,k=c?Symbol.for("react.block"):60121,C="function"==typeof Symbol&&Symbol.iterator;function P(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=C&&e[C]||e["@@iterator"])?e:null}function _(e){if(null==e)return null;if("function"==typeof e)return e.displayName||e.name||null;if("string"==typeof e)return e;switch(e){case d:return"Fragment";case f:return"Portal";case m:return"Profiler";case p:return"StrictMode";case T:return"Suspense";case S:return"SuspenseList"}if("object"==typeof e)switch(e.$$typeof){case g:return"Context.Consumer";case h:return"Context.Provider";case b:var t=e.render;return t=t.displayName||t.name||"",e.displayName||(""!==t?"ForwardRef("+t+")":"ForwardRef");case E:return _(e.type);case k:return _(e.render);case w:if(e=1===e._status?e._result:null)return _(e)}return null}function z(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do{0!=(1026&(t=e).effectTag)&&(n=t.return),e=t.return}while(e)}return 3===t.tag?n:null}function N(e){if(z(e)!==e)throw Error(u(188))}function I(e){var t=e.alternate;if(!t){if(null===(t=z(e)))throw Error(u(188));return t!==e?null:e}for(var n=e,r=t;;){var i=n.return;if(null===i)break;var l=i.alternate;if(null===l){if(null!==(r=i.return)){n=r;continue}break}if(i.child===l.child){for(l=i.child;l;){if(l===n)return N(i),e;if(l===r)return N(i),t;l=l.sibling}throw Error(u(188))}if(n.return!==r.return)n=i,r=l;else{for(var a=!1,o=i.child;o;){if(o===n){a=!0,n=i,r=l;break}if(o===r){a=!0,r=i,n=l;break}o=o.sibling}if(!a){for(o=l.child;o;){if(o===n){a=!0,n=l,r=i;break}if(o===r){a=!0,r=l,n=i;break}o=o.sibling}if(!a)throw Error(u(189))}}if(n.alternate!==r)throw Error(u(190))}if(3!==n.tag)throw Error(u(188));return n.stateNode.current===n?e:t}function D(e){if(!(e=I(e)))return null;for(var t=e;;){if(5===t.tag||6===t.tag)return t;if(t.child)t.child.return=t,t=t.child;else{if(t===e)break;for(;!t.sibling;){if(!t.return||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}}return null}var O=r.getPublicInstance,R=r.getRootHostContext,M=r.getChildHostContext,A=r.prepareForCommit,j=r.resetAfterCommit,U=r.createInstance,F=r.appendInitialChild,Q=r.finalizeInitialChildren,H=r.prepareUpdate,B=r.shouldSetTextContent,W=r.shouldDeprioritizeSubtree,L=r.createTextInstance,$=r.setTimeout,V=r.clearTimeout,q=r.noTimeout,G=r.isPrimaryRenderer,K=r.supportsMutation,Y=r.supportsPersistence,J=r.supportsHydration,X=r.appendChild,Z=r.appendChildToContainer,ee=r.commitTextUpdate,te=r.commitMount,ne=r.commitUpdate,re=r.insertBefore,ie=r.insertInContainerBefore,le=r.removeChild,ae=r.removeChildFromContainer,ue=r.resetTextContent,oe=r.hideInstance,ce=r.hideTextInstance,se=r.unhideInstance,fe=r.unhideTextInstance,de=r.cloneInstance,pe=r.createContainerChildSet,me=r.appendChildToContainerChildSet,he=r.finalizeContainerChildren,ge=r.replaceContainerChildren,ye=r.cloneHiddenInstance,be=r.cloneHiddenTextInstance,ve=r.canHydrateInstance,Te=r.canHydrateTextInstance,xe=r.isSuspenseInstancePending,Se=r.isSuspenseInstanceFallback,Ee=r.getNextHydratableSibling,we=r.getFirstHydratableChild,ke=r.hydrateInstance,Ce=r.hydrateTextInstance,Pe=r.getNextHydratableInstanceAfterSuspenseInstance,_e=r.commitHydratedContainer,ze=r.commitHydratedSuspenseInstance,Ne=/^(.*)[\\\/]/;function Ie(e){var t="";do{e:switch(e.tag){case 3:case 4:case 6:case 7:case 10:case 9:var n="";break e;default:var r=e._debugOwner,i=e._debugSource,l=_(e.type);n=null,r&&(n=_(r.type)),r=l,l="",i?l=" (at "+i.fileName.replace(Ne,"")+":"+i.lineNumber+")":n&&(l=" (created by "+n+")"),n="\n    in "+(r||"Unknown")+l}t+=n,e=e.return}while(e);return t}var De=[],Oe=-1;function Re(e){0>Oe||(e.current=De[Oe],De[Oe]=null,Oe--)}function Me(e,t){Oe++,De[Oe]=e.current,e.current=t}var Ae={},je={current:Ae},Ue={current:!1},Fe=Ae;function Qe(e,t){var n=e.type.contextTypes;if(!n)return Ae;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var i,l={};for(i in n)l[i]=t[i];return r&&((e=e.stateNode).__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=l),l}function He(e){return null!=(e=e.childContextTypes)}function Be(){Re(Ue),Re(je)}function We(e,t,n){if(je.current!==Ae)throw Error(u(168));Me(je,t),Me(Ue,n)}function Le(e,t,n){var r=e.stateNode;if(e=t.childContextTypes,"function"!=typeof r.getChildContext)return n;for(var l in r=r.getChildContext())if(!(l in e))throw Error(u(108,_(t)||"Unknown",l));return i({},n,{},r)}function $e(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Ae,Fe=je.current,Me(je,e),Me(Ue,Ue.current),!0}function Ve(e,t,n){var r=e.stateNode;if(!r)throw Error(u(169));n?(e=Le(e,t,Fe),r.__reactInternalMemoizedMergedChildContext=e,Re(Ue),Re(je),Me(je,e)):Re(Ue),Me(Ue,n)}var qe=a.unstable_runWithPriority,Ge=a.unstable_scheduleCallback,Ke=a.unstable_cancelCallback,Ye=a.unstable_requestPaint,Je=a.unstable_now,Xe=a.unstable_getCurrentPriorityLevel,Ze=a.unstable_ImmediatePriority,et=a.unstable_UserBlockingPriority,tt=a.unstable_NormalPriority,nt=a.unstable_LowPriority,rt=a.unstable_IdlePriority,it={},lt=a.unstable_shouldYield,at=void 0!==Ye?Ye:function(){},ut=null,ot=null,ct=!1,st=Je(),ft=1e4>st?Je:function(){return Je()-st};function dt(){switch(Xe()){case Ze:return 99;case et:return 98;case tt:return 97;case nt:return 96;case rt:return 95;default:throw Error(u(332))}}function pt(e){switch(e){case 99:return Ze;case 98:return et;case 97:return tt;case 96:return nt;case 95:return rt;default:throw Error(u(332))}}function mt(e,t){return e=pt(e),qe(e,t)}function ht(e,t,n){return e=pt(e),Ge(e,t,n)}function gt(e){return null===ut?(ut=[e],ot=Ge(Ze,bt)):ut.push(e),it}function yt(){if(null!==ot){var e=ot;ot=null,Ke(e)}bt()}function bt(){if(!ct&&null!==ut){ct=!0;var e=0;try{var t=ut;mt(99,(function(){for(;e<t.length;e++){var n=t[e];do{n=n(!0)}while(null!==n)}})),ut=null}catch(t){throw null!==ut&&(ut=ut.slice(e+1)),Ge(Ze,yt),t}finally{ct=!1}}}function vt(e,t,n){return 1073741821-(1+((1073741821-e+t/10)/(n/=10)|0))*n}var Tt="function"==typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e==1/t)||e!=e&&t!=t},xt=Object.prototype.hasOwnProperty;function St(e,t){if(Tt(e,t))return!0;if("object"!=typeof e||null===e||"object"!=typeof t||null===t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++)if(!xt.call(t,n[r])||!Tt(e[n[r]],t[n[r]]))return!1;return!0}function Et(e,t){if(e&&e.defaultProps)for(var n in t=i({},t),e=e.defaultProps)void 0===t[n]&&(t[n]=e[n]);return t}var wt={current:null},kt=null,Ct=null,Pt=null;function _t(){Pt=Ct=kt=null}function zt(e,t){e=e.type._context,G?(Me(wt,e._currentValue),e._currentValue=t):(Me(wt,e._currentValue2),e._currentValue2=t)}function Nt(e){var t=wt.current;Re(wt),e=e.type._context,G?e._currentValue=t:e._currentValue2=t}function It(e,t){for(;null!==e;){var n=e.alternate;if(e.childExpirationTime<t)e.childExpirationTime=t,null!==n&&n.childExpirationTime<t&&(n.childExpirationTime=t);else{if(!(null!==n&&n.childExpirationTime<t))break;n.childExpirationTime=t}e=e.return}}function Dt(e,t){kt=e,Pt=Ct=null,null!==(e=e.dependencies)&&null!==e.firstContext&&(e.expirationTime>=t&&(ar=!0),e.firstContext=null)}function Ot(e,t){if(Pt!==e&&!1!==t&&0!==t)if("number"==typeof t&&1073741823!==t||(Pt=e,t=1073741823),t={context:e,observedBits:t,next:null},null===Ct){if(null===kt)throw Error(u(308));Ct=t,kt.dependencies={expirationTime:0,firstContext:t,responders:null}}else Ct=Ct.next=t;return G?e._currentValue:e._currentValue2}var Rt=!1;function Mt(e){e.updateQueue={baseState:e.memoizedState,baseQueue:null,shared:{pending:null},effects:null}}function At(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,baseQueue:e.baseQueue,shared:e.shared,effects:e.effects})}function jt(e,t){return(e={expirationTime:e,suspenseConfig:t,tag:0,payload:null,callback:null,next:null}).next=e}function Ut(e,t){if(null!==(e=e.updateQueue)){var n=(e=e.shared).pending;null===n?t.next=t:(t.next=n.next,n.next=t),e.pending=t}}function Ft(e,t){var n=e.alternate;null!==n&&At(n,e),null===(n=(e=e.updateQueue).baseQueue)?(e.baseQueue=t.next=t,t.next=t):(t.next=n.next,n.next=t)}function Qt(e,t,n,r){var l=e.updateQueue;Rt=!1;var a=l.baseQueue,u=l.shared.pending;if(null!==u){if(null!==a){var o=a.next;a.next=u.next,u.next=o}a=u,l.shared.pending=null,null!==(o=e.alternate)&&(null!==(o=o.updateQueue)&&(o.baseQueue=u))}if(null!==a){o=a.next;var c=l.baseState,s=0,f=null,d=null,p=null;if(null!==o)for(var m=o;;){if((u=m.expirationTime)<r){var h={expirationTime:m.expirationTime,suspenseConfig:m.suspenseConfig,tag:m.tag,payload:m.payload,callback:m.callback,next:null};null===p?(d=p=h,f=c):p=p.next=h,u>s&&(s=u)}else{null!==p&&(p=p.next={expirationTime:1073741823,suspenseConfig:m.suspenseConfig,tag:m.tag,payload:m.payload,callback:m.callback,next:null}),Bi(u,m.suspenseConfig);e:{var g=e,y=m;switch(u=t,h=n,y.tag){case 1:if("function"==typeof(g=y.payload)){c=g.call(h,c,u);break e}c=g;break e;case 3:g.effectTag=-4097&g.effectTag|64;case 0:if(null==(u="function"==typeof(g=y.payload)?g.call(h,c,u):g))break e;c=i({},c,u);break e;case 2:Rt=!0}}null!==m.callback&&(e.effectTag|=32,null===(u=l.effects)?l.effects=[m]:u.push(m))}if(null===(m=m.next)||m===o){if(null===(u=l.shared.pending))break;m=a.next=u.next,u.next=o,l.baseQueue=a=u,l.shared.pending=null}}null===p?f=c:p.next=d,l.baseState=f,l.baseQueue=p,Wi(s),e.expirationTime=s,e.memoizedState=c}}function Ht(e,t,n){if(e=t.effects,t.effects=null,null!==e)for(t=0;t<e.length;t++){var r=e[t],i=r.callback;if(null!==i){if(r.callback=null,r=i,i=n,"function"!=typeof r)throw Error(u(191,r));r.call(i)}}}var Bt=o.ReactCurrentBatchConfig,Wt=(new l.Component).refs;function Lt(e,t,n,r){n=null==(n=n(r,t=e.memoizedState))?t:i({},t,n),e.memoizedState=n,0===e.expirationTime&&(e.updateQueue.baseState=n)}var $t={isMounted:function(e){return!!(e=e._reactInternalFiber)&&z(e)===e},enqueueSetState:function(e,t,n){e=e._reactInternalFiber;var r=zi(),i=Bt.suspense;(i=jt(r=Ni(r,e,i),i)).payload=t,null!=n&&(i.callback=n),Ut(e,i),Ii(e,r)},enqueueReplaceState:function(e,t,n){e=e._reactInternalFiber;var r=zi(),i=Bt.suspense;(i=jt(r=Ni(r,e,i),i)).tag=1,i.payload=t,null!=n&&(i.callback=n),Ut(e,i),Ii(e,r)},enqueueForceUpdate:function(e,t){e=e._reactInternalFiber;var n=zi(),r=Bt.suspense;(r=jt(n=Ni(n,e,r),r)).tag=2,null!=t&&(r.callback=t),Ut(e,r),Ii(e,n)}};function Vt(e,t,n,r,i,l,a){return"function"==typeof(e=e.stateNode).shouldComponentUpdate?e.shouldComponentUpdate(r,l,a):!t.prototype||!t.prototype.isPureReactComponent||(!St(n,r)||!St(i,l))}function qt(e,t,n){var r=!1,i=Ae,l=t.contextType;return"object"==typeof l&&null!==l?l=Ot(l):(i=He(t)?Fe:je.current,l=(r=null!=(r=t.contextTypes))?Qe(e,i):Ae),t=new t(n,l),e.memoizedState=null!==t.state&&void 0!==t.state?t.state:null,t.updater=$t,e.stateNode=t,t._reactInternalFiber=e,r&&((e=e.stateNode).__reactInternalMemoizedUnmaskedChildContext=i,e.__reactInternalMemoizedMaskedChildContext=l),t}function Gt(e,t,n,r){e=t.state,"function"==typeof t.componentWillReceiveProps&&t.componentWillReceiveProps(n,r),"function"==typeof t.UNSAFE_componentWillReceiveProps&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&$t.enqueueReplaceState(t,t.state,null)}function Kt(e,t,n,r){var i=e.stateNode;i.props=n,i.state=e.memoizedState,i.refs=Wt,Mt(e);var l=t.contextType;"object"==typeof l&&null!==l?i.context=Ot(l):(l=He(t)?Fe:je.current,i.context=Qe(e,l)),Qt(e,n,i,r),i.state=e.memoizedState,"function"==typeof(l=t.getDerivedStateFromProps)&&(Lt(e,t,l,n),i.state=e.memoizedState),"function"==typeof t.getDerivedStateFromProps||"function"==typeof i.getSnapshotBeforeUpdate||"function"!=typeof i.UNSAFE_componentWillMount&&"function"!=typeof i.componentWillMount||(t=i.state,"function"==typeof i.componentWillMount&&i.componentWillMount(),"function"==typeof i.UNSAFE_componentWillMount&&i.UNSAFE_componentWillMount(),t!==i.state&&$t.enqueueReplaceState(i,i.state,null),Qt(e,n,i,r),i.state=e.memoizedState),"function"==typeof i.componentDidMount&&(e.effectTag|=4)}var Yt=Array.isArray;function Jt(e,t,n){if(null!==(e=n.ref)&&"function"!=typeof e&&"object"!=typeof e){if(n._owner){if(n=n._owner){if(1!==n.tag)throw Error(u(309));var r=n.stateNode}if(!r)throw Error(u(147,e));var i=""+e;return null!==t&&null!==t.ref&&"function"==typeof t.ref&&t.ref._stringRef===i?t.ref:((t=function(e){var t=r.refs;t===Wt&&(t=r.refs={}),null===e?delete t[i]:t[i]=e})._stringRef=i,t)}if("string"!=typeof e)throw Error(u(284));if(!n._owner)throw Error(u(290,e))}return e}function Xt(e,t){if("textarea"!==e.type)throw Error(u(31,"[object Object]"===Object.prototype.toString.call(t)?"object with keys {"+Object.keys(t).join(", ")+"}":t,""))}function Zt(e){function t(t,n){if(e){var r=t.lastEffect;null!==r?(r.nextEffect=n,t.lastEffect=n):t.firstEffect=t.lastEffect=n,n.nextEffect=null,n.effectTag=8}}function n(n,r){if(!e)return null;for(;null!==r;)t(n,r),r=r.sibling;return null}function r(e,t){for(e=new Map;null!==t;)null!==t.key?e.set(t.key,t):e.set(t.index,t),t=t.sibling;return e}function i(e,t){return(e=sl(e,t)).index=0,e.sibling=null,e}function l(t,n,r){return t.index=r,e?null!==(r=t.alternate)?(r=r.index)<n?(t.effectTag=2,n):r:(t.effectTag=2,n):n}function a(t){return e&&null===t.alternate&&(t.effectTag=2),t}function o(e,t,n,r){return null===t||6!==t.tag?((t=pl(n,e.mode,r)).return=e,t):((t=i(t,n)).return=e,t)}function c(e,t,n,r){return null!==t&&t.elementType===n.type?((r=i(t,n.props)).ref=Jt(e,t,n),r.return=e,r):((r=fl(n.type,n.key,n.props,null,e.mode,r)).ref=Jt(e,t,n),r.return=e,r)}function p(e,t,n,r){return null===t||4!==t.tag||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?((t=ml(n,e.mode,r)).return=e,t):((t=i(t,n.children||[])).return=e,t)}function m(e,t,n,r,l){return null===t||7!==t.tag?((t=dl(n,e.mode,r,l)).return=e,t):((t=i(t,n)).return=e,t)}function h(e,t,n){if("string"==typeof t||"number"==typeof t)return(t=pl(""+t,e.mode,n)).return=e,t;if("object"==typeof t&&null!==t){switch(t.$$typeof){case s:return(n=fl(t.type,t.key,t.props,null,e.mode,n)).ref=Jt(e,null,t),n.return=e,n;case f:return(t=ml(t,e.mode,n)).return=e,t}if(Yt(t)||P(t))return(t=dl(t,e.mode,n,null)).return=e,t;Xt(e,t)}return null}function g(e,t,n,r){var i=null!==t?t.key:null;if("string"==typeof n||"number"==typeof n)return null!==i?null:o(e,t,""+n,r);if("object"==typeof n&&null!==n){switch(n.$$typeof){case s:return n.key===i?n.type===d?m(e,t,n.props.children,r,i):c(e,t,n,r):null;case f:return n.key===i?p(e,t,n,r):null}if(Yt(n)||P(n))return null!==i?null:m(e,t,n,r,null);Xt(e,n)}return null}function y(e,t,n,r,i){if("string"==typeof r||"number"==typeof r)return o(t,e=e.get(n)||null,""+r,i);if("object"==typeof r&&null!==r){switch(r.$$typeof){case s:return e=e.get(null===r.key?n:r.key)||null,r.type===d?m(t,e,r.props.children,i,r.key):c(t,e,r,i);case f:return p(t,e=e.get(null===r.key?n:r.key)||null,r,i)}if(Yt(r)||P(r))return m(t,e=e.get(n)||null,r,i,null);Xt(t,r)}return null}function b(i,a,u,o){for(var c=null,s=null,f=a,d=a=0,p=null;null!==f&&d<u.length;d++){f.index>d?(p=f,f=null):p=f.sibling;var m=g(i,f,u[d],o);if(null===m){null===f&&(f=p);break}e&&f&&null===m.alternate&&t(i,f),a=l(m,a,d),null===s?c=m:s.sibling=m,s=m,f=p}if(d===u.length)return n(i,f),c;if(null===f){for(;d<u.length;d++)null!==(f=h(i,u[d],o))&&(a=l(f,a,d),null===s?c=f:s.sibling=f,s=f);return c}for(f=r(i,f);d<u.length;d++)null!==(p=y(f,i,d,u[d],o))&&(e&&null!==p.alternate&&f.delete(null===p.key?d:p.key),a=l(p,a,d),null===s?c=p:s.sibling=p,s=p);return e&&f.forEach((function(e){return t(i,e)})),c}function v(i,a,o,c){var s=P(o);if("function"!=typeof s)throw Error(u(150));if(null==(o=s.call(o)))throw Error(u(151));for(var f=s=null,d=a,p=a=0,m=null,b=o.next();null!==d&&!b.done;p++,b=o.next()){d.index>p?(m=d,d=null):m=d.sibling;var v=g(i,d,b.value,c);if(null===v){null===d&&(d=m);break}e&&d&&null===v.alternate&&t(i,d),a=l(v,a,p),null===f?s=v:f.sibling=v,f=v,d=m}if(b.done)return n(i,d),s;if(null===d){for(;!b.done;p++,b=o.next())null!==(b=h(i,b.value,c))&&(a=l(b,a,p),null===f?s=b:f.sibling=b,f=b);return s}for(d=r(i,d);!b.done;p++,b=o.next())null!==(b=y(d,i,p,b.value,c))&&(e&&null!==b.alternate&&d.delete(null===b.key?p:b.key),a=l(b,a,p),null===f?s=b:f.sibling=b,f=b);return e&&d.forEach((function(e){return t(i,e)})),s}return function(e,r,l,o){var c="object"==typeof l&&null!==l&&l.type===d&&null===l.key;c&&(l=l.props.children);var p="object"==typeof l&&null!==l;if(p)switch(l.$$typeof){case s:e:{for(p=l.key,c=r;null!==c;){if(c.key===p){switch(c.tag){case 7:if(l.type===d){n(e,c.sibling),(r=i(c,l.props.children)).return=e,e=r;break e}break;default:if(c.elementType===l.type){n(e,c.sibling),(r=i(c,l.props)).ref=Jt(e,c,l),r.return=e,e=r;break e}}n(e,c);break}t(e,c),c=c.sibling}l.type===d?((r=dl(l.props.children,e.mode,o,l.key)).return=e,e=r):((o=fl(l.type,l.key,l.props,null,e.mode,o)).ref=Jt(e,r,l),o.return=e,e=o)}return a(e);case f:e:{for(c=l.key;null!==r;){if(r.key===c){if(4===r.tag&&r.stateNode.containerInfo===l.containerInfo&&r.stateNode.implementation===l.implementation){n(e,r.sibling),(r=i(r,l.children||[])).return=e,e=r;break e}n(e,r);break}t(e,r),r=r.sibling}(r=ml(l,e.mode,o)).return=e,e=r}return a(e)}if("string"==typeof l||"number"==typeof l)return l=""+l,null!==r&&6===r.tag?(n(e,r.sibling),(r=i(r,l)).return=e,e=r):(n(e,r),(r=pl(l,e.mode,o)).return=e,e=r),a(e);if(Yt(l))return b(e,r,l,o);if(P(l))return v(e,r,l,o);if(p&&Xt(e,l),void 0===l&&!c)switch(e.tag){case 1:case 0:throw e=e.type,Error(u(152,e.displayName||e.name||"Component"))}return n(e,r)}}var en=Zt(!0),tn=Zt(!1),nn={},rn={current:nn},ln={current:nn},an={current:nn};function un(e){if(e===nn)throw Error(u(174));return e}function on(e,t){Me(an,t),Me(ln,e),Me(rn,nn),e=R(t),Re(rn),Me(rn,e)}function cn(){Re(rn),Re(ln),Re(an)}function sn(e){var t=un(an.current),n=un(rn.current);n!==(t=M(n,e.type,t))&&(Me(ln,e),Me(rn,t))}function fn(e){ln.current===e&&(Re(rn),Re(ln))}var dn={current:0};function pn(e){for(var t=e;null!==t;){if(13===t.tag){var n=t.memoizedState;if(null!==n&&(null===(n=n.dehydrated)||xe(n)||Se(n)))return t}else if(19===t.tag&&void 0!==t.memoizedProps.revealOrder){if(0!=(64&t.effectTag))return t}else if(null!==t.child){t.child.return=t,t=t.child;continue}if(t===e)break;for(;null===t.sibling;){if(null===t.return||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}function mn(e,t){return{responder:e,props:t}}var hn=o.ReactCurrentDispatcher,gn=o.ReactCurrentBatchConfig,yn=0,bn=null,vn=null,Tn=null,xn=!1;function Sn(){throw Error(u(321))}function En(e,t){if(null===t)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Tt(e[n],t[n]))return!1;return!0}function wn(e,t,n,r,i,l){if(yn=l,bn=t,t.memoizedState=null,t.updateQueue=null,t.expirationTime=0,hn.current=null===e||null===e.memoizedState?qn:Gn,e=n(r,i),t.expirationTime===yn){l=0;do{if(t.expirationTime=0,!(25>l))throw Error(u(301));l+=1,Tn=vn=null,t.updateQueue=null,hn.current=Kn,e=n(r,i)}while(t.expirationTime===yn)}if(hn.current=Vn,t=null!==vn&&null!==vn.next,yn=0,Tn=vn=bn=null,xn=!1,t)throw Error(u(300));return e}function kn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return null===Tn?bn.memoizedState=Tn=e:Tn=Tn.next=e,Tn}function Cn(){if(null===vn){var e=bn.alternate;e=null!==e?e.memoizedState:null}else e=vn.next;var t=null===Tn?bn.memoizedState:Tn.next;if(null!==t)Tn=t,vn=e;else{if(null===e)throw Error(u(310));e={memoizedState:(vn=e).memoizedState,baseState:vn.baseState,baseQueue:vn.baseQueue,queue:vn.queue,next:null},null===Tn?bn.memoizedState=Tn=e:Tn=Tn.next=e}return Tn}function Pn(e,t){return"function"==typeof t?t(e):t}function _n(e){var t=Cn(),n=t.queue;if(null===n)throw Error(u(311));n.lastRenderedReducer=e;var r=vn,i=r.baseQueue,l=n.pending;if(null!==l){if(null!==i){var a=i.next;i.next=l.next,l.next=a}r.baseQueue=i=l,n.pending=null}if(null!==i){i=i.next,r=r.baseState;var o=a=l=null,c=i;do{var s=c.expirationTime;if(s<yn){var f={expirationTime:c.expirationTime,suspenseConfig:c.suspenseConfig,action:c.action,eagerReducer:c.eagerReducer,eagerState:c.eagerState,next:null};null===o?(a=o=f,l=r):o=o.next=f,s>bn.expirationTime&&(bn.expirationTime=s,Wi(s))}else null!==o&&(o=o.next={expirationTime:1073741823,suspenseConfig:c.suspenseConfig,action:c.action,eagerReducer:c.eagerReducer,eagerState:c.eagerState,next:null}),Bi(s,c.suspenseConfig),r=c.eagerReducer===e?c.eagerState:e(r,c.action);c=c.next}while(null!==c&&c!==i);null===o?l=r:o.next=a,Tt(r,t.memoizedState)||(ar=!0),t.memoizedState=r,t.baseState=l,t.baseQueue=o,n.lastRenderedState=r}return[t.memoizedState,n.dispatch]}function zn(e){var t=Cn(),n=t.queue;if(null===n)throw Error(u(311));n.lastRenderedReducer=e;var r=n.dispatch,i=n.pending,l=t.memoizedState;if(null!==i){n.pending=null;var a=i=i.next;do{l=e(l,a.action),a=a.next}while(a!==i);Tt(l,t.memoizedState)||(ar=!0),t.memoizedState=l,null===t.baseQueue&&(t.baseState=l),n.lastRenderedState=l}return[l,r]}function Nn(e){var t=kn();return"function"==typeof e&&(e=e()),t.memoizedState=t.baseState=e,e=(e=t.queue={pending:null,dispatch:null,lastRenderedReducer:Pn,lastRenderedState:e}).dispatch=$n.bind(null,bn,e),[t.memoizedState,e]}function In(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},null===(t=bn.updateQueue)?(t={lastEffect:null},bn.updateQueue=t,t.lastEffect=e.next=e):null===(n=t.lastEffect)?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function Dn(){return Cn().memoizedState}function On(e,t,n,r){var i=kn();bn.effectTag|=e,i.memoizedState=In(1|t,n,void 0,void 0===r?null:r)}function Rn(e,t,n,r){var i=Cn();r=void 0===r?null:r;var l=void 0;if(null!==vn){var a=vn.memoizedState;if(l=a.destroy,null!==r&&En(r,a.deps))return void In(t,n,l,r)}bn.effectTag|=e,i.memoizedState=In(1|t,n,l,r)}function Mn(e,t){return On(516,4,e,t)}function An(e,t){return Rn(516,4,e,t)}function jn(e,t){return Rn(4,2,e,t)}function Un(e,t){return"function"==typeof t?(e=e(),t(e),function(){t(null)}):null!=t?(e=e(),t.current=e,function(){t.current=null}):void 0}function Fn(e,t,n){return n=null!=n?n.concat([e]):null,Rn(4,2,Un.bind(null,t,e),n)}function Qn(){}function Hn(e,t){return kn().memoizedState=[e,void 0===t?null:t],e}function Bn(e,t){var n=Cn();t=void 0===t?null:t;var r=n.memoizedState;return null!==r&&null!==t&&En(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Wn(e,t){var n=Cn();t=void 0===t?null:t;var r=n.memoizedState;return null!==r&&null!==t&&En(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function Ln(e,t,n){var r=dt();mt(98>r?98:r,(function(){e(!0)})),mt(97<r?97:r,(function(){var r=gn.suspense;gn.suspense=void 0===t?null:t;try{e(!1),n()}finally{gn.suspense=r}}))}function $n(e,t,n){var r=zi(),i=Bt.suspense;i={expirationTime:r=Ni(r,e,i),suspenseConfig:i,action:n,eagerReducer:null,eagerState:null,next:null};var l=t.pending;if(null===l?i.next=i:(i.next=l.next,l.next=i),t.pending=i,l=e.alternate,e===bn||null!==l&&l===bn)xn=!0,i.expirationTime=yn,bn.expirationTime=yn;else{if(0===e.expirationTime&&(null===l||0===l.expirationTime)&&null!==(l=t.lastRenderedReducer))try{var a=t.lastRenderedState,u=l(a,n);if(i.eagerReducer=l,i.eagerState=u,Tt(u,a))return}catch(e){}Ii(e,r)}}var Vn={readContext:Ot,useCallback:Sn,useContext:Sn,useEffect:Sn,useImperativeHandle:Sn,useLayoutEffect:Sn,useMemo:Sn,useReducer:Sn,useRef:Sn,useState:Sn,useDebugValue:Sn,useResponder:Sn,useDeferredValue:Sn,useTransition:Sn},qn={readContext:Ot,useCallback:Hn,useContext:Ot,useEffect:Mn,useImperativeHandle:function(e,t,n){return n=null!=n?n.concat([e]):null,On(4,2,Un.bind(null,t,e),n)},useLayoutEffect:function(e,t){return On(4,2,e,t)},useMemo:function(e,t){var n=kn();return t=void 0===t?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=kn();return t=void 0!==n?n(t):t,r.memoizedState=r.baseState=t,e=(e=r.queue={pending:null,dispatch:null,lastRenderedReducer:e,lastRenderedState:t}).dispatch=$n.bind(null,bn,e),[r.memoizedState,e]},useRef:function(e){return e={current:e},kn().memoizedState=e},useState:Nn,useDebugValue:Qn,useResponder:mn,useDeferredValue:function(e,t){var n=Nn(e),r=n[0],i=n[1];return Mn((function(){var n=gn.suspense;gn.suspense=void 0===t?null:t;try{i(e)}finally{gn.suspense=n}}),[e,t]),r},useTransition:function(e){var t=Nn(!1),n=t[0];return t=t[1],[Hn(Ln.bind(null,t,e),[t,e]),n]}},Gn={readContext:Ot,useCallback:Bn,useContext:Ot,useEffect:An,useImperativeHandle:Fn,useLayoutEffect:jn,useMemo:Wn,useReducer:_n,useRef:Dn,useState:function(){return _n(Pn)},useDebugValue:Qn,useResponder:mn,useDeferredValue:function(e,t){var n=_n(Pn),r=n[0],i=n[1];return An((function(){var n=gn.suspense;gn.suspense=void 0===t?null:t;try{i(e)}finally{gn.suspense=n}}),[e,t]),r},useTransition:function(e){var t=_n(Pn),n=t[0];return t=t[1],[Bn(Ln.bind(null,t,e),[t,e]),n]}},Kn={readContext:Ot,useCallback:Bn,useContext:Ot,useEffect:An,useImperativeHandle:Fn,useLayoutEffect:jn,useMemo:Wn,useReducer:zn,useRef:Dn,useState:function(){return zn(Pn)},useDebugValue:Qn,useResponder:mn,useDeferredValue:function(e,t){var n=zn(Pn),r=n[0],i=n[1];return An((function(){var n=gn.suspense;gn.suspense=void 0===t?null:t;try{i(e)}finally{gn.suspense=n}}),[e,t]),r},useTransition:function(e){var t=zn(Pn),n=t[0];return t=t[1],[Bn(Ln.bind(null,t,e),[t,e]),n]}},Yn=null,Jn=null,Xn=!1;function Zn(e,t){var n=ol(5,null,null,0);n.elementType="DELETED",n.type="DELETED",n.stateNode=t,n.return=e,n.effectTag=8,null!==e.lastEffect?(e.lastEffect.nextEffect=n,e.lastEffect=n):e.firstEffect=e.lastEffect=n}function er(e,t){switch(e.tag){case 5:return null!==(t=ve(t,e.type,e.pendingProps))&&(e.stateNode=t,!0);case 6:return null!==(t=Te(t,e.pendingProps))&&(e.stateNode=t,!0);case 13:default:return!1}}function tr(e){if(Xn){var t=Jn;if(t){var n=t;if(!er(e,t)){if(!(t=Ee(n))||!er(e,t))return e.effectTag=-1025&e.effectTag|2,Xn=!1,void(Yn=e);Zn(Yn,n)}Yn=e,Jn=we(t)}else e.effectTag=-1025&e.effectTag|2,Xn=!1,Yn=e}}function nr(e){for(e=e.return;null!==e&&5!==e.tag&&3!==e.tag&&13!==e.tag;)e=e.return;Yn=e}function rr(e){if(!J||e!==Yn)return!1;if(!Xn)return nr(e),Xn=!0,!1;var t=e.type;if(5!==e.tag||"head"!==t&&"body"!==t&&!B(t,e.memoizedProps))for(t=Jn;t;)Zn(e,t),t=Ee(t);if(nr(e),13===e.tag){if(!J)throw Error(u(316));if(!(e=null!==(e=e.memoizedState)?e.dehydrated:null))throw Error(u(317));Jn=Pe(e)}else Jn=Yn?Ee(e.stateNode):null;return!0}function ir(){J&&(Jn=Yn=null,Xn=!1)}var lr=o.ReactCurrentOwner,ar=!1;function ur(e,t,n,r){t.child=null===e?tn(t,null,n,r):en(t,e.child,n,r)}function or(e,t,n,r,i){n=n.render;var l=t.ref;return Dt(t,i),r=wn(e,t,n,r,l,i),null===e||ar?(t.effectTag|=1,ur(e,t,r,i),t.child):(t.updateQueue=e.updateQueue,t.effectTag&=-517,e.expirationTime<=i&&(e.expirationTime=0),kr(e,t,i))}function cr(e,t,n,r,i,l){if(null===e){var a=n.type;return"function"!=typeof a||cl(a)||void 0!==a.defaultProps||null!==n.compare||void 0!==n.defaultProps?((e=fl(n.type,null,r,null,t.mode,l)).ref=t.ref,e.return=t,t.child=e):(t.tag=15,t.type=a,sr(e,t,a,r,i,l))}return a=e.child,i<l&&(i=a.memoizedProps,(n=null!==(n=n.compare)?n:St)(i,r)&&e.ref===t.ref)?kr(e,t,l):(t.effectTag|=1,(e=sl(a,r)).ref=t.ref,e.return=t,t.child=e)}function sr(e,t,n,r,i,l){return null!==e&&St(e.memoizedProps,r)&&e.ref===t.ref&&(ar=!1,i<l)?(t.expirationTime=e.expirationTime,kr(e,t,l)):dr(e,t,n,r,l)}function fr(e,t){var n=t.ref;(null===e&&null!==n||null!==e&&e.ref!==n)&&(t.effectTag|=128)}function dr(e,t,n,r,i){var l=He(n)?Fe:je.current;return l=Qe(t,l),Dt(t,i),n=wn(e,t,n,r,l,i),null===e||ar?(t.effectTag|=1,ur(e,t,n,i),t.child):(t.updateQueue=e.updateQueue,t.effectTag&=-517,e.expirationTime<=i&&(e.expirationTime=0),kr(e,t,i))}function pr(e,t,n,r,i){if(He(n)){var l=!0;$e(t)}else l=!1;if(Dt(t,i),null===t.stateNode)null!==e&&(e.alternate=null,t.alternate=null,t.effectTag|=2),qt(t,n,r),Kt(t,n,r,i),r=!0;else if(null===e){var a=t.stateNode,u=t.memoizedProps;a.props=u;var o=a.context,c=n.contextType;"object"==typeof c&&null!==c?c=Ot(c):c=Qe(t,c=He(n)?Fe:je.current);var s=n.getDerivedStateFromProps,f="function"==typeof s||"function"==typeof a.getSnapshotBeforeUpdate;f||"function"!=typeof a.UNSAFE_componentWillReceiveProps&&"function"!=typeof a.componentWillReceiveProps||(u!==r||o!==c)&&Gt(t,a,r,c),Rt=!1;var d=t.memoizedState;a.state=d,Qt(t,r,a,i),o=t.memoizedState,u!==r||d!==o||Ue.current||Rt?("function"==typeof s&&(Lt(t,n,s,r),o=t.memoizedState),(u=Rt||Vt(t,n,u,r,d,o,c))?(f||"function"!=typeof a.UNSAFE_componentWillMount&&"function"!=typeof a.componentWillMount||("function"==typeof a.componentWillMount&&a.componentWillMount(),"function"==typeof a.UNSAFE_componentWillMount&&a.UNSAFE_componentWillMount()),"function"==typeof a.componentDidMount&&(t.effectTag|=4)):("function"==typeof a.componentDidMount&&(t.effectTag|=4),t.memoizedProps=r,t.memoizedState=o),a.props=r,a.state=o,a.context=c,r=u):("function"==typeof a.componentDidMount&&(t.effectTag|=4),r=!1)}else a=t.stateNode,At(e,t),u=t.memoizedProps,a.props=t.type===t.elementType?u:Et(t.type,u),o=a.context,"object"==typeof(c=n.contextType)&&null!==c?c=Ot(c):c=Qe(t,c=He(n)?Fe:je.current),(f="function"==typeof(s=n.getDerivedStateFromProps)||"function"==typeof a.getSnapshotBeforeUpdate)||"function"!=typeof a.UNSAFE_componentWillReceiveProps&&"function"!=typeof a.componentWillReceiveProps||(u!==r||o!==c)&&Gt(t,a,r,c),Rt=!1,o=t.memoizedState,a.state=o,Qt(t,r,a,i),d=t.memoizedState,u!==r||o!==d||Ue.current||Rt?("function"==typeof s&&(Lt(t,n,s,r),d=t.memoizedState),(s=Rt||Vt(t,n,u,r,o,d,c))?(f||"function"!=typeof a.UNSAFE_componentWillUpdate&&"function"!=typeof a.componentWillUpdate||("function"==typeof a.componentWillUpdate&&a.componentWillUpdate(r,d,c),"function"==typeof a.UNSAFE_componentWillUpdate&&a.UNSAFE_componentWillUpdate(r,d,c)),"function"==typeof a.componentDidUpdate&&(t.effectTag|=4),"function"==typeof a.getSnapshotBeforeUpdate&&(t.effectTag|=256)):("function"!=typeof a.componentDidUpdate||u===e.memoizedProps&&o===e.memoizedState||(t.effectTag|=4),"function"!=typeof a.getSnapshotBeforeUpdate||u===e.memoizedProps&&o===e.memoizedState||(t.effectTag|=256),t.memoizedProps=r,t.memoizedState=d),a.props=r,a.state=d,a.context=c,r=s):("function"!=typeof a.componentDidUpdate||u===e.memoizedProps&&o===e.memoizedState||(t.effectTag|=4),"function"!=typeof a.getSnapshotBeforeUpdate||u===e.memoizedProps&&o===e.memoizedState||(t.effectTag|=256),r=!1);return mr(e,t,n,r,l,i)}function mr(e,t,n,r,i,l){fr(e,t);var a=0!=(64&t.effectTag);if(!r&&!a)return i&&Ve(t,n,!1),kr(e,t,l);r=t.stateNode,lr.current=t;var u=a&&"function"!=typeof n.getDerivedStateFromError?null:r.render();return t.effectTag|=1,null!==e&&a?(t.child=en(t,e.child,null,l),t.child=en(t,null,u,l)):ur(e,t,u,l),t.memoizedState=r.state,i&&Ve(t,n,!0),t.child}function hr(e){var t=e.stateNode;t.pendingContext?We(0,t.pendingContext,t.pendingContext!==t.context):t.context&&We(0,t.context,!1),on(e,t.containerInfo)}var gr,yr,br,vr,Tr={dehydrated:null,retryTime:0};function xr(e,t,n){var r,i=t.mode,l=t.pendingProps,a=dn.current,u=!1;if((r=0!=(64&t.effectTag))||(r=0!=(2&a)&&(null===e||null!==e.memoizedState)),r?(u=!0,t.effectTag&=-65):null!==e&&null===e.memoizedState||void 0===l.fallback||!0===l.unstable_avoidThisFallback||(a|=1),Me(dn,1&a),null===e){if(void 0!==l.fallback&&tr(t),u){if(u=l.fallback,(l=dl(null,i,0,null)).return=t,0==(2&t.mode))for(e=null!==t.memoizedState?t.child.child:t.child,l.child=e;null!==e;)e.return=l,e=e.sibling;return(n=dl(u,i,n,null)).return=t,l.sibling=n,t.memoizedState=Tr,t.child=l,n}return i=l.children,t.memoizedState=null,t.child=tn(t,null,i,n)}if(null!==e.memoizedState){if(i=(e=e.child).sibling,u){if(l=l.fallback,(n=sl(e,e.pendingProps)).return=t,0==(2&t.mode)&&(u=null!==t.memoizedState?t.child.child:t.child)!==e.child)for(n.child=u;null!==u;)u.return=n,u=u.sibling;return(i=sl(i,l)).return=t,n.sibling=i,n.childExpirationTime=0,t.memoizedState=Tr,t.child=n,i}return n=en(t,e.child,l.children,n),t.memoizedState=null,t.child=n}if(e=e.child,u){if(u=l.fallback,(l=dl(null,i,0,null)).return=t,l.child=e,null!==e&&(e.return=l),0==(2&t.mode))for(e=null!==t.memoizedState?t.child.child:t.child,l.child=e;null!==e;)e.return=l,e=e.sibling;return(n=dl(u,i,n,null)).return=t,l.sibling=n,n.effectTag|=2,l.childExpirationTime=0,t.memoizedState=Tr,t.child=l,n}return t.memoizedState=null,t.child=en(t,e,l.children,n)}function Sr(e,t){e.expirationTime<t&&(e.expirationTime=t);var n=e.alternate;null!==n&&n.expirationTime<t&&(n.expirationTime=t),It(e.return,t)}function Er(e,t,n,r,i,l){var a=e.memoizedState;null===a?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailExpiration:0,tailMode:i,lastEffect:l}:(a.isBackwards=t,a.rendering=null,a.renderingStartTime=0,a.last=r,a.tail=n,a.tailExpiration=0,a.tailMode=i,a.lastEffect=l)}function wr(e,t,n){var r=t.pendingProps,i=r.revealOrder,l=r.tail;if(ur(e,t,r.children,n),0!=(2&(r=dn.current)))r=1&r|2,t.effectTag|=64;else{if(null!==e&&0!=(64&e.effectTag))e:for(e=t.child;null!==e;){if(13===e.tag)null!==e.memoizedState&&Sr(e,n);else if(19===e.tag)Sr(e,n);else if(null!==e.child){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;null===e.sibling;){if(null===e.return||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(Me(dn,r),0==(2&t.mode))t.memoizedState=null;else switch(i){case"forwards":for(n=t.child,i=null;null!==n;)null!==(e=n.alternate)&&null===pn(e)&&(i=n),n=n.sibling;null===(n=i)?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),Er(t,!1,i,n,l,t.lastEffect);break;case"backwards":for(n=null,i=t.child,t.child=null;null!==i;){if(null!==(e=i.alternate)&&null===pn(e)){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}Er(t,!0,n,null,l,t.lastEffect);break;case"together":Er(t,!1,null,null,void 0,t.lastEffect);break;default:t.memoizedState=null}return t.child}function kr(e,t,n){null!==e&&(t.dependencies=e.dependencies);var r=t.expirationTime;if(0!==r&&Wi(r),t.childExpirationTime<n)return null;if(null!==e&&t.child!==e.child)throw Error(u(153));if(null!==t.child){for(n=sl(e=t.child,e.pendingProps),t.child=n,n.return=t;null!==e.sibling;)e=e.sibling,(n=n.sibling=sl(e,e.pendingProps)).return=t;n.sibling=null}return t.child}function Cr(e){e.effectTag|=4}if(K)gr=function(e,t){for(var n=t.child;null!==n;){if(5===n.tag||6===n.tag)F(e,n.stateNode);else if(4!==n.tag&&null!==n.child){n.child.return=n,n=n.child;continue}if(n===t)break;for(;null===n.sibling;){if(null===n.return||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}},yr=function(){},br=function(e,t,n,r,i){if((e=e.memoizedProps)!==r){var l=t.stateNode,a=un(rn.current);n=H(l,n,e,r,i,a),(t.updateQueue=n)&&Cr(t)}},vr=function(e,t,n,r){n!==r&&Cr(t)};else if(Y){gr=function(e,t,n,r){for(var i=t.child;null!==i;){if(5===i.tag){var l=i.stateNode;n&&r&&(l=ye(l,i.type,i.memoizedProps,i)),F(e,l)}else if(6===i.tag)l=i.stateNode,n&&r&&(l=be(l,i.memoizedProps,i)),F(e,l);else if(4!==i.tag){if(13===i.tag&&0!=(4&i.effectTag)&&(l=null!==i.memoizedState)){var a=i.child;if(null!==a&&(null!==a.child&&(a.child.return=a,gr(e,a,!0,l)),null!==(l=a.sibling))){l.return=i,i=l;continue}}if(null!==i.child){i.child.return=i,i=i.child;continue}}if(i===t)break;for(;null===i.sibling;){if(null===i.return||i.return===t)return;i=i.return}i.sibling.return=i.return,i=i.sibling}};var Pr=function(e,t,n,r){for(var i=t.child;null!==i;){if(5===i.tag){var l=i.stateNode;n&&r&&(l=ye(l,i.type,i.memoizedProps,i)),me(e,l)}else if(6===i.tag)l=i.stateNode,n&&r&&(l=be(l,i.memoizedProps,i)),me(e,l);else if(4!==i.tag){if(13===i.tag&&0!=(4&i.effectTag)&&(l=null!==i.memoizedState)){var a=i.child;if(null!==a&&(null!==a.child&&(a.child.return=a,Pr(e,a,!0,l)),null!==(l=a.sibling))){l.return=i,i=l;continue}}if(null!==i.child){i.child.return=i,i=i.child;continue}}if(i===t)break;for(;null===i.sibling;){if(null===i.return||i.return===t)return;i=i.return}i.sibling.return=i.return,i=i.sibling}};yr=function(e){var t=e.stateNode;if(null!==e.firstEffect){var n=t.containerInfo,r=pe(n);Pr(r,e,!1,!1),t.pendingChildren=r,Cr(e),he(n,r)}},br=function(e,t,n,r,i){var l=e.stateNode,a=e.memoizedProps;if((e=null===t.firstEffect)&&a===r)t.stateNode=l;else{var u=t.stateNode,o=un(rn.current),c=null;a!==r&&(c=H(u,n,a,r,i,o)),e&&null===c?t.stateNode=l:(l=de(l,c,n,a,r,t,e,u),Q(l,n,r,i,o)&&Cr(t),t.stateNode=l,e?Cr(t):gr(l,t,!1,!1))}},vr=function(e,t,n,r){n!==r?(e=un(an.current),n=un(rn.current),t.stateNode=L(r,e,n,t),Cr(t)):t.stateNode=e.stateNode}}else yr=function(){},br=function(){},vr=function(){};function _r(e,t){switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;null!==t;)null!==t.alternate&&(n=t),t=t.sibling;null===n?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;null!==n;)null!==n.alternate&&(r=n),n=n.sibling;null===r?t||null===e.tail?e.tail=null:e.tail.sibling=null:r.sibling=null}}function zr(e,t,n){var r=t.pendingProps;switch(t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return null;case 1:return He(t.type)&&Be(),null;case 3:return cn(),Re(Ue),Re(je),(r=t.stateNode).pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(null===e||null===e.child)&&rr(t)&&Cr(t),yr(t),null;case 5:fn(t);var i=un(an.current);if(n=t.type,null!==e&&null!=t.stateNode)br(e,t,n,r,i),e.ref!==t.ref&&(t.effectTag|=128);else{if(!r){if(null===t.stateNode)throw Error(u(166));return null}if(e=un(rn.current),rr(t)){if(!J)throw Error(u(175));e=ke(t.stateNode,t.type,t.memoizedProps,i,e,t),t.updateQueue=e,null!==e&&Cr(t)}else{var l=U(n,r,i,e,t);gr(l,t,!1,!1),t.stateNode=l,Q(l,n,r,i,e)&&Cr(t)}null!==t.ref&&(t.effectTag|=128)}return null;case 6:if(e&&null!=t.stateNode)vr(e,t,e.memoizedProps,r);else{if("string"!=typeof r&&null===t.stateNode)throw Error(u(166));if(e=un(an.current),i=un(rn.current),rr(t)){if(!J)throw Error(u(176));Ce(t.stateNode,t.memoizedProps,t)&&Cr(t)}else t.stateNode=L(r,e,i,t)}return null;case 13:return Re(dn),r=t.memoizedState,0!=(64&t.effectTag)?(t.expirationTime=n,t):(r=null!==r,i=!1,null===e?void 0!==t.memoizedProps.fallback&&rr(t):(i=null!==(n=e.memoizedState),r||null===n||null!==(n=e.child.sibling)&&(null!==(l=t.firstEffect)?(t.firstEffect=n,n.nextEffect=l):(t.firstEffect=t.lastEffect=n,n.nextEffect=null),n.effectTag=8)),r&&!i&&0!=(2&t.mode)&&(null===e&&!0!==t.memoizedProps.unstable_avoidThisFallback||0!=(1&dn.current)?si===ri&&(si=ii):(si!==ri&&si!==ii||(si=li),0!==hi&&null!==ui&&(yl(ui,ci),bl(ui,hi)))),Y&&r&&(t.effectTag|=4),K&&(r||i)&&(t.effectTag|=4),null);case 4:return cn(),yr(t),null;case 10:return Nt(t),null;case 17:return He(t.type)&&Be(),null;case 19:if(Re(dn),null===(r=t.memoizedState))return null;if(i=0!=(64&t.effectTag),null===(l=r.rendering)){if(i)_r(r,!1);else if(si!==ri||null!==e&&0!=(64&e.effectTag))for(e=t.child;null!==e;){if(null!==(l=pn(e))){for(t.effectTag|=64,_r(r,!1),null!==(e=l.updateQueue)&&(t.updateQueue=e,t.effectTag|=4),null===r.lastEffect&&(t.firstEffect=null),t.lastEffect=r.lastEffect,e=n,r=t.child;null!==r;)n=e,(i=r).effectTag&=2,i.nextEffect=null,i.firstEffect=null,i.lastEffect=null,null===(l=i.alternate)?(i.childExpirationTime=0,i.expirationTime=n,i.child=null,i.memoizedProps=null,i.memoizedState=null,i.updateQueue=null,i.dependencies=null):(i.childExpirationTime=l.childExpirationTime,i.expirationTime=l.expirationTime,i.child=l.child,i.memoizedProps=l.memoizedProps,i.memoizedState=l.memoizedState,i.updateQueue=l.updateQueue,n=l.dependencies,i.dependencies=null===n?null:{expirationTime:n.expirationTime,firstContext:n.firstContext,responders:n.responders}),r=r.sibling;return Me(dn,1&dn.current|2),t.child}e=e.sibling}}else{if(!i)if(null!==(e=pn(l))){if(t.effectTag|=64,i=!0,null!==(e=e.updateQueue)&&(t.updateQueue=e,t.effectTag|=4),_r(r,!0),null===r.tail&&"hidden"===r.tailMode&&!l.alternate)return null!==(t=t.lastEffect=r.lastEffect)&&(t.nextEffect=null),null}else 2*ft()-r.renderingStartTime>r.tailExpiration&&1<n&&(t.effectTag|=64,i=!0,_r(r,!1),t.expirationTime=t.childExpirationTime=n-1);r.isBackwards?(l.sibling=t.child,t.child=l):(null!==(e=r.last)?e.sibling=l:t.child=l,r.last=l)}return null!==r.tail?(0===r.tailExpiration&&(r.tailExpiration=ft()+500),e=r.tail,r.rendering=e,r.tail=e.sibling,r.lastEffect=t.lastEffect,r.renderingStartTime=ft(),e.sibling=null,t=dn.current,Me(dn,i?1&t|2:1&t),e):null}throw Error(u(156,t.tag))}function Nr(e){switch(e.tag){case 1:He(e.type)&&Be();var t=e.effectTag;return 4096&t?(e.effectTag=-4097&t|64,e):null;case 3:if(cn(),Re(Ue),Re(je),0!=(64&(t=e.effectTag)))throw Error(u(285));return e.effectTag=-4097&t|64,e;case 5:return fn(e),null;case 13:return Re(dn),4096&(t=e.effectTag)?(e.effectTag=-4097&t|64,e):null;case 19:return Re(dn),null;case 4:return cn(),null;case 10:return Nt(e),null;default:return null}}function Ir(e,t){return{value:e,source:t,stack:Ie(t)}}var Dr="function"==typeof WeakSet?WeakSet:Set;function Or(e,t){var n=t.source,r=t.stack;null===r&&null!==n&&(r=Ie(n)),null!==n&&_(n.type),t=t.value,null!==e&&1===e.tag&&_(e.type);try{console.error(t)}catch(e){setTimeout((function(){throw e}))}}function Rr(e){var t=e.ref;if(null!==t)if("function"==typeof t)try{t(null)}catch(t){tl(e,t)}else t.current=null}function Mr(e,t){switch(t.tag){case 0:case 11:case 15:case 22:return;case 1:if(256&t.effectTag&&null!==e){var n=e.memoizedProps,r=e.memoizedState;t=(e=t.stateNode).getSnapshotBeforeUpdate(t.elementType===t.type?n:Et(t.type,n),r),e.__reactInternalSnapshotBeforeUpdate=t}return;case 3:case 5:case 6:case 4:case 17:return}throw Error(u(163))}function Ar(e,t){if(null!==(t=null!==(t=t.updateQueue)?t.lastEffect:null)){var n=t=t.next;do{if((n.tag&e)===e){var r=n.destroy;n.destroy=void 0,void 0!==r&&r()}n=n.next}while(n!==t)}}function jr(e,t){if(null!==(t=null!==(t=t.updateQueue)?t.lastEffect:null)){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function Ur(e,t,n){switch(n.tag){case 0:case 11:case 15:case 22:return void jr(3,n);case 1:if(e=n.stateNode,4&n.effectTag)if(null===t)e.componentDidMount();else{var r=n.elementType===n.type?t.memoizedProps:Et(n.type,t.memoizedProps);e.componentDidUpdate(r,t.memoizedState,e.__reactInternalSnapshotBeforeUpdate)}return void(null!==(t=n.updateQueue)&&Ht(n,t,e));case 3:if(null!==(t=n.updateQueue)){if(e=null,null!==n.child)switch(n.child.tag){case 5:e=O(n.child.stateNode);break;case 1:e=n.child.stateNode}Ht(n,t,e)}return;case 5:return e=n.stateNode,void(null===t&&4&n.effectTag&&te(e,n.type,n.memoizedProps,n));case 6:case 4:case 12:return;case 13:return void(J&&null===n.memoizedState&&(n=n.alternate,null!==n&&(n=n.memoizedState,null!==n&&(n=n.dehydrated,null!==n&&ze(n)))));case 19:case 17:case 20:case 21:return}throw Error(u(163))}function Fr(e,t,n){switch("function"==typeof al&&al(t),t.tag){case 0:case 11:case 14:case 15:case 22:if(null!==(e=t.updateQueue)&&null!==(e=e.lastEffect)){var r=e.next;mt(97<n?97:n,(function(){var e=r;do{var n=e.destroy;if(void 0!==n){var i=t;try{n()}catch(e){tl(i,e)}}e=e.next}while(e!==r)}))}break;case 1:Rr(t),"function"==typeof(n=t.stateNode).componentWillUnmount&&function(e,t){try{t.props=e.memoizedProps,t.state=e.memoizedState,t.componentWillUnmount()}catch(t){tl(e,t)}}(t,n);break;case 5:Rr(t);break;case 4:K?Lr(e,t,n):Y&&function(e){if(Y){e=e.stateNode.containerInfo;var t=pe(e);ge(e,t)}}(t)}}function Qr(e,t,n){for(var r=t;;)if(Fr(e,r,n),null===r.child||K&&4===r.tag){if(r===t)break;for(;null===r.sibling;){if(null===r.return||r.return===t)return;r=r.return}r.sibling.return=r.return,r=r.sibling}else r.child.return=r,r=r.child}function Hr(e){var t=e.alternate;e.return=null,e.child=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.alternate=null,e.firstEffect=null,e.lastEffect=null,e.pendingProps=null,e.memoizedProps=null,e.stateNode=null,null!==t&&Hr(t)}function Br(e){return 5===e.tag||3===e.tag||4===e.tag}function Wr(e){if(K){e:{for(var t=e.return;null!==t;){if(Br(t)){var n=t;break e}t=t.return}throw Error(u(160))}switch(t=n.stateNode,n.tag){case 5:var r=!1;break;case 3:case 4:t=t.containerInfo,r=!0;break;default:throw Error(u(161))}16&n.effectTag&&(ue(t),n.effectTag&=-17);e:t:for(n=e;;){for(;null===n.sibling;){if(null===n.return||Br(n.return)){n=null;break e}n=n.return}for(n.sibling.return=n.return,n=n.sibling;5!==n.tag&&6!==n.tag&&18!==n.tag;){if(2&n.effectTag)continue t;if(null===n.child||4===n.tag)continue t;n.child.return=n,n=n.child}if(!(2&n.effectTag)){n=n.stateNode;break e}}r?function e(t,n,r){var i=t.tag,l=5===i||6===i;if(l)t=l?t.stateNode:t.stateNode.instance,n?ie(r,t,n):Z(r,t);else if(4!==i&&null!==(t=t.child))for(e(t,n,r),t=t.sibling;null!==t;)e(t,n,r),t=t.sibling}(e,n,t):function e(t,n,r){var i=t.tag,l=5===i||6===i;if(l)t=l?t.stateNode:t.stateNode.instance,n?re(r,t,n):X(r,t);else if(4!==i&&null!==(t=t.child))for(e(t,n,r),t=t.sibling;null!==t;)e(t,n,r),t=t.sibling}(e,n,t)}}function Lr(e,t,n){for(var r,i,l=t,a=!1;;){if(!a){a=l.return;e:for(;;){if(null===a)throw Error(u(160));switch(r=a.stateNode,a.tag){case 5:i=!1;break e;case 3:case 4:r=r.containerInfo,i=!0;break e}a=a.return}a=!0}if(5===l.tag||6===l.tag)Qr(e,l,n),i?ae(r,l.stateNode):le(r,l.stateNode);else if(4===l.tag){if(null!==l.child){r=l.stateNode.containerInfo,i=!0,l.child.return=l,l=l.child;continue}}else if(Fr(e,l,n),null!==l.child){l.child.return=l,l=l.child;continue}if(l===t)break;for(;null===l.sibling;){if(null===l.return||l.return===t)return;4===(l=l.return).tag&&(a=!1)}l.sibling.return=l.return,l=l.sibling}}function $r(e,t){if(K){switch(t.tag){case 0:case 11:case 14:case 15:case 22:return void Ar(3,t);case 1:return;case 5:var n=t.stateNode;if(null!=n){var r=t.memoizedProps;e=null!==e?e.memoizedProps:r;var i=t.type,l=t.updateQueue;t.updateQueue=null,null!==l&&ne(n,l,i,e,r,t)}return;case 6:if(null===t.stateNode)throw Error(u(162));return n=t.memoizedProps,void ee(t.stateNode,null!==e?e.memoizedProps:n,n);case 3:return void(J&&(t=t.stateNode,t.hydrate&&(t.hydrate=!1,_e(t.containerInfo))));case 12:return;case 13:return Vr(t),void qr(t);case 19:return void qr(t);case 17:return}throw Error(u(163))}switch(t.tag){case 0:case 11:case 14:case 15:case 22:return void Ar(3,t);case 12:return;case 13:return Vr(t),void qr(t);case 19:return void qr(t);case 3:J&&((n=t.stateNode).hydrate&&(n.hydrate=!1,_e(n.containerInfo)))}e:if(Y){switch(t.tag){case 1:case 5:case 6:case 20:break e;case 3:case 4:t=t.stateNode,ge(t.containerInfo,t.pendingChildren);break e}throw Error(u(163))}}function Vr(e){var t=e;if(null===e.memoizedState)var n=!1;else n=!0,t=e.child,yi=ft();if(K&&null!==t)e:if(e=t,K)for(t=e;;){if(5===t.tag){var r=t.stateNode;n?oe(r):se(t.stateNode,t.memoizedProps)}else if(6===t.tag)r=t.stateNode,n?ce(r):fe(r,t.memoizedProps);else{if(13===t.tag&&null!==t.memoizedState&&null===t.memoizedState.dehydrated){(r=t.child.sibling).return=t,t=r;continue}if(null!==t.child){t.child.return=t,t=t.child;continue}}if(t===e)break e;for(;null===t.sibling;){if(null===t.return||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}}function qr(e){var t=e.updateQueue;if(null!==t){e.updateQueue=null;var n=e.stateNode;null===n&&(n=e.stateNode=new Dr),t.forEach((function(t){var r=rl.bind(null,e,t);n.has(t)||(n.add(t),t.then(r,r))}))}}var Gr="function"==typeof WeakMap?WeakMap:Map;function Kr(e,t,n){(n=jt(n,null)).tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){vi||(vi=!0,Ti=r),Or(e,t)},n}function Yr(e,t,n){(n=jt(n,null)).tag=3;var r=e.type.getDerivedStateFromError;if("function"==typeof r){var i=t.value;n.payload=function(){return Or(e,t),r(i)}}var l=e.stateNode;return null!==l&&"function"==typeof l.componentDidCatch&&(n.callback=function(){"function"!=typeof r&&(null===xi?xi=new Set([this]):xi.add(this),Or(e,t));var n=t.stack;this.componentDidCatch(t.value,{componentStack:null!==n?n:""})}),n}var Jr,Xr=Math.ceil,Zr=o.ReactCurrentDispatcher,ei=o.ReactCurrentOwner,ti=16,ni=32,ri=0,ii=3,li=4,ai=0,ui=null,oi=null,ci=0,si=ri,fi=null,di=1073741823,pi=1073741823,mi=null,hi=0,gi=!1,yi=0,bi=null,vi=!1,Ti=null,xi=null,Si=!1,Ei=null,wi=90,ki=null,Ci=0,Pi=null,_i=0;function zi(){return 0!=(48&ai)?1073741821-(ft()/10|0):0!==_i?_i:_i=1073741821-(ft()/10|0)}function Ni(e,t,n){if(0==(2&(t=t.mode)))return 1073741823;var r=dt();if(0==(4&t))return 99===r?1073741823:1073741822;if(0!=(ai&ti))return ci;if(null!==n)e=vt(e,0|n.timeoutMs||5e3,250);else switch(r){case 99:e=1073741823;break;case 98:e=vt(e,150,100);break;case 97:case 96:e=vt(e,5e3,250);break;case 95:e=2;break;default:throw Error(u(326))}return null!==ui&&e===ci&&--e,e}function Ii(e,t){if(50<Ci)throw Ci=0,Pi=null,Error(u(185));if(null!==(e=Di(e,t))){var n=dt();1073741823===t?0!=(8&ai)&&0==(48&ai)?Ai(e):(Ri(e),0===ai&&yt()):Ri(e),0==(4&ai)||98!==n&&99!==n||(null===ki?ki=new Map([[e,t]]):(void 0===(n=ki.get(e))||n>t)&&ki.set(e,t))}}function Di(e,t){e.expirationTime<t&&(e.expirationTime=t);var n=e.alternate;null!==n&&n.expirationTime<t&&(n.expirationTime=t);var r=e.return,i=null;if(null===r&&3===e.tag)i=e.stateNode;else for(;null!==r;){if(n=r.alternate,r.childExpirationTime<t&&(r.childExpirationTime=t),null!==n&&n.childExpirationTime<t&&(n.childExpirationTime=t),null===r.return&&3===r.tag){i=r.stateNode;break}r=r.return}return null!==i&&(ui===i&&(Wi(t),si===li&&yl(i,ci)),bl(i,t)),i}function Oi(e){var t=e.lastExpiredTime;if(0!==t)return t;if(!gl(e,t=e.firstPendingTime))return t;var n=e.lastPingedTime;return 2>=(e=n>(e=e.nextKnownPendingLevel)?n:e)&&t!==e?0:e}function Ri(e){if(0!==e.lastExpiredTime)e.callbackExpirationTime=1073741823,e.callbackPriority=99,e.callbackNode=gt(Ai.bind(null,e));else{var t=Oi(e),n=e.callbackNode;if(0===t)null!==n&&(e.callbackNode=null,e.callbackExpirationTime=0,e.callbackPriority=90);else{var r=zi();if(1073741823===t?r=99:1===t||2===t?r=95:r=0>=(r=10*(1073741821-t)-10*(1073741821-r))?99:250>=r?98:5250>=r?97:95,null!==n){var i=e.callbackPriority;if(e.callbackExpirationTime===t&&i>=r)return;n!==it&&Ke(n)}e.callbackExpirationTime=t,e.callbackPriority=r,t=1073741823===t?gt(Ai.bind(null,e)):ht(r,Mi.bind(null,e),{timeout:10*(1073741821-t)-ft()}),e.callbackNode=t}}}function Mi(e,t){if(_i=0,t)return vl(e,t=zi()),Ri(e),null;var n=Oi(e);if(0!==n){if(t=e.callbackNode,0!=(48&ai))throw Error(u(327));if(Xi(),e===ui&&n===ci||Fi(e,n),null!==oi){var r=ai;ai|=ti;for(var i=Hi();;)try{$i();break}catch(t){Qi(e,t)}if(_t(),ai=r,Zr.current=i,1===si)throw t=fi,Fi(e,n),yl(e,n),Ri(e),t;if(null===oi)switch(i=e.finishedWork=e.current.alternate,e.finishedExpirationTime=n,r=si,ui=null,r){case ri:case 1:throw Error(u(345));case 2:vl(e,2<n?2:n);break;case ii:if(yl(e,n),n===(r=e.lastSuspendedTime)&&(e.nextKnownPendingLevel=Gi(i)),1073741823===di&&10<(i=yi+500-ft())){if(gi){var l=e.lastPingedTime;if(0===l||l>=n){e.lastPingedTime=n,Fi(e,n);break}}if(0!==(l=Oi(e))&&l!==n)break;if(0!==r&&r!==n){e.lastPingedTime=r;break}e.timeoutHandle=$(Ki.bind(null,e),i);break}Ki(e);break;case li:if(yl(e,n),n===(r=e.lastSuspendedTime)&&(e.nextKnownPendingLevel=Gi(i)),gi&&(0===(i=e.lastPingedTime)||i>=n)){e.lastPingedTime=n,Fi(e,n);break}if(0!==(i=Oi(e))&&i!==n)break;if(0!==r&&r!==n){e.lastPingedTime=r;break}if(1073741823!==pi?r=10*(1073741821-pi)-ft():1073741823===di?r=0:(r=10*(1073741821-di)-5e3,0>(r=(i=ft())-r)&&(r=0),(n=10*(1073741821-n)-i)<(r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*Xr(r/1960))-r)&&(r=n)),10<r){e.timeoutHandle=$(Ki.bind(null,e),r);break}Ki(e);break;case 5:if(1073741823!==di&&null!==mi){l=di;var a=mi;if(0>=(r=0|a.busyMinDurationMs)?r=0:(i=0|a.busyDelayMs,r=(l=ft()-(10*(1073741821-l)-(0|a.timeoutMs||5e3)))<=i?0:i+r-l),10<r){yl(e,n),e.timeoutHandle=$(Ki.bind(null,e),r);break}}Ki(e);break;default:throw Error(u(329))}if(Ri(e),e.callbackNode===t)return Mi.bind(null,e)}}return null}function Ai(e){var t=e.lastExpiredTime;if(t=0!==t?t:1073741823,0!=(48&ai))throw Error(u(327));if(Xi(),e===ui&&t===ci||Fi(e,t),null!==oi){var n=ai;ai|=ti;for(var r=Hi();;)try{Li();break}catch(t){Qi(e,t)}if(_t(),ai=n,Zr.current=r,1===si)throw n=fi,Fi(e,t),yl(e,t),Ri(e),n;if(null!==oi)throw Error(u(261));e.finishedWork=e.current.alternate,e.finishedExpirationTime=t,ui=null,Ki(e),Ri(e)}return null}function ji(e,t){var n=ai;ai|=1;try{return e(t)}finally{0===(ai=n)&&yt()}}function Ui(e,t){if(0!=(48&ai))throw Error(u(187));var n=ai;ai|=1;try{return mt(99,e.bind(null,t))}finally{ai=n,yt()}}function Fi(e,t){e.finishedWork=null,e.finishedExpirationTime=0;var n=e.timeoutHandle;if(n!==q&&(e.timeoutHandle=q,V(n)),null!==oi)for(n=oi.return;null!==n;){var r=n;switch(r.tag){case 1:null!=(r=r.type.childContextTypes)&&Be();break;case 3:cn(),Re(Ue),Re(je);break;case 5:fn(r);break;case 4:cn();break;case 13:case 19:Re(dn);break;case 10:Nt(r)}n=n.return}ui=e,oi=sl(e.current,null),ci=t,si=ri,fi=null,pi=di=1073741823,mi=null,hi=0,gi=!1}function Qi(e,t){for(;;){try{if(_t(),hn.current=Vn,xn)for(var n=bn.memoizedState;null!==n;){var r=n.queue;null!==r&&(r.pending=null),n=n.next}if(yn=0,Tn=vn=bn=null,xn=!1,null===oi||null===oi.return)return si=1,fi=t,oi=null;e:{var i=e,l=oi.return,a=oi,u=t;if(t=ci,a.effectTag|=2048,a.firstEffect=a.lastEffect=null,null!==u&&"object"==typeof u&&"function"==typeof u.then){var o=u;if(0==(2&a.mode)){var c=a.alternate;c?(a.updateQueue=c.updateQueue,a.memoizedState=c.memoizedState,a.expirationTime=c.expirationTime):(a.updateQueue=null,a.memoizedState=null)}var s=0!=(1&dn.current),f=l;do{var d;if(d=13===f.tag){var p=f.memoizedState;if(null!==p)d=null!==p.dehydrated;else{var m=f.memoizedProps;d=void 0!==m.fallback&&(!0!==m.unstable_avoidThisFallback||!s)}}if(d){var h=f.updateQueue;if(null===h){var g=new Set;g.add(o),f.updateQueue=g}else h.add(o);if(0==(2&f.mode)){if(f.effectTag|=64,a.effectTag&=-2981,1===a.tag)if(null===a.alternate)a.tag=17;else{var y=jt(1073741823,null);y.tag=2,Ut(a,y)}a.expirationTime=1073741823;break e}u=void 0,a=t;var b=i.pingCache;if(null===b?(b=i.pingCache=new Gr,u=new Set,b.set(o,u)):void 0===(u=b.get(o))&&(u=new Set,b.set(o,u)),!u.has(a)){u.add(a);var v=nl.bind(null,i,o,a);o.then(v,v)}f.effectTag|=4096,f.expirationTime=t;break e}f=f.return}while(null!==f);u=Error((_(a.type)||"A React component")+" suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display."+Ie(a))}5!==si&&(si=2),u=Ir(u,a),f=l;do{switch(f.tag){case 3:o=u,f.effectTag|=4096,f.expirationTime=t,Ft(f,Kr(f,o,t));break e;case 1:o=u;var T=f.type,x=f.stateNode;if(0==(64&f.effectTag)&&("function"==typeof T.getDerivedStateFromError||null!==x&&"function"==typeof x.componentDidCatch&&(null===xi||!xi.has(x)))){f.effectTag|=4096,f.expirationTime=t,Ft(f,Yr(f,o,t));break e}}f=f.return}while(null!==f)}oi=qi(oi)}catch(e){t=e;continue}break}}function Hi(){var e=Zr.current;return Zr.current=Vn,null===e?Vn:e}function Bi(e,t){e<di&&2<e&&(di=e),null!==t&&e<pi&&2<e&&(pi=e,mi=t)}function Wi(e){e>hi&&(hi=e)}function Li(){for(;null!==oi;)oi=Vi(oi)}function $i(){for(;null!==oi&&!lt();)oi=Vi(oi)}function Vi(e){var t=Jr(e.alternate,e,ci);return e.memoizedProps=e.pendingProps,null===t&&(t=qi(e)),ei.current=null,t}function qi(e){oi=e;do{var t=oi.alternate;if(e=oi.return,0==(2048&oi.effectTag)){if(t=zr(t,oi,ci),1===ci||1!==oi.childExpirationTime){for(var n=0,r=oi.child;null!==r;){var i=r.expirationTime,l=r.childExpirationTime;i>n&&(n=i),l>n&&(n=l),r=r.sibling}oi.childExpirationTime=n}if(null!==t)return t;null!==e&&0==(2048&e.effectTag)&&(null===e.firstEffect&&(e.firstEffect=oi.firstEffect),null!==oi.lastEffect&&(null!==e.lastEffect&&(e.lastEffect.nextEffect=oi.firstEffect),e.lastEffect=oi.lastEffect),1<oi.effectTag&&(null!==e.lastEffect?e.lastEffect.nextEffect=oi:e.firstEffect=oi,e.lastEffect=oi))}else{if(null!==(t=Nr(oi)))return t.effectTag&=2047,t;null!==e&&(e.firstEffect=e.lastEffect=null,e.effectTag|=2048)}if(null!==(t=oi.sibling))return t;oi=e}while(null!==oi);return si===ri&&(si=5),null}function Gi(e){var t=e.expirationTime;return t>(e=e.childExpirationTime)?t:e}function Ki(e){var t=dt();return mt(99,Yi.bind(null,e,t)),null}function Yi(e,t){do{Xi()}while(null!==Ei);if(0!=(48&ai))throw Error(u(327));var n=e.finishedWork,r=e.finishedExpirationTime;if(null===n)return null;if(e.finishedWork=null,e.finishedExpirationTime=0,n===e.current)throw Error(u(177));e.callbackNode=null,e.callbackExpirationTime=0,e.callbackPriority=90,e.nextKnownPendingLevel=0;var i=Gi(n);if(e.firstPendingTime=i,r<=e.lastSuspendedTime?e.firstSuspendedTime=e.lastSuspendedTime=e.nextKnownPendingLevel=0:r<=e.firstSuspendedTime&&(e.firstSuspendedTime=r-1),r<=e.lastPingedTime&&(e.lastPingedTime=0),r<=e.lastExpiredTime&&(e.lastExpiredTime=0),e===ui&&(oi=ui=null,ci=0),1<n.effectTag?null!==n.lastEffect?(n.lastEffect.nextEffect=n,i=n.firstEffect):i=n:i=n.firstEffect,null!==i){var l=ai;ai|=ni,ei.current=null,A(e.containerInfo),bi=i;do{try{Ji()}catch(e){if(null===bi)throw Error(u(330));tl(bi,e),bi=bi.nextEffect}}while(null!==bi);bi=i;do{try{for(var a=e,o=t;null!==bi;){var c=bi.effectTag;if(16&c&&K&&ue(bi.stateNode),128&c){var s=bi.alternate;if(null!==s){var f=s.ref;null!==f&&("function"==typeof f?f(null):f.current=null)}}switch(1038&c){case 2:Wr(bi),bi.effectTag&=-3;break;case 6:Wr(bi),bi.effectTag&=-3,$r(bi.alternate,bi);break;case 1024:bi.effectTag&=-1025;break;case 1028:bi.effectTag&=-1025,$r(bi.alternate,bi);break;case 4:$r(bi.alternate,bi);break;case 8:var d=a,p=bi,m=o;K?Lr(d,p,m):Qr(d,p,m),Hr(p)}bi=bi.nextEffect}}catch(e){if(null===bi)throw Error(u(330));tl(bi,e),bi=bi.nextEffect}}while(null!==bi);j(e.containerInfo),e.current=n,bi=i;do{try{for(c=e;null!==bi;){var h=bi.effectTag;if(36&h&&Ur(c,bi.alternate,bi),128&h){s=void 0;var g=bi.ref;if(null!==g){var y=bi.stateNode;switch(bi.tag){case 5:s=O(y);break;default:s=y}"function"==typeof g?g(s):g.current=s}}bi=bi.nextEffect}}catch(e){if(null===bi)throw Error(u(330));tl(bi,e),bi=bi.nextEffect}}while(null!==bi);bi=null,at(),ai=l}else e.current=n;if(Si)Si=!1,Ei=e,wi=t;else for(bi=i;null!==bi;)t=bi.nextEffect,bi.nextEffect=null,bi=t;if(0===(t=e.firstPendingTime)&&(xi=null),1073741823===t?e===Pi?Ci++:(Ci=0,Pi=e):Ci=0,"function"==typeof ll&&ll(n.stateNode,r),Ri(e),vi)throw vi=!1,e=Ti,Ti=null,e;return 0!=(8&ai)||yt(),null}function Ji(){for(;null!==bi;){var e=bi.effectTag;0!=(256&e)&&Mr(bi.alternate,bi),0==(512&e)||Si||(Si=!0,ht(97,(function(){return Xi(),null}))),bi=bi.nextEffect}}function Xi(){if(90!==wi){var e=97<wi?97:wi;return wi=90,mt(e,Zi)}}function Zi(){if(null===Ei)return!1;var e=Ei;if(Ei=null,0!=(48&ai))throw Error(u(331));var t=ai;for(ai|=ni,e=e.current.firstEffect;null!==e;){try{var n=e;if(0!=(512&n.effectTag))switch(n.tag){case 0:case 11:case 15:case 22:Ar(5,n),jr(5,n)}}catch(t){if(null===e)throw Error(u(330));tl(e,t)}n=e.nextEffect,e.nextEffect=null,e=n}return ai=t,yt(),!0}function el(e,t,n){Ut(e,t=Kr(e,t=Ir(n,t),1073741823)),null!==(e=Di(e,1073741823))&&Ri(e)}function tl(e,t){if(3===e.tag)el(e,e,t);else for(var n=e.return;null!==n;){if(3===n.tag){el(n,e,t);break}if(1===n.tag){var r=n.stateNode;if("function"==typeof n.type.getDerivedStateFromError||"function"==typeof r.componentDidCatch&&(null===xi||!xi.has(r))){Ut(n,e=Yr(n,e=Ir(t,e),1073741823)),null!==(n=Di(n,1073741823))&&Ri(n);break}}n=n.return}}function nl(e,t,n){var r=e.pingCache;null!==r&&r.delete(t),ui===e&&ci===n?si===li||si===ii&&1073741823===di&&ft()-yi<500?Fi(e,ci):gi=!0:gl(e,n)&&(0!==(t=e.lastPingedTime)&&t<n||(e.lastPingedTime=n,Ri(e)))}function rl(e,t){var n=e.stateNode;null!==n&&n.delete(t),0===(t=0)&&(t=Ni(t=zi(),e,null)),null!==(e=Di(e,t))&&Ri(e)}Jr=function(e,t,n){var r=t.expirationTime;if(null!==e){var i=t.pendingProps;if(e.memoizedProps!==i||Ue.current)ar=!0;else{if(r<n){switch(ar=!1,t.tag){case 3:hr(t),ir();break;case 5:if(sn(t),4&t.mode&&1!==n&&W(t.type,i))return t.expirationTime=t.childExpirationTime=1,null;break;case 1:He(t.type)&&$e(t);break;case 4:on(t,t.stateNode.containerInfo);break;case 10:zt(t,t.memoizedProps.value);break;case 13:if(null!==t.memoizedState)return 0!==(r=t.child.childExpirationTime)&&r>=n?xr(e,t,n):(Me(dn,1&dn.current),null!==(t=kr(e,t,n))?t.sibling:null);Me(dn,1&dn.current);break;case 19:if(r=t.childExpirationTime>=n,0!=(64&e.effectTag)){if(r)return wr(e,t,n);t.effectTag|=64}if(null!==(i=t.memoizedState)&&(i.rendering=null,i.tail=null),Me(dn,dn.current),!r)return null}return kr(e,t,n)}ar=!1}}else ar=!1;switch(t.expirationTime=0,t.tag){case 2:if(r=t.type,null!==e&&(e.alternate=null,t.alternate=null,t.effectTag|=2),e=t.pendingProps,i=Qe(t,je.current),Dt(t,n),i=wn(null,t,r,e,i,n),t.effectTag|=1,"object"==typeof i&&null!==i&&"function"==typeof i.render&&void 0===i.$$typeof){if(t.tag=1,t.memoizedState=null,t.updateQueue=null,He(r)){var l=!0;$e(t)}else l=!1;t.memoizedState=null!==i.state&&void 0!==i.state?i.state:null,Mt(t);var a=r.getDerivedStateFromProps;"function"==typeof a&&Lt(t,r,a,e),i.updater=$t,t.stateNode=i,i._reactInternalFiber=t,Kt(t,r,e,n),t=mr(null,t,r,!0,l,n)}else t.tag=0,ur(null,t,i,n),t=t.child;return t;case 16:e:{if(i=t.elementType,null!==e&&(e.alternate=null,t.alternate=null,t.effectTag|=2),e=t.pendingProps,function(e){if(-1===e._status){e._status=0;var t=e._ctor;t=t(),e._result=t,t.then((function(t){0===e._status&&(t=t.default,e._status=1,e._result=t)}),(function(t){0===e._status&&(e._status=2,e._result=t)}))}}(i),1!==i._status)throw i._result;switch(i=i._result,t.type=i,l=t.tag=function(e){if("function"==typeof e)return cl(e)?1:0;if(null!=e){if((e=e.$$typeof)===b)return 11;if(e===E)return 14}return 2}(i),e=Et(i,e),l){case 0:t=dr(null,t,i,e,n);break e;case 1:t=pr(null,t,i,e,n);break e;case 11:t=or(null,t,i,e,n);break e;case 14:t=cr(null,t,i,Et(i.type,e),r,n);break e}throw Error(u(306,i,""))}return t;case 0:return r=t.type,i=t.pendingProps,dr(e,t,r,i=t.elementType===r?i:Et(r,i),n);case 1:return r=t.type,i=t.pendingProps,pr(e,t,r,i=t.elementType===r?i:Et(r,i),n);case 3:if(hr(t),r=t.updateQueue,null===e||null===r)throw Error(u(282));if(r=t.pendingProps,i=null!==(i=t.memoizedState)?i.element:null,At(e,t),Qt(t,r,null,n),(r=t.memoizedState.element)===i)ir(),t=kr(e,t,n);else{if((i=t.stateNode.hydrate)&&(J?(Jn=we(t.stateNode.containerInfo),Yn=t,i=Xn=!0):i=!1),i)for(n=tn(t,null,r,n),t.child=n;n;)n.effectTag=-3&n.effectTag|1024,n=n.sibling;else ur(e,t,r,n),ir();t=t.child}return t;case 5:return sn(t),null===e&&tr(t),r=t.type,i=t.pendingProps,l=null!==e?e.memoizedProps:null,a=i.children,B(r,i)?a=null:null!==l&&B(r,l)&&(t.effectTag|=16),fr(e,t),4&t.mode&&1!==n&&W(r,i)?(t.expirationTime=t.childExpirationTime=1,t=null):(ur(e,t,a,n),t=t.child),t;case 6:return null===e&&tr(t),null;case 13:return xr(e,t,n);case 4:return on(t,t.stateNode.containerInfo),r=t.pendingProps,null===e?t.child=en(t,null,r,n):ur(e,t,r,n),t.child;case 11:return r=t.type,i=t.pendingProps,or(e,t,r,i=t.elementType===r?i:Et(r,i),n);case 7:return ur(e,t,t.pendingProps,n),t.child;case 8:case 12:return ur(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,i=t.pendingProps,a=t.memoizedProps,zt(t,l=i.value),null!==a){var o=a.value;if(0===(l=Tt(o,l)?0:0|("function"==typeof r._calculateChangedBits?r._calculateChangedBits(o,l):1073741823))){if(a.children===i.children&&!Ue.current){t=kr(e,t,n);break e}}else for(null!==(o=t.child)&&(o.return=t);null!==o;){var c=o.dependencies;if(null!==c){a=o.child;for(var s=c.firstContext;null!==s;){if(s.context===r&&0!=(s.observedBits&l)){1===o.tag&&((s=jt(n,null)).tag=2,Ut(o,s)),o.expirationTime<n&&(o.expirationTime=n),null!==(s=o.alternate)&&s.expirationTime<n&&(s.expirationTime=n),It(o.return,n),c.expirationTime<n&&(c.expirationTime=n);break}s=s.next}}else a=10===o.tag&&o.type===t.type?null:o.child;if(null!==a)a.return=o;else for(a=o;null!==a;){if(a===t){a=null;break}if(null!==(o=a.sibling)){o.return=a.return,a=o;break}a=a.return}o=a}}ur(e,t,i.children,n),t=t.child}return t;case 9:return i=t.type,r=(l=t.pendingProps).children,Dt(t,n),r=r(i=Ot(i,l.unstable_observedBits)),t.effectTag|=1,ur(e,t,r,n),t.child;case 14:return l=Et(i=t.type,t.pendingProps),cr(e,t,i,l=Et(i.type,l),r,n);case 15:return sr(e,t,t.type,t.pendingProps,r,n);case 17:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:Et(r,i),null!==e&&(e.alternate=null,t.alternate=null,t.effectTag|=2),t.tag=1,He(r)?(e=!0,$e(t)):e=!1,Dt(t,n),qt(t,r,i),Kt(t,r,i,n),mr(null,t,r,!0,e,n);case 19:return wr(e,t,n)}throw Error(u(156,t.tag))};var il={current:!1},ll=null,al=null;function ul(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.effectTag=0,this.lastEffect=this.firstEffect=this.nextEffect=null,this.childExpirationTime=this.expirationTime=0,this.alternate=null}function ol(e,t,n,r){return new ul(e,t,n,r)}function cl(e){return!(!(e=e.prototype)||!e.isReactComponent)}function sl(e,t){var n=e.alternate;return null===n?((n=ol(e.tag,t,e.key,e.mode)).elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.effectTag=0,n.nextEffect=null,n.firstEffect=null,n.lastEffect=null),n.childExpirationTime=e.childExpirationTime,n.expirationTime=e.expirationTime,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=null===t?null:{expirationTime:t.expirationTime,firstContext:t.firstContext,responders:t.responders},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function fl(e,t,n,r,i,l){var a=2;if(r=e,"function"==typeof e)cl(e)&&(a=1);else if("string"==typeof e)a=5;else e:switch(e){case d:return dl(n.children,i,l,t);case y:a=8,i|=7;break;case p:a=8,i|=1;break;case m:return(e=ol(12,n,t,8|i)).elementType=m,e.type=m,e.expirationTime=l,e;case T:return(e=ol(13,n,t,i)).type=T,e.elementType=T,e.expirationTime=l,e;case S:return(e=ol(19,n,t,i)).elementType=S,e.expirationTime=l,e;default:if("object"==typeof e&&null!==e)switch(e.$$typeof){case h:a=10;break e;case g:a=9;break e;case b:a=11;break e;case E:a=14;break e;case w:a=16,r=null;break e;case k:a=22;break e}throw Error(u(130,null==e?e:typeof e,""))}return(t=ol(a,n,t,i)).elementType=e,t.type=r,t.expirationTime=l,t}function dl(e,t,n,r){return(e=ol(7,e,r,t)).expirationTime=n,e}function pl(e,t,n){return(e=ol(6,e,null,t)).expirationTime=n,e}function ml(e,t,n){return(t=ol(4,null!==e.children?e.children:[],e.key,t)).expirationTime=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function hl(e,t,n){this.tag=t,this.current=null,this.containerInfo=e,this.pingCache=this.pendingChildren=null,this.finishedExpirationTime=0,this.finishedWork=null,this.timeoutHandle=q,this.pendingContext=this.context=null,this.hydrate=n,this.callbackNode=null,this.callbackPriority=90,this.lastExpiredTime=this.lastPingedTime=this.nextKnownPendingLevel=this.lastSuspendedTime=this.firstSuspendedTime=this.firstPendingTime=0}function gl(e,t){var n=e.firstSuspendedTime;return e=e.lastSuspendedTime,0!==n&&n>=t&&e<=t}function yl(e,t){var n=e.firstSuspendedTime,r=e.lastSuspendedTime;n<t&&(e.firstSuspendedTime=t),(r>t||0===n)&&(e.lastSuspendedTime=t),t<=e.lastPingedTime&&(e.lastPingedTime=0),t<=e.lastExpiredTime&&(e.lastExpiredTime=0)}function bl(e,t){t>e.firstPendingTime&&(e.firstPendingTime=t);var n=e.firstSuspendedTime;0!==n&&(t>=n?e.firstSuspendedTime=e.lastSuspendedTime=e.nextKnownPendingLevel=0:t>=e.lastSuspendedTime&&(e.lastSuspendedTime=t+1),t>e.nextKnownPendingLevel&&(e.nextKnownPendingLevel=t))}function vl(e,t){var n=e.lastExpiredTime;(0===n||n>t)&&(e.lastExpiredTime=t)}var Tl=null;function xl(e){var t=e._reactInternalFiber;if(void 0===t){if("function"==typeof e.render)throw Error(u(188));throw Error(u(268,Object.keys(e)))}return null===(e=D(t))?null:e.stateNode}function Sl(e,t){null!==(e=e.memoizedState)&&null!==e.dehydrated&&e.retryTime<t&&(e.retryTime=t)}function El(e,t){Sl(e,t),(e=e.alternate)&&Sl(e,t)}var wl=o.IsSomeRendererActing,kl="function"==typeof a.unstable_flushAllWithoutAsserting,Cl=a.unstable_flushAllWithoutAsserting||function(){for(var e=!1;Xi();)e=!0;return e};function Pl(e){try{Cl(),function(e){if(null===Tl)try{var n=("require"+Math.random()).slice(0,7);Tl=(t&&t[n])("timers").setImmediate}catch(e){Tl=function(e){var t=new MessageChannel;t.port1.onmessage=e,t.port2.postMessage(void 0)}}Tl(e)}((function(){Cl()?Pl(e):e()}))}catch(t){e(t)}}var _l=0,zl=!1,Nl={__proto__:null,createContainer:function(e,t,n){return e=new hl(e,t,n),t=ol(3,null,null,2===t?7:1===t?3:0),e.current=t,t.stateNode=e,Mt(t),e},updateContainer:function(e,t,n,r){var i=t.current,l=zi(),a=Bt.suspense;l=Ni(l,i,a);e:if(n){t:{if(z(n=n._reactInternalFiber)!==n||1!==n.tag)throw Error(u(170));var o=n;do{switch(o.tag){case 3:o=o.stateNode.context;break t;case 1:if(He(o.type)){o=o.stateNode.__reactInternalMemoizedMergedChildContext;break t}}o=o.return}while(null!==o);throw Error(u(171))}if(1===n.tag){var c=n.type;if(He(c)){n=Le(n,c,o);break e}}n=o}else n=Ae;return null===t.context?t.context=n:t.pendingContext=n,(t=jt(l,a)).payload={element:e},null!==(r=void 0===r?null:r)&&(t.callback=r),Ut(i,t),Ii(i,l),l},batchedEventUpdates:function(e,t){var n=ai;ai|=2;try{return e(t)}finally{0===(ai=n)&&yt()}},batchedUpdates:ji,unbatchedUpdates:function(e,t){var n=ai;ai&=-2,ai|=8;try{return e(t)}finally{0===(ai=n)&&yt()}},deferredUpdates:function(e){return mt(97,e)},syncUpdates:function(e,t,n,r){return mt(99,e.bind(null,t,n,r))},discreteUpdates:function(e,t,n,r,i){var l=ai;ai|=4;try{return mt(98,e.bind(null,t,n,r,i))}finally{0===(ai=l)&&yt()}},flushDiscreteUpdates:function(){0==(49&ai)&&(function(){if(null!==ki){var e=ki;ki=null,e.forEach((function(e,t){vl(t,e),Ri(t)})),yt()}}(),Xi())},flushControlled:function(e){var t=ai;ai|=1;try{mt(99,e)}finally{0===(ai=t)&&yt()}},flushSync:Ui,flushPassiveEffects:Xi,IsThisRendererActing:il,getPublicRootInstance:function(e){if(!(e=e.current).child)return null;switch(e.child.tag){case 5:return O(e.child.stateNode);default:return e.child.stateNode}},attemptSynchronousHydration:function(e){switch(e.tag){case 3:var t=e.stateNode;t.hydrate&&function(e,t){vl(e,t),Ri(e),0==(48&ai)&&yt()}(t,t.firstPendingTime);break;case 13:Ui((function(){return Ii(e,1073741823)})),t=vt(zi(),150,100),El(e,t)}},attemptUserBlockingHydration:function(e){if(13===e.tag){var t=vt(zi(),150,100);Ii(e,t),El(e,t)}},attemptContinuousHydration:function(e){13===e.tag&&(Ii(e,3),El(e,3))},attemptHydrationAtCurrentPriority:function(e){if(13===e.tag){var t=zi();Ii(e,t=Ni(t,e,null)),El(e,t)}},findHostInstance:xl,findHostInstanceWithWarning:function(e){return xl(e)},findHostInstanceWithNoPortals:function(e){return null===(e=function(e){if(!(e=I(e)))return null;for(var t=e;;){if(5===t.tag||6===t.tag)return t;if(t.child&&4!==t.tag)t.child.return=t,t=t.child;else{if(t===e)break;for(;!t.sibling;){if(!t.return||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}}return null}(e))?null:20===e.tag?e.stateNode.instance:e.stateNode},shouldSuspend:function(){return!1},injectIntoDevTools:function(e){var t=e.findFiberByHostInstance;return function(e){if("undefined"==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__)return!1;var t=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(t.isDisabled||!t.supportsFiber)return!0;try{var n=t.inject(e);ll=function(e){try{t.onCommitFiberRoot(n,e,void 0,64==(64&e.current.effectTag))}catch(e){}},al=function(e){try{t.onCommitFiberUnmount(n,e)}catch(e){}}}catch(e){}return!0}(i({},e,{overrideHookState:null,overrideProps:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:o.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return null===(e=D(e))?null:e.stateNode},findFiberByHostInstance:function(e){return t?t(e):null},findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null}))},act:function(e){function t(){_l--,wl.current=n,il.current=r}!1===zl&&(zl=!0,console.error("act(...) is not supported in production builds of React, and might not behave as expected.")),_l++;var n=wl.current,r=il.current;wl.current=!0,il.current=!0;try{var i=ji(e)}catch(e){throw t(),e}if(null!==i&&"object"==typeof i&&"function"==typeof i.then)return{then:function(e,r){i.then((function(){1<_l||!0===kl&&!0===n?(t(),e()):Pl((function(n){t(),n?r(n):e()}))}),(function(e){t(),r(e)}))}};try{1!==_l||!1!==kl&&!1!==n||Cl(),t()}catch(e){throw t(),e}return{then:function(e){e()}}}},Il=Nl&&Nl.default||Nl;t.exports=Il.default||Il;var Dl=t.exports;return t.exports=n,Dl}})),E=m((function(e){e.exports=S}));const w=new Set(["CircularProgressBar","Slider","SlottedSlider"]);const k={};function C(e,t){k[e]=t}const P={id:{type:2,initial:!1},enabled:{type:0,name:"enabled",initial:!0,throwOnIncomplete:!0},visible:{type:0,name:"visible",initial:!0,throwOnIncomplete:!0},hittest:{type:0,name:"hittest",initial:!0,throwOnIncomplete:!0},hittestchildren:{type:0,name:"hittestchildren",initial:!0,throwOnIncomplete:!0},acceptsfocus:{type:1,name:"SetAcceptsFocus",initial:!0},tabindex:{type:0,name:"tabindex",initial:!0,throwOnIncomplete:!0},inputnamespace:{type:0,name:"inputnamespace",initial:!0,throwOnIncomplete:!0},dangerouslyCreateChildren:{type:3,update(e,t){if(e.RemoveAndDeleteChildren(),t){if(!e.BCreateChildren(t)){const e=t.replace(/^/gm,"    ");throw new Error('Cannot create children for "dangerouslyCreateChildren":\n'+e)}}}},dialogVariables:{type:3,update(e,t={},n={}){function r(t,n){void 0===n&&("string"==typeof n?e.SetDialogVariable(t,`[!s:${t}]`):"number"==typeof n?e.SetDialogVariableInt(t,NaN):e.SetDialogVariableTime(t,4503599627370496))}for(const i in t){const l=t[i];l!==n[i]&&(void 0===l?r(i,n[i]):"string"==typeof l?e.SetDialogVariable(i,l):"number"==typeof l?e.SetDialogVariableInt(i,l):e.SetDialogVariableTime(i,Math.floor(l.getTime()/1e3)))}for(const e in n)e in t||r(e,n[e])}},style:{type:3,update(e,t={},n={}){for(const r in t)t[r]!==n[r]&&(e.style[r]=t[r]);for(const r in n)r in t||(e.style[r]=null)},throwOnIncomplete:!0},className:{type:3,initial:"class",update(e,t="",n=""){const r=t.split(" ");for(const t of r)e.AddClass(t);for(const t of n.split(" "))r.includes(t)||e.RemoveClass(t)}},draggable:{type:1,name:"SetDraggable"}},_={text:{type:0,name:"text"},localizedText:{type:2,initial:"text"},html:{type:2,initial:!0}};C("Label",Object.assign(Object.assign({},_),{allowtextselection:{type:2,initial:!0}}));const z={scaling:{type:1,name:"SetScaling",initial:!0},src:{type:1,name:"SetImage",initial:!0}};C("Image",z),C("DOTAAbilityImage",Object.assign(Object.assign({},z),{abilityname:{type:0,name:"abilityname",initial:!0},contextEntityIndex:{type:0,name:"contextEntityIndex"},showtooltip:{type:2,initial:!0},abilityid:{type:2,initial:!0}})),C("DOTAItemImage",Object.assign(Object.assign({},z),{itemname:{type:0,name:"itemname",initial:!0},contextEntityIndex:{type:0,name:"contextEntityIndex"},showtooltip:{type:2,initial:!0}})),C("DOTAHeroImage",Object.assign(Object.assign({},z),{heroid:{type:0,name:"heroid",initial:!0},heroname:{type:0,name:"heroname",initial:!0},heroimagestyle:{type:0,name:"heroimagestyle",initial:!0},usedefaultimage:{type:2,initial:!0}})),C("DOTACountryFlagImage",Object.assign(Object.assign({},z),{country_code:{type:2,initial:!0}})),C("DOTALeagueImage",Object.assign(Object.assign({},z),{leagueid:{type:0,name:"leagueid",initial:!0},leagueimagestyle:{type:2,initial:!0}})),C("EconItemImage",Object.assign(Object.assign({},z),{itemdef:{type:2,initial:!0}}));const N=Object.assign(Object.assign({},z),{frametime:{type:2,initial:!0},defaultframe:{type:2,initial:!0},animating:{type:2,initial:!0}});C("AnimatedImageStrip",N),C("DOTAEmoticon",Object.assign(Object.assign({},N),{emoticonid:{type:2,initial:!0},alias:{type:2,initial:!0}})),C("Movie",{src:{type:1,name:"SetMovie",initial:!0},controls:{type:1,name:"SetControls",initial:!0},repeat:{type:1,name:"SetRepeat",initial:!0},title:{type:1,name:"SetTitle",initial:!0},autoplay:{type:2,initial:!0}}),C("DOTAHeroMovie",{heroid:{type:0,name:"heroid",initial:!0},heroname:{type:0,name:"heroname",initial:!0},persona:{type:0,name:"persona"},autoplay:{type:2,initial:!0}});const I=e=>({type:3,update(t,n){void 0===t._rotateParams&&(t._rotateParams={}),t._rotateParams[e]=n,t.SetRotateParams(t._rotateParams.yawmin||0,t._rotateParams.yawmax||0,t._rotateParams.pitchmin||0,t._rotateParams.pitchmax||0)}});C("DOTAScenePanel",{unit:{type:2,initial:!0},"activity-modifier":{type:2,initial:!0},map:{type:2,initial:!0},camera:{type:2,initial:!0},light:{type:2,initial:!0},pitchmin:I("pitchmin"),pitchmax:I("pitchmax"),yawmin:I("yawmin"),yawmax:I("yawmax"),allowrotation:{type:2,initial:!0},rotateonhover:{type:2,initial:!0},rotateonmousemove:{type:2,initial:!0},antialias:{type:2,initial:!0},panoramasurfaceheight:{type:2,initial:!0},panoramasurfacewidth:{type:2,initial:!0},panoramasurfacexml:{type:2,initial:!0},particleonly:{type:2,initial:!0},renderdeferred:{type:2,initial:!0},rendershadows:{type:2,initial:!0}}),C("DOTAEconItem",{itemdef:{type:3,update(e,t){e._econItemDef=t,e.SetItemByDefinitionAndStyle(e._econItemDef||0,e._econItemStyle||0)}},itemstyle:{type:3,update(e,t){e._econItemStyle=t,e.SetItemByDefinitionAndStyle(e._econItemDef||0,e._econItemStyle||0)}}});const D={value:{type:0,name:"value",initial:!0},min:{type:0,name:"min",initial:!0},max:{type:0,name:"max",initial:!0}};C("ProgressBar",D),C("CircularProgressBar",D),C("ProgressBarWithMiddle",{lowervalue:{type:0,name:"lowervalue",initial:!0},uppervalue:{type:0,name:"uppervalue",initial:!0},min:{type:0,name:"min",initial:!0},max:{type:0,name:"max",initial:!0}});const O={type:3,initial:!0,update(e,t="0"){e.steamid="local"===t?Game.GetLocalPlayerInfo().player_steamid:t}};C("DOTAUserName",{steamid:O}),C("DOTAUserRichPresence",{steamid:O}),C("DOTAAvatarImage",{steamid:O,nocompendiumborder:{type:2,initial:!0},lazy:{type:2,initial:!0}}),C("Countdown",{startTime:{type:0,name:"startTime",initial:"start-time"},endTime:{type:0,name:"endTime",initial:"end-time"},updateInterval:{type:0,name:"updateInterval"},timeDialogVariable:{type:0,name:"timeDialogVariable"}}),C("TextButton",_),C("ToggleButton",Object.assign(Object.assign({},_),{selected:{type:0,name:"checked"},html:{type:2,initial:!0}})),C("RadioButton",{group:{type:2,initial:!0},text:{type:2,initial:!0},html:{type:2,initial:!0},selected:{type:0,name:"checked"}}),C("TextEntry",{text:{type:0,name:"text"},multiline:{type:2,initial:!0},maxchars:{type:1,name:"SetMaxChars",initial:!0},placeholder:{type:2,initial:!0},textmode:{type:2,initial:!0}}),C("NumberEntry",{value:{type:0,name:"value",initial:!0},increment:{type:0,name:"increment",initial:!0},min:{type:3,initial:!0,update(e,t=0){e.min=t,e.value=e.value}},max:{type:3,initial:!0,update(e,t=1e6){e.max=t,e.value=e.value}}});const R={direction:{type:2,initial:!0},value:{type:1,name:"SetValueNoEvents"},min:{type:0,name:"min"},max:{type:0,name:"max"}};C("Slider",R),C("SlottedSlider",Object.assign(Object.assign({},R),{notches:{type:2,initial:!0}})),C("DropDown",{selected:{type:3,update(e,t){var n;n=()=>t&&e.SetSelected(t),c.then(n)}}}),C("Carousel",{focus:{type:2,initial:!0},"focus-offset":{type:2,initial:!0},wrap:{type:2,initial:!0},selectionposboundary:{type:2,initial:!0},"panels-visible":{type:2,initial:!0},clipaftertransform:{type:2,initial:!0},AllowOversized:{type:2,initial:!0},"autoscroll-delay":{type:2,initial:!0},"x-offset":{type:2,initial:!0}}),C("CarouselNav",{carouselid:{type:2,initial:!0}}),C("DOTAHUDOverlayMap",{maptexture:{type:0,name:"maptexture",initial:!0},mapscale:{type:0,name:"mapscale",initial:!0},mapscroll:{type:0,name:"mapscroll"},fixedoffsetenabled:{type:0,name:"fixedoffsetenabled"},fixedOffset:{type:3,update(e,t={}){e.SetFixedOffset(t.x||0,t.y||0)}},fixedBackgroundTexturePosition:{type:3,update(e,t={}){e.SetFixedBackgroundTexturePosition(t.size||0,t.x||0,t.y||0)}}}),C("HTML",{url:{type:1,name:"SetURL",initial:!0}}),C("CustomLayoutPanel",{layout:{type:2,initial:!0}});const M={type:2,initial:!0},A={type:3,update(e,t,n,r){var i;null!==(i=e._eventHandlers)&&void 0!==i||(e._eventHandlers={}),void 0===e._eventHandlers[r]&&$.RegisterEventHandler(r.slice(6),e,(...t)=>e._eventHandlers[r](...t)),e._eventHandlers[r]=void 0!==t?t:o}},j={type:3,update(e,t,n,r){var i;null!==(i=e._eventHandlers)&&void 0!==i||(e._eventHandlers={}),void 0===e._eventHandlers[r]&&e.SetPanelEvent(r,()=>e._eventHandlers[r](e)),e._eventHandlers[r]=void 0!==t?t:o}};function U(e,t){var n;const r=P[t];if(void 0!==r&&(!w.has(e)||0!==r.type))return r;const i=null===(n=k[e])||void 0===n?void 0:n[t];return i||("children"!==t?t.startsWith("on-ui-")?A:t.startsWith("on")?j:"GenericPanel"===e?M:void 0:void 0)}function F(e,t,n,r,i){const l=U(e,n);if(l){if(w.has(e)&&l.throwOnIncomplete)throw new Error(`Attribute "${n}" cannot be ${l.initial?"changed on":"added to"} incomplete ${e} panel type.${l.initial?' Add a "key" attribute to force re-mount.':""}`);switch(l.type){case 0:t[l.name]=i;break;case 1:t[l.name](i);break;case 2:throw new Error(`Attribute "${n}" cannot be changed. Add a "key" attribute to force re-mount.`);case 3:l.update(t,i,r,n)}}}const Q={},H={};function B(e,t){"DropDown"!==e.paneltype?("ContextMenuScript"===e.paneltype&&(e=e.GetContentsPanel()),e===t.GetParent()?e.MoveChildAfter(t,e.GetChild(e.GetChildCount()-1)):t.SetParent(e)):e.AddOption(t)}function W(e,t,n){if("DropDown"===e.paneltype)return e.AddOption(t),void e.AccessDropDownMenu().MoveChildBefore(t,n);"ContextMenuScript"===e.paneltype&&(e=e.GetContentsPanel()),t.SetParent(e),e.MoveChildBefore(t,n)}function L(e,t){"DropDown"===e.paneltype?e.RemoveOption(t.id):(t.SetParent(d),d.RemoveAndDeleteChildren())}const V=E({getPublicInstance:e=>e,getRootHostContext:()=>Q,getChildHostContext:()=>H,prepareForCommit:o,resetAfterCommit:o,scheduleDeferredCallback:void 0,cancelDeferredCallback:void 0,shouldDeprioritizeSubtree:void 0,setTimeout:setTimeout,clearTimeout:clearTimeout,noTimeout:-1,now:Date.now,isPrimaryRenderer:!0,supportsMutation:!0,supportsPersistence:!1,supportsHydration:!1,shouldSetTextContent:()=>!1,createInstance(e,t){const{initialProps:n,otherProps:r}=function(e,t){let n=!1;const r={},i={};for(const l in t){const a=U(e,l);a&&a.initial?(n=!0,r["string"==typeof a.initial?a.initial:l]=t[l]):"id"!==l&&(i[l]=t[l])}return{initialProps:n?r:void 0,otherProps:i}}(e,t);"GenericPanel"===e&&(e=t.type);const i=n?$.CreatePanelWithProperties(e,$.GetContextPanel(),t.id||"",n):$.CreatePanel(e,$.GetContextPanel(),t.id||"");w.has(e)&&function(e){for(const[t,n]of Object.entries(d))"function"==typeof n&&(e[t]=n)}(i);for(const t in r)F(e,i,t,void 0,r[t]);return i},createTextInstance(){throw new Error("react-panorama does not support text nodes. Use <Label /> element instead.")},appendInitialChild:B,finalizeInitialChildren:()=>!1,appendChild:B,appendChildToContainer:B,insertBefore:W,insertInContainerBefore:W,removeChild:L,removeChildFromContainer:L,prepareUpdate:()=>!0,commitUpdate(e,t,n,r,i){for(const t in i){const l=r[t],a=i[t];l!==a&&F(n,e,t,l,a)}for(const t in r)t in i||F(n,e,t,void 0,r[t])}});function q(e,t,n){var r;const i=t;i._reactPanoramaSymbol!==s&&(i._reactPanoramaSymbol=s,i._rootContainer=void 0),null!==(r=i._rootContainer)&&void 0!==r||(i._rootContainer=V.createContainer(i,!1,!1)),V.updateContainer(e,i._rootContainer,null,n)}const G=Symbol.for("react.portal");function K(e,t,n){return{$$typeof:G,key:null==n?null:String(n),children:e,containerInfo:t}}

// EXTERNAL MODULE: ../../../node_modules/prop-types/index.js
var prop_types = __webpack_require__(216);
;// CONCATENATED MODULE: ../../../node_modules/react-redux/es/components/Context.js

var Context_ReactReduxContext = /*#__PURE__*/react.createContext(null);

if (false) {}

/* harmony default export */ const Context = ((/* unused pure expression or super */ null && (Context_ReactReduxContext)));
;// CONCATENATED MODULE: ../../../node_modules/react-redux/es/utils/batch.js
// Default to a dummy "batch" implementation that just runs the callback
function defaultNoopBatch(callback) {
  callback();
}

var batch = defaultNoopBatch; // Allow injecting another batching function later

var setBatch = function setBatch(newBatch) {
  return batch = newBatch;
}; // Supply a getter just to skip dealing with ESM bindings

var getBatch = function getBatch() {
  return batch;
};
;// CONCATENATED MODULE: ../../../node_modules/react-redux/es/utils/Subscription.js
 // encapsulates the subscription logic for connecting a component to the redux store, as
// well as nesting subscriptions of descendant components, so that we can ensure the
// ancestor components re-render before descendants

var nullListeners = {
  notify: function notify() {}
};

function createListenerCollection() {
  var batch = getBatch();
  var first = null;
  var last = null;
  return {
    clear: function clear() {
      first = null;
      last = null;
    },
    notify: function notify() {
      batch(function () {
        var listener = first;

        while (listener) {
          listener.callback();
          listener = listener.next;
        }
      });
    },
    get: function get() {
      var listeners = [];
      var listener = first;

      while (listener) {
        listeners.push(listener);
        listener = listener.next;
      }

      return listeners;
    },
    subscribe: function subscribe(callback) {
      var isSubscribed = true;
      var listener = last = {
        callback: callback,
        next: null,
        prev: last
      };

      if (listener.prev) {
        listener.prev.next = listener;
      } else {
        first = listener;
      }

      return function unsubscribe() {
        if (!isSubscribed || first === null) return;
        isSubscribed = false;

        if (listener.next) {
          listener.next.prev = listener.prev;
        } else {
          last = listener.prev;
        }

        if (listener.prev) {
          listener.prev.next = listener.next;
        } else {
          first = listener.next;
        }
      };
    }
  };
}

var Subscription_Subscription = /*#__PURE__*/function () {
  function Subscription(store, parentSub) {
    this.store = store;
    this.parentSub = parentSub;
    this.unsubscribe = null;
    this.listeners = nullListeners;
    this.handleChangeWrapper = this.handleChangeWrapper.bind(this);
  }

  var _proto = Subscription.prototype;

  _proto.addNestedSub = function addNestedSub(listener) {
    this.trySubscribe();
    return this.listeners.subscribe(listener);
  };

  _proto.notifyNestedSubs = function notifyNestedSubs() {
    this.listeners.notify();
  };

  _proto.handleChangeWrapper = function handleChangeWrapper() {
    if (this.onStateChange) {
      this.onStateChange();
    }
  };

  _proto.isSubscribed = function isSubscribed() {
    return Boolean(this.unsubscribe);
  };

  _proto.trySubscribe = function trySubscribe() {
    if (!this.unsubscribe) {
      this.unsubscribe = this.parentSub ? this.parentSub.addNestedSub(this.handleChangeWrapper) : this.store.subscribe(this.handleChangeWrapper);
      this.listeners = createListenerCollection();
    }
  };

  _proto.tryUnsubscribe = function tryUnsubscribe() {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
      this.listeners.clear();
      this.listeners = nullListeners;
    }
  };

  return Subscription;
}();


;// CONCATENATED MODULE: ../../../node_modules/react-redux/es/utils/useIsomorphicLayoutEffect.js
 // React currently throws a warning when using useLayoutEffect on the server.
// To get around it, we can conditionally useEffect on the server (no-op) and
// useLayoutEffect in the browser. We need useLayoutEffect to ensure the store
// subscription callback always has the selector from the latest render commit
// available, otherwise a store update may happen between render and the effect,
// which may cause missed updates; we also must ensure the store subscription
// is created synchronously, otherwise a store update may occur before the
// subscription is created and an inconsistent state may be observed

var useIsomorphicLayoutEffect_useIsomorphicLayoutEffect = typeof window !== 'undefined' && typeof window.document !== 'undefined' && typeof window.document.createElement !== 'undefined' ? react.useLayoutEffect : react.useEffect;
;// CONCATENATED MODULE: ../../../node_modules/react-redux/es/components/Provider.js






function Provider(_ref) {
  var store = _ref.store,
      context = _ref.context,
      children = _ref.children;
  var contextValue = (0,react.useMemo)(function () {
    var subscription = new Subscription_Subscription(store);
    subscription.onStateChange = subscription.notifyNestedSubs;
    return {
      store: store,
      subscription: subscription
    };
  }, [store]);
  var previousState = (0,react.useMemo)(function () {
    return store.getState();
  }, [store]);
  useIsomorphicLayoutEffect_useIsomorphicLayoutEffect(function () {
    var subscription = contextValue.subscription;
    subscription.trySubscribe();

    if (previousState !== store.getState()) {
      subscription.notifyNestedSubs();
    }

    return function () {
      subscription.tryUnsubscribe();
      subscription.onStateChange = null;
    };
  }, [contextValue, previousState]);
  var Context = context || Context_ReactReduxContext;
  return /*#__PURE__*/react.createElement(Context.Provider, {
    value: contextValue
  }, children);
}

if (false) {}

/* harmony default export */ const components_Provider = (Provider);
;// CONCATENATED MODULE: ../../../node_modules/@babel/runtime/helpers/esm/extends.js
function extends_extends() {
  extends_extends = Object.assign || function (target) {
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

  return extends_extends.apply(this, arguments);
}
;// CONCATENATED MODULE: ../../../node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}
// EXTERNAL MODULE: ../../../node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js
var hoist_non_react_statics_cjs = __webpack_require__(58);
var hoist_non_react_statics_cjs_default = /*#__PURE__*/__webpack_require__.n(hoist_non_react_statics_cjs);
// EXTERNAL MODULE: ../../../node_modules/react-is/index.js
var react_is = __webpack_require__(594);
;// CONCATENATED MODULE: ../../../node_modules/react-redux/es/components/connectAdvanced.js







 // Define some constant arrays just to avoid re-creating these

var EMPTY_ARRAY = [];
var NO_SUBSCRIPTION_ARRAY = [null, null];

var stringifyComponent = function stringifyComponent(Comp) {
  try {
    return JSON.stringify(Comp);
  } catch (err) {
    return String(Comp);
  }
};

function storeStateUpdatesReducer(state, action) {
  var updateCount = state[1];
  return [action.payload, updateCount + 1];
}

function useIsomorphicLayoutEffectWithArgs(effectFunc, effectArgs, dependencies) {
  useIsomorphicLayoutEffect_useIsomorphicLayoutEffect(function () {
    return effectFunc.apply(void 0, effectArgs);
  }, dependencies);
}

function captureWrapperProps(lastWrapperProps, lastChildProps, renderIsScheduled, wrapperProps, actualChildProps, childPropsFromStoreUpdate, notifyNestedSubs) {
  // We want to capture the wrapper props and child props we used for later comparisons
  lastWrapperProps.current = wrapperProps;
  lastChildProps.current = actualChildProps;
  renderIsScheduled.current = false; // If the render was from a store update, clear out that reference and cascade the subscriber update

  if (childPropsFromStoreUpdate.current) {
    childPropsFromStoreUpdate.current = null;
    notifyNestedSubs();
  }
}

function subscribeUpdates(shouldHandleStateChanges, store, subscription, childPropsSelector, lastWrapperProps, lastChildProps, renderIsScheduled, childPropsFromStoreUpdate, notifyNestedSubs, forceComponentUpdateDispatch) {
  // If we're not subscribed to the store, nothing to do here
  if (!shouldHandleStateChanges) return; // Capture values for checking if and when this component unmounts

  var didUnsubscribe = false;
  var lastThrownError = null; // We'll run this callback every time a store subscription update propagates to this component

  var checkForUpdates = function checkForUpdates() {
    if (didUnsubscribe) {
      // Don't run stale listeners.
      // Redux doesn't guarantee unsubscriptions happen until next dispatch.
      return;
    }

    var latestStoreState = store.getState();
    var newChildProps, error;

    try {
      // Actually run the selector with the most recent store state and wrapper props
      // to determine what the child props should be
      newChildProps = childPropsSelector(latestStoreState, lastWrapperProps.current);
    } catch (e) {
      error = e;
      lastThrownError = e;
    }

    if (!error) {
      lastThrownError = null;
    } // If the child props haven't changed, nothing to do here - cascade the subscription update


    if (newChildProps === lastChildProps.current) {
      if (!renderIsScheduled.current) {
        notifyNestedSubs();
      }
    } else {
      // Save references to the new child props.  Note that we track the "child props from store update"
      // as a ref instead of a useState/useReducer because we need a way to determine if that value has
      // been processed.  If this went into useState/useReducer, we couldn't clear out the value without
      // forcing another re-render, which we don't want.
      lastChildProps.current = newChildProps;
      childPropsFromStoreUpdate.current = newChildProps;
      renderIsScheduled.current = true; // If the child props _did_ change (or we caught an error), this wrapper component needs to re-render

      forceComponentUpdateDispatch({
        type: 'STORE_UPDATED',
        payload: {
          error: error
        }
      });
    }
  }; // Actually subscribe to the nearest connected ancestor (or store)


  subscription.onStateChange = checkForUpdates;
  subscription.trySubscribe(); // Pull data from the store after first render in case the store has
  // changed since we began.

  checkForUpdates();

  var unsubscribeWrapper = function unsubscribeWrapper() {
    didUnsubscribe = true;
    subscription.tryUnsubscribe();
    subscription.onStateChange = null;

    if (lastThrownError) {
      // It's possible that we caught an error due to a bad mapState function, but the
      // parent re-rendered without this component and we're about to unmount.
      // This shouldn't happen as long as we do top-down subscriptions correctly, but
      // if we ever do those wrong, this throw will surface the error in our tests.
      // In that case, throw the error from here so it doesn't get lost.
      throw lastThrownError;
    }
  };

  return unsubscribeWrapper;
}

var initStateUpdates = function initStateUpdates() {
  return [null, 0];
};

function connectAdvanced(
/*
  selectorFactory is a func that is responsible for returning the selector function used to
  compute new props from state, props, and dispatch. For example:
      export default connectAdvanced((dispatch, options) => (state, props) => ({
      thing: state.things[props.thingId],
      saveThing: fields => dispatch(actionCreators.saveThing(props.thingId, fields)),
    }))(YourComponent)
    Access to dispatch is provided to the factory so selectorFactories can bind actionCreators
  outside of their selector as an optimization. Options passed to connectAdvanced are passed to
  the selectorFactory, along with displayName and WrappedComponent, as the second argument.
    Note that selectorFactory is responsible for all caching/memoization of inbound and outbound
  props. Do not use connectAdvanced directly without memoizing results between calls to your
  selector, otherwise the Connect component will re-render on every state or props change.
*/
selectorFactory, // options object:
_ref) {
  if (_ref === void 0) {
    _ref = {};
  }

  var _ref2 = _ref,
      _ref2$getDisplayName = _ref2.getDisplayName,
      getDisplayName = _ref2$getDisplayName === void 0 ? function (name) {
    return "ConnectAdvanced(" + name + ")";
  } : _ref2$getDisplayName,
      _ref2$methodName = _ref2.methodName,
      methodName = _ref2$methodName === void 0 ? 'connectAdvanced' : _ref2$methodName,
      _ref2$renderCountProp = _ref2.renderCountProp,
      renderCountProp = _ref2$renderCountProp === void 0 ? undefined : _ref2$renderCountProp,
      _ref2$shouldHandleSta = _ref2.shouldHandleStateChanges,
      shouldHandleStateChanges = _ref2$shouldHandleSta === void 0 ? true : _ref2$shouldHandleSta,
      _ref2$storeKey = _ref2.storeKey,
      storeKey = _ref2$storeKey === void 0 ? 'store' : _ref2$storeKey,
      _ref2$withRef = _ref2.withRef,
      withRef = _ref2$withRef === void 0 ? false : _ref2$withRef,
      _ref2$forwardRef = _ref2.forwardRef,
      forwardRef = _ref2$forwardRef === void 0 ? false : _ref2$forwardRef,
      _ref2$context = _ref2.context,
      context = _ref2$context === void 0 ? Context_ReactReduxContext : _ref2$context,
      connectOptions = _objectWithoutPropertiesLoose(_ref2, ["getDisplayName", "methodName", "renderCountProp", "shouldHandleStateChanges", "storeKey", "withRef", "forwardRef", "context"]);

  if (false) { var customStoreWarningMessage; }

  var Context = context;
  return function wrapWithConnect(WrappedComponent) {
    if (false) {}

    var wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
    var displayName = getDisplayName(wrappedComponentName);

    var selectorFactoryOptions = extends_extends({}, connectOptions, {
      getDisplayName: getDisplayName,
      methodName: methodName,
      renderCountProp: renderCountProp,
      shouldHandleStateChanges: shouldHandleStateChanges,
      storeKey: storeKey,
      displayName: displayName,
      wrappedComponentName: wrappedComponentName,
      WrappedComponent: WrappedComponent
    });

    var pure = connectOptions.pure;

    function createChildSelector(store) {
      return selectorFactory(store.dispatch, selectorFactoryOptions);
    } // If we aren't running in "pure" mode, we don't want to memoize values.
    // To avoid conditionally calling hooks, we fall back to a tiny wrapper
    // that just executes the given callback immediately.


    var usePureOnlyMemo = pure ? react.useMemo : function (callback) {
      return callback();
    };

    function ConnectFunction(props) {
      var _useMemo = (0,react.useMemo)(function () {
        // Distinguish between actual "data" props that were passed to the wrapper component,
        // and values needed to control behavior (forwarded refs, alternate context instances).
        // To maintain the wrapperProps object reference, memoize this destructuring.
        var reactReduxForwardedRef = props.reactReduxForwardedRef,
            wrapperProps = _objectWithoutPropertiesLoose(props, ["reactReduxForwardedRef"]);

        return [props.context, reactReduxForwardedRef, wrapperProps];
      }, [props]),
          propsContext = _useMemo[0],
          reactReduxForwardedRef = _useMemo[1],
          wrapperProps = _useMemo[2];

      var ContextToUse = (0,react.useMemo)(function () {
        // Users may optionally pass in a custom context instance to use instead of our ReactReduxContext.
        // Memoize the check that determines which context instance we should use.
        return propsContext && propsContext.Consumer && (0,react_is.isContextConsumer)( /*#__PURE__*/react.createElement(propsContext.Consumer, null)) ? propsContext : Context;
      }, [propsContext, Context]); // Retrieve the store and ancestor subscription via context, if available

      var contextValue = (0,react.useContext)(ContextToUse); // The store _must_ exist as either a prop or in context.
      // We'll check to see if it _looks_ like a Redux store first.
      // This allows us to pass through a `store` prop that is just a plain value.

      var didStoreComeFromProps = Boolean(props.store) && Boolean(props.store.getState) && Boolean(props.store.dispatch);
      var didStoreComeFromContext = Boolean(contextValue) && Boolean(contextValue.store);

      if (false) {} // Based on the previous check, one of these must be true


      var store = didStoreComeFromProps ? props.store : contextValue.store;
      var childPropsSelector = (0,react.useMemo)(function () {
        // The child props selector needs the store reference as an input.
        // Re-create this selector whenever the store changes.
        return createChildSelector(store);
      }, [store]);

      var _useMemo2 = (0,react.useMemo)(function () {
        if (!shouldHandleStateChanges) return NO_SUBSCRIPTION_ARRAY; // This Subscription's source should match where store came from: props vs. context. A component
        // connected to the store via props shouldn't use subscription from context, or vice versa.

        var subscription = new Subscription_Subscription(store, didStoreComeFromProps ? null : contextValue.subscription); // `notifyNestedSubs` is duplicated to handle the case where the component is unmounted in
        // the middle of the notification loop, where `subscription` will then be null. This can
        // probably be avoided if Subscription's listeners logic is changed to not call listeners
        // that have been unsubscribed in the  middle of the notification loop.

        var notifyNestedSubs = subscription.notifyNestedSubs.bind(subscription);
        return [subscription, notifyNestedSubs];
      }, [store, didStoreComeFromProps, contextValue]),
          subscription = _useMemo2[0],
          notifyNestedSubs = _useMemo2[1]; // Determine what {store, subscription} value should be put into nested context, if necessary,
      // and memoize that value to avoid unnecessary context updates.


      var overriddenContextValue = (0,react.useMemo)(function () {
        if (didStoreComeFromProps) {
          // This component is directly subscribed to a store from props.
          // We don't want descendants reading from this store - pass down whatever
          // the existing context value is from the nearest connected ancestor.
          return contextValue;
        } // Otherwise, put this component's subscription instance into context, so that
        // connected descendants won't update until after this component is done


        return extends_extends({}, contextValue, {
          subscription: subscription
        });
      }, [didStoreComeFromProps, contextValue, subscription]); // We need to force this wrapper component to re-render whenever a Redux store update
      // causes a change to the calculated child component props (or we caught an error in mapState)

      var _useReducer = (0,react.useReducer)(storeStateUpdatesReducer, EMPTY_ARRAY, initStateUpdates),
          _useReducer$ = _useReducer[0],
          previousStateUpdateResult = _useReducer$[0],
          forceComponentUpdateDispatch = _useReducer[1]; // Propagate any mapState/mapDispatch errors upwards


      if (previousStateUpdateResult && previousStateUpdateResult.error) {
        throw previousStateUpdateResult.error;
      } // Set up refs to coordinate values between the subscription effect and the render logic


      var lastChildProps = (0,react.useRef)();
      var lastWrapperProps = (0,react.useRef)(wrapperProps);
      var childPropsFromStoreUpdate = (0,react.useRef)();
      var renderIsScheduled = (0,react.useRef)(false);
      var actualChildProps = usePureOnlyMemo(function () {
        // Tricky logic here:
        // - This render may have been triggered by a Redux store update that produced new child props
        // - However, we may have gotten new wrapper props after that
        // If we have new child props, and the same wrapper props, we know we should use the new child props as-is.
        // But, if we have new wrapper props, those might change the child props, so we have to recalculate things.
        // So, we'll use the child props from store update only if the wrapper props are the same as last time.
        if (childPropsFromStoreUpdate.current && wrapperProps === lastWrapperProps.current) {
          return childPropsFromStoreUpdate.current;
        } // TODO We're reading the store directly in render() here. Bad idea?
        // This will likely cause Bad Things (TM) to happen in Concurrent Mode.
        // Note that we do this because on renders _not_ caused by store updates, we need the latest store state
        // to determine what the child props should be.


        return childPropsSelector(store.getState(), wrapperProps);
      }, [store, previousStateUpdateResult, wrapperProps]); // We need this to execute synchronously every time we re-render. However, React warns
      // about useLayoutEffect in SSR, so we try to detect environment and fall back to
      // just useEffect instead to avoid the warning, since neither will run anyway.

      useIsomorphicLayoutEffectWithArgs(captureWrapperProps, [lastWrapperProps, lastChildProps, renderIsScheduled, wrapperProps, actualChildProps, childPropsFromStoreUpdate, notifyNestedSubs]); // Our re-subscribe logic only runs when the store/subscription setup changes

      useIsomorphicLayoutEffectWithArgs(subscribeUpdates, [shouldHandleStateChanges, store, subscription, childPropsSelector, lastWrapperProps, lastChildProps, renderIsScheduled, childPropsFromStoreUpdate, notifyNestedSubs, forceComponentUpdateDispatch], [store, subscription, childPropsSelector]); // Now that all that's done, we can finally try to actually render the child component.
      // We memoize the elements for the rendered child component as an optimization.

      var renderedWrappedComponent = (0,react.useMemo)(function () {
        return /*#__PURE__*/react.createElement(WrappedComponent, extends_extends({}, actualChildProps, {
          ref: reactReduxForwardedRef
        }));
      }, [reactReduxForwardedRef, WrappedComponent, actualChildProps]); // If React sees the exact same element reference as last time, it bails out of re-rendering
      // that child, same as if it was wrapped in React.memo() or returned false from shouldComponentUpdate.

      var renderedChild = (0,react.useMemo)(function () {
        if (shouldHandleStateChanges) {
          // If this component is subscribed to store updates, we need to pass its own
          // subscription instance down to our descendants. That means rendering the same
          // Context instance, and putting a different value into the context.
          return /*#__PURE__*/react.createElement(ContextToUse.Provider, {
            value: overriddenContextValue
          }, renderedWrappedComponent);
        }

        return renderedWrappedComponent;
      }, [ContextToUse, renderedWrappedComponent, overriddenContextValue]);
      return renderedChild;
    } // If we're in "pure" mode, ensure our wrapper component only re-renders when incoming props have changed.


    var Connect = pure ? react.memo(ConnectFunction) : ConnectFunction;
    Connect.WrappedComponent = WrappedComponent;
    Connect.displayName = ConnectFunction.displayName = displayName;

    if (forwardRef) {
      var forwarded = react.forwardRef(function forwardConnectRef(props, ref) {
        return /*#__PURE__*/react.createElement(Connect, extends_extends({}, props, {
          reactReduxForwardedRef: ref
        }));
      });
      forwarded.displayName = displayName;
      forwarded.WrappedComponent = WrappedComponent;
      return hoist_non_react_statics_cjs_default()(forwarded, WrappedComponent);
    }

    return hoist_non_react_statics_cjs_default()(Connect, WrappedComponent);
  };
}
;// CONCATENATED MODULE: ../../../node_modules/react-redux/es/utils/shallowEqual.js
function is(x, y) {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}

function shallowEqual(objA, objB) {
  if (is(objA, objB)) return true;

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) return false;

  for (var i = 0; i < keysA.length; i++) {
    if (!Object.prototype.hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}
;// CONCATENATED MODULE: ../../../node_modules/react-redux/es/utils/bindActionCreators.js
function bindActionCreators(actionCreators, dispatch) {
  var boundActionCreators = {};

  var _loop = function _loop(key) {
    var actionCreator = actionCreators[key];

    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = function () {
        return dispatch(actionCreator.apply(void 0, arguments));
      };
    }
  };

  for (var key in actionCreators) {
    _loop(key);
  }

  return boundActionCreators;
}
;// CONCATENATED MODULE: ../../../node_modules/react-redux/es/connect/wrapMapToProps.js

function wrapMapToPropsConstant(getConstant) {
  return function initConstantSelector(dispatch, options) {
    var constant = getConstant(dispatch, options);

    function constantSelector() {
      return constant;
    }

    constantSelector.dependsOnOwnProps = false;
    return constantSelector;
  };
} // dependsOnOwnProps is used by createMapToPropsProxy to determine whether to pass props as args
// to the mapToProps function being wrapped. It is also used by makePurePropsSelector to determine
// whether mapToProps needs to be invoked when props have changed.
//
// A length of one signals that mapToProps does not depend on props from the parent component.
// A length of zero is assumed to mean mapToProps is getting args via arguments or ...args and
// therefore not reporting its length accurately..

function getDependsOnOwnProps(mapToProps) {
  return mapToProps.dependsOnOwnProps !== null && mapToProps.dependsOnOwnProps !== undefined ? Boolean(mapToProps.dependsOnOwnProps) : mapToProps.length !== 1;
} // Used by whenMapStateToPropsIsFunction and whenMapDispatchToPropsIsFunction,
// this function wraps mapToProps in a proxy function which does several things:
//
//  * Detects whether the mapToProps function being called depends on props, which
//    is used by selectorFactory to decide if it should reinvoke on props changes.
//
//  * On first call, handles mapToProps if returns another function, and treats that
//    new function as the true mapToProps for subsequent calls.
//
//  * On first call, verifies the first result is a plain object, in order to warn
//    the developer that their mapToProps function is not returning a valid result.
//

function wrapMapToPropsFunc(mapToProps, methodName) {
  return function initProxySelector(dispatch, _ref) {
    var displayName = _ref.displayName;

    var proxy = function mapToPropsProxy(stateOrDispatch, ownProps) {
      return proxy.dependsOnOwnProps ? proxy.mapToProps(stateOrDispatch, ownProps) : proxy.mapToProps(stateOrDispatch);
    }; // allow detectFactoryAndVerify to get ownProps


    proxy.dependsOnOwnProps = true;

    proxy.mapToProps = function detectFactoryAndVerify(stateOrDispatch, ownProps) {
      proxy.mapToProps = mapToProps;
      proxy.dependsOnOwnProps = getDependsOnOwnProps(mapToProps);
      var props = proxy(stateOrDispatch, ownProps);

      if (typeof props === 'function') {
        proxy.mapToProps = props;
        proxy.dependsOnOwnProps = getDependsOnOwnProps(props);
        props = proxy(stateOrDispatch, ownProps);
      }

      if (false) {}
      return props;
    };

    return proxy;
  };
}
;// CONCATENATED MODULE: ../../../node_modules/react-redux/es/connect/mapDispatchToProps.js


function whenMapDispatchToPropsIsFunction(mapDispatchToProps) {
  return typeof mapDispatchToProps === 'function' ? wrapMapToPropsFunc(mapDispatchToProps, 'mapDispatchToProps') : undefined;
}
function whenMapDispatchToPropsIsMissing(mapDispatchToProps) {
  return !mapDispatchToProps ? wrapMapToPropsConstant(function (dispatch) {
    return {
      dispatch: dispatch
    };
  }) : undefined;
}
function whenMapDispatchToPropsIsObject(mapDispatchToProps) {
  return mapDispatchToProps && typeof mapDispatchToProps === 'object' ? wrapMapToPropsConstant(function (dispatch) {
    return bindActionCreators(mapDispatchToProps, dispatch);
  }) : undefined;
}
/* harmony default export */ const mapDispatchToProps = ([whenMapDispatchToPropsIsFunction, whenMapDispatchToPropsIsMissing, whenMapDispatchToPropsIsObject]);
;// CONCATENATED MODULE: ../../../node_modules/react-redux/es/connect/mapStateToProps.js

function whenMapStateToPropsIsFunction(mapStateToProps) {
  return typeof mapStateToProps === 'function' ? wrapMapToPropsFunc(mapStateToProps, 'mapStateToProps') : undefined;
}
function whenMapStateToPropsIsMissing(mapStateToProps) {
  return !mapStateToProps ? wrapMapToPropsConstant(function () {
    return {};
  }) : undefined;
}
/* harmony default export */ const mapStateToProps = ([whenMapStateToPropsIsFunction, whenMapStateToPropsIsMissing]);
;// CONCATENATED MODULE: ../../../node_modules/react-redux/es/connect/mergeProps.js


function defaultMergeProps(stateProps, dispatchProps, ownProps) {
  return extends_extends({}, ownProps, stateProps, dispatchProps);
}
function wrapMergePropsFunc(mergeProps) {
  return function initMergePropsProxy(dispatch, _ref) {
    var displayName = _ref.displayName,
        pure = _ref.pure,
        areMergedPropsEqual = _ref.areMergedPropsEqual;
    var hasRunOnce = false;
    var mergedProps;
    return function mergePropsProxy(stateProps, dispatchProps, ownProps) {
      var nextMergedProps = mergeProps(stateProps, dispatchProps, ownProps);

      if (hasRunOnce) {
        if (!pure || !areMergedPropsEqual(nextMergedProps, mergedProps)) mergedProps = nextMergedProps;
      } else {
        hasRunOnce = true;
        mergedProps = nextMergedProps;
        if (false) {}
      }

      return mergedProps;
    };
  };
}
function whenMergePropsIsFunction(mergeProps) {
  return typeof mergeProps === 'function' ? wrapMergePropsFunc(mergeProps) : undefined;
}
function whenMergePropsIsOmitted(mergeProps) {
  return !mergeProps ? function () {
    return defaultMergeProps;
  } : undefined;
}
/* harmony default export */ const mergeProps = ([whenMergePropsIsFunction, whenMergePropsIsOmitted]);
;// CONCATENATED MODULE: ../../../node_modules/react-redux/es/connect/selectorFactory.js


function impureFinalPropsSelectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch) {
  return function impureFinalPropsSelector(state, ownProps) {
    return mergeProps(mapStateToProps(state, ownProps), mapDispatchToProps(dispatch, ownProps), ownProps);
  };
}
function pureFinalPropsSelectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch, _ref) {
  var areStatesEqual = _ref.areStatesEqual,
      areOwnPropsEqual = _ref.areOwnPropsEqual,
      areStatePropsEqual = _ref.areStatePropsEqual;
  var hasRunAtLeastOnce = false;
  var state;
  var ownProps;
  var stateProps;
  var dispatchProps;
  var mergedProps;

  function handleFirstCall(firstState, firstOwnProps) {
    state = firstState;
    ownProps = firstOwnProps;
    stateProps = mapStateToProps(state, ownProps);
    dispatchProps = mapDispatchToProps(dispatch, ownProps);
    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    hasRunAtLeastOnce = true;
    return mergedProps;
  }

  function handleNewPropsAndNewState() {
    stateProps = mapStateToProps(state, ownProps);
    if (mapDispatchToProps.dependsOnOwnProps) dispatchProps = mapDispatchToProps(dispatch, ownProps);
    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    return mergedProps;
  }

  function handleNewProps() {
    if (mapStateToProps.dependsOnOwnProps) stateProps = mapStateToProps(state, ownProps);
    if (mapDispatchToProps.dependsOnOwnProps) dispatchProps = mapDispatchToProps(dispatch, ownProps);
    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    return mergedProps;
  }

  function handleNewState() {
    var nextStateProps = mapStateToProps(state, ownProps);
    var statePropsChanged = !areStatePropsEqual(nextStateProps, stateProps);
    stateProps = nextStateProps;
    if (statePropsChanged) mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    return mergedProps;
  }

  function handleSubsequentCalls(nextState, nextOwnProps) {
    var propsChanged = !areOwnPropsEqual(nextOwnProps, ownProps);
    var stateChanged = !areStatesEqual(nextState, state);
    state = nextState;
    ownProps = nextOwnProps;
    if (propsChanged && stateChanged) return handleNewPropsAndNewState();
    if (propsChanged) return handleNewProps();
    if (stateChanged) return handleNewState();
    return mergedProps;
  }

  return function pureFinalPropsSelector(nextState, nextOwnProps) {
    return hasRunAtLeastOnce ? handleSubsequentCalls(nextState, nextOwnProps) : handleFirstCall(nextState, nextOwnProps);
  };
} // TODO: Add more comments
// If pure is true, the selector returned by selectorFactory will memoize its results,
// allowing connectAdvanced's shouldComponentUpdate to return false if final
// props have not changed. If false, the selector will always return a new
// object and shouldComponentUpdate will always return true.

function finalPropsSelectorFactory(dispatch, _ref2) {
  var initMapStateToProps = _ref2.initMapStateToProps,
      initMapDispatchToProps = _ref2.initMapDispatchToProps,
      initMergeProps = _ref2.initMergeProps,
      options = _objectWithoutPropertiesLoose(_ref2, ["initMapStateToProps", "initMapDispatchToProps", "initMergeProps"]);

  var mapStateToProps = initMapStateToProps(dispatch, options);
  var mapDispatchToProps = initMapDispatchToProps(dispatch, options);
  var mergeProps = initMergeProps(dispatch, options);

  if (false) {}

  var selectorFactory = options.pure ? pureFinalPropsSelectorFactory : impureFinalPropsSelectorFactory;
  return selectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch, options);
}
;// CONCATENATED MODULE: ../../../node_modules/react-redux/es/connect/connect.js








/*
  connect is a facade over connectAdvanced. It turns its args into a compatible
  selectorFactory, which has the signature:

    (dispatch, options) => (nextState, nextOwnProps) => nextFinalProps
  
  connect passes its args to connectAdvanced as options, which will in turn pass them to
  selectorFactory each time a Connect component instance is instantiated or hot reloaded.

  selectorFactory returns a final props selector from its mapStateToProps,
  mapStateToPropsFactories, mapDispatchToProps, mapDispatchToPropsFactories, mergeProps,
  mergePropsFactories, and pure args.

  The resulting final props selector is called by the Connect component instance whenever
  it receives new props or store state.
 */

function match(arg, factories, name) {
  for (var i = factories.length - 1; i >= 0; i--) {
    var result = factories[i](arg);
    if (result) return result;
  }

  return function (dispatch, options) {
    throw new Error("Invalid value of type " + typeof arg + " for " + name + " argument when connecting component " + options.wrappedComponentName + ".");
  };
}

function strictEqual(a, b) {
  return a === b;
} // createConnect with default args builds the 'official' connect behavior. Calling it with
// different options opens up some testing and extensibility scenarios


function createConnect(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      _ref$connectHOC = _ref.connectHOC,
      connectHOC = _ref$connectHOC === void 0 ? connectAdvanced : _ref$connectHOC,
      _ref$mapStateToPropsF = _ref.mapStateToPropsFactories,
      mapStateToPropsFactories = _ref$mapStateToPropsF === void 0 ? mapStateToProps : _ref$mapStateToPropsF,
      _ref$mapDispatchToPro = _ref.mapDispatchToPropsFactories,
      mapDispatchToPropsFactories = _ref$mapDispatchToPro === void 0 ? mapDispatchToProps : _ref$mapDispatchToPro,
      _ref$mergePropsFactor = _ref.mergePropsFactories,
      mergePropsFactories = _ref$mergePropsFactor === void 0 ? mergeProps : _ref$mergePropsFactor,
      _ref$selectorFactory = _ref.selectorFactory,
      selectorFactory = _ref$selectorFactory === void 0 ? finalPropsSelectorFactory : _ref$selectorFactory;

  return function connect(mapStateToProps, mapDispatchToProps, mergeProps, _ref2) {
    if (_ref2 === void 0) {
      _ref2 = {};
    }

    var _ref3 = _ref2,
        _ref3$pure = _ref3.pure,
        pure = _ref3$pure === void 0 ? true : _ref3$pure,
        _ref3$areStatesEqual = _ref3.areStatesEqual,
        areStatesEqual = _ref3$areStatesEqual === void 0 ? strictEqual : _ref3$areStatesEqual,
        _ref3$areOwnPropsEqua = _ref3.areOwnPropsEqual,
        areOwnPropsEqual = _ref3$areOwnPropsEqua === void 0 ? shallowEqual : _ref3$areOwnPropsEqua,
        _ref3$areStatePropsEq = _ref3.areStatePropsEqual,
        areStatePropsEqual = _ref3$areStatePropsEq === void 0 ? shallowEqual : _ref3$areStatePropsEq,
        _ref3$areMergedPropsE = _ref3.areMergedPropsEqual,
        areMergedPropsEqual = _ref3$areMergedPropsE === void 0 ? shallowEqual : _ref3$areMergedPropsE,
        extraOptions = _objectWithoutPropertiesLoose(_ref3, ["pure", "areStatesEqual", "areOwnPropsEqual", "areStatePropsEqual", "areMergedPropsEqual"]);

    var initMapStateToProps = match(mapStateToProps, mapStateToPropsFactories, 'mapStateToProps');
    var initMapDispatchToProps = match(mapDispatchToProps, mapDispatchToPropsFactories, 'mapDispatchToProps');
    var initMergeProps = match(mergeProps, mergePropsFactories, 'mergeProps');
    return connectHOC(selectorFactory, extends_extends({
      // used in error messages
      methodName: 'connect',
      // used to compute Connect's displayName from the wrapped component's displayName.
      getDisplayName: function getDisplayName(name) {
        return "Connect(" + name + ")";
      },
      // if mapStateToProps is falsy, the Connect component doesn't subscribe to store state changes
      shouldHandleStateChanges: Boolean(mapStateToProps),
      // passed through to selectorFactory
      initMapStateToProps: initMapStateToProps,
      initMapDispatchToProps: initMapDispatchToProps,
      initMergeProps: initMergeProps,
      pure: pure,
      areStatesEqual: areStatesEqual,
      areOwnPropsEqual: areOwnPropsEqual,
      areStatePropsEqual: areStatePropsEqual,
      areMergedPropsEqual: areMergedPropsEqual
    }, extraOptions));
  };
}
/* harmony default export */ const connect = (/*#__PURE__*/createConnect());
;// CONCATENATED MODULE: ../../../node_modules/react-redux/es/hooks/useReduxContext.js


/**
 * A hook to access the value of the `ReactReduxContext`. This is a low-level
 * hook that you should usually not need to call directly.
 *
 * @returns {any} the value of the `ReactReduxContext`
 *
 * @example
 *
 * import React from 'react'
 * import { useReduxContext } from 'react-redux'
 *
 * export const CounterComponent = ({ value }) => {
 *   const { store } = useReduxContext()
 *   return <div>{store.getState()}</div>
 * }
 */

function useReduxContext() {
  var contextValue = useContext(ReactReduxContext);

  if (false) {}

  return contextValue;
}
;// CONCATENATED MODULE: ../../../node_modules/react-redux/es/hooks/useStore.js



/**
 * Hook factory, which creates a `useStore` hook bound to a given context.
 *
 * @param {React.Context} [context=ReactReduxContext] Context passed to your `<Provider>`.
 * @returns {Function} A `useStore` hook bound to the specified context.
 */

function useStore_createStoreHook(context) {
  if (context === void 0) {
    context = ReactReduxContext;
  }

  var useReduxContext = context === ReactReduxContext ? useDefaultReduxContext : function () {
    return useContext(context);
  };
  return function useStore() {
    var _useReduxContext = useReduxContext(),
        store = _useReduxContext.store;

    return store;
  };
}
/**
 * A hook to access the redux store.
 *
 * @returns {any} the redux store
 *
 * @example
 *
 * import React from 'react'
 * import { useStore } from 'react-redux'
 *
 * export const ExampleComponent = () => {
 *   const store = useStore()
 *   return <div>{store.getState()}</div>
 * }
 */

var useStore = /*#__PURE__*/(/* unused pure expression or super */ null && (useStore_createStoreHook()));
;// CONCATENATED MODULE: ../../../node_modules/react-redux/es/hooks/useDispatch.js


/**
 * Hook factory, which creates a `useDispatch` hook bound to a given context.
 *
 * @param {React.Context} [context=ReactReduxContext] Context passed to your `<Provider>`.
 * @returns {Function} A `useDispatch` hook bound to the specified context.
 */

function createDispatchHook(context) {
  if (context === void 0) {
    context = ReactReduxContext;
  }

  var useStore = context === ReactReduxContext ? useDefaultStore : createStoreHook(context);
  return function useDispatch() {
    var store = useStore();
    return store.dispatch;
  };
}
/**
 * A hook to access the redux `dispatch` function.
 *
 * @returns {any|function} redux store's `dispatch` function
 *
 * @example
 *
 * import React, { useCallback } from 'react'
 * import { useDispatch } from 'react-redux'
 *
 * export const CounterComponent = ({ value }) => {
 *   const dispatch = useDispatch()
 *   const increaseCounter = useCallback(() => dispatch({ type: 'increase-counter' }), [])
 *   return (
 *     <div>
 *       <span>{value}</span>
 *       <button onClick={increaseCounter}>Increase counter</button>
 *     </div>
 *   )
 * }
 */

var useDispatch = /*#__PURE__*/(/* unused pure expression or super */ null && (createDispatchHook()));
;// CONCATENATED MODULE: ../../../node_modules/react-redux/es/hooks/useSelector.js






var refEquality = function refEquality(a, b) {
  return a === b;
};

function useSelectorWithStoreAndSubscription(selector, equalityFn, store, contextSub) {
  var _useReducer = useReducer(function (s) {
    return s + 1;
  }, 0),
      forceRender = _useReducer[1];

  var subscription = useMemo(function () {
    return new Subscription(store, contextSub);
  }, [store, contextSub]);
  var latestSubscriptionCallbackError = useRef();
  var latestSelector = useRef();
  var latestStoreState = useRef();
  var latestSelectedState = useRef();
  var storeState = store.getState();
  var selectedState;

  try {
    if (selector !== latestSelector.current || storeState !== latestStoreState.current || latestSubscriptionCallbackError.current) {
      var newSelectedState = selector(storeState); // ensure latest selected state is reused so that a custom equality function can result in identical references

      if (latestSelectedState.current === undefined || !equalityFn(newSelectedState, latestSelectedState.current)) {
        selectedState = newSelectedState;
      } else {
        selectedState = latestSelectedState.current;
      }
    } else {
      selectedState = latestSelectedState.current;
    }
  } catch (err) {
    if (latestSubscriptionCallbackError.current) {
      err.message += "\nThe error may be correlated with this previous error:\n" + latestSubscriptionCallbackError.current.stack + "\n\n";
    }

    throw err;
  }

  useIsomorphicLayoutEffect(function () {
    latestSelector.current = selector;
    latestStoreState.current = storeState;
    latestSelectedState.current = selectedState;
    latestSubscriptionCallbackError.current = undefined;
  });
  useIsomorphicLayoutEffect(function () {
    function checkForUpdates() {
      try {
        var newStoreState = store.getState();

        var _newSelectedState = latestSelector.current(newStoreState);

        if (equalityFn(_newSelectedState, latestSelectedState.current)) {
          return;
        }

        latestSelectedState.current = _newSelectedState;
        latestStoreState.current = newStoreState;
      } catch (err) {
        // we ignore all errors here, since when the component
        // is re-rendered, the selectors are called again, and
        // will throw again, if neither props nor store state
        // changed
        latestSubscriptionCallbackError.current = err;
      }

      forceRender();
    }

    subscription.onStateChange = checkForUpdates;
    subscription.trySubscribe();
    checkForUpdates();
    return function () {
      return subscription.tryUnsubscribe();
    };
  }, [store, subscription]);
  return selectedState;
}
/**
 * Hook factory, which creates a `useSelector` hook bound to a given context.
 *
 * @param {React.Context} [context=ReactReduxContext] Context passed to your `<Provider>`.
 * @returns {Function} A `useSelector` hook bound to the specified context.
 */


function createSelectorHook(context) {
  if (context === void 0) {
    context = ReactReduxContext;
  }

  var useReduxContext = context === ReactReduxContext ? useDefaultReduxContext : function () {
    return useContext(context);
  };
  return function useSelector(selector, equalityFn) {
    if (equalityFn === void 0) {
      equalityFn = refEquality;
    }

    if (false) {}

    var _useReduxContext = useReduxContext(),
        store = _useReduxContext.store,
        contextSub = _useReduxContext.subscription;

    var selectedState = useSelectorWithStoreAndSubscription(selector, equalityFn, store, contextSub);
    useDebugValue(selectedState);
    return selectedState;
  };
}
/**
 * A hook to access the redux store's state. This hook takes a selector function
 * as an argument. The selector is called with the store state.
 *
 * This hook takes an optional equality comparison function as the second parameter
 * that allows you to customize the way the selected state is compared to determine
 * whether the component needs to be re-rendered.
 *
 * @param {Function} selector the selector function
 * @param {Function=} equalityFn the function that will be used to determine equality
 *
 * @returns {any} the selected state
 *
 * @example
 *
 * import React from 'react'
 * import { useSelector } from 'react-redux'
 *
 * export const CounterComponent = () => {
 *   const counter = useSelector(state => state.counter)
 *   return <div>{counter}</div>
 * }
 */

var useSelector = /*#__PURE__*/(/* unused pure expression or super */ null && (createSelectorHook()));
// EXTERNAL MODULE: ../../../node_modules/react-dom/index.js
var react_dom = __webpack_require__(788);
;// CONCATENATED MODULE: ../../../node_modules/react-redux/es/utils/reactBatchedUpdates.js
/* eslint-disable import/no-unresolved */

;// CONCATENATED MODULE: ../../../node_modules/react-redux/es/index.js










setBatch(react_dom.unstable_batchedUpdates);

;// CONCATENATED MODULE: ./hud/components/Minimap/minimap.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const minimap_module = ({"container":"chIrdYtZyblNYYYGOCSI","minimap":"QJp6qFKPkiSjQtp4IWYu","overlay":"FsTpjUYsXR18vjlgG0Ms","label":"MMYyKjPgWvMQW3zcTxSA"});
;// CONCATENATED MODULE: ./hud/components/Minimap/Minimap.tsx




const Minimap_mapStateToProps = (state) => ({
    zoom: state.minimapReducer.zoom,
});
const connector = connect(Minimap_mapStateToProps);
const Minimap = (props) => {
    // $.Msg("REACT-RENDER: Minimap rendered");
    const [zoneName, setZoneName] = (0,react.useState)('#ZoneName');
    r("set_zone_name", (event) => {
        setZoneName(event.zoneName);
    }, []);
    return (react.createElement(Panel, { className: minimap_module.container },
        react.createElement(Panel, { className: minimap_module.overlay },
            react.createElement(DOTAHUDOverlayMap, { className: minimap_module.minimap, mapscale: props.zoom, hittest: false, hittestchildren: false, maptexture: "materials/overviews/the_arena_tga_5f0a2a04.vtex" })),
        react.createElement(Label, { className: minimap_module.label, text: zoneName })));
};
/* harmony default export */ const Minimap_Minimap = (react.memo(connector(Minimap)));

;// CONCATENATED MODULE: ./hud/components/Settings/CameraZoomSlider/styles.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const styles_module = ({"textLabel":"qJ5qDt3HscvdMwgRJQIA","sliderContainer":"qlCUi6GWfR9etq6VTigF","numberLabel":"otJVKGNMokJ9d1aFZvUL"});
;// CONCATENATED MODULE: ./hud/components/Settings/CameraZoomSlider/CameraZoomSlider.tsx


/**
 * Requires "Far Z Clip plane" in the "env_fog_controller" entity to be increased to 5000 or more.
 */
const CameraZoomSlider = (props) => {
    // $.Msg("REACT-RENDER: Settings - CameraZoomSlider rendered");
    const { cameraZoom, setCameraZoom } = props;
    (0,react.useEffect)(() => {
        // Hack to initalize the slider caret correctly
        const panel = $("#camera_zoom_slider");
        panel.value = cameraZoom || 1600;
    }, []);
    return (react.createElement(react.Fragment, null,
        react.createElement(Label, { className: styles_module.textLabel, text: "Camera Zoom:" }),
        react.createElement(Panel, { className: styles_module.sliderContainer },
            react.createElement(Slider, { id: "camera_zoom_slider", className: "HorizontalSlider", direction: "horizontal", value: cameraZoom, min: 800, max: 2000, onvaluechanged: (event) => setCameraZoom(Math.round(event.value)) })),
        react.createElement(Label, { className: styles_module.numberLabel, text: cameraZoom })));
};
/* harmony default export */ const CameraZoomSlider_CameraZoomSlider = (react.memo(CameraZoomSlider));

;// CONCATENATED MODULE: ./hud/components/Settings/LockCameraBtn/styles.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const LockCameraBtn_styles_module = ({"Container":"MOSg_QAIq3_zSfU4sLB2","leftLabel":"rTqYpqnp7ouCe_6oNCRp","rightLabel":"mgSEwNM1f9Lsin1u8bZQ","toggleBtnContainer":"j5l3Lkh1ZEoTzCvpxuLx"});
;// CONCATENATED MODULE: ./hud/components/Settings/LockCameraBtn/LockCameraBtn.tsx


const LockCameraBtn = (props) => {
    // $.Msg("REACT-RENDER: Settings - LockCameraBtn rendered");
    const { isLocked, setIsLocked } = props;
    return (react.createElement(Panel, { className: LockCameraBtn_styles_module.Container },
        react.createElement(Label, { className: LockCameraBtn_styles_module.leftLabel, text: "Lock Camera:" }),
        react.createElement(Panel, { className: LockCameraBtn_styles_module.toggleBtnContainer },
            react.createElement(ToggleButton, { selected: isLocked, onactivate: () => setIsLocked(prevState => !prevState) })),
        react.createElement(Label, { className: LockCameraBtn_styles_module.rightLabel, text: isLocked ? "Locked" : "Unlocked" })));
};
/* harmony default export */ const LockCameraBtn_LockCameraBtn = (react.memo(LockCameraBtn));

;// CONCATENATED MODULE: ./hud/types/minimapTypes.tsx
const SET_MINIMAP_ZOOM = 'SET_MINIMAP_ZOOM';

;// CONCATENATED MODULE: ./hud/actions/minimapActions.tsx

function setMinimapZoom(zoom) {
    return {
        type: SET_MINIMAP_ZOOM,
        payload: zoom
    };
}

;// CONCATENATED MODULE: ./hud/components/Settings/MapZoomSlider/styles.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const MapZoomSlider_styles_module = ({"textLabel":"tMVPaoV8qCPiQUFJN8m7","sliderContainer":"KGIC4zUkrpQHSIL9qaG5","numberLabel":"shyD21vHDZXrvlrqOtBq"});
;// CONCATENATED MODULE: ./hud/components/Settings/MapZoomSlider/MapZoomSlider.tsx




const MapZoomSlider_mapStateToProps = (state) => ({
    zoom: state.minimapReducer.zoom,
});
const MapZoomSlider_mapDispatchToProps = (dispatch) => ({
    setMinimapZoom: (zoom) => dispatch(setMinimapZoom(zoom)),
});
const MapZoomSlider_connector = connect(MapZoomSlider_mapStateToProps, MapZoomSlider_mapDispatchToProps);
const MapZoomSlider = (props) => {
    // $.Msg("REACT-RENDER: Settings - MapZoomSlider rendered");
    (0,react.useEffect)(() => {
        // Hack to initalize the slider caret correctly
        const panel = $("#map_zoom_slider");
        panel.value = props.zoom;
    }, []);
    return (react.createElement(react.Fragment, null,
        react.createElement(Label, { className: MapZoomSlider_styles_module.textLabel, text: "Minimap Zoom:" }),
        react.createElement(Panel, { className: MapZoomSlider_styles_module.sliderContainer },
            react.createElement(Slider, { id: "map_zoom_slider", className: "HorizontalSlider", direction: "horizontal", value: props.zoom, min: 3, max: 10, onvaluechanged: (e) => props.setMinimapZoom(Math.round(e.value)) })),
        react.createElement(Label, { className: MapZoomSlider_styles_module.numberLabel, text: props.zoom })));
};
/* harmony default export */ const MapZoomSlider_MapZoomSlider = (react.memo(MapZoomSlider_connector(MapZoomSlider)));

;// CONCATENATED MODULE: ./hud/components/Settings/Divider/styles.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const Divider_styles_module = ({"container":"uSWjRHlCiWLoi4TwXo3B"});
;// CONCATENATED MODULE: ./hud/components/Settings/Divider/Divider.tsx


const Divider = () => {
    // $.Msg("REACT-RENDER: Settings - Divider rendered");
    return (react.createElement(Panel, { className: Divider_styles_module.container }));
};
/* harmony default export */ const Divider_Divider = (react.memo(Divider));

;// CONCATENATED MODULE: ./hud/types/settingsTypes.tsx
const SET_SETTINGS_VISIBLE = 'SET_SETTINGS_VISIBLE';
const SET_CAMERA_LOCKED = 'SET_CAMERA_LOCKED';
const SET_CAMERA_ZOOM = 'SET_CAMERA_ZOOM';
const SET_USE_CUSTOM_UI = 'SET_USE_CUSTOM_UI';

;// CONCATENATED MODULE: ./hud/actions/settingsAction.tsx

function setSettingsVisible(visible) {
    return {
        type: SET_SETTINGS_VISIBLE,
        payload: { visible }
    };
}
function setCameraLocked(locked) {
    return {
        type: SET_CAMERA_LOCKED,
        payload: locked
    };
}
function setCameraZoom(zoom) {
    return {
        type: SET_CAMERA_ZOOM,
        payload: zoom
    };
}

;// CONCATENATED MODULE: ./hud/components/Settings/Title/styles.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const Title_styles_module = ({"container":"UWxRbuGbxfyCW361Vd3H","label":"bddlYBMDSBrfOoyNdHAF","closeBtn":"MdVg5fj4RLKA8xMha4bH"});
;// CONCATENATED MODULE: ./hud/components/Settings/Title/Title.tsx




const Title_mapStateToProps = (state) => ({
    visible: state.settingsReducer.visible,
});
const Title_mapDispatchToProps = (dispatch) => ({
    setSettingsVisible: (visible) => dispatch(setSettingsVisible(visible)),
});
const Title_connector = connect(Title_mapStateToProps, Title_mapDispatchToProps);
const Title = (props) => {
    // $.Msg("REACT-RENDER: Settings - Title rendered");
    const { setSettingsVisible } = props;
    return (react.createElement(Panel, { className: Title_styles_module.container },
        react.createElement(Label, { className: Title_styles_module.label, text: "SETTINGS - " + $.Localize(Entities.GetUnitName(Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer()))).toUpperCase() }),
        react.createElement(Button, { className: Title_styles_module.closeBtn, onactivate: () => {
                setSettingsVisible(false);
                Game.EmitSound("ui_topmenu_select");
            } },
            react.createElement(Image, { src: "s2r://panorama/images/close_btn_white_png.vtex" }))));
};
/* harmony default export */ const Title_Title = (react.memo(Title_connector(Title)));

;// CONCATENATED MODULE: ./hud/hooks/useTimeout.ts

const useTimeout = (callback, delay = 0, deps) => {
    const savedCallback = (0,react.useRef)(() => { });
    (0,react.useEffect)(() => {
        savedCallback.current = callback;
    }, [callback]);
    (0,react.useEffect)(() => {
        function update() {
            savedCallback.current();
        }
        // @ts-ignore
        const id = setTimeout(update, delay);
        return () => {
            // @ts-ignore
            clearTimeout(id);
        };
    }, [delay, deps]);
};

;// CONCATENATED MODULE: ./hud/components/Settings/styles.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const Settings_styles_module = ({"container":"AuZ2AAEjJ4u1lGtGXcN3","entry":"Q9qnNySVaR9UK9mbJpvt"});
;// CONCATENATED MODULE: ./hud/components/Settings/Settings.tsx












const Settings_mapStateToProps = (state) => ({
    visible: state.settingsReducer.visible,
});
const Settings_mapDispatchToProps = (dispatch) => ({
    setSettingsVisible: (visible) => dispatch(setSettingsVisible(visible)),
    setCameraLocked: (locked) => dispatch(setCameraLocked(locked)),
    setCameraZoom: (zoom) => dispatch(setCameraZoom(zoom)),
});
const Settings_connector = connect(Settings_mapStateToProps, Settings_mapDispatchToProps);
const Settings = (props) => {
    // $.Msg("REACT-RENDER: Settings rendered");
    const { visible, setSettingsVisible } = props;
    const [cameraZoom, setCameraZoom] = (0,react.useState)(1600);
    const [isLocked, setIsLocked] = (0,react.useState)(true);
    const [renderComponent, setRenderComponent] = (0,react.useState)(false);
    (0,react.useEffect)(() => {
        GameUI.SetCameraDistance(cameraZoom);
    }, [cameraZoom]);
    (0,react.useEffect)(() => {
        if (isLocked) {
            GameUI.SetCameraTarget(Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer()));
        }
        else {
            GameUI.SetCameraTarget(-1);
        }
    }, [isLocked]);
    useTimeout(() => {
        setRenderComponent(visible);
    }, visible === false ? HUD_THINK_SLOW : 0);
    i('Cancelled', () => {
        if (visible) {
            Game.EmitSound("ui_topmenu_select");
        }
        setSettingsVisible(false);
    }, [visible, setSettingsVisible]);
    return (react.createElement(react.Fragment, null, renderComponent && (react.createElement(Panel, { className: Settings_styles_module.container, style: visible ? { transform: 'translateX(-10px)', opacity: '1.0' } : {} },
        react.createElement(Title_Title, null),
        react.createElement(Divider_Divider, null),
        react.createElement(Panel, { className: Settings_styles_module.entry },
            react.createElement(CameraZoomSlider_CameraZoomSlider, { cameraZoom: cameraZoom, setCameraZoom: setCameraZoom })),
        react.createElement(Divider_Divider, null),
        react.createElement(Panel, { className: Settings_styles_module.entry },
            react.createElement(MapZoomSlider_MapZoomSlider, null)),
        react.createElement(Divider_Divider, null),
        react.createElement(Panel, { className: Settings_styles_module.entry },
            react.createElement(LockCameraBtn_LockCameraBtn, { isLocked: isLocked, setIsLocked: setIsLocked })),
        react.createElement(Divider_Divider, null)))));
};
/* harmony default export */ const Settings_Settings = (react.memo(Settings_connector(Settings)));

;// CONCATENATED MODULE: ./hud/types/abilitiesShopTypes.tsx
const SET_ABILITIES_SHOP_VISIBLE = 'SET_ABILITIES_SHOP_VISIBLE';

;// CONCATENATED MODULE: ./hud/actions/abilitiesShopActions.tsx

function setAbilitiesShopVisible(visible) {
    return {
        type: SET_ABILITIES_SHOP_VISIBLE,
        payload: { visible }
    };
}

;// CONCATENATED MODULE: ./hud/components/ButtonGroup/styles.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const ButtonGroup_styles_module = ({"container":"VAbVj6ocFtX3DJzOqCnL","btn":"UJCvjFyZXXNKwJOrhwa4"});
;// CONCATENATED MODULE: ./hud/components/ButtonGroup/AbilitiesShopButton/AbilitiesShopButton.tsx




const AbilitiesShopButton_mapStateToProps = (state) => ({
    visible: state.abilitiesShopReducer.visible,
});
const AbilitiesShopButton_mapDispatchToProps = (dispatch) => ({
    setAbilitiesShopVisible: (visible) => dispatch(setAbilitiesShopVisible(visible)),
});
const AbilitiesShopButton_connector = connect(AbilitiesShopButton_mapStateToProps, AbilitiesShopButton_mapDispatchToProps);
const AbilitiesShopButton = (props) => {
    // $.Msg("REACT-RENDER: ButtonGroup - AbilitiesShopButton rendered");
    const { visible, setAbilitiesShopVisible } = props;
    return (react.createElement(Button, { id: 'abilities_shop_btn', className: ButtonGroup_styles_module.btn, onactivate: () => {
            $('#abilities_shop_btn').RemoveClass('btnClicked');
            $('#abilities_shop_btn').AddClass('btnClicked');
            setAbilitiesShopVisible(!visible);
            Game.EmitSound("ui_topmenu_select");
        } },
        react.createElement(Image, { style: { washColor: visible ? 'orange' : 'white' }, src: "s2r://panorama/images/book_open_page_variant_outline_png.vtex" })));
};
/* harmony default export */ const AbilitiesShopButton_AbilitiesShopButton = (react.memo(AbilitiesShopButton_connector(AbilitiesShopButton)));

;// CONCATENATED MODULE: ./hud/types/characterTypes.tsx
const SET_CHARACTER_VISIBLE = 'SET_CHARACTER_VISIBLE';

;// CONCATENATED MODULE: ./hud/actions/characterActions.tsx

function setCharacterVisible(visible) {
    return {
        type: SET_CHARACTER_VISIBLE,
        payload: { visible }
    };
}

;// CONCATENATED MODULE: ./hud/components/ButtonGroup/CharacterButton/CharaterButton.tsx




const CharaterButton_mapStateToProps = (state) => ({
    visible: state.characterReducer.visible,
});
const CharaterButton_mapDispatchToProps = (dispatch) => ({
    setCharacterPanelVisible: (visible) => dispatch(setCharacterVisible(visible)),
});
const CharaterButton_connector = connect(CharaterButton_mapStateToProps, CharaterButton_mapDispatchToProps);
const CharaterButton = (props) => {
    // $.Msg("REACT-RENDER: ButtonGroup - CharacterButton rendered");
    const { visible, setCharacterPanelVisible } = props;
    return (react.createElement(Button, { id: 'character_btn', className: ButtonGroup_styles_module.btn, onactivate: () => {
            $('#character_btn').RemoveClass('btnClicked');
            $('#character_btn').AddClass('btnClicked');
            setCharacterPanelVisible(!visible);
            Game.EmitSound("ui_topmenu_select");
        } },
        react.createElement(Image, { style: { washColor: visible ? 'orange' : 'white' }, src: "s2r://panorama/images/character_btn_white_png.vtex" })));
};
/* harmony default export */ const CharacterButton_CharaterButton = (react.memo(CharaterButton_connector(CharaterButton)));

;// CONCATENATED MODULE: ./hud/components/ButtonGroup/SettingsButton/SettingsButton.tsx




const SettingsButton_mapStateToProps = (state) => ({
    visible: state.settingsReducer.visible,
});
const SettingsButton_mapDispatchToProps = (dispatch) => ({
    setSettingsVisible: (visible) => dispatch(setSettingsVisible(visible)),
});
const SettingsButton_connector = connect(SettingsButton_mapStateToProps, SettingsButton_mapDispatchToProps);
const SettingsButton = (props) => {
    // $.Msg("REACT-RENDER: ButtonGroup - SettingsButton rendered");
    const { visible, setSettingsVisible } = props;
    return (react.createElement(Button, { id: 'settings_btn', className: ButtonGroup_styles_module.btn, onactivate: () => {
            $('#settings_btn').RemoveClass('btnClicked');
            $('#settings_btn').AddClass('btnClicked');
            setSettingsVisible(!visible);
            Game.EmitSound("ui_topmenu_select");
        } },
        react.createElement(Image, { style: { washColor: visible ? 'orange' : 'white' }, src: "s2r://panorama/images/settings_btn_white_png.vtex" })));
};
/* harmony default export */ const SettingsButton_SettingsButton = (react.memo(SettingsButton_connector(SettingsButton)));

;// CONCATENATED MODULE: ./hud/types/shopTypes.tsx
const SET_SHOP_VISIBLE = 'SET_SHOP_VISIBLE';
const SET_SHOP_SEARCH_VALUE = 'SET_SHOP_SEARCH_VALUE';

;// CONCATENATED MODULE: ./hud/actions/shopActions.tsx

function setShopVisible(visible) {
    return {
        type: SET_SHOP_VISIBLE,
        payload: { visible }
    };
}
function setShopSearchValue(searchValue) {
    return {
        type: SET_SHOP_SEARCH_VALUE,
        payload: { searchValue }
    };
}

;// CONCATENATED MODULE: ./hud/components/ButtonGroup/ShoppingButton/ShoppingButton.tsx




const ShoppingButton_mapStateToProps = (state) => ({
    visible: state.shopReducer.visible,
});
const ShoppingButton_mapDispatchToProps = (dispatch) => ({
    setShopVisible: (visible) => dispatch(setShopVisible(visible)),
});
const ShoppingButton_connector = connect(ShoppingButton_mapStateToProps, ShoppingButton_mapDispatchToProps);
const ShoppingButton = (props) => {
    // $.Msg("REACT-RENDER: ButtonGroup - ShoppingButton rendered");
    const { visible, setShopVisible } = props;
    return (react.createElement(Button, { id: 'item_shopping_btn', className: ButtonGroup_styles_module.btn, onactivate: () => {
            $('#item_shopping_btn').RemoveClass('btnClicked');
            $('#item_shopping_btn').AddClass('btnClicked');
            setShopVisible(!visible);
            Game.EmitSound("ui_topmenu_select");
        } },
        react.createElement(Image, { style: { washColor: visible ? 'orange' : 'white' }, src: "s2r://panorama/images/shop_btn_white_png.vtex" })));
};
/* harmony default export */ const ShoppingButton_ShoppingButton = (react.memo(ShoppingButton_connector(ShoppingButton)));

;// CONCATENATED MODULE: ./hud/components/ButtonGroup/ButtonGroup.tsx






const ButtonGroup = () => {
    // $.Msg("REACT-RENDER: ButtonGroup rendered");
    return (react.createElement(Panel, { hittest: true, className: ButtonGroup_styles_module.container },
        react.createElement(SettingsButton_SettingsButton, null),
        react.createElement(ShoppingButton_ShoppingButton, null),
        react.createElement(CharacterButton_CharaterButton, null),
        react.createElement(AbilitiesShopButton_AbilitiesShopButton, null)));
};
/* harmony default export */ const ButtonGroup_ButtonGroup = (react.memo(ButtonGroup));

;// CONCATENATED MODULE: ./hud/hooks/useInterval.ts

const useInterval = (callback, delay = 0) => {
    const savedCallback = (0,react.useRef)(() => { });
    (0,react.useEffect)(() => {
        savedCallback.current = callback;
    }, [callback]);
    (0,react.useEffect)(() => {
        function update() {
            savedCallback.current();
        }
        // @ts-ignore
        const id = setInterval(update, delay);
        return () => {
            // @ts-ignore
            clearInterval(id);
        };
    }, [delay]);
};

;// CONCATENATED MODULE: ./hud/components/Heroes/Health/styles.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const Health_styles_module = ({"container":"f5tPV5CzsnGZse09Jd3H"});
;// CONCATENATED MODULE: ./hud/components/Heroes/Health/Health.tsx




const Health = (props) => {
    // $.Msg("REACT-RENDER: Heroes - Health rendered");
    const { hero } = props;
    const [health, setHealth] = (0,react.useState)(Entities.GetHealth(hero));
    const [maxHealth, setMaxHealth] = (0,react.useState)(Entities.GetMaxHealth(hero));
    useInterval(() => {
        setHealth(Entities.GetHealth(hero));
        setMaxHealth(Entities.GetMaxHealth(hero));
    }, HUD_THINK_FAST);
    return (react.createElement(Panel, { className: Health_styles_module.container },
        react.createElement(ProgressBar, { min: 0, max: maxHealth, value: health, className: 'healthProgressBar', style: {
                width: "100%",
                height: "6px",
                borderRadius: "0px",
                horizontalAlign: "center",
            } })));
};
/* harmony default export */ const Health_Health = (react.memo(Health));

;// CONCATENATED MODULE: ./hud/components/Heroes/Image/styles.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const Image_styles_module = ({"container":"HghwT4F3Upk6ZZxs3RGH","image":"y3mao5EPMJ_BUMYw9yF_","disconnected":"ecRPyTj5GQqyvUNoa2TI"});
;// CONCATENATED MODULE: ./hud/components/Heroes/Image/Image.tsx





const Image_mapStateToProps = (state) => ({
    cameraLocked: state.settingsReducer.cameraLocked,
});
const Image_connector = connect(Image_mapStateToProps);
const onHeroImageClicked = (hero, cameraLocked) => {
    const isAlive = Entities.IsAlive(hero);
    const issSelectable = Entities.IsSelectable(hero);
    const clickbehaviors = GameUI.GetClickBehaviors();
    if (!isAlive) {
        GameUI.SendCustomHUDError("Target Is Dead", "General.InvalidTarget_Invulnerable");
        return;
    }
    if (!issSelectable) {
        GameUI.SendCustomHUDError("Target Is Unselectable", "General.InvalidTarget_Invulnerable");
        return;
    }
    if (clickbehaviors === CLICK_BEHAVIORS.DOTA_CLICK_BEHAVIOR_CAST) {
        if (DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_UNIT_TARGET) {
            const order = {
                AbilityIndex: Abilities.GetLocalPlayerActiveAbility(),
                QueueBehavior: OrderQueueBehavior_t.DOTA_ORDER_QUEUE_NEVER,
                ShowEffects: true,
                OrderType: dotaunitorder_t.DOTA_UNIT_ORDER_CAST_TARGET,
                TargetIndex: hero,
            };
            Game.PrepareUnitOrders(order);
        }
    }
    else {
        if (cameraLocked) {
            GameUI.SendCustomHUDError("Camera Is Locked", "General.InvalidTarget_Invulnerable");
            return;
        }
        GameUI.SetCameraTargetPosition(Entities.GetAbsOrigin(hero), 0.3);
        Game.EmitSound("ui_topmenu_select");
    }
};
const ImageImpl = (props) => {
    // $.Msg("REACT-RENDER: Heroes - HeroImage rendered");
    const { hero, cameraLocked } = props;
    const [washColor, setWashColor] = (0,react.useState)("none");
    const [isDisconnected, setIsDisconnected] = (0,react.useState)(false);
    (0,react.useEffect)(() => {
        const handle = GameEvents.Subscribe("entity_killed", (event) => {
            if (event.entindex_killed === hero && !isDisconnected) {
                setWashColor("grey");
            }
        });
        return () => GameEvents.Unsubscribe(handle);
    }, []);
    (0,react.useEffect)(() => {
        const handle = GameEvents.Subscribe("npc_spawned", (event) => {
            if (event.entindex === hero && !isDisconnected) {
                setWashColor("none");
            }
        });
        return () => GameEvents.Unsubscribe(handle);
    }, []);
    useInterval(() => {
        const playerInfo = Game.GetPlayerInfo(Entities.GetPlayerOwnerID(hero));
        if (playerInfo) {
            const isDisconnected = playerInfo.player_connection_state === DOTAConnectionState_t.DOTA_CONNECTION_STATE_DISCONNECTED ||
                playerInfo.player_connection_state === DOTAConnectionState_t.DOTA_CONNECTION_STATE_ABANDONED ||
                playerInfo.player_connection_state === DOTAConnectionState_t.DOTA_CONNECTION_STATE_FAILED;
            setIsDisconnected(isDisconnected);
            if (isDisconnected) {
                setWashColor("grey");
            }
        }
    }, HUD_THINK_FAST);
    return (react.createElement(Panel, { className: Image_styles_module.container },
        isDisconnected && (react.createElement(Image, { src: "s2r://panorama/images/hud/reborn/icon_disconnect_png.vtex", className: Image_styles_module.disconnected })),
        react.createElement(DOTAHeroImage, { heroname: Entities.GetUnitName(hero), heroimagestyle: "landscape", onactivate: () => onHeroImageClicked(hero, cameraLocked), oncontextmenu: () => onHeroImageClicked(hero, cameraLocked), className: Image_styles_module.image, style: { washColor: washColor } })));
};
/* harmony default export */ const Image_Image = (react.memo(Image_connector(ImageImpl)));

;// CONCATENATED MODULE: ./hud/components/Heroes/Mana/styles.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const Mana_styles_module = ({"container":"q1L5JKSgUrfoBLrvvYIp"});
;// CONCATENATED MODULE: ./hud/components/Heroes/Mana/Mana.tsx




const Mana = (props) => {
    // $.Msg("REACT-RENDER: Heroes - Mana rendered");
    const { hero } = props;
    const [mana, setMana] = (0,react.useState)(Entities.GetMana(hero));
    const [maxMana, setMaxMana] = (0,react.useState)(Entities.GetMaxMana(hero));
    useInterval(() => {
        setMana(Entities.GetMana(hero));
        setMaxMana(Entities.GetMaxMana(hero));
    }, HUD_THINK_FAST);
    return (react.createElement(Panel, { className: Mana_styles_module.container },
        react.createElement(ProgressBar, { min: 0, max: maxMana, value: mana, className: 'manaProgressBar', style: {
                width: "100%",
                height: "6px",
                borderRadius: "0px",
                horizontalAlign: "center",
            } })));
};
/* harmony default export */ const Mana_Mana = (react.memo(Mana));

;// CONCATENATED MODULE: ./hud/utils/Color.ts
const toColor = (playerId) => {
    if (!Players.IsValidPlayerID(playerId)) {
        return '#9C9383';
    }
    const playerColor = Players.GetPlayerColor(playerId).toString(16);
    return ('#' +
        playerColor.substring(6, 8) +
        playerColor.substring(4, 6) +
        playerColor.substring(2, 4) +
        playerColor.substring(0, 2));
};

;// CONCATENATED MODULE: ./hud/components/Heroes/Playername/styles.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const Playername_styles_module = ({"label":"n3KtCag5Ep7H3f7Qu9Bg"});
;// CONCATENATED MODULE: ./hud/components/Heroes/Playername/Playername.tsx



const Playername = (props) => {
    // $.Msg("REACT-RENDER: Heroes - Playername rendered");
    const { playerId } = props;
    return (react.createElement(Label, { text: Players.GetPlayerName(playerId), className: Playername_styles_module.label, style: { color: toColor(playerId) } }));
};
/* harmony default export */ const Playername_Playername = (react.memo(Playername));

;// CONCATENATED MODULE: ./hud/components/Heroes/styles.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const Heroes_styles_module = ({"heroesContainer":"GfoKrcTEyRDAnLfLmlIm","heroContainer":"LSBLkVdl0SLhCGxcmNxE"});
;// CONCATENATED MODULE: ./hud/components/Heroes/Heroes.tsx







const Heroes = () => {
    // $.Msg("REACT-RENDER: Heroes rendered");
    const pickedHeroes = Object.values(a('HeroSelectionHeroes').heroes).filter(hero => hero.picked === 1);
    return (react.createElement(Panel, { className: Heroes_styles_module.heroesContainer }, pickedHeroes.map((pickedHero) => {
        const hero = Players.GetPlayerHeroEntityIndex(pickedHero.playerID);
        return (react.createElement(Panel, { className: Heroes_styles_module.heroContainer, key: hero },
            react.createElement(Image_Image, { hero: hero }),
            react.createElement(Health_Health, { hero: hero }),
            react.createElement(Mana_Mana, { hero: hero }),
            react.createElement(Playername_Playername, { playerId: pickedHero.playerID })));
    })));
};
/* harmony default export */ const Heroes_Heroes = (react.memo(Heroes));

;// CONCATENATED MODULE: ./utils.tsx
const formatTime = (time) => time < 10 ? '0' + time : time;

;// CONCATENATED MODULE: ./hud/components/GameTime/styles.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const GameTime_styles_module = ({"container":"UqxlWvoDM9ivnuHT6GDt","label":"u9zrcHhU8YuhR6YiRAmZ"});
;// CONCATENATED MODULE: ./hud/components/GameTime/GameTime.tsx





const formatGameTime = (dotaTime) => {
    const hours = formatTime(Math.floor(dotaTime / 3600));
    const minutes = formatTime(Math.floor((dotaTime % 3600) / 60));
    const seconds = formatTime(Math.floor((dotaTime % 3600) % 60));
    if (hours === '00') {
        return minutes + ":" + seconds;
    }
    return hours + ":" + minutes + ":" + seconds;
};
const GameTime = () => {
    const [gameTime, setGameTime] = (0,react.useState)(Game.GetDOTATime(false, false));
    useInterval(() => {
        setGameTime(Game.GetDOTATime(false, false));
    }, HUD_THINK_SLOW);
    return (react.createElement(Panel, { className: GameTime_styles_module.container },
        react.createElement(Label, { className: GameTime_styles_module.label, text: formatGameTime(gameTime) })));
};
/* harmony default export */ const GameTime_GameTime = (react.memo(GameTime));

;// CONCATENATED MODULE: ./hud/utils/TableUtils.ts
class TableUtils {
    static areTablesEqual(tableA, tableB, equalityFunction) {
        return tableA.length === tableB.length &&
            tableA.every((v, i) => {
                if (equalityFunction) {
                    return equalityFunction(v, tableB[i]);
                }
                return v === tableB[i];
            });
    }
}

;// CONCATENATED MODULE: ./hud/components/AbilityBar/AbilityBarItem/Cooldown/styles.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const Cooldown_styles_module = ({"container":"BH3auXK9ZqupOPDMyRL0","background":"QAhSsu4TEsVD9DhQb9lL","label":"a5IrJ7wieVRYIOnhCpjA"});
;// CONCATENATED MODULE: ./hud/components/AbilityBar/AbilityBarItem/Cooldown/Cooldown.tsx




const Cooldown = (props) => {
    // $.Msg("REACT-RENDER: AbilityBarItem - Cooldown rendered");
    const { ability } = props;
    const [degree, setDegree] = (0,react.useState)(0);
    const [cooldownTimeRemaining, setCooldownTimeRemaining] = (0,react.useState)(0);
    useInterval(() => {
        const totalCooldown = Abilities.GetCooldown(ability);
        const cooldownTimeRemaining = Abilities.GetCooldownTimeRemaining(ability);
        const degree = Math.min(0, -(cooldownTimeRemaining / totalCooldown) * 360);
        if (Number.isNaN(degree) || !Number.isFinite(degree)) {
            setDegree(0);
        }
        else {
            setDegree(degree);
        }
        setCooldownTimeRemaining(cooldownTimeRemaining);
    }, HUD_THINK_FAST);
    if (cooldownTimeRemaining === 0) {
        return null;
    }
    return (react.createElement(Panel, { className: Cooldown_styles_module.container },
        react.createElement(Panel, { className: Cooldown_styles_module.background, style: { clip: 'radial(50% 50%, 0deg, ' + degree + 'deg)' } }),
        react.createElement(Label, { className: Cooldown_styles_module.label, text: Math.ceil(cooldownTimeRemaining) })));
};
/* harmony default export */ const Cooldown_Cooldown = (react.memo(Cooldown));

;// CONCATENATED MODULE: ./hud/components/AbilityBar/AbilityBarItem/Autocast/styles.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const Autocast_styles_module = ({"container":"le5nvEPgn07LY6iFbKBj","scene":"zINXMGGJp1jwx61mFbL8"});
;// CONCATENATED MODULE: ./hud/components/AbilityBar/AbilityBarItem/Autocast/Autocast.tsx




const Autocast = (props) => {
    // $.Msg("REACT-RENDER: AbilityBarItem - Autocast rendered");
    const { ability } = props;
    const [show, setShow] = (0,react.useState)(false);
    useInterval(() => {
        setShow(Abilities.GetAutoCastState(ability) || Abilities.GetToggleState(ability));
    }, HUD_THINK_FAST);
    if (!show) {
        return null;
    }
    return (react.createElement(react.Fragment, null,
        react.createElement(Panel, { className: Autocast_styles_module.container },
            react.createElement(DOTAScenePanel, { map: 'scenes/hud/autocasting', className: Autocast_styles_module.scene }))));
};
/* harmony default export */ const Autocast_Autocast = (react.memo(Autocast));

;// CONCATENATED MODULE: ./hud/components/AbilityBar/AbilityBarItem/LockoutIcon/styles.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const LockoutIcon_styles_module = ({"container":"mY9ym19AaJOC8f609KGt","icon":"Sc_twaCf1xwfv1zKxXzH"});
;// CONCATENATED MODULE: ./hud/components/AbilityBar/AbilityBarItem/LockoutIcon/LockoutIcon.tsx




const LockoutIcon = (props) => {
    // $.Msg("REACT-RENDER: AbilityBarItem - LockoutIcon rendered");
    const { ability, selectedUnit } = props;
    const [showLock, setShowLock] = (0,react.useState)(false);
    useInterval(() => {
        const isStunned = Entities.IsStunned(selectedUnit);
        const isSilenced = Entities.IsSilenced(selectedUnit);
        const isCommandRestricted = Entities.IsCommandRestricted(selectedUnit);
        const isNightmared = Entities.IsNightmared(selectedUnit);
        const isHexed = Entities.IsHexed(selectedUnit);
        const cooldownRemaining = Abilities.GetCooldownTimeRemaining(ability);
        const showLock = cooldownRemaining === 0 && (isStunned || isSilenced || isCommandRestricted || isNightmared || isHexed);
        setShowLock(showLock);
    }, HUD_THINK_FAST);
    if (!showLock) {
        return null;
    }
    return (react.createElement(Panel, { className: LockoutIcon_styles_module.container, style: { backgroundColor: showLock ? 'rgba(0, 0, 0, 0.9)' : 'none' } },
        react.createElement(Panel, { className: LockoutIcon_styles_module.icon })));
};
/* harmony default export */ const LockoutIcon_LockoutIcon = (react.memo(LockoutIcon));

;// CONCATENATED MODULE: ./hud/components/AbilityBar/AbilityBarItem/Skillpoints/styles.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const Skillpoints_styles_module = ({"container":"E7cs4NspcK4thPlNOwA3","column":"h2uNxqwveomZyGGFJnhh","skillpoint":"aOzNv2IeO3mm8kk_hqcN"});
;// CONCATENATED MODULE: ./hud/components/AbilityBar/AbilityBarItem/Skillpoints/Skillpoints.tsx




const Skillpoints = (props) => {
    // $.Msg("REACT-RENDER: AbilityBarItem - Skillpoints rendered");
    const { ability, selectedUnit } = props;
    const [abilityLevel, setAbilityLevel] = (0,react.useState)(Abilities.GetLevel(ability));
    const [maxAbilityLevel, setMaxAbilityLevel] = (0,react.useState)(Abilities.GetMaxLevel(ability));
    const [isUpgradeable, setIsUpgradeable] = (0,react.useState)(false);
    useInterval(() => {
        setAbilityLevel(Abilities.GetLevel(ability));
        setMaxAbilityLevel(Abilities.GetMaxLevel(ability));
        setIsUpgradeable(Entities.GetAbilityPoints(selectedUnit) > 0 && Abilities.CanAbilityBeUpgraded(ability) === AbilityLearnResult_t.ABILITY_CAN_BE_UPGRADED);
    }, HUD_THINK_FAST);
    return (react.createElement(Panel, { className: Skillpoints_styles_module.container }, Array.from({ length: maxAbilityLevel }, (_, index) => index + 1).map(index => {
        return (react.createElement(Panel, { key: ability + '_level_' + index, className: Skillpoints_styles_module.column, style: { width: 100 / maxAbilityLevel + '%' } },
            react.createElement(Panel, { className: Skillpoints_styles_module.skillpoint, style: {
                    backgroundColor: abilityLevel >= index ? 'orange' : 'black',
                    boxShadow: (isUpgradeable && index === (abilityLevel + 1)) ? 'fill rgba(255, 174, 0, 0.6) 0px 0px 2px 1px' : 'fill rgba(0, 0, 0, 0.4) 0px 0px 2px 0.5px'
                } })));
    })));
};
/* harmony default export */ const Skillpoints_Skillpoints = (react.memo(Skillpoints));

;// CONCATENATED MODULE: ./hud/components/AbilityBar/AbilityBarItem/ManaCost/styles.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const ManaCost_styles_module = ({"container":"cE5VRAkdNXws4wWQVMzN","label":"BwPvxsoaN5yBRklllXTw"});
;// CONCATENATED MODULE: ./hud/components/AbilityBar/AbilityBarItem/ManaCost/ManaCost.tsx




const ManaCost = (props) => {
    // $.Msg("REACT-RENDER: AbilityBarItem - ManaCost rendered");
    const { ability } = props;
    const [manaCost, setManaCost] = (0,react.useState)(0);
    useInterval(() => {
        setManaCost(Abilities.GetManaCost(ability));
    }, HUD_THINK_FAST);
    if (manaCost === 0) {
        return null;
    }
    return (react.createElement(Panel, { className: ManaCost_styles_module.container },
        react.createElement(Label, { className: ManaCost_styles_module.label, text: manaCost })));
};
/* harmony default export */ const ManaCost_ManaCost = (react.memo(ManaCost));

;// CONCATENATED MODULE: ./hud/components/AbilityBar/AbilityBarItem/Keybind/styles.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const Keybind_styles_module = ({"container":"o6BWXPoVynJHcNaC2oNS","label":"OtI1xBcpFzwhU80hRoEr"});
;// CONCATENATED MODULE: ./hud/components/AbilityBar/AbilityBarItem/Keybind/Keybind.tsx




const Keybind = (props) => {
    // $.Msg("REACT-RENDER: AbilityBarItem - Keybind rendered");
    const { ability, selectedUnit } = props;
    const [keybind, setKeybind] = (0,react.useState)('');
    useInterval(() => {
        const isUpgradeable = Abilities.CanAbilityBeUpgraded(ability) === AbilityLearnResult_t.ABILITY_CAN_BE_UPGRADED;
        const isControllable = Entities.IsControllableByPlayer(selectedUnit, Players.GetLocalPlayer());
        const hasAbilityPoints = Entities.GetAbilityPoints(selectedUnit) > 0;
        const isInLearningMode = Game.IsInAbilityLearnMode();
        const isTrainable = isInLearningMode && isUpgradeable && isControllable && hasAbilityPoints;
        const isPassive = Abilities.IsPassive(ability);
        const hasKeybind = isControllable && (!isPassive || isTrainable);
        setKeybind(hasKeybind ? Abilities.GetKeybind(ability) : '');
    }, HUD_THINK_FAST);
    if (keybind === '') {
        return null;
    }
    return (react.createElement(Panel, { className: Keybind_styles_module.container },
        react.createElement(Label, { className: Keybind_styles_module.label, text: keybind })));
};
/* harmony default export */ const Keybind_Keybind = (react.memo(Keybind));

;// CONCATENATED MODULE: ./hud/components/AbilityBar/AbilityBarItem/Image/styles.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const AbilityBarItem_Image_styles_module = ({"container":"Y8Hhmimdsdqc9LSSGWso","image":"ee8z6nryPRdnswmuGAIG"});
;// CONCATENATED MODULE: ./hud/components/AbilityBar/AbilityBarItem/Image/Image.tsx




const getSaturation = (isTrainable, level, manaCost, unitMana) => {
    if (isTrainable) {
        return '1.0';
    }
    if (level === 0) {
        return '0.0';
    }
    if (manaCost > unitMana) {
        return '0.0';
    }
    return '1.0';
};
const getWashColor = (isTrainable, manaCost, unitMana, cooldownTimeRemaining, level) => {
    if (isTrainable) {
        return 'none';
    }
    if (manaCost > unitMana) {
        return '#1569be';
    }
    if (cooldownTimeRemaining > 0) {
        return 'rgba(0, 0, 0, 0.4)';
    }
    if (level === 0) {
        return '#303030';
    }
    return 'none';
};
const Image_Image_Image = (props) => {
    // $.Msg("REACT-RENDER: AbilityBarItem - AbilityImage rendered");
    const { ability, selectedUnit } = props;
    const [saturation, setSaturation] = (0,react.useState)('1.0');
    const [washColor, setWashColor] = (0,react.useState)('#303030');
    const [isActive, setIsActive] = (0,react.useState)(false);
    useInterval(() => {
        const level = Abilities.GetLevel(ability);
        const unitMana = Entities.GetMana(selectedUnit);
        const manaCost = Abilities.GetManaCost(ability);
        const cooldownRemaining = Abilities.GetCooldownTimeRemaining(ability);
        const isUpgradeable = Abilities.CanAbilityBeUpgraded(ability) === AbilityLearnResult_t.ABILITY_CAN_BE_UPGRADED;
        const isControllable = Entities.IsControllableByPlayer(selectedUnit, Players.GetLocalPlayer());
        const hasAbilityPoints = Entities.GetAbilityPoints(selectedUnit) > 0;
        const isInLearningMode = Game.IsInAbilityLearnMode();
        const isTrainable = isInLearningMode && isUpgradeable && isControllable && hasAbilityPoints;
        setSaturation(getSaturation(isTrainable, level, manaCost, unitMana));
        setWashColor(getWashColor(isTrainable, manaCost, unitMana, cooldownRemaining, level));
        setIsActive(Abilities.GetLocalPlayerActiveAbility() === ability);
    }, HUD_THINK_FAST);
    return (react.createElement(Panel, { className: AbilityBarItem_Image_styles_module.container, style: {
            border: isActive ? '1px solid rgba(200, 200, 200, 0.5)' : '0px solid rgba(0, 0, 0, 0.0)',
        } },
        react.createElement(DOTAAbilityImage, { scaling: 'stretch', className: AbilityBarItem_Image_styles_module.image, style: {
                washColor: washColor,
                saturation: saturation,
            }, contextEntityIndex: ability })));
};
/* harmony default export */ const AbilityBarItem_Image_Image = (react.memo(Image_Image_Image));

;// CONCATENATED MODULE: ./hud/components/AbilityBar/AbilityBarItem/LevelUpButton/styles.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const LevelUpButton_styles_module = ({"container":"I4glsd9fRBZCu1HZi0eo","particleScene":"mi4J7FSPRfBVM4vKgTpg","buttonBackground":"oikVCPKaJGf1dmWcWNpI","icon":"pyCWSL7_XthGZG37TpXu"});
;// CONCATENATED MODULE: ./hud/components/AbilityBar/AbilityBarItem/LevelUpButton/LevelUpButton.tsx




const LevelUpButton = (props) => {
    // $.Msg("REACT-RENDER: AbilityBarItem - LevelUpButton rendered");
    const { ability, selectedUnit } = props;
    const [isAbilityUpgradeable, setIsAbilityUpgradeable] = (0,react.useState)(false);
    useInterval(() => {
        const isUpgradeable = Abilities.CanAbilityBeUpgraded(ability) === AbilityLearnResult_t.ABILITY_CAN_BE_UPGRADED;
        const isControllable = Entities.IsControllableByPlayer(selectedUnit, Players.GetLocalPlayer());
        const hasAbilityPoints = Entities.GetAbilityPoints(selectedUnit) > 0;
        const isAbilityUpgradeable = isUpgradeable && isControllable && hasAbilityPoints;
        setIsAbilityUpgradeable(isAbilityUpgradeable);
    }, HUD_THINK_FAST);
    return (react.createElement(Panel, { className: LevelUpButton_styles_module.container }, isAbilityUpgradeable && (react.createElement(react.Fragment, null,
        react.createElement(DOTAScenePanel, { map: 'scenes/hud/levelupburst', className: LevelUpButton_styles_module.particleScene }),
        react.createElement(Panel, { onactivate: () => Abilities.AttemptToUpgrade(ability), className: LevelUpButton_styles_module.buttonBackground },
            react.createElement(Panel, { className: LevelUpButton_styles_module.icon }))))));
};
/* harmony default export */ const LevelUpButton_LevelUpButton = (react.memo(LevelUpButton));

;// CONCATENATED MODULE: ./hud/components/AbilityBar/AbilityBarItem/CastPointOverlay/styles.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const CastPointOverlay_styles_module = ({"container":"XRC7w8Fw6EtkYdqSlv_Q"});
;// CONCATENATED MODULE: ./hud/components/AbilityBar/AbilityBarItem/CastPointOverlay/CastPointOverlay.tsx




const CastPointOverlay = (props) => {
    // $.Msg("REACT-RENDER: AbilityBarItem - CastPointOveraly rendered");
    const { ability } = props;
    const [castPoint, setCastPoint] = (0,react.useState)(Math.max(0.1, Abilities.GetCastPoint(ability) - 0.1));
    const [isInAbilityPhase, setIsInAbilityPhase] = (0,react.useState)(Abilities.IsInAbilityPhase(ability));
    const [endTime, setEndTime] = (0,react.useState)(undefined);
    const [degree, setDegree] = (0,react.useState)(0);
    (0,react.useEffect)(() => {
        if (isInAbilityPhase) {
            setEndTime(Game.GetGameTime() + castPoint);
        }
        else {
            setEndTime(undefined);
        }
    }, [isInAbilityPhase, castPoint]);
    useInterval(() => {
        setCastPoint(Math.max(0.1, Abilities.GetCastPoint(ability) - 0.1));
        setIsInAbilityPhase(Abilities.IsInAbilityPhase(ability));
        if (endTime && castPoint) {
            const gameTimeDifference = endTime - Game.GetGameTime();
            const degree = -(360 - ((gameTimeDifference / castPoint) * 360));
            setDegree(degree ? Math.round(degree) : 0);
        }
        else {
            setDegree(0);
        }
    }, HUD_THINK_FAST);
    if (degree === 0) {
        return null;
    }
    return (react.createElement(Panel, { className: CastPointOverlay_styles_module.container, style: { clip: 'radial(50% 50%, 360deg, ' + degree + 'deg)' } }));
};
/* harmony default export */ const CastPointOverlay_CastPointOverlay = (react.memo(CastPointOverlay));

;// CONCATENATED MODULE: ./hud/components/AbilityBar/AbilityBarItem/styles.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const AbilityBarItem_styles_module = ({"container":"NM5Z4aYUM5x5qcGaQhow","background":"iQlOSrepOGz_n5xmDEmA","foreground":"lMUtFnoWvrEPWwwmYKCB"});
;// CONCATENATED MODULE: ./hud/components/AbilityBar/AbilityBarItem/AbilityBarItem.tsx













const onMouseOver = (ability, selectedUnit) => {
    $.DispatchEvent("DOTAShowAbilityTooltipForEntityIndex", $("#ability_" + ability), Abilities.GetAbilityName(ability), selectedUnit);
};
const onMouseOut = (ability) => {
    $.DispatchEvent("DOTAHideAbilityTooltip", $("#ability_" + ability));
};
const onLeftClick = (ability, selectedUnit) => {
    if (GameUI.IsAltDown()) {
        GameEvents.SendCustomGameEventToAllClients("on_ability_alerted", {
            broadcaster: Players.GetLocalPlayer(),
            selectedUnit,
            ability
        });
        return;
    }
    if (Game.IsInAbilityLearnMode()) {
        Abilities.AttemptToUpgrade(ability);
        return;
    }
    if (Entities.IsStunned(selectedUnit) || Entities.IsCommandRestricted(selectedUnit)) {
        Game.EmitSound("General.CastFail_Custom");
        return;
    }
    if (Entities.IsSilenced(selectedUnit)) {
        Game.EmitSound("General.CastFail_Silenced");
        return;
    }
    Abilities.ExecuteAbility(ability, selectedUnit, false);
};
const onRightClick = (ability) => {
    if (Game.IsInAbilityLearnMode()) {
        return;
    }
    if (Abilities.IsAutocast(ability)) {
        Game.PrepareUnitOrders({
            OrderType: dotaunitorder_t.DOTA_UNIT_ORDER_CAST_TOGGLE_AUTO,
            AbilityIndex: ability
        });
    }
};
const getContainerBackgroundImage = (isTrainable, isPassive) => {
    if (isTrainable) {
        return 'url("s2r://panorama/images/ability_gold_background_dark_png.vtex")';
    }
    if (isPassive) {
        return 'url("s2r://panorama/images/hud/passive_ability_border_png.vtex")';
    }
    return 'url("s2r://panorama/images/hud/active_ability_border_png.vtex")';
};
const AbilityBarItem = (props) => {
    // $.Msg("REACT-RENDER: AbilityBar - AbilityBarItem rendered");
    const { ability, selectedUnit } = props;
    const [isPassive, setIsPassive] = (0,react.useState)(Abilities.IsPassive(ability));
    const [isAutoCastEnabled, setIsAutoCastEnabled] = (0,react.useState)(Abilities.GetAutoCastState(ability));
    const [isToggled, setIsToggled] = (0,react.useState)(Abilities.GetToggleState(ability));
    const [isActive, setIsActive] = (0,react.useState)(Abilities.GetLocalPlayerActiveAbility() === ability);
    const [isTrainable, setIsTrainable] = (0,react.useState)(false);
    useInterval(() => {
        const isUpgradeable = Abilities.CanAbilityBeUpgraded(ability) === AbilityLearnResult_t.ABILITY_CAN_BE_UPGRADED;
        const isControllable = Entities.IsControllableByPlayer(selectedUnit, Players.GetLocalPlayer());
        const hasAbilityPoints = Entities.GetAbilityPoints(selectedUnit) > 0;
        const isInLearningMode = Game.IsInAbilityLearnMode();
        setIsTrainable(isInLearningMode && isUpgradeable && isControllable && hasAbilityPoints);
        setIsPassive(Abilities.IsPassive(ability));
        setIsAutoCastEnabled(Abilities.GetAutoCastState(ability));
        setIsToggled(Abilities.GetToggleState(ability));
        setIsActive(Abilities.GetLocalPlayerActiveAbility() === ability);
    }, HUD_THINK_FAST);
    return (react.createElement(Panel, { className: AbilityBarItem_styles_module.container, id: 'ability_' + ability },
        react.createElement(LevelUpButton_LevelUpButton, { ability: ability, selectedUnit: selectedUnit }),
        react.createElement(Panel, { onactivate: () => onLeftClick(ability, selectedUnit), oncontextmenu: () => onRightClick(ability), onmouseover: () => onMouseOver(ability, selectedUnit), onmouseout: () => onMouseOut(ability), className: AbilityBarItem_styles_module.background, style: {
                border: isTrainable ? '1px solid rgba(0, 0, 0, 0.8)' : '0px solid rgba(0, 0, 0, 0.0)',
                backgroundImage: getContainerBackgroundImage(isTrainable, isPassive),
            } },
            react.createElement(Keybind_Keybind, { ability: ability, selectedUnit: selectedUnit }),
            react.createElement(ManaCost_ManaCost, { ability: ability }),
            react.createElement(Panel, { className: AbilityBarItem_styles_module.foreground, style: {
                    margin: (isPassive && !isTrainable) ? '2px' : '4px',
                    padding: (isActive || isToggled || isAutoCastEnabled) ? '1px' : '0px',
                    backgroundColor: (isActive || isToggled || isAutoCastEnabled) ? 'rgba(255, 165, 50, 0.2)' : 'black',
                } },
                react.createElement(AbilityBarItem_Image_Image, { ability: ability, selectedUnit: selectedUnit }),
                react.createElement(Cooldown_Cooldown, { ability: ability }),
                react.createElement(Autocast_Autocast, { ability: ability }),
                react.createElement(LockoutIcon_LockoutIcon, { ability: ability, selectedUnit: selectedUnit }),
                react.createElement(CastPointOverlay_CastPointOverlay, { ability: ability }))),
        react.createElement(Skillpoints_Skillpoints, { ability: ability, selectedUnit: selectedUnit })));
};
/* harmony default export */ const AbilityBarItem_AbilityBarItem = (react.memo(AbilityBarItem));

;// CONCATENATED MODULE: ./hud/components/AbilityBar/styles.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const AbilityBar_styles_module = ({"container":"hF3ieIFirYwJ64ipI2PR"});
;// CONCATENATED MODULE: ./hud/components/AbilityBar/AbilityBar.tsx






const AbilityBar = (props) => {
    // $.Msg("REACT-RENDER: AbilityBar rendered");
    const { selectedUnit } = props;
    const [abilities, setAbilities] = (0,react.useState)([]);
    const [abilityPoints, setAbilityPoints] = (0,react.useState)(0);
    useInterval(() => {
        const abilityCount = Entities.GetAbilityCount(selectedUnit);
        if (abilityCount > 0) {
            const newAbilities = Array.from(Array(abilityCount).keys())
                .map(abilityNumber => Entities.GetAbility(selectedUnit, abilityNumber))
                .filter(index => index !== -1)
                .filter(index => Abilities.IsDisplayedAbility(index));
            if (!TableUtils.areTablesEqual(newAbilities, abilities)) {
                setAbilities(newAbilities);
            }
        }
        setAbilityPoints(Entities.GetAbilityPoints(selectedUnit));
    }, HUD_THINK_FAST);
    (0,react.useEffect)(() => {
        if (abilityPoints <= 0) {
            Game.EndAbilityLearnMode();
        }
    }, [abilityPoints]);
    return (react.createElement(Panel, { className: AbilityBar_styles_module.container }, abilities.map((ability) => (react.createElement(AbilityBarItem_AbilityBarItem, { key: ability, ability: ability, selectedUnit: selectedUnit })))));
};
/* harmony default export */ const AbilityBar_AbilityBar = (react.memo(AbilityBar));

;// CONCATENATED MODULE: ./hud/components/HealthBar/styles.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const HealthBar_styles_module = ({"container":"rV87EGQiWNRNHbG9vdNq","healthLabel":"C11fXGMWVtHFBK80TN8S","regenLabel":"Po_h580u26mGbnsfAeYn","scene":"eJFtzSbKz6BPT0EBp_pU"});
;// CONCATENATED MODULE: ./hud/components/HealthBar/HealthBar.tsx




const HealthBar = (props) => {
    // $.Msg("REACT-RENDER: HealthBar rendered");
    const { selectedUnit } = props;
    const [health, setHealth] = (0,react.useState)(Entities.GetHealth(selectedUnit));
    const [maxHealth, setMaxHealth] = (0,react.useState)(Entities.GetMaxHealth(selectedUnit));
    const [healthRegen, setHealthRegen] = (0,react.useState)(Entities.GetHealthThinkRegen(selectedUnit));
    useInterval(() => {
        setHealth(Entities.GetHealth(selectedUnit));
        setMaxHealth(Entities.GetMaxHealth(selectedUnit));
        // Hack because panorama API method for health regen is bugged
        const numberOfBuffs = Entities.GetNumBuffs(selectedUnit);
        for (let i = 0; i < numberOfBuffs; i++) {
            const buff = Entities.GetBuff(selectedUnit, i);
            const name = Buffs.GetName(selectedUnit, buff);
            if (name === 'modifier_ui_health_regen') {
                setHealthRegen(Buffs.GetStackCount(selectedUnit, buff) / 100);
            }
        }
    }, HUD_THINK_FAST);
    const isEnemy = Entities.IsEnemy(selectedUnit);
    return (react.createElement(Panel, { className: HealthBar_styles_module.container },
        react.createElement(ProgressBar, { min: 0, max: maxHealth, value: health, className: isEnemy ? 'healthProgressBarEnemy' : 'healthProgressBar', style: {
                width: "100%",
                height: "100%",
                borderRadius: "0px",
                horizontalAlign: "center",
            }, onactivate: () => {
                if (GameUI.IsAltDown()) {
                    GameEvents.SendCustomGameEventToAllClients("on_health_alerted", {
                        broadcaster: Players.GetLocalPlayer(),
                        selectedUnit,
                    });
                }
            } },
            react.createElement(DOTAScenePanel, { id: 'HealthBurner', className: `${HealthBar_styles_module.scene} + SceneLoaded`, style: {
                    width: (health / maxHealth) * 100 + "%",
                    washColor: isEnemy ? 'red' : 'none',
                }, map: 'scenes/hud/healthbarburner' })),
        react.createElement(Label, { className: HealthBar_styles_module.healthLabel, text: health + " / " + maxHealth }),
        react.createElement(Label, { className: HealthBar_styles_module.regenLabel, style: { color: isEnemy ? '#ff4433' : '#3ED038' }, text: '+ ' + healthRegen.toFixed(1) })));
};
/* harmony default export */ const HealthBar_HealthBar = (react.memo(HealthBar));

;// CONCATENATED MODULE: ./hud/components/ManaBar/styles.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const ManaBar_styles_module = ({"container":"lmSadXOv8dn4_iAErJ2E","scene":"TV6lAJTYNIb5hYQe8617","manaLabel":"IPrSE00jcHjUUl7qXYgs","regenLabel":"jvDXnYHe6hfhZY73oN4s"});
;// CONCATENATED MODULE: ./hud/components/ManaBar/ManaBar.tsx




const ManaBar = (props) => {
    // $.Msg("REACT-RENDER: ManaBar rendered");
    const { selectedUnit } = props;
    const [mana, setMana] = (0,react.useState)(Entities.GetMana(selectedUnit));
    const [maxMana, setMaxMana] = (0,react.useState)(Entities.GetMaxMana(selectedUnit));
    const [manaRegen, setManaRegen] = (0,react.useState)(Entities.GetManaThinkRegen(selectedUnit));
    useInterval(() => {
        setMana(Entities.GetMana(selectedUnit));
        setMaxMana(Entities.GetMaxMana(selectedUnit));
        setManaRegen(Entities.GetManaThinkRegen(selectedUnit));
    }, HUD_THINK_FAST);
    const width = (mana / maxMana) * 100;
    return (react.createElement(Panel, { hittest: false, className: ManaBar_styles_module.container, style: { visibility: maxMana > 0 ? 'visible' : 'collapse' } },
        react.createElement(ProgressBar, { min: 0, max: maxMana, value: mana, className: `manaProgressBar`, style: {
                width: "100%",
                height: "100%",
                borderRadius: "0px",
                horizontalAlign: "center",
            }, onactivate: () => {
                if (GameUI.IsAltDown()) {
                    GameEvents.SendCustomGameEventToAllClients("on_mana_alerted", {
                        broadcaster: Players.GetLocalPlayer(),
                        selectedUnit,
                    });
                }
            } },
            react.createElement(DOTAScenePanel, { className: ManaBar_styles_module.scene, style: { width: Number.isNaN(width) || !Number.isFinite(width) ? '100%' : width + "%" }, map: 'scenes/hud/healthbarburner' })),
        react.createElement(Label, { className: ManaBar_styles_module.manaLabel, text: mana + " / " + maxMana }),
        react.createElement(Label, { className: ManaBar_styles_module.regenLabel, text: '+ ' + manaRegen.toFixed(1) })));
};
/* harmony default export */ const ManaBar_ManaBar = (react.memo(ManaBar));

;// CONCATENATED MODULE: ./hud/components/Stats/Level/level.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const level_module = ({"levelBarContainer":"JXQyEf4ZmIVx54alsapk","levelBar":"BciUpAbogLA0n9b61wJb","levelPctLabel":"TAd15y9KOLziRLp0b0gg"});
;// CONCATENATED MODULE: ./hud/components/Stats/stats.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const stats_module = ({"container":"oC1j0mW0_9JGy6vDTaRi","image":"H6TAG5JpSntZ0naNF1nw","entry":"Gn4LgS5tAAgOJCBuE4FW","label":"vyfRuPA7ygACF45F2ZxX"});
;// CONCATENATED MODULE: ./hud/components/Stats/Level/Level.tsx





const Level = (props) => {
    // $.Msg("REACT-RENDER: Stats - Level rendered");
    const { selectedUnit } = props;
    const [level, setLevel] = (0,react.useState)(Entities.GetLevel(selectedUnit));
    const [percentage, setPercentage] = (0,react.useState)(0);
    useInterval(() => {
        if (Entities.IsHero(selectedUnit)) {
            const currentXp = Entities.GetCurrentXP(selectedUnit);
            const requiredXp = Entities.GetNeededXPToLevel(selectedUnit);
            const percentage = Math.floor(Math.max(0, Math.min(100, currentXp / requiredXp * 100)));
            setPercentage(Number.isNaN(percentage) ? 100 : percentage);
        }
        else {
            setPercentage(100);
        }
        setLevel(Entities.GetLevel(selectedUnit));
    }, HUD_THINK_MEDIUM);
    return (react.createElement(react.Fragment, null,
        react.createElement(Panel, { className: stats_module.entry },
            react.createElement(Label, { className: stats_module.label, text: 'Lvl. ' + level }),
            react.createElement(Panel, { className: level_module.levelBarContainer },
                react.createElement(Panel, { className: level_module.levelBar, style: { width: percentage + "%" } })),
            react.createElement(Label, { className: `${level_module.levelPctLabel} ${stats_module.label}`, text: Number.isFinite(percentage) ? percentage + "%" : '100%' }))));
};
/* harmony default export */ const Level_Level = (react.memo(Level));

;// CONCATENATED MODULE: ./hud/components/Stats/Armor/armor.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const armor_module = ({"image":"TTN9sjS3NetyVeFCTfVA"});
;// CONCATENATED MODULE: ./hud/components/Stats/Armor/Armor.tsx





const Armor = (props) => {
    // $.Msg("REACT-RENDER: Stats - Armor rendered");
    const { selectedUnit } = props;
    const [armor, setArmor] = (0,react.useState)(Entities.GetPhysicalArmorValue(selectedUnit));
    const [bonusArmor, setBonusArmor] = (0,react.useState)(Entities.GetBonusPhysicalArmor(selectedUnit));
    useInterval(() => {
        setArmor(Entities.GetPhysicalArmorValue(selectedUnit));
        setBonusArmor(Entities.GetBonusPhysicalArmor(selectedUnit));
    }, HUD_THINK_MEDIUM);
    return (react.createElement(Panel, { className: stats_module.entry },
        react.createElement(Panel, { className: `${armor_module.image} ${stats_module.image}` }),
        react.createElement(Label, { className: stats_module.label, text: (armor - bonusArmor).toFixed(1) }),
        bonusArmor !== 0 && (react.createElement(Label, { style: { color: bonusArmor > 0 ? 'rgba(0, 128, 0, 0.75)' : 'rgba(175, 0, 0, 0.75)' }, text: (bonusArmor > 0 ? "+" : " ") + "(" + bonusArmor.toFixed(1) + ")" }))));
};
/* harmony default export */ const Armor_Armor = (react.memo(Armor));

;// CONCATENATED MODULE: ./hud/components/Stats/Damage/damage.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const damage_module = ({"image":"mrn27cU6evosGA2fjLqF"});
;// CONCATENATED MODULE: ./hud/components/Stats/Damage/Damage.tsx





const Damage = (props) => {
    // $.Msg("REACT-RENDER: Stats - Damage rendered");
    const { selectedUnit } = props;
    const [minDamage, setMinDamage] = (0,react.useState)(Entities.GetDamageMin(selectedUnit));
    const [maxDamage, setMaxDamage] = (0,react.useState)(Entities.GetDamageMax(selectedUnit));
    const [bonusDamage, setBonusDamage] = (0,react.useState)(Entities.GetDamageBonus(selectedUnit));
    useInterval(() => {
        setMinDamage(Entities.GetDamageMin(selectedUnit));
        setMaxDamage(Entities.GetDamageMax(selectedUnit));
        setBonusDamage(Entities.GetDamageBonus(selectedUnit));
    }, HUD_THINK_MEDIUM);
    return (react.createElement(Panel, { className: stats_module.entry },
        react.createElement(Panel, { className: `${damage_module.image} ${stats_module.image}` }),
        react.createElement(Label, { className: stats_module.label, text: minDamage.toFixed(0) + "-" + maxDamage.toFixed(0) }),
        bonusDamage !== 0 && (react.createElement(Label, { style: { color: bonusDamage > 0 ? 'rgba(0, 128, 0, 0.75)' : 'rgba(175, 0, 0, 0.75)' }, text: (bonusDamage > 0 ? '+' : '') + "(" + bonusDamage.toFixed(0) + ")" }))));
};
/* harmony default export */ const Damage_Damage = (react.memo(Damage));

;// CONCATENATED MODULE: ./hud/components/Stats/MagicResistance/magicresistance.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const magicresistance_module = ({"image":"FYqremml3PHQsjFOLJIR"});
;// CONCATENATED MODULE: ./hud/components/Stats/MagicResistance/MagicResistance.tsx





const MagicResistance = (props) => {
    // $.Msg("REACT-RENDER: Stats - MagicalResistance rendered");
    const { selectedUnit } = props;
    const [magicResistance, setMagicResistance] = (0,react.useState)(Entities.GetMagicalArmorValue(selectedUnit));
    useInterval(() => {
        setMagicResistance(Entities.GetMagicalArmorValue(selectedUnit));
    }, HUD_THINK_MEDIUM);
    return (react.createElement(Panel, { className: stats_module.entry },
        react.createElement(Panel, { className: `${magicresistance_module.image} ${stats_module.image}` }),
        react.createElement(Label, { className: stats_module.label, text: (magicResistance * 100).toFixed(1) + "%" })));
};
/* harmony default export */ const MagicResistance_MagicResistance = (react.memo(MagicResistance));

;// CONCATENATED MODULE: ./hud/components/Stats/MoveSpeed/movespeed.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const movespeed_module = ({"image":"rx5gFLbNXGBFl2NHU1cX"});
;// CONCATENATED MODULE: ./hud/components/Stats/MoveSpeed/MoveSpeed.tsx





const MoveSpeed = (props) => {
    // $.Msg("REACT-RENDER: Stats - MoveSpeed rendered");
    const { selectedUnit } = props;
    const [moveSpeed, setMoveSpeed] = (0,react.useState)(Entities.GetMoveSpeedModifier(selectedUnit, Entities.GetBaseMoveSpeed(selectedUnit)));
    useInterval(() => {
        setMoveSpeed(Entities.GetMoveSpeedModifier(selectedUnit, Entities.GetBaseMoveSpeed(selectedUnit)));
    }, HUD_THINK_MEDIUM);
    return (react.createElement(Panel, { className: stats_module.entry },
        react.createElement(Panel, { className: `${movespeed_module.image} ${stats_module.image}` }),
        react.createElement(Label, { className: stats_module.label, text: moveSpeed.toFixed(0) })));
};
/* harmony default export */ const MoveSpeed_MoveSpeed = (react.memo(MoveSpeed));

;// CONCATENATED MODULE: ./hud/components/Stats/Stats.tsx







const Stats = (props) => {
    // $.Msg("REACT-RENDER: Stats rendered");
    const { selectedUnit } = props;
    return (react.createElement(Panel, { className: stats_module.container },
        react.createElement(Level_Level, { selectedUnit: selectedUnit }),
        react.createElement(Armor_Armor, { selectedUnit: selectedUnit }),
        react.createElement(MagicResistance_MagicResistance, { selectedUnit: selectedUnit }),
        react.createElement(Damage_Damage, { selectedUnit: selectedUnit }),
        react.createElement(MoveSpeed_MoveSpeed, { selectedUnit: selectedUnit })));
};
/* harmony default export */ const Stats_Stats = (react.memo(Stats));

;// CONCATENATED MODULE: ./hud/components/Character/Styles.tsx
const Styles = {
    InnerContainer: (visible) => ({
        horizontalAlign: "right",
        verticalAlign: "top",
        marginRight: "0px",
        marginTop: "150px",
        borderRadius: "5px",
        minWidth: "750px",
        minHeight: "550px",
        zIndex: 999,
        backgroundImage: "url('s2r://panorama/images/ability_bg.png')",
        backgroundSize: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.85)",
        flowChildren: "down",
        transition: "transform 0.55s ease-in-out 0.0s, opacity 0.55s ease-in-out 0.0s",
        transform: visible ? "translateX(-510px)" : 'translateX(0px)',
        opacity: visible ? "1.0" : "0.0",
    }),
    OuterContainer: () => ({
        width: '100%',
        height: '100%',
        transform: 'translateX(500px)',
    }),
    ColumnContainer: () => ({
        width: '100%',
        height: '100%', flowChildren: 'right'
    }),
    LeftColumn: () => ({
        width: '50%',
        height: '100%',
    }),
    RightColumn: () => ({
        width: '50%',
        height: '100%',
        flowChildren: 'down'
    }),
};

;// CONCATENATED MODULE: ./hud/components/Character/Model/Styles.ts
const Styles_Styles = {
    Container: () => ({
        height: "100%",
        width: "100%",
        marginRight: "5px",
        marginLeft: "10px",
        marginBottom: "10px",
        marginTop: "7.5px",
        borderRadius: "5px",
        backgroundImage: 'url("s2r://panorama/images/inventory_item_well.png")',
        backgroundSize: "100%",
    }),
    Label: () => ({
        color: "rgba(255, 165, 0, 0.9)",
        textAlign: "center",
        width: "100%",
        fontSize: "20px",
        paddingTop: "20px",
        fontWeight: "bold",
        textOverflow: "ellipsis",
    }),
    Screen: () => ({
        width: "100%",
        height: "100%",
        verticalAlign: "center",
        horizontalAlign: "center",
        zIndex: -10,
    }),
};

;// CONCATENATED MODULE: ./hud/components/Character/Model/Model.tsx


const Model = (props) => {
    // $.Msg("REACT-RENDER: Character - HeroModel rendered");
    const { selectedUnit } = props;
    (0,react.useEffect)(() => {
        const scenePanel = $('#modelPanelScene');
        if (Entities.IsHero(selectedUnit)) {
            const heroID = Game.GetPlayerInfo(Entities.GetPlayerOwnerID(selectedUnit)).player_selected_hero_id;
            scenePanel.SetScenePanelToLocalHero(heroID);
        }
        else {
            scenePanel.SetUnit(Entities.GetUnitName(selectedUnit), "", true);
        }
        scenePanel.SetPostProcessFade(100);
    }, [selectedUnit]);
    return (react.createElement(Panel, { style: Styles_Styles.Container() },
        react.createElement(Label, { style: Styles_Styles.Label(), text: $.Localize(Entities.GetUnitName(selectedUnit)).toUpperCase() }),
        react.createElement(DOTAScenePanel, { id: 'modelPanelScene', key: Entities.GetUnitName(selectedUnit), unit: Entities.GetUnitName(selectedUnit), style: Styles_Styles.Screen(), allowrotation: true })));
};
/* harmony default export */ const Model_Model = (react.memo(Model));

;// CONCATENATED MODULE: ./hud/components/Character/Divider/Styles.tsx
const Divider_Styles_Styles = {
    Divider: () => ({
        width: "80%",
        borderTop: "1px solid rgba(255, 165, 0, 0.1)",
        horizontalAlign: "center",
        marginTop: "15px",
    }),
};

;// CONCATENATED MODULE: ./hud/components/Character/Divider/Divider.tsx


const Divider_Divider_Divider = () => {
    // $.Msg("REACT-RENDER: Character - Divider rendered");
    return (react.createElement(Panel, { style: Divider_Styles_Styles.Divider() }));
};
/* harmony default export */ const Character_Divider_Divider = (react.memo(Divider_Divider_Divider));

;// CONCATENATED MODULE: ./hud/components/Character/Defense/Styles.ts
const Defense_Styles_Styles = {
    OuterContainer: () => ({
        width: "100%",
        height: "50%",
        flowChildren: "down",
        marginTop: "7.5px",
        marginRight: "7.5px",
        marginBottom: "7.5px",
        marginLeft: "5px",
        borderRadius: "5px",
        border: "1px solid rgba(0, 0, 0, 0.5)",
        backgroundImage: 'url("s2r://panorama/images/inventory_item_well.png")',
        backgroundSize: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.35)",
    }),
    Title: () => ({
        textAlign: "center",
        width: "100%",
        paddingTop: "15px",
        fontWeight: "bold",
        color: "rgba(255, 165, 0, 0.9)",
        fontSize: "20px",
    }),
    InnerContainer: () => ({
        width: "100%",
        flowChildren: "down",
        marginRight: "25px",
        marginLeft: "25px",
        marginBottom: "25px",
        marginTop: "15px",
        verticalAlign: "center",
    }),
    Row: () => ({
        width: "100%",
        flowChildren: "right",
    }),
    LeftColumn: () => ({
        width: "60%",
    }),
    RightColumn: () => ({
        width: "40%",
        flowChildren: 'right',
    }),
    ColumnLabel: () => ({
        color: "rgba(255, 255, 255, 0.65)",
        fontSize: "18px",
    }),
};

;// CONCATENATED MODULE: ./hud/components/Character/Defense/Armor/Armor.tsx




const Armor_Armor_Armor = (props) => {
    // $.Msg("REACT-RENDER: Character - Armor rendered");
    const { selectedUnit } = props;
    const [armor, setArmor] = (0,react.useState)(Entities.GetPhysicalArmorValue(selectedUnit));
    const [bonusArmor, setBonusArmor] = (0,react.useState)(Entities.GetBonusPhysicalArmor(selectedUnit));
    useInterval(() => {
        setArmor(Entities.GetPhysicalArmorValue(selectedUnit));
        setBonusArmor(Entities.GetBonusPhysicalArmor(selectedUnit));
    }, HUD_THINK_MEDIUM);
    return (react.createElement(Panel, { style: Defense_Styles_Styles.Row() },
        react.createElement(Panel, { style: Defense_Styles_Styles.LeftColumn() },
            react.createElement(Label, { text: 'Armor:', style: Defense_Styles_Styles.ColumnLabel() })),
        react.createElement(Panel, { style: Defense_Styles_Styles.RightColumn() },
            react.createElement(Label, { text: (armor - bonusArmor).toFixed(1), style: Defense_Styles_Styles.ColumnLabel() }),
            bonusArmor !== 0 && (react.createElement(Label, { text: (bonusArmor > 0 ? ' + ' : ' - ') + Math.abs(bonusArmor).toFixed(0), style: Object.assign(Object.assign({}, Defense_Styles_Styles.ColumnLabel()), { color: bonusArmor > 0 ? 'green' : 'red' }) })))));
};
/* harmony default export */ const Defense_Armor_Armor = (react.memo(Armor_Armor_Armor));

;// CONCATENATED MODULE: ./hud/components/Character/Defense/Evasion/Evasion.tsx




const Evasion = (props) => {
    // $.Msg("REACT-RENDER: Character - Evasion rendered");
    const { selectedUnit } = props;
    const [evasion, setEvasion] = (0,react.useState)(0);
    useInterval(() => {
        const numberOfBuffs = Entities.GetNumBuffs(selectedUnit);
        for (let i = 0; i < numberOfBuffs; i++) {
            const buff = Entities.GetBuff(selectedUnit, i);
            const name = Buffs.GetName(selectedUnit, buff);
            if (name === 'modifier_ui_evasion') {
                setEvasion(Buffs.GetStackCount(selectedUnit, buff));
            }
        }
    }, HUD_THINK_MEDIUM);
    return (react.createElement(Panel, { style: Defense_Styles_Styles.Row() },
        react.createElement(Panel, { style: Defense_Styles_Styles.LeftColumn() },
            react.createElement(Label, { text: 'Evasion:', style: Defense_Styles_Styles.ColumnLabel() })),
        react.createElement(Panel, { style: Defense_Styles_Styles.RightColumn() },
            react.createElement(Label, { text: (evasion > 0 ? (evasion / 100).toFixed(0) : 0) + ' %', style: Defense_Styles_Styles.ColumnLabel() }))));
};
/* harmony default export */ const Evasion_Evasion = (react.memo(Evasion));

;// CONCATENATED MODULE: ./hud/components/Character/Defense/HealthRegen/HealthRegen.tsx




const HealthRegen = (props) => {
    // $.Msg("REACT-RENDER: Character - HealthRegen rendered");
    const { selectedUnit } = props;
    const [regen, setRegen] = (0,react.useState)(0);
    const [baseRegen, setBaseRegen] = (0,react.useState)(0);
    useInterval(() => {
        const numberOfBuffs = Entities.GetNumBuffs(selectedUnit);
        for (let i = 0; i < numberOfBuffs; i++) {
            const buff = Entities.GetBuff(selectedUnit, i);
            const name = Buffs.GetName(selectedUnit, buff);
            if (name === 'modifier_ui_health_regen') {
                setRegen(Buffs.GetStackCount(selectedUnit, buff) / 100);
            }
            if (name === 'modifier_ui_base_health_regen') {
                setBaseRegen(Buffs.GetStackCount(selectedUnit, buff) / 100);
            }
        }
    }, HUD_THINK_MEDIUM);
    const increasedRegen = regen - baseRegen;
    return (react.createElement(Panel, { style: Defense_Styles_Styles.Row() },
        react.createElement(Panel, { style: Defense_Styles_Styles.LeftColumn() },
            react.createElement(Label, { text: 'Health Regeneration:', style: Defense_Styles_Styles.ColumnLabel() })),
        react.createElement(Panel, { style: Defense_Styles_Styles.RightColumn() },
            react.createElement(Label, { text: baseRegen.toFixed(2), style: Defense_Styles_Styles.ColumnLabel() }),
            increasedRegen !== 0 && (react.createElement(Label, { text: (increasedRegen > 0 ? ' + ' : ' - ') + Math.abs(increasedRegen).toFixed(2), style: Object.assign(Object.assign({}, Defense_Styles_Styles.ColumnLabel()), { color: increasedRegen > 0 ? 'green' : 'red' }) })))));
};
/* harmony default export */ const HealthRegen_HealthRegen = (react.memo(HealthRegen));

;// CONCATENATED MODULE: ./hud/components/Character/Defense/MagicalResistance/MagicalResistance.tsx




const MagicalResistance = (props) => {
    // $.Msg("REACT-RENDER: Character - MagicalResistance rendered");
    const { selectedUnit } = props;
    const [resistance, setResistance] = (0,react.useState)(Entities.GetArmorReductionForDamageType(selectedUnit, DAMAGE_TYPES.DAMAGE_TYPE_MAGICAL));
    useInterval(() => {
        setResistance(Entities.GetArmorReductionForDamageType(selectedUnit, DAMAGE_TYPES.DAMAGE_TYPE_MAGICAL));
    }, HUD_THINK_MEDIUM);
    return (react.createElement(Panel, { style: Defense_Styles_Styles.Row() },
        react.createElement(Panel, { style: Defense_Styles_Styles.LeftColumn() },
            react.createElement(Label, { text: 'Magical Resistance:', style: Defense_Styles_Styles.ColumnLabel() })),
        react.createElement(Panel, { style: Defense_Styles_Styles.RightColumn() },
            react.createElement(Label, { text: (resistance * 100).toFixed(2) + " %", style: Defense_Styles_Styles.ColumnLabel() }))));
};
/* harmony default export */ const MagicalResistance_MagicalResistance = (react.memo(MagicalResistance));

;// CONCATENATED MODULE: ./hud/components/Character/Defense/PyshicalResistance/PyshicalResistance.tsx




const PyshicalResistance = (props) => {
    // $.Msg("REACT-RENDER: Character - PhysicalResistance rendered");
    const { selectedUnit } = props;
    const [resistance, setResistance] = (0,react.useState)(Entities.GetArmorReductionForDamageType(selectedUnit, DAMAGE_TYPES.DAMAGE_TYPE_PHYSICAL));
    useInterval(() => {
        setResistance(Entities.GetArmorReductionForDamageType(selectedUnit, DAMAGE_TYPES.DAMAGE_TYPE_PHYSICAL));
    }, HUD_THINK_MEDIUM);
    return (react.createElement(Panel, { style: Defense_Styles_Styles.Row() },
        react.createElement(Panel, { style: Defense_Styles_Styles.LeftColumn() },
            react.createElement(Label, { text: 'Pyshical Resistance:', style: Defense_Styles_Styles.ColumnLabel() })),
        react.createElement(Panel, { style: Defense_Styles_Styles.RightColumn() },
            react.createElement(Label, { text: (resistance * 100).toFixed(2) + " %", style: Defense_Styles_Styles.ColumnLabel() }))));
};
/* harmony default export */ const PyshicalResistance_PyshicalResistance = (react.memo(PyshicalResistance));

;// CONCATENATED MODULE: ./hud/components/Character/Defense/StatusResistance/StatusResistance.tsx




const StatusResistance = (props) => {
    // $.Msg("REACT-RENDER: Character - StatusResistance rendered");
    const { selectedUnit } = props;
    const [resistance, setResistance] = (0,react.useState)(0);
    useInterval(() => {
        const numberOfBuffs = Entities.GetNumBuffs(selectedUnit);
        for (let i = 0; i < numberOfBuffs; i++) {
            const buff = Entities.GetBuff(selectedUnit, i);
            const name = Buffs.GetName(selectedUnit, buff);
            if (name === 'modifier_ui_status_resistance') {
                setResistance(Buffs.GetStackCount(selectedUnit, buff));
            }
        }
    }, HUD_THINK_MEDIUM);
    return (react.createElement(Panel, { style: Defense_Styles_Styles.Row() },
        react.createElement(Panel, { style: Defense_Styles_Styles.LeftColumn() },
            react.createElement(Label, { text: 'Pyshical Resistance:', style: Defense_Styles_Styles.ColumnLabel() })),
        react.createElement(Panel, { style: Defense_Styles_Styles.RightColumn() },
            react.createElement(Label, { text: (resistance !== 0 ? (resistance / 100).toFixed(2) : 0) + ' %', style: Defense_Styles_Styles.ColumnLabel() }))));
};
/* harmony default export */ const StatusResistance_StatusResistance = (react.memo(StatusResistance));

;// CONCATENATED MODULE: ./hud/components/Character/Defense/Defense.tsx









const Defense = (props) => {
    // $.Msg("REACT-RENDER: Character - Defense rendered");
    const { selectedUnit } = props;
    return (react.createElement(Panel, { style: Defense_Styles_Styles.OuterContainer() },
        react.createElement(Label, { text: 'DEFENSE', style: Defense_Styles_Styles.Title() }),
        react.createElement(Character_Divider_Divider, null),
        react.createElement(Panel, { style: Defense_Styles_Styles.InnerContainer() },
            react.createElement(Defense_Armor_Armor, { selectedUnit: selectedUnit }),
            react.createElement(PyshicalResistance_PyshicalResistance, { selectedUnit: selectedUnit }),
            react.createElement(MagicalResistance_MagicalResistance, { selectedUnit: selectedUnit }),
            react.createElement(StatusResistance_StatusResistance, { selectedUnit: selectedUnit }),
            react.createElement(Evasion_Evasion, { selectedUnit: selectedUnit }),
            react.createElement(HealthRegen_HealthRegen, { selectedUnit: selectedUnit }))));
};
/* harmony default export */ const Defense_Defense = (react.memo(Defense));

;// CONCATENATED MODULE: ./hud/components/Character/Title/Styles.tsx
const Title_Styles_Styles = {
    Container: () => ({
        width: "100%",
        backgroundColor: "rgba(30, 30, 30, 0.525)",
    }),
    Label: () => ({
        color: "rgba(200, 200, 200, 0.45)",
        fontSize: "15px",
        verticalAlign: "center",
        horizontalAlign: "left",
        fontWeight: "light",
        letterSpacing: "1.5px",
        paddingTop: "2.5px",
        paddingLeft: "10px",
    }),
    CloseBtn: (isHovering) => ({
        verticalAlign: "center",
        horizontalAlign: "right",
        height: "24px",
        width: "24px",
        padding: "2px",
        marginRight: "2.5px",
        opacity: "0.75",
        transition: "transform 0.5s ease-in-out 0.0s, background-color 0.5s ease-in-out 0.0s",
        backgroundColor: isHovering ? 'rgba(60, 60, 60, 1.0)' : 'rgba(0, 0, 0, 0.0)',
        border: isHovering ? "1px solid rgba(70, 70, 70, 1.0)" : '0px solid rgba(0, 0, 0, 1.0)',
        washColor: isHovering ? " rgba(100, 100, 100, 0.25)" : "rgba(100, 100, 100, 0.5)",
        transform: isHovering ? "scale3d(1.2, 1.2, 0)" : "scale3d(1.0, 1.0, 0)",
    }),
};

;// CONCATENATED MODULE: ./hud/components/Character/Title/Title.tsx




const Title_Title_mapDispatchToProps = (dispatch) => ({
    setCharacterVisible: (visible) => dispatch(setCharacterVisible(visible)),
});
const Title_Title_connector = connect(null, Title_Title_mapDispatchToProps);
const Title_Title_Title = (props) => {
    // $.Msg("REACT-RENDER: Character - Title rendered");
    const { selectedUnit, setCharacterVisible } = props;
    const [isHovering, setIsHovering] = (0,react.useState)(false);
    return (react.createElement(Panel, { style: Title_Styles_Styles.Container() },
        react.createElement(Label, { style: Title_Styles_Styles.Label(), text: "CHARACTER - " + $.Localize(Entities.GetUnitName(selectedUnit)).toUpperCase() }),
        react.createElement(Button, { onmouseover: () => setIsHovering(true), onmouseout: () => setIsHovering(false), style: Title_Styles_Styles.CloseBtn(isHovering), onactivate: () => {
                setCharacterVisible(false);
                Game.EmitSound("ui_topmenu_select");
            } },
            react.createElement(Image, { src: "s2r://panorama/images/close_btn_white_png.vtex" }))));
};
/* harmony default export */ const Character_Title_Title = (react.memo(Title_Title_connector(Title_Title_Title)));

;// CONCATENATED MODULE: ./hud/components/Character/Level/Styles.ts
const Level_Styles_Styles = {
    Container: () => ({
        horizontalAlign: "right",
        marginRight: "20px",
        marginTop: "20px",
        flowChildren: "down",
    }),
    LevelLabel: () => ({
        width: "100%",
        textAlign: "center",
        marginTop: "5px",
        fontSize: "16px",
        fontWeight: "bold",
    }),
    CircleContainer: () => ({
        width: "48px",
        height: "48px",
    }),
    CircleBackground: () => ({
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        border: "2px solid rgba(225, 225, 255, 0.1)",
        zIndex: 40,
        backgroundColor: "rgba(25, 25, 25, 0.75)",
    }),
    CircleForeground: (degree) => ({
        width: "100%",
        height: "100%",
        horizontalAlign: "center",
        verticalAlign: "center",
        borderRadius: "50%",
        border: "1.5px solid #E7D291",
        zIndex: 50,
        transition: "clip 0.5s ease-in-out 0.0s",
        clip: 'radial(50% 50%, 0.0deg, ' + degree + 'deg)'
    }),
    CircleLevelLabel: () => ({
        fontSize: "18px",
        color: "rgba(255, 255, 255, 0.65)",
        marginTop: "0.25px",
        verticalAlign: "middle",
        horizontalAlign: "center",
        zIndex: 60,
    }),
};

;// CONCATENATED MODULE: ./hud/components/Character/Level/Level.tsx




const Level_Level_Level = (props) => {
    // $.Msg("REACT-RENDER: Character - Level rendered");
    const { selectedUnit } = props;
    const [level, setLevel] = (0,react.useState)(Entities.GetLevel(selectedUnit));
    const [degree, setDegree] = (0,react.useState)(0);
    useInterval(() => {
        if (Entities.IsHero(selectedUnit)) {
            const currentXp = Entities.GetCurrentXP(selectedUnit);
            const requiredXp = Entities.GetNeededXPToLevel(selectedUnit);
            const degree = Math.floor(Math.max(0, Math.min(360, currentXp / requiredXp * 360)));
            setDegree(Number.isNaN(degree) ? 360 : degree);
        }
        else {
            setDegree(360);
        }
        setLevel(Entities.GetLevel(selectedUnit));
    }, HUD_THINK_MEDIUM);
    return (react.createElement(Panel, { style: Level_Styles_Styles.Container() },
        react.createElement(Panel, { style: Level_Styles_Styles.CircleContainer() },
            react.createElement(Panel, { style: Level_Styles_Styles.CircleBackground() }),
            react.createElement(Panel, { className: 'EmptyCircle', style: Level_Styles_Styles.CircleForeground(degree) }),
            react.createElement(Label, { style: Level_Styles_Styles.CircleLevelLabel(), text: level })),
        react.createElement(Label, { style: Level_Styles_Styles.LevelLabel(), text: 'level' })));
};
/* harmony default export */ const Character_Level_Level = (react.memo(Level_Level_Level));

;// CONCATENATED MODULE: ./hud/components/Character/Avatar/Styles.tsx
const Avatar_Styles_Styles = {
    Container: () => ({
        width: "100%",
        verticalAlign: "bottom",
        flowChildren: "right",
        paddingLeft: "30px",
        paddingRight: "30px",
        paddingBottom: "15px",
    }),
    Image: () => ({
        width: '64px',
        height: '64px',
        border: '1px solid rgba(0, 0, 0, 0.5)',
        borderRadius: '5px 0px 0px 5px',
        backgroundColor: 'black',
    }),
    LabelContainer: () => ({
        width: "100%",
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: '0px 5px 5px 0px',
    }),
    Label: () => ({
        verticalAlign: 'center',
        horizontalAlign: 'center',
    }),
};

;// CONCATENATED MODULE: ./hud/components/Character/Avatar/Avatar.tsx


const Avatar = (props) => {
    // $.Msg("REACT-RENDER: Character - Avatar rendered");
    const { selectedUnit } = props;
    const [steamId, setSteamId] = (0,react.useState)(undefined);
    (0,react.useEffect)(() => {
        const isHero = Entities.IsHero(selectedUnit);
        const playerId = Entities.GetPlayerOwnerID(selectedUnit);
        const isValidPlayerId = Players.IsValidPlayerID(playerId);
        if (isHero && isValidPlayerId) {
            setSteamId(Game.GetPlayerInfo(playerId).player_steamid);
        }
        else {
            setSteamId(undefined);
        }
    }, [selectedUnit]);
    if (steamId === undefined) {
        return null;
    }
    return (react.createElement(Panel, { style: Avatar_Styles_Styles.Container() },
        react.createElement(DOTAAvatarImage, { steamid: steamId, style: Avatar_Styles_Styles.Image() }),
        react.createElement(Panel, { style: Avatar_Styles_Styles.LabelContainer() },
            react.createElement(DOTAUserName, { steamid: steamId, style: Avatar_Styles_Styles.Label() }))));
};
/* harmony default export */ const Avatar_Avatar = (react.memo(Avatar));

;// CONCATENATED MODULE: ./hud/components/Character/Attack/Styles.ts
const Attack_Styles_Styles = {
    OuterContainer: () => ({
        width: "100%",
        height: "50%",
        flowChildren: "down",
        marginTop: "7.5px",
        marginRight: "7.5px",
        marginBottom: "7.5px",
        marginLeft: "5px",
        borderRadius: "5px",
        border: "1px solid rgba(0, 0, 0, 0.5)",
        backgroundImage: 'url("s2r://panorama/images/inventory_item_well.png")',
        backgroundSize: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.35)",
    }),
    Title: () => ({
        textAlign: "center",
        width: "100%",
        paddingTop: "15px",
        fontWeight: "bold",
        color: "rgba(255, 165, 0, 0.9)",
        fontSize: "20px",
    }),
    InnerContainer: () => ({
        width: "100%",
        flowChildren: "down",
        marginRight: "25px",
        marginLeft: "25px",
        marginBottom: "25px",
        marginTop: "15px",
        verticalAlign: "center",
    }),
    Row: () => ({
        width: "100%",
        flowChildren: "right",
    }),
    LeftColumn: () => ({
        width: "60%",
    }),
    RightColumn: () => ({
        width: "40%",
        flowChildren: 'right',
    }),
    ColumnLabel: () => ({
        color: "rgba(255, 255, 255, 0.65)",
        fontSize: "18px",
    }),
};

;// CONCATENATED MODULE: ./hud/components/Character/Attack/Damage/Damage.tsx




const Damage_Damage_Damage = (props) => {
    // $.Msg("REACT-RENDER: Character - Damage rendered");
    const { selectedUnit } = props;
    const [minDamage, setMinDamage] = (0,react.useState)(Entities.GetDamageMin(selectedUnit));
    const [maxDamage, setMaxDamage] = (0,react.useState)(Entities.GetDamageMax(selectedUnit));
    const [bonusDamage, setBonusDamage] = (0,react.useState)(Entities.GetDamageBonus(selectedUnit));
    useInterval(() => {
        setMinDamage(Entities.GetDamageMin(selectedUnit));
        setMaxDamage(Entities.GetDamageMax(selectedUnit));
        setBonusDamage(Entities.GetDamageBonus(selectedUnit));
    }, HUD_THINK_MEDIUM);
    return (react.createElement(Panel, { style: Attack_Styles_Styles.Row() },
        react.createElement(Panel, { style: Attack_Styles_Styles.LeftColumn() },
            react.createElement(Label, { text: 'Damage:', style: Attack_Styles_Styles.ColumnLabel() })),
        react.createElement(Panel, { style: Attack_Styles_Styles.RightColumn() },
            react.createElement(Label, { text: minDamage.toFixed(0) + " - " + maxDamage.toFixed(0), style: Attack_Styles_Styles.ColumnLabel() }),
            bonusDamage !== 0 && (react.createElement(Label, { text: (bonusDamage > 0 ? ' + ' : ' - ') + Math.abs(bonusDamage), style: Object.assign(Object.assign({}, Attack_Styles_Styles.ColumnLabel()), { color: bonusDamage > 0 ? 'green' : 'red' }) })))));
};
/* harmony default export */ const Attack_Damage_Damage = (react.memo(Damage_Damage_Damage));

;// CONCATENATED MODULE: ./hud/components/Character/Attack/AttackSpeed/AttackSpeed.tsx




const AttackSpeed = (props) => {
    // $.Msg("REACT-RENDER: Character - AttackSpeed rendered");
    const { selectedUnit } = props;
    const [attackSpeed, setAttackSpeed] = (0,react.useState)(Entities.GetAttackSpeed(selectedUnit));
    const [secondsPerAttack, setSecondsPerAttack] = (0,react.useState)(Entities.GetSecondsPerAttack(selectedUnit));
    useInterval(() => {
        setAttackSpeed(Entities.GetAttackSpeed(selectedUnit));
        setSecondsPerAttack(Entities.GetSecondsPerAttack(selectedUnit));
    }, HUD_THINK_MEDIUM);
    return (react.createElement(Panel, { style: Attack_Styles_Styles.Row() },
        react.createElement(Panel, { style: Attack_Styles_Styles.LeftColumn() },
            react.createElement(Label, { text: 'Attack Speed:', style: Attack_Styles_Styles.ColumnLabel() })),
        react.createElement(Panel, { style: Attack_Styles_Styles.RightColumn() },
            react.createElement(Label, { text: (attackSpeed * 100).toFixed(0) + " (" + (secondsPerAttack).toFixed(2) + 's)', style: Attack_Styles_Styles.ColumnLabel() }))));
};
/* harmony default export */ const AttackSpeed_AttackSpeed = (react.memo(AttackSpeed));

;// CONCATENATED MODULE: ./hud/components/Character/Attack/AttackRange/AttackRange.tsx




const AttackRange = (props) => {
    // $.Msg("REACT-RENDER: Character - AttackRange rendered");
    const { selectedUnit } = props;
    const [attackRange, setAttackRange] = (0,react.useState)(Entities.GetAttackRange(selectedUnit));
    useInterval(() => {
        setAttackRange(Entities.GetAttackRange(selectedUnit));
    }, HUD_THINK_MEDIUM);
    return (react.createElement(Panel, { style: Attack_Styles_Styles.Row() },
        react.createElement(Panel, { style: Attack_Styles_Styles.LeftColumn() },
            react.createElement(Label, { text: 'Attack Range:', style: Attack_Styles_Styles.ColumnLabel() })),
        react.createElement(Panel, { style: Attack_Styles_Styles.RightColumn() },
            react.createElement(Label, { text: attackRange.toFixed(0), style: Attack_Styles_Styles.ColumnLabel() }))));
};
/* harmony default export */ const AttackRange_AttackRange = (react.memo(AttackRange));

;// CONCATENATED MODULE: ./hud/components/Character/Attack/MoveSpeed/MoveSpeed.tsx




const MoveSpeed_MoveSpeed_MoveSpeed = (props) => {
    // $.Msg("REACT-RENDER: Character - MoveSpeed rendered");
    const { selectedUnit } = props;
    const [baseMoveSpeed, setBaseMoveSpeed] = (0,react.useState)(Entities.GetBaseMoveSpeed(selectedUnit));
    const [totalMoveSpeed, setTotalMoveSpeed] = (0,react.useState)(Entities.GetMoveSpeedModifier(selectedUnit, Entities.GetBaseMoveSpeed(selectedUnit)));
    useInterval(() => {
        const baseMoveSpeed = Entities.GetBaseMoveSpeed(selectedUnit);
        setBaseMoveSpeed(baseMoveSpeed);
        setTotalMoveSpeed(Entities.GetMoveSpeedModifier(selectedUnit, baseMoveSpeed));
    }, HUD_THINK_MEDIUM);
    const increasedMoveSpeed = totalMoveSpeed - baseMoveSpeed;
    return (react.createElement(Panel, { style: Attack_Styles_Styles.Row() },
        react.createElement(Panel, { style: Attack_Styles_Styles.LeftColumn() },
            react.createElement(Label, { text: 'Movement Speed:', style: Attack_Styles_Styles.ColumnLabel() })),
        react.createElement(Panel, { style: Attack_Styles_Styles.RightColumn() },
            react.createElement(Label, { text: baseMoveSpeed.toFixed(0), style: Attack_Styles_Styles.ColumnLabel() }),
            increasedMoveSpeed !== 0 && (react.createElement(Label, { text: (increasedMoveSpeed > 0 ? ' + ' : ' - ') + Math.abs(increasedMoveSpeed).toFixed(0), style: Object.assign(Object.assign({}, Attack_Styles_Styles.ColumnLabel()), { color: increasedMoveSpeed > 0 ? 'green' : 'red' }) })))));
};
/* harmony default export */ const Attack_MoveSpeed_MoveSpeed = (react.memo(MoveSpeed_MoveSpeed_MoveSpeed));

;// CONCATENATED MODULE: ./hud/components/Character/Attack/ManaRegen/ManaRegen.tsx




const ManaRegen = (props) => {
    // $.Msg("REACT-RENDER: Character - ManaRegen rendered");
    const { selectedUnit } = props;
    const [manaRegen, setManaRegen] = (0,react.useState)(Entities.GetManaThinkRegen(selectedUnit));
    useInterval(() => {
        setManaRegen(Entities.GetManaThinkRegen(selectedUnit));
    }, HUD_THINK_MEDIUM);
    return (react.createElement(Panel, { style: Attack_Styles_Styles.Row() },
        react.createElement(Panel, { style: Attack_Styles_Styles.LeftColumn() },
            react.createElement(Label, { text: 'Mana Regeneration:', style: Attack_Styles_Styles.ColumnLabel() })),
        react.createElement(Panel, { style: Attack_Styles_Styles.RightColumn() },
            react.createElement(Label, { text: manaRegen.toFixed(2), style: Attack_Styles_Styles.ColumnLabel() }))));
};
/* harmony default export */ const ManaRegen_ManaRegen = (react.memo(ManaRegen));

;// CONCATENATED MODULE: ./hud/components/Character/Attack/SpellAmplification/SpellAmplification.tsx




const SpellAmplification = (props) => {
    // $.Msg("REACT-RENDER: Character - SpellAmplification rendered");
    const { selectedUnit } = props;
    const [spellAmp, setSpellAmp] = (0,react.useState)(Entities.GetAttackRange(selectedUnit));
    useInterval(() => {
        const numberOfBuffs = Entities.GetNumBuffs(selectedUnit);
        for (let i = 0; i < numberOfBuffs; i++) {
            const buff = Entities.GetBuff(selectedUnit, i);
            const name = Buffs.GetName(selectedUnit, buff);
            if (name === 'modifier_ui_spell_amp') {
                setSpellAmp(Buffs.GetStackCount(selectedUnit, buff) / 100);
            }
        }
    }, HUD_THINK_MEDIUM);
    return (react.createElement(Panel, { style: Attack_Styles_Styles.Row() },
        react.createElement(Panel, { style: Attack_Styles_Styles.LeftColumn() },
            react.createElement(Label, { text: 'Spell Amplification:', style: Attack_Styles_Styles.ColumnLabel() })),
        react.createElement(Panel, { style: Attack_Styles_Styles.RightColumn() },
            react.createElement(Label, { text: spellAmp + ' %', style: Attack_Styles_Styles.ColumnLabel() }))));
};
/* harmony default export */ const SpellAmplification_SpellAmplification = (react.memo(SpellAmplification));

;// CONCATENATED MODULE: ./hud/components/Character/Attack/Attack.tsx









const Attack = (props) => {
    // $.Msg("REACT-RENDER: Character - Attack rendered");
    const { selectedUnit } = props;
    return (react.createElement(Panel, { style: Attack_Styles_Styles.OuterContainer() },
        react.createElement(Label, { text: 'ATTACK', style: Attack_Styles_Styles.Title() }),
        react.createElement(Character_Divider_Divider, null),
        react.createElement(Panel, { style: Attack_Styles_Styles.InnerContainer() },
            react.createElement(AttackSpeed_AttackSpeed, { selectedUnit: selectedUnit }),
            react.createElement(Attack_Damage_Damage, { selectedUnit: selectedUnit }),
            react.createElement(AttackRange_AttackRange, { selectedUnit: selectedUnit }),
            react.createElement(Attack_MoveSpeed_MoveSpeed, { selectedUnit: selectedUnit }),
            react.createElement(SpellAmplification_SpellAmplification, { selectedUnit: selectedUnit }),
            react.createElement(ManaRegen_ManaRegen, { selectedUnit: selectedUnit }))));
};
/* harmony default export */ const Attack_Attack = (react.memo(Attack));

;// CONCATENATED MODULE: ./hud/components/Character/Character.tsx













const Character_mapStateToProps = (state) => ({
    visible: state.characterReducer.visible,
});
const Character_mapDispatchToProps = (dispatch) => ({
    setCharacterVisible: (visible) => dispatch(setCharacterVisible(visible)),
});
const Character_connector = connect(Character_mapStateToProps, Character_mapDispatchToProps);
const Character = (props) => {
    // $.Msg("REACT-RENDER: Character rendered");
    const { selectedUnit, visible, setCharacterVisible } = props;
    const [renderComponent, setRenderComponent] = (0,react.useState)(false);
    useTimeout(() => {
        setRenderComponent(visible);
    }, visible === false ? HUD_THINK_SLOW : 0);
    i('Cancelled', () => {
        if (visible) {
            Game.EmitSound("ui_topmenu_select");
        }
        setCharacterVisible(false);
    }, [visible, setCharacterVisible]);
    return (react.createElement(Panel, { hittest: false, style: Styles.OuterContainer() }, renderComponent && (react.createElement(react.Fragment, null,
        react.createElement(Panel, { style: Styles.InnerContainer(visible) },
            react.createElement(Character_Title_Title, { selectedUnit: selectedUnit }),
            react.createElement(Panel, { style: Styles.ColumnContainer() },
                react.createElement(Panel, { style: Styles.LeftColumn() },
                    react.createElement(Model_Model, { selectedUnit: selectedUnit }),
                    react.createElement(Character_Level_Level, { selectedUnit: selectedUnit }),
                    react.createElement(Avatar_Avatar, { selectedUnit: selectedUnit })),
                react.createElement(Panel, { style: Styles.RightColumn() },
                    react.createElement(Attack_Attack, { selectedUnit: selectedUnit }),
                    react.createElement(Defense_Defense, { selectedUnit: selectedUnit }))))))));
};
/* harmony default export */ const Character_Character = (react.memo(Character_connector(Character)));

;// CONCATENATED MODULE: ./hud/data/auras.tsx
const aura_modifiers = [
    "modifier_item_pipe_aura",
    "modifier_item_assault_negative_armor",
    "modifier_item_assault_positive",
    "modifier_item_radiance_debuff",
    "modifier_shredder_reactive_armor",
    "modifier_item_buckler_effect",
    "modifier_item_moon_shard_consumed",
    "modifier_item_headdress_aura",
    "modifier_item_mekansm_aura",
    "modifier_crystal_maiden_brilliance_aura_effect",
    "modifier_item_shivas_guard_aura",
];

;// CONCATENATED MODULE: ./hud/components/Modifiers/Modifier/styles.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const Modifier_styles_module = ({"container":"hP53l9q7lqT_sneNCQgJ"});
;// CONCATENATED MODULE: ./hud/components/Modifiers/Modifier/Background/FilledBackground/styles.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const FilledBackground_styles_module = ({"background":"CRykTZjLQyBcivGKndjH"});
;// CONCATENATED MODULE: ./hud/components/Modifiers/Modifier/Background/FilledBackground/FilledBackground.tsx


const FilledBackground = (props) => {
    const { isDebuff } = props;
    return (react.createElement(Panel, { className: FilledBackground_styles_module.background, style: { backgroundColor: isDebuff ? 'rgba(195, 40, 40, 0.9)' : 'rgba(0, 200, 20, 0.9)' } }));
};
/* harmony default export */ const FilledBackground_FilledBackground = (FilledBackground);

;// CONCATENATED MODULE: ./hud/components/Modifiers/Modifier/Background/TimedBackground/styles.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const TimedBackground_styles_module = ({"container":"shSQxdjxhHVlp4a1MJZQ"});
;// CONCATENATED MODULE: ./hud/components/Modifiers/Modifier/Background/TimedBackground/TimedBackground.tsx




const TimedBackground = (props) => {
    const { isDebuff, selectedUnit, buff } = props;
    const [degree, setDegree] = (0,react.useState)(0);
    useInterval(() => {
        const remaining = Math.max(0, Buffs.GetRemainingTime(selectedUnit, buff));
        const duration = Math.max(0, Buffs.GetDuration(selectedUnit, buff));
        const degree = Math.max(0, (remaining / duration) * 360);
        setDegree(Number.isFinite(degree) ? degree : 0);
    }, HUD_THINK_FAST);
    return (react.createElement(Panel, { className: TimedBackground_styles_module.container, style: {
            backgroundColor: isDebuff ? 'rgba(195, 40, 40, 0.9)' : 'rgba(0, 200, 20, 0.9)',
            clip: 'radial(50% 50%, 0deg, ' + -degree + 'deg)'
        } }));
};
/* harmony default export */ const TimedBackground_TimedBackground = (TimedBackground);

;// CONCATENATED MODULE: ./hud/components/Modifiers/Modifier/Background/Background.tsx



const Background = (props) => {
    // $.Msg("REACT-RENDER: Modifiers - TimedBackground rendered");
    const { buff, selectedUnit, isDebuff, isAura } = props;
    return (react.createElement(react.Fragment, null,
        isAura && (react.createElement(FilledBackground_FilledBackground, { isDebuff: isDebuff })),
        !isAura && (react.createElement(TimedBackground_TimedBackground, { isDebuff: isDebuff, buff: buff, selectedUnit: selectedUnit }))));
};
/* harmony default export */ const Background_Background = (react.memo(Background));

;// CONCATENATED MODULE: ./hud/components/Modifiers/Modifier/Foreground/Stacks/styles.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const Stacks_styles_module = ({"container":"aXq3LoGbsbsqegfQVSHg","label":"QQdkbXyAUS_3z2LgzDdX"});
;// CONCATENATED MODULE: ./hud/components/Modifiers/Modifier/Foreground/Stacks/Stacks.tsx




const Stacks = (props) => {
    // $.Msg("REACT-RENDER: Modifier rendered");
    const { unit, buff } = props;
    const [stacks, setStacks] = (0,react.useState)(Buffs.GetStackCount(unit, buff));
    useInterval(() => {
        setStacks(Buffs.GetStackCount(unit, buff));
    }, HUD_THINK_FAST);
    if (stacks === 0) {
        return null;
    }
    return (react.createElement(Panel, { className: Stacks_styles_module.container },
        react.createElement(Label, { className: Stacks_styles_module.label, text: stacks })));
};
/* harmony default export */ const Stacks_Stacks = (react.memo(Stacks));

;// CONCATENATED MODULE: ./hud/components/Modifiers/Modifier/Foreground/styles.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const Foreground_styles_module = ({"container":"KWGxUWXYxTp3xRQPjhdC","image":"Mr_qqlj1gsDjszlD62pQ","paddedImage":"c1Y3rh5xMK6thCsr6pjQ"});
;// CONCATENATED MODULE: ./hud/components/Modifiers/Modifier/Foreground/Foreground.tsx



const Foreground = (props) => {
    // $.Msg("REACT-RENDER: Modifiers - TimedBackground rendered");
    const { buff, selectedUnit, panelId } = props;
    const ability = Buffs.GetAbility(selectedUnit, buff);
    const isItem = Abilities.IsItem(ability);
    return (react.createElement(react.Fragment, null,
        react.createElement(Panel, { className: Foreground_styles_module.container },
            react.createElement(Stacks_Stacks, { unit: selectedUnit, buff: buff }),
            !isItem && (react.createElement(DOTAAbilityImage, { key: panelId, className: Foreground_styles_module.image, abilityname: Abilities.GetAbilityName(ability) })),
            isItem && (react.createElement(DOTAItemImage, { key: panelId, className: Foreground_styles_module.paddedImage, itemname: Buffs.GetTexture(selectedUnit, buff), showtooltip: false })))));
};
/* harmony default export */ const Foreground_Foreground = (react.memo(Foreground));

;// CONCATENATED MODULE: ./hud/components/Modifiers/Modifier/Modifier.tsx





const Modifier_onRightClick = (panelId, selectedUnit, modifier) => {
    if (GameUI.IsAltDown()) {
        $('#' + panelId).RemoveClass('btnClicked');
        $('#' + panelId).AddClass('btnClicked');
        GameEvents.SendCustomGameEventToAllClients("on_modifier_alerted", {
            broadcaster: Players.GetLocalPlayer(),
            selectedUnit,
            modifier,
        });
    }
};
const Modifier_onMouseOut = (panelId) => {
    const thisPanel = $("#" + panelId);
    if (thisPanel) {
        $.DispatchEvent("DOTAHideBuffTooltip", thisPanel);
    }
};
const Modifier_onMouseOver = (panelId, selectedUnit, buff, isEnemy) => {
    const thisPanel = $("#" + panelId);
    if (thisPanel) {
        $.DispatchEvent("DOTAShowBuffTooltip", thisPanel, selectedUnit, buff, isEnemy);
    }
};
const Modifier = (props) => {
    // $.Msg("REACT-RENDER: Modifiers rendered");
    const { buff, selectedUnit, isDebuff } = props;
    const [isMounted, setIsMounted] = (0,react.useState)(false);
    const panelId = isDebuff ? "debuff_" + buff : "buff_" + buff;
    const isEnemy = Entities.IsEnemy(selectedUnit);
    const isAura = aura_modifiers.includes(Buffs.GetName(selectedUnit, buff));
    (0,react.useEffect)(() => {
        setIsMounted(true);
        return () => {
            const panel = $("#" + panelId);
            if (panel) {
                $.DispatchEvent("DOTAHideBuffTooltip", $.GetContextPanel());
            }
        };
    }, []);
    return (react.createElement(Panel, { id: panelId, style: {
            opacity: isMounted ? "1.0" : "0.0",
            preTransformScale2d: isMounted ? "1.0" : "0.0",
        }, className: Modifier_styles_module.container, onactivate: () => Modifier_onRightClick(panelId, selectedUnit, buff), onmouseout: () => Modifier_onMouseOut(panelId), onmouseover: () => Modifier_onMouseOver(panelId, selectedUnit, buff, isEnemy) },
        react.createElement(Background_Background, { buff: buff, selectedUnit: selectedUnit, isDebuff: isDebuff, isAura: isAura }),
        react.createElement(Foreground_Foreground, { buff: buff, selectedUnit: selectedUnit, panelId: panelId })));
};
/* harmony default export */ const Modifier_Modifier = (react.memo(Modifier));

;// CONCATENATED MODULE: ./hud/components/Modifiers/Debuffs/styles.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const Debuffs_styles_module = ({"container":"pWcuWOn3wOVyHKlIURE4"});
;// CONCATENATED MODULE: ./hud/components/Modifiers/Debuffs/Debuffs.tsx




const getDebuffs = (unit) => {
    const debuffs = [];
    for (let i = 0; i < Entities.GetNumBuffs(unit); i++) {
        const buff = Entities.GetBuff(unit, i);
        if (buff == -1) {
            continue;
        }
        if (Buffs.IsHidden(unit, buff)) {
            continue;
        }
        if (!Buffs.IsDebuff(unit, buff)) {
            continue;
        }
        debuffs.push(buff);
    }
    return debuffs;
};
const Debuffs = (props) => {
    // $.Msg("REACT-RENDER: Debuffs rendered");
    const { selectedUnit } = props;
    const [debuffs, setDebuffs] = (0,react.useState)(getDebuffs(Players.GetLocalPlayerPortraitUnit()));
    r("dota_portrait_unit_modifiers_changed", () => {
        setDebuffs(getDebuffs(selectedUnit));
    }, [selectedUnit]);
    (0,react.useEffect)(() => {
        setDebuffs(getDebuffs(selectedUnit));
    }, [selectedUnit]);
    return (react.createElement(Panel, { className: Debuffs_styles_module.container }, debuffs.map((debuff) => react.createElement(Modifier_Modifier, { key: debuff, buff: debuff, selectedUnit: selectedUnit, isDebuff: true }))));
};
/* harmony default export */ const Debuffs_Debuffs = (react.memo(Debuffs));

;// CONCATENATED MODULE: ./hud/components/Modifiers/Buffs/styles.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const Buffs_styles_module = ({"container":"z2EEBFDfSVxYEuMmWdCX"});
;// CONCATENATED MODULE: ./hud/components/Modifiers/Buffs/Buffs.tsx




const getBuffs = (unit) => {
    const buffs = [];
    for (let i = 0; i < Entities.GetNumBuffs(unit) + 1; i++) {
        const buff = Entities.GetBuff(unit, i);
        if (buff == -1) {
            continue;
        }
        if (Buffs.IsHidden(unit, buff)) {
            continue;
        }
        if (Buffs.IsDebuff(unit, buff)) {
            continue;
        }
        buffs.push(buff);
    }
    return buffs;
};
const BuffsPanel = (props) => {
    // $.Msg("REACT-RENDER: Buffs rendered");
    const { selectedUnit } = props;
    const [buffs, setBuffs] = (0,react.useState)(getBuffs(selectedUnit));
    r("dota_portrait_unit_modifiers_changed", () => {
        setBuffs(getBuffs(selectedUnit));
    }, [selectedUnit]);
    (0,react.useEffect)(() => {
        setBuffs(getBuffs(selectedUnit));
    }, [selectedUnit]);
    return (react.createElement(Panel, { className: Buffs_styles_module.container }, buffs.map((buff) => react.createElement(Modifier_Modifier, { key: buff, buff: buff, selectedUnit: selectedUnit, isDebuff: false }))));
};
/* harmony default export */ const Buffs_Buffs = (react.memo(BuffsPanel));

;// CONCATENATED MODULE: ./hud/types/itemOptionsTypes.tsx
const SET_ITEM_OPTIONS_ITEM = 'SET_ITEM_OPTIONS_ITEM';
const SET_ITEM_OPTIONS_POSITION_X = 'SET_ITEM_OPTIONS_POSITION_X';
const SET_ITEM_OPTIONS_VISIBLE = 'SET_ITEM_OPTIONS_VISIBLE';

;// CONCATENATED MODULE: ./hud/actions/itemOptionsActions.tsx

function setItemOptionsItem(item) {
    return {
        type: SET_ITEM_OPTIONS_ITEM,
        payload: { item }
    };
}
function setItemOptionsPositionX(posX) {
    return {
        type: SET_ITEM_OPTIONS_POSITION_X,
        payload: { posX }
    };
}
function setItemOptionsVisible(visible) {
    return {
        type: SET_ITEM_OPTIONS_VISIBLE,
        payload: { visible }
    };
}

;// CONCATENATED MODULE: ./hud/components/Inventory/ItemOptions/styles.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const ItemOptions_styles_module = ({"outerContainer":"U58wDQZ7vmkzEZcNiZ51","innerContainer":"iecvapkiXSzu3kEMuO4x","title":"J953_atEDxTEbfV4_X6v","divider":"zK2ahgxspEVc3pDGePwg","option":"XI9h9tFwGBMEDvP8UoW2","closeBtnContainer":"reDnWP725L1o70H4kWz6","closeBtn":"l7LX_50dCrJy6E6YOOHh","arrowheadContainer":"oumae9PTa7A_SRzxbZGZ","arrowheadImage":"CCDKSWjF9KDiVCElPlGL"});
;// CONCATENATED MODULE: ./hud/components/Inventory/ItemOptions/ItemOptions.tsx





const POS_X_OFFSET = 138;
const POST_Y_OFFSET = -40;
const ItemOptions_mapStateToProps = (state) => ({
    item: state.itemOptionsReducer.item,
    visible: state.itemOptionsReducer.visible,
    posX: state.itemOptionsReducer.posX,
});
const ItemOptions_mapDispatchToProps = (dispatch) => ({
    setItemOptionsVisible: (visible) => dispatch(setItemOptionsVisible(visible)),
});
const ItemOptions_connector = connect(ItemOptions_mapStateToProps, ItemOptions_mapDispatchToProps);
const ItemOptions = (props) => {
    // $.Msg("REACT-RENDER: Inventory - ItemOptions rendered");
    const { selectedUnit, item, visible, posX, setItemOptionsVisible } = props;
    r("dota_player_update_query_unit", () => {
        setItemOptionsVisible(false);
    }, [setItemOptionsVisible]);
    r("dota_player_update_selected_unit", () => {
        setItemOptionsVisible(false);
    }, [setItemOptionsVisible]);
    i('Cancelled', () => {
        if (visible) {
            Game.EmitSound("ui_topmenu_select");
        }
        setItemOptionsVisible(false);
    }, [visible, setItemOptionsVisible]);
    if (item === -1) {
        return null;
    }
    return (react.createElement(react.Fragment, null, visible && (react.createElement(Panel, { className: ItemOptions_styles_module.outerContainer, style: { position: (posX - POS_X_OFFSET) + "px " + POST_Y_OFFSET + "px " + "0px" } },
        react.createElement(Panel, { className: ItemOptions_styles_module.closeBtnContainer },
            react.createElement(Button, { className: ItemOptions_styles_module.closeBtn, onactivate: () => {
                    setItemOptionsVisible(false);
                    Game.EmitSound("ui_topmenu_select");
                } },
                react.createElement(Image, { src: "s2r://panorama/images/close_btn_white_png.vtex" }))),
        react.createElement(Panel, { className: ItemOptions_styles_module.innerContainer },
            react.createElement(Label, { text: "OPTIONS", className: ItemOptions_styles_module.title }),
            react.createElement(Label, { text: "Sell", className: ItemOptions_styles_module.option, onactivate: () => {
                    Items.LocalPlayerSellItem(item);
                    setItemOptionsVisible(false);
                } }),
            react.createElement(Label, { text: "Alert", className: ItemOptions_styles_module.option, onactivate: () => {
                    GameEvents.SendCustomGameEventToAllClients("on_item_alerted", {
                        broadcaster: Players.GetLocalPlayer(),
                        selectedUnit: selectedUnit,
                        item: item
                    });
                    setItemOptionsVisible(false);
                } }),
            react.createElement(Label, { text: "Cancel", className: ItemOptions_styles_module.option, onactivate: () => {
                    Game.EmitSound("ui_topmenu_select");
                    setItemOptionsVisible(false);
                } })),
        react.createElement(Panel, { className: ItemOptions_styles_module.arrowheadContainer },
            react.createElement(Image, { src: "s2r://panorama/images/tooltip_arrow_top.png", className: ItemOptions_styles_module.arrowheadImage }))))));
};
/* harmony default export */ const ItemOptions_ItemOptions = (react.memo(ItemOptions_connector(ItemOptions)));

;// CONCATENATED MODULE: ./hud/components/Inventory/Item/Keybind/styles.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const Item_Keybind_styles_module = ({"label":"Mc1Qw06z2ds5AmoL7ycQ"});
;// CONCATENATED MODULE: ./hud/components/Inventory/Item/Keybind/Keybind.tsx




const Keybind_Keybind_Keybind = (props) => {
    // $.Msg("REACT-RENDER: Inventory - Keybind rendered");
    const { item } = props;
    const [keybind, setKeybind] = (0,react.useState)('');
    useInterval(() => {
        setKeybind(Abilities.IsPassive(item) ? '' : Abilities.GetKeybind(item));
    }, HUD_THINK_FAST);
    return (react.createElement(Label, { className: Item_Keybind_styles_module.label, text: keybind }));
};
/* harmony default export */ const Item_Keybind_Keybind = (react.memo(Keybind_Keybind_Keybind));

;// CONCATENATED MODULE: ./hud/components/Inventory/Item/Cooldown/styles.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const Item_Cooldown_styles_module = ({"container":"HfeZhl84mGUn9WJBIZLc","label":"VTUFpbDDtk_oPVForZmw"});
;// CONCATENATED MODULE: ./hud/components/Inventory/Item/Cooldown/Cooldown.tsx




const Cooldown_Cooldown_Cooldown = (props) => {
    // $.Msg("REACT-RENDER: Inventory - Cooldown rendered");
    const { item } = props;
    const [degree, setDegree] = (0,react.useState)(0);
    const [remainingCooldown, setRemainingCooldown] = (0,react.useState)(Abilities.GetCooldownTimeRemaining(item));
    useInterval(() => {
        const total = Abilities.GetCooldownLength(item);
        const remaining = Abilities.GetCooldownTimeRemaining(item);
        const degree = Math.min(0, -(remainingCooldown / total) * 360);
        setDegree(Number.isFinite(degree) ? degree : 0);
        setRemainingCooldown(remaining);
    }, HUD_THINK_FAST);
    return (react.createElement(react.Fragment, null,
        react.createElement(Panel, { className: Item_Cooldown_styles_module.container, style: { clip: 'radial(50% 50%, 0deg, ' + degree + 'deg)' } }),
        remainingCooldown > 0 && (react.createElement(Label, { className: Item_Cooldown_styles_module.label, text: remainingCooldown > 1.0 ? Math.round(remainingCooldown) : remainingCooldown.toFixed(1) }))));
};
/* harmony default export */ const Item_Cooldown_Cooldown = (react.memo(Cooldown_Cooldown_Cooldown));

;// CONCATENATED MODULE: ./hud/components/Inventory/Item/Image/styles.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const Item_Image_styles_module = ({"container":"TWZ2pG_xtGBykJ_kpppR","lockIcon":"QTjhPejGQka7jR3Y8SW_"});
;// CONCATENATED MODULE: ./hud/components/Inventory/Item/Image/Image.tsx




const Item_Image_Image_Image = (props) => {
    // $.Msg("REACT-RENDER: Inventory - Image rendered");
    const { item, selectedUnit } = props;
    const [isCooldownReady, setIsCooldownReady] = (0,react.useState)(Abilities.IsCooldownReady(item));
    const [hasEnoughMana, setHasEnoughMana] = (0,react.useState)(Abilities.IsOwnersManaEnough(item));
    const [texture, setTexutre] = (0,react.useState)(Abilities.GetAbilityTextureName(item));
    const [showLock, setShowLock] = (0,react.useState)(false);
    useInterval(() => {
        const isMuted = Entities.IsMuted(selectedUnit);
        const isStunned = Entities.IsStunned(selectedUnit);
        const isCommandRestricted = Entities.IsCommandRestricted(selectedUnit);
        const isNightmared = Entities.IsNightmared(selectedUnit);
        const isHexed = Entities.IsHexed(selectedUnit);
        setShowLock(isMuted || isStunned || isCommandRestricted || isNightmared || isHexed);
        setIsCooldownReady(Abilities.IsCooldownReady(item));
        setHasEnoughMana(Abilities.IsOwnersManaEnough(item));
        setTexutre(Abilities.GetAbilityTextureName(item));
    }, HUD_THINK_FAST);
    return (react.createElement(react.Fragment, null,
        (isCooldownReady && showLock) && (react.createElement(Panel, { className: Item_Image_styles_module.lockIcon })),
        react.createElement(DOTAItemImage, { itemname: texture, className: Item_Image_styles_module.container, style: {
                saturation: isCooldownReady ? '1.0' : '0.5',
                border: !isCooldownReady ? '3px solid rgba(50, 50, 50, 0.75)' : '0px solid black',
                washColor: showLock ? 'rgba(0, 0, 0, 0.8)' : hasEnoughMana ? 'none' : '#1569be',
            } })));
};
/* harmony default export */ const Item_Image_Image = (react.memo(Item_Image_Image_Image));

;// CONCATENATED MODULE: ./hud/components/Inventory/Item/Charges/styles.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const Charges_styles_module = ({"container":"QH9bS8IwqETVesaFDNh1"});
;// CONCATENATED MODULE: ./hud/components/Inventory/Item/Charges/Charges.tsx




const Charges = (props) => {
    // $.Msg("REACT-RENDER: Inventory - Charges rendered");
    const { item } = props;
    const [shouldDisplayCharges, setShouldDisplayCharges] = (0,react.useState)(Items.ShouldDisplayCharges(item));
    const [charges, setCharges] = (0,react.useState)(Items.GetCurrentCharges(item));
    useInterval(() => {
        setShouldDisplayCharges(Items.ShouldDisplayCharges(item));
        setCharges(Items.GetCurrentCharges(item));
    }, HUD_THINK_FAST);
    return (react.createElement(react.Fragment, null, shouldDisplayCharges && (react.createElement(Label, { className: Charges_styles_module.container, text: charges }))));
};
/* harmony default export */ const Charges_Charges = (react.memo(Charges));

;// CONCATENATED MODULE: ./hud/components/Inventory/Item/ManaCost/styles.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const Item_ManaCost_styles_module = ({"label":"VA8o8XePr24qBvJDgZIQ"});
;// CONCATENATED MODULE: ./hud/components/Inventory/Item/ManaCost/ManaCost.tsx




const ManaCost_ManaCost_ManaCost = (props) => {
    // $.Msg("REACT-RENDER: Inventory - ManaCost rendered");
    const { item } = props;
    const [manaCost, setManaCost] = (0,react.useState)(Abilities.GetManaCost(item));
    useInterval(() => {
        setManaCost(Abilities.GetManaCost(item));
    }, HUD_THINK_FAST);
    return (react.createElement(Label, { className: Item_ManaCost_styles_module.label, text: manaCost > 0 ? manaCost.toFixed(0) : '' }));
};
/* harmony default export */ const Item_ManaCost_ManaCost = (react.memo(ManaCost_ManaCost_ManaCost));

;// CONCATENATED MODULE: ./hud/components/Inventory/Item/styles.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const Item_styles_module = ({"container":"HMwcE6dRfetA6ujKyCKN"});
;// CONCATENATED MODULE: ./hud/components/Inventory/Item/Item.tsx









const Item_mapStateToProps = (state) => ({
    itemOptionsVisible: state.itemOptionsReducer.visible,
    itemOptionsItem: state.itemOptionsReducer.item,
});
const Item_mapDispatchToProps = (dispatch) => ({
    setItemOptionsItem: (item) => dispatch(setItemOptionsItem(item)),
    setItemOptionsPositionX: (posX) => dispatch(setItemOptionsPositionX(posX)),
    setItemOptionsVisible: (visible) => dispatch(setItemOptionsVisible(visible)),
});
const Item_connector = connect(Item_mapStateToProps, Item_mapDispatchToProps);
class InventoryItem extends react.Component {
    constructor(props) {
        super(props);
        this.onDragStart = this.onDragStart.bind(this);
        this.OnDragEnd = this.OnDragEnd.bind(this);
        this.OnDragEnter = this.OnDragEnter.bind(this);
        this.OnDragLeave = this.OnDragLeave.bind(this);
        this.OnDragDrop = this.OnDragDrop.bind(this);
        this.onItemLeftClicked = this.onItemLeftClicked.bind(this);
        this.onItemRightClicked = this.onItemRightClicked.bind(this);
        this.onMouseOver = this.onMouseOver.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);
        this.state = {
            isItemDragged: false,
            isItemDropTarget: false,
            isHovering: false,
        };
    }
    componentDidMount() {
        const panel = $("#inventory_item_container_" + this.props.index);
        $.RegisterEventHandler('DragEnter', panel, this.OnDragEnter);
        $.RegisterEventHandler('DragDrop', panel, this.OnDragDrop);
        $.RegisterEventHandler('DragLeave', panel, this.OnDragLeave);
        $.RegisterEventHandler('DragStart', panel, this.onDragStart);
        $.RegisterEventHandler('DragEnd', panel, this.OnDragEnd);
        panel.SetAcceptsFocus(false);
    }
    onDragStart(thisPanel, draggedPanel) {
        $.DispatchEvent("DOTAHideAbilityTooltip", thisPanel);
        if (this.props.item === -1) {
            return;
        }
        if (!Entities.IsControllableByPlayer(this.props.selectedUnit, Players.GetLocalPlayer())) {
            GameUI.SendCustomHUDError("Item Not Owned By You", "General.InvalidTarget_Invulnerable");
            return;
        }
        this.setState({ isItemDragged: true });
        draggedPanel.displayPanel = $.CreatePanel("DOTAItemImage", $.GetContextPanel(), "inventoryItemDraggedItem");
        draggedPanel.displayPanel.itemname = Abilities.GetAbilityName(this.props.item);
        draggedPanel.displayPanel.contextEntityIndex = this.props.item;
        draggedPanel.displayPanel.Data().item = this.props.item;
        draggedPanel.displayPanel.Data().dragCompleted = false;
        draggedPanel.offsetX = 0;
        draggedPanel.offsetY = 0;
    }
    OnDragEnd(thisPanel, draggedPanel) {
        if (!draggedPanel.Data().dragCompleted) {
            Game.DropItemAtCursor(this.props.selectedUnit, this.props.item);
        }
        draggedPanel.DeleteAsync(0);
        this.setState({ isItemDragged: false });
    }
    OnDragLeave(thisPanel, draggedPanel) {
        const draggedItem = draggedPanel.Data().item;
        if (this.props.item === -1 || draggedItem === null || draggedItem == this.props.item) {
            return;
        }
        this.setState({ isItemDropTarget: false });
    }
    OnDragEnter(thisPanel, draggedPanel) {
        const draggedItem = draggedPanel.Data().item;
        if (this.props.item === -1 || draggedItem === null || draggedItem == this.props.item) {
            return;
        }
        this.setState({ isItemDropTarget: true });
    }
    OnDragDrop(thisPanel, draggedPanel) {
        const draggedItem = draggedPanel.Data().item;
        if (draggedItem === null) {
            return;
        }
        draggedPanel.Data().dragCompleted = true;
        if (draggedItem == this.props.item) {
            return;
        }
        this.props.setItemOptionsVisible(false);
        Game.PrepareUnitOrders({
            OrderType: dotaunitorder_t.DOTA_UNIT_ORDER_MOVE_ITEM,
            TargetIndex: this.props.index,
            AbilityIndex: draggedItem
        });
    }
    onItemLeftClicked() {
        if (this.props.item == -1) {
            return;
        }
        if (GameUI.IsAltDown()) {
            GameEvents.SendCustomGameEventToAllClients("on_item_alerted", {
                broadcaster: Players.GetLocalPlayer(),
                selectedUnit: this.props.selectedUnit,
                item: this.props.item
            });
            return;
        }
        if (!Entities.IsControllableByPlayer(this.props.selectedUnit, Players.GetLocalPlayer())) {
            return;
        }
        if (Items.CanBeExecuted(this.props.item)) {
            Abilities.ExecuteAbility(this.props.item, this.props.selectedUnit, false);
        }
    }
    onItemRightClicked() {
        const panel = $("#inventory_item_container_" + this.props.index);
        $.DispatchEvent("DOTAHideAbilityTooltip", panel);
        if (this.props.item === -1) {
            GameUI.SendCustomHUDError("No Item In Slot", "General.InvalidTarget_Invulnerable");
            return;
        }
        const playerId = Entities.GetPlayerOwnerID(this.props.selectedUnit);
        const isControllable = Entities.IsControllableByPlayer(this.props.selectedUnit, playerId);
        if (isControllable) {
            if (this.props.itemOptionsVisible && this.props.itemOptionsItem === this.props.item) {
                this.props.setItemOptionsVisible(false);
            }
            else {
                this.props.setItemOptionsVisible(true);
                this.props.setItemOptionsItem(this.props.item);
                const position = panel.style.position;
                if (position) {
                    const positionsArray = (position.match(/[+-]?\d+(\.\d+)?/g) || []).map(n => parseFloat(n));
                    const posX = (positionsArray[0]);
                    this.props.setItemOptionsPositionX(posX);
                }
            }
            Game.EmitSound("ui_topmenu_select");
        }
        else {
            GameUI.SendCustomHUDError("Item Not Owned By You", "General.InvalidTarget_Invulnerable");
        }
    }
    onMouseOver() {
        if (this.props.item === -1) {
            return;
        }
        const panel = $("#inventory_item_container_" + this.props.index);
        const ability = Abilities.GetAbilityName(this.props.item);
        $.DispatchEvent("DOTAShowAbilityTooltipForEntityIndex", panel, ability, this.props.selectedUnit);
        this.setState({ isHovering: true });
    }
    onMouseOut() {
        const panel = $("#inventory_item_container_" + this.props.index);
        $.DispatchEvent("DOTAHideAbilityTooltip", panel);
        this.setState({ isHovering: false });
    }
    render() {
        // $.Msg("REACT-RENDER: Inventory - Item rendered");
        return (react.createElement(Panel, { id: "inventory_item_container_" + this.props.index, onmouseover: this.onMouseOver, onmouseout: this.onMouseOut, onactivate: this.onItemLeftClicked, oncontextmenu: this.onItemRightClicked, draggable: true, className: Item_styles_module.container, style: {
                saturation: (this.state.isItemDragged || this.state.isItemDropTarget) ? '0.5' : '1.0',
                washColor: (this.state.isItemDragged || this.state.isItemDropTarget) ? '#808080' : 'none',
            } }, this.props.item !== -1 && (react.createElement(react.Fragment, null,
            react.createElement(Item_Cooldown_Cooldown, { item: this.props.item }),
            Entities.IsControllableByPlayer(this.props.selectedUnit, Players.GetLocalPlayer()) && (react.createElement(Item_Keybind_Keybind, { item: this.props.item })),
            react.createElement(Charges_Charges, { item: this.props.item }),
            react.createElement(Item_Image_Image, { item: this.props.item, selectedUnit: this.props.selectedUnit }),
            react.createElement(Item_ManaCost_ManaCost, { item: this.props.item })))));
    }
}
;
/* harmony default export */ const Item = (Item_connector(InventoryItem));

;// CONCATENATED MODULE: ./hud/components/Inventory/styles.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const Inventory_styles_module = ({"container":"FxnDiUvbItTwkCodN9Du"});
;// CONCATENATED MODULE: ./hud/components/Inventory/Inventory.tsx







const ITEM_SLOTS = [0, 1, 2, 3, 4, 5];
const Inventory = (props) => {
    // $.Msg("REACT-RENDER: Inventory rendered");
    const { selectedUnit } = props;
    const [items, setItems] = (0,react.useState)([]);
    const [hasInventory, setHasInventory] = (0,react.useState)(Entities.IsInventoryEnabled(selectedUnit));
    useInterval(() => {
        setHasInventory(Entities.IsInventoryEnabled(selectedUnit));
        const newItems = Array.from(ITEM_SLOTS).map(slot => Entities.GetItemInSlot(selectedUnit, slot));
        if (!TableUtils.areTablesEqual(items, newItems)) {
            setItems(newItems);
        }
    }, HUD_THINK_FAST);
    return (react.createElement(react.Fragment, null,
        react.createElement(ItemOptions_ItemOptions, { selectedUnit: selectedUnit }),
        react.createElement(Panel, { className: Inventory_styles_module.container, style: { visibility: hasInventory ? 'visible' : 'collapse' } }, items.map((item, index) => {
            return (react.createElement(Item, { key: index, index: index, item: item || -1, selectedUnit: selectedUnit }));
        }))));
};
/* harmony default export */ const Inventory_Inventory = (react.memo(Inventory));

;// CONCATENATED MODULE: ./hud/components/Shop/Title/title.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const title_module = ({"container":"Rr1FKkAZ361k982_5fz_","label":"_TANvQ4qacNF38eA3Umb","closeBtn":"D6HjQ7FjHcqwsJyqVfn_"});
;// CONCATENATED MODULE: ./hud/components/Shop/Title/Title.tsx




const Shop_Title_Title_mapDispatchToProps = (dispatch) => ({
    setShopVisible: (visible) => dispatch(setShopVisible(visible)),
});
const Shop_Title_Title_connector = connect(null, Shop_Title_Title_mapDispatchToProps);
const Shop_Title_Title_Title = (props) => {
    // $.Msg("REACT-RENDER: Shop - Title rendered");
    const { selectedUnit, setShopVisible } = props;
    return (react.createElement(Panel, { className: title_module.container },
        react.createElement(Label, { className: title_module.label, text: "SHOP - " + $.Localize(Entities.GetUnitName(selectedUnit)).toUpperCase() }),
        react.createElement(Button, { className: title_module.closeBtn, onactivate: () => {
                setShopVisible(false);
                Game.EmitSound("ui_topmenu_select");
            } },
            react.createElement(Image, { src: "s2r://panorama/images/close_btn_white_png.vtex" }))));
};
/* harmony default export */ const Shop_Title_Title = (Shop_Title_Title_connector(Shop_Title_Title_Title));

;// CONCATENATED MODULE: ./hud/components/Shop/Gold/gold.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const gold_module = ({"container":"jhzzPTL32QYEximy3uUQ","label":"wekTWcDzpbfytFjjghQ8","image":"f9_LGtQYZRY8EQHiGuET"});
;// CONCATENATED MODULE: ./hud/components/Shop/Gold/Gold.tsx




const Gold = (props) => {
    // $.Msg("REACT-RENDER: Shop - Gold rendered");
    const { selectedUnit } = props;
    const [playerGold, setPlayerGold] = (0,react.useState)(Players.GetGold(Entities.GetPlayerOwnerID(selectedUnit)));
    useInterval(() => {
        setPlayerGold(Players.GetGold(Entities.GetPlayerOwnerID(selectedUnit)));
    }, HUD_THINK_FAST);
    return (react.createElement(Panel, { className: gold_module.container },
        react.createElement(Panel, { className: gold_module.image }),
        react.createElement(Label, { className: gold_module.label, text: playerGold })));
};
/* harmony default export */ const Gold_Gold = (react.memo(Gold));

;// CONCATENATED MODULE: ./hud/components/Shop/Search/search.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const search_module = ({"container":"hlISF84kFOfP80kJ9FZu","icon":"iNDTwVnWrj6DS2L6ctGG","searchField":"zfXn5NDM5F_T4zVwJCPq","clearBtn":"gVvpcjlDRXwj7IEt0ML_"});
;// CONCATENATED MODULE: ./hud/components/Shop/Search/Search.tsx




const Search_mapDispatchToProps = (dispatch) => ({
    setShopSearchValue: (searchValue) => dispatch(setShopSearchValue(searchValue)),
});
const Search_connector = connect(null, Search_mapDispatchToProps);
/**
 * TextEntry cannot set text through redux-state, it result in a faluty searchbar. Workaround provided.
 */
const Search = (props) => {
    // $.Msg("REACT-RENDER: Shop - Search rendered");
    const { setShopSearchValue } = props;
    return (react.createElement(Panel, { className: search_module.container },
        react.createElement(Panel, { className: search_module.icon }),
        react.createElement(TextEntry, { id: "shopSearchFieldId", className: search_module.searchField, maxchars: 50, placeholder: 'Search...', ontextentrychange: (event) => setShopSearchValue(event.text.toLocaleLowerCase().trim()) }),
        react.createElement(Button, { className: search_module.clearBtn, onactivate: () => $("#shopSearchFieldId").text = '' })));
};
/* harmony default export */ const Search_Search = (Search_connector(Search));

;// CONCATENATED MODULE: ./hud/data/shop.tsx
const items = {
    consumables: [
        {
            itemname: 'item_flask',
            cost: 110,
            aliases: ['healing', 'salve', 'pot', 'flask', 'regen', 'healing salve']
        },
        {
            itemname: 'item_clarity',
            cost: 50,
            aliases: ['clarity', 'mana', 'pot', 'flask', 'regen']
        },
    ],
    armor: [
        {
            itemname: 'item_buckler',
            cost: 375,
            aliases: ['buckler']
        },
        {
            itemname: 'item_headdress',
            cost: 425,
            aliases: ['headdress']
        },
    ],
    weapons: [
        {
            itemname: 'item_desolator',
            cost: 3500,
            aliases: ['desolator']
        },
        {
            itemname: 'item_yasha',
            cost: 2050,
            aliases: ['yasha']
        },
    ],
    artifacts: [
        {
            itemname: 'item_skadi',
            cost: 5300,
            aliases: ['skadi']
        },
        {
            itemname: 'item_bloodstone',
            cost: 5950,
            aliases: ['bloodstone']
        },
    ]
};

;// CONCATENATED MODULE: ./hud/components/Shop/Item/item.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const item_module = ({"container":"PDUfowIUUKLo9k7qA2yP","image":"ly4wXemHK_apNGpVCTOv"});
;// CONCATENATED MODULE: ./hud/components/Shop/Item/Item.tsx






const Item_Item_mapStateToProps = (state) => ({
    searchValue: state.shopReducer.searchValue,
});
const Item_Item_connector = connect(Item_Item_mapStateToProps);
const Item_Item = (props) => {
    // $.Msg("REACT-RENDER: Shop - Item rendered");
    const { item, selectedUnit } = props;
    const [playerGold, setPlayerGold] = (0,react.useState)(Players.GetGold(Entities.GetPlayerOwnerID(selectedUnit)));
    const [isShopInRange, setIsShopInRange] = (0,react.useState)(Entities.IsInRangeOfShop(selectedUnit, 0, false));
    useInterval(() => {
        setPlayerGold(Players.GetGold(Entities.GetPlayerOwnerID(selectedUnit)));
        setIsShopInRange(Entities.IsInRangeOfShop(selectedUnit, 0, false));
    }, HUD_THINK_FAST);
    r("attempt_item_purchase_success", () => {
        Game.EmitSound("General.CourierGivesItem");
        Game.EmitSound("Item.PickUpShop");
    }, []);
    r("attempt_item_purchase_error", () => {
        GameUI.SendCustomHUDError("Unable To Purchase Item", "General.Item_CantPickUp");
    }, []);
    const hasEnoughCold = item.cost <= playerGold;
    let isSearched = false;
    item.aliases.forEach(alias => {
        if (alias.match(props.searchValue)) {
            isSearched = true;
        }
    });
    return (react.createElement(Button, { className: item_module.container, style: {
            border: hasEnoughCold ? '1.5px solid rgba(200, 175, 0, 0.5)' : '0.5px solid black',
            washColor: props.searchValue.length > 0 && !isSearched ? 'rgba(0, 0, 0, 0.9)' : 'none'
        }, onactivate: () => {
            if (GameUI.IsAltDown()) {
                GameEvents.SendCustomGameEventToServer("alert_shop_item", {
                    itemname: item.itemname,
                    cost: item.cost,
                });
            }
        }, oncontextmenu: () => {
            if (!isShopInRange) {
                GameUI.SendCustomHUDError("No Shop In Range", "General.Item_CantPickUp");
                return;
            }
            if (!hasEnoughCold) {
                GameUI.SendCustomHUDError("Not Enough Gold", "General.Item_CantPickUp");
                return;
            }
            GameEvents.SendCustomGameEventToServer("attempt_item_purchase", {
                itemname: item.itemname,
                cost: item.cost,
            });
        } },
        react.createElement(DOTAItemImage, { className: item_module.image, itemname: item.itemname })));
};
/* harmony default export */ const Shop_Item_Item = (react.memo(Item_Item_connector(Item_Item)));

;// CONCATENATED MODULE: ./hud/components/Shop/shop.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const shop_module = ({"container":"BSxzGvZdECdyZegRctY5","topBarContainer":"XG17xyoBlJ3Tpz1wnlmI","itemsContainer":"kgffNIaDnqioNdzFu2Qz","itemsColumn":"glyI7QY5ReJQw11M9kVU","category":"OcOTKVivrgkfduSaazAy","categoryTitleContainer":"oGnuUmHmMe_XtSiw0IRK","categoryTitleLabel":"xf3s9Vnjkq5SBEtoC_Wh","categoryItems":"zgwX5TeRbdT_QfomIjIJ"});
;// CONCATENATED MODULE: ./hud/components/Shop/Consumables/Consumables.tsx




const Consumables = (props) => {
    // $.Msg("REACT-RENDER: Shop - Consumables rendered");
    const { selectedUnit } = props;
    return (react.createElement(Panel, { className: shop_module.category },
        react.createElement(Label, { className: shop_module.categoryTitleLabel, text: 'Consumables' }),
        react.createElement(Panel, { className: shop_module.categoryItems }, items.consumables.map(item => react.createElement(Shop_Item_Item, { key: item.itemname, item: item, selectedUnit: selectedUnit })))));
};
/* harmony default export */ const Consumables_Consumables = (Consumables);

;// CONCATENATED MODULE: ./hud/components/Shop/Armor/Armor.tsx




const Shop_Armor_Armor_Armor = (props) => {
    // $.Msg("REACT-RENDER: Shop - Armor rendered");
    const { selectedUnit } = props;
    return (react.createElement(Panel, { className: shop_module.category },
        react.createElement(Label, { className: shop_module.categoryTitleLabel, text: 'Armor' }),
        react.createElement(Panel, { className: shop_module.categoryItems }, items.armor.map(item => react.createElement(Shop_Item_Item, { key: item.itemname, item: item, selectedUnit: selectedUnit })))));
};
/* harmony default export */ const Shop_Armor_Armor = (Shop_Armor_Armor_Armor);

;// CONCATENATED MODULE: ./hud/components/Shop/Weapons/Weapons.tsx




const Weapons = (props) => {
    // $.Msg("REACT-RENDER: Shop - Weapons rendered");
    const { selectedUnit } = props;
    return (react.createElement(Panel, { className: shop_module.category },
        react.createElement(Label, { className: shop_module.categoryTitleLabel, text: 'Weapons' }),
        react.createElement(Panel, { className: shop_module.categoryItems }, items.weapons.map(item => react.createElement(Shop_Item_Item, { key: item.itemname, item: item, selectedUnit: selectedUnit })))));
};
/* harmony default export */ const Weapons_Weapons = (Weapons);

;// CONCATENATED MODULE: ./hud/components/Shop/Artifacts/Artifacts.tsx




const Artifacts = (props) => {
    // $.Msg("REACT-RENDER: Shop - Artifacts rendered");
    const { selectedUnit } = props;
    return (react.createElement(Panel, { className: shop_module.category },
        react.createElement(Label, { className: shop_module.categoryTitleLabel, text: 'Artifacts' }),
        react.createElement(Panel, { className: shop_module.categoryItems }, items.artifacts.map(item => react.createElement(Shop_Item_Item, { key: item.itemname, item: item, selectedUnit: selectedUnit })))));
};
/* harmony default export */ const Artifacts_Artifacts = (Artifacts);

;// CONCATENATED MODULE: ./hud/components/Shop/Shop.tsx














const Shop_mapStateToProps = (state) => ({
    visible: state.shopReducer.visible,
});
const Shop_mapDispatchToProps = (dispatch) => ({
    setShopVisible: (visible) => dispatch(setShopVisible(visible)),
});
const Shop_connector = connect(Shop_mapStateToProps, Shop_mapDispatchToProps);
const Shop = (props) => {
    // $.Msg("REACT-RENDER: Shop rendered");
    const { selectedUnit, visible, setShopVisible } = props;
    const [renderComponent, setRenderComponent] = (0,react.useState)(false);
    useTimeout(() => {
        setRenderComponent(visible);
    }, visible === false ? HUD_THINK_SLOW : 0);
    i('Cancelled', () => {
        if (visible) {
            Game.EmitSound("ui_topmenu_select");
        }
        setShopVisible(false);
    }, [visible, setShopVisible]);
    return (react.createElement(react.Fragment, null, renderComponent && (react.createElement(react.Fragment, null,
        react.createElement(Panel, { className: shop_module.container, style: visible ? { transform: 'translateX(-10px)', opacity: '1.0' } : {} },
            react.createElement(Shop_Title_Title, { selectedUnit: selectedUnit }),
            react.createElement(Panel, { className: shop_module.topBarContainer },
                react.createElement(Search_Search, null),
                react.createElement(Gold_Gold, { selectedUnit: selectedUnit })),
            react.createElement(Panel, { className: shop_module.itemsContainer },
                react.createElement(Panel, { className: shop_module.itemsColumn },
                    react.createElement(Consumables_Consumables, { selectedUnit: selectedUnit }),
                    react.createElement(Artifacts_Artifacts, { selectedUnit: selectedUnit })),
                react.createElement(Panel, { className: shop_module.itemsColumn },
                    react.createElement(Shop_Armor_Armor, { selectedUnit: selectedUnit }),
                    react.createElement(Weapons_Weapons, { selectedUnit: selectedUnit }))))))));
};
/* harmony default export */ const Shop_Shop = (Shop_connector(Shop));

;// CONCATENATED MODULE: ./hud/types/heroSelectionTypes.tsx
const SET_FOCUS_HERO = 'SET_FOCUS_HERO';
const RESET_FOCUSED_HERO = 'RESET_FOCUSED_HERO';
const SET_HERO_SELECTION_VISIBLE = 'SET_HERO_SELECTION_VISIBLE';
const SET_RANDOM_HERO_DIALOG_VISIBLE = 'SET_RANDOM_HERO_DIALOG_VISIBLE';

;// CONCATENATED MODULE: ./hud/actions/heroSelectionActions.tsx

function setFocusedHero(hero) {
    return {
        type: SET_FOCUS_HERO,
        payload: { hero }
    };
}
function resetFocusedHero() {
    return {
        type: RESET_FOCUSED_HERO,
    };
}
function setRandomHeroDialogVisible(visible) {
    return {
        type: SET_RANDOM_HERO_DIALOG_VISIBLE,
        payload: { visible }
    };
}

;// CONCATENATED MODULE: ./hud/components/HeroSelection/Description/Buttons/buttons.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const buttons_module = ({"container":"gJDIkhZ3utFqStslbRd7","cancelButton":"IKfrQWWi2lBmGrJpvF9u","selectButton":"whfmuRCQT5x3_krM3tYZ","selectButtonLabel":"XZlYoPHJC72s0K4pJq_G","selectButtonLockIcon":"Bh6SFN3gsa91_OrHaNLi","cancelButtonLabel":"R6506jSOCNr7V2AE69Nz"});
;// CONCATENATED MODULE: ./hud/components/HeroSelection/Description/Buttons/Buttons.tsx





const Buttons_mapDispatchToProps = (dispatch) => ({
    resetFocusedHero: () => dispatch(resetFocusedHero()),
});
const Buttons_connector = connect(null, Buttons_mapDispatchToProps);
const Buttons = (props) => {
    var _a;
    const heroes = a('HeroSelectionHeroes').heroes;
    const isPicked = ((_a = Object.values(heroes).find(hero => hero.heroname === props.focusedHero.heroname)) === null || _a === void 0 ? void 0 : _a.picked) === 1;
    return (react.createElement(Panel, { className: buttons_module.container },
        react.createElement(Button, { className: buttons_module.selectButton, onactivate: () => {
                Game.EmitSound("ui_topmenu_select");
                GameEvents.SendCustomGameEventToServer("on_select_hero", { heroname: props.focusedHero.heroname });
            }, style: {
                backgroundColor: isPicked ? 'rgb(50, 50, 50)' : 'gradient( linear, 0% 0%, 0% 100%, from( #5aa15e ), to( #87d69533 ) )'
            } },
            !isPicked && (react.createElement(Label, { className: buttons_module.selectButtonLabel, text: 'SELECT HERO' })),
            isPicked && (react.createElement(Image, { className: buttons_module.selectButtonLockIcon, src: "s2r://panorama/images/lock_white_png.vtex" }))),
        react.createElement(Button, { className: buttons_module.cancelButton, onactivate: () => {
                Game.EmitSound("ui_topmenu_select");
                props.resetFocusedHero();
            } },
            react.createElement(Label, { className: buttons_module.cancelButtonLabel, text: 'CANCEL' }))));
};
/* harmony default export */ const Buttons_Buttons = (Buttons_connector(Buttons));

;// CONCATENATED MODULE: ./hud/components/HeroSelection/Description/Lore/lore.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const lore_module = ({"outerContainer":"LftvFPwkbDhqYwIYqxeR","titleLabel":"WXcMrdFXkFOYvJ8VzquQ","innerContainer":"PnIHZ3NMme7ikkidc16Q","loreLabel":"Z8GXYuUi1_aRG7K2C2KC"});
;// CONCATENATED MODULE: ./hud/components/HeroSelection/Description/Lore/Lore.tsx


const Lore = (props) => {
    return (react.createElement(Panel, { className: lore_module.outerContainer },
        react.createElement(Label, { className: lore_module.titleLabel, text: "LORE" }),
        react.createElement(Panel, { className: lore_module.innerContainer },
            react.createElement(Label, { className: lore_module.loreLabel, text: $.Localize(props.focusedHero.lore) }))));
};
/* harmony default export */ const Lore_Lore = (Lore);

;// CONCATENATED MODULE: ./hud/components/HeroSelection/Description/Heroname/heroname.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const heroname_module = ({"container":"FTa_3vMX52nRn1sXAEFl","attributeImage":"fxH6DtBgQHRuTXEXzDd8","heronameLabel":"iUFKlT2XXc3v2ey9XdeD","avatarOuterContainer":"VBBoC2d4c_OnYJig67MS","selectedByLabel":"XfZsBIFZlylelwwG16HZ","avatarInnerContainer":"ztzVqtYaiSBMo6VC5a_S"});
;// CONCATENATED MODULE: ./hud/components/HeroSelection/Description/Heroname/Heroname.tsx



const attributeToImage = (attribute) => {
    if (attribute === 'DOTA_ATTRIBUTE_AGILITY') {
        return 'url("s2r://panorama/images/primary_attribute_icons/primary_attribute_icon_agility_psd.vtex")';
    }
    if (attribute === 'DOTA_ATTRIBUTE_INTELLECT') {
        return 'url("s2r://panorama/images/primary_attribute_icons/primary_attribute_icon_intelligence_psd.vtex")';
    }
    if (attribute === 'DOTA_ATTRIBUTE_STRENGTH') {
        return 'url("s2r://panorama/images/primary_attribute_icons/primary_attribute_icon_strength_psd.vtex")';
    }
    return '';
};
const avatar = {
    width: '24px',
    height: '24px',
    border: '1px solid rgba(0, 0, 0, 0.5)',
    borderRadius: '5px',
    verticalAlign: 'center',
    horizontalAlign: 'right',
};
const Heroname = (props) => {
    const heroes = a('HeroSelectionHeroes').heroes;
    const steamIds = Object.values(heroes)
        .filter(hero => hero.heroname === props.focusedHero.heroname)
        .filter(hero => hero.picked === 1)
        .map(hero => Game.GetPlayerInfo(hero.playerID).player_steamid);
    return (react.createElement(Panel, { className: heroname_module.container },
        react.createElement(Panel, { className: heroname_module.attributeImage, style: { backgroundImage: attributeToImage(props.focusedHero.attribute) } }),
        react.createElement(Label, { className: heroname_module.heronameLabel, text: $.Localize(props.focusedHero.heroname) }),
        steamIds.length > 0 && (react.createElement(Panel, { className: heroname_module.avatarOuterContainer },
            react.createElement(Label, { className: heroname_module.selectedByLabel, text: 'Selected by: ' }),
            react.createElement(Panel, { className: heroname_module.avatarInnerContainer }, steamIds.map(steamid => (react.createElement(DOTAAvatarImage, { key: steamid, steamid: steamid, style: avatar }))))))));
};
/* harmony default export */ const Heroname_Heroname = (Heroname);

;// CONCATENATED MODULE: ./hud/components/HeroSelection/Description/Stats/stats.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const Stats_stats_module = ({"outerContainer":"vTGgzlb6B9XfFPlZUfXY","title":"AUEZoyiVz98PhzJEUhyp","innerContainer":"XGf2sy9QLQrfwP9VxJLP","column":"cDGGuKFpOz8crlSTUAm4","columnEntryOuterContainer":"o3T0mfr_JP91VLbeiuOj","columnEntryInnerContainer":"Ad8hUJ6DZ2eek8ttxfnn","columnEntryLabel":"nFsqLuTdFNNBU2zku99G","image":"yfZIEKGOBYoTHLAekxsZ","damageImage":"mdnauyCLpXm_qaCDZxlF","armorImage":"dOvAWCZtGQPKuYiKeOS6","moveSpeedImage":"D2fSLi1XDjZo2vkp8R1w","attackRateImage":"IjVaWP4uoZhxHKIH3Stt","attackSpeedImage":"h8ANtCEj1VfmDU_8Q0wt","attackRangeImage":"yljvvOCvMaXbcJVB1Zld"});
;// CONCATENATED MODULE: ./hud/components/HeroSelection/Description/Stats/Stats.tsx


const Stats_Stats_Stats = (props) => {
    return (react.createElement(Panel, { className: Stats_stats_module.outerContainer },
        react.createElement(Label, { className: Stats_stats_module.title, text: "Stats" }),
        react.createElement(Panel, { className: Stats_stats_module.innerContainer },
            react.createElement(Panel, { className: Stats_stats_module.column },
                react.createElement(Panel, { className: Stats_stats_module.columnEntryOuterContainer },
                    react.createElement(Panel, { className: Stats_stats_module.columnEntryInnerContainer },
                        react.createElement(Panel, { className: `${Stats_stats_module.image} ${Stats_stats_module.damageImage}` }),
                        react.createElement(Label, { className: Stats_stats_module.columnEntryLabel, text: props.focusedHero.damage }))),
                react.createElement(Panel, { className: Stats_stats_module.columnEntryOuterContainer },
                    react.createElement(Panel, { className: Stats_stats_module.columnEntryInnerContainer },
                        react.createElement(Panel, { className: `${Stats_stats_module.image} ${Stats_stats_module.armorImage}` }),
                        react.createElement(Label, { className: Stats_stats_module.columnEntryLabel, text: props.focusedHero.armor }))),
                react.createElement(Panel, { className: Stats_stats_module.columnEntryOuterContainer },
                    react.createElement(Panel, { className: Stats_stats_module.columnEntryInnerContainer },
                        react.createElement(Panel, { className: `${Stats_stats_module.image} ${Stats_stats_module.moveSpeedImage}` }),
                        react.createElement(Label, { className: Stats_stats_module.columnEntryLabel, text: props.focusedHero.movespeed.toFixed(0) })))),
            react.createElement(Panel, { className: Stats_stats_module.column },
                react.createElement(Panel, { className: Stats_stats_module.columnEntryOuterContainer },
                    react.createElement(Panel, { className: Stats_stats_module.columnEntryInnerContainer },
                        react.createElement(Panel, { className: `${Stats_stats_module.image} ${Stats_stats_module.attackRateImage}` }),
                        react.createElement(Label, { className: Stats_stats_module.columnEntryLabel, text: props.focusedHero.attackRate.toFixed(1) }))),
                react.createElement(Panel, { className: Stats_stats_module.columnEntryOuterContainer },
                    react.createElement(Panel, { className: Stats_stats_module.columnEntryInnerContainer },
                        react.createElement(Panel, { className: `${Stats_stats_module.image} ${Stats_stats_module.attackSpeedImage}` }),
                        react.createElement(Label, { className: Stats_stats_module.columnEntryLabel, text: props.focusedHero.attackSpeed.toFixed(0) }))),
                react.createElement(Panel, { className: Stats_stats_module.columnEntryOuterContainer },
                    react.createElement(Panel, { className: Stats_stats_module.columnEntryInnerContainer },
                        react.createElement(Panel, { className: `${Stats_stats_module.image} ${Stats_stats_module.attackRangeImage}` }),
                        react.createElement(Label, { className: Stats_stats_module.columnEntryLabel, text: props.focusedHero.attackRange.toFixed(0) })))))));
};
/* harmony default export */ const Description_Stats_Stats = (Stats_Stats_Stats);

;// CONCATENATED MODULE: ./hud/components/HeroSelection/Description/Title/title.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const Title_title_module = ({"container":"atFX8M54hcQvRTizJEo4","label":"QN8mO4MWeSrUkguEFTwo","closeBtn":"vEVpS9O62JUz9JA3HhK6"});
;// CONCATENATED MODULE: ./hud/components/HeroSelection/Description/Title/Title.tsx




const Description_Title_Title_mapDispatchToProps = (dispatch) => ({
    resetFocusedHero: () => dispatch(resetFocusedHero()),
});
const Description_Title_Title_connector = connect(null, Description_Title_Title_mapDispatchToProps);
const Description_Title_Title_Title = (props) => {
    return (react.createElement(Panel, { className: Title_title_module.container },
        react.createElement(Label, { className: Title_title_module.label, text: "HERO DESCRIPTION" }),
        react.createElement(Button, { className: Title_title_module.closeBtn, onactivate: () => {
                props.resetFocusedHero();
                Game.EmitSound("ui_topmenu_select");
            } },
            react.createElement(Image, { src: "s2r://panorama/images/close_btn_white_png.vtex" }))));
};
/* harmony default export */ const Description_Title_Title = (Description_Title_Title_connector(Description_Title_Title_Title));

;// CONCATENATED MODULE: ./hud/components/HeroSelection/Description/Abilities/Ability/ability.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const ability_module = ({"image":"oRxWrYenh036i5EbwHgX"});
;// CONCATENATED MODULE: ./hud/components/HeroSelection/Description/Abilities/Ability/Ability.tsx


const Ability = (props) => {
    return (react.createElement(DOTAAbilityImage, { id: props.ability, className: ability_module.image, abilityname: props.ability, onmouseover: () => $.DispatchEvent("DOTAShowAbilityTooltip", $("#" + props.ability), props.ability), onmouseout: () => $.DispatchEvent("DOTAHideAbilityTooltip", $("#" + props.ability)) }));
};
/* harmony default export */ const Ability_Ability = (Ability);

;// CONCATENATED MODULE: ./hud/components/HeroSelection/Description/Abilities/abilities.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const abilities_module = ({"container":"QW3ujqRrDd7PasQ1EhoS","label":"f2JjWgTQ31_JRcj9Mr7a","abilitiesContainer":"t5dIvihY7sCf5eidK1Dh"});
;// CONCATENATED MODULE: ./hud/components/HeroSelection/Description/Abilities/Abilities.tsx



const Abilities_Abilities = (props) => {
    return (react.createElement(Panel, { className: abilities_module.container },
        react.createElement(Label, { className: abilities_module.label, text: "ABILITIES" }),
        react.createElement(Panel, { className: abilities_module.abilitiesContainer }, Object.values(props.focusedHero.abilities).map((ability) => (react.createElement(Ability_Ability, { key: ability, ability: ability }))))));
};
/* harmony default export */ const Description_Abilities_Abilities = (Abilities_Abilities);

;// CONCATENATED MODULE: ./hud/components/HeroSelection/Description/HealthAndMana/HealthAndMana.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const HealthAndMana_module = ({"outerContainer":"Nt9TIfV43WZ9GF4LInRe","titleLabel":"jzhXrRUFzfr4IcTITYO8","innerContainer":"rN9wQ52nCS1Q5GYtzbbi","healthContainer":"YWiVQ1AfM0hEWh_NmtQh","manaContainer":"ZaOpJlnxQOGsOdebtiEQ","healthAndManaLabel":"ilXuUwS9R1TRXbxiQ7xg","regenLabel":"Trjc8UofnxqdNO8hzElW"});
;// CONCATENATED MODULE: ./hud/components/HeroSelection/Description/HealthAndMana/HealthAndMana.tsx


const HealthAndMana = (props) => {
    return (react.createElement(Panel, { className: HealthAndMana_module.outerContainer },
        react.createElement(Label, { className: HealthAndMana_module.titleLabel, text: "HEALTH & MANA" }),
        react.createElement(Panel, { className: HealthAndMana_module.innerContainer },
            react.createElement(Panel, { className: HealthAndMana_module.healthContainer },
                react.createElement(Label, { className: HealthAndMana_module.healthAndManaLabel, text: props.focusedHero.health + ' / ' + props.focusedHero.health }),
                react.createElement(Label, { className: HealthAndMana_module.regenLabel, text: '+ ' + props.focusedHero.healthRegen })),
            react.createElement(Panel, { className: HealthAndMana_module.manaContainer },
                react.createElement(Label, { className: HealthAndMana_module.healthAndManaLabel, text: props.focusedHero.mana + ' / ' + props.focusedHero.mana }),
                react.createElement(Label, { className: HealthAndMana_module.regenLabel, text: '+ ' + props.focusedHero.manaRegen })))));
};
/* harmony default export */ const HealthAndMana_HealthAndMana = (HealthAndMana);

;// CONCATENATED MODULE: ./hud/components/HeroSelection/Description/Attributes/attributes.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const attributes_module = ({"outerContainer":"hdQJIA4JYL5WvBawXjTs","titleLabel":"Ni6T_CjIDDJoH6VJr4oS","innerContainer":"xbrnoJt3163bmzreDxuX","leftColumn":"acm9rVZ6uC6Yq5nG6gM3","rightColumn":"P3c7P6tMZYS0OhcGVzQG","columnEntryContainer":"MVSoecfo5X8hmTAQ_sNQ","columnEntry":"Uj5agWw7khfOdbsBP3c5","icon":"ay6Lbb4LEh7ZIzdqL2Bx","iconAgility":"AB6AiEZ0pv6aLmGucgaH","iconStrength":"INo16oOeJKlzsh27vPtb","iconIntelligence":"USRmNr8ohVdEirKeRl9b","labelContainer":"FVPM1G4mkAPIwqDVHqbf","baseLabel":"A3ZWujZx0iJeFtc7du4E","gainLabel":"v7JHquj0okWOXyOWmjnG","informationLabel":"z2NXrYEJ0xl1mPU6tPk5"});
;// CONCATENATED MODULE: ./hud/components/HeroSelection/Description/Attributes/Attributes.tsx


const Attributes = (props) => {
    return (react.createElement(Panel, { className: attributes_module.outerContainer },
        react.createElement(Label, { className: attributes_module.titleLabel, text: "Attributes" }),
        react.createElement(Panel, { className: attributes_module.innerContainer },
            react.createElement(Panel, { className: attributes_module.leftColumn },
                react.createElement(Panel, { className: attributes_module.columnEntryContainer },
                    react.createElement(Panel, { className: attributes_module.columnEntry },
                        react.createElement(Panel, { className: `${attributes_module.icon} ${attributes_module.iconAgility}` })),
                    react.createElement(Panel, { className: attributes_module.columnEntry },
                        react.createElement(Label, { className: attributes_module.baseLabel, text: props.focusedHero.agility })),
                    react.createElement(Panel, { className: attributes_module.columnEntry },
                        react.createElement(Label, { className: attributes_module.gainLabel, text: '+' + props.focusedHero.agilityGain.toFixed(1) }))),
                react.createElement(Panel, { className: attributes_module.columnEntryContainer },
                    react.createElement(Panel, { className: attributes_module.columnEntry },
                        react.createElement(Panel, { className: `${attributes_module.icon} ${attributes_module.iconStrength}` })),
                    react.createElement(Panel, { className: attributes_module.columnEntry },
                        react.createElement(Label, { className: attributes_module.baseLabel, text: props.focusedHero.strength })),
                    react.createElement(Panel, { className: attributes_module.columnEntry },
                        react.createElement(Label, { className: attributes_module.gainLabel, text: '+' + props.focusedHero.strengthGain.toFixed(1) }))),
                react.createElement(Panel, { className: attributes_module.columnEntryContainer },
                    react.createElement(Panel, { className: attributes_module.columnEntry },
                        react.createElement(Panel, { className: `${attributes_module.icon} ${attributes_module.iconIntelligence}` })),
                    react.createElement(Panel, { className: attributes_module.columnEntry },
                        react.createElement(Label, { className: attributes_module.baseLabel, text: props.focusedHero.intelligence })),
                    react.createElement(Panel, { className: attributes_module.columnEntry },
                        react.createElement(Label, { className: attributes_module.gainLabel, text: '+' + props.focusedHero.intelligenceGain.toFixed(1) })))),
            react.createElement(Panel, { className: attributes_module.rightColumn },
                react.createElement(Panel, { className: attributes_module.columnEntryContainer },
                    react.createElement(Label, { className: attributes_module.informationLabel, text: props.focusedHero.attribute === 'DOTA_ATTRIBUTE_AGILITY' ? '+ 0.5 move speed. + 0.5 attack speed. + 1.0 damage.' : '+ 0.5 move speed. + 0.5 attack speed.' })),
                react.createElement(Panel, { className: attributes_module.columnEntryContainer },
                    react.createElement(Label, { className: attributes_module.informationLabel, text: props.focusedHero.attribute === 'DOTA_ATTRIBUTE_STRENGTH' ? '+ 1.0 health. + 0.5 health regen. + 1.0 damage.' : '+ 1.0 health. + 0.5 health regen.' })),
                react.createElement(Panel, { className: attributes_module.columnEntryContainer },
                    react.createElement(Label, { className: attributes_module.informationLabel, text: props.focusedHero.attribute === 'DOTA_ATTRIBUTE_INTELLECT' ? '+ 1.0 mana. + 0.5 mana regen. + 1.0 damage.' : '+ 1.0 mana. + 0.5 mana regen.' }))))));
};
/* harmony default export */ const Attributes_Attributes = (Attributes);

;// CONCATENATED MODULE: ./hud/components/HeroSelection/Description/description.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const description_module = ({"container":"DmBJFNFl3fZp4VFfrrdO"});
;// CONCATENATED MODULE: ./hud/components/HeroSelection/Description/description.tsx














const description_mapDispatchToProps = (dispatch) => ({
    resetFocusedHero: () => dispatch(resetFocusedHero()),
});
const description_connector = connect(null, description_mapDispatchToProps);
const Description = (props) => {
    const { focusedHero } = props;
    const [renderComponent, setRenderComponent] = (0,react.useState)(false);
    useTimeout(() => {
        setRenderComponent(focusedHero === undefined ? false : true);
    }, focusedHero === undefined ? 0 : HUD_THINK_FAST);
    return (react.createElement(react.Fragment, null, renderComponent && (react.createElement(Panel, { className: description_module.container, style: {
            opacity: focusedHero ? '1.0' : '0.0',
            preTransformScale2d: focusedHero ? '1.0' : '0.5',
        } }, focusedHero && (react.createElement(react.Fragment, null,
        react.createElement(Description_Title_Title, null),
        react.createElement(Heroname_Heroname, { focusedHero: focusedHero }),
        react.createElement(Panel, { style: { flowChildren: 'right', width: '100%' } },
            react.createElement(Attributes_Attributes, { focusedHero: focusedHero }),
            react.createElement(Description_Stats_Stats, { focusedHero: focusedHero })),
        react.createElement(Panel, { style: { flowChildren: 'right', width: '100%' } },
            react.createElement(Description_Abilities_Abilities, { focusedHero: focusedHero }),
            react.createElement(HealthAndMana_HealthAndMana, { focusedHero: focusedHero })),
        react.createElement(Lore_Lore, { focusedHero: focusedHero }),
        react.createElement(Buttons_Buttons, { focusedHero: focusedHero })))))));
};
/* harmony default export */ const description = (react.memo(description_connector(Description)));

;// CONCATENATED MODULE: ./hud/components/HeroSelection/Heroes/Hero/hero.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const hero_module = ({"container":"enZWCPv6ejmz3lnsfEhn","border":"RmTTLfhzGMHMrAHUrFDP","image":"OYHzLa3YF4KpST_ohRYN","avatarContainer":"yztuWGuxPqwQiBiJqn8T","lock":"_SJZhLOFc8fgCf2PEl4p"});
;// CONCATENATED MODULE: ./hud/components/HeroSelection/Heroes/Hero/Hero.tsx




const Hero_mapStateToProps = (state) => ({
    focusedHero: state.heroSelectionReducer.focusedHero,
});
const Hero_connector = connect(Hero_mapStateToProps);
const Hero = (props) => {
    var _a;
    const { heroname, focusedHero } = props;
    const [isHovering, setIsHovering] = (0,react.useState)(false);
    const heroes = a('HeroSelectionHeroes').heroes;
    const isFocused = focusedHero && focusedHero.heroname === heroname;
    const isPicked = ((_a = Object.values(heroes).find(hero => hero.heroname === heroname)) === null || _a === void 0 ? void 0 : _a.picked) === 1;
    const steamIds = Object.values(heroes)
        .filter(hero => hero.heroname === heroname)
        .filter(hero => hero.picked === 1)
        .map(hero => Game.GetPlayerInfo(hero.playerID).player_steamid);
    return (react.createElement(Panel, { className: hero_module.container },
        react.createElement(Panel, { className: hero_module.border, style: { visibility: isFocused ? 'visible' : 'collapse' } }),
        isPicked && (react.createElement(Image, { className: hero_module.lock, src: "s2r://panorama/images/lock_white_png.vtex" })),
        steamIds.length === 1 && (react.createElement(Panel, { className: hero_module.avatarContainer },
            react.createElement(DOTAAvatarImage, { steamid: steamIds[0], style: {
                    width: '24px',
                    height: '24px',
                    border: '1px solid rgba(0, 0, 0, 0.5)',
                    borderRadius: '5px',
                    verticalAlign: 'top',
                    horizontalAlign: 'left',
                } }))),
        react.createElement(Button, { onmouseover: () => setIsHovering(true), onmouseout: () => setIsHovering(false), onactivate: () => {
                if (!isFocused) {
                    GameEvents.SendCustomGameEventToServer("on_focus_hero", { heroname: heroname });
                }
            } },
            react.createElement(DOTAHeroImage, { className: hero_module.image, heroname: heroname, heroimagestyle: 'portrait', style: {
                    transform: (isFocused || isHovering) ? 'scaleX(1.025) scaleY(1.025)' : 'scaleX(1) scaleY(1)',
                    washColor: isPicked ? 'rgba(0, 0, 0, 0.925)' : (isFocused || isHovering) ? 'none' : 'rgba(0, 0, 0, 0.15)',
                } }))));
};
/* harmony default export */ const Hero_Hero = (react.memo(Hero_connector(Hero)));

;// CONCATENATED MODULE: ./hud/components/HeroSelection/Heroes/heroes.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const heroes_module = ({"outerContainer":"m6Lfc8iiLkiGx07twUsw","label":"fFWe_lY8Y24pi1ClosRV","innerContainer":"jacncJS7Wg1l63vEMnww","btnContainer":"tnL9GeruCOgsehAJSHC9","btnImage":"ZL7ev3qlpDqeCtD2gLkt"});
;// CONCATENATED MODULE: ./hud/components/HeroSelection/Heroes/Heroes.tsx





const selectableHeronames = [
    'npc_dota_hero_dragon_knight',
    'npc_dota_hero_windrunner',
    'npc_dota_hero_phantom_assassin',
    'npc_dota_hero_crystal_maiden',
    'npc_dota_hero_dazzle',
    'npc_dota_hero_lina',
];
const Heroes_mapDispatchToProps = (dispatch) => ({
    setRandomHeroDialogVisible: (visible) => dispatch(setRandomHeroDialogVisible(visible)),
});
const Heroes_connector = connect(null, Heroes_mapDispatchToProps);
const Heroes_Heroes_Heroes = (props) => {
    return (react.createElement(Panel, { className: heroes_module.outerContainer },
        react.createElement(Label, { className: heroes_module.label, text: 'Heroes' }),
        react.createElement(Panel, { className: heroes_module.innerContainer },
            selectableHeronames.map(heroname => (react.createElement(Hero_Hero, { key: heroname, heroname: heroname }))),
            react.createElement(Button, { className: heroes_module.btnContainer, onactivate: () => {
                    Game.EmitSound("ui_topmenu_select");
                    props.setRandomHeroDialogVisible(true);
                } },
                react.createElement(Image, { className: heroes_module.btnImage })))));
};
/* harmony default export */ const HeroSelection_Heroes_Heroes = (Heroes_connector(Heroes_Heroes_Heroes));

;// CONCATENATED MODULE: ./hud/components/HeroSelection/RandomHeroDialog/randomHeroDialog.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const randomHeroDialog_module = ({"outerContainer":"UQI5cQxOG3lfqnOdPCvK","innerContainer":"MykYAeZT_qVCBuUsT3km","centerContainer":"wMjLJtzK3tq9SmKK1tZw","label":"vP5TO4AaDnOo3zQuxoQ5","buttonContainer":"oouvrI9bObQJwWyQqkYQ","button":"fLeBGzGHJP4b0nqZWWKK","buttonLabel":"HTSVwaBKJUf3hIZnYE3x","arrow":"fOCLGc3UwgoBvOmYvgw7"});
;// CONCATENATED MODULE: ./hud/components/HeroSelection/RandomHeroDialog/RandomHeroDialog.tsx






const RandomHeroDialog_mapStateToProps = (state) => ({
    randomHeroDialogVisible: state.heroSelectionReducer.randomHeroDialogVisible
});
const RandomHeroDialog_mapDispatchToProps = (dispatch) => ({
    setRandomHeroDialogVisible: (visible) => dispatch(setRandomHeroDialogVisible(visible)),
});
const RandomHeroDialog_connector = connect(RandomHeroDialog_mapStateToProps, RandomHeroDialog_mapDispatchToProps);
const RandomHeroDialog = (props) => {
    const { randomHeroDialogVisible, setRandomHeroDialogVisible } = props;
    const [renderComponent, setRenderComponent] = (0,react.useState)(false);
    useTimeout(() => {
        setRenderComponent(randomHeroDialogVisible);
    }, randomHeroDialogVisible === false ? HUD_THINK_SLOW : 0);
    return (react.createElement(react.Fragment, null, renderComponent && (react.createElement(Panel, { className: randomHeroDialog_module.outerContainer, style: {
            opacity: randomHeroDialogVisible ? '1.0' : '0.0',
            preTransformScale2d: randomHeroDialogVisible ? '1.0' : '0.5',
        } },
        react.createElement(Panel, { className: randomHeroDialog_module.innerContainer },
            react.createElement(Panel, { className: randomHeroDialog_module.centerContainer },
                react.createElement(Label, { className: randomHeroDialog_module.label, text: 'Select Random Hero?' })),
            react.createElement(Panel, { className: randomHeroDialog_module.buttonContainer },
                react.createElement(Button, { className: randomHeroDialog_module.button, onactivate: () => {
                        GameEvents.SendCustomGameEventToServer("on_random_hero", {});
                        setRandomHeroDialogVisible(false);
                        Game.EmitSound("ui_topmenu_select");
                    } },
                    react.createElement(Label, { className: randomHeroDialog_module.buttonLabel, text: 'YES' })),
                react.createElement(Button, { className: randomHeroDialog_module.button, onactivate: () => {
                        setRandomHeroDialogVisible(false);
                        Game.EmitSound("ui_topmenu_select");
                    } },
                    react.createElement(Label, { className: randomHeroDialog_module.buttonLabel, text: 'NO' })))),
        react.createElement(Panel, { className: randomHeroDialog_module.arrow })))));
};
/* harmony default export */ const RandomHeroDialog_RandomHeroDialog = (RandomHeroDialog_connector(RandomHeroDialog));

;// CONCATENATED MODULE: ./hud/components/HeroSelection/RemainingPlayers/RemainingPlayers.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const RemainingPlayers_module = ({"container":"jUHEGvF4z0x8URpUmy80","label":"ZVyj8Q88Go4IWx33io0f","imagesContainer":"q2pf0UCvRtQIIjyEQsMn"});
;// CONCATENATED MODULE: ./hud/components/HeroSelection/RemainingPlayers/RemainingPlayers.tsx



const RemainingPlayers_avatar = {
    width: '20px',
    height: '20px',
    border: '1px solid rgba(0, 0, 0, 0.5)',
    borderRadius: '5px',
    verticalAlign: 'center',
    horizontalAlign: 'left',
    marginLeft: '5px',
    marginRight: '5px',
};
const RemainingPlayers = () => {
    const heroes = a('HeroSelectionHeroes').heroes;
    const allPlayerIDs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    const unpickedPlayerIDs = allPlayerIDs
        .filter(id => !Object.values(heroes).some(hero => hero.playerID === id))
        .filter(id => Players.IsValidPlayerID(id));
    if (unpickedPlayerIDs.length === 0) {
        return null;
    }
    return (react.createElement(Panel, { className: RemainingPlayers_module.container },
        react.createElement(Label, { className: RemainingPlayers_module.label, text: 'Players Remaining' }),
        react.createElement(Panel, { className: RemainingPlayers_module.imagesContainer }, unpickedPlayerIDs.map(id => (react.createElement(DOTAAvatarImage, { key: id, steamid: Game.GetPlayerInfo(id).player_steamid, style: RemainingPlayers_avatar }))))));
};
/* harmony default export */ const RemainingPlayers_RemainingPlayers = (RemainingPlayers);

;// CONCATENATED MODULE: ./hud/components/HeroSelection/Timer/timer.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const timer_module = ({"container":"lQr_Sh80HW69gDfz_WEA","title":"bbJZuL9zaapxLe2R2VAj","timeContainer":"eo7jDUEpcoLndTJ74nFe","timeLabel":"Hgq8WtZoDKv9OqZ5P8NM"});
;// CONCATENATED MODULE: ./hud/components/HeroSelection/Timer/Timer.tsx



function Timer_formatTime(time) {
    let minutes = Math.floor(time % 3600 / 60);
    let seconds = Math.floor(time % 60);
    let mDisplay = minutes > 0 ? minutes < 10 ? "0" + minutes : minutes : "00";
    let sDisplay = seconds > 0 ? seconds < 10 ? "0" + seconds : seconds : "00";
    return mDisplay + ":" + sDisplay;
}
const Timer_RemainingPlayers = () => {
    const [time, setTime] = (0,react.useState)(180);
    r("hero_selection_timer_update", (event) => {
        if (event.time <= 10) {
            Game.EmitSound("ui.click_forward");
        }
        setTime(event.time);
    }, []);
    return (react.createElement(Panel, { className: timer_module.container },
        react.createElement(Label, { className: timer_module.title, text: 'Time Remaining' }),
        react.createElement(Panel, { className: timer_module.timeContainer },
            react.createElement(Label, { className: timer_module.timeLabel, style: { color: time <= 30 ? time <= 10 ? 'red' : 'orange' : 'white' }, text: Timer_formatTime(time) }))));
};
/* harmony default export */ const Timer = (Timer_RemainingPlayers);

;// CONCATENATED MODULE: ./hud/components/HeroSelection/heroSelection.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const heroSelection_module = ({"container":"Ka3RWaSlOAedm6cAtszv","background":"qK5omzuGZH2RrKtnOWeF"});
;// CONCATENATED MODULE: ./hud/components/HeroSelection/HeroSelection.tsx










const HeroSelection_mapStateToProps = (state) => ({
    focusedHero: state.heroSelectionReducer.focusedHero,
});
const HeroSelection_mapDispatchToProps = (dispatch) => ({
    setFocusedHero: (hero) => dispatch(setFocusedHero(hero)),
});
const HeroSelection_connector = connect(HeroSelection_mapStateToProps, HeroSelection_mapDispatchToProps);
const HeroSelection = (props) => {
    (0,react.useEffect)(() => {
        const scene = $("#heroSelectionScene");
        if (props.focusedHero) {
            scene.LerpToCameraEntity(props.focusedHero.camera, 1.0);
        }
        else {
            scene.LerpToCameraEntity('camera_main', 1.0);
        }
    }, [props.focusedHero]);
    r('on_focus_hero_success', (event) => {
        props.setFocusedHero(event);
        Game.EmitSound(event.sound);
    }, []);
    r("on_select_hero_error", () => {
        GameUI.SendCustomHUDError("Unable To Select Hero", "General.InvalidTarget_Invulnerable");
    }, []);
    r("on_random_hero_error", () => {
        GameUI.SendCustomHUDError("Unable To Random Hero", "General.InvalidTarget_Invulnerable");
    }, []);
    r("hero_select_generic_error", () => {
        GameUI.SendCustomHUDError("Unexpected error occured during hero select", "General.InvalidTarget_Invulnerable");
    }, []);
    return (react.createElement(Panel, { className: heroSelection_module.container, hittest: false },
        react.createElement(DOTAScenePanel, { hittest: false, id: 'heroSelectionScene', className: heroSelection_module.background, map: "heroSelection", particleonly: false, light: 'light', camera: 'camera_main' },
            react.createElement(description, { focusedHero: props.focusedHero }),
            react.createElement(RandomHeroDialog_RandomHeroDialog, null),
            react.createElement(Timer, null),
            react.createElement(RemainingPlayers_RemainingPlayers, null),
            react.createElement(HeroSelection_Heroes_Heroes, null))));
};
/* harmony default export */ const HeroSelection_HeroSelection = (HeroSelection_connector(HeroSelection));

;// CONCATENATED MODULE: ./hud/components/Loading/styles.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const Loading_styles_module = ({"container":"OuUe92r3khA53lMXfW0Z","label":"WSwmo00PLY9oEgm0tJPJ"});
;// CONCATENATED MODULE: ./hud/components/Loading/Loading.tsx



const Loading = (props) => {
    // $.Msg("REACT-RENDER: Loading rendered");
    const [isLoading, setIsLoading] = (0,react.useState)(true);
    useTimeout(() => {
        setIsLoading(false);
    }, 100);
    if (isLoading) {
        return (react.createElement(Panel, { className: Loading_styles_module.container },
            react.createElement(Label, { className: Loading_styles_module.label, text: 'LOADING...' })));
    }
    else {
        return (react.createElement(react.Fragment, null, props.children));
    }
};
/* harmony default export */ const Loading_Loading = (react.memo(Loading));

;// CONCATENATED MODULE: ./hud/components/AbilitiesShop/Styles.tsx
const AbilitiesShop_Styles_Styles = {
    OuterContainer: () => ({
        width: '100%',
        height: '100%',
        transform: 'translateX(500px)',
    }),
    InnerContainer: (visible) => ({
        horizontalAlign: "right",
        verticalAlign: "top",
        marginRight: "0px",
        marginTop: "250px",
        borderRadius: "5px",
        minWidth: "750px",
        height: "fit-children",
        zIndex: 999,
        backgroundImage: 'url("s2r://panorama/images/ability_bg.png")',
        backgroundSize: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.85)",
        flowChildren: "down",
        transition: "transform 0.55s ease-in-out 0.0s, opacity 0.55s ease-in-out 0.0s",
        transform: visible ? "translateX(-510px)" : 'translateX(0px)',
        opacity: visible ? "1.0" : "0.0",
    }),
    UnclickableContainer: () => ({
        width: '100%',
        height: 'fit-children',
        flowChildren: "down"
    }),
    TopContainer: () => ({
        flowChildren: "right",
        width: "100%",
        padding: '15px',
    }),
    AbilitiesContainer: () => ({
        flowChildren: "right",
        width: "100%",
        paddingLeft: '10px',
        paddingRight: '10px',
        paddingTop: '0px',
        paddingBottom: '10px',
    }),
};

;// CONCATENATED MODULE: ./hud/components/AbilitiesShop/Title/Styles.tsx
const AbilitiesShop_Title_Styles_Styles = {
    Container: () => ({
        width: "100%",
        backgroundColor: "rgba(30, 30, 30, 0.525)",
    }),
    Label: () => ({
        color: "rgba(200, 200, 200, 0.45)",
        fontSize: "15px",
        verticalAlign: "center",
        horizontalAlign: "left",
        fontWeight: "light",
        letterSpacing: "1.5px",
        paddingTop: "2.5px",
        paddingLeft: "10px",
    }),
    CloseBtn: (isHovering) => ({
        verticalAlign: "center",
        horizontalAlign: "right",
        height: "24px",
        width: "24px",
        padding: "2px",
        marginRight: "2.5px",
        opacity: "0.75",
        transition: "transform 0.5s ease-in-out 0.0s, background-color 0.5s ease-in-out 0.0s",
        backgroundColor: isHovering ? 'rgba(60, 60, 60, 1.0)' : 'rgba(0, 0, 0, 0.0)',
        border: isHovering ? "1px solid rgba(70, 70, 70, 1.0)" : '0px solid rgba(0, 0, 0, 1.0)',
        washColor: isHovering ? " rgba(100, 100, 100, 0.25)" : "rgba(100, 100, 100, 0.5)",
        transform: isHovering ? "scale3d(1.2, 1.2, 0)" : "scale3d(1.0, 1.0, 0)",
    }),
};

;// CONCATENATED MODULE: ./hud/components/AbilitiesShop/Title/Title.tsx




const AbilitiesShop_Title_Title_mapDispatchToProps = (dispatch) => ({
    setAbilitiesShopVisible: (visible) => dispatch(setAbilitiesShopVisible(visible)),
});
const AbilitiesShop_Title_Title_connector = connect(null, AbilitiesShop_Title_Title_mapDispatchToProps);
const AbilitiesShop_Title_Title_Title = (props) => {
    // $.Msg("REACT-RENDER: AbilitiesShop - Title rendered");
    const { selectedUnit, setAbilitiesShopVisible } = props;
    const [isHovering, setIsHovering] = (0,react.useState)(false);
    return (react.createElement(Panel, { style: AbilitiesShop_Title_Styles_Styles.Container() },
        react.createElement(Label, { style: AbilitiesShop_Title_Styles_Styles.Label(), text: "ABILITIES SHOP - " + $.Localize(Entities.GetUnitName(selectedUnit)).toUpperCase() }),
        react.createElement(Button, { onmouseover: () => setIsHovering(true), onmouseout: () => setIsHovering(false), style: AbilitiesShop_Title_Styles_Styles.CloseBtn(isHovering), onactivate: () => {
                setAbilitiesShopVisible(false);
                Game.EmitSound("ui_topmenu_select");
            } },
            react.createElement(Image, { src: "s2r://panorama/images/close_btn_white_png.vtex" }))));
};
/* harmony default export */ const AbilitiesShop_Title_Title = (react.memo(AbilitiesShop_Title_Title_connector(AbilitiesShop_Title_Title_Title)));

;// CONCATENATED MODULE: ./hud/components/AbilitiesShop/Search/Styles.tsx
const Search_Styles_Styles = {
    Container: () => ({
        width: "570px",
        flowChildren: "right",
        backgroundColor: "black",
        borderRadius: "5px",
        border: "1px solid #3d464c",
    }),
    Icon: () => ({
        backgroundImage: 'url("s2r://panorama/images/icon_search_shadow.png")',
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        height: "24px",
        width: "24px",
        washColor: "#8da1b1",
        verticalAlign: "center",
        marginTop: "-1.5px",
        marginLeft: "4px",
    }),
    SearchField: () => ({
        height: "36px",
        color: "white",
        fontSize: "20px",
        textOverflow: "clip",
        whiteSpace: "nowrap",
        border: "0px solid black",
        width: "510px",
        backgroundColor: "black",
    }),
    ClearBtn: (isHovering) => ({
        backgroundImage: 'url("s2r://panorama/images/x_close_grey_png.vtex")',
        backgroundSize: "contain",
        height: "18px",
        width: "18px",
        verticalAlign: "center",
        transition: "transform 0.2s ease-in-out 0.0s, wash-color 0.2s ease-in-out 0.0s",
        washColor: isHovering ? "rgba(100, 100, 100, 0.25)" : "rgba(100, 100, 100, 0.5)",
        transform: isHovering ? "scale3d(1.1, 1.1, 0)" : "scale3d(1.0, 1.0, 0)",
    }),
};

;// CONCATENATED MODULE: ./hud/components/AbilitiesShop/Search/Search.tsx


/**
 * TextEntry can't set text through redux-state, the value of the component doesn't update correctly
 */
const Search_Search_Search = (props) => {
    // $.Msg("REACT-RENDER: AbilitiesShop - Search rendered");
    const { setSearchValue } = props;
    const [isHovering, setIsHovering] = (0,react.useState)(false);
    return (react.createElement(Panel, { style: Search_Styles_Styles.Container() },
        react.createElement(Panel, { style: Search_Styles_Styles.Icon() }),
        react.createElement(TextEntry, { id: "abilitiesShopSearchFieldId", style: Search_Styles_Styles.SearchField(), maxchars: 50, placeholder: 'Search...', ontextentrychange: (event) => setSearchValue(event.text.toLocaleLowerCase().trim()) }),
        react.createElement(Button, { onmouseout: () => setIsHovering(false), onmouseover: () => setIsHovering(true), style: Search_Styles_Styles.ClearBtn(isHovering), onactivate: () => $("#abilitiesShopSearchFieldId").text = '' })));
};
/* harmony default export */ const AbilitiesShop_Search_Search = (react.memo(Search_Search_Search));

;// CONCATENATED MODULE: ./hud/components/AbilitiesShop/AbilityImage/Styles.tsx
const AbilityImage_Styles_Styles = {
    AbilityImage: (hasSearchedValue, isSearched, isRequiredLevel, isHovering) => ({
        width: '36px',
        height: '36px',
        margin: '3px',
        transition: 'transform 0.05s ease-in-out 0.0s',
        washColor: (hasSearchedValue && !isSearched) || !isRequiredLevel ? 'grey' : 'none',
        border: hasSearchedValue && isSearched ? '1px solid orange' : '0px solid black',
        padding: isHovering ? '0px' : '1px',
    }),
};

;// CONCATENATED MODULE: ./hud/components/AbilitiesShop/AbilityImage/AbilityImage.tsx




const AbilityImage = (props) => {
    // $.Msg("REACT-RENDER: AbilitiesShop - AbilityImage rendered");
    const { selectedUnit, shopAbility, searchValue } = props;
    const { name, aliases, requiredLevel } = shopAbility;
    const [isRequiredLevel, setIsRequiredLevel] = (0,react.useState)(Entities.GetLevel(selectedUnit) >= requiredLevel);
    const [isSearched, setIsSearched] = (0,react.useState)(false);
    const [isHovering, setIsHovering] = (0,react.useState)(false);
    useInterval(() => {
        setIsRequiredLevel(Entities.GetLevel(selectedUnit) >= requiredLevel);
    }, HUD_THINK_MEDIUM);
    (0,react.useEffect)(() => {
        let isSearched = false;
        Object.values(aliases).forEach(alias => {
            if (alias.match(searchValue)) {
                isSearched = true;
            }
        });
        setIsSearched(isSearched);
    }, [aliases, searchValue]);
    const hasSearchValue = searchValue.length > 0;
    return (react.createElement(Button, { className: 'container', id: "ability_shop_image_" + name, style: AbilityImage_Styles_Styles.AbilityImage(hasSearchValue, isSearched, isRequiredLevel, isHovering), oncontextmenu: () => {
            $('#ability_shop_image_' + name).RemoveClass('btnClicked');
            $('#ability_shop_image_' + name).AddClass('btnClicked');
            GameEvents.SendCustomGameEventToServer("purchase_ability", { entindex: selectedUnit, abilityname: name });
        }, onmouseout: () => {
            setIsHovering(false);
            $.DispatchEvent("DOTAHideAbilityTooltip", $("#ability_shop_image_" + name));
        }, onmouseover: () => {
            setIsHovering(true);
            $.DispatchEvent("DOTAShowAbilityTooltipForEntityIndex", $("#ability_shop_image_" + name), name, selectedUnit);
        } },
        react.createElement(DOTAAbilityImage, { abilityname: name })));
};
/* harmony default export */ const AbilityImage_AbilityImage = (react.memo(AbilityImage));

;// CONCATENATED MODULE: ./hud/components/AbilitiesShop/RegularAbilities/Styles.tsx
const RegularAbilities_Styles_Styles = {
    Container: () => ({
        width: "50%",
        margin: '5px',
        flowChildren: 'down',
    }),
    TitleContainer: () => ({
        width: "100%",
        backgroundColor: "rgba(0, 0, 0, 1.0)",
        borderBottom: "1px solid rgba(50, 50, 50, 0.5)",
        fontSize: "13px",
        color: "rgb(175, 175, 175)",
        textAlign: "left",
        fontFamily: "fantasy",
        paddingTop: '3px',
        paddingBottom: '3px',
        paddingLeft: '5px',
        paddingRight: '5px',
        letterSpacing: "1.35px"
    }),
    Title: () => ({
        verticalAlign: 'center',
        horizontalAlign: 'left',
        fontSize: "13px",
        color: "rgb(175, 175, 175)",
        fontFamily: "fantasy",
        letterSpacing: "1.35px"
    }),
    AbilityCountLabel: () => ({
        verticalAlign: 'center',
        horizontalAlign: 'right',
        fontSize: "13px",
        color: "rgb(175, 175, 175)",
        fontFamily: "fantasy",
        letterSpacing: "1.35px"
    }),
    AbilitiesContainer: () => ({
        width: '100%',
        minHeight: '200px',
        backgroundImage: 'url("s2r://panorama/images/inventory_item_well.png")',
        backgroundSize: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.35)",
        flowChildren: 'right-wrap',
        padding: '10px',
    }),
    CenterLabel: () => ({
        verticalAlign: 'center',
        horizontalAlign: 'center',
        fontSize: '14px',
    })
};

;// CONCATENATED MODULE: ./hud/components/AbilitiesShop/RegularAbilities/RegularAbilities.tsx




const RegularAbilities = (props) => {
    // $.Msg("REACT-RENDER: AbilitiesShop - RegularAbilities rendered");
    const { selectedUnit, regularAbilities, isLoadingAbilities, searchValue } = props;
    const playerOwnerID = Entities.GetPlayerOwnerID(selectedUnit);
    const nettable = playerOwnerID !== -1 ? Object.values(a('RegularAbilities')[playerOwnerID]) : [];
    return (react.createElement(Panel, { style: RegularAbilities_Styles_Styles.Container() },
        react.createElement(Panel, { style: RegularAbilities_Styles_Styles.TitleContainer() },
            react.createElement(Label, { text: 'Regular Abilities', style: RegularAbilities_Styles_Styles.Title() }),
            react.createElement(Label, { text: nettable.length + ' / 5', style: RegularAbilities_Styles_Styles.AbilityCountLabel() }),
            react.createElement(Label, { text: nettable.length + ' / 5', style: RegularAbilities_Styles_Styles.AbilityCountLabel() })),
        react.createElement(Panel, { style: RegularAbilities_Styles_Styles.AbilitiesContainer() }, regularAbilities.map(regularAbility => {
            return (react.createElement(AbilityImage_AbilityImage, { key: regularAbility.name, selectedUnit: selectedUnit, shopAbility: regularAbility, searchValue: searchValue }));
        }))));
};
/* harmony default export */ const RegularAbilities_RegularAbilities = (react.memo(RegularAbilities));

;// CONCATENATED MODULE: ./hud/components/AbilitiesShop/UltimateAbilities/Styles.tsx
const UltimateAbilities_Styles_Styles = {
    Container: () => ({
        width: "50%",
        margin: '5px',
        flowChildren: 'down',
    }),
    TitleContainer: () => ({
        width: "100%",
        backgroundColor: "rgba(0, 0, 0, 1.0)",
        borderBottom: "1px solid rgba(50, 50, 50, 0.5)",
        fontSize: "13px",
        color: "rgb(175, 175, 175)",
        textAlign: "left",
        fontFamily: "fantasy",
        paddingTop: '3px',
        paddingBottom: '3px',
        paddingLeft: '5px',
        paddingRight: '5px',
        letterSpacing: "1.35px"
    }),
    Title: () => ({
        verticalAlign: 'center',
        horizontalAlign: 'left',
        fontSize: "13px",
        color: "rgb(175, 175, 175)",
        fontFamily: "fantasy",
        letterSpacing: "1.35px"
    }),
    AbilityCountLabel: () => ({
        verticalAlign: 'center',
        horizontalAlign: 'right',
        fontSize: "13px",
        color: "rgb(175, 175, 175)",
        fontFamily: "fantasy",
        letterSpacing: "1.35px"
    }),
    AbilitiesContainer: () => ({
        width: '100%',
        minHeight: '200px',
        backgroundImage: 'url("s2r://panorama/images/inventory_item_well.png")',
        backgroundSize: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.35)",
        flowChildren: 'right-wrap',
        padding: '10px',
    }),
    CenterLabel: () => ({
        verticalAlign: 'center',
        horizontalAlign: 'center',
        fontSize: '14px',
    })
};

;// CONCATENATED MODULE: ./hud/components/AbilitiesShop/UltimateAbilities/UltimateAbilities.tsx




const UltimateAbilities = (props) => {
    // $.Msg("REACT-RENDER: AbilitiesShop - UltimateAbilities rendered");
    const { selectedUnit, ultimateAbilities, isLoadingAbilities, searchValue } = props;
    const playerOwnerID = Entities.GetPlayerOwnerID(selectedUnit);
    const nettable = playerOwnerID !== -1 ? Object.values(a('UltimateAbilities')[playerOwnerID]) : [];
    return (react.createElement(Panel, { style: UltimateAbilities_Styles_Styles.Container() },
        react.createElement(Panel, { style: UltimateAbilities_Styles_Styles.TitleContainer() },
            react.createElement(Label, { text: 'Ultimate Abilities', style: UltimateAbilities_Styles_Styles.Title() }),
            react.createElement(Label, { text: nettable.length + ' / 1', style: UltimateAbilities_Styles_Styles.AbilityCountLabel() })),
        react.createElement(Panel, { style: UltimateAbilities_Styles_Styles.AbilitiesContainer() }, ultimateAbilities.map(ultimateAbility => {
            return (react.createElement(AbilityImage_AbilityImage, { key: ultimateAbility.name, selectedUnit: selectedUnit, shopAbility: ultimateAbility, searchValue: searchValue }));
        }))));
};
/* harmony default export */ const UltimateAbilities_UltimateAbilities = (react.memo(UltimateAbilities));

;// CONCATENATED MODULE: ./hud/components/AbilitiesShop/AbilitiesPoints/Styles.tsx
const AbilitiesPoints_Styles_Styles = {
    Container: () => ({
        width: "150px",
        height: "38px",
        backgroundImage: 'url("s2r://panorama/images/inventory_item_well.png")',
        backgroundSize: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        marginLeft: '5px',
        padding: '5px',
        borderRadius: '5px',
        border: '1px solid rgba(100, 100, 100, 0.3)',
    }),
    LabelContainer: () => ({
        height: '100%',
        width: '100%',
        paddingTop: '1px',
        flowChildren: 'right'
    }),
    Icon: () => ({
        verticalAlign: 'center',
        horizontalAlign: 'left',
        backgroundImage: 'url("s2r://panorama/images/icon_abilities_shop_points.png")',
        backgroundSize: "100%",
        height: '14px',
        width: '14px',
        washColor: 'rgba(100, 100, 100, 0.45)',
        marginLeft: '5px',
    }),
    TextLabel: () => ({
        verticalAlign: 'center',
        textAlign: 'center',
        fontSize: '12px',
        color: 'rgba(200, 200, 200, 0.75)',
        width: '70%',
    }),
    NumberLabel: (hasPoints) => ({
        verticalAlign: 'center',
        textAlign: 'center',
        fontSize: '20px',
        color: hasPoints ? 'orange' : "rgba(200, 200, 200, 0.75)",
        fontWeight: 'bold',
        width: '30%',
        marginLeft: '-10px',
    }),
};

;// CONCATENATED MODULE: ./hud/components/AbilitiesShop/AbilitiesPoints/AbilitiesPoints.tsx




const AbilitiesPoints = (props) => {
    // $.Msg("REACT-RENDER: AbilitiesShop - AbilitiesPoints rendered");
    const { selectedUnit, text } = props;
    const [abilityPoints, setAbilityPoints] = (0,react.useState)(Entities.GetAbilityPoints(selectedUnit));
    useInterval(() => {
        setAbilityPoints(Entities.GetAbilityPoints(selectedUnit));
    }, HUD_THINK_MEDIUM);
    return (react.createElement(Panel, { style: AbilitiesPoints_Styles_Styles.Container() },
        react.createElement(Panel, { style: AbilitiesPoints_Styles_Styles.LabelContainer() },
            react.createElement(Label, { text: text, style: AbilitiesPoints_Styles_Styles.TextLabel() }),
            react.createElement(Label, { text: abilityPoints, style: AbilitiesPoints_Styles_Styles.NumberLabel(abilityPoints !== 0) }))));
};
/* harmony default export */ const AbilitiesPoints_AbilitiesPoints = (react.memo(AbilitiesPoints));

;// CONCATENATED MODULE: ./hud/components/AbilitiesShop/AbilitiesShop.tsx












const AbilitiesShop_mapStateToProps = (state) => ({
    visible: state.abilitiesShopReducer.visible,
});
const AbilitiesShop_mapDispatchToProps = (dispatch) => ({
    setShopVisible: (visible) => dispatch(setAbilitiesShopVisible(visible)),
});
const AbilitiesShop_connector = connect(AbilitiesShop_mapStateToProps, AbilitiesShop_mapDispatchToProps);
const AbilitiesShop = (props) => {
    // $.Msg("REACT-RENDER: AbilitiesShop rendered");
    const { visible, selectedUnit, setShopVisible } = props;
    const [regularAbilities, setRegularAbilities] = (0,react.useState)([]);
    const [ultimateAbilities, setUltimateAbilities] = (0,react.useState)([]);
    const [isLoadingAbilities, setIsLoadingAbilities] = (0,react.useState)(false);
    const [searchValue, setSearchValue] = (0,react.useState)('');
    const [renderComponent, setRenderComponent] = (0,react.useState)(false);
    useTimeout(() => {
        setRenderComponent(visible);
    }, visible === false ? HUD_THINK_SLOW : 0);
    (0,react.useEffect)(() => {
        if (visible) {
            setRegularAbilities([]);
            setUltimateAbilities([]);
            setIsLoadingAbilities(true);
            GameEvents.SendCustomGameEventToServer("fetch_shop_abilities", { entindex: selectedUnit });
        }
    }, [selectedUnit, visible]);
    r('fetch_shop_abilities_ok', (event) => {
        setRegularAbilities(Object.values(event.regularAbilities));
        setUltimateAbilities(Object.values(event.ultimateAbilities));
        setIsLoadingAbilities(false);
    }, []);
    r("fetch_shop_abilities_error", (event) => {
        GameUI.SendCustomHUDError(event.errorMsg, "General.Item_CantPickUp");
        setIsLoadingAbilities(false);
    }, []);
    r("purchase_ability_error", (event) => {
        GameUI.SendCustomHUDError(event.errorMsg, "General.Item_CantPickUp");
    }, []);
    r("purchase_ability_ok", (event) => {
        Game.EmitSound("General.Buy");
    }, []);
    r("dota_player_update_query_unit", (event) => {
        const unit = Players.GetQueryUnit(Players.GetLocalPlayer());
        if (Entities.GetUnitName(unit) === 'shopkeeper_abilities') {
            setShopVisible(true);
        }
    }, [setShopVisible]);
    r("dota_player_update_selected_unit", (event) => {
        const unit = Players.GetLocalPlayerPortraitUnit();
        if (Entities.GetUnitName(unit) === 'shopkeeper_abilities') {
            setShopVisible(true);
        }
    }, [setShopVisible]);
    i('Cancelled', () => {
        if (visible) {
            Game.EmitSound("ui_topmenu_select");
        }
        setShopVisible(false);
    }, [visible, setShopVisible]);
    return (react.createElement(Panel, { hittest: false, style: AbilitiesShop_Styles_Styles.OuterContainer() }, renderComponent && (react.createElement(Panel, { className: 'Invisible', style: AbilitiesShop_Styles_Styles.InnerContainer(visible) },
        react.createElement(Panel, { onactivate: () => false, style: AbilitiesShop_Styles_Styles.UnclickableContainer() },
            react.createElement(AbilitiesShop_Title_Title, { selectedUnit: selectedUnit }),
            react.createElement(Panel, { style: AbilitiesShop_Styles_Styles.TopContainer() },
                react.createElement(AbilitiesShop_Search_Search, { setSearchValue: setSearchValue }),
                react.createElement(AbilitiesPoints_AbilitiesPoints, { selectedUnit: selectedUnit, text: 'Ability Points:' })),
            react.createElement(Panel, { onactivate: undefined, style: AbilitiesShop_Styles_Styles.AbilitiesContainer() },
                react.createElement(RegularAbilities_RegularAbilities, { selectedUnit: selectedUnit, regularAbilities: regularAbilities, isLoadingAbilities: isLoadingAbilities, searchValue: searchValue }),
                react.createElement(UltimateAbilities_UltimateAbilities, { selectedUnit: selectedUnit, ultimateAbilities: ultimateAbilities, isLoadingAbilities: isLoadingAbilities, searchValue: searchValue })))))));
};
/* harmony default export */ const AbilitiesShop_AbilitiesShop = (react.memo(AbilitiesShop_connector(AbilitiesShop)));

;// CONCATENATED MODULE: ./hud/components/FloatingContainer/HealthBar/styles.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const FloatingContainer_HealthBar_styles_module = ({"container":"DUu5zaS_QmbcNqAlrUqi"});
;// CONCATENATED MODULE: ./hud/components/FloatingContainer/HealthBar/HealthBar.tsx




const HealthBar_HealthBar_HealthBar = (props) => {
    // $.Msg("REACT-RENDER: FloatingBars - HealthBar rendered");
    const { unit } = props;
    const [health, setHealth] = (0,react.useState)(Entities.GetHealth(unit));
    const [maxHealth, setMaxHealth] = (0,react.useState)(Entities.GetMaxHealth(unit));
    useInterval(() => {
        setHealth(Entities.GetHealth(unit));
        setMaxHealth(Entities.GetMaxHealth(unit));
    }, HUD_THINK_FAST);
    return (react.createElement(Panel, { hittest: false, className: FloatingContainer_HealthBar_styles_module.container },
        react.createElement(ProgressBar, { min: 0, max: maxHealth, value: health, className: Entities.IsEnemy(unit) ? 'healthProgressBarEnemy' : 'healthProgressBar', style: {
                width: "100%",
                height: "100%",
                borderRadius: "0px",
            } })));
};
/* harmony default export */ const FloatingContainer_HealthBar_HealthBar = (react.memo(HealthBar_HealthBar_HealthBar));

;// CONCATENATED MODULE: ./hud/components/FloatingContainer/ManaBar/styles.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const FloatingContainer_ManaBar_styles_module = ({"container":"V2ljavdVMtjkKST7Q2LA"});
;// CONCATENATED MODULE: ./hud/components/FloatingContainer/ManaBar/ManaBar.tsx




const ManaBar_ManaBar_ManaBar = (props) => {
    // $.Msg("REACT-RENDER: FloatingBars - ManaBar rendered");
    const { unit } = props;
    const [mana, setMana] = (0,react.useState)(Entities.GetMana(unit));
    const [maxMana, setMaxMana] = (0,react.useState)(Entities.GetMaxMana(unit));
    useInterval(() => {
        setMana(Entities.GetMana(unit));
        setMaxMana(Entities.GetMaxMana(unit));
    }, HUD_THINK_FAST);
    return (react.createElement(Panel, { hittest: false, className: FloatingContainer_ManaBar_styles_module.container, style: { visibility: maxMana > 0 ? 'visible' : 'collapse' } },
        react.createElement(ProgressBar, { min: 0, max: maxMana, value: mana, className: 'manaProgressBar', style: {
                width: "100%",
                height: "100%",
                borderRadius: "0px",
            } })));
};
/* harmony default export */ const FloatingContainer_ManaBar_ManaBar = (react.memo(ManaBar_ManaBar_ManaBar));

;// CONCATENATED MODULE: ./hud/components/FloatingContainer/Abilities/Ability/styles.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const Ability_styles_module = ({"container":"I9CsTvbuRcg3wKQxlqxx","label":"hY1zGmuZILkJENYK5bnG","image":"rJqIQZlVhQ31JPuOtzMM"});
;// CONCATENATED MODULE: ./hud/components/FloatingContainer/Abilities/Ability/Ability.tsx





const Ability_Ability_Ability = (props) => {
    const { id, name } = props;
    const setAbilities = (0,react.useContext)(SetAbilitiesContext);
    const [posY, setPosY] = (0,react.useState)(75);
    const [opacity, setOpacity] = (0,react.useState)('1.0');
    useInterval(() => {
        setPosY(prevState => prevState - 0.5);
    }, 10);
    useTimeout(() => {
        setOpacity('0.0');
    }, 750);
    useTimeout(() => {
        setAbilities(prevState => prevState.filter(ability => ability.id !== id));
    }, 1000);
    return (react.createElement(Panel, { className: Ability_styles_module.container, style: {
            position: "0px " + posY + "px " + "0px",
            opacity: opacity,
        } },
        react.createElement(DOTAAbilityImage, { showtooltip: false, abilityname: name, className: Ability_styles_module.image }),
        react.createElement(Label, { html: true, text: $.Localize("DOTA_Tooltip_Ability_" + name), className: Ability_styles_module.label })));
};
/* harmony default export */ const Abilities_Ability_Ability = (react.memo(Ability_Ability_Ability));

;// CONCATENATED MODULE: ./hud/components/FloatingContainer/Abilities/styles.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const Abilities_styles_module = ({"container":"NP_gCkcrMo_3Wk3nIZpv"});
;// CONCATENATED MODULE: ./hud/components/FloatingContainer/Abilities/Abilities.tsx




const SetAbilitiesContext = react.createContext(() => { });
const Abilities_Abilities_Abilities = (props) => {
    // $.Msg("REACT-RENDER: CloatingContainer - Abilities rendered");
    const { unit } = props;
    const [abilities, setAbilities] = (0,react.useState)([]);
    const id = (0,react.useRef)(Number.MIN_SAFE_INTEGER);
    r('on_ability_used', (event) => {
        if (unit === event.unit) {
            id.current = id.current + 1;
            setAbilities(prevState => [...prevState, { name: event.abilityname, id: id.current }]);
        }
    }, [unit]);
    return (react.createElement(Panel, { hittest: false, className: Abilities_styles_module.container },
        react.createElement(SetAbilitiesContext.Provider, { value: setAbilities }, abilities.map((ability) => {
            return (react.createElement(Abilities_Ability_Ability, { key: ability.id, id: ability.id, name: ability.name }));
        }))));
};
/* harmony default export */ const FloatingContainer_Abilities_Abilities = (react.memo(Abilities_Abilities_Abilities));

;// CONCATENATED MODULE: ./hud/components/FloatingContainer/styles.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const FloatingContainer_styles_module = ({"container":"FPU_305Ax2d42cgpcYZE"});
;// CONCATENATED MODULE: ./hud/utils/ObjectUtils.ts
class ObjectUtils {
    static areObjectsEqual(o1, o2) {
        return Object.keys(o1).length === Object.keys(o2).length &&
            Object.keys(o1).every(p => o1[p] === o2[p]);
    }
}

;// CONCATENATED MODULE: ./hud/components/FloatingContainer/FloatingContainer.tsx









const FloatingContainer = (props) => {
    // $.Msg("REACT-RENDER: FloatingBars rendered");
    const units = a('FloatingBarUnits').units;
    const [floatingBars, setFloatingBars] = (0,react.useState)([]);
    useInterval(() => {
        const centerOrigin = Game.ScreenXYToWorld(Game.GetScreenWidth() / 2, Game.GetScreenHeight() / 2);
        const scale = 1080 / Game.GetScreenHeight();
        const mFloatingBars = Entities.GetAllEntities()
            .filter(entity => Entities.IsSelectable(entity))
            .filter(entity => Object.values(units).includes(entity))
            .filter(entity => Game.Length2D(centerOrigin, Entities.GetAbsOrigin(entity)) < 3500)
            .map(unit => {
            const unitOrigin = Entities.GetAbsOrigin(unit);
            const offsetX = (centerOrigin[0] - unitOrigin[0]) / 20;
            const offsetY = (centerOrigin[1] - unitOrigin[1]) / 20;
            const offsetZ = Entities.GetHealthBarOffset(unit) + 100;
            const offsetScreenX = scale * Game.WorldToScreenX(unitOrigin[0] + offsetX, unitOrigin[1] + offsetY, unitOrigin[2] + offsetZ);
            const offsetScreenY = scale * Game.WorldToScreenY(unitOrigin[0] + offsetX, unitOrigin[1] + offsetY, unitOrigin[2] + offsetZ);
            const screenWorldPosition = GameUI.GetScreenWorldPosition([
                Game.WorldToScreenX(unitOrigin[0], unitOrigin[1], unitOrigin[2]),
                Game.WorldToScreenY(unitOrigin[0], unitOrigin[1], unitOrigin[2])
            ]);
            return {
                unit,
                screenX: offsetScreenX,
                screenY: offsetScreenY,
                visible: screenWorldPosition !== null
            };
        })
            .filter(screenPosition => screenPosition.visible);
        if (!TableUtils.areTablesEqual(mFloatingBars, floatingBars, ObjectUtils.areObjectsEqual)) {
            setFloatingBars(mFloatingBars);
        }
    }, 5);
    return (react.createElement(react.Fragment, null, floatingBars.map(floatingBar => {
        const { unit, screenX, screenY } = floatingBar;
        return (react.createElement(Panel, { key: unit, className: FloatingContainer_styles_module.container, style: { position: (screenX - 125) + "px " + (screenY - 500) + "px " + 0 + "px" } },
            Entities.GetMaxMana(unit) > 0 && (react.createElement(FloatingContainer_ManaBar_ManaBar, { unit: unit })),
            react.createElement(FloatingContainer_HealthBar_HealthBar, { unit: unit }),
            react.createElement(FloatingContainer_Abilities_Abilities, { unit: unit })));
    })));
};
/* harmony default export */ const FloatingContainer_FloatingContainer = (react.memo(FloatingContainer));

;// CONCATENATED MODULE: ./hud/components/Messages/Message/styles.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const Message_styles_module = ({"container":"Qm0Gz9cXpfuJL9XFfaew","messageContainer":"_9hqRW4Wk5UWQAPLS6BX","heroImage":"GN276OBerpLoUddazK3_","arrowImage":"fR1XxDdhIsEzlkiCWEv2","playernameLabel":"zICe0uDq6NUvo9ADJ8fQ","textLabel":"e482FRTP_pyZP0FI4Wzt","unitLabel":"EZ2t5FRDo4vW2fxgtxfQ","enemyOrAllyLabel":"P7CvFs15hWbprJtHzvWF"});
;// CONCATENATED MODULE: ./hud/components/Messages/Message/AbilityMessage/styles.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const AbilityMessage_styles_module = ({"abilityImage":"O4SZDqMbSbGjXFYpKSU5"});
;// CONCATENATED MODULE: ./hud/components/Messages/Message/AbilityMessage/AbilityMessage.tsx




const getText = (ability, unit) => {
    const localizedAbilityName = $.Localize("DOTA_Tooltip_Ability_" + Abilities.GetAbilityName(ability));
    const cooldown = Abilities.GetCooldownTimeRemaining(ability);
    const abilityLevel = Abilities.GetLevel(ability);
    const manaCost = Abilities.GetManaCost(ability);
    const currentMana = Entities.GetMana(unit);
    const isEnemy = Entities.IsEnemy(unit);
    if (isEnemy) {
        return localizedAbilityName + ': Beware';
    }
    if (abilityLevel === 0) {
        return localizedAbilityName + ': Not Learned - ( Level ' + abilityLevel + ' )';
    }
    if (cooldown > 0) {
        return localizedAbilityName + ': On Cooldown - ( ' + Math.ceil(cooldown).toFixed(0) + " Seconds Remain )";
    }
    if (manaCost > currentMana) {
        return localizedAbilityName + ': Not Enough Mana - ( Need ' + (manaCost - currentMana) + ' More )';
    }
    return localizedAbilityName + ': Ready - ( Level ' + abilityLevel + ' )';
};
const AbilityMessage = (props) => {
    const { data } = props;
    const { unit, ability, broadcaster } = data;
    const unitOwnerPlayerID = Entities.GetPlayerOwnerID(unit);
    const unitOwnerPlayerName = Players.GetPlayerName(Entities.GetPlayerOwnerID(unit));
    const isUnitEnemy = Entities.IsEnemy(unit);
    const isUnitHero = Entities.IsHero(unit);
    const unitName = Entities.GetUnitName(unit);
    return (react.createElement(Panel, { className: Message_styles_module.messageContainer },
        react.createElement(DOTAHeroImage, { heroimagestyle: 'icon', heroname: Entities.GetUnitName(Players.GetPlayerHeroEntityIndex(broadcaster)), className: Message_styles_module.heroImage }),
        react.createElement(Label, { text: Players.GetPlayerName(broadcaster), className: Message_styles_module.playernameLabel, style: { color: toColor(broadcaster) } }),
        unitOwnerPlayerID !== broadcaster && (react.createElement(react.Fragment, null,
            react.createElement(Image, { className: Message_styles_module.arrowImage, src: 'file://{images}/control_icons/chat_wheel_icon.png' }),
            react.createElement(Label, { html: true, className: Message_styles_module.enemyOrAllyLabel, text: isUnitEnemy ? 'Enemy' : 'Ally' }),
            isUnitHero && (react.createElement(DOTAHeroImage, { heroimagestyle: 'icon', heroname: unitName, className: Message_styles_module.heroImage })),
            !isUnitHero && (react.createElement(Label, { className: Message_styles_module.unitLabel, text: $.Localize(unitName) })),
            react.createElement(Label, { text: isUnitHero ? unitOwnerPlayerName : '(' + unitOwnerPlayerName + ')', className: Message_styles_module.playernameLabel, style: { color: toColor(unitOwnerPlayerID) } }))),
        react.createElement(Image, { className: Message_styles_module.arrowImage, src: 'file://{images}/control_icons/chat_wheel_icon.png' }),
        react.createElement(DOTAAbilityImage, { className: AbilityMessage_styles_module.abilityImage, abilityname: Abilities.GetAbilityName(ability), showtooltip: false }),
        react.createElement(Label, { html: true, className: Message_styles_module.textLabel, text: getText(ability, unit) })));
};
/* harmony default export */ const AbilityMessage_AbilityMessage = (react.memo(AbilityMessage));

;// CONCATENATED MODULE: ./hud/components/Messages/Message/ItemMessage/styles.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const ItemMessage_styles_module = ({"itemImage":"LxsBJ3HItXKabicrARm8"});
;// CONCATENATED MODULE: ./hud/components/Messages/Message/ItemMessage/ItemMessage.tsx




const ItemMessage_getText = (item, unit) => {
    const localizedItemName = $.Localize("DOTA_Tooltip_ability_" + Abilities.GetAbilityName(item));
    const cooldown = Abilities.GetCooldownTimeRemaining(item);
    const manaCost = Abilities.GetManaCost(item);
    const currentMana = Entities.GetMana(unit);
    const isEnemy = Entities.IsEnemy(unit);
    if (isEnemy) {
        return localizedItemName + ': Beware';
    }
    if (cooldown > 0) {
        return localizedItemName + ': On Cooldown - ( ' + Math.ceil(cooldown).toFixed(0) + " Seconds Remain )";
    }
    if (manaCost > currentMana) {
        return localizedItemName + ': Not Enough Mana - ( Need ' + (manaCost - currentMana) + ' More )';
    }
    return localizedItemName + ': Ready';
};
const ItemMessage = (props) => {
    const { data } = props;
    const { unit, item, broadcaster } = data;
    const unitOwnerPlayerID = Entities.GetPlayerOwnerID(unit);
    const unitOwnerPlayerName = Players.GetPlayerName(Entities.GetPlayerOwnerID(unit));
    const isUnitEnemy = Entities.IsEnemy(unit);
    const isUnitHero = Entities.IsHero(unit);
    const unitName = Entities.GetUnitName(unit);
    return (react.createElement(Panel, { className: Message_styles_module.messageContainer },
        react.createElement(DOTAHeroImage, { heroimagestyle: 'icon', heroname: Entities.GetUnitName(Players.GetPlayerHeroEntityIndex(broadcaster)), className: Message_styles_module.heroImage }),
        react.createElement(Label, { text: Players.GetPlayerName(broadcaster), className: Message_styles_module.playernameLabel, style: { color: toColor(broadcaster) } }),
        unitOwnerPlayerID !== broadcaster && (react.createElement(react.Fragment, null,
            react.createElement(Image, { className: Message_styles_module.arrowImage, src: 'file://{images}/control_icons/chat_wheel_icon.png' }),
            react.createElement(Label, { html: true, className: Message_styles_module.enemyOrAllyLabel, text: isUnitEnemy ? 'Enemy' : 'Ally' }),
            isUnitHero && (react.createElement(DOTAHeroImage, { heroimagestyle: 'icon', heroname: unitName, className: Message_styles_module.heroImage })),
            !isUnitHero && (react.createElement(Label, { className: Message_styles_module.unitLabel, text: $.Localize(unitName) })),
            react.createElement(Label, { text: isUnitHero ? unitOwnerPlayerName : '(' + unitOwnerPlayerName + ')', className: Message_styles_module.playernameLabel, style: { color: toColor(unitOwnerPlayerID) } }))),
        react.createElement(Image, { className: Message_styles_module.arrowImage, src: 'file://{images}/control_icons/chat_wheel_icon.png' }),
        react.createElement(DOTAItemImage, { className: ItemMessage_styles_module.itemImage, itemname: Abilities.GetAbilityName(item), showtooltip: false }),
        react.createElement(Label, { html: true, className: Message_styles_module.textLabel, text: ItemMessage_getText(item, unit) })));
};
/* harmony default export */ const ItemMessage_ItemMessage = (react.memo(ItemMessage));

;// CONCATENATED MODULE: ./hud/components/Messages/Message/ModifierMessage/styles.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const ModifierMessage_styles_module = ({"modifierImage":"zAuZAilOPlJYIt2x7f6k","modifierLabel":"eXvfdQmRngiXURS76WNS","modifierExtraLabel":"dOeb8CzK6wcC1LDrvhwe"});
;// CONCATENATED MODULE: ./hud/components/Messages/Message/ModifierMessage/ModifierMessage.tsx




const getExtraText = (modifier, unit) => {
    const remaining = Buffs.GetRemainingTime(unit, modifier);
    if (remaining > 0) {
        return ' ( ' + Math.ceil(remaining).toFixed(0) + " Seconds Remain )";
    }
    return '';
};
const ModifierMessage = (props) => {
    const { data } = props;
    const { unit, modifier, broadcaster } = data;
    const unitOwnerPlayerID = Entities.GetPlayerOwnerID(unit);
    const unitOwnerPlayerName = Players.GetPlayerName(Entities.GetPlayerOwnerID(unit));
    const isUnitEnemy = Entities.IsEnemy(unit);
    const isUnitHero = Entities.IsHero(unit);
    const unitName = Entities.GetUnitName(unit);
    return (react.createElement(Panel, { className: Message_styles_module.messageContainer },
        react.createElement(DOTAHeroImage, { heroimagestyle: 'icon', heroname: Entities.GetUnitName(Players.GetPlayerHeroEntityIndex(broadcaster)), className: Message_styles_module.heroImage }),
        react.createElement(Label, { text: Players.GetPlayerName(broadcaster), className: Message_styles_module.playernameLabel, style: { color: toColor(broadcaster) } }),
        unitOwnerPlayerID !== broadcaster && (react.createElement(react.Fragment, null,
            react.createElement(Image, { className: Message_styles_module.arrowImage, src: 'file://{images}/control_icons/chat_wheel_icon.png' }),
            react.createElement(Label, { html: true, className: Message_styles_module.enemyOrAllyLabel, text: isUnitEnemy ? 'Enemy' : 'Ally' }),
            isUnitHero && (react.createElement(DOTAHeroImage, { heroimagestyle: 'icon', heroname: unitName, className: Message_styles_module.heroImage })),
            !isUnitHero && (react.createElement(Label, { className: Message_styles_module.unitLabel, text: $.Localize(unitName) })),
            react.createElement(Label, { text: isUnitHero ? unitOwnerPlayerName : '(' + unitOwnerPlayerName + ')', className: Message_styles_module.playernameLabel, style: { color: toColor(unitOwnerPlayerID) } }))),
        react.createElement(Image, { className: Message_styles_module.arrowImage, src: 'file://{images}/control_icons/chat_wheel_icon.png' }),
        react.createElement(Label, { html: true, className: Message_styles_module.textLabel, text: 'Affected By: ' }),
        react.createElement(DOTAAbilityImage, { className: ModifierMessage_styles_module.modifierImage, abilityname: Abilities.GetAbilityName(Buffs.GetAbility(unit, modifier)), showtooltip: false }),
        react.createElement(Label, { className: ModifierMessage_styles_module.modifierLabel, style: { color: Buffs.IsDebuff(unit, modifier) ? 'red' : 'green' }, text: $.Localize("DOTA_Tooltip_" + Buffs.GetName(unit, modifier)) }),
        react.createElement(Label, { className: ModifierMessage_styles_module.modifierExtraLabel, text: getExtraText(modifier, unit) })));
};
/* harmony default export */ const ModifierMessage_ModifierMessage = (react.memo(ModifierMessage));

;// CONCATENATED MODULE: ./hud/components/Messages/Message/HealthMessage/styles.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const HealthMessage_styles_module = ({"healthLabel":"zgs7CbszT6cmSH1mNwzu"});
;// CONCATENATED MODULE: ./hud/components/Messages/Message/HealthMessage/HealthMessage.tsx




const HealthMessage = (props) => {
    const { data } = props;
    const { unit, broadcaster } = data;
    const unitOwnerPlayerID = Entities.GetPlayerOwnerID(unit);
    const unitOwnerPlayerName = Players.GetPlayerName(Entities.GetPlayerOwnerID(unit));
    const isUnitEnemy = Entities.IsEnemy(unit);
    const isUnitHero = Entities.IsHero(unit);
    const unitName = Entities.GetUnitName(unit);
    return (react.createElement(Panel, { className: Message_styles_module.messageContainer },
        react.createElement(DOTAHeroImage, { heroimagestyle: 'icon', heroname: Entities.GetUnitName(Players.GetPlayerHeroEntityIndex(broadcaster)), className: Message_styles_module.heroImage }),
        react.createElement(Label, { text: Players.GetPlayerName(broadcaster), className: Message_styles_module.playernameLabel, style: { color: toColor(broadcaster) } }),
        unitOwnerPlayerID !== broadcaster && (react.createElement(react.Fragment, null,
            react.createElement(Image, { className: Message_styles_module.arrowImage, src: 'file://{images}/control_icons/chat_wheel_icon.png' }),
            react.createElement(Label, { html: true, className: Message_styles_module.enemyOrAllyLabel, text: isUnitEnemy ? 'Enemy' : 'Ally' }),
            !isUnitHero && (react.createElement(Label, { className: Message_styles_module.unitLabel, text: $.Localize(unitName) })),
            isUnitHero && (react.createElement(DOTAHeroImage, { heroimagestyle: 'icon', heroname: unitName, className: Message_styles_module.heroImage })),
            react.createElement(Label, { text: isUnitHero ? unitOwnerPlayerName : '(' + unitOwnerPlayerName + ')', className: Message_styles_module.playernameLabel, style: { color: toColor(unitOwnerPlayerID) } }))),
        react.createElement(Image, { className: Message_styles_module.arrowImage, src: 'file://{images}/control_icons/chat_wheel_icon.png' }),
        react.createElement(Label, { html: true, className: Message_styles_module.textLabel, text: 'Has ' }),
        react.createElement(Label, { html: true, className: HealthMessage_styles_module.healthLabel, style: { color: isUnitEnemy ? 'red' : 'green' }, text: ((Entities.GetHealth(unit) / Entities.GetMaxHealth(unit)) * 100).toFixed(0) + '% ' }),
        react.createElement(Label, { html: true, className: Message_styles_module.textLabel, text: ' Health' })));
};
/* harmony default export */ const HealthMessage_HealthMessage = (react.memo(HealthMessage));

;// CONCATENATED MODULE: ./hud/components/Messages/Message/ManaMessage/styles.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const ManaMessage_styles_module = ({"manaLabel":"awBcjoAcvbvwLuEypKkU"});
;// CONCATENATED MODULE: ./hud/components/Messages/Message/ManaMessage/ManaMessage.tsx




const ManaMessage = (props) => {
    const { data } = props;
    const { unit, broadcaster } = data;
    const unitOwnerPlayerID = Entities.GetPlayerOwnerID(unit);
    const unitOwnerPlayerName = Players.GetPlayerName(Entities.GetPlayerOwnerID(unit));
    const isUnitEnemy = Entities.IsEnemy(unit);
    const isUnitHero = Entities.IsHero(unit);
    const unitName = Entities.GetUnitName(unit);
    return (react.createElement(Panel, { className: Message_styles_module.messageContainer },
        react.createElement(DOTAHeroImage, { heroimagestyle: 'icon', heroname: Entities.GetUnitName(Players.GetPlayerHeroEntityIndex(broadcaster)), className: Message_styles_module.heroImage }),
        react.createElement(Label, { text: Players.GetPlayerName(broadcaster), className: Message_styles_module.playernameLabel, style: { color: toColor(broadcaster) } }),
        unitOwnerPlayerID !== broadcaster && (react.createElement(react.Fragment, null,
            react.createElement(Image, { className: Message_styles_module.arrowImage, src: 'file://{images}/control_icons/chat_wheel_icon.png' }),
            react.createElement(Label, { html: true, className: Message_styles_module.enemyOrAllyLabel, text: isUnitEnemy ? 'Enemy' : 'Ally' }),
            !isUnitHero && (react.createElement(Label, { className: Message_styles_module.unitLabel, text: $.Localize(unitName) })),
            isUnitHero && (react.createElement(DOTAHeroImage, { heroimagestyle: 'icon', heroname: unitName, className: Message_styles_module.heroImage })),
            react.createElement(Label, { text: isUnitHero ? unitOwnerPlayerName : '(' + unitOwnerPlayerName + ')', className: Message_styles_module.playernameLabel, style: { color: toColor(unitOwnerPlayerID) } }))),
        react.createElement(Image, { className: Message_styles_module.arrowImage, src: 'file://{images}/control_icons/chat_wheel_icon.png' }),
        react.createElement(Label, { html: true, className: Message_styles_module.textLabel, text: 'Has ' }),
        react.createElement(Label, { html: true, className: ManaMessage_styles_module.manaLabel, text: ((Entities.GetMana(unit) / Entities.GetMaxMana(unit)) * 100).toFixed(0) + '% ' }),
        react.createElement(Label, { html: true, className: Message_styles_module.textLabel, text: ' Mana' })));
};
/* harmony default export */ const ManaMessage_ManaMessage = (react.memo(ManaMessage));

;// CONCATENATED MODULE: ./hud/components/Messages/Message/Message.tsx









const Message = (props) => {
    const { message } = props;
    const { id, type, data } = message;
    const setMessages = (0,react.useContext)(SetMessagesContext);
    const [opacity, setOpacity] = (0,react.useState)('1.0');
    useTimeout(() => {
        setMessages(prevState => prevState.filter(msg => msg.id !== id));
    }, 5600);
    useTimeout(() => {
        setOpacity('0.0');
    }, 5000);
    return (react.createElement(Panel, { className: Message_styles_module.container, style: { opacity: opacity } },
        type === MessageType.ABILITY && (react.createElement(AbilityMessage_AbilityMessage, { data: data })),
        type === MessageType.ITEM && (react.createElement(ItemMessage_ItemMessage, { data: data })),
        type === MessageType.MODIFIER && (react.createElement(ModifierMessage_ModifierMessage, { data: data })),
        type === MessageType.HEALTH && (react.createElement(HealthMessage_HealthMessage, { data: data })),
        type === MessageType.MANA && (react.createElement(ManaMessage_ManaMessage, { data: data }))));
};
/* harmony default export */ const Message_Message = (react.memo(Message));

;// CONCATENATED MODULE: ./hud/components/Messages/styles.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const Messages_styles_module = ({"container":"Cmf_Gpikd73EhApUW1k2"});
;// CONCATENATED MODULE: ./hud/components/Messages/Messages.tsx




var MessageType;
(function (MessageType) {
    MessageType["ABILITY"] = "ABILITY";
    MessageType["ITEM"] = "ITEM";
    MessageType["MODIFIER"] = "MODIFIER";
    MessageType["HEALTH"] = "HEALTH";
    MessageType["MANA"] = "MANA";
})(MessageType || (MessageType = {}));
const SetMessagesContext = react.createContext(() => { });
const Messages = () => {
    const [messages, setMessages] = (0,react.useState)([]);
    const messageID = (0,react.useRef)(Number.MIN_SAFE_INTEGER);
    r("on_ability_alerted", (event) => {
        if (Game.IsPlayerMuted(event.broadcaster)) {
            return;
        }
        messageID.current = messageID.current + 1;
        setMessages(prevState => {
            return [...prevState, {
                    id: messageID.current,
                    type: MessageType.ABILITY,
                    data: {
                        broadcaster: event.broadcaster,
                        unit: event.selectedUnit,
                        ability: event.ability
                    }
                }];
        });
        Game.EmitSound("ui_chat_msg_rec");
    }, []);
    r("on_item_alerted", (event) => {
        if (Game.IsPlayerMuted(event.broadcaster)) {
            return;
        }
        messageID.current = messageID.current + 1;
        setMessages(prevState => {
            return [...prevState, {
                    id: messageID.current,
                    type: MessageType.ITEM,
                    data: {
                        broadcaster: event.broadcaster,
                        unit: event.selectedUnit,
                        item: event.item
                    }
                }];
        });
        Game.EmitSound("ui_chat_msg_rec");
    }, []);
    r("on_modifier_alerted", (event) => {
        if (Game.IsPlayerMuted(event.broadcaster)) {
            return;
        }
        messageID.current = messageID.current + 1;
        setMessages(prevState => {
            return [...prevState, {
                    id: messageID.current,
                    type: MessageType.MODIFIER,
                    data: {
                        broadcaster: event.broadcaster,
                        unit: event.selectedUnit,
                        modifier: event.modifier
                    }
                }];
        });
        Game.EmitSound("ui_chat_msg_rec");
    }, []);
    r("on_health_alerted", (event) => {
        if (Game.IsPlayerMuted(event.broadcaster)) {
            return;
        }
        messageID.current = messageID.current + 1;
        setMessages(prevState => {
            return [...prevState, {
                    id: messageID.current,
                    type: MessageType.HEALTH,
                    data: {
                        broadcaster: event.broadcaster,
                        unit: event.selectedUnit,
                    }
                }];
        });
        Game.EmitSound("ui_chat_msg_rec");
    }, []);
    r("on_mana_alerted", (event) => {
        if (Game.IsPlayerMuted(event.broadcaster)) {
            return;
        }
        messageID.current = messageID.current + 1;
        setMessages(prevState => {
            return [...prevState, {
                    id: messageID.current,
                    type: MessageType.MANA,
                    data: {
                        broadcaster: event.broadcaster,
                        unit: event.selectedUnit,
                    }
                }];
        });
        Game.EmitSound("ui_chat_msg_rec");
    }, []);
    return (react.createElement(Panel, { className: Messages_styles_module.container },
        react.createElement(SetMessagesContext.Provider, { value: setMessages }, messages.sort((m1, m2) => m2.id - m1.id).map(message => {
            return (react.createElement(Message_Message, { key: message.id, message: message }));
        }))));
};
/* harmony default export */ const Messages_Messages = (Messages);

;// CONCATENATED MODULE: ./hud/app.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const app_module = ({"container":"Mq7q2v4FcXEkxx3KS7_R","useCustomUIBtn":"qUIA03sEiYytt60Alfl5","useCustomUILabel":"TwhFbl98P1nuj4pIMQTZ"});
;// CONCATENATED MODULE: ./hud/App.tsx
























const HUD_THINK_FAST = 30;
const HUD_THINK_MEDIUM = 100;
const HUD_THINK_SLOW = 1000;
const App = () => {
    var _a;
    const heroes = a('HeroSelectionHeroes').heroes;
    const hasPickedHero = ((_a = Object.values(heroes).find(hero => hero.playerID === Players.GetLocalPlayer())) === null || _a === void 0 ? void 0 : _a.picked) === 1;
    const [useCustomUI, setUseCustomUI] = (0,react.useState)(true);
    const [selectedUnit, setSelectedUnit] = (0,react.useState)(Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer()));
    (0,react.useEffect)(() => {
        GameUI.SetCameraDistance(1600);
        GameUI.SetCameraTarget(Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer()));
    }, []);
    useInterval(() => {
        const excludedUnits = [
            "shopkeeper_abilities"
        ];
        const getGameUnitSelected = () => {
            const queryUnit = Players.GetQueryUnit(Players.GetLocalPlayer());
            if (queryUnit !== -1) {
                return queryUnit;
            }
            const portraitUnit = Players.GetLocalPlayerPortraitUnit();
            if (portraitUnit !== -1) {
                return portraitUnit;
            }
            return Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer());
        };
        const unitToSelect = getGameUnitSelected();
        if (!excludedUnits.includes(Entities.GetUnitName(unitToSelect))) {
            setSelectedUnit(unitToSelect);
        }
    }, HUD_THINK_FAST);
    (0,react.useEffect)(() => {
        GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_TIMEOFDAY, !useCustomUI);
        GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_HEROES, !useCustomUI);
        GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_FLYOUT_SCOREBOARD, true);
        GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_ACTION_PANEL, !useCustomUI);
        GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_ACTION_MINIMAP, !useCustomUI);
        GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_PANEL, !useCustomUI);
        GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_SHOP, !useCustomUI);
        GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_ITEMS, !useCustomUI);
        GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_QUICKBUY, !useCustomUI);
        GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_COURIER, !useCustomUI);
        GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_PROTECT, !useCustomUI);
        GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_GOLD, !useCustomUI);
        GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_SHOP_SUGGESTEDITEMS, !useCustomUI);
        GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_SHOP_COMMONITEMS, !useCustomUI);
        GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_HERO_SELECTION_TEAMS, false);
        GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_HERO_SELECTION_GAME_NAME, false);
        GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_HERO_SELECTION_CLOCK, false);
        GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_MENU_BUTTONS, true);
        GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_BAR_BACKGROUND, !useCustomUI);
        GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_BAR_RADIANT_TEAM, !useCustomUI);
        GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_BAR_DIRE_TEAM, !useCustomUI);
        GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_BAR_SCORE, !useCustomUI);
        GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_ENDGAME, !useCustomUI);
        GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_ENDGAME_CHAT, !useCustomUI);
        GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_QUICK_STATS, !useCustomUI);
        GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_PREGAME_STRATEGYUI, !useCustomUI);
        GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_KILLCAM, !useCustomUI);
        GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_BAR, !useCustomUI);
        GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_CUSTOMUI_BEHIND_HUD_ELEMENTS, !useCustomUI);
        GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_ELEMENT_COUNT, !useCustomUI);
    }, [useCustomUI]);
    return (react.createElement(Panel, { id: 'root', className: app_module.container },
        (!hasPickedHero) && (react.createElement(HeroSelection_HeroSelection, null)),
        hasPickedHero && (react.createElement(Loading_Loading, null,
            react.createElement(ToggleButton, { className: app_module.useCustomUIBtn, selected: useCustomUI, onactivate: () => setUseCustomUI(prevState => !prevState) },
                react.createElement(Label, { className: app_module.useCustomUILabel, text: 'Use Custom UI' })),
            useCustomUI && (react.createElement(react.Fragment, null,
                react.createElement(Heroes_Heroes, null),
                react.createElement(GameTime_GameTime, null),
                react.createElement(Settings_Settings, null),
                react.createElement(Character_Character, { selectedUnit: selectedUnit }),
                react.createElement(Shop_Shop, { selectedUnit: selectedUnit }),
                react.createElement(AbilityBar_AbilityBar, { selectedUnit: selectedUnit }),
                react.createElement(ManaBar_ManaBar, { selectedUnit: selectedUnit }),
                react.createElement(HealthBar_HealthBar, { selectedUnit: selectedUnit }),
                react.createElement(ButtonGroup_ButtonGroup, null),
                react.createElement(Minimap_Minimap, null),
                react.createElement(Buffs_Buffs, { selectedUnit: selectedUnit }),
                react.createElement(Debuffs_Debuffs, { selectedUnit: selectedUnit }),
                react.createElement(Inventory_Inventory, { selectedUnit: selectedUnit }),
                react.createElement(Stats_Stats, { selectedUnit: selectedUnit }),
                react.createElement(AbilitiesShop_AbilitiesShop, { selectedUnit: selectedUnit }),
                react.createElement(FloatingContainer_FloatingContainer, null),
                react.createElement(Messages_Messages, null)))))));
};
/* harmony default export */ const hud_App = (App);

;// CONCATENATED MODULE: ../../../node_modules/@babel/runtime/helpers/esm/defineProperty.js
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}
;// CONCATENATED MODULE: ../../../node_modules/@babel/runtime/helpers/esm/objectSpread2.js


function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}
;// CONCATENATED MODULE: ../../../node_modules/redux/es/redux.js


/**
 * Adapted from React: https://github.com/facebook/react/blob/master/packages/shared/formatProdErrorMessage.js
 *
 * Do not require this module directly! Use normal throw error calls. These messages will be replaced with error codes
 * during build.
 * @param {number} code
 */
function formatProdErrorMessage(code) {
  return "Minified Redux error #" + code + "; visit https://redux.js.org/Errors?code=" + code + " for the full message or " + 'use the non-minified dev environment for full errors. ';
}

// Inlined version of the `symbol-observable` polyfill
var $$observable = (function () {
  return typeof Symbol === 'function' && Symbol.observable || '@@observable';
})();

/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var randomString = function randomString() {
  return Math.random().toString(36).substring(7).split('').join('.');
};

var ActionTypes = {
  INIT: "@@redux/INIT" + randomString(),
  REPLACE: "@@redux/REPLACE" + randomString(),
  PROBE_UNKNOWN_ACTION: function PROBE_UNKNOWN_ACTION() {
    return "@@redux/PROBE_UNKNOWN_ACTION" + randomString();
  }
};

/**
 * @param {any} obj The object to inspect.
 * @returns {boolean} True if the argument appears to be a plain object.
 */
function isPlainObject(obj) {
  if (typeof obj !== 'object' || obj === null) return false;
  var proto = obj;

  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(obj) === proto;
}

// Inlined / shortened version of `kindOf` from https://github.com/jonschlinkert/kind-of
function miniKindOf(val) {
  if (val === void 0) return 'undefined';
  if (val === null) return 'null';
  var type = typeof val;

  switch (type) {
    case 'boolean':
    case 'string':
    case 'number':
    case 'symbol':
    case 'function':
      {
        return type;
      }
  }

  if (Array.isArray(val)) return 'array';
  if (isDate(val)) return 'date';
  if (isError(val)) return 'error';
  var constructorName = ctorName(val);

  switch (constructorName) {
    case 'Symbol':
    case 'Promise':
    case 'WeakMap':
    case 'WeakSet':
    case 'Map':
    case 'Set':
      return constructorName;
  } // other


  return type.slice(8, -1).toLowerCase().replace(/\s/g, '');
}

function ctorName(val) {
  return typeof val.constructor === 'function' ? val.constructor.name : null;
}

function isError(val) {
  return val instanceof Error || typeof val.message === 'string' && val.constructor && typeof val.constructor.stackTraceLimit === 'number';
}

function isDate(val) {
  if (val instanceof Date) return true;
  return typeof val.toDateString === 'function' && typeof val.getDate === 'function' && typeof val.setDate === 'function';
}

function kindOf(val) {
  var typeOfVal = typeof val;

  if (false) {}

  return typeOfVal;
}

/**
 * Creates a Redux store that holds the state tree.
 * The only way to change the data in the store is to call `dispatch()` on it.
 *
 * There should only be a single store in your app. To specify how different
 * parts of the state tree respond to actions, you may combine several reducers
 * into a single reducer function by using `combineReducers`.
 *
 * @param {Function} reducer A function that returns the next state tree, given
 * the current state tree and the action to handle.
 *
 * @param {any} [preloadedState] The initial state. You may optionally specify it
 * to hydrate the state from the server in universal apps, or to restore a
 * previously serialized user session.
 * If you use `combineReducers` to produce the root reducer function, this must be
 * an object with the same shape as `combineReducers` keys.
 *
 * @param {Function} [enhancer] The store enhancer. You may optionally specify it
 * to enhance the store with third-party capabilities such as middleware,
 * time travel, persistence, etc. The only store enhancer that ships with Redux
 * is `applyMiddleware()`.
 *
 * @returns {Store} A Redux store that lets you read the state, dispatch actions
 * and subscribe to changes.
 */

function createStore(reducer, preloadedState, enhancer) {
  var _ref2;

  if (typeof preloadedState === 'function' && typeof enhancer === 'function' || typeof enhancer === 'function' && typeof arguments[3] === 'function') {
    throw new Error( true ? formatProdErrorMessage(0) : 0);
  }

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error( true ? formatProdErrorMessage(1) : 0);
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error( true ? formatProdErrorMessage(2) : 0);
  }

  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;
  /**
   * This makes a shallow copy of currentListeners so we can use
   * nextListeners as a temporary list while dispatching.
   *
   * This prevents any bugs around consumers calling
   * subscribe/unsubscribe in the middle of a dispatch.
   */

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }
  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */


  function getState() {
    if (isDispatching) {
      throw new Error( true ? formatProdErrorMessage(3) : 0);
    }

    return currentState;
  }
  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */


  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error( true ? formatProdErrorMessage(4) : 0);
    }

    if (isDispatching) {
      throw new Error( true ? formatProdErrorMessage(5) : 0);
    }

    var isSubscribed = true;
    ensureCanMutateNextListeners();
    nextListeners.push(listener);
    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      if (isDispatching) {
        throw new Error( true ? formatProdErrorMessage(6) : 0);
      }

      isSubscribed = false;
      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
      currentListeners = null;
    };
  }
  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */


  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error( true ? formatProdErrorMessage(7) : 0);
    }

    if (typeof action.type === 'undefined') {
      throw new Error( true ? formatProdErrorMessage(8) : 0);
    }

    if (isDispatching) {
      throw new Error( true ? formatProdErrorMessage(9) : 0);
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;

    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }

    return action;
  }
  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */


  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error( true ? formatProdErrorMessage(10) : 0);
    }

    currentReducer = nextReducer; // This action has a similiar effect to ActionTypes.INIT.
    // Any reducers that existed in both the new and old rootReducer
    // will receive the previous state. This effectively populates
    // the new state tree with any relevant data from the old one.

    dispatch({
      type: ActionTypes.REPLACE
    });
  }
  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */


  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if (typeof observer !== 'object' || observer === null) {
          throw new Error( true ? formatProdErrorMessage(11) : 0);
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return {
          unsubscribe: unsubscribe
        };
      }
    }, _ref[$$observable] = function () {
      return this;
    }, _ref;
  } // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.


  dispatch({
    type: ActionTypes.INIT
  });
  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[$$observable] = observable, _ref2;
}

/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */


  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
  } catch (e) {} // eslint-disable-line no-empty

}

function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  var reducerKeys = Object.keys(reducers);
  var argumentName = action && action.type === ActionTypes.INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';

  if (reducerKeys.length === 0) {
    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  }

  if (!isPlainObject(inputState)) {
    return "The " + argumentName + " has unexpected type of \"" + kindOf(inputState) + "\". Expected argument to be an object with the following " + ("keys: \"" + reducerKeys.join('", "') + "\"");
  }

  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
  });
  unexpectedKeys.forEach(function (key) {
    unexpectedKeyCache[key] = true;
  });
  if (action && action.type === ActionTypes.REPLACE) return;

  if (unexpectedKeys.length > 0) {
    return "Unexpected " + (unexpectedKeys.length > 1 ? 'keys' : 'key') + " " + ("\"" + unexpectedKeys.join('", "') + "\" found in " + argumentName + ". ") + "Expected to find one of the known reducer keys instead: " + ("\"" + reducerKeys.join('", "') + "\". Unexpected keys will be ignored.");
  }
}

function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, {
      type: ActionTypes.INIT
    });

    if (typeof initialState === 'undefined') {
      throw new Error( true ? formatProdErrorMessage(12) : 0);
    }

    if (typeof reducer(undefined, {
      type: ActionTypes.PROBE_UNKNOWN_ACTION()
    }) === 'undefined') {
      throw new Error( true ? formatProdErrorMessage(13) : 0);
    }
  });
}
/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */


function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};

  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];

    if (false) {}

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }

  var finalReducerKeys = Object.keys(finalReducers); // This is used to make sure we don't warn about the same
  // keys multiple times.

  var unexpectedKeyCache;

  if (false) {}

  var shapeAssertionError;

  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }

  return function combination(state, action) {
    if (state === void 0) {
      state = {};
    }

    if (shapeAssertionError) {
      throw shapeAssertionError;
    }

    if (false) { var warningMessage; }

    var hasChanged = false;
    var nextState = {};

    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key = finalReducerKeys[_i];
      var reducer = finalReducers[_key];
      var previousStateForKey = state[_key];
      var nextStateForKey = reducer(previousStateForKey, action);

      if (typeof nextStateForKey === 'undefined') {
        var actionType = action && action.type;
        throw new Error( true ? formatProdErrorMessage(14) : 0);
      }

      nextState[_key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }

    hasChanged = hasChanged || finalReducerKeys.length !== Object.keys(state).length;
    return hasChanged ? nextState : state;
  };
}

function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(this, arguments));
  };
}
/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass an action creator as the first argument,
 * and get a dispatch wrapped function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */


function redux_bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error( true ? formatProdErrorMessage(16) : 0);
  }

  var boundActionCreators = {};

  for (var key in actionCreators) {
    var actionCreator = actionCreators[key];

    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }

  return boundActionCreators;
}

/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */
function compose() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(void 0, arguments));
    };
  });
}

/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */

function applyMiddleware() {
  for (var _len = arguments.length, middlewares = new Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function () {
      var store = createStore.apply(void 0, arguments);

      var _dispatch = function dispatch() {
        throw new Error( true ? formatProdErrorMessage(15) : 0);
      };

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch() {
          return _dispatch.apply(void 0, arguments);
        }
      };
      var chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = compose.apply(void 0, chain)(store.dispatch);
      return _objectSpread2(_objectSpread2({}, store), {}, {
        dispatch: _dispatch
      });
    };
  };
}

/*
 * This is a dummy function to check if the function name has been altered by minification.
 * If the function has been minified and NODE_ENV !== 'production', warn the user.
 */

function isCrushed() {}

if (false) {}



;// CONCATENATED MODULE: ../../../node_modules/@redux-saga/symbols/dist/redux-saga-symbols.esm.js
var createSymbol = function createSymbol(name) {
  return "@@redux-saga/" + name;
};

var CANCEL =
/*#__PURE__*/
createSymbol('CANCEL_PROMISE');
var CHANNEL_END_TYPE =
/*#__PURE__*/
createSymbol('CHANNEL_END');
var redux_saga_symbols_esm_IO =
/*#__PURE__*/
createSymbol('IO');
var MATCH =
/*#__PURE__*/
createSymbol('MATCH');
var MULTICAST =
/*#__PURE__*/
createSymbol('MULTICAST');
var redux_saga_symbols_esm_SAGA_ACTION =
/*#__PURE__*/
createSymbol('SAGA_ACTION');
var SELF_CANCELLATION =
/*#__PURE__*/
createSymbol('SELF_CANCELLATION');
var redux_saga_symbols_esm_TASK =
/*#__PURE__*/
createSymbol('TASK');
var TASK_CANCEL =
/*#__PURE__*/
createSymbol('TASK_CANCEL');
var TERMINATE =
/*#__PURE__*/
createSymbol('TERMINATE');
var SAGA_LOCATION =
/*#__PURE__*/
createSymbol('LOCATION');



;// CONCATENATED MODULE: ../../../node_modules/@redux-saga/is/dist/redux-saga-is.esm.js


var undef = function undef(v) {
  return v === null || v === undefined;
};
var redux_saga_is_esm_notUndef = function notUndef(v) {
  return v !== null && v !== undefined;
};
var redux_saga_is_esm_func = function func(f) {
  return typeof f === 'function';
};
var number = function number(n) {
  return typeof n === 'number';
};
var redux_saga_is_esm_string = function string(s) {
  return typeof s === 'string';
};
var redux_saga_is_esm_array = Array.isArray;
var redux_saga_is_esm_object = function object(obj) {
  return obj && !redux_saga_is_esm_array(obj) && typeof obj === 'object';
};
var promise = function promise(p) {
  return p && redux_saga_is_esm_func(p.then);
};
var iterator = function iterator(it) {
  return it && redux_saga_is_esm_func(it.next) && redux_saga_is_esm_func(it.throw);
};
var iterable = function iterable(it) {
  return it && redux_saga_is_esm_func(Symbol) ? redux_saga_is_esm_func(it[Symbol.iterator]) : redux_saga_is_esm_array(it);
};
var task = function task(t) {
  return t && t[TASK];
};
var sagaAction = function sagaAction(a) {
  return Boolean(a && a[SAGA_ACTION]);
};
var observable = function observable(ob) {
  return ob && redux_saga_is_esm_func(ob.subscribe);
};
var buffer = function buffer(buf) {
  return buf && redux_saga_is_esm_func(buf.isEmpty) && redux_saga_is_esm_func(buf.take) && redux_saga_is_esm_func(buf.put);
};
var pattern = function pattern(pat) {
  return pat && (redux_saga_is_esm_string(pat) || symbol(pat) || redux_saga_is_esm_func(pat) || redux_saga_is_esm_array(pat) && pat.every(pattern));
};
var channel = function channel(ch) {
  return ch && redux_saga_is_esm_func(ch.take) && redux_saga_is_esm_func(ch.close);
};
var stringableFunc = function stringableFunc(f) {
  return redux_saga_is_esm_func(f) && f.hasOwnProperty('toString');
};
var symbol = function symbol(sym) {
  return Boolean(sym) && typeof Symbol === 'function' && sym.constructor === Symbol && sym !== Symbol.prototype;
};
var multicast = function multicast(ch) {
  return channel(ch) && ch[MULTICAST];
};
var redux_saga_is_esm_effect = function effect(eff) {
  return eff && eff[IO];
};



;// CONCATENATED MODULE: ../../../node_modules/@redux-saga/delay-p/dist/redux-saga-delay-p.esm.js


function delayP(ms, val) {
  if (val === void 0) {
    val = true;
  }

  var timeoutId;
  var promise = new Promise(function (resolve) {
    timeoutId = setTimeout(resolve, ms, val);
  });

  promise[CANCEL] = function () {
    clearTimeout(timeoutId);
  };

  return promise;
}

/* harmony default export */ const redux_saga_delay_p_esm = (delayP);

;// CONCATENATED MODULE: ../../../node_modules/@redux-saga/core/dist/io-6de156f3.js





var konst = function konst(v) {
  return function () {
    return v;
  };
};
var kTrue =
/*#__PURE__*/
konst(true);

var noop = function noop() {};

if (false) {}
var identity = function identity(v) {
  return v;
};
var hasSymbol = typeof Symbol === 'function';
var asyncIteratorSymbol = hasSymbol && Symbol.asyncIterator ? Symbol.asyncIterator : '@@asyncIterator';
function io_6de156f3_check(value, predicate, error) {
  if (!predicate(value)) {
    throw new Error(error);
  }
}
var assignWithSymbols = function assignWithSymbols(target, source) {
  extends_extends(target, source);

  if (Object.getOwnPropertySymbols) {
    Object.getOwnPropertySymbols(source).forEach(function (s) {
      target[s] = source[s];
    });
  }
};
var flatMap = function flatMap(mapper, arr) {
  var _ref;

  return (_ref = []).concat.apply(_ref, arr.map(mapper));
};
function remove(array, item) {
  var index = array.indexOf(item);

  if (index >= 0) {
    array.splice(index, 1);
  }
}
function io_6de156f3_once(fn) {
  var called = false;
  return function () {
    if (called) {
      return;
    }

    called = true;
    fn();
  };
}

var kThrow = function kThrow(err) {
  throw err;
};

var kReturn = function kReturn(value) {
  return {
    value: value,
    done: true
  };
};

function makeIterator(next, thro, name) {
  if (thro === void 0) {
    thro = kThrow;
  }

  if (name === void 0) {
    name = 'iterator';
  }

  var iterator = {
    meta: {
      name: name
    },
    next: next,
    throw: thro,
    return: kReturn,
    isSagaIterator: true
  };

  if (typeof Symbol !== 'undefined') {
    iterator[Symbol.iterator] = function () {
      return iterator;
    };
  }

  return iterator;
}
function logError(error, _ref2) {
  var sagaStack = _ref2.sagaStack;

  /*eslint-disable no-console*/
  console.error(error);
  console.error(sagaStack);
}
var internalErr = function internalErr(err) {
  return new Error("\n  redux-saga: Error checking hooks detected an inconsistent state. This is likely a bug\n  in redux-saga code and not yours. Thanks for reporting this in the project's github repo.\n  Error: " + err + "\n");
};
var createSetContextWarning = function createSetContextWarning(ctx, props) {
  return (ctx ? ctx + '.' : '') + "setContext(props): argument " + props + " is not a plain object";
};
var FROZEN_ACTION_ERROR = "You can't put (a.k.a. dispatch from saga) frozen actions.\nWe have to define a special non-enumerable property on those actions for scheduling purposes.\nOtherwise you wouldn't be able to communicate properly between sagas & other subscribers (action ordering would become far less predictable).\nIf you are using redux and you care about this behaviour (frozen actions),\nthen you might want to switch to freezing actions in a middleware rather than in action creator.\nExample implementation:\n\nconst freezeActions = store => next => action => next(Object.freeze(action))\n"; // creates empty, but not-holey array

var createEmptyArray = function createEmptyArray(n) {
  return Array.apply(null, new Array(n));
};
var wrapSagaDispatch = function wrapSagaDispatch(dispatch) {
  return function (action) {
    if (false) {}

    return dispatch(Object.defineProperty(action, redux_saga_symbols_esm_SAGA_ACTION, {
      value: true
    }));
  };
};
var shouldTerminate = function shouldTerminate(res) {
  return res === TERMINATE;
};
var shouldCancel = function shouldCancel(res) {
  return res === TASK_CANCEL;
};
var shouldComplete = function shouldComplete(res) {
  return shouldTerminate(res) || shouldCancel(res);
};
function createAllStyleChildCallbacks(shape, parentCallback) {
  var keys = Object.keys(shape);
  var totalCount = keys.length;

  if (false) {}

  var completedCount = 0;
  var completed;
  var results = redux_saga_is_esm_array(shape) ? createEmptyArray(totalCount) : {};
  var childCallbacks = {};

  function checkEnd() {
    if (completedCount === totalCount) {
      completed = true;
      parentCallback(results);
    }
  }

  keys.forEach(function (key) {
    var chCbAtKey = function chCbAtKey(res, isErr) {
      if (completed) {
        return;
      }

      if (isErr || shouldComplete(res)) {
        parentCallback.cancel();
        parentCallback(res, isErr);
      } else {
        results[key] = res;
        completedCount++;
        checkEnd();
      }
    };

    chCbAtKey.cancel = noop;
    childCallbacks[key] = chCbAtKey;
  });

  parentCallback.cancel = function () {
    if (!completed) {
      completed = true;
      keys.forEach(function (key) {
        return childCallbacks[key].cancel();
      });
    }
  };

  return childCallbacks;
}
function getMetaInfo(fn) {
  return {
    name: fn.name || 'anonymous',
    location: getLocation(fn)
  };
}
function getLocation(instrumented) {
  return instrumented[SAGA_LOCATION];
}

var BUFFER_OVERFLOW = "Channel's Buffer overflow!";
var ON_OVERFLOW_THROW = 1;
var ON_OVERFLOW_DROP = 2;
var ON_OVERFLOW_SLIDE = 3;
var ON_OVERFLOW_EXPAND = 4;
var zeroBuffer = {
  isEmpty: kTrue,
  put: noop,
  take: noop
};

function ringBuffer(limit, overflowAction) {
  if (limit === void 0) {
    limit = 10;
  }

  var arr = new Array(limit);
  var length = 0;
  var pushIndex = 0;
  var popIndex = 0;

  var push = function push(it) {
    arr[pushIndex] = it;
    pushIndex = (pushIndex + 1) % limit;
    length++;
  };

  var take = function take() {
    if (length != 0) {
      var it = arr[popIndex];
      arr[popIndex] = null;
      length--;
      popIndex = (popIndex + 1) % limit;
      return it;
    }
  };

  var flush = function flush() {
    var items = [];

    while (length) {
      items.push(take());
    }

    return items;
  };

  return {
    isEmpty: function isEmpty() {
      return length == 0;
    },
    put: function put(it) {
      if (length < limit) {
        push(it);
      } else {
        var doubledLimit;

        switch (overflowAction) {
          case ON_OVERFLOW_THROW:
            throw new Error(BUFFER_OVERFLOW);

          case ON_OVERFLOW_SLIDE:
            arr[pushIndex] = it;
            pushIndex = (pushIndex + 1) % limit;
            popIndex = pushIndex;
            break;

          case ON_OVERFLOW_EXPAND:
            doubledLimit = 2 * limit;
            arr = flush();
            length = arr.length;
            pushIndex = arr.length;
            popIndex = 0;
            arr.length = doubledLimit;
            limit = doubledLimit;
            push(it);
            break;

          default: // DROP

        }
      }
    },
    take: take,
    flush: flush
  };
}

var io_6de156f3_none = function none() {
  return zeroBuffer;
};
var fixed = function fixed(limit) {
  return ringBuffer(limit, ON_OVERFLOW_THROW);
};
var dropping = function dropping(limit) {
  return ringBuffer(limit, ON_OVERFLOW_DROP);
};
var io_6de156f3_sliding = function sliding(limit) {
  return ringBuffer(limit, ON_OVERFLOW_SLIDE);
};
var expanding = function expanding(initialSize) {
  return ringBuffer(initialSize, ON_OVERFLOW_EXPAND);
};

var buffers = /*#__PURE__*/Object.freeze({
  __proto__: null,
  none: io_6de156f3_none,
  fixed: fixed,
  dropping: dropping,
  sliding: io_6de156f3_sliding,
  expanding: expanding
});

var TAKE = 'TAKE';
var PUT = 'PUT';
var ALL = 'ALL';
var RACE = 'RACE';
var CALL = 'CALL';
var CPS = 'CPS';
var FORK = 'FORK';
var JOIN = 'JOIN';
var io_6de156f3_CANCEL = 'CANCEL';
var SELECT = 'SELECT';
var ACTION_CHANNEL = 'ACTION_CHANNEL';
var CANCELLED = 'CANCELLED';
var FLUSH = 'FLUSH';
var GET_CONTEXT = 'GET_CONTEXT';
var SET_CONTEXT = 'SET_CONTEXT';

var effectTypes = /*#__PURE__*/Object.freeze({
  __proto__: null,
  TAKE: TAKE,
  PUT: PUT,
  ALL: ALL,
  RACE: RACE,
  CALL: CALL,
  CPS: CPS,
  FORK: FORK,
  JOIN: JOIN,
  CANCEL: io_6de156f3_CANCEL,
  SELECT: SELECT,
  ACTION_CHANNEL: ACTION_CHANNEL,
  CANCELLED: CANCELLED,
  FLUSH: FLUSH,
  GET_CONTEXT: GET_CONTEXT,
  SET_CONTEXT: SET_CONTEXT
});

var TEST_HINT = '\n(HINT: if you are getting these errors in tests, consider using createMockTask from @redux-saga/testing-utils)';

var makeEffect = function makeEffect(type, payload) {
  var _ref;

  return _ref = {}, _ref[redux_saga_symbols_esm_IO] = true, _ref.combinator = false, _ref.type = type, _ref.payload = payload, _ref;
};

var isForkEffect = function isForkEffect(eff) {
  return effect(eff) && eff.type === FORK;
};

var detach = function detach(eff) {
  if (false) {}

  return makeEffect(FORK, _extends({}, eff.payload, {
    detached: true
  }));
};
function io_6de156f3_take(patternOrChannel, multicastPattern) {
  if (patternOrChannel === void 0) {
    patternOrChannel = '*';
  }

  if (false) {}

  if (pattern(patternOrChannel)) {
    return makeEffect(TAKE, {
      pattern: patternOrChannel
    });
  }

  if (multicast(patternOrChannel) && redux_saga_is_esm_notUndef(multicastPattern) && pattern(multicastPattern)) {
    return makeEffect(TAKE, {
      channel: patternOrChannel,
      pattern: multicastPattern
    });
  }

  if (channel(patternOrChannel)) {
    return makeEffect(TAKE, {
      channel: patternOrChannel
    });
  }

  if (false) {}
}
var takeMaybe = function takeMaybe() {
  var eff = io_6de156f3_take.apply(void 0, arguments);
  eff.payload.maybe = true;
  return eff;
};
function put(channel$1, action) {
  if (false) {}

  if (undef(action)) {
    action = channel$1; // `undefined` instead of `null` to make default parameter work

    channel$1 = undefined;
  }

  return makeEffect(PUT, {
    channel: channel$1,
    action: action
  });
}
var putResolve = function putResolve() {
  var eff = put.apply(void 0, arguments);
  eff.payload.resolve = true;
  return eff;
};
function io_6de156f3_all(effects) {
  var eff = makeEffect(ALL, effects);
  eff.combinator = true;
  return eff;
}
function io_6de156f3_race(effects) {
  var eff = makeEffect(RACE, effects);
  eff.combinator = true;
  return eff;
} // this match getFnCallDescriptor logic

var validateFnDescriptor = function validateFnDescriptor(effectName, fnDescriptor) {
  io_6de156f3_check(fnDescriptor, notUndef, effectName + ": argument fn is undefined or null");

  if (func(fnDescriptor)) {
    return;
  }

  var context = null;
  var fn;

  if (array(fnDescriptor)) {
    context = fnDescriptor[0];
    fn = fnDescriptor[1];
    io_6de156f3_check(fn, notUndef, effectName + ": argument of type [context, fn] has undefined or null `fn`");
  } else if (object(fnDescriptor)) {
    context = fnDescriptor.context;
    fn = fnDescriptor.fn;
    io_6de156f3_check(fn, notUndef, effectName + ": argument of type {context, fn} has undefined or null `fn`");
  } else {
    io_6de156f3_check(fnDescriptor, func, effectName + ": argument fn is not function");
    return;
  }

  if (context && string(fn)) {
    io_6de156f3_check(context[fn], func, effectName + ": context arguments has no such method - \"" + fn + "\"");
    return;
  }

  io_6de156f3_check(fn, func, effectName + ": unpacked fn argument (from [context, fn] or {context, fn}) is not a function");
};

function getFnCallDescriptor(fnDescriptor, args) {
  var context = null;
  var fn;

  if (redux_saga_is_esm_func(fnDescriptor)) {
    fn = fnDescriptor;
  } else {
    if (redux_saga_is_esm_array(fnDescriptor)) {
      context = fnDescriptor[0];
      fn = fnDescriptor[1];
    } else {
      context = fnDescriptor.context;
      fn = fnDescriptor.fn;
    }

    if (context && redux_saga_is_esm_string(fn) && redux_saga_is_esm_func(context[fn])) {
      fn = context[fn];
    }
  }

  return {
    context: context,
    fn: fn,
    args: args
  };
}

var isNotDelayEffect = function isNotDelayEffect(fn) {
  return fn !== io_6de156f3_delay;
};

function io_6de156f3_call(fnDescriptor) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  if (false) { var arg0; }

  return makeEffect(CALL, getFnCallDescriptor(fnDescriptor, args));
}
function apply(context, fn, args) {
  if (args === void 0) {
    args = [];
  }

  var fnDescriptor = [context, fn];

  if (false) {}

  return makeEffect(CALL, getFnCallDescriptor([context, fn], args));
}
function cps(fnDescriptor) {
  if (false) {}

  for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }

  return makeEffect(CPS, getFnCallDescriptor(fnDescriptor, args));
}
function io_6de156f3_fork(fnDescriptor) {
  if (false) {}

  for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    args[_key3 - 1] = arguments[_key3];
  }

  return makeEffect(FORK, getFnCallDescriptor(fnDescriptor, args));
}
function spawn(fnDescriptor) {
  if (false) {}

  for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
    args[_key4 - 1] = arguments[_key4];
  }

  return detach(io_6de156f3_fork.apply(void 0, [fnDescriptor].concat(args)));
}
function join(taskOrTasks) {
  if (false) {}

  return makeEffect(JOIN, taskOrTasks);
}
function cancel(taskOrTasks) {
  if (taskOrTasks === void 0) {
    taskOrTasks = SELF_CANCELLATION;
  }

  if (false) {}

  return makeEffect(io_6de156f3_CANCEL, taskOrTasks);
}
function io_6de156f3_select(selector) {
  if (selector === void 0) {
    selector = identity;
  }

  for (var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
    args[_key5 - 1] = arguments[_key5];
  }

  if (false) {}

  return makeEffect(SELECT, {
    selector: selector,
    args: args
  });
}
/**
  channel(pattern, [buffer])    => creates a proxy channel for store actions
**/

function io_6de156f3_actionChannel(pattern$1, buffer$1) {
  if (false) {}

  return makeEffect(ACTION_CHANNEL, {
    pattern: pattern$1,
    buffer: buffer$1
  });
}
function cancelled() {
  return makeEffect(CANCELLED, {});
}
function flush(channel$1) {
  if (false) {}

  return makeEffect(FLUSH, channel$1);
}
function getContext(prop) {
  if (false) {}

  return makeEffect(GET_CONTEXT, prop);
}
function setContext(props) {
  if (false) {}

  return makeEffect(SET_CONTEXT, props);
}
var io_6de156f3_delay =
/*#__PURE__*/
io_6de156f3_call.bind(null, redux_saga_delay_p_esm);



;// CONCATENATED MODULE: ../../../node_modules/@redux-saga/deferred/dist/redux-saga-deferred.esm.js
function deferred() {
  var def = {};
  def.promise = new Promise(function (resolve, reject) {
    def.resolve = resolve;
    def.reject = reject;
  });
  return def;
}
function arrayOfDeferred(length) {
  var arr = [];

  for (var i = 0; i < length; i++) {
    arr.push(deferred());
  }

  return arr;
}

/* harmony default export */ const redux_saga_deferred_esm = (deferred);


;// CONCATENATED MODULE: ../../../node_modules/@redux-saga/core/dist/redux-saga-core.esm.js











var queue = [];
/**
  Variable to hold a counting semaphore
  - Incrementing adds a lock and puts the scheduler in a `suspended` state (if it's not
    already suspended)
  - Decrementing releases a lock. Zero locks puts the scheduler in a `released` state. This
    triggers flushing the queued tasks.
**/

var semaphore = 0;
/**
  Executes a task 'atomically'. Tasks scheduled during this execution will be queued
  and flushed after this task has finished (assuming the scheduler endup in a released
  state).
**/

function exec(task) {
  try {
    suspend();
    task();
  } finally {
    release();
  }
}
/**
  Executes or queues a task depending on the state of the scheduler (`suspended` or `released`)
**/


function asap(task) {
  queue.push(task);

  if (!semaphore) {
    suspend();
    redux_saga_core_esm_flush();
  }
}
/**
 * Puts the scheduler in a `suspended` state and executes a task immediately.
 */

function immediately(task) {
  try {
    suspend();
    return task();
  } finally {
    redux_saga_core_esm_flush();
  }
}
/**
  Puts the scheduler in a `suspended` state. Scheduled tasks will be queued until the
  scheduler is released.
**/

function suspend() {
  semaphore++;
}
/**
  Puts the scheduler in a `released` state.
**/


function release() {
  semaphore--;
}
/**
  Releases the current lock. Executes all queued tasks if the scheduler is in the released state.
**/


function redux_saga_core_esm_flush() {
  release();
  var task;

  while (!semaphore && (task = queue.shift()) !== undefined) {
    exec(task);
  }
}

var redux_saga_core_esm_array = function array(patterns) {
  return function (input) {
    return patterns.some(function (p) {
      return matcher(p)(input);
    });
  };
};
var predicate = function predicate(_predicate) {
  return function (input) {
    return _predicate(input);
  };
};
var redux_saga_core_esm_string = function string(pattern) {
  return function (input) {
    return input.type === String(pattern);
  };
};
var redux_saga_core_esm_symbol = function symbol(pattern) {
  return function (input) {
    return input.type === pattern;
  };
};
var wildcard = function wildcard() {
  return kTrue;
};
function matcher(pattern) {
  // prettier-ignore
  var matcherCreator = pattern === '*' ? wildcard : redux_saga_is_esm_string(pattern) ? redux_saga_core_esm_string : redux_saga_is_esm_array(pattern) ? redux_saga_core_esm_array : stringableFunc(pattern) ? redux_saga_core_esm_string : redux_saga_is_esm_func(pattern) ? predicate : symbol(pattern) ? redux_saga_core_esm_symbol : null;

  if (matcherCreator === null) {
    throw new Error("invalid pattern: " + pattern);
  }

  return matcherCreator(pattern);
}

var END = {
  type: CHANNEL_END_TYPE
};
var isEnd = function isEnd(a) {
  return a && a.type === CHANNEL_END_TYPE;
};
var CLOSED_CHANNEL_WITH_TAKERS = 'Cannot have a closed channel with pending takers';
var INVALID_BUFFER = 'invalid buffer passed to channel factory function';
var UNDEFINED_INPUT_ERROR = "Saga or channel was provided with an undefined action\nHints:\n  - check that your Action Creator returns a non-undefined value\n  - if the Saga was started using runSaga, check that your subscribe source provides the action to its listeners";
function redux_saga_core_esm_channel(buffer$1) {
  if (buffer$1 === void 0) {
    buffer$1 = expanding();
  }

  var closed = false;
  var takers = [];

  if (false) {}

  function checkForbiddenStates() {
    if (closed && takers.length) {
      throw internalErr(CLOSED_CHANNEL_WITH_TAKERS);
    }

    if (takers.length && !buffer$1.isEmpty()) {
      throw internalErr('Cannot have pending takers with non empty buffer');
    }
  }

  function put(input) {
    if (false) {}

    if (closed) {
      return;
    }

    if (takers.length === 0) {
      return buffer$1.put(input);
    }

    var cb = takers.shift();
    cb(input);
  }

  function take(cb) {
    if (false) {}

    if (closed && buffer$1.isEmpty()) {
      cb(END);
    } else if (!buffer$1.isEmpty()) {
      cb(buffer$1.take());
    } else {
      takers.push(cb);

      cb.cancel = function () {
        remove(takers, cb);
      };
    }
  }

  function flush(cb) {
    if (false) {}

    if (closed && buffer$1.isEmpty()) {
      cb(END);
      return;
    }

    cb(buffer$1.flush());
  }

  function close() {
    if (false) {}

    if (closed) {
      return;
    }

    closed = true;
    var arr = takers;
    takers = [];

    for (var i = 0, len = arr.length; i < len; i++) {
      var taker = arr[i];
      taker(END);
    }
  }

  return {
    take: take,
    put: put,
    flush: flush,
    close: close
  };
}
function eventChannel(subscribe, buffer) {
  if (buffer === void 0) {
    buffer = none();
  }

  var closed = false;
  var unsubscribe;
  var chan = redux_saga_core_esm_channel(buffer);

  var close = function close() {
    if (closed) {
      return;
    }

    closed = true;

    if (func(unsubscribe)) {
      unsubscribe();
    }

    chan.close();
  };

  unsubscribe = subscribe(function (input) {
    if (isEnd(input)) {
      close();
      return;
    }

    chan.put(input);
  });

  if (false) {}

  unsubscribe = once(unsubscribe);

  if (closed) {
    unsubscribe();
  }

  return {
    take: chan.take,
    flush: chan.flush,
    close: close
  };
}
function multicastChannel() {
  var _ref;

  var closed = false;
  var currentTakers = [];
  var nextTakers = currentTakers;

  function checkForbiddenStates() {
    if (closed && nextTakers.length) {
      throw internalErr(CLOSED_CHANNEL_WITH_TAKERS);
    }
  }

  var ensureCanMutateNextTakers = function ensureCanMutateNextTakers() {
    if (nextTakers !== currentTakers) {
      return;
    }

    nextTakers = currentTakers.slice();
  };

  var close = function close() {
    if (false) {}

    closed = true;
    var takers = currentTakers = nextTakers;
    nextTakers = [];
    takers.forEach(function (taker) {
      taker(END);
    });
  };

  return _ref = {}, _ref[MULTICAST] = true, _ref.put = function put(input) {
    if (false) {}

    if (closed) {
      return;
    }

    if (isEnd(input)) {
      close();
      return;
    }

    var takers = currentTakers = nextTakers;

    for (var i = 0, len = takers.length; i < len; i++) {
      var taker = takers[i];

      if (taker[MATCH](input)) {
        taker.cancel();
        taker(input);
      }
    }
  }, _ref.take = function take(cb, matcher) {
    if (matcher === void 0) {
      matcher = wildcard;
    }

    if (false) {}

    if (closed) {
      cb(END);
      return;
    }

    cb[MATCH] = matcher;
    ensureCanMutateNextTakers();
    nextTakers.push(cb);
    cb.cancel = io_6de156f3_once(function () {
      ensureCanMutateNextTakers();
      remove(nextTakers, cb);
    });
  }, _ref.close = close, _ref;
}
function stdChannel() {
  var chan = multicastChannel();
  var put = chan.put;

  chan.put = function (input) {
    if (input[redux_saga_symbols_esm_SAGA_ACTION]) {
      put(input);
      return;
    }

    asap(function () {
      put(input);
    });
  };

  return chan;
}

var RUNNING = 0;
var redux_saga_core_esm_CANCELLED = 1;
var ABORTED = 2;
var DONE = 3;

function resolvePromise(promise, cb) {
  var cancelPromise = promise[CANCEL];

  if (redux_saga_is_esm_func(cancelPromise)) {
    cb.cancel = cancelPromise;
  }

  promise.then(cb, function (error) {
    cb(error, true);
  });
}

var current = 0;
var nextSagaId = (function () {
  return ++current;
});

var _effectRunnerMap;

function getIteratorMetaInfo(iterator, fn) {
  if (iterator.isSagaIterator) {
    return {
      name: iterator.meta.name
    };
  }

  return getMetaInfo(fn);
}

function createTaskIterator(_ref) {
  var context = _ref.context,
      fn = _ref.fn,
      args = _ref.args;

  // catch synchronous failures; see #152 and #441
  try {
    var result = fn.apply(context, args); // i.e. a generator function returns an iterator

    if (iterator(result)) {
      return result;
    }

    var resolved = false;

    var next = function next(arg) {
      if (!resolved) {
        resolved = true; // Only promises returned from fork will be interpreted. See #1573

        return {
          value: result,
          done: !promise(result)
        };
      } else {
        return {
          value: arg,
          done: true
        };
      }
    };

    return makeIterator(next);
  } catch (err) {
    // do not bubble up synchronous failures for detached forks
    // instead create a failed task. See #152 and #441
    return makeIterator(function () {
      throw err;
    });
  }
}

function runPutEffect(env, _ref2, cb) {
  var channel = _ref2.channel,
      action = _ref2.action,
      resolve = _ref2.resolve;

  /**
   Schedule the put in case another saga is holding a lock.
   The put will be executed atomically. ie nested puts will execute after
   this put has terminated.
   **/
  asap(function () {
    var result;

    try {
      result = (channel ? channel.put : env.dispatch)(action);
    } catch (error) {
      cb(error, true);
      return;
    }

    if (resolve && promise(result)) {
      resolvePromise(result, cb);
    } else {
      cb(result);
    }
  }); // Put effects are non cancellables
}

function runTakeEffect(env, _ref3, cb) {
  var _ref3$channel = _ref3.channel,
      channel = _ref3$channel === void 0 ? env.channel : _ref3$channel,
      pattern = _ref3.pattern,
      maybe = _ref3.maybe;

  var takeCb = function takeCb(input) {
    if (input instanceof Error) {
      cb(input, true);
      return;
    }

    if (isEnd(input) && !maybe) {
      cb(TERMINATE);
      return;
    }

    cb(input);
  };

  try {
    channel.take(takeCb, redux_saga_is_esm_notUndef(pattern) ? matcher(pattern) : null);
  } catch (err) {
    cb(err, true);
    return;
  }

  cb.cancel = takeCb.cancel;
}

function runCallEffect(env, _ref4, cb, _ref5) {
  var context = _ref4.context,
      fn = _ref4.fn,
      args = _ref4.args;
  var task = _ref5.task;

  // catch synchronous failures; see #152
  try {
    var result = fn.apply(context, args);

    if (promise(result)) {
      resolvePromise(result, cb);
      return;
    }

    if (iterator(result)) {
      // resolve iterator
      proc(env, result, task.context, current, getMetaInfo(fn),
      /* isRoot */
      false, cb);
      return;
    }

    cb(result);
  } catch (error) {
    cb(error, true);
  }
}

function runCPSEffect(env, _ref6, cb) {
  var context = _ref6.context,
      fn = _ref6.fn,
      args = _ref6.args;

  // CPS (ie node style functions) can define their own cancellation logic
  // by setting cancel field on the cb
  // catch synchronous failures; see #152
  try {
    var cpsCb = function cpsCb(err, res) {
      if (undef(err)) {
        cb(res);
      } else {
        cb(err, true);
      }
    };

    fn.apply(context, args.concat(cpsCb));

    if (cpsCb.cancel) {
      cb.cancel = cpsCb.cancel;
    }
  } catch (error) {
    cb(error, true);
  }
}

function runForkEffect(env, _ref7, cb, _ref8) {
  var context = _ref7.context,
      fn = _ref7.fn,
      args = _ref7.args,
      detached = _ref7.detached;
  var parent = _ref8.task;
  var taskIterator = createTaskIterator({
    context: context,
    fn: fn,
    args: args
  });
  var meta = getIteratorMetaInfo(taskIterator, fn);
  immediately(function () {
    var child = proc(env, taskIterator, parent.context, current, meta, detached, undefined);

    if (detached) {
      cb(child);
    } else {
      if (child.isRunning()) {
        parent.queue.addTask(child);
        cb(child);
      } else if (child.isAborted()) {
        parent.queue.abort(child.error());
      } else {
        cb(child);
      }
    }
  }); // Fork effects are non cancellables
}

function runJoinEffect(env, taskOrTasks, cb, _ref9) {
  var task = _ref9.task;

  var joinSingleTask = function joinSingleTask(taskToJoin, cb) {
    if (taskToJoin.isRunning()) {
      var joiner = {
        task: task,
        cb: cb
      };

      cb.cancel = function () {
        if (taskToJoin.isRunning()) remove(taskToJoin.joiners, joiner);
      };

      taskToJoin.joiners.push(joiner);
    } else {
      if (taskToJoin.isAborted()) {
        cb(taskToJoin.error(), true);
      } else {
        cb(taskToJoin.result());
      }
    }
  };

  if (redux_saga_is_esm_array(taskOrTasks)) {
    if (taskOrTasks.length === 0) {
      cb([]);
      return;
    }

    var childCallbacks = createAllStyleChildCallbacks(taskOrTasks, cb);
    taskOrTasks.forEach(function (t, i) {
      joinSingleTask(t, childCallbacks[i]);
    });
  } else {
    joinSingleTask(taskOrTasks, cb);
  }
}

function cancelSingleTask(taskToCancel) {
  if (taskToCancel.isRunning()) {
    taskToCancel.cancel();
  }
}

function runCancelEffect(env, taskOrTasks, cb, _ref10) {
  var task = _ref10.task;

  if (taskOrTasks === SELF_CANCELLATION) {
    cancelSingleTask(task);
  } else if (redux_saga_is_esm_array(taskOrTasks)) {
    taskOrTasks.forEach(cancelSingleTask);
  } else {
    cancelSingleTask(taskOrTasks);
  }

  cb(); // cancel effects are non cancellables
}

function runAllEffect(env, effects, cb, _ref11) {
  var digestEffect = _ref11.digestEffect;
  var effectId = current;
  var keys = Object.keys(effects);

  if (keys.length === 0) {
    cb(redux_saga_is_esm_array(effects) ? [] : {});
    return;
  }

  var childCallbacks = createAllStyleChildCallbacks(effects, cb);
  keys.forEach(function (key) {
    digestEffect(effects[key], effectId, childCallbacks[key], key);
  });
}

function runRaceEffect(env, effects, cb, _ref12) {
  var digestEffect = _ref12.digestEffect;
  var effectId = current;
  var keys = Object.keys(effects);
  var response = redux_saga_is_esm_array(effects) ? createEmptyArray(keys.length) : {};
  var childCbs = {};
  var completed = false;
  keys.forEach(function (key) {
    var chCbAtKey = function chCbAtKey(res, isErr) {
      if (completed) {
        return;
      }

      if (isErr || shouldComplete(res)) {
        // Race Auto cancellation
        cb.cancel();
        cb(res, isErr);
      } else {
        cb.cancel();
        completed = true;
        response[key] = res;
        cb(response);
      }
    };

    chCbAtKey.cancel = noop;
    childCbs[key] = chCbAtKey;
  });

  cb.cancel = function () {
    // prevents unnecessary cancellation
    if (!completed) {
      completed = true;
      keys.forEach(function (key) {
        return childCbs[key].cancel();
      });
    }
  };

  keys.forEach(function (key) {
    if (completed) {
      return;
    }

    digestEffect(effects[key], effectId, childCbs[key], key);
  });
}

function runSelectEffect(env, _ref13, cb) {
  var selector = _ref13.selector,
      args = _ref13.args;

  try {
    var state = selector.apply(void 0, [env.getState()].concat(args));
    cb(state);
  } catch (error) {
    cb(error, true);
  }
}

function runChannelEffect(env, _ref14, cb) {
  var pattern = _ref14.pattern,
      buffer = _ref14.buffer;
  var chan = redux_saga_core_esm_channel(buffer);
  var match = matcher(pattern);

  var taker = function taker(action) {
    if (!isEnd(action)) {
      env.channel.take(taker, match);
    }

    chan.put(action);
  };

  var close = chan.close;

  chan.close = function () {
    taker.cancel();
    close();
  };

  env.channel.take(taker, match);
  cb(chan);
}

function runCancelledEffect(env, data, cb, _ref15) {
  var task = _ref15.task;
  cb(task.isCancelled());
}

function runFlushEffect(env, channel, cb) {
  channel.flush(cb);
}

function runGetContextEffect(env, prop, cb, _ref16) {
  var task = _ref16.task;
  cb(task.context[prop]);
}

function runSetContextEffect(env, props, cb, _ref17) {
  var task = _ref17.task;
  assignWithSymbols(task.context, props);
  cb();
}

var effectRunnerMap = (_effectRunnerMap = {}, _effectRunnerMap[TAKE] = runTakeEffect, _effectRunnerMap[PUT] = runPutEffect, _effectRunnerMap[ALL] = runAllEffect, _effectRunnerMap[RACE] = runRaceEffect, _effectRunnerMap[CALL] = runCallEffect, _effectRunnerMap[CPS] = runCPSEffect, _effectRunnerMap[FORK] = runForkEffect, _effectRunnerMap[JOIN] = runJoinEffect, _effectRunnerMap[io_6de156f3_CANCEL] = runCancelEffect, _effectRunnerMap[SELECT] = runSelectEffect, _effectRunnerMap[ACTION_CHANNEL] = runChannelEffect, _effectRunnerMap[CANCELLED] = runCancelledEffect, _effectRunnerMap[FLUSH] = runFlushEffect, _effectRunnerMap[GET_CONTEXT] = runGetContextEffect, _effectRunnerMap[SET_CONTEXT] = runSetContextEffect, _effectRunnerMap);

/**
 Used to track a parent task and its forks
 In the fork model, forked tasks are attached by default to their parent
 We model this using the concept of Parent task && main Task
 main task is the main flow of the current Generator, the parent tasks is the
 aggregation of the main tasks + all its forked tasks.
 Thus the whole model represents an execution tree with multiple branches (vs the
 linear execution tree in sequential (non parallel) programming)

 A parent tasks has the following semantics
 - It completes if all its forks either complete or all cancelled
 - If it's cancelled, all forks are cancelled as well
 - It aborts if any uncaught error bubbles up from forks
 - If it completes, the return value is the one returned by the main task
 **/

function forkQueue(mainTask, onAbort, cont) {
  var tasks = [];
  var result;
  var completed = false;
  addTask(mainTask);

  var getTasks = function getTasks() {
    return tasks;
  };

  function abort(err) {
    onAbort();
    cancelAll();
    cont(err, true);
  }

  function addTask(task) {
    tasks.push(task);

    task.cont = function (res, isErr) {
      if (completed) {
        return;
      }

      remove(tasks, task);
      task.cont = noop;

      if (isErr) {
        abort(res);
      } else {
        if (task === mainTask) {
          result = res;
        }

        if (!tasks.length) {
          completed = true;
          cont(result);
        }
      }
    };
  }

  function cancelAll() {
    if (completed) {
      return;
    }

    completed = true;
    tasks.forEach(function (t) {
      t.cont = noop;
      t.cancel();
    });
    tasks = [];
  }

  return {
    addTask: addTask,
    cancelAll: cancelAll,
    abort: abort,
    getTasks: getTasks
  };
}

// there can be only a single saga error created at any given moment

function formatLocation(fileName, lineNumber) {
  return fileName + "?" + lineNumber;
}

function effectLocationAsString(effect) {
  var location = getLocation(effect);

  if (location) {
    var code = location.code,
        fileName = location.fileName,
        lineNumber = location.lineNumber;
    var source = code + "  " + formatLocation(fileName, lineNumber);
    return source;
  }

  return '';
}

function sagaLocationAsString(sagaMeta) {
  var name = sagaMeta.name,
      location = sagaMeta.location;

  if (location) {
    return name + "  " + formatLocation(location.fileName, location.lineNumber);
  }

  return name;
}

function cancelledTasksAsString(sagaStack) {
  var cancelledTasks = flatMap(function (i) {
    return i.cancelledTasks;
  }, sagaStack);

  if (!cancelledTasks.length) {
    return '';
  }

  return ['Tasks cancelled due to error:'].concat(cancelledTasks).join('\n');
}

var crashedEffect = null;
var sagaStack = [];
var addSagaFrame = function addSagaFrame(frame) {
  frame.crashedEffect = crashedEffect;
  sagaStack.push(frame);
};
var redux_saga_core_esm_clear = function clear() {
  crashedEffect = null;
  sagaStack.length = 0;
}; // this sets crashed effect for the soon-to-be-reported saga frame
// this slightly streatches the singleton nature of this module into wrong direction
// as it's even less obvious what's the data flow here, but it is what it is for now

var setCrashedEffect = function setCrashedEffect(effect) {
  crashedEffect = effect;
};
/**
  @returns {string}

  @example
  The above error occurred in task errorInPutSaga {pathToFile}
  when executing effect put({type: 'REDUCER_ACTION_ERROR_IN_PUT'}) {pathToFile}
      created by fetchSaga {pathToFile}
      created by rootSaga {pathToFile}
*/

var redux_saga_core_esm_toString = function toString() {
  var firstSaga = sagaStack[0],
      otherSagas = sagaStack.slice(1);
  var crashedEffectLocation = firstSaga.crashedEffect ? effectLocationAsString(firstSaga.crashedEffect) : null;
  var errorMessage = "The above error occurred in task " + sagaLocationAsString(firstSaga.meta) + (crashedEffectLocation ? " \n when executing effect " + crashedEffectLocation : '');
  return [errorMessage].concat(otherSagas.map(function (s) {
    return "    created by " + sagaLocationAsString(s.meta);
  }), [cancelledTasksAsString(sagaStack)]).join('\n');
};

function newTask(env, mainTask, parentContext, parentEffectId, meta, isRoot, cont) {
  var _task;

  if (cont === void 0) {
    cont = noop;
  }

  var status = RUNNING;
  var taskResult;
  var taskError;
  var deferredEnd = null;
  var cancelledDueToErrorTasks = [];
  var context = Object.create(parentContext);
  var queue = forkQueue(mainTask, function onAbort() {
    cancelledDueToErrorTasks.push.apply(cancelledDueToErrorTasks, queue.getTasks().map(function (t) {
      return t.meta.name;
    }));
  }, end);
  /**
   This may be called by a parent generator to trigger/propagate cancellation
   cancel all pending tasks (including the main task), then end the current task.
    Cancellation propagates down to the whole execution tree held by this Parent task
   It's also propagated to all joiners of this task and their execution tree/joiners
    Cancellation is noop for terminated/Cancelled tasks tasks
   **/

  function cancel() {
    if (status === RUNNING) {
      // Setting status to CANCELLED does not necessarily mean that the task/iterators are stopped
      // effects in the iterator's finally block will still be executed
      status = redux_saga_core_esm_CANCELLED;
      queue.cancelAll(); // Ending with a TASK_CANCEL will propagate the Cancellation to all joiners

      end(TASK_CANCEL, false);
    }
  }

  function end(result, isErr) {
    if (!isErr) {
      // The status here may be RUNNING or CANCELLED
      // If the status is CANCELLED, then we do not need to change it here
      if (result === TASK_CANCEL) {
        status = redux_saga_core_esm_CANCELLED;
      } else if (status !== redux_saga_core_esm_CANCELLED) {
        status = DONE;
      }

      taskResult = result;
      deferredEnd && deferredEnd.resolve(result);
    } else {
      status = ABORTED;
      addSagaFrame({
        meta: meta,
        cancelledTasks: cancelledDueToErrorTasks
      });

      if (task.isRoot) {
        var sagaStack = redux_saga_core_esm_toString(); // we've dumped the saga stack to string and are passing it to user's code
        // we know that it won't be needed anymore and we need to clear it

        redux_saga_core_esm_clear();
        env.onError(result, {
          sagaStack: sagaStack
        });
      }

      taskError = result;
      deferredEnd && deferredEnd.reject(result);
    }

    task.cont(result, isErr);
    task.joiners.forEach(function (joiner) {
      joiner.cb(result, isErr);
    });
    task.joiners = null;
  }

  function setContext(props) {
    if (false) {}

    assignWithSymbols(context, props);
  }

  function toPromise() {
    if (deferredEnd) {
      return deferredEnd.promise;
    }

    deferredEnd = redux_saga_deferred_esm();

    if (status === ABORTED) {
      deferredEnd.reject(taskError);
    } else if (status !== RUNNING) {
      deferredEnd.resolve(taskResult);
    }

    return deferredEnd.promise;
  }

  var task = (_task = {}, _task[redux_saga_symbols_esm_TASK] = true, _task.id = parentEffectId, _task.meta = meta, _task.isRoot = isRoot, _task.context = context, _task.joiners = [], _task.queue = queue, _task.cancel = cancel, _task.cont = cont, _task.end = end, _task.setContext = setContext, _task.toPromise = toPromise, _task.isRunning = function isRunning() {
    return status === RUNNING;
  }, _task.isCancelled = function isCancelled() {
    return status === redux_saga_core_esm_CANCELLED || status === RUNNING && mainTask.status === redux_saga_core_esm_CANCELLED;
  }, _task.isAborted = function isAborted() {
    return status === ABORTED;
  }, _task.result = function result() {
    return taskResult;
  }, _task.error = function error() {
    return taskError;
  }, _task);
  return task;
}

function proc(env, iterator$1, parentContext, parentEffectId, meta, isRoot, cont) {
  if (false) {}

  var finalRunEffect = env.finalizeRunEffect(runEffect);
  /**
    Tracks the current effect cancellation
    Each time the generator progresses. calling runEffect will set a new value
    on it. It allows propagating cancellation to child effects
  **/

  next.cancel = noop;
  /** Creates a main task to track the main flow */

  var mainTask = {
    meta: meta,
    cancel: cancelMain,
    status: RUNNING
  };
  /**
   Creates a new task descriptor for this generator.
   A task is the aggregation of it's mainTask and all it's forked tasks.
   **/

  var task = newTask(env, mainTask, parentContext, parentEffectId, meta, isRoot, cont);
  var executingContext = {
    task: task,
    digestEffect: digestEffect
  };
  /**
    cancellation of the main task. We'll simply resume the Generator with a TASK_CANCEL
  **/

  function cancelMain() {
    if (mainTask.status === RUNNING) {
      mainTask.status = redux_saga_core_esm_CANCELLED;
      next(TASK_CANCEL);
    }
  }
  /**
    attaches cancellation logic to this task's continuation
    this will permit cancellation to propagate down the call chain
  **/


  if (cont) {
    cont.cancel = task.cancel;
  } // kicks up the generator


  next(); // then return the task descriptor to the caller

  return task;
  /**
   * This is the generator driver
   * It's a recursive async/continuation function which calls itself
   * until the generator terminates or throws
   * @param {internal commands(TASK_CANCEL | TERMINATE) | any} arg - value, generator will be resumed with.
   * @param {boolean} isErr - the flag shows if effect finished with an error
   *
   * receives either (command | effect result, false) or (any thrown thing, true)
   */

  function next(arg, isErr) {
    try {
      var result;

      if (isErr) {
        result = iterator$1.throw(arg); // user handled the error, we can clear bookkept values

        redux_saga_core_esm_clear();
      } else if (shouldCancel(arg)) {
        /**
          getting TASK_CANCEL automatically cancels the main task
          We can get this value here
           - By cancelling the parent task manually
          - By joining a Cancelled task
        **/
        mainTask.status = redux_saga_core_esm_CANCELLED;
        /**
          Cancels the current effect; this will propagate the cancellation down to any called tasks
        **/

        next.cancel();
        /**
          If this Generator has a `return` method then invokes it
          This will jump to the finally block
        **/

        result = redux_saga_is_esm_func(iterator$1.return) ? iterator$1.return(TASK_CANCEL) : {
          done: true,
          value: TASK_CANCEL
        };
      } else if (shouldTerminate(arg)) {
        // We get TERMINATE flag, i.e. by taking from a channel that ended using `take` (and not `takem` used to trap End of channels)
        result = redux_saga_is_esm_func(iterator$1.return) ? iterator$1.return() : {
          done: true
        };
      } else {
        result = iterator$1.next(arg);
      }

      if (!result.done) {
        digestEffect(result.value, parentEffectId, next);
      } else {
        /**
          This Generator has ended, terminate the main task and notify the fork queue
        **/
        if (mainTask.status !== redux_saga_core_esm_CANCELLED) {
          mainTask.status = DONE;
        }

        mainTask.cont(result.value);
      }
    } catch (error) {
      if (mainTask.status === redux_saga_core_esm_CANCELLED) {
        throw error;
      }

      mainTask.status = ABORTED;
      mainTask.cont(error, true);
    }
  }

  function runEffect(effect, effectId, currCb) {
    /**
      each effect runner must attach its own logic of cancellation to the provided callback
      it allows this generator to propagate cancellation downward.
       ATTENTION! effect runners must setup the cancel logic by setting cb.cancel = [cancelMethod]
      And the setup must occur before calling the callback
       This is a sort of inversion of control: called async functions are responsible
      of completing the flow by calling the provided continuation; while caller functions
      are responsible for aborting the current flow by calling the attached cancel function
       Library users can attach their own cancellation logic to promises by defining a
      promise[CANCEL] method in their returned promises
      ATTENTION! calling cancel must have no effect on an already completed or cancelled effect
    **/
    if (promise(effect)) {
      resolvePromise(effect, currCb);
    } else if (iterator(effect)) {
      // resolve iterator
      proc(env, effect, task.context, effectId, meta,
      /* isRoot */
      false, currCb);
    } else if (effect && effect[redux_saga_symbols_esm_IO]) {
      var effectRunner = effectRunnerMap[effect.type];
      effectRunner(env, effect.payload, currCb, executingContext);
    } else {
      // anything else returned as is
      currCb(effect);
    }
  }

  function digestEffect(effect, parentEffectId, cb, label) {
    if (label === void 0) {
      label = '';
    }

    var effectId = nextSagaId();
    env.sagaMonitor && env.sagaMonitor.effectTriggered({
      effectId: effectId,
      parentEffectId: parentEffectId,
      label: label,
      effect: effect
    });
    /**
      completion callback and cancel callback are mutually exclusive
      We can't cancel an already completed effect
      And We can't complete an already cancelled effectId
    **/

    var effectSettled; // Completion callback passed to the appropriate effect runner

    function currCb(res, isErr) {
      if (effectSettled) {
        return;
      }

      effectSettled = true;
      cb.cancel = noop; // defensive measure

      if (env.sagaMonitor) {
        if (isErr) {
          env.sagaMonitor.effectRejected(effectId, res);
        } else {
          env.sagaMonitor.effectResolved(effectId, res);
        }
      }

      if (isErr) {
        setCrashedEffect(effect);
      }

      cb(res, isErr);
    } // tracks down the current cancel


    currCb.cancel = noop; // setup cancellation logic on the parent cb

    cb.cancel = function () {
      // prevents cancelling an already completed effect
      if (effectSettled) {
        return;
      }

      effectSettled = true;
      currCb.cancel(); // propagates cancel downward

      currCb.cancel = noop; // defensive measure

      env.sagaMonitor && env.sagaMonitor.effectCancelled(effectId);
    };

    finalRunEffect(effect, effectId, currCb);
  }
}

var RUN_SAGA_SIGNATURE = 'runSaga(options, saga, ...args)';
var NON_GENERATOR_ERR = RUN_SAGA_SIGNATURE + ": saga argument must be a Generator function!";
function runSaga(_ref, saga) {
  var _ref$channel = _ref.channel,
      channel = _ref$channel === void 0 ? stdChannel() : _ref$channel,
      dispatch = _ref.dispatch,
      getState = _ref.getState,
      _ref$context = _ref.context,
      context = _ref$context === void 0 ? {} : _ref$context,
      sagaMonitor = _ref.sagaMonitor,
      effectMiddlewares = _ref.effectMiddlewares,
      _ref$onError = _ref.onError,
      onError = _ref$onError === void 0 ? logError : _ref$onError;

  if (false) {}

  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  var iterator$1 = saga.apply(void 0, args);

  if (false) {}

  var effectId = nextSagaId();

  if (sagaMonitor) {
    // monitors are expected to have a certain interface, let's fill-in any missing ones
    sagaMonitor.rootSagaStarted = sagaMonitor.rootSagaStarted || noop;
    sagaMonitor.effectTriggered = sagaMonitor.effectTriggered || noop;
    sagaMonitor.effectResolved = sagaMonitor.effectResolved || noop;
    sagaMonitor.effectRejected = sagaMonitor.effectRejected || noop;
    sagaMonitor.effectCancelled = sagaMonitor.effectCancelled || noop;
    sagaMonitor.actionDispatched = sagaMonitor.actionDispatched || noop;
    sagaMonitor.rootSagaStarted({
      effectId: effectId,
      saga: saga,
      args: args
    });
  }

  if (false) { var MIDDLEWARE_TYPE_ERROR; }

  var finalizeRunEffect;

  if (effectMiddlewares) {
    var middleware = compose.apply(void 0, effectMiddlewares);

    finalizeRunEffect = function finalizeRunEffect(runEffect) {
      return function (effect, effectId, currCb) {
        var plainRunEffect = function plainRunEffect(eff) {
          return runEffect(eff, effectId, currCb);
        };

        return middleware(plainRunEffect)(effect);
      };
    };
  } else {
    finalizeRunEffect = identity;
  }

  var env = {
    channel: channel,
    dispatch: wrapSagaDispatch(dispatch),
    getState: getState,
    sagaMonitor: sagaMonitor,
    onError: onError,
    finalizeRunEffect: finalizeRunEffect
  };
  return immediately(function () {
    var task = proc(env, iterator$1, context, effectId, getMetaInfo(saga),
    /* isRoot */
    true, undefined);

    if (sagaMonitor) {
      sagaMonitor.effectResolved(effectId, task);
    }

    return task;
  });
}

function sagaMiddlewareFactory(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      _ref$context = _ref.context,
      context = _ref$context === void 0 ? {} : _ref$context,
      _ref$channel = _ref.channel,
      channel = _ref$channel === void 0 ? stdChannel() : _ref$channel,
      sagaMonitor = _ref.sagaMonitor,
      options = _objectWithoutPropertiesLoose(_ref, ["context", "channel", "sagaMonitor"]);

  var boundRunSaga;

  if (false) {}

  function sagaMiddleware(_ref2) {
    var getState = _ref2.getState,
        dispatch = _ref2.dispatch;
    boundRunSaga = runSaga.bind(null, extends_extends({}, options, {
      context: context,
      channel: channel,
      dispatch: dispatch,
      getState: getState,
      sagaMonitor: sagaMonitor
    }));
    return function (next) {
      return function (action) {
        if (sagaMonitor && sagaMonitor.actionDispatched) {
          sagaMonitor.actionDispatched(action);
        }

        var result = next(action); // hit reducers

        channel.put(action);
        return result;
      };
    };
  }

  sagaMiddleware.run = function () {
    if (false) {}

    return boundRunSaga.apply(void 0, arguments);
  };

  sagaMiddleware.setContext = function (props) {
    if (false) {}

    assignWithSymbols(context, props);
  };

  return sagaMiddleware;
}

/* harmony default export */ const redux_saga_core_esm = (sagaMiddlewareFactory);


;// CONCATENATED MODULE: ../../../node_modules/redux-saga/dist/redux-saga-core-npm-proxy.esm.js





/* harmony default export */ const redux_saga_core_npm_proxy_esm = (redux_saga_core_esm);

;// CONCATENATED MODULE: ./hud/reducers/minimapReducer.tsx

const initialState = {
    zoom: 5,
};
/* harmony default export */ function minimapReducer(state = initialState, action) {
    switch (action.type) {
        case SET_MINIMAP_ZOOM: {
            return Object.assign(Object.assign({}, state), { zoom: action.payload });
        }
        default:
            return state;
    }
}

;// CONCATENATED MODULE: ./hud/reducers/settingsReducer.tsx

const settingsReducer_initialState = {
    visible: false,
    cameraLocked: true,
    cameraZoom: 1600,
    useCustomUI: true,
};
/* harmony default export */ function settingsReducer(state = settingsReducer_initialState, action) {
    switch (action.type) {
        case SET_SETTINGS_VISIBLE: {
            return Object.assign(Object.assign({}, state), { visible: action.payload.visible });
        }
        case SET_CAMERA_LOCKED: {
            return Object.assign(Object.assign({}, state), { cameraLocked: action.payload });
        }
        case SET_CAMERA_ZOOM: {
            return Object.assign(Object.assign({}, state), { cameraZoom: action.payload });
        }
        case SET_USE_CUSTOM_UI: {
            return Object.assign(Object.assign({}, state), { useCustomUI: action.payload.useCustomUI });
        }
        default:
            return state;
    }
}

;// CONCATENATED MODULE: ./hud/reducers/characterReducer.tsx

const characterReducer_initialState = {
    visible: false,
};
/* harmony default export */ function characterReducer(state = characterReducer_initialState, action) {
    switch (action.type) {
        case SET_CHARACTER_VISIBLE: {
            return Object.assign(Object.assign({}, state), { visible: action.payload.visible });
        }
        default:
            return state;
    }
}

;// CONCATENATED MODULE: ./hud/reducers/shopReducer.tsx

const shopReducer_initialState = {
    visible: false,
    searchValue: '',
};
/* harmony default export */ function shopReducer(state = shopReducer_initialState, action) {
    switch (action.type) {
        case SET_SHOP_VISIBLE: {
            return Object.assign(Object.assign({}, state), { visible: action.payload.visible });
        }
        case SET_SHOP_SEARCH_VALUE: {
            return Object.assign(Object.assign({}, state), { searchValue: action.payload.searchValue });
        }
        default:
            return state;
    }
}

;// CONCATENATED MODULE: ./hud/reducers/itemOptionsReducer.tsx

const itemOptionsReducer_initialState = {
    item: -1,
    visible: false,
    posX: 0,
};
/* harmony default export */ function itemOptionsReducer(state = itemOptionsReducer_initialState, action) {
    switch (action.type) {
        case SET_ITEM_OPTIONS_ITEM: {
            return Object.assign(Object.assign({}, state), { item: action.payload.item });
        }
        case SET_ITEM_OPTIONS_VISIBLE: {
            return Object.assign(Object.assign({}, state), { visible: action.payload.visible });
        }
        case SET_ITEM_OPTIONS_POSITION_X: {
            return Object.assign(Object.assign({}, state), { posX: action.payload.posX });
        }
        default:
            return state;
    }
}

;// CONCATENATED MODULE: ./hud/reducers/heroSelectionReducer.tsx

const heroSelectionReducer_initialState = {
    focusedHero: undefined,
    randomHeroDialogVisible: false,
};
/* harmony default export */ function heroSelectionReducer(state = heroSelectionReducer_initialState, action) {
    switch (action.type) {
        case SET_FOCUS_HERO: {
            return Object.assign(Object.assign({}, state), { focusedHero: action.payload.hero });
        }
        case RESET_FOCUSED_HERO: {
            return Object.assign(Object.assign({}, state), { focusedHero: undefined });
        }
        case SET_RANDOM_HERO_DIALOG_VISIBLE: {
            return Object.assign(Object.assign({}, state), { randomHeroDialogVisible: action.payload.visible });
        }
        default:
            return state;
    }
}

;// CONCATENATED MODULE: ./hud/reducers/abilitiesShopReducer.tsx

const abilitiesShopReducer_initialState = {
    visible: false,
};
/* harmony default export */ function abilitiesShopReducer(state = abilitiesShopReducer_initialState, action) {
    switch (action.type) {
        case SET_ABILITIES_SHOP_VISIBLE: {
            return Object.assign(Object.assign({}, state), { visible: action.payload.visible });
        }
        default:
            return state;
    }
}

;// CONCATENATED MODULE: ./hud/reducers/rootReducer.tsx








const rootReducer = combineReducers({
    minimapReducer: minimapReducer,
    settingsReducer: settingsReducer,
    characterReducer: characterReducer,
    shopReducer: shopReducer,
    itemOptionsReducer: itemOptionsReducer,
    heroSelectionReducer: heroSelectionReducer,
    abilitiesShopReducer: abilitiesShopReducer,
});

;// CONCATENATED MODULE: ../../../node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js







var done = function done(value) {
  return {
    done: true,
    value: value
  };
};

var qEnd = {};
function safeName(patternOrChannel) {
  if (channel(patternOrChannel)) {
    return 'channel';
  }

  if (stringableFunc(patternOrChannel)) {
    return String(patternOrChannel);
  }

  if (redux_saga_is_esm_func(patternOrChannel)) {
    return patternOrChannel.name;
  }

  return String(patternOrChannel);
}
function fsmIterator(fsm, startState, name) {
  var stateUpdater,
      errorState,
      effect,
      nextState = startState;

  function next(arg, error) {
    if (nextState === qEnd) {
      return done(arg);
    }

    if (error && !errorState) {
      nextState = qEnd;
      throw error;
    } else {
      stateUpdater && stateUpdater(arg);
      var currentState = error ? fsm[errorState](error) : fsm[nextState]();
      nextState = currentState.nextState;
      effect = currentState.effect;
      stateUpdater = currentState.stateUpdater;
      errorState = currentState.errorState;
      return nextState === qEnd ? done(arg) : effect;
    }
  }

  return makeIterator(next, function (error) {
    return next(null, error);
  }, name);
}

function takeEvery(patternOrChannel, worker) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  var yTake = {
    done: false,
    value: take(patternOrChannel)
  };

  var yFork = function yFork(ac) {
    return {
      done: false,
      value: fork.apply(void 0, [worker].concat(args, [ac]))
    };
  };

  var action,
      setAction = function setAction(ac) {
    return action = ac;
  };

  return fsmIterator({
    q1: function q1() {
      return {
        nextState: 'q2',
        effect: yTake,
        stateUpdater: setAction
      };
    },
    q2: function q2() {
      return {
        nextState: 'q1',
        effect: yFork(action)
      };
    }
  }, 'q1', "takeEvery(" + safeName(patternOrChannel) + ", " + worker.name + ")");
}

function takeLatest(patternOrChannel, worker) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  var yTake = {
    done: false,
    value: io_6de156f3_take(patternOrChannel)
  };

  var yFork = function yFork(ac) {
    return {
      done: false,
      value: io_6de156f3_fork.apply(void 0, [worker].concat(args, [ac]))
    };
  };

  var yCancel = function yCancel(task) {
    return {
      done: false,
      value: cancel(task)
    };
  };

  var task, action;

  var setTask = function setTask(t) {
    return task = t;
  };

  var setAction = function setAction(ac) {
    return action = ac;
  };

  return fsmIterator({
    q1: function q1() {
      return {
        nextState: 'q2',
        effect: yTake,
        stateUpdater: setAction
      };
    },
    q2: function q2() {
      return task ? {
        nextState: 'q3',
        effect: yCancel(task)
      } : {
        nextState: 'q1',
        effect: yFork(action),
        stateUpdater: setTask
      };
    },
    q3: function q3() {
      return {
        nextState: 'q1',
        effect: yFork(action),
        stateUpdater: setTask
      };
    }
  }, 'q1', "takeLatest(" + safeName(patternOrChannel) + ", " + worker.name + ")");
}

function takeLeading(patternOrChannel, worker) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  var yTake = {
    done: false,
    value: take(patternOrChannel)
  };

  var yCall = function yCall(ac) {
    return {
      done: false,
      value: call.apply(void 0, [worker].concat(args, [ac]))
    };
  };

  var action;

  var setAction = function setAction(ac) {
    return action = ac;
  };

  return fsmIterator({
    q1: function q1() {
      return {
        nextState: 'q2',
        effect: yTake,
        stateUpdater: setAction
      };
    },
    q2: function q2() {
      return {
        nextState: 'q1',
        effect: yCall(action)
      };
    }
  }, 'q1', "takeLeading(" + safeName(patternOrChannel) + ", " + worker.name + ")");
}

function throttle(delayLength, pattern, worker) {
  for (var _len = arguments.length, args = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    args[_key - 3] = arguments[_key];
  }

  var action, channel;
  var yActionChannel = {
    done: false,
    value: actionChannel(pattern, sliding(1))
  };

  var yTake = function yTake() {
    return {
      done: false,
      value: take(channel)
    };
  };

  var yFork = function yFork(ac) {
    return {
      done: false,
      value: fork.apply(void 0, [worker].concat(args, [ac]))
    };
  };

  var yDelay = {
    done: false,
    value: delay(delayLength)
  };

  var setAction = function setAction(ac) {
    return action = ac;
  };

  var setChannel = function setChannel(ch) {
    return channel = ch;
  };

  return fsmIterator({
    q1: function q1() {
      return {
        nextState: 'q2',
        effect: yActionChannel,
        stateUpdater: setChannel
      };
    },
    q2: function q2() {
      return {
        nextState: 'q3',
        effect: yTake(),
        stateUpdater: setAction
      };
    },
    q3: function q3() {
      return {
        nextState: 'q4',
        effect: yFork(action)
      };
    },
    q4: function q4() {
      return {
        nextState: 'q2',
        effect: yDelay
      };
    }
  }, 'q1', "throttle(" + safeName(pattern) + ", " + worker.name + ")");
}

function retry(maxTries, delayLength, fn) {
  var counter = maxTries;

  for (var _len = arguments.length, args = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    args[_key - 3] = arguments[_key];
  }

  var yCall = {
    done: false,
    value: call.apply(void 0, [fn].concat(args))
  };
  var yDelay = {
    done: false,
    value: delay(delayLength)
  };
  return fsmIterator({
    q1: function q1() {
      return {
        nextState: 'q2',
        effect: yCall,
        errorState: 'q10'
      };
    },
    q2: function q2() {
      return {
        nextState: qEnd
      };
    },
    q10: function q10(error) {
      counter -= 1;

      if (counter <= 0) {
        throw error;
      }

      return {
        nextState: 'q1',
        effect: yDelay
      };
    }
  }, 'q1', "retry(" + fn.name + ")");
}

function debounceHelper(delayLength, patternOrChannel, worker) {
  for (var _len = arguments.length, args = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    args[_key - 3] = arguments[_key];
  }

  var action, raceOutput;
  var yTake = {
    done: false,
    value: take(patternOrChannel)
  };
  var yRace = {
    done: false,
    value: race({
      action: take(patternOrChannel),
      debounce: delay(delayLength)
    })
  };

  var yFork = function yFork(ac) {
    return {
      done: false,
      value: fork.apply(void 0, [worker].concat(args, [ac]))
    };
  };

  var yNoop = function yNoop(value) {
    return {
      done: false,
      value: value
    };
  };

  var setAction = function setAction(ac) {
    return action = ac;
  };

  var setRaceOutput = function setRaceOutput(ro) {
    return raceOutput = ro;
  };

  return fsmIterator({
    q1: function q1() {
      return {
        nextState: 'q2',
        effect: yTake,
        stateUpdater: setAction
      };
    },
    q2: function q2() {
      return {
        nextState: 'q3',
        effect: yRace,
        stateUpdater: setRaceOutput
      };
    },
    q3: function q3() {
      return raceOutput.debounce ? {
        nextState: 'q1',
        effect: yFork(action)
      } : {
        nextState: 'q2',
        effect: yNoop(raceOutput.action),
        stateUpdater: setAction
      };
    }
  }, 'q1', "debounce(" + safeName(patternOrChannel) + ", " + worker.name + ")");
}

var validateTakeEffect = function validateTakeEffect(fn, patternOrChannel, worker) {
  check(patternOrChannel, notUndef, fn.name + " requires a pattern or channel");
  check(worker, notUndef, fn.name + " requires a saga parameter");
};

function takeEvery$1(patternOrChannel, worker) {
  if (false) {}

  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  return fork.apply(void 0, [takeEvery, patternOrChannel, worker].concat(args));
}
function takeLatest$1(patternOrChannel, worker) {
  if (false) {}

  for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
    args[_key2 - 2] = arguments[_key2];
  }

  return io_6de156f3_fork.apply(void 0, [takeLatest, patternOrChannel, worker].concat(args));
}
function takeLeading$1(patternOrChannel, worker) {
  if (false) {}

  for (var _len3 = arguments.length, args = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
    args[_key3 - 2] = arguments[_key3];
  }

  return fork.apply(void 0, [takeLeading, patternOrChannel, worker].concat(args));
}
function throttle$1(ms, pattern, worker) {
  if (false) {}

  for (var _len4 = arguments.length, args = new Array(_len4 > 3 ? _len4 - 3 : 0), _key4 = 3; _key4 < _len4; _key4++) {
    args[_key4 - 3] = arguments[_key4];
  }

  return fork.apply(void 0, [throttle, ms, pattern, worker].concat(args));
}
function retry$1(maxTries, delayLength, worker) {
  for (var _len5 = arguments.length, args = new Array(_len5 > 3 ? _len5 - 3 : 0), _key5 = 3; _key5 < _len5; _key5++) {
    args[_key5 - 3] = arguments[_key5];
  }

  return call.apply(void 0, [retry, maxTries, delayLength, worker].concat(args));
}
function debounce(delayLength, pattern, worker) {
  for (var _len6 = arguments.length, args = new Array(_len6 > 3 ? _len6 - 3 : 0), _key6 = 3; _key6 < _len6; _key6++) {
    args[_key6 - 3] = arguments[_key6];
  }

  return fork.apply(void 0, [debounceHelper, delayLength, pattern, worker].concat(args));
}



;// CONCATENATED MODULE: ../../../node_modules/redux-saga/dist/redux-saga-effects-npm-proxy.esm.js


;// CONCATENATED MODULE: ./hud/sagas/characterSaga.tsx





function* characterVisible({ payload }) {
    if (payload.visible === true) {
        yield put({ type: SET_SETTINGS_VISIBLE, payload: { visible: false } });
        yield put({ type: SET_SHOP_VISIBLE, payload: { visible: false } });
        yield put({ type: SET_ABILITIES_SHOP_VISIBLE, payload: { visible: false } });
    }
}
function* characterSaga() {
    yield takeLatest$1(SET_CHARACTER_VISIBLE, characterVisible);
}
/* harmony default export */ const sagas_characterSaga = (characterSaga);

;// CONCATENATED MODULE: ./hud/sagas/settingsSaga.tsx





function* settingsVisible({ payload }) {
    if (payload.visible === true) {
        yield put({ type: SET_CHARACTER_VISIBLE, payload: { visible: false } });
        yield put({ type: SET_SHOP_VISIBLE, payload: { visible: false } });
        yield put({ type: SET_ABILITIES_SHOP_VISIBLE, payload: { visible: false } });
    }
}
function* settingsSaga() {
    yield takeLatest$1(SET_SETTINGS_VISIBLE, settingsVisible);
}
/* harmony default export */ const sagas_settingsSaga = (settingsSaga);

;// CONCATENATED MODULE: ./hud/sagas/shopSaga.tsx





function* shopVisible({ payload }) {
    if (payload.visible === true) {
        yield put({ type: SET_SETTINGS_VISIBLE, payload: { visible: false } });
        yield put({ type: SET_CHARACTER_VISIBLE, payload: { visible: false } });
        yield put({ type: SET_ABILITIES_SHOP_VISIBLE, payload: { visible: false } });
    }
}
function* shopSaga() {
    yield takeLatest$1(SET_SHOP_VISIBLE, shopVisible);
}
/* harmony default export */ const sagas_shopSaga = (shopSaga);

;// CONCATENATED MODULE: ./hud/sagas/heroSelectionSaga.tsx


function* randomHeroDialogVisible({ payload }) {
    if (payload.visible === true) {
        yield put({ type: RESET_FOCUSED_HERO });
    }
}
function* focusHero({ payload }) {
    yield put({ type: SET_RANDOM_HERO_DIALOG_VISIBLE, payload: { visible: false } });
}
function* heroSelectionSaga() {
    yield takeLatest$1(SET_RANDOM_HERO_DIALOG_VISIBLE, randomHeroDialogVisible);
    yield takeLatest$1(SET_FOCUS_HERO, focusHero);
}
/* harmony default export */ const sagas_heroSelectionSaga = (heroSelectionSaga);

;// CONCATENATED MODULE: ./hud/sagas/abilitiesShopSaga.tsx





function* abilitiesShopVisible({ payload }) {
    if (payload.visible === true) {
        yield put({ type: SET_SETTINGS_VISIBLE, payload: { visible: false } });
        yield put({ type: SET_CHARACTER_VISIBLE, payload: { visible: false } });
        yield put({ type: SET_SHOP_VISIBLE, payload: { visible: false } });
    }
}
function* abilitiesShopSaga() {
    yield takeLatest$1(SET_ABILITIES_SHOP_VISIBLE, abilitiesShopVisible);
}
/* harmony default export */ const sagas_abilitiesShopSaga = (abilitiesShopSaga);

;// CONCATENATED MODULE: ./hud/sagas/rootSaga.tsx






const rootSaga = function* root() {
    yield io_6de156f3_fork(sagas_settingsSaga);
    yield io_6de156f3_fork(sagas_characterSaga);
    yield io_6de156f3_fork(sagas_shopSaga);
    yield io_6de156f3_fork(sagas_heroSelectionSaga);
    yield io_6de156f3_fork(sagas_abilitiesShopSaga);
};

;// CONCATENATED MODULE: ./hud/store/configureStore.tsx




function configureStore() {
    const sagaMiddleware = redux_saga_core_npm_proxy_esm();
    const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(rootSaga);
    return store;
}

;// CONCATENATED MODULE: ./hud/index.tsx





const store = configureStore();
q(react.createElement(components_Provider, { store: store },
    react.createElement(hud_App, null)), $.GetContextPanel());

})();

/******/ })()
;