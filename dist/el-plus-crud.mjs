import { defineComponent as oe, inject as Pe, ref as I, onBeforeMount as Te, useAttrs as ze, onMounted as _n, resolveComponent as V, openBlock as m, createBlock as Z, mergeProps as ee, toHandlers as ye, createCommentVNode as ce, useSlots as Yn, createSlots as qt, withCtx as G, renderSlot as Je, renderList as ve, computed as Ye, watch as Ve, createVNode as de, createTextVNode as Ke, toDisplayString as Oe, createElementBlock as Q, normalizeStyle as _t, Fragment as Ae, createElementVNode as Ue, reactive as ot, normalizeClass as el, unref as Qt, pushScopeId as Zp, popScopeId as Hp, nextTick as Ut, withModifiers as Kp, resolveDynamicComponent as zs, normalizeProps as qp, isRef as ys, resolveDirective as Jp, withDirectives as $p } from "vue";
import { ElMessageBox as Xp, ElMessage as Sn } from "element-plus";
const Le = async (N, s) => {
  var i, z, y, _;
  const r = Object.assign({}, s, (i = N.desc) == null ? void 0 : i._attrs, (z = N.desc) == null ? void 0 : z.attrs, ej(N.desc));
  return N.desc.multiple && (r.multiple = !0, r.showCheckbox = !0, ["select"].indexOf(N.desc.type) >= 0 && (r.collapseTags = ((y = N.desc.attrs) == null ? void 0 : y.collapseTags) ?? !1, r.collapseTagsTooltip = ((_ = N.desc.attrs) == null ? void 0 : _.collapseTagsTooltip) ?? !1)), N.desc.elType && (typeof N.desc.elType == "function" ? r.type = N.desc.elType(N.formData) : r.type = N.desc.elType), r;
}, xe = (N) => {
  var r;
  const s = {};
  return (r = N.desc) != null && r.on && Object.keys(N.desc.on).map((i) => {
    s[i] = (z) => {
      N.desc.on[i](N.formData, N.rowIndex, z);
    };
  }), s;
};
function ej(N) {
  if (!N || !N.type)
    return "";
  switch (N.type) {
    case "input":
    case "nbinput":
    case "password":
    case "number":
    case "validCode":
    case "tag":
      return { placeholder: (N == null ? void 0 : N.placeholder) || "请输入" + (N == null ? void 0 : N._label) };
    case "switch":
      return {};
    case "area":
    case "select":
    case "category":
    case "cascader":
      return { placeholder: (N == null ? void 0 : N.placeholder) || "请选择" + (N.remote ? N.initLoad !== !1 ? "（默认查10个，其余请输入搜索）" : "或输入进行搜索" : N == null ? void 0 : N._label) };
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
const tj = {
  name: "ElPlusFormArea",
  inheritAttrs: !1,
  typeName: "area",
  customOptions: {}
}, nj = /* @__PURE__ */ oe({
  ...tj,
  props: {
    modelValue: {},
    field: {},
    desc: {},
    formData: {}
  },
  emits: ["update:modelValue"],
  setup(N, { emit: s }) {
    const r = N, i = Pe("globalData"), z = I([]), y = I({}), _ = I(!1), d = I(xe(r)), g = I(r.modelValue);
    return s("update:modelValue", g), Te(async () => {
      y.value = await Le(r, { props: { value: "id", label: "name", children: "childs", checkStrictly: !!r.desc.checkStrictly }, clearable: !0, filterable: !0, ...ze() }), _.value = !0;
    }), _n(async () => {
      z.value = i.areaList || [];
    }), (c, D) => {
      const A = V("el-cascader");
      return _.value ? (m(), Z(A, ee({
        key: 0,
        class: "ElPlusFormArea-panel"
      }, y.value, ye(d.value), {
        modelValue: g.value,
        "onUpdate:modelValue": D[0] || (D[0] = (h) => g.value = h),
        options: z.value
      }), null, 16, ["modelValue", "options"])) : ce("", !0);
    };
  }
});
const Fe = (N, s) => {
  const r = N.__vccOpts || N;
  for (const [i, z] of s)
    r[i] = z;
  return r;
}, Ds = /* @__PURE__ */ Fe(nj, [["__scopeId", "data-v-2f7bbae6"]]), lj = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: Ds }, Symbol.toStringTag, { value: "Module" })), rj = {
  name: "ElPlusFormAutocomplete",
  inheritAttrs: !1,
  typeName: "autocomplete",
  customOptions: {}
}, uj = /* @__PURE__ */ oe({
  ...rj,
  props: {
    modelValue: {},
    field: {},
    desc: {},
    formData: {}
  },
  emits: ["update:modelValue"],
  setup(N, { emit: s }) {
    const r = N, i = I(r.modelValue);
    s("update:modelValue", i);
    const z = I(Object.assign({}, Yn(), r.desc.slots)), y = I({}), _ = I(xe(r));
    return Te(async () => {
      y.value = await Le(r, { autocomplete: "new-password", ...ze() });
    }), (d, g) => {
      const c = V("el-autocomplete");
      return m(), Z(c, ee({ class: "ElPlusFormAutocomplete-panel" }, y.value, ye(_.value), {
        modelValue: i.value,
        "onUpdate:modelValue": g[0] || (g[0] = (D) => i.value = D)
      }), qt({
        default: G((D) => [
          Je(d.$slots, "default", { data: D }, void 0, !0)
        ]),
        _: 2
      }, [
        ve(z.value, (D, A, h) => ({
          name: A,
          fn: G((C) => [
            Je(d.$slots, A, { data: C }, void 0, !0)
          ])
        }))
      ]), 1040, ["modelValue"]);
    };
  }
});
const _s = /* @__PURE__ */ Fe(uj, [["__scopeId", "data-v-9a2a6259"]]), ij = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: _s }, Symbol.toStringTag, { value: "Module" }));
var Dl = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, fr = { exports: {} };
/**
* @license
* Lodash <https://lodash.com/>
* Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
* Released under MIT license <https://lodash.com/license>
* Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
* Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
*/
fr.exports;
(function(N, s) {
  (function() {
    var r, i = "4.17.21", z = 200, y = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", _ = "Expected a function", d = "Invalid `variable` option passed into `_.template`", g = "__lodash_hash_undefined__", c = 500, D = "__lodash_placeholder__", A = 1, h = 2, C = 4, S = 1, U = 2, W = 1, F = 2, Ee = 4, X = 8, ie = 16, b = 32, B = 64, k = 128, pe = 256, Se = 512, qe = 30, Yt = "...", sn = 800, an = 16, w = 1, T = 2, K = 3, te = 1 / 0, De = 9007199254740991, Pt = 17976931348623157e292, nt = 0 / 0, Re = 4294967295, me = Re - 1, tl = Re >>> 1, mn = [
      ["ary", k],
      ["bind", W],
      ["bindKey", F],
      ["curry", X],
      ["curryRight", ie],
      ["flip", Se],
      ["partial", b],
      ["partialRight", B],
      ["rearg", pe]
    ], Tt = "[object Arguments]", Mn = "[object Array]", Bn = "[object AsyncFunction]", In = "[object Boolean]", cn = "[object Date]", ml = "[object DOMException]", An = "[object Error]", wn = "[object Function]", nl = "[object GeneratorFunction]", L = "[object Map]", re = "[object Number]", ne = "[object Null]", we = "[object Object]", st = "[object Promise]", dt = "[object Proxy]", lt = "[object RegExp]", $e = "[object Set]", Lt = "[object String]", Gt = "[object Symbol]", kn = "[object Undefined]", je = "[object WeakMap]", rt = "[object WeakSet]", We = "[object ArrayBuffer]", pt = "[object DataView]", ll = "[object Float32Array]", rl = "[object Float64Array]", Nr = "[object Int8Array]", gr = "[object Int16Array]", dr = "[object Int32Array]", pr = "[object Uint8Array]", jr = "[object Uint8ClampedArray]", zr = "[object Uint16Array]", yr = "[object Uint32Array]", Na = /\b__p \+= '';/g, ga = /\b(__p \+=) '' \+/g, da = /(__e\(.*?\)|\b__t\)) \+\n'';/g, Bu = /&(?:amp|lt|gt|quot|#39);/g, ku = /[&<>"']/g, pa = RegExp(Bu.source), ja = RegExp(ku.source), za = /<%-([\s\S]+?)%>/g, ya = /<%([\s\S]+?)%>/g, Qu = /<%=([\s\S]+?)%>/g, Da = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, _a = /^\w*$/, Ya = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Dr = /[\\^$.*+?()[\]{}|]/g, ma = RegExp(Dr.source), _r = /^\s+/, Ia = /\s/, Aa = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, wa = /\{\n\/\* \[wrapped with (.+)\] \*/, ha = /,? & /, va = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, Ta = /[()=,{}\[\]\/\s]/, La = /\\(\\)?/g, xa = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, Uu = /\w*$/, Ea = /^[-+]0x[0-9a-f]+$/i, Ca = /^0b[01]+$/i, ba = /^\[object .+?Constructor\]$/, Oa = /^0o[0-7]+$/i, Sa = /^(?:0|[1-9]\d*)$/, Ba = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, Il = /($^)/, ka = /['\n\r\u2028\u2029\\]/g, Al = "\\ud800-\\udfff", Qa = "\\u0300-\\u036f", Ua = "\\ufe20-\\ufe2f", Pa = "\\u20d0-\\u20ff", Pu = Qa + Ua + Pa, Vu = "\\u2700-\\u27bf", Fu = "a-z\\xdf-\\xf6\\xf8-\\xff", Va = "\\xac\\xb1\\xd7\\xf7", Fa = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", Ra = "\\u2000-\\u206f", Wa = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", Ru = "A-Z\\xc0-\\xd6\\xd8-\\xde", Wu = "\\ufe0e\\ufe0f", Gu = Va + Fa + Ra + Wa, Yr = "['’]", Ga = "[" + Al + "]", Zu = "[" + Gu + "]", wl = "[" + Pu + "]", Hu = "\\d+", Za = "[" + Vu + "]", Ku = "[" + Fu + "]", qu = "[^" + Al + Gu + Hu + Vu + Fu + Ru + "]", mr = "\\ud83c[\\udffb-\\udfff]", Ha = "(?:" + wl + "|" + mr + ")", Ju = "[^" + Al + "]", Ir = "(?:\\ud83c[\\udde6-\\uddff]){2}", Ar = "[\\ud800-\\udbff][\\udc00-\\udfff]", Qn = "[" + Ru + "]", $u = "\\u200d", Xu = "(?:" + Ku + "|" + qu + ")", Ka = "(?:" + Qn + "|" + qu + ")", ei = "(?:" + Yr + "(?:d|ll|m|re|s|t|ve))?", ti = "(?:" + Yr + "(?:D|LL|M|RE|S|T|VE))?", ni = Ha + "?", li = "[" + Wu + "]?", qa = "(?:" + $u + "(?:" + [Ju, Ir, Ar].join("|") + ")" + li + ni + ")*", Ja = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", $a = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", ri = li + ni + qa, Xa = "(?:" + [Za, Ir, Ar].join("|") + ")" + ri, eM = "(?:" + [Ju + wl + "?", wl, Ir, Ar, Ga].join("|") + ")", tM = RegExp(Yr, "g"), nM = RegExp(wl, "g"), wr = RegExp(mr + "(?=" + mr + ")|" + eM + ri, "g"), lM = RegExp([
      Qn + "?" + Ku + "+" + ei + "(?=" + [Zu, Qn, "$"].join("|") + ")",
      Ka + "+" + ti + "(?=" + [Zu, Qn + Xu, "$"].join("|") + ")",
      Qn + "?" + Xu + "+" + ei,
      Qn + "+" + ti,
      $a,
      Ja,
      Hu,
      Xa
    ].join("|"), "g"), rM = RegExp("[" + $u + Al + Pu + Wu + "]"), uM = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, iM = [
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
    ], oM = -1, Be = {};
    Be[ll] = Be[rl] = Be[Nr] = Be[gr] = Be[dr] = Be[pr] = Be[jr] = Be[zr] = Be[yr] = !0, Be[Tt] = Be[Mn] = Be[We] = Be[In] = Be[pt] = Be[cn] = Be[An] = Be[wn] = Be[L] = Be[re] = Be[we] = Be[lt] = Be[$e] = Be[Lt] = Be[je] = !1;
    var be = {};
    be[Tt] = be[Mn] = be[We] = be[pt] = be[In] = be[cn] = be[ll] = be[rl] = be[Nr] = be[gr] = be[dr] = be[L] = be[re] = be[we] = be[lt] = be[$e] = be[Lt] = be[Gt] = be[pr] = be[jr] = be[zr] = be[yr] = !0, be[An] = be[wn] = be[je] = !1;
    var sM = {
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
    }, aM = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }, MM = {
      "&amp;": "&",
      "&lt;": "<",
      "&gt;": ">",
      "&quot;": '"',
      "&#39;": "'"
    }, cM = {
      "\\": "\\",
      "'": "'",
      "\n": "n",
      "\r": "r",
      "\u2028": "u2028",
      "\u2029": "u2029"
    }, fM = parseFloat, NM = parseInt, ui = typeof Dl == "object" && Dl && Dl.Object === Object && Dl, gM = typeof self == "object" && self && self.Object === Object && self, ut = ui || gM || Function("return this")(), hr = s && !s.nodeType && s, hn = hr && !0 && N && !N.nodeType && N, ii = hn && hn.exports === hr, vr = ii && ui.process, xt = function() {
      try {
        var p = hn && hn.require && hn.require("util").types;
        return p || vr && vr.binding && vr.binding("util");
      } catch {
      }
    }(), oi = xt && xt.isArrayBuffer, si = xt && xt.isDate, ai = xt && xt.isMap, Mi = xt && xt.isRegExp, ci = xt && xt.isSet, fi = xt && xt.isTypedArray;
    function mt(p, v, Y) {
      switch (Y.length) {
        case 0:
          return p.call(v);
        case 1:
          return p.call(v, Y[0]);
        case 2:
          return p.call(v, Y[0], Y[1]);
        case 3:
          return p.call(v, Y[0], Y[1], Y[2]);
      }
      return p.apply(v, Y);
    }
    function dM(p, v, Y, R) {
      for (var le = -1, _e = p == null ? 0 : p.length; ++le < _e; ) {
        var Xe = p[le];
        v(R, Xe, Y(Xe), p);
      }
      return R;
    }
    function Et(p, v) {
      for (var Y = -1, R = p == null ? 0 : p.length; ++Y < R && v(p[Y], Y, p) !== !1; )
        ;
      return p;
    }
    function pM(p, v) {
      for (var Y = p == null ? 0 : p.length; Y-- && v(p[Y], Y, p) !== !1; )
        ;
      return p;
    }
    function Ni(p, v) {
      for (var Y = -1, R = p == null ? 0 : p.length; ++Y < R; )
        if (!v(p[Y], Y, p))
          return !1;
      return !0;
    }
    function fn(p, v) {
      for (var Y = -1, R = p == null ? 0 : p.length, le = 0, _e = []; ++Y < R; ) {
        var Xe = p[Y];
        v(Xe, Y, p) && (_e[le++] = Xe);
      }
      return _e;
    }
    function hl(p, v) {
      var Y = p == null ? 0 : p.length;
      return !!Y && Un(p, v, 0) > -1;
    }
    function Tr(p, v, Y) {
      for (var R = -1, le = p == null ? 0 : p.length; ++R < le; )
        if (Y(v, p[R]))
          return !0;
      return !1;
    }
    function ke(p, v) {
      for (var Y = -1, R = p == null ? 0 : p.length, le = Array(R); ++Y < R; )
        le[Y] = v(p[Y], Y, p);
      return le;
    }
    function Nn(p, v) {
      for (var Y = -1, R = v.length, le = p.length; ++Y < R; )
        p[le + Y] = v[Y];
      return p;
    }
    function Lr(p, v, Y, R) {
      var le = -1, _e = p == null ? 0 : p.length;
      for (R && _e && (Y = p[++le]); ++le < _e; )
        Y = v(Y, p[le], le, p);
      return Y;
    }
    function jM(p, v, Y, R) {
      var le = p == null ? 0 : p.length;
      for (R && le && (Y = p[--le]); le--; )
        Y = v(Y, p[le], le, p);
      return Y;
    }
    function xr(p, v) {
      for (var Y = -1, R = p == null ? 0 : p.length; ++Y < R; )
        if (v(p[Y], Y, p))
          return !0;
      return !1;
    }
    var zM = Er("length");
    function yM(p) {
      return p.split("");
    }
    function DM(p) {
      return p.match(va) || [];
    }
    function gi(p, v, Y) {
      var R;
      return Y(p, function(le, _e, Xe) {
        if (v(le, _e, Xe))
          return R = _e, !1;
      }), R;
    }
    function vl(p, v, Y, R) {
      for (var le = p.length, _e = Y + (R ? 1 : -1); R ? _e-- : ++_e < le; )
        if (v(p[_e], _e, p))
          return _e;
      return -1;
    }
    function Un(p, v, Y) {
      return v === v ? EM(p, v, Y) : vl(p, di, Y);
    }
    function _M(p, v, Y, R) {
      for (var le = Y - 1, _e = p.length; ++le < _e; )
        if (R(p[le], v))
          return le;
      return -1;
    }
    function di(p) {
      return p !== p;
    }
    function pi(p, v) {
      var Y = p == null ? 0 : p.length;
      return Y ? br(p, v) / Y : nt;
    }
    function Er(p) {
      return function(v) {
        return v == null ? r : v[p];
      };
    }
    function Cr(p) {
      return function(v) {
        return p == null ? r : p[v];
      };
    }
    function ji(p, v, Y, R, le) {
      return le(p, function(_e, Xe, Ce) {
        Y = R ? (R = !1, _e) : v(Y, _e, Xe, Ce);
      }), Y;
    }
    function YM(p, v) {
      var Y = p.length;
      for (p.sort(v); Y--; )
        p[Y] = p[Y].value;
      return p;
    }
    function br(p, v) {
      for (var Y, R = -1, le = p.length; ++R < le; ) {
        var _e = v(p[R]);
        _e !== r && (Y = Y === r ? _e : Y + _e);
      }
      return Y;
    }
    function Or(p, v) {
      for (var Y = -1, R = Array(p); ++Y < p; )
        R[Y] = v(Y);
      return R;
    }
    function mM(p, v) {
      return ke(v, function(Y) {
        return [Y, p[Y]];
      });
    }
    function zi(p) {
      return p && p.slice(0, Yi(p) + 1).replace(_r, "");
    }
    function It(p) {
      return function(v) {
        return p(v);
      };
    }
    function Sr(p, v) {
      return ke(v, function(Y) {
        return p[Y];
      });
    }
    function ul(p, v) {
      return p.has(v);
    }
    function yi(p, v) {
      for (var Y = -1, R = p.length; ++Y < R && Un(v, p[Y], 0) > -1; )
        ;
      return Y;
    }
    function Di(p, v) {
      for (var Y = p.length; Y-- && Un(v, p[Y], 0) > -1; )
        ;
      return Y;
    }
    function IM(p, v) {
      for (var Y = p.length, R = 0; Y--; )
        p[Y] === v && ++R;
      return R;
    }
    var AM = Cr(sM), wM = Cr(aM);
    function hM(p) {
      return "\\" + cM[p];
    }
    function vM(p, v) {
      return p == null ? r : p[v];
    }
    function Pn(p) {
      return rM.test(p);
    }
    function TM(p) {
      return uM.test(p);
    }
    function LM(p) {
      for (var v, Y = []; !(v = p.next()).done; )
        Y.push(v.value);
      return Y;
    }
    function Br(p) {
      var v = -1, Y = Array(p.size);
      return p.forEach(function(R, le) {
        Y[++v] = [le, R];
      }), Y;
    }
    function _i(p, v) {
      return function(Y) {
        return p(v(Y));
      };
    }
    function gn(p, v) {
      for (var Y = -1, R = p.length, le = 0, _e = []; ++Y < R; ) {
        var Xe = p[Y];
        (Xe === v || Xe === D) && (p[Y] = D, _e[le++] = Y);
      }
      return _e;
    }
    function Tl(p) {
      var v = -1, Y = Array(p.size);
      return p.forEach(function(R) {
        Y[++v] = R;
      }), Y;
    }
    function xM(p) {
      var v = -1, Y = Array(p.size);
      return p.forEach(function(R) {
        Y[++v] = [R, R];
      }), Y;
    }
    function EM(p, v, Y) {
      for (var R = Y - 1, le = p.length; ++R < le; )
        if (p[R] === v)
          return R;
      return -1;
    }
    function CM(p, v, Y) {
      for (var R = Y + 1; R--; )
        if (p[R] === v)
          return R;
      return R;
    }
    function Vn(p) {
      return Pn(p) ? OM(p) : zM(p);
    }
    function Vt(p) {
      return Pn(p) ? SM(p) : yM(p);
    }
    function Yi(p) {
      for (var v = p.length; v-- && Ia.test(p.charAt(v)); )
        ;
      return v;
    }
    var bM = Cr(MM);
    function OM(p) {
      for (var v = wr.lastIndex = 0; wr.test(p); )
        ++v;
      return v;
    }
    function SM(p) {
      return p.match(wr) || [];
    }
    function BM(p) {
      return p.match(lM) || [];
    }
    var kM = function p(v) {
      v = v == null ? ut : Fn.defaults(ut.Object(), v, Fn.pick(ut, iM));
      var Y = v.Array, R = v.Date, le = v.Error, _e = v.Function, Xe = v.Math, Ce = v.Object, kr = v.RegExp, QM = v.String, Ct = v.TypeError, Ll = Y.prototype, UM = _e.prototype, Rn = Ce.prototype, xl = v["__core-js_shared__"], El = UM.toString, he = Rn.hasOwnProperty, PM = 0, mi = function() {
        var e = /[^.]+$/.exec(xl && xl.keys && xl.keys.IE_PROTO || "");
        return e ? "Symbol(src)_1." + e : "";
      }(), Cl = Rn.toString, VM = El.call(Ce), FM = ut._, RM = kr(
        "^" + El.call(he).replace(Dr, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
      ), bl = ii ? v.Buffer : r, dn = v.Symbol, Ol = v.Uint8Array, Ii = bl ? bl.allocUnsafe : r, Sl = _i(Ce.getPrototypeOf, Ce), Ai = Ce.create, wi = Rn.propertyIsEnumerable, Bl = Ll.splice, hi = dn ? dn.isConcatSpreadable : r, il = dn ? dn.iterator : r, vn = dn ? dn.toStringTag : r, kl = function() {
        try {
          var e = Cn(Ce, "defineProperty");
          return e({}, "", {}), e;
        } catch {
        }
      }(), WM = v.clearTimeout !== ut.clearTimeout && v.clearTimeout, GM = R && R.now !== ut.Date.now && R.now, ZM = v.setTimeout !== ut.setTimeout && v.setTimeout, Ql = Xe.ceil, Ul = Xe.floor, Qr = Ce.getOwnPropertySymbols, HM = bl ? bl.isBuffer : r, vi = v.isFinite, KM = Ll.join, qM = _i(Ce.keys, Ce), et = Xe.max, at = Xe.min, JM = R.now, $M = v.parseInt, Ti = Xe.random, XM = Ll.reverse, Ur = Cn(v, "DataView"), ol = Cn(v, "Map"), Pr = Cn(v, "Promise"), Wn = Cn(v, "Set"), sl = Cn(v, "WeakMap"), al = Cn(Ce, "create"), Pl = sl && new sl(), Gn = {}, ec = bn(Ur), tc = bn(ol), nc = bn(Pr), lc = bn(Wn), rc = bn(sl), Vl = dn ? dn.prototype : r, Ml = Vl ? Vl.valueOf : r, Li = Vl ? Vl.toString : r;
      function o(e) {
        if (Ge(e) && !ue(e) && !(e instanceof Ne)) {
          if (e instanceof bt)
            return e;
          if (he.call(e, "__wrapped__"))
            return Eo(e);
        }
        return new bt(e);
      }
      var Zn = function() {
        function e() {
        }
        return function(t) {
          if (!Qe(t))
            return {};
          if (Ai)
            return Ai(t);
          e.prototype = t;
          var n = new e();
          return e.prototype = r, n;
        };
      }();
      function Fl() {
      }
      function bt(e, t) {
        this.__wrapped__ = e, this.__actions__ = [], this.__chain__ = !!t, this.__index__ = 0, this.__values__ = r;
      }
      o.templateSettings = {
        /**
         * Used to detect `data` property values to be HTML-escaped.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        escape: za,
        /**
         * Used to detect code to be evaluated.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        evaluate: ya,
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
          _: o
        }
      }, o.prototype = Fl.prototype, o.prototype.constructor = o, bt.prototype = Zn(Fl.prototype), bt.prototype.constructor = bt;
      function Ne(e) {
        this.__wrapped__ = e, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = !1, this.__iteratees__ = [], this.__takeCount__ = Re, this.__views__ = [];
      }
      function uc() {
        var e = new Ne(this.__wrapped__);
        return e.__actions__ = jt(this.__actions__), e.__dir__ = this.__dir__, e.__filtered__ = this.__filtered__, e.__iteratees__ = jt(this.__iteratees__), e.__takeCount__ = this.__takeCount__, e.__views__ = jt(this.__views__), e;
      }
      function ic() {
        if (this.__filtered__) {
          var e = new Ne(this);
          e.__dir__ = -1, e.__filtered__ = !0;
        } else
          e = this.clone(), e.__dir__ *= -1;
        return e;
      }
      function oc() {
        var e = this.__wrapped__.value(), t = this.__dir__, n = ue(e), l = t < 0, u = n ? e.length : 0, a = Df(0, u, this.__views__), M = a.start, f = a.end, j = f - M, x = l ? f : M - 1, E = this.__iteratees__, O = E.length, P = 0, H = at(j, this.__takeCount__);
        if (!n || !l && u == j && H == j)
          return eo(e, this.__actions__);
        var J = [];
        e:
          for (; j-- && P < H; ) {
            x += t;
            for (var ae = -1, $ = e[x]; ++ae < O; ) {
              var fe = E[ae], ge = fe.iteratee, ht = fe.type, gt = ge($);
              if (ht == T)
                $ = gt;
              else if (!gt) {
                if (ht == w)
                  continue e;
                break e;
              }
            }
            J[P++] = $;
          }
        return J;
      }
      Ne.prototype = Zn(Fl.prototype), Ne.prototype.constructor = Ne;
      function Tn(e) {
        var t = -1, n = e == null ? 0 : e.length;
        for (this.clear(); ++t < n; ) {
          var l = e[t];
          this.set(l[0], l[1]);
        }
      }
      function sc() {
        this.__data__ = al ? al(null) : {}, this.size = 0;
      }
      function ac(e) {
        var t = this.has(e) && delete this.__data__[e];
        return this.size -= t ? 1 : 0, t;
      }
      function Mc(e) {
        var t = this.__data__;
        if (al) {
          var n = t[e];
          return n === g ? r : n;
        }
        return he.call(t, e) ? t[e] : r;
      }
      function cc(e) {
        var t = this.__data__;
        return al ? t[e] !== r : he.call(t, e);
      }
      function fc(e, t) {
        var n = this.__data__;
        return this.size += this.has(e) ? 0 : 1, n[e] = al && t === r ? g : t, this;
      }
      Tn.prototype.clear = sc, Tn.prototype.delete = ac, Tn.prototype.get = Mc, Tn.prototype.has = cc, Tn.prototype.set = fc;
      function Jt(e) {
        var t = -1, n = e == null ? 0 : e.length;
        for (this.clear(); ++t < n; ) {
          var l = e[t];
          this.set(l[0], l[1]);
        }
      }
      function Nc() {
        this.__data__ = [], this.size = 0;
      }
      function gc(e) {
        var t = this.__data__, n = Rl(t, e);
        if (n < 0)
          return !1;
        var l = t.length - 1;
        return n == l ? t.pop() : Bl.call(t, n, 1), --this.size, !0;
      }
      function dc(e) {
        var t = this.__data__, n = Rl(t, e);
        return n < 0 ? r : t[n][1];
      }
      function pc(e) {
        return Rl(this.__data__, e) > -1;
      }
      function jc(e, t) {
        var n = this.__data__, l = Rl(n, e);
        return l < 0 ? (++this.size, n.push([e, t])) : n[l][1] = t, this;
      }
      Jt.prototype.clear = Nc, Jt.prototype.delete = gc, Jt.prototype.get = dc, Jt.prototype.has = pc, Jt.prototype.set = jc;
      function $t(e) {
        var t = -1, n = e == null ? 0 : e.length;
        for (this.clear(); ++t < n; ) {
          var l = e[t];
          this.set(l[0], l[1]);
        }
      }
      function zc() {
        this.size = 0, this.__data__ = {
          hash: new Tn(),
          map: new (ol || Jt)(),
          string: new Tn()
        };
      }
      function yc(e) {
        var t = nr(this, e).delete(e);
        return this.size -= t ? 1 : 0, t;
      }
      function Dc(e) {
        return nr(this, e).get(e);
      }
      function _c(e) {
        return nr(this, e).has(e);
      }
      function Yc(e, t) {
        var n = nr(this, e), l = n.size;
        return n.set(e, t), this.size += n.size == l ? 0 : 1, this;
      }
      $t.prototype.clear = zc, $t.prototype.delete = yc, $t.prototype.get = Dc, $t.prototype.has = _c, $t.prototype.set = Yc;
      function Ln(e) {
        var t = -1, n = e == null ? 0 : e.length;
        for (this.__data__ = new $t(); ++t < n; )
          this.add(e[t]);
      }
      function mc(e) {
        return this.__data__.set(e, g), this;
      }
      function Ic(e) {
        return this.__data__.has(e);
      }
      Ln.prototype.add = Ln.prototype.push = mc, Ln.prototype.has = Ic;
      function Ft(e) {
        var t = this.__data__ = new Jt(e);
        this.size = t.size;
      }
      function Ac() {
        this.__data__ = new Jt(), this.size = 0;
      }
      function wc(e) {
        var t = this.__data__, n = t.delete(e);
        return this.size = t.size, n;
      }
      function hc(e) {
        return this.__data__.get(e);
      }
      function vc(e) {
        return this.__data__.has(e);
      }
      function Tc(e, t) {
        var n = this.__data__;
        if (n instanceof Jt) {
          var l = n.__data__;
          if (!ol || l.length < z - 1)
            return l.push([e, t]), this.size = ++n.size, this;
          n = this.__data__ = new $t(l);
        }
        return n.set(e, t), this.size = n.size, this;
      }
      Ft.prototype.clear = Ac, Ft.prototype.delete = wc, Ft.prototype.get = hc, Ft.prototype.has = vc, Ft.prototype.set = Tc;
      function xi(e, t) {
        var n = ue(e), l = !n && On(e), u = !n && !l && Dn(e), a = !n && !l && !u && Jn(e), M = n || l || u || a, f = M ? Or(e.length, QM) : [], j = f.length;
        for (var x in e)
          (t || he.call(e, x)) && !(M && // Safari 9 has enumerable `arguments.length` in strict mode.
          (x == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
          u && (x == "offset" || x == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
          a && (x == "buffer" || x == "byteLength" || x == "byteOffset") || // Skip index properties.
          nn(x, j))) && f.push(x);
        return f;
      }
      function Ei(e) {
        var t = e.length;
        return t ? e[$r(0, t - 1)] : r;
      }
      function Lc(e, t) {
        return lr(jt(e), xn(t, 0, e.length));
      }
      function xc(e) {
        return lr(jt(e));
      }
      function Vr(e, t, n) {
        (n !== r && !Rt(e[t], n) || n === r && !(t in e)) && Xt(e, t, n);
      }
      function cl(e, t, n) {
        var l = e[t];
        (!(he.call(e, t) && Rt(l, n)) || n === r && !(t in e)) && Xt(e, t, n);
      }
      function Rl(e, t) {
        for (var n = e.length; n--; )
          if (Rt(e[n][0], t))
            return n;
        return -1;
      }
      function Ec(e, t, n, l) {
        return pn(e, function(u, a, M) {
          t(l, u, n(u), M);
        }), l;
      }
      function Ci(e, t) {
        return e && Ht(t, tt(t), e);
      }
      function Cc(e, t) {
        return e && Ht(t, yt(t), e);
      }
      function Xt(e, t, n) {
        t == "__proto__" && kl ? kl(e, t, {
          configurable: !0,
          enumerable: !0,
          value: n,
          writable: !0
        }) : e[t] = n;
      }
      function Fr(e, t) {
        for (var n = -1, l = t.length, u = Y(l), a = e == null; ++n < l; )
          u[n] = a ? r : mu(e, t[n]);
        return u;
      }
      function xn(e, t, n) {
        return e === e && (n !== r && (e = e <= n ? e : n), t !== r && (e = e >= t ? e : t)), e;
      }
      function Ot(e, t, n, l, u, a) {
        var M, f = t & A, j = t & h, x = t & C;
        if (n && (M = u ? n(e, l, u, a) : n(e)), M !== r)
          return M;
        if (!Qe(e))
          return e;
        var E = ue(e);
        if (E) {
          if (M = Yf(e), !f)
            return jt(e, M);
        } else {
          var O = Mt(e), P = O == wn || O == nl;
          if (Dn(e))
            return lo(e, f);
          if (O == we || O == Tt || P && !u) {
            if (M = j || P ? {} : mo(e), !f)
              return j ? cf(e, Cc(M, e)) : Mf(e, Ci(M, e));
          } else {
            if (!be[O])
              return u ? e : {};
            M = mf(e, O, f);
          }
        }
        a || (a = new Ft());
        var H = a.get(e);
        if (H)
          return H;
        a.set(e, M), $o(e) ? e.forEach(function($) {
          M.add(Ot($, t, n, $, e, a));
        }) : qo(e) && e.forEach(function($, fe) {
          M.set(fe, Ot($, t, n, fe, e, a));
        });
        var J = x ? j ? au : su : j ? yt : tt, ae = E ? r : J(e);
        return Et(ae || e, function($, fe) {
          ae && (fe = $, $ = e[fe]), cl(M, fe, Ot($, t, n, fe, e, a));
        }), M;
      }
      function bc(e) {
        var t = tt(e);
        return function(n) {
          return bi(n, e, t);
        };
      }
      function bi(e, t, n) {
        var l = n.length;
        if (e == null)
          return !l;
        for (e = Ce(e); l--; ) {
          var u = n[l], a = t[u], M = e[u];
          if (M === r && !(u in e) || !a(M))
            return !1;
        }
        return !0;
      }
      function Oi(e, t, n) {
        if (typeof e != "function")
          throw new Ct(_);
        return zl(function() {
          e.apply(r, n);
        }, t);
      }
      function fl(e, t, n, l) {
        var u = -1, a = hl, M = !0, f = e.length, j = [], x = t.length;
        if (!f)
          return j;
        n && (t = ke(t, It(n))), l ? (a = Tr, M = !1) : t.length >= z && (a = ul, M = !1, t = new Ln(t));
        e:
          for (; ++u < f; ) {
            var E = e[u], O = n == null ? E : n(E);
            if (E = l || E !== 0 ? E : 0, M && O === O) {
              for (var P = x; P--; )
                if (t[P] === O)
                  continue e;
              j.push(E);
            } else
              a(t, O, l) || j.push(E);
          }
        return j;
      }
      var pn = so(Zt), Si = so(Wr, !0);
      function Oc(e, t) {
        var n = !0;
        return pn(e, function(l, u, a) {
          return n = !!t(l, u, a), n;
        }), n;
      }
      function Wl(e, t, n) {
        for (var l = -1, u = e.length; ++l < u; ) {
          var a = e[l], M = t(a);
          if (M != null && (f === r ? M === M && !wt(M) : n(M, f)))
            var f = M, j = a;
        }
        return j;
      }
      function Sc(e, t, n, l) {
        var u = e.length;
        for (n = se(n), n < 0 && (n = -n > u ? 0 : u + n), l = l === r || l > u ? u : se(l), l < 0 && (l += u), l = n > l ? 0 : es(l); n < l; )
          e[n++] = t;
        return e;
      }
      function Bi(e, t) {
        var n = [];
        return pn(e, function(l, u, a) {
          t(l, u, a) && n.push(l);
        }), n;
      }
      function it(e, t, n, l, u) {
        var a = -1, M = e.length;
        for (n || (n = Af), u || (u = []); ++a < M; ) {
          var f = e[a];
          t > 0 && n(f) ? t > 1 ? it(f, t - 1, n, l, u) : Nn(u, f) : l || (u[u.length] = f);
        }
        return u;
      }
      var Rr = ao(), ki = ao(!0);
      function Zt(e, t) {
        return e && Rr(e, t, tt);
      }
      function Wr(e, t) {
        return e && ki(e, t, tt);
      }
      function Gl(e, t) {
        return fn(t, function(n) {
          return ln(e[n]);
        });
      }
      function En(e, t) {
        t = zn(t, e);
        for (var n = 0, l = t.length; e != null && n < l; )
          e = e[Kt(t[n++])];
        return n && n == l ? e : r;
      }
      function Qi(e, t, n) {
        var l = t(e);
        return ue(e) ? l : Nn(l, n(e));
      }
      function ft(e) {
        return e == null ? e === r ? kn : ne : vn && vn in Ce(e) ? yf(e) : Ef(e);
      }
      function Gr(e, t) {
        return e > t;
      }
      function Bc(e, t) {
        return e != null && he.call(e, t);
      }
      function kc(e, t) {
        return e != null && t in Ce(e);
      }
      function Qc(e, t, n) {
        return e >= at(t, n) && e < et(t, n);
      }
      function Zr(e, t, n) {
        for (var l = n ? Tr : hl, u = e[0].length, a = e.length, M = a, f = Y(a), j = 1 / 0, x = []; M--; ) {
          var E = e[M];
          M && t && (E = ke(E, It(t))), j = at(E.length, j), f[M] = !n && (t || u >= 120 && E.length >= 120) ? new Ln(M && E) : r;
        }
        E = e[0];
        var O = -1, P = f[0];
        e:
          for (; ++O < u && x.length < j; ) {
            var H = E[O], J = t ? t(H) : H;
            if (H = n || H !== 0 ? H : 0, !(P ? ul(P, J) : l(x, J, n))) {
              for (M = a; --M; ) {
                var ae = f[M];
                if (!(ae ? ul(ae, J) : l(e[M], J, n)))
                  continue e;
              }
              P && P.push(J), x.push(H);
            }
          }
        return x;
      }
      function Uc(e, t, n, l) {
        return Zt(e, function(u, a, M) {
          t(l, n(u), a, M);
        }), l;
      }
      function Nl(e, t, n) {
        t = zn(t, e), e = ho(e, t);
        var l = e == null ? e : e[Kt(Bt(t))];
        return l == null ? r : mt(l, e, n);
      }
      function Ui(e) {
        return Ge(e) && ft(e) == Tt;
      }
      function Pc(e) {
        return Ge(e) && ft(e) == We;
      }
      function Vc(e) {
        return Ge(e) && ft(e) == cn;
      }
      function gl(e, t, n, l, u) {
        return e === t ? !0 : e == null || t == null || !Ge(e) && !Ge(t) ? e !== e && t !== t : Fc(e, t, n, l, gl, u);
      }
      function Fc(e, t, n, l, u, a) {
        var M = ue(e), f = ue(t), j = M ? Mn : Mt(e), x = f ? Mn : Mt(t);
        j = j == Tt ? we : j, x = x == Tt ? we : x;
        var E = j == we, O = x == we, P = j == x;
        if (P && Dn(e)) {
          if (!Dn(t))
            return !1;
          M = !0, E = !1;
        }
        if (P && !E)
          return a || (a = new Ft()), M || Jn(e) ? Do(e, t, n, l, u, a) : jf(e, t, j, n, l, u, a);
        if (!(n & S)) {
          var H = E && he.call(e, "__wrapped__"), J = O && he.call(t, "__wrapped__");
          if (H || J) {
            var ae = H ? e.value() : e, $ = J ? t.value() : t;
            return a || (a = new Ft()), u(ae, $, n, l, a);
          }
        }
        return P ? (a || (a = new Ft()), zf(e, t, n, l, u, a)) : !1;
      }
      function Rc(e) {
        return Ge(e) && Mt(e) == L;
      }
      function Hr(e, t, n, l) {
        var u = n.length, a = u, M = !l;
        if (e == null)
          return !a;
        for (e = Ce(e); u--; ) {
          var f = n[u];
          if (M && f[2] ? f[1] !== e[f[0]] : !(f[0] in e))
            return !1;
        }
        for (; ++u < a; ) {
          f = n[u];
          var j = f[0], x = e[j], E = f[1];
          if (M && f[2]) {
            if (x === r && !(j in e))
              return !1;
          } else {
            var O = new Ft();
            if (l)
              var P = l(x, E, j, e, t, O);
            if (!(P === r ? gl(E, x, S | U, l, O) : P))
              return !1;
          }
        }
        return !0;
      }
      function Pi(e) {
        if (!Qe(e) || hf(e))
          return !1;
        var t = ln(e) ? RM : ba;
        return t.test(bn(e));
      }
      function Wc(e) {
        return Ge(e) && ft(e) == lt;
      }
      function Gc(e) {
        return Ge(e) && Mt(e) == $e;
      }
      function Zc(e) {
        return Ge(e) && ar(e.length) && !!Be[ft(e)];
      }
      function Vi(e) {
        return typeof e == "function" ? e : e == null ? Dt : typeof e == "object" ? ue(e) ? Wi(e[0], e[1]) : Ri(e) : cs(e);
      }
      function Kr(e) {
        if (!jl(e))
          return qM(e);
        var t = [];
        for (var n in Ce(e))
          he.call(e, n) && n != "constructor" && t.push(n);
        return t;
      }
      function Hc(e) {
        if (!Qe(e))
          return xf(e);
        var t = jl(e), n = [];
        for (var l in e)
          l == "constructor" && (t || !he.call(e, l)) || n.push(l);
        return n;
      }
      function qr(e, t) {
        return e < t;
      }
      function Fi(e, t) {
        var n = -1, l = zt(e) ? Y(e.length) : [];
        return pn(e, function(u, a, M) {
          l[++n] = t(u, a, M);
        }), l;
      }
      function Ri(e) {
        var t = cu(e);
        return t.length == 1 && t[0][2] ? Ao(t[0][0], t[0][1]) : function(n) {
          return n === e || Hr(n, e, t);
        };
      }
      function Wi(e, t) {
        return Nu(e) && Io(t) ? Ao(Kt(e), t) : function(n) {
          var l = mu(n, e);
          return l === r && l === t ? Iu(n, e) : gl(t, l, S | U);
        };
      }
      function Zl(e, t, n, l, u) {
        e !== t && Rr(t, function(a, M) {
          if (u || (u = new Ft()), Qe(a))
            Kc(e, t, M, n, Zl, l, u);
          else {
            var f = l ? l(du(e, M), a, M + "", e, t, u) : r;
            f === r && (f = a), Vr(e, M, f);
          }
        }, yt);
      }
      function Kc(e, t, n, l, u, a, M) {
        var f = du(e, n), j = du(t, n), x = M.get(j);
        if (x) {
          Vr(e, n, x);
          return;
        }
        var E = a ? a(f, j, n + "", e, t, M) : r, O = E === r;
        if (O) {
          var P = ue(j), H = !P && Dn(j), J = !P && !H && Jn(j);
          E = j, P || H || J ? ue(f) ? E = f : Ze(f) ? E = jt(f) : H ? (O = !1, E = lo(j, !0)) : J ? (O = !1, E = ro(j, !0)) : E = [] : yl(j) || On(j) ? (E = f, On(f) ? E = ts(f) : (!Qe(f) || ln(f)) && (E = mo(j))) : O = !1;
        }
        O && (M.set(j, E), u(E, j, l, a, M), M.delete(j)), Vr(e, n, E);
      }
      function Gi(e, t) {
        var n = e.length;
        if (n)
          return t += t < 0 ? n : 0, nn(t, n) ? e[t] : r;
      }
      function Zi(e, t, n) {
        t.length ? t = ke(t, function(a) {
          return ue(a) ? function(M) {
            return En(M, a.length === 1 ? a[0] : a);
          } : a;
        }) : t = [Dt];
        var l = -1;
        t = ke(t, It(q()));
        var u = Fi(e, function(a, M, f) {
          var j = ke(t, function(x) {
            return x(a);
          });
          return { criteria: j, index: ++l, value: a };
        });
        return YM(u, function(a, M) {
          return af(a, M, n);
        });
      }
      function qc(e, t) {
        return Hi(e, t, function(n, l) {
          return Iu(e, l);
        });
      }
      function Hi(e, t, n) {
        for (var l = -1, u = t.length, a = {}; ++l < u; ) {
          var M = t[l], f = En(e, M);
          n(f, M) && dl(a, zn(M, e), f);
        }
        return a;
      }
      function Jc(e) {
        return function(t) {
          return En(t, e);
        };
      }
      function Jr(e, t, n, l) {
        var u = l ? _M : Un, a = -1, M = t.length, f = e;
        for (e === t && (t = jt(t)), n && (f = ke(e, It(n))); ++a < M; )
          for (var j = 0, x = t[a], E = n ? n(x) : x; (j = u(f, E, j, l)) > -1; )
            f !== e && Bl.call(f, j, 1), Bl.call(e, j, 1);
        return e;
      }
      function Ki(e, t) {
        for (var n = e ? t.length : 0, l = n - 1; n--; ) {
          var u = t[n];
          if (n == l || u !== a) {
            var a = u;
            nn(u) ? Bl.call(e, u, 1) : tu(e, u);
          }
        }
        return e;
      }
      function $r(e, t) {
        return e + Ul(Ti() * (t - e + 1));
      }
      function $c(e, t, n, l) {
        for (var u = -1, a = et(Ql((t - e) / (n || 1)), 0), M = Y(a); a--; )
          M[l ? a : ++u] = e, e += n;
        return M;
      }
      function Xr(e, t) {
        var n = "";
        if (!e || t < 1 || t > De)
          return n;
        do
          t % 2 && (n += e), t = Ul(t / 2), t && (e += e);
        while (t);
        return n;
      }
      function Me(e, t) {
        return pu(wo(e, t, Dt), e + "");
      }
      function Xc(e) {
        return Ei($n(e));
      }
      function ef(e, t) {
        var n = $n(e);
        return lr(n, xn(t, 0, n.length));
      }
      function dl(e, t, n, l) {
        if (!Qe(e))
          return e;
        t = zn(t, e);
        for (var u = -1, a = t.length, M = a - 1, f = e; f != null && ++u < a; ) {
          var j = Kt(t[u]), x = n;
          if (j === "__proto__" || j === "constructor" || j === "prototype")
            return e;
          if (u != M) {
            var E = f[j];
            x = l ? l(E, j, f) : r, x === r && (x = Qe(E) ? E : nn(t[u + 1]) ? [] : {});
          }
          cl(f, j, x), f = f[j];
        }
        return e;
      }
      var qi = Pl ? function(e, t) {
        return Pl.set(e, t), e;
      } : Dt, tf = kl ? function(e, t) {
        return kl(e, "toString", {
          configurable: !0,
          enumerable: !1,
          value: wu(t),
          writable: !0
        });
      } : Dt;
      function nf(e) {
        return lr($n(e));
      }
      function St(e, t, n) {
        var l = -1, u = e.length;
        t < 0 && (t = -t > u ? 0 : u + t), n = n > u ? u : n, n < 0 && (n += u), u = t > n ? 0 : n - t >>> 0, t >>>= 0;
        for (var a = Y(u); ++l < u; )
          a[l] = e[l + t];
        return a;
      }
      function lf(e, t) {
        var n;
        return pn(e, function(l, u, a) {
          return n = t(l, u, a), !n;
        }), !!n;
      }
      function Hl(e, t, n) {
        var l = 0, u = e == null ? l : e.length;
        if (typeof t == "number" && t === t && u <= tl) {
          for (; l < u; ) {
            var a = l + u >>> 1, M = e[a];
            M !== null && !wt(M) && (n ? M <= t : M < t) ? l = a + 1 : u = a;
          }
          return u;
        }
        return eu(e, t, Dt, n);
      }
      function eu(e, t, n, l) {
        var u = 0, a = e == null ? 0 : e.length;
        if (a === 0)
          return 0;
        t = n(t);
        for (var M = t !== t, f = t === null, j = wt(t), x = t === r; u < a; ) {
          var E = Ul((u + a) / 2), O = n(e[E]), P = O !== r, H = O === null, J = O === O, ae = wt(O);
          if (M)
            var $ = l || J;
          else
            x ? $ = J && (l || P) : f ? $ = J && P && (l || !H) : j ? $ = J && P && !H && (l || !ae) : H || ae ? $ = !1 : $ = l ? O <= t : O < t;
          $ ? u = E + 1 : a = E;
        }
        return at(a, me);
      }
      function Ji(e, t) {
        for (var n = -1, l = e.length, u = 0, a = []; ++n < l; ) {
          var M = e[n], f = t ? t(M) : M;
          if (!n || !Rt(f, j)) {
            var j = f;
            a[u++] = M === 0 ? 0 : M;
          }
        }
        return a;
      }
      function $i(e) {
        return typeof e == "number" ? e : wt(e) ? nt : +e;
      }
      function At(e) {
        if (typeof e == "string")
          return e;
        if (ue(e))
          return ke(e, At) + "";
        if (wt(e))
          return Li ? Li.call(e) : "";
        var t = e + "";
        return t == "0" && 1 / e == -te ? "-0" : t;
      }
      function jn(e, t, n) {
        var l = -1, u = hl, a = e.length, M = !0, f = [], j = f;
        if (n)
          M = !1, u = Tr;
        else if (a >= z) {
          var x = t ? null : df(e);
          if (x)
            return Tl(x);
          M = !1, u = ul, j = new Ln();
        } else
          j = t ? [] : f;
        e:
          for (; ++l < a; ) {
            var E = e[l], O = t ? t(E) : E;
            if (E = n || E !== 0 ? E : 0, M && O === O) {
              for (var P = j.length; P--; )
                if (j[P] === O)
                  continue e;
              t && j.push(O), f.push(E);
            } else
              u(j, O, n) || (j !== f && j.push(O), f.push(E));
          }
        return f;
      }
      function tu(e, t) {
        return t = zn(t, e), e = ho(e, t), e == null || delete e[Kt(Bt(t))];
      }
      function Xi(e, t, n, l) {
        return dl(e, t, n(En(e, t)), l);
      }
      function Kl(e, t, n, l) {
        for (var u = e.length, a = l ? u : -1; (l ? a-- : ++a < u) && t(e[a], a, e); )
          ;
        return n ? St(e, l ? 0 : a, l ? a + 1 : u) : St(e, l ? a + 1 : 0, l ? u : a);
      }
      function eo(e, t) {
        var n = e;
        return n instanceof Ne && (n = n.value()), Lr(t, function(l, u) {
          return u.func.apply(u.thisArg, Nn([l], u.args));
        }, n);
      }
      function nu(e, t, n) {
        var l = e.length;
        if (l < 2)
          return l ? jn(e[0]) : [];
        for (var u = -1, a = Y(l); ++u < l; )
          for (var M = e[u], f = -1; ++f < l; )
            f != u && (a[u] = fl(a[u] || M, e[f], t, n));
        return jn(it(a, 1), t, n);
      }
      function to(e, t, n) {
        for (var l = -1, u = e.length, a = t.length, M = {}; ++l < u; ) {
          var f = l < a ? t[l] : r;
          n(M, e[l], f);
        }
        return M;
      }
      function lu(e) {
        return Ze(e) ? e : [];
      }
      function ru(e) {
        return typeof e == "function" ? e : Dt;
      }
      function zn(e, t) {
        return ue(e) ? e : Nu(e, t) ? [e] : xo(Ie(e));
      }
      var rf = Me;
      function yn(e, t, n) {
        var l = e.length;
        return n = n === r ? l : n, !t && n >= l ? e : St(e, t, n);
      }
      var no = WM || function(e) {
        return ut.clearTimeout(e);
      };
      function lo(e, t) {
        if (t)
          return e.slice();
        var n = e.length, l = Ii ? Ii(n) : new e.constructor(n);
        return e.copy(l), l;
      }
      function uu(e) {
        var t = new e.constructor(e.byteLength);
        return new Ol(t).set(new Ol(e)), t;
      }
      function uf(e, t) {
        var n = t ? uu(e.buffer) : e.buffer;
        return new e.constructor(n, e.byteOffset, e.byteLength);
      }
      function of(e) {
        var t = new e.constructor(e.source, Uu.exec(e));
        return t.lastIndex = e.lastIndex, t;
      }
      function sf(e) {
        return Ml ? Ce(Ml.call(e)) : {};
      }
      function ro(e, t) {
        var n = t ? uu(e.buffer) : e.buffer;
        return new e.constructor(n, e.byteOffset, e.length);
      }
      function uo(e, t) {
        if (e !== t) {
          var n = e !== r, l = e === null, u = e === e, a = wt(e), M = t !== r, f = t === null, j = t === t, x = wt(t);
          if (!f && !x && !a && e > t || a && M && j && !f && !x || l && M && j || !n && j || !u)
            return 1;
          if (!l && !a && !x && e < t || x && n && u && !l && !a || f && n && u || !M && u || !j)
            return -1;
        }
        return 0;
      }
      function af(e, t, n) {
        for (var l = -1, u = e.criteria, a = t.criteria, M = u.length, f = n.length; ++l < M; ) {
          var j = uo(u[l], a[l]);
          if (j) {
            if (l >= f)
              return j;
            var x = n[l];
            return j * (x == "desc" ? -1 : 1);
          }
        }
        return e.index - t.index;
      }
      function io(e, t, n, l) {
        for (var u = -1, a = e.length, M = n.length, f = -1, j = t.length, x = et(a - M, 0), E = Y(j + x), O = !l; ++f < j; )
          E[f] = t[f];
        for (; ++u < M; )
          (O || u < a) && (E[n[u]] = e[u]);
        for (; x--; )
          E[f++] = e[u++];
        return E;
      }
      function oo(e, t, n, l) {
        for (var u = -1, a = e.length, M = -1, f = n.length, j = -1, x = t.length, E = et(a - f, 0), O = Y(E + x), P = !l; ++u < E; )
          O[u] = e[u];
        for (var H = u; ++j < x; )
          O[H + j] = t[j];
        for (; ++M < f; )
          (P || u < a) && (O[H + n[M]] = e[u++]);
        return O;
      }
      function jt(e, t) {
        var n = -1, l = e.length;
        for (t || (t = Y(l)); ++n < l; )
          t[n] = e[n];
        return t;
      }
      function Ht(e, t, n, l) {
        var u = !n;
        n || (n = {});
        for (var a = -1, M = t.length; ++a < M; ) {
          var f = t[a], j = l ? l(n[f], e[f], f, n, e) : r;
          j === r && (j = e[f]), u ? Xt(n, f, j) : cl(n, f, j);
        }
        return n;
      }
      function Mf(e, t) {
        return Ht(e, fu(e), t);
      }
      function cf(e, t) {
        return Ht(e, _o(e), t);
      }
      function ql(e, t) {
        return function(n, l) {
          var u = ue(n) ? dM : Ec, a = t ? t() : {};
          return u(n, e, q(l, 2), a);
        };
      }
      function Hn(e) {
        return Me(function(t, n) {
          var l = -1, u = n.length, a = u > 1 ? n[u - 1] : r, M = u > 2 ? n[2] : r;
          for (a = e.length > 3 && typeof a == "function" ? (u--, a) : r, M && Nt(n[0], n[1], M) && (a = u < 3 ? r : a, u = 1), t = Ce(t); ++l < u; ) {
            var f = n[l];
            f && e(t, f, l, a);
          }
          return t;
        });
      }
      function so(e, t) {
        return function(n, l) {
          if (n == null)
            return n;
          if (!zt(n))
            return e(n, l);
          for (var u = n.length, a = t ? u : -1, M = Ce(n); (t ? a-- : ++a < u) && l(M[a], a, M) !== !1; )
            ;
          return n;
        };
      }
      function ao(e) {
        return function(t, n, l) {
          for (var u = -1, a = Ce(t), M = l(t), f = M.length; f--; ) {
            var j = M[e ? f : ++u];
            if (n(a[j], j, a) === !1)
              break;
          }
          return t;
        };
      }
      function ff(e, t, n) {
        var l = t & W, u = pl(e);
        function a() {
          var M = this && this !== ut && this instanceof a ? u : e;
          return M.apply(l ? n : this, arguments);
        }
        return a;
      }
      function Mo(e) {
        return function(t) {
          t = Ie(t);
          var n = Pn(t) ? Vt(t) : r, l = n ? n[0] : t.charAt(0), u = n ? yn(n, 1).join("") : t.slice(1);
          return l[e]() + u;
        };
      }
      function Kn(e) {
        return function(t) {
          return Lr(as(ss(t).replace(tM, "")), e, "");
        };
      }
      function pl(e) {
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
          var n = Zn(e.prototype), l = e.apply(n, t);
          return Qe(l) ? l : n;
        };
      }
      function Nf(e, t, n) {
        var l = pl(e);
        function u() {
          for (var a = arguments.length, M = Y(a), f = a, j = qn(u); f--; )
            M[f] = arguments[f];
          var x = a < 3 && M[0] !== j && M[a - 1] !== j ? [] : gn(M, j);
          if (a -= x.length, a < n)
            return po(
              e,
              t,
              Jl,
              u.placeholder,
              r,
              M,
              x,
              r,
              r,
              n - a
            );
          var E = this && this !== ut && this instanceof u ? l : e;
          return mt(E, this, M);
        }
        return u;
      }
      function co(e) {
        return function(t, n, l) {
          var u = Ce(t);
          if (!zt(t)) {
            var a = q(n, 3);
            t = tt(t), n = function(f) {
              return a(u[f], f, u);
            };
          }
          var M = e(t, n, l);
          return M > -1 ? u[a ? t[M] : M] : r;
        };
      }
      function fo(e) {
        return tn(function(t) {
          var n = t.length, l = n, u = bt.prototype.thru;
          for (e && t.reverse(); l--; ) {
            var a = t[l];
            if (typeof a != "function")
              throw new Ct(_);
            if (u && !M && tr(a) == "wrapper")
              var M = new bt([], !0);
          }
          for (l = M ? l : n; ++l < n; ) {
            a = t[l];
            var f = tr(a), j = f == "wrapper" ? Mu(a) : r;
            j && gu(j[0]) && j[1] == (k | X | b | pe) && !j[4].length && j[9] == 1 ? M = M[tr(j[0])].apply(M, j[3]) : M = a.length == 1 && gu(a) ? M[f]() : M.thru(a);
          }
          return function() {
            var x = arguments, E = x[0];
            if (M && x.length == 1 && ue(E))
              return M.plant(E).value();
            for (var O = 0, P = n ? t[O].apply(this, x) : E; ++O < n; )
              P = t[O].call(this, P);
            return P;
          };
        });
      }
      function Jl(e, t, n, l, u, a, M, f, j, x) {
        var E = t & k, O = t & W, P = t & F, H = t & (X | ie), J = t & Se, ae = P ? r : pl(e);
        function $() {
          for (var fe = arguments.length, ge = Y(fe), ht = fe; ht--; )
            ge[ht] = arguments[ht];
          if (H)
            var gt = qn($), vt = IM(ge, gt);
          if (l && (ge = io(ge, l, u, H)), a && (ge = oo(ge, a, M, H)), fe -= vt, H && fe < x) {
            var He = gn(ge, gt);
            return po(
              e,
              t,
              Jl,
              $.placeholder,
              n,
              ge,
              He,
              f,
              j,
              x - fe
            );
          }
          var Wt = O ? n : this, un = P ? Wt[e] : e;
          return fe = ge.length, f ? ge = Cf(ge, f) : J && fe > 1 && ge.reverse(), E && j < fe && (ge.length = j), this && this !== ut && this instanceof $ && (un = ae || pl(un)), un.apply(Wt, ge);
        }
        return $;
      }
      function No(e, t) {
        return function(n, l) {
          return Uc(n, e, t(l), {});
        };
      }
      function $l(e, t) {
        return function(n, l) {
          var u;
          if (n === r && l === r)
            return t;
          if (n !== r && (u = n), l !== r) {
            if (u === r)
              return l;
            typeof n == "string" || typeof l == "string" ? (n = At(n), l = At(l)) : (n = $i(n), l = $i(l)), u = e(n, l);
          }
          return u;
        };
      }
      function iu(e) {
        return tn(function(t) {
          return t = ke(t, It(q())), Me(function(n) {
            var l = this;
            return e(t, function(u) {
              return mt(u, l, n);
            });
          });
        });
      }
      function Xl(e, t) {
        t = t === r ? " " : At(t);
        var n = t.length;
        if (n < 2)
          return n ? Xr(t, e) : t;
        var l = Xr(t, Ql(e / Vn(t)));
        return Pn(t) ? yn(Vt(l), 0, e).join("") : l.slice(0, e);
      }
      function gf(e, t, n, l) {
        var u = t & W, a = pl(e);
        function M() {
          for (var f = -1, j = arguments.length, x = -1, E = l.length, O = Y(E + j), P = this && this !== ut && this instanceof M ? a : e; ++x < E; )
            O[x] = l[x];
          for (; j--; )
            O[x++] = arguments[++f];
          return mt(P, u ? n : this, O);
        }
        return M;
      }
      function go(e) {
        return function(t, n, l) {
          return l && typeof l != "number" && Nt(t, n, l) && (n = l = r), t = rn(t), n === r ? (n = t, t = 0) : n = rn(n), l = l === r ? t < n ? 1 : -1 : rn(l), $c(t, n, l, e);
        };
      }
      function er(e) {
        return function(t, n) {
          return typeof t == "string" && typeof n == "string" || (t = kt(t), n = kt(n)), e(t, n);
        };
      }
      function po(e, t, n, l, u, a, M, f, j, x) {
        var E = t & X, O = E ? M : r, P = E ? r : M, H = E ? a : r, J = E ? r : a;
        t |= E ? b : B, t &= ~(E ? B : b), t & Ee || (t &= ~(W | F));
        var ae = [
          e,
          t,
          u,
          H,
          O,
          J,
          P,
          f,
          j,
          x
        ], $ = n.apply(r, ae);
        return gu(e) && vo($, ae), $.placeholder = l, To($, e, t);
      }
      function ou(e) {
        var t = Xe[e];
        return function(n, l) {
          if (n = kt(n), l = l == null ? 0 : at(se(l), 292), l && vi(n)) {
            var u = (Ie(n) + "e").split("e"), a = t(u[0] + "e" + (+u[1] + l));
            return u = (Ie(a) + "e").split("e"), +(u[0] + "e" + (+u[1] - l));
          }
          return t(n);
        };
      }
      var df = Wn && 1 / Tl(new Wn([, -0]))[1] == te ? function(e) {
        return new Wn(e);
      } : Tu;
      function jo(e) {
        return function(t) {
          var n = Mt(t);
          return n == L ? Br(t) : n == $e ? xM(t) : mM(t, e(t));
        };
      }
      function en(e, t, n, l, u, a, M, f) {
        var j = t & F;
        if (!j && typeof e != "function")
          throw new Ct(_);
        var x = l ? l.length : 0;
        if (x || (t &= ~(b | B), l = u = r), M = M === r ? M : et(se(M), 0), f = f === r ? f : se(f), x -= u ? u.length : 0, t & B) {
          var E = l, O = u;
          l = u = r;
        }
        var P = j ? r : Mu(e), H = [
          e,
          t,
          n,
          l,
          u,
          E,
          O,
          a,
          M,
          f
        ];
        if (P && Lf(H, P), e = H[0], t = H[1], n = H[2], l = H[3], u = H[4], f = H[9] = H[9] === r ? j ? 0 : e.length : et(H[9] - x, 0), !f && t & (X | ie) && (t &= ~(X | ie)), !t || t == W)
          var J = ff(e, t, n);
        else
          t == X || t == ie ? J = Nf(e, t, f) : (t == b || t == (W | b)) && !u.length ? J = gf(e, t, n, l) : J = Jl.apply(r, H);
        var ae = P ? qi : vo;
        return To(ae(J, H), e, t);
      }
      function zo(e, t, n, l) {
        return e === r || Rt(e, Rn[n]) && !he.call(l, n) ? t : e;
      }
      function yo(e, t, n, l, u, a) {
        return Qe(e) && Qe(t) && (a.set(t, e), Zl(e, t, r, yo, a), a.delete(t)), e;
      }
      function pf(e) {
        return yl(e) ? r : e;
      }
      function Do(e, t, n, l, u, a) {
        var M = n & S, f = e.length, j = t.length;
        if (f != j && !(M && j > f))
          return !1;
        var x = a.get(e), E = a.get(t);
        if (x && E)
          return x == t && E == e;
        var O = -1, P = !0, H = n & U ? new Ln() : r;
        for (a.set(e, t), a.set(t, e); ++O < f; ) {
          var J = e[O], ae = t[O];
          if (l)
            var $ = M ? l(ae, J, O, t, e, a) : l(J, ae, O, e, t, a);
          if ($ !== r) {
            if ($)
              continue;
            P = !1;
            break;
          }
          if (H) {
            if (!xr(t, function(fe, ge) {
              if (!ul(H, ge) && (J === fe || u(J, fe, n, l, a)))
                return H.push(ge);
            })) {
              P = !1;
              break;
            }
          } else if (!(J === ae || u(J, ae, n, l, a))) {
            P = !1;
            break;
          }
        }
        return a.delete(e), a.delete(t), P;
      }
      function jf(e, t, n, l, u, a, M) {
        switch (n) {
          case pt:
            if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
              return !1;
            e = e.buffer, t = t.buffer;
          case We:
            return !(e.byteLength != t.byteLength || !a(new Ol(e), new Ol(t)));
          case In:
          case cn:
          case re:
            return Rt(+e, +t);
          case An:
            return e.name == t.name && e.message == t.message;
          case lt:
          case Lt:
            return e == t + "";
          case L:
            var f = Br;
          case $e:
            var j = l & S;
            if (f || (f = Tl), e.size != t.size && !j)
              return !1;
            var x = M.get(e);
            if (x)
              return x == t;
            l |= U, M.set(e, t);
            var E = Do(f(e), f(t), l, u, a, M);
            return M.delete(e), E;
          case Gt:
            if (Ml)
              return Ml.call(e) == Ml.call(t);
        }
        return !1;
      }
      function zf(e, t, n, l, u, a) {
        var M = n & S, f = su(e), j = f.length, x = su(t), E = x.length;
        if (j != E && !M)
          return !1;
        for (var O = j; O--; ) {
          var P = f[O];
          if (!(M ? P in t : he.call(t, P)))
            return !1;
        }
        var H = a.get(e), J = a.get(t);
        if (H && J)
          return H == t && J == e;
        var ae = !0;
        a.set(e, t), a.set(t, e);
        for (var $ = M; ++O < j; ) {
          P = f[O];
          var fe = e[P], ge = t[P];
          if (l)
            var ht = M ? l(ge, fe, P, t, e, a) : l(fe, ge, P, e, t, a);
          if (!(ht === r ? fe === ge || u(fe, ge, n, l, a) : ht)) {
            ae = !1;
            break;
          }
          $ || ($ = P == "constructor");
        }
        if (ae && !$) {
          var gt = e.constructor, vt = t.constructor;
          gt != vt && "constructor" in e && "constructor" in t && !(typeof gt == "function" && gt instanceof gt && typeof vt == "function" && vt instanceof vt) && (ae = !1);
        }
        return a.delete(e), a.delete(t), ae;
      }
      function tn(e) {
        return pu(wo(e, r, Oo), e + "");
      }
      function su(e) {
        return Qi(e, tt, fu);
      }
      function au(e) {
        return Qi(e, yt, _o);
      }
      var Mu = Pl ? function(e) {
        return Pl.get(e);
      } : Tu;
      function tr(e) {
        for (var t = e.name + "", n = Gn[t], l = he.call(Gn, t) ? n.length : 0; l--; ) {
          var u = n[l], a = u.func;
          if (a == null || a == e)
            return u.name;
        }
        return t;
      }
      function qn(e) {
        var t = he.call(o, "placeholder") ? o : e;
        return t.placeholder;
      }
      function q() {
        var e = o.iteratee || hu;
        return e = e === hu ? Vi : e, arguments.length ? e(arguments[0], arguments[1]) : e;
      }
      function nr(e, t) {
        var n = e.__data__;
        return wf(t) ? n[typeof t == "string" ? "string" : "hash"] : n.map;
      }
      function cu(e) {
        for (var t = tt(e), n = t.length; n--; ) {
          var l = t[n], u = e[l];
          t[n] = [l, u, Io(u)];
        }
        return t;
      }
      function Cn(e, t) {
        var n = vM(e, t);
        return Pi(n) ? n : r;
      }
      function yf(e) {
        var t = he.call(e, vn), n = e[vn];
        try {
          e[vn] = r;
          var l = !0;
        } catch {
        }
        var u = Cl.call(e);
        return l && (t ? e[vn] = n : delete e[vn]), u;
      }
      var fu = Qr ? function(e) {
        return e == null ? [] : (e = Ce(e), fn(Qr(e), function(t) {
          return wi.call(e, t);
        }));
      } : Lu, _o = Qr ? function(e) {
        for (var t = []; e; )
          Nn(t, fu(e)), e = Sl(e);
        return t;
      } : Lu, Mt = ft;
      (Ur && Mt(new Ur(new ArrayBuffer(1))) != pt || ol && Mt(new ol()) != L || Pr && Mt(Pr.resolve()) != st || Wn && Mt(new Wn()) != $e || sl && Mt(new sl()) != je) && (Mt = function(e) {
        var t = ft(e), n = t == we ? e.constructor : r, l = n ? bn(n) : "";
        if (l)
          switch (l) {
            case ec:
              return pt;
            case tc:
              return L;
            case nc:
              return st;
            case lc:
              return $e;
            case rc:
              return je;
          }
        return t;
      });
      function Df(e, t, n) {
        for (var l = -1, u = n.length; ++l < u; ) {
          var a = n[l], M = a.size;
          switch (a.type) {
            case "drop":
              e += M;
              break;
            case "dropRight":
              t -= M;
              break;
            case "take":
              t = at(t, e + M);
              break;
            case "takeRight":
              e = et(e, t - M);
              break;
          }
        }
        return { start: e, end: t };
      }
      function _f(e) {
        var t = e.match(wa);
        return t ? t[1].split(ha) : [];
      }
      function Yo(e, t, n) {
        t = zn(t, e);
        for (var l = -1, u = t.length, a = !1; ++l < u; ) {
          var M = Kt(t[l]);
          if (!(a = e != null && n(e, M)))
            break;
          e = e[M];
        }
        return a || ++l != u ? a : (u = e == null ? 0 : e.length, !!u && ar(u) && nn(M, u) && (ue(e) || On(e)));
      }
      function Yf(e) {
        var t = e.length, n = new e.constructor(t);
        return t && typeof e[0] == "string" && he.call(e, "index") && (n.index = e.index, n.input = e.input), n;
      }
      function mo(e) {
        return typeof e.constructor == "function" && !jl(e) ? Zn(Sl(e)) : {};
      }
      function mf(e, t, n) {
        var l = e.constructor;
        switch (t) {
          case We:
            return uu(e);
          case In:
          case cn:
            return new l(+e);
          case pt:
            return uf(e, n);
          case ll:
          case rl:
          case Nr:
          case gr:
          case dr:
          case pr:
          case jr:
          case zr:
          case yr:
            return ro(e, n);
          case L:
            return new l();
          case re:
          case Lt:
            return new l(e);
          case lt:
            return of(e);
          case $e:
            return new l();
          case Gt:
            return sf(e);
        }
      }
      function If(e, t) {
        var n = t.length;
        if (!n)
          return e;
        var l = n - 1;
        return t[l] = (n > 1 ? "& " : "") + t[l], t = t.join(n > 2 ? ", " : " "), e.replace(Aa, `{
/* [wrapped with ` + t + `] */
`);
      }
      function Af(e) {
        return ue(e) || On(e) || !!(hi && e && e[hi]);
      }
      function nn(e, t) {
        var n = typeof e;
        return t = t ?? De, !!t && (n == "number" || n != "symbol" && Sa.test(e)) && e > -1 && e % 1 == 0 && e < t;
      }
      function Nt(e, t, n) {
        if (!Qe(n))
          return !1;
        var l = typeof t;
        return (l == "number" ? zt(n) && nn(t, n.length) : l == "string" && t in n) ? Rt(n[t], e) : !1;
      }
      function Nu(e, t) {
        if (ue(e))
          return !1;
        var n = typeof e;
        return n == "number" || n == "symbol" || n == "boolean" || e == null || wt(e) ? !0 : _a.test(e) || !Da.test(e) || t != null && e in Ce(t);
      }
      function wf(e) {
        var t = typeof e;
        return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
      }
      function gu(e) {
        var t = tr(e), n = o[t];
        if (typeof n != "function" || !(t in Ne.prototype))
          return !1;
        if (e === n)
          return !0;
        var l = Mu(n);
        return !!l && e === l[0];
      }
      function hf(e) {
        return !!mi && mi in e;
      }
      var vf = xl ? ln : xu;
      function jl(e) {
        var t = e && e.constructor, n = typeof t == "function" && t.prototype || Rn;
        return e === n;
      }
      function Io(e) {
        return e === e && !Qe(e);
      }
      function Ao(e, t) {
        return function(n) {
          return n == null ? !1 : n[e] === t && (t !== r || e in Ce(n));
        };
      }
      function Tf(e) {
        var t = or(e, function(l) {
          return n.size === c && n.clear(), l;
        }), n = t.cache;
        return t;
      }
      function Lf(e, t) {
        var n = e[1], l = t[1], u = n | l, a = u < (W | F | k), M = l == k && n == X || l == k && n == pe && e[7].length <= t[8] || l == (k | pe) && t[7].length <= t[8] && n == X;
        if (!(a || M))
          return e;
        l & W && (e[2] = t[2], u |= n & W ? 0 : Ee);
        var f = t[3];
        if (f) {
          var j = e[3];
          e[3] = j ? io(j, f, t[4]) : f, e[4] = j ? gn(e[3], D) : t[4];
        }
        return f = t[5], f && (j = e[5], e[5] = j ? oo(j, f, t[6]) : f, e[6] = j ? gn(e[5], D) : t[6]), f = t[7], f && (e[7] = f), l & k && (e[8] = e[8] == null ? t[8] : at(e[8], t[8])), e[9] == null && (e[9] = t[9]), e[0] = t[0], e[1] = u, e;
      }
      function xf(e) {
        var t = [];
        if (e != null)
          for (var n in Ce(e))
            t.push(n);
        return t;
      }
      function Ef(e) {
        return Cl.call(e);
      }
      function wo(e, t, n) {
        return t = et(t === r ? e.length - 1 : t, 0), function() {
          for (var l = arguments, u = -1, a = et(l.length - t, 0), M = Y(a); ++u < a; )
            M[u] = l[t + u];
          u = -1;
          for (var f = Y(t + 1); ++u < t; )
            f[u] = l[u];
          return f[t] = n(M), mt(e, this, f);
        };
      }
      function ho(e, t) {
        return t.length < 2 ? e : En(e, St(t, 0, -1));
      }
      function Cf(e, t) {
        for (var n = e.length, l = at(t.length, n), u = jt(e); l--; ) {
          var a = t[l];
          e[l] = nn(a, n) ? u[a] : r;
        }
        return e;
      }
      function du(e, t) {
        if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
          return e[t];
      }
      var vo = Lo(qi), zl = ZM || function(e, t) {
        return ut.setTimeout(e, t);
      }, pu = Lo(tf);
      function To(e, t, n) {
        var l = t + "";
        return pu(e, If(l, bf(_f(l), n)));
      }
      function Lo(e) {
        var t = 0, n = 0;
        return function() {
          var l = JM(), u = an - (l - n);
          if (n = l, u > 0) {
            if (++t >= sn)
              return arguments[0];
          } else
            t = 0;
          return e.apply(r, arguments);
        };
      }
      function lr(e, t) {
        var n = -1, l = e.length, u = l - 1;
        for (t = t === r ? l : t; ++n < t; ) {
          var a = $r(n, u), M = e[a];
          e[a] = e[n], e[n] = M;
        }
        return e.length = t, e;
      }
      var xo = Tf(function(e) {
        var t = [];
        return e.charCodeAt(0) === 46 && t.push(""), e.replace(Ya, function(n, l, u, a) {
          t.push(u ? a.replace(La, "$1") : l || n);
        }), t;
      });
      function Kt(e) {
        if (typeof e == "string" || wt(e))
          return e;
        var t = e + "";
        return t == "0" && 1 / e == -te ? "-0" : t;
      }
      function bn(e) {
        if (e != null) {
          try {
            return El.call(e);
          } catch {
          }
          try {
            return e + "";
          } catch {
          }
        }
        return "";
      }
      function bf(e, t) {
        return Et(mn, function(n) {
          var l = "_." + n[0];
          t & n[1] && !hl(e, l) && e.push(l);
        }), e.sort();
      }
      function Eo(e) {
        if (e instanceof Ne)
          return e.clone();
        var t = new bt(e.__wrapped__, e.__chain__);
        return t.__actions__ = jt(e.__actions__), t.__index__ = e.__index__, t.__values__ = e.__values__, t;
      }
      function Of(e, t, n) {
        (n ? Nt(e, t, n) : t === r) ? t = 1 : t = et(se(t), 0);
        var l = e == null ? 0 : e.length;
        if (!l || t < 1)
          return [];
        for (var u = 0, a = 0, M = Y(Ql(l / t)); u < l; )
          M[a++] = St(e, u, u += t);
        return M;
      }
      function Sf(e) {
        for (var t = -1, n = e == null ? 0 : e.length, l = 0, u = []; ++t < n; ) {
          var a = e[t];
          a && (u[l++] = a);
        }
        return u;
      }
      function Bf() {
        var e = arguments.length;
        if (!e)
          return [];
        for (var t = Y(e - 1), n = arguments[0], l = e; l--; )
          t[l - 1] = arguments[l];
        return Nn(ue(n) ? jt(n) : [n], it(t, 1));
      }
      var kf = Me(function(e, t) {
        return Ze(e) ? fl(e, it(t, 1, Ze, !0)) : [];
      }), Qf = Me(function(e, t) {
        var n = Bt(t);
        return Ze(n) && (n = r), Ze(e) ? fl(e, it(t, 1, Ze, !0), q(n, 2)) : [];
      }), Uf = Me(function(e, t) {
        var n = Bt(t);
        return Ze(n) && (n = r), Ze(e) ? fl(e, it(t, 1, Ze, !0), r, n) : [];
      });
      function Pf(e, t, n) {
        var l = e == null ? 0 : e.length;
        return l ? (t = n || t === r ? 1 : se(t), St(e, t < 0 ? 0 : t, l)) : [];
      }
      function Vf(e, t, n) {
        var l = e == null ? 0 : e.length;
        return l ? (t = n || t === r ? 1 : se(t), t = l - t, St(e, 0, t < 0 ? 0 : t)) : [];
      }
      function Ff(e, t) {
        return e && e.length ? Kl(e, q(t, 3), !0, !0) : [];
      }
      function Rf(e, t) {
        return e && e.length ? Kl(e, q(t, 3), !0) : [];
      }
      function Wf(e, t, n, l) {
        var u = e == null ? 0 : e.length;
        return u ? (n && typeof n != "number" && Nt(e, t, n) && (n = 0, l = u), Sc(e, t, n, l)) : [];
      }
      function Co(e, t, n) {
        var l = e == null ? 0 : e.length;
        if (!l)
          return -1;
        var u = n == null ? 0 : se(n);
        return u < 0 && (u = et(l + u, 0)), vl(e, q(t, 3), u);
      }
      function bo(e, t, n) {
        var l = e == null ? 0 : e.length;
        if (!l)
          return -1;
        var u = l - 1;
        return n !== r && (u = se(n), u = n < 0 ? et(l + u, 0) : at(u, l - 1)), vl(e, q(t, 3), u, !0);
      }
      function Oo(e) {
        var t = e == null ? 0 : e.length;
        return t ? it(e, 1) : [];
      }
      function Gf(e) {
        var t = e == null ? 0 : e.length;
        return t ? it(e, te) : [];
      }
      function Zf(e, t) {
        var n = e == null ? 0 : e.length;
        return n ? (t = t === r ? 1 : se(t), it(e, t)) : [];
      }
      function Hf(e) {
        for (var t = -1, n = e == null ? 0 : e.length, l = {}; ++t < n; ) {
          var u = e[t];
          l[u[0]] = u[1];
        }
        return l;
      }
      function So(e) {
        return e && e.length ? e[0] : r;
      }
      function Kf(e, t, n) {
        var l = e == null ? 0 : e.length;
        if (!l)
          return -1;
        var u = n == null ? 0 : se(n);
        return u < 0 && (u = et(l + u, 0)), Un(e, t, u);
      }
      function qf(e) {
        var t = e == null ? 0 : e.length;
        return t ? St(e, 0, -1) : [];
      }
      var Jf = Me(function(e) {
        var t = ke(e, lu);
        return t.length && t[0] === e[0] ? Zr(t) : [];
      }), $f = Me(function(e) {
        var t = Bt(e), n = ke(e, lu);
        return t === Bt(n) ? t = r : n.pop(), n.length && n[0] === e[0] ? Zr(n, q(t, 2)) : [];
      }), Xf = Me(function(e) {
        var t = Bt(e), n = ke(e, lu);
        return t = typeof t == "function" ? t : r, t && n.pop(), n.length && n[0] === e[0] ? Zr(n, r, t) : [];
      });
      function eN(e, t) {
        return e == null ? "" : KM.call(e, t);
      }
      function Bt(e) {
        var t = e == null ? 0 : e.length;
        return t ? e[t - 1] : r;
      }
      function tN(e, t, n) {
        var l = e == null ? 0 : e.length;
        if (!l)
          return -1;
        var u = l;
        return n !== r && (u = se(n), u = u < 0 ? et(l + u, 0) : at(u, l - 1)), t === t ? CM(e, t, u) : vl(e, di, u, !0);
      }
      function nN(e, t) {
        return e && e.length ? Gi(e, se(t)) : r;
      }
      var lN = Me(Bo);
      function Bo(e, t) {
        return e && e.length && t && t.length ? Jr(e, t) : e;
      }
      function rN(e, t, n) {
        return e && e.length && t && t.length ? Jr(e, t, q(n, 2)) : e;
      }
      function uN(e, t, n) {
        return e && e.length && t && t.length ? Jr(e, t, r, n) : e;
      }
      var iN = tn(function(e, t) {
        var n = e == null ? 0 : e.length, l = Fr(e, t);
        return Ki(e, ke(t, function(u) {
          return nn(u, n) ? +u : u;
        }).sort(uo)), l;
      });
      function oN(e, t) {
        var n = [];
        if (!(e && e.length))
          return n;
        var l = -1, u = [], a = e.length;
        for (t = q(t, 3); ++l < a; ) {
          var M = e[l];
          t(M, l, e) && (n.push(M), u.push(l));
        }
        return Ki(e, u), n;
      }
      function ju(e) {
        return e == null ? e : XM.call(e);
      }
      function sN(e, t, n) {
        var l = e == null ? 0 : e.length;
        return l ? (n && typeof n != "number" && Nt(e, t, n) ? (t = 0, n = l) : (t = t == null ? 0 : se(t), n = n === r ? l : se(n)), St(e, t, n)) : [];
      }
      function aN(e, t) {
        return Hl(e, t);
      }
      function MN(e, t, n) {
        return eu(e, t, q(n, 2));
      }
      function cN(e, t) {
        var n = e == null ? 0 : e.length;
        if (n) {
          var l = Hl(e, t);
          if (l < n && Rt(e[l], t))
            return l;
        }
        return -1;
      }
      function fN(e, t) {
        return Hl(e, t, !0);
      }
      function NN(e, t, n) {
        return eu(e, t, q(n, 2), !0);
      }
      function gN(e, t) {
        var n = e == null ? 0 : e.length;
        if (n) {
          var l = Hl(e, t, !0) - 1;
          if (Rt(e[l], t))
            return l;
        }
        return -1;
      }
      function dN(e) {
        return e && e.length ? Ji(e) : [];
      }
      function pN(e, t) {
        return e && e.length ? Ji(e, q(t, 2)) : [];
      }
      function jN(e) {
        var t = e == null ? 0 : e.length;
        return t ? St(e, 1, t) : [];
      }
      function zN(e, t, n) {
        return e && e.length ? (t = n || t === r ? 1 : se(t), St(e, 0, t < 0 ? 0 : t)) : [];
      }
      function yN(e, t, n) {
        var l = e == null ? 0 : e.length;
        return l ? (t = n || t === r ? 1 : se(t), t = l - t, St(e, t < 0 ? 0 : t, l)) : [];
      }
      function DN(e, t) {
        return e && e.length ? Kl(e, q(t, 3), !1, !0) : [];
      }
      function _N(e, t) {
        return e && e.length ? Kl(e, q(t, 3)) : [];
      }
      var YN = Me(function(e) {
        return jn(it(e, 1, Ze, !0));
      }), mN = Me(function(e) {
        var t = Bt(e);
        return Ze(t) && (t = r), jn(it(e, 1, Ze, !0), q(t, 2));
      }), IN = Me(function(e) {
        var t = Bt(e);
        return t = typeof t == "function" ? t : r, jn(it(e, 1, Ze, !0), r, t);
      });
      function AN(e) {
        return e && e.length ? jn(e) : [];
      }
      function wN(e, t) {
        return e && e.length ? jn(e, q(t, 2)) : [];
      }
      function hN(e, t) {
        return t = typeof t == "function" ? t : r, e && e.length ? jn(e, r, t) : [];
      }
      function zu(e) {
        if (!(e && e.length))
          return [];
        var t = 0;
        return e = fn(e, function(n) {
          if (Ze(n))
            return t = et(n.length, t), !0;
        }), Or(t, function(n) {
          return ke(e, Er(n));
        });
      }
      function ko(e, t) {
        if (!(e && e.length))
          return [];
        var n = zu(e);
        return t == null ? n : ke(n, function(l) {
          return mt(t, r, l);
        });
      }
      var vN = Me(function(e, t) {
        return Ze(e) ? fl(e, t) : [];
      }), TN = Me(function(e) {
        return nu(fn(e, Ze));
      }), LN = Me(function(e) {
        var t = Bt(e);
        return Ze(t) && (t = r), nu(fn(e, Ze), q(t, 2));
      }), xN = Me(function(e) {
        var t = Bt(e);
        return t = typeof t == "function" ? t : r, nu(fn(e, Ze), r, t);
      }), EN = Me(zu);
      function CN(e, t) {
        return to(e || [], t || [], cl);
      }
      function bN(e, t) {
        return to(e || [], t || [], dl);
      }
      var ON = Me(function(e) {
        var t = e.length, n = t > 1 ? e[t - 1] : r;
        return n = typeof n == "function" ? (e.pop(), n) : r, ko(e, n);
      });
      function Qo(e) {
        var t = o(e);
        return t.__chain__ = !0, t;
      }
      function SN(e, t) {
        return t(e), e;
      }
      function rr(e, t) {
        return t(e);
      }
      var BN = tn(function(e) {
        var t = e.length, n = t ? e[0] : 0, l = this.__wrapped__, u = function(a) {
          return Fr(a, e);
        };
        return t > 1 || this.__actions__.length || !(l instanceof Ne) || !nn(n) ? this.thru(u) : (l = l.slice(n, +n + (t ? 1 : 0)), l.__actions__.push({
          func: rr,
          args: [u],
          thisArg: r
        }), new bt(l, this.__chain__).thru(function(a) {
          return t && !a.length && a.push(r), a;
        }));
      });
      function kN() {
        return Qo(this);
      }
      function QN() {
        return new bt(this.value(), this.__chain__);
      }
      function UN() {
        this.__values__ === r && (this.__values__ = Xo(this.value()));
        var e = this.__index__ >= this.__values__.length, t = e ? r : this.__values__[this.__index__++];
        return { done: e, value: t };
      }
      function PN() {
        return this;
      }
      function VN(e) {
        for (var t, n = this; n instanceof Fl; ) {
          var l = Eo(n);
          l.__index__ = 0, l.__values__ = r, t ? u.__wrapped__ = l : t = l;
          var u = l;
          n = n.__wrapped__;
        }
        return u.__wrapped__ = e, t;
      }
      function FN() {
        var e = this.__wrapped__;
        if (e instanceof Ne) {
          var t = e;
          return this.__actions__.length && (t = new Ne(this)), t = t.reverse(), t.__actions__.push({
            func: rr,
            args: [ju],
            thisArg: r
          }), new bt(t, this.__chain__);
        }
        return this.thru(ju);
      }
      function RN() {
        return eo(this.__wrapped__, this.__actions__);
      }
      var WN = ql(function(e, t, n) {
        he.call(e, n) ? ++e[n] : Xt(e, n, 1);
      });
      function GN(e, t, n) {
        var l = ue(e) ? Ni : Oc;
        return n && Nt(e, t, n) && (t = r), l(e, q(t, 3));
      }
      function ZN(e, t) {
        var n = ue(e) ? fn : Bi;
        return n(e, q(t, 3));
      }
      var HN = co(Co), KN = co(bo);
      function qN(e, t) {
        return it(ur(e, t), 1);
      }
      function JN(e, t) {
        return it(ur(e, t), te);
      }
      function $N(e, t, n) {
        return n = n === r ? 1 : se(n), it(ur(e, t), n);
      }
      function Uo(e, t) {
        var n = ue(e) ? Et : pn;
        return n(e, q(t, 3));
      }
      function Po(e, t) {
        var n = ue(e) ? pM : Si;
        return n(e, q(t, 3));
      }
      var XN = ql(function(e, t, n) {
        he.call(e, n) ? e[n].push(t) : Xt(e, n, [t]);
      });
      function eg(e, t, n, l) {
        e = zt(e) ? e : $n(e), n = n && !l ? se(n) : 0;
        var u = e.length;
        return n < 0 && (n = et(u + n, 0)), Mr(e) ? n <= u && e.indexOf(t, n) > -1 : !!u && Un(e, t, n) > -1;
      }
      var tg = Me(function(e, t, n) {
        var l = -1, u = typeof t == "function", a = zt(e) ? Y(e.length) : [];
        return pn(e, function(M) {
          a[++l] = u ? mt(t, M, n) : Nl(M, t, n);
        }), a;
      }), ng = ql(function(e, t, n) {
        Xt(e, n, t);
      });
      function ur(e, t) {
        var n = ue(e) ? ke : Fi;
        return n(e, q(t, 3));
      }
      function lg(e, t, n, l) {
        return e == null ? [] : (ue(t) || (t = t == null ? [] : [t]), n = l ? r : n, ue(n) || (n = n == null ? [] : [n]), Zi(e, t, n));
      }
      var rg = ql(function(e, t, n) {
        e[n ? 0 : 1].push(t);
      }, function() {
        return [[], []];
      });
      function ug(e, t, n) {
        var l = ue(e) ? Lr : ji, u = arguments.length < 3;
        return l(e, q(t, 4), n, u, pn);
      }
      function ig(e, t, n) {
        var l = ue(e) ? jM : ji, u = arguments.length < 3;
        return l(e, q(t, 4), n, u, Si);
      }
      function og(e, t) {
        var n = ue(e) ? fn : Bi;
        return n(e, sr(q(t, 3)));
      }
      function sg(e) {
        var t = ue(e) ? Ei : Xc;
        return t(e);
      }
      function ag(e, t, n) {
        (n ? Nt(e, t, n) : t === r) ? t = 1 : t = se(t);
        var l = ue(e) ? Lc : ef;
        return l(e, t);
      }
      function Mg(e) {
        var t = ue(e) ? xc : nf;
        return t(e);
      }
      function cg(e) {
        if (e == null)
          return 0;
        if (zt(e))
          return Mr(e) ? Vn(e) : e.length;
        var t = Mt(e);
        return t == L || t == $e ? e.size : Kr(e).length;
      }
      function fg(e, t, n) {
        var l = ue(e) ? xr : lf;
        return n && Nt(e, t, n) && (t = r), l(e, q(t, 3));
      }
      var Ng = Me(function(e, t) {
        if (e == null)
          return [];
        var n = t.length;
        return n > 1 && Nt(e, t[0], t[1]) ? t = [] : n > 2 && Nt(t[0], t[1], t[2]) && (t = [t[0]]), Zi(e, it(t, 1), []);
      }), ir = GM || function() {
        return ut.Date.now();
      };
      function gg(e, t) {
        if (typeof t != "function")
          throw new Ct(_);
        return e = se(e), function() {
          if (--e < 1)
            return t.apply(this, arguments);
        };
      }
      function Vo(e, t, n) {
        return t = n ? r : t, t = e && t == null ? e.length : t, en(e, k, r, r, r, r, t);
      }
      function Fo(e, t) {
        var n;
        if (typeof t != "function")
          throw new Ct(_);
        return e = se(e), function() {
          return --e > 0 && (n = t.apply(this, arguments)), e <= 1 && (t = r), n;
        };
      }
      var yu = Me(function(e, t, n) {
        var l = W;
        if (n.length) {
          var u = gn(n, qn(yu));
          l |= b;
        }
        return en(e, l, t, n, u);
      }), Ro = Me(function(e, t, n) {
        var l = W | F;
        if (n.length) {
          var u = gn(n, qn(Ro));
          l |= b;
        }
        return en(t, l, e, n, u);
      });
      function Wo(e, t, n) {
        t = n ? r : t;
        var l = en(e, X, r, r, r, r, r, t);
        return l.placeholder = Wo.placeholder, l;
      }
      function Go(e, t, n) {
        t = n ? r : t;
        var l = en(e, ie, r, r, r, r, r, t);
        return l.placeholder = Go.placeholder, l;
      }
      function Zo(e, t, n) {
        var l, u, a, M, f, j, x = 0, E = !1, O = !1, P = !0;
        if (typeof e != "function")
          throw new Ct(_);
        t = kt(t) || 0, Qe(n) && (E = !!n.leading, O = "maxWait" in n, a = O ? et(kt(n.maxWait) || 0, t) : a, P = "trailing" in n ? !!n.trailing : P);
        function H(He) {
          var Wt = l, un = u;
          return l = u = r, x = He, M = e.apply(un, Wt), M;
        }
        function J(He) {
          return x = He, f = zl(fe, t), E ? H(He) : M;
        }
        function ae(He) {
          var Wt = He - j, un = He - x, fs = t - Wt;
          return O ? at(fs, a - un) : fs;
        }
        function $(He) {
          var Wt = He - j, un = He - x;
          return j === r || Wt >= t || Wt < 0 || O && un >= a;
        }
        function fe() {
          var He = ir();
          if ($(He))
            return ge(He);
          f = zl(fe, ae(He));
        }
        function ge(He) {
          return f = r, P && l ? H(He) : (l = u = r, M);
        }
        function ht() {
          f !== r && no(f), x = 0, l = j = u = f = r;
        }
        function gt() {
          return f === r ? M : ge(ir());
        }
        function vt() {
          var He = ir(), Wt = $(He);
          if (l = arguments, u = this, j = He, Wt) {
            if (f === r)
              return J(j);
            if (O)
              return no(f), f = zl(fe, t), H(j);
          }
          return f === r && (f = zl(fe, t)), M;
        }
        return vt.cancel = ht, vt.flush = gt, vt;
      }
      var dg = Me(function(e, t) {
        return Oi(e, 1, t);
      }), pg = Me(function(e, t, n) {
        return Oi(e, kt(t) || 0, n);
      });
      function jg(e) {
        return en(e, Se);
      }
      function or(e, t) {
        if (typeof e != "function" || t != null && typeof t != "function")
          throw new Ct(_);
        var n = function() {
          var l = arguments, u = t ? t.apply(this, l) : l[0], a = n.cache;
          if (a.has(u))
            return a.get(u);
          var M = e.apply(this, l);
          return n.cache = a.set(u, M) || a, M;
        };
        return n.cache = new (or.Cache || $t)(), n;
      }
      or.Cache = $t;
      function sr(e) {
        if (typeof e != "function")
          throw new Ct(_);
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
      function zg(e) {
        return Fo(2, e);
      }
      var yg = rf(function(e, t) {
        t = t.length == 1 && ue(t[0]) ? ke(t[0], It(q())) : ke(it(t, 1), It(q()));
        var n = t.length;
        return Me(function(l) {
          for (var u = -1, a = at(l.length, n); ++u < a; )
            l[u] = t[u].call(this, l[u]);
          return mt(e, this, l);
        });
      }), Du = Me(function(e, t) {
        var n = gn(t, qn(Du));
        return en(e, b, r, t, n);
      }), Ho = Me(function(e, t) {
        var n = gn(t, qn(Ho));
        return en(e, B, r, t, n);
      }), Dg = tn(function(e, t) {
        return en(e, pe, r, r, r, t);
      });
      function _g(e, t) {
        if (typeof e != "function")
          throw new Ct(_);
        return t = t === r ? t : se(t), Me(e, t);
      }
      function Yg(e, t) {
        if (typeof e != "function")
          throw new Ct(_);
        return t = t == null ? 0 : et(se(t), 0), Me(function(n) {
          var l = n[t], u = yn(n, 0, t);
          return l && Nn(u, l), mt(e, this, u);
        });
      }
      function mg(e, t, n) {
        var l = !0, u = !0;
        if (typeof e != "function")
          throw new Ct(_);
        return Qe(n) && (l = "leading" in n ? !!n.leading : l, u = "trailing" in n ? !!n.trailing : u), Zo(e, t, {
          leading: l,
          maxWait: t,
          trailing: u
        });
      }
      function Ig(e) {
        return Vo(e, 1);
      }
      function Ag(e, t) {
        return Du(ru(t), e);
      }
      function wg() {
        if (!arguments.length)
          return [];
        var e = arguments[0];
        return ue(e) ? e : [e];
      }
      function hg(e) {
        return Ot(e, C);
      }
      function vg(e, t) {
        return t = typeof t == "function" ? t : r, Ot(e, C, t);
      }
      function Tg(e) {
        return Ot(e, A | C);
      }
      function Lg(e, t) {
        return t = typeof t == "function" ? t : r, Ot(e, A | C, t);
      }
      function xg(e, t) {
        return t == null || bi(e, t, tt(t));
      }
      function Rt(e, t) {
        return e === t || e !== e && t !== t;
      }
      var Eg = er(Gr), Cg = er(function(e, t) {
        return e >= t;
      }), On = Ui(function() {
        return arguments;
      }()) ? Ui : function(e) {
        return Ge(e) && he.call(e, "callee") && !wi.call(e, "callee");
      }, ue = Y.isArray, bg = oi ? It(oi) : Pc;
      function zt(e) {
        return e != null && ar(e.length) && !ln(e);
      }
      function Ze(e) {
        return Ge(e) && zt(e);
      }
      function Og(e) {
        return e === !0 || e === !1 || Ge(e) && ft(e) == In;
      }
      var Dn = HM || xu, Sg = si ? It(si) : Vc;
      function Bg(e) {
        return Ge(e) && e.nodeType === 1 && !yl(e);
      }
      function kg(e) {
        if (e == null)
          return !0;
        if (zt(e) && (ue(e) || typeof e == "string" || typeof e.splice == "function" || Dn(e) || Jn(e) || On(e)))
          return !e.length;
        var t = Mt(e);
        if (t == L || t == $e)
          return !e.size;
        if (jl(e))
          return !Kr(e).length;
        for (var n in e)
          if (he.call(e, n))
            return !1;
        return !0;
      }
      function Qg(e, t) {
        return gl(e, t);
      }
      function Ug(e, t, n) {
        n = typeof n == "function" ? n : r;
        var l = n ? n(e, t) : r;
        return l === r ? gl(e, t, r, n) : !!l;
      }
      function _u(e) {
        if (!Ge(e))
          return !1;
        var t = ft(e);
        return t == An || t == ml || typeof e.message == "string" && typeof e.name == "string" && !yl(e);
      }
      function Pg(e) {
        return typeof e == "number" && vi(e);
      }
      function ln(e) {
        if (!Qe(e))
          return !1;
        var t = ft(e);
        return t == wn || t == nl || t == Bn || t == dt;
      }
      function Ko(e) {
        return typeof e == "number" && e == se(e);
      }
      function ar(e) {
        return typeof e == "number" && e > -1 && e % 1 == 0 && e <= De;
      }
      function Qe(e) {
        var t = typeof e;
        return e != null && (t == "object" || t == "function");
      }
      function Ge(e) {
        return e != null && typeof e == "object";
      }
      var qo = ai ? It(ai) : Rc;
      function Vg(e, t) {
        return e === t || Hr(e, t, cu(t));
      }
      function Fg(e, t, n) {
        return n = typeof n == "function" ? n : r, Hr(e, t, cu(t), n);
      }
      function Rg(e) {
        return Jo(e) && e != +e;
      }
      function Wg(e) {
        if (vf(e))
          throw new le(y);
        return Pi(e);
      }
      function Gg(e) {
        return e === null;
      }
      function Zg(e) {
        return e == null;
      }
      function Jo(e) {
        return typeof e == "number" || Ge(e) && ft(e) == re;
      }
      function yl(e) {
        if (!Ge(e) || ft(e) != we)
          return !1;
        var t = Sl(e);
        if (t === null)
          return !0;
        var n = he.call(t, "constructor") && t.constructor;
        return typeof n == "function" && n instanceof n && El.call(n) == VM;
      }
      var Yu = Mi ? It(Mi) : Wc;
      function Hg(e) {
        return Ko(e) && e >= -De && e <= De;
      }
      var $o = ci ? It(ci) : Gc;
      function Mr(e) {
        return typeof e == "string" || !ue(e) && Ge(e) && ft(e) == Lt;
      }
      function wt(e) {
        return typeof e == "symbol" || Ge(e) && ft(e) == Gt;
      }
      var Jn = fi ? It(fi) : Zc;
      function Kg(e) {
        return e === r;
      }
      function qg(e) {
        return Ge(e) && Mt(e) == je;
      }
      function Jg(e) {
        return Ge(e) && ft(e) == rt;
      }
      var $g = er(qr), Xg = er(function(e, t) {
        return e <= t;
      });
      function Xo(e) {
        if (!e)
          return [];
        if (zt(e))
          return Mr(e) ? Vt(e) : jt(e);
        if (il && e[il])
          return LM(e[il]());
        var t = Mt(e), n = t == L ? Br : t == $e ? Tl : $n;
        return n(e);
      }
      function rn(e) {
        if (!e)
          return e === 0 ? e : 0;
        if (e = kt(e), e === te || e === -te) {
          var t = e < 0 ? -1 : 1;
          return t * Pt;
        }
        return e === e ? e : 0;
      }
      function se(e) {
        var t = rn(e), n = t % 1;
        return t === t ? n ? t - n : t : 0;
      }
      function es(e) {
        return e ? xn(se(e), 0, Re) : 0;
      }
      function kt(e) {
        if (typeof e == "number")
          return e;
        if (wt(e))
          return nt;
        if (Qe(e)) {
          var t = typeof e.valueOf == "function" ? e.valueOf() : e;
          e = Qe(t) ? t + "" : t;
        }
        if (typeof e != "string")
          return e === 0 ? e : +e;
        e = zi(e);
        var n = Ca.test(e);
        return n || Oa.test(e) ? NM(e.slice(2), n ? 2 : 8) : Ea.test(e) ? nt : +e;
      }
      function ts(e) {
        return Ht(e, yt(e));
      }
      function ed(e) {
        return e ? xn(se(e), -De, De) : e === 0 ? e : 0;
      }
      function Ie(e) {
        return e == null ? "" : At(e);
      }
      var td = Hn(function(e, t) {
        if (jl(t) || zt(t)) {
          Ht(t, tt(t), e);
          return;
        }
        for (var n in t)
          he.call(t, n) && cl(e, n, t[n]);
      }), ns = Hn(function(e, t) {
        Ht(t, yt(t), e);
      }), cr = Hn(function(e, t, n, l) {
        Ht(t, yt(t), e, l);
      }), nd = Hn(function(e, t, n, l) {
        Ht(t, tt(t), e, l);
      }), ld = tn(Fr);
      function rd(e, t) {
        var n = Zn(e);
        return t == null ? n : Ci(n, t);
      }
      var ud = Me(function(e, t) {
        e = Ce(e);
        var n = -1, l = t.length, u = l > 2 ? t[2] : r;
        for (u && Nt(t[0], t[1], u) && (l = 1); ++n < l; )
          for (var a = t[n], M = yt(a), f = -1, j = M.length; ++f < j; ) {
            var x = M[f], E = e[x];
            (E === r || Rt(E, Rn[x]) && !he.call(e, x)) && (e[x] = a[x]);
          }
        return e;
      }), id = Me(function(e) {
        return e.push(r, yo), mt(ls, r, e);
      });
      function od(e, t) {
        return gi(e, q(t, 3), Zt);
      }
      function sd(e, t) {
        return gi(e, q(t, 3), Wr);
      }
      function ad(e, t) {
        return e == null ? e : Rr(e, q(t, 3), yt);
      }
      function Md(e, t) {
        return e == null ? e : ki(e, q(t, 3), yt);
      }
      function cd(e, t) {
        return e && Zt(e, q(t, 3));
      }
      function fd(e, t) {
        return e && Wr(e, q(t, 3));
      }
      function Nd(e) {
        return e == null ? [] : Gl(e, tt(e));
      }
      function gd(e) {
        return e == null ? [] : Gl(e, yt(e));
      }
      function mu(e, t, n) {
        var l = e == null ? r : En(e, t);
        return l === r ? n : l;
      }
      function dd(e, t) {
        return e != null && Yo(e, t, Bc);
      }
      function Iu(e, t) {
        return e != null && Yo(e, t, kc);
      }
      var pd = No(function(e, t, n) {
        t != null && typeof t.toString != "function" && (t = Cl.call(t)), e[t] = n;
      }, wu(Dt)), jd = No(function(e, t, n) {
        t != null && typeof t.toString != "function" && (t = Cl.call(t)), he.call(e, t) ? e[t].push(n) : e[t] = [n];
      }, q), zd = Me(Nl);
      function tt(e) {
        return zt(e) ? xi(e) : Kr(e);
      }
      function yt(e) {
        return zt(e) ? xi(e, !0) : Hc(e);
      }
      function yd(e, t) {
        var n = {};
        return t = q(t, 3), Zt(e, function(l, u, a) {
          Xt(n, t(l, u, a), l);
        }), n;
      }
      function Dd(e, t) {
        var n = {};
        return t = q(t, 3), Zt(e, function(l, u, a) {
          Xt(n, u, t(l, u, a));
        }), n;
      }
      var _d = Hn(function(e, t, n) {
        Zl(e, t, n);
      }), ls = Hn(function(e, t, n, l) {
        Zl(e, t, n, l);
      }), Yd = tn(function(e, t) {
        var n = {};
        if (e == null)
          return n;
        var l = !1;
        t = ke(t, function(a) {
          return a = zn(a, e), l || (l = a.length > 1), a;
        }), Ht(e, au(e), n), l && (n = Ot(n, A | h | C, pf));
        for (var u = t.length; u--; )
          tu(n, t[u]);
        return n;
      });
      function md(e, t) {
        return rs(e, sr(q(t)));
      }
      var Id = tn(function(e, t) {
        return e == null ? {} : qc(e, t);
      });
      function rs(e, t) {
        if (e == null)
          return {};
        var n = ke(au(e), function(l) {
          return [l];
        });
        return t = q(t), Hi(e, n, function(l, u) {
          return t(l, u[0]);
        });
      }
      function Ad(e, t, n) {
        t = zn(t, e);
        var l = -1, u = t.length;
        for (u || (u = 1, e = r); ++l < u; ) {
          var a = e == null ? r : e[Kt(t[l])];
          a === r && (l = u, a = n), e = ln(a) ? a.call(e) : a;
        }
        return e;
      }
      function wd(e, t, n) {
        return e == null ? e : dl(e, t, n);
      }
      function hd(e, t, n, l) {
        return l = typeof l == "function" ? l : r, e == null ? e : dl(e, t, n, l);
      }
      var us = jo(tt), is = jo(yt);
      function vd(e, t, n) {
        var l = ue(e), u = l || Dn(e) || Jn(e);
        if (t = q(t, 4), n == null) {
          var a = e && e.constructor;
          u ? n = l ? new a() : [] : Qe(e) ? n = ln(a) ? Zn(Sl(e)) : {} : n = {};
        }
        return (u ? Et : Zt)(e, function(M, f, j) {
          return t(n, M, f, j);
        }), n;
      }
      function Td(e, t) {
        return e == null ? !0 : tu(e, t);
      }
      function Ld(e, t, n) {
        return e == null ? e : Xi(e, t, ru(n));
      }
      function xd(e, t, n, l) {
        return l = typeof l == "function" ? l : r, e == null ? e : Xi(e, t, ru(n), l);
      }
      function $n(e) {
        return e == null ? [] : Sr(e, tt(e));
      }
      function Ed(e) {
        return e == null ? [] : Sr(e, yt(e));
      }
      function Cd(e, t, n) {
        return n === r && (n = t, t = r), n !== r && (n = kt(n), n = n === n ? n : 0), t !== r && (t = kt(t), t = t === t ? t : 0), xn(kt(e), t, n);
      }
      function bd(e, t, n) {
        return t = rn(t), n === r ? (n = t, t = 0) : n = rn(n), e = kt(e), Qc(e, t, n);
      }
      function Od(e, t, n) {
        if (n && typeof n != "boolean" && Nt(e, t, n) && (t = n = r), n === r && (typeof t == "boolean" ? (n = t, t = r) : typeof e == "boolean" && (n = e, e = r)), e === r && t === r ? (e = 0, t = 1) : (e = rn(e), t === r ? (t = e, e = 0) : t = rn(t)), e > t) {
          var l = e;
          e = t, t = l;
        }
        if (n || e % 1 || t % 1) {
          var u = Ti();
          return at(e + u * (t - e + fM("1e-" + ((u + "").length - 1))), t);
        }
        return $r(e, t);
      }
      var Sd = Kn(function(e, t, n) {
        return t = t.toLowerCase(), e + (n ? os(t) : t);
      });
      function os(e) {
        return Au(Ie(e).toLowerCase());
      }
      function ss(e) {
        return e = Ie(e), e && e.replace(Ba, AM).replace(nM, "");
      }
      function Bd(e, t, n) {
        e = Ie(e), t = At(t);
        var l = e.length;
        n = n === r ? l : xn(se(n), 0, l);
        var u = n;
        return n -= t.length, n >= 0 && e.slice(n, u) == t;
      }
      function kd(e) {
        return e = Ie(e), e && ja.test(e) ? e.replace(ku, wM) : e;
      }
      function Qd(e) {
        return e = Ie(e), e && ma.test(e) ? e.replace(Dr, "\\$&") : e;
      }
      var Ud = Kn(function(e, t, n) {
        return e + (n ? "-" : "") + t.toLowerCase();
      }), Pd = Kn(function(e, t, n) {
        return e + (n ? " " : "") + t.toLowerCase();
      }), Vd = Mo("toLowerCase");
      function Fd(e, t, n) {
        e = Ie(e), t = se(t);
        var l = t ? Vn(e) : 0;
        if (!t || l >= t)
          return e;
        var u = (t - l) / 2;
        return Xl(Ul(u), n) + e + Xl(Ql(u), n);
      }
      function Rd(e, t, n) {
        e = Ie(e), t = se(t);
        var l = t ? Vn(e) : 0;
        return t && l < t ? e + Xl(t - l, n) : e;
      }
      function Wd(e, t, n) {
        e = Ie(e), t = se(t);
        var l = t ? Vn(e) : 0;
        return t && l < t ? Xl(t - l, n) + e : e;
      }
      function Gd(e, t, n) {
        return n || t == null ? t = 0 : t && (t = +t), $M(Ie(e).replace(_r, ""), t || 0);
      }
      function Zd(e, t, n) {
        return (n ? Nt(e, t, n) : t === r) ? t = 1 : t = se(t), Xr(Ie(e), t);
      }
      function Hd() {
        var e = arguments, t = Ie(e[0]);
        return e.length < 3 ? t : t.replace(e[1], e[2]);
      }
      var Kd = Kn(function(e, t, n) {
        return e + (n ? "_" : "") + t.toLowerCase();
      });
      function qd(e, t, n) {
        return n && typeof n != "number" && Nt(e, t, n) && (t = n = r), n = n === r ? Re : n >>> 0, n ? (e = Ie(e), e && (typeof t == "string" || t != null && !Yu(t)) && (t = At(t), !t && Pn(e)) ? yn(Vt(e), 0, n) : e.split(t, n)) : [];
      }
      var Jd = Kn(function(e, t, n) {
        return e + (n ? " " : "") + Au(t);
      });
      function $d(e, t, n) {
        return e = Ie(e), n = n == null ? 0 : xn(se(n), 0, e.length), t = At(t), e.slice(n, n + t.length) == t;
      }
      function Xd(e, t, n) {
        var l = o.templateSettings;
        n && Nt(e, t, n) && (t = r), e = Ie(e), t = cr({}, t, l, zo);
        var u = cr({}, t.imports, l.imports, zo), a = tt(u), M = Sr(u, a), f, j, x = 0, E = t.interpolate || Il, O = "__p += '", P = kr(
          (t.escape || Il).source + "|" + E.source + "|" + (E === Qu ? xa : Il).source + "|" + (t.evaluate || Il).source + "|$",
          "g"
        ), H = "//# sourceURL=" + (he.call(t, "sourceURL") ? (t.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++oM + "]") + `
`;
        e.replace(P, function($, fe, ge, ht, gt, vt) {
          return ge || (ge = ht), O += e.slice(x, vt).replace(ka, hM), fe && (f = !0, O += `' +
__e(` + fe + `) +
'`), gt && (j = !0, O += `';
` + gt + `;
__p += '`), ge && (O += `' +
((__t = (` + ge + `)) == null ? '' : __t) +
'`), x = vt + $.length, $;
        }), O += `';
`;
        var J = he.call(t, "variable") && t.variable;
        if (!J)
          O = `with (obj) {
` + O + `
}
`;
        else if (Ta.test(J))
          throw new le(d);
        O = (j ? O.replace(Na, "") : O).replace(ga, "$1").replace(da, "$1;"), O = "function(" + (J || "obj") + `) {
` + (J ? "" : `obj || (obj = {});
`) + "var __t, __p = ''" + (f ? ", __e = _.escape" : "") + (j ? `, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
` : `;
`) + O + `return __p
}`;
        var ae = Ms(function() {
          return _e(a, H + "return " + O).apply(r, M);
        });
        if (ae.source = O, _u(ae))
          throw ae;
        return ae;
      }
      function ep(e) {
        return Ie(e).toLowerCase();
      }
      function tp(e) {
        return Ie(e).toUpperCase();
      }
      function np(e, t, n) {
        if (e = Ie(e), e && (n || t === r))
          return zi(e);
        if (!e || !(t = At(t)))
          return e;
        var l = Vt(e), u = Vt(t), a = yi(l, u), M = Di(l, u) + 1;
        return yn(l, a, M).join("");
      }
      function lp(e, t, n) {
        if (e = Ie(e), e && (n || t === r))
          return e.slice(0, Yi(e) + 1);
        if (!e || !(t = At(t)))
          return e;
        var l = Vt(e), u = Di(l, Vt(t)) + 1;
        return yn(l, 0, u).join("");
      }
      function rp(e, t, n) {
        if (e = Ie(e), e && (n || t === r))
          return e.replace(_r, "");
        if (!e || !(t = At(t)))
          return e;
        var l = Vt(e), u = yi(l, Vt(t));
        return yn(l, u).join("");
      }
      function up(e, t) {
        var n = qe, l = Yt;
        if (Qe(t)) {
          var u = "separator" in t ? t.separator : u;
          n = "length" in t ? se(t.length) : n, l = "omission" in t ? At(t.omission) : l;
        }
        e = Ie(e);
        var a = e.length;
        if (Pn(e)) {
          var M = Vt(e);
          a = M.length;
        }
        if (n >= a)
          return e;
        var f = n - Vn(l);
        if (f < 1)
          return l;
        var j = M ? yn(M, 0, f).join("") : e.slice(0, f);
        if (u === r)
          return j + l;
        if (M && (f += j.length - f), Yu(u)) {
          if (e.slice(f).search(u)) {
            var x, E = j;
            for (u.global || (u = kr(u.source, Ie(Uu.exec(u)) + "g")), u.lastIndex = 0; x = u.exec(E); )
              var O = x.index;
            j = j.slice(0, O === r ? f : O);
          }
        } else if (e.indexOf(At(u), f) != f) {
          var P = j.lastIndexOf(u);
          P > -1 && (j = j.slice(0, P));
        }
        return j + l;
      }
      function ip(e) {
        return e = Ie(e), e && pa.test(e) ? e.replace(Bu, bM) : e;
      }
      var op = Kn(function(e, t, n) {
        return e + (n ? " " : "") + t.toUpperCase();
      }), Au = Mo("toUpperCase");
      function as(e, t, n) {
        return e = Ie(e), t = n ? r : t, t === r ? TM(e) ? BM(e) : DM(e) : e.match(t) || [];
      }
      var Ms = Me(function(e, t) {
        try {
          return mt(e, r, t);
        } catch (n) {
          return _u(n) ? n : new le(n);
        }
      }), sp = tn(function(e, t) {
        return Et(t, function(n) {
          n = Kt(n), Xt(e, n, yu(e[n], e));
        }), e;
      });
      function ap(e) {
        var t = e == null ? 0 : e.length, n = q();
        return e = t ? ke(e, function(l) {
          if (typeof l[1] != "function")
            throw new Ct(_);
          return [n(l[0]), l[1]];
        }) : [], Me(function(l) {
          for (var u = -1; ++u < t; ) {
            var a = e[u];
            if (mt(a[0], this, l))
              return mt(a[1], this, l);
          }
        });
      }
      function Mp(e) {
        return bc(Ot(e, A));
      }
      function wu(e) {
        return function() {
          return e;
        };
      }
      function cp(e, t) {
        return e == null || e !== e ? t : e;
      }
      var fp = fo(), Np = fo(!0);
      function Dt(e) {
        return e;
      }
      function hu(e) {
        return Vi(typeof e == "function" ? e : Ot(e, A));
      }
      function gp(e) {
        return Ri(Ot(e, A));
      }
      function dp(e, t) {
        return Wi(e, Ot(t, A));
      }
      var pp = Me(function(e, t) {
        return function(n) {
          return Nl(n, e, t);
        };
      }), jp = Me(function(e, t) {
        return function(n) {
          return Nl(e, n, t);
        };
      });
      function vu(e, t, n) {
        var l = tt(t), u = Gl(t, l);
        n == null && !(Qe(t) && (u.length || !l.length)) && (n = t, t = e, e = this, u = Gl(t, tt(t)));
        var a = !(Qe(n) && "chain" in n) || !!n.chain, M = ln(e);
        return Et(u, function(f) {
          var j = t[f];
          e[f] = j, M && (e.prototype[f] = function() {
            var x = this.__chain__;
            if (a || x) {
              var E = e(this.__wrapped__), O = E.__actions__ = jt(this.__actions__);
              return O.push({ func: j, args: arguments, thisArg: e }), E.__chain__ = x, E;
            }
            return j.apply(e, Nn([this.value()], arguments));
          });
        }), e;
      }
      function zp() {
        return ut._ === this && (ut._ = FM), this;
      }
      function Tu() {
      }
      function yp(e) {
        return e = se(e), Me(function(t) {
          return Gi(t, e);
        });
      }
      var Dp = iu(ke), _p = iu(Ni), Yp = iu(xr);
      function cs(e) {
        return Nu(e) ? Er(Kt(e)) : Jc(e);
      }
      function mp(e) {
        return function(t) {
          return e == null ? r : En(e, t);
        };
      }
      var Ip = go(), Ap = go(!0);
      function Lu() {
        return [];
      }
      function xu() {
        return !1;
      }
      function wp() {
        return {};
      }
      function hp() {
        return "";
      }
      function vp() {
        return !0;
      }
      function Tp(e, t) {
        if (e = se(e), e < 1 || e > De)
          return [];
        var n = Re, l = at(e, Re);
        t = q(t), e -= Re;
        for (var u = Or(l, t); ++n < e; )
          t(n);
        return u;
      }
      function Lp(e) {
        return ue(e) ? ke(e, Kt) : wt(e) ? [e] : jt(xo(Ie(e)));
      }
      function xp(e) {
        var t = ++PM;
        return Ie(e) + t;
      }
      var Ep = $l(function(e, t) {
        return e + t;
      }, 0), Cp = ou("ceil"), bp = $l(function(e, t) {
        return e / t;
      }, 1), Op = ou("floor");
      function Sp(e) {
        return e && e.length ? Wl(e, Dt, Gr) : r;
      }
      function Bp(e, t) {
        return e && e.length ? Wl(e, q(t, 2), Gr) : r;
      }
      function kp(e) {
        return pi(e, Dt);
      }
      function Qp(e, t) {
        return pi(e, q(t, 2));
      }
      function Up(e) {
        return e && e.length ? Wl(e, Dt, qr) : r;
      }
      function Pp(e, t) {
        return e && e.length ? Wl(e, q(t, 2), qr) : r;
      }
      var Vp = $l(function(e, t) {
        return e * t;
      }, 1), Fp = ou("round"), Rp = $l(function(e, t) {
        return e - t;
      }, 0);
      function Wp(e) {
        return e && e.length ? br(e, Dt) : 0;
      }
      function Gp(e, t) {
        return e && e.length ? br(e, q(t, 2)) : 0;
      }
      return o.after = gg, o.ary = Vo, o.assign = td, o.assignIn = ns, o.assignInWith = cr, o.assignWith = nd, o.at = ld, o.before = Fo, o.bind = yu, o.bindAll = sp, o.bindKey = Ro, o.castArray = wg, o.chain = Qo, o.chunk = Of, o.compact = Sf, o.concat = Bf, o.cond = ap, o.conforms = Mp, o.constant = wu, o.countBy = WN, o.create = rd, o.curry = Wo, o.curryRight = Go, o.debounce = Zo, o.defaults = ud, o.defaultsDeep = id, o.defer = dg, o.delay = pg, o.difference = kf, o.differenceBy = Qf, o.differenceWith = Uf, o.drop = Pf, o.dropRight = Vf, o.dropRightWhile = Ff, o.dropWhile = Rf, o.fill = Wf, o.filter = ZN, o.flatMap = qN, o.flatMapDeep = JN, o.flatMapDepth = $N, o.flatten = Oo, o.flattenDeep = Gf, o.flattenDepth = Zf, o.flip = jg, o.flow = fp, o.flowRight = Np, o.fromPairs = Hf, o.functions = Nd, o.functionsIn = gd, o.groupBy = XN, o.initial = qf, o.intersection = Jf, o.intersectionBy = $f, o.intersectionWith = Xf, o.invert = pd, o.invertBy = jd, o.invokeMap = tg, o.iteratee = hu, o.keyBy = ng, o.keys = tt, o.keysIn = yt, o.map = ur, o.mapKeys = yd, o.mapValues = Dd, o.matches = gp, o.matchesProperty = dp, o.memoize = or, o.merge = _d, o.mergeWith = ls, o.method = pp, o.methodOf = jp, o.mixin = vu, o.negate = sr, o.nthArg = yp, o.omit = Yd, o.omitBy = md, o.once = zg, o.orderBy = lg, o.over = Dp, o.overArgs = yg, o.overEvery = _p, o.overSome = Yp, o.partial = Du, o.partialRight = Ho, o.partition = rg, o.pick = Id, o.pickBy = rs, o.property = cs, o.propertyOf = mp, o.pull = lN, o.pullAll = Bo, o.pullAllBy = rN, o.pullAllWith = uN, o.pullAt = iN, o.range = Ip, o.rangeRight = Ap, o.rearg = Dg, o.reject = og, o.remove = oN, o.rest = _g, o.reverse = ju, o.sampleSize = ag, o.set = wd, o.setWith = hd, o.shuffle = Mg, o.slice = sN, o.sortBy = Ng, o.sortedUniq = dN, o.sortedUniqBy = pN, o.split = qd, o.spread = Yg, o.tail = jN, o.take = zN, o.takeRight = yN, o.takeRightWhile = DN, o.takeWhile = _N, o.tap = SN, o.throttle = mg, o.thru = rr, o.toArray = Xo, o.toPairs = us, o.toPairsIn = is, o.toPath = Lp, o.toPlainObject = ts, o.transform = vd, o.unary = Ig, o.union = YN, o.unionBy = mN, o.unionWith = IN, o.uniq = AN, o.uniqBy = wN, o.uniqWith = hN, o.unset = Td, o.unzip = zu, o.unzipWith = ko, o.update = Ld, o.updateWith = xd, o.values = $n, o.valuesIn = Ed, o.without = vN, o.words = as, o.wrap = Ag, o.xor = TN, o.xorBy = LN, o.xorWith = xN, o.zip = EN, o.zipObject = CN, o.zipObjectDeep = bN, o.zipWith = ON, o.entries = us, o.entriesIn = is, o.extend = ns, o.extendWith = cr, vu(o, o), o.add = Ep, o.attempt = Ms, o.camelCase = Sd, o.capitalize = os, o.ceil = Cp, o.clamp = Cd, o.clone = hg, o.cloneDeep = Tg, o.cloneDeepWith = Lg, o.cloneWith = vg, o.conformsTo = xg, o.deburr = ss, o.defaultTo = cp, o.divide = bp, o.endsWith = Bd, o.eq = Rt, o.escape = kd, o.escapeRegExp = Qd, o.every = GN, o.find = HN, o.findIndex = Co, o.findKey = od, o.findLast = KN, o.findLastIndex = bo, o.findLastKey = sd, o.floor = Op, o.forEach = Uo, o.forEachRight = Po, o.forIn = ad, o.forInRight = Md, o.forOwn = cd, o.forOwnRight = fd, o.get = mu, o.gt = Eg, o.gte = Cg, o.has = dd, o.hasIn = Iu, o.head = So, o.identity = Dt, o.includes = eg, o.indexOf = Kf, o.inRange = bd, o.invoke = zd, o.isArguments = On, o.isArray = ue, o.isArrayBuffer = bg, o.isArrayLike = zt, o.isArrayLikeObject = Ze, o.isBoolean = Og, o.isBuffer = Dn, o.isDate = Sg, o.isElement = Bg, o.isEmpty = kg, o.isEqual = Qg, o.isEqualWith = Ug, o.isError = _u, o.isFinite = Pg, o.isFunction = ln, o.isInteger = Ko, o.isLength = ar, o.isMap = qo, o.isMatch = Vg, o.isMatchWith = Fg, o.isNaN = Rg, o.isNative = Wg, o.isNil = Zg, o.isNull = Gg, o.isNumber = Jo, o.isObject = Qe, o.isObjectLike = Ge, o.isPlainObject = yl, o.isRegExp = Yu, o.isSafeInteger = Hg, o.isSet = $o, o.isString = Mr, o.isSymbol = wt, o.isTypedArray = Jn, o.isUndefined = Kg, o.isWeakMap = qg, o.isWeakSet = Jg, o.join = eN, o.kebabCase = Ud, o.last = Bt, o.lastIndexOf = tN, o.lowerCase = Pd, o.lowerFirst = Vd, o.lt = $g, o.lte = Xg, o.max = Sp, o.maxBy = Bp, o.mean = kp, o.meanBy = Qp, o.min = Up, o.minBy = Pp, o.stubArray = Lu, o.stubFalse = xu, o.stubObject = wp, o.stubString = hp, o.stubTrue = vp, o.multiply = Vp, o.nth = nN, o.noConflict = zp, o.noop = Tu, o.now = ir, o.pad = Fd, o.padEnd = Rd, o.padStart = Wd, o.parseInt = Gd, o.random = Od, o.reduce = ug, o.reduceRight = ig, o.repeat = Zd, o.replace = Hd, o.result = Ad, o.round = Fp, o.runInContext = p, o.sample = sg, o.size = cg, o.snakeCase = Kd, o.some = fg, o.sortedIndex = aN, o.sortedIndexBy = MN, o.sortedIndexOf = cN, o.sortedLastIndex = fN, o.sortedLastIndexBy = NN, o.sortedLastIndexOf = gN, o.startCase = Jd, o.startsWith = $d, o.subtract = Rp, o.sum = Wp, o.sumBy = Gp, o.template = Xd, o.times = Tp, o.toFinite = rn, o.toInteger = se, o.toLength = es, o.toLower = ep, o.toNumber = kt, o.toSafeInteger = ed, o.toString = Ie, o.toUpper = tp, o.trim = np, o.trimEnd = lp, o.trimStart = rp, o.truncate = up, o.unescape = ip, o.uniqueId = xp, o.upperCase = op, o.upperFirst = Au, o.each = Uo, o.eachRight = Po, o.first = So, vu(o, function() {
        var e = {};
        return Zt(o, function(t, n) {
          he.call(o.prototype, n) || (e[n] = t);
        }), e;
      }(), { chain: !1 }), o.VERSION = i, Et(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(e) {
        o[e].placeholder = o;
      }), Et(["drop", "take"], function(e, t) {
        Ne.prototype[e] = function(n) {
          n = n === r ? 1 : et(se(n), 0);
          var l = this.__filtered__ && !t ? new Ne(this) : this.clone();
          return l.__filtered__ ? l.__takeCount__ = at(n, l.__takeCount__) : l.__views__.push({
            size: at(n, Re),
            type: e + (l.__dir__ < 0 ? "Right" : "")
          }), l;
        }, Ne.prototype[e + "Right"] = function(n) {
          return this.reverse()[e](n).reverse();
        };
      }), Et(["filter", "map", "takeWhile"], function(e, t) {
        var n = t + 1, l = n == w || n == K;
        Ne.prototype[e] = function(u) {
          var a = this.clone();
          return a.__iteratees__.push({
            iteratee: q(u, 3),
            type: n
          }), a.__filtered__ = a.__filtered__ || l, a;
        };
      }), Et(["head", "last"], function(e, t) {
        var n = "take" + (t ? "Right" : "");
        Ne.prototype[e] = function() {
          return this[n](1).value()[0];
        };
      }), Et(["initial", "tail"], function(e, t) {
        var n = "drop" + (t ? "" : "Right");
        Ne.prototype[e] = function() {
          return this.__filtered__ ? new Ne(this) : this[n](1);
        };
      }), Ne.prototype.compact = function() {
        return this.filter(Dt);
      }, Ne.prototype.find = function(e) {
        return this.filter(e).head();
      }, Ne.prototype.findLast = function(e) {
        return this.reverse().find(e);
      }, Ne.prototype.invokeMap = Me(function(e, t) {
        return typeof e == "function" ? new Ne(this) : this.map(function(n) {
          return Nl(n, e, t);
        });
      }), Ne.prototype.reject = function(e) {
        return this.filter(sr(q(e)));
      }, Ne.prototype.slice = function(e, t) {
        e = se(e);
        var n = this;
        return n.__filtered__ && (e > 0 || t < 0) ? new Ne(n) : (e < 0 ? n = n.takeRight(-e) : e && (n = n.drop(e)), t !== r && (t = se(t), n = t < 0 ? n.dropRight(-t) : n.take(t - e)), n);
      }, Ne.prototype.takeRightWhile = function(e) {
        return this.reverse().takeWhile(e).reverse();
      }, Ne.prototype.toArray = function() {
        return this.take(Re);
      }, Zt(Ne.prototype, function(e, t) {
        var n = /^(?:filter|find|map|reject)|While$/.test(t), l = /^(?:head|last)$/.test(t), u = o[l ? "take" + (t == "last" ? "Right" : "") : t], a = l || /^find/.test(t);
        u && (o.prototype[t] = function() {
          var M = this.__wrapped__, f = l ? [1] : arguments, j = M instanceof Ne, x = f[0], E = j || ue(M), O = function(fe) {
            var ge = u.apply(o, Nn([fe], f));
            return l && P ? ge[0] : ge;
          };
          E && n && typeof x == "function" && x.length != 1 && (j = E = !1);
          var P = this.__chain__, H = !!this.__actions__.length, J = a && !P, ae = j && !H;
          if (!a && E) {
            M = ae ? M : new Ne(this);
            var $ = e.apply(M, f);
            return $.__actions__.push({ func: rr, args: [O], thisArg: r }), new bt($, P);
          }
          return J && ae ? e.apply(this, f) : ($ = this.thru(O), J ? l ? $.value()[0] : $.value() : $);
        });
      }), Et(["pop", "push", "shift", "sort", "splice", "unshift"], function(e) {
        var t = Ll[e], n = /^(?:push|sort|unshift)$/.test(e) ? "tap" : "thru", l = /^(?:pop|shift)$/.test(e);
        o.prototype[e] = function() {
          var u = arguments;
          if (l && !this.__chain__) {
            var a = this.value();
            return t.apply(ue(a) ? a : [], u);
          }
          return this[n](function(M) {
            return t.apply(ue(M) ? M : [], u);
          });
        };
      }), Zt(Ne.prototype, function(e, t) {
        var n = o[t];
        if (n) {
          var l = n.name + "";
          he.call(Gn, l) || (Gn[l] = []), Gn[l].push({ name: t, func: n });
        }
      }), Gn[Jl(r, F).name] = [{
        name: "wrapper",
        func: r
      }], Ne.prototype.clone = uc, Ne.prototype.reverse = ic, Ne.prototype.value = oc, o.prototype.at = BN, o.prototype.chain = kN, o.prototype.commit = QN, o.prototype.next = UN, o.prototype.plant = VN, o.prototype.reverse = FN, o.prototype.toJSON = o.prototype.valueOf = o.prototype.value = RN, o.prototype.first = o.prototype.head, il && (o.prototype[il] = PN), o;
    }, Fn = kM();
    hn ? ((hn.exports = Fn)._ = Fn, hr._ = Fn) : ut._ = Fn;
  }).call(Dl);
})(fr, fr.exports);
var ct = fr.exports;
const oj = {
  name: "ElPlusFormBtn",
  inheritAttrs: !1,
  typeName: "btn",
  customOptions: {}
}, on = /* @__PURE__ */ oe({
  ...oj,
  props: {
    field: {},
    rowIndex: {},
    loading: { type: Boolean },
    desc: {},
    formData: {}
  },
  setup(N) {
    const s = N, r = I(s.loading ?? !1), i = Ye(() => {
      var d;
      const _ = Object.assign({}, ze(), s.desc, (d = s.desc) == null ? void 0 : d._attrs);
      return _.btnType && (_.type = _.btnType), _.plain || delete _.plain, _;
    }), z = Ye(() => {
      const _ = {};
      if (s.desc && s.desc.on)
        for (const d in s.desc.on)
          d === "click" && s.desc.mask ? _[d] = function() {
            r.value = !0, s.desc.on[d]({
              row: s.formData,
              callBack: () => {
                setTimeout(() => r.value = !1, 500);
              },
              field: s.field,
              rowIndex: s.rowIndex
            });
          } : _[d] = function() {
            s.desc.on[d]({ row: ct.cloneDeep(s.formData || {}), field: s.field, rowIndex: s.rowIndex });
          };
      return _;
    }), y = Ye(() => s.desc.btnLabel ? typeof s.desc.btnLabel == "function" ? s.desc.btnLabel(s.formData) : s.desc.btnLabel : s.desc.label ? typeof s.desc.label == "function" ? s.desc.label(s.formData) : s.desc.label : "");
    return Ve(
      () => s.loading,
      (_) => {
        r.value = _;
      }
    ), (_, d) => {
      const g = V("el-button"), c = V("el-popconfirm");
      return s.desc.confirm ? (m(), Z(c, {
        key: 0,
        onConfirm: z.value.click,
        title: s.desc.confirm
      }, {
        reference: G(() => [
          de(g, ee({
            loading: r.value,
            size: s.desc.size || "small"
          }, i.value), qt({ _: 2 }, [
            _.desc.label ? {
              name: "default",
              fn: G(() => [
                Ke(Oe(y.value), 1)
              ]),
              key: "0"
            } : void 0
          ]), 1040, ["loading", "size"])
        ]),
        _: 1
      }, 8, ["onConfirm", "title"])) : (m(), Z(g, ee({
        key: 1,
        loading: r.value,
        size: s.desc.size || "small"
      }, i.value, ye(z.value), {
        style: { pointerEvents: _.desc.isTag ? "none" : "all" }
      }), qt({ _: 2 }, [
        s.desc.label ? {
          name: "default",
          fn: G(() => [
            Ke(Oe(y.value), 1)
          ]),
          key: "0"
        } : void 0
      ]), 1040, ["loading", "size", "style"]));
    };
  }
}), sj = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: on }, Symbol.toStringTag, { value: "Module" })), aj = /* @__PURE__ */ Ue("i", { class: "ele-ArrowDown el-icon--right" }, null, -1), Mj = {
  name: "ElPlusFormBtns",
  inheritAttrs: !1,
  typeName: "btns",
  customOptions: {}
}, Ys = /* @__PURE__ */ oe({
  ...Mj,
  props: {
    field: {},
    rowIndex: {},
    desc: {},
    formData: {}
  },
  setup(N) {
    const s = N, r = I([]), i = I([]), z = Ye(() => {
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
    }), y = Ye(() => (c) => {
      const D = {};
      if (c && c.on)
        for (const A in c.on)
          A === "click" && c.confirm ? D[A] = function() {
            Xp.confirm(c.confirm, "提示", {
              type: "warning"
            }).then(() => {
              c.on[A]({ row: s.formData, field: s.field, rowIndex: s.rowIndex });
            });
          } : D[A] = function() {
            c.on[A]({ row: s.formData, field: s.field, rowIndex: s.rowIndex });
          };
      return D;
    }), _ = () => {
      const c = [];
      s.desc.btns.length > 0 && s.desc.btns.map((A) => {
        d(A) && c.push(A);
      }), r.value = c;
      const D = s.desc.limit || 3;
      r.value.length > D && (i.value = r.value.splice(D - 1));
    }, d = (c) => typeof c.vif == "function" ? !!g(c.vif) : typeof c.vif == "boolean" ? c.vif : !0, g = (c) => c(s.formData);
    return Ve(
      () => s.desc,
      () => _()
    ), Ve(
      () => s.formData,
      () => _()
    ), _n(() => {
      _();
    }), (c, D) => {
      const A = V("el-button"), h = V("el-dropdown-item"), C = V("el-dropdown-menu"), S = V("el-dropdown");
      return m(), Q("div", {
        class: "el-plus-form-btn-group",
        style: _t({ "justify-content": z.value })
      }, [
        (m(!0), Q(Ae, null, ve(r.value, (U, W) => (m(), Z(on, {
          key: W + (U.label || U.title || ""),
          type: "primary",
          field: c.field,
          desc: U || {},
          formData: c.formData,
          plain: (U && U.plain) ?? c.desc.plain ?? !0,
          text: c.desc.text,
          rowIndex: c.rowIndex
        }, null, 8, ["field", "desc", "formData", "plain", "text", "rowIndex"]))), 128)),
        i.value && i.value.length > 0 ? (m(), Z(S, {
          key: 0,
          class: "group-menu-btn",
          size: c.desc.size || "small"
        }, {
          dropdown: G(() => [
            de(C, null, {
              default: G(() => [
                (m(!0), Q(Ae, null, ve(i.value, (U, W) => (m(), Z(h, ee({
                  key: W + (U.label || U.title)
                }, ye(y.value(U))), {
                  default: G(() => [
                    Ke(Oe(U.label || U.title), 1)
                  ]),
                  _: 2
                }, 1040))), 128))
              ]),
              _: 1
            })
          ]),
          default: G(() => [
            de(A, {
              type: "primary",
              size: c.desc.size || "small",
              plain: c.desc.plain ?? !0
            }, {
              default: G(() => [
                Ke(" 更多"),
                aj
              ]),
              _: 1
            }, 8, ["size", "plain"])
          ]),
          _: 1
        }, 8, ["size"])) : ce("", !0)
      ], 4);
    };
  }
});
const cj = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: Ys }, Symbol.toStringTag, { value: "Module" })), fj = {
  name: "ElPlusFormCascader",
  inheritAttrs: !1,
  typeName: "cascader",
  customOptions: {}
}, Nj = /* @__PURE__ */ oe({
  ...fj,
  props: {
    modelValue: {},
    field: {},
    desc: {},
    formData: {}
  },
  emits: ["update:modelValue"],
  setup(N, { emit: s }) {
    const r = N, i = Pe("globalData"), z = I(typeof r.modelValue == "string" ? [r.modelValue] : r.modelValue);
    s("update:modelValue", z);
    const y = I({}), _ = I(xe(r)), d = ot([]);
    return Te(async () => {
      y.value = await Le(r, { clearable: !0, props: { value: "value", label: "label", children: "children", checkStrictly: !!r.desc.checkStrictly }, ...ze() });
    }), Ve(
      () => r.desc.options,
      async (g) => {
        typeof g == "string" ? d.splice(0, d.length, ...i[g] || []) : typeof g == "function" ? d.splice(0, d.length, ...await g(r.formData)) : Array.isArray(g) ? g && d && !ct.isEqual(g, d) && d.splice(0, d.length, ...g) : d.splice(0, d.length);
      },
      { immediate: !0 }
    ), (g, c) => {
      const D = V("el-cascader");
      return m(), Z(D, ee({ class: "ElPlusFormCascader-panel" }, y.value, ye(_.value), {
        options: d,
        modelValue: z.value,
        "onUpdate:modelValue": c[0] || (c[0] = (A) => z.value = A)
      }), null, 16, ["options", "modelValue"]);
    };
  }
});
const ms = /* @__PURE__ */ Fe(Nj, [["__scopeId", "data-v-ab6b4aed"]]), gj = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: ms }, Symbol.toStringTag, { value: "Module" })), dj = {
  name: "ElPlusFormCascaderPanel",
  inheritAttrs: !1,
  typeName: "cascaderPanel",
  customOptions: {}
}, pj = /* @__PURE__ */ oe({
  ...dj,
  props: {
    modelValue: {},
    field: {},
    desc: {},
    formData: {}
  },
  emits: ["update:modelValue"],
  setup(N, { emit: s }) {
    const r = N, i = I(r.modelValue);
    s("update:modelValue", i);
    const z = I(Object.assign({}, Yn(), r.desc.slots)), y = I({}), _ = I(xe(r));
    return Te(async () => {
      y.value = await Le(r, {
        props: { value: "value", label: "label", children: "children" },
        fetchSuggestions(d, g) {
          g([]);
        },
        ...ze()
      });
    }), (d, g) => {
      const c = V("el-cascader-panel");
      return m(), Z(c, ee({ class: "ElPlusFormCascaderPanel-panel" }, y.value, ye(_.value), {
        options: r.desc.options,
        modelValue: i.value,
        "onUpdate:modelValue": g[0] || (g[0] = (D) => i.value = D)
      }), qt({ _: 2 }, [
        ve(z.value, (D, A, h) => ({
          name: A,
          fn: G((C) => [
            Je(d.$slots, A, { data: C }, void 0, !0)
          ])
        }))
      ]), 1040, ["options", "modelValue"]);
    };
  }
});
const Is = /* @__PURE__ */ Fe(pj, [["__scopeId", "data-v-2c8fbcd6"]]), jj = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: Is }, Symbol.toStringTag, { value: "Module" })), zj = {
  name: "ElPlusFormCheckbox",
  inheritAttrs: !1,
  typeName: "checkbox",
  customOptions: {}
}, yj = /* @__PURE__ */ oe({
  ...zj,
  props: {
    modelValue: {},
    field: {},
    desc: {},
    formData: {}
  },
  emits: ["update:modelValue"],
  setup(N, { emit: s }) {
    const r = N, i = I(r.modelValue);
    s("update:modelValue", i);
    const z = I({}), y = I(xe(r));
    return Te(async () => {
      z.value = await Le(r, { ...ze() });
    }), (_, d) => {
      const g = V("el-checkbox"), c = V("el-checkbox-group");
      return m(), Z(c, ee({ class: "ElPlusFormCheckbox-panel" }, z.value, ye(y.value), {
        modelValue: i.value,
        "onUpdate:modelValue": d[0] || (d[0] = (D) => i.value = D)
      }), {
        default: G(() => [
          (m(!0), Q(Ae, null, ve(_.desc.options, (D) => (m(), Z(g, ee({
            key: D.value,
            label: D.value
          }, D.attrs), {
            default: G(() => [
              Ke(Oe(D.text), 1)
            ]),
            _: 2
          }, 1040, ["label"]))), 128))
        ]),
        _: 1
      }, 16, ["modelValue"]);
    };
  }
});
const As = /* @__PURE__ */ Fe(yj, [["__scopeId", "data-v-d9495439"]]), Dj = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: As }, Symbol.toStringTag, { value: "Module" })), _j = {
  name: "ElPlusFormCheckboxButton",
  inheritAttrs: !1,
  typeName: "checkboxButton",
  customOptions: {}
}, Yj = /* @__PURE__ */ oe({
  ..._j,
  props: {
    modelValue: {},
    field: {},
    desc: {},
    formData: {}
  },
  emits: ["update:modelValue"],
  setup(N, { emit: s }) {
    const r = N, i = I(r.modelValue);
    s("update:modelValue", i);
    const z = I({}), y = I(xe(r));
    return Te(async () => {
      z.value = await Le(r, { ...ze() });
    }), (_, d) => {
      const g = V("el-checkbox-button"), c = V("el-checkbox-group");
      return m(), Z(c, ee({ class: "ElPlusFormCheckboxButton-panel" }, z.value, ye(y.value), {
        modelValue: i.value,
        "onUpdate:modelValue": d[0] || (d[0] = (D) => i.value = D)
      }), {
        default: G(() => [
          (m(!0), Q(Ae, null, ve(_.desc.options, (D) => (m(), Z(g, ee({
            key: D.value,
            label: D.value
          }, D.attrs), {
            default: G(() => [
              Ke(Oe(D.text), 1)
            ]),
            _: 2
          }, 1040, ["label"]))), 128))
        ]),
        _: 1
      }, 16, ["modelValue"]);
    };
  }
});
const ws = /* @__PURE__ */ Fe(Yj, [["__scopeId", "data-v-01d22bc6"]]), mj = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: ws }, Symbol.toStringTag, { value: "Module" })), Ij = {
  name: "ElPlusFormColor",
  inheritAttrs: !1,
  typeName: "color",
  customOptions: {}
}, Aj = /* @__PURE__ */ oe({
  ...Ij,
  props: {
    modelValue: {},
    field: {},
    desc: {},
    formData: {}
  },
  emits: ["update:modelValue"],
  setup(N, { emit: s }) {
    const r = N, i = I(r.modelValue), z = I({}), y = I(xe(r));
    return s("update:modelValue", i), Te(async () => {
      z.value = await Le(r, { ...ze() });
    }), (_, d) => {
      const g = V("el-color-picker");
      return m(), Z(g, ee({ class: "ElPlusFormColor-panel" }, z.value, ye(y.value), {
        modelValue: i.value,
        "onUpdate:modelValue": d[0] || (d[0] = (c) => i.value = c)
      }), null, 16, ["modelValue"]);
    };
  }
});
const hs = /* @__PURE__ */ Fe(Aj, [["__scopeId", "data-v-b0687872"]]), wj = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: hs }, Symbol.toStringTag, { value: "Module" })), hj = {
  name: "ElPlusFormDate",
  inheritAttrs: !1,
  typeName: "date",
  customOptions: {}
}, vj = /* @__PURE__ */ oe({
  ...hj,
  props: {
    modelValue: {},
    field: {},
    desc: {},
    formData: {}
  },
  emits: ["update:modelValue"],
  setup(N, { emit: s }) {
    const r = N, i = I(!1), z = I({}), y = I(xe(r)), _ = I(r.modelValue);
    return s("update:modelValue", _), Te(async () => {
      z.value = await Le(r, { valueFormat: "YYYY-MM-DD HH:mm:ss", editable: !1, ...ze() }), i.value = !0;
    }), (d, g) => {
      const c = V("el-date-picker");
      return i.value ? (m(), Z(c, ee({
        key: 0,
        class: "ElPlusFormDate-panel"
      }, z.value, ye(y.value), {
        modelValue: _.value,
        "onUpdate:modelValue": g[0] || (g[0] = (D) => _.value = D)
      }), null, 16, ["modelValue"])) : ce("", !0);
    };
  }
});
const vs = /* @__PURE__ */ Fe(vj, [["__scopeId", "data-v-7295d086"]]), Tj = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: vs }, Symbol.toStringTag, { value: "Module" })), Lj = {
  name: "ElPlusFormDaterange",
  inheritAttrs: !1,
  typeName: "daterange",
  customOptions: {}
}, xj = /* @__PURE__ */ oe({
  ...Lj,
  props: {
    modelValue: {},
    field: {},
    desc: {},
    formData: {}
  },
  emits: ["update:modelValue"],
  setup(N, { emit: s }) {
    const r = N, i = I(r.modelValue), z = I(Object.assign({}, Yn(), r.desc.slots)), y = I({}), _ = I(xe(r));
    return s("update:modelValue", i), Te(async () => {
      y.value = await Le(r, { type: "daterange", format: "YYYY-MM-DD", valueFormat: "x", editable: !1, ...ze() });
    }), (d, g) => {
      const c = V("el-date-picker");
      return m(), Z(c, ee({ class: "el-plusF-form-daterange-panel" }, y.value, ye(_.value), {
        modelValue: i.value,
        "onUpdate:modelValue": g[0] || (g[0] = (D) => i.value = D)
      }), qt({ _: 2 }, [
        ve(z.value, (D, A, h) => ({
          name: A,
          fn: G((C) => [
            Je(d.$slots, A, { data: C }, void 0, !0)
          ])
        }))
      ]), 1040, ["modelValue"]);
    };
  }
});
const Ts = /* @__PURE__ */ Fe(xj, [["__scopeId", "data-v-2f54b570"]]), Ej = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: Ts }, Symbol.toStringTag, { value: "Module" })), Cj = {
  name: "ElPlusFormDatetime",
  inheritAttrs: !1,
  typeName: "datetime",
  customOptions: {}
}, bj = /* @__PURE__ */ oe({
  ...Cj,
  props: {
    modelValue: {},
    field: {},
    desc: {},
    formData: {}
  },
  emits: ["update:modelValue"],
  setup(N, { emit: s }) {
    const r = N, i = I(r.modelValue), z = I({}), y = I(xe(r));
    return s("update:modelValue", i), Te(async () => {
      z.value = await Le(r, { valueFormat: "YYYY-MM-DD HH:mm:ss", ...ze() });
    }), (_, d) => {
      const g = V("el-date-picker");
      return m(), Z(g, ee({ class: "ElPlusFormDatetime-panel" }, z.value, ye(y.value), {
        type: "datetime",
        modelValue: i.value,
        "onUpdate:modelValue": d[0] || (d[0] = (c) => i.value = c)
      }), null, 16, ["modelValue"]);
    };
  }
});
const Ls = /* @__PURE__ */ Fe(bj, [["__scopeId", "data-v-e8947510"]]), Oj = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: Ls }, Symbol.toStringTag, { value: "Module" })), Ns = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+RE9D5Zu+5qCHPC90aXRsZT4KICAgIDxnIGlkPSLkvpvlupTllYbnrqHnkIYiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSLkvpvlupTllYbnrqHnkIYt5L6b5bqU5ZWG5YiX6KGo6K+m5oOFLTIw5p2h6ZmE5Lu2IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMzgzLjAwMDAwMCwgLTEwNTEuMDAwMDAwKSIgZmlsbD0iIzM4NzhERSIgZmlsbC1ydWxlPSJub256ZXJvIj4KICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC0yMeWkh+S7vS05IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzNzUuMDAwMDAwLCAxMDQ1LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPGcgaWQ9IkRPQ+WbvuaghyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoOC4wMDAwMDAsIDYuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTMsNiBMMTMsNiBDMTMuMTc2ODExLDYgMTMuMzQ2MzgwMyw2LjA3MDIzNzg5IDEzLjQ3MTQwNDUsNi4xOTUyNjIxNSBDMTMuNTk2NDI4OCw2LjMyMDI4NjQgMTMuNjY2NjY2Nyw2LjQ4OTg1NTY4IDEzLjY2NjY2NjcsNi42NjY2NjY2NyBMMTMuNjY2NjY2NywxMi4zMzMzMzMzIEMxMy42NjY2NjY3LDEyLjcwMTUyMzIgMTMuMzY4MTg5OCwxMyAxMywxMyBMMywxMyBMMywxNC42NjY2NjY3IEMzLDE0Ljc1NTA3MjIgMy4wMzUxMTg5NSwxNC44Mzk4NTY4IDMuMDk3NjMxMDcsMTQuOTAyMzY4OSBDMy4xNjAxNDMyLDE0Ljk2NDg4MTEgMy4yNDQ5Mjc4MywxNSAzLjMzMzMzMzMzLDE1IEwxNC42NjY2NjY3LDE1IEMxNC44NTA3NjE2LDE1IDE1LDE0Ljg1MDc2MTYgMTUsMTQuNjY2NjY2NyBMMTUsNC44MjUzMzMzMyBMMTQuODQyMzMzMyw0LjY2NjY2NjY3IEwxMi44NjUzMzMzLDQuNjY2NjY2NjcgQzEyLjAxOTIzMzEsNC42NjY2NjY2NyAxMS4zMzMzMzMzLDMuOTgwNzY2OTEgMTEuMzMzMzMzMywzLjEzNDY2NjY3IEwxMS4zMzMzMzMzLDEuMTM1MzMzMzMgTDExLjE5ODY2NjcsMSBMMy4zMzMzMzMzMywxIEMzLjI0NDkyNzgzLDEgMy4xNjAxNDMyLDEuMDM1MTE4OTUgMy4wOTc2MzEwNywxLjA5NzYzMTA3IEMzLjAzNTExODk1LDEuMTYwMTQzMiAzLDEuMjQ0OTI3ODMgMywxLjMzMzMzMzMzIEwzLDYgWiBNMiwxMyBMMC42NjY2NjY2NzIsMTMgQzAuMjk4NDc2ODM2LDEzIDAsMTIuNzAxNTIzMiAwLDEyLjMzMzMzMzMgTDAsNi42NjY2NjY2NyBDMCw2LjQ4OTg1NTY4IDAuMDcwMjM3ODk0MSw2LjMyMDI4NjQgMC4xOTUyNjIxNDcsNi4xOTUyNjIxNSBDMC4zMjAyODY0MDEsNi4wNzAyMzc4OSAwLjQ4OTg1NTY3Nyw2IDAuNjY2NjY2NjcyLDYgTDIsNiBMMiwxLjMzMzMzMzMzIEMyLDAuNTk2OTUzNjY1IDIuNTk2OTUzNjYsMCAzLjMzMzMzMzMzLDAgTDExLjYxNSwwIEwxNiw0LjQxMzMzMzMzIEwxNiwxNC42NjY2NjY3IEMxNiwxNS40MDMwNDYzIDE1LjQwMzA0NjMsMTYgMTQuNjY2NjY2NywxNiBMMy4zMzMzMzMzMywxNiBDMi41OTY5NTM2NiwxNiAyLDE1LjQwMzA0NjMgMiwxNC42NjY2NjY3IEwyLDEzIEwyLDEzIFogTTEuMDMsNy4zODI2NjY2NyBMMS4wMywxMS42NjY2NjY3IEwyLjQ1NzMzMzMzLDExLjY2NjY2NjcgQzMuMDkxNjY2NjYsMTEuNjY2NjY2NyAzLjU2NzMzMzMzLDExLjQ3NDY2NjcgMy44OTU2NjY2NywxMS4wOTA2NjY3IEM0LjIwNzMzMzM0LDEwLjcyNDY2NjcgNC4zNjYsMTAuMjAyNjY2NyA0LjM2Niw5LjUyNDY2NjY3IEM0LjM2Niw4Ljg0MDY2NjY3IDQuMjA3MzMzMzMsOC4zMTg2NjY2NyAzLjg5NTY2NjY3LDcuOTU4NjY2NjcgQzMuNTY3NjY2NjcsNy41NzQ2NjY2NyAzLjA5MTY2NjY3LDcuMzgyNjY2NjcgMi40NTczMzMzMyw3LjM4MjY2NjY3IEwxLjAzLDcuMzgyNjY2NjcgWiBNMS42Nyw3Ljk4MjY2NjY3IEwyLjMzNjY2NjY3LDcuOTgyNjY2NjcgQzIuODIzMzMzMzQsNy45ODI2NjY2NyAzLjE3OSw4LjEwMjY2NjY3IDMuNDAzMzMzMzMsOC4zNDg2NjY2NyBDMy42MjIsOC41ODg2NjY2NyAzLjczMTMzMzMzLDguOTg0NjY2NjcgMy43MzEzMzMzMyw5LjUyNDY2NjY3IEMzLjczMTMzMzMzLDEwLjA1MjY2NjcgMy42MjIsMTAuNDQyNjY2NyAzLjQwMywxMC42OTQ2NjY3IEMzLjE3OSwxMC45NDA2NjY3IDIuODIzMzMzMzMsMTEuMDY2NjY2NyAyLjMzNjY2NjY3LDExLjA2NjY2NjcgTDEuNjcsMTEuMDY2NjY2NyBMMS42Nyw3Ljk4MjY2NjY3IEwxLjY3LDcuOTgyNjY2NjcgWiBNNi43MDEzMzMzMyw3LjI5ODY2NjY3IEM2LjA5OTY2NjY2LDcuMjk4NjY2NjcgNS42MjkzMzMzMyw3LjUwODY2NjY3IDUuMjkwMzMzMzMsNy45NDA2NjY2NyBDNC45NjIsOC4zNDg2NjY2NyA0LjgwMzY2NjY3LDguODc2NjY2NjcgNC44MDM2NjY2Nyw5LjUzMDY2NjY3IEM0LjgwMzY2NjY3LDEwLjE3ODY2NjcgNC45NjIsMTAuNzA2NjY2NyA1LjI5MDMzMzMzLDExLjExNDY2NjcgQzUuNjI5MzMzMzMsMTEuNTM0NjY2NyA2LjA5OTY2NjY2LDExLjc1MDY2NjcgNi43MDEzMzMzMywxMS43NTA2NjY3IEM3LjI5NzMzMzMzLDExLjc1MDY2NjcgNy43Njc2NjY2NiwxMS41NDA2NjY3IDguMTEyMzMzMzMsMTEuMTIwNjY2NyBDOC40NDAzMzMzMywxMC43MTg2NjY3IDguNjA0MzMzMzMsMTAuMTkwNjY2NyA4LjYwNDMzMzMzLDkuNTMwNjY2NjcgQzguNjA0MzMzMzMsOC44NzA2NjY2NyA4LjQ0MDMzMzMzLDguMzM2NjY2NjcgOC4xMTIzMzMzMyw3LjkzNDY2NjY3IEM3Ljc2NzY2NjY2LDcuNTA4NjY2NjcgNy4yOTczMzMzMyw3LjI5ODY2NjY3IDYuNzAxMzMzMzMsNy4yOTg2NjY2NyBMNi43MDEzMzMzMyw3LjI5ODY2NjY3IFogTTYuNzAxMzMzMzMsNy45MTY2NjY2NyBDNy4xMDYsNy45MTY2NjY2NyA3LjQxNzY2NjY2LDguMDU0NjY2NjcgNy42MzYzMzMzMyw4LjM0MjY2NjY3IEM3Ljg0OTY2NjY2LDguNjMwNjY2NjcgNy45NTksOS4wMjY2NjY2NyA3Ljk1OSw5LjUzMDY2NjY3IEM3Ljk1OSwxMC4wMzQ2NjY3IDcuODQ5NjY2NjcsMTAuNDI0NjY2NyA3LjYzNjMzMzMzLDEwLjcwNjY2NjcgQzcuNDE3NjY2NjYsMTAuOTg4NjY2NyA3LjEwNiwxMS4xMzI2NjY3IDYuNzAxMzMzMzMsMTEuMTMyNjY2NyBDNi4yOTY2NjY2NiwxMS4xMzI2NjY3IDUuOTc5MzMzMzMsMTAuOTgyNjY2NyA1Ljc2MDY2NjY3LDEwLjY4ODY2NjcgQzUuNTQ3MzMzMzQsMTAuNDAwNjY2NyA1LjQ0MzMzMzMzLDEwLjAxNjY2NjcgNS40NDMzMzMzMyw5LjUzMDY2NjY3IEM1LjQ0MzMzMzMzLDkuMDM4NjY2NjcgNS41NDczMzMzMyw4LjY1NDY2NjY3IDUuNzYwNjY2NjcsOC4zNjY2NjY2NyBDNS45ODQ2NjY2Nyw4LjA2NjY2NjY3IDYuMjk2NjY2NjcsNy45MTY2NjY2NyA2LjcwMTMzMzMzLDcuOTE2NjY2NjcgTDYuNzAxMzMzMzMsNy45MTY2NjY2NyBaIE0xMC45MDEzMzMzLDcuMjk4NjY2NjcgQzEwLjI3OCw3LjI5ODY2NjY3IDkuODAyLDcuNTIwNjY2NjcgOS40NzQsNy45NzY2NjY2NyBDOS4xODQsOC4zNzI2NjY2NyA5LjA0Miw4Ljg5NDY2NjY3IDkuMDQyLDkuNTMwNjY2NjcgQzkuMDQyLDEwLjE3ODY2NjcgOS4xNzg2NjY2NywxMC42OTQ2NjY3IDkuNDU3NjY2NjcsMTEuMDc4NjY2NyBDOS43NzQ2NjY2NywxMS41MjI2NjY3IDEwLjI2MTMzMzMsMTEuNzUwNjY2NyAxMC45MTIzMzMzLDExLjc1MDY2NjcgQzExLjMzMzMzMzMsMTEuNzUwNjY2NyAxMS42OTQzMzMzLDExLjYxODY2NjcgMTEuOTk1LDExLjM1NDY2NjcgQzEyLjMxNzY2NjcsMTEuMDcyNjY2NyAxMi41MiwxMC42ODI2NjY3IDEyLjYwNzY2NjcsMTAuMTc4NjY2NyBMMTEuOTg0MzMzMywxMC4xNzg2NjY3IEMxMS45MDc2NjY3LDEwLjUwMjY2NjcgMTEuNzc2MzMzMywxMC43NDg2NjY3IDExLjU5MDMzMzMsMTAuOTEwNjY2NyBDMTEuNDE1MzMzMywxMS4wNTQ2NjY3IDExLjE4NTY2NjcsMTEuMTMyNjY2NyAxMC45MDcsMTEuMTMyNjY2NyBDMTAuNDgwMzMzMywxMS4xMzI2NjY3IDEwLjE2MywxMC45ODI2NjY3IDkuOTYwNjY2NjcsMTAuNjk0NjY2NyBDOS43NzQ2NjY2NywxMC40MjQ2NjY3IDkuNjgxNjY2NjcsMTAuMDM0NjY2NyA5LjY4MTY2NjY3LDkuNTMwNjY2NjcgQzkuNjgxNjY2NjcsOS4wMzg2NjY2NyA5Ljc3NSw4LjY1NDY2NjY3IDkuOTY2MzMzMzMsOC4zNzg2NjY2NyBDMTAuMTc0LDguMDY2NjY2NjcgMTAuNDgwMzMzMyw3LjkxNjY2NjY3IDEwLjg5MDMzMzMsNy45MTY2NjY2NyBDMTEuMTYzNjY2Nyw3LjkxNjY2NjY3IDExLjM4OCw3Ljk3NjY2NjY3IDExLjU2Myw4LjEwODY2NjY3IEMxMS43NDM2NjY3LDguMjQwNjY2NjcgMTEuODY0LDguNDQ0NjY2NjcgMTEuOTI5NjY2Nyw4LjcyNjY2NjY3IEwxMi41NTMsOC43MjY2NjY2NyBDMTIuNDkzLDguMjk0NjY2NjcgMTIuMzIzLDcuOTQ2NjY2NjcgMTIuMDM5LDcuNjk0NjY2NjcgQzExLjc0MzY2NjcsNy40MzA2NjY2NyAxMS4zNjA2NjY3LDcuMjk4NjY2NjcgMTAuOTAxMzMzMyw3LjI5ODY2NjY3IEwxMC45MDEzMzMzLDcuMjk4NjY2NjcgWiIgaWQ9IuW9oueKtiI+PC9wYXRoPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=", Sj = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+6YCa55So5paH5Lu2PC90aXRsZT4KICAgIDxnIGlkPSLkvpvlupTllYbnrqHnkIYiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSLkvpvlupTllYbnrqHnkIYt5L6b5bqU5ZWG5YiX6KGo6K+m5oOFLTIw5p2h6ZmE5Lu2IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMzgzLjAwMDAwMCwgLTEwOTEuMDAwMDAwKSIgZmlsbC1ydWxlPSJub256ZXJvIj4KICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC0yMeWkh+S7vS0xMCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzc1LjAwMDAwMCwgMTA4NS4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxnIGlkPSLpgJrnlKjmlofku7YiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDguMDAwMDAwLCA2LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xMS42MTUsMCBMMTYsNC40MTMzMzMzMyBMMTYsMTQuNjY2NjY2NyBDMTYsMTUuNDAzMDQ2MyAxNS40MDMwNDYzLDE2IDE0LjY2NjY2NjcsMTYgTDMuMzMzMzMzMzMsMTYgQzIuNTk2OTUzNjYsMTYgMiwxNS40MDMwNDYzIDIsMTQuNjY2NjY2NyBMMiwxMyBMMC42NjY2NjY2NzIsMTMgQzAuMjk4NDc2ODM2LDEzIDAsMTIuNzAxNTIzMiAwLDEyLjMzMzMzMzMgTDAsNi42NjY2NjY2NyBDMCw2LjQ4OTg1NTY4IDAuMDcwMjM3ODk0MSw2LjMyMDI4NjQgMC4xOTUyNjIxNDcsNi4xOTUyNjIxNSBDMC4zMjAyODY0MDEsNi4wNzAyMzc4OSAwLjQ4OTg1NTY3Nyw2IDAuNjY2NjY2NjcyLDYgTDIsNiBMMiwxLjMzMzMzMzMzIEMyLDAuNTk2OTUzNjY1IDIuNTk2OTUzNjYsMCAzLjMzMzMzMzMzLDAgTDExLjYxNSwwIFogTTExLjE5ODY2NjcsMSBMMy4zMzMzMzMzMywxIEMzLjI0NDkyNzgzLDEgMy4xNjAxNDMyLDEuMDM1MTE4OTUgMy4wOTc2MzEwNywxLjA5NzYzMTA3IEMzLjAzNTExODk1LDEuMTYwMTQzMiAzLDEuMjQ0OTI3ODMgMywxLjMzMzMzMzMzIEwzLDYgTDEzLDYgQzEzLjE3NjgxMSw2IDEzLjM0NjM4MDMsNi4wNzAyMzc4OSAxMy40NzE0MDQ1LDYuMTk1MjYyMTUgQzEzLjU5NjQyODgsNi4zMjAyODY0IDEzLjY2NjY2NjcsNi40ODk4NTU2OCAxMy42NjY2NjY3LDYuNjY2NjY2NjcgTDEzLjY2NjY2NjcsMTIuMzMzMzMzMyBDMTMuNjY2NjY2NywxMi43MDE1MjMyIDEzLjM2ODE4OTgsMTMgMTMsMTMgTDMsMTMgTDMsMTQuNjY2NjY2NyBDMywxNC43NTUwNzIyIDMuMDM1MTE4OTUsMTQuODM5ODU2OCAzLjA5NzYzMTA3LDE0LjkwMjM2ODkgQzMuMTYwMTQzMiwxNC45NjQ4ODExIDMuMjQ0OTI3ODMsMTUgMy4zMzMzMzMzMywxNSBMMTQuNjY2NjY2NywxNSBDMTQuODUwNzYxNiwxNSAxNSwxNC44NTA3NjE2IDE1LDE0LjY2NjY2NjcgTDE1LDQuODI1MzMzMzMgTDE0Ljg0MjMzMzMsNC42NjY2NjY2NyBMMTIuODY1MzMzMyw0LjY2NjY2NjY3IEMxMi4wMTkyMzMxLDQuNjY2NjY2NjcgMTEuMzMzMzMzMywzLjk4MDc2NjkxIDExLjMzMzMzMzMsMy4xMzQ2NjY2NyBMMTEuMzMzMzMzMywxLjEzNTY2NjY3IEwxMS4xOTg2NjY3LDEgWiIgaWQ9IuW9oueKtiIgZmlsbD0iIzE4OTBGRiI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDxnIGlkPSJGSUxFIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxLjYwMDAwMCwgNy40MDAwMDApIiBmaWxsPSIjRkZGRkZGIj4KICAgICAgICAgICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IkYiIHBvaW50cz0iMi4zOTQgMC41OTQgMC42NzIgMC41OTQgMC42NzIgMS44MDYgMi4yNzQgMS44MDYgMi4yNzQgMi4zOTQgMC42NzIgMi4zOTQgMC42NzIgNC4xNjQgMCA0LjE2NCAwIDAgMi4zOTQgMCI+PC9wb2x5Z29uPgogICAgICAgICAgICAgICAgICAgICAgICA8cG9seWdvbiBpZD0iSSIgcG9pbnRzPSIzLjE4NiA0LjE2NCAzLjE4NiAwIDMuODU4IDAgMy44NTggNC4xNjQiPjwvcG9seWdvbj4KICAgICAgICAgICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IkwiIHBvaW50cz0iNS41NzQgMy41NjQgNy4zMjYgMy41NjQgNy4zMjYgNC4xNjQgNC45MDIgNC4xNjQgNC45MDIgMCA1LjU3NCAwIj48L3BvbHlnb24+CiAgICAgICAgICAgICAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJFIiBwb2ludHM9IjguNjY0IDMuNTY0IDEwLjUxMiAzLjU2NCAxMC41MTIgNC4xNjQgNy45OTIgNC4xNjQgNy45OTIgMCAxMC4zODYgMCAxMC4zODYgMC41OTQgOC42NjQgMC41OTQgOC42NjQgMS43MjggMTAuMjY2IDEuNzI4IDEwLjI2NiAyLjI5MiA4LjY2NCAyLjI5MiI+PC9wb2x5Z29uPgogICAgICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+", gs = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+SlBFR+WbvuaghzwvdGl0bGU+CiAgICA8ZyBpZD0i5L6b5bqU5ZWG566h55CGIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0i5L6b5bqU5ZWG566h55CGLeS+m+W6lOWVhuWIl+ihqOivpuaDhS0yMOadoemZhOS7tiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTM4My4wMDAwMDAsIC03MzEuMDAwMDAwKSIgZmlsbC1ydWxlPSJub256ZXJvIj4KICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC0yMeWkh+S7vSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzc1LjAwMDAwMCwgNzI1LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPGcgaWQ9IkpQRUflm77moIciIHRyYW5zZm9ybT0idHJhbnNsYXRlKDguMDAwMDAwLCA2LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xMS42MTUsMCBMMTYsNC40MTMzMzMzMyBMMTYsMTQuNjY2NjY2NyBDMTYsMTUuNDAzMDQ2MyAxNS40MDMwNDYzLDE2IDE0LjY2NjY2NjcsMTYgTDMuMzMzMzMzMzMsMTYgQzIuNTk2OTUzNjYsMTYgMiwxNS40MDMwNDYzIDIsMTQuNjY2NjY2NyBMMiwxMyBMMC42NjY2NjY2NzIsMTMgQzAuMjk4NDc2ODM2LDEzIDAsMTIuNzAxNTIzMiAwLDEyLjMzMzMzMzMgTDAsNi42NjY2NjY2NyBDMCw2LjQ4OTg1NTY4IDAuMDcwMjM3ODk0MSw2LjMyMDI4NjQgMC4xOTUyNjIxNDcsNi4xOTUyNjIxNSBDMC4zMjAyODY0MDEsNi4wNzAyMzc4OSAwLjQ4OTg1NTY3Nyw2IDAuNjY2NjY2NjcyLDYgTDIsNiBMMiwxLjMzMzMzMzMzIEMyLDAuNTk2OTUzNjY1IDIuNTk2OTUzNjYsMCAzLjMzMzMzMzMzLDAgTDExLjYxNSwwIFogTTExLjE5ODY2NjcsMSBMMy4zMzMzMzMzMywxIEMzLjI0NDkyNzgzLDEgMy4xNjAxNDMyLDEuMDM1MTE4OTUgMy4wOTc2MzEwNywxLjA5NzYzMTA3IEMzLjAzNTExODk1LDEuMTYwMTQzMiAzLDEuMjQ0OTI3ODMgMywxLjMzMzMzMzMzIEwzLDYgTDEzLDYgQzEzLjE3NjgxMSw2IDEzLjM0NjM4MDMsNi4wNzAyMzc4OSAxMy40NzE0MDQ1LDYuMTk1MjYyMTUgQzEzLjU5NjQyODgsNi4zMjAyODY0IDEzLjY2NjY2NjcsNi40ODk4NTU2OCAxMy42NjY2NjY3LDYuNjY2NjY2NjcgTDEzLjY2NjY2NjcsMTIuMzMzMzMzMyBDMTMuNjY2NjY2NywxMi43MDE1MjMyIDEzLjM2ODE4OTgsMTMgMTMsMTMgTDMsMTMgTDMsMTQuNjY2NjY2NyBDMywxNC43NTUwNzIyIDMuMDM1MTE4OTUsMTQuODM5ODU2OCAzLjA5NzYzMTA3LDE0LjkwMjM2ODkgQzMuMTYwMTQzMiwxNC45NjQ4ODExIDMuMjQ0OTI3ODMsMTUgMy4zMzMzMzMzMywxNSBMMTQuNjY2NjY2NywxNSBDMTQuODUwNzYxNiwxNSAxNSwxNC44NTA3NjE2IDE1LDE0LjY2NjY2NjcgTDE1LDQuODI1MzMzMzMgTDE0Ljg0MjMzMzMsNC42NjY2NjY2NyBMMTIuODY1MzMzMyw0LjY2NjY2NjY3IEMxMi4wMTkyMzMxLDQuNjY2NjY2NjcgMTEuMzMzMzMzMywzLjk4MDc2NjkxIDExLjMzMzMzMzMsMy4xMzQ2NjY2NyBMMTEuMzMzMzMzMywxLjEzNTY2NjY3IEwxMS4xOTg2NjY3LDEgWiIgaWQ9IuW9oueKtiIgZmlsbD0iI0Y2NzUwMCI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0yLjQzMjMzMzMzLDcuMzgyNjY2NjcgTDIuOTk1LDcuMzgyNjY2NjcgTDIuOTk1LDEwLjI4MDY2NjcgQzIuOTk1LDEwLjc3MjY2NjcgMi45MTMsMTEuMTMyNjY2NyAyLjc0OTY2NjY3LDExLjM3MjY2NjcgQzIuNTY3LDExLjYyNDY2NjcgMi4yNzg2NjY2NywxMS43NTA2NjY3IDEuODc5NjY2NjcsMTEuNzUwNjY2NyBDMS41MzMzMzMzNCwxMS43NTA2NjY3IDEuMjY5LDExLjYzMDY2NjcgMS4wOTEsMTEuMzkwNjY2NyBDMC45MDgzMzMzMjgsMTEuMTUwNjY2NyAwLjgxNywxMC44MjA2NjY3IDAuODE3LDEwLjQwMDY2NjcgTDAuODE3LDEwLjI2MjY2NjcgTDEuMzc5MzMzMzMsMTAuMjYyNjY2NyBMMS4zNzkzMzMzMywxMC4zOTQ2NjY3IEMxLjM3OTMzMzMzLDEwLjg4NjY2NjcgMS41NDc2NjY2NiwxMS4xMzI2NjY3IDEuODg5MzMzMzMsMTEuMTMyNjY2NyBDMi4wNzY2NjY2NiwxMS4xMzI2NjY3IDIuMjE2LDExLjA2MDY2NjcgMi4zMDI2NjY2NywxMC45MjI2NjY3IEMyLjM4OTMzMzM0LDEwLjc4NDY2NjcgMi40MzI2NjY2NywxMC41NjI2NjY3IDIuNDMyNjY2NjcsMTAuMjU2NjY2NyBMMi40MzI2NjY2Nyw3LjM4MjY2NjY3IEwyLjQzMjMzMzMzLDcuMzgyNjY2NjcgWiBNMy42NjgsNy4zODI2NjY2NyBMNS4wOTEsNy4zODI2NjY2NyBDNS45MTc2NjY2Nyw3LjM4MjY2NjY3IDYuMzM2LDcuODIwNjY2NjcgNi4zMzYsOC42OTY2NjY2NyBDNi4zMzYsOS41Nzg2NjY2NyA1LjkxOCwxMC4wMjI2NjY3IDUuMDgxMzMzMzMsMTAuMDIyNjY2NyBMNC4yMzAzMzMzMywxMC4wMjI2NjY3IEw0LjIzMDMzMzMzLDExLjY2NjY2NjcgTDMuNjY4LDExLjY2NjY2NjcgTDMuNjY4LDcuMzgyNjY2NjcgWiBNNC4yMzAzMzMzMyw3Ljk4MjY2NjY3IEw0LjIzMDMzMzMzLDkuNDIyNjY2NjcgTDUuMDQ3NjY2NjcsOS40MjI2NjY2NyBDNS4yOTc2NjY2Nyw5LjQyMjY2NjY3IDUuNDgwMzMzMzQsOS4zNjI2NjY2NyA1LjU5NTY2NjY3LDkuMjU0NjY2NjcgQzUuNzExMzMzMzQsOS4xNDA2NjY2NyA1Ljc2OSw4Ljk1NDY2NjY3IDUuNzY5LDguNjk2NjY2NjcgQzUuNzY5LDguNDM4NjY2NjcgNS43MDYzMzMzMyw4LjI1ODY2NjY3IDUuNTkxLDguMTUwNjY2NjcgQzUuNDc1NjY2NjcsOC4wMzY2NjY2NyA1LjI5Myw3Ljk4MjY2NjY3IDUuMDQ3NjY2NjcsNy45ODI2NjY2NyBMNC4yMzAzMzMzMyw3Ljk4MjY2NjY3IEw0LjIzMDMzMzMzLDcuOTgyNjY2NjcgWiBNNi44MTcsNy4zODI2NjY2NyBMOS4yOTMsNy4zODI2NjY2NyBMOS4yOTMsNy45ODI2NjY2NyBMNy4zNzk2NjY2Nyw3Ljk4MjY2NjY3IEw3LjM3OTY2NjY3LDkuMTcwNjY2NjcgTDkuMTc3MzMzMzMsOS4xNzA2NjY2NyBMOS4xNzczMzMzMyw5Ljc3MDY2NjY3IEw3LjM3OTMzMzMzLDkuNzcwNjY2NjcgTDcuMzc5MzMzMzMsMTEuMDY2NjY2NyBMOS4zNzQ2NjY2NywxMS4wNjY2NjY3IEw5LjM3NDY2NjY3LDExLjY2NjY2NjcgTDYuODE2NjY2NjcsMTEuNjY2NjY2NyBMNi44MTY2NjY2Nyw3LjM4MjY2NjY3IEw2LjgxNyw3LjM4MjY2NjY3IFogTTExLjM5MzY2NjcsNy4yOTg2NjY2NyBDMTEuODM2LDcuMjk4NjY2NjcgMTIuMTgyMzMzMyw3LjQxODY2NjY3IDEyLjQzNyw3LjY2NDY2NjY3IEMxMi42ODIzMzMzLDcuOTA0NjY2NjcgMTIuODM2LDguMjU4NjY2NjcgMTIuODk4NjY2Nyw4LjczODY2NjY3IEwxMi4zMzEzMzMzLDguNzM4NjY2NjcgQzEyLjI4MzMzMzMsOC40NjI2NjY2NyAxMi4xNzczMzMzLDguMjU4NjY2NjcgMTIuMDIzNjY2Nyw4LjEyMDY2NjY3IEMxMS44NjUsNy45ODI2NjY2NyAxMS42NTM2NjY3LDcuOTE2NjY2NjcgMTEuMzkzNjY2Nyw3LjkxNjY2NjY3IEMxMS4wNzE2NjY3LDcuOTE2NjY2NjcgMTAuODE3LDguMDQ4NjY2NjcgMTAuNjI5MzMzMyw4LjMyNDY2NjY3IEMxMC40MjI2NjY3LDguNjEyNjY2NjcgMTAuMzIxNjY2Nyw5LjAxNDY2NjY3IDEwLjMyMTY2NjcsOS41NDI2NjY2NyBDMTAuMzIxNjY2NywxMC4wNDY2NjY3IDEwLjQxMywxMC40MzY2NjY3IDEwLjU5NTY2NjcsMTAuNzA2NjY2NyBDMTAuNzkzLDEwLjk5NDY2NjcgMTEuMTAwNjY2NywxMS4xMzg2NjY3IDExLjUxOSwxMS4xMzg2NjY3IEMxMS42ODIzMzMzLDExLjEzODY2NjcgMTEuODM2LDExLjExNDY2NjcgMTEuOTgwMzMzMywxMS4wNjY2NjY3IEMxMi4xMTI2MzI3LDExLjAxODk5NjQgMTIuMjM3Mjc2NSwxMC45NTIyOTUxIDEyLjM1MDMzMzMsMTAuODY4NjY2NyBMMTIuMzUwMzMzMyw5Ljk4NjY2NjY3IEwxMS40NDIsOS45ODY2NjY2NyBMMTEuNDQyLDkuMzg2NjY2NjcgTDEyLjkxMyw5LjM4NjY2NjY3IEwxMi45MTMsMTEuMTk4NjY2NyBDMTIuNzMzODY0NiwxMS4zNzQ4NjcyIDEyLjUyMTM4NzIsMTEuNTEzNTcyNCAxMi4yODgsMTEuNjA2NjY2NyBDMTIuMDM4LDExLjcwMjY2NjcgMTEuNzY0LDExLjc1MDY2NjcgMTEuNDU2MzMzMywxMS43NTA2NjY3IEMxMC45MDgzMzMzLDExLjc1MDY2NjcgMTAuNDg1LDExLjUzNDY2NjcgMTAuMTgyMzMzMywxMS4xMDI2NjY3IEM5Ljg5ODY2NjY2LDEwLjcwMDY2NjcgOS43NTksMTAuMTc4NjY2NyA5Ljc1OSw5LjU0MjY2NjY3IEM5Ljc1OSw4LjkwMDY2NjY3IDkuODk4NjY2NjcsOC4zNzI2NjY2NyAxMC4xODIzMzMzLDcuOTU4NjY2NjcgQzEwLjQ4MDMzMzMsNy41MTQ2NjY2NyAxMC44ODQzMzMzLDcuMjk4NjY2NjcgMTEuMzkzNjY2Nyw3LjI5ODY2NjY3IEwxMS4zOTM2NjY3LDcuMjk4NjY2NjcgWiIgaWQ9IuW9oueKtiIgZmlsbD0iI0ZGRkZGRiI+PC9wYXRoPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=", Bj = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+UERG5Zu+5qCHPC90aXRsZT4KICAgIDxnIGlkPSLkvpvlupTllYbnrqHnkIYiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSLkvpvlupTllYbnrqHnkIYt5L6b5bqU5ZWG5YiX6KGo6K+m5oOFLTIw5p2h6ZmE5Lu2IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMzgzLjAwMDAwMCwgLTY5MS4wMDAwMDApIiBmaWxsPSIjRUE0MzE4IiBmaWxsLXJ1bGU9Im5vbnplcm8iPgogICAgICAgICAgICA8ZyBpZD0i57yW57uELTIxIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzNzUuMDAwMDAwLCA2ODUuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8ZyBpZD0iUERG5Zu+5qCHIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg4LjAwMDAwMCwgNi4wMDAwMDApIj4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMyw2IEwxMyw2IEMxMy4xNzY4MTEsNiAxMy4zNDYzODAzLDYuMDcwMjM3ODkgMTMuNDcxNDA0NSw2LjE5NTI2MjE1IEMxMy41OTY0Mjg4LDYuMzIwMjg2NCAxMy42NjY2NjY3LDYuNDg5ODU1NjggMTMuNjY2NjY2Nyw2LjY2NjY2NjY3IEwxMy42NjY2NjY3LDEyLjMzMzMzMzMgQzEzLjY2NjY2NjcsMTIuNzAxNTIzMiAxMy4zNjgxODk4LDEzIDEzLDEzIEwzLDEzIEwzLDE0LjY2NjY2NjcgQzMsMTQuNzU1MDcyMiAzLjAzNTExODk1LDE0LjgzOTg1NjggMy4wOTc2MzEwNywxNC45MDIzNjg5IEMzLjE2MDE0MzIsMTQuOTY0ODgxMSAzLjI0NDkyNzgzLDE1IDMuMzMzMzMzMzMsMTUgTDE0LjY2NjY2NjcsMTUgQzE0Ljg1MDc2MTYsMTUgMTUsMTQuODUwNzYxNiAxNSwxNC42NjY2NjY3IEwxNSw0LjgyNTMzMzMzIEwxNC44NDIzMzMzLDQuNjY2NjY2NjcgTDEyLjg2NTMzMzMsNC42NjY2NjY2NyBDMTIuMDE5MjMzMSw0LjY2NjY2NjY3IDExLjMzMzMzMzMsMy45ODA3NjY5MSAxMS4zMzMzMzMzLDMuMTM0NjY2NjcgTDExLjMzMzMzMzMsMS4xMzUzMzMzMyBMMTEuMTk4NjY2NywxIEwzLjMzMzMzMzMzLDEgQzMuMjQ0OTI3ODMsMSAzLjE2MDE0MzIsMS4wMzUxMTg5NSAzLjA5NzYzMTA3LDEuMDk3NjMxMDcgQzMuMDM1MTE4OTUsMS4xNjAxNDMyIDMsMS4yNDQ5Mjc4MyAzLDEuMzMzMzMzMzMgTDMsNiBaIE0yLDEzIEwwLjY2NjY2NjY3MiwxMyBDMC4yOTg0NzY4MzYsMTMgMCwxMi43MDE1MjMyIDAsMTIuMzMzMzMzMyBMMCw2LjY2NjY2NjY3IEMwLDYuNDg5ODU1NjggMC4wNzAyMzc4OTQxLDYuMzIwMjg2NCAwLjE5NTI2MjE0Nyw2LjE5NTI2MjE1IEMwLjMyMDI4NjQwMSw2LjA3MDIzNzg5IDAuNDg5ODU1Njc3LDYgMC42NjY2NjY2NzIsNiBMMiw2IEwyLDEuMzMzMzMzMzMgQzIsMC41OTY5NTM2NjUgMi41OTY5NTM2NiwwIDMuMzMzMzMzMzMsMCBMMTEuNjE1LDAgTDE2LDQuNDEzMzMzMzMgTDE2LDE0LjY2NjY2NjcgQzE2LDE1LjQwMzA0NjMgMTUuNDAzMDQ2MywxNiAxNC42NjY2NjY3LDE2IEwzLjMzMzMzMzMzLDE2IEMyLjU5Njk1MzY2LDE2IDIsMTUuNDAzMDQ2MyAyLDE0LjY2NjY2NjcgTDIsMTMgTDIsMTMgWiBNMS4zODIzMzMzMyw3LjM4MjY2NjY3IEwxLjM4MjMzMzMzLDExLjY2NjY2NjcgTDIuMDg0MzMzMzMsMTEuNjY2NjY2NyBMMi4wODQzMzMzMywxMC4wMjI2NjY3IEwzLjE0NjMzMzMzLDEwLjAyMjY2NjcgQzQuMTkwMzMzMzMsMTAuMDIyNjY2NyA0LjcxMjMzMzMzLDkuNTc4NjY2NjcgNC43MTIzMzMzMyw4LjY5NjY2NjY3IEM0LjcxMjMzMzMzLDcuODIwNjY2NjcgNC4xOTAzMzMzMyw3LjM4MjY2NjY3IDMuMTU4MzMzMzMsNy4zODI2NjY2NyBMMS4zODIzMzMzMyw3LjM4MjY2NjY3IFogTTIuMDg0MzMzMzMsNy45ODI2NjY2NyBMMy4xMDQzMzMzMyw3Ljk4MjY2NjY3IEMzLjQxMDMzMzMzLDcuOTgyNjY2NjcgMy42MzgzMzMzMyw4LjAzNjY2NjY3IDMuNzgyMzMzMzMsOC4xNTA2NjY2NyBDMy45MjYzMzMzMyw4LjI1ODY2NjY3IDQuMDA0MzMzMzMsOC40Mzg2NjY2NyA0LjAwNDMzMzMzLDguNjk2NjY2NjcgQzQuMDA0MzMzMzMsOC45NTQ2NjY2NyAzLjkzMjMzMzMzLDkuMTQwNjY2NjcgMy43ODgzMzMzMyw5LjI1NDY2NjY3IEMzLjY0NDMzMzMzLDkuMzYyNjY2NjcgMy40MTYzMzMzMyw5LjQyMjY2NjY3IDMuMTA0MzMzMzMsOS40MjI2NjY2NyBMMi4wODQzMzMzMyw5LjQyMjY2NjY3IEwyLjA4NDMzMzMzLDcuOTgyNjY2NjcgTDIuMDg0MzMzMzMsNy45ODI2NjY2NyBaIE01LjMxMjMzMzMzLDcuMzgyNjY2NjcgTDUuMzEyMzMzMzMsMTEuNjY2NjY2NyBMNi44NzgzMzMzMywxMS42NjY2NjY3IEM3LjU3NDMzMzMzLDExLjY2NjY2NjcgOC4wOTYzMzMzMywxMS40NzQ2NjY3IDguNDU2MzMzMzMsMTEuMDkwNjY2NyBDOC43OTgzMzMzMywxMC43MjQ2NjY3IDguOTcyMzMzMzMsMTAuMjAyNjY2NyA4Ljk3MjMzMzMzLDkuNTI0NjY2NjcgQzguOTcyMzMzMzMsOC44NDA2NjY2NyA4Ljc5ODMzMzMzLDguMzE4NjY2NjcgOC40NTYzMzMzMyw3Ljk1ODY2NjY3IEM4LjA5NjMzMzMzLDcuNTc0NjY2NjcgNy41NzQzMzMzMyw3LjM4MjY2NjY3IDYuODc4MzMzMzMsNy4zODI2NjY2NyBMNS4zMTIzMzMzMyw3LjM4MjY2NjY3IFogTTYuMDE0MzMzMzMsNy45ODI2NjY2NyBMNi43NDYzMzMzMyw3Ljk4MjY2NjY3IEM3LjI4MDMzMzMzLDcuOTgyNjY2NjcgNy42NzAzMzMzMyw4LjEwMjY2NjY3IDcuOTE2MzMzMzMsOC4zNDg2NjY2NyBDOC4xNTYzMzMzMyw4LjU4ODY2NjY3IDguMjc2MzMzMzMsOC45ODQ2NjY2NyA4LjI3NjMzMzMzLDkuNTI0NjY2NjcgQzguMjc2MzMzMzMsMTAuMDUyNjY2NyA4LjE1NjMzMzMzLDEwLjQ0MjY2NjcgNy45MTYzMzMzMywxMC42OTQ2NjY3IEM3LjY3MDMzMzMzLDEwLjk0MDY2NjcgNy4yODAzMzMzMywxMS4wNjY2NjY3IDYuNzQ2MzMzMzMsMTEuMDY2NjY2NyBMNi4wMTQzMzMzMywxMS4wNjY2NjY3IEw2LjAxNDMzMzMzLDcuOTgyNjY2NjcgTDYuMDE0MzMzMzMsNy45ODI2NjY2NyBaIE05LjYzMjMzMzMzLDcuMzgyNjY2NjcgTDkuNjMyMzMzMzMsMTEuNjY2NjY2NyBMMTAuMzM0MzMzMywxMS42NjY2NjY3IEwxMC4zMzQzMzMzLDkuNzcwNjY2NjcgTDEyLjQyODMzMzMsOS43NzA2NjY2NyBMMTIuNDI4MzMzMyw5LjE3MDY2NjY3IEwxMC4zMzQzMzMzLDkuMTcwNjY2NjcgTDEwLjMzNDMzMzMsNy45ODI2NjY2NyBMMTIuNTU0MzMzMyw3Ljk4MjY2NjY3IEwxMi41NTQzMzMzLDcuMzgyNjY2NjcgTDkuNjMyMzMzMzMsNy4zODI2NjY2NyBaIiBpZD0i5b2i54q2Ij48L3BhdGg+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==", kj = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+UE5H5Zu+5qCHPC90aXRsZT4KICAgIDxnIGlkPSLkvpvlupTllYbnrqHnkIYiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSLkvpvlupTllYbnrqHnkIYt5L6b5bqU5ZWG5YiX6KGo6K+m5oOFLTIw5p2h6ZmE5Lu2IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMzgzLjAwMDAwMCwgLTk3MS4wMDAwMDApIiBmaWxsPSIjRkNDQzAwIiBmaWxsLXJ1bGU9Im5vbnplcm8iPgogICAgICAgICAgICA8ZyBpZD0i57yW57uELTIx5aSH5Lu9LTciIHRyYW5zZm9ybT0idHJhbnNsYXRlKDM3NS4wMDAwMDAsIDk2NS4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxnIGlkPSJQTkflm77moIciIHRyYW5zZm9ybT0idHJhbnNsYXRlKDguMDAwMDAwLCA2LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0zLDYgTDEzLDYgQzEzLjE3NjgxMSw2IDEzLjM0NjM4MDMsNi4wNzAyMzc4OSAxMy40NzE0MDQ1LDYuMTk1MjYyMTUgQzEzLjU5NjQyODgsNi4zMjAyODY0IDEzLjY2NjY2NjcsNi40ODk4NTU2OCAxMy42NjY2NjY3LDYuNjY2NjY2NjcgTDEzLjY2NjY2NjcsMTIuMzMzMzMzMyBDMTMuNjY2NjY2NywxMi43MDE1MjMyIDEzLjM2ODE4OTgsMTMgMTMsMTMgTDMsMTMgTDMsMTQuNjY2NjY2NyBDMywxNC43NTUwNzIyIDMuMDM1MTE4OTUsMTQuODM5ODU2OCAzLjA5NzYzMTA3LDE0LjkwMjM2ODkgQzMuMTYwMTQzMiwxNC45NjQ4ODExIDMuMjQ0OTI3ODMsMTUgMy4zMzMzMzMzMywxNSBMMTQuNjY2NjY2NywxNSBDMTQuODUwNzYxNiwxNSAxNSwxNC44NTA3NjE2IDE1LDE0LjY2NjY2NjcgTDE1LDQuODI1MzMzMzMgTDE0Ljg0MjMzMzMsNC42NjY2NjY2NyBMMTIuODY1MzMzMyw0LjY2NjY2NjY3IEMxMi4wMTkyMzMxLDQuNjY2NjY2NjcgMTEuMzMzMzMzMywzLjk4MDc2NjkxIDExLjMzMzMzMzMsMy4xMzQ2NjY2NyBMMTEuMzMzMzMzMywxLjEzNTMzMzMzIEwxMS4xOTg2NjY3LDEgTDMuMzMzMzMzMzMsMSBDMy4yNDQ5Mjc4MywxIDMuMTYwMTQzMiwxLjAzNTExODk1IDMuMDk3NjMxMDcsMS4wOTc2MzEwNyBDMy4wMzUxMTg5NSwxLjE2MDE0MzIgMywxLjI0NDkyNzgzIDMsMS4zMzMzMzMzMyBMMyw2IFogTTIsMTMgTDAuNjY2NjY2NjcyLDEzIEMwLjI5ODQ3NjgzNiwxMyAwLDEyLjcwMTUyMzIgMCwxMi4zMzMzMzMzIEwwLDYuNjY2NjY2NjcgQzAsNi40ODk4NTU2OCAwLjA3MDIzNzg5NDEsNi4zMjAyODY0IDAuMTk1MjYyMTQ3LDYuMTk1MjYyMTUgQzAuMzIwMjg2NDAxLDYuMDcwMjM3ODkgMC40ODk4NTU2NzcsNiAwLjY2NjY2NjY3Miw2IEwyLDYgTDIsMS4zMzMzMzMzMyBDMiwwLjU5Njk1MzY2NSAyLjU5Njk1MzY2LDAgMy4zMzMzMzMzMywwIEwxMS42MTUsMCBMMTYsNC40MTMzMzMzMyBMMTYsMTQuNjY2NjY2NyBDMTYsMTUuNDAzMDQ2MyAxNS40MDMwNDYzLDE2IDE0LjY2NjY2NjcsMTYgTDMuMzMzMzMzMzMsMTYgQzIuNTk2OTUzNjYsMTYgMiwxNS40MDMwNDYzIDIsMTQuNjY2NjY2NyBMMiwxMyBMMiwxMyBaIE0xLjQ0MjMzMzMzLDcuMzgyNjY2NjcgTDEuNDQyMzMzMzMsMTEuNjY2NjY2NyBMMi4wNzIzMzMzMywxMS42NjY2NjY3IEwyLjA3MjMzMzMzLDEwLjAyMjY2NjcgTDMuMDI1NjY2NjcsMTAuMDIyNjY2NyBDMy45NjMsMTAuMDIyNjY2NyA0LjQzMTMzMzMzLDkuNTc4NjY2NjcgNC40MzEzMzMzMyw4LjY5NjY2NjY3IEM0LjQzMTMzMzMzLDcuODIwNjY2NjcgMy45NjMsNy4zODI2NjY2NyAzLjAzNjMzMzMzLDcuMzgyNjY2NjcgTDEuNDQyMzMzMzMsNy4zODI2NjY2NyBaIE0yLjA3MjMzMzMzLDcuOTgyNjY2NjcgTDIuOTg4LDcuOTgyNjY2NjcgQzMuMjYyNjY2NjcsNy45ODI2NjY2NyAzLjQ2NzMzMzMzLDguMDM2NjY2NjcgMy41OTY2NjY2Nyw4LjE1MDY2NjY3IEMzLjcyNiw4LjI1ODY2NjY3IDMuNzk2LDguNDM4NjY2NjcgMy43OTYsOC42OTY2NjY2NyBDMy43OTYsOC45NTQ2NjY2NyAzLjczMTMzMzMzLDkuMTQwNjY2NjcgMy42MDIsOS4yNTQ2NjY2NyBDMy40NzI2NjY2Nyw5LjM2MjY2NjY3IDMuMjY4LDkuNDIyNjY2NjcgMi45ODgsOS40MjI2NjY2NyBMMi4wNzIzMzMzMyw5LjQyMjY2NjY3IEwyLjA3MjMzMzMzLDcuOTgyNjY2NjcgTDIuMDcyMzMzMzMsNy45ODI2NjY2NyBaIE00Ljk3LDcuMzgyNjY2NjcgTDQuOTcsMTEuNjY2NjY2NyBMNS42LDExLjY2NjY2NjcgTDUuNiw4LjUzNDY2NjY3IEw1LjYyMTY2NjY3LDguNTM0NjY2NjcgTDcuNTQ0NjY2NjcsMTEuNjY2NjY2NyBMOC4xNTg2NjY2NywxMS42NjY2NjY3IEw4LjE1ODY2NjY3LDcuMzgyNjY2NjcgTDcuNTIzMzMzMzMsNy4zODI2NjY2NyBMNy41MjMzMzMzMywxMC40NzI2NjY3IEw3LjUwMiwxMC40NzI2NjY3IEw1LjYwMDY2NjY3LDcuMzgyNjY2NjcgTDQuOTcwNjY2NjcsNy4zODI2NjY2NyBMNC45Nyw3LjM4MjY2NjY3IFogTTEwLjU4MjMzMzMsNy4yOTg2NjY2NyBDMTAuMDExNjY2Nyw3LjI5ODY2NjY3IDkuNTU5LDcuNTE0NjY2NjcgOS4yMjUsNy45NTg2NjY2NyBDOC45MDczMzMzMyw4LjM3MjY2NjY3IDguNzUxMzMzMzMsOC45MDA2NjY2NyA4Ljc1MTMzMzMzLDkuNTQyNjY2NjcgQzguNzUxMzMzMzMsMTAuMTc4NjY2NyA4LjkwNzMzMzMzLDEwLjcwMDY2NjcgOS4yMjUsMTEuMTAyNjY2NyBDOS41NjQzMzMzMywxMS41MzQ2NjY3IDEwLjAzODMzMzMsMTEuNzUwNjY2NyAxMC42NTIzMzMzLDExLjc1MDY2NjcgQzEwLjk5NzMzMzMsMTEuNzUwNjY2NyAxMS4zMDQzMzMzLDExLjcwMjY2NjcgMTEuNTg0MzMzMywxMS42MDY2NjY3IEMxMS44NDEzNDcyLDExLjUxNjExMTQgMTIuMDc4ODcxMywxMS4zNzc2Njg3IDEyLjI4NDMzMzMsMTEuMTk4NjY2NyBMMTIuMjg0MzMzMyw5LjM4NjY2NjY3IEwxMC42MzY2NjY3LDkuMzg2NjY2NjcgTDEwLjYzNjY2NjcsOS45ODY2NjY2NyBMMTEuNjU0NjY2Nyw5Ljk4NjY2NjY3IEwxMS42NTQ2NjY3LDEwLjg2ODY2NjcgQzExLjUyNjA4MzIsMTAuOTUzMjAxNiAxMS4zODY1NzY4LDExLjAxOTgxNDggMTEuMjQsMTEuMDY2NjY2NyBDMTEuMDcyMDU4NywxMS4xMTU1NTc4IDEwLjg5NzkwOTUsMTEuMTM5ODEwNyAxMC43MjMsMTEuMTM4NjY2NyBDMTAuMjU0MzMzMywxMS4xMzg2NjY3IDkuOTA5NjY2NjcsMTAuOTk0NjY2NyA5LjY4ODY2NjY3LDEwLjcwNjY2NjcgQzkuNDg0LDEwLjQzNjY2NjcgOS4zODIsMTAuMDQ2NjY2NyA5LjM4Miw5LjU0MjY2NjY3IEM5LjM4Miw5LjAxNDY2NjY3IDkuNDk0NjY2NjcsOC42MTI2NjY2NyA5LjcyNjMzMzMzLDguMzI0NjY2NjcgQzkuOTM2MzMzMzMsOC4wNDg2NjY2NyAxMC4yMjIsNy45MTY2NjY2NyAxMC41ODMsNy45MTY2NjY2NyBDMTAuODczNjY2Nyw3LjkxNjY2NjY3IDExLjExMDY2NjcsNy45ODI2NjY2NyAxMS4yODgzMzMzLDguMTIwNjY2NjcgQzExLjQ2MDY2NjcsOC4yNTg2NjY2NyAxMS41NzkzMzMzLDguNDYyNjY2NjcgMTEuNjMzLDguNzM4NjY2NjcgTDEyLjI2ODY2NjcsOC43Mzg2NjY2NyBDMTIuMTk4NjY2Nyw4LjI1ODY2NjY3IDEyLjAyNjMzMzMsNy45MDQ2NjY2NyAxMS43NTE2NjY3LDcuNjY0NjY2NjcgQzExLjQ2Niw3LjQxODY2NjY3IDExLjA3ODMzMzMsNy4yOTg2NjY2NyAxMC41ODI2NjY3LDcuMjk4NjY2NjcgTDEwLjU4MjMzMzMsNy4yOTg2NjY2NyBaIiBpZD0i5b2i54q2Ij48L3BhdGg+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==", Eu = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+UFBU5Zu+5qCHPC90aXRsZT4KICAgIDxnIGlkPSLkvpvlupTllYbnrqHnkIYiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSLkvpvlupTllYbnrqHnkIYt5L6b5bqU5ZWG5YiX6KGo6K+m5oOFLTIw5p2h6ZmE5Lu2IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMzgzLjAwMDAwMCwgLTg5MS4wMDAwMDApIiBmaWxsPSIjRjg1MjA3IiBmaWxsLXJ1bGU9Im5vbnplcm8iPgogICAgICAgICAgICA8ZyBpZD0i57yW57uELTIx5aSH5Lu9LTUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDM3NS4wMDAwMDAsIDg4NS4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxnIGlkPSJQUFTlm77moIciIHRyYW5zZm9ybT0idHJhbnNsYXRlKDguMDAwMDAwLCA2LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0zLDYgTDEzLDYgQzEzLjE3NjgxMSw2IDEzLjM0NjM4MDMsNi4wNzAyMzc4OSAxMy40NzE0MDQ1LDYuMTk1MjYyMTUgQzEzLjU5NjQyODgsNi4zMjAyODY0IDEzLjY2NjY2NjcsNi40ODk4NTU2OCAxMy42NjY2NjY3LDYuNjY2NjY2NjcgTDEzLjY2NjY2NjcsMTIuMzMzMzMzMyBDMTMuNjY2NjY2NywxMi43MDE1MjMyIDEzLjM2ODE4OTgsMTMgMTMsMTMgTDMsMTMgTDMsMTQuNjY2NjY2NyBDMywxNC43NTUwNzIyIDMuMDM1MTE4OTUsMTQuODM5ODU2OCAzLjA5NzYzMTA3LDE0LjkwMjM2ODkgQzMuMTYwMTQzMiwxNC45NjQ4ODExIDMuMjQ0OTI3ODMsMTUgMy4zMzMzMzMzMywxNSBMMTQuNjY2NjY2NywxNSBDMTQuODUwNzYxNiwxNSAxNSwxNC44NTA3NjE2IDE1LDE0LjY2NjY2NjcgTDE1LDQuODI1MzMzMzMgTDE0Ljg0MjMzMzMsNC42NjY2NjY2NyBMMTIuODY1MzMzMyw0LjY2NjY2NjY3IEMxMi4wMTkyMzMxLDQuNjY2NjY2NjcgMTEuMzMzMzMzMywzLjk4MDc2NjkxIDExLjMzMzMzMzMsMy4xMzQ2NjY2NyBMMTEuMzMzMzMzMywxLjEzNTMzMzMzIEwxMS4xOTg2NjY3LDEgTDMuMzMzMzMzMzMsMSBDMy4yNDQ5Mjc4MywxIDMuMTYwMTQzMiwxLjAzNTExODk1IDMuMDk3NjMxMDcsMS4wOTc2MzEwNyBDMy4wMzUxMTg5NSwxLjE2MDE0MzIgMywxLjI0NDkyNzgzIDMsMS4zMzMzMzMzMyBMMyw2IFogTTIsMTMgTDAuNjY2NjY2NjcyLDEzIEMwLjI5ODQ3NjgzNiwxMyAwLDEyLjcwMTUyMzIgMCwxMi4zMzMzMzMzIEwwLDYuNjY2NjY2NjcgQzAsNi40ODk4NTU2OCAwLjA3MDIzNzg5NDEsNi4zMjAyODY0IDAuMTk1MjYyMTQ3LDYuMTk1MjYyMTUgQzAuMzIwMjg2NDAxLDYuMDcwMjM3ODkgMC40ODk4NTU2NzcsNiAwLjY2NjY2NjY3Miw2IEwyLDYgTDIsMS4zMzMzMzMzMyBDMiwwLjU5Njk1MzY2NSAyLjU5Njk1MzY2LDAgMy4zMzMzMzMzMywwIEwxMS42MTUsMCBMMTYsNC40MTMzMzMzMyBMMTYsMTQuNjY2NjY2NyBDMTYsMTUuNDAzMDQ2MyAxNS40MDMwNDYzLDE2IDE0LjY2NjY2NjcsMTYgTDMuMzMzMzMzMzMsMTYgQzIuNTk2OTUzNjYsMTYgMiwxNS40MDMwNDYzIDIsMTQuNjY2NjY2NyBMMiwxMyBMMiwxMyBaIE0xLjQ3ODMzMzMzLDcuMzgyNjY2NjcgTDEuNDc4MzMzMzMsMTEuNjY2NjY2NyBMMi4xODAzMzMzMywxMS42NjY2NjY3IEwyLjE4MDMzMzMzLDEwLjAyMjY2NjcgTDMuMjQyMzMzMzMsMTAuMDIyNjY2NyBDNC4yODYzMzMzMywxMC4wMjI2NjY3IDQuODA4MzMzMzMsOS41Nzg2NjY2NyA0LjgwODMzMzMzLDguNjk2NjY2NjcgQzQuODA4MzMzMzMsNy44MjA2NjY2NyA0LjI4NjMzMzMzLDcuMzgyNjY2NjcgMy4yNTQzMzMzMyw3LjM4MjY2NjY3IEwxLjQ3ODMzMzMzLDcuMzgyNjY2NjcgWiBNMi4xODAzMzMzMyw3Ljk4MjY2NjY3IEwzLjIwMDMzMzMzLDcuOTgyNjY2NjcgQzMuNTA2MzMzMzMsNy45ODI2NjY2NyAzLjczNDMzMzMzLDguMDM2NjY2NjcgMy44NzgzMzMzMyw4LjE1MDY2NjY3IEM0LjAyMjMzMzMzLDguMjU4NjY2NjcgNC4xMDAzMzMzMyw4LjQzODY2NjY3IDQuMTAwMzMzMzMsOC42OTY2NjY2NyBDNC4xMDAzMzMzMyw4Ljk1NDY2NjY3IDQuMDI4MzMzMzMsOS4xNDA2NjY2NyAzLjg4NDMzMzMzLDkuMjU0NjY2NjcgQzMuNzQwMzMzMzMsOS4zNjI2NjY2NyAzLjUxMjMzMzMzLDkuNDIyNjY2NjcgMy4yMDAzMzMzMyw5LjQyMjY2NjY3IEwyLjE4MDMzMzMzLDkuNDIyNjY2NjcgTDIuMTgwMzMzMzMsNy45ODI2NjY2NyBMMi4xODAzMzMzMyw3Ljk4MjY2NjY3IFogTTUuNDA4MzMzMzMsNy4zODI2NjY2NyBMNS40MDgzMzMzMywxMS42NjY2NjY3IEw2LjExMDMzMzMzLDExLjY2NjY2NjcgTDYuMTEwMzMzMzMsMTAuMDIyNjY2NyBMNy4xNzIzMzMzMywxMC4wMjI2NjY3IEM4LjIxNjMzMzMzLDEwLjAyMjY2NjcgOC43MzgzMzMzMyw5LjU3ODY2NjY3IDguNzM4MzMzMzMsOC42OTY2NjY2NyBDOC43MzgzMzMzMyw3LjgyMDY2NjY3IDguMjE2MzMzMzMsNy4zODI2NjY2NyA3LjE4NDMzMzMzLDcuMzgyNjY2NjcgTDUuNDA4MzMzMzMsNy4zODI2NjY2NyBaIE02LjExMDMzMzMzLDcuOTgyNjY2NjcgTDcuMTMwMzMzMzMsNy45ODI2NjY2NyBDNy40MzYzMzMzMyw3Ljk4MjY2NjY3IDcuNjY0MzMzMzMsOC4wMzY2NjY2NyA3LjgwODMzMzMzLDguMTUwNjY2NjcgQzcuOTUyMzMzMzMsOC4yNTg2NjY2NyA4LjAzMDMzMzMzLDguNDM4NjY2NjcgOC4wMzAzMzMzMyw4LjY5NjY2NjY3IEM4LjAzMDMzMzMzLDguOTU0NjY2NjcgNy45NTgzMzMzMyw5LjE0MDY2NjY3IDcuODE0MzMzMzMsOS4yNTQ2NjY2NyBDNy42NzAzMzMzMyw5LjM2MjY2NjY3IDcuNDQyMzMzMzMsOS40MjI2NjY2NyA3LjEzMDMzMzMzLDkuNDIyNjY2NjcgTDYuMTEwMzMzMzMsOS40MjI2NjY2NyBMNi4xMTAzMzMzMyw3Ljk4MjY2NjY3IEw2LjExMDMzMzMzLDcuOTgyNjY2NjcgWiBNOS4wMDgzMzMzMyw3LjM4MjY2NjY3IEw5LjAwODMzMzMzLDcuOTgyNjY2NjcgTDEwLjQxMjMzMzMsNy45ODI2NjY2NyBMMTAuNDEyMzMzMywxMS42NjY2NjY3IEwxMS4xMTQzMzMzLDExLjY2NjY2NjcgTDExLjExNDMzMzMsNy45ODI2NjY2NyBMMTIuNTE4MzMzMyw3Ljk4MjY2NjY3IEwxMi41MTgzMzMzLDcuMzgyNjY2NjcgTDkuMDA4MzMzMzMsNy4zODI2NjY2NyBaIiBpZD0i5b2i54q2Ij48L3BhdGg+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==", Qj = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+WExT5Zu+5qCHPC90aXRsZT4KICAgIDxnIGlkPSLkvpvlupTllYbnrqHnkIYiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSLkvpvlupTllYbnrqHnkIYt5L6b5bqU5ZWG5YiX6KGo6K+m5oOFLTIw5p2h6ZmE5Lu2IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMzgzLjAwMDAwMCwgLTc3MS4wMDAwMDApIiBmaWxsPSIjNzdENDI1IiBmaWxsLXJ1bGU9Im5vbnplcm8iPgogICAgICAgICAgICA8ZyBpZD0i57yW57uELTIx5aSH5Lu9LTIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDM3NS4wMDAwMDAsIDc2NS4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxnIGlkPSJYTFPlm77moIciIHRyYW5zZm9ybT0idHJhbnNsYXRlKDguMDAwMDAwLCA2LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xMS42MTUsMCBMMTYsNC40MTMzMzMzMyBMMTYsMTQuNjY2NjY2NyBDMTYsMTUuNDAzMDQ2MyAxNS40MDMwNDYzLDE2IDE0LjY2NjY2NjcsMTYgTDMuMzMzMzMzMzMsMTYgQzIuNTk2OTUzNjYsMTYgMiwxNS40MDMwNDYzIDIsMTQuNjY2NjY2NyBMMiwxMyBMMC42NjY2NjY2NzIsMTMgQzAuMjk4NDc2ODM2LDEzIDAsMTIuNzAxNTIzMiAwLDEyLjMzMzMzMzMgTDAsNi42NjY2NjY2NyBDMCw2LjQ4OTg1NTY4IDAuMDcwMjM3ODk0MSw2LjMyMDI4NjQgMC4xOTUyNjIxNDcsNi4xOTUyNjIxNSBDMC4zMjAyODY0MDEsNi4wNzAyMzc4OSAwLjQ4OTg1NTY3Nyw2IDAuNjY2NjY2NjcyLDYgTDIsNiBMMiwxLjMzMzMzMzMzIEMyLDAuNTk2OTUzNjY1IDIuNTk2OTUzNjYsMCAzLjMzMzMzMzMzLDAgTDExLjYxNSwwIFogTTExLjE5ODY2NjcsMSBMMy4zMzMzMzMzMywxIEMzLjI0NDkyNzgzLDEgMy4xNjAxNDMyLDEuMDM1MTE4OTUgMy4wOTc2MzEwNywxLjA5NzYzMTA3IEMzLjAzNTExODk1LDEuMTYwMTQzMiAzLDEuMjQ0OTI3ODMgMywxLjMzMzMzMzMzIEwzLDYgTDEzLDYgQzEzLjE3NjgxMSw2IDEzLjM0NjM4MDMsNi4wNzAyMzc4OSAxMy40NzE0MDQ1LDYuMTk1MjYyMTUgQzEzLjU5NjQyODgsNi4zMjAyODY0IDEzLjY2NjY2NjcsNi40ODk4NTU2OCAxMy42NjY2NjY3LDYuNjY2NjY2NjcgTDEzLjY2NjY2NjcsMTIuMzMzMzMzMyBDMTMuNjY2NjY2NywxMi43MDE1MjMyIDEzLjM2ODE4OTgsMTMgMTMsMTMgTDMsMTMgTDMsMTQuNjY2NjY2NyBDMywxNC43NTUwNzIyIDMuMDM1MTE4OTUsMTQuODM5ODU2OCAzLjA5NzYzMTA3LDE0LjkwMjM2ODkgQzMuMTYwMTQzMiwxNC45NjQ4ODExIDMuMjQ0OTI3ODMsMTUgMy4zMzMzMzMzMywxNSBMMTQuNjY2NjY2NywxNSBDMTQuODUwNzYxNiwxNSAxNSwxNC44NTA3NjE2IDE1LDE0LjY2NjY2NjcgTDE1LDQuODI1MzMzMzMgTDE0Ljg0MjMzMzMsNC42NjY2NjY2NyBMMTIuODY1MzMzMyw0LjY2NjY2NjY3IEMxMi4wMTkyMzMxLDQuNjY2NjY2NjcgMTEuMzMzMzMzMywzLjk4MDc2NjkxIDExLjMzMzMzMzMsMy4xMzQ2NjY2NyBMMTEuMzMzMzMzMywxLjEzNTY2NjY3IEwxMS4xOTg2NjY3LDEgWiBNMTAuMzYxNjY2Nyw3LjI5ODY2NjY3IEM5Ljg5OTY2NjY3LDcuMjk4NjY2NjcgOS41MjE2NjY2Nyw3LjQwMDY2NjY3IDkuMjIxNjY2NjcsNy42MTA2NjY2NyBDOC44OTc2NjY2Nyw3LjgyNjY2NjY3IDguNzQxNjY2NjcsOC4xMjY2NjY2NyA4Ljc0MTY2NjY3LDguNTA0NjY2NjcgQzguNzQxNjY2NjcsOC44ODI2NjY2NyA4LjkwMzY2NjY3LDkuMTcwNjY2NjcgOS4yMzM2NjY2Nyw5LjM2ODY2NjY3IEM5LjM1OTY2NjY3LDkuNDQwNjY2NjcgOS42ODk2NjY2Nyw5LjU2MDY2NjY3IDEwLjIxNzY2NjcsOS43Mjg2NjY2NyBDMTAuNjkxNjY2Nyw5Ljg3MjY2NjY3IDEwLjk2NzY2NjcsOS45Njg2NjY2NyAxMS4wNTE2NjY3LDEwLjAxMDY2NjcgQzExLjMxNTY2NjcsMTAuMTQyNjY2NyAxMS40NTM2NjY3LDEwLjMyMjY2NjcgMTEuNDUzNjY2NywxMC41NTA2NjY3IEMxMS40NTM2NjY3LDEwLjczMDY2NjcgMTEuMzU3NjY2NywxMC44Njg2NjY3IDExLjE3NzY2NjcsMTAuOTc2NjY2NyBDMTAuOTk3NjY2NywxMS4wNzg2NjY3IDEwLjc0NTY2NjcsMTEuMTMyNjY2NyAxMC40MzM2NjY3LDExLjEzMjY2NjcgQzEwLjA3OTY2NjcsMTEuMTMyNjY2NyA5LjgyMTY2NjY3LDExLjA2NjY2NjcgOS42NTM2NjY2NywxMC45NDY2NjY3IEM5LjQ2NzY2NjY3LDEwLjgwODY2NjcgOS4zNTM2NjY2NywxMC41NzQ2NjY3IDkuMzA1NjY2NjcsMTAuMjUwNjY2NyBMOC42MDk2NjY2NywxMC4yNTA2NjY3IEM4LjYzOTY2NjY3LDEwLjc5NjY2NjcgOC44Mzc2NjY2NywxMS4xOTI2NjY3IDkuMTk3NjY2NjcsMTEuNDQ0NjY2NyBDOS40OTE2NjY2NywxMS42NDg2NjY3IDkuOTA1NjY2NjcsMTEuNzUwNjY2NyAxMC40MzM2NjY3LDExLjc1MDY2NjcgQzEwLjk3OTY2NjcsMTEuNzUwNjY2NyAxMS40MDU2NjY3LDExLjYzNjY2NjcgMTEuNzA1NjY2NywxMS40MjA2NjY3IEMxMi4wMDU2NjY3LDExLjE5ODY2NjcgMTIuMTU1NjY2NywxMC44OTI2NjY3IDEyLjE1NTY2NjcsMTAuNTA4NjY2NyBDMTIuMTU1NjY2NywxMC4xMTI2NjY3IDExLjk2OTY2NjcsOS44MDY2NjY2NyAxMS41OTc2NjY3LDkuNTg0NjY2NjcgQzExLjQyOTY2NjcsOS40ODg2NjY2NyAxMS4wNTc2NjY3LDkuMzQ0NjY2NjcgMTAuNDc1NjY2Nyw5LjE2NDY2NjY3IEMxMC4wNzk2NjY3LDkuMDM4NjY2NjcgOS44MzM2NjY2Nyw4Ljk0ODY2NjY3IDkuNzQzNjY2NjcsOC45MDA2NjY2NyBDOS41Mzk2NjY2Nyw4Ljc5MjY2NjY3IDkuNDQzNjY2NjcsOC42NDI2NjY2NyA5LjQ0MzY2NjY3LDguNDYyNjY2NjcgQzkuNDQzNjY2NjcsOC4yNTg2NjY2NyA5LjUyNzY2NjY3LDguMTA4NjY2NjcgOS43MDc2NjY2Nyw4LjAxODY2NjY3IEM5Ljg1MTY2NjY3LDcuOTQwNjY2NjcgMTAuMDU1NjY2Nyw3LjkwNDY2NjY3IDEwLjMyNTY2NjcsNy45MDQ2NjY2NyBDMTAuNjM3NjY2Nyw3LjkwNDY2NjY3IDEwLjg3NzY2NjcsNy45NTg2NjY2NyAxMS4wMzM2NjY3LDguMDc4NjY2NjcgQzExLjE4OTY2NjcsOC4xOTI2NjY2NyAxMS4zMDM2NjY3LDguMzg0NjY2NjcgMTEuMzYzNjY2Nyw4LjY0ODY2NjY3IEwxMi4wNTk2NjY3LDguNjQ4NjY2NjcgQzEyLjAxNzY2NjcsOC4xODA2NjY2NyAxMS44NDM2NjY3LDcuODMyNjY2NjcgMTEuNTQzNjY2Nyw3LjYxMDY2NjY3IEMxMS4yNjE2NjY3LDcuNDAwNjY2NjcgMTAuODY1NjY2Nyw3LjI5ODY2NjY3IDEwLjM2MTY2NjcsNy4yOTg2NjY2NyBMMTAuMzYxNjY2Nyw3LjI5ODY2NjY3IFogTTIuNDI5NjY2NjcsNy4zODI2NjY2NyBMMS41NzE2NjY2Nyw3LjM4MjY2NjY3IEwzLjAwNTY2NjY3LDkuNDUyNjY2NjcgTDEuNDc1NjY2NjcsMTEuNjY2NjY2NyBMMi4zMzM2NjY2NywxMS42NjY2NjY3IEwzLjQzNzY2NjY3LDEwLjAxMDY2NjcgTDQuNTQxNjY2NjcsMTEuNjY2NjY2NyBMNS4zOTk2NjY2NywxMS42NjY2NjY3IEwzLjg1NzY2NjY3LDkuNDUyNjY2NjcgTDUuMzAzNjY2NjcsNy4zODI2NjY2NyBMNC40NDU2NjY2Nyw3LjM4MjY2NjY3IEwzLjQzNzY2NjY3LDguODk0NjY2NjcgTDIuNDI5NjY2NjcsNy4zODI2NjY2NyBMMi40Mjk2NjY2Nyw3LjM4MjY2NjY3IFogTTYuNDUxNjY2NjcsNy4zODI2NjY2NyBMNS43NTU2NjY2Nyw3LjM4MjY2NjY3IEw1Ljc1NTY2NjY3LDExLjY2NjY2NjcgTDguNDM0MzMzMzMsMTEuNjY2NjY2NyBMOC40MzQzMzMzMywxMS4wNjY2NjY3IEw2LjQ1MTY2NjY3LDExLjA2NjY2NjcgTDYuNDUxNjY2NjcsNy4zODI2NjY2NyBaIiBpZD0i5b2i54q2Ij48L3BhdGg+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==", Cu = [".png", ".jpg", ".gif", ".jpeg"], Uj = {
  ".doc": Ns,
  ".docx": Ns,
  ".jpg": gs,
  ".jpeg": gs,
  ".png": kj,
  ".pdf": Bj,
  ".ppt": Eu,
  ".pptx": Eu,
  ".xls": Eu,
  ".xlsx": Qj
};
function Pj() {
  return !!navigator.userAgent.match(/('phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone')/i);
}
function Vj(N) {
  return Array.isArray(N) ? N : N == null || N === "" ? [] : N.split(",");
}
const Fj = (N = "", s, r = !1) => N ? (r ? Rj(N) : N.length) > s ? N.substring(0, s - 2) + "..." + N.substring(s - 2, s) : N : "", Rj = (N) => {
  if (!N)
    return 0;
  let s = 0;
  const r = N.length;
  let i = -1;
  for (let z = 0; z < r; z++)
    i = N.charCodeAt(z), i >= 0 && i <= 128 ? s += 1 : s += 2;
  return s;
}, Wj = { class: "file-icons-panel" }, Gj = ["onClick"], Zj = {
  key: 0,
  class: "file-name"
}, Hj = oe({
  name: "FileIcons"
}), Kj = /* @__PURE__ */ oe({
  ...Hj,
  props: {
    files: {},
    size: {},
    isCard: { type: Boolean },
    showImg: { type: Boolean },
    preview: { type: Boolean },
    showName: { type: Boolean }
  },
  setup(N) {
    const s = N, r = I(!1), i = I(0), z = Ye(
      () => s.files.map((g) => {
        if (Cu.indexOf(g.suffix || "") >= 0)
          return g.shareUrl;
      }).filter((g) => g)
    ), y = Ye(() => ({
      width: (s.size || 16) + "px",
      height: (s.size || 16) + "px"
    }));
    function _(g) {
      let c = Uj[g.suffix || ""] || Sj;
      return s.showImg && Cu.indexOf(g.suffix || "") >= 0 ? g.shareUrl : c;
    }
    function d(g) {
      s.preview && (Cu.indexOf(g.suffix || "") >= 0 ? (i.value = z.value.indexOf(g.shareUrl || g.furl), r.value = !0) : window.open(g.previewUrl || g.shareUrl || g.furl, "_blank"));
    }
    return (g, c) => {
      const D = V("el-image"), A = V("el-image-viewer");
      return m(), Q("div", Wj, [
        g.files && g.files.length ? (m(), Q("div", {
          key: 0,
          class: el([g.isCard ? "card-list" : "file-list"])
        }, [
          (m(!0), Q(Ae, null, ve(g.files, (h, C) => (m(), Q("div", {
            key: C,
            class: "file-item",
            onClick: (S) => d(h)
          }, [
            de(D, {
              src: _(h),
              style: _t(y.value),
              fit: "cover"
            }, null, 8, ["src", "style"]),
            g.showName ? (m(), Q("div", Zj, Oe(Qt(Fj)(h.name, 50) + h.suffix), 1)) : ce("", !0)
          ], 8, Gj))), 128))
        ], 2)) : ce("", !0),
        r.value ? (m(), Z(A, {
          key: 1,
          onClose: c[0] || (c[0] = (h) => r.value = !1),
          teleported: "",
          initialIndex: i.value,
          "url-list": z.value
        }, null, 8, ["initialIndex", "url-list"])) : ce("", !0)
      ]);
    };
  }
});
const qj = /* @__PURE__ */ Fe(Kj, [["__scopeId", "data-v-26d8ab17"]]), Jj = {
  key: 1,
  class: "no-img-tip"
}, $j = {
  name: "ElPlusFormFile",
  inheritAttrs: !1,
  typeName: "file",
  customOptions: {}
}, xs = /* @__PURE__ */ oe({
  ...$j,
  props: {
    modelValue: {},
    field: {},
    loading: { type: Boolean },
    desc: {},
    formData: {}
  },
  setup(N) {
    const s = N;
    return (r, i) => (m(), Q("div", {
      class: "ele-form-file",
      style: _t({ marginTop: s.modelValue && s.modelValue.length > 0 ? "10px" : "0" })
    }, [
      s.modelValue && s.modelValue.length > 0 ? (m(), Z(qj, {
        key: 0,
        files: s.modelValue,
        showName: "",
        preview: ""
      }, null, 8, ["files"])) : (m(), Q("span", Jj, "暂无内容"))
    ], 4));
  }
});
const Xj = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: xs }, Symbol.toStringTag, { value: "Module" })), ez = { class: "ele-form-image" }, tz = { key: 1 }, nz = /* @__PURE__ */ Ue("span", { class: "no-img-tip" }, "—", -1), lz = [
  nz
], rz = {
  name: "ElPlusFormImage",
  inheritAttrs: !1,
  typeName: "image",
  customOptions: {}
}, Es = /* @__PURE__ */ oe({
  ...rz,
  props: {
    modelValue: {},
    field: {},
    loading: { type: Boolean },
    desc: {},
    formData: {}
  },
  setup(N) {
    const s = N, r = Pe("format"), i = I({}), z = I(xe(s));
    Te(async () => {
      i.value = await Le(s, { isShowPreview: !0, previewTeleported: !0, ...ze() });
    });
    const y = Ye(() => s.modelValue ? Array.isArray(s.modelValue) ? typeof s.modelValue[0] == "string" ? s.modelValue : s.modelValue.map((d) => d.shareUrl || d.furl) : typeof s.modelValue == "string" ? s.modelValue.split(",").map((d) => r.imgUrl(d)) : [] : []), _ = Ye(() => {
      let d = "", g = "", c = s.desc.size || "default";
      switch (c) {
        case "large":
          d = "44px", g = "44px";
          break;
        case "default":
          d = "36px", g = "36px";
          break;
        case "small":
          d = "28px", g = "28px";
          break;
        default:
          d = parseInt(c) + "px", g = parseInt(c) + "px";
          break;
      }
      return Object.assign({}, s.desc.style, { width: d, height: g, "max-width": d });
    });
    return (d, g) => {
      const c = V("el-image");
      return m(), Q("div", ez, [
        y.value && y.value.length > 0 ? (m(!0), Q(Ae, { key: 0 }, ve(y.value, (D, A) => (m(), Z(c, ee({
          class: d.desc.class,
          key: D,
          "preview-src-list": i.value.isShowPreview === !1 ? null : y.value,
          "initial-index": A,
          src: Qt(r).imgUrl(D)
        }, i.value, { style: _.value }, ye(z.value), {
          fit: i.value.fit || "cover"
        }), null, 16, ["class", "preview-src-list", "initial-index", "src", "style", "fit"]))), 128)) : (m(), Q("div", tz, lz))
      ]);
    };
  }
});
const uz = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: Es }, Symbol.toStringTag, { value: "Module" })), iz = {
  name: "ElPlusFormInput",
  inheritAttrs: !1,
  typeName: "input",
  customOptions: {}
}, Cs = /* @__PURE__ */ oe({
  ...iz,
  props: {
    modelValue: {},
    field: {},
    desc: {},
    formData: {}
  },
  emits: ["update:modelValue", "validateThis"],
  setup(N, { emit: s }) {
    const r = N, i = Pe("defaultConf"), z = I(Object.assign({}, Yn(), r.desc.slots)), y = I({}), _ = I(xe(r)), d = I();
    return s("update:modelValue", d), Te(async () => {
      var g;
      y.value = await Le(r, { autocomplete: "new-password", maxlength: (g = i.form) == null ? void 0 : g.leng.input, clearable: !0, ...ze() });
    }), Ve(
      () => r.modelValue,
      (g) => {
        g && g.length > y.value.maxlength && (g = g.substring(0, y.value.maxlength)), d.value = g;
      },
      { immediate: !0 }
    ), Ve(
      () => d.value,
      () => {
        s("validateThis");
      }
    ), (g, c) => {
      const D = V("el-input");
      return m(), Z(D, ee({ style: { display: "flex" } }, y.value, ye(_.value), {
        modelValue: d.value,
        "onUpdate:modelValue": c[0] || (c[0] = (A) => d.value = A)
      }), qt({ _: 2 }, [
        ve(z.value, (A, h, C) => ({
          name: h,
          fn: G(() => [
            Je(g.$slots, h)
          ])
        }))
      ]), 1040, ["modelValue"]);
    };
  }
}), oz = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: Cs }, Symbol.toStringTag, { value: "Module" })), sz = (N) => (Zp("data-v-e9e128a8"), N = N(), Hp(), N), az = { class: "el-plus-form-link" }, Mz = {
  style: { width: "100%" },
  class: "form-link-dialog"
}, cz = { class: "panel-left" }, fz = {
  key: 0,
  class: "panel-right"
}, Nz = /* @__PURE__ */ sz(() => /* @__PURE__ */ Ue("div", { class: "right-title" }, "已选中项：", -1)), gz = { class: "btn-panel" }, dz = {
  name: "ElPlusFormLink",
  inheritAttrs: !1,
  typeName: "link",
  customOptions: {}
}, pz = /* @__PURE__ */ oe({
  ...dz,
  props: {
    modelValue: {},
    field: {},
    loading: { type: Boolean },
    desc: {},
    formData: {}
  },
  emits: ["update:modelValue", "change", "input", "validateThis"],
  setup(N, { emit: s }) {
    const r = N, i = I(xe(r)), z = I(r.modelValue);
    s("update:modelValue", z);
    const y = I(), _ = ot([]), d = ot([]), g = ot({
      multiple: !0,
      size: r.desc.size,
      collapseTags: !0,
      collapseTagsTooltip: !0,
      clearable: !0,
      placeholder: r.desc.placeholder || "请选择" + r.desc.label
    }), c = I(!1), D = I({}), A = Ye(() => r.desc.vkey || "id"), h = I(!1), C = I(), S = ot([]);
    function U(B) {
      B && (y.value.blur(), c.value = !0);
    }
    function W() {
      S.splice(0, S.length), b();
    }
    function F(B) {
      S.splice(0, S.length), B.map((k) => {
        S.push({ label: k[r.desc.lkey || "name"], value: k[A.value], dataItem: k });
      });
    }
    function Ee({ row: B }) {
      S.splice(0, S.length), S.push({ label: B[r.desc.lkey || "name"], value: B[A.value], dataItem: B }), b();
    }
    function X(B) {
      S.splice(
        S.findIndex((k) => k.value === B.value),
        1
      ), C.value.changeSelect([{ [A.value]: B.value }]);
    }
    function ie() {
      c.value = !1;
    }
    function b() {
      d.splice(0, d.length, ...S);
      const B = [], k = [];
      _.splice(0, _.length), S.map((pe) => {
        _.push(pe.value), B.push(pe.value), k.push(pe.label);
      }), z.value = S.length > 0 ? [B, k] : [], i.value.change && i.value.change(r.formData, null, z.value), c.value = !1, s("validateThis");
    }
    return Ve(
      () => r.desc.tableConfig,
      (B) => {
        let k = {};
        B && (k = ct.cloneDeep(B), typeof r.desc.multiple == "function" ? h.value = r.desc.multiple(r.formData) : h.value = r.desc.multiple, h.value || !h.value && k.column[k.column.length - 1].label !== "操作" && k.column.push({ label: "操作", width: "120px", fixed: "right", type: "btns", btns: [{ label: "选中", on: { click: Ee } }] }), k.maxHeight = 400), D.value = k;
      },
      { deep: !0, immediate: !0 }
    ), _n(async () => {
    }), (B, k) => {
      const pe = V("el-option"), Se = V("el-select"), qe = V("ElPlusTable"), Yt = V("el-tag"), sn = V("el-scrollbar"), an = V("el-button"), w = V("el-dialog");
      return m(), Q("div", az, [
        de(Se, ee({
          ref_key: "selectRef",
          ref: y,
          style: [{ width: "100%" }, B.desc.style],
          class: B.desc.class
        }, g, {
          teleported: !1,
          loading: B.loading,
          modelValue: _,
          onVisibleChange: U,
          onClear: W
        }, ye(i.value)), {
          default: G(() => [
            (m(!0), Q(Ae, null, ve(d, (T) => (m(), Z(pe, ee({
              key: T.value
            }, T), null, 16))), 128))
          ]),
          _: 1
        }, 16, ["class", "style", "loading", "modelValue"]),
        de(w, {
          width: B.desc.dialogWidth || "1000px",
          title: B.desc.title || B.desc.placeholder || "请选择" + B.desc.label,
          draggable: "",
          closeOnClickModal: !1,
          showCancel: "",
          modelValue: c.value,
          "onUpdate:modelValue": k[0] || (k[0] = (T) => c.value = T),
          "append-to-body": "",
          "destroy-on-close": ""
        }, {
          default: G(() => [
            Ue("div", Mz, [
              Ue("div", cz, [
                D.value ? (m(), Z(qe, {
                  key: 0,
                  ref_key: "multipleTableRef",
                  ref: C,
                  tableConfig: D.value,
                  type: h.value ? "selection" : "index",
                  isIndex: !1,
                  rowKey: A.value,
                  onSelection: F
                }, null, 8, ["tableConfig", "type", "rowKey"])) : ce("", !0)
              ]),
              h.value ? (m(), Q("div", fz, [
                Nz,
                de(sn, {
                  height: "480px",
                  class: "tag-list"
                }, {
                  default: G(() => [
                    (m(!0), Q(Ae, null, ve(S, (T) => (m(), Z(Yt, {
                      class: "tag-item",
                      style: { "margin-right": "10px", "margin-bottom": "10px" },
                      key: T.value,
                      closable: "",
                      onClose: () => X(T)
                    }, {
                      default: G(() => [
                        Ke(Oe(T.label), 1)
                      ]),
                      _: 2
                    }, 1032, ["onClose"]))), 128))
                  ]),
                  _: 1
                }),
                Ue("div", gz, [
                  de(an, { onClick: ie }, {
                    default: G(() => [
                      Ke("取消")
                    ]),
                    _: 1
                  }),
                  de(an, {
                    type: "primary",
                    onClick: b
                  }, {
                    default: G(() => [
                      Ke("确定")
                    ]),
                    _: 1
                  })
                ])
              ])) : ce("", !0)
            ])
          ]),
          _: 1
        }, 8, ["width", "title", "modelValue"])
      ]);
    };
  }
});
const bs = /* @__PURE__ */ Fe(pz, [["__scopeId", "data-v-e9e128a8"]]), jz = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: bs }, Symbol.toStringTag, { value: "Module" })), zz = {
  name: "ElPlusFormNbinput",
  inheritAttrs: !1,
  typeName: "nbinput",
  customOptions: {}
}, Os = /* @__PURE__ */ oe({
  ...zz,
  props: {
    modelValue: {},
    field: {},
    loading: { type: Boolean },
    desc: {},
    formData: {},
    rowIndex: {}
  },
  emits: ["update:modelValue"],
  setup(N, { emit: s }) {
    const r = N, i = I(r.modelValue);
    s("update:modelValue", i);
    const z = I(Object.assign({}, Yn(), r.desc.slots)), y = I({}), _ = I(xe(r));
    return Te(async () => {
      y.value = await Le(r, { ...ze() });
    }), (d, g) => {
      const c = V("el-input");
      return m(), Z(c, ee({
        class: d.desc.class,
        style: d.desc.style,
        clearable: y.value.clearable ?? !0,
        type: "number"
      }, y.value, ye(_.value), {
        modelValue: i.value,
        "onUpdate:modelValue": g[0] || (g[0] = (D) => i.value = D)
      }), qt({ _: 2 }, [
        ve(z.value, (D, A, h) => ({
          name: A,
          fn: G(() => [
            Je(d.$slots, A)
          ])
        })),
        d.desc.rtext ? {
          name: "append",
          fn: G(() => [
            Ke(Oe(d.desc.rtext.text), 1)
          ]),
          key: "0"
        } : void 0
      ]), 1040, ["class", "style", "clearable", "modelValue"]);
    };
  }
});
const yz = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: Os }, Symbol.toStringTag, { value: "Module" })), Dz = {
  name: "ElPlusFormNumber",
  inheritAttrs: !1,
  typeName: "number",
  customOptions: {}
}, _z = /* @__PURE__ */ oe({
  ...Dz,
  props: {
    modelValue: {},
    field: {},
    loading: { type: Boolean },
    desc: {},
    formData: {},
    rowIndex: {}
  },
  emits: ["update:modelValue", "validateThis"],
  setup(N, { emit: s }) {
    const r = N, i = Pe("defaultConf"), z = I(r.modelValue);
    s("update:modelValue", z);
    const y = I({}), _ = I(xe(r)), d = I(!1);
    Te(async () => {
      var C;
      y.value = await Le(r, { ...(C = i.form) == null ? void 0 : C.leng.nbinput, ...ze() }), delete y.value.min, delete y.value.max;
    });
    function g() {
      d.value = !1;
    }
    function c() {
      d.value || (z.value ? h(z.value, 0) : Ut(() => {
        var C, S;
        z.value = (C = r.desc) != null && C.required ? D.value.min : 0, (S = r.desc) != null && S.required || Ut(() => {
          z.value = null;
        });
      })), Ut(() => {
        s("validateThis");
      });
    }
    const D = Ye(() => {
      var S;
      let C = r.desc.attrs || ((S = i.form) == null ? void 0 : S.leng.nbinput);
      return typeof r.desc.attrs == "function" && (C = r.desc.attrs(r.formData)), C.min > C.max ? C.min = C.max : C.max < C.min && (C.max = C.min), C;
    });
    z.value !== void 0 && z.value !== null && (z.value < D.value.min ? z.value = D.value.min : z.value > D.value.max && (z.value = D.value.max));
    const A = _.value.change;
    A ? _.value.change = (C, S) => {
      h(C, S);
    } : _.value.change = h;
    function h(C, S) {
      var U, W;
      d.value = !0, C !== S && (C < D.value.min ? (Sn.warning(`${((U = r.desc) == null ? void 0 : U.label) || ""}最少不能低于${D.value.min}`), Ut(() => {
        z.value = D.value.min;
      })) : C > D.value.max ? (Sn.warning(`${((W = r.desc) == null ? void 0 : W.label) || ""}最多不能大于${D.value.max}`), Ut(() => {
        z.value = D.value.max, A && A();
      })) : A && A());
    }
    return (C, S) => {
      const U = V("el-input-number");
      return m(), Z(U, ee({ class: "ElPlusFormNumber-panel" }, y.value, ye(_.value), {
        modelValue: z.value,
        "onUpdate:modelValue": S[0] || (S[0] = (W) => z.value = W),
        onFocus: g,
        onBlur: c,
        onkeypress: "return( /[\\d\\.]/.test(String.fromCharCode(event.keyCode)))"
      }), null, 16, ["modelValue"]);
    };
  }
});
const Ss = /* @__PURE__ */ Fe(_z, [["__scopeId", "data-v-798814cd"]]), Yz = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: Ss }, Symbol.toStringTag, { value: "Module" })), mz = {
  name: "ElPlusFormPassword",
  inheritAttrs: !1,
  typeName: "password",
  customOptions: {}
}, Bs = /* @__PURE__ */ oe({
  ...mz,
  props: {
    modelValue: {},
    field: {},
    loading: { type: Boolean },
    desc: {},
    formData: {}
  },
  emits: ["update:modelValue"],
  setup(N, { emit: s }) {
    const r = N, i = Pe("defaultConf"), z = I(r.modelValue);
    s("update:modelValue", z);
    const y = I(Object.assign({}, Yn(), r.desc.slots)), _ = I({}), d = I(xe(r));
    return Te(async () => {
      var g;
      _.value = await Le(r, { autocomplete: "new-password", maxlength: (g = i.form) == null ? void 0 : g.leng.input, ...ze() });
    }), (g, c) => {
      const D = V("el-input");
      return m(), Z(D, ee({
        class: g.desc.class,
        "show-password": !0
      }, _.value, ye(d.value), {
        modelValue: z.value,
        "onUpdate:modelValue": c[0] || (c[0] = (A) => z.value = A)
      }), qt({ _: 2 }, [
        ve(y.value, (A, h, C) => ({
          name: h,
          fn: G((S) => [
            Je(g.$slots, h, { data: S })
          ])
        }))
      ]), 1040, ["class", "modelValue"]);
    };
  }
}), Iz = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: Bs }, Symbol.toStringTag, { value: "Module" })), Az = { class: "el-plus-form-quick-input" }, wz = {
  name: "ElPlusFormQuickinput",
  inheritAttrs: !1,
  typeName: "quickinput",
  customOptions: {}
}, ks = /* @__PURE__ */ oe({
  ...wz,
  props: {
    modelValue: {},
    field: {},
    loading: { type: Boolean },
    desc: {},
    formData: {}
  },
  emits: ["update:modelValue", "validateThis"],
  setup(N, { emit: s }) {
    const r = N, i = Pe("globalData"), z = Pe("defaultConf"), y = I({}), _ = I(xe(r)), d = ot([]), g = I(r.modelValue);
    s("update:modelValue", g), Te(async () => {
      var D;
      y.value = await Le(r, { maxlength: (D = z.form) == null ? void 0 : D.leng.textare, showWordLimit: !0, rows: 3, ...ze() });
    });
    function c(D) {
      g.value = D, s("validateThis");
    }
    return Ve(
      () => r.modelValue,
      (D) => {
        D && D.length > y.value.maxlength && (D = D.substring(0, y.value.maxlength)), g.value = D;
      },
      { immediate: !0 }
    ), Ve(
      () => r.desc.options,
      async (D) => {
        typeof D == "string" ? d.splice(0, d.length, ...i[D] || []) : typeof D == "function" ? d.splice(0, d.length, ...await D(r.formData)) : Array.isArray(D) ? D && d && !ct.isEqual(D, d) && d.splice(0, d.length, ...D) : d.splice(0, d.length);
      },
      { immediate: !0 }
    ), (D, A) => {
      const h = V("el-input"), C = V("el-tag");
      return m(), Q(Ae, null, [
        de(h, ee({
          class: D.desc.class,
          style: D.desc.style,
          type: "textarea"
        }, y.value, {
          modelValue: g.value,
          "onUpdate:modelValue": A[0] || (A[0] = (S) => g.value = S)
        }, ye(_.value)), null, 16, ["class", "style", "modelValue"]),
        Ue("div", Az, [
          (m(!0), Q(Ae, null, ve(d, (S, U) => (m(), Z(C, {
            key: U,
            type: "info",
            onClick: (W) => c(S.label)
          }, {
            default: G(() => [
              Ke(Oe(S.label), 1)
            ]),
            _: 2
          }, 1032, ["onClick"]))), 128))
        ])
      ], 64);
    };
  }
});
const hz = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: ks }, Symbol.toStringTag, { value: "Module" })), vz = {
  name: "ElPlusFormRadio",
  inheritAttrs: !1,
  typeName: "radio",
  customOptions: {}
}, Tz = /* @__PURE__ */ oe({
  ...vz,
  props: {
    modelValue: {},
    field: {},
    desc: {},
    formData: {}
  },
  emits: ["update:modelValue"],
  setup(N, { emit: s }) {
    const r = N, i = I(r.modelValue);
    s("update:modelValue", i);
    const z = I({}), y = I(xe(r));
    return Te(async () => {
      z.value = await Le(r, { ...ze() });
    }), (_, d) => {
      const g = V("el-radio"), c = V("el-radio-group");
      return m(), Z(c, ee({ class: "ElPlusFormRadio-panel" }, z.value, ye(y.value), {
        modelValue: i.value,
        "onUpdate:modelValue": d[0] || (d[0] = (D) => i.value = D)
      }), {
        default: G(() => [
          (m(!0), Q(Ae, null, ve(z.value.options, (D) => (m(), Z(g, {
            key: D.value,
            label: D.value
          }, {
            default: G(() => [
              Ke(Oe(D.l || D.label), 1)
            ]),
            _: 2
          }, 1032, ["label"]))), 128))
        ]),
        _: 1
      }, 16, ["modelValue"]);
    };
  }
});
const Qs = /* @__PURE__ */ Fe(Tz, [["__scopeId", "data-v-2d59dd3c"]]), Lz = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: Qs }, Symbol.toStringTag, { value: "Module" })), xz = {
  name: "ElPlusFormRate",
  inheritAttrs: !1,
  typeName: "rate",
  customOptions: {}
}, Ez = /* @__PURE__ */ oe({
  ...xz,
  props: {
    modelValue: {},
    field: {},
    desc: {},
    formData: {}
  },
  emits: ["update:modelValue"],
  setup(N, { emit: s }) {
    const r = N, i = I(r.modelValue);
    s("update:modelValue", i);
    const z = I({}), y = I(xe(r));
    return Te(async () => {
      z.value = await Le(r, { ...ze() });
    }), (_, d) => {
      const g = V("el-rate");
      return m(), Z(g, ee({ class: "ElPlusFormRate-panel" }, z.value, ye(y.value), {
        modelValue: i.value,
        "onUpdate:modelValue": d[0] || (d[0] = (c) => i.value = c)
      }), null, 16, ["modelValue"]);
    };
  }
});
const Us = /* @__PURE__ */ Fe(Ez, [["__scopeId", "data-v-c585734a"]]), Cz = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: Us }, Symbol.toStringTag, { value: "Module" })), bz = { class: "el-plus-form-select-options" }, Oz = { key: 0 }, Sz = {
  name: "ElPlusFormSelect",
  inheritAttrs: !1,
  typeName: "select",
  customOptions: {}
}, Ps = /* @__PURE__ */ oe({
  ...Sz,
  props: {
    modelValue: {},
    field: {},
    loading: { type: Boolean },
    desc: {},
    formData: {},
    rowIndex: {}
  },
  emits: ["update:modelValue"],
  setup(N, { emit: s }) {
    const r = N, i = Pe("defaultConf"), z = Pe("globalData"), y = I(r.modelValue || (r.desc.multiple ? [] : ""));
    s("update:modelValue", y);
    const _ = I({}), d = ot([]), g = I(null), c = { clearable: !0, ...ze() }, D = I(!1);
    r.desc.allowCreate && (c.filterable = !0), r.desc.remote && (c.remote = !0, c.filterable = !0, c.remoteShowSuffix = !0, c.loadingText = "远程查询中...", c.remoteMethod = async (C) => {
      if (C != null && g.value !== C && (g.value = C, d.splice(0, d.length, ...await r.desc.remote(C)), C === "" && r.desc.defaultItem)) {
        const S = d.findIndex((U) => U.value === r.desc.defaultItem.value);
        S >= 0 && d.splice(S, 1), d.unshift(r.desc.defaultItem);
      }
    });
    const A = Ye(() => {
      var S;
      const C = {};
      return (S = r.desc) != null && S.on && Object.keys(r.desc.on).map((U) => {
        C[U] = () => {
          r.desc.on[U](
            r.formData,
            d.find((W) => W.value === y.value),
            r.rowIndex
          );
        };
      }), C;
    });
    d.length <= 0 && r.desc.remote && (r.desc.initLoad ?? !0) && c.remoteMethod("");
    const h = Ye(() => (C) => r.desc.optionTip(C));
    return Te(async () => {
      _.value = await Le(r, c), D.value = !0;
    }), Ve(
      () => r.desc.options,
      async (C) => {
        typeof C == "string" ? d.splice(0, d.length, ...z[C] || []) : typeof C == "function" ? d.splice(0, d.length, ...await C(r.formData)) : Array.isArray(C) ? C && d && !ct.isEqual(C, d) && d.splice(0, d.length, ...C) : d.splice(0, d.length);
      },
      { immediate: !0 }
    ), Ve(
      () => y.value,
      (C) => {
        var S;
        _.value.allowCreate && C && Array.isArray(C) && C.some((U) => {
          var W;
          return typeof U == "string" && U.length > (((W = i.form) == null ? void 0 : W.leng.input) || 20);
        }) && (Sn.warning("最大长度为： " + (((S = i.form) == null ? void 0 : S.leng.input) || 20)), y.value = C.filter((U) => {
          var W;
          return typeof U != "string" || U.length <= (((W = i.form) == null ? void 0 : W.leng.input) || 20);
        }));
      }
    ), (C, S) => {
      const U = V("el-option"), W = V("el-select");
      return D.value ? (m(), Z(W, ee({
        key: 0,
        class: ["el-plus-form-select", C.desc.class],
        style: C.desc.style
      }, _.value, {
        modelValue: y.value,
        "onUpdate:modelValue": S[0] || (S[0] = (F) => y.value = F),
        loading: C.loading
      }, ye(A.value)), {
        default: G(() => [
          (m(!0), Q(Ae, null, ve(d, (F) => (m(), Z(U, ee({
            key: F.value || F.v
          }, F), {
            default: G(() => [
              Ue("div", bz, [
                Ue("span", null, Oe(F.label || F.l), 1),
                C.desc.optionTip ? (m(), Q("div", Oz, Oe(h.value(F)), 1)) : ce("", !0)
              ])
            ]),
            _: 2
          }, 1040))), 128))
        ]),
        _: 1
      }, 16, ["class", "style", "modelValue", "loading"])) : ce("", !0);
    };
  }
});
const Bz = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: Ps }, Symbol.toStringTag, { value: "Module" })), kz = {
  name: "ElPlusFormSlider",
  inheritAttrs: !1,
  typeName: "slider",
  customOptions: {}
}, Qz = /* @__PURE__ */ oe({
  ...kz,
  props: {
    modelValue: {},
    field: {},
    desc: {},
    formData: {}
  },
  emits: ["update:modelValue"],
  setup(N, { emit: s }) {
    const r = N, i = I(r.modelValue);
    s("update:modelValue", i);
    const z = I({}), y = I(xe(r));
    return Te(async () => {
      z.value = await Le(r, { ...ze() });
    }), (_, d) => {
      const g = V("el-slider");
      return m(), Z(g, ee({ class: "ElPlusFormSlider-panel" }, z.value, ye(y.value), {
        modelValue: i.value,
        "onUpdate:modelValue": d[0] || (d[0] = (c) => i.value = c)
      }), null, 16, ["modelValue"]);
    };
  }
});
const Vs = /* @__PURE__ */ Fe(Qz, [["__scopeId", "data-v-b3d36458"]]), Uz = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: Vs }, Symbol.toStringTag, { value: "Module" })), Pz = { class: "ElPlusFormStatus-panel" }, Vz = {
  key: 0,
  class: "status-danger"
}, Fz = {
  key: 1,
  class: "status-success"
}, Rz = {
  key: 2,
  class: "status-warning"
}, Wz = {
  key: 3,
  class: "status-info"
}, Gz = {
  name: "ElPlusFormStatus",
  inheritAttrs: !1,
  typeName: "status",
  customOptions: {}
}, Zz = /* @__PURE__ */ oe({
  ...Gz,
  props: {
    modelValue: {},
    field: {},
    desc: {},
    formData: {}
  },
  emits: ["update:modelValue"],
  setup(N, { emit: s }) {
    const r = N, i = I(r.modelValue);
    s("update:modelValue", i);
    const z = I({}), y = I(xe(r));
    return Te(async () => {
      z.value = await Le(r, { ...ze() });
    }), (_, d) => (m(), Q("div", Pz, [
      i.value === 0 ? (m(), Q("i", Vz)) : i.value === 1 ? (m(), Q("i", Fz)) : i.value === 2 ? (m(), Q("i", Rz)) : i.value === 3 ? (m(), Q("i", Wz)) : ce("", !0),
      Ue("div", ee({
        class: _.desc.class,
        style: _.desc.style
      }, z.value, ye(y.value, !0)), Oe(z.value.formatedValue || i.value), 17)
    ]));
  }
});
const Fs = /* @__PURE__ */ Fe(Zz, [["__scopeId", "data-v-87ed9e56"]]), Hz = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: Fs }, Symbol.toStringTag, { value: "Module" })), Kz = { class: "el-plus-form-switch" }, qz = {
  name: "ElPlusFormSwitch",
  inheritAttrs: !1,
  typeName: "switch",
  customOptions: {}
}, Rs = /* @__PURE__ */ oe({
  ...qz,
  props: {
    modelValue: {},
    field: {},
    loading: { type: Boolean },
    desc: {},
    formData: {}
  },
  emits: ["update:modelValue"],
  setup(N, { emit: s }) {
    const r = N, i = I(r.modelValue);
    s("update:modelValue", i);
    const z = I(!1), y = I({}), _ = I(xe(r));
    return Te(async () => {
      y.value = await Le(r, { activeValue: 1, inactiveValue: 0, clearable: !0, ...ze() }), z.value = !0;
    }), (d, g) => {
      const c = V("el-switch");
      return m(), Q("div", Kz, [
        z.value ? (m(), Z(c, ee({ key: 0 }, y.value, ye(_.value), {
          modelValue: i.value,
          "onUpdate:modelValue": g[0] || (g[0] = (D) => i.value = D)
        }), null, 16, ["modelValue"])) : ce("", !0)
      ]);
    };
  }
}), Jz = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: Rs }, Symbol.toStringTag, { value: "Module" })), $z = {
  name: "ElPlusFormTag",
  inheritAttrs: !1,
  typeName: "tag",
  customOptions: {}
}, Ws = /* @__PURE__ */ oe({
  ...$z,
  props: {
    modelValue: {},
    field: {},
    loading: { type: Boolean },
    desc: {},
    formData: {}
  },
  setup(N) {
    const s = N, r = Pe("format"), i = I({}), z = I(xe(s)), y = I(""), _ = I("");
    return Te(async () => {
      i.value = await Le(s, { ...ze() });
    }), Ve(
      () => s.modelValue,
      async () => {
        s.desc.tagType ? typeof s.desc.tagType == "function" ? _.value = await s.desc.tagType(s.modelValue, s.formData, s.field) : typeof s.desc.tagType == "string" ? _.value = (await r)[s.desc.tagType](s.modelValue, s.formData, s.field) : _.value = "" : _.value = "";
      },
      { immediate: !0 }
    ), Ve(
      () => s.modelValue,
      async () => {
        s.desc.format ? typeof s.desc.format == "function" ? y.value = await s.desc.format(s.modelValue, s.formData, s.field) : typeof s.desc.format == "string" ? y.value = (await r)[s.desc.format](s.modelValue, s.formData, s.field) : y.value = s.modelValue || "—" : y.value = s.modelValue === "" ? "—" : s.modelValue ?? "—";
      },
      { immediate: !0 }
    ), (d, g) => {
      const c = V("el-tag");
      return m(), Q("div", null, [
        de(c, ee(i.value, {
          size: i.value.size || "small",
          type: _.value !== "--" ? _.value : ""
        }, ye(z.value)), {
          default: G(() => [
            Ke(Oe(y.value || d.modelValue), 1)
          ]),
          _: 1
        }, 16, ["size", "type"])
      ]);
    };
  }
}), Xz = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: Ws }, Symbol.toStringTag, { value: "Module" })), e2 = { key: 0 }, t2 = {
  name: "ElPlusFormText",
  inheritAttrs: !1,
  typeName: "text",
  customOptions: {}
}, n2 = /* @__PURE__ */ oe({
  ...t2,
  props: {
    modelValue: {},
    field: {},
    loading: { type: Boolean },
    desc: {},
    formData: {}
  },
  setup(N) {
    const s = N, r = Pe("showInfo"), i = Pe("format"), z = I({}), y = Ye(() => {
      const d = xe(s);
      let g = s.desc.linkId || "id";
      if (typeof g == "function" ? g = g(s.modelValue, s.formData) : g = s.formData[g], s.desc.linkType && g) {
        let c = s.desc.linkType, D = s.desc.linkLabel || "";
        typeof c == "function" && (c = c(s.modelValue, s.formData)), typeof D == "function" ? D = D(s.modelValue, s.formData) : D = s.formData[D], d.click = () => {
          r(g, c, D);
        };
      }
      return d;
    }), _ = I("");
    return Te(async () => {
      z.value = await Le(s, ze());
    }), Ve(
      () => s.modelValue,
      async () => {
        s.desc.format ? typeof s.desc.format == "function" ? _.value = await s.desc.format(s.modelValue, s.formData, s.field) : typeof s.desc.format == "string" ? _.value = i[s.desc.format] ? i[s.desc.format](s.modelValue, s.formData, s.field) : "--" : _.value = s.modelValue || "—" : _.value = s.modelValue === "" ? "—" : s.modelValue ?? "—";
      },
      { immediate: !0 }
    ), (d, g) => (m(), Q("div", ee({
      class: ["ele-form-text", [...d.desc.class || [], d.desc.linkType ? "ele-form-text-click" : ""]],
      style: d.desc.style
    }, z.value, ye(y.value, !0)), [
      d.desc.title ? (m(), Q("span", e2, Oe(d.desc.title + ": "), 1)) : ce("", !0),
      d.desc.icon ? (m(), Q("i", {
        key: 1,
        class: el([d.formData.icon])
      }, null, 2)) : ce("", !0),
      Ke(" " + Oe(_.value), 1)
    ], 16));
  }
});
const Gs = /* @__PURE__ */ Fe(n2, [["__scopeId", "data-v-5a8778fe"]]), l2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: Gs }, Symbol.toStringTag, { value: "Module" })), r2 = {
  name: "ElPlusFormTextarea",
  inheritAttrs: !1,
  typeName: "textarea",
  customOptions: {}
}, Zs = /* @__PURE__ */ oe({
  ...r2,
  props: {
    modelValue: {},
    field: {},
    loading: { type: Boolean },
    desc: {},
    formData: {}
  },
  emits: ["update:modelValue", "validateThis"],
  setup(N, { emit: s }) {
    const r = N, i = Pe("defaultConf"), z = I({}), y = I(xe(r)), _ = I(r.modelValue);
    return s("update:modelValue", _), Te(async () => {
      var d;
      z.value = await Le(r, { maxlength: (d = i.form) == null ? void 0 : d.leng.textare, showWordLimit: !0, rows: 3, ...ze() });
    }), Ve(
      () => r.modelValue,
      (d) => {
        d && d.length > z.value.maxlength && (d = d.substring(0, z.value.maxlength)), _.value = d;
      },
      { immediate: !0 }
    ), (d, g) => {
      const c = V("el-input");
      return m(), Z(c, ee({
        class: d.desc.class,
        style: d.desc.style,
        type: "textarea"
      }, z.value, {
        modelValue: _.value,
        "onUpdate:modelValue": g[0] || (g[0] = (D) => _.value = D)
      }, ye(y.value)), null, 16, ["class", "style", "modelValue"]);
    };
  }
}), u2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: Zs }, Symbol.toStringTag, { value: "Module" })), i2 = {
  name: "ElPlusFormTransfer",
  inheritAttrs: !1,
  typeName: "transfer",
  customOptions: {}
}, o2 = /* @__PURE__ */ oe({
  ...i2,
  props: {
    modelValue: {},
    field: {},
    loading: { type: Boolean },
    desc: {},
    formData: {}
  },
  emits: ["update:modelValue"],
  setup(N, { emit: s }) {
    const r = N, i = I(r.modelValue);
    s("update:modelValue", i);
    const z = I(Object.assign({}, Yn(), r.desc.slots)), y = I({}), _ = I(xe(r));
    return Te(async () => {
      y.value = await Le(r, { ...ze() });
    }), (d, g) => {
      const c = V("el-transfer");
      return m(), Z(c, ee({
        class: [d.desc.class, "ele-form-transfer"],
        data: d.desc.options,
        style: d.desc.style
      }, y.value, {
        modelValue: i.value,
        "onUpdate:modelValue": g[0] || (g[0] = (D) => i.value = D)
      }, ye(_.value)), qt({ _: 2 }, [
        ve(z.value, (D, A, h) => ({
          name: A,
          fn: G((C) => [
            Je(d.$slots, A, { data: C }, void 0, !0)
          ])
        }))
      ]), 1040, ["class", "data", "style", "modelValue"]);
    };
  }
});
const Hs = /* @__PURE__ */ Fe(o2, [["__scopeId", "data-v-6262dcef"]]), s2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: Hs }, Symbol.toStringTag, { value: "Module" })), a2 = {
  name: "ElPlusFormTree",
  inheritAttrs: !1,
  typeName: "tree",
  customOptions: {}
}, M2 = /* @__PURE__ */ oe({
  ...a2,
  props: {
    modelValue: {},
    field: {},
    loading: { type: Boolean },
    desc: {},
    formData: {}
  },
  emits: ["update:modelValue"],
  setup(N, { emit: s }) {
    var A;
    const r = N, i = Pe("globalData"), z = I(((A = r.modelValue) == null ? void 0 : A.split(",")) || []), y = ot([]), _ = I(!1), d = I({}), g = I(xe(r)), c = I();
    Te(async () => {
      d.value = await Le(r, { checkStrictly: !0, showCheckbox: !0, accordion: !0, props: { label: "label", children: "children" }, ...ze() }), _.value = !0;
    });
    function D() {
      s("update:modelValue", [...c.value.getCheckedKeys(!(r.desc.isPId ?? !0))].join(","));
    }
    return Ve(
      () => r.desc.options,
      async (h) => {
        typeof h == "string" ? y.splice(0, y.length, ...i[h] || []) : typeof h == "function" ? y.splice(0, y.length, ...await h(r.formData)) : Array.isArray(h) ? h && y && !ct.isEqual(h, y) && y.splice(0, y.length, ...h) : y.splice(0, y.length);
      },
      { immediate: !0 }
    ), Ve(
      () => r.modelValue,
      (h) => {
        z.value = (h == null ? void 0 : h.split(",")) || [], c.value.setCheckedKeys(z.value);
      }
    ), (h, C) => {
      const S = V("el-tree");
      return _.value ? (m(), Z(S, ee({
        key: 0,
        ref_key: "treeRef",
        ref: c,
        class: h.desc.class,
        style: h.desc.style
      }, d.value, {
        "default-checked-keys": z.value,
        loading: h.loading,
        "node-key": "id",
        data: y
      }, ye(g.value), {
        class: "el-plus-form-tree",
        onCheckChange: D
      }), null, 16, ["class", "style", "default-checked-keys", "loading", "data"])) : ce("", !0);
    };
  }
});
const Ks = /* @__PURE__ */ Fe(M2, [["__scopeId", "data-v-c636bc55"]]), c2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: Ks }, Symbol.toStringTag, { value: "Module" })), f2 = {
  name: "ElPlusFormTselect",
  inheritAttrs: !1,
  typeName: "tselect",
  customOptions: {}
}, qs = /* @__PURE__ */ oe({
  ...f2,
  props: {
    modelValue: {},
    field: {},
    loading: { type: Boolean },
    desc: {},
    formData: {}
  },
  emits: ["update:modelValue"],
  setup(N, { emit: s }) {
    const r = N, i = Pe("globalData"), z = I(r.modelValue);
    s("update:modelValue", z);
    const y = ot([]), _ = I(!1), d = I({}), g = I(xe(r));
    return Te(async () => {
      d.value = await Le(r, { filterable: !0, clearable: !0, props: { label: "name", value: "id", children: "children" }, ...ze() }), _.value = !0;
    }), Ve(
      () => r.desc.options,
      async (c) => {
        typeof c == "string" ? y.splice(0, y.length, ...i[c] || []) : typeof c == "function" ? y.splice(0, y.length, ...await c(r.formData)) : Array.isArray(c) ? c && y && !ct.isEqual(c, y) && y.splice(0, y.length, ...c) : y.splice(0, y.length);
      },
      { immediate: !0 }
    ), (c, D) => {
      const A = V("el-tree-select");
      return _.value ? (m(), Z(A, ee({
        key: 0,
        class: c.desc.class,
        style: c.desc.style
      }, d.value, {
        modelValue: z.value,
        "onUpdate:modelValue": D[0] || (D[0] = (h) => z.value = h),
        data: y,
        loading: c.loading
      }, ye(g.value), { "render-after-expand": !1 }), null, 16, ["class", "style", "modelValue", "data", "loading"])) : ce("", !0);
    };
  }
}), N2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: qs }, Symbol.toStringTag, { value: "Module" }));
/*! Element Plus Icons Vue v2.1.0 */
var bu = (N, s) => {
  let r = N.__vccOpts || N;
  for (let [i, z] of s)
    r[i] = z;
  return r;
}, g2 = {
  name: "Loading"
}, d2 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
}, p2 = /* @__PURE__ */ Ue(
  "path",
  {
    fill: "currentColor",
    d: "M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32zm448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32zm-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32zM195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248zM828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0zm-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0z"
  },
  null,
  -1
  /* HOISTED */
), j2 = [
  p2
];
function z2(N, s, r, i, z, y) {
  return m(), Q("svg", d2, j2);
}
var y2 = /* @__PURE__ */ bu(g2, [["render", z2], ["__file", "loading.vue"]]), D2 = {
  name: "Plus"
}, _2 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
}, Y2 = /* @__PURE__ */ Ue(
  "path",
  {
    fill: "currentColor",
    d: "M480 480V128a32 32 0 0 1 64 0v352h352a32 32 0 1 1 0 64H544v352a32 32 0 1 1-64 0V544H128a32 32 0 0 1 0-64h352z"
  },
  null,
  -1
  /* HOISTED */
), m2 = [
  Y2
];
function I2(N, s, r, i, z, y) {
  return m(), Q("svg", _2, m2);
}
var A2 = /* @__PURE__ */ bu(D2, [["render", I2], ["__file", "plus.vue"]]), w2 = {
  name: "WarningFilled"
}, h2 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
}, v2 = /* @__PURE__ */ Ue(
  "path",
  {
    fill: "currentColor",
    d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 192a58.432 58.432 0 0 0-58.24 63.744l23.36 256.384a35.072 35.072 0 0 0 69.76 0l23.296-256.384A58.432 58.432 0 0 0 512 256zm0 512a51.2 51.2 0 1 0 0-102.4 51.2 51.2 0 0 0 0 102.4z"
  },
  null,
  -1
  /* HOISTED */
), T2 = [
  v2
];
function L2(N, s, r, i, z, y) {
  return m(), Q("svg", h2, T2);
}
var x2 = /* @__PURE__ */ bu(w2, [["render", L2], ["__file", "warning-filled.vue"]]);
const Js = ["image/jpg", "image/png", "image/gif", "image/jpeg"], $s = [".jpe", ".jpeg", ".jpg", ".gif", ".png"], Xs = ["video/3gpp", "video/mpeg", "application/mp4", "video/mp4", "video/ogg", "video/x-flv", "video/x-msvideo"], ea = [".3gpp", ".mpeg", ".mpg", ".mp4", ".ogv", ".flv", ".avi"], E2 = ["audio/x-wav", "audio/x-ms-wma", "audio/mp4", "audio/mp3"], C2 = [".wav", ".wma", ".mp4a", ".mp3"], ta = ["application/x-msaccess", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.openxmlformats-officedocument.presentationml.presentation", "	application/vnd.ms-powerpoint", "application/vnd.ms-excel", "	application/msword", "application/pdf", "application/vnd.ms-works"], na = [".mdb", ".docx", ".xlsx", ".pptx", ".ppt", ".xls", ".doc", ".pdf"], la = ["application/xml", "application/x-sh", "application/json", "application/javascript", "application/java-vm", "application/java-archive", "text/html", "text/plain"], ra = [".xml", ".sh", ".json", ".js", ".class", ".jar", "html", ".txt", ".wdb", ".wps"], ua = ["application/x-rar-compressed", "application/x-msdownload", "application/x-font-woff", "	application/x-font-ttf", "application/x-7z-compressed", "	application/vnd.android.package-archive", "application/zip"], ia = [".rar", ".exe", ".woff", ".ttf", ".7z", ".apk", ".zip"], b2 = [...Js, ...Xs, ...ta, ...la, ...ua], O2 = [...$s, ...ea, ...na, ...ra, ...ia], Yl = [
  { type: "pdf", suffixes: [".pdf"] },
  { type: "txt", suffixes: [".txt"] },
  { type: "excel", suffixes: [".xls", ".xlsx"] },
  { type: "word", suffixes: [".doc", ".docx"] },
  { type: "ppt", suffixes: [".ppt", ".pptx"] },
  { type: "zip", suffixes: [".zip", ".rar", ".7z"] }
], ds = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, audioSuffixes: C2, audioTypes: E2, fileSuffixes: O2, fileTypes: b2, imageSuffixes: $s, imageTypes: Js, officeSuffixes: na, officeTypes: ta, otherSuffixes: ia, otherTypes: ua, suffixTypes: Yl, textSuffixes: ra, textTypes: la, videoSuffixes: ea, videoTypes: Xs }, Symbol.toStringTag, { value: "Module" })), S2 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAE9UlEQVR4nO2bbUwbdRzHf5WwTajTF5ApzjnHi+F0DyKbCEbQpehe6KjMhBghaqIBo44Iy5TErFGSLcqi7IXgC+MCL+SFW1FfjNCoTCNxhPmAhrkpyMBsgB0ZDMooD+fve8thr73C9XrEXvf/JM39f3ft9f/7/J/ueqmNwvC4uzh/3mbbK5FUyOH/yv2pW744lFu9m4umoynA4S5+jo98wsWYoCRjD/VdPv+RK7uyjENTCRGAlp+z0TdcjBkgAIz4vAeqMsve5qJphAgocBe3SDZalu5mFEUAODN6bt/BnOpaLppCiABHS7HEm5giUIB/zk/d3p6KI3k1dRxGjeUEgHlpfmp4auSJ/ZmvfMVhVFhSADBLgmUFgKmZq1OdI6fzP975fieHhrC0ADDuv+L7w9ubWfdozVkOI8byAsD07PTgpOTbXrH5xWEOIyIuBACjEuJGALgwMfTXD4NdmS3Oo5c51EVcCQCjV0dPVWx7KZuLuog7AWBsevzrV7e+sJOLSxKXAsDfVy60Vm9/bRcXF8USApwbdpF9RTKXIqPn0rklb6MtISDn1ixKv2U9GWGpO0hLCFhFK+jpjCe5ZIzFJFhCALjLvpYeWqt7cg+ha/hnzTtIywiQJInSVqVSdloW2VfaeU9k4Da6f3ywqObB/cc5XMAyAhRm/NO0OsFOibYEun11Gu/Rj39u1t/w2LsrubiA5QQozM3OyjIi5btnvlTlrAqAVQQYxVPYrMpZFQAhQAgQAoQA3sQtQoAQIASoclYFQAgQAoQAIYA3cYsQIAQIAaqcVQEQAoQAfQLsicmUnJhEw75/OApF63j6zXdy7KWJmUmOFmdNUiqtuTGFP7Oeesf6qW98QNfnlsI0AU/x46pnM4qovP1NTuq/JBXey31LllDe/gZH12jb/Sk1/NpIx/tOcBSeko1F5Eznx2H8eQUk7+49QU1nj3FkHNMEoHJIkn+xp33f18gVVCjZuIcfaBbx/nfoF28P77kGBDT9foyT+IwjbfAYzPVApfw+N4vCebembCLHHXlUsO5hcp06TB1DXfxOY5gmAKBL1+cforaBk1T7UwPvIbmyEIMEghPVI8C1o5LlJlEVywsG0iEkGkwVADAUyjaXUu2PDXLLNDrqqNt7hlydh/moGr0CNrDYl3loRZusFqYLAKj0lpS75bkArYR5QavyegQoQ2CIz4Ux332phyfB83zEHJZFAJJGy2MbPO4D0SMAYBiV3VsqDzEAGR4eZu6+Vk2xkbAsApRhMDnjoz/H+mUJWugVoIClMJd7RM5tWdzDNsnJl3r2ylujmC4ArYSJEN21bfCkXA6XZKQCAkGvwOSK76n/rZH3GMNUAejyH+YflFteWe/DLYEgGgGglgUArRVCL6YKOLDjddqWcg+VcfKYABVQUczkwd1VjwCc0zPwrbyiBALZmGc6Lp7mJbee9xjDNAFKS2tdmKCyTY4jIfMBBKBXdPMrkAnuQbjoAZCH8Y73dVzs4hWgX+7+jnV5dBOfN1h2pJgmoOq+crki4VoTlcZMDgFKLyjnGHNGMBAQeN1QwFd9mPjwAlgG8cJ34TujwTQBVkUIEAKEAFXOqgAIAde7gFj846RZ2CT6vM3ZXMjFBUIExOJfZ80iQaJHWp3N7RRAiAAQa3+eNgWJnvc4m49SEJoCAHrCPFGF1YcDuv0NRB8Et7zCv9Ii61+eHeesAAAAAElFTkSuQmCC", B2 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAEWElEQVR4nO2bS2gTWxiA//Q+ehFusrgPqjb3XkQu9zaCUlFsV9ZXU0UqPuJCBKtGN4LV1o0LXyAubLQRdRN8QEUxPlDxERW1q0YFXWhbLYgWk9j6qDVRY9PajP+fMGlOpxkzdcQ58XzQmf+fOUzzf3POmRmGMUEGdhYUTjWZ4mtBgnmYflMmVFVdn7Fj+3QMdWdIAa6C0cskkA5haAhKa9dD9+P2A3P2712Jqa4oBCTOPMRvYGgYSAARCYQ22927t2GoGwoBrpGjzkgSVGJoGGQBhN4SFALqCkZJuDIU6QKIrra2jXM9nh0YfjFcCoj3xz+8DQXnVuzZcw3TL4JLAYReErgVQOghgWsBRPR1d7Tj7v3ipb5zbZhqhnsBRF+0J9DX9XLSDLf7OaaayAkBxHAl5IwA4sPrN0/vHT0yfl17+xtMsyKnBBDvOp/fmlW3cwqGWZFzAohoV3fWD085KYDIVgIXAmyLHWCxFmKkjdDtO+cWeY+pPtdwIeCvsqlQOLEYI+187uGJCwE/mH+Fyaucyh+bJWoSFMc0ogDCUvQ/2GZXYDQ8nlxvrF5y8bwbQwZuBBAjxoyBf6dPgxEWM2ba+NgTg1etDxfMP9pwGtMUXAkgov1x+PG330H6+Sco+Odv3JI9H3v7elf7LuRjmII7ATK9cQne9/djpI3tXS+YmpmE4EXAcKntfMbUzCSEECAECAFCAK5yFiFACBACmJqZhBAChAAhQAjAVc4iBAgBQgBTM5MQQoAQkJ2AfIsF/igqwmiAl62tEAuHMWIZqm3Q78elOoUlJbhU0vs2Ai+aWzDSjm4CHKdOgLW0FCOWcCAAl6vXQ6CpCbMkmdpSEXc9HmjxnsCMpfLQQRhrL8doaFwjR+NSO7oJqOkIQZNrF/jrXJgloSJL8EUmne2GmeX4RiaAW5Vt/xxnA7PVCjaHI1Fk83EvSluHewZwnD6JSwDv/IW41I+vKoCg7r7mYSuzL1Nbgl582ut3K/ZzK4BYevUKRIJBOFu1HDP1tgQVS71m338D8wRtI7gTQF3befsmsy9TWxm5F3gXLErNHVwIoLHbgn8yNLaLnSvhFxwGnslTUlcEaqsmgOYOmih9OA/IxyMB1gxXgR48bnpv0YKuAgZD3Z5m9hubNqcmQILaqgkYW2GHyoMHFD0g32yGxk1bYDCxSDjxf4aDrgLUikrnc23Ltm1N9BzqNbI4EkAYegioFZWOWlt5zgjgjVF6sd+FABr75fW7wIISGmbOYrp1TglY0/YAi2vG8e3HDCdLW/JGiCbNWCSCl8sVuC859mUML8DurodHPh88uuTDTJ1ipxMnunKMBoiFI1i0H2+DvRgnrxbplNTW4PZI4lZZT3QTwCtCgBAgBDA1MwkhBHzvAoz44aRemExwtqbj2TwMUygEGPHTWb2QIK9sQ2ewEdJQCCCM9vG0HpjAVFXTGToMgxhSAEE9Ic8Ur+Z9OFC3j0t59YPPvMwn4xjMX8B9vzAAAAAASUVORK5CYII=", k2 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAACfUlEQVR4nO3bS2sTURTA8TNJaqWiVMhCUQsqiuAjGG2pKLbGLrRY00EEoS4s1ro0gitBg3XhUl1aEf0ERt372PoRiuLCB2Jt2tKmSZpMcntOIaW308dMeqFzL+e/ued0d39JSlMYC1bo8ctMp6jCHQHQi+uG1npk36fu07HzOCpvWYCh4cwNIeA1joGo48QhmJiaeWUnTg7gqjQXAL3y1Sp8xjEwEQA1lSukL3fGh3BUlgvg0XDmHQhI4hiYagCUagQ3wIuMwCNQLQag/k9O37/a1fYEx3WnJQD+ci7kcoWenkT8I67rSksAShWCtgCUCgStAah8sZT/m83GbyYTI7j6TnsAquxUflkgWrvaj/7D1VdGAFD1IhgDQOHH4efItx+xu/32JK6eMgqAyuWLXy+dPd6Oo6eMA6DysyXPX56MBKC8ImgBEDvYAs1bm3Dy1+/R7Ifr3WdW/V6jBcDeXVFo2RHFyX9rfXnSAiASCUHb4f3QEAnj5r/VELQAoLZv2wLHDuzBqb6+/xlNDSQ7nuMopQ0A1bipARF2Q9PmRtz85VQqMDY+feXaxVNvcV1IKwCqOFuGSDiM/7MRsDPajD/xXtlxSqm+C5KedgC1SmWH/vLDyV9P7/VJd5YWSheAekvftqU7SwvFAAzAAAyAh7ExAAMwgHRnaaEYgAEYgAHwMDYGYAAGkO4sLRQDMAADMAAexsYADMAA0p2lhWIABmAABsDD2BiAARhAurO0UAzAAAzAAHgY29oAAXxwUlkWvE8P2r04LeQCCOKjs6oKheDcg1v2F1iUC4AK2sPTKrIs6H84aL+BJS0LQM2/EwSktP844Ns+ZMGzpa98rTlAGolQGdxvxgAAAABJRU5ErkJggg==", Q2 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAD00lEQVR4nO2bT0gUURzHf2/+rIsRGVRS0db2HwS1gxoFVkR1sjzkoUNlhw5BUoeORVAdFYoOHVQyT0FdqlvRH+vUerAEISkKkwrDyBDM/eO8vm/8k7M7u85sI7szvQ/MvN9vZnm77zNv3rzd2WGUhWRveK9B/Bxx3oi0oCirzjzTN9zYj9BzbAUkYuFmTsZthEWBuvYiPtS3O1r0VjN5TIYA88hz4znCosEUAHhi+LIebb+C0DMyBMRjoS4iOomlaJgVIPBagp2APhTVWIqG+QIEXkqwE8BRFBXpAogbv9X4cAPb1PkU2T/hTwECjyT4V4DAAwn+FiAQEhIfd7KN3f3IXON/AYAZE8NKaLSGlXeMIHVFIAQI8pUQGAGCfCQESoDJ1K9eLdJWi8gRwRMAePKH4y9PgRQgcCrBFwKUFSeIlUQQucOJBF8IYKX1pCyvR+Sehb43+EIA52FSV7cQU0uQuSeXBF8IMAlVkbqyAUF+ZJPgHwEm5TgVDuGUiCDOg8TQMS3aeRfRHD4TgCOZwspYhksDFrcY8VR497COaA7fCZiFG1iJxSXhXQlLmy2JwC8C8qWkVgqwtNmSCKQAKUAKkAJQBBYpQAqQAixttiQCKUAKkAKkABSBRQqQAqQAS5stiUAKcCiAlVYt+MMkn+jHzcoxvK4Md3bWI3+LrTaI/aiPj/cgcVj3+Eus3eOZAK2il5TSSkTZSb5vIj72kJTyFtIirZR8dxAfvAd7rGgVMawZpQZqUBLpO74T03ILSA7UZheaA88EpBOqidPUl2s09fUqskyEMBaKULJ/23SvmEGNtJFafjZngxaq2w0FE0ChDaTjSIsekPrQhA1487LDpG+5R6nPF8gYuYkt9ixYtwsKJwBYGvzzEYS8hpBXEHIUe7PjpG6nFFSAQI12kLriOBno7gyDn+j6808JO5zW7YSCCxAjvl45iEGujFKfTpMx2o2NuXFctwMKLkBdc8n8xwePDyHj6AF1/08PYEv3kL79sfk6A5dHbdsTjAF/B8VsOKnbKYUTMNP1xeQoNXgAG6b/+qJF26cHxaBfBcRkh+FSmOzfauny2ub7uOffgFMhwPOAucmO3UxQ9AzIyTUe5KrbLYsmQBzJKYzoYuqbjhj4eGIo64gv5v7qutbpscBGgFk3Gp+th7hh0QT4BSlACpACLG22JAIpIBZ6g6IKSyBxIqCLiuzBSc/g7EFJXbwR0RwZAhKxJdWYkvQhDBwKU/bpNZMvaB4ZAgTF9vC0FzBSToVqJ7soDVsBAvMhaoOfJ8aPIPUv6PaKwq6nH/lZ/gBjD5Nf2bkbBQAAAABJRU5ErkJggg==", U2 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAE/UlEQVR4nO2bW2wUVRjHv12KhRZ7UUq1Nyhp60MxRmobpSa21ZhIQ1hjrPIi9RJ9UnmBB8VgjIlRHxSIMSUhXh6kQGKKCSoaaF9KogZtIk1sMbbZFhB3WZZCd9nr+P1nPZud2Xt3XHaW80ume77ZzuX7nW/OnO1sLZSE1UfP9VCYXidSbBzeVF5sqTz1fkfto9w0nIQCVh+eepvf2kMFwq72O2nmmu/gpw/VvcShocQJiPS8MsrNggECwJwnuGd/V+073DSMeAGHp8eI6BFeCgYhABgtIZEAhV8KilgBYGrB98bBTXXvcTNnTCkgFFa88zeCWz7puuskhzlhSgHAKAmmFQCMkGBqAcDlC3kmrgY2ft9XP8Vh1pheAPCGlDmXdUXn3ntXXeIwK4pCAFiqhKIRAFy+oH3Y7rlv9slmN4cZUVQCwEVv8KePOmsf5GZGFJ0AcNkXzPjDU1EKAJlKMIWAZ9dVUFP5cm5lxy9O7zdHexq2cjMpphDQt2YlPVBTxq3sSffhyRQCKpcRDbZUU2mJlaPsSSXBFAJAO18C/XwpLJWTf1/fceKxtXu5qcE0AkDjcittXns7VZaWcJQdN0Jh+uNa4KmvHq77msMophIAFH+IaqwWKuV2U/UK/pk5/lDYf2LLemwaxXQCBEowTIovxK3scL3QrslZEwCzCFgqzmfaNDlrAiAFSAFSgBTAL0WLFCAFSAGanDUBkAKkAClACuCXokUKkAKkAE3OmgBIAVJA/gRsqCqlCv5LL5h0++hqIMyt9DSVl1BDWeRJ0bwnQPbFILcywzABIz311L0m/mnNt+ev04FpN407vBwl5uXWKnqlrYoTiSQhODSzQG9NOJKK6K5ZSTvb74g77vg/Hto94aSzLDEdhglwDLTS8OwCDfNJC9Cjm+vLaROf4ND0FfWk9OzrrKVtzRXRbSEK2yG5XZycm5Pv+8EeJ2EbPxTZ11VLc4sB3q9DTRY9j+Pt5IenjWUl1PejXV2XCkMFfDh5mT6YdHGkBYngpF77+RId4kQFIondvzlo6Fz8dxgg4hhX1u+cnG3sPK+JgJI/099Mp7mnnxu/GCenki8jVNQQV57+PT15EQCQSDsn1DLyF0cRzvSvUw+48fgsJUPI6+UqQC+DL7vvViukN4MeTkfeBKA0v+iuI9vofLTMRx9vSrkNEL0dWyV/2targ+TWmKpYKnkTIBLePn6BB8ZFtQdHehuicSr0+0Z8gMeUNxOMKdmSNwH6hEWsHxcSod83Ygyar/K2uZI3AWLAE9eyKO10PSkqJ1bUrzx2uP18d+AxIFfyIgCj8ilOAjuPHfDEwNjB65KN1vtZGr4S03F8JjrgiXViPMmF/10Aehr3ekxW9CcsLoNkEx5RNfoqgVC1Cvj3t/NtEBUVC6oGxxw8fSEqLRmGCsAMTCSIk8SJYMFOMQkSJRyLSNLOExpc12ev+GhDdWQiBGnf8UwS93o92C8qqOK2ZapASMCCuw2qY84TVIXrpeoxTIC4XwswQ8MCIUgsVU8gWUxcnqhfxVEEJIMpdCJpAkh+9/4adfvG/6bRC/6QejxUYrrkgWECzIoUIAVIAZqcNQGQAm55AUemRkixpPyCsWmxKMecA/fYuBUlXkAB/uusYVgtvc6nW8cohjgBoObI9KCi0GfcLBosFnreMdD2OelIKAColaCEd5j+cuCyJ4v1Y33PC/4FkIYsbolXiDkAAAAASUVORK5CYII=", P2 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAD3UlEQVR4nO2bS0wTURRAb/kIQQWMXYAfRIlKokhE+UUiHwkqAaESowajEhF3iokrE0VxYcJGZWeNEVhoXAj4W0iisDAxLA0uRMUoavgIyqcWaAvjvWix005rB16lb3yHTHrvhQHuee/Nm2ZAB264dKMpS5qCUxJAMabzSvLGNc/ytyXuwJA5igIuXm+6AABVePgFmVvi4fvIj5uGnK3lmDLFRQCN/NQUtGLoN5AAYsQ0VrUnK6kaQ2a4CMDRbwP8mXj4DXYBBGsJSgIkfPErHAUQX4dGz+7LTbmM4ZzhUgBenMdMprHCwpykp5jOCS4FEKwkcCuAYCGBawGEedxi7hkcTDpWlNOJqWq4F0BYbZOfdCAl56Yl9GGqCk0IIGYrQTMCCFwO3Z1v3yeeLjMMYeoVmhJAmMzj7QXbN6dh6BWaE0CYJyxev3nSpADCWwlcCEhcFwORi8MwUsfn/sEHh/IzijB0CxcCVi/XQ0yUHiP1/O3NExcCgoICIGVDHAQHBWKmHk8SuBBALAlfCJvWrsRodrz70l9ZXpR5DUMZ3AggQhYEo4QVEBYagpk6bJOTMPBttOTA7vRGTGfgSgAxPmGFoMBAkPAjWh+JFe+x2myWytJdMnvcCbBjsdrozg8jdVw5UyrrWZYQvAiYLVUnDLKeZQkhBAgBQoAQgC+aRQgQAoQAWc+yhBAChAAhQAjAF80iBAgBQoCsZ1lCCAFCgG8E0JOdoVEzRvMLMwGHCzIgdpn7pzW9A8NgbGzFCGBVtB6OFGaA8V4r9A4OYwVgfWw07M9LxUgOSWrv6IL2V12YsYeZABrRiEWuz+visbHUhLjpJp686MDKHwH1D5/Dx54BrPx64EkH1RxJw3NJDp1L34M1zAQoEYoPLk4ezIMhkxkasLFxixWrngVUG5sxk1NRkg2RKLem/jFmbPGpAPuycJzqhFoBVKdD6XNzxWcCaNrvTE9QnLpqBZDIKH0E1NRxMgOilkZM/9I06g2P5Gua8CSAao6QSLqOKIlkgU8EVOzFNRseBrW3W2bWvSOeBDgzvQvgDuCL5gnmAqgJOu62tEPnhx6suOJJgNIS8CVMBdgbo9GiKesO+9dpSgBtebRd0ZR33PKU0KQAuuLTBes1Tvs+vPg5Q2v55ZtujDQqgG5j6Y7NHSSg9k4LRr93CRRA9wdUJ+hcEkC1fwkzAbwiBAgBQoCsZ1lCCAH/vQBjUzNI4PEPjLlFB/erKgzFGM3gIsAf/3WWFQEBkH3uuKENHHARQFQbm45KEtzCUDPodFB2vsJQB04oCiCmZ4IEldwvB5z2ATq46jzydn4C6fJqX6F9jQkAAAAASUVORK5CYII=", V2 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAADs0lEQVR4nO2bTUgUYRjHn3HLpfwoNbX8iMQO5cWKIiGw0sJLpWCXECwh8JbiwcBDkkFSkiVUYBSVUB3S0OhipUVhJEToISH8wtTMJLWt1FVnpudRtHl3d2xmd6SZ7f0dZp7/7gPvvr+dndmZYQRQof/A5n0gSwUgy1kY/ynBWbnNYafOpmNpOB4FDKQlnpBBuo2lKQjNLYDZz323Ikoun8RoKG4C5r55SXyBpWkgAYT0dag0rPhCGZaG4S4gPaEeZMjE0jQsCCCMluAuIC1BxpWpUAogxL7OkvDSa+VY+owlBciSOAkjg4fXnq5swugTlhRAGCXBsgIIIyRYWgAhOsYmxO6OHZFVDz9i1I3lBRCyc7J/zeSPXULh+WGMuvALAYS3EvxGACE5xj5Bc0NyWH3bOEZN+JUAQhwdbg0vKk/BUhN+J4DALUHzyZNfCiC0SrCEgKCMo2CLjsVKH1Mf3j+OrqjJxFIVSwiw70wFe9J2rPTzt5MnSwgQVodA8JEcEALtmPSzlARLCCBWbNoCq1MzsPIO57vXhVFX66qwZLCMAEKIiIGgvRkQEByKSR/yjBNmezqz15XffIRxEUsJIKRZCYTQCJBtgRAYtxFf0Y48Mz0dc6PejuUilhOwgCTiVcsZESt9JLzpZ+bMBKLfIgK8Jb65l5kzEwgugAvgArgAXPktXAAXwAUwc2YCwQVwAVwAF4Arv4UL4AK4AGbOTCC4AC5AmwABr8wGJm7F6g+zw4MgfhnAikVrr6c+V5ztrbj0HsMERF66D/Zt7jdhpZ8OGL1YDFMtTzHNE1FWDav2HMSKxbVXrU+Jo6YKHHfdLu9rxjABcU09bh/GnpwCoccLcL0bhvMPwUxXB76Ksiof4BJgpOgYLudR61XiaQxfWVYBBG3GsQ1tzHueBBCeepWojeELyy6AiKp+AiL+xr+dycekLoBw7VWy1BjesuwCbOvjYMO9V8x7agI89SpRG8MXDBXwq7EWJhrrMM2zMjEJgrPz5u7dDeWkgow7OYIECEEh8P36OUzzqPUqoTFMLcAV2qvTYWocJ6o8xJEA2tkpUetVQmOYWoDWD0cCnO1vNfUq0TOGVrgALoALYObMBEKrAPrbOtnyDI8CtZiWJqy4AgW0aupVomcMrRgmwKpwAVwAF8DMmQkEF/DfCzDhg5OGIUBDfFNvFlaLuAsw4aOzhhFg2x//vOslKHATQJjt4WkjECAgL665+w644FEAMbclyGIhWP3ngJs9CLYrrt/8Ar8BHxywX5M7ETcAAAAASUVORK5CYII=", F2 = { class: "upload-panel-icon" }, R2 = {
  key: 2,
  class: "el-upload__text2"
}, W2 = {
  key: 3,
  class: "el-upload__text"
}, G2 = {
  key: 1,
  class: "upload-hands-submit"
}, Z2 = {
  name: "ElPlusFormUpload",
  inheritAttrs: !1,
  typeName: "upload",
  customOptions: {}
}, oa = /* @__PURE__ */ oe({
  ...Z2,
  props: {
    modelValue: {},
    field: {},
    loading: { type: Boolean },
    desc: {},
    formData: {}
  },
  emits: ["update:modelValue", "validateThis"],
  setup(N, { emit: s }) {
    const r = N, i = Pe("defaultConf"), z = { excel: S2, pdf: B2, file: k2, txt: Q2, word: U2, zip: P2, ppt: V2 }, y = I((typeof r.modelValue == "string" ? [{ url: r.modelValue }] : r.modelValue) || []);
    s("update:modelValue", y);
    const _ = I({}), d = I(xe(r)), g = I(!1), c = I(0), D = Ye(
      () => y.value.map((b) => {
        var B;
        if ([".png", ".jpg", ".gif", ".jpeg"].indexOf(((B = b.raw) == null ? void 0 : B.suffix) || b.suffix) >= 0)
          return b.url;
      }).filter((b) => b)
    );
    Te(async () => {
      var b, B, k;
      (!i.upload || !i.upload.action && !((b = i.upload.minio) != null && b.getObjectAuthUrl)) && console.warn("缺少文件上传配置,无法使用upload组件~"), _.value = await Le(r, {
        drag: !0,
        listType: r.desc.upType === "file" ? "text" : "picture-card",
        multiple: !!r.desc.multiple,
        limit: r.desc.multiple ? r.desc.limit || 20 : 1,
        autoUpload: r.desc.autoUpload ?? !0,
        accept: r.desc.accept || ds[`${r.desc.upType || "image"}Types`].join(","),
        maxSize: r.desc.maxSize || (r.desc.upType === "file" ? (B = i.upload) == null ? void 0 : B.maxFSize : (k = i.upload) == null ? void 0 : k.maxISize),
        beforeUpload: U,
        onRemove: A,
        onSuccess: h,
        onExceed: F,
        onPreview: W,
        httpRequest: Ee,
        ...ze()
      });
    });
    function A(b) {
      S(b, 0);
    }
    async function h(b, B) {
      var Se, qe;
      const { objectUrl: k, previewUrl: pe } = await ((qe = (Se = i.upload) == null ? void 0 : Se.minio) == null ? void 0 : qe.getObjectAuthUrl(B.raw.uploadId));
      B.raw.shareUrl = k, B.raw.previewUrl = pe, B.url = C(B.raw), S(B, 1);
    }
    function C(b) {
      if (b) {
        const B = (b == null ? void 0 : b.suffix) || "";
        if (B) {
          if ([".png", ".jpg", ".gif", ".jpeg"].indexOf(B) >= 0)
            return b.shareUrl || b.furl || b.path;
          for (let k = 0; k < Yl.length; k++)
            for (let pe = 0; pe < Yl[k].suffixes.length; pe++)
              if (Yl[k].suffixes[pe] === B)
                return z[Yl[k].type];
        }
      }
      return z.file;
    }
    function S(b, B) {
      var k, pe;
      if (B === 1)
        y.value.push({
          name: b.name,
          furl: ((k = b.raw) == null ? void 0 : k.path) || b.url,
          url: C(b.raw),
          fsize: b.size,
          uid: b.uid,
          mimeType: (pe = b.raw) == null ? void 0 : pe.type,
          suffix: b.raw.suffix,
          busId: r.desc.busId,
          busType: r.desc.busType
        });
      else {
        const Se = y.value.findIndex((qe) => qe.uid === b.uid);
        Se >= 0 && y.value.splice(Se, 1);
      }
      s("validateThis");
    }
    async function U(b) {
      var pe, Se;
      b.suffix = b.name.substring(b.name.lastIndexOf("."));
      const B = ie(b, ds[`${r.desc.upType || "image"}Suffixes`], _.value.maxSize);
      if (B !== !0)
        return Sn.warning(B), !1;
      const k = await ((Se = (pe = i.upload) == null ? void 0 : pe.minio) == null ? void 0 : Se.getUploadUrl(b.name));
      b.action = k.uploadUrl, b.path = k.objectUrl, b.previewUrl = k.previewUrl, b.uploadId = k.uploadId;
    }
    function W(b) {
      var B, k;
      [".png", ".jpg", ".gif", ".jpeg"].indexOf(((B = b.raw) == null ? void 0 : B.suffix) || b.suffix) >= 0 ? (c.value = D.value.findIndex((pe) => {
        var Se, qe;
        return pe === (((Se = b.raw) == null ? void 0 : Se.shareUrl) || ((qe = b.raw) == null ? void 0 : qe.path) || b.furl);
      }), c.value < 0 && (c.value = 0), g.value = !0) : window.open(((k = b.raw) == null ? void 0 : k.previewUrl) || b.previewUrl, "_blank");
    }
    function F() {
      Sn.error("数量最多只能上传" + _.value.limit + "个图片/文件!!!");
    }
    async function Ee(b) {
      var B, k;
      await ((k = (B = i.upload) == null ? void 0 : B.minio) == null ? void 0 : k.doElUpload(b));
    }
    function X() {
    }
    function ie(b, B, k) {
      return b.size > k ? "上传文件大小不能超过 " + (k / 1024 / 1024).toFixed(2) + "M~" : B && B.length > 0 && B.every((pe) => pe !== b.suffix) ? "上传文件类型错误，请重新选择~" : !0;
    }
    return Ve(
      () => r.modelValue,
      (b, B) => {
        JSON.stringify(b) !== JSON.stringify(B) && (y.value = (b == null ? void 0 : b.map((k) => (k.url = C(k), k))) || []);
      },
      { immediate: !0 }
    ), (b, B) => {
      var Yt;
      const k = V("el-icon"), pe = V("el-upload"), Se = V("el-image-viewer"), qe = V("el-button");
      return m(), Q("div", {
        class: el(["ele-form-upload-image", { "ele-form-upload-file": b.desc.upType === "file" }])
      }, [
        de(pe, ee({ class: "ele-image-upload" }, _.value, ye(d.value), {
          fileList: y.value || [],
          class: { "over-limit": ((Yt = y.value) == null ? void 0 : Yt.length) >= _.value.limit, "upload-disabled": _.value.disabled }
        }), {
          default: G(() => [
            Ue("div", F2, [
              b.desc.icon ? (m(), Q("i", {
                key: 0,
                class: el(b.desc.icon),
                style: _t({ fontSize: b.desc.fontSize || "14px", color: b.desc.color || "#C0C4CC" })
              }, null, 6)) : (m(), Z(k, {
                key: 1,
                style: _t({ fontSize: b.desc.fontSize || "14px", color: b.desc.color || "#C0C4CC" })
              }, {
                default: G(() => [
                  de(Qt(A2))
                ]),
                _: 1
              }, 8, ["style"])),
              b.desc.upType === "file" && b.desc.text2 ? (m(), Q("div", R2, Oe(b.desc.text2), 1)) : ce("", !0),
              b.desc.upType === "file" ? (m(), Q("div", W2, Oe(b.desc.text || "拖拽/点击上传"), 1)) : ce("", !0)
            ])
          ]),
          _: 1
        }, 16, ["fileList", "class"]),
        g.value ? (m(), Z(Se, {
          key: 0,
          onClose: B[0] || (B[0] = (sn) => g.value = !1),
          teleported: "",
          initialIndex: c.value,
          "url-list": D.value
        }, null, 8, ["initialIndex", "url-list"])) : ce("", !0),
        _.value.autoUpload ? ce("", !0) : (m(), Q("div", G2, [
          de(qe, {
            style: { "margin-left": "10px" },
            size: "small",
            type: "success",
            onClick: X
          }, {
            default: G(() => [
              Ke(" 上传到服务器 ")
            ]),
            _: 1
          })
        ]))
      ], 2);
    };
  }
});
const H2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: oa }, Symbol.toStringTag, { value: "Module" })), Xn = [
  Ds,
  _s,
  on,
  Ys,
  ms,
  Is,
  As,
  ws,
  hs,
  vs,
  Ts,
  Ls,
  xs,
  Es,
  Cs,
  bs,
  Os,
  Ss,
  Bs,
  ks,
  Qs,
  Us,
  Ps,
  Vs,
  Fs,
  Rs,
  Ws,
  Gs,
  Zs,
  Hs,
  Ks,
  qs,
  oa
], K2 = [{ required: !0, trigger: "blur", validator: py }], q2 = [{ required: !0, trigger: "blur", validator: jy }], J2 = [{ type: "number", message: "请填入数字！" }], $2 = [{ required: !0, trigger: "blur", validator: dy }], X2 = [{ trigger: "blur", validator: Dy }], ey = [{ required: !0, trigger: "blur", validator: _y }], ty = [{ required: !0, trigger: "blur", validator: Ou }], ny = [{ trigger: "blur", validator: Ou }], ly = [{ required: !0, trigger: "blur", validator: my }], ry = [{ trigger: "blur", validator: Ma }], uy = [{ required: !0, trigger: "blur", validator: Ma }], iy = [
  { required: !0, message: "不能为空！", trigger: "blur" },
  { type: "number", message: "请填入数字！" }
], oy = [{ required: !0, trigger: "blur", validator: gy }], sy = [{ required: !0, trigger: "blur", validator: aa }], ay = [{ trigger: "blur", validator: aa }], My = [{ required: !0, trigger: "change", validator: sa }], cy = [{ required: !0, trigger: "change", validator: sa }], fy = [{ required: !0, trigger: "change", validator: zy }], Ny = [{ required: !0, trigger: "change", validator: yy }];
function gy(N, s, r) {
  /^[1-9]\d*$/.test(s * 1 + "") ? r() : r(new Error("请输入正整数！"));
}
function dy(N, s, r) {
  s.length !== 4 ? r(new Error("验证码必须是4位！")) : r();
}
function py(N, s, r) {
  typeof s > "u" || s === "" || s === null ? r(new Error("此项必填！")) : r();
}
function jy(N, s, r) {
  typeof s > "u" || s === "" || s === null ? r(new Error("此项必填！")) : (typeof s == "number" && (s = s + ""), typeof s == "string" && s.match(/^[ ]*$/) ? r(new Error("不能全是空格!")) : r());
}
function sa(N, s, r) {
  s === null || typeof s > "u" || s === "" || s.length <= 0 ? r(new Error("请选择！")) : r();
}
function zy(N, s, r) {
  s === null || typeof s > "u" || s === "" || s.length <= 0 ? r(new Error("请上传！")) : r();
}
function yy(N, s, r) {
  typeof s > "u" || s === null || s === "" || s === null ? r(new Error("此项必填！")) : s.replace(/\n/g, "") ? typeof s == "string" && s.replace(/\n/g, "").match(/^[ ]*$/) ? r(new Error("不能全是空格!")) : r() : r(new Error("不能全是换行！"));
}
function aa(N, s, r) {
  /^\d+(\.(\d{1}|\d{2}))?$/.test(s * 1 + "") ? r() : r(new Error("小数格式错误(最多两位)!"));
}
function Dy(N, s, r) {
  s ? /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(s) ? r() : r(new Error("邮箱格式错误!")) : r(new Error("邮箱必填"));
}
function _y(N, s, r) {
  s ? /^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(s) ? r() : r(new Error("手机号格式错误!")) : r(new Error("手机号必填"));
}
function Ou(N, s, r) {
  !s || !/^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?=.*[~!@#$%^&*])(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,32}$/.test(s) ? r(new Error("密码为8-32位字母大小写+特殊字符+数字!")) : r();
}
function Yy(N, s, r) {
  s && !/^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?=.*[~!@#$%^&*])(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,32}$/.test(s) ? r(new Error("密码为8-32位字母大小写+特殊字符+数字!")) : r();
}
function my(N, s, r) {
  typeof s > "u" || s === "" || s === null ? r(new Error("此项必填！")) : s && !/^([a-z,A-z,0-9]){4,20}$/.test(s) ? r(new Error("账号为4-20位字母或数字!")) : r();
}
function Ma(N, s, r) {
  s && !/^([a-z,A-z,0-9]){16,20}$/.test(s) ? r(new Error("请输入16-20位字母或数字!")) : r();
}
const ps = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, account: ly, cascader: cy, double: sy, double2: ay, email: X2, notAllBlank: q2, notNull: K2, number: J2, numberNotNull: iy, password: ty, password2: ny, phone: ey, select: My, textarea: Ny, upload: fy, vCode: $2, validatePassword: Ou, validatePassword2: Yy, wordnum: ry, wordnum2: uy, zhengZhengShu: oy }, Symbol.toStringTag, { value: "Module" })), js = /* @__PURE__ */ Object.assign({ "./ElPlusFormArea.vue": lj, "./ElPlusFormAutocomplete.vue": ij, "./ElPlusFormBtn.vue": sj, "./ElPlusFormBtns.vue": cj, "./ElPlusFormCascader.vue": gj, "./ElPlusFormCascaderPanel.vue": jj, "./ElPlusFormCheckbox.vue": Dj, "./ElPlusFormCheckboxButton.vue": mj, "./ElPlusFormColor.vue": wj, "./ElPlusFormDate.vue": Tj, "./ElPlusFormDaterange.vue": Ej, "./ElPlusFormDatetime.vue": Oj, "./ElPlusFormFile.vue": Xj, "./ElPlusFormImage.vue": uz, "./ElPlusFormInput.vue": oz, "./ElPlusFormLink.vue": jz, "./ElPlusFormNbinput.vue": yz, "./ElPlusFormNumber.vue": Yz, "./ElPlusFormPassword.vue": Iz, "./ElPlusFormQuickInput.vue": hz, "./ElPlusFormRadio.vue": Lz, "./ElPlusFormRate.vue": Cz, "./ElPlusFormSelect.vue": Bz, "./ElPlusFormSlider.vue": Uz, "./ElPlusFormStatus.vue": Hz, "./ElPlusFormSwitch.vue": Jz, "./ElPlusFormTag.vue": Xz, "./ElPlusFormText.vue": l2, "./ElPlusFormTextarea.vue": u2, "./ElPlusFormTransfer.vue": s2, "./ElPlusFormTree.vue": c2, "./ElPlusFormTreeSelect.vue": N2, "./ElPlusFormUpload.vue": H2 }), ca = [];
for (const N in js) {
  const s = js[N].default;
  s.typeName && ca.push(s.typeName);
}
const Iy = ["innerHTML"], Ay = {
  key: 0,
  style: { display: "flex", "justify-content": "center" }
}, wy = {
  name: "ElPlusForm",
  inheritAttrs: !1,
  customOptions: {}
}, Su = /* @__PURE__ */ oe({
  ...wy,
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
  setup(N, { expose: s, emit: r }) {
    const i = N, z = Pe("defaultConf"), y = Pe("format"), _ = I(), d = I(!1), g = ze(), c = I([]), D = I(!1);
    let A = null;
    const h = Ye(() => i.size || z.size), C = Ye(() => ({ display: "flex", flexDirection: i.isTable ? "row" : "column" })), S = Ye(() => ({
      scrollToError: !0,
      ...i.formAttrs,
      labelWidth: i.labelWidth === "auto" ? i.isDialog ? "100px" : "120px" : parseInt(i.labelWidth + "") + "px",
      // validateOnRuleChange: false,
      disabled: i.disabled || D.value,
      rules: U,
      labelPosition: Pj() ? "top" : "right",
      style: {
        width: i.maxWidth || i.isTable ? "100%" : i.isDialog ? "80%" : "1000px",
        paddingRight: i.isTable ? "0" : "20px"
      }
    })), U = Ye(() => {
      const w = i.rules || [];
      return i.formDesc && Object.keys(i.formDesc).map((T) => {
        if (w[T] || (w[T] = []), i.formDesc) {
          if (i.formDesc[T].rules)
            typeof i.formDesc[T].rules == "string" ? w[T].push(...ps[i.formDesc[T].rules]) : Vj(i.formDesc[T].rules).map((K) => {
              w[T].push(K);
            });
          else if (i.formDesc[T].required || i.formDesc[T].require) {
            let K = "notAllBlank";
            switch (i.formDesc[T].type) {
              case "upload":
              case "select":
              case "password":
              case "textarea":
                K = i.formDesc[T].type || "";
                break;
              case "cascader":
              case "tselect":
              case "linkuser":
              case "radio":
                K = "select";
                break;
            }
            w[T].push(...ps[K]);
          }
        }
      }), w;
    }), W = Ye(() => {
      const w = [];
      if (i.formDesc) {
        let T = [];
        for (const De in i.formDesc)
          T.push({ ...i.formDesc[De], field: De });
        let K = [], te = 0;
        T.map((De) => {
          if ((De._vif || De.isBlank) && (K.push(De), te++, De.colspan && (te += De.colspan - 1), te >= i.column)) {
            w.push(K), K = [], te = 0;
            return;
          }
        }), K.length > 0 && w.push(K);
      }
      return w;
    }), F = ct.throttle(() => {
      i.formDesc && Object.keys(i.formDesc).forEach((w) => {
        if (i.formDesc) {
          const T = i.formDesc[w];
          if (T && T.type) {
            T._type = ca.includes(T.type.toLowerCase()) ? "el-plus-form-" + T.type : T.type, T._vif = X(T, "vif", w, !T.isBlank), T._disabled = X(T, "disabled", w, i.disabled ?? !1);
            const K = {};
            T._attrs = Object.assign({}, X(T, "attrs", w), K), T._label = X(T, "label", w), T._tip = X(T, "tip", w), !T._tip && !T.noTip && T.type === "upload" && (T._tip = `最多上传${T.multiple ? T.limit || 20 : 1}${T.upType === "file" ? "个文件" : "张图片"}`), T.default !== void 0 && T.default !== null && i.modelValue[w] === void 0 && (i.modelValue[w] = T.default), T.defaultItem !== void 0 && T.defaultItem !== null && i.modelValue[w] === void 0 && (i.modelValue[w] = T.defaultItem.value), T.format && (typeof T.format == "string" ? i.modelValue[w] = y[T.format](i.modelValue[w], i.modelValue) : typeof T.format == "function" && (i.modelValue[w] = T.format(i.modelValue[w], i.modelValue)));
          }
        }
      });
    }, 500), Ee = Ye(() => {
      let w = [];
      return i.showBtns && (i.showCancel && w.push({
        field: "_reset_btn",
        desc: {
          label: i.cancelBtnText || "取消",
          size: h.value,
          disabled: D.value,
          on: { click: () => r("cancel") }
        }
      }), i.showReset && w.push({
        field: "_reset_btn",
        desc: {
          label: i.resetBtnText || "重置",
          confirm: `确定要${i.resetBtnText || "重置"}?`,
          size: h.value,
          disabled: D.value,
          on: { click: qe }
        }
      }), i.showSubmit && w.push({
        field: "_reset_btn",
        desc: {
          label: i.submitBtnText || "提交",
          size: h.value,
          type: "primary",
          loading: i.isLoading || D.value,
          on: { click: Se }
        }
      })), w;
    }), X = (w, T, K, te = null) => typeof w[T] == "function" ? (d.value = !0, w[T](i.modelValue, i.modelValue[K])) : typeof w[T] == "boolean" ? w[T] ?? !1 : typeof w[T] == "string" ? w[T] ?? "" : w[T] ?? te, ie = () => new Promise((w, T) => {
      U.value ? _.value.validate((K, te) => {
        K ? w() : T(te);
      }) : w();
    }), b = (w) => {
      w && c.value.filter((T) => T.field === w.field).length <= 0 && c.value.push(w);
    }, B = (w, T, K) => {
      const te = {};
      if (!w)
        return { [T]: K };
      if (!w._vif || K === void 0 || K === null)
        return te;
      if (w.type === "category")
        if (K === null && (K = []), w.checkStrictly === !0)
          te.categoryId = K[2] ?? K[1] ?? K[0] ?? "";
        else
          for (let De = 0; De < 3; De++)
            te["categoryId" + (De + 1)] = K[De] ?? "";
      else if (w.type === "area") {
        K === null && (K = [null, null, null, null]);
        const [De, Pt, nt, Re] = K;
        w.checkStrictly ? te[T] = Re || nt || Pt || De || null : (te.provinceId = De || -1, te.cityId = Pt || -1, te.zoneId = nt || -1, te.streetId = Re || -1);
      } else if (w.type === "daterange")
        K && K.length === 2 && (te.startTime = K[0], typeof K[1] == "string" ? te.endTime = new Date(K[1]).getTime() : te.endTime = K[1], te.endTime = te.endTime + (24 * 60 * 60 - 1) * 1e3, te.startTime = y.time(te.startTime, 3), te.endTime = y.time(te.endTime, 3));
      else if (w.type === "linkuser") {
        const [De, Pt, nt, Re] = K;
        te.userIds = De, te.deptIds = Pt, te.userNames = nt, te.deptNames = Re;
      } else {
        switch (w.type) {
          case "checkbox":
            Array.isArray(K) && (K = K.join(","));
            break;
        }
        te[T] = K;
      }
      return te;
    }, k = () => {
      const w = {};
      return i.formDesc && Object.keys(i.modelValue).map((T) => {
        ["provinceId", "cityId", "zoneId", "streetId"].indexOf(T) >= 0 || i.formDesc && Object.assign(w, B(i.formDesc[T], T, i.modelValue[T]));
      }), w;
    }, pe = () => {
      c.value.map((w) => {
        w.CID && w.changeValidImg();
      });
    }, Se = async () => {
      let w = k();
      try {
        if (g.beforeValidate && await g.beforeValidate(w) === !1)
          return;
        await ie();
        for (const T in w) {
          if (T.indexOf("_") === 0) {
            delete w[T];
            continue;
          }
          if (i.formDesc) {
            const K = i.formDesc[T];
            K && K.valueFormat && (w[T] = K.valueFormat(w[T], w)), (w[T] === !0 || w[T] === !1) && (w[T] = +w[T]);
          }
        }
        if (g.beforeRequest) {
          const T = await g.beforeRequest(w);
          if (T === !1)
            return;
          typeof T == "object" && (w = T);
        }
        if (i.requestFn) {
          if (D.value)
            return;
          D.value = !0;
          try {
            let T = {};
            i.updateFn && w && w[i.idKey] ? T = await i.updateFn(w) : T = await i.requestFn(w), Ut(() => {
              g.success && typeof g.success == "function" && g.success({ response: T, formData: i.modelValue, callback: () => D.value = !1 });
            });
          } catch (T) {
            if (g.requestError && typeof g.requestError == "function")
              g.requestError(T);
            else {
              if (T instanceof Error)
                try {
                  JSON.parse(T.message) instanceof Object;
                } catch {
                }
              else
                T instanceof Object;
              g.requestError && typeof g.requestError == "function" && g.requestError();
            }
            D.value = !1;
          } finally {
            i.isDialog || (D.value = !1), g.requestEnd && typeof g.requestEnd == "function" && g.requestEnd();
          }
        } else {
          if (i.isLoading)
            return;
          r("request", w);
        }
      } catch (T) {
        console.log("error: ", T);
      }
    }, qe = () => {
      Object.keys(i.modelValue).map((w) => {
        i.modelValue[w] = A ? A[w] : (i.formDesc && i.formDesc[w] && i.formDesc[w].default) ?? null;
      }), setTimeout(() => {
        Yt();
      }, 100), r("reset");
    }, Yt = () => {
      var w;
      (w = _.value) == null || w.clearValidate();
    }, sn = () => {
      i.modelValue && Object.keys(i.modelValue).map((w) => {
        i.modelValue[w] = (i.formDesc && i.formDesc[w] && i.formDesc[w].default) ?? null;
      }), Ut(() => {
        Yt();
      });
    };
    function an(w) {
      _.value.validateField(w, (T) => {
      });
    }
    return Ve(
      () => i.formDesc,
      (w) => {
        w && F();
      }
    ), Ve(
      () => i.modelValue,
      (w, T) => {
        d.value && w && (F(), Ut(() => {
          setTimeout(() => {
            A || (A = ct.cloneDeep(i.modelValue));
          }, 100);
        }));
      },
      { deep: !0 }
    ), _n(async () => {
      d.value || F(), Ut(() => {
        setTimeout(() => {
          Yt(), setTimeout(() => {
            A || (A = ct.cloneDeep(i.modelValue));
          }, 100);
        }, 100);
      });
    }), s({ submit: Se, getData: k, validate: ie, reset: qe, clearValid: Yt, clear: sn, changeValidImg: pe }), (w, T) => {
      const K = V("el-form-item"), te = V("el-col"), De = V("el-row"), Pt = V("el-form");
      return m(), Q("div", {
        style: _t(C.value)
      }, [
        Je(w.$slots, "top", {
          formData: i.modelValue
        }),
        Ue("div", {
          style: _t({ display: "flex", justifyContent: w.isDialog ? "center" : "" })
        }, [
          de(Pt, ee({
            class: "el-plus-form-panel",
            ref_key: "refElPlusForm",
            ref: _,
            model: i.modelValue,
            onSubmit: Kp(Se, ["prevent"])
          }, S.value), {
            default: G(() => [
              (m(!0), Q(Ae, null, ve(W.value, (nt, Re) => (m(), Z(De, {
                gutter: 10,
                key: Re,
                style: _t({ marginRight: w.isTable ? "20px" : 0 })
              }, {
                default: G(() => [
                  (m(!0), Q(Ae, null, ve(nt, (me, tl) => (m(), Z(te, {
                    key: Re + "-" + tl + "-" + me.field,
                    xs: 24,
                    sm: 24,
                    md: me.colspan && me.colspan >= w.column ? 24 : w.column >= 2 ? 12 : 24,
                    lg: me.colspan && me.colspan >= w.column ? 24 : Math.floor(24 / w.column * (me.colspan || 1)),
                    xl: me.colspan && me.colspan >= w.column ? 24 : Math.floor(24 / w.column * (me.colspan || 1))
                  }, {
                    default: G(() => {
                      var mn;
                      return [
                        me._vif ? (m(), Q("div", {
                          key: 0,
                          class: "el-plus-form-column-panel",
                          style: _t({ "justify-content": w.isTable ? "flex-end" : "flex-start" })
                        }, [
                          de(K, {
                            style: _t([{ "min-height": "40px" }, { width: ((mn = me._attrs) == null ? void 0 : mn.width) || me.width || (w.isTable ? "150px" : "100%") }]),
                            label: w.showLabel && me.showLabel !== !1 ? me._label : null,
                            "label-width": me.labelWidth || w.labelWidth || (w.isDialog ? "100px" : "120px"),
                            prop: me.field
                          }, {
                            default: G(() => [
                              (m(), Z(zs(me._type), ee({
                                style: { "min-width": "80px", width: "100%" },
                                formData: i.modelValue,
                                disabled: me._disabled ?? w.disabled ?? !1,
                                readonly: w.readonly ?? !1
                              }, me._attrs, {
                                desc: me,
                                ref_for: !0,
                                ref: b,
                                field: me.field,
                                modelValue: i.modelValue[me.field || ""],
                                "onUpdate:modelValue": (Tt) => i.modelValue[me.field || ""] = Tt,
                                isTable: w.isTable,
                                onValidateThis: () => an(me.field || "")
                              }), null, 16, ["formData", "disabled", "readonly", "desc", "field", "modelValue", "onUpdate:modelValue", "isTable", "onValidateThis"])),
                              me._tip ? (m(), Q("div", {
                                key: 0,
                                class: "el-plus-form-tip",
                                innerHTML: me._tip
                              }, null, 8, Iy)) : ce("", !0)
                            ]),
                            _: 2
                          }, 1032, ["label", "label-width", "prop", "style"])
                        ], 4)) : ce("", !0)
                      ];
                    }),
                    _: 2
                  }, 1032, ["md", "lg", "xl"]))), 128))
                ]),
                _: 2
              }, 1032, ["style"]))), 128)),
              Je(w.$slots, "row")
            ]),
            _: 3
          }, 16, ["model", "onSubmit"])
        ], 4),
        Je(w.$slots, "default"),
        de(Pt, null, {
          default: G(() => [
            Je(w.$slots, "form-btn", {
              data: i.modelValue
            }, () => [
              Ee.value && Ee.value.length > 0 ? (m(), Q("div", Ay, [
                (m(!0), Q(Ae, null, ve(Ee.value, (nt, Re) => (m(), Z(on, qp(ee({ key: Re }, nt)), null, 16))), 128))
              ])) : ce("", !0)
            ]),
            Je(w.$slots, "bottom", {
              formData: i.modelValue
            })
          ]),
          _: 3
        }),
        Je(w.$slots, "form-footer", {
          formData: i.modelValue
        })
      ], 4);
    };
  }
});
const hy = {
  name: "ElPlusFormDialog",
  inheritAttrs: !1,
  customOptions: {}
}, vy = /* @__PURE__ */ oe({
  ...hy,
  props: {
    modelValue: { default: () => ({}) },
    show: { type: Boolean, default: !1 },
    title: { default: "" },
    tableRef: {},
    success: {},
    successTip: { default: "操作成功!" }
  },
  emits: ["update:show", "update:modelValue"],
  setup(N, { expose: s, emit: r }) {
    const i = N, z = Ye({
      get: () => i.modelValue,
      set(X) {
        r("update:modelValue", X);
      }
    }), y = Ye({
      get() {
        return i.show && Ut(() => {
          setTimeout(() => {
            var X;
            (X = _.value) == null || X.clearValid();
          }, 10);
        }), i.show;
      },
      set(X) {
        X ? F() : Ee();
      }
    }), _ = I(null), { width: d, top: g, modal: c, appendToBody: D, showClose: A, draggable: h, closeOnClickModal: C, ...S } = Object.assign({ width: "700px", draggable: !0, top: "15vh", closeOnClickModal: !1, showCancel: !0 }, ze()), U = { width: d, top: g, modal: c, appendToBody: D, showClose: A, draggable: h, closeOnClickModal: C };
    function W(X) {
      i.success ? i.success(X) : i.tableRef && (Sn.success(i.successTip), i.tableRef.reload(), Ee(), setTimeout(() => {
        X.callback();
      }, 200));
    }
    function F() {
      r("update:show", !0);
    }
    function Ee() {
      var X;
      r("update:show", !1), (X = _.value) == null || X.clear();
    }
    return s({ open: F, close: Ee }), (X, ie) => {
      const b = V("el-dialog");
      return m(), Z(b, ee({
        class: "el-plus-form-dialog",
        modelValue: y.value,
        "onUpdate:modelValue": ie[1] || (ie[1] = (B) => y.value = B),
        title: i.title
      }, U, { "destroy-on-close": "" }), {
        header: G(() => [
          Je(X.$slots, "header")
        ]),
        default: G(() => [
          de(Su, ee({
            ref_key: "refElPlusDialogForm",
            ref: _,
            style: { padding: "20px" },
            isDialog: !0,
            modelValue: z.value,
            "onUpdate:modelValue": ie[0] || (ie[0] = (B) => z.value = B)
          }, S, {
            success: W,
            onCancel: Ee
          }), {
            top: G(() => [
              Je(X.$slots, "top")
            ]),
            default: G(() => [
              Je(X.$slots, "default")
            ]),
            _: 3
          }, 16, ["modelValue"])
        ]),
        _: 3
      }, 16, ["modelValue", "title"]);
    };
  }
}), Ty = { class: "el-plus-form-group" }, Ly = {
  key: 0,
  class: "title-line"
}, xy = {
  name: "ElPlusFormGroup",
  inheritAttrs: !1,
  customOptions: {}
}, Ey = /* @__PURE__ */ oe({
  ...xy,
  props: {
    modelValue: {},
    formGroup: {},
    isLoading: { type: Boolean }
  },
  emits: ["update:show", "update:modelValue", "before-validate", "before-request", "request-success", "request-error", "request-end", "request"],
  setup(N, { emit: s }) {
    const r = N, i = I([]), z = [];
    let y = ot({});
    const _ = Ye(() => {
      const g = [], c = ct.cloneDeep(r.formGroup), D = r.formGroup.column || 1;
      return delete c.group, delete c.column, c.beforeValidate = async (A) => await Promise.all(i.value.map((h) => h.validate())), r.formGroup.group.map((A, h) => {
        g.push({
          title: A.title,
          column: A.column || D,
          formProps: Object.assign({}, h === r.formGroup.group.length - 1 ? c : { showBtns: !1 }, A || {})
        });
      }), g;
    });
    function d(g, c) {
      g && z.indexOf(c) < 0 && (z.push(c), i.value.push(g));
    }
    return (g, c) => (m(), Q("div", Ty, [
      (m(!0), Q(Ae, null, ve(_.value, (D, A) => (m(), Q(Ae, { key: A }, [
        D.title ? (m(), Q("div", Ly, Oe(D.title), 1)) : ce("", !0),
        de(Su, ee({
          modelValue: Qt(y),
          "onUpdate:modelValue": c[0] || (c[0] = (h) => ys(y) ? y.value = h : y = h)
        }, D.formProps, {
          ref_for: !0,
          ref: (h) => d(h, "form" + A)
        }), null, 16, ["modelValue"])
      ], 64))), 128))
    ]));
  }
});
const Cy = { class: "el-plus-table-edit-column" }, by = { class: "select-panel" }, Oy = { class: "dialog-footer" }, Sy = /* @__PURE__ */ oe({
  __name: "settingColumn",
  props: {
    column: {},
    tbName: {},
    size: {}
  },
  setup(N) {
    const s = N, r = Pe("defaultConf"), i = I(!1), z = I([]), y = I([]), _ = I(!1), d = I(!1);
    function g() {
      i.value = !0;
    }
    function c() {
      if (z.value.length <= 0)
        return Sn.warning("请至少选择一列！"), !1;
      const S = [];
      s.column.map((U) => {
        z.value.indexOf(U.label) < 0 ? (S.push(U.label), U.scShow = !1) : U.scShow = !0;
      }), S.length > 0 ? localStorage.setItem(r.storagePrefix + "hideColumnsList_" + s.tbName, S.join("__")) : localStorage.removeItem(r.storagePrefix + "hideColumnsList_" + s.tbName), i.value = !1, y.value = z.value;
    }
    function D() {
      z.value = [], d.value && (z.value = s.column.map((S) => S.label)), _.value = !1;
    }
    function A() {
      z.value.length === 0 ? (_.value = !1, d.value = !1) : s.column.length === z.value.length ? (_.value = !1, d.value = !0) : (_.value = !0, d.value = !1);
    }
    function h(S) {
      const U = localStorage.getItem(r.storagePrefix + "hideColumnsList_" + s.tbName);
      let W = [];
      U != null && U.length > 0 && (W = U.split("__")), s.column.map((F) => {
        F.vif !== void 0 && F.vif !== null ? typeof F.vif == "function" ? F._vif = F.vif(F) : F._vif = !!F.vif : F._vif = !0, F._vif && W.indexOf(F.label) < 0 && z.value.push(F.label);
      }), A(), S && c();
    }
    function C() {
      i.value = !1, z.value = y.value;
    }
    return _n(() => {
      s.tbName && h(!0);
    }), (S, U) => {
      const W = V("el-button"), F = V("el-checkbox"), Ee = V("el-checkbox-group"), X = V("el-dialog");
      return m(), Q("div", Cy, [
        de(W, {
          plain: !0,
          type: "primary",
          icon: "ele-Setting",
          onClick: g,
          size: S.size,
          title: "编辑显示列",
          circle: ""
        }, null, 8, ["size"]),
        de(X, {
          title: "编辑显示列",
          modelValue: i.value,
          "onUpdate:modelValue": U[2] || (U[2] = (ie) => i.value = ie),
          width: "40%"
        }, {
          default: G(() => [
            Ue("div", by, [
              de(F, {
                modelValue: d.value,
                "onUpdate:modelValue": U[0] || (U[0] = (ie) => d.value = ie),
                indeterminate: _.value,
                onChange: D
              }, {
                default: G(() => [
                  Ke(" 全选 ")
                ]),
                _: 1
              }, 8, ["modelValue", "indeterminate"])
            ]),
            de(Ee, {
              modelValue: z.value,
              "onUpdate:modelValue": U[1] || (U[1] = (ie) => z.value = ie),
              onChange: A,
              style: { padding: "0 10px", "flex-wrap": "wrap", display: "flex" }
            }, {
              default: G(() => [
                (m(!0), Q(Ae, null, ve(s.column, (ie) => (m(), Q(Ae, {
                  key: ie.label
                }, [
                  ie._vif ? (m(), Z(F, {
                    key: 0,
                    label: ie.label
                  }, {
                    default: G(() => [
                      Ke(Oe(ie.label), 1)
                    ]),
                    _: 2
                  }, 1032, ["label"])) : ce("", !0)
                ], 64))), 128))
              ]),
              _: 1
            }, 8, ["modelValue"])
          ]),
          footer: G(() => [
            Ue("div", Oy, [
              de(W, {
                size: S.size,
                onClick: C
              }, {
                default: G(() => [
                  Ke(" 取 消 ")
                ]),
                _: 1
              }, 8, ["size"]),
              de(W, {
                size: S.size,
                type: "primary",
                onClick: c
              }, {
                default: G(() => [
                  Ke(" 确 定 ")
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
const By = /* @__PURE__ */ Fe(Sy, [["__scopeId", "data-v-76fa7ef7"]]);
function ky() {
  return !!navigator.userAgent.match(/('phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone')/i);
}
function Qy(N) {
  switch (N.type) {
    case void 0:
      N.type = "primary";
      break;
    case "add":
      N.type = "primary", N.title = N.title || "新增", N.icon = "ele-Plus";
      break;
    case "edit":
      N.type = "primary", N.title = N.title || "编辑", N.icon = "ele-EditPen";
      break;
    case "delete":
    case "del":
      N.type = "danger", N.title = N.title || "删除", N.icon = "ele-Delete";
      break;
  }
  return N;
}
function fa(N, s) {
  const r = [];
  return N && N.length > 0 && ct.cloneDeep(N).map((i) => {
    if (i.nodes) {
      const z = fa(i.nodes, s)[0].children;
      i.nodes = z || i.nodes;
    }
    switch (i.type || (i.type = "text"), i.type) {
      case "image":
        i.width = i.width || "110px", i.align = i.align || "left", i.headerAlign = i.headerAlign || "left";
        break;
      case "btns":
        if (!i.minWidth && i.btns && i.btns.length >= 2) {
          let z = 0;
          i.btns.map((y) => z += typeof y.label == "string" ? y.label.length : 4), i.width = i.width || z * 20 + "px";
        }
        i.align = i.align || "left", i.headerAlign = i.headerAlign || "left", i.text = !0;
        break;
    }
    if (i.minWidth = i.minWidth || (i.label !== "操作" ? s : "auto"), i.showOverflowTooltip = i.label !== "操作", i.parent) {
      let z = !1;
      r.forEach((y) => {
        y.label === i.parent && (y.children.push(i), z = !0);
      }), z || r.push({ label: i.parent, children: [i] });
    } else
      r.push(i);
  }), r;
}
const Uy = (N, s) => {
  let r = "";
  for (const i in N)
    s && Array.isArray(s) && s.length > 0 && s.indexOf(i) >= 0 || N[i] !== void 0 && N[i] !== null && N[i] !== "" && (r !== "" && (r += "&"), r += i + "=" + N[i]);
  return r;
}, Py = {
  key: 0,
  class: "el-plus-table-header-info"
}, Vy = {
  key: 0,
  class: "el-plus-table-form-items"
}, Fy = { class: "table-header-form-btns" }, Ry = { class: "el-plus-table-header-btn" }, Wy = /* @__PURE__ */ oe({
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
  setup(N, { expose: s, emit: r }) {
    const i = N, z = Pe("defaultConf"), y = I(), _ = Ye(() => {
      const h = [];
      return i.toolbar && i.toolbar.btns && i.toolbar.btns.map((C) => {
        h.push({ ...Qy(C), size: C.size || i.size });
      }), h;
    }), d = Ye(() => {
      var C;
      const h = (C = i.toolbar) == null ? void 0 : C.formConfig;
      return h != null && h.formDesc && Object.values(h == null ? void 0 : h.formDesc).map((S) => {
        if (S.width)
          return;
        let U = 300;
        switch (S.type) {
          case "daterange":
          case "input":
          case "area":
            U = 300;
            break;
        }
        S.width = U + "px";
      }), h;
    });
    function g() {
      r("query");
    }
    async function c({ callBack: h }) {
      var C, S, U, W, F;
      if ((C = i.toolbar) != null && C.export) {
        const Ee = new XMLHttpRequest();
        let X = i.toolbar.export.url || "";
        if (i.toolbar.export.fetch ? X = await i.toolbar.export.fetch(Object.assign({}, (S = y.value) == null ? void 0 : S.getData(), ((U = i.toolbar.export) == null ? void 0 : U.data) || {})) : i.toolbar.export.noQuery || (X += (X.indexOf("?") >= 0 ? "&" : "?") + Uy(Object.assign({}, (W = y.value) == null ? void 0 : W.getData(), ((F = i.toolbar.export) == null ? void 0 : F.data) || {}))), Ee.open("get", X, !0), Ee.responseType = "blob", i.toolbar.export.isAuth !== !1 && z.token) {
          let ie = z.token;
          typeof z.token == "function" && (ie = z.token()), Ee.setRequestHeader("Authorization", "Bearer " + ie);
        }
        Ee.onload = function() {
          var ie, b;
          if (this.status == 200) {
            const B = document.createElement("a");
            B.href = window.URL.createObjectURL(this.response), B.download = (((b = (ie = i.toolbar) == null ? void 0 : ie.export) == null ? void 0 : b.name) || (/* @__PURE__ */ new Date()).getTime()) + ".xls", B.click(), window.URL.revokeObjectURL(X), setTimeout(() => {
              h && h();
            }, 1e3);
          }
        }, Ee.onerror = function() {
          setTimeout(() => {
            h && h();
          }, 1e3);
        }, Ee.send();
      }
    }
    function D() {
      y.value.submit();
    }
    function A() {
      y.value.clear(), Ut(() => {
        y.value.submit();
      });
    }
    return _n(() => {
    }), s({ getData: () => {
      var h;
      return (h = y.value) == null ? void 0 : h.getData();
    } }), (h, C) => {
      const S = V("ElPlusForm"), U = V("el-form");
      return i.toolbar ? (m(), Q("div", Py, [
        de(U, {
          inline: !0,
          class: "el-plus-table-header-form",
          style: _t({ justifyContent: !i.toolbar.formConfig && i.toolbar.btnRight ? "flex-end" : "space-between" })
        }, {
          default: G(() => [
            i.toolbar.formConfig ? (m(), Q("div", Vy, [
              de(S, ee({
                ref_key: "elPlusFormRef",
                ref: y
              }, d.value, {
                modelValue: i.modelValue,
                "onUpdate:modelValue": C[0] || (C[0] = (W) => i.modelValue = W),
                labelWidth: "1",
                requestFn: g,
                showBtns: !1,
                isTable: !0
              }), {
                row: G(() => [
                  Ue("div", Fy, [
                    de(on, {
                      type: "primary",
                      icon: "ele-Search",
                      loading: h.loading,
                      desc: { label: "查询", on: { click: D }, size: h.size }
                    }, null, 8, ["loading", "desc"]),
                    de(on, {
                      desc: { label: "重置", on: { click: A }, size: h.size }
                    }, null, 8, ["desc"]),
                    i.toolbar.export ? (m(), Z(on, {
                      key: 0,
                      type: "primary",
                      desc: { label: "导出Excel", size: h.size, mask: !0, on: { click: c } }
                    }, null, 8, ["desc"])) : ce("", !0),
                    h.tbName ? (m(), Z(By, {
                      key: 1,
                      tbName: h.tbName,
                      column: h.column || [],
                      size: h.size
                    }, null, 8, ["tbName", "column", "size"])) : ce("", !0),
                    (m(!0), Q(Ae, null, ve(_.value, (W, F) => (m(), Z(on, {
                      key: F,
                      desc: W,
                      loading: h.loading
                    }, null, 8, ["desc", "loading"]))), 128))
                  ])
                ]),
                _: 1
              }, 16, ["modelValue"])
            ])) : (m(), Q("div", {
              key: 1,
              class: "el-plus-table-header-btns",
              style: _t({ "min-width": Qt(ky)() ? "100%" : _.value && _.value.length > 0 ? _.value.length * 110 + "px" : "10px" })
            }, [
              Ue("div", Ry, [
                (m(!0), Q(Ae, null, ve(_.value, (W, F) => (m(), Z(on, {
                  key: F,
                  desc: W,
                  loading: h.loading
                }, null, 8, ["desc", "loading"]))), 128))
              ])
            ], 4))
          ]),
          _: 1
        }, 8, ["style"])
      ])) : ce("", !0);
    };
  }
});
const Gy = /* @__PURE__ */ Fe(Wy, [["__scopeId", "data-v-6ce69554"]]), Zy = { style: { width: "100%", display: "flex" } }, Hy = /* @__PURE__ */ oe({
  __name: "columnItem",
  props: {
    modelValue: {},
    field: {},
    desc: {},
    scope: {},
    size: {}
  },
  setup(N) {
    var d;
    const s = N, r = I(((d = s.scope) == null ? void 0 : d.$index) || 0), i = Ye(() => {
      const g = [];
      return s.desc.nodes ? s.desc.nodes.map((c, D) => {
        g.push(y(c.field || s.field, c, D));
      }) : (s.field ? s.field.split(",") : []).map((D, A) => {
        g.push(y(D, s.desc, A));
      }), g.length <= 0 && g.push(y("", s.desc, 0)), g;
    }), z = Ye(() => {
      var g;
      return typeof s.desc.content == "function" ? s.desc.content(s.modelValue, (g = s.scope) == null ? void 0 : g.row, s.field) : s.desc.content || "";
    }), y = (g, c, D) => {
      var h, C, S;
      const A = {
        field: g,
        desc: {
          prop: g,
          default: "",
          size: c.size || s.size || "small"
        }
      };
      return Object.assign(A.desc, c), c.type === "btn" && (A.desc.btnType = c.btnType || "primary", A.desc.btnLabel = c.btnLabel || c.label, A.desc.plain = c.plain || !0, A.desc.text = !0), c.type ? (c.type === "text" && (A.desc.default = "-"), c.type, typeof c.type == "string" ? A.desc.type = c.type : A.desc.type = c.type[D] || c.type[0], c.format && (typeof c.format == "string" || typeof c.format == "function" ? A.desc.format = c.format : A.desc.format = c.format[D] === null ? null : c.format[D] || c.format[0]), c.title && (typeof c.title == "string" ? A.desc.title = c.title : A.desc.title = c.title[D] || c.title[0])) : A.desc.type = "text", c.elType && (A.desc.elType = c.elType), c.linkType && (A.desc.linkType = c.linkType), c.linkId && (A.desc.linkId = c.linkId), c.color && (A.desc.style = c.style || {}, typeof c.color == "function" ? A.desc.style.color = c.color((h = s.scope) == null ? void 0 : h.row[s.field || ""], (C = s.scope) == null ? void 0 : C.row, s.field) : typeof c.color == "string" ? A.desc.style.color = c.color : A.desc.style.color = c.color[D] === null ? null : c.color[D] || c.color[0]), c.on && (Object.prototype.toString.call(c.on) === "[object Array]" ? A.desc.on = c.on[D] === null ? null : c.on[D] || c.on[0] : A.desc.on = c.on), c.disabled && (A.disabled = !0), typeof c.options == "function" && (A.desc.options = c.options(s.scope)), A.vshow = _(c), c.attrs && (typeof c.attrs == "function" ? A.desc.attrs = c.attrs((S = s.scope) == null ? void 0 : S.row) : A.desc.attrs = c.attrs), A.desc._label = c.label, A;
    }, _ = (g) => {
      var c;
      return g.vshow !== void 0 && g.vshow !== null && g.vshow !== "" ? typeof g.vshow == "boolean" ? g.vshow : typeof g.vshow == "function" ? g.vshow((c = s.scope) == null ? void 0 : c.row) : !!g.vshow : !0;
    };
    return _n(() => {
    }), (g, c) => {
      const D = V("el-icon"), A = V("el-popover");
      return m(), Q("div", {
        class: el(["el-plus-table-column-item", [g.desc.inline ? "el-plus-table-column-row" : "el-plus-table-column-column"]])
      }, [
        (m(!0), Q(Ae, null, ve(i.value, (h, C) => {
          var S;
          return m(), Q(Ae, {
            key: C + (h.options && h.options.length > 0 ? h.options[0].value || h.options[0].v : "0")
          }, [
            g.desc.content && z.value ? (m(), Z(A, {
              key: 0,
              placement: "left",
              width: 200,
              trigger: "hover",
              effect: "dark",
              content: z.value
            }, {
              reference: G(() => [
                de(D, { style: { color: "#f56c6c", "font-size": "26px", padding: "0px 8px 0 0" } }, {
                  default: G(() => [
                    de(Qt(x2))
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["content"])) : ce("", !0),
            Ue("div", Zy, [
              h.vshow === void 0 || h.vshow ? (m(), Z(zs("el-plus-form-" + h.desc.type), ee({ key: 0 }, h, {
                isTable: !0,
                formData: (S = s.scope) == null ? void 0 : S.row,
                size: h.size || g.size,
                rowIndex: r.value,
                modelValue: s.scope.row[h.field],
                "onUpdate:modelValue": (U) => s.scope.row[h.field] = U
              }), null, 16, ["formData", "size", "rowIndex", "modelValue", "onUpdate:modelValue"])) : ce("", !0)
            ])
          ], 64);
        }), 128))
      ], 2);
    };
  }
});
const Ky = /* @__PURE__ */ Fe(Hy, [["__scopeId", "data-v-b3941bb0"]]), qy = { class: "el-plus-table-content" }, Jy = {
  key: 0,
  class: "table-tabs-panel"
}, $y = { class: "el-plus-table-main" }, Xy = { key: 1 }, eD = {
  key: 1,
  class: "bottom-page-static-info"
}, tD = {
  name: "ElPlusTable",
  inheritAttrs: !1,
  customOptions: {}
}, nD = /* @__PURE__ */ oe({
  ...tD,
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
  setup(N, { expose: s, emit: r }) {
    var cn, ml, An, wn, nl;
    const i = N, z = Pe("defaultConf"), y = Pe("format"), _ = I(), d = I(((ml = (cn = i.tableConfig) == null ? void 0 : cn.tabConf) == null ? void 0 : ml.tabs[0].value) ?? ""), g = I({}), c = Ye(() => (L) => L.key ? g.value[L.key] || 0 : ""), D = I(), A = I(!1), h = I(!!((An = i.tableConfig.tabConf) != null && An.fetch)), C = I(!1), S = z.size || "small", U = I({});
    let W = ot({});
    const F = ot(i.modelValue || []), Ee = ot([]), X = ot(fa(i.tableConfig.column, i.isDialog ? "auto" : i.colMinWidth)), ie = I(0), b = ot(ct.cloneDeep(i.selectList) || []), B = ot([]), k = ot({
      current: !i.isDialog && W.current ? parseInt(W.current) : 1,
      total: 0,
      size: !i.isDialog && W.size ? parseInt(W.size) : i.pageSize
    }), pe = ((nl = (wn = i.tableConfig) == null ? void 0 : wn.explan) == null ? void 0 : nl.treeProps) || { children: "children", hasChildren: "hasChildren" }, Se = Ye(() => i.tableConfig.column.map((L) => i.tableConfig.tbName ? L._vif && L.scShow : (L.vif !== void 0 && L.vif !== null ? typeof L.vif == "function" ? L._vif = L.vif(L) : L._vif = !!L.vif : L._vif = !0, L._vif))), qe = Ye(() => {
      var re, ne, we, st, dt, lt, $e;
      const L = [];
      if ((re = i.tableConfig.summaryConf) != null && re.vif) {
        if (typeof ((ne = i.tableConfig.summaryConf) == null ? void 0 : ne.vif) == "boolean") {
          if (!((we = i.tableConfig.summaryConf) != null && we.vif))
            return L;
        } else if (!((st = i.tableConfig.summaryConf) != null && st.vif()))
          return L;
      }
      if ((dt = i.tableConfig.summaryConf) != null && dt.prop) {
        const Lt = i.tableConfig.summaryConf.prop.split(","), Gt = (($e = (lt = i.tableConfig.summaryConf) == null ? void 0 : lt.label) == null ? void 0 : $e.split(",")) || [];
        Lt.map((kn, je) => {
          var We, pt;
          let rt = "";
          (We = i.tableConfig.summaryConf) != null && We.sumFn ? rt = (pt = i.tableConfig.summaryConf) == null ? void 0 : pt.sumFn(F, b) : rt = y.yuan(F.reduce((ll, rl) => ll += rl[kn], 0)), L.push({ label: Gt[je], value: rt });
        });
      }
      return L;
    });
    function Yt(L) {
      Bn(!0), r("tabChange", L);
    }
    function sn(L, re, ne) {
      var st, dt;
      const we = nt();
      we[((dt = (st = i.tableConfig) == null ? void 0 : st.explan) == null ? void 0 : dt.idName) || "parentId"] = L.id, i.tableConfig.fetch && i.tableConfig.fetch(we).then((lt) => {
        ne(lt == null ? void 0 : lt.records);
      });
    }
    function an(L) {
      return Ee.length > L.rowIndex ? Ee[L.rowIndex * 1] : "";
    }
    function w(L, re) {
      te(re, !L.some((ne) => ne[i.rowKey] === re[i.rowKey])), r("select", L, re), r("selection", ct.cloneDeep(b));
    }
    function T(L) {
      const re = !(L && L.length > 0);
      (re ? F : L).map((ne) => {
        te(ne, re);
      }), r("selectAll", L, re), r("selection", ct.cloneDeep(b));
    }
    function K(L, re) {
      r("expandChange", L, re);
    }
    function te(L, re = !1) {
      const ne = b.findIndex((we) => we[i.rowKey] === L[i.rowKey]);
      re ? ne >= 0 && b.splice(ne, 1) : ne < 0 && b.push(L);
    }
    function De(L, re = !1) {
      L && L.length && L.map((ne) => {
        te(
          b.find((we) => we[i.rowKey] === ne[i.rowKey]),
          !re
        );
      }), Mn();
    }
    function Pt() {
      b.splice(0, b.length, ...i.selectList);
    }
    async function nt() {
      var re, ne, we;
      let L = {
        // 封装查询条件
        // ...route.query,
        // ...tableHeaderRef.value.getData(),
        ...U.value,
        ...typeof i.tableConfig.queryMap == "function" ? await i.tableConfig.queryMap() : i.tableConfig.queryMap,
        t_: (/* @__PURE__ */ new Date()).getTime()
      };
      return i.isPager && (L.current = k.current, L.size = k.size), i.tableConfig.tabConf && i.tableConfig.tabConf.prop && (L[i.tableConfig.tabConf.prop] = d.value), L = Re(L), i.isDialog, (we = (ne = (re = i.tableConfig) == null ? void 0 : re.toolbar) == null ? void 0 : ne.export) != null && we.isAuth, L;
    }
    function Re(L) {
      if (!L)
        return {};
      const re = {};
      return Object.keys(L).map((ne) => {
        L[ne] !== void 0 && L[ne] !== null && L[ne] !== "" && (re[ne] = L[ne]);
      }), re;
    }
    function me(L) {
      k.current = 1, k.size = L, Tt(!0);
    }
    function tl(L) {
      k.current !== L && (k.current = L, Tt(!1));
    }
    function mn(L, re) {
      let ne = [];
      L && L.length > 0 && L.map((we, st) => {
        B.push([...re, st]), ne = we[pe.children], ne && ne.length > 0 && mn(ne, [st]);
      });
    }
    async function Tt(L) {
      var we, st, dt, lt, $e, Lt;
      if (!i.tableConfig.fetch)
        return ie.value = 2, !1;
      if (ie.value === 1 || A.value)
        return !1;
      ie.value = 1, A.value = !0, F.splice(0, F.length), L && (k.current = 1);
      let re = await nt();
      (dt = (st = (we = i.tableConfig) == null ? void 0 : we.toolbar) == null ? void 0 : st.formConfig) != null && dt.beforeRequest && (re = ((Lt = ($e = (lt = i.tableConfig) == null ? void 0 : lt.toolbar) == null ? void 0 : $e.formConfig) == null ? void 0 : Lt.beforeRequest(JSON.parse(JSON.stringify(re)))) || re);
      const ne = await i.tableConfig.fetch(re);
      try {
        i.isPager ? (k.total = (ne == null ? void 0 : ne.total) * 1 || 0, k.current = (ne == null ? void 0 : ne.current) || 1, F.push(...(ne == null ? void 0 : ne.records) || null)) : F.push(...(ne == null ? void 0 : ne.records) || ne || null), i.type === "expand" && (B.splice(0, B.length), mn(F, [])), C.value = !1, Ut(() => {
          Mn();
        });
      } catch (Gt) {
        console.log("error: ", Gt);
      }
      ie.value = 2, A.value = !1;
    }
    function Mn() {
      F && F.length > 0 && i.type === "selection" && F.map((L) => {
        _.value.toggleRowSelection(
          L,
          b.some((re) => re[i.rowKey] === L[i.rowKey])
        );
      });
    }
    async function Bn(L = !1) {
      return await Tt(!0), !L && i.tableConfig.tabConf && i.tableConfig.tabConf.fetch && (g.value = await i.tableConfig.tabConf.fetch(Object.assign({}, await nt(), i.tableConfig.tabConf.queryMap)), h.value = !1), F;
    }
    function In() {
      U.value = ct.cloneDeep(D.value.getData()), Bn();
    }
    return Ve(
      () => i.modelValue,
      (L) => {
        i.tableConfig.fetch || JSON.parse(JSON.stringify(L)) !== JSON.parse(JSON.stringify(F)) && (ie.value = 2, F.splice(0, F.length, ...L || []));
      },
      { deep: !0 }
    ), Ve(
      () => i.selectList,
      (L) => {
        b.splice(0, b.length, ...L), Mn();
      },
      {
        deep: !0
      }
    ), _n(() => {
      Bn();
    }), s({ reload: Bn, tableData: F, changeSelect: De, resetSelect: Pt }), (L, re) => {
      var kn;
      const ne = V("el-icon"), we = V("el-radio-button"), st = V("el-radio-group"), dt = V("el-table-column"), lt = V("el-empty"), $e = V("el-table"), Lt = V("el-pagination"), Gt = Jp("loading");
      return m(), Q("div", qy, [
        de(Gy, {
          ref_key: "tableHeaderRef",
          ref: D,
          modelValue: Qt(W),
          "onUpdate:modelValue": re[0] || (re[0] = (je) => ys(W) ? W.value = je : W = je),
          tbName: i.tableConfig.tbName,
          column: i.tableConfig.column,
          size: Qt(S),
          isShowRefresh: L.isShowRefresh,
          loading: A.value,
          toolbar: L.tableConfig.toolbar,
          isDialog: L.isDialog,
          onQuery: In
        }, null, 8, ["modelValue", "tbName", "column", "size", "isShowRefresh", "loading", "toolbar", "isDialog"]),
        L.tableConfig.tabConf ? (m(), Q("div", Jy, [
          de(st, {
            modelValue: d.value,
            "onUpdate:modelValue": re[1] || (re[1] = (je) => d.value = je),
            size: "default",
            onChange: Yt
          }, {
            default: G(() => {
              var je;
              return [
                (m(!0), Q(Ae, null, ve((je = L.tableConfig.tabConf) == null ? void 0 : je.tabs, (rt, We) => (m(), Z(we, {
                  key: We,
                  label: rt.value,
                  loading: !0
                }, {
                  default: G(() => [
                    Ke(Oe(rt.label) + " ", 1),
                    h.value ? (m(), Z(ne, {
                      key: 0,
                      class: "is-loading"
                    }, {
                      default: G(() => [
                        de(Qt(y2))
                      ]),
                      _: 1
                    })) : (m(), Q(Ae, { key: 1 }, [
                      Ke(Oe(c.value(rt)), 1)
                    ], 64))
                  ]),
                  _: 2
                }, 1032, ["label"]))), 128))
              ];
            }),
            _: 1
          }, 8, ["modelValue"])
        ])) : ce("", !0),
        $p((m(), Q("div", $y, [
          L.isDIYMain ? Je(L.$slots, "main", {
            key: 0,
            tableData: F
          }) : (m(), Z($e, ee({
            key: 1,
            ref_key: "elPlusTableRef",
            ref: _,
            style: { width: "100%" },
            height: "100%",
            maxHeight: L.tableConfig.maxHeight || "auto"
          }, L.tableConfig.tableAttr, {
            data: F,
            "row-key": L.rowKey,
            lazy: "",
            load: sn,
            size: Qt(S),
            "row-class-name": an,
            onSelect: w,
            onSelectAll: T,
            onExpandChange: K,
            treeProps: Qt(pe)
          }), qt({
            default: G(() => [
              L.type === "selection" ? (m(), Z(dt, {
                key: 0,
                type: "selection",
                width: "55px",
                selectable: (je, rt) => {
                  var We, pt;
                  return ((pt = (We = L.tableConfig) == null ? void 0 : We.tableAttr) == null ? void 0 : pt.selectable(je, rt)) ?? !0;
                },
                "header-align": "center",
                align: "center"
              }, null, 8, ["selectable"])) : ce("", !0),
              L.isIndex ? (m(), Z(dt, {
                key: 1,
                type: "index",
                width: "60",
                label: "序号"
              })) : ce("", !0),
              Yn().firstColumn ? Je(L.$slots, "firstColumn", { key: 2 }) : ce("", !0),
              (m(!0), Q(Ae, null, ve(X, (je, rt) => (m(), Q(Ae, {
                key: je.label + rt
              }, [
                je.children && je.children.length > 0 ? (m(), Q(Ae, { key: 0 }, [], 64)) : (m(), Q(Ae, { key: 1 }, [
                  Se.value[rt] ? (m(), Z(dt, ee({
                    key: 0,
                    prop: je.prop
                  }, je), {
                    header: G(({ column: We }) => [
                      Ue("div", {
                        class: el({ "th-required": je.required }),
                        style: _t(je.hstyle)
                      }, Oe(We.label), 7)
                    ]),
                    default: G((We) => [
                      We.$index >= 0 ? (m(), Z(Ky, {
                        key: 0,
                        field: je.prop,
                        desc: je,
                        scope: We,
                        size: Qt(S),
                        modelValue: We.row[je.prop],
                        "onUpdate:modelValue": (pt) => We.row[je.prop] = pt
                      }, null, 8, ["field", "desc", "scope", "size", "modelValue", "onUpdate:modelValue"])) : ce("", !0)
                    ]),
                    _: 2
                  }, 1040, ["prop"])) : ce("", !0)
                ], 64))
              ], 64))), 128))
            ]),
            _: 2
          }, [
            !A.value && ie.value === 2 ? {
              name: "empty",
              fn: G(() => [
                L.isEmptyImg ? (m(), Z(lt, {
                  key: 0,
                  description: L.nullText
                }, null, 8, ["description"])) : (m(), Q("span", Xy, Oe(L.nullText), 1))
              ]),
              key: "0"
            } : void 0,
            (kn = L.tableConfig.summaryConf) != null && kn.prop ? {
              name: "append",
              fn: G(() => {
                var je;
                return [
                  qe.value && qe.value.length > 0 ? (m(), Q("div", {
                    key: 0,
                    style: _t((je = L.tableConfig.summaryConf) == null ? void 0 : je.hstyle),
                    class: "summary-row"
                  }, [
                    (m(!0), Q(Ae, null, ve(qe.value, (rt, We) => (m(), Q("div", {
                      class: "summary-item",
                      key: We
                    }, [
                      Ue("span", null, Oe(rt.label || "合计") + ":", 1),
                      Ue("p", null, Oe(rt.value || 0), 1)
                    ]))), 128))
                  ], 4)) : ce("", !0)
                ];
              }),
              key: "1"
            } : void 0
          ]), 1040, ["maxHeight", "data", "row-key", "size", "treeProps"]))
        ])), [
          [Gt, A.value]
        ]),
        L.isPager || L.tableConfig.statistic ? (m(), Q("div", eD, [
          de(Lt, {
            class: "page-info",
            small: "",
            onSizeChange: me,
            onCurrentChange: tl,
            "current-page": +k.current,
            "page-sizes": [5, 10, 20, 50, 100],
            "page-size": k.size,
            layout: "total, sizes, prev, pager, next, jumper",
            total: k.total
          }, null, 8, ["current-page", "page-size", "total"])
        ])) : ce("", !0),
        Je(L.$slots, "bottom")
      ]);
    };
  }
});
const _l = {
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
    }
  },
  upload: {
    type: "minio",
    action: "",
    maxISize: 1024 * 1024 * 20,
    maxFSize: 1024 * 1024 * 20,
    minio: {
      action: "",
      getUploadUrl: () => {
      },
      doElUpload: () => {
      },
      getObjectAuthUrl: () => {
      }
    }
  }
}, uD = {
  install: (N, s, r, i) => {
    Object.assign(_l, s), _l.debug && console.log("initConfig: ", _l), N.provide("format", r), N.provide("globalData", i), N.provide("defaultConf", _l), Xn.unshift(Su), Xn.unshift(vy), Xn.unshift(Ey), Xn.push(nD), _l.debug && console.log("components: ", Xn), Xn.map((z) => {
      N.component(z.name, z);
    });
  }
};
export {
  uD as default
};
