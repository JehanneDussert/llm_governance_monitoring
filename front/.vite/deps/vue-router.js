import {
  createHooks
} from "./chunk-34M3GWYY.js";
import {
  computed,
  defineComponent,
  getCurrentInstance,
  h,
  inject,
  nextTick,
  onActivated,
  onDeactivated,
  onUnmounted,
  provide,
  reactive,
  ref,
  shallowReactive,
  shallowRef,
  unref,
  watch,
  watchEffect
} from "./chunk-DFRE5DSA.js";

// node_modules/.pnpm/vue-router@5.0.3_@vue+compiler-sfc@3.5.30_pinia@3.0.4_typescript@5.9.3_vue@3.5.30_typescript@_i4dbyttqvptjjqanjkhzwnporu/node_modules/vue-router/dist/useApi-j1E6pMaV.js
var isBrowser = typeof document !== "undefined";
function isRouteComponent(component) {
  return typeof component === "object" || "displayName" in component || "props" in component || "__vccOpts" in component;
}
function isESModule(obj) {
  return obj.__esModule || obj[Symbol.toStringTag] === "Module" || obj.default && isRouteComponent(obj.default);
}
var assign = Object.assign;
function applyToParams(fn, params) {
  const newParams = {};
  for (const key in params) {
    const value = params[key];
    newParams[key] = isArray(value) ? value.map(fn) : fn(value);
  }
  return newParams;
}
var noop = () => {
};
var isArray = Array.isArray;
function mergeOptions(defaults, partialOptions) {
  const options = {};
  for (const key in defaults) options[key] = key in partialOptions ? partialOptions[key] : defaults[key];
  return options;
}
var ErrorTypes = (function(ErrorTypes2) {
  ErrorTypes2[ErrorTypes2["MATCHER_NOT_FOUND"] = 1] = "MATCHER_NOT_FOUND";
  ErrorTypes2[ErrorTypes2["NAVIGATION_GUARD_REDIRECT"] = 2] = "NAVIGATION_GUARD_REDIRECT";
  ErrorTypes2[ErrorTypes2["NAVIGATION_ABORTED"] = 4] = "NAVIGATION_ABORTED";
  ErrorTypes2[ErrorTypes2["NAVIGATION_CANCELLED"] = 8] = "NAVIGATION_CANCELLED";
  ErrorTypes2[ErrorTypes2["NAVIGATION_DUPLICATED"] = 16] = "NAVIGATION_DUPLICATED";
  return ErrorTypes2;
})({});
var NavigationFailureSymbol = /* @__PURE__ */ Symbol(true ? "navigation failure" : "");
var NavigationFailureType = (function(NavigationFailureType2) {
  NavigationFailureType2[NavigationFailureType2["aborted"] = 4] = "aborted";
  NavigationFailureType2[NavigationFailureType2["cancelled"] = 8] = "cancelled";
  NavigationFailureType2[NavigationFailureType2["duplicated"] = 16] = "duplicated";
  return NavigationFailureType2;
})({});
var ErrorTypeMessages = {
  [ErrorTypes.MATCHER_NOT_FOUND]({ location: location2, currentLocation }) {
    return `No match for
 ${JSON.stringify(location2)}${currentLocation ? "\nwhile being at\n" + JSON.stringify(currentLocation) : ""}`;
  },
  [ErrorTypes.NAVIGATION_GUARD_REDIRECT]({ from, to }) {
    return `Redirected from "${from.fullPath}" to "${stringifyRoute(to)}" via a navigation guard.`;
  },
  [ErrorTypes.NAVIGATION_ABORTED]({ from, to }) {
    return `Navigation aborted from "${from.fullPath}" to "${to.fullPath}" via a navigation guard.`;
  },
  [ErrorTypes.NAVIGATION_CANCELLED]({ from, to }) {
    return `Navigation cancelled from "${from.fullPath}" to "${to.fullPath}" with a new navigation.`;
  },
  [ErrorTypes.NAVIGATION_DUPLICATED]({ from, to }) {
    return `Avoided redundant navigation to current location: "${from.fullPath}".`;
  }
};
function createRouterError(type, params) {
  if (true) return assign(new Error(ErrorTypeMessages[type](params)), {
    type,
    [NavigationFailureSymbol]: true
  }, params);
  else return assign(new Error(), {
    type,
    [NavigationFailureSymbol]: true
  }, params);
}
function isNavigationFailure(error, type) {
  return error instanceof Error && NavigationFailureSymbol in error && (type == null || !!(error.type & type));
}
var propertiesToLog = [
  "params",
  "query",
  "hash"
];
function stringifyRoute(to) {
  if (typeof to === "string") return to;
  if (to.path != null) return to.path;
  const location2 = {};
  for (const key of propertiesToLog) if (key in to) location2[key] = to[key];
  return JSON.stringify(location2, null, 2);
}
var matchedRouteKey = /* @__PURE__ */ Symbol(true ? "router view location matched" : "");
var viewDepthKey = /* @__PURE__ */ Symbol(true ? "router view depth" : "");
var routerKey = /* @__PURE__ */ Symbol(true ? "router" : "");
var routeLocationKey = /* @__PURE__ */ Symbol(true ? "route location" : "");
var routerViewLocationKey = /* @__PURE__ */ Symbol(true ? "router view location" : "");
function useRouter() {
  return inject(routerKey);
}
function useRoute(_name) {
  return inject(routeLocationKey);
}

// node_modules/.pnpm/@vue+devtools-shared@8.1.0/node_modules/@vue/devtools-shared/dist/index.js
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJSMin = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
    key = keys[i];
    if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
      get: ((k) => from[k]).bind(null, key),
      enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
    });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target2) => (target2 = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target2, "default", {
  value: mod,
  enumerable: true
}) : target2, mod));
var isBrowser2 = typeof navigator !== "undefined";
var target = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : typeof global !== "undefined" ? global : {};
var isInChromePanel = typeof target.chrome !== "undefined" && !!target.chrome.devtools;
var isInIframe = isBrowser2 && target.self !== target.top;
var isInElectron = typeof navigator !== "undefined" && navigator.userAgent?.toLowerCase().includes("electron");
var isNuxtApp = typeof window !== "undefined" && !!window.__NUXT__;
var import_rfdc = __toESM(__commonJSMin(((exports, module) => {
  module.exports = rfdc;
  function copyBuffer(cur) {
    if (cur instanceof Buffer) return Buffer.from(cur);
    return new cur.constructor(cur.buffer.slice(), cur.byteOffset, cur.length);
  }
  function rfdc(opts) {
    opts = opts || {};
    if (opts.circles) return rfdcCircles(opts);
    const constructorHandlers = /* @__PURE__ */ new Map();
    constructorHandlers.set(Date, (o) => new Date(o));
    constructorHandlers.set(Map, (o, fn) => new Map(cloneArray(Array.from(o), fn)));
    constructorHandlers.set(Set, (o, fn) => new Set(cloneArray(Array.from(o), fn)));
    if (opts.constructorHandlers) for (const handler2 of opts.constructorHandlers) constructorHandlers.set(handler2[0], handler2[1]);
    let handler = null;
    return opts.proto ? cloneProto : clone;
    function cloneArray(a, fn) {
      const keys = Object.keys(a);
      const a2 = new Array(keys.length);
      for (let i = 0; i < keys.length; i++) {
        const k = keys[i];
        const cur = a[k];
        if (typeof cur !== "object" || cur === null) a2[k] = cur;
        else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) a2[k] = handler(cur, fn);
        else if (ArrayBuffer.isView(cur)) a2[k] = copyBuffer(cur);
        else a2[k] = fn(cur);
      }
      return a2;
    }
    function clone(o) {
      if (typeof o !== "object" || o === null) return o;
      if (Array.isArray(o)) return cloneArray(o, clone);
      if (o.constructor !== Object && (handler = constructorHandlers.get(o.constructor))) return handler(o, clone);
      const o2 = {};
      for (const k in o) {
        if (Object.hasOwnProperty.call(o, k) === false) continue;
        const cur = o[k];
        if (typeof cur !== "object" || cur === null) o2[k] = cur;
        else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) o2[k] = handler(cur, clone);
        else if (ArrayBuffer.isView(cur)) o2[k] = copyBuffer(cur);
        else o2[k] = clone(cur);
      }
      return o2;
    }
    function cloneProto(o) {
      if (typeof o !== "object" || o === null) return o;
      if (Array.isArray(o)) return cloneArray(o, cloneProto);
      if (o.constructor !== Object && (handler = constructorHandlers.get(o.constructor))) return handler(o, cloneProto);
      const o2 = {};
      for (const k in o) {
        const cur = o[k];
        if (typeof cur !== "object" || cur === null) o2[k] = cur;
        else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) o2[k] = handler(cur, cloneProto);
        else if (ArrayBuffer.isView(cur)) o2[k] = copyBuffer(cur);
        else o2[k] = cloneProto(cur);
      }
      return o2;
    }
  }
  function rfdcCircles(opts) {
    const refs = [];
    const refsNew = [];
    const constructorHandlers = /* @__PURE__ */ new Map();
    constructorHandlers.set(Date, (o) => new Date(o));
    constructorHandlers.set(Map, (o, fn) => new Map(cloneArray(Array.from(o), fn)));
    constructorHandlers.set(Set, (o, fn) => new Set(cloneArray(Array.from(o), fn)));
    if (opts.constructorHandlers) for (const handler2 of opts.constructorHandlers) constructorHandlers.set(handler2[0], handler2[1]);
    let handler = null;
    return opts.proto ? cloneProto : clone;
    function cloneArray(a, fn) {
      const keys = Object.keys(a);
      const a2 = new Array(keys.length);
      for (let i = 0; i < keys.length; i++) {
        const k = keys[i];
        const cur = a[k];
        if (typeof cur !== "object" || cur === null) a2[k] = cur;
        else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) a2[k] = handler(cur, fn);
        else if (ArrayBuffer.isView(cur)) a2[k] = copyBuffer(cur);
        else {
          const index = refs.indexOf(cur);
          if (index !== -1) a2[k] = refsNew[index];
          else a2[k] = fn(cur);
        }
      }
      return a2;
    }
    function clone(o) {
      if (typeof o !== "object" || o === null) return o;
      if (Array.isArray(o)) return cloneArray(o, clone);
      if (o.constructor !== Object && (handler = constructorHandlers.get(o.constructor))) return handler(o, clone);
      const o2 = {};
      refs.push(o);
      refsNew.push(o2);
      for (const k in o) {
        if (Object.hasOwnProperty.call(o, k) === false) continue;
        const cur = o[k];
        if (typeof cur !== "object" || cur === null) o2[k] = cur;
        else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) o2[k] = handler(cur, clone);
        else if (ArrayBuffer.isView(cur)) o2[k] = copyBuffer(cur);
        else {
          const i = refs.indexOf(cur);
          if (i !== -1) o2[k] = refsNew[i];
          else o2[k] = clone(cur);
        }
      }
      refs.pop();
      refsNew.pop();
      return o2;
    }
    function cloneProto(o) {
      if (typeof o !== "object" || o === null) return o;
      if (Array.isArray(o)) return cloneArray(o, cloneProto);
      if (o.constructor !== Object && (handler = constructorHandlers.get(o.constructor))) return handler(o, cloneProto);
      const o2 = {};
      refs.push(o);
      refsNew.push(o2);
      for (const k in o) {
        const cur = o[k];
        if (typeof cur !== "object" || cur === null) o2[k] = cur;
        else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) o2[k] = handler(cur, cloneProto);
        else if (ArrayBuffer.isView(cur)) o2[k] = copyBuffer(cur);
        else {
          const i = refs.indexOf(cur);
          if (i !== -1) o2[k] = refsNew[i];
          else o2[k] = cloneProto(cur);
        }
      }
      refs.pop();
      refsNew.pop();
      return o2;
    }
  }
}))(), 1);
var classifyRE = /(?:^|[-_/])(\w)/g;
function toUpper(_, c) {
  return c ? c.toUpperCase() : "";
}
function classify(str) {
  return str && `${str}`.replace(classifyRE, toUpper);
}
function basename(filename, ext) {
  let normalizedFilename = filename.replace(/^[a-z]:/i, "").replace(/\\/g, "/");
  if (normalizedFilename.endsWith(`index${ext}`)) normalizedFilename = normalizedFilename.replace(`/index${ext}`, ext);
  const lastSlashIndex = normalizedFilename.lastIndexOf("/");
  const baseNameWithExt = normalizedFilename.substring(lastSlashIndex + 1);
  if (ext) {
    const extIndex = baseNameWithExt.lastIndexOf(ext);
    return baseNameWithExt.substring(0, extIndex);
  }
  return "";
}
var deepClone = (0, import_rfdc.default)({ circles: true });

// node_modules/.pnpm/perfect-debounce@2.1.0/node_modules/perfect-debounce/dist/index.mjs
var DEBOUNCE_DEFAULTS = { trailing: true };
function debounce(fn, wait = 25, options = {}) {
  options = {
    ...DEBOUNCE_DEFAULTS,
    ...options
  };
  if (!Number.isFinite(wait)) throw new TypeError("Expected `wait` to be a finite number");
  let leadingValue;
  let timeout;
  let resolveList = [];
  let currentPromise;
  let trailingArgs;
  const applyFn = (_this, args) => {
    currentPromise = _applyPromised(fn, _this, args);
    currentPromise.finally(() => {
      currentPromise = null;
      if (options.trailing && trailingArgs && !timeout) {
        const promise = applyFn(_this, trailingArgs);
        trailingArgs = null;
        return promise;
      }
    });
    return currentPromise;
  };
  const debounced = function(...args) {
    if (options.trailing) trailingArgs = args;
    if (currentPromise) return currentPromise;
    return new Promise((resolve) => {
      const shouldCallNow = !timeout && options.leading;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        timeout = null;
        const promise = options.leading ? leadingValue : applyFn(this, args);
        trailingArgs = null;
        for (const _resolve of resolveList) _resolve(promise);
        resolveList = [];
      }, wait);
      if (shouldCallNow) {
        leadingValue = applyFn(this, args);
        resolve(leadingValue);
      } else resolveList.push(resolve);
    });
  };
  const _clearTimeout = (timer) => {
    if (timer) {
      clearTimeout(timer);
      timeout = null;
    }
  };
  debounced.isPending = () => !!timeout;
  debounced.cancel = () => {
    _clearTimeout(timeout);
    resolveList = [];
    trailingArgs = null;
  };
  debounced.flush = () => {
    _clearTimeout(timeout);
    if (!trailingArgs || currentPromise) return;
    const args = trailingArgs;
    trailingArgs = null;
    return applyFn(this, args);
  };
  return debounced;
}
async function _applyPromised(fn, _this, args) {
  return await fn.apply(_this, args);
}

