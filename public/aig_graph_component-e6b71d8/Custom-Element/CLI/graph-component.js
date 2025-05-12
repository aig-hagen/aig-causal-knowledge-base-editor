var Ku = Object.defineProperty;
var Xu = (t, e, n) => e in t ? Ku(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var _t = (t, e, n) => Xu(t, typeof e != "symbol" ? e + "" : e, n);
/**
* @vue/shared v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function os(t, e) {
  const n = new Set(t.split(","));
  return (r) => n.has(r);
}
const Ct = {}, vn = [], fe = () => {
}, Yu = () => !1, ni = (t) => t.charCodeAt(0) === 111 && t.charCodeAt(1) === 110 && // uppercase letter
(t.charCodeAt(2) > 122 || t.charCodeAt(2) < 97), ls = (t) => t.startsWith("onUpdate:"), $t = Object.assign, us = (t, e) => {
  const n = t.indexOf(e);
  n > -1 && t.splice(n, 1);
}, Ju = Object.prototype.hasOwnProperty, dt = (t, e) => Ju.call(t, e), lt = Array.isArray, bn = (t) => ri(t) === "[object Map]", il = (t) => ri(t) === "[object Set]", ct = (t) => typeof t == "function", Ot = (t) => typeof t == "string", Ln = (t) => typeof t == "symbol", Tt = (t) => t !== null && typeof t == "object", sl = (t) => (Tt(t) || ct(t)) && ct(t.then) && ct(t.catch), ol = Object.prototype.toString, ri = (t) => ol.call(t), Qu = (t) => ri(t).slice(8, -1), ll = (t) => ri(t) === "[object Object]", as = (t) => Ot(t) && t !== "NaN" && t[0] !== "-" && "" + parseInt(t, 10) === t, zn = /* @__PURE__ */ os(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), ii = (t) => {
  const e = /* @__PURE__ */ Object.create(null);
  return (n) => e[n] || (e[n] = t(n));
}, Zu = /-(\w)/g, Le = ii((t) => t.replace(Zu, (e, n) => n ? n.toUpperCase() : "")), ta = /\B([A-Z])/g, ge = ii(
  (t) => t.replace(ta, "-$1").toLowerCase()
), ul = ii((t) => t.charAt(0).toUpperCase() + t.slice(1)), vi = ii((t) => t ? `on${ul(t)}` : ""), Ke = (t, e) => !Object.is(t, e), bi = (t, e) => {
  for (let n = 0; n < t.length; n++)
    t[n](e);
}, jr = (t, e, n) => {
  Object.defineProperty(t, e, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
}, ea = (t) => {
  const e = parseFloat(t);
  return isNaN(e) ? t : e;
}, qs = (t) => {
  const e = Ot(t) ? Number(t) : NaN;
  return isNaN(e) ? t : e;
};
let Us;
const al = () => Us || (Us = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function cs(t) {
  if (lt(t)) {
    const e = {};
    for (let n = 0; n < t.length; n++) {
      const r = t[n], i = Ot(r) ? sa(r) : cs(r);
      if (i)
        for (const s in i)
          e[s] = i[s];
    }
    return e;
  } else if (Ot(t) || Tt(t))
    return t;
}
const na = /;(?![^(]*\))/g, ra = /:([^]+)/, ia = /\/\*[^]*?\*\//g;
function sa(t) {
  const e = {};
  return t.replace(ia, "").split(na).forEach((n) => {
    if (n) {
      const r = n.split(ra);
      r.length > 1 && (e[r[0].trim()] = r[1].trim());
    }
  }), e;
}
function fs(t) {
  let e = "";
  if (Ot(t))
    e = t;
  else if (lt(t))
    for (let n = 0; n < t.length; n++) {
      const r = fs(t[n]);
      r && (e += r + " ");
    }
  else if (Tt(t))
    for (const n in t)
      t[n] && (e += n + " ");
  return e.trim();
}
const oa = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", la = /* @__PURE__ */ os(oa);
function cl(t) {
  return !!t || t === "";
}
const Ae = (t) => Ot(t) ? t : t == null ? "" : lt(t) || Tt(t) && (t.toString === ol || !ct(t.toString)) ? JSON.stringify(t, fl, 2) : String(t), fl = (t, e) => e && e.__v_isRef ? fl(t, e.value) : bn(e) ? {
  [`Map(${e.size})`]: [...e.entries()].reduce(
    (n, [r, i], s) => (n[xi(r, s) + " =>"] = i, n),
    {}
  )
} : il(e) ? {
  [`Set(${e.size})`]: [...e.values()].map((n) => xi(n))
} : Ln(e) ? xi(e) : Tt(e) && !lt(e) && !ll(e) ? String(e) : e, xi = (t, e = "") => {
  var n;
  return Ln(t) ? `Symbol(${(n = t.description) != null ? n : e})` : t;
};
/**
* @vue/reactivity v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let he;
class ua {
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
function aa(t, e = he) {
  e && e.active && e.effects.push(t);
}
function ca() {
  return he;
}
let un;
class hs {
  constructor(e, n, r, i) {
    this.fn = e, this.trigger = n, this.scheduler = r, this.active = !0, this.deps = [], this._dirtyLevel = 4, this._trackId = 0, this._runnings = 0, this._shouldSchedule = !1, this._depsLength = 0, aa(this, i);
  }
  get dirty() {
    if (this._dirtyLevel === 2 || this._dirtyLevel === 3) {
      this._dirtyLevel = 1, dn();
      for (let e = 0; e < this._depsLength; e++) {
        const n = this.deps[e];
        if (n.computed && (fa(n.computed), this._dirtyLevel >= 4))
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
    let e = Ue, n = un;
    try {
      return Ue = !0, un = this, this._runnings++, Ws(this), this.fn();
    } finally {
      Ks(this), this._runnings--, un = n, Ue = e;
    }
  }
  stop() {
    var e;
    this.active && (Ws(this), Ks(this), (e = this.onStop) == null || e.call(this), this.active = !1);
  }
}
function fa(t) {
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
let Ue = !0, Ai = 0;
const dl = [];
function dn() {
  dl.push(Ue), Ue = !1;
}
function pn() {
  const t = dl.pop();
  Ue = t === void 0 ? !0 : t;
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
  if (Ue && un) {
    let r = ji.get(t);
    r || ji.set(t, r = /* @__PURE__ */ new Map());
    let i = r.get(n);
    i || r.set(n, i = ml(() => r.delete(n))), pl(
      un,
      i
    );
  }
}
function Re(t, e, n, r, i, s) {
  const o = ji.get(t);
  if (!o)
    return;
  let l = [];
  if (e === "clear")
    l = [...o.values()];
  else if (n === "length" && lt(t)) {
    const a = Number(r);
    o.forEach((u, c) => {
      (c === "length" || !Ln(c) && c >= a) && l.push(u);
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
  for (const a of l)
    a && gl(
      a,
      4
    );
  ps();
}
const ha = /* @__PURE__ */ os("__proto__,__v_isRef,__isVue"), wl = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((t) => t !== "arguments" && t !== "caller").map((t) => Symbol[t]).filter(Ln)
), Xs = /* @__PURE__ */ da();
function da() {
  const t = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((e) => {
    t[e] = function(...n) {
      const r = pt(this);
      for (let s = 0, o = this.length; s < o; s++)
        ee(r, "get", s + "");
      const i = r[e](...n);
      return i === -1 || i === !1 ? r[e](...n.map(pt)) : i;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((e) => {
    t[e] = function(...n) {
      dn(), ds();
      const r = pt(this)[e].apply(this, n);
      return ps(), pn(), r;
    };
  }), t;
}
function pa(t) {
  const e = pt(this);
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
      return r === (i ? s ? Ma : xl : s ? bl : vl).get(e) || // receiver is not the reactive proxy, but has the same prototype
      // this means the reciever is a user proxy of the reactive proxy
      Object.getPrototypeOf(e) === Object.getPrototypeOf(r) ? e : void 0;
    const o = lt(e);
    if (!i) {
      if (o && dt(Xs, n))
        return Reflect.get(Xs, n, r);
      if (n === "hasOwnProperty")
        return pa;
    }
    const l = Reflect.get(e, n, r);
    return (Ln(n) ? wl.has(n) : ha(n)) || (i || ee(e, "get", n), s) ? l : ne(l) ? o && as(n) ? l : l.value : Tt(l) ? i ? El(l) : oi(l) : l;
  }
}
class _l extends yl {
  constructor(e = !1) {
    super(!1, e);
  }
  set(e, n, r, i) {
    let s = e[n];
    if (!this._isShallow) {
      const a = Mn(s);
      if (!Br(r) && !Mn(r) && (s = pt(s), r = pt(r)), !lt(e) && ne(s) && !ne(r))
        return a ? !1 : (s.value = r, !0);
    }
    const o = lt(e) && as(n) ? Number(n) < e.length : dt(e, n), l = Reflect.set(e, n, r, i);
    return e === pt(i) && (o ? Ke(r, s) && Re(e, "set", n, r) : Re(e, "add", n, r)), l;
  }
  deleteProperty(e, n) {
    const r = dt(e, n);
    e[n];
    const i = Reflect.deleteProperty(e, n);
    return i && r && Re(e, "delete", n, void 0), i;
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
class ga extends yl {
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
const ma = /* @__PURE__ */ new _l(), wa = /* @__PURE__ */ new ga(), ya = /* @__PURE__ */ new _l(
  !0
), gs = (t) => t, si = (t) => Reflect.getPrototypeOf(t);
function fr(t, e, n = !1, r = !1) {
  t = t.__v_raw;
  const i = pt(t), s = pt(e);
  n || (Ke(e, s) && ee(i, "get", e), ee(i, "get", s));
  const { has: o } = si(i), l = r ? gs : n ? ys : Wn;
  if (o.call(i, e))
    return l(t.get(e));
  if (o.call(i, s))
    return l(t.get(s));
  t !== i && t.get(e);
}
function hr(t, e = !1) {
  const n = this.__v_raw, r = pt(n), i = pt(t);
  return e || (Ke(t, i) && ee(r, "has", t), ee(r, "has", i)), t === i ? n.has(t) : n.has(t) || n.has(i);
}
function dr(t, e = !1) {
  return t = t.__v_raw, !e && ee(pt(t), "iterate", an), Reflect.get(t, "size", t);
}
function Ys(t) {
  t = pt(t);
  const e = pt(this);
  return si(e).has.call(e, t) || (e.add(t), Re(e, "add", t, t)), this;
}
function Js(t, e) {
  e = pt(e);
  const n = pt(this), { has: r, get: i } = si(n);
  let s = r.call(n, t);
  s || (t = pt(t), s = r.call(n, t));
  const o = i.call(n, t);
  return n.set(t, e), s ? Ke(e, o) && Re(n, "set", t, e) : Re(n, "add", t, e), this;
}
function Qs(t) {
  const e = pt(this), { has: n, get: r } = si(e);
  let i = n.call(e, t);
  i || (t = pt(t), i = n.call(e, t)), r && r.call(e, t);
  const s = e.delete(t);
  return i && Re(e, "delete", t, void 0), s;
}
function Zs() {
  const t = pt(this), e = t.size !== 0, n = t.clear();
  return e && Re(t, "clear", void 0, void 0), n;
}
function pr(t, e) {
  return function(r, i) {
    const s = this, o = s.__v_raw, l = pt(o), a = e ? gs : t ? ys : Wn;
    return !t && ee(l, "iterate", an), o.forEach((u, c) => r.call(i, a(u), a(c), s));
  };
}
function gr(t, e, n) {
  return function(...r) {
    const i = this.__v_raw, s = pt(i), o = bn(s), l = t === "entries" || t === Symbol.iterator && o, a = t === "keys" && o, u = i[t](...r), c = n ? gs : e ? ys : Wn;
    return !e && ee(
      s,
      "iterate",
      a ? Bi : an
    ), {
      // iterator protocol
      next() {
        const { value: f, done: h } = u.next();
        return h ? { value: f, done: h } : {
          value: l ? [c(f[0]), c(f[1])] : c(f),
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
function _a() {
  const t = {
    get(s) {
      return fr(this, s);
    },
    get size() {
      return dr(this);
    },
    has: hr,
    add: Ys,
    set: Js,
    delete: Qs,
    clear: Zs,
    forEach: pr(!1, !1)
  }, e = {
    get(s) {
      return fr(this, s, !1, !0);
    },
    get size() {
      return dr(this);
    },
    has: hr,
    add: Ys,
    set: Js,
    delete: Qs,
    clear: Zs,
    forEach: pr(!1, !0)
  }, n = {
    get(s) {
      return fr(this, s, !0);
    },
    get size() {
      return dr(this, !0);
    },
    has(s) {
      return hr.call(this, s, !0);
    },
    add: Fe("add"),
    set: Fe("set"),
    delete: Fe("delete"),
    clear: Fe("clear"),
    forEach: pr(!0, !1)
  }, r = {
    get(s) {
      return fr(this, s, !0, !0);
    },
    get size() {
      return dr(this, !0);
    },
    has(s) {
      return hr.call(this, s, !0);
    },
    add: Fe("add"),
    set: Fe("set"),
    delete: Fe("delete"),
    clear: Fe("clear"),
    forEach: pr(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((s) => {
    t[s] = gr(
      s,
      !1,
      !1
    ), n[s] = gr(
      s,
      !0,
      !1
    ), e[s] = gr(
      s,
      !1,
      !0
    ), r[s] = gr(
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
  va,
  ba,
  xa,
  Ea
] = /* @__PURE__ */ _a();
function ms(t, e) {
  const n = e ? t ? Ea : xa : t ? ba : va;
  return (r, i, s) => i === "__v_isReactive" ? !t : i === "__v_isReadonly" ? t : i === "__v_raw" ? r : Reflect.get(
    dt(n, i) && i in r ? n : r,
    i,
    s
  );
}
const ka = {
  get: /* @__PURE__ */ ms(!1, !1)
}, Sa = {
  get: /* @__PURE__ */ ms(!1, !0)
}, Pa = {
  get: /* @__PURE__ */ ms(!0, !1)
}, vl = /* @__PURE__ */ new WeakMap(), bl = /* @__PURE__ */ new WeakMap(), xl = /* @__PURE__ */ new WeakMap(), Ma = /* @__PURE__ */ new WeakMap();
function Na(t) {
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
function Ca(t) {
  return t.__v_skip || !Object.isExtensible(t) ? 0 : Na(Qu(t));
}
function oi(t) {
  return Mn(t) ? t : ws(
    t,
    !1,
    ma,
    ka,
    vl
  );
}
function Ta(t) {
  return ws(
    t,
    !1,
    ya,
    Sa,
    bl
  );
}
function El(t) {
  return ws(
    t,
    !0,
    wa,
    Pa,
    xl
  );
}
function ws(t, e, n, r, i) {
  if (!Tt(t) || t.__v_raw && !(e && t.__v_isReactive))
    return t;
  const s = i.get(t);
  if (s)
    return s;
  const o = Ca(t);
  if (o === 0)
    return t;
  const l = new Proxy(
    t,
    o === 2 ? r : n
  );
  return i.set(t, l), l;
}
function xn(t) {
  return Mn(t) ? xn(t.__v_raw) : !!(t && t.__v_isReactive);
}
function Mn(t) {
  return !!(t && t.__v_isReadonly);
}
function Br(t) {
  return !!(t && t.__v_isShallow);
}
function kl(t) {
  return xn(t) || Mn(t);
}
function pt(t) {
  const e = t && t.__v_raw;
  return e ? pt(e) : t;
}
function Sl(t) {
  return Object.isExtensible(t) && jr(t, "__v_skip", !0), t;
}
const Wn = (t) => Tt(t) ? oi(t) : t, ys = (t) => Tt(t) ? El(t) : t;
class Pl {
  constructor(e, n, r, i) {
    this.getter = e, this._setter = n, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this.effect = new hs(
      () => e(this._value),
      () => Mr(
        this,
        this.effect._dirtyLevel === 2 ? 2 : 3
      )
    ), this.effect.computed = this, this.effect.active = this._cacheable = !i, this.__v_isReadonly = r;
  }
  get value() {
    const e = pt(this);
    return (!e._cacheable || e.effect.dirty) && Ke(e._value, e._value = e.effect.run()) && Mr(e, 4), Ml(e), e.effect._dirtyLevel >= 2 && Mr(e, 2), e._value;
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
function La(t, e, n = !1) {
  let r, i;
  const s = ct(t);
  return s ? (r = t, i = fe) : (r = t.get, i = t.set), new Pl(r, i, s || !i, n);
}
function Ml(t) {
  var e;
  Ue && un && (t = pt(t), pl(
    un,
    (e = t.dep) != null ? e : t.dep = ml(
      () => t.dep = void 0,
      t instanceof Pl ? t : void 0
    )
  ));
}
function Mr(t, e = 4, n) {
  t = pt(t);
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
  return Ra(t, !1);
}
function Ra(t, e) {
  return ne(t) ? t : new Ia(t, e);
}
class Ia {
  constructor(e, n) {
    this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? e : pt(e), this._value = n ? e : Wn(e);
  }
  get value() {
    return Ml(this), this._value;
  }
  set value(e) {
    const n = this.__v_isShallow || Br(e) || Mn(e);
    e = n ? e : pt(e), Ke(e, this._rawValue) && (this._rawValue = e, this._value = n ? e : Wn(e), Mr(this, 4));
  }
}
function Dr(t) {
  return ne(t) ? t.value : t;
}
const $a = {
  get: (t, e, n) => Dr(Reflect.get(t, e, n)),
  set: (t, e, n, r) => {
    const i = t[e];
    return ne(i) && !ne(n) ? (i.value = n, !0) : Reflect.set(t, e, n, r);
  }
};
function Nl(t) {
  return xn(t) ? t : new Proxy(t, $a);
}
/**
* @vue/runtime-core v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function We(t, e, n, r) {
  try {
    return r ? t(...r) : t();
  } catch (i) {
    li(i, e, n);
  }
}
function ye(t, e, n, r) {
  if (ct(t)) {
    const s = We(t, e, n, r);
    return s && sl(s) && s.catch((o) => {
      li(o, e, n);
    }), s;
  }
  const i = [];
  for (let s = 0; s < t.length; s++)
    i.push(ye(t[s], e, n, r));
  return i;
}
function li(t, e, n, r = !0) {
  const i = e ? e.vnode : null;
  if (e) {
    let s = e.parent;
    const o = e.proxy, l = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; s; ) {
      const u = s.ec;
      if (u) {
        for (let c = 0; c < u.length; c++)
          if (u[c](t, o, l) === !1)
            return;
      }
      s = s.parent;
    }
    const a = e.appContext.config.errorHandler;
    if (a) {
      We(
        a,
        null,
        10,
        [t, o, l]
      );
      return;
    }
  }
  Oa(t, n, i, r);
}
function Oa(t, e, n, r = !0) {
  console.error(t);
}
let Kn = !1, Di = !1;
const Ft = [];
let Se = 0;
const En = [];
let Ve = null, rn = 0;
const Cl = /* @__PURE__ */ Promise.resolve();
let _s = null;
function Tl(t) {
  const e = _s || Cl;
  return t ? e.then(this ? t.bind(this) : t) : e;
}
function Aa(t) {
  let e = Se + 1, n = Ft.length;
  for (; e < n; ) {
    const r = e + n >>> 1, i = Ft[r], s = Xn(i);
    s < t || s === t && i.pre ? e = r + 1 : n = r;
  }
  return e;
}
function vs(t) {
  (!Ft.length || !Ft.includes(
    t,
    Kn && t.allowRecurse ? Se + 1 : Se
  )) && (t.id == null ? Ft.push(t) : Ft.splice(Aa(t.id), 0, t), Ll());
}
function Ll() {
  !Kn && !Di && (Di = !0, _s = Cl.then(Il));
}
function Fa(t) {
  const e = Ft.indexOf(t);
  e > Se && Ft.splice(e, 1);
}
function ja(t) {
  lt(t) ? En.push(...t) : (!Ve || !Ve.includes(
    t,
    t.allowRecurse ? rn + 1 : rn
  )) && En.push(t), Ll();
}
function eo(t, e, n = Kn ? Se + 1 : 0) {
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
    if (En.length = 0, Ve) {
      Ve.push(...e);
      return;
    }
    for (Ve = e, rn = 0; rn < Ve.length; rn++)
      Ve[rn]();
    Ve = null, rn = 0;
  }
}
const Xn = (t) => t.id == null ? 1 / 0 : t.id, Ba = (t, e) => {
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
  Di = !1, Kn = !0, Ft.sort(Ba);
  try {
    for (Se = 0; Se < Ft.length; Se++) {
      const e = Ft[Se];
      e && e.active !== !1 && We(e, null, 14);
    }
  } finally {
    Se = 0, Ft.length = 0, Rl(), Kn = !1, _s = null, (Ft.length || En.length) && Il();
  }
}
function Da(t, e, ...n) {
  if (t.isUnmounted)
    return;
  const r = t.vnode.props || Ct;
  let i = n;
  const s = e.startsWith("update:"), o = s && e.slice(7);
  if (o && o in r) {
    const c = `${o === "modelValue" ? "model" : o}Modifiers`, { number: f, trim: h } = r[c] || Ct;
    h && (i = n.map((p) => Ot(p) ? p.trim() : p)), f && (i = n.map(ea));
  }
  let l, a = r[l = vi(e)] || // also try camelCase event handler (#2249)
  r[l = vi(Le(e))];
  !a && s && (a = r[l = vi(ge(e))]), a && ye(
    a,
    t,
    6,
    i
  );
  const u = r[l + "Once"];
  if (u) {
    if (!t.emitted)
      t.emitted = {};
    else if (t.emitted[l])
      return;
    t.emitted[l] = !0, ye(
      u,
      t,
      6,
      i
    );
  }
}
function $l(t, e, n = !1) {
  const r = e.emitsCache, i = r.get(t);
  if (i !== void 0)
    return i;
  const s = t.emits;
  let o = {}, l = !1;
  if (!ct(t)) {
    const a = (u) => {
      const c = $l(u, e, !0);
      c && (l = !0, $t(o, c));
    };
    !n && e.mixins.length && e.mixins.forEach(a), t.extends && a(t.extends), t.mixins && t.mixins.forEach(a);
  }
  return !s && !l ? (Tt(t) && r.set(t, null), null) : (lt(s) ? s.forEach((a) => o[a] = null) : $t(o, s), Tt(t) && r.set(t, o), o);
}
function ui(t, e) {
  return !t || !ni(e) ? !1 : (e = e.slice(2).replace(/Once$/, ""), dt(t, e[0].toLowerCase() + e.slice(1)) || dt(t, ge(e)) || dt(t, e));
}
let le = null, Ol = null;
function zr(t) {
  const e = le;
  return le = t, Ol = t && t.type.__scopeId || null, e;
}
function za(t, e = le, n) {
  if (!e || t._n)
    return t;
  const r = (...i) => {
    r._d && ho(-1);
    const s = zr(e);
    let o;
    try {
      o = t(...i);
    } finally {
      zr(s), r._d && ho(1);
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
    attrs: a,
    emit: u,
    render: c,
    renderCache: f,
    data: h,
    setupState: p,
    ctx: g,
    inheritAttrs: y
  } = t;
  let w, d;
  const P = zr(t);
  try {
    if (n.shapeFlag & 4) {
      const _ = i || r, S = _;
      w = Ee(
        c.call(
          S,
          _,
          f,
          s,
          p,
          h,
          g
        )
      ), d = a;
    } else {
      const _ = e;
      w = Ee(
        _.length > 1 ? _(
          s,
          { attrs: a, slots: l, emit: u }
        ) : _(
          s,
          null
          /* we know it doesn't need it */
        )
      ), d = e.props ? a : Va(a);
    }
  } catch (_) {
    Hn.length = 0, li(_, t, 1), w = Pe(Yn);
  }
  let T = w;
  if (d && y !== !1) {
    const _ = Object.keys(d), { shapeFlag: S } = T;
    _.length && S & 7 && (o && _.some(ls) && (d = Ga(
      d,
      o
    )), T = Nn(T, d));
  }
  return n.dirs && (T = Nn(T), T.dirs = T.dirs ? T.dirs.concat(n.dirs) : n.dirs), n.transition && (T.transition = n.transition), w = T, zr(P), w;
}
const Va = (t) => {
  let e;
  for (const n in t)
    (n === "class" || n === "style" || ni(n)) && ((e || (e = {}))[n] = t[n]);
  return e;
}, Ga = (t, e) => {
  const n = {};
  for (const r in t)
    (!ls(r) || !(r.slice(9) in e)) && (n[r] = t[r]);
  return n;
};
function Ha(t, e, n) {
  const { props: r, children: i, component: s } = t, { props: o, children: l, patchFlag: a } = e, u = s.emitsOptions;
  if (e.dirs || e.transition)
    return !0;
  if (n && a >= 0) {
    if (a & 1024)
      return !0;
    if (a & 16)
      return r ? no(r, o, u) : !!o;
    if (a & 8) {
      const c = e.dynamicProps;
      for (let f = 0; f < c.length; f++) {
        const h = c[f];
        if (o[h] !== r[h] && !ui(u, h))
          return !0;
      }
    }
  } else
    return (i || l) && (!l || !l.$stable) ? !0 : r === o ? !1 : r ? o ? no(r, o, u) : !0 : !!o;
  return !1;
}
function no(t, e, n) {
  const r = Object.keys(e);
  if (r.length !== Object.keys(t).length)
    return !0;
  for (let i = 0; i < r.length; i++) {
    const s = r[i];
    if (e[s] !== t[s] && !ui(n, s))
      return !0;
  }
  return !1;
}
function qa({ vnode: t, parent: e }, n) {
  for (; e; ) {
    const r = e.subTree;
    if (r.suspense && r.suspense.activeBranch === t && (r.el = t.el), r === t)
      (t = e.vnode).el = n, e = e.parent;
    else
      break;
  }
}
const Ua = Symbol.for("v-ndc"), Wa = (t) => t.__isSuspense;
function Ka(t, e) {
  e && e.pendingBranch ? lt(t) ? e.effects.push(...t) : e.effects.push(t) : ja(t);
}
const Xa = Symbol.for("v-scx"), Ya = () => Tr(Xa), mr = {};
function ki(t, e, n) {
  return Al(t, e, n);
}
function Al(t, e, {
  immediate: n,
  deep: r,
  flush: i,
  once: s,
  onTrack: o,
  onTrigger: l
} = Ct) {
  if (e && s) {
    const R = e;
    e = (...D) => {
      R(...D), S();
    };
  }
  const a = Gt, u = (R) => r === !0 ? R : (
    // for deep: false, only traverse root-level properties
    on(R, r === !1 ? 1 : void 0)
  );
  let c, f = !1, h = !1;
  if (ne(t) ? (c = () => t.value, f = Br(t)) : xn(t) ? (c = () => u(t), f = !0) : lt(t) ? (h = !0, f = t.some((R) => xn(R) || Br(R)), c = () => t.map((R) => {
    if (ne(R))
      return R.value;
    if (xn(R))
      return u(R);
    if (ct(R))
      return We(R, a, 2);
  })) : ct(t) ? e ? c = () => We(t, a, 2) : c = () => (p && p(), ye(
    t,
    a,
    3,
    [g]
  )) : c = fe, e && r) {
    const R = c;
    c = () => on(R());
  }
  let p, g = (R) => {
    p = T.onStop = () => {
      We(R, a, 4), p = T.onStop = void 0;
    };
  }, y;
  if (hi)
    if (g = fe, e ? n && ye(e, a, 3, [
      c(),
      h ? [] : void 0,
      g
    ]) : c(), i === "sync") {
      const R = Ya();
      y = R.__watcherHandles || (R.__watcherHandles = []);
    } else
      return fe;
  let w = h ? new Array(t.length).fill(mr) : mr;
  const d = () => {
    if (!(!T.active || !T.dirty))
      if (e) {
        const R = T.run();
        (r || f || (h ? R.some((D, H) => Ke(D, w[H])) : Ke(R, w))) && (p && p(), ye(e, a, 3, [
          R,
          // pass undefined as the old value when it's changed for the first time
          w === mr ? void 0 : h && w[0] === mr ? [] : w,
          g
        ]), w = R);
      } else
        T.run();
  };
  d.allowRecurse = !!e;
  let P;
  i === "sync" ? P = d : i === "post" ? P = () => Jt(d, a && a.suspense) : (d.pre = !0, a && (d.id = a.uid), P = () => vs(d));
  const T = new hs(c, fe, P), _ = ca(), S = () => {
    T.stop(), _ && us(_.effects, T);
  };
  return e ? n ? d() : w = T.run() : i === "post" ? Jt(
    T.run.bind(T),
    a && a.suspense
  ) : T.run(), y && y.push(S), S;
}
function Ja(t, e, n) {
  const r = this.proxy, i = Ot(t) ? t.includes(".") ? Fl(r, t) : () => r[t] : t.bind(r, r);
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
  if (!Tt(t) || t.__v_skip)
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
  if (le === null)
    return t;
  const n = di(le) || le.proxy, r = t.dirs || (t.dirs = []);
  for (let i = 0; i < e.length; i++) {
    let [s, o, l, a = Ct] = e[i];
    s && (ct(s) && (s = {
      mounted: s,
      updated: s
    }), s.deep && on(o), r.push({
      dir: s,
      instance: n,
      value: o,
      oldValue: void 0,
      arg: l,
      modifiers: a
    }));
  }
  return t;
}
function Je(t, e, n, r) {
  const i = t.dirs, s = e && e.dirs;
  for (let o = 0; o < i.length; o++) {
    const l = i[o];
    s && (l.oldValue = s[o].value);
    let a = l.dir[r];
    a && (dn(), ye(a, n, 8, [
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
    $t({ name: t.name }, e, { setup: t })
  ) : t;
}
const Cr = (t) => !!t.type.__asyncLoader, jl = (t) => t.type.__isKeepAlive;
function Qa(t, e) {
  Bl(t, "a", e);
}
function Za(t, e) {
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
  if (ai(e, r, n), n) {
    let i = n.parent;
    for (; i && i.parent; )
      jl(i.parent.vnode) && tc(r, e, n, i), i = i.parent;
  }
}
function tc(t, e, n, r) {
  const i = ai(
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
function ai(t, e, n = Gt, r = !1) {
  if (n) {
    const i = n[t] || (n[t] = []), s = e.__weh || (e.__weh = (...o) => {
      if (n.isUnmounted)
        return;
      dn();
      const l = ir(n), a = ye(e, n, t, o);
      return l(), pn(), a;
    });
    return r ? i.unshift(s) : i.push(s), s;
  }
}
const $e = (t) => (e, n = Gt) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!hi || t === "sp") && ai(t, (...r) => e(...r), n)
), Dl = $e("bm"), zl = $e("m"), ec = $e("bu"), nc = $e("u"), rc = $e("bum"), xs = $e("um"), ic = $e("sp"), sc = $e(
  "rtg"
), oc = $e(
  "rtc"
);
function lc(t, e = Gt) {
  ai("ec", t, e);
}
function ro(t, e, n, r) {
  let i;
  const s = n;
  if (lt(t) || Ot(t)) {
    i = new Array(t.length);
    for (let o = 0, l = t.length; o < l; o++)
      i[o] = e(t[o], o, void 0, s);
  } else if (typeof t == "number") {
    i = new Array(t);
    for (let o = 0; o < t; o++)
      i[o] = e(o + 1, o, void 0, s);
  } else if (Tt(t))
    if (t[Symbol.iterator])
      i = Array.from(
        t,
        (o, l) => e(o, l, void 0, s)
      );
    else {
      const o = Object.keys(t);
      i = new Array(o.length);
      for (let l = 0, a = o.length; l < a; l++) {
        const u = o[l];
        i[l] = e(t[u], u, l, s);
      }
    }
  else
    i = [];
  return i;
}
const zi = (t) => t ? Ql(t) ? di(t) || t.proxy : zi(t.parent) : null, Vn = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ $t(/* @__PURE__ */ Object.create(null), {
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
    $nextTick: (t) => t.n || (t.n = Tl.bind(t.proxy)),
    $watch: (t) => Ja.bind(t)
  })
), Si = (t, e) => t !== Ct && !t.__isScriptSetup && dt(t, e), uc = {
  get({ _: t }, e) {
    const { ctx: n, setupState: r, data: i, props: s, accessCache: o, type: l, appContext: a } = t;
    let u;
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
        if (Si(r, e))
          return o[e] = 1, r[e];
        if (i !== Ct && dt(i, e))
          return o[e] = 2, i[e];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (u = t.propsOptions[0]) && dt(u, e)
        )
          return o[e] = 3, s[e];
        if (n !== Ct && dt(n, e))
          return o[e] = 4, n[e];
        Vi && (o[e] = 0);
      }
    }
    const c = Vn[e];
    let f, h;
    if (c)
      return e === "$attrs" && ee(t, "get", e), c(t);
    if (
      // css module (injected by vue-loader)
      (f = l.__cssModules) && (f = f[e])
    )
      return f;
    if (n !== Ct && dt(n, e))
      return o[e] = 4, n[e];
    if (
      // global properties
      h = a.config.globalProperties, dt(h, e)
    )
      return h[e];
  },
  set({ _: t }, e, n) {
    const { data: r, setupState: i, ctx: s } = t;
    return Si(i, e) ? (i[e] = n, !0) : r !== Ct && dt(r, e) ? (r[e] = n, !0) : dt(t.props, e) || e[0] === "$" && e.slice(1) in t ? !1 : (s[e] = n, !0);
  },
  has({
    _: { data: t, setupState: e, accessCache: n, ctx: r, appContext: i, propsOptions: s }
  }, o) {
    let l;
    return !!n[o] || t !== Ct && dt(t, o) || Si(e, o) || (l = s[0]) && dt(l, o) || dt(r, o) || dt(Vn, o) || dt(i.config.globalProperties, o);
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
let Vi = !0;
function ac(t) {
  const e = Es(t), n = t.proxy, r = t.ctx;
  Vi = !1, e.beforeCreate && so(e.beforeCreate, t, "bc");
  const {
    // state
    data: i,
    computed: s,
    methods: o,
    watch: l,
    provide: a,
    inject: u,
    // lifecycle
    created: c,
    beforeMount: f,
    mounted: h,
    beforeUpdate: p,
    updated: g,
    activated: y,
    deactivated: w,
    beforeDestroy: d,
    beforeUnmount: P,
    destroyed: T,
    unmounted: _,
    render: S,
    renderTracked: R,
    renderTriggered: D,
    errorCaptured: H,
    serverPrefetch: Z,
    // public API
    expose: B,
    inheritAttrs: Q,
    // assets
    components: ut,
    directives: K,
    filters: x
  } = e;
  if (u && cc(u, r, null), o)
    for (const F in o) {
      const $ = o[F];
      ct($) && (r[F] = $.bind(n));
    }
  if (i) {
    const F = i.call(n, n);
    Tt(F) && (t.data = oi(F));
  }
  if (Vi = !0, s)
    for (const F in s) {
      const $ = s[F], X = ct($) ? $.bind(n, n) : ct($.get) ? $.get.bind(n, n) : fe, Y = !ct($) && ct($.set) ? $.set.bind(n) : fe, it = Wi({
        get: X,
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
      Vl(l[F], r, n, F);
  if (a) {
    const F = ct(a) ? a.call(n) : a;
    Reflect.ownKeys(F).forEach(($) => {
      mc($, F[$]);
    });
  }
  c && so(c, t, "c");
  function N(F, $) {
    lt($) ? $.forEach((X) => F(X.bind(n))) : $ && F($.bind(n));
  }
  if (N(Dl, f), N(zl, h), N(ec, p), N(nc, g), N(Qa, y), N(Za, w), N(lc, H), N(oc, R), N(sc, D), N(rc, P), N(xs, _), N(ic, Z), lt(B))
    if (B.length) {
      const F = t.exposed || (t.exposed = {});
      B.forEach(($) => {
        Object.defineProperty(F, $, {
          get: () => n[$],
          set: (X) => n[$] = X
        });
      });
    } else t.exposed || (t.exposed = {});
  S && t.render === fe && (t.render = S), Q != null && (t.inheritAttrs = Q), ut && (t.components = ut), K && (t.directives = K);
}
function cc(t, e, n = fe) {
  lt(t) && (t = Gi(t));
  for (const r in t) {
    const i = t[r];
    let s;
    Tt(i) ? "default" in i ? s = Tr(
      i.from || r,
      i.default,
      !0
    ) : s = Tr(i.from || r) : s = Tr(i), ne(s) ? Object.defineProperty(e, r, {
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
function Vl(t, e, n, r) {
  const i = r.includes(".") ? Fl(n, r) : () => n[r];
  if (Ot(t)) {
    const s = e[t];
    ct(s) && ki(i, s);
  } else if (ct(t))
    ki(i, t.bind(n));
  else if (Tt(t))
    if (lt(t))
      t.forEach((s) => Vl(s, e, n, r));
    else {
      const s = ct(t.handler) ? t.handler.bind(n) : e[t.handler];
      ct(s) && ki(i, s, t);
    }
}
function Es(t) {
  const e = t.type, { mixins: n, extends: r } = e, {
    mixins: i,
    optionsCache: s,
    config: { optionMergeStrategies: o }
  } = t.appContext, l = s.get(e);
  let a;
  return l ? a = l : !i.length && !n && !r ? a = e : (a = {}, i.length && i.forEach(
    (u) => Vr(a, u, o, !0)
  ), Vr(a, e, o)), Tt(e) && s.set(e, a), a;
}
function Vr(t, e, n, r = !1) {
  const { mixins: i, extends: s } = e;
  s && Vr(t, s, n, !0), i && i.forEach(
    (o) => Vr(t, o, n, !0)
  );
  for (const o in e)
    if (!(r && o === "expose")) {
      const l = fc[o] || n && n[o];
      t[o] = l ? l(t[o], e[o]) : e[o];
    }
  return t;
}
const fc = {
  data: oo,
  props: lo,
  emits: lo,
  // objects
  methods: Fn,
  computed: Fn,
  // lifecycle
  beforeCreate: Dt,
  created: Dt,
  beforeMount: Dt,
  mounted: Dt,
  beforeUpdate: Dt,
  updated: Dt,
  beforeDestroy: Dt,
  beforeUnmount: Dt,
  destroyed: Dt,
  unmounted: Dt,
  activated: Dt,
  deactivated: Dt,
  errorCaptured: Dt,
  serverPrefetch: Dt,
  // assets
  components: Fn,
  directives: Fn,
  // watch
  watch: dc,
  // provide / inject
  provide: oo,
  inject: hc
};
function oo(t, e) {
  return e ? t ? function() {
    return $t(
      ct(t) ? t.call(this, this) : t,
      ct(e) ? e.call(this, this) : e
    );
  } : e : t;
}
function hc(t, e) {
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
function Dt(t, e) {
  return t ? [...new Set([].concat(t, e))] : e;
}
function Fn(t, e) {
  return t ? $t(/* @__PURE__ */ Object.create(null), t, e) : e;
}
function lo(t, e) {
  return t ? lt(t) && lt(e) ? [.../* @__PURE__ */ new Set([...t, ...e])] : $t(
    /* @__PURE__ */ Object.create(null),
    io(t),
    io(e ?? {})
  ) : e;
}
function dc(t, e) {
  if (!t)
    return e;
  if (!e)
    return t;
  const n = $t(/* @__PURE__ */ Object.create(null), t);
  for (const r in e)
    n[r] = Dt(t[r], e[r]);
  return n;
}
function Gl() {
  return {
    app: null,
    config: {
      isNativeTag: Yu,
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
let pc = 0;
function gc(t, e) {
  return function(r, i = null) {
    ct(r) || (r = $t({}, r)), i != null && !Tt(i) && (i = null);
    const s = Gl(), o = /* @__PURE__ */ new WeakSet();
    let l = !1;
    const a = s.app = {
      _uid: pc++,
      _component: r,
      _props: i,
      _container: null,
      _context: s,
      _instance: null,
      version: Vc,
      get config() {
        return s.config;
      },
      set config(u) {
      },
      use(u, ...c) {
        return o.has(u) || (u && ct(u.install) ? (o.add(u), u.install(a, ...c)) : ct(u) && (o.add(u), u(a, ...c))), a;
      },
      mixin(u) {
        return s.mixins.includes(u) || s.mixins.push(u), a;
      },
      component(u, c) {
        return c ? (s.components[u] = c, a) : s.components[u];
      },
      directive(u, c) {
        return c ? (s.directives[u] = c, a) : s.directives[u];
      },
      mount(u, c, f) {
        if (!l) {
          const h = Pe(r, i);
          return h.appContext = s, f === !0 ? f = "svg" : f === !1 && (f = void 0), c && e ? e(h, u) : t(h, u, f), l = !0, a._container = u, u.__vue_app__ = a, di(h.component) || h.component.proxy;
        }
      },
      unmount() {
        l && (t(null, a._container), delete a._container.__vue_app__);
      },
      provide(u, c) {
        return s.provides[u] = c, a;
      },
      runWithContext(u) {
        const c = Gn;
        Gn = a;
        try {
          return u();
        } finally {
          Gn = c;
        }
      }
    };
    return a;
  };
}
let Gn = null;
function mc(t, e) {
  if (Gt) {
    let n = Gt.provides;
    const r = Gt.parent && Gt.parent.provides;
    r === n && (n = Gt.provides = Object.create(r)), n[t] = e;
  }
}
function Tr(t, e, n = !1) {
  const r = Gt || le;
  if (r || Gn) {
    const i = r ? r.parent == null ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : Gn._context.provides;
    if (i && t in i)
      return i[t];
    if (arguments.length > 1)
      return n && ct(e) ? e.call(r && r.proxy) : e;
  }
}
function wc(t, e, n, r = !1) {
  const i = {}, s = {};
  jr(s, fi, 1), t.propsDefaults = /* @__PURE__ */ Object.create(null), Hl(t, e, i, s);
  for (const o in t.propsOptions[0])
    o in i || (i[o] = void 0);
  n ? t.props = r ? i : Ta(i) : t.type.props ? t.props = i : t.props = s, t.attrs = s;
}
function yc(t, e, n, r) {
  const {
    props: i,
    attrs: s,
    vnode: { patchFlag: o }
  } = t, l = pt(i), [a] = t.propsOptions;
  let u = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (r || o > 0) && !(o & 16)
  ) {
    if (o & 8) {
      const c = t.vnode.dynamicProps;
      for (let f = 0; f < c.length; f++) {
        let h = c[f];
        if (ui(t.emitsOptions, h))
          continue;
        const p = e[h];
        if (a)
          if (dt(s, h))
            p !== s[h] && (s[h] = p, u = !0);
          else {
            const g = Le(h);
            i[g] = Hi(
              a,
              l,
              g,
              p,
              t,
              !1
            );
          }
        else
          p !== s[h] && (s[h] = p, u = !0);
      }
    }
  } else {
    Hl(t, e, i, s) && (u = !0);
    let c;
    for (const f in l)
      (!e || // for camelCase
      !dt(e, f) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((c = ge(f)) === f || !dt(e, c))) && (a ? n && // for camelCase
      (n[f] !== void 0 || // for kebab-case
      n[c] !== void 0) && (i[f] = Hi(
        a,
        l,
        f,
        void 0,
        t,
        !0
      )) : delete i[f]);
    if (s !== l)
      for (const f in s)
        (!e || !dt(e, f)) && (delete s[f], u = !0);
  }
  u && Re(t, "set", "$attrs");
}
function Hl(t, e, n, r) {
  const [i, s] = t.propsOptions;
  let o = !1, l;
  if (e)
    for (let a in e) {
      if (zn(a))
        continue;
      const u = e[a];
      let c;
      i && dt(i, c = Le(a)) ? !s || !s.includes(c) ? n[c] = u : (l || (l = {}))[c] = u : ui(t.emitsOptions, a) || (!(a in r) || u !== r[a]) && (r[a] = u, o = !0);
    }
  if (s) {
    const a = pt(n), u = l || Ct;
    for (let c = 0; c < s.length; c++) {
      const f = s[c];
      n[f] = Hi(
        i,
        a,
        f,
        u[f],
        t,
        !dt(u, f)
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
      const a = o.default;
      if (o.type !== Function && !o.skipFactory && ct(a)) {
        const { propsDefaults: u } = i;
        if (n in u)
          r = u[n];
        else {
          const c = ir(i);
          r = u[n] = a.call(
            null,
            e
          ), c();
        }
      } else
        r = a;
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
  let a = !1;
  if (!ct(t)) {
    const c = (f) => {
      a = !0;
      const [h, p] = ql(f, e, !0);
      $t(o, h), p && l.push(...p);
    };
    !n && e.mixins.length && e.mixins.forEach(c), t.extends && c(t.extends), t.mixins && t.mixins.forEach(c);
  }
  if (!s && !a)
    return Tt(t) && r.set(t, vn), vn;
  if (lt(s))
    for (let c = 0; c < s.length; c++) {
      const f = Le(s[c]);
      uo(f) && (o[f] = Ct);
    }
  else if (s)
    for (const c in s) {
      const f = Le(c);
      if (uo(f)) {
        const h = s[c], p = o[f] = lt(h) || ct(h) ? { type: h } : $t({}, h);
        if (p) {
          const g = fo(Boolean, p.type), y = fo(String, p.type);
          p[
            0
            /* shouldCast */
          ] = g > -1, p[
            1
            /* shouldCastTrue */
          ] = y < 0 || g < y, (g > -1 || dt(p, "default")) && l.push(f);
        }
      }
    }
  const u = [o, l];
  return Tt(t) && r.set(t, u), u;
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
const Ul = (t) => t[0] === "_" || t === "$stable", ks = (t) => lt(t) ? t.map(Ee) : [Ee(t)], _c = (t, e, n) => {
  if (e._n)
    return e;
  const r = za((...i) => ks(e(...i)), n);
  return r._c = !1, r;
}, Wl = (t, e, n) => {
  const r = t._ctx;
  for (const i in t) {
    if (Ul(i))
      continue;
    const s = t[i];
    if (ct(s))
      e[i] = _c(i, s, r);
    else if (s != null) {
      const o = ks(s);
      e[i] = () => o;
    }
  }
}, Kl = (t, e) => {
  const n = ks(e);
  t.slots.default = () => n;
}, vc = (t, e) => {
  if (t.vnode.shapeFlag & 32) {
    const n = e._;
    n ? (t.slots = pt(e), jr(e, "_", n)) : Wl(
      e,
      t.slots = {}
    );
  } else
    t.slots = {}, e && Kl(t, e);
  jr(t.slots, fi, 1);
}, bc = (t, e, n) => {
  const { vnode: r, slots: i } = t;
  let s = !0, o = Ct;
  if (r.shapeFlag & 32) {
    const l = e._;
    l ? n && l === 1 ? s = !1 : ($t(i, e), !n && l === 1 && delete i._) : (s = !e.$stable, Wl(e, i)), o = e;
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
  const s = r.shapeFlag & 4 ? di(r.component) || r.component.proxy : r.el, o = i ? null : s, { i: l, r: a } = t, u = e && e.r, c = l.refs === Ct ? l.refs = {} : l.refs, f = l.setupState;
  if (u != null && u !== a && (Ot(u) ? (c[u] = null, dt(f, u) && (f[u] = null)) : ne(u) && (u.value = null)), ct(a))
    We(a, l, 12, [o, c]);
  else {
    const h = Ot(a), p = ne(a);
    if (h || p) {
      const g = () => {
        if (t.f) {
          const y = h ? dt(f, a) ? f[a] : c[a] : a.value;
          i ? lt(y) && us(y, s) : lt(y) ? y.includes(s) || y.push(s) : h ? (c[a] = [s], dt(f, a) && (f[a] = c[a])) : (a.value = [s], t.k && (c[t.k] = a.value));
        } else h ? (c[a] = o, dt(f, a) && (f[a] = o)) : p && (a.value = o, t.k && (c[t.k] = o));
      };
      o ? (g.id = -1, Jt(g, n)) : g();
    }
  }
}
const Jt = Ka;
function xc(t) {
  return Ec(t);
}
function Ec(t, e) {
  const n = al();
  n.__VUE__ = !0;
  const {
    insert: r,
    remove: i,
    patchProp: s,
    createElement: o,
    createText: l,
    createComment: a,
    setText: u,
    setElementText: c,
    parentNode: f,
    nextSibling: h,
    setScopeId: p = fe,
    insertStaticContent: g
  } = t, y = (v, b, C, O = null, A = null, q = null, U = void 0, G = null, W = !!b.dynamicChildren) => {
    if (v === b)
      return;
    v && !In(v, b) && (O = vt(v), st(v, A, q, !0), v = null), b.patchFlag === -2 && (W = !1, b.dynamicChildren = null);
    const { type: j, ref: J, shapeFlag: et } = b;
    switch (j) {
      case ci:
        w(v, b, C, O);
        break;
      case Yn:
        d(v, b, C, O);
        break;
      case Mi:
        v == null && P(b, C, O, U);
        break;
      case ce:
        ut(
          v,
          b,
          C,
          O,
          A,
          q,
          U,
          G,
          W
        );
        break;
      default:
        et & 1 ? S(
          v,
          b,
          C,
          O,
          A,
          q,
          U,
          G,
          W
        ) : et & 6 ? K(
          v,
          b,
          C,
          O,
          A,
          q,
          U,
          G,
          W
        ) : (et & 64 || et & 128) && j.process(
          v,
          b,
          C,
          O,
          A,
          q,
          U,
          G,
          W,
          jt
        );
    }
    J != null && A && qi(J, v && v.ref, q, b || v, !b);
  }, w = (v, b, C, O) => {
    if (v == null)
      r(
        b.el = l(b.children),
        C,
        O
      );
    else {
      const A = b.el = v.el;
      b.children !== v.children && u(A, b.children);
    }
  }, d = (v, b, C, O) => {
    v == null ? r(
      b.el = a(b.children || ""),
      C,
      O
    ) : b.el = v.el;
  }, P = (v, b, C, O) => {
    [v.el, v.anchor] = g(
      v.children,
      b,
      C,
      O,
      v.el,
      v.anchor
    );
  }, T = ({ el: v, anchor: b }, C, O) => {
    let A;
    for (; v && v !== b; )
      A = h(v), r(v, C, O), v = A;
    r(b, C, O);
  }, _ = ({ el: v, anchor: b }) => {
    let C;
    for (; v && v !== b; )
      C = h(v), i(v), v = C;
    i(b);
  }, S = (v, b, C, O, A, q, U, G, W) => {
    b.type === "svg" ? U = "svg" : b.type === "math" && (U = "mathml"), v == null ? R(
      b,
      C,
      O,
      A,
      q,
      U,
      G,
      W
    ) : Z(
      v,
      b,
      A,
      q,
      U,
      G,
      W
    );
  }, R = (v, b, C, O, A, q, U, G) => {
    let W, j;
    const { props: J, shapeFlag: et, transition: tt, dirs: ot } = v;
    if (W = v.el = o(
      v.type,
      q,
      J && J.is,
      J
    ), et & 8 ? c(W, v.children) : et & 16 && H(
      v.children,
      W,
      null,
      O,
      A,
      Pi(v, q),
      U,
      G
    ), ot && Je(v, null, O, "created"), D(W, v, v.scopeId, U, O), J) {
      for (const yt in J)
        yt !== "value" && !zn(yt) && s(
          W,
          yt,
          null,
          J[yt],
          q,
          v.children,
          O,
          A,
          wt
        );
      "value" in J && s(W, "value", null, J.value, q), (j = J.onVnodeBeforeMount) && be(j, O, v);
    }
    ot && Je(v, null, O, "beforeMount");
    const ft = kc(A, tt);
    ft && tt.beforeEnter(W), r(W, b, C), ((j = J && J.onVnodeMounted) || ft || ot) && Jt(() => {
      j && be(j, O, v), ft && tt.enter(W), ot && Je(v, null, O, "mounted");
    }, A);
  }, D = (v, b, C, O, A) => {
    if (C && p(v, C), O)
      for (let q = 0; q < O.length; q++)
        p(v, O[q]);
    if (A) {
      let q = A.subTree;
      if (b === q) {
        const U = A.vnode;
        D(
          v,
          U,
          U.scopeId,
          U.slotScopeIds,
          A.parent
        );
      }
    }
  }, H = (v, b, C, O, A, q, U, G, W = 0) => {
    for (let j = W; j < v.length; j++) {
      const J = v[j] = G ? Ge(v[j]) : Ee(v[j]);
      y(
        null,
        J,
        b,
        C,
        O,
        A,
        q,
        U,
        G
      );
    }
  }, Z = (v, b, C, O, A, q, U) => {
    const G = b.el = v.el;
    let { patchFlag: W, dynamicChildren: j, dirs: J } = b;
    W |= v.patchFlag & 16;
    const et = v.props || Ct, tt = b.props || Ct;
    let ot;
    if (C && Qe(C, !1), (ot = tt.onVnodeBeforeUpdate) && be(ot, C, b, v), J && Je(b, v, C, "beforeUpdate"), C && Qe(C, !0), j ? B(
      v.dynamicChildren,
      j,
      G,
      C,
      O,
      Pi(b, A),
      q
    ) : U || $(
      v,
      b,
      G,
      null,
      C,
      O,
      Pi(b, A),
      q,
      !1
    ), W > 0) {
      if (W & 16)
        Q(
          G,
          b,
          et,
          tt,
          C,
          O,
          A
        );
      else if (W & 2 && et.class !== tt.class && s(G, "class", null, tt.class, A), W & 4 && s(G, "style", et.style, tt.style, A), W & 8) {
        const ft = b.dynamicProps;
        for (let yt = 0; yt < ft.length; yt++) {
          const St = ft[yt], Lt = et[St], Xt = tt[St];
          (Xt !== Lt || St === "value") && s(
            G,
            St,
            Lt,
            Xt,
            A,
            v.children,
            C,
            O,
            wt
          );
        }
      }
      W & 1 && v.children !== b.children && c(G, b.children);
    } else !U && j == null && Q(
      G,
      b,
      et,
      tt,
      C,
      O,
      A
    );
    ((ot = tt.onVnodeUpdated) || J) && Jt(() => {
      ot && be(ot, C, b, v), J && Je(b, v, C, "updated");
    }, O);
  }, B = (v, b, C, O, A, q, U) => {
    for (let G = 0; G < b.length; G++) {
      const W = v[G], j = b[G], J = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        W.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (W.type === ce || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !In(W, j) || // - In the case of a component, it could contain anything.
        W.shapeFlag & 70) ? f(W.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          C
        )
      );
      y(
        W,
        j,
        J,
        null,
        O,
        A,
        q,
        U,
        !0
      );
    }
  }, Q = (v, b, C, O, A, q, U) => {
    if (C !== O) {
      if (C !== Ct)
        for (const G in C)
          !zn(G) && !(G in O) && s(
            v,
            G,
            C[G],
            null,
            U,
            b.children,
            A,
            q,
            wt
          );
      for (const G in O) {
        if (zn(G))
          continue;
        const W = O[G], j = C[G];
        W !== j && G !== "value" && s(
          v,
          G,
          j,
          W,
          U,
          b.children,
          A,
          q,
          wt
        );
      }
      "value" in O && s(v, "value", C.value, O.value, U);
    }
  }, ut = (v, b, C, O, A, q, U, G, W) => {
    const j = b.el = v ? v.el : l(""), J = b.anchor = v ? v.anchor : l("");
    let { patchFlag: et, dynamicChildren: tt, slotScopeIds: ot } = b;
    ot && (G = G ? G.concat(ot) : ot), v == null ? (r(j, C, O), r(J, C, O), H(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      b.children || [],
      C,
      J,
      A,
      q,
      U,
      G,
      W
    )) : et > 0 && et & 64 && tt && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    v.dynamicChildren ? (B(
      v.dynamicChildren,
      tt,
      C,
      A,
      q,
      U,
      G
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (b.key != null || A && b === A.subTree) && Xl(
      v,
      b,
      !0
      /* shallow */
    )) : $(
      v,
      b,
      C,
      J,
      A,
      q,
      U,
      G,
      W
    );
  }, K = (v, b, C, O, A, q, U, G, W) => {
    b.slotScopeIds = G, v == null ? b.shapeFlag & 512 ? A.ctx.activate(
      b,
      C,
      O,
      U,
      W
    ) : x(
      b,
      C,
      O,
      A,
      q,
      U,
      W
    ) : z(v, b, W);
  }, x = (v, b, C, O, A, q, U) => {
    const G = v.component = Ac(
      v,
      O,
      A
    );
    if (jl(v) && (G.ctx.renderer = jt), Fc(G), G.asyncDep) {
      if (A && A.registerDep(G, N), !v.el) {
        const W = G.subTree = Pe(Yn);
        d(null, W, b, C);
      }
    } else
      N(
        G,
        v,
        b,
        C,
        A,
        q,
        U
      );
  }, z = (v, b, C) => {
    const O = b.component = v.component;
    if (Ha(v, b, C))
      if (O.asyncDep && !O.asyncResolved) {
        F(O, b, C);
        return;
      } else
        O.next = b, Fa(O.update), O.effect.dirty = !0, O.update();
    else
      b.el = v.el, O.vnode = b;
  }, N = (v, b, C, O, A, q, U) => {
    const G = () => {
      if (v.isMounted) {
        let { next: J, bu: et, u: tt, parent: ot, vnode: ft } = v;
        {
          const Oe = Yl(v);
          if (Oe) {
            J && (J.el = ft.el, F(v, J, U)), Oe.asyncDep.then(() => {
              v.isUnmounted || G();
            });
            return;
          }
        }
        let yt = J, St;
        Qe(v, !1), J ? (J.el = ft.el, F(v, J, U)) : J = ft, et && bi(et), (St = J.props && J.props.onVnodeBeforeUpdate) && be(St, ot, J, ft), Qe(v, !0);
        const Lt = Ei(v), Xt = v.subTree;
        v.subTree = Lt, y(
          Xt,
          Lt,
          // parent may have changed if it's in a teleport
          f(Xt.el),
          // anchor may have changed if it's in a fragment
          vt(Xt),
          v,
          A,
          q
        ), J.el = Lt.el, yt === null && qa(v, Lt.el), tt && Jt(tt, A), (St = J.props && J.props.onVnodeUpdated) && Jt(
          () => be(St, ot, J, ft),
          A
        );
      } else {
        let J;
        const { el: et, props: tt } = b, { bm: ot, m: ft, parent: yt } = v, St = Cr(b);
        if (Qe(v, !1), ot && bi(ot), !St && (J = tt && tt.onVnodeBeforeMount) && be(J, yt, b), Qe(v, !0), et && ve) {
          const Lt = () => {
            v.subTree = Ei(v), ve(
              et,
              v.subTree,
              v,
              A,
              null
            );
          };
          St ? b.type.__asyncLoader().then(
            // note: we are moving the render call into an async callback,
            // which means it won't track dependencies - but it's ok because
            // a server-rendered async wrapper is already in resolved state
            // and it will never need to change.
            () => !v.isUnmounted && Lt()
          ) : Lt();
        } else {
          const Lt = v.subTree = Ei(v);
          y(
            null,
            Lt,
            C,
            O,
            v,
            A,
            q
          ), b.el = Lt.el;
        }
        if (ft && Jt(ft, A), !St && (J = tt && tt.onVnodeMounted)) {
          const Lt = b;
          Jt(
            () => be(J, yt, Lt),
            A
          );
        }
        (b.shapeFlag & 256 || yt && Cr(yt.vnode) && yt.vnode.shapeFlag & 256) && v.a && Jt(v.a, A), v.isMounted = !0, b = C = O = null;
      }
    }, W = v.effect = new hs(
      G,
      fe,
      () => vs(j),
      v.scope
      // track it in component's effect scope
    ), j = v.update = () => {
      W.dirty && W.run();
    };
    j.id = v.uid, Qe(v, !0), j();
  }, F = (v, b, C) => {
    b.component = v;
    const O = v.vnode.props;
    v.vnode = b, v.next = null, yc(v, b.props, O, C), bc(v, b.children, C), dn(), eo(v), pn();
  }, $ = (v, b, C, O, A, q, U, G, W = !1) => {
    const j = v && v.children, J = v ? v.shapeFlag : 0, et = b.children, { patchFlag: tt, shapeFlag: ot } = b;
    if (tt > 0) {
      if (tt & 128) {
        Y(
          j,
          et,
          C,
          O,
          A,
          q,
          U,
          G,
          W
        );
        return;
      } else if (tt & 256) {
        X(
          j,
          et,
          C,
          O,
          A,
          q,
          U,
          G,
          W
        );
        return;
      }
    }
    ot & 8 ? (J & 16 && wt(j, A, q), et !== j && c(C, et)) : J & 16 ? ot & 16 ? Y(
      j,
      et,
      C,
      O,
      A,
      q,
      U,
      G,
      W
    ) : wt(j, A, q, !0) : (J & 8 && c(C, ""), ot & 16 && H(
      et,
      C,
      O,
      A,
      q,
      U,
      G,
      W
    ));
  }, X = (v, b, C, O, A, q, U, G, W) => {
    v = v || vn, b = b || vn;
    const j = v.length, J = b.length, et = Math.min(j, J);
    let tt;
    for (tt = 0; tt < et; tt++) {
      const ot = b[tt] = W ? Ge(b[tt]) : Ee(b[tt]);
      y(
        v[tt],
        ot,
        C,
        null,
        A,
        q,
        U,
        G,
        W
      );
    }
    j > J ? wt(
      v,
      A,
      q,
      !0,
      !1,
      et
    ) : H(
      b,
      C,
      O,
      A,
      q,
      U,
      G,
      W,
      et
    );
  }, Y = (v, b, C, O, A, q, U, G, W) => {
    let j = 0;
    const J = b.length;
    let et = v.length - 1, tt = J - 1;
    for (; j <= et && j <= tt; ) {
      const ot = v[j], ft = b[j] = W ? Ge(b[j]) : Ee(b[j]);
      if (In(ot, ft))
        y(
          ot,
          ft,
          C,
          null,
          A,
          q,
          U,
          G,
          W
        );
      else
        break;
      j++;
    }
    for (; j <= et && j <= tt; ) {
      const ot = v[et], ft = b[tt] = W ? Ge(b[tt]) : Ee(b[tt]);
      if (In(ot, ft))
        y(
          ot,
          ft,
          C,
          null,
          A,
          q,
          U,
          G,
          W
        );
      else
        break;
      et--, tt--;
    }
    if (j > et) {
      if (j <= tt) {
        const ot = tt + 1, ft = ot < J ? b[ot].el : O;
        for (; j <= tt; )
          y(
            null,
            b[j] = W ? Ge(b[j]) : Ee(b[j]),
            C,
            ft,
            A,
            q,
            U,
            G,
            W
          ), j++;
      }
    } else if (j > tt)
      for (; j <= et; )
        st(v[j], A, q, !0), j++;
    else {
      const ot = j, ft = j, yt = /* @__PURE__ */ new Map();
      for (j = ft; j <= tt; j++) {
        const Bt = b[j] = W ? Ge(b[j]) : Ee(b[j]);
        Bt.key != null && yt.set(Bt.key, j);
      }
      let St, Lt = 0;
      const Xt = tt - ft + 1;
      let Oe = !1, ur = 0;
      const Xe = new Array(Xt);
      for (j = 0; j < Xt; j++)
        Xe[j] = 0;
      for (j = ot; j <= et; j++) {
        const Bt = v[j];
        if (Lt >= Xt) {
          st(Bt, A, q, !0);
          continue;
        }
        let ae;
        if (Bt.key != null)
          ae = yt.get(Bt.key);
        else
          for (St = ft; St <= tt; St++)
            if (Xe[St - ft] === 0 && In(Bt, b[St])) {
              ae = St;
              break;
            }
        ae === void 0 ? st(Bt, A, q, !0) : (Xe[ae - ft] = j + 1, ae >= ur ? ur = ae : Oe = !0, y(
          Bt,
          b[ae],
          C,
          null,
          A,
          q,
          U,
          G,
          W
        ), Lt++);
      }
      const ar = Oe ? Sc(Xe) : vn;
      for (St = ar.length - 1, j = Xt - 1; j >= 0; j--) {
        const Bt = ft + j, ae = b[Bt], cr = Bt + 1 < J ? b[Bt + 1].el : O;
        Xe[j] === 0 ? y(
          null,
          ae,
          C,
          cr,
          A,
          q,
          U,
          G,
          W
        ) : Oe && (St < 0 || j !== ar[St] ? it(ae, C, cr, 2) : St--);
      }
    }
  }, it = (v, b, C, O, A = null) => {
    const { el: q, type: U, transition: G, children: W, shapeFlag: j } = v;
    if (j & 6) {
      it(v.component.subTree, b, C, O);
      return;
    }
    if (j & 128) {
      v.suspense.move(b, C, O);
      return;
    }
    if (j & 64) {
      U.move(v, b, C, jt);
      return;
    }
    if (U === ce) {
      r(q, b, C);
      for (let et = 0; et < W.length; et++)
        it(W[et], b, C, O);
      r(v.anchor, b, C);
      return;
    }
    if (U === Mi) {
      T(v, b, C);
      return;
    }
    if (O !== 2 && j & 1 && G)
      if (O === 0)
        G.beforeEnter(q), r(q, b, C), Jt(() => G.enter(q), A);
      else {
        const { leave: et, delayLeave: tt, afterLeave: ot } = G, ft = () => r(q, b, C), yt = () => {
          et(q, () => {
            ft(), ot && ot();
          });
        };
        tt ? tt(q, ft, yt) : yt();
      }
    else
      r(q, b, C);
  }, st = (v, b, C, O = !1, A = !1) => {
    const {
      type: q,
      props: U,
      ref: G,
      children: W,
      dynamicChildren: j,
      shapeFlag: J,
      patchFlag: et,
      dirs: tt
    } = v;
    if (G != null && qi(G, null, C, v, !0), J & 256) {
      b.ctx.deactivate(v);
      return;
    }
    const ot = J & 1 && tt, ft = !Cr(v);
    let yt;
    if (ft && (yt = U && U.onVnodeBeforeUnmount) && be(yt, b, v), J & 6)
      mt(v.component, C, O);
    else {
      if (J & 128) {
        v.suspense.unmount(C, O);
        return;
      }
      ot && Je(v, null, b, "beforeUnmount"), J & 64 ? v.type.remove(
        v,
        b,
        C,
        A,
        jt,
        O
      ) : j && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (q !== ce || et > 0 && et & 64) ? wt(
        j,
        b,
        C,
        !1,
        !0
      ) : (q === ce && et & 384 || !A && J & 16) && wt(W, b, C), O && Et(v);
    }
    (ft && (yt = U && U.onVnodeUnmounted) || ot) && Jt(() => {
      yt && be(yt, b, v), ot && Je(v, null, b, "unmounted");
    }, C);
  }, Et = (v) => {
    const { type: b, el: C, anchor: O, transition: A } = v;
    if (b === ce) {
      gt(C, O);
      return;
    }
    if (b === Mi) {
      _(v);
      return;
    }
    const q = () => {
      i(C), A && !A.persisted && A.afterLeave && A.afterLeave();
    };
    if (v.shapeFlag & 1 && A && !A.persisted) {
      const { leave: U, delayLeave: G } = A, W = () => U(C, q);
      G ? G(v.el, q, W) : W();
    } else
      q();
  }, gt = (v, b) => {
    let C;
    for (; v !== b; )
      C = h(v), i(v), v = C;
    i(b);
  }, mt = (v, b, C) => {
    const { bum: O, scope: A, update: q, subTree: U, um: G } = v;
    O && bi(O), A.stop(), q && (q.active = !1, st(U, v, b, C)), G && Jt(G, b), Jt(() => {
      v.isUnmounted = !0;
    }, b), b && b.pendingBranch && !b.isUnmounted && v.asyncDep && !v.asyncResolved && v.suspenseId === b.pendingId && (b.deps--, b.deps === 0 && b.resolve());
  }, wt = (v, b, C, O = !1, A = !1, q = 0) => {
    for (let U = q; U < v.length; U++)
      st(v[U], b, C, O, A);
  }, vt = (v) => v.shapeFlag & 6 ? vt(v.component.subTree) : v.shapeFlag & 128 ? v.suspense.next() : h(v.anchor || v.el);
  let kt = !1;
  const It = (v, b, C) => {
    v == null ? b._vnode && st(b._vnode, null, null, !0) : y(
      b._vnode || null,
      v,
      b,
      null,
      null,
      null,
      C
    ), kt || (kt = !0, eo(), Rl(), kt = !1), b._vnode = v;
  }, jt = {
    p: y,
    um: st,
    m: it,
    r: Et,
    mt: x,
    mc: H,
    pc: $,
    pbc: B,
    n: vt,
    o: t
  };
  let re, ve;
  return {
    render: It,
    hydrate: re,
    createApp: gc(It, re)
  };
}
function Pi({ type: t, props: e }, n) {
  return n === "svg" && t === "foreignObject" || n === "mathml" && t === "annotation-xml" && e && e.encoding && e.encoding.includes("html") ? void 0 : n;
}
function Qe({ effect: t, update: e }, n) {
  t.allowRecurse = e.allowRecurse = n;
}
function kc(t, e) {
  return (!t || t && !t.pendingBranch) && e && !e.persisted;
}
function Xl(t, e, n = !1) {
  const r = t.children, i = e.children;
  if (lt(r) && lt(i))
    for (let s = 0; s < r.length; s++) {
      const o = r[s];
      let l = i[s];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = i[s] = Ge(i[s]), l.el = o.el), n || Xl(o, l)), l.type === ci && (l.el = o.el);
    }
}
function Sc(t) {
  const e = t.slice(), n = [0];
  let r, i, s, o, l;
  const a = t.length;
  for (r = 0; r < a; r++) {
    const u = t[r];
    if (u !== 0) {
      if (i = n[n.length - 1], t[i] < u) {
        e[r] = i, n.push(r);
        continue;
      }
      for (s = 0, o = n.length - 1; s < o; )
        l = s + o >> 1, t[n[l]] < u ? s = l + 1 : o = l;
      u < t[n[s]] && (s > 0 && (e[r] = n[s - 1]), n[s] = r);
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
const Pc = (t) => t.__isTeleport, ce = Symbol.for("v-fgt"), ci = Symbol.for("v-txt"), Yn = Symbol.for("v-cmt"), Mi = Symbol.for("v-stc"), Hn = [];
let we = null;
function Be(t = !1) {
  Hn.push(we = t ? null : []);
}
function Mc() {
  Hn.pop(), we = Hn[Hn.length - 1] || null;
}
let Jn = 1;
function ho(t) {
  Jn += t;
}
function Nc(t) {
  return t.dynamicChildren = Jn > 0 ? we || vn : null, Mc(), Jn > 0 && we && we.push(t), t;
}
function De(t, e, n, r, i, s) {
  return Nc(
    se(
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
function Cc(t) {
  return t ? t.__v_isVNode === !0 : !1;
}
function In(t, e) {
  return t.type === e.type && t.key === e.key;
}
const fi = "__vInternal", Jl = ({ key: t }) => t ?? null, Lr = ({
  ref: t,
  ref_key: e,
  ref_for: n
}) => (typeof t == "number" && (t = "" + t), t != null ? Ot(t) || ne(t) || ct(t) ? { i: le, r: t, k: e, f: !!n } : t : null);
function se(t, e = null, n = null, r = 0, i = null, s = t === ce ? 0 : 1, o = !1, l = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t,
    props: e,
    key: e && Jl(e),
    ref: e && Lr(e),
    scopeId: Ol,
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
    ctx: le
  };
  return l ? (Ss(a, n), s & 128 && t.normalize(a)) : n && (a.shapeFlag |= Ot(n) ? 8 : 16), Jn > 0 && // avoid a block node from tracking itself
  !o && // has current parent block
  we && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || s & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && we.push(a), a;
}
const Pe = Tc;
function Tc(t, e = null, n = null, r = 0, i = null, s = !1) {
  if ((!t || t === Ua) && (t = Yn), Cc(t)) {
    const l = Nn(
      t,
      e,
      !0
      /* mergeRef: true */
    );
    return n && Ss(l, n), Jn > 0 && !s && we && (l.shapeFlag & 6 ? we[we.indexOf(t)] = l : we.push(l)), l.patchFlag |= -2, l;
  }
  if (zc(t) && (t = t.__vccOpts), e) {
    e = Lc(e);
    let { class: l, style: a } = e;
    l && !Ot(l) && (e.class = fs(l)), Tt(a) && (kl(a) && !lt(a) && (a = $t({}, a)), e.style = cs(a));
  }
  const o = Ot(t) ? 1 : Wa(t) ? 128 : Pc(t) ? 64 : Tt(t) ? 4 : ct(t) ? 2 : 0;
  return se(
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
function Lc(t) {
  return t ? kl(t) || fi in t ? $t({}, t) : t : null;
}
function Nn(t, e, n = !1) {
  const { props: r, ref: i, patchFlag: s, children: o } = t, l = e ? Ic(r || {}, e) : r;
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
      n && i ? lt(i) ? i.concat(Lr(e)) : [i, Lr(e)] : Lr(e)
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
    ssContent: t.ssContent && Nn(t.ssContent),
    ssFallback: t.ssFallback && Nn(t.ssFallback),
    el: t.el,
    anchor: t.anchor,
    ctx: t.ctx,
    ce: t.ce
  };
}
function Rc(t = " ", e = 0) {
  return Pe(ci, null, t, e);
}
function Ee(t) {
  return t == null || typeof t == "boolean" ? Pe(Yn) : lt(t) ? Pe(
    ce,
    null,
    // #3666, avoid reference pollution when reusing vnode
    t.slice()
  ) : typeof t == "object" ? Ge(t) : Pe(ci, null, String(t));
}
function Ge(t) {
  return t.el === null && t.patchFlag !== -1 || t.memo ? t : Nn(t);
}
function Ss(t, e) {
  let n = 0;
  const { shapeFlag: r } = t;
  if (e == null)
    e = null;
  else if (lt(e))
    n = 16;
  else if (typeof e == "object")
    if (r & 65) {
      const i = e.default;
      i && (i._c && (i._d = !1), Ss(t, i()), i._c && (i._d = !0));
      return;
    } else {
      n = 32;
      const i = e._;
      !i && !(fi in e) ? e._ctx = le : i === 3 && le && (le.slots._ === 1 ? e._ = 1 : (e._ = 2, t.patchFlag |= 1024));
    }
  else ct(e) ? (e = { default: e, _ctx: le }, n = 32) : (e = String(e), r & 64 ? (n = 16, e = [Rc(e)]) : n = 8);
  t.children = e, t.shapeFlag |= n;
}
function Ic(...t) {
  const e = {};
  for (let n = 0; n < t.length; n++) {
    const r = t[n];
    for (const i in r)
      if (i === "class")
        e.class !== r.class && (e.class = fs([e.class, r.class]));
      else if (i === "style")
        e.style = cs([e.style, r.style]);
      else if (ni(i)) {
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
const $c = Gl();
let Oc = 0;
function Ac(t, e, n) {
  const r = t.type, i = (e ? e.appContext : t.appContext) || $c, s = {
    uid: Oc++,
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
    scope: new ua(
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
    emitsOptions: $l(r, i),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: Ct,
    // inheritAttrs
    inheritAttrs: r.inheritAttrs,
    // state
    ctx: Ct,
    data: Ct,
    props: Ct,
    attrs: Ct,
    slots: Ct,
    refs: Ct,
    setupState: Ct,
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
let Gt = null, Gr, Ui;
{
  const t = al(), e = (n, r) => {
    let i;
    return (i = t[n]) || (i = t[n] = []), i.push(r), (s) => {
      i.length > 1 ? i.forEach((o) => o(s)) : i[0](s);
    };
  };
  Gr = e(
    "__VUE_INSTANCE_SETTERS__",
    (n) => Gt = n
  ), Ui = e(
    "__VUE_SSR_SETTERS__",
    (n) => hi = n
  );
}
const ir = (t) => {
  const e = Gt;
  return Gr(t), t.scope.on(), () => {
    t.scope.off(), Gr(e);
  };
}, po = () => {
  Gt && Gt.scope.off(), Gr(null);
};
function Ql(t) {
  return t.vnode.shapeFlag & 4;
}
let hi = !1;
function Fc(t, e = !1) {
  e && Ui(e);
  const { props: n, children: r } = t.vnode, i = Ql(t);
  wc(t, n, i, e), vc(t, r);
  const s = i ? jc(t, e) : void 0;
  return e && Ui(!1), s;
}
function jc(t, e) {
  const n = t.type;
  t.accessCache = /* @__PURE__ */ Object.create(null), t.proxy = Sl(new Proxy(t.ctx, uc));
  const { setup: r } = n;
  if (r) {
    const i = t.setupContext = r.length > 1 ? Dc(t) : null, s = ir(t);
    dn();
    const o = We(
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
          li(l, t, 0);
        });
      t.asyncDep = o;
    } else
      go(t, o, e);
  } else
    Zl(t, e);
}
function go(t, e, n) {
  ct(e) ? t.type.__ssrInlineRender ? t.ssrRender = e : t.render = e : Tt(e) && (t.setupState = Nl(e)), Zl(t, n);
}
let mo;
function Zl(t, e, n) {
  const r = t.type;
  if (!t.render) {
    if (!e && mo && !r.render) {
      const i = r.template || Es(t).template;
      if (i) {
        const { isCustomElement: s, compilerOptions: o } = t.appContext.config, { delimiters: l, compilerOptions: a } = r, u = $t(
          $t(
            {
              isCustomElement: s,
              delimiters: l
            },
            o
          ),
          a
        );
        r.render = mo(i, u);
      }
    }
    t.render = r.render || fe;
  }
  {
    const i = ir(t);
    dn();
    try {
      ac(t);
    } finally {
      pn(), i();
    }
  }
}
function Bc(t) {
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
      return Bc(t);
    },
    slots: t.slots,
    emit: t.emit,
    expose: e
  };
}
function di(t) {
  if (t.exposed)
    return t.exposeProxy || (t.exposeProxy = new Proxy(Nl(Sl(t.exposed)), {
      get(e, n) {
        if (n in e)
          return e[n];
        if (n in Vn)
          return Vn[n](t);
      },
      has(e, n) {
        return n in e || n in Vn;
      }
    }));
}
function zc(t) {
  return ct(t) && "__vccOpts" in t;
}
const Wi = (t, e) => La(t, e, hi), Vc = "3.4.21";
/**
* @vue/runtime-dom v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const Gc = "http://www.w3.org/2000/svg", Hc = "http://www.w3.org/1998/Math/MathML", He = typeof document < "u" ? document : null, wo = He && /* @__PURE__ */ He.createElement("template"), qc = {
  insert: (t, e, n) => {
    e.insertBefore(t, n || null);
  },
  remove: (t) => {
    const e = t.parentNode;
    e && e.removeChild(t);
  },
  createElement: (t, e, n, r) => {
    const i = e === "svg" ? He.createElementNS(Gc, t) : e === "mathml" ? He.createElementNS(Hc, t) : He.createElement(t, n ? { is: n } : void 0);
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
        const a = l.firstChild;
        for (; a.firstChild; )
          l.appendChild(a.firstChild);
        l.removeChild(a);
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
}, Uc = Symbol("_vtc");
function Wc(t, e, n) {
  const r = t[Uc];
  r && (e = (e ? [e, ...r] : [...r]).join(" ")), e == null ? t.removeAttribute("class") : n ? t.setAttribute("class", e) : t.className = e;
}
const Hr = Symbol("_vod"), tu = Symbol("_vsh"), Rr = {
  beforeMount(t, { value: e }, { transition: n }) {
    t[Hr] = t.style.display === "none" ? "" : t.style.display, n && e ? n.beforeEnter(t) : $n(t, e);
  },
  mounted(t, { value: e }, { transition: n }) {
    n && e && n.enter(t);
  },
  updated(t, { value: e, oldValue: n }, { transition: r }) {
    !e != !n && (r ? e ? (r.beforeEnter(t), $n(t, !0), r.enter(t)) : r.leave(t, () => {
      $n(t, !1);
    }) : $n(t, e));
  },
  beforeUnmount(t, { value: e }) {
    $n(t, e);
  }
};
function $n(t, e) {
  t.style.display = e ? t[Hr] : "none", t[tu] = !e;
}
const Kc = Symbol(""), Xc = /(^|;)\s*display\s*:/;
function Yc(t, e, n) {
  const r = t.style, i = Ot(n);
  let s = !1;
  if (n && !i) {
    if (e)
      if (Ot(e))
        for (const o of e.split(";")) {
          const l = o.slice(0, o.indexOf(":")).trim();
          n[l] == null && Ir(r, l, "");
        }
      else
        for (const o in e)
          n[o] == null && Ir(r, o, "");
    for (const o in n)
      o === "display" && (s = !0), Ir(r, o, n[o]);
  } else if (i) {
    if (e !== n) {
      const o = r[Kc];
      o && (n += ";" + o), r.cssText = n, s = Xc.test(n);
    }
  } else e && t.removeAttribute("style");
  Hr in t && (t[Hr] = s ? r.display : "", t[tu] && (r.display = "none"));
}
const yo = /\s*!important$/;
function Ir(t, e, n) {
  if (lt(n))
    n.forEach((r) => Ir(t, e, r));
  else if (n == null && (n = ""), e.startsWith("--"))
    t.setProperty(e, n);
  else {
    const r = Jc(t, e);
    yo.test(n) ? t.setProperty(
      ge(r),
      n.replace(yo, ""),
      "important"
    ) : t[r] = n;
  }
}
const _o = ["Webkit", "Moz", "ms"], Ni = {};
function Jc(t, e) {
  const n = Ni[e];
  if (n)
    return n;
  let r = Le(e);
  if (r !== "filter" && r in t)
    return Ni[e] = r;
  r = ul(r);
  for (let i = 0; i < _o.length; i++) {
    const s = _o[i] + r;
    if (s in t)
      return Ni[e] = s;
  }
  return e;
}
const vo = "http://www.w3.org/1999/xlink";
function Qc(t, e, n, r, i) {
  if (r && e.startsWith("xlink:"))
    n == null ? t.removeAttributeNS(vo, e.slice(6, e.length)) : t.setAttributeNS(vo, e, n);
  else {
    const s = la(e);
    n == null || s && !cl(n) ? t.removeAttribute(e) : t.setAttribute(e, s ? "" : n);
  }
}
function Zc(t, e, n, r, i, s, o) {
  if (e === "innerHTML" || e === "textContent") {
    r && o(r, i, s), t[e] = n ?? "";
    return;
  }
  const l = t.tagName;
  if (e === "value" && l !== "PROGRESS" && // custom elements may use _value internally
  !l.includes("-")) {
    const u = l === "OPTION" ? t.getAttribute("value") || "" : t.value, c = n ?? "";
    (u !== c || !("_value" in t)) && (t.value = c), n == null && t.removeAttribute(e), t._value = n;
    return;
  }
  let a = !1;
  if (n === "" || n == null) {
    const u = typeof t[e];
    u === "boolean" ? n = cl(n) : n == null && u === "string" ? (n = "", a = !0) : u === "number" && (n = 0, a = !0);
  }
  try {
    t[e] = n;
  } catch {
  }
  a && t.removeAttribute(e);
}
function tf(t, e, n, r) {
  t.addEventListener(e, n, r);
}
function ef(t, e, n, r) {
  t.removeEventListener(e, n, r);
}
const bo = Symbol("_vei");
function nf(t, e, n, r, i = null) {
  const s = t[bo] || (t[bo] = {}), o = s[e];
  if (r && o)
    o.value = r;
  else {
    const [l, a] = rf(e);
    if (r) {
      const u = s[e] = lf(r, i);
      tf(t, l, u, a);
    } else o && (ef(t, l, o, a), s[e] = void 0);
  }
}
const xo = /(?:Once|Passive|Capture)$/;
function rf(t) {
  let e;
  if (xo.test(t)) {
    e = {};
    let r;
    for (; r = t.match(xo); )
      t = t.slice(0, t.length - r[0].length), e[r[0].toLowerCase()] = !0;
  }
  return [t[2] === ":" ? t.slice(3) : ge(t.slice(2)), e];
}
let Ci = 0;
const sf = /* @__PURE__ */ Promise.resolve(), of = () => Ci || (sf.then(() => Ci = 0), Ci = Date.now());
function lf(t, e) {
  const n = (r) => {
    if (!r._vts)
      r._vts = Date.now();
    else if (r._vts <= n.attached)
      return;
    ye(
      uf(r, n.value),
      e,
      5,
      [r]
    );
  };
  return n.value = t, n.attached = of(), n;
}
function uf(t, e) {
  if (lt(e)) {
    const n = t.stopImmediatePropagation;
    return t.stopImmediatePropagation = () => {
      n.call(t), t._stopped = !0;
    }, e.map((r) => (i) => !i._stopped && r && r(i));
  } else
    return e;
}
const Eo = (t) => t.charCodeAt(0) === 111 && t.charCodeAt(1) === 110 && // lowercase letter
t.charCodeAt(2) > 96 && t.charCodeAt(2) < 123, af = (t, e, n, r, i, s, o, l, a) => {
  const u = i === "svg";
  e === "class" ? Wc(t, r, u) : e === "style" ? Yc(t, n, r) : ni(e) ? ls(e) || nf(t, e, n, r, o) : (e[0] === "." ? (e = e.slice(1), !0) : e[0] === "^" ? (e = e.slice(1), !1) : cf(t, e, r, u)) ? Zc(
    t,
    e,
    r,
    s,
    o,
    l,
    a
  ) : (e === "true-value" ? t._trueValue = r : e === "false-value" && (t._falseValue = r), Qc(t, e, r, u));
};
function cf(t, e, n, r) {
  if (r)
    return !!(e === "innerHTML" || e === "textContent" || e in t && Eo(e) && ct(n));
  if (e === "spellcheck" || e === "draggable" || e === "translate" || e === "form" || e === "list" && t.tagName === "INPUT" || e === "type" && t.tagName === "TEXTAREA")
    return !1;
  if (e === "width" || e === "height") {
    const i = t.tagName;
    if (i === "IMG" || i === "VIDEO" || i === "CANVAS" || i === "SOURCE")
      return !1;
  }
  return Eo(e) && Ot(n) ? !1 : e in t;
}
const ff = /* @__PURE__ */ $t({ patchProp: af }, qc);
let ko;
function hf() {
  return ko || (ko = xc(ff));
}
const So = (...t) => {
  hf().render(...t);
}, df = { class: "graph-controller__controls-overview" }, pf = { key: 0 }, gf = { key: 1 }, mf = { key: 0 }, wf = { key: 1 }, yf = /* @__PURE__ */ bs({
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
    return (o, l) => (Be(), De("table", df, [
      Nr(se("thead", null, [
        se("tr", null, [
          se("th", null, Ae(i[0]), 1),
          se("th", null, Ae(i[1]), 1)
        ])
      ], 512), [
        [Rr, e.showHeader]
      ]),
      se("tbody", null, [
        (Be(), De(ce, null, ro(n, (a) => Nr(se("tr", {
          key: a.action
        }, [
          se("td", null, Ae(a.action), 1),
          Dr(s) ? (Be(), De("td", pf, Ae(a.touch), 1)) : (Be(), De("td", gf, Ae(a.desktop), 1))
        ]), [
          [Rr, e.showControlsGraph]
        ])), 64)),
        (Be(), De(ce, null, ro(r, (a) => Nr(se("tr", {
          key: a.action
        }, [
          se("td", null, Ae(a.action), 1),
          Dr(s) ? (Be(), De("td", mf, Ae(a.touch), 1)) : (Be(), De("td", wf, Ae(a.desktop), 1))
        ]), [
          [Rr, e.showControlsEnvironment]
        ])), 64))
      ])
    ]));
  }
}), _f = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [r, i] of e)
    n[r] = i;
  return n;
}, vf = /* @__PURE__ */ _f(yf, [["__scopeId", "data-v-8c3d818f"]]);
var bf = { value: () => {
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
function xf(t, e) {
  return t.trim().split(/^|\s+/).map(function(n) {
    var r = "", i = n.indexOf(".");
    if (i >= 0 && (r = n.slice(i + 1), n = n.slice(0, i)), n && !e.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: r };
  });
}
$r.prototype = sr.prototype = {
  constructor: $r,
  on: function(t, e) {
    var n = this._, r = xf(t + "", n), i, s = -1, o = r.length;
    if (arguments.length < 2) {
      for (; ++s < o; ) if ((i = (t = r[s]).type) && (i = Ef(n[i], t.name))) return i;
      return;
    }
    if (e != null && typeof e != "function") throw new Error("invalid callback: " + e);
    for (; ++s < o; )
      if (i = (t = r[s]).type) n[i] = Po(n[i], t.name, e);
      else if (e == null) for (i in n) n[i] = Po(n[i], t.name, null);
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
function Ef(t, e) {
  for (var n = 0, r = t.length, i; n < r; ++n)
    if ((i = t[n]).name === e)
      return i.value;
}
function Po(t, e, n) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === e) {
      t[r] = bf, t = t.slice(0, r).concat(t.slice(r + 1));
      break;
    }
  return n != null && t.push({ name: e, value: n }), t;
}
var Ki = "http://www.w3.org/1999/xhtml";
const Mo = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Ki,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function pi(t) {
  var e = t += "", n = e.indexOf(":");
  return n >= 0 && (e = t.slice(0, n)) !== "xmlns" && (t = t.slice(n + 1)), Mo.hasOwnProperty(e) ? { space: Mo[e], local: t } : t;
}
function kf(t) {
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
  var e = pi(t);
  return (e.local ? Sf : kf)(e);
}
function Pf() {
}
function Ps(t) {
  return t == null ? Pf : function() {
    return this.querySelector(t);
  };
}
function Mf(t) {
  typeof t != "function" && (t = Ps(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var s = e[i], o = s.length, l = r[i] = new Array(o), a, u, c = 0; c < o; ++c)
      (a = s[c]) && (u = t.call(a, a.__data__, c, s)) && ("__data__" in a && (u.__data__ = a.__data__), l[c] = u);
  return new ue(r, this._parents);
}
function Nf(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function Cf() {
  return [];
}
function nu(t) {
  return t == null ? Cf : function() {
    return this.querySelectorAll(t);
  };
}
function Tf(t) {
  return function() {
    return Nf(t.apply(this, arguments));
  };
}
function Lf(t) {
  typeof t == "function" ? t = Tf(t) : t = nu(t);
  for (var e = this._groups, n = e.length, r = [], i = [], s = 0; s < n; ++s)
    for (var o = e[s], l = o.length, a, u = 0; u < l; ++u)
      (a = o[u]) && (r.push(t.call(a, a.__data__, u, o)), i.push(a));
  return new ue(r, i);
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
var Rf = Array.prototype.find;
function If(t) {
  return function() {
    return Rf.call(this.children, t);
  };
}
function $f() {
  return this.firstElementChild;
}
function Of(t) {
  return this.select(t == null ? $f : If(typeof t == "function" ? t : iu(t)));
}
var Af = Array.prototype.filter;
function Ff() {
  return Array.from(this.children);
}
function jf(t) {
  return function() {
    return Af.call(this.children, t);
  };
}
function Bf(t) {
  return this.selectAll(t == null ? Ff : jf(typeof t == "function" ? t : iu(t)));
}
function Df(t) {
  typeof t != "function" && (t = ru(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var s = e[i], o = s.length, l = r[i] = [], a, u = 0; u < o; ++u)
      (a = s[u]) && t.call(a, a.__data__, u, s) && l.push(a);
  return new ue(r, this._parents);
}
function su(t) {
  return new Array(t.length);
}
function zf() {
  return new ue(this._enter || this._groups.map(su), this._parents);
}
function qr(t, e) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = e;
}
qr.prototype = {
  constructor: qr,
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
function Vf(t) {
  return function() {
    return t;
  };
}
function Gf(t, e, n, r, i, s) {
  for (var o = 0, l, a = e.length, u = s.length; o < u; ++o)
    (l = e[o]) ? (l.__data__ = s[o], r[o] = l) : n[o] = new qr(t, s[o]);
  for (; o < a; ++o)
    (l = e[o]) && (i[o] = l);
}
function Hf(t, e, n, r, i, s, o) {
  var l, a, u = /* @__PURE__ */ new Map(), c = e.length, f = s.length, h = new Array(c), p;
  for (l = 0; l < c; ++l)
    (a = e[l]) && (h[l] = p = o.call(a, a.__data__, l, e) + "", u.has(p) ? i[l] = a : u.set(p, a));
  for (l = 0; l < f; ++l)
    p = o.call(t, s[l], l, s) + "", (a = u.get(p)) ? (r[l] = a, a.__data__ = s[l], u.delete(p)) : n[l] = new qr(t, s[l]);
  for (l = 0; l < c; ++l)
    (a = e[l]) && u.get(h[l]) === a && (i[l] = a);
}
function qf(t) {
  return t.__data__;
}
function Uf(t, e) {
  if (!arguments.length) return Array.from(this, qf);
  var n = e ? Hf : Gf, r = this._parents, i = this._groups;
  typeof t != "function" && (t = Vf(t));
  for (var s = i.length, o = new Array(s), l = new Array(s), a = new Array(s), u = 0; u < s; ++u) {
    var c = r[u], f = i[u], h = f.length, p = Wf(t.call(c, c && c.__data__, u, r)), g = p.length, y = l[u] = new Array(g), w = o[u] = new Array(g), d = a[u] = new Array(h);
    n(c, f, y, w, d, p, e);
    for (var P = 0, T = 0, _, S; P < g; ++P)
      if (_ = y[P]) {
        for (P >= T && (T = P + 1); !(S = w[T]) && ++T < g; ) ;
        _._next = S || null;
      }
  }
  return o = new ue(o, r), o._enter = l, o._exit = a, o;
}
function Wf(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function Kf() {
  return new ue(this._exit || this._groups.map(su), this._parents);
}
function Xf(t, e, n) {
  var r = this.enter(), i = this, s = this.exit();
  return typeof t == "function" ? (r = t(r), r && (r = r.selection())) : r = r.append(t + ""), e != null && (i = e(i), i && (i = i.selection())), n == null ? s.remove() : n(s), r && i ? r.merge(i).order() : i;
}
function Yf(t) {
  for (var e = t.selection ? t.selection() : t, n = this._groups, r = e._groups, i = n.length, s = r.length, o = Math.min(i, s), l = new Array(i), a = 0; a < o; ++a)
    for (var u = n[a], c = r[a], f = u.length, h = l[a] = new Array(f), p, g = 0; g < f; ++g)
      (p = u[g] || c[g]) && (h[g] = p);
  for (; a < i; ++a)
    l[a] = n[a];
  return new ue(l, this._parents);
}
function Jf() {
  for (var t = this._groups, e = -1, n = t.length; ++e < n; )
    for (var r = t[e], i = r.length - 1, s = r[i], o; --i >= 0; )
      (o = r[i]) && (s && o.compareDocumentPosition(s) ^ 4 && s.parentNode.insertBefore(o, s), s = o);
  return this;
}
function Qf(t) {
  t || (t = Zf);
  function e(f, h) {
    return f && h ? t(f.__data__, h.__data__) : !f - !h;
  }
  for (var n = this._groups, r = n.length, i = new Array(r), s = 0; s < r; ++s) {
    for (var o = n[s], l = o.length, a = i[s] = new Array(l), u, c = 0; c < l; ++c)
      (u = o[c]) && (a[c] = u);
    a.sort(e);
  }
  return new ue(i, this._parents).order();
}
function Zf(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function th() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function eh() {
  return Array.from(this);
}
function nh() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, s = r.length; i < s; ++i) {
      var o = r[i];
      if (o) return o;
    }
  return null;
}
function rh() {
  let t = 0;
  for (const e of this) ++t;
  return t;
}
function ih() {
  return !this.node();
}
function sh(t) {
  for (var e = this._groups, n = 0, r = e.length; n < r; ++n)
    for (var i = e[n], s = 0, o = i.length, l; s < o; ++s)
      (l = i[s]) && t.call(l, l.__data__, s, i);
  return this;
}
function oh(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function lh(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function uh(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function ah(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function ch(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttribute(t) : this.setAttribute(t, n);
  };
}
function fh(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, n);
  };
}
function hh(t, e) {
  var n = pi(t);
  if (arguments.length < 2) {
    var r = this.node();
    return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n);
  }
  return this.each((e == null ? n.local ? lh : oh : typeof e == "function" ? n.local ? fh : ch : n.local ? ah : uh)(n, e));
}
function ou(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function dh(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function ph(t, e, n) {
  return function() {
    this.style.setProperty(t, e, n);
  };
}
function gh(t, e, n) {
  return function() {
    var r = e.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, n);
  };
}
function mh(t, e, n) {
  return arguments.length > 1 ? this.each((e == null ? dh : typeof e == "function" ? gh : ph)(t, e, n ?? "")) : Cn(this.node(), t);
}
function Cn(t, e) {
  return t.style.getPropertyValue(e) || ou(t).getComputedStyle(t, null).getPropertyValue(e);
}
function wh(t) {
  return function() {
    delete this[t];
  };
}
function yh(t, e) {
  return function() {
    this[t] = e;
  };
}
function _h(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? delete this[t] : this[t] = n;
  };
}
function vh(t, e) {
  return arguments.length > 1 ? this.each((e == null ? wh : typeof e == "function" ? _h : yh)(t, e)) : this.node()[t];
}
function lu(t) {
  return t.trim().split(/^|\s+/);
}
function Ms(t) {
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
  for (var n = Ms(t), r = -1, i = e.length; ++r < i; ) n.add(e[r]);
}
function cu(t, e) {
  for (var n = Ms(t), r = -1, i = e.length; ++r < i; ) n.remove(e[r]);
}
function bh(t) {
  return function() {
    au(this, t);
  };
}
function xh(t) {
  return function() {
    cu(this, t);
  };
}
function Eh(t, e) {
  return function() {
    (e.apply(this, arguments) ? au : cu)(this, t);
  };
}
function kh(t, e) {
  var n = lu(t + "");
  if (arguments.length < 2) {
    for (var r = Ms(this.node()), i = -1, s = n.length; ++i < s; ) if (!r.contains(n[i])) return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? Eh : e ? bh : xh)(n, e));
}
function Sh() {
  this.textContent = "";
}
function Ph(t) {
  return function() {
    this.textContent = t;
  };
}
function Mh(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
function Nh(t) {
  return arguments.length ? this.each(t == null ? Sh : (typeof t == "function" ? Mh : Ph)(t)) : this.node().textContent;
}
function Ch() {
  this.innerHTML = "";
}
function Th(t) {
  return function() {
    this.innerHTML = t;
  };
}
function Lh(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function Rh(t) {
  return arguments.length ? this.each(t == null ? Ch : (typeof t == "function" ? Lh : Th)(t)) : this.node().innerHTML;
}
function Ih() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function $h() {
  return this.each(Ih);
}
function Oh() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Ah() {
  return this.each(Oh);
}
function Fh(t) {
  var e = typeof t == "function" ? t : eu(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function jh() {
  return null;
}
function Bh(t, e) {
  var n = typeof t == "function" ? t : eu(t), r = e == null ? jh : typeof e == "function" ? e : Ps(e);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function Dh() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function zh() {
  return this.each(Dh);
}
function Vh() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Gh() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Hh(t) {
  return this.select(t ? Gh : Vh);
}
function qh(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function Uh(t) {
  return function(e) {
    t.call(this, e, this.__data__);
  };
}
function Wh(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var n = "", r = e.indexOf(".");
    return r >= 0 && (n = e.slice(r + 1), e = e.slice(0, r)), { type: e, name: n };
  });
}
function Kh(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var n = 0, r = -1, i = e.length, s; n < i; ++n)
        s = e[n], (!t.type || s.type === t.type) && s.name === t.name ? this.removeEventListener(s.type, s.listener, s.options) : e[++r] = s;
      ++r ? e.length = r : delete this.__on;
    }
  };
}
function Xh(t, e, n) {
  return function() {
    var r = this.__on, i, s = Uh(e);
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
function Yh(t, e, n) {
  var r = Wh(t + ""), i, s = r.length, o;
  if (arguments.length < 2) {
    var l = this.node().__on;
    if (l) {
      for (var a = 0, u = l.length, c; a < u; ++a)
        for (i = 0, c = l[a]; i < s; ++i)
          if ((o = r[i]).type === c.type && o.name === c.name)
            return c.value;
    }
    return;
  }
  for (l = e ? Xh : Kh, i = 0; i < s; ++i) this.each(l(r[i], e, n));
  return this;
}
function fu(t, e, n) {
  var r = ou(t), i = r.CustomEvent;
  typeof i == "function" ? i = new i(e, n) : (i = r.document.createEvent("Event"), n ? (i.initEvent(e, n.bubbles, n.cancelable), i.detail = n.detail) : i.initEvent(e, !1, !1)), t.dispatchEvent(i);
}
function Jh(t, e) {
  return function() {
    return fu(this, t, e);
  };
}
function Qh(t, e) {
  return function() {
    return fu(this, t, e.apply(this, arguments));
  };
}
function Zh(t, e) {
  return this.each((typeof e == "function" ? Qh : Jh)(t, e));
}
function* td() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, s = r.length, o; i < s; ++i)
      (o = r[i]) && (yield o);
}
var hu = [null];
function ue(t, e) {
  this._groups = t, this._parents = e;
}
function or() {
  return new ue([[document.documentElement]], hu);
}
function ed() {
  return this;
}
ue.prototype = or.prototype = {
  constructor: ue,
  select: Mf,
  selectAll: Lf,
  selectChild: Of,
  selectChildren: Bf,
  filter: Df,
  data: Uf,
  enter: zf,
  exit: Kf,
  join: Xf,
  merge: Yf,
  selection: ed,
  order: Jf,
  sort: Qf,
  call: th,
  nodes: eh,
  node: nh,
  size: rh,
  empty: ih,
  each: sh,
  attr: hh,
  style: mh,
  property: vh,
  classed: kh,
  text: Nh,
  html: Rh,
  raise: $h,
  lower: Ah,
  append: Fh,
  insert: Bh,
  remove: zh,
  clone: Hh,
  datum: qh,
  on: Yh,
  dispatch: Zh,
  [Symbol.iterator]: td
};
function Nt(t) {
  return typeof t == "string" ? new ue([[document.querySelector(t)]], [document.documentElement]) : new ue([[t]], hu);
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
function nd(t, e) {
  return t.target && (t = du(t), e === void 0 && (e = t.currentTarget), t = t.touches || [t]), Array.from(t, (n) => Zt(n, e));
}
const rd = { passive: !1 }, Qn = { capture: !0, passive: !1 };
function Ti(t) {
  t.stopImmediatePropagation();
}
function kn(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function pu(t) {
  var e = t.document.documentElement, n = Nt(t).on("dragstart.drag", kn, Qn);
  "onselectstart" in e ? n.on("selectstart.drag", kn, Qn) : (e.__noselect = e.style.MozUserSelect, e.style.MozUserSelect = "none");
}
function gu(t, e) {
  var n = t.document.documentElement, r = Nt(t).on("dragstart.drag", null);
  e && (r.on("click.drag", kn, Qn), setTimeout(function() {
    r.on("click.drag", null);
  }, 0)), "onselectstart" in n ? r.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
const wr = (t) => () => t;
function Xi(t, {
  sourceEvent: e,
  subject: n,
  target: r,
  identifier: i,
  active: s,
  x: o,
  y: l,
  dx: a,
  dy: u,
  dispatch: c
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
    dx: { value: a, enumerable: !0, configurable: !0 },
    dy: { value: u, enumerable: !0, configurable: !0 },
    _: { value: c }
  });
}
Xi.prototype.on = function() {
  var t = this._.on.apply(this._, arguments);
  return t === this._ ? this : t;
};
function id(t) {
  return !t.ctrlKey && !t.button;
}
function sd() {
  return this.parentNode;
}
function od(t, e) {
  return e ?? { x: t.x, y: t.y };
}
function ld() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function ud() {
  var t = id, e = sd, n = od, r = ld, i = {}, s = sr("start", "drag", "end"), o = 0, l, a, u, c, f = 0;
  function h(_) {
    _.on("mousedown.drag", p).filter(r).on("touchstart.drag", w).on("touchmove.drag", d, rd).on("touchend.drag touchcancel.drag", P).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function p(_, S) {
    if (!(c || !t.call(this, _, S))) {
      var R = T(this, e.call(this, _, S), _, S, "mouse");
      R && (Nt(_.view).on("mousemove.drag", g, Qn).on("mouseup.drag", y, Qn), pu(_.view), Ti(_), u = !1, l = _.clientX, a = _.clientY, R("start", _));
    }
  }
  function g(_) {
    if (kn(_), !u) {
      var S = _.clientX - l, R = _.clientY - a;
      u = S * S + R * R > f;
    }
    i.mouse("drag", _);
  }
  function y(_) {
    Nt(_.view).on("mousemove.drag mouseup.drag", null), gu(_.view, u), kn(_), i.mouse("end", _);
  }
  function w(_, S) {
    if (t.call(this, _, S)) {
      var R = _.changedTouches, D = e.call(this, _, S), H = R.length, Z, B;
      for (Z = 0; Z < H; ++Z)
        (B = T(this, D, _, S, R[Z].identifier, R[Z])) && (Ti(_), B("start", _, R[Z]));
    }
  }
  function d(_) {
    var S = _.changedTouches, R = S.length, D, H;
    for (D = 0; D < R; ++D)
      (H = i[S[D].identifier]) && (kn(_), H("drag", _, S[D]));
  }
  function P(_) {
    var S = _.changedTouches, R = S.length, D, H;
    for (c && clearTimeout(c), c = setTimeout(function() {
      c = null;
    }, 500), D = 0; D < R; ++D)
      (H = i[S[D].identifier]) && (Ti(_), H("end", _, S[D]));
  }
  function T(_, S, R, D, H, Z) {
    var B = s.copy(), Q = Zt(Z || R, S), ut, K, x;
    if ((x = n.call(_, new Xi("beforestart", {
      sourceEvent: R,
      target: h,
      identifier: H,
      active: o,
      x: Q[0],
      y: Q[1],
      dx: 0,
      dy: 0,
      dispatch: B
    }), D)) != null)
      return ut = x.x - Q[0] || 0, K = x.y - Q[1] || 0, function z(N, F, $) {
        var X = Q, Y;
        switch (N) {
          case "start":
            i[H] = z, Y = o++;
            break;
          case "end":
            delete i[H], --o;
          case "drag":
            Q = Zt($ || F, S), Y = o;
            break;
        }
        B.call(
          N,
          _,
          new Xi(N, {
            sourceEvent: F,
            subject: x,
            target: h,
            identifier: H,
            active: Y,
            x: Q[0] + ut,
            y: Q[1] + K,
            dx: Q[0] - X[0],
            dy: Q[1] - X[1],
            dispatch: B
          }),
          D
        );
      };
  }
  return h.filter = function(_) {
    return arguments.length ? (t = typeof _ == "function" ? _ : wr(!!_), h) : t;
  }, h.container = function(_) {
    return arguments.length ? (e = typeof _ == "function" ? _ : wr(_), h) : e;
  }, h.subject = function(_) {
    return arguments.length ? (n = typeof _ == "function" ? _ : wr(_), h) : n;
  }, h.touchable = function(_) {
    return arguments.length ? (r = typeof _ == "function" ? _ : wr(!!_), h) : r;
  }, h.on = function() {
    var _ = s.on.apply(s, arguments);
    return _ === s ? h : _;
  }, h.clickDistance = function(_) {
    return arguments.length ? (f = (_ = +_) * _, h) : Math.sqrt(f);
  }, h;
}
function Ns(t, e, n) {
  t.prototype = e.prototype = n, n.constructor = t;
}
function mu(t, e) {
  var n = Object.create(t.prototype);
  for (var r in e) n[r] = e[r];
  return n;
}
function lr() {
}
var Zn = 0.7, Ur = 1 / Zn, Sn = "\\s*([+-]?\\d+)\\s*", tr = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Me = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", ad = /^#([0-9a-f]{3,8})$/, cd = new RegExp(`^rgb\\(${Sn},${Sn},${Sn}\\)$`), fd = new RegExp(`^rgb\\(${Me},${Me},${Me}\\)$`), hd = new RegExp(`^rgba\\(${Sn},${Sn},${Sn},${tr}\\)$`), dd = new RegExp(`^rgba\\(${Me},${Me},${Me},${tr}\\)$`), pd = new RegExp(`^hsl\\(${tr},${Me},${Me}\\)$`), gd = new RegExp(`^hsla\\(${tr},${Me},${Me},${tr}\\)$`), No = {
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
Ns(lr, fn, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Co,
  // Deprecated! Use color.formatHex.
  formatHex: Co,
  formatHex8: md,
  formatHsl: wd,
  formatRgb: To,
  toString: To
});
function Co() {
  return this.rgb().formatHex();
}
function md() {
  return this.rgb().formatHex8();
}
function wd() {
  return wu(this).formatHsl();
}
function To() {
  return this.rgb().formatRgb();
}
function fn(t) {
  var e, n;
  return t = (t + "").trim().toLowerCase(), (e = ad.exec(t)) ? (n = e[1].length, e = parseInt(e[1], 16), n === 6 ? Lo(e) : n === 3 ? new te(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : n === 8 ? yr(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : n === 4 ? yr(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = cd.exec(t)) ? new te(e[1], e[2], e[3], 1) : (e = fd.exec(t)) ? new te(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = hd.exec(t)) ? yr(e[1], e[2], e[3], e[4]) : (e = dd.exec(t)) ? yr(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = pd.exec(t)) ? $o(e[1], e[2] / 100, e[3] / 100, 1) : (e = gd.exec(t)) ? $o(e[1], e[2] / 100, e[3] / 100, e[4]) : No.hasOwnProperty(t) ? Lo(No[t]) : t === "transparent" ? new te(NaN, NaN, NaN, 0) : null;
}
function Lo(t) {
  return new te(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function yr(t, e, n, r) {
  return r <= 0 && (t = e = n = NaN), new te(t, e, n, r);
}
function yd(t) {
  return t instanceof lr || (t = fn(t)), t ? (t = t.rgb(), new te(t.r, t.g, t.b, t.opacity)) : new te();
}
function Yi(t, e, n, r) {
  return arguments.length === 1 ? yd(t) : new te(t, e, n, r ?? 1);
}
function te(t, e, n, r) {
  this.r = +t, this.g = +e, this.b = +n, this.opacity = +r;
}
Ns(te, Yi, mu(lr, {
  brighter(t) {
    return t = t == null ? Ur : Math.pow(Ur, t), new te(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Zn : Math.pow(Zn, t), new te(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new te(cn(this.r), cn(this.g), cn(this.b), Wr(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Ro,
  // Deprecated! Use color.formatHex.
  formatHex: Ro,
  formatHex8: _d,
  formatRgb: Io,
  toString: Io
}));
function Ro() {
  return `#${ln(this.r)}${ln(this.g)}${ln(this.b)}`;
}
function _d() {
  return `#${ln(this.r)}${ln(this.g)}${ln(this.b)}${ln((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Io() {
  const t = Wr(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${cn(this.r)}, ${cn(this.g)}, ${cn(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function Wr(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function cn(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function ln(t) {
  return t = cn(t), (t < 16 ? "0" : "") + t.toString(16);
}
function $o(t, e, n, r) {
  return r <= 0 ? t = e = n = NaN : n <= 0 || n >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new me(t, e, n, r);
}
function wu(t) {
  if (t instanceof me) return new me(t.h, t.s, t.l, t.opacity);
  if (t instanceof lr || (t = fn(t)), !t) return new me();
  if (t instanceof me) return t;
  t = t.rgb();
  var e = t.r / 255, n = t.g / 255, r = t.b / 255, i = Math.min(e, n, r), s = Math.max(e, n, r), o = NaN, l = s - i, a = (s + i) / 2;
  return l ? (e === s ? o = (n - r) / l + (n < r) * 6 : n === s ? o = (r - e) / l + 2 : o = (e - n) / l + 4, l /= a < 0.5 ? s + i : 2 - s - i, o *= 60) : l = a > 0 && a < 1 ? 0 : o, new me(o, l, a, t.opacity);
}
function vd(t, e, n, r) {
  return arguments.length === 1 ? wu(t) : new me(t, e, n, r ?? 1);
}
function me(t, e, n, r) {
  this.h = +t, this.s = +e, this.l = +n, this.opacity = +r;
}
Ns(me, vd, mu(lr, {
  brighter(t) {
    return t = t == null ? Ur : Math.pow(Ur, t), new me(this.h, this.s, this.l * t, this.opacity);
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
    return new me(Oo(this.h), _r(this.s), _r(this.l), Wr(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = Wr(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${Oo(this.h)}, ${_r(this.s) * 100}%, ${_r(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function Oo(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function _r(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function Li(t, e, n) {
  return (t < 60 ? e + (n - e) * t / 60 : t < 180 ? n : t < 240 ? e + (n - e) * (240 - t) / 60 : e) * 255;
}
const Cs = (t) => () => t;
function bd(t, e) {
  return function(n) {
    return t + n * e;
  };
}
function xd(t, e, n) {
  return t = Math.pow(t, n), e = Math.pow(e, n) - t, n = 1 / n, function(r) {
    return Math.pow(t + r * e, n);
  };
}
function Ed(t) {
  return (t = +t) == 1 ? yu : function(e, n) {
    return n - e ? xd(e, n, t) : Cs(isNaN(e) ? n : e);
  };
}
function yu(t, e) {
  var n = e - t;
  return n ? bd(t, n) : Cs(isNaN(t) ? e : t);
}
const Kr = function t(e) {
  var n = Ed(e);
  function r(i, s) {
    var o = n((i = Yi(i)).r, (s = Yi(s)).r), l = n(i.g, s.g), a = n(i.b, s.b), u = yu(i.opacity, s.opacity);
    return function(c) {
      return i.r = o(c), i.g = l(c), i.b = a(c), i.opacity = u(c), i + "";
    };
  }
  return r.gamma = t, r;
}(1);
function kd(t, e) {
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
function Pd(t, e) {
  var n = e ? e.length : 0, r = t ? Math.min(n, t.length) : 0, i = new Array(r), s = new Array(n), o;
  for (o = 0; o < r; ++o) i[o] = Ts(t[o], e[o]);
  for (; o < n; ++o) s[o] = e[o];
  return function(l) {
    for (o = 0; o < r; ++o) s[o] = i[o](l);
    return s;
  };
}
function Md(t, e) {
  var n = /* @__PURE__ */ new Date();
  return t = +t, e = +e, function(r) {
    return n.setTime(t * (1 - r) + e * r), n;
  };
}
function ke(t, e) {
  return t = +t, e = +e, function(n) {
    return t * (1 - n) + e * n;
  };
}
function Nd(t, e) {
  var n = {}, r = {}, i;
  (t === null || typeof t != "object") && (t = {}), (e === null || typeof e != "object") && (e = {});
  for (i in e)
    i in t ? n[i] = Ts(t[i], e[i]) : r[i] = e[i];
  return function(s) {
    for (i in n) r[i] = n[i](s);
    return r;
  };
}
var Ji = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Ri = new RegExp(Ji.source, "g");
function Cd(t) {
  return function() {
    return t;
  };
}
function Td(t) {
  return function(e) {
    return t(e) + "";
  };
}
function _u(t, e) {
  var n = Ji.lastIndex = Ri.lastIndex = 0, r, i, s, o = -1, l = [], a = [];
  for (t = t + "", e = e + ""; (r = Ji.exec(t)) && (i = Ri.exec(e)); )
    (s = i.index) > n && (s = e.slice(n, s), l[o] ? l[o] += s : l[++o] = s), (r = r[0]) === (i = i[0]) ? l[o] ? l[o] += i : l[++o] = i : (l[++o] = null, a.push({ i: o, x: ke(r, i) })), n = Ri.lastIndex;
  return n < e.length && (s = e.slice(n), l[o] ? l[o] += s : l[++o] = s), l.length < 2 ? a[0] ? Td(a[0].x) : Cd(e) : (e = a.length, function(u) {
    for (var c = 0, f; c < e; ++c) l[(f = a[c]).i] = f.x(u);
    return l.join("");
  });
}
function Ts(t, e) {
  var n = typeof e, r;
  return e == null || n === "boolean" ? Cs(e) : (n === "number" ? ke : n === "string" ? (r = fn(e)) ? (e = r, Kr) : _u : e instanceof fn ? Kr : e instanceof Date ? Md : Sd(e) ? kd : Array.isArray(e) ? Pd : typeof e.valueOf != "function" && typeof e.toString != "function" || isNaN(e) ? Nd : ke)(t, e);
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
  var o, l, a;
  return (o = Math.sqrt(t * t + e * e)) && (t /= o, e /= o), (a = t * n + e * r) && (n -= t * a, r -= e * a), (l = Math.sqrt(n * n + r * r)) && (n /= l, r /= l, a /= l), t * r < e * n && (t = -t, e = -e, a = -a, o = -o), {
    translateX: i,
    translateY: s,
    rotate: Math.atan2(e, t) * Ao,
    skewX: Math.atan(a) * Ao,
    scaleX: o,
    scaleY: l
  };
}
var vr;
function Ld(t) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return e.isIdentity ? Qi : vu(e.a, e.b, e.c, e.d, e.e, e.f);
}
function Rd(t) {
  return t == null || (vr || (vr = document.createElementNS("http://www.w3.org/2000/svg", "g")), vr.setAttribute("transform", t), !(t = vr.transform.baseVal.consolidate())) ? Qi : (t = t.matrix, vu(t.a, t.b, t.c, t.d, t.e, t.f));
}
function bu(t, e, n, r) {
  function i(u) {
    return u.length ? u.pop() + " " : "";
  }
  function s(u, c, f, h, p, g) {
    if (u !== f || c !== h) {
      var y = p.push("translate(", null, e, null, n);
      g.push({ i: y - 4, x: ke(u, f) }, { i: y - 2, x: ke(c, h) });
    } else (f || h) && p.push("translate(" + f + e + h + n);
  }
  function o(u, c, f, h) {
    u !== c ? (u - c > 180 ? c += 360 : c - u > 180 && (u += 360), h.push({ i: f.push(i(f) + "rotate(", null, r) - 2, x: ke(u, c) })) : c && f.push(i(f) + "rotate(" + c + r);
  }
  function l(u, c, f, h) {
    u !== c ? h.push({ i: f.push(i(f) + "skewX(", null, r) - 2, x: ke(u, c) }) : c && f.push(i(f) + "skewX(" + c + r);
  }
  function a(u, c, f, h, p, g) {
    if (u !== f || c !== h) {
      var y = p.push(i(p) + "scale(", null, ",", null, ")");
      g.push({ i: y - 4, x: ke(u, f) }, { i: y - 2, x: ke(c, h) });
    } else (f !== 1 || h !== 1) && p.push(i(p) + "scale(" + f + "," + h + ")");
  }
  return function(u, c) {
    var f = [], h = [];
    return u = t(u), c = t(c), s(u.translateX, u.translateY, c.translateX, c.translateY, f, h), o(u.rotate, c.rotate, f, h), l(u.skewX, c.skewX, f, h), a(u.scaleX, u.scaleY, c.scaleX, c.scaleY, f, h), u = c = null, function(p) {
      for (var g = -1, y = h.length, w; ++g < y; ) f[(w = h[g]).i] = w.x(p);
      return f.join("");
    };
  };
}
var Id = bu(Ld, "px, ", "px)", "deg)"), $d = bu(Rd, ", ", ")", ")"), Od = 1e-12;
function Fo(t) {
  return ((t = Math.exp(t)) + 1 / t) / 2;
}
function Ad(t) {
  return ((t = Math.exp(t)) - 1 / t) / 2;
}
function Fd(t) {
  return ((t = Math.exp(2 * t)) - 1) / (t + 1);
}
const jd = function t(e, n, r) {
  function i(s, o) {
    var l = s[0], a = s[1], u = s[2], c = o[0], f = o[1], h = o[2], p = c - l, g = f - a, y = p * p + g * g, w, d;
    if (y < Od)
      d = Math.log(h / u) / e, w = function(D) {
        return [
          l + D * p,
          a + D * g,
          u * Math.exp(e * D * d)
        ];
      };
    else {
      var P = Math.sqrt(y), T = (h * h - u * u + r * y) / (2 * u * n * P), _ = (h * h - u * u - r * y) / (2 * h * n * P), S = Math.log(Math.sqrt(T * T + 1) - T), R = Math.log(Math.sqrt(_ * _ + 1) - _);
      d = (R - S) / e, w = function(D) {
        var H = D * d, Z = Fo(S), B = u / (n * P) * (Z * Fd(e * H + S) - Ad(S));
        return [
          l + B * p,
          a + B * g,
          u * Z / Fo(e * H + S)
        ];
      };
    }
    return w.duration = d * 1e3 * e / Math.SQRT2, w;
  }
  return i.rho = function(s) {
    var o = Math.max(1e-3, +s), l = o * o, a = l * l;
    return t(o, l, a);
  }, i;
}(Math.SQRT2, 2, 4);
var Tn = 0, jn = 0, On = 0, xu = 1e3, Xr, Bn, Yr = 0, hn = 0, gi = 0, er = typeof performance == "object" && performance.now ? performance : Date, Eu = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function Ls() {
  return hn || (Eu(Bd), hn = er.now() + gi);
}
function Bd() {
  hn = 0;
}
function Jr() {
  this._call = this._time = this._next = null;
}
Jr.prototype = Rs.prototype = {
  constructor: Jr,
  restart: function(t, e, n) {
    if (typeof t != "function") throw new TypeError("callback is not a function");
    n = (n == null ? Ls() : +n) + (e == null ? 0 : +e), !this._next && Bn !== this && (Bn ? Bn._next = this : Xr = this, Bn = this), this._call = t, this._time = n, Zi();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Zi());
  }
};
function Rs(t, e, n) {
  var r = new Jr();
  return r.restart(t, e, n), r;
}
function Dd() {
  Ls(), ++Tn;
  for (var t = Xr, e; t; )
    (e = hn - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
  --Tn;
}
function jo() {
  hn = (Yr = er.now()) + gi, Tn = jn = 0;
  try {
    Dd();
  } finally {
    Tn = 0, Vd(), hn = 0;
  }
}
function zd() {
  var t = er.now(), e = t - Yr;
  e > xu && (gi -= e, Yr = t);
}
function Vd() {
  for (var t, e = Xr, n, r = 1 / 0; e; )
    e._call ? (r > e._time && (r = e._time), t = e, e = e._next) : (n = e._next, e._next = null, e = t ? t._next = n : Xr = n);
  Bn = t, Zi(r);
}
function Zi(t) {
  if (!Tn) {
    jn && (jn = clearTimeout(jn));
    var e = t - hn;
    e > 24 ? (t < 1 / 0 && (jn = setTimeout(jo, t - er.now() - gi)), On && (On = clearInterval(On))) : (On || (Yr = er.now(), On = setInterval(zd, xu)), Tn = 1, Eu(jo));
  }
}
function Bo(t, e, n) {
  var r = new Jr();
  return e = e == null ? 0 : +e, r.restart((i) => {
    r.stop(), t(i + e);
  }, e, n), r;
}
var Gd = sr("start", "end", "cancel", "interrupt"), Hd = [], ku = 0, Do = 1, ts = 2, Or = 3, zo = 4, es = 5, Ar = 6;
function mi(t, e, n, r, i, s) {
  var o = t.__transition;
  if (!o) t.__transition = {};
  else if (n in o) return;
  qd(t, n, {
    name: e,
    index: r,
    // For context during callback.
    group: i,
    // For context during callback.
    on: Gd,
    tween: Hd,
    time: s.time,
    delay: s.delay,
    duration: s.duration,
    ease: s.ease,
    timer: null,
    state: ku
  });
}
function Is(t, e) {
  var n = _e(t, e);
  if (n.state > ku) throw new Error("too late; already scheduled");
  return n;
}
function Ne(t, e) {
  var n = _e(t, e);
  if (n.state > Or) throw new Error("too late; already running");
  return n;
}
function _e(t, e) {
  var n = t.__transition;
  if (!n || !(n = n[e])) throw new Error("transition not found");
  return n;
}
function qd(t, e, n) {
  var r = t.__transition, i;
  r[e] = n, n.timer = Rs(s, 0, n.time);
  function s(u) {
    n.state = Do, n.timer.restart(o, n.delay, n.time), n.delay <= u && o(u - n.delay);
  }
  function o(u) {
    var c, f, h, p;
    if (n.state !== Do) return a();
    for (c in r)
      if (p = r[c], p.name === n.name) {
        if (p.state === Or) return Bo(o);
        p.state === zo ? (p.state = Ar, p.timer.stop(), p.on.call("interrupt", t, t.__data__, p.index, p.group), delete r[c]) : +c < e && (p.state = Ar, p.timer.stop(), p.on.call("cancel", t, t.__data__, p.index, p.group), delete r[c]);
      }
    if (Bo(function() {
      n.state === Or && (n.state = zo, n.timer.restart(l, n.delay, n.time), l(u));
    }), n.state = ts, n.on.call("start", t, t.__data__, n.index, n.group), n.state === ts) {
      for (n.state = Or, i = new Array(h = n.tween.length), c = 0, f = -1; c < h; ++c)
        (p = n.tween[c].value.call(t, t.__data__, n.index, n.group)) && (i[++f] = p);
      i.length = f + 1;
    }
  }
  function l(u) {
    for (var c = u < n.duration ? n.ease.call(null, u / n.duration) : (n.timer.restart(a), n.state = es, 1), f = -1, h = i.length; ++f < h; )
      i[f].call(t, c);
    n.state === es && (n.on.call("end", t, t.__data__, n.index, n.group), a());
  }
  function a() {
    n.state = Ar, n.timer.stop(), delete r[e];
    for (var u in r) return;
    delete t.__transition;
  }
}
function Fr(t, e) {
  var n = t.__transition, r, i, s = !0, o;
  if (n) {
    e = e == null ? null : e + "";
    for (o in n) {
      if ((r = n[o]).name !== e) {
        s = !1;
        continue;
      }
      i = r.state > ts && r.state < es, r.state = Ar, r.timer.stop(), r.on.call(i ? "interrupt" : "cancel", t, t.__data__, r.index, r.group), delete n[o];
    }
    s && delete t.__transition;
  }
}
function Ud(t) {
  return this.each(function() {
    Fr(this, t);
  });
}
function Wd(t, e) {
  var n, r;
  return function() {
    var i = Ne(this, t), s = i.tween;
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
function Kd(t, e, n) {
  var r, i;
  if (typeof n != "function") throw new Error();
  return function() {
    var s = Ne(this, t), o = s.tween;
    if (o !== r) {
      i = (r = o).slice();
      for (var l = { name: e, value: n }, a = 0, u = i.length; a < u; ++a)
        if (i[a].name === e) {
          i[a] = l;
          break;
        }
      a === u && i.push(l);
    }
    s.tween = i;
  };
}
function Xd(t, e) {
  var n = this._id;
  if (t += "", arguments.length < 2) {
    for (var r = _e(this.node(), n).tween, i = 0, s = r.length, o; i < s; ++i)
      if ((o = r[i]).name === t)
        return o.value;
    return null;
  }
  return this.each((e == null ? Wd : Kd)(n, t, e));
}
function $s(t, e, n) {
  var r = t._id;
  return t.each(function() {
    var i = Ne(this, r);
    (i.value || (i.value = {}))[e] = n.apply(this, arguments);
  }), function(i) {
    return _e(i, r).value[e];
  };
}
function Su(t, e) {
  var n;
  return (typeof e == "number" ? ke : e instanceof fn ? Kr : (n = fn(e)) ? (e = n, Kr) : _u)(t, e);
}
function Yd(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Jd(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Qd(t, e, n) {
  var r, i = n + "", s;
  return function() {
    var o = this.getAttribute(t);
    return o === i ? null : o === r ? s : s = e(r = o, n);
  };
}
function Zd(t, e, n) {
  var r, i = n + "", s;
  return function() {
    var o = this.getAttributeNS(t.space, t.local);
    return o === i ? null : o === r ? s : s = e(r = o, n);
  };
}
function tp(t, e, n) {
  var r, i, s;
  return function() {
    var o, l = n(this), a;
    return l == null ? void this.removeAttribute(t) : (o = this.getAttribute(t), a = l + "", o === a ? null : o === r && a === i ? s : (i = a, s = e(r = o, l)));
  };
}
function ep(t, e, n) {
  var r, i, s;
  return function() {
    var o, l = n(this), a;
    return l == null ? void this.removeAttributeNS(t.space, t.local) : (o = this.getAttributeNS(t.space, t.local), a = l + "", o === a ? null : o === r && a === i ? s : (i = a, s = e(r = o, l)));
  };
}
function np(t, e) {
  var n = pi(t), r = n === "transform" ? $d : Su;
  return this.attrTween(t, typeof e == "function" ? (n.local ? ep : tp)(n, r, $s(this, "attr." + t, e)) : e == null ? (n.local ? Jd : Yd)(n) : (n.local ? Zd : Qd)(n, r, e));
}
function rp(t, e) {
  return function(n) {
    this.setAttribute(t, e.call(this, n));
  };
}
function ip(t, e) {
  return function(n) {
    this.setAttributeNS(t.space, t.local, e.call(this, n));
  };
}
function sp(t, e) {
  var n, r;
  function i() {
    var s = e.apply(this, arguments);
    return s !== r && (n = (r = s) && ip(t, s)), n;
  }
  return i._value = e, i;
}
function op(t, e) {
  var n, r;
  function i() {
    var s = e.apply(this, arguments);
    return s !== r && (n = (r = s) && rp(t, s)), n;
  }
  return i._value = e, i;
}
function lp(t, e) {
  var n = "attr." + t;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (e == null) return this.tween(n, null);
  if (typeof e != "function") throw new Error();
  var r = pi(t);
  return this.tween(n, (r.local ? sp : op)(r, e));
}
function up(t, e) {
  return function() {
    Is(this, t).delay = +e.apply(this, arguments);
  };
}
function ap(t, e) {
  return e = +e, function() {
    Is(this, t).delay = e;
  };
}
function cp(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? up : ap)(e, t)) : _e(this.node(), e).delay;
}
function fp(t, e) {
  return function() {
    Ne(this, t).duration = +e.apply(this, arguments);
  };
}
function hp(t, e) {
  return e = +e, function() {
    Ne(this, t).duration = e;
  };
}
function dp(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? fp : hp)(e, t)) : _e(this.node(), e).duration;
}
function pp(t, e) {
  if (typeof e != "function") throw new Error();
  return function() {
    Ne(this, t).ease = e;
  };
}
function gp(t) {
  var e = this._id;
  return arguments.length ? this.each(pp(e, t)) : _e(this.node(), e).ease;
}
function mp(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    Ne(this, t).ease = n;
  };
}
function wp(t) {
  if (typeof t != "function") throw new Error();
  return this.each(mp(this._id, t));
}
function yp(t) {
  typeof t != "function" && (t = ru(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var s = e[i], o = s.length, l = r[i] = [], a, u = 0; u < o; ++u)
      (a = s[u]) && t.call(a, a.__data__, u, s) && l.push(a);
  return new Ie(r, this._parents, this._name, this._id);
}
function _p(t) {
  if (t._id !== this._id) throw new Error();
  for (var e = this._groups, n = t._groups, r = e.length, i = n.length, s = Math.min(r, i), o = new Array(r), l = 0; l < s; ++l)
    for (var a = e[l], u = n[l], c = a.length, f = o[l] = new Array(c), h, p = 0; p < c; ++p)
      (h = a[p] || u[p]) && (f[p] = h);
  for (; l < r; ++l)
    o[l] = e[l];
  return new Ie(o, this._parents, this._name, this._id);
}
function vp(t) {
  return (t + "").trim().split(/^|\s+/).every(function(e) {
    var n = e.indexOf(".");
    return n >= 0 && (e = e.slice(0, n)), !e || e === "start";
  });
}
function bp(t, e, n) {
  var r, i, s = vp(e) ? Is : Ne;
  return function() {
    var o = s(this, t), l = o.on;
    l !== r && (i = (r = l).copy()).on(e, n), o.on = i;
  };
}
function xp(t, e) {
  var n = this._id;
  return arguments.length < 2 ? _e(this.node(), n).on.on(t) : this.each(bp(n, t, e));
}
function Ep(t) {
  return function() {
    var e = this.parentNode;
    for (var n in this.__transition) if (+n !== t) return;
    e && e.removeChild(this);
  };
}
function kp() {
  return this.on("end.remove", Ep(this._id));
}
function Sp(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = Ps(t));
  for (var r = this._groups, i = r.length, s = new Array(i), o = 0; o < i; ++o)
    for (var l = r[o], a = l.length, u = s[o] = new Array(a), c, f, h = 0; h < a; ++h)
      (c = l[h]) && (f = t.call(c, c.__data__, h, l)) && ("__data__" in c && (f.__data__ = c.__data__), u[h] = f, mi(u[h], e, n, h, u, _e(c, n)));
  return new Ie(s, this._parents, e, n);
}
function Pp(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = nu(t));
  for (var r = this._groups, i = r.length, s = [], o = [], l = 0; l < i; ++l)
    for (var a = r[l], u = a.length, c, f = 0; f < u; ++f)
      if (c = a[f]) {
        for (var h = t.call(c, c.__data__, f, a), p, g = _e(c, n), y = 0, w = h.length; y < w; ++y)
          (p = h[y]) && mi(p, e, n, y, h, g);
        s.push(h), o.push(c);
      }
  return new Ie(s, o, e, n);
}
var Mp = or.prototype.constructor;
function Np() {
  return new Mp(this._groups, this._parents);
}
function Cp(t, e) {
  var n, r, i;
  return function() {
    var s = Cn(this, t), o = (this.style.removeProperty(t), Cn(this, t));
    return s === o ? null : s === n && o === r ? i : i = e(n = s, r = o);
  };
}
function Pu(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Tp(t, e, n) {
  var r, i = n + "", s;
  return function() {
    var o = Cn(this, t);
    return o === i ? null : o === r ? s : s = e(r = o, n);
  };
}
function Lp(t, e, n) {
  var r, i, s;
  return function() {
    var o = Cn(this, t), l = n(this), a = l + "";
    return l == null && (a = l = (this.style.removeProperty(t), Cn(this, t))), o === a ? null : o === r && a === i ? s : (i = a, s = e(r = o, l));
  };
}
function Rp(t, e) {
  var n, r, i, s = "style." + e, o = "end." + s, l;
  return function() {
    var a = Ne(this, t), u = a.on, c = a.value[s] == null ? l || (l = Pu(e)) : void 0;
    (u !== n || i !== c) && (r = (n = u).copy()).on(o, i = c), a.on = r;
  };
}
function Ip(t, e, n) {
  var r = (t += "") == "transform" ? Id : Su;
  return e == null ? this.styleTween(t, Cp(t, r)).on("end.style." + t, Pu(t)) : typeof e == "function" ? this.styleTween(t, Lp(t, r, $s(this, "style." + t, e))).each(Rp(this._id, t)) : this.styleTween(t, Tp(t, r, e), n).on("end.style." + t, null);
}
function $p(t, e, n) {
  return function(r) {
    this.style.setProperty(t, e.call(this, r), n);
  };
}
function Op(t, e, n) {
  var r, i;
  function s() {
    var o = e.apply(this, arguments);
    return o !== i && (r = (i = o) && $p(t, o, n)), r;
  }
  return s._value = e, s;
}
function Ap(t, e, n) {
  var r = "style." + (t += "");
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (e == null) return this.tween(r, null);
  if (typeof e != "function") throw new Error();
  return this.tween(r, Op(t, e, n ?? ""));
}
function Fp(t) {
  return function() {
    this.textContent = t;
  };
}
function jp(t) {
  return function() {
    var e = t(this);
    this.textContent = e ?? "";
  };
}
function Bp(t) {
  return this.tween("text", typeof t == "function" ? jp($s(this, "text", t)) : Fp(t == null ? "" : t + ""));
}
function Dp(t) {
  return function(e) {
    this.textContent = t.call(this, e);
  };
}
function zp(t) {
  var e, n;
  function r() {
    var i = t.apply(this, arguments);
    return i !== n && (e = (n = i) && Dp(i)), e;
  }
  return r._value = t, r;
}
function Vp(t) {
  var e = "text";
  if (arguments.length < 1) return (e = this.tween(e)) && e._value;
  if (t == null) return this.tween(e, null);
  if (typeof t != "function") throw new Error();
  return this.tween(e, zp(t));
}
function Gp() {
  for (var t = this._name, e = this._id, n = Mu(), r = this._groups, i = r.length, s = 0; s < i; ++s)
    for (var o = r[s], l = o.length, a, u = 0; u < l; ++u)
      if (a = o[u]) {
        var c = _e(a, e);
        mi(a, t, n, u, o, {
          time: c.time + c.delay + c.duration,
          delay: 0,
          duration: c.duration,
          ease: c.ease
        });
      }
  return new Ie(r, this._parents, t, n);
}
function Hp() {
  var t, e, n = this, r = n._id, i = n.size();
  return new Promise(function(s, o) {
    var l = { value: o }, a = { value: function() {
      --i === 0 && s();
    } };
    n.each(function() {
      var u = Ne(this, r), c = u.on;
      c !== t && (e = (t = c).copy(), e._.cancel.push(l), e._.interrupt.push(l), e._.end.push(a)), u.on = e;
    }), i === 0 && s();
  });
}
var qp = 0;
function Ie(t, e, n, r) {
  this._groups = t, this._parents = e, this._name = n, this._id = r;
}
function Mu() {
  return ++qp;
}
var Ce = or.prototype;
Ie.prototype = {
  constructor: Ie,
  select: Sp,
  selectAll: Pp,
  selectChild: Ce.selectChild,
  selectChildren: Ce.selectChildren,
  filter: yp,
  merge: _p,
  selection: Np,
  transition: Gp,
  call: Ce.call,
  nodes: Ce.nodes,
  node: Ce.node,
  size: Ce.size,
  empty: Ce.empty,
  each: Ce.each,
  on: xp,
  attr: np,
  attrTween: lp,
  style: Ip,
  styleTween: Ap,
  text: Bp,
  textTween: Vp,
  remove: kp,
  tween: Xd,
  delay: cp,
  duration: dp,
  ease: gp,
  easeVarying: wp,
  end: Hp,
  [Symbol.iterator]: Ce[Symbol.iterator]
};
const Vo = (t) => +t;
function Up(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var Wp = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Up
};
function Kp(t, e) {
  for (var n; !(n = t.__transition) || !(n = n[e]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${e} not found`);
  return n;
}
function Xp(t) {
  var e, n;
  t instanceof Ie ? (e = t._id, t = t._name) : (e = Mu(), (n = Wp).time = Ls(), t = t == null ? null : t + "");
  for (var r = this._groups, i = r.length, s = 0; s < i; ++s)
    for (var o = r[s], l = o.length, a, u = 0; u < l; ++u)
      (a = o[u]) && mi(a, t, e, u, o, n || Kp(a, e));
  return new Ie(r, this._parents, t, e);
}
or.prototype.interrupt = Ud;
or.prototype.transition = Xp;
const ns = Math.PI, rs = 2 * ns, nn = 1e-6, Yp = rs - nn;
function Nu(t) {
  this._ += t[0];
  for (let e = 1, n = t.length; e < n; ++e)
    this._ += arguments[e] + t[e];
}
function Jp(t) {
  let e = Math.floor(t);
  if (!(e >= 0)) throw new Error(`invalid digits: ${t}`);
  if (e > 15) return Nu;
  const n = 10 ** e;
  return function(r) {
    this._ += r[0];
    for (let i = 1, s = r.length; i < s; ++i)
      this._ += Math.round(arguments[i] * n) / n + r[i];
  };
}
class Qp {
  constructor(e) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null, this._ = "", this._append = e == null ? Nu : Jp(e);
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
    let o = this._x1, l = this._y1, a = r - e, u = i - n, c = o - e, f = l - n, h = c * c + f * f;
    if (this._x1 === null)
      this._append`M${this._x1 = e},${this._y1 = n}`;
    else if (h > nn) if (!(Math.abs(f * a - u * c) > nn) || !s)
      this._append`L${this._x1 = e},${this._y1 = n}`;
    else {
      let p = r - o, g = i - l, y = a * a + u * u, w = p * p + g * g, d = Math.sqrt(y), P = Math.sqrt(h), T = s * Math.tan((ns - Math.acos((y + h - w) / (2 * d * P))) / 2), _ = T / P, S = T / d;
      Math.abs(_ - 1) > nn && this._append`L${e + _ * c},${n + _ * f}`, this._append`A${s},${s},0,0,${+(f * p > c * g)},${this._x1 = e + S * a},${this._y1 = n + S * u}`;
    }
  }
  arc(e, n, r, i, s, o) {
    if (e = +e, n = +n, r = +r, o = !!o, r < 0) throw new Error(`negative radius: ${r}`);
    let l = r * Math.cos(i), a = r * Math.sin(i), u = e + l, c = n + a, f = 1 ^ o, h = o ? i - s : s - i;
    this._x1 === null ? this._append`M${u},${c}` : (Math.abs(this._x1 - u) > nn || Math.abs(this._y1 - c) > nn) && this._append`L${u},${c}`, r && (h < 0 && (h = h % rs + rs), h > Yp ? this._append`A${r},${r},0,1,${f},${e - l},${n - a}A${r},${r},0,1,${f},${this._x1 = u},${this._y1 = c}` : h > nn && this._append`A${r},${r},0,${+(h >= ns)},${f},${this._x1 = e + r * Math.cos(s)},${this._y1 = n + r * Math.sin(s)}`);
  }
  rect(e, n, r, i) {
    this._append`M${this._x0 = this._x1 = +e},${this._y0 = this._y1 = +n}h${r = +r}v${+i}h${-r}Z`;
  }
  toString() {
    return this._;
  }
}
function Zp(t) {
  const e = +this._x.call(null, t), n = +this._y.call(null, t);
  return Cu(this.cover(e, n), e, n, t);
}
function Cu(t, e, n, r) {
  if (isNaN(e) || isNaN(n)) return t;
  var i, s = t._root, o = { data: r }, l = t._x0, a = t._y0, u = t._x1, c = t._y1, f, h, p, g, y, w, d, P;
  if (!s) return t._root = o, t;
  for (; s.length; )
    if ((y = e >= (f = (l + u) / 2)) ? l = f : u = f, (w = n >= (h = (a + c) / 2)) ? a = h : c = h, i = s, !(s = s[d = w << 1 | y])) return i[d] = o, t;
  if (p = +t._x.call(null, s.data), g = +t._y.call(null, s.data), e === p && n === g) return o.next = s, i ? i[d] = o : t._root = o, t;
  do
    i = i ? i[d] = new Array(4) : t._root = new Array(4), (y = e >= (f = (l + u) / 2)) ? l = f : u = f, (w = n >= (h = (a + c) / 2)) ? a = h : c = h;
  while ((d = w << 1 | y) === (P = (g >= h) << 1 | p >= f));
  return i[P] = s, i[d] = o, t;
}
function tg(t) {
  var e, n, r = t.length, i, s, o = new Array(r), l = new Array(r), a = 1 / 0, u = 1 / 0, c = -1 / 0, f = -1 / 0;
  for (n = 0; n < r; ++n)
    isNaN(i = +this._x.call(null, e = t[n])) || isNaN(s = +this._y.call(null, e)) || (o[n] = i, l[n] = s, i < a && (a = i), i > c && (c = i), s < u && (u = s), s > f && (f = s));
  if (a > c || u > f) return this;
  for (this.cover(a, u).cover(c, f), n = 0; n < r; ++n)
    Cu(this, o[n], l[n], t[n]);
  return this;
}
function eg(t, e) {
  if (isNaN(t = +t) || isNaN(e = +e)) return this;
  var n = this._x0, r = this._y0, i = this._x1, s = this._y1;
  if (isNaN(n))
    i = (n = Math.floor(t)) + 1, s = (r = Math.floor(e)) + 1;
  else {
    for (var o = i - n || 1, l = this._root, a, u; n > t || t >= i || r > e || e >= s; )
      switch (u = (e < r) << 1 | t < n, a = new Array(4), a[u] = l, l = a, o *= 2, u) {
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
function ng() {
  var t = [];
  return this.visit(function(e) {
    if (!e.length) do
      t.push(e.data);
    while (e = e.next);
  }), t;
}
function rg(t) {
  return arguments.length ? this.cover(+t[0][0], +t[0][1]).cover(+t[1][0], +t[1][1]) : isNaN(this._x0) ? void 0 : [[this._x0, this._y0], [this._x1, this._y1]];
}
function Ht(t, e, n, r, i) {
  this.node = t, this.x0 = e, this.y0 = n, this.x1 = r, this.y1 = i;
}
function ig(t, e, n) {
  var r, i = this._x0, s = this._y0, o, l, a, u, c = this._x1, f = this._y1, h = [], p = this._root, g, y;
  for (p && h.push(new Ht(p, i, s, c, f)), n == null ? n = 1 / 0 : (i = t - n, s = e - n, c = t + n, f = e + n, n *= n); g = h.pop(); )
    if (!(!(p = g.node) || (o = g.x0) > c || (l = g.y0) > f || (a = g.x1) < i || (u = g.y1) < s))
      if (p.length) {
        var w = (o + a) / 2, d = (l + u) / 2;
        h.push(
          new Ht(p[3], w, d, a, u),
          new Ht(p[2], o, d, w, u),
          new Ht(p[1], w, l, a, d),
          new Ht(p[0], o, l, w, d)
        ), (y = (e >= d) << 1 | t >= w) && (g = h[h.length - 1], h[h.length - 1] = h[h.length - 1 - y], h[h.length - 1 - y] = g);
      } else {
        var P = t - +this._x.call(null, p.data), T = e - +this._y.call(null, p.data), _ = P * P + T * T;
        if (_ < n) {
          var S = Math.sqrt(n = _);
          i = t - S, s = e - S, c = t + S, f = e + S, r = p.data;
        }
      }
  return r;
}
function sg(t) {
  if (isNaN(c = +this._x.call(null, t)) || isNaN(f = +this._y.call(null, t))) return this;
  var e, n = this._root, r, i, s, o = this._x0, l = this._y0, a = this._x1, u = this._y1, c, f, h, p, g, y, w, d;
  if (!n) return this;
  if (n.length) for (; ; ) {
    if ((g = c >= (h = (o + a) / 2)) ? o = h : a = h, (y = f >= (p = (l + u) / 2)) ? l = p : u = p, e = n, !(n = n[w = y << 1 | g])) return this;
    if (!n.length) break;
    (e[w + 1 & 3] || e[w + 2 & 3] || e[w + 3 & 3]) && (r = e, d = w);
  }
  for (; n.data !== t; ) if (i = n, !(n = n.next)) return this;
  return (s = n.next) && delete n.next, i ? (s ? i.next = s : delete i.next, this) : e ? (s ? e[w] = s : delete e[w], (n = e[0] || e[1] || e[2] || e[3]) && n === (e[3] || e[2] || e[1] || e[0]) && !n.length && (r ? r[d] = n : this._root = n), this) : (this._root = s, this);
}
function og(t) {
  for (var e = 0, n = t.length; e < n; ++e) this.remove(t[e]);
  return this;
}
function lg() {
  return this._root;
}
function ug() {
  var t = 0;
  return this.visit(function(e) {
    if (!e.length) do
      ++t;
    while (e = e.next);
  }), t;
}
function ag(t) {
  var e = [], n, r = this._root, i, s, o, l, a;
  for (r && e.push(new Ht(r, this._x0, this._y0, this._x1, this._y1)); n = e.pop(); )
    if (!t(r = n.node, s = n.x0, o = n.y0, l = n.x1, a = n.y1) && r.length) {
      var u = (s + l) / 2, c = (o + a) / 2;
      (i = r[3]) && e.push(new Ht(i, u, c, l, a)), (i = r[2]) && e.push(new Ht(i, s, c, u, a)), (i = r[1]) && e.push(new Ht(i, u, o, l, c)), (i = r[0]) && e.push(new Ht(i, s, o, u, c));
    }
  return this;
}
function cg(t) {
  var e = [], n = [], r;
  for (this._root && e.push(new Ht(this._root, this._x0, this._y0, this._x1, this._y1)); r = e.pop(); ) {
    var i = r.node;
    if (i.length) {
      var s, o = r.x0, l = r.y0, a = r.x1, u = r.y1, c = (o + a) / 2, f = (l + u) / 2;
      (s = i[0]) && e.push(new Ht(s, o, l, c, f)), (s = i[1]) && e.push(new Ht(s, c, l, a, f)), (s = i[2]) && e.push(new Ht(s, o, f, c, u)), (s = i[3]) && e.push(new Ht(s, c, f, a, u));
    }
    n.push(r);
  }
  for (; r = n.pop(); )
    t(r.node, r.x0, r.y0, r.x1, r.y1);
  return this;
}
function fg(t) {
  return t[0];
}
function hg(t) {
  return arguments.length ? (this._x = t, this) : this._x;
}
function dg(t) {
  return t[1];
}
function pg(t) {
  return arguments.length ? (this._y = t, this) : this._y;
}
function Os(t, e, n) {
  var r = new As(e ?? fg, n ?? dg, NaN, NaN, NaN, NaN);
  return t == null ? r : r.addAll(t);
}
function As(t, e, n, r, i, s) {
  this._x = t, this._y = e, this._x0 = n, this._y0 = r, this._x1 = i, this._y1 = s, this._root = void 0;
}
function Go(t) {
  for (var e = { data: t.data }, n = e; t = t.next; ) n = n.next = { data: t.data };
  return e;
}
var Wt = Os.prototype = As.prototype;
Wt.copy = function() {
  var t = new As(this._x, this._y, this._x0, this._y0, this._x1, this._y1), e = this._root, n, r;
  if (!e) return t;
  if (!e.length) return t._root = Go(e), t;
  for (n = [{ source: e, target: t._root = new Array(4) }]; e = n.pop(); )
    for (var i = 0; i < 4; ++i)
      (r = e.source[i]) && (r.length ? n.push({ source: r, target: e.target[i] = new Array(4) }) : e.target[i] = Go(r));
  return t;
};
Wt.add = Zp;
Wt.addAll = tg;
Wt.cover = eg;
Wt.data = ng;
Wt.extent = rg;
Wt.find = ig;
Wt.remove = sg;
Wt.removeAll = og;
Wt.root = lg;
Wt.size = ug;
Wt.visit = ag;
Wt.visitAfter = cg;
Wt.x = hg;
Wt.y = pg;
function Ut(t) {
  return function() {
    return t;
  };
}
function qe(t) {
  return (t() - 0.5) * 1e-6;
}
function gg(t) {
  return t.x + t.vx;
}
function mg(t) {
  return t.y + t.vy;
}
function wg(t) {
  var e, n, r, i = 1, s = 1;
  typeof t != "function" && (t = Ut(t == null ? 1 : +t));
  function o() {
    for (var u, c = e.length, f, h, p, g, y, w, d = 0; d < s; ++d)
      for (f = Os(e, gg, mg).visitAfter(l), u = 0; u < c; ++u)
        h = e[u], y = n[h.index], w = y * y, p = h.x + h.vx, g = h.y + h.vy, f.visit(P);
    function P(T, _, S, R, D) {
      var H = T.data, Z = T.r, B = y + Z;
      if (H) {
        if (H.index > h.index) {
          var Q = p - H.x - H.vx, ut = g - H.y - H.vy, K = Q * Q + ut * ut;
          K < B * B && (Q === 0 && (Q = qe(r), K += Q * Q), ut === 0 && (ut = qe(r), K += ut * ut), K = (B - (K = Math.sqrt(K))) / K * i, h.vx += (Q *= K) * (B = (Z *= Z) / (w + Z)), h.vy += (ut *= K) * B, H.vx -= Q * (B = 1 - B), H.vy -= ut * B);
        }
        return;
      }
      return _ > p + B || R < p - B || S > g + B || D < g - B;
    }
  }
  function l(u) {
    if (u.data) return u.r = n[u.data.index];
    for (var c = u.r = 0; c < 4; ++c)
      u[c] && u[c].r > u.r && (u.r = u[c].r);
  }
  function a() {
    if (e) {
      var u, c = e.length, f;
      for (n = new Array(c), u = 0; u < c; ++u) f = e[u], n[f.index] = +t(f, u, e);
    }
  }
  return o.initialize = function(u, c) {
    e = u, r = c, a();
  }, o.iterations = function(u) {
    return arguments.length ? (s = +u, o) : s;
  }, o.strength = function(u) {
    return arguments.length ? (i = +u, o) : i;
  }, o.radius = function(u) {
    return arguments.length ? (t = typeof u == "function" ? u : Ut(+u), a(), o) : t;
  }, o;
}
function yg(t) {
  return t.index;
}
function Ho(t, e) {
  var n = t.get(e);
  if (!n) throw new Error("node not found: " + e);
  return n;
}
function _g(t) {
  var e = yg, n = f, r, i = Ut(30), s, o, l, a, u, c = 1;
  t == null && (t = []);
  function f(w) {
    return 1 / Math.min(l[w.source.index], l[w.target.index]);
  }
  function h(w) {
    for (var d = 0, P = t.length; d < c; ++d)
      for (var T = 0, _, S, R, D, H, Z, B; T < P; ++T)
        _ = t[T], S = _.source, R = _.target, D = R.x + R.vx - S.x - S.vx || qe(u), H = R.y + R.vy - S.y - S.vy || qe(u), Z = Math.sqrt(D * D + H * H), Z = (Z - s[T]) / Z * w * r[T], D *= Z, H *= Z, R.vx -= D * (B = a[T]), R.vy -= H * B, S.vx += D * (B = 1 - B), S.vy += H * B;
  }
  function p() {
    if (o) {
      var w, d = o.length, P = t.length, T = new Map(o.map((S, R) => [e(S, R, o), S])), _;
      for (w = 0, l = new Array(d); w < P; ++w)
        _ = t[w], _.index = w, typeof _.source != "object" && (_.source = Ho(T, _.source)), typeof _.target != "object" && (_.target = Ho(T, _.target)), l[_.source.index] = (l[_.source.index] || 0) + 1, l[_.target.index] = (l[_.target.index] || 0) + 1;
      for (w = 0, a = new Array(P); w < P; ++w)
        _ = t[w], a[w] = l[_.source.index] / (l[_.source.index] + l[_.target.index]);
      r = new Array(P), g(), s = new Array(P), y();
    }
  }
  function g() {
    if (o)
      for (var w = 0, d = t.length; w < d; ++w)
        r[w] = +n(t[w], w, t);
  }
  function y() {
    if (o)
      for (var w = 0, d = t.length; w < d; ++w)
        s[w] = +i(t[w], w, t);
  }
  return h.initialize = function(w, d) {
    o = w, u = d, p();
  }, h.links = function(w) {
    return arguments.length ? (t = w, p(), h) : t;
  }, h.id = function(w) {
    return arguments.length ? (e = w, h) : e;
  }, h.iterations = function(w) {
    return arguments.length ? (c = +w, h) : c;
  }, h.strength = function(w) {
    return arguments.length ? (n = typeof w == "function" ? w : Ut(+w), g(), h) : n;
  }, h.distance = function(w) {
    return arguments.length ? (i = typeof w == "function" ? w : Ut(+w), y(), h) : i;
  }, h;
}
const vg = 1664525, bg = 1013904223, qo = 4294967296;
function xg() {
  let t = 1;
  return () => (t = (vg * t + bg) % qo) / qo;
}
function Eg(t) {
  return t.x;
}
function kg(t) {
  return t.y;
}
var Sg = 10, Pg = Math.PI * (3 - Math.sqrt(5));
function Mg(t) {
  var e, n = 1, r = 1e-3, i = 1 - Math.pow(r, 1 / 300), s = 0, o = 0.6, l = /* @__PURE__ */ new Map(), a = Rs(f), u = sr("tick", "end"), c = xg();
  t == null && (t = []);
  function f() {
    h(), u.call("tick", e), n < r && (a.stop(), u.call("end", e));
  }
  function h(y) {
    var w, d = t.length, P;
    y === void 0 && (y = 1);
    for (var T = 0; T < y; ++T)
      for (n += (s - n) * i, l.forEach(function(_) {
        _(n);
      }), w = 0; w < d; ++w)
        P = t[w], P.fx == null ? P.x += P.vx *= o : (P.x = P.fx, P.vx = 0), P.fy == null ? P.y += P.vy *= o : (P.y = P.fy, P.vy = 0);
    return e;
  }
  function p() {
    for (var y = 0, w = t.length, d; y < w; ++y) {
      if (d = t[y], d.index = y, d.fx != null && (d.x = d.fx), d.fy != null && (d.y = d.fy), isNaN(d.x) || isNaN(d.y)) {
        var P = Sg * Math.sqrt(0.5 + y), T = y * Pg;
        d.x = P * Math.cos(T), d.y = P * Math.sin(T);
      }
      (isNaN(d.vx) || isNaN(d.vy)) && (d.vx = d.vy = 0);
    }
  }
  function g(y) {
    return y.initialize && y.initialize(t, c), y;
  }
  return p(), e = {
    tick: h,
    restart: function() {
      return a.restart(f), e;
    },
    stop: function() {
      return a.stop(), e;
    },
    nodes: function(y) {
      return arguments.length ? (t = y, p(), l.forEach(g), e) : t;
    },
    alpha: function(y) {
      return arguments.length ? (n = +y, e) : n;
    },
    alphaMin: function(y) {
      return arguments.length ? (r = +y, e) : r;
    },
    alphaDecay: function(y) {
      return arguments.length ? (i = +y, e) : +i;
    },
    alphaTarget: function(y) {
      return arguments.length ? (s = +y, e) : s;
    },
    velocityDecay: function(y) {
      return arguments.length ? (o = 1 - y, e) : 1 - o;
    },
    randomSource: function(y) {
      return arguments.length ? (c = y, l.forEach(g), e) : c;
    },
    force: function(y, w) {
      return arguments.length > 1 ? (w == null ? l.delete(y) : l.set(y, g(w)), e) : l.get(y);
    },
    find: function(y, w, d) {
      var P = 0, T = t.length, _, S, R, D, H;
      for (d == null ? d = 1 / 0 : d *= d, P = 0; P < T; ++P)
        D = t[P], _ = y - D.x, S = w - D.y, R = _ * _ + S * S, R < d && (H = D, d = R);
      return H;
    },
    on: function(y, w) {
      return arguments.length > 1 ? (u.on(y, w), e) : u.on(y);
    }
  };
}
function Ng() {
  var t, e, n, r, i = Ut(-30), s, o = 1, l = 1 / 0, a = 0.81;
  function u(p) {
    var g, y = t.length, w = Os(t, Eg, kg).visitAfter(f);
    for (r = p, g = 0; g < y; ++g) e = t[g], w.visit(h);
  }
  function c() {
    if (t) {
      var p, g = t.length, y;
      for (s = new Array(g), p = 0; p < g; ++p) y = t[p], s[y.index] = +i(y, p, t);
    }
  }
  function f(p) {
    var g = 0, y, w, d = 0, P, T, _;
    if (p.length) {
      for (P = T = _ = 0; _ < 4; ++_)
        (y = p[_]) && (w = Math.abs(y.value)) && (g += y.value, d += w, P += w * y.x, T += w * y.y);
      p.x = P / d, p.y = T / d;
    } else {
      y = p, y.x = y.data.x, y.y = y.data.y;
      do
        g += s[y.data.index];
      while (y = y.next);
    }
    p.value = g;
  }
  function h(p, g, y, w) {
    if (!p.value) return !0;
    var d = p.x - e.x, P = p.y - e.y, T = w - g, _ = d * d + P * P;
    if (T * T / a < _)
      return _ < l && (d === 0 && (d = qe(n), _ += d * d), P === 0 && (P = qe(n), _ += P * P), _ < o && (_ = Math.sqrt(o * _)), e.vx += d * p.value * r / _, e.vy += P * p.value * r / _), !0;
    if (p.length || _ >= l) return;
    (p.data !== e || p.next) && (d === 0 && (d = qe(n), _ += d * d), P === 0 && (P = qe(n), _ += P * P), _ < o && (_ = Math.sqrt(o * _)));
    do
      p.data !== e && (T = s[p.data.index] * r / _, e.vx += d * T, e.vy += P * T);
    while (p = p.next);
  }
  return u.initialize = function(p, g) {
    t = p, n = g, c();
  }, u.strength = function(p) {
    return arguments.length ? (i = typeof p == "function" ? p : Ut(+p), c(), u) : i;
  }, u.distanceMin = function(p) {
    return arguments.length ? (o = p * p, u) : Math.sqrt(o);
  }, u.distanceMax = function(p) {
    return arguments.length ? (l = p * p, u) : Math.sqrt(l);
  }, u.theta = function(p) {
    return arguments.length ? (a = p * p, u) : Math.sqrt(a);
  }, u;
}
function Cg(t) {
  var e = Ut(0.1), n, r, i;
  typeof t != "function" && (t = Ut(t == null ? 0 : +t));
  function s(l) {
    for (var a = 0, u = n.length, c; a < u; ++a)
      c = n[a], c.vx += (i[a] - c.x) * r[a] * l;
  }
  function o() {
    if (n) {
      var l, a = n.length;
      for (r = new Array(a), i = new Array(a), l = 0; l < a; ++l)
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
function Tg(t) {
  var e = Ut(0.1), n, r, i;
  typeof t != "function" && (t = Ut(t == null ? 0 : +t));
  function s(l) {
    for (var a = 0, u = n.length, c; a < u; ++a)
      c = n[a], c.vy += (i[a] - c.y) * r[a] * l;
  }
  function o() {
    if (n) {
      var l, a = n.length;
      for (r = new Array(a), i = new Array(a), l = 0; l < a; ++l)
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
const Uo = Math.abs, At = Math.atan2, Ze = Math.cos, Lg = Math.max, Ii = Math.min, xe = Math.sin, _n = Math.sqrt, Yt = 1e-12, nr = Math.PI, Qr = nr / 2, Rg = 2 * nr;
function Ig(t) {
  return t > 1 ? 0 : t < -1 ? nr : Math.acos(t);
}
function Wo(t) {
  return t >= 1 ? Qr : t <= -1 ? -Qr : Math.asin(t);
}
function Tu(t) {
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
  }, () => new Qp(e);
}
function $g(t) {
  return t.innerRadius;
}
function Og(t) {
  return t.outerRadius;
}
function Ag(t) {
  return t.startAngle;
}
function Fg(t) {
  return t.endAngle;
}
function jg(t) {
  return t && t.padAngle;
}
function Bg(t, e, n, r, i, s, o, l) {
  var a = n - t, u = r - e, c = o - i, f = l - s, h = f * a - c * u;
  if (!(h * h < Yt))
    return h = (c * (e - s) - f * (t - i)) / h, [t + h * a, e + h * u];
}
function br(t, e, n, r, i, s, o) {
  var l = t - n, a = e - r, u = (o ? s : -s) / _n(l * l + a * a), c = u * a, f = -u * l, h = t + c, p = e + f, g = n + c, y = r + f, w = (h + g) / 2, d = (p + y) / 2, P = g - h, T = y - p, _ = P * P + T * T, S = i - s, R = h * y - g * p, D = (T < 0 ? -1 : 1) * _n(Lg(0, S * S * _ - R * R)), H = (R * T - P * D) / _, Z = (-R * P - T * D) / _, B = (R * T + P * D) / _, Q = (-R * P + T * D) / _, ut = H - w, K = Z - d, x = B - w, z = Q - d;
  return ut * ut + K * K > x * x + z * z && (H = B, Z = Q), {
    cx: H,
    cy: Z,
    x01: -c,
    y01: -f,
    x11: H * (i / S - 1),
    y11: Z * (i / S - 1)
  };
}
function Dg() {
  var t = $g, e = Og, n = Qt(0), r = null, i = Ag, s = Fg, o = jg, l = null, a = Tu(u);
  function u() {
    var c, f, h = +t.apply(this, arguments), p = +e.apply(this, arguments), g = i.apply(this, arguments) - Qr, y = s.apply(this, arguments) - Qr, w = Uo(y - g), d = y > g;
    if (l || (l = c = a()), p < h && (f = p, p = h, h = f), !(p > Yt)) l.moveTo(0, 0);
    else if (w > Rg - Yt)
      l.moveTo(p * Ze(g), p * xe(g)), l.arc(0, 0, p, g, y, !d), h > Yt && (l.moveTo(h * Ze(y), h * xe(y)), l.arc(0, 0, h, y, g, d));
    else {
      var P = g, T = y, _ = g, S = y, R = w, D = w, H = o.apply(this, arguments) / 2, Z = H > Yt && (r ? +r.apply(this, arguments) : _n(h * h + p * p)), B = Ii(Uo(p - h) / 2, +n.apply(this, arguments)), Q = B, ut = B, K, x;
      if (Z > Yt) {
        var z = Wo(Z / h * xe(H)), N = Wo(Z / p * xe(H));
        (R -= z * 2) > Yt ? (z *= d ? 1 : -1, _ += z, S -= z) : (R = 0, _ = S = (g + y) / 2), (D -= N * 2) > Yt ? (N *= d ? 1 : -1, P += N, T -= N) : (D = 0, P = T = (g + y) / 2);
      }
      var F = p * Ze(P), $ = p * xe(P), X = h * Ze(S), Y = h * xe(S);
      if (B > Yt) {
        var it = p * Ze(T), st = p * xe(T), Et = h * Ze(_), gt = h * xe(_), mt;
        if (w < nr)
          if (mt = Bg(F, $, Et, gt, it, st, X, Y)) {
            var wt = F - mt[0], vt = $ - mt[1], kt = it - mt[0], It = st - mt[1], jt = 1 / xe(Ig((wt * kt + vt * It) / (_n(wt * wt + vt * vt) * _n(kt * kt + It * It))) / 2), re = _n(mt[0] * mt[0] + mt[1] * mt[1]);
            Q = Ii(B, (h - re) / (jt - 1)), ut = Ii(B, (p - re) / (jt + 1));
          } else
            Q = ut = 0;
      }
      D > Yt ? ut > Yt ? (K = br(Et, gt, F, $, p, ut, d), x = br(it, st, X, Y, p, ut, d), l.moveTo(K.cx + K.x01, K.cy + K.y01), ut < B ? l.arc(K.cx, K.cy, ut, At(K.y01, K.x01), At(x.y01, x.x01), !d) : (l.arc(K.cx, K.cy, ut, At(K.y01, K.x01), At(K.y11, K.x11), !d), l.arc(0, 0, p, At(K.cy + K.y11, K.cx + K.x11), At(x.cy + x.y11, x.cx + x.x11), !d), l.arc(x.cx, x.cy, ut, At(x.y11, x.x11), At(x.y01, x.x01), !d))) : (l.moveTo(F, $), l.arc(0, 0, p, P, T, !d)) : l.moveTo(F, $), !(h > Yt) || !(R > Yt) ? l.lineTo(X, Y) : Q > Yt ? (K = br(X, Y, it, st, h, -Q, d), x = br(F, $, Et, gt, h, -Q, d), l.lineTo(K.cx + K.x01, K.cy + K.y01), Q < B ? l.arc(K.cx, K.cy, Q, At(K.y01, K.x01), At(x.y01, x.x01), !d) : (l.arc(K.cx, K.cy, Q, At(K.y01, K.x01), At(K.y11, K.x11), !d), l.arc(0, 0, h, At(K.cy + K.y11, K.cx + K.x11), At(x.cy + x.y11, x.cx + x.x11), d), l.arc(x.cx, x.cy, Q, At(x.y11, x.x11), At(x.y01, x.x01), !d))) : l.arc(0, 0, h, S, _, d);
    }
    if (l.closePath(), c) return l = null, c + "" || null;
  }
  return u.centroid = function() {
    var c = (+t.apply(this, arguments) + +e.apply(this, arguments)) / 2, f = (+i.apply(this, arguments) + +s.apply(this, arguments)) / 2 - nr / 2;
    return [Ze(f) * c, xe(f) * c];
  }, u.innerRadius = function(c) {
    return arguments.length ? (t = typeof c == "function" ? c : Qt(+c), u) : t;
  }, u.outerRadius = function(c) {
    return arguments.length ? (e = typeof c == "function" ? c : Qt(+c), u) : e;
  }, u.cornerRadius = function(c) {
    return arguments.length ? (n = typeof c == "function" ? c : Qt(+c), u) : n;
  }, u.padRadius = function(c) {
    return arguments.length ? (r = c == null ? null : typeof c == "function" ? c : Qt(+c), u) : r;
  }, u.startAngle = function(c) {
    return arguments.length ? (i = typeof c == "function" ? c : Qt(+c), u) : i;
  }, u.endAngle = function(c) {
    return arguments.length ? (s = typeof c == "function" ? c : Qt(+c), u) : s;
  }, u.padAngle = function(c) {
    return arguments.length ? (o = typeof c == "function" ? c : Qt(+c), u) : o;
  }, u.context = function(c) {
    return arguments.length ? (l = c ?? null, u) : l;
  }, u;
}
function zg(t) {
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
function Vg(t) {
  return new Lu(t);
}
function Gg(t) {
  return t[0];
}
function Hg(t) {
  return t[1];
}
function qg(t, e) {
  var n = Qt(!0), r = null, i = Vg, s = null, o = Tu(l);
  t = typeof t == "function" ? t : t === void 0 ? Gg : Qt(t), e = typeof e == "function" ? e : e === void 0 ? Hg : Qt(e);
  function l(a) {
    var u, c = (a = zg(a)).length, f, h = !1, p;
    for (r == null && (s = i(p = o())), u = 0; u <= c; ++u)
      !(u < c && n(f = a[u], u, a)) === h && ((h = !h) ? s.lineStart() : s.lineEnd()), h && s.point(+t(f, u, a), +e(f, u, a));
    if (p) return s = null, p + "" || null;
  }
  return l.x = function(a) {
    return arguments.length ? (t = typeof a == "function" ? a : Qt(+a), l) : t;
  }, l.y = function(a) {
    return arguments.length ? (e = typeof a == "function" ? a : Qt(+a), l) : e;
  }, l.defined = function(a) {
    return arguments.length ? (n = typeof a == "function" ? a : Qt(!!a), l) : n;
  }, l.curve = function(a) {
    return arguments.length ? (i = a, r != null && (s = i(r)), l) : i;
  }, l.context = function(a) {
    return arguments.length ? (a == null ? r = s = null : s = i(r = a), l) : r;
  }, l;
}
const xr = (t) => () => t;
function Ug(t, {
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
function Te(t, e, n) {
  this.k = t, this.x = e, this.y = n;
}
Te.prototype = {
  constructor: Te,
  scale: function(t) {
    return t === 1 ? this : new Te(this.k * t, this.x, this.y);
  },
  translate: function(t, e) {
    return t === 0 & e === 0 ? this : new Te(this.k, this.x + this.k * t, this.y + this.k * e);
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
var Ru = new Te(1, 0, 0);
Te.prototype;
function $i(t) {
  t.stopImmediatePropagation();
}
function An(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function Wg(t) {
  return (!t.ctrlKey || t.type === "wheel") && !t.button;
}
function Kg() {
  var t = this;
  return t instanceof SVGElement ? (t = t.ownerSVGElement || t, t.hasAttribute("viewBox") ? (t = t.viewBox.baseVal, [[t.x, t.y], [t.x + t.width, t.y + t.height]]) : [[0, 0], [t.width.baseVal.value, t.height.baseVal.value]]) : [[0, 0], [t.clientWidth, t.clientHeight]];
}
function Ko() {
  return this.__zoom || Ru;
}
function Xg(t) {
  return -t.deltaY * (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 2e-3) * (t.ctrlKey ? 10 : 1);
}
function Yg() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Jg(t, e, n) {
  var r = t.invertX(e[0][0]) - n[0][0], i = t.invertX(e[1][0]) - n[1][0], s = t.invertY(e[0][1]) - n[0][1], o = t.invertY(e[1][1]) - n[1][1];
  return t.translate(
    i > r ? (r + i) / 2 : Math.min(0, r) || Math.max(0, i),
    o > s ? (s + o) / 2 : Math.min(0, s) || Math.max(0, o)
  );
}
function Qg() {
  var t = Wg, e = Kg, n = Jg, r = Xg, i = Yg, s = [0, 1 / 0], o = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], l = 250, a = jd, u = sr("start", "zoom", "end"), c, f, h, p = 500, g = 150, y = 0, w = 10;
  function d(x) {
    x.property("__zoom", Ko).on("wheel.zoom", H, { passive: !1 }).on("mousedown.zoom", Z).on("dblclick.zoom", B).filter(i).on("touchstart.zoom", Q).on("touchmove.zoom", ut).on("touchend.zoom touchcancel.zoom", K).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  d.transform = function(x, z, N, F) {
    var $ = x.selection ? x.selection() : x;
    $.property("__zoom", Ko), x !== $ ? S(x, z, N, F) : $.interrupt().each(function() {
      R(this, arguments).event(F).start().zoom(null, typeof z == "function" ? z.apply(this, arguments) : z).end();
    });
  }, d.scaleBy = function(x, z, N, F) {
    d.scaleTo(x, function() {
      var $ = this.__zoom.k, X = typeof z == "function" ? z.apply(this, arguments) : z;
      return $ * X;
    }, N, F);
  }, d.scaleTo = function(x, z, N, F) {
    d.transform(x, function() {
      var $ = e.apply(this, arguments), X = this.__zoom, Y = N == null ? _($) : typeof N == "function" ? N.apply(this, arguments) : N, it = X.invert(Y), st = typeof z == "function" ? z.apply(this, arguments) : z;
      return n(T(P(X, st), Y, it), $, o);
    }, N, F);
  }, d.translateBy = function(x, z, N, F) {
    d.transform(x, function() {
      return n(this.__zoom.translate(
        typeof z == "function" ? z.apply(this, arguments) : z,
        typeof N == "function" ? N.apply(this, arguments) : N
      ), e.apply(this, arguments), o);
    }, null, F);
  }, d.translateTo = function(x, z, N, F, $) {
    d.transform(x, function() {
      var X = e.apply(this, arguments), Y = this.__zoom, it = F == null ? _(X) : typeof F == "function" ? F.apply(this, arguments) : F;
      return n(Ru.translate(it[0], it[1]).scale(Y.k).translate(
        typeof z == "function" ? -z.apply(this, arguments) : -z,
        typeof N == "function" ? -N.apply(this, arguments) : -N
      ), X, o);
    }, F, $);
  };
  function P(x, z) {
    return z = Math.max(s[0], Math.min(s[1], z)), z === x.k ? x : new Te(z, x.x, x.y);
  }
  function T(x, z, N) {
    var F = z[0] - N[0] * x.k, $ = z[1] - N[1] * x.k;
    return F === x.x && $ === x.y ? x : new Te(x.k, F, $);
  }
  function _(x) {
    return [(+x[0][0] + +x[1][0]) / 2, (+x[0][1] + +x[1][1]) / 2];
  }
  function S(x, z, N, F) {
    x.on("start.zoom", function() {
      R(this, arguments).event(F).start();
    }).on("interrupt.zoom end.zoom", function() {
      R(this, arguments).event(F).end();
    }).tween("zoom", function() {
      var $ = this, X = arguments, Y = R($, X).event(F), it = e.apply($, X), st = N == null ? _(it) : typeof N == "function" ? N.apply($, X) : N, Et = Math.max(it[1][0] - it[0][0], it[1][1] - it[0][1]), gt = $.__zoom, mt = typeof z == "function" ? z.apply($, X) : z, wt = a(gt.invert(st).concat(Et / gt.k), mt.invert(st).concat(Et / mt.k));
      return function(vt) {
        if (vt === 1) vt = mt;
        else {
          var kt = wt(vt), It = Et / kt[2];
          vt = new Te(It, st[0] - kt[0] * It, st[1] - kt[1] * It);
        }
        Y.zoom(null, vt);
      };
    });
  }
  function R(x, z, N) {
    return !N && x.__zooming || new D(x, z);
  }
  function D(x, z) {
    this.that = x, this.args = z, this.active = 0, this.sourceEvent = null, this.extent = e.apply(x, z), this.taps = 0;
  }
  D.prototype = {
    event: function(x) {
      return x && (this.sourceEvent = x), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(x, z) {
      return this.mouse && x !== "mouse" && (this.mouse[1] = z.invert(this.mouse[0])), this.touch0 && x !== "touch" && (this.touch0[1] = z.invert(this.touch0[0])), this.touch1 && x !== "touch" && (this.touch1[1] = z.invert(this.touch1[0])), this.that.__zoom = z, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(x) {
      var z = Nt(this.that).datum();
      u.call(
        x,
        this.that,
        new Ug(x, {
          sourceEvent: this.sourceEvent,
          target: d,
          type: x,
          transform: this.that.__zoom,
          dispatch: u
        }),
        z
      );
    }
  };
  function H(x, ...z) {
    if (!t.apply(this, arguments)) return;
    var N = R(this, z).event(x), F = this.__zoom, $ = Math.max(s[0], Math.min(s[1], F.k * Math.pow(2, r.apply(this, arguments)))), X = Zt(x);
    if (N.wheel)
      (N.mouse[0][0] !== X[0] || N.mouse[0][1] !== X[1]) && (N.mouse[1] = F.invert(N.mouse[0] = X)), clearTimeout(N.wheel);
    else {
      if (F.k === $) return;
      N.mouse = [X, F.invert(X)], Fr(this), N.start();
    }
    An(x), N.wheel = setTimeout(Y, g), N.zoom("mouse", n(T(P(F, $), N.mouse[0], N.mouse[1]), N.extent, o));
    function Y() {
      N.wheel = null, N.end();
    }
  }
  function Z(x, ...z) {
    if (h || !t.apply(this, arguments)) return;
    var N = x.currentTarget, F = R(this, z, !0).event(x), $ = Nt(x.view).on("mousemove.zoom", st, !0).on("mouseup.zoom", Et, !0), X = Zt(x, N), Y = x.clientX, it = x.clientY;
    pu(x.view), $i(x), F.mouse = [X, this.__zoom.invert(X)], Fr(this), F.start();
    function st(gt) {
      if (An(gt), !F.moved) {
        var mt = gt.clientX - Y, wt = gt.clientY - it;
        F.moved = mt * mt + wt * wt > y;
      }
      F.event(gt).zoom("mouse", n(T(F.that.__zoom, F.mouse[0] = Zt(gt, N), F.mouse[1]), F.extent, o));
    }
    function Et(gt) {
      $.on("mousemove.zoom mouseup.zoom", null), gu(gt.view, F.moved), An(gt), F.event(gt).end();
    }
  }
  function B(x, ...z) {
    if (t.apply(this, arguments)) {
      var N = this.__zoom, F = Zt(x.changedTouches ? x.changedTouches[0] : x, this), $ = N.invert(F), X = N.k * (x.shiftKey ? 0.5 : 2), Y = n(T(P(N, X), F, $), e.apply(this, z), o);
      An(x), l > 0 ? Nt(this).transition().duration(l).call(S, Y, F, x) : Nt(this).call(d.transform, Y, F, x);
    }
  }
  function Q(x, ...z) {
    if (t.apply(this, arguments)) {
      var N = x.touches, F = N.length, $ = R(this, z, x.changedTouches.length === F).event(x), X, Y, it, st;
      for ($i(x), Y = 0; Y < F; ++Y)
        it = N[Y], st = Zt(it, this), st = [st, this.__zoom.invert(st), it.identifier], $.touch0 ? !$.touch1 && $.touch0[2] !== st[2] && ($.touch1 = st, $.taps = 0) : ($.touch0 = st, X = !0, $.taps = 1 + !!c);
      c && (c = clearTimeout(c)), X && ($.taps < 2 && (f = st[0], c = setTimeout(function() {
        c = null;
      }, p)), Fr(this), $.start());
    }
  }
  function ut(x, ...z) {
    if (this.__zooming) {
      var N = R(this, z).event(x), F = x.changedTouches, $ = F.length, X, Y, it, st;
      for (An(x), X = 0; X < $; ++X)
        Y = F[X], it = Zt(Y, this), N.touch0 && N.touch0[2] === Y.identifier ? N.touch0[0] = it : N.touch1 && N.touch1[2] === Y.identifier && (N.touch1[0] = it);
      if (Y = N.that.__zoom, N.touch1) {
        var Et = N.touch0[0], gt = N.touch0[1], mt = N.touch1[0], wt = N.touch1[1], vt = (vt = mt[0] - Et[0]) * vt + (vt = mt[1] - Et[1]) * vt, kt = (kt = wt[0] - gt[0]) * kt + (kt = wt[1] - gt[1]) * kt;
        Y = P(Y, Math.sqrt(vt / kt)), it = [(Et[0] + mt[0]) / 2, (Et[1] + mt[1]) / 2], st = [(gt[0] + wt[0]) / 2, (gt[1] + wt[1]) / 2];
      } else if (N.touch0) it = N.touch0[0], st = N.touch0[1];
      else return;
      N.zoom("touch", n(T(Y, it, st), N.extent, o));
    }
  }
  function K(x, ...z) {
    if (this.__zooming) {
      var N = R(this, z).event(x), F = x.changedTouches, $ = F.length, X, Y;
      for ($i(x), h && clearTimeout(h), h = setTimeout(function() {
        h = null;
      }, p), X = 0; X < $; ++X)
        Y = F[X], N.touch0 && N.touch0[2] === Y.identifier ? delete N.touch0 : N.touch1 && N.touch1[2] === Y.identifier && delete N.touch1;
      if (N.touch1 && !N.touch0 && (N.touch0 = N.touch1, delete N.touch1), N.touch0) N.touch0[1] = this.__zoom.invert(N.touch0[0]);
      else if (N.end(), N.taps === 2 && (Y = Zt(Y, this), Math.hypot(f[0] - Y[0], f[1] - Y[1]) < w)) {
        var it = Nt(this).on("dblclick.zoom");
        it && it.apply(this, arguments);
      }
    }
  }
  return d.wheelDelta = function(x) {
    return arguments.length ? (r = typeof x == "function" ? x : xr(+x), d) : r;
  }, d.filter = function(x) {
    return arguments.length ? (t = typeof x == "function" ? x : xr(!!x), d) : t;
  }, d.touchable = function(x) {
    return arguments.length ? (i = typeof x == "function" ? x : xr(!!x), d) : i;
  }, d.extent = function(x) {
    return arguments.length ? (e = typeof x == "function" ? x : xr([[+x[0][0], +x[0][1]], [+x[1][0], +x[1][1]]]), d) : e;
  }, d.scaleExtent = function(x) {
    return arguments.length ? (s[0] = +x[0], s[1] = +x[1], d) : [s[0], s[1]];
  }, d.translateExtent = function(x) {
    return arguments.length ? (o[0][0] = +x[0][0], o[1][0] = +x[1][0], o[0][1] = +x[0][1], o[1][1] = +x[1][1], d) : [[o[0][0], o[0][1]], [o[1][0], o[1][1]]];
  }, d.constrain = function(x) {
    return arguments.length ? (n = x, d) : n;
  }, d.duration = function(x) {
    return arguments.length ? (l = +x, d) : l;
  }, d.interpolate = function(x) {
    return arguments.length ? (a = x, d) : a;
  }, d.on = function() {
    var x = u.on.apply(u, arguments);
    return x === u ? d : x;
  }, d.clickDistance = function(x) {
    return arguments.length ? (y = (x = +x) * x, d) : Math.sqrt(y);
  }, d.tapDistance = function(x) {
    return arguments.length ? (w = +x, d) : w;
  }, d;
}
function Zg(t, e) {
  let n = Qg().filter((r) => {
    var i;
    return r.button === 0 || ((i = r.touches) == null ? void 0 : i.length) >= 2;
  });
  return t0(n, t, e);
}
function t0(t, e, n) {
  return n ? t.scaleExtent([0.5, 5]).on("zoom", (r) => e(r, !0)) : t.scaleExtent([1, 1]).on("zoom", (r) => e(r, !1));
}
var rt = /* @__PURE__ */ ((t) => (t.CIRCLE = "circle", t.RECTANGLE = "rect", t))(rt || {});
class Pn {
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
  constructor(e, n, r, i, s, o, l, a, u, c, f, h) {
    _t(this, "fx");
    _t(this, "fy");
    _t(this, "_fixedPosition");
    _t(this, "_shape");
    this.id = e, this.idImported = n, this.x = r, this.y = i, this.label = s, this.color = o, this.deletable = u, this.labelEditable = c, this.allowIncomingLinks = f, this.allowOutgoingLinks = h, this.shape = l, this.fixedPosition = a;
  }
  set shape(e) {
    this._shape === rt.CIRCLE || this._shape === rt.RECTANGLE ? this._shape = e : this._shape = void 0;
  }
  get shape() {
    return this._shape === rt.CIRCLE || this._shape === rt.RECTANGLE ? this._shape : void 0;
  }
  set fixedPosition(e) {
    var n, r;
    this._fixedPosition = e, this.fx = (n = this.fixedPosition) != null && n.x ? this.x : void 0, this.fy = (r = this.fixedPosition) != null && r.y ? this.y : void 0;
  }
  get fixedPosition() {
    return this._fixedPosition;
  }
}
function e0(t, e) {
  const n = new CustomEvent("nodecreated", {
    detail: {
      node: { id: t.id, label: t.label, x: t.x, y: t.y }
    }
  });
  e.node().dispatchEvent(n);
}
function n0(t, e) {
  const n = new CustomEvent("linkcreated", {
    detail: {
      link: { id: t.id, label: t.label }
    }
  });
  e.node().dispatchEvent(n);
}
function r0(t, e, n) {
  const r = new CustomEvent("nodeclicked", {
    detail: {
      node: { id: t.id, label: t.label, x: t.x, y: t.y },
      button: e
    }
  });
  n.node().dispatchEvent(r);
}
function i0(t, e, n) {
  const r = new CustomEvent("linkclicked", {
    detail: {
      link: { id: t.id, label: t.label },
      button: e
    }
  });
  n.node().dispatchEvent(r);
}
function Er(t, e) {
  const n = new CustomEvent("nodedeleted", {
    detail: {
      node: { id: t.id, label: t.label, x: t.x, y: t.y }
    }
  });
  e.node().dispatchEvent(n);
}
function tn(t, e) {
  const n = new CustomEvent("linkdeleted", {
    detail: {
      link: { id: t.id, label: t.label }
    }
  });
  e.node().dispatchEvent(n);
}
function s0(t, e, n) {
  const r = new CustomEvent("labeledited", {
    detail: {
      parent: { id: t.id },
      label: e
    }
  });
  n.node().dispatchEvent(r);
}
function ie(t) {
  t.preventDefault(), t.stopPropagation();
}
function o0(t, e, n, r) {
  return ud().filter(
    (i, s) => {
      var o, l;
      return i.button === 0 && //left mouse click
      (((o = s.fixedPosition) == null ? void 0 : o.x) !== !0 || ((l = s.fixedPosition) == null ? void 0 : l.y) !== !0);
    }
  ).on("start", (i, s) => {
    var o, l;
    ie(i.sourceEvent), i.active === 0 && t.alphaTarget(0.5).restart(), ((o = s.fixedPosition) == null ? void 0 : o.x) !== !0 && (s.fx = s.x), ((l = s.fixedPosition) == null ? void 0 : l.y) !== !0 && (s.fy = s.y);
  }).on("drag", (i, s) => {
    var o, l;
    ((o = s.fixedPosition) == null ? void 0 : o.x) !== !0 && (r.shape === rt.CIRCLE ? s.fx = Math.max(r.radius, Math.min(e - r.radius, i.x)) : r.shape === rt.RECTANGLE && (s.fx = Math.max(0, Math.min(e - r.width, i.x)))), ((l = s.fixedPosition) == null ? void 0 : l.y) !== !0 && (r.shape === rt.CIRCLE ? s.fy = Math.max(r.radius, Math.min(n - r.radius, i.y)) : r.shape === rt.RECTANGLE && (s.fy = Math.max(0, Math.min(n - r.height, i.y))));
  }).on("end", (i, s) => {
    var o, l;
    i.active === 0 && t.alphaTarget(0), ((o = s.fixedPosition) == null ? void 0 : o.x) !== !0 && (s.fx = void 0), ((l = s.fixedPosition) == null ? void 0 : l.y) !== !0 && (s.fy = void 0);
  });
}
function l0(t, e, n, r, i) {
  const s = t.append("svg").attr("class", "graph-controller__graph-canvas").on("pointermove", (o) => n(o)).on("pointerup", (o) => r(o)).on("contextmenu", (o) => ie(o)).on("dblclick", (o) => i(o)).call(e).on("dblclick.zoom", null).append("g");
  return s.append("rect").attr("width", "100%").attr("height", "100%").attr("fill", "white"), s;
}
var oe = /* @__PURE__ */ ((t) => (t.LINE = "LINE", t.LINEREVERSE = "LINE-REVERSE", t.ARC = "ARC", t.ARCREVERSE = "ARC-REVERSE", t.REFLEXIVE = "REFLEXIVE", t))(oe || {});
class u0 {
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
    _t(this, "id");
    this.source = e, this.target = n, this.pathType = r, this.label = i, this.color = s, this.deletable = o, this.labelEditable = l, this.id = `${e.id}-${n.id}`;
  }
}
function a0(t) {
  return t.append("g").classed("links", !0).selectAll(".graph-controller__link-container");
}
function c0(t) {
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
  e !== void 0 && (typeof e == "boolean" ? e ? t.fixedPosition = { x: !0, y: !0 } : t.fixedPosition = { x: !1, y: !1 } : mn(["x", "y"], Object.keys(e), !0) && (t.fixedPosition = e, Dn(["x", "y"], Object.keys(e))));
}
function f0(t, e, n) {
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
function Dn(t, e, n) {
  let r = !0;
  return e.forEach((i) => {
    t.includes(
      i
      // we actually just check if the type is keyof
    ) || (r = !1, sn(
      `Option not valid: ${i}`,
      `Use the following: ${t.join(", ")}.`
    ));
  }), r;
}
function mn(t, e, n) {
  let r = !0, i = t.filter((s) => !e.includes(s));
  return i.length > 0 && (r = !1, n && sn("Option missing", `Add: ${i}`)), r;
}
function sn(t, e) {
  console.error(t + `
` + e);
}
function h0(t, e, n, r) {
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
function Oi(t, e, n) {
  t.select(`#${e}-link-arrow-` + rr(n)).select(function() {
    return this.parentNode;
  }).remove(), t.select(`#${e}-link-arrow-reverse-` + rr(n)).select(function() {
    return this.parentNode;
  }).remove();
}
function qn(t, e, n, r, i, s) {
  t.append("defs").append("marker").attr("id", n).attr("viewBox", e.markerPath).attr("refX", e.markerRef).attr("refY", e.markerRef).attr("markerWidth", e.markerBoxSize).attr("markerHeight", e.markerBoxSize).attr("orient", i ? "auto-start-reverse" : "auto").classed(r, !0).append("path").attr("d", `${qg()(e.arrowPoints)}`).style("fill", s || "");
}
function d0(t) {
  return t.append("path").classed("graph-controller__link draggable hidden", !0).attr("d", "M0,0L0,0");
}
class Yo {
  constructor() {
    _t(this, "nodeIdCounter", 0);
    _t(this, "nodes", []);
    _t(this, "links", []);
  }
  createNode(e, n, r, i, s, o, l = { x: !1, y: !1 }, a = !0, u = !0, c = !0, f = !0) {
    const h = new Pn(
      this.nodeIdCounter++,
      r,
      e,
      n,
      i,
      s,
      o,
      l,
      a,
      u,
      c,
      f
    );
    return this.nodes.push(h), h;
  }
  createLink(e, n, r, i, s = !0, o = !0) {
    if (this.links.find(
      (f) => f.source.id === e && f.target.id === n
    ) !== void 0)
      return;
    const a = this.nodes.find((f) => f.id === e);
    if (a === void 0)
      return;
    const u = this.nodes.find((f) => f.id === n);
    if (u === void 0)
      return;
    const c = new u0(
      a,
      u,
      void 0,
      r,
      i,
      s,
      o
    );
    return this.links.push(c), c;
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
      let a = `${l.id}`;
      return e && l.label !== void 0 && (a += ` ${l.label}`), r && l.color !== void 0 && (a += ` /COLOR:/${l.color}`), a;
    }).join(`
`), o = this.links.map((l) => {
      let a = `${l.source.id} ${l.target.id}`;
      return n && l.label !== void 0 && (a += ` ${l.label}`), i && l.color !== void 0 && (a += ` /COLOR:/${l.color}`), a;
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
    let a = this.nodes.map((c) => Object.fromEntries(
      Object.entries(c).filter(([f]) => f === "id" || e && f === "label" || r && f === "color" || s && (f === "x" || f === "y") || o && [
        "fixedPosition",
        "deletable",
        "labelEditable",
        "allowIncomingLinks",
        "allowOutgoingLinks"
      ].includes(f))
    )), u = this.links.map((c) => Object.fromEntries(
      Object.entries(this._convertToJSONLink(c)).filter(([f]) => f === "sourceId" || f === "targetId" || n && f === "label" || i && f === "color" || l && ["deletable", "labelEditable"].includes(f))
    ));
    return JSON.stringify({ nodes: a, links: u }, null, 4);
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
function p0(t) {
  var e = +this._x.call(null, t), n = +this._y.call(null, t);
  return Iu(this.cover(e, n), e, n, t);
}
function Iu(t, e, n, r) {
  if (isNaN(e) || isNaN(n)) return t;
  var i, s = t._root, o = { data: r }, l = t._x0, a = t._y0, u = t._x1, c = t._y1, f, h, p, g, y, w, d, P;
  if (!s) return t._root = o, t;
  for (; s.length; )
    if ((y = e >= (f = (l + u) / 2)) ? l = f : u = f, (w = n >= (h = (a + c) / 2)) ? a = h : c = h, i = s, !(s = s[d = w << 1 | y])) return i[d] = o, t;
  if (p = +t._x.call(null, s.data), g = +t._y.call(null, s.data), e === p && n === g) return o.next = s, i ? i[d] = o : t._root = o, t;
  do
    i = i ? i[d] = new Array(4) : t._root = new Array(4), (y = e >= (f = (l + u) / 2)) ? l = f : u = f, (w = n >= (h = (a + c) / 2)) ? a = h : c = h;
  while ((d = w << 1 | y) === (P = (g >= h) << 1 | p >= f));
  return i[P] = s, i[d] = o, t;
}
function g0(t) {
  var e, n, r = t.length, i, s, o = new Array(r), l = new Array(r), a = 1 / 0, u = 1 / 0, c = -1 / 0, f = -1 / 0;
  for (n = 0; n < r; ++n)
    isNaN(i = +this._x.call(null, e = t[n])) || isNaN(s = +this._y.call(null, e)) || (o[n] = i, l[n] = s, i < a && (a = i), i > c && (c = i), s < u && (u = s), s > f && (f = s));
  for (c < a && (a = this._x0, c = this._x1), f < u && (u = this._y0, f = this._y1), this.cover(a, u).cover(c, f), n = 0; n < r; ++n)
    Iu(this, o[n], l[n], t[n]);
  return this;
}
function m0(t, e) {
  if (isNaN(t = +t) || isNaN(e = +e)) return this;
  var n = this._x0, r = this._y0, i = this._x1, s = this._y1;
  if (isNaN(n))
    i = (n = Math.floor(t)) + 1, s = (r = Math.floor(e)) + 1;
  else if (n > t || t > i || r > e || e > s) {
    var o = i - n, l = this._root, a, u;
    switch (u = (e < (r + s) / 2) << 1 | t < (n + i) / 2) {
      case 0: {
        do
          a = new Array(4), a[u] = l, l = a;
        while (o *= 2, i = n + o, s = r + o, t > i || e > s);
        break;
      }
      case 1: {
        do
          a = new Array(4), a[u] = l, l = a;
        while (o *= 2, n = i - o, s = r + o, n > t || e > s);
        break;
      }
      case 2: {
        do
          a = new Array(4), a[u] = l, l = a;
        while (o *= 2, i = n + o, r = s - o, t > i || r > e);
        break;
      }
      case 3: {
        do
          a = new Array(4), a[u] = l, l = a;
        while (o *= 2, n = i - o, r = s - o, n > t || r > e);
        break;
      }
    }
    this._root && this._root.length && (this._root = l);
  } else return this;
  return this._x0 = n, this._y0 = r, this._x1 = i, this._y1 = s, this;
}
function w0() {
  var t = [];
  return this.visit(function(e) {
    if (!e.length) do
      t.push(e.data);
    while (e = e.next);
  }), t;
}
function y0(t) {
  return arguments.length ? this.cover(+t[0][0], +t[0][1]).cover(+t[1][0], +t[1][1]) : isNaN(this._x0) ? void 0 : [[this._x0, this._y0], [this._x1, this._y1]];
}
function qt(t, e, n, r, i) {
  this.node = t, this.x0 = e, this.y0 = n, this.x1 = r, this.y1 = i;
}
function _0(t, e, n) {
  var r, i = this._x0, s = this._y0, o, l, a, u, c = this._x1, f = this._y1, h = [], p = this._root, g, y;
  for (p && h.push(new qt(p, i, s, c, f)), n == null ? n = 1 / 0 : (i = t - n, s = e - n, c = t + n, f = e + n, n *= n); g = h.pop(); )
    if (!(!(p = g.node) || (o = g.x0) > c || (l = g.y0) > f || (a = g.x1) < i || (u = g.y1) < s))
      if (p.length) {
        var w = (o + a) / 2, d = (l + u) / 2;
        h.push(
          new qt(p[3], w, d, a, u),
          new qt(p[2], o, d, w, u),
          new qt(p[1], w, l, a, d),
          new qt(p[0], o, l, w, d)
        ), (y = (e >= d) << 1 | t >= w) && (g = h[h.length - 1], h[h.length - 1] = h[h.length - 1 - y], h[h.length - 1 - y] = g);
      } else {
        var P = t - +this._x.call(null, p.data), T = e - +this._y.call(null, p.data), _ = P * P + T * T;
        if (_ < n) {
          var S = Math.sqrt(n = _);
          i = t - S, s = e - S, c = t + S, f = e + S, r = p.data;
        }
      }
  return r;
}
function v0(t) {
  if (isNaN(c = +this._x.call(null, t)) || isNaN(f = +this._y.call(null, t))) return this;
  var e, n = this._root, r, i, s, o = this._x0, l = this._y0, a = this._x1, u = this._y1, c, f, h, p, g, y, w, d;
  if (!n) return this;
  if (n.length) for (; ; ) {
    if ((g = c >= (h = (o + a) / 2)) ? o = h : a = h, (y = f >= (p = (l + u) / 2)) ? l = p : u = p, e = n, !(n = n[w = y << 1 | g])) return this;
    if (!n.length) break;
    (e[w + 1 & 3] || e[w + 2 & 3] || e[w + 3 & 3]) && (r = e, d = w);
  }
  for (; n.data !== t; ) if (i = n, !(n = n.next)) return this;
  return (s = n.next) && delete n.next, i ? (s ? i.next = s : delete i.next, this) : e ? (s ? e[w] = s : delete e[w], (n = e[0] || e[1] || e[2] || e[3]) && n === (e[3] || e[2] || e[1] || e[0]) && !n.length && (r ? r[d] = n : this._root = n), this) : (this._root = s, this);
}
function b0(t) {
  for (var e = 0, n = t.length; e < n; ++e) this.remove(t[e]);
  return this;
}
function x0() {
  return this._root;
}
function E0() {
  var t = 0;
  return this.visit(function(e) {
    if (!e.length) do
      ++t;
    while (e = e.next);
  }), t;
}
function k0(t) {
  var e = [], n, r = this._root, i, s, o, l, a;
  for (r && e.push(new qt(r, this._x0, this._y0, this._x1, this._y1)); n = e.pop(); )
    if (!t(r = n.node, s = n.x0, o = n.y0, l = n.x1, a = n.y1) && r.length) {
      var u = (s + l) / 2, c = (o + a) / 2;
      (i = r[3]) && e.push(new qt(i, u, c, l, a)), (i = r[2]) && e.push(new qt(i, s, c, u, a)), (i = r[1]) && e.push(new qt(i, u, o, l, c)), (i = r[0]) && e.push(new qt(i, s, o, u, c));
    }
  return this;
}
function S0(t) {
  var e = [], n = [], r;
  for (this._root && e.push(new qt(this._root, this._x0, this._y0, this._x1, this._y1)); r = e.pop(); ) {
    var i = r.node;
    if (i.length) {
      var s, o = r.x0, l = r.y0, a = r.x1, u = r.y1, c = (o + a) / 2, f = (l + u) / 2;
      (s = i[0]) && e.push(new qt(s, o, l, c, f)), (s = i[1]) && e.push(new qt(s, c, l, a, f)), (s = i[2]) && e.push(new qt(s, o, f, c, u)), (s = i[3]) && e.push(new qt(s, c, f, a, u));
    }
    n.push(r);
  }
  for (; r = n.pop(); )
    t(r.node, r.x0, r.y0, r.x1, r.y1);
  return this;
}
function P0(t) {
  return t[0];
}
function M0(t) {
  return arguments.length ? (this._x = t, this) : this._x;
}
function N0(t) {
  return t[1];
}
function C0(t) {
  return arguments.length ? (this._y = t, this) : this._y;
}
function $u(t, e, n) {
  var r = new Fs(e ?? P0, n ?? N0, NaN, NaN, NaN, NaN);
  return t == null ? r : r.addAll(t);
}
function Fs(t, e, n, r, i, s) {
  this._x = t, this._y = e, this._x0 = n, this._y0 = r, this._x1 = i, this._y1 = s, this._root = void 0;
}
function Jo(t) {
  for (var e = { data: t.data }, n = e; t = t.next; ) n = n.next = { data: t.data };
  return e;
}
var Kt = $u.prototype = Fs.prototype;
Kt.copy = function() {
  var t = new Fs(this._x, this._y, this._x0, this._y0, this._x1, this._y1), e = this._root, n, r;
  if (!e) return t;
  if (!e.length) return t._root = Jo(e), t;
  for (n = [{ source: e, target: t._root = new Array(4) }]; e = n.pop(); )
    for (var i = 0; i < 4; ++i)
      (r = e.source[i]) && (r.length ? n.push({ source: r, target: e.target[i] = new Array(4) }) : e.target[i] = Jo(r));
  return t;
};
Kt.add = p0;
Kt.addAll = g0;
Kt.cover = m0;
Kt.data = w0;
Kt.extent = y0;
Kt.find = _0;
Kt.remove = v0;
Kt.removeAll = b0;
Kt.root = x0;
Kt.size = E0;
Kt.visit = k0;
Kt.visitAfter = S0;
Kt.x = M0;
Kt.y = C0;
function T0(t) {
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
  function a() {
    var f, h, p, g, y, w, d, P, T, _, S = [];
    i.forEach(function(B, Q) {
      S.push({ node: B, vx: B.vx, vy: B.vy, x: B.x + (s[Q][1][0] + s[Q][0][0]) / 2, y: B.y + (s[Q][0][1] + s[Q][1][1]) / 2 }), S.push({ node: B, vx: B.vx, vy: B.vy, x: B.x + s[Q][0][0], y: B.y + s[Q][0][1] }), S.push({ node: B, vx: B.vx, vy: B.vy, x: B.x + s[Q][0][0], y: B.y + s[Q][1][1] }), S.push({ node: B, vx: B.vx, vy: B.vy, x: B.x + s[Q][1][0], y: B.y + s[Q][0][1] }), S.push({ node: B, vx: B.vx, vy: B.vy, x: B.x + s[Q][1][0], y: B.y + s[Q][1][1] });
    });
    for (var R = S.length, D = 0; D < l; ++D)
      for (h = $u(S, e, n).visitAfter(u), f = 0; f < R; ++f) {
        var H = ~~(f / 5);
        p = i[H], w = s[H], g = p.x + p.vx, y = p.y + p.vy, d = g + w[0][0], P = y + w[0][1], T = g + w[1][0], _ = y + w[1][1], h.visit(Z);
      }
    function Z(B, Q, ut, K, x) {
      var z = B.data;
      if (z) {
        var N = c(w, 0), F = c(w, 1);
        if (z.node.index !== H) {
          var $ = z.node, X = s[$.index], Y = $.x + $.vx + X[0][0], it = $.y + $.vy + X[0][1], st = $.x + $.vx + X[1][0], Et = $.y + $.vy + X[1][1], gt = c(X, 0), mt = c(X, 1);
          if (d <= st && Y <= T && P <= Et && it <= _) {
            var wt = [Math.min.apply(null, [Y, st, d, T]), Math.max.apply(null, [Y, st, d, T])], vt = [Math.min.apply(null, [it, Et, P, _]), Math.max.apply(null, [it, Et, P, _])], kt = N + gt - (wt[1] - wt[0]), It = F + mt - (vt[1] - vt[0]), jt = kt * o * (It / F), re = It * o * (kt / N), ve = kt * o * (It / mt), v = It * o * (kt / gt);
            (d + T) / 2 < (Y + st) / 2 ? (p.vx -= jt, $.vx += ve) : (p.vx += jt, $.vx -= ve), (P + _) / 2 < (it + Et) / 2 ? (p.vy -= re, $.vy += v) : (p.vy += re, $.vy -= v);
          }
        }
        return;
      }
      return Q > T || K < d || ut > _ || x < P;
    }
  }
  function u(f) {
    if (f.data)
      return f.bb = s[f.data.node.index];
    f.bb = [[0, 0], [0, 0]];
    for (var h = 0; h < 4; ++h)
      f[h] && f[h].bb[0][0] < f.bb[0][0] && (f.bb[0][0] = f[h].bb[0][0]), f[h] && f[h].bb[0][1] < f.bb[0][1] && (f.bb[0][1] = f[h].bb[0][1]), f[h] && f[h].bb[1][0] > f.bb[1][0] && (f.bb[1][0] = f[h].bb[1][0]), f[h] && f[h].bb[1][1] > f.bb[1][1] && (f.bb[1][1] = f[h].bb[1][1]);
  }
  function c(f, h) {
    return f[1][h] - f[0][h];
  }
  return a.initialize = function(f) {
    var h, p = (i = f).length;
    for (s = new Array(p), h = 0; h < p; ++h) s[h] = t(i[h], h, i);
  }, a.iterations = function(f) {
    return arguments.length ? (l = +f, a) : l;
  }, a.strength = function(f) {
    return arguments.length ? (o = +f, a) : o;
  }, a.bbox = function(f) {
    return arguments.length ? (t = typeof f == "function" ? f : r(+f), a) : t;
  }, a;
}
function L0(t, e, n, r, i) {
  let s = Mg(t.nodes).on("tick", () => i());
  return s = R0(s, e), s = I0(t, s, n, r, e), s = Au(s, t, e, e.fixedLinkDistanceEnabled), s = Ou(s, e.nodePhysicsEnabled, n, r), s;
}
function R0(t, e) {
  if (e.nodeProps.shape === rt.CIRCLE)
    return t.force(
      "collision",
      wg().radius(e.nodeProps.radius)
    );
  if (e.nodeProps.shape === rt.RECTANGLE) {
    let n = T0([
      [-0.5 * e.nodeProps.width, -0.5 * e.nodeProps.height],
      [0.5 * e.nodeProps.width, 0.5 * e.nodeProps.height]
    ]);
    return t.force("collision", n);
  }
  return t;
}
function I0(t, e, n, r, i) {
  return e.force("bounds", () => {
    for (const s of t.nodes)
      i.nodeProps.shape === rt.CIRCLE ? (s.x = Math.max(
        i.nodeProps.radius,
        Math.min(n - i.nodeProps.radius, s.x)
      ), s.y = Math.max(
        i.nodeProps.radius,
        Math.min(r - i.nodeProps.radius, s.y)
      )) : i.nodeProps.shape === rt.RECTANGLE && (s.x = Math.max(0, Math.min(n - i.nodeProps.width, s.x)), s.y = Math.max(0, Math.min(r - i.nodeProps.height, s.y)));
  });
}
function Ou(t, e, n, r) {
  return e ? t.force("charge", Ng().strength(-500)).force("x", Cg(n / 2).strength(0.05)).force("y", Tg(r / 2).strength(0.05)) : t.force("charge", null).force("x", null).force("y", null);
}
function Au(t, e, n, r) {
  if (r) {
    let i = 0;
    return n.nodeProps.shape === rt.CIRCLE ? i = n.nodeProps.radius : n.nodeProps.shape === rt.RECTANGLE && (n.nodeProps.width < n.nodeProps.height ? i = n.nodeProps.width / 2 : i = n.nodeProps.height / 2), t.force(
      "link",
      _g().links(e.links).id((s) => s.id).distance(i * 10)
    );
  } else
    return t.force("link", null);
}
const $0 = Object.prototype.toString;
function Zr(t) {
  const e = $0.call(t);
  return e.endsWith("Array]") && !e.includes("Big");
}
function O0(t) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (!Zr(t))
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
function A0(t) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (!Zr(t))
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
  if (Zr(t)) {
    if (t.length === 0)
      throw new TypeError("input must not be empty");
  } else throw new TypeError("input must be an array");
  var n;
  if (e.output !== void 0) {
    if (!Zr(e.output))
      throw new TypeError("output option must be an array if specified");
    n = e.output;
  } else
    n = new Array(t.length);
  var r = A0(t), i = O0(t);
  if (r === i)
    throw new RangeError("minimum and maximum input values are equal. Cannot rescale a constant array");
  var s = e.min, o = s === void 0 ? e.autoMinMax ? r : 0 : s, l = e.max, a = l === void 0 ? e.autoMinMax ? i : 1 : l;
  if (o >= a)
    throw new RangeError("min option must be smaller than max option");
  for (var u = (a - o) / (i - r), c = 0; c < t.length; c++)
    n[c] = (t[c] - r) * u + o;
  return n;
}
const Sr = " ".repeat(2), Fu = " ".repeat(4);
function F0() {
  return ju(this);
}
function ju(t, e = {}) {
  const { maxRows: n = 15, maxColumns: r = 10, maxNumSize: i = 8 } = e;
  return `${t.constructor.name} {
${Sr}[
${Fu}${j0(t, n, r, i)}
${Sr}]
${Sr}rows: ${t.rows}
${Sr}columns: ${t.columns}
}`;
}
function j0(t, e, n, r) {
  const { rows: i, columns: s } = t, o = Math.min(i, e), l = Math.min(s, n), a = [];
  for (let u = 0; u < o; u++) {
    let c = [];
    for (let f = 0; f < l; f++)
      c.push(B0(t.get(u, f), r));
    a.push(`${c.join(" ")}`);
  }
  return l !== s && (a[a.length - 1] += ` ... ${s - n} more columns`), o !== i && a.push(`... ${i - e} more rows`), a.join(`
${Fu}`);
}
function B0(t, e) {
  const n = String(t);
  if (n.length <= e)
    return n.padEnd(e, " ");
  const r = t.toPrecision(e - 2);
  if (r.length <= e)
    return r;
  const i = t.toExponential(e - 2), s = i.indexOf("e"), o = i.slice(s);
  return i.slice(0, e - o.length) + o;
}
function D0(t, e) {
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
function z0(t, e, n) {
  return {
    row: V0(t, e),
    column: G0(t, n)
  };
}
function V0(t, e) {
  if (typeof e != "object")
    throw new TypeError("unexpected type for row indices");
  if (e.some((r) => r < 0 || r >= t.rows))
    throw new RangeError("row indices are out of range");
  return Array.isArray(e) || (e = Array.from(e)), e;
}
function G0(t, e) {
  if (typeof e != "object")
    throw new TypeError("unexpected type for column indices");
  if (e.some((r) => r < 0 || r >= t.columns))
    throw new RangeError("column indices are out of range");
  return Array.isArray(e) || (e = Array.from(e)), e;
}
function Zo(t, e, n, r, i) {
  if (arguments.length !== 5)
    throw new RangeError("expected 4 arguments");
  if (Pr("startRow", e), Pr("endRow", n), Pr("startColumn", r), Pr("endColumn", i), e > n || r > i || e < 0 || e >= t.rows || n < 0 || n >= t.rows || r < 0 || r >= t.columns || i < 0 || i >= t.columns)
    throw new RangeError("Submatrix indices are out of range");
}
function wi(t, e = 0) {
  let n = [];
  for (let r = 0; r < t; r++)
    n.push(e);
  return n;
}
function Pr(t, e) {
  if (typeof e != "number")
    throw new TypeError(`${t} must be a number`);
}
function gn(t) {
  if (t.isEmpty())
    throw new Error("Empty matrix has no elements to index");
}
function H0(t) {
  let e = wi(t.rows);
  for (let n = 0; n < t.rows; ++n)
    for (let r = 0; r < t.columns; ++r)
      e[n] += t.get(n, r);
  return e;
}
function q0(t) {
  let e = wi(t.columns);
  for (let n = 0; n < t.rows; ++n)
    for (let r = 0; r < t.columns; ++r)
      e[r] += t.get(n, r);
  return e;
}
function U0(t) {
  let e = 0;
  for (let n = 0; n < t.rows; n++)
    for (let r = 0; r < t.columns; r++)
      e += t.get(n, r);
  return e;
}
function W0(t) {
  let e = wi(t.rows, 1);
  for (let n = 0; n < t.rows; ++n)
    for (let r = 0; r < t.columns; ++r)
      e[n] *= t.get(n, r);
  return e;
}
function K0(t) {
  let e = wi(t.columns, 1);
  for (let n = 0; n < t.rows; ++n)
    for (let r = 0; r < t.columns; ++r)
      e[r] *= t.get(n, r);
  return e;
}
function X0(t) {
  let e = 1;
  for (let n = 0; n < t.rows; n++)
    for (let r = 0; r < t.columns; r++)
      e *= t.get(n, r);
  return e;
}
function Y0(t, e, n) {
  const r = t.rows, i = t.columns, s = [];
  for (let o = 0; o < r; o++) {
    let l = 0, a = 0, u = 0;
    for (let c = 0; c < i; c++)
      u = t.get(o, c) - n[o], l += u, a += u * u;
    e ? s.push((a - l * l / i) / (i - 1)) : s.push((a - l * l / i) / i);
  }
  return s;
}
function J0(t, e, n) {
  const r = t.rows, i = t.columns, s = [];
  for (let o = 0; o < i; o++) {
    let l = 0, a = 0, u = 0;
    for (let c = 0; c < r; c++)
      u = t.get(c, o) - n[o], l += u, a += u * u;
    e ? s.push((a - l * l / r) / (r - 1)) : s.push((a - l * l / r) / r);
  }
  return s;
}
function Q0(t, e, n) {
  const r = t.rows, i = t.columns, s = r * i;
  let o = 0, l = 0, a = 0;
  for (let u = 0; u < r; u++)
    for (let c = 0; c < i; c++)
      a = t.get(u, c) - n, o += a, l += a * a;
  return e ? (l - o * o / s) / (s - 1) : (l - o * o / s) / s;
}
function Z0(t, e) {
  for (let n = 0; n < t.rows; n++)
    for (let r = 0; r < t.columns; r++)
      t.set(n, r, t.get(n, r) - e[n]);
}
function tm(t, e) {
  for (let n = 0; n < t.rows; n++)
    for (let r = 0; r < t.columns; r++)
      t.set(n, r, t.get(n, r) - e[r]);
}
function em(t, e) {
  for (let n = 0; n < t.rows; n++)
    for (let r = 0; r < t.columns; r++)
      t.set(n, r, t.get(n, r) - e);
}
function nm(t) {
  const e = [];
  for (let n = 0; n < t.rows; n++) {
    let r = 0;
    for (let i = 0; i < t.columns; i++)
      r += Math.pow(t.get(n, i), 2) / (t.columns - 1);
    e.push(Math.sqrt(r));
  }
  return e;
}
function rm(t, e) {
  for (let n = 0; n < t.rows; n++)
    for (let r = 0; r < t.columns; r++)
      t.set(n, r, t.get(n, r) / e[n]);
}
function im(t) {
  const e = [];
  for (let n = 0; n < t.columns; n++) {
    let r = 0;
    for (let i = 0; i < t.rows; i++)
      r += Math.pow(t.get(i, n), 2) / (t.rows - 1);
    e.push(Math.sqrt(r));
  }
  return e;
}
function sm(t, e) {
  for (let n = 0; n < t.rows; n++)
    for (let r = 0; r < t.columns; r++)
      t.set(n, r, t.get(n, r) / e[r]);
}
function om(t) {
  const e = t.size - 1;
  let n = 0;
  for (let r = 0; r < t.columns; r++)
    for (let i = 0; i < t.rows; i++)
      n += Math.pow(t.get(i, r), 2) / e;
  return Math.sqrt(n);
}
function lm(t, e) {
  for (let n = 0; n < t.rows; n++)
    for (let r = 0; r < t.columns; r++)
      t.set(n, r, t.get(n, r) / e);
}
class ht {
  static from1DArray(e, n, r) {
    if (e * n !== r.length)
      throw new RangeError("data length does not match given dimensions");
    let s = new nt(e, n);
    for (let o = 0; o < e; o++)
      for (let l = 0; l < n; l++)
        s.set(o, l, r[o * n + l]);
    return s;
  }
  static rowVector(e) {
    let n = new nt(1, e.length);
    for (let r = 0; r < e.length; r++)
      n.set(0, r, e[r]);
    return n;
  }
  static columnVector(e) {
    let n = new nt(e.length, 1);
    for (let r = 0; r < e.length; r++)
      n.set(r, 0, e[r]);
    return n;
  }
  static zeros(e, n) {
    return new nt(e, n);
  }
  static ones(e, n) {
    return new nt(e, n).fill(1);
  }
  static rand(e, n, r = {}) {
    if (typeof r != "object")
      throw new TypeError("options must be an object");
    const { random: i = Math.random } = r;
    let s = new nt(e, n);
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
    let l = s - i, a = new nt(e, n);
    for (let u = 0; u < e; u++)
      for (let c = 0; c < n; c++) {
        let f = i + Math.round(o() * l);
        a.set(u, c, f);
      }
    return a;
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
    let r = e.rows, i = e.columns, s = new nt(r, i);
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
    return ht.isMatrix(e) ? e : new nt(e);
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
          for (let a = r + 1; a < e.columns; a++)
            e.set(o, a, e.get(o, a) - e.get(n, a) * l);
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
          let a = e.get(l, s);
          for (let u = s; u < n; u++) {
            let c = e.get(l, u) - a * e.get(i, u);
            e.set(l, u, c);
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
    let i = new nt(this.rows * n, this.columns * r);
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
    return nt.rowVector(this.getRow(e));
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
    return nt.columnVector(this.getColumn(e));
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
    e = nt.checkMatrix(e);
    let n = this.rows, r = this.columns, i = e.columns, s = new nt(n, i), o = new Float64Array(r);
    for (let l = 0; l < i; l++) {
      for (let a = 0; a < r; a++)
        o[a] = e.get(a, l);
      for (let a = 0; a < n; a++) {
        let u = 0;
        for (let c = 0; c < r; c++)
          u += this.get(a, c) * o[c];
        s.set(a, l, u);
      }
    }
    return s;
  }
  strassen2x2(e) {
    e = nt.checkMatrix(e);
    let n = new nt(2, 2);
    const r = this.get(0, 0), i = e.get(0, 0), s = this.get(0, 1), o = e.get(0, 1), l = this.get(1, 0), a = e.get(1, 0), u = this.get(1, 1), c = e.get(1, 1), f = (r + u) * (i + c), h = (l + u) * i, p = r * (o - c), g = u * (a - i), y = (r + s) * c, w = (l - r) * (i + o), d = (s - u) * (a + c), P = f + g - y + d, T = p + y, _ = h + g, S = f - h + p + w;
    return n.set(0, 0, P), n.set(0, 1, T), n.set(1, 0, _), n.set(1, 1, S), n;
  }
  strassen3x3(e) {
    e = nt.checkMatrix(e);
    let n = new nt(3, 3);
    const r = this.get(0, 0), i = this.get(0, 1), s = this.get(0, 2), o = this.get(1, 0), l = this.get(1, 1), a = this.get(1, 2), u = this.get(2, 0), c = this.get(2, 1), f = this.get(2, 2), h = e.get(0, 0), p = e.get(0, 1), g = e.get(0, 2), y = e.get(1, 0), w = e.get(1, 1), d = e.get(1, 2), P = e.get(2, 0), T = e.get(2, 1), _ = e.get(2, 2), S = (r + i + s - o - l - c - f) * w, R = (r - o) * (-p + w), D = l * (-h + p + y - w - d - P + _), H = (-r + o + l) * (h - p + w), Z = (o + l) * (-h + p), B = r * h, Q = (-r + u + c) * (h - g + d), ut = (-r + u) * (g - d), K = (u + c) * (-h + g), x = (r + i + s - l - a - u - c) * d, z = c * (-h + g + y - w - d - P + T), N = (-s + c + f) * (w + P - T), F = (s - f) * (w - T), $ = s * P, X = (c + f) * (-P + T), Y = (-s + l + a) * (d + P - _), it = (s - a) * (d - _), st = (l + a) * (-P + _), Et = i * y, gt = a * T, mt = o * g, wt = u * p, vt = f * _, kt = B + $ + Et, It = S + H + Z + B + N + $ + X, jt = B + Q + K + x + $ + Y + st, re = R + D + H + B + $ + Y + it, ve = R + H + Z + B + gt, v = $ + Y + it + st + mt, b = B + Q + ut + z + N + F + $, C = N + F + $ + X + wt, O = B + Q + ut + K + vt;
    return n.set(0, 0, kt), n.set(0, 1, It), n.set(0, 2, jt), n.set(1, 0, re), n.set(1, 1, ve), n.set(1, 2, v), n.set(2, 0, b), n.set(2, 1, C), n.set(2, 2, O), n;
  }
  mmulStrassen(e) {
    e = nt.checkMatrix(e);
    let n = this.clone(), r = n.rows, i = n.columns, s = e.rows, o = e.columns;
    i !== s && console.warn(
      `Multiplying ${r} x ${i} and ${s} x ${o} matrix: dimensions do not match.`
    );
    function l(f, h, p) {
      let g = f.rows, y = f.columns;
      if (g === h && y === p)
        return f;
      {
        let w = ht.zeros(h, p);
        return w = w.setSubMatrix(f, 0, 0), w;
      }
    }
    let a = Math.max(r, s), u = Math.max(i, o);
    n = l(n, a, u), e = l(e, a, u);
    function c(f, h, p, g) {
      if (p <= 512 || g <= 512)
        return f.mmul(h);
      p % 2 === 1 && g % 2 === 1 ? (f = l(f, p + 1, g + 1), h = l(h, p + 1, g + 1)) : p % 2 === 1 ? (f = l(f, p + 1, g), h = l(h, p + 1, g)) : g % 2 === 1 && (f = l(f, p, g + 1), h = l(h, p, g + 1));
      let y = parseInt(f.rows / 2, 10), w = parseInt(f.columns / 2, 10), d = f.subMatrix(0, y - 1, 0, w - 1), P = h.subMatrix(0, y - 1, 0, w - 1), T = f.subMatrix(0, y - 1, w, f.columns - 1), _ = h.subMatrix(0, y - 1, w, h.columns - 1), S = f.subMatrix(y, f.rows - 1, 0, w - 1), R = h.subMatrix(y, h.rows - 1, 0, w - 1), D = f.subMatrix(y, f.rows - 1, w, f.columns - 1), H = h.subMatrix(y, h.rows - 1, w, h.columns - 1), Z = c(
        ht.add(d, D),
        ht.add(P, H),
        y,
        w
      ), B = c(ht.add(S, D), P, y, w), Q = c(d, ht.sub(_, H), y, w), ut = c(D, ht.sub(R, P), y, w), K = c(ht.add(d, T), H, y, w), x = c(
        ht.sub(S, d),
        ht.add(P, _),
        y,
        w
      ), z = c(
        ht.sub(T, D),
        ht.add(R, H),
        y,
        w
      ), N = ht.add(Z, ut);
      N.sub(K), N.add(z);
      let F = ht.add(Q, K), $ = ht.add(B, ut), X = ht.sub(Z, B);
      X.add(Q), X.add(x);
      let Y = ht.zeros(2 * N.rows, 2 * N.columns);
      return Y = Y.setSubMatrix(N, 0, 0), Y = Y.setSubMatrix(F, N.rows, 0), Y = Y.setSubMatrix($, 0, N.columns), Y = Y.setSubMatrix(X, N.rows, N.columns), Y.subMatrix(0, p - 1, 0, g - 1);
    }
    return c(n, e, a, u);
  }
  scaleRows(e = {}) {
    if (typeof e != "object")
      throw new TypeError("options must be an object");
    const { min: n = 0, max: r = 1 } = e;
    if (!Number.isFinite(n)) throw new TypeError("min must be a number");
    if (!Number.isFinite(r)) throw new TypeError("max must be a number");
    if (n >= r) throw new RangeError("min must be smaller than max");
    let i = new nt(this.rows, this.columns);
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
    let i = new nt(this.rows, this.columns);
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
    e = nt.checkMatrix(e);
    let n = this.rows, r = this.columns, i = e.rows, s = e.columns, o = new nt(n * i, r * s);
    for (let l = 0; l < n; l++)
      for (let a = 0; a < r; a++)
        for (let u = 0; u < i; u++)
          for (let c = 0; c < s; c++)
            o.set(i * l + u, s * a + c, this.get(l, a) * e.get(u, c));
    return o;
  }
  kroneckerSum(e) {
    if (e = nt.checkMatrix(e), !this.isSquare() || !e.isSquare())
      throw new Error("Kronecker Sum needs two Square Matrices");
    let n = this.rows, r = e.rows, i = this.kroneckerProduct(nt.eye(r, r)), s = nt.eye(n, n).kroneckerProduct(e);
    return i.add(s);
  }
  transpose() {
    let e = new nt(this.columns, this.rows);
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
    let s = new nt(
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
    let i = new nt(e.length, r - n + 1);
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
    let i = new nt(r - n + 1, e.length);
    for (let s = 0; s < e.length; s++)
      for (let o = n; o <= r; o++) {
        if (e[s] < 0 || e[s] >= this.columns)
          throw new RangeError(`Column index out of range: ${e[s]}`);
        i.set(o - n, s, this.get(o, e[s]));
      }
    return i;
  }
  setSubMatrix(e, n, r) {
    if (e = nt.checkMatrix(e), e.isEmpty())
      return this;
    let i = n + e.rows - 1, s = r + e.columns - 1;
    Zo(this, n, i, r, s);
    for (let o = 0; o < e.rows; o++)
      for (let l = 0; l < e.columns; l++)
        this.set(n + o, r + l, e.get(o, l));
    return this;
  }
  selection(e, n) {
    let r = z0(this, e, n), i = new nt(e.length, n.length);
    for (let s = 0; s < r.row.length; s++) {
      let o = r.row[s];
      for (let l = 0; l < r.column.length; l++) {
        let a = r.column[l];
        i.set(s, l, this.get(o, a));
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
    let e = new nt(this.rows, this.columns);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        e.set(n, r, this.get(n, r));
    return e;
  }
  sum(e) {
    switch (e) {
      case "row":
        return H0(this);
      case "column":
        return q0(this);
      case void 0:
        return U0(this);
      default:
        throw new Error(`invalid option: ${e}`);
    }
  }
  product(e) {
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
        return Y0(this, r, i);
      }
      case "column": {
        if (!Array.isArray(i))
          throw new TypeError("mean must be an array");
        return J0(this, r, i);
      }
      case void 0: {
        if (typeof i != "number")
          throw new TypeError("mean must be a number");
        return Q0(this, r, i);
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
        return Z0(this, r), this;
      }
      case "column": {
        if (!Array.isArray(r))
          throw new TypeError("center must be an array");
        return tm(this, r), this;
      }
      case void 0: {
        if (typeof r != "number")
          throw new TypeError("center must be a number");
        return em(this, r), this;
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
          r = nm(this);
        else if (!Array.isArray(r))
          throw new TypeError("scale must be an array");
        return rm(this, r), this;
      }
      case "column": {
        if (r === void 0)
          r = im(this);
        else if (!Array.isArray(r))
          throw new TypeError("scale must be an array");
        return sm(this, r), this;
      }
      case void 0: {
        if (r === void 0)
          r = om(this);
        else if (typeof r != "number")
          throw new TypeError("scale must be a number");
        return lm(this, r), this;
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
typeof Symbol < "u" && (ht.prototype[Symbol.for("nodejs.util.inspect.custom")] = F0);
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
class nt extends ht {
  constructor(e, n) {
    if (super(), nt.isMatrix(e))
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
D0(ht, nt);
var um = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function am(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var Bu = { exports: {} };
(function(t, e) {
  (function(n, r) {
    t.exports = r();
  })(um, function() {
    function n(o) {
      o = o.replace(/,/g, " ").replace(/([^eE])-/g, "$1 -").replace(/\s*([achlmqstvzACHLMQSTVZ])\s*/g, " $1 ").replace(/\s+/g, " ").replace(/(\d*\.\d+([eE]-?\d+)?)((\.\d+)+)/g, (N, F, $, X) => F + X.replaceAll(".", " ."));
      var l = o.replace(/([achlmqstvzACHLMQSTVZ])\s?/g, "|$1").split("|"), a = l.length, u, c, f, h, p, g = [], y = [], w, d, P = 0, T = 0, _ = 0, S = 0, R = 0, D = 0, H = 0, Z = 0, B = 0, Q = 0, ut = 0, K = 0, x = 0, z = "";
      for (u = 1; u < a; u++) {
        if (c = l[u], f = c.substring(0, 1), h = f.toLowerCase(), g = c.replace(f, "").trim().split(" ").filter(function(N) {
          return N !== "";
        }), y = g, g = g.map(parseFloat), w = g.length, h === "m") {
          if (z += "M ", f === "m" ? (_ += g[0], S += g[1]) : (_ = g[0], S = g[1]), P = _, T = S, z += _ + " " + S + " ", w > 2)
            for (d = 0; d < w; d += 2)
              f === "m" ? (_ += g[d], S += g[d + 1]) : (_ = g[d], S = g[d + 1]), z += "L " + _ + " " + S + " ";
        } else if (h === "l")
          for (d = 0; d < w; d += 2)
            f === "l" ? (_ += g[d], S += g[d + 1]) : (_ = g[d], S = g[d + 1]), z += "L " + _ + " " + S + " ";
        else if (h === "h")
          for (d = 0; d < w; d++)
            f === "h" ? _ += g[d] : _ = g[d], z += "L " + _ + " " + S + " ";
        else if (h === "v")
          for (d = 0; d < w; d++)
            f === "v" ? S += g[d] : S = g[d], z += "L " + _ + " " + S + " ";
        else if (h === "q")
          for (d = 0; d < w; d += 4)
            f === "q" ? (R = _ + g[d], D = S + g[d + 1], _ += g[d + 2], S += g[d + 3]) : (R = g[d], D = g[d + 1], _ = g[d + 2], S = g[d + 3]), z += "Q " + R + " " + D + " " + _ + " " + S + " ";
        else if (h === "t")
          for (d = 0; d < w; d += 2)
            ["t", "q"].indexOf(p) > -1 ? (R = _ + (_ - R), D = S + (S - D)) : (R = _, D = S), f === "t" ? (_ += g[d], S += g[d + 1]) : (_ = g[d], S = g[d + 1]), z += "Q " + R + " " + D + " " + _ + " " + S + " ", p = h;
        else if (h === "c")
          for (d = 0; d < w; d += 6)
            f === "c" ? (R = _ + g[d], D = S + g[d + 1], H = _ + g[d + 2], Z = S + g[d + 3], _ += g[d + 4], S += g[d + 5]) : (R = g[d], D = g[d + 1], H = g[d + 2], Z = g[d + 3], _ = g[d + 4], S = g[d + 5]), z += "C " + R + " " + D + " " + H + " " + Z + " " + _ + " " + S + " ";
        else if (h === "s")
          for (d = 0; d < w; d += 4)
            R = _, D = S, ["s", "c"].indexOf(p) > -1 && (R += _ - H, D += S - Z), f === "s" ? (H = _ + g[d], Z = S + g[d + 1], _ += g[d + 2], S += g[d + 3]) : (H = g[d], Z = g[d + 1], _ = g[d + 2], S = g[d + 3]), z += "C " + R + " " + D + " " + H + " " + Z + " " + _ + " " + S + " ";
        else if (h === "a")
          for (d = 0; d < w; d += 7) {
            B = g[d], Q = g[d + 1], ut = g[d + 2], K = y[d + 3];
            let N = !1;
            if (K.length > 1) {
              let F = parseInt(K[0]), $ = parseInt(K[1]), X;
              K.length > 2 && (X = parseFloat(K.substring(2))), g[d + 3] = F, g.splice(d + 4, 0, $), y.splice(d + 4, 0, "+"), X !== void 0 && g.splice(d + 5, 0, X), N = !0;
            }
            K = g[d + 3], x = N ? g[d + 4] : y[d + 4], !N && x.length > 1 && (g[d + 4] = parseInt(x[0]), g.splice(d + 5, 0, parseFloat(x.substring(1)))), x = g[d + 4], f === "a" ? (_ += g[d + 5], S += g[d + 6]) : (_ = g[d + 5], S = g[d + 6]), z += "A " + B + " " + Q + " " + ut + " " + K + " " + x + " " + _ + " " + S + " ";
          }
        else h === "z" && (z += "Z ", _ = P, S = T);
        p = h;
      }
      return z.trim();
    }
    function r(o) {
      var l = o.trim().split(" "), a, u = l.length, c = u - 1, f, h = [], p, g, y, w, d, P = new RegExp("[QAZLCM]", ""), T = l.slice(-1)[0].toUpperCase() === "Z";
      for (f = 0; f < u; f++)
        if (a = l[f], P.test(a)) {
          if (a === "A") {
            h.push(l[f + 5] === "0" ? "1" : "0"), h.push(l[f + 4]), h.push(l[f + 3]), h.push(l[f + 2]), h.push(l[f + 1]), h.push(a), h.push(l[f + 7]), h.push(l[f + 6]), f += 7;
            continue;
          } else if (a === "C")
            w = 3, d = 2;
          else if (a === "Q")
            w = 2, d = 1;
          else if (a === "L")
            w = 1, d = 1;
          else if (a === "M")
            w = 1, d = 0;
          else
            continue;
          for (w === d && h.push(a), y = 0; y < w; y++)
            y === d && h.push(a), p = l[++f], g = l[++f], h.push(g), h.push(p);
        } else {
          var _ = l.slice(Math.max(f - 3, 0), 3).join(" ");
          throw post = l.slice(f + 1, Math.min(f + 4, c)).join(" "), range = _ + " [" + a + "] " + post, "Error while trying to reverse normalized SVG path, at position " + f + " (" + range + `).
Either the path is not normalised, or it's malformed.`;
        }
      h.push("M");
      var S = "", R = h.length - 1, D;
      for (D = R; D > 0; D--)
        S += h[D] + " ";
      return T && (S += "Z"), S = S.replace(/M M/g, "Z M"), S;
    }
    function i(a, l) {
      l = parseInt(l) == l ? l : !1;
      var a = n(a), u = a.replace(/M/g, "|M").split("|"), c;
      if (u.splice(0, 1), l !== !1 && l >= u.length)
        return a;
      if (l === !1)
        u = u.map(function(h) {
          return r(h.trim());
        });
      else {
        var f = u[l];
        f && (c = r(f.trim()), u[l] = c);
      }
      return u.reverse().join(" ").replace(/ +/g, " ").trim();
    }
    var s = {
      normalize: n,
      reverseNormalized: r,
      reverse: i
    };
    return s;
  });
})(Bu);
var cm = Bu.exports;
const el = /* @__PURE__ */ am(cm);
var xt = /* @__PURE__ */ ((t) => (t.RIGHT = "RIGHT", t.BOTTOMRIGHT = "BOTTOMRIGHT", t.BOTTOM = "BOTTOM", t.BOTTOMLEFT = "BOTTOMLEFT", t.LEFT = "LEFT", t.TOPLEFT = "TOPLEFT", t.TOP = "TOP", t.TOPRIGHT = "TOPRIGHT", t))(xt || {});
function fm(t, e, n, r) {
  switch (t.pathType) {
    case oe.REFLEXIVE:
      return Du(t.source, [e / 2, n / 2], r);
    case oe.ARC:
      return ss(t.source, t.target, r);
    case oe.ARCREVERSE:
      return el.reverse(ss(t.source, t.target, r));
    case oe.LINE:
      return Un(t.source, t.target, r);
    case oe.LINEREVERSE:
      return el.reverse(Un(t.source, t.target, r));
    default:
      return "";
  }
}
function hm(t, e, n) {
  return t.id === e.id ? oe.REFLEXIVE : n.hasBidirectionalConnection(t, e) ? nl(t, e) ? oe.ARCREVERSE : oe.ARC : nl(t, e) ? oe.LINEREVERSE : oe.LINE;
}
function Un(t, e, n) {
  let r, i;
  if (n.nodeProps.shape === rt.CIRCLE) {
    const s = e.x - t.x, o = e.y - t.y;
    let l = Math.sqrt(s * s + o * o);
    l === 0 && (l = Number.EPSILON);
    const a = s / l, u = o / l;
    r = {
      x: t.x + (n.nodeProps.radius - 1) * a,
      y: t.y + (n.nodeProps.radius - 1) * u
    }, e instanceof Pn ? i = {
      x: e.x - (n.nodeProps.radius + n.markerPadding) * a,
      y: e.y - (n.nodeProps.radius + n.markerPadding) * u
    } : i = {
      x: e.x,
      y: e.y
    };
  } else if (n.nodeProps.shape === rt.RECTANGLE) {
    const s = t.x + n.nodeProps.width * 0.5, o = t.y + n.nodeProps.height * 0.5;
    let l, a;
    e instanceof Pn ? (l = e.x + n.nodeProps.width * 0.5, a = e.y + n.nodeProps.height * 0.5) : (l = e.x, a = e.y);
    const u = l - s, c = a - o;
    let f = Math.sqrt(u * u + c * c);
    f === 0 && (f = Number.EPSILON);
    const h = u / f, p = c / f;
    r = ti(
      s,
      o,
      n.nodeProps.width,
      n.nodeProps.height,
      h,
      p,
      2
    ), e instanceof Pn ? i = ti(
      l,
      a,
      n.nodeProps.width,
      n.nodeProps.height,
      -h,
      -p,
      -n.markerPadding + 1
    ) : i = { x: l, y: a };
  }
  return `M${r.x},${r.y}
          L${i.x},${i.y}`;
}
function ss(t, e, n) {
  if (n.nodeProps.shape === rt.CIRCLE) {
    const r = new nt([[t.x, t.y]]), i = new nt([[e.x, e.y]]), s = nt.subtract(i, r), o = s.norm("frobenius"), l = s.divide(o), a = ei(10), u = Vt(l, -a).multiply(n.nodeProps.radius - 1).add(r), c = nt.multiply(l, -1), f = Vt(c, a).multiply(n.nodeProps.radius).add(i).add(Vt(c, a).multiply(2 * n.markerBoxSize)), h = 1.2 * o;
    return `M${u.get(0, 0)},${u.get(0, 1)}
          A${h},${h},0,0,1,${f.get(0, 0)},${f.get(0, 1)}`;
  } else if (n.nodeProps.shape === rt.RECTANGLE) {
    const r = t.x + n.nodeProps.width * 0.5, i = t.y + n.nodeProps.height * 0.5, s = e.x + n.nodeProps.width * 0.5, o = e.y + n.nodeProps.height * 0.5, l = new nt([[r, i]]), a = new nt([[s, o]]), u = nt.subtract(a, l), c = u.norm("frobenius"), f = u.divide(c), h = ei(30), p = ti(
      r,
      i,
      n.nodeProps.width,
      n.nodeProps.height,
      f.get(0, 0),
      f.get(0, 1),
      2
    ), g = Vt(f, -h).add([[p.x, p.y]]), y = ti(
      s,
      o,
      n.nodeProps.width,
      n.nodeProps.height,
      -f.get(0, 0),
      -f.get(0, 1)
    ), w = nt.multiply(f, -1), d = Vt(w, h).add([[y.x, y.y]]).add(Vt(w, h).multiply(2 * n.markerBoxSize)), P = c;
    return `M${g.get(0, 0)},${g.get(0, 1)}
          A${P},${P},0,0,1,${d.get(0, 0)},${d.get(0, 1)}`;
  } else
    return "";
}
function Du(t, e, n) {
  const r = new nt([e]);
  if (n.nodeProps.shape === rt.CIRCLE) {
    const i = new nt([[t.x, t.y]]);
    i.get(0, 0) === r.get(0, 0) && i.get(0, 1) === r.get(0, 1) && r.add([[0, 1]]);
    const s = nt.subtract(i, r), o = s.divide(s.norm("frobenius")), l = ei(40), a = Vt(o, l).multiply(n.nodeProps.radius - 1).add(i), u = Vt(o, -l).multiply(n.nodeProps.radius).add(i).add(Vt(o, -l).multiply(2 * n.markerBoxSize));
    return `M${a.get(0, 0)},${a.get(0, 1)}
              A${n.nodeProps.radius},${n.nodeProps.radius},0,1,0,${u.get(0, 0)},${u.get(0, 1)}`;
  } else if (n.nodeProps.shape === rt.RECTANGLE) {
    const i = t.x + n.nodeProps.width * 0.5, s = t.y + n.nodeProps.height * 0.5, o = new nt([[i, s]]);
    o.get(0, 0) === r.get(0, 0) && o.get(0, 1) === r.get(0, 1) && r.add([[0, 1]]);
    const l = nt.subtract(o, r), a = l.divide(l.norm("frobenius")), u = ei(45);
    let c, f, h = 0.5 * n.nodeProps.width, p = 0.5 * n.nodeProps.height;
    const g = dm(
      l.get(0, 0),
      l.get(0, 1),
      30
    );
    if (g === xt.BOTTOMLEFT || g === xt.BOTTOMRIGHT || g === xt.TOPLEFT || g === xt.TOPRIGHT) {
      let y = pm(g, t, n);
      c = y.start, f = y.end, n.nodeProps.width > n.nodeProps.height ? (g === xt.TOPLEFT || g === xt.BOTTOMRIGHT) && (h = 0.25 * n.nodeProps.width) : n.nodeProps.height > n.nodeProps.width && (g === xt.TOPRIGHT || g === xt.BOTTOMLEFT) && (p = 0.25 * n.nodeProps.height);
    } else g === xt.LEFT || g === xt.RIGHT ? (c = Vt(a, u).multiply(0.5 * n.nodeProps.width - 1).add(o), f = Vt(a, -u).multiply(0.5 * n.nodeProps.height - 1).add(o).add(Vt(a, -u).multiply(2 * n.markerBoxSize))) : (c = Vt(a, u).multiply(0.5 * n.nodeProps.height - 1).add(o), f = Vt(a, -u).multiply(0.5 * n.nodeProps.width - 1).add(o).add(Vt(a, -u).multiply(2 * n.markerBoxSize)));
    return `M${c.get(0, 0)},${c.get(0, 1)} A${h},${p}, 0, 1, 0, ${f.get(0, 0)},${f.get(0, 1)}`;
  } else
    return "";
}
function nl(t, e) {
  return t.x > e.x;
}
function ti(t, e, n, r, i, s, o = 0) {
  const l = t - 0.5 * n, a = t + 0.5 * n, u = e - 0.5 * r, c = e + 0.5 * r;
  i === 0 && (i = Number.EPSILON), s === 0 && (s = Number.EPSILON);
  const f = i < 0 ? l : a, h = s < 0 ? u : c, p = (f - t) / i, g = (h - e) / s, y = Math.min(p, g);
  let w = t + y * i, d = e + y * s;
  if (o !== 0)
    if (p < g) {
      let P;
      f === l ? P = 1 : P = -1, w = w + o * P;
    } else {
      let P;
      h === u ? P = 1 : P = -1, d = d + o * P;
    }
  return { x: w, y: d };
}
function dm(t, e, n = 30) {
  let r = gm(Math.atan2(t, e));
  return r < 0 && (r += 360), en(r, 0, n) ? xt.BOTTOMLEFT : en(r, [0, 90], -n) ? xt.BOTTOM : en(r, 90, n) ? xt.BOTTOMRIGHT : en(r, [90, 180], -n) ? xt.RIGHT : en(r, 180, n) ? xt.TOPRIGHT : en(r, [180, 270], -n) ? xt.TOP : en(r, 270, n) ? xt.TOPLEFT : xt.LEFT;
}
function pm(t, e, n) {
  const r = e.x, i = e.y, s = n.nodeProps.shape === rt.RECTANGLE ? n.nodeProps.width : n.nodeProps.radius, o = n.nodeProps.shape === rt.RECTANGLE ? n.nodeProps.height : n.nodeProps.radius, l = n.markerBoxSize, a = {
    [xt.BOTTOMLEFT]: {
      start: [r + 2, i + o - 1],
      end: [r + s - 2 * l, i + o + 2 * l]
    },
    [xt.BOTTOM]: {
      start: [r + 0.5 * s, i + o - 1],
      end: [r + s - 2 * l, i + 0.5 * o - 2 * l]
    },
    [xt.BOTTOMRIGHT]: {
      start: [r + s - 2, i + o - 1],
      end: [r + s + 2 * l, i + 4]
    },
    [xt.RIGHT]: {
      start: [r + 2, i + o - 1],
      end: [r + s - 2 * l, i + o + 2 * l]
    },
    [xt.TOPRIGHT]: {
      start: [r + s - 2, i + 1],
      end: [r + 4, i - 2 * l]
    },
    [xt.TOP]: {
      start: [r + 2, i + o - 1],
      end: [r + s - 2 * l, i + o + 2 * l]
    },
    [xt.TOPLEFT]: {
      start: [r + 2, i + 1],
      end: [r - 2 * l, i + o - 2 * l]
    },
    [xt.LEFT]: {
      start: [r + 2, i + o - 1],
      end: [r + s - 2 * l, i + o + 2 * l]
    }
  }, { start: u, end: c } = a[t];
  return {
    start: new nt([u]),
    end: new nt([c])
  };
}
function en(t, e, n = 0) {
  t = (t + 360) % 360;
  let r, i;
  return typeof e == "number" ? (r = (e - n + 360) % 360, i = (e + n) % 360) : (r = (e[0] - n + 360) % 360, i = (e[1] + n) % 360), r < i ? t >= r && t <= i : t >= r || t <= i;
}
function ei(t) {
  return t * (Math.PI / 180);
}
function gm(t) {
  return t * (180 / Math.PI);
}
function Vt(t, e) {
  const n = t.get(0, 0), r = t.get(0, 1);
  return new nt([
    [
      n * Math.cos(e) - r * Math.sin(e),
      n * Math.sin(e) + r * Math.cos(e)
    ]
  ]);
}
class mm {
  constructor() {
    _t(this, "persistSettingsLocalStorage", !1);
    _t(this, "hasToolbar", !1);
    // private _nodeProps: NodeProps = { shape: NodeShape.CIRCLE, radius: 48 }
    _t(this, "_nodeProps", {
      shape: rt.RECTANGLE,
      width: 128,
      height: 96,
      cornerRadius: 4
    });
    _t(this, "showNodeLabels", !0);
    _t(this, "nodePhysicsEnabled", !1);
    _t(this, "isGraphEditableInGUI", !0);
    _t(this, "zoomEnabled", !1);
    _t(this, "showLinkLabels", !0);
    _t(this, "fixedLinkDistanceEnabled", !1);
    _t(this, "markerBoxSize", 4);
    _t(this, "_markerPadding", 2 * this.markerBoxSize);
  }
  set nodeSize(e) {
    this.nodeProps.shape === rt.CIRCLE ? typeof e == "number" ? this.nodeProps.radius = e : this.nodeProps.radius = e.radius ?? 24 : this.nodeProps.shape === rt.RECTANGLE && (typeof e == "number" ? (this.nodeProps.width = e, this.nodeProps.height = e) : (this.nodeProps.width = e.width ?? 48, this.nodeProps.height = e.height ?? 48));
  }
  get nodeSize() {
    return this.nodeProps.shape === rt.CIRCLE ? { radius: this.nodeProps.radius } : { width: this.nodeProps.width, height: this.nodeProps.height };
  }
  set nodeProps(e) {
    this._nodeProps = e, e.shape === rt.CIRCLE ? this.nodeSize = e.radius : e.shape === rt.RECTANGLE && (this.nodeSize = { width: e.width, height: e.height });
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
}
function wm(t) {
  const e = t.replace(/\r\n/g, `
`).split(`
`), n = e.findIndex((l) => l.trim().startsWith("#")), r = n !== -1 ? e.slice(0, n) : e, i = n !== -1 ? e.slice(n + 1) : [], s = [];
  if (r.length)
    for (const l of r) {
      let [, a, u, c] = (l.match(/(\w+) (.*) \/COLOR:\/(.+)/) || l.match(/(\w+) (.*)/) || l.match(/(\w+)/) || []).map((f) => f.trim());
      u != null && u.includes("/COLOR:/") && (c = u, u = ""), a && s.push({
        idImported: a,
        label: u,
        color: c == null ? void 0 : c.replace("/COLOR:/", "")
      });
    }
  const o = [];
  if (i.length)
    for (const l of i) {
      let [, a, u, c, f] = (l.match(/(\w+) (\w+) (.*) \/COLOR:\/(.+)/) || l.match(/(\w+) (\w+) (.*)/) || l.match(/(\w+) (\w+)/) || []).map((h) => h.trim());
      c != null && c.includes("/COLOR:/") && (f = c, c = ""), a && u && o.push({
        sourceIdImported: a,
        targetIdImported: u,
        label: c,
        color: f == null ? void 0 : f.replace("/COLOR:/", "")
      });
    }
  return [s, o];
}
function ym(t) {
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
const _m = {
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
}, zu = {
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
}, Rt = {
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
    const a = I.map([e, n], (u) => {
      const c = o - I.getVersionPrecision(u), f = u + new Array(c + 1).join(".0");
      return I.map(f.split("."), (h) => new Array(20 - h.length).join("0") + h).reverse();
    });
    for (r && (l = o - Math.min(i, s)), o -= 1; o >= l; ) {
      if (a[0][o] > a[1][o])
        return 1;
      if (a[0][o] === a[1][o]) {
        if (o === l)
          return 0;
        o -= 1;
      } else if (a[0][o] < a[1][o])
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
      typeof o == "object" && o !== null && Object.keys(o).forEach((a) => {
        r[a] = o[a];
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
    return _m[e];
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
    return zu[e] || "";
  }
}
const bt = /version\/(\d+(\.?_?\d+)+)/i, vm = [
  /* Googlebot */
  {
    test: [/googlebot/i],
    describe(t) {
      const e = {
        name: "Googlebot"
      }, n = I.getFirstMatch(/googlebot\/(\d+(\.\d+))/i, t) || I.getFirstMatch(bt, t);
      return n && (e.version = n), e;
    }
  },
  /* Opera < 13.0 */
  {
    test: [/opera/i],
    describe(t) {
      const e = {
        name: "Opera"
      }, n = I.getFirstMatch(bt, t) || I.getFirstMatch(/(?:opera)[\s/](\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  /* Opera > 13.0 */
  {
    test: [/opr\/|opios/i],
    describe(t) {
      const e = {
        name: "Opera"
      }, n = I.getFirstMatch(/(?:opr|opios)[\s/](\S+)/i, t) || I.getFirstMatch(bt, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/SamsungBrowser/i],
    describe(t) {
      const e = {
        name: "Samsung Internet for Android"
      }, n = I.getFirstMatch(bt, t) || I.getFirstMatch(/(?:SamsungBrowser)[\s/](\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/Whale/i],
    describe(t) {
      const e = {
        name: "NAVER Whale Browser"
      }, n = I.getFirstMatch(bt, t) || I.getFirstMatch(/(?:whale)[\s/](\d+(?:\.\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/MZBrowser/i],
    describe(t) {
      const e = {
        name: "MZ Browser"
      }, n = I.getFirstMatch(/(?:MZBrowser)[\s/](\d+(?:\.\d+)+)/i, t) || I.getFirstMatch(bt, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/focus/i],
    describe(t) {
      const e = {
        name: "Focus"
      }, n = I.getFirstMatch(/(?:focus)[\s/](\d+(?:\.\d+)+)/i, t) || I.getFirstMatch(bt, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/swing/i],
    describe(t) {
      const e = {
        name: "Swing"
      }, n = I.getFirstMatch(/(?:swing)[\s/](\d+(?:\.\d+)+)/i, t) || I.getFirstMatch(bt, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/coast/i],
    describe(t) {
      const e = {
        name: "Opera Coast"
      }, n = I.getFirstMatch(bt, t) || I.getFirstMatch(/(?:coast)[\s/](\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/opt\/\d+(?:.?_?\d+)+/i],
    describe(t) {
      const e = {
        name: "Opera Touch"
      }, n = I.getFirstMatch(/(?:opt)[\s/](\d+(\.?_?\d+)+)/i, t) || I.getFirstMatch(bt, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/yabrowser/i],
    describe(t) {
      const e = {
        name: "Yandex Browser"
      }, n = I.getFirstMatch(/(?:yabrowser)[\s/](\d+(\.?_?\d+)+)/i, t) || I.getFirstMatch(bt, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/ucbrowser/i],
    describe(t) {
      const e = {
        name: "UC Browser"
      }, n = I.getFirstMatch(bt, t) || I.getFirstMatch(/(?:ucbrowser)[\s/](\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/Maxthon|mxios/i],
    describe(t) {
      const e = {
        name: "Maxthon"
      }, n = I.getFirstMatch(bt, t) || I.getFirstMatch(/(?:Maxthon|mxios)[\s/](\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/epiphany/i],
    describe(t) {
      const e = {
        name: "Epiphany"
      }, n = I.getFirstMatch(bt, t) || I.getFirstMatch(/(?:epiphany)[\s/](\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/puffin/i],
    describe(t) {
      const e = {
        name: "Puffin"
      }, n = I.getFirstMatch(bt, t) || I.getFirstMatch(/(?:puffin)[\s/](\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/sleipnir/i],
    describe(t) {
      const e = {
        name: "Sleipnir"
      }, n = I.getFirstMatch(bt, t) || I.getFirstMatch(/(?:sleipnir)[\s/](\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/k-meleon/i],
    describe(t) {
      const e = {
        name: "K-Meleon"
      }, n = I.getFirstMatch(bt, t) || I.getFirstMatch(/(?:k-meleon)[\s/](\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/micromessenger/i],
    describe(t) {
      const e = {
        name: "WeChat"
      }, n = I.getFirstMatch(/(?:micromessenger)[\s/](\d+(\.?_?\d+)+)/i, t) || I.getFirstMatch(bt, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/qqbrowser/i],
    describe(t) {
      const e = {
        name: /qqbrowserlite/i.test(t) ? "QQ Browser Lite" : "QQ Browser"
      }, n = I.getFirstMatch(/(?:qqbrowserlite|qqbrowser)[/](\d+(\.?_?\d+)+)/i, t) || I.getFirstMatch(bt, t);
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
      }, n = I.getFirstMatch(bt, t) || I.getFirstMatch(/blackberry[\d]+\/(\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/(web|hpw)[o0]s/i],
    describe(t) {
      const e = {
        name: "WebOS Browser"
      }, n = I.getFirstMatch(bt, t) || I.getFirstMatch(/w(?:eb)?[o0]sbrowser\/(\d+(\.?_?\d+)+)/i, t);
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
      }, n = I.getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.?_?\d+)+)/i, t) || I.getFirstMatch(bt, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/qupzilla/i],
    describe(t) {
      const e = {
        name: "QupZilla"
      }, n = I.getFirstMatch(/(?:qupzilla)[\s/](\d+(\.?_?\d+)+)/i, t) || I.getFirstMatch(bt, t);
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
      }, n = I.getFirstMatch(/(?:chromium)[\s/](\d+(\.?_?\d+)+)/i, t) || I.getFirstMatch(bt, t);
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
      }, n = I.getFirstMatch(bt, t);
      return n && (e.version = n), e;
    }
  },
  /* PlayStation 4 */
  {
    test: [/playstation 4/i],
    describe(t) {
      const e = {
        name: "PlayStation 4"
      }, n = I.getFirstMatch(bt, t);
      return n && (e.version = n), e;
    }
  },
  /* Safari */
  {
    test: [/safari|applewebkit/i],
    describe(t) {
      const e = {
        name: "Safari"
      }, n = I.getFirstMatch(bt, t);
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
], bm = [
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
], xm = [
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
        type: Rt.mobile,
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
        type: Rt.tablet,
        vendor: "Nexus"
      };
    }
  },
  /* iPad */
  {
    test: [/ipad/i],
    describe() {
      return {
        type: Rt.tablet,
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
        type: Rt.tablet,
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
        type: Rt.tablet,
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
        type: Rt.tablet,
        vendor: "Amazon"
      };
    }
  },
  /* Tablet */
  {
    test: [/tablet(?! pc)/i],
    describe() {
      return {
        type: Rt.tablet
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
        type: Rt.mobile,
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
        type: Rt.mobile,
        vendor: "Nexus"
      };
    }
  },
  /* Mobile */
  {
    test: [/[^-]mobi/i],
    describe() {
      return {
        type: Rt.mobile
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
        type: Rt.mobile,
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
        type: Rt.mobile
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
        type: Rt.mobile,
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
        type: Rt.tablet
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
        type: Rt.mobile
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
        type: Rt.desktop,
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
        type: Rt.desktop
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
        type: Rt.desktop
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
        type: Rt.tv
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
        type: Rt.tv
      };
    }
  }
], Em = [
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
    const e = I.find(vm, (n) => {
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
    const e = I.find(bm, (n) => {
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
    const e = I.find(xm, (n) => {
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
    const e = I.find(Em, (n) => {
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
      const a = e[l];
      typeof a == "string" ? (i[l] = a, s += 1) : typeof a == "object" && (n[l] = a, r += 1);
    }), r > 0) {
      const l = Object.keys(n), a = I.find(l, (c) => this.isOS(c));
      if (a) {
        const c = this.satisfies(n[a]);
        if (c !== void 0)
          return c;
      }
      const u = I.find(
        l,
        (c) => this.isPlatform(c)
      );
      if (u) {
        const c = this.satisfies(n[u]);
        if (c !== void 0)
          return c;
      }
    }
    if (s > 0) {
      const l = Object.keys(i), a = I.find(l, (u) => this.isBrowser(u, !0));
      if (a !== void 0)
        return this.compareVersion(i[a]);
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
class km {
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
    return zu;
  }
  static get ENGINE_MAP() {
    return ze;
  }
  static get OS_MAP() {
    return zt;
  }
  static get PLATFORMS_MAP() {
    return Rt;
  }
}
const Sm = /* @__PURE__ */ se("div", { class: "graph-controller__graph-host uninitialised" }, null, -1), Pm = /* @__PURE__ */ bs({
  __name: "GraphComponent",
  setup(t, { expose: e }) {
    const n = Wi(() => {
      const m = document.querySelectorAll("graph-component");
      let k;
      for (let E = 0; E < m.length; E++) {
        const M = m[E], L = Nt(M.shadowRoot);
        let V;
        if (L.empty() ? V = Nt(
          ".graph-controller__graph-host.uninitialised"
        ) : V = L.select(
          ".graph-controller__graph-host.uninitialised"
        ), !V.empty()) {
          V.classed("uninitialised", !1), k = V;
          break;
        }
      }
      return k === void 0 && (k = Nt(
        ".graph-controller__graph-host.uninitialised"
      ), k.classed("uninitialised", !1)), k;
    }), r = Wi(() => {
      let m = n.value.node().parentElement;
      m || (m = n.value.node().getRootNode().host);
      let k = m.getAttribute("id");
      return k || "gc";
    });
    Dl(() => {
      re();
    }), zl(() => {
      ve(), window.addEventListener("resize", Gs);
    }), xs(() => {
      window.removeEventListener("resize", Gs);
    });
    const s = km.getParser(window.navigator.userAgent).getPlatformType(!0);
    let o = !1;
    const l = to(new Yo()), a = to(!1), u = oi(new mm());
    let c, f = 400, h = 400, p, g, y, w, d, P, T, _, S, R = 0, D = 0, H = 1, Z, B;
    e({
      getGraph: Q,
      setGraph: ut,
      printGraph: K,
      deleteElement: x,
      setLabel: z,
      setColor: N,
      setNodeSize: F,
      setNodeShape: $,
      setNodeProps: X,
      setDeletable: Y,
      setLabelEditable: it,
      setNodesLinkPermission: st,
      setNodesFixedPosition: Et,
      setEditability: gt,
      toggleNodeLabels: kt,
      toggleLinkLabels: vt,
      toggleZoom: It,
      toggleNodePhysics: mt,
      toggleFixedLinkDistance: wt,
      toggleGraphEditingInGUI: jt,
      resetView: Ye
    });
    function Q(m = "json", k = !0, E = !0, M = !0) {
      if (m.toLowerCase() === "json")
        return JSON.parse(
          l.value.toJSON(
            u.showLinkLabels,
            u.showLinkLabels,
            k,
            k,
            E,
            M,
            M
          )
        );
      if (m.toLowerCase() === "tgf")
        return l.value.toTGF(u.showNodeLabels, u.showLinkLabels, !0, !0);
      console.error('Invalid format while using getGraph(). Please choose "JSON" or "TGF".');
    }
    function ut(m) {
      typeof m == "object" || typeof m == "string" ? Hu(m) : Hs();
    }
    function K(m = "json", k = !0, E = !0, M = !0) {
      m.toLowerCase() === "json" ? console.log(
        l.value.toJSON(
          u.showLinkLabels,
          u.showLinkLabels,
          k,
          k,
          E,
          M,
          M
        )
      ) : console.log(l.value.toTGF(u.showNodeLabels, u.showLinkLabels));
    }
    function x(m) {
      if (m !== void 0) {
        const [k, E] = je(m);
        for (const M of k)
          d.filter((L) => L.id === M).each(function(L) {
            let V = l.value.removeNode(L);
            if (V !== void 0) {
              let [at, Pt] = V;
              Er(at, n.value), Pt.forEach((Mt) => {
                tn(Mt, n.value);
              });
            }
          });
        for (const M of E)
          w.filter((L) => L.id === M).each(function(L) {
            let V = l.value.removeLink(L);
            V !== void 0 && tn(V, n.value);
          });
      } else
        d.each(function(k) {
          let E = l.value.removeNode(k);
          if (E !== void 0) {
            let [M, L] = E;
            Er(M, n.value), L.forEach((V) => {
              tn(V, n.value);
            });
          }
        }), w.each(function(k) {
          let E = l.value.removeLink(k);
          E !== void 0 && tn(E, n.value);
        });
      a.value = l.value.nodes.length > 0, U();
    }
    function z(m, k) {
      if (k !== void 0) {
        const [E, M] = je(k);
        for (const L of E)
          d.filter((V) => V.id === L).each((V) => {
            Rn(V, m);
          });
        for (const L of M)
          w.filter((V) => V.id === L).each((V) => {
            Rn(V, m);
          });
      } else
        d.each((E) => {
          Rn(E, m);
        }), w.each((E) => {
          Rn(E, m);
        });
    }
    function N(m, k) {
      if (k !== void 0) {
        const [E, M] = je(k);
        Vs(M);
        for (const L of E)
          d.selectAll(".graph-controller__node").filter((V) => V.id === L).each((V) => V.color = m).style("fill", m);
        for (const L of M)
          w.selectAll(".graph-controller__link").filter((V) => V.id === L).each((V) => V.color = m).style("stroke", m);
      } else
        d.selectAll(".graph-controller__node").each((E) => E.color = m).style("fill", m), Vs(l.value.links.map((E) => E.id)), w.selectAll(".graph-controller__link").each((E) => E.color = m).style("stroke", m);
      is(y, r.value, u, m), U();
    }
    function F(m, k) {
      typeof m == "number" && typeof k == "number" && u.nodeProps.shape === rt.RECTANGLE ? u.nodeSize = { width: m, height: k } : typeof m == "number" || u.nodeProps.shape === rt.CIRCLE && mn(["radius"], Object.keys(m), !1) || u.nodeProps.shape === rt.RECTANGLE && mn(["width", "height"], Object.keys(m), !1) ? u.nodeSize = m : sn(
        "Invalid Size Object",
        `For circular nodes: {radius: number}
For rectangular nodes: {width: number, height: number}`
      ), Ye();
    }
    function $(m) {
      if (m === "circle") m = rt.CIRCLE;
      else if (m === "rect" || m === "rectangle") m = rt.RECTANGLE;
      else {
        sn(
          "Invalid Shape",
          `For circular nodes: 'circle'
For rectangular nodes: 'rect' or 'rectangle'`
        );
        return;
      }
      let k = u.nodeSize;
      if (u.nodeProps.shape !== m) {
        if (m === rt.CIRCLE) {
          u.nodeProps = {
            shape: m,
            radius: k.width / 2
          };
          for (let E of l.value.nodes)
            E.x = E.x + u.nodeProps.radius, E.y = E.y + u.nodeProps.radius;
        } else if (m === rt.RECTANGLE) {
          u.nodeProps = {
            shape: m,
            width: k.radius * 2,
            height: k.radius * 2,
            cornerRadius: 4
          };
          for (let E of l.value.nodes)
            E.x = E.x - u.nodeProps.width / 2, E.y = E.y - u.nodeProps.height / 2;
        }
        Ye();
      }
    }
    function X(m) {
      if (mn(["shape"], Object.keys(m), !1)) {
        if (m.shape === rt.CIRCLE) {
          const k = ["shape", "radius"];
          mn(k, Object.keys(m), !0) && (u.nodeProps = m), Dn(k, Object.keys(m));
        } else if (m.shape === rt.RECTANGLE) {
          const k = ["shape", "width", "height", "cornerRadius"];
          mn(k, Object.keys(m), !0) && (u.nodeProps = m), Dn(k, Object.keys(m));
        }
        Ye();
      } else
        sn(
          "Invalid NodeProps Object",
          `For circular nodes: {shape: NodeShape, radius: number}
For rectangular nodes: {shape: 'rect', width: number, height: number, cornerRadius: number}`
        );
    }
    function Y(m, k) {
      if (k !== void 0) {
        const [E, M] = je(k);
        for (const L of E)
          d.filter((V) => V.id === L).each((V) => {
            V.deletable = m;
          });
        for (const L of M)
          w.filter((V) => V.id === L).each((V) => {
            V.deletable = m;
          });
      } else
        d.each((E) => {
          E.deletable = m;
        }), w.each((E) => {
          E.deletable = m;
        });
    }
    function it(m, k) {
      if (k !== void 0) {
        const [E, M] = je(k);
        for (const L of E)
          d.filter((V) => V.id === L).each((V) => {
            V.labelEditable = m;
          });
        for (const L of M)
          w.filter((V) => V.id === L).each((V) => {
            V.labelEditable = m;
          });
      } else
        d.each((E) => {
          E.labelEditable = m;
        }), w.each((E) => {
          E.labelEditable = m;
        });
    }
    function st(m, k, E) {
      if (E !== void 0) {
        const [M, L] = je(E);
        for (const V of M)
          d.filter((at) => at.id === V).each((at) => {
            at.allowIncomingLinks = m, at.allowOutgoingLinks = k;
          });
      } else
        d.each((M) => {
          M.allowIncomingLinks = m, M.allowOutgoingLinks = k;
        });
    }
    function Et(m, k) {
      if (k !== void 0) {
        const [E, M] = je(k);
        for (const L of E)
          d.filter((V) => V.id === L).each((V) => {
            kr(V, m);
          });
      } else
        d.each((E) => {
          kr(E, m);
        });
    }
    function gt(m, k) {
      const E = [
        "fixedPosition",
        "deletable",
        "labelEditable",
        "allowIncomingLinks",
        "allowOutgoingLinks"
      ], M = ["deletable", "labelEditable"];
      if (k !== void 0) {
        const [L, V] = je(k), at = L.length === 0;
        for (const Pt of L)
          d.filter((Mt) => Mt.id === Pt).each(function(Mt) {
            Mt.deletable = m.deletable ?? Mt.deletable, Mt.labelEditable = m.labelEditable ?? Mt.labelEditable, "fixedPosition" in m && kr(Mt, m.fixedPosition), "allowIncomingLinks" in m && (Mt.allowIncomingLinks = m.allowIncomingLinks ?? Mt.allowIncomingLinks), "allowOutgoingLinks" in m && (Mt.allowOutgoingLinks = m.allowOutgoingLinks ?? Mt.allowOutgoingLinks);
          });
        for (const Pt of V)
          w.selectAll(".graph-controller__link").filter((Mt) => Mt.id === Pt).each(function(Mt) {
            Mt.deletable = m.deletable ?? Mt.deletable, Mt.labelEditable = m.labelEditable ?? Mt.labelEditable;
          });
        Dn(
          at ? M : E,
          Object.keys(m)
        );
      } else
        d.each(function(L) {
          L.deletable = m.deletable ?? L.deletable, L.labelEditable = m.labelEditable ?? L.labelEditable, "fixedPosition" in m && kr(L, m.fixedPosition), "allowIncomingLinks" in m && (L.allowIncomingLinks = m.allowIncomingLinks ?? L.allowIncomingLinks), "allowOutgoingLinks" in m && (L.allowOutgoingLinks = m.allowOutgoingLinks ?? L.allowOutgoingLinks);
        }), w.selectAll(".graph-controller__link").each(function(L) {
          L.deletable = m.deletable ?? L.deletable, L.labelEditable = m.labelEditable ?? L.labelEditable;
        }), Dn(E, Object.keys(m));
      U();
    }
    function mt(m) {
      u.nodePhysicsEnabled = m, Ou(c, m, f, h);
    }
    function wt(m) {
      u.fixedLinkDistanceEnabled = m, Au(c, l.value, u, m);
    }
    function vt(m) {
      u.showLinkLabels = m;
    }
    function kt(m) {
      u.showNodeLabels = m;
    }
    function It(m) {
      u.zoomEnabled = m, Ye();
    }
    function jt(m) {
      u.isGraphEditableInGUI = m;
    }
    function re() {
      const m = (k) => k === "false" ? !1 : !!k;
      localStorage.showNodeLabels && (u.showNodeLabels = m(localStorage.showNodeLabels)), localStorage.enableNodePhysics && (u.nodePhysicsEnabled = m(localStorage.enableNodePhysics)), localStorage.showLinkLabels && (u.showLinkLabels = m(localStorage.showLinkLabels)), localStorage.enableFixedLinkDistance && (u.fixedLinkDistanceEnabled = m(localStorage.enableFixedLinkDistance)), localStorage.enableZoom && (u.zoomEnabled = m(localStorage.enableZoom)), localStorage.persistSettings && (u.persistSettingsLocalStorage = m(localStorage.persistSettings));
    }
    function ve() {
      f = n.value.node().clientWidth, h = n.value.node().clientHeight, p = Zg(
        (m) => v(m, u.zoomEnabled),
        u.zoomEnabled
      ), y = l0(
        n.value,
        p,
        (m) => u.isGraphEditableInGUI ? St(m) : null,
        (m) => u.isGraphEditableInGUI ? ot(m) : null,
        (m) => {
          u.isGraphEditableInGUI && (u.nodeProps.shape === rt.RECTANGLE ? C(
            Zt(m, y.node())[0] - 0.5 * u.nodeProps.width,
            Zt(m, y.node())[1] - 0.5 * u.nodeProps.height
          ) : C(
            Zt(m, y.node())[0],
            Zt(m, y.node())[1]
          ));
        }
      ), h0(y, r.value, u, l.value.getNonDefaultLinkColors()), P = d0(y), w = a0(y), d = c0(y), c = L0(l.value, u, f, h, () => O()), g = o0(c, f, h, u.nodeProps), U();
    }
    function v(m, k = !0) {
      k && (R = m.transform.x, D = m.transform.y, H = m.transform.k, y.attr("transform", `translate(${R},${D})scale(${H})`));
    }
    function b(m, k, E, M, L = !0, V = !0) {
      let at = l.value.createLink(
        m.id,
        k.id,
        E,
        M,
        L,
        V
      );
      at !== void 0 && n0(at, n.value), U();
    }
    function C(m, k, E, M, L, V, at = { x: !1, y: !1 }, Pt = !0, Mt = !0, _i = !0, Uu = !0) {
      let Wu = l.value.createNode(
        m ?? f / 2,
        k ?? h / 2,
        E,
        M,
        L,
        V,
        at,
        Pt,
        Mt,
        _i,
        Uu
      );
      e0(Wu, n.value), a.value = !0, U();
    }
    function O() {
      d.attr("transform", (m) => `translate(${m.x},${m.y})`), w.selectAll(".graph-controller__link, .graph-controller__link-click-box").attr("d", (m) => (A(m), fm(m, f, h, u))), W();
    }
    function A(m) {
      let k = m.pathType;
      m.pathType = hm(m.source, m.target, l.value), k !== m.pathType && U();
    }
    function q() {
      const m = T, k = Nt(
        n.value.node().querySelector(`#${r.value + "-node-" + m.id}`)
      ).classed("on-deletion");
      if (m !== void 0 && !k) {
        const E = _;
        E !== void 0 ? P.attr("d", () => m.id === E.id ? Du(m, [f / 2, h / 2], u) : l.value.hasBidirectionalConnection(m, E) ? Un(m, E, u) : ss(m, E, u)) : S !== void 0 && P.attr(
          "d",
          Un(m, { x: S[0], y: S[1] }, u)
        );
      }
    }
    function U(m = 0.5) {
      var k;
      w = w.data(l.value.links, (E) => E.id).join((E) => {
        const M = E.append("g").classed("graph-controller__link-container", !0);
        return M.append("path").classed("graph-controller__link", !0).style("stroke", (L) => L.color ? L.color : "").attr("id", (L) => r.value + "-link-" + L.id), M.append("path").classed("graph-controller__link-click-box", !0).on("dblclick", (L) => {
          ie(L);
        }).on("pointerout", (L) => Oe(L)).on("pointerdown", (L, V) => {
          i0(V, L.button, n.value), u.isGraphEditableInGUI && Xe(L, V);
        }).on("pointerup", (L, V) => {
          ur(L, V);
        }), M.append("text").attr("class", (L) => {
          var V;
          return `graph-controller__${(V = L.pathType) == null ? void 0 : V.toLowerCase()}-path-text`;
        }).append("textPath").attr(
          "class",
          (L) => L.label ? "graph-controller__link-label" : "graph-controller__link-label-placeholder"
        ).attr("href", (L) => `#${r.value + "-link-" + L.id}`).text((L) => L.label ? L.label : "add label").on("click", (L, V) => {
          u.isGraphEditableInGUI && Bs(L, V);
        }).on("dblclick", (L) => {
          ie(L);
        }), M.append("foreignObject").classed("graph-controller__link-label-mathjax-container", !0).attr("xmlns", "http://www.w3.org/2000/svg").attr("width", 1).attr("height", 1).html(
          (L) => `<div class='${L.label ? "graph-controller__link-label" : "graph-controller__link-label-placeholder"}'>
                        </div>`
        ).on("click", (L, V) => {
          u.isGraphEditableInGUI && Bs(L, V);
        }).on("dblclick", (L) => {
          ie(L);
        }), M;
      }), w.selectChild(".graph-controller__link").attr("marker-start", function(E) {
        var M;
        if ((M = E.pathType) != null && M.includes("REVERSE")) {
          let L = `url(#${r.value}-link-arrow-reverse`;
          return E.color && (L += "-" + rr(E.color)), L += ")", L;
        } else
          return null;
      }).attr("marker-end", function(E) {
        var M;
        if ((M = E.pathType) != null && M.includes("REVERSE"))
          return null;
        {
          let L = `url(#${r.value}-link-arrow`;
          return E.color && (L += "-" + rr(E.color)), L += ")", L;
        }
      }), w.selectChild("text").attr("class", (E) => {
        var M;
        return `graph-controller__${(M = E.pathType) == null ? void 0 : M.toLowerCase()}-path-text`;
      }).attr("dy", (E) => {
        var M;
        return E.pathType === oe.REFLEXIVE ? 15 : E.pathType == oe.LINEREVERSE ? -10 : (M = E.pathType) != null && M.includes("REVERSE") ? 20 : -10;
      }).selectChild("textPath").attr(
        "class",
        (E) => E.label ? "graph-controller__link-label" : "graph-controller__link-label-placeholder"
      ).classed("hidden", (E) => !u.showLinkLabels || !E.label && !E.labelEditable).classed("not-editable", !u.isGraphEditableInGUI).attr("startOffset", (E) => {
        var M;
        return (M = E.pathType) != null && M.includes("REVERSE") ? "46%" : "50%";
      }).text((E) => E.label ? E.label : "add label"), d = d.data(l.value.nodes, (E) => E.id).join(
        (E) => {
          const M = E.append("g").classed("graph-controller__node-container", !0).call(g).on("dblclick", (at) => {
            ie(at);
          }).on("pointerenter", (at, Pt) => Lt(Pt)).on("pointerout", (at, Pt) => Xt(Pt)).on("pointerdown", (at, Pt) => {
            r0(Pt, at.button, n.value), u.isGraphEditableInGUI && j(at, Pt);
          }).on("pointerup", (at, Pt) => {
            u.isGraphEditableInGUI && ot(at, Pt);
          }), L = M.append(u.nodeProps.shape).classed("graph-controller__node", !0).attr("id", (at) => `${r.value + "-node-" + at.id}`).style("fill", (at) => at.color ? at.color : "");
          u.nodeProps.shape === rt.CIRCLE ? L.attr("r", u.nodeProps.radius) : u.nodeProps.shape === rt.RECTANGLE && L.attr("width", u.nodeProps.width).attr("height", u.nodeProps.height).attr("rx", u.nodeProps.cornerRadius).attr("ry", u.nodeProps.cornerRadius);
          const V = M.append("foreignObject").classed("graph-controller__node-label-container", !0).attr("xmlns", "http://www.w3.org/2000/svg");
          return u.nodeProps.shape === rt.CIRCLE ? V.attr("width", 2 * u.nodeProps.radius).attr("height", 2 * u.nodeProps.radius).attr("x", -u.nodeProps.radius).attr("y", -u.nodeProps.radius) : u.nodeProps.shape === rt.RECTANGLE && V.attr("width", u.nodeProps.width).attr("height", u.nodeProps.height), V.append("xhtml:div").on("click", (at, Pt) => {
            u.isGraphEditableInGUI && cr(at, Pt);
          }).on("dblclick", (at) => {
            ie(at);
          }).on("pointerenter", (at, Pt) => Lt(Pt)).on("pointerout", (at, Pt) => Xt(Pt)), M;
        },
        (E) => (u.nodeProps.shape === rt.CIRCLE ? E.selectChild(".graph-controller__node").attr("r", u.nodeProps.radius) : u.nodeProps.shape === rt.RECTANGLE && E.selectChild(".graph-controller__node").attr("width", u.nodeProps.width).attr("height", u.nodeProps.height).attr("rx", u.nodeProps.cornerRadius).attr("ry", u.nodeProps.cornerRadius), E.selectChild("foreignObject").selectChild("div").classed(
          "hidden",
          (M) => !u.showNodeLabels || !M.label && !M.labelEditable
        ).classed("not-editable", !u.isGraphEditableInGUI), E)
      ), d.selectChild("foreignObject").selectChild("div").attr(
        "class",
        (E) => E.label ? "graph-controller__node-label" : "graph-controller__node-label-placeholder"
      ).classed("hidden", (E) => !u.showNodeLabels || !E.label && !E.labelEditable).text((E) => E.label ? E.label : "add label"), (k = window.MathJax) != null && k.version && window.MathJax.typesetPromise().then(() => {
        G();
      }), c.nodes(l.value.nodes), c.alpha(m).restart();
    }
    function G() {
      w.selectChild("text").selectChild("textPath").selectChild("mjx-container").each(function(m) {
        const k = this, E = m, M = Nt(k.parentNode.parentNode.parentNode).selectChild("foreignObject").selectChild("div").attr("class", "graph-controller__link-label").classed(
          "hidden",
          !u.showLinkLabels || !E.label && !E.labelEditable
        ).node();
        M.replaceChild(k, M.childNodes[0]);
      }), w.selectChild("text").selectChild("textPath").each(function() {
        const m = this;
        let k = !1;
        m.childNodes.forEach((M) => {
          var L;
          (M == null ? void 0 : M.nodeType) === Node.TEXT_NODE && ((L = M == null ? void 0 : M.textContent) == null ? void 0 : L.trim()) !== "" && (k = !0);
        }), k || Nt(m).text("I").attr("class", "graph-controller__link-label-placeholder mjx-hidden");
      }), W();
    }
    function W() {
      w.selectChild("text").selectChild("textPath").each(function() {
        const m = this, [k, E] = zs(m);
        Nt(m.parentNode.parentNode).select("foreignObject").attr("x", k).attr("y", E);
      });
    }
    function j(m, k) {
      (m.button === 2 || m.pointerType === "touch") && (Xo(m), k.allowOutgoingLinks && tt(k), k.deletable && (Z = setTimeout(() => {
        _ = void 0, J(k);
      }, 250)));
    }
    function J(m) {
      let k = n.value.node().querySelector(`#${r.value + "-node-" + m.id}`);
      Nt(k).classed("on-deletion", !0);
      let E = Nt(k.parentElement);
      if (u.nodeProps.shape === rt.CIRCLE) {
        let M = Dg().outerRadius(u.nodeProps.radius + 4).innerRadius(u.nodeProps.radius), L = [{ startAngle: 0, endAngle: 0 }];
        E.append("g").attr("class", "arc").selectAll("path.arc").data(L).enter().append("path").attr("class", "arc").style("fill", "black").style("opacity", 0.7).transition().duration(750).ease(Vo).attrTween("d", function(at) {
          let Pt = { startAngle: 0, endAngle: 2 * Math.PI }, Mt = Ts(at, Pt);
          return function(_i) {
            return M(Mt(_i));
          };
        }).on("end", () => et(m));
      } else if (u.nodeProps.shape === rt.RECTANGLE) {
        const M = f0(
          u.nodeProps.width,
          u.nodeProps.height,
          u.nodeProps.cornerRadius
        );
        let L = E.append("path").attr("fill", "none").attr("stroke", "black").attr("stroke-width", 4).attr("opacity", "0.7").attr("d", M), V = 2 * u.nodeProps.width + 2 * u.nodeProps.height;
        L.attr("stroke-dasharray", V).attr("stroke-dashoffset", V).transition().duration(750).ease(Vo).attr("stroke-dashoffset", 0).on("end", () => et(m));
      }
    }
    function et(m) {
      if (u.isGraphEditableInGUI) {
        let k = l.value.removeNode(m);
        if (k !== void 0) {
          let [E, M] = k;
          Er(E, n.value), M.forEach((L) => {
            tn(L, n.value);
          });
        }
        a.value = l.value.nodes.length > 0, yi(), U();
      }
    }
    function tt(m) {
      S = u.nodeProps.shape === rt.CIRCLE ? [m.x, m.y] : [m.x + 0.5 * u.nodeProps.width, m.y + 0.5 * u.nodeProps.height], T = m, P.attr("marker-end", `url(#${r.value}-draggable-link-arrow)`).classed("hidden", !1).attr("d", Un(m, { x: S[0], y: S[1] }, u)), U();
    }
    function ot(m, k = void 0) {
      ie(m), clearTimeout(Z), k && ft(k), yt();
    }
    function ft(m) {
      let k = n.value.node().querySelector(`#${r.value + "-node-" + m.id}`), E = Nt(k), M = Nt(k.parentElement);
      u.nodeProps.shape === rt.CIRCLE ? (E.classed("on-deletion", !1), M.select("g.arc").select("path.arc").interrupt().remove(), M.select("g.arc").remove()) : u.nodeProps.shape === rt.RECTANGLE && (E.classed("on-deletion") && M.select("path").attr("stroke-dasharray", 2 * u.nodeProps.width + 2 * u.nodeProps.height).attr("stroke-dashoffset", 0).transition().attr("stroke-dashoffset", 2 * u.nodeProps.width + 2 * u.nodeProps.height).on("end", () => {
        M.select("path").remove();
      }), E.classed("on-deletion", !1));
    }
    function yt() {
      const m = T, k = _;
      yi(), !(m === void 0 || k === void 0) && b(m, k);
    }
    function St(m) {
      if (ie(m), T !== void 0) {
        const k = nd(m, n.value.node())[0];
        S = [(k[0] - R) / H, (k[1] - D) / H], q();
      }
    }
    function Lt(m) {
      m.allowIncomingLinks && (_ = m);
    }
    function Xt(m) {
      m && ft(m), _ = void 0, clearTimeout(Z);
    }
    function Oe(m) {
      ie(m), clearTimeout(B);
    }
    function ur(m, k) {
      ie(m), clearTimeout(B), (m.button === 2 || m.pointerType === "touch") && k.deletable && ae(k);
    }
    function Xe(m, k) {
      (m.button === 2 || m.pointerType === "touch") && (Xo(m), k.deletable && (B = setTimeout(() => {
        ar(k);
      }, 250)));
    }
    function ar(m) {
      let k = n.value.node().querySelector(`#${r.value + "-link-" + m.id}`);
      if (Nt(k).classed("on-deletion", !0), k instanceof SVGPathElement) {
        let E = Nt(k), M = k.getTotalLength(), L = k.parentElement.querySelector("text"), V = Array.from(L.classList).some(
          (Mt) => Mt.includes("reverse")
        ), at = 0, Pt = V ? M : -M;
        E.attr("stroke-dasharray", M).attr("stroke-dashoffset", at).transition().duration(750).attr("stroke-dashoffset", Pt).on("end", () => Bt(m));
      }
    }
    function Bt(m) {
      let k = m.color;
      if (u.isGraphEditableInGUI) {
        let E = l.value.removeLink(m);
        E !== void 0 && tn(E, n.value), k && (l.value.hasNonDefaultLinkColor(k) || Oi(y, r.value, k));
      }
      U();
    }
    function ae(m) {
      let k = n.value.node().querySelector(`#${r.value + "-link-" + m.id}`);
      if (Nt(k).classed("on-deletion") && k instanceof SVGPathElement) {
        let E = Nt(k), M = k.getTotalLength();
        E.attr("stroke-dasharray", M).attr("stroke-dashoffset", M).transition().attr("stroke-dashoffset", 0).on("end", () => {
          E.attr("stroke-dasharray", null).attr("stroke-dashoffset", null);
        });
      }
      Nt(k).classed("on-deletion", !1);
    }
    function cr(m, k) {
      if (ie(m), k.labelEditable) {
        let E = u.nodeProps.shape === rt.CIRCLE ? [k.x, k.y] : [
          k.x + 0.5 * u.nodeProps.width,
          k.y + 0.5 * u.nodeProps.height
        ];
        Ds(k, E);
      }
    }
    function Bs(m, k) {
      if (k.labelEditable) {
        let E = m.target, M;
        E.nodeName === "textPath" ? M = E : M = E.closest(".graph-controller__link-container").querySelector("textPath");
        let L = zs(M);
        Ds(k, L);
      }
    }
    function Ds(m, k) {
      let E = m instanceof Pn ? "node" : "link";
      const M = document.createElement("input");
      M.setAttribute("class", "graph-controller__label-input"), M.setAttribute("id", `${E}-label-input-field`), m.label == null ? M.value = "" : M.value = m.label, M.placeholder = `Enter ${E} label`;
      const L = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
      L.setAttribute("width", "100%"), L.setAttribute("height", "100%"), L.setAttribute("x", `${k[0] - 90}`), L.setAttribute("y", `${k[1] - 12}`), L.append(M), n.value.select("svg").select("g").node().append(L), M.focus(), s !== "desktop" && (o = !0), M.ondblclick = function(at) {
        ie(at);
      };
      let V = !1;
      M.onkeyup = function(at) {
        at.key === "Enter" ? (V = !0, M.blur()) : at.key === "Escape" && (M.value = "", M.blur());
      }, M.onblur = function() {
        V && Rn(m, M.value.trim()), L.remove(), s !== "desktop" && (o = !1);
      };
    }
    function Rn(m, k) {
      s0(m, k, n.value), m.label = k, U();
      let E = m instanceof Pn ? "node" : "link";
      E === "link" ? Vu(m) : E === "node" && k !== "" && Gu(m);
    }
    function Vu(m) {
      var E;
      const k = n.value.node().querySelector(
        `#${r.value + "-link-" + m.id}`
      ).parentElement;
      (E = k.querySelector("mjx-container")) == null || E.remove(), k.querySelector("div").setAttribute("class", "graph-controller__link-label-placeholder"), U();
    }
    function Gu(m) {
      const k = n.value.node().querySelector(`#${r.value + "-node-" + m.id}`).parentElement;
      if (k) {
        const E = k.parentElement;
        k.remove(), E.append(k);
      }
    }
    function zs(m) {
      let k = n.value.select("svg").node().getBoundingClientRect(), E = m.getBoundingClientRect(), M = (E.x - k.x - R) / H, L = (E.y - k.y - D) / H;
      return [M, L];
    }
    function yi() {
      P == null || P.classed("hidden", !0).attr("marker-end", "null"), T = void 0, _ = void 0, S = void 0;
    }
    function Hu(m) {
      let k, E;
      try {
        if (typeof m == "string")
          [k, E] = wm(m);
        else if (typeof m == "object")
          [k, E] = ym(m);
        else {
          sn("Invalid graph import type:", "Must either be TGF or JSON.");
          return;
        }
      } catch (M) {
        sn("Error during parsing:", `Invalid data format:
` + M);
        return;
      }
      Hs(), qu(k, E);
    }
    function qu(m, k) {
      for (let M of m)
        C(
          M.x,
          M.y,
          M.idImported,
          M.label,
          M.color,
          u.nodeProps.shape,
          M.fixedPosition,
          M.deletable,
          M.labelEditable,
          M.allowIncomingLinks,
          M.allowOutgoingLinks
        );
      const E = (M) => l.value.nodes.find((L) => L.idImported === M);
      for (let M of k) {
        let L = E(M.sourceIdImported), V = E(M.targetIdImported);
        L && V && (b(
          L,
          V,
          M.label,
          M.color,
          M.deletable,
          M.labelEditable
        ), M.color && is(y, r.value, u, M.color));
      }
    }
    function Vs(m) {
      for (let k of m) {
        const E = l.value.links.filter((M) => M.id === k).map((M) => M.color).shift();
        E && (l.value.hasNonDefaultLinkColor(E, k) ? l.value.getLinkIdsWithNonDefaultLinkColors(
          E,
          k
        ).every(
          (V) => m.includes(V)
        ) && Oi(y, r.value, E) : Oi(y, r.value, E));
      }
    }
    function Ye() {
      c.stop(), n.value.selectChildren().remove(), p = void 0, R = 0, D = 0, H = 1, y = void 0, P = void 0, w = void 0, d = void 0, c = void 0, yi(), re(), ve();
    }
    function Gs() {
      o || Ye();
    }
    function Hs() {
      l.value.links.forEach((m) => tn(m, n.value)), l.value.nodes.forEach((m) => Er(m, n.value)), l.value = new Yo(), a.value = !1, Ye();
    }
    return (m, k) => (Be(), De(ce, null, [
      Sm,
      Nr(se("div", null, [
        Pe(vf, {
          class: "graph-controller__info-text-background",
          "show-controls-graph": "",
          "show-latex-info": !0,
          "show-controls-environment": !1,
          "show-header": !0,
          "platform-type": Dr(s)
        }, null, 8, ["platform-type"])
      ], 512), [
        [Rr, !a.value]
      ])
    ], 64));
  }
});
/*! (c) Andrea Giammarchi - ISC */
const Mm = (() => {
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
    static withParsedCallback(l, a = "parsed") {
      const { prototype: u } = l, { connectedCallback: c } = u, f = a + "Callback", h = (g, y, w, d) => {
        y.disconnect(), w.removeEventListener(t, d), p(g);
      }, p = (g) => {
        n.length || requestAnimationFrame(i), n.push([g, f]);
      };
      return Object.defineProperties(
        u,
        {
          connectedCallback: {
            configurable: !0,
            writable: !0,
            value() {
              if (c && c.apply(this, arguments), f in this && !e.has(this)) {
                const g = this, { ownerDocument: y } = g;
                if (e.set(g, !1), y.readyState === "complete" || r(g))
                  p(g);
                else {
                  const w = () => h(g, d, y, w);
                  y.addEventListener(t, w);
                  const d = new MutationObserver(() => {
                    r(g) && h(g, d, y, w);
                  });
                  d.observe(g.parentNode, { childList: !0, subtree: !0 });
                }
              }
            }
          },
          [a]: {
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
function Nm(t, e, n) {
  const r = /* @__PURE__ */ bs(t);
  class i extends js {
    constructor(o) {
      super(r, o, e, n);
    }
  }
  return _t(i, "def", r), i;
}
const Cm = typeof HTMLElement < "u" ? Mm : class {
};
class js extends Cm {
  constructor(n, r = {}, i = {}, s) {
    super();
    /**
     * @internal
     */
    _t(this, "_instance", null);
    _t(this, "_connected", !1);
    _t(this, "_resolved", !1);
    _t(this, "_numberProps", null);
    _t(this, "_styles");
    _t(this, "_slots");
    _t(this, "_ob", null);
    this._def = n, this._props = r, this._config = i, this._config = $t(
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
    this._connected = !1, this._ob && (this._ob.disconnect(), this._ob = null), Tl(() => {
      this._connected || (So(null, this._root), this._instance = null);
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
      let a;
      if (o && !lt(o))
        for (const u in o) {
          const c = o[u];
          (c === Number || c && c.type === Number) && (u in this._props && (this._props[u] = qs(this._props[u])), (a || (a = /* @__PURE__ */ Object.create(null)))[Le(u)] = !0);
        }
      this._numberProps = a, s && this._resolveProps(i), this._config.shadowRoot || (this._slots = Array.from(this.children).map((u) => u.cloneNode(!0)), this.replaceChildren()), this._applyStyles(l), this._update();
    }, r = this._def.__asyncLoader;
    r ? r().then((i) => n(i, !0)) : n(this._def);
  }
  _resolveProps(n) {
    const { props: r } = n, i = lt(r) ? r : Object.keys(r || {});
    for (const s of Object.keys(this))
      s[0] !== "_" && i.includes(s) && this._setProp(s, this[s], !0, !1);
    for (const s of i.map(Le))
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
    const i = Le(n);
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
    So(this._createVNode(), this._root);
  }
  _createVNode() {
    let n = null;
    this._config.shadowRoot || (n = () => {
      const i = (s) => {
        const o = {};
        for (let l = 0, a = s.length; l < a; l++) {
          const u = s[l];
          o[u.nodeName] = u.nodeValue;
        }
        return o;
      };
      return this._slots.map((s) => {
        const o = s.attributes ? i(s.attributes) : {};
        return o.innerHTML = s.innerHTML, Pe(s.tagName, o, null);
      });
    });
    const r = Pe(this._def, $t({}, this._props), n);
    return this._instance || (r.ce = (i) => {
      this._instance = i, this._config.shadowRoot && (i.isCE = !0);
      const s = (l, a) => {
        this.dispatchEvent(
          new CustomEvent(l, {
            detail: a
          })
        );
      };
      i.emit = (l, ...a) => {
        s(l, a), ge(l) !== l && s(ge(l), a);
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
  /* @__PURE__ */ Nm(Pm, { shadowRoot: !1 })
  // With ShadowRoot without LaTeX
  // defineCustomElement(GraphEditor)
  /* for switching off the LaTeX control info background, in the graph editor template
  in the graph controls tag you can use :show-latex-info="true" */
);
