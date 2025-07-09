var Yu = Object.defineProperty;
var Ju = (t, e, n) => e in t ? Yu(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var vt = (t, e, n) => Ju(t, typeof e != "symbol" ? e + "" : e, n);
/**
* @vue/shared v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function os(t, e) {
  const n = new Set(t.split(","));
  return (r) => n.has(r);
}
const Nt = {}, vn = [], fe = () => {
}, Qu = () => !1, ri = (t) => t.charCodeAt(0) === 111 && t.charCodeAt(1) === 110 && // uppercase letter
(t.charCodeAt(2) > 122 || t.charCodeAt(2) < 97), ls = (t) => t.startsWith("onUpdate:"), Ot = Object.assign, us = (t, e) => {
  const n = t.indexOf(e);
  n > -1 && t.splice(n, 1);
}, Zu = Object.prototype.hasOwnProperty, dt = (t, e) => Zu.call(t, e), lt = Array.isArray, bn = (t) => ii(t) === "[object Map]", il = (t) => ii(t) === "[object Set]", ct = (t) => typeof t == "function", $t = (t) => typeof t == "string", Ln = (t) => typeof t == "symbol", Ct = (t) => t !== null && typeof t == "object", sl = (t) => (Ct(t) || ct(t)) && ct(t.then) && ct(t.catch), ol = Object.prototype.toString, ii = (t) => ol.call(t), ta = (t) => ii(t).slice(8, -1), ll = (t) => ii(t) === "[object Object]", as = (t) => $t(t) && t !== "NaN" && t[0] !== "-" && "" + parseInt(t, 10) === t, zn = /* @__PURE__ */ os(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), si = (t) => {
  const e = /* @__PURE__ */ Object.create(null);
  return (n) => e[n] || (e[n] = t(n));
}, ea = /-(\w)/g, Re = si((t) => t.replace(ea, (e, n) => n ? n.toUpperCase() : "")), na = /\B([A-Z])/g, ge = si(
  (t) => t.replace(na, "-$1").toLowerCase()
), ul = si((t) => t.charAt(0).toUpperCase() + t.slice(1)), vi = si((t) => t ? `on${ul(t)}` : ""), Xe = (t, e) => !Object.is(t, e), bi = (t, e) => {
  for (let n = 0; n < t.length; n++)
    t[n](e);
}, Br = (t, e, n) => {
  Object.defineProperty(t, e, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
}, ra = (t) => {
  const e = parseFloat(t);
  return isNaN(e) ? t : e;
}, qs = (t) => {
  const e = $t(t) ? Number(t) : NaN;
  return isNaN(e) ? t : e;
};
let Us;
const al = () => Us || (Us = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function cs(t) {
  if (lt(t)) {
    const e = {};
    for (let n = 0; n < t.length; n++) {
      const r = t[n], i = $t(r) ? la(r) : cs(r);
      if (i)
        for (const s in i)
          e[s] = i[s];
    }
    return e;
  } else if ($t(t) || Ct(t))
    return t;
}
const ia = /;(?![^(]*\))/g, sa = /:([^]+)/, oa = /\/\*[^]*?\*\//g;
function la(t) {
  const e = {};
  return t.replace(oa, "").split(ia).forEach((n) => {
    if (n) {
      const r = n.split(sa);
      r.length > 1 && (e[r[0].trim()] = r[1].trim());
    }
  }), e;
}
function fs(t) {
  let e = "";
  if ($t(t))
    e = t;
  else if (lt(t))
    for (let n = 0; n < t.length; n++) {
      const r = fs(t[n]);
      r && (e += r + " ");
    }
  else if (Ct(t))
    for (const n in t)
      t[n] && (e += n + " ");
  return e.trim();
}
const ua = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", aa = /* @__PURE__ */ os(ua);
function cl(t) {
  return !!t || t === "";
}
const Ae = (t) => $t(t) ? t : t == null ? "" : lt(t) || Ct(t) && (t.toString === ol || !ct(t.toString)) ? JSON.stringify(t, fl, 2) : String(t), fl = (t, e) => e && e.__v_isRef ? fl(t, e.value) : bn(e) ? {
  [`Map(${e.size})`]: [...e.entries()].reduce(
    (n, [r, i], s) => (n[xi(r, s) + " =>"] = i, n),
    {}
  )
} : il(e) ? {
  [`Set(${e.size})`]: [...e.values()].map((n) => xi(n))
} : Ln(e) ? xi(e) : Ct(e) && !lt(e) && !ll(e) ? String(e) : e, xi = (t, e = "") => {
  var n;
  return Ln(t) ? `Symbol(${(n = t.description) != null ? n : e})` : t;
};
/**
* @vue/reactivity v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let he;
class ca {
  constructor(e = !1) {
    this.detached = e, this._active = !0, this.effects = [], this.cleanups = [], this.parent = he, !e && he && (this.index = (he.scopes || (he.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  run(e) {
    if (this._active) {
      const n = he;
      try {
        return he = this, e();
      } finally {
        he = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    he = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    he = this.parent;
  }
  stop(e) {
    if (this._active) {
      let n, r;
      for (n = 0, r = this.effects.length; n < r; n++)
        this.effects[n].stop();
      for (n = 0, r = this.cleanups.length; n < r; n++)
        this.cleanups[n]();
      if (this.scopes)
        for (n = 0, r = this.scopes.length; n < r; n++)
          this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !e) {
        const i = this.parent.scopes.pop();
        i && i !== this && (this.parent.scopes[this.index] = i, i.index = this.index);
      }
      this.parent = void 0, this._active = !1;
    }
  }
}
function fa(t, e = he) {
  e && e.active && e.effects.push(t);
}
function ha() {
  return he;
}
let un;
class hs {
  constructor(e, n, r, i) {
    this.fn = e, this.trigger = n, this.scheduler = r, this.active = !0, this.deps = [], this._dirtyLevel = 4, this._trackId = 0, this._runnings = 0, this._shouldSchedule = !1, this._depsLength = 0, fa(this, i);
  }
  get dirty() {
    if (this._dirtyLevel === 2 || this._dirtyLevel === 3) {
      this._dirtyLevel = 1, dn();
      for (let e = 0; e < this._depsLength; e++) {
        const n = this.deps[e];
        if (n.computed && (da(n.computed), this._dirtyLevel >= 4))
          break;
      }
      this._dirtyLevel === 1 && (this._dirtyLevel = 0), pn();
    }
    return this._dirtyLevel >= 4;
  }
  set dirty(e) {
    this._dirtyLevel = e ? 4 : 0;
  }
  run() {
    if (this._dirtyLevel = 0, !this.active)
      return this.fn();
    let e = We, n = un;
    try {
      return We = !0, un = this, this._runnings++, Ws(this), this.fn();
    } finally {
      Ks(this), this._runnings--, un = n, We = e;
    }
  }
  stop() {
    var e;
    this.active && (Ws(this), Ks(this), (e = this.onStop) == null || e.call(this), this.active = !1);
  }
}
function da(t) {
  return t.value;
}
function Ws(t) {
  t._trackId++, t._depsLength = 0;
}
function Ks(t) {
  if (t.deps.length > t._depsLength) {
    for (let e = t._depsLength; e < t.deps.length; e++)
      hl(t.deps[e], t);
    t.deps.length = t._depsLength;
  }
}
function hl(t, e) {
  const n = t.get(e);
  n !== void 0 && e._trackId !== n && (t.delete(e), t.size === 0 && t.cleanup());
}
let We = !0, Ai = 0;
const dl = [];
function dn() {
  dl.push(We), We = !1;
}
function pn() {
  const t = dl.pop();
  We = t === void 0 ? !0 : t;
}
function ds() {
  Ai++;
}
function ps() {
  for (Ai--; !Ai && Fi.length; )
    Fi.shift()();
}
function pl(t, e, n) {
  if (e.get(t) !== t._trackId) {
    e.set(t, t._trackId);
    const r = t.deps[t._depsLength];
    r !== e ? (r && hl(r, t), t.deps[t._depsLength++] = e) : t._depsLength++;
  }
}
const Fi = [];
function gl(t, e, n) {
  ds();
  for (const r of t.keys()) {
    let i;
    r._dirtyLevel < e && (i ?? (i = t.get(r) === r._trackId)) && (r._shouldSchedule || (r._shouldSchedule = r._dirtyLevel === 0), r._dirtyLevel = e), r._shouldSchedule && (i ?? (i = t.get(r) === r._trackId)) && (r.trigger(), (!r._runnings || r.allowRecurse) && r._dirtyLevel !== 2 && (r._shouldSchedule = !1, r.scheduler && Fi.push(r.scheduler)));
  }
  ps();
}
const ml = (t, e) => {
  const n = /* @__PURE__ */ new Map();
  return n.cleanup = t, n.computed = e, n;
}, ji = /* @__PURE__ */ new WeakMap(), an = Symbol(""), Bi = Symbol("");
function ee(t, e, n) {
  if (We && un) {
    let r = ji.get(t);
    r || ji.set(t, r = /* @__PURE__ */ new Map());
    let i = r.get(n);
    i || r.set(n, i = ml(() => r.delete(n))), pl(
      un,
      i
    );
  }
}
function Ie(t, e, n, r, i, s) {
  const o = ji.get(t);
  if (!o)
    return;
  let l = [];
  if (e === "clear")
    l = [...o.values()];
  else if (n === "length" && lt(t)) {
    const u = Number(r);
    o.forEach((c, a) => {
      (a === "length" || !Ln(a) && a >= u) && l.push(c);
    });
  } else
    switch (n !== void 0 && l.push(o.get(n)), e) {
      case "add":
        lt(t) ? as(n) && l.push(o.get("length")) : (l.push(o.get(an)), bn(t) && l.push(o.get(Bi)));
        break;
      case "delete":
        lt(t) || (l.push(o.get(an)), bn(t) && l.push(o.get(Bi)));
        break;
      case "set":
        bn(t) && l.push(o.get(an));
        break;
    }
  ds();
  for (const u of l)
    u && gl(
      u,
      4
    );
  ps();
}
const pa = /* @__PURE__ */ os("__proto__,__v_isRef,__isVue"), wl = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((t) => t !== "arguments" && t !== "caller").map((t) => Symbol[t]).filter(Ln)
), Xs = /* @__PURE__ */ ga();
function ga() {
  const t = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((e) => {
    t[e] = function(...n) {
      const r = mt(this);
      for (let s = 0, o = this.length; s < o; s++)
        ee(r, "get", s + "");
      const i = r[e](...n);
      return i === -1 || i === !1 ? r[e](...n.map(mt)) : i;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((e) => {
    t[e] = function(...n) {
      dn(), ds();
      const r = mt(this)[e].apply(this, n);
      return ps(), pn(), r;
    };
  }), t;
}
function ma(t) {
  const e = mt(this);
  return ee(e, "has", t), e.hasOwnProperty(t);
}
class yl {
  constructor(e = !1, n = !1) {
    this._isReadonly = e, this._isShallow = n;
  }
  get(e, n, r) {
    const i = this._isReadonly, s = this._isShallow;
    if (n === "__v_isReactive")
      return !i;
    if (n === "__v_isReadonly")
      return i;
    if (n === "__v_isShallow")
      return s;
    if (n === "__v_raw")
      return r === (i ? s ? Na : xl : s ? bl : vl).get(e) || // receiver is not the reactive proxy, but has the same prototype
      // this means the reciever is a user proxy of the reactive proxy
      Object.getPrototypeOf(e) === Object.getPrototypeOf(r) ? e : void 0;
    const o = lt(e);
    if (!i) {
      if (o && dt(Xs, n))
        return Reflect.get(Xs, n, r);
      if (n === "hasOwnProperty")
        return ma;
    }
    const l = Reflect.get(e, n, r);
    return (Ln(n) ? wl.has(n) : pa(n)) || (i || ee(e, "get", n), s) ? l : ne(l) ? o && as(n) ? l : l.value : Ct(l) ? i ? El(l) : li(l) : l;
  }
}
class _l extends yl {
  constructor(e = !1) {
    super(!1, e);
  }
  set(e, n, r, i) {
    let s = e[n];
    if (!this._isShallow) {
      const u = Sn(s);
      if (!Vr(r) && !Sn(r) && (s = mt(s), r = mt(r)), !lt(e) && ne(s) && !ne(r))
        return u ? !1 : (s.value = r, !0);
    }
    const o = lt(e) && as(n) ? Number(n) < e.length : dt(e, n), l = Reflect.set(e, n, r, i);
    return e === mt(i) && (o ? Xe(r, s) && Ie(e, "set", n, r) : Ie(e, "add", n, r)), l;
  }
  deleteProperty(e, n) {
    const r = dt(e, n);
    e[n];
    const i = Reflect.deleteProperty(e, n);
    return i && r && Ie(e, "delete", n, void 0), i;
  }
  has(e, n) {
    const r = Reflect.has(e, n);
    return (!Ln(n) || !wl.has(n)) && ee(e, "has", n), r;
  }
  ownKeys(e) {
    return ee(
      e,
      "iterate",
      lt(e) ? "length" : an
    ), Reflect.ownKeys(e);
  }
}
class wa extends yl {
  constructor(e = !1) {
    super(!0, e);
  }
  set(e, n) {
    return !0;
  }
  deleteProperty(e, n) {
    return !0;
  }
}
const ya = /* @__PURE__ */ new _l(), _a = /* @__PURE__ */ new wa(), va = /* @__PURE__ */ new _l(
  !0
), gs = (t) => t, oi = (t) => Reflect.getPrototypeOf(t);
function hr(t, e, n = !1, r = !1) {
  t = t.__v_raw;
  const i = mt(t), s = mt(e);
  n || (Xe(e, s) && ee(i, "get", e), ee(i, "get", s));
  const { has: o } = oi(i), l = r ? gs : n ? ys : Wn;
  if (o.call(i, e))
    return l(t.get(e));
  if (o.call(i, s))
    return l(t.get(s));
  t !== i && t.get(e);
}
function dr(t, e = !1) {
  const n = this.__v_raw, r = mt(n), i = mt(t);
  return e || (Xe(t, i) && ee(r, "has", t), ee(r, "has", i)), t === i ? n.has(t) : n.has(t) || n.has(i);
}
function pr(t, e = !1) {
  return t = t.__v_raw, !e && ee(mt(t), "iterate", an), Reflect.get(t, "size", t);
}
function Ys(t) {
  t = mt(t);
  const e = mt(this);
  return oi(e).has.call(e, t) || (e.add(t), Ie(e, "add", t, t)), this;
}
function Js(t, e) {
  e = mt(e);
  const n = mt(this), { has: r, get: i } = oi(n);
  let s = r.call(n, t);
  s || (t = mt(t), s = r.call(n, t));
  const o = i.call(n, t);
  return n.set(t, e), s ? Xe(e, o) && Ie(n, "set", t, e) : Ie(n, "add", t, e), this;
}
function Qs(t) {
  const e = mt(this), { has: n, get: r } = oi(e);
  let i = n.call(e, t);
  i || (t = mt(t), i = n.call(e, t)), r && r.call(e, t);
  const s = e.delete(t);
  return i && Ie(e, "delete", t, void 0), s;
}
function Zs() {
  const t = mt(this), e = t.size !== 0, n = t.clear();
  return e && Ie(t, "clear", void 0, void 0), n;
}
function gr(t, e) {
  return function(r, i) {
    const s = this, o = s.__v_raw, l = mt(o), u = e ? gs : t ? ys : Wn;
    return !t && ee(l, "iterate", an), o.forEach((c, a) => r.call(i, u(c), u(a), s));
  };
}
function mr(t, e, n) {
  return function(...r) {
    const i = this.__v_raw, s = mt(i), o = bn(s), l = t === "entries" || t === Symbol.iterator && o, u = t === "keys" && o, c = i[t](...r), a = n ? gs : e ? ys : Wn;
    return !e && ee(
      s,
      "iterate",
      u ? Bi : an
    ), {
      // iterator protocol
      next() {
        const { value: f, done: h } = c.next();
        return h ? { value: f, done: h } : {
          value: l ? [a(f[0]), a(f[1])] : a(f),
          done: h
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function Fe(t) {
  return function(...e) {
    return t === "delete" ? !1 : t === "clear" ? void 0 : this;
  };
}
function ba() {
  const t = {
    get(s) {
      return hr(this, s);
    },
    get size() {
      return pr(this);
    },
    has: dr,
    add: Ys,
    set: Js,
    delete: Qs,
    clear: Zs,
    forEach: gr(!1, !1)
  }, e = {
    get(s) {
      return hr(this, s, !1, !0);
    },
    get size() {
      return pr(this);
    },
    has: dr,
    add: Ys,
    set: Js,
    delete: Qs,
    clear: Zs,
    forEach: gr(!1, !0)
  }, n = {
    get(s) {
      return hr(this, s, !0);
    },
    get size() {
      return pr(this, !0);
    },
    has(s) {
      return dr.call(this, s, !0);
    },
    add: Fe("add"),
    set: Fe("set"),
    delete: Fe("delete"),
    clear: Fe("clear"),
    forEach: gr(!0, !1)
  }, r = {
    get(s) {
      return hr(this, s, !0, !0);
    },
    get size() {
      return pr(this, !0);
    },
    has(s) {
      return dr.call(this, s, !0);
    },
    add: Fe("add"),
    set: Fe("set"),
    delete: Fe("delete"),
    clear: Fe("clear"),
    forEach: gr(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((s) => {
    t[s] = mr(
      s,
      !1,
      !1
    ), n[s] = mr(
      s,
      !0,
      !1
    ), e[s] = mr(
      s,
      !1,
      !0
    ), r[s] = mr(
      s,
      !0,
      !0
    );
  }), [
    t,
    n,
    e,
    r
  ];
}
const [
  xa,
  Ea,
  Pa,
  ka
] = /* @__PURE__ */ ba();
function ms(t, e) {
  const n = e ? t ? ka : Pa : t ? Ea : xa;
  return (r, i, s) => i === "__v_isReactive" ? !t : i === "__v_isReadonly" ? t : i === "__v_raw" ? r : Reflect.get(
    dt(n, i) && i in r ? n : r,
    i,
    s
  );
}
const Ma = {
  get: /* @__PURE__ */ ms(!1, !1)
}, Sa = {
  get: /* @__PURE__ */ ms(!1, !0)
}, Ta = {
  get: /* @__PURE__ */ ms(!0, !1)
}, vl = /* @__PURE__ */ new WeakMap(), bl = /* @__PURE__ */ new WeakMap(), xl = /* @__PURE__ */ new WeakMap(), Na = /* @__PURE__ */ new WeakMap();
function Ca(t) {
  switch (t) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function La(t) {
  return t.__v_skip || !Object.isExtensible(t) ? 0 : Ca(ta(t));
}
function li(t) {
  return Sn(t) ? t : ws(
    t,
    !1,
    ya,
    Ma,
    vl
  );
}
function Ra(t) {
  return ws(
    t,
    !1,
    va,
    Sa,
    bl
  );
}
function El(t) {
  return ws(
    t,
    !0,
    _a,
    Ta,
    xl
  );
}
function ws(t, e, n, r, i) {
  if (!Ct(t) || t.__v_raw && !(e && t.__v_isReactive))
    return t;
  const s = i.get(t);
  if (s)
    return s;
  const o = La(t);
  if (o === 0)
    return t;
  const l = new Proxy(
    t,
    o === 2 ? r : n
  );
  return i.set(t, l), l;
}
function xn(t) {
  return Sn(t) ? xn(t.__v_raw) : !!(t && t.__v_isReactive);
}
function Sn(t) {
  return !!(t && t.__v_isReadonly);
}
function Vr(t) {
  return !!(t && t.__v_isShallow);
}
function Pl(t) {
  return xn(t) || Sn(t);
}
function mt(t) {
  const e = t && t.__v_raw;
  return e ? mt(e) : t;
}
function kl(t) {
  return Object.isExtensible(t) && Br(t, "__v_skip", !0), t;
}
const Wn = (t) => Ct(t) ? li(t) : t, ys = (t) => Ct(t) ? El(t) : t;
class Ml {
  constructor(e, n, r, i) {
    this.getter = e, this._setter = n, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this.effect = new hs(
      () => e(this._value),
      () => Tr(
        this,
        this.effect._dirtyLevel === 2 ? 2 : 3
      )
    ), this.effect.computed = this, this.effect.active = this._cacheable = !i, this.__v_isReadonly = r;
  }
  get value() {
    const e = mt(this);
    return (!e._cacheable || e.effect.dirty) && Xe(e._value, e._value = e.effect.run()) && Tr(e, 4), Sl(e), e.effect._dirtyLevel >= 2 && Tr(e, 2), e._value;
  }
  set value(e) {
    this._setter(e);
  }
  // #region polyfill _dirty for backward compatibility third party code for Vue <= 3.3.x
  get _dirty() {
    return this.effect.dirty;
  }
  set _dirty(e) {
    this.effect.dirty = e;
  }
  // #endregion
}
function Ia(t, e, n = !1) {
  let r, i;
  const s = ct(t);
  return s ? (r = t, i = fe) : (r = t.get, i = t.set), new Ml(r, i, s || !i, n);
}
function Sl(t) {
  var e;
  We && un && (t = mt(t), pl(
    un,
    (e = t.dep) != null ? e : t.dep = ml(
      () => t.dep = void 0,
      t instanceof Ml ? t : void 0
    )
  ));
}
function Tr(t, e = 4, n) {
  t = mt(t);
  const r = t.dep;
  r && gl(
    r,
    e
  );
}
function ne(t) {
  return !!(t && t.__v_isRef === !0);
}
function to(t) {
  return Oa(t, !1);
}
function Oa(t, e) {
  return ne(t) ? t : new $a(t, e);
}
class $a {
  constructor(e, n) {
    this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? e : mt(e), this._value = n ? e : Wn(e);
  }
  get value() {
    return Sl(this), this._value;
  }
  set value(e) {
    const n = this.__v_isShallow || Vr(e) || Sn(e);
    e = n ? e : mt(e), Xe(e, this._rawValue) && (this._rawValue = e, this._value = n ? e : Wn(e), Tr(this, 4));
  }
}
function zr(t) {
  return ne(t) ? t.value : t;
}
const Aa = {
  get: (t, e, n) => zr(Reflect.get(t, e, n)),
  set: (t, e, n, r) => {
    const i = t[e];
    return ne(i) && !ne(n) ? (i.value = n, !0) : Reflect.set(t, e, n, r);
  }
};
function Tl(t) {
  return xn(t) ? t : new Proxy(t, Aa);
}
/**
* @vue/runtime-core v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function Ke(t, e, n, r) {
  try {
    return r ? t(...r) : t();
  } catch (i) {
    ui(i, e, n);
  }
}
function ye(t, e, n, r) {
  if (ct(t)) {
    const s = Ke(t, e, n, r);
    return s && sl(s) && s.catch((o) => {
      ui(o, e, n);
    }), s;
  }
  const i = [];
  for (let s = 0; s < t.length; s++)
    i.push(ye(t[s], e, n, r));
  return i;
}
function ui(t, e, n, r = !0) {
  const i = e ? e.vnode : null;
  if (e) {
    let s = e.parent;
    const o = e.proxy, l = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; s; ) {
      const c = s.ec;
      if (c) {
        for (let a = 0; a < c.length; a++)
          if (c[a](t, o, l) === !1)
            return;
      }
      s = s.parent;
    }
    const u = e.appContext.config.errorHandler;
    if (u) {
      Ke(
        u,
        null,
        10,
        [t, o, l]
      );
      return;
    }
  }
  Fa(t, n, i, r);
}
function Fa(t, e, n, r = !0) {
  console.error(t);
}
let Kn = !1, Vi = !1;
const Ft = [];
let ke = 0;
const En = [];
let De = null, sn = 0;
const Nl = /* @__PURE__ */ Promise.resolve();
let _s = null;
function Cl(t) {
  const e = _s || Nl;
  return t ? e.then(this ? t.bind(this) : t) : e;
}
function ja(t) {
  let e = ke + 1, n = Ft.length;
  for (; e < n; ) {
    const r = e + n >>> 1, i = Ft[r], s = Xn(i);
    s < t || s === t && i.pre ? e = r + 1 : n = r;
  }
  return e;
}
function vs(t) {
  (!Ft.length || !Ft.includes(
    t,
    Kn && t.allowRecurse ? ke + 1 : ke
  )) && (t.id == null ? Ft.push(t) : Ft.splice(ja(t.id), 0, t), Ll());
}
function Ll() {
  !Kn && !Vi && (Vi = !0, _s = Nl.then(Il));
}
function Ba(t) {
  const e = Ft.indexOf(t);
  e > ke && Ft.splice(e, 1);
}
function Va(t) {
  lt(t) ? En.push(...t) : (!De || !De.includes(
    t,
    t.allowRecurse ? sn + 1 : sn
  )) && En.push(t), Ll();
}
function eo(t, e, n = Kn ? ke + 1 : 0) {
  for (; n < Ft.length; n++) {
    const r = Ft[n];
    if (r && r.pre) {
      if (t && r.id !== t.uid)
        continue;
      Ft.splice(n, 1), n--, r();
    }
  }
}
function Rl(t) {
  if (En.length) {
    const e = [...new Set(En)].sort(
      (n, r) => Xn(n) - Xn(r)
    );
    if (En.length = 0, De) {
      De.push(...e);
      return;
    }
    for (De = e, sn = 0; sn < De.length; sn++)
      De[sn]();
    De = null, sn = 0;
  }
}
const Xn = (t) => t.id == null ? 1 / 0 : t.id, za = (t, e) => {
  const n = Xn(t) - Xn(e);
  if (n === 0) {
    if (t.pre && !e.pre)
      return -1;
    if (e.pre && !t.pre)
      return 1;
  }
  return n;
};
function Il(t) {
  Vi = !1, Kn = !0, Ft.sort(za);
  try {
    for (ke = 0; ke < Ft.length; ke++) {
      const e = Ft[ke];
      e && e.active !== !1 && Ke(e, null, 14);
    }
  } finally {
    ke = 0, Ft.length = 0, Rl(), Kn = !1, _s = null, (Ft.length || En.length) && Il();
  }
}
function Da(t, e, ...n) {
  if (t.isUnmounted)
    return;
  const r = t.vnode.props || Nt;
  let i = n;
  const s = e.startsWith("update:"), o = s && e.slice(7);
  if (o && o in r) {
    const a = `${o === "modelValue" ? "model" : o}Modifiers`, { number: f, trim: h } = r[a] || Nt;
    h && (i = n.map((p) => $t(p) ? p.trim() : p)), f && (i = n.map(ra));
  }
  let l, u = r[l = vi(e)] || // also try camelCase event handler (#2249)
  r[l = vi(Re(e))];
  !u && s && (u = r[l = vi(ge(e))]), u && ye(
    u,
    t,
    6,
    i
  );
  const c = r[l + "Once"];
  if (c) {
    if (!t.emitted)
      t.emitted = {};
    else if (t.emitted[l])
      return;
    t.emitted[l] = !0, ye(
      c,
      t,
      6,
      i
    );
  }
}
function Ol(t, e, n = !1) {
  const r = e.emitsCache, i = r.get(t);
  if (i !== void 0)
    return i;
  const s = t.emits;
  let o = {}, l = !1;
  if (!ct(t)) {
    const u = (c) => {
      const a = Ol(c, e, !0);
      a && (l = !0, Ot(o, a));
    };
    !n && e.mixins.length && e.mixins.forEach(u), t.extends && u(t.extends), t.mixins && t.mixins.forEach(u);
  }
  return !s && !l ? (Ct(t) && r.set(t, null), null) : (lt(s) ? s.forEach((u) => o[u] = null) : Ot(o, s), Ct(t) && r.set(t, o), o);
}
function ai(t, e) {
  return !t || !ri(e) ? !1 : (e = e.slice(2).replace(/Once$/, ""), dt(t, e[0].toLowerCase() + e.slice(1)) || dt(t, ge(e)) || dt(t, e));
}
let oe = null, $l = null;
function Dr(t) {
  const e = oe;
  return oe = t, $l = t && t.type.__scopeId || null, e;
}
function Ga(t, e = oe, n) {
  if (!e || t._n)
    return t;
  const r = (...i) => {
    r._d && ho(-1);
    const s = Dr(e);
    let o;
    try {
      o = t(...i);
    } finally {
      Dr(s), r._d && ho(1);
    }
    return o;
  };
  return r._n = !0, r._c = !0, r._d = !0, r;
}
function Ei(t) {
  const {
    type: e,
    vnode: n,
    proxy: r,
    withProxy: i,
    props: s,
    propsOptions: [o],
    slots: l,
    attrs: u,
    emit: c,
    render: a,
    renderCache: f,
    data: h,
    setupState: p,
    ctx: m,
    inheritAttrs: v
  } = t;
  let w, d;
  const P = Dr(t);
  try {
    if (n.shapeFlag & 4) {
      const y = i || r, M = y;
      w = Ee(
        a.call(
          M,
          y,
          f,
          s,
          p,
          h,
          m
        )
      ), d = u;
    } else {
      const y = e;
      w = Ee(
        y.length > 1 ? y(
          s,
          { attrs: u, slots: l, emit: c }
        ) : y(
          s,
          null
          /* we know it doesn't need it */
        )
      ), d = e.props ? u : Ha(u);
    }
  } catch (y) {
    Hn.length = 0, ui(y, t, 1), w = Me(Yn);
  }
  let N = w;
  if (d && v !== !1) {
    const y = Object.keys(d), { shapeFlag: M } = N;
    y.length && M & 7 && (o && y.some(ls) && (d = qa(
      d,
      o
    )), N = Tn(N, d));
  }
  return n.dirs && (N = Tn(N), N.dirs = N.dirs ? N.dirs.concat(n.dirs) : n.dirs), n.transition && (N.transition = n.transition), w = N, Dr(P), w;
}
const Ha = (t) => {
  let e;
  for (const n in t)
    (n === "class" || n === "style" || ri(n)) && ((e || (e = {}))[n] = t[n]);
  return e;
}, qa = (t, e) => {
  const n = {};
  for (const r in t)
    (!ls(r) || !(r.slice(9) in e)) && (n[r] = t[r]);
  return n;
};
function Ua(t, e, n) {
  const { props: r, children: i, component: s } = t, { props: o, children: l, patchFlag: u } = e, c = s.emitsOptions;
  if (e.dirs || e.transition)
    return !0;
  if (n && u >= 0) {
    if (u & 1024)
      return !0;
    if (u & 16)
      return r ? no(r, o, c) : !!o;
    if (u & 8) {
      const a = e.dynamicProps;
      for (let f = 0; f < a.length; f++) {
        const h = a[f];
        if (o[h] !== r[h] && !ai(c, h))
          return !0;
      }
    }
  } else
    return (i || l) && (!l || !l.$stable) ? !0 : r === o ? !1 : r ? o ? no(r, o, c) : !0 : !!o;
  return !1;
}
function no(t, e, n) {
  const r = Object.keys(e);
  if (r.length !== Object.keys(t).length)
    return !0;
  for (let i = 0; i < r.length; i++) {
    const s = r[i];
    if (e[s] !== t[s] && !ai(n, s))
      return !0;
  }
  return !1;
}
function Wa({ vnode: t, parent: e }, n) {
  for (; e; ) {
    const r = e.subTree;
    if (r.suspense && r.suspense.activeBranch === t && (r.el = t.el), r === t)
      (t = e.vnode).el = n, e = e.parent;
    else
      break;
  }
}
const Ka = Symbol.for("v-ndc"), Xa = (t) => t.__isSuspense;
function Ya(t, e) {
  e && e.pendingBranch ? lt(t) ? e.effects.push(...t) : e.effects.push(t) : Va(t);
}
const Ja = Symbol.for("v-scx"), Qa = () => Lr(Ja), wr = {};
function Pi(t, e, n) {
  return Al(t, e, n);
}
function Al(t, e, {
  immediate: n,
  deep: r,
  flush: i,
  once: s,
  onTrack: o,
  onTrigger: l
} = Nt) {
  if (e && s) {
    const R = e;
    e = (...z) => {
      R(...z), M();
    };
  }
  const u = Gt, c = (R) => r === !0 ? R : (
    // for deep: false, only traverse root-level properties
    on(R, r === !1 ? 1 : void 0)
  );
  let a, f = !1, h = !1;
  if (ne(t) ? (a = () => t.value, f = Vr(t)) : xn(t) ? (a = () => c(t), f = !0) : lt(t) ? (h = !0, f = t.some((R) => xn(R) || Vr(R)), a = () => t.map((R) => {
    if (ne(R))
      return R.value;
    if (xn(R))
      return c(R);
    if (ct(R))
      return Ke(R, u, 2);
  })) : ct(t) ? e ? a = () => Ke(t, u, 2) : a = () => (p && p(), ye(
    t,
    u,
    3,
    [m]
  )) : a = fe, e && r) {
    const R = a;
    a = () => on(R());
  }
  let p, m = (R) => {
    p = N.onStop = () => {
      Ke(R, u, 4), p = N.onStop = void 0;
    };
  }, v;
  if (di)
    if (m = fe, e ? n && ye(e, u, 3, [
      a(),
      h ? [] : void 0,
      m
    ]) : a(), i === "sync") {
      const R = Qa();
      v = R.__watcherHandles || (R.__watcherHandles = []);
    } else
      return fe;
  let w = h ? new Array(t.length).fill(wr) : wr;
  const d = () => {
    if (!(!N.active || !N.dirty))
      if (e) {
        const R = N.run();
        (r || f || (h ? R.some((z, q) => Xe(z, w[q])) : Xe(R, w))) && (p && p(), ye(e, u, 3, [
          R,
          // pass undefined as the old value when it's changed for the first time
          w === wr ? void 0 : h && w[0] === wr ? [] : w,
          m
        ]), w = R);
      } else
        N.run();
  };
  d.allowRecurse = !!e;
  let P;
  i === "sync" ? P = d : i === "post" ? P = () => Jt(d, u && u.suspense) : (d.pre = !0, u && (d.id = u.uid), P = () => vs(d));
  const N = new hs(a, fe, P), y = ha(), M = () => {
    N.stop(), y && us(y.effects, N);
  };
  return e ? n ? d() : w = N.run() : i === "post" ? Jt(
    N.run.bind(N),
    u && u.suspense
  ) : N.run(), v && v.push(M), M;
}
function Za(t, e, n) {
  const r = this.proxy, i = $t(t) ? t.includes(".") ? Fl(r, t) : () => r[t] : t.bind(r, r);
  let s;
  ct(e) ? s = e : (s = e.handler, n = e);
  const o = ir(this), l = Al(i, s.bind(r), n);
  return o(), l;
}
function Fl(t, e) {
  const n = e.split(".");
  return () => {
    let r = t;
    for (let i = 0; i < n.length && r; i++)
      r = r[n[i]];
    return r;
  };
}
function on(t, e, n = 0, r) {
  if (!Ct(t) || t.__v_skip)
    return t;
  if (e && e > 0) {
    if (n >= e)
      return t;
    n++;
  }
  if (r = r || /* @__PURE__ */ new Set(), r.has(t))
    return t;
  if (r.add(t), ne(t))
    on(t.value, e, n, r);
  else if (lt(t))
    for (let i = 0; i < t.length; i++)
      on(t[i], e, n, r);
  else if (il(t) || bn(t))
    t.forEach((i) => {
      on(i, e, n, r);
    });
  else if (ll(t))
    for (const i in t)
      on(t[i], e, n, r);
  return t;
}
function Nr(t, e) {
  if (oe === null)
    return t;
  const n = pi(oe) || oe.proxy, r = t.dirs || (t.dirs = []);
  for (let i = 0; i < e.length; i++) {
    let [s, o, l, u = Nt] = e[i];
    s && (ct(s) && (s = {
      mounted: s,
      updated: s
    }), s.deep && on(o), r.push({
      dir: s,
      instance: n,
      value: o,
      oldValue: void 0,
      arg: l,
      modifiers: u
    }));
  }
  return t;
}
function Qe(t, e, n, r) {
  const i = t.dirs, s = e && e.dirs;
  for (let o = 0; o < i.length; o++) {
    const l = i[o];
    s && (l.oldValue = s[o].value);
    let u = l.dir[r];
    u && (dn(), ye(u, n, 8, [
      t.el,
      l,
      t,
      e
    ]), pn());
  }
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function bs(t, e) {
  return ct(t) ? (
    // #8326: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    Ot({ name: t.name }, e, { setup: t })
  ) : t;
}
const Cr = (t) => !!t.type.__asyncLoader, jl = (t) => t.type.__isKeepAlive;
function tc(t, e) {
  Bl(t, "a", e);
}
function ec(t, e) {
  Bl(t, "da", e);
}
function Bl(t, e, n = Gt) {
  const r = t.__wdc || (t.__wdc = () => {
    let i = n;
    for (; i; ) {
      if (i.isDeactivated)
        return;
      i = i.parent;
    }
    return t();
  });
  if (ci(e, r, n), n) {
    let i = n.parent;
    for (; i && i.parent; )
      jl(i.parent.vnode) && nc(r, e, n, i), i = i.parent;
  }
}
function nc(t, e, n, r) {
  const i = ci(
    e,
    t,
    r,
    !0
    /* prepend */
  );
  xs(() => {
    us(r[e], i);
  }, n);
}
function ci(t, e, n = Gt, r = !1) {
  if (n) {
    const i = n[t] || (n[t] = []), s = e.__weh || (e.__weh = (...o) => {
      if (n.isUnmounted)
        return;
      dn();
      const l = ir(n), u = ye(e, n, t, o);
      return l(), pn(), u;
    });
    return r ? i.unshift(s) : i.push(s), s;
  }
}
const $e = (t) => (e, n = Gt) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!di || t === "sp") && ci(t, (...r) => e(...r), n)
), Vl = $e("bm"), zl = $e("m"), rc = $e("bu"), ic = $e("u"), sc = $e("bum"), xs = $e("um"), oc = $e("sp"), lc = $e(
  "rtg"
), uc = $e(
  "rtc"
);
function ac(t, e = Gt) {
  ci("ec", t, e);
}
function ro(t, e, n, r) {
  let i;
  const s = n;
  if (lt(t) || $t(t)) {
    i = new Array(t.length);
    for (let o = 0, l = t.length; o < l; o++)
      i[o] = e(t[o], o, void 0, s);
  } else if (typeof t == "number") {
    i = new Array(t);
    for (let o = 0; o < t; o++)
      i[o] = e(o + 1, o, void 0, s);
  } else if (Ct(t))
    if (t[Symbol.iterator])
      i = Array.from(
        t,
        (o, l) => e(o, l, void 0, s)
      );
    else {
      const o = Object.keys(t);
      i = new Array(o.length);
      for (let l = 0, u = o.length; l < u; l++) {
        const c = o[l];
        i[l] = e(t[c], c, l, s);
      }
    }
  else
    i = [];
  return i;
}
const zi = (t) => t ? Ql(t) ? pi(t) || t.proxy : zi(t.parent) : null, Dn = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ Ot(/* @__PURE__ */ Object.create(null), {
    $: (t) => t,
    $el: (t) => t.vnode.el,
    $data: (t) => t.data,
    $props: (t) => t.props,
    $attrs: (t) => t.attrs,
    $slots: (t) => t.slots,
    $refs: (t) => t.refs,
    $parent: (t) => zi(t.parent),
    $root: (t) => zi(t.root),
    $emit: (t) => t.emit,
    $options: (t) => Es(t),
    $forceUpdate: (t) => t.f || (t.f = () => {
      t.effect.dirty = !0, vs(t.update);
    }),
    $nextTick: (t) => t.n || (t.n = Cl.bind(t.proxy)),
    $watch: (t) => Za.bind(t)
  })
), ki = (t, e) => t !== Nt && !t.__isScriptSetup && dt(t, e), cc = {
  get({ _: t }, e) {
    const { ctx: n, setupState: r, data: i, props: s, accessCache: o, type: l, appContext: u } = t;
    let c;
    if (e[0] !== "$") {
      const p = o[e];
      if (p !== void 0)
        switch (p) {
          case 1:
            return r[e];
          case 2:
            return i[e];
          case 4:
            return n[e];
          case 3:
            return s[e];
        }
      else {
        if (ki(r, e))
          return o[e] = 1, r[e];
        if (i !== Nt && dt(i, e))
          return o[e] = 2, i[e];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (c = t.propsOptions[0]) && dt(c, e)
        )
          return o[e] = 3, s[e];
        if (n !== Nt && dt(n, e))
          return o[e] = 4, n[e];
        Di && (o[e] = 0);
      }
    }
    const a = Dn[e];
    let f, h;
    if (a)
      return e === "$attrs" && ee(t, "get", e), a(t);
    if (
      // css module (injected by vue-loader)
      (f = l.__cssModules) && (f = f[e])
    )
      return f;
    if (n !== Nt && dt(n, e))
      return o[e] = 4, n[e];
    if (
      // global properties
      h = u.config.globalProperties, dt(h, e)
    )
      return h[e];
  },
  set({ _: t }, e, n) {
    const { data: r, setupState: i, ctx: s } = t;
    return ki(i, e) ? (i[e] = n, !0) : r !== Nt && dt(r, e) ? (r[e] = n, !0) : dt(t.props, e) || e[0] === "$" && e.slice(1) in t ? !1 : (s[e] = n, !0);
  },
  has({
    _: { data: t, setupState: e, accessCache: n, ctx: r, appContext: i, propsOptions: s }
  }, o) {
    let l;
    return !!n[o] || t !== Nt && dt(t, o) || ki(e, o) || (l = s[0]) && dt(l, o) || dt(r, o) || dt(Dn, o) || dt(i.config.globalProperties, o);
  },
  defineProperty(t, e, n) {
    return n.get != null ? t._.accessCache[e] = 0 : dt(n, "value") && this.set(t, e, n.value, null), Reflect.defineProperty(t, e, n);
  }
};
function io(t) {
  return lt(t) ? t.reduce(
    (e, n) => (e[n] = null, e),
    {}
  ) : t;
}
let Di = !0;
function fc(t) {
  const e = Es(t), n = t.proxy, r = t.ctx;
  Di = !1, e.beforeCreate && so(e.beforeCreate, t, "bc");
  const {
    // state
    data: i,
    computed: s,
    methods: o,
    watch: l,
    provide: u,
    inject: c,
    // lifecycle
    created: a,
    beforeMount: f,
    mounted: h,
    beforeUpdate: p,
    updated: m,
    activated: v,
    deactivated: w,
    beforeDestroy: d,
    beforeUnmount: P,
    destroyed: N,
    unmounted: y,
    render: M,
    renderTracked: R,
    renderTriggered: z,
    errorCaptured: q,
    serverPrefetch: Z,
    // public API
    expose: V,
    inheritAttrs: J,
    // assets
    components: ut,
    directives: U,
    filters: x
  } = e;
  if (c && hc(c, r, null), o)
    for (const F in o) {
      const $ = o[F];
      ct($) && (r[F] = $.bind(n));
    }
  if (i) {
    const F = i.call(n, n);
    Ct(F) && (t.data = li(F));
  }
  if (Di = !0, s)
    for (const F in s) {
      const $ = s[F], K = ct($) ? $.bind(n, n) : ct($.get) ? $.get.bind(n, n) : fe, Y = !ct($) && ct($.set) ? $.set.bind(n) : fe, it = Wi({
        get: K,
        set: Y
      });
      Object.defineProperty(r, F, {
        enumerable: !0,
        configurable: !0,
        get: () => it.value,
        set: (st) => it.value = st
      });
    }
  if (l)
    for (const F in l)
      Dl(l[F], r, n, F);
  if (u) {
    const F = ct(u) ? u.call(n) : u;
    Reflect.ownKeys(F).forEach(($) => {
      yc($, F[$]);
    });
  }
  a && so(a, t, "c");
  function T(F, $) {
    lt($) ? $.forEach((K) => F(K.bind(n))) : $ && F($.bind(n));
  }
  if (T(Vl, f), T(zl, h), T(rc, p), T(ic, m), T(tc, v), T(ec, w), T(ac, q), T(uc, R), T(lc, z), T(sc, P), T(xs, y), T(oc, Z), lt(V))
    if (V.length) {
      const F = t.exposed || (t.exposed = {});
      V.forEach(($) => {
        Object.defineProperty(F, $, {
          get: () => n[$],
          set: (K) => n[$] = K
        });
      });
    } else t.exposed || (t.exposed = {});
  M && t.render === fe && (t.render = M), J != null && (t.inheritAttrs = J), ut && (t.components = ut), U && (t.directives = U);
}
function hc(t, e, n = fe) {
  lt(t) && (t = Gi(t));
  for (const r in t) {
    const i = t[r];
    let s;
    Ct(i) ? "default" in i ? s = Lr(
      i.from || r,
      i.default,
      !0
    ) : s = Lr(i.from || r) : s = Lr(i), ne(s) ? Object.defineProperty(e, r, {
      enumerable: !0,
      configurable: !0,
      get: () => s.value,
      set: (o) => s.value = o
    }) : e[r] = s;
  }
}
function so(t, e, n) {
  ye(
    lt(t) ? t.map((r) => r.bind(e.proxy)) : t.bind(e.proxy),
    e,
    n
  );
}
function Dl(t, e, n, r) {
  const i = r.includes(".") ? Fl(n, r) : () => n[r];
  if ($t(t)) {
    const s = e[t];
    ct(s) && Pi(i, s);
  } else if (ct(t))
    Pi(i, t.bind(n));
  else if (Ct(t))
    if (lt(t))
      t.forEach((s) => Dl(s, e, n, r));
    else {
      const s = ct(t.handler) ? t.handler.bind(n) : e[t.handler];
      ct(s) && Pi(i, s, t);
    }
}
function Es(t) {
  const e = t.type, { mixins: n, extends: r } = e, {
    mixins: i,
    optionsCache: s,
    config: { optionMergeStrategies: o }
  } = t.appContext, l = s.get(e);
  let u;
  return l ? u = l : !i.length && !n && !r ? u = e : (u = {}, i.length && i.forEach(
    (c) => Gr(u, c, o, !0)
  ), Gr(u, e, o)), Ct(e) && s.set(e, u), u;
}
function Gr(t, e, n, r = !1) {
  const { mixins: i, extends: s } = e;
  s && Gr(t, s, n, !0), i && i.forEach(
    (o) => Gr(t, o, n, !0)
  );
  for (const o in e)
    if (!(r && o === "expose")) {
      const l = dc[o] || n && n[o];
      t[o] = l ? l(t[o], e[o]) : e[o];
    }
  return t;
}
const dc = {
  data: oo,
  props: lo,
  emits: lo,
  // objects
  methods: Fn,
  computed: Fn,
  // lifecycle
  beforeCreate: Vt,
  created: Vt,
  beforeMount: Vt,
  mounted: Vt,
  beforeUpdate: Vt,
  updated: Vt,
  beforeDestroy: Vt,
  beforeUnmount: Vt,
  destroyed: Vt,
  unmounted: Vt,
  activated: Vt,
  deactivated: Vt,
  errorCaptured: Vt,
  serverPrefetch: Vt,
  // assets
  components: Fn,
  directives: Fn,
  // watch
  watch: gc,
  // provide / inject
  provide: oo,
  inject: pc
};
function oo(t, e) {
  return e ? t ? function() {
    return Ot(
      ct(t) ? t.call(this, this) : t,
      ct(e) ? e.call(this, this) : e
    );
  } : e : t;
}
function pc(t, e) {
  return Fn(Gi(t), Gi(e));
}
function Gi(t) {
  if (lt(t)) {
    const e = {};
    for (let n = 0; n < t.length; n++)
      e[t[n]] = t[n];
    return e;
  }
  return t;
}
function Vt(t, e) {
  return t ? [...new Set([].concat(t, e))] : e;
}
function Fn(t, e) {
  return t ? Ot(/* @__PURE__ */ Object.create(null), t, e) : e;
}
function lo(t, e) {
  return t ? lt(t) && lt(e) ? [.../* @__PURE__ */ new Set([...t, ...e])] : Ot(
    /* @__PURE__ */ Object.create(null),
    io(t),
    io(e ?? {})
  ) : e;
}
function gc(t, e) {
  if (!t)
    return e;
  if (!e)
    return t;
  const n = Ot(/* @__PURE__ */ Object.create(null), t);
  for (const r in e)
    n[r] = Vt(t[r], e[r]);
  return n;
}
function Gl() {
  return {
    app: null,
    config: {
      isNativeTag: Qu,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let mc = 0;
function wc(t, e) {
  return function(r, i = null) {
    ct(r) || (r = Ot({}, r)), i != null && !Ct(i) && (i = null);
    const s = Gl(), o = /* @__PURE__ */ new WeakSet();
    let l = !1;
    const u = s.app = {
      _uid: mc++,
      _component: r,
      _props: i,
      _container: null,
      _context: s,
      _instance: null,
      version: Hc,
      get config() {
        return s.config;
      },
      set config(c) {
      },
      use(c, ...a) {
        return o.has(c) || (c && ct(c.install) ? (o.add(c), c.install(u, ...a)) : ct(c) && (o.add(c), c(u, ...a))), u;
      },
      mixin(c) {
        return s.mixins.includes(c) || s.mixins.push(c), u;
      },
      component(c, a) {
        return a ? (s.components[c] = a, u) : s.components[c];
      },
      directive(c, a) {
        return a ? (s.directives[c] = a, u) : s.directives[c];
      },
      mount(c, a, f) {
        if (!l) {
          const h = Me(r, i);
          return h.appContext = s, f === !0 ? f = "svg" : f === !1 && (f = void 0), a && e ? e(h, c) : t(h, c, f), l = !0, u._container = c, c.__vue_app__ = u, pi(h.component) || h.component.proxy;
        }
      },
      unmount() {
        l && (t(null, u._container), delete u._container.__vue_app__);
      },
      provide(c, a) {
        return s.provides[c] = a, u;
      },
      runWithContext(c) {
        const a = Gn;
        Gn = u;
        try {
          return c();
        } finally {
          Gn = a;
        }
      }
    };
    return u;
  };
}
let Gn = null;
function yc(t, e) {
  if (Gt) {
    let n = Gt.provides;
    const r = Gt.parent && Gt.parent.provides;
    r === n && (n = Gt.provides = Object.create(r)), n[t] = e;
  }
}
function Lr(t, e, n = !1) {
  const r = Gt || oe;
  if (r || Gn) {
    const i = r ? r.parent == null ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : Gn._context.provides;
    if (i && t in i)
      return i[t];
    if (arguments.length > 1)
      return n && ct(e) ? e.call(r && r.proxy) : e;
  }
}
function _c(t, e, n, r = !1) {
  const i = {}, s = {};
  Br(s, hi, 1), t.propsDefaults = /* @__PURE__ */ Object.create(null), Hl(t, e, i, s);
  for (const o in t.propsOptions[0])
    o in i || (i[o] = void 0);
  n ? t.props = r ? i : Ra(i) : t.type.props ? t.props = i : t.props = s, t.attrs = s;
}
function vc(t, e, n, r) {
  const {
    props: i,
    attrs: s,
    vnode: { patchFlag: o }
  } = t, l = mt(i), [u] = t.propsOptions;
  let c = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (r || o > 0) && !(o & 16)
  ) {
    if (o & 8) {
      const a = t.vnode.dynamicProps;
      for (let f = 0; f < a.length; f++) {
        let h = a[f];
        if (ai(t.emitsOptions, h))
          continue;
        const p = e[h];
        if (u)
          if (dt(s, h))
            p !== s[h] && (s[h] = p, c = !0);
          else {
            const m = Re(h);
            i[m] = Hi(
              u,
              l,
              m,
              p,
              t,
              !1
            );
          }
        else
          p !== s[h] && (s[h] = p, c = !0);
      }
    }
  } else {
    Hl(t, e, i, s) && (c = !0);
    let a;
    for (const f in l)
      (!e || // for camelCase
      !dt(e, f) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((a = ge(f)) === f || !dt(e, a))) && (u ? n && // for camelCase
      (n[f] !== void 0 || // for kebab-case
      n[a] !== void 0) && (i[f] = Hi(
        u,
        l,
        f,
        void 0,
        t,
        !0
      )) : delete i[f]);
    if (s !== l)
      for (const f in s)
        (!e || !dt(e, f)) && (delete s[f], c = !0);
  }
  c && Ie(t, "set", "$attrs");
}
function Hl(t, e, n, r) {
  const [i, s] = t.propsOptions;
  let o = !1, l;
  if (e)
    for (let u in e) {
      if (zn(u))
        continue;
      const c = e[u];
      let a;
      i && dt(i, a = Re(u)) ? !s || !s.includes(a) ? n[a] = c : (l || (l = {}))[a] = c : ai(t.emitsOptions, u) || (!(u in r) || c !== r[u]) && (r[u] = c, o = !0);
    }
  if (s) {
    const u = mt(n), c = l || Nt;
    for (let a = 0; a < s.length; a++) {
      const f = s[a];
      n[f] = Hi(
        i,
        u,
        f,
        c[f],
        t,
        !dt(c, f)
      );
    }
  }
  return o;
}
function Hi(t, e, n, r, i, s) {
  const o = t[n];
  if (o != null) {
    const l = dt(o, "default");
    if (l && r === void 0) {
      const u = o.default;
      if (o.type !== Function && !o.skipFactory && ct(u)) {
        const { propsDefaults: c } = i;
        if (n in c)
          r = c[n];
        else {
          const a = ir(i);
          r = c[n] = u.call(
            null,
            e
          ), a();
        }
      } else
        r = u;
    }
    o[
      0
      /* shouldCast */
    ] && (s && !l ? r = !1 : o[
      1
      /* shouldCastTrue */
    ] && (r === "" || r === ge(n)) && (r = !0));
  }
  return r;
}
function ql(t, e, n = !1) {
  const r = e.propsCache, i = r.get(t);
  if (i)
    return i;
  const s = t.props, o = {}, l = [];
  let u = !1;
  if (!ct(t)) {
    const a = (f) => {
      u = !0;
      const [h, p] = ql(f, e, !0);
      Ot(o, h), p && l.push(...p);
    };
    !n && e.mixins.length && e.mixins.forEach(a), t.extends && a(t.extends), t.mixins && t.mixins.forEach(a);
  }
  if (!s && !u)
    return Ct(t) && r.set(t, vn), vn;
  if (lt(s))
    for (let a = 0; a < s.length; a++) {
      const f = Re(s[a]);
      uo(f) && (o[f] = Nt);
    }
  else if (s)
    for (const a in s) {
      const f = Re(a);
      if (uo(f)) {
        const h = s[a], p = o[f] = lt(h) || ct(h) ? { type: h } : Ot({}, h);
        if (p) {
          const m = fo(Boolean, p.type), v = fo(String, p.type);
          p[
            0
            /* shouldCast */
          ] = m > -1, p[
            1
            /* shouldCastTrue */
          ] = v < 0 || m < v, (m > -1 || dt(p, "default")) && l.push(f);
        }
      }
    }
  const c = [o, l];
  return Ct(t) && r.set(t, c), c;
}
function uo(t) {
  return t[0] !== "$" && !zn(t);
}
function ao(t) {
  return t === null ? "null" : typeof t == "function" ? t.name || "" : typeof t == "object" && t.constructor && t.constructor.name || "";
}
function co(t, e) {
  return ao(t) === ao(e);
}
function fo(t, e) {
  return lt(e) ? e.findIndex((n) => co(n, t)) : ct(e) && co(e, t) ? 0 : -1;
}
const Ul = (t) => t[0] === "_" || t === "$stable", Ps = (t) => lt(t) ? t.map(Ee) : [Ee(t)], bc = (t, e, n) => {
  if (e._n)
    return e;
  const r = Ga((...i) => Ps(e(...i)), n);
  return r._c = !1, r;
}, Wl = (t, e, n) => {
  const r = t._ctx;
  for (const i in t) {
    if (Ul(i))
      continue;
    const s = t[i];
    if (ct(s))
      e[i] = bc(i, s, r);
    else if (s != null) {
      const o = Ps(s);
      e[i] = () => o;
    }
  }
}, Kl = (t, e) => {
  const n = Ps(e);
  t.slots.default = () => n;
}, xc = (t, e) => {
  if (t.vnode.shapeFlag & 32) {
    const n = e._;
    n ? (t.slots = mt(e), Br(e, "_", n)) : Wl(
      e,
      t.slots = {}
    );
  } else
    t.slots = {}, e && Kl(t, e);
  Br(t.slots, hi, 1);
}, Ec = (t, e, n) => {
  const { vnode: r, slots: i } = t;
  let s = !0, o = Nt;
  if (r.shapeFlag & 32) {
    const l = e._;
    l ? n && l === 1 ? s = !1 : (Ot(i, e), !n && l === 1 && delete i._) : (s = !e.$stable, Wl(e, i)), o = e;
  } else e && (Kl(t, e), o = { default: 1 });
  if (s)
    for (const l in i)
      !Ul(l) && o[l] == null && delete i[l];
};
function qi(t, e, n, r, i = !1) {
  if (lt(t)) {
    t.forEach(
      (h, p) => qi(
        h,
        e && (lt(e) ? e[p] : e),
        n,
        r,
        i
      )
    );
    return;
  }
  if (Cr(r) && !i)
    return;
  const s = r.shapeFlag & 4 ? pi(r.component) || r.component.proxy : r.el, o = i ? null : s, { i: l, r: u } = t, c = e && e.r, a = l.refs === Nt ? l.refs = {} : l.refs, f = l.setupState;
  if (c != null && c !== u && ($t(c) ? (a[c] = null, dt(f, c) && (f[c] = null)) : ne(c) && (c.value = null)), ct(u))
    Ke(u, l, 12, [o, a]);
  else {
    const h = $t(u), p = ne(u);
    if (h || p) {
      const m = () => {
        if (t.f) {
          const v = h ? dt(f, u) ? f[u] : a[u] : u.value;
          i ? lt(v) && us(v, s) : lt(v) ? v.includes(s) || v.push(s) : h ? (a[u] = [s], dt(f, u) && (f[u] = a[u])) : (u.value = [s], t.k && (a[t.k] = u.value));
        } else h ? (a[u] = o, dt(f, u) && (f[u] = o)) : p && (u.value = o, t.k && (a[t.k] = o));
      };
      o ? (m.id = -1, Jt(m, n)) : m();
    }
  }
}
const Jt = Ya;
function Pc(t) {
  return kc(t);
}
function kc(t, e) {
  const n = al();
  n.__VUE__ = !0;
  const {
    insert: r,
    remove: i,
    patchProp: s,
    createElement: o,
    createText: l,
    createComment: u,
    setText: c,
    setElementText: a,
    parentNode: f,
    nextSibling: h,
    setScopeId: p = fe,
    insertStaticContent: m
  } = t, v = (_, b, C, O = null, A = null, H = null, X = void 0, j = null, W = !!b.dynamicChildren) => {
    if (_ === b)
      return;
    _ && !In(_, b) && (O = bt(_), st(_, A, H, !0), _ = null), b.patchFlag === -2 && (W = !1, b.dynamicChildren = null);
    const { type: B, ref: Q, shapeFlag: et } = b;
    switch (B) {
      case fi:
        w(_, b, C, O);
        break;
      case Yn:
        d(_, b, C, O);
        break;
      case Si:
        _ == null && P(b, C, O, X);
        break;
      case ce:
        ut(
          _,
          b,
          C,
          O,
          A,
          H,
          X,
          j,
          W
        );
        break;
      default:
        et & 1 ? M(
          _,
          b,
          C,
          O,
          A,
          H,
          X,
          j,
          W
        ) : et & 6 ? U(
          _,
          b,
          C,
          O,
          A,
          H,
          X,
          j,
          W
        ) : (et & 64 || et & 128) && B.process(
          _,
          b,
          C,
          O,
          A,
          H,
          X,
          j,
          W,
          jt
        );
    }
    Q != null && A && qi(Q, _ && _.ref, H, b || _, !b);
  }, w = (_, b, C, O) => {
    if (_ == null)
      r(
        b.el = l(b.children),
        C,
        O
      );
    else {
      const A = b.el = _.el;
      b.children !== _.children && c(A, b.children);
    }
  }, d = (_, b, C, O) => {
    _ == null ? r(
      b.el = u(b.children || ""),
      C,
      O
    ) : b.el = _.el;
  }, P = (_, b, C, O) => {
    [_.el, _.anchor] = m(
      _.children,
      b,
      C,
      O,
      _.el,
      _.anchor
    );
  }, N = ({ el: _, anchor: b }, C, O) => {
    let A;
    for (; _ && _ !== b; )
      A = h(_), r(_, C, O), _ = A;
    r(b, C, O);
  }, y = ({ el: _, anchor: b }) => {
    let C;
    for (; _ && _ !== b; )
      C = h(_), i(_), _ = C;
    i(b);
  }, M = (_, b, C, O, A, H, X, j, W) => {
    b.type === "svg" ? X = "svg" : b.type === "math" && (X = "mathml"), _ == null ? R(
      b,
      C,
      O,
      A,
      H,
      X,
      j,
      W
    ) : Z(
      _,
      b,
      A,
      H,
      X,
      j,
      W
    );
  }, R = (_, b, C, O, A, H, X, j) => {
    let W, B;
    const { props: Q, shapeFlag: et, transition: tt, dirs: ot } = _;
    if (W = _.el = o(
      _.type,
      H,
      Q && Q.is,
      Q
    ), et & 8 ? a(W, _.children) : et & 16 && q(
      _.children,
      W,
      null,
      O,
      A,
      Mi(_, H),
      X,
      j
    ), ot && Qe(_, null, O, "created"), z(W, _, _.scopeId, X, O), Q) {
      for (const gt in Q)
        gt !== "value" && !zn(gt) && s(
          W,
          gt,
          null,
          Q[gt],
          H,
          _.children,
          O,
          A,
          _t
        );
      "value" in Q && s(W, "value", null, Q.value, H), (B = Q.onVnodeBeforeMount) && be(B, O, _);
    }
    ot && Qe(_, null, O, "beforeMount");
    const ft = Mc(A, tt);
    ft && tt.beforeEnter(W), r(W, b, C), ((B = Q && Q.onVnodeMounted) || ft || ot) && Jt(() => {
      B && be(B, O, _), ft && tt.enter(W), ot && Qe(_, null, O, "mounted");
    }, A);
  }, z = (_, b, C, O, A) => {
    if (C && p(_, C), O)
      for (let H = 0; H < O.length; H++)
        p(_, O[H]);
    if (A) {
      let H = A.subTree;
      if (b === H) {
        const X = A.vnode;
        z(
          _,
          X,
          X.scopeId,
          X.slotScopeIds,
          A.parent
        );
      }
    }
  }, q = (_, b, C, O, A, H, X, j, W = 0) => {
    for (let B = W; B < _.length; B++) {
      const Q = _[B] = j ? Ge(_[B]) : Ee(_[B]);
      v(
        null,
        Q,
        b,
        C,
        O,
        A,
        H,
        X,
        j
      );
    }
  }, Z = (_, b, C, O, A, H, X) => {
    const j = b.el = _.el;
    let { patchFlag: W, dynamicChildren: B, dirs: Q } = b;
    W |= _.patchFlag & 16;
    const et = _.props || Nt, tt = b.props || Nt;
    let ot;
    if (C && Ze(C, !1), (ot = tt.onVnodeBeforeUpdate) && be(ot, C, b, _), Q && Qe(b, _, C, "beforeUpdate"), C && Ze(C, !0), B ? V(
      _.dynamicChildren,
      B,
      j,
      C,
      O,
      Mi(b, A),
      H
    ) : X || $(
      _,
      b,
      j,
      null,
      C,
      O,
      Mi(b, A),
      H,
      !1
    ), W > 0) {
      if (W & 16)
        J(
          j,
          b,
          et,
          tt,
          C,
          O,
          A
        );
      else if (W & 2 && et.class !== tt.class && s(j, "class", null, tt.class, A), W & 4 && s(j, "style", et.style, tt.style, A), W & 8) {
        const ft = b.dynamicProps;
        for (let gt = 0; gt < ft.length; gt++) {
          const xt = ft[gt], Rt = et[xt], Xt = tt[xt];
          (Xt !== Rt || xt === "value") && s(
            j,
            xt,
            Rt,
            Xt,
            A,
            _.children,
            C,
            O,
            _t
          );
        }
      }
      W & 1 && _.children !== b.children && a(j, b.children);
    } else !X && B == null && J(
      j,
      b,
      et,
      tt,
      C,
      O,
      A
    );
    ((ot = tt.onVnodeUpdated) || Q) && Jt(() => {
      ot && be(ot, C, b, _), Q && Qe(b, _, C, "updated");
    }, O);
  }, V = (_, b, C, O, A, H, X) => {
    for (let j = 0; j < b.length; j++) {
      const W = _[j], B = b[j], Q = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        W.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (W.type === ce || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !In(W, B) || // - In the case of a component, it could contain anything.
        W.shapeFlag & 70) ? f(W.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          C
        )
      );
      v(
        W,
        B,
        Q,
        null,
        O,
        A,
        H,
        X,
        !0
      );
    }
  }, J = (_, b, C, O, A, H, X) => {
    if (C !== O) {
      if (C !== Nt)
        for (const j in C)
          !zn(j) && !(j in O) && s(
            _,
            j,
            C[j],
            null,
            X,
            b.children,
            A,
            H,
            _t
          );
      for (const j in O) {
        if (zn(j))
          continue;
        const W = O[j], B = C[j];
        W !== B && j !== "value" && s(
          _,
          j,
          B,
          W,
          X,
          b.children,
          A,
          H,
          _t
        );
      }
      "value" in O && s(_, "value", C.value, O.value, X);
    }
  }, ut = (_, b, C, O, A, H, X, j, W) => {
    const B = b.el = _ ? _.el : l(""), Q = b.anchor = _ ? _.anchor : l("");
    let { patchFlag: et, dynamicChildren: tt, slotScopeIds: ot } = b;
    ot && (j = j ? j.concat(ot) : ot), _ == null ? (r(B, C, O), r(Q, C, O), q(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      b.children || [],
      C,
      Q,
      A,
      H,
      X,
      j,
      W
    )) : et > 0 && et & 64 && tt && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    _.dynamicChildren ? (V(
      _.dynamicChildren,
      tt,
      C,
      A,
      H,
      X,
      j
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (b.key != null || A && b === A.subTree) && Xl(
      _,
      b,
      !0
      /* shallow */
    )) : $(
      _,
      b,
      C,
      Q,
      A,
      H,
      X,
      j,
      W
    );
  }, U = (_, b, C, O, A, H, X, j, W) => {
    b.slotScopeIds = j, _ == null ? b.shapeFlag & 512 ? A.ctx.activate(
      b,
      C,
      O,
      X,
      W
    ) : x(
      b,
      C,
      O,
      A,
      H,
      X,
      W
    ) : D(_, b, W);
  }, x = (_, b, C, O, A, H, X) => {
    const j = _.component = jc(
      _,
      O,
      A
    );
    if (jl(_) && (j.ctx.renderer = jt), Bc(j), j.asyncDep) {
      if (A && A.registerDep(j, T), !_.el) {
        const W = j.subTree = Me(Yn);
        d(null, W, b, C);
      }
    } else
      T(
        j,
        _,
        b,
        C,
        A,
        H,
        X
      );
  }, D = (_, b, C) => {
    const O = b.component = _.component;
    if (Ua(_, b, C))
      if (O.asyncDep && !O.asyncResolved) {
        F(O, b, C);
        return;
      } else
        O.next = b, Ba(O.update), O.effect.dirty = !0, O.update();
    else
      b.el = _.el, O.vnode = b;
  }, T = (_, b, C, O, A, H, X) => {
    const j = () => {
      if (_.isMounted) {
        let { next: Q, bu: et, u: tt, parent: ot, vnode: ft } = _;
        {
          const Ne = Yl(_);
          if (Ne) {
            Q && (Q.el = ft.el, F(_, Q, X)), Ne.asyncDep.then(() => {
              _.isUnmounted || j();
            });
            return;
          }
        }
        let gt = Q, xt;
        Ze(_, !1), Q ? (Q.el = ft.el, F(_, Q, X)) : Q = ft, et && bi(et), (xt = Q.props && Q.props.onVnodeBeforeUpdate) && be(xt, ot, Q, ft), Ze(_, !0);
        const Rt = Ei(_), Xt = _.subTree;
        _.subTree = Rt, v(
          Xt,
          Rt,
          // parent may have changed if it's in a teleport
          f(Xt.el),
          // anchor may have changed if it's in a fragment
          bt(Xt),
          _,
          A,
          H
        ), Q.el = Rt.el, gt === null && Wa(_, Rt.el), tt && Jt(tt, A), (xt = Q.props && Q.props.onVnodeUpdated) && Jt(
          () => be(xt, ot, Q, ft),
          A
        );
      } else {
        let Q;
        const { el: et, props: tt } = b, { bm: ot, m: ft, parent: gt } = _, xt = Cr(b);
        if (Ze(_, !1), ot && bi(ot), !xt && (Q = tt && tt.onVnodeBeforeMount) && be(Q, gt, b), Ze(_, !0), et && ve) {
          const Rt = () => {
            _.subTree = Ei(_), ve(
              et,
              _.subTree,
              _,
              A,
              null
            );
          };
          xt ? b.type.__asyncLoader().then(
            // note: we are moving the render call into an async callback,
            // which means it won't track dependencies - but it's ok because
            // a server-rendered async wrapper is already in resolved state
            // and it will never need to change.
            () => !_.isUnmounted && Rt()
          ) : Rt();
        } else {
          const Rt = _.subTree = Ei(_);
          v(
            null,
            Rt,
            C,
            O,
            _,
            A,
            H
          ), b.el = Rt.el;
        }
        if (ft && Jt(ft, A), !xt && (Q = tt && tt.onVnodeMounted)) {
          const Rt = b;
          Jt(
            () => be(Q, gt, Rt),
            A
          );
        }
        (b.shapeFlag & 256 || gt && Cr(gt.vnode) && gt.vnode.shapeFlag & 256) && _.a && Jt(_.a, A), _.isMounted = !0, b = C = O = null;
      }
    }, W = _.effect = new hs(
      j,
      fe,
      () => vs(B),
      _.scope
      // track it in component's effect scope
    ), B = _.update = () => {
      W.dirty && W.run();
    };
    B.id = _.uid, Ze(_, !0), B();
  }, F = (_, b, C) => {
    b.component = _;
    const O = _.vnode.props;
    _.vnode = b, _.next = null, vc(_, b.props, O, C), Ec(_, b.children, C), dn(), eo(_), pn();
  }, $ = (_, b, C, O, A, H, X, j, W = !1) => {
    const B = _ && _.children, Q = _ ? _.shapeFlag : 0, et = b.children, { patchFlag: tt, shapeFlag: ot } = b;
    if (tt > 0) {
      if (tt & 128) {
        Y(
          B,
          et,
          C,
          O,
          A,
          H,
          X,
          j,
          W
        );
        return;
      } else if (tt & 256) {
        K(
          B,
          et,
          C,
          O,
          A,
          H,
          X,
          j,
          W
        );
        return;
      }
    }
    ot & 8 ? (Q & 16 && _t(B, A, H), et !== B && a(C, et)) : Q & 16 ? ot & 16 ? Y(
      B,
      et,
      C,
      O,
      A,
      H,
      X,
      j,
      W
    ) : _t(B, A, H, !0) : (Q & 8 && a(C, ""), ot & 16 && q(
      et,
      C,
      O,
      A,
      H,
      X,
      j,
      W
    ));
  }, K = (_, b, C, O, A, H, X, j, W) => {
    _ = _ || vn, b = b || vn;
    const B = _.length, Q = b.length, et = Math.min(B, Q);
    let tt;
    for (tt = 0; tt < et; tt++) {
      const ot = b[tt] = W ? Ge(b[tt]) : Ee(b[tt]);
      v(
        _[tt],
        ot,
        C,
        null,
        A,
        H,
        X,
        j,
        W
      );
    }
    B > Q ? _t(
      _,
      A,
      H,
      !0,
      !1,
      et
    ) : q(
      b,
      C,
      O,
      A,
      H,
      X,
      j,
      W,
      et
    );
  }, Y = (_, b, C, O, A, H, X, j, W) => {
    let B = 0;
    const Q = b.length;
    let et = _.length - 1, tt = Q - 1;
    for (; B <= et && B <= tt; ) {
      const ot = _[B], ft = b[B] = W ? Ge(b[B]) : Ee(b[B]);
      if (In(ot, ft))
        v(
          ot,
          ft,
          C,
          null,
          A,
          H,
          X,
          j,
          W
        );
      else
        break;
      B++;
    }
    for (; B <= et && B <= tt; ) {
      const ot = _[et], ft = b[tt] = W ? Ge(b[tt]) : Ee(b[tt]);
      if (In(ot, ft))
        v(
          ot,
          ft,
          C,
          null,
          A,
          H,
          X,
          j,
          W
        );
      else
        break;
      et--, tt--;
    }
    if (B > et) {
      if (B <= tt) {
        const ot = tt + 1, ft = ot < Q ? b[ot].el : O;
        for (; B <= tt; )
          v(
            null,
            b[B] = W ? Ge(b[B]) : Ee(b[B]),
            C,
            ft,
            A,
            H,
            X,
            j,
            W
          ), B++;
      }
    } else if (B > tt)
      for (; B <= et; )
        st(_[B], A, H, !0), B++;
    else {
      const ot = B, ft = B, gt = /* @__PURE__ */ new Map();
      for (B = ft; B <= tt; B++) {
        const Bt = b[B] = W ? Ge(b[B]) : Ee(b[B]);
        Bt.key != null && gt.set(Bt.key, B);
      }
      let xt, Rt = 0;
      const Xt = tt - ft + 1;
      let Ne = !1, ur = 0;
      const Ye = new Array(Xt);
      for (B = 0; B < Xt; B++)
        Ye[B] = 0;
      for (B = ot; B <= et; B++) {
        const Bt = _[B];
        if (Rt >= Xt) {
          st(Bt, A, H, !0);
          continue;
        }
        let ae;
        if (Bt.key != null)
          ae = gt.get(Bt.key);
        else
          for (xt = ft; xt <= tt; xt++)
            if (Ye[xt - ft] === 0 && In(Bt, b[xt])) {
              ae = xt;
              break;
            }
        ae === void 0 ? st(Bt, A, H, !0) : (Ye[ae - ft] = B + 1, ae >= ur ? ur = ae : Ne = !0, v(
          Bt,
          b[ae],
          C,
          null,
          A,
          H,
          X,
          j,
          W
        ), Rt++);
      }
      const ar = Ne ? Sc(Ye) : vn;
      for (xt = ar.length - 1, B = Xt - 1; B >= 0; B--) {
        const Bt = ft + B, ae = b[Bt], cr = Bt + 1 < Q ? b[Bt + 1].el : O;
        Ye[B] === 0 ? v(
          null,
          ae,
          C,
          cr,
          A,
          H,
          X,
          j,
          W
        ) : Ne && (xt < 0 || B !== ar[xt] ? it(ae, C, cr, 2) : xt--);
      }
    }
  }, it = (_, b, C, O, A = null) => {
    const { el: H, type: X, transition: j, children: W, shapeFlag: B } = _;
    if (B & 6) {
      it(_.component.subTree, b, C, O);
      return;
    }
    if (B & 128) {
      _.suspense.move(b, C, O);
      return;
    }
    if (B & 64) {
      X.move(_, b, C, jt);
      return;
    }
    if (X === ce) {
      r(H, b, C);
      for (let et = 0; et < W.length; et++)
        it(W[et], b, C, O);
      r(_.anchor, b, C);
      return;
    }
    if (X === Si) {
      N(_, b, C);
      return;
    }
    if (O !== 2 && B & 1 && j)
      if (O === 0)
        j.beforeEnter(H), r(H, b, C), Jt(() => j.enter(H), A);
      else {
        const { leave: et, delayLeave: tt, afterLeave: ot } = j, ft = () => r(H, b, C), gt = () => {
          et(H, () => {
            ft(), ot && ot();
          });
        };
        tt ? tt(H, ft, gt) : gt();
      }
    else
      r(H, b, C);
  }, st = (_, b, C, O = !1, A = !1) => {
    const {
      type: H,
      props: X,
      ref: j,
      children: W,
      dynamicChildren: B,
      shapeFlag: Q,
      patchFlag: et,
      dirs: tt
    } = _;
    if (j != null && qi(j, null, C, _, !0), Q & 256) {
      b.ctx.deactivate(_);
      return;
    }
    const ot = Q & 1 && tt, ft = !Cr(_);
    let gt;
    if (ft && (gt = X && X.onVnodeBeforeUnmount) && be(gt, b, _), Q & 6)
      yt(_.component, C, O);
    else {
      if (Q & 128) {
        _.suspense.unmount(C, O);
        return;
      }
      ot && Qe(_, null, b, "beforeUnmount"), Q & 64 ? _.type.remove(
        _,
        b,
        C,
        A,
        jt,
        O
      ) : B && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (H !== ce || et > 0 && et & 64) ? _t(
        B,
        b,
        C,
        !1,
        !0
      ) : (H === ce && et & 384 || !A && Q & 16) && _t(W, b, C), O && Pt(_);
    }
    (ft && (gt = X && X.onVnodeUnmounted) || ot) && Jt(() => {
      gt && be(gt, b, _), ot && Qe(_, null, b, "unmounted");
    }, C);
  }, Pt = (_) => {
    const { type: b, el: C, anchor: O, transition: A } = _;
    if (b === ce) {
      wt(C, O);
      return;
    }
    if (b === Si) {
      y(_);
      return;
    }
    const H = () => {
      i(C), A && !A.persisted && A.afterLeave && A.afterLeave();
    };
    if (_.shapeFlag & 1 && A && !A.persisted) {
      const { leave: X, delayLeave: j } = A, W = () => X(C, H);
      j ? j(_.el, H, W) : W();
    } else
      H();
  }, wt = (_, b) => {
    let C;
    for (; _ !== b; )
      C = h(_), i(_), _ = C;
    i(b);
  }, yt = (_, b, C) => {
    const { bum: O, scope: A, update: H, subTree: X, um: j } = _;
    O && bi(O), A.stop(), H && (H.active = !1, st(X, _, b, C)), j && Jt(j, b), Jt(() => {
      _.isUnmounted = !0;
    }, b), b && b.pendingBranch && !b.isUnmounted && _.asyncDep && !_.asyncResolved && _.suspenseId === b.pendingId && (b.deps--, b.deps === 0 && b.resolve());
  }, _t = (_, b, C, O = !1, A = !1, H = 0) => {
    for (let X = H; X < _.length; X++)
      st(_[X], b, C, O, A);
  }, bt = (_) => _.shapeFlag & 6 ? bt(_.component.subTree) : _.shapeFlag & 128 ? _.suspense.next() : h(_.anchor || _.el);
  let kt = !1;
  const It = (_, b, C) => {
    _ == null ? b._vnode && st(b._vnode, null, null, !0) : v(
      b._vnode || null,
      _,
      b,
      null,
      null,
      null,
      C
    ), kt || (kt = !0, eo(), Rl(), kt = !1), b._vnode = _;
  }, jt = {
    p: v,
    um: st,
    m: it,
    r: Pt,
    mt: x,
    mc: q,
    pc: $,
    pbc: V,
    n: bt,
    o: t
  };
  let ue, ve;
  return {
    render: It,
    hydrate: ue,
    createApp: wc(It, ue)
  };
}
function Mi({ type: t, props: e }, n) {
  return n === "svg" && t === "foreignObject" || n === "mathml" && t === "annotation-xml" && e && e.encoding && e.encoding.includes("html") ? void 0 : n;
}
function Ze({ effect: t, update: e }, n) {
  t.allowRecurse = e.allowRecurse = n;
}
function Mc(t, e) {
  return (!t || t && !t.pendingBranch) && e && !e.persisted;
}
function Xl(t, e, n = !1) {
  const r = t.children, i = e.children;
  if (lt(r) && lt(i))
    for (let s = 0; s < r.length; s++) {
      const o = r[s];
      let l = i[s];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = i[s] = Ge(i[s]), l.el = o.el), n || Xl(o, l)), l.type === fi && (l.el = o.el);
    }
}
function Sc(t) {
  const e = t.slice(), n = [0];
  let r, i, s, o, l;
  const u = t.length;
  for (r = 0; r < u; r++) {
    const c = t[r];
    if (c !== 0) {
      if (i = n[n.length - 1], t[i] < c) {
        e[r] = i, n.push(r);
        continue;
      }
      for (s = 0, o = n.length - 1; s < o; )
        l = s + o >> 1, t[n[l]] < c ? s = l + 1 : o = l;
      c < t[n[s]] && (s > 0 && (e[r] = n[s - 1]), n[s] = r);
    }
  }
  for (s = n.length, o = n[s - 1]; s-- > 0; )
    n[s] = o, o = e[o];
  return n;
}
function Yl(t) {
  const e = t.subTree.component;
  if (e)
    return e.asyncDep && !e.asyncResolved ? e : Yl(e);
}
const Tc = (t) => t.__isTeleport, ce = Symbol.for("v-fgt"), fi = Symbol.for("v-txt"), Yn = Symbol.for("v-cmt"), Si = Symbol.for("v-stc"), Hn = [];
let we = null;
function Be(t = !1) {
  Hn.push(we = t ? null : []);
}
function Nc() {
  Hn.pop(), we = Hn[Hn.length - 1] || null;
}
let Jn = 1;
function ho(t) {
  Jn += t;
}
function Cc(t) {
  return t.dynamicChildren = Jn > 0 ? we || vn : null, Nc(), Jn > 0 && we && we.push(t), t;
}
function Ve(t, e, n, r, i, s) {
  return Cc(
    ie(
      t,
      e,
      n,
      r,
      i,
      s,
      !0
    )
  );
}
function Lc(t) {
  return t ? t.__v_isVNode === !0 : !1;
}
function In(t, e) {
  return t.type === e.type && t.key === e.key;
}
const hi = "__vInternal", Jl = ({ key: t }) => t ?? null, Rr = ({
  ref: t,
  ref_key: e,
  ref_for: n
}) => (typeof t == "number" && (t = "" + t), t != null ? $t(t) || ne(t) || ct(t) ? { i: oe, r: t, k: e, f: !!n } : t : null);
function ie(t, e = null, n = null, r = 0, i = null, s = t === ce ? 0 : 1, o = !1, l = !1) {
  const u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t,
    props: e,
    key: e && Jl(e),
    ref: e && Rr(e),
    scopeId: $l,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: s,
    patchFlag: r,
    dynamicProps: i,
    dynamicChildren: null,
    appContext: null,
    ctx: oe
  };
  return l ? (ks(u, n), s & 128 && t.normalize(u)) : n && (u.shapeFlag |= $t(n) ? 8 : 16), Jn > 0 && // avoid a block node from tracking itself
  !o && // has current parent block
  we && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (u.patchFlag > 0 || s & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  u.patchFlag !== 32 && we.push(u), u;
}
const Me = Rc;
function Rc(t, e = null, n = null, r = 0, i = null, s = !1) {
  if ((!t || t === Ka) && (t = Yn), Lc(t)) {
    const l = Tn(
      t,
      e,
      !0
      /* mergeRef: true */
    );
    return n && ks(l, n), Jn > 0 && !s && we && (l.shapeFlag & 6 ? we[we.indexOf(t)] = l : we.push(l)), l.patchFlag |= -2, l;
  }
  if (Gc(t) && (t = t.__vccOpts), e) {
    e = Ic(e);
    let { class: l, style: u } = e;
    l && !$t(l) && (e.class = fs(l)), Ct(u) && (Pl(u) && !lt(u) && (u = Ot({}, u)), e.style = cs(u));
  }
  const o = $t(t) ? 1 : Xa(t) ? 128 : Tc(t) ? 64 : Ct(t) ? 4 : ct(t) ? 2 : 0;
  return ie(
    t,
    e,
    n,
    r,
    i,
    o,
    s,
    !0
  );
}
function Ic(t) {
  return t ? Pl(t) || hi in t ? Ot({}, t) : t : null;
}
function Tn(t, e, n = !1) {
  const { props: r, ref: i, patchFlag: s, children: o } = t, l = e ? $c(r || {}, e) : r;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t.type,
    props: l,
    key: l && Jl(l),
    ref: e && e.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && i ? lt(i) ? i.concat(Rr(e)) : [i, Rr(e)] : Rr(e)
    ) : i,
    scopeId: t.scopeId,
    slotScopeIds: t.slotScopeIds,
    children: o,
    target: t.target,
    targetAnchor: t.targetAnchor,
    staticCount: t.staticCount,
    shapeFlag: t.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: e && t.type !== ce ? s === -1 ? 16 : s | 16 : s,
    dynamicProps: t.dynamicProps,
    dynamicChildren: t.dynamicChildren,
    appContext: t.appContext,
    dirs: t.dirs,
    transition: t.transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: t.component,
    suspense: t.suspense,
    ssContent: t.ssContent && Tn(t.ssContent),
    ssFallback: t.ssFallback && Tn(t.ssFallback),
    el: t.el,
    anchor: t.anchor,
    ctx: t.ctx,
    ce: t.ce
  };
}
function Oc(t = " ", e = 0) {
  return Me(fi, null, t, e);
}
function Ee(t) {
  return t == null || typeof t == "boolean" ? Me(Yn) : lt(t) ? Me(
    ce,
    null,
    // #3666, avoid reference pollution when reusing vnode
    t.slice()
  ) : typeof t == "object" ? Ge(t) : Me(fi, null, String(t));
}
function Ge(t) {
  return t.el === null && t.patchFlag !== -1 || t.memo ? t : Tn(t);
}
function ks(t, e) {
  let n = 0;
  const { shapeFlag: r } = t;
  if (e == null)
    e = null;
  else if (lt(e))
    n = 16;
  else if (typeof e == "object")
    if (r & 65) {
      const i = e.default;
      i && (i._c && (i._d = !1), ks(t, i()), i._c && (i._d = !0));
      return;
    } else {
      n = 32;
      const i = e._;
      !i && !(hi in e) ? e._ctx = oe : i === 3 && oe && (oe.slots._ === 1 ? e._ = 1 : (e._ = 2, t.patchFlag |= 1024));
    }
  else ct(e) ? (e = { default: e, _ctx: oe }, n = 32) : (e = String(e), r & 64 ? (n = 16, e = [Oc(e)]) : n = 8);
  t.children = e, t.shapeFlag |= n;
}
function $c(...t) {
  const e = {};
  for (let n = 0; n < t.length; n++) {
    const r = t[n];
    for (const i in r)
      if (i === "class")
        e.class !== r.class && (e.class = fs([e.class, r.class]));
      else if (i === "style")
        e.style = cs([e.style, r.style]);
      else if (ri(i)) {
        const s = e[i], o = r[i];
        o && s !== o && !(lt(s) && s.includes(o)) && (e[i] = s ? [].concat(s, o) : o);
      } else i !== "" && (e[i] = r[i]);
  }
  return e;
}
function be(t, e, n, r = null) {
  ye(t, e, 7, [
    n,
    r
  ]);
}
const Ac = Gl();
let Fc = 0;
function jc(t, e, n) {
  const r = t.type, i = (e ? e.appContext : t.appContext) || Ac, s = {
    uid: Fc++,
    vnode: t,
    type: r,
    parent: e,
    appContext: i,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    scope: new ca(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: e ? e.provides : Object.create(i.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: ql(r, i),
    emitsOptions: Ol(r, i),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: Nt,
    // inheritAttrs
    inheritAttrs: r.inheritAttrs,
    // state
    ctx: Nt,
    data: Nt,
    props: Nt,
    attrs: Nt,
    slots: Nt,
    refs: Nt,
    setupState: Nt,
    setupContext: null,
    attrsProxy: null,
    slotsProxy: null,
    // suspense related
    suspense: n,
    suspenseId: n ? n.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return s.ctx = { _: s }, s.root = e ? e.root : s, s.emit = Da.bind(null, s), t.ce && t.ce(s), s;
}
let Gt = null, Hr, Ui;
{
  const t = al(), e = (n, r) => {
    let i;
    return (i = t[n]) || (i = t[n] = []), i.push(r), (s) => {
      i.length > 1 ? i.forEach((o) => o(s)) : i[0](s);
    };
  };
  Hr = e(
    "__VUE_INSTANCE_SETTERS__",
    (n) => Gt = n
  ), Ui = e(
    "__VUE_SSR_SETTERS__",
    (n) => di = n
  );
}
const ir = (t) => {
  const e = Gt;
  return Hr(t), t.scope.on(), () => {
    t.scope.off(), Hr(e);
  };
}, po = () => {
  Gt && Gt.scope.off(), Hr(null);
};
function Ql(t) {
  return t.vnode.shapeFlag & 4;
}
let di = !1;
function Bc(t, e = !1) {
  e && Ui(e);
  const { props: n, children: r } = t.vnode, i = Ql(t);
  _c(t, n, i, e), xc(t, r);
  const s = i ? Vc(t, e) : void 0;
  return e && Ui(!1), s;
}
function Vc(t, e) {
  const n = t.type;
  t.accessCache = /* @__PURE__ */ Object.create(null), t.proxy = kl(new Proxy(t.ctx, cc));
  const { setup: r } = n;
  if (r) {
    const i = t.setupContext = r.length > 1 ? Dc(t) : null, s = ir(t);
    dn();
    const o = Ke(
      r,
      t,
      0,
      [
        t.props,
        i
      ]
    );
    if (pn(), s(), sl(o)) {
      if (o.then(po, po), e)
        return o.then((l) => {
          go(t, l, e);
        }).catch((l) => {
          ui(l, t, 0);
        });
      t.asyncDep = o;
    } else
      go(t, o, e);
  } else
    Zl(t, e);
}
function go(t, e, n) {
  ct(e) ? t.type.__ssrInlineRender ? t.ssrRender = e : t.render = e : Ct(e) && (t.setupState = Tl(e)), Zl(t, n);
}
let mo;
function Zl(t, e, n) {
  const r = t.type;
  if (!t.render) {
    if (!e && mo && !r.render) {
      const i = r.template || Es(t).template;
      if (i) {
        const { isCustomElement: s, compilerOptions: o } = t.appContext.config, { delimiters: l, compilerOptions: u } = r, c = Ot(
          Ot(
            {
              isCustomElement: s,
              delimiters: l
            },
            o
          ),
          u
        );
        r.render = mo(i, c);
      }
    }
    t.render = r.render || fe;
  }
  {
    const i = ir(t);
    dn();
    try {
      fc(t);
    } finally {
      pn(), i();
    }
  }
}
function zc(t) {
  return t.attrsProxy || (t.attrsProxy = new Proxy(
    t.attrs,
    {
      get(e, n) {
        return ee(t, "get", "$attrs"), e[n];
      }
    }
  ));
}
function Dc(t) {
  const e = (n) => {
    t.exposed = n || {};
  };
  return {
    get attrs() {
      return zc(t);
    },
    slots: t.slots,
    emit: t.emit,
    expose: e
  };
}
function pi(t) {
  if (t.exposed)
    return t.exposeProxy || (t.exposeProxy = new Proxy(Tl(kl(t.exposed)), {
      get(e, n) {
        if (n in e)
          return e[n];
        if (n in Dn)
          return Dn[n](t);
      },
      has(e, n) {
        return n in e || n in Dn;
      }
    }));
}
function Gc(t) {
  return ct(t) && "__vccOpts" in t;
}
const Wi = (t, e) => Ia(t, e, di), Hc = "3.4.21";
/**
* @vue/runtime-dom v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const qc = "http://www.w3.org/2000/svg", Uc = "http://www.w3.org/1998/Math/MathML", He = typeof document < "u" ? document : null, wo = He && /* @__PURE__ */ He.createElement("template"), Wc = {
  insert: (t, e, n) => {
    e.insertBefore(t, n || null);
  },
  remove: (t) => {
    const e = t.parentNode;
    e && e.removeChild(t);
  },
  createElement: (t, e, n, r) => {
    const i = e === "svg" ? He.createElementNS(qc, t) : e === "mathml" ? He.createElementNS(Uc, t) : He.createElement(t, n ? { is: n } : void 0);
    return t === "select" && r && r.multiple != null && i.setAttribute("multiple", r.multiple), i;
  },
  createText: (t) => He.createTextNode(t),
  createComment: (t) => He.createComment(t),
  setText: (t, e) => {
    t.nodeValue = e;
  },
  setElementText: (t, e) => {
    t.textContent = e;
  },
  parentNode: (t) => t.parentNode,
  nextSibling: (t) => t.nextSibling,
  querySelector: (t) => He.querySelector(t),
  setScopeId(t, e) {
    t.setAttribute(e, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(t, e, n, r, i, s) {
    const o = n ? n.previousSibling : e.lastChild;
    if (i && (i === s || i.nextSibling))
      for (; e.insertBefore(i.cloneNode(!0), n), !(i === s || !(i = i.nextSibling)); )
        ;
    else {
      wo.innerHTML = r === "svg" ? `<svg>${t}</svg>` : r === "mathml" ? `<math>${t}</math>` : t;
      const l = wo.content;
      if (r === "svg" || r === "mathml") {
        const u = l.firstChild;
        for (; u.firstChild; )
          l.appendChild(u.firstChild);
        l.removeChild(u);
      }
      e.insertBefore(l, n);
    }
    return [
      // first
      o ? o.nextSibling : e.firstChild,
      // last
      n ? n.previousSibling : e.lastChild
    ];
  }
}, Kc = Symbol("_vtc");
function Xc(t, e, n) {
  const r = t[Kc];
  r && (e = (e ? [e, ...r] : [...r]).join(" ")), e == null ? t.removeAttribute("class") : n ? t.setAttribute("class", e) : t.className = e;
}
const qr = Symbol("_vod"), tu = Symbol("_vsh"), Ir = {
  beforeMount(t, { value: e }, { transition: n }) {
    t[qr] = t.style.display === "none" ? "" : t.style.display, n && e ? n.beforeEnter(t) : On(t, e);
  },
  mounted(t, { value: e }, { transition: n }) {
    n && e && n.enter(t);
  },
  updated(t, { value: e, oldValue: n }, { transition: r }) {
    !e != !n && (r ? e ? (r.beforeEnter(t), On(t, !0), r.enter(t)) : r.leave(t, () => {
      On(t, !1);
    }) : On(t, e));
  },
  beforeUnmount(t, { value: e }) {
    On(t, e);
  }
};
function On(t, e) {
  t.style.display = e ? t[qr] : "none", t[tu] = !e;
}
const Yc = Symbol(""), Jc = /(^|;)\s*display\s*:/;
function Qc(t, e, n) {
  const r = t.style, i = $t(n);
  let s = !1;
  if (n && !i) {
    if (e)
      if ($t(e))
        for (const o of e.split(";")) {
          const l = o.slice(0, o.indexOf(":")).trim();
          n[l] == null && Or(r, l, "");
        }
      else
        for (const o in e)
          n[o] == null && Or(r, o, "");
    for (const o in n)
      o === "display" && (s = !0), Or(r, o, n[o]);
  } else if (i) {
    if (e !== n) {
      const o = r[Yc];
      o && (n += ";" + o), r.cssText = n, s = Jc.test(n);
    }
  } else e && t.removeAttribute("style");
  qr in t && (t[qr] = s ? r.display : "", t[tu] && (r.display = "none"));
}
const yo = /\s*!important$/;
function Or(t, e, n) {
  if (lt(n))
    n.forEach((r) => Or(t, e, r));
  else if (n == null && (n = ""), e.startsWith("--"))
    t.setProperty(e, n);
  else {
    const r = Zc(t, e);
    yo.test(n) ? t.setProperty(
      ge(r),
      n.replace(yo, ""),
      "important"
    ) : t[r] = n;
  }
}
const _o = ["Webkit", "Moz", "ms"], Ti = {};
function Zc(t, e) {
  const n = Ti[e];
  if (n)
    return n;
  let r = Re(e);
  if (r !== "filter" && r in t)
    return Ti[e] = r;
  r = ul(r);
  for (let i = 0; i < _o.length; i++) {
    const s = _o[i] + r;
    if (s in t)
      return Ti[e] = s;
  }
  return e;
}
const vo = "http://www.w3.org/1999/xlink";
function tf(t, e, n, r, i) {
  if (r && e.startsWith("xlink:"))
    n == null ? t.removeAttributeNS(vo, e.slice(6, e.length)) : t.setAttributeNS(vo, e, n);
  else {
    const s = aa(e);
    n == null || s && !cl(n) ? t.removeAttribute(e) : t.setAttribute(e, s ? "" : n);
  }
}
function ef(t, e, n, r, i, s, o) {
  if (e === "innerHTML" || e === "textContent") {
    r && o(r, i, s), t[e] = n ?? "";
    return;
  }
  const l = t.tagName;
  if (e === "value" && l !== "PROGRESS" && // custom elements may use _value internally
  !l.includes("-")) {
    const c = l === "OPTION" ? t.getAttribute("value") || "" : t.value, a = n ?? "";
    (c !== a || !("_value" in t)) && (t.value = a), n == null && t.removeAttribute(e), t._value = n;
    return;
  }
  let u = !1;
  if (n === "" || n == null) {
    const c = typeof t[e];
    c === "boolean" ? n = cl(n) : n == null && c === "string" ? (n = "", u = !0) : c === "number" && (n = 0, u = !0);
  }
  try {
    t[e] = n;
  } catch {
  }
  u && t.removeAttribute(e);
}
function nf(t, e, n, r) {
  t.addEventListener(e, n, r);
}
function rf(t, e, n, r) {
  t.removeEventListener(e, n, r);
}
const bo = Symbol("_vei");
function sf(t, e, n, r, i = null) {
  const s = t[bo] || (t[bo] = {}), o = s[e];
  if (r && o)
    o.value = r;
  else {
    const [l, u] = of(e);
    if (r) {
      const c = s[e] = af(r, i);
      nf(t, l, c, u);
    } else o && (rf(t, l, o, u), s[e] = void 0);
  }
}
const xo = /(?:Once|Passive|Capture)$/;
function of(t) {
  let e;
  if (xo.test(t)) {
    e = {};
    let r;
    for (; r = t.match(xo); )
      t = t.slice(0, t.length - r[0].length), e[r[0].toLowerCase()] = !0;
  }
  return [t[2] === ":" ? t.slice(3) : ge(t.slice(2)), e];
}
let Ni = 0;
const lf = /* @__PURE__ */ Promise.resolve(), uf = () => Ni || (lf.then(() => Ni = 0), Ni = Date.now());
function af(t, e) {
  const n = (r) => {
    if (!r._vts)
      r._vts = Date.now();
    else if (r._vts <= n.attached)
      return;
    ye(
      cf(r, n.value),
      e,
      5,
      [r]
    );
  };
  return n.value = t, n.attached = uf(), n;
}
function cf(t, e) {
  if (lt(e)) {
    const n = t.stopImmediatePropagation;
    return t.stopImmediatePropagation = () => {
      n.call(t), t._stopped = !0;
    }, e.map((r) => (i) => !i._stopped && r && r(i));
  } else
    return e;
}
const Eo = (t) => t.charCodeAt(0) === 111 && t.charCodeAt(1) === 110 && // lowercase letter
t.charCodeAt(2) > 96 && t.charCodeAt(2) < 123, ff = (t, e, n, r, i, s, o, l, u) => {
  const c = i === "svg";
  e === "class" ? Xc(t, r, c) : e === "style" ? Qc(t, n, r) : ri(e) ? ls(e) || sf(t, e, n, r, o) : (e[0] === "." ? (e = e.slice(1), !0) : e[0] === "^" ? (e = e.slice(1), !1) : hf(t, e, r, c)) ? ef(
    t,
    e,
    r,
    s,
    o,
    l,
    u
  ) : (e === "true-value" ? t._trueValue = r : e === "false-value" && (t._falseValue = r), tf(t, e, r, c));
};
function hf(t, e, n, r) {
  if (r)
    return !!(e === "innerHTML" || e === "textContent" || e in t && Eo(e) && ct(n));
  if (e === "spellcheck" || e === "draggable" || e === "translate" || e === "form" || e === "list" && t.tagName === "INPUT" || e === "type" && t.tagName === "TEXTAREA")
    return !1;
  if (e === "width" || e === "height") {
    const i = t.tagName;
    if (i === "IMG" || i === "VIDEO" || i === "CANVAS" || i === "SOURCE")
      return !1;
  }
  return Eo(e) && $t(n) ? !1 : e in t;
}
const df = /* @__PURE__ */ Ot({ patchProp: ff }, Wc);
let Po;
function pf() {
  return Po || (Po = Pc(df));
}
const ko = (...t) => {
  pf().render(...t);
}, gf = { class: "graph-controller__controls-overview" }, mf = { key: 0 }, wf = { key: 1 }, yf = { key: 0 }, _f = { key: 1 }, vf = /* @__PURE__ */ bs({
  __name: "GraphControls",
  props: {
    showHeader: { type: Boolean },
    showControlsGraph: { type: Boolean },
    showLatexInfo: { type: Boolean },
    showControlsEnvironment: { type: Boolean },
    platformType: {}
  },
  setup(t) {
    const e = t, n = [
      {
        action: "Create node",
        desktop: "Double-click",
        touch: "Double-tap"
      },
      {
        action: "Create link",
        desktop: "Right-click on node + hold + drag towards target",
        touch: "Hold + drag"
      },
      {
        action: "Delete node/link",
        desktop: "Right-click + hold",
        touch: "Touch + hold"
      },
      {
        action: "Move node",
        desktop: "Left-click + hold on node + drag",
        touch: "-"
      },
      {
        action: "Create/Update label",
        desktop: e.showLatexInfo ? "Left-click on label, $$ for $\\LaTeX$" : "Left-click on label",
        touch: e.showLatexInfo ? "Tap on label, $$ for $\\LaTeX$" : "Tap on label"
      }
    ], r = [
      {
        action: "Pan",
        desktop: "Left-click on canvas + hold + drag",
        touch: "Multi-touch"
      },
      {
        action: "Zoom",
        desktop: "Mouse wheel",
        touch: "Multi-touch"
      }
    ], i = ["Action", "Controls"];
    let s = e.platformType === "mobile" || e.platformType === "tablet";
    return (o, l) => (Be(), Ve("table", gf, [
      Nr(ie("thead", null, [
        ie("tr", null, [
          ie("th", null, Ae(i[0]), 1),
          ie("th", null, Ae(i[1]), 1)
        ])
      ], 512), [
        [Ir, e.showHeader]
      ]),
      ie("tbody", null, [
        (Be(), Ve(ce, null, ro(n, (u) => Nr(ie("tr", {
          key: u.action
        }, [
          ie("td", null, Ae(u.action), 1),
          zr(s) ? (Be(), Ve("td", mf, Ae(u.touch), 1)) : (Be(), Ve("td", wf, Ae(u.desktop), 1))
        ]), [
          [Ir, e.showControlsGraph]
        ])), 64)),
        (Be(), Ve(ce, null, ro(r, (u) => Nr(ie("tr", {
          key: u.action
        }, [
          ie("td", null, Ae(u.action), 1),
          zr(s) ? (Be(), Ve("td", yf, Ae(u.touch), 1)) : (Be(), Ve("td", _f, Ae(u.desktop), 1))
        ]), [
          [Ir, e.showControlsEnvironment]
        ])), 64))
      ])
    ]));
  }
}), bf = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [r, i] of e)
    n[r] = i;
  return n;
}, xf = /* @__PURE__ */ bf(vf, [["__scopeId", "data-v-8c3d818f"]]);
var Ef = { value: () => {
} };
function sr() {
  for (var t = 0, e = arguments.length, n = {}, r; t < e; ++t) {
    if (!(r = arguments[t] + "") || r in n || /[\s.]/.test(r)) throw new Error("illegal type: " + r);
    n[r] = [];
  }
  return new $r(n);
}
function $r(t) {
  this._ = t;
}
function Pf(t, e) {
  return t.trim().split(/^|\s+/).map(function(n) {
    var r = "", i = n.indexOf(".");
    if (i >= 0 && (r = n.slice(i + 1), n = n.slice(0, i)), n && !e.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: r };
  });
}
$r.prototype = sr.prototype = {
  constructor: $r,
  on: function(t, e) {
    var n = this._, r = Pf(t + "", n), i, s = -1, o = r.length;
    if (arguments.length < 2) {
      for (; ++s < o; ) if ((i = (t = r[s]).type) && (i = kf(n[i], t.name))) return i;
      return;
    }
    if (e != null && typeof e != "function") throw new Error("invalid callback: " + e);
    for (; ++s < o; )
      if (i = (t = r[s]).type) n[i] = Mo(n[i], t.name, e);
      else if (e == null) for (i in n) n[i] = Mo(n[i], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, e = this._;
    for (var n in e) t[n] = e[n].slice();
    return new $r(t);
  },
  call: function(t, e) {
    if ((i = arguments.length - 2) > 0) for (var n = new Array(i), r = 0, i, s; r < i; ++r) n[r] = arguments[r + 2];
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (s = this._[t], r = 0, i = s.length; r < i; ++r) s[r].value.apply(e, n);
  },
  apply: function(t, e, n) {
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (var r = this._[t], i = 0, s = r.length; i < s; ++i) r[i].value.apply(e, n);
  }
};
function kf(t, e) {
  for (var n = 0, r = t.length, i; n < r; ++n)
    if ((i = t[n]).name === e)
      return i.value;
}
function Mo(t, e, n) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === e) {
      t[r] = Ef, t = t.slice(0, r).concat(t.slice(r + 1));
      break;
    }
  return n != null && t.push({ name: e, value: n }), t;
}
var Ki = "http://www.w3.org/1999/xhtml";
const So = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Ki,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function gi(t) {
  var e = t += "", n = e.indexOf(":");
  return n >= 0 && (e = t.slice(0, n)) !== "xmlns" && (t = t.slice(n + 1)), So.hasOwnProperty(e) ? { space: So[e], local: t } : t;
}
function Mf(t) {
  return function() {
    var e = this.ownerDocument, n = this.namespaceURI;
    return n === Ki && e.documentElement.namespaceURI === Ki ? e.createElement(t) : e.createElementNS(n, t);
  };
}
function Sf(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function eu(t) {
  var e = gi(t);
  return (e.local ? Sf : Mf)(e);
}
function Tf() {
}
function Ms(t) {
  return t == null ? Tf : function() {
    return this.querySelector(t);
  };
}
function Nf(t) {
  typeof t != "function" && (t = Ms(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var s = e[i], o = s.length, l = r[i] = new Array(o), u, c, a = 0; a < o; ++a)
      (u = s[a]) && (c = t.call(u, u.__data__, a, s)) && ("__data__" in u && (c.__data__ = u.__data__), l[a] = c);
  return new le(r, this._parents);
}
function Cf(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function Lf() {
  return [];
}
function nu(t) {
  return t == null ? Lf : function() {
    return this.querySelectorAll(t);
  };
}
function Rf(t) {
  return function() {
    return Cf(t.apply(this, arguments));
  };
}
function If(t) {
  typeof t == "function" ? t = Rf(t) : t = nu(t);
  for (var e = this._groups, n = e.length, r = [], i = [], s = 0; s < n; ++s)
    for (var o = e[s], l = o.length, u, c = 0; c < l; ++c)
      (u = o[c]) && (r.push(t.call(u, u.__data__, c, o)), i.push(u));
  return new le(r, i);
}
function ru(t) {
  return function() {
    return this.matches(t);
  };
}
function iu(t) {
  return function(e) {
    return e.matches(t);
  };
}
var Of = Array.prototype.find;
function $f(t) {
  return function() {
    return Of.call(this.children, t);
  };
}
function Af() {
  return this.firstElementChild;
}
function Ff(t) {
  return this.select(t == null ? Af : $f(typeof t == "function" ? t : iu(t)));
}
var jf = Array.prototype.filter;
function Bf() {
  return Array.from(this.children);
}
function Vf(t) {
  return function() {
    return jf.call(this.children, t);
  };
}
function zf(t) {
  return this.selectAll(t == null ? Bf : Vf(typeof t == "function" ? t : iu(t)));
}
function Df(t) {
  typeof t != "function" && (t = ru(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var s = e[i], o = s.length, l = r[i] = [], u, c = 0; c < o; ++c)
      (u = s[c]) && t.call(u, u.__data__, c, s) && l.push(u);
  return new le(r, this._parents);
}
function su(t) {
  return new Array(t.length);
}
function Gf() {
  return new le(this._enter || this._groups.map(su), this._parents);
}
function Ur(t, e) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = e;
}
Ur.prototype = {
  constructor: Ur,
  appendChild: function(t) {
    return this._parent.insertBefore(t, this._next);
  },
  insertBefore: function(t, e) {
    return this._parent.insertBefore(t, e);
  },
  querySelector: function(t) {
    return this._parent.querySelector(t);
  },
  querySelectorAll: function(t) {
    return this._parent.querySelectorAll(t);
  }
};
function Hf(t) {
  return function() {
    return t;
  };
}
function qf(t, e, n, r, i, s) {
  for (var o = 0, l, u = e.length, c = s.length; o < c; ++o)
    (l = e[o]) ? (l.__data__ = s[o], r[o] = l) : n[o] = new Ur(t, s[o]);
  for (; o < u; ++o)
    (l = e[o]) && (i[o] = l);
}
function Uf(t, e, n, r, i, s, o) {
  var l, u, c = /* @__PURE__ */ new Map(), a = e.length, f = s.length, h = new Array(a), p;
  for (l = 0; l < a; ++l)
    (u = e[l]) && (h[l] = p = o.call(u, u.__data__, l, e) + "", c.has(p) ? i[l] = u : c.set(p, u));
  for (l = 0; l < f; ++l)
    p = o.call(t, s[l], l, s) + "", (u = c.get(p)) ? (r[l] = u, u.__data__ = s[l], c.delete(p)) : n[l] = new Ur(t, s[l]);
  for (l = 0; l < a; ++l)
    (u = e[l]) && c.get(h[l]) === u && (i[l] = u);
}
function Wf(t) {
  return t.__data__;
}
function Kf(t, e) {
  if (!arguments.length) return Array.from(this, Wf);
  var n = e ? Uf : qf, r = this._parents, i = this._groups;
  typeof t != "function" && (t = Hf(t));
  for (var s = i.length, o = new Array(s), l = new Array(s), u = new Array(s), c = 0; c < s; ++c) {
    var a = r[c], f = i[c], h = f.length, p = Xf(t.call(a, a && a.__data__, c, r)), m = p.length, v = l[c] = new Array(m), w = o[c] = new Array(m), d = u[c] = new Array(h);
    n(a, f, v, w, d, p, e);
    for (var P = 0, N = 0, y, M; P < m; ++P)
      if (y = v[P]) {
        for (P >= N && (N = P + 1); !(M = w[N]) && ++N < m; ) ;
        y._next = M || null;
      }
  }
  return o = new le(o, r), o._enter = l, o._exit = u, o;
}
function Xf(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function Yf() {
  return new le(this._exit || this._groups.map(su), this._parents);
}
function Jf(t, e, n) {
  var r = this.enter(), i = this, s = this.exit();
  return typeof t == "function" ? (r = t(r), r && (r = r.selection())) : r = r.append(t + ""), e != null && (i = e(i), i && (i = i.selection())), n == null ? s.remove() : n(s), r && i ? r.merge(i).order() : i;
}
function Qf(t) {
  for (var e = t.selection ? t.selection() : t, n = this._groups, r = e._groups, i = n.length, s = r.length, o = Math.min(i, s), l = new Array(i), u = 0; u < o; ++u)
    for (var c = n[u], a = r[u], f = c.length, h = l[u] = new Array(f), p, m = 0; m < f; ++m)
      (p = c[m] || a[m]) && (h[m] = p);
  for (; u < i; ++u)
    l[u] = n[u];
  return new le(l, this._parents);
}
function Zf() {
  for (var t = this._groups, e = -1, n = t.length; ++e < n; )
    for (var r = t[e], i = r.length - 1, s = r[i], o; --i >= 0; )
      (o = r[i]) && (s && o.compareDocumentPosition(s) ^ 4 && s.parentNode.insertBefore(o, s), s = o);
  return this;
}
function th(t) {
  t || (t = eh);
  function e(f, h) {
    return f && h ? t(f.__data__, h.__data__) : !f - !h;
  }
  for (var n = this._groups, r = n.length, i = new Array(r), s = 0; s < r; ++s) {
    for (var o = n[s], l = o.length, u = i[s] = new Array(l), c, a = 0; a < l; ++a)
      (c = o[a]) && (u[a] = c);
    u.sort(e);
  }
  return new le(i, this._parents).order();
}
function eh(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function nh() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function rh() {
  return Array.from(this);
}
function ih() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, s = r.length; i < s; ++i) {
      var o = r[i];
      if (o) return o;
    }
  return null;
}
function sh() {
  let t = 0;
  for (const e of this) ++t;
  return t;
}
function oh() {
  return !this.node();
}
function lh(t) {
  for (var e = this._groups, n = 0, r = e.length; n < r; ++n)
    for (var i = e[n], s = 0, o = i.length, l; s < o; ++s)
      (l = i[s]) && t.call(l, l.__data__, s, i);
  return this;
}
function uh(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function ah(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function ch(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function fh(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function hh(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttribute(t) : this.setAttribute(t, n);
  };
}
function dh(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, n);
  };
}
function ph(t, e) {
  var n = gi(t);
  if (arguments.length < 2) {
    var r = this.node();
    return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n);
  }
  return this.each((e == null ? n.local ? ah : uh : typeof e == "function" ? n.local ? dh : hh : n.local ? fh : ch)(n, e));
}
function ou(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function gh(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function mh(t, e, n) {
  return function() {
    this.style.setProperty(t, e, n);
  };
}
function wh(t, e, n) {
  return function() {
    var r = e.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, n);
  };
}
function yh(t, e, n) {
  return arguments.length > 1 ? this.each((e == null ? gh : typeof e == "function" ? wh : mh)(t, e, n ?? "")) : Nn(this.node(), t);
}
function Nn(t, e) {
  return t.style.getPropertyValue(e) || ou(t).getComputedStyle(t, null).getPropertyValue(e);
}
function _h(t) {
  return function() {
    delete this[t];
  };
}
function vh(t, e) {
  return function() {
    this[t] = e;
  };
}
function bh(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? delete this[t] : this[t] = n;
  };
}
function xh(t, e) {
  return arguments.length > 1 ? this.each((e == null ? _h : typeof e == "function" ? bh : vh)(t, e)) : this.node()[t];
}
function lu(t) {
  return t.trim().split(/^|\s+/);
}
function Ss(t) {
  return t.classList || new uu(t);
}
function uu(t) {
  this._node = t, this._names = lu(t.getAttribute("class") || "");
}
uu.prototype = {
  add: function(t) {
    var e = this._names.indexOf(t);
    e < 0 && (this._names.push(t), this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function(t) {
    var e = this._names.indexOf(t);
    e >= 0 && (this._names.splice(e, 1), this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function(t) {
    return this._names.indexOf(t) >= 0;
  }
};
function au(t, e) {
  for (var n = Ss(t), r = -1, i = e.length; ++r < i; ) n.add(e[r]);
}
function cu(t, e) {
  for (var n = Ss(t), r = -1, i = e.length; ++r < i; ) n.remove(e[r]);
}
function Eh(t) {
  return function() {
    au(this, t);
  };
}
function Ph(t) {
  return function() {
    cu(this, t);
  };
}
function kh(t, e) {
  return function() {
    (e.apply(this, arguments) ? au : cu)(this, t);
  };
}
function Mh(t, e) {
  var n = lu(t + "");
  if (arguments.length < 2) {
    for (var r = Ss(this.node()), i = -1, s = n.length; ++i < s; ) if (!r.contains(n[i])) return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? kh : e ? Eh : Ph)(n, e));
}
function Sh() {
  this.textContent = "";
}
function Th(t) {
  return function() {
    this.textContent = t;
  };
}
function Nh(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
function Ch(t) {
  return arguments.length ? this.each(t == null ? Sh : (typeof t == "function" ? Nh : Th)(t)) : this.node().textContent;
}
function Lh() {
  this.innerHTML = "";
}
function Rh(t) {
  return function() {
    this.innerHTML = t;
  };
}
function Ih(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function Oh(t) {
  return arguments.length ? this.each(t == null ? Lh : (typeof t == "function" ? Ih : Rh)(t)) : this.node().innerHTML;
}
function $h() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Ah() {
  return this.each($h);
}
function Fh() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function jh() {
  return this.each(Fh);
}
function Bh(t) {
  var e = typeof t == "function" ? t : eu(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function Vh() {
  return null;
}
function zh(t, e) {
  var n = typeof t == "function" ? t : eu(t), r = e == null ? Vh : typeof e == "function" ? e : Ms(e);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function Dh() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function Gh() {
  return this.each(Dh);
}
function Hh() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function qh() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Uh(t) {
  return this.select(t ? qh : Hh);
}
function Wh(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function Kh(t) {
  return function(e) {
    t.call(this, e, this.__data__);
  };
}
function Xh(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var n = "", r = e.indexOf(".");
    return r >= 0 && (n = e.slice(r + 1), e = e.slice(0, r)), { type: e, name: n };
  });
}
function Yh(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var n = 0, r = -1, i = e.length, s; n < i; ++n)
        s = e[n], (!t.type || s.type === t.type) && s.name === t.name ? this.removeEventListener(s.type, s.listener, s.options) : e[++r] = s;
      ++r ? e.length = r : delete this.__on;
    }
  };
}
function Jh(t, e, n) {
  return function() {
    var r = this.__on, i, s = Kh(e);
    if (r) {
      for (var o = 0, l = r.length; o < l; ++o)
        if ((i = r[o]).type === t.type && i.name === t.name) {
          this.removeEventListener(i.type, i.listener, i.options), this.addEventListener(i.type, i.listener = s, i.options = n), i.value = e;
          return;
        }
    }
    this.addEventListener(t.type, s, n), i = { type: t.type, name: t.name, value: e, listener: s, options: n }, r ? r.push(i) : this.__on = [i];
  };
}
function Qh(t, e, n) {
  var r = Xh(t + ""), i, s = r.length, o;
  if (arguments.length < 2) {
    var l = this.node().__on;
    if (l) {
      for (var u = 0, c = l.length, a; u < c; ++u)
        for (i = 0, a = l[u]; i < s; ++i)
          if ((o = r[i]).type === a.type && o.name === a.name)
            return a.value;
    }
    return;
  }
  for (l = e ? Jh : Yh, i = 0; i < s; ++i) this.each(l(r[i], e, n));
  return this;
}
function fu(t, e, n) {
  var r = ou(t), i = r.CustomEvent;
  typeof i == "function" ? i = new i(e, n) : (i = r.document.createEvent("Event"), n ? (i.initEvent(e, n.bubbles, n.cancelable), i.detail = n.detail) : i.initEvent(e, !1, !1)), t.dispatchEvent(i);
}
function Zh(t, e) {
  return function() {
    return fu(this, t, e);
  };
}
function td(t, e) {
  return function() {
    return fu(this, t, e.apply(this, arguments));
  };
}
function ed(t, e) {
  return this.each((typeof e == "function" ? td : Zh)(t, e));
}
function* nd() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, s = r.length, o; i < s; ++i)
      (o = r[i]) && (yield o);
}
var hu = [null];
function le(t, e) {
  this._groups = t, this._parents = e;
}
function or() {
  return new le([[document.documentElement]], hu);
}
function rd() {
  return this;
}
le.prototype = or.prototype = {
  constructor: le,
  select: Nf,
  selectAll: If,
  selectChild: Ff,
  selectChildren: zf,
  filter: Df,
  data: Kf,
  enter: Gf,
  exit: Yf,
  join: Jf,
  merge: Qf,
  selection: rd,
  order: Zf,
  sort: th,
  call: nh,
  nodes: rh,
  node: ih,
  size: sh,
  empty: oh,
  each: lh,
  attr: ph,
  style: yh,
  property: xh,
  classed: Mh,
  text: Ch,
  html: Oh,
  raise: Ah,
  lower: jh,
  append: Bh,
  insert: zh,
  remove: Gh,
  clone: Uh,
  datum: Wh,
  on: Qh,
  dispatch: ed,
  [Symbol.iterator]: nd
};
function Tt(t) {
  return typeof t == "string" ? new le([[document.querySelector(t)]], [document.documentElement]) : new le([[t]], hu);
}
function du(t) {
  let e;
  for (; e = t.sourceEvent; ) t = e;
  return t;
}
function Zt(t, e) {
  if (t = du(t), e === void 0 && (e = t.currentTarget), e) {
    var n = e.ownerSVGElement || e;
    if (n.createSVGPoint) {
      var r = n.createSVGPoint();
      return r.x = t.clientX, r.y = t.clientY, r = r.matrixTransform(e.getScreenCTM().inverse()), [r.x, r.y];
    }
    if (e.getBoundingClientRect) {
      var i = e.getBoundingClientRect();
      return [t.clientX - i.left - e.clientLeft, t.clientY - i.top - e.clientTop];
    }
  }
  return [t.pageX, t.pageY];
}
function id(t, e) {
  return t.target && (t = du(t), e === void 0 && (e = t.currentTarget), t = t.touches || [t]), Array.from(t, (n) => Zt(n, e));
}
const sd = { passive: !1 }, Qn = { capture: !0, passive: !1 };
function Ci(t) {
  t.stopImmediatePropagation();
}
function Pn(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function pu(t) {
  var e = t.document.documentElement, n = Tt(t).on("dragstart.drag", Pn, Qn);
  "onselectstart" in e ? n.on("selectstart.drag", Pn, Qn) : (e.__noselect = e.style.MozUserSelect, e.style.MozUserSelect = "none");
}
function gu(t, e) {
  var n = t.document.documentElement, r = Tt(t).on("dragstart.drag", null);
  e && (r.on("click.drag", Pn, Qn), setTimeout(function() {
    r.on("click.drag", null);
  }, 0)), "onselectstart" in n ? r.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
const yr = (t) => () => t;
function Xi(t, {
  sourceEvent: e,
  subject: n,
  target: r,
  identifier: i,
  active: s,
  x: o,
  y: l,
  dx: u,
  dy: c,
  dispatch: a
}) {
  Object.defineProperties(this, {
    type: { value: t, enumerable: !0, configurable: !0 },
    sourceEvent: { value: e, enumerable: !0, configurable: !0 },
    subject: { value: n, enumerable: !0, configurable: !0 },
    target: { value: r, enumerable: !0, configurable: !0 },
    identifier: { value: i, enumerable: !0, configurable: !0 },
    active: { value: s, enumerable: !0, configurable: !0 },
    x: { value: o, enumerable: !0, configurable: !0 },
    y: { value: l, enumerable: !0, configurable: !0 },
    dx: { value: u, enumerable: !0, configurable: !0 },
    dy: { value: c, enumerable: !0, configurable: !0 },
    _: { value: a }
  });
}
Xi.prototype.on = function() {
  var t = this._.on.apply(this._, arguments);
  return t === this._ ? this : t;
};
function od(t) {
  return !t.ctrlKey && !t.button;
}
function ld() {
  return this.parentNode;
}
function ud(t, e) {
  return e ?? { x: t.x, y: t.y };
}
function ad() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function cd() {
  var t = od, e = ld, n = ud, r = ad, i = {}, s = sr("start", "drag", "end"), o = 0, l, u, c, a, f = 0;
  function h(y) {
    y.on("mousedown.drag", p).filter(r).on("touchstart.drag", w).on("touchmove.drag", d, sd).on("touchend.drag touchcancel.drag", P).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function p(y, M) {
    if (!(a || !t.call(this, y, M))) {
      var R = N(this, e.call(this, y, M), y, M, "mouse");
      R && (Tt(y.view).on("mousemove.drag", m, Qn).on("mouseup.drag", v, Qn), pu(y.view), Ci(y), c = !1, l = y.clientX, u = y.clientY, R("start", y));
    }
  }
  function m(y) {
    if (Pn(y), !c) {
      var M = y.clientX - l, R = y.clientY - u;
      c = M * M + R * R > f;
    }
    i.mouse("drag", y);
  }
  function v(y) {
    Tt(y.view).on("mousemove.drag mouseup.drag", null), gu(y.view, c), Pn(y), i.mouse("end", y);
  }
  function w(y, M) {
    if (t.call(this, y, M)) {
      var R = y.changedTouches, z = e.call(this, y, M), q = R.length, Z, V;
      for (Z = 0; Z < q; ++Z)
        (V = N(this, z, y, M, R[Z].identifier, R[Z])) && (Ci(y), V("start", y, R[Z]));
    }
  }
  function d(y) {
    var M = y.changedTouches, R = M.length, z, q;
    for (z = 0; z < R; ++z)
      (q = i[M[z].identifier]) && (Pn(y), q("drag", y, M[z]));
  }
  function P(y) {
    var M = y.changedTouches, R = M.length, z, q;
    for (a && clearTimeout(a), a = setTimeout(function() {
      a = null;
    }, 500), z = 0; z < R; ++z)
      (q = i[M[z].identifier]) && (Ci(y), q("end", y, M[z]));
  }
  function N(y, M, R, z, q, Z) {
    var V = s.copy(), J = Zt(Z || R, M), ut, U, x;
    if ((x = n.call(y, new Xi("beforestart", {
      sourceEvent: R,
      target: h,
      identifier: q,
      active: o,
      x: J[0],
      y: J[1],
      dx: 0,
      dy: 0,
      dispatch: V
    }), z)) != null)
      return ut = x.x - J[0] || 0, U = x.y - J[1] || 0, function D(T, F, $) {
        var K = J, Y;
        switch (T) {
          case "start":
            i[q] = D, Y = o++;
            break;
          case "end":
            delete i[q], --o;
          case "drag":
            J = Zt($ || F, M), Y = o;
            break;
        }
        V.call(
          T,
          y,
          new Xi(T, {
            sourceEvent: F,
            subject: x,
            target: h,
            identifier: q,
            active: Y,
            x: J[0] + ut,
            y: J[1] + U,
            dx: J[0] - K[0],
            dy: J[1] - K[1],
            dispatch: V
          }),
          z
        );
      };
  }
  return h.filter = function(y) {
    return arguments.length ? (t = typeof y == "function" ? y : yr(!!y), h) : t;
  }, h.container = function(y) {
    return arguments.length ? (e = typeof y == "function" ? y : yr(y), h) : e;
  }, h.subject = function(y) {
    return arguments.length ? (n = typeof y == "function" ? y : yr(y), h) : n;
  }, h.touchable = function(y) {
    return arguments.length ? (r = typeof y == "function" ? y : yr(!!y), h) : r;
  }, h.on = function() {
    var y = s.on.apply(s, arguments);
    return y === s ? h : y;
  }, h.clickDistance = function(y) {
    return arguments.length ? (f = (y = +y) * y, h) : Math.sqrt(f);
  }, h;
}
function Ts(t, e, n) {
  t.prototype = e.prototype = n, n.constructor = t;
}
function mu(t, e) {
  var n = Object.create(t.prototype);
  for (var r in e) n[r] = e[r];
  return n;
}
function lr() {
}
var Zn = 0.7, Wr = 1 / Zn, kn = "\\s*([+-]?\\d+)\\s*", tr = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Se = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", fd = /^#([0-9a-f]{3,8})$/, hd = new RegExp(`^rgb\\(${kn},${kn},${kn}\\)$`), dd = new RegExp(`^rgb\\(${Se},${Se},${Se}\\)$`), pd = new RegExp(`^rgba\\(${kn},${kn},${kn},${tr}\\)$`), gd = new RegExp(`^rgba\\(${Se},${Se},${Se},${tr}\\)$`), md = new RegExp(`^hsl\\(${tr},${Se},${Se}\\)$`), wd = new RegExp(`^hsla\\(${tr},${Se},${Se},${tr}\\)$`), To = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
Ts(lr, fn, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: No,
  // Deprecated! Use color.formatHex.
  formatHex: No,
  formatHex8: yd,
  formatHsl: _d,
  formatRgb: Co,
  toString: Co
});
function No() {
  return this.rgb().formatHex();
}
function yd() {
  return this.rgb().formatHex8();
}
function _d() {
  return wu(this).formatHsl();
}
function Co() {
  return this.rgb().formatRgb();
}
function fn(t) {
  var e, n;
  return t = (t + "").trim().toLowerCase(), (e = fd.exec(t)) ? (n = e[1].length, e = parseInt(e[1], 16), n === 6 ? Lo(e) : n === 3 ? new te(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : n === 8 ? _r(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : n === 4 ? _r(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = hd.exec(t)) ? new te(e[1], e[2], e[3], 1) : (e = dd.exec(t)) ? new te(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = pd.exec(t)) ? _r(e[1], e[2], e[3], e[4]) : (e = gd.exec(t)) ? _r(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = md.exec(t)) ? Oo(e[1], e[2] / 100, e[3] / 100, 1) : (e = wd.exec(t)) ? Oo(e[1], e[2] / 100, e[3] / 100, e[4]) : To.hasOwnProperty(t) ? Lo(To[t]) : t === "transparent" ? new te(NaN, NaN, NaN, 0) : null;
}
function Lo(t) {
  return new te(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function _r(t, e, n, r) {
  return r <= 0 && (t = e = n = NaN), new te(t, e, n, r);
}
function vd(t) {
  return t instanceof lr || (t = fn(t)), t ? (t = t.rgb(), new te(t.r, t.g, t.b, t.opacity)) : new te();
}
function Yi(t, e, n, r) {
  return arguments.length === 1 ? vd(t) : new te(t, e, n, r ?? 1);
}
function te(t, e, n, r) {
  this.r = +t, this.g = +e, this.b = +n, this.opacity = +r;
}
Ts(te, Yi, mu(lr, {
  brighter(t) {
    return t = t == null ? Wr : Math.pow(Wr, t), new te(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Zn : Math.pow(Zn, t), new te(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new te(cn(this.r), cn(this.g), cn(this.b), Kr(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Ro,
  // Deprecated! Use color.formatHex.
  formatHex: Ro,
  formatHex8: bd,
  formatRgb: Io,
  toString: Io
}));
function Ro() {
  return `#${ln(this.r)}${ln(this.g)}${ln(this.b)}`;
}
function bd() {
  return `#${ln(this.r)}${ln(this.g)}${ln(this.b)}${ln((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Io() {
  const t = Kr(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${cn(this.r)}, ${cn(this.g)}, ${cn(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function Kr(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function cn(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function ln(t) {
  return t = cn(t), (t < 16 ? "0" : "") + t.toString(16);
}
function Oo(t, e, n, r) {
  return r <= 0 ? t = e = n = NaN : n <= 0 || n >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new me(t, e, n, r);
}
function wu(t) {
  if (t instanceof me) return new me(t.h, t.s, t.l, t.opacity);
  if (t instanceof lr || (t = fn(t)), !t) return new me();
  if (t instanceof me) return t;
  t = t.rgb();
  var e = t.r / 255, n = t.g / 255, r = t.b / 255, i = Math.min(e, n, r), s = Math.max(e, n, r), o = NaN, l = s - i, u = (s + i) / 2;
  return l ? (e === s ? o = (n - r) / l + (n < r) * 6 : n === s ? o = (r - e) / l + 2 : o = (e - n) / l + 4, l /= u < 0.5 ? s + i : 2 - s - i, o *= 60) : l = u > 0 && u < 1 ? 0 : o, new me(o, l, u, t.opacity);
}
function xd(t, e, n, r) {
  return arguments.length === 1 ? wu(t) : new me(t, e, n, r ?? 1);
}
function me(t, e, n, r) {
  this.h = +t, this.s = +e, this.l = +n, this.opacity = +r;
}
Ts(me, xd, mu(lr, {
  brighter(t) {
    return t = t == null ? Wr : Math.pow(Wr, t), new me(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Zn : Math.pow(Zn, t), new me(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, e = isNaN(t) || isNaN(this.s) ? 0 : this.s, n = this.l, r = n + (n < 0.5 ? n : 1 - n) * e, i = 2 * n - r;
    return new te(
      Li(t >= 240 ? t - 240 : t + 120, i, r),
      Li(t, i, r),
      Li(t < 120 ? t + 240 : t - 120, i, r),
      this.opacity
    );
  },
  clamp() {
    return new me($o(this.h), vr(this.s), vr(this.l), Kr(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = Kr(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${$o(this.h)}, ${vr(this.s) * 100}%, ${vr(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function $o(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function vr(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function Li(t, e, n) {
  return (t < 60 ? e + (n - e) * t / 60 : t < 180 ? n : t < 240 ? e + (n - e) * (240 - t) / 60 : e) * 255;
}
const Ns = (t) => () => t;
function Ed(t, e) {
  return function(n) {
    return t + n * e;
  };
}
function Pd(t, e, n) {
  return t = Math.pow(t, n), e = Math.pow(e, n) - t, n = 1 / n, function(r) {
    return Math.pow(t + r * e, n);
  };
}
function kd(t) {
  return (t = +t) == 1 ? yu : function(e, n) {
    return n - e ? Pd(e, n, t) : Ns(isNaN(e) ? n : e);
  };
}
function yu(t, e) {
  var n = e - t;
  return n ? Ed(t, n) : Ns(isNaN(t) ? e : t);
}
const Xr = function t(e) {
  var n = kd(e);
  function r(i, s) {
    var o = n((i = Yi(i)).r, (s = Yi(s)).r), l = n(i.g, s.g), u = n(i.b, s.b), c = yu(i.opacity, s.opacity);
    return function(a) {
      return i.r = o(a), i.g = l(a), i.b = u(a), i.opacity = c(a), i + "";
    };
  }
  return r.gamma = t, r;
}(1);
function Md(t, e) {
  e || (e = []);
  var n = t ? Math.min(e.length, t.length) : 0, r = e.slice(), i;
  return function(s) {
    for (i = 0; i < n; ++i) r[i] = t[i] * (1 - s) + e[i] * s;
    return r;
  };
}
function Sd(t) {
  return ArrayBuffer.isView(t) && !(t instanceof DataView);
}
function Td(t, e) {
  var n = e ? e.length : 0, r = t ? Math.min(n, t.length) : 0, i = new Array(r), s = new Array(n), o;
  for (o = 0; o < r; ++o) i[o] = Cs(t[o], e[o]);
  for (; o < n; ++o) s[o] = e[o];
  return function(l) {
    for (o = 0; o < r; ++o) s[o] = i[o](l);
    return s;
  };
}
function Nd(t, e) {
  var n = /* @__PURE__ */ new Date();
  return t = +t, e = +e, function(r) {
    return n.setTime(t * (1 - r) + e * r), n;
  };
}
function Pe(t, e) {
  return t = +t, e = +e, function(n) {
    return t * (1 - n) + e * n;
  };
}
function Cd(t, e) {
  var n = {}, r = {}, i;
  (t === null || typeof t != "object") && (t = {}), (e === null || typeof e != "object") && (e = {});
  for (i in e)
    i in t ? n[i] = Cs(t[i], e[i]) : r[i] = e[i];
  return function(s) {
    for (i in n) r[i] = n[i](s);
    return r;
  };
}
var Ji = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Ri = new RegExp(Ji.source, "g");
function Ld(t) {
  return function() {
    return t;
  };
}
function Rd(t) {
  return function(e) {
    return t(e) + "";
  };
}
function _u(t, e) {
  var n = Ji.lastIndex = Ri.lastIndex = 0, r, i, s, o = -1, l = [], u = [];
  for (t = t + "", e = e + ""; (r = Ji.exec(t)) && (i = Ri.exec(e)); )
    (s = i.index) > n && (s = e.slice(n, s), l[o] ? l[o] += s : l[++o] = s), (r = r[0]) === (i = i[0]) ? l[o] ? l[o] += i : l[++o] = i : (l[++o] = null, u.push({ i: o, x: Pe(r, i) })), n = Ri.lastIndex;
  return n < e.length && (s = e.slice(n), l[o] ? l[o] += s : l[++o] = s), l.length < 2 ? u[0] ? Rd(u[0].x) : Ld(e) : (e = u.length, function(c) {
    for (var a = 0, f; a < e; ++a) l[(f = u[a]).i] = f.x(c);
    return l.join("");
  });
}
function Cs(t, e) {
  var n = typeof e, r;
  return e == null || n === "boolean" ? Ns(e) : (n === "number" ? Pe : n === "string" ? (r = fn(e)) ? (e = r, Xr) : _u : e instanceof fn ? Xr : e instanceof Date ? Nd : Sd(e) ? Md : Array.isArray(e) ? Td : typeof e.valueOf != "function" && typeof e.toString != "function" || isNaN(e) ? Cd : Pe)(t, e);
}
var Ao = 180 / Math.PI, Qi = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function vu(t, e, n, r, i, s) {
  var o, l, u;
  return (o = Math.sqrt(t * t + e * e)) && (t /= o, e /= o), (u = t * n + e * r) && (n -= t * u, r -= e * u), (l = Math.sqrt(n * n + r * r)) && (n /= l, r /= l, u /= l), t * r < e * n && (t = -t, e = -e, u = -u, o = -o), {
    translateX: i,
    translateY: s,
    rotate: Math.atan2(e, t) * Ao,
    skewX: Math.atan(u) * Ao,
    scaleX: o,
    scaleY: l
  };
}
var br;
function Id(t) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return e.isIdentity ? Qi : vu(e.a, e.b, e.c, e.d, e.e, e.f);
}
function Od(t) {
  return t == null || (br || (br = document.createElementNS("http://www.w3.org/2000/svg", "g")), br.setAttribute("transform", t), !(t = br.transform.baseVal.consolidate())) ? Qi : (t = t.matrix, vu(t.a, t.b, t.c, t.d, t.e, t.f));
}
function bu(t, e, n, r) {
  function i(c) {
    return c.length ? c.pop() + " " : "";
  }
  function s(c, a, f, h, p, m) {
    if (c !== f || a !== h) {
      var v = p.push("translate(", null, e, null, n);
      m.push({ i: v - 4, x: Pe(c, f) }, { i: v - 2, x: Pe(a, h) });
    } else (f || h) && p.push("translate(" + f + e + h + n);
  }
  function o(c, a, f, h) {
    c !== a ? (c - a > 180 ? a += 360 : a - c > 180 && (c += 360), h.push({ i: f.push(i(f) + "rotate(", null, r) - 2, x: Pe(c, a) })) : a && f.push(i(f) + "rotate(" + a + r);
  }
  function l(c, a, f, h) {
    c !== a ? h.push({ i: f.push(i(f) + "skewX(", null, r) - 2, x: Pe(c, a) }) : a && f.push(i(f) + "skewX(" + a + r);
  }
  function u(c, a, f, h, p, m) {
    if (c !== f || a !== h) {
      var v = p.push(i(p) + "scale(", null, ",", null, ")");
      m.push({ i: v - 4, x: Pe(c, f) }, { i: v - 2, x: Pe(a, h) });
    } else (f !== 1 || h !== 1) && p.push(i(p) + "scale(" + f + "," + h + ")");
  }
  return function(c, a) {
    var f = [], h = [];
    return c = t(c), a = t(a), s(c.translateX, c.translateY, a.translateX, a.translateY, f, h), o(c.rotate, a.rotate, f, h), l(c.skewX, a.skewX, f, h), u(c.scaleX, c.scaleY, a.scaleX, a.scaleY, f, h), c = a = null, function(p) {
      for (var m = -1, v = h.length, w; ++m < v; ) f[(w = h[m]).i] = w.x(p);
      return f.join("");
    };
  };
}
var $d = bu(Id, "px, ", "px)", "deg)"), Ad = bu(Od, ", ", ")", ")"), Fd = 1e-12;
function Fo(t) {
  return ((t = Math.exp(t)) + 1 / t) / 2;
}
function jd(t) {
  return ((t = Math.exp(t)) - 1 / t) / 2;
}
function Bd(t) {
  return ((t = Math.exp(2 * t)) - 1) / (t + 1);
}
const Vd = function t(e, n, r) {
  function i(s, o) {
    var l = s[0], u = s[1], c = s[2], a = o[0], f = o[1], h = o[2], p = a - l, m = f - u, v = p * p + m * m, w, d;
    if (v < Fd)
      d = Math.log(h / c) / e, w = function(z) {
        return [
          l + z * p,
          u + z * m,
          c * Math.exp(e * z * d)
        ];
      };
    else {
      var P = Math.sqrt(v), N = (h * h - c * c + r * v) / (2 * c * n * P), y = (h * h - c * c - r * v) / (2 * h * n * P), M = Math.log(Math.sqrt(N * N + 1) - N), R = Math.log(Math.sqrt(y * y + 1) - y);
      d = (R - M) / e, w = function(z) {
        var q = z * d, Z = Fo(M), V = c / (n * P) * (Z * Bd(e * q + M) - jd(M));
        return [
          l + V * p,
          u + V * m,
          c * Z / Fo(e * q + M)
        ];
      };
    }
    return w.duration = d * 1e3 * e / Math.SQRT2, w;
  }
  return i.rho = function(s) {
    var o = Math.max(1e-3, +s), l = o * o, u = l * l;
    return t(o, l, u);
  }, i;
}(Math.SQRT2, 2, 4);
var Cn = 0, jn = 0, $n = 0, xu = 1e3, Yr, Bn, Jr = 0, hn = 0, mi = 0, er = typeof performance == "object" && performance.now ? performance : Date, Eu = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function Ls() {
  return hn || (Eu(zd), hn = er.now() + mi);
}
function zd() {
  hn = 0;
}
function Qr() {
  this._call = this._time = this._next = null;
}
Qr.prototype = Rs.prototype = {
  constructor: Qr,
  restart: function(t, e, n) {
    if (typeof t != "function") throw new TypeError("callback is not a function");
    n = (n == null ? Ls() : +n) + (e == null ? 0 : +e), !this._next && Bn !== this && (Bn ? Bn._next = this : Yr = this, Bn = this), this._call = t, this._time = n, Zi();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Zi());
  }
};
function Rs(t, e, n) {
  var r = new Qr();
  return r.restart(t, e, n), r;
}
function Dd() {
  Ls(), ++Cn;
  for (var t = Yr, e; t; )
    (e = hn - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
  --Cn;
}
function jo() {
  hn = (Jr = er.now()) + mi, Cn = jn = 0;
  try {
    Dd();
  } finally {
    Cn = 0, Hd(), hn = 0;
  }
}
function Gd() {
  var t = er.now(), e = t - Jr;
  e > xu && (mi -= e, Jr = t);
}
function Hd() {
  for (var t, e = Yr, n, r = 1 / 0; e; )
    e._call ? (r > e._time && (r = e._time), t = e, e = e._next) : (n = e._next, e._next = null, e = t ? t._next = n : Yr = n);
  Bn = t, Zi(r);
}
function Zi(t) {
  if (!Cn) {
    jn && (jn = clearTimeout(jn));
    var e = t - hn;
    e > 24 ? (t < 1 / 0 && (jn = setTimeout(jo, t - er.now() - mi)), $n && ($n = clearInterval($n))) : ($n || (Jr = er.now(), $n = setInterval(Gd, xu)), Cn = 1, Eu(jo));
  }
}
function Bo(t, e, n) {
  var r = new Qr();
  return e = e == null ? 0 : +e, r.restart((i) => {
    r.stop(), t(i + e);
  }, e, n), r;
}
var qd = sr("start", "end", "cancel", "interrupt"), Ud = [], Pu = 0, Vo = 1, ts = 2, Ar = 3, zo = 4, es = 5, Fr = 6;
function wi(t, e, n, r, i, s) {
  var o = t.__transition;
  if (!o) t.__transition = {};
  else if (n in o) return;
  Wd(t, n, {
    name: e,
    index: r,
    // For context during callback.
    group: i,
    // For context during callback.
    on: qd,
    tween: Ud,
    time: s.time,
    delay: s.delay,
    duration: s.duration,
    ease: s.ease,
    timer: null,
    state: Pu
  });
}
function Is(t, e) {
  var n = _e(t, e);
  if (n.state > Pu) throw new Error("too late; already scheduled");
  return n;
}
function Te(t, e) {
  var n = _e(t, e);
  if (n.state > Ar) throw new Error("too late; already running");
  return n;
}
function _e(t, e) {
  var n = t.__transition;
  if (!n || !(n = n[e])) throw new Error("transition not found");
  return n;
}
function Wd(t, e, n) {
  var r = t.__transition, i;
  r[e] = n, n.timer = Rs(s, 0, n.time);
  function s(c) {
    n.state = Vo, n.timer.restart(o, n.delay, n.time), n.delay <= c && o(c - n.delay);
  }
  function o(c) {
    var a, f, h, p;
    if (n.state !== Vo) return u();
    for (a in r)
      if (p = r[a], p.name === n.name) {
        if (p.state === Ar) return Bo(o);
        p.state === zo ? (p.state = Fr, p.timer.stop(), p.on.call("interrupt", t, t.__data__, p.index, p.group), delete r[a]) : +a < e && (p.state = Fr, p.timer.stop(), p.on.call("cancel", t, t.__data__, p.index, p.group), delete r[a]);
      }
    if (Bo(function() {
      n.state === Ar && (n.state = zo, n.timer.restart(l, n.delay, n.time), l(c));
    }), n.state = ts, n.on.call("start", t, t.__data__, n.index, n.group), n.state === ts) {
      for (n.state = Ar, i = new Array(h = n.tween.length), a = 0, f = -1; a < h; ++a)
        (p = n.tween[a].value.call(t, t.__data__, n.index, n.group)) && (i[++f] = p);
      i.length = f + 1;
    }
  }
  function l(c) {
    for (var a = c < n.duration ? n.ease.call(null, c / n.duration) : (n.timer.restart(u), n.state = es, 1), f = -1, h = i.length; ++f < h; )
      i[f].call(t, a);
    n.state === es && (n.on.call("end", t, t.__data__, n.index, n.group), u());
  }
  function u() {
    n.state = Fr, n.timer.stop(), delete r[e];
    for (var c in r) return;
    delete t.__transition;
  }
}
function jr(t, e) {
  var n = t.__transition, r, i, s = !0, o;
  if (n) {
    e = e == null ? null : e + "";
    for (o in n) {
      if ((r = n[o]).name !== e) {
        s = !1;
        continue;
      }
      i = r.state > ts && r.state < es, r.state = Fr, r.timer.stop(), r.on.call(i ? "interrupt" : "cancel", t, t.__data__, r.index, r.group), delete n[o];
    }
    s && delete t.__transition;
  }
}
function Kd(t) {
  return this.each(function() {
    jr(this, t);
  });
}
function Xd(t, e) {
  var n, r;
  return function() {
    var i = Te(this, t), s = i.tween;
    if (s !== n) {
      r = n = s;
      for (var o = 0, l = r.length; o < l; ++o)
        if (r[o].name === e) {
          r = r.slice(), r.splice(o, 1);
          break;
        }
    }
    i.tween = r;
  };
}
function Yd(t, e, n) {
  var r, i;
  if (typeof n != "function") throw new Error();
  return function() {
    var s = Te(this, t), o = s.tween;
    if (o !== r) {
      i = (r = o).slice();
      for (var l = { name: e, value: n }, u = 0, c = i.length; u < c; ++u)
        if (i[u].name === e) {
          i[u] = l;
          break;
        }
      u === c && i.push(l);
    }
    s.tween = i;
  };
}
function Jd(t, e) {
  var n = this._id;
  if (t += "", arguments.length < 2) {
    for (var r = _e(this.node(), n).tween, i = 0, s = r.length, o; i < s; ++i)
      if ((o = r[i]).name === t)
        return o.value;
    return null;
  }
  return this.each((e == null ? Xd : Yd)(n, t, e));
}
function Os(t, e, n) {
  var r = t._id;
  return t.each(function() {
    var i = Te(this, r);
    (i.value || (i.value = {}))[e] = n.apply(this, arguments);
  }), function(i) {
    return _e(i, r).value[e];
  };
}
function ku(t, e) {
  var n;
  return (typeof e == "number" ? Pe : e instanceof fn ? Xr : (n = fn(e)) ? (e = n, Xr) : _u)(t, e);
}
function Qd(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Zd(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function tp(t, e, n) {
  var r, i = n + "", s;
  return function() {
    var o = this.getAttribute(t);
    return o === i ? null : o === r ? s : s = e(r = o, n);
  };
}
function ep(t, e, n) {
  var r, i = n + "", s;
  return function() {
    var o = this.getAttributeNS(t.space, t.local);
    return o === i ? null : o === r ? s : s = e(r = o, n);
  };
}
function np(t, e, n) {
  var r, i, s;
  return function() {
    var o, l = n(this), u;
    return l == null ? void this.removeAttribute(t) : (o = this.getAttribute(t), u = l + "", o === u ? null : o === r && u === i ? s : (i = u, s = e(r = o, l)));
  };
}
function rp(t, e, n) {
  var r, i, s;
  return function() {
    var o, l = n(this), u;
    return l == null ? void this.removeAttributeNS(t.space, t.local) : (o = this.getAttributeNS(t.space, t.local), u = l + "", o === u ? null : o === r && u === i ? s : (i = u, s = e(r = o, l)));
  };
}
function ip(t, e) {
  var n = gi(t), r = n === "transform" ? Ad : ku;
  return this.attrTween(t, typeof e == "function" ? (n.local ? rp : np)(n, r, Os(this, "attr." + t, e)) : e == null ? (n.local ? Zd : Qd)(n) : (n.local ? ep : tp)(n, r, e));
}
function sp(t, e) {
  return function(n) {
    this.setAttribute(t, e.call(this, n));
  };
}
function op(t, e) {
  return function(n) {
    this.setAttributeNS(t.space, t.local, e.call(this, n));
  };
}
function lp(t, e) {
  var n, r;
  function i() {
    var s = e.apply(this, arguments);
    return s !== r && (n = (r = s) && op(t, s)), n;
  }
  return i._value = e, i;
}
function up(t, e) {
  var n, r;
  function i() {
    var s = e.apply(this, arguments);
    return s !== r && (n = (r = s) && sp(t, s)), n;
  }
  return i._value = e, i;
}
function ap(t, e) {
  var n = "attr." + t;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (e == null) return this.tween(n, null);
  if (typeof e != "function") throw new Error();
  var r = gi(t);
  return this.tween(n, (r.local ? lp : up)(r, e));
}
function cp(t, e) {
  return function() {
    Is(this, t).delay = +e.apply(this, arguments);
  };
}
function fp(t, e) {
  return e = +e, function() {
    Is(this, t).delay = e;
  };
}
function hp(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? cp : fp)(e, t)) : _e(this.node(), e).delay;
}
function dp(t, e) {
  return function() {
    Te(this, t).duration = +e.apply(this, arguments);
  };
}
function pp(t, e) {
  return e = +e, function() {
    Te(this, t).duration = e;
  };
}
function gp(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? dp : pp)(e, t)) : _e(this.node(), e).duration;
}
function mp(t, e) {
  if (typeof e != "function") throw new Error();
  return function() {
    Te(this, t).ease = e;
  };
}
function wp(t) {
  var e = this._id;
  return arguments.length ? this.each(mp(e, t)) : _e(this.node(), e).ease;
}
function yp(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    Te(this, t).ease = n;
  };
}
function _p(t) {
  if (typeof t != "function") throw new Error();
  return this.each(yp(this._id, t));
}
function vp(t) {
  typeof t != "function" && (t = ru(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var s = e[i], o = s.length, l = r[i] = [], u, c = 0; c < o; ++c)
      (u = s[c]) && t.call(u, u.__data__, c, s) && l.push(u);
  return new Oe(r, this._parents, this._name, this._id);
}
function bp(t) {
  if (t._id !== this._id) throw new Error();
  for (var e = this._groups, n = t._groups, r = e.length, i = n.length, s = Math.min(r, i), o = new Array(r), l = 0; l < s; ++l)
    for (var u = e[l], c = n[l], a = u.length, f = o[l] = new Array(a), h, p = 0; p < a; ++p)
      (h = u[p] || c[p]) && (f[p] = h);
  for (; l < r; ++l)
    o[l] = e[l];
  return new Oe(o, this._parents, this._name, this._id);
}
function xp(t) {
  return (t + "").trim().split(/^|\s+/).every(function(e) {
    var n = e.indexOf(".");
    return n >= 0 && (e = e.slice(0, n)), !e || e === "start";
  });
}
function Ep(t, e, n) {
  var r, i, s = xp(e) ? Is : Te;
  return function() {
    var o = s(this, t), l = o.on;
    l !== r && (i = (r = l).copy()).on(e, n), o.on = i;
  };
}
function Pp(t, e) {
  var n = this._id;
  return arguments.length < 2 ? _e(this.node(), n).on.on(t) : this.each(Ep(n, t, e));
}
function kp(t) {
  return function() {
    var e = this.parentNode;
    for (var n in this.__transition) if (+n !== t) return;
    e && e.removeChild(this);
  };
}
function Mp() {
  return this.on("end.remove", kp(this._id));
}
function Sp(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = Ms(t));
  for (var r = this._groups, i = r.length, s = new Array(i), o = 0; o < i; ++o)
    for (var l = r[o], u = l.length, c = s[o] = new Array(u), a, f, h = 0; h < u; ++h)
      (a = l[h]) && (f = t.call(a, a.__data__, h, l)) && ("__data__" in a && (f.__data__ = a.__data__), c[h] = f, wi(c[h], e, n, h, c, _e(a, n)));
  return new Oe(s, this._parents, e, n);
}
function Tp(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = nu(t));
  for (var r = this._groups, i = r.length, s = [], o = [], l = 0; l < i; ++l)
    for (var u = r[l], c = u.length, a, f = 0; f < c; ++f)
      if (a = u[f]) {
        for (var h = t.call(a, a.__data__, f, u), p, m = _e(a, n), v = 0, w = h.length; v < w; ++v)
          (p = h[v]) && wi(p, e, n, v, h, m);
        s.push(h), o.push(a);
      }
  return new Oe(s, o, e, n);
}
var Np = or.prototype.constructor;
function Cp() {
  return new Np(this._groups, this._parents);
}
function Lp(t, e) {
  var n, r, i;
  return function() {
    var s = Nn(this, t), o = (this.style.removeProperty(t), Nn(this, t));
    return s === o ? null : s === n && o === r ? i : i = e(n = s, r = o);
  };
}
function Mu(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Rp(t, e, n) {
  var r, i = n + "", s;
  return function() {
    var o = Nn(this, t);
    return o === i ? null : o === r ? s : s = e(r = o, n);
  };
}
function Ip(t, e, n) {
  var r, i, s;
  return function() {
    var o = Nn(this, t), l = n(this), u = l + "";
    return l == null && (u = l = (this.style.removeProperty(t), Nn(this, t))), o === u ? null : o === r && u === i ? s : (i = u, s = e(r = o, l));
  };
}
function Op(t, e) {
  var n, r, i, s = "style." + e, o = "end." + s, l;
  return function() {
    var u = Te(this, t), c = u.on, a = u.value[s] == null ? l || (l = Mu(e)) : void 0;
    (c !== n || i !== a) && (r = (n = c).copy()).on(o, i = a), u.on = r;
  };
}
function $p(t, e, n) {
  var r = (t += "") == "transform" ? $d : ku;
  return e == null ? this.styleTween(t, Lp(t, r)).on("end.style." + t, Mu(t)) : typeof e == "function" ? this.styleTween(t, Ip(t, r, Os(this, "style." + t, e))).each(Op(this._id, t)) : this.styleTween(t, Rp(t, r, e), n).on("end.style." + t, null);
}
function Ap(t, e, n) {
  return function(r) {
    this.style.setProperty(t, e.call(this, r), n);
  };
}
function Fp(t, e, n) {
  var r, i;
  function s() {
    var o = e.apply(this, arguments);
    return o !== i && (r = (i = o) && Ap(t, o, n)), r;
  }
  return s._value = e, s;
}
function jp(t, e, n) {
  var r = "style." + (t += "");
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (e == null) return this.tween(r, null);
  if (typeof e != "function") throw new Error();
  return this.tween(r, Fp(t, e, n ?? ""));
}
function Bp(t) {
  return function() {
    this.textContent = t;
  };
}
function Vp(t) {
  return function() {
    var e = t(this);
    this.textContent = e ?? "";
  };
}
function zp(t) {
  return this.tween("text", typeof t == "function" ? Vp(Os(this, "text", t)) : Bp(t == null ? "" : t + ""));
}
function Dp(t) {
  return function(e) {
    this.textContent = t.call(this, e);
  };
}
function Gp(t) {
  var e, n;
  function r() {
    var i = t.apply(this, arguments);
    return i !== n && (e = (n = i) && Dp(i)), e;
  }
  return r._value = t, r;
}
function Hp(t) {
  var e = "text";
  if (arguments.length < 1) return (e = this.tween(e)) && e._value;
  if (t == null) return this.tween(e, null);
  if (typeof t != "function") throw new Error();
  return this.tween(e, Gp(t));
}
function qp() {
  for (var t = this._name, e = this._id, n = Su(), r = this._groups, i = r.length, s = 0; s < i; ++s)
    for (var o = r[s], l = o.length, u, c = 0; c < l; ++c)
      if (u = o[c]) {
        var a = _e(u, e);
        wi(u, t, n, c, o, {
          time: a.time + a.delay + a.duration,
          delay: 0,
          duration: a.duration,
          ease: a.ease
        });
      }
  return new Oe(r, this._parents, t, n);
}
function Up() {
  var t, e, n = this, r = n._id, i = n.size();
  return new Promise(function(s, o) {
    var l = { value: o }, u = { value: function() {
      --i === 0 && s();
    } };
    n.each(function() {
      var c = Te(this, r), a = c.on;
      a !== t && (e = (t = a).copy(), e._.cancel.push(l), e._.interrupt.push(l), e._.end.push(u)), c.on = e;
    }), i === 0 && s();
  });
}
var Wp = 0;
function Oe(t, e, n, r) {
  this._groups = t, this._parents = e, this._name = n, this._id = r;
}
function Su() {
  return ++Wp;
}
var Ce = or.prototype;
Oe.prototype = {
  constructor: Oe,
  select: Sp,
  selectAll: Tp,
  selectChild: Ce.selectChild,
  selectChildren: Ce.selectChildren,
  filter: vp,
  merge: bp,
  selection: Cp,
  transition: qp,
  call: Ce.call,
  nodes: Ce.nodes,
  node: Ce.node,
  size: Ce.size,
  empty: Ce.empty,
  each: Ce.each,
  on: Pp,
  attr: ip,
  attrTween: ap,
  style: $p,
  styleTween: jp,
  text: zp,
  textTween: Hp,
  remove: Mp,
  tween: Jd,
  delay: hp,
  duration: gp,
  ease: wp,
  easeVarying: _p,
  end: Up,
  [Symbol.iterator]: Ce[Symbol.iterator]
};
const Do = (t) => +t;
function Kp(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var Xp = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Kp
};
function Yp(t, e) {
  for (var n; !(n = t.__transition) || !(n = n[e]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${e} not found`);
  return n;
}
function Jp(t) {
  var e, n;
  t instanceof Oe ? (e = t._id, t = t._name) : (e = Su(), (n = Xp).time = Ls(), t = t == null ? null : t + "");
  for (var r = this._groups, i = r.length, s = 0; s < i; ++s)
    for (var o = r[s], l = o.length, u, c = 0; c < l; ++c)
      (u = o[c]) && wi(u, t, e, c, o, n || Yp(u, e));
  return new Oe(r, this._parents, t, e);
}
or.prototype.interrupt = Kd;
or.prototype.transition = Jp;
const ns = Math.PI, rs = 2 * ns, rn = 1e-6, Qp = rs - rn;
function Tu(t) {
  this._ += t[0];
  for (let e = 1, n = t.length; e < n; ++e)
    this._ += arguments[e] + t[e];
}
function Zp(t) {
  let e = Math.floor(t);
  if (!(e >= 0)) throw new Error(`invalid digits: ${t}`);
  if (e > 15) return Tu;
  const n = 10 ** e;
  return function(r) {
    this._ += r[0];
    for (let i = 1, s = r.length; i < s; ++i)
      this._ += Math.round(arguments[i] * n) / n + r[i];
  };
}
class tg {
  constructor(e) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null, this._ = "", this._append = e == null ? Tu : Zp(e);
  }
  moveTo(e, n) {
    this._append`M${this._x0 = this._x1 = +e},${this._y0 = this._y1 = +n}`;
  }
  closePath() {
    this._x1 !== null && (this._x1 = this._x0, this._y1 = this._y0, this._append`Z`);
  }
  lineTo(e, n) {
    this._append`L${this._x1 = +e},${this._y1 = +n}`;
  }
  quadraticCurveTo(e, n, r, i) {
    this._append`Q${+e},${+n},${this._x1 = +r},${this._y1 = +i}`;
  }
  bezierCurveTo(e, n, r, i, s, o) {
    this._append`C${+e},${+n},${+r},${+i},${this._x1 = +s},${this._y1 = +o}`;
  }
  arcTo(e, n, r, i, s) {
    if (e = +e, n = +n, r = +r, i = +i, s = +s, s < 0) throw new Error(`negative radius: ${s}`);
    let o = this._x1, l = this._y1, u = r - e, c = i - n, a = o - e, f = l - n, h = a * a + f * f;
    if (this._x1 === null)
      this._append`M${this._x1 = e},${this._y1 = n}`;
    else if (h > rn) if (!(Math.abs(f * u - c * a) > rn) || !s)
      this._append`L${this._x1 = e},${this._y1 = n}`;
    else {
      let p = r - o, m = i - l, v = u * u + c * c, w = p * p + m * m, d = Math.sqrt(v), P = Math.sqrt(h), N = s * Math.tan((ns - Math.acos((v + h - w) / (2 * d * P))) / 2), y = N / P, M = N / d;
      Math.abs(y - 1) > rn && this._append`L${e + y * a},${n + y * f}`, this._append`A${s},${s},0,0,${+(f * p > a * m)},${this._x1 = e + M * u},${this._y1 = n + M * c}`;
    }
  }
  arc(e, n, r, i, s, o) {
    if (e = +e, n = +n, r = +r, o = !!o, r < 0) throw new Error(`negative radius: ${r}`);
    let l = r * Math.cos(i), u = r * Math.sin(i), c = e + l, a = n + u, f = 1 ^ o, h = o ? i - s : s - i;
    this._x1 === null ? this._append`M${c},${a}` : (Math.abs(this._x1 - c) > rn || Math.abs(this._y1 - a) > rn) && this._append`L${c},${a}`, r && (h < 0 && (h = h % rs + rs), h > Qp ? this._append`A${r},${r},0,1,${f},${e - l},${n - u}A${r},${r},0,1,${f},${this._x1 = c},${this._y1 = a}` : h > rn && this._append`A${r},${r},0,${+(h >= ns)},${f},${this._x1 = e + r * Math.cos(s)},${this._y1 = n + r * Math.sin(s)}`);
  }
  rect(e, n, r, i) {
    this._append`M${this._x0 = this._x1 = +e},${this._y0 = this._y1 = +n}h${r = +r}v${+i}h${-r}Z`;
  }
  toString() {
    return this._;
  }
}
function eg(t) {
  const e = +this._x.call(null, t), n = +this._y.call(null, t);
  return Nu(this.cover(e, n), e, n, t);
}
function Nu(t, e, n, r) {
  if (isNaN(e) || isNaN(n)) return t;
  var i, s = t._root, o = { data: r }, l = t._x0, u = t._y0, c = t._x1, a = t._y1, f, h, p, m, v, w, d, P;
  if (!s) return t._root = o, t;
  for (; s.length; )
    if ((v = e >= (f = (l + c) / 2)) ? l = f : c = f, (w = n >= (h = (u + a) / 2)) ? u = h : a = h, i = s, !(s = s[d = w << 1 | v])) return i[d] = o, t;
  if (p = +t._x.call(null, s.data), m = +t._y.call(null, s.data), e === p && n === m) return o.next = s, i ? i[d] = o : t._root = o, t;
  do
    i = i ? i[d] = new Array(4) : t._root = new Array(4), (v = e >= (f = (l + c) / 2)) ? l = f : c = f, (w = n >= (h = (u + a) / 2)) ? u = h : a = h;
  while ((d = w << 1 | v) === (P = (m >= h) << 1 | p >= f));
  return i[P] = s, i[d] = o, t;
}
function ng(t) {
  var e, n, r = t.length, i, s, o = new Array(r), l = new Array(r), u = 1 / 0, c = 1 / 0, a = -1 / 0, f = -1 / 0;
  for (n = 0; n < r; ++n)
    isNaN(i = +this._x.call(null, e = t[n])) || isNaN(s = +this._y.call(null, e)) || (o[n] = i, l[n] = s, i < u && (u = i), i > a && (a = i), s < c && (c = s), s > f && (f = s));
  if (u > a || c > f) return this;
  for (this.cover(u, c).cover(a, f), n = 0; n < r; ++n)
    Nu(this, o[n], l[n], t[n]);
  return this;
}
function rg(t, e) {
  if (isNaN(t = +t) || isNaN(e = +e)) return this;
  var n = this._x0, r = this._y0, i = this._x1, s = this._y1;
  if (isNaN(n))
    i = (n = Math.floor(t)) + 1, s = (r = Math.floor(e)) + 1;
  else {
    for (var o = i - n || 1, l = this._root, u, c; n > t || t >= i || r > e || e >= s; )
      switch (c = (e < r) << 1 | t < n, u = new Array(4), u[c] = l, l = u, o *= 2, c) {
        case 0:
          i = n + o, s = r + o;
          break;
        case 1:
          n = i - o, s = r + o;
          break;
        case 2:
          i = n + o, r = s - o;
          break;
        case 3:
          n = i - o, r = s - o;
          break;
      }
    this._root && this._root.length && (this._root = l);
  }
  return this._x0 = n, this._y0 = r, this._x1 = i, this._y1 = s, this;
}
function ig() {
  var t = [];
  return this.visit(function(e) {
    if (!e.length) do
      t.push(e.data);
    while (e = e.next);
  }), t;
}
function sg(t) {
  return arguments.length ? this.cover(+t[0][0], +t[0][1]).cover(+t[1][0], +t[1][1]) : isNaN(this._x0) ? void 0 : [[this._x0, this._y0], [this._x1, this._y1]];
}
function Ht(t, e, n, r, i) {
  this.node = t, this.x0 = e, this.y0 = n, this.x1 = r, this.y1 = i;
}
function og(t, e, n) {
  var r, i = this._x0, s = this._y0, o, l, u, c, a = this._x1, f = this._y1, h = [], p = this._root, m, v;
  for (p && h.push(new Ht(p, i, s, a, f)), n == null ? n = 1 / 0 : (i = t - n, s = e - n, a = t + n, f = e + n, n *= n); m = h.pop(); )
    if (!(!(p = m.node) || (o = m.x0) > a || (l = m.y0) > f || (u = m.x1) < i || (c = m.y1) < s))
      if (p.length) {
        var w = (o + u) / 2, d = (l + c) / 2;
        h.push(
          new Ht(p[3], w, d, u, c),
          new Ht(p[2], o, d, w, c),
          new Ht(p[1], w, l, u, d),
          new Ht(p[0], o, l, w, d)
        ), (v = (e >= d) << 1 | t >= w) && (m = h[h.length - 1], h[h.length - 1] = h[h.length - 1 - v], h[h.length - 1 - v] = m);
      } else {
        var P = t - +this._x.call(null, p.data), N = e - +this._y.call(null, p.data), y = P * P + N * N;
        if (y < n) {
          var M = Math.sqrt(n = y);
          i = t - M, s = e - M, a = t + M, f = e + M, r = p.data;
        }
      }
  return r;
}
function lg(t) {
  if (isNaN(a = +this._x.call(null, t)) || isNaN(f = +this._y.call(null, t))) return this;
  var e, n = this._root, r, i, s, o = this._x0, l = this._y0, u = this._x1, c = this._y1, a, f, h, p, m, v, w, d;
  if (!n) return this;
  if (n.length) for (; ; ) {
    if ((m = a >= (h = (o + u) / 2)) ? o = h : u = h, (v = f >= (p = (l + c) / 2)) ? l = p : c = p, e = n, !(n = n[w = v << 1 | m])) return this;
    if (!n.length) break;
    (e[w + 1 & 3] || e[w + 2 & 3] || e[w + 3 & 3]) && (r = e, d = w);
  }
  for (; n.data !== t; ) if (i = n, !(n = n.next)) return this;
  return (s = n.next) && delete n.next, i ? (s ? i.next = s : delete i.next, this) : e ? (s ? e[w] = s : delete e[w], (n = e[0] || e[1] || e[2] || e[3]) && n === (e[3] || e[2] || e[1] || e[0]) && !n.length && (r ? r[d] = n : this._root = n), this) : (this._root = s, this);
}
function ug(t) {
  for (var e = 0, n = t.length; e < n; ++e) this.remove(t[e]);
  return this;
}
function ag() {
  return this._root;
}
function cg() {
  var t = 0;
  return this.visit(function(e) {
    if (!e.length) do
      ++t;
    while (e = e.next);
  }), t;
}
function fg(t) {
  var e = [], n, r = this._root, i, s, o, l, u;
  for (r && e.push(new Ht(r, this._x0, this._y0, this._x1, this._y1)); n = e.pop(); )
    if (!t(r = n.node, s = n.x0, o = n.y0, l = n.x1, u = n.y1) && r.length) {
      var c = (s + l) / 2, a = (o + u) / 2;
      (i = r[3]) && e.push(new Ht(i, c, a, l, u)), (i = r[2]) && e.push(new Ht(i, s, a, c, u)), (i = r[1]) && e.push(new Ht(i, c, o, l, a)), (i = r[0]) && e.push(new Ht(i, s, o, c, a));
    }
  return this;
}
function hg(t) {
  var e = [], n = [], r;
  for (this._root && e.push(new Ht(this._root, this._x0, this._y0, this._x1, this._y1)); r = e.pop(); ) {
    var i = r.node;
    if (i.length) {
      var s, o = r.x0, l = r.y0, u = r.x1, c = r.y1, a = (o + u) / 2, f = (l + c) / 2;
      (s = i[0]) && e.push(new Ht(s, o, l, a, f)), (s = i[1]) && e.push(new Ht(s, a, l, u, f)), (s = i[2]) && e.push(new Ht(s, o, f, a, c)), (s = i[3]) && e.push(new Ht(s, a, f, u, c));
    }
    n.push(r);
  }
  for (; r = n.pop(); )
    t(r.node, r.x0, r.y0, r.x1, r.y1);
  return this;
}
function dg(t) {
  return t[0];
}
function pg(t) {
  return arguments.length ? (this._x = t, this) : this._x;
}
function gg(t) {
  return t[1];
}
function mg(t) {
  return arguments.length ? (this._y = t, this) : this._y;
}
function $s(t, e, n) {
  var r = new As(e ?? dg, n ?? gg, NaN, NaN, NaN, NaN);
  return t == null ? r : r.addAll(t);
}
function As(t, e, n, r, i, s) {
  this._x = t, this._y = e, this._x0 = n, this._y0 = r, this._x1 = i, this._y1 = s, this._root = void 0;
}
function Go(t) {
  for (var e = { data: t.data }, n = e; t = t.next; ) n = n.next = { data: t.data };
  return e;
}
var Wt = $s.prototype = As.prototype;
Wt.copy = function() {
  var t = new As(this._x, this._y, this._x0, this._y0, this._x1, this._y1), e = this._root, n, r;
  if (!e) return t;
  if (!e.length) return t._root = Go(e), t;
  for (n = [{ source: e, target: t._root = new Array(4) }]; e = n.pop(); )
    for (var i = 0; i < 4; ++i)
      (r = e.source[i]) && (r.length ? n.push({ source: r, target: e.target[i] = new Array(4) }) : e.target[i] = Go(r));
  return t;
};
Wt.add = eg;
Wt.addAll = ng;
Wt.cover = rg;
Wt.data = ig;
Wt.extent = sg;
Wt.find = og;
Wt.remove = lg;
Wt.removeAll = ug;
Wt.root = ag;
Wt.size = cg;
Wt.visit = fg;
Wt.visitAfter = hg;
Wt.x = pg;
Wt.y = mg;
function Ut(t) {
  return function() {
    return t;
  };
}
function Ue(t) {
  return (t() - 0.5) * 1e-6;
}
function wg(t) {
  return t.x + t.vx;
}
function yg(t) {
  return t.y + t.vy;
}
function _g(t) {
  var e, n, r, i = 1, s = 1;
  typeof t != "function" && (t = Ut(t == null ? 1 : +t));
  function o() {
    for (var c, a = e.length, f, h, p, m, v, w, d = 0; d < s; ++d)
      for (f = $s(e, wg, yg).visitAfter(l), c = 0; c < a; ++c)
        h = e[c], v = n[h.index], w = v * v, p = h.x + h.vx, m = h.y + h.vy, f.visit(P);
    function P(N, y, M, R, z) {
      var q = N.data, Z = N.r, V = v + Z;
      if (q) {
        if (q.index > h.index) {
          var J = p - q.x - q.vx, ut = m - q.y - q.vy, U = J * J + ut * ut;
          U < V * V && (J === 0 && (J = Ue(r), U += J * J), ut === 0 && (ut = Ue(r), U += ut * ut), U = (V - (U = Math.sqrt(U))) / U * i, h.vx += (J *= U) * (V = (Z *= Z) / (w + Z)), h.vy += (ut *= U) * V, q.vx -= J * (V = 1 - V), q.vy -= ut * V);
        }
        return;
      }
      return y > p + V || R < p - V || M > m + V || z < m - V;
    }
  }
  function l(c) {
    if (c.data) return c.r = n[c.data.index];
    for (var a = c.r = 0; a < 4; ++a)
      c[a] && c[a].r > c.r && (c.r = c[a].r);
  }
  function u() {
    if (e) {
      var c, a = e.length, f;
      for (n = new Array(a), c = 0; c < a; ++c) f = e[c], n[f.index] = +t(f, c, e);
    }
  }
  return o.initialize = function(c, a) {
    e = c, r = a, u();
  }, o.iterations = function(c) {
    return arguments.length ? (s = +c, o) : s;
  }, o.strength = function(c) {
    return arguments.length ? (i = +c, o) : i;
  }, o.radius = function(c) {
    return arguments.length ? (t = typeof c == "function" ? c : Ut(+c), u(), o) : t;
  }, o;
}
function vg(t) {
  return t.index;
}
function Ho(t, e) {
  var n = t.get(e);
  if (!n) throw new Error("node not found: " + e);
  return n;
}
function bg(t) {
  var e = vg, n = f, r, i = Ut(30), s, o, l, u, c, a = 1;
  t == null && (t = []);
  function f(w) {
    return 1 / Math.min(l[w.source.index], l[w.target.index]);
  }
  function h(w) {
    for (var d = 0, P = t.length; d < a; ++d)
      for (var N = 0, y, M, R, z, q, Z, V; N < P; ++N)
        y = t[N], M = y.source, R = y.target, z = R.x + R.vx - M.x - M.vx || Ue(c), q = R.y + R.vy - M.y - M.vy || Ue(c), Z = Math.sqrt(z * z + q * q), Z = (Z - s[N]) / Z * w * r[N], z *= Z, q *= Z, R.vx -= z * (V = u[N]), R.vy -= q * V, M.vx += z * (V = 1 - V), M.vy += q * V;
  }
  function p() {
    if (o) {
      var w, d = o.length, P = t.length, N = new Map(o.map((M, R) => [e(M, R, o), M])), y;
      for (w = 0, l = new Array(d); w < P; ++w)
        y = t[w], y.index = w, typeof y.source != "object" && (y.source = Ho(N, y.source)), typeof y.target != "object" && (y.target = Ho(N, y.target)), l[y.source.index] = (l[y.source.index] || 0) + 1, l[y.target.index] = (l[y.target.index] || 0) + 1;
      for (w = 0, u = new Array(P); w < P; ++w)
        y = t[w], u[w] = l[y.source.index] / (l[y.source.index] + l[y.target.index]);
      r = new Array(P), m(), s = new Array(P), v();
    }
  }
  function m() {
    if (o)
      for (var w = 0, d = t.length; w < d; ++w)
        r[w] = +n(t[w], w, t);
  }
  function v() {
    if (o)
      for (var w = 0, d = t.length; w < d; ++w)
        s[w] = +i(t[w], w, t);
  }
  return h.initialize = function(w, d) {
    o = w, c = d, p();
  }, h.links = function(w) {
    return arguments.length ? (t = w, p(), h) : t;
  }, h.id = function(w) {
    return arguments.length ? (e = w, h) : e;
  }, h.iterations = function(w) {
    return arguments.length ? (a = +w, h) : a;
  }, h.strength = function(w) {
    return arguments.length ? (n = typeof w == "function" ? w : Ut(+w), m(), h) : n;
  }, h.distance = function(w) {
    return arguments.length ? (i = typeof w == "function" ? w : Ut(+w), v(), h) : i;
  }, h;
}
const xg = 1664525, Eg = 1013904223, qo = 4294967296;
function Pg() {
  let t = 1;
  return () => (t = (xg * t + Eg) % qo) / qo;
}
function kg(t) {
  return t.x;
}
function Mg(t) {
  return t.y;
}
var Sg = 10, Tg = Math.PI * (3 - Math.sqrt(5));
function Ng(t) {
  var e, n = 1, r = 1e-3, i = 1 - Math.pow(r, 1 / 300), s = 0, o = 0.6, l = /* @__PURE__ */ new Map(), u = Rs(f), c = sr("tick", "end"), a = Pg();
  t == null && (t = []);
  function f() {
    h(), c.call("tick", e), n < r && (u.stop(), c.call("end", e));
  }
  function h(v) {
    var w, d = t.length, P;
    v === void 0 && (v = 1);
    for (var N = 0; N < v; ++N)
      for (n += (s - n) * i, l.forEach(function(y) {
        y(n);
      }), w = 0; w < d; ++w)
        P = t[w], P.fx == null ? P.x += P.vx *= o : (P.x = P.fx, P.vx = 0), P.fy == null ? P.y += P.vy *= o : (P.y = P.fy, P.vy = 0);
    return e;
  }
  function p() {
    for (var v = 0, w = t.length, d; v < w; ++v) {
      if (d = t[v], d.index = v, d.fx != null && (d.x = d.fx), d.fy != null && (d.y = d.fy), isNaN(d.x) || isNaN(d.y)) {
        var P = Sg * Math.sqrt(0.5 + v), N = v * Tg;
        d.x = P * Math.cos(N), d.y = P * Math.sin(N);
      }
      (isNaN(d.vx) || isNaN(d.vy)) && (d.vx = d.vy = 0);
    }
  }
  function m(v) {
    return v.initialize && v.initialize(t, a), v;
  }
  return p(), e = {
    tick: h,
    restart: function() {
      return u.restart(f), e;
    },
    stop: function() {
      return u.stop(), e;
    },
    nodes: function(v) {
      return arguments.length ? (t = v, p(), l.forEach(m), e) : t;
    },
    alpha: function(v) {
      return arguments.length ? (n = +v, e) : n;
    },
    alphaMin: function(v) {
      return arguments.length ? (r = +v, e) : r;
    },
    alphaDecay: function(v) {
      return arguments.length ? (i = +v, e) : +i;
    },
    alphaTarget: function(v) {
      return arguments.length ? (s = +v, e) : s;
    },
    velocityDecay: function(v) {
      return arguments.length ? (o = 1 - v, e) : 1 - o;
    },
    randomSource: function(v) {
      return arguments.length ? (a = v, l.forEach(m), e) : a;
    },
    force: function(v, w) {
      return arguments.length > 1 ? (w == null ? l.delete(v) : l.set(v, m(w)), e) : l.get(v);
    },
    find: function(v, w, d) {
      var P = 0, N = t.length, y, M, R, z, q;
      for (d == null ? d = 1 / 0 : d *= d, P = 0; P < N; ++P)
        z = t[P], y = v - z.x, M = w - z.y, R = y * y + M * M, R < d && (q = z, d = R);
      return q;
    },
    on: function(v, w) {
      return arguments.length > 1 ? (c.on(v, w), e) : c.on(v);
    }
  };
}
function Cg() {
  var t, e, n, r, i = Ut(-30), s, o = 1, l = 1 / 0, u = 0.81;
  function c(p) {
    var m, v = t.length, w = $s(t, kg, Mg).visitAfter(f);
    for (r = p, m = 0; m < v; ++m) e = t[m], w.visit(h);
  }
  function a() {
    if (t) {
      var p, m = t.length, v;
      for (s = new Array(m), p = 0; p < m; ++p) v = t[p], s[v.index] = +i(v, p, t);
    }
  }
  function f(p) {
    var m = 0, v, w, d = 0, P, N, y;
    if (p.length) {
      for (P = N = y = 0; y < 4; ++y)
        (v = p[y]) && (w = Math.abs(v.value)) && (m += v.value, d += w, P += w * v.x, N += w * v.y);
      p.x = P / d, p.y = N / d;
    } else {
      v = p, v.x = v.data.x, v.y = v.data.y;
      do
        m += s[v.data.index];
      while (v = v.next);
    }
    p.value = m;
  }
  function h(p, m, v, w) {
    if (!p.value) return !0;
    var d = p.x - e.x, P = p.y - e.y, N = w - m, y = d * d + P * P;
    if (N * N / u < y)
      return y < l && (d === 0 && (d = Ue(n), y += d * d), P === 0 && (P = Ue(n), y += P * P), y < o && (y = Math.sqrt(o * y)), e.vx += d * p.value * r / y, e.vy += P * p.value * r / y), !0;
    if (p.length || y >= l) return;
    (p.data !== e || p.next) && (d === 0 && (d = Ue(n), y += d * d), P === 0 && (P = Ue(n), y += P * P), y < o && (y = Math.sqrt(o * y)));
    do
      p.data !== e && (N = s[p.data.index] * r / y, e.vx += d * N, e.vy += P * N);
    while (p = p.next);
  }
  return c.initialize = function(p, m) {
    t = p, n = m, a();
  }, c.strength = function(p) {
    return arguments.length ? (i = typeof p == "function" ? p : Ut(+p), a(), c) : i;
  }, c.distanceMin = function(p) {
    return arguments.length ? (o = p * p, c) : Math.sqrt(o);
  }, c.distanceMax = function(p) {
    return arguments.length ? (l = p * p, c) : Math.sqrt(l);
  }, c.theta = function(p) {
    return arguments.length ? (u = p * p, c) : Math.sqrt(u);
  }, c;
}
function Lg(t) {
  var e = Ut(0.1), n, r, i;
  typeof t != "function" && (t = Ut(t == null ? 0 : +t));
  function s(l) {
    for (var u = 0, c = n.length, a; u < c; ++u)
      a = n[u], a.vx += (i[u] - a.x) * r[u] * l;
  }
  function o() {
    if (n) {
      var l, u = n.length;
      for (r = new Array(u), i = new Array(u), l = 0; l < u; ++l)
        r[l] = isNaN(i[l] = +t(n[l], l, n)) ? 0 : +e(n[l], l, n);
    }
  }
  return s.initialize = function(l) {
    n = l, o();
  }, s.strength = function(l) {
    return arguments.length ? (e = typeof l == "function" ? l : Ut(+l), o(), s) : e;
  }, s.x = function(l) {
    return arguments.length ? (t = typeof l == "function" ? l : Ut(+l), o(), s) : t;
  }, s;
}
function Rg(t) {
  var e = Ut(0.1), n, r, i;
  typeof t != "function" && (t = Ut(t == null ? 0 : +t));
  function s(l) {
    for (var u = 0, c = n.length, a; u < c; ++u)
      a = n[u], a.vy += (i[u] - a.y) * r[u] * l;
  }
  function o() {
    if (n) {
      var l, u = n.length;
      for (r = new Array(u), i = new Array(u), l = 0; l < u; ++l)
        r[l] = isNaN(i[l] = +t(n[l], l, n)) ? 0 : +e(n[l], l, n);
    }
  }
  return s.initialize = function(l) {
    n = l, o();
  }, s.strength = function(l) {
    return arguments.length ? (e = typeof l == "function" ? l : Ut(+l), o(), s) : e;
  }, s.y = function(l) {
    return arguments.length ? (t = typeof l == "function" ? l : Ut(+l), o(), s) : t;
  }, s;
}
function Qt(t) {
  return function() {
    return t;
  };
}
const Uo = Math.abs, At = Math.atan2, tn = Math.cos, Ig = Math.max, Ii = Math.min, xe = Math.sin, _n = Math.sqrt, Yt = 1e-12, nr = Math.PI, Zr = nr / 2, Og = 2 * nr;
function $g(t) {
  return t > 1 ? 0 : t < -1 ? nr : Math.acos(t);
}
function Wo(t) {
  return t >= 1 ? Zr : t <= -1 ? -Zr : Math.asin(t);
}
function Cu(t) {
  let e = 3;
  return t.digits = function(n) {
    if (!arguments.length) return e;
    if (n == null)
      e = null;
    else {
      const r = Math.floor(n);
      if (!(r >= 0)) throw new RangeError(`invalid digits: ${n}`);
      e = r;
    }
    return t;
  }, () => new tg(e);
}
function Ag(t) {
  return t.innerRadius;
}
function Fg(t) {
  return t.outerRadius;
}
function jg(t) {
  return t.startAngle;
}
function Bg(t) {
  return t.endAngle;
}
function Vg(t) {
  return t && t.padAngle;
}
function zg(t, e, n, r, i, s, o, l) {
  var u = n - t, c = r - e, a = o - i, f = l - s, h = f * u - a * c;
  if (!(h * h < Yt))
    return h = (a * (e - s) - f * (t - i)) / h, [t + h * u, e + h * c];
}
function xr(t, e, n, r, i, s, o) {
  var l = t - n, u = e - r, c = (o ? s : -s) / _n(l * l + u * u), a = c * u, f = -c * l, h = t + a, p = e + f, m = n + a, v = r + f, w = (h + m) / 2, d = (p + v) / 2, P = m - h, N = v - p, y = P * P + N * N, M = i - s, R = h * v - m * p, z = (N < 0 ? -1 : 1) * _n(Ig(0, M * M * y - R * R)), q = (R * N - P * z) / y, Z = (-R * P - N * z) / y, V = (R * N + P * z) / y, J = (-R * P + N * z) / y, ut = q - w, U = Z - d, x = V - w, D = J - d;
  return ut * ut + U * U > x * x + D * D && (q = V, Z = J), {
    cx: q,
    cy: Z,
    x01: -a,
    y01: -f,
    x11: q * (i / M - 1),
    y11: Z * (i / M - 1)
  };
}
function Dg() {
  var t = Ag, e = Fg, n = Qt(0), r = null, i = jg, s = Bg, o = Vg, l = null, u = Cu(c);
  function c() {
    var a, f, h = +t.apply(this, arguments), p = +e.apply(this, arguments), m = i.apply(this, arguments) - Zr, v = s.apply(this, arguments) - Zr, w = Uo(v - m), d = v > m;
    if (l || (l = a = u()), p < h && (f = p, p = h, h = f), !(p > Yt)) l.moveTo(0, 0);
    else if (w > Og - Yt)
      l.moveTo(p * tn(m), p * xe(m)), l.arc(0, 0, p, m, v, !d), h > Yt && (l.moveTo(h * tn(v), h * xe(v)), l.arc(0, 0, h, v, m, d));
    else {
      var P = m, N = v, y = m, M = v, R = w, z = w, q = o.apply(this, arguments) / 2, Z = q > Yt && (r ? +r.apply(this, arguments) : _n(h * h + p * p)), V = Ii(Uo(p - h) / 2, +n.apply(this, arguments)), J = V, ut = V, U, x;
      if (Z > Yt) {
        var D = Wo(Z / h * xe(q)), T = Wo(Z / p * xe(q));
        (R -= D * 2) > Yt ? (D *= d ? 1 : -1, y += D, M -= D) : (R = 0, y = M = (m + v) / 2), (z -= T * 2) > Yt ? (T *= d ? 1 : -1, P += T, N -= T) : (z = 0, P = N = (m + v) / 2);
      }
      var F = p * tn(P), $ = p * xe(P), K = h * tn(M), Y = h * xe(M);
      if (V > Yt) {
        var it = p * tn(N), st = p * xe(N), Pt = h * tn(y), wt = h * xe(y), yt;
        if (w < nr)
          if (yt = zg(F, $, Pt, wt, it, st, K, Y)) {
            var _t = F - yt[0], bt = $ - yt[1], kt = it - yt[0], It = st - yt[1], jt = 1 / xe($g((_t * kt + bt * It) / (_n(_t * _t + bt * bt) * _n(kt * kt + It * It))) / 2), ue = _n(yt[0] * yt[0] + yt[1] * yt[1]);
            J = Ii(V, (h - ue) / (jt - 1)), ut = Ii(V, (p - ue) / (jt + 1));
          } else
            J = ut = 0;
      }
      z > Yt ? ut > Yt ? (U = xr(Pt, wt, F, $, p, ut, d), x = xr(it, st, K, Y, p, ut, d), l.moveTo(U.cx + U.x01, U.cy + U.y01), ut < V ? l.arc(U.cx, U.cy, ut, At(U.y01, U.x01), At(x.y01, x.x01), !d) : (l.arc(U.cx, U.cy, ut, At(U.y01, U.x01), At(U.y11, U.x11), !d), l.arc(0, 0, p, At(U.cy + U.y11, U.cx + U.x11), At(x.cy + x.y11, x.cx + x.x11), !d), l.arc(x.cx, x.cy, ut, At(x.y11, x.x11), At(x.y01, x.x01), !d))) : (l.moveTo(F, $), l.arc(0, 0, p, P, N, !d)) : l.moveTo(F, $), !(h > Yt) || !(R > Yt) ? l.lineTo(K, Y) : J > Yt ? (U = xr(K, Y, it, st, h, -J, d), x = xr(F, $, Pt, wt, h, -J, d), l.lineTo(U.cx + U.x01, U.cy + U.y01), J < V ? l.arc(U.cx, U.cy, J, At(U.y01, U.x01), At(x.y01, x.x01), !d) : (l.arc(U.cx, U.cy, J, At(U.y01, U.x01), At(U.y11, U.x11), !d), l.arc(0, 0, h, At(U.cy + U.y11, U.cx + U.x11), At(x.cy + x.y11, x.cx + x.x11), d), l.arc(x.cx, x.cy, J, At(x.y11, x.x11), At(x.y01, x.x01), !d))) : l.arc(0, 0, h, M, y, d);
    }
    if (l.closePath(), a) return l = null, a + "" || null;
  }
  return c.centroid = function() {
    var a = (+t.apply(this, arguments) + +e.apply(this, arguments)) / 2, f = (+i.apply(this, arguments) + +s.apply(this, arguments)) / 2 - nr / 2;
    return [tn(f) * a, xe(f) * a];
  }, c.innerRadius = function(a) {
    return arguments.length ? (t = typeof a == "function" ? a : Qt(+a), c) : t;
  }, c.outerRadius = function(a) {
    return arguments.length ? (e = typeof a == "function" ? a : Qt(+a), c) : e;
  }, c.cornerRadius = function(a) {
    return arguments.length ? (n = typeof a == "function" ? a : Qt(+a), c) : n;
  }, c.padRadius = function(a) {
    return arguments.length ? (r = a == null ? null : typeof a == "function" ? a : Qt(+a), c) : r;
  }, c.startAngle = function(a) {
    return arguments.length ? (i = typeof a == "function" ? a : Qt(+a), c) : i;
  }, c.endAngle = function(a) {
    return arguments.length ? (s = typeof a == "function" ? a : Qt(+a), c) : s;
  }, c.padAngle = function(a) {
    return arguments.length ? (o = typeof a == "function" ? a : Qt(+a), c) : o;
  }, c.context = function(a) {
    return arguments.length ? (l = a ?? null, c) : l;
  }, c;
}
function Gg(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function Lu(t) {
  this._context = t;
}
Lu.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(t, e) {
    switch (t = +t, e = +e, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(t, e) : this._context.moveTo(t, e);
        break;
      case 1:
        this._point = 2;
      default:
        this._context.lineTo(t, e);
        break;
    }
  }
};
function Hg(t) {
  return new Lu(t);
}
function qg(t) {
  return t[0];
}
function Ug(t) {
  return t[1];
}
function Wg(t, e) {
  var n = Qt(!0), r = null, i = Hg, s = null, o = Cu(l);
  t = typeof t == "function" ? t : t === void 0 ? qg : Qt(t), e = typeof e == "function" ? e : e === void 0 ? Ug : Qt(e);
  function l(u) {
    var c, a = (u = Gg(u)).length, f, h = !1, p;
    for (r == null && (s = i(p = o())), c = 0; c <= a; ++c)
      !(c < a && n(f = u[c], c, u)) === h && ((h = !h) ? s.lineStart() : s.lineEnd()), h && s.point(+t(f, c, u), +e(f, c, u));
    if (p) return s = null, p + "" || null;
  }
  return l.x = function(u) {
    return arguments.length ? (t = typeof u == "function" ? u : Qt(+u), l) : t;
  }, l.y = function(u) {
    return arguments.length ? (e = typeof u == "function" ? u : Qt(+u), l) : e;
  }, l.defined = function(u) {
    return arguments.length ? (n = typeof u == "function" ? u : Qt(!!u), l) : n;
  }, l.curve = function(u) {
    return arguments.length ? (i = u, r != null && (s = i(r)), l) : i;
  }, l.context = function(u) {
    return arguments.length ? (u == null ? r = s = null : s = i(r = u), l) : r;
  }, l;
}
const Er = (t) => () => t;
function Kg(t, {
  sourceEvent: e,
  target: n,
  transform: r,
  dispatch: i
}) {
  Object.defineProperties(this, {
    type: { value: t, enumerable: !0, configurable: !0 },
    sourceEvent: { value: e, enumerable: !0, configurable: !0 },
    target: { value: n, enumerable: !0, configurable: !0 },
    transform: { value: r, enumerable: !0, configurable: !0 },
    _: { value: i }
  });
}
function Le(t, e, n) {
  this.k = t, this.x = e, this.y = n;
}
Le.prototype = {
  constructor: Le,
  scale: function(t) {
    return t === 1 ? this : new Le(this.k * t, this.x, this.y);
  },
  translate: function(t, e) {
    return t === 0 & e === 0 ? this : new Le(this.k, this.x + this.k * t, this.y + this.k * e);
  },
  apply: function(t) {
    return [t[0] * this.k + this.x, t[1] * this.k + this.y];
  },
  applyX: function(t) {
    return t * this.k + this.x;
  },
  applyY: function(t) {
    return t * this.k + this.y;
  },
  invert: function(t) {
    return [(t[0] - this.x) / this.k, (t[1] - this.y) / this.k];
  },
  invertX: function(t) {
    return (t - this.x) / this.k;
  },
  invertY: function(t) {
    return (t - this.y) / this.k;
  },
  rescaleX: function(t) {
    return t.copy().domain(t.range().map(this.invertX, this).map(t.invert, t));
  },
  rescaleY: function(t) {
    return t.copy().domain(t.range().map(this.invertY, this).map(t.invert, t));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
var Ru = new Le(1, 0, 0);
Le.prototype;
function Oi(t) {
  t.stopImmediatePropagation();
}
function An(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function Xg(t) {
  return (!t.ctrlKey || t.type === "wheel") && !t.button;
}
function Yg() {
  var t = this;
  return t instanceof SVGElement ? (t = t.ownerSVGElement || t, t.hasAttribute("viewBox") ? (t = t.viewBox.baseVal, [[t.x, t.y], [t.x + t.width, t.y + t.height]]) : [[0, 0], [t.width.baseVal.value, t.height.baseVal.value]]) : [[0, 0], [t.clientWidth, t.clientHeight]];
}
function Ko() {
  return this.__zoom || Ru;
}
function Jg(t) {
  return -t.deltaY * (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 2e-3) * (t.ctrlKey ? 10 : 1);
}
function Qg() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Zg(t, e, n) {
  var r = t.invertX(e[0][0]) - n[0][0], i = t.invertX(e[1][0]) - n[1][0], s = t.invertY(e[0][1]) - n[0][1], o = t.invertY(e[1][1]) - n[1][1];
  return t.translate(
    i > r ? (r + i) / 2 : Math.min(0, r) || Math.max(0, i),
    o > s ? (s + o) / 2 : Math.min(0, s) || Math.max(0, o)
  );
}
function t0() {
  var t = Xg, e = Yg, n = Zg, r = Jg, i = Qg, s = [0, 1 / 0], o = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], l = 250, u = Vd, c = sr("start", "zoom", "end"), a, f, h, p = 500, m = 150, v = 0, w = 10;
  function d(x) {
    x.property("__zoom", Ko).on("wheel.zoom", q, { passive: !1 }).on("mousedown.zoom", Z).on("dblclick.zoom", V).filter(i).on("touchstart.zoom", J).on("touchmove.zoom", ut).on("touchend.zoom touchcancel.zoom", U).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  d.transform = function(x, D, T, F) {
    var $ = x.selection ? x.selection() : x;
    $.property("__zoom", Ko), x !== $ ? M(x, D, T, F) : $.interrupt().each(function() {
      R(this, arguments).event(F).start().zoom(null, typeof D == "function" ? D.apply(this, arguments) : D).end();
    });
  }, d.scaleBy = function(x, D, T, F) {
    d.scaleTo(x, function() {
      var $ = this.__zoom.k, K = typeof D == "function" ? D.apply(this, arguments) : D;
      return $ * K;
    }, T, F);
  }, d.scaleTo = function(x, D, T, F) {
    d.transform(x, function() {
      var $ = e.apply(this, arguments), K = this.__zoom, Y = T == null ? y($) : typeof T == "function" ? T.apply(this, arguments) : T, it = K.invert(Y), st = typeof D == "function" ? D.apply(this, arguments) : D;
      return n(N(P(K, st), Y, it), $, o);
    }, T, F);
  }, d.translateBy = function(x, D, T, F) {
    d.transform(x, function() {
      return n(this.__zoom.translate(
        typeof D == "function" ? D.apply(this, arguments) : D,
        typeof T == "function" ? T.apply(this, arguments) : T
      ), e.apply(this, arguments), o);
    }, null, F);
  }, d.translateTo = function(x, D, T, F, $) {
    d.transform(x, function() {
      var K = e.apply(this, arguments), Y = this.__zoom, it = F == null ? y(K) : typeof F == "function" ? F.apply(this, arguments) : F;
      return n(Ru.translate(it[0], it[1]).scale(Y.k).translate(
        typeof D == "function" ? -D.apply(this, arguments) : -D,
        typeof T == "function" ? -T.apply(this, arguments) : -T
      ), K, o);
    }, F, $);
  };
  function P(x, D) {
    return D = Math.max(s[0], Math.min(s[1], D)), D === x.k ? x : new Le(D, x.x, x.y);
  }
  function N(x, D, T) {
    var F = D[0] - T[0] * x.k, $ = D[1] - T[1] * x.k;
    return F === x.x && $ === x.y ? x : new Le(x.k, F, $);
  }
  function y(x) {
    return [(+x[0][0] + +x[1][0]) / 2, (+x[0][1] + +x[1][1]) / 2];
  }
  function M(x, D, T, F) {
    x.on("start.zoom", function() {
      R(this, arguments).event(F).start();
    }).on("interrupt.zoom end.zoom", function() {
      R(this, arguments).event(F).end();
    }).tween("zoom", function() {
      var $ = this, K = arguments, Y = R($, K).event(F), it = e.apply($, K), st = T == null ? y(it) : typeof T == "function" ? T.apply($, K) : T, Pt = Math.max(it[1][0] - it[0][0], it[1][1] - it[0][1]), wt = $.__zoom, yt = typeof D == "function" ? D.apply($, K) : D, _t = u(wt.invert(st).concat(Pt / wt.k), yt.invert(st).concat(Pt / yt.k));
      return function(bt) {
        if (bt === 1) bt = yt;
        else {
          var kt = _t(bt), It = Pt / kt[2];
          bt = new Le(It, st[0] - kt[0] * It, st[1] - kt[1] * It);
        }
        Y.zoom(null, bt);
      };
    });
  }
  function R(x, D, T) {
    return !T && x.__zooming || new z(x, D);
  }
  function z(x, D) {
    this.that = x, this.args = D, this.active = 0, this.sourceEvent = null, this.extent = e.apply(x, D), this.taps = 0;
  }
  z.prototype = {
    event: function(x) {
      return x && (this.sourceEvent = x), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(x, D) {
      return this.mouse && x !== "mouse" && (this.mouse[1] = D.invert(this.mouse[0])), this.touch0 && x !== "touch" && (this.touch0[1] = D.invert(this.touch0[0])), this.touch1 && x !== "touch" && (this.touch1[1] = D.invert(this.touch1[0])), this.that.__zoom = D, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(x) {
      var D = Tt(this.that).datum();
      c.call(
        x,
        this.that,
        new Kg(x, {
          sourceEvent: this.sourceEvent,
          target: d,
          type: x,
          transform: this.that.__zoom,
          dispatch: c
        }),
        D
      );
    }
  };
  function q(x, ...D) {
    if (!t.apply(this, arguments)) return;
    var T = R(this, D).event(x), F = this.__zoom, $ = Math.max(s[0], Math.min(s[1], F.k * Math.pow(2, r.apply(this, arguments)))), K = Zt(x);
    if (T.wheel)
      (T.mouse[0][0] !== K[0] || T.mouse[0][1] !== K[1]) && (T.mouse[1] = F.invert(T.mouse[0] = K)), clearTimeout(T.wheel);
    else {
      if (F.k === $) return;
      T.mouse = [K, F.invert(K)], jr(this), T.start();
    }
    An(x), T.wheel = setTimeout(Y, m), T.zoom("mouse", n(N(P(F, $), T.mouse[0], T.mouse[1]), T.extent, o));
    function Y() {
      T.wheel = null, T.end();
    }
  }
  function Z(x, ...D) {
    if (h || !t.apply(this, arguments)) return;
    var T = x.currentTarget, F = R(this, D, !0).event(x), $ = Tt(x.view).on("mousemove.zoom", st, !0).on("mouseup.zoom", Pt, !0), K = Zt(x, T), Y = x.clientX, it = x.clientY;
    pu(x.view), Oi(x), F.mouse = [K, this.__zoom.invert(K)], jr(this), F.start();
    function st(wt) {
      if (An(wt), !F.moved) {
        var yt = wt.clientX - Y, _t = wt.clientY - it;
        F.moved = yt * yt + _t * _t > v;
      }
      F.event(wt).zoom("mouse", n(N(F.that.__zoom, F.mouse[0] = Zt(wt, T), F.mouse[1]), F.extent, o));
    }
    function Pt(wt) {
      $.on("mousemove.zoom mouseup.zoom", null), gu(wt.view, F.moved), An(wt), F.event(wt).end();
    }
  }
  function V(x, ...D) {
    if (t.apply(this, arguments)) {
      var T = this.__zoom, F = Zt(x.changedTouches ? x.changedTouches[0] : x, this), $ = T.invert(F), K = T.k * (x.shiftKey ? 0.5 : 2), Y = n(N(P(T, K), F, $), e.apply(this, D), o);
      An(x), l > 0 ? Tt(this).transition().duration(l).call(M, Y, F, x) : Tt(this).call(d.transform, Y, F, x);
    }
  }
  function J(x, ...D) {
    if (t.apply(this, arguments)) {
      var T = x.touches, F = T.length, $ = R(this, D, x.changedTouches.length === F).event(x), K, Y, it, st;
      for (Oi(x), Y = 0; Y < F; ++Y)
        it = T[Y], st = Zt(it, this), st = [st, this.__zoom.invert(st), it.identifier], $.touch0 ? !$.touch1 && $.touch0[2] !== st[2] && ($.touch1 = st, $.taps = 0) : ($.touch0 = st, K = !0, $.taps = 1 + !!a);
      a && (a = clearTimeout(a)), K && ($.taps < 2 && (f = st[0], a = setTimeout(function() {
        a = null;
      }, p)), jr(this), $.start());
    }
  }
  function ut(x, ...D) {
    if (this.__zooming) {
      var T = R(this, D).event(x), F = x.changedTouches, $ = F.length, K, Y, it, st;
      for (An(x), K = 0; K < $; ++K)
        Y = F[K], it = Zt(Y, this), T.touch0 && T.touch0[2] === Y.identifier ? T.touch0[0] = it : T.touch1 && T.touch1[2] === Y.identifier && (T.touch1[0] = it);
      if (Y = T.that.__zoom, T.touch1) {
        var Pt = T.touch0[0], wt = T.touch0[1], yt = T.touch1[0], _t = T.touch1[1], bt = (bt = yt[0] - Pt[0]) * bt + (bt = yt[1] - Pt[1]) * bt, kt = (kt = _t[0] - wt[0]) * kt + (kt = _t[1] - wt[1]) * kt;
        Y = P(Y, Math.sqrt(bt / kt)), it = [(Pt[0] + yt[0]) / 2, (Pt[1] + yt[1]) / 2], st = [(wt[0] + _t[0]) / 2, (wt[1] + _t[1]) / 2];
      } else if (T.touch0) it = T.touch0[0], st = T.touch0[1];
      else return;
      T.zoom("touch", n(N(Y, it, st), T.extent, o));
    }
  }
  function U(x, ...D) {
    if (this.__zooming) {
      var T = R(this, D).event(x), F = x.changedTouches, $ = F.length, K, Y;
      for (Oi(x), h && clearTimeout(h), h = setTimeout(function() {
        h = null;
      }, p), K = 0; K < $; ++K)
        Y = F[K], T.touch0 && T.touch0[2] === Y.identifier ? delete T.touch0 : T.touch1 && T.touch1[2] === Y.identifier && delete T.touch1;
      if (T.touch1 && !T.touch0 && (T.touch0 = T.touch1, delete T.touch1), T.touch0) T.touch0[1] = this.__zoom.invert(T.touch0[0]);
      else if (T.end(), T.taps === 2 && (Y = Zt(Y, this), Math.hypot(f[0] - Y[0], f[1] - Y[1]) < w)) {
        var it = Tt(this).on("dblclick.zoom");
        it && it.apply(this, arguments);
      }
    }
  }
  return d.wheelDelta = function(x) {
    return arguments.length ? (r = typeof x == "function" ? x : Er(+x), d) : r;
  }, d.filter = function(x) {
    return arguments.length ? (t = typeof x == "function" ? x : Er(!!x), d) : t;
  }, d.touchable = function(x) {
    return arguments.length ? (i = typeof x == "function" ? x : Er(!!x), d) : i;
  }, d.extent = function(x) {
    return arguments.length ? (e = typeof x == "function" ? x : Er([[+x[0][0], +x[0][1]], [+x[1][0], +x[1][1]]]), d) : e;
  }, d.scaleExtent = function(x) {
    return arguments.length ? (s[0] = +x[0], s[1] = +x[1], d) : [s[0], s[1]];
  }, d.translateExtent = function(x) {
    return arguments.length ? (o[0][0] = +x[0][0], o[1][0] = +x[1][0], o[0][1] = +x[0][1], o[1][1] = +x[1][1], d) : [[o[0][0], o[0][1]], [o[1][0], o[1][1]]];
  }, d.constrain = function(x) {
    return arguments.length ? (n = x, d) : n;
  }, d.duration = function(x) {
    return arguments.length ? (l = +x, d) : l;
  }, d.interpolate = function(x) {
    return arguments.length ? (u = x, d) : u;
  }, d.on = function() {
    var x = c.on.apply(c, arguments);
    return x === c ? d : x;
  }, d.clickDistance = function(x) {
    return arguments.length ? (v = (x = +x) * x, d) : Math.sqrt(v);
  }, d.tapDistance = function(x) {
    return arguments.length ? (w = +x, d) : w;
  }, d;
}
function e0(t, e) {
  let n = t0().filter((r) => {
    var i;
    return r.button === 0 || ((i = r.touches) == null ? void 0 : i.length) >= 2;
  });
  return n0(n, t, e);
}
function n0(t, e, n) {
  return n ? t.scaleExtent([0.5, 5]).on("zoom", (r) => e(r, !0)) : t.scaleExtent([1, 1]).on("zoom", (r) => e(r, !1));
}
var nt = /* @__PURE__ */ ((t) => (t.CIRCLE = "circle", t.RECTANGLE = "rect", t))(nt || {});
class Mn {
  /**
   * @param id - The internal ID which is used for node referencing.
   * @param idImported - The external ID provided for imported nodes (solely used for the purpose of imported node creation).
   * @param x - The nodes x position
   * @param y - The nodes y position
   * @param label - The nodes label
   * @param color - The color of the node which was set (for default color this is empty)
   * @param shape - The shape of the node
   * @param fixedPosition - A fixed node can't be dragged via GUI and isn't influenced by the simulation forces
   * @param deletable - If the node is deletable via GUI
   * @param labelEditable - If the nodes label is editable via GUI
   * @param allowIncomingLinks - If the node can get new incoming links via GUI
   * @param allowOutgoingLinks - If the node can get new outgoing links via GUI
   */
  constructor(e, n, r, i, s, o, l, u, c, a, f, h) {
    vt(this, "fx");
    vt(this, "fy");
    vt(this, "_fixedPosition");
    vt(this, "_shape");
    this.id = e, this.idImported = n, this.x = r, this.y = i, this.label = s, this.color = o, this.deletable = c, this.labelEditable = a, this.allowIncomingLinks = f, this.allowOutgoingLinks = h, this.shape = l, this.fixedPosition = u;
  }
  set shape(e) {
    this._shape === nt.CIRCLE || this._shape === nt.RECTANGLE ? this._shape = e : this._shape = void 0;
  }
  get shape() {
    return this._shape === nt.CIRCLE || this._shape === nt.RECTANGLE ? this._shape : void 0;
  }
  set fixedPosition(e) {
    var n, r;
    this._fixedPosition = e, this.fx = (n = this.fixedPosition) != null && n.x ? this.x : void 0, this.fy = (r = this.fixedPosition) != null && r.y ? this.y : void 0;
  }
  get fixedPosition() {
    return this._fixedPosition;
  }
}
function r0(t, e) {
  const n = new CustomEvent("nodecreated", {
    detail: {
      node: { id: t.id, label: t.label, x: t.x, y: t.y }
    }
  });
  e.node().dispatchEvent(n);
}
function i0(t, e) {
  const n = new CustomEvent("linkcreated", {
    detail: {
      link: { id: t.id, label: t.label }
    }
  });
  e.node().dispatchEvent(n);
}
function s0(t, e, n) {
  const r = new CustomEvent("nodeclicked", {
    detail: {
      node: { id: t.id, label: t.label, x: t.x, y: t.y },
      button: e
    }
  });
  n.node().dispatchEvent(r);
}
function o0(t, e, n) {
  const r = new CustomEvent("linkclicked", {
    detail: {
      link: { id: t.id, label: t.label },
      button: e
    }
  });
  n.node().dispatchEvent(r);
}
function Pr(t, e) {
  const n = new CustomEvent("nodedeleted", {
    detail: {
      node: { id: t.id, label: t.label, x: t.x, y: t.y }
    }
  });
  e.node().dispatchEvent(n);
}
function en(t, e) {
  const n = new CustomEvent("linkdeleted", {
    detail: {
      link: { id: t.id, label: t.label }
    }
  });
  e.node().dispatchEvent(n);
}
function l0(t, e, n) {
  const r = new CustomEvent("labeledited", {
    detail: {
      parent: { id: t.id },
      label: e
    }
  });
  n.node().dispatchEvent(r);
}
function re(t) {
  t.preventDefault(), t.stopPropagation();
}
function u0(t, e, n, r) {
  const i = r.nodeProps;
  return cd().filter(
    (s, o) => {
      var l, u;
      return s.button === 0 && //left mouse click
      (((l = o.fixedPosition) == null ? void 0 : l.x) !== !0 || ((u = o.fixedPosition) == null ? void 0 : u.y) !== !0);
    }
  ).on("start", (s, o) => {
    var l, u;
    re(s.sourceEvent), s.active === 0 && t.alphaTarget(0.5).restart(), ((l = o.fixedPosition) == null ? void 0 : l.x) !== !0 && (o.fx = o.x), ((u = o.fixedPosition) == null ? void 0 : u.y) !== !0 && (o.fy = o.y);
  }).on("drag", (s, o) => {
    var l, u;
    ((l = o.fixedPosition) == null ? void 0 : l.x) !== !0 && (r.isCanvasBoundToView ? i.shape === nt.CIRCLE ? o.fx = Math.max(i.radius, Math.min(e - i.radius, s.x)) : i.shape === nt.RECTANGLE && (o.fx = Math.max(0, Math.min(e - i.width, s.x))) : o.fx = s.x), ((u = o.fixedPosition) == null ? void 0 : u.y) !== !0 && (r.isCanvasBoundToView ? i.shape === nt.CIRCLE ? o.fy = Math.max(i.radius, Math.min(n - i.radius, s.y)) : i.shape === nt.RECTANGLE && (o.fy = Math.max(0, Math.min(n - i.height, s.y))) : o.fy = s.y);
  }).on("end", (s, o) => {
    var l, u;
    s.active === 0 && t.alphaTarget(0), ((l = o.fixedPosition) == null ? void 0 : l.x) !== !0 && (o.fx = void 0), ((u = o.fixedPosition) == null ? void 0 : u.y) !== !0 && (o.fy = void 0);
  });
}
function a0(t, e, n, r, i) {
  return t.append("svg").attr("class", "graph-controller__graph-canvas").style("background-color", "white").on("pointermove", (o) => n(o)).on("pointerup", (o) => r(o)).on("contextmenu", (o) => re(o)).on("dblclick", (o) => i(o)).call(e).on("dblclick.zoom", null).append("g");
}
var se = /* @__PURE__ */ ((t) => (t.LINE = "LINE", t.LINEREVERSE = "LINE-REVERSE", t.ARC = "ARC", t.ARCREVERSE = "ARC-REVERSE", t.REFLEXIVE = "REFLEXIVE", t))(se || {});
class c0 {
  // eslint-disable-next-line no-useless-constructor
  /**
   *
   * @param source - The links source node
   * @param target - The links target node
   * @param pathType - The path type is relevant for correct rendering in the view. It is set by and gets constantly updated during the simulation.
   * @param label - The link label
   * @param color The color of the node which was set (for default color this is empty)
   * @param deletable - If the link is deletable via GUI
   * @param labelEditable - If the link label is editable via GUI
   */
  constructor(e, n, r, i, s, o, l) {
    vt(this, "id");
    this.source = e, this.target = n, this.pathType = r, this.label = i, this.color = s, this.deletable = o, this.labelEditable = l, this.id = `${e.id}-${n.id}`;
  }
}
function f0(t) {
  return t.append("g").classed("links", !0).selectAll(".graph-controller__link-container");
}
function h0(t) {
  return t.append("g").classed("nodes", !0).selectAll(".graph-controller__node-container");
}
function je(t) {
  let e = [], n = [];
  if (!Array.isArray(t))
    typeof t == "number" ? e = [t] : n = [t];
  else {
    let r = t.map(String);
    n = r.filter((i) => i.includes("-")), e = r.filter((i) => !i.includes("-")).map(Number);
  }
  return [e, n];
}
function kr(t, e) {
  e !== void 0 && (typeof e == "boolean" ? e ? t.fixedPosition = { x: !0, y: !0 } : t.fixedPosition = { x: !1, y: !1 } : mn(["x", "y"], Object.keys(e), !0) && (t.fixedPosition = e, Vn(["x", "y"], Object.keys(e))));
}
function d0(t, e, n) {
  return `
        M 0,${n}
        A ${n},${n} 0 0 1 ${n},0
        H ${t - n}
        A ${n},${n} 0 0 1 ${t},${n}
        V ${e - n}
        A ${n},${n} 0 0 1 ${t - n},${e}
        H ${n}
        A ${n},${n} 0 0 1 0,${e - n}
        Z
    `;
}
function rr(t) {
  return t.replace(/([#.,;:<>+~^$|[\]()%\\ ])/g, "\\$1");
}
function Xo(t) {
  let e = t.target;
  e.hasPointerCapture(t.pointerId) && e.releasePointerCapture(t.pointerId);
}
function p0(t, e, n = 2) {
  const r = Math.abs(t.x - e.x), i = Math.abs(t.y - e.y);
  return r < n && i < n;
}
function Vn(t, e, n) {
  let r = !0;
  return e.forEach((i) => {
    t.includes(
      i
      // we actually just check if the type is keyof
    ) || (r = !1, qe(
      `Option not valid: ${i}`,
      `Use the following: ${t.join(", ")}.`
    ));
  }), r;
}
function mn(t, e, n) {
  let r = !0, i = t.filter((s) => !e.includes(s));
  return i.length > 0 && (r = !1, n && qe("Option missing", `Add: ${i}`)), r;
}
function qe(t, e) {
  console.error(t + `
` + e);
}
function g0(t, e, n, r) {
  if (qn(t, n, e + "-link-arrow", "graph-controller__arrow", !1), qn(
    t,
    n,
    e + "-link-arrow-reverse",
    "graph-controller__arrow",
    !0
  ), qn(
    t,
    n,
    e + "-draggable-link-arrow",
    "graph-controller__arrow draggable",
    !1
  ), r)
    for (let i of r)
      is(t, e, n, i);
}
function is(t, e, n, r) {
  t.select(`#${e}-link-arrow-` + rr(r)).empty() && (qn(
    t,
    n,
    e + "-link-arrow-" + r,
    "graph-controller__arrow " + r,
    !1,
    r
  ), qn(
    t,
    n,
    e + "-link-arrow-reverse-" + r,
    "graph-controller__arrow colored",
    !0,
    r
  ));
}
function $i(t, e, n) {
  t.select(`#${e}-link-arrow-` + rr(n)).select(function() {
    return this.parentNode;
  }).remove(), t.select(`#${e}-link-arrow-reverse-` + rr(n)).select(function() {
    return this.parentNode;
  }).remove();
}
function qn(t, e, n, r, i, s) {
  t.append("defs").append("marker").attr("id", n).attr("viewBox", e.markerPath).attr("refX", e.markerRef).attr("refY", e.markerRef).attr("markerWidth", e.markerBoxSize).attr("markerHeight", e.markerBoxSize).attr("orient", i ? "auto-start-reverse" : "auto").classed(r, !0).append("path").attr("d", `${Wg()(e.arrowPoints)}`).style("fill", s || "");
}
function m0(t) {
  return t.append("path").classed("graph-controller__link draggable hidden", !0).attr("d", "M0,0L0,0");
}
class Yo {
  constructor() {
    vt(this, "nodeIdCounter", 0);
    vt(this, "nodes", []);
    vt(this, "links", []);
  }
  createNode(e, n, r, i, s, o, l = { x: !1, y: !1 }, u = !0, c = !0, a = !0, f = !0) {
    const h = new Mn(
      this.nodeIdCounter++,
      r,
      e,
      n,
      i,
      s,
      o,
      l,
      u,
      c,
      a,
      f
    );
    return this.nodes.push(h), h;
  }
  createLink(e, n, r, i, s = !0, o = !0) {
    if (this.links.find(
      (f) => f.source.id === e && f.target.id === n
    ) !== void 0)
      return;
    const u = this.nodes.find((f) => f.id === e);
    if (u === void 0)
      return;
    const c = this.nodes.find((f) => f.id === n);
    if (c === void 0)
      return;
    const a = new c0(
      u,
      c,
      void 0,
      r,
      i,
      s,
      o
    );
    return this.links.push(a), a;
  }
  removeNode(e) {
    const n = this.nodes.findIndex((i) => i.id === e.id);
    if (n === -1)
      return;
    this.nodes.splice(n, 1);
    const r = this.links.filter(
      (i) => i.source.id === e.id || i.target.id === e.id
    );
    return r.forEach((i) => {
      const s = this.links.indexOf(i, 0);
      this.links.splice(s, 1);
    }), [e, r];
  }
  removeLink(e) {
    const n = this.links.findIndex(
      (r) => r.source.id === e.source.id && r.target.id === e.target.id
    );
    if (n !== -1)
      return this.links.splice(n, 1), e;
  }
  /**
   * Checks if a link in a given (not default) color exists.
   * @param color - Color to check on.
   * @param excludedLinkId - You can optionally exclude one or more links via their ID from this check
   * @returns True if non-default colored links exist, false otherwise.
   */
  hasNonDefaultLinkColor(e, n = "") {
    return this.links.some((r) => r.color === e && r.id !== n);
  }
  /**
   * Get the existing non-default colors of links.
   * @returns An array of strings representing non-default colors, empty if none exist.
   */
  getNonDefaultLinkColors() {
    return this.links.map((e) => e.color).filter((e) => e !== void 0 && e !== "");
  }
  /**
   * Get the link ids of links with provided color.
   * @param color - Color to check on.
   * @param excludedLinkId - You can optionally exclude a link from this check via its ID
   * @returns An array of link IDs that have the provided color (without the excludedLinkId)
   */
  getLinkIdsWithNonDefaultLinkColors(e, n = "") {
    return this.links.filter((r) => r.color === e && r.id !== n).map((r) => r.id);
  }
  /**
   * Determine if a source and a target node have a bidirectional link connection.
   * @param source
   * @param target
   */
  hasBidirectionalConnection(e, n) {
    return e.id !== n.id && this.links.some((r) => r.target.id === e.id && r.source.id === n.id) && this.links.some((r) => r.target.id === n.id && r.source.id === e.id);
  }
  /** Formats the graph in trivial graph format.
   * @param includeNodeLabels if node labels should be included
   * @param includeLinkLabels if link labels should be included
   * @param includeNodeColor TGF normally has no color option, this is just used for internal purposes
   * @param includeLinkColor TGF normally has no color option, this is just used for internal purposes
   * @returns The graph in TGF format
   */
  toTGF(e = !0, n = !0, r = !1, i = !1) {
    if (this.nodes.length === 0 && this.links.length === 0)
      return "";
    let s, o;
    return s = this.nodes.map((l) => {
      let u = `${l.id}`;
      return e && l.label !== void 0 && (u += ` ${l.label}`), r && l.color !== void 0 && (u += ` /COLOR:/${l.color}`), u;
    }).join(`
`), o = this.links.map((l) => {
      let u = `${l.source.id} ${l.target.id}`;
      return n && l.label !== void 0 && (u += ` ${l.label}`), i && l.color !== void 0 && (u += ` /COLOR:/${l.color}`), u;
    }).join(`
`), `${s}${o ? `
#
` : ""}${o}`;
  }
  /** Formats the graph in a json like graph format.
   * @param includeNodeLabels if node labels should be included
   * @param includeLinkLabels if link labels should be included
   * @param includeNodeColor if node color should be included
   * @param includeLinkColor if link color should be included
   * @param includeNodePosition if position should be included
   * @param includeNodeEditability if editability of node via GUI should be included
   * @param includeLinkEditability if editability of link via GUI should be included
   * @returns The graph in JSON format*/
  toJSON(e = !0, n = !0, r = !0, i = !0, s = !0, o = !0, l = !0) {
    let u = this.nodes.map((a) => Object.fromEntries(
      Object.entries(a).filter(([f]) => f === "id" || e && f === "label" || r && f === "color" || s && (f === "x" || f === "y") || o && [
        "fixedPosition",
        "deletable",
        "labelEditable",
        "allowIncomingLinks",
        "allowOutgoingLinks"
      ].includes(f))
    )), c = this.links.map((a) => Object.fromEntries(
      Object.entries(this._convertToJSONLink(a)).filter(([f]) => f === "sourceId" || f === "targetId" || n && f === "label" || i && f === "color" || l && ["deletable", "labelEditable"].includes(f))
    ));
    return JSON.stringify({ nodes: u, links: c }, null, 4);
  }
  _convertToJSONLink(e) {
    let n = e.id.split("-");
    return {
      sourceId: Number(n[0]),
      targetId: Number(n[1]),
      label: e.label,
      color: e.color,
      deletable: e.deletable,
      labelEditable: e.labelEditable
    };
  }
}
function w0(t) {
  var e = +this._x.call(null, t), n = +this._y.call(null, t);
  return Iu(this.cover(e, n), e, n, t);
}
function Iu(t, e, n, r) {
  if (isNaN(e) || isNaN(n)) return t;
  var i, s = t._root, o = { data: r }, l = t._x0, u = t._y0, c = t._x1, a = t._y1, f, h, p, m, v, w, d, P;
  if (!s) return t._root = o, t;
  for (; s.length; )
    if ((v = e >= (f = (l + c) / 2)) ? l = f : c = f, (w = n >= (h = (u + a) / 2)) ? u = h : a = h, i = s, !(s = s[d = w << 1 | v])) return i[d] = o, t;
  if (p = +t._x.call(null, s.data), m = +t._y.call(null, s.data), e === p && n === m) return o.next = s, i ? i[d] = o : t._root = o, t;
  do
    i = i ? i[d] = new Array(4) : t._root = new Array(4), (v = e >= (f = (l + c) / 2)) ? l = f : c = f, (w = n >= (h = (u + a) / 2)) ? u = h : a = h;
  while ((d = w << 1 | v) === (P = (m >= h) << 1 | p >= f));
  return i[P] = s, i[d] = o, t;
}
function y0(t) {
  var e, n, r = t.length, i, s, o = new Array(r), l = new Array(r), u = 1 / 0, c = 1 / 0, a = -1 / 0, f = -1 / 0;
  for (n = 0; n < r; ++n)
    isNaN(i = +this._x.call(null, e = t[n])) || isNaN(s = +this._y.call(null, e)) || (o[n] = i, l[n] = s, i < u && (u = i), i > a && (a = i), s < c && (c = s), s > f && (f = s));
  for (a < u && (u = this._x0, a = this._x1), f < c && (c = this._y0, f = this._y1), this.cover(u, c).cover(a, f), n = 0; n < r; ++n)
    Iu(this, o[n], l[n], t[n]);
  return this;
}
function _0(t, e) {
  if (isNaN(t = +t) || isNaN(e = +e)) return this;
  var n = this._x0, r = this._y0, i = this._x1, s = this._y1;
  if (isNaN(n))
    i = (n = Math.floor(t)) + 1, s = (r = Math.floor(e)) + 1;
  else if (n > t || t > i || r > e || e > s) {
    var o = i - n, l = this._root, u, c;
    switch (c = (e < (r + s) / 2) << 1 | t < (n + i) / 2) {
      case 0: {
        do
          u = new Array(4), u[c] = l, l = u;
        while (o *= 2, i = n + o, s = r + o, t > i || e > s);
        break;
      }
      case 1: {
        do
          u = new Array(4), u[c] = l, l = u;
        while (o *= 2, n = i - o, s = r + o, n > t || e > s);
        break;
      }
      case 2: {
        do
          u = new Array(4), u[c] = l, l = u;
        while (o *= 2, i = n + o, r = s - o, t > i || r > e);
        break;
      }
      case 3: {
        do
          u = new Array(4), u[c] = l, l = u;
        while (o *= 2, n = i - o, r = s - o, n > t || r > e);
        break;
      }
    }
    this._root && this._root.length && (this._root = l);
  } else return this;
  return this._x0 = n, this._y0 = r, this._x1 = i, this._y1 = s, this;
}
function v0() {
  var t = [];
  return this.visit(function(e) {
    if (!e.length) do
      t.push(e.data);
    while (e = e.next);
  }), t;
}
function b0(t) {
  return arguments.length ? this.cover(+t[0][0], +t[0][1]).cover(+t[1][0], +t[1][1]) : isNaN(this._x0) ? void 0 : [[this._x0, this._y0], [this._x1, this._y1]];
}
function qt(t, e, n, r, i) {
  this.node = t, this.x0 = e, this.y0 = n, this.x1 = r, this.y1 = i;
}
function x0(t, e, n) {
  var r, i = this._x0, s = this._y0, o, l, u, c, a = this._x1, f = this._y1, h = [], p = this._root, m, v;
  for (p && h.push(new qt(p, i, s, a, f)), n == null ? n = 1 / 0 : (i = t - n, s = e - n, a = t + n, f = e + n, n *= n); m = h.pop(); )
    if (!(!(p = m.node) || (o = m.x0) > a || (l = m.y0) > f || (u = m.x1) < i || (c = m.y1) < s))
      if (p.length) {
        var w = (o + u) / 2, d = (l + c) / 2;
        h.push(
          new qt(p[3], w, d, u, c),
          new qt(p[2], o, d, w, c),
          new qt(p[1], w, l, u, d),
          new qt(p[0], o, l, w, d)
        ), (v = (e >= d) << 1 | t >= w) && (m = h[h.length - 1], h[h.length - 1] = h[h.length - 1 - v], h[h.length - 1 - v] = m);
      } else {
        var P = t - +this._x.call(null, p.data), N = e - +this._y.call(null, p.data), y = P * P + N * N;
        if (y < n) {
          var M = Math.sqrt(n = y);
          i = t - M, s = e - M, a = t + M, f = e + M, r = p.data;
        }
      }
  return r;
}
function E0(t) {
  if (isNaN(a = +this._x.call(null, t)) || isNaN(f = +this._y.call(null, t))) return this;
  var e, n = this._root, r, i, s, o = this._x0, l = this._y0, u = this._x1, c = this._y1, a, f, h, p, m, v, w, d;
  if (!n) return this;
  if (n.length) for (; ; ) {
    if ((m = a >= (h = (o + u) / 2)) ? o = h : u = h, (v = f >= (p = (l + c) / 2)) ? l = p : c = p, e = n, !(n = n[w = v << 1 | m])) return this;
    if (!n.length) break;
    (e[w + 1 & 3] || e[w + 2 & 3] || e[w + 3 & 3]) && (r = e, d = w);
  }
  for (; n.data !== t; ) if (i = n, !(n = n.next)) return this;
  return (s = n.next) && delete n.next, i ? (s ? i.next = s : delete i.next, this) : e ? (s ? e[w] = s : delete e[w], (n = e[0] || e[1] || e[2] || e[3]) && n === (e[3] || e[2] || e[1] || e[0]) && !n.length && (r ? r[d] = n : this._root = n), this) : (this._root = s, this);
}
function P0(t) {
  for (var e = 0, n = t.length; e < n; ++e) this.remove(t[e]);
  return this;
}
function k0() {
  return this._root;
}
function M0() {
  var t = 0;
  return this.visit(function(e) {
    if (!e.length) do
      ++t;
    while (e = e.next);
  }), t;
}
function S0(t) {
  var e = [], n, r = this._root, i, s, o, l, u;
  for (r && e.push(new qt(r, this._x0, this._y0, this._x1, this._y1)); n = e.pop(); )
    if (!t(r = n.node, s = n.x0, o = n.y0, l = n.x1, u = n.y1) && r.length) {
      var c = (s + l) / 2, a = (o + u) / 2;
      (i = r[3]) && e.push(new qt(i, c, a, l, u)), (i = r[2]) && e.push(new qt(i, s, a, c, u)), (i = r[1]) && e.push(new qt(i, c, o, l, a)), (i = r[0]) && e.push(new qt(i, s, o, c, a));
    }
  return this;
}
function T0(t) {
  var e = [], n = [], r;
  for (this._root && e.push(new qt(this._root, this._x0, this._y0, this._x1, this._y1)); r = e.pop(); ) {
    var i = r.node;
    if (i.length) {
      var s, o = r.x0, l = r.y0, u = r.x1, c = r.y1, a = (o + u) / 2, f = (l + c) / 2;
      (s = i[0]) && e.push(new qt(s, o, l, a, f)), (s = i[1]) && e.push(new qt(s, a, l, u, f)), (s = i[2]) && e.push(new qt(s, o, f, a, c)), (s = i[3]) && e.push(new qt(s, a, f, u, c));
    }
    n.push(r);
  }
  for (; r = n.pop(); )
    t(r.node, r.x0, r.y0, r.x1, r.y1);
  return this;
}
function N0(t) {
  return t[0];
}
function C0(t) {
  return arguments.length ? (this._x = t, this) : this._x;
}
function L0(t) {
  return t[1];
}
function R0(t) {
  return arguments.length ? (this._y = t, this) : this._y;
}
function Ou(t, e, n) {
  var r = new Fs(e ?? N0, n ?? L0, NaN, NaN, NaN, NaN);
  return t == null ? r : r.addAll(t);
}
function Fs(t, e, n, r, i, s) {
  this._x = t, this._y = e, this._x0 = n, this._y0 = r, this._x1 = i, this._y1 = s, this._root = void 0;
}
function Jo(t) {
  for (var e = { data: t.data }, n = e; t = t.next; ) n = n.next = { data: t.data };
  return e;
}
var Kt = Ou.prototype = Fs.prototype;
Kt.copy = function() {
  var t = new Fs(this._x, this._y, this._x0, this._y0, this._x1, this._y1), e = this._root, n, r;
  if (!e) return t;
  if (!e.length) return t._root = Jo(e), t;
  for (n = [{ source: e, target: t._root = new Array(4) }]; e = n.pop(); )
    for (var i = 0; i < 4; ++i)
      (r = e.source[i]) && (r.length ? n.push({ source: r, target: e.target[i] = new Array(4) }) : e.target[i] = Jo(r));
  return t;
};
Kt.add = w0;
Kt.addAll = y0;
Kt.cover = _0;
Kt.data = v0;
Kt.extent = b0;
Kt.find = x0;
Kt.remove = E0;
Kt.removeAll = P0;
Kt.root = k0;
Kt.size = M0;
Kt.visit = S0;
Kt.visitAfter = T0;
Kt.x = C0;
Kt.y = R0;
function I0(t) {
  function e(f) {
    return f.x + f.vx;
  }
  function n(f) {
    return f.y + f.vy;
  }
  function r(f) {
    return function() {
      return f;
    };
  }
  var i, s, o = 1, l = 1;
  typeof t != "function" && (t = r(t === null ? [[0, 0][1]] : t));
  function u() {
    var f, h, p, m, v, w, d, P, N, y, M = [];
    i.forEach(function(V, J) {
      M.push({ node: V, vx: V.vx, vy: V.vy, x: V.x + (s[J][1][0] + s[J][0][0]) / 2, y: V.y + (s[J][0][1] + s[J][1][1]) / 2 }), M.push({ node: V, vx: V.vx, vy: V.vy, x: V.x + s[J][0][0], y: V.y + s[J][0][1] }), M.push({ node: V, vx: V.vx, vy: V.vy, x: V.x + s[J][0][0], y: V.y + s[J][1][1] }), M.push({ node: V, vx: V.vx, vy: V.vy, x: V.x + s[J][1][0], y: V.y + s[J][0][1] }), M.push({ node: V, vx: V.vx, vy: V.vy, x: V.x + s[J][1][0], y: V.y + s[J][1][1] });
    });
    for (var R = M.length, z = 0; z < l; ++z)
      for (h = Ou(M, e, n).visitAfter(c), f = 0; f < R; ++f) {
        var q = ~~(f / 5);
        p = i[q], w = s[q], m = p.x + p.vx, v = p.y + p.vy, d = m + w[0][0], P = v + w[0][1], N = m + w[1][0], y = v + w[1][1], h.visit(Z);
      }
    function Z(V, J, ut, U, x) {
      var D = V.data;
      if (D) {
        var T = a(w, 0), F = a(w, 1);
        if (D.node.index !== q) {
          var $ = D.node, K = s[$.index], Y = $.x + $.vx + K[0][0], it = $.y + $.vy + K[0][1], st = $.x + $.vx + K[1][0], Pt = $.y + $.vy + K[1][1], wt = a(K, 0), yt = a(K, 1);
          if (d <= st && Y <= N && P <= Pt && it <= y) {
            var _t = [Math.min.apply(null, [Y, st, d, N]), Math.max.apply(null, [Y, st, d, N])], bt = [Math.min.apply(null, [it, Pt, P, y]), Math.max.apply(null, [it, Pt, P, y])], kt = T + wt - (_t[1] - _t[0]), It = F + yt - (bt[1] - bt[0]), jt = kt * o * (It / F), ue = It * o * (kt / T), ve = kt * o * (It / yt), _ = It * o * (kt / wt);
            (d + N) / 2 < (Y + st) / 2 ? (p.vx -= jt, $.vx += ve) : (p.vx += jt, $.vx -= ve), (P + y) / 2 < (it + Pt) / 2 ? (p.vy -= ue, $.vy += _) : (p.vy += ue, $.vy -= _);
          }
        }
        return;
      }
      return J > N || U < d || ut > y || x < P;
    }
  }
  function c(f) {
    if (f.data)
      return f.bb = s[f.data.node.index];
    f.bb = [[0, 0], [0, 0]];
    for (var h = 0; h < 4; ++h)
      f[h] && f[h].bb[0][0] < f.bb[0][0] && (f.bb[0][0] = f[h].bb[0][0]), f[h] && f[h].bb[0][1] < f.bb[0][1] && (f.bb[0][1] = f[h].bb[0][1]), f[h] && f[h].bb[1][0] > f.bb[1][0] && (f.bb[1][0] = f[h].bb[1][0]), f[h] && f[h].bb[1][1] > f.bb[1][1] && (f.bb[1][1] = f[h].bb[1][1]);
  }
  function a(f, h) {
    return f[1][h] - f[0][h];
  }
  return u.initialize = function(f) {
    var h, p = (i = f).length;
    for (s = new Array(p), h = 0; h < p; ++h) s[h] = t(i[h], h, i);
  }, u.iterations = function(f) {
    return arguments.length ? (l = +f, u) : l;
  }, u.strength = function(f) {
    return arguments.length ? (o = +f, u) : o;
  }, u.bbox = function(f) {
    return arguments.length ? (t = typeof f == "function" ? f : r(+f), u) : t;
  }, u;
}
function O0(t, e, n, r, i) {
  let s = Ng(t.nodes).on("tick", () => i());
  return s = $0(s, e), e.isCanvasBoundToView && (s = A0(t, s, n, r, e)), s = Au(s, t, e, e.fixedLinkDistanceEnabled), s = $u(s, e.nodePhysicsEnabled, n, r), s;
}
function $0(t, e) {
  if (e.nodeProps.shape === nt.CIRCLE)
    return t.force(
      "collision",
      _g().radius(e.nodeProps.radius)
    );
  if (e.nodeProps.shape === nt.RECTANGLE) {
    let n = I0([
      [-0.5 * e.nodeProps.width, -0.5 * e.nodeProps.height],
      [0.5 * e.nodeProps.width, 0.5 * e.nodeProps.height]
    ]);
    return t.force("collision", n);
  }
  return t;
}
function A0(t, e, n, r, i) {
  return e.force("bounds", () => {
    for (const s of t.nodes)
      i.nodeProps.shape === nt.CIRCLE ? (s.x = Math.max(
        i.nodeProps.radius,
        Math.min(n - i.nodeProps.radius, s.x)
      ), s.y = Math.max(
        i.nodeProps.radius,
        Math.min(r - i.nodeProps.radius, s.y)
      )) : i.nodeProps.shape === nt.RECTANGLE && (s.x = Math.max(0, Math.min(n - i.nodeProps.width, s.x)), s.y = Math.max(0, Math.min(r - i.nodeProps.height, s.y)));
  });
}
function $u(t, e, n, r) {
  return e ? t.force("charge", Cg().strength(-500)).force("x", Lg(n / 2).strength(0.05)).force("y", Rg(r / 2).strength(0.05)) : t.force("charge", null).force("x", null).force("y", null);
}
function Au(t, e, n, r) {
  if (r) {
    let i = 0;
    return n.nodeProps.shape === nt.CIRCLE ? i = n.nodeProps.radius : n.nodeProps.shape === nt.RECTANGLE && (n.nodeProps.width < n.nodeProps.height ? i = n.nodeProps.width / 2 : i = n.nodeProps.height / 2), t.force(
      "link",
      bg().links(e.links).id((s) => s.id).distance(i * 10)
    );
  } else
    return t.force("link", null);
}
const F0 = Object.prototype.toString;
function ti(t) {
  const e = F0.call(t);
  return e.endsWith("Array]") && !e.includes("Big");
}
function j0(t) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (!ti(t))
    throw new TypeError("input must be an array");
  if (t.length === 0)
    throw new TypeError("input must not be empty");
  var n = e.fromIndex, r = n === void 0 ? 0 : n, i = e.toIndex, s = i === void 0 ? t.length : i;
  if (r < 0 || r >= t.length || !Number.isInteger(r))
    throw new Error("fromIndex must be a positive integer smaller than length");
  if (s <= r || s > t.length || !Number.isInteger(s))
    throw new Error("toIndex must be an integer greater than fromIndex and at most equal to length");
  for (var o = t[r], l = r + 1; l < s; l++)
    t[l] > o && (o = t[l]);
  return o;
}
function B0(t) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (!ti(t))
    throw new TypeError("input must be an array");
  if (t.length === 0)
    throw new TypeError("input must not be empty");
  var n = e.fromIndex, r = n === void 0 ? 0 : n, i = e.toIndex, s = i === void 0 ? t.length : i;
  if (r < 0 || r >= t.length || !Number.isInteger(r))
    throw new Error("fromIndex must be a positive integer smaller than length");
  if (s <= r || s > t.length || !Number.isInteger(s))
    throw new Error("toIndex must be an integer greater than fromIndex and at most equal to length");
  for (var o = t[r], l = r + 1; l < s; l++)
    t[l] < o && (o = t[l]);
  return o;
}
function Qo(t) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (ti(t)) {
    if (t.length === 0)
      throw new TypeError("input must not be empty");
  } else throw new TypeError("input must be an array");
  var n;
  if (e.output !== void 0) {
    if (!ti(e.output))
      throw new TypeError("output option must be an array if specified");
    n = e.output;
  } else
    n = new Array(t.length);
  var r = B0(t), i = j0(t);
  if (r === i)
    throw new RangeError("minimum and maximum input values are equal. Cannot rescale a constant array");
  var s = e.min, o = s === void 0 ? e.autoMinMax ? r : 0 : s, l = e.max, u = l === void 0 ? e.autoMinMax ? i : 1 : l;
  if (o >= u)
    throw new RangeError("min option must be smaller than max option");
  for (var c = (u - o) / (i - r), a = 0; a < t.length; a++)
    n[a] = (t[a] - r) * c + o;
  return n;
}
const Mr = " ".repeat(2), Fu = " ".repeat(4);
function V0() {
  return ju(this);
}
function ju(t, e = {}) {
  const { maxRows: n = 15, maxColumns: r = 10, maxNumSize: i = 8 } = e;
  return `${t.constructor.name} {
${Mr}[
${Fu}${z0(t, n, r, i)}
${Mr}]
${Mr}rows: ${t.rows}
${Mr}columns: ${t.columns}
}`;
}
function z0(t, e, n, r) {
  const { rows: i, columns: s } = t, o = Math.min(i, e), l = Math.min(s, n), u = [];
  for (let c = 0; c < o; c++) {
    let a = [];
    for (let f = 0; f < l; f++)
      a.push(D0(t.get(c, f), r));
    u.push(`${a.join(" ")}`);
  }
  return l !== s && (u[u.length - 1] += ` ... ${s - n} more columns`), o !== i && u.push(`... ${i - e} more rows`), u.join(`
${Fu}`);
}
function D0(t, e) {
  const n = String(t);
  if (n.length <= e)
    return n.padEnd(e, " ");
  const r = t.toPrecision(e - 2);
  if (r.length <= e)
    return r;
  const i = t.toExponential(e - 2), s = i.indexOf("e"), o = i.slice(s);
  return i.slice(0, e - o.length) + o;
}
function G0(t, e) {
  t.prototype.add = function(r) {
    return typeof r == "number" ? this.addS(r) : this.addM(r);
  }, t.prototype.addS = function(r) {
    for (let i = 0; i < this.rows; i++)
      for (let s = 0; s < this.columns; s++)
        this.set(i, s, this.get(i, s) + r);
    return this;
  }, t.prototype.addM = function(r) {
    if (r = e.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let i = 0; i < this.rows; i++)
      for (let s = 0; s < this.columns; s++)
        this.set(i, s, this.get(i, s) + r.get(i, s));
    return this;
  }, t.add = function(r, i) {
    return new e(r).add(i);
  }, t.prototype.sub = function(r) {
    return typeof r == "number" ? this.subS(r) : this.subM(r);
  }, t.prototype.subS = function(r) {
    for (let i = 0; i < this.rows; i++)
      for (let s = 0; s < this.columns; s++)
        this.set(i, s, this.get(i, s) - r);
    return this;
  }, t.prototype.subM = function(r) {
    if (r = e.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let i = 0; i < this.rows; i++)
      for (let s = 0; s < this.columns; s++)
        this.set(i, s, this.get(i, s) - r.get(i, s));
    return this;
  }, t.sub = function(r, i) {
    return new e(r).sub(i);
  }, t.prototype.subtract = t.prototype.sub, t.prototype.subtractS = t.prototype.subS, t.prototype.subtractM = t.prototype.subM, t.subtract = t.sub, t.prototype.mul = function(r) {
    return typeof r == "number" ? this.mulS(r) : this.mulM(r);
  }, t.prototype.mulS = function(r) {
    for (let i = 0; i < this.rows; i++)
      for (let s = 0; s < this.columns; s++)
        this.set(i, s, this.get(i, s) * r);
    return this;
  }, t.prototype.mulM = function(r) {
    if (r = e.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let i = 0; i < this.rows; i++)
      for (let s = 0; s < this.columns; s++)
        this.set(i, s, this.get(i, s) * r.get(i, s));
    return this;
  }, t.mul = function(r, i) {
    return new e(r).mul(i);
  }, t.prototype.multiply = t.prototype.mul, t.prototype.multiplyS = t.prototype.mulS, t.prototype.multiplyM = t.prototype.mulM, t.multiply = t.mul, t.prototype.div = function(r) {
    return typeof r == "number" ? this.divS(r) : this.divM(r);
  }, t.prototype.divS = function(r) {
    for (let i = 0; i < this.rows; i++)
      for (let s = 0; s < this.columns; s++)
        this.set(i, s, this.get(i, s) / r);
    return this;
  }, t.prototype.divM = function(r) {
    if (r = e.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let i = 0; i < this.rows; i++)
      for (let s = 0; s < this.columns; s++)
        this.set(i, s, this.get(i, s) / r.get(i, s));
    return this;
  }, t.div = function(r, i) {
    return new e(r).div(i);
  }, t.prototype.divide = t.prototype.div, t.prototype.divideS = t.prototype.divS, t.prototype.divideM = t.prototype.divM, t.divide = t.div, t.prototype.mod = function(r) {
    return typeof r == "number" ? this.modS(r) : this.modM(r);
  }, t.prototype.modS = function(r) {
    for (let i = 0; i < this.rows; i++)
      for (let s = 0; s < this.columns; s++)
        this.set(i, s, this.get(i, s) % r);
    return this;
  }, t.prototype.modM = function(r) {
    if (r = e.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let i = 0; i < this.rows; i++)
      for (let s = 0; s < this.columns; s++)
        this.set(i, s, this.get(i, s) % r.get(i, s));
    return this;
  }, t.mod = function(r, i) {
    return new e(r).mod(i);
  }, t.prototype.modulus = t.prototype.mod, t.prototype.modulusS = t.prototype.modS, t.prototype.modulusM = t.prototype.modM, t.modulus = t.mod, t.prototype.and = function(r) {
    return typeof r == "number" ? this.andS(r) : this.andM(r);
  }, t.prototype.andS = function(r) {
    for (let i = 0; i < this.rows; i++)
      for (let s = 0; s < this.columns; s++)
        this.set(i, s, this.get(i, s) & r);
    return this;
  }, t.prototype.andM = function(r) {
    if (r = e.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let i = 0; i < this.rows; i++)
      for (let s = 0; s < this.columns; s++)
        this.set(i, s, this.get(i, s) & r.get(i, s));
    return this;
  }, t.and = function(r, i) {
    return new e(r).and(i);
  }, t.prototype.or = function(r) {
    return typeof r == "number" ? this.orS(r) : this.orM(r);
  }, t.prototype.orS = function(r) {
    for (let i = 0; i < this.rows; i++)
      for (let s = 0; s < this.columns; s++)
        this.set(i, s, this.get(i, s) | r);
    return this;
  }, t.prototype.orM = function(r) {
    if (r = e.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let i = 0; i < this.rows; i++)
      for (let s = 0; s < this.columns; s++)
        this.set(i, s, this.get(i, s) | r.get(i, s));
    return this;
  }, t.or = function(r, i) {
    return new e(r).or(i);
  }, t.prototype.xor = function(r) {
    return typeof r == "number" ? this.xorS(r) : this.xorM(r);
  }, t.prototype.xorS = function(r) {
    for (let i = 0; i < this.rows; i++)
      for (let s = 0; s < this.columns; s++)
        this.set(i, s, this.get(i, s) ^ r);
    return this;
  }, t.prototype.xorM = function(r) {
    if (r = e.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let i = 0; i < this.rows; i++)
      for (let s = 0; s < this.columns; s++)
        this.set(i, s, this.get(i, s) ^ r.get(i, s));
    return this;
  }, t.xor = function(r, i) {
    return new e(r).xor(i);
  }, t.prototype.leftShift = function(r) {
    return typeof r == "number" ? this.leftShiftS(r) : this.leftShiftM(r);
  }, t.prototype.leftShiftS = function(r) {
    for (let i = 0; i < this.rows; i++)
      for (let s = 0; s < this.columns; s++)
        this.set(i, s, this.get(i, s) << r);
    return this;
  }, t.prototype.leftShiftM = function(r) {
    if (r = e.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let i = 0; i < this.rows; i++)
      for (let s = 0; s < this.columns; s++)
        this.set(i, s, this.get(i, s) << r.get(i, s));
    return this;
  }, t.leftShift = function(r, i) {
    return new e(r).leftShift(i);
  }, t.prototype.signPropagatingRightShift = function(r) {
    return typeof r == "number" ? this.signPropagatingRightShiftS(r) : this.signPropagatingRightShiftM(r);
  }, t.prototype.signPropagatingRightShiftS = function(r) {
    for (let i = 0; i < this.rows; i++)
      for (let s = 0; s < this.columns; s++)
        this.set(i, s, this.get(i, s) >> r);
    return this;
  }, t.prototype.signPropagatingRightShiftM = function(r) {
    if (r = e.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let i = 0; i < this.rows; i++)
      for (let s = 0; s < this.columns; s++)
        this.set(i, s, this.get(i, s) >> r.get(i, s));
    return this;
  }, t.signPropagatingRightShift = function(r, i) {
    return new e(r).signPropagatingRightShift(i);
  }, t.prototype.rightShift = function(r) {
    return typeof r == "number" ? this.rightShiftS(r) : this.rightShiftM(r);
  }, t.prototype.rightShiftS = function(r) {
    for (let i = 0; i < this.rows; i++)
      for (let s = 0; s < this.columns; s++)
        this.set(i, s, this.get(i, s) >>> r);
    return this;
  }, t.prototype.rightShiftM = function(r) {
    if (r = e.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let i = 0; i < this.rows; i++)
      for (let s = 0; s < this.columns; s++)
        this.set(i, s, this.get(i, s) >>> r.get(i, s));
    return this;
  }, t.rightShift = function(r, i) {
    return new e(r).rightShift(i);
  }, t.prototype.zeroFillRightShift = t.prototype.rightShift, t.prototype.zeroFillRightShiftS = t.prototype.rightShiftS, t.prototype.zeroFillRightShiftM = t.prototype.rightShiftM, t.zeroFillRightShift = t.rightShift, t.prototype.not = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, ~this.get(r, i));
    return this;
  }, t.not = function(r) {
    return new e(r).not();
  }, t.prototype.abs = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.abs(this.get(r, i)));
    return this;
  }, t.abs = function(r) {
    return new e(r).abs();
  }, t.prototype.acos = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.acos(this.get(r, i)));
    return this;
  }, t.acos = function(r) {
    return new e(r).acos();
  }, t.prototype.acosh = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.acosh(this.get(r, i)));
    return this;
  }, t.acosh = function(r) {
    return new e(r).acosh();
  }, t.prototype.asin = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.asin(this.get(r, i)));
    return this;
  }, t.asin = function(r) {
    return new e(r).asin();
  }, t.prototype.asinh = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.asinh(this.get(r, i)));
    return this;
  }, t.asinh = function(r) {
    return new e(r).asinh();
  }, t.prototype.atan = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.atan(this.get(r, i)));
    return this;
  }, t.atan = function(r) {
    return new e(r).atan();
  }, t.prototype.atanh = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.atanh(this.get(r, i)));
    return this;
  }, t.atanh = function(r) {
    return new e(r).atanh();
  }, t.prototype.cbrt = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.cbrt(this.get(r, i)));
    return this;
  }, t.cbrt = function(r) {
    return new e(r).cbrt();
  }, t.prototype.ceil = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.ceil(this.get(r, i)));
    return this;
  }, t.ceil = function(r) {
    return new e(r).ceil();
  }, t.prototype.clz32 = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.clz32(this.get(r, i)));
    return this;
  }, t.clz32 = function(r) {
    return new e(r).clz32();
  }, t.prototype.cos = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.cos(this.get(r, i)));
    return this;
  }, t.cos = function(r) {
    return new e(r).cos();
  }, t.prototype.cosh = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.cosh(this.get(r, i)));
    return this;
  }, t.cosh = function(r) {
    return new e(r).cosh();
  }, t.prototype.exp = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.exp(this.get(r, i)));
    return this;
  }, t.exp = function(r) {
    return new e(r).exp();
  }, t.prototype.expm1 = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.expm1(this.get(r, i)));
    return this;
  }, t.expm1 = function(r) {
    return new e(r).expm1();
  }, t.prototype.floor = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.floor(this.get(r, i)));
    return this;
  }, t.floor = function(r) {
    return new e(r).floor();
  }, t.prototype.fround = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.fround(this.get(r, i)));
    return this;
  }, t.fround = function(r) {
    return new e(r).fround();
  }, t.prototype.log = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.log(this.get(r, i)));
    return this;
  }, t.log = function(r) {
    return new e(r).log();
  }, t.prototype.log1p = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.log1p(this.get(r, i)));
    return this;
  }, t.log1p = function(r) {
    return new e(r).log1p();
  }, t.prototype.log10 = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.log10(this.get(r, i)));
    return this;
  }, t.log10 = function(r) {
    return new e(r).log10();
  }, t.prototype.log2 = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.log2(this.get(r, i)));
    return this;
  }, t.log2 = function(r) {
    return new e(r).log2();
  }, t.prototype.round = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.round(this.get(r, i)));
    return this;
  }, t.round = function(r) {
    return new e(r).round();
  }, t.prototype.sign = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.sign(this.get(r, i)));
    return this;
  }, t.sign = function(r) {
    return new e(r).sign();
  }, t.prototype.sin = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.sin(this.get(r, i)));
    return this;
  }, t.sin = function(r) {
    return new e(r).sin();
  }, t.prototype.sinh = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.sinh(this.get(r, i)));
    return this;
  }, t.sinh = function(r) {
    return new e(r).sinh();
  }, t.prototype.sqrt = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.sqrt(this.get(r, i)));
    return this;
  }, t.sqrt = function(r) {
    return new e(r).sqrt();
  }, t.prototype.tan = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.tan(this.get(r, i)));
    return this;
  }, t.tan = function(r) {
    return new e(r).tan();
  }, t.prototype.tanh = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.tanh(this.get(r, i)));
    return this;
  }, t.tanh = function(r) {
    return new e(r).tanh();
  }, t.prototype.trunc = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.trunc(this.get(r, i)));
    return this;
  }, t.trunc = function(r) {
    return new e(r).trunc();
  }, t.pow = function(r, i) {
    return new e(r).pow(i);
  }, t.prototype.pow = function(r) {
    return typeof r == "number" ? this.powS(r) : this.powM(r);
  }, t.prototype.powS = function(r) {
    for (let i = 0; i < this.rows; i++)
      for (let s = 0; s < this.columns; s++)
        this.set(i, s, Math.pow(this.get(i, s), r));
    return this;
  }, t.prototype.powM = function(r) {
    if (r = e.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let i = 0; i < this.rows; i++)
      for (let s = 0; s < this.columns; s++)
        this.set(i, s, Math.pow(this.get(i, s), r.get(i, s)));
    return this;
  };
}
function de(t, e, n) {
  let r = n ? t.rows : t.rows - 1;
  if (e < 0 || e > r)
    throw new RangeError("Row index out of range");
}
function pe(t, e, n) {
  let r = n ? t.columns : t.columns - 1;
  if (e < 0 || e > r)
    throw new RangeError("Column index out of range");
}
function wn(t, e) {
  if (e.to1DArray && (e = e.to1DArray()), e.length !== t.columns)
    throw new RangeError(
      "vector size must be the same as the number of columns"
    );
  return e;
}
function yn(t, e) {
  if (e.to1DArray && (e = e.to1DArray()), e.length !== t.rows)
    throw new RangeError("vector size must be the same as the number of rows");
  return e;
}
function H0(t, e, n) {
  return {
    row: q0(t, e),
    column: U0(t, n)
  };
}
function q0(t, e) {
  if (typeof e != "object")
    throw new TypeError("unexpected type for row indices");
  if (e.some((r) => r < 0 || r >= t.rows))
    throw new RangeError("row indices are out of range");
  return Array.isArray(e) || (e = Array.from(e)), e;
}
function U0(t, e) {
  if (typeof e != "object")
    throw new TypeError("unexpected type for column indices");
  if (e.some((r) => r < 0 || r >= t.columns))
    throw new RangeError("column indices are out of range");
  return Array.isArray(e) || (e = Array.from(e)), e;
}
function Zo(t, e, n, r, i) {
  if (arguments.length !== 5)
    throw new RangeError("expected 4 arguments");
  if (Sr("startRow", e), Sr("endRow", n), Sr("startColumn", r), Sr("endColumn", i), e > n || r > i || e < 0 || e >= t.rows || n < 0 || n >= t.rows || r < 0 || r >= t.columns || i < 0 || i >= t.columns)
    throw new RangeError("Submatrix indices are out of range");
}
function yi(t, e = 0) {
  let n = [];
  for (let r = 0; r < t; r++)
    n.push(e);
  return n;
}
function Sr(t, e) {
  if (typeof e != "number")
    throw new TypeError(`${t} must be a number`);
}
function gn(t) {
  if (t.isEmpty())
    throw new Error("Empty matrix has no elements to index");
}
function W0(t) {
  let e = yi(t.rows);
  for (let n = 0; n < t.rows; ++n)
    for (let r = 0; r < t.columns; ++r)
      e[n] += t.get(n, r);
  return e;
}
function K0(t) {
  let e = yi(t.columns);
  for (let n = 0; n < t.rows; ++n)
    for (let r = 0; r < t.columns; ++r)
      e[r] += t.get(n, r);
  return e;
}
function X0(t) {
  let e = 0;
  for (let n = 0; n < t.rows; n++)
    for (let r = 0; r < t.columns; r++)
      e += t.get(n, r);
  return e;
}
function Y0(t) {
  let e = yi(t.rows, 1);
  for (let n = 0; n < t.rows; ++n)
    for (let r = 0; r < t.columns; ++r)
      e[n] *= t.get(n, r);
  return e;
}
function J0(t) {
  let e = yi(t.columns, 1);
  for (let n = 0; n < t.rows; ++n)
    for (let r = 0; r < t.columns; ++r)
      e[r] *= t.get(n, r);
  return e;
}
function Q0(t) {
  let e = 1;
  for (let n = 0; n < t.rows; n++)
    for (let r = 0; r < t.columns; r++)
      e *= t.get(n, r);
  return e;
}
function Z0(t, e, n) {
  const r = t.rows, i = t.columns, s = [];
  for (let o = 0; o < r; o++) {
    let l = 0, u = 0, c = 0;
    for (let a = 0; a < i; a++)
      c = t.get(o, a) - n[o], l += c, u += c * c;
    e ? s.push((u - l * l / i) / (i - 1)) : s.push((u - l * l / i) / i);
  }
  return s;
}
function tm(t, e, n) {
  const r = t.rows, i = t.columns, s = [];
  for (let o = 0; o < i; o++) {
    let l = 0, u = 0, c = 0;
    for (let a = 0; a < r; a++)
      c = t.get(a, o) - n[o], l += c, u += c * c;
    e ? s.push((u - l * l / r) / (r - 1)) : s.push((u - l * l / r) / r);
  }
  return s;
}
function em(t, e, n) {
  const r = t.rows, i = t.columns, s = r * i;
  let o = 0, l = 0, u = 0;
  for (let c = 0; c < r; c++)
    for (let a = 0; a < i; a++)
      u = t.get(c, a) - n, o += u, l += u * u;
  return e ? (l - o * o / s) / (s - 1) : (l - o * o / s) / s;
}
function nm(t, e) {
  for (let n = 0; n < t.rows; n++)
    for (let r = 0; r < t.columns; r++)
      t.set(n, r, t.get(n, r) - e[n]);
}
function rm(t, e) {
  for (let n = 0; n < t.rows; n++)
    for (let r = 0; r < t.columns; r++)
      t.set(n, r, t.get(n, r) - e[r]);
}
function im(t, e) {
  for (let n = 0; n < t.rows; n++)
    for (let r = 0; r < t.columns; r++)
      t.set(n, r, t.get(n, r) - e);
}
function sm(t) {
  const e = [];
  for (let n = 0; n < t.rows; n++) {
    let r = 0;
    for (let i = 0; i < t.columns; i++)
      r += Math.pow(t.get(n, i), 2) / (t.columns - 1);
    e.push(Math.sqrt(r));
  }
  return e;
}
function om(t, e) {
  for (let n = 0; n < t.rows; n++)
    for (let r = 0; r < t.columns; r++)
      t.set(n, r, t.get(n, r) / e[n]);
}
function lm(t) {
  const e = [];
  for (let n = 0; n < t.columns; n++) {
    let r = 0;
    for (let i = 0; i < t.rows; i++)
      r += Math.pow(t.get(i, n), 2) / (t.rows - 1);
    e.push(Math.sqrt(r));
  }
  return e;
}
function um(t, e) {
  for (let n = 0; n < t.rows; n++)
    for (let r = 0; r < t.columns; r++)
      t.set(n, r, t.get(n, r) / e[r]);
}
function am(t) {
  const e = t.size - 1;
  let n = 0;
  for (let r = 0; r < t.columns; r++)
    for (let i = 0; i < t.rows; i++)
      n += Math.pow(t.get(i, r), 2) / e;
  return Math.sqrt(n);
}
function cm(t, e) {
  for (let n = 0; n < t.rows; n++)
    for (let r = 0; r < t.columns; r++)
      t.set(n, r, t.get(n, r) / e);
}
class ht {
  static from1DArray(e, n, r) {
    if (e * n !== r.length)
      throw new RangeError("data length does not match given dimensions");
    let s = new rt(e, n);
    for (let o = 0; o < e; o++)
      for (let l = 0; l < n; l++)
        s.set(o, l, r[o * n + l]);
    return s;
  }
  static rowVector(e) {
    let n = new rt(1, e.length);
    for (let r = 0; r < e.length; r++)
      n.set(0, r, e[r]);
    return n;
  }
  static columnVector(e) {
    let n = new rt(e.length, 1);
    for (let r = 0; r < e.length; r++)
      n.set(r, 0, e[r]);
    return n;
  }
  static zeros(e, n) {
    return new rt(e, n);
  }
  static ones(e, n) {
    return new rt(e, n).fill(1);
  }
  static rand(e, n, r = {}) {
    if (typeof r != "object")
      throw new TypeError("options must be an object");
    const { random: i = Math.random } = r;
    let s = new rt(e, n);
    for (let o = 0; o < e; o++)
      for (let l = 0; l < n; l++)
        s.set(o, l, i());
    return s;
  }
  static randInt(e, n, r = {}) {
    if (typeof r != "object")
      throw new TypeError("options must be an object");
    const { min: i = 0, max: s = 1e3, random: o = Math.random } = r;
    if (!Number.isInteger(i)) throw new TypeError("min must be an integer");
    if (!Number.isInteger(s)) throw new TypeError("max must be an integer");
    if (i >= s) throw new RangeError("min must be smaller than max");
    let l = s - i, u = new rt(e, n);
    for (let c = 0; c < e; c++)
      for (let a = 0; a < n; a++) {
        let f = i + Math.round(o() * l);
        u.set(c, a, f);
      }
    return u;
  }
  static eye(e, n, r) {
    n === void 0 && (n = e), r === void 0 && (r = 1);
    let i = Math.min(e, n), s = this.zeros(e, n);
    for (let o = 0; o < i; o++)
      s.set(o, o, r);
    return s;
  }
  static diag(e, n, r) {
    let i = e.length;
    n === void 0 && (n = i), r === void 0 && (r = n);
    let s = Math.min(i, n, r), o = this.zeros(n, r);
    for (let l = 0; l < s; l++)
      o.set(l, l, e[l]);
    return o;
  }
  static min(e, n) {
    e = this.checkMatrix(e), n = this.checkMatrix(n);
    let r = e.rows, i = e.columns, s = new rt(r, i);
    for (let o = 0; o < r; o++)
      for (let l = 0; l < i; l++)
        s.set(o, l, Math.min(e.get(o, l), n.get(o, l)));
    return s;
  }
  static max(e, n) {
    e = this.checkMatrix(e), n = this.checkMatrix(n);
    let r = e.rows, i = e.columns, s = new this(r, i);
    for (let o = 0; o < r; o++)
      for (let l = 0; l < i; l++)
        s.set(o, l, Math.max(e.get(o, l), n.get(o, l)));
    return s;
  }
  static checkMatrix(e) {
    return ht.isMatrix(e) ? e : new rt(e);
  }
  static isMatrix(e) {
    return e != null && e.klass === "Matrix";
  }
  get size() {
    return this.rows * this.columns;
  }
  apply(e) {
    if (typeof e != "function")
      throw new TypeError("callback must be a function");
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        e.call(this, n, r);
    return this;
  }
  to1DArray() {
    let e = [];
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        e.push(this.get(n, r));
    return e;
  }
  to2DArray() {
    let e = [];
    for (let n = 0; n < this.rows; n++) {
      e.push([]);
      for (let r = 0; r < this.columns; r++)
        e[n].push(this.get(n, r));
    }
    return e;
  }
  toJSON() {
    return this.to2DArray();
  }
  isRowVector() {
    return this.rows === 1;
  }
  isColumnVector() {
    return this.columns === 1;
  }
  isVector() {
    return this.rows === 1 || this.columns === 1;
  }
  isSquare() {
    return this.rows === this.columns;
  }
  isEmpty() {
    return this.rows === 0 || this.columns === 0;
  }
  isSymmetric() {
    if (this.isSquare()) {
      for (let e = 0; e < this.rows; e++)
        for (let n = 0; n <= e; n++)
          if (this.get(e, n) !== this.get(n, e))
            return !1;
      return !0;
    }
    return !1;
  }
  isEchelonForm() {
    let e = 0, n = 0, r = -1, i = !0, s = !1;
    for (; e < this.rows && i; ) {
      for (n = 0, s = !1; n < this.columns && s === !1; )
        this.get(e, n) === 0 ? n++ : this.get(e, n) === 1 && n > r ? (s = !0, r = n) : (i = !1, s = !0);
      e++;
    }
    return i;
  }
  isReducedEchelonForm() {
    let e = 0, n = 0, r = -1, i = !0, s = !1;
    for (; e < this.rows && i; ) {
      for (n = 0, s = !1; n < this.columns && s === !1; )
        this.get(e, n) === 0 ? n++ : this.get(e, n) === 1 && n > r ? (s = !0, r = n) : (i = !1, s = !0);
      for (let o = n + 1; o < this.rows; o++)
        this.get(e, o) !== 0 && (i = !1);
      e++;
    }
    return i;
  }
  echelonForm() {
    let e = this.clone(), n = 0, r = 0;
    for (; n < e.rows && r < e.columns; ) {
      let i = n;
      for (let s = n; s < e.rows; s++)
        e.get(s, r) > e.get(i, r) && (i = s);
      if (e.get(i, r) === 0)
        r++;
      else {
        e.swapRows(n, i);
        let s = e.get(n, r);
        for (let o = r; o < e.columns; o++)
          e.set(n, o, e.get(n, o) / s);
        for (let o = n + 1; o < e.rows; o++) {
          let l = e.get(o, r) / e.get(n, r);
          e.set(o, r, 0);
          for (let u = r + 1; u < e.columns; u++)
            e.set(o, u, e.get(o, u) - e.get(n, u) * l);
        }
        n++, r++;
      }
    }
    return e;
  }
  reducedEchelonForm() {
    let e = this.echelonForm(), n = e.columns, r = e.rows, i = r - 1;
    for (; i >= 0; )
      if (e.maxRow(i) === 0)
        i--;
      else {
        let s = 0, o = !1;
        for (; s < r && o === !1; )
          e.get(i, s) === 1 ? o = !0 : s++;
        for (let l = 0; l < i; l++) {
          let u = e.get(l, s);
          for (let c = s; c < n; c++) {
            let a = e.get(l, c) - u * e.get(i, c);
            e.set(l, c, a);
          }
        }
        i--;
      }
    return e;
  }
  set() {
    throw new Error("set method is unimplemented");
  }
  get() {
    throw new Error("get method is unimplemented");
  }
  repeat(e = {}) {
    if (typeof e != "object")
      throw new TypeError("options must be an object");
    const { rows: n = 1, columns: r = 1 } = e;
    if (!Number.isInteger(n) || n <= 0)
      throw new TypeError("rows must be a positive integer");
    if (!Number.isInteger(r) || r <= 0)
      throw new TypeError("columns must be a positive integer");
    let i = new rt(this.rows * n, this.columns * r);
    for (let s = 0; s < n; s++)
      for (let o = 0; o < r; o++)
        i.setSubMatrix(this, this.rows * s, this.columns * o);
    return i;
  }
  fill(e) {
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, e);
    return this;
  }
  neg() {
    return this.mulS(-1);
  }
  getRow(e) {
    de(this, e);
    let n = [];
    for (let r = 0; r < this.columns; r++)
      n.push(this.get(e, r));
    return n;
  }
  getRowVector(e) {
    return rt.rowVector(this.getRow(e));
  }
  setRow(e, n) {
    de(this, e), n = wn(this, n);
    for (let r = 0; r < this.columns; r++)
      this.set(e, r, n[r]);
    return this;
  }
  swapRows(e, n) {
    de(this, e), de(this, n);
    for (let r = 0; r < this.columns; r++) {
      let i = this.get(e, r);
      this.set(e, r, this.get(n, r)), this.set(n, r, i);
    }
    return this;
  }
  getColumn(e) {
    pe(this, e);
    let n = [];
    for (let r = 0; r < this.rows; r++)
      n.push(this.get(r, e));
    return n;
  }
  getColumnVector(e) {
    return rt.columnVector(this.getColumn(e));
  }
  setColumn(e, n) {
    pe(this, e), n = yn(this, n);
    for (let r = 0; r < this.rows; r++)
      this.set(r, e, n[r]);
    return this;
  }
  swapColumns(e, n) {
    pe(this, e), pe(this, n);
    for (let r = 0; r < this.rows; r++) {
      let i = this.get(r, e);
      this.set(r, e, this.get(r, n)), this.set(r, n, i);
    }
    return this;
  }
  addRowVector(e) {
    e = wn(this, e);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, this.get(n, r) + e[r]);
    return this;
  }
  subRowVector(e) {
    e = wn(this, e);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, this.get(n, r) - e[r]);
    return this;
  }
  mulRowVector(e) {
    e = wn(this, e);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, this.get(n, r) * e[r]);
    return this;
  }
  divRowVector(e) {
    e = wn(this, e);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, this.get(n, r) / e[r]);
    return this;
  }
  addColumnVector(e) {
    e = yn(this, e);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, this.get(n, r) + e[n]);
    return this;
  }
  subColumnVector(e) {
    e = yn(this, e);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, this.get(n, r) - e[n]);
    return this;
  }
  mulColumnVector(e) {
    e = yn(this, e);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, this.get(n, r) * e[n]);
    return this;
  }
  divColumnVector(e) {
    e = yn(this, e);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, this.get(n, r) / e[n]);
    return this;
  }
  mulRow(e, n) {
    de(this, e);
    for (let r = 0; r < this.columns; r++)
      this.set(e, r, this.get(e, r) * n);
    return this;
  }
  mulColumn(e, n) {
    pe(this, e);
    for (let r = 0; r < this.rows; r++)
      this.set(r, e, this.get(r, e) * n);
    return this;
  }
  max() {
    if (this.isEmpty())
      return NaN;
    let e = this.get(0, 0);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.get(n, r) > e && (e = this.get(n, r));
    return e;
  }
  maxIndex() {
    gn(this);
    let e = this.get(0, 0), n = [0, 0];
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.get(r, i) > e && (e = this.get(r, i), n[0] = r, n[1] = i);
    return n;
  }
  min() {
    if (this.isEmpty())
      return NaN;
    let e = this.get(0, 0);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.get(n, r) < e && (e = this.get(n, r));
    return e;
  }
  minIndex() {
    gn(this);
    let e = this.get(0, 0), n = [0, 0];
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.get(r, i) < e && (e = this.get(r, i), n[0] = r, n[1] = i);
    return n;
  }
  maxRow(e) {
    if (de(this, e), this.isEmpty())
      return NaN;
    let n = this.get(e, 0);
    for (let r = 1; r < this.columns; r++)
      this.get(e, r) > n && (n = this.get(e, r));
    return n;
  }
  maxRowIndex(e) {
    de(this, e), gn(this);
    let n = this.get(e, 0), r = [e, 0];
    for (let i = 1; i < this.columns; i++)
      this.get(e, i) > n && (n = this.get(e, i), r[1] = i);
    return r;
  }
  minRow(e) {
    if (de(this, e), this.isEmpty())
      return NaN;
    let n = this.get(e, 0);
    for (let r = 1; r < this.columns; r++)
      this.get(e, r) < n && (n = this.get(e, r));
    return n;
  }
  minRowIndex(e) {
    de(this, e), gn(this);
    let n = this.get(e, 0), r = [e, 0];
    for (let i = 1; i < this.columns; i++)
      this.get(e, i) < n && (n = this.get(e, i), r[1] = i);
    return r;
  }
  maxColumn(e) {
    if (pe(this, e), this.isEmpty())
      return NaN;
    let n = this.get(0, e);
    for (let r = 1; r < this.rows; r++)
      this.get(r, e) > n && (n = this.get(r, e));
    return n;
  }
  maxColumnIndex(e) {
    pe(this, e), gn(this);
    let n = this.get(0, e), r = [0, e];
    for (let i = 1; i < this.rows; i++)
      this.get(i, e) > n && (n = this.get(i, e), r[0] = i);
    return r;
  }
  minColumn(e) {
    if (pe(this, e), this.isEmpty())
      return NaN;
    let n = this.get(0, e);
    for (let r = 1; r < this.rows; r++)
      this.get(r, e) < n && (n = this.get(r, e));
    return n;
  }
  minColumnIndex(e) {
    pe(this, e), gn(this);
    let n = this.get(0, e), r = [0, e];
    for (let i = 1; i < this.rows; i++)
      this.get(i, e) < n && (n = this.get(i, e), r[0] = i);
    return r;
  }
  diag() {
    let e = Math.min(this.rows, this.columns), n = [];
    for (let r = 0; r < e; r++)
      n.push(this.get(r, r));
    return n;
  }
  norm(e = "frobenius") {
    let n = 0;
    if (e === "max")
      return this.max();
    if (e === "frobenius") {
      for (let r = 0; r < this.rows; r++)
        for (let i = 0; i < this.columns; i++)
          n = n + this.get(r, i) * this.get(r, i);
      return Math.sqrt(n);
    } else
      throw new RangeError(`unknown norm type: ${e}`);
  }
  cumulativeSum() {
    let e = 0;
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        e += this.get(n, r), this.set(n, r, e);
    return this;
  }
  dot(e) {
    ht.isMatrix(e) && (e = e.to1DArray());
    let n = this.to1DArray();
    if (n.length !== e.length)
      throw new RangeError("vectors do not have the same size");
    let r = 0;
    for (let i = 0; i < n.length; i++)
      r += n[i] * e[i];
    return r;
  }
  mmul(e) {
    e = rt.checkMatrix(e);
    let n = this.rows, r = this.columns, i = e.columns, s = new rt(n, i), o = new Float64Array(r);
    for (let l = 0; l < i; l++) {
      for (let u = 0; u < r; u++)
        o[u] = e.get(u, l);
      for (let u = 0; u < n; u++) {
        let c = 0;
        for (let a = 0; a < r; a++)
          c += this.get(u, a) * o[a];
        s.set(u, l, c);
      }
    }
    return s;
  }
  strassen2x2(e) {
    e = rt.checkMatrix(e);
    let n = new rt(2, 2);
    const r = this.get(0, 0), i = e.get(0, 0), s = this.get(0, 1), o = e.get(0, 1), l = this.get(1, 0), u = e.get(1, 0), c = this.get(1, 1), a = e.get(1, 1), f = (r + c) * (i + a), h = (l + c) * i, p = r * (o - a), m = c * (u - i), v = (r + s) * a, w = (l - r) * (i + o), d = (s - c) * (u + a), P = f + m - v + d, N = p + v, y = h + m, M = f - h + p + w;
    return n.set(0, 0, P), n.set(0, 1, N), n.set(1, 0, y), n.set(1, 1, M), n;
  }
  strassen3x3(e) {
    e = rt.checkMatrix(e);
    let n = new rt(3, 3);
    const r = this.get(0, 0), i = this.get(0, 1), s = this.get(0, 2), o = this.get(1, 0), l = this.get(1, 1), u = this.get(1, 2), c = this.get(2, 0), a = this.get(2, 1), f = this.get(2, 2), h = e.get(0, 0), p = e.get(0, 1), m = e.get(0, 2), v = e.get(1, 0), w = e.get(1, 1), d = e.get(1, 2), P = e.get(2, 0), N = e.get(2, 1), y = e.get(2, 2), M = (r + i + s - o - l - a - f) * w, R = (r - o) * (-p + w), z = l * (-h + p + v - w - d - P + y), q = (-r + o + l) * (h - p + w), Z = (o + l) * (-h + p), V = r * h, J = (-r + c + a) * (h - m + d), ut = (-r + c) * (m - d), U = (c + a) * (-h + m), x = (r + i + s - l - u - c - a) * d, D = a * (-h + m + v - w - d - P + N), T = (-s + a + f) * (w + P - N), F = (s - f) * (w - N), $ = s * P, K = (a + f) * (-P + N), Y = (-s + l + u) * (d + P - y), it = (s - u) * (d - y), st = (l + u) * (-P + y), Pt = i * v, wt = u * N, yt = o * m, _t = c * p, bt = f * y, kt = V + $ + Pt, It = M + q + Z + V + T + $ + K, jt = V + J + U + x + $ + Y + st, ue = R + z + q + V + $ + Y + it, ve = R + q + Z + V + wt, _ = $ + Y + it + st + yt, b = V + J + ut + D + T + F + $, C = T + F + $ + K + _t, O = V + J + ut + U + bt;
    return n.set(0, 0, kt), n.set(0, 1, It), n.set(0, 2, jt), n.set(1, 0, ue), n.set(1, 1, ve), n.set(1, 2, _), n.set(2, 0, b), n.set(2, 1, C), n.set(2, 2, O), n;
  }
  mmulStrassen(e) {
    e = rt.checkMatrix(e);
    let n = this.clone(), r = n.rows, i = n.columns, s = e.rows, o = e.columns;
    i !== s && console.warn(
      `Multiplying ${r} x ${i} and ${s} x ${o} matrix: dimensions do not match.`
    );
    function l(f, h, p) {
      let m = f.rows, v = f.columns;
      if (m === h && v === p)
        return f;
      {
        let w = ht.zeros(h, p);
        return w = w.setSubMatrix(f, 0, 0), w;
      }
    }
    let u = Math.max(r, s), c = Math.max(i, o);
    n = l(n, u, c), e = l(e, u, c);
    function a(f, h, p, m) {
      if (p <= 512 || m <= 512)
        return f.mmul(h);
      p % 2 === 1 && m % 2 === 1 ? (f = l(f, p + 1, m + 1), h = l(h, p + 1, m + 1)) : p % 2 === 1 ? (f = l(f, p + 1, m), h = l(h, p + 1, m)) : m % 2 === 1 && (f = l(f, p, m + 1), h = l(h, p, m + 1));
      let v = parseInt(f.rows / 2, 10), w = parseInt(f.columns / 2, 10), d = f.subMatrix(0, v - 1, 0, w - 1), P = h.subMatrix(0, v - 1, 0, w - 1), N = f.subMatrix(0, v - 1, w, f.columns - 1), y = h.subMatrix(0, v - 1, w, h.columns - 1), M = f.subMatrix(v, f.rows - 1, 0, w - 1), R = h.subMatrix(v, h.rows - 1, 0, w - 1), z = f.subMatrix(v, f.rows - 1, w, f.columns - 1), q = h.subMatrix(v, h.rows - 1, w, h.columns - 1), Z = a(
        ht.add(d, z),
        ht.add(P, q),
        v,
        w
      ), V = a(ht.add(M, z), P, v, w), J = a(d, ht.sub(y, q), v, w), ut = a(z, ht.sub(R, P), v, w), U = a(ht.add(d, N), q, v, w), x = a(
        ht.sub(M, d),
        ht.add(P, y),
        v,
        w
      ), D = a(
        ht.sub(N, z),
        ht.add(R, q),
        v,
        w
      ), T = ht.add(Z, ut);
      T.sub(U), T.add(D);
      let F = ht.add(J, U), $ = ht.add(V, ut), K = ht.sub(Z, V);
      K.add(J), K.add(x);
      let Y = ht.zeros(2 * T.rows, 2 * T.columns);
      return Y = Y.setSubMatrix(T, 0, 0), Y = Y.setSubMatrix(F, T.rows, 0), Y = Y.setSubMatrix($, 0, T.columns), Y = Y.setSubMatrix(K, T.rows, T.columns), Y.subMatrix(0, p - 1, 0, m - 1);
    }
    return a(n, e, u, c);
  }
  scaleRows(e = {}) {
    if (typeof e != "object")
      throw new TypeError("options must be an object");
    const { min: n = 0, max: r = 1 } = e;
    if (!Number.isFinite(n)) throw new TypeError("min must be a number");
    if (!Number.isFinite(r)) throw new TypeError("max must be a number");
    if (n >= r) throw new RangeError("min must be smaller than max");
    let i = new rt(this.rows, this.columns);
    for (let s = 0; s < this.rows; s++) {
      const o = this.getRow(s);
      o.length > 0 && Qo(o, { min: n, max: r, output: o }), i.setRow(s, o);
    }
    return i;
  }
  scaleColumns(e = {}) {
    if (typeof e != "object")
      throw new TypeError("options must be an object");
    const { min: n = 0, max: r = 1 } = e;
    if (!Number.isFinite(n)) throw new TypeError("min must be a number");
    if (!Number.isFinite(r)) throw new TypeError("max must be a number");
    if (n >= r) throw new RangeError("min must be smaller than max");
    let i = new rt(this.rows, this.columns);
    for (let s = 0; s < this.columns; s++) {
      const o = this.getColumn(s);
      o.length && Qo(o, {
        min: n,
        max: r,
        output: o
      }), i.setColumn(s, o);
    }
    return i;
  }
  flipRows() {
    const e = Math.ceil(this.columns / 2);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < e; r++) {
        let i = this.get(n, r), s = this.get(n, this.columns - 1 - r);
        this.set(n, r, s), this.set(n, this.columns - 1 - r, i);
      }
    return this;
  }
  flipColumns() {
    const e = Math.ceil(this.rows / 2);
    for (let n = 0; n < this.columns; n++)
      for (let r = 0; r < e; r++) {
        let i = this.get(r, n), s = this.get(this.rows - 1 - r, n);
        this.set(r, n, s), this.set(this.rows - 1 - r, n, i);
      }
    return this;
  }
  kroneckerProduct(e) {
    e = rt.checkMatrix(e);
    let n = this.rows, r = this.columns, i = e.rows, s = e.columns, o = new rt(n * i, r * s);
    for (let l = 0; l < n; l++)
      for (let u = 0; u < r; u++)
        for (let c = 0; c < i; c++)
          for (let a = 0; a < s; a++)
            o.set(i * l + c, s * u + a, this.get(l, u) * e.get(c, a));
    return o;
  }
  kroneckerSum(e) {
    if (e = rt.checkMatrix(e), !this.isSquare() || !e.isSquare())
      throw new Error("Kronecker Sum needs two Square Matrices");
    let n = this.rows, r = e.rows, i = this.kroneckerProduct(rt.eye(r, r)), s = rt.eye(n, n).kroneckerProduct(e);
    return i.add(s);
  }
  transpose() {
    let e = new rt(this.columns, this.rows);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        e.set(r, n, this.get(n, r));
    return e;
  }
  sortRows(e = tl) {
    for (let n = 0; n < this.rows; n++)
      this.setRow(n, this.getRow(n).sort(e));
    return this;
  }
  sortColumns(e = tl) {
    for (let n = 0; n < this.columns; n++)
      this.setColumn(n, this.getColumn(n).sort(e));
    return this;
  }
  subMatrix(e, n, r, i) {
    Zo(this, e, n, r, i);
    let s = new rt(
      n - e + 1,
      i - r + 1
    );
    for (let o = e; o <= n; o++)
      for (let l = r; l <= i; l++)
        s.set(o - e, l - r, this.get(o, l));
    return s;
  }
  subMatrixRow(e, n, r) {
    if (n === void 0 && (n = 0), r === void 0 && (r = this.columns - 1), n > r || n < 0 || n >= this.columns || r < 0 || r >= this.columns)
      throw new RangeError("Argument out of range");
    let i = new rt(e.length, r - n + 1);
    for (let s = 0; s < e.length; s++)
      for (let o = n; o <= r; o++) {
        if (e[s] < 0 || e[s] >= this.rows)
          throw new RangeError(`Row index out of range: ${e[s]}`);
        i.set(s, o - n, this.get(e[s], o));
      }
    return i;
  }
  subMatrixColumn(e, n, r) {
    if (n === void 0 && (n = 0), r === void 0 && (r = this.rows - 1), n > r || n < 0 || n >= this.rows || r < 0 || r >= this.rows)
      throw new RangeError("Argument out of range");
    let i = new rt(r - n + 1, e.length);
    for (let s = 0; s < e.length; s++)
      for (let o = n; o <= r; o++) {
        if (e[s] < 0 || e[s] >= this.columns)
          throw new RangeError(`Column index out of range: ${e[s]}`);
        i.set(o - n, s, this.get(o, e[s]));
      }
    return i;
  }
  setSubMatrix(e, n, r) {
    if (e = rt.checkMatrix(e), e.isEmpty())
      return this;
    let i = n + e.rows - 1, s = r + e.columns - 1;
    Zo(this, n, i, r, s);
    for (let o = 0; o < e.rows; o++)
      for (let l = 0; l < e.columns; l++)
        this.set(n + o, r + l, e.get(o, l));
    return this;
  }
  selection(e, n) {
    let r = H0(this, e, n), i = new rt(e.length, n.length);
    for (let s = 0; s < r.row.length; s++) {
      let o = r.row[s];
      for (let l = 0; l < r.column.length; l++) {
        let u = r.column[l];
        i.set(s, l, this.get(o, u));
      }
    }
    return i;
  }
  trace() {
    let e = Math.min(this.rows, this.columns), n = 0;
    for (let r = 0; r < e; r++)
      n += this.get(r, r);
    return n;
  }
  clone() {
    let e = new rt(this.rows, this.columns);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        e.set(n, r, this.get(n, r));
    return e;
  }
  sum(e) {
    switch (e) {
      case "row":
        return W0(this);
      case "column":
        return K0(this);
      case void 0:
        return X0(this);
      default:
        throw new Error(`invalid option: ${e}`);
    }
  }
  product(e) {
    switch (e) {
      case "row":
        return Y0(this);
      case "column":
        return J0(this);
      case void 0:
        return Q0(this);
      default:
        throw new Error(`invalid option: ${e}`);
    }
  }
  mean(e) {
    const n = this.sum(e);
    switch (e) {
      case "row": {
        for (let r = 0; r < this.rows; r++)
          n[r] /= this.columns;
        return n;
      }
      case "column": {
        for (let r = 0; r < this.columns; r++)
          n[r] /= this.rows;
        return n;
      }
      case void 0:
        return n / this.size;
      default:
        throw new Error(`invalid option: ${e}`);
    }
  }
  variance(e, n = {}) {
    if (typeof e == "object" && (n = e, e = void 0), typeof n != "object")
      throw new TypeError("options must be an object");
    const { unbiased: r = !0, mean: i = this.mean(e) } = n;
    if (typeof r != "boolean")
      throw new TypeError("unbiased must be a boolean");
    switch (e) {
      case "row": {
        if (!Array.isArray(i))
          throw new TypeError("mean must be an array");
        return Z0(this, r, i);
      }
      case "column": {
        if (!Array.isArray(i))
          throw new TypeError("mean must be an array");
        return tm(this, r, i);
      }
      case void 0: {
        if (typeof i != "number")
          throw new TypeError("mean must be a number");
        return em(this, r, i);
      }
      default:
        throw new Error(`invalid option: ${e}`);
    }
  }
  standardDeviation(e, n) {
    typeof e == "object" && (n = e, e = void 0);
    const r = this.variance(e, n);
    if (e === void 0)
      return Math.sqrt(r);
    for (let i = 0; i < r.length; i++)
      r[i] = Math.sqrt(r[i]);
    return r;
  }
  center(e, n = {}) {
    if (typeof e == "object" && (n = e, e = void 0), typeof n != "object")
      throw new TypeError("options must be an object");
    const { center: r = this.mean(e) } = n;
    switch (e) {
      case "row": {
        if (!Array.isArray(r))
          throw new TypeError("center must be an array");
        return nm(this, r), this;
      }
      case "column": {
        if (!Array.isArray(r))
          throw new TypeError("center must be an array");
        return rm(this, r), this;
      }
      case void 0: {
        if (typeof r != "number")
          throw new TypeError("center must be a number");
        return im(this, r), this;
      }
      default:
        throw new Error(`invalid option: ${e}`);
    }
  }
  scale(e, n = {}) {
    if (typeof e == "object" && (n = e, e = void 0), typeof n != "object")
      throw new TypeError("options must be an object");
    let r = n.scale;
    switch (e) {
      case "row": {
        if (r === void 0)
          r = sm(this);
        else if (!Array.isArray(r))
          throw new TypeError("scale must be an array");
        return om(this, r), this;
      }
      case "column": {
        if (r === void 0)
          r = lm(this);
        else if (!Array.isArray(r))
          throw new TypeError("scale must be an array");
        return um(this, r), this;
      }
      case void 0: {
        if (r === void 0)
          r = am(this);
        else if (typeof r != "number")
          throw new TypeError("scale must be a number");
        return cm(this, r), this;
      }
      default:
        throw new Error(`invalid option: ${e}`);
    }
  }
  toString(e) {
    return ju(this, e);
  }
}
ht.prototype.klass = "Matrix";
typeof Symbol < "u" && (ht.prototype[Symbol.for("nodejs.util.inspect.custom")] = V0);
function tl(t, e) {
  return t - e;
}
ht.random = ht.rand;
ht.randomInt = ht.randInt;
ht.diagonal = ht.diag;
ht.prototype.diagonal = ht.prototype.diag;
ht.identity = ht.eye;
ht.prototype.negate = ht.prototype.neg;
ht.prototype.tensorProduct = ht.prototype.kroneckerProduct;
class rt extends ht {
  constructor(e, n) {
    if (super(), rt.isMatrix(e))
      return e.clone();
    if (Number.isInteger(e) && e >= 0)
      if (this.data = [], Number.isInteger(n) && n >= 0)
        for (let r = 0; r < e; r++)
          this.data.push(new Float64Array(n));
      else
        throw new TypeError("nColumns must be a positive integer");
    else if (Array.isArray(e)) {
      const r = e;
      if (e = r.length, n = e ? r[0].length : 0, typeof n != "number")
        throw new TypeError(
          "Data must be a 2D array with at least one element"
        );
      this.data = [];
      for (let i = 0; i < e; i++) {
        if (r[i].length !== n)
          throw new RangeError("Inconsistent array dimensions");
        this.data.push(Float64Array.from(r[i]));
      }
    } else
      throw new TypeError(
        "First argument must be a positive number or an array"
      );
    this.rows = e, this.columns = n;
  }
  set(e, n, r) {
    return this.data[e][n] = r, this;
  }
  get(e, n) {
    return this.data[e][n];
  }
  removeRow(e) {
    return de(this, e), this.data.splice(e, 1), this.rows -= 1, this;
  }
  addRow(e, n) {
    return n === void 0 && (n = e, e = this.rows), de(this, e, !0), n = Float64Array.from(wn(this, n)), this.data.splice(e, 0, n), this.rows += 1, this;
  }
  removeColumn(e) {
    pe(this, e);
    for (let n = 0; n < this.rows; n++) {
      const r = new Float64Array(this.columns - 1);
      for (let i = 0; i < e; i++)
        r[i] = this.data[n][i];
      for (let i = e + 1; i < this.columns; i++)
        r[i - 1] = this.data[n][i];
      this.data[n] = r;
    }
    return this.columns -= 1, this;
  }
  addColumn(e, n) {
    typeof n > "u" && (n = e, e = this.columns), pe(this, e, !0), n = yn(this, n);
    for (let r = 0; r < this.rows; r++) {
      const i = new Float64Array(this.columns + 1);
      let s = 0;
      for (; s < e; s++)
        i[s] = this.data[r][s];
      for (i[s++] = n[r]; s < this.columns + 1; s++)
        i[s] = this.data[r][s - 1];
      this.data[r] = i;
    }
    return this.columns += 1, this;
  }
}
G0(ht, rt);
var fm = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function hm(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var Bu = { exports: {} };
(function(t, e) {
  (function(n, r) {
    t.exports = r();
  })(fm, function() {
    function n(o) {
      o = o.replace(/,/g, " ").replace(/([^eE])-/g, "$1 -").replace(/\s*([achlmqstvzACHLMQSTVZ])\s*/g, " $1 ").replace(/\s+/g, " ").replace(/(\d*\.\d+([eE]-?\d+)?)((\.\d+)+)/g, (T, F, $, K) => F + K.replaceAll(".", " ."));
      var l = o.replace(/([achlmqstvzACHLMQSTVZ])\s?/g, "|$1").split("|"), u = l.length, c, a, f, h, p, m = [], v = [], w, d, P = 0, N = 0, y = 0, M = 0, R = 0, z = 0, q = 0, Z = 0, V = 0, J = 0, ut = 0, U = 0, x = 0, D = "";
      for (c = 1; c < u; c++) {
        if (a = l[c], f = a.substring(0, 1), h = f.toLowerCase(), m = a.replace(f, "").trim().split(" ").filter(function(T) {
          return T !== "";
        }), v = m, m = m.map(parseFloat), w = m.length, h === "m") {
          if (D += "M ", f === "m" ? (y += m[0], M += m[1]) : (y = m[0], M = m[1]), P = y, N = M, D += y + " " + M + " ", w > 2)
            for (d = 0; d < w; d += 2)
              f === "m" ? (y += m[d], M += m[d + 1]) : (y = m[d], M = m[d + 1]), D += "L " + y + " " + M + " ";
        } else if (h === "l")
          for (d = 0; d < w; d += 2)
            f === "l" ? (y += m[d], M += m[d + 1]) : (y = m[d], M = m[d + 1]), D += "L " + y + " " + M + " ";
        else if (h === "h")
          for (d = 0; d < w; d++)
            f === "h" ? y += m[d] : y = m[d], D += "L " + y + " " + M + " ";
        else if (h === "v")
          for (d = 0; d < w; d++)
            f === "v" ? M += m[d] : M = m[d], D += "L " + y + " " + M + " ";
        else if (h === "q")
          for (d = 0; d < w; d += 4)
            f === "q" ? (R = y + m[d], z = M + m[d + 1], y += m[d + 2], M += m[d + 3]) : (R = m[d], z = m[d + 1], y = m[d + 2], M = m[d + 3]), D += "Q " + R + " " + z + " " + y + " " + M + " ";
        else if (h === "t")
          for (d = 0; d < w; d += 2)
            ["t", "q"].indexOf(p) > -1 ? (R = y + (y - R), z = M + (M - z)) : (R = y, z = M), f === "t" ? (y += m[d], M += m[d + 1]) : (y = m[d], M = m[d + 1]), D += "Q " + R + " " + z + " " + y + " " + M + " ", p = h;
        else if (h === "c")
          for (d = 0; d < w; d += 6)
            f === "c" ? (R = y + m[d], z = M + m[d + 1], q = y + m[d + 2], Z = M + m[d + 3], y += m[d + 4], M += m[d + 5]) : (R = m[d], z = m[d + 1], q = m[d + 2], Z = m[d + 3], y = m[d + 4], M = m[d + 5]), D += "C " + R + " " + z + " " + q + " " + Z + " " + y + " " + M + " ";
        else if (h === "s")
          for (d = 0; d < w; d += 4)
            R = y, z = M, ["s", "c"].indexOf(p) > -1 && (R += y - q, z += M - Z), f === "s" ? (q = y + m[d], Z = M + m[d + 1], y += m[d + 2], M += m[d + 3]) : (q = m[d], Z = m[d + 1], y = m[d + 2], M = m[d + 3]), D += "C " + R + " " + z + " " + q + " " + Z + " " + y + " " + M + " ";
        else if (h === "a")
          for (d = 0; d < w; d += 7) {
            V = m[d], J = m[d + 1], ut = m[d + 2], U = v[d + 3];
            let T = !1;
            if (U.length > 1) {
              let F = parseInt(U[0]), $ = parseInt(U[1]), K;
              U.length > 2 && (K = parseFloat(U.substring(2))), m[d + 3] = F, m.splice(d + 4, 0, $), v.splice(d + 4, 0, "+"), K !== void 0 && m.splice(d + 5, 0, K), T = !0;
            }
            U = m[d + 3], x = T ? m[d + 4] : v[d + 4], !T && x.length > 1 && (m[d + 4] = parseInt(x[0]), m.splice(d + 5, 0, parseFloat(x.substring(1)))), x = m[d + 4], f === "a" ? (y += m[d + 5], M += m[d + 6]) : (y = m[d + 5], M = m[d + 6]), D += "A " + V + " " + J + " " + ut + " " + U + " " + x + " " + y + " " + M + " ";
          }
        else h === "z" && (D += "Z ", y = P, M = N);
        p = h;
      }
      return D.trim();
    }
    function r(o) {
      var l = o.trim().split(" "), u, c = l.length, a = c - 1, f, h = [], p, m, v, w, d, P = new RegExp("[QAZLCM]", ""), N = l.slice(-1)[0].toUpperCase() === "Z";
      for (f = 0; f < c; f++)
        if (u = l[f], P.test(u)) {
          if (u === "A") {
            h.push(l[f + 5] === "0" ? "1" : "0"), h.push(l[f + 4]), h.push(l[f + 3]), h.push(l[f + 2]), h.push(l[f + 1]), h.push(u), h.push(l[f + 7]), h.push(l[f + 6]), f += 7;
            continue;
          } else if (u === "C")
            w = 3, d = 2;
          else if (u === "Q")
            w = 2, d = 1;
          else if (u === "L")
            w = 1, d = 1;
          else if (u === "M")
            w = 1, d = 0;
          else
            continue;
          for (w === d && h.push(u), v = 0; v < w; v++)
            v === d && h.push(u), p = l[++f], m = l[++f], h.push(m), h.push(p);
        } else {
          var y = l.slice(Math.max(f - 3, 0), 3).join(" ");
          throw post = l.slice(f + 1, Math.min(f + 4, a)).join(" "), range = y + " [" + u + "] " + post, "Error while trying to reverse normalized SVG path, at position " + f + " (" + range + `).
Either the path is not normalised, or it's malformed.`;
        }
      h.push("M");
      var M = "", R = h.length - 1, z;
      for (z = R; z > 0; z--)
        M += h[z] + " ";
      return N && (M += "Z"), M = M.replace(/M M/g, "Z M"), M;
    }
    function i(u, l) {
      l = parseInt(l) == l ? l : !1;
      var u = n(u), c = u.replace(/M/g, "|M").split("|"), a;
      if (c.splice(0, 1), l !== !1 && l >= c.length)
        return u;
      if (l === !1)
        c = c.map(function(h) {
          return r(h.trim());
        });
      else {
        var f = c[l];
        f && (a = r(f.trim()), c[l] = a);
      }
      return c.reverse().join(" ").replace(/ +/g, " ").trim();
    }
    var s = {
      normalize: n,
      reverseNormalized: r,
      reverse: i
    };
    return s;
  });
})(Bu);
var dm = Bu.exports;
const el = /* @__PURE__ */ hm(dm);
var pt = /* @__PURE__ */ ((t) => (t.RIGHT = "RIGHT", t.BOTTOMRIGHT = "BOTTOMRIGHT", t.BOTTOM = "BOTTOM", t.BOTTOMLEFT = "BOTTOMLEFT", t.LEFT = "LEFT", t.TOPLEFT = "TOPLEFT", t.TOP = "TOP", t.TOPRIGHT = "TOPRIGHT", t))(pt || {});
function pm(t, e, n, r) {
  switch (t.pathType) {
    case se.REFLEXIVE:
      return Vu(t.source, [e / 2, n / 2], r);
    case se.ARC:
      return ss(t.source, t.target, r);
    case se.ARCREVERSE:
      return el.reverse(ss(t.source, t.target, r));
    case se.LINE:
      return Un(t.source, t.target, r);
    case se.LINEREVERSE:
      return el.reverse(Un(t.source, t.target, r));
    default:
      return "";
  }
}
function gm(t, e, n) {
  return t.id === e.id ? se.REFLEXIVE : n.hasBidirectionalConnection(t, e) ? nl(t, e) ? se.ARCREVERSE : se.ARC : nl(t, e) ? se.LINEREVERSE : se.LINE;
}
function Un(t, e, n) {
  let r, i;
  if (n.nodeProps.shape === nt.CIRCLE) {
    const s = e.x - t.x, o = e.y - t.y;
    let l = Math.sqrt(s * s + o * o);
    l === 0 && (l = Number.EPSILON);
    const u = s / l, c = o / l;
    r = {
      x: t.x + (n.nodeProps.radius - 1) * u,
      y: t.y + (n.nodeProps.radius - 1) * c
    }, e instanceof Mn ? i = {
      x: e.x - (n.nodeProps.radius + n.markerPadding) * u,
      y: e.y - (n.nodeProps.radius + n.markerPadding) * c
    } : i = {
      x: e.x,
      y: e.y
    };
  } else if (n.nodeProps.shape === nt.RECTANGLE) {
    const s = t.x + n.nodeProps.width * 0.5, o = t.y + n.nodeProps.height * 0.5;
    let l, u;
    e instanceof Mn ? (l = e.x + n.nodeProps.width * 0.5, u = e.y + n.nodeProps.height * 0.5) : (l = e.x, u = e.y);
    const c = l - s, a = u - o;
    let f = Math.sqrt(c * c + a * a);
    f === 0 && (f = Number.EPSILON);
    const h = c / f, p = a / f;
    r = ei(
      s,
      o,
      n.nodeProps.width,
      n.nodeProps.height,
      h,
      p,
      2
    ), e instanceof Mn ? i = ei(
      l,
      u,
      n.nodeProps.width,
      n.nodeProps.height,
      -h,
      -p,
      -n.markerPadding + 1
    ) : i = { x: l, y: u };
  }
  return `M${r.x},${r.y}
          L${i.x},${i.y}`;
}
function ss(t, e, n) {
  if (n.nodeProps.shape === nt.CIRCLE) {
    const r = new rt([[t.x, t.y]]), i = new rt([[e.x, e.y]]), s = rt.subtract(i, r), o = s.norm("frobenius"), l = s.divide(o), u = ni(10), c = Dt(l, -u).multiply(n.nodeProps.radius - 1).add(r), a = rt.multiply(l, -1), f = Dt(a, u).multiply(n.nodeProps.radius).add(i).add(Dt(a, u).multiply(2 * n.markerBoxSize)), h = 1.2 * o;
    return `M${c.get(0, 0)},${c.get(0, 1)}
          A${h},${h},0,0,1,${f.get(0, 0)},${f.get(0, 1)}`;
  } else if (n.nodeProps.shape === nt.RECTANGLE) {
    const r = t.x + n.nodeProps.width * 0.5, i = t.y + n.nodeProps.height * 0.5, s = e.x + n.nodeProps.width * 0.5, o = e.y + n.nodeProps.height * 0.5, l = new rt([[r, i]]), u = new rt([[s, o]]), c = rt.subtract(u, l), a = c.norm("frobenius"), f = c.divide(a), h = ni(30), p = ei(
      r,
      i,
      n.nodeProps.width,
      n.nodeProps.height,
      f.get(0, 0),
      f.get(0, 1),
      2
    ), m = Dt(f, -h).add([[p.x, p.y]]), v = ei(
      s,
      o,
      n.nodeProps.width,
      n.nodeProps.height,
      -f.get(0, 0),
      -f.get(0, 1)
    ), w = rt.multiply(f, -1), d = Dt(w, h).add([[v.x, v.y]]).add(Dt(w, h).multiply(2 * n.markerBoxSize)), P = a;
    return `M${m.get(0, 0)},${m.get(0, 1)}
          A${P},${P},0,0,1,${d.get(0, 0)},${d.get(0, 1)}`;
  } else
    return "";
}
function Vu(t, e, n) {
  const r = new rt([e]);
  if (n.nodeProps.shape === nt.CIRCLE) {
    const i = new rt([[t.x, t.y]]);
    i.get(0, 0) === r.get(0, 0) && i.get(0, 1) === r.get(0, 1) && r.add([[0, 1]]);
    const s = rt.subtract(i, r), o = s.divide(s.norm("frobenius")), l = ni(40), u = Dt(o, l).multiply(n.nodeProps.radius - 1).add(i), c = Dt(o, -l).multiply(n.nodeProps.radius).add(i).add(Dt(o, -l).multiply(2 * n.markerBoxSize));
    return `M${u.get(0, 0)},${u.get(0, 1)}
              A${n.nodeProps.radius},${n.nodeProps.radius},0,1,0,${c.get(0, 0)},${c.get(0, 1)}`;
  } else return n.nodeProps.shape === nt.RECTANGLE ? n.nodeProps.reflexiveEdgeStart == "MOVABLE" ? mm(t, n, r) : wm(t, n) : "";
}
function nl(t, e) {
  return t.x > e.x;
}
function mm(t, e, n) {
  if (e.nodeProps.shape === nt.RECTANGLE) {
    const r = t.x + e.nodeProps.width * 0.5, i = t.y + e.nodeProps.height * 0.5, s = new rt([[r, i]]);
    s.get(0, 0) === n.get(0, 0) && s.get(0, 1) === n.get(0, 1) && n.add([[0, 1]]);
    const o = rt.subtract(s, n), l = o.divide(o.norm("frobenius")), u = ni(45);
    let c, a, f = 0.5 * e.nodeProps.width, h = 0.5 * e.nodeProps.height;
    const p = ym(
      o.get(0, 0),
      o.get(0, 1),
      30
    );
    if (p === pt.BOTTOMLEFT || p === pt.BOTTOMRIGHT || p === pt.TOPLEFT || p === pt.TOPRIGHT) {
      let m = zu(p, t, e);
      c = m.start, a = m.end, e.nodeProps.width > e.nodeProps.height ? (p === pt.TOPLEFT || p === pt.BOTTOMRIGHT) && (f = 0.25 * e.nodeProps.width) : e.nodeProps.height > e.nodeProps.width && (p === pt.TOPRIGHT || p === pt.BOTTOMLEFT) && (h = 0.25 * e.nodeProps.height);
    } else p === pt.LEFT || p === pt.RIGHT ? (c = Dt(l, u).multiply(0.5 * e.nodeProps.width - 1).add(s), a = Dt(l, -u).multiply(0.5 * e.nodeProps.height - 1).add(s).add(Dt(l, -u).multiply(2 * e.markerBoxSize))) : (c = Dt(l, u).multiply(0.5 * e.nodeProps.height - 1).add(s), a = Dt(l, -u).multiply(0.5 * e.nodeProps.width - 1).add(s).add(Dt(l, -u).multiply(2 * e.markerBoxSize)));
    return `M${c.get(0, 0)},${c.get(0, 1)} A${f},${h}, 0, 1, 0, ${a.get(0, 0)},${a.get(0, 1)}`;
  } else
    return "";
}
function wm(t, e) {
  if (e.nodeProps.shape === nt.RECTANGLE && e.nodeProps.reflexiveEdgeStart !== "MOVABLE") {
    let n, r, i = 0.5 * e.nodeProps.width, s = 0.5 * e.nodeProps.height;
    e.nodeProps.width > e.nodeProps.height ? (e.nodeProps.reflexiveEdgeStart === pt.TOPLEFT || e.nodeProps.reflexiveEdgeStart === pt.BOTTOMRIGHT) && (i = e.nodeProps.width / e.nodeProps.height + e.nodeProps.height) : e.nodeProps.height > e.nodeProps.width && (e.nodeProps.reflexiveEdgeStart === pt.TOPRIGHT || e.nodeProps.reflexiveEdgeStart === pt.BOTTOMLEFT) && (s = e.nodeProps.height / e.nodeProps.width + e.nodeProps.width);
    let o = zu(
      e.nodeProps.reflexiveEdgeStart,
      t,
      e
    );
    return n = o.start, r = o.end, `M${n.get(0, 0)},${n.get(0, 1)} A${i},${s}, 0, 1, 0, ${r.get(0, 0)},${r.get(0, 1)}`;
  } else
    return "";
}
function ei(t, e, n, r, i, s, o = 0) {
  const l = t - 0.5 * n, u = t + 0.5 * n, c = e - 0.5 * r, a = e + 0.5 * r;
  i === 0 && (i = Number.EPSILON), s === 0 && (s = Number.EPSILON);
  const f = i < 0 ? l : u, h = s < 0 ? c : a, p = (f - t) / i, m = (h - e) / s, v = Math.min(p, m);
  let w = t + v * i, d = e + v * s;
  if (o !== 0)
    if (p < m) {
      let P;
      f === l ? P = 1 : P = -1, w = w + o * P;
    } else {
      let P;
      h === c ? P = 1 : P = -1, d = d + o * P;
    }
  return { x: w, y: d };
}
function ym(t, e, n = 30) {
  let r = _m(Math.atan2(t, e));
  return r < 0 && (r += 360), nn(r, 0, n) ? pt.BOTTOMLEFT : nn(r, [0, 90], -n) ? pt.BOTTOM : nn(r, 90, n) ? pt.BOTTOMRIGHT : nn(r, [90, 180], -n) ? pt.RIGHT : nn(r, 180, n) ? pt.TOPRIGHT : nn(r, [180, 270], -n) ? pt.TOP : nn(r, 270, n) ? pt.TOPLEFT : pt.LEFT;
}
function zu(t, e, n) {
  const r = e.x, i = e.y, s = n.nodeProps.shape === nt.RECTANGLE ? n.nodeProps.width : n.nodeProps.radius, o = n.nodeProps.shape === nt.RECTANGLE ? n.nodeProps.height : n.nodeProps.radius, l = n.markerBoxSize, u = {
    [pt.BOTTOMLEFT]: {
      start: [r + 2, i + o - 1],
      end: [r + s - 2 * l, i + o + 2 * l]
    },
    [pt.BOTTOM]: {
      start: [r + 0.5 * s, i + o - 1],
      end: [r + s + 2 * l, i + 0.5 * o]
    },
    [pt.BOTTOMRIGHT]: {
      start: [r + s - 2, i + o - 1],
      end: [r + s + 2 * l, i + 2 * l]
    },
    [pt.RIGHT]: {
      start: [r + s - 1, i + 0.5 * o],
      end: [r + 0.5 * s, i - 2 * l]
    },
    [pt.TOPRIGHT]: {
      start: [r + s - 2, i + 1],
      end: [r + 2 * l, i - 2 * l]
    },
    [pt.TOP]: {
      start: [r + 0.5 * s, i + 1],
      end: [r - 2 * l, i + 0.5 * o]
    },
    [pt.TOPLEFT]: {
      start: [r + 2, i + 1],
      end: [r - 2 * l, i + o - 2 * l]
    },
    [pt.LEFT]: {
      start: [r + 1, i + 0.5 * o],
      end: [r + 0.5 * s, i + o + 2 * l]
    }
  }, { start: c, end: a } = u[t];
  return {
    start: new rt([c]),
    end: new rt([a])
  };
}
function nn(t, e, n = 0) {
  t = (t + 360) % 360;
  let r, i;
  return typeof e == "number" ? (r = (e - n + 360) % 360, i = (e + n) % 360) : (r = (e[0] - n + 360) % 360, i = (e[1] + n) % 360), r < i ? t >= r && t <= i : t >= r || t <= i;
}
function ni(t) {
  return t * (Math.PI / 180);
}
function _m(t) {
  return t * (180 / Math.PI);
}
function Dt(t, e) {
  const n = t.get(0, 0), r = t.get(0, 1);
  return new rt([
    [
      n * Math.cos(e) - r * Math.sin(e),
      n * Math.sin(e) + r * Math.cos(e)
    ]
  ]);
}
class vm {
  constructor() {
    vt(this, "persistSettingsLocalStorage", !1);
    vt(this, "hasToolbar", !1);
    // private _nodeProps: NodeProps = { shape: NodeShape.CIRCLE, radius: 48 }
    vt(this, "_nodeProps", {
      shape: nt.RECTANGLE,
      width: 128,
      height: 48,
      cornerRadius: 4,
      reflexiveEdgeStart: "MOVABLE"
    });
    vt(this, "showNodeLabels", !0);
    vt(this, "nodePhysicsEnabled", !1);
    vt(this, "isGraphEditableInGUI", !0);
    vt(this, "zoomEnabled", !0);
    vt(this, "showLinkLabels", !0);
    vt(this, "fixedLinkDistanceEnabled", !1);
    vt(this, "markerBoxSize", 4);
    vt(this, "_markerPadding", 2 * this.markerBoxSize);
  }
  set nodeSize(e) {
    this.nodeProps.shape === nt.CIRCLE ? typeof e == "number" ? this.nodeProps.radius = e : this.nodeProps.radius = e.radius ?? 24 : this.nodeProps.shape === nt.RECTANGLE && (typeof e == "number" ? (this.nodeProps.width = e, this.nodeProps.height = e) : (this.nodeProps.width = e.width ?? 48, this.nodeProps.height = e.height ?? 48));
  }
  get nodeSize() {
    return this.nodeProps.shape === nt.CIRCLE ? { radius: this.nodeProps.radius } : { width: this.nodeProps.width, height: this.nodeProps.height };
  }
  set nodeProps(e) {
    this._nodeProps = e, e.shape === nt.CIRCLE ? this.nodeSize = e.radius : e.shape === nt.RECTANGLE && (this.nodeSize = { width: e.width, height: e.height });
  }
  get nodeProps() {
    return this._nodeProps;
  }
  get markerPadding() {
    return this._markerPadding;
  }
  get markerRef() {
    return this.markerBoxSize / 2;
  }
  get arrowPoints() {
    return [
      [0, 0],
      [0, this.markerBoxSize],
      [this.markerBoxSize, this.markerBoxSize / 2]
    ];
  }
  get markerPath() {
    return [0, 0, this.markerBoxSize, this.markerBoxSize].join(",");
  }
  /**
   * The canvas is bound to the view if zoom is disabled.
   * When zoom (and panning) is enabled, we don't need bounds because the user can navigate to nodes outside the view.
   * When zoom is disabled, bounds are used to ensure all nodes accessible to the user.
   */
  get isCanvasBoundToView() {
    return !this.zoomEnabled;
  }
}
function bm(t) {
  const e = t.replace(/\r\n/g, `
`).split(`
`), n = e.findIndex((l) => l.trim().startsWith("#")), r = n !== -1 ? e.slice(0, n) : e, i = n !== -1 ? e.slice(n + 1) : [], s = [];
  if (r.length)
    for (const l of r) {
      let [, u, c, a] = (l.match(/(\w+) (.*) \/COLOR:\/(.+)/) || l.match(/(\w+) (.*)/) || l.match(/(\w+)/) || []).map((f) => f.trim());
      c != null && c.includes("/COLOR:/") && (a = c, c = ""), u && s.push({
        idImported: u,
        label: c,
        color: a == null ? void 0 : a.replace("/COLOR:/", "")
      });
    }
  const o = [];
  if (i.length)
    for (const l of i) {
      let [, u, c, a, f] = (l.match(/(\w+) (\w+) (.*) \/COLOR:\/(.+)/) || l.match(/(\w+) (\w+) (.*)/) || l.match(/(\w+) (\w+)/) || []).map((h) => h.trim());
      a != null && a.includes("/COLOR:/") && (f = a, a = ""), u && c && o.push({
        sourceIdImported: u,
        targetIdImported: c,
        label: a,
        color: f == null ? void 0 : f.replace("/COLOR:/", "")
      });
    }
  return [s, o];
}
function xm(t) {
  const e = [];
  for (let r of t.nodes)
    e.push({
      idImported: r.id,
      x: r.x,
      y: r.y,
      label: r.label,
      color: r.color,
      fixedPosition: r.fixedPosition,
      deletable: r.deletable,
      labelEditable: r.labelEditable,
      allowIncomingLinks: r.allowIncomingLinks,
      allowOutgoingLinks: r.allowOutgoingLinks
    });
  const n = [];
  for (let r of t.links)
    n.push({
      sourceIdImported: r.sourceId,
      targetIdImported: r.targetId,
      label: r.label,
      color: r.color,
      deletable: r.deletable,
      labelEditable: r.labelEditable
    });
  return [e, n];
}
const Em = {
  "Amazon Silk": "amazon_silk",
  "Android Browser": "android",
  Bada: "bada",
  BlackBerry: "blackberry",
  Chrome: "chrome",
  Chromium: "chromium",
  Electron: "electron",
  Epiphany: "epiphany",
  Firefox: "firefox",
  Focus: "focus",
  Generic: "generic",
  "Google Search": "google_search",
  Googlebot: "googlebot",
  "Internet Explorer": "ie",
  "K-Meleon": "k_meleon",
  Maxthon: "maxthon",
  "Microsoft Edge": "edge",
  "MZ Browser": "mz",
  "NAVER Whale Browser": "naver",
  Opera: "opera",
  "Opera Coast": "opera_coast",
  PhantomJS: "phantomjs",
  Puffin: "puffin",
  QupZilla: "qupzilla",
  QQ: "qq",
  QQLite: "qqlite",
  Safari: "safari",
  Sailfish: "sailfish",
  "Samsung Internet for Android": "samsung_internet",
  SeaMonkey: "seamonkey",
  Sleipnir: "sleipnir",
  Swing: "swing",
  Tizen: "tizen",
  "UC Browser": "uc",
  Vivaldi: "vivaldi",
  "WebOS Browser": "webos",
  WeChat: "wechat",
  "Yandex Browser": "yandex",
  Roku: "roku"
}, Du = {
  amazon_silk: "Amazon Silk",
  android: "Android Browser",
  bada: "Bada",
  blackberry: "BlackBerry",
  chrome: "Chrome",
  chromium: "Chromium",
  electron: "Electron",
  epiphany: "Epiphany",
  firefox: "Firefox",
  focus: "Focus",
  generic: "Generic",
  googlebot: "Googlebot",
  google_search: "Google Search",
  ie: "Internet Explorer",
  k_meleon: "K-Meleon",
  maxthon: "Maxthon",
  edge: "Microsoft Edge",
  mz: "MZ Browser",
  naver: "NAVER Whale Browser",
  opera: "Opera",
  opera_coast: "Opera Coast",
  phantomjs: "PhantomJS",
  puffin: "Puffin",
  qupzilla: "QupZilla",
  qq: "QQ Browser",
  qqlite: "QQ Browser Lite",
  safari: "Safari",
  sailfish: "Sailfish",
  samsung_internet: "Samsung Internet for Android",
  seamonkey: "SeaMonkey",
  sleipnir: "Sleipnir",
  swing: "Swing",
  tizen: "Tizen",
  uc: "UC Browser",
  vivaldi: "Vivaldi",
  webos: "WebOS Browser",
  wechat: "WeChat",
  yandex: "Yandex Browser"
}, Lt = {
  tablet: "tablet",
  mobile: "mobile",
  desktop: "desktop",
  tv: "tv"
}, zt = {
  WindowsPhone: "Windows Phone",
  Windows: "Windows",
  MacOS: "macOS",
  iOS: "iOS",
  Android: "Android",
  WebOS: "WebOS",
  BlackBerry: "BlackBerry",
  Bada: "Bada",
  Tizen: "Tizen",
  Linux: "Linux",
  ChromeOS: "Chrome OS",
  PlayStation4: "PlayStation 4",
  Roku: "Roku"
}, ze = {
  EdgeHTML: "EdgeHTML",
  Blink: "Blink",
  Trident: "Trident",
  Presto: "Presto",
  Gecko: "Gecko",
  WebKit: "WebKit"
};
class I {
  /**
   * Get first matched item for a string
   * @param {RegExp} regexp
   * @param {String} ua
   * @return {Array|{index: number, input: string}|*|boolean|string}
   */
  static getFirstMatch(e, n) {
    const r = n.match(e);
    return r && r.length > 0 && r[1] || "";
  }
  /**
   * Get second matched item for a string
   * @param regexp
   * @param {String} ua
   * @return {Array|{index: number, input: string}|*|boolean|string}
   */
  static getSecondMatch(e, n) {
    const r = n.match(e);
    return r && r.length > 1 && r[2] || "";
  }
  /**
   * Match a regexp and return a constant or undefined
   * @param {RegExp} regexp
   * @param {String} ua
   * @param {*} _const Any const that will be returned if regexp matches the string
   * @return {*}
   */
  static matchAndReturnConst(e, n, r) {
    if (e.test(n))
      return r;
  }
  static getWindowsVersionName(e) {
    switch (e) {
      case "NT":
        return "NT";
      case "XP":
        return "XP";
      case "NT 5.0":
        return "2000";
      case "NT 5.1":
        return "XP";
      case "NT 5.2":
        return "2003";
      case "NT 6.0":
        return "Vista";
      case "NT 6.1":
        return "7";
      case "NT 6.2":
        return "8";
      case "NT 6.3":
        return "8.1";
      case "NT 10.0":
        return "10";
      default:
        return;
    }
  }
  /**
   * Get macOS version name
   *    10.5 - Leopard
   *    10.6 - Snow Leopard
   *    10.7 - Lion
   *    10.8 - Mountain Lion
   *    10.9 - Mavericks
   *    10.10 - Yosemite
   *    10.11 - El Capitan
   *    10.12 - Sierra
   *    10.13 - High Sierra
   *    10.14 - Mojave
   *    10.15 - Catalina
   *
   * @example
   *   getMacOSVersionName("10.14") // 'Mojave'
   *
   * @param  {string} version
   * @return {string} versionName
   */
  static getMacOSVersionName(e) {
    const n = e.split(".").splice(0, 2).map((r) => parseInt(r, 10) || 0);
    if (n.push(0), n[0] === 10)
      switch (n[1]) {
        case 5:
          return "Leopard";
        case 6:
          return "Snow Leopard";
        case 7:
          return "Lion";
        case 8:
          return "Mountain Lion";
        case 9:
          return "Mavericks";
        case 10:
          return "Yosemite";
        case 11:
          return "El Capitan";
        case 12:
          return "Sierra";
        case 13:
          return "High Sierra";
        case 14:
          return "Mojave";
        case 15:
          return "Catalina";
        default:
          return;
      }
  }
  /**
   * Get Android version name
   *    1.5 - Cupcake
   *    1.6 - Donut
   *    2.0 - Eclair
   *    2.1 - Eclair
   *    2.2 - Froyo
   *    2.x - Gingerbread
   *    3.x - Honeycomb
   *    4.0 - Ice Cream Sandwich
   *    4.1 - Jelly Bean
   *    4.4 - KitKat
   *    5.x - Lollipop
   *    6.x - Marshmallow
   *    7.x - Nougat
   *    8.x - Oreo
   *    9.x - Pie
   *
   * @example
   *   getAndroidVersionName("7.0") // 'Nougat'
   *
   * @param  {string} version
   * @return {string} versionName
   */
  static getAndroidVersionName(e) {
    const n = e.split(".").splice(0, 2).map((r) => parseInt(r, 10) || 0);
    if (n.push(0), !(n[0] === 1 && n[1] < 5)) {
      if (n[0] === 1 && n[1] < 6) return "Cupcake";
      if (n[0] === 1 && n[1] >= 6) return "Donut";
      if (n[0] === 2 && n[1] < 2) return "Eclair";
      if (n[0] === 2 && n[1] === 2) return "Froyo";
      if (n[0] === 2 && n[1] > 2) return "Gingerbread";
      if (n[0] === 3) return "Honeycomb";
      if (n[0] === 4 && n[1] < 1) return "Ice Cream Sandwich";
      if (n[0] === 4 && n[1] < 4) return "Jelly Bean";
      if (n[0] === 4 && n[1] >= 4) return "KitKat";
      if (n[0] === 5) return "Lollipop";
      if (n[0] === 6) return "Marshmallow";
      if (n[0] === 7) return "Nougat";
      if (n[0] === 8) return "Oreo";
      if (n[0] === 9) return "Pie";
    }
  }
  /**
   * Get version precisions count
   *
   * @example
   *   getVersionPrecision("1.10.3") // 3
   *
   * @param  {string} version
   * @return {number}
   */
  static getVersionPrecision(e) {
    return e.split(".").length;
  }
  /**
   * Calculate browser version weight
   *
   * @example
   *   compareVersions('1.10.2.1',  '1.8.2.1.90')    // 1
   *   compareVersions('1.010.2.1', '1.09.2.1.90');  // 1
   *   compareVersions('1.10.2.1',  '1.10.2.1');     // 0
   *   compareVersions('1.10.2.1',  '1.0800.2');     // -1
   *   compareVersions('1.10.2.1',  '1.10',  true);  // 0
   *
   * @param {String} versionA versions versions to compare
   * @param {String} versionB versions versions to compare
   * @param {boolean} [isLoose] enable loose comparison
   * @return {Number} comparison result: -1 when versionA is lower,
   * 1 when versionA is bigger, 0 when both equal
   */
  /* eslint consistent-return: 1 */
  static compareVersions(e, n, r = !1) {
    const i = I.getVersionPrecision(e), s = I.getVersionPrecision(n);
    let o = Math.max(i, s), l = 0;
    const u = I.map([e, n], (c) => {
      const a = o - I.getVersionPrecision(c), f = c + new Array(a + 1).join(".0");
      return I.map(f.split("."), (h) => new Array(20 - h.length).join("0") + h).reverse();
    });
    for (r && (l = o - Math.min(i, s)), o -= 1; o >= l; ) {
      if (u[0][o] > u[1][o])
        return 1;
      if (u[0][o] === u[1][o]) {
        if (o === l)
          return 0;
        o -= 1;
      } else if (u[0][o] < u[1][o])
        return -1;
    }
  }
  /**
   * Array::map polyfill
   *
   * @param  {Array} arr
   * @param  {Function} iterator
   * @return {Array}
   */
  static map(e, n) {
    const r = [];
    let i;
    if (Array.prototype.map)
      return Array.prototype.map.call(e, n);
    for (i = 0; i < e.length; i += 1)
      r.push(n(e[i]));
    return r;
  }
  /**
   * Array::find polyfill
   *
   * @param  {Array} arr
   * @param  {Function} predicate
   * @return {Array}
   */
  static find(e, n) {
    let r, i;
    if (Array.prototype.find)
      return Array.prototype.find.call(e, n);
    for (r = 0, i = e.length; r < i; r += 1) {
      const s = e[r];
      if (n(s, r))
        return s;
    }
  }
  /**
   * Object::assign polyfill
   *
   * @param  {Object} obj
   * @param  {Object} ...objs
   * @return {Object}
   */
  static assign(e, ...n) {
    const r = e;
    let i, s;
    if (Object.assign)
      return Object.assign(e, ...n);
    for (i = 0, s = n.length; i < s; i += 1) {
      const o = n[i];
      typeof o == "object" && o !== null && Object.keys(o).forEach((u) => {
        r[u] = o[u];
      });
    }
    return e;
  }
  /**
   * Get short version/alias for a browser name
   *
   * @example
   *   getBrowserAlias('Microsoft Edge') // edge
   *
   * @param  {string} browserName
   * @return {string}
   */
  static getBrowserAlias(e) {
    return Em[e];
  }
  /**
   * Get short version/alias for a browser name
   *
   * @example
   *   getBrowserAlias('edge') // Microsoft Edge
   *
   * @param  {string} browserAlias
   * @return {string}
   */
  static getBrowserTypeByAlias(e) {
    return Du[e] || "";
  }
}
const Et = /version\/(\d+(\.?_?\d+)+)/i, Pm = [
  /* Googlebot */
  {
    test: [/googlebot/i],
    describe(t) {
      const e = {
        name: "Googlebot"
      }, n = I.getFirstMatch(/googlebot\/(\d+(\.\d+))/i, t) || I.getFirstMatch(Et, t);
      return n && (e.version = n), e;
    }
  },
  /* Opera < 13.0 */
  {
    test: [/opera/i],
    describe(t) {
      const e = {
        name: "Opera"
      }, n = I.getFirstMatch(Et, t) || I.getFirstMatch(/(?:opera)[\s/](\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  /* Opera > 13.0 */
  {
    test: [/opr\/|opios/i],
    describe(t) {
      const e = {
        name: "Opera"
      }, n = I.getFirstMatch(/(?:opr|opios)[\s/](\S+)/i, t) || I.getFirstMatch(Et, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/SamsungBrowser/i],
    describe(t) {
      const e = {
        name: "Samsung Internet for Android"
      }, n = I.getFirstMatch(Et, t) || I.getFirstMatch(/(?:SamsungBrowser)[\s/](\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/Whale/i],
    describe(t) {
      const e = {
        name: "NAVER Whale Browser"
      }, n = I.getFirstMatch(Et, t) || I.getFirstMatch(/(?:whale)[\s/](\d+(?:\.\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/MZBrowser/i],
    describe(t) {
      const e = {
        name: "MZ Browser"
      }, n = I.getFirstMatch(/(?:MZBrowser)[\s/](\d+(?:\.\d+)+)/i, t) || I.getFirstMatch(Et, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/focus/i],
    describe(t) {
      const e = {
        name: "Focus"
      }, n = I.getFirstMatch(/(?:focus)[\s/](\d+(?:\.\d+)+)/i, t) || I.getFirstMatch(Et, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/swing/i],
    describe(t) {
      const e = {
        name: "Swing"
      }, n = I.getFirstMatch(/(?:swing)[\s/](\d+(?:\.\d+)+)/i, t) || I.getFirstMatch(Et, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/coast/i],
    describe(t) {
      const e = {
        name: "Opera Coast"
      }, n = I.getFirstMatch(Et, t) || I.getFirstMatch(/(?:coast)[\s/](\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/opt\/\d+(?:.?_?\d+)+/i],
    describe(t) {
      const e = {
        name: "Opera Touch"
      }, n = I.getFirstMatch(/(?:opt)[\s/](\d+(\.?_?\d+)+)/i, t) || I.getFirstMatch(Et, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/yabrowser/i],
    describe(t) {
      const e = {
        name: "Yandex Browser"
      }, n = I.getFirstMatch(/(?:yabrowser)[\s/](\d+(\.?_?\d+)+)/i, t) || I.getFirstMatch(Et, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/ucbrowser/i],
    describe(t) {
      const e = {
        name: "UC Browser"
      }, n = I.getFirstMatch(Et, t) || I.getFirstMatch(/(?:ucbrowser)[\s/](\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/Maxthon|mxios/i],
    describe(t) {
      const e = {
        name: "Maxthon"
      }, n = I.getFirstMatch(Et, t) || I.getFirstMatch(/(?:Maxthon|mxios)[\s/](\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/epiphany/i],
    describe(t) {
      const e = {
        name: "Epiphany"
      }, n = I.getFirstMatch(Et, t) || I.getFirstMatch(/(?:epiphany)[\s/](\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/puffin/i],
    describe(t) {
      const e = {
        name: "Puffin"
      }, n = I.getFirstMatch(Et, t) || I.getFirstMatch(/(?:puffin)[\s/](\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/sleipnir/i],
    describe(t) {
      const e = {
        name: "Sleipnir"
      }, n = I.getFirstMatch(Et, t) || I.getFirstMatch(/(?:sleipnir)[\s/](\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/k-meleon/i],
    describe(t) {
      const e = {
        name: "K-Meleon"
      }, n = I.getFirstMatch(Et, t) || I.getFirstMatch(/(?:k-meleon)[\s/](\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/micromessenger/i],
    describe(t) {
      const e = {
        name: "WeChat"
      }, n = I.getFirstMatch(/(?:micromessenger)[\s/](\d+(\.?_?\d+)+)/i, t) || I.getFirstMatch(Et, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/qqbrowser/i],
    describe(t) {
      const e = {
        name: /qqbrowserlite/i.test(t) ? "QQ Browser Lite" : "QQ Browser"
      }, n = I.getFirstMatch(/(?:qqbrowserlite|qqbrowser)[/](\d+(\.?_?\d+)+)/i, t) || I.getFirstMatch(Et, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/msie|trident/i],
    describe(t) {
      const e = {
        name: "Internet Explorer"
      }, n = I.getFirstMatch(/(?:msie |rv:)(\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/\sedg\//i],
    describe(t) {
      const e = {
        name: "Microsoft Edge"
      }, n = I.getFirstMatch(/\sedg\/(\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/edg([ea]|ios)/i],
    describe(t) {
      const e = {
        name: "Microsoft Edge"
      }, n = I.getSecondMatch(/edg([ea]|ios)\/(\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/vivaldi/i],
    describe(t) {
      const e = {
        name: "Vivaldi"
      }, n = I.getFirstMatch(/vivaldi\/(\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/seamonkey/i],
    describe(t) {
      const e = {
        name: "SeaMonkey"
      }, n = I.getFirstMatch(/seamonkey\/(\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/sailfish/i],
    describe(t) {
      const e = {
        name: "Sailfish"
      }, n = I.getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/silk/i],
    describe(t) {
      const e = {
        name: "Amazon Silk"
      }, n = I.getFirstMatch(/silk\/(\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/phantom/i],
    describe(t) {
      const e = {
        name: "PhantomJS"
      }, n = I.getFirstMatch(/phantomjs\/(\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/slimerjs/i],
    describe(t) {
      const e = {
        name: "SlimerJS"
      }, n = I.getFirstMatch(/slimerjs\/(\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/blackberry|\bbb\d+/i, /rim\stablet/i],
    describe(t) {
      const e = {
        name: "BlackBerry"
      }, n = I.getFirstMatch(Et, t) || I.getFirstMatch(/blackberry[\d]+\/(\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/(web|hpw)[o0]s/i],
    describe(t) {
      const e = {
        name: "WebOS Browser"
      }, n = I.getFirstMatch(Et, t) || I.getFirstMatch(/w(?:eb)?[o0]sbrowser\/(\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/bada/i],
    describe(t) {
      const e = {
        name: "Bada"
      }, n = I.getFirstMatch(/dolfin\/(\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/tizen/i],
    describe(t) {
      const e = {
        name: "Tizen"
      }, n = I.getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.?_?\d+)+)/i, t) || I.getFirstMatch(Et, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/qupzilla/i],
    describe(t) {
      const e = {
        name: "QupZilla"
      }, n = I.getFirstMatch(/(?:qupzilla)[\s/](\d+(\.?_?\d+)+)/i, t) || I.getFirstMatch(Et, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/firefox|iceweasel|fxios/i],
    describe(t) {
      const e = {
        name: "Firefox"
      }, n = I.getFirstMatch(/(?:firefox|iceweasel|fxios)[\s/](\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/electron/i],
    describe(t) {
      const e = {
        name: "Electron"
      }, n = I.getFirstMatch(/(?:electron)\/(\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/MiuiBrowser/i],
    describe(t) {
      const e = {
        name: "Miui"
      }, n = I.getFirstMatch(/(?:MiuiBrowser)[\s/](\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/chromium/i],
    describe(t) {
      const e = {
        name: "Chromium"
      }, n = I.getFirstMatch(/(?:chromium)[\s/](\d+(\.?_?\d+)+)/i, t) || I.getFirstMatch(Et, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/chrome|crios|crmo/i],
    describe(t) {
      const e = {
        name: "Chrome"
      }, n = I.getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/GSA/i],
    describe(t) {
      const e = {
        name: "Google Search"
      }, n = I.getFirstMatch(/(?:GSA)\/(\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  /* Android Browser */
  {
    test(t) {
      const e = !t.test(/like android/i), n = t.test(/android/i);
      return e && n;
    },
    describe(t) {
      const e = {
        name: "Android Browser"
      }, n = I.getFirstMatch(Et, t);
      return n && (e.version = n), e;
    }
  },
  /* PlayStation 4 */
  {
    test: [/playstation 4/i],
    describe(t) {
      const e = {
        name: "PlayStation 4"
      }, n = I.getFirstMatch(Et, t);
      return n && (e.version = n), e;
    }
  },
  /* Safari */
  {
    test: [/safari|applewebkit/i],
    describe(t) {
      const e = {
        name: "Safari"
      }, n = I.getFirstMatch(Et, t);
      return n && (e.version = n), e;
    }
  },
  /* Something else */
  {
    test: [/.*/i],
    describe(t) {
      const e = /^(.*)\/(.*) /, n = /^(.*)\/(.*)[ \t]\((.*)/, i = t.search("\\(") !== -1 ? n : e;
      return {
        name: I.getFirstMatch(i, t),
        version: I.getSecondMatch(i, t)
      };
    }
  }
], km = [
  /* Roku */
  {
    test: [/Roku\/DVP/],
    describe(t) {
      const e = I.getFirstMatch(/Roku\/DVP-(\d+\.\d+)/i, t);
      return {
        name: zt.Roku,
        version: e
      };
    }
  },
  /* Windows Phone */
  {
    test: [/windows phone/i],
    describe(t) {
      const e = I.getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i, t);
      return {
        name: zt.WindowsPhone,
        version: e
      };
    }
  },
  /* Windows */
  {
    test: [/windows /i],
    describe(t) {
      const e = I.getFirstMatch(/Windows ((NT|XP)( \d\d?.\d)?)/i, t), n = I.getWindowsVersionName(e);
      return {
        name: zt.Windows,
        version: e,
        versionName: n
      };
    }
  },
  /* Firefox on iPad */
  {
    test: [/Macintosh(.*?) FxiOS(.*?)\//],
    describe(t) {
      const e = {
        name: zt.iOS
      }, n = I.getSecondMatch(/(Version\/)(\d[\d.]+)/, t);
      return n && (e.version = n), e;
    }
  },
  /* macOS */
  {
    test: [/macintosh/i],
    describe(t) {
      const e = I.getFirstMatch(/mac os x (\d+(\.?_?\d+)+)/i, t).replace(/[_\s]/g, "."), n = I.getMacOSVersionName(e), r = {
        name: zt.MacOS,
        version: e
      };
      return n && (r.versionName = n), r;
    }
  },
  /* iOS */
  {
    test: [/(ipod|iphone|ipad)/i],
    describe(t) {
      const e = I.getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i, t).replace(/[_\s]/g, ".");
      return {
        name: zt.iOS,
        version: e
      };
    }
  },
  /* Android */
  {
    test(t) {
      const e = !t.test(/like android/i), n = t.test(/android/i);
      return e && n;
    },
    describe(t) {
      const e = I.getFirstMatch(/android[\s/-](\d+(\.\d+)*)/i, t), n = I.getAndroidVersionName(e), r = {
        name: zt.Android,
        version: e
      };
      return n && (r.versionName = n), r;
    }
  },
  /* WebOS */
  {
    test: [/(web|hpw)[o0]s/i],
    describe(t) {
      const e = I.getFirstMatch(/(?:web|hpw)[o0]s\/(\d+(\.\d+)*)/i, t), n = {
        name: zt.WebOS
      };
      return e && e.length && (n.version = e), n;
    }
  },
  /* BlackBerry */
  {
    test: [/blackberry|\bbb\d+/i, /rim\stablet/i],
    describe(t) {
      const e = I.getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i, t) || I.getFirstMatch(/blackberry\d+\/(\d+([_\s]\d+)*)/i, t) || I.getFirstMatch(/\bbb(\d+)/i, t);
      return {
        name: zt.BlackBerry,
        version: e
      };
    }
  },
  /* Bada */
  {
    test: [/bada/i],
    describe(t) {
      const e = I.getFirstMatch(/bada\/(\d+(\.\d+)*)/i, t);
      return {
        name: zt.Bada,
        version: e
      };
    }
  },
  /* Tizen */
  {
    test: [/tizen/i],
    describe(t) {
      const e = I.getFirstMatch(/tizen[/\s](\d+(\.\d+)*)/i, t);
      return {
        name: zt.Tizen,
        version: e
      };
    }
  },
  /* Linux */
  {
    test: [/linux/i],
    describe() {
      return {
        name: zt.Linux
      };
    }
  },
  /* Chrome OS */
  {
    test: [/CrOS/],
    describe() {
      return {
        name: zt.ChromeOS
      };
    }
  },
  /* Playstation 4 */
  {
    test: [/PlayStation 4/],
    describe(t) {
      const e = I.getFirstMatch(/PlayStation 4[/\s](\d+(\.\d+)*)/i, t);
      return {
        name: zt.PlayStation4,
        version: e
      };
    }
  }
], Mm = [
  /* Googlebot */
  {
    test: [/googlebot/i],
    describe() {
      return {
        type: "bot",
        vendor: "Google"
      };
    }
  },
  /* Huawei */
  {
    test: [/huawei/i],
    describe(t) {
      const e = I.getFirstMatch(/(can-l01)/i, t) && "Nova", n = {
        type: Lt.mobile,
        vendor: "Huawei"
      };
      return e && (n.model = e), n;
    }
  },
  /* Nexus Tablet */
  {
    test: [/nexus\s*(?:7|8|9|10).*/i],
    describe() {
      return {
        type: Lt.tablet,
        vendor: "Nexus"
      };
    }
  },
  /* iPad */
  {
    test: [/ipad/i],
    describe() {
      return {
        type: Lt.tablet,
        vendor: "Apple",
        model: "iPad"
      };
    }
  },
  /* Firefox on iPad */
  {
    test: [/Macintosh(.*?) FxiOS(.*?)\//],
    describe() {
      return {
        type: Lt.tablet,
        vendor: "Apple",
        model: "iPad"
      };
    }
  },
  /* Amazon Kindle Fire */
  {
    test: [/kftt build/i],
    describe() {
      return {
        type: Lt.tablet,
        vendor: "Amazon",
        model: "Kindle Fire HD 7"
      };
    }
  },
  /* Another Amazon Tablet with Silk */
  {
    test: [/silk/i],
    describe() {
      return {
        type: Lt.tablet,
        vendor: "Amazon"
      };
    }
  },
  /* Tablet */
  {
    test: [/tablet(?! pc)/i],
    describe() {
      return {
        type: Lt.tablet
      };
    }
  },
  /* iPod/iPhone */
  {
    test(t) {
      const e = t.test(/ipod|iphone/i), n = t.test(/like (ipod|iphone)/i);
      return e && !n;
    },
    describe(t) {
      const e = I.getFirstMatch(/(ipod|iphone)/i, t);
      return {
        type: Lt.mobile,
        vendor: "Apple",
        model: e
      };
    }
  },
  /* Nexus Mobile */
  {
    test: [/nexus\s*[0-6].*/i, /galaxy nexus/i],
    describe() {
      return {
        type: Lt.mobile,
        vendor: "Nexus"
      };
    }
  },
  /* Mobile */
  {
    test: [/[^-]mobi/i],
    describe() {
      return {
        type: Lt.mobile
      };
    }
  },
  /* BlackBerry */
  {
    test(t) {
      return t.getBrowserName(!0) === "blackberry";
    },
    describe() {
      return {
        type: Lt.mobile,
        vendor: "BlackBerry"
      };
    }
  },
  /* Bada */
  {
    test(t) {
      return t.getBrowserName(!0) === "bada";
    },
    describe() {
      return {
        type: Lt.mobile
      };
    }
  },
  /* Windows Phone */
  {
    test(t) {
      return t.getBrowserName() === "windows phone";
    },
    describe() {
      return {
        type: Lt.mobile,
        vendor: "Microsoft"
      };
    }
  },
  /* Android Tablet */
  {
    test(t) {
      const e = Number(String(t.getOSVersion()).split(".")[0]);
      return t.getOSName(!0) === "android" && e >= 3;
    },
    describe() {
      return {
        type: Lt.tablet
      };
    }
  },
  /* Android Mobile */
  {
    test(t) {
      return t.getOSName(!0) === "android";
    },
    describe() {
      return {
        type: Lt.mobile
      };
    }
  },
  /* desktop */
  {
    test(t) {
      return t.getOSName(!0) === "macos";
    },
    describe() {
      return {
        type: Lt.desktop,
        vendor: "Apple"
      };
    }
  },
  /* Windows */
  {
    test(t) {
      return t.getOSName(!0) === "windows";
    },
    describe() {
      return {
        type: Lt.desktop
      };
    }
  },
  /* Linux */
  {
    test(t) {
      return t.getOSName(!0) === "linux";
    },
    describe() {
      return {
        type: Lt.desktop
      };
    }
  },
  /* PlayStation 4 */
  {
    test(t) {
      return t.getOSName(!0) === "playstation 4";
    },
    describe() {
      return {
        type: Lt.tv
      };
    }
  },
  /* Roku */
  {
    test(t) {
      return t.getOSName(!0) === "roku";
    },
    describe() {
      return {
        type: Lt.tv
      };
    }
  }
], Sm = [
  /* EdgeHTML */
  {
    test(t) {
      return t.getBrowserName(!0) === "microsoft edge";
    },
    describe(t) {
      if (/\sedg\//i.test(t))
        return {
          name: ze.Blink
        };
      const n = I.getFirstMatch(/edge\/(\d+(\.?_?\d+)+)/i, t);
      return {
        name: ze.EdgeHTML,
        version: n
      };
    }
  },
  /* Trident */
  {
    test: [/trident/i],
    describe(t) {
      const e = {
        name: ze.Trident
      }, n = I.getFirstMatch(/trident\/(\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  /* Presto */
  {
    test(t) {
      return t.test(/presto/i);
    },
    describe(t) {
      const e = {
        name: ze.Presto
      }, n = I.getFirstMatch(/presto\/(\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  /* Gecko */
  {
    test(t) {
      const e = t.test(/gecko/i), n = t.test(/like gecko/i);
      return e && !n;
    },
    describe(t) {
      const e = {
        name: ze.Gecko
      }, n = I.getFirstMatch(/gecko\/(\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  /* Blink */
  {
    test: [/(apple)?webkit\/537\.36/i],
    describe() {
      return {
        name: ze.Blink
      };
    }
  },
  /* WebKit */
  {
    test: [/(apple)?webkit/i],
    describe(t) {
      const e = {
        name: ze.WebKit
      }, n = I.getFirstMatch(/webkit\/(\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  }
];
class rl {
  /**
   * Create instance of Parser
   *
   * @param {String} UA User-Agent string
   * @param {Boolean} [skipParsing=false] parser can skip parsing in purpose of performance
   * improvements if you need to make a more particular parsing
   * like {@link Parser#parseBrowser} or {@link Parser#parsePlatform}
   *
   * @throw {Error} in case of empty UA String
   *
   * @constructor
   */
  constructor(e, n = !1) {
    if (e == null || e === "")
      throw new Error("UserAgent parameter can't be empty");
    this._ua = e, this.parsedResult = {}, n !== !0 && this.parse();
  }
  /**
   * Get UserAgent string of current Parser instance
   * @return {String} User-Agent String of the current <Parser> object
   *
   * @public
   */
  getUA() {
    return this._ua;
  }
  /**
   * Test a UA string for a regexp
   * @param {RegExp} regex
   * @return {Boolean}
   */
  test(e) {
    return e.test(this._ua);
  }
  /**
   * Get parsed browser object
   * @return {Object}
   */
  parseBrowser() {
    this.parsedResult.browser = {};
    const e = I.find(Pm, (n) => {
      if (typeof n.test == "function")
        return n.test(this);
      if (n.test instanceof Array)
        return n.test.some((r) => this.test(r));
      throw new Error("Browser's test function is not valid");
    });
    return e && (this.parsedResult.browser = e.describe(this.getUA())), this.parsedResult.browser;
  }
  /**
   * Get parsed browser object
   * @return {Object}
   *
   * @public
   */
  getBrowser() {
    return this.parsedResult.browser ? this.parsedResult.browser : this.parseBrowser();
  }
  /**
   * Get browser's name
   * @return {String} Browser's name or an empty string
   *
   * @public
   */
  getBrowserName(e) {
    return e ? String(this.getBrowser().name).toLowerCase() || "" : this.getBrowser().name || "";
  }
  /**
   * Get browser's version
   * @return {String} version of browser
   *
   * @public
   */
  getBrowserVersion() {
    return this.getBrowser().version;
  }
  /**
   * Get OS
   * @return {Object}
   *
   * @example
   * this.getOS();
   * {
   *   name: 'macOS',
   *   version: '10.11.12'
   * }
   */
  getOS() {
    return this.parsedResult.os ? this.parsedResult.os : this.parseOS();
  }
  /**
   * Parse OS and save it to this.parsedResult.os
   * @return {*|{}}
   */
  parseOS() {
    this.parsedResult.os = {};
    const e = I.find(km, (n) => {
      if (typeof n.test == "function")
        return n.test(this);
      if (n.test instanceof Array)
        return n.test.some((r) => this.test(r));
      throw new Error("Browser's test function is not valid");
    });
    return e && (this.parsedResult.os = e.describe(this.getUA())), this.parsedResult.os;
  }
  /**
   * Get OS name
   * @param {Boolean} [toLowerCase] return lower-cased value
   * @return {String} name of the OS — macOS, Windows, Linux, etc.
   */
  getOSName(e) {
    const { name: n } = this.getOS();
    return e ? String(n).toLowerCase() || "" : n || "";
  }
  /**
   * Get OS version
   * @return {String} full version with dots ('10.11.12', '5.6', etc)
   */
  getOSVersion() {
    return this.getOS().version;
  }
  /**
   * Get parsed platform
   * @return {{}}
   */
  getPlatform() {
    return this.parsedResult.platform ? this.parsedResult.platform : this.parsePlatform();
  }
  /**
   * Get platform name
   * @param {Boolean} [toLowerCase=false]
   * @return {*}
   */
  getPlatformType(e = !1) {
    const { type: n } = this.getPlatform();
    return e ? String(n).toLowerCase() || "" : n || "";
  }
  /**
   * Get parsed platform
   * @return {{}}
   */
  parsePlatform() {
    this.parsedResult.platform = {};
    const e = I.find(Mm, (n) => {
      if (typeof n.test == "function")
        return n.test(this);
      if (n.test instanceof Array)
        return n.test.some((r) => this.test(r));
      throw new Error("Browser's test function is not valid");
    });
    return e && (this.parsedResult.platform = e.describe(this.getUA())), this.parsedResult.platform;
  }
  /**
   * Get parsed engine
   * @return {{}}
   */
  getEngine() {
    return this.parsedResult.engine ? this.parsedResult.engine : this.parseEngine();
  }
  /**
   * Get engines's name
   * @return {String} Engines's name or an empty string
   *
   * @public
   */
  getEngineName(e) {
    return e ? String(this.getEngine().name).toLowerCase() || "" : this.getEngine().name || "";
  }
  /**
   * Get parsed platform
   * @return {{}}
   */
  parseEngine() {
    this.parsedResult.engine = {};
    const e = I.find(Sm, (n) => {
      if (typeof n.test == "function")
        return n.test(this);
      if (n.test instanceof Array)
        return n.test.some((r) => this.test(r));
      throw new Error("Browser's test function is not valid");
    });
    return e && (this.parsedResult.engine = e.describe(this.getUA())), this.parsedResult.engine;
  }
  /**
   * Parse full information about the browser
   * @returns {Parser}
   */
  parse() {
    return this.parseBrowser(), this.parseOS(), this.parsePlatform(), this.parseEngine(), this;
  }
  /**
   * Get parsed result
   * @return {ParsedResult}
   */
  getResult() {
    return I.assign({}, this.parsedResult);
  }
  /**
   * Check if parsed browser matches certain conditions
   *
   * @param {Object} checkTree It's one or two layered object,
   * which can include a platform or an OS on the first layer
   * and should have browsers specs on the bottom-laying layer
   *
   * @returns {Boolean|undefined} Whether the browser satisfies the set conditions or not.
   * Returns `undefined` when the browser is no described in the checkTree object.
   *
   * @example
   * const browser = Bowser.getParser(window.navigator.userAgent);
   * if (browser.satisfies({chrome: '>118.01.1322' }))
   * // or with os
   * if (browser.satisfies({windows: { chrome: '>118.01.1322' } }))
   * // or with platforms
   * if (browser.satisfies({desktop: { chrome: '>118.01.1322' } }))
   */
  satisfies(e) {
    const n = {};
    let r = 0;
    const i = {};
    let s = 0;
    if (Object.keys(e).forEach((l) => {
      const u = e[l];
      typeof u == "string" ? (i[l] = u, s += 1) : typeof u == "object" && (n[l] = u, r += 1);
    }), r > 0) {
      const l = Object.keys(n), u = I.find(l, (a) => this.isOS(a));
      if (u) {
        const a = this.satisfies(n[u]);
        if (a !== void 0)
          return a;
      }
      const c = I.find(
        l,
        (a) => this.isPlatform(a)
      );
      if (c) {
        const a = this.satisfies(n[c]);
        if (a !== void 0)
          return a;
      }
    }
    if (s > 0) {
      const l = Object.keys(i), u = I.find(l, (c) => this.isBrowser(c, !0));
      if (u !== void 0)
        return this.compareVersion(i[u]);
    }
  }
  /**
   * Check if the browser name equals the passed string
   * @param browserName The string to compare with the browser name
   * @param [includingAlias=false] The flag showing whether alias will be included into comparison
   * @returns {boolean}
   */
  isBrowser(e, n = !1) {
    const r = this.getBrowserName().toLowerCase();
    let i = e.toLowerCase();
    const s = I.getBrowserTypeByAlias(i);
    return n && s && (i = s.toLowerCase()), i === r;
  }
  compareVersion(e) {
    let n = [0], r = e, i = !1;
    const s = this.getBrowserVersion();
    if (typeof s == "string")
      return e[0] === ">" || e[0] === "<" ? (r = e.substr(1), e[1] === "=" ? (i = !0, r = e.substr(2)) : n = [], e[0] === ">" ? n.push(1) : n.push(-1)) : e[0] === "=" ? r = e.substr(1) : e[0] === "~" && (i = !0, r = e.substr(1)), n.indexOf(
        I.compareVersions(s, r, i)
      ) > -1;
  }
  isOS(e) {
    return this.getOSName(!0) === String(e).toLowerCase();
  }
  isPlatform(e) {
    return this.getPlatformType(!0) === String(e).toLowerCase();
  }
  isEngine(e) {
    return this.getEngineName(!0) === String(e).toLowerCase();
  }
  /**
   * Is anything? Check if the browser is called "anything",
   * the OS called "anything" or the platform called "anything"
   * @param {String} anything
   * @param [includingAlias=false] The flag showing whether alias will be included into comparison
   * @returns {Boolean}
   */
  is(e, n = !1) {
    return this.isBrowser(e, n) || this.isOS(e) || this.isPlatform(e);
  }
  /**
   * Check if any of the given values satisfies this.is(anything)
   * @param {String[]} anythings
   * @returns {Boolean}
   */
  some(e = []) {
    return e.some((n) => this.is(n));
  }
}
/*!
 * Bowser - a browser detector
 * https://github.com/lancedikson/bowser
 * MIT License | (c) Dustin Diaz 2012-2015
 * MIT License | (c) Denis Demchenko 2015-2019
 */
class Tm {
  /**
   * Creates a {@link Parser} instance
   *
   * @param {String} UA UserAgent string
   * @param {Boolean} [skipParsing=false] Will make the Parser postpone parsing until you ask it
   * explicitly. Same as `skipParsing` for {@link Parser}.
   * @returns {Parser}
   * @throws {Error} when UA is not a String
   *
   * @example
   * const parser = Bowser.getParser(window.navigator.userAgent);
   * const result = parser.getResult();
   */
  static getParser(e, n = !1) {
    if (typeof e != "string")
      throw new Error("UserAgent should be a string");
    return new rl(e, n);
  }
  /**
   * Creates a {@link Parser} instance and runs {@link Parser.getResult} immediately
   *
   * @param UA
   * @return {ParsedResult}
   *
   * @example
   * const result = Bowser.parse(window.navigator.userAgent);
   */
  static parse(e) {
    return new rl(e).getResult();
  }
  static get BROWSER_MAP() {
    return Du;
  }
  static get ENGINE_MAP() {
    return ze;
  }
  static get OS_MAP() {
    return zt;
  }
  static get PLATFORMS_MAP() {
    return Lt;
  }
}
const Nm = /* @__PURE__ */ ie("div", { class: "graph-controller__graph-host uninitialised" }, null, -1), Cm = /* @__PURE__ */ bs({
  __name: "GraphComponent",
  setup(t, { expose: e }) {
    const n = Wi(() => {
      const g = document.querySelectorAll("graph-component");
      let k;
      for (let E = 0; E < g.length; E++) {
        const S = g[E], L = Tt(S.shadowRoot);
        let G;
        if (L.empty() ? G = Tt(
          ".graph-controller__graph-host.uninitialised"
        ) : G = L.select(
          ".graph-controller__graph-host.uninitialised"
        ), !G.empty()) {
          G.classed("uninitialised", !1), k = G;
          break;
        }
      }
      return k === void 0 && (k = Tt(
        ".graph-controller__graph-host.uninitialised"
      ), k.classed("uninitialised", !1)), k;
    }), r = Wi(() => {
      let g = n.value.node().parentElement;
      g || (g = n.value.node().getRootNode().host);
      let k = g.getAttribute("id");
      return k || "gc";
    });
    Vl(() => {
      ve();
    }), zl(() => {
      _(), window.addEventListener("resize", Gs);
    }), xs(() => {
      window.removeEventListener("resize", Gs);
    });
    const s = Tm.getParser(window.navigator.userAgent).getPlatformType(!0);
    let o = !1, l = { x: -1e5, y: -1e5 };
    const u = to(new Yo()), c = to(!1), a = li(new vm());
    let f, h = 400, p = 400, m, v, w, d, P, N, y, M, R, z = 0, q = 0, Z = 1, V, J;
    e({
      getGraph: ut,
      setGraph: U,
      printGraph: x,
      deleteElement: D,
      setLabel: T,
      setColor: F,
      setNodeSize: $,
      setNodeShape: K,
      setNodeProps: Y,
      setDeletable: it,
      setLabelEditable: st,
      setNodesLinkPermission: Pt,
      setNodesFixedPosition: wt,
      setEditability: yt,
      toggleNodeLabels: It,
      toggleLinkLabels: kt,
      toggleZoom: jt,
      toggleNodePhysics: _t,
      toggleFixedLinkDistance: bt,
      toggleGraphEditingInGUI: ue,
      resetView: Je
    });
    function ut(g = "json", k = !0, E = !0, S = !0) {
      if (g.toLowerCase() === "json")
        return JSON.parse(
          u.value.toJSON(
            a.showLinkLabels,
            a.showLinkLabels,
            k,
            k,
            E,
            S,
            S
          )
        );
      if (g.toLowerCase() === "tgf")
        return u.value.toTGF(a.showNodeLabels, a.showLinkLabels, !0, !0);
      console.error('Invalid format while using getGraph(). Please choose "JSON" or "TGF".');
    }
    function U(g) {
      typeof g == "object" || typeof g == "string" ? Uu(g) : Hs();
    }
    function x(g = "json", k = !0, E = !0, S = !0) {
      g.toLowerCase() === "json" ? console.log(
        u.value.toJSON(
          a.showLinkLabels,
          a.showLinkLabels,
          k,
          k,
          E,
          S,
          S
        )
      ) : console.log(u.value.toTGF(a.showNodeLabels, a.showLinkLabels));
    }
    function D(g) {
      if (g !== void 0) {
        const [k, E] = je(g);
        for (const S of k)
          P.filter((L) => L.id === S).each(function(L) {
            let G = u.value.removeNode(L);
            if (G !== void 0) {
              let [at, Mt] = G;
              Pr(at, n.value), Mt.forEach((St) => {
                en(St, n.value);
              });
            }
          });
        for (const S of E)
          d.filter((L) => L.id === S).each(function(L) {
            let G = u.value.removeLink(L);
            G !== void 0 && en(G, n.value);
          });
      } else
        P.each(function(k) {
          let E = u.value.removeNode(k);
          if (E !== void 0) {
            let [S, L] = E;
            Pr(S, n.value), L.forEach((G) => {
              en(G, n.value);
            });
          }
        }), d.each(function(k) {
          let E = u.value.removeLink(k);
          E !== void 0 && en(E, n.value);
        });
      c.value = u.value.nodes.length > 0, j();
    }
    function T(g, k) {
      if (k !== void 0) {
        const [E, S] = je(k);
        for (const L of E)
          P.filter((G) => G.id === L).each((G) => {
            Rn(G, g);
          });
        for (const L of S)
          d.filter((G) => G.id === L).each((G) => {
            Rn(G, g);
          });
      } else
        P.each((E) => {
          Rn(E, g);
        }), d.each((E) => {
          Rn(E, g);
        });
    }
    function F(g, k) {
      if (k !== void 0) {
        const [E, S] = je(k);
        Ds(S);
        for (const L of E)
          P.selectAll(".graph-controller__node").filter((G) => G.id === L).each((G) => G.color = g).style("fill", g);
        for (const L of S)
          d.selectAll(".graph-controller__link").filter((G) => G.id === L).each((G) => G.color = g).style("stroke", g);
      } else
        P.selectAll(".graph-controller__node").each((E) => E.color = g).style("fill", g), Ds(u.value.links.map((E) => E.id)), d.selectAll(".graph-controller__link").each((E) => E.color = g).style("stroke", g);
      is(w, r.value, a, g), j();
    }
    function $(g, k) {
      typeof g == "number" && typeof k == "number" && a.nodeProps.shape === nt.RECTANGLE ? a.nodeSize = { width: g, height: k } : typeof g == "number" || a.nodeProps.shape === nt.CIRCLE && mn(["radius"], Object.keys(g), !1) || a.nodeProps.shape === nt.RECTANGLE && mn(["width", "height"], Object.keys(g), !1) ? a.nodeSize = g : qe(
        "Invalid Size Object",
        `For circular nodes: {radius: number}
For rectangular nodes: {width: number, height: number}`
      ), Je();
    }
    function K(g) {
      if (g === "circle") g = nt.CIRCLE;
      else if (g === "rect") g = nt.RECTANGLE;
      else {
        qe("Invalid Shape", `For circular nodes: 'circle'
For rectangular nodes: 'rect'`);
        return;
      }
      let k = a.nodeSize;
      if (a.nodeProps.shape !== g) {
        if (g === nt.CIRCLE) {
          a.nodeProps = {
            shape: g,
            radius: k.width / 2
          };
          for (let E of u.value.nodes)
            E.x = E.x + a.nodeProps.radius, E.y = E.y + a.nodeProps.radius;
        } else if (g === nt.RECTANGLE) {
          a.nodeProps = {
            shape: g,
            width: k.radius * 2,
            height: k.radius * 2,
            cornerRadius: 4,
            reflexiveEdgeStart: "MOVABLE"
          };
          for (let E of u.value.nodes)
            E.x = E.x - a.nodeProps.width / 2, E.y = E.y - a.nodeProps.height / 2;
        }
        Je();
      }
    }
    function Y(g) {
      if (mn(["shape"], Object.keys(g), !1)) {
        if (g.shape === nt.CIRCLE) {
          const k = ["shape", "radius"];
          mn(k, Object.keys(g), !0) && (a.nodeProps = g), Vn(k, Object.keys(g));
        } else if (g.shape === nt.RECTANGLE) {
          const k = [
            "shape",
            "width",
            "height",
            "cornerRadius",
            "reflexiveEdgeStart"
          ];
          mn(k, Object.keys(g), !0) && (Object.values(pt).includes(g.reflexiveEdgeStart) || g.reflexiveEdgeStart === "MOVABLE" ? a.nodeProps = g : qe(
            "Invalid reflexiveEdgeStart Value",
            "Use RIGHT, BOTTOMRIGHT, BOTTOM, BOTTOMLEFT, LEFT, TOPLEFT, TOP, TOPRIGHT or MOVABLE."
          )), Vn(k, Object.keys(g));
        }
        Je();
      } else
        qe(
          "Invalid NodeProps Object",
          `For circular nodes: {shape: NodeShape, radius: number}
For rectangular nodes: {shape: 'rect', width: number, height: number, cornerRadius: number, reflexiveEdgeStart: SideType | 'MOVABLE'}`
        );
    }
    function it(g, k) {
      if (k !== void 0) {
        const [E, S] = je(k);
        for (const L of E)
          P.filter((G) => G.id === L).each((G) => {
            G.deletable = g;
          });
        for (const L of S)
          d.filter((G) => G.id === L).each((G) => {
            G.deletable = g;
          });
      } else
        P.each((E) => {
          E.deletable = g;
        }), d.each((E) => {
          E.deletable = g;
        });
    }
    function st(g, k) {
      if (k !== void 0) {
        const [E, S] = je(k);
        for (const L of E)
          P.filter((G) => G.id === L).each((G) => {
            G.labelEditable = g;
          });
        for (const L of S)
          d.filter((G) => G.id === L).each((G) => {
            G.labelEditable = g;
          });
      } else
        P.each((E) => {
          E.labelEditable = g;
        }), d.each((E) => {
          E.labelEditable = g;
        });
    }
    function Pt(g, k, E) {
      if (E !== void 0) {
        const [S, L] = je(E);
        for (const G of S)
          P.filter((at) => at.id === G).each((at) => {
            at.allowIncomingLinks = g, at.allowOutgoingLinks = k;
          });
      } else
        P.each((S) => {
          S.allowIncomingLinks = g, S.allowOutgoingLinks = k;
        });
    }
    function wt(g, k) {
      if (k !== void 0) {
        const [E, S] = je(k);
        for (const L of E)
          P.filter((G) => G.id === L).each((G) => {
            kr(G, g);
          });
      } else
        P.each((E) => {
          kr(E, g);
        });
    }
    function yt(g, k) {
      const E = [
        "fixedPosition",
        "deletable",
        "labelEditable",
        "allowIncomingLinks",
        "allowOutgoingLinks"
      ], S = ["deletable", "labelEditable"];
      if (k !== void 0) {
        const [L, G] = je(k), at = L.length === 0;
        for (const Mt of L)
          P.filter((St) => St.id === Mt).each(function(St) {
            St.deletable = g.deletable ?? St.deletable, St.labelEditable = g.labelEditable ?? St.labelEditable, "fixedPosition" in g && kr(St, g.fixedPosition), "allowIncomingLinks" in g && (St.allowIncomingLinks = g.allowIncomingLinks ?? St.allowIncomingLinks), "allowOutgoingLinks" in g && (St.allowOutgoingLinks = g.allowOutgoingLinks ?? St.allowOutgoingLinks);
          });
        for (const Mt of G)
          d.selectAll(".graph-controller__link").filter((St) => St.id === Mt).each(function(St) {
            St.deletable = g.deletable ?? St.deletable, St.labelEditable = g.labelEditable ?? St.labelEditable;
          });
        Vn(
          at ? S : E,
          Object.keys(g)
        );
      } else
        P.each(function(L) {
          L.deletable = g.deletable ?? L.deletable, L.labelEditable = g.labelEditable ?? L.labelEditable, "fixedPosition" in g && kr(L, g.fixedPosition), "allowIncomingLinks" in g && (L.allowIncomingLinks = g.allowIncomingLinks ?? L.allowIncomingLinks), "allowOutgoingLinks" in g && (L.allowOutgoingLinks = g.allowOutgoingLinks ?? L.allowOutgoingLinks);
        }), d.selectAll(".graph-controller__link").each(function(L) {
          L.deletable = g.deletable ?? L.deletable, L.labelEditable = g.labelEditable ?? L.labelEditable;
        }), Vn(E, Object.keys(g));
      j();
    }
    function _t(g) {
      a.nodePhysicsEnabled = g, $u(f, g, h, p);
    }
    function bt(g) {
      a.fixedLinkDistanceEnabled = g, Au(f, u.value, a, g);
    }
    function kt(g) {
      a.showLinkLabels = g;
    }
    function It(g) {
      a.showNodeLabels = g;
    }
    function jt(g) {
      a.zoomEnabled = g, Je();
    }
    function ue(g) {
      a.isGraphEditableInGUI = g;
    }
    function ve() {
      const g = (k) => k === "false" ? !1 : !!k;
      localStorage.showNodeLabels && (a.showNodeLabels = g(localStorage.showNodeLabels)), localStorage.enableNodePhysics && (a.nodePhysicsEnabled = g(localStorage.enableNodePhysics)), localStorage.showLinkLabels && (a.showLinkLabels = g(localStorage.showLinkLabels)), localStorage.enableFixedLinkDistance && (a.fixedLinkDistanceEnabled = g(localStorage.enableFixedLinkDistance)), localStorage.enableZoom && (a.zoomEnabled = g(localStorage.enableZoom)), localStorage.persistSettings && (a.persistSettingsLocalStorage = g(localStorage.persistSettings));
    }
    function _() {
      h = n.value.node().clientWidth, p = n.value.node().clientHeight, m = e0(
        (g) => b(g, a.zoomEnabled),
        a.zoomEnabled
      ), w = a0(
        n.value,
        m,
        (g) => a.isGraphEditableInGUI ? Rt(g) : null,
        (g) => a.isGraphEditableInGUI ? ft(g) : null,
        (g) => {
          a.isGraphEditableInGUI && (a.nodeProps.shape === nt.RECTANGLE ? O(
            Zt(g, w.node())[0] - 0.5 * a.nodeProps.width,
            Zt(g, w.node())[1] - 0.5 * a.nodeProps.height
          ) : O(
            Zt(g, w.node())[0],
            Zt(g, w.node())[1]
          ));
        }
      ), g0(w, r.value, a, u.value.getNonDefaultLinkColors()), N = m0(w), d = f0(w), P = h0(w), f = O0(u.value, a, h, p, () => A()), v = u0(f, h, p, a), j();
    }
    function b(g, k = !0) {
      k && (z = g.transform.x, q = g.transform.y, Z = g.transform.k, w.attr("transform", `translate(${z},${q})scale(${Z})`));
    }
    function C(g, k, E, S, L = !0, G = !0) {
      let at = u.value.createLink(
        g.id,
        k.id,
        E,
        S,
        L,
        G
      );
      at !== void 0 && i0(at, n.value), j();
    }
    function O(g, k, E, S, L, G, at = { x: !1, y: !1 }, Mt = !0, St = !0, _i = !0, Ku = !0) {
      let Xu = u.value.createNode(
        g ?? h / 2,
        k ?? p / 2,
        E,
        S,
        L,
        G,
        at,
        Mt,
        St,
        _i,
        Ku
      );
      r0(Xu, n.value), c.value = !0, j();
    }
    function A() {
      P.attr("transform", (g) => `translate(${g.x},${g.y})`), d.selectAll(".graph-controller__link, .graph-controller__link-click-box").attr("d", (g) => (H(g), pm(g, h, p, a))), B();
    }
    function H(g) {
      let k = g.pathType;
      g.pathType = gm(g.source, g.target, u.value), k !== g.pathType && j();
    }
    function X() {
      const g = y, k = Tt(
        n.value.node().querySelector(`#${r.value + "-node-" + g.id}`)
      ).classed("on-deletion");
      if (g !== void 0 && !k) {
        const E = M;
        E !== void 0 ? N.attr("d", () => g.id === E.id ? Vu(g, [h / 2, p / 2], a) : u.value.hasBidirectionalConnection(g, E) ? Un(g, E, a) : ss(g, E, a)) : R !== void 0 && N.attr(
          "d",
          Un(g, { x: R[0], y: R[1] }, a)
        );
      }
    }
    function j(g = 0.5) {
      var k;
      d = d.data(u.value.links, (E) => E.id).join((E) => {
        const S = E.append("g").classed("graph-controller__link-container", !0);
        return S.append("path").classed("graph-controller__link", !0).style("stroke", (L) => L.color ? L.color : "").attr("id", (L) => r.value + "-link-" + L.id), S.append("path").classed("graph-controller__link-click-box", !0).on("dblclick", (L) => {
          re(L);
        }).on("pointerout", (L) => ur(L)).on("pointerdown", (L, G) => {
          o0(G, L.button, n.value), a.isGraphEditableInGUI && ar(L, G);
        }).on("pointerup", (L, G) => {
          Ye(L, G);
        }), S.append("text").attr("class", (L) => {
          var G;
          return `graph-controller__${(G = L.pathType) == null ? void 0 : G.toLowerCase()}-path-text`;
        }).append("textPath").attr(
          "class",
          (L) => L.label ? "graph-controller__link-label" : "graph-controller__link-label-placeholder"
        ).attr("href", (L) => `#${r.value + "-link-" + L.id}`).text((L) => L.label ? L.label : "add label").on("click", (L, G) => {
          a.isGraphEditableInGUI && Bs(L, G);
        }).on("dblclick", (L) => {
          re(L);
        }), S.append("foreignObject").classed("graph-controller__link-label-mathjax-container", !0).attr("xmlns", "http://www.w3.org/2000/svg").attr("width", 1).attr("height", 1).html(
          (L) => `<div class='${L.label ? "graph-controller__link-label" : "graph-controller__link-label-placeholder"}'>
                        </div>`
        ).on("click", (L, G) => {
          a.isGraphEditableInGUI && Bs(L, G);
        }).on("dblclick", (L) => {
          re(L);
        }), S;
      }), d.selectChild(".graph-controller__link").attr("marker-start", function(E) {
        var S;
        if ((S = E.pathType) != null && S.includes("REVERSE")) {
          let L = `url(#${r.value}-link-arrow-reverse`;
          return E.color && (L += "-" + rr(E.color)), L += ")", L;
        } else
          return null;
      }).attr("marker-end", function(E) {
        var S;
        if ((S = E.pathType) != null && S.includes("REVERSE"))
          return null;
        {
          let L = `url(#${r.value}-link-arrow`;
          return E.color && (L += "-" + rr(E.color)), L += ")", L;
        }
      }), d.selectChild("text").attr("class", (E) => {
        var S;
        return `graph-controller__${(S = E.pathType) == null ? void 0 : S.toLowerCase()}-path-text`;
      }).attr("dy", (E) => {
        var S;
        return E.pathType === se.REFLEXIVE ? 15 : E.pathType == se.LINEREVERSE ? -10 : (S = E.pathType) != null && S.includes("REVERSE") ? 20 : -10;
      }).selectChild("textPath").attr(
        "class",
        (E) => E.label ? "graph-controller__link-label" : "graph-controller__link-label-placeholder"
      ).classed("hidden", (E) => !a.showLinkLabels || !E.label && !E.labelEditable).classed("not-editable", !a.isGraphEditableInGUI).attr("startOffset", (E) => {
        var S;
        return (S = E.pathType) != null && S.includes("REVERSE") ? "46%" : "50%";
      }).text((E) => E.label ? E.label : "add label"), P = P.data(u.value.nodes, (E) => E.id).join(
        (E) => {
          const S = E.append("g").classed("graph-controller__node-container", !0).call(v).on("dblclick", (at) => {
            re(at);
          }).on("pointerenter", (at, Mt) => Xt(Mt)).on("pointerout", (at, Mt) => Ne(Mt)).on("pointerdown", (at, Mt) => {
            s0(Mt, at.button, n.value), l = { x: at.x, y: at.y }, a.isGraphEditableInGUI && Q(at, Mt);
          }).on("pointerup", (at, Mt) => {
            a.isGraphEditableInGUI && ft(at, Mt);
          }), L = S.append(a.nodeProps.shape).classed("graph-controller__node", !0).attr("id", (at) => `${r.value + "-node-" + at.id}`).style("fill", (at) => at.color ? at.color : "");
          a.nodeProps.shape === nt.CIRCLE ? L.attr("r", a.nodeProps.radius) : a.nodeProps.shape === nt.RECTANGLE && L.attr("width", a.nodeProps.width).attr("height", a.nodeProps.height).attr("rx", a.nodeProps.cornerRadius).attr("ry", a.nodeProps.cornerRadius);
          const G = S.append("foreignObject").classed("graph-controller__node-label-container", !0).attr("xmlns", "http://www.w3.org/2000/svg");
          return a.nodeProps.shape === nt.CIRCLE ? G.attr("width", 2 * a.nodeProps.radius).attr("height", 2 * a.nodeProps.radius).attr("x", -a.nodeProps.radius).attr("y", -a.nodeProps.radius) : a.nodeProps.shape === nt.RECTANGLE && G.attr("width", a.nodeProps.width).attr("height", a.nodeProps.height), G.append("xhtml:div").on("click", (at, Mt) => {
            a.isGraphEditableInGUI && Gu(at, Mt);
          }).on("dblclick", (at) => {
            re(at);
          }).on("pointerenter", (at, Mt) => Xt(Mt)).on("pointerout", (at, Mt) => Ne(Mt)), S;
        },
        (E) => (a.nodeProps.shape === nt.CIRCLE ? E.selectChild(".graph-controller__node").attr("r", a.nodeProps.radius) : a.nodeProps.shape === nt.RECTANGLE && E.selectChild(".graph-controller__node").attr("width", a.nodeProps.width).attr("height", a.nodeProps.height).attr("rx", a.nodeProps.cornerRadius).attr("ry", a.nodeProps.cornerRadius), E.selectChild("foreignObject").selectChild("div").classed(
          "hidden",
          (S) => !a.showNodeLabels || !S.label && !S.labelEditable
        ).classed("not-editable", !a.isGraphEditableInGUI), E)
      ), P.selectChild("foreignObject").selectChild("div").attr(
        "class",
        (E) => E.label ? "graph-controller__node-label" : "graph-controller__node-label-placeholder"
      ).classed("hidden", (E) => !a.showNodeLabels || !E.label && !E.labelEditable).text((E) => E.label ? E.label : "add label"), (k = window.MathJax) != null && k.version && window.MathJax.typesetPromise().then(() => {
        W();
      }), f.nodes(u.value.nodes), f.alpha(g).restart();
    }
    function W() {
      d.selectChild("text").selectChild("textPath").selectChild("mjx-container").each(function(g) {
        const k = this, E = g, S = Tt(k.parentNode.parentNode.parentNode).selectChild("foreignObject").selectChild("div").attr("class", "graph-controller__link-label").classed(
          "hidden",
          !a.showLinkLabels || !E.label && !E.labelEditable
        ).node();
        S.replaceChild(k, S.childNodes[0]);
      }), d.selectChild("text").selectChild("textPath").each(function() {
        const g = this;
        let k = !1;
        g.childNodes.forEach((S) => {
          var L;
          (S == null ? void 0 : S.nodeType) === Node.TEXT_NODE && ((L = S == null ? void 0 : S.textContent) == null ? void 0 : L.trim()) !== "" && (k = !0);
        }), k || Tt(g).text("I").attr("class", "graph-controller__link-label-placeholder mjx-hidden");
      }), B();
    }
    function B() {
      d.selectChild("text").selectChild("textPath").each(function() {
        const g = this, [k, E] = zs(g);
        Tt(g.parentNode.parentNode).select("foreignObject").attr("x", k).attr("y", E);
      });
    }
    function Q(g, k) {
      (g.button === 2 || g.pointerType === "touch") && (Xo(g), k.allowOutgoingLinks && ot(k), k.deletable && (V = setTimeout(() => {
        M = void 0, et(k);
      }, 250)));
    }
    function et(g) {
      let k = n.value.node().querySelector(`#${r.value + "-node-" + g.id}`);
      Tt(k).classed("on-deletion", !0);
      let E = Tt(k.parentElement);
      if (a.nodeProps.shape === nt.CIRCLE) {
        let S = Dg().outerRadius(a.nodeProps.radius + 4).innerRadius(a.nodeProps.radius), L = [{ startAngle: 0, endAngle: 0 }];
        E.append("g").attr("class", "arc").selectAll("path.arc").data(L).enter().append("path").attr("class", "arc").style("fill", "black").style("opacity", 0.7).transition().duration(750).ease(Do).attrTween("d", function(at) {
          let Mt = { startAngle: 0, endAngle: 2 * Math.PI }, St = Cs(at, Mt);
          return function(_i) {
            return S(St(_i));
          };
        }).on("end", () => tt(g));
      } else if (a.nodeProps.shape === nt.RECTANGLE) {
        const S = d0(
          a.nodeProps.width,
          a.nodeProps.height,
          a.nodeProps.cornerRadius
        );
        let L = E.append("path").attr("fill", "none").attr("stroke", "black").attr("stroke-width", 4).attr("opacity", "0.7").attr("d", S), G = 2 * a.nodeProps.width + 2 * a.nodeProps.height;
        L.attr("stroke-dasharray", G).attr("stroke-dashoffset", G).transition().duration(750).ease(Do).attr("stroke-dashoffset", 0).on("end", () => tt(g));
      }
    }
    function tt(g) {
      if (a.isGraphEditableInGUI) {
        let k = u.value.removeNode(g);
        if (k !== void 0) {
          let [E, S] = k;
          Pr(E, n.value), S.forEach((L) => {
            en(L, n.value);
          });
        }
        c.value = u.value.nodes.length > 0, fr(), j();
      }
    }
    function ot(g) {
      R = a.nodeProps.shape === nt.CIRCLE ? [g.x, g.y] : [g.x + 0.5 * a.nodeProps.width, g.y + 0.5 * a.nodeProps.height], y = g, N.attr("marker-end", `url(#${r.value}-draggable-link-arrow)`).classed("hidden", !1).attr("d", Un(g, { x: R[0], y: R[1] }, a));
    }
    function ft(g, k = void 0) {
      re(g), clearTimeout(V), k && gt(k), g.pointerType === "mouse" || (g.pointerType === "touch" || g.pointerType === "pen") && !p0(
        { x: l.x, y: l.y },
        { x: g.x, y: g.y }
      ) ? xt() : fr();
    }
    function gt(g) {
      let k = n.value.node().querySelector(`#${r.value + "-node-" + g.id}`), E = Tt(k), S = Tt(k.parentElement);
      a.nodeProps.shape === nt.CIRCLE ? (E.classed("on-deletion", !1), S.select("g.arc").select("path.arc").interrupt().remove(), S.select("g.arc").remove()) : a.nodeProps.shape === nt.RECTANGLE && (E.classed("on-deletion") && S.select("path").attr("stroke-dasharray", 2 * a.nodeProps.width + 2 * a.nodeProps.height).attr("stroke-dashoffset", 0).transition().attr("stroke-dashoffset", 2 * a.nodeProps.width + 2 * a.nodeProps.height).on("end", () => {
        S.select("path").remove();
      }), E.classed("on-deletion", !1));
    }
    function xt() {
      const g = y, k = M;
      fr(), !(g === void 0 || k === void 0) && C(g, k);
    }
    function Rt(g) {
      if (re(g), y !== void 0) {
        const k = id(g, n.value.node())[0];
        R = [(k[0] - z) / Z, (k[1] - q) / Z], X();
      }
    }
    function Xt(g) {
      g.allowIncomingLinks && (M = g);
    }
    function Ne(g) {
      g && gt(g), M = void 0, clearTimeout(V);
    }
    function ur(g) {
      re(g), clearTimeout(J);
    }
    function Ye(g, k) {
      re(g), clearTimeout(J), (g.button === 2 || g.pointerType === "touch") && k.deletable && cr(k);
    }
    function ar(g, k) {
      (g.button === 2 || g.pointerType === "touch") && (Xo(g), k.deletable && (J = setTimeout(() => {
        Bt(k);
      }, 250)));
    }
    function Bt(g) {
      let k = n.value.node().querySelector(`#${r.value + "-link-" + g.id}`);
      if (Tt(k).classed("on-deletion", !0), k instanceof SVGPathElement) {
        let E = Tt(k), S = k.getTotalLength(), L = k.parentElement.querySelector("text"), G = Array.from(L.classList).some(
          (St) => St.includes("reverse")
        ), at = 0, Mt = G ? S : -S;
        E.attr("stroke-dasharray", S).attr("stroke-dashoffset", at).transition().duration(750).attr("stroke-dashoffset", Mt).on("end", () => ae(g));
      }
    }
    function ae(g) {
      let k = g.color;
      if (a.isGraphEditableInGUI) {
        let E = u.value.removeLink(g);
        E !== void 0 && en(E, n.value), k && (u.value.hasNonDefaultLinkColor(k) || $i(w, r.value, k));
      }
      j();
    }
    function cr(g) {
      let k = n.value.node().querySelector(`#${r.value + "-link-" + g.id}`);
      if (Tt(k).classed("on-deletion") && k instanceof SVGPathElement) {
        let E = Tt(k), S = k.getTotalLength();
        E.attr("stroke-dasharray", S).attr("stroke-dashoffset", S).transition().attr("stroke-dashoffset", 0).on("end", () => {
          E.attr("stroke-dasharray", null).attr("stroke-dashoffset", null);
        });
      }
      Tt(k).classed("on-deletion", !1);
    }
    function Gu(g, k) {
      if (re(g), k.labelEditable) {
        let E = a.nodeProps.shape === nt.CIRCLE ? [k.x, k.y] : [
          k.x + 0.5 * a.nodeProps.width,
          k.y + 0.5 * a.nodeProps.height
        ];
        Vs(k, E);
      }
    }
    function Bs(g, k) {
      if (k.labelEditable) {
        let E = g.target, S;
        E.nodeName === "textPath" ? S = E : S = E.closest(".graph-controller__link-container").querySelector("textPath");
        let L = zs(S);
        Vs(k, L);
      }
    }
    function Vs(g, k) {
      let E = g instanceof Mn ? "node" : "link";
      const S = document.createElement("input");
      S.setAttribute("class", "graph-controller__label-input"), S.setAttribute("id", `${E}-label-input-field`), g.label == null ? S.value = "" : S.value = g.label, S.placeholder = `Enter ${E} label`;
      const L = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
      L.setAttribute("width", "100%"), L.setAttribute("height", "100%"), L.setAttribute("x", `${k[0] - 90}`), L.setAttribute("y", `${k[1] - 12}`), L.append(S), n.value.select("svg").select("g").node().append(L), S.focus(), s !== "desktop" && (o = !0), S.ondblclick = function(at) {
        re(at);
      };
      let G = !1;
      S.onkeyup = function(at) {
        at.key === "Enter" ? (G = !0, S.blur()) : at.key === "Escape" && (S.value = "", S.blur());
      }, S.onblur = function() {
        G && Rn(g, S.value.trim()), L.remove(), s !== "desktop" && (o = !1);
      };
    }
    function Rn(g, k) {
      l0(g, k, n.value), g.label = k, j();
      let E = g instanceof Mn ? "node" : "link";
      E === "link" ? Hu(g) : E === "node" && k !== "" && qu(g);
    }
    function Hu(g) {
      var E;
      const k = n.value.node().querySelector(
        `#${r.value + "-link-" + g.id}`
      ).parentElement;
      (E = k.querySelector("mjx-container")) == null || E.remove(), k.querySelector("div").setAttribute("class", "graph-controller__link-label-placeholder"), j();
    }
    function qu(g) {
      const k = n.value.node().querySelector(`#${r.value + "-node-" + g.id}`).parentElement;
      if (k) {
        const E = k.parentElement;
        k.remove(), E.append(k);
      }
    }
    function zs(g) {
      let k = n.value.select("svg").node().getBoundingClientRect(), E = g.getBoundingClientRect(), S = (E.x - k.x - z) / Z, L = (E.y - k.y - q) / Z;
      return [S, L];
    }
    function fr() {
      N == null || N.classed("hidden", !0).attr("marker-end", "null"), y = void 0, M = void 0, R = void 0;
    }
    function Uu(g) {
      let k, E;
      try {
        if (typeof g == "string")
          [k, E] = bm(g);
        else if (typeof g == "object")
          [k, E] = xm(g);
        else {
          qe("Invalid graph import type:", "Must either be TGF or JSON.");
          return;
        }
      } catch (S) {
        qe("Error during parsing:", `Invalid data format:
` + S);
        return;
      }
      Hs(), Wu(k, E);
    }
    function Wu(g, k) {
      for (let S of g)
        O(
          S.x,
          S.y,
          S.idImported,
          S.label,
          S.color,
          a.nodeProps.shape,
          S.fixedPosition,
          S.deletable,
          S.labelEditable,
          S.allowIncomingLinks,
          S.allowOutgoingLinks
        );
      const E = (S) => u.value.nodes.find((L) => L.idImported === S);
      for (let S of k) {
        let L = E(S.sourceIdImported), G = E(S.targetIdImported);
        L && G && (C(
          L,
          G,
          S.label,
          S.color,
          S.deletable,
          S.labelEditable
        ), S.color && is(w, r.value, a, S.color));
      }
    }
    function Ds(g) {
      for (let k of g) {
        const E = u.value.links.filter((S) => S.id === k).map((S) => S.color).shift();
        E && (u.value.hasNonDefaultLinkColor(E, k) ? u.value.getLinkIdsWithNonDefaultLinkColors(
          E,
          k
        ).every(
          (G) => g.includes(G)
        ) && $i(w, r.value, E) : $i(w, r.value, E));
      }
    }
    function Je() {
      f.stop(), n.value.selectChildren().remove(), m = void 0, z = 0, q = 0, Z = 1, w = void 0, N = void 0, d = void 0, P = void 0, f = void 0, fr(), ve(), _();
    }
    function Gs() {
      a.isCanvasBoundToView && (o || Je());
    }
    function Hs() {
      u.value.links.forEach((g) => en(g, n.value)), u.value.nodes.forEach((g) => Pr(g, n.value)), u.value = new Yo(), c.value = !1, Je();
    }
    return (g, k) => (Be(), Ve(ce, null, [
      Nm,
      Nr(ie("div", null, [
        Me(xf, {
          class: "graph-controller__info-text-background",
          "show-controls-graph": "",
          "show-latex-info": !0,
          "show-controls-environment": !1,
          "show-header": !0,
          "platform-type": zr(s)
        }, null, 8, ["platform-type"])
      ], 512), [
        [Ir, !c.value]
      ])
    ], 64));
  }
});
/*! (c) Andrea Giammarchi - ISC */
const Lm = (() => {
  const t = "DOMContentLoaded", e = /* @__PURE__ */ new WeakMap(), n = [], r = (o) => {
    do
      if (o.nextSibling)
        return !0;
    while (o = o.parentNode);
    return !1;
  }, i = () => {
    n.splice(0).forEach((o) => {
      e.get(o[0]) !== !0 && (e.set(o[0], !0), o[0][o[1]]());
    });
  };
  document.addEventListener(t, i);
  class s extends HTMLElement {
    static withParsedCallback(l, u = "parsed") {
      const { prototype: c } = l, { connectedCallback: a } = c, f = u + "Callback", h = (m, v, w, d) => {
        v.disconnect(), w.removeEventListener(t, d), p(m);
      }, p = (m) => {
        n.length || requestAnimationFrame(i), n.push([m, f]);
      };
      return Object.defineProperties(
        c,
        {
          connectedCallback: {
            configurable: !0,
            writable: !0,
            value() {
              if (a && a.apply(this, arguments), f in this && !e.has(this)) {
                const m = this, { ownerDocument: v } = m;
                if (e.set(m, !1), v.readyState === "complete" || r(m))
                  p(m);
                else {
                  const w = () => h(m, d, v, w);
                  v.addEventListener(t, w);
                  const d = new MutationObserver(() => {
                    r(m) && h(m, d, v, w);
                  });
                  d.observe(m.parentNode, { childList: !0, subtree: !0 });
                }
              }
            }
          },
          [u]: {
            configurable: !0,
            get() {
              return e.get(this) === !0;
            }
          }
        }
      ), l;
    }
  }
  return s.withParsedCallback(s);
})();
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function Rm(t, e, n) {
  const r = /* @__PURE__ */ bs(t);
  class i extends js {
    constructor(o) {
      super(r, o, e, n);
    }
  }
  return vt(i, "def", r), i;
}
const Im = typeof HTMLElement < "u" ? Lm : class {
};
class js extends Im {
  constructor(n, r = {}, i = {}, s) {
    super();
    /**
     * @internal
     */
    vt(this, "_instance", null);
    vt(this, "_connected", !1);
    vt(this, "_resolved", !1);
    vt(this, "_numberProps", null);
    vt(this, "_styles");
    vt(this, "_slots");
    vt(this, "_ob", null);
    this._def = n, this._props = r, this._config = i, this._config = Ot(
      {
        shadowRoot: !0
      },
      this._config
    ), this._config.shadowRoot ? this.shadowRoot && s ? s(this._createVNode(), this._root) : (this.attachShadow({ mode: "open" }), this._def.__asyncLoader || this._resolveProps(this._def)) : s && s(this._createVNode(), this._root);
  }
  get _root() {
    return this._config.shadowRoot ? this.shadowRoot : this;
  }
  connectedCallback() {
    this._config.shadowRoot ? this._connect() : super.connectedCallback();
  }
  // use of parsedCallback when shadowRoot is disabled
  // to wait for slots to be parsed
  // see https://stackoverflow.com/a/52884370
  parsedCallback() {
    this._config.shadowRoot || this._connect();
  }
  _connect() {
    this._connected = !0, this._instance || (this._resolved ? this._update() : this._resolveDef());
  }
  disconnectedCallback() {
    this._connected = !1, this._ob && (this._ob.disconnect(), this._ob = null), Cl(() => {
      this._connected || (ko(null, this._root), this._instance = null);
    });
  }
  /**
   * resolve inner component definition (handle possible async component)
   */
  _resolveDef() {
    this._resolved = !0;
    for (let i = 0; i < this.attributes.length; i++)
      this._setAttr(this.attributes[i].name);
    this._ob = new MutationObserver((i) => {
      for (const s of i)
        this._setAttr(s.attributeName);
    }), this._ob.observe(this, { attributes: !0 });
    const n = (i, s = !1) => {
      const { props: o, styles: l } = i;
      let u;
      if (o && !lt(o))
        for (const c in o) {
          const a = o[c];
          (a === Number || a && a.type === Number) && (c in this._props && (this._props[c] = qs(this._props[c])), (u || (u = /* @__PURE__ */ Object.create(null)))[Re(c)] = !0);
        }
      this._numberProps = u, s && this._resolveProps(i), this._config.shadowRoot || (this._slots = Array.from(this.children).map((c) => c.cloneNode(!0)), this.replaceChildren()), this._applyStyles(l), this._update();
    }, r = this._def.__asyncLoader;
    r ? r().then((i) => n(i, !0)) : n(this._def);
  }
  _resolveProps(n) {
    const { props: r } = n, i = lt(r) ? r : Object.keys(r || {});
    for (const s of Object.keys(this))
      s[0] !== "_" && i.includes(s) && this._setProp(s, this[s], !0, !1);
    for (const s of i.map(Re))
      Object.defineProperty(this, s, {
        get() {
          return this._getProp(s);
        },
        set(o) {
          this._setProp(s, o);
        }
      });
  }
  _setAttr(n) {
    let r = this.getAttribute(n);
    const i = Re(n);
    this._numberProps && this._numberProps[i] && (r = qs(r)), this._setProp(i, r, !1);
  }
  /**
   * @internal
   */
  _getProp(n) {
    return this._props[n];
  }
  /**
   * @internal
   */
  _setProp(n, r, i = !0, s = !0) {
    r !== this._props[n] && (this._props[n] = r, s && this._instance && this._update(), i && (r === !0 ? this.setAttribute(ge(n), "") : typeof r == "string" || typeof r == "number" ? this.setAttribute(ge(n), r + "") : r || this.removeAttribute(ge(n))));
  }
  _update() {
    ko(this._createVNode(), this._root);
  }
  _createVNode() {
    let n = null;
    this._config.shadowRoot || (n = () => {
      const i = (s) => {
        const o = {};
        for (let l = 0, u = s.length; l < u; l++) {
          const c = s[l];
          o[c.nodeName] = c.nodeValue;
        }
        return o;
      };
      return this._slots.map((s) => {
        const o = s.attributes ? i(s.attributes) : {};
        return o.innerHTML = s.innerHTML, Me(s.tagName, o, null);
      });
    });
    const r = Me(this._def, Ot({}, this._props), n);
    return this._instance || (r.ce = (i) => {
      this._instance = i, this._config.shadowRoot && (i.isCE = !0);
      const s = (l, u) => {
        this.dispatchEvent(
          new CustomEvent(l, {
            detail: u
          })
        );
      };
      i.emit = (l, ...u) => {
        s(l, u), ge(l) !== l && s(ge(l), u);
      };
      let o = this;
      for (; o = o && (o.parentNode || o.host); )
        if (o instanceof js) {
          i.parent = o._instance, i.provides = o._instance.provides;
          break;
        }
    }), r;
  }
  _applyStyles(n) {
    n && n.forEach((r) => {
      const i = document.createElement("style");
      i.textContent = r, this._root.appendChild(i);
    });
  }
}
customElements.define(
  "graph-component",
  // With LaTeX without ShadowRoot for MathJax to work
  /* @__PURE__ */ Rm(Cm, { shadowRoot: !1 })
  // With ShadowRoot without LaTeX
  // defineCustomElement(GraphEditor)
  /* for switching off the LaTeX control info background, in the graph editor template
  in the graph controls tag you can use :show-latex-info="true" */
);
