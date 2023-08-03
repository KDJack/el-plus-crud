import { defineComponent as fe, inject as We, ref as h, onBeforeMount as be, useAttrs as Te, onMounted as cn, resolveComponent as F, openBlock as _, createBlock as R, mergeProps as ne, toHandlers as Le, createCommentVNode as Me, useSlots as Mn, createSlots as en, withCtx as U, renderSlot as $e, renderList as we, computed as Ae, watch as He, createVNode as ie, createTextVNode as Be, toDisplayString as Ce, createElementBlock as V, normalizeStyle as yt, Fragment as Ye, createElementVNode as Ie, reactive as lt, normalizeClass as bn, unref as zt, pushScopeId as hi, popScopeId as Yi, nextTick as Xt, withModifiers as tj, resolveDynamicComponent as vi, normalizeProps as nj, resolveDirective as lj, isRef as rj, withDirectives as uj } from "vue";
import { ElMessageBox as oj, ElMessage as Wn } from "element-plus";
const Oe = async (f, s) => {
  var o, D, p, m;
  const r = Object.assign({}, s, (o = f.desc) == null ? void 0 : o._attrs, (D = f.desc) == null ? void 0 : D.attrs, sj(f.desc));
  return f.desc.multiple && (r.multiple = !0, r.showCheckbox = !0, ["select"].indexOf(f.desc.type) >= 0 && (r.collapseTags = ((p = f.desc.attrs) == null ? void 0 : p.collapseTags) ?? !1, r.collapseTagsTooltip = ((m = f.desc.attrs) == null ? void 0 : m.collapseTagsTooltip) ?? !1)), f.desc.elType && (typeof f.desc.elType == "function" ? r.type = f.desc.elType(f.formData) : r.type = f.desc.elType), r;
}, ke = (f) => {
  var r;
  const s = {};
  return (r = f.desc) != null && r.on && Object.keys(f.desc.on).map((o) => {
    s[o] = (D) => {
      f.desc.on[o](f.formData, f.rowIndex, D);
    };
  }), s;
};
function sj(f) {
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
const ij = {
  name: "ElPlusFormArea",
  inheritAttrs: !1,
  typeName: "area",
  customOptions: {}
}, aj = /* @__PURE__ */ fe({
  ...ij,
  props: {
    modelValue: {},
    field: {},
    desc: {},
    formData: {}
  },
  emits: ["update:modelValue"],
  setup(f, { emit: s }) {
    const r = f, o = We("globalData"), D = h([]), p = h({}), m = h(!1), N = h(ke(r)), d = h(r.modelValue);
    return s("update:modelValue", d), be(async () => {
      p.value = await Oe(r, { props: { value: "id", label: "name", children: "childs", checkStrictly: !!r.desc.checkStrictly }, clearable: !0, filterable: !0, ...Te() }), m.value = !0;
    }), cn(async () => {
      D.value = o.areaList || [];
    }), (M, z) => {
      const Y = F("el-cascader");
      return m.value ? (_(), R(Y, ne({
        key: 0,
        class: "ElPlusFormArea-panel"
      }, p.value, Le(N.value), {
        modelValue: d.value,
        "onUpdate:modelValue": z[0] || (z[0] = (b) => d.value = b),
        options: D.value
      }), null, 16, ["modelValue", "options"])) : Me("", !0);
    };
  }
});
const Ge = (f, s) => {
  const r = f.__vccOpts || f;
  for (const [o, D] of s)
    r[o] = D;
  return r;
}, Ii = /* @__PURE__ */ Ge(aj, [["__scopeId", "data-v-2f7bbae6"]]), cj = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: Ii }, Symbol.toStringTag, { value: "Module" })), Mj = {
  name: "ElPlusFormAutocomplete",
  inheritAttrs: !1,
  typeName: "autocomplete",
  customOptions: {}
}, fj = /* @__PURE__ */ fe({
  ...Mj,
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
    const D = h(Object.assign({}, Mn(), r.desc.slots)), p = h({}), m = h(ke(r));
    return be(async () => {
      p.value = await Oe(r, { autocomplete: "new-password", ...Te() });
    }), (N, d) => {
      const M = F("el-autocomplete");
      return _(), R(M, ne({ class: "ElPlusFormAutocomplete-panel" }, p.value, Le(m.value), {
        modelValue: o.value,
        "onUpdate:modelValue": d[0] || (d[0] = (z) => o.value = z)
      }), en({
        default: U((z) => [
          $e(N.$slots, "default", { data: z }, void 0, !0)
        ]),
        _: 2
      }, [
        we(D.value, (z, Y, b) => ({
          name: Y,
          fn: U((E) => [
            $e(N.$slots, Y, { data: E }, void 0, !0)
          ])
        }))
      ]), 1040, ["modelValue"]);
    };
  }
});
const wi = /* @__PURE__ */ Ge(fj, [["__scopeId", "data-v-9a2a6259"]]), dj = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: wi }, Symbol.toStringTag, { value: "Module" }));
var vl = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, jr = { exports: {} };
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
    var r, o = "4.17.21", D = 200, p = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", m = "Expected a function", N = "Invalid `variable` option passed into `_.template`", d = "__lodash_hash_undefined__", M = 500, z = "__lodash_placeholder__", Y = 1, b = 2, E = 4, x = 1, Q = 2, B = 1, K = 2, ue = 4, me = 8, te = 16, w = 32, P = 64, k = 128, ge = 256, Ue = 512, Ke = 30, _t = "...", vt = 800, tn = 16, nn = 1, dt = 2, Wt = 3, I = 1 / 0, L = 9007199254740991, J = 17976931348623157e292, ae = 0 / 0, De = 4294967295, G = De - 1, X = De >>> 1, ee = [
      ["ary", k],
      ["bind", B],
      ["bindKey", K],
      ["curry", me],
      ["curryRight", te],
      ["flip", Ue],
      ["partial", w],
      ["partialRight", P],
      ["rearg", ge]
    ], q = "[object Arguments]", je = "[object Array]", it = "[object AsyncFunction]", rt = "[object Boolean]", Gt = "[object Date]", Gn = "[object DOMException]", Zt = "[object Error]", fn = "[object Function]", On = "[object GeneratorFunction]", gt = "[object Map]", ln = "[object Number]", A = "[object Null]", Z = "[object Object]", le = "[object Promise]", Xe = "[object Proxy]", ut = "[object RegExp]", Ve = "[object Set]", ct = "[object String]", St = "[object Symbol]", hn = "[object Undefined]", Ht = "[object WeakMap]", Zn = "[object WeakSet]", rn = "[object ArrayBuffer]", ze = "[object DataView]", et = "[object Float32Array]", Nt = "[object Float64Array]", Qe = "[object Int8Array]", un = "[object Int16Array]", Yn = "[object Int32Array]", al = "[object Uint8Array]", zr = "[object Uint8ClampedArray]", yr = "[object Uint16Array]", Dr = "[object Uint32Array]", _a = /\b__p \+= '';/g, ma = /\b(__p \+=) '' \+/g, ha = /(__e\(.*?\)|\b__t\)) \+\n'';/g, ku = /&(?:amp|lt|gt|quot|#39);/g, Uu = /[&<>"']/g, Ya = RegExp(ku.source), va = RegExp(Uu.source), Ia = /<%-([\s\S]+?)%>/g, wa = /<%([\s\S]+?)%>/g, Qu = /<%=([\s\S]+?)%>/g, Aa = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Ta = /^\w*$/, La = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, _r = /[\\^$.*+?()[\]{}|]/g, xa = RegExp(_r.source), mr = /^\s+/, Ea = /\s/, Ca = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, ba = /\{\n\/\* \[wrapped with (.+)\] \*/, Oa = /,? & /, Sa = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, Ba = /[()=,{}\[\]\/\s]/, ka = /\\(\\)?/g, Ua = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, Pu = /\w*$/, Qa = /^[-+]0x[0-9a-f]+$/i, Pa = /^0b[01]+$/i, Va = /^\[object .+?Constructor\]$/, Fa = /^0o[0-7]+$/i, Ra = /^(?:0|[1-9]\d*)$/, Wa = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, Tl = /($^)/, Ga = /['\n\r\u2028\u2029\\]/g, Ll = "\\ud800-\\udfff", Za = "\\u0300-\\u036f", Ha = "\\ufe20-\\ufe2f", Ka = "\\u20d0-\\u20ff", Vu = Za + Ha + Ka, Fu = "\\u2700-\\u27bf", Ru = "a-z\\xdf-\\xf6\\xf8-\\xff", qa = "\\xac\\xb1\\xd7\\xf7", $a = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", Ja = "\\u2000-\\u206f", Xa = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", Wu = "A-Z\\xc0-\\xd6\\xd8-\\xde", Gu = "\\ufe0e\\ufe0f", Zu = qa + $a + Ja + Xa, hr = "['’]", ec = "[" + Ll + "]", Hu = "[" + Zu + "]", xl = "[" + Vu + "]", Ku = "\\d+", tc = "[" + Fu + "]", qu = "[" + Ru + "]", $u = "[^" + Ll + Zu + Ku + Fu + Ru + Wu + "]", Yr = "\\ud83c[\\udffb-\\udfff]", nc = "(?:" + xl + "|" + Yr + ")", Ju = "[^" + Ll + "]", vr = "(?:\\ud83c[\\udde6-\\uddff]){2}", Ir = "[\\ud800-\\udbff][\\udc00-\\udfff]", Hn = "[" + Wu + "]", Xu = "\\u200d", eo = "(?:" + qu + "|" + $u + ")", lc = "(?:" + Hn + "|" + $u + ")", to = "(?:" + hr + "(?:d|ll|m|re|s|t|ve))?", no = "(?:" + hr + "(?:D|LL|M|RE|S|T|VE))?", lo = nc + "?", ro = "[" + Gu + "]?", rc = "(?:" + Xu + "(?:" + [Ju, vr, Ir].join("|") + ")" + ro + lo + ")*", uc = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", oc = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", uo = ro + lo + rc, sc = "(?:" + [tc, vr, Ir].join("|") + ")" + uo, ic = "(?:" + [Ju + xl + "?", xl, vr, Ir, ec].join("|") + ")", ac = RegExp(hr, "g"), cc = RegExp(xl, "g"), wr = RegExp(Yr + "(?=" + Yr + ")|" + ic + uo, "g"), Mc = RegExp([
      Hn + "?" + qu + "+" + to + "(?=" + [Hu, Hn, "$"].join("|") + ")",
      lc + "+" + no + "(?=" + [Hu, Hn + eo, "$"].join("|") + ")",
      Hn + "?" + eo + "+" + to,
      Hn + "+" + no,
      oc,
      uc,
      Ku,
      sc
    ].join("|"), "g"), fc = RegExp("[" + Xu + Ll + Vu + Gu + "]"), dc = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, gc = [
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
    ], Nc = -1, Re = {};
    Re[et] = Re[Nt] = Re[Qe] = Re[un] = Re[Yn] = Re[al] = Re[zr] = Re[yr] = Re[Dr] = !0, Re[q] = Re[je] = Re[rn] = Re[rt] = Re[ze] = Re[Gt] = Re[Zt] = Re[fn] = Re[gt] = Re[ln] = Re[Z] = Re[ut] = Re[Ve] = Re[ct] = Re[Ht] = !1;
    var Fe = {};
    Fe[q] = Fe[je] = Fe[rn] = Fe[ze] = Fe[rt] = Fe[Gt] = Fe[et] = Fe[Nt] = Fe[Qe] = Fe[un] = Fe[Yn] = Fe[gt] = Fe[ln] = Fe[Z] = Fe[ut] = Fe[Ve] = Fe[ct] = Fe[St] = Fe[al] = Fe[zr] = Fe[yr] = Fe[Dr] = !0, Fe[Zt] = Fe[fn] = Fe[Ht] = !1;
    var pc = {
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
    }, jc = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }, zc = {
      "&amp;": "&",
      "&lt;": "<",
      "&gt;": ">",
      "&quot;": '"',
      "&#39;": "'"
    }, yc = {
      "\\": "\\",
      "'": "'",
      "\n": "n",
      "\r": "r",
      "\u2028": "u2028",
      "\u2029": "u2029"
    }, Dc = parseFloat, _c = parseInt, oo = typeof vl == "object" && vl && vl.Object === Object && vl, mc = typeof self == "object" && self && self.Object === Object && self, Mt = oo || mc || Function("return this")(), Ar = s && !s.nodeType && s, Sn = Ar && !0 && f && !f.nodeType && f, so = Sn && Sn.exports === Ar, Tr = so && oo.process, Bt = function() {
      try {
        var j = Sn && Sn.require && Sn.require("util").types;
        return j || Tr && Tr.binding && Tr.binding("util");
      } catch {
      }
    }(), io = Bt && Bt.isArrayBuffer, ao = Bt && Bt.isDate, co = Bt && Bt.isMap, Mo = Bt && Bt.isRegExp, fo = Bt && Bt.isSet, go = Bt && Bt.isTypedArray;
    function Lt(j, T, v) {
      switch (v.length) {
        case 0:
          return j.call(T);
        case 1:
          return j.call(T, v[0]);
        case 2:
          return j.call(T, v[0], v[1]);
        case 3:
          return j.call(T, v[0], v[1], v[2]);
      }
      return j.apply(T, v);
    }
    function hc(j, T, v, H) {
      for (var ce = -1, xe = j == null ? 0 : j.length; ++ce < xe; ) {
        var ot = j[ce];
        T(H, ot, v(ot), j);
      }
      return H;
    }
    function kt(j, T) {
      for (var v = -1, H = j == null ? 0 : j.length; ++v < H && T(j[v], v, j) !== !1; )
        ;
      return j;
    }
    function Yc(j, T) {
      for (var v = j == null ? 0 : j.length; v-- && T(j[v], v, j) !== !1; )
        ;
      return j;
    }
    function No(j, T) {
      for (var v = -1, H = j == null ? 0 : j.length; ++v < H; )
        if (!T(j[v], v, j))
          return !1;
      return !0;
    }
    function vn(j, T) {
      for (var v = -1, H = j == null ? 0 : j.length, ce = 0, xe = []; ++v < H; ) {
        var ot = j[v];
        T(ot, v, j) && (xe[ce++] = ot);
      }
      return xe;
    }
    function El(j, T) {
      var v = j == null ? 0 : j.length;
      return !!v && Kn(j, T, 0) > -1;
    }
    function Lr(j, T, v) {
      for (var H = -1, ce = j == null ? 0 : j.length; ++H < ce; )
        if (v(T, j[H]))
          return !0;
      return !1;
    }
    function Ze(j, T) {
      for (var v = -1, H = j == null ? 0 : j.length, ce = Array(H); ++v < H; )
        ce[v] = T(j[v], v, j);
      return ce;
    }
    function In(j, T) {
      for (var v = -1, H = T.length, ce = j.length; ++v < H; )
        j[ce + v] = T[v];
      return j;
    }
    function xr(j, T, v, H) {
      var ce = -1, xe = j == null ? 0 : j.length;
      for (H && xe && (v = j[++ce]); ++ce < xe; )
        v = T(v, j[ce], ce, j);
      return v;
    }
    function vc(j, T, v, H) {
      var ce = j == null ? 0 : j.length;
      for (H && ce && (v = j[--ce]); ce--; )
        v = T(v, j[ce], ce, j);
      return v;
    }
    function Er(j, T) {
      for (var v = -1, H = j == null ? 0 : j.length; ++v < H; )
        if (T(j[v], v, j))
          return !0;
      return !1;
    }
    var Ic = Cr("length");
    function wc(j) {
      return j.split("");
    }
    function Ac(j) {
      return j.match(Sa) || [];
    }
    function po(j, T, v) {
      var H;
      return v(j, function(ce, xe, ot) {
        if (T(ce, xe, ot))
          return H = xe, !1;
      }), H;
    }
    function Cl(j, T, v, H) {
      for (var ce = j.length, xe = v + (H ? 1 : -1); H ? xe-- : ++xe < ce; )
        if (T(j[xe], xe, j))
          return xe;
      return -1;
    }
    function Kn(j, T, v) {
      return T === T ? Qc(j, T, v) : Cl(j, jo, v);
    }
    function Tc(j, T, v, H) {
      for (var ce = v - 1, xe = j.length; ++ce < xe; )
        if (H(j[ce], T))
          return ce;
      return -1;
    }
    function jo(j) {
      return j !== j;
    }
    function zo(j, T) {
      var v = j == null ? 0 : j.length;
      return v ? Or(j, T) / v : ae;
    }
    function Cr(j) {
      return function(T) {
        return T == null ? r : T[j];
      };
    }
    function br(j) {
      return function(T) {
        return j == null ? r : j[T];
      };
    }
    function yo(j, T, v, H, ce) {
      return ce(j, function(xe, ot, Pe) {
        v = H ? (H = !1, xe) : T(v, xe, ot, Pe);
      }), v;
    }
    function Lc(j, T) {
      var v = j.length;
      for (j.sort(T); v--; )
        j[v] = j[v].value;
      return j;
    }
    function Or(j, T) {
      for (var v, H = -1, ce = j.length; ++H < ce; ) {
        var xe = T(j[H]);
        xe !== r && (v = v === r ? xe : v + xe);
      }
      return v;
    }
    function Sr(j, T) {
      for (var v = -1, H = Array(j); ++v < j; )
        H[v] = T(v);
      return H;
    }
    function xc(j, T) {
      return Ze(T, function(v) {
        return [v, j[v]];
      });
    }
    function Do(j) {
      return j && j.slice(0, Yo(j) + 1).replace(mr, "");
    }
    function xt(j) {
      return function(T) {
        return j(T);
      };
    }
    function Br(j, T) {
      return Ze(T, function(v) {
        return j[v];
      });
    }
    function cl(j, T) {
      return j.has(T);
    }
    function _o(j, T) {
      for (var v = -1, H = j.length; ++v < H && Kn(T, j[v], 0) > -1; )
        ;
      return v;
    }
    function mo(j, T) {
      for (var v = j.length; v-- && Kn(T, j[v], 0) > -1; )
        ;
      return v;
    }
    function Ec(j, T) {
      for (var v = j.length, H = 0; v--; )
        j[v] === T && ++H;
      return H;
    }
    var Cc = br(pc), bc = br(jc);
    function Oc(j) {
      return "\\" + yc[j];
    }
    function Sc(j, T) {
      return j == null ? r : j[T];
    }
    function qn(j) {
      return fc.test(j);
    }
    function Bc(j) {
      return dc.test(j);
    }
    function kc(j) {
      for (var T, v = []; !(T = j.next()).done; )
        v.push(T.value);
      return v;
    }
    function kr(j) {
      var T = -1, v = Array(j.size);
      return j.forEach(function(H, ce) {
        v[++T] = [ce, H];
      }), v;
    }
    function ho(j, T) {
      return function(v) {
        return j(T(v));
      };
    }
    function wn(j, T) {
      for (var v = -1, H = j.length, ce = 0, xe = []; ++v < H; ) {
        var ot = j[v];
        (ot === T || ot === z) && (j[v] = z, xe[ce++] = v);
      }
      return xe;
    }
    function bl(j) {
      var T = -1, v = Array(j.size);
      return j.forEach(function(H) {
        v[++T] = H;
      }), v;
    }
    function Uc(j) {
      var T = -1, v = Array(j.size);
      return j.forEach(function(H) {
        v[++T] = [H, H];
      }), v;
    }
    function Qc(j, T, v) {
      for (var H = v - 1, ce = j.length; ++H < ce; )
        if (j[H] === T)
          return H;
      return -1;
    }
    function Pc(j, T, v) {
      for (var H = v + 1; H--; )
        if (j[H] === T)
          return H;
      return H;
    }
    function $n(j) {
      return qn(j) ? Fc(j) : Ic(j);
    }
    function Kt(j) {
      return qn(j) ? Rc(j) : wc(j);
    }
    function Yo(j) {
      for (var T = j.length; T-- && Ea.test(j.charAt(T)); )
        ;
      return T;
    }
    var Vc = br(zc);
    function Fc(j) {
      for (var T = wr.lastIndex = 0; wr.test(j); )
        ++T;
      return T;
    }
    function Rc(j) {
      return j.match(wr) || [];
    }
    function Wc(j) {
      return j.match(Mc) || [];
    }
    var Gc = function j(T) {
      T = T == null ? Mt : Jn.defaults(Mt.Object(), T, Jn.pick(Mt, gc));
      var v = T.Array, H = T.Date, ce = T.Error, xe = T.Function, ot = T.Math, Pe = T.Object, Ur = T.RegExp, Zc = T.String, Ut = T.TypeError, Ol = v.prototype, Hc = xe.prototype, Xn = Pe.prototype, Sl = T["__core-js_shared__"], Bl = Hc.toString, Se = Xn.hasOwnProperty, Kc = 0, vo = function() {
        var e = /[^.]+$/.exec(Sl && Sl.keys && Sl.keys.IE_PROTO || "");
        return e ? "Symbol(src)_1." + e : "";
      }(), kl = Xn.toString, qc = Bl.call(Pe), $c = Mt._, Jc = Ur(
        "^" + Bl.call(Se).replace(_r, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
      ), Ul = so ? T.Buffer : r, An = T.Symbol, Ql = T.Uint8Array, Io = Ul ? Ul.allocUnsafe : r, Pl = ho(Pe.getPrototypeOf, Pe), wo = Pe.create, Ao = Xn.propertyIsEnumerable, Vl = Ol.splice, To = An ? An.isConcatSpreadable : r, Ml = An ? An.iterator : r, Bn = An ? An.toStringTag : r, Fl = function() {
        try {
          var e = Vn(Pe, "defineProperty");
          return e({}, "", {}), e;
        } catch {
        }
      }(), Xc = T.clearTimeout !== Mt.clearTimeout && T.clearTimeout, eM = H && H.now !== Mt.Date.now && H.now, tM = T.setTimeout !== Mt.setTimeout && T.setTimeout, Rl = ot.ceil, Wl = ot.floor, Qr = Pe.getOwnPropertySymbols, nM = Ul ? Ul.isBuffer : r, Lo = T.isFinite, lM = Ol.join, rM = ho(Pe.keys, Pe), st = ot.max, pt = ot.min, uM = H.now, oM = T.parseInt, xo = ot.random, sM = Ol.reverse, Pr = Vn(T, "DataView"), fl = Vn(T, "Map"), Vr = Vn(T, "Promise"), el = Vn(T, "Set"), dl = Vn(T, "WeakMap"), gl = Vn(Pe, "create"), Gl = dl && new dl(), tl = {}, iM = Fn(Pr), aM = Fn(fl), cM = Fn(Vr), MM = Fn(el), fM = Fn(dl), Zl = An ? An.prototype : r, Nl = Zl ? Zl.valueOf : r, Eo = Zl ? Zl.toString : r;
      function i(e) {
        if (Je(e) && !de(e) && !(e instanceof he)) {
          if (e instanceof Qt)
            return e;
          if (Se.call(e, "__wrapped__"))
            return Cs(e);
        }
        return new Qt(e);
      }
      var nl = function() {
        function e() {
        }
        return function(t) {
          if (!qe(t))
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
      function Qt(e, t) {
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
        evaluate: wa,
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
      }, i.prototype = Hl.prototype, i.prototype.constructor = i, Qt.prototype = nl(Hl.prototype), Qt.prototype.constructor = Qt;
      function he(e) {
        this.__wrapped__ = e, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = !1, this.__iteratees__ = [], this.__takeCount__ = De, this.__views__ = [];
      }
      function dM() {
        var e = new he(this.__wrapped__);
        return e.__actions__ = It(this.__actions__), e.__dir__ = this.__dir__, e.__filtered__ = this.__filtered__, e.__iteratees__ = It(this.__iteratees__), e.__takeCount__ = this.__takeCount__, e.__views__ = It(this.__views__), e;
      }
      function gM() {
        if (this.__filtered__) {
          var e = new he(this);
          e.__dir__ = -1, e.__filtered__ = !0;
        } else
          e = this.clone(), e.__dir__ *= -1;
        return e;
      }
      function NM() {
        var e = this.__wrapped__.value(), t = this.__dir__, n = de(e), l = t < 0, u = n ? e.length : 0, a = Af(0, u, this.__views__), c = a.start, g = a.end, y = g - c, C = l ? g : c - 1, O = this.__iteratees__, S = O.length, W = 0, $ = pt(y, this.__takeCount__);
        if (!n || !l && u == y && $ == y)
          return ns(e, this.__actions__);
        var oe = [];
        e:
          for (; y-- && W < $; ) {
            C += t;
            for (var pe = -1, se = e[C]; ++pe < S; ) {
              var _e = O[pe], ve = _e.iteratee, bt = _e.type, Yt = ve(se);
              if (bt == dt)
                se = Yt;
              else if (!Yt) {
                if (bt == nn)
                  continue e;
                break e;
              }
            }
            oe[W++] = se;
          }
        return oe;
      }
      he.prototype = nl(Hl.prototype), he.prototype.constructor = he;
      function kn(e) {
        var t = -1, n = e == null ? 0 : e.length;
        for (this.clear(); ++t < n; ) {
          var l = e[t];
          this.set(l[0], l[1]);
        }
      }
      function pM() {
        this.__data__ = gl ? gl(null) : {}, this.size = 0;
      }
      function jM(e) {
        var t = this.has(e) && delete this.__data__[e];
        return this.size -= t ? 1 : 0, t;
      }
      function zM(e) {
        var t = this.__data__;
        if (gl) {
          var n = t[e];
          return n === d ? r : n;
        }
        return Se.call(t, e) ? t[e] : r;
      }
      function yM(e) {
        var t = this.__data__;
        return gl ? t[e] !== r : Se.call(t, e);
      }
      function DM(e, t) {
        var n = this.__data__;
        return this.size += this.has(e) ? 0 : 1, n[e] = gl && t === r ? d : t, this;
      }
      kn.prototype.clear = pM, kn.prototype.delete = jM, kn.prototype.get = zM, kn.prototype.has = yM, kn.prototype.set = DM;
      function dn(e) {
        var t = -1, n = e == null ? 0 : e.length;
        for (this.clear(); ++t < n; ) {
          var l = e[t];
          this.set(l[0], l[1]);
        }
      }
      function _M() {
        this.__data__ = [], this.size = 0;
      }
      function mM(e) {
        var t = this.__data__, n = Kl(t, e);
        if (n < 0)
          return !1;
        var l = t.length - 1;
        return n == l ? t.pop() : Vl.call(t, n, 1), --this.size, !0;
      }
      function hM(e) {
        var t = this.__data__, n = Kl(t, e);
        return n < 0 ? r : t[n][1];
      }
      function YM(e) {
        return Kl(this.__data__, e) > -1;
      }
      function vM(e, t) {
        var n = this.__data__, l = Kl(n, e);
        return l < 0 ? (++this.size, n.push([e, t])) : n[l][1] = t, this;
      }
      dn.prototype.clear = _M, dn.prototype.delete = mM, dn.prototype.get = hM, dn.prototype.has = YM, dn.prototype.set = vM;
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
          map: new (fl || dn)(),
          string: new kn()
        };
      }
      function wM(e) {
        var t = sr(this, e).delete(e);
        return this.size -= t ? 1 : 0, t;
      }
      function AM(e) {
        return sr(this, e).get(e);
      }
      function TM(e) {
        return sr(this, e).has(e);
      }
      function LM(e, t) {
        var n = sr(this, e), l = n.size;
        return n.set(e, t), this.size += n.size == l ? 0 : 1, this;
      }
      gn.prototype.clear = IM, gn.prototype.delete = wM, gn.prototype.get = AM, gn.prototype.has = TM, gn.prototype.set = LM;
      function Un(e) {
        var t = -1, n = e == null ? 0 : e.length;
        for (this.__data__ = new gn(); ++t < n; )
          this.add(e[t]);
      }
      function xM(e) {
        return this.__data__.set(e, d), this;
      }
      function EM(e) {
        return this.__data__.has(e);
      }
      Un.prototype.add = Un.prototype.push = xM, Un.prototype.has = EM;
      function qt(e) {
        var t = this.__data__ = new dn(e);
        this.size = t.size;
      }
      function CM() {
        this.__data__ = new dn(), this.size = 0;
      }
      function bM(e) {
        var t = this.__data__, n = t.delete(e);
        return this.size = t.size, n;
      }
      function OM(e) {
        return this.__data__.get(e);
      }
      function SM(e) {
        return this.__data__.has(e);
      }
      function BM(e, t) {
        var n = this.__data__;
        if (n instanceof dn) {
          var l = n.__data__;
          if (!fl || l.length < D - 1)
            return l.push([e, t]), this.size = ++n.size, this;
          n = this.__data__ = new gn(l);
        }
        return n.set(e, t), this.size = n.size, this;
      }
      qt.prototype.clear = CM, qt.prototype.delete = bM, qt.prototype.get = OM, qt.prototype.has = SM, qt.prototype.set = BM;
      function Co(e, t) {
        var n = de(e), l = !n && Rn(e), u = !n && !l && Cn(e), a = !n && !l && !u && ol(e), c = n || l || u || a, g = c ? Sr(e.length, Zc) : [], y = g.length;
        for (var C in e)
          (t || Se.call(e, C)) && !(c && // Safari 9 has enumerable `arguments.length` in strict mode.
          (C == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
          u && (C == "offset" || C == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
          a && (C == "buffer" || C == "byteLength" || C == "byteOffset") || // Skip index properties.
          zn(C, y))) && g.push(C);
        return g;
      }
      function bo(e) {
        var t = e.length;
        return t ? e[Xr(0, t - 1)] : r;
      }
      function kM(e, t) {
        return ir(It(e), Qn(t, 0, e.length));
      }
      function UM(e) {
        return ir(It(e));
      }
      function Fr(e, t, n) {
        (n !== r && !$t(e[t], n) || n === r && !(t in e)) && Nn(e, t, n);
      }
      function pl(e, t, n) {
        var l = e[t];
        (!(Se.call(e, t) && $t(l, n)) || n === r && !(t in e)) && Nn(e, t, n);
      }
      function Kl(e, t) {
        for (var n = e.length; n--; )
          if ($t(e[n][0], t))
            return n;
        return -1;
      }
      function QM(e, t, n, l) {
        return Tn(e, function(u, a, c) {
          t(l, u, n(u), c);
        }), l;
      }
      function Oo(e, t) {
        return e && sn(t, at(t), e);
      }
      function PM(e, t) {
        return e && sn(t, At(t), e);
      }
      function Nn(e, t, n) {
        t == "__proto__" && Fl ? Fl(e, t, {
          configurable: !0,
          enumerable: !0,
          value: n,
          writable: !0
        }) : e[t] = n;
      }
      function Rr(e, t) {
        for (var n = -1, l = t.length, u = v(l), a = e == null; ++n < l; )
          u[n] = a ? r : Yu(e, t[n]);
        return u;
      }
      function Qn(e, t, n) {
        return e === e && (n !== r && (e = e <= n ? e : n), t !== r && (e = e >= t ? e : t)), e;
      }
      function Pt(e, t, n, l, u, a) {
        var c, g = t & Y, y = t & b, C = t & E;
        if (n && (c = u ? n(e, l, u, a) : n(e)), c !== r)
          return c;
        if (!qe(e))
          return e;
        var O = de(e);
        if (O) {
          if (c = Lf(e), !g)
            return It(e, c);
        } else {
          var S = jt(e), W = S == fn || S == On;
          if (Cn(e))
            return us(e, g);
          if (S == Z || S == q || W && !u) {
            if (c = y || W ? {} : Ys(e), !g)
              return y ? yf(e, PM(c, e)) : zf(e, Oo(c, e));
          } else {
            if (!Fe[S])
              return u ? e : {};
            c = xf(e, S, g);
          }
        }
        a || (a = new qt());
        var $ = a.get(e);
        if ($)
          return $;
        a.set(e, c), Xs(e) ? e.forEach(function(se) {
          c.add(Pt(se, t, n, se, e, a));
        }) : $s(e) && e.forEach(function(se, _e) {
          c.set(_e, Pt(se, t, n, _e, e, a));
        });
        var oe = C ? y ? cu : au : y ? At : at, pe = O ? r : oe(e);
        return kt(pe || e, function(se, _e) {
          pe && (_e = se, se = e[_e]), pl(c, _e, Pt(se, t, n, _e, e, a));
        }), c;
      }
      function VM(e) {
        var t = at(e);
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
          throw new Ut(m);
        return hl(function() {
          e.apply(r, n);
        }, t);
      }
      function jl(e, t, n, l) {
        var u = -1, a = El, c = !0, g = e.length, y = [], C = t.length;
        if (!g)
          return y;
        n && (t = Ze(t, xt(n))), l ? (a = Lr, c = !1) : t.length >= D && (a = cl, c = !1, t = new Un(t));
        e:
          for (; ++u < g; ) {
            var O = e[u], S = n == null ? O : n(O);
            if (O = l || O !== 0 ? O : 0, c && S === S) {
              for (var W = C; W--; )
                if (t[W] === S)
                  continue e;
              y.push(O);
            } else
              a(t, S, l) || y.push(O);
          }
        return y;
      }
      var Tn = cs(on), ko = cs(Gr, !0);
      function FM(e, t) {
        var n = !0;
        return Tn(e, function(l, u, a) {
          return n = !!t(l, u, a), n;
        }), n;
      }
      function ql(e, t, n) {
        for (var l = -1, u = e.length; ++l < u; ) {
          var a = e[l], c = t(a);
          if (c != null && (g === r ? c === c && !Ct(c) : n(c, g)))
            var g = c, y = a;
        }
        return y;
      }
      function RM(e, t, n, l) {
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
        for (n || (n = Cf), u || (u = []); ++a < c; ) {
          var g = e[a];
          t > 0 && n(g) ? t > 1 ? ft(g, t - 1, n, l, u) : In(u, g) : l || (u[u.length] = g);
        }
        return u;
      }
      var Wr = Ms(), Qo = Ms(!0);
      function on(e, t) {
        return e && Wr(e, t, at);
      }
      function Gr(e, t) {
        return e && Qo(e, t, at);
      }
      function $l(e, t) {
        return vn(t, function(n) {
          return yn(e[n]);
        });
      }
      function Pn(e, t) {
        t = xn(t, e);
        for (var n = 0, l = t.length; e != null && n < l; )
          e = e[an(t[n++])];
        return n && n == l ? e : r;
      }
      function Po(e, t, n) {
        var l = t(e);
        return de(e) ? l : In(l, n(e));
      }
      function mt(e) {
        return e == null ? e === r ? hn : A : Bn && Bn in Pe(e) ? wf(e) : Qf(e);
      }
      function Zr(e, t) {
        return e > t;
      }
      function WM(e, t) {
        return e != null && Se.call(e, t);
      }
      function GM(e, t) {
        return e != null && t in Pe(e);
      }
      function ZM(e, t, n) {
        return e >= pt(t, n) && e < st(t, n);
      }
      function Hr(e, t, n) {
        for (var l = n ? Lr : El, u = e[0].length, a = e.length, c = a, g = v(a), y = 1 / 0, C = []; c--; ) {
          var O = e[c];
          c && t && (O = Ze(O, xt(t))), y = pt(O.length, y), g[c] = !n && (t || u >= 120 && O.length >= 120) ? new Un(c && O) : r;
        }
        O = e[0];
        var S = -1, W = g[0];
        e:
          for (; ++S < u && C.length < y; ) {
            var $ = O[S], oe = t ? t($) : $;
            if ($ = n || $ !== 0 ? $ : 0, !(W ? cl(W, oe) : l(C, oe, n))) {
              for (c = a; --c; ) {
                var pe = g[c];
                if (!(pe ? cl(pe, oe) : l(e[c], oe, n)))
                  continue e;
              }
              W && W.push(oe), C.push($);
            }
          }
        return C;
      }
      function HM(e, t, n, l) {
        return on(e, function(u, a, c) {
          t(l, n(u), a, c);
        }), l;
      }
      function zl(e, t, n) {
        t = xn(t, e), e = As(e, t);
        var l = e == null ? e : e[an(Ft(t))];
        return l == null ? r : Lt(l, e, n);
      }
      function Vo(e) {
        return Je(e) && mt(e) == q;
      }
      function KM(e) {
        return Je(e) && mt(e) == rn;
      }
      function qM(e) {
        return Je(e) && mt(e) == Gt;
      }
      function yl(e, t, n, l, u) {
        return e === t ? !0 : e == null || t == null || !Je(e) && !Je(t) ? e !== e && t !== t : $M(e, t, n, l, yl, u);
      }
      function $M(e, t, n, l, u, a) {
        var c = de(e), g = de(t), y = c ? je : jt(e), C = g ? je : jt(t);
        y = y == q ? Z : y, C = C == q ? Z : C;
        var O = y == Z, S = C == Z, W = y == C;
        if (W && Cn(e)) {
          if (!Cn(t))
            return !1;
          c = !0, O = !1;
        }
        if (W && !O)
          return a || (a = new qt()), c || ol(e) ? _s(e, t, n, l, u, a) : vf(e, t, y, n, l, u, a);
        if (!(n & x)) {
          var $ = O && Se.call(e, "__wrapped__"), oe = S && Se.call(t, "__wrapped__");
          if ($ || oe) {
            var pe = $ ? e.value() : e, se = oe ? t.value() : t;
            return a || (a = new qt()), u(pe, se, n, l, a);
          }
        }
        return W ? (a || (a = new qt()), If(e, t, n, l, u, a)) : !1;
      }
      function JM(e) {
        return Je(e) && jt(e) == gt;
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
          var y = g[0], C = e[y], O = g[1];
          if (c && g[2]) {
            if (C === r && !(y in e))
              return !1;
          } else {
            var S = new qt();
            if (l)
              var W = l(C, O, y, e, t, S);
            if (!(W === r ? yl(O, C, x | Q, l, S) : W))
              return !1;
          }
        }
        return !0;
      }
      function Fo(e) {
        if (!qe(e) || Of(e))
          return !1;
        var t = yn(e) ? Jc : Va;
        return t.test(Fn(e));
      }
      function XM(e) {
        return Je(e) && mt(e) == ut;
      }
      function ef(e) {
        return Je(e) && jt(e) == Ve;
      }
      function tf(e) {
        return Je(e) && gr(e.length) && !!Re[mt(e)];
      }
      function Ro(e) {
        return typeof e == "function" ? e : e == null ? Tt : typeof e == "object" ? de(e) ? Zo(e[0], e[1]) : Go(e) : fi(e);
      }
      function qr(e) {
        if (!ml(e))
          return rM(e);
        var t = [];
        for (var n in Pe(e))
          Se.call(e, n) && n != "constructor" && t.push(n);
        return t;
      }
      function nf(e) {
        if (!qe(e))
          return Uf(e);
        var t = ml(e), n = [];
        for (var l in e)
          l == "constructor" && (t || !Se.call(e, l)) || n.push(l);
        return n;
      }
      function $r(e, t) {
        return e < t;
      }
      function Wo(e, t) {
        var n = -1, l = wt(e) ? v(e.length) : [];
        return Tn(e, function(u, a, c) {
          l[++n] = t(u, a, c);
        }), l;
      }
      function Go(e) {
        var t = fu(e);
        return t.length == 1 && t[0][2] ? Is(t[0][0], t[0][1]) : function(n) {
          return n === e || Kr(n, e, t);
        };
      }
      function Zo(e, t) {
        return gu(e) && vs(t) ? Is(an(e), t) : function(n) {
          var l = Yu(n, e);
          return l === r && l === t ? vu(n, e) : yl(t, l, x | Q);
        };
      }
      function Jl(e, t, n, l, u) {
        e !== t && Wr(t, function(a, c) {
          if (u || (u = new qt()), qe(a))
            lf(e, t, c, n, Jl, l, u);
          else {
            var g = l ? l(pu(e, c), a, c + "", e, t, u) : r;
            g === r && (g = a), Fr(e, c, g);
          }
        }, At);
      }
      function lf(e, t, n, l, u, a, c) {
        var g = pu(e, n), y = pu(t, n), C = c.get(y);
        if (C) {
          Fr(e, n, C);
          return;
        }
        var O = a ? a(g, y, n + "", e, t, c) : r, S = O === r;
        if (S) {
          var W = de(y), $ = !W && Cn(y), oe = !W && !$ && ol(y);
          O = y, W || $ || oe ? de(g) ? O = g : tt(g) ? O = It(g) : $ ? (S = !1, O = us(y, !0)) : oe ? (S = !1, O = os(y, !0)) : O = [] : Yl(y) || Rn(y) ? (O = g, Rn(g) ? O = ni(g) : (!qe(g) || yn(g)) && (O = Ys(y))) : S = !1;
        }
        S && (c.set(y, O), u(O, y, l, a, c), c.delete(y)), Fr(e, n, O);
      }
      function Ho(e, t) {
        var n = e.length;
        if (n)
          return t += t < 0 ? n : 0, zn(t, n) ? e[t] : r;
      }
      function Ko(e, t, n) {
        t.length ? t = Ze(t, function(a) {
          return de(a) ? function(c) {
            return Pn(c, a.length === 1 ? a[0] : a);
          } : a;
        }) : t = [Tt];
        var l = -1;
        t = Ze(t, xt(re()));
        var u = Wo(e, function(a, c, g) {
          var y = Ze(t, function(C) {
            return C(a);
          });
          return { criteria: y, index: ++l, value: a };
        });
        return Lc(u, function(a, c) {
          return jf(a, c, n);
        });
      }
      function rf(e, t) {
        return qo(e, t, function(n, l) {
          return vu(e, l);
        });
      }
      function qo(e, t, n) {
        for (var l = -1, u = t.length, a = {}; ++l < u; ) {
          var c = t[l], g = Pn(e, c);
          n(g, c) && Dl(a, xn(c, e), g);
        }
        return a;
      }
      function uf(e) {
        return function(t) {
          return Pn(t, e);
        };
      }
      function Jr(e, t, n, l) {
        var u = l ? Tc : Kn, a = -1, c = t.length, g = e;
        for (e === t && (t = It(t)), n && (g = Ze(e, xt(n))); ++a < c; )
          for (var y = 0, C = t[a], O = n ? n(C) : C; (y = u(g, O, y, l)) > -1; )
            g !== e && Vl.call(g, y, 1), Vl.call(e, y, 1);
        return e;
      }
      function $o(e, t) {
        for (var n = e ? t.length : 0, l = n - 1; n--; ) {
          var u = t[n];
          if (n == l || u !== a) {
            var a = u;
            zn(u) ? Vl.call(e, u, 1) : nu(e, u);
          }
        }
        return e;
      }
      function Xr(e, t) {
        return e + Wl(xo() * (t - e + 1));
      }
      function of(e, t, n, l) {
        for (var u = -1, a = st(Rl((t - e) / (n || 1)), 0), c = v(a); a--; )
          c[l ? a : ++u] = e, e += n;
        return c;
      }
      function eu(e, t) {
        var n = "";
        if (!e || t < 1 || t > L)
          return n;
        do
          t % 2 && (n += e), t = Wl(t / 2), t && (e += e);
        while (t);
        return n;
      }
      function ye(e, t) {
        return ju(ws(e, t, Tt), e + "");
      }
      function sf(e) {
        return bo(sl(e));
      }
      function af(e, t) {
        var n = sl(e);
        return ir(n, Qn(t, 0, n.length));
      }
      function Dl(e, t, n, l) {
        if (!qe(e))
          return e;
        t = xn(t, e);
        for (var u = -1, a = t.length, c = a - 1, g = e; g != null && ++u < a; ) {
          var y = an(t[u]), C = n;
          if (y === "__proto__" || y === "constructor" || y === "prototype")
            return e;
          if (u != c) {
            var O = g[y];
            C = l ? l(O, y, g) : r, C === r && (C = qe(O) ? O : zn(t[u + 1]) ? [] : {});
          }
          pl(g, y, C), g = g[y];
        }
        return e;
      }
      var Jo = Gl ? function(e, t) {
        return Gl.set(e, t), e;
      } : Tt, cf = Fl ? function(e, t) {
        return Fl(e, "toString", {
          configurable: !0,
          enumerable: !1,
          value: wu(t),
          writable: !0
        });
      } : Tt;
      function Mf(e) {
        return ir(sl(e));
      }
      function Vt(e, t, n) {
        var l = -1, u = e.length;
        t < 0 && (t = -t > u ? 0 : u + t), n = n > u ? u : n, n < 0 && (n += u), u = t > n ? 0 : n - t >>> 0, t >>>= 0;
        for (var a = v(u); ++l < u; )
          a[l] = e[l + t];
        return a;
      }
      function ff(e, t) {
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
            c !== null && !Ct(c) && (n ? c <= t : c < t) ? l = a + 1 : u = a;
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
        for (var c = t !== t, g = t === null, y = Ct(t), C = t === r; u < a; ) {
          var O = Wl((u + a) / 2), S = n(e[O]), W = S !== r, $ = S === null, oe = S === S, pe = Ct(S);
          if (c)
            var se = l || oe;
          else
            C ? se = oe && (l || W) : g ? se = oe && W && (l || !$) : y ? se = oe && W && !$ && (l || !pe) : $ || pe ? se = !1 : se = l ? S <= t : S < t;
          se ? u = O + 1 : a = O;
        }
        return pt(a, G);
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
        return typeof e == "number" ? e : Ct(e) ? ae : +e;
      }
      function Et(e) {
        if (typeof e == "string")
          return e;
        if (de(e))
          return Ze(e, Et) + "";
        if (Ct(e))
          return Eo ? Eo.call(e) : "";
        var t = e + "";
        return t == "0" && 1 / e == -I ? "-0" : t;
      }
      function Ln(e, t, n) {
        var l = -1, u = El, a = e.length, c = !0, g = [], y = g;
        if (n)
          c = !1, u = Lr;
        else if (a >= D) {
          var C = t ? null : hf(e);
          if (C)
            return bl(C);
          c = !1, u = cl, y = new Un();
        } else
          y = t ? [] : g;
        e:
          for (; ++l < a; ) {
            var O = e[l], S = t ? t(O) : O;
            if (O = n || O !== 0 ? O : 0, c && S === S) {
              for (var W = y.length; W--; )
                if (y[W] === S)
                  continue e;
              t && y.push(S), g.push(O);
            } else
              u(y, S, n) || (y !== g && y.push(S), g.push(O));
          }
        return g;
      }
      function nu(e, t) {
        return t = xn(t, e), e = As(e, t), e == null || delete e[an(Ft(t))];
      }
      function ts(e, t, n, l) {
        return Dl(e, t, n(Pn(e, t)), l);
      }
      function er(e, t, n, l) {
        for (var u = e.length, a = l ? u : -1; (l ? a-- : ++a < u) && t(e[a], a, e); )
          ;
        return n ? Vt(e, l ? 0 : a, l ? a + 1 : u) : Vt(e, l ? a + 1 : 0, l ? u : a);
      }
      function ns(e, t) {
        var n = e;
        return n instanceof he && (n = n.value()), xr(t, function(l, u) {
          return u.func.apply(u.thisArg, In([l], u.args));
        }, n);
      }
      function lu(e, t, n) {
        var l = e.length;
        if (l < 2)
          return l ? Ln(e[0]) : [];
        for (var u = -1, a = v(l); ++u < l; )
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
        return tt(e) ? e : [];
      }
      function uu(e) {
        return typeof e == "function" ? e : Tt;
      }
      function xn(e, t) {
        return de(e) ? e : gu(e, t) ? [e] : Es(Ee(e));
      }
      var df = ye;
      function En(e, t, n) {
        var l = e.length;
        return n = n === r ? l : n, !t && n >= l ? e : Vt(e, t, n);
      }
      var rs = Xc || function(e) {
        return Mt.clearTimeout(e);
      };
      function us(e, t) {
        if (t)
          return e.slice();
        var n = e.length, l = Io ? Io(n) : new e.constructor(n);
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
      function Nf(e) {
        var t = new e.constructor(e.source, Pu.exec(e));
        return t.lastIndex = e.lastIndex, t;
      }
      function pf(e) {
        return Nl ? Pe(Nl.call(e)) : {};
      }
      function os(e, t) {
        var n = t ? ou(e.buffer) : e.buffer;
        return new e.constructor(n, e.byteOffset, e.length);
      }
      function ss(e, t) {
        if (e !== t) {
          var n = e !== r, l = e === null, u = e === e, a = Ct(e), c = t !== r, g = t === null, y = t === t, C = Ct(t);
          if (!g && !C && !a && e > t || a && c && y && !g && !C || l && c && y || !n && y || !u)
            return 1;
          if (!l && !a && !C && e < t || C && n && u && !l && !a || g && n && u || !c && u || !y)
            return -1;
        }
        return 0;
      }
      function jf(e, t, n) {
        for (var l = -1, u = e.criteria, a = t.criteria, c = u.length, g = n.length; ++l < c; ) {
          var y = ss(u[l], a[l]);
          if (y) {
            if (l >= g)
              return y;
            var C = n[l];
            return y * (C == "desc" ? -1 : 1);
          }
        }
        return e.index - t.index;
      }
      function is(e, t, n, l) {
        for (var u = -1, a = e.length, c = n.length, g = -1, y = t.length, C = st(a - c, 0), O = v(y + C), S = !l; ++g < y; )
          O[g] = t[g];
        for (; ++u < c; )
          (S || u < a) && (O[n[u]] = e[u]);
        for (; C--; )
          O[g++] = e[u++];
        return O;
      }
      function as(e, t, n, l) {
        for (var u = -1, a = e.length, c = -1, g = n.length, y = -1, C = t.length, O = st(a - g, 0), S = v(O + C), W = !l; ++u < O; )
          S[u] = e[u];
        for (var $ = u; ++y < C; )
          S[$ + y] = t[y];
        for (; ++c < g; )
          (W || u < a) && (S[$ + n[c]] = e[u++]);
        return S;
      }
      function It(e, t) {
        var n = -1, l = e.length;
        for (t || (t = v(l)); ++n < l; )
          t[n] = e[n];
        return t;
      }
      function sn(e, t, n, l) {
        var u = !n;
        n || (n = {});
        for (var a = -1, c = t.length; ++a < c; ) {
          var g = t[a], y = l ? l(n[g], e[g], g, n, e) : r;
          y === r && (y = e[g]), u ? Nn(n, g, y) : pl(n, g, y);
        }
        return n;
      }
      function zf(e, t) {
        return sn(e, du(e), t);
      }
      function yf(e, t) {
        return sn(e, ms(e), t);
      }
      function tr(e, t) {
        return function(n, l) {
          var u = de(n) ? hc : QM, a = t ? t() : {};
          return u(n, e, re(l, 2), a);
        };
      }
      function ll(e) {
        return ye(function(t, n) {
          var l = -1, u = n.length, a = u > 1 ? n[u - 1] : r, c = u > 2 ? n[2] : r;
          for (a = e.length > 3 && typeof a == "function" ? (u--, a) : r, c && ht(n[0], n[1], c) && (a = u < 3 ? r : a, u = 1), t = Pe(t); ++l < u; ) {
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
      function Df(e, t, n) {
        var l = t & B, u = _l(e);
        function a() {
          var c = this && this !== Mt && this instanceof a ? u : e;
          return c.apply(l ? n : this, arguments);
        }
        return a;
      }
      function fs(e) {
        return function(t) {
          t = Ee(t);
          var n = qn(t) ? Kt(t) : r, l = n ? n[0] : t.charAt(0), u = n ? En(n, 1).join("") : t.slice(1);
          return l[e]() + u;
        };
      }
      function rl(e) {
        return function(t) {
          return xr(ci(ai(t).replace(ac, "")), e, "");
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
          return qe(l) ? l : n;
        };
      }
      function _f(e, t, n) {
        var l = _l(e);
        function u() {
          for (var a = arguments.length, c = v(a), g = a, y = ul(u); g--; )
            c[g] = arguments[g];
          var C = a < 3 && c[0] !== y && c[a - 1] !== y ? [] : wn(c, y);
          if (a -= C.length, a < n)
            return js(
              e,
              t,
              nr,
              u.placeholder,
              r,
              c,
              C,
              r,
              r,
              n - a
            );
          var O = this && this !== Mt && this instanceof u ? l : e;
          return Lt(O, this, c);
        }
        return u;
      }
      function ds(e) {
        return function(t, n, l) {
          var u = Pe(t);
          if (!wt(t)) {
            var a = re(n, 3);
            t = at(t), n = function(g) {
              return a(u[g], g, u);
            };
          }
          var c = e(t, n, l);
          return c > -1 ? u[a ? t[c] : c] : r;
        };
      }
      function gs(e) {
        return jn(function(t) {
          var n = t.length, l = n, u = Qt.prototype.thru;
          for (e && t.reverse(); l--; ) {
            var a = t[l];
            if (typeof a != "function")
              throw new Ut(m);
            if (u && !c && or(a) == "wrapper")
              var c = new Qt([], !0);
          }
          for (l = c ? l : n; ++l < n; ) {
            a = t[l];
            var g = or(a), y = g == "wrapper" ? Mu(a) : r;
            y && Nu(y[0]) && y[1] == (k | me | w | ge) && !y[4].length && y[9] == 1 ? c = c[or(y[0])].apply(c, y[3]) : c = a.length == 1 && Nu(a) ? c[g]() : c.thru(a);
          }
          return function() {
            var C = arguments, O = C[0];
            if (c && C.length == 1 && de(O))
              return c.plant(O).value();
            for (var S = 0, W = n ? t[S].apply(this, C) : O; ++S < n; )
              W = t[S].call(this, W);
            return W;
          };
        });
      }
      function nr(e, t, n, l, u, a, c, g, y, C) {
        var O = t & k, S = t & B, W = t & K, $ = t & (me | te), oe = t & Ue, pe = W ? r : _l(e);
        function se() {
          for (var _e = arguments.length, ve = v(_e), bt = _e; bt--; )
            ve[bt] = arguments[bt];
          if ($)
            var Yt = ul(se), Ot = Ec(ve, Yt);
          if (l && (ve = is(ve, l, u, $)), a && (ve = as(ve, a, c, $)), _e -= Ot, $ && _e < C) {
            var nt = wn(ve, Yt);
            return js(
              e,
              t,
              nr,
              se.placeholder,
              n,
              ve,
              nt,
              g,
              y,
              C - _e
            );
          }
          var Jt = S ? n : this, _n = W ? Jt[e] : e;
          return _e = ve.length, g ? ve = Pf(ve, g) : oe && _e > 1 && ve.reverse(), O && y < _e && (ve.length = y), this && this !== Mt && this instanceof se && (_n = pe || _l(_n)), _n.apply(Jt, ve);
        }
        return se;
      }
      function Ns(e, t) {
        return function(n, l) {
          return HM(n, e, t(l), {});
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
            typeof n == "string" || typeof l == "string" ? (n = Et(n), l = Et(l)) : (n = es(n), l = es(l)), u = e(n, l);
          }
          return u;
        };
      }
      function su(e) {
        return jn(function(t) {
          return t = Ze(t, xt(re())), ye(function(n) {
            var l = this;
            return e(t, function(u) {
              return Lt(u, l, n);
            });
          });
        });
      }
      function rr(e, t) {
        t = t === r ? " " : Et(t);
        var n = t.length;
        if (n < 2)
          return n ? eu(t, e) : t;
        var l = eu(t, Rl(e / $n(t)));
        return qn(t) ? En(Kt(l), 0, e).join("") : l.slice(0, e);
      }
      function mf(e, t, n, l) {
        var u = t & B, a = _l(e);
        function c() {
          for (var g = -1, y = arguments.length, C = -1, O = l.length, S = v(O + y), W = this && this !== Mt && this instanceof c ? a : e; ++C < O; )
            S[C] = l[C];
          for (; y--; )
            S[C++] = arguments[++g];
          return Lt(W, u ? n : this, S);
        }
        return c;
      }
      function ps(e) {
        return function(t, n, l) {
          return l && typeof l != "number" && ht(t, n, l) && (n = l = r), t = Dn(t), n === r ? (n = t, t = 0) : n = Dn(n), l = l === r ? t < n ? 1 : -1 : Dn(l), of(t, n, l, e);
        };
      }
      function ur(e) {
        return function(t, n) {
          return typeof t == "string" && typeof n == "string" || (t = Rt(t), n = Rt(n)), e(t, n);
        };
      }
      function js(e, t, n, l, u, a, c, g, y, C) {
        var O = t & me, S = O ? c : r, W = O ? r : c, $ = O ? a : r, oe = O ? r : a;
        t |= O ? w : P, t &= ~(O ? P : w), t & ue || (t &= ~(B | K));
        var pe = [
          e,
          t,
          u,
          $,
          S,
          oe,
          W,
          g,
          y,
          C
        ], se = n.apply(r, pe);
        return Nu(e) && Ts(se, pe), se.placeholder = l, Ls(se, e, t);
      }
      function iu(e) {
        var t = ot[e];
        return function(n, l) {
          if (n = Rt(n), l = l == null ? 0 : pt(Ne(l), 292), l && Lo(n)) {
            var u = (Ee(n) + "e").split("e"), a = t(u[0] + "e" + (+u[1] + l));
            return u = (Ee(a) + "e").split("e"), +(u[0] + "e" + (+u[1] - l));
          }
          return t(n);
        };
      }
      var hf = el && 1 / bl(new el([, -0]))[1] == I ? function(e) {
        return new el(e);
      } : Lu;
      function zs(e) {
        return function(t) {
          var n = jt(t);
          return n == gt ? kr(t) : n == Ve ? Uc(t) : xc(t, e(t));
        };
      }
      function pn(e, t, n, l, u, a, c, g) {
        var y = t & K;
        if (!y && typeof e != "function")
          throw new Ut(m);
        var C = l ? l.length : 0;
        if (C || (t &= ~(w | P), l = u = r), c = c === r ? c : st(Ne(c), 0), g = g === r ? g : Ne(g), C -= u ? u.length : 0, t & P) {
          var O = l, S = u;
          l = u = r;
        }
        var W = y ? r : Mu(e), $ = [
          e,
          t,
          n,
          l,
          u,
          O,
          S,
          a,
          c,
          g
        ];
        if (W && kf($, W), e = $[0], t = $[1], n = $[2], l = $[3], u = $[4], g = $[9] = $[9] === r ? y ? 0 : e.length : st($[9] - C, 0), !g && t & (me | te) && (t &= ~(me | te)), !t || t == B)
          var oe = Df(e, t, n);
        else
          t == me || t == te ? oe = _f(e, t, g) : (t == w || t == (B | w)) && !u.length ? oe = mf(e, t, n, l) : oe = nr.apply(r, $);
        var pe = W ? Jo : Ts;
        return Ls(pe(oe, $), e, t);
      }
      function ys(e, t, n, l) {
        return e === r || $t(e, Xn[n]) && !Se.call(l, n) ? t : e;
      }
      function Ds(e, t, n, l, u, a) {
        return qe(e) && qe(t) && (a.set(t, e), Jl(e, t, r, Ds, a), a.delete(t)), e;
      }
      function Yf(e) {
        return Yl(e) ? r : e;
      }
      function _s(e, t, n, l, u, a) {
        var c = n & x, g = e.length, y = t.length;
        if (g != y && !(c && y > g))
          return !1;
        var C = a.get(e), O = a.get(t);
        if (C && O)
          return C == t && O == e;
        var S = -1, W = !0, $ = n & Q ? new Un() : r;
        for (a.set(e, t), a.set(t, e); ++S < g; ) {
          var oe = e[S], pe = t[S];
          if (l)
            var se = c ? l(pe, oe, S, t, e, a) : l(oe, pe, S, e, t, a);
          if (se !== r) {
            if (se)
              continue;
            W = !1;
            break;
          }
          if ($) {
            if (!Er(t, function(_e, ve) {
              if (!cl($, ve) && (oe === _e || u(oe, _e, n, l, a)))
                return $.push(ve);
            })) {
              W = !1;
              break;
            }
          } else if (!(oe === pe || u(oe, pe, n, l, a))) {
            W = !1;
            break;
          }
        }
        return a.delete(e), a.delete(t), W;
      }
      function vf(e, t, n, l, u, a, c) {
        switch (n) {
          case ze:
            if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
              return !1;
            e = e.buffer, t = t.buffer;
          case rn:
            return !(e.byteLength != t.byteLength || !a(new Ql(e), new Ql(t)));
          case rt:
          case Gt:
          case ln:
            return $t(+e, +t);
          case Zt:
            return e.name == t.name && e.message == t.message;
          case ut:
          case ct:
            return e == t + "";
          case gt:
            var g = kr;
          case Ve:
            var y = l & x;
            if (g || (g = bl), e.size != t.size && !y)
              return !1;
            var C = c.get(e);
            if (C)
              return C == t;
            l |= Q, c.set(e, t);
            var O = _s(g(e), g(t), l, u, a, c);
            return c.delete(e), O;
          case St:
            if (Nl)
              return Nl.call(e) == Nl.call(t);
        }
        return !1;
      }
      function If(e, t, n, l, u, a) {
        var c = n & x, g = au(e), y = g.length, C = au(t), O = C.length;
        if (y != O && !c)
          return !1;
        for (var S = y; S--; ) {
          var W = g[S];
          if (!(c ? W in t : Se.call(t, W)))
            return !1;
        }
        var $ = a.get(e), oe = a.get(t);
        if ($ && oe)
          return $ == t && oe == e;
        var pe = !0;
        a.set(e, t), a.set(t, e);
        for (var se = c; ++S < y; ) {
          W = g[S];
          var _e = e[W], ve = t[W];
          if (l)
            var bt = c ? l(ve, _e, W, t, e, a) : l(_e, ve, W, e, t, a);
          if (!(bt === r ? _e === ve || u(_e, ve, n, l, a) : bt)) {
            pe = !1;
            break;
          }
          se || (se = W == "constructor");
        }
        if (pe && !se) {
          var Yt = e.constructor, Ot = t.constructor;
          Yt != Ot && "constructor" in e && "constructor" in t && !(typeof Yt == "function" && Yt instanceof Yt && typeof Ot == "function" && Ot instanceof Ot) && (pe = !1);
        }
        return a.delete(e), a.delete(t), pe;
      }
      function jn(e) {
        return ju(ws(e, r, Ss), e + "");
      }
      function au(e) {
        return Po(e, at, du);
      }
      function cu(e) {
        return Po(e, At, ms);
      }
      var Mu = Gl ? function(e) {
        return Gl.get(e);
      } : Lu;
      function or(e) {
        for (var t = e.name + "", n = tl[t], l = Se.call(tl, t) ? n.length : 0; l--; ) {
          var u = n[l], a = u.func;
          if (a == null || a == e)
            return u.name;
        }
        return t;
      }
      function ul(e) {
        var t = Se.call(i, "placeholder") ? i : e;
        return t.placeholder;
      }
      function re() {
        var e = i.iteratee || Au;
        return e = e === Au ? Ro : e, arguments.length ? e(arguments[0], arguments[1]) : e;
      }
      function sr(e, t) {
        var n = e.__data__;
        return bf(t) ? n[typeof t == "string" ? "string" : "hash"] : n.map;
      }
      function fu(e) {
        for (var t = at(e), n = t.length; n--; ) {
          var l = t[n], u = e[l];
          t[n] = [l, u, vs(u)];
        }
        return t;
      }
      function Vn(e, t) {
        var n = Sc(e, t);
        return Fo(n) ? n : r;
      }
      function wf(e) {
        var t = Se.call(e, Bn), n = e[Bn];
        try {
          e[Bn] = r;
          var l = !0;
        } catch {
        }
        var u = kl.call(e);
        return l && (t ? e[Bn] = n : delete e[Bn]), u;
      }
      var du = Qr ? function(e) {
        return e == null ? [] : (e = Pe(e), vn(Qr(e), function(t) {
          return Ao.call(e, t);
        }));
      } : xu, ms = Qr ? function(e) {
        for (var t = []; e; )
          In(t, du(e)), e = Pl(e);
        return t;
      } : xu, jt = mt;
      (Pr && jt(new Pr(new ArrayBuffer(1))) != ze || fl && jt(new fl()) != gt || Vr && jt(Vr.resolve()) != le || el && jt(new el()) != Ve || dl && jt(new dl()) != Ht) && (jt = function(e) {
        var t = mt(e), n = t == Z ? e.constructor : r, l = n ? Fn(n) : "";
        if (l)
          switch (l) {
            case iM:
              return ze;
            case aM:
              return gt;
            case cM:
              return le;
            case MM:
              return Ve;
            case fM:
              return Ht;
          }
        return t;
      });
      function Af(e, t, n) {
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
              t = pt(t, e + c);
              break;
            case "takeRight":
              e = st(e, t - c);
              break;
          }
        }
        return { start: e, end: t };
      }
      function Tf(e) {
        var t = e.match(ba);
        return t ? t[1].split(Oa) : [];
      }
      function hs(e, t, n) {
        t = xn(t, e);
        for (var l = -1, u = t.length, a = !1; ++l < u; ) {
          var c = an(t[l]);
          if (!(a = e != null && n(e, c)))
            break;
          e = e[c];
        }
        return a || ++l != u ? a : (u = e == null ? 0 : e.length, !!u && gr(u) && zn(c, u) && (de(e) || Rn(e)));
      }
      function Lf(e) {
        var t = e.length, n = new e.constructor(t);
        return t && typeof e[0] == "string" && Se.call(e, "index") && (n.index = e.index, n.input = e.input), n;
      }
      function Ys(e) {
        return typeof e.constructor == "function" && !ml(e) ? nl(Pl(e)) : {};
      }
      function xf(e, t, n) {
        var l = e.constructor;
        switch (t) {
          case rn:
            return ou(e);
          case rt:
          case Gt:
            return new l(+e);
          case ze:
            return gf(e, n);
          case et:
          case Nt:
          case Qe:
          case un:
          case Yn:
          case al:
          case zr:
          case yr:
          case Dr:
            return os(e, n);
          case gt:
            return new l();
          case ln:
          case ct:
            return new l(e);
          case ut:
            return Nf(e);
          case Ve:
            return new l();
          case St:
            return pf(e);
        }
      }
      function Ef(e, t) {
        var n = t.length;
        if (!n)
          return e;
        var l = n - 1;
        return t[l] = (n > 1 ? "& " : "") + t[l], t = t.join(n > 2 ? ", " : " "), e.replace(Ca, `{
/* [wrapped with ` + t + `] */
`);
      }
      function Cf(e) {
        return de(e) || Rn(e) || !!(To && e && e[To]);
      }
      function zn(e, t) {
        var n = typeof e;
        return t = t ?? L, !!t && (n == "number" || n != "symbol" && Ra.test(e)) && e > -1 && e % 1 == 0 && e < t;
      }
      function ht(e, t, n) {
        if (!qe(n))
          return !1;
        var l = typeof t;
        return (l == "number" ? wt(n) && zn(t, n.length) : l == "string" && t in n) ? $t(n[t], e) : !1;
      }
      function gu(e, t) {
        if (de(e))
          return !1;
        var n = typeof e;
        return n == "number" || n == "symbol" || n == "boolean" || e == null || Ct(e) ? !0 : Ta.test(e) || !Aa.test(e) || t != null && e in Pe(t);
      }
      function bf(e) {
        var t = typeof e;
        return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
      }
      function Nu(e) {
        var t = or(e), n = i[t];
        if (typeof n != "function" || !(t in he.prototype))
          return !1;
        if (e === n)
          return !0;
        var l = Mu(n);
        return !!l && e === l[0];
      }
      function Of(e) {
        return !!vo && vo in e;
      }
      var Sf = Sl ? yn : Eu;
      function ml(e) {
        var t = e && e.constructor, n = typeof t == "function" && t.prototype || Xn;
        return e === n;
      }
      function vs(e) {
        return e === e && !qe(e);
      }
      function Is(e, t) {
        return function(n) {
          return n == null ? !1 : n[e] === t && (t !== r || e in Pe(n));
        };
      }
      function Bf(e) {
        var t = fr(e, function(l) {
          return n.size === M && n.clear(), l;
        }), n = t.cache;
        return t;
      }
      function kf(e, t) {
        var n = e[1], l = t[1], u = n | l, a = u < (B | K | k), c = l == k && n == me || l == k && n == ge && e[7].length <= t[8] || l == (k | ge) && t[7].length <= t[8] && n == me;
        if (!(a || c))
          return e;
        l & B && (e[2] = t[2], u |= n & B ? 0 : ue);
        var g = t[3];
        if (g) {
          var y = e[3];
          e[3] = y ? is(y, g, t[4]) : g, e[4] = y ? wn(e[3], z) : t[4];
        }
        return g = t[5], g && (y = e[5], e[5] = y ? as(y, g, t[6]) : g, e[6] = y ? wn(e[5], z) : t[6]), g = t[7], g && (e[7] = g), l & k && (e[8] = e[8] == null ? t[8] : pt(e[8], t[8])), e[9] == null && (e[9] = t[9]), e[0] = t[0], e[1] = u, e;
      }
      function Uf(e) {
        var t = [];
        if (e != null)
          for (var n in Pe(e))
            t.push(n);
        return t;
      }
      function Qf(e) {
        return kl.call(e);
      }
      function ws(e, t, n) {
        return t = st(t === r ? e.length - 1 : t, 0), function() {
          for (var l = arguments, u = -1, a = st(l.length - t, 0), c = v(a); ++u < a; )
            c[u] = l[t + u];
          u = -1;
          for (var g = v(t + 1); ++u < t; )
            g[u] = l[u];
          return g[t] = n(c), Lt(e, this, g);
        };
      }
      function As(e, t) {
        return t.length < 2 ? e : Pn(e, Vt(t, 0, -1));
      }
      function Pf(e, t) {
        for (var n = e.length, l = pt(t.length, n), u = It(e); l--; ) {
          var a = t[l];
          e[l] = zn(a, n) ? u[a] : r;
        }
        return e;
      }
      function pu(e, t) {
        if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
          return e[t];
      }
      var Ts = xs(Jo), hl = tM || function(e, t) {
        return Mt.setTimeout(e, t);
      }, ju = xs(cf);
      function Ls(e, t, n) {
        var l = t + "";
        return ju(e, Ef(l, Vf(Tf(l), n)));
      }
      function xs(e) {
        var t = 0, n = 0;
        return function() {
          var l = uM(), u = tn - (l - n);
          if (n = l, u > 0) {
            if (++t >= vt)
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
      var Es = Bf(function(e) {
        var t = [];
        return e.charCodeAt(0) === 46 && t.push(""), e.replace(La, function(n, l, u, a) {
          t.push(u ? a.replace(ka, "$1") : l || n);
        }), t;
      });
      function an(e) {
        if (typeof e == "string" || Ct(e))
          return e;
        var t = e + "";
        return t == "0" && 1 / e == -I ? "-0" : t;
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
      function Vf(e, t) {
        return kt(ee, function(n) {
          var l = "_." + n[0];
          t & n[1] && !El(e, l) && e.push(l);
        }), e.sort();
      }
      function Cs(e) {
        if (e instanceof he)
          return e.clone();
        var t = new Qt(e.__wrapped__, e.__chain__);
        return t.__actions__ = It(e.__actions__), t.__index__ = e.__index__, t.__values__ = e.__values__, t;
      }
      function Ff(e, t, n) {
        (n ? ht(e, t, n) : t === r) ? t = 1 : t = st(Ne(t), 0);
        var l = e == null ? 0 : e.length;
        if (!l || t < 1)
          return [];
        for (var u = 0, a = 0, c = v(Rl(l / t)); u < l; )
          c[a++] = Vt(e, u, u += t);
        return c;
      }
      function Rf(e) {
        for (var t = -1, n = e == null ? 0 : e.length, l = 0, u = []; ++t < n; ) {
          var a = e[t];
          a && (u[l++] = a);
        }
        return u;
      }
      function Wf() {
        var e = arguments.length;
        if (!e)
          return [];
        for (var t = v(e - 1), n = arguments[0], l = e; l--; )
          t[l - 1] = arguments[l];
        return In(de(n) ? It(n) : [n], ft(t, 1));
      }
      var Gf = ye(function(e, t) {
        return tt(e) ? jl(e, ft(t, 1, tt, !0)) : [];
      }), Zf = ye(function(e, t) {
        var n = Ft(t);
        return tt(n) && (n = r), tt(e) ? jl(e, ft(t, 1, tt, !0), re(n, 2)) : [];
      }), Hf = ye(function(e, t) {
        var n = Ft(t);
        return tt(n) && (n = r), tt(e) ? jl(e, ft(t, 1, tt, !0), r, n) : [];
      });
      function Kf(e, t, n) {
        var l = e == null ? 0 : e.length;
        return l ? (t = n || t === r ? 1 : Ne(t), Vt(e, t < 0 ? 0 : t, l)) : [];
      }
      function qf(e, t, n) {
        var l = e == null ? 0 : e.length;
        return l ? (t = n || t === r ? 1 : Ne(t), t = l - t, Vt(e, 0, t < 0 ? 0 : t)) : [];
      }
      function $f(e, t) {
        return e && e.length ? er(e, re(t, 3), !0, !0) : [];
      }
      function Jf(e, t) {
        return e && e.length ? er(e, re(t, 3), !0) : [];
      }
      function Xf(e, t, n, l) {
        var u = e == null ? 0 : e.length;
        return u ? (n && typeof n != "number" && ht(e, t, n) && (n = 0, l = u), RM(e, t, n, l)) : [];
      }
      function bs(e, t, n) {
        var l = e == null ? 0 : e.length;
        if (!l)
          return -1;
        var u = n == null ? 0 : Ne(n);
        return u < 0 && (u = st(l + u, 0)), Cl(e, re(t, 3), u);
      }
      function Os(e, t, n) {
        var l = e == null ? 0 : e.length;
        if (!l)
          return -1;
        var u = l - 1;
        return n !== r && (u = Ne(n), u = n < 0 ? st(l + u, 0) : pt(u, l - 1)), Cl(e, re(t, 3), u, !0);
      }
      function Ss(e) {
        var t = e == null ? 0 : e.length;
        return t ? ft(e, 1) : [];
      }
      function ed(e) {
        var t = e == null ? 0 : e.length;
        return t ? ft(e, I) : [];
      }
      function td(e, t) {
        var n = e == null ? 0 : e.length;
        return n ? (t = t === r ? 1 : Ne(t), ft(e, t)) : [];
      }
      function nd(e) {
        for (var t = -1, n = e == null ? 0 : e.length, l = {}; ++t < n; ) {
          var u = e[t];
          l[u[0]] = u[1];
        }
        return l;
      }
      function Bs(e) {
        return e && e.length ? e[0] : r;
      }
      function ld(e, t, n) {
        var l = e == null ? 0 : e.length;
        if (!l)
          return -1;
        var u = n == null ? 0 : Ne(n);
        return u < 0 && (u = st(l + u, 0)), Kn(e, t, u);
      }
      function rd(e) {
        var t = e == null ? 0 : e.length;
        return t ? Vt(e, 0, -1) : [];
      }
      var ud = ye(function(e) {
        var t = Ze(e, ru);
        return t.length && t[0] === e[0] ? Hr(t) : [];
      }), od = ye(function(e) {
        var t = Ft(e), n = Ze(e, ru);
        return t === Ft(n) ? t = r : n.pop(), n.length && n[0] === e[0] ? Hr(n, re(t, 2)) : [];
      }), sd = ye(function(e) {
        var t = Ft(e), n = Ze(e, ru);
        return t = typeof t == "function" ? t : r, t && n.pop(), n.length && n[0] === e[0] ? Hr(n, r, t) : [];
      });
      function id(e, t) {
        return e == null ? "" : lM.call(e, t);
      }
      function Ft(e) {
        var t = e == null ? 0 : e.length;
        return t ? e[t - 1] : r;
      }
      function ad(e, t, n) {
        var l = e == null ? 0 : e.length;
        if (!l)
          return -1;
        var u = l;
        return n !== r && (u = Ne(n), u = u < 0 ? st(l + u, 0) : pt(u, l - 1)), t === t ? Pc(e, t, u) : Cl(e, jo, u, !0);
      }
      function cd(e, t) {
        return e && e.length ? Ho(e, Ne(t)) : r;
      }
      var Md = ye(ks);
      function ks(e, t) {
        return e && e.length && t && t.length ? Jr(e, t) : e;
      }
      function fd(e, t, n) {
        return e && e.length && t && t.length ? Jr(e, t, re(n, 2)) : e;
      }
      function dd(e, t, n) {
        return e && e.length && t && t.length ? Jr(e, t, r, n) : e;
      }
      var gd = jn(function(e, t) {
        var n = e == null ? 0 : e.length, l = Rr(e, t);
        return $o(e, Ze(t, function(u) {
          return zn(u, n) ? +u : u;
        }).sort(ss)), l;
      });
      function Nd(e, t) {
        var n = [];
        if (!(e && e.length))
          return n;
        var l = -1, u = [], a = e.length;
        for (t = re(t, 3); ++l < a; ) {
          var c = e[l];
          t(c, l, e) && (n.push(c), u.push(l));
        }
        return $o(e, u), n;
      }
      function zu(e) {
        return e == null ? e : sM.call(e);
      }
      function pd(e, t, n) {
        var l = e == null ? 0 : e.length;
        return l ? (n && typeof n != "number" && ht(e, t, n) ? (t = 0, n = l) : (t = t == null ? 0 : Ne(t), n = n === r ? l : Ne(n)), Vt(e, t, n)) : [];
      }
      function jd(e, t) {
        return Xl(e, t);
      }
      function zd(e, t, n) {
        return tu(e, t, re(n, 2));
      }
      function yd(e, t) {
        var n = e == null ? 0 : e.length;
        if (n) {
          var l = Xl(e, t);
          if (l < n && $t(e[l], t))
            return l;
        }
        return -1;
      }
      function Dd(e, t) {
        return Xl(e, t, !0);
      }
      function _d(e, t, n) {
        return tu(e, t, re(n, 2), !0);
      }
      function md(e, t) {
        var n = e == null ? 0 : e.length;
        if (n) {
          var l = Xl(e, t, !0) - 1;
          if ($t(e[l], t))
            return l;
        }
        return -1;
      }
      function hd(e) {
        return e && e.length ? Xo(e) : [];
      }
      function Yd(e, t) {
        return e && e.length ? Xo(e, re(t, 2)) : [];
      }
      function vd(e) {
        var t = e == null ? 0 : e.length;
        return t ? Vt(e, 1, t) : [];
      }
      function Id(e, t, n) {
        return e && e.length ? (t = n || t === r ? 1 : Ne(t), Vt(e, 0, t < 0 ? 0 : t)) : [];
      }
      function wd(e, t, n) {
        var l = e == null ? 0 : e.length;
        return l ? (t = n || t === r ? 1 : Ne(t), t = l - t, Vt(e, t < 0 ? 0 : t, l)) : [];
      }
      function Ad(e, t) {
        return e && e.length ? er(e, re(t, 3), !1, !0) : [];
      }
      function Td(e, t) {
        return e && e.length ? er(e, re(t, 3)) : [];
      }
      var Ld = ye(function(e) {
        return Ln(ft(e, 1, tt, !0));
      }), xd = ye(function(e) {
        var t = Ft(e);
        return tt(t) && (t = r), Ln(ft(e, 1, tt, !0), re(t, 2));
      }), Ed = ye(function(e) {
        var t = Ft(e);
        return t = typeof t == "function" ? t : r, Ln(ft(e, 1, tt, !0), r, t);
      });
      function Cd(e) {
        return e && e.length ? Ln(e) : [];
      }
      function bd(e, t) {
        return e && e.length ? Ln(e, re(t, 2)) : [];
      }
      function Od(e, t) {
        return t = typeof t == "function" ? t : r, e && e.length ? Ln(e, r, t) : [];
      }
      function yu(e) {
        if (!(e && e.length))
          return [];
        var t = 0;
        return e = vn(e, function(n) {
          if (tt(n))
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
          return Lt(t, r, l);
        });
      }
      var Sd = ye(function(e, t) {
        return tt(e) ? jl(e, t) : [];
      }), Bd = ye(function(e) {
        return lu(vn(e, tt));
      }), kd = ye(function(e) {
        var t = Ft(e);
        return tt(t) && (t = r), lu(vn(e, tt), re(t, 2));
      }), Ud = ye(function(e) {
        var t = Ft(e);
        return t = typeof t == "function" ? t : r, lu(vn(e, tt), r, t);
      }), Qd = ye(yu);
      function Pd(e, t) {
        return ls(e || [], t || [], pl);
      }
      function Vd(e, t) {
        return ls(e || [], t || [], Dl);
      }
      var Fd = ye(function(e) {
        var t = e.length, n = t > 1 ? e[t - 1] : r;
        return n = typeof n == "function" ? (e.pop(), n) : r, Us(e, n);
      });
      function Qs(e) {
        var t = i(e);
        return t.__chain__ = !0, t;
      }
      function Rd(e, t) {
        return t(e), e;
      }
      function ar(e, t) {
        return t(e);
      }
      var Wd = jn(function(e) {
        var t = e.length, n = t ? e[0] : 0, l = this.__wrapped__, u = function(a) {
          return Rr(a, e);
        };
        return t > 1 || this.__actions__.length || !(l instanceof he) || !zn(n) ? this.thru(u) : (l = l.slice(n, +n + (t ? 1 : 0)), l.__actions__.push({
          func: ar,
          args: [u],
          thisArg: r
        }), new Qt(l, this.__chain__).thru(function(a) {
          return t && !a.length && a.push(r), a;
        }));
      });
      function Gd() {
        return Qs(this);
      }
      function Zd() {
        return new Qt(this.value(), this.__chain__);
      }
      function Hd() {
        this.__values__ === r && (this.__values__ = ei(this.value()));
        var e = this.__index__ >= this.__values__.length, t = e ? r : this.__values__[this.__index__++];
        return { done: e, value: t };
      }
      function Kd() {
        return this;
      }
      function qd(e) {
        for (var t, n = this; n instanceof Hl; ) {
          var l = Cs(n);
          l.__index__ = 0, l.__values__ = r, t ? u.__wrapped__ = l : t = l;
          var u = l;
          n = n.__wrapped__;
        }
        return u.__wrapped__ = e, t;
      }
      function $d() {
        var e = this.__wrapped__;
        if (e instanceof he) {
          var t = e;
          return this.__actions__.length && (t = new he(this)), t = t.reverse(), t.__actions__.push({
            func: ar,
            args: [zu],
            thisArg: r
          }), new Qt(t, this.__chain__);
        }
        return this.thru(zu);
      }
      function Jd() {
        return ns(this.__wrapped__, this.__actions__);
      }
      var Xd = tr(function(e, t, n) {
        Se.call(e, n) ? ++e[n] : Nn(e, n, 1);
      });
      function eg(e, t, n) {
        var l = de(e) ? No : FM;
        return n && ht(e, t, n) && (t = r), l(e, re(t, 3));
      }
      function tg(e, t) {
        var n = de(e) ? vn : Uo;
        return n(e, re(t, 3));
      }
      var ng = ds(bs), lg = ds(Os);
      function rg(e, t) {
        return ft(cr(e, t), 1);
      }
      function ug(e, t) {
        return ft(cr(e, t), I);
      }
      function og(e, t, n) {
        return n = n === r ? 1 : Ne(n), ft(cr(e, t), n);
      }
      function Ps(e, t) {
        var n = de(e) ? kt : Tn;
        return n(e, re(t, 3));
      }
      function Vs(e, t) {
        var n = de(e) ? Yc : ko;
        return n(e, re(t, 3));
      }
      var sg = tr(function(e, t, n) {
        Se.call(e, n) ? e[n].push(t) : Nn(e, n, [t]);
      });
      function ig(e, t, n, l) {
        e = wt(e) ? e : sl(e), n = n && !l ? Ne(n) : 0;
        var u = e.length;
        return n < 0 && (n = st(u + n, 0)), Nr(e) ? n <= u && e.indexOf(t, n) > -1 : !!u && Kn(e, t, n) > -1;
      }
      var ag = ye(function(e, t, n) {
        var l = -1, u = typeof t == "function", a = wt(e) ? v(e.length) : [];
        return Tn(e, function(c) {
          a[++l] = u ? Lt(t, c, n) : zl(c, t, n);
        }), a;
      }), cg = tr(function(e, t, n) {
        Nn(e, n, t);
      });
      function cr(e, t) {
        var n = de(e) ? Ze : Wo;
        return n(e, re(t, 3));
      }
      function Mg(e, t, n, l) {
        return e == null ? [] : (de(t) || (t = t == null ? [] : [t]), n = l ? r : n, de(n) || (n = n == null ? [] : [n]), Ko(e, t, n));
      }
      var fg = tr(function(e, t, n) {
        e[n ? 0 : 1].push(t);
      }, function() {
        return [[], []];
      });
      function dg(e, t, n) {
        var l = de(e) ? xr : yo, u = arguments.length < 3;
        return l(e, re(t, 4), n, u, Tn);
      }
      function gg(e, t, n) {
        var l = de(e) ? vc : yo, u = arguments.length < 3;
        return l(e, re(t, 4), n, u, ko);
      }
      function Ng(e, t) {
        var n = de(e) ? vn : Uo;
        return n(e, dr(re(t, 3)));
      }
      function pg(e) {
        var t = de(e) ? bo : sf;
        return t(e);
      }
      function jg(e, t, n) {
        (n ? ht(e, t, n) : t === r) ? t = 1 : t = Ne(t);
        var l = de(e) ? kM : af;
        return l(e, t);
      }
      function zg(e) {
        var t = de(e) ? UM : Mf;
        return t(e);
      }
      function yg(e) {
        if (e == null)
          return 0;
        if (wt(e))
          return Nr(e) ? $n(e) : e.length;
        var t = jt(e);
        return t == gt || t == Ve ? e.size : qr(e).length;
      }
      function Dg(e, t, n) {
        var l = de(e) ? Er : ff;
        return n && ht(e, t, n) && (t = r), l(e, re(t, 3));
      }
      var _g = ye(function(e, t) {
        if (e == null)
          return [];
        var n = t.length;
        return n > 1 && ht(e, t[0], t[1]) ? t = [] : n > 2 && ht(t[0], t[1], t[2]) && (t = [t[0]]), Ko(e, ft(t, 1), []);
      }), Mr = eM || function() {
        return Mt.Date.now();
      };
      function mg(e, t) {
        if (typeof t != "function")
          throw new Ut(m);
        return e = Ne(e), function() {
          if (--e < 1)
            return t.apply(this, arguments);
        };
      }
      function Fs(e, t, n) {
        return t = n ? r : t, t = e && t == null ? e.length : t, pn(e, k, r, r, r, r, t);
      }
      function Rs(e, t) {
        var n;
        if (typeof t != "function")
          throw new Ut(m);
        return e = Ne(e), function() {
          return --e > 0 && (n = t.apply(this, arguments)), e <= 1 && (t = r), n;
        };
      }
      var Du = ye(function(e, t, n) {
        var l = B;
        if (n.length) {
          var u = wn(n, ul(Du));
          l |= w;
        }
        return pn(e, l, t, n, u);
      }), Ws = ye(function(e, t, n) {
        var l = B | K;
        if (n.length) {
          var u = wn(n, ul(Ws));
          l |= w;
        }
        return pn(t, l, e, n, u);
      });
      function Gs(e, t, n) {
        t = n ? r : t;
        var l = pn(e, me, r, r, r, r, r, t);
        return l.placeholder = Gs.placeholder, l;
      }
      function Zs(e, t, n) {
        t = n ? r : t;
        var l = pn(e, te, r, r, r, r, r, t);
        return l.placeholder = Zs.placeholder, l;
      }
      function Hs(e, t, n) {
        var l, u, a, c, g, y, C = 0, O = !1, S = !1, W = !0;
        if (typeof e != "function")
          throw new Ut(m);
        t = Rt(t) || 0, qe(n) && (O = !!n.leading, S = "maxWait" in n, a = S ? st(Rt(n.maxWait) || 0, t) : a, W = "trailing" in n ? !!n.trailing : W);
        function $(nt) {
          var Jt = l, _n = u;
          return l = u = r, C = nt, c = e.apply(_n, Jt), c;
        }
        function oe(nt) {
          return C = nt, g = hl(_e, t), O ? $(nt) : c;
        }
        function pe(nt) {
          var Jt = nt - y, _n = nt - C, di = t - Jt;
          return S ? pt(di, a - _n) : di;
        }
        function se(nt) {
          var Jt = nt - y, _n = nt - C;
          return y === r || Jt >= t || Jt < 0 || S && _n >= a;
        }
        function _e() {
          var nt = Mr();
          if (se(nt))
            return ve(nt);
          g = hl(_e, pe(nt));
        }
        function ve(nt) {
          return g = r, W && l ? $(nt) : (l = u = r, c);
        }
        function bt() {
          g !== r && rs(g), C = 0, l = y = u = g = r;
        }
        function Yt() {
          return g === r ? c : ve(Mr());
        }
        function Ot() {
          var nt = Mr(), Jt = se(nt);
          if (l = arguments, u = this, y = nt, Jt) {
            if (g === r)
              return oe(y);
            if (S)
              return rs(g), g = hl(_e, t), $(y);
          }
          return g === r && (g = hl(_e, t)), c;
        }
        return Ot.cancel = bt, Ot.flush = Yt, Ot;
      }
      var hg = ye(function(e, t) {
        return Bo(e, 1, t);
      }), Yg = ye(function(e, t, n) {
        return Bo(e, Rt(t) || 0, n);
      });
      function vg(e) {
        return pn(e, Ue);
      }
      function fr(e, t) {
        if (typeof e != "function" || t != null && typeof t != "function")
          throw new Ut(m);
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
      function dr(e) {
        if (typeof e != "function")
          throw new Ut(m);
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
      function Ig(e) {
        return Rs(2, e);
      }
      var wg = df(function(e, t) {
        t = t.length == 1 && de(t[0]) ? Ze(t[0], xt(re())) : Ze(ft(t, 1), xt(re()));
        var n = t.length;
        return ye(function(l) {
          for (var u = -1, a = pt(l.length, n); ++u < a; )
            l[u] = t[u].call(this, l[u]);
          return Lt(e, this, l);
        });
      }), _u = ye(function(e, t) {
        var n = wn(t, ul(_u));
        return pn(e, w, r, t, n);
      }), Ks = ye(function(e, t) {
        var n = wn(t, ul(Ks));
        return pn(e, P, r, t, n);
      }), Ag = jn(function(e, t) {
        return pn(e, ge, r, r, r, t);
      });
      function Tg(e, t) {
        if (typeof e != "function")
          throw new Ut(m);
        return t = t === r ? t : Ne(t), ye(e, t);
      }
      function Lg(e, t) {
        if (typeof e != "function")
          throw new Ut(m);
        return t = t == null ? 0 : st(Ne(t), 0), ye(function(n) {
          var l = n[t], u = En(n, 0, t);
          return l && In(u, l), Lt(e, this, u);
        });
      }
      function xg(e, t, n) {
        var l = !0, u = !0;
        if (typeof e != "function")
          throw new Ut(m);
        return qe(n) && (l = "leading" in n ? !!n.leading : l, u = "trailing" in n ? !!n.trailing : u), Hs(e, t, {
          leading: l,
          maxWait: t,
          trailing: u
        });
      }
      function Eg(e) {
        return Fs(e, 1);
      }
      function Cg(e, t) {
        return _u(uu(t), e);
      }
      function bg() {
        if (!arguments.length)
          return [];
        var e = arguments[0];
        return de(e) ? e : [e];
      }
      function Og(e) {
        return Pt(e, E);
      }
      function Sg(e, t) {
        return t = typeof t == "function" ? t : r, Pt(e, E, t);
      }
      function Bg(e) {
        return Pt(e, Y | E);
      }
      function kg(e, t) {
        return t = typeof t == "function" ? t : r, Pt(e, Y | E, t);
      }
      function Ug(e, t) {
        return t == null || So(e, t, at(t));
      }
      function $t(e, t) {
        return e === t || e !== e && t !== t;
      }
      var Qg = ur(Zr), Pg = ur(function(e, t) {
        return e >= t;
      }), Rn = Vo(function() {
        return arguments;
      }()) ? Vo : function(e) {
        return Je(e) && Se.call(e, "callee") && !Ao.call(e, "callee");
      }, de = v.isArray, Vg = io ? xt(io) : KM;
      function wt(e) {
        return e != null && gr(e.length) && !yn(e);
      }
      function tt(e) {
        return Je(e) && wt(e);
      }
      function Fg(e) {
        return e === !0 || e === !1 || Je(e) && mt(e) == rt;
      }
      var Cn = nM || Eu, Rg = ao ? xt(ao) : qM;
      function Wg(e) {
        return Je(e) && e.nodeType === 1 && !Yl(e);
      }
      function Gg(e) {
        if (e == null)
          return !0;
        if (wt(e) && (de(e) || typeof e == "string" || typeof e.splice == "function" || Cn(e) || ol(e) || Rn(e)))
          return !e.length;
        var t = jt(e);
        if (t == gt || t == Ve)
          return !e.size;
        if (ml(e))
          return !qr(e).length;
        for (var n in e)
          if (Se.call(e, n))
            return !1;
        return !0;
      }
      function Zg(e, t) {
        return yl(e, t);
      }
      function Hg(e, t, n) {
        n = typeof n == "function" ? n : r;
        var l = n ? n(e, t) : r;
        return l === r ? yl(e, t, r, n) : !!l;
      }
      function mu(e) {
        if (!Je(e))
          return !1;
        var t = mt(e);
        return t == Zt || t == Gn || typeof e.message == "string" && typeof e.name == "string" && !Yl(e);
      }
      function Kg(e) {
        return typeof e == "number" && Lo(e);
      }
      function yn(e) {
        if (!qe(e))
          return !1;
        var t = mt(e);
        return t == fn || t == On || t == it || t == Xe;
      }
      function qs(e) {
        return typeof e == "number" && e == Ne(e);
      }
      function gr(e) {
        return typeof e == "number" && e > -1 && e % 1 == 0 && e <= L;
      }
      function qe(e) {
        var t = typeof e;
        return e != null && (t == "object" || t == "function");
      }
      function Je(e) {
        return e != null && typeof e == "object";
      }
      var $s = co ? xt(co) : JM;
      function qg(e, t) {
        return e === t || Kr(e, t, fu(t));
      }
      function $g(e, t, n) {
        return n = typeof n == "function" ? n : r, Kr(e, t, fu(t), n);
      }
      function Jg(e) {
        return Js(e) && e != +e;
      }
      function Xg(e) {
        if (Sf(e))
          throw new ce(p);
        return Fo(e);
      }
      function eN(e) {
        return e === null;
      }
      function tN(e) {
        return e == null;
      }
      function Js(e) {
        return typeof e == "number" || Je(e) && mt(e) == ln;
      }
      function Yl(e) {
        if (!Je(e) || mt(e) != Z)
          return !1;
        var t = Pl(e);
        if (t === null)
          return !0;
        var n = Se.call(t, "constructor") && t.constructor;
        return typeof n == "function" && n instanceof n && Bl.call(n) == qc;
      }
      var hu = Mo ? xt(Mo) : XM;
      function nN(e) {
        return qs(e) && e >= -L && e <= L;
      }
      var Xs = fo ? xt(fo) : ef;
      function Nr(e) {
        return typeof e == "string" || !de(e) && Je(e) && mt(e) == ct;
      }
      function Ct(e) {
        return typeof e == "symbol" || Je(e) && mt(e) == St;
      }
      var ol = go ? xt(go) : tf;
      function lN(e) {
        return e === r;
      }
      function rN(e) {
        return Je(e) && jt(e) == Ht;
      }
      function uN(e) {
        return Je(e) && mt(e) == Zn;
      }
      var oN = ur($r), sN = ur(function(e, t) {
        return e <= t;
      });
      function ei(e) {
        if (!e)
          return [];
        if (wt(e))
          return Nr(e) ? Kt(e) : It(e);
        if (Ml && e[Ml])
          return kc(e[Ml]());
        var t = jt(e), n = t == gt ? kr : t == Ve ? bl : sl;
        return n(e);
      }
      function Dn(e) {
        if (!e)
          return e === 0 ? e : 0;
        if (e = Rt(e), e === I || e === -I) {
          var t = e < 0 ? -1 : 1;
          return t * J;
        }
        return e === e ? e : 0;
      }
      function Ne(e) {
        var t = Dn(e), n = t % 1;
        return t === t ? n ? t - n : t : 0;
      }
      function ti(e) {
        return e ? Qn(Ne(e), 0, De) : 0;
      }
      function Rt(e) {
        if (typeof e == "number")
          return e;
        if (Ct(e))
          return ae;
        if (qe(e)) {
          var t = typeof e.valueOf == "function" ? e.valueOf() : e;
          e = qe(t) ? t + "" : t;
        }
        if (typeof e != "string")
          return e === 0 ? e : +e;
        e = Do(e);
        var n = Pa.test(e);
        return n || Fa.test(e) ? _c(e.slice(2), n ? 2 : 8) : Qa.test(e) ? ae : +e;
      }
      function ni(e) {
        return sn(e, At(e));
      }
      function iN(e) {
        return e ? Qn(Ne(e), -L, L) : e === 0 ? e : 0;
      }
      function Ee(e) {
        return e == null ? "" : Et(e);
      }
      var aN = ll(function(e, t) {
        if (ml(t) || wt(t)) {
          sn(t, at(t), e);
          return;
        }
        for (var n in t)
          Se.call(t, n) && pl(e, n, t[n]);
      }), li = ll(function(e, t) {
        sn(t, At(t), e);
      }), pr = ll(function(e, t, n, l) {
        sn(t, At(t), e, l);
      }), cN = ll(function(e, t, n, l) {
        sn(t, at(t), e, l);
      }), MN = jn(Rr);
      function fN(e, t) {
        var n = nl(e);
        return t == null ? n : Oo(n, t);
      }
      var dN = ye(function(e, t) {
        e = Pe(e);
        var n = -1, l = t.length, u = l > 2 ? t[2] : r;
        for (u && ht(t[0], t[1], u) && (l = 1); ++n < l; )
          for (var a = t[n], c = At(a), g = -1, y = c.length; ++g < y; ) {
            var C = c[g], O = e[C];
            (O === r || $t(O, Xn[C]) && !Se.call(e, C)) && (e[C] = a[C]);
          }
        return e;
      }), gN = ye(function(e) {
        return e.push(r, Ds), Lt(ri, r, e);
      });
      function NN(e, t) {
        return po(e, re(t, 3), on);
      }
      function pN(e, t) {
        return po(e, re(t, 3), Gr);
      }
      function jN(e, t) {
        return e == null ? e : Wr(e, re(t, 3), At);
      }
      function zN(e, t) {
        return e == null ? e : Qo(e, re(t, 3), At);
      }
      function yN(e, t) {
        return e && on(e, re(t, 3));
      }
      function DN(e, t) {
        return e && Gr(e, re(t, 3));
      }
      function _N(e) {
        return e == null ? [] : $l(e, at(e));
      }
      function mN(e) {
        return e == null ? [] : $l(e, At(e));
      }
      function Yu(e, t, n) {
        var l = e == null ? r : Pn(e, t);
        return l === r ? n : l;
      }
      function hN(e, t) {
        return e != null && hs(e, t, WM);
      }
      function vu(e, t) {
        return e != null && hs(e, t, GM);
      }
      var YN = Ns(function(e, t, n) {
        t != null && typeof t.toString != "function" && (t = kl.call(t)), e[t] = n;
      }, wu(Tt)), vN = Ns(function(e, t, n) {
        t != null && typeof t.toString != "function" && (t = kl.call(t)), Se.call(e, t) ? e[t].push(n) : e[t] = [n];
      }, re), IN = ye(zl);
      function at(e) {
        return wt(e) ? Co(e) : qr(e);
      }
      function At(e) {
        return wt(e) ? Co(e, !0) : nf(e);
      }
      function wN(e, t) {
        var n = {};
        return t = re(t, 3), on(e, function(l, u, a) {
          Nn(n, t(l, u, a), l);
        }), n;
      }
      function AN(e, t) {
        var n = {};
        return t = re(t, 3), on(e, function(l, u, a) {
          Nn(n, u, t(l, u, a));
        }), n;
      }
      var TN = ll(function(e, t, n) {
        Jl(e, t, n);
      }), ri = ll(function(e, t, n, l) {
        Jl(e, t, n, l);
      }), LN = jn(function(e, t) {
        var n = {};
        if (e == null)
          return n;
        var l = !1;
        t = Ze(t, function(a) {
          return a = xn(a, e), l || (l = a.length > 1), a;
        }), sn(e, cu(e), n), l && (n = Pt(n, Y | b | E, Yf));
        for (var u = t.length; u--; )
          nu(n, t[u]);
        return n;
      });
      function xN(e, t) {
        return ui(e, dr(re(t)));
      }
      var EN = jn(function(e, t) {
        return e == null ? {} : rf(e, t);
      });
      function ui(e, t) {
        if (e == null)
          return {};
        var n = Ze(cu(e), function(l) {
          return [l];
        });
        return t = re(t), qo(e, n, function(l, u) {
          return t(l, u[0]);
        });
      }
      function CN(e, t, n) {
        t = xn(t, e);
        var l = -1, u = t.length;
        for (u || (u = 1, e = r); ++l < u; ) {
          var a = e == null ? r : e[an(t[l])];
          a === r && (l = u, a = n), e = yn(a) ? a.call(e) : a;
        }
        return e;
      }
      function bN(e, t, n) {
        return e == null ? e : Dl(e, t, n);
      }
      function ON(e, t, n, l) {
        return l = typeof l == "function" ? l : r, e == null ? e : Dl(e, t, n, l);
      }
      var oi = zs(at), si = zs(At);
      function SN(e, t, n) {
        var l = de(e), u = l || Cn(e) || ol(e);
        if (t = re(t, 4), n == null) {
          var a = e && e.constructor;
          u ? n = l ? new a() : [] : qe(e) ? n = yn(a) ? nl(Pl(e)) : {} : n = {};
        }
        return (u ? kt : on)(e, function(c, g, y) {
          return t(n, c, g, y);
        }), n;
      }
      function BN(e, t) {
        return e == null ? !0 : nu(e, t);
      }
      function kN(e, t, n) {
        return e == null ? e : ts(e, t, uu(n));
      }
      function UN(e, t, n, l) {
        return l = typeof l == "function" ? l : r, e == null ? e : ts(e, t, uu(n), l);
      }
      function sl(e) {
        return e == null ? [] : Br(e, at(e));
      }
      function QN(e) {
        return e == null ? [] : Br(e, At(e));
      }
      function PN(e, t, n) {
        return n === r && (n = t, t = r), n !== r && (n = Rt(n), n = n === n ? n : 0), t !== r && (t = Rt(t), t = t === t ? t : 0), Qn(Rt(e), t, n);
      }
      function VN(e, t, n) {
        return t = Dn(t), n === r ? (n = t, t = 0) : n = Dn(n), e = Rt(e), ZM(e, t, n);
      }
      function FN(e, t, n) {
        if (n && typeof n != "boolean" && ht(e, t, n) && (t = n = r), n === r && (typeof t == "boolean" ? (n = t, t = r) : typeof e == "boolean" && (n = e, e = r)), e === r && t === r ? (e = 0, t = 1) : (e = Dn(e), t === r ? (t = e, e = 0) : t = Dn(t)), e > t) {
          var l = e;
          e = t, t = l;
        }
        if (n || e % 1 || t % 1) {
          var u = xo();
          return pt(e + u * (t - e + Dc("1e-" + ((u + "").length - 1))), t);
        }
        return Xr(e, t);
      }
      var RN = rl(function(e, t, n) {
        return t = t.toLowerCase(), e + (n ? ii(t) : t);
      });
      function ii(e) {
        return Iu(Ee(e).toLowerCase());
      }
      function ai(e) {
        return e = Ee(e), e && e.replace(Wa, Cc).replace(cc, "");
      }
      function WN(e, t, n) {
        e = Ee(e), t = Et(t);
        var l = e.length;
        n = n === r ? l : Qn(Ne(n), 0, l);
        var u = n;
        return n -= t.length, n >= 0 && e.slice(n, u) == t;
      }
      function GN(e) {
        return e = Ee(e), e && va.test(e) ? e.replace(Uu, bc) : e;
      }
      function ZN(e) {
        return e = Ee(e), e && xa.test(e) ? e.replace(_r, "\\$&") : e;
      }
      var HN = rl(function(e, t, n) {
        return e + (n ? "-" : "") + t.toLowerCase();
      }), KN = rl(function(e, t, n) {
        return e + (n ? " " : "") + t.toLowerCase();
      }), qN = fs("toLowerCase");
      function $N(e, t, n) {
        e = Ee(e), t = Ne(t);
        var l = t ? $n(e) : 0;
        if (!t || l >= t)
          return e;
        var u = (t - l) / 2;
        return rr(Wl(u), n) + e + rr(Rl(u), n);
      }
      function JN(e, t, n) {
        e = Ee(e), t = Ne(t);
        var l = t ? $n(e) : 0;
        return t && l < t ? e + rr(t - l, n) : e;
      }
      function XN(e, t, n) {
        e = Ee(e), t = Ne(t);
        var l = t ? $n(e) : 0;
        return t && l < t ? rr(t - l, n) + e : e;
      }
      function ep(e, t, n) {
        return n || t == null ? t = 0 : t && (t = +t), oM(Ee(e).replace(mr, ""), t || 0);
      }
      function tp(e, t, n) {
        return (n ? ht(e, t, n) : t === r) ? t = 1 : t = Ne(t), eu(Ee(e), t);
      }
      function np() {
        var e = arguments, t = Ee(e[0]);
        return e.length < 3 ? t : t.replace(e[1], e[2]);
      }
      var lp = rl(function(e, t, n) {
        return e + (n ? "_" : "") + t.toLowerCase();
      });
      function rp(e, t, n) {
        return n && typeof n != "number" && ht(e, t, n) && (t = n = r), n = n === r ? De : n >>> 0, n ? (e = Ee(e), e && (typeof t == "string" || t != null && !hu(t)) && (t = Et(t), !t && qn(e)) ? En(Kt(e), 0, n) : e.split(t, n)) : [];
      }
      var up = rl(function(e, t, n) {
        return e + (n ? " " : "") + Iu(t);
      });
      function op(e, t, n) {
        return e = Ee(e), n = n == null ? 0 : Qn(Ne(n), 0, e.length), t = Et(t), e.slice(n, n + t.length) == t;
      }
      function sp(e, t, n) {
        var l = i.templateSettings;
        n && ht(e, t, n) && (t = r), e = Ee(e), t = pr({}, t, l, ys);
        var u = pr({}, t.imports, l.imports, ys), a = at(u), c = Br(u, a), g, y, C = 0, O = t.interpolate || Tl, S = "__p += '", W = Ur(
          (t.escape || Tl).source + "|" + O.source + "|" + (O === Qu ? Ua : Tl).source + "|" + (t.evaluate || Tl).source + "|$",
          "g"
        ), $ = "//# sourceURL=" + (Se.call(t, "sourceURL") ? (t.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++Nc + "]") + `
`;
        e.replace(W, function(se, _e, ve, bt, Yt, Ot) {
          return ve || (ve = bt), S += e.slice(C, Ot).replace(Ga, Oc), _e && (g = !0, S += `' +
__e(` + _e + `) +
'`), Yt && (y = !0, S += `';
` + Yt + `;
__p += '`), ve && (S += `' +
((__t = (` + ve + `)) == null ? '' : __t) +
'`), C = Ot + se.length, se;
        }), S += `';
`;
        var oe = Se.call(t, "variable") && t.variable;
        if (!oe)
          S = `with (obj) {
` + S + `
}
`;
        else if (Ba.test(oe))
          throw new ce(N);
        S = (y ? S.replace(_a, "") : S).replace(ma, "$1").replace(ha, "$1;"), S = "function(" + (oe || "obj") + `) {
` + (oe ? "" : `obj || (obj = {});
`) + "var __t, __p = ''" + (g ? ", __e = _.escape" : "") + (y ? `, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
` : `;
`) + S + `return __p
}`;
        var pe = Mi(function() {
          return xe(a, $ + "return " + S).apply(r, c);
        });
        if (pe.source = S, mu(pe))
          throw pe;
        return pe;
      }
      function ip(e) {
        return Ee(e).toLowerCase();
      }
      function ap(e) {
        return Ee(e).toUpperCase();
      }
      function cp(e, t, n) {
        if (e = Ee(e), e && (n || t === r))
          return Do(e);
        if (!e || !(t = Et(t)))
          return e;
        var l = Kt(e), u = Kt(t), a = _o(l, u), c = mo(l, u) + 1;
        return En(l, a, c).join("");
      }
      function Mp(e, t, n) {
        if (e = Ee(e), e && (n || t === r))
          return e.slice(0, Yo(e) + 1);
        if (!e || !(t = Et(t)))
          return e;
        var l = Kt(e), u = mo(l, Kt(t)) + 1;
        return En(l, 0, u).join("");
      }
      function fp(e, t, n) {
        if (e = Ee(e), e && (n || t === r))
          return e.replace(mr, "");
        if (!e || !(t = Et(t)))
          return e;
        var l = Kt(e), u = _o(l, Kt(t));
        return En(l, u).join("");
      }
      function dp(e, t) {
        var n = Ke, l = _t;
        if (qe(t)) {
          var u = "separator" in t ? t.separator : u;
          n = "length" in t ? Ne(t.length) : n, l = "omission" in t ? Et(t.omission) : l;
        }
        e = Ee(e);
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
            var C, O = y;
            for (u.global || (u = Ur(u.source, Ee(Pu.exec(u)) + "g")), u.lastIndex = 0; C = u.exec(O); )
              var S = C.index;
            y = y.slice(0, S === r ? g : S);
          }
        } else if (e.indexOf(Et(u), g) != g) {
          var W = y.lastIndexOf(u);
          W > -1 && (y = y.slice(0, W));
        }
        return y + l;
      }
      function gp(e) {
        return e = Ee(e), e && Ya.test(e) ? e.replace(ku, Vc) : e;
      }
      var Np = rl(function(e, t, n) {
        return e + (n ? " " : "") + t.toUpperCase();
      }), Iu = fs("toUpperCase");
      function ci(e, t, n) {
        return e = Ee(e), t = n ? r : t, t === r ? Bc(e) ? Wc(e) : Ac(e) : e.match(t) || [];
      }
      var Mi = ye(function(e, t) {
        try {
          return Lt(e, r, t);
        } catch (n) {
          return mu(n) ? n : new ce(n);
        }
      }), pp = jn(function(e, t) {
        return kt(t, function(n) {
          n = an(n), Nn(e, n, Du(e[n], e));
        }), e;
      });
      function jp(e) {
        var t = e == null ? 0 : e.length, n = re();
        return e = t ? Ze(e, function(l) {
          if (typeof l[1] != "function")
            throw new Ut(m);
          return [n(l[0]), l[1]];
        }) : [], ye(function(l) {
          for (var u = -1; ++u < t; ) {
            var a = e[u];
            if (Lt(a[0], this, l))
              return Lt(a[1], this, l);
          }
        });
      }
      function zp(e) {
        return VM(Pt(e, Y));
      }
      function wu(e) {
        return function() {
          return e;
        };
      }
      function yp(e, t) {
        return e == null || e !== e ? t : e;
      }
      var Dp = gs(), _p = gs(!0);
      function Tt(e) {
        return e;
      }
      function Au(e) {
        return Ro(typeof e == "function" ? e : Pt(e, Y));
      }
      function mp(e) {
        return Go(Pt(e, Y));
      }
      function hp(e, t) {
        return Zo(e, Pt(t, Y));
      }
      var Yp = ye(function(e, t) {
        return function(n) {
          return zl(n, e, t);
        };
      }), vp = ye(function(e, t) {
        return function(n) {
          return zl(e, n, t);
        };
      });
      function Tu(e, t, n) {
        var l = at(t), u = $l(t, l);
        n == null && !(qe(t) && (u.length || !l.length)) && (n = t, t = e, e = this, u = $l(t, at(t)));
        var a = !(qe(n) && "chain" in n) || !!n.chain, c = yn(e);
        return kt(u, function(g) {
          var y = t[g];
          e[g] = y, c && (e.prototype[g] = function() {
            var C = this.__chain__;
            if (a || C) {
              var O = e(this.__wrapped__), S = O.__actions__ = It(this.__actions__);
              return S.push({ func: y, args: arguments, thisArg: e }), O.__chain__ = C, O;
            }
            return y.apply(e, In([this.value()], arguments));
          });
        }), e;
      }
      function Ip() {
        return Mt._ === this && (Mt._ = $c), this;
      }
      function Lu() {
      }
      function wp(e) {
        return e = Ne(e), ye(function(t) {
          return Ho(t, e);
        });
      }
      var Ap = su(Ze), Tp = su(No), Lp = su(Er);
      function fi(e) {
        return gu(e) ? Cr(an(e)) : uf(e);
      }
      function xp(e) {
        return function(t) {
          return e == null ? r : Pn(e, t);
        };
      }
      var Ep = ps(), Cp = ps(!0);
      function xu() {
        return [];
      }
      function Eu() {
        return !1;
      }
      function bp() {
        return {};
      }
      function Op() {
        return "";
      }
      function Sp() {
        return !0;
      }
      function Bp(e, t) {
        if (e = Ne(e), e < 1 || e > L)
          return [];
        var n = De, l = pt(e, De);
        t = re(t), e -= De;
        for (var u = Sr(l, t); ++n < e; )
          t(n);
        return u;
      }
      function kp(e) {
        return de(e) ? Ze(e, an) : Ct(e) ? [e] : It(Es(Ee(e)));
      }
      function Up(e) {
        var t = ++Kc;
        return Ee(e) + t;
      }
      var Qp = lr(function(e, t) {
        return e + t;
      }, 0), Pp = iu("ceil"), Vp = lr(function(e, t) {
        return e / t;
      }, 1), Fp = iu("floor");
      function Rp(e) {
        return e && e.length ? ql(e, Tt, Zr) : r;
      }
      function Wp(e, t) {
        return e && e.length ? ql(e, re(t, 2), Zr) : r;
      }
      function Gp(e) {
        return zo(e, Tt);
      }
      function Zp(e, t) {
        return zo(e, re(t, 2));
      }
      function Hp(e) {
        return e && e.length ? ql(e, Tt, $r) : r;
      }
      function Kp(e, t) {
        return e && e.length ? ql(e, re(t, 2), $r) : r;
      }
      var qp = lr(function(e, t) {
        return e * t;
      }, 1), $p = iu("round"), Jp = lr(function(e, t) {
        return e - t;
      }, 0);
      function Xp(e) {
        return e && e.length ? Or(e, Tt) : 0;
      }
      function ej(e, t) {
        return e && e.length ? Or(e, re(t, 2)) : 0;
      }
      return i.after = mg, i.ary = Fs, i.assign = aN, i.assignIn = li, i.assignInWith = pr, i.assignWith = cN, i.at = MN, i.before = Rs, i.bind = Du, i.bindAll = pp, i.bindKey = Ws, i.castArray = bg, i.chain = Qs, i.chunk = Ff, i.compact = Rf, i.concat = Wf, i.cond = jp, i.conforms = zp, i.constant = wu, i.countBy = Xd, i.create = fN, i.curry = Gs, i.curryRight = Zs, i.debounce = Hs, i.defaults = dN, i.defaultsDeep = gN, i.defer = hg, i.delay = Yg, i.difference = Gf, i.differenceBy = Zf, i.differenceWith = Hf, i.drop = Kf, i.dropRight = qf, i.dropRightWhile = $f, i.dropWhile = Jf, i.fill = Xf, i.filter = tg, i.flatMap = rg, i.flatMapDeep = ug, i.flatMapDepth = og, i.flatten = Ss, i.flattenDeep = ed, i.flattenDepth = td, i.flip = vg, i.flow = Dp, i.flowRight = _p, i.fromPairs = nd, i.functions = _N, i.functionsIn = mN, i.groupBy = sg, i.initial = rd, i.intersection = ud, i.intersectionBy = od, i.intersectionWith = sd, i.invert = YN, i.invertBy = vN, i.invokeMap = ag, i.iteratee = Au, i.keyBy = cg, i.keys = at, i.keysIn = At, i.map = cr, i.mapKeys = wN, i.mapValues = AN, i.matches = mp, i.matchesProperty = hp, i.memoize = fr, i.merge = TN, i.mergeWith = ri, i.method = Yp, i.methodOf = vp, i.mixin = Tu, i.negate = dr, i.nthArg = wp, i.omit = LN, i.omitBy = xN, i.once = Ig, i.orderBy = Mg, i.over = Ap, i.overArgs = wg, i.overEvery = Tp, i.overSome = Lp, i.partial = _u, i.partialRight = Ks, i.partition = fg, i.pick = EN, i.pickBy = ui, i.property = fi, i.propertyOf = xp, i.pull = Md, i.pullAll = ks, i.pullAllBy = fd, i.pullAllWith = dd, i.pullAt = gd, i.range = Ep, i.rangeRight = Cp, i.rearg = Ag, i.reject = Ng, i.remove = Nd, i.rest = Tg, i.reverse = zu, i.sampleSize = jg, i.set = bN, i.setWith = ON, i.shuffle = zg, i.slice = pd, i.sortBy = _g, i.sortedUniq = hd, i.sortedUniqBy = Yd, i.split = rp, i.spread = Lg, i.tail = vd, i.take = Id, i.takeRight = wd, i.takeRightWhile = Ad, i.takeWhile = Td, i.tap = Rd, i.throttle = xg, i.thru = ar, i.toArray = ei, i.toPairs = oi, i.toPairsIn = si, i.toPath = kp, i.toPlainObject = ni, i.transform = SN, i.unary = Eg, i.union = Ld, i.unionBy = xd, i.unionWith = Ed, i.uniq = Cd, i.uniqBy = bd, i.uniqWith = Od, i.unset = BN, i.unzip = yu, i.unzipWith = Us, i.update = kN, i.updateWith = UN, i.values = sl, i.valuesIn = QN, i.without = Sd, i.words = ci, i.wrap = Cg, i.xor = Bd, i.xorBy = kd, i.xorWith = Ud, i.zip = Qd, i.zipObject = Pd, i.zipObjectDeep = Vd, i.zipWith = Fd, i.entries = oi, i.entriesIn = si, i.extend = li, i.extendWith = pr, Tu(i, i), i.add = Qp, i.attempt = Mi, i.camelCase = RN, i.capitalize = ii, i.ceil = Pp, i.clamp = PN, i.clone = Og, i.cloneDeep = Bg, i.cloneDeepWith = kg, i.cloneWith = Sg, i.conformsTo = Ug, i.deburr = ai, i.defaultTo = yp, i.divide = Vp, i.endsWith = WN, i.eq = $t, i.escape = GN, i.escapeRegExp = ZN, i.every = eg, i.find = ng, i.findIndex = bs, i.findKey = NN, i.findLast = lg, i.findLastIndex = Os, i.findLastKey = pN, i.floor = Fp, i.forEach = Ps, i.forEachRight = Vs, i.forIn = jN, i.forInRight = zN, i.forOwn = yN, i.forOwnRight = DN, i.get = Yu, i.gt = Qg, i.gte = Pg, i.has = hN, i.hasIn = vu, i.head = Bs, i.identity = Tt, i.includes = ig, i.indexOf = ld, i.inRange = VN, i.invoke = IN, i.isArguments = Rn, i.isArray = de, i.isArrayBuffer = Vg, i.isArrayLike = wt, i.isArrayLikeObject = tt, i.isBoolean = Fg, i.isBuffer = Cn, i.isDate = Rg, i.isElement = Wg, i.isEmpty = Gg, i.isEqual = Zg, i.isEqualWith = Hg, i.isError = mu, i.isFinite = Kg, i.isFunction = yn, i.isInteger = qs, i.isLength = gr, i.isMap = $s, i.isMatch = qg, i.isMatchWith = $g, i.isNaN = Jg, i.isNative = Xg, i.isNil = tN, i.isNull = eN, i.isNumber = Js, i.isObject = qe, i.isObjectLike = Je, i.isPlainObject = Yl, i.isRegExp = hu, i.isSafeInteger = nN, i.isSet = Xs, i.isString = Nr, i.isSymbol = Ct, i.isTypedArray = ol, i.isUndefined = lN, i.isWeakMap = rN, i.isWeakSet = uN, i.join = id, i.kebabCase = HN, i.last = Ft, i.lastIndexOf = ad, i.lowerCase = KN, i.lowerFirst = qN, i.lt = oN, i.lte = sN, i.max = Rp, i.maxBy = Wp, i.mean = Gp, i.meanBy = Zp, i.min = Hp, i.minBy = Kp, i.stubArray = xu, i.stubFalse = Eu, i.stubObject = bp, i.stubString = Op, i.stubTrue = Sp, i.multiply = qp, i.nth = cd, i.noConflict = Ip, i.noop = Lu, i.now = Mr, i.pad = $N, i.padEnd = JN, i.padStart = XN, i.parseInt = ep, i.random = FN, i.reduce = dg, i.reduceRight = gg, i.repeat = tp, i.replace = np, i.result = CN, i.round = $p, i.runInContext = j, i.sample = pg, i.size = yg, i.snakeCase = lp, i.some = Dg, i.sortedIndex = jd, i.sortedIndexBy = zd, i.sortedIndexOf = yd, i.sortedLastIndex = Dd, i.sortedLastIndexBy = _d, i.sortedLastIndexOf = md, i.startCase = up, i.startsWith = op, i.subtract = Jp, i.sum = Xp, i.sumBy = ej, i.template = sp, i.times = Bp, i.toFinite = Dn, i.toInteger = Ne, i.toLength = ti, i.toLower = ip, i.toNumber = Rt, i.toSafeInteger = iN, i.toString = Ee, i.toUpper = ap, i.trim = cp, i.trimEnd = Mp, i.trimStart = fp, i.truncate = dp, i.unescape = gp, i.uniqueId = Up, i.upperCase = Np, i.upperFirst = Iu, i.each = Ps, i.eachRight = Vs, i.first = Bs, Tu(i, function() {
        var e = {};
        return on(i, function(t, n) {
          Se.call(i.prototype, n) || (e[n] = t);
        }), e;
      }(), { chain: !1 }), i.VERSION = o, kt(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(e) {
        i[e].placeholder = i;
      }), kt(["drop", "take"], function(e, t) {
        he.prototype[e] = function(n) {
          n = n === r ? 1 : st(Ne(n), 0);
          var l = this.__filtered__ && !t ? new he(this) : this.clone();
          return l.__filtered__ ? l.__takeCount__ = pt(n, l.__takeCount__) : l.__views__.push({
            size: pt(n, De),
            type: e + (l.__dir__ < 0 ? "Right" : "")
          }), l;
        }, he.prototype[e + "Right"] = function(n) {
          return this.reverse()[e](n).reverse();
        };
      }), kt(["filter", "map", "takeWhile"], function(e, t) {
        var n = t + 1, l = n == nn || n == Wt;
        he.prototype[e] = function(u) {
          var a = this.clone();
          return a.__iteratees__.push({
            iteratee: re(u, 3),
            type: n
          }), a.__filtered__ = a.__filtered__ || l, a;
        };
      }), kt(["head", "last"], function(e, t) {
        var n = "take" + (t ? "Right" : "");
        he.prototype[e] = function() {
          return this[n](1).value()[0];
        };
      }), kt(["initial", "tail"], function(e, t) {
        var n = "drop" + (t ? "" : "Right");
        he.prototype[e] = function() {
          return this.__filtered__ ? new he(this) : this[n](1);
        };
      }), he.prototype.compact = function() {
        return this.filter(Tt);
      }, he.prototype.find = function(e) {
        return this.filter(e).head();
      }, he.prototype.findLast = function(e) {
        return this.reverse().find(e);
      }, he.prototype.invokeMap = ye(function(e, t) {
        return typeof e == "function" ? new he(this) : this.map(function(n) {
          return zl(n, e, t);
        });
      }), he.prototype.reject = function(e) {
        return this.filter(dr(re(e)));
      }, he.prototype.slice = function(e, t) {
        e = Ne(e);
        var n = this;
        return n.__filtered__ && (e > 0 || t < 0) ? new he(n) : (e < 0 ? n = n.takeRight(-e) : e && (n = n.drop(e)), t !== r && (t = Ne(t), n = t < 0 ? n.dropRight(-t) : n.take(t - e)), n);
      }, he.prototype.takeRightWhile = function(e) {
        return this.reverse().takeWhile(e).reverse();
      }, he.prototype.toArray = function() {
        return this.take(De);
      }, on(he.prototype, function(e, t) {
        var n = /^(?:filter|find|map|reject)|While$/.test(t), l = /^(?:head|last)$/.test(t), u = i[l ? "take" + (t == "last" ? "Right" : "") : t], a = l || /^find/.test(t);
        u && (i.prototype[t] = function() {
          var c = this.__wrapped__, g = l ? [1] : arguments, y = c instanceof he, C = g[0], O = y || de(c), S = function(_e) {
            var ve = u.apply(i, In([_e], g));
            return l && W ? ve[0] : ve;
          };
          O && n && typeof C == "function" && C.length != 1 && (y = O = !1);
          var W = this.__chain__, $ = !!this.__actions__.length, oe = a && !W, pe = y && !$;
          if (!a && O) {
            c = pe ? c : new he(this);
            var se = e.apply(c, g);
            return se.__actions__.push({ func: ar, args: [S], thisArg: r }), new Qt(se, W);
          }
          return oe && pe ? e.apply(this, g) : (se = this.thru(S), oe ? l ? se.value()[0] : se.value() : se);
        });
      }), kt(["pop", "push", "shift", "sort", "splice", "unshift"], function(e) {
        var t = Ol[e], n = /^(?:push|sort|unshift)$/.test(e) ? "tap" : "thru", l = /^(?:pop|shift)$/.test(e);
        i.prototype[e] = function() {
          var u = arguments;
          if (l && !this.__chain__) {
            var a = this.value();
            return t.apply(de(a) ? a : [], u);
          }
          return this[n](function(c) {
            return t.apply(de(c) ? c : [], u);
          });
        };
      }), on(he.prototype, function(e, t) {
        var n = i[t];
        if (n) {
          var l = n.name + "";
          Se.call(tl, l) || (tl[l] = []), tl[l].push({ name: t, func: n });
        }
      }), tl[nr(r, K).name] = [{
        name: "wrapper",
        func: r
      }], he.prototype.clone = dM, he.prototype.reverse = gM, he.prototype.value = NM, i.prototype.at = Wd, i.prototype.chain = Gd, i.prototype.commit = Zd, i.prototype.next = Hd, i.prototype.plant = qd, i.prototype.reverse = $d, i.prototype.toJSON = i.prototype.valueOf = i.prototype.value = Jd, i.prototype.first = i.prototype.head, Ml && (i.prototype[Ml] = Kd), i;
    }, Jn = Gc();
    Sn ? ((Sn.exports = Jn)._ = Jn, Ar._ = Jn) : Mt._ = Jn;
  }).call(vl);
})(jr, jr.exports);
var Dt = jr.exports;
const gj = {
  name: "ElPlusFormBtn",
  inheritAttrs: !1,
  typeName: "btn",
  customOptions: {}
}, mn = /* @__PURE__ */ fe({
  ...gj,
  props: {
    field: {},
    rowIndex: {},
    loading: { type: Boolean },
    desc: {},
    formData: {}
  },
  setup(f) {
    const s = f, r = h(s.loading ?? !1), o = Ae(() => {
      var N;
      const m = Object.assign({}, Te(), s.desc, (N = s.desc) == null ? void 0 : N._attrs);
      return m.btnType && (m.type = m.btnType), m.plain || delete m.plain, m;
    }), D = Ae(() => {
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
            s.desc.on[N]({ row: Dt.cloneDeep(s.formData || {}), field: s.field, rowIndex: s.rowIndex });
          };
      return m;
    }), p = Ae(() => s.desc.btnLabel ? typeof s.desc.btnLabel == "function" ? s.desc.btnLabel(s.formData) : s.desc.btnLabel : s.desc.label ? typeof s.desc.label == "function" ? s.desc.label(s.formData) : s.desc.label : "");
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
        reference: U(() => [
          ie(d, ne({
            loading: r.value,
            size: s.desc.size || "small"
          }, o.value), en({ _: 2 }, [
            m.desc.label ? {
              name: "default",
              fn: U(() => [
                Be(Ce(p.value), 1)
              ]),
              key: "0"
            } : void 0
          ]), 1040, ["loading", "size"])
        ]),
        _: 1
      }, 8, ["onConfirm", "title"])) : (_(), R(d, ne({
        key: 1,
        loading: r.value,
        size: s.desc.size || "small"
      }, o.value, Le(D.value), {
        style: { pointerEvents: m.desc.isTag ? "none" : "all" }
      }), en({ _: 2 }, [
        s.desc.label ? {
          name: "default",
          fn: U(() => [
            Be(Ce(p.value), 1)
          ]),
          key: "0"
        } : void 0
      ]), 1040, ["loading", "size", "style"]));
    };
  }
}), Nj = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: mn }, Symbol.toStringTag, { value: "Module" })), pj = /* @__PURE__ */ Ie("i", { class: "ele-ArrowDown el-icon--right" }, null, -1), jj = {
  name: "ElPlusFormBtns",
  inheritAttrs: !1,
  typeName: "btns",
  customOptions: {}
}, Ai = /* @__PURE__ */ fe({
  ...jj,
  props: {
    field: {},
    rowIndex: {},
    desc: {},
    formData: {}
  },
  setup(f) {
    const s = f, r = h([]), o = h([]), D = Ae(() => {
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
    }), p = Ae(() => (M) => {
      const z = {};
      if (M && M.on)
        for (const Y in M.on)
          Y === "click" && M.confirm ? z[Y] = function() {
            oj.confirm(M.confirm, "提示", {
              type: "warning"
            }).then(() => {
              M.on[Y]({ row: s.formData, field: s.field, rowIndex: s.rowIndex });
            });
          } : z[Y] = function() {
            M.on[Y]({ row: s.formData, field: s.field, rowIndex: s.rowIndex });
          };
      return z;
    }), m = () => {
      const M = [];
      s.desc.btns.length > 0 && s.desc.btns.map((Y) => {
        N(Y) && M.push(Y);
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
      const Y = F("el-button"), b = F("el-dropdown-item"), E = F("el-dropdown-menu"), x = F("el-dropdown");
      return _(), V("div", {
        class: "el-plus-form-btn-group",
        style: yt({ "justify-content": D.value })
      }, [
        (_(!0), V(Ye, null, we(r.value, (Q, B) => (_(), R(mn, {
          key: B + (Q.label || Q.title || ""),
          type: "primary",
          field: M.field,
          desc: Q || {},
          formData: M.formData,
          plain: (Q && Q.plain) ?? M.desc.plain ?? !0,
          text: M.desc.text,
          rowIndex: M.rowIndex
        }, null, 8, ["field", "desc", "formData", "plain", "text", "rowIndex"]))), 128)),
        o.value && o.value.length > 0 ? (_(), R(x, {
          key: 0,
          class: "group-menu-btn",
          size: M.desc.size || "small"
        }, {
          dropdown: U(() => [
            ie(E, null, {
              default: U(() => [
                (_(!0), V(Ye, null, we(o.value, (Q, B) => (_(), R(b, ne({
                  key: B + (Q.label || Q.title)
                }, Le(p.value(Q))), {
                  default: U(() => [
                    Be(Ce(Q.label || Q.title), 1)
                  ]),
                  _: 2
                }, 1040))), 128))
              ]),
              _: 1
            })
          ]),
          default: U(() => [
            ie(Y, {
              type: "primary",
              size: M.desc.size || "small",
              plain: M.desc.plain ?? !0
            }, {
              default: U(() => [
                Be(" 更多"),
                pj
              ]),
              _: 1
            }, 8, ["size", "plain"])
          ]),
          _: 1
        }, 8, ["size"])) : Me("", !0)
      ], 4);
    };
  }
});
const zj = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: Ai }, Symbol.toStringTag, { value: "Module" })), yj = {
  name: "ElPlusFormCascader",
  inheritAttrs: !1,
  typeName: "cascader",
  customOptions: {}
}, Dj = /* @__PURE__ */ fe({
  ...yj,
  props: {
    modelValue: {},
    field: {},
    desc: {},
    formData: {}
  },
  emits: ["update:modelValue"],
  setup(f, { emit: s }) {
    const r = f, o = We("globalData"), D = h(typeof r.modelValue == "string" ? [r.modelValue] : r.modelValue);
    s("update:modelValue", D);
    const p = h({}), m = h(ke(r)), N = lt([]);
    return be(async () => {
      p.value = await Oe(r, { clearable: !0, props: { value: "value", label: "label", children: "children", checkStrictly: !!r.desc.checkStrictly }, ...Te() });
    }), He(
      () => r.desc.options,
      async (d) => {
        typeof d == "string" ? N.splice(0, N.length, ...o[d] || []) : typeof d == "function" ? N.splice(0, N.length, ...await d(r.formData)) : Array.isArray(d) ? d && N && !Dt.isEqual(d, N) && N.splice(0, N.length, ...d) : N.splice(0, N.length);
      },
      { immediate: !0 }
    ), (d, M) => {
      const z = F("el-cascader");
      return _(), R(z, ne({ class: "ElPlusFormCascader-panel" }, p.value, Le(m.value), {
        options: N,
        modelValue: D.value,
        "onUpdate:modelValue": M[0] || (M[0] = (Y) => D.value = Y)
      }), null, 16, ["options", "modelValue"]);
    };
  }
});
const Ti = /* @__PURE__ */ Ge(Dj, [["__scopeId", "data-v-ab6b4aed"]]), _j = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: Ti }, Symbol.toStringTag, { value: "Module" })), mj = {
  name: "ElPlusFormCascaderPanel",
  inheritAttrs: !1,
  typeName: "cascaderPanel",
  customOptions: {}
}, hj = /* @__PURE__ */ fe({
  ...mj,
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
    const D = h(Object.assign({}, Mn(), r.desc.slots)), p = h({}), m = h(ke(r));
    return be(async () => {
      p.value = await Oe(r, {
        props: { value: "value", label: "label", children: "children" },
        fetchSuggestions(N, d) {
          d([]);
        },
        ...Te()
      });
    }), (N, d) => {
      const M = F("el-cascader-panel");
      return _(), R(M, ne({ class: "ElPlusFormCascaderPanel-panel" }, p.value, Le(m.value), {
        options: r.desc.options,
        modelValue: o.value,
        "onUpdate:modelValue": d[0] || (d[0] = (z) => o.value = z)
      }), en({ _: 2 }, [
        we(D.value, (z, Y, b) => ({
          name: Y,
          fn: U((E) => [
            $e(N.$slots, Y, { data: E }, void 0, !0)
          ])
        }))
      ]), 1040, ["options", "modelValue"]);
    };
  }
});
const Li = /* @__PURE__ */ Ge(hj, [["__scopeId", "data-v-2c8fbcd6"]]), Yj = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: Li }, Symbol.toStringTag, { value: "Module" })), vj = {
  name: "ElPlusFormCheckbox",
  inheritAttrs: !1,
  typeName: "checkbox",
  customOptions: {}
}, Ij = /* @__PURE__ */ fe({
  ...vj,
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
    const D = h({}), p = h(ke(r));
    return be(async () => {
      D.value = await Oe(r, { ...Te() });
    }), (m, N) => {
      const d = F("el-checkbox"), M = F("el-checkbox-group");
      return _(), R(M, ne({ class: "ElPlusFormCheckbox-panel" }, D.value, Le(p.value), {
        modelValue: o.value,
        "onUpdate:modelValue": N[0] || (N[0] = (z) => o.value = z)
      }), {
        default: U(() => [
          (_(!0), V(Ye, null, we(m.desc.options, (z) => (_(), R(d, ne({
            key: z.value,
            label: z.value
          }, z.attrs), {
            default: U(() => [
              Be(Ce(z.text), 1)
            ]),
            _: 2
          }, 1040, ["label"]))), 128))
        ]),
        _: 1
      }, 16, ["modelValue"]);
    };
  }
});
const xi = /* @__PURE__ */ Ge(Ij, [["__scopeId", "data-v-d9495439"]]), wj = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: xi }, Symbol.toStringTag, { value: "Module" })), Aj = {
  name: "ElPlusFormCheckboxButton",
  inheritAttrs: !1,
  typeName: "checkboxButton",
  customOptions: {}
}, Tj = /* @__PURE__ */ fe({
  ...Aj,
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
    const D = h({}), p = h(ke(r));
    return be(async () => {
      D.value = await Oe(r, { ...Te() });
    }), (m, N) => {
      const d = F("el-checkbox-button"), M = F("el-checkbox-group");
      return _(), R(M, ne({ class: "ElPlusFormCheckboxButton-panel" }, D.value, Le(p.value), {
        modelValue: o.value,
        "onUpdate:modelValue": N[0] || (N[0] = (z) => o.value = z)
      }), {
        default: U(() => [
          (_(!0), V(Ye, null, we(m.desc.options, (z) => (_(), R(d, ne({
            key: z.value,
            label: z.value
          }, z.attrs), {
            default: U(() => [
              Be(Ce(z.text), 1)
            ]),
            _: 2
          }, 1040, ["label"]))), 128))
        ]),
        _: 1
      }, 16, ["modelValue"]);
    };
  }
});
const Ei = /* @__PURE__ */ Ge(Tj, [["__scopeId", "data-v-01d22bc6"]]), Lj = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: Ei }, Symbol.toStringTag, { value: "Module" })), xj = {
  name: "ElPlusFormColor",
  inheritAttrs: !1,
  typeName: "color",
  customOptions: {}
}, Ej = /* @__PURE__ */ fe({
  ...xj,
  props: {
    modelValue: {},
    field: {},
    desc: {},
    formData: {}
  },
  emits: ["update:modelValue"],
  setup(f, { emit: s }) {
    const r = f, o = h(r.modelValue), D = h({}), p = h(ke(r));
    return s("update:modelValue", o), be(async () => {
      D.value = await Oe(r, { ...Te() });
    }), (m, N) => {
      const d = F("el-color-picker");
      return _(), R(d, ne({ class: "ElPlusFormColor-panel" }, D.value, Le(p.value), {
        modelValue: o.value,
        "onUpdate:modelValue": N[0] || (N[0] = (M) => o.value = M)
      }), null, 16, ["modelValue"]);
    };
  }
});
const Ci = /* @__PURE__ */ Ge(Ej, [["__scopeId", "data-v-b0687872"]]), Cj = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: Ci }, Symbol.toStringTag, { value: "Module" })), bj = {
  name: "ElPlusFormDate",
  inheritAttrs: !1,
  typeName: "date",
  customOptions: {}
}, Oj = /* @__PURE__ */ fe({
  ...bj,
  props: {
    modelValue: {},
    field: {},
    desc: {},
    formData: {}
  },
  emits: ["update:modelValue"],
  setup(f, { emit: s }) {
    const r = f, o = h(!1), D = h({}), p = h(ke(r)), m = h(r.modelValue);
    return s("update:modelValue", m), be(async () => {
      D.value = await Oe(r, { valueFormat: "YYYY-MM-DD HH:mm:ss", editable: !1, ...Te() }), o.value = !0;
    }), (N, d) => {
      const M = F("el-date-picker");
      return o.value ? (_(), R(M, ne({
        key: 0,
        class: "ElPlusFormDate-panel"
      }, D.value, Le(p.value), {
        modelValue: m.value,
        "onUpdate:modelValue": d[0] || (d[0] = (z) => m.value = z)
      }), null, 16, ["modelValue"])) : Me("", !0);
    };
  }
});
const bi = /* @__PURE__ */ Ge(Oj, [["__scopeId", "data-v-7295d086"]]), Sj = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: bi }, Symbol.toStringTag, { value: "Module" })), Bj = {
  name: "ElPlusFormDaterange",
  inheritAttrs: !1,
  typeName: "daterange",
  customOptions: {}
}, kj = /* @__PURE__ */ fe({
  ...Bj,
  props: {
    modelValue: {},
    field: {},
    desc: {},
    formData: {}
  },
  emits: ["update:modelValue"],
  setup(f, { emit: s }) {
    const r = f, o = h(r.modelValue), D = h(Object.assign({}, Mn(), r.desc.slots)), p = h({}), m = h(ke(r));
    return s("update:modelValue", o), be(async () => {
      p.value = await Oe(r, { type: "daterange", format: "YYYY-MM-DD", valueFormat: "x", editable: !1, ...Te() });
    }), (N, d) => {
      const M = F("el-date-picker");
      return _(), R(M, ne({ class: "el-plusF-form-daterange-panel" }, p.value, Le(m.value), {
        modelValue: o.value,
        "onUpdate:modelValue": d[0] || (d[0] = (z) => o.value = z)
      }), en({ _: 2 }, [
        we(D.value, (z, Y, b) => ({
          name: Y,
          fn: U((E) => [
            $e(N.$slots, Y, { data: E }, void 0, !0)
          ])
        }))
      ]), 1040, ["modelValue"]);
    };
  }
});
const Oi = /* @__PURE__ */ Ge(kj, [["__scopeId", "data-v-2f54b570"]]), Uj = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: Oi }, Symbol.toStringTag, { value: "Module" })), Qj = {
  name: "ElPlusFormDatetime",
  inheritAttrs: !1,
  typeName: "datetime",
  customOptions: {}
}, Pj = /* @__PURE__ */ fe({
  ...Qj,
  props: {
    modelValue: {},
    field: {},
    desc: {},
    formData: {}
  },
  emits: ["update:modelValue"],
  setup(f, { emit: s }) {
    const r = f, o = h(r.modelValue), D = h({}), p = h(ke(r));
    return s("update:modelValue", o), be(async () => {
      D.value = await Oe(r, { valueFormat: "YYYY-MM-DD HH:mm:ss", ...Te() });
    }), (m, N) => {
      const d = F("el-date-picker");
      return _(), R(d, ne({ class: "ElPlusFormDatetime-panel" }, D.value, Le(p.value), {
        type: "datetime",
        modelValue: o.value,
        "onUpdate:modelValue": N[0] || (N[0] = (M) => o.value = M)
      }), null, 16, ["modelValue"]);
    };
  }
});
const Si = /* @__PURE__ */ Ge(Pj, [["__scopeId", "data-v-e8947510"]]), Vj = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: Si }, Symbol.toStringTag, { value: "Module" })), Fj = {
  name: "ElPlusFormDatetimerange",
  inheritAttrs: !1,
  typeName: "datetimerange",
  customOptions: {}
}, Rj = /* @__PURE__ */ fe({
  ...Fj,
  props: {
    modelValue: {},
    field: {},
    desc: {},
    formData: {}
  },
  emits: ["update:modelValue"],
  setup(f, { emit: s }) {
    const r = f, o = h(r.modelValue), D = h(Object.assign({}, Mn(), r.desc.slots)), p = h({}), m = h(ke(r));
    return s("update:modelValue", o), be(async () => {
      p.value = await Oe(r, { type: "datetimerange", format: "YYYY-MM-DD HH:mm:ss", valueFormat: "x", editable: !1, ...Te() });
    }), (N, d) => {
      const M = F("el-date-picker");
      return _(), R(M, ne({ class: "el-plusF-form-datetimerange-panel" }, p.value, Le(m.value), {
        modelValue: o.value,
        "onUpdate:modelValue": d[0] || (d[0] = (z) => o.value = z)
      }), en({ _: 2 }, [
        we(D.value, (z, Y, b) => ({
          name: Y,
          fn: U((E) => [
            $e(N.$slots, Y, { data: E }, void 0, !0)
          ])
        }))
      ]), 1040, ["modelValue"]);
    };
  }
});
const Bi = /* @__PURE__ */ Ge(Rj, [["__scopeId", "data-v-0e3d5450"]]), Wj = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: Bi }, Symbol.toStringTag, { value: "Module" })), gi = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+RE9D5Zu+5qCHPC90aXRsZT4KICAgIDxnIGlkPSLkvpvlupTllYbnrqHnkIYiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSLkvpvlupTllYbnrqHnkIYt5L6b5bqU5ZWG5YiX6KGo6K+m5oOFLTIw5p2h6ZmE5Lu2IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMzgzLjAwMDAwMCwgLTEwNTEuMDAwMDAwKSIgZmlsbD0iIzM4NzhERSIgZmlsbC1ydWxlPSJub256ZXJvIj4KICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC0yMeWkh+S7vS05IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzNzUuMDAwMDAwLCAxMDQ1LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPGcgaWQ9IkRPQ+WbvuaghyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoOC4wMDAwMDAsIDYuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTMsNiBMMTMsNiBDMTMuMTc2ODExLDYgMTMuMzQ2MzgwMyw2LjA3MDIzNzg5IDEzLjQ3MTQwNDUsNi4xOTUyNjIxNSBDMTMuNTk2NDI4OCw2LjMyMDI4NjQgMTMuNjY2NjY2Nyw2LjQ4OTg1NTY4IDEzLjY2NjY2NjcsNi42NjY2NjY2NyBMMTMuNjY2NjY2NywxMi4zMzMzMzMzIEMxMy42NjY2NjY3LDEyLjcwMTUyMzIgMTMuMzY4MTg5OCwxMyAxMywxMyBMMywxMyBMMywxNC42NjY2NjY3IEMzLDE0Ljc1NTA3MjIgMy4wMzUxMTg5NSwxNC44Mzk4NTY4IDMuMDk3NjMxMDcsMTQuOTAyMzY4OSBDMy4xNjAxNDMyLDE0Ljk2NDg4MTEgMy4yNDQ5Mjc4MywxNSAzLjMzMzMzMzMzLDE1IEwxNC42NjY2NjY3LDE1IEMxNC44NTA3NjE2LDE1IDE1LDE0Ljg1MDc2MTYgMTUsMTQuNjY2NjY2NyBMMTUsNC44MjUzMzMzMyBMMTQuODQyMzMzMyw0LjY2NjY2NjY3IEwxMi44NjUzMzMzLDQuNjY2NjY2NjcgQzEyLjAxOTIzMzEsNC42NjY2NjY2NyAxMS4zMzMzMzMzLDMuOTgwNzY2OTEgMTEuMzMzMzMzMywzLjEzNDY2NjY3IEwxMS4zMzMzMzMzLDEuMTM1MzMzMzMgTDExLjE5ODY2NjcsMSBMMy4zMzMzMzMzMywxIEMzLjI0NDkyNzgzLDEgMy4xNjAxNDMyLDEuMDM1MTE4OTUgMy4wOTc2MzEwNywxLjA5NzYzMTA3IEMzLjAzNTExODk1LDEuMTYwMTQzMiAzLDEuMjQ0OTI3ODMgMywxLjMzMzMzMzMzIEwzLDYgWiBNMiwxMyBMMC42NjY2NjY2NzIsMTMgQzAuMjk4NDc2ODM2LDEzIDAsMTIuNzAxNTIzMiAwLDEyLjMzMzMzMzMgTDAsNi42NjY2NjY2NyBDMCw2LjQ4OTg1NTY4IDAuMDcwMjM3ODk0MSw2LjMyMDI4NjQgMC4xOTUyNjIxNDcsNi4xOTUyNjIxNSBDMC4zMjAyODY0MDEsNi4wNzAyMzc4OSAwLjQ4OTg1NTY3Nyw2IDAuNjY2NjY2NjcyLDYgTDIsNiBMMiwxLjMzMzMzMzMzIEMyLDAuNTk2OTUzNjY1IDIuNTk2OTUzNjYsMCAzLjMzMzMzMzMzLDAgTDExLjYxNSwwIEwxNiw0LjQxMzMzMzMzIEwxNiwxNC42NjY2NjY3IEMxNiwxNS40MDMwNDYzIDE1LjQwMzA0NjMsMTYgMTQuNjY2NjY2NywxNiBMMy4zMzMzMzMzMywxNiBDMi41OTY5NTM2NiwxNiAyLDE1LjQwMzA0NjMgMiwxNC42NjY2NjY3IEwyLDEzIEwyLDEzIFogTTEuMDMsNy4zODI2NjY2NyBMMS4wMywxMS42NjY2NjY3IEwyLjQ1NzMzMzMzLDExLjY2NjY2NjcgQzMuMDkxNjY2NjYsMTEuNjY2NjY2NyAzLjU2NzMzMzMzLDExLjQ3NDY2NjcgMy44OTU2NjY2NywxMS4wOTA2NjY3IEM0LjIwNzMzMzM0LDEwLjcyNDY2NjcgNC4zNjYsMTAuMjAyNjY2NyA0LjM2Niw5LjUyNDY2NjY3IEM0LjM2Niw4Ljg0MDY2NjY3IDQuMjA3MzMzMzMsOC4zMTg2NjY2NyAzLjg5NTY2NjY3LDcuOTU4NjY2NjcgQzMuNTY3NjY2NjcsNy41NzQ2NjY2NyAzLjA5MTY2NjY3LDcuMzgyNjY2NjcgMi40NTczMzMzMyw3LjM4MjY2NjY3IEwxLjAzLDcuMzgyNjY2NjcgWiBNMS42Nyw3Ljk4MjY2NjY3IEwyLjMzNjY2NjY3LDcuOTgyNjY2NjcgQzIuODIzMzMzMzQsNy45ODI2NjY2NyAzLjE3OSw4LjEwMjY2NjY3IDMuNDAzMzMzMzMsOC4zNDg2NjY2NyBDMy42MjIsOC41ODg2NjY2NyAzLjczMTMzMzMzLDguOTg0NjY2NjcgMy43MzEzMzMzMyw5LjUyNDY2NjY3IEMzLjczMTMzMzMzLDEwLjA1MjY2NjcgMy42MjIsMTAuNDQyNjY2NyAzLjQwMywxMC42OTQ2NjY3IEMzLjE3OSwxMC45NDA2NjY3IDIuODIzMzMzMzMsMTEuMDY2NjY2NyAyLjMzNjY2NjY3LDExLjA2NjY2NjcgTDEuNjcsMTEuMDY2NjY2NyBMMS42Nyw3Ljk4MjY2NjY3IEwxLjY3LDcuOTgyNjY2NjcgWiBNNi43MDEzMzMzMyw3LjI5ODY2NjY3IEM2LjA5OTY2NjY2LDcuMjk4NjY2NjcgNS42MjkzMzMzMyw3LjUwODY2NjY3IDUuMjkwMzMzMzMsNy45NDA2NjY2NyBDNC45NjIsOC4zNDg2NjY2NyA0LjgwMzY2NjY3LDguODc2NjY2NjcgNC44MDM2NjY2Nyw5LjUzMDY2NjY3IEM0LjgwMzY2NjY3LDEwLjE3ODY2NjcgNC45NjIsMTAuNzA2NjY2NyA1LjI5MDMzMzMzLDExLjExNDY2NjcgQzUuNjI5MzMzMzMsMTEuNTM0NjY2NyA2LjA5OTY2NjY2LDExLjc1MDY2NjcgNi43MDEzMzMzMywxMS43NTA2NjY3IEM3LjI5NzMzMzMzLDExLjc1MDY2NjcgNy43Njc2NjY2NiwxMS41NDA2NjY3IDguMTEyMzMzMzMsMTEuMTIwNjY2NyBDOC40NDAzMzMzMywxMC43MTg2NjY3IDguNjA0MzMzMzMsMTAuMTkwNjY2NyA4LjYwNDMzMzMzLDkuNTMwNjY2NjcgQzguNjA0MzMzMzMsOC44NzA2NjY2NyA4LjQ0MDMzMzMzLDguMzM2NjY2NjcgOC4xMTIzMzMzMyw3LjkzNDY2NjY3IEM3Ljc2NzY2NjY2LDcuNTA4NjY2NjcgNy4yOTczMzMzMyw3LjI5ODY2NjY3IDYuNzAxMzMzMzMsNy4yOTg2NjY2NyBMNi43MDEzMzMzMyw3LjI5ODY2NjY3IFogTTYuNzAxMzMzMzMsNy45MTY2NjY2NyBDNy4xMDYsNy45MTY2NjY2NyA3LjQxNzY2NjY2LDguMDU0NjY2NjcgNy42MzYzMzMzMyw4LjM0MjY2NjY3IEM3Ljg0OTY2NjY2LDguNjMwNjY2NjcgNy45NTksOS4wMjY2NjY2NyA3Ljk1OSw5LjUzMDY2NjY3IEM3Ljk1OSwxMC4wMzQ2NjY3IDcuODQ5NjY2NjcsMTAuNDI0NjY2NyA3LjYzNjMzMzMzLDEwLjcwNjY2NjcgQzcuNDE3NjY2NjYsMTAuOTg4NjY2NyA3LjEwNiwxMS4xMzI2NjY3IDYuNzAxMzMzMzMsMTEuMTMyNjY2NyBDNi4yOTY2NjY2NiwxMS4xMzI2NjY3IDUuOTc5MzMzMzMsMTAuOTgyNjY2NyA1Ljc2MDY2NjY3LDEwLjY4ODY2NjcgQzUuNTQ3MzMzMzQsMTAuNDAwNjY2NyA1LjQ0MzMzMzMzLDEwLjAxNjY2NjcgNS40NDMzMzMzMyw5LjUzMDY2NjY3IEM1LjQ0MzMzMzMzLDkuMDM4NjY2NjcgNS41NDczMzMzMyw4LjY1NDY2NjY3IDUuNzYwNjY2NjcsOC4zNjY2NjY2NyBDNS45ODQ2NjY2Nyw4LjA2NjY2NjY3IDYuMjk2NjY2NjcsNy45MTY2NjY2NyA2LjcwMTMzMzMzLDcuOTE2NjY2NjcgTDYuNzAxMzMzMzMsNy45MTY2NjY2NyBaIE0xMC45MDEzMzMzLDcuMjk4NjY2NjcgQzEwLjI3OCw3LjI5ODY2NjY3IDkuODAyLDcuNTIwNjY2NjcgOS40NzQsNy45NzY2NjY2NyBDOS4xODQsOC4zNzI2NjY2NyA5LjA0Miw4Ljg5NDY2NjY3IDkuMDQyLDkuNTMwNjY2NjcgQzkuMDQyLDEwLjE3ODY2NjcgOS4xNzg2NjY2NywxMC42OTQ2NjY3IDkuNDU3NjY2NjcsMTEuMDc4NjY2NyBDOS43NzQ2NjY2NywxMS41MjI2NjY3IDEwLjI2MTMzMzMsMTEuNzUwNjY2NyAxMC45MTIzMzMzLDExLjc1MDY2NjcgQzExLjMzMzMzMzMsMTEuNzUwNjY2NyAxMS42OTQzMzMzLDExLjYxODY2NjcgMTEuOTk1LDExLjM1NDY2NjcgQzEyLjMxNzY2NjcsMTEuMDcyNjY2NyAxMi41MiwxMC42ODI2NjY3IDEyLjYwNzY2NjcsMTAuMTc4NjY2NyBMMTEuOTg0MzMzMywxMC4xNzg2NjY3IEMxMS45MDc2NjY3LDEwLjUwMjY2NjcgMTEuNzc2MzMzMywxMC43NDg2NjY3IDExLjU5MDMzMzMsMTAuOTEwNjY2NyBDMTEuNDE1MzMzMywxMS4wNTQ2NjY3IDExLjE4NTY2NjcsMTEuMTMyNjY2NyAxMC45MDcsMTEuMTMyNjY2NyBDMTAuNDgwMzMzMywxMS4xMzI2NjY3IDEwLjE2MywxMC45ODI2NjY3IDkuOTYwNjY2NjcsMTAuNjk0NjY2NyBDOS43NzQ2NjY2NywxMC40MjQ2NjY3IDkuNjgxNjY2NjcsMTAuMDM0NjY2NyA5LjY4MTY2NjY3LDkuNTMwNjY2NjcgQzkuNjgxNjY2NjcsOS4wMzg2NjY2NyA5Ljc3NSw4LjY1NDY2NjY3IDkuOTY2MzMzMzMsOC4zNzg2NjY2NyBDMTAuMTc0LDguMDY2NjY2NjcgMTAuNDgwMzMzMyw3LjkxNjY2NjY3IDEwLjg5MDMzMzMsNy45MTY2NjY2NyBDMTEuMTYzNjY2Nyw3LjkxNjY2NjY3IDExLjM4OCw3Ljk3NjY2NjY3IDExLjU2Myw4LjEwODY2NjY3IEMxMS43NDM2NjY3LDguMjQwNjY2NjcgMTEuODY0LDguNDQ0NjY2NjcgMTEuOTI5NjY2Nyw4LjcyNjY2NjY3IEwxMi41NTMsOC43MjY2NjY2NyBDMTIuNDkzLDguMjk0NjY2NjcgMTIuMzIzLDcuOTQ2NjY2NjcgMTIuMDM5LDcuNjk0NjY2NjcgQzExLjc0MzY2NjcsNy40MzA2NjY2NyAxMS4zNjA2NjY3LDcuMjk4NjY2NjcgMTAuOTAxMzMzMyw3LjI5ODY2NjY3IEwxMC45MDEzMzMzLDcuMjk4NjY2NjcgWiIgaWQ9IuW9oueKtiI+PC9wYXRoPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=", Gj = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+6YCa55So5paH5Lu2PC90aXRsZT4KICAgIDxnIGlkPSLkvpvlupTllYbnrqHnkIYiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSLkvpvlupTllYbnrqHnkIYt5L6b5bqU5ZWG5YiX6KGo6K+m5oOFLTIw5p2h6ZmE5Lu2IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMzgzLjAwMDAwMCwgLTEwOTEuMDAwMDAwKSIgZmlsbC1ydWxlPSJub256ZXJvIj4KICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC0yMeWkh+S7vS0xMCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzc1LjAwMDAwMCwgMTA4NS4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxnIGlkPSLpgJrnlKjmlofku7YiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDguMDAwMDAwLCA2LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xMS42MTUsMCBMMTYsNC40MTMzMzMzMyBMMTYsMTQuNjY2NjY2NyBDMTYsMTUuNDAzMDQ2MyAxNS40MDMwNDYzLDE2IDE0LjY2NjY2NjcsMTYgTDMuMzMzMzMzMzMsMTYgQzIuNTk2OTUzNjYsMTYgMiwxNS40MDMwNDYzIDIsMTQuNjY2NjY2NyBMMiwxMyBMMC42NjY2NjY2NzIsMTMgQzAuMjk4NDc2ODM2LDEzIDAsMTIuNzAxNTIzMiAwLDEyLjMzMzMzMzMgTDAsNi42NjY2NjY2NyBDMCw2LjQ4OTg1NTY4IDAuMDcwMjM3ODk0MSw2LjMyMDI4NjQgMC4xOTUyNjIxNDcsNi4xOTUyNjIxNSBDMC4zMjAyODY0MDEsNi4wNzAyMzc4OSAwLjQ4OTg1NTY3Nyw2IDAuNjY2NjY2NjcyLDYgTDIsNiBMMiwxLjMzMzMzMzMzIEMyLDAuNTk2OTUzNjY1IDIuNTk2OTUzNjYsMCAzLjMzMzMzMzMzLDAgTDExLjYxNSwwIFogTTExLjE5ODY2NjcsMSBMMy4zMzMzMzMzMywxIEMzLjI0NDkyNzgzLDEgMy4xNjAxNDMyLDEuMDM1MTE4OTUgMy4wOTc2MzEwNywxLjA5NzYzMTA3IEMzLjAzNTExODk1LDEuMTYwMTQzMiAzLDEuMjQ0OTI3ODMgMywxLjMzMzMzMzMzIEwzLDYgTDEzLDYgQzEzLjE3NjgxMSw2IDEzLjM0NjM4MDMsNi4wNzAyMzc4OSAxMy40NzE0MDQ1LDYuMTk1MjYyMTUgQzEzLjU5NjQyODgsNi4zMjAyODY0IDEzLjY2NjY2NjcsNi40ODk4NTU2OCAxMy42NjY2NjY3LDYuNjY2NjY2NjcgTDEzLjY2NjY2NjcsMTIuMzMzMzMzMyBDMTMuNjY2NjY2NywxMi43MDE1MjMyIDEzLjM2ODE4OTgsMTMgMTMsMTMgTDMsMTMgTDMsMTQuNjY2NjY2NyBDMywxNC43NTUwNzIyIDMuMDM1MTE4OTUsMTQuODM5ODU2OCAzLjA5NzYzMTA3LDE0LjkwMjM2ODkgQzMuMTYwMTQzMiwxNC45NjQ4ODExIDMuMjQ0OTI3ODMsMTUgMy4zMzMzMzMzMywxNSBMMTQuNjY2NjY2NywxNSBDMTQuODUwNzYxNiwxNSAxNSwxNC44NTA3NjE2IDE1LDE0LjY2NjY2NjcgTDE1LDQuODI1MzMzMzMgTDE0Ljg0MjMzMzMsNC42NjY2NjY2NyBMMTIuODY1MzMzMyw0LjY2NjY2NjY3IEMxMi4wMTkyMzMxLDQuNjY2NjY2NjcgMTEuMzMzMzMzMywzLjk4MDc2NjkxIDExLjMzMzMzMzMsMy4xMzQ2NjY2NyBMMTEuMzMzMzMzMywxLjEzNTY2NjY3IEwxMS4xOTg2NjY3LDEgWiIgaWQ9IuW9oueKtiIgZmlsbD0iIzE4OTBGRiI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDxnIGlkPSJGSUxFIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxLjYwMDAwMCwgNy40MDAwMDApIiBmaWxsPSIjRkZGRkZGIj4KICAgICAgICAgICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IkYiIHBvaW50cz0iMi4zOTQgMC41OTQgMC42NzIgMC41OTQgMC42NzIgMS44MDYgMi4yNzQgMS44MDYgMi4yNzQgMi4zOTQgMC42NzIgMi4zOTQgMC42NzIgNC4xNjQgMCA0LjE2NCAwIDAgMi4zOTQgMCI+PC9wb2x5Z29uPgogICAgICAgICAgICAgICAgICAgICAgICA8cG9seWdvbiBpZD0iSSIgcG9pbnRzPSIzLjE4NiA0LjE2NCAzLjE4NiAwIDMuODU4IDAgMy44NTggNC4xNjQiPjwvcG9seWdvbj4KICAgICAgICAgICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IkwiIHBvaW50cz0iNS41NzQgMy41NjQgNy4zMjYgMy41NjQgNy4zMjYgNC4xNjQgNC45MDIgNC4xNjQgNC45MDIgMCA1LjU3NCAwIj48L3BvbHlnb24+CiAgICAgICAgICAgICAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJFIiBwb2ludHM9IjguNjY0IDMuNTY0IDEwLjUxMiAzLjU2NCAxMC41MTIgNC4xNjQgNy45OTIgNC4xNjQgNy45OTIgMCAxMC4zODYgMCAxMC4zODYgMC41OTQgOC42NjQgMC41OTQgOC42NjQgMS43MjggMTAuMjY2IDEuNzI4IDEwLjI2NiAyLjI5MiA4LjY2NCAyLjI5MiI+PC9wb2x5Z29uPgogICAgICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+", Ni = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+SlBFR+WbvuaghzwvdGl0bGU+CiAgICA8ZyBpZD0i5L6b5bqU5ZWG566h55CGIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0i5L6b5bqU5ZWG566h55CGLeS+m+W6lOWVhuWIl+ihqOivpuaDhS0yMOadoemZhOS7tiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTM4My4wMDAwMDAsIC03MzEuMDAwMDAwKSIgZmlsbC1ydWxlPSJub256ZXJvIj4KICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC0yMeWkh+S7vSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzc1LjAwMDAwMCwgNzI1LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPGcgaWQ9IkpQRUflm77moIciIHRyYW5zZm9ybT0idHJhbnNsYXRlKDguMDAwMDAwLCA2LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xMS42MTUsMCBMMTYsNC40MTMzMzMzMyBMMTYsMTQuNjY2NjY2NyBDMTYsMTUuNDAzMDQ2MyAxNS40MDMwNDYzLDE2IDE0LjY2NjY2NjcsMTYgTDMuMzMzMzMzMzMsMTYgQzIuNTk2OTUzNjYsMTYgMiwxNS40MDMwNDYzIDIsMTQuNjY2NjY2NyBMMiwxMyBMMC42NjY2NjY2NzIsMTMgQzAuMjk4NDc2ODM2LDEzIDAsMTIuNzAxNTIzMiAwLDEyLjMzMzMzMzMgTDAsNi42NjY2NjY2NyBDMCw2LjQ4OTg1NTY4IDAuMDcwMjM3ODk0MSw2LjMyMDI4NjQgMC4xOTUyNjIxNDcsNi4xOTUyNjIxNSBDMC4zMjAyODY0MDEsNi4wNzAyMzc4OSAwLjQ4OTg1NTY3Nyw2IDAuNjY2NjY2NjcyLDYgTDIsNiBMMiwxLjMzMzMzMzMzIEMyLDAuNTk2OTUzNjY1IDIuNTk2OTUzNjYsMCAzLjMzMzMzMzMzLDAgTDExLjYxNSwwIFogTTExLjE5ODY2NjcsMSBMMy4zMzMzMzMzMywxIEMzLjI0NDkyNzgzLDEgMy4xNjAxNDMyLDEuMDM1MTE4OTUgMy4wOTc2MzEwNywxLjA5NzYzMTA3IEMzLjAzNTExODk1LDEuMTYwMTQzMiAzLDEuMjQ0OTI3ODMgMywxLjMzMzMzMzMzIEwzLDYgTDEzLDYgQzEzLjE3NjgxMSw2IDEzLjM0NjM4MDMsNi4wNzAyMzc4OSAxMy40NzE0MDQ1LDYuMTk1MjYyMTUgQzEzLjU5NjQyODgsNi4zMjAyODY0IDEzLjY2NjY2NjcsNi40ODk4NTU2OCAxMy42NjY2NjY3LDYuNjY2NjY2NjcgTDEzLjY2NjY2NjcsMTIuMzMzMzMzMyBDMTMuNjY2NjY2NywxMi43MDE1MjMyIDEzLjM2ODE4OTgsMTMgMTMsMTMgTDMsMTMgTDMsMTQuNjY2NjY2NyBDMywxNC43NTUwNzIyIDMuMDM1MTE4OTUsMTQuODM5ODU2OCAzLjA5NzYzMTA3LDE0LjkwMjM2ODkgQzMuMTYwMTQzMiwxNC45NjQ4ODExIDMuMjQ0OTI3ODMsMTUgMy4zMzMzMzMzMywxNSBMMTQuNjY2NjY2NywxNSBDMTQuODUwNzYxNiwxNSAxNSwxNC44NTA3NjE2IDE1LDE0LjY2NjY2NjcgTDE1LDQuODI1MzMzMzMgTDE0Ljg0MjMzMzMsNC42NjY2NjY2NyBMMTIuODY1MzMzMyw0LjY2NjY2NjY3IEMxMi4wMTkyMzMxLDQuNjY2NjY2NjcgMTEuMzMzMzMzMywzLjk4MDc2NjkxIDExLjMzMzMzMzMsMy4xMzQ2NjY2NyBMMTEuMzMzMzMzMywxLjEzNTY2NjY3IEwxMS4xOTg2NjY3LDEgWiIgaWQ9IuW9oueKtiIgZmlsbD0iI0Y2NzUwMCI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0yLjQzMjMzMzMzLDcuMzgyNjY2NjcgTDIuOTk1LDcuMzgyNjY2NjcgTDIuOTk1LDEwLjI4MDY2NjcgQzIuOTk1LDEwLjc3MjY2NjcgMi45MTMsMTEuMTMyNjY2NyAyLjc0OTY2NjY3LDExLjM3MjY2NjcgQzIuNTY3LDExLjYyNDY2NjcgMi4yNzg2NjY2NywxMS43NTA2NjY3IDEuODc5NjY2NjcsMTEuNzUwNjY2NyBDMS41MzMzMzMzNCwxMS43NTA2NjY3IDEuMjY5LDExLjYzMDY2NjcgMS4wOTEsMTEuMzkwNjY2NyBDMC45MDgzMzMzMjgsMTEuMTUwNjY2NyAwLjgxNywxMC44MjA2NjY3IDAuODE3LDEwLjQwMDY2NjcgTDAuODE3LDEwLjI2MjY2NjcgTDEuMzc5MzMzMzMsMTAuMjYyNjY2NyBMMS4zNzkzMzMzMywxMC4zOTQ2NjY3IEMxLjM3OTMzMzMzLDEwLjg4NjY2NjcgMS41NDc2NjY2NiwxMS4xMzI2NjY3IDEuODg5MzMzMzMsMTEuMTMyNjY2NyBDMi4wNzY2NjY2NiwxMS4xMzI2NjY3IDIuMjE2LDExLjA2MDY2NjcgMi4zMDI2NjY2NywxMC45MjI2NjY3IEMyLjM4OTMzMzM0LDEwLjc4NDY2NjcgMi40MzI2NjY2NywxMC41NjI2NjY3IDIuNDMyNjY2NjcsMTAuMjU2NjY2NyBMMi40MzI2NjY2Nyw3LjM4MjY2NjY3IEwyLjQzMjMzMzMzLDcuMzgyNjY2NjcgWiBNMy42NjgsNy4zODI2NjY2NyBMNS4wOTEsNy4zODI2NjY2NyBDNS45MTc2NjY2Nyw3LjM4MjY2NjY3IDYuMzM2LDcuODIwNjY2NjcgNi4zMzYsOC42OTY2NjY2NyBDNi4zMzYsOS41Nzg2NjY2NyA1LjkxOCwxMC4wMjI2NjY3IDUuMDgxMzMzMzMsMTAuMDIyNjY2NyBMNC4yMzAzMzMzMywxMC4wMjI2NjY3IEw0LjIzMDMzMzMzLDExLjY2NjY2NjcgTDMuNjY4LDExLjY2NjY2NjcgTDMuNjY4LDcuMzgyNjY2NjcgWiBNNC4yMzAzMzMzMyw3Ljk4MjY2NjY3IEw0LjIzMDMzMzMzLDkuNDIyNjY2NjcgTDUuMDQ3NjY2NjcsOS40MjI2NjY2NyBDNS4yOTc2NjY2Nyw5LjQyMjY2NjY3IDUuNDgwMzMzMzQsOS4zNjI2NjY2NyA1LjU5NTY2NjY3LDkuMjU0NjY2NjcgQzUuNzExMzMzMzQsOS4xNDA2NjY2NyA1Ljc2OSw4Ljk1NDY2NjY3IDUuNzY5LDguNjk2NjY2NjcgQzUuNzY5LDguNDM4NjY2NjcgNS43MDYzMzMzMyw4LjI1ODY2NjY3IDUuNTkxLDguMTUwNjY2NjcgQzUuNDc1NjY2NjcsOC4wMzY2NjY2NyA1LjI5Myw3Ljk4MjY2NjY3IDUuMDQ3NjY2NjcsNy45ODI2NjY2NyBMNC4yMzAzMzMzMyw3Ljk4MjY2NjY3IEw0LjIzMDMzMzMzLDcuOTgyNjY2NjcgWiBNNi44MTcsNy4zODI2NjY2NyBMOS4yOTMsNy4zODI2NjY2NyBMOS4yOTMsNy45ODI2NjY2NyBMNy4zNzk2NjY2Nyw3Ljk4MjY2NjY3IEw3LjM3OTY2NjY3LDkuMTcwNjY2NjcgTDkuMTc3MzMzMzMsOS4xNzA2NjY2NyBMOS4xNzczMzMzMyw5Ljc3MDY2NjY3IEw3LjM3OTMzMzMzLDkuNzcwNjY2NjcgTDcuMzc5MzMzMzMsMTEuMDY2NjY2NyBMOS4zNzQ2NjY2NywxMS4wNjY2NjY3IEw5LjM3NDY2NjY3LDExLjY2NjY2NjcgTDYuODE2NjY2NjcsMTEuNjY2NjY2NyBMNi44MTY2NjY2Nyw3LjM4MjY2NjY3IEw2LjgxNyw3LjM4MjY2NjY3IFogTTExLjM5MzY2NjcsNy4yOTg2NjY2NyBDMTEuODM2LDcuMjk4NjY2NjcgMTIuMTgyMzMzMyw3LjQxODY2NjY3IDEyLjQzNyw3LjY2NDY2NjY3IEMxMi42ODIzMzMzLDcuOTA0NjY2NjcgMTIuODM2LDguMjU4NjY2NjcgMTIuODk4NjY2Nyw4LjczODY2NjY3IEwxMi4zMzEzMzMzLDguNzM4NjY2NjcgQzEyLjI4MzMzMzMsOC40NjI2NjY2NyAxMi4xNzczMzMzLDguMjU4NjY2NjcgMTIuMDIzNjY2Nyw4LjEyMDY2NjY3IEMxMS44NjUsNy45ODI2NjY2NyAxMS42NTM2NjY3LDcuOTE2NjY2NjcgMTEuMzkzNjY2Nyw3LjkxNjY2NjY3IEMxMS4wNzE2NjY3LDcuOTE2NjY2NjcgMTAuODE3LDguMDQ4NjY2NjcgMTAuNjI5MzMzMyw4LjMyNDY2NjY3IEMxMC40MjI2NjY3LDguNjEyNjY2NjcgMTAuMzIxNjY2Nyw5LjAxNDY2NjY3IDEwLjMyMTY2NjcsOS41NDI2NjY2NyBDMTAuMzIxNjY2NywxMC4wNDY2NjY3IDEwLjQxMywxMC40MzY2NjY3IDEwLjU5NTY2NjcsMTAuNzA2NjY2NyBDMTAuNzkzLDEwLjk5NDY2NjcgMTEuMTAwNjY2NywxMS4xMzg2NjY3IDExLjUxOSwxMS4xMzg2NjY3IEMxMS42ODIzMzMzLDExLjEzODY2NjcgMTEuODM2LDExLjExNDY2NjcgMTEuOTgwMzMzMywxMS4wNjY2NjY3IEMxMi4xMTI2MzI3LDExLjAxODk5NjQgMTIuMjM3Mjc2NSwxMC45NTIyOTUxIDEyLjM1MDMzMzMsMTAuODY4NjY2NyBMMTIuMzUwMzMzMyw5Ljk4NjY2NjY3IEwxMS40NDIsOS45ODY2NjY2NyBMMTEuNDQyLDkuMzg2NjY2NjcgTDEyLjkxMyw5LjM4NjY2NjY3IEwxMi45MTMsMTEuMTk4NjY2NyBDMTIuNzMzODY0NiwxMS4zNzQ4NjcyIDEyLjUyMTM4NzIsMTEuNTEzNTcyNCAxMi4yODgsMTEuNjA2NjY2NyBDMTIuMDM4LDExLjcwMjY2NjcgMTEuNzY0LDExLjc1MDY2NjcgMTEuNDU2MzMzMywxMS43NTA2NjY3IEMxMC45MDgzMzMzLDExLjc1MDY2NjcgMTAuNDg1LDExLjUzNDY2NjcgMTAuMTgyMzMzMywxMS4xMDI2NjY3IEM5Ljg5ODY2NjY2LDEwLjcwMDY2NjcgOS43NTksMTAuMTc4NjY2NyA5Ljc1OSw5LjU0MjY2NjY3IEM5Ljc1OSw4LjkwMDY2NjY3IDkuODk4NjY2NjcsOC4zNzI2NjY2NyAxMC4xODIzMzMzLDcuOTU4NjY2NjcgQzEwLjQ4MDMzMzMsNy41MTQ2NjY2NyAxMC44ODQzMzMzLDcuMjk4NjY2NjcgMTEuMzkzNjY2Nyw3LjI5ODY2NjY3IEwxMS4zOTM2NjY3LDcuMjk4NjY2NjcgWiIgaWQ9IuW9oueKtiIgZmlsbD0iI0ZGRkZGRiI+PC9wYXRoPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=", Zj = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+UERG5Zu+5qCHPC90aXRsZT4KICAgIDxnIGlkPSLkvpvlupTllYbnrqHnkIYiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSLkvpvlupTllYbnrqHnkIYt5L6b5bqU5ZWG5YiX6KGo6K+m5oOFLTIw5p2h6ZmE5Lu2IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMzgzLjAwMDAwMCwgLTY5MS4wMDAwMDApIiBmaWxsPSIjRUE0MzE4IiBmaWxsLXJ1bGU9Im5vbnplcm8iPgogICAgICAgICAgICA8ZyBpZD0i57yW57uELTIxIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzNzUuMDAwMDAwLCA2ODUuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8ZyBpZD0iUERG5Zu+5qCHIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg4LjAwMDAwMCwgNi4wMDAwMDApIj4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMyw2IEwxMyw2IEMxMy4xNzY4MTEsNiAxMy4zNDYzODAzLDYuMDcwMjM3ODkgMTMuNDcxNDA0NSw2LjE5NTI2MjE1IEMxMy41OTY0Mjg4LDYuMzIwMjg2NCAxMy42NjY2NjY3LDYuNDg5ODU1NjggMTMuNjY2NjY2Nyw2LjY2NjY2NjY3IEwxMy42NjY2NjY3LDEyLjMzMzMzMzMgQzEzLjY2NjY2NjcsMTIuNzAxNTIzMiAxMy4zNjgxODk4LDEzIDEzLDEzIEwzLDEzIEwzLDE0LjY2NjY2NjcgQzMsMTQuNzU1MDcyMiAzLjAzNTExODk1LDE0LjgzOTg1NjggMy4wOTc2MzEwNywxNC45MDIzNjg5IEMzLjE2MDE0MzIsMTQuOTY0ODgxMSAzLjI0NDkyNzgzLDE1IDMuMzMzMzMzMzMsMTUgTDE0LjY2NjY2NjcsMTUgQzE0Ljg1MDc2MTYsMTUgMTUsMTQuODUwNzYxNiAxNSwxNC42NjY2NjY3IEwxNSw0LjgyNTMzMzMzIEwxNC44NDIzMzMzLDQuNjY2NjY2NjcgTDEyLjg2NTMzMzMsNC42NjY2NjY2NyBDMTIuMDE5MjMzMSw0LjY2NjY2NjY3IDExLjMzMzMzMzMsMy45ODA3NjY5MSAxMS4zMzMzMzMzLDMuMTM0NjY2NjcgTDExLjMzMzMzMzMsMS4xMzUzMzMzMyBMMTEuMTk4NjY2NywxIEwzLjMzMzMzMzMzLDEgQzMuMjQ0OTI3ODMsMSAzLjE2MDE0MzIsMS4wMzUxMTg5NSAzLjA5NzYzMTA3LDEuMDk3NjMxMDcgQzMuMDM1MTE4OTUsMS4xNjAxNDMyIDMsMS4yNDQ5Mjc4MyAzLDEuMzMzMzMzMzMgTDMsNiBaIE0yLDEzIEwwLjY2NjY2NjY3MiwxMyBDMC4yOTg0NzY4MzYsMTMgMCwxMi43MDE1MjMyIDAsMTIuMzMzMzMzMyBMMCw2LjY2NjY2NjY3IEMwLDYuNDg5ODU1NjggMC4wNzAyMzc4OTQxLDYuMzIwMjg2NCAwLjE5NTI2MjE0Nyw2LjE5NTI2MjE1IEMwLjMyMDI4NjQwMSw2LjA3MDIzNzg5IDAuNDg5ODU1Njc3LDYgMC42NjY2NjY2NzIsNiBMMiw2IEwyLDEuMzMzMzMzMzMgQzIsMC41OTY5NTM2NjUgMi41OTY5NTM2NiwwIDMuMzMzMzMzMzMsMCBMMTEuNjE1LDAgTDE2LDQuNDEzMzMzMzMgTDE2LDE0LjY2NjY2NjcgQzE2LDE1LjQwMzA0NjMgMTUuNDAzMDQ2MywxNiAxNC42NjY2NjY3LDE2IEwzLjMzMzMzMzMzLDE2IEMyLjU5Njk1MzY2LDE2IDIsMTUuNDAzMDQ2MyAyLDE0LjY2NjY2NjcgTDIsMTMgTDIsMTMgWiBNMS4zODIzMzMzMyw3LjM4MjY2NjY3IEwxLjM4MjMzMzMzLDExLjY2NjY2NjcgTDIuMDg0MzMzMzMsMTEuNjY2NjY2NyBMMi4wODQzMzMzMywxMC4wMjI2NjY3IEwzLjE0NjMzMzMzLDEwLjAyMjY2NjcgQzQuMTkwMzMzMzMsMTAuMDIyNjY2NyA0LjcxMjMzMzMzLDkuNTc4NjY2NjcgNC43MTIzMzMzMyw4LjY5NjY2NjY3IEM0LjcxMjMzMzMzLDcuODIwNjY2NjcgNC4xOTAzMzMzMyw3LjM4MjY2NjY3IDMuMTU4MzMzMzMsNy4zODI2NjY2NyBMMS4zODIzMzMzMyw3LjM4MjY2NjY3IFogTTIuMDg0MzMzMzMsNy45ODI2NjY2NyBMMy4xMDQzMzMzMyw3Ljk4MjY2NjY3IEMzLjQxMDMzMzMzLDcuOTgyNjY2NjcgMy42MzgzMzMzMyw4LjAzNjY2NjY3IDMuNzgyMzMzMzMsOC4xNTA2NjY2NyBDMy45MjYzMzMzMyw4LjI1ODY2NjY3IDQuMDA0MzMzMzMsOC40Mzg2NjY2NyA0LjAwNDMzMzMzLDguNjk2NjY2NjcgQzQuMDA0MzMzMzMsOC45NTQ2NjY2NyAzLjkzMjMzMzMzLDkuMTQwNjY2NjcgMy43ODgzMzMzMyw5LjI1NDY2NjY3IEMzLjY0NDMzMzMzLDkuMzYyNjY2NjcgMy40MTYzMzMzMyw5LjQyMjY2NjY3IDMuMTA0MzMzMzMsOS40MjI2NjY2NyBMMi4wODQzMzMzMyw5LjQyMjY2NjY3IEwyLjA4NDMzMzMzLDcuOTgyNjY2NjcgTDIuMDg0MzMzMzMsNy45ODI2NjY2NyBaIE01LjMxMjMzMzMzLDcuMzgyNjY2NjcgTDUuMzEyMzMzMzMsMTEuNjY2NjY2NyBMNi44NzgzMzMzMywxMS42NjY2NjY3IEM3LjU3NDMzMzMzLDExLjY2NjY2NjcgOC4wOTYzMzMzMywxMS40NzQ2NjY3IDguNDU2MzMzMzMsMTEuMDkwNjY2NyBDOC43OTgzMzMzMywxMC43MjQ2NjY3IDguOTcyMzMzMzMsMTAuMjAyNjY2NyA4Ljk3MjMzMzMzLDkuNTI0NjY2NjcgQzguOTcyMzMzMzMsOC44NDA2NjY2NyA4Ljc5ODMzMzMzLDguMzE4NjY2NjcgOC40NTYzMzMzMyw3Ljk1ODY2NjY3IEM4LjA5NjMzMzMzLDcuNTc0NjY2NjcgNy41NzQzMzMzMyw3LjM4MjY2NjY3IDYuODc4MzMzMzMsNy4zODI2NjY2NyBMNS4zMTIzMzMzMyw3LjM4MjY2NjY3IFogTTYuMDE0MzMzMzMsNy45ODI2NjY2NyBMNi43NDYzMzMzMyw3Ljk4MjY2NjY3IEM3LjI4MDMzMzMzLDcuOTgyNjY2NjcgNy42NzAzMzMzMyw4LjEwMjY2NjY3IDcuOTE2MzMzMzMsOC4zNDg2NjY2NyBDOC4xNTYzMzMzMyw4LjU4ODY2NjY3IDguMjc2MzMzMzMsOC45ODQ2NjY2NyA4LjI3NjMzMzMzLDkuNTI0NjY2NjcgQzguMjc2MzMzMzMsMTAuMDUyNjY2NyA4LjE1NjMzMzMzLDEwLjQ0MjY2NjcgNy45MTYzMzMzMywxMC42OTQ2NjY3IEM3LjY3MDMzMzMzLDEwLjk0MDY2NjcgNy4yODAzMzMzMywxMS4wNjY2NjY3IDYuNzQ2MzMzMzMsMTEuMDY2NjY2NyBMNi4wMTQzMzMzMywxMS4wNjY2NjY3IEw2LjAxNDMzMzMzLDcuOTgyNjY2NjcgTDYuMDE0MzMzMzMsNy45ODI2NjY2NyBaIE05LjYzMjMzMzMzLDcuMzgyNjY2NjcgTDkuNjMyMzMzMzMsMTEuNjY2NjY2NyBMMTAuMzM0MzMzMywxMS42NjY2NjY3IEwxMC4zMzQzMzMzLDkuNzcwNjY2NjcgTDEyLjQyODMzMzMsOS43NzA2NjY2NyBMMTIuNDI4MzMzMyw5LjE3MDY2NjY3IEwxMC4zMzQzMzMzLDkuMTcwNjY2NjcgTDEwLjMzNDMzMzMsNy45ODI2NjY2NyBMMTIuNTU0MzMzMyw3Ljk4MjY2NjY3IEwxMi41NTQzMzMzLDcuMzgyNjY2NjcgTDkuNjMyMzMzMzMsNy4zODI2NjY2NyBaIiBpZD0i5b2i54q2Ij48L3BhdGg+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==", Hj = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+UE5H5Zu+5qCHPC90aXRsZT4KICAgIDxnIGlkPSLkvpvlupTllYbnrqHnkIYiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSLkvpvlupTllYbnrqHnkIYt5L6b5bqU5ZWG5YiX6KGo6K+m5oOFLTIw5p2h6ZmE5Lu2IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMzgzLjAwMDAwMCwgLTk3MS4wMDAwMDApIiBmaWxsPSIjRkNDQzAwIiBmaWxsLXJ1bGU9Im5vbnplcm8iPgogICAgICAgICAgICA8ZyBpZD0i57yW57uELTIx5aSH5Lu9LTciIHRyYW5zZm9ybT0idHJhbnNsYXRlKDM3NS4wMDAwMDAsIDk2NS4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxnIGlkPSJQTkflm77moIciIHRyYW5zZm9ybT0idHJhbnNsYXRlKDguMDAwMDAwLCA2LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0zLDYgTDEzLDYgQzEzLjE3NjgxMSw2IDEzLjM0NjM4MDMsNi4wNzAyMzc4OSAxMy40NzE0MDQ1LDYuMTk1MjYyMTUgQzEzLjU5NjQyODgsNi4zMjAyODY0IDEzLjY2NjY2NjcsNi40ODk4NTU2OCAxMy42NjY2NjY3LDYuNjY2NjY2NjcgTDEzLjY2NjY2NjcsMTIuMzMzMzMzMyBDMTMuNjY2NjY2NywxMi43MDE1MjMyIDEzLjM2ODE4OTgsMTMgMTMsMTMgTDMsMTMgTDMsMTQuNjY2NjY2NyBDMywxNC43NTUwNzIyIDMuMDM1MTE4OTUsMTQuODM5ODU2OCAzLjA5NzYzMTA3LDE0LjkwMjM2ODkgQzMuMTYwMTQzMiwxNC45NjQ4ODExIDMuMjQ0OTI3ODMsMTUgMy4zMzMzMzMzMywxNSBMMTQuNjY2NjY2NywxNSBDMTQuODUwNzYxNiwxNSAxNSwxNC44NTA3NjE2IDE1LDE0LjY2NjY2NjcgTDE1LDQuODI1MzMzMzMgTDE0Ljg0MjMzMzMsNC42NjY2NjY2NyBMMTIuODY1MzMzMyw0LjY2NjY2NjY3IEMxMi4wMTkyMzMxLDQuNjY2NjY2NjcgMTEuMzMzMzMzMywzLjk4MDc2NjkxIDExLjMzMzMzMzMsMy4xMzQ2NjY2NyBMMTEuMzMzMzMzMywxLjEzNTMzMzMzIEwxMS4xOTg2NjY3LDEgTDMuMzMzMzMzMzMsMSBDMy4yNDQ5Mjc4MywxIDMuMTYwMTQzMiwxLjAzNTExODk1IDMuMDk3NjMxMDcsMS4wOTc2MzEwNyBDMy4wMzUxMTg5NSwxLjE2MDE0MzIgMywxLjI0NDkyNzgzIDMsMS4zMzMzMzMzMyBMMyw2IFogTTIsMTMgTDAuNjY2NjY2NjcyLDEzIEMwLjI5ODQ3NjgzNiwxMyAwLDEyLjcwMTUyMzIgMCwxMi4zMzMzMzMzIEwwLDYuNjY2NjY2NjcgQzAsNi40ODk4NTU2OCAwLjA3MDIzNzg5NDEsNi4zMjAyODY0IDAuMTk1MjYyMTQ3LDYuMTk1MjYyMTUgQzAuMzIwMjg2NDAxLDYuMDcwMjM3ODkgMC40ODk4NTU2NzcsNiAwLjY2NjY2NjY3Miw2IEwyLDYgTDIsMS4zMzMzMzMzMyBDMiwwLjU5Njk1MzY2NSAyLjU5Njk1MzY2LDAgMy4zMzMzMzMzMywwIEwxMS42MTUsMCBMMTYsNC40MTMzMzMzMyBMMTYsMTQuNjY2NjY2NyBDMTYsMTUuNDAzMDQ2MyAxNS40MDMwNDYzLDE2IDE0LjY2NjY2NjcsMTYgTDMuMzMzMzMzMzMsMTYgQzIuNTk2OTUzNjYsMTYgMiwxNS40MDMwNDYzIDIsMTQuNjY2NjY2NyBMMiwxMyBMMiwxMyBaIE0xLjQ0MjMzMzMzLDcuMzgyNjY2NjcgTDEuNDQyMzMzMzMsMTEuNjY2NjY2NyBMMi4wNzIzMzMzMywxMS42NjY2NjY3IEwyLjA3MjMzMzMzLDEwLjAyMjY2NjcgTDMuMDI1NjY2NjcsMTAuMDIyNjY2NyBDMy45NjMsMTAuMDIyNjY2NyA0LjQzMTMzMzMzLDkuNTc4NjY2NjcgNC40MzEzMzMzMyw4LjY5NjY2NjY3IEM0LjQzMTMzMzMzLDcuODIwNjY2NjcgMy45NjMsNy4zODI2NjY2NyAzLjAzNjMzMzMzLDcuMzgyNjY2NjcgTDEuNDQyMzMzMzMsNy4zODI2NjY2NyBaIE0yLjA3MjMzMzMzLDcuOTgyNjY2NjcgTDIuOTg4LDcuOTgyNjY2NjcgQzMuMjYyNjY2NjcsNy45ODI2NjY2NyAzLjQ2NzMzMzMzLDguMDM2NjY2NjcgMy41OTY2NjY2Nyw4LjE1MDY2NjY3IEMzLjcyNiw4LjI1ODY2NjY3IDMuNzk2LDguNDM4NjY2NjcgMy43OTYsOC42OTY2NjY2NyBDMy43OTYsOC45NTQ2NjY2NyAzLjczMTMzMzMzLDkuMTQwNjY2NjcgMy42MDIsOS4yNTQ2NjY2NyBDMy40NzI2NjY2Nyw5LjM2MjY2NjY3IDMuMjY4LDkuNDIyNjY2NjcgMi45ODgsOS40MjI2NjY2NyBMMi4wNzIzMzMzMyw5LjQyMjY2NjY3IEwyLjA3MjMzMzMzLDcuOTgyNjY2NjcgTDIuMDcyMzMzMzMsNy45ODI2NjY2NyBaIE00Ljk3LDcuMzgyNjY2NjcgTDQuOTcsMTEuNjY2NjY2NyBMNS42LDExLjY2NjY2NjcgTDUuNiw4LjUzNDY2NjY3IEw1LjYyMTY2NjY3LDguNTM0NjY2NjcgTDcuNTQ0NjY2NjcsMTEuNjY2NjY2NyBMOC4xNTg2NjY2NywxMS42NjY2NjY3IEw4LjE1ODY2NjY3LDcuMzgyNjY2NjcgTDcuNTIzMzMzMzMsNy4zODI2NjY2NyBMNy41MjMzMzMzMywxMC40NzI2NjY3IEw3LjUwMiwxMC40NzI2NjY3IEw1LjYwMDY2NjY3LDcuMzgyNjY2NjcgTDQuOTcwNjY2NjcsNy4zODI2NjY2NyBMNC45Nyw3LjM4MjY2NjY3IFogTTEwLjU4MjMzMzMsNy4yOTg2NjY2NyBDMTAuMDExNjY2Nyw3LjI5ODY2NjY3IDkuNTU5LDcuNTE0NjY2NjcgOS4yMjUsNy45NTg2NjY2NyBDOC45MDczMzMzMyw4LjM3MjY2NjY3IDguNzUxMzMzMzMsOC45MDA2NjY2NyA4Ljc1MTMzMzMzLDkuNTQyNjY2NjcgQzguNzUxMzMzMzMsMTAuMTc4NjY2NyA4LjkwNzMzMzMzLDEwLjcwMDY2NjcgOS4yMjUsMTEuMTAyNjY2NyBDOS41NjQzMzMzMywxMS41MzQ2NjY3IDEwLjAzODMzMzMsMTEuNzUwNjY2NyAxMC42NTIzMzMzLDExLjc1MDY2NjcgQzEwLjk5NzMzMzMsMTEuNzUwNjY2NyAxMS4zMDQzMzMzLDExLjcwMjY2NjcgMTEuNTg0MzMzMywxMS42MDY2NjY3IEMxMS44NDEzNDcyLDExLjUxNjExMTQgMTIuMDc4ODcxMywxMS4zNzc2Njg3IDEyLjI4NDMzMzMsMTEuMTk4NjY2NyBMMTIuMjg0MzMzMyw5LjM4NjY2NjY3IEwxMC42MzY2NjY3LDkuMzg2NjY2NjcgTDEwLjYzNjY2NjcsOS45ODY2NjY2NyBMMTEuNjU0NjY2Nyw5Ljk4NjY2NjY3IEwxMS42NTQ2NjY3LDEwLjg2ODY2NjcgQzExLjUyNjA4MzIsMTAuOTUzMjAxNiAxMS4zODY1NzY4LDExLjAxOTgxNDggMTEuMjQsMTEuMDY2NjY2NyBDMTEuMDcyMDU4NywxMS4xMTU1NTc4IDEwLjg5NzkwOTUsMTEuMTM5ODEwNyAxMC43MjMsMTEuMTM4NjY2NyBDMTAuMjU0MzMzMywxMS4xMzg2NjY3IDkuOTA5NjY2NjcsMTAuOTk0NjY2NyA5LjY4ODY2NjY3LDEwLjcwNjY2NjcgQzkuNDg0LDEwLjQzNjY2NjcgOS4zODIsMTAuMDQ2NjY2NyA5LjM4Miw5LjU0MjY2NjY3IEM5LjM4Miw5LjAxNDY2NjY3IDkuNDk0NjY2NjcsOC42MTI2NjY2NyA5LjcyNjMzMzMzLDguMzI0NjY2NjcgQzkuOTM2MzMzMzMsOC4wNDg2NjY2NyAxMC4yMjIsNy45MTY2NjY2NyAxMC41ODMsNy45MTY2NjY2NyBDMTAuODczNjY2Nyw3LjkxNjY2NjY3IDExLjExMDY2NjcsNy45ODI2NjY2NyAxMS4yODgzMzMzLDguMTIwNjY2NjcgQzExLjQ2MDY2NjcsOC4yNTg2NjY2NyAxMS41NzkzMzMzLDguNDYyNjY2NjcgMTEuNjMzLDguNzM4NjY2NjcgTDEyLjI2ODY2NjcsOC43Mzg2NjY2NyBDMTIuMTk4NjY2Nyw4LjI1ODY2NjY3IDEyLjAyNjMzMzMsNy45MDQ2NjY2NyAxMS43NTE2NjY3LDcuNjY0NjY2NjcgQzExLjQ2Niw3LjQxODY2NjY3IDExLjA3ODMzMzMsNy4yOTg2NjY2NyAxMC41ODI2NjY3LDcuMjk4NjY2NjcgTDEwLjU4MjMzMzMsNy4yOTg2NjY2NyBaIiBpZD0i5b2i54q2Ij48L3BhdGg+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==", Cu = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+UFBU5Zu+5qCHPC90aXRsZT4KICAgIDxnIGlkPSLkvpvlupTllYbnrqHnkIYiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSLkvpvlupTllYbnrqHnkIYt5L6b5bqU5ZWG5YiX6KGo6K+m5oOFLTIw5p2h6ZmE5Lu2IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMzgzLjAwMDAwMCwgLTg5MS4wMDAwMDApIiBmaWxsPSIjRjg1MjA3IiBmaWxsLXJ1bGU9Im5vbnplcm8iPgogICAgICAgICAgICA8ZyBpZD0i57yW57uELTIx5aSH5Lu9LTUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDM3NS4wMDAwMDAsIDg4NS4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxnIGlkPSJQUFTlm77moIciIHRyYW5zZm9ybT0idHJhbnNsYXRlKDguMDAwMDAwLCA2LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0zLDYgTDEzLDYgQzEzLjE3NjgxMSw2IDEzLjM0NjM4MDMsNi4wNzAyMzc4OSAxMy40NzE0MDQ1LDYuMTk1MjYyMTUgQzEzLjU5NjQyODgsNi4zMjAyODY0IDEzLjY2NjY2NjcsNi40ODk4NTU2OCAxMy42NjY2NjY3LDYuNjY2NjY2NjcgTDEzLjY2NjY2NjcsMTIuMzMzMzMzMyBDMTMuNjY2NjY2NywxMi43MDE1MjMyIDEzLjM2ODE4OTgsMTMgMTMsMTMgTDMsMTMgTDMsMTQuNjY2NjY2NyBDMywxNC43NTUwNzIyIDMuMDM1MTE4OTUsMTQuODM5ODU2OCAzLjA5NzYzMTA3LDE0LjkwMjM2ODkgQzMuMTYwMTQzMiwxNC45NjQ4ODExIDMuMjQ0OTI3ODMsMTUgMy4zMzMzMzMzMywxNSBMMTQuNjY2NjY2NywxNSBDMTQuODUwNzYxNiwxNSAxNSwxNC44NTA3NjE2IDE1LDE0LjY2NjY2NjcgTDE1LDQuODI1MzMzMzMgTDE0Ljg0MjMzMzMsNC42NjY2NjY2NyBMMTIuODY1MzMzMyw0LjY2NjY2NjY3IEMxMi4wMTkyMzMxLDQuNjY2NjY2NjcgMTEuMzMzMzMzMywzLjk4MDc2NjkxIDExLjMzMzMzMzMsMy4xMzQ2NjY2NyBMMTEuMzMzMzMzMywxLjEzNTMzMzMzIEwxMS4xOTg2NjY3LDEgTDMuMzMzMzMzMzMsMSBDMy4yNDQ5Mjc4MywxIDMuMTYwMTQzMiwxLjAzNTExODk1IDMuMDk3NjMxMDcsMS4wOTc2MzEwNyBDMy4wMzUxMTg5NSwxLjE2MDE0MzIgMywxLjI0NDkyNzgzIDMsMS4zMzMzMzMzMyBMMyw2IFogTTIsMTMgTDAuNjY2NjY2NjcyLDEzIEMwLjI5ODQ3NjgzNiwxMyAwLDEyLjcwMTUyMzIgMCwxMi4zMzMzMzMzIEwwLDYuNjY2NjY2NjcgQzAsNi40ODk4NTU2OCAwLjA3MDIzNzg5NDEsNi4zMjAyODY0IDAuMTk1MjYyMTQ3LDYuMTk1MjYyMTUgQzAuMzIwMjg2NDAxLDYuMDcwMjM3ODkgMC40ODk4NTU2NzcsNiAwLjY2NjY2NjY3Miw2IEwyLDYgTDIsMS4zMzMzMzMzMyBDMiwwLjU5Njk1MzY2NSAyLjU5Njk1MzY2LDAgMy4zMzMzMzMzMywwIEwxMS42MTUsMCBMMTYsNC40MTMzMzMzMyBMMTYsMTQuNjY2NjY2NyBDMTYsMTUuNDAzMDQ2MyAxNS40MDMwNDYzLDE2IDE0LjY2NjY2NjcsMTYgTDMuMzMzMzMzMzMsMTYgQzIuNTk2OTUzNjYsMTYgMiwxNS40MDMwNDYzIDIsMTQuNjY2NjY2NyBMMiwxMyBMMiwxMyBaIE0xLjQ3ODMzMzMzLDcuMzgyNjY2NjcgTDEuNDc4MzMzMzMsMTEuNjY2NjY2NyBMMi4xODAzMzMzMywxMS42NjY2NjY3IEwyLjE4MDMzMzMzLDEwLjAyMjY2NjcgTDMuMjQyMzMzMzMsMTAuMDIyNjY2NyBDNC4yODYzMzMzMywxMC4wMjI2NjY3IDQuODA4MzMzMzMsOS41Nzg2NjY2NyA0LjgwODMzMzMzLDguNjk2NjY2NjcgQzQuODA4MzMzMzMsNy44MjA2NjY2NyA0LjI4NjMzMzMzLDcuMzgyNjY2NjcgMy4yNTQzMzMzMyw3LjM4MjY2NjY3IEwxLjQ3ODMzMzMzLDcuMzgyNjY2NjcgWiBNMi4xODAzMzMzMyw3Ljk4MjY2NjY3IEwzLjIwMDMzMzMzLDcuOTgyNjY2NjcgQzMuNTA2MzMzMzMsNy45ODI2NjY2NyAzLjczNDMzMzMzLDguMDM2NjY2NjcgMy44NzgzMzMzMyw4LjE1MDY2NjY3IEM0LjAyMjMzMzMzLDguMjU4NjY2NjcgNC4xMDAzMzMzMyw4LjQzODY2NjY3IDQuMTAwMzMzMzMsOC42OTY2NjY2NyBDNC4xMDAzMzMzMyw4Ljk1NDY2NjY3IDQuMDI4MzMzMzMsOS4xNDA2NjY2NyAzLjg4NDMzMzMzLDkuMjU0NjY2NjcgQzMuNzQwMzMzMzMsOS4zNjI2NjY2NyAzLjUxMjMzMzMzLDkuNDIyNjY2NjcgMy4yMDAzMzMzMyw5LjQyMjY2NjY3IEwyLjE4MDMzMzMzLDkuNDIyNjY2NjcgTDIuMTgwMzMzMzMsNy45ODI2NjY2NyBMMi4xODAzMzMzMyw3Ljk4MjY2NjY3IFogTTUuNDA4MzMzMzMsNy4zODI2NjY2NyBMNS40MDgzMzMzMywxMS42NjY2NjY3IEw2LjExMDMzMzMzLDExLjY2NjY2NjcgTDYuMTEwMzMzMzMsMTAuMDIyNjY2NyBMNy4xNzIzMzMzMywxMC4wMjI2NjY3IEM4LjIxNjMzMzMzLDEwLjAyMjY2NjcgOC43MzgzMzMzMyw5LjU3ODY2NjY3IDguNzM4MzMzMzMsOC42OTY2NjY2NyBDOC43MzgzMzMzMyw3LjgyMDY2NjY3IDguMjE2MzMzMzMsNy4zODI2NjY2NyA3LjE4NDMzMzMzLDcuMzgyNjY2NjcgTDUuNDA4MzMzMzMsNy4zODI2NjY2NyBaIE02LjExMDMzMzMzLDcuOTgyNjY2NjcgTDcuMTMwMzMzMzMsNy45ODI2NjY2NyBDNy40MzYzMzMzMyw3Ljk4MjY2NjY3IDcuNjY0MzMzMzMsOC4wMzY2NjY2NyA3LjgwODMzMzMzLDguMTUwNjY2NjcgQzcuOTUyMzMzMzMsOC4yNTg2NjY2NyA4LjAzMDMzMzMzLDguNDM4NjY2NjcgOC4wMzAzMzMzMyw4LjY5NjY2NjY3IEM4LjAzMDMzMzMzLDguOTU0NjY2NjcgNy45NTgzMzMzMyw5LjE0MDY2NjY3IDcuODE0MzMzMzMsOS4yNTQ2NjY2NyBDNy42NzAzMzMzMyw5LjM2MjY2NjY3IDcuNDQyMzMzMzMsOS40MjI2NjY2NyA3LjEzMDMzMzMzLDkuNDIyNjY2NjcgTDYuMTEwMzMzMzMsOS40MjI2NjY2NyBMNi4xMTAzMzMzMyw3Ljk4MjY2NjY3IEw2LjExMDMzMzMzLDcuOTgyNjY2NjcgWiBNOS4wMDgzMzMzMyw3LjM4MjY2NjY3IEw5LjAwODMzMzMzLDcuOTgyNjY2NjcgTDEwLjQxMjMzMzMsNy45ODI2NjY2NyBMMTAuNDEyMzMzMywxMS42NjY2NjY3IEwxMS4xMTQzMzMzLDExLjY2NjY2NjcgTDExLjExNDMzMzMsNy45ODI2NjY2NyBMMTIuNTE4MzMzMyw3Ljk4MjY2NjY3IEwxMi41MTgzMzMzLDcuMzgyNjY2NjcgTDkuMDA4MzMzMzMsNy4zODI2NjY2NyBaIiBpZD0i5b2i54q2Ij48L3BhdGg+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==", Kj = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+WExT5Zu+5qCHPC90aXRsZT4KICAgIDxnIGlkPSLkvpvlupTllYbnrqHnkIYiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSLkvpvlupTllYbnrqHnkIYt5L6b5bqU5ZWG5YiX6KGo6K+m5oOFLTIw5p2h6ZmE5Lu2IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMzgzLjAwMDAwMCwgLTc3MS4wMDAwMDApIiBmaWxsPSIjNzdENDI1IiBmaWxsLXJ1bGU9Im5vbnplcm8iPgogICAgICAgICAgICA8ZyBpZD0i57yW57uELTIx5aSH5Lu9LTIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDM3NS4wMDAwMDAsIDc2NS4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxnIGlkPSJYTFPlm77moIciIHRyYW5zZm9ybT0idHJhbnNsYXRlKDguMDAwMDAwLCA2LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xMS42MTUsMCBMMTYsNC40MTMzMzMzMyBMMTYsMTQuNjY2NjY2NyBDMTYsMTUuNDAzMDQ2MyAxNS40MDMwNDYzLDE2IDE0LjY2NjY2NjcsMTYgTDMuMzMzMzMzMzMsMTYgQzIuNTk2OTUzNjYsMTYgMiwxNS40MDMwNDYzIDIsMTQuNjY2NjY2NyBMMiwxMyBMMC42NjY2NjY2NzIsMTMgQzAuMjk4NDc2ODM2LDEzIDAsMTIuNzAxNTIzMiAwLDEyLjMzMzMzMzMgTDAsNi42NjY2NjY2NyBDMCw2LjQ4OTg1NTY4IDAuMDcwMjM3ODk0MSw2LjMyMDI4NjQgMC4xOTUyNjIxNDcsNi4xOTUyNjIxNSBDMC4zMjAyODY0MDEsNi4wNzAyMzc4OSAwLjQ4OTg1NTY3Nyw2IDAuNjY2NjY2NjcyLDYgTDIsNiBMMiwxLjMzMzMzMzMzIEMyLDAuNTk2OTUzNjY1IDIuNTk2OTUzNjYsMCAzLjMzMzMzMzMzLDAgTDExLjYxNSwwIFogTTExLjE5ODY2NjcsMSBMMy4zMzMzMzMzMywxIEMzLjI0NDkyNzgzLDEgMy4xNjAxNDMyLDEuMDM1MTE4OTUgMy4wOTc2MzEwNywxLjA5NzYzMTA3IEMzLjAzNTExODk1LDEuMTYwMTQzMiAzLDEuMjQ0OTI3ODMgMywxLjMzMzMzMzMzIEwzLDYgTDEzLDYgQzEzLjE3NjgxMSw2IDEzLjM0NjM4MDMsNi4wNzAyMzc4OSAxMy40NzE0MDQ1LDYuMTk1MjYyMTUgQzEzLjU5NjQyODgsNi4zMjAyODY0IDEzLjY2NjY2NjcsNi40ODk4NTU2OCAxMy42NjY2NjY3LDYuNjY2NjY2NjcgTDEzLjY2NjY2NjcsMTIuMzMzMzMzMyBDMTMuNjY2NjY2NywxMi43MDE1MjMyIDEzLjM2ODE4OTgsMTMgMTMsMTMgTDMsMTMgTDMsMTQuNjY2NjY2NyBDMywxNC43NTUwNzIyIDMuMDM1MTE4OTUsMTQuODM5ODU2OCAzLjA5NzYzMTA3LDE0LjkwMjM2ODkgQzMuMTYwMTQzMiwxNC45NjQ4ODExIDMuMjQ0OTI3ODMsMTUgMy4zMzMzMzMzMywxNSBMMTQuNjY2NjY2NywxNSBDMTQuODUwNzYxNiwxNSAxNSwxNC44NTA3NjE2IDE1LDE0LjY2NjY2NjcgTDE1LDQuODI1MzMzMzMgTDE0Ljg0MjMzMzMsNC42NjY2NjY2NyBMMTIuODY1MzMzMyw0LjY2NjY2NjY3IEMxMi4wMTkyMzMxLDQuNjY2NjY2NjcgMTEuMzMzMzMzMywzLjk4MDc2NjkxIDExLjMzMzMzMzMsMy4xMzQ2NjY2NyBMMTEuMzMzMzMzMywxLjEzNTY2NjY3IEwxMS4xOTg2NjY3LDEgWiBNMTAuMzYxNjY2Nyw3LjI5ODY2NjY3IEM5Ljg5OTY2NjY3LDcuMjk4NjY2NjcgOS41MjE2NjY2Nyw3LjQwMDY2NjY3IDkuMjIxNjY2NjcsNy42MTA2NjY2NyBDOC44OTc2NjY2Nyw3LjgyNjY2NjY3IDguNzQxNjY2NjcsOC4xMjY2NjY2NyA4Ljc0MTY2NjY3LDguNTA0NjY2NjcgQzguNzQxNjY2NjcsOC44ODI2NjY2NyA4LjkwMzY2NjY3LDkuMTcwNjY2NjcgOS4yMzM2NjY2Nyw5LjM2ODY2NjY3IEM5LjM1OTY2NjY3LDkuNDQwNjY2NjcgOS42ODk2NjY2Nyw5LjU2MDY2NjY3IDEwLjIxNzY2NjcsOS43Mjg2NjY2NyBDMTAuNjkxNjY2Nyw5Ljg3MjY2NjY3IDEwLjk2NzY2NjcsOS45Njg2NjY2NyAxMS4wNTE2NjY3LDEwLjAxMDY2NjcgQzExLjMxNTY2NjcsMTAuMTQyNjY2NyAxMS40NTM2NjY3LDEwLjMyMjY2NjcgMTEuNDUzNjY2NywxMC41NTA2NjY3IEMxMS40NTM2NjY3LDEwLjczMDY2NjcgMTEuMzU3NjY2NywxMC44Njg2NjY3IDExLjE3NzY2NjcsMTAuOTc2NjY2NyBDMTAuOTk3NjY2NywxMS4wNzg2NjY3IDEwLjc0NTY2NjcsMTEuMTMyNjY2NyAxMC40MzM2NjY3LDExLjEzMjY2NjcgQzEwLjA3OTY2NjcsMTEuMTMyNjY2NyA5LjgyMTY2NjY3LDExLjA2NjY2NjcgOS42NTM2NjY2NywxMC45NDY2NjY3IEM5LjQ2NzY2NjY3LDEwLjgwODY2NjcgOS4zNTM2NjY2NywxMC41NzQ2NjY3IDkuMzA1NjY2NjcsMTAuMjUwNjY2NyBMOC42MDk2NjY2NywxMC4yNTA2NjY3IEM4LjYzOTY2NjY3LDEwLjc5NjY2NjcgOC44Mzc2NjY2NywxMS4xOTI2NjY3IDkuMTk3NjY2NjcsMTEuNDQ0NjY2NyBDOS40OTE2NjY2NywxMS42NDg2NjY3IDkuOTA1NjY2NjcsMTEuNzUwNjY2NyAxMC40MzM2NjY3LDExLjc1MDY2NjcgQzEwLjk3OTY2NjcsMTEuNzUwNjY2NyAxMS40MDU2NjY3LDExLjYzNjY2NjcgMTEuNzA1NjY2NywxMS40MjA2NjY3IEMxMi4wMDU2NjY3LDExLjE5ODY2NjcgMTIuMTU1NjY2NywxMC44OTI2NjY3IDEyLjE1NTY2NjcsMTAuNTA4NjY2NyBDMTIuMTU1NjY2NywxMC4xMTI2NjY3IDExLjk2OTY2NjcsOS44MDY2NjY2NyAxMS41OTc2NjY3LDkuNTg0NjY2NjcgQzExLjQyOTY2NjcsOS40ODg2NjY2NyAxMS4wNTc2NjY3LDkuMzQ0NjY2NjcgMTAuNDc1NjY2Nyw5LjE2NDY2NjY3IEMxMC4wNzk2NjY3LDkuMDM4NjY2NjcgOS44MzM2NjY2Nyw4Ljk0ODY2NjY3IDkuNzQzNjY2NjcsOC45MDA2NjY2NyBDOS41Mzk2NjY2Nyw4Ljc5MjY2NjY3IDkuNDQzNjY2NjcsOC42NDI2NjY2NyA5LjQ0MzY2NjY3LDguNDYyNjY2NjcgQzkuNDQzNjY2NjcsOC4yNTg2NjY2NyA5LjUyNzY2NjY3LDguMTA4NjY2NjcgOS43MDc2NjY2Nyw4LjAxODY2NjY3IEM5Ljg1MTY2NjY3LDcuOTQwNjY2NjcgMTAuMDU1NjY2Nyw3LjkwNDY2NjY3IDEwLjMyNTY2NjcsNy45MDQ2NjY2NyBDMTAuNjM3NjY2Nyw3LjkwNDY2NjY3IDEwLjg3NzY2NjcsNy45NTg2NjY2NyAxMS4wMzM2NjY3LDguMDc4NjY2NjcgQzExLjE4OTY2NjcsOC4xOTI2NjY2NyAxMS4zMDM2NjY3LDguMzg0NjY2NjcgMTEuMzYzNjY2Nyw4LjY0ODY2NjY3IEwxMi4wNTk2NjY3LDguNjQ4NjY2NjcgQzEyLjAxNzY2NjcsOC4xODA2NjY2NyAxMS44NDM2NjY3LDcuODMyNjY2NjcgMTEuNTQzNjY2Nyw3LjYxMDY2NjY3IEMxMS4yNjE2NjY3LDcuNDAwNjY2NjcgMTAuODY1NjY2Nyw3LjI5ODY2NjY3IDEwLjM2MTY2NjcsNy4yOTg2NjY2NyBMMTAuMzYxNjY2Nyw3LjI5ODY2NjY3IFogTTIuNDI5NjY2NjcsNy4zODI2NjY2NyBMMS41NzE2NjY2Nyw3LjM4MjY2NjY3IEwzLjAwNTY2NjY3LDkuNDUyNjY2NjcgTDEuNDc1NjY2NjcsMTEuNjY2NjY2NyBMMi4zMzM2NjY2NywxMS42NjY2NjY3IEwzLjQzNzY2NjY3LDEwLjAxMDY2NjcgTDQuNTQxNjY2NjcsMTEuNjY2NjY2NyBMNS4zOTk2NjY2NywxMS42NjY2NjY3IEwzLjg1NzY2NjY3LDkuNDUyNjY2NjcgTDUuMzAzNjY2NjcsNy4zODI2NjY2NyBMNC40NDU2NjY2Nyw3LjM4MjY2NjY3IEwzLjQzNzY2NjY3LDguODk0NjY2NjcgTDIuNDI5NjY2NjcsNy4zODI2NjY2NyBMMi40Mjk2NjY2Nyw3LjM4MjY2NjY3IFogTTYuNDUxNjY2NjcsNy4zODI2NjY2NyBMNS43NTU2NjY2Nyw3LjM4MjY2NjY3IEw1Ljc1NTY2NjY3LDExLjY2NjY2NjcgTDguNDM0MzMzMzMsMTEuNjY2NjY2NyBMOC40MzQzMzMzMywxMS4wNjY2NjY3IEw2LjQ1MTY2NjY3LDExLjA2NjY2NjcgTDYuNDUxNjY2NjcsNy4zODI2NjY2NyBaIiBpZD0i5b2i54q2Ij48L3BhdGg+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==", bu = [".png", ".jpg", ".gif", ".jpeg"], qj = {
  ".doc": gi,
  ".docx": gi,
  ".jpg": Ni,
  ".jpeg": Ni,
  ".png": Hj,
  ".pdf": Zj,
  ".ppt": Cu,
  ".pptx": Cu,
  ".xls": Cu,
  ".xlsx": Kj
};
function $j() {
  return !!navigator.userAgent.match(/('phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone')/i);
}
function Jj(f) {
  return Array.isArray(f) ? f : f == null || f === "" ? [] : f.split(",");
}
const Xj = (f = "", s, r = !1) => f ? (r ? ez(f) : f.length) > s ? f.substring(0, s - 2) + "..." + f.substring(s - 2, s) : f : "", ez = (f) => {
  if (!f)
    return 0;
  let s = 0;
  const r = f.length;
  let o = -1;
  for (let D = 0; D < r; D++)
    o = f.charCodeAt(D), o >= 0 && o <= 128 ? s += 1 : s += 2;
  return s;
}, tz = { class: "file-icons-panel" }, nz = ["onClick"], lz = {
  key: 0,
  class: "file-name"
}, rz = fe({
  name: "FileIcons"
}), uz = /* @__PURE__ */ fe({
  ...rz,
  props: {
    files: {},
    size: {},
    isCard: { type: Boolean },
    showImg: { type: Boolean },
    preview: { type: Boolean },
    showName: { type: Boolean }
  },
  setup(f) {
    const s = f, r = h(!1), o = h(0), D = Ae(
      () => s.files.map((d) => {
        if (bu.indexOf(d.suffix || "") >= 0)
          return d.shareUrl;
      }).filter((d) => d)
    ), p = Ae(() => ({
      width: (s.size || 16) + "px",
      height: (s.size || 16) + "px"
    }));
    function m(d) {
      let M = qj[d.suffix || ""] || Gj;
      return s.showImg && bu.indexOf(d.suffix || "") >= 0 ? d.shareUrl : M;
    }
    function N(d) {
      s.preview && (bu.indexOf(d.suffix || "") >= 0 ? (o.value = D.value.indexOf(d.shareUrl || d.furl), r.value = !0) : window.open(d.previewUrl || d.shareUrl || d.furl, "_blank"));
    }
    return (d, M) => {
      const z = F("el-image"), Y = F("el-image-viewer");
      return _(), V("div", tz, [
        d.files && d.files.length ? (_(), V("div", {
          key: 0,
          class: bn([d.isCard ? "card-list" : "file-list"])
        }, [
          (_(!0), V(Ye, null, we(d.files, (b, E) => (_(), V("div", {
            key: E,
            class: "file-item",
            onClick: (x) => N(b)
          }, [
            ie(z, {
              src: m(b),
              style: yt(p.value),
              fit: "cover"
            }, null, 8, ["src", "style"]),
            d.showName ? (_(), V("div", lz, Ce(zt(Xj)(b.name, 50) + b.suffix), 1)) : Me("", !0)
          ], 8, nz))), 128))
        ], 2)) : Me("", !0),
        r.value ? (_(), R(Y, {
          key: 1,
          onClose: M[0] || (M[0] = (b) => r.value = !1),
          teleported: "",
          initialIndex: o.value,
          "url-list": D.value
        }, null, 8, ["initialIndex", "url-list"])) : Me("", !0)
      ]);
    };
  }
});
const oz = /* @__PURE__ */ Ge(uz, [["__scopeId", "data-v-26d8ab17"]]), sz = {
  key: 1,
  class: "no-img-tip"
}, iz = {
  name: "ElPlusFormFile",
  inheritAttrs: !1,
  typeName: "file",
  customOptions: {}
}, ki = /* @__PURE__ */ fe({
  ...iz,
  props: {
    modelValue: {},
    field: {},
    loading: { type: Boolean },
    desc: {},
    formData: {}
  },
  setup(f) {
    const s = f;
    return (r, o) => (_(), V("div", {
      class: "ele-form-file",
      style: yt({ marginTop: s.modelValue && s.modelValue.length > 0 ? "10px" : "0" })
    }, [
      s.modelValue && s.modelValue.length > 0 ? (_(), R(oz, {
        key: 0,
        files: s.modelValue,
        showName: "",
        preview: ""
      }, null, 8, ["files"])) : (_(), V("span", sz, "暂无内容"))
    ], 4));
  }
});
const az = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: ki }, Symbol.toStringTag, { value: "Module" })), cz = { class: "ele-form-image" }, Mz = { key: 1 }, fz = /* @__PURE__ */ Ie("span", { class: "no-img-tip" }, "—", -1), dz = [
  fz
], gz = {
  name: "ElPlusFormImage",
  inheritAttrs: !1,
  typeName: "image",
  customOptions: {}
}, Ui = /* @__PURE__ */ fe({
  ...gz,
  props: {
    modelValue: {},
    field: {},
    loading: { type: Boolean },
    desc: {},
    formData: {}
  },
  setup(f) {
    const s = f, r = We("format"), o = h({}), D = h(ke(s));
    be(async () => {
      o.value = await Oe(s, { isShowPreview: !0, previewTeleported: !0, ...Te() });
    });
    const p = Ae(() => s.modelValue ? Array.isArray(s.modelValue) ? typeof s.modelValue[0] == "string" ? s.modelValue : s.modelValue.map((N) => N.shareUrl || N.furl) : typeof s.modelValue == "string" ? s.modelValue.split(",").map((N) => r.imgUrl(N)) : [] : []), m = Ae(() => {
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
      return _(), V("div", cz, [
        p.value && p.value.length > 0 ? (_(!0), V(Ye, { key: 0 }, we(p.value, (z, Y) => (_(), R(M, ne({
          class: N.desc.class,
          key: z,
          "preview-src-list": o.value.isShowPreview === !1 ? null : p.value,
          "initial-index": Y,
          src: zt(r).imgUrl(z)
        }, o.value, { style: m.value }, Le(D.value), {
          fit: o.value.fit || "cover"
        }), null, 16, ["class", "preview-src-list", "initial-index", "src", "style", "fit"]))), 128)) : (_(), V("div", Mz, dz))
      ]);
    };
  }
});
const Nz = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: Ui }, Symbol.toStringTag, { value: "Module" })), pz = {
  name: "ElPlusFormInput",
  inheritAttrs: !1,
  typeName: "input",
  customOptions: {}
}, Qi = /* @__PURE__ */ fe({
  ...pz,
  props: {
    modelValue: {},
    field: {},
    desc: {},
    formData: {}
  },
  emits: ["update:modelValue", "validateThis"],
  setup(f, { emit: s }) {
    const r = f, o = We("defaultConf"), D = h(Object.assign({}, Mn(), r.desc.slots)), p = h({}), m = h(ke(r)), N = h();
    return s("update:modelValue", N), be(async () => {
      var d;
      p.value = await Oe(r, { autocomplete: "new-password", maxlength: (d = o.form) == null ? void 0 : d.leng.input, clearable: !0, ...Te() });
    }), He(
      () => r.modelValue,
      (d) => {
        d && d.length > p.value.maxlength && (d = d.substring(0, p.value.maxlength)), N.value = d;
      },
      { immediate: !0 }
    ), He(
      () => N.value,
      () => {
        s("validateThis");
      }
    ), (d, M) => {
      const z = F("el-input");
      return _(), R(z, ne({ style: { display: "flex" } }, p.value, Le(m.value), {
        modelValue: N.value,
        "onUpdate:modelValue": M[0] || (M[0] = (Y) => N.value = Y)
      }), en({ _: 2 }, [
        we(D.value, (Y, b, E) => ({
          name: b,
          fn: U(() => [
            $e(d.$slots, b)
          ])
        }))
      ]), 1040, ["modelValue"]);
    };
  }
}), jz = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: Qi }, Symbol.toStringTag, { value: "Module" })), zz = (f) => (hi("data-v-e9e128a8"), f = f(), Yi(), f), yz = { class: "el-plus-form-link" }, Dz = {
  style: { width: "100%" },
  class: "form-link-dialog"
}, _z = { class: "panel-left" }, mz = {
  key: 0,
  class: "panel-right"
}, hz = /* @__PURE__ */ zz(() => /* @__PURE__ */ Ie("div", { class: "right-title" }, "已选中项：", -1)), Yz = { class: "btn-panel" }, vz = {
  name: "ElPlusFormLink",
  inheritAttrs: !1,
  typeName: "link",
  customOptions: {}
}, Iz = /* @__PURE__ */ fe({
  ...vz,
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
    const p = h(), m = lt([]), N = lt([]), d = lt({
      multiple: !0,
      size: r.desc.size,
      collapseTags: !0,
      collapseTagsTooltip: !0,
      clearable: !0,
      placeholder: r.desc.placeholder || "请选择" + r.desc.label
    }), M = h(!1), z = h({}), Y = Ae(() => r.desc.vkey || "id"), b = h(!1), E = h(), x = lt([]);
    function Q(P) {
      P && (p.value.blur(), M.value = !0);
    }
    function B() {
      x.splice(0, x.length), w();
    }
    function K(P) {
      x.splice(0, x.length), P.map((k) => {
        x.push({ label: k[r.desc.lkey || "name"], value: k[Y.value], dataItem: k });
      });
    }
    function ue({ row: P }) {
      x.splice(0, x.length), x.push({ label: P[r.desc.lkey || "name"], value: P[Y.value], dataItem: P }), w();
    }
    function me(P) {
      x.splice(
        x.findIndex((k) => k.value === P.value),
        1
      ), E.value.changeSelect([{ [Y.value]: P.value }]);
    }
    function te() {
      M.value = !1;
    }
    function w() {
      N.splice(0, N.length, ...x);
      const P = [], k = [];
      m.splice(0, m.length), x.map((ge) => {
        m.push(ge.value), P.push(ge.value), k.push(ge.label);
      }), D.value = x.length > 0 ? [P, k] : [], o.value.change && o.value.change(r.formData, null, D.value), M.value = !1, s("validateThis");
    }
    return He(
      () => r.desc.tableConfig,
      (P) => {
        let k = {};
        P && (k = Dt.cloneDeep(P), typeof r.desc.multiple == "function" ? b.value = r.desc.multiple(r.formData) : b.value = r.desc.multiple, b.value || !b.value && k.column[k.column.length - 1].label !== "操作" && k.column.push({ label: "操作", width: "120px", fixed: "right", type: "btns", btns: [{ label: "选中", on: { click: ue } }] }), k.maxHeight = 400), z.value = k;
      },
      { deep: !0, immediate: !0 }
    ), cn(async () => {
    }), (P, k) => {
      const ge = F("el-option"), Ue = F("el-select"), Ke = F("ElPlusTable"), _t = F("el-tag"), vt = F("el-scrollbar"), tn = F("el-button"), nn = F("el-dialog");
      return _(), V("div", yz, [
        ie(Ue, ne({
          ref_key: "selectRef",
          ref: p,
          style: [{ width: "100%" }, P.desc.style],
          class: P.desc.class
        }, d, {
          teleported: !1,
          loading: P.loading,
          modelValue: m,
          onVisibleChange: Q,
          onClear: B
        }, Le(o.value)), {
          default: U(() => [
            (_(!0), V(Ye, null, we(N, (dt) => (_(), R(ge, ne({
              key: dt.value
            }, dt), null, 16))), 128))
          ]),
          _: 1
        }, 16, ["class", "style", "loading", "modelValue"]),
        ie(nn, {
          width: P.desc.dialogWidth || "1000px",
          title: P.desc.title || P.desc.placeholder || "请选择" + P.desc.label,
          draggable: "",
          closeOnClickModal: !1,
          showCancel: "",
          modelValue: M.value,
          "onUpdate:modelValue": k[0] || (k[0] = (dt) => M.value = dt),
          "append-to-body": "",
          "destroy-on-close": ""
        }, {
          default: U(() => [
            Ie("div", Dz, [
              Ie("div", _z, [
                z.value ? (_(), R(Ke, {
                  key: 0,
                  ref_key: "multipleTableRef",
                  ref: E,
                  tableConfig: z.value,
                  type: b.value ? "selection" : "index",
                  isIndex: !1,
                  rowKey: Y.value,
                  onSelection: K
                }, null, 8, ["tableConfig", "type", "rowKey"])) : Me("", !0)
              ]),
              b.value ? (_(), V("div", mz, [
                hz,
                ie(vt, {
                  height: "480px",
                  class: "tag-list"
                }, {
                  default: U(() => [
                    (_(!0), V(Ye, null, we(x, (dt) => (_(), R(_t, {
                      class: "tag-item",
                      style: { "margin-right": "10px", "margin-bottom": "10px" },
                      key: dt.value,
                      closable: "",
                      onClose: () => me(dt)
                    }, {
                      default: U(() => [
                        Be(Ce(dt.label), 1)
                      ]),
                      _: 2
                    }, 1032, ["onClose"]))), 128))
                  ]),
                  _: 1
                }),
                Ie("div", Yz, [
                  ie(tn, { onClick: te }, {
                    default: U(() => [
                      Be("取消")
                    ]),
                    _: 1
                  }),
                  ie(tn, {
                    type: "primary",
                    onClick: w
                  }, {
                    default: U(() => [
                      Be("确定")
                    ]),
                    _: 1
                  })
                ])
              ])) : Me("", !0)
            ])
          ]),
          _: 1
        }, 8, ["width", "title", "modelValue"])
      ]);
    };
  }
});
const Pi = /* @__PURE__ */ Ge(Iz, [["__scopeId", "data-v-e9e128a8"]]), wz = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: Pi }, Symbol.toStringTag, { value: "Module" }));
/*! Element Plus Icons Vue v2.1.0 */
var Al = (f, s) => {
  let r = f.__vccOpts || f;
  for (let [o, D] of s)
    r[o] = D;
  return r;
}, Az = {
  name: "Loading"
}, Tz = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
}, Lz = /* @__PURE__ */ Ie(
  "path",
  {
    fill: "currentColor",
    d: "M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32zm448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32zm-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32zM195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248zM828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0zm-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0z"
  },
  null,
  -1
  /* HOISTED */
), xz = [
  Lz
];
function Ez(f, s, r, o, D, p) {
  return _(), V("svg", Tz, xz);
}
var Cz = /* @__PURE__ */ Al(Az, [["render", Ez], ["__file", "loading.vue"]]), bz = {
  name: "Plus"
}, Oz = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
}, Sz = /* @__PURE__ */ Ie(
  "path",
  {
    fill: "currentColor",
    d: "M480 480V128a32 32 0 0 1 64 0v352h352a32 32 0 1 1 0 64H544v352a32 32 0 1 1-64 0V544H128a32 32 0 0 1 0-64h352z"
  },
  null,
  -1
  /* HOISTED */
), Bz = [
  Sz
];
function kz(f, s, r, o, D, p) {
  return _(), V("svg", Oz, Bz);
}
var Uz = /* @__PURE__ */ Al(bz, [["render", kz], ["__file", "plus.vue"]]), Qz = {
  name: "Share"
}, Pz = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
}, Vz = /* @__PURE__ */ Ie(
  "path",
  {
    fill: "currentColor",
    d: "m679.872 348.8-301.76 188.608a127.808 127.808 0 0 1 5.12 52.16l279.936 104.96a128 128 0 1 1-22.464 59.904l-279.872-104.96a128 128 0 1 1-16.64-166.272l301.696-188.608a128 128 0 1 1 33.92 54.272z"
  },
  null,
  -1
  /* HOISTED */
), Fz = [
  Vz
];
function Rz(f, s, r, o, D, p) {
  return _(), V("svg", Pz, Fz);
}
var pi = /* @__PURE__ */ Al(Qz, [["render", Rz], ["__file", "share.vue"]]), Wz = {
  name: "UserFilled"
}, Gz = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
}, Zz = /* @__PURE__ */ Ie(
  "path",
  {
    fill: "currentColor",
    d: "M288 320a224 224 0 1 0 448 0 224 224 0 1 0-448 0zm544 608H160a32 32 0 0 1-32-32v-96a160 160 0 0 1 160-160h448a160 160 0 0 1 160 160v96a32 32 0 0 1-32 32z"
  },
  null,
  -1
  /* HOISTED */
), Hz = [
  Zz
];
function Kz(f, s, r, o, D, p) {
  return _(), V("svg", Gz, Hz);
}
var ji = /* @__PURE__ */ Al(Wz, [["render", Kz], ["__file", "user-filled.vue"]]), qz = {
  name: "WarningFilled"
}, $z = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
}, Jz = /* @__PURE__ */ Ie(
  "path",
  {
    fill: "currentColor",
    d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 192a58.432 58.432 0 0 0-58.24 63.744l23.36 256.384a35.072 35.072 0 0 0 69.76 0l23.296-256.384A58.432 58.432 0 0 0 512 256zm0 512a51.2 51.2 0 1 0 0-102.4 51.2 51.2 0 0 0 0 102.4z"
  },
  null,
  -1
  /* HOISTED */
), Xz = [
  Jz
];
function e2(f, s, r, o, D, p) {
  return _(), V("svg", $z, Xz);
}
var t2 = /* @__PURE__ */ Al(qz, [["render", e2], ["__file", "warning-filled.vue"]]);
const n2 = (f) => (hi("data-v-3d7d6cbc"), f = f(), Yi(), f), l2 = { class: "el-plus-form-link-user" }, r2 = {
  style: { width: "100%" },
  class: "form-link-user-dialog"
}, u2 = { class: "panel-left" }, o2 = { class: "dept-breadcrumb" }, s2 = { style: { display: "flex", "align-items": "center" } }, i2 = { class: "panel-right" }, a2 = /* @__PURE__ */ n2(() => /* @__PURE__ */ Ie("div", { class: "right-title" }, "已选中项：", -1)), c2 = { class: "btn-panel" }, M2 = {
  name: "ElPlusFormLkuser",
  inheritAttrs: !1,
  typeName: "lkuser",
  customOptions: {}
}, f2 = /* @__PURE__ */ fe({
  ...M2,
  props: {
    modelValue: {},
    field: {},
    loading: { type: Boolean },
    desc: {},
    formData: {}
  },
  emits: ["update:modelValue", "change", "input", "validateThis"],
  setup(f, { emit: s }) {
    const r = f, o = We("globalData"), D = We("defaultConf"), p = h(w(r)), m = h(r.modelValue || []);
    s("update:modelValue", m);
    const N = h(), d = lt([]), M = lt([]), z = lt({
      multiple: !0,
      size: r.desc.size,
      collapseTags: !1,
      collapseTagsTooltip: !1,
      clearable: !0
    }), Y = h(!1), b = lt([]), E = lt([]), x = h({});
    async function Q(G) {
      E.splice(0, E.length, ...await Ue(G));
    }
    const B = h([]), K = h([]), ue = h([]), me = h(), te = Ae(() => {
      var ee, q;
      const G = [];
      let X = Dt.cloneDeep(o[((q = (ee = D.form) == null ? void 0 : ee.linkUser) == null ? void 0 : q.deptListKey) || ""]);
      return B.value && B.value.length > 0 && B.value.map((je) => {
        X = X[je].children || [];
      }), X.map((je) => G.push({ type: 2, label: je.name, value: je.id })), ue.value.map((je) => G.push({ type: 1, label: je.nickname, value: je.userId })), Xt(() => {
        setTimeout(() => {
          G.map((je) => {
            var it;
            (it = me.value) == null || it.toggleRowSelection(
              je,
              b.some((rt) => rt.value === je.value)
            );
          });
        }, 10);
      }), G;
    });
    function w(G) {
      var ee;
      const X = {};
      return (ee = G.desc) != null && ee.on && Object.keys(G.desc.on).map((q) => {
        X[q] = (je) => {
          G.desc.on[q](G.formData, G.rowIndex, je);
        };
      }), X;
    }
    function P(G) {
      G && (N.value.blur(), Y.value = !0);
    }
    function k() {
      b.splice(0, b.length), te.value.map((G) => {
        var X;
        (X = me.value) == null || X.toggleRowSelection(
          G,
          b.some((ee) => ee.value === G.value)
        );
      }), L();
    }
    function ge(G) {
      Wt({ ...E.find((X) => X.value === G), type: 1 });
    }
    async function Ue(G) {
      var X, ee, q;
      return G.length > 0 ? (q = (await ((ee = (X = D.form) == null ? void 0 : X.linkUser) == null ? void 0 : ee.getUserList({ nickname: G, current: 1, size: 10, enabled: 1 }))).records) == null ? void 0 : q.map((je) => ({ value: je.userId, label: je.nickname })) : [];
    }
    async function Ke(G, X) {
      var ee, q;
      ue.value = (await ((q = (ee = D.form) == null ? void 0 : ee.linkUser) == null ? void 0 : q.getUserList({ deptId: G.value, size: 999 }))).records, B.value.push(X), K.value.push(G);
    }
    async function _t(G) {
      var X, ee;
      ue.value = G >= 0 ? (await ((ee = (X = D.form) == null ? void 0 : X.linkUser) == null ? void 0 : ee.getUserList({ deptId: K.value[G].value, size: 999 }))).records : [], B.value.splice(G + 1), K.value.splice(G + 1);
    }
    function vt(G) {
      return r.desc.onlyUser ? G.type === 1 : !0;
    }
    function tn(G, X) {
      Wt(X, !G.some((ee) => ee.value === X.value));
    }
    function nn(G) {
      const X = !(G && G.length > 0);
      te.value.map((ee) => {
        (!r.desc.onlyUser || r.desc.onlyUser && ee.type === 1) && Wt(ee, X);
      });
    }
    function dt(G) {
      var X;
      te.value.some((ee) => ee.value === G.value) && ((X = me.value) == null || X.toggleRowSelection(G, !1)), Wt(G, !0);
    }
    function Wt(G, X = !1) {
      const ee = b.findIndex((q) => q.value === G.value);
      X ? ee >= 0 && b.splice(ee, 1) : ee < 0 && b.push(G);
    }
    function I() {
      Y.value = !1;
    }
    function L() {
      M.splice(0, M.length, ...b);
      const G = [], X = [], ee = [], q = [];
      d.splice(0, d.length), b.map((je) => {
        d.push(je.value), je.type === 1 ? (G.push(je.value), ee.push(je.label)) : (X.push(je.value), q.push(je.label));
      }), Y.value = !1, m.value = b.length > 0 ? [G, X, ee, q] : [], p.value.change && p.value.change(r.formData, null, m.value), s("validateThis");
    }
    function J() {
      const G = [];
      if (r.modelValue) {
        let [X, ee, q, je] = r.modelValue;
        ee && je && ee.length === je.length && ee.map((it, rt) => {
          G.push({ type: 2, value: it, label: je[rt] });
        }), X && q && X.length === q.length && X.map((it, rt) => {
          G.push({ type: 1, value: it, label: q[rt] });
        });
      }
      return G;
    }
    function ae() {
      const G = [];
      if (r.modelValue) {
        let [X, ee] = r.modelValue;
        G.push(...ee || []), G.push(...X || []);
      }
      return G;
    }
    function De() {
      b.splice(0, b.length, ...J()), M.splice(0, M.length, ...J()), d.splice(0, d.length, ...ae());
    }
    return be(async () => {
      x.value = await Oe(r, {
        remote: !0,
        filterable: !0,
        remoteShowSuffix: !0,
        loadingText: "远程查询中...",
        remoteMethod: Q,
        ...Te()
      });
    }), He(
      () => r.modelValue,
      () => De(),
      { deep: !0 }
    ), cn(async () => {
      De();
    }), (G, X) => {
      const ee = F("el-option"), q = F("el-select"), je = F("el-divider"), it = F("el-breadcrumb-item"), rt = F("el-breadcrumb"), Gt = F("el-table-column"), Gn = F("el-icon"), Zt = F("el-button"), fn = F("el-table"), On = F("el-tag"), gt = F("el-scrollbar"), ln = F("el-dialog");
      return _(), V("div", l2, [
        ie(q, ne({
          ref_key: "selectRef",
          ref: N,
          style: [{ width: "100%" }, G.desc.style],
          class: G.desc.class
        }, z, {
          teleported: !1,
          loading: G.loading,
          modelValue: d,
          onVisibleChange: P,
          onClear: k
        }), {
          default: U(() => [
            (_(!0), V(Ye, null, we(M, (A) => (_(), R(ee, ne({
              key: A.value
            }, A), null, 16))), 128))
          ]),
          _: 1
        }, 16, ["class", "style", "loading", "modelValue"]),
        ie(ln, {
          width: G.desc.dialogWidth || "900px",
          title: G.desc.placeholder || "选择" + G.desc.label,
          draggable: "",
          closeOnClickModal: !1,
          showCancel: "",
          modelValue: Y.value,
          "onUpdate:modelValue": X[1] || (X[1] = (A) => Y.value = A),
          "append-to-body": "",
          "destroy-on-close": ""
        }, {
          default: U(() => [
            Ie("div", r2, [
              Ie("div", u2, [
                ie(q, ne({
                  style: { width: "300px" },
                  placeholder: "输入用户名进行搜索"
                }, x.value, { onChange: ge }), {
                  default: U(() => [
                    (_(!0), V(Ye, null, we(E, (A) => (_(), R(ee, ne({
                      key: A.value
                    }, A), null, 16))), 128))
                  ]),
                  _: 1
                }, 16),
                ie(je),
                Ie("div", o2, [
                  ie(rt, { separator: "/" }, {
                    default: U(() => [
                      ie(it, {
                        onClick: X[0] || (X[0] = (A) => _t(-1))
                      }, {
                        default: U(() => [
                          Be("组织架构")
                        ]),
                        _: 1
                      }),
                      (_(!0), V(Ye, null, we(K.value, (A, Z) => (_(), R(it, {
                        key: Z,
                        onClick: (le) => _t(Z)
                      }, {
                        default: U(() => [
                          Be(Ce(A.label), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"]))), 128))
                    ]),
                    _: 1
                  })
                ]),
                ie(fn, {
                  ref_key: "multipleTableRef",
                  ref: me,
                  data: te.value,
                  style: { width: "100%", height: "500px" },
                  "max-height": "500px",
                  onSelect: tn,
                  onSelectAll: nn
                }, {
                  default: U(() => [
                    ie(Gt, {
                      type: "selection",
                      width: "55",
                      selectable: vt
                    }),
                    ie(Gt, {
                      label: "组织/部门/人员",
                      prop: "label"
                    }, {
                      default: U(({ row: A }) => [
                        Ie("div", s2, [
                          ie(Gn, { style: { "margin-right": "5px" } }, {
                            default: U(() => [
                              A.type === 2 ? (_(), R(zt(pi), { key: 0 })) : (_(), R(zt(ji), { key: 1 }))
                            ]),
                            _: 2
                          }, 1024),
                          Be(" " + Ce(A.label), 1)
                        ])
                      ]),
                      _: 1
                    }),
                    ie(Gt, {
                      label: "操作",
                      width: "80"
                    }, {
                      default: U(({ row: A, $index: Z }) => [
                        A.type === 2 ? (_(), R(Zt, {
                          key: 0,
                          disabled: b.some((le) => le.value === A.value),
                          type: "primary",
                          text: "",
                          plain: "",
                          onClick: (le) => Ke(A, Z)
                        }, {
                          default: U(() => [
                            Be("进入")
                          ]),
                          _: 2
                        }, 1032, ["disabled", "onClick"])) : Me("", !0)
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["data"])
              ]),
              Ie("div", i2, [
                a2,
                ie(gt, {
                  height: "480px",
                  class: "tag-list"
                }, {
                  default: U(() => [
                    (_(!0), V(Ye, null, we(b, (A) => (_(), R(On, {
                      style: { "margin-right": "10px", "margin-bottom": "10px" },
                      key: A.value,
                      closable: "",
                      onClose: () => dt(A)
                    }, {
                      default: U(() => [
                        ie(Gn, { style: { "margin-right": "5px" } }, {
                          default: U(() => [
                            A.type === 2 ? (_(), R(zt(pi), { key: 0 })) : (_(), R(zt(ji), { key: 1 }))
                          ]),
                          _: 2
                        }, 1024),
                        Be(" " + Ce(A.label), 1)
                      ]),
                      _: 2
                    }, 1032, ["onClose"]))), 128))
                  ]),
                  _: 1
                }),
                Ie("div", c2, [
                  ie(Zt, { onClick: I }, {
                    default: U(() => [
                      Be("取消")
                    ]),
                    _: 1
                  }),
                  ie(Zt, {
                    type: "primary",
                    onClick: L
                  }, {
                    default: U(() => [
                      Be("确定")
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
const Vi = /* @__PURE__ */ Ge(f2, [["__scopeId", "data-v-3d7d6cbc"]]), d2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: Vi }, Symbol.toStringTag, { value: "Module" })), g2 = {
  name: "ElPlusFormNbinput",
  inheritAttrs: !1,
  typeName: "nbinput",
  customOptions: {}
}, Fi = /* @__PURE__ */ fe({
  ...g2,
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
    const D = h(Object.assign({}, Mn(), r.desc.slots)), p = h({}), m = h(ke(r));
    return be(async () => {
      p.value = await Oe(r, { ...Te() });
    }), (N, d) => {
      const M = F("el-input");
      return _(), R(M, ne({
        class: N.desc.class,
        style: N.desc.style,
        clearable: p.value.clearable ?? !0,
        type: "number"
      }, p.value, Le(m.value), {
        modelValue: o.value,
        "onUpdate:modelValue": d[0] || (d[0] = (z) => o.value = z)
      }), en({ _: 2 }, [
        we(D.value, (z, Y, b) => ({
          name: Y,
          fn: U(() => [
            $e(N.$slots, Y)
          ])
        })),
        N.desc.rtext ? {
          name: "append",
          fn: U(() => [
            Be(Ce(N.desc.rtext.text), 1)
          ]),
          key: "0"
        } : void 0
      ]), 1040, ["class", "style", "clearable", "modelValue"]);
    };
  }
});
const N2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: Fi }, Symbol.toStringTag, { value: "Module" })), p2 = {
  name: "ElPlusFormNumber",
  inheritAttrs: !1,
  typeName: "number",
  customOptions: {}
}, j2 = /* @__PURE__ */ fe({
  ...p2,
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
    const r = f, o = We("defaultConf"), D = h(r.modelValue);
    s("update:modelValue", D);
    const p = h({}), m = h(ke(r)), N = h(!1);
    be(async () => {
      var E;
      p.value = await Oe(r, { ...(E = o.form) == null ? void 0 : E.leng.nbinput, ...Te() }), delete p.value.min, delete p.value.max;
    });
    function d() {
      N.value = !1;
    }
    function M() {
      N.value || (D.value ? b(D.value, 0) : Xt(() => {
        var E, x;
        D.value = (E = r.desc) != null && E.required ? z.value.min : 0, (x = r.desc) != null && x.required || Xt(() => {
          D.value = null;
        });
      })), Xt(() => {
        s("validateThis");
      });
    }
    const z = Ae(() => {
      var x;
      let E = r.desc.attrs || ((x = o.form) == null ? void 0 : x.leng.nbinput);
      return typeof r.desc.attrs == "function" && (E = r.desc.attrs(r.formData)), E.min > E.max ? E.min = E.max : E.max < E.min && (E.max = E.min), E;
    });
    D.value !== void 0 && D.value !== null && (D.value < z.value.min ? D.value = z.value.min : D.value > z.value.max && (D.value = z.value.max));
    const Y = m.value.change;
    Y ? m.value.change = (E, x) => {
      b(E, x);
    } : m.value.change = b;
    function b(E, x) {
      var Q, B;
      N.value = !0, E !== x && (E < z.value.min ? (Wn.warning(`${((Q = r.desc) == null ? void 0 : Q.label) || ""}最少不能低于${z.value.min}`), Xt(() => {
        D.value = z.value.min;
      })) : E > z.value.max ? (Wn.warning(`${((B = r.desc) == null ? void 0 : B.label) || ""}最多不能大于${z.value.max}`), Xt(() => {
        D.value = z.value.max, Y && Y();
      })) : Y && Y());
    }
    return (E, x) => {
      const Q = F("el-input-number");
      return _(), R(Q, ne({ class: "ElPlusFormNumber-panel" }, p.value, Le(m.value), {
        modelValue: D.value,
        "onUpdate:modelValue": x[0] || (x[0] = (B) => D.value = B),
        onFocus: d,
        onBlur: M,
        onkeypress: "return( /[\\d\\.]/.test(String.fromCharCode(event.keyCode)))"
      }), null, 16, ["modelValue"]);
    };
  }
});
const Ri = /* @__PURE__ */ Ge(j2, [["__scopeId", "data-v-798814cd"]]), z2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: Ri }, Symbol.toStringTag, { value: "Module" })), y2 = {
  name: "ElPlusFormPassword",
  inheritAttrs: !1,
  typeName: "password",
  customOptions: {}
}, Wi = /* @__PURE__ */ fe({
  ...y2,
  props: {
    modelValue: {},
    field: {},
    loading: { type: Boolean },
    desc: {},
    formData: {}
  },
  emits: ["update:modelValue"],
  setup(f, { emit: s }) {
    const r = f, o = We("defaultConf"), D = h(r.modelValue);
    s("update:modelValue", D);
    const p = h(Object.assign({}, Mn(), r.desc.slots)), m = h({}), N = h(ke(r));
    return be(async () => {
      var d;
      m.value = await Oe(r, { autocomplete: "new-password", maxlength: (d = o.form) == null ? void 0 : d.leng.input, ...Te() });
    }), (d, M) => {
      const z = F("el-input");
      return _(), R(z, ne({
        class: d.desc.class,
        "show-password": !0
      }, m.value, Le(N.value), {
        modelValue: D.value,
        "onUpdate:modelValue": M[0] || (M[0] = (Y) => D.value = Y)
      }), en({ _: 2 }, [
        we(p.value, (Y, b, E) => ({
          name: b,
          fn: U((x) => [
            $e(d.$slots, b, { data: x })
          ])
        }))
      ]), 1040, ["class", "modelValue"]);
    };
  }
}), D2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: Wi }, Symbol.toStringTag, { value: "Module" })), _2 = { class: "el-plus-form-quick-input" }, m2 = {
  name: "ElPlusFormQuickinput",
  inheritAttrs: !1,
  typeName: "quickinput",
  customOptions: {}
}, Gi = /* @__PURE__ */ fe({
  ...m2,
  props: {
    modelValue: {},
    field: {},
    loading: { type: Boolean },
    desc: {},
    formData: {}
  },
  emits: ["update:modelValue", "validateThis"],
  setup(f, { emit: s }) {
    const r = f, o = We("globalData"), D = We("defaultConf"), p = h({}), m = h(ke(r)), N = lt([]), d = h(r.modelValue);
    s("update:modelValue", d), be(async () => {
      var z;
      p.value = await Oe(r, { maxlength: (z = D.form) == null ? void 0 : z.leng.textare, showWordLimit: !0, rows: 3, ...Te() });
    });
    function M(z) {
      d.value = z, s("validateThis");
    }
    return He(
      () => r.modelValue,
      (z) => {
        z && z.length > p.value.maxlength && (z = z.substring(0, p.value.maxlength)), d.value = z;
      },
      { immediate: !0 }
    ), He(
      () => r.desc.options,
      async (z) => {
        typeof z == "string" ? N.splice(0, N.length, ...o[z] || []) : typeof z == "function" ? N.splice(0, N.length, ...await z(r.formData)) : Array.isArray(z) ? z && N && !Dt.isEqual(z, N) && N.splice(0, N.length, ...z) : N.splice(0, N.length);
      },
      { immediate: !0 }
    ), (z, Y) => {
      const b = F("el-input"), E = F("el-tag");
      return _(), V(Ye, null, [
        ie(b, ne({
          class: z.desc.class,
          style: z.desc.style,
          type: "textarea"
        }, p.value, {
          modelValue: d.value,
          "onUpdate:modelValue": Y[0] || (Y[0] = (x) => d.value = x)
        }, Le(m.value)), null, 16, ["class", "style", "modelValue"]),
        Ie("div", _2, [
          (_(!0), V(Ye, null, we(N, (x, Q) => (_(), R(E, {
            key: Q,
            type: "info",
            onClick: (B) => M(x.label)
          }, {
            default: U(() => [
              Be(Ce(x.label), 1)
            ]),
            _: 2
          }, 1032, ["onClick"]))), 128))
        ])
      ], 64);
    };
  }
});
const h2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: Gi }, Symbol.toStringTag, { value: "Module" })), Y2 = {
  name: "ElPlusFormRadio",
  inheritAttrs: !1,
  typeName: "radio",
  customOptions: {}
}, v2 = /* @__PURE__ */ fe({
  ...Y2,
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
    const D = h({}), p = h(ke(r));
    return be(async () => {
      D.value = await Oe(r, { ...Te() });
    }), (m, N) => {
      const d = F("el-radio"), M = F("el-radio-group");
      return _(), R(M, ne({ class: "ElPlusFormRadio-panel" }, D.value, Le(p.value), {
        modelValue: o.value,
        "onUpdate:modelValue": N[0] || (N[0] = (z) => o.value = z)
      }), {
        default: U(() => [
          (_(!0), V(Ye, null, we(D.value.options, (z) => (_(), R(d, {
            key: z.value,
            label: z.value
          }, {
            default: U(() => [
              Be(Ce(z.l || z.label), 1)
            ]),
            _: 2
          }, 1032, ["label"]))), 128))
        ]),
        _: 1
      }, 16, ["modelValue"]);
    };
  }
});
const Zi = /* @__PURE__ */ Ge(v2, [["__scopeId", "data-v-2d59dd3c"]]), I2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: Zi }, Symbol.toStringTag, { value: "Module" })), w2 = {
  name: "ElPlusFormRate",
  inheritAttrs: !1,
  typeName: "rate",
  customOptions: {}
}, A2 = /* @__PURE__ */ fe({
  ...w2,
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
    const D = h({}), p = h(ke(r));
    return be(async () => {
      D.value = await Oe(r, { ...Te() });
    }), (m, N) => {
      const d = F("el-rate");
      return _(), R(d, ne({ class: "ElPlusFormRate-panel" }, D.value, Le(p.value), {
        modelValue: o.value,
        "onUpdate:modelValue": N[0] || (N[0] = (M) => o.value = M)
      }), null, 16, ["modelValue"]);
    };
  }
});
const Hi = /* @__PURE__ */ Ge(A2, [["__scopeId", "data-v-c585734a"]]), T2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: Hi }, Symbol.toStringTag, { value: "Module" })), L2 = { class: "el-plus-form-select-options" }, x2 = { key: 0 }, E2 = {
  name: "ElPlusFormSelect",
  inheritAttrs: !1,
  typeName: "select",
  customOptions: {}
}, Ki = /* @__PURE__ */ fe({
  ...E2,
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
    const r = f, o = We("defaultConf"), D = We("globalData"), p = h(r.modelValue || (r.desc.multiple ? [] : ""));
    s("update:modelValue", p);
    const m = h({}), N = lt([]), d = h(null), M = { clearable: !0, ...Te() }, z = h(!1);
    r.desc.allowCreate && (M.filterable = !0), r.desc.remote && (M.remote = !0, M.filterable = !0, M.remoteShowSuffix = !0, M.loadingText = "远程查询中...", M.remoteMethod = async (E) => {
      if (E != null && d.value !== E && (d.value = E, N.splice(0, N.length, ...await r.desc.remote(E)), E === "" && r.desc.defaultItem)) {
        const x = N.findIndex((Q) => Q.value === r.desc.defaultItem.value);
        x >= 0 && N.splice(x, 1), N.unshift(r.desc.defaultItem);
      }
    });
    const Y = Ae(() => {
      var x;
      const E = {};
      return (x = r.desc) != null && x.on && Object.keys(r.desc.on).map((Q) => {
        E[Q] = () => {
          r.desc.on[Q](
            r.formData,
            N.find((B) => B.value === p.value),
            r.rowIndex
          );
        };
      }), E;
    });
    N.length <= 0 && r.desc.remote && (r.desc.initLoad ?? !0) && M.remoteMethod("");
    const b = Ae(() => (E) => r.desc.optionTip(E));
    return be(async () => {
      m.value = await Oe(r, M), z.value = !0;
    }), He(
      () => r.desc.options,
      async (E) => {
        typeof E == "string" ? N.splice(0, N.length, ...D[E] || []) : typeof E == "function" ? N.splice(0, N.length, ...await E(r.formData)) : Array.isArray(E) ? E && N && !Dt.isEqual(E, N) && N.splice(0, N.length, ...E) : N.splice(0, N.length);
      },
      { immediate: !0 }
    ), He(
      () => p.value,
      (E) => {
        var x;
        m.value.allowCreate && E && Array.isArray(E) && E.some((Q) => {
          var B;
          return typeof Q == "string" && Q.length > (((B = o.form) == null ? void 0 : B.leng.input) || 20);
        }) && (Wn.warning("最大长度为： " + (((x = o.form) == null ? void 0 : x.leng.input) || 20)), p.value = E.filter((Q) => {
          var B;
          return typeof Q != "string" || Q.length <= (((B = o.form) == null ? void 0 : B.leng.input) || 20);
        }));
      }
    ), (E, x) => {
      const Q = F("el-option"), B = F("el-select");
      return z.value ? (_(), R(B, ne({
        key: 0,
        class: ["el-plus-form-select", E.desc.class],
        style: E.desc.style
      }, m.value, {
        modelValue: p.value,
        "onUpdate:modelValue": x[0] || (x[0] = (K) => p.value = K),
        loading: E.loading
      }, Le(Y.value)), {
        default: U(() => [
          (_(!0), V(Ye, null, we(N, (K) => (_(), R(Q, ne({
            key: K.value || K.v
          }, K), {
            default: U(() => [
              Ie("div", L2, [
                Ie("span", null, Ce(K.label || K.l), 1),
                E.desc.optionTip ? (_(), V("div", x2, Ce(b.value(K)), 1)) : Me("", !0)
              ])
            ]),
            _: 2
          }, 1040))), 128))
        ]),
        _: 1
      }, 16, ["class", "style", "modelValue", "loading"])) : Me("", !0);
    };
  }
});
const C2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: Ki }, Symbol.toStringTag, { value: "Module" })), b2 = {
  name: "ElPlusFormSlider",
  inheritAttrs: !1,
  typeName: "slider",
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
    const r = f, o = h(r.modelValue);
    s("update:modelValue", o);
    const D = h({}), p = h(ke(r));
    return be(async () => {
      D.value = await Oe(r, { ...Te() });
    }), (m, N) => {
      const d = F("el-slider");
      return _(), R(d, ne({ class: "ElPlusFormSlider-panel" }, D.value, Le(p.value), {
        modelValue: o.value,
        "onUpdate:modelValue": N[0] || (N[0] = (M) => o.value = M)
      }), null, 16, ["modelValue"]);
    };
  }
});
const qi = /* @__PURE__ */ Ge(O2, [["__scopeId", "data-v-b3d36458"]]), S2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: qi }, Symbol.toStringTag, { value: "Module" })), B2 = { class: "ElPlusFormStatus-panel" }, k2 = {
  name: "ElPlusFormStatus",
  inheritAttrs: !1,
  typeName: "status",
  customOptions: {}
}, U2 = /* @__PURE__ */ fe({
  ...k2,
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
    const p = h({}), m = Ae(() => ({
      background: o[r.desc.attrs.find((N) => N.v == D.value).c] || r.desc.attrs.find((N) => N.v == D.value).c || "#909399"
    }));
    return cn(() => {
      p.value.l = r.desc.attrs.find((N) => N.v == D.value).l;
    }), (N, d) => (_(), V("div", B2, [
      Ie("i", {
        style: yt(m.value)
      }, null, 4),
      Ie("div", {
        class: bn(N.desc.class),
        style: yt(N.desc.style)
      }, Ce(p.value.l), 7)
    ]));
  }
});
const $i = /* @__PURE__ */ Ge(U2, [["__scopeId", "data-v-02c49aae"]]), Q2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: $i }, Symbol.toStringTag, { value: "Module" })), P2 = { class: "el-plus-form-switch" }, V2 = {
  name: "ElPlusFormSwitch",
  inheritAttrs: !1,
  typeName: "switch",
  customOptions: {}
}, Ji = /* @__PURE__ */ fe({
  ...V2,
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
    const D = h(!1), p = h({}), m = h(ke(r));
    return be(async () => {
      p.value = await Oe(r, { activeValue: 1, inactiveValue: 0, clearable: !0, ...Te() }), D.value = !0;
    }), (N, d) => {
      const M = F("el-switch");
      return _(), V("div", P2, [
        D.value ? (_(), R(M, ne({ key: 0 }, p.value, Le(m.value), {
          modelValue: o.value,
          "onUpdate:modelValue": d[0] || (d[0] = (z) => o.value = z)
        }), null, 16, ["modelValue"])) : Me("", !0)
      ]);
    };
  }
}), F2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: Ji }, Symbol.toStringTag, { value: "Module" })), R2 = {
  name: "ElPlusFormTag",
  inheritAttrs: !1,
  typeName: "tag",
  customOptions: {}
}, Xi = /* @__PURE__ */ fe({
  ...R2,
  props: {
    modelValue: {},
    field: {},
    loading: { type: Boolean },
    desc: {},
    formData: {}
  },
  setup(f) {
    const s = f, r = We("format"), o = h({}), D = h(ke(s)), p = h(""), m = h("");
    return be(async () => {
      o.value = await Oe(s, { ...Te() });
    }), He(
      () => s.modelValue,
      async () => {
        s.desc.tagType ? typeof s.desc.tagType == "function" ? m.value = await s.desc.tagType(s.modelValue, s.formData, s.field) : typeof s.desc.tagType == "string" ? m.value = (await r)[s.desc.tagType](s.modelValue, s.formData, s.field) : m.value = "" : m.value = "";
      },
      { immediate: !0 }
    ), He(
      () => s.modelValue,
      async () => {
        s.desc.format ? typeof s.desc.format == "function" ? p.value = await s.desc.format(s.modelValue, s.formData, s.field) : typeof s.desc.format == "string" ? p.value = (await r)[s.desc.format](s.modelValue, s.formData, s.field) : p.value = s.modelValue || "—" : p.value = s.modelValue === "" ? "—" : s.modelValue ?? "—";
      },
      { immediate: !0 }
    ), (N, d) => {
      const M = F("el-tag");
      return _(), V("div", null, [
        ie(M, ne(o.value, {
          size: o.value.size || "small",
          type: m.value !== "--" ? m.value : ""
        }, Le(D.value)), {
          default: U(() => [
            Be(Ce(p.value || N.modelValue), 1)
          ]),
          _: 1
        }, 16, ["size", "type"])
      ]);
    };
  }
}), W2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: Xi }, Symbol.toStringTag, { value: "Module" })), G2 = { key: 0 }, Z2 = {
  name: "ElPlusFormText",
  inheritAttrs: !1,
  typeName: "text",
  customOptions: {}
}, H2 = /* @__PURE__ */ fe({
  ...Z2,
  props: {
    modelValue: {},
    field: {},
    loading: { type: Boolean },
    desc: {},
    formData: {}
  },
  setup(f) {
    const s = f, r = We("showInfo"), o = We("format"), D = h({}), p = Ae(() => {
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
    return be(async () => {
      D.value = await Oe(s, Te());
    }), He(
      () => s.modelValue,
      async () => {
        s.desc.format ? typeof s.desc.format == "function" ? m.value = await s.desc.format(s.modelValue, s.formData, s.field) : typeof s.desc.format == "string" ? m.value = o[s.desc.format] ? o[s.desc.format](s.modelValue, s.formData, s.field) : "--" : m.value = s.modelValue || "—" : m.value = s.modelValue === "" ? s.desc.default ?? "—" : s.modelValue ?? s.desc.default ?? "—";
      },
      { immediate: !0 }
    ), (N, d) => (_(), V("div", ne({
      class: ["ele-form-text", [...N.desc.class || [], N.desc.linkType ? "ele-form-text-click" : ""]],
      style: N.desc.style
    }, D.value, Le(p.value, !0)), [
      N.desc.title ? (_(), V("span", G2, Ce(N.desc.title + ": "), 1)) : Me("", !0),
      N.desc.icon ? (_(), V("i", {
        key: 1,
        class: bn([N.formData.icon])
      }, null, 2)) : Me("", !0),
      Be(" " + Ce(m.value), 1)
    ], 16));
  }
});
const ea = /* @__PURE__ */ Ge(H2, [["__scopeId", "data-v-be811ef2"]]), K2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: ea }, Symbol.toStringTag, { value: "Module" })), q2 = {
  name: "ElPlusFormTextarea",
  inheritAttrs: !1,
  typeName: "textarea",
  customOptions: {}
}, ta = /* @__PURE__ */ fe({
  ...q2,
  props: {
    modelValue: {},
    field: {},
    loading: { type: Boolean },
    desc: {},
    formData: {}
  },
  emits: ["update:modelValue", "validateThis"],
  setup(f, { emit: s }) {
    const r = f, o = We("defaultConf"), D = h({}), p = h(ke(r)), m = h(r.modelValue);
    return s("update:modelValue", m), be(async () => {
      var N;
      D.value = await Oe(r, { maxlength: (N = o.form) == null ? void 0 : N.leng.textare, showWordLimit: !0, rows: 3, ...Te() });
    }), He(
      () => r.modelValue,
      (N) => {
        N && N.length > D.value.maxlength && (N = N.substring(0, D.value.maxlength)), m.value = N;
      },
      { immediate: !0 }
    ), (N, d) => {
      const M = F("el-input");
      return _(), R(M, ne({
        class: N.desc.class,
        style: N.desc.style,
        type: "textarea"
      }, D.value, {
        modelValue: m.value,
        "onUpdate:modelValue": d[0] || (d[0] = (z) => m.value = z)
      }, Le(p.value)), null, 16, ["class", "style", "modelValue"]);
    };
  }
}), $2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: ta }, Symbol.toStringTag, { value: "Module" })), J2 = {
  name: "ElPlusFormTransfer",
  inheritAttrs: !1,
  typeName: "transfer",
  customOptions: {}
}, X2 = /* @__PURE__ */ fe({
  ...J2,
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
    const D = h(Object.assign({}, Mn(), r.desc.slots)), p = h({}), m = h(ke(r));
    return be(async () => {
      p.value = await Oe(r, { ...Te() });
    }), (N, d) => {
      const M = F("el-transfer");
      return _(), R(M, ne({
        class: [N.desc.class, "ele-form-transfer"],
        data: N.desc.options,
        style: N.desc.style
      }, p.value, {
        modelValue: o.value,
        "onUpdate:modelValue": d[0] || (d[0] = (z) => o.value = z)
      }, Le(m.value)), en({ _: 2 }, [
        we(D.value, (z, Y, b) => ({
          name: Y,
          fn: U((E) => [
            $e(N.$slots, Y, { data: E }, void 0, !0)
          ])
        }))
      ]), 1040, ["class", "data", "style", "modelValue"]);
    };
  }
});
const na = /* @__PURE__ */ Ge(X2, [["__scopeId", "data-v-6262dcef"]]), ey = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: na }, Symbol.toStringTag, { value: "Module" })), ty = {
  name: "ElPlusFormTree",
  inheritAttrs: !1,
  typeName: "tree",
  customOptions: {}
}, ny = /* @__PURE__ */ fe({
  ...ty,
  props: {
    modelValue: {},
    field: {},
    loading: { type: Boolean },
    desc: {},
    formData: {}
  },
  emits: ["update:modelValue"],
  setup(f, { emit: s }) {
    var Y;
    const r = f, o = We("globalData"), D = h(((Y = r.modelValue) == null ? void 0 : Y.split(",")) || []), p = lt([]), m = h(!1), N = h({}), d = h(ke(r)), M = h();
    be(async () => {
      N.value = await Oe(r, { checkStrictly: !0, showCheckbox: !0, accordion: !0, props: { label: "label", children: "children" }, ...Te() }), m.value = !0;
    });
    function z() {
      s("update:modelValue", [...M.value.getCheckedKeys(!(r.desc.isPId ?? !0))].join(","));
    }
    return He(
      () => r.desc.options,
      async (b) => {
        typeof b == "string" ? p.splice(0, p.length, ...o[b] || []) : typeof b == "function" ? p.splice(0, p.length, ...await b(r.formData)) : Array.isArray(b) ? b && p && !Dt.isEqual(b, p) && p.splice(0, p.length, ...b) : p.splice(0, p.length);
      },
      { immediate: !0 }
    ), He(
      () => r.modelValue,
      (b) => {
        D.value = (b == null ? void 0 : b.split(",")) || [], M.value.setCheckedKeys(D.value);
      }
    ), (b, E) => {
      const x = F("el-tree");
      return m.value ? (_(), R(x, ne({
        key: 0,
        ref_key: "treeRef",
        ref: M,
        class: b.desc.class,
        style: b.desc.style
      }, N.value, {
        "default-checked-keys": D.value,
        loading: b.loading,
        "node-key": "id",
        data: p
      }, Le(d.value), {
        class: "el-plus-form-tree",
        onCheckChange: z
      }), null, 16, ["class", "style", "default-checked-keys", "loading", "data"])) : Me("", !0);
    };
  }
});
const la = /* @__PURE__ */ Ge(ny, [["__scopeId", "data-v-c636bc55"]]), ly = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: la }, Symbol.toStringTag, { value: "Module" })), ry = {
  name: "ElPlusFormTselect",
  inheritAttrs: !1,
  typeName: "tselect",
  customOptions: {}
}, ra = /* @__PURE__ */ fe({
  ...ry,
  props: {
    modelValue: {},
    field: {},
    loading: { type: Boolean },
    desc: {},
    formData: {}
  },
  emits: ["update:modelValue"],
  setup(f, { emit: s }) {
    const r = f, o = We("globalData"), D = h(r.modelValue);
    s("update:modelValue", D);
    const p = lt([]), m = h(!1), N = h({}), d = h(ke(r));
    return be(async () => {
      N.value = await Oe(r, { filterable: !0, clearable: !0, props: { label: "name", value: "id", children: "children" }, ...Te() }), m.value = !0;
    }), He(
      () => r.desc.options,
      async (M) => {
        typeof M == "string" ? p.splice(0, p.length, ...o[M] || []) : typeof M == "function" ? p.splice(0, p.length, ...await M(r.formData)) : Array.isArray(M) ? M && p && !Dt.isEqual(M, p) && p.splice(0, p.length, ...M) : p.splice(0, p.length);
      },
      { immediate: !0 }
    ), (M, z) => {
      const Y = F("el-tree-select");
      return m.value ? (_(), R(Y, ne({
        key: 0,
        class: M.desc.class,
        style: M.desc.style
      }, N.value, {
        modelValue: D.value,
        "onUpdate:modelValue": z[0] || (z[0] = (b) => D.value = b),
        data: p,
        loading: M.loading
      }, Le(d.value), { "render-after-expand": !1 }), null, 16, ["class", "style", "modelValue", "data", "loading"])) : Me("", !0);
    };
  }
}), uy = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: ra }, Symbol.toStringTag, { value: "Module" })), ua = ["image/jpg", "image/png", "image/gif", "image/jpeg"], oa = [".jpe", ".jpeg", ".jpg", ".gif", ".png"], sa = ["video/3gpp", "video/mpeg", "application/mp4", "video/mp4", "video/ogg", "video/x-flv", "video/x-msvideo"], ia = [".3gpp", ".mpeg", ".mpg", ".mp4", ".ogv", ".flv", ".avi"], oy = ["audio/x-wav", "audio/x-ms-wma", "audio/mp4", "audio/mp3"], sy = [".wav", ".wma", ".mp4a", ".mp3"], aa = ["application/x-msaccess", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.openxmlformats-officedocument.presentationml.presentation", "	application/vnd.ms-powerpoint", "application/vnd.ms-excel", "	application/msword", "application/pdf", "application/vnd.ms-works"], ca = [".mdb", ".docx", ".xlsx", ".pptx", ".ppt", ".xls", ".doc", ".pdf"], Ma = ["application/xml", "application/x-sh", "application/json", "application/javascript", "application/java-vm", "application/java-archive", "text/html", "text/plain"], fa = [".xml", ".sh", ".json", ".js", ".class", ".jar", "html", ".txt", ".wdb", ".wps"], da = ["application/x-rar-compressed", "application/x-msdownload", "application/x-font-woff", "	application/x-font-ttf", "application/x-7z-compressed", "	application/vnd.android.package-archive", "application/zip"], ga = [".rar", ".exe", ".woff", ".ttf", ".7z", ".apk", ".zip"], iy = [...ua, ...sa, ...aa, ...Ma, ...da], ay = [...oa, ...ia, ...ca, ...fa, ...ga], wl = [
  { type: "pdf", suffixes: [".pdf"] },
  { type: "txt", suffixes: [".txt"] },
  { type: "excel", suffixes: [".xls", ".xlsx"] },
  { type: "word", suffixes: [".doc", ".docx"] },
  { type: "ppt", suffixes: [".ppt", ".pptx"] },
  { type: "zip", suffixes: [".zip", ".rar", ".7z"] }
], zi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, audioSuffixes: sy, audioTypes: oy, fileSuffixes: ay, fileTypes: iy, imageSuffixes: oa, imageTypes: ua, officeSuffixes: ca, officeTypes: aa, otherSuffixes: ga, otherTypes: da, suffixTypes: wl, textSuffixes: fa, textTypes: Ma, videoSuffixes: ia, videoTypes: sa }, Symbol.toStringTag, { value: "Module" })), cy = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAE9UlEQVR4nO2bbUwbdRzHf5WwTajTF5ApzjnHi+F0DyKbCEbQpehe6KjMhBghaqIBo44Iy5TErFGSLcqi7IXgC+MCL+SFW1FfjNCoTCNxhPmAhrkpyMBsgB0ZDMooD+fve8thr73C9XrEXvf/JM39f3ft9f/7/J/ueqmNwvC4uzh/3mbbK5FUyOH/yv2pW744lFu9m4umoynA4S5+jo98wsWYoCRjD/VdPv+RK7uyjENTCRGAlp+z0TdcjBkgAIz4vAeqMsve5qJphAgocBe3SDZalu5mFEUAODN6bt/BnOpaLppCiABHS7HEm5giUIB/zk/d3p6KI3k1dRxGjeUEgHlpfmp4auSJ/ZmvfMVhVFhSADBLgmUFgKmZq1OdI6fzP975fieHhrC0ADDuv+L7w9ubWfdozVkOI8byAsD07PTgpOTbXrH5xWEOIyIuBACjEuJGALgwMfTXD4NdmS3Oo5c51EVcCQCjV0dPVWx7KZuLuog7AWBsevzrV7e+sJOLSxKXAsDfVy60Vm9/bRcXF8USApwbdpF9RTKXIqPn0rklb6MtISDn1ixKv2U9GWGpO0hLCFhFK+jpjCe5ZIzFJFhCALjLvpYeWqt7cg+ha/hnzTtIywiQJInSVqVSdloW2VfaeU9k4Da6f3ywqObB/cc5XMAyAhRm/NO0OsFOibYEun11Gu/Rj39u1t/w2LsrubiA5QQozM3OyjIi5btnvlTlrAqAVQQYxVPYrMpZFQAhQAgQAoQA3sQtQoAQIASoclYFQAgQAoQAIYA3cYsQIAQIAaqcVQEQAoQAfQLsicmUnJhEw75/OApF63j6zXdy7KWJmUmOFmdNUiqtuTGFP7Oeesf6qW98QNfnlsI0AU/x46pnM4qovP1NTuq/JBXey31LllDe/gZH12jb/Sk1/NpIx/tOcBSeko1F5Eznx2H8eQUk7+49QU1nj3FkHNMEoHJIkn+xp33f18gVVCjZuIcfaBbx/nfoF28P77kGBDT9foyT+IwjbfAYzPVApfw+N4vCebembCLHHXlUsO5hcp06TB1DXfxOY5gmAKBL1+cforaBk1T7UwPvIbmyEIMEghPVI8C1o5LlJlEVywsG0iEkGkwVADAUyjaXUu2PDXLLNDrqqNt7hlydh/moGr0CNrDYl3loRZusFqYLAKj0lpS75bkArYR5QavyegQoQ2CIz4Ux332phyfB83zEHJZFAJJGy2MbPO4D0SMAYBiV3VsqDzEAGR4eZu6+Vk2xkbAsApRhMDnjoz/H+mUJWugVoIClMJd7RM5tWdzDNsnJl3r2ylujmC4ArYSJEN21bfCkXA6XZKQCAkGvwOSK76n/rZH3GMNUAejyH+YflFteWe/DLYEgGgGglgUArRVCL6YKOLDjddqWcg+VcfKYABVQUczkwd1VjwCc0zPwrbyiBALZmGc6Lp7mJbee9xjDNAFKS2tdmKCyTY4jIfMBBKBXdPMrkAnuQbjoAZCH8Y73dVzs4hWgX+7+jnV5dBOfN1h2pJgmoOq+crki4VoTlcZMDgFKLyjnGHNGMBAQeN1QwFd9mPjwAlgG8cJ34TujwTQBVkUIEAKEAFXOqgAIAde7gFj846RZ2CT6vM3ZXMjFBUIExOJfZ80iQaJHWp3N7RRAiAAQa3+eNgWJnvc4m49SEJoCAHrCPFGF1YcDuv0NRB8Et7zCv9Ii61+eHeesAAAAAElFTkSuQmCC", My = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAEWElEQVR4nO2bS2gTWxiA//Q+ehFusrgPqjb3XkQu9zaCUlFsV9ZXU0UqPuJCBKtGN4LV1o0LXyAubLQRdRN8QEUxPlDxERW1q0YFXWhbLYgWk9j6qDVRY9PajP+fMGlOpxkzdcQ58XzQmf+fOUzzf3POmRmGMUEGdhYUTjWZ4mtBgnmYflMmVFVdn7Fj+3QMdWdIAa6C0cskkA5haAhKa9dD9+P2A3P2712Jqa4oBCTOPMRvYGgYSAARCYQ22927t2GoGwoBrpGjzkgSVGJoGGQBhN4SFALqCkZJuDIU6QKIrra2jXM9nh0YfjFcCoj3xz+8DQXnVuzZcw3TL4JLAYReErgVQOghgWsBRPR1d7Tj7v3ipb5zbZhqhnsBRF+0J9DX9XLSDLf7OaaayAkBxHAl5IwA4sPrN0/vHT0yfl17+xtMsyKnBBDvOp/fmlW3cwqGWZFzAohoV3fWD085KYDIVgIXAmyLHWCxFmKkjdDtO+cWeY+pPtdwIeCvsqlQOLEYI+187uGJCwE/mH+Fyaucyh+bJWoSFMc0ogDCUvQ/2GZXYDQ8nlxvrF5y8bwbQwZuBBAjxoyBf6dPgxEWM2ba+NgTg1etDxfMP9pwGtMUXAkgov1x+PG330H6+Sco+Odv3JI9H3v7elf7LuRjmII7ATK9cQne9/djpI3tXS+YmpmE4EXAcKntfMbUzCSEECAECAFCAK5yFiFACBACmJqZhBAChAAhQAjAVc4iBAgBQgBTM5MQQoAQkJ2AfIsF/igqwmiAl62tEAuHMWIZqm3Q78elOoUlJbhU0vs2Ai+aWzDSjm4CHKdOgLW0FCOWcCAAl6vXQ6CpCbMkmdpSEXc9HmjxnsCMpfLQQRhrL8doaFwjR+NSO7oJqOkIQZNrF/jrXJgloSJL8EUmne2GmeX4RiaAW5Vt/xxnA7PVCjaHI1Fk83EvSluHewZwnD6JSwDv/IW41I+vKoCg7r7mYSuzL1Nbgl582ut3K/ZzK4BYevUKRIJBOFu1HDP1tgQVS71m338D8wRtI7gTQF3befsmsy9TWxm5F3gXLErNHVwIoLHbgn8yNLaLnSvhFxwGnslTUlcEaqsmgOYOmih9OA/IxyMB1gxXgR48bnpv0YKuAgZD3Z5m9hubNqcmQILaqgkYW2GHyoMHFD0g32yGxk1bYDCxSDjxf4aDrgLUikrnc23Ltm1N9BzqNbI4EkAYegioFZWOWlt5zgjgjVF6sd+FABr75fW7wIISGmbOYrp1TglY0/YAi2vG8e3HDCdLW/JGiCbNWCSCl8sVuC859mUML8DurodHPh88uuTDTJ1ipxMnunKMBoiFI1i0H2+DvRgnrxbplNTW4PZI4lZZT3QTwCtCgBAgBDA1MwkhBHzvAoz44aRemExwtqbj2TwMUygEGPHTWb2QIK9sQ2ewEdJQCCCM9vG0HpjAVFXTGToMgxhSAEE9Ic8Ur+Z9OFC3j0t59YPPvMwn4xjMX8B9vzAAAAAASUVORK5CYII=", fy = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAACfUlEQVR4nO3bS2sTURTA8TNJaqWiVMhCUQsqiuAjGG2pKLbGLrRY00EEoS4s1ro0gitBg3XhUl1aEf0ERt372PoRiuLCB2Jt2tKmSZpMcntOIaW308dMeqFzL+e/ued0d39JSlMYC1bo8ctMp6jCHQHQi+uG1npk36fu07HzOCpvWYCh4cwNIeA1joGo48QhmJiaeWUnTg7gqjQXAL3y1Sp8xjEwEQA1lSukL3fGh3BUlgvg0XDmHQhI4hiYagCUagQ3wIuMwCNQLQag/k9O37/a1fYEx3WnJQD+ci7kcoWenkT8I67rSksAShWCtgCUCgStAah8sZT/m83GbyYTI7j6TnsAquxUflkgWrvaj/7D1VdGAFD1IhgDQOHH4efItx+xu/32JK6eMgqAyuWLXy+dPd6Oo6eMA6DysyXPX56MBKC8ImgBEDvYAs1bm3Dy1+/R7Ifr3WdW/V6jBcDeXVFo2RHFyX9rfXnSAiASCUHb4f3QEAnj5r/VELQAoLZv2wLHDuzBqb6+/xlNDSQ7nuMopQ0A1bipARF2Q9PmRtz85VQqMDY+feXaxVNvcV1IKwCqOFuGSDiM/7MRsDPajD/xXtlxSqm+C5KedgC1SmWH/vLDyV9P7/VJd5YWSheAekvftqU7SwvFAAzAAAyAh7ExAAMwgHRnaaEYgAEYgAHwMDYGYAAGkO4sLRQDMAADMAAexsYADMAA0p2lhWIABmAABsDD2BiAARhAurO0UAzAAAzAAHgY29oAAXxwUlkWvE8P2r04LeQCCOKjs6oKheDcg1v2F1iUC4AK2sPTKrIs6H84aL+BJS0LQM2/EwSktP844Ns+ZMGzpa98rTlAGolQGdxvxgAAAABJRU5ErkJggg==", dy = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAD00lEQVR4nO2bT0gUURzHf2/+rIsRGVRS0db2HwS1gxoFVkR1sjzkoUNlhw5BUoeORVAdFYoOHVQyT0FdqlvRH+vUerAEISkKkwrDyBDM/eO8vm/8k7M7u85sI7szvQ/MvN9vZnm77zNv3rzd2WGUhWRveK9B/Bxx3oi0oCirzjzTN9zYj9BzbAUkYuFmTsZthEWBuvYiPtS3O1r0VjN5TIYA88hz4znCosEUAHhi+LIebb+C0DMyBMRjoS4iOomlaJgVIPBagp2APhTVWIqG+QIEXkqwE8BRFBXpAogbv9X4cAPb1PkU2T/hTwECjyT4V4DAAwn+FiAQEhIfd7KN3f3IXON/AYAZE8NKaLSGlXeMIHVFIAQI8pUQGAGCfCQESoDJ1K9eLdJWi8gRwRMAePKH4y9PgRQgcCrBFwKUFSeIlUQQucOJBF8IYKX1pCyvR+Sehb43+EIA52FSV7cQU0uQuSeXBF8IMAlVkbqyAUF+ZJPgHwEm5TgVDuGUiCDOg8TQMS3aeRfRHD4TgCOZwspYhksDFrcY8VR497COaA7fCZiFG1iJxSXhXQlLmy2JwC8C8qWkVgqwtNmSCKQAKUAKkAJQBBYpQAqQAixttiQCKUAKkAKkABSBRQqQAqQAS5stiUAKcCiAlVYt+MMkn+jHzcoxvK4Md3bWI3+LrTaI/aiPj/cgcVj3+Eus3eOZAK2il5TSSkTZSb5vIj72kJTyFtIirZR8dxAfvAd7rGgVMawZpQZqUBLpO74T03ILSA7UZheaA88EpBOqidPUl2s09fUqskyEMBaKULJ/23SvmEGNtJFafjZngxaq2w0FE0ChDaTjSIsekPrQhA1487LDpG+5R6nPF8gYuYkt9ixYtwsKJwBYGvzzEYS8hpBXEHIUe7PjpG6nFFSAQI12kLriOBno7gyDn+j6808JO5zW7YSCCxAjvl45iEGujFKfTpMx2o2NuXFctwMKLkBdc8n8xwePDyHj6AF1/08PYEv3kL79sfk6A5dHbdsTjAF/B8VsOKnbKYUTMNP1xeQoNXgAG6b/+qJF26cHxaBfBcRkh+FSmOzfauny2ub7uOffgFMhwPOAucmO3UxQ9AzIyTUe5KrbLYsmQBzJKYzoYuqbjhj4eGIo64gv5v7qutbpscBGgFk3Gp+th7hh0QT4BSlACpACLG22JAIpIBZ6g6IKSyBxIqCLiuzBSc/g7EFJXbwR0RwZAhKxJdWYkvQhDBwKU/bpNZMvaB4ZAgTF9vC0FzBSToVqJ7soDVsBAvMhaoOfJ8aPIPUv6PaKwq6nH/lZ/gBjD5Nf2bkbBQAAAABJRU5ErkJggg==", gy = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAE/UlEQVR4nO2bW2wUVRjHv12KhRZ7UUq1Nyhp60MxRmobpSa21ZhIQ1hjrPIi9RJ9UnmBB8VgjIlRHxSIMSUhXh6kQGKKCSoaaF9KogZtIk1sMbbZFhB3WZZCd9nr+P1nPZud2Xt3XHaW80ume77ZzuX7nW/OnO1sLZSE1UfP9VCYXidSbBzeVF5sqTz1fkfto9w0nIQCVh+eepvf2kMFwq72O2nmmu/gpw/VvcShocQJiPS8MsrNggECwJwnuGd/V+073DSMeAGHp8eI6BFeCgYhABgtIZEAhV8KilgBYGrB98bBTXXvcTNnTCkgFFa88zeCWz7puuskhzlhSgHAKAmmFQCMkGBqAcDlC3kmrgY2ft9XP8Vh1pheAPCGlDmXdUXn3ntXXeIwK4pCAFiqhKIRAFy+oH3Y7rlv9slmN4cZUVQCwEVv8KePOmsf5GZGFJ0AcNkXzPjDU1EKAJlKMIWAZ9dVUFP5cm5lxy9O7zdHexq2cjMpphDQt2YlPVBTxq3sSffhyRQCKpcRDbZUU2mJlaPsSSXBFAJAO18C/XwpLJWTf1/fceKxtXu5qcE0AkDjcittXns7VZaWcJQdN0Jh+uNa4KmvHq77msMophIAFH+IaqwWKuV2U/UK/pk5/lDYf2LLemwaxXQCBEowTIovxK3scL3QrslZEwCzCFgqzmfaNDlrAiAFSAFSgBTAL0WLFCAFSAGanDUBkAKkAClACuCXokUKkAKkAE3OmgBIAVJA/gRsqCqlCv5LL5h0++hqIMyt9DSVl1BDWeRJ0bwnQPbFILcywzABIz311L0m/mnNt+ev04FpN407vBwl5uXWKnqlrYoTiSQhODSzQG9NOJKK6K5ZSTvb74g77vg/Hto94aSzLDEdhglwDLTS8OwCDfNJC9Cjm+vLaROf4ND0FfWk9OzrrKVtzRXRbSEK2yG5XZycm5Pv+8EeJ2EbPxTZ11VLc4sB3q9DTRY9j+Pt5IenjWUl1PejXV2XCkMFfDh5mT6YdHGkBYngpF77+RId4kQFIondvzlo6Fz8dxgg4hhX1u+cnG3sPK+JgJI/099Mp7mnnxu/GCenki8jVNQQV57+PT15EQCQSDsn1DLyF0cRzvSvUw+48fgsJUPI6+UqQC+DL7vvViukN4MeTkfeBKA0v+iuI9vofLTMRx9vSrkNEL0dWyV/2targ+TWmKpYKnkTIBLePn6BB8ZFtQdHehuicSr0+0Z8gMeUNxOMKdmSNwH6hEWsHxcSod83Ygyar/K2uZI3AWLAE9eyKO10PSkqJ1bUrzx2uP18d+AxIFfyIgCj8ilOAjuPHfDEwNjB65KN1vtZGr4S03F8JjrgiXViPMmF/10Aehr3ekxW9CcsLoNkEx5RNfoqgVC1Cvj3t/NtEBUVC6oGxxw8fSEqLRmGCsAMTCSIk8SJYMFOMQkSJRyLSNLOExpc12ev+GhDdWQiBGnf8UwS93o92C8qqOK2ZapASMCCuw2qY84TVIXrpeoxTIC4XwswQ8MCIUgsVU8gWUxcnqhfxVEEJIMpdCJpAkh+9/4adfvG/6bRC/6QejxUYrrkgWECzIoUIAVIAZqcNQGQAm55AUemRkixpPyCsWmxKMecA/fYuBUlXkAB/uusYVgtvc6nW8cohjgBoObI9KCi0GfcLBosFnreMdD2OelIKAColaCEd5j+cuCyJ4v1Y33PC/4FkIYsbolXiDkAAAAASUVORK5CYII=", Ny = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAD3UlEQVR4nO2bS0wTURRAb/kIQQWMXYAfRIlKokhE+UUiHwkqAaESowajEhF3iokrE0VxYcJGZWeNEVhoXAj4W0iisDAxLA0uRMUoavgIyqcWaAvjvWix005rB16lb3yHTHrvhQHuee/Nm2ZAB264dKMpS5qCUxJAMabzSvLGNc/ytyXuwJA5igIuXm+6AABVePgFmVvi4fvIj5uGnK3lmDLFRQCN/NQUtGLoN5AAYsQ0VrUnK6kaQ2a4CMDRbwP8mXj4DXYBBGsJSgIkfPErHAUQX4dGz+7LTbmM4ZzhUgBenMdMprHCwpykp5jOCS4FEKwkcCuAYCGBawGEedxi7hkcTDpWlNOJqWq4F0BYbZOfdCAl56Yl9GGqCk0IIGYrQTMCCFwO3Z1v3yeeLjMMYeoVmhJAmMzj7QXbN6dh6BWaE0CYJyxev3nSpADCWwlcCEhcFwORi8MwUsfn/sEHh/IzijB0CxcCVi/XQ0yUHiP1/O3NExcCgoICIGVDHAQHBWKmHk8SuBBALAlfCJvWrsRodrz70l9ZXpR5DUMZ3AggQhYEo4QVEBYagpk6bJOTMPBttOTA7vRGTGfgSgAxPmGFoMBAkPAjWh+JFe+x2myWytJdMnvcCbBjsdrozg8jdVw5UyrrWZYQvAiYLVUnDLKeZQkhBAgBQoAQgC+aRQgQAoQAWc+yhBAChAAhQAjAF80iBAgBQoCsZ1lCCAFCgG8E0JOdoVEzRvMLMwGHCzIgdpn7pzW9A8NgbGzFCGBVtB6OFGaA8V4r9A4OYwVgfWw07M9LxUgOSWrv6IL2V12YsYeZABrRiEWuz+visbHUhLjpJp686MDKHwH1D5/Dx54BrPx64EkH1RxJw3NJDp1L34M1zAQoEYoPLk4ezIMhkxkasLFxixWrngVUG5sxk1NRkg2RKLem/jFmbPGpAPuycJzqhFoBVKdD6XNzxWcCaNrvTE9QnLpqBZDIKH0E1NRxMgOilkZM/9I06g2P5Gua8CSAao6QSLqOKIlkgU8EVOzFNRseBrW3W2bWvSOeBDgzvQvgDuCL5gnmAqgJOu62tEPnhx6suOJJgNIS8CVMBdgbo9GiKesO+9dpSgBtebRd0ZR33PKU0KQAuuLTBes1Tvs+vPg5Q2v55ZtujDQqgG5j6Y7NHSSg9k4LRr93CRRA9wdUJ+hcEkC1fwkzAbwiBAgBQoCsZ1lCCAH/vQBjUzNI4PEPjLlFB/erKgzFGM3gIsAf/3WWFQEBkH3uuKENHHARQFQbm45KEtzCUDPodFB2vsJQB04oCiCmZ4IEldwvB5z2ATq46jzydn4C6fJqX6F9jQkAAAAASUVORK5CYII=", py = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAADs0lEQVR4nO2bTUgUYRjHn3HLpfwoNbX8iMQO5cWKIiGw0sJLpWCXECwh8JbiwcBDkkFSkiVUYBSVUB3S0OhipUVhJEToISH8wtTMJLWt1FVnpudRtHl3d2xmd6SZ7f0dZp7/7gPvvr+dndmZYQRQof/A5n0gSwUgy1kY/ynBWbnNYafOpmNpOB4FDKQlnpBBuo2lKQjNLYDZz323Ikoun8RoKG4C5r55SXyBpWkgAYT0dag0rPhCGZaG4S4gPaEeZMjE0jQsCCCMluAuIC1BxpWpUAogxL7OkvDSa+VY+owlBciSOAkjg4fXnq5swugTlhRAGCXBsgIIIyRYWgAhOsYmxO6OHZFVDz9i1I3lBRCyc7J/zeSPXULh+WGMuvALAYS3EvxGACE5xj5Bc0NyWH3bOEZN+JUAQhwdbg0vKk/BUhN+J4DALUHzyZNfCiC0SrCEgKCMo2CLjsVKH1Mf3j+OrqjJxFIVSwiw70wFe9J2rPTzt5MnSwgQVodA8JEcEALtmPSzlARLCCBWbNoCq1MzsPIO57vXhVFX66qwZLCMAEKIiIGgvRkQEByKSR/yjBNmezqz15XffIRxEUsJIKRZCYTQCJBtgRAYtxFf0Y48Mz0dc6PejuUilhOwgCTiVcsZESt9JLzpZ+bMBKLfIgK8Jb65l5kzEwgugAvgArgAXPktXAAXwAUwc2YCwQVwAVwAF4Arv4UL4AK4AGbOTCC4AC5AmwABr8wGJm7F6g+zw4MgfhnAikVrr6c+V5ztrbj0HsMERF66D/Zt7jdhpZ8OGL1YDFMtTzHNE1FWDav2HMSKxbVXrU+Jo6YKHHfdLu9rxjABcU09bh/GnpwCoccLcL0bhvMPwUxXB76Ksiof4BJgpOgYLudR61XiaQxfWVYBBG3GsQ1tzHueBBCeepWojeELyy6AiKp+AiL+xr+dycekLoBw7VWy1BjesuwCbOvjYMO9V8x7agI89SpRG8MXDBXwq7EWJhrrMM2zMjEJgrPz5u7dDeWkgow7OYIECEEh8P36OUzzqPUqoTFMLcAV2qvTYWocJ6o8xJEA2tkpUetVQmOYWoDWD0cCnO1vNfUq0TOGVrgALoALYObMBEKrAPrbOtnyDI8CtZiWJqy4AgW0aupVomcMrRgmwKpwAVwAF8DMmQkEF/DfCzDhg5OGIUBDfFNvFlaLuAsw4aOzhhFg2x//vOslKHATQJjt4WkjECAgL665+w644FEAMbclyGIhWP3ngJs9CLYrrt/8Ar8BHxywX5M7ETcAAAAASUVORK5CYII=", jy = { class: "upload-panel-icon" }, zy = {
  key: 2,
  class: "el-upload__text2"
}, yy = {
  key: 3,
  class: "el-upload__text"
}, Dy = {
  key: 1,
  class: "upload-hands-submit"
}, _y = {
  name: "ElPlusFormUpload",
  inheritAttrs: !1,
  typeName: "upload",
  customOptions: {}
}, Na = /* @__PURE__ */ fe({
  ..._y,
  props: {
    modelValue: {},
    field: {},
    loading: { type: Boolean },
    desc: {},
    formData: {}
  },
  emits: ["update:modelValue", "validateThis"],
  setup(f, { emit: s }) {
    const r = f, o = We("defaultConf"), D = { excel: cy, pdf: My, file: fy, txt: dy, word: gy, zip: Ny, ppt: py }, p = h((typeof r.modelValue == "string" ? [{ url: r.modelValue }] : r.modelValue) || []);
    s("update:modelValue", p);
    const m = h({}), N = h(ke(r)), d = h(!1), M = h(0), z = Ae(
      () => p.value.map((w) => {
        var P;
        if ([".png", ".jpg", ".gif", ".jpeg"].indexOf(((P = w.raw) == null ? void 0 : P.suffix) || w.suffix) >= 0)
          return w.url;
      }).filter((w) => w)
    );
    be(async () => {
      var w, P, k;
      (!o.upload || !o.upload.action && !((w = o.upload.minio) != null && w.getObjectAuthUrl)) && console.warn("缺少文件上传配置,无法使用upload组件~"), m.value = await Oe(r, {
        drag: !0,
        listType: r.desc.upType === "file" ? "text" : "picture-card",
        multiple: !!r.desc.multiple,
        limit: r.desc.multiple ? r.desc.limit || 20 : 1,
        autoUpload: r.desc.autoUpload ?? !0,
        accept: r.desc.accept || zi[`${r.desc.upType || "image"}Types`].join(","),
        maxSize: r.desc.maxSize || (r.desc.upType === "file" ? (P = o.upload) == null ? void 0 : P.maxFSize : (k = o.upload) == null ? void 0 : k.maxISize),
        beforeUpload: Q,
        onRemove: Y,
        onSuccess: b,
        onExceed: K,
        onPreview: B,
        httpRequest: ue,
        ...Te()
      });
    });
    function Y(w) {
      x(w, 0);
    }
    async function b(w, P) {
      var Ue, Ke;
      const { objectUrl: k, previewUrl: ge } = await ((Ke = (Ue = o.upload) == null ? void 0 : Ue.minio) == null ? void 0 : Ke.getObjectAuthUrl(P.raw.uploadId));
      P.raw.shareUrl = k, P.raw.previewUrl = ge, P.url = E(P.raw), x(P, 1);
    }
    function E(w) {
      if (w) {
        const P = (w == null ? void 0 : w.suffix) || "";
        if (P) {
          if ([".png", ".jpg", ".gif", ".jpeg"].indexOf(P) >= 0)
            return w.shareUrl || w.furl || w.path;
          for (let k = 0; k < wl.length; k++)
            for (let ge = 0; ge < wl[k].suffixes.length; ge++)
              if (wl[k].suffixes[ge] === P)
                return D[wl[k].type];
        }
      }
      return D.file;
    }
    function x(w, P) {
      var k, ge;
      if (P === 1)
        p.value.push({
          name: w.name,
          furl: ((k = w.raw) == null ? void 0 : k.path) || w.url,
          url: E(w.raw),
          fsize: w.size,
          uid: w.uid,
          mimeType: (ge = w.raw) == null ? void 0 : ge.type,
          suffix: w.raw.suffix,
          busId: r.desc.busId,
          busType: r.desc.busType
        });
      else {
        const Ue = p.value.findIndex((Ke) => Ke.uid === w.uid);
        Ue >= 0 && p.value.splice(Ue, 1);
      }
      s("validateThis");
    }
    async function Q(w) {
      var ge, Ue;
      w.suffix = w.name.substring(w.name.lastIndexOf("."));
      const P = te(w, zi[`${r.desc.upType || "image"}Suffixes`], m.value.maxSize);
      if (P !== !0)
        return Wn.warning(P), !1;
      const k = await ((Ue = (ge = o.upload) == null ? void 0 : ge.minio) == null ? void 0 : Ue.getUploadUrl(w.name));
      w.action = k.uploadUrl, w.path = k.objectUrl, w.previewUrl = k.previewUrl, w.uploadId = k.uploadId;
    }
    function B(w) {
      var P, k;
      [".png", ".jpg", ".gif", ".jpeg"].indexOf(((P = w.raw) == null ? void 0 : P.suffix) || w.suffix) >= 0 ? (M.value = z.value.findIndex((ge) => {
        var Ue, Ke;
        return ge === (((Ue = w.raw) == null ? void 0 : Ue.shareUrl) || ((Ke = w.raw) == null ? void 0 : Ke.path) || w.furl);
      }), M.value < 0 && (M.value = 0), d.value = !0) : window.open(((k = w.raw) == null ? void 0 : k.previewUrl) || w.previewUrl, "_blank");
    }
    function K() {
      Wn.error("数量最多只能上传" + m.value.limit + "个图片/文件!!!");
    }
    async function ue(w) {
      var P, k;
      await ((k = (P = o.upload) == null ? void 0 : P.minio) == null ? void 0 : k.doElUpload(w));
    }
    function me() {
    }
    function te(w, P, k) {
      return w.size > k ? "上传文件大小不能超过 " + (k / 1024 / 1024).toFixed(2) + "M~" : P && P.length > 0 && P.every((ge) => ge !== w.suffix) ? "上传文件类型错误，请重新选择~" : !0;
    }
    return He(
      () => r.modelValue,
      (w, P) => {
        JSON.stringify(w) !== JSON.stringify(P) && (p.value = (w == null ? void 0 : w.map((k) => (k.url = E(k), k))) || []);
      },
      { immediate: !0 }
    ), (w, P) => {
      var _t;
      const k = F("el-icon"), ge = F("el-upload"), Ue = F("el-image-viewer"), Ke = F("el-button");
      return _(), V("div", {
        class: bn(["ele-form-upload-image", { "ele-form-upload-file": w.desc.upType === "file" }])
      }, [
        ie(ge, ne({ class: "ele-image-upload" }, m.value, Le(N.value), {
          fileList: p.value || [],
          class: { "over-limit": ((_t = p.value) == null ? void 0 : _t.length) >= m.value.limit, "upload-disabled": m.value.disabled }
        }), {
          default: U(() => [
            Ie("div", jy, [
              w.desc.icon ? (_(), V("i", {
                key: 0,
                class: bn(w.desc.icon),
                style: yt({ fontSize: w.desc.fontSize || "14px", color: w.desc.color || "#C0C4CC" })
              }, null, 6)) : (_(), R(k, {
                key: 1,
                style: yt({ fontSize: w.desc.fontSize || "14px", color: w.desc.color || "#C0C4CC" })
              }, {
                default: U(() => [
                  ie(zt(Uz))
                ]),
                _: 1
              }, 8, ["style"])),
              w.desc.upType === "file" && w.desc.text2 ? (_(), V("div", zy, Ce(w.desc.text2), 1)) : Me("", !0),
              w.desc.upType === "file" ? (_(), V("div", yy, Ce(w.desc.text || "拖拽/点击上传"), 1)) : Me("", !0)
            ])
          ]),
          _: 1
        }, 16, ["fileList", "class"]),
        d.value ? (_(), R(Ue, {
          key: 0,
          onClose: P[0] || (P[0] = (vt) => d.value = !1),
          teleported: "",
          initialIndex: M.value,
          "url-list": z.value
        }, null, 8, ["initialIndex", "url-list"])) : Me("", !0),
        m.value.autoUpload ? Me("", !0) : (_(), V("div", Dy, [
          ie(Ke, {
            style: { "margin-left": "10px" },
            size: "small",
            type: "success",
            onClick: me
          }, {
            default: U(() => [
              Be(" 上传到服务器 ")
            ]),
            _: 1
          })
        ]))
      ], 2);
    };
  }
});
const my = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: Na }, Symbol.toStringTag, { value: "Module" })), il = [
  Ii,
  wi,
  mn,
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
  ra,
  Na
], hy = [{ required: !0, trigger: "blur", validator: Wy }], Yy = [{ required: !0, trigger: "blur", validator: Gy }], vy = [{ type: "number", message: "请填入数字！" }], Iy = [{ required: !0, trigger: "blur", validator: Ry }], wy = [{ trigger: "blur", validator: qy }], Ay = [{ required: !0, trigger: "blur", validator: $y }], Ty = [{ required: !0, trigger: "blur", validator: Su }], Ly = [{ trigger: "blur", validator: Su }], xy = [{ required: !0, trigger: "blur", validator: Xy }], Ey = [{ trigger: "blur", validator: za }], Cy = [{ required: !0, trigger: "blur", validator: za }], by = [
  { required: !0, message: "不能为空！", trigger: "blur" },
  { type: "number", message: "请填入数字！" }
], Oy = [{ required: !0, trigger: "blur", validator: Fy }], Sy = [{ required: !0, trigger: "blur", validator: ja }], By = [{ trigger: "blur", validator: ja }], ky = [{ required: !0, trigger: "change", validator: pa }], Uy = [{ required: !0, trigger: "change", validator: pa }], Qy = [{ required: !0, trigger: "change", validator: Zy }], Py = [{ required: !0, trigger: "change", validator: Hy }], Vy = [{ required: !0, trigger: "change", validator: Ky }];
function Fy(f, s, r) {
  /^[1-9]\d*$/.test(s * 1 + "") ? r() : r(new Error("请输入正整数！"));
}
function Ry(f, s, r) {
  s.length !== 4 ? r(new Error("验证码必须是4位！")) : r();
}
function Wy(f, s, r) {
  typeof s > "u" || s === "" || s === null ? r(new Error("此项必填！")) : r();
}
function Gy(f, s, r) {
  typeof s > "u" || s === "" || s === null ? r(new Error("此项必填！")) : (typeof s == "number" && (s = s + ""), typeof s == "string" && s.match(/^[ ]*$/) ? r(new Error("不能全是空格!")) : r());
}
function pa(f, s, r) {
  s === null || typeof s > "u" || s === "" || s.length <= 0 ? r(new Error("请选择！")) : r();
}
function Zy(f, s, r) {
  s === null || typeof s > "u" || s === "" || s.length <= 0 ? r(new Error("请上传！")) : r();
}
function Hy(f, s, r) {
  typeof s > "u" || s === null || s === "" || s === null ? r(new Error("此项必填！")) : s.replace(/\n/g, "") ? typeof s == "string" && s.replace(/\n/g, "").match(/^[ ]*$/) ? r(new Error("不能全是空格!")) : r() : r(new Error("不能全是换行！"));
}
function Ky(f, s, r) {
  typeof s > "u" || s === null || s === "" || s === null ? r(new Error("此项必填！")) : s.replace(/\n/g, "") ? typeof s == "string" && s.replace(/\n/g, "").match(/^[ ]*$/) ? r(new Error("不能全是空格!")) : r() : r(new Error("不能全是换行！"));
}
function ja(f, s, r) {
  /^\d+(\.(\d{1}|\d{2}))?$/.test(s * 1 + "") ? r() : r(new Error("小数格式错误(最多两位)!"));
}
function qy(f, s, r) {
  s ? /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(s) ? r() : r(new Error("邮箱格式错误!")) : r(new Error("邮箱必填"));
}
function $y(f, s, r) {
  s ? /^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(s) ? r() : r(new Error("手机号格式错误!")) : r(new Error("手机号必填"));
}
function Su(f, s, r) {
  !s || !/^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?=.*[~!@#$%^&*])(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,32}$/.test(s) ? r(new Error("密码为8-32位字母大小写+特殊字符+数字!")) : r();
}
function Jy(f, s, r) {
  s && !/^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?=.*[~!@#$%^&*])(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,32}$/.test(s) ? r(new Error("密码为8-32位字母大小写+特殊字符+数字!")) : r();
}
function Xy(f, s, r) {
  typeof s > "u" || s === "" || s === null ? r(new Error("此项必填！")) : s && !/^([a-z,A-z,0-9]){4,20}$/.test(s) ? r(new Error("账号为4-20位字母或数字!")) : r();
}
function za(f, s, r) {
  s && !/^([a-z,A-z,0-9]){16,20}$/.test(s) ? r(new Error("请输入16-20位字母或数字!")) : r();
}
const yi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, account: xy, cascader: Uy, double: Sy, double2: By, editor: Vy, email: wy, notAllBlank: Yy, notNull: hy, number: vy, numberNotNull: by, password: Ty, password2: Ly, phone: Ay, select: ky, textarea: Py, upload: Qy, vCode: Iy, validatePassword: Su, validatePassword2: Jy, wordnum: Ey, wordnum2: Cy, zhengZhengShu: Oy }, Symbol.toStringTag, { value: "Module" })), Di = /* @__PURE__ */ Object.assign({ "./ElPlusFormArea.vue": cj, "./ElPlusFormAutocomplete.vue": dj, "./ElPlusFormBtn.vue": Nj, "./ElPlusFormBtns.vue": zj, "./ElPlusFormCascader.vue": _j, "./ElPlusFormCascaderPanel.vue": Yj, "./ElPlusFormCheckbox.vue": wj, "./ElPlusFormCheckboxButton.vue": Lj, "./ElPlusFormColor.vue": Cj, "./ElPlusFormDate.vue": Sj, "./ElPlusFormDaterange.vue": Uj, "./ElPlusFormDatetime.vue": Vj, "./ElPlusFormDatetimerange.vue": Wj, "./ElPlusFormFile.vue": az, "./ElPlusFormImage.vue": Nz, "./ElPlusFormInput.vue": jz, "./ElPlusFormLink.vue": wz, "./ElPlusFormLkuser.vue": d2, "./ElPlusFormNbinput.vue": N2, "./ElPlusFormNumber.vue": z2, "./ElPlusFormPassword.vue": D2, "./ElPlusFormQuickInput.vue": h2, "./ElPlusFormRadio.vue": I2, "./ElPlusFormRate.vue": T2, "./ElPlusFormSelect.vue": C2, "./ElPlusFormSlider.vue": S2, "./ElPlusFormStatus.vue": Q2, "./ElPlusFormSwitch.vue": F2, "./ElPlusFormTag.vue": W2, "./ElPlusFormText.vue": K2, "./ElPlusFormTextarea.vue": $2, "./ElPlusFormTransfer.vue": ey, "./ElPlusFormTree.vue": ly, "./ElPlusFormTreeSelect.vue": uy, "./ElPlusFormUpload.vue": my }), ya = [];
for (const f in Di) {
  const s = Di[f].default;
  s.typeName && ya.push(s.typeName);
}
const eD = ["innerHTML"], tD = {
  key: 0,
  style: { display: "flex", "justify-content": "center" }
}, nD = {
  name: "ElPlusForm",
  inheritAttrs: !1,
  customOptions: {}
}, Bu = /* @__PURE__ */ fe({
  ...nD,
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
    var Wt;
    const o = f, D = We("defaultConf"), p = We("format"), m = h(), N = h(!1), d = Te(), M = h([]), z = h(!1);
    let Y = null;
    const b = Ae(() => o.size || D.size), E = [...ya, ...((Wt = D.form) == null ? void 0 : Wt.comList) || []], x = Ae(() => ({ display: "flex", flexDirection: o.isTable ? "row" : "column" })), Q = Ae(() => ({
      scrollToError: !0,
      ...o.formAttrs,
      labelWidth: o.labelWidth === "auto" ? o.isDialog ? "100px" : "120px" : parseInt(o.labelWidth + "") + "px",
      // validateOnRuleChange: false,
      disabled: o.disabled || z.value,
      rules: B,
      labelPosition: $j() ? "top" : "right",
      style: {
        width: o.maxWidth || o.isTable ? "100%" : o.isDialog ? "80%" : "1000px",
        paddingRight: o.isTable ? "0" : "20px"
      }
    })), B = Ae(() => {
      const I = o.rules || [];
      return o.formDesc && Object.keys(o.formDesc).map((L) => {
        if (I[L] || (I[L] = []), o.formDesc) {
          if (o.formDesc[L].rules)
            typeof o.formDesc[L].rules == "string" ? I[L].push(...yi[o.formDesc[L].rules]) : Jj(o.formDesc[L].rules).map((J) => {
              I[L].push(J);
            });
          else if (o.formDesc[L].required || o.formDesc[L].require) {
            let J = "notAllBlank";
            switch (o.formDesc[L].type) {
              case "upload":
              case "select":
              case "password":
              case "textarea":
              case "editor":
                J = o.formDesc[L].type || "";
                break;
              case "cascader":
              case "tselect":
              case "linkuser":
              case "radio":
                J = "select";
                break;
            }
            I[L].push(...yi[J]);
          }
        }
      }), I;
    }), K = Ae(() => {
      const I = [];
      if (o.formDesc) {
        let L = [];
        for (const De in o.formDesc)
          L.push({ ...o.formDesc[De], field: De });
        let J = [], ae = 0;
        L.map((De) => {
          if (De._vif && (J.push(De), ae++, De.colspan && (ae += De.colspan - 1), ae >= o.column)) {
            I.push(J), J = [], ae = 0;
            return;
          }
        }), J.length > 0 && I.push(J);
      }
      return I;
    }), ue = Dt.throttle(() => {
      o.formDesc && Object.keys(o.formDesc).forEach((I) => {
        if (o.formDesc) {
          const L = o.formDesc[I];
          if (L && L.type) {
            L._type = E.includes(L.type.toLowerCase()) ? "el-plus-form-" + L.type : L.type, L._vif = te(L, "vif", I, !L.isBlank), L._disabled = te(L, "disabled", I, o.disabled ?? !1);
            const J = {};
            L._attrs = Object.assign({}, te(L, "attrs", I), J), L._label = te(L, "label", I), L._tip = te(L, "tip", I), !L._tip && !L.noTip && L.type === "upload" && (L._tip = `最多上传${L.multiple ? L.limit || 20 : 1}${L.upType === "file" ? "个文件" : "张图片"}`), L.default !== void 0 && L.default !== null && o.modelValue[I] === void 0 && (o.modelValue[I] = L.default), L.defaultItem !== void 0 && L.defaultItem !== null && o.modelValue[I] === void 0 && (o.modelValue[I] = L.defaultItem.value), L.format && (typeof L.format == "string" ? o.modelValue[I] = p[L.format](o.modelValue[I], o.modelValue) : typeof L.format == "function" && (o.modelValue[I] = L.format(o.modelValue[I], o.modelValue)));
          } else
            L && L.isBlank && (L._vif = te(L, "vif", "", !0));
        }
      });
    }, 500), me = Ae(() => {
      let I = [];
      return o.showBtns && (o.showCancel && I.push({
        field: "_reset_btn",
        desc: {
          label: o.cancelBtnText || "取消",
          size: b.value,
          disabled: z.value,
          on: { click: () => r("cancel") }
        }
      }), o.showReset && I.push({
        field: "_reset_btn",
        desc: {
          label: o.resetBtnText || "重置",
          confirm: `确定要${o.resetBtnText || "重置"}?`,
          size: b.value,
          disabled: z.value,
          on: { click: _t }
        }
      }), o.showSubmit && I.push({
        field: "_reset_btn",
        desc: {
          label: o.submitBtnText || "提交",
          size: b.value,
          type: "primary",
          loading: o.isLoading || z.value,
          on: { click: Ke }
        }
      })), I;
    }), te = (I, L, J, ae = null) => typeof I[L] == "function" ? (N.value = !0, I[L](o.modelValue, o.modelValue[J])) : typeof I[L] == "boolean" ? I[L] ?? !1 : typeof I[L] == "string" ? I[L] ?? "" : I[L] ?? ae, w = () => new Promise((I, L) => {
      B.value ? m.value.validate((J, ae) => {
        J ? I() : L(ae);
      }) : I();
    }), P = (I) => {
      I && M.value.filter((L) => L.field === I.field).length <= 0 && M.value.push(I);
    }, k = (I, L, J) => {
      const ae = {};
      if (!I)
        return { [L]: J };
      if (!I._vif || J === void 0 || J === null)
        return ae;
      if (I.type === "category")
        if (J === null && (J = []), I.checkStrictly === !0)
          ae.categoryId = J[2] ?? J[1] ?? J[0] ?? "";
        else
          for (let De = 0; De < 3; De++)
            ae["categoryId" + (De + 1)] = J[De] ?? "";
      else if (I.type === "area") {
        J === null && (J = [null, null, null, null]);
        const [De, G, X, ee] = J;
        I.checkStrictly ? ae[L] = ee || X || G || De || null : (ae.provinceId = De || -1, ae.cityId = G || -1, ae.zoneId = X || -1, ae.streetId = ee || -1);
      } else if (I.type === "daterange")
        J && J.length === 2 && (ae.startTime = J[0], typeof J[1] == "string" ? ae.endTime = new Date(J[1]).getTime() : ae.endTime = J[1], ae.endTime = ae.endTime + (24 * 60 * 60 - 1) * 1e3, ae.startTime = p.time(ae.startTime, 3), ae.endTime = p.time(ae.endTime, 3));
      else if (I.type === "datetimerange")
        J && J.length === 2 && (ae.startTime = p.time(J[0], 3), ae.endTime = p.time(J[1], 3));
      else if (I.type === "linkuser") {
        const [De, G, X, ee] = J;
        ae.userIds = De, ae.deptIds = G, ae.userNames = X, ae.deptNames = ee;
      } else {
        switch (I.type) {
          case "checkbox":
            Array.isArray(J) && (J = J.join(","));
            break;
        }
        ae[L] = J;
      }
      return ae;
    }, ge = () => {
      const I = {};
      return o.formDesc && Object.keys(o.modelValue).map((L) => {
        ["provinceId", "cityId", "zoneId", "streetId"].indexOf(L) >= 0 || o.formDesc && Object.assign(I, k(o.formDesc[L], L, o.modelValue[L]));
      }), I;
    }, Ue = () => {
      M.value.map((I) => {
        I.CID && I.changeValidImg();
      });
    }, Ke = async () => {
      let I = ge();
      try {
        if (d.beforeValidate && await d.beforeValidate(I) === !1)
          return;
        await w();
        for (const L in I) {
          if (L.indexOf("_") === 0) {
            delete I[L];
            continue;
          }
          if (o.formDesc) {
            const J = o.formDesc[L];
            J && J.valueFormat && (I[L] = J.valueFormat(I[L], I)), (I[L] === !0 || I[L] === !1) && (I[L] = +I[L]);
          }
        }
        if (d.beforeRequest) {
          const L = await d.beforeRequest(I);
          if (L === !1)
            return;
          typeof L == "object" && (I = L);
        }
        if (o.requestFn) {
          if (z.value)
            return;
          z.value = !0;
          try {
            let L = {};
            o.updateFn && I && I[o.idKey] ? L = await o.updateFn(I) : L = await o.requestFn(I), Xt(() => {
              d.success && typeof d.success == "function" && d.success({ response: L, formData: o.modelValue, callback: () => z.value = !1 });
            });
          } catch (L) {
            if (d.requestError && typeof d.requestError == "function")
              d.requestError(L);
            else {
              if (L instanceof Error)
                try {
                  JSON.parse(L.message) instanceof Object;
                } catch {
                }
              else
                L instanceof Object;
              d.requestError && typeof d.requestError == "function" && d.requestError();
            }
            z.value = !1;
          } finally {
            o.isDialog || (z.value = !1), d.requestEnd && typeof d.requestEnd == "function" && d.requestEnd();
          }
        } else {
          if (o.isLoading)
            return;
          r("request", I);
        }
      } catch (L) {
        console.log("error: ", L);
      }
    }, _t = () => {
      Object.keys(o.modelValue).map((I) => {
        o.modelValue[I] = Y ? Y[I] : (o.formDesc && o.formDesc[I] && o.formDesc[I].default) ?? null;
      }), setTimeout(() => {
        vt();
      }, 100), r("reset");
    }, vt = () => {
      var I;
      (I = m.value) == null || I.resetFields();
    }, tn = () => {
      o.modelValue && Object.keys(o.modelValue).map((I) => {
        o.modelValue[I] = (o.formDesc && o.formDesc[I] && o.formDesc[I].default) ?? null;
      }), Xt(() => {
        vt();
      });
    };
    function nn(I) {
      m.value.validateField(I, (L) => {
      });
    }
    function dt() {
      console.log("refresh***************************"), ue(), Xt(() => {
        vt();
      });
    }
    return He(
      () => o.formDesc,
      (I) => {
        I && ue();
      }
    ), He(
      () => o.modelValue,
      (I) => {
        (!Y || N.value && I && JSON.stringify(I) !== JSON.stringify(Y)) && JSON.stringify(I) !== JSON.stringify(Y) && (Y = Dt.cloneDeep(I), ue());
      },
      { deep: !0 }
    ), cn(async () => {
      N.value || ue(), vt();
    }), s({ submit: Ke, getData: ge, validate: w, reset: _t, clearValid: vt, clear: tn, changeValidImg: Ue, refresh: dt }), (I, L) => {
      const J = F("el-form-item"), ae = F("el-col"), De = F("el-row"), G = F("el-form");
      return _(), V("div", {
        style: yt(x.value)
      }, [
        $e(I.$slots, "top", {
          formData: o.modelValue
        }),
        Ie("div", {
          style: yt({ display: "flex", justifyContent: I.isDialog ? "center" : "" })
        }, [
          ie(G, ne({
            class: "el-plus-form-panel",
            ref_key: "refElPlusForm",
            ref: m,
            model: o.modelValue,
            onSubmit: tj(Ke, ["prevent"])
          }, Q.value), {
            default: U(() => [
              (_(!0), V(Ye, null, we(K.value, (X, ee) => (_(), R(De, {
                gutter: 10,
                key: ee,
                style: yt({ marginRight: I.isTable ? "20px" : 0 })
              }, {
                default: U(() => [
                  (_(!0), V(Ye, null, we(X, (q, je) => (_(), R(ae, {
                    key: ee + "-" + je + "-" + q.field,
                    xs: 24,
                    sm: 24,
                    md: q.colspan && q.colspan >= I.column ? 24 : I.column >= 2 ? 12 : 24,
                    lg: q.colspan && q.colspan >= I.column ? 24 : Math.floor(24 / I.column * (q.colspan || 1)),
                    xl: q.colspan && q.colspan >= I.column ? 24 : Math.floor(24 / I.column * (q.colspan || 1))
                  }, {
                    default: U(() => {
                      var it;
                      return [
                        q._vif ? (_(), V("div", {
                          key: 0,
                          class: "el-plus-form-column-panel",
                          style: yt({ "justify-content": I.isTable ? "flex-end" : "flex-start" })
                        }, [
                          ie(J, {
                            style: yt([{ "min-height": "40px" }, { width: ((it = q._attrs) == null ? void 0 : it.width) || q.width || (I.isTable ? "150px" : "100%") }]),
                            label: I.showLabel && q.showLabel !== !1 ? q._label : null,
                            "label-width": q.labelWidth || I.labelWidth || (I.isDialog ? "100px" : "120px"),
                            prop: q.field
                          }, {
                            default: U(() => [
                              (_(), R(vi(q._type), ne({
                                style: { "min-width": "80px", width: "100%" },
                                formData: o.modelValue,
                                disabled: q._disabled ?? I.disabled ?? !1,
                                readonly: I.readonly ?? !1
                              }, q._attrs, {
                                desc: q,
                                ref_for: !0,
                                ref: P,
                                field: q.field,
                                modelValue: o.modelValue[q.field || ""],
                                "onUpdate:modelValue": (rt) => o.modelValue[q.field || ""] = rt,
                                isTable: I.isTable,
                                onValidateThis: () => nn(q.field || "")
                              }), null, 16, ["formData", "disabled", "readonly", "desc", "field", "modelValue", "onUpdate:modelValue", "isTable", "onValidateThis"])),
                              q._tip ? (_(), V("div", {
                                key: 0,
                                class: "el-plus-form-tip",
                                innerHTML: q._tip
                              }, null, 8, eD)) : Me("", !0)
                            ]),
                            _: 2
                          }, 1032, ["label", "label-width", "prop", "style"])
                        ], 4)) : Me("", !0)
                      ];
                    }),
                    _: 2
                  }, 1032, ["md", "lg", "xl"]))), 128))
                ]),
                _: 2
              }, 1032, ["style"]))), 128)),
              $e(I.$slots, "row")
            ]),
            _: 3
          }, 16, ["model", "onSubmit"])
        ], 4),
        $e(I.$slots, "default"),
        ie(G, null, {
          default: U(() => [
            $e(I.$slots, "form-btn", {
              data: o.modelValue
            }, () => [
              me.value && me.value.length > 0 ? (_(), V("div", tD, [
                (_(!0), V(Ye, null, we(me.value, (X, ee) => (_(), R(mn, nj(ne({ key: ee }, X)), null, 16))), 128))
              ])) : Me("", !0)
            ]),
            $e(I.$slots, "bottom", {
              formData: o.modelValue
            })
          ]),
          _: 3
        }),
        $e(I.$slots, "form-footer", {
          formData: o.modelValue
        })
      ], 4);
    };
  }
});
const lD = {
  name: "ElPlusFormDialog",
  inheritAttrs: !1,
  customOptions: {}
}, rD = /* @__PURE__ */ fe({
  ...lD,
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
    const o = f, D = Ae({
      get: () => o.modelValue,
      set(te) {
        r("update:modelValue", te);
      }
    }), p = Ae({
      get() {
        return o.show;
      },
      set(te) {
        te ? K() : ue();
      }
    }), m = h(null), { width: N, top: d, modal: M, appendToBody: z, showClose: Y, draggable: b, closeOnClickModal: E, ...x } = Object.assign({ width: "700px", draggable: !0, top: "15vh", closeOnClickModal: !1, showCancel: !0 }, Te()), Q = { width: N, top: d, modal: M, appendToBody: z, showClose: Y, draggable: b, closeOnClickModal: E };
    function B(te) {
      o.success ? o.success(te) : o.tableRef && (Wn.success(o.successTip), o.tableRef.reload(), ue(), setTimeout(() => {
        te.callback();
      }, 200));
    }
    function K() {
      r("update:show", !0);
    }
    function ue() {
      r("update:show", !1);
    }
    function me() {
      var te;
      (te = m.value) == null || te.clear();
    }
    return s({ open: K, close: ue }), (te, w) => {
      const P = F("el-dialog");
      return _(), R(P, ne({
        class: "el-plus-form-dialog",
        modelValue: p.value,
        "onUpdate:modelValue": w[1] || (w[1] = (k) => p.value = k),
        title: o.title
      }, Q, { onClosed: me }), {
        header: U(() => [
          $e(te.$slots, "header")
        ]),
        default: U(() => [
          ie(Bu, ne({
            ref_key: "refElPlusDialogForm",
            ref: m,
            style: { padding: "20px" },
            isDialog: !0,
            modelValue: D.value,
            "onUpdate:modelValue": w[0] || (w[0] = (k) => D.value = k)
          }, x, {
            success: B,
            onCancel: ue
          }), {
            top: U(() => [
              $e(te.$slots, "top")
            ]),
            default: U(() => [
              $e(te.$slots, "default")
            ]),
            _: 3
          }, 16, ["modelValue"])
        ]),
        _: 3
      }, 16, ["modelValue", "title"]);
    };
  }
}), uD = { class: "el-plus-form-group" }, oD = {
  key: 0,
  class: "title-line"
}, sD = {
  name: "ElPlusFormGroup",
  inheritAttrs: !1,
  customOptions: {}
}, iD = /* @__PURE__ */ fe({
  ...sD,
  props: {
    modelValue: {},
    formGroup: {},
    isLoading: { type: Boolean }
  },
  emits: ["update:show", "update:modelValue", "before-validate", "before-request", "request-success", "request-error", "request-end", "request"],
  setup(f, { emit: s }) {
    const r = f, o = h([]), D = [], p = Ae({
      get: () => r.modelValue,
      set(M) {
        s("update:modelValue", M);
      }
    }), m = Ae(() => {
      const M = [], z = Dt.cloneDeep(r.formGroup), Y = r.formGroup.column || 1;
      return delete z.group, delete z.column, z.beforeValidate = async (b) => await Promise.all(o.value.map((E) => E.validate())), r.formGroup.group.map((b, E) => {
        M.push({
          title: b.title,
          formProps: Object.assign({ column: b.column || Y }, E === r.formGroup.group.length - 1 ? z : { showBtns: !1 }, b || {})
        });
      }), M;
    });
    function N(M, z) {
      M && D.indexOf(z) < 0 && (D.push(z), o.value.push(M));
    }
    const d = () => {
      o.value.map((M, z, Y) => {
        z === Y.length - 1 || M.clearValid();
      });
    };
    return (M, z) => (_(), V("div", uD, [
      (_(!0), V(Ye, null, we(m.value, (Y, b) => (_(), V(Ye, { key: b }, [
        Y.title ? (_(), V("div", oD, Ce(Y.title), 1)) : Me("", !0),
        ie(Bu, ne({
          modelValue: p.value,
          "onUpdate:modelValue": z[0] || (z[0] = (E) => p.value = E)
        }, Y.formProps, {
          ref_for: !0,
          ref: (E) => N(E, "form" + b),
          onReset: d
        }), {
          default: U(() => [
            Mn()["default" + b] ? $e(M.$slots, "default" + b, { key: 0 }) : Me("", !0)
          ]),
          _: 2
        }, 1040, ["modelValue"])
      ], 64))), 128))
    ]));
  }
});
const aD = { class: "el-plus-table-edit-column" }, cD = { class: "select-panel" }, MD = { class: "dialog-footer" }, fD = /* @__PURE__ */ fe({
  __name: "settingColumn",
  props: {
    column: {},
    tbName: {},
    size: {},
    showText: { type: Boolean }
  },
  setup(f, { expose: s }) {
    const r = f, o = We("defaultConf"), D = h(!1), p = h([]), m = h([]), N = h(!1), d = h(!1);
    function M() {
      D.value = !0;
    }
    function z() {
      if (p.value.length <= 0)
        return Wn.warning("请至少选择一列！"), !1;
      const Q = [];
      r.column.map((B) => {
        p.value.indexOf(B.label) < 0 ? (Q.push(B.label), B.scShow = !1) : B.scShow = !0;
      }), Q.length > 0 ? localStorage.setItem(o.storagePrefix + "hideColumnsList_" + r.tbName, Q.join("__")) : localStorage.removeItem(o.storagePrefix + "hideColumnsList_" + r.tbName), D.value = !1, m.value = p.value;
    }
    function Y() {
      p.value = [], d.value ? p.value = r.column.map((Q) => Q.label) : p.value = r.column.filter((Q) => Q.required || Q.noHide).map((Q) => Q.label), N.value = !1;
    }
    function b() {
      p.value.length === 0 ? (N.value = !1, d.value = !1) : r.column.length === p.value.length ? (N.value = !1, d.value = !0) : (N.value = !0, d.value = !1);
    }
    function E(Q) {
      const B = localStorage.getItem(o.storagePrefix + "hideColumnsList_" + r.tbName);
      let K = [];
      B != null && B.length > 0 && (K = B.split("__")), r.column.map((ue) => {
        ue.vif !== void 0 && ue.vif !== null ? typeof ue.vif == "function" ? ue._vif = ue.vif(ue) : ue._vif = !!ue.vif : ue._vif = !0, ue._vif && (ue.required || ue.noHide || K.indexOf(ue.label) < 0) && p.value.push(ue.label);
      }), b(), Q && z();
    }
    function x() {
      D.value = !1, p.value = m.value;
    }
    return cn(() => {
      r.tbName && E(!0);
    }), s({ initCol: E }), (Q, B) => {
      const K = F("el-button"), ue = F("el-checkbox"), me = F("el-checkbox-group"), te = F("el-dialog");
      return _(), V("div", aD, [
        Q.showText ? (_(), R(K, {
          key: 0,
          type: "primary",
          onClick: M,
          size: Q.size,
          plain: ""
        }, {
          default: U(() => [
            Be("编辑显示列")
          ]),
          _: 1
        }, 8, ["size"])) : (_(), R(K, {
          key: 1,
          type: "primary",
          icon: "ele-Setting",
          onClick: M,
          size: Q.size,
          title: "编辑显示列",
          plain: "",
          circle: ""
        }, null, 8, ["size"])),
        ie(te, {
          title: "编辑显示列",
          modelValue: D.value,
          "onUpdate:modelValue": B[2] || (B[2] = (w) => D.value = w),
          width: "40%"
        }, {
          default: U(() => [
            Ie("div", cD, [
              ie(ue, {
                modelValue: d.value,
                "onUpdate:modelValue": B[0] || (B[0] = (w) => d.value = w),
                indeterminate: N.value,
                onChange: Y
              }, {
                default: U(() => [
                  Be(" 全选 ")
                ]),
                _: 1
              }, 8, ["modelValue", "indeterminate"])
            ]),
            ie(me, {
              modelValue: p.value,
              "onUpdate:modelValue": B[1] || (B[1] = (w) => p.value = w),
              onChange: b,
              style: { padding: "0 10px", "flex-wrap": "wrap", display: "flex" }
            }, {
              default: U(() => [
                (_(!0), V(Ye, null, we(r.column, (w) => (_(), V(Ye, {
                  key: w.label
                }, [
                  w._vif ? (_(), R(ue, {
                    key: 0,
                    label: w.label,
                    disabled: w.required || w.noHide || !1
                  }, {
                    default: U(() => [
                      Be(Ce(w.label), 1)
                    ]),
                    _: 2
                  }, 1032, ["label", "disabled"])) : Me("", !0)
                ], 64))), 128))
              ]),
              _: 1
            }, 8, ["modelValue"])
          ]),
          footer: U(() => [
            Ie("div", MD, [
              ie(K, {
                size: Q.size,
                onClick: x
              }, {
                default: U(() => [
                  Be(" 取 消 ")
                ]),
                _: 1
              }, 8, ["size"]),
              ie(K, {
                size: Q.size,
                type: "primary",
                onClick: z
              }, {
                default: U(() => [
                  Be(" 确 定 ")
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
const _i = /* @__PURE__ */ Ge(fD, [["__scopeId", "data-v-0f8e3d4b"]]);
function dD() {
  return !!navigator.userAgent.match(/('phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone')/i);
}
function gD(f) {
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
  return f && f.length > 0 && Dt.cloneDeep(f).map((o) => {
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
          o.btns.map((p) => D += typeof p.label == "string" ? p.label.length : 4), o.width = o.width || D * 20 + "px";
        }
        o.align = o.align || "left", o.headerAlign = o.headerAlign || "left", o.text = !0;
        break;
    }
    if (o.minWidth = o.minWidth || (o.label !== "操作" ? s : "auto"), o.showOverflowTooltip = o.label !== "操作", o.parent) {
      let D = !1;
      r.forEach((p) => {
        p.label === o.parent && (p.children.push(o), D = !0);
      }), D || r.push({ label: o.parent, children: [o] });
    } else
      r.push(o);
  }), r;
}
const ND = (f, s) => {
  let r = "";
  for (const o in f)
    s && Array.isArray(s) && s.length > 0 && s.indexOf(o) >= 0 || f[o] !== void 0 && f[o] !== null && f[o] !== "" && (r !== "" && (r += "&"), r += o + "=" + f[o]);
  return r;
}, pD = { class: "el-plus-table-header-info" }, jD = {
  key: 0,
  class: "el-plus-table-form-items"
}, zD = { class: "table-header-form-btns" }, yD = { class: "el-plus-table-header-btn" }, DD = {
  key: 1,
  class: "el-plus-table-header-form"
}, _D = {
  class: "table-header-form-btns",
  style: { "margin-bottom": "16px" }
}, mD = /* @__PURE__ */ fe({
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
    const o = f, D = We("defaultConf"), p = h(), m = h(), N = Ae(() => {
      const x = [];
      return o.toolbar && o.toolbar.btns && o.toolbar.btns.map((Q) => {
        x.push({ ...gD(Q), size: Q.size || o.size });
      }), x;
    }), d = Ae(() => {
      var Q;
      const x = (Q = o.toolbar) == null ? void 0 : Q.formConfig;
      return x != null && x.formDesc && Object.values(x == null ? void 0 : x.formDesc).map((B) => {
        if (B.width)
          return;
        let K = 300;
        switch (B.type) {
          case "daterange":
          case "input":
          case "area":
            K = 300;
            break;
        }
        B.width = K + "px";
      }), x;
    });
    function M() {
      r("query");
    }
    async function z({ callBack: x }) {
      var Q, B, K, ue, me;
      if ((Q = o.toolbar) != null && Q.export) {
        const te = new XMLHttpRequest();
        let w = o.toolbar.export.url || "";
        if (o.toolbar.export.fetch ? w = await o.toolbar.export.fetch(Object.assign({}, (B = p.value) == null ? void 0 : B.getData(), ((K = o.toolbar.export) == null ? void 0 : K.data) || {})) : o.toolbar.export.noQuery || (w += (w.indexOf("?") >= 0 ? "&" : "?") + ND(Object.assign({}, (ue = p.value) == null ? void 0 : ue.getData(), ((me = o.toolbar.export) == null ? void 0 : me.data) || {}))), te.open("get", w, !0), te.responseType = "blob", o.toolbar.export.isAuth !== !1 && D.token) {
          let P = D.token;
          typeof D.token == "function" && (P = D.token()), te.setRequestHeader("Authorization", "Bearer " + P);
        }
        te.onload = function() {
          var P, k;
          if (this.status == 200) {
            const ge = document.createElement("a");
            ge.href = window.URL.createObjectURL(this.response), ge.download = (((k = (P = o.toolbar) == null ? void 0 : P.export) == null ? void 0 : k.name) || (/* @__PURE__ */ new Date()).getTime()) + ".xls", ge.click(), window.URL.revokeObjectURL(w), setTimeout(() => {
              x && x();
            }, 1e3);
          }
        }, te.onerror = function() {
          setTimeout(() => {
            x && x();
          }, 1e3);
        }, te.send();
      }
    }
    function Y() {
      p.value.submit();
    }
    function b() {
      p.value.clear(), Xt(() => {
        p.value.submit();
      });
    }
    function E() {
      var x, Q;
      o.tbName ? (x = m.value) == null || x.initCol() : (Q = o.column) == null || Q.map((B) => {
        B.vif !== void 0 && B.vif !== null ? typeof B.vif == "function" ? B._vif = B.vif(B) : B._vif = !!B.vif : B._vif = !0;
      });
    }
    return cn(() => {
    }), s({ getData: () => {
      var x;
      return (x = p.value) == null ? void 0 : x.getData();
    }, initCol: E }), (x, Q) => {
      const B = F("ElPlusForm"), K = F("el-form");
      return _(), V("div", pD, [
        o.toolbar && Object.keys(o.toolbar || {}).length ? (_(), R(K, {
          key: 0,
          inline: !0,
          class: "el-plus-table-header-form",
          style: yt({ justifyContent: !o.toolbar.formConfig && o.toolbar.btnRight ? "flex-end" : "space-between" })
        }, {
          default: U(() => [
            o.toolbar.formConfig ? (_(), V("div", jD, [
              ie(B, ne({
                ref_key: "elPlusFormRef",
                ref: p
              }, d.value, {
                modelValue: o.modelValue,
                "onUpdate:modelValue": Q[0] || (Q[0] = (ue) => o.modelValue = ue),
                labelWidth: "1",
                requestFn: M,
                showBtns: !1,
                isTable: !0
              }), {
                row: U(() => [
                  Ie("div", zD, [
                    ie(mn, {
                      type: "primary",
                      icon: "ele-Search",
                      loading: x.loading,
                      desc: { label: "查询", on: { click: Y }, size: x.size }
                    }, null, 8, ["loading", "desc"]),
                    ie(mn, {
                      desc: { label: "重置", on: { click: b }, size: x.size }
                    }, null, 8, ["desc"]),
                    o.toolbar.export ? (_(), R(mn, {
                      key: 0,
                      type: "primary",
                      desc: { label: "导出Excel", size: x.size, mask: !0, on: { click: z } }
                    }, null, 8, ["desc"])) : Me("", !0),
                    x.tbName ? (_(), R(_i, {
                      key: 1,
                      ref_key: "settingColumnRef",
                      ref: m,
                      tbName: x.tbName,
                      column: x.column || [],
                      size: x.size
                    }, null, 8, ["tbName", "column", "size"])) : Me("", !0),
                    (_(!0), V(Ye, null, we(N.value, (ue, me) => (_(), R(mn, {
                      key: me,
                      desc: ue,
                      loading: x.loading
                    }, null, 8, ["desc", "loading"]))), 128))
                  ])
                ]),
                _: 1
              }, 16, ["modelValue"])
            ])) : (_(), V("div", {
              key: 1,
              class: "el-plus-table-header-btns",
              style: yt({ "min-width": zt(dD)() ? "100%" : N.value && N.value.length > 0 ? N.value.length * 110 + "px" : "10px" })
            }, [
              Ie("div", yD, [
                (_(!0), V(Ye, null, we(N.value, (ue, me) => (_(), R(mn, {
                  key: me,
                  desc: ue,
                  loading: x.loading
                }, null, 8, ["desc", "loading"]))), 128))
              ])
            ], 4))
          ]),
          _: 1
        }, 8, ["style"])) : x.tbName ? (_(), V("div", DD, [
          Ie("div", _D, [
            x.tbName ? (_(), R(_i, {
              key: 0,
              ref_key: "settingColumnRef",
              ref: m,
              tbName: x.tbName,
              column: x.column || [],
              size: x.size,
              showText: !0
            }, null, 8, ["tbName", "column", "size"])) : Me("", !0)
          ])
        ])) : Me("", !0)
      ]);
    };
  }
});
const hD = /* @__PURE__ */ Ge(mD, [["__scopeId", "data-v-14a90d82"]]), YD = { style: { width: "100%", display: "flex" } }, vD = /* @__PURE__ */ fe({
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
    const s = f, r = h(((N = s.scope) == null ? void 0 : N.$index) || 0), o = Ae(() => {
      const d = [];
      return s.desc.nodes ? s.desc.nodes.map((M, z) => {
        d.push(p(M.field || s.field, M, z));
      }) : (s.field ? s.field.split(",") : []).map((z, Y) => {
        d.push(p(z, s.desc, Y));
      }), d.length <= 0 && d.push(p("", s.desc, 0)), d;
    }), D = Ae(() => {
      var d;
      return typeof s.desc.content == "function" ? s.desc.content(s.modelValue, (d = s.scope) == null ? void 0 : d.row, s.field) : s.desc.content || "";
    }), p = (d, M, z) => {
      var b, E, x;
      const Y = {
        field: d,
        desc: {
          prop: d,
          default: "",
          size: M.size || s.size || "small"
        }
      };
      return Object.assign(Y.desc, M), M.type === "btn" && (Y.desc.btnType = M.btnType || "primary", Y.desc.btnLabel = M.btnLabel || M.label, Y.desc.plain = M.plain || !0, Y.desc.text = !0), M.type ? (M.type === "text" && (Y.desc.default = M.default || "-"), M.type, typeof M.type == "string" ? Y.desc.type = M.type : Y.desc.type = M.type[z] || M.type[0], M.format && (typeof M.format == "string" || typeof M.format == "function" ? Y.desc.format = M.format : Y.desc.format = M.format[z] === null ? null : M.format[z] || M.format[0]), M.title && (typeof M.title == "string" ? Y.desc.title = M.title : Y.desc.title = M.title[z] || M.title[0])) : Y.desc.type = "text", M.elType && (Y.desc.elType = M.elType), M.linkType && (Y.desc.linkType = M.linkType), M.linkId && (Y.desc.linkId = M.linkId), M.color && (Y.desc.style = M.style || {}, typeof M.color == "function" ? Y.desc.style.color = M.color((b = s.scope) == null ? void 0 : b.row[s.field || ""], (E = s.scope) == null ? void 0 : E.row, s.field) : typeof M.color == "string" ? Y.desc.style.color = M.color : Y.desc.style.color = M.color[z] === null ? null : M.color[z] || M.color[0]), M.on && (Object.prototype.toString.call(M.on) === "[object Array]" ? Y.desc.on = M.on[z] === null ? null : M.on[z] || M.on[0] : Y.desc.on = M.on), M.disabled && (Y.disabled = !0), typeof M.options == "function" && (Y.desc.options = M.options(s.scope)), Y.vshow = m(M), M.attrs && (typeof M.attrs == "function" ? Y.desc.attrs = M.attrs((x = s.scope) == null ? void 0 : x.row) : Y.desc.attrs = M.attrs), Y.desc._label = M.label, Y;
    }, m = (d) => {
      var M;
      return d.vshow !== void 0 && d.vshow !== null && d.vshow !== "" ? typeof d.vshow == "boolean" ? d.vshow : typeof d.vshow == "function" ? d.vshow((M = s.scope) == null ? void 0 : M.row) : !!d.vshow : !0;
    };
    return cn(() => {
    }), (d, M) => {
      const z = F("el-icon"), Y = F("el-popover");
      return _(), V("div", {
        class: bn(["el-plus-table-column-item", [d.desc.inline ? "el-plus-table-column-row" : "el-plus-table-column-column"]])
      }, [
        (_(!0), V(Ye, null, we(o.value, (b, E) => {
          var x;
          return _(), V(Ye, {
            key: E + (b.options && b.options.length > 0 ? b.options[0].value || b.options[0].v : "0")
          }, [
            d.desc.content && D.value ? (_(), R(Y, {
              key: 0,
              placement: "left",
              width: 200,
              trigger: "hover",
              effect: "dark",
              content: D.value
            }, {
              reference: U(() => [
                ie(z, { style: { color: "#f56c6c", "font-size": "26px", padding: "0px 8px 0 0" } }, {
                  default: U(() => [
                    ie(zt(t2))
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["content"])) : Me("", !0),
            Ie("div", YD, [
              b.vshow === void 0 || b.vshow ? (_(), R(vi("el-plus-form-" + b.desc.type), ne({ key: 0 }, b, {
                isTable: !0,
                formData: (x = s.scope) == null ? void 0 : x.row,
                size: b.size || d.size,
                rowIndex: r.value,
                modelValue: s.scope.row[b.field],
                "onUpdate:modelValue": (Q) => s.scope.row[b.field] = Q
              }), null, 16, ["formData", "size", "rowIndex", "modelValue", "onUpdate:modelValue"])) : Me("", !0)
            ])
          ], 64);
        }), 128))
      ], 2);
    };
  }
});
const mi = /* @__PURE__ */ Ge(vD, [["__scopeId", "data-v-7b9b91ba"]]), ID = { class: "el-plus-table-content" }, wD = {
  key: 1,
  class: "table-tabs-panel"
}, AD = { class: "el-plus-table-main" }, TD = { key: 1 }, LD = {
  key: 2,
  class: "bottom-page-static-info"
}, xD = {
  name: "ElPlusTable",
  inheritAttrs: !1,
  customOptions: {}
}, ED = /* @__PURE__ */ fe({
  ...xD,
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
    var Zt, fn, On, gt, ln;
    const o = f, D = We("defaultConf"), p = We("format"), m = h(), N = h(((fn = (Zt = o.tableConfig) == null ? void 0 : Zt.tabConf) == null ? void 0 : fn.tabs[0].value) ?? ""), d = h({}), M = Ae(() => (A) => A.key ? d.value[A.key] || 0 : ""), z = h(), Y = h(!1), b = h(!!((On = o.tableConfig.tabConf) != null && On.fetch)), E = h(!1), x = D.size || "small", Q = h({});
    let B = lt({});
    const K = lt(o.modelValue || []), ue = lt([]), me = lt(Ou(o.tableConfig.column, o.isDialog ? "auto" : o.colMinWidth)), te = h(0), w = lt(Dt.cloneDeep(o.selectList) || []), P = lt([]), k = lt({
      current: !o.isDialog && B.current ? parseInt(B.current) : 1,
      total: 0,
      size: !o.isDialog && B.size ? parseInt(B.size) : o.pageSize
    }), ge = ((ln = (gt = o.tableConfig) == null ? void 0 : gt.explan) == null ? void 0 : ln.treeProps) || { children: "children", hasChildren: "hasChildren" }, Ue = Ae(() => _t(Ou(o.tableConfig.column, o.isDialog ? "auto" : o.colMinWidth))), Ke = Ae(() => {
      var Z, le, Xe, ut, Ve, ct, St;
      const A = [];
      if ((Z = o.tableConfig.summaryConf) != null && Z.vif) {
        if (typeof ((le = o.tableConfig.summaryConf) == null ? void 0 : le.vif) == "boolean") {
          if (!((Xe = o.tableConfig.summaryConf) != null && Xe.vif))
            return A;
        } else if (!((ut = o.tableConfig.summaryConf) != null && ut.vif()))
          return A;
      }
      if ((Ve = o.tableConfig.summaryConf) != null && Ve.prop) {
        const hn = o.tableConfig.summaryConf.prop.split(","), Ht = ((St = (ct = o.tableConfig.summaryConf) == null ? void 0 : ct.label) == null ? void 0 : St.split(",")) || [];
        hn.map((Zn, rn) => {
          var et, Nt;
          let ze = "";
          (et = o.tableConfig.summaryConf) != null && et.sumFn ? ze = (Nt = o.tableConfig.summaryConf) == null ? void 0 : Nt.sumFn(K, w) : ze = p.yuan(K.reduce((Qe, un) => Qe += un[Zn], 0)), A.push({ label: Ht[rn], value: ze });
        });
      }
      return A;
    });
    function _t(A) {
      return A.map((Z) => Z.children ? _t(Z.children) : o.tableConfig.tbName ? Z._vif && Z.scShow : (Z.vif !== void 0 && Z.vif !== null ? typeof Z.vif == "function" ? Z._vif = Z.vif(Z) : Z._vif = !!Z.vif : Z._vif = !0, Z._vif));
    }
    function vt(A) {
      rt(!0), r("tabChange", A);
    }
    function tn(A, Z, le) {
      var ut, Ve;
      const Xe = De();
      Xe[((Ve = (ut = o.tableConfig) == null ? void 0 : ut.explan) == null ? void 0 : Ve.idName) || "parentId"] = A.id, o.tableConfig.fetch && o.tableConfig.fetch(Xe).then((ct) => {
        le(ct == null ? void 0 : ct.records);
      });
    }
    function nn(A) {
      return ue.length > A.rowIndex ? ue[A.rowIndex * 1] : "";
    }
    function dt(A, Z) {
      L(Z, !A.some((le) => le[o.rowKey] === Z[o.rowKey])), r("select", A, Z), r("selection", Dt.cloneDeep(w));
    }
    function Wt(A) {
      const Z = !(A && A.length > 0);
      (Z ? K : A).map((le) => {
        L(le, Z);
      }), r("selectAll", A, Z), r("selection", Dt.cloneDeep(w));
    }
    function I(A, Z) {
      r("expandChange", A, Z);
    }
    function L(A, Z = !1) {
      const le = w.findIndex((Xe) => Xe[o.rowKey] === A[o.rowKey]);
      Z ? le >= 0 && w.splice(le, 1) : le < 0 && w.push(A);
    }
    function J(A, Z = !1) {
      A && A.length && A.map((le) => {
        L(
          w.find((Xe) => Xe[o.rowKey] === le[o.rowKey]),
          !Z
        );
      }), it();
    }
    function ae() {
      w.splice(0, w.length, ...o.selectList);
    }
    async function De() {
      var Z, le, Xe;
      let A = {
        // 封装查询条件
        // ...route.query,
        // ...tableHeaderRef.value.getData(),
        ...Q.value,
        ...typeof o.tableConfig.queryMap == "function" ? await o.tableConfig.queryMap() : o.tableConfig.queryMap,
        t_: (/* @__PURE__ */ new Date()).getTime()
      };
      return o.isPager && (A.current = k.current, A.size = k.size), o.tableConfig.tabConf && o.tableConfig.tabConf.prop && (A[o.tableConfig.tabConf.prop] = N.value), A = G(A), o.isDialog, (Xe = (le = (Z = o.tableConfig) == null ? void 0 : Z.toolbar) == null ? void 0 : le.export) != null && Xe.isAuth, A;
    }
    function G(A) {
      if (!A)
        return {};
      const Z = {};
      return Object.keys(A).map((le) => {
        A[le] !== void 0 && A[le] !== null && A[le] !== "" && (Z[le] = A[le]);
      }), Z;
    }
    function X(A) {
      k.current = 1, k.size = A, je(!0);
    }
    function ee(A) {
      k.current !== A && (k.current = A, je(!1));
    }
    function q(A, Z) {
      let le = [];
      A && A.length > 0 && A.map((Xe, ut) => {
        P.push([...Z, ut]), le = Xe[ge.children], le && le.length > 0 && q(le, [ut]);
      });
    }
    async function je(A) {
      var Xe, ut, Ve, ct, St, hn;
      if (!o.tableConfig.fetch)
        return te.value = 2, !1;
      if (te.value === 1 || Y.value)
        return !1;
      te.value = 1, Y.value = !0, K.splice(0, K.length), A && (k.current = 1);
      let Z = await De();
      (Ve = (ut = (Xe = o.tableConfig) == null ? void 0 : Xe.toolbar) == null ? void 0 : ut.formConfig) != null && Ve.beforeRequest && (Z = ((hn = (St = (ct = o.tableConfig) == null ? void 0 : ct.toolbar) == null ? void 0 : St.formConfig) == null ? void 0 : hn.beforeRequest(JSON.parse(JSON.stringify(Z)))) || Z);
      const le = await o.tableConfig.fetch(Z);
      try {
        o.isPager ? (k.total = (le == null ? void 0 : le.total) * 1 || 0, k.current = (le == null ? void 0 : le.current) || 1, K.push(...(le == null ? void 0 : le.records) || null)) : K.push(...(le == null ? void 0 : le.records) || le || null), o.type === "expand" && (P.splice(0, P.length), q(K, [])), E.value = !1, Xt(() => {
          it();
        });
      } catch (Ht) {
        console.log("error: ", Ht);
      }
      te.value = 2, Y.value = !1;
    }
    function it() {
      K && K.length > 0 && o.type === "selection" && K.map((A) => {
        m.value.toggleRowSelection(
          A,
          w.some((Z) => Z[o.rowKey] === A[o.rowKey])
        );
      });
    }
    async function rt(A = !1) {
      return await je(!0), !A && o.tableConfig.tabConf && o.tableConfig.tabConf.fetch && (d.value = await o.tableConfig.tabConf.fetch(Object.assign({}, await De(), o.tableConfig.tabConf.queryMap)), b.value = !1), K;
    }
    function Gt() {
      Q.value = Dt.cloneDeep(z.value.getData()), rt();
    }
    function Gn() {
      var A;
      (A = z.value) == null || A.initCol();
    }
    return He(
      () => o.modelValue,
      (A) => {
        o.tableConfig.fetch || JSON.parse(JSON.stringify(A)) !== JSON.parse(JSON.stringify(K)) && (te.value = 2, K.splice(0, K.length, ...A || []));
      },
      { deep: !0 }
    ), He(
      () => o.selectList,
      (A) => {
        w.splice(0, w.length, ...A), it();
      },
      { deep: !0 }
    ), cn(() => {
      rt();
    }), s({ reload: rt, tableData: K, changeSelect: J, resetSelect: ae, initCol: Gn }), (A, Z) => {
      var Zn, rn;
      const le = F("el-icon"), Xe = F("el-radio-button"), ut = F("el-radio-group"), Ve = F("el-table-column"), ct = F("el-empty"), St = F("el-table"), hn = F("el-pagination"), Ht = lj("loading");
      return _(), V("div", ID, [
        Object.keys(((Zn = A.tableConfig) == null ? void 0 : Zn.toolbar) || {}).length || A.tableConfig.tbName ? (_(), R(hD, {
          key: 0,
          ref_key: "tableHeaderRef",
          ref: z,
          modelValue: zt(B),
          "onUpdate:modelValue": Z[0] || (Z[0] = (ze) => rj(B) ? B.value = ze : B = ze),
          tbName: A.tableConfig.tbName,
          column: A.tableConfig.column,
          size: zt(x),
          isShowRefresh: A.isShowRefresh,
          loading: Y.value,
          toolbar: A.tableConfig.toolbar,
          isDialog: A.isDialog,
          onQuery: Gt
        }, null, 8, ["modelValue", "tbName", "column", "size", "isShowRefresh", "loading", "toolbar", "isDialog"])) : Me("", !0),
        A.tableConfig.tabConf ? (_(), V("div", wD, [
          ie(ut, {
            modelValue: N.value,
            "onUpdate:modelValue": Z[1] || (Z[1] = (ze) => N.value = ze),
            size: "default",
            onChange: vt
          }, {
            default: U(() => {
              var ze;
              return [
                (_(!0), V(Ye, null, we((ze = A.tableConfig.tabConf) == null ? void 0 : ze.tabs, (et, Nt) => (_(), R(Xe, {
                  key: Nt,
                  label: et.value,
                  loading: !0
                }, {
                  default: U(() => [
                    Be(Ce(et.label) + " ", 1),
                    b.value ? (_(), R(le, {
                      key: 0,
                      class: "is-loading"
                    }, {
                      default: U(() => [
                        ie(zt(Cz))
                      ]),
                      _: 1
                    })) : (_(), V(Ye, { key: 1 }, [
                      Be(Ce(M.value(et)), 1)
                    ], 64))
                  ]),
                  _: 2
                }, 1032, ["label"]))), 128))
              ];
            }),
            _: 1
          }, 8, ["modelValue"])
        ])) : Me("", !0),
        uj((_(), V("div", AD, [
          A.isDIYMain ? $e(A.$slots, "main", {
            key: 0,
            tableData: K
          }) : (_(), R(St, ne({
            key: 1,
            ref_key: "elPlusTableRef",
            ref: m,
            style: { width: "100%" },
            height: "100%",
            maxHeight: A.tableConfig.maxHeight || "auto"
          }, A.tableConfig.tableAttr, {
            data: K,
            "row-key": A.rowKey,
            lazy: "",
            load: tn,
            size: zt(x),
            "row-class-name": nn,
            onSelect: dt,
            onSelectAll: Wt,
            onExpandChange: I,
            treeProps: zt(ge)
          }), en({
            default: U(() => [
              A.type === "selection" ? (_(), R(Ve, {
                key: 0,
                type: "selection",
                width: "55px",
                selectable: (ze, et) => {
                  var Nt, Qe;
                  return ((Qe = (Nt = A.tableConfig) == null ? void 0 : Nt.tableAttr) == null ? void 0 : Qe.selectable(ze, et)) ?? !0;
                },
                "header-align": "center",
                align: "center"
              }, null, 8, ["selectable"])) : Me("", !0),
              A.isIndex ? (_(), R(Ve, {
                key: 1,
                type: "index",
                width: "60",
                label: "序号"
              })) : Me("", !0),
              Mn().firstColumn ? $e(A.$slots, "firstColumn", { key: 2 }) : Me("", !0),
              (_(!0), V(Ye, null, we(me, (ze, et) => {
                var Nt;
                return _(), V(Ye, {
                  key: ze.prop + ze.label + et
                }, [
                  ze.children && ze.children.length > 0 ? (_(), V(Ye, { key: 0 }, [
                    (Nt = Ue.value[et]) != null && Nt.some((Qe) => Qe) ? (_(), R(Ve, {
                      key: 0,
                      prop: ze.label,
                      label: ze.label,
                      "header-align": "center"
                    }, {
                      default: U(() => [
                        (_(!0), V(Ye, null, we(ze.children, (Qe, un) => (_(), V(Ye, {
                          key: Qe.label + et + un
                        }, [
                          Ue.value[et][un] ? (_(), R(Ve, ne({
                            key: 0,
                            prop: Qe.prop
                          }, Qe), {
                            header: U(() => [
                              Ie("div", {
                                class: bn({ "th-required": Qe.required })
                              }, Ce(Qe.label), 3)
                            ]),
                            default: U((Yn) => [
                              $e(A.$slots, "default"),
                              Yn.$index >= 0 ? (_(), R(mi, {
                                key: 0,
                                field: Qe.prop,
                                desc: Qe,
                                scope: Yn,
                                size: zt(x),
                                modelValue: Yn.row[Qe.prop],
                                "onUpdate:modelValue": (al) => Yn.row[Qe.prop] = al
                              }, null, 8, ["field", "desc", "scope", "size", "modelValue", "onUpdate:modelValue"])) : Me("", !0)
                            ]),
                            _: 2
                          }, 1040, ["prop"])) : Me("", !0)
                        ], 64))), 128))
                      ]),
                      _: 2
                    }, 1032, ["prop", "label"])) : Me("", !0)
                  ], 64)) : (_(), V(Ye, { key: 1 }, [
                    Ue.value[et] ? (_(), R(Ve, ne({
                      key: 0,
                      prop: ze.prop
                    }, ze), {
                      header: U(({ column: Qe }) => [
                        Ie("div", {
                          class: bn({ "th-required": ze.required }),
                          style: yt(ze.hstyle)
                        }, Ce(Qe.label), 7)
                      ]),
                      default: U((Qe) => [
                        Qe.$index >= 0 ? (_(), R(mi, {
                          key: 0,
                          field: ze.prop,
                          desc: ze,
                          scope: Qe,
                          size: zt(x),
                          modelValue: Qe.row[ze.prop],
                          "onUpdate:modelValue": (un) => Qe.row[ze.prop] = un
                        }, null, 8, ["field", "desc", "scope", "size", "modelValue", "onUpdate:modelValue"])) : Me("", !0)
                      ]),
                      _: 2
                    }, 1040, ["prop"])) : Me("", !0)
                  ], 64))
                ], 64);
              }), 128))
            ]),
            _: 2
          }, [
            !Y.value && te.value === 2 ? {
              name: "empty",
              fn: U(() => [
                A.isEmptyImg ? (_(), R(ct, {
                  key: 0,
                  description: A.nullText
                }, null, 8, ["description"])) : (_(), V("span", TD, Ce(A.nullText), 1))
              ]),
              key: "0"
            } : void 0,
            (rn = A.tableConfig.summaryConf) != null && rn.prop ? {
              name: "append",
              fn: U(() => {
                var ze;
                return [
                  Ke.value && Ke.value.length > 0 ? (_(), V("div", {
                    key: 0,
                    style: yt((ze = A.tableConfig.summaryConf) == null ? void 0 : ze.hstyle),
                    class: "summary-row"
                  }, [
                    (_(!0), V(Ye, null, we(Ke.value, (et, Nt) => (_(), V("div", {
                      class: "summary-item",
                      key: Nt
                    }, [
                      Ie("span", null, Ce(et.label || "合计") + ":", 1),
                      Ie("p", null, Ce(et.value || 0), 1)
                    ]))), 128))
                  ], 4)) : Me("", !0)
                ];
              }),
              key: "1"
            } : void 0
          ]), 1040, ["maxHeight", "data", "row-key", "size", "treeProps"]))
        ])), [
          [Ht, Y.value]
        ]),
        A.isPager || A.tableConfig.statistic ? (_(), V("div", LD, [
          ie(hn, {
            class: "page-info",
            small: "",
            onSizeChange: X,
            onCurrentChange: ee,
            "current-page": +k.current,
            "page-sizes": [5, 10, 20, 50, 100],
            "page-size": k.size,
            layout: "total, sizes, prev, pager, next, jumper",
            total: k.total
          }, null, 8, ["current-page", "page-size", "total"])
        ])) : Me("", !0),
        $e(A.$slots, "bottom")
      ]);
    };
  }
});
const Il = {
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
}, OD = {
  install: (f, s, r, o) => {
    Da(Il, s), Il.debug && console.log("initConfig: ", Il), f.provide("format", r), f.provide("globalData", o), f.provide("defaultConf", Il), il.unshift(Bu), il.unshift(rD), il.unshift(iD), il.push(ED), Il.debug && console.log("components: ", il), il.map((D) => {
      f.component(D.name, D);
    });
  }
};
function Da(f, s) {
  let r;
  for (r in s)
    f[r] = f[r] && f[r].toString() === "[object Object]" ? Da(f[r], s[r]) : f[r] = s[r];
  return f;
}
export {
  OD as default
};