// node_modules/.pnpm/@vue+devtools-kit@8.1.0/node_modules/@vue/devtools-kit/dist/index.js
var __create2 = Object.create;
var __defProp2 = Object.defineProperty;
var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
var __getOwnPropNames2 = Object.getOwnPropertyNames;
var __getProtoOf2 = Object.getPrototypeOf;
var __hasOwnProp2 = Object.prototype.hasOwnProperty;
var __commonJSMin2 = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
var __copyProps2 = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames2(from), i = 0, n = keys.length, key; i < n; i++) {
    key = keys[i];
    if (!__hasOwnProp2.call(to, key) && key !== except) __defProp2(to, key, {
      get: ((k) => from[k]).bind(null, key),
      enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable
    });
  }
  return to;
};
var __toESM2 = (mod, isNodeMode, target2) => (target2 = mod != null ? __create2(__getProtoOf2(mod)) : {}, __copyProps2(isNodeMode || !mod || !mod.__esModule ? __defProp2(target2, "default", {
  value: mod,
  enumerable: true
}) : target2, mod));
function getComponentTypeName(options) {
  if (typeof options === "function") return options.displayName || options.name || options.__VUE_DEVTOOLS_COMPONENT_GUSSED_NAME__ || "";
  const name = options.name || options._componentTag || options.__VUE_DEVTOOLS_COMPONENT_GUSSED_NAME__ || options.__name;
  if (name === "index" && options.__file?.endsWith("index.vue")) return "";
  return name;
}
function getComponentFileName(options) {
  const file = options.__file;
  if (file) return classify(basename(file, ".vue"));
}
function saveComponentGussedName(instance, name) {
  instance.type.__VUE_DEVTOOLS_COMPONENT_GUSSED_NAME__ = name;
  return name;
}
function getAppRecord(instance) {
  if (instance.__VUE_DEVTOOLS_NEXT_APP_RECORD__) return instance.__VUE_DEVTOOLS_NEXT_APP_RECORD__;
  else if (instance.root) return instance.appContext.app.__VUE_DEVTOOLS_NEXT_APP_RECORD__;
}
function isFragment(instance) {
  const subTreeType = instance.subTree?.type;
  const appRecord = getAppRecord(instance);
  if (appRecord) return appRecord?.types?.Fragment === subTreeType;
  return false;
}
function getInstanceName(instance) {
  const name = getComponentTypeName(instance?.type || {});
  if (name) return name;
  if (instance?.root === instance) return "Root";
  for (const key in instance.parent?.type?.components) if (instance.parent.type.components[key] === instance?.type) return saveComponentGussedName(instance, key);
  for (const key in instance.appContext?.components) if (instance.appContext.components[key] === instance?.type) return saveComponentGussedName(instance, key);
  const fileName = getComponentFileName(instance?.type || {});
  if (fileName) return fileName;
  return "Anonymous Component";
}
function getUniqueComponentId(instance) {
  return `${instance?.appContext?.app?.__VUE_DEVTOOLS_NEXT_APP_RECORD_ID__ ?? 0}:${instance === instance?.root ? "root" : instance.uid}`;
}
function getComponentInstance(appRecord, instanceId) {
  instanceId = instanceId || `${appRecord.id}:root`;
  return appRecord.instanceMap.get(instanceId) || appRecord.instanceMap.get(":root");
}
function createRect() {
  const rect = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    get width() {
      return rect.right - rect.left;
    },
    get height() {
      return rect.bottom - rect.top;
    }
  };
  return rect;
}
var range;
function getTextRect(node) {
  if (!range) range = document.createRange();
  range.selectNode(node);
  return range.getBoundingClientRect();
}
function getFragmentRect(vnode) {
  const rect = createRect();
  if (!vnode.children) return rect;
  for (let i = 0, l = vnode.children.length; i < l; i++) {
    const childVnode = vnode.children[i];
    let childRect;
    if (childVnode.component) childRect = getComponentBoundingRect(childVnode.component);
    else if (childVnode.el) {
      const el = childVnode.el;
      if (el.nodeType === 1 || el.getBoundingClientRect) childRect = el.getBoundingClientRect();
      else if (el.nodeType === 3 && el.data.trim()) childRect = getTextRect(el);
    }
    if (childRect) mergeRects(rect, childRect);
  }
  return rect;
}
function mergeRects(a, b) {
  if (!a.top || b.top < a.top) a.top = b.top;
  if (!a.bottom || b.bottom > a.bottom) a.bottom = b.bottom;
  if (!a.left || b.left < a.left) a.left = b.left;
  if (!a.right || b.right > a.right) a.right = b.right;
  return a;
}
var DEFAULT_RECT = {
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: 0,
  height: 0
};
function getComponentBoundingRect(instance) {
  const el = instance.subTree.el;
  if (typeof window === "undefined") return DEFAULT_RECT;
  if (isFragment(instance)) return getFragmentRect(instance.subTree);
  else if (el?.nodeType === 1) return el?.getBoundingClientRect();
  else if (instance.subTree.component) return getComponentBoundingRect(instance.subTree.component);
  else return DEFAULT_RECT;
}
function getRootElementsFromComponentInstance(instance) {
  if (isFragment(instance)) return getFragmentRootElements(instance.subTree);
  if (!instance.subTree) return [];
  return [instance.subTree.el];
}
function getFragmentRootElements(vnode) {
  if (!vnode.children) return [];
  const list = [];
  vnode.children.forEach((childVnode) => {
    if (childVnode.component) list.push(...getRootElementsFromComponentInstance(childVnode.component));
    else if (childVnode?.el) list.push(childVnode.el);
  });
  return list;
}
var CONTAINER_ELEMENT_ID = "__vue-devtools-component-inspector__";
var CARD_ELEMENT_ID = "__vue-devtools-component-inspector__card__";
var COMPONENT_NAME_ELEMENT_ID = "__vue-devtools-component-inspector__name__";
var INDICATOR_ELEMENT_ID = "__vue-devtools-component-inspector__indicator__";
var containerStyles = {
  display: "block",
  zIndex: 2147483640,
  position: "fixed",
  backgroundColor: "#42b88325",
  border: "1px solid #42b88350",
  borderRadius: "5px",
  transition: "all 0.1s ease-in",
  pointerEvents: "none"
};
var cardStyles = {
  fontFamily: "Arial, Helvetica, sans-serif",
  padding: "5px 8px",
  borderRadius: "4px",
  textAlign: "left",
  position: "absolute",
  left: 0,
  color: "#e9e9e9",
  fontSize: "14px",
  fontWeight: 600,
  lineHeight: "24px",
  backgroundColor: "#42b883",
  boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)"
};
var indicatorStyles = {
  display: "inline-block",
  fontWeight: 400,
  fontStyle: "normal",
  fontSize: "12px",
  opacity: 0.7
};
function getContainerElement() {
  return document.getElementById(CONTAINER_ELEMENT_ID);
}
function getCardElement() {
  return document.getElementById(CARD_ELEMENT_ID);
}
function getIndicatorElement() {
  return document.getElementById(INDICATOR_ELEMENT_ID);
}
function getNameElement() {
  return document.getElementById(COMPONENT_NAME_ELEMENT_ID);
}
function getStyles(bounds) {
  return {
    left: `${Math.round(bounds.left * 100) / 100}px`,
    top: `${Math.round(bounds.top * 100) / 100}px`,
    width: `${Math.round(bounds.width * 100) / 100}px`,
    height: `${Math.round(bounds.height * 100) / 100}px`
  };
}
function create(options) {
  const containerEl = document.createElement("div");
  containerEl.id = options.elementId ?? CONTAINER_ELEMENT_ID;
  Object.assign(containerEl.style, {
    ...containerStyles,
    ...getStyles(options.bounds),
    ...options.style
  });
  const cardEl = document.createElement("span");
  cardEl.id = CARD_ELEMENT_ID;
  Object.assign(cardEl.style, {
    ...cardStyles,
    top: options.bounds.top < 35 ? 0 : "-35px"
  });
  const nameEl = document.createElement("span");
  nameEl.id = COMPONENT_NAME_ELEMENT_ID;
  nameEl.innerHTML = `&lt;${options.name}&gt;&nbsp;&nbsp;`;
  const indicatorEl = document.createElement("i");
  indicatorEl.id = INDICATOR_ELEMENT_ID;
  indicatorEl.innerHTML = `${Math.round(options.bounds.width * 100) / 100} x ${Math.round(options.bounds.height * 100) / 100}`;
  Object.assign(indicatorEl.style, indicatorStyles);
  cardEl.appendChild(nameEl);
  cardEl.appendChild(indicatorEl);
  containerEl.appendChild(cardEl);
  document.body.appendChild(containerEl);
  return containerEl;
}
function update(options) {
  const containerEl = getContainerElement();
  const cardEl = getCardElement();
  const nameEl = getNameElement();
  const indicatorEl = getIndicatorElement();
  if (containerEl) {
    Object.assign(containerEl.style, {
      ...containerStyles,
      ...getStyles(options.bounds)
    });
    Object.assign(cardEl.style, { top: options.bounds.top < 35 ? 0 : "-35px" });
    nameEl.innerHTML = `&lt;${options.name}&gt;&nbsp;&nbsp;`;
    indicatorEl.innerHTML = `${Math.round(options.bounds.width * 100) / 100} x ${Math.round(options.bounds.height * 100) / 100}`;
  }
}
function highlight(instance) {
  const bounds = getComponentBoundingRect(instance);
  if (!bounds.width && !bounds.height) return;
  const name = getInstanceName(instance);
  getContainerElement() ? update({
    bounds,
    name
  }) : create({
    bounds,
    name
  });
}
function unhighlight() {
  const el = getContainerElement();
  if (el) el.style.display = "none";
}
var inspectInstance = null;
function inspectFn(e) {
  const target2 = e.target;
  if (target2) {
    const instance = target2.__vueParentComponent;
    if (instance) {
      inspectInstance = instance;
      if (instance.vnode.el) {
        const bounds = getComponentBoundingRect(instance);
        const name = getInstanceName(instance);
        getContainerElement() ? update({
          bounds,
          name
        }) : create({
          bounds,
          name
        });
      }
    }
  }
}
function selectComponentFn(e, cb) {
  e.preventDefault();
  e.stopPropagation();
  if (inspectInstance) cb(getUniqueComponentId(inspectInstance));
}
var inspectComponentHighLighterSelectFn = null;
function cancelInspectComponentHighLighter() {
  unhighlight();
  window.removeEventListener("mouseover", inspectFn);
  window.removeEventListener("click", inspectComponentHighLighterSelectFn, true);
  inspectComponentHighLighterSelectFn = null;
}
function inspectComponentHighLighter() {
  window.addEventListener("mouseover", inspectFn);
  return new Promise((resolve) => {
    function onSelect(e) {
      e.preventDefault();
      e.stopPropagation();
      selectComponentFn(e, (id) => {
        window.removeEventListener("click", onSelect, true);
        inspectComponentHighLighterSelectFn = null;
        window.removeEventListener("mouseover", inspectFn);
        const el = getContainerElement();
        if (el) el.style.display = "none";
        resolve(JSON.stringify({ id }));
      });
    }
    inspectComponentHighLighterSelectFn = onSelect;
    window.addEventListener("click", onSelect, true);
  });
}
function scrollToComponent(options) {
  const instance = getComponentInstance(activeAppRecord.value, options.id);
  if (instance) {
    const [el] = getRootElementsFromComponentInstance(instance);
    if (typeof el.scrollIntoView === "function") el.scrollIntoView({ behavior: "smooth" });
    else {
      const bounds = getComponentBoundingRect(instance);
      const scrollTarget = document.createElement("div");
      const styles = {
        ...getStyles(bounds),
        position: "absolute"
      };
      Object.assign(scrollTarget.style, styles);
      document.body.appendChild(scrollTarget);
      scrollTarget.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        document.body.removeChild(scrollTarget);
      }, 2e3);
    }
    setTimeout(() => {
      const bounds = getComponentBoundingRect(instance);
      if (bounds.width || bounds.height) {
        const name = getInstanceName(instance);
        const el2 = getContainerElement();
        el2 ? update({
          ...options,
          name,
          bounds
        }) : create({
          ...options,
          name,
          bounds
        });
        setTimeout(() => {
          if (el2) el2.style.display = "none";
        }, 1500);
      }
    }, 1200);
  }
}
target.__VUE_DEVTOOLS_COMPONENT_INSPECTOR_ENABLED__ ??= true;
function waitForInspectorInit(cb) {
  let total = 0;
  const timer = setInterval(() => {
    if (target.__VUE_INSPECTOR__) {
      clearInterval(timer);
      total += 30;
      cb();
    }
    if (total >= 5e3) clearInterval(timer);
  }, 30);
}
function setupInspector() {
  const inspector = target.__VUE_INSPECTOR__;
  const _openInEditor = inspector.openInEditor;
  inspector.openInEditor = async (...params) => {
    inspector.disable();
    _openInEditor(...params);
  };
}
function getComponentInspector() {
  return new Promise((resolve) => {
    function setup() {
      setupInspector();
      resolve(target.__VUE_INSPECTOR__);
    }
    if (!target.__VUE_INSPECTOR__) waitForInspectorInit(() => {
      setup();
    });
    else setup();
  });
}
var ReactiveFlags = (function(ReactiveFlags2) {
  ReactiveFlags2["SKIP"] = "__v_skip";
  ReactiveFlags2["IS_REACTIVE"] = "__v_isReactive";
  ReactiveFlags2["IS_READONLY"] = "__v_isReadonly";
  ReactiveFlags2["IS_SHALLOW"] = "__v_isShallow";
  ReactiveFlags2["RAW"] = "__v_raw";
  return ReactiveFlags2;
})({});
function isReadonly(value) {
  return !!(value && value[ReactiveFlags.IS_READONLY]);
}
function isReactive$1(value) {
  if (isReadonly(value)) return isReactive$1(value[ReactiveFlags.RAW]);
  return !!(value && value[ReactiveFlags.IS_REACTIVE]);
}
function isRef$1(r) {
  return !!(r && r.__v_isRef === true);
}
function toRaw$1(observed) {
  const raw = observed && observed[ReactiveFlags.RAW];
  return raw ? toRaw$1(raw) : observed;
}
var StateEditor = class {
  constructor() {
    this.refEditor = new RefStateEditor();
  }
  set(object, path, value, cb) {
    const sections = Array.isArray(path) ? path : path.split(".");
    while (sections.length > 1) {
      const section = sections.shift();
      if (object instanceof Map) object = object.get(section);
      else if (object instanceof Set) object = Array.from(object.values())[section];
      else object = object[section];
      if (this.refEditor.isRef(object)) object = this.refEditor.get(object);
    }
    const field = sections[0];
    const item = this.refEditor.get(object)[field];
    if (cb) cb(object, field, value);
    else if (this.refEditor.isRef(item)) this.refEditor.set(item, value);
    else object[field] = value;
  }
  get(object, path) {
    const sections = Array.isArray(path) ? path : path.split(".");
    for (let i = 0; i < sections.length; i++) {
      if (object instanceof Map) object = object.get(sections[i]);
      else object = object[sections[i]];
      if (this.refEditor.isRef(object)) object = this.refEditor.get(object);
      if (!object) return void 0;
    }
    return object;
  }
  has(object, path, parent = false) {
    if (typeof object === "undefined") return false;
    const sections = Array.isArray(path) ? path.slice() : path.split(".");
    const size = !parent ? 1 : 2;
    while (object && sections.length > size) {
      const section = sections.shift();
      object = object[section];
      if (this.refEditor.isRef(object)) object = this.refEditor.get(object);
    }
    return object != null && Object.prototype.hasOwnProperty.call(object, sections[0]);
  }
  createDefaultSetCallback(state) {
    return (object, field, value) => {
      if (state.remove || state.newKey) if (Array.isArray(object)) object.splice(field, 1);
      else if (toRaw$1(object) instanceof Map) object.delete(field);
      else if (toRaw$1(object) instanceof Set) object.delete(Array.from(object.values())[field]);
      else Reflect.deleteProperty(object, field);
      if (!state.remove) {
        const target2 = object[state.newKey || field];
        if (this.refEditor.isRef(target2)) this.refEditor.set(target2, value);
        else if (toRaw$1(object) instanceof Map) object.set(state.newKey || field, value);
        else if (toRaw$1(object) instanceof Set) object.add(value);
        else object[state.newKey || field] = value;
      }
    };
  }
};
var RefStateEditor = class {
  set(ref2, value) {
    if (isRef$1(ref2)) ref2.value = value;
    else {
      if (ref2 instanceof Set && Array.isArray(value)) {
        ref2.clear();
        value.forEach((v) => ref2.add(v));
        return;
      }
      const currentKeys = Object.keys(value);
      if (ref2 instanceof Map) {
        const previousKeysSet2 = new Set(ref2.keys());
        currentKeys.forEach((key) => {
          ref2.set(key, Reflect.get(value, key));
          previousKeysSet2.delete(key);
        });
        previousKeysSet2.forEach((key) => ref2.delete(key));
        return;
      }
      const previousKeysSet = new Set(Object.keys(ref2));
      currentKeys.forEach((key) => {
        Reflect.set(ref2, key, Reflect.get(value, key));
        previousKeysSet.delete(key);
      });
      previousKeysSet.forEach((key) => Reflect.deleteProperty(ref2, key));
    }
  }
  get(ref2) {
    return isRef$1(ref2) ? ref2.value : ref2;
  }
  isRef(ref2) {
    return isRef$1(ref2) || isReactive$1(ref2);
  }
};
var stateEditor = new StateEditor();
var TIMELINE_LAYERS_STATE_STORAGE_ID = "__VUE_DEVTOOLS_KIT_TIMELINE_LAYERS_STATE__";
function getTimelineLayersStateFromStorage() {
  if (typeof window === "undefined" || !isBrowser2 || typeof localStorage === "undefined" || localStorage === null) return {
    recordingState: false,
    mouseEventEnabled: false,
    keyboardEventEnabled: false,
    componentEventEnabled: false,
    performanceEventEnabled: false,
    selected: ""
  };
  const state = typeof localStorage.getItem !== "undefined" ? localStorage.getItem(TIMELINE_LAYERS_STATE_STORAGE_ID) : null;
  return state ? JSON.parse(state) : {
    recordingState: false,
    mouseEventEnabled: false,
    keyboardEventEnabled: false,
    componentEventEnabled: false,
    performanceEventEnabled: false,
    selected: ""
  };
}
target.__VUE_DEVTOOLS_KIT_TIMELINE_LAYERS ??= [];
var devtoolsTimelineLayers = new Proxy(target.__VUE_DEVTOOLS_KIT_TIMELINE_LAYERS, { get(target2, prop, receiver) {
  return Reflect.get(target2, prop, receiver);
} });
function addTimelineLayer(options, descriptor) {
  devtoolsState.timelineLayersState[descriptor.id] = false;
  devtoolsTimelineLayers.push({
    ...options,
    descriptorId: descriptor.id,
    appRecord: getAppRecord(descriptor.app)
  });
}
target.__VUE_DEVTOOLS_KIT_INSPECTOR__ ??= [];
var devtoolsInspector = new Proxy(target.__VUE_DEVTOOLS_KIT_INSPECTOR__, { get(target2, prop, receiver) {
  return Reflect.get(target2, prop, receiver);
} });
var callInspectorUpdatedHook = debounce(() => {
  devtoolsContext.hooks.callHook(DevToolsMessagingHookKeys.SEND_INSPECTOR_TO_CLIENT, getActiveInspectors());
});
function addInspector(inspector, descriptor) {
  devtoolsInspector.push({
    options: inspector,
    descriptor,
    treeFilterPlaceholder: inspector.treeFilterPlaceholder ?? "Search tree...",
    stateFilterPlaceholder: inspector.stateFilterPlaceholder ?? "Search state...",
    treeFilter: "",
    selectedNodeId: "",
    appRecord: getAppRecord(descriptor.app)
  });
  callInspectorUpdatedHook();
}
function getActiveInspectors() {
  return devtoolsInspector.filter((inspector) => inspector.descriptor.app === activeAppRecord.value.app).filter((inspector) => inspector.descriptor.id !== "components").map((inspector) => {
    const descriptor = inspector.descriptor;
    const options = inspector.options;
    return {
      id: options.id,
      label: options.label,
      logo: descriptor.logo,
      icon: `custom-ic-baseline-${options?.icon?.replace(/_/g, "-")}`,
      packageName: descriptor.packageName,
      homepage: descriptor.homepage,
      pluginId: descriptor.id
    };
  });
}
function getInspector(id, app) {
  return devtoolsInspector.find((inspector) => inspector.options.id === id && (app ? inspector.descriptor.app === app : true));
}
var DevToolsV6PluginAPIHookKeys = (function(DevToolsV6PluginAPIHookKeys2) {
  DevToolsV6PluginAPIHookKeys2["VISIT_COMPONENT_TREE"] = "visitComponentTree";
  DevToolsV6PluginAPIHookKeys2["INSPECT_COMPONENT"] = "inspectComponent";
  DevToolsV6PluginAPIHookKeys2["EDIT_COMPONENT_STATE"] = "editComponentState";
  DevToolsV6PluginAPIHookKeys2["GET_INSPECTOR_TREE"] = "getInspectorTree";
  DevToolsV6PluginAPIHookKeys2["GET_INSPECTOR_STATE"] = "getInspectorState";
  DevToolsV6PluginAPIHookKeys2["EDIT_INSPECTOR_STATE"] = "editInspectorState";
  DevToolsV6PluginAPIHookKeys2["INSPECT_TIMELINE_EVENT"] = "inspectTimelineEvent";
  DevToolsV6PluginAPIHookKeys2["TIMELINE_CLEARED"] = "timelineCleared";
  DevToolsV6PluginAPIHookKeys2["SET_PLUGIN_SETTINGS"] = "setPluginSettings";
  return DevToolsV6PluginAPIHookKeys2;
})({});
var DevToolsContextHookKeys = (function(DevToolsContextHookKeys2) {
  DevToolsContextHookKeys2["ADD_INSPECTOR"] = "addInspector";
  DevToolsContextHookKeys2["SEND_INSPECTOR_TREE"] = "sendInspectorTree";
  DevToolsContextHookKeys2["SEND_INSPECTOR_STATE"] = "sendInspectorState";
  DevToolsContextHookKeys2["CUSTOM_INSPECTOR_SELECT_NODE"] = "customInspectorSelectNode";
  DevToolsContextHookKeys2["TIMELINE_LAYER_ADDED"] = "timelineLayerAdded";
  DevToolsContextHookKeys2["TIMELINE_EVENT_ADDED"] = "timelineEventAdded";
  DevToolsContextHookKeys2["GET_COMPONENT_INSTANCES"] = "getComponentInstances";
  DevToolsContextHookKeys2["GET_COMPONENT_BOUNDS"] = "getComponentBounds";
  DevToolsContextHookKeys2["GET_COMPONENT_NAME"] = "getComponentName";
  DevToolsContextHookKeys2["COMPONENT_HIGHLIGHT"] = "componentHighlight";
  DevToolsContextHookKeys2["COMPONENT_UNHIGHLIGHT"] = "componentUnhighlight";
  return DevToolsContextHookKeys2;
})({});
var DevToolsMessagingHookKeys = (function(DevToolsMessagingHookKeys2) {
  DevToolsMessagingHookKeys2["SEND_INSPECTOR_TREE_TO_CLIENT"] = "sendInspectorTreeToClient";
  DevToolsMessagingHookKeys2["SEND_INSPECTOR_STATE_TO_CLIENT"] = "sendInspectorStateToClient";
  DevToolsMessagingHookKeys2["SEND_TIMELINE_EVENT_TO_CLIENT"] = "sendTimelineEventToClient";
  DevToolsMessagingHookKeys2["SEND_INSPECTOR_TO_CLIENT"] = "sendInspectorToClient";
  DevToolsMessagingHookKeys2["SEND_ACTIVE_APP_UNMOUNTED_TO_CLIENT"] = "sendActiveAppUpdatedToClient";
  DevToolsMessagingHookKeys2["DEVTOOLS_STATE_UPDATED"] = "devtoolsStateUpdated";
  DevToolsMessagingHookKeys2["DEVTOOLS_CONNECTED_UPDATED"] = "devtoolsConnectedUpdated";
  DevToolsMessagingHookKeys2["ROUTER_INFO_UPDATED"] = "routerInfoUpdated";
  return DevToolsMessagingHookKeys2;
})({});
function createDevToolsCtxHooks() {
  const hooks2 = createHooks();
  hooks2.hook(DevToolsContextHookKeys.ADD_INSPECTOR, ({ inspector, plugin }) => {
    addInspector(inspector, plugin.descriptor);
  });
  const debounceSendInspectorTree = debounce(async ({ inspectorId, plugin }) => {
    if (!inspectorId || !plugin?.descriptor?.app || devtoolsState.highPerfModeEnabled) return;
    const inspector = getInspector(inspectorId, plugin.descriptor.app);
    const _payload = {
      app: plugin.descriptor.app,
      inspectorId,
      filter: inspector?.treeFilter || "",
      rootNodes: []
    };
    await new Promise((resolve) => {
      hooks2.callHookWith(async (callbacks) => {
        await Promise.all(callbacks.map((cb) => cb(_payload)));
        resolve();
      }, DevToolsV6PluginAPIHookKeys.GET_INSPECTOR_TREE);
    });
    hooks2.callHookWith(async (callbacks) => {
      await Promise.all(callbacks.map((cb) => cb({
        inspectorId,
        rootNodes: _payload.rootNodes
      })));
    }, DevToolsMessagingHookKeys.SEND_INSPECTOR_TREE_TO_CLIENT);
  }, 120);
  hooks2.hook(DevToolsContextHookKeys.SEND_INSPECTOR_TREE, debounceSendInspectorTree);
  const debounceSendInspectorState = debounce(async ({ inspectorId, plugin }) => {
    if (!inspectorId || !plugin?.descriptor?.app || devtoolsState.highPerfModeEnabled) return;
    const inspector = getInspector(inspectorId, plugin.descriptor.app);
    const _payload = {
      app: plugin.descriptor.app,
      inspectorId,
      nodeId: inspector?.selectedNodeId || "",
      state: null
    };
    const ctx = { currentTab: `custom-inspector:${inspectorId}` };
    if (_payload.nodeId) await new Promise((resolve) => {
      hooks2.callHookWith(async (callbacks) => {
        await Promise.all(callbacks.map((cb) => cb(_payload, ctx)));
        resolve();
      }, DevToolsV6PluginAPIHookKeys.GET_INSPECTOR_STATE);
    });
    hooks2.callHookWith(async (callbacks) => {
      await Promise.all(callbacks.map((cb) => cb({
        inspectorId,
        nodeId: _payload.nodeId,
        state: _payload.state
      })));
    }, DevToolsMessagingHookKeys.SEND_INSPECTOR_STATE_TO_CLIENT);
  }, 120);
  hooks2.hook(DevToolsContextHookKeys.SEND_INSPECTOR_STATE, debounceSendInspectorState);
  hooks2.hook(DevToolsContextHookKeys.CUSTOM_INSPECTOR_SELECT_NODE, ({ inspectorId, nodeId, plugin }) => {
    const inspector = getInspector(inspectorId, plugin.descriptor.app);
    if (!inspector) return;
    inspector.selectedNodeId = nodeId;
  });
  hooks2.hook(DevToolsContextHookKeys.TIMELINE_LAYER_ADDED, ({ options, plugin }) => {
    addTimelineLayer(options, plugin.descriptor);
  });
  hooks2.hook(DevToolsContextHookKeys.TIMELINE_EVENT_ADDED, ({ options, plugin }) => {
    if (devtoolsState.highPerfModeEnabled || !devtoolsState.timelineLayersState?.[plugin.descriptor.id] && ![
      "performance",
      "component-event",
      "keyboard",
      "mouse"
    ].includes(options.layerId)) return;
    hooks2.callHookWith(async (callbacks) => {
      await Promise.all(callbacks.map((cb) => cb(options)));
    }, DevToolsMessagingHookKeys.SEND_TIMELINE_EVENT_TO_CLIENT);
  });
  hooks2.hook(DevToolsContextHookKeys.GET_COMPONENT_INSTANCES, async ({ app }) => {
    const appRecord = app.__VUE_DEVTOOLS_NEXT_APP_RECORD__;
    if (!appRecord) return null;
    const appId = appRecord.id.toString();
    return [...appRecord.instanceMap].filter(([key]) => key.split(":")[0] === appId).map(([, instance]) => instance);
  });
  hooks2.hook(DevToolsContextHookKeys.GET_COMPONENT_BOUNDS, async ({ instance }) => {
    return getComponentBoundingRect(instance);
  });
  hooks2.hook(DevToolsContextHookKeys.GET_COMPONENT_NAME, ({ instance }) => {
    return getInstanceName(instance);
  });
  hooks2.hook(DevToolsContextHookKeys.COMPONENT_HIGHLIGHT, ({ uid }) => {
    const instance = activeAppRecord.value.instanceMap.get(uid);
    if (instance) highlight(instance);
  });
  hooks2.hook(DevToolsContextHookKeys.COMPONENT_UNHIGHLIGHT, () => {
    unhighlight();
  });
  return hooks2;
}
target.__VUE_DEVTOOLS_KIT_APP_RECORDS__ ??= [];
target.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__ ??= {};
target.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD_ID__ ??= "";
target.__VUE_DEVTOOLS_KIT_CUSTOM_TABS__ ??= [];
target.__VUE_DEVTOOLS_KIT_CUSTOM_COMMANDS__ ??= [];
var STATE_KEY = "__VUE_DEVTOOLS_KIT_GLOBAL_STATE__";
function initStateFactory() {
  return {
    connected: false,
    clientConnected: false,
    vitePluginDetected: true,
    appRecords: [],
    activeAppRecordId: "",
    tabs: [],
    commands: [],
    highPerfModeEnabled: true,
    devtoolsClientDetected: {},
    perfUniqueGroupId: 0,
    timelineLayersState: getTimelineLayersStateFromStorage()
  };
}
target[STATE_KEY] ??= initStateFactory();
var callStateUpdatedHook = debounce((state) => {
  devtoolsContext.hooks.callHook(DevToolsMessagingHookKeys.DEVTOOLS_STATE_UPDATED, { state });
});
var callConnectedUpdatedHook = debounce((state, oldState) => {
  devtoolsContext.hooks.callHook(DevToolsMessagingHookKeys.DEVTOOLS_CONNECTED_UPDATED, {
    state,
    oldState
  });
});
var devtoolsAppRecords = new Proxy(target.__VUE_DEVTOOLS_KIT_APP_RECORDS__, { get(_target, prop, receiver) {
  if (prop === "value") return target.__VUE_DEVTOOLS_KIT_APP_RECORDS__;
  return target.__VUE_DEVTOOLS_KIT_APP_RECORDS__[prop];
} });
var activeAppRecord = new Proxy(target.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__, { get(_target, prop, receiver) {
  if (prop === "value") return target.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__;
  else if (prop === "id") return target.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD_ID__;
  return target.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__[prop];
} });
function updateAllStates() {
  callStateUpdatedHook({
    ...target[STATE_KEY],
    appRecords: devtoolsAppRecords.value,
    activeAppRecordId: activeAppRecord.id,
    tabs: target.__VUE_DEVTOOLS_KIT_CUSTOM_TABS__,
    commands: target.__VUE_DEVTOOLS_KIT_CUSTOM_COMMANDS__
  });
}
function setActiveAppRecord(app) {
  target.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__ = app;
  updateAllStates();
}
function setActiveAppRecordId(id) {
  target.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD_ID__ = id;
  updateAllStates();
}
var devtoolsState = new Proxy(target[STATE_KEY], {
  get(target$3, property) {
    if (property === "appRecords") return devtoolsAppRecords;
    else if (property === "activeAppRecordId") return activeAppRecord.id;
    else if (property === "tabs") return target.__VUE_DEVTOOLS_KIT_CUSTOM_TABS__;
    else if (property === "commands") return target.__VUE_DEVTOOLS_KIT_CUSTOM_COMMANDS__;
    return target[STATE_KEY][property];
  },
  deleteProperty(target2, property) {
    delete target2[property];
    return true;
  },
  set(target$4, property, value) {
    target$4[property] = value;
    target[STATE_KEY][property] = value;
    return true;
  }
});
function openInEditor(options = {}) {
  const { file, host, baseUrl = window.location.origin, line = 0, column = 0 } = options;
  if (file) {
    if (host === "chrome-extension") {
      const fileName = file.replace(/\\/g, "\\\\");
      const _baseUrl = window.VUE_DEVTOOLS_CONFIG?.openInEditorHost ?? "/";
      fetch(`${_baseUrl}__open-in-editor?file=${encodeURI(file)}`).then((response) => {
        if (!response.ok) {
          const msg = `Opening component ${fileName} failed`;
          console.log(`%c${msg}`, "color:red");
        }
      });
    } else if (devtoolsState.vitePluginDetected) {
      const _baseUrl = target.__VUE_DEVTOOLS_OPEN_IN_EDITOR_BASE_URL__ ?? baseUrl;
      target.__VUE_INSPECTOR__.openInEditor(_baseUrl, file, line, column);
    }
  }
}
target.__VUE_DEVTOOLS_KIT_PLUGIN_BUFFER__ ??= [];
var devtoolsPluginBuffer = new Proxy(target.__VUE_DEVTOOLS_KIT_PLUGIN_BUFFER__, { get(target2, prop, receiver) {
  return Reflect.get(target2, prop, receiver);
} });
function _getSettings(settings) {
  const _settings = {};
  Object.keys(settings).forEach((key) => {
    _settings[key] = settings[key].defaultValue;
  });
  return _settings;
}
function getPluginLocalKey(pluginId) {
  return `__VUE_DEVTOOLS_NEXT_PLUGIN_SETTINGS__${pluginId}__`;
}
function getPluginSettingsOptions(pluginId) {
  return (devtoolsPluginBuffer.find((item) => item[0].id === pluginId && !!item[0]?.settings)?.[0] ?? null)?.settings ?? null;
}
function getPluginSettings(pluginId, fallbackValue) {
  const localKey = getPluginLocalKey(pluginId);
  if (localKey) {
    const localSettings = localStorage.getItem(localKey);
    if (localSettings) return JSON.parse(localSettings);
  }
  if (pluginId) return _getSettings((devtoolsPluginBuffer.find((item) => item[0].id === pluginId)?.[0] ?? null)?.settings ?? {});
  return _getSettings(fallbackValue);
}
function initPluginSettings(pluginId, settings) {
  const localKey = getPluginLocalKey(pluginId);
  if (!localStorage.getItem(localKey)) localStorage.setItem(localKey, JSON.stringify(_getSettings(settings)));
}
function setPluginSettings(pluginId, key, value) {
  const localKey = getPluginLocalKey(pluginId);
  const localSettings = localStorage.getItem(localKey);
  const parsedLocalSettings = JSON.parse(localSettings || "{}");
  const updated = {
    ...parsedLocalSettings,
    [key]: value
  };
  localStorage.setItem(localKey, JSON.stringify(updated));
  devtoolsContext.hooks.callHookWith((callbacks) => {
    callbacks.forEach((cb) => cb({
      pluginId,
      key,
      oldValue: parsedLocalSettings[key],
      newValue: value,
      settings: updated
    }));
  }, DevToolsV6PluginAPIHookKeys.SET_PLUGIN_SETTINGS);
}
var DevToolsHooks = (function(DevToolsHooks2) {
  DevToolsHooks2["APP_INIT"] = "app:init";
  DevToolsHooks2["APP_UNMOUNT"] = "app:unmount";
  DevToolsHooks2["COMPONENT_UPDATED"] = "component:updated";
  DevToolsHooks2["COMPONENT_ADDED"] = "component:added";
  DevToolsHooks2["COMPONENT_REMOVED"] = "component:removed";
  DevToolsHooks2["COMPONENT_EMIT"] = "component:emit";
  DevToolsHooks2["PERFORMANCE_START"] = "perf:start";
  DevToolsHooks2["PERFORMANCE_END"] = "perf:end";
  DevToolsHooks2["ADD_ROUTE"] = "router:add-route";
  DevToolsHooks2["REMOVE_ROUTE"] = "router:remove-route";
  DevToolsHooks2["RENDER_TRACKED"] = "render:tracked";
  DevToolsHooks2["RENDER_TRIGGERED"] = "render:triggered";
  DevToolsHooks2["APP_CONNECTED"] = "app:connected";
  DevToolsHooks2["SETUP_DEVTOOLS_PLUGIN"] = "devtools-plugin:setup";
  return DevToolsHooks2;
})({});
var devtoolsHooks = target.__VUE_DEVTOOLS_HOOK ??= createHooks();
var on = {
  vueAppInit(fn) {
    devtoolsHooks.hook(DevToolsHooks.APP_INIT, fn);
  },
  vueAppUnmount(fn) {
    devtoolsHooks.hook(DevToolsHooks.APP_UNMOUNT, fn);
  },
  vueAppConnected(fn) {
    devtoolsHooks.hook(DevToolsHooks.APP_CONNECTED, fn);
  },
  componentAdded(fn) {
    return devtoolsHooks.hook(DevToolsHooks.COMPONENT_ADDED, fn);
  },
  componentEmit(fn) {
    return devtoolsHooks.hook(DevToolsHooks.COMPONENT_EMIT, fn);
  },
  componentUpdated(fn) {
    return devtoolsHooks.hook(DevToolsHooks.COMPONENT_UPDATED, fn);
  },
  componentRemoved(fn) {
    return devtoolsHooks.hook(DevToolsHooks.COMPONENT_REMOVED, fn);
  },
  setupDevtoolsPlugin(fn) {
    devtoolsHooks.hook(DevToolsHooks.SETUP_DEVTOOLS_PLUGIN, fn);
  },
  perfStart(fn) {
    return devtoolsHooks.hook(DevToolsHooks.PERFORMANCE_START, fn);
  },
  perfEnd(fn) {
    return devtoolsHooks.hook(DevToolsHooks.PERFORMANCE_END, fn);
  }
};
var hook = {
  on,
  setupDevToolsPlugin(pluginDescriptor, setupFn) {
    return devtoolsHooks.callHook(DevToolsHooks.SETUP_DEVTOOLS_PLUGIN, pluginDescriptor, setupFn);
  }
};
var DevToolsV6PluginAPI = class {
  constructor({ plugin, ctx }) {
    this.hooks = ctx.hooks;
    this.plugin = plugin;
  }
  get on() {
    return {
      visitComponentTree: (handler) => {
        this.hooks.hook(DevToolsV6PluginAPIHookKeys.VISIT_COMPONENT_TREE, handler);
      },
      inspectComponent: (handler) => {
        this.hooks.hook(DevToolsV6PluginAPIHookKeys.INSPECT_COMPONENT, handler);
      },
      editComponentState: (handler) => {
        this.hooks.hook(DevToolsV6PluginAPIHookKeys.EDIT_COMPONENT_STATE, handler);
      },
      getInspectorTree: (handler) => {
        this.hooks.hook(DevToolsV6PluginAPIHookKeys.GET_INSPECTOR_TREE, handler);
      },
      getInspectorState: (handler) => {
        this.hooks.hook(DevToolsV6PluginAPIHookKeys.GET_INSPECTOR_STATE, handler);
      },
      editInspectorState: (handler) => {
        this.hooks.hook(DevToolsV6PluginAPIHookKeys.EDIT_INSPECTOR_STATE, handler);
      },
      inspectTimelineEvent: (handler) => {
        this.hooks.hook(DevToolsV6PluginAPIHookKeys.INSPECT_TIMELINE_EVENT, handler);
      },
      timelineCleared: (handler) => {
        this.hooks.hook(DevToolsV6PluginAPIHookKeys.TIMELINE_CLEARED, handler);
      },
      setPluginSettings: (handler) => {
        this.hooks.hook(DevToolsV6PluginAPIHookKeys.SET_PLUGIN_SETTINGS, handler);
      }
    };
  }
  notifyComponentUpdate(instance) {
    if (devtoolsState.highPerfModeEnabled) return;
    const inspector = getActiveInspectors().find((i) => i.packageName === this.plugin.descriptor.packageName);
    if (inspector?.id) {
      if (instance) {
        const args = [
          instance.appContext.app,
          instance.uid,
          instance.parent?.uid,
          instance
        ];
        devtoolsHooks.callHook(DevToolsHooks.COMPONENT_UPDATED, ...args);
      } else devtoolsHooks.callHook(DevToolsHooks.COMPONENT_UPDATED);
      this.hooks.callHook(DevToolsContextHookKeys.SEND_INSPECTOR_STATE, {
        inspectorId: inspector.id,
        plugin: this.plugin
      });
    }
  }
  addInspector(options) {
    this.hooks.callHook(DevToolsContextHookKeys.ADD_INSPECTOR, {
      inspector: options,
      plugin: this.plugin
    });
    if (this.plugin.descriptor.settings) initPluginSettings(options.id, this.plugin.descriptor.settings);
  }
  sendInspectorTree(inspectorId) {
    if (devtoolsState.highPerfModeEnabled) return;
    this.hooks.callHook(DevToolsContextHookKeys.SEND_INSPECTOR_TREE, {
      inspectorId,
      plugin: this.plugin
    });
  }
  sendInspectorState(inspectorId) {
    if (devtoolsState.highPerfModeEnabled) return;
    this.hooks.callHook(DevToolsContextHookKeys.SEND_INSPECTOR_STATE, {
      inspectorId,
      plugin: this.plugin
    });
  }
  selectInspectorNode(inspectorId, nodeId) {
    this.hooks.callHook(DevToolsContextHookKeys.CUSTOM_INSPECTOR_SELECT_NODE, {
      inspectorId,
      nodeId,
      plugin: this.plugin
    });
  }
  visitComponentTree(payload) {
    return this.hooks.callHook(DevToolsV6PluginAPIHookKeys.VISIT_COMPONENT_TREE, payload);
  }
  now() {
    if (devtoolsState.highPerfModeEnabled) return 0;
    return Date.now();
  }
  addTimelineLayer(options) {
    this.hooks.callHook(DevToolsContextHookKeys.TIMELINE_LAYER_ADDED, {
      options,
      plugin: this.plugin
    });
  }
  addTimelineEvent(options) {
    if (devtoolsState.highPerfModeEnabled) return;
    this.hooks.callHook(DevToolsContextHookKeys.TIMELINE_EVENT_ADDED, {
      options,
      plugin: this.plugin
    });
  }
  getSettings(pluginId) {
    return getPluginSettings(pluginId ?? this.plugin.descriptor.id, this.plugin.descriptor.settings);
  }
  getComponentInstances(app) {
    return this.hooks.callHook(DevToolsContextHookKeys.GET_COMPONENT_INSTANCES, { app });
  }
  getComponentBounds(instance) {
    return this.hooks.callHook(DevToolsContextHookKeys.GET_COMPONENT_BOUNDS, { instance });
  }
  getComponentName(instance) {
    return this.hooks.callHook(DevToolsContextHookKeys.GET_COMPONENT_NAME, { instance });
  }
  highlightElement(instance) {
    const uid = instance.__VUE_DEVTOOLS_NEXT_UID__;
    return this.hooks.callHook(DevToolsContextHookKeys.COMPONENT_HIGHLIGHT, { uid });
  }
  unhighlightElement() {
    return this.hooks.callHook(DevToolsContextHookKeys.COMPONENT_UNHIGHLIGHT);
  }
};
var DevToolsPluginAPI = DevToolsV6PluginAPI;
var UNDEFINED = "__vue_devtool_undefined__";
var INFINITY = "__vue_devtool_infinity__";
var NEGATIVE_INFINITY = "__vue_devtool_negative_infinity__";
var NAN = "__vue_devtool_nan__";
var tokenMap = {
  [UNDEFINED]: "undefined",
  [NAN]: "NaN",
  [INFINITY]: "Infinity",
  [NEGATIVE_INFINITY]: "-Infinity"
};
var reversedTokenMap = Object.entries(tokenMap).reduce((acc, [key, value]) => {
  acc[value] = key;
  return acc;
}, {});
target.__VUE_DEVTOOLS_KIT__REGISTERED_PLUGIN_APPS__ ??= /* @__PURE__ */ new Set();
function setupDevToolsPlugin(pluginDescriptor, setupFn) {
  return hook.setupDevToolsPlugin(pluginDescriptor, setupFn);
}
function callDevToolsPluginSetupFn(plugin, app) {
  const [pluginDescriptor, setupFn] = plugin;
  if (pluginDescriptor.app !== app) return;
  const api = new DevToolsPluginAPI({
    plugin: {
      setupFn,
      descriptor: pluginDescriptor
    },
    ctx: devtoolsContext
  });
  if (pluginDescriptor.packageName === "vuex") api.on.editInspectorState((payload) => {
    api.sendInspectorState(payload.inspectorId);
  });
  setupFn(api);
}
function registerDevToolsPlugin(app, options) {
  if (target.__VUE_DEVTOOLS_KIT__REGISTERED_PLUGIN_APPS__.has(app)) return;
  if (devtoolsState.highPerfModeEnabled && !options?.inspectingComponent) return;
  target.__VUE_DEVTOOLS_KIT__REGISTERED_PLUGIN_APPS__.add(app);
  devtoolsPluginBuffer.forEach((plugin) => {
    callDevToolsPluginSetupFn(plugin, app);
  });
}
var ROUTER_KEY = "__VUE_DEVTOOLS_ROUTER__";
var ROUTER_INFO_KEY = "__VUE_DEVTOOLS_ROUTER_INFO__";
target[ROUTER_INFO_KEY] ??= {
  currentRoute: null,
  routes: []
};
target[ROUTER_KEY] ??= {};
var devtoolsRouterInfo = new Proxy(target[ROUTER_INFO_KEY], { get(target$1, property) {
  return target[ROUTER_INFO_KEY][property];
} });
var devtoolsRouter = new Proxy(target[ROUTER_KEY], { get(target$2, property) {
  if (property === "value") return target[ROUTER_KEY];
} });
function getRoutes(router) {
  const routesMap = /* @__PURE__ */ new Map();
  return (router?.getRoutes() || []).filter((i) => !routesMap.has(i.path) && routesMap.set(i.path, 1));
}
function filterRoutes(routes) {
  return routes.map((item) => {
    let { path, name, children, meta } = item;
    if (children?.length) children = filterRoutes(children);
    return {
      path,
      name,
      children,
      meta
    };
  });
}
function filterCurrentRoute(route) {
  if (route) {
    const { fullPath, hash, href, path, name, matched, params, query } = route;
    return {
      fullPath,
      hash,
      href,
      path,
      name,
      params,
      query,
      matched: filterRoutes(matched)
    };
  }
  return route;
}
function normalizeRouterInfo(appRecord, activeAppRecord2) {
  function init() {
    const router = appRecord.app?.config.globalProperties.$router;
    const currentRoute = filterCurrentRoute(router?.currentRoute.value);
    const routes = filterRoutes(getRoutes(router));
    const c = console.warn;
    console.warn = () => {
    };
    target[ROUTER_INFO_KEY] = {
      currentRoute: currentRoute ? deepClone(currentRoute) : {},
      routes: deepClone(routes)
    };
    target[ROUTER_KEY] = router;
    console.warn = c;
  }
  init();
  hook.on.componentUpdated(debounce(() => {
    if (activeAppRecord2.value?.app !== appRecord.app) return;
    init();
    if (devtoolsState.highPerfModeEnabled) return;
    devtoolsContext.hooks.callHook(DevToolsMessagingHookKeys.ROUTER_INFO_UPDATED, { state: target[ROUTER_INFO_KEY] });
  }, 200));
}
function createDevToolsApi(hooks2) {
  return {
    async getInspectorTree(payload) {
      const _payload = {
        ...payload,
        app: activeAppRecord.value.app,
        rootNodes: []
      };
      await new Promise((resolve) => {
        hooks2.callHookWith(async (callbacks) => {
          await Promise.all(callbacks.map((cb) => cb(_payload)));
          resolve();
        }, DevToolsV6PluginAPIHookKeys.GET_INSPECTOR_TREE);
      });
      return _payload.rootNodes;
    },
    async getInspectorState(payload) {
      const _payload = {
        ...payload,
        app: activeAppRecord.value.app,
        state: null
      };
      const ctx = { currentTab: `custom-inspector:${payload.inspectorId}` };
      await new Promise((resolve) => {
        hooks2.callHookWith(async (callbacks) => {
          await Promise.all(callbacks.map((cb) => cb(_payload, ctx)));
          resolve();
        }, DevToolsV6PluginAPIHookKeys.GET_INSPECTOR_STATE);
      });
      return _payload.state;
    },
    editInspectorState(payload) {
      const stateEditor2 = new StateEditor();
      const _payload = {
        ...payload,
        app: activeAppRecord.value.app,
        set: (obj, path = payload.path, value = payload.state.value, cb) => {
          stateEditor2.set(obj, path, value, cb || stateEditor2.createDefaultSetCallback(payload.state));
        }
      };
      hooks2.callHookWith((callbacks) => {
        callbacks.forEach((cb) => cb(_payload));
      }, DevToolsV6PluginAPIHookKeys.EDIT_INSPECTOR_STATE);
    },
    sendInspectorState(inspectorId) {
      const inspector = getInspector(inspectorId);
      hooks2.callHook(DevToolsContextHookKeys.SEND_INSPECTOR_STATE, {
        inspectorId,
        plugin: {
          descriptor: inspector.descriptor,
          setupFn: () => ({})
        }
      });
    },
    inspectComponentInspector() {
      return inspectComponentHighLighter();
    },
    cancelInspectComponentInspector() {
      return cancelInspectComponentHighLighter();
    },
    getComponentRenderCode(id) {
      const instance = getComponentInstance(activeAppRecord.value, id);
      if (instance) return !(typeof instance?.type === "function") ? instance.render.toString() : instance.type.toString();
    },
    scrollToComponent(id) {
      return scrollToComponent({ id });
    },
    openInEditor,
    getVueInspector: getComponentInspector,
    toggleApp(id, options) {
      const appRecord = devtoolsAppRecords.value.find((record) => record.id === id);
      if (appRecord) {
        setActiveAppRecordId(id);
        setActiveAppRecord(appRecord);
        normalizeRouterInfo(appRecord, activeAppRecord);
        callInspectorUpdatedHook();
        registerDevToolsPlugin(appRecord.app, options);
      }
    },
    inspectDOM(instanceId) {
      const instance = getComponentInstance(activeAppRecord.value, instanceId);
      if (instance) {
        const [el] = getRootElementsFromComponentInstance(instance);
        if (el) target.__VUE_DEVTOOLS_INSPECT_DOM_TARGET__ = el;
      }
    },
    updatePluginSettings(pluginId, key, value) {
      setPluginSettings(pluginId, key, value);
    },
    getPluginSettings(pluginId) {
      return {
        options: getPluginSettingsOptions(pluginId),
        values: getPluginSettings(pluginId)
      };
    }
  };
}
target.__VUE_DEVTOOLS_ENV__ ??= { vitePluginDetected: false };
var hooks = createDevToolsCtxHooks();
target.__VUE_DEVTOOLS_KIT_CONTEXT__ ??= {
  hooks,
  get state() {
    return {
      ...devtoolsState,
      activeAppRecordId: activeAppRecord.id,
      activeAppRecord: activeAppRecord.value,
      appRecords: devtoolsAppRecords.value
    };
  },
  api: createDevToolsApi(hooks)
};
var devtoolsContext = target.__VUE_DEVTOOLS_KIT_CONTEXT__;
var require_speakingurl$1 = __commonJSMin2(((exports, module) => {
  (function(root) {
    "use strict";
    var charMap = {
      "À": "A",
      "Á": "A",
      "Â": "A",
      "Ã": "A",
      "Ä": "Ae",
      "Å": "A",
      "Æ": "AE",
      "Ç": "C",
      "È": "E",
      "É": "E",
      "Ê": "E",
      "Ë": "E",
      "Ì": "I",
      "Í": "I",
      "Î": "I",
      "Ï": "I",
      "Ð": "D",
      "Ñ": "N",
      "Ò": "O",
      "Ó": "O",
      "Ô": "O",
      "Õ": "O",
      "Ö": "Oe",
      "Ő": "O",
      "Ø": "O",
      "Ù": "U",
      "Ú": "U",
      "Û": "U",
      "Ü": "Ue",
      "Ű": "U",
      "Ý": "Y",
      "Þ": "TH",
      "ß": "ss",
      "à": "a",
      "á": "a",
      "â": "a",
      "ã": "a",
      "ä": "ae",
      "å": "a",
      "æ": "ae",
      "ç": "c",
      "è": "e",
      "é": "e",
      "ê": "e",
      "ë": "e",
      "ì": "i",
      "í": "i",
      "î": "i",
      "ï": "i",
      "ð": "d",
      "ñ": "n",
      "ò": "o",
      "ó": "o",
      "ô": "o",
      "õ": "o",
      "ö": "oe",
      "ő": "o",
      "ø": "o",
      "ù": "u",
      "ú": "u",
      "û": "u",
      "ü": "ue",
      "ű": "u",
      "ý": "y",
      "þ": "th",
      "ÿ": "y",
      "ẞ": "SS",
      "ا": "a",
      "أ": "a",
      "إ": "i",
      "آ": "aa",
      "ؤ": "u",
      "ئ": "e",
      "ء": "a",
      "ب": "b",
      "ت": "t",
      "ث": "th",
      "ج": "j",
      "ح": "h",
      "خ": "kh",
      "د": "d",
      "ذ": "th",
      "ر": "r",
      "ز": "z",
      "س": "s",
      "ش": "sh",
      "ص": "s",
      "ض": "dh",
      "ط": "t",
      "ظ": "z",
      "ع": "a",
      "غ": "gh",
      "ف": "f",
      "ق": "q",
      "ك": "k",
      "ل": "l",
      "م": "m",
      "ن": "n",
      "ه": "h",
      "و": "w",
      "ي": "y",
      "ى": "a",
      "ة": "h",
      "ﻻ": "la",
      "ﻷ": "laa",
      "ﻹ": "lai",
      "ﻵ": "laa",
      "گ": "g",
      "چ": "ch",
      "پ": "p",
      "ژ": "zh",
      "ک": "k",
      "ی": "y",
      "َ": "a",
      "ً": "an",
      "ِ": "e",
      "ٍ": "en",
      "ُ": "u",
      "ٌ": "on",
      "ْ": "",
      "٠": "0",
      "١": "1",
      "٢": "2",
      "٣": "3",
      "٤": "4",
      "٥": "5",
      "٦": "6",
      "٧": "7",
      "٨": "8",
      "٩": "9",
      "۰": "0",
      "۱": "1",
      "۲": "2",
      "۳": "3",
      "۴": "4",
      "۵": "5",
      "۶": "6",
      "۷": "7",
      "۸": "8",
      "۹": "9",
      "က": "k",
      "ခ": "kh",
      "ဂ": "g",
      "ဃ": "ga",
      "င": "ng",
      "စ": "s",
      "ဆ": "sa",
      "ဇ": "z",
      "စျ": "za",
      "ည": "ny",
      "ဋ": "t",
      "ဌ": "ta",
      "ဍ": "d",
      "ဎ": "da",
      "ဏ": "na",
      "တ": "t",
      "ထ": "ta",
      "ဒ": "d",
      "ဓ": "da",
      "န": "n",
      "ပ": "p",
      "ဖ": "pa",
      "ဗ": "b",
      "ဘ": "ba",
      "မ": "m",
      "ယ": "y",
      "ရ": "ya",
      "လ": "l",
      "ဝ": "w",
      "သ": "th",
      "ဟ": "h",
      "ဠ": "la",
      "အ": "a",
      "ြ": "y",
      "ျ": "ya",
      "ွ": "w",
      "ြွ": "yw",
      "ျွ": "ywa",
      "ှ": "h",
      "ဧ": "e",
      "၏": "-e",
      "ဣ": "i",
      "ဤ": "-i",
      "ဉ": "u",
      "ဦ": "-u",
      "ဩ": "aw",
      "သြော": "aw",
      "ဪ": "aw",
      "၀": "0",
      "၁": "1",
      "၂": "2",
      "၃": "3",
      "၄": "4",
      "၅": "5",
      "၆": "6",
      "၇": "7",
      "၈": "8",
      "၉": "9",
      "္": "",
      "့": "",
      "း": "",
      "č": "c",
      "ď": "d",
      "ě": "e",
      "ň": "n",
      "ř": "r",
      "š": "s",
      "ť": "t",
      "ů": "u",
      "ž": "z",
      "Č": "C",
      "Ď": "D",
      "Ě": "E",
      "Ň": "N",
      "Ř": "R",
      "Š": "S",
      "Ť": "T",
      "Ů": "U",
      "Ž": "Z",
      "ހ": "h",
      "ށ": "sh",
      "ނ": "n",
      "ރ": "r",
      "ބ": "b",
      "ޅ": "lh",
      "ކ": "k",
      "އ": "a",
      "ވ": "v",
      "މ": "m",
      "ފ": "f",
      "ދ": "dh",
      "ތ": "th",
      "ލ": "l",
      "ގ": "g",
      "ޏ": "gn",
      "ސ": "s",
      "ޑ": "d",
      "ޒ": "z",
      "ޓ": "t",
      "ޔ": "y",
      "ޕ": "p",
      "ޖ": "j",
      "ޗ": "ch",
      "ޘ": "tt",
      "ޙ": "hh",
      "ޚ": "kh",
      "ޛ": "th",
      "ޜ": "z",
      "ޝ": "sh",
      "ޞ": "s",
      "ޟ": "d",
      "ޠ": "t",
      "ޡ": "z",
      "ޢ": "a",
      "ޣ": "gh",
      "ޤ": "q",
      "ޥ": "w",
      "ަ": "a",
      "ާ": "aa",
      "ި": "i",
      "ީ": "ee",
      "ު": "u",
      "ޫ": "oo",
      "ެ": "e",
      "ޭ": "ey",
      "ޮ": "o",
      "ޯ": "oa",
      "ް": "",
      "ა": "a",
      "ბ": "b",
      "გ": "g",
      "დ": "d",
      "ე": "e",
      "ვ": "v",
      "ზ": "z",
      "თ": "t",
      "ი": "i",
      "კ": "k",
      "ლ": "l",
      "მ": "m",
      "ნ": "n",
      "ო": "o",
      "პ": "p",
      "ჟ": "zh",
      "რ": "r",
      "ს": "s",
      "ტ": "t",
      "უ": "u",
      "ფ": "p",
      "ქ": "k",
      "ღ": "gh",
      "ყ": "q",
      "შ": "sh",
      "ჩ": "ch",
      "ც": "ts",
      "ძ": "dz",
      "წ": "ts",
      "ჭ": "ch",
      "ხ": "kh",
      "ჯ": "j",
      "ჰ": "h",
      "α": "a",
      "β": "v",
      "γ": "g",
      "δ": "d",
      "ε": "e",
      "ζ": "z",
      "η": "i",
      "θ": "th",
      "ι": "i",
      "κ": "k",
      "λ": "l",
      "μ": "m",
      "ν": "n",
      "ξ": "ks",
      "ο": "o",
      "π": "p",
      "ρ": "r",
      "σ": "s",
      "τ": "t",
      "υ": "y",
      "φ": "f",
      "χ": "x",
      "ψ": "ps",
      "ω": "o",
      "ά": "a",
      "έ": "e",
      "ί": "i",
      "ό": "o",
      "ύ": "y",
      "ή": "i",
      "ώ": "o",
      "ς": "s",
      "ϊ": "i",
      "ΰ": "y",
      "ϋ": "y",
      "ΐ": "i",
      "Α": "A",
      "Β": "B",
      "Γ": "G",
      "Δ": "D",
      "Ε": "E",
      "Ζ": "Z",
      "Η": "I",
      "Θ": "TH",
      "Ι": "I",
      "Κ": "K",
      "Λ": "L",
      "Μ": "M",
      "Ν": "N",
      "Ξ": "KS",
      "Ο": "O",
      "Π": "P",
      "Ρ": "R",
      "Σ": "S",
      "Τ": "T",
      "Υ": "Y",
      "Φ": "F",
      "Χ": "X",
      "Ψ": "PS",
      "Ω": "O",
      "Ά": "A",
      "Έ": "E",
      "Ί": "I",
      "Ό": "O",
      "Ύ": "Y",
      "Ή": "I",
      "Ώ": "O",
      "Ϊ": "I",
      "Ϋ": "Y",
      "ā": "a",
      "ē": "e",
      "ģ": "g",
      "ī": "i",
      "ķ": "k",
      "ļ": "l",
      "ņ": "n",
      "ū": "u",
      "Ā": "A",
      "Ē": "E",
      "Ģ": "G",
      "Ī": "I",
      "Ķ": "k",
      "Ļ": "L",
      "Ņ": "N",
      "Ū": "U",
      "Ќ": "Kj",
      "ќ": "kj",
      "Љ": "Lj",
      "љ": "lj",
      "Њ": "Nj",
      "њ": "nj",
      "Тс": "Ts",
      "тс": "ts",
      "ą": "a",
      "ć": "c",
      "ę": "e",
      "ł": "l",
      "ń": "n",
      "ś": "s",
      "ź": "z",
      "ż": "z",
      "Ą": "A",
      "Ć": "C",
      "Ę": "E",
      "Ł": "L",
      "Ń": "N",
      "Ś": "S",
      "Ź": "Z",
      "Ż": "Z",
      "Є": "Ye",
      "І": "I",
      "Ї": "Yi",
      "Ґ": "G",
      "є": "ye",
      "і": "i",
      "ї": "yi",
      "ґ": "g",
      "ă": "a",
      "Ă": "A",
      "ș": "s",
      "Ș": "S",
      "ț": "t",
      "Ț": "T",
      "ţ": "t",
      "Ţ": "T",
      "а": "a",
      "б": "b",
      "в": "v",
      "г": "g",
      "д": "d",
      "е": "e",
      "ё": "yo",
      "ж": "zh",
      "з": "z",
      "и": "i",
      "й": "i",
      "к": "k",
      "л": "l",
      "м": "m",
      "н": "n",
      "о": "o",
      "п": "p",
      "р": "r",
      "с": "s",
      "т": "t",
      "у": "u",
      "ф": "f",
      "х": "kh",
      "ц": "c",
      "ч": "ch",
      "ш": "sh",
      "щ": "sh",
      "ъ": "",
      "ы": "y",
      "ь": "",
      "э": "e",
      "ю": "yu",
      "я": "ya",
      "А": "A",
      "Б": "B",
      "В": "V",
      "Г": "G",
      "Д": "D",
      "Е": "E",
      "Ё": "Yo",
      "Ж": "Zh",
      "З": "Z",
      "И": "I",
      "Й": "I",
      "К": "K",
      "Л": "L",
      "М": "M",
      "Н": "N",
      "О": "O",
      "П": "P",
      "Р": "R",
      "С": "S",
      "Т": "T",
      "У": "U",
      "Ф": "F",
      "Х": "Kh",
      "Ц": "C",
      "Ч": "Ch",
      "Ш": "Sh",
      "Щ": "Sh",
      "Ъ": "",
      "Ы": "Y",
      "Ь": "",
      "Э": "E",
      "Ю": "Yu",
      "Я": "Ya",
      "ђ": "dj",
      "ј": "j",
      "ћ": "c",
      "џ": "dz",
      "Ђ": "Dj",
      "Ј": "j",
      "Ћ": "C",
      "Џ": "Dz",
      "ľ": "l",
      "ĺ": "l",
      "ŕ": "r",
      "Ľ": "L",
      "Ĺ": "L",
      "Ŕ": "R",
      "ş": "s",
      "Ş": "S",
      "ı": "i",
      "İ": "I",
      "ğ": "g",
      "Ğ": "G",
      "ả": "a",
      "Ả": "A",
      "ẳ": "a",
      "Ẳ": "A",
      "ẩ": "a",
      "Ẩ": "A",
      "đ": "d",
      "Đ": "D",
      "ẹ": "e",
      "Ẹ": "E",
      "ẽ": "e",
      "Ẽ": "E",
      "ẻ": "e",
      "Ẻ": "E",
      "ế": "e",
      "Ế": "E",
      "ề": "e",
      "Ề": "E",
      "ệ": "e",
      "Ệ": "E",
      "ễ": "e",
      "Ễ": "E",
      "ể": "e",
      "Ể": "E",
      "ỏ": "o",
      "ọ": "o",
      "Ọ": "o",
      "ố": "o",
      "Ố": "O",
      "ồ": "o",
      "Ồ": "O",
      "ổ": "o",
      "Ổ": "O",
      "ộ": "o",
      "Ộ": "O",
      "ỗ": "o",
      "Ỗ": "O",
      "ơ": "o",
      "Ơ": "O",
      "ớ": "o",
      "Ớ": "O",
      "ờ": "o",
      "Ờ": "O",
      "ợ": "o",
      "Ợ": "O",
      "ỡ": "o",
      "Ỡ": "O",
      "Ở": "o",
      "ở": "o",
      "ị": "i",
      "Ị": "I",
      "ĩ": "i",
      "Ĩ": "I",
      "ỉ": "i",
      "Ỉ": "i",
      "ủ": "u",
      "Ủ": "U",
      "ụ": "u",
      "Ụ": "U",
      "ũ": "u",
      "Ũ": "U",
      "ư": "u",
      "Ư": "U",
      "ứ": "u",
      "Ứ": "U",
      "ừ": "u",
      "Ừ": "U",
      "ự": "u",
      "Ự": "U",
      "ữ": "u",
      "Ữ": "U",
      "ử": "u",
      "Ử": "ư",
      "ỷ": "y",
      "Ỷ": "y",
      "ỳ": "y",
      "Ỳ": "Y",
      "ỵ": "y",
      "Ỵ": "Y",
      "ỹ": "y",
      "Ỹ": "Y",
      "ạ": "a",
      "Ạ": "A",
      "ấ": "a",
      "Ấ": "A",
      "ầ": "a",
      "Ầ": "A",
      "ậ": "a",
      "Ậ": "A",
      "ẫ": "a",
      "Ẫ": "A",
      "ắ": "a",
      "Ắ": "A",
      "ằ": "a",
      "Ằ": "A",
      "ặ": "a",
      "Ặ": "A",
      "ẵ": "a",
      "Ẵ": "A",
      "⓪": "0",
      "①": "1",
      "②": "2",
      "③": "3",
      "④": "4",
      "⑤": "5",
      "⑥": "6",
      "⑦": "7",
      "⑧": "8",
      "⑨": "9",
      "⑩": "10",
      "⑪": "11",
      "⑫": "12",
      "⑬": "13",
      "⑭": "14",
      "⑮": "15",
      "⑯": "16",
      "⑰": "17",
      "⑱": "18",
      "⑲": "18",
      "⑳": "18",
      "⓵": "1",
      "⓶": "2",
      "⓷": "3",
      "⓸": "4",
      "⓹": "5",
      "⓺": "6",
      "⓻": "7",
      "⓼": "8",
      "⓽": "9",
      "⓾": "10",
      "⓿": "0",
      "⓫": "11",
      "⓬": "12",
      "⓭": "13",
      "⓮": "14",
      "⓯": "15",
      "⓰": "16",
      "⓱": "17",
      "⓲": "18",
      "⓳": "19",
      "⓴": "20",
      "Ⓐ": "A",
      "Ⓑ": "B",
      "Ⓒ": "C",
      "Ⓓ": "D",
      "Ⓔ": "E",
      "Ⓕ": "F",
      "Ⓖ": "G",
      "Ⓗ": "H",
      "Ⓘ": "I",
      "Ⓙ": "J",
      "Ⓚ": "K",
      "Ⓛ": "L",
      "Ⓜ": "M",
      "Ⓝ": "N",
      "Ⓞ": "O",
      "Ⓟ": "P",
      "Ⓠ": "Q",
      "Ⓡ": "R",
      "Ⓢ": "S",
      "Ⓣ": "T",
      "Ⓤ": "U",
      "Ⓥ": "V",
      "Ⓦ": "W",
      "Ⓧ": "X",
      "Ⓨ": "Y",
      "Ⓩ": "Z",
      "ⓐ": "a",
      "ⓑ": "b",
      "ⓒ": "c",
      "ⓓ": "d",
      "ⓔ": "e",
      "ⓕ": "f",
      "ⓖ": "g",
      "ⓗ": "h",
      "ⓘ": "i",
      "ⓙ": "j",
      "ⓚ": "k",
      "ⓛ": "l",
      "ⓜ": "m",
      "ⓝ": "n",
      "ⓞ": "o",
      "ⓟ": "p",
      "ⓠ": "q",
      "ⓡ": "r",
      "ⓢ": "s",
      "ⓣ": "t",
      "ⓤ": "u",
      "ⓦ": "v",
      "ⓥ": "w",
      "ⓧ": "x",
      "ⓨ": "y",
      "ⓩ": "z",
      "“": '"',
      "”": '"',
      "‘": "'",
      "’": "'",
      "∂": "d",
      "ƒ": "f",
      "™": "(TM)",
      "©": "(C)",
      "œ": "oe",
      "Œ": "OE",
      "®": "(R)",
      "†": "+",
      "℠": "(SM)",
      "…": "...",
      "˚": "o",
      "º": "o",
      "ª": "a",
      "•": "*",
      "၊": ",",
      "။": ".",
      "$": "USD",
      "€": "EUR",
      "₢": "BRN",
      "₣": "FRF",
      "£": "GBP",
      "₤": "ITL",
      "₦": "NGN",
      "₧": "ESP",
      "₩": "KRW",
      "₪": "ILS",
      "₫": "VND",
      "₭": "LAK",
      "₮": "MNT",
      "₯": "GRD",
      "₱": "ARS",
      "₲": "PYG",
      "₳": "ARA",
      "₴": "UAH",
      "₵": "GHS",
      "¢": "cent",
      "¥": "CNY",
      "元": "CNY",
      "円": "YEN",
      "﷼": "IRR",
      "₠": "EWE",
      "฿": "THB",
      "₨": "INR",
      "₹": "INR",
      "₰": "PF",
      "₺": "TRY",
      "؋": "AFN",
      "₼": "AZN",
      "лв": "BGN",
      "៛": "KHR",
      "₡": "CRC",
      "₸": "KZT",
      "ден": "MKD",
      "zł": "PLN",
      "₽": "RUB",
      "₾": "GEL"
    };
    var lookAheadCharArray = ["်", "ް"];
    var diatricMap = {
      "ာ": "a",
      "ါ": "a",
      "ေ": "e",
      "ဲ": "e",
      "ိ": "i",
      "ီ": "i",
      "ို": "o",
      "ု": "u",
      "ူ": "u",
      "ေါင်": "aung",
      "ော": "aw",
      "ော်": "aw",
      "ေါ": "aw",
      "ေါ်": "aw",
      "်": "်",
      "က်": "et",
      "ိုက်": "aik",
      "ောက်": "auk",
      "င်": "in",
      "ိုင်": "aing",
      "ောင်": "aung",
      "စ်": "it",
      "ည်": "i",
      "တ်": "at",
      "ိတ်": "eik",
      "ုတ်": "ok",
      "ွတ်": "ut",
      "ေတ်": "it",
      "ဒ်": "d",
      "ိုဒ်": "ok",
      "ုဒ်": "ait",
      "န်": "an",
      "ာန်": "an",
      "ိန်": "ein",
      "ုန်": "on",
      "ွန်": "un",
      "ပ်": "at",
      "ိပ်": "eik",
      "ုပ်": "ok",
      "ွပ်": "ut",
      "န်ုပ်": "nub",
      "မ်": "an",
      "ိမ်": "ein",
      "ုမ်": "on",
      "ွမ်": "un",
      "ယ်": "e",
      "ိုလ်": "ol",
      "ဉ်": "in",
      "ံ": "an",
      "ိံ": "ein",
      "ုံ": "on",
      "ައް": "ah",
      "ަށް": "ah"
    };
    var langCharMap = {
      "en": {},
      "az": {
        "ç": "c",
        "ə": "e",
        "ğ": "g",
        "ı": "i",
        "ö": "o",
        "ş": "s",
        "ü": "u",
        "Ç": "C",
        "Ə": "E",
        "Ğ": "G",
        "İ": "I",
        "Ö": "O",
        "Ş": "S",
        "Ü": "U"
      },
      "cs": {
        "č": "c",
        "ď": "d",
        "ě": "e",
        "ň": "n",
        "ř": "r",
        "š": "s",
        "ť": "t",
        "ů": "u",
        "ž": "z",
        "Č": "C",
        "Ď": "D",
        "Ě": "E",
        "Ň": "N",
        "Ř": "R",
        "Š": "S",
        "Ť": "T",
        "Ů": "U",
        "Ž": "Z"
      },
      "fi": {
        "ä": "a",
        "Ä": "A",
        "ö": "o",
        "Ö": "O"
      },
      "hu": {
        "ä": "a",
        "Ä": "A",
        "ö": "o",
        "Ö": "O",
        "ü": "u",
        "Ü": "U",
        "ű": "u",
        "Ű": "U"
      },
      "lt": {
        "ą": "a",
        "č": "c",
        "ę": "e",
        "ė": "e",
        "į": "i",
        "š": "s",
        "ų": "u",
        "ū": "u",
        "ž": "z",
        "Ą": "A",
        "Č": "C",
        "Ę": "E",
        "Ė": "E",
        "Į": "I",
        "Š": "S",
        "Ų": "U",
        "Ū": "U"
      },
      "lv": {
        "ā": "a",
        "č": "c",
        "ē": "e",
        "ģ": "g",
        "ī": "i",
        "ķ": "k",
        "ļ": "l",
        "ņ": "n",
        "š": "s",
        "ū": "u",
        "ž": "z",
        "Ā": "A",
        "Č": "C",
        "Ē": "E",
        "Ģ": "G",
        "Ī": "i",
        "Ķ": "k",
        "Ļ": "L",
        "Ņ": "N",
        "Š": "S",
        "Ū": "u",
        "Ž": "Z"
      },
      "pl": {
        "ą": "a",
        "ć": "c",
        "ę": "e",
        "ł": "l",
        "ń": "n",
        "ó": "o",
        "ś": "s",
        "ź": "z",
        "ż": "z",
        "Ą": "A",
        "Ć": "C",
        "Ę": "e",
        "Ł": "L",
        "Ń": "N",
        "Ó": "O",
        "Ś": "S",
        "Ź": "Z",
        "Ż": "Z"
      },
      "sv": {
        "ä": "a",
        "Ä": "A",
        "ö": "o",
        "Ö": "O"
      },
      "sk": {
        "ä": "a",
        "Ä": "A"
      },
      "sr": {
        "љ": "lj",
        "њ": "nj",
        "Љ": "Lj",
        "Њ": "Nj",
        "đ": "dj",
        "Đ": "Dj"
      },
      "tr": {
        "Ü": "U",
        "Ö": "O",
        "ü": "u",
        "ö": "o"
      }
    };
    var symbolMap = {
      "ar": {
        "∆": "delta",
        "∞": "la-nihaya",
        "♥": "hob",
        "&": "wa",
        "|": "aw",
        "<": "aqal-men",
        ">": "akbar-men",
        "∑": "majmou",
        "¤": "omla"
      },
      "az": {},
      "ca": {
        "∆": "delta",
        "∞": "infinit",
        "♥": "amor",
        "&": "i",
        "|": "o",
        "<": "menys que",
        ">": "mes que",
        "∑": "suma dels",
        "¤": "moneda"
      },
      "cs": {
        "∆": "delta",
        "∞": "nekonecno",
        "♥": "laska",
        "&": "a",
        "|": "nebo",
        "<": "mensi nez",
        ">": "vetsi nez",
        "∑": "soucet",
        "¤": "mena"
      },
      "de": {
        "∆": "delta",
        "∞": "unendlich",
        "♥": "Liebe",
        "&": "und",
        "|": "oder",
        "<": "kleiner als",
        ">": "groesser als",
        "∑": "Summe von",
        "¤": "Waehrung"
      },
      "dv": {
        "∆": "delta",
        "∞": "kolunulaa",
        "♥": "loabi",
        "&": "aai",
        "|": "noonee",
        "<": "ah vure kuda",
        ">": "ah vure bodu",
        "∑": "jumula",
        "¤": "faisaa"
      },
      "en": {
        "∆": "delta",
        "∞": "infinity",
        "♥": "love",
        "&": "and",
        "|": "or",
        "<": "less than",
        ">": "greater than",
        "∑": "sum",
        "¤": "currency"
      },
      "es": {
        "∆": "delta",
        "∞": "infinito",
        "♥": "amor",
        "&": "y",
        "|": "u",
        "<": "menos que",
        ">": "mas que",
        "∑": "suma de los",
        "¤": "moneda"
      },
      "fa": {
        "∆": "delta",
        "∞": "bi-nahayat",
        "♥": "eshgh",
        "&": "va",
        "|": "ya",
        "<": "kamtar-az",
        ">": "bishtar-az",
        "∑": "majmooe",
        "¤": "vahed"
      },
      "fi": {
        "∆": "delta",
        "∞": "aarettomyys",
        "♥": "rakkaus",
        "&": "ja",
        "|": "tai",
        "<": "pienempi kuin",
        ">": "suurempi kuin",
        "∑": "summa",
        "¤": "valuutta"
      },
      "fr": {
        "∆": "delta",
        "∞": "infiniment",
        "♥": "Amour",
        "&": "et",
        "|": "ou",
        "<": "moins que",
        ">": "superieure a",
        "∑": "somme des",
        "¤": "monnaie"
      },
      "ge": {
        "∆": "delta",
        "∞": "usasruloba",
        "♥": "siqvaruli",
        "&": "da",
        "|": "an",
        "<": "naklebi",
        ">": "meti",
        "∑": "jami",
        "¤": "valuta"
      },
      "gr": {},
      "hu": {
        "∆": "delta",
        "∞": "vegtelen",
        "♥": "szerelem",
        "&": "es",
        "|": "vagy",
        "<": "kisebb mint",
        ">": "nagyobb mint",
        "∑": "szumma",
        "¤": "penznem"
      },
      "it": {
        "∆": "delta",
        "∞": "infinito",
        "♥": "amore",
        "&": "e",
        "|": "o",
        "<": "minore di",
        ">": "maggiore di",
        "∑": "somma",
        "¤": "moneta"
      },
      "lt": {
        "∆": "delta",
        "∞": "begalybe",
        "♥": "meile",
        "&": "ir",
        "|": "ar",
        "<": "maziau nei",
        ">": "daugiau nei",
        "∑": "suma",
        "¤": "valiuta"
      },
      "lv": {
        "∆": "delta",
        "∞": "bezgaliba",
        "♥": "milestiba",
        "&": "un",
        "|": "vai",
        "<": "mazak neka",
        ">": "lielaks neka",
        "∑": "summa",
        "¤": "valuta"
      },
      "my": {
        "∆": "kwahkhyaet",
        "∞": "asaonasme",
        "♥": "akhyait",
        "&": "nhin",
        "|": "tho",
        "<": "ngethaw",
        ">": "kyithaw",
        "∑": "paungld",
        "¤": "ngwekye"
      },
      "mk": {},
      "nl": {
        "∆": "delta",
        "∞": "oneindig",
        "♥": "liefde",
        "&": "en",
        "|": "of",
        "<": "kleiner dan",
        ">": "groter dan",
        "∑": "som",
        "¤": "valuta"
      },
      "pl": {
        "∆": "delta",
        "∞": "nieskonczonosc",
        "♥": "milosc",
        "&": "i",
        "|": "lub",
        "<": "mniejsze niz",
        ">": "wieksze niz",
        "∑": "suma",
        "¤": "waluta"
      },
      "pt": {
        "∆": "delta",
        "∞": "infinito",
        "♥": "amor",
        "&": "e",
        "|": "ou",
        "<": "menor que",
        ">": "maior que",
        "∑": "soma",
        "¤": "moeda"
      },
      "ro": {
        "∆": "delta",
        "∞": "infinit",
        "♥": "dragoste",
        "&": "si",
        "|": "sau",
        "<": "mai mic ca",
        ">": "mai mare ca",
        "∑": "suma",
        "¤": "valuta"
      },
      "ru": {
        "∆": "delta",
        "∞": "beskonechno",
        "♥": "lubov",
        "&": "i",
        "|": "ili",
        "<": "menshe",
        ">": "bolshe",
        "∑": "summa",
        "¤": "valjuta"
      },
      "sk": {
        "∆": "delta",
        "∞": "nekonecno",
        "♥": "laska",
        "&": "a",
        "|": "alebo",
        "<": "menej ako",
        ">": "viac ako",
        "∑": "sucet",
        "¤": "mena"
      },
      "sr": {},
      "tr": {
        "∆": "delta",
        "∞": "sonsuzluk",
        "♥": "ask",
        "&": "ve",
        "|": "veya",
        "<": "kucuktur",
        ">": "buyuktur",
        "∑": "toplam",
        "¤": "para birimi"
      },
      "uk": {
        "∆": "delta",
        "∞": "bezkinechnist",
        "♥": "lubov",
        "&": "i",
        "|": "abo",
        "<": "menshe",
        ">": "bilshe",
        "∑": "suma",
        "¤": "valjuta"
      },
      "vn": {
        "∆": "delta",
        "∞": "vo cuc",
        "♥": "yeu",
        "&": "va",
        "|": "hoac",
        "<": "nho hon",
        ">": "lon hon",
        "∑": "tong",
        "¤": "tien te"
      }
    };
    var uricChars = [
      ";",
      "?",
      ":",
      "@",
      "&",
      "=",
      "+",
      "$",
      ",",
      "/"
    ].join("");
    var uricNoSlashChars = [
      ";",
      "?",
      ":",
      "@",
      "&",
      "=",
      "+",
      "$",
      ","
    ].join("");
    var markChars = [
      ".",
      "!",
      "~",
      "*",
      "'",
      "(",
      ")"
    ].join("");
    var getSlug = function getSlug2(input, opts) {
      var separator = "-";
      var result = "";
      var diatricString = "";
      var convertSymbols = true;
      var customReplacements = {};
      var maintainCase;
      var titleCase;
      var truncate;
      var uricFlag;
      var uricNoSlashFlag;
      var markFlag;
      var symbol;
      var langChar;
      var lucky;
      var i;
      var ch;
      var l;
      var lastCharWasSymbol;
      var lastCharWasDiatric;
      var allowedChars = "";
      if (typeof input !== "string") return "";
      if (typeof opts === "string") separator = opts;
      symbol = symbolMap.en;
      langChar = langCharMap.en;
      if (typeof opts === "object") {
        maintainCase = opts.maintainCase || false;
        customReplacements = opts.custom && typeof opts.custom === "object" ? opts.custom : customReplacements;
        truncate = +opts.truncate > 1 && opts.truncate || false;
        uricFlag = opts.uric || false;
        uricNoSlashFlag = opts.uricNoSlash || false;
        markFlag = opts.mark || false;
        convertSymbols = opts.symbols === false || opts.lang === false ? false : true;
        separator = opts.separator || separator;
        if (uricFlag) allowedChars += uricChars;
        if (uricNoSlashFlag) allowedChars += uricNoSlashChars;
        if (markFlag) allowedChars += markChars;
        symbol = opts.lang && symbolMap[opts.lang] && convertSymbols ? symbolMap[opts.lang] : convertSymbols ? symbolMap.en : {};
        langChar = opts.lang && langCharMap[opts.lang] ? langCharMap[opts.lang] : opts.lang === false || opts.lang === true ? {} : langCharMap.en;
        if (opts.titleCase && typeof opts.titleCase.length === "number" && Array.prototype.toString.call(opts.titleCase)) {
          opts.titleCase.forEach(function(v) {
            customReplacements[v + ""] = v + "";
          });
          titleCase = true;
        } else titleCase = !!opts.titleCase;
        if (opts.custom && typeof opts.custom.length === "number" && Array.prototype.toString.call(opts.custom)) opts.custom.forEach(function(v) {
          customReplacements[v + ""] = v + "";
        });
        Object.keys(customReplacements).forEach(function(v) {
          var r;
          if (v.length > 1) r = new RegExp("\\b" + escapeChars(v) + "\\b", "gi");
          else r = new RegExp(escapeChars(v), "gi");
          input = input.replace(r, customReplacements[v]);
        });
        for (ch in customReplacements) allowedChars += ch;
      }
      allowedChars += separator;
      allowedChars = escapeChars(allowedChars);
      input = input.replace(/(^\s+|\s+$)/g, "");
      lastCharWasSymbol = false;
      lastCharWasDiatric = false;
      for (i = 0, l = input.length; i < l; i++) {
        ch = input[i];
        if (isReplacedCustomChar(ch, customReplacements)) lastCharWasSymbol = false;
        else if (langChar[ch]) {
          ch = lastCharWasSymbol && langChar[ch].match(/[A-Za-z0-9]/) ? " " + langChar[ch] : langChar[ch];
          lastCharWasSymbol = false;
        } else if (ch in charMap) {
          if (i + 1 < l && lookAheadCharArray.indexOf(input[i + 1]) >= 0) {
            diatricString += ch;
            ch = "";
          } else if (lastCharWasDiatric === true) {
            ch = diatricMap[diatricString] + charMap[ch];
            diatricString = "";
          } else ch = lastCharWasSymbol && charMap[ch].match(/[A-Za-z0-9]/) ? " " + charMap[ch] : charMap[ch];
          lastCharWasSymbol = false;
          lastCharWasDiatric = false;
        } else if (ch in diatricMap) {
          diatricString += ch;
          ch = "";
          if (i === l - 1) ch = diatricMap[diatricString];
          lastCharWasDiatric = true;
        } else if (symbol[ch] && !(uricFlag && uricChars.indexOf(ch) !== -1) && !(uricNoSlashFlag && uricNoSlashChars.indexOf(ch) !== -1)) {
          ch = lastCharWasSymbol || result.substr(-1).match(/[A-Za-z0-9]/) ? separator + symbol[ch] : symbol[ch];
          ch += input[i + 1] !== void 0 && input[i + 1].match(/[A-Za-z0-9]/) ? separator : "";
          lastCharWasSymbol = true;
        } else {
          if (lastCharWasDiatric === true) {
            ch = diatricMap[diatricString] + ch;
            diatricString = "";
            lastCharWasDiatric = false;
          } else if (lastCharWasSymbol && (/[A-Za-z0-9]/.test(ch) || result.substr(-1).match(/A-Za-z0-9]/))) ch = " " + ch;
          lastCharWasSymbol = false;
        }
        result += ch.replace(new RegExp("[^\\w\\s" + allowedChars + "_-]", "g"), separator);
      }
      if (titleCase) result = result.replace(/(\w)(\S*)/g, function(_, i2, r) {
        var j = i2.toUpperCase() + (r !== null ? r : "");
        return Object.keys(customReplacements).indexOf(j.toLowerCase()) < 0 ? j : j.toLowerCase();
      });
      result = result.replace(/\s+/g, separator).replace(new RegExp("\\" + separator + "+", "g"), separator).replace(new RegExp("(^\\" + separator + "+|\\" + separator + "+$)", "g"), "");
      if (truncate && result.length > truncate) {
        lucky = result.charAt(truncate) === separator;
        result = result.slice(0, truncate);
        if (!lucky) result = result.slice(0, result.lastIndexOf(separator));
      }
      if (!maintainCase && !titleCase) result = result.toLowerCase();
      return result;
    };
    var createSlug = function createSlug2(opts) {
      return function getSlugWithConfig(input) {
        return getSlug(input, opts);
      };
    };
    var escapeChars = function escapeChars2(input) {
      return input.replace(/[-\\^$*+?.()|[\]{}\/]/g, "\\$&");
    };
    var isReplacedCustomChar = function(ch, customReplacements) {
      for (var c in customReplacements) if (customReplacements[c] === ch) return true;
    };
    if (typeof module !== "undefined" && module.exports) {
      module.exports = getSlug;
      module.exports.createSlug = createSlug;
    } else if (typeof define !== "undefined" && define.amd) define([], function() {
      return getSlug;
    });
    else try {
      if (root.getSlug || root.createSlug) throw "speakingurl: globals exists /(getSlug|createSlug)/";
      else {
        root.getSlug = getSlug;
        root.createSlug = createSlug;
      }
    } catch (e) {
    }
  })(exports);
}));
var import_speakingurl = __toESM2(__commonJSMin2(((exports, module) => {
  module.exports = require_speakingurl$1();
}))(), 1);
var appRecordInfo = target.__VUE_DEVTOOLS_NEXT_APP_RECORD_INFO__ ??= {
  id: 0,
  appIds: /* @__PURE__ */ new Set()
};
function toggleHighPerfMode(state) {
  devtoolsState.highPerfModeEnabled = state ?? !devtoolsState.highPerfModeEnabled;
  if (!state && activeAppRecord.value) registerDevToolsPlugin(activeAppRecord.value.app);
}
function updateDevToolsClientDetected(params) {
  devtoolsState.devtoolsClientDetected = {
    ...devtoolsState.devtoolsClientDetected,
    ...params
  };
  toggleHighPerfMode(!Object.values(devtoolsState.devtoolsClientDetected).some(Boolean));
}
target.__VUE_DEVTOOLS_UPDATE_CLIENT_DETECTED__ ??= updateDevToolsClientDetected;
var DoubleIndexedKV = class {
  constructor() {
    this.keyToValue = /* @__PURE__ */ new Map();
    this.valueToKey = /* @__PURE__ */ new Map();
  }
  set(key, value) {
    this.keyToValue.set(key, value);
    this.valueToKey.set(value, key);
  }
  getByKey(key) {
    return this.keyToValue.get(key);
  }
  getByValue(value) {
    return this.valueToKey.get(value);
  }
  clear() {
    this.keyToValue.clear();
    this.valueToKey.clear();
  }
};
var Registry = class {
  constructor(generateIdentifier) {
    this.generateIdentifier = generateIdentifier;
    this.kv = new DoubleIndexedKV();
  }
  register(value, identifier) {
    if (this.kv.getByValue(value)) return;
    if (!identifier) identifier = this.generateIdentifier(value);
    this.kv.set(identifier, value);
  }
  clear() {
    this.kv.clear();
  }
  getIdentifier(value) {
    return this.kv.getByValue(value);
  }
  getValue(identifier) {
    return this.kv.getByKey(identifier);
  }
};
var ClassRegistry = class extends Registry {
  constructor() {
    super((c) => c.name);
    this.classToAllowedProps = /* @__PURE__ */ new Map();
  }
  register(value, options) {
    if (typeof options === "object") {
      if (options.allowProps) this.classToAllowedProps.set(value, options.allowProps);
      super.register(value, options.identifier);
    } else super.register(value, options);
  }
  getAllowedProps(value) {
    return this.classToAllowedProps.get(value);
  }
};
function valuesOfObj(record) {
  if ("values" in Object) return Object.values(record);
  const values = [];
  for (const key in record) if (record.hasOwnProperty(key)) values.push(record[key]);
  return values;
}
function find(record, predicate) {
  const values = valuesOfObj(record);
  if ("find" in values) return values.find(predicate);
  const valuesNotNever = values;
  for (let i = 0; i < valuesNotNever.length; i++) {
    const value = valuesNotNever[i];
    if (predicate(value)) return value;
  }
}
function forEach(record, run) {
  Object.entries(record).forEach(([key, value]) => run(value, key));
}
function includes(arr, value) {
  return arr.indexOf(value) !== -1;
}
function findArr(record, predicate) {
  for (let i = 0; i < record.length; i++) {
    const value = record[i];
    if (predicate(value)) return value;
  }
}
var CustomTransformerRegistry = class {
  constructor() {
    this.transfomers = {};
  }
  register(transformer) {
    this.transfomers[transformer.name] = transformer;
  }
  findApplicable(v) {
    return find(this.transfomers, (transformer) => transformer.isApplicable(v));
  }
  findByName(name) {
    return this.transfomers[name];
  }
};
var getType$1 = (payload) => Object.prototype.toString.call(payload).slice(8, -1);
var isUndefined$1 = (payload) => typeof payload === "undefined";
var isNull$1 = (payload) => payload === null;
var isPlainObject$2 = (payload) => {
  if (typeof payload !== "object" || payload === null) return false;
  if (payload === Object.prototype) return false;
  if (Object.getPrototypeOf(payload) === null) return true;
  return Object.getPrototypeOf(payload) === Object.prototype;
};
var isEmptyObject = (payload) => isPlainObject$2(payload) && Object.keys(payload).length === 0;
var isArray$2 = (payload) => Array.isArray(payload);
var isString = (payload) => typeof payload === "string";
var isNumber = (payload) => typeof payload === "number" && !isNaN(payload);
var isBoolean = (payload) => typeof payload === "boolean";
var isRegExp = (payload) => payload instanceof RegExp;
var isMap = (payload) => payload instanceof Map;
var isSet = (payload) => payload instanceof Set;
var isSymbol = (payload) => getType$1(payload) === "Symbol";
var isDate = (payload) => payload instanceof Date && !isNaN(payload.valueOf());
var isError = (payload) => payload instanceof Error;
var isNaNValue = (payload) => typeof payload === "number" && isNaN(payload);
var isPrimitive = (payload) => isBoolean(payload) || isNull$1(payload) || isUndefined$1(payload) || isNumber(payload) || isString(payload) || isSymbol(payload);
var isBigint = (payload) => typeof payload === "bigint";
var isInfinite = (payload) => payload === Infinity || payload === -Infinity;
var isTypedArray = (payload) => ArrayBuffer.isView(payload) && !(payload instanceof DataView);
var isURL = (payload) => payload instanceof URL;
var escapeKey = (key) => key.replace(/\./g, "\\.");
var stringifyPath = (path) => path.map(String).map(escapeKey).join(".");
var parsePath = (string) => {
  const result = [];
  let segment = "";
  for (let i = 0; i < string.length; i++) {
    let char = string.charAt(i);
    if (char === "\\" && string.charAt(i + 1) === ".") {
      segment += ".";
      i++;
      continue;
    }
    if (char === ".") {
      result.push(segment);
      segment = "";
      continue;
    }
    segment += char;
  }
  const lastSegment = segment;
  result.push(lastSegment);
  return result;
};
function simpleTransformation(isApplicable, annotation, transform, untransform) {
  return {
    isApplicable,
    annotation,
    transform,
    untransform
  };
}
var simpleRules = [
  simpleTransformation(isUndefined$1, "undefined", () => null, () => void 0),
  simpleTransformation(isBigint, "bigint", (v) => v.toString(), (v) => {
    if (typeof BigInt !== "undefined") return BigInt(v);
    console.error("Please add a BigInt polyfill.");
    return v;
  }),
  simpleTransformation(isDate, "Date", (v) => v.toISOString(), (v) => new Date(v)),
  simpleTransformation(isError, "Error", (v, superJson) => {
    const baseError = {
      name: v.name,
      message: v.message
    };
    superJson.allowedErrorProps.forEach((prop) => {
      baseError[prop] = v[prop];
    });
    return baseError;
  }, (v, superJson) => {
    const e = new Error(v.message);
    e.name = v.name;
    e.stack = v.stack;
    superJson.allowedErrorProps.forEach((prop) => {
      e[prop] = v[prop];
    });
    return e;
  }),
  simpleTransformation(isRegExp, "regexp", (v) => "" + v, (regex) => {
    const body = regex.slice(1, regex.lastIndexOf("/"));
    const flags = regex.slice(regex.lastIndexOf("/") + 1);
    return new RegExp(body, flags);
  }),
  simpleTransformation(isSet, "set", (v) => [...v.values()], (v) => new Set(v)),
  simpleTransformation(isMap, "map", (v) => [...v.entries()], (v) => new Map(v)),
  simpleTransformation((v) => isNaNValue(v) || isInfinite(v), "number", (v) => {
    if (isNaNValue(v)) return "NaN";
    if (v > 0) return "Infinity";
    else return "-Infinity";
  }, Number),
  simpleTransformation((v) => v === 0 && 1 / v === -Infinity, "number", () => {
    return "-0";
  }, Number),
  simpleTransformation(isURL, "URL", (v) => v.toString(), (v) => new URL(v))
];
function compositeTransformation(isApplicable, annotation, transform, untransform) {
  return {
    isApplicable,
    annotation,
    transform,
    untransform
  };
}
var symbolRule = compositeTransformation((s, superJson) => {
  if (isSymbol(s)) return !!superJson.symbolRegistry.getIdentifier(s);
  return false;
}, (s, superJson) => {
  return ["symbol", superJson.symbolRegistry.getIdentifier(s)];
}, (v) => v.description, (_, a, superJson) => {
  const value = superJson.symbolRegistry.getValue(a[1]);
  if (!value) throw new Error("Trying to deserialize unknown symbol");
  return value;
});
var constructorToName = [
  Int8Array,
  Uint8Array,
  Int16Array,
  Uint16Array,
  Int32Array,
  Uint32Array,
  Float32Array,
  Float64Array,
  Uint8ClampedArray
].reduce((obj, ctor) => {
  obj[ctor.name] = ctor;
  return obj;
}, {});
var typedArrayRule = compositeTransformation(isTypedArray, (v) => ["typed-array", v.constructor.name], (v) => [...v], (v, a) => {
  const ctor = constructorToName[a[1]];
  if (!ctor) throw new Error("Trying to deserialize unknown typed array");
  return new ctor(v);
});
function isInstanceOfRegisteredClass(potentialClass, superJson) {
  if (potentialClass?.constructor) return !!superJson.classRegistry.getIdentifier(potentialClass.constructor);
  return false;
}
var classRule = compositeTransformation(isInstanceOfRegisteredClass, (clazz, superJson) => {
  return ["class", superJson.classRegistry.getIdentifier(clazz.constructor)];
}, (clazz, superJson) => {
  const allowedProps = superJson.classRegistry.getAllowedProps(clazz.constructor);
  if (!allowedProps) return { ...clazz };
  const result = {};
  allowedProps.forEach((prop) => {
    result[prop] = clazz[prop];
  });
  return result;
}, (v, a, superJson) => {
  const clazz = superJson.classRegistry.getValue(a[1]);
  if (!clazz) throw new Error(`Trying to deserialize unknown class '${a[1]}' - check https://github.com/blitz-js/superjson/issues/116#issuecomment-773996564`);
  return Object.assign(Object.create(clazz.prototype), v);
});
var customRule = compositeTransformation((value, superJson) => {
  return !!superJson.customTransformerRegistry.findApplicable(value);
}, (value, superJson) => {
  return ["custom", superJson.customTransformerRegistry.findApplicable(value).name];
}, (value, superJson) => {
  return superJson.customTransformerRegistry.findApplicable(value).serialize(value);
}, (v, a, superJson) => {
  const transformer = superJson.customTransformerRegistry.findByName(a[1]);
  if (!transformer) throw new Error("Trying to deserialize unknown custom value");
  return transformer.deserialize(v);
});
var compositeRules = [
  classRule,
  symbolRule,
  customRule,
  typedArrayRule
];
var transformValue = (value, superJson) => {
  const applicableCompositeRule = findArr(compositeRules, (rule) => rule.isApplicable(value, superJson));
  if (applicableCompositeRule) return {
    value: applicableCompositeRule.transform(value, superJson),
    type: applicableCompositeRule.annotation(value, superJson)
  };
  const applicableSimpleRule = findArr(simpleRules, (rule) => rule.isApplicable(value, superJson));
  if (applicableSimpleRule) return {
    value: applicableSimpleRule.transform(value, superJson),
    type: applicableSimpleRule.annotation
  };
};
var simpleRulesByAnnotation = {};
simpleRules.forEach((rule) => {
  simpleRulesByAnnotation[rule.annotation] = rule;
});
var untransformValue = (json, type, superJson) => {
  if (isArray$2(type)) switch (type[0]) {
    case "symbol":
      return symbolRule.untransform(json, type, superJson);
    case "class":
      return classRule.untransform(json, type, superJson);
    case "custom":
      return customRule.untransform(json, type, superJson);
    case "typed-array":
      return typedArrayRule.untransform(json, type, superJson);
    default:
      throw new Error("Unknown transformation: " + type);
  }
  else {
    const transformation = simpleRulesByAnnotation[type];
    if (!transformation) throw new Error("Unknown transformation: " + type);
    return transformation.untransform(json, superJson);
  }
};
var getNthKey = (value, n) => {
  if (n > value.size) throw new Error("index out of bounds");
  const keys = value.keys();
  while (n > 0) {
    keys.next();
    n--;
  }
  return keys.next().value;
};
function validatePath(path) {
  if (includes(path, "__proto__")) throw new Error("__proto__ is not allowed as a property");
  if (includes(path, "prototype")) throw new Error("prototype is not allowed as a property");
  if (includes(path, "constructor")) throw new Error("constructor is not allowed as a property");
}
var getDeep = (object, path) => {
  validatePath(path);
  for (let i = 0; i < path.length; i++) {
    const key = path[i];
    if (isSet(object)) object = getNthKey(object, +key);
    else if (isMap(object)) {
      const row = +key;
      const type = +path[++i] === 0 ? "key" : "value";
      const keyOfRow = getNthKey(object, row);
      switch (type) {
        case "key":
          object = keyOfRow;
          break;
        case "value":
          object = object.get(keyOfRow);
          break;
      }
    } else object = object[key];
  }
  return object;
};
var setDeep = (object, path, mapper) => {
  validatePath(path);
  if (path.length === 0) return mapper(object);
  let parent = object;
  for (let i = 0; i < path.length - 1; i++) {
    const key = path[i];
    if (isArray$2(parent)) {
      const index = +key;
      parent = parent[index];
    } else if (isPlainObject$2(parent)) parent = parent[key];
    else if (isSet(parent)) {
      const row = +key;
      parent = getNthKey(parent, row);
    } else if (isMap(parent)) {
      if (i === path.length - 2) break;
      const row = +key;
      const type = +path[++i] === 0 ? "key" : "value";
      const keyOfRow = getNthKey(parent, row);
      switch (type) {
        case "key":
          parent = keyOfRow;
          break;
        case "value":
          parent = parent.get(keyOfRow);
          break;
      }
    }
  }
  const lastKey = path[path.length - 1];
  if (isArray$2(parent)) parent[+lastKey] = mapper(parent[+lastKey]);
  else if (isPlainObject$2(parent)) parent[lastKey] = mapper(parent[lastKey]);
  if (isSet(parent)) {
    const oldValue = getNthKey(parent, +lastKey);
    const newValue = mapper(oldValue);
    if (oldValue !== newValue) {
      parent.delete(oldValue);
      parent.add(newValue);
    }
  }
  if (isMap(parent)) {
    const row = +path[path.length - 2];
    const keyToRow = getNthKey(parent, row);
    switch (+lastKey === 0 ? "key" : "value") {
      case "key": {
        const newKey = mapper(keyToRow);
        parent.set(newKey, parent.get(keyToRow));
        if (newKey !== keyToRow) parent.delete(keyToRow);
        break;
      }
      case "value":
        parent.set(keyToRow, mapper(parent.get(keyToRow)));
        break;
    }
  }
  return object;
};
function traverse(tree, walker2, origin = []) {
  if (!tree) return;
  if (!isArray$2(tree)) {
    forEach(tree, (subtree, key) => traverse(subtree, walker2, [...origin, ...parsePath(key)]));
    return;
  }
  const [nodeValue, children] = tree;
  if (children) forEach(children, (child, key) => {
    traverse(child, walker2, [...origin, ...parsePath(key)]);
  });
  walker2(nodeValue, origin);
}
function applyValueAnnotations(plain, annotations, superJson) {
  traverse(annotations, (type, path) => {
    plain = setDeep(plain, path, (v) => untransformValue(v, type, superJson));
  });
  return plain;
}
function applyReferentialEqualityAnnotations(plain, annotations) {
  function apply(identicalPaths, path) {
    const object = getDeep(plain, parsePath(path));
    identicalPaths.map(parsePath).forEach((identicalObjectPath) => {
      plain = setDeep(plain, identicalObjectPath, () => object);
    });
  }
  if (isArray$2(annotations)) {
    const [root, other] = annotations;
    root.forEach((identicalPath) => {
      plain = setDeep(plain, parsePath(identicalPath), () => plain);
    });
    if (other) forEach(other, apply);
  } else forEach(annotations, apply);
  return plain;
}
var isDeep = (object, superJson) => isPlainObject$2(object) || isArray$2(object) || isMap(object) || isSet(object) || isInstanceOfRegisteredClass(object, superJson);
function addIdentity(object, path, identities) {
  const existingSet = identities.get(object);
  if (existingSet) existingSet.push(path);
  else identities.set(object, [path]);
}
function generateReferentialEqualityAnnotations(identitites, dedupe) {
  const result = {};
  let rootEqualityPaths = void 0;
  identitites.forEach((paths) => {
    if (paths.length <= 1) return;
    if (!dedupe) paths = paths.map((path) => path.map(String)).sort((a, b) => a.length - b.length);
    const [representativePath, ...identicalPaths] = paths;
    if (representativePath.length === 0) rootEqualityPaths = identicalPaths.map(stringifyPath);
    else result[stringifyPath(representativePath)] = identicalPaths.map(stringifyPath);
  });
  if (rootEqualityPaths) if (isEmptyObject(result)) return [rootEqualityPaths];
  else return [rootEqualityPaths, result];
  else return isEmptyObject(result) ? void 0 : result;
}
var walker = (object, identities, superJson, dedupe, path = [], objectsInThisPath = [], seenObjects = /* @__PURE__ */ new Map()) => {
  const primitive = isPrimitive(object);
  if (!primitive) {
    addIdentity(object, path, identities);
    const seen = seenObjects.get(object);
    if (seen) return dedupe ? { transformedValue: null } : seen;
  }
  if (!isDeep(object, superJson)) {
    const transformed2 = transformValue(object, superJson);
    const result2 = transformed2 ? {
      transformedValue: transformed2.value,
      annotations: [transformed2.type]
    } : { transformedValue: object };
    if (!primitive) seenObjects.set(object, result2);
    return result2;
  }
  if (includes(objectsInThisPath, object)) return { transformedValue: null };
  const transformationResult = transformValue(object, superJson);
  const transformed = transformationResult?.value ?? object;
  const transformedValue = isArray$2(transformed) ? [] : {};
  const innerAnnotations = {};
  forEach(transformed, (value, index) => {
    if (index === "__proto__" || index === "constructor" || index === "prototype") throw new Error(`Detected property ${index}. This is a prototype pollution risk, please remove it from your object.`);
    const recursiveResult = walker(value, identities, superJson, dedupe, [...path, index], [...objectsInThisPath, object], seenObjects);
    transformedValue[index] = recursiveResult.transformedValue;
    if (isArray$2(recursiveResult.annotations)) innerAnnotations[index] = recursiveResult.annotations;
    else if (isPlainObject$2(recursiveResult.annotations)) forEach(recursiveResult.annotations, (tree, key) => {
      innerAnnotations[escapeKey(index) + "." + key] = tree;
    });
  });
  const result = isEmptyObject(innerAnnotations) ? {
    transformedValue,
    annotations: !!transformationResult ? [transformationResult.type] : void 0
  } : {
    transformedValue,
    annotations: !!transformationResult ? [transformationResult.type, innerAnnotations] : innerAnnotations
  };
  if (!primitive) seenObjects.set(object, result);
  return result;
};
function getType(payload) {
  return Object.prototype.toString.call(payload).slice(8, -1);
}
function isArray$1(payload) {
  return getType(payload) === "Array";
}
function isPlainObject$1(payload) {
  if (getType(payload) !== "Object") return false;
  const prototype = Object.getPrototypeOf(payload);
  return !!prototype && prototype.constructor === Object && prototype === Object.prototype;
}
function isNull(payload) {
  return getType(payload) === "Null";
}
function isOneOf(a, b, c, d, e) {
  return (value) => a(value) || b(value) || !!c && c(value) || !!d && d(value) || !!e && e(value);
}
function isUndefined(payload) {
  return getType(payload) === "Undefined";
}
isOneOf(isNull, isUndefined);
function assignProp(carry, key, newVal, originalObject, includeNonenumerable) {
  const propType = {}.propertyIsEnumerable.call(originalObject, key) ? "enumerable" : "nonenumerable";
  if (propType === "enumerable") carry[key] = newVal;
  if (includeNonenumerable && propType === "nonenumerable") Object.defineProperty(carry, key, {
    value: newVal,
    enumerable: false,
    writable: true,
    configurable: true
  });
}
function copy(target2, options = {}) {
  if (isArray$1(target2)) return target2.map((item) => copy(item, options));
  if (!isPlainObject$1(target2)) return target2;
  const props = Object.getOwnPropertyNames(target2);
  const symbols = Object.getOwnPropertySymbols(target2);
  return [...props, ...symbols].reduce((carry, key) => {
    if (isArray$1(options.props) && !options.props.includes(key)) return carry;
    const val = target2[key];
    assignProp(carry, key, copy(val, options), target2, options.nonenumerable);
    return carry;
  }, {});
}
var SuperJSON = class {
  /**
  * @param dedupeReferentialEqualities  If true, SuperJSON will make sure only one instance of referentially equal objects are serialized and the rest are replaced with `null`.
  */
  constructor({ dedupe = false } = {}) {
    this.classRegistry = new ClassRegistry();
    this.symbolRegistry = new Registry((s) => s.description ?? "");
    this.customTransformerRegistry = new CustomTransformerRegistry();
    this.allowedErrorProps = [];
    this.dedupe = dedupe;
  }
  serialize(object) {
    const identities = /* @__PURE__ */ new Map();
    const output = walker(object, identities, this, this.dedupe);
    const res = { json: output.transformedValue };
    if (output.annotations) res.meta = {
      ...res.meta,
      values: output.annotations
    };
    const equalityAnnotations = generateReferentialEqualityAnnotations(identities, this.dedupe);
    if (equalityAnnotations) res.meta = {
      ...res.meta,
      referentialEqualities: equalityAnnotations
    };
    return res;
  }
  deserialize(payload) {
    const { json, meta } = payload;
    let result = copy(json);
    if (meta?.values) result = applyValueAnnotations(result, meta.values, this);
    if (meta?.referentialEqualities) result = applyReferentialEqualityAnnotations(result, meta.referentialEqualities);
    return result;
  }
  stringify(object) {
    return JSON.stringify(this.serialize(object));
  }
  parse(string) {
    return this.deserialize(JSON.parse(string));
  }
  registerClass(v, options) {
    this.classRegistry.register(v, options);
  }
  registerSymbol(v, identifier) {
    this.symbolRegistry.register(v, identifier);
  }
  registerCustom(transformer, name) {
    this.customTransformerRegistry.register({
      name,
      ...transformer
    });
  }
  allowErrorProps(...props) {
    this.allowedErrorProps.push(...props);
  }
};
SuperJSON.defaultInstance = new SuperJSON();
SuperJSON.serialize = SuperJSON.defaultInstance.serialize.bind(SuperJSON.defaultInstance);
SuperJSON.deserialize = SuperJSON.defaultInstance.deserialize.bind(SuperJSON.defaultInstance);
SuperJSON.stringify = SuperJSON.defaultInstance.stringify.bind(SuperJSON.defaultInstance);
SuperJSON.parse = SuperJSON.defaultInstance.parse.bind(SuperJSON.defaultInstance);
SuperJSON.registerClass = SuperJSON.defaultInstance.registerClass.bind(SuperJSON.defaultInstance);
SuperJSON.registerSymbol = SuperJSON.defaultInstance.registerSymbol.bind(SuperJSON.defaultInstance);
SuperJSON.registerCustom = SuperJSON.defaultInstance.registerCustom.bind(SuperJSON.defaultInstance);
SuperJSON.allowErrorProps = SuperJSON.defaultInstance.allowErrorProps.bind(SuperJSON.defaultInstance);
SuperJSON.serialize;
SuperJSON.deserialize;
SuperJSON.stringify;
SuperJSON.parse;
SuperJSON.registerClass;
SuperJSON.registerCustom;
SuperJSON.registerSymbol;
SuperJSON.allowErrorProps;
target.__VUE_DEVTOOLS_KIT_MESSAGE_CHANNELS__ ??= [];
target.__VUE_DEVTOOLS_KIT_RPC_CLIENT__ ??= null;
target.__VUE_DEVTOOLS_KIT_RPC_SERVER__ ??= null;
target.__VUE_DEVTOOLS_KIT_VITE_RPC_CLIENT__ ??= null;
target.__VUE_DEVTOOLS_KIT_VITE_RPC_SERVER__ ??= null;
target.__VUE_DEVTOOLS_KIT_BROADCAST_RPC_SERVER__ ??= null;
var MAX_SERIALIZED_SIZE = 2 * 1024 * 1024;

