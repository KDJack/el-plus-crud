import { defineComponent as fe, inject as Ge, ref as h, onBeforeMount as Oe, useAttrs as we, onMounted as cn, resolveComponent as F, openBlock as _, createBlock as R, mergeProps as le, toHandlers as Te, createCommentVNode as ae, useSlots as mn, createSlots as an, withCtx as Q, renderSlot as Xe, renderList as ve, computed as Ie, watch as He, createVNode as se, createTextVNode as be, toDisplayString as xe, createElementBlock as P, normalizeStyle as Dt, Fragment as me, createElementVNode as Ye, reactive as rt, normalizeClass as bn, unref as yt, pushScopeId as hi, popScopeId as Yi, nextTick as Xt, withModifiers as ej, resolveDynamicComponent as Ii, normalizeProps as tj, resolveDirective as nj, isRef as lj, withDirectives as rj } from "vue";
import { ElMessageBox as uj, ElMessage as Wn } from "element-plus";
const Se = async (f, s) => {
  var o, D, j, m;
  const r = Object.assign({}, s, (o = f.desc) == null ? void 0 : o._attrs, (D = f.desc) == null ? void 0 : D.attrs, oj(f.desc));
  return f.desc.multiple && (r.multiple = !0, r.showCheckbox = !0, ["select"].indexOf(f.desc.type) >= 0 && (r.collapseTags = ((j = f.desc.attrs) == null ? void 0 : j.collapseTags) ?? !1, r.collapseTagsTooltip = ((m = f.desc.attrs) == null ? void 0 : m.collapseTagsTooltip) ?? !1)), f.desc.elType && (typeof f.desc.elType == "function" ? r.type = f.desc.elType(f.formData) : r.type = f.desc.elType), r;
}, ke = (f) => {
  var r;
  const s = {};
  return (r = f.desc) != null && r.on && Object.keys(f.desc.on).map((o) => {
    s[o] = (D) => {
      f.desc.on[o](f.formData, f.rowIndex, D);
    };
  }), s;
};
function oj(f) {
  if (!f || !f.type)
    return "";
  switch (f.type) {
    case "input":
    case "nbinput":
    case "password":
    case "number":
    case "validCode":
    case "tag":
      return { placeholder: (f == null ? void 0 : f.placeholder) || "请输入" + (f == null ? void 0 : f._label) };
    case "switch":
      return {};
    case "area":
    case "select":
    case "category":
    case "cascader":
      return { placeholder: (f == null ? void 0 : f.placeholder) || "请选择" + (f.remote ? f.initLoad !== !1 ? "（默认查10个，其余请输入搜索）" : "或输入进行搜索" : f == null ? void 0 : f._label) };
    case "data":
    case "datetime":
    case "datas":
      return { placeholder: "选择日期" };
    case "daterange":
    case "datetimerange":
    case "timerange":
    case "monthrange":
      return {
        startPlaceholder: "开始日期",
        endPlaceholder: "结束日期"
      };
    case "dates":
      return { placeholder: "选择一个或多个日期" };
    case "month":
      return { placeholder: "选择月" };
    case "time":
    case "timsPicker":
      return { placeholder: "请选择时间" };
    case "week":
      return { placeholder: "请选择周" };
    case "year":
      return { placeholder: "请选择年" };
    case "upimg":
      return { placeholder: "请上传" };
    case "upfile":
      return { placeholder: "点击上传" };
  }
}
const sj = {
  name: "ElPlusFormArea",
  inheritAttrs: !1,
  typeName: "area",
  customOptions: {}
}, ij = /* @__PURE__ */ fe({
  ...sj,
  props: {
    modelValue: {},
    field: {},
    desc: {},
    formData: {}
  },
  emits: ["update:modelValue"],
  setup(f, { emit: s }) {
    const r = f, o = Ge("globalData"), D = h([]), j = h({}), m = h(!1), N = h(ke(r)), d = h(r.modelValue);
    return s("update:modelValue", d), Oe(async () => {
      j.value = await Se(r, { props: { value: "id", label: "name", children: "childs", checkStrictly: !!r.desc.checkStrictly }, clearable: !0, filterable: !0, ...we() }), m.value = !0;
    }), cn(async () => {
      D.value = o.areaList || [];
    }), (M, z) => {
      const I = F("el-cascader");
      return m.value ? (_(), R(I, le({
        key: 0,
        class: "ElPlusFormArea-panel"
      }, j.value, Te(N.value), {
        modelValue: d.value,
        "onUpdate:modelValue": z[0] || (z[0] = (O) => d.value = O),
        options: D.value
      }), null, 16, ["modelValue", "options"])) : ae("", !0);
    };
  }
});
const Ke = (f, s) => {
  const r = f.__vccOpts || f;
  for (const [o, D] of s)
    r[o] = D;
  return r;
}, vi = /* @__PURE__ */ Ke(ij, [["__scopeId", "data-v-2f7bbae6"]]), aj = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: vi }, Symbol.toStringTag, { value: "Module" })), cj = {
  name: "ElPlusFormAutocomplete",
  inheritAttrs: !1,
  typeName: "autocomplete",
  customOptions: {}
}, Mj = /* @__PURE__ */ fe({
  ...cj,
  props: {
    modelValue: {},
    field: {},
    desc: {},
    formData: {}
  },
  emits: ["update:modelValue"],
  setup(f, { emit: s }) {
    const r = f, o = h(r.modelValue);
    s("update:modelValue", o);
    const D = h(Object.assign({}, mn(), r.desc.slots)), j = h({}), m = h(ke(r));
    return Oe(async () => {
      j.value = await Se(r, { autocomplete: "new-password", ...we() });
    }), (N, d) => {
      const M = F("el-autocomplete");
      return _(), R(M, le({ class: "ElPlusFormAutocomplete-panel" }, j.value, Te(m.value), {
        modelValue: o.value,
        "onUpdate:modelValue": d[0] || (d[0] = (z) => o.value = z)
      }), an({
        default: Q((z) => [
          Xe(N.$slots, "default", { data: z }, void 0, !0)
        ]),
        _: 2
      }, [
        ve(D.value, (z, I, O) => ({
          name: I,
          fn: Q((C) => [
            Xe(N.$slots, I, { data: C }, void 0, !0)
          ])
        }))
      ]), 1040, ["modelValue"]);
    };
  }
});
const wi = /* @__PURE__ */ Ke(Mj, [["__scopeId", "data-v-9a2a6259"]]), fj = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: wi }, Symbol.toStringTag, { value: "Module" }));
var Il = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, jr = { exports: {} };
/**
* @license
* Lodash <https://lodash.com/>
* Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
* Released under MIT license <https://lodash.com/license>
* Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
* Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
*/
jr.exports;
(function(f, s) {
  (function() {
    var r, o = "4.17.21", D = 200, j = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", m = "Expected a function", N = "Invalid `variable` option passed into `_.template`", d = "__lodash_hash_undefined__", M = 500, z = "__lodash_placeholder__", I = 1, O = 2, C = 4, L = 1, U = 2, B = 1, q = 2, oe = 4, ee = 8, ce = 16, A = 32, k = 64, V = 128, ge = 256, Ue = 512, qe = 30, mt = "...", Lt = 800, en = 16, tn = 1, at = 2, v = 3, x = 1 / 0, $ = 9007199254740991, de = 17976931348623157e292, Be = 0 / 0, Re = 4294967295, W = Re - 1, X = Re >>> 1, Z = [
      ["ary", V],
      ["bind", B],
      ["bindKey", q],
      ["curry", ee],
      ["curryRight", ce],
      ["flip", Ue],
      ["partial", A],
      ["partialRight", k],
      ["rearg", ge]
    ], pe = "[object Arguments]", Ee = "[object Array]", gt = "[object AsyncFunction]", dt = "[object Boolean]", Gt = "[object Date]", Gn = "[object DOMException]", Zt = "[object Error]", Mn = "[object Function]", On = "[object GeneratorFunction]", Nt = "[object Map]", nn = "[object Number]", w = "[object Null]", H = "[object Object]", te = "[object Promise]", et = "[object Proxy]", ut = "[object RegExp]", Ve = "[object Set]", ct = "[object String]", Bt = "[object Symbol]", hn = "[object Undefined]", Ht = "[object WeakMap]", Zn = "[object WeakSet]", ln = "[object ArrayBuffer]", ze = "[object DataView]", tt = "[object Float32Array]", pt = "[object Float64Array]", Qe = "[object Int8Array]", rn = "[object Int16Array]", Yn = "[object Int32Array]", al = "[object Uint8Array]", zr = "[object Uint8ClampedArray]", yr = "[object Uint16Array]", Dr = "[object Uint32Array]", Da = /\b__p \+= '';/g, _a = /\b(__p \+=) '' \+/g, ma = /(__e\(.*?\)|\b__t\)) \+\n'';/g, ku = /&(?:amp|lt|gt|quot|#39);/g, Uu = /[&<>"']/g, ha = RegExp(ku.source), Ya = RegExp(Uu.source), Ia = /<%-([\s\S]+?)%>/g, va = /<%([\s\S]+?)%>/g, Qu = /<%=([\s\S]+?)%>/g, wa = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Aa = /^\w*$/, Ta = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, _r = /[\\^$.*+?()[\]{}|]/g, La = RegExp(_r.source), mr = /^\s+/, xa = /\s/, Ea = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, Ca = /\{\n\/\* \[wrapped with (.+)\] \*/, ba = /,? & /, Oa = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, Sa = /[()=,{}\[\]\/\s]/, Ba = /\\(\\)?/g, ka = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, Pu = /\w*$/, Ua = /^[-+]0x[0-9a-f]+$/i, Qa = /^0b[01]+$/i, Pa = /^\[object .+?Constructor\]$/, Va = /^0o[0-7]+$/i, Fa = /^(?:0|[1-9]\d*)$/, Ra = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, Tl = /($^)/, Wa = /['\n\r\u2028\u2029\\]/g, Ll = "\\ud800-\\udfff", Ga = "\\u0300-\\u036f", Za = "\\ufe20-\\ufe2f", Ha = "\\u20d0-\\u20ff", Vu = Ga + Za + Ha, Fu = "\\u2700-\\u27bf", Ru = "a-z\\xdf-\\xf6\\xf8-\\xff", Ka = "\\xac\\xb1\\xd7\\xf7", qa = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", $a = "\\u2000-\\u206f", Ja = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", Wu = "A-Z\\xc0-\\xd6\\xd8-\\xde", Gu = "\\ufe0e\\ufe0f", Zu = Ka + qa + $a + Ja, hr = "['’]", Xa = "[" + Ll + "]", Hu = "[" + Zu + "]", xl = "[" + Vu + "]", Ku = "\\d+", ec = "[" + Fu + "]", qu = "[" + Ru + "]", $u = "[^" + Ll + Zu + Ku + Fu + Ru + Wu + "]", Yr = "\\ud83c[\\udffb-\\udfff]", tc = "(?:" + xl + "|" + Yr + ")", Ju = "[^" + Ll + "]", Ir = "(?:\\ud83c[\\udde6-\\uddff]){2}", vr = "[\\ud800-\\udbff][\\udc00-\\udfff]", Hn = "[" + Wu + "]", Xu = "\\u200d", eo = "(?:" + qu + "|" + $u + ")", nc = "(?:" + Hn + "|" + $u + ")", to = "(?:" + hr + "(?:d|ll|m|re|s|t|ve))?", no = "(?:" + hr + "(?:D|LL|M|RE|S|T|VE))?", lo = tc + "?", ro = "[" + Gu + "]?", lc = "(?:" + Xu + "(?:" + [Ju, Ir, vr].join("|") + ")" + ro + lo + ")*", rc = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", uc = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", uo = ro + lo + lc, oc = "(?:" + [ec, Ir, vr].join("|") + ")" + uo, sc = "(?:" + [Ju + xl + "?", xl, Ir, vr, Xa].join("|") + ")", ic = RegExp(hr, "g"), ac = RegExp(xl, "g"), wr = RegExp(Yr + "(?=" + Yr + ")|" + sc + uo, "g"), cc = RegExp([
      Hn + "?" + qu + "+" + to + "(?=" + [Hu, Hn, "$"].join("|") + ")",
      nc + "+" + no + "(?=" + [Hu, Hn + eo, "$"].join("|") + ")",
      Hn + "?" + eo + "+" + to,
      Hn + "+" + no,
      uc,
      rc,
      Ku,
      oc
    ].join("|"), "g"), Mc = RegExp("[" + Xu + Ll + Vu + Gu + "]"), fc = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, gc = [
      "Array",
      "Buffer",
      "DataView",
      "Date",
      "Error",
      "Float32Array",
      "Float64Array",
      "Function",
      "Int8Array",
      "Int16Array",
      "Int32Array",
      "Map",
      "Math",
      "Object",
      "Promise",
      "RegExp",
      "Set",
      "String",
      "Symbol",
      "TypeError",
      "Uint8Array",
      "Uint8ClampedArray",
      "Uint16Array",
      "Uint32Array",
      "WeakMap",
      "_",
      "clearTimeout",
      "isFinite",
      "parseInt",
      "setTimeout"
    ], dc = -1, We = {};
    We[tt] = We[pt] = We[Qe] = We[rn] = We[Yn] = We[al] = We[zr] = We[yr] = We[Dr] = !0, We[pe] = We[Ee] = We[ln] = We[dt] = We[ze] = We[Gt] = We[Zt] = We[Mn] = We[Nt] = We[nn] = We[H] = We[ut] = We[Ve] = We[ct] = We[Ht] = !1;
    var Fe = {};
    Fe[pe] = Fe[Ee] = Fe[ln] = Fe[ze] = Fe[dt] = Fe[Gt] = Fe[tt] = Fe[pt] = Fe[Qe] = Fe[rn] = Fe[Yn] = Fe[Nt] = Fe[nn] = Fe[H] = Fe[ut] = Fe[Ve] = Fe[ct] = Fe[Bt] = Fe[al] = Fe[zr] = Fe[yr] = Fe[Dr] = !0, Fe[Zt] = Fe[Mn] = Fe[Ht] = !1;
    var Nc = {
      // Latin-1 Supplement block.
      À: "A",
      Á: "A",
      Â: "A",
      Ã: "A",
      Ä: "A",
      Å: "A",
      à: "a",
      á: "a",
      â: "a",
      ã: "a",
      ä: "a",
      å: "a",
      Ç: "C",
      ç: "c",
      Ð: "D",
      ð: "d",
      È: "E",
      É: "E",
      Ê: "E",
      Ë: "E",
      è: "e",
      é: "e",
      ê: "e",
      ë: "e",
      Ì: "I",
      Í: "I",
      Î: "I",
      Ï: "I",
      ì: "i",
      í: "i",
      î: "i",
      ï: "i",
      Ñ: "N",
      ñ: "n",
      Ò: "O",
      Ó: "O",
      Ô: "O",
      Õ: "O",
      Ö: "O",
      Ø: "O",
      ò: "o",
      ó: "o",
      ô: "o",
      õ: "o",
      ö: "o",
      ø: "o",
      Ù: "U",
      Ú: "U",
      Û: "U",
      Ü: "U",
      ù: "u",
      ú: "u",
      û: "u",
      ü: "u",
      Ý: "Y",
      ý: "y",
      ÿ: "y",
      Æ: "Ae",
      æ: "ae",
      Þ: "Th",
      þ: "th",
      ß: "ss",
      // Latin Extended-A block.
      Ā: "A",
      Ă: "A",
      Ą: "A",
      ā: "a",
      ă: "a",
      ą: "a",
      Ć: "C",
      Ĉ: "C",
      Ċ: "C",
      Č: "C",
      ć: "c",
      ĉ: "c",
      ċ: "c",
      č: "c",
      Ď: "D",
      Đ: "D",
      ď: "d",
      đ: "d",
      Ē: "E",
      Ĕ: "E",
      Ė: "E",
      Ę: "E",
      Ě: "E",
      ē: "e",
      ĕ: "e",
      ė: "e",
      ę: "e",
      ě: "e",
      Ĝ: "G",
      Ğ: "G",
      Ġ: "G",
      Ģ: "G",
      ĝ: "g",
      ğ: "g",
      ġ: "g",
      ģ: "g",
      Ĥ: "H",
      Ħ: "H",
      ĥ: "h",
      ħ: "h",
      Ĩ: "I",
      Ī: "I",
      Ĭ: "I",
      Į: "I",
      İ: "I",
      ĩ: "i",
      ī: "i",
      ĭ: "i",
      į: "i",
      ı: "i",
      Ĵ: "J",
      ĵ: "j",
      Ķ: "K",
      ķ: "k",
      ĸ: "k",
      Ĺ: "L",
      Ļ: "L",
      Ľ: "L",
      Ŀ: "L",
      Ł: "L",
      ĺ: "l",
      ļ: "l",
      ľ: "l",
      ŀ: "l",
      ł: "l",
      Ń: "N",
      Ņ: "N",
      Ň: "N",
      Ŋ: "N",
      ń: "n",
      ņ: "n",
      ň: "n",
      ŋ: "n",
      Ō: "O",
      Ŏ: "O",
      Ő: "O",
      ō: "o",
      ŏ: "o",
      ő: "o",
      Ŕ: "R",
      Ŗ: "R",
      Ř: "R",
      ŕ: "r",
      ŗ: "r",
      ř: "r",
      Ś: "S",
      Ŝ: "S",
      Ş: "S",
      Š: "S",
      ś: "s",
      ŝ: "s",
      ş: "s",
      š: "s",
      Ţ: "T",
      Ť: "T",
      Ŧ: "T",
      ţ: "t",
      ť: "t",
      ŧ: "t",
      Ũ: "U",
      Ū: "U",
      Ŭ: "U",
      Ů: "U",
      Ű: "U",
      Ų: "U",
      ũ: "u",
      ū: "u",
      ŭ: "u",
      ů: "u",
      ű: "u",
      ų: "u",
      Ŵ: "W",
      ŵ: "w",
      Ŷ: "Y",
      ŷ: "y",
      Ÿ: "Y",
      Ź: "Z",
      Ż: "Z",
      Ž: "Z",
      ź: "z",
      ż: "z",
      ž: "z",
      Ĳ: "IJ",
      ĳ: "ij",
      Œ: "Oe",
      œ: "oe",
      ŉ: "'n",
      ſ: "s"
    }, pc = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }, jc = {
      "&amp;": "&",
      "&lt;": "<",
      "&gt;": ">",
      "&quot;": '"',
      "&#39;": "'"
    }, zc = {
      "\\": "\\",
      "'": "'",
      "\n": "n",
      "\r": "r",
      "\u2028": "u2028",
      "\u2029": "u2029"
    }, yc = parseFloat, Dc = parseInt, oo = typeof Il == "object" && Il && Il.Object === Object && Il, _c = typeof self == "object" && self && self.Object === Object && self, Mt = oo || _c || Function("return this")(), Ar = s && !s.nodeType && s, Sn = Ar && !0 && f && !f.nodeType && f, so = Sn && Sn.exports === Ar, Tr = so && oo.process, kt = function() {
      try {
        var p = Sn && Sn.require && Sn.require("util").types;
        return p || Tr && Tr.binding && Tr.binding("util");
      } catch {
      }
    }(), io = kt && kt.isArrayBuffer, ao = kt && kt.isDate, co = kt && kt.isMap, Mo = kt && kt.isRegExp, fo = kt && kt.isSet, go = kt && kt.isTypedArray;
    function xt(p, T, Y) {
      switch (Y.length) {
        case 0:
          return p.call(T);
        case 1:
          return p.call(T, Y[0]);
        case 2:
          return p.call(T, Y[0], Y[1]);
        case 3:
          return p.call(T, Y[0], Y[1], Y[2]);
      }
      return p.apply(T, Y);
    }
    function mc(p, T, Y, K) {
      for (var ie = -1, Ae = p == null ? 0 : p.length; ++ie < Ae; ) {
        var ot = p[ie];
        T(K, ot, Y(ot), p);
      }
      return K;
    }
    function Ut(p, T) {
      for (var Y = -1, K = p == null ? 0 : p.length; ++Y < K && T(p[Y], Y, p) !== !1; )
        ;
      return p;
    }
    function hc(p, T) {
      for (var Y = p == null ? 0 : p.length; Y-- && T(p[Y], Y, p) !== !1; )
        ;
      return p;
    }
    function No(p, T) {
      for (var Y = -1, K = p == null ? 0 : p.length; ++Y < K; )
        if (!T(p[Y], Y, p))
          return !1;
      return !0;
    }
    function In(p, T) {
      for (var Y = -1, K = p == null ? 0 : p.length, ie = 0, Ae = []; ++Y < K; ) {
        var ot = p[Y];
        T(ot, Y, p) && (Ae[ie++] = ot);
      }
      return Ae;
    }
    function El(p, T) {
      var Y = p == null ? 0 : p.length;
      return !!Y && Kn(p, T, 0) > -1;
    }
    function Lr(p, T, Y) {
      for (var K = -1, ie = p == null ? 0 : p.length; ++K < ie; )
        if (Y(T, p[K]))
          return !0;
      return !1;
    }
    function Ze(p, T) {
      for (var Y = -1, K = p == null ? 0 : p.length, ie = Array(K); ++Y < K; )
        ie[Y] = T(p[Y], Y, p);
      return ie;
    }
    function vn(p, T) {
      for (var Y = -1, K = T.length, ie = p.length; ++Y < K; )
        p[ie + Y] = T[Y];
      return p;
    }
    function xr(p, T, Y, K) {
      var ie = -1, Ae = p == null ? 0 : p.length;
      for (K && Ae && (Y = p[++ie]); ++ie < Ae; )
        Y = T(Y, p[ie], ie, p);
      return Y;
    }
    function Yc(p, T, Y, K) {
      var ie = p == null ? 0 : p.length;
      for (K && ie && (Y = p[--ie]); ie--; )
        Y = T(Y, p[ie], ie, p);
      return Y;
    }
    function Er(p, T) {
      for (var Y = -1, K = p == null ? 0 : p.length; ++Y < K; )
        if (T(p[Y], Y, p))
          return !0;
      return !1;
    }
    var Ic = Cr("length");
    function vc(p) {
      return p.split("");
    }
    function wc(p) {
      return p.match(Oa) || [];
    }
    function po(p, T, Y) {
      var K;
      return Y(p, function(ie, Ae, ot) {
        if (T(ie, Ae, ot))
          return K = Ae, !1;
      }), K;
    }
    function Cl(p, T, Y, K) {
      for (var ie = p.length, Ae = Y + (K ? 1 : -1); K ? Ae-- : ++Ae < ie; )
        if (T(p[Ae], Ae, p))
          return Ae;
      return -1;
    }
    function Kn(p, T, Y) {
      return T === T ? Uc(p, T, Y) : Cl(p, jo, Y);
    }
    function Ac(p, T, Y, K) {
      for (var ie = Y - 1, Ae = p.length; ++ie < Ae; )
        if (K(p[ie], T))
          return ie;
      return -1;
    }
    function jo(p) {
      return p !== p;
    }
    function zo(p, T) {
      var Y = p == null ? 0 : p.length;
      return Y ? Or(p, T) / Y : Be;
    }
    function Cr(p) {
      return function(T) {
        return T == null ? r : T[p];
      };
    }
    function br(p) {
      return function(T) {
        return p == null ? r : p[T];
      };
    }
    function yo(p, T, Y, K, ie) {
      return ie(p, function(Ae, ot, Pe) {
        Y = K ? (K = !1, Ae) : T(Y, Ae, ot, Pe);
      }), Y;
    }
    function Tc(p, T) {
      var Y = p.length;
      for (p.sort(T); Y--; )
        p[Y] = p[Y].value;
      return p;
    }
    function Or(p, T) {
      for (var Y, K = -1, ie = p.length; ++K < ie; ) {
        var Ae = T(p[K]);
        Ae !== r && (Y = Y === r ? Ae : Y + Ae);
      }
      return Y;
    }
    function Sr(p, T) {
      for (var Y = -1, K = Array(p); ++Y < p; )
        K[Y] = T(Y);
      return K;
    }
    function Lc(p, T) {
      return Ze(T, function(Y) {
        return [Y, p[Y]];
      });
    }
    function Do(p) {
      return p && p.slice(0, Yo(p) + 1).replace(mr, "");
    }
    function Et(p) {
      return function(T) {
        return p(T);
      };
    }
    function Br(p, T) {
      return Ze(T, function(Y) {
        return p[Y];
      });
    }
    function cl(p, T) {
      return p.has(T);
    }
    function _o(p, T) {
      for (var Y = -1, K = p.length; ++Y < K && Kn(T, p[Y], 0) > -1; )
        ;
      return Y;
    }
    function mo(p, T) {
      for (var Y = p.length; Y-- && Kn(T, p[Y], 0) > -1; )
        ;
      return Y;
    }
    function xc(p, T) {
      for (var Y = p.length, K = 0; Y--; )
        p[Y] === T && ++K;
      return K;
    }
    var Ec = br(Nc), Cc = br(pc);
    function bc(p) {
      return "\\" + zc[p];
    }
    function Oc(p, T) {
      return p == null ? r : p[T];
    }
    function qn(p) {
      return Mc.test(p);
    }
    function Sc(p) {
      return fc.test(p);
    }
    function Bc(p) {
      for (var T, Y = []; !(T = p.next()).done; )
        Y.push(T.value);
      return Y;
    }
    function kr(p) {
      var T = -1, Y = Array(p.size);
      return p.forEach(function(K, ie) {
        Y[++T] = [ie, K];
      }), Y;
    }
    function ho(p, T) {
      return function(Y) {
        return p(T(Y));
      };
    }
    function wn(p, T) {
      for (var Y = -1, K = p.length, ie = 0, Ae = []; ++Y < K; ) {
        var ot = p[Y];
        (ot === T || ot === z) && (p[Y] = z, Ae[ie++] = Y);
      }
      return Ae;
    }
    function bl(p) {
      var T = -1, Y = Array(p.size);
      return p.forEach(function(K) {
        Y[++T] = K;
      }), Y;
    }
    function kc(p) {
      var T = -1, Y = Array(p.size);
      return p.forEach(function(K) {
        Y[++T] = [K, K];
      }), Y;
    }
    function Uc(p, T, Y) {
      for (var K = Y - 1, ie = p.length; ++K < ie; )
        if (p[K] === T)
          return K;
      return -1;
    }
    function Qc(p, T, Y) {
      for (var K = Y + 1; K--; )
        if (p[K] === T)
          return K;
      return K;
    }
    function $n(p) {
      return qn(p) ? Vc(p) : Ic(p);
    }
    function Kt(p) {
      return qn(p) ? Fc(p) : vc(p);
    }
    function Yo(p) {
      for (var T = p.length; T-- && xa.test(p.charAt(T)); )
        ;
      return T;
    }
    var Pc = br(jc);
    function Vc(p) {
      for (var T = wr.lastIndex = 0; wr.test(p); )
        ++T;
      return T;
    }
    function Fc(p) {
      return p.match(wr) || [];
    }
    function Rc(p) {
      return p.match(cc) || [];
    }
    var Wc = function p(T) {
      T = T == null ? Mt : Jn.defaults(Mt.Object(), T, Jn.pick(Mt, gc));
      var Y = T.Array, K = T.Date, ie = T.Error, Ae = T.Function, ot = T.Math, Pe = T.Object, Ur = T.RegExp, Gc = T.String, Qt = T.TypeError, Ol = Y.prototype, Zc = Ae.prototype, Xn = Pe.prototype, Sl = T["__core-js_shared__"], Bl = Zc.toString, Ce = Xn.hasOwnProperty, Hc = 0, Io = function() {
        var e = /[^.]+$/.exec(Sl && Sl.keys && Sl.keys.IE_PROTO || "");
        return e ? "Symbol(src)_1." + e : "";
      }(), kl = Xn.toString, Kc = Bl.call(Pe), qc = Mt._, $c = Ur(
        "^" + Bl.call(Ce).replace(_r, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
      ), Ul = so ? T.Buffer : r, An = T.Symbol, Ql = T.Uint8Array, vo = Ul ? Ul.allocUnsafe : r, Pl = ho(Pe.getPrototypeOf, Pe), wo = Pe.create, Ao = Xn.propertyIsEnumerable, Vl = Ol.splice, To = An ? An.isConcatSpreadable : r, Ml = An ? An.iterator : r, Bn = An ? An.toStringTag : r, Fl = function() {
        try {
          var e = Vn(Pe, "defineProperty");
          return e({}, "", {}), e;
        } catch {
        }
      }(), Jc = T.clearTimeout !== Mt.clearTimeout && T.clearTimeout, Xc = K && K.now !== Mt.Date.now && K.now, eM = T.setTimeout !== Mt.setTimeout && T.setTimeout, Rl = ot.ceil, Wl = ot.floor, Qr = Pe.getOwnPropertySymbols, tM = Ul ? Ul.isBuffer : r, Lo = T.isFinite, nM = Ol.join, lM = ho(Pe.keys, Pe), st = ot.max, jt = ot.min, rM = K.now, uM = T.parseInt, xo = ot.random, oM = Ol.reverse, Pr = Vn(T, "DataView"), fl = Vn(T, "Map"), Vr = Vn(T, "Promise"), el = Vn(T, "Set"), gl = Vn(T, "WeakMap"), dl = Vn(Pe, "create"), Gl = gl && new gl(), tl = {}, sM = Fn(Pr), iM = Fn(fl), aM = Fn(Vr), cM = Fn(el), MM = Fn(gl), Zl = An ? An.prototype : r, Nl = Zl ? Zl.valueOf : r, Eo = Zl ? Zl.toString : r;
      function i(e) {
        if (Je(e) && !Me(e) && !(e instanceof _e)) {
          if (e instanceof Pt)
            return e;
          if (Ce.call(e, "__wrapped__"))
            return Cs(e);
        }
        return new Pt(e);
      }
      var nl = function() {
        function e() {
        }
        return function(t) {
          if (!$e(t))
            return {};
          if (wo)
            return wo(t);
          e.prototype = t;
          var n = new e();
          return e.prototype = r, n;
        };
      }();
      function Hl() {
      }
      function Pt(e, t) {
        this.__wrapped__ = e, this.__actions__ = [], this.__chain__ = !!t, this.__index__ = 0, this.__values__ = r;
      }
      i.templateSettings = {
        /**
         * Used to detect `data` property values to be HTML-escaped.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        escape: Ia,
        /**
         * Used to detect code to be evaluated.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        evaluate: va,
        /**
         * Used to detect `data` property values to inject.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        interpolate: Qu,
        /**
         * Used to reference the data object in the template text.
         *
         * @memberOf _.templateSettings
         * @type {string}
         */
        variable: "",
        /**
         * Used to import variables into the compiled template.
         *
         * @memberOf _.templateSettings
         * @type {Object}
         */
        imports: {
          /**
           * A reference to the `lodash` function.
           *
           * @memberOf _.templateSettings.imports
           * @type {Function}
           */
          _: i
        }
      }, i.prototype = Hl.prototype, i.prototype.constructor = i, Pt.prototype = nl(Hl.prototype), Pt.prototype.constructor = Pt;
      function _e(e) {
        this.__wrapped__ = e, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = !1, this.__iteratees__ = [], this.__takeCount__ = Re, this.__views__ = [];
      }
      function fM() {
        var e = new _e(this.__wrapped__);
        return e.__actions__ = vt(this.__actions__), e.__dir__ = this.__dir__, e.__filtered__ = this.__filtered__, e.__iteratees__ = vt(this.__iteratees__), e.__takeCount__ = this.__takeCount__, e.__views__ = vt(this.__views__), e;
      }
      function gM() {
        if (this.__filtered__) {
          var e = new _e(this);
          e.__dir__ = -1, e.__filtered__ = !0;
        } else
          e = this.clone(), e.__dir__ *= -1;
        return e;
      }
      function dM() {
        var e = this.__wrapped__.value(), t = this.__dir__, n = Me(e), l = t < 0, u = n ? e.length : 0, a = wf(0, u, this.__views__), c = a.start, g = a.end, y = g - c, E = l ? g : c - 1, b = this.__iteratees__, S = b.length, G = 0, J = jt(y, this.__takeCount__);
        if (!n || !l && u == y && J == y)
          return ns(e, this.__actions__);
        var re = [];
        e:
          for (; y-- && G < J; ) {
            E += t;
            for (var je = -1, ue = e[E]; ++je < S; ) {
              var De = b[je], he = De.iteratee, Ot = De.type, It = he(ue);
              if (Ot == at)
                ue = It;
              else if (!It) {
                if (Ot == tn)
                  continue e;
                break e;
              }
            }
            re[G++] = ue;
          }
        return re;
      }
      _e.prototype = nl(Hl.prototype), _e.prototype.constructor = _e;
      function kn(e) {
        var t = -1, n = e == null ? 0 : e.length;
        for (this.clear(); ++t < n; ) {
          var l = e[t];
          this.set(l[0], l[1]);
        }
      }
      function NM() {
        this.__data__ = dl ? dl(null) : {}, this.size = 0;
      }
      function pM(e) {
        var t = this.has(e) && delete this.__data__[e];
        return this.size -= t ? 1 : 0, t;
      }
      function jM(e) {
        var t = this.__data__;
        if (dl) {
          var n = t[e];
          return n === d ? r : n;
        }
        return Ce.call(t, e) ? t[e] : r;
      }
      function zM(e) {
        var t = this.__data__;
        return dl ? t[e] !== r : Ce.call(t, e);
      }
      function yM(e, t) {
        var n = this.__data__;
        return this.size += this.has(e) ? 0 : 1, n[e] = dl && t === r ? d : t, this;
      }
      kn.prototype.clear = NM, kn.prototype.delete = pM, kn.prototype.get = jM, kn.prototype.has = zM, kn.prototype.set = yM;
      function fn(e) {
        var t = -1, n = e == null ? 0 : e.length;
        for (this.clear(); ++t < n; ) {
          var l = e[t];
          this.set(l[0], l[1]);
        }
      }
      function DM() {
        this.__data__ = [], this.size = 0;
      }
      function _M(e) {
        var t = this.__data__, n = Kl(t, e);
        if (n < 0)
          return !1;
        var l = t.length - 1;
        return n == l ? t.pop() : Vl.call(t, n, 1), --this.size, !0;
      }
      function mM(e) {
        var t = this.__data__, n = Kl(t, e);
        return n < 0 ? r : t[n][1];
      }
      function hM(e) {
        return Kl(this.__data__, e) > -1;
      }
      function YM(e, t) {
        var n = this.__data__, l = Kl(n, e);
        return l < 0 ? (++this.size, n.push([e, t])) : n[l][1] = t, this;
      }
      fn.prototype.clear = DM, fn.prototype.delete = _M, fn.prototype.get = mM, fn.prototype.has = hM, fn.prototype.set = YM;
      function gn(e) {
        var t = -1, n = e == null ? 0 : e.length;
        for (this.clear(); ++t < n; ) {
          var l = e[t];
          this.set(l[0], l[1]);
        }
      }
      function IM() {
        this.size = 0, this.__data__ = {
          hash: new kn(),
          map: new (fl || fn)(),
          string: new kn()
        };
      }
      function vM(e) {
        var t = sr(this, e).delete(e);
        return this.size -= t ? 1 : 0, t;
      }
      function wM(e) {
        return sr(this, e).get(e);
      }
      function AM(e) {
        return sr(this, e).has(e);
      }
      function TM(e, t) {
        var n = sr(this, e), l = n.size;
        return n.set(e, t), this.size += n.size == l ? 0 : 1, this;
      }
      gn.prototype.clear = IM, gn.prototype.delete = vM, gn.prototype.get = wM, gn.prototype.has = AM, gn.prototype.set = TM;
      function Un(e) {
        var t = -1, n = e == null ? 0 : e.length;
        for (this.__data__ = new gn(); ++t < n; )
          this.add(e[t]);
      }
      function LM(e) {
        return this.__data__.set(e, d), this;
      }
      function xM(e) {
        return this.__data__.has(e);
      }
      Un.prototype.add = Un.prototype.push = LM, Un.prototype.has = xM;
      function qt(e) {
        var t = this.__data__ = new fn(e);
        this.size = t.size;
      }
      function EM() {
        this.__data__ = new fn(), this.size = 0;
      }
      function CM(e) {
        var t = this.__data__, n = t.delete(e);
        return this.size = t.size, n;
      }
      function bM(e) {
        return this.__data__.get(e);
      }
      function OM(e) {
        return this.__data__.has(e);
      }
      function SM(e, t) {
        var n = this.__data__;
        if (n instanceof fn) {
          var l = n.__data__;
          if (!fl || l.length < D - 1)
            return l.push([e, t]), this.size = ++n.size, this;
          n = this.__data__ = new gn(l);
        }
        return n.set(e, t), this.size = n.size, this;
      }
      qt.prototype.clear = EM, qt.prototype.delete = CM, qt.prototype.get = bM, qt.prototype.has = OM, qt.prototype.set = SM;
      function Co(e, t) {
        var n = Me(e), l = !n && Rn(e), u = !n && !l && Cn(e), a = !n && !l && !u && ol(e), c = n || l || u || a, g = c ? Sr(e.length, Gc) : [], y = g.length;
        for (var E in e)
          (t || Ce.call(e, E)) && !(c && // Safari 9 has enumerable `arguments.length` in strict mode.
          (E == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
          u && (E == "offset" || E == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
          a && (E == "buffer" || E == "byteLength" || E == "byteOffset") || // Skip index properties.
          jn(E, y))) && g.push(E);
        return g;
      }
      function bo(e) {
        var t = e.length;
        return t ? e[Xr(0, t - 1)] : r;
      }
      function BM(e, t) {
        return ir(vt(e), Qn(t, 0, e.length));
      }
      function kM(e) {
        return ir(vt(e));
      }
      function Fr(e, t, n) {
        (n !== r && !$t(e[t], n) || n === r && !(t in e)) && dn(e, t, n);
      }
      function pl(e, t, n) {
        var l = e[t];
        (!(Ce.call(e, t) && $t(l, n)) || n === r && !(t in e)) && dn(e, t, n);
      }
      function Kl(e, t) {
        for (var n = e.length; n--; )
          if ($t(e[n][0], t))
            return n;
        return -1;
      }
      function UM(e, t, n, l) {
        return Tn(e, function(u, a, c) {
          t(l, u, n(u), c);
        }), l;
      }
      function Oo(e, t) {
        return e && on(t, it(t), e);
      }
      function QM(e, t) {
        return e && on(t, At(t), e);
      }
      function dn(e, t, n) {
        t == "__proto__" && Fl ? Fl(e, t, {
          configurable: !0,
          enumerable: !0,
          value: n,
          writable: !0
        }) : e[t] = n;
      }
      function Rr(e, t) {
        for (var n = -1, l = t.length, u = Y(l), a = e == null; ++n < l; )
          u[n] = a ? r : Yu(e, t[n]);
        return u;
      }
      function Qn(e, t, n) {
        return e === e && (n !== r && (e = e <= n ? e : n), t !== r && (e = e >= t ? e : t)), e;
      }
      function Vt(e, t, n, l, u, a) {
        var c, g = t & I, y = t & O, E = t & C;
        if (n && (c = u ? n(e, l, u, a) : n(e)), c !== r)
          return c;
        if (!$e(e))
          return e;
        var b = Me(e);
        if (b) {
          if (c = Tf(e), !g)
            return vt(e, c);
        } else {
          var S = zt(e), G = S == Mn || S == On;
          if (Cn(e))
            return us(e, g);
          if (S == H || S == pe || G && !u) {
            if (c = y || G ? {} : Ys(e), !g)
              return y ? zf(e, QM(c, e)) : jf(e, Oo(c, e));
          } else {
            if (!Fe[S])
              return u ? e : {};
            c = Lf(e, S, g);
          }
        }
        a || (a = new qt());
        var J = a.get(e);
        if (J)
          return J;
        a.set(e, c), Xs(e) ? e.forEach(function(ue) {
          c.add(Vt(ue, t, n, ue, e, a));
        }) : $s(e) && e.forEach(function(ue, De) {
          c.set(De, Vt(ue, t, n, De, e, a));
        });
        var re = E ? y ? cu : au : y ? At : it, je = b ? r : re(e);
        return Ut(je || e, function(ue, De) {
          je && (De = ue, ue = e[De]), pl(c, De, Vt(ue, t, n, De, e, a));
        }), c;
      }
      function PM(e) {
        var t = it(e);
        return function(n) {
          return So(n, e, t);
        };
      }
      function So(e, t, n) {
        var l = n.length;
        if (e == null)
          return !l;
        for (e = Pe(e); l--; ) {
          var u = n[l], a = t[u], c = e[u];
          if (c === r && !(u in e) || !a(c))
            return !1;
        }
        return !0;
      }
      function Bo(e, t, n) {
        if (typeof e != "function")
          throw new Qt(m);
        return hl(function() {
          e.apply(r, n);
        }, t);
      }
      function jl(e, t, n, l) {
        var u = -1, a = El, c = !0, g = e.length, y = [], E = t.length;
        if (!g)
          return y;
        n && (t = Ze(t, Et(n))), l ? (a = Lr, c = !1) : t.length >= D && (a = cl, c = !1, t = new Un(t));
        e:
          for (; ++u < g; ) {
            var b = e[u], S = n == null ? b : n(b);
            if (b = l || b !== 0 ? b : 0, c && S === S) {
              for (var G = E; G--; )
                if (t[G] === S)
                  continue e;
              y.push(b);
            } else
              a(t, S, l) || y.push(b);
          }
        return y;
      }
      var Tn = cs(un), ko = cs(Gr, !0);
      function VM(e, t) {
        var n = !0;
        return Tn(e, function(l, u, a) {
          return n = !!t(l, u, a), n;
        }), n;
      }
      function ql(e, t, n) {
        for (var l = -1, u = e.length; ++l < u; ) {
          var a = e[l], c = t(a);
          if (c != null && (g === r ? c === c && !bt(c) : n(c, g)))
            var g = c, y = a;
        }
        return y;
      }
      function FM(e, t, n, l) {
        var u = e.length;
        for (n = Ne(n), n < 0 && (n = -n > u ? 0 : u + n), l = l === r || l > u ? u : Ne(l), l < 0 && (l += u), l = n > l ? 0 : ti(l); n < l; )
          e[n++] = t;
        return e;
      }
      function Uo(e, t) {
        var n = [];
        return Tn(e, function(l, u, a) {
          t(l, u, a) && n.push(l);
        }), n;
      }
      function ft(e, t, n, l, u) {
        var a = -1, c = e.length;
        for (n || (n = Ef), u || (u = []); ++a < c; ) {
          var g = e[a];
          t > 0 && n(g) ? t > 1 ? ft(g, t - 1, n, l, u) : vn(u, g) : l || (u[u.length] = g);
        }
        return u;
      }
      var Wr = Ms(), Qo = Ms(!0);
      function un(e, t) {
        return e && Wr(e, t, it);
      }
      function Gr(e, t) {
        return e && Qo(e, t, it);
      }
      function $l(e, t) {
        return In(t, function(n) {
          return zn(e[n]);
        });
      }
      function Pn(e, t) {
        t = xn(t, e);
        for (var n = 0, l = t.length; e != null && n < l; )
          e = e[sn(t[n++])];
        return n && n == l ? e : r;
      }
      function Po(e, t, n) {
        var l = t(e);
        return Me(e) ? l : vn(l, n(e));
      }
      function ht(e) {
        return e == null ? e === r ? hn : w : Bn && Bn in Pe(e) ? vf(e) : Uf(e);
      }
      function Zr(e, t) {
        return e > t;
      }
      function RM(e, t) {
        return e != null && Ce.call(e, t);
      }
      function WM(e, t) {
        return e != null && t in Pe(e);
      }
      function GM(e, t, n) {
        return e >= jt(t, n) && e < st(t, n);
      }
      function Hr(e, t, n) {
        for (var l = n ? Lr : El, u = e[0].length, a = e.length, c = a, g = Y(a), y = 1 / 0, E = []; c--; ) {
          var b = e[c];
          c && t && (b = Ze(b, Et(t))), y = jt(b.length, y), g[c] = !n && (t || u >= 120 && b.length >= 120) ? new Un(c && b) : r;
        }
        b = e[0];
        var S = -1, G = g[0];
        e:
          for (; ++S < u && E.length < y; ) {
            var J = b[S], re = t ? t(J) : J;
            if (J = n || J !== 0 ? J : 0, !(G ? cl(G, re) : l(E, re, n))) {
              for (c = a; --c; ) {
                var je = g[c];
                if (!(je ? cl(je, re) : l(e[c], re, n)))
                  continue e;
              }
              G && G.push(re), E.push(J);
            }
          }
        return E;
      }
      function ZM(e, t, n, l) {
        return un(e, function(u, a, c) {
          t(l, n(u), a, c);
        }), l;
      }
      function zl(e, t, n) {
        t = xn(t, e), e = As(e, t);
        var l = e == null ? e : e[sn(Rt(t))];
        return l == null ? r : xt(l, e, n);
      }
      function Vo(e) {
        return Je(e) && ht(e) == pe;
      }
      function HM(e) {
        return Je(e) && ht(e) == ln;
      }
      function KM(e) {
        return Je(e) && ht(e) == Gt;
      }
      function yl(e, t, n, l, u) {
        return e === t ? !0 : e == null || t == null || !Je(e) && !Je(t) ? e !== e && t !== t : qM(e, t, n, l, yl, u);
      }
      function qM(e, t, n, l, u, a) {
        var c = Me(e), g = Me(t), y = c ? Ee : zt(e), E = g ? Ee : zt(t);
        y = y == pe ? H : y, E = E == pe ? H : E;
        var b = y == H, S = E == H, G = y == E;
        if (G && Cn(e)) {
          if (!Cn(t))
            return !1;
          c = !0, b = !1;
        }
        if (G && !b)
          return a || (a = new qt()), c || ol(e) ? _s(e, t, n, l, u, a) : Yf(e, t, y, n, l, u, a);
        if (!(n & L)) {
          var J = b && Ce.call(e, "__wrapped__"), re = S && Ce.call(t, "__wrapped__");
          if (J || re) {
            var je = J ? e.value() : e, ue = re ? t.value() : t;
            return a || (a = new qt()), u(je, ue, n, l, a);
          }
        }
        return G ? (a || (a = new qt()), If(e, t, n, l, u, a)) : !1;
      }
      function $M(e) {
        return Je(e) && zt(e) == Nt;
      }
      function Kr(e, t, n, l) {
        var u = n.length, a = u, c = !l;
        if (e == null)
          return !a;
        for (e = Pe(e); u--; ) {
          var g = n[u];
          if (c && g[2] ? g[1] !== e[g[0]] : !(g[0] in e))
            return !1;
        }
        for (; ++u < a; ) {
          g = n[u];
          var y = g[0], E = e[y], b = g[1];
          if (c && g[2]) {
            if (E === r && !(y in e))
              return !1;
          } else {
            var S = new qt();
            if (l)
              var G = l(E, b, y, e, t, S);
            if (!(G === r ? yl(b, E, L | U, l, S) : G))
              return !1;
          }
        }
        return !0;
      }
      function Fo(e) {
        if (!$e(e) || bf(e))
          return !1;
        var t = zn(e) ? $c : Pa;
        return t.test(Fn(e));
      }
      function JM(e) {
        return Je(e) && ht(e) == ut;
      }
      function XM(e) {
        return Je(e) && zt(e) == Ve;
      }
      function ef(e) {
        return Je(e) && dr(e.length) && !!We[ht(e)];
      }
      function Ro(e) {
        return typeof e == "function" ? e : e == null ? Tt : typeof e == "object" ? Me(e) ? Zo(e[0], e[1]) : Go(e) : fi(e);
      }
      function qr(e) {
        if (!ml(e))
          return lM(e);
        var t = [];
        for (var n in Pe(e))
          Ce.call(e, n) && n != "constructor" && t.push(n);
        return t;
      }
      function tf(e) {
        if (!$e(e))
          return kf(e);
        var t = ml(e), n = [];
        for (var l in e)
          l == "constructor" && (t || !Ce.call(e, l)) || n.push(l);
        return n;
      }
      function $r(e, t) {
        return e < t;
      }
      function Wo(e, t) {
        var n = -1, l = wt(e) ? Y(e.length) : [];
        return Tn(e, function(u, a, c) {
          l[++n] = t(u, a, c);
        }), l;
      }
      function Go(e) {
        var t = fu(e);
        return t.length == 1 && t[0][2] ? vs(t[0][0], t[0][1]) : function(n) {
          return n === e || Kr(n, e, t);
        };
      }
      function Zo(e, t) {
        return du(e) && Is(t) ? vs(sn(e), t) : function(n) {
          var l = Yu(n, e);
          return l === r && l === t ? Iu(n, e) : yl(t, l, L | U);
        };
      }
      function Jl(e, t, n, l, u) {
        e !== t && Wr(t, function(a, c) {
          if (u || (u = new qt()), $e(a))
            nf(e, t, c, n, Jl, l, u);
          else {
            var g = l ? l(pu(e, c), a, c + "", e, t, u) : r;
            g === r && (g = a), Fr(e, c, g);
          }
        }, At);
      }
      function nf(e, t, n, l, u, a, c) {
        var g = pu(e, n), y = pu(t, n), E = c.get(y);
        if (E) {
          Fr(e, n, E);
          return;
        }
        var b = a ? a(g, y, n + "", e, t, c) : r, S = b === r;
        if (S) {
          var G = Me(y), J = !G && Cn(y), re = !G && !J && ol(y);
          b = y, G || J || re ? Me(g) ? b = g : nt(g) ? b = vt(g) : J ? (S = !1, b = us(y, !0)) : re ? (S = !1, b = os(y, !0)) : b = [] : Yl(y) || Rn(y) ? (b = g, Rn(g) ? b = ni(g) : (!$e(g) || zn(g)) && (b = Ys(y))) : S = !1;
        }
        S && (c.set(y, b), u(b, y, l, a, c), c.delete(y)), Fr(e, n, b);
      }
      function Ho(e, t) {
        var n = e.length;
        if (n)
          return t += t < 0 ? n : 0, jn(t, n) ? e[t] : r;
      }
      function Ko(e, t, n) {
        t.length ? t = Ze(t, function(a) {
          return Me(a) ? function(c) {
            return Pn(c, a.length === 1 ? a[0] : a);
          } : a;
        }) : t = [Tt];
        var l = -1;
        t = Ze(t, Et(ne()));
        var u = Wo(e, function(a, c, g) {
          var y = Ze(t, function(E) {
            return E(a);
          });
          return { criteria: y, index: ++l, value: a };
        });
        return Tc(u, function(a, c) {
          return pf(a, c, n);
        });
      }
      function lf(e, t) {
        return qo(e, t, function(n, l) {
          return Iu(e, l);
        });
      }
      function qo(e, t, n) {
        for (var l = -1, u = t.length, a = {}; ++l < u; ) {
          var c = t[l], g = Pn(e, c);
          n(g, c) && Dl(a, xn(c, e), g);
        }
        return a;
      }
      function rf(e) {
        return function(t) {
          return Pn(t, e);
        };
      }
      function Jr(e, t, n, l) {
        var u = l ? Ac : Kn, a = -1, c = t.length, g = e;
        for (e === t && (t = vt(t)), n && (g = Ze(e, Et(n))); ++a < c; )
          for (var y = 0, E = t[a], b = n ? n(E) : E; (y = u(g, b, y, l)) > -1; )
            g !== e && Vl.call(g, y, 1), Vl.call(e, y, 1);
        return e;
      }
      function $o(e, t) {
        for (var n = e ? t.length : 0, l = n - 1; n--; ) {
          var u = t[n];
          if (n == l || u !== a) {
            var a = u;
            jn(u) ? Vl.call(e, u, 1) : nu(e, u);
          }
        }
        return e;
      }
      function Xr(e, t) {
        return e + Wl(xo() * (t - e + 1));
      }
      function uf(e, t, n, l) {
        for (var u = -1, a = st(Rl((t - e) / (n || 1)), 0), c = Y(a); a--; )
          c[l ? a : ++u] = e, e += n;
        return c;
      }
      function eu(e, t) {
        var n = "";
        if (!e || t < 1 || t > $)
          return n;
        do
          t % 2 && (n += e), t = Wl(t / 2), t && (e += e);
        while (t);
        return n;
      }
      function ye(e, t) {
        return ju(ws(e, t, Tt), e + "");
      }
      function of(e) {
        return bo(sl(e));
      }
      function sf(e, t) {
        var n = sl(e);
        return ir(n, Qn(t, 0, n.length));
      }
      function Dl(e, t, n, l) {
        if (!$e(e))
          return e;
        t = xn(t, e);
        for (var u = -1, a = t.length, c = a - 1, g = e; g != null && ++u < a; ) {
          var y = sn(t[u]), E = n;
          if (y === "__proto__" || y === "constructor" || y === "prototype")
            return e;
          if (u != c) {
            var b = g[y];
            E = l ? l(b, y, g) : r, E === r && (E = $e(b) ? b : jn(t[u + 1]) ? [] : {});
          }
          pl(g, y, E), g = g[y];
        }
        return e;
      }
      var Jo = Gl ? function(e, t) {
        return Gl.set(e, t), e;
      } : Tt, af = Fl ? function(e, t) {
        return Fl(e, "toString", {
          configurable: !0,
          enumerable: !1,
          value: wu(t),
          writable: !0
        });
      } : Tt;
      function cf(e) {
        return ir(sl(e));
      }
      function Ft(e, t, n) {
        var l = -1, u = e.length;
        t < 0 && (t = -t > u ? 0 : u + t), n = n > u ? u : n, n < 0 && (n += u), u = t > n ? 0 : n - t >>> 0, t >>>= 0;
        for (var a = Y(u); ++l < u; )
          a[l] = e[l + t];
        return a;
      }
      function Mf(e, t) {
        var n;
        return Tn(e, function(l, u, a) {
          return n = t(l, u, a), !n;
        }), !!n;
      }
      function Xl(e, t, n) {
        var l = 0, u = e == null ? l : e.length;
        if (typeof t == "number" && t === t && u <= X) {
          for (; l < u; ) {
            var a = l + u >>> 1, c = e[a];
            c !== null && !bt(c) && (n ? c <= t : c < t) ? l = a + 1 : u = a;
          }
          return u;
        }
        return tu(e, t, Tt, n);
      }
      function tu(e, t, n, l) {
        var u = 0, a = e == null ? 0 : e.length;
        if (a === 0)
          return 0;
        t = n(t);
        for (var c = t !== t, g = t === null, y = bt(t), E = t === r; u < a; ) {
          var b = Wl((u + a) / 2), S = n(e[b]), G = S !== r, J = S === null, re = S === S, je = bt(S);
          if (c)
            var ue = l || re;
          else
            E ? ue = re && (l || G) : g ? ue = re && G && (l || !J) : y ? ue = re && G && !J && (l || !je) : J || je ? ue = !1 : ue = l ? S <= t : S < t;
          ue ? u = b + 1 : a = b;
        }
        return jt(a, W);
      }
      function Xo(e, t) {
        for (var n = -1, l = e.length, u = 0, a = []; ++n < l; ) {
          var c = e[n], g = t ? t(c) : c;
          if (!n || !$t(g, y)) {
            var y = g;
            a[u++] = c === 0 ? 0 : c;
          }
        }
        return a;
      }
      function es(e) {
        return typeof e == "number" ? e : bt(e) ? Be : +e;
      }
      function Ct(e) {
        if (typeof e == "string")
          return e;
        if (Me(e))
          return Ze(e, Ct) + "";
        if (bt(e))
          return Eo ? Eo.call(e) : "";
        var t = e + "";
        return t == "0" && 1 / e == -x ? "-0" : t;
      }
      function Ln(e, t, n) {
        var l = -1, u = El, a = e.length, c = !0, g = [], y = g;
        if (n)
          c = !1, u = Lr;
        else if (a >= D) {
          var E = t ? null : mf(e);
          if (E)
            return bl(E);
          c = !1, u = cl, y = new Un();
        } else
          y = t ? [] : g;
        e:
          for (; ++l < a; ) {
            var b = e[l], S = t ? t(b) : b;
            if (b = n || b !== 0 ? b : 0, c && S === S) {
              for (var G = y.length; G--; )
                if (y[G] === S)
                  continue e;
              t && y.push(S), g.push(b);
            } else
              u(y, S, n) || (y !== g && y.push(S), g.push(b));
          }
        return g;
      }
      function nu(e, t) {
        return t = xn(t, e), e = As(e, t), e == null || delete e[sn(Rt(t))];
      }
      function ts(e, t, n, l) {
        return Dl(e, t, n(Pn(e, t)), l);
      }
      function er(e, t, n, l) {
        for (var u = e.length, a = l ? u : -1; (l ? a-- : ++a < u) && t(e[a], a, e); )
          ;
        return n ? Ft(e, l ? 0 : a, l ? a + 1 : u) : Ft(e, l ? a + 1 : 0, l ? u : a);
      }
      function ns(e, t) {
        var n = e;
        return n instanceof _e && (n = n.value()), xr(t, function(l, u) {
          return u.func.apply(u.thisArg, vn([l], u.args));
        }, n);
      }
      function lu(e, t, n) {
        var l = e.length;
        if (l < 2)
          return l ? Ln(e[0]) : [];
        for (var u = -1, a = Y(l); ++u < l; )
          for (var c = e[u], g = -1; ++g < l; )
            g != u && (a[u] = jl(a[u] || c, e[g], t, n));
        return Ln(ft(a, 1), t, n);
      }
      function ls(e, t, n) {
        for (var l = -1, u = e.length, a = t.length, c = {}; ++l < u; ) {
          var g = l < a ? t[l] : r;
          n(c, e[l], g);
        }
        return c;
      }
      function ru(e) {
        return nt(e) ? e : [];
      }
      function uu(e) {
        return typeof e == "function" ? e : Tt;
      }
      function xn(e, t) {
        return Me(e) ? e : du(e, t) ? [e] : Es(Le(e));
      }
      var ff = ye;
      function En(e, t, n) {
        var l = e.length;
        return n = n === r ? l : n, !t && n >= l ? e : Ft(e, t, n);
      }
      var rs = Jc || function(e) {
        return Mt.clearTimeout(e);
      };
      function us(e, t) {
        if (t)
          return e.slice();
        var n = e.length, l = vo ? vo(n) : new e.constructor(n);
        return e.copy(l), l;
      }
      function ou(e) {
        var t = new e.constructor(e.byteLength);
        return new Ql(t).set(new Ql(e)), t;
      }
      function gf(e, t) {
        var n = t ? ou(e.buffer) : e.buffer;
        return new e.constructor(n, e.byteOffset, e.byteLength);
      }
      function df(e) {
        var t = new e.constructor(e.source, Pu.exec(e));
        return t.lastIndex = e.lastIndex, t;
      }
      function Nf(e) {
        return Nl ? Pe(Nl.call(e)) : {};
      }
      function os(e, t) {
        var n = t ? ou(e.buffer) : e.buffer;
        return new e.constructor(n, e.byteOffset, e.length);
      }
      function ss(e, t) {
        if (e !== t) {
          var n = e !== r, l = e === null, u = e === e, a = bt(e), c = t !== r, g = t === null, y = t === t, E = bt(t);
          if (!g && !E && !a && e > t || a && c && y && !g && !E || l && c && y || !n && y || !u)
            return 1;
          if (!l && !a && !E && e < t || E && n && u && !l && !a || g && n && u || !c && u || !y)
            return -1;
        }
        return 0;
      }
      function pf(e, t, n) {
        for (var l = -1, u = e.criteria, a = t.criteria, c = u.length, g = n.length; ++l < c; ) {
          var y = ss(u[l], a[l]);
          if (y) {
            if (l >= g)
              return y;
            var E = n[l];
            return y * (E == "desc" ? -1 : 1);
          }
        }
        return e.index - t.index;
      }
      function is(e, t, n, l) {
        for (var u = -1, a = e.length, c = n.length, g = -1, y = t.length, E = st(a - c, 0), b = Y(y + E), S = !l; ++g < y; )
          b[g] = t[g];
        for (; ++u < c; )
          (S || u < a) && (b[n[u]] = e[u]);
        for (; E--; )
          b[g++] = e[u++];
        return b;
      }
      function as(e, t, n, l) {
        for (var u = -1, a = e.length, c = -1, g = n.length, y = -1, E = t.length, b = st(a - g, 0), S = Y(b + E), G = !l; ++u < b; )
          S[u] = e[u];
        for (var J = u; ++y < E; )
          S[J + y] = t[y];
        for (; ++c < g; )
          (G || u < a) && (S[J + n[c]] = e[u++]);
        return S;
      }
      function vt(e, t) {
        var n = -1, l = e.length;
        for (t || (t = Y(l)); ++n < l; )
          t[n] = e[n];
        return t;
      }
      function on(e, t, n, l) {
        var u = !n;
        n || (n = {});
        for (var a = -1, c = t.length; ++a < c; ) {
          var g = t[a], y = l ? l(n[g], e[g], g, n, e) : r;
          y === r && (y = e[g]), u ? dn(n, g, y) : pl(n, g, y);
        }
        return n;
      }
      function jf(e, t) {
        return on(e, gu(e), t);
      }
      function zf(e, t) {
        return on(e, ms(e), t);
      }
      function tr(e, t) {
        return function(n, l) {
          var u = Me(n) ? mc : UM, a = t ? t() : {};
          return u(n, e, ne(l, 2), a);
        };
      }
      function ll(e) {
        return ye(function(t, n) {
          var l = -1, u = n.length, a = u > 1 ? n[u - 1] : r, c = u > 2 ? n[2] : r;
          for (a = e.length > 3 && typeof a == "function" ? (u--, a) : r, c && Yt(n[0], n[1], c) && (a = u < 3 ? r : a, u = 1), t = Pe(t); ++l < u; ) {
            var g = n[l];
            g && e(t, g, l, a);
          }
          return t;
        });
      }
      function cs(e, t) {
        return function(n, l) {
          if (n == null)
            return n;
          if (!wt(n))
            return e(n, l);
          for (var u = n.length, a = t ? u : -1, c = Pe(n); (t ? a-- : ++a < u) && l(c[a], a, c) !== !1; )
            ;
          return n;
        };
      }
      function Ms(e) {
        return function(t, n, l) {
          for (var u = -1, a = Pe(t), c = l(t), g = c.length; g--; ) {
            var y = c[e ? g : ++u];
            if (n(a[y], y, a) === !1)
              break;
          }
          return t;
        };
      }
      function yf(e, t, n) {
        var l = t & B, u = _l(e);
        function a() {
          var c = this && this !== Mt && this instanceof a ? u : e;
          return c.apply(l ? n : this, arguments);
        }
        return a;
      }
      function fs(e) {
        return function(t) {
          t = Le(t);
          var n = qn(t) ? Kt(t) : r, l = n ? n[0] : t.charAt(0), u = n ? En(n, 1).join("") : t.slice(1);
          return l[e]() + u;
        };
      }
      function rl(e) {
        return function(t) {
          return xr(ci(ai(t).replace(ic, "")), e, "");
        };
      }
      function _l(e) {
        return function() {
          var t = arguments;
          switch (t.length) {
            case 0:
              return new e();
            case 1:
              return new e(t[0]);
            case 2:
              return new e(t[0], t[1]);
            case 3:
              return new e(t[0], t[1], t[2]);
            case 4:
              return new e(t[0], t[1], t[2], t[3]);
            case 5:
              return new e(t[0], t[1], t[2], t[3], t[4]);
            case 6:
              return new e(t[0], t[1], t[2], t[3], t[4], t[5]);
            case 7:
              return new e(t[0], t[1], t[2], t[3], t[4], t[5], t[6]);
          }
          var n = nl(e.prototype), l = e.apply(n, t);
          return $e(l) ? l : n;
        };
      }
      function Df(e, t, n) {
        var l = _l(e);
        function u() {
          for (var a = arguments.length, c = Y(a), g = a, y = ul(u); g--; )
            c[g] = arguments[g];
          var E = a < 3 && c[0] !== y && c[a - 1] !== y ? [] : wn(c, y);
          if (a -= E.length, a < n)
            return js(
              e,
              t,
              nr,
              u.placeholder,
              r,
              c,
              E,
              r,
              r,
              n - a
            );
          var b = this && this !== Mt && this instanceof u ? l : e;
          return xt(b, this, c);
        }
        return u;
      }
      function gs(e) {
        return function(t, n, l) {
          var u = Pe(t);
          if (!wt(t)) {
            var a = ne(n, 3);
            t = it(t), n = function(g) {
              return a(u[g], g, u);
            };
          }
          var c = e(t, n, l);
          return c > -1 ? u[a ? t[c] : c] : r;
        };
      }
      function ds(e) {
        return pn(function(t) {
          var n = t.length, l = n, u = Pt.prototype.thru;
          for (e && t.reverse(); l--; ) {
            var a = t[l];
            if (typeof a != "function")
              throw new Qt(m);
            if (u && !c && or(a) == "wrapper")
              var c = new Pt([], !0);
          }
          for (l = c ? l : n; ++l < n; ) {
            a = t[l];
            var g = or(a), y = g == "wrapper" ? Mu(a) : r;
            y && Nu(y[0]) && y[1] == (V | ee | A | ge) && !y[4].length && y[9] == 1 ? c = c[or(y[0])].apply(c, y[3]) : c = a.length == 1 && Nu(a) ? c[g]() : c.thru(a);
          }
          return function() {
            var E = arguments, b = E[0];
            if (c && E.length == 1 && Me(b))
              return c.plant(b).value();
            for (var S = 0, G = n ? t[S].apply(this, E) : b; ++S < n; )
              G = t[S].call(this, G);
            return G;
          };
        });
      }
      function nr(e, t, n, l, u, a, c, g, y, E) {
        var b = t & V, S = t & B, G = t & q, J = t & (ee | ce), re = t & Ue, je = G ? r : _l(e);
        function ue() {
          for (var De = arguments.length, he = Y(De), Ot = De; Ot--; )
            he[Ot] = arguments[Ot];
          if (J)
            var It = ul(ue), St = xc(he, It);
          if (l && (he = is(he, l, u, J)), a && (he = as(he, a, c, J)), De -= St, J && De < E) {
            var lt = wn(he, It);
            return js(
              e,
              t,
              nr,
              ue.placeholder,
              n,
              he,
              lt,
              g,
              y,
              E - De
            );
          }
          var Jt = S ? n : this, Dn = G ? Jt[e] : e;
          return De = he.length, g ? he = Qf(he, g) : re && De > 1 && he.reverse(), b && y < De && (he.length = y), this && this !== Mt && this instanceof ue && (Dn = je || _l(Dn)), Dn.apply(Jt, he);
        }
        return ue;
      }
      function Ns(e, t) {
        return function(n, l) {
          return ZM(n, e, t(l), {});
        };
      }
      function lr(e, t) {
        return function(n, l) {
          var u;
          if (n === r && l === r)
            return t;
          if (n !== r && (u = n), l !== r) {
            if (u === r)
              return l;
            typeof n == "string" || typeof l == "string" ? (n = Ct(n), l = Ct(l)) : (n = es(n), l = es(l)), u = e(n, l);
          }
          return u;
        };
      }
      function su(e) {
        return pn(function(t) {
          return t = Ze(t, Et(ne())), ye(function(n) {
            var l = this;
            return e(t, function(u) {
              return xt(u, l, n);
            });
          });
        });
      }
      function rr(e, t) {
        t = t === r ? " " : Ct(t);
        var n = t.length;
        if (n < 2)
          return n ? eu(t, e) : t;
        var l = eu(t, Rl(e / $n(t)));
        return qn(t) ? En(Kt(l), 0, e).join("") : l.slice(0, e);
      }
      function _f(e, t, n, l) {
        var u = t & B, a = _l(e);
        function c() {
          for (var g = -1, y = arguments.length, E = -1, b = l.length, S = Y(b + y), G = this && this !== Mt && this instanceof c ? a : e; ++E < b; )
            S[E] = l[E];
          for (; y--; )
            S[E++] = arguments[++g];
          return xt(G, u ? n : this, S);
        }
        return c;
      }
      function ps(e) {
        return function(t, n, l) {
          return l && typeof l != "number" && Yt(t, n, l) && (n = l = r), t = yn(t), n === r ? (n = t, t = 0) : n = yn(n), l = l === r ? t < n ? 1 : -1 : yn(l), uf(t, n, l, e);
        };
      }
      function ur(e) {
        return function(t, n) {
          return typeof t == "string" && typeof n == "string" || (t = Wt(t), n = Wt(n)), e(t, n);
        };
      }
      function js(e, t, n, l, u, a, c, g, y, E) {
        var b = t & ee, S = b ? c : r, G = b ? r : c, J = b ? a : r, re = b ? r : a;
        t |= b ? A : k, t &= ~(b ? k : A), t & oe || (t &= ~(B | q));
        var je = [
          e,
          t,
          u,
          J,
          S,
          re,
          G,
          g,
          y,
          E
        ], ue = n.apply(r, je);
        return Nu(e) && Ts(ue, je), ue.placeholder = l, Ls(ue, e, t);
      }
      function iu(e) {
        var t = ot[e];
        return function(n, l) {
          if (n = Wt(n), l = l == null ? 0 : jt(Ne(l), 292), l && Lo(n)) {
            var u = (Le(n) + "e").split("e"), a = t(u[0] + "e" + (+u[1] + l));
            return u = (Le(a) + "e").split("e"), +(u[0] + "e" + (+u[1] - l));
          }
          return t(n);
        };
      }
      var mf = el && 1 / bl(new el([, -0]))[1] == x ? function(e) {
        return new el(e);
      } : Lu;
      function zs(e) {
        return function(t) {
          var n = zt(t);
          return n == Nt ? kr(t) : n == Ve ? kc(t) : Lc(t, e(t));
        };
      }
      function Nn(e, t, n, l, u, a, c, g) {
        var y = t & q;
        if (!y && typeof e != "function")
          throw new Qt(m);
        var E = l ? l.length : 0;
        if (E || (t &= ~(A | k), l = u = r), c = c === r ? c : st(Ne(c), 0), g = g === r ? g : Ne(g), E -= u ? u.length : 0, t & k) {
          var b = l, S = u;
          l = u = r;
        }
        var G = y ? r : Mu(e), J = [
          e,
          t,
          n,
          l,
          u,
          b,
          S,
          a,
          c,
          g
        ];
        if (G && Bf(J, G), e = J[0], t = J[1], n = J[2], l = J[3], u = J[4], g = J[9] = J[9] === r ? y ? 0 : e.length : st(J[9] - E, 0), !g && t & (ee | ce) && (t &= ~(ee | ce)), !t || t == B)
          var re = yf(e, t, n);
        else
          t == ee || t == ce ? re = Df(e, t, g) : (t == A || t == (B | A)) && !u.length ? re = _f(e, t, n, l) : re = nr.apply(r, J);
        var je = G ? Jo : Ts;
        return Ls(je(re, J), e, t);
      }
      function ys(e, t, n, l) {
        return e === r || $t(e, Xn[n]) && !Ce.call(l, n) ? t : e;
      }
      function Ds(e, t, n, l, u, a) {
        return $e(e) && $e(t) && (a.set(t, e), Jl(e, t, r, Ds, a), a.delete(t)), e;
      }
      function hf(e) {
        return Yl(e) ? r : e;
      }
      function _s(e, t, n, l, u, a) {
        var c = n & L, g = e.length, y = t.length;
        if (g != y && !(c && y > g))
          return !1;
        var E = a.get(e), b = a.get(t);
        if (E && b)
          return E == t && b == e;
        var S = -1, G = !0, J = n & U ? new Un() : r;
        for (a.set(e, t), a.set(t, e); ++S < g; ) {
          var re = e[S], je = t[S];
          if (l)
            var ue = c ? l(je, re, S, t, e, a) : l(re, je, S, e, t, a);
          if (ue !== r) {
            if (ue)
              continue;
            G = !1;
            break;
          }
          if (J) {
            if (!Er(t, function(De, he) {
              if (!cl(J, he) && (re === De || u(re, De, n, l, a)))
                return J.push(he);
            })) {
              G = !1;
              break;
            }
          } else if (!(re === je || u(re, je, n, l, a))) {
            G = !1;
            break;
          }
        }
        return a.delete(e), a.delete(t), G;
      }
      function Yf(e, t, n, l, u, a, c) {
        switch (n) {
          case ze:
            if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
              return !1;
            e = e.buffer, t = t.buffer;
          case ln:
            return !(e.byteLength != t.byteLength || !a(new Ql(e), new Ql(t)));
          case dt:
          case Gt:
          case nn:
            return $t(+e, +t);
          case Zt:
            return e.name == t.name && e.message == t.message;
          case ut:
          case ct:
            return e == t + "";
          case Nt:
            var g = kr;
          case Ve:
            var y = l & L;
            if (g || (g = bl), e.size != t.size && !y)
              return !1;
            var E = c.get(e);
            if (E)
              return E == t;
            l |= U, c.set(e, t);
            var b = _s(g(e), g(t), l, u, a, c);
            return c.delete(e), b;
          case Bt:
            if (Nl)
              return Nl.call(e) == Nl.call(t);
        }
        return !1;
      }
      function If(e, t, n, l, u, a) {
        var c = n & L, g = au(e), y = g.length, E = au(t), b = E.length;
        if (y != b && !c)
          return !1;
        for (var S = y; S--; ) {
          var G = g[S];
          if (!(c ? G in t : Ce.call(t, G)))
            return !1;
        }
        var J = a.get(e), re = a.get(t);
        if (J && re)
          return J == t && re == e;
        var je = !0;
        a.set(e, t), a.set(t, e);
        for (var ue = c; ++S < y; ) {
          G = g[S];
          var De = e[G], he = t[G];
          if (l)
            var Ot = c ? l(he, De, G, t, e, a) : l(De, he, G, e, t, a);
          if (!(Ot === r ? De === he || u(De, he, n, l, a) : Ot)) {
            je = !1;
            break;
          }
          ue || (ue = G == "constructor");
        }
        if (je && !ue) {
          var It = e.constructor, St = t.constructor;
          It != St && "constructor" in e && "constructor" in t && !(typeof It == "function" && It instanceof It && typeof St == "function" && St instanceof St) && (je = !1);
        }
        return a.delete(e), a.delete(t), je;
      }
      function pn(e) {
        return ju(ws(e, r, Ss), e + "");
      }
      function au(e) {
        return Po(e, it, gu);
      }
      function cu(e) {
        return Po(e, At, ms);
      }
      var Mu = Gl ? function(e) {
        return Gl.get(e);
      } : Lu;
      function or(e) {
        for (var t = e.name + "", n = tl[t], l = Ce.call(tl, t) ? n.length : 0; l--; ) {
          var u = n[l], a = u.func;
          if (a == null || a == e)
            return u.name;
        }
        return t;
      }
      function ul(e) {
        var t = Ce.call(i, "placeholder") ? i : e;
        return t.placeholder;
      }
      function ne() {
        var e = i.iteratee || Au;
        return e = e === Au ? Ro : e, arguments.length ? e(arguments[0], arguments[1]) : e;
      }
      function sr(e, t) {
        var n = e.__data__;
        return Cf(t) ? n[typeof t == "string" ? "string" : "hash"] : n.map;
      }
      function fu(e) {
        for (var t = it(e), n = t.length; n--; ) {
          var l = t[n], u = e[l];
          t[n] = [l, u, Is(u)];
        }
        return t;
      }
      function Vn(e, t) {
        var n = Oc(e, t);
        return Fo(n) ? n : r;
      }
      function vf(e) {
        var t = Ce.call(e, Bn), n = e[Bn];
        try {
          e[Bn] = r;
          var l = !0;
        } catch {
        }
        var u = kl.call(e);
        return l && (t ? e[Bn] = n : delete e[Bn]), u;
      }
      var gu = Qr ? function(e) {
        return e == null ? [] : (e = Pe(e), In(Qr(e), function(t) {
          return Ao.call(e, t);
        }));
      } : xu, ms = Qr ? function(e) {
        for (var t = []; e; )
          vn(t, gu(e)), e = Pl(e);
        return t;
      } : xu, zt = ht;
      (Pr && zt(new Pr(new ArrayBuffer(1))) != ze || fl && zt(new fl()) != Nt || Vr && zt(Vr.resolve()) != te || el && zt(new el()) != Ve || gl && zt(new gl()) != Ht) && (zt = function(e) {
        var t = ht(e), n = t == H ? e.constructor : r, l = n ? Fn(n) : "";
        if (l)
          switch (l) {
            case sM:
              return ze;
            case iM:
              return Nt;
            case aM:
              return te;
            case cM:
              return Ve;
            case MM:
              return Ht;
          }
        return t;
      });
      function wf(e, t, n) {
        for (var l = -1, u = n.length; ++l < u; ) {
          var a = n[l], c = a.size;
          switch (a.type) {
            case "drop":
              e += c;
              break;
            case "dropRight":
              t -= c;
              break;
            case "take":
              t = jt(t, e + c);
              break;
            case "takeRight":
              e = st(e, t - c);
              break;
          }
        }
        return { start: e, end: t };
      }
      function Af(e) {
        var t = e.match(Ca);
        return t ? t[1].split(ba) : [];
      }
      function hs(e, t, n) {
        t = xn(t, e);
        for (var l = -1, u = t.length, a = !1; ++l < u; ) {
          var c = sn(t[l]);
          if (!(a = e != null && n(e, c)))
            break;
          e = e[c];
        }
        return a || ++l != u ? a : (u = e == null ? 0 : e.length, !!u && dr(u) && jn(c, u) && (Me(e) || Rn(e)));
      }
      function Tf(e) {
        var t = e.length, n = new e.constructor(t);
        return t && typeof e[0] == "string" && Ce.call(e, "index") && (n.index = e.index, n.input = e.input), n;
      }
      function Ys(e) {
        return typeof e.constructor == "function" && !ml(e) ? nl(Pl(e)) : {};
      }
      function Lf(e, t, n) {
        var l = e.constructor;
        switch (t) {
          case ln:
            return ou(e);
          case dt:
          case Gt:
            return new l(+e);
          case ze:
            return gf(e, n);
          case tt:
          case pt:
          case Qe:
          case rn:
          case Yn:
          case al:
          case zr:
          case yr:
          case Dr:
            return os(e, n);
          case Nt:
            return new l();
          case nn:
          case ct:
            return new l(e);
          case ut:
            return df(e);
          case Ve:
            return new l();
          case Bt:
            return Nf(e);
        }
      }
      function xf(e, t) {
        var n = t.length;
        if (!n)
          return e;
        var l = n - 1;
        return t[l] = (n > 1 ? "& " : "") + t[l], t = t.join(n > 2 ? ", " : " "), e.replace(Ea, `{
/* [wrapped with ` + t + `] */
`);
      }
      function Ef(e) {
        return Me(e) || Rn(e) || !!(To && e && e[To]);
      }
      function jn(e, t) {
        var n = typeof e;
        return t = t ?? $, !!t && (n == "number" || n != "symbol" && Fa.test(e)) && e > -1 && e % 1 == 0 && e < t;
      }
      function Yt(e, t, n) {
        if (!$e(n))
          return !1;
        var l = typeof t;
        return (l == "number" ? wt(n) && jn(t, n.length) : l == "string" && t in n) ? $t(n[t], e) : !1;
      }
      function du(e, t) {
        if (Me(e))
          return !1;
        var n = typeof e;
        return n == "number" || n == "symbol" || n == "boolean" || e == null || bt(e) ? !0 : Aa.test(e) || !wa.test(e) || t != null && e in Pe(t);
      }
      function Cf(e) {
        var t = typeof e;
        return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
      }
      function Nu(e) {
        var t = or(e), n = i[t];
        if (typeof n != "function" || !(t in _e.prototype))
          return !1;
        if (e === n)
          return !0;
        var l = Mu(n);
        return !!l && e === l[0];
      }
      function bf(e) {
        return !!Io && Io in e;
      }
      var Of = Sl ? zn : Eu;
      function ml(e) {
        var t = e && e.constructor, n = typeof t == "function" && t.prototype || Xn;
        return e === n;
      }
      function Is(e) {
        return e === e && !$e(e);
      }
      function vs(e, t) {
        return function(n) {
          return n == null ? !1 : n[e] === t && (t !== r || e in Pe(n));
        };
      }
      function Sf(e) {
        var t = fr(e, function(l) {
          return n.size === M && n.clear(), l;
        }), n = t.cache;
        return t;
      }
      function Bf(e, t) {
        var n = e[1], l = t[1], u = n | l, a = u < (B | q | V), c = l == V && n == ee || l == V && n == ge && e[7].length <= t[8] || l == (V | ge) && t[7].length <= t[8] && n == ee;
        if (!(a || c))
          return e;
        l & B && (e[2] = t[2], u |= n & B ? 0 : oe);
        var g = t[3];
        if (g) {
          var y = e[3];
          e[3] = y ? is(y, g, t[4]) : g, e[4] = y ? wn(e[3], z) : t[4];
        }
        return g = t[5], g && (y = e[5], e[5] = y ? as(y, g, t[6]) : g, e[6] = y ? wn(e[5], z) : t[6]), g = t[7], g && (e[7] = g), l & V && (e[8] = e[8] == null ? t[8] : jt(e[8], t[8])), e[9] == null && (e[9] = t[9]), e[0] = t[0], e[1] = u, e;
      }
      function kf(e) {
        var t = [];
        if (e != null)
          for (var n in Pe(e))
            t.push(n);
        return t;
      }
      function Uf(e) {
        return kl.call(e);
      }
      function ws(e, t, n) {
        return t = st(t === r ? e.length - 1 : t, 0), function() {
          for (var l = arguments, u = -1, a = st(l.length - t, 0), c = Y(a); ++u < a; )
            c[u] = l[t + u];
          u = -1;
          for (var g = Y(t + 1); ++u < t; )
            g[u] = l[u];
          return g[t] = n(c), xt(e, this, g);
        };
      }
      function As(e, t) {
        return t.length < 2 ? e : Pn(e, Ft(t, 0, -1));
      }
      function Qf(e, t) {
        for (var n = e.length, l = jt(t.length, n), u = vt(e); l--; ) {
          var a = t[l];
          e[l] = jn(a, n) ? u[a] : r;
        }
        return e;
      }
      function pu(e, t) {
        if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
          return e[t];
      }
      var Ts = xs(Jo), hl = eM || function(e, t) {
        return Mt.setTimeout(e, t);
      }, ju = xs(af);
      function Ls(e, t, n) {
        var l = t + "";
        return ju(e, xf(l, Pf(Af(l), n)));
      }
      function xs(e) {
        var t = 0, n = 0;
        return function() {
          var l = rM(), u = en - (l - n);
          if (n = l, u > 0) {
            if (++t >= Lt)
              return arguments[0];
          } else
            t = 0;
          return e.apply(r, arguments);
        };
      }
      function ir(e, t) {
        var n = -1, l = e.length, u = l - 1;
        for (t = t === r ? l : t; ++n < t; ) {
          var a = Xr(n, u), c = e[a];
          e[a] = e[n], e[n] = c;
        }
        return e.length = t, e;
      }
      var Es = Sf(function(e) {
        var t = [];
        return e.charCodeAt(0) === 46 && t.push(""), e.replace(Ta, function(n, l, u, a) {
          t.push(u ? a.replace(Ba, "$1") : l || n);
        }), t;
      });
      function sn(e) {
        if (typeof e == "string" || bt(e))
          return e;
        var t = e + "";
        return t == "0" && 1 / e == -x ? "-0" : t;
      }
      function Fn(e) {
        if (e != null) {
          try {
            return Bl.call(e);
          } catch {
          }
          try {
            return e + "";
          } catch {
          }
        }
        return "";
      }
      function Pf(e, t) {
        return Ut(Z, function(n) {
          var l = "_." + n[0];
          t & n[1] && !El(e, l) && e.push(l);
        }), e.sort();
      }
      function Cs(e) {
        if (e instanceof _e)
          return e.clone();
        var t = new Pt(e.__wrapped__, e.__chain__);
        return t.__actions__ = vt(e.__actions__), t.__index__ = e.__index__, t.__values__ = e.__values__, t;
      }
      function Vf(e, t, n) {
        (n ? Yt(e, t, n) : t === r) ? t = 1 : t = st(Ne(t), 0);
        var l = e == null ? 0 : e.length;
        if (!l || t < 1)
          return [];
        for (var u = 0, a = 0, c = Y(Rl(l / t)); u < l; )
          c[a++] = Ft(e, u, u += t);
        return c;
      }
      function Ff(e) {
        for (var t = -1, n = e == null ? 0 : e.length, l = 0, u = []; ++t < n; ) {
          var a = e[t];
          a && (u[l++] = a);
        }
        return u;
      }
      function Rf() {
        var e = arguments.length;
        if (!e)
          return [];
        for (var t = Y(e - 1), n = arguments[0], l = e; l--; )
          t[l - 1] = arguments[l];
        return vn(Me(n) ? vt(n) : [n], ft(t, 1));
      }
      var Wf = ye(function(e, t) {
        return nt(e) ? jl(e, ft(t, 1, nt, !0)) : [];
      }), Gf = ye(function(e, t) {
        var n = Rt(t);
        return nt(n) && (n = r), nt(e) ? jl(e, ft(t, 1, nt, !0), ne(n, 2)) : [];
      }), Zf = ye(function(e, t) {
        var n = Rt(t);
        return nt(n) && (n = r), nt(e) ? jl(e, ft(t, 1, nt, !0), r, n) : [];
      });
      function Hf(e, t, n) {
        var l = e == null ? 0 : e.length;
        return l ? (t = n || t === r ? 1 : Ne(t), Ft(e, t < 0 ? 0 : t, l)) : [];
      }
      function Kf(e, t, n) {
        var l = e == null ? 0 : e.length;
        return l ? (t = n || t === r ? 1 : Ne(t), t = l - t, Ft(e, 0, t < 0 ? 0 : t)) : [];
      }
      function qf(e, t) {
        return e && e.length ? er(e, ne(t, 3), !0, !0) : [];
      }
      function $f(e, t) {
        return e && e.length ? er(e, ne(t, 3), !0) : [];
      }
      function Jf(e, t, n, l) {
        var u = e == null ? 0 : e.length;
        return u ? (n && typeof n != "number" && Yt(e, t, n) && (n = 0, l = u), FM(e, t, n, l)) : [];
      }
      function bs(e, t, n) {
        var l = e == null ? 0 : e.length;
        if (!l)
          return -1;
        var u = n == null ? 0 : Ne(n);
        return u < 0 && (u = st(l + u, 0)), Cl(e, ne(t, 3), u);
      }
      function Os(e, t, n) {
        var l = e == null ? 0 : e.length;
        if (!l)
          return -1;
        var u = l - 1;
        return n !== r && (u = Ne(n), u = n < 0 ? st(l + u, 0) : jt(u, l - 1)), Cl(e, ne(t, 3), u, !0);
      }
      function Ss(e) {
        var t = e == null ? 0 : e.length;
        return t ? ft(e, 1) : [];
      }
      function Xf(e) {
        var t = e == null ? 0 : e.length;
        return t ? ft(e, x) : [];
      }
      function eg(e, t) {
        var n = e == null ? 0 : e.length;
        return n ? (t = t === r ? 1 : Ne(t), ft(e, t)) : [];
      }
      function tg(e) {
        for (var t = -1, n = e == null ? 0 : e.length, l = {}; ++t < n; ) {
          var u = e[t];
          l[u[0]] = u[1];
        }
        return l;
      }
      function Bs(e) {
        return e && e.length ? e[0] : r;
      }
      function ng(e, t, n) {
        var l = e == null ? 0 : e.length;
        if (!l)
          return -1;
        var u = n == null ? 0 : Ne(n);
        return u < 0 && (u = st(l + u, 0)), Kn(e, t, u);
      }
      function lg(e) {
        var t = e == null ? 0 : e.length;
        return t ? Ft(e, 0, -1) : [];
      }
      var rg = ye(function(e) {
        var t = Ze(e, ru);
        return t.length && t[0] === e[0] ? Hr(t) : [];
      }), ug = ye(function(e) {
        var t = Rt(e), n = Ze(e, ru);
        return t === Rt(n) ? t = r : n.pop(), n.length && n[0] === e[0] ? Hr(n, ne(t, 2)) : [];
      }), og = ye(function(e) {
        var t = Rt(e), n = Ze(e, ru);
        return t = typeof t == "function" ? t : r, t && n.pop(), n.length && n[0] === e[0] ? Hr(n, r, t) : [];
      });
      function sg(e, t) {
        return e == null ? "" : nM.call(e, t);
      }
      function Rt(e) {
        var t = e == null ? 0 : e.length;
        return t ? e[t - 1] : r;
      }
      function ig(e, t, n) {
        var l = e == null ? 0 : e.length;
        if (!l)
          return -1;
        var u = l;
        return n !== r && (u = Ne(n), u = u < 0 ? st(l + u, 0) : jt(u, l - 1)), t === t ? Qc(e, t, u) : Cl(e, jo, u, !0);
      }
      function ag(e, t) {
        return e && e.length ? Ho(e, Ne(t)) : r;
      }
      var cg = ye(ks);
      function ks(e, t) {
        return e && e.length && t && t.length ? Jr(e, t) : e;
      }
      function Mg(e, t, n) {
        return e && e.length && t && t.length ? Jr(e, t, ne(n, 2)) : e;
      }
      function fg(e, t, n) {
        return e && e.length && t && t.length ? Jr(e, t, r, n) : e;
      }
      var gg = pn(function(e, t) {
        var n = e == null ? 0 : e.length, l = Rr(e, t);
        return $o(e, Ze(t, function(u) {
          return jn(u, n) ? +u : u;
        }).sort(ss)), l;
      });
      function dg(e, t) {
        var n = [];
        if (!(e && e.length))
          return n;
        var l = -1, u = [], a = e.length;
        for (t = ne(t, 3); ++l < a; ) {
          var c = e[l];
          t(c, l, e) && (n.push(c), u.push(l));
        }
        return $o(e, u), n;
      }
      function zu(e) {
        return e == null ? e : oM.call(e);
      }
      function Ng(e, t, n) {
        var l = e == null ? 0 : e.length;
        return l ? (n && typeof n != "number" && Yt(e, t, n) ? (t = 0, n = l) : (t = t == null ? 0 : Ne(t), n = n === r ? l : Ne(n)), Ft(e, t, n)) : [];
      }
      function pg(e, t) {
        return Xl(e, t);
      }
      function jg(e, t, n) {
        return tu(e, t, ne(n, 2));
      }
      function zg(e, t) {
        var n = e == null ? 0 : e.length;
        if (n) {
          var l = Xl(e, t);
          if (l < n && $t(e[l], t))
            return l;
        }
        return -1;
      }
      function yg(e, t) {
        return Xl(e, t, !0);
      }
      function Dg(e, t, n) {
        return tu(e, t, ne(n, 2), !0);
      }
      function _g(e, t) {
        var n = e == null ? 0 : e.length;
        if (n) {
          var l = Xl(e, t, !0) - 1;
          if ($t(e[l], t))
            return l;
        }
        return -1;
      }
      function mg(e) {
        return e && e.length ? Xo(e) : [];
      }
      function hg(e, t) {
        return e && e.length ? Xo(e, ne(t, 2)) : [];
      }
      function Yg(e) {
        var t = e == null ? 0 : e.length;
        return t ? Ft(e, 1, t) : [];
      }
      function Ig(e, t, n) {
        return e && e.length ? (t = n || t === r ? 1 : Ne(t), Ft(e, 0, t < 0 ? 0 : t)) : [];
      }
      function vg(e, t, n) {
        var l = e == null ? 0 : e.length;
        return l ? (t = n || t === r ? 1 : Ne(t), t = l - t, Ft(e, t < 0 ? 0 : t, l)) : [];
      }
      function wg(e, t) {
        return e && e.length ? er(e, ne(t, 3), !1, !0) : [];
      }
      function Ag(e, t) {
        return e && e.length ? er(e, ne(t, 3)) : [];
      }
      var Tg = ye(function(e) {
        return Ln(ft(e, 1, nt, !0));
      }), Lg = ye(function(e) {
        var t = Rt(e);
        return nt(t) && (t = r), Ln(ft(e, 1, nt, !0), ne(t, 2));
      }), xg = ye(function(e) {
        var t = Rt(e);
        return t = typeof t == "function" ? t : r, Ln(ft(e, 1, nt, !0), r, t);
      });
      function Eg(e) {
        return e && e.length ? Ln(e) : [];
      }
      function Cg(e, t) {
        return e && e.length ? Ln(e, ne(t, 2)) : [];
      }
      function bg(e, t) {
        return t = typeof t == "function" ? t : r, e && e.length ? Ln(e, r, t) : [];
      }
      function yu(e) {
        if (!(e && e.length))
          return [];
        var t = 0;
        return e = In(e, function(n) {
          if (nt(n))
            return t = st(n.length, t), !0;
        }), Sr(t, function(n) {
          return Ze(e, Cr(n));
        });
      }
      function Us(e, t) {
        if (!(e && e.length))
          return [];
        var n = yu(e);
        return t == null ? n : Ze(n, function(l) {
          return xt(t, r, l);
        });
      }
      var Og = ye(function(e, t) {
        return nt(e) ? jl(e, t) : [];
      }), Sg = ye(function(e) {
        return lu(In(e, nt));
      }), Bg = ye(function(e) {
        var t = Rt(e);
        return nt(t) && (t = r), lu(In(e, nt), ne(t, 2));
      }), kg = ye(function(e) {
        var t = Rt(e);
        return t = typeof t == "function" ? t : r, lu(In(e, nt), r, t);
      }), Ug = ye(yu);
      function Qg(e, t) {
        return ls(e || [], t || [], pl);
      }
      function Pg(e, t) {
        return ls(e || [], t || [], Dl);
      }
      var Vg = ye(function(e) {
        var t = e.length, n = t > 1 ? e[t - 1] : r;
        return n = typeof n == "function" ? (e.pop(), n) : r, Us(e, n);
      });
      function Qs(e) {
        var t = i(e);
        return t.__chain__ = !0, t;
      }
      function Fg(e, t) {
        return t(e), e;
      }
      function ar(e, t) {
        return t(e);
      }
      var Rg = pn(function(e) {
        var t = e.length, n = t ? e[0] : 0, l = this.__wrapped__, u = function(a) {
          return Rr(a, e);
        };
        return t > 1 || this.__actions__.length || !(l instanceof _e) || !jn(n) ? this.thru(u) : (l = l.slice(n, +n + (t ? 1 : 0)), l.__actions__.push({
          func: ar,
          args: [u],
          thisArg: r
        }), new Pt(l, this.__chain__).thru(function(a) {
          return t && !a.length && a.push(r), a;
        }));
      });
      function Wg() {
        return Qs(this);
      }
      function Gg() {
        return new Pt(this.value(), this.__chain__);
      }
      function Zg() {
        this.__values__ === r && (this.__values__ = ei(this.value()));
        var e = this.__index__ >= this.__values__.length, t = e ? r : this.__values__[this.__index__++];
        return { done: e, value: t };
      }
      function Hg() {
        return this;
      }
      function Kg(e) {
        for (var t, n = this; n instanceof Hl; ) {
          var l = Cs(n);
          l.__index__ = 0, l.__values__ = r, t ? u.__wrapped__ = l : t = l;
          var u = l;
          n = n.__wrapped__;
        }
        return u.__wrapped__ = e, t;
      }
      function qg() {
        var e = this.__wrapped__;
        if (e instanceof _e) {
          var t = e;
          return this.__actions__.length && (t = new _e(this)), t = t.reverse(), t.__actions__.push({
            func: ar,
            args: [zu],
            thisArg: r
          }), new Pt(t, this.__chain__);
        }
        return this.thru(zu);
      }
      function $g() {
        return ns(this.__wrapped__, this.__actions__);
      }
      var Jg = tr(function(e, t, n) {
        Ce.call(e, n) ? ++e[n] : dn(e, n, 1);
      });
      function Xg(e, t, n) {
        var l = Me(e) ? No : VM;
        return n && Yt(e, t, n) && (t = r), l(e, ne(t, 3));
      }
      function ed(e, t) {
        var n = Me(e) ? In : Uo;
        return n(e, ne(t, 3));
      }
      var td = gs(bs), nd = gs(Os);
      function ld(e, t) {
        return ft(cr(e, t), 1);
      }
      function rd(e, t) {
        return ft(cr(e, t), x);
      }
      function ud(e, t, n) {
        return n = n === r ? 1 : Ne(n), ft(cr(e, t), n);
      }
      function Ps(e, t) {
        var n = Me(e) ? Ut : Tn;
        return n(e, ne(t, 3));
      }
      function Vs(e, t) {
        var n = Me(e) ? hc : ko;
        return n(e, ne(t, 3));
      }
      var od = tr(function(e, t, n) {
        Ce.call(e, n) ? e[n].push(t) : dn(e, n, [t]);
      });
      function sd(e, t, n, l) {
        e = wt(e) ? e : sl(e), n = n && !l ? Ne(n) : 0;
        var u = e.length;
        return n < 0 && (n = st(u + n, 0)), Nr(e) ? n <= u && e.indexOf(t, n) > -1 : !!u && Kn(e, t, n) > -1;
      }
      var id = ye(function(e, t, n) {
        var l = -1, u = typeof t == "function", a = wt(e) ? Y(e.length) : [];
        return Tn(e, function(c) {
          a[++l] = u ? xt(t, c, n) : zl(c, t, n);
        }), a;
      }), ad = tr(function(e, t, n) {
        dn(e, n, t);
      });
      function cr(e, t) {
        var n = Me(e) ? Ze : Wo;
        return n(e, ne(t, 3));
      }
      function cd(e, t, n, l) {
        return e == null ? [] : (Me(t) || (t = t == null ? [] : [t]), n = l ? r : n, Me(n) || (n = n == null ? [] : [n]), Ko(e, t, n));
      }
      var Md = tr(function(e, t, n) {
        e[n ? 0 : 1].push(t);
      }, function() {
        return [[], []];
      });
      function fd(e, t, n) {
        var l = Me(e) ? xr : yo, u = arguments.length < 3;
        return l(e, ne(t, 4), n, u, Tn);
      }
      function gd(e, t, n) {
        var l = Me(e) ? Yc : yo, u = arguments.length < 3;
        return l(e, ne(t, 4), n, u, ko);
      }
      function dd(e, t) {
        var n = Me(e) ? In : Uo;
        return n(e, gr(ne(t, 3)));
      }
      function Nd(e) {
        var t = Me(e) ? bo : of;
        return t(e);
      }
      function pd(e, t, n) {
        (n ? Yt(e, t, n) : t === r) ? t = 1 : t = Ne(t);
        var l = Me(e) ? BM : sf;
        return l(e, t);
      }
      function jd(e) {
        var t = Me(e) ? kM : cf;
        return t(e);
      }
      function zd(e) {
        if (e == null)
          return 0;
        if (wt(e))
          return Nr(e) ? $n(e) : e.length;
        var t = zt(e);
        return t == Nt || t == Ve ? e.size : qr(e).length;
      }
      function yd(e, t, n) {
        var l = Me(e) ? Er : Mf;
        return n && Yt(e, t, n) && (t = r), l(e, ne(t, 3));
      }
      var Dd = ye(function(e, t) {
        if (e == null)
          return [];
        var n = t.length;
        return n > 1 && Yt(e, t[0], t[1]) ? t = [] : n > 2 && Yt(t[0], t[1], t[2]) && (t = [t[0]]), Ko(e, ft(t, 1), []);
      }), Mr = Xc || function() {
        return Mt.Date.now();
      };
      function _d(e, t) {
        if (typeof t != "function")
          throw new Qt(m);
        return e = Ne(e), function() {
          if (--e < 1)
            return t.apply(this, arguments);
        };
      }
      function Fs(e, t, n) {
        return t = n ? r : t, t = e && t == null ? e.length : t, Nn(e, V, r, r, r, r, t);
      }
      function Rs(e, t) {
        var n;
        if (typeof t != "function")
          throw new Qt(m);
        return e = Ne(e), function() {
          return --e > 0 && (n = t.apply(this, arguments)), e <= 1 && (t = r), n;
        };
      }
      var Du = ye(function(e, t, n) {
        var l = B;
        if (n.length) {
          var u = wn(n, ul(Du));
          l |= A;
        }
        return Nn(e, l, t, n, u);
      }), Ws = ye(function(e, t, n) {
        var l = B | q;
        if (n.length) {
          var u = wn(n, ul(Ws));
          l |= A;
        }
        return Nn(t, l, e, n, u);
      });
      function Gs(e, t, n) {
        t = n ? r : t;
        var l = Nn(e, ee, r, r, r, r, r, t);
        return l.placeholder = Gs.placeholder, l;
      }
      function Zs(e, t, n) {
        t = n ? r : t;
        var l = Nn(e, ce, r, r, r, r, r, t);
        return l.placeholder = Zs.placeholder, l;
      }
      function Hs(e, t, n) {
        var l, u, a, c, g, y, E = 0, b = !1, S = !1, G = !0;
        if (typeof e != "function")
          throw new Qt(m);
        t = Wt(t) || 0, $e(n) && (b = !!n.leading, S = "maxWait" in n, a = S ? st(Wt(n.maxWait) || 0, t) : a, G = "trailing" in n ? !!n.trailing : G);
        function J(lt) {
          var Jt = l, Dn = u;
          return l = u = r, E = lt, c = e.apply(Dn, Jt), c;
        }
        function re(lt) {
          return E = lt, g = hl(De, t), b ? J(lt) : c;
        }
        function je(lt) {
          var Jt = lt - y, Dn = lt - E, gi = t - Jt;
          return S ? jt(gi, a - Dn) : gi;
        }
        function ue(lt) {
          var Jt = lt - y, Dn = lt - E;
          return y === r || Jt >= t || Jt < 0 || S && Dn >= a;
        }
        function De() {
          var lt = Mr();
          if (ue(lt))
            return he(lt);
          g = hl(De, je(lt));
        }
        function he(lt) {
          return g = r, G && l ? J(lt) : (l = u = r, c);
        }
        function Ot() {
          g !== r && rs(g), E = 0, l = y = u = g = r;
        }
        function It() {
          return g === r ? c : he(Mr());
        }
        function St() {
          var lt = Mr(), Jt = ue(lt);
          if (l = arguments, u = this, y = lt, Jt) {
            if (g === r)
              return re(y);
            if (S)
              return rs(g), g = hl(De, t), J(y);
          }
          return g === r && (g = hl(De, t)), c;
        }
        return St.cancel = Ot, St.flush = It, St;
      }
      var md = ye(function(e, t) {
        return Bo(e, 1, t);
      }), hd = ye(function(e, t, n) {
        return Bo(e, Wt(t) || 0, n);
      });
      function Yd(e) {
        return Nn(e, Ue);
      }
      function fr(e, t) {
        if (typeof e != "function" || t != null && typeof t != "function")
          throw new Qt(m);
        var n = function() {
          var l = arguments, u = t ? t.apply(this, l) : l[0], a = n.cache;
          if (a.has(u))
            return a.get(u);
          var c = e.apply(this, l);
          return n.cache = a.set(u, c) || a, c;
        };
        return n.cache = new (fr.Cache || gn)(), n;
      }
      fr.Cache = gn;
      function gr(e) {
        if (typeof e != "function")
          throw new Qt(m);
        return function() {
          var t = arguments;
          switch (t.length) {
            case 0:
              return !e.call(this);
            case 1:
              return !e.call(this, t[0]);
            case 2:
              return !e.call(this, t[0], t[1]);
            case 3:
              return !e.call(this, t[0], t[1], t[2]);
          }
          return !e.apply(this, t);
        };
      }
      function Id(e) {
        return Rs(2, e);
      }
      var vd = ff(function(e, t) {
        t = t.length == 1 && Me(t[0]) ? Ze(t[0], Et(ne())) : Ze(ft(t, 1), Et(ne()));
        var n = t.length;
        return ye(function(l) {
          for (var u = -1, a = jt(l.length, n); ++u < a; )
            l[u] = t[u].call(this, l[u]);
          return xt(e, this, l);
        });
      }), _u = ye(function(e, t) {
        var n = wn(t, ul(_u));
        return Nn(e, A, r, t, n);
      }), Ks = ye(function(e, t) {
        var n = wn(t, ul(Ks));
        return Nn(e, k, r, t, n);
      }), wd = pn(function(e, t) {
        return Nn(e, ge, r, r, r, t);
      });
      function Ad(e, t) {
        if (typeof e != "function")
          throw new Qt(m);
        return t = t === r ? t : Ne(t), ye(e, t);
      }
      function Td(e, t) {
        if (typeof e != "function")
          throw new Qt(m);
        return t = t == null ? 0 : st(Ne(t), 0), ye(function(n) {
          var l = n[t], u = En(n, 0, t);
          return l && vn(u, l), xt(e, this, u);
        });
      }
      function Ld(e, t, n) {
        var l = !0, u = !0;
        if (typeof e != "function")
          throw new Qt(m);
        return $e(n) && (l = "leading" in n ? !!n.leading : l, u = "trailing" in n ? !!n.trailing : u), Hs(e, t, {
          leading: l,
          maxWait: t,
          trailing: u
        });
      }
      function xd(e) {
        return Fs(e, 1);
      }
      function Ed(e, t) {
        return _u(uu(t), e);
      }
      function Cd() {
        if (!arguments.length)
          return [];
        var e = arguments[0];
        return Me(e) ? e : [e];
      }
      function bd(e) {
        return Vt(e, C);
      }
      function Od(e, t) {
        return t = typeof t == "function" ? t : r, Vt(e, C, t);
      }
      function Sd(e) {
        return Vt(e, I | C);
      }
      function Bd(e, t) {
        return t = typeof t == "function" ? t : r, Vt(e, I | C, t);
      }
      function kd(e, t) {
        return t == null || So(e, t, it(t));
      }
      function $t(e, t) {
        return e === t || e !== e && t !== t;
      }
      var Ud = ur(Zr), Qd = ur(function(e, t) {
        return e >= t;
      }), Rn = Vo(function() {
        return arguments;
      }()) ? Vo : function(e) {
        return Je(e) && Ce.call(e, "callee") && !Ao.call(e, "callee");
      }, Me = Y.isArray, Pd = io ? Et(io) : HM;
      function wt(e) {
        return e != null && dr(e.length) && !zn(e);
      }
      function nt(e) {
        return Je(e) && wt(e);
      }
      function Vd(e) {
        return e === !0 || e === !1 || Je(e) && ht(e) == dt;
      }
      var Cn = tM || Eu, Fd = ao ? Et(ao) : KM;
      function Rd(e) {
        return Je(e) && e.nodeType === 1 && !Yl(e);
      }
      function Wd(e) {
        if (e == null)
          return !0;
        if (wt(e) && (Me(e) || typeof e == "string" || typeof e.splice == "function" || Cn(e) || ol(e) || Rn(e)))
          return !e.length;
        var t = zt(e);
        if (t == Nt || t == Ve)
          return !e.size;
        if (ml(e))
          return !qr(e).length;
        for (var n in e)
          if (Ce.call(e, n))
            return !1;
        return !0;
      }
      function Gd(e, t) {
        return yl(e, t);
      }
      function Zd(e, t, n) {
        n = typeof n == "function" ? n : r;
        var l = n ? n(e, t) : r;
        return l === r ? yl(e, t, r, n) : !!l;
      }
      function mu(e) {
        if (!Je(e))
          return !1;
        var t = ht(e);
        return t == Zt || t == Gn || typeof e.message == "string" && typeof e.name == "string" && !Yl(e);
      }
      function Hd(e) {
        return typeof e == "number" && Lo(e);
      }
      function zn(e) {
        if (!$e(e))
          return !1;
        var t = ht(e);
        return t == Mn || t == On || t == gt || t == et;
      }
      function qs(e) {
        return typeof e == "number" && e == Ne(e);
      }
      function dr(e) {
        return typeof e == "number" && e > -1 && e % 1 == 0 && e <= $;
      }
      function $e(e) {
        var t = typeof e;
        return e != null && (t == "object" || t == "function");
      }
      function Je(e) {
        return e != null && typeof e == "object";
      }
      var $s = co ? Et(co) : $M;
      function Kd(e, t) {
        return e === t || Kr(e, t, fu(t));
      }
      function qd(e, t, n) {
        return n = typeof n == "function" ? n : r, Kr(e, t, fu(t), n);
      }
      function $d(e) {
        return Js(e) && e != +e;
      }
      function Jd(e) {
        if (Of(e))
          throw new ie(j);
        return Fo(e);
      }
      function Xd(e) {
        return e === null;
      }
      function eN(e) {
        return e == null;
      }
      function Js(e) {
        return typeof e == "number" || Je(e) && ht(e) == nn;
      }
      function Yl(e) {
        if (!Je(e) || ht(e) != H)
          return !1;
        var t = Pl(e);
        if (t === null)
          return !0;
        var n = Ce.call(t, "constructor") && t.constructor;
        return typeof n == "function" && n instanceof n && Bl.call(n) == Kc;
      }
      var hu = Mo ? Et(Mo) : JM;
      function tN(e) {
        return qs(e) && e >= -$ && e <= $;
      }
      var Xs = fo ? Et(fo) : XM;
      function Nr(e) {
        return typeof e == "string" || !Me(e) && Je(e) && ht(e) == ct;
      }
      function bt(e) {
        return typeof e == "symbol" || Je(e) && ht(e) == Bt;
      }
      var ol = go ? Et(go) : ef;
      function nN(e) {
        return e === r;
      }
      function lN(e) {
        return Je(e) && zt(e) == Ht;
      }
      function rN(e) {
        return Je(e) && ht(e) == Zn;
      }
      var uN = ur($r), oN = ur(function(e, t) {
        return e <= t;
      });
      function ei(e) {
        if (!e)
          return [];
        if (wt(e))
          return Nr(e) ? Kt(e) : vt(e);
        if (Ml && e[Ml])
          return Bc(e[Ml]());
        var t = zt(e), n = t == Nt ? kr : t == Ve ? bl : sl;
        return n(e);
      }
      function yn(e) {
        if (!e)
          return e === 0 ? e : 0;
        if (e = Wt(e), e === x || e === -x) {
          var t = e < 0 ? -1 : 1;
          return t * de;
        }
        return e === e ? e : 0;
      }
      function Ne(e) {
        var t = yn(e), n = t % 1;
        return t === t ? n ? t - n : t : 0;
      }
      function ti(e) {
        return e ? Qn(Ne(e), 0, Re) : 0;
      }
      function Wt(e) {
        if (typeof e == "number")
          return e;
        if (bt(e))
          return Be;
        if ($e(e)) {
          var t = typeof e.valueOf == "function" ? e.valueOf() : e;
          e = $e(t) ? t + "" : t;
        }
        if (typeof e != "string")
          return e === 0 ? e : +e;
        e = Do(e);
        var n = Qa.test(e);
        return n || Va.test(e) ? Dc(e.slice(2), n ? 2 : 8) : Ua.test(e) ? Be : +e;
      }
      function ni(e) {
        return on(e, At(e));
      }
      function sN(e) {
        return e ? Qn(Ne(e), -$, $) : e === 0 ? e : 0;
      }
      function Le(e) {
        return e == null ? "" : Ct(e);
      }
      var iN = ll(function(e, t) {
        if (ml(t) || wt(t)) {
          on(t, it(t), e);
          return;
        }
        for (var n in t)
          Ce.call(t, n) && pl(e, n, t[n]);
      }), li = ll(function(e, t) {
        on(t, At(t), e);
      }), pr = ll(function(e, t, n, l) {
        on(t, At(t), e, l);
      }), aN = ll(function(e, t, n, l) {
        on(t, it(t), e, l);
      }), cN = pn(Rr);
      function MN(e, t) {
        var n = nl(e);
        return t == null ? n : Oo(n, t);
      }
      var fN = ye(function(e, t) {
        e = Pe(e);
        var n = -1, l = t.length, u = l > 2 ? t[2] : r;
        for (u && Yt(t[0], t[1], u) && (l = 1); ++n < l; )
          for (var a = t[n], c = At(a), g = -1, y = c.length; ++g < y; ) {
            var E = c[g], b = e[E];
            (b === r || $t(b, Xn[E]) && !Ce.call(e, E)) && (e[E] = a[E]);
          }
        return e;
      }), gN = ye(function(e) {
        return e.push(r, Ds), xt(ri, r, e);
      });
      function dN(e, t) {
        return po(e, ne(t, 3), un);
      }
      function NN(e, t) {
        return po(e, ne(t, 3), Gr);
      }
      function pN(e, t) {
        return e == null ? e : Wr(e, ne(t, 3), At);
      }
      function jN(e, t) {
        return e == null ? e : Qo(e, ne(t, 3), At);
      }
      function zN(e, t) {
        return e && un(e, ne(t, 3));
      }
      function yN(e, t) {
        return e && Gr(e, ne(t, 3));
      }
      function DN(e) {
        return e == null ? [] : $l(e, it(e));
      }
      function _N(e) {
        return e == null ? [] : $l(e, At(e));
      }
      function Yu(e, t, n) {
        var l = e == null ? r : Pn(e, t);
        return l === r ? n : l;
      }
      function mN(e, t) {
        return e != null && hs(e, t, RM);
      }
      function Iu(e, t) {
        return e != null && hs(e, t, WM);
      }
      var hN = Ns(function(e, t, n) {
        t != null && typeof t.toString != "function" && (t = kl.call(t)), e[t] = n;
      }, wu(Tt)), YN = Ns(function(e, t, n) {
        t != null && typeof t.toString != "function" && (t = kl.call(t)), Ce.call(e, t) ? e[t].push(n) : e[t] = [n];
      }, ne), IN = ye(zl);
      function it(e) {
        return wt(e) ? Co(e) : qr(e);
      }
      function At(e) {
        return wt(e) ? Co(e, !0) : tf(e);
      }
      function vN(e, t) {
        var n = {};
        return t = ne(t, 3), un(e, function(l, u, a) {
          dn(n, t(l, u, a), l);
        }), n;
      }
      function wN(e, t) {
        var n = {};
        return t = ne(t, 3), un(e, function(l, u, a) {
          dn(n, u, t(l, u, a));
        }), n;
      }
      var AN = ll(function(e, t, n) {
        Jl(e, t, n);
      }), ri = ll(function(e, t, n, l) {
        Jl(e, t, n, l);
      }), TN = pn(function(e, t) {
        var n = {};
        if (e == null)
          return n;
        var l = !1;
        t = Ze(t, function(a) {
          return a = xn(a, e), l || (l = a.length > 1), a;
        }), on(e, cu(e), n), l && (n = Vt(n, I | O | C, hf));
        for (var u = t.length; u--; )
          nu(n, t[u]);
        return n;
      });
      function LN(e, t) {
        return ui(e, gr(ne(t)));
      }
      var xN = pn(function(e, t) {
        return e == null ? {} : lf(e, t);
      });
      function ui(e, t) {
        if (e == null)
          return {};
        var n = Ze(cu(e), function(l) {
          return [l];
        });
        return t = ne(t), qo(e, n, function(l, u) {
          return t(l, u[0]);
        });
      }
      function EN(e, t, n) {
        t = xn(t, e);
        var l = -1, u = t.length;
        for (u || (u = 1, e = r); ++l < u; ) {
          var a = e == null ? r : e[sn(t[l])];
          a === r && (l = u, a = n), e = zn(a) ? a.call(e) : a;
        }
        return e;
      }
      function CN(e, t, n) {
        return e == null ? e : Dl(e, t, n);
      }
      function bN(e, t, n, l) {
        return l = typeof l == "function" ? l : r, e == null ? e : Dl(e, t, n, l);
      }
      var oi = zs(it), si = zs(At);
      function ON(e, t, n) {
        var l = Me(e), u = l || Cn(e) || ol(e);
        if (t = ne(t, 4), n == null) {
          var a = e && e.constructor;
          u ? n = l ? new a() : [] : $e(e) ? n = zn(a) ? nl(Pl(e)) : {} : n = {};
        }
        return (u ? Ut : un)(e, function(c, g, y) {
          return t(n, c, g, y);
        }), n;
      }
      function SN(e, t) {
        return e == null ? !0 : nu(e, t);
      }
      function BN(e, t, n) {
        return e == null ? e : ts(e, t, uu(n));
      }
      function kN(e, t, n, l) {
        return l = typeof l == "function" ? l : r, e == null ? e : ts(e, t, uu(n), l);
      }
      function sl(e) {
        return e == null ? [] : Br(e, it(e));
      }
      function UN(e) {
        return e == null ? [] : Br(e, At(e));
      }
      function QN(e, t, n) {
        return n === r && (n = t, t = r), n !== r && (n = Wt(n), n = n === n ? n : 0), t !== r && (t = Wt(t), t = t === t ? t : 0), Qn(Wt(e), t, n);
      }
      function PN(e, t, n) {
        return t = yn(t), n === r ? (n = t, t = 0) : n = yn(n), e = Wt(e), GM(e, t, n);
      }
      function VN(e, t, n) {
        if (n && typeof n != "boolean" && Yt(e, t, n) && (t = n = r), n === r && (typeof t == "boolean" ? (n = t, t = r) : typeof e == "boolean" && (n = e, e = r)), e === r && t === r ? (e = 0, t = 1) : (e = yn(e), t === r ? (t = e, e = 0) : t = yn(t)), e > t) {
          var l = e;
          e = t, t = l;
        }
        if (n || e % 1 || t % 1) {
          var u = xo();
          return jt(e + u * (t - e + yc("1e-" + ((u + "").length - 1))), t);
        }
        return Xr(e, t);
      }
      var FN = rl(function(e, t, n) {
        return t = t.toLowerCase(), e + (n ? ii(t) : t);
      });
      function ii(e) {
        return vu(Le(e).toLowerCase());
      }
      function ai(e) {
        return e = Le(e), e && e.replace(Ra, Ec).replace(ac, "");
      }
      function RN(e, t, n) {
        e = Le(e), t = Ct(t);
        var l = e.length;
        n = n === r ? l : Qn(Ne(n), 0, l);
        var u = n;
        return n -= t.length, n >= 0 && e.slice(n, u) == t;
      }
      function WN(e) {
        return e = Le(e), e && Ya.test(e) ? e.replace(Uu, Cc) : e;
      }
      function GN(e) {
        return e = Le(e), e && La.test(e) ? e.replace(_r, "\\$&") : e;
      }
      var ZN = rl(function(e, t, n) {
        return e + (n ? "-" : "") + t.toLowerCase();
      }), HN = rl(function(e, t, n) {
        return e + (n ? " " : "") + t.toLowerCase();
      }), KN = fs("toLowerCase");
      function qN(e, t, n) {
        e = Le(e), t = Ne(t);
        var l = t ? $n(e) : 0;
        if (!t || l >= t)
          return e;
        var u = (t - l) / 2;
        return rr(Wl(u), n) + e + rr(Rl(u), n);
      }
      function $N(e, t, n) {
        e = Le(e), t = Ne(t);
        var l = t ? $n(e) : 0;
        return t && l < t ? e + rr(t - l, n) : e;
      }
      function JN(e, t, n) {
        e = Le(e), t = Ne(t);
        var l = t ? $n(e) : 0;
        return t && l < t ? rr(t - l, n) + e : e;
      }
      function XN(e, t, n) {
        return n || t == null ? t = 0 : t && (t = +t), uM(Le(e).replace(mr, ""), t || 0);
      }
      function ep(e, t, n) {
        return (n ? Yt(e, t, n) : t === r) ? t = 1 : t = Ne(t), eu(Le(e), t);
      }
      function tp() {
        var e = arguments, t = Le(e[0]);
        return e.length < 3 ? t : t.replace(e[1], e[2]);
      }
      var np = rl(function(e, t, n) {
        return e + (n ? "_" : "") + t.toLowerCase();
      });
      function lp(e, t, n) {
        return n && typeof n != "number" && Yt(e, t, n) && (t = n = r), n = n === r ? Re : n >>> 0, n ? (e = Le(e), e && (typeof t == "string" || t != null && !hu(t)) && (t = Ct(t), !t && qn(e)) ? En(Kt(e), 0, n) : e.split(t, n)) : [];
      }
      var rp = rl(function(e, t, n) {
        return e + (n ? " " : "") + vu(t);
      });
      function up(e, t, n) {
        return e = Le(e), n = n == null ? 0 : Qn(Ne(n), 0, e.length), t = Ct(t), e.slice(n, n + t.length) == t;
      }
      function op(e, t, n) {
        var l = i.templateSettings;
        n && Yt(e, t, n) && (t = r), e = Le(e), t = pr({}, t, l, ys);
        var u = pr({}, t.imports, l.imports, ys), a = it(u), c = Br(u, a), g, y, E = 0, b = t.interpolate || Tl, S = "__p += '", G = Ur(
          (t.escape || Tl).source + "|" + b.source + "|" + (b === Qu ? ka : Tl).source + "|" + (t.evaluate || Tl).source + "|$",
          "g"
        ), J = "//# sourceURL=" + (Ce.call(t, "sourceURL") ? (t.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++dc + "]") + `
`;
        e.replace(G, function(ue, De, he, Ot, It, St) {
          return he || (he = Ot), S += e.slice(E, St).replace(Wa, bc), De && (g = !0, S += `' +
__e(` + De + `) +
'`), It && (y = !0, S += `';
` + It + `;
__p += '`), he && (S += `' +
((__t = (` + he + `)) == null ? '' : __t) +
'`), E = St + ue.length, ue;
        }), S += `';
`;
        var re = Ce.call(t, "variable") && t.variable;
        if (!re)
          S = `with (obj) {
` + S + `
}
`;
        else if (Sa.test(re))
          throw new ie(N);
        S = (y ? S.replace(Da, "") : S).replace(_a, "$1").replace(ma, "$1;"), S = "function(" + (re || "obj") + `) {
` + (re ? "" : `obj || (obj = {});
`) + "var __t, __p = ''" + (g ? ", __e = _.escape" : "") + (y ? `, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
` : `;
`) + S + `return __p
}`;
        var je = Mi(function() {
          return Ae(a, J + "return " + S).apply(r, c);
        });
        if (je.source = S, mu(je))
          throw je;
        return je;
      }
      function sp(e) {
        return Le(e).toLowerCase();
      }
      function ip(e) {
        return Le(e).toUpperCase();
      }
      function ap(e, t, n) {
        if (e = Le(e), e && (n || t === r))
          return Do(e);
        if (!e || !(t = Ct(t)))
          return e;
        var l = Kt(e), u = Kt(t), a = _o(l, u), c = mo(l, u) + 1;
        return En(l, a, c).join("");
      }
      function cp(e, t, n) {
        if (e = Le(e), e && (n || t === r))
          return e.slice(0, Yo(e) + 1);
        if (!e || !(t = Ct(t)))
          return e;
        var l = Kt(e), u = mo(l, Kt(t)) + 1;
        return En(l, 0, u).join("");
      }
      function Mp(e, t, n) {
        if (e = Le(e), e && (n || t === r))
          return e.replace(mr, "");
        if (!e || !(t = Ct(t)))
          return e;
        var l = Kt(e), u = _o(l, Kt(t));
        return En(l, u).join("");
      }
      function fp(e, t) {
        var n = qe, l = mt;
        if ($e(t)) {
          var u = "separator" in t ? t.separator : u;
          n = "length" in t ? Ne(t.length) : n, l = "omission" in t ? Ct(t.omission) : l;
        }
        e = Le(e);
        var a = e.length;
        if (qn(e)) {
          var c = Kt(e);
          a = c.length;
        }
        if (n >= a)
          return e;
        var g = n - $n(l);
        if (g < 1)
          return l;
        var y = c ? En(c, 0, g).join("") : e.slice(0, g);
        if (u === r)
          return y + l;
        if (c && (g += y.length - g), hu(u)) {
          if (e.slice(g).search(u)) {
            var E, b = y;
            for (u.global || (u = Ur(u.source, Le(Pu.exec(u)) + "g")), u.lastIndex = 0; E = u.exec(b); )
              var S = E.index;
            y = y.slice(0, S === r ? g : S);
          }
        } else if (e.indexOf(Ct(u), g) != g) {
          var G = y.lastIndexOf(u);
          G > -1 && (y = y.slice(0, G));
        }
        return y + l;
      }
      function gp(e) {
        return e = Le(e), e && ha.test(e) ? e.replace(ku, Pc) : e;
      }
      var dp = rl(function(e, t, n) {
        return e + (n ? " " : "") + t.toUpperCase();
      }), vu = fs("toUpperCase");
      function ci(e, t, n) {
        return e = Le(e), t = n ? r : t, t === r ? Sc(e) ? Rc(e) : wc(e) : e.match(t) || [];
      }
      var Mi = ye(function(e, t) {
        try {
          return xt(e, r, t);
        } catch (n) {
          return mu(n) ? n : new ie(n);
        }
      }), Np = pn(function(e, t) {
        return Ut(t, function(n) {
          n = sn(n), dn(e, n, Du(e[n], e));
        }), e;
      });
      function pp(e) {
        var t = e == null ? 0 : e.length, n = ne();
        return e = t ? Ze(e, function(l) {
          if (typeof l[1] != "function")
            throw new Qt(m);
          return [n(l[0]), l[1]];
        }) : [], ye(function(l) {
          for (var u = -1; ++u < t; ) {
            var a = e[u];
            if (xt(a[0], this, l))
              return xt(a[1], this, l);
          }
        });
      }
      function jp(e) {
        return PM(Vt(e, I));
      }
      function wu(e) {
        return function() {
          return e;
        };
      }
      function zp(e, t) {
        return e == null || e !== e ? t : e;
      }
      var yp = ds(), Dp = ds(!0);
      function Tt(e) {
        return e;
      }
      function Au(e) {
        return Ro(typeof e == "function" ? e : Vt(e, I));
      }
      function _p(e) {
        return Go(Vt(e, I));
      }
      function mp(e, t) {
        return Zo(e, Vt(t, I));
      }
      var hp = ye(function(e, t) {
        return function(n) {
          return zl(n, e, t);
        };
      }), Yp = ye(function(e, t) {
        return function(n) {
          return zl(e, n, t);
        };
      });
      function Tu(e, t, n) {
        var l = it(t), u = $l(t, l);
        n == null && !($e(t) && (u.length || !l.length)) && (n = t, t = e, e = this, u = $l(t, it(t)));
        var a = !($e(n) && "chain" in n) || !!n.chain, c = zn(e);
        return Ut(u, function(g) {
          var y = t[g];
          e[g] = y, c && (e.prototype[g] = function() {
            var E = this.__chain__;
            if (a || E) {
              var b = e(this.__wrapped__), S = b.__actions__ = vt(this.__actions__);
              return S.push({ func: y, args: arguments, thisArg: e }), b.__chain__ = E, b;
            }
            return y.apply(e, vn([this.value()], arguments));
          });
        }), e;
      }
      function Ip() {
        return Mt._ === this && (Mt._ = qc), this;
      }
      function Lu() {
      }
      function vp(e) {
        return e = Ne(e), ye(function(t) {
          return Ho(t, e);
        });
      }
      var wp = su(Ze), Ap = su(No), Tp = su(Er);
      function fi(e) {
        return du(e) ? Cr(sn(e)) : rf(e);
      }
      function Lp(e) {
        return function(t) {
          return e == null ? r : Pn(e, t);
        };
      }
      var xp = ps(), Ep = ps(!0);
      function xu() {
        return [];
      }
      function Eu() {
        return !1;
      }
      function Cp() {
        return {};
      }
      function bp() {
        return "";
      }
      function Op() {
        return !0;
      }
      function Sp(e, t) {
        if (e = Ne(e), e < 1 || e > $)
          return [];
        var n = Re, l = jt(e, Re);
        t = ne(t), e -= Re;
        for (var u = Sr(l, t); ++n < e; )
          t(n);
        return u;
      }
      function Bp(e) {
        return Me(e) ? Ze(e, sn) : bt(e) ? [e] : vt(Es(Le(e)));
      }
      function kp(e) {
        var t = ++Hc;
        return Le(e) + t;
      }
      var Up = lr(function(e, t) {
        return e + t;
      }, 0), Qp = iu("ceil"), Pp = lr(function(e, t) {
        return e / t;
      }, 1), Vp = iu("floor");
      function Fp(e) {
        return e && e.length ? ql(e, Tt, Zr) : r;
      }
      function Rp(e, t) {
        return e && e.length ? ql(e, ne(t, 2), Zr) : r;
      }
      function Wp(e) {
        return zo(e, Tt);
      }
      function Gp(e, t) {
        return zo(e, ne(t, 2));
      }
      function Zp(e) {
        return e && e.length ? ql(e, Tt, $r) : r;
      }
      function Hp(e, t) {
        return e && e.length ? ql(e, ne(t, 2), $r) : r;
      }
      var Kp = lr(function(e, t) {
        return e * t;
      }, 1), qp = iu("round"), $p = lr(function(e, t) {
        return e - t;
      }, 0);
      function Jp(e) {
        return e && e.length ? Or(e, Tt) : 0;
      }
      function Xp(e, t) {
        return e && e.length ? Or(e, ne(t, 2)) : 0;
      }
      return i.after = _d, i.ary = Fs, i.assign = iN, i.assignIn = li, i.assignInWith = pr, i.assignWith = aN, i.at = cN, i.before = Rs, i.bind = Du, i.bindAll = Np, i.bindKey = Ws, i.castArray = Cd, i.chain = Qs, i.chunk = Vf, i.compact = Ff, i.concat = Rf, i.cond = pp, i.conforms = jp, i.constant = wu, i.countBy = Jg, i.create = MN, i.curry = Gs, i.curryRight = Zs, i.debounce = Hs, i.defaults = fN, i.defaultsDeep = gN, i.defer = md, i.delay = hd, i.difference = Wf, i.differenceBy = Gf, i.differenceWith = Zf, i.drop = Hf, i.dropRight = Kf, i.dropRightWhile = qf, i.dropWhile = $f, i.fill = Jf, i.filter = ed, i.flatMap = ld, i.flatMapDeep = rd, i.flatMapDepth = ud, i.flatten = Ss, i.flattenDeep = Xf, i.flattenDepth = eg, i.flip = Yd, i.flow = yp, i.flowRight = Dp, i.fromPairs = tg, i.functions = DN, i.functionsIn = _N, i.groupBy = od, i.initial = lg, i.intersection = rg, i.intersectionBy = ug, i.intersectionWith = og, i.invert = hN, i.invertBy = YN, i.invokeMap = id, i.iteratee = Au, i.keyBy = ad, i.keys = it, i.keysIn = At, i.map = cr, i.mapKeys = vN, i.mapValues = wN, i.matches = _p, i.matchesProperty = mp, i.memoize = fr, i.merge = AN, i.mergeWith = ri, i.method = hp, i.methodOf = Yp, i.mixin = Tu, i.negate = gr, i.nthArg = vp, i.omit = TN, i.omitBy = LN, i.once = Id, i.orderBy = cd, i.over = wp, i.overArgs = vd, i.overEvery = Ap, i.overSome = Tp, i.partial = _u, i.partialRight = Ks, i.partition = Md, i.pick = xN, i.pickBy = ui, i.property = fi, i.propertyOf = Lp, i.pull = cg, i.pullAll = ks, i.pullAllBy = Mg, i.pullAllWith = fg, i.pullAt = gg, i.range = xp, i.rangeRight = Ep, i.rearg = wd, i.reject = dd, i.remove = dg, i.rest = Ad, i.reverse = zu, i.sampleSize = pd, i.set = CN, i.setWith = bN, i.shuffle = jd, i.slice = Ng, i.sortBy = Dd, i.sortedUniq = mg, i.sortedUniqBy = hg, i.split = lp, i.spread = Td, i.tail = Yg, i.take = Ig, i.takeRight = vg, i.takeRightWhile = wg, i.takeWhile = Ag, i.tap = Fg, i.throttle = Ld, i.thru = ar, i.toArray = ei, i.toPairs = oi, i.toPairsIn = si, i.toPath = Bp, i.toPlainObject = ni, i.transform = ON, i.unary = xd, i.union = Tg, i.unionBy = Lg, i.unionWith = xg, i.uniq = Eg, i.uniqBy = Cg, i.uniqWith = bg, i.unset = SN, i.unzip = yu, i.unzipWith = Us, i.update = BN, i.updateWith = kN, i.values = sl, i.valuesIn = UN, i.without = Og, i.words = ci, i.wrap = Ed, i.xor = Sg, i.xorBy = Bg, i.xorWith = kg, i.zip = Ug, i.zipObject = Qg, i.zipObjectDeep = Pg, i.zipWith = Vg, i.entries = oi, i.entriesIn = si, i.extend = li, i.extendWith = pr, Tu(i, i), i.add = Up, i.attempt = Mi, i.camelCase = FN, i.capitalize = ii, i.ceil = Qp, i.clamp = QN, i.clone = bd, i.cloneDeep = Sd, i.cloneDeepWith = Bd, i.cloneWith = Od, i.conformsTo = kd, i.deburr = ai, i.defaultTo = zp, i.divide = Pp, i.endsWith = RN, i.eq = $t, i.escape = WN, i.escapeRegExp = GN, i.every = Xg, i.find = td, i.findIndex = bs, i.findKey = dN, i.findLast = nd, i.findLastIndex = Os, i.findLastKey = NN, i.floor = Vp, i.forEach = Ps, i.forEachRight = Vs, i.forIn = pN, i.forInRight = jN, i.forOwn = zN, i.forOwnRight = yN, i.get = Yu, i.gt = Ud, i.gte = Qd, i.has = mN, i.hasIn = Iu, i.head = Bs, i.identity = Tt, i.includes = sd, i.indexOf = ng, i.inRange = PN, i.invoke = IN, i.isArguments = Rn, i.isArray = Me, i.isArrayBuffer = Pd, i.isArrayLike = wt, i.isArrayLikeObject = nt, i.isBoolean = Vd, i.isBuffer = Cn, i.isDate = Fd, i.isElement = Rd, i.isEmpty = Wd, i.isEqual = Gd, i.isEqualWith = Zd, i.isError = mu, i.isFinite = Hd, i.isFunction = zn, i.isInteger = qs, i.isLength = dr, i.isMap = $s, i.isMatch = Kd, i.isMatchWith = qd, i.isNaN = $d, i.isNative = Jd, i.isNil = eN, i.isNull = Xd, i.isNumber = Js, i.isObject = $e, i.isObjectLike = Je, i.isPlainObject = Yl, i.isRegExp = hu, i.isSafeInteger = tN, i.isSet = Xs, i.isString = Nr, i.isSymbol = bt, i.isTypedArray = ol, i.isUndefined = nN, i.isWeakMap = lN, i.isWeakSet = rN, i.join = sg, i.kebabCase = ZN, i.last = Rt, i.lastIndexOf = ig, i.lowerCase = HN, i.lowerFirst = KN, i.lt = uN, i.lte = oN, i.max = Fp, i.maxBy = Rp, i.mean = Wp, i.meanBy = Gp, i.min = Zp, i.minBy = Hp, i.stubArray = xu, i.stubFalse = Eu, i.stubObject = Cp, i.stubString = bp, i.stubTrue = Op, i.multiply = Kp, i.nth = ag, i.noConflict = Ip, i.noop = Lu, i.now = Mr, i.pad = qN, i.padEnd = $N, i.padStart = JN, i.parseInt = XN, i.random = VN, i.reduce = fd, i.reduceRight = gd, i.repeat = ep, i.replace = tp, i.result = EN, i.round = qp, i.runInContext = p, i.sample = Nd, i.size = zd, i.snakeCase = np, i.some = yd, i.sortedIndex = pg, i.sortedIndexBy = jg, i.sortedIndexOf = zg, i.sortedLastIndex = yg, i.sortedLastIndexBy = Dg, i.sortedLastIndexOf = _g, i.startCase = rp, i.startsWith = up, i.subtract = $p, i.sum = Jp, i.sumBy = Xp, i.template = op, i.times = Sp, i.toFinite = yn, i.toInteger = Ne, i.toLength = ti, i.toLower = sp, i.toNumber = Wt, i.toSafeInteger = sN, i.toString = Le, i.toUpper = ip, i.trim = ap, i.trimEnd = cp, i.trimStart = Mp, i.truncate = fp, i.unescape = gp, i.uniqueId = kp, i.upperCase = dp, i.upperFirst = vu, i.each = Ps, i.eachRight = Vs, i.first = Bs, Tu(i, function() {
        var e = {};
        return un(i, function(t, n) {
          Ce.call(i.prototype, n) || (e[n] = t);
        }), e;
      }(), { chain: !1 }), i.VERSION = o, Ut(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(e) {
        i[e].placeholder = i;
      }), Ut(["drop", "take"], function(e, t) {
        _e.prototype[e] = function(n) {
          n = n === r ? 1 : st(Ne(n), 0);
          var l = this.__filtered__ && !t ? new _e(this) : this.clone();
          return l.__filtered__ ? l.__takeCount__ = jt(n, l.__takeCount__) : l.__views__.push({
            size: jt(n, Re),
            type: e + (l.__dir__ < 0 ? "Right" : "")
          }), l;
        }, _e.prototype[e + "Right"] = function(n) {
          return this.reverse()[e](n).reverse();
        };
      }), Ut(["filter", "map", "takeWhile"], function(e, t) {
        var n = t + 1, l = n == tn || n == v;
        _e.prototype[e] = function(u) {
          var a = this.clone();
          return a.__iteratees__.push({
            iteratee: ne(u, 3),
            type: n
          }), a.__filtered__ = a.__filtered__ || l, a;
        };
      }), Ut(["head", "last"], function(e, t) {
        var n = "take" + (t ? "Right" : "");
        _e.prototype[e] = function() {
          return this[n](1).value()[0];
        };
      }), Ut(["initial", "tail"], function(e, t) {
        var n = "drop" + (t ? "" : "Right");
        _e.prototype[e] = function() {
          return this.__filtered__ ? new _e(this) : this[n](1);
        };
      }), _e.prototype.compact = function() {
        return this.filter(Tt);
      }, _e.prototype.find = function(e) {
        return this.filter(e).head();
      }, _e.prototype.findLast = function(e) {
        return this.reverse().find(e);
      }, _e.prototype.invokeMap = ye(function(e, t) {
        return typeof e == "function" ? new _e(this) : this.map(function(n) {
          return zl(n, e, t);
        });
      }), _e.prototype.reject = function(e) {
        return this.filter(gr(ne(e)));
      }, _e.prototype.slice = function(e, t) {
        e = Ne(e);
        var n = this;
        return n.__filtered__ && (e > 0 || t < 0) ? new _e(n) : (e < 0 ? n = n.takeRight(-e) : e && (n = n.drop(e)), t !== r && (t = Ne(t), n = t < 0 ? n.dropRight(-t) : n.take(t - e)), n);
      }, _e.prototype.takeRightWhile = function(e) {
        return this.reverse().takeWhile(e).reverse();
      }, _e.prototype.toArray = function() {
        return this.take(Re);
      }, un(_e.prototype, function(e, t) {
        var n = /^(?:filter|find|map|reject)|While$/.test(t), l = /^(?:head|last)$/.test(t), u = i[l ? "take" + (t == "last" ? "Right" : "") : t], a = l || /^find/.test(t);
        u && (i.prototype[t] = function() {
          var c = this.__wrapped__, g = l ? [1] : arguments, y = c instanceof _e, E = g[0], b = y || Me(c), S = function(De) {
            var he = u.apply(i, vn([De], g));
            return l && G ? he[0] : he;
          };
          b && n && typeof E == "function" && E.length != 1 && (y = b = !1);
          var G = this.__chain__, J = !!this.__actions__.length, re = a && !G, je = y && !J;
          if (!a && b) {
            c = je ? c : new _e(this);
            var ue = e.apply(c, g);
            return ue.__actions__.push({ func: ar, args: [S], thisArg: r }), new Pt(ue, G);
          }
          return re && je ? e.apply(this, g) : (ue = this.thru(S), re ? l ? ue.value()[0] : ue.value() : ue);
        });
      }), Ut(["pop", "push", "shift", "sort", "splice", "unshift"], function(e) {
        var t = Ol[e], n = /^(?:push|sort|unshift)$/.test(e) ? "tap" : "thru", l = /^(?:pop|shift)$/.test(e);
        i.prototype[e] = function() {
          var u = arguments;
          if (l && !this.__chain__) {
            var a = this.value();
            return t.apply(Me(a) ? a : [], u);
          }
          return this[n](function(c) {
            return t.apply(Me(c) ? c : [], u);
          });
        };
      }), un(_e.prototype, function(e, t) {
        var n = i[t];
        if (n) {
          var l = n.name + "";
          Ce.call(tl, l) || (tl[l] = []), tl[l].push({ name: t, func: n });
        }
      }), tl[nr(r, q).name] = [{
        name: "wrapper",
        func: r
      }], _e.prototype.clone = fM, _e.prototype.reverse = gM, _e.prototype.value = dM, i.prototype.at = Rg, i.prototype.chain = Wg, i.prototype.commit = Gg, i.prototype.next = Zg, i.prototype.plant = Kg, i.prototype.reverse = qg, i.prototype.toJSON = i.prototype.valueOf = i.prototype.value = $g, i.prototype.first = i.prototype.head, Ml && (i.prototype[Ml] = Hg), i;
    }, Jn = Wc();
    Sn ? ((Sn.exports = Jn)._ = Jn, Ar._ = Jn) : Mt._ = Jn;
  }).call(Il);
})(jr, jr.exports);
var _t = jr.exports;
const gj = {
  name: "ElPlusFormBtn",
  inheritAttrs: !1,
  typeName: "btn",
  customOptions: {}
}, _n = /* @__PURE__ */ fe({
  ...gj,
  props: {
    field: {},
    rowIndex: {},
    loading: { type: Boolean },
    desc: {},
    formData: {}
  },
  setup(f) {
    const s = f, r = h(s.loading ?? !1), o = Ie(() => {
      var N;
      const m = Object.assign({}, we(), s.desc, (N = s.desc) == null ? void 0 : N._attrs);
      return m.btnType && (m.type = m.btnType), m.plain || delete m.plain, m;
    }), D = Ie(() => {
      const m = {};
      if (s.desc && s.desc.on)
        for (const N in s.desc.on)
          N === "click" && s.desc.mask ? m[N] = function() {
            r.value = !0, s.desc.on[N]({
              row: s.formData,
              callBack: () => {
                setTimeout(() => r.value = !1, 500);
              },
              field: s.field,
              rowIndex: s.rowIndex
            });
          } : m[N] = function() {
            s.desc.on[N]({ row: _t.cloneDeep(s.formData || {}), field: s.field, rowIndex: s.rowIndex });
          };
      return m;
    }), j = Ie(() => s.desc.btnLabel ? typeof s.desc.btnLabel == "function" ? s.desc.btnLabel(s.formData) : s.desc.btnLabel : s.desc.label ? typeof s.desc.label == "function" ? s.desc.label(s.formData) : s.desc.label : "");
    return He(
      () => s.loading,
      (m) => {
        r.value = m;
      }
    ), (m, N) => {
      const d = F("el-button"), M = F("el-popconfirm");
      return s.desc.confirm ? (_(), R(M, {
        key: 0,
        onConfirm: D.value.click,
        title: s.desc.confirm
      }, {
        reference: Q(() => [
          se(d, le({
            loading: r.value,
            size: s.desc.size || "small"
          }, o.value), an({ _: 2 }, [
            m.desc.label ? {
              name: "default",
              fn: Q(() => [
                be(xe(j.value), 1)
              ]),
              key: "0"
            } : void 0
          ]), 1040, ["loading", "size"])
        ]),
        _: 1
      }, 8, ["onConfirm", "title"])) : (_(), R(d, le({
        key: 1,
        loading: r.value,
        size: s.desc.size || "small"
      }, o.value, Te(D.value), {
        style: { pointerEvents: m.desc.isTag ? "none" : "all" }
      }), an({ _: 2 }, [
        s.desc.label ? {
          name: "default",
          fn: Q(() => [
            be(xe(j.value), 1)
          ]),
          key: "0"
        } : void 0
      ]), 1040, ["loading", "size", "style"]));
    };
  }
}), dj = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: _n }, Symbol.toStringTag, { value: "Module" })), Nj = /* @__PURE__ */ Ye("i", { class: "ele-ArrowDown el-icon--right" }, null, -1), pj = {
  name: "ElPlusFormBtns",
  inheritAttrs: !1,
  typeName: "btns",
  customOptions: {}
}, Ai = /* @__PURE__ */ fe({
  ...pj,
  props: {
    field: {},
    rowIndex: {},
    desc: {},
    formData: {}
  },
  setup(f) {
    const s = f, r = h([]), o = h([]), D = Ie(() => {
      switch (s.desc.align) {
        case "right":
          return "flex-end";
        case "center":
          return "center";
        case void 0:
        case "left":
          return "flex-start";
        default:
          return "flex-start";
      }
    }), j = Ie(() => (M) => {
      const z = {};
      if (M && M.on)
        for (const I in M.on)
          I === "click" && M.confirm ? z[I] = function() {
            uj.confirm(M.confirm, "提示", {
              type: "warning"
            }).then(() => {
              M.on[I]({ row: s.formData, field: s.field, rowIndex: s.rowIndex });
            });
          } : z[I] = function() {
            M.on[I]({ row: s.formData, field: s.field, rowIndex: s.rowIndex });
          };
      return z;
    }), m = () => {
      const M = [];
      s.desc.btns.length > 0 && s.desc.btns.map((I) => {
        N(I) && M.push(I);
      }), r.value = M;
      const z = s.desc.limit || 3;
      r.value.length > z && (o.value = r.value.splice(z - 1));
    }, N = (M) => typeof M.vif == "function" ? !!d(M.vif) : typeof M.vif == "boolean" ? M.vif : !0, d = (M) => M(s.formData);
    return He(
      () => s.desc,
      () => m()
    ), He(
      () => s.formData,
      () => m()
    ), cn(() => {
      m();
    }), (M, z) => {
      const I = F("el-button"), O = F("el-dropdown-item"), C = F("el-dropdown-menu"), L = F("el-dropdown");
      return _(), P("div", {
        class: "el-plus-form-btn-group",
        style: Dt({ "justify-content": D.value })
      }, [
        (_(!0), P(me, null, ve(r.value, (U, B) => (_(), R(_n, {
          key: B + (U.label || U.title || ""),
          type: "primary",
          field: M.field,
          desc: U || {},
          formData: M.formData,
          plain: (U && U.plain) ?? M.desc.plain ?? !0,
          text: M.desc.text,
          rowIndex: M.rowIndex
        }, null, 8, ["field", "desc", "formData", "plain", "text", "rowIndex"]))), 128)),
        o.value && o.value.length > 0 ? (_(), R(L, {
          key: 0,
          class: "group-menu-btn",
          size: M.desc.size || "small"
        }, {
          dropdown: Q(() => [
            se(C, null, {
              default: Q(() => [
                (_(!0), P(me, null, ve(o.value, (U, B) => (_(), R(O, le({
                  key: B + (U.label || U.title)
                }, Te(j.value(U))), {
                  default: Q(() => [
                    be(xe(U.label || U.title), 1)
                  ]),
                  _: 2
                }, 1040))), 128))
              ]),
              _: 1
            })
          ]),
          default: Q(() => [
            se(I, {
              type: "primary",
              size: M.desc.size || "small",
              plain: M.desc.plain ?? !0
            }, {
              default: Q(() => [
                be(" 更多"),
                Nj
              ]),
              _: 1
            }, 8, ["size", "plain"])
          ]),
          _: 1
        }, 8, ["size"])) : ae("", !0)
      ], 4);
    };
  }
});
const jj = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: Ai }, Symbol.toStringTag, { value: "Module" })), zj = {
  name: "ElPlusFormCascader",
  inheritAttrs: !1,
  typeName: "cascader",
  customOptions: {}
}, yj = /* @__PURE__ */ fe({
  ...zj,
  props: {
    modelValue: {},
    field: {},
    desc: {},
    formData: {}
  },
  emits: ["update:modelValue"],
  setup(f, { emit: s }) {
    const r = f, o = Ge("globalData"), D = h(typeof r.modelValue == "string" ? [r.modelValue] : r.modelValue);
    s("update:modelValue", D);
    const j = h({}), m = h(ke(r)), N = rt([]);
    return Oe(async () => {
      j.value = await Se(r, { clearable: !0, props: { value: "value", label: "label", children: "children", checkStrictly: !!r.desc.checkStrictly }, ...we() });
    }), He(
      () => r.desc.options,
      async (d) => {
        typeof d == "string" ? N.splice(0, N.length, ...o[d] || []) : typeof d == "function" ? N.splice(0, N.length, ...await d(r.formData)) : Array.isArray(d) ? d && N && !_t.isEqual(d, N) && N.splice(0, N.length, ...d) : N.splice(0, N.length);
      },
      { immediate: !0 }
    ), (d, M) => {
      const z = F("el-cascader");
      return _(), R(z, le({ class: "ElPlusFormCascader-panel" }, j.value, Te(m.value), {
        options: N,
        modelValue: D.value,
        "onUpdate:modelValue": M[0] || (M[0] = (I) => D.value = I)
      }), null, 16, ["options", "modelValue"]);
    };
  }
});
const Ti = /* @__PURE__ */ Ke(yj, [["__scopeId", "data-v-ab6b4aed"]]), Dj = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: Ti }, Symbol.toStringTag, { value: "Module" })), _j = {
  name: "ElPlusFormCascaderPanel",
  inheritAttrs: !1,
  typeName: "cascaderPanel",
  customOptions: {}
}, mj = /* @__PURE__ */ fe({
  ..._j,
  props: {
    modelValue: {},
    field: {},
    desc: {},
    formData: {}
  },
  emits: ["update:modelValue"],
  setup(f, { emit: s }) {
    const r = f, o = h(r.modelValue);
    s("update:modelValue", o);
    const D = h(Object.assign({}, mn(), r.desc.slots)), j = h({}), m = h(ke(r));
    return Oe(async () => {
      j.value = await Se(r, {
        props: { value: "value", label: "label", children: "children" },
        fetchSuggestions(N, d) {
          d([]);
        },
        ...we()
      });
    }), (N, d) => {
      const M = F("el-cascader-panel");
      return _(), R(M, le({ class: "ElPlusFormCascaderPanel-panel" }, j.value, Te(m.value), {
        options: r.desc.options,
        modelValue: o.value,
        "onUpdate:modelValue": d[0] || (d[0] = (z) => o.value = z)
      }), an({ _: 2 }, [
        ve(D.value, (z, I, O) => ({
          name: I,
          fn: Q((C) => [
            Xe(N.$slots, I, { data: C }, void 0, !0)
          ])
        }))
      ]), 1040, ["options", "modelValue"]);
    };
  }
});
const Li = /* @__PURE__ */ Ke(mj, [["__scopeId", "data-v-2c8fbcd6"]]), hj = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: Li }, Symbol.toStringTag, { value: "Module" })), Yj = {
  name: "ElPlusFormCheckbox",
  inheritAttrs: !1,
  typeName: "checkbox",
  customOptions: {}
}, Ij = /* @__PURE__ */ fe({
  ...Yj,
  props: {
    modelValue: {},
    field: {},
    desc: {},
    formData: {}
  },
  emits: ["update:modelValue"],
  setup(f, { emit: s }) {
    const r = f, o = h(r.modelValue);
    s("update:modelValue", o);
    const D = h({}), j = h(ke(r));
    return Oe(async () => {
      D.value = await Se(r, { ...we() });
    }), (m, N) => {
      const d = F("el-checkbox"), M = F("el-checkbox-group");
      return _(), R(M, le({ class: "ElPlusFormCheckbox-panel" }, D.value, Te(j.value), {
        modelValue: o.value,
        "onUpdate:modelValue": N[0] || (N[0] = (z) => o.value = z)
      }), {
        default: Q(() => [
          (_(!0), P(me, null, ve(m.desc.options, (z) => (_(), R(d, le({
            key: z.value,
            label: z.value
          }, z.attrs), {
            default: Q(() => [
              be(xe(z.text), 1)
            ]),
            _: 2
          }, 1040, ["label"]))), 128))
        ]),
        _: 1
      }, 16, ["modelValue"]);
    };
  }
});
const xi = /* @__PURE__ */ Ke(Ij, [["__scopeId", "data-v-d9495439"]]), vj = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: xi }, Symbol.toStringTag, { value: "Module" })), wj = {
  name: "ElPlusFormCheckboxButton",
  inheritAttrs: !1,
  typeName: "checkboxButton",
  customOptions: {}
}, Aj = /* @__PURE__ */ fe({
  ...wj,
  props: {
    modelValue: {},
    field: {},
    desc: {},
    formData: {}
  },
  emits: ["update:modelValue"],
  setup(f, { emit: s }) {
    const r = f, o = h(r.modelValue);
    s("update:modelValue", o);
    const D = h({}), j = h(ke(r));
    return Oe(async () => {
      D.value = await Se(r, { ...we() });
    }), (m, N) => {
      const d = F("el-checkbox-button"), M = F("el-checkbox-group");
      return _(), R(M, le({ class: "ElPlusFormCheckboxButton-panel" }, D.value, Te(j.value), {
        modelValue: o.value,
        "onUpdate:modelValue": N[0] || (N[0] = (z) => o.value = z)
      }), {
        default: Q(() => [
          (_(!0), P(me, null, ve(m.desc.options, (z) => (_(), R(d, le({
            key: z.value,
            label: z.value
          }, z.attrs), {
            default: Q(() => [
              be(xe(z.text), 1)
            ]),
            _: 2
          }, 1040, ["label"]))), 128))
        ]),
        _: 1
      }, 16, ["modelValue"]);
    };
  }
});
const Ei = /* @__PURE__ */ Ke(Aj, [["__scopeId", "data-v-01d22bc6"]]), Tj = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: Ei }, Symbol.toStringTag, { value: "Module" })), Lj = {
  name: "ElPlusFormColor",
  inheritAttrs: !1,
  typeName: "color",
  customOptions: {}
}, xj = /* @__PURE__ */ fe({
  ...Lj,
  props: {
    modelValue: {},
    field: {},
    desc: {},
    formData: {}
  },
  emits: ["update:modelValue"],
  setup(f, { emit: s }) {
    const r = f, o = h(r.modelValue), D = h({}), j = h(ke(r));
    return s("update:modelValue", o), Oe(async () => {
      D.value = await Se(r, { ...we() });
    }), (m, N) => {
      const d = F("el-color-picker");
      return _(), R(d, le({ class: "ElPlusFormColor-panel" }, D.value, Te(j.value), {
        modelValue: o.value,
        "onUpdate:modelValue": N[0] || (N[0] = (M) => o.value = M)
      }), null, 16, ["modelValue"]);
    };
  }
});
const Ci = /* @__PURE__ */ Ke(xj, [["__scopeId", "data-v-b0687872"]]), Ej = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: Ci }, Symbol.toStringTag, { value: "Module" })), Cj = {
  name: "ElPlusFormDate",
  inheritAttrs: !1,
  typeName: "date",
  customOptions: {}
}, bj = /* @__PURE__ */ fe({
  ...Cj,
  props: {
    modelValue: {},
    field: {},
    desc: {},
    formData: {}
  },
  emits: ["update:modelValue"],
  setup(f, { emit: s }) {
    const r = f, o = h(!1), D = h({}), j = h(ke(r)), m = h(r.modelValue);
    return s("update:modelValue", m), Oe(async () => {
      D.value = await Se(r, { valueFormat: "YYYY-MM-DD HH:mm:ss", editable: !1, ...we() }), o.value = !0;
    }), (N, d) => {
      const M = F("el-date-picker");
      return o.value ? (_(), R(M, le({
        key: 0,
        class: "ElPlusFormDate-panel"
      }, D.value, Te(j.value), {
        modelValue: m.value,
        "onUpdate:modelValue": d[0] || (d[0] = (z) => m.value = z)
      }), null, 16, ["modelValue"])) : ae("", !0);
    };
  }
});
const bi = /* @__PURE__ */ Ke(bj, [["__scopeId", "data-v-7295d086"]]), Oj = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: bi }, Symbol.toStringTag, { value: "Module" })), Sj = {
  name: "ElPlusFormDaterange",
  inheritAttrs: !1,
  typeName: "daterange",
  customOptions: {}
}, Bj = /* @__PURE__ */ fe({
  ...Sj,
  props: {
    modelValue: {},
    field: {},
    desc: {},
    formData: {}
  },
  emits: ["update:modelValue"],
  setup(f, { emit: s }) {
    const r = f, o = h(r.modelValue), D = h(Object.assign({}, mn(), r.desc.slots)), j = h({}), m = h(ke(r));
    return s("update:modelValue", o), Oe(async () => {
      j.value = await Se(r, { type: "daterange", format: "YYYY-MM-DD", valueFormat: "x", editable: !1, ...we() });
    }), (N, d) => {
      const M = F("el-date-picker");
      return _(), R(M, le({ class: "el-plusF-form-daterange-panel" }, j.value, Te(m.value), {
        modelValue: o.value,
        "onUpdate:modelValue": d[0] || (d[0] = (z) => o.value = z)
      }), an({ _: 2 }, [
        ve(D.value, (z, I, O) => ({
          name: I,
          fn: Q((C) => [
            Xe(N.$slots, I, { data: C }, void 0, !0)
          ])
        }))
      ]), 1040, ["modelValue"]);
    };
  }
});
const Oi = /* @__PURE__ */ Ke(Bj, [["__scopeId", "data-v-2f54b570"]]), kj = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: Oi }, Symbol.toStringTag, { value: "Module" })), Uj = {
  name: "ElPlusFormDatetime",
  inheritAttrs: !1,
  typeName: "datetime",
  customOptions: {}
}, Qj = /* @__PURE__ */ fe({
  ...Uj,
  props: {
    modelValue: {},
    field: {},
    desc: {},
    formData: {}
  },
  emits: ["update:modelValue"],
  setup(f, { emit: s }) {
    const r = f, o = h(r.modelValue), D = h({}), j = h(ke(r));
    return s("update:modelValue", o), Oe(async () => {
      D.value = await Se(r, { valueFormat: "YYYY-MM-DD HH:mm:ss", ...we() });
    }), (m, N) => {
      const d = F("el-date-picker");
      return _(), R(d, le({ class: "ElPlusFormDatetime-panel" }, D.value, Te(j.value), {
        type: "datetime",
        modelValue: o.value,
        "onUpdate:modelValue": N[0] || (N[0] = (M) => o.value = M)
      }), null, 16, ["modelValue"]);
    };
  }
});
const Si = /* @__PURE__ */ Ke(Qj, [["__scopeId", "data-v-e8947510"]]), Pj = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: Si }, Symbol.toStringTag, { value: "Module" })), di = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+RE9D5Zu+5qCHPC90aXRsZT4KICAgIDxnIGlkPSLkvpvlupTllYbnrqHnkIYiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSLkvpvlupTllYbnrqHnkIYt5L6b5bqU5ZWG5YiX6KGo6K+m5oOFLTIw5p2h6ZmE5Lu2IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMzgzLjAwMDAwMCwgLTEwNTEuMDAwMDAwKSIgZmlsbD0iIzM4NzhERSIgZmlsbC1ydWxlPSJub256ZXJvIj4KICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC0yMeWkh+S7vS05IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzNzUuMDAwMDAwLCAxMDQ1LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPGcgaWQ9IkRPQ+WbvuaghyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoOC4wMDAwMDAsIDYuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTMsNiBMMTMsNiBDMTMuMTc2ODExLDYgMTMuMzQ2MzgwMyw2LjA3MDIzNzg5IDEzLjQ3MTQwNDUsNi4xOTUyNjIxNSBDMTMuNTk2NDI4OCw2LjMyMDI4NjQgMTMuNjY2NjY2Nyw2LjQ4OTg1NTY4IDEzLjY2NjY2NjcsNi42NjY2NjY2NyBMMTMuNjY2NjY2NywxMi4zMzMzMzMzIEMxMy42NjY2NjY3LDEyLjcwMTUyMzIgMTMuMzY4MTg5OCwxMyAxMywxMyBMMywxMyBMMywxNC42NjY2NjY3IEMzLDE0Ljc1NTA3MjIgMy4wMzUxMTg5NSwxNC44Mzk4NTY4IDMuMDk3NjMxMDcsMTQuOTAyMzY4OSBDMy4xNjAxNDMyLDE0Ljk2NDg4MTEgMy4yNDQ5Mjc4MywxNSAzLjMzMzMzMzMzLDE1IEwxNC42NjY2NjY3LDE1IEMxNC44NTA3NjE2LDE1IDE1LDE0Ljg1MDc2MTYgMTUsMTQuNjY2NjY2NyBMMTUsNC44MjUzMzMzMyBMMTQuODQyMzMzMyw0LjY2NjY2NjY3IEwxMi44NjUzMzMzLDQuNjY2NjY2NjcgQzEyLjAxOTIzMzEsNC42NjY2NjY2NyAxMS4zMzMzMzMzLDMuOTgwNzY2OTEgMTEuMzMzMzMzMywzLjEzNDY2NjY3IEwxMS4zMzMzMzMzLDEuMTM1MzMzMzMgTDExLjE5ODY2NjcsMSBMMy4zMzMzMzMzMywxIEMzLjI0NDkyNzgzLDEgMy4xNjAxNDMyLDEuMDM1MTE4OTUgMy4wOTc2MzEwNywxLjA5NzYzMTA3IEMzLjAzNTExODk1LDEuMTYwMTQzMiAzLDEuMjQ0OTI3ODMgMywxLjMzMzMzMzMzIEwzLDYgWiBNMiwxMyBMMC42NjY2NjY2NzIsMTMgQzAuMjk4NDc2ODM2LDEzIDAsMTIuNzAxNTIzMiAwLDEyLjMzMzMzMzMgTDAsNi42NjY2NjY2NyBDMCw2LjQ4OTg1NTY4IDAuMDcwMjM3ODk0MSw2LjMyMDI4NjQgMC4xOTUyNjIxNDcsNi4xOTUyNjIxNSBDMC4zMjAyODY0MDEsNi4wNzAyMzc4OSAwLjQ4OTg1NTY3Nyw2IDAuNjY2NjY2NjcyLDYgTDIsNiBMMiwxLjMzMzMzMzMzIEMyLDAuNTk2OTUzNjY1IDIuNTk2OTUzNjYsMCAzLjMzMzMzMzMzLDAgTDExLjYxNSwwIEwxNiw0LjQxMzMzMzMzIEwxNiwxNC42NjY2NjY3IEMxNiwxNS40MDMwNDYzIDE1LjQwMzA0NjMsMTYgMTQuNjY2NjY2NywxNiBMMy4zMzMzMzMzMywxNiBDMi41OTY5NTM2NiwxNiAyLDE1LjQwMzA0NjMgMiwxNC42NjY2NjY3IEwyLDEzIEwyLDEzIFogTTEuMDMsNy4zODI2NjY2NyBMMS4wMywxMS42NjY2NjY3IEwyLjQ1NzMzMzMzLDExLjY2NjY2NjcgQzMuMDkxNjY2NjYsMTEuNjY2NjY2NyAzLjU2NzMzMzMzLDExLjQ3NDY2NjcgMy44OTU2NjY2NywxMS4wOTA2NjY3IEM0LjIwNzMzMzM0LDEwLjcyNDY2NjcgNC4zNjYsMTAuMjAyNjY2NyA0LjM2Niw5LjUyNDY2NjY3IEM0LjM2Niw4Ljg0MDY2NjY3IDQuMjA3MzMzMzMsOC4zMTg2NjY2NyAzLjg5NTY2NjY3LDcuOTU4NjY2NjcgQzMuNTY3NjY2NjcsNy41NzQ2NjY2NyAzLjA5MTY2NjY3LDcuMzgyNjY2NjcgMi40NTczMzMzMyw3LjM4MjY2NjY3IEwxLjAzLDcuMzgyNjY2NjcgWiBNMS42Nyw3Ljk4MjY2NjY3IEwyLjMzNjY2NjY3LDcuOTgyNjY2NjcgQzIuODIzMzMzMzQsNy45ODI2NjY2NyAzLjE3OSw4LjEwMjY2NjY3IDMuNDAzMzMzMzMsOC4zNDg2NjY2NyBDMy42MjIsOC41ODg2NjY2NyAzLjczMTMzMzMzLDguOTg0NjY2NjcgMy43MzEzMzMzMyw5LjUyNDY2NjY3IEMzLjczMTMzMzMzLDEwLjA1MjY2NjcgMy42MjIsMTAuNDQyNjY2NyAzLjQwMywxMC42OTQ2NjY3IEMzLjE3OSwxMC45NDA2NjY3IDIuODIzMzMzMzMsMTEuMDY2NjY2NyAyLjMzNjY2NjY3LDExLjA2NjY2NjcgTDEuNjcsMTEuMDY2NjY2NyBMMS42Nyw3Ljk4MjY2NjY3IEwxLjY3LDcuOTgyNjY2NjcgWiBNNi43MDEzMzMzMyw3LjI5ODY2NjY3IEM2LjA5OTY2NjY2LDcuMjk4NjY2NjcgNS42MjkzMzMzMyw3LjUwODY2NjY3IDUuMjkwMzMzMzMsNy45NDA2NjY2NyBDNC45NjIsOC4zNDg2NjY2NyA0LjgwMzY2NjY3LDguODc2NjY2NjcgNC44MDM2NjY2Nyw5LjUzMDY2NjY3IEM0LjgwMzY2NjY3LDEwLjE3ODY2NjcgNC45NjIsMTAuNzA2NjY2NyA1LjI5MDMzMzMzLDExLjExNDY2NjcgQzUuNjI5MzMzMzMsMTEuNTM0NjY2NyA2LjA5OTY2NjY2LDExLjc1MDY2NjcgNi43MDEzMzMzMywxMS43NTA2NjY3IEM3LjI5NzMzMzMzLDExLjc1MDY2NjcgNy43Njc2NjY2NiwxMS41NDA2NjY3IDguMTEyMzMzMzMsMTEuMTIwNjY2NyBDOC40NDAzMzMzMywxMC43MTg2NjY3IDguNjA0MzMzMzMsMTAuMTkwNjY2NyA4LjYwNDMzMzMzLDkuNTMwNjY2NjcgQzguNjA0MzMzMzMsOC44NzA2NjY2NyA4LjQ0MDMzMzMzLDguMzM2NjY2NjcgOC4xMTIzMzMzMyw3LjkzNDY2NjY3IEM3Ljc2NzY2NjY2LDcuNTA4NjY2NjcgNy4yOTczMzMzMyw3LjI5ODY2NjY3IDYuNzAxMzMzMzMsNy4yOTg2NjY2NyBMNi43MDEzMzMzMyw3LjI5ODY2NjY3IFogTTYuNzAxMzMzMzMsNy45MTY2NjY2NyBDNy4xMDYsNy45MTY2NjY2NyA3LjQxNzY2NjY2LDguMDU0NjY2NjcgNy42MzYzMzMzMyw4LjM0MjY2NjY3IEM3Ljg0OTY2NjY2LDguNjMwNjY2NjcgNy45NTksOS4wMjY2NjY2NyA3Ljk1OSw5LjUzMDY2NjY3IEM3Ljk1OSwxMC4wMzQ2NjY3IDcuODQ5NjY2NjcsMTAuNDI0NjY2NyA3LjYzNjMzMzMzLDEwLjcwNjY2NjcgQzcuNDE3NjY2NjYsMTAuOTg4NjY2NyA3LjEwNiwxMS4xMzI2NjY3IDYuNzAxMzMzMzMsMTEuMTMyNjY2NyBDNi4yOTY2NjY2NiwxMS4xMzI2NjY3IDUuOTc5MzMzMzMsMTAuOTgyNjY2NyA1Ljc2MDY2NjY3LDEwLjY4ODY2NjcgQzUuNTQ3MzMzMzQsMTAuNDAwNjY2NyA1LjQ0MzMzMzMzLDEwLjAxNjY2NjcgNS40NDMzMzMzMyw5LjUzMDY2NjY3IEM1LjQ0MzMzMzMzLDkuMDM4NjY2NjcgNS41NDczMzMzMyw4LjY1NDY2NjY3IDUuNzYwNjY2NjcsOC4zNjY2NjY2NyBDNS45ODQ2NjY2Nyw4LjA2NjY2NjY3IDYuMjk2NjY2NjcsNy45MTY2NjY2NyA2LjcwMTMzMzMzLDcuOTE2NjY2NjcgTDYuNzAxMzMzMzMsNy45MTY2NjY2NyBaIE0xMC45MDEzMzMzLDcuMjk4NjY2NjcgQzEwLjI3OCw3LjI5ODY2NjY3IDkuODAyLDcuNTIwNjY2NjcgOS40NzQsNy45NzY2NjY2NyBDOS4xODQsOC4zNzI2NjY2NyA5LjA0Miw4Ljg5NDY2NjY3IDkuMDQyLDkuNTMwNjY2NjcgQzkuMDQyLDEwLjE3ODY2NjcgOS4xNzg2NjY2NywxMC42OTQ2NjY3IDkuNDU3NjY2NjcsMTEuMDc4NjY2NyBDOS43NzQ2NjY2NywxMS41MjI2NjY3IDEwLjI2MTMzMzMsMTEuNzUwNjY2NyAxMC45MTIzMzMzLDExLjc1MDY2NjcgQzExLjMzMzMzMzMsMTEuNzUwNjY2NyAxMS42OTQzMzMzLDExLjYxODY2NjcgMTEuOTk1LDExLjM1NDY2NjcgQzEyLjMxNzY2NjcsMTEuMDcyNjY2NyAxMi41MiwxMC42ODI2NjY3IDEyLjYwNzY2NjcsMTAuMTc4NjY2NyBMMTEuOTg0MzMzMywxMC4xNzg2NjY3IEMxMS45MDc2NjY3LDEwLjUwMjY2NjcgMTEuNzc2MzMzMywxMC43NDg2NjY3IDExLjU5MDMzMzMsMTAuOTEwNjY2NyBDMTEuNDE1MzMzMywxMS4wNTQ2NjY3IDExLjE4NTY2NjcsMTEuMTMyNjY2NyAxMC45MDcsMTEuMTMyNjY2NyBDMTAuNDgwMzMzMywxMS4xMzI2NjY3IDEwLjE2MywxMC45ODI2NjY3IDkuOTYwNjY2NjcsMTAuNjk0NjY2NyBDOS43NzQ2NjY2NywxMC40MjQ2NjY3IDkuNjgxNjY2NjcsMTAuMDM0NjY2NyA5LjY4MTY2NjY3LDkuNTMwNjY2NjcgQzkuNjgxNjY2NjcsOS4wMzg2NjY2NyA5Ljc3NSw4LjY1NDY2NjY3IDkuOTY2MzMzMzMsOC4zNzg2NjY2NyBDMTAuMTc0LDguMDY2NjY2NjcgMTAuNDgwMzMzMyw3LjkxNjY2NjY3IDEwLjg5MDMzMzMsNy45MTY2NjY2NyBDMTEuMTYzNjY2Nyw3LjkxNjY2NjY3IDExLjM4OCw3Ljk3NjY2NjY3IDExLjU2Myw4LjEwODY2NjY3IEMxMS43NDM2NjY3LDguMjQwNjY2NjcgMTEuODY0LDguNDQ0NjY2NjcgMTEuOTI5NjY2Nyw4LjcyNjY2NjY3IEwxMi41NTMsOC43MjY2NjY2NyBDMTIuNDkzLDguMjk0NjY2NjcgMTIuMzIzLDcuOTQ2NjY2NjcgMTIuMDM5LDcuNjk0NjY2NjcgQzExLjc0MzY2NjcsNy40MzA2NjY2NyAxMS4zNjA2NjY3LDcuMjk4NjY2NjcgMTAuOTAxMzMzMyw3LjI5ODY2NjY3IEwxMC45MDEzMzMzLDcuMjk4NjY2NjcgWiIgaWQ9IuW9oueKtiI+PC9wYXRoPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=", Vj = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+6YCa55So5paH5Lu2PC90aXRsZT4KICAgIDxnIGlkPSLkvpvlupTllYbnrqHnkIYiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSLkvpvlupTllYbnrqHnkIYt5L6b5bqU5ZWG5YiX6KGo6K+m5oOFLTIw5p2h6ZmE5Lu2IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMzgzLjAwMDAwMCwgLTEwOTEuMDAwMDAwKSIgZmlsbC1ydWxlPSJub256ZXJvIj4KICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC0yMeWkh+S7vS0xMCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzc1LjAwMDAwMCwgMTA4NS4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxnIGlkPSLpgJrnlKjmlofku7YiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDguMDAwMDAwLCA2LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xMS42MTUsMCBMMTYsNC40MTMzMzMzMyBMMTYsMTQuNjY2NjY2NyBDMTYsMTUuNDAzMDQ2MyAxNS40MDMwNDYzLDE2IDE0LjY2NjY2NjcsMTYgTDMuMzMzMzMzMzMsMTYgQzIuNTk2OTUzNjYsMTYgMiwxNS40MDMwNDYzIDIsMTQuNjY2NjY2NyBMMiwxMyBMMC42NjY2NjY2NzIsMTMgQzAuMjk4NDc2ODM2LDEzIDAsMTIuNzAxNTIzMiAwLDEyLjMzMzMzMzMgTDAsNi42NjY2NjY2NyBDMCw2LjQ4OTg1NTY4IDAuMDcwMjM3ODk0MSw2LjMyMDI4NjQgMC4xOTUyNjIxNDcsNi4xOTUyNjIxNSBDMC4zMjAyODY0MDEsNi4wNzAyMzc4OSAwLjQ4OTg1NTY3Nyw2IDAuNjY2NjY2NjcyLDYgTDIsNiBMMiwxLjMzMzMzMzMzIEMyLDAuNTk2OTUzNjY1IDIuNTk2OTUzNjYsMCAzLjMzMzMzMzMzLDAgTDExLjYxNSwwIFogTTExLjE5ODY2NjcsMSBMMy4zMzMzMzMzMywxIEMzLjI0NDkyNzgzLDEgMy4xNjAxNDMyLDEuMDM1MTE4OTUgMy4wOTc2MzEwNywxLjA5NzYzMTA3IEMzLjAzNTExODk1LDEuMTYwMTQzMiAzLDEuMjQ0OTI3ODMgMywxLjMzMzMzMzMzIEwzLDYgTDEzLDYgQzEzLjE3NjgxMSw2IDEzLjM0NjM4MDMsNi4wNzAyMzc4OSAxMy40NzE0MDQ1LDYuMTk1MjYyMTUgQzEzLjU5NjQyODgsNi4zMjAyODY0IDEzLjY2NjY2NjcsNi40ODk4NTU2OCAxMy42NjY2NjY3LDYuNjY2NjY2NjcgTDEzLjY2NjY2NjcsMTIuMzMzMzMzMyBDMTMuNjY2NjY2NywxMi43MDE1MjMyIDEzLjM2ODE4OTgsMTMgMTMsMTMgTDMsMTMgTDMsMTQuNjY2NjY2NyBDMywxNC43NTUwNzIyIDMuMDM1MTE4OTUsMTQuODM5ODU2OCAzLjA5NzYzMTA3LDE0LjkwMjM2ODkgQzMuMTYwMTQzMiwxNC45NjQ4ODExIDMuMjQ0OTI3ODMsMTUgMy4zMzMzMzMzMywxNSBMMTQuNjY2NjY2NywxNSBDMTQuODUwNzYxNiwxNSAxNSwxNC44NTA3NjE2IDE1LDE0LjY2NjY2NjcgTDE1LDQuODI1MzMzMzMgTDE0Ljg0MjMzMzMsNC42NjY2NjY2NyBMMTIuODY1MzMzMyw0LjY2NjY2NjY3IEMxMi4wMTkyMzMxLDQuNjY2NjY2NjcgMTEuMzMzMzMzMywzLjk4MDc2NjkxIDExLjMzMzMzMzMsMy4xMzQ2NjY2NyBMMTEuMzMzMzMzMywxLjEzNTY2NjY3IEwxMS4xOTg2NjY3LDEgWiIgaWQ9IuW9oueKtiIgZmlsbD0iIzE4OTBGRiI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDxnIGlkPSJGSUxFIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxLjYwMDAwMCwgNy40MDAwMDApIiBmaWxsPSIjRkZGRkZGIj4KICAgICAgICAgICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IkYiIHBvaW50cz0iMi4zOTQgMC41OTQgMC42NzIgMC41OTQgMC42NzIgMS44MDYgMi4yNzQgMS44MDYgMi4yNzQgMi4zOTQgMC42NzIgMi4zOTQgMC42NzIgNC4xNjQgMCA0LjE2NCAwIDAgMi4zOTQgMCI+PC9wb2x5Z29uPgogICAgICAgICAgICAgICAgICAgICAgICA8cG9seWdvbiBpZD0iSSIgcG9pbnRzPSIzLjE4NiA0LjE2NCAzLjE4NiAwIDMuODU4IDAgMy44NTggNC4xNjQiPjwvcG9seWdvbj4KICAgICAgICAgICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IkwiIHBvaW50cz0iNS41NzQgMy41NjQgNy4zMjYgMy41NjQgNy4zMjYgNC4xNjQgNC45MDIgNC4xNjQgNC45MDIgMCA1LjU3NCAwIj48L3BvbHlnb24+CiAgICAgICAgICAgICAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJFIiBwb2ludHM9IjguNjY0IDMuNTY0IDEwLjUxMiAzLjU2NCAxMC41MTIgNC4xNjQgNy45OTIgNC4xNjQgNy45OTIgMCAxMC4zODYgMCAxMC4zODYgMC41OTQgOC42NjQgMC41OTQgOC42NjQgMS43MjggMTAuMjY2IDEuNzI4IDEwLjI2NiAyLjI5MiA4LjY2NCAyLjI5MiI+PC9wb2x5Z29uPgogICAgICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+", Ni = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+SlBFR+WbvuaghzwvdGl0bGU+CiAgICA8ZyBpZD0i5L6b5bqU5ZWG566h55CGIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0i5L6b5bqU5ZWG566h55CGLeS+m+W6lOWVhuWIl+ihqOivpuaDhS0yMOadoemZhOS7tiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTM4My4wMDAwMDAsIC03MzEuMDAwMDAwKSIgZmlsbC1ydWxlPSJub256ZXJvIj4KICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC0yMeWkh+S7vSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzc1LjAwMDAwMCwgNzI1LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPGcgaWQ9IkpQRUflm77moIciIHRyYW5zZm9ybT0idHJhbnNsYXRlKDguMDAwMDAwLCA2LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xMS42MTUsMCBMMTYsNC40MTMzMzMzMyBMMTYsMTQuNjY2NjY2NyBDMTYsMTUuNDAzMDQ2MyAxNS40MDMwNDYzLDE2IDE0LjY2NjY2NjcsMTYgTDMuMzMzMzMzMzMsMTYgQzIuNTk2OTUzNjYsMTYgMiwxNS40MDMwNDYzIDIsMTQuNjY2NjY2NyBMMiwxMyBMMC42NjY2NjY2NzIsMTMgQzAuMjk4NDc2ODM2LDEzIDAsMTIuNzAxNTIzMiAwLDEyLjMzMzMzMzMgTDAsNi42NjY2NjY2NyBDMCw2LjQ4OTg1NTY4IDAuMDcwMjM3ODk0MSw2LjMyMDI4NjQgMC4xOTUyNjIxNDcsNi4xOTUyNjIxNSBDMC4zMjAyODY0MDEsNi4wNzAyMzc4OSAwLjQ4OTg1NTY3Nyw2IDAuNjY2NjY2NjcyLDYgTDIsNiBMMiwxLjMzMzMzMzMzIEMyLDAuNTk2OTUzNjY1IDIuNTk2OTUzNjYsMCAzLjMzMzMzMzMzLDAgTDExLjYxNSwwIFogTTExLjE5ODY2NjcsMSBMMy4zMzMzMzMzMywxIEMzLjI0NDkyNzgzLDEgMy4xNjAxNDMyLDEuMDM1MTE4OTUgMy4wOTc2MzEwNywxLjA5NzYzMTA3IEMzLjAzNTExODk1LDEuMTYwMTQzMiAzLDEuMjQ0OTI3ODMgMywxLjMzMzMzMzMzIEwzLDYgTDEzLDYgQzEzLjE3NjgxMSw2IDEzLjM0NjM4MDMsNi4wNzAyMzc4OSAxMy40NzE0MDQ1LDYuMTk1MjYyMTUgQzEzLjU5NjQyODgsNi4zMjAyODY0IDEzLjY2NjY2NjcsNi40ODk4NTU2OCAxMy42NjY2NjY3LDYuNjY2NjY2NjcgTDEzLjY2NjY2NjcsMTIuMzMzMzMzMyBDMTMuNjY2NjY2NywxMi43MDE1MjMyIDEzLjM2ODE4OTgsMTMgMTMsMTMgTDMsMTMgTDMsMTQuNjY2NjY2NyBDMywxNC43NTUwNzIyIDMuMDM1MTE4OTUsMTQuODM5ODU2OCAzLjA5NzYzMTA3LDE0LjkwMjM2ODkgQzMuMTYwMTQzMiwxNC45NjQ4ODExIDMuMjQ0OTI3ODMsMTUgMy4zMzMzMzMzMywxNSBMMTQuNjY2NjY2NywxNSBDMTQuODUwNzYxNiwxNSAxNSwxNC44NTA3NjE2IDE1LDE0LjY2NjY2NjcgTDE1LDQuODI1MzMzMzMgTDE0Ljg0MjMzMzMsNC42NjY2NjY2NyBMMTIuODY1MzMzMyw0LjY2NjY2NjY3IEMxMi4wMTkyMzMxLDQuNjY2NjY2NjcgMTEuMzMzMzMzMywzLjk4MDc2NjkxIDExLjMzMzMzMzMsMy4xMzQ2NjY2NyBMMTEuMzMzMzMzMywxLjEzNTY2NjY3IEwxMS4xOTg2NjY3LDEgWiIgaWQ9IuW9oueKtiIgZmlsbD0iI0Y2NzUwMCI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0yLjQzMjMzMzMzLDcuMzgyNjY2NjcgTDIuOTk1LDcuMzgyNjY2NjcgTDIuOTk1LDEwLjI4MDY2NjcgQzIuOTk1LDEwLjc3MjY2NjcgMi45MTMsMTEuMTMyNjY2NyAyLjc0OTY2NjY3LDExLjM3MjY2NjcgQzIuNTY3LDExLjYyNDY2NjcgMi4yNzg2NjY2NywxMS43NTA2NjY3IDEuODc5NjY2NjcsMTEuNzUwNjY2NyBDMS41MzMzMzMzNCwxMS43NTA2NjY3IDEuMjY5LDExLjYzMDY2NjcgMS4wOTEsMTEuMzkwNjY2NyBDMC45MDgzMzMzMjgsMTEuMTUwNjY2NyAwLjgxNywxMC44MjA2NjY3IDAuODE3LDEwLjQwMDY2NjcgTDAuODE3LDEwLjI2MjY2NjcgTDEuMzc5MzMzMzMsMTAuMjYyNjY2NyBMMS4zNzkzMzMzMywxMC4zOTQ2NjY3IEMxLjM3OTMzMzMzLDEwLjg4NjY2NjcgMS41NDc2NjY2NiwxMS4xMzI2NjY3IDEuODg5MzMzMzMsMTEuMTMyNjY2NyBDMi4wNzY2NjY2NiwxMS4xMzI2NjY3IDIuMjE2LDExLjA2MDY2NjcgMi4zMDI2NjY2NywxMC45MjI2NjY3IEMyLjM4OTMzMzM0LDEwLjc4NDY2NjcgMi40MzI2NjY2NywxMC41NjI2NjY3IDIuNDMyNjY2NjcsMTAuMjU2NjY2NyBMMi40MzI2NjY2Nyw3LjM4MjY2NjY3IEwyLjQzMjMzMzMzLDcuMzgyNjY2NjcgWiBNMy42NjgsNy4zODI2NjY2NyBMNS4wOTEsNy4zODI2NjY2NyBDNS45MTc2NjY2Nyw3LjM4MjY2NjY3IDYuMzM2LDcuODIwNjY2NjcgNi4zMzYsOC42OTY2NjY2NyBDNi4zMzYsOS41Nzg2NjY2NyA1LjkxOCwxMC4wMjI2NjY3IDUuMDgxMzMzMzMsMTAuMDIyNjY2NyBMNC4yMzAzMzMzMywxMC4wMjI2NjY3IEw0LjIzMDMzMzMzLDExLjY2NjY2NjcgTDMuNjY4LDExLjY2NjY2NjcgTDMuNjY4LDcuMzgyNjY2NjcgWiBNNC4yMzAzMzMzMyw3Ljk4MjY2NjY3IEw0LjIzMDMzMzMzLDkuNDIyNjY2NjcgTDUuMDQ3NjY2NjcsOS40MjI2NjY2NyBDNS4yOTc2NjY2Nyw5LjQyMjY2NjY3IDUuNDgwMzMzMzQsOS4zNjI2NjY2NyA1LjU5NTY2NjY3LDkuMjU0NjY2NjcgQzUuNzExMzMzMzQsOS4xNDA2NjY2NyA1Ljc2OSw4Ljk1NDY2NjY3IDUuNzY5LDguNjk2NjY2NjcgQzUuNzY5LDguNDM4NjY2NjcgNS43MDYzMzMzMyw4LjI1ODY2NjY3IDUuNTkxLDguMTUwNjY2NjcgQzUuNDc1NjY2NjcsOC4wMzY2NjY2NyA1LjI5Myw3Ljk4MjY2NjY3IDUuMDQ3NjY2NjcsNy45ODI2NjY2NyBMNC4yMzAzMzMzMyw3Ljk4MjY2NjY3IEw0LjIzMDMzMzMzLDcuOTgyNjY2NjcgWiBNNi44MTcsNy4zODI2NjY2NyBMOS4yOTMsNy4zODI2NjY2NyBMOS4yOTMsNy45ODI2NjY2NyBMNy4zNzk2NjY2Nyw3Ljk4MjY2NjY3IEw3LjM3OTY2NjY3LDkuMTcwNjY2NjcgTDkuMTc3MzMzMzMsOS4xNzA2NjY2NyBMOS4xNzczMzMzMyw5Ljc3MDY2NjY3IEw3LjM3OTMzMzMzLDkuNzcwNjY2NjcgTDcuMzc5MzMzMzMsMTEuMDY2NjY2NyBMOS4zNzQ2NjY2NywxMS4wNjY2NjY3IEw5LjM3NDY2NjY3LDExLjY2NjY2NjcgTDYuODE2NjY2NjcsMTEuNjY2NjY2NyBMNi44MTY2NjY2Nyw3LjM4MjY2NjY3IEw2LjgxNyw3LjM4MjY2NjY3IFogTTExLjM5MzY2NjcsNy4yOTg2NjY2NyBDMTEuODM2LDcuMjk4NjY2NjcgMTIuMTgyMzMzMyw3LjQxODY2NjY3IDEyLjQzNyw3LjY2NDY2NjY3IEMxMi42ODIzMzMzLDcuOTA0NjY2NjcgMTIuODM2LDguMjU4NjY2NjcgMTIuODk4NjY2Nyw4LjczODY2NjY3IEwxMi4zMzEzMzMzLDguNzM4NjY2NjcgQzEyLjI4MzMzMzMsOC40NjI2NjY2NyAxMi4xNzczMzMzLDguMjU4NjY2NjcgMTIuMDIzNjY2Nyw4LjEyMDY2NjY3IEMxMS44NjUsNy45ODI2NjY2NyAxMS42NTM2NjY3LDcuOTE2NjY2NjcgMTEuMzkzNjY2Nyw3LjkxNjY2NjY3IEMxMS4wNzE2NjY3LDcuOTE2NjY2NjcgMTAuODE3LDguMDQ4NjY2NjcgMTAuNjI5MzMzMyw4LjMyNDY2NjY3IEMxMC40MjI2NjY3LDguNjEyNjY2NjcgMTAuMzIxNjY2Nyw5LjAxNDY2NjY3IDEwLjMyMTY2NjcsOS41NDI2NjY2NyBDMTAuMzIxNjY2NywxMC4wNDY2NjY3IDEwLjQxMywxMC40MzY2NjY3IDEwLjU5NTY2NjcsMTAuNzA2NjY2NyBDMTAuNzkzLDEwLjk5NDY2NjcgMTEuMTAwNjY2NywxMS4xMzg2NjY3IDExLjUxOSwxMS4xMzg2NjY3IEMxMS42ODIzMzMzLDExLjEzODY2NjcgMTEuODM2LDExLjExNDY2NjcgMTEuOTgwMzMzMywxMS4wNjY2NjY3IEMxMi4xMTI2MzI3LDExLjAxODk5NjQgMTIuMjM3Mjc2NSwxMC45NTIyOTUxIDEyLjM1MDMzMzMsMTAuODY4NjY2NyBMMTIuMzUwMzMzMyw5Ljk4NjY2NjY3IEwxMS40NDIsOS45ODY2NjY2NyBMMTEuNDQyLDkuMzg2NjY2NjcgTDEyLjkxMyw5LjM4NjY2NjY3IEwxMi45MTMsMTEuMTk4NjY2NyBDMTIuNzMzODY0NiwxMS4zNzQ4NjcyIDEyLjUyMTM4NzIsMTEuNTEzNTcyNCAxMi4yODgsMTEuNjA2NjY2NyBDMTIuMDM4LDExLjcwMjY2NjcgMTEuNzY0LDExLjc1MDY2NjcgMTEuNDU2MzMzMywxMS43NTA2NjY3IEMxMC45MDgzMzMzLDExLjc1MDY2NjcgMTAuNDg1LDExLjUzNDY2NjcgMTAuMTgyMzMzMywxMS4xMDI2NjY3IEM5Ljg5ODY2NjY2LDEwLjcwMDY2NjcgOS43NTksMTAuMTc4NjY2NyA5Ljc1OSw5LjU0MjY2NjY3IEM5Ljc1OSw4LjkwMDY2NjY3IDkuODk4NjY2NjcsOC4zNzI2NjY2NyAxMC4xODIzMzMzLDcuOTU4NjY2NjcgQzEwLjQ4MDMzMzMsNy41MTQ2NjY2NyAxMC44ODQzMzMzLDcuMjk4NjY2NjcgMTEuMzkzNjY2Nyw3LjI5ODY2NjY3IEwxMS4zOTM2NjY3LDcuMjk4NjY2NjcgWiIgaWQ9IuW9oueKtiIgZmlsbD0iI0ZGRkZGRiI+PC9wYXRoPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=", Fj = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+UERG5Zu+5qCHPC90aXRsZT4KICAgIDxnIGlkPSLkvpvlupTllYbnrqHnkIYiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSLkvpvlupTllYbnrqHnkIYt5L6b5bqU5ZWG5YiX6KGo6K+m5oOFLTIw5p2h6ZmE5Lu2IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMzgzLjAwMDAwMCwgLTY5MS4wMDAwMDApIiBmaWxsPSIjRUE0MzE4IiBmaWxsLXJ1bGU9Im5vbnplcm8iPgogICAgICAgICAgICA8ZyBpZD0i57yW57uELTIxIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzNzUuMDAwMDAwLCA2ODUuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8ZyBpZD0iUERG5Zu+5qCHIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg4LjAwMDAwMCwgNi4wMDAwMDApIj4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMyw2IEwxMyw2IEMxMy4xNzY4MTEsNiAxMy4zNDYzODAzLDYuMDcwMjM3ODkgMTMuNDcxNDA0NSw2LjE5NTI2MjE1IEMxMy41OTY0Mjg4LDYuMzIwMjg2NCAxMy42NjY2NjY3LDYuNDg5ODU1NjggMTMuNjY2NjY2Nyw2LjY2NjY2NjY3IEwxMy42NjY2NjY3LDEyLjMzMzMzMzMgQzEzLjY2NjY2NjcsMTIuNzAxNTIzMiAxMy4zNjgxODk4LDEzIDEzLDEzIEwzLDEzIEwzLDE0LjY2NjY2NjcgQzMsMTQuNzU1MDcyMiAzLjAzNTExODk1LDE0LjgzOTg1NjggMy4wOTc2MzEwNywxNC45MDIzNjg5IEMzLjE2MDE0MzIsMTQuOTY0ODgxMSAzLjI0NDkyNzgzLDE1IDMuMzMzMzMzMzMsMTUgTDE0LjY2NjY2NjcsMTUgQzE0Ljg1MDc2MTYsMTUgMTUsMTQuODUwNzYxNiAxNSwxNC42NjY2NjY3IEwxNSw0LjgyNTMzMzMzIEwxNC44NDIzMzMzLDQuNjY2NjY2NjcgTDEyLjg2NTMzMzMsNC42NjY2NjY2NyBDMTIuMDE5MjMzMSw0LjY2NjY2NjY3IDExLjMzMzMzMzMsMy45ODA3NjY5MSAxMS4zMzMzMzMzLDMuMTM0NjY2NjcgTDExLjMzMzMzMzMsMS4xMzUzMzMzMyBMMTEuMTk4NjY2NywxIEwzLjMzMzMzMzMzLDEgQzMuMjQ0OTI3ODMsMSAzLjE2MDE0MzIsMS4wMzUxMTg5NSAzLjA5NzYzMTA3LDEuMDk3NjMxMDcgQzMuMDM1MTE4OTUsMS4xNjAxNDMyIDMsMS4yNDQ5Mjc4MyAzLDEuMzMzMzMzMzMgTDMsNiBaIE0yLDEzIEwwLjY2NjY2NjY3MiwxMyBDMC4yOTg0NzY4MzYsMTMgMCwxMi43MDE1MjMyIDAsMTIuMzMzMzMzMyBMMCw2LjY2NjY2NjY3IEMwLDYuNDg5ODU1NjggMC4wNzAyMzc4OTQxLDYuMzIwMjg2NCAwLjE5NTI2MjE0Nyw2LjE5NTI2MjE1IEMwLjMyMDI4NjQwMSw2LjA3MDIzNzg5IDAuNDg5ODU1Njc3LDYgMC42NjY2NjY2NzIsNiBMMiw2IEwyLDEuMzMzMzMzMzMgQzIsMC41OTY5NTM2NjUgMi41OTY5NTM2NiwwIDMuMzMzMzMzMzMsMCBMMTEuNjE1LDAgTDE2LDQuNDEzMzMzMzMgTDE2LDE0LjY2NjY2NjcgQzE2LDE1LjQwMzA0NjMgMTUuNDAzMDQ2MywxNiAxNC42NjY2NjY3LDE2IEwzLjMzMzMzMzMzLDE2IEMyLjU5Njk1MzY2LDE2IDIsMTUuNDAzMDQ2MyAyLDE0LjY2NjY2NjcgTDIsMTMgTDIsMTMgWiBNMS4zODIzMzMzMyw3LjM4MjY2NjY3IEwxLjM4MjMzMzMzLDExLjY2NjY2NjcgTDIuMDg0MzMzMzMsMTEuNjY2NjY2NyBMMi4wODQzMzMzMywxMC4wMjI2NjY3IEwzLjE0NjMzMzMzLDEwLjAyMjY2NjcgQzQuMTkwMzMzMzMsMTAuMDIyNjY2NyA0LjcxMjMzMzMzLDkuNTc4NjY2NjcgNC43MTIzMzMzMyw4LjY5NjY2NjY3IEM0LjcxMjMzMzMzLDcuODIwNjY2NjcgNC4xOTAzMzMzMyw3LjM4MjY2NjY3IDMuMTU4MzMzMzMsNy4zODI2NjY2NyBMMS4zODIzMzMzMyw3LjM4MjY2NjY3IFogTTIuMDg0MzMzMzMsNy45ODI2NjY2NyBMMy4xMDQzMzMzMyw3Ljk4MjY2NjY3IEMzLjQxMDMzMzMzLDcuOTgyNjY2NjcgMy42MzgzMzMzMyw4LjAzNjY2NjY3IDMuNzgyMzMzMzMsOC4xNTA2NjY2NyBDMy45MjYzMzMzMyw4LjI1ODY2NjY3IDQuMDA0MzMzMzMsOC40Mzg2NjY2NyA0LjAwNDMzMzMzLDguNjk2NjY2NjcgQzQuMDA0MzMzMzMsOC45NTQ2NjY2NyAzLjkzMjMzMzMzLDkuMTQwNjY2NjcgMy43ODgzMzMzMyw5LjI1NDY2NjY3IEMzLjY0NDMzMzMzLDkuMzYyNjY2NjcgMy40MTYzMzMzMyw5LjQyMjY2NjY3IDMuMTA0MzMzMzMsOS40MjI2NjY2NyBMMi4wODQzMzMzMyw5LjQyMjY2NjY3IEwyLjA4NDMzMzMzLDcuOTgyNjY2NjcgTDIuMDg0MzMzMzMsNy45ODI2NjY2NyBaIE01LjMxMjMzMzMzLDcuMzgyNjY2NjcgTDUuMzEyMzMzMzMsMTEuNjY2NjY2NyBMNi44NzgzMzMzMywxMS42NjY2NjY3IEM3LjU3NDMzMzMzLDExLjY2NjY2NjcgOC4wOTYzMzMzMywxMS40NzQ2NjY3IDguNDU2MzMzMzMsMTEuMDkwNjY2NyBDOC43OTgzMzMzMywxMC43MjQ2NjY3IDguOTcyMzMzMzMsMTAuMjAyNjY2NyA4Ljk3MjMzMzMzLDkuNTI0NjY2NjcgQzguOTcyMzMzMzMsOC44NDA2NjY2NyA4Ljc5ODMzMzMzLDguMzE4NjY2NjcgOC40NTYzMzMzMyw3Ljk1ODY2NjY3IEM4LjA5NjMzMzMzLDcuNTc0NjY2NjcgNy41NzQzMzMzMyw3LjM4MjY2NjY3IDYuODc4MzMzMzMsNy4zODI2NjY2NyBMNS4zMTIzMzMzMyw3LjM4MjY2NjY3IFogTTYuMDE0MzMzMzMsNy45ODI2NjY2NyBMNi43NDYzMzMzMyw3Ljk4MjY2NjY3IEM3LjI4MDMzMzMzLDcuOTgyNjY2NjcgNy42NzAzMzMzMyw4LjEwMjY2NjY3IDcuOTE2MzMzMzMsOC4zNDg2NjY2NyBDOC4xNTYzMzMzMyw4LjU4ODY2NjY3IDguMjc2MzMzMzMsOC45ODQ2NjY2NyA4LjI3NjMzMzMzLDkuNTI0NjY2NjcgQzguMjc2MzMzMzMsMTAuMDUyNjY2NyA4LjE1NjMzMzMzLDEwLjQ0MjY2NjcgNy45MTYzMzMzMywxMC42OTQ2NjY3IEM3LjY3MDMzMzMzLDEwLjk0MDY2NjcgNy4yODAzMzMzMywxMS4wNjY2NjY3IDYuNzQ2MzMzMzMsMTEuMDY2NjY2NyBMNi4wMTQzMzMzMywxMS4wNjY2NjY3IEw2LjAxNDMzMzMzLDcuOTgyNjY2NjcgTDYuMDE0MzMzMzMsNy45ODI2NjY2NyBaIE05LjYzMjMzMzMzLDcuMzgyNjY2NjcgTDkuNjMyMzMzMzMsMTEuNjY2NjY2NyBMMTAuMzM0MzMzMywxMS42NjY2NjY3IEwxMC4zMzQzMzMzLDkuNzcwNjY2NjcgTDEyLjQyODMzMzMsOS43NzA2NjY2NyBMMTIuNDI4MzMzMyw5LjE3MDY2NjY3IEwxMC4zMzQzMzMzLDkuMTcwNjY2NjcgTDEwLjMzNDMzMzMsNy45ODI2NjY2NyBMMTIuNTU0MzMzMyw3Ljk4MjY2NjY3IEwxMi41NTQzMzMzLDcuMzgyNjY2NjcgTDkuNjMyMzMzMzMsNy4zODI2NjY2NyBaIiBpZD0i5b2i54q2Ij48L3BhdGg+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==", Rj = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+UE5H5Zu+5qCHPC90aXRsZT4KICAgIDxnIGlkPSLkvpvlupTllYbnrqHnkIYiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSLkvpvlupTllYbnrqHnkIYt5L6b5bqU5ZWG5YiX6KGo6K+m5oOFLTIw5p2h6ZmE5Lu2IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMzgzLjAwMDAwMCwgLTk3MS4wMDAwMDApIiBmaWxsPSIjRkNDQzAwIiBmaWxsLXJ1bGU9Im5vbnplcm8iPgogICAgICAgICAgICA8ZyBpZD0i57yW57uELTIx5aSH5Lu9LTciIHRyYW5zZm9ybT0idHJhbnNsYXRlKDM3NS4wMDAwMDAsIDk2NS4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxnIGlkPSJQTkflm77moIciIHRyYW5zZm9ybT0idHJhbnNsYXRlKDguMDAwMDAwLCA2LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0zLDYgTDEzLDYgQzEzLjE3NjgxMSw2IDEzLjM0NjM4MDMsNi4wNzAyMzc4OSAxMy40NzE0MDQ1LDYuMTk1MjYyMTUgQzEzLjU5NjQyODgsNi4zMjAyODY0IDEzLjY2NjY2NjcsNi40ODk4NTU2OCAxMy42NjY2NjY3LDYuNjY2NjY2NjcgTDEzLjY2NjY2NjcsMTIuMzMzMzMzMyBDMTMuNjY2NjY2NywxMi43MDE1MjMyIDEzLjM2ODE4OTgsMTMgMTMsMTMgTDMsMTMgTDMsMTQuNjY2NjY2NyBDMywxNC43NTUwNzIyIDMuMDM1MTE4OTUsMTQuODM5ODU2OCAzLjA5NzYzMTA3LDE0LjkwMjM2ODkgQzMuMTYwMTQzMiwxNC45NjQ4ODExIDMuMjQ0OTI3ODMsMTUgMy4zMzMzMzMzMywxNSBMMTQuNjY2NjY2NywxNSBDMTQuODUwNzYxNiwxNSAxNSwxNC44NTA3NjE2IDE1LDE0LjY2NjY2NjcgTDE1LDQuODI1MzMzMzMgTDE0Ljg0MjMzMzMsNC42NjY2NjY2NyBMMTIuODY1MzMzMyw0LjY2NjY2NjY3IEMxMi4wMTkyMzMxLDQuNjY2NjY2NjcgMTEuMzMzMzMzMywzLjk4MDc2NjkxIDExLjMzMzMzMzMsMy4xMzQ2NjY2NyBMMTEuMzMzMzMzMywxLjEzNTMzMzMzIEwxMS4xOTg2NjY3LDEgTDMuMzMzMzMzMzMsMSBDMy4yNDQ5Mjc4MywxIDMuMTYwMTQzMiwxLjAzNTExODk1IDMuMDk3NjMxMDcsMS4wOTc2MzEwNyBDMy4wMzUxMTg5NSwxLjE2MDE0MzIgMywxLjI0NDkyNzgzIDMsMS4zMzMzMzMzMyBMMyw2IFogTTIsMTMgTDAuNjY2NjY2NjcyLDEzIEMwLjI5ODQ3NjgzNiwxMyAwLDEyLjcwMTUyMzIgMCwxMi4zMzMzMzMzIEwwLDYuNjY2NjY2NjcgQzAsNi40ODk4NTU2OCAwLjA3MDIzNzg5NDEsNi4zMjAyODY0IDAuMTk1MjYyMTQ3LDYuMTk1MjYyMTUgQzAuMzIwMjg2NDAxLDYuMDcwMjM3ODkgMC40ODk4NTU2NzcsNiAwLjY2NjY2NjY3Miw2IEwyLDYgTDIsMS4zMzMzMzMzMyBDMiwwLjU5Njk1MzY2NSAyLjU5Njk1MzY2LDAgMy4zMzMzMzMzMywwIEwxMS42MTUsMCBMMTYsNC40MTMzMzMzMyBMMTYsMTQuNjY2NjY2NyBDMTYsMTUuNDAzMDQ2MyAxNS40MDMwNDYzLDE2IDE0LjY2NjY2NjcsMTYgTDMuMzMzMzMzMzMsMTYgQzIuNTk2OTUzNjYsMTYgMiwxNS40MDMwNDYzIDIsMTQuNjY2NjY2NyBMMiwxMyBMMiwxMyBaIE0xLjQ0MjMzMzMzLDcuMzgyNjY2NjcgTDEuNDQyMzMzMzMsMTEuNjY2NjY2NyBMMi4wNzIzMzMzMywxMS42NjY2NjY3IEwyLjA3MjMzMzMzLDEwLjAyMjY2NjcgTDMuMDI1NjY2NjcsMTAuMDIyNjY2NyBDMy45NjMsMTAuMDIyNjY2NyA0LjQzMTMzMzMzLDkuNTc4NjY2NjcgNC40MzEzMzMzMyw4LjY5NjY2NjY3IEM0LjQzMTMzMzMzLDcuODIwNjY2NjcgMy45NjMsNy4zODI2NjY2NyAzLjAzNjMzMzMzLDcuMzgyNjY2NjcgTDEuNDQyMzMzMzMsNy4zODI2NjY2NyBaIE0yLjA3MjMzMzMzLDcuOTgyNjY2NjcgTDIuOTg4LDcuOTgyNjY2NjcgQzMuMjYyNjY2NjcsNy45ODI2NjY2NyAzLjQ2NzMzMzMzLDguMDM2NjY2NjcgMy41OTY2NjY2Nyw4LjE1MDY2NjY3IEMzLjcyNiw4LjI1ODY2NjY3IDMuNzk2LDguNDM4NjY2NjcgMy43OTYsOC42OTY2NjY2NyBDMy43OTYsOC45NTQ2NjY2NyAzLjczMTMzMzMzLDkuMTQwNjY2NjcgMy42MDIsOS4yNTQ2NjY2NyBDMy40NzI2NjY2Nyw5LjM2MjY2NjY3IDMuMjY4LDkuNDIyNjY2NjcgMi45ODgsOS40MjI2NjY2NyBMMi4wNzIzMzMzMyw5LjQyMjY2NjY3IEwyLjA3MjMzMzMzLDcuOTgyNjY2NjcgTDIuMDcyMzMzMzMsNy45ODI2NjY2NyBaIE00Ljk3LDcuMzgyNjY2NjcgTDQuOTcsMTEuNjY2NjY2NyBMNS42LDExLjY2NjY2NjcgTDUuNiw4LjUzNDY2NjY3IEw1LjYyMTY2NjY3LDguNTM0NjY2NjcgTDcuNTQ0NjY2NjcsMTEuNjY2NjY2NyBMOC4xNTg2NjY2NywxMS42NjY2NjY3IEw4LjE1ODY2NjY3LDcuMzgyNjY2NjcgTDcuNTIzMzMzMzMsNy4zODI2NjY2NyBMNy41MjMzMzMzMywxMC40NzI2NjY3IEw3LjUwMiwxMC40NzI2NjY3IEw1LjYwMDY2NjY3LDcuMzgyNjY2NjcgTDQuOTcwNjY2NjcsNy4zODI2NjY2NyBMNC45Nyw3LjM4MjY2NjY3IFogTTEwLjU4MjMzMzMsNy4yOTg2NjY2NyBDMTAuMDExNjY2Nyw3LjI5ODY2NjY3IDkuNTU5LDcuNTE0NjY2NjcgOS4yMjUsNy45NTg2NjY2NyBDOC45MDczMzMzMyw4LjM3MjY2NjY3IDguNzUxMzMzMzMsOC45MDA2NjY2NyA4Ljc1MTMzMzMzLDkuNTQyNjY2NjcgQzguNzUxMzMzMzMsMTAuMTc4NjY2NyA4LjkwNzMzMzMzLDEwLjcwMDY2NjcgOS4yMjUsMTEuMTAyNjY2NyBDOS41NjQzMzMzMywxMS41MzQ2NjY3IDEwLjAzODMzMzMsMTEuNzUwNjY2NyAxMC42NTIzMzMzLDExLjc1MDY2NjcgQzEwLjk5NzMzMzMsMTEuNzUwNjY2NyAxMS4zMDQzMzMzLDExLjcwMjY2NjcgMTEuNTg0MzMzMywxMS42MDY2NjY3IEMxMS44NDEzNDcyLDExLjUxNjExMTQgMTIuMDc4ODcxMywxMS4zNzc2Njg3IDEyLjI4NDMzMzMsMTEuMTk4NjY2NyBMMTIuMjg0MzMzMyw5LjM4NjY2NjY3IEwxMC42MzY2NjY3LDkuMzg2NjY2NjcgTDEwLjYzNjY2NjcsOS45ODY2NjY2NyBMMTEuNjU0NjY2Nyw5Ljk4NjY2NjY3IEwxMS42NTQ2NjY3LDEwLjg2ODY2NjcgQzExLjUyNjA4MzIsMTAuOTUzMjAxNiAxMS4zODY1NzY4LDExLjAxOTgxNDggMTEuMjQsMTEuMDY2NjY2NyBDMTEuMDcyMDU4NywxMS4xMTU1NTc4IDEwLjg5NzkwOTUsMTEuMTM5ODEwNyAxMC43MjMsMTEuMTM4NjY2NyBDMTAuMjU0MzMzMywxMS4xMzg2NjY3IDkuOTA5NjY2NjcsMTAuOTk0NjY2NyA5LjY4ODY2NjY3LDEwLjcwNjY2NjcgQzkuNDg0LDEwLjQzNjY2NjcgOS4zODIsMTAuMDQ2NjY2NyA5LjM4Miw5LjU0MjY2NjY3IEM5LjM4Miw5LjAxNDY2NjY3IDkuNDk0NjY2NjcsOC42MTI2NjY2NyA5LjcyNjMzMzMzLDguMzI0NjY2NjcgQzkuOTM2MzMzMzMsOC4wNDg2NjY2NyAxMC4yMjIsNy45MTY2NjY2NyAxMC41ODMsNy45MTY2NjY2NyBDMTAuODczNjY2Nyw3LjkxNjY2NjY3IDExLjExMDY2NjcsNy45ODI2NjY2NyAxMS4yODgzMzMzLDguMTIwNjY2NjcgQzExLjQ2MDY2NjcsOC4yNTg2NjY2NyAxMS41NzkzMzMzLDguNDYyNjY2NjcgMTEuNjMzLDguNzM4NjY2NjcgTDEyLjI2ODY2NjcsOC43Mzg2NjY2NyBDMTIuMTk4NjY2Nyw4LjI1ODY2NjY3IDEyLjAyNjMzMzMsNy45MDQ2NjY2NyAxMS43NTE2NjY3LDcuNjY0NjY2NjcgQzExLjQ2Niw3LjQxODY2NjY3IDExLjA3ODMzMzMsNy4yOTg2NjY2NyAxMC41ODI2NjY3LDcuMjk4NjY2NjcgTDEwLjU4MjMzMzMsNy4yOTg2NjY2NyBaIiBpZD0i5b2i54q2Ij48L3BhdGg+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==", Cu = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+UFBU5Zu+5qCHPC90aXRsZT4KICAgIDxnIGlkPSLkvpvlupTllYbnrqHnkIYiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSLkvpvlupTllYbnrqHnkIYt5L6b5bqU5ZWG5YiX6KGo6K+m5oOFLTIw5p2h6ZmE5Lu2IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMzgzLjAwMDAwMCwgLTg5MS4wMDAwMDApIiBmaWxsPSIjRjg1MjA3IiBmaWxsLXJ1bGU9Im5vbnplcm8iPgogICAgICAgICAgICA8ZyBpZD0i57yW57uELTIx5aSH5Lu9LTUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDM3NS4wMDAwMDAsIDg4NS4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxnIGlkPSJQUFTlm77moIciIHRyYW5zZm9ybT0idHJhbnNsYXRlKDguMDAwMDAwLCA2LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0zLDYgTDEzLDYgQzEzLjE3NjgxMSw2IDEzLjM0NjM4MDMsNi4wNzAyMzc4OSAxMy40NzE0MDQ1LDYuMTk1MjYyMTUgQzEzLjU5NjQyODgsNi4zMjAyODY0IDEzLjY2NjY2NjcsNi40ODk4NTU2OCAxMy42NjY2NjY3LDYuNjY2NjY2NjcgTDEzLjY2NjY2NjcsMTIuMzMzMzMzMyBDMTMuNjY2NjY2NywxMi43MDE1MjMyIDEzLjM2ODE4OTgsMTMgMTMsMTMgTDMsMTMgTDMsMTQuNjY2NjY2NyBDMywxNC43NTUwNzIyIDMuMDM1MTE4OTUsMTQuODM5ODU2OCAzLjA5NzYzMTA3LDE0LjkwMjM2ODkgQzMuMTYwMTQzMiwxNC45NjQ4ODExIDMuMjQ0OTI3ODMsMTUgMy4zMzMzMzMzMywxNSBMMTQuNjY2NjY2NywxNSBDMTQuODUwNzYxNiwxNSAxNSwxNC44NTA3NjE2IDE1LDE0LjY2NjY2NjcgTDE1LDQuODI1MzMzMzMgTDE0Ljg0MjMzMzMsNC42NjY2NjY2NyBMMTIuODY1MzMzMyw0LjY2NjY2NjY3IEMxMi4wMTkyMzMxLDQuNjY2NjY2NjcgMTEuMzMzMzMzMywzLjk4MDc2NjkxIDExLjMzMzMzMzMsMy4xMzQ2NjY2NyBMMTEuMzMzMzMzMywxLjEzNTMzMzMzIEwxMS4xOTg2NjY3LDEgTDMuMzMzMzMzMzMsMSBDMy4yNDQ5Mjc4MywxIDMuMTYwMTQzMiwxLjAzNTExODk1IDMuMDk3NjMxMDcsMS4wOTc2MzEwNyBDMy4wMzUxMTg5NSwxLjE2MDE0MzIgMywxLjI0NDkyNzgzIDMsMS4zMzMzMzMzMyBMMyw2IFogTTIsMTMgTDAuNjY2NjY2NjcyLDEzIEMwLjI5ODQ3NjgzNiwxMyAwLDEyLjcwMTUyMzIgMCwxMi4zMzMzMzMzIEwwLDYuNjY2NjY2NjcgQzAsNi40ODk4NTU2OCAwLjA3MDIzNzg5NDEsNi4zMjAyODY0IDAuMTk1MjYyMTQ3LDYuMTk1MjYyMTUgQzAuMzIwMjg2NDAxLDYuMDcwMjM3ODkgMC40ODk4NTU2NzcsNiAwLjY2NjY2NjY3Miw2IEwyLDYgTDIsMS4zMzMzMzMzMyBDMiwwLjU5Njk1MzY2NSAyLjU5Njk1MzY2LDAgMy4zMzMzMzMzMywwIEwxMS42MTUsMCBMMTYsNC40MTMzMzMzMyBMMTYsMTQuNjY2NjY2NyBDMTYsMTUuNDAzMDQ2MyAxNS40MDMwNDYzLDE2IDE0LjY2NjY2NjcsMTYgTDMuMzMzMzMzMzMsMTYgQzIuNTk2OTUzNjYsMTYgMiwxNS40MDMwNDYzIDIsMTQuNjY2NjY2NyBMMiwxMyBMMiwxMyBaIE0xLjQ3ODMzMzMzLDcuMzgyNjY2NjcgTDEuNDc4MzMzMzMsMTEuNjY2NjY2NyBMMi4xODAzMzMzMywxMS42NjY2NjY3IEwyLjE4MDMzMzMzLDEwLjAyMjY2NjcgTDMuMjQyMzMzMzMsMTAuMDIyNjY2NyBDNC4yODYzMzMzMywxMC4wMjI2NjY3IDQuODA4MzMzMzMsOS41Nzg2NjY2NyA0LjgwODMzMzMzLDguNjk2NjY2NjcgQzQuODA4MzMzMzMsNy44MjA2NjY2NyA0LjI4NjMzMzMzLDcuMzgyNjY2NjcgMy4yNTQzMzMzMyw3LjM4MjY2NjY3IEwxLjQ3ODMzMzMzLDcuMzgyNjY2NjcgWiBNMi4xODAzMzMzMyw3Ljk4MjY2NjY3IEwzLjIwMDMzMzMzLDcuOTgyNjY2NjcgQzMuNTA2MzMzMzMsNy45ODI2NjY2NyAzLjczNDMzMzMzLDguMDM2NjY2NjcgMy44NzgzMzMzMyw4LjE1MDY2NjY3IEM0LjAyMjMzMzMzLDguMjU4NjY2NjcgNC4xMDAzMzMzMyw4LjQzODY2NjY3IDQuMTAwMzMzMzMsOC42OTY2NjY2NyBDNC4xMDAzMzMzMyw4Ljk1NDY2NjY3IDQuMDI4MzMzMzMsOS4xNDA2NjY2NyAzLjg4NDMzMzMzLDkuMjU0NjY2NjcgQzMuNzQwMzMzMzMsOS4zNjI2NjY2NyAzLjUxMjMzMzMzLDkuNDIyNjY2NjcgMy4yMDAzMzMzMyw5LjQyMjY2NjY3IEwyLjE4MDMzMzMzLDkuNDIyNjY2NjcgTDIuMTgwMzMzMzMsNy45ODI2NjY2NyBMMi4xODAzMzMzMyw3Ljk4MjY2NjY3IFogTTUuNDA4MzMzMzMsNy4zODI2NjY2NyBMNS40MDgzMzMzMywxMS42NjY2NjY3IEw2LjExMDMzMzMzLDExLjY2NjY2NjcgTDYuMTEwMzMzMzMsMTAuMDIyNjY2NyBMNy4xNzIzMzMzMywxMC4wMjI2NjY3IEM4LjIxNjMzMzMzLDEwLjAyMjY2NjcgOC43MzgzMzMzMyw5LjU3ODY2NjY3IDguNzM4MzMzMzMsOC42OTY2NjY2NyBDOC43MzgzMzMzMyw3LjgyMDY2NjY3IDguMjE2MzMzMzMsNy4zODI2NjY2NyA3LjE4NDMzMzMzLDcuMzgyNjY2NjcgTDUuNDA4MzMzMzMsNy4zODI2NjY2NyBaIE02LjExMDMzMzMzLDcuOTgyNjY2NjcgTDcuMTMwMzMzMzMsNy45ODI2NjY2NyBDNy40MzYzMzMzMyw3Ljk4MjY2NjY3IDcuNjY0MzMzMzMsOC4wMzY2NjY2NyA3LjgwODMzMzMzLDguMTUwNjY2NjcgQzcuOTUyMzMzMzMsOC4yNTg2NjY2NyA4LjAzMDMzMzMzLDguNDM4NjY2NjcgOC4wMzAzMzMzMyw4LjY5NjY2NjY3IEM4LjAzMDMzMzMzLDguOTU0NjY2NjcgNy45NTgzMzMzMyw5LjE0MDY2NjY3IDcuODE0MzMzMzMsOS4yNTQ2NjY2NyBDNy42NzAzMzMzMyw5LjM2MjY2NjY3IDcuNDQyMzMzMzMsOS40MjI2NjY2NyA3LjEzMDMzMzMzLDkuNDIyNjY2NjcgTDYuMTEwMzMzMzMsOS40MjI2NjY2NyBMNi4xMTAzMzMzMyw3Ljk4MjY2NjY3IEw2LjExMDMzMzMzLDcuOTgyNjY2NjcgWiBNOS4wMDgzMzMzMyw3LjM4MjY2NjY3IEw5LjAwODMzMzMzLDcuOTgyNjY2NjcgTDEwLjQxMjMzMzMsNy45ODI2NjY2NyBMMTAuNDEyMzMzMywxMS42NjY2NjY3IEwxMS4xMTQzMzMzLDExLjY2NjY2NjcgTDExLjExNDMzMzMsNy45ODI2NjY2NyBMMTIuNTE4MzMzMyw3Ljk4MjY2NjY3IEwxMi41MTgzMzMzLDcuMzgyNjY2NjcgTDkuMDA4MzMzMzMsNy4zODI2NjY2NyBaIiBpZD0i5b2i54q2Ij48L3BhdGg+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==", Wj = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+WExT5Zu+5qCHPC90aXRsZT4KICAgIDxnIGlkPSLkvpvlupTllYbnrqHnkIYiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSLkvpvlupTllYbnrqHnkIYt5L6b5bqU5ZWG5YiX6KGo6K+m5oOFLTIw5p2h6ZmE5Lu2IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMzgzLjAwMDAwMCwgLTc3MS4wMDAwMDApIiBmaWxsPSIjNzdENDI1IiBmaWxsLXJ1bGU9Im5vbnplcm8iPgogICAgICAgICAgICA8ZyBpZD0i57yW57uELTIx5aSH5Lu9LTIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDM3NS4wMDAwMDAsIDc2NS4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxnIGlkPSJYTFPlm77moIciIHRyYW5zZm9ybT0idHJhbnNsYXRlKDguMDAwMDAwLCA2LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xMS42MTUsMCBMMTYsNC40MTMzMzMzMyBMMTYsMTQuNjY2NjY2NyBDMTYsMTUuNDAzMDQ2MyAxNS40MDMwNDYzLDE2IDE0LjY2NjY2NjcsMTYgTDMuMzMzMzMzMzMsMTYgQzIuNTk2OTUzNjYsMTYgMiwxNS40MDMwNDYzIDIsMTQuNjY2NjY2NyBMMiwxMyBMMC42NjY2NjY2NzIsMTMgQzAuMjk4NDc2ODM2LDEzIDAsMTIuNzAxNTIzMiAwLDEyLjMzMzMzMzMgTDAsNi42NjY2NjY2NyBDMCw2LjQ4OTg1NTY4IDAuMDcwMjM3ODk0MSw2LjMyMDI4NjQgMC4xOTUyNjIxNDcsNi4xOTUyNjIxNSBDMC4zMjAyODY0MDEsNi4wNzAyMzc4OSAwLjQ4OTg1NTY3Nyw2IDAuNjY2NjY2NjcyLDYgTDIsNiBMMiwxLjMzMzMzMzMzIEMyLDAuNTk2OTUzNjY1IDIuNTk2OTUzNjYsMCAzLjMzMzMzMzMzLDAgTDExLjYxNSwwIFogTTExLjE5ODY2NjcsMSBMMy4zMzMzMzMzMywxIEMzLjI0NDkyNzgzLDEgMy4xNjAxNDMyLDEuMDM1MTE4OTUgMy4wOTc2MzEwNywxLjA5NzYzMTA3IEMzLjAzNTExODk1LDEuMTYwMTQzMiAzLDEuMjQ0OTI3ODMgMywxLjMzMzMzMzMzIEwzLDYgTDEzLDYgQzEzLjE3NjgxMSw2IDEzLjM0NjM4MDMsNi4wNzAyMzc4OSAxMy40NzE0MDQ1LDYuMTk1MjYyMTUgQzEzLjU5NjQyODgsNi4zMjAyODY0IDEzLjY2NjY2NjcsNi40ODk4NTU2OCAxMy42NjY2NjY3LDYuNjY2NjY2NjcgTDEzLjY2NjY2NjcsMTIuMzMzMzMzMyBDMTMuNjY2NjY2NywxMi43MDE1MjMyIDEzLjM2ODE4OTgsMTMgMTMsMTMgTDMsMTMgTDMsMTQuNjY2NjY2NyBDMywxNC43NTUwNzIyIDMuMDM1MTE4OTUsMTQuODM5ODU2OCAzLjA5NzYzMTA3LDE0LjkwMjM2ODkgQzMuMTYwMTQzMiwxNC45NjQ4ODExIDMuMjQ0OTI3ODMsMTUgMy4zMzMzMzMzMywxNSBMMTQuNjY2NjY2NywxNSBDMTQuODUwNzYxNiwxNSAxNSwxNC44NTA3NjE2IDE1LDE0LjY2NjY2NjcgTDE1LDQuODI1MzMzMzMgTDE0Ljg0MjMzMzMsNC42NjY2NjY2NyBMMTIuODY1MzMzMyw0LjY2NjY2NjY3IEMxMi4wMTkyMzMxLDQuNjY2NjY2NjcgMTEuMzMzMzMzMywzLjk4MDc2NjkxIDExLjMzMzMzMzMsMy4xMzQ2NjY2NyBMMTEuMzMzMzMzMywxLjEzNTY2NjY3IEwxMS4xOTg2NjY3LDEgWiBNMTAuMzYxNjY2Nyw3LjI5ODY2NjY3IEM5Ljg5OTY2NjY3LDcuMjk4NjY2NjcgOS41MjE2NjY2Nyw3LjQwMDY2NjY3IDkuMjIxNjY2NjcsNy42MTA2NjY2NyBDOC44OTc2NjY2Nyw3LjgyNjY2NjY3IDguNzQxNjY2NjcsOC4xMjY2NjY2NyA4Ljc0MTY2NjY3LDguNTA0NjY2NjcgQzguNzQxNjY2NjcsOC44ODI2NjY2NyA4LjkwMzY2NjY3LDkuMTcwNjY2NjcgOS4yMzM2NjY2Nyw5LjM2ODY2NjY3IEM5LjM1OTY2NjY3LDkuNDQwNjY2NjcgOS42ODk2NjY2Nyw5LjU2MDY2NjY3IDEwLjIxNzY2NjcsOS43Mjg2NjY2NyBDMTAuNjkxNjY2Nyw5Ljg3MjY2NjY3IDEwLjk2NzY2NjcsOS45Njg2NjY2NyAxMS4wNTE2NjY3LDEwLjAxMDY2NjcgQzExLjMxNTY2NjcsMTAuMTQyNjY2NyAxMS40NTM2NjY3LDEwLjMyMjY2NjcgMTEuNDUzNjY2NywxMC41NTA2NjY3IEMxMS40NTM2NjY3LDEwLjczMDY2NjcgMTEuMzU3NjY2NywxMC44Njg2NjY3IDExLjE3NzY2NjcsMTAuOTc2NjY2NyBDMTAuOTk3NjY2NywxMS4wNzg2NjY3IDEwLjc0NTY2NjcsMTEuMTMyNjY2NyAxMC40MzM2NjY3LDExLjEzMjY2NjcgQzEwLjA3OTY2NjcsMTEuMTMyNjY2NyA5LjgyMTY2NjY3LDExLjA2NjY2NjcgOS42NTM2NjY2NywxMC45NDY2NjY3IEM5LjQ2NzY2NjY3LDEwLjgwODY2NjcgOS4zNTM2NjY2NywxMC41NzQ2NjY3IDkuMzA1NjY2NjcsMTAuMjUwNjY2NyBMOC42MDk2NjY2NywxMC4yNTA2NjY3IEM4LjYzOTY2NjY3LDEwLjc5NjY2NjcgOC44Mzc2NjY2NywxMS4xOTI2NjY3IDkuMTk3NjY2NjcsMTEuNDQ0NjY2NyBDOS40OTE2NjY2NywxMS42NDg2NjY3IDkuOTA1NjY2NjcsMTEuNzUwNjY2NyAxMC40MzM2NjY3LDExLjc1MDY2NjcgQzEwLjk3OTY2NjcsMTEuNzUwNjY2NyAxMS40MDU2NjY3LDExLjYzNjY2NjcgMTEuNzA1NjY2NywxMS40MjA2NjY3IEMxMi4wMDU2NjY3LDExLjE5ODY2NjcgMTIuMTU1NjY2NywxMC44OTI2NjY3IDEyLjE1NTY2NjcsMTAuNTA4NjY2NyBDMTIuMTU1NjY2NywxMC4xMTI2NjY3IDExLjk2OTY2NjcsOS44MDY2NjY2NyAxMS41OTc2NjY3LDkuNTg0NjY2NjcgQzExLjQyOTY2NjcsOS40ODg2NjY2NyAxMS4wNTc2NjY3LDkuMzQ0NjY2NjcgMTAuNDc1NjY2Nyw5LjE2NDY2NjY3IEMxMC4wNzk2NjY3LDkuMDM4NjY2NjcgOS44MzM2NjY2Nyw4Ljk0ODY2NjY3IDkuNzQzNjY2NjcsOC45MDA2NjY2NyBDOS41Mzk2NjY2Nyw4Ljc5MjY2NjY3IDkuNDQzNjY2NjcsOC42NDI2NjY2NyA5LjQ0MzY2NjY3LDguNDYyNjY2NjcgQzkuNDQzNjY2NjcsOC4yNTg2NjY2NyA5LjUyNzY2NjY3LDguMTA4NjY2NjcgOS43MDc2NjY2Nyw4LjAxODY2NjY3IEM5Ljg1MTY2NjY3LDcuOTQwNjY2NjcgMTAuMDU1NjY2Nyw3LjkwNDY2NjY3IDEwLjMyNTY2NjcsNy45MDQ2NjY2NyBDMTAuNjM3NjY2Nyw3LjkwNDY2NjY3IDEwLjg3NzY2NjcsNy45NTg2NjY2NyAxMS4wMzM2NjY3LDguMDc4NjY2NjcgQzExLjE4OTY2NjcsOC4xOTI2NjY2NyAxMS4zMDM2NjY3LDguMzg0NjY2NjcgMTEuMzYzNjY2Nyw4LjY0ODY2NjY3IEwxMi4wNTk2NjY3LDguNjQ4NjY2NjcgQzEyLjAxNzY2NjcsOC4xODA2NjY2NyAxMS44NDM2NjY3LDcuODMyNjY2NjcgMTEuNTQzNjY2Nyw3LjYxMDY2NjY3IEMxMS4yNjE2NjY3LDcuNDAwNjY2NjcgMTAuODY1NjY2Nyw3LjI5ODY2NjY3IDEwLjM2MTY2NjcsNy4yOTg2NjY2NyBMMTAuMzYxNjY2Nyw3LjI5ODY2NjY3IFogTTIuNDI5NjY2NjcsNy4zODI2NjY2NyBMMS41NzE2NjY2Nyw3LjM4MjY2NjY3IEwzLjAwNTY2NjY3LDkuNDUyNjY2NjcgTDEuNDc1NjY2NjcsMTEuNjY2NjY2NyBMMi4zMzM2NjY2NywxMS42NjY2NjY3IEwzLjQzNzY2NjY3LDEwLjAxMDY2NjcgTDQuNTQxNjY2NjcsMTEuNjY2NjY2NyBMNS4zOTk2NjY2NywxMS42NjY2NjY3IEwzLjg1NzY2NjY3LDkuNDUyNjY2NjcgTDUuMzAzNjY2NjcsNy4zODI2NjY2NyBMNC40NDU2NjY2Nyw3LjM4MjY2NjY3IEwzLjQzNzY2NjY3LDguODk0NjY2NjcgTDIuNDI5NjY2NjcsNy4zODI2NjY2NyBMMi40Mjk2NjY2Nyw3LjM4MjY2NjY3IFogTTYuNDUxNjY2NjcsNy4zODI2NjY2NyBMNS43NTU2NjY2Nyw3LjM4MjY2NjY3IEw1Ljc1NTY2NjY3LDExLjY2NjY2NjcgTDguNDM0MzMzMzMsMTEuNjY2NjY2NyBMOC40MzQzMzMzMywxMS4wNjY2NjY3IEw2LjQ1MTY2NjY3LDExLjA2NjY2NjcgTDYuNDUxNjY2NjcsNy4zODI2NjY2NyBaIiBpZD0i5b2i54q2Ij48L3BhdGg+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==", bu = [".png", ".jpg", ".gif", ".jpeg"], Gj = {
  ".doc": di,
  ".docx": di,
  ".jpg": Ni,
  ".jpeg": Ni,
  ".png": Rj,
  ".pdf": Fj,
  ".ppt": Cu,
  ".pptx": Cu,
  ".xls": Cu,
  ".xlsx": Wj
};
function Zj() {
  return !!navigator.userAgent.match(/('phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone')/i);
}
function Hj(f) {
  return Array.isArray(f) ? f : f == null || f === "" ? [] : f.split(",");
}
const Kj = (f = "", s, r = !1) => f ? (r ? qj(f) : f.length) > s ? f.substring(0, s - 2) + "..." + f.substring(s - 2, s) : f : "", qj = (f) => {
  if (!f)
    return 0;
  let s = 0;
  const r = f.length;
  let o = -1;
  for (let D = 0; D < r; D++)
    o = f.charCodeAt(D), o >= 0 && o <= 128 ? s += 1 : s += 2;
  return s;
}, $j = { class: "file-icons-panel" }, Jj = ["onClick"], Xj = {
  key: 0,
  class: "file-name"
}, ez = fe({
  name: "FileIcons"
}), tz = /* @__PURE__ */ fe({
  ...ez,
  props: {
    files: {},
    size: {},
    isCard: { type: Boolean },
    showImg: { type: Boolean },
    preview: { type: Boolean },
    showName: { type: Boolean }
  },
  setup(f) {
    const s = f, r = h(!1), o = h(0), D = Ie(
      () => s.files.map((d) => {
        if (bu.indexOf(d.suffix || "") >= 0)
          return d.shareUrl;
      }).filter((d) => d)
    ), j = Ie(() => ({
      width: (s.size || 16) + "px",
      height: (s.size || 16) + "px"
    }));
    function m(d) {
      let M = Gj[d.suffix || ""] || Vj;
      return s.showImg && bu.indexOf(d.suffix || "") >= 0 ? d.shareUrl : M;
    }
    function N(d) {
      s.preview && (bu.indexOf(d.suffix || "") >= 0 ? (o.value = D.value.indexOf(d.shareUrl || d.furl), r.value = !0) : window.open(d.previewUrl || d.shareUrl || d.furl, "_blank"));
    }
    return (d, M) => {
      const z = F("el-image"), I = F("el-image-viewer");
      return _(), P("div", $j, [
        d.files && d.files.length ? (_(), P("div", {
          key: 0,
          class: bn([d.isCard ? "card-list" : "file-list"])
        }, [
          (_(!0), P(me, null, ve(d.files, (O, C) => (_(), P("div", {
            key: C,
            class: "file-item",
            onClick: (L) => N(O)
          }, [
            se(z, {
              src: m(O),
              style: Dt(j.value),
              fit: "cover"
            }, null, 8, ["src", "style"]),
            d.showName ? (_(), P("div", Xj, xe(yt(Kj)(O.name, 50) + O.suffix), 1)) : ae("", !0)
          ], 8, Jj))), 128))
        ], 2)) : ae("", !0),
        r.value ? (_(), R(I, {
          key: 1,
          onClose: M[0] || (M[0] = (O) => r.value = !1),
          teleported: "",
          initialIndex: o.value,
          "url-list": D.value
        }, null, 8, ["initialIndex", "url-list"])) : ae("", !0)
      ]);
    };
  }
});
const nz = /* @__PURE__ */ Ke(tz, [["__scopeId", "data-v-26d8ab17"]]), lz = {
  key: 1,
  class: "no-img-tip"
}, rz = {
  name: "ElPlusFormFile",
  inheritAttrs: !1,
  typeName: "file",
  customOptions: {}
}, Bi = /* @__PURE__ */ fe({
  ...rz,
  props: {
    modelValue: {},
    field: {},
    loading: { type: Boolean },
    desc: {},
    formData: {}
  },
  setup(f) {
    const s = f;
    return (r, o) => (_(), P("div", {
      class: "ele-form-file",
      style: Dt({ marginTop: s.modelValue && s.modelValue.length > 0 ? "10px" : "0" })
    }, [
      s.modelValue && s.modelValue.length > 0 ? (_(), R(nz, {
        key: 0,
        files: s.modelValue,
        showName: "",
        preview: ""
      }, null, 8, ["files"])) : (_(), P("span", lz, "暂无内容"))
    ], 4));
  }
});
const uz = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: Bi }, Symbol.toStringTag, { value: "Module" })), oz = { class: "ele-form-image" }, sz = { key: 1 }, iz = /* @__PURE__ */ Ye("span", { class: "no-img-tip" }, "—", -1), az = [
  iz
], cz = {
  name: "ElPlusFormImage",
  inheritAttrs: !1,
  typeName: "image",
  customOptions: {}
}, ki = /* @__PURE__ */ fe({
  ...cz,
  props: {
    modelValue: {},
    field: {},
    loading: { type: Boolean },
    desc: {},
    formData: {}
  },
  setup(f) {
    const s = f, r = Ge("format"), o = h({}), D = h(ke(s));
    Oe(async () => {
      o.value = await Se(s, { isShowPreview: !0, previewTeleported: !0, ...we() });
    });
    const j = Ie(() => s.modelValue ? Array.isArray(s.modelValue) ? typeof s.modelValue[0] == "string" ? s.modelValue : s.modelValue.map((N) => N.shareUrl || N.furl) : typeof s.modelValue == "string" ? s.modelValue.split(",").map((N) => r.imgUrl(N)) : [] : []), m = Ie(() => {
      let N = "", d = "", M = s.desc.size || "default";
      switch (M) {
        case "large":
          N = "44px", d = "44px";
          break;
        case "default":
          N = "36px", d = "36px";
          break;
        case "small":
          N = "28px", d = "28px";
          break;
        default:
          N = parseInt(M) + "px", d = parseInt(M) + "px";
          break;
      }
      return Object.assign({}, s.desc.style, { width: N, height: d, "max-width": N });
    });
    return (N, d) => {
      const M = F("el-image");
      return _(), P("div", oz, [
        j.value && j.value.length > 0 ? (_(!0), P(me, { key: 0 }, ve(j.value, (z, I) => (_(), R(M, le({
          class: N.desc.class,
          key: z,
          "preview-src-list": o.value.isShowPreview === !1 ? null : j.value,
          "initial-index": I,
          src: yt(r).imgUrl(z)
        }, o.value, { style: m.value }, Te(D.value), {
          fit: o.value.fit || "cover"
        }), null, 16, ["class", "preview-src-list", "initial-index", "src", "style", "fit"]))), 128)) : (_(), P("div", sz, az))
      ]);
    };
  }
});
const Mz = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: ki }, Symbol.toStringTag, { value: "Module" })), fz = {
  name: "ElPlusFormInput",
  inheritAttrs: !1,
  typeName: "input",
  customOptions: {}
}, Ui = /* @__PURE__ */ fe({
  ...fz,
  props: {
    modelValue: {},
    field: {},
    desc: {},
    formData: {}
  },
  emits: ["update:modelValue", "validateThis"],
  setup(f, { emit: s }) {
    const r = f, o = Ge("defaultConf"), D = h(Object.assign({}, mn(), r.desc.slots)), j = h({}), m = h(ke(r)), N = h();
    return s("update:modelValue", N), Oe(async () => {
      var d;
      j.value = await Se(r, { autocomplete: "new-password", maxlength: (d = o.form) == null ? void 0 : d.leng.input, clearable: !0, ...we() });
    }), He(
      () => r.modelValue,
      (d) => {
        d && d.length > j.value.maxlength && (d = d.substring(0, j.value.maxlength)), N.value = d;
      },
      { immediate: !0 }
    ), He(
      () => N.value,
      () => {
        s("validateThis");
      }
    ), (d, M) => {
      const z = F("el-input");
      return _(), R(z, le({ style: { display: "flex" } }, j.value, Te(m.value), {
        modelValue: N.value,
        "onUpdate:modelValue": M[0] || (M[0] = (I) => N.value = I)
      }), an({ _: 2 }, [
        ve(D.value, (I, O, C) => ({
          name: O,
          fn: Q(() => [
            Xe(d.$slots, O)
          ])
        }))
      ]), 1040, ["modelValue"]);
    };
  }
}), gz = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: Ui }, Symbol.toStringTag, { value: "Module" })), dz = (f) => (hi("data-v-e9e128a8"), f = f(), Yi(), f), Nz = { class: "el-plus-form-link" }, pz = {
  style: { width: "100%" },
  class: "form-link-dialog"
}, jz = { class: "panel-left" }, zz = {
  key: 0,
  class: "panel-right"
}, yz = /* @__PURE__ */ dz(() => /* @__PURE__ */ Ye("div", { class: "right-title" }, "已选中项：", -1)), Dz = { class: "btn-panel" }, _z = {
  name: "ElPlusFormLink",
  inheritAttrs: !1,
  typeName: "link",
  customOptions: {}
}, mz = /* @__PURE__ */ fe({
  ..._z,
  props: {
    modelValue: {},
    field: {},
    loading: { type: Boolean },
    desc: {},
    formData: {}
  },
  emits: ["update:modelValue", "change", "input", "validateThis"],
  setup(f, { emit: s }) {
    const r = f, o = h(ke(r)), D = h(r.modelValue);
    s("update:modelValue", D);
    const j = h(), m = rt([]), N = rt([]), d = rt({
      multiple: !0,
      size: r.desc.size,
      collapseTags: !0,
      collapseTagsTooltip: !0,
      clearable: !0,
      placeholder: r.desc.placeholder || "请选择" + r.desc.label
    }), M = h(!1), z = h({}), I = Ie(() => r.desc.vkey || "id"), O = h(!1), C = h(), L = rt([]);
    function U(k) {
      k && (j.value.blur(), M.value = !0);
    }
    function B() {
      L.splice(0, L.length), A();
    }
    function q(k) {
      L.splice(0, L.length), k.map((V) => {
        L.push({ label: V[r.desc.lkey || "name"], value: V[I.value], dataItem: V });
      });
    }
    function oe({ row: k }) {
      L.splice(0, L.length), L.push({ label: k[r.desc.lkey || "name"], value: k[I.value], dataItem: k }), A();
    }
    function ee(k) {
      L.splice(
        L.findIndex((V) => V.value === k.value),
        1
      ), C.value.changeSelect([{ [I.value]: k.value }]);
    }
    function ce() {
      M.value = !1;
    }
    function A() {
      N.splice(0, N.length, ...L);
      const k = [], V = [];
      m.splice(0, m.length), L.map((ge) => {
        m.push(ge.value), k.push(ge.value), V.push(ge.label);
      }), D.value = L.length > 0 ? [k, V] : [], o.value.change && o.value.change(r.formData, null, D.value), M.value = !1, s("validateThis");
    }
    return He(
      () => r.desc.tableConfig,
      (k) => {
        let V = {};
        k && (V = _t.cloneDeep(k), typeof r.desc.multiple == "function" ? O.value = r.desc.multiple(r.formData) : O.value = r.desc.multiple, O.value || !O.value && V.column[V.column.length - 1].label !== "操作" && V.column.push({ label: "操作", width: "120px", fixed: "right", type: "btns", btns: [{ label: "选中", on: { click: oe } }] }), V.maxHeight = 400), z.value = V;
      },
      { deep: !0, immediate: !0 }
    ), cn(async () => {
    }), (k, V) => {
      const ge = F("el-option"), Ue = F("el-select"), qe = F("ElPlusTable"), mt = F("el-tag"), Lt = F("el-scrollbar"), en = F("el-button"), tn = F("el-dialog");
      return _(), P("div", Nz, [
        se(Ue, le({
          ref_key: "selectRef",
          ref: j,
          style: [{ width: "100%" }, k.desc.style],
          class: k.desc.class
        }, d, {
          teleported: !1,
          loading: k.loading,
          modelValue: m,
          onVisibleChange: U,
          onClear: B
        }, Te(o.value)), {
          default: Q(() => [
            (_(!0), P(me, null, ve(N, (at) => (_(), R(ge, le({
              key: at.value
            }, at), null, 16))), 128))
          ]),
          _: 1
        }, 16, ["class", "style", "loading", "modelValue"]),
        se(tn, {
          width: k.desc.dialogWidth || "1000px",
          title: k.desc.title || k.desc.placeholder || "请选择" + k.desc.label,
          draggable: "",
          closeOnClickModal: !1,
          showCancel: "",
          modelValue: M.value,
          "onUpdate:modelValue": V[0] || (V[0] = (at) => M.value = at),
          "append-to-body": "",
          "destroy-on-close": ""
        }, {
          default: Q(() => [
            Ye("div", pz, [
              Ye("div", jz, [
                z.value ? (_(), R(qe, {
                  key: 0,
                  ref_key: "multipleTableRef",
                  ref: C,
                  tableConfig: z.value,
                  type: O.value ? "selection" : "index",
                  isIndex: !1,
                  rowKey: I.value,
                  onSelection: q
                }, null, 8, ["tableConfig", "type", "rowKey"])) : ae("", !0)
              ]),
              O.value ? (_(), P("div", zz, [
                yz,
                se(Lt, {
                  height: "480px",
                  class: "tag-list"
                }, {
                  default: Q(() => [
                    (_(!0), P(me, null, ve(L, (at) => (_(), R(mt, {
                      class: "tag-item",
                      style: { "margin-right": "10px", "margin-bottom": "10px" },
                      key: at.value,
                      closable: "",
                      onClose: () => ee(at)
                    }, {
                      default: Q(() => [
                        be(xe(at.label), 1)
                      ]),
                      _: 2
                    }, 1032, ["onClose"]))), 128))
                  ]),
                  _: 1
                }),
                Ye("div", Dz, [
                  se(en, { onClick: ce }, {
                    default: Q(() => [
                      be("取消")
                    ]),
                    _: 1
                  }),
                  se(en, {
                    type: "primary",
                    onClick: A
                  }, {
                    default: Q(() => [
                      be("确定")
                    ]),
                    _: 1
                  })
                ])
              ])) : ae("", !0)
            ])
          ]),
          _: 1
        }, 8, ["width", "title", "modelValue"])
      ]);
    };
  }
});
const Qi = /* @__PURE__ */ Ke(mz, [["__scopeId", "data-v-e9e128a8"]]), hz = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: Qi }, Symbol.toStringTag, { value: "Module" }));
/*! Element Plus Icons Vue v2.1.0 */
var Al = (f, s) => {
  let r = f.__vccOpts || f;
  for (let [o, D] of s)
    r[o] = D;
  return r;
}, Yz = {
  name: "Loading"
}, Iz = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
}, vz = /* @__PURE__ */ Ye(
  "path",
  {
    fill: "currentColor",
    d: "M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32zm448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32zm-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32zM195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248zM828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0zm-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0z"
  },
  null,
  -1
  /* HOISTED */
), wz = [
  vz
];
function Az(f, s, r, o, D, j) {
  return _(), P("svg", Iz, wz);
}
var Tz = /* @__PURE__ */ Al(Yz, [["render", Az], ["__file", "loading.vue"]]), Lz = {
  name: "Plus"
}, xz = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
}, Ez = /* @__PURE__ */ Ye(
  "path",
  {
    fill: "currentColor",
    d: "M480 480V128a32 32 0 0 1 64 0v352h352a32 32 0 1 1 0 64H544v352a32 32 0 1 1-64 0V544H128a32 32 0 0 1 0-64h352z"
  },
  null,
  -1
  /* HOISTED */
), Cz = [
  Ez
];
function bz(f, s, r, o, D, j) {
  return _(), P("svg", xz, Cz);
}
var Oz = /* @__PURE__ */ Al(Lz, [["render", bz], ["__file", "plus.vue"]]), Sz = {
  name: "Share"
}, Bz = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
}, kz = /* @__PURE__ */ Ye(
  "path",
  {
    fill: "currentColor",
    d: "m679.872 348.8-301.76 188.608a127.808 127.808 0 0 1 5.12 52.16l279.936 104.96a128 128 0 1 1-22.464 59.904l-279.872-104.96a128 128 0 1 1-16.64-166.272l301.696-188.608a128 128 0 1 1 33.92 54.272z"
  },
  null,
  -1
  /* HOISTED */
), Uz = [
  kz
];
function Qz(f, s, r, o, D, j) {
  return _(), P("svg", Bz, Uz);
}
var pi = /* @__PURE__ */ Al(Sz, [["render", Qz], ["__file", "share.vue"]]), Pz = {
  name: "UserFilled"
}, Vz = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
}, Fz = /* @__PURE__ */ Ye(
  "path",
  {
    fill: "currentColor",
    d: "M288 320a224 224 0 1 0 448 0 224 224 0 1 0-448 0zm544 608H160a32 32 0 0 1-32-32v-96a160 160 0 0 1 160-160h448a160 160 0 0 1 160 160v96a32 32 0 0 1-32 32z"
  },
  null,
  -1
  /* HOISTED */
), Rz = [
  Fz
];
function Wz(f, s, r, o, D, j) {
  return _(), P("svg", Vz, Rz);
}
var ji = /* @__PURE__ */ Al(Pz, [["render", Wz], ["__file", "user-filled.vue"]]), Gz = {
  name: "WarningFilled"
}, Zz = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
}, Hz = /* @__PURE__ */ Ye(
  "path",
  {
    fill: "currentColor",
    d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 192a58.432 58.432 0 0 0-58.24 63.744l23.36 256.384a35.072 35.072 0 0 0 69.76 0l23.296-256.384A58.432 58.432 0 0 0 512 256zm0 512a51.2 51.2 0 1 0 0-102.4 51.2 51.2 0 0 0 0 102.4z"
  },
  null,
  -1
  /* HOISTED */
), Kz = [
  Hz
];
function qz(f, s, r, o, D, j) {
  return _(), P("svg", Zz, Kz);
}
var $z = /* @__PURE__ */ Al(Gz, [["render", qz], ["__file", "warning-filled.vue"]]);
const Jz = (f) => (hi("data-v-fecf58d4"), f = f(), Yi(), f), Xz = { class: "el-plus-form-link-user" }, e2 = {
  style: { width: "100%" },
  class: "form-link-user-dialog"
}, t2 = { class: "panel-left" }, n2 = { class: "dept-breadcrumb" }, l2 = { style: { display: "flex", "align-items": "center" } }, r2 = { class: "panel-right" }, u2 = /* @__PURE__ */ Jz(() => /* @__PURE__ */ Ye("div", { class: "right-title" }, "已选中项：", -1)), o2 = { class: "btn-panel" }, s2 = {
  name: "ElPlusFormLkuser",
  inheritAttrs: !1,
  typeName: "lkuser",
  customOptions: {}
}, i2 = /* @__PURE__ */ fe({
  ...s2,
  props: {
    modelValue: {},
    field: {},
    loading: { type: Boolean },
    desc: {},
    formData: {}
  },
  emits: ["update:modelValue", "change", "input", "validateThis"],
  setup(f, { emit: s }) {
    const r = f, o = Ge("globalData"), D = Ge("defaultConf"), j = h(A(r)), m = h(r.modelValue || []);
    s("update:modelValue", m);
    const N = h(), d = rt([]), M = rt([]), z = rt({
      multiple: !0,
      size: r.desc.size,
      collapseTags: !1,
      collapseTagsTooltip: !1,
      clearable: !0
    }), I = h(!1), O = rt([]), C = rt([]), L = h({});
    async function U(W) {
      C.splice(0, C.length, ...await Ue(W));
    }
    const B = h([]), q = h([]), oe = h([]), ee = h(), ce = Ie(() => {
      var Z;
      const W = [];
      let X = _t.cloneDeep(o[((Z = D.form) == null ? void 0 : Z.linkUser.deptListKey) || ""]);
      return B.value && B.value.length > 0 && B.value.map((pe) => {
        X = X[pe].children || [];
      }), X.map((pe) => W.push({ type: 2, label: pe.name, value: pe.id })), oe.value.map((pe) => W.push({ type: 1, label: pe.nickname, value: pe.userId })), Xt(() => {
        setTimeout(() => {
          W.map((pe) => {
            var Ee;
            (Ee = ee.value) == null || Ee.toggleRowSelection(
              pe,
              O.some((gt) => gt.value === pe.value)
            );
          });
        }, 10);
      }), W;
    });
    function A(W) {
      var Z;
      const X = {};
      return (Z = W.desc) != null && Z.on && Object.keys(W.desc.on).map((pe) => {
        X[pe] = (Ee) => {
          W.desc.on[pe](W.formData, W.rowIndex, Ee);
        };
      }), X;
    }
    function k(W) {
      W && (N.value.blur(), I.value = !0);
    }
    function V() {
      O.splice(0, O.length), ce.value.map((W) => {
        var X;
        (X = ee.value) == null || X.toggleRowSelection(
          W,
          O.some((Z) => Z.value === W.value)
        );
      }), $();
    }
    function ge(W) {
      v({ ...C.find((X) => X.value === W), type: 1 });
    }
    async function Ue(W) {
      var X, Z;
      return W.length > 0 ? (Z = (await ((X = D.form) == null ? void 0 : X.linkUser.getUserList({ nickname: W, current: 1, size: 10, enabled: 1 }))).records) == null ? void 0 : Z.map((pe) => ({ value: pe.userId, label: pe.nickname })) : [];
    }
    async function qe(W, X) {
      var Z;
      oe.value = (await ((Z = D.form) == null ? void 0 : Z.linkUser.getUserList({ deptId: W.value, size: 999 }))).records, B.value.push(X), q.value.push(W);
    }
    async function mt(W) {
      var X;
      oe.value = W >= 0 ? (await ((X = D.form) == null ? void 0 : X.linkUser.getUserList({ deptId: q.value[W].value, size: 999 }))).records : [], B.value.splice(W + 1), q.value.splice(W + 1);
    }
    function Lt(W) {
      return r.desc.onlyUser ? W.type === 1 : !0;
    }
    function en(W, X) {
      v(X, !W.some((Z) => Z.value === X.value));
    }
    function tn(W) {
      const X = !(W && W.length > 0);
      ce.value.map((Z) => {
        (!r.desc.onlyUser || r.desc.onlyUser && Z.type === 1) && v(Z, X);
      });
    }
    function at(W) {
      var X;
      ce.value.some((Z) => Z.value === W.value) && ((X = ee.value) == null || X.toggleRowSelection(W, !1)), v(W, !0);
    }
    function v(W, X = !1) {
      const Z = O.findIndex((pe) => pe.value === W.value);
      X ? Z >= 0 && O.splice(Z, 1) : Z < 0 && O.push(W);
    }
    function x() {
      I.value = !1;
    }
    function $() {
      M.splice(0, M.length, ...O);
      const W = [], X = [], Z = [], pe = [];
      d.splice(0, d.length), O.map((Ee) => {
        d.push(Ee.value), Ee.type === 1 ? (W.push(Ee.value), Z.push(Ee.label)) : (X.push(Ee.value), pe.push(Ee.label));
      }), I.value = !1, m.value = O.length > 0 ? [W, X, Z, pe] : [], j.value.change && j.value.change(r.formData, null, m.value), s("validateThis");
    }
    function de() {
      const W = [];
      if (r.modelValue) {
        let [X, Z, pe, Ee] = r.modelValue;
        Z && Ee && Z.length === Ee.length && Z.map((gt, dt) => {
          W.push({ type: 2, value: gt, label: Ee[dt] });
        }), X && pe && X.length === pe.length && X.map((gt, dt) => {
          W.push({ type: 1, value: gt, label: pe[dt] });
        });
      }
      return W;
    }
    function Be() {
      const W = [];
      if (r.modelValue) {
        let [X, Z] = r.modelValue;
        W.push(...Z || []), W.push(...X || []);
      }
      return W;
    }
    function Re() {
      O.splice(0, O.length, ...de()), M.splice(0, M.length, ...de()), d.splice(0, d.length, ...Be());
    }
    return Oe(async () => {
      L.value = await Se(r, {
        remote: !0,
        filterable: !0,
        remoteShowSuffix: !0,
        loadingText: "远程查询中...",
        remoteMethod: U,
        ...we()
      });
    }), He(
      () => r.modelValue,
      () => Re(),
      { deep: !0 }
    ), cn(async () => {
      Re();
    }), (W, X) => {
      const Z = F("el-option"), pe = F("el-select"), Ee = F("el-divider"), gt = F("el-breadcrumb-item"), dt = F("el-breadcrumb"), Gt = F("el-table-column"), Gn = F("el-icon"), Zt = F("el-button"), Mn = F("el-table"), On = F("el-tag"), Nt = F("el-scrollbar"), nn = F("el-dialog");
      return _(), P("div", Xz, [
        se(pe, le({
          ref_key: "selectRef",
          ref: N,
          style: [{ width: "100%" }, W.desc.style],
          class: W.desc.class
        }, z, {
          teleported: !1,
          loading: W.loading,
          modelValue: d,
          onVisibleChange: k,
          onClear: V
        }), {
          default: Q(() => [
            (_(!0), P(me, null, ve(M, (w) => (_(), R(Z, le({
              key: w.value
            }, w), null, 16))), 128))
          ]),
          _: 1
        }, 16, ["class", "style", "loading", "modelValue"]),
        se(nn, {
          width: W.desc.dialogWidth || "900px",
          title: W.desc.placeholder || "选择" + W.desc.label,
          draggable: "",
          closeOnClickModal: !1,
          showCancel: "",
          modelValue: I.value,
          "onUpdate:modelValue": X[1] || (X[1] = (w) => I.value = w),
          "append-to-body": "",
          "destroy-on-close": ""
        }, {
          default: Q(() => [
            Ye("div", e2, [
              Ye("div", t2, [
                se(pe, le({
                  style: { width: "300px" },
                  placeholder: "输入用户名进行搜索"
                }, L.value, { onChange: ge }), {
                  default: Q(() => [
                    (_(!0), P(me, null, ve(C, (w) => (_(), R(Z, le({
                      key: w.value
                    }, w), null, 16))), 128))
                  ]),
                  _: 1
                }, 16),
                se(Ee),
                Ye("div", n2, [
                  se(dt, { separator: "/" }, {
                    default: Q(() => [
                      se(gt, {
                        onClick: X[0] || (X[0] = (w) => mt(-1))
                      }, {
                        default: Q(() => [
                          be("组织架构")
                        ]),
                        _: 1
                      }),
                      (_(!0), P(me, null, ve(q.value, (w, H) => (_(), R(gt, {
                        key: H,
                        onClick: (te) => mt(H)
                      }, {
                        default: Q(() => [
                          be(xe(w.label), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"]))), 128))
                    ]),
                    _: 1
                  })
                ]),
                se(Mn, {
                  ref_key: "multipleTableRef",
                  ref: ee,
                  data: ce.value,
                  style: { width: "100%", height: "500px" },
                  "max-height": "500px",
                  onSelect: en,
                  onSelectAll: tn
                }, {
                  default: Q(() => [
                    se(Gt, {
                      type: "selection",
                      width: "55",
                      selectable: Lt
                    }),
                    se(Gt, {
                      label: "组织/部门/人员",
                      prop: "label"
                    }, {
                      default: Q(({ row: w }) => [
                        Ye("div", l2, [
                          se(Gn, { style: { "margin-right": "5px" } }, {
                            default: Q(() => [
                              w.type === 2 ? (_(), R(yt(pi), { key: 0 })) : (_(), R(yt(ji), { key: 1 }))
                            ]),
                            _: 2
                          }, 1024),
                          be(" " + xe(w.label), 1)
                        ])
                      ]),
                      _: 1
                    }),
                    se(Gt, {
                      label: "操作",
                      width: "80"
                    }, {
                      default: Q(({ row: w, $index: H }) => [
                        w.type === 2 ? (_(), R(Zt, {
                          key: 0,
                          disabled: O.some((te) => te.value === w.value),
                          type: "primary",
                          text: "",
                          plain: "",
                          onClick: (te) => qe(w, H)
                        }, {
                          default: Q(() => [
                            be("进入")
                          ]),
                          _: 2
                        }, 1032, ["disabled", "onClick"])) : ae("", !0)
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["data"])
              ]),
              Ye("div", r2, [
                u2,
                se(Nt, {
                  height: "480px",
                  class: "tag-list"
                }, {
                  default: Q(() => [
                    (_(!0), P(me, null, ve(O, (w) => (_(), R(On, {
                      style: { "margin-right": "10px", "margin-bottom": "10px" },
                      key: w.value,
                      closable: "",
                      onClose: () => at(w)
                    }, {
                      default: Q(() => [
                        se(Gn, { style: { "margin-right": "5px" } }, {
                          default: Q(() => [
                            w.type === 2 ? (_(), R(yt(pi), { key: 0 })) : (_(), R(yt(ji), { key: 1 }))
                          ]),
                          _: 2
                        }, 1024),
                        be(" " + xe(w.label), 1)
                      ]),
                      _: 2
                    }, 1032, ["onClose"]))), 128))
                  ]),
                  _: 1
                }),
                Ye("div", o2, [
                  se(Zt, { onClick: x }, {
                    default: Q(() => [
                      be("取消")
                    ]),
                    _: 1
                  }),
                  se(Zt, {
                    type: "primary",
                    onClick: $
                  }, {
                    default: Q(() => [
                      be("确定")
                    ]),
                    _: 1
                  })
                ])
              ])
            ])
          ]),
          _: 1
        }, 8, ["width", "title", "modelValue"])
      ]);
    };
  }
});
const Pi = /* @__PURE__ */ Ke(i2, [["__scopeId", "data-v-fecf58d4"]]), a2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: Pi }, Symbol.toStringTag, { value: "Module" })), c2 = {
  name: "ElPlusFormNbinput",
  inheritAttrs: !1,
  typeName: "nbinput",
  customOptions: {}
}, Vi = /* @__PURE__ */ fe({
  ...c2,
  props: {
    modelValue: {},
    field: {},
    loading: { type: Boolean },
    desc: {},
    formData: {},
    rowIndex: {}
  },
  emits: ["update:modelValue"],
  setup(f, { emit: s }) {
    const r = f, o = h(r.modelValue);
    s("update:modelValue", o);
    const D = h(Object.assign({}, mn(), r.desc.slots)), j = h({}), m = h(ke(r));
    return Oe(async () => {
      j.value = await Se(r, { ...we() });
    }), (N, d) => {
      const M = F("el-input");
      return _(), R(M, le({
        class: N.desc.class,
        style: N.desc.style,
        clearable: j.value.clearable ?? !0,
        type: "number"
      }, j.value, Te(m.value), {
        modelValue: o.value,
        "onUpdate:modelValue": d[0] || (d[0] = (z) => o.value = z)
      }), an({ _: 2 }, [
        ve(D.value, (z, I, O) => ({
          name: I,
          fn: Q(() => [
            Xe(N.$slots, I)
          ])
        })),
        N.desc.rtext ? {
          name: "append",
          fn: Q(() => [
            be(xe(N.desc.rtext.text), 1)
          ]),
          key: "0"
        } : void 0
      ]), 1040, ["class", "style", "clearable", "modelValue"]);
    };
  }
});
const M2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: Vi }, Symbol.toStringTag, { value: "Module" })), f2 = {
  name: "ElPlusFormNumber",
  inheritAttrs: !1,
  typeName: "number",
  customOptions: {}
}, g2 = /* @__PURE__ */ fe({
  ...f2,
  props: {
    modelValue: {},
    field: {},
    loading: { type: Boolean },
    desc: {},
    formData: {},
    rowIndex: {}
  },
  emits: ["update:modelValue", "validateThis"],
  setup(f, { emit: s }) {
    const r = f, o = Ge("defaultConf"), D = h(r.modelValue);
    s("update:modelValue", D);
    const j = h({}), m = h(ke(r)), N = h(!1);
    Oe(async () => {
      var C;
      j.value = await Se(r, { ...(C = o.form) == null ? void 0 : C.leng.nbinput, ...we() }), delete j.value.min, delete j.value.max;
    });
    function d() {
      N.value = !1;
    }
    function M() {
      N.value || (D.value ? O(D.value, 0) : Xt(() => {
        var C, L;
        D.value = (C = r.desc) != null && C.required ? z.value.min : 0, (L = r.desc) != null && L.required || Xt(() => {
          D.value = null;
        });
      })), Xt(() => {
        s("validateThis");
      });
    }
    const z = Ie(() => {
      var L;
      let C = r.desc.attrs || ((L = o.form) == null ? void 0 : L.leng.nbinput);
      return typeof r.desc.attrs == "function" && (C = r.desc.attrs(r.formData)), C.min > C.max ? C.min = C.max : C.max < C.min && (C.max = C.min), C;
    });
    D.value !== void 0 && D.value !== null && (D.value < z.value.min ? D.value = z.value.min : D.value > z.value.max && (D.value = z.value.max));
    const I = m.value.change;
    I ? m.value.change = (C, L) => {
      O(C, L);
    } : m.value.change = O;
    function O(C, L) {
      var U, B;
      N.value = !0, C !== L && (C < z.value.min ? (Wn.warning(`${((U = r.desc) == null ? void 0 : U.label) || ""}最少不能低于${z.value.min}`), Xt(() => {
        D.value = z.value.min;
      })) : C > z.value.max ? (Wn.warning(`${((B = r.desc) == null ? void 0 : B.label) || ""}最多不能大于${z.value.max}`), Xt(() => {
        D.value = z.value.max, I && I();
      })) : I && I());
    }
    return (C, L) => {
      const U = F("el-input-number");
      return _(), R(U, le({ class: "ElPlusFormNumber-panel" }, j.value, Te(m.value), {
        modelValue: D.value,
        "onUpdate:modelValue": L[0] || (L[0] = (B) => D.value = B),
        onFocus: d,
        onBlur: M,
        onkeypress: "return( /[\\d\\.]/.test(String.fromCharCode(event.keyCode)))"
      }), null, 16, ["modelValue"]);
    };
  }
});
const Fi = /* @__PURE__ */ Ke(g2, [["__scopeId", "data-v-798814cd"]]), d2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: Fi }, Symbol.toStringTag, { value: "Module" })), N2 = {
  name: "ElPlusFormPassword",
  inheritAttrs: !1,
  typeName: "password",
  customOptions: {}
}, Ri = /* @__PURE__ */ fe({
  ...N2,
  props: {
    modelValue: {},
    field: {},
    loading: { type: Boolean },
    desc: {},
    formData: {}
  },
  emits: ["update:modelValue"],
  setup(f, { emit: s }) {
    const r = f, o = Ge("defaultConf"), D = h(r.modelValue);
    s("update:modelValue", D);
    const j = h(Object.assign({}, mn(), r.desc.slots)), m = h({}), N = h(ke(r));
    return Oe(async () => {
      var d;
      m.value = await Se(r, { autocomplete: "new-password", maxlength: (d = o.form) == null ? void 0 : d.leng.input, ...we() });
    }), (d, M) => {
      const z = F("el-input");
      return _(), R(z, le({
        class: d.desc.class,
        "show-password": !0
      }, m.value, Te(N.value), {
        modelValue: D.value,
        "onUpdate:modelValue": M[0] || (M[0] = (I) => D.value = I)
      }), an({ _: 2 }, [
        ve(j.value, (I, O, C) => ({
          name: O,
          fn: Q((L) => [
            Xe(d.$slots, O, { data: L })
          ])
        }))
      ]), 1040, ["class", "modelValue"]);
    };
  }
}), p2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: Ri }, Symbol.toStringTag, { value: "Module" })), j2 = { class: "el-plus-form-quick-input" }, z2 = {
  name: "ElPlusFormQuickinput",
  inheritAttrs: !1,
  typeName: "quickinput",
  customOptions: {}
}, Wi = /* @__PURE__ */ fe({
  ...z2,
  props: {
    modelValue: {},
    field: {},
    loading: { type: Boolean },
    desc: {},
    formData: {}
  },
  emits: ["update:modelValue", "validateThis"],
  setup(f, { emit: s }) {
    const r = f, o = Ge("globalData"), D = Ge("defaultConf"), j = h({}), m = h(ke(r)), N = rt([]), d = h(r.modelValue);
    s("update:modelValue", d), Oe(async () => {
      var z;
      j.value = await Se(r, { maxlength: (z = D.form) == null ? void 0 : z.leng.textare, showWordLimit: !0, rows: 3, ...we() });
    });
    function M(z) {
      d.value = z, s("validateThis");
    }
    return He(
      () => r.modelValue,
      (z) => {
        z && z.length > j.value.maxlength && (z = z.substring(0, j.value.maxlength)), d.value = z;
      },
      { immediate: !0 }
    ), He(
      () => r.desc.options,
      async (z) => {
        typeof z == "string" ? N.splice(0, N.length, ...o[z] || []) : typeof z == "function" ? N.splice(0, N.length, ...await z(r.formData)) : Array.isArray(z) ? z && N && !_t.isEqual(z, N) && N.splice(0, N.length, ...z) : N.splice(0, N.length);
      },
      { immediate: !0 }
    ), (z, I) => {
      const O = F("el-input"), C = F("el-tag");
      return _(), P(me, null, [
        se(O, le({
          class: z.desc.class,
          style: z.desc.style,
          type: "textarea"
        }, j.value, {
          modelValue: d.value,
          "onUpdate:modelValue": I[0] || (I[0] = (L) => d.value = L)
        }, Te(m.value)), null, 16, ["class", "style", "modelValue"]),
        Ye("div", j2, [
          (_(!0), P(me, null, ve(N, (L, U) => (_(), R(C, {
            key: U,
            type: "info",
            onClick: (B) => M(L.label)
          }, {
            default: Q(() => [
              be(xe(L.label), 1)
            ]),
            _: 2
          }, 1032, ["onClick"]))), 128))
        ])
      ], 64);
    };
  }
});
const y2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: Wi }, Symbol.toStringTag, { value: "Module" })), D2 = {
  name: "ElPlusFormRadio",
  inheritAttrs: !1,
  typeName: "radio",
  customOptions: {}
}, _2 = /* @__PURE__ */ fe({
  ...D2,
  props: {
    modelValue: {},
    field: {},
    desc: {},
    formData: {}
  },
  emits: ["update:modelValue"],
  setup(f, { emit: s }) {
    const r = f, o = h(r.modelValue);
    s("update:modelValue", o);
    const D = h({}), j = h(ke(r));
    return Oe(async () => {
      D.value = await Se(r, { ...we() });
    }), (m, N) => {
      const d = F("el-radio"), M = F("el-radio-group");
      return _(), R(M, le({ class: "ElPlusFormRadio-panel" }, D.value, Te(j.value), {
        modelValue: o.value,
        "onUpdate:modelValue": N[0] || (N[0] = (z) => o.value = z)
      }), {
        default: Q(() => [
          (_(!0), P(me, null, ve(D.value.options, (z) => (_(), R(d, {
            key: z.value,
            label: z.value
          }, {
            default: Q(() => [
              be(xe(z.l || z.label), 1)
            ]),
            _: 2
          }, 1032, ["label"]))), 128))
        ]),
        _: 1
      }, 16, ["modelValue"]);
    };
  }
});
const Gi = /* @__PURE__ */ Ke(_2, [["__scopeId", "data-v-2d59dd3c"]]), m2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: Gi }, Symbol.toStringTag, { value: "Module" })), h2 = {
  name: "ElPlusFormRate",
  inheritAttrs: !1,
  typeName: "rate",
  customOptions: {}
}, Y2 = /* @__PURE__ */ fe({
  ...h2,
  props: {
    modelValue: {},
    field: {},
    desc: {},
    formData: {}
  },
  emits: ["update:modelValue"],
  setup(f, { emit: s }) {
    const r = f, o = h(r.modelValue);
    s("update:modelValue", o);
    const D = h({}), j = h(ke(r));
    return Oe(async () => {
      D.value = await Se(r, { ...we() });
    }), (m, N) => {
      const d = F("el-rate");
      return _(), R(d, le({ class: "ElPlusFormRate-panel" }, D.value, Te(j.value), {
        modelValue: o.value,
        "onUpdate:modelValue": N[0] || (N[0] = (M) => o.value = M)
      }), null, 16, ["modelValue"]);
    };
  }
});
const Zi = /* @__PURE__ */ Ke(Y2, [["__scopeId", "data-v-c585734a"]]), I2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: Zi }, Symbol.toStringTag, { value: "Module" })), v2 = { class: "el-plus-form-select-options" }, w2 = { key: 0 }, A2 = {
  name: "ElPlusFormSelect",
  inheritAttrs: !1,
  typeName: "select",
  customOptions: {}
}, Hi = /* @__PURE__ */ fe({
  ...A2,
  props: {
    modelValue: {},
    field: {},
    loading: { type: Boolean },
    desc: {},
    formData: {},
    rowIndex: {}
  },
  emits: ["update:modelValue"],
  setup(f, { emit: s }) {
    const r = f, o = Ge("defaultConf"), D = Ge("globalData"), j = h(r.modelValue || (r.desc.multiple ? [] : ""));
    s("update:modelValue", j);
    const m = h({}), N = rt([]), d = h(null), M = { clearable: !0, ...we() }, z = h(!1);
    r.desc.allowCreate && (M.filterable = !0), r.desc.remote && (M.remote = !0, M.filterable = !0, M.remoteShowSuffix = !0, M.loadingText = "远程查询中...", M.remoteMethod = async (C) => {
      if (C != null && d.value !== C && (d.value = C, N.splice(0, N.length, ...await r.desc.remote(C)), C === "" && r.desc.defaultItem)) {
        const L = N.findIndex((U) => U.value === r.desc.defaultItem.value);
        L >= 0 && N.splice(L, 1), N.unshift(r.desc.defaultItem);
      }
    });
    const I = Ie(() => {
      var L;
      const C = {};
      return (L = r.desc) != null && L.on && Object.keys(r.desc.on).map((U) => {
        C[U] = () => {
          r.desc.on[U](
            r.formData,
            N.find((B) => B.value === j.value),
            r.rowIndex
          );
        };
      }), C;
    });
    N.length <= 0 && r.desc.remote && (r.desc.initLoad ?? !0) && M.remoteMethod("");
    const O = Ie(() => (C) => r.desc.optionTip(C));
    return Oe(async () => {
      m.value = await Se(r, M), z.value = !0;
    }), He(
      () => r.desc.options,
      async (C) => {
        typeof C == "string" ? N.splice(0, N.length, ...D[C] || []) : typeof C == "function" ? N.splice(0, N.length, ...await C(r.formData)) : Array.isArray(C) ? C && N && !_t.isEqual(C, N) && N.splice(0, N.length, ...C) : N.splice(0, N.length);
      },
      { immediate: !0 }
    ), He(
      () => j.value,
      (C) => {
        var L;
        m.value.allowCreate && C && Array.isArray(C) && C.some((U) => {
          var B;
          return typeof U == "string" && U.length > (((B = o.form) == null ? void 0 : B.leng.input) || 20);
        }) && (Wn.warning("最大长度为： " + (((L = o.form) == null ? void 0 : L.leng.input) || 20)), j.value = C.filter((U) => {
          var B;
          return typeof U != "string" || U.length <= (((B = o.form) == null ? void 0 : B.leng.input) || 20);
        }));
      }
    ), (C, L) => {
      const U = F("el-option"), B = F("el-select");
      return z.value ? (_(), R(B, le({
        key: 0,
        class: ["el-plus-form-select", C.desc.class],
        style: C.desc.style
      }, m.value, {
        modelValue: j.value,
        "onUpdate:modelValue": L[0] || (L[0] = (q) => j.value = q),
        loading: C.loading
      }, Te(I.value)), {
        default: Q(() => [
          (_(!0), P(me, null, ve(N, (q) => (_(), R(U, le({
            key: q.value || q.v
          }, q), {
            default: Q(() => [
              Ye("div", v2, [
                Ye("span", null, xe(q.label || q.l), 1),
                C.desc.optionTip ? (_(), P("div", w2, xe(O.value(q)), 1)) : ae("", !0)
              ])
            ]),
            _: 2
          }, 1040))), 128))
        ]),
        _: 1
      }, 16, ["class", "style", "modelValue", "loading"])) : ae("", !0);
    };
  }
});
const T2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: Hi }, Symbol.toStringTag, { value: "Module" })), L2 = {
  name: "ElPlusFormSlider",
  inheritAttrs: !1,
  typeName: "slider",
  customOptions: {}
}, x2 = /* @__PURE__ */ fe({
  ...L2,
  props: {
    modelValue: {},
    field: {},
    desc: {},
    formData: {}
  },
  emits: ["update:modelValue"],
  setup(f, { emit: s }) {
    const r = f, o = h(r.modelValue);
    s("update:modelValue", o);
    const D = h({}), j = h(ke(r));
    return Oe(async () => {
      D.value = await Se(r, { ...we() });
    }), (m, N) => {
      const d = F("el-slider");
      return _(), R(d, le({ class: "ElPlusFormSlider-panel" }, D.value, Te(j.value), {
        modelValue: o.value,
        "onUpdate:modelValue": N[0] || (N[0] = (M) => o.value = M)
      }), null, 16, ["modelValue"]);
    };
  }
});
const Ki = /* @__PURE__ */ Ke(x2, [["__scopeId", "data-v-b3d36458"]]), E2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: Ki }, Symbol.toStringTag, { value: "Module" })), C2 = { class: "ElPlusFormStatus-panel" }, b2 = {
  name: "ElPlusFormStatus",
  inheritAttrs: !1,
  typeName: "status",
  customOptions: {}
}, O2 = /* @__PURE__ */ fe({
  ...b2,
  props: {
    modelValue: {},
    field: {},
    desc: {},
    formData: {}
  },
  emits: ["update:modelValue"],
  setup(f, { emit: s }) {
    const r = f, o = ["#909399", "#e6a23c", "#67c23a", "#000000", "#f56c6c"], D = h(r.modelValue);
    s("update:modelValue", D);
    const j = h({}), m = Ie(() => ({
      background: o[r.desc.attrs.find((N) => N.v == D.value).c] || r.desc.attrs.find((N) => N.v == D.value).c || "#909399"
    }));
    return cn(() => {
      j.value.l = r.desc.attrs.find((N) => N.v == D.value).l;
    }), (N, d) => (_(), P("div", C2, [
      Ye("i", {
        style: Dt(m.value)
      }, null, 4),
      Ye("div", {
        class: bn(N.desc.class),
        style: Dt(N.desc.style)
      }, xe(j.value.l), 7)
    ]));
  }
});
const qi = /* @__PURE__ */ Ke(O2, [["__scopeId", "data-v-02c49aae"]]), S2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: qi }, Symbol.toStringTag, { value: "Module" })), B2 = { class: "el-plus-form-switch" }, k2 = {
  name: "ElPlusFormSwitch",
  inheritAttrs: !1,
  typeName: "switch",
  customOptions: {}
}, $i = /* @__PURE__ */ fe({
  ...k2,
  props: {
    modelValue: {},
    field: {},
    loading: { type: Boolean },
    desc: {},
    formData: {}
  },
  emits: ["update:modelValue"],
  setup(f, { emit: s }) {
    const r = f, o = h(r.modelValue);
    s("update:modelValue", o);
    const D = h(!1), j = h({}), m = h(ke(r));
    return Oe(async () => {
      j.value = await Se(r, { activeValue: 1, inactiveValue: 0, clearable: !0, ...we() }), D.value = !0;
    }), (N, d) => {
      const M = F("el-switch");
      return _(), P("div", B2, [
        D.value ? (_(), R(M, le({ key: 0 }, j.value, Te(m.value), {
          modelValue: o.value,
          "onUpdate:modelValue": d[0] || (d[0] = (z) => o.value = z)
        }), null, 16, ["modelValue"])) : ae("", !0)
      ]);
    };
  }
}), U2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: $i }, Symbol.toStringTag, { value: "Module" })), Q2 = {
  name: "ElPlusFormTag",
  inheritAttrs: !1,
  typeName: "tag",
  customOptions: {}
}, Ji = /* @__PURE__ */ fe({
  ...Q2,
  props: {
    modelValue: {},
    field: {},
    loading: { type: Boolean },
    desc: {},
    formData: {}
  },
  setup(f) {
    const s = f, r = Ge("format"), o = h({}), D = h(ke(s)), j = h(""), m = h("");
    return Oe(async () => {
      o.value = await Se(s, { ...we() });
    }), He(
      () => s.modelValue,
      async () => {
        s.desc.tagType ? typeof s.desc.tagType == "function" ? m.value = await s.desc.tagType(s.modelValue, s.formData, s.field) : typeof s.desc.tagType == "string" ? m.value = (await r)[s.desc.tagType](s.modelValue, s.formData, s.field) : m.value = "" : m.value = "";
      },
      { immediate: !0 }
    ), He(
      () => s.modelValue,
      async () => {
        s.desc.format ? typeof s.desc.format == "function" ? j.value = await s.desc.format(s.modelValue, s.formData, s.field) : typeof s.desc.format == "string" ? j.value = (await r)[s.desc.format](s.modelValue, s.formData, s.field) : j.value = s.modelValue || "—" : j.value = s.modelValue === "" ? "—" : s.modelValue ?? "—";
      },
      { immediate: !0 }
    ), (N, d) => {
      const M = F("el-tag");
      return _(), P("div", null, [
        se(M, le(o.value, {
          size: o.value.size || "small",
          type: m.value !== "--" ? m.value : ""
        }, Te(D.value)), {
          default: Q(() => [
            be(xe(j.value || N.modelValue), 1)
          ]),
          _: 1
        }, 16, ["size", "type"])
      ]);
    };
  }
}), P2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: Ji }, Symbol.toStringTag, { value: "Module" })), V2 = { key: 0 }, F2 = {
  name: "ElPlusFormText",
  inheritAttrs: !1,
  typeName: "text",
  customOptions: {}
}, R2 = /* @__PURE__ */ fe({
  ...F2,
  props: {
    modelValue: {},
    field: {},
    loading: { type: Boolean },
    desc: {},
    formData: {}
  },
  setup(f) {
    const s = f, r = Ge("showInfo"), o = Ge("format"), D = h({}), j = Ie(() => {
      const N = ke(s);
      let d = s.desc.linkId || "id";
      if (typeof d == "function" ? d = d(s.modelValue, s.formData) : d = s.formData[d], s.desc.linkType && d) {
        let M = s.desc.linkType, z = s.desc.linkLabel || "";
        typeof M == "function" && (M = M(s.modelValue, s.formData)), typeof z == "function" ? z = z(s.modelValue, s.formData) : z = s.formData[z], N.click = () => {
          r(d, M, z, s.formData);
        };
      }
      return N;
    }), m = h("");
    return Oe(async () => {
      D.value = await Se(s, we());
    }), He(
      () => s.modelValue,
      async () => {
        s.desc.format ? typeof s.desc.format == "function" ? m.value = await s.desc.format(s.modelValue, s.formData, s.field) : typeof s.desc.format == "string" ? m.value = o[s.desc.format] ? o[s.desc.format](s.modelValue, s.formData, s.field) : "--" : m.value = s.modelValue || "—" : m.value = s.modelValue === "" ? s.desc.default ?? "—" : s.modelValue ?? s.desc.default ?? "—";
      },
      { immediate: !0 }
    ), (N, d) => (_(), P("div", le({
      class: ["ele-form-text", [...N.desc.class || [], N.desc.linkType ? "ele-form-text-click" : ""]],
      style: N.desc.style
    }, D.value, Te(j.value, !0)), [
      N.desc.title ? (_(), P("span", V2, xe(N.desc.title + ": "), 1)) : ae("", !0),
      N.desc.icon ? (_(), P("i", {
        key: 1,
        class: bn([N.formData.icon])
      }, null, 2)) : ae("", !0),
      be(" " + xe(m.value), 1)
    ], 16));
  }
});
const Xi = /* @__PURE__ */ Ke(R2, [["__scopeId", "data-v-be811ef2"]]), W2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: Xi }, Symbol.toStringTag, { value: "Module" })), G2 = {
  name: "ElPlusFormTextarea",
  inheritAttrs: !1,
  typeName: "textarea",
  customOptions: {}
}, ea = /* @__PURE__ */ fe({
  ...G2,
  props: {
    modelValue: {},
    field: {},
    loading: { type: Boolean },
    desc: {},
    formData: {}
  },
  emits: ["update:modelValue", "validateThis"],
  setup(f, { emit: s }) {
    const r = f, o = Ge("defaultConf"), D = h({}), j = h(ke(r)), m = h(r.modelValue);
    return s("update:modelValue", m), Oe(async () => {
      var N;
      D.value = await Se(r, { maxlength: (N = o.form) == null ? void 0 : N.leng.textare, showWordLimit: !0, rows: 3, ...we() });
    }), He(
      () => r.modelValue,
      (N) => {
        N && N.length > D.value.maxlength && (N = N.substring(0, D.value.maxlength)), m.value = N;
      },
      { immediate: !0 }
    ), (N, d) => {
      const M = F("el-input");
      return _(), R(M, le({
        class: N.desc.class,
        style: N.desc.style,
        type: "textarea"
      }, D.value, {
        modelValue: m.value,
        "onUpdate:modelValue": d[0] || (d[0] = (z) => m.value = z)
      }, Te(j.value)), null, 16, ["class", "style", "modelValue"]);
    };
  }
}), Z2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: ea }, Symbol.toStringTag, { value: "Module" })), H2 = {
  name: "ElPlusFormTransfer",
  inheritAttrs: !1,
  typeName: "transfer",
  customOptions: {}
}, K2 = /* @__PURE__ */ fe({
  ...H2,
  props: {
    modelValue: {},
    field: {},
    loading: { type: Boolean },
    desc: {},
    formData: {}
  },
  emits: ["update:modelValue"],
  setup(f, { emit: s }) {
    const r = f, o = h(r.modelValue);
    s("update:modelValue", o);
    const D = h(Object.assign({}, mn(), r.desc.slots)), j = h({}), m = h(ke(r));
    return Oe(async () => {
      j.value = await Se(r, { ...we() });
    }), (N, d) => {
      const M = F("el-transfer");
      return _(), R(M, le({
        class: [N.desc.class, "ele-form-transfer"],
        data: N.desc.options,
        style: N.desc.style
      }, j.value, {
        modelValue: o.value,
        "onUpdate:modelValue": d[0] || (d[0] = (z) => o.value = z)
      }, Te(m.value)), an({ _: 2 }, [
        ve(D.value, (z, I, O) => ({
          name: I,
          fn: Q((C) => [
            Xe(N.$slots, I, { data: C }, void 0, !0)
          ])
        }))
      ]), 1040, ["class", "data", "style", "modelValue"]);
    };
  }
});
const ta = /* @__PURE__ */ Ke(K2, [["__scopeId", "data-v-6262dcef"]]), q2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: ta }, Symbol.toStringTag, { value: "Module" })), $2 = {
  name: "ElPlusFormTree",
  inheritAttrs: !1,
  typeName: "tree",
  customOptions: {}
}, J2 = /* @__PURE__ */ fe({
  ...$2,
  props: {
    modelValue: {},
    field: {},
    loading: { type: Boolean },
    desc: {},
    formData: {}
  },
  emits: ["update:modelValue"],
  setup(f, { emit: s }) {
    var I;
    const r = f, o = Ge("globalData"), D = h(((I = r.modelValue) == null ? void 0 : I.split(",")) || []), j = rt([]), m = h(!1), N = h({}), d = h(ke(r)), M = h();
    Oe(async () => {
      N.value = await Se(r, { checkStrictly: !0, showCheckbox: !0, accordion: !0, props: { label: "label", children: "children" }, ...we() }), m.value = !0;
    });
    function z() {
      s("update:modelValue", [...M.value.getCheckedKeys(!(r.desc.isPId ?? !0))].join(","));
    }
    return He(
      () => r.desc.options,
      async (O) => {
        typeof O == "string" ? j.splice(0, j.length, ...o[O] || []) : typeof O == "function" ? j.splice(0, j.length, ...await O(r.formData)) : Array.isArray(O) ? O && j && !_t.isEqual(O, j) && j.splice(0, j.length, ...O) : j.splice(0, j.length);
      },
      { immediate: !0 }
    ), He(
      () => r.modelValue,
      (O) => {
        D.value = (O == null ? void 0 : O.split(",")) || [], M.value.setCheckedKeys(D.value);
      }
    ), (O, C) => {
      const L = F("el-tree");
      return m.value ? (_(), R(L, le({
        key: 0,
        ref_key: "treeRef",
        ref: M,
        class: O.desc.class,
        style: O.desc.style
      }, N.value, {
        "default-checked-keys": D.value,
        loading: O.loading,
        "node-key": "id",
        data: j
      }, Te(d.value), {
        class: "el-plus-form-tree",
        onCheckChange: z
      }), null, 16, ["class", "style", "default-checked-keys", "loading", "data"])) : ae("", !0);
    };
  }
});
const na = /* @__PURE__ */ Ke(J2, [["__scopeId", "data-v-c636bc55"]]), X2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: na }, Symbol.toStringTag, { value: "Module" })), ey = {
  name: "ElPlusFormTselect",
  inheritAttrs: !1,
  typeName: "tselect",
  customOptions: {}
}, la = /* @__PURE__ */ fe({
  ...ey,
  props: {
    modelValue: {},
    field: {},
    loading: { type: Boolean },
    desc: {},
    formData: {}
  },
  emits: ["update:modelValue"],
  setup(f, { emit: s }) {
    const r = f, o = Ge("globalData"), D = h(r.modelValue);
    s("update:modelValue", D);
    const j = rt([]), m = h(!1), N = h({}), d = h(ke(r));
    return Oe(async () => {
      N.value = await Se(r, { filterable: !0, clearable: !0, props: { label: "name", value: "id", children: "children" }, ...we() }), m.value = !0;
    }), He(
      () => r.desc.options,
      async (M) => {
        typeof M == "string" ? j.splice(0, j.length, ...o[M] || []) : typeof M == "function" ? j.splice(0, j.length, ...await M(r.formData)) : Array.isArray(M) ? M && j && !_t.isEqual(M, j) && j.splice(0, j.length, ...M) : j.splice(0, j.length);
      },
      { immediate: !0 }
    ), (M, z) => {
      const I = F("el-tree-select");
      return m.value ? (_(), R(I, le({
        key: 0,
        class: M.desc.class,
        style: M.desc.style
      }, N.value, {
        modelValue: D.value,
        "onUpdate:modelValue": z[0] || (z[0] = (O) => D.value = O),
        data: j,
        loading: M.loading
      }, Te(d.value), { "render-after-expand": !1 }), null, 16, ["class", "style", "modelValue", "data", "loading"])) : ae("", !0);
    };
  }
}), ty = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: la }, Symbol.toStringTag, { value: "Module" })), ra = ["image/jpg", "image/png", "image/gif", "image/jpeg"], ua = [".jpe", ".jpeg", ".jpg", ".gif", ".png"], oa = ["video/3gpp", "video/mpeg", "application/mp4", "video/mp4", "video/ogg", "video/x-flv", "video/x-msvideo"], sa = [".3gpp", ".mpeg", ".mpg", ".mp4", ".ogv", ".flv", ".avi"], ny = ["audio/x-wav", "audio/x-ms-wma", "audio/mp4", "audio/mp3"], ly = [".wav", ".wma", ".mp4a", ".mp3"], ia = ["application/x-msaccess", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.openxmlformats-officedocument.presentationml.presentation", "	application/vnd.ms-powerpoint", "application/vnd.ms-excel", "	application/msword", "application/pdf", "application/vnd.ms-works"], aa = [".mdb", ".docx", ".xlsx", ".pptx", ".ppt", ".xls", ".doc", ".pdf"], ca = ["application/xml", "application/x-sh", "application/json", "application/javascript", "application/java-vm", "application/java-archive", "text/html", "text/plain"], Ma = [".xml", ".sh", ".json", ".js", ".class", ".jar", "html", ".txt", ".wdb", ".wps"], fa = ["application/x-rar-compressed", "application/x-msdownload", "application/x-font-woff", "	application/x-font-ttf", "application/x-7z-compressed", "	application/vnd.android.package-archive", "application/zip"], ga = [".rar", ".exe", ".woff", ".ttf", ".7z", ".apk", ".zip"], ry = [...ra, ...oa, ...ia, ...ca, ...fa], uy = [...ua, ...sa, ...aa, ...Ma, ...ga], wl = [
  { type: "pdf", suffixes: [".pdf"] },
  { type: "txt", suffixes: [".txt"] },
  { type: "excel", suffixes: [".xls", ".xlsx"] },
  { type: "word", suffixes: [".doc", ".docx"] },
  { type: "ppt", suffixes: [".ppt", ".pptx"] },
  { type: "zip", suffixes: [".zip", ".rar", ".7z"] }
], zi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, audioSuffixes: ly, audioTypes: ny, fileSuffixes: uy, fileTypes: ry, imageSuffixes: ua, imageTypes: ra, officeSuffixes: aa, officeTypes: ia, otherSuffixes: ga, otherTypes: fa, suffixTypes: wl, textSuffixes: Ma, textTypes: ca, videoSuffixes: sa, videoTypes: oa }, Symbol.toStringTag, { value: "Module" })), oy = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAE9UlEQVR4nO2bbUwbdRzHf5WwTajTF5ApzjnHi+F0DyKbCEbQpehe6KjMhBghaqIBo44Iy5TErFGSLcqi7IXgC+MCL+SFW1FfjNCoTCNxhPmAhrkpyMBsgB0ZDMooD+fve8thr73C9XrEXvf/JM39f3ft9f/7/J/ueqmNwvC4uzh/3mbbK5FUyOH/yv2pW744lFu9m4umoynA4S5+jo98wsWYoCRjD/VdPv+RK7uyjENTCRGAlp+z0TdcjBkgAIz4vAeqMsve5qJphAgocBe3SDZalu5mFEUAODN6bt/BnOpaLppCiABHS7HEm5giUIB/zk/d3p6KI3k1dRxGjeUEgHlpfmp4auSJ/ZmvfMVhVFhSADBLgmUFgKmZq1OdI6fzP975fieHhrC0ADDuv+L7w9ubWfdozVkOI8byAsD07PTgpOTbXrH5xWEOIyIuBACjEuJGALgwMfTXD4NdmS3Oo5c51EVcCQCjV0dPVWx7KZuLuog7AWBsevzrV7e+sJOLSxKXAsDfVy60Vm9/bRcXF8USApwbdpF9RTKXIqPn0rklb6MtISDn1ixKv2U9GWGpO0hLCFhFK+jpjCe5ZIzFJFhCALjLvpYeWqt7cg+ha/hnzTtIywiQJInSVqVSdloW2VfaeU9k4Da6f3ywqObB/cc5XMAyAhRm/NO0OsFOibYEun11Gu/Rj39u1t/w2LsrubiA5QQozM3OyjIi5btnvlTlrAqAVQQYxVPYrMpZFQAhQAgQAoQA3sQtQoAQIASoclYFQAgQAoQAIYA3cYsQIAQIAaqcVQEQAoQAfQLsicmUnJhEw75/OApF63j6zXdy7KWJmUmOFmdNUiqtuTGFP7Oeesf6qW98QNfnlsI0AU/x46pnM4qovP1NTuq/JBXey31LllDe/gZH12jb/Sk1/NpIx/tOcBSeko1F5Eznx2H8eQUk7+49QU1nj3FkHNMEoHJIkn+xp33f18gVVCjZuIcfaBbx/nfoF28P77kGBDT9foyT+IwjbfAYzPVApfw+N4vCebembCLHHXlUsO5hcp06TB1DXfxOY5gmAKBL1+cforaBk1T7UwPvIbmyEIMEghPVI8C1o5LlJlEVywsG0iEkGkwVADAUyjaXUu2PDXLLNDrqqNt7hlydh/moGr0CNrDYl3loRZusFqYLAKj0lpS75bkArYR5QavyegQoQ2CIz4Ux332phyfB83zEHJZFAJJGy2MbPO4D0SMAYBiV3VsqDzEAGR4eZu6+Vk2xkbAsApRhMDnjoz/H+mUJWugVoIClMJd7RM5tWdzDNsnJl3r2ylujmC4ArYSJEN21bfCkXA6XZKQCAkGvwOSK76n/rZH3GMNUAejyH+YflFteWe/DLYEgGgGglgUArRVCL6YKOLDjddqWcg+VcfKYABVQUczkwd1VjwCc0zPwrbyiBALZmGc6Lp7mJbee9xjDNAFKS2tdmKCyTY4jIfMBBKBXdPMrkAnuQbjoAZCH8Y73dVzs4hWgX+7+jnV5dBOfN1h2pJgmoOq+crki4VoTlcZMDgFKLyjnGHNGMBAQeN1QwFd9mPjwAlgG8cJ34TujwTQBVkUIEAKEAFXOqgAIAde7gFj846RZ2CT6vM3ZXMjFBUIExOJfZ80iQaJHWp3N7RRAiAAQa3+eNgWJnvc4m49SEJoCAHrCPFGF1YcDuv0NRB8Et7zCv9Ii61+eHeesAAAAAElFTkSuQmCC", sy = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAEWElEQVR4nO2bS2gTWxiA//Q+ehFusrgPqjb3XkQu9zaCUlFsV9ZXU0UqPuJCBKtGN4LV1o0LXyAubLQRdRN8QEUxPlDxERW1q0YFXWhbLYgWk9j6qDVRY9PajP+fMGlOpxkzdcQ58XzQmf+fOUzzf3POmRmGMUEGdhYUTjWZ4mtBgnmYflMmVFVdn7Fj+3QMdWdIAa6C0cskkA5haAhKa9dD9+P2A3P2712Jqa4oBCTOPMRvYGgYSAARCYQ22927t2GoGwoBrpGjzkgSVGJoGGQBhN4SFALqCkZJuDIU6QKIrra2jXM9nh0YfjFcCoj3xz+8DQXnVuzZcw3TL4JLAYReErgVQOghgWsBRPR1d7Tj7v3ipb5zbZhqhnsBRF+0J9DX9XLSDLf7OaaayAkBxHAl5IwA4sPrN0/vHT0yfl17+xtMsyKnBBDvOp/fmlW3cwqGWZFzAohoV3fWD085KYDIVgIXAmyLHWCxFmKkjdDtO+cWeY+pPtdwIeCvsqlQOLEYI+187uGJCwE/mH+Fyaucyh+bJWoSFMc0ogDCUvQ/2GZXYDQ8nlxvrF5y8bwbQwZuBBAjxoyBf6dPgxEWM2ba+NgTg1etDxfMP9pwGtMUXAkgov1x+PG330H6+Sco+Odv3JI9H3v7elf7LuRjmII7ATK9cQne9/djpI3tXS+YmpmE4EXAcKntfMbUzCSEECAECAFCAK5yFiFACBACmJqZhBAChAAhQAjAVc4iBAgBQgBTM5MQQoAQkJ2AfIsF/igqwmiAl62tEAuHMWIZqm3Q78elOoUlJbhU0vs2Ai+aWzDSjm4CHKdOgLW0FCOWcCAAl6vXQ6CpCbMkmdpSEXc9HmjxnsCMpfLQQRhrL8doaFwjR+NSO7oJqOkIQZNrF/jrXJgloSJL8EUmne2GmeX4RiaAW5Vt/xxnA7PVCjaHI1Fk83EvSluHewZwnD6JSwDv/IW41I+vKoCg7r7mYSuzL1Nbgl582ut3K/ZzK4BYevUKRIJBOFu1HDP1tgQVS71m338D8wRtI7gTQF3befsmsy9TWxm5F3gXLErNHVwIoLHbgn8yNLaLnSvhFxwGnslTUlcEaqsmgOYOmih9OA/IxyMB1gxXgR48bnpv0YKuAgZD3Z5m9hubNqcmQILaqgkYW2GHyoMHFD0g32yGxk1bYDCxSDjxf4aDrgLUikrnc23Ltm1N9BzqNbI4EkAYegioFZWOWlt5zgjgjVF6sd+FABr75fW7wIISGmbOYrp1TglY0/YAi2vG8e3HDCdLW/JGiCbNWCSCl8sVuC859mUML8DurodHPh88uuTDTJ1ipxMnunKMBoiFI1i0H2+DvRgnrxbplNTW4PZI4lZZT3QTwCtCgBAgBDA1MwkhBHzvAoz44aRemExwtqbj2TwMUygEGPHTWb2QIK9sQ2ewEdJQCCCM9vG0HpjAVFXTGToMgxhSAEE9Ic8Ur+Z9OFC3j0t59YPPvMwn4xjMX8B9vzAAAAAASUVORK5CYII=", iy = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAACfUlEQVR4nO3bS2sTURTA8TNJaqWiVMhCUQsqiuAjGG2pKLbGLrRY00EEoS4s1ro0gitBg3XhUl1aEf0ERt372PoRiuLCB2Jt2tKmSZpMcntOIaW308dMeqFzL+e/ued0d39JSlMYC1bo8ctMp6jCHQHQi+uG1npk36fu07HzOCpvWYCh4cwNIeA1joGo48QhmJiaeWUnTg7gqjQXAL3y1Sp8xjEwEQA1lSukL3fGh3BUlgvg0XDmHQhI4hiYagCUagQ3wIuMwCNQLQag/k9O37/a1fYEx3WnJQD+ci7kcoWenkT8I67rSksAShWCtgCUCgStAah8sZT/m83GbyYTI7j6TnsAquxUflkgWrvaj/7D1VdGAFD1IhgDQOHH4efItx+xu/32JK6eMgqAyuWLXy+dPd6Oo6eMA6DysyXPX56MBKC8ImgBEDvYAs1bm3Dy1+/R7Ifr3WdW/V6jBcDeXVFo2RHFyX9rfXnSAiASCUHb4f3QEAnj5r/VELQAoLZv2wLHDuzBqb6+/xlNDSQ7nuMopQ0A1bipARF2Q9PmRtz85VQqMDY+feXaxVNvcV1IKwCqOFuGSDiM/7MRsDPajD/xXtlxSqm+C5KedgC1SmWH/vLDyV9P7/VJd5YWSheAekvftqU7SwvFAAzAAAyAh7ExAAMwgHRnaaEYgAEYgAHwMDYGYAAGkO4sLRQDMAADMAAexsYADMAA0p2lhWIABmAABsDD2BiAARhAurO0UAzAAAzAAHgY29oAAXxwUlkWvE8P2r04LeQCCOKjs6oKheDcg1v2F1iUC4AK2sPTKrIs6H84aL+BJS0LQM2/EwSktP844Ns+ZMGzpa98rTlAGolQGdxvxgAAAABJRU5ErkJggg==", ay = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAD00lEQVR4nO2bT0gUURzHf2/+rIsRGVRS0db2HwS1gxoFVkR1sjzkoUNlhw5BUoeORVAdFYoOHVQyT0FdqlvRH+vUerAEISkKkwrDyBDM/eO8vm/8k7M7u85sI7szvQ/MvN9vZnm77zNv3rzd2WGUhWRveK9B/Bxx3oi0oCirzjzTN9zYj9BzbAUkYuFmTsZthEWBuvYiPtS3O1r0VjN5TIYA88hz4znCosEUAHhi+LIebb+C0DMyBMRjoS4iOomlaJgVIPBagp2APhTVWIqG+QIEXkqwE8BRFBXpAogbv9X4cAPb1PkU2T/hTwECjyT4V4DAAwn+FiAQEhIfd7KN3f3IXON/AYAZE8NKaLSGlXeMIHVFIAQI8pUQGAGCfCQESoDJ1K9eLdJWi8gRwRMAePKH4y9PgRQgcCrBFwKUFSeIlUQQucOJBF8IYKX1pCyvR+Sehb43+EIA52FSV7cQU0uQuSeXBF8IMAlVkbqyAUF+ZJPgHwEm5TgVDuGUiCDOg8TQMS3aeRfRHD4TgCOZwspYhksDFrcY8VR497COaA7fCZiFG1iJxSXhXQlLmy2JwC8C8qWkVgqwtNmSCKQAKUAKkAJQBBYpQAqQAixttiQCKUAKkAKkABSBRQqQAqQAS5stiUAKcCiAlVYt+MMkn+jHzcoxvK4Md3bWI3+LrTaI/aiPj/cgcVj3+Eus3eOZAK2il5TSSkTZSb5vIj72kJTyFtIirZR8dxAfvAd7rGgVMawZpQZqUBLpO74T03ILSA7UZheaA88EpBOqidPUl2s09fUqskyEMBaKULJ/23SvmEGNtJFafjZngxaq2w0FE0ChDaTjSIsekPrQhA1487LDpG+5R6nPF8gYuYkt9ixYtwsKJwBYGvzzEYS8hpBXEHIUe7PjpG6nFFSAQI12kLriOBno7gyDn+j6808JO5zW7YSCCxAjvl45iEGujFKfTpMx2o2NuXFctwMKLkBdc8n8xwePDyHj6AF1/08PYEv3kL79sfk6A5dHbdsTjAF/B8VsOKnbKYUTMNP1xeQoNXgAG6b/+qJF26cHxaBfBcRkh+FSmOzfauny2ub7uOffgFMhwPOAucmO3UxQ9AzIyTUe5KrbLYsmQBzJKYzoYuqbjhj4eGIo64gv5v7qutbpscBGgFk3Gp+th7hh0QT4BSlACpACLG22JAIpIBZ6g6IKSyBxIqCLiuzBSc/g7EFJXbwR0RwZAhKxJdWYkvQhDBwKU/bpNZMvaB4ZAgTF9vC0FzBSToVqJ7soDVsBAvMhaoOfJ8aPIPUv6PaKwq6nH/lZ/gBjD5Nf2bkbBQAAAABJRU5ErkJggg==", cy = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAE/UlEQVR4nO2bW2wUVRjHv12KhRZ7UUq1Nyhp60MxRmobpSa21ZhIQ1hjrPIi9RJ9UnmBB8VgjIlRHxSIMSUhXh6kQGKKCSoaaF9KogZtIk1sMbbZFhB3WZZCd9nr+P1nPZud2Xt3XHaW80ume77ZzuX7nW/OnO1sLZSE1UfP9VCYXidSbBzeVF5sqTz1fkfto9w0nIQCVh+eepvf2kMFwq72O2nmmu/gpw/VvcShocQJiPS8MsrNggECwJwnuGd/V+073DSMeAGHp8eI6BFeCgYhABgtIZEAhV8KilgBYGrB98bBTXXvcTNnTCkgFFa88zeCWz7puuskhzlhSgHAKAmmFQCMkGBqAcDlC3kmrgY2ft9XP8Vh1pheAPCGlDmXdUXn3ntXXeIwK4pCAFiqhKIRAFy+oH3Y7rlv9slmN4cZUVQCwEVv8KePOmsf5GZGFJ0AcNkXzPjDU1EKAJlKMIWAZ9dVUFP5cm5lxy9O7zdHexq2cjMpphDQt2YlPVBTxq3sSffhyRQCKpcRDbZUU2mJlaPsSSXBFAJAO18C/XwpLJWTf1/fceKxtXu5qcE0AkDjcittXns7VZaWcJQdN0Jh+uNa4KmvHq77msMophIAFH+IaqwWKuV2U/UK/pk5/lDYf2LLemwaxXQCBEowTIovxK3scL3QrslZEwCzCFgqzmfaNDlrAiAFSAFSgBTAL0WLFCAFSAGanDUBkAKkAClACuCXokUKkAKkAE3OmgBIAVJA/gRsqCqlCv5LL5h0++hqIMyt9DSVl1BDWeRJ0bwnQPbFILcywzABIz311L0m/mnNt+ev04FpN407vBwl5uXWKnqlrYoTiSQhODSzQG9NOJKK6K5ZSTvb74g77vg/Hto94aSzLDEdhglwDLTS8OwCDfNJC9Cjm+vLaROf4ND0FfWk9OzrrKVtzRXRbSEK2yG5XZycm5Pv+8EeJ2EbPxTZ11VLc4sB3q9DTRY9j+Pt5IenjWUl1PejXV2XCkMFfDh5mT6YdHGkBYngpF77+RId4kQFIondvzlo6Fz8dxgg4hhX1u+cnG3sPK+JgJI/099Mp7mnnxu/GCenki8jVNQQV57+PT15EQCQSDsn1DLyF0cRzvSvUw+48fgsJUPI6+UqQC+DL7vvViukN4MeTkfeBKA0v+iuI9vofLTMRx9vSrkNEL0dWyV/2targ+TWmKpYKnkTIBLePn6BB8ZFtQdHehuicSr0+0Z8gMeUNxOMKdmSNwH6hEWsHxcSod83Ygyar/K2uZI3AWLAE9eyKO10PSkqJ1bUrzx2uP18d+AxIFfyIgCj8ilOAjuPHfDEwNjB65KN1vtZGr4S03F8JjrgiXViPMmF/10Aehr3ekxW9CcsLoNkEx5RNfoqgVC1Cvj3t/NtEBUVC6oGxxw8fSEqLRmGCsAMTCSIk8SJYMFOMQkSJRyLSNLOExpc12ev+GhDdWQiBGnf8UwS93o92C8qqOK2ZapASMCCuw2qY84TVIXrpeoxTIC4XwswQ8MCIUgsVU8gWUxcnqhfxVEEJIMpdCJpAkh+9/4adfvG/6bRC/6QejxUYrrkgWECzIoUIAVIAZqcNQGQAm55AUemRkixpPyCsWmxKMecA/fYuBUlXkAB/uusYVgtvc6nW8cohjgBoObI9KCi0GfcLBosFnreMdD2OelIKAColaCEd5j+cuCyJ4v1Y33PC/4FkIYsbolXiDkAAAAASUVORK5CYII=", My = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAD3UlEQVR4nO2bS0wTURRAb/kIQQWMXYAfRIlKokhE+UUiHwkqAaESowajEhF3iokrE0VxYcJGZWeNEVhoXAj4W0iisDAxLA0uRMUoavgIyqcWaAvjvWix005rB16lb3yHTHrvhQHuee/Nm2ZAB264dKMpS5qCUxJAMabzSvLGNc/ytyXuwJA5igIuXm+6AABVePgFmVvi4fvIj5uGnK3lmDLFRQCN/NQUtGLoN5AAYsQ0VrUnK6kaQ2a4CMDRbwP8mXj4DXYBBGsJSgIkfPErHAUQX4dGz+7LTbmM4ZzhUgBenMdMprHCwpykp5jOCS4FEKwkcCuAYCGBawGEedxi7hkcTDpWlNOJqWq4F0BYbZOfdCAl56Yl9GGqCk0IIGYrQTMCCFwO3Z1v3yeeLjMMYeoVmhJAmMzj7QXbN6dh6BWaE0CYJyxev3nSpADCWwlcCEhcFwORi8MwUsfn/sEHh/IzijB0CxcCVi/XQ0yUHiP1/O3NExcCgoICIGVDHAQHBWKmHk8SuBBALAlfCJvWrsRodrz70l9ZXpR5DUMZ3AggQhYEo4QVEBYagpk6bJOTMPBttOTA7vRGTGfgSgAxPmGFoMBAkPAjWh+JFe+x2myWytJdMnvcCbBjsdrozg8jdVw5UyrrWZYQvAiYLVUnDLKeZQkhBAgBQoAQgC+aRQgQAoQAWc+yhBAChAAhQAjAF80iBAgBQoCsZ1lCCAFCgG8E0JOdoVEzRvMLMwGHCzIgdpn7pzW9A8NgbGzFCGBVtB6OFGaA8V4r9A4OYwVgfWw07M9LxUgOSWrv6IL2V12YsYeZABrRiEWuz+visbHUhLjpJp686MDKHwH1D5/Dx54BrPx64EkH1RxJw3NJDp1L34M1zAQoEYoPLk4ezIMhkxkasLFxixWrngVUG5sxk1NRkg2RKLem/jFmbPGpAPuycJzqhFoBVKdD6XNzxWcCaNrvTE9QnLpqBZDIKH0E1NRxMgOilkZM/9I06g2P5Gua8CSAao6QSLqOKIlkgU8EVOzFNRseBrW3W2bWvSOeBDgzvQvgDuCL5gnmAqgJOu62tEPnhx6suOJJgNIS8CVMBdgbo9GiKesO+9dpSgBtebRd0ZR33PKU0KQAuuLTBes1Tvs+vPg5Q2v55ZtujDQqgG5j6Y7NHSSg9k4LRr93CRRA9wdUJ+hcEkC1fwkzAbwiBAgBQoCsZ1lCCAH/vQBjUzNI4PEPjLlFB/erKgzFGM3gIsAf/3WWFQEBkH3uuKENHHARQFQbm45KEtzCUDPodFB2vsJQB04oCiCmZ4IEldwvB5z2ATq46jzydn4C6fJqX6F9jQkAAAAASUVORK5CYII=", fy = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAADs0lEQVR4nO2bTUgUYRjHn3HLpfwoNbX8iMQO5cWKIiGw0sJLpWCXECwh8JbiwcBDkkFSkiVUYBSVUB3S0OhipUVhJEToISH8wtTMJLWt1FVnpudRtHl3d2xmd6SZ7f0dZp7/7gPvvr+dndmZYQRQof/A5n0gSwUgy1kY/ynBWbnNYafOpmNpOB4FDKQlnpBBuo2lKQjNLYDZz323Ikoun8RoKG4C5r55SXyBpWkgAYT0dag0rPhCGZaG4S4gPaEeZMjE0jQsCCCMluAuIC1BxpWpUAogxL7OkvDSa+VY+owlBciSOAkjg4fXnq5swugTlhRAGCXBsgIIIyRYWgAhOsYmxO6OHZFVDz9i1I3lBRCyc7J/zeSPXULh+WGMuvALAYS3EvxGACE5xj5Bc0NyWH3bOEZN+JUAQhwdbg0vKk/BUhN+J4DALUHzyZNfCiC0SrCEgKCMo2CLjsVKH1Mf3j+OrqjJxFIVSwiw70wFe9J2rPTzt5MnSwgQVodA8JEcEALtmPSzlARLCCBWbNoCq1MzsPIO57vXhVFX66qwZLCMAEKIiIGgvRkQEByKSR/yjBNmezqz15XffIRxEUsJIKRZCYTQCJBtgRAYtxFf0Y48Mz0dc6PejuUilhOwgCTiVcsZESt9JLzpZ+bMBKLfIgK8Jb65l5kzEwgugAvgArgAXPktXAAXwAUwc2YCwQVwAVwAF4Arv4UL4AK4AGbOTCC4AC5AmwABr8wGJm7F6g+zw4MgfhnAikVrr6c+V5ztrbj0HsMERF66D/Zt7jdhpZ8OGL1YDFMtTzHNE1FWDav2HMSKxbVXrU+Jo6YKHHfdLu9rxjABcU09bh/GnpwCoccLcL0bhvMPwUxXB76Ksiof4BJgpOgYLudR61XiaQxfWVYBBG3GsQ1tzHueBBCeepWojeELyy6AiKp+AiL+xr+dycekLoBw7VWy1BjesuwCbOvjYMO9V8x7agI89SpRG8MXDBXwq7EWJhrrMM2zMjEJgrPz5u7dDeWkgow7OYIECEEh8P36OUzzqPUqoTFMLcAV2qvTYWocJ6o8xJEA2tkpUetVQmOYWoDWD0cCnO1vNfUq0TOGVrgALoALYObMBEKrAPrbOtnyDI8CtZiWJqy4AgW0aupVomcMrRgmwKpwAVwAF8DMmQkEF/DfCzDhg5OGIUBDfFNvFlaLuAsw4aOzhhFg2x//vOslKHATQJjt4WkjECAgL665+w644FEAMbclyGIhWP3ngJs9CLYrrt/8Ar8BHxywX5M7ETcAAAAASUVORK5CYII=", gy = { class: "upload-panel-icon" }, dy = {
  key: 2,
  class: "el-upload__text2"
}, Ny = {
  key: 3,
  class: "el-upload__text"
}, py = {
  key: 1,
  class: "upload-hands-submit"
}, jy = {
  name: "ElPlusFormUpload",
  inheritAttrs: !1,
  typeName: "upload",
  customOptions: {}
}, da = /* @__PURE__ */ fe({
  ...jy,
  props: {
    modelValue: {},
    field: {},
    loading: { type: Boolean },
    desc: {},
    formData: {}
  },
  emits: ["update:modelValue", "validateThis"],
  setup(f, { emit: s }) {
    const r = f, o = Ge("defaultConf"), D = { excel: oy, pdf: sy, file: iy, txt: ay, word: cy, zip: My, ppt: fy }, j = h((typeof r.modelValue == "string" ? [{ url: r.modelValue }] : r.modelValue) || []);
    s("update:modelValue", j);
    const m = h({}), N = h(ke(r)), d = h(!1), M = h(0), z = Ie(
      () => j.value.map((A) => {
        var k;
        if ([".png", ".jpg", ".gif", ".jpeg"].indexOf(((k = A.raw) == null ? void 0 : k.suffix) || A.suffix) >= 0)
          return A.url;
      }).filter((A) => A)
    );
    Oe(async () => {
      var A, k, V;
      (!o.upload || !o.upload.action && !((A = o.upload.minio) != null && A.getObjectAuthUrl)) && console.warn("缺少文件上传配置,无法使用upload组件~"), m.value = await Se(r, {
        drag: !0,
        listType: r.desc.upType === "file" ? "text" : "picture-card",
        multiple: !!r.desc.multiple,
        limit: r.desc.multiple ? r.desc.limit || 20 : 1,
        autoUpload: r.desc.autoUpload ?? !0,
        accept: r.desc.accept || zi[`${r.desc.upType || "image"}Types`].join(","),
        maxSize: r.desc.maxSize || (r.desc.upType === "file" ? (k = o.upload) == null ? void 0 : k.maxFSize : (V = o.upload) == null ? void 0 : V.maxISize),
        beforeUpload: U,
        onRemove: I,
        onSuccess: O,
        onExceed: q,
        onPreview: B,
        httpRequest: oe,
        ...we()
      });
    });
    function I(A) {
      L(A, 0);
    }
    async function O(A, k) {
      var Ue, qe;
      const { objectUrl: V, previewUrl: ge } = await ((qe = (Ue = o.upload) == null ? void 0 : Ue.minio) == null ? void 0 : qe.getObjectAuthUrl(k.raw.uploadId));
      k.raw.shareUrl = V, k.raw.previewUrl = ge, k.url = C(k.raw), L(k, 1);
    }
    function C(A) {
      if (A) {
        const k = (A == null ? void 0 : A.suffix) || "";
        if (k) {
          if ([".png", ".jpg", ".gif", ".jpeg"].indexOf(k) >= 0)
            return A.shareUrl || A.furl || A.path;
          for (let V = 0; V < wl.length; V++)
            for (let ge = 0; ge < wl[V].suffixes.length; ge++)
              if (wl[V].suffixes[ge] === k)
                return D[wl[V].type];
        }
      }
      return D.file;
    }
    function L(A, k) {
      var V, ge;
      if (k === 1)
        j.value.push({
          name: A.name,
          furl: ((V = A.raw) == null ? void 0 : V.path) || A.url,
          url: C(A.raw),
          fsize: A.size,
          uid: A.uid,
          mimeType: (ge = A.raw) == null ? void 0 : ge.type,
          suffix: A.raw.suffix,
          busId: r.desc.busId,
          busType: r.desc.busType
        });
      else {
        const Ue = j.value.findIndex((qe) => qe.uid === A.uid);
        Ue >= 0 && j.value.splice(Ue, 1);
      }
      s("validateThis");
    }
    async function U(A) {
      var ge, Ue;
      A.suffix = A.name.substring(A.name.lastIndexOf("."));
      const k = ce(A, zi[`${r.desc.upType || "image"}Suffixes`], m.value.maxSize);
      if (k !== !0)
        return Wn.warning(k), !1;
      const V = await ((Ue = (ge = o.upload) == null ? void 0 : ge.minio) == null ? void 0 : Ue.getUploadUrl(A.name));
      A.action = V.uploadUrl, A.path = V.objectUrl, A.previewUrl = V.previewUrl, A.uploadId = V.uploadId;
    }
    function B(A) {
      var k, V;
      [".png", ".jpg", ".gif", ".jpeg"].indexOf(((k = A.raw) == null ? void 0 : k.suffix) || A.suffix) >= 0 ? (M.value = z.value.findIndex((ge) => {
        var Ue, qe;
        return ge === (((Ue = A.raw) == null ? void 0 : Ue.shareUrl) || ((qe = A.raw) == null ? void 0 : qe.path) || A.furl);
      }), M.value < 0 && (M.value = 0), d.value = !0) : window.open(((V = A.raw) == null ? void 0 : V.previewUrl) || A.previewUrl, "_blank");
    }
    function q() {
      Wn.error("数量最多只能上传" + m.value.limit + "个图片/文件!!!");
    }
    async function oe(A) {
      var k, V;
      await ((V = (k = o.upload) == null ? void 0 : k.minio) == null ? void 0 : V.doElUpload(A));
    }
    function ee() {
    }
    function ce(A, k, V) {
      return A.size > V ? "上传文件大小不能超过 " + (V / 1024 / 1024).toFixed(2) + "M~" : k && k.length > 0 && k.every((ge) => ge !== A.suffix) ? "上传文件类型错误，请重新选择~" : !0;
    }
    return He(
      () => r.modelValue,
      (A, k) => {
        JSON.stringify(A) !== JSON.stringify(k) && (j.value = (A == null ? void 0 : A.map((V) => (V.url = C(V), V))) || []);
      },
      { immediate: !0 }
    ), (A, k) => {
      var mt;
      const V = F("el-icon"), ge = F("el-upload"), Ue = F("el-image-viewer"), qe = F("el-button");
      return _(), P("div", {
        class: bn(["ele-form-upload-image", { "ele-form-upload-file": A.desc.upType === "file" }])
      }, [
        se(ge, le({ class: "ele-image-upload" }, m.value, Te(N.value), {
          fileList: j.value || [],
          class: { "over-limit": ((mt = j.value) == null ? void 0 : mt.length) >= m.value.limit, "upload-disabled": m.value.disabled }
        }), {
          default: Q(() => [
            Ye("div", gy, [
              A.desc.icon ? (_(), P("i", {
                key: 0,
                class: bn(A.desc.icon),
                style: Dt({ fontSize: A.desc.fontSize || "14px", color: A.desc.color || "#C0C4CC" })
              }, null, 6)) : (_(), R(V, {
                key: 1,
                style: Dt({ fontSize: A.desc.fontSize || "14px", color: A.desc.color || "#C0C4CC" })
              }, {
                default: Q(() => [
                  se(yt(Oz))
                ]),
                _: 1
              }, 8, ["style"])),
              A.desc.upType === "file" && A.desc.text2 ? (_(), P("div", dy, xe(A.desc.text2), 1)) : ae("", !0),
              A.desc.upType === "file" ? (_(), P("div", Ny, xe(A.desc.text || "拖拽/点击上传"), 1)) : ae("", !0)
            ])
          ]),
          _: 1
        }, 16, ["fileList", "class"]),
        d.value ? (_(), R(Ue, {
          key: 0,
          onClose: k[0] || (k[0] = (Lt) => d.value = !1),
          teleported: "",
          initialIndex: M.value,
          "url-list": z.value
        }, null, 8, ["initialIndex", "url-list"])) : ae("", !0),
        m.value.autoUpload ? ae("", !0) : (_(), P("div", py, [
          se(qe, {
            style: { "margin-left": "10px" },
            size: "small",
            type: "success",
            onClick: ee
          }, {
            default: Q(() => [
              be(" 上传到服务器 ")
            ]),
            _: 1
          })
        ]))
      ], 2);
    };
  }
});
const zy = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: da }, Symbol.toStringTag, { value: "Module" })), il = [
  vi,
  wi,
  _n,
  Ai,
  Ti,
  Li,
  xi,
  Ei,
  Ci,
  bi,
  Oi,
  Si,
  Bi,
  ki,
  Ui,
  Qi,
  Pi,
  Vi,
  Fi,
  Ri,
  Wi,
  Gi,
  Zi,
  Hi,
  Ki,
  qi,
  $i,
  Ji,
  Xi,
  ea,
  ta,
  na,
  la,
  da
], yy = [{ required: !0, trigger: "blur", validator: Py }], Dy = [{ required: !0, trigger: "blur", validator: Vy }], _y = [{ type: "number", message: "请填入数字！" }], my = [{ required: !0, trigger: "blur", validator: Qy }], hy = [{ trigger: "blur", validator: Gy }], Yy = [{ required: !0, trigger: "blur", validator: Zy }], Iy = [{ required: !0, trigger: "blur", validator: Su }], vy = [{ trigger: "blur", validator: Su }], wy = [{ required: !0, trigger: "blur", validator: Ky }], Ay = [{ trigger: "blur", validator: ja }], Ty = [{ required: !0, trigger: "blur", validator: ja }], Ly = [
  { required: !0, message: "不能为空！", trigger: "blur" },
  { type: "number", message: "请填入数字！" }
], xy = [{ required: !0, trigger: "blur", validator: Uy }], Ey = [{ required: !0, trigger: "blur", validator: pa }], Cy = [{ trigger: "blur", validator: pa }], by = [{ required: !0, trigger: "change", validator: Na }], Oy = [{ required: !0, trigger: "change", validator: Na }], Sy = [{ required: !0, trigger: "change", validator: Fy }], By = [{ required: !0, trigger: "change", validator: Ry }], ky = [{ required: !0, trigger: "change", validator: Wy }];
function Uy(f, s, r) {
  /^[1-9]\d*$/.test(s * 1 + "") ? r() : r(new Error("请输入正整数！"));
}
function Qy(f, s, r) {
  s.length !== 4 ? r(new Error("验证码必须是4位！")) : r();
}
function Py(f, s, r) {
  typeof s > "u" || s === "" || s === null ? r(new Error("此项必填！")) : r();
}
function Vy(f, s, r) {
  typeof s > "u" || s === "" || s === null ? r(new Error("此项必填！")) : (typeof s == "number" && (s = s + ""), typeof s == "string" && s.match(/^[ ]*$/) ? r(new Error("不能全是空格!")) : r());
}
function Na(f, s, r) {
  s === null || typeof s > "u" || s === "" || s.length <= 0 ? r(new Error("请选择！")) : r();
}
function Fy(f, s, r) {
  s === null || typeof s > "u" || s === "" || s.length <= 0 ? r(new Error("请上传！")) : r();
}
function Ry(f, s, r) {
  typeof s > "u" || s === null || s === "" || s === null ? r(new Error("此项必填！")) : s.replace(/\n/g, "") ? typeof s == "string" && s.replace(/\n/g, "").match(/^[ ]*$/) ? r(new Error("不能全是空格!")) : r() : r(new Error("不能全是换行！"));
}
function Wy(f, s, r) {
  typeof s > "u" || s === null || s === "" || s === null ? r(new Error("此项必填！")) : s.replace(/\n/g, "") ? typeof s == "string" && s.replace(/\n/g, "").match(/^[ ]*$/) ? r(new Error("不能全是空格!")) : r() : r(new Error("不能全是换行！"));
}
function pa(f, s, r) {
  /^\d+(\.(\d{1}|\d{2}))?$/.test(s * 1 + "") ? r() : r(new Error("小数格式错误(最多两位)!"));
}
function Gy(f, s, r) {
  s ? /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(s) ? r() : r(new Error("邮箱格式错误!")) : r(new Error("邮箱必填"));
}
function Zy(f, s, r) {
  s ? /^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(s) ? r() : r(new Error("手机号格式错误!")) : r(new Error("手机号必填"));
}
function Su(f, s, r) {
  !s || !/^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?=.*[~!@#$%^&*])(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,32}$/.test(s) ? r(new Error("密码为8-32位字母大小写+特殊字符+数字!")) : r();
}
function Hy(f, s, r) {
  s && !/^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?=.*[~!@#$%^&*])(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,32}$/.test(s) ? r(new Error("密码为8-32位字母大小写+特殊字符+数字!")) : r();
}
function Ky(f, s, r) {
  typeof s > "u" || s === "" || s === null ? r(new Error("此项必填！")) : s && !/^([a-z,A-z,0-9]){4,20}$/.test(s) ? r(new Error("账号为4-20位字母或数字!")) : r();
}
function ja(f, s, r) {
  s && !/^([a-z,A-z,0-9]){16,20}$/.test(s) ? r(new Error("请输入16-20位字母或数字!")) : r();
}
const yi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, account: wy, cascader: Oy, double: Ey, double2: Cy, editor: ky, email: hy, notAllBlank: Dy, notNull: yy, number: _y, numberNotNull: Ly, password: Iy, password2: vy, phone: Yy, select: by, textarea: By, upload: Sy, vCode: my, validatePassword: Su, validatePassword2: Hy, wordnum: Ay, wordnum2: Ty, zhengZhengShu: xy }, Symbol.toStringTag, { value: "Module" })), Di = /* @__PURE__ */ Object.assign({ "./ElPlusFormArea.vue": aj, "./ElPlusFormAutocomplete.vue": fj, "./ElPlusFormBtn.vue": dj, "./ElPlusFormBtns.vue": jj, "./ElPlusFormCascader.vue": Dj, "./ElPlusFormCascaderPanel.vue": hj, "./ElPlusFormCheckbox.vue": vj, "./ElPlusFormCheckboxButton.vue": Tj, "./ElPlusFormColor.vue": Ej, "./ElPlusFormDate.vue": Oj, "./ElPlusFormDaterange.vue": kj, "./ElPlusFormDatetime.vue": Pj, "./ElPlusFormFile.vue": uz, "./ElPlusFormImage.vue": Mz, "./ElPlusFormInput.vue": gz, "./ElPlusFormLink.vue": hz, "./ElPlusFormLkuser.vue": a2, "./ElPlusFormNbinput.vue": M2, "./ElPlusFormNumber.vue": d2, "./ElPlusFormPassword.vue": p2, "./ElPlusFormQuickInput.vue": y2, "./ElPlusFormRadio.vue": m2, "./ElPlusFormRate.vue": I2, "./ElPlusFormSelect.vue": T2, "./ElPlusFormSlider.vue": E2, "./ElPlusFormStatus.vue": S2, "./ElPlusFormSwitch.vue": U2, "./ElPlusFormTag.vue": P2, "./ElPlusFormText.vue": W2, "./ElPlusFormTextarea.vue": Z2, "./ElPlusFormTransfer.vue": q2, "./ElPlusFormTree.vue": X2, "./ElPlusFormTreeSelect.vue": ty, "./ElPlusFormUpload.vue": zy }), za = [];
for (const f in Di) {
  const s = Di[f].default;
  s.typeName && za.push(s.typeName);
}
const qy = ["innerHTML"], $y = {
  key: 0,
  style: { display: "flex", "justify-content": "center" }
}, Jy = {
  name: "ElPlusForm",
  inheritAttrs: !1,
  customOptions: {}
}, Bu = /* @__PURE__ */ fe({
  ...Jy,
  props: {
    formDesc: { default: null },
    modelValue: { default: () => ({}) },
    formAttrs: { default: () => ({}) },
    rules: { default: null },
    isLoading: { type: Boolean, default: !1 },
    requestFn: { type: [Function, null], default: null },
    updateFn: { type: [Function, null], default: null },
    showBtns: { type: Boolean, default: !0 },
    showSubmit: { type: Boolean, default: !0 },
    submitBtnText: { default: "提交" },
    showCancel: { type: Boolean, default: !1 },
    cancelBtnText: { default: "取消" },
    showReset: { type: Boolean, default: !0 },
    resetBtnText: { default: "重置" },
    showLabel: { type: Boolean, default: !0 },
    labelWidth: { default: "" },
    disabled: { type: Boolean, default: !1 },
    readonly: { type: Boolean, default: !1 },
    isDialog: { type: Boolean, default: !1 },
    optionsFn: { type: [Function, null], default: null },
    size: { default: "small" },
    column: { default: 1 },
    isTable: { type: Boolean, default: !1 },
    idKey: { default: "id" },
    maxWidth: {}
  },
  emits: ["request", "reset", "cancel"],
  setup(f, { expose: s, emit: r }) {
    var at;
    const o = f, D = Ge("defaultConf"), j = Ge("format"), m = h(), N = h(!1), d = we(), M = h([]), z = h(!1);
    let I = null;
    const O = Ie(() => o.size || D.size), C = [...za, ...((at = D.form) == null ? void 0 : at.comList) || []], L = Ie(() => ({ display: "flex", flexDirection: o.isTable ? "row" : "column" })), U = Ie(() => ({
      scrollToError: !0,
      ...o.formAttrs,
      labelWidth: o.labelWidth === "auto" ? o.isDialog ? "100px" : "120px" : parseInt(o.labelWidth + "") + "px",
      // validateOnRuleChange: false,
      disabled: o.disabled || z.value,
      rules: B,
      labelPosition: Zj() ? "top" : "right",
      style: {
        width: o.maxWidth || o.isTable ? "100%" : o.isDialog ? "80%" : "1000px",
        paddingRight: o.isTable ? "0" : "20px"
      }
    })), B = Ie(() => {
      const v = o.rules || [];
      return o.formDesc && Object.keys(o.formDesc).map((x) => {
        if (v[x] || (v[x] = []), o.formDesc) {
          if (o.formDesc[x].rules)
            typeof o.formDesc[x].rules == "string" ? v[x].push(...yi[o.formDesc[x].rules]) : Hj(o.formDesc[x].rules).map(($) => {
              v[x].push($);
            });
          else if (o.formDesc[x].required || o.formDesc[x].require) {
            let $ = "notAllBlank";
            switch (o.formDesc[x].type) {
              case "upload":
              case "select":
              case "password":
              case "textarea":
              case "editor":
                $ = o.formDesc[x].type || "";
                break;
              case "cascader":
              case "tselect":
              case "linkuser":
              case "radio":
                $ = "select";
                break;
            }
            v[x].push(...yi[$]);
          }
        }
      }), v;
    }), q = Ie(() => {
      const v = [];
      if (o.formDesc) {
        let x = [];
        for (const Be in o.formDesc)
          x.push({ ...o.formDesc[Be], field: Be });
        let $ = [], de = 0;
        x.map((Be) => {
          if (Be._vif && ($.push(Be), de++, Be.colspan && (de += Be.colspan - 1), de >= o.column)) {
            v.push($), $ = [], de = 0;
            return;
          }
        }), $.length > 0 && v.push($);
      }
      return v;
    }), oe = _t.throttle(() => {
      o.formDesc && Object.keys(o.formDesc).forEach((v) => {
        if (o.formDesc) {
          const x = o.formDesc[v];
          if (x && x.type) {
            x._type = C.includes(x.type.toLowerCase()) ? "el-plus-form-" + x.type : x.type, x._vif = ce(x, "vif", v, !x.isBlank), x._disabled = ce(x, "disabled", v, o.disabled ?? !1);
            const $ = {};
            x._attrs = Object.assign({}, ce(x, "attrs", v), $), x._label = ce(x, "label", v), x._tip = ce(x, "tip", v), !x._tip && !x.noTip && x.type === "upload" && (x._tip = `最多上传${x.multiple ? x.limit || 20 : 1}${x.upType === "file" ? "个文件" : "张图片"}`), x.default !== void 0 && x.default !== null && o.modelValue[v] === void 0 && (o.modelValue[v] = x.default), x.defaultItem !== void 0 && x.defaultItem !== null && o.modelValue[v] === void 0 && (o.modelValue[v] = x.defaultItem.value), x.format && (typeof x.format == "string" ? o.modelValue[v] = j[x.format](o.modelValue[v], o.modelValue) : typeof x.format == "function" && (o.modelValue[v] = x.format(o.modelValue[v], o.modelValue)));
          } else
            x && x.isBlank && (x._vif = ce(x, "vif", "", !0));
        }
      });
    }, 500), ee = Ie(() => {
      let v = [];
      return o.showBtns && (o.showCancel && v.push({
        field: "_reset_btn",
        desc: {
          label: o.cancelBtnText || "取消",
          size: O.value,
          disabled: z.value,
          on: { click: () => r("cancel") }
        }
      }), o.showReset && v.push({
        field: "_reset_btn",
        desc: {
          label: o.resetBtnText || "重置",
          confirm: `确定要${o.resetBtnText || "重置"}?`,
          size: O.value,
          disabled: z.value,
          on: { click: mt }
        }
      }), o.showSubmit && v.push({
        field: "_reset_btn",
        desc: {
          label: o.submitBtnText || "提交",
          size: O.value,
          type: "primary",
          loading: o.isLoading || z.value,
          on: { click: qe }
        }
      })), v;
    }), ce = (v, x, $, de = null) => typeof v[x] == "function" ? (N.value = !0, v[x](o.modelValue, o.modelValue[$])) : typeof v[x] == "boolean" ? v[x] ?? !1 : typeof v[x] == "string" ? v[x] ?? "" : v[x] ?? de, A = () => new Promise((v, x) => {
      B.value ? m.value.validate(($, de) => {
        $ ? v() : x(de);
      }) : v();
    }), k = (v) => {
      v && M.value.filter((x) => x.field === v.field).length <= 0 && M.value.push(v);
    }, V = (v, x, $) => {
      const de = {};
      if (!v)
        return { [x]: $ };
      if (!v._vif || $ === void 0 || $ === null)
        return de;
      if (v.type === "category")
        if ($ === null && ($ = []), v.checkStrictly === !0)
          de.categoryId = $[2] ?? $[1] ?? $[0] ?? "";
        else
          for (let Be = 0; Be < 3; Be++)
            de["categoryId" + (Be + 1)] = $[Be] ?? "";
      else if (v.type === "area") {
        $ === null && ($ = [null, null, null, null]);
        const [Be, Re, W, X] = $;
        v.checkStrictly ? de[x] = X || W || Re || Be || null : (de.provinceId = Be || -1, de.cityId = Re || -1, de.zoneId = W || -1, de.streetId = X || -1);
      } else if (v.type === "daterange")
        $ && $.length === 2 && (de.startTime = $[0], typeof $[1] == "string" ? de.endTime = new Date($[1]).getTime() : de.endTime = $[1], de.endTime = de.endTime + (24 * 60 * 60 - 1) * 1e3, de.startTime = j.time(de.startTime, 3), de.endTime = j.time(de.endTime, 3));
      else if (v.type === "linkuser") {
        const [Be, Re, W, X] = $;
        de.userIds = Be, de.deptIds = Re, de.userNames = W, de.deptNames = X;
      } else {
        switch (v.type) {
          case "checkbox":
            Array.isArray($) && ($ = $.join(","));
            break;
        }
        de[x] = $;
      }
      return de;
    }, ge = () => {
      const v = {};
      return o.formDesc && Object.keys(o.modelValue).map((x) => {
        ["provinceId", "cityId", "zoneId", "streetId"].indexOf(x) >= 0 || o.formDesc && Object.assign(v, V(o.formDesc[x], x, o.modelValue[x]));
      }), v;
    }, Ue = () => {
      M.value.map((v) => {
        v.CID && v.changeValidImg();
      });
    }, qe = async () => {
      let v = ge();
      try {
        if (d.beforeValidate && await d.beforeValidate(v) === !1)
          return;
        await A();
        for (const x in v) {
          if (x.indexOf("_") === 0) {
            delete v[x];
            continue;
          }
          if (o.formDesc) {
            const $ = o.formDesc[x];
            $ && $.valueFormat && (v[x] = $.valueFormat(v[x], v)), (v[x] === !0 || v[x] === !1) && (v[x] = +v[x]);
          }
        }
        if (d.beforeRequest) {
          const x = await d.beforeRequest(v);
          if (x === !1)
            return;
          typeof x == "object" && (v = x);
        }
        if (o.requestFn) {
          if (z.value)
            return;
          z.value = !0;
          try {
            let x = {};
            o.updateFn && v && v[o.idKey] ? x = await o.updateFn(v) : x = await o.requestFn(v), Xt(() => {
              d.success && typeof d.success == "function" && d.success({ response: x, formData: o.modelValue, callback: () => z.value = !1 });
            });
          } catch (x) {
            if (d.requestError && typeof d.requestError == "function")
              d.requestError(x);
            else {
              if (x instanceof Error)
                try {
                  JSON.parse(x.message) instanceof Object;
                } catch {
                }
              else
                x instanceof Object;
              d.requestError && typeof d.requestError == "function" && d.requestError();
            }
            z.value = !1;
          } finally {
            o.isDialog || (z.value = !1), d.requestEnd && typeof d.requestEnd == "function" && d.requestEnd();
          }
        } else {
          if (o.isLoading)
            return;
          r("request", v);
        }
      } catch (x) {
        console.log("error: ", x);
      }
    }, mt = () => {
      Object.keys(o.modelValue).map((v) => {
        o.modelValue[v] = I ? I[v] : (o.formDesc && o.formDesc[v] && o.formDesc[v].default) ?? null;
      }), setTimeout(() => {
        Lt();
      }, 100), r("reset");
    }, Lt = () => {
      var v;
      (v = m.value) == null || v.resetFields();
    }, en = () => {
      o.modelValue && Object.keys(o.modelValue).map((v) => {
        o.modelValue[v] = (o.formDesc && o.formDesc[v] && o.formDesc[v].default) ?? null;
      }), Xt(() => {
        Lt();
      });
    };
    function tn(v) {
      m.value.validateField(v, (x) => {
      });
    }
    return He(
      () => o.formDesc,
      (v) => {
        v && oe();
      }
    ), He(
      () => o.modelValue,
      (v) => {
        (!I || N.value && v && JSON.stringify(v) !== JSON.stringify(I)) && JSON.stringify(v) !== JSON.stringify(I) && (I = _t.cloneDeep(v), oe());
      },
      { deep: !0 }
    ), cn(async () => {
      N.value || oe(), Lt();
    }), s({ submit: qe, getData: ge, validate: A, reset: mt, clearValid: Lt, clear: en, changeValidImg: Ue }), (v, x) => {
      const $ = F("el-form-item"), de = F("el-col"), Be = F("el-row"), Re = F("el-form");
      return _(), P("div", {
        style: Dt(L.value)
      }, [
        Xe(v.$slots, "top", {
          formData: o.modelValue
        }),
        Ye("div", {
          style: Dt({ display: "flex", justifyContent: v.isDialog ? "center" : "" })
        }, [
          se(Re, le({
            class: "el-plus-form-panel",
            ref_key: "refElPlusForm",
            ref: m,
            model: o.modelValue,
            onSubmit: ej(qe, ["prevent"])
          }, U.value), {
            default: Q(() => [
              (_(!0), P(me, null, ve(q.value, (W, X) => (_(), R(Be, {
                gutter: 10,
                key: X,
                style: Dt({ marginRight: v.isTable ? "20px" : 0 })
              }, {
                default: Q(() => [
                  (_(!0), P(me, null, ve(W, (Z, pe) => (_(), R(de, {
                    key: X + "-" + pe + "-" + Z.field,
                    xs: 24,
                    sm: 24,
                    md: Z.colspan && Z.colspan >= v.column ? 24 : v.column >= 2 ? 12 : 24,
                    lg: Z.colspan && Z.colspan >= v.column ? 24 : Math.floor(24 / v.column * (Z.colspan || 1)),
                    xl: Z.colspan && Z.colspan >= v.column ? 24 : Math.floor(24 / v.column * (Z.colspan || 1))
                  }, {
                    default: Q(() => {
                      var Ee;
                      return [
                        Z._vif ? (_(), P("div", {
                          key: 0,
                          class: "el-plus-form-column-panel",
                          style: Dt({ "justify-content": v.isTable ? "flex-end" : "flex-start" })
                        }, [
                          se($, {
                            style: Dt([{ "min-height": "40px" }, { width: ((Ee = Z._attrs) == null ? void 0 : Ee.width) || Z.width || (v.isTable ? "150px" : "100%") }]),
                            label: v.showLabel && Z.showLabel !== !1 ? Z._label : null,
                            "label-width": Z.labelWidth || v.labelWidth || (v.isDialog ? "100px" : "120px"),
                            prop: Z.field
                          }, {
                            default: Q(() => [
                              (_(), R(Ii(Z._type), le({
                                style: { "min-width": "80px", width: "100%" },
                                formData: o.modelValue,
                                disabled: Z._disabled ?? v.disabled ?? !1,
                                readonly: v.readonly ?? !1
                              }, Z._attrs, {
                                desc: Z,
                                ref_for: !0,
                                ref: k,
                                field: Z.field,
                                modelValue: o.modelValue[Z.field || ""],
                                "onUpdate:modelValue": (gt) => o.modelValue[Z.field || ""] = gt,
                                isTable: v.isTable,
                                onValidateThis: () => tn(Z.field || "")
                              }), null, 16, ["formData", "disabled", "readonly", "desc", "field", "modelValue", "onUpdate:modelValue", "isTable", "onValidateThis"])),
                              Z._tip ? (_(), P("div", {
                                key: 0,
                                class: "el-plus-form-tip",
                                innerHTML: Z._tip
                              }, null, 8, qy)) : ae("", !0)
                            ]),
                            _: 2
                          }, 1032, ["label", "label-width", "prop", "style"])
                        ], 4)) : ae("", !0)
                      ];
                    }),
                    _: 2
                  }, 1032, ["md", "lg", "xl"]))), 128))
                ]),
                _: 2
              }, 1032, ["style"]))), 128)),
              Xe(v.$slots, "row")
            ]),
            _: 3
          }, 16, ["model", "onSubmit"])
        ], 4),
        Xe(v.$slots, "default"),
        se(Re, null, {
          default: Q(() => [
            Xe(v.$slots, "form-btn", {
              data: o.modelValue
            }, () => [
              ee.value && ee.value.length > 0 ? (_(), P("div", $y, [
                (_(!0), P(me, null, ve(ee.value, (W, X) => (_(), R(_n, tj(le({ key: X }, W)), null, 16))), 128))
              ])) : ae("", !0)
            ]),
            Xe(v.$slots, "bottom", {
              formData: o.modelValue
            })
          ]),
          _: 3
        }),
        Xe(v.$slots, "form-footer", {
          formData: o.modelValue
        })
      ], 4);
    };
  }
});
const Xy = {
  name: "ElPlusFormDialog",
  inheritAttrs: !1,
  customOptions: {}
}, eD = /* @__PURE__ */ fe({
  ...Xy,
  props: {
    modelValue: { default: () => ({}) },
    show: { type: Boolean, default: !1 },
    title: { default: "" },
    tableRef: {},
    success: {},
    successTip: { default: "操作成功!" }
  },
  emits: ["update:show", "update:modelValue"],
  setup(f, { expose: s, emit: r }) {
    const o = f, D = Ie({
      get: () => o.modelValue,
      set(ee) {
        r("update:modelValue", ee);
      }
    }), j = Ie({
      get() {
        return o.show && Xt(() => {
          setTimeout(() => {
            var ee;
            (ee = m.value) == null || ee.clearValid();
          }, 10);
        }), o.show;
      },
      set(ee) {
        ee ? q() : oe();
      }
    }), m = h(null), { width: N, top: d, modal: M, appendToBody: z, showClose: I, draggable: O, closeOnClickModal: C, ...L } = Object.assign({ width: "700px", draggable: !0, top: "15vh", closeOnClickModal: !1, showCancel: !0 }, we()), U = { width: N, top: d, modal: M, appendToBody: z, showClose: I, draggable: O, closeOnClickModal: C };
    function B(ee) {
      o.success ? o.success(ee) : o.tableRef && (Wn.success(o.successTip), o.tableRef.reload(), oe(), setTimeout(() => {
        ee.callback();
      }, 200));
    }
    function q() {
      r("update:show", !0);
    }
    function oe() {
      var ee;
      r("update:show", !1), (ee = m.value) == null || ee.clear();
    }
    return s({ open: q, close: oe }), (ee, ce) => {
      const A = F("el-dialog");
      return _(), R(A, le({
        class: "el-plus-form-dialog",
        modelValue: j.value,
        "onUpdate:modelValue": ce[1] || (ce[1] = (k) => j.value = k),
        title: o.title
      }, U, { "destroy-on-close": "" }), {
        header: Q(() => [
          Xe(ee.$slots, "header")
        ]),
        default: Q(() => [
          se(Bu, le({
            ref_key: "refElPlusDialogForm",
            ref: m,
            style: { padding: "20px" },
            isDialog: !0,
            modelValue: D.value,
            "onUpdate:modelValue": ce[0] || (ce[0] = (k) => D.value = k)
          }, L, {
            success: B,
            onCancel: oe
          }), {
            top: Q(() => [
              Xe(ee.$slots, "top")
            ]),
            default: Q(() => [
              Xe(ee.$slots, "default")
            ]),
            _: 3
          }, 16, ["modelValue"])
        ]),
        _: 3
      }, 16, ["modelValue", "title"]);
    };
  }
}), tD = { class: "el-plus-form-group" }, nD = {
  key: 0,
  class: "title-line"
}, lD = {
  name: "ElPlusFormGroup",
  inheritAttrs: !1,
  customOptions: {}
}, rD = /* @__PURE__ */ fe({
  ...lD,
  props: {
    modelValue: {},
    formGroup: {},
    isLoading: { type: Boolean }
  },
  emits: ["update:show", "update:modelValue", "before-validate", "before-request", "request-success", "request-error", "request-end", "request"],
  setup(f, { emit: s }) {
    const r = f, o = h([]), D = [], j = Ie({
      get: () => r.modelValue,
      set(M) {
        s("update:modelValue", M);
      }
    }), m = Ie(() => {
      const M = [], z = _t.cloneDeep(r.formGroup), I = r.formGroup.column || 1;
      return delete z.group, delete z.column, z.beforeValidate = async (O) => await Promise.all(o.value.map((C) => C.validate())), r.formGroup.group.map((O, C) => {
        M.push({
          title: O.title,
          formProps: Object.assign({ column: O.column || I }, C === r.formGroup.group.length - 1 ? z : { showBtns: !1 }, O || {})
        });
      }), M;
    });
    function N(M, z) {
      M && D.indexOf(z) < 0 && (D.push(z), o.value.push(M));
    }
    const d = () => {
      o.value.map((M, z, I) => {
        z === I.length - 1 || M.clearValid();
      });
    };
    return (M, z) => (_(), P("div", tD, [
      (_(!0), P(me, null, ve(m.value, (I, O) => (_(), P(me, { key: O }, [
        I.title ? (_(), P("div", nD, xe(I.title), 1)) : ae("", !0),
        se(Bu, le({
          modelValue: j.value,
          "onUpdate:modelValue": z[0] || (z[0] = (C) => j.value = C)
        }, I.formProps, {
          ref_for: !0,
          ref: (C) => N(C, "form" + O),
          onReset: d
        }), {
          default: Q(() => [
            mn()["default" + O] ? Xe(M.$slots, "default" + O, { key: 0 }) : ae("", !0)
          ]),
          _: 2
        }, 1040, ["modelValue"])
      ], 64))), 128))
    ]));
  }
});
const uD = { class: "el-plus-table-edit-column" }, oD = { class: "select-panel" }, sD = { class: "dialog-footer" }, iD = /* @__PURE__ */ fe({
  __name: "settingColumn",
  props: {
    column: {},
    tbName: {},
    size: {},
    showText: { type: Boolean }
  },
  setup(f, { expose: s }) {
    const r = f, o = Ge("defaultConf"), D = h(!1), j = h([]), m = h([]), N = h(!1), d = h(!1);
    function M() {
      D.value = !0;
    }
    function z() {
      if (j.value.length <= 0)
        return Wn.warning("请至少选择一列！"), !1;
      const U = [];
      r.column.map((B) => {
        j.value.indexOf(B.label) < 0 ? (U.push(B.label), B.scShow = !1) : B.scShow = !0;
      }), U.length > 0 ? localStorage.setItem(o.storagePrefix + "hideColumnsList_" + r.tbName, U.join("__")) : localStorage.removeItem(o.storagePrefix + "hideColumnsList_" + r.tbName), D.value = !1, m.value = j.value;
    }
    function I() {
      j.value = [], d.value ? j.value = r.column.map((U) => U.label) : j.value = r.column.filter((U) => U.required || U.noHide).map((U) => U.label), N.value = !1;
    }
    function O() {
      j.value.length === 0 ? (N.value = !1, d.value = !1) : r.column.length === j.value.length ? (N.value = !1, d.value = !0) : (N.value = !0, d.value = !1);
    }
    function C(U) {
      const B = localStorage.getItem(o.storagePrefix + "hideColumnsList_" + r.tbName);
      let q = [];
      B != null && B.length > 0 && (q = B.split("__")), r.column.map((oe) => {
        oe.vif !== void 0 && oe.vif !== null ? typeof oe.vif == "function" ? oe._vif = oe.vif(oe) : oe._vif = !!oe.vif : oe._vif = !0, oe._vif && (oe.required || oe.noHide || q.indexOf(oe.label) < 0) && j.value.push(oe.label);
      }), O(), U && z();
    }
    function L() {
      D.value = !1, j.value = m.value;
    }
    return cn(() => {
      r.tbName && C(!0);
    }), s({ initCol: C }), (U, B) => {
      const q = F("el-button"), oe = F("el-checkbox"), ee = F("el-checkbox-group"), ce = F("el-dialog");
      return _(), P("div", uD, [
        U.showText ? (_(), R(q, {
          key: 0,
          type: "primary",
          onClick: M,
          size: U.size,
          plain: ""
        }, {
          default: Q(() => [
            be("编辑显示列")
          ]),
          _: 1
        }, 8, ["size"])) : (_(), R(q, {
          key: 1,
          type: "primary",
          icon: "ele-Setting",
          onClick: M,
          size: U.size,
          title: "编辑显示列",
          plain: "",
          circle: ""
        }, null, 8, ["size"])),
        se(ce, {
          title: "编辑显示列",
          modelValue: D.value,
          "onUpdate:modelValue": B[2] || (B[2] = (A) => D.value = A),
          width: "40%"
        }, {
          default: Q(() => [
            Ye("div", oD, [
              se(oe, {
                modelValue: d.value,
                "onUpdate:modelValue": B[0] || (B[0] = (A) => d.value = A),
                indeterminate: N.value,
                onChange: I
              }, {
                default: Q(() => [
                  be(" 全选 ")
                ]),
                _: 1
              }, 8, ["modelValue", "indeterminate"])
            ]),
            se(ee, {
              modelValue: j.value,
              "onUpdate:modelValue": B[1] || (B[1] = (A) => j.value = A),
              onChange: O,
              style: { padding: "0 10px", "flex-wrap": "wrap", display: "flex" }
            }, {
              default: Q(() => [
                (_(!0), P(me, null, ve(r.column, (A) => (_(), P(me, {
                  key: A.label
                }, [
                  A._vif ? (_(), R(oe, {
                    key: 0,
                    label: A.label,
                    disabled: A.required || A.noHide || !1
                  }, {
                    default: Q(() => [
                      be(xe(A.label), 1)
                    ]),
                    _: 2
                  }, 1032, ["label", "disabled"])) : ae("", !0)
                ], 64))), 128))
              ]),
              _: 1
            }, 8, ["modelValue"])
          ]),
          footer: Q(() => [
            Ye("div", sD, [
              se(q, {
                size: U.size,
                onClick: L
              }, {
                default: Q(() => [
                  be(" 取 消 ")
                ]),
                _: 1
              }, 8, ["size"]),
              se(q, {
                size: U.size,
                type: "primary",
                onClick: z
              }, {
                default: Q(() => [
                  be(" 确 定 ")
                ]),
                _: 1
              }, 8, ["size"])
            ])
          ]),
          _: 1
        }, 8, ["modelValue"])
      ]);
    };
  }
});
const _i = /* @__PURE__ */ Ke(iD, [["__scopeId", "data-v-0f8e3d4b"]]);
function aD() {
  return !!navigator.userAgent.match(/('phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone')/i);
}
function cD(f) {
  switch (f.type) {
    case void 0:
      f.type = "primary";
      break;
    case "add":
      f.type = "primary", f.title = f.title || "新增", f.icon = "ele-Plus";
      break;
    case "edit":
      f.type = "primary", f.title = f.title || "编辑", f.icon = "ele-EditPen";
      break;
    case "delete":
    case "del":
      f.type = "danger", f.title = f.title || "删除", f.icon = "ele-Delete";
      break;
  }
  return f;
}
function Ou(f, s) {
  const r = [];
  return f && f.length > 0 && _t.cloneDeep(f).map((o) => {
    if (o.nodes) {
      const D = Ou(o.nodes, s)[0].children;
      o.nodes = D || o.nodes;
    }
    switch (o.type || (o.type = "text"), o.type) {
      case "image":
        o.width = o.width || "110px", o.align = o.align || "left", o.headerAlign = o.headerAlign || "left";
        break;
      case "btns":
        if (!o.minWidth && o.btns && o.btns.length >= 2) {
          let D = 0;
          o.btns.map((j) => D += typeof j.label == "string" ? j.label.length : 4), o.width = o.width || D * 20 + "px";
        }
        o.align = o.align || "left", o.headerAlign = o.headerAlign || "left", o.text = !0;
        break;
    }
    if (o.minWidth = o.minWidth || (o.label !== "操作" ? s : "auto"), o.showOverflowTooltip = o.label !== "操作", o.parent) {
      let D = !1;
      r.forEach((j) => {
        j.label === o.parent && (j.children.push(o), D = !0);
      }), D || r.push({ label: o.parent, children: [o] });
    } else
      r.push(o);
  }), r;
}
const MD = (f, s) => {
  let r = "";
  for (const o in f)
    s && Array.isArray(s) && s.length > 0 && s.indexOf(o) >= 0 || f[o] !== void 0 && f[o] !== null && f[o] !== "" && (r !== "" && (r += "&"), r += o + "=" + f[o]);
  return r;
}, fD = { class: "el-plus-table-header-info" }, gD = {
  key: 0,
  class: "el-plus-table-form-items"
}, dD = { class: "table-header-form-btns" }, ND = { class: "el-plus-table-header-btn" }, pD = {
  key: 1,
  class: "el-plus-table-header-form"
}, jD = {
  class: "table-header-form-btns",
  style: { "margin-bottom": "16px" }
}, zD = /* @__PURE__ */ fe({
  __name: "header",
  props: {
    modelValue: {},
    column: {},
    tbName: { default: "" },
    toolbar: { default: null },
    isDialog: { type: Boolean, default: !1 },
    loading: { type: Boolean, default: !1 },
    isShowRefresh: { type: Boolean, default: !0 },
    size: { default: "default" }
  },
  emits: ["query"],
  setup(f, { expose: s, emit: r }) {
    const o = f, D = Ge("defaultConf"), j = h(), m = h(), N = Ie(() => {
      const L = [];
      return o.toolbar && o.toolbar.btns && o.toolbar.btns.map((U) => {
        L.push({ ...cD(U), size: U.size || o.size });
      }), L;
    }), d = Ie(() => {
      var U;
      const L = (U = o.toolbar) == null ? void 0 : U.formConfig;
      return L != null && L.formDesc && Object.values(L == null ? void 0 : L.formDesc).map((B) => {
        if (B.width)
          return;
        let q = 300;
        switch (B.type) {
          case "daterange":
          case "input":
          case "area":
            q = 300;
            break;
        }
        B.width = q + "px";
      }), L;
    });
    function M() {
      r("query");
    }
    async function z({ callBack: L }) {
      var U, B, q, oe, ee;
      if ((U = o.toolbar) != null && U.export) {
        const ce = new XMLHttpRequest();
        let A = o.toolbar.export.url || "";
        if (o.toolbar.export.fetch ? A = await o.toolbar.export.fetch(Object.assign({}, (B = j.value) == null ? void 0 : B.getData(), ((q = o.toolbar.export) == null ? void 0 : q.data) || {})) : o.toolbar.export.noQuery || (A += (A.indexOf("?") >= 0 ? "&" : "?") + MD(Object.assign({}, (oe = j.value) == null ? void 0 : oe.getData(), ((ee = o.toolbar.export) == null ? void 0 : ee.data) || {}))), ce.open("get", A, !0), ce.responseType = "blob", o.toolbar.export.isAuth !== !1 && D.token) {
          let k = D.token;
          typeof D.token == "function" && (k = D.token()), ce.setRequestHeader("Authorization", "Bearer " + k);
        }
        ce.onload = function() {
          var k, V;
          if (this.status == 200) {
            const ge = document.createElement("a");
            ge.href = window.URL.createObjectURL(this.response), ge.download = (((V = (k = o.toolbar) == null ? void 0 : k.export) == null ? void 0 : V.name) || (/* @__PURE__ */ new Date()).getTime()) + ".xls", ge.click(), window.URL.revokeObjectURL(A), setTimeout(() => {
              L && L();
            }, 1e3);
          }
        }, ce.onerror = function() {
          setTimeout(() => {
            L && L();
          }, 1e3);
        }, ce.send();
      }
    }
    function I() {
      j.value.submit();
    }
    function O() {
      j.value.clear(), Xt(() => {
        j.value.submit();
      });
    }
    function C() {
      var L, U;
      o.tbName ? (L = m.value) == null || L.initCol() : (U = o.column) == null || U.map((B) => {
        B.vif !== void 0 && B.vif !== null ? typeof B.vif == "function" ? B._vif = B.vif(B) : B._vif = !!B.vif : B._vif = !0;
      });
    }
    return cn(() => {
    }), s({ getData: () => {
      var L;
      return (L = j.value) == null ? void 0 : L.getData();
    }, initCol: C }), (L, U) => {
      const B = F("ElPlusForm"), q = F("el-form");
      return _(), P("div", fD, [
        o.toolbar && Object.keys(o.toolbar || {}).length ? (_(), R(q, {
          key: 0,
          inline: !0,
          class: "el-plus-table-header-form",
          style: Dt({ justifyContent: !o.toolbar.formConfig && o.toolbar.btnRight ? "flex-end" : "space-between" })
        }, {
          default: Q(() => [
            o.toolbar.formConfig ? (_(), P("div", gD, [
              se(B, le({
                ref_key: "elPlusFormRef",
                ref: j
              }, d.value, {
                modelValue: o.modelValue,
                "onUpdate:modelValue": U[0] || (U[0] = (oe) => o.modelValue = oe),
                labelWidth: "1",
                requestFn: M,
                showBtns: !1,
                isTable: !0
              }), {
                row: Q(() => [
                  Ye("div", dD, [
                    se(_n, {
                      type: "primary",
                      icon: "ele-Search",
                      loading: L.loading,
                      desc: { label: "查询", on: { click: I }, size: L.size }
                    }, null, 8, ["loading", "desc"]),
                    se(_n, {
                      desc: { label: "重置", on: { click: O }, size: L.size }
                    }, null, 8, ["desc"]),
                    o.toolbar.export ? (_(), R(_n, {
                      key: 0,
                      type: "primary",
                      desc: { label: "导出Excel", size: L.size, mask: !0, on: { click: z } }
                    }, null, 8, ["desc"])) : ae("", !0),
                    L.tbName ? (_(), R(_i, {
                      key: 1,
                      ref_key: "settingColumnRef",
                      ref: m,
                      tbName: L.tbName,
                      column: L.column || [],
                      size: L.size
                    }, null, 8, ["tbName", "column", "size"])) : ae("", !0),
                    (_(!0), P(me, null, ve(N.value, (oe, ee) => (_(), R(_n, {
                      key: ee,
                      desc: oe,
                      loading: L.loading
                    }, null, 8, ["desc", "loading"]))), 128))
                  ])
                ]),
                _: 1
              }, 16, ["modelValue"])
            ])) : (_(), P("div", {
              key: 1,
              class: "el-plus-table-header-btns",
              style: Dt({ "min-width": yt(aD)() ? "100%" : N.value && N.value.length > 0 ? N.value.length * 110 + "px" : "10px" })
            }, [
              Ye("div", ND, [
                (_(!0), P(me, null, ve(N.value, (oe, ee) => (_(), R(_n, {
                  key: ee,
                  desc: oe,
                  loading: L.loading
                }, null, 8, ["desc", "loading"]))), 128))
              ])
            ], 4))
          ]),
          _: 1
        }, 8, ["style"])) : L.tbName ? (_(), P("div", pD, [
          Ye("div", jD, [
            L.tbName ? (_(), R(_i, {
              key: 0,
              ref_key: "settingColumnRef",
              ref: m,
              tbName: L.tbName,
              column: L.column || [],
              size: L.size,
              showText: !0
            }, null, 8, ["tbName", "column", "size"])) : ae("", !0)
          ])
        ])) : ae("", !0)
      ]);
    };
  }
});
const yD = /* @__PURE__ */ Ke(zD, [["__scopeId", "data-v-14a90d82"]]), DD = { style: { width: "100%", display: "flex" } }, _D = /* @__PURE__ */ fe({
  __name: "columnItem",
  props: {
    modelValue: {},
    field: {},
    desc: {},
    scope: {},
    size: {}
  },
  setup(f) {
    var N;
    const s = f, r = h(((N = s.scope) == null ? void 0 : N.$index) || 0), o = Ie(() => {
      const d = [];
      return s.desc.nodes ? s.desc.nodes.map((M, z) => {
        d.push(j(M.field || s.field, M, z));
      }) : (s.field ? s.field.split(",") : []).map((z, I) => {
        d.push(j(z, s.desc, I));
      }), d.length <= 0 && d.push(j("", s.desc, 0)), d;
    }), D = Ie(() => {
      var d;
      return typeof s.desc.content == "function" ? s.desc.content(s.modelValue, (d = s.scope) == null ? void 0 : d.row, s.field) : s.desc.content || "";
    }), j = (d, M, z) => {
      var O, C, L;
      const I = {
        field: d,
        desc: {
          prop: d,
          default: "",
          size: M.size || s.size || "small"
        }
      };
      return Object.assign(I.desc, M), M.type === "btn" && (I.desc.btnType = M.btnType || "primary", I.desc.btnLabel = M.btnLabel || M.label, I.desc.plain = M.plain || !0, I.desc.text = !0), M.type ? (M.type === "text" && (I.desc.default = M.default || "-"), M.type, typeof M.type == "string" ? I.desc.type = M.type : I.desc.type = M.type[z] || M.type[0], M.format && (typeof M.format == "string" || typeof M.format == "function" ? I.desc.format = M.format : I.desc.format = M.format[z] === null ? null : M.format[z] || M.format[0]), M.title && (typeof M.title == "string" ? I.desc.title = M.title : I.desc.title = M.title[z] || M.title[0])) : I.desc.type = "text", M.elType && (I.desc.elType = M.elType), M.linkType && (I.desc.linkType = M.linkType), M.linkId && (I.desc.linkId = M.linkId), M.color && (I.desc.style = M.style || {}, typeof M.color == "function" ? I.desc.style.color = M.color((O = s.scope) == null ? void 0 : O.row[s.field || ""], (C = s.scope) == null ? void 0 : C.row, s.field) : typeof M.color == "string" ? I.desc.style.color = M.color : I.desc.style.color = M.color[z] === null ? null : M.color[z] || M.color[0]), M.on && (Object.prototype.toString.call(M.on) === "[object Array]" ? I.desc.on = M.on[z] === null ? null : M.on[z] || M.on[0] : I.desc.on = M.on), M.disabled && (I.disabled = !0), typeof M.options == "function" && (I.desc.options = M.options(s.scope)), I.vshow = m(M), M.attrs && (typeof M.attrs == "function" ? I.desc.attrs = M.attrs((L = s.scope) == null ? void 0 : L.row) : I.desc.attrs = M.attrs), I.desc._label = M.label, I;
    }, m = (d) => {
      var M;
      return d.vshow !== void 0 && d.vshow !== null && d.vshow !== "" ? typeof d.vshow == "boolean" ? d.vshow : typeof d.vshow == "function" ? d.vshow((M = s.scope) == null ? void 0 : M.row) : !!d.vshow : !0;
    };
    return cn(() => {
    }), (d, M) => {
      const z = F("el-icon"), I = F("el-popover");
      return _(), P("div", {
        class: bn(["el-plus-table-column-item", [d.desc.inline ? "el-plus-table-column-row" : "el-plus-table-column-column"]])
      }, [
        (_(!0), P(me, null, ve(o.value, (O, C) => {
          var L;
          return _(), P(me, {
            key: C + (O.options && O.options.length > 0 ? O.options[0].value || O.options[0].v : "0")
          }, [
            d.desc.content && D.value ? (_(), R(I, {
              key: 0,
              placement: "left",
              width: 200,
              trigger: "hover",
              effect: "dark",
              content: D.value
            }, {
              reference: Q(() => [
                se(z, { style: { color: "#f56c6c", "font-size": "26px", padding: "0px 8px 0 0" } }, {
                  default: Q(() => [
                    se(yt($z))
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["content"])) : ae("", !0),
            Ye("div", DD, [
              O.vshow === void 0 || O.vshow ? (_(), R(Ii("el-plus-form-" + O.desc.type), le({ key: 0 }, O, {
                isTable: !0,
                formData: (L = s.scope) == null ? void 0 : L.row,
                size: O.size || d.size,
                rowIndex: r.value,
                modelValue: s.scope.row[O.field],
                "onUpdate:modelValue": (U) => s.scope.row[O.field] = U
              }), null, 16, ["formData", "size", "rowIndex", "modelValue", "onUpdate:modelValue"])) : ae("", !0)
            ])
          ], 64);
        }), 128))
      ], 2);
    };
  }
});
const mi = /* @__PURE__ */ Ke(_D, [["__scopeId", "data-v-7b9b91ba"]]), mD = { class: "el-plus-table-content" }, hD = {
  key: 1,
  class: "table-tabs-panel"
}, YD = { class: "el-plus-table-main" }, ID = { key: 1 }, vD = {
  key: 2,
  class: "bottom-page-static-info"
}, wD = {
  name: "ElPlusTable",
  inheritAttrs: !1,
  customOptions: {}
}, AD = /* @__PURE__ */ fe({
  ...wD,
  props: {
    tableConfig: {},
    modelValue: { default: null },
    type: { default: "index" },
    isIndex: { type: Boolean, default: !0 },
    isPager: { type: Boolean, default: !0 },
    pageSize: { default: 10 },
    isDialog: { type: Boolean, default: !1 },
    nullText: { default: "暂无数据" },
    isEmptyImg: { type: Boolean, default: !0 },
    isShowRefresh: { type: Boolean, default: !0 },
    rowKey: { default: "id" },
    isDIYMain: { type: Boolean, default: !1 },
    selectList: { default: () => [] },
    colMinWidth: { default: "auto" }
  },
  emits: ["getUrlConsumerIds", "selection", "select", "selectAll", "update:modelValue", "tabChange", "expandChange"],
  setup(f, { expose: s, emit: r }) {
    var Zt, Mn, On, Nt, nn;
    const o = f, D = Ge("defaultConf"), j = Ge("format"), m = h(), N = h(((Mn = (Zt = o.tableConfig) == null ? void 0 : Zt.tabConf) == null ? void 0 : Mn.tabs[0].value) ?? ""), d = h({}), M = Ie(() => (w) => w.key ? d.value[w.key] || 0 : ""), z = h(), I = h(!1), O = h(!!((On = o.tableConfig.tabConf) != null && On.fetch)), C = h(!1), L = D.size || "small", U = h({});
    let B = rt({});
    const q = rt(o.modelValue || []), oe = rt([]), ee = rt(Ou(o.tableConfig.column, o.isDialog ? "auto" : o.colMinWidth)), ce = h(0), A = rt(_t.cloneDeep(o.selectList) || []), k = rt([]), V = rt({
      current: !o.isDialog && B.current ? parseInt(B.current) : 1,
      total: 0,
      size: !o.isDialog && B.size ? parseInt(B.size) : o.pageSize
    }), ge = ((nn = (Nt = o.tableConfig) == null ? void 0 : Nt.explan) == null ? void 0 : nn.treeProps) || { children: "children", hasChildren: "hasChildren" }, Ue = Ie(() => mt(Ou(o.tableConfig.column, o.isDialog ? "auto" : o.colMinWidth))), qe = Ie(() => {
      var H, te, et, ut, Ve, ct, Bt;
      const w = [];
      if ((H = o.tableConfig.summaryConf) != null && H.vif) {
        if (typeof ((te = o.tableConfig.summaryConf) == null ? void 0 : te.vif) == "boolean") {
          if (!((et = o.tableConfig.summaryConf) != null && et.vif))
            return w;
        } else if (!((ut = o.tableConfig.summaryConf) != null && ut.vif()))
          return w;
      }
      if ((Ve = o.tableConfig.summaryConf) != null && Ve.prop) {
        const hn = o.tableConfig.summaryConf.prop.split(","), Ht = ((Bt = (ct = o.tableConfig.summaryConf) == null ? void 0 : ct.label) == null ? void 0 : Bt.split(",")) || [];
        hn.map((Zn, ln) => {
          var tt, pt;
          let ze = "";
          (tt = o.tableConfig.summaryConf) != null && tt.sumFn ? ze = (pt = o.tableConfig.summaryConf) == null ? void 0 : pt.sumFn(q, A) : ze = j.yuan(q.reduce((Qe, rn) => Qe += rn[Zn], 0)), w.push({ label: Ht[ln], value: ze });
        });
      }
      return w;
    });
    function mt(w) {
      return w.map((H) => H.children ? mt(H.children) : o.tableConfig.tbName ? H._vif && H.scShow : (H.vif !== void 0 && H.vif !== null ? typeof H.vif == "function" ? H._vif = H.vif(H) : H._vif = !!H.vif : H._vif = !0, H._vif));
    }
    function Lt(w) {
      dt(!0), r("tabChange", w);
    }
    function en(w, H, te) {
      var ut, Ve;
      const et = Re();
      et[((Ve = (ut = o.tableConfig) == null ? void 0 : ut.explan) == null ? void 0 : Ve.idName) || "parentId"] = w.id, o.tableConfig.fetch && o.tableConfig.fetch(et).then((ct) => {
        te(ct == null ? void 0 : ct.records);
      });
    }
    function tn(w) {
      return oe.length > w.rowIndex ? oe[w.rowIndex * 1] : "";
    }
    function at(w, H) {
      $(H, !w.some((te) => te[o.rowKey] === H[o.rowKey])), r("select", w, H), r("selection", _t.cloneDeep(A));
    }
    function v(w) {
      const H = !(w && w.length > 0);
      (H ? q : w).map((te) => {
        $(te, H);
      }), r("selectAll", w, H), r("selection", _t.cloneDeep(A));
    }
    function x(w, H) {
      r("expandChange", w, H);
    }
    function $(w, H = !1) {
      const te = A.findIndex((et) => et[o.rowKey] === w[o.rowKey]);
      H ? te >= 0 && A.splice(te, 1) : te < 0 && A.push(w);
    }
    function de(w, H = !1) {
      w && w.length && w.map((te) => {
        $(
          A.find((et) => et[o.rowKey] === te[o.rowKey]),
          !H
        );
      }), gt();
    }
    function Be() {
      A.splice(0, A.length, ...o.selectList);
    }
    async function Re() {
      var H, te, et;
      let w = {
        // 封装查询条件
        // ...route.query,
        // ...tableHeaderRef.value.getData(),
        ...U.value,
        ...typeof o.tableConfig.queryMap == "function" ? await o.tableConfig.queryMap() : o.tableConfig.queryMap,
        t_: (/* @__PURE__ */ new Date()).getTime()
      };
      return o.isPager && (w.current = V.current, w.size = V.size), o.tableConfig.tabConf && o.tableConfig.tabConf.prop && (w[o.tableConfig.tabConf.prop] = N.value), w = W(w), o.isDialog, (et = (te = (H = o.tableConfig) == null ? void 0 : H.toolbar) == null ? void 0 : te.export) != null && et.isAuth, w;
    }
    function W(w) {
      if (!w)
        return {};
      const H = {};
      return Object.keys(w).map((te) => {
        w[te] !== void 0 && w[te] !== null && w[te] !== "" && (H[te] = w[te]);
      }), H;
    }
    function X(w) {
      V.current = 1, V.size = w, Ee(!0);
    }
    function Z(w) {
      V.current !== w && (V.current = w, Ee(!1));
    }
    function pe(w, H) {
      let te = [];
      w && w.length > 0 && w.map((et, ut) => {
        k.push([...H, ut]), te = et[ge.children], te && te.length > 0 && pe(te, [ut]);
      });
    }
    async function Ee(w) {
      var et, ut, Ve, ct, Bt, hn;
      if (!o.tableConfig.fetch)
        return ce.value = 2, !1;
      if (ce.value === 1 || I.value)
        return !1;
      ce.value = 1, I.value = !0, q.splice(0, q.length), w && (V.current = 1);
      let H = await Re();
      (Ve = (ut = (et = o.tableConfig) == null ? void 0 : et.toolbar) == null ? void 0 : ut.formConfig) != null && Ve.beforeRequest && (H = ((hn = (Bt = (ct = o.tableConfig) == null ? void 0 : ct.toolbar) == null ? void 0 : Bt.formConfig) == null ? void 0 : hn.beforeRequest(JSON.parse(JSON.stringify(H)))) || H);
      const te = await o.tableConfig.fetch(H);
      try {
        o.isPager ? (V.total = (te == null ? void 0 : te.total) * 1 || 0, V.current = (te == null ? void 0 : te.current) || 1, q.push(...(te == null ? void 0 : te.records) || null)) : q.push(...(te == null ? void 0 : te.records) || te || null), o.type === "expand" && (k.splice(0, k.length), pe(q, [])), C.value = !1, Xt(() => {
          gt();
        });
      } catch (Ht) {
        console.log("error: ", Ht);
      }
      ce.value = 2, I.value = !1;
    }
    function gt() {
      q && q.length > 0 && o.type === "selection" && q.map((w) => {
        m.value.toggleRowSelection(
          w,
          A.some((H) => H[o.rowKey] === w[o.rowKey])
        );
      });
    }
    async function dt(w = !1) {
      return await Ee(!0), !w && o.tableConfig.tabConf && o.tableConfig.tabConf.fetch && (d.value = await o.tableConfig.tabConf.fetch(Object.assign({}, await Re(), o.tableConfig.tabConf.queryMap)), O.value = !1), q;
    }
    function Gt() {
      U.value = _t.cloneDeep(z.value.getData()), dt();
    }
    function Gn() {
      var w;
      (w = z.value) == null || w.initCol();
    }
    return He(
      () => o.modelValue,
      (w) => {
        o.tableConfig.fetch || JSON.parse(JSON.stringify(w)) !== JSON.parse(JSON.stringify(q)) && (ce.value = 2, q.splice(0, q.length, ...w || []));
      },
      { deep: !0 }
    ), He(
      () => o.selectList,
      (w) => {
        A.splice(0, A.length, ...w), gt();
      },
      { deep: !0 }
    ), cn(() => {
      dt();
    }), s({ reload: dt, tableData: q, changeSelect: de, resetSelect: Be, initCol: Gn }), (w, H) => {
      var Zn, ln;
      const te = F("el-icon"), et = F("el-radio-button"), ut = F("el-radio-group"), Ve = F("el-table-column"), ct = F("el-empty"), Bt = F("el-table"), hn = F("el-pagination"), Ht = nj("loading");
      return _(), P("div", mD, [
        Object.keys(((Zn = w.tableConfig) == null ? void 0 : Zn.toolbar) || {}).length || w.tableConfig.tbName ? (_(), R(yD, {
          key: 0,
          ref_key: "tableHeaderRef",
          ref: z,
          modelValue: yt(B),
          "onUpdate:modelValue": H[0] || (H[0] = (ze) => lj(B) ? B.value = ze : B = ze),
          tbName: w.tableConfig.tbName,
          column: w.tableConfig.column,
          size: yt(L),
          isShowRefresh: w.isShowRefresh,
          loading: I.value,
          toolbar: w.tableConfig.toolbar,
          isDialog: w.isDialog,
          onQuery: Gt
        }, null, 8, ["modelValue", "tbName", "column", "size", "isShowRefresh", "loading", "toolbar", "isDialog"])) : ae("", !0),
        w.tableConfig.tabConf ? (_(), P("div", hD, [
          se(ut, {
            modelValue: N.value,
            "onUpdate:modelValue": H[1] || (H[1] = (ze) => N.value = ze),
            size: "default",
            onChange: Lt
          }, {
            default: Q(() => {
              var ze;
              return [
                (_(!0), P(me, null, ve((ze = w.tableConfig.tabConf) == null ? void 0 : ze.tabs, (tt, pt) => (_(), R(et, {
                  key: pt,
                  label: tt.value,
                  loading: !0
                }, {
                  default: Q(() => [
                    be(xe(tt.label) + " ", 1),
                    O.value ? (_(), R(te, {
                      key: 0,
                      class: "is-loading"
                    }, {
                      default: Q(() => [
                        se(yt(Tz))
                      ]),
                      _: 1
                    })) : (_(), P(me, { key: 1 }, [
                      be(xe(M.value(tt)), 1)
                    ], 64))
                  ]),
                  _: 2
                }, 1032, ["label"]))), 128))
              ];
            }),
            _: 1
          }, 8, ["modelValue"])
        ])) : ae("", !0),
        rj((_(), P("div", YD, [
          w.isDIYMain ? Xe(w.$slots, "main", {
            key: 0,
            tableData: q
          }) : (_(), R(Bt, le({
            key: 1,
            ref_key: "elPlusTableRef",
            ref: m,
            style: { width: "100%" },
            height: "100%",
            maxHeight: w.tableConfig.maxHeight || "auto"
          }, w.tableConfig.tableAttr, {
            data: q,
            "row-key": w.rowKey,
            lazy: "",
            load: en,
            size: yt(L),
            "row-class-name": tn,
            onSelect: at,
            onSelectAll: v,
            onExpandChange: x,
            treeProps: yt(ge)
          }), an({
            default: Q(() => [
              w.type === "selection" ? (_(), R(Ve, {
                key: 0,
                type: "selection",
                width: "55px",
                selectable: (ze, tt) => {
                  var pt, Qe;
                  return ((Qe = (pt = w.tableConfig) == null ? void 0 : pt.tableAttr) == null ? void 0 : Qe.selectable(ze, tt)) ?? !0;
                },
                "header-align": "center",
                align: "center"
              }, null, 8, ["selectable"])) : ae("", !0),
              w.isIndex ? (_(), R(Ve, {
                key: 1,
                type: "index",
                width: "60",
                label: "序号"
              })) : ae("", !0),
              mn().firstColumn ? Xe(w.$slots, "firstColumn", { key: 2 }) : ae("", !0),
              (_(!0), P(me, null, ve(ee, (ze, tt) => {
                var pt;
                return _(), P(me, {
                  key: ze.prop + ze.label + tt
                }, [
                  ze.children && ze.children.length > 0 ? (_(), P(me, { key: 0 }, [
                    (pt = Ue.value[tt]) != null && pt.some((Qe) => Qe) ? (_(), R(Ve, {
                      key: 0,
                      prop: ze.label,
                      label: ze.label,
                      "header-align": "center"
                    }, {
                      default: Q(() => [
                        (_(!0), P(me, null, ve(ze.children, (Qe, rn) => (_(), P(me, {
                          key: Qe.label + tt + rn
                        }, [
                          Ue.value[tt][rn] ? (_(), R(Ve, le({
                            key: 0,
                            prop: Qe.prop
                          }, Qe), {
                            header: Q(() => [
                              Ye("div", {
                                class: bn({ "th-required": Qe.required })
                              }, xe(Qe.label), 3)
                            ]),
                            default: Q((Yn) => [
                              Xe(w.$slots, "default"),
                              Yn.$index >= 0 ? (_(), R(mi, {
                                key: 0,
                                field: Qe.prop,
                                desc: Qe,
                                scope: Yn,
                                size: yt(L),
                                modelValue: Yn.row[Qe.prop],
                                "onUpdate:modelValue": (al) => Yn.row[Qe.prop] = al
                              }, null, 8, ["field", "desc", "scope", "size", "modelValue", "onUpdate:modelValue"])) : ae("", !0)
                            ]),
                            _: 2
                          }, 1040, ["prop"])) : ae("", !0)
                        ], 64))), 128))
                      ]),
                      _: 2
                    }, 1032, ["prop", "label"])) : ae("", !0)
                  ], 64)) : (_(), P(me, { key: 1 }, [
                    Ue.value[tt] ? (_(), R(Ve, le({
                      key: 0,
                      prop: ze.prop
                    }, ze), {
                      header: Q(({ column: Qe }) => [
                        Ye("div", {
                          class: bn({ "th-required": ze.required }),
                          style: Dt(ze.hstyle)
                        }, xe(Qe.label), 7)
                      ]),
                      default: Q((Qe) => [
                        Qe.$index >= 0 ? (_(), R(mi, {
                          key: 0,
                          field: ze.prop,
                          desc: ze,
                          scope: Qe,
                          size: yt(L),
                          modelValue: Qe.row[ze.prop],
                          "onUpdate:modelValue": (rn) => Qe.row[ze.prop] = rn
                        }, null, 8, ["field", "desc", "scope", "size", "modelValue", "onUpdate:modelValue"])) : ae("", !0)
                      ]),
                      _: 2
                    }, 1040, ["prop"])) : ae("", !0)
                  ], 64))
                ], 64);
              }), 128))
            ]),
            _: 2
          }, [
            !I.value && ce.value === 2 ? {
              name: "empty",
              fn: Q(() => [
                w.isEmptyImg ? (_(), R(ct, {
                  key: 0,
                  description: w.nullText
                }, null, 8, ["description"])) : (_(), P("span", ID, xe(w.nullText), 1))
              ]),
              key: "0"
            } : void 0,
            (ln = w.tableConfig.summaryConf) != null && ln.prop ? {
              name: "append",
              fn: Q(() => {
                var ze;
                return [
                  qe.value && qe.value.length > 0 ? (_(), P("div", {
                    key: 0,
                    style: Dt((ze = w.tableConfig.summaryConf) == null ? void 0 : ze.hstyle),
                    class: "summary-row"
                  }, [
                    (_(!0), P(me, null, ve(qe.value, (tt, pt) => (_(), P("div", {
                      class: "summary-item",
                      key: pt
                    }, [
                      Ye("span", null, xe(tt.label || "合计") + ":", 1),
                      Ye("p", null, xe(tt.value || 0), 1)
                    ]))), 128))
                  ], 4)) : ae("", !0)
                ];
              }),
              key: "1"
            } : void 0
          ]), 1040, ["maxHeight", "data", "row-key", "size", "treeProps"]))
        ])), [
          [Ht, I.value]
        ]),
        w.isPager || w.tableConfig.statistic ? (_(), P("div", vD, [
          se(hn, {
            class: "page-info",
            small: "",
            onSizeChange: X,
            onCurrentChange: Z,
            "current-page": +V.current,
            "page-sizes": [5, 10, 20, 50, 100],
            "page-size": V.size,
            layout: "total, sizes, prev, pager, next, jumper",
            total: V.total
          }, null, 8, ["current-page", "page-size", "total"])
        ])) : ae("", !0),
        Xe(w.$slots, "bottom")
      ]);
    };
  }
});
const vl = {
  debug: !1,
  size: "default",
  storagePrefix: "el-plus-crud_",
  form: {
    leng: {
      input: 20,
      textare: 500,
      nbinput: {
        min: 0,
        max: 999999999,
        precision: 0,
        controlsPosition: "right"
      }
    },
    comList: []
  },
  upload: {
    type: "minio",
    action: "",
    maxISize: 1024 * 1024 * 20,
    maxFSize: 1024 * 1024 * 20,
    minio: {
      action: "",
      getUploadUrl: () => new Promise(() => {
      }),
      doElUpload: () => new Promise(() => {
      }),
      getObjectAuthUrl: () => new Promise(() => {
      })
    }
  }
}, xD = {
  install: (f, s, r, o) => {
    ya(vl, s), vl.debug && console.log("initConfig: ", vl), f.provide("format", r), f.provide("globalData", o), f.provide("defaultConf", vl), il.unshift(Bu), il.unshift(eD), il.unshift(rD), il.push(AD), vl.debug && console.log("components: ", il), il.map((D) => {
      f.component(D.name, D);
    });
  }
};
function ya(f, s) {
  let r;
  for (r in s)
    f[r] = f[r] && f[r].toString() === "[object Object]" ? ya(f[r], s[r]) : f[r] = s[r];
  return f;
}
export {
  xD as default
};