// node_modules/.pnpm/vue-router@5.0.3_@vue+compiler-sfc@3.5.30_pinia@3.0.4_typescript@5.9.3_vue@3.5.30_typescript@_i4dbyttqvptjjqanjkhzwnporu/node_modules/vue-router/dist/devtools-CVsCuYdF.js
function warn$1(msg) {
  const args = Array.from(arguments).slice(1);
  console.warn.apply(console, ["[Vue Router warn]: " + msg].concat(args));
}
var HASH_RE = /#/g;
var AMPERSAND_RE = /&/g;
var SLASH_RE = /\//g;
var EQUAL_RE = /=/g;
var IM_RE = /\?/g;
var PLUS_RE = /\+/g;
var ENC_BRACKET_OPEN_RE = /%5B/g;
var ENC_BRACKET_CLOSE_RE = /%5D/g;
var ENC_CARET_RE = /%5E/g;
var ENC_BACKTICK_RE = /%60/g;
var ENC_CURLY_OPEN_RE = /%7B/g;
var ENC_PIPE_RE = /%7C/g;
var ENC_CURLY_CLOSE_RE = /%7D/g;
var ENC_SPACE_RE = /%20/g;
function commonEncode(text) {
  return text == null ? "" : encodeURI("" + text).replace(ENC_PIPE_RE, "|").replace(ENC_BRACKET_OPEN_RE, "[").replace(ENC_BRACKET_CLOSE_RE, "]");
}
function encodeHash(text) {
  return commonEncode(text).replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^");
}
function encodeQueryValue(text) {
  return commonEncode(text).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function encodePath(text) {
  return commonEncode(text).replace(HASH_RE, "%23").replace(IM_RE, "%3F");
}
function encodeParam(text) {
  return encodePath(text).replace(SLASH_RE, "%2F");
}
function decode(text) {
  if (text == null) return null;
  try {
    return decodeURIComponent("" + text);
  } catch (err) {
    warn$1(`Error decoding "${text}". Using original value`);
  }
  return "" + text;
}
var TRAILING_SLASH_RE = /\/$/;
var removeTrailingSlash = (path) => path.replace(TRAILING_SLASH_RE, "");
function parseURL(parseQuery2, location2, currentLocation = "/") {
  let path, query = {}, searchString = "", hash = "";
  const hashPos = location2.indexOf("#");
  let searchPos = location2.indexOf("?");
  searchPos = hashPos >= 0 && searchPos > hashPos ? -1 : searchPos;
  if (searchPos >= 0) {
    path = location2.slice(0, searchPos);
    searchString = location2.slice(searchPos, hashPos > 0 ? hashPos : location2.length);
    query = parseQuery2(searchString.slice(1));
  }
  if (hashPos >= 0) {
    path = path || location2.slice(0, hashPos);
    hash = location2.slice(hashPos, location2.length);
  }
  path = resolveRelativePath(path != null ? path : location2, currentLocation);
  return {
    fullPath: path + searchString + hash,
    path,
    query,
    hash: decode(hash)
  };
}
function stringifyURL(stringifyQuery2, location2) {
  const query = location2.query ? stringifyQuery2(location2.query) : "";
  return location2.path + (query && "?") + query + (location2.hash || "");
}
function stripBase(pathname, base) {
  if (!base || !pathname.toLowerCase().startsWith(base.toLowerCase())) return pathname;
  return pathname.slice(base.length) || "/";
}
function isSameRouteLocation(stringifyQuery2, a, b) {
  const aLastIndex = a.matched.length - 1;
  const bLastIndex = b.matched.length - 1;
  return aLastIndex > -1 && aLastIndex === bLastIndex && isSameRouteRecord(a.matched[aLastIndex], b.matched[bLastIndex]) && isSameRouteLocationParams(a.params, b.params) && stringifyQuery2(a.query) === stringifyQuery2(b.query) && a.hash === b.hash;
}
function isSameRouteRecord(a, b) {
  return (a.aliasOf || a) === (b.aliasOf || b);
}
function isSameRouteLocationParams(a, b) {
  if (Object.keys(a).length !== Object.keys(b).length) return false;
  for (var key in a) if (!isSameRouteLocationParamsValue(a[key], b[key])) return false;
  return true;
}
function isSameRouteLocationParamsValue(a, b) {
  return isArray(a) ? isEquivalentArray(a, b) : isArray(b) ? isEquivalentArray(b, a) : (a && a.valueOf()) === (b && b.valueOf());
}
function isEquivalentArray(a, b) {
  return isArray(b) ? a.length === b.length && a.every((value, i) => value === b[i]) : a.length === 1 && a[0] === b;
}
function resolveRelativePath(to, from) {
  if (to.startsWith("/")) return to;
  if (!from.startsWith("/")) {
    warn$1(`Cannot resolve a relative location without an absolute path. Trying to resolve "${to}" from "${from}". It should look like "/${from}".`);
    return to;
  }
  if (!to) return from;
  const fromSegments = from.split("/");
  const toSegments = to.split("/");
  const lastToSegment = toSegments[toSegments.length - 1];
  if (lastToSegment === ".." || lastToSegment === ".") toSegments.push("");
  let position = fromSegments.length - 1;
  let toPosition;
  let segment;
  for (toPosition = 0; toPosition < toSegments.length; toPosition++) {
    segment = toSegments[toPosition];
    if (segment === ".") continue;
    if (segment === "..") {
      if (position > 1) position--;
    } else break;
  }
  return fromSegments.slice(0, position).join("/") + "/" + toSegments.slice(toPosition).join("/");
}
var START_LOCATION_NORMALIZED = {
  path: "/",
  name: void 0,
  params: {},
  query: {},
  hash: "",
  fullPath: "/",
  matched: [],
  meta: {},
  redirectedFrom: void 0
};
var NavigationType = (function(NavigationType2) {
  NavigationType2["pop"] = "pop";
  NavigationType2["push"] = "push";
  return NavigationType2;
})({});
var NavigationDirection = (function(NavigationDirection2) {
  NavigationDirection2["back"] = "back";
  NavigationDirection2["forward"] = "forward";
  NavigationDirection2["unknown"] = "";
  return NavigationDirection2;
})({});
var START = "";
function normalizeBase(base) {
  if (!base) if (isBrowser) {
    const baseEl = document.querySelector("base");
    base = baseEl && baseEl.getAttribute("href") || "/";
    base = base.replace(/^\w+:\/\/[^\/]+/, "");
  } else base = "/";
  if (base[0] !== "/" && base[0] !== "#") base = "/" + base;
  return removeTrailingSlash(base);
}
var BEFORE_HASH_RE = /^[^#]+#/;
function createHref(base, location2) {
  return base.replace(BEFORE_HASH_RE, "#") + location2;
}
function getElementPosition(el, offset) {
  const docRect = document.documentElement.getBoundingClientRect();
  const elRect = el.getBoundingClientRect();
  return {
    behavior: offset.behavior,
    left: elRect.left - docRect.left - (offset.left || 0),
    top: elRect.top - docRect.top - (offset.top || 0)
  };
}
var computeScrollPosition = () => ({
  left: window.scrollX,
  top: window.scrollY
});
function scrollToPosition(position) {
  let scrollToOptions;
  if ("el" in position) {
    const positionEl = position.el;
    const isIdSelector = typeof positionEl === "string" && positionEl.startsWith("#");
    if (typeof position.el === "string") {
      if (!isIdSelector || !document.getElementById(position.el.slice(1))) try {
        const foundEl = document.querySelector(position.el);
        if (isIdSelector && foundEl) {
          warn$1(`The selector "${position.el}" should be passed as "el: document.querySelector('${position.el}')" because it starts with "#".`);
          return;
        }
      } catch (err) {
        warn$1(`The selector "${position.el}" is invalid. If you are using an id selector, make sure to escape it. You can find more information about escaping characters in selectors at https://mathiasbynens.be/notes/css-escapes or use CSS.escape (https://developer.mozilla.org/en-US/docs/Web/API/CSS/escape).`);
        return;
      }
    }
    const el = typeof positionEl === "string" ? isIdSelector ? document.getElementById(positionEl.slice(1)) : document.querySelector(positionEl) : positionEl;
    if (!el) {
      warn$1(`Couldn't find element using selector "${position.el}" returned by scrollBehavior.`);
      return;
    }
    scrollToOptions = getElementPosition(el, position);
  } else scrollToOptions = position;
  if ("scrollBehavior" in document.documentElement.style) window.scrollTo(scrollToOptions);
  else window.scrollTo(scrollToOptions.left != null ? scrollToOptions.left : window.scrollX, scrollToOptions.top != null ? scrollToOptions.top : window.scrollY);
}
function getScrollKey(path, delta) {
  return (history.state ? history.state.position - delta : -1) + path;
}
var scrollPositions = /* @__PURE__ */ new Map();
function saveScrollPosition(key, scrollPosition) {
  scrollPositions.set(key, scrollPosition);
}
function getSavedScrollPosition(key) {
  const scroll = scrollPositions.get(key);
  scrollPositions.delete(key);
  return scroll;
}
function isRouteLocation(route) {
  return typeof route === "string" || route && typeof route === "object";
}
function isRouteName(name) {
  return typeof name === "string" || typeof name === "symbol";
}
function parseQuery(search) {
  const query = {};
  if (search === "" || search === "?") return query;
  const searchParams = (search[0] === "?" ? search.slice(1) : search).split("&");
  for (let i = 0; i < searchParams.length; ++i) {
    const searchParam = searchParams[i].replace(PLUS_RE, " ");
    const eqPos = searchParam.indexOf("=");
    const key = decode(eqPos < 0 ? searchParam : searchParam.slice(0, eqPos));
    const value = eqPos < 0 ? null : decode(searchParam.slice(eqPos + 1));
    if (key in query) {
      let currentValue = query[key];
      if (!isArray(currentValue)) currentValue = query[key] = [currentValue];
      currentValue.push(value);
    } else query[key] = value;
  }
  return query;
}
function stringifyQuery(query) {
  let search = "";
  for (let key in query) {
    const value = query[key];
    key = encodeQueryKey(key);
    if (value == null) {
      if (value !== void 0) search += (search.length ? "&" : "") + key;
      continue;
    }
    (isArray(value) ? value.map((v) => v && encodeQueryValue(v)) : [value && encodeQueryValue(value)]).forEach((value2) => {
      if (value2 !== void 0) {
        search += (search.length ? "&" : "") + key;
        if (value2 != null) search += "=" + value2;
      }
    });
  }
  return search;
}
function normalizeQuery(query) {
  const normalizedQuery = {};
  for (const key in query) {
    const value = query[key];
    if (value !== void 0) normalizedQuery[key] = isArray(value) ? value.map((v) => v == null ? null : "" + v) : value == null ? value : "" + value;
  }
  return normalizedQuery;
}
function useCallbacks() {
  let handlers = [];
  function add(handler) {
    handlers.push(handler);
    return () => {
      const i = handlers.indexOf(handler);
      if (i > -1) handlers.splice(i, 1);
    };
  }
  function reset() {
    handlers = [];
  }
  return {
    add,
    list: () => handlers.slice(),
    reset
  };
}
function registerGuard(activeRecordRef, name, guard) {
  const record = activeRecordRef.value;
  if (!record) {
    if (true) warn$1(`No active route record was found when calling \`${name === "updateGuards" ? "onBeforeRouteUpdate" : "onBeforeRouteLeave"}()\`. Make sure you call this function inside a component child of <router-view>. Maybe you called it inside of App.vue?`);
    return;
  }
  let currentRecord = record;
  const removeFromList = () => {
    currentRecord[name].delete(guard);
  };
  onUnmounted(removeFromList);
  onDeactivated(removeFromList);
  onActivated(() => {
    const newRecord = activeRecordRef.value;
    if (!newRecord) warn$1("No active route record was found when reactivating component with navigation guard. This is likely a bug in vue-router. Please report it.");
    if (newRecord) currentRecord = newRecord;
    currentRecord[name].add(guard);
  });
  currentRecord[name].add(guard);
}
function onBeforeRouteLeave(leaveGuard) {
  if (!getCurrentInstance()) {
    warn$1("getCurrentInstance() returned null. onBeforeRouteLeave() must be called at the top of a setup function");
    return;
  }
  registerGuard(inject(matchedRouteKey, {}), "leaveGuards", leaveGuard);
}
function onBeforeRouteUpdate(updateGuard) {
  if (!getCurrentInstance()) {
    warn$1("getCurrentInstance() returned null. onBeforeRouteUpdate() must be called at the top of a setup function");
    return;
  }
  registerGuard(inject(matchedRouteKey, {}), "updateGuards", updateGuard);
}
function guardToPromiseFn(guard, to, from, record, name, runWithContext = (fn) => fn()) {
  const enterCallbackArray = record && (record.enterCallbacks[name] = record.enterCallbacks[name] || []);
  return () => new Promise((resolve, reject) => {
    const next = (valid) => {
      if (valid === false) reject(createRouterError(ErrorTypes.NAVIGATION_ABORTED, {
        from,
        to
      }));
      else if (valid instanceof Error) reject(valid);
      else if (isRouteLocation(valid)) reject(createRouterError(ErrorTypes.NAVIGATION_GUARD_REDIRECT, {
        from: to,
        to: valid
      }));
      else {
        if (enterCallbackArray && record.enterCallbacks[name] === enterCallbackArray && typeof valid === "function") enterCallbackArray.push(valid);
        resolve();
      }
    };
    const guardReturn = runWithContext(() => guard.call(record && record.instances[name], to, from, true ? withDeprecationWarning(canOnlyBeCalledOnce(next, to, from)) : next));
    let guardCall = Promise.resolve(guardReturn);
    if (guard.length < 3) guardCall = guardCall.then(next);
    if (guard.length > 2) {
      const message = `The "next" callback was never called inside of ${guard.name ? '"' + guard.name + '"' : ""}:
${guard.toString()}
. If you are returning a value instead of calling "next", make sure to remove the "next" parameter from your function.`;
      if (typeof guardReturn === "object" && "then" in guardReturn) guardCall = guardCall.then((resolvedValue) => {
        if (!next._called) {
          warn$1(message);
          return Promise.reject(new Error("Invalid navigation guard"));
        }
        return resolvedValue;
      });
      else if (guardReturn !== void 0) {
        if (!next._called) {
          warn$1(message);
          reject(new Error("Invalid navigation guard"));
          return;
        }
      }
    }
    guardCall.catch((err) => reject(err));
  });
}
function withDeprecationWarning(next) {
  let warned = false;
  return function() {
    if (!warned) {
      warned = true;
      warn$1("The `next()` callback in navigation guards is deprecated. Return the value instead of calling `next(value)`.");
    }
    return next.apply(this, arguments);
  };
}
function canOnlyBeCalledOnce(next, to, from) {
  let called = 0;
  return function() {
    if (called++ === 1) warn$1(`The "next" callback was called more than once in one navigation guard when going from "${from.fullPath}" to "${to.fullPath}". It should be called exactly one time in each navigation guard. This will fail in production.`);
    next._called = true;
    if (called === 1) next.apply(null, arguments);
  };
}
function extractComponentsGuards(matched, guardType, to, from, runWithContext = (fn) => fn()) {
  const guards = [];
  for (const record of matched) {
    if (!record.components && record.children && !record.children.length) warn$1(`Record with path "${record.path}" is either missing a "component(s)" or "children" property.`);
    for (const name in record.components) {
      let rawComponent = record.components[name];
      if (true) {
        if (!rawComponent || typeof rawComponent !== "object" && typeof rawComponent !== "function") {
          warn$1(`Component "${name}" in record with path "${record.path}" is not a valid component. Received "${String(rawComponent)}".`);
          throw new Error("Invalid route component");
        } else if ("then" in rawComponent) {
          warn$1(`Component "${name}" in record with path "${record.path}" is a Promise instead of a function that returns a Promise. Did you write "import('./MyPage.vue')" instead of "() => import('./MyPage.vue')" ? This will break in production if not fixed.`);
          const promise = rawComponent;
          rawComponent = () => promise;
        } else if (rawComponent.__asyncLoader && !rawComponent.__warnedDefineAsync) {
          rawComponent.__warnedDefineAsync = true;
          warn$1(`Component "${name}" in record with path "${record.path}" is defined using "defineAsyncComponent()". Write "() => import('./MyPage.vue')" instead of "defineAsyncComponent(() => import('./MyPage.vue'))".`);
        }
      }
      if (guardType !== "beforeRouteEnter" && !record.instances[name]) continue;
      if (isRouteComponent(rawComponent)) {
        const guard = (rawComponent.__vccOpts || rawComponent)[guardType];
        guard && guards.push(guardToPromiseFn(guard, to, from, record, name, runWithContext));
      } else {
        let componentPromise = rawComponent();
        if (!("catch" in componentPromise)) {
          warn$1(`Component "${name}" in record with path "${record.path}" is a function that does not return a Promise. If you were passing a functional component, make sure to add a "displayName" to the component. This will break in production if not fixed.`);
          componentPromise = Promise.resolve(componentPromise);
        }
        guards.push(() => componentPromise.then((resolved) => {
          if (!resolved) throw new Error(`Couldn't resolve component "${name}" at "${record.path}"`);
          const resolvedComponent = isESModule(resolved) ? resolved.default : resolved;
          record.mods[name] = resolved;
          record.components[name] = resolvedComponent;
          const guard = (resolvedComponent.__vccOpts || resolvedComponent)[guardType];
          return guard && guardToPromiseFn(guard, to, from, record, name, runWithContext)();
        }));
      }
    }
  }
  return guards;
}
function loadRouteLocation(route) {
  return route.matched.every((record) => record.redirect) ? Promise.reject(new Error("Cannot load a route that redirects.")) : Promise.all(route.matched.map((record) => record.components && Promise.all(Object.keys(record.components).reduce((promises, name) => {
    const rawComponent = record.components[name];
    if (typeof rawComponent === "function" && !("displayName" in rawComponent)) promises.push(rawComponent().then((resolved) => {
      if (!resolved) return Promise.reject(new Error(`Couldn't resolve component "${name}" at "${record.path}". Ensure you passed a function that returns a promise.`));
      const resolvedComponent = isESModule(resolved) ? resolved.default : resolved;
      record.mods[name] = resolved;
      record.components[name] = resolvedComponent;
    }));
    return promises;
  }, [])))).then(() => route);
}
function extractChangingRecords(to, from) {
  const leavingRecords = [];
  const updatingRecords = [];
  const enteringRecords = [];
  const len = Math.max(from.matched.length, to.matched.length);
  for (let i = 0; i < len; i++) {
    const recordFrom = from.matched[i];
    if (recordFrom) if (to.matched.find((record) => isSameRouteRecord(record, recordFrom))) updatingRecords.push(recordFrom);
    else leavingRecords.push(recordFrom);
    const recordTo = to.matched[i];
    if (recordTo) {
      if (!from.matched.find((record) => isSameRouteRecord(record, recordTo))) enteringRecords.push(recordTo);
    }
  }
  return [
    leavingRecords,
    updatingRecords,
    enteringRecords
  ];
}
function formatRouteLocation(routeLocation, tooltip) {
  const copy2 = assign({}, routeLocation, { matched: routeLocation.matched.map((matched) => omit(matched, [
    "instances",
    "children",
    "aliasOf"
  ])) });
  return { _custom: {
    type: null,
    readOnly: true,
    display: routeLocation.fullPath,
    tooltip,
    value: copy2
  } };
}
function formatDisplay(display) {
  return { _custom: { display } };
}
var routerId = 0;
function addDevtools(app, router, matcher) {
  if (router.__hasDevtools) return;
  router.__hasDevtools = true;
  const id = routerId++;
  setupDevToolsPlugin({
    id: "org.vuejs.router" + (id ? "." + id : ""),
    label: "Vue Router",
    packageName: "vue-router",
    homepage: "https://router.vuejs.org",
    logo: "https://router.vuejs.org/logo.png",
    componentStateTypes: ["Routing"],
    app
  }, (api) => {
    api.on.inspectComponent((payload) => {
      if (payload.instanceData) payload.instanceData.state.push({
        type: "Routing",
        key: "$route",
        editable: false,
        value: formatRouteLocation(router.currentRoute.value, "Current Route")
      });
    });
    api.on.visitComponentTree(({ treeNode: node, componentInstance }) => {
      if (componentInstance.__vrv_devtools) {
        const info = componentInstance.__vrv_devtools;
        node.tags.push({
          label: (info.name ? `${info.name.toString()}: ` : "") + info.path,
          textColor: 0,
          tooltip: "This component is rendered by &lt;router-view&gt;",
          backgroundColor: PINK_500
        });
      }
      if (isArray(componentInstance.__vrl_devtools)) {
        componentInstance.__devtoolsApi = api;
        componentInstance.__vrl_devtools.forEach((devtoolsData) => {
          let label = devtoolsData.route.path;
          let backgroundColor = ORANGE_400;
          let tooltip = "";
          let textColor = 0;
          if (devtoolsData.error) {
            label = devtoolsData.error;
            backgroundColor = RED_100;
            textColor = RED_700;
          } else if (devtoolsData.isExactActive) {
            backgroundColor = LIME_500;
            tooltip = "This is exactly active";
          } else if (devtoolsData.isActive) {
            backgroundColor = BLUE_600;
            tooltip = "This link is active";
          }
          node.tags.push({
            label,
            textColor,
            tooltip,
            backgroundColor
          });
        });
      }
    });
    watch(router.currentRoute, () => {
      refreshRoutesView();
      api.notifyComponentUpdate();
      api.sendInspectorTree(routerInspectorId);
      api.sendInspectorState(routerInspectorId);
    });
    const navigationsLayerId = "router:navigations:" + id;
    api.addTimelineLayer({
      id: navigationsLayerId,
      label: `Router${id ? " " + id : ""} Navigations`,
      color: 4237508
    });
    router.onError((error, to) => {
      api.addTimelineEvent({
        layerId: navigationsLayerId,
        event: {
          title: "Error during Navigation",
          subtitle: to.fullPath,
          logType: "error",
          time: api.now(),
          data: { error },
          groupId: to.meta.__navigationId
        }
      });
    });
    let navigationId = 0;
    router.beforeEach((to, from) => {
      const data = {
        guard: formatDisplay("beforeEach"),
        from: formatRouteLocation(from, "Current Location during this navigation"),
        to: formatRouteLocation(to, "Target location")
      };
      Object.defineProperty(to.meta, "__navigationId", { value: navigationId++ });
      api.addTimelineEvent({
        layerId: navigationsLayerId,
        event: {
          time: api.now(),
          title: "Start of navigation",
          subtitle: to.fullPath,
          data,
          groupId: to.meta.__navigationId
        }
      });
    });
    router.afterEach((to, from, failure) => {
      const data = { guard: formatDisplay("afterEach") };
      if (failure) {
        data.failure = { _custom: {
          type: Error,
          readOnly: true,
          display: failure ? failure.message : "",
          tooltip: "Navigation Failure",
          value: failure
        } };
        data.status = formatDisplay("❌");
      } else data.status = formatDisplay("✅");
      data.from = formatRouteLocation(from, "Current Location during this navigation");
      data.to = formatRouteLocation(to, "Target location");
      api.addTimelineEvent({
        layerId: navigationsLayerId,
        event: {
          title: "End of navigation",
          subtitle: to.fullPath,
          time: api.now(),
          data,
          logType: failure ? "warning" : "default",
          groupId: to.meta.__navigationId
        }
      });
    });
    const routerInspectorId = "router-inspector:" + id;
    api.addInspector({
      id: routerInspectorId,
      label: "Routes" + (id ? " " + id : ""),
      icon: "book",
      treeFilterPlaceholder: "Search routes"
    });
    function refreshRoutesView() {
      if (!activeRoutesPayload) return;
      const payload = activeRoutesPayload;
      let routes = matcher.getRoutes().filter((route) => !route.parent || !route.parent.record.components);
      routes.forEach(resetMatchStateOnRouteRecord);
      if (payload.filter) routes = routes.filter((route) => isRouteMatching(route, payload.filter.toLowerCase()));
      routes.forEach((route) => markRouteRecordActive(route, router.currentRoute.value));
      payload.rootNodes = routes.map(formatRouteRecordForInspector);
    }
    let activeRoutesPayload;
    api.on.getInspectorTree((payload) => {
      activeRoutesPayload = payload;
      if (payload.app === app && payload.inspectorId === routerInspectorId) refreshRoutesView();
    });
    api.on.getInspectorState((payload) => {
      if (payload.app === app && payload.inspectorId === routerInspectorId) {
        const route = matcher.getRoutes().find((route2) => route2.record.__vd_id === payload.nodeId);
        if (route) payload.state = { options: formatRouteRecordMatcherForStateInspector(route) };
      }
    });
    api.sendInspectorTree(routerInspectorId);
    api.sendInspectorState(routerInspectorId);
  });
}
function modifierForKey(key) {
  if (key.optional) return key.repeatable ? "*" : "?";
  else return key.repeatable ? "+" : "";
}
function formatRouteRecordMatcherForStateInspector(route) {
  const { record } = route;
  const fields = [{
    editable: false,
    key: "path",
    value: record.path
  }];
  if (record.name != null) fields.push({
    editable: false,
    key: "name",
    value: record.name
  });
  fields.push({
    editable: false,
    key: "regexp",
    value: route.re
  });
  if (route.keys.length) fields.push({
    editable: false,
    key: "keys",
    value: { _custom: {
      type: null,
      readOnly: true,
      display: route.keys.map((key) => `${key.name}${modifierForKey(key)}`).join(" "),
      tooltip: "Param keys",
      value: route.keys
    } }
  });
  if (record.redirect != null) fields.push({
    editable: false,
    key: "redirect",
    value: record.redirect
  });
  if (route.alias.length) fields.push({
    editable: false,
    key: "aliases",
    value: route.alias.map((alias) => alias.record.path)
  });
  if (Object.keys(route.record.meta).length) fields.push({
    editable: false,
    key: "meta",
    value: route.record.meta
  });
  fields.push({
    key: "score",
    editable: false,
    value: { _custom: {
      type: null,
      readOnly: true,
      display: route.score.map((score) => score.join(", ")).join(" | "),
      tooltip: "Score used to sort routes",
      value: route.score
    } }
  });
  return fields;
}
var PINK_500 = 15485081;
var BLUE_600 = 2450411;
var LIME_500 = 8702998;
var CYAN_400 = 2282478;
var ORANGE_400 = 16486972;
var DARK = 6710886;
var RED_100 = 16704226;
var RED_700 = 12131356;
function formatRouteRecordForInspector(route) {
  const tags = [];
  const { record } = route;
  if (record.name != null) tags.push({
    label: String(record.name),
    textColor: 0,
    backgroundColor: CYAN_400
  });
  if (record.aliasOf) tags.push({
    label: "alias",
    textColor: 0,
    backgroundColor: ORANGE_400
  });
  if (route.__vd_match) tags.push({
    label: "matches",
    textColor: 0,
    backgroundColor: PINK_500
  });
  if (route.__vd_exactActive) tags.push({
    label: "exact",
    textColor: 0,
    backgroundColor: LIME_500
  });
  if (route.__vd_active) tags.push({
    label: "active",
    textColor: 0,
    backgroundColor: BLUE_600
  });
  if (record.redirect) tags.push({
    label: typeof record.redirect === "string" ? `redirect: ${record.redirect}` : "redirects",
    textColor: 16777215,
    backgroundColor: DARK
  });
  let id = record.__vd_id;
  if (id == null) {
    id = String(routeRecordId++);
    record.__vd_id = id;
  }
  return {
    id,
    label: record.path,
    tags,
    children: route.children.map(formatRouteRecordForInspector)
  };
}
var routeRecordId = 0;
var EXTRACT_REGEXP_RE = /^\/(.*)\/([a-z]*)$/;
function markRouteRecordActive(route, currentRoute) {
  const isExactActive = currentRoute.matched.length && isSameRouteRecord(currentRoute.matched[currentRoute.matched.length - 1], route.record);
  route.__vd_exactActive = route.__vd_active = isExactActive;
  if (!isExactActive) route.__vd_active = currentRoute.matched.some((match) => isSameRouteRecord(match, route.record));
  route.children.forEach((childRoute) => markRouteRecordActive(childRoute, currentRoute));
}
function resetMatchStateOnRouteRecord(route) {
  route.__vd_match = false;
  route.children.forEach(resetMatchStateOnRouteRecord);
}
function isRouteMatching(route, filter) {
  const found = String(route.re).match(EXTRACT_REGEXP_RE);
  route.__vd_match = false;
  if (!found || found.length < 3) return false;
  if (new RegExp(found[1].replace(/\$$/, ""), found[2]).test(filter)) {
    route.children.forEach((child) => isRouteMatching(child, filter));
    if (route.record.path !== "/" || filter === "/") {
      route.__vd_match = route.re.test(filter);
      return true;
    }
    return false;
  }
  const path = route.record.path.toLowerCase();
  const decodedPath = decode(path);
  if (!filter.startsWith("/") && (decodedPath.includes(filter) || path.includes(filter))) return true;
  if (decodedPath.startsWith(filter) || path.startsWith(filter)) return true;
  if (route.record.name && String(route.record.name).includes(filter)) return true;
  return route.children.some((child) => isRouteMatching(child, filter));
}
function omit(obj, keys) {
  const ret = {};
  for (const key in obj) if (!keys.includes(key)) ret[key] = obj[key];
  return ret;
}

// node_modules/.pnpm/vue-router@5.0.3_@vue+compiler-sfc@3.5.30_pinia@3.0.4_typescript@5.9.3_vue@3.5.30_typescript@_i4dbyttqvptjjqanjkhzwnporu/node_modules/vue-router/dist/vue-router.js
var createBaseLocation = () => location.protocol + "//" + location.host;
function createCurrentLocation(base, location2) {
  const { pathname, search, hash } = location2;
  const hashPos = base.indexOf("#");
  if (hashPos > -1) {
    let slicePos = hash.includes(base.slice(hashPos)) ? base.slice(hashPos).length : 1;
    let pathFromHash = hash.slice(slicePos);
    if (pathFromHash[0] !== "/") pathFromHash = "/" + pathFromHash;
    return stripBase(pathFromHash, "");
  }
  return stripBase(pathname, base) + search + hash;
}
function useHistoryListeners(base, historyState, currentLocation, replace) {
  let listeners = [];
  let teardowns = [];
  let pauseState = null;
  const popStateHandler = ({ state }) => {
    const to = createCurrentLocation(base, location);
    const from = currentLocation.value;
    const fromState = historyState.value;
    let delta = 0;
    if (state) {
      currentLocation.value = to;
      historyState.value = state;
      if (pauseState && pauseState === from) {
        pauseState = null;
        return;
      }
      delta = fromState ? state.position - fromState.position : 0;
    } else replace(to);
    listeners.forEach((listener) => {
      listener(currentLocation.value, from, {
        delta,
        type: NavigationType.pop,
        direction: delta ? delta > 0 ? NavigationDirection.forward : NavigationDirection.back : NavigationDirection.unknown
      });
    });
  };
  function pauseListeners() {
    pauseState = currentLocation.value;
  }
  function listen(callback) {
    listeners.push(callback);
    const teardown = () => {
      const index = listeners.indexOf(callback);
      if (index > -1) listeners.splice(index, 1);
    };
    teardowns.push(teardown);
    return teardown;
  }
  function beforeUnloadListener() {
    if (document.visibilityState === "hidden") {
      const { history: history2 } = window;
      if (!history2.state) return;
      history2.replaceState(assign({}, history2.state, { scroll: computeScrollPosition() }), "");
    }
  }
  function destroy() {
    for (const teardown of teardowns) teardown();
    teardowns = [];
    window.removeEventListener("popstate", popStateHandler);
    window.removeEventListener("pagehide", beforeUnloadListener);
    document.removeEventListener("visibilitychange", beforeUnloadListener);
  }
  window.addEventListener("popstate", popStateHandler);
  window.addEventListener("pagehide", beforeUnloadListener);
  document.addEventListener("visibilitychange", beforeUnloadListener);
  return {
    pauseListeners,
    listen,
    destroy
  };
}
function buildState(back, current, forward, replaced = false, computeScroll = false) {
  return {
    back,
    current,
    forward,
    replaced,
    position: window.history.length,
    scroll: computeScroll ? computeScrollPosition() : null
  };
}
function useHistoryStateNavigation(base) {
  const { history: history2, location: location2 } = window;
  const currentLocation = { value: createCurrentLocation(base, location2) };
  const historyState = { value: history2.state };
  if (!historyState.value) changeLocation(currentLocation.value, {
    back: null,
    current: currentLocation.value,
    forward: null,
    position: history2.length - 1,
    replaced: true,
    scroll: null
  }, true);
  function changeLocation(to, state, replace2) {
    const hashIndex = base.indexOf("#");
    const url = hashIndex > -1 ? (location2.host && document.querySelector("base") ? base : base.slice(hashIndex)) + to : createBaseLocation() + base + to;
    try {
      history2[replace2 ? "replaceState" : "pushState"](state, "", url);
      historyState.value = state;
    } catch (err) {
      if (true) warn$1("Error with push/replace State", err);
      else console.error(err);
      location2[replace2 ? "replace" : "assign"](url);
    }
  }
  function replace(to, data) {
    changeLocation(to, assign({}, history2.state, buildState(historyState.value.back, to, historyState.value.forward, true), data, { position: historyState.value.position }), true);
    currentLocation.value = to;
  }
  function push(to, data) {
    const currentState = assign({}, historyState.value, history2.state, {
      forward: to,
      scroll: computeScrollPosition()
    });
    if (!history2.state) warn$1("history.state seems to have been manually replaced without preserving the necessary values. Make sure to preserve existing history state if you are manually calling history.replaceState:\n\nhistory.replaceState(history.state, '', url)\n\nYou can find more information at https://router.vuejs.org/guide/migration/#Usage-of-history-state");
    changeLocation(currentState.current, currentState, true);
    changeLocation(to, assign({}, buildState(currentLocation.value, to, null), { position: currentState.position + 1 }, data), false);
    currentLocation.value = to;
  }
  return {
    location: currentLocation,
    state: historyState,
    push,
    replace
  };
}
function createWebHistory(base) {
  base = normalizeBase(base);
  const historyNavigation = useHistoryStateNavigation(base);
  const historyListeners = useHistoryListeners(base, historyNavigation.state, historyNavigation.location, historyNavigation.replace);
  function go(delta, triggerListeners = true) {
    if (!triggerListeners) historyListeners.pauseListeners();
    history.go(delta);
  }
  const routerHistory = assign({
    location: "",
    base,
    go,
    createHref: createHref.bind(null, base)
  }, historyNavigation, historyListeners);
  Object.defineProperty(routerHistory, "location", {
    enumerable: true,
    get: () => historyNavigation.location.value
  });
  Object.defineProperty(routerHistory, "state", {
    enumerable: true,
    get: () => historyNavigation.state.value
  });
  return routerHistory;
}
function createMemoryHistory(base = "") {
  let listeners = [];
  let queue = [[START, {}]];
  let position = 0;
  base = normalizeBase(base);
  function setLocation(location2, state = {}) {
    position++;
    if (position !== queue.length) queue.splice(position);
    queue.push([location2, state]);
  }
  function triggerListeners(to, from, { direction, delta }) {
    const info = {
      direction,
      delta,
      type: NavigationType.pop
    };
    for (const callback of listeners) callback(to, from, info);
  }
  const routerHistory = {
    location: START,
    state: {},
    base,
    createHref: createHref.bind(null, base),
    replace(to, state) {
      queue.splice(position--, 1);
      setLocation(to, state);
    },
    push(to, state) {
      setLocation(to, state);
    },
    listen(callback) {
      listeners.push(callback);
      return () => {
        const index = listeners.indexOf(callback);
        if (index > -1) listeners.splice(index, 1);
      };
    },
    destroy() {
      listeners = [];
      queue = [[START, {}]];
      position = 0;
    },
    go(delta, shouldTrigger = true) {
      const from = this.location;
      const direction = delta < 0 ? NavigationDirection.back : NavigationDirection.forward;
      position = Math.max(0, Math.min(position + delta, queue.length - 1));
      if (shouldTrigger) triggerListeners(this.location, from, {
        direction,
        delta
      });
    }
  };
  Object.defineProperty(routerHistory, "location", {
    enumerable: true,
    get: () => queue[position][0]
  });
  Object.defineProperty(routerHistory, "state", {
    enumerable: true,
    get: () => queue[position][1]
  });
  return routerHistory;
}
function createWebHashHistory(base) {
  base = location.host ? base || location.pathname + location.search : "";
  if (!base.includes("#")) base += "#";
  if (!base.endsWith("#/") && !base.endsWith("#")) warn$1(`A hash base must end with a "#":
"${base}" should be "${base.replace(/#.*$/, "#")}".`);
  return createWebHistory(base);
}
var TokenType = (function(TokenType2) {
  TokenType2[TokenType2["Static"] = 0] = "Static";
  TokenType2[TokenType2["Param"] = 1] = "Param";
  TokenType2[TokenType2["Group"] = 2] = "Group";
  return TokenType2;
})({});
var TokenizerState = (function(TokenizerState2) {
  TokenizerState2[TokenizerState2["Static"] = 0] = "Static";
  TokenizerState2[TokenizerState2["Param"] = 1] = "Param";
  TokenizerState2[TokenizerState2["ParamRegExp"] = 2] = "ParamRegExp";
  TokenizerState2[TokenizerState2["ParamRegExpEnd"] = 3] = "ParamRegExpEnd";
  TokenizerState2[TokenizerState2["EscapeNext"] = 4] = "EscapeNext";
  return TokenizerState2;
})(TokenizerState || {});
var ROOT_TOKEN = {
  type: TokenType.Static,
  value: ""
};
var VALID_PARAM_RE = /[a-zA-Z0-9_]/;
function tokenizePath(path) {
  if (!path) return [[]];
  if (path === "/") return [[ROOT_TOKEN]];
  if (!path.startsWith("/")) throw new Error(true ? `Route paths should start with a "/": "${path}" should be "/${path}".` : `Invalid path "${path}"`);
  function crash(message) {
    throw new Error(`ERR (${state})/"${buffer}": ${message}`);
  }
  let state = TokenizerState.Static;
  let previousState = state;
  const tokens = [];
  let segment;
  function finalizeSegment() {
    if (segment) tokens.push(segment);
    segment = [];
  }
  let i = 0;
  let char;
  let buffer = "";
  let customRe = "";
  function consumeBuffer() {
    if (!buffer) return;
    if (state === TokenizerState.Static) segment.push({
      type: TokenType.Static,
      value: buffer
    });
    else if (state === TokenizerState.Param || state === TokenizerState.ParamRegExp || state === TokenizerState.ParamRegExpEnd) {
      if (segment.length > 1 && (char === "*" || char === "+")) crash(`A repeatable param (${buffer}) must be alone in its segment. eg: '/:ids+.`);
      segment.push({
        type: TokenType.Param,
        value: buffer,
        regexp: customRe,
        repeatable: char === "*" || char === "+",
        optional: char === "*" || char === "?"
      });
    } else crash("Invalid state to consume buffer");
    buffer = "";
  }
  function addCharToBuffer() {
    buffer += char;
  }
  while (i < path.length) {
    char = path[i++];
    if (char === "\\" && state !== TokenizerState.ParamRegExp) {
      previousState = state;
      state = TokenizerState.EscapeNext;
      continue;
    }
    switch (state) {
      case TokenizerState.Static:
        if (char === "/") {
          if (buffer) consumeBuffer();
          finalizeSegment();
        } else if (char === ":") {
          consumeBuffer();
          state = TokenizerState.Param;
        } else addCharToBuffer();
        break;
      case TokenizerState.EscapeNext:
        addCharToBuffer();
        state = previousState;
        break;
      case TokenizerState.Param:
        if (char === "(") state = TokenizerState.ParamRegExp;
        else if (VALID_PARAM_RE.test(char)) addCharToBuffer();
        else {
          consumeBuffer();
          state = TokenizerState.Static;
          if (char !== "*" && char !== "?" && char !== "+") i--;
        }
        break;
      case TokenizerState.ParamRegExp:
        if (char === ")") if (customRe[customRe.length - 1] == "\\") customRe = customRe.slice(0, -1) + char;
        else state = TokenizerState.ParamRegExpEnd;
        else customRe += char;
        break;
      case TokenizerState.ParamRegExpEnd:
        consumeBuffer();
        state = TokenizerState.Static;
        if (char !== "*" && char !== "?" && char !== "+") i--;
        customRe = "";
        break;
      default:
        crash("Unknown state");
        break;
    }
  }
  if (state === TokenizerState.ParamRegExp) crash(`Unfinished custom RegExp for param "${buffer}"`);
  consumeBuffer();
  finalizeSegment();
  return tokens;
}
var BASE_PARAM_PATTERN = "[^/]+?";
var BASE_PATH_PARSER_OPTIONS = {
  sensitive: false,
  strict: false,
  start: true,
  end: true
};
var PathScore = (function(PathScore2) {
  PathScore2[PathScore2["_multiplier"] = 10] = "_multiplier";
  PathScore2[PathScore2["Root"] = 90] = "Root";
  PathScore2[PathScore2["Segment"] = 40] = "Segment";
  PathScore2[PathScore2["SubSegment"] = 30] = "SubSegment";
  PathScore2[PathScore2["Static"] = 40] = "Static";
  PathScore2[PathScore2["Dynamic"] = 20] = "Dynamic";
  PathScore2[PathScore2["BonusCustomRegExp"] = 10] = "BonusCustomRegExp";
  PathScore2[PathScore2["BonusWildcard"] = -50] = "BonusWildcard";
  PathScore2[PathScore2["BonusRepeatable"] = -20] = "BonusRepeatable";
  PathScore2[PathScore2["BonusOptional"] = -8] = "BonusOptional";
  PathScore2[PathScore2["BonusStrict"] = 0.7000000000000001] = "BonusStrict";
  PathScore2[PathScore2["BonusCaseSensitive"] = 0.25] = "BonusCaseSensitive";
  return PathScore2;
})(PathScore || {});
var REGEX_CHARS_RE = /[.+*?^${}()[\]/\\]/g;
function tokensToParser(segments, extraOptions) {
  const options = assign({}, BASE_PATH_PARSER_OPTIONS, extraOptions);
  const score = [];
  let pattern = options.start ? "^" : "";
  const keys = [];
  for (const segment of segments) {
    const segmentScores = segment.length ? [] : [PathScore.Root];
    if (options.strict && !segment.length) pattern += "/";
    for (let tokenIndex = 0; tokenIndex < segment.length; tokenIndex++) {
      const token = segment[tokenIndex];
      let subSegmentScore = PathScore.Segment + (options.sensitive ? PathScore.BonusCaseSensitive : 0);
      if (token.type === TokenType.Static) {
        if (!tokenIndex) pattern += "/";
        pattern += token.value.replace(REGEX_CHARS_RE, "\\$&");
        subSegmentScore += PathScore.Static;
      } else if (token.type === TokenType.Param) {
        const { value, repeatable, optional, regexp } = token;
        keys.push({
          name: value,
          repeatable,
          optional
        });
        const re2 = regexp ? regexp : BASE_PARAM_PATTERN;
        if (re2 !== BASE_PARAM_PATTERN) {
          subSegmentScore += PathScore.BonusCustomRegExp;
          try {
            new RegExp(`(${re2})`);
          } catch (err) {
            throw new Error(`Invalid custom RegExp for param "${value}" (${re2}): ` + err.message);
          }
        }
        let subPattern = repeatable ? `((?:${re2})(?:/(?:${re2}))*)` : `(${re2})`;
        if (!tokenIndex) subPattern = optional && segment.length < 2 ? `(?:/${subPattern})` : "/" + subPattern;
        if (optional) subPattern += "?";
        pattern += subPattern;
        subSegmentScore += PathScore.Dynamic;
        if (optional) subSegmentScore += PathScore.BonusOptional;
        if (repeatable) subSegmentScore += PathScore.BonusRepeatable;
        if (re2 === ".*") subSegmentScore += PathScore.BonusWildcard;
      }
      segmentScores.push(subSegmentScore);
    }
    score.push(segmentScores);
  }
  if (options.strict && options.end) {
    const i = score.length - 1;
    score[i][score[i].length - 1] += PathScore.BonusStrict;
  }
  if (!options.strict) pattern += "/?";
  if (options.end) pattern += "$";
  else if (options.strict && !pattern.endsWith("/")) pattern += "(?:/|$)";
  const re = new RegExp(pattern, options.sensitive ? "" : "i");
  function parse(path) {
    const match = path.match(re);
    const params = {};
    if (!match) return null;
    for (let i = 1; i < match.length; i++) {
      const value = match[i] || "";
      const key = keys[i - 1];
      params[key.name] = value && key.repeatable ? value.split("/") : value;
    }
    return params;
  }
  function stringify(params) {
    let path = "";
    let avoidDuplicatedSlash = false;
    for (const segment of segments) {
      if (!avoidDuplicatedSlash || !path.endsWith("/")) path += "/";
      avoidDuplicatedSlash = false;
      for (const token of segment) if (token.type === TokenType.Static) path += token.value;
      else if (token.type === TokenType.Param) {
        const { value, repeatable, optional } = token;
        const param = value in params ? params[value] : "";
        if (isArray(param) && !repeatable) throw new Error(`Provided param "${value}" is an array but it is not repeatable (* or + modifiers)`);
        const text = isArray(param) ? param.join("/") : param;
        if (!text) if (optional) {
          if (segment.length < 2) if (path.endsWith("/")) path = path.slice(0, -1);
          else avoidDuplicatedSlash = true;
        } else throw new Error(`Missing required param "${value}"`);
        path += text;
      }
    }
    return path || "/";
  }
  return {
    re,
    score,
    keys,
    parse,
    stringify
  };
}
function compareScoreArray(a, b) {
  let i = 0;
  while (i < a.length && i < b.length) {
    const diff = b[i] - a[i];
    if (diff) return diff;
    i++;
  }
  if (a.length < b.length) return a.length === 1 && a[0] === PathScore.Static + PathScore.Segment ? -1 : 1;
  else if (a.length > b.length) return b.length === 1 && b[0] === PathScore.Static + PathScore.Segment ? 1 : -1;
  return 0;
}
function comparePathParserScore(a, b) {
  let i = 0;
  const aScore = a.score;
  const bScore = b.score;
  while (i < aScore.length && i < bScore.length) {
    const comp = compareScoreArray(aScore[i], bScore[i]);
    if (comp) return comp;
    i++;
  }
  if (Math.abs(bScore.length - aScore.length) === 1) {
    if (isLastScoreNegative(aScore)) return 1;
    if (isLastScoreNegative(bScore)) return -1;
  }
  return bScore.length - aScore.length;
}
function isLastScoreNegative(score) {
  const last = score[score.length - 1];
  return score.length > 0 && last[last.length - 1] < 0;
}
var PATH_PARSER_OPTIONS_DEFAULTS = {
  strict: false,
  end: true,
  sensitive: false
};
function createRouteRecordMatcher(record, parent, options) {
  const parser = tokensToParser(tokenizePath(record.path), options);
  if (true) {
    const existingKeys = /* @__PURE__ */ new Set();
    for (const key of parser.keys) {
      if (existingKeys.has(key.name)) warn$1(`Found duplicated params with name "${key.name}" for path "${record.path}". Only the last one will be available on "$route.params".`);
      existingKeys.add(key.name);
    }
  }
  const matcher = assign(parser, {
    record,
    parent,
    children: [],
    alias: []
  });
  if (parent) {
    if (!matcher.record.aliasOf === !parent.record.aliasOf) parent.children.push(matcher);
  }
  return matcher;
}
function createRouterMatcher(routes, globalOptions) {
  const matchers = [];
  const matcherMap = /* @__PURE__ */ new Map();
  globalOptions = mergeOptions(PATH_PARSER_OPTIONS_DEFAULTS, globalOptions);
  function getRecordMatcher(name) {
    return matcherMap.get(name);
  }
  function addRoute(record, parent, originalRecord) {
    const isRootAdd = !originalRecord;
    const mainNormalizedRecord = normalizeRouteRecord(record);
    if (true) checkChildMissingNameWithEmptyPath(mainNormalizedRecord, parent);
    mainNormalizedRecord.aliasOf = originalRecord && originalRecord.record;
    const options = mergeOptions(globalOptions, record);
    const normalizedRecords = [mainNormalizedRecord];
    if ("alias" in record) {
      const aliases = typeof record.alias === "string" ? [record.alias] : record.alias;
      for (const alias of aliases) normalizedRecords.push(normalizeRouteRecord(assign({}, mainNormalizedRecord, {
        components: originalRecord ? originalRecord.record.components : mainNormalizedRecord.components,
        path: alias,
        aliasOf: originalRecord ? originalRecord.record : mainNormalizedRecord
      })));
    }
    let matcher;
    let originalMatcher;
    for (const normalizedRecord of normalizedRecords) {
      const { path } = normalizedRecord;
      if (parent && path[0] !== "/") {
        const parentPath = parent.record.path;
        const connectingSlash = parentPath[parentPath.length - 1] === "/" ? "" : "/";
        normalizedRecord.path = parent.record.path + (path && connectingSlash + path);
      }
      if (normalizedRecord.path === "*") throw new Error('Catch all routes ("*") must now be defined using a param with a custom regexp.\nSee more at https://router.vuejs.org/guide/migration/#Removed-star-or-catch-all-routes.');
      matcher = createRouteRecordMatcher(normalizedRecord, parent, options);
      if (parent && path[0] === "/") checkMissingParamsInAbsolutePath(matcher, parent);
      if (originalRecord) {
        originalRecord.alias.push(matcher);
        if (true) checkSameParams(originalRecord, matcher);
      } else {
        originalMatcher = originalMatcher || matcher;
        if (originalMatcher !== matcher) originalMatcher.alias.push(matcher);
        if (isRootAdd && record.name && !isAliasRecord(matcher)) {
          if (true) checkSameNameAsAncestor(record, parent);
          removeRoute(record.name);
        }
      }
      if (isMatchable(matcher)) insertMatcher(matcher);
      if (mainNormalizedRecord.children) {
        const children = mainNormalizedRecord.children;
        for (let i = 0; i < children.length; i++) addRoute(children[i], matcher, originalRecord && originalRecord.children[i]);
      }
      originalRecord = originalRecord || matcher;
    }
    return originalMatcher ? () => {
      removeRoute(originalMatcher);
    } : noop;
  }
  function removeRoute(matcherRef) {
    if (isRouteName(matcherRef)) {
      const matcher = matcherMap.get(matcherRef);
      if (matcher) {
        matcherMap.delete(matcherRef);
        matchers.splice(matchers.indexOf(matcher), 1);
        matcher.children.forEach(removeRoute);
        matcher.alias.forEach(removeRoute);
      }
    } else {
      const index = matchers.indexOf(matcherRef);
      if (index > -1) {
        matchers.splice(index, 1);
        if (matcherRef.record.name) matcherMap.delete(matcherRef.record.name);
        matcherRef.children.forEach(removeRoute);
        matcherRef.alias.forEach(removeRoute);
      }
    }
  }
  function getRoutes2() {
    return matchers;
  }
  function insertMatcher(matcher) {
    const index = findInsertionIndex(matcher, matchers);
    matchers.splice(index, 0, matcher);
    if (matcher.record.name && !isAliasRecord(matcher)) matcherMap.set(matcher.record.name, matcher);
  }
  function resolve(location2, currentLocation) {
    let matcher;
    let params = {};
    let path;
    let name;
    if ("name" in location2 && location2.name) {
      matcher = matcherMap.get(location2.name);
      if (!matcher) throw createRouterError(ErrorTypes.MATCHER_NOT_FOUND, { location: location2 });
      if (true) {
        const invalidParams = Object.keys(location2.params || {}).filter((paramName) => !matcher.keys.find((k) => k.name === paramName));
        if (invalidParams.length) warn$1(`Discarded invalid param(s) "${invalidParams.join('", "')}" when navigating. See https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md#414-2022-08-22 for more details.`);
      }
      name = matcher.record.name;
      params = assign(pickParams(currentLocation.params, matcher.keys.filter((k) => !k.optional).concat(matcher.parent ? matcher.parent.keys.filter((k) => k.optional) : []).map((k) => k.name)), location2.params && pickParams(location2.params, matcher.keys.map((k) => k.name)));
      path = matcher.stringify(params);
    } else if (location2.path != null) {
      path = location2.path;
      if (!path.startsWith("/")) warn$1(`The Matcher cannot resolve relative paths but received "${path}". Unless you directly called \`matcher.resolve("${path}")\`, this is probably a bug in vue-router. Please open an issue at https://github.com/vuejs/router/issues/new/choose.`);
      matcher = matchers.find((m) => m.re.test(path));
      if (matcher) {
        params = matcher.parse(path);
        name = matcher.record.name;
      }
    } else {
      matcher = currentLocation.name ? matcherMap.get(currentLocation.name) : matchers.find((m) => m.re.test(currentLocation.path));
      if (!matcher) throw createRouterError(ErrorTypes.MATCHER_NOT_FOUND, {
        location: location2,
        currentLocation
      });
      name = matcher.record.name;
      params = assign({}, currentLocation.params, location2.params);
      path = matcher.stringify(params);
    }
    const matched = [];
    let parentMatcher = matcher;
    while (parentMatcher) {
      matched.unshift(parentMatcher.record);
      parentMatcher = parentMatcher.parent;
    }
    return {
      name,
      path,
      params,
      matched,
      meta: mergeMetaFields(matched)
    };
  }
  routes.forEach((route) => addRoute(route));
  function clearRoutes() {
    matchers.length = 0;
    matcherMap.clear();
  }
  return {
    addRoute,
    resolve,
    removeRoute,
    clearRoutes,
    getRoutes: getRoutes2,
    getRecordMatcher
  };
}
function pickParams(params, keys) {
  const newParams = {};
  for (const key of keys) if (key in params) newParams[key] = params[key];
  return newParams;
}
function normalizeRouteRecord(record) {
  const normalized = {
    path: record.path,
    redirect: record.redirect,
    name: record.name,
    meta: record.meta || {},
    aliasOf: record.aliasOf,
    beforeEnter: record.beforeEnter,
    props: normalizeRecordProps(record),
    children: record.children || [],
    instances: {},
    leaveGuards: /* @__PURE__ */ new Set(),
    updateGuards: /* @__PURE__ */ new Set(),
    enterCallbacks: {},
    components: "components" in record ? record.components || null : record.component && { default: record.component }
  };
  Object.defineProperty(normalized, "mods", { value: {} });
  return normalized;
}
function normalizeRecordProps(record) {
  const propsObject = {};
  const props = record.props || false;
  if ("component" in record) propsObject.default = props;
  else for (const name in record.components) propsObject[name] = typeof props === "object" ? props[name] : props;
  return propsObject;
}
function isAliasRecord(record) {
  while (record) {
    if (record.record.aliasOf) return true;
    record = record.parent;
  }
  return false;
}
function mergeMetaFields(matched) {
  return matched.reduce((meta, record) => assign(meta, record.meta), {});
}
function isSameParam(a, b) {
  return a.name === b.name && a.optional === b.optional && a.repeatable === b.repeatable;
}
function checkSameParams(a, b) {
  for (const key of a.keys) if (!key.optional && !b.keys.find(isSameParam.bind(null, key))) return warn$1(`Alias "${b.record.path}" and the original record: "${a.record.path}" must have the exact same param named "${key.name}"`);
  for (const key of b.keys) if (!key.optional && !a.keys.find(isSameParam.bind(null, key))) return warn$1(`Alias "${b.record.path}" and the original record: "${a.record.path}" must have the exact same param named "${key.name}"`);
}
function checkChildMissingNameWithEmptyPath(mainNormalizedRecord, parent) {
  if (parent && parent.record.name && !mainNormalizedRecord.name && !mainNormalizedRecord.path && mainNormalizedRecord.children.length === 0) warn$1(`The route named "${String(parent.record.name)}" has a child without a name, an empty path, and no children. This is probably a mistake: using that name won't render the empty path child so you probably want to move the name to the child instead. If this is intentional, add a name to the child route to silence the warning.`);
}
function checkSameNameAsAncestor(record, parent) {
  for (let ancestor = parent; ancestor; ancestor = ancestor.parent) if (ancestor.record.name === record.name) throw new Error(`A route named "${String(record.name)}" has been added as a ${parent === ancestor ? "child" : "descendant"} of a route with the same name. Route names must be unique and a nested route cannot use the same name as an ancestor.`);
}
function checkMissingParamsInAbsolutePath(record, parent) {
  for (const key of parent.keys) if (!record.keys.find(isSameParam.bind(null, key))) return warn$1(`Absolute path "${record.record.path}" must have the exact same param named "${key.name}" as its parent "${parent.record.path}".`);
}
function findInsertionIndex(matcher, matchers) {
  let lower = 0;
  let upper = matchers.length;
  while (lower !== upper) {
    const mid = lower + upper >> 1;
    if (comparePathParserScore(matcher, matchers[mid]) < 0) upper = mid;
    else lower = mid + 1;
  }
  const insertionAncestor = getInsertionAncestor(matcher);
  if (insertionAncestor) {
    upper = matchers.lastIndexOf(insertionAncestor, upper - 1);
    if (upper < 0) warn$1(`Finding ancestor route "${insertionAncestor.record.path}" failed for "${matcher.record.path}"`);
  }
  return upper;
}
function getInsertionAncestor(matcher) {
  let ancestor = matcher;
  while (ancestor = ancestor.parent) if (isMatchable(ancestor) && comparePathParserScore(matcher, ancestor) === 0) return ancestor;
}
function isMatchable({ record }) {
  return !!(record.name || record.components && Object.keys(record.components).length || record.redirect);
}
function useLink(props) {
  const router = inject(routerKey);
  const currentRoute = inject(routeLocationKey);
  let hasPrevious = false;
  let previousTo = null;
  const route = computed(() => {
    const to = unref(props.to);
    if (!hasPrevious || to !== previousTo) {
      if (!isRouteLocation(to)) if (hasPrevious) warn$1(`Invalid value for prop "to" in useLink()
- to:`, to, `
- previous to:`, previousTo, `
- props:`, props);
      else warn$1(`Invalid value for prop "to" in useLink()
- to:`, to, `
- props:`, props);
      previousTo = to;
      hasPrevious = true;
    }
    return router.resolve(to);
  });
  const activeRecordIndex = computed(() => {
    const { matched } = route.value;
    const { length } = matched;
    const routeMatched = matched[length - 1];
    const currentMatched = currentRoute.matched;
    if (!routeMatched || !currentMatched.length) return -1;
    const index = currentMatched.findIndex(isSameRouteRecord.bind(null, routeMatched));
    if (index > -1) return index;
    const parentRecordPath = getOriginalPath(matched[length - 2]);
    return length > 1 && getOriginalPath(routeMatched) === parentRecordPath && currentMatched[currentMatched.length - 1].path !== parentRecordPath ? currentMatched.findIndex(isSameRouteRecord.bind(null, matched[length - 2])) : index;
  });
  const isActive = computed(() => activeRecordIndex.value > -1 && includesParams(currentRoute.params, route.value.params));
  const isExactActive = computed(() => activeRecordIndex.value > -1 && activeRecordIndex.value === currentRoute.matched.length - 1 && isSameRouteLocationParams(currentRoute.params, route.value.params));
  function navigate(e = {}) {
    if (guardEvent(e)) {
      const p = router[unref(props.replace) ? "replace" : "push"](unref(props.to)).catch(noop);
      if (props.viewTransition && typeof document !== "undefined" && "startViewTransition" in document) document.startViewTransition(() => p);
      return p;
    }
    return Promise.resolve();
  }
  if (isBrowser) {
    const instance = getCurrentInstance();
    if (instance) {
      const linkContextDevtools = {
        route: route.value,
        isActive: isActive.value,
        isExactActive: isExactActive.value,
        error: null
      };
      instance.__vrl_devtools = instance.__vrl_devtools || [];
      instance.__vrl_devtools.push(linkContextDevtools);
      watchEffect(() => {
        linkContextDevtools.route = route.value;
        linkContextDevtools.isActive = isActive.value;
        linkContextDevtools.isExactActive = isExactActive.value;
        linkContextDevtools.error = isRouteLocation(unref(props.to)) ? null : 'Invalid "to" value';
      }, { flush: "post" });
    }
  }
  return {
    route,
    href: computed(() => route.value.href),
    isActive,
    isExactActive,
    navigate
  };
}
function preferSingleVNode(vnodes) {
  return vnodes.length === 1 ? vnodes[0] : vnodes;
}
var RouterLinkImpl = defineComponent({
  name: "RouterLink",
  compatConfig: { MODE: 3 },
  props: {
    to: {
      type: [String, Object],
      required: true
    },
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    custom: Boolean,
    ariaCurrentValue: {
      type: String,
      default: "page"
    },
    viewTransition: Boolean
  },
  useLink,
  setup(props, { slots }) {
    const link = reactive(useLink(props));
    const { options } = inject(routerKey);
    const elClass = computed(() => ({
      [getLinkClass(props.activeClass, options.linkActiveClass, "router-link-active")]: link.isActive,
      [getLinkClass(props.exactActiveClass, options.linkExactActiveClass, "router-link-exact-active")]: link.isExactActive
    }));
    return () => {
      const children = slots.default && preferSingleVNode(slots.default(link));
      return props.custom ? children : h("a", {
        "aria-current": link.isExactActive ? props.ariaCurrentValue : null,
        href: link.href,
        onClick: link.navigate,
        class: elClass.value
      }, children);
    };
  }
});
var RouterLink = RouterLinkImpl;
function guardEvent(e) {
  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) return;
  if (e.defaultPrevented) return;
  if (e.button !== void 0 && e.button !== 0) return;
  if (e.currentTarget && e.currentTarget.getAttribute) {
    const target2 = e.currentTarget.getAttribute("target");
    if (/\b_blank\b/i.test(target2)) return;
  }
  if (e.preventDefault) e.preventDefault();
  return true;
}
function includesParams(outer, inner) {
  for (const key in inner) {
    const innerValue = inner[key];
    const outerValue = outer[key];
    if (typeof innerValue === "string") {
      if (innerValue !== outerValue) return false;
    } else if (!isArray(outerValue) || outerValue.length !== innerValue.length || innerValue.some((value, i) => value.valueOf() !== outerValue[i].valueOf())) return false;
  }
  return true;
}
function getOriginalPath(record) {
  return record ? record.aliasOf ? record.aliasOf.path : record.path : "";
}
var getLinkClass = (propClass, globalClass, defaultClass) => propClass != null ? propClass : globalClass != null ? globalClass : defaultClass;
var RouterViewImpl = defineComponent({
  name: "RouterView",
  inheritAttrs: false,
  props: {
    name: {
      type: String,
      default: "default"
    },
    route: Object
  },
  compatConfig: { MODE: 3 },
  setup(props, { attrs, slots }) {
    warnDeprecatedUsage();
    const injectedRoute = inject(routerViewLocationKey);
    const routeToDisplay = computed(() => props.route || injectedRoute.value);
    const injectedDepth = inject(viewDepthKey, 0);
    const depth = computed(() => {
      let initialDepth = unref(injectedDepth);
      const { matched } = routeToDisplay.value;
      let matchedRoute;
      while ((matchedRoute = matched[initialDepth]) && !matchedRoute.components) initialDepth++;
      return initialDepth;
    });
    const matchedRouteRef = computed(() => routeToDisplay.value.matched[depth.value]);
    provide(viewDepthKey, computed(() => depth.value + 1));
    provide(matchedRouteKey, matchedRouteRef);
    provide(routerViewLocationKey, routeToDisplay);
    const viewRef = ref();
    watch(() => [
      viewRef.value,
      matchedRouteRef.value,
      props.name
    ], ([instance, to, name], [oldInstance, from, oldName]) => {
      if (to) {
        to.instances[name] = instance;
        if (from && from !== to && instance && instance === oldInstance) {
          if (!to.leaveGuards.size) to.leaveGuards = from.leaveGuards;
          if (!to.updateGuards.size) to.updateGuards = from.updateGuards;
        }
      }
      if (instance && to && (!from || !isSameRouteRecord(to, from) || !oldInstance)) (to.enterCallbacks[name] || []).forEach((callback) => callback(instance));
    }, { flush: "post" });
    return () => {
      const route = routeToDisplay.value;
      const currentName = props.name;
      const matchedRoute = matchedRouteRef.value;
      const ViewComponent = matchedRoute && matchedRoute.components[currentName];
      if (!ViewComponent) return normalizeSlot(slots.default, {
        Component: ViewComponent,
        route
      });
      const routePropsOption = matchedRoute.props[currentName];
      const routeProps = routePropsOption ? routePropsOption === true ? route.params : typeof routePropsOption === "function" ? routePropsOption(route) : routePropsOption : null;
      const onVnodeUnmounted = (vnode) => {
        if (vnode.component.isUnmounted) matchedRoute.instances[currentName] = null;
      };
      const component = h(ViewComponent, assign({}, routeProps, attrs, {
        onVnodeUnmounted,
        ref: viewRef
      }));
      if (isBrowser && component.ref) {
        const info = {
          depth: depth.value,
          name: matchedRoute.name,
          path: matchedRoute.path,
          meta: matchedRoute.meta
        };
        (isArray(component.ref) ? component.ref.map((r) => r.i) : [component.ref.i]).forEach((instance) => {
          instance.__vrv_devtools = info;
        });
      }
      return normalizeSlot(slots.default, {
        Component: component,
        route
      }) || component;
    };
  }
});
function normalizeSlot(slot, data) {
  if (!slot) return null;
  const slotContent = slot(data);
  return slotContent.length === 1 ? slotContent[0] : slotContent;
}
var RouterView = RouterViewImpl;
function warnDeprecatedUsage() {
  const instance = getCurrentInstance();
  const parentName = instance.parent && instance.parent.type.name;
  const parentSubTreeType = instance.parent && instance.parent.subTree && instance.parent.subTree.type;
  if (parentName && (parentName === "KeepAlive" || parentName.includes("Transition")) && typeof parentSubTreeType === "object" && parentSubTreeType.name === "RouterView") {
    const comp = parentName === "KeepAlive" ? "keep-alive" : "transition";
    warn$1(`<router-view> can no longer be used directly inside <transition> or <keep-alive>.
Use slot props instead:

<router-view v-slot="{ Component }">
  <${comp}>
    <component :is="Component" />
  </${comp}>
</router-view>`);
  }
}
function createRouter(options) {
  const matcher = createRouterMatcher(options.routes, options);
  const parseQuery$1 = options.parseQuery || parseQuery;
  const stringifyQuery$1 = options.stringifyQuery || stringifyQuery;
  const routerHistory = options.history;
  if (!routerHistory) throw new Error('Provide the "history" option when calling "createRouter()": https://router.vuejs.org/api/interfaces/RouterOptions.html#history');
  const beforeGuards = useCallbacks();
  const beforeResolveGuards = useCallbacks();
  const afterGuards = useCallbacks();
  const currentRoute = shallowRef(START_LOCATION_NORMALIZED);
  let pendingLocation = START_LOCATION_NORMALIZED;
  if (isBrowser && options.scrollBehavior && "scrollRestoration" in history) history.scrollRestoration = "manual";
  const normalizeParams = applyToParams.bind(null, (paramValue) => "" + paramValue);
  const encodeParams = applyToParams.bind(null, encodeParam);
  const decodeParams = applyToParams.bind(null, decode);
  function addRoute(parentOrRoute, route) {
    let parent;
    let record;
    if (isRouteName(parentOrRoute)) {
      parent = matcher.getRecordMatcher(parentOrRoute);
      if (!parent) warn$1(`Parent route "${String(parentOrRoute)}" not found when adding child route`, route);
      record = route;
    } else record = parentOrRoute;
    return matcher.addRoute(record, parent);
  }
  function removeRoute(name) {
    const recordMatcher = matcher.getRecordMatcher(name);
    if (recordMatcher) matcher.removeRoute(recordMatcher);
    else if (true) warn$1(`Cannot remove non-existent route "${String(name)}"`);
  }
  function getRoutes2() {
    return matcher.getRoutes().map((routeMatcher) => routeMatcher.record);
  }
  function hasRoute(name) {
    return !!matcher.getRecordMatcher(name);
  }
  function resolve(rawLocation, currentLocation) {
    currentLocation = assign({}, currentLocation || currentRoute.value);
    if (typeof rawLocation === "string") {
      const locationNormalized = parseURL(parseQuery$1, rawLocation, currentLocation.path);
      const matchedRoute2 = matcher.resolve({ path: locationNormalized.path }, currentLocation);
      const href2 = routerHistory.createHref(locationNormalized.fullPath);
      if (true) {
        if (href2.startsWith("//")) warn$1(`Location "${rawLocation}" resolved to "${href2}". A resolved location cannot start with multiple slashes.`);
        else if (!matchedRoute2.matched.length) warn$1(`No match found for location with path "${rawLocation}"`);
      }
      return assign(locationNormalized, matchedRoute2, {
        params: decodeParams(matchedRoute2.params),
        hash: decode(locationNormalized.hash),
        redirectedFrom: void 0,
        href: href2
      });
    }
    if (!isRouteLocation(rawLocation)) {
      warn$1(`router.resolve() was passed an invalid location. This will fail in production.
- Location:`, rawLocation);
      return resolve({});
    }
    let matcherLocation;
    if (rawLocation.path != null) {
      if ("params" in rawLocation && !("name" in rawLocation) && Object.keys(rawLocation.params).length) warn$1(`Path "${rawLocation.path}" was passed with params but they will be ignored. Use a named route alongside params instead.`);
      matcherLocation = assign({}, rawLocation, { path: parseURL(parseQuery$1, rawLocation.path, currentLocation.path).path });
    } else {
      const targetParams = assign({}, rawLocation.params);
      for (const key in targetParams) if (targetParams[key] == null) delete targetParams[key];
      matcherLocation = assign({}, rawLocation, { params: encodeParams(targetParams) });
      currentLocation.params = encodeParams(currentLocation.params);
    }
    const matchedRoute = matcher.resolve(matcherLocation, currentLocation);
    const hash = rawLocation.hash || "";
    if (hash && !hash.startsWith("#")) warn$1(`A \`hash\` should always start with the character "#". Replace "${hash}" with "#${hash}".`);
    matchedRoute.params = normalizeParams(decodeParams(matchedRoute.params));
    const fullPath = stringifyURL(stringifyQuery$1, assign({}, rawLocation, {
      hash: encodeHash(hash),
      path: matchedRoute.path
    }));
    const href = routerHistory.createHref(fullPath);
    if (true) {
      if (href.startsWith("//")) warn$1(`Location "${rawLocation}" resolved to "${href}". A resolved location cannot start with multiple slashes.`);
      else if (!matchedRoute.matched.length) warn$1(`No match found for location with path "${rawLocation.path != null ? rawLocation.path : rawLocation}"`);
    }
    return assign({
      fullPath,
      hash,
      query: stringifyQuery$1 === stringifyQuery ? normalizeQuery(rawLocation.query) : rawLocation.query || {}
    }, matchedRoute, {
      redirectedFrom: void 0,
      href
    });
  }
  function locationAsObject(to) {
    return typeof to === "string" ? parseURL(parseQuery$1, to, currentRoute.value.path) : assign({}, to);
  }
  function checkCanceledNavigation(to, from) {
    if (pendingLocation !== to) return createRouterError(ErrorTypes.NAVIGATION_CANCELLED, {
      from,
      to
    });
  }
  function push(to) {
    return pushWithRedirect(to);
  }
  function replace(to) {
    return push(assign(locationAsObject(to), { replace: true }));
  }
  function handleRedirectRecord(to, from) {
    const lastMatched = to.matched[to.matched.length - 1];
    if (lastMatched && lastMatched.redirect) {
      const { redirect } = lastMatched;
      let newTargetLocation = typeof redirect === "function" ? redirect(to, from) : redirect;
      if (typeof newTargetLocation === "string") {
        newTargetLocation = newTargetLocation.includes("?") || newTargetLocation.includes("#") ? newTargetLocation = locationAsObject(newTargetLocation) : { path: newTargetLocation };
        newTargetLocation.params = {};
      }
      if (newTargetLocation.path == null && !("name" in newTargetLocation)) {
        warn$1(`Invalid redirect found:
${JSON.stringify(newTargetLocation, null, 2)}
 when navigating to "${to.fullPath}". A redirect must contain a name or path. This will break in production.`);
        throw new Error("Invalid redirect");
      }
      return assign({
        query: to.query,
        hash: to.hash,
        params: newTargetLocation.path != null ? {} : to.params
      }, newTargetLocation);
    }
  }
  function pushWithRedirect(to, redirectedFrom) {
    const targetLocation = pendingLocation = resolve(to);
    const from = currentRoute.value;
    const data = to.state;
    const force = to.force;
    const replace2 = to.replace === true;
    const shouldRedirect = handleRedirectRecord(targetLocation, from);
    if (shouldRedirect) return pushWithRedirect(assign(locationAsObject(shouldRedirect), {
      state: typeof shouldRedirect === "object" ? assign({}, data, shouldRedirect.state) : data,
      force,
      replace: replace2
    }), redirectedFrom || targetLocation);
    const toLocation = targetLocation;
    toLocation.redirectedFrom = redirectedFrom;
    let failure;
    if (!force && isSameRouteLocation(stringifyQuery$1, from, targetLocation)) {
      failure = createRouterError(ErrorTypes.NAVIGATION_DUPLICATED, {
        to: toLocation,
        from
      });
      handleScroll(from, from, true, false);
    }
    return (failure ? Promise.resolve(failure) : navigate(toLocation, from)).catch((error) => isNavigationFailure(error) ? isNavigationFailure(error, ErrorTypes.NAVIGATION_GUARD_REDIRECT) ? error : markAsReady(error) : triggerError(error, toLocation, from)).then((failure2) => {
      if (failure2) {
        if (isNavigationFailure(failure2, ErrorTypes.NAVIGATION_GUARD_REDIRECT)) {
          if (isSameRouteLocation(stringifyQuery$1, resolve(failure2.to), toLocation) && redirectedFrom && (redirectedFrom._count = redirectedFrom._count ? redirectedFrom._count + 1 : 1) > 30) {
            warn$1(`Detected a possibly infinite redirection in a navigation guard when going from "${from.fullPath}" to "${toLocation.fullPath}". Aborting to avoid a Stack Overflow.
 Are you always returning a new location within a navigation guard? That would lead to this error. Only return when redirecting or aborting, that should fix this. This might break in production if not fixed.`);
            return Promise.reject(new Error("Infinite redirect in navigation guard"));
          }
          return pushWithRedirect(assign({ replace: replace2 }, locationAsObject(failure2.to), {
            state: typeof failure2.to === "object" ? assign({}, data, failure2.to.state) : data,
            force
          }), redirectedFrom || toLocation);
        }
      } else failure2 = finalizeNavigation(toLocation, from, true, replace2, data);
      triggerAfterEach(toLocation, from, failure2);
      return failure2;
    });
  }
  function checkCanceledNavigationAndReject(to, from) {
    const error = checkCanceledNavigation(to, from);
    return error ? Promise.reject(error) : Promise.resolve();
  }
  function runWithContext(fn) {
    const app = installedApps.values().next().value;
    return app && typeof app.runWithContext === "function" ? app.runWithContext(fn) : fn();
  }
  function navigate(to, from) {
    let guards;
    const [leavingRecords, updatingRecords, enteringRecords] = extractChangingRecords(to, from);
    guards = extractComponentsGuards(leavingRecords.reverse(), "beforeRouteLeave", to, from);
    for (const record of leavingRecords) record.leaveGuards.forEach((guard) => {
      guards.push(guardToPromiseFn(guard, to, from));
    });
    const canceledNavigationCheck = checkCanceledNavigationAndReject.bind(null, to, from);
    guards.push(canceledNavigationCheck);
    return runGuardQueue(guards).then(() => {
      guards = [];
      for (const guard of beforeGuards.list()) guards.push(guardToPromiseFn(guard, to, from));
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      guards = extractComponentsGuards(updatingRecords, "beforeRouteUpdate", to, from);
      for (const record of updatingRecords) record.updateGuards.forEach((guard) => {
        guards.push(guardToPromiseFn(guard, to, from));
      });
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      guards = [];
      for (const record of enteringRecords) if (record.beforeEnter) if (isArray(record.beforeEnter)) for (const beforeEnter of record.beforeEnter) guards.push(guardToPromiseFn(beforeEnter, to, from));
      else guards.push(guardToPromiseFn(record.beforeEnter, to, from));
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      to.matched.forEach((record) => record.enterCallbacks = {});
      guards = extractComponentsGuards(enteringRecords, "beforeRouteEnter", to, from, runWithContext);
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      guards = [];
      for (const guard of beforeResolveGuards.list()) guards.push(guardToPromiseFn(guard, to, from));
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).catch((err) => isNavigationFailure(err, ErrorTypes.NAVIGATION_CANCELLED) ? err : Promise.reject(err));
  }
  function triggerAfterEach(to, from, failure) {
    afterGuards.list().forEach((guard) => runWithContext(() => guard(to, from, failure)));
  }
  function finalizeNavigation(toLocation, from, isPush, replace2, data) {
    const error = checkCanceledNavigation(toLocation, from);
    if (error) return error;
    const isFirstNavigation = from === START_LOCATION_NORMALIZED;
    const state = !isBrowser ? {} : history.state;
    if (isPush) if (replace2 || isFirstNavigation) routerHistory.replace(toLocation.fullPath, assign({ scroll: isFirstNavigation && state && state.scroll }, data));
    else routerHistory.push(toLocation.fullPath, data);
    currentRoute.value = toLocation;
    handleScroll(toLocation, from, isPush, isFirstNavigation);
    markAsReady();
  }
  let removeHistoryListener;
  function setupListeners() {
    if (removeHistoryListener) return;
    removeHistoryListener = routerHistory.listen((to, _from, info) => {
      if (!router.listening) return;
      const toLocation = resolve(to);
      const shouldRedirect = handleRedirectRecord(toLocation, router.currentRoute.value);
      if (shouldRedirect) {
        pushWithRedirect(assign(shouldRedirect, {
          replace: true,
          force: true
        }), toLocation).catch(noop);
        return;
      }
      pendingLocation = toLocation;
      const from = currentRoute.value;
      if (isBrowser) saveScrollPosition(getScrollKey(from.fullPath, info.delta), computeScrollPosition());
      navigate(toLocation, from).catch((error) => {
        if (isNavigationFailure(error, ErrorTypes.NAVIGATION_ABORTED | ErrorTypes.NAVIGATION_CANCELLED)) return error;
        if (isNavigationFailure(error, ErrorTypes.NAVIGATION_GUARD_REDIRECT)) {
          pushWithRedirect(assign(locationAsObject(error.to), { force: true }), toLocation).then((failure) => {
            if (isNavigationFailure(failure, ErrorTypes.NAVIGATION_ABORTED | ErrorTypes.NAVIGATION_DUPLICATED) && !info.delta && info.type === NavigationType.pop) routerHistory.go(-1, false);
          }).catch(noop);
          return Promise.reject();
        }
        if (info.delta) routerHistory.go(-info.delta, false);
        return triggerError(error, toLocation, from);
      }).then((failure) => {
        failure = failure || finalizeNavigation(toLocation, from, false);
        if (failure) {
          if (info.delta && !isNavigationFailure(failure, ErrorTypes.NAVIGATION_CANCELLED)) routerHistory.go(-info.delta, false);
          else if (info.type === NavigationType.pop && isNavigationFailure(failure, ErrorTypes.NAVIGATION_ABORTED | ErrorTypes.NAVIGATION_DUPLICATED)) routerHistory.go(-1, false);
        }
        triggerAfterEach(toLocation, from, failure);
      }).catch(noop);
    });
  }
  let readyHandlers = useCallbacks();
  let errorListeners = useCallbacks();
  let ready;
  function triggerError(error, to, from) {
    markAsReady(error);
    const list = errorListeners.list();
    if (list.length) list.forEach((handler) => handler(error, to, from));
    else {
      if (true) warn$1("uncaught error during route navigation:");
      console.error(error);
    }
    return Promise.reject(error);
  }
  function isReady() {
    if (ready && currentRoute.value !== START_LOCATION_NORMALIZED) return Promise.resolve();
    return new Promise((resolve2, reject) => {
      readyHandlers.add([resolve2, reject]);
    });
  }
  function markAsReady(err) {
    if (!ready) {
      ready = !err;
      setupListeners();
      readyHandlers.list().forEach(([resolve2, reject]) => err ? reject(err) : resolve2());
      readyHandlers.reset();
    }
    return err;
  }
  function handleScroll(to, from, isPush, isFirstNavigation) {
    const { scrollBehavior } = options;
    if (!isBrowser || !scrollBehavior) return Promise.resolve();
    const scrollPosition = !isPush && getSavedScrollPosition(getScrollKey(to.fullPath, 0)) || (isFirstNavigation || !isPush) && history.state && history.state.scroll || null;
    return nextTick().then(() => scrollBehavior(to, from, scrollPosition)).then((position) => position && scrollToPosition(position)).catch((err) => triggerError(err, to, from));
  }
  const go = (delta) => routerHistory.go(delta);
  let started;
  const installedApps = /* @__PURE__ */ new Set();
  const router = {
    currentRoute,
    listening: true,
    addRoute,
    removeRoute,
    clearRoutes: matcher.clearRoutes,
    hasRoute,
    getRoutes: getRoutes2,
    resolve,
    options,
    push,
    replace,
    go,
    back: () => go(-1),
    forward: () => go(1),
    beforeEach: beforeGuards.add,
    beforeResolve: beforeResolveGuards.add,
    afterEach: afterGuards.add,
    onError: errorListeners.add,
    isReady,
    install(app) {
      app.component("RouterLink", RouterLink);
      app.component("RouterView", RouterView);
      app.config.globalProperties.$router = router;
      Object.defineProperty(app.config.globalProperties, "$route", {
        enumerable: true,
        get: () => unref(currentRoute)
      });
      if (isBrowser && !started && currentRoute.value === START_LOCATION_NORMALIZED) {
        started = true;
        push(routerHistory.location).catch((err) => {
          if (true) warn$1("Unexpected error when starting the router:", err);
        });
      }
      const reactiveRoute = {};
      for (const key in START_LOCATION_NORMALIZED) Object.defineProperty(reactiveRoute, key, {
        get: () => currentRoute.value[key],
        enumerable: true
      });
      app.provide(routerKey, router);
      app.provide(routeLocationKey, shallowReactive(reactiveRoute));
      app.provide(routerViewLocationKey, currentRoute);
      const unmountApp = app.unmount;
      installedApps.add(app);
      app.unmount = function() {
        installedApps.delete(app);
        if (installedApps.size < 1) {
          pendingLocation = START_LOCATION_NORMALIZED;
          removeHistoryListener && removeHistoryListener();
          removeHistoryListener = null;
          currentRoute.value = START_LOCATION_NORMALIZED;
          started = false;
          ready = false;
        }
        unmountApp();
      };
      if (isBrowser && true) addDevtools(app, router, matcher);
    }
  };
  function runGuardQueue(guards) {
    return guards.reduce((promise, guard) => promise.then(() => runWithContext(guard)), Promise.resolve());
  }
  return router;
}
export {
  NavigationFailureType,
  RouterLink,
  RouterView,
  START_LOCATION_NORMALIZED as START_LOCATION,
  createMemoryHistory,
  createRouter,
  createRouterMatcher,
  createWebHashHistory,
  createWebHistory,
  isNavigationFailure,
  loadRouteLocation,
  matchedRouteKey,
  onBeforeRouteLeave,
  onBeforeRouteUpdate,
  parseQuery,
  routeLocationKey,
  routerKey,
  routerViewLocationKey,
  stringifyQuery,
  useLink,
  useRoute,
  useRouter,
  viewDepthKey
};
//# sourceMappingURL=vue-router.js.map
