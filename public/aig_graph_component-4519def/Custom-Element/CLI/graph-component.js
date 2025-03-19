var Fu = Object.defineProperty;
var ju = (t, e, n) => e in t ? Fu(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var wt = (t, e, n) => ju(t, typeof e != "symbol" ? e + "" : e, n);
/**
* @vue/shared v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function Qi(t, e) {
  const n = new Set(t.split(","));
  return (r) => n.has(r);
}
const vt = {}, un = [], re = () => {
}, Bu = () => !1, Gr = (t) => t.charCodeAt(0) === 111 && t.charCodeAt(1) === 110 && // uppercase letter
(t.charCodeAt(2) > 122 || t.charCodeAt(2) < 97), Zi = (t) => t.startsWith("onUpdate:"), Ct = Object.assign, ts = (t, e) => {
  const n = t.indexOf(e);
  n > -1 && t.splice(n, 1);
}, zu = Object.prototype.hasOwnProperty, ft = (t, e) => zu.call(t, e), rt = Array.isArray, cn = (t) => Hr(t) === "[object Map]", Ko = (t) => Hr(t) === "[object Set]", ut = (t) => typeof t == "function", Tt = (t) => typeof t == "string", _n = (t) => typeof t == "symbol", Et = (t) => t !== null && typeof t == "object", Xo = (t) => (Et(t) || ut(t)) && ut(t.then) && ut(t.catch), Yo = Object.prototype.toString, Hr = (t) => Yo.call(t), Du = (t) => Hr(t).slice(8, -1), Jo = (t) => Hr(t) === "[object Object]", es = (t) => Tt(t) && t !== "NaN" && t[0] !== "-" && "" + parseInt(t, 10) === t, Ln = /* @__PURE__ */ Qi(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Ur = (t) => {
  const e = /* @__PURE__ */ Object.create(null);
  return (n) => e[n] || (e[n] = t(n));
}, Vu = /-(\w)/g, Se = Ur((t) => t.replace(Vu, (e, n) => n ? n.toUpperCase() : "")), qu = /\B([A-Z])/g, le = Ur(
  (t) => t.replace(qu, "-$1").toLowerCase()
), Qo = Ur((t) => t.charAt(0).toUpperCase() + t.slice(1)), ui = Ur((t) => t ? `on${Qo(t)}` : ""), Be = (t, e) => !Object.is(t, e), ci = (t, e) => {
  for (let n = 0; n < t.length; n++)
    t[n](e);
}, Rr = (t, e, n) => {
  Object.defineProperty(t, e, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
}, Gu = (t) => {
  const e = parseFloat(t);
  return isNaN(e) ? t : e;
}, As = (t) => {
  const e = Tt(t) ? Number(t) : NaN;
  return isNaN(e) ? t : e;
};
let Fs;
const Zo = () => Fs || (Fs = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function ns(t) {
  if (rt(t)) {
    const e = {};
    for (let n = 0; n < t.length; n++) {
      const r = t[n], i = Tt(r) ? Ku(r) : ns(r);
      if (i)
        for (const s in i)
          e[s] = i[s];
    }
    return e;
  } else if (Tt(t) || Et(t))
    return t;
}
const Hu = /;(?![^(]*\))/g, Uu = /:([^]+)/, Wu = /\/\*[^]*?\*\//g;
function Ku(t) {
  const e = {};
  return t.replace(Wu, "").split(Hu).forEach((n) => {
    if (n) {
      const r = n.split(Uu);
      r.length > 1 && (e[r[0].trim()] = r[1].trim());
    }
  }), e;
}
function rs(t) {
  let e = "";
  if (Tt(t))
    e = t;
  else if (rt(t))
    for (let n = 0; n < t.length; n++) {
      const r = rs(t[n]);
      r && (e += r + " ");
    }
  else if (Et(t))
    for (const n in t)
      t[n] && (e += n + " ");
  return e.trim();
}
const Xu = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Yu = /* @__PURE__ */ Qi(Xu);
function tl(t) {
  return !!t || t === "";
}
const Re = (t) => Tt(t) ? t : t == null ? "" : rt(t) || Et(t) && (t.toString === Yo || !ut(t.toString)) ? JSON.stringify(t, el, 2) : String(t), el = (t, e) => e && e.__v_isRef ? el(t, e.value) : cn(e) ? {
  [`Map(${e.size})`]: [...e.entries()].reduce(
    (n, [r, i], s) => (n[ai(r, s) + " =>"] = i, n),
    {}
  )
} : Ko(e) ? {
  [`Set(${e.size})`]: [...e.values()].map((n) => ai(n))
} : _n(e) ? ai(e) : Et(e) && !rt(e) && !Jo(e) ? String(e) : e, ai = (t, e = "") => {
  var n;
  return _n(t) ? `Symbol(${(n = t.description) != null ? n : e})` : t;
};
/**
* @vue/reactivity v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let ie;
class Ju {
  constructor(e = !1) {
    this.detached = e, this._active = !0, this.effects = [], this.cleanups = [], this.parent = ie, !e && ie && (this.index = (ie.scopes || (ie.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  run(e) {
    if (this._active) {
      const n = ie;
      try {
        return ie = this, e();
      } finally {
        ie = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ie = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    ie = this.parent;
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
function Qu(t, e = ie) {
  e && e.active && e.effects.push(t);
}
function Zu() {
  return ie;
}
let Ye;
class is {
  constructor(e, n, r, i) {
    this.fn = e, this.trigger = n, this.scheduler = r, this.active = !0, this.deps = [], this._dirtyLevel = 4, this._trackId = 0, this._runnings = 0, this._shouldSchedule = !1, this._depsLength = 0, Qu(this, i);
  }
  get dirty() {
    if (this._dirtyLevel === 2 || this._dirtyLevel === 3) {
      this._dirtyLevel = 1, en();
      for (let e = 0; e < this._depsLength; e++) {
        const n = this.deps[e];
        if (n.computed && (tc(n.computed), this._dirtyLevel >= 4))
          break;
      }
      this._dirtyLevel === 1 && (this._dirtyLevel = 0), nn();
    }
    return this._dirtyLevel >= 4;
  }
  set dirty(e) {
    this._dirtyLevel = e ? 4 : 0;
  }
  run() {
    if (this._dirtyLevel = 0, !this.active)
      return this.fn();
    let e = Fe, n = Ye;
    try {
      return Fe = !0, Ye = this, this._runnings++, js(this), this.fn();
    } finally {
      Bs(this), this._runnings--, Ye = n, Fe = e;
    }
  }
  stop() {
    var e;
    this.active && (js(this), Bs(this), (e = this.onStop) == null || e.call(this), this.active = !1);
  }
}
function tc(t) {
  return t.value;
}
function js(t) {
  t._trackId++, t._depsLength = 0;
}
function Bs(t) {
  if (t.deps.length > t._depsLength) {
    for (let e = t._depsLength; e < t.deps.length; e++)
      nl(t.deps[e], t);
    t.deps.length = t._depsLength;
  }
}
function nl(t, e) {
  const n = t.get(e);
  n !== void 0 && e._trackId !== n && (t.delete(e), t.size === 0 && t.cleanup());
}
let Fe = !0, ki = 0;
const rl = [];
function en() {
  rl.push(Fe), Fe = !1;
}
function nn() {
  const t = rl.pop();
  Fe = t === void 0 ? !0 : t;
}
function ss() {
  ki++;
}
function os() {
  for (ki--; !ki && Mi.length; )
    Mi.shift()();
}
function il(t, e, n) {
  if (e.get(t) !== t._trackId) {
    e.set(t, t._trackId);
    const r = t.deps[t._depsLength];
    r !== e ? (r && nl(r, t), t.deps[t._depsLength++] = e) : t._depsLength++;
  }
}
const Mi = [];
function sl(t, e, n) {
  ss();
  for (const r of t.keys()) {
    let i;
    r._dirtyLevel < e && (i ?? (i = t.get(r) === r._trackId)) && (r._shouldSchedule || (r._shouldSchedule = r._dirtyLevel === 0), r._dirtyLevel = e), r._shouldSchedule && (i ?? (i = t.get(r) === r._trackId)) && (r.trigger(), (!r._runnings || r.allowRecurse) && r._dirtyLevel !== 2 && (r._shouldSchedule = !1, r.scheduler && Mi.push(r.scheduler)));
  }
  os();
}
const ol = (t, e) => {
  const n = /* @__PURE__ */ new Map();
  return n.cleanup = t, n.computed = e, n;
}, Ni = /* @__PURE__ */ new WeakMap(), Je = Symbol(""), Ri = Symbol("");
function Ut(t, e, n) {
  if (Fe && Ye) {
    let r = Ni.get(t);
    r || Ni.set(t, r = /* @__PURE__ */ new Map());
    let i = r.get(n);
    i || r.set(n, i = ol(() => r.delete(n))), il(
      Ye,
      i
    );
  }
}
function ke(t, e, n, r, i, s) {
  const o = Ni.get(t);
  if (!o)
    return;
  let l = [];
  if (e === "clear")
    l = [...o.values()];
  else if (n === "length" && rt(t)) {
    const u = Number(r);
    o.forEach((c, a) => {
      (a === "length" || !_n(a) && a >= u) && l.push(c);
    });
  } else
    switch (n !== void 0 && l.push(o.get(n)), e) {
      case "add":
        rt(t) ? es(n) && l.push(o.get("length")) : (l.push(o.get(Je)), cn(t) && l.push(o.get(Ri)));
        break;
      case "delete":
        rt(t) || (l.push(o.get(Je)), cn(t) && l.push(o.get(Ri)));
        break;
      case "set":
        cn(t) && l.push(o.get(Je));
        break;
    }
  ss();
  for (const u of l)
    u && sl(
      u,
      4
    );
  os();
}
const ec = /* @__PURE__ */ Qi("__proto__,__v_isRef,__isVue"), ll = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((t) => t !== "arguments" && t !== "caller").map((t) => Symbol[t]).filter(_n)
), zs = /* @__PURE__ */ nc();
function nc() {
  const t = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((e) => {
    t[e] = function(...n) {
      const r = dt(this);
      for (let s = 0, o = this.length; s < o; s++)
        Ut(r, "get", s + "");
      const i = r[e](...n);
      return i === -1 || i === !1 ? r[e](...n.map(dt)) : i;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((e) => {
    t[e] = function(...n) {
      en(), ss();
      const r = dt(this)[e].apply(this, n);
      return os(), nn(), r;
    };
  }), t;
}
function rc(t) {
  const e = dt(this);
  return Ut(e, "has", t), e.hasOwnProperty(t);
}
class ul {
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
      return r === (i ? s ? mc : hl : s ? fl : al).get(e) || // receiver is not the reactive proxy, but has the same prototype
      // this means the reciever is a user proxy of the reactive proxy
      Object.getPrototypeOf(e) === Object.getPrototypeOf(r) ? e : void 0;
    const o = rt(e);
    if (!i) {
      if (o && ft(zs, n))
        return Reflect.get(zs, n, r);
      if (n === "hasOwnProperty")
        return rc;
    }
    const l = Reflect.get(e, n, r);
    return (_n(n) ? ll.has(n) : ec(n)) || (i || Ut(e, "get", n), s) ? l : Wt(l) ? o && es(n) ? l : l.value : Et(l) ? i ? dl(l) : Kr(l) : l;
  }
}
class cl extends ul {
  constructor(e = !1) {
    super(!1, e);
  }
  set(e, n, r, i) {
    let s = e[n];
    if (!this._isShallow) {
      const u = gn(s);
      if (!Cr(r) && !gn(r) && (s = dt(s), r = dt(r)), !rt(e) && Wt(s) && !Wt(r))
        return u ? !1 : (s.value = r, !0);
    }
    const o = rt(e) && es(n) ? Number(n) < e.length : ft(e, n), l = Reflect.set(e, n, r, i);
    return e === dt(i) && (o ? Be(r, s) && ke(e, "set", n, r) : ke(e, "add", n, r)), l;
  }
  deleteProperty(e, n) {
    const r = ft(e, n);
    e[n];
    const i = Reflect.deleteProperty(e, n);
    return i && r && ke(e, "delete", n, void 0), i;
  }
  has(e, n) {
    const r = Reflect.has(e, n);
    return (!_n(n) || !ll.has(n)) && Ut(e, "has", n), r;
  }
  ownKeys(e) {
    return Ut(
      e,
      "iterate",
      rt(e) ? "length" : Je
    ), Reflect.ownKeys(e);
  }
}
class ic extends ul {
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
const sc = /* @__PURE__ */ new cl(), oc = /* @__PURE__ */ new ic(), lc = /* @__PURE__ */ new cl(
  !0
), ls = (t) => t, Wr = (t) => Reflect.getPrototypeOf(t);
function nr(t, e, n = !1, r = !1) {
  t = t.__v_raw;
  const i = dt(t), s = dt(e);
  n || (Be(e, s) && Ut(i, "get", e), Ut(i, "get", s));
  const { has: o } = Wr(i), l = r ? ls : n ? as : jn;
  if (o.call(i, e))
    return l(t.get(e));
  if (o.call(i, s))
    return l(t.get(s));
  t !== i && t.get(e);
}
function rr(t, e = !1) {
  const n = this.__v_raw, r = dt(n), i = dt(t);
  return e || (Be(t, i) && Ut(r, "has", t), Ut(r, "has", i)), t === i ? n.has(t) : n.has(t) || n.has(i);
}
function ir(t, e = !1) {
  return t = t.__v_raw, !e && Ut(dt(t), "iterate", Je), Reflect.get(t, "size", t);
}
function Ds(t) {
  t = dt(t);
  const e = dt(this);
  return Wr(e).has.call(e, t) || (e.add(t), ke(e, "add", t, t)), this;
}
function Vs(t, e) {
  e = dt(e);
  const n = dt(this), { has: r, get: i } = Wr(n);
  let s = r.call(n, t);
  s || (t = dt(t), s = r.call(n, t));
  const o = i.call(n, t);
  return n.set(t, e), s ? Be(e, o) && ke(n, "set", t, e) : ke(n, "add", t, e), this;
}
function qs(t) {
  const e = dt(this), { has: n, get: r } = Wr(e);
  let i = n.call(e, t);
  i || (t = dt(t), i = n.call(e, t)), r && r.call(e, t);
  const s = e.delete(t);
  return i && ke(e, "delete", t, void 0), s;
}
function Gs() {
  const t = dt(this), e = t.size !== 0, n = t.clear();
  return e && ke(t, "clear", void 0, void 0), n;
}
function sr(t, e) {
  return function(r, i) {
    const s = this, o = s.__v_raw, l = dt(o), u = e ? ls : t ? as : jn;
    return !t && Ut(l, "iterate", Je), o.forEach((c, a) => r.call(i, u(c), u(a), s));
  };
}
function or(t, e, n) {
  return function(...r) {
    const i = this.__v_raw, s = dt(i), o = cn(s), l = t === "entries" || t === Symbol.iterator && o, u = t === "keys" && o, c = i[t](...r), a = n ? ls : e ? as : jn;
    return !e && Ut(
      s,
      "iterate",
      u ? Ri : Je
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
function Ce(t) {
  return function(...e) {
    return t === "delete" ? !1 : t === "clear" ? void 0 : this;
  };
}
function uc() {
  const t = {
    get(s) {
      return nr(this, s);
    },
    get size() {
      return ir(this);
    },
    has: rr,
    add: Ds,
    set: Vs,
    delete: qs,
    clear: Gs,
    forEach: sr(!1, !1)
  }, e = {
    get(s) {
      return nr(this, s, !1, !0);
    },
    get size() {
      return ir(this);
    },
    has: rr,
    add: Ds,
    set: Vs,
    delete: qs,
    clear: Gs,
    forEach: sr(!1, !0)
  }, n = {
    get(s) {
      return nr(this, s, !0);
    },
    get size() {
      return ir(this, !0);
    },
    has(s) {
      return rr.call(this, s, !0);
    },
    add: Ce("add"),
    set: Ce("set"),
    delete: Ce("delete"),
    clear: Ce("clear"),
    forEach: sr(!0, !1)
  }, r = {
    get(s) {
      return nr(this, s, !0, !0);
    },
    get size() {
      return ir(this, !0);
    },
    has(s) {
      return rr.call(this, s, !0);
    },
    add: Ce("add"),
    set: Ce("set"),
    delete: Ce("delete"),
    clear: Ce("clear"),
    forEach: sr(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((s) => {
    t[s] = or(
      s,
      !1,
      !1
    ), n[s] = or(
      s,
      !0,
      !1
    ), e[s] = or(
      s,
      !1,
      !0
    ), r[s] = or(
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
  cc,
  ac,
  fc,
  hc
] = /* @__PURE__ */ uc();
function us(t, e) {
  const n = e ? t ? hc : fc : t ? ac : cc;
  return (r, i, s) => i === "__v_isReactive" ? !t : i === "__v_isReadonly" ? t : i === "__v_raw" ? r : Reflect.get(
    ft(n, i) && i in r ? n : r,
    i,
    s
  );
}
const dc = {
  get: /* @__PURE__ */ us(!1, !1)
}, pc = {
  get: /* @__PURE__ */ us(!1, !0)
}, gc = {
  get: /* @__PURE__ */ us(!0, !1)
}, al = /* @__PURE__ */ new WeakMap(), fl = /* @__PURE__ */ new WeakMap(), hl = /* @__PURE__ */ new WeakMap(), mc = /* @__PURE__ */ new WeakMap();
function wc(t) {
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
function yc(t) {
  return t.__v_skip || !Object.isExtensible(t) ? 0 : wc(Du(t));
}
function Kr(t) {
  return gn(t) ? t : cs(
    t,
    !1,
    sc,
    dc,
    al
  );
}
function _c(t) {
  return cs(
    t,
    !1,
    lc,
    pc,
    fl
  );
}
function dl(t) {
  return cs(
    t,
    !0,
    oc,
    gc,
    hl
  );
}
function cs(t, e, n, r, i) {
  if (!Et(t) || t.__v_raw && !(e && t.__v_isReactive))
    return t;
  const s = i.get(t);
  if (s)
    return s;
  const o = yc(t);
  if (o === 0)
    return t;
  const l = new Proxy(
    t,
    o === 2 ? r : n
  );
  return i.set(t, l), l;
}
function an(t) {
  return gn(t) ? an(t.__v_raw) : !!(t && t.__v_isReactive);
}
function gn(t) {
  return !!(t && t.__v_isReadonly);
}
function Cr(t) {
  return !!(t && t.__v_isShallow);
}
function pl(t) {
  return an(t) || gn(t);
}
function dt(t) {
  const e = t && t.__v_raw;
  return e ? dt(e) : t;
}
function gl(t) {
  return Object.isExtensible(t) && Rr(t, "__v_skip", !0), t;
}
const jn = (t) => Et(t) ? Kr(t) : t, as = (t) => Et(t) ? dl(t) : t;
class ml {
  constructor(e, n, r, i) {
    this.getter = e, this._setter = n, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this.effect = new is(
      () => e(this._value),
      () => wr(
        this,
        this.effect._dirtyLevel === 2 ? 2 : 3
      )
    ), this.effect.computed = this, this.effect.active = this._cacheable = !i, this.__v_isReadonly = r;
  }
  get value() {
    const e = dt(this);
    return (!e._cacheable || e.effect.dirty) && Be(e._value, e._value = e.effect.run()) && wr(e, 4), wl(e), e.effect._dirtyLevel >= 2 && wr(e, 2), e._value;
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
function vc(t, e, n = !1) {
  let r, i;
  const s = ut(t);
  return s ? (r = t, i = re) : (r = t.get, i = t.set), new ml(r, i, s || !i, n);
}
function wl(t) {
  var e;
  Fe && Ye && (t = dt(t), il(
    Ye,
    (e = t.dep) != null ? e : t.dep = ol(
      () => t.dep = void 0,
      t instanceof ml ? t : void 0
    )
  ));
}
function wr(t, e = 4, n) {
  t = dt(t);
  const r = t.dep;
  r && sl(
    r,
    e
  );
}
function Wt(t) {
  return !!(t && t.__v_isRef === !0);
}
function Hs(t) {
  return bc(t, !1);
}
function bc(t, e) {
  return Wt(t) ? t : new xc(t, e);
}
class xc {
  constructor(e, n) {
    this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? e : dt(e), this._value = n ? e : jn(e);
  }
  get value() {
    return wl(this), this._value;
  }
  set value(e) {
    const n = this.__v_isShallow || Cr(e) || gn(e);
    e = n ? e : dt(e), Be(e, this._rawValue) && (this._rawValue = e, this._value = n ? e : jn(e), wr(this, 4));
  }
}
function Tr(t) {
  return Wt(t) ? t.value : t;
}
const Ec = {
  get: (t, e, n) => Tr(Reflect.get(t, e, n)),
  set: (t, e, n, r) => {
    const i = t[e];
    return Wt(i) && !Wt(n) ? (i.value = n, !0) : Reflect.set(t, e, n, r);
  }
};
function yl(t) {
  return an(t) ? t : new Proxy(t, Ec);
}
/**
* @vue/runtime-core v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function je(t, e, n, r) {
  try {
    return r ? t(...r) : t();
  } catch (i) {
    Xr(i, e, n);
  }
}
function ae(t, e, n, r) {
  if (ut(t)) {
    const s = je(t, e, n, r);
    return s && Xo(s) && s.catch((o) => {
      Xr(o, e, n);
    }), s;
  }
  const i = [];
  for (let s = 0; s < t.length; s++)
    i.push(ae(t[s], e, n, r));
  return i;
}
function Xr(t, e, n, r = !0) {
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
      je(
        u,
        null,
        10,
        [t, o, l]
      );
      return;
    }
  }
  Sc(t, n, i, r);
}
function Sc(t, e, n, r = !0) {
  console.error(t);
}
let Bn = !1, Ci = !1;
const Lt = [];
let me = 0;
const fn = [];
let Ie = null, We = 0;
const _l = /* @__PURE__ */ Promise.resolve();
let fs = null;
function vl(t) {
  const e = fs || _l;
  return t ? e.then(this ? t.bind(this) : t) : e;
}
function kc(t) {
  let e = me + 1, n = Lt.length;
  for (; e < n; ) {
    const r = e + n >>> 1, i = Lt[r], s = zn(i);
    s < t || s === t && i.pre ? e = r + 1 : n = r;
  }
  return e;
}
function hs(t) {
  (!Lt.length || !Lt.includes(
    t,
    Bn && t.allowRecurse ? me + 1 : me
  )) && (t.id == null ? Lt.push(t) : Lt.splice(kc(t.id), 0, t), bl());
}
function bl() {
  !Bn && !Ci && (Ci = !0, fs = _l.then(El));
}
function Mc(t) {
  const e = Lt.indexOf(t);
  e > me && Lt.splice(e, 1);
}
function Nc(t) {
  rt(t) ? fn.push(...t) : (!Ie || !Ie.includes(
    t,
    t.allowRecurse ? We + 1 : We
  )) && fn.push(t), bl();
}
function Us(t, e, n = Bn ? me + 1 : 0) {
  for (; n < Lt.length; n++) {
    const r = Lt[n];
    if (r && r.pre) {
      if (t && r.id !== t.uid)
        continue;
      Lt.splice(n, 1), n--, r();
    }
  }
}
function xl(t) {
  if (fn.length) {
    const e = [...new Set(fn)].sort(
      (n, r) => zn(n) - zn(r)
    );
    if (fn.length = 0, Ie) {
      Ie.push(...e);
      return;
    }
    for (Ie = e, We = 0; We < Ie.length; We++)
      Ie[We]();
    Ie = null, We = 0;
  }
}
const zn = (t) => t.id == null ? 1 / 0 : t.id, Rc = (t, e) => {
  const n = zn(t) - zn(e);
  if (n === 0) {
    if (t.pre && !e.pre)
      return -1;
    if (e.pre && !t.pre)
      return 1;
  }
  return n;
};
function El(t) {
  Ci = !1, Bn = !0, Lt.sort(Rc);
  try {
    for (me = 0; me < Lt.length; me++) {
      const e = Lt[me];
      e && e.active !== !1 && je(e, null, 14);
    }
  } finally {
    me = 0, Lt.length = 0, xl(), Bn = !1, fs = null, (Lt.length || fn.length) && El();
  }
}
function Cc(t, e, ...n) {
  if (t.isUnmounted)
    return;
  const r = t.vnode.props || vt;
  let i = n;
  const s = e.startsWith("update:"), o = s && e.slice(7);
  if (o && o in r) {
    const a = `${o === "modelValue" ? "model" : o}Modifiers`, { number: f, trim: h } = r[a] || vt;
    h && (i = n.map((p) => Tt(p) ? p.trim() : p)), f && (i = n.map(Gu));
  }
  let l, u = r[l = ui(e)] || // also try camelCase event handler (#2249)
  r[l = ui(Se(e))];
  !u && s && (u = r[l = ui(le(e))]), u && ae(
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
    t.emitted[l] = !0, ae(
      c,
      t,
      6,
      i
    );
  }
}
function Sl(t, e, n = !1) {
  const r = e.emitsCache, i = r.get(t);
  if (i !== void 0)
    return i;
  const s = t.emits;
  let o = {}, l = !1;
  if (!ut(t)) {
    const u = (c) => {
      const a = Sl(c, e, !0);
      a && (l = !0, Ct(o, a));
    };
    !n && e.mixins.length && e.mixins.forEach(u), t.extends && u(t.extends), t.mixins && t.mixins.forEach(u);
  }
  return !s && !l ? (Et(t) && r.set(t, null), null) : (rt(s) ? s.forEach((u) => o[u] = null) : Ct(o, s), Et(t) && r.set(t, o), o);
}
function Yr(t, e) {
  return !t || !Gr(e) ? !1 : (e = e.slice(2).replace(/Once$/, ""), ft(t, e[0].toLowerCase() + e.slice(1)) || ft(t, le(e)) || ft(t, e));
}
let Jt = null, kl = null;
function Pr(t) {
  const e = Jt;
  return Jt = t, kl = t && t.type.__scopeId || null, e;
}
function Tc(t, e = Jt, n) {
  if (!e || t._n)
    return t;
  const r = (...i) => {
    r._d && ro(-1);
    const s = Pr(e);
    let o;
    try {
      o = t(...i);
    } finally {
      Pr(s), r._d && ro(1);
    }
    return o;
  };
  return r._n = !0, r._c = !0, r._d = !0, r;
}
function fi(t) {
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
    ctx: w,
    inheritAttrs: v
  } = t;
  let _, d;
  const C = Pr(t);
  try {
    if (n.shapeFlag & 4) {
      const y = i || r, k = y;
      _ = pe(
        a.call(
          k,
          y,
          f,
          s,
          p,
          h,
          w
        )
      ), d = u;
    } else {
      const y = e;
      _ = pe(
        y.length > 1 ? y(
          s,
          { attrs: u, slots: l, emit: c }
        ) : y(
          s,
          null
          /* we know it doesn't need it */
        )
      ), d = e.props ? u : Pc(u);
    }
  } catch (y) {
    On.length = 0, Xr(y, t, 1), _ = we(Dn);
  }
  let P = _;
  if (d && v !== !1) {
    const y = Object.keys(d), { shapeFlag: k } = P;
    y.length && k & 7 && (o && y.some(Zi) && (d = Lc(
      d,
      o
    )), P = mn(P, d));
  }
  return n.dirs && (P = mn(P), P.dirs = P.dirs ? P.dirs.concat(n.dirs) : n.dirs), n.transition && (P.transition = n.transition), _ = P, Pr(C), _;
}
const Pc = (t) => {
  let e;
  for (const n in t)
    (n === "class" || n === "style" || Gr(n)) && ((e || (e = {}))[n] = t[n]);
  return e;
}, Lc = (t, e) => {
  const n = {};
  for (const r in t)
    (!Zi(r) || !(r.slice(9) in e)) && (n[r] = t[r]);
  return n;
};
function Ic(t, e, n) {
  const { props: r, children: i, component: s } = t, { props: o, children: l, patchFlag: u } = e, c = s.emitsOptions;
  if (e.dirs || e.transition)
    return !0;
  if (n && u >= 0) {
    if (u & 1024)
      return !0;
    if (u & 16)
      return r ? Ws(r, o, c) : !!o;
    if (u & 8) {
      const a = e.dynamicProps;
      for (let f = 0; f < a.length; f++) {
        const h = a[f];
        if (o[h] !== r[h] && !Yr(c, h))
          return !0;
      }
    }
  } else
    return (i || l) && (!l || !l.$stable) ? !0 : r === o ? !1 : r ? o ? Ws(r, o, c) : !0 : !!o;
  return !1;
}
function Ws(t, e, n) {
  const r = Object.keys(e);
  if (r.length !== Object.keys(t).length)
    return !0;
  for (let i = 0; i < r.length; i++) {
    const s = r[i];
    if (e[s] !== t[s] && !Yr(n, s))
      return !0;
  }
  return !1;
}
function $c({ vnode: t, parent: e }, n) {
  for (; e; ) {
    const r = e.subTree;
    if (r.suspense && r.suspense.activeBranch === t && (r.el = t.el), r === t)
      (t = e.vnode).el = n, e = e.parent;
    else
      break;
  }
}
const Oc = Symbol.for("v-ndc"), Ac = (t) => t.__isSuspense;
function Fc(t, e) {
  e && e.pendingBranch ? rt(t) ? e.effects.push(...t) : e.effects.push(t) : Nc(t);
}
const jc = Symbol.for("v-scx"), Bc = () => vr(jc), lr = {};
function hi(t, e, n) {
  return Ml(t, e, n);
}
function Ml(t, e, {
  immediate: n,
  deep: r,
  flush: i,
  once: s,
  onTrack: o,
  onTrigger: l
} = vt) {
  if (e && s) {
    const L = e;
    e = (...D) => {
      L(...D), k();
    };
  }
  const u = At, c = (L) => r === !0 ? L : (
    // for deep: false, only traverse root-level properties
    Ke(L, r === !1 ? 1 : void 0)
  );
  let a, f = !1, h = !1;
  if (Wt(t) ? (a = () => t.value, f = Cr(t)) : an(t) ? (a = () => c(t), f = !0) : rt(t) ? (h = !0, f = t.some((L) => an(L) || Cr(L)), a = () => t.map((L) => {
    if (Wt(L))
      return L.value;
    if (an(L))
      return c(L);
    if (ut(L))
      return je(L, u, 2);
  })) : ut(t) ? e ? a = () => je(t, u, 2) : a = () => (p && p(), ae(
    t,
    u,
    3,
    [w]
  )) : a = re, e && r) {
    const L = a;
    a = () => Ke(L());
  }
  let p, w = (L) => {
    p = P.onStop = () => {
      je(L, u, 4), p = P.onStop = void 0;
    };
  }, v;
  if (ti)
    if (w = re, e ? n && ae(e, u, 3, [
      a(),
      h ? [] : void 0,
      w
    ]) : a(), i === "sync") {
      const L = Bc();
      v = L.__watcherHandles || (L.__watcherHandles = []);
    } else
      return re;
  let _ = h ? new Array(t.length).fill(lr) : lr;
  const d = () => {
    if (!(!P.active || !P.dirty))
      if (e) {
        const L = P.run();
        (r || f || (h ? L.some((D, G) => Be(D, _[G])) : Be(L, _))) && (p && p(), ae(e, u, 3, [
          L,
          // pass undefined as the old value when it's changed for the first time
          _ === lr ? void 0 : h && _[0] === lr ? [] : _,
          w
        ]), _ = L);
      } else
        P.run();
  };
  d.allowRecurse = !!e;
  let C;
  i === "sync" ? C = d : i === "post" ? C = () => qt(d, u && u.suspense) : (d.pre = !0, u && (d.id = u.uid), C = () => hs(d));
  const P = new is(a, re, C), y = Zu(), k = () => {
    P.stop(), y && ts(y.effects, P);
  };
  return e ? n ? d() : _ = P.run() : i === "post" ? qt(
    P.run.bind(P),
    u && u.suspense
  ) : P.run(), v && v.push(k), k;
}
function zc(t, e, n) {
  const r = this.proxy, i = Tt(t) ? t.includes(".") ? Nl(r, t) : () => r[t] : t.bind(r, r);
  let s;
  ut(e) ? s = e : (s = e.handler, n = e);
  const o = Xn(this), l = Ml(i, s.bind(r), n);
  return o(), l;
}
function Nl(t, e) {
  const n = e.split(".");
  return () => {
    let r = t;
    for (let i = 0; i < n.length && r; i++)
      r = r[n[i]];
    return r;
  };
}
function Ke(t, e, n = 0, r) {
  if (!Et(t) || t.__v_skip)
    return t;
  if (e && e > 0) {
    if (n >= e)
      return t;
    n++;
  }
  if (r = r || /* @__PURE__ */ new Set(), r.has(t))
    return t;
  if (r.add(t), Wt(t))
    Ke(t.value, e, n, r);
  else if (rt(t))
    for (let i = 0; i < t.length; i++)
      Ke(t[i], e, n, r);
  else if (Ko(t) || cn(t))
    t.forEach((i) => {
      Ke(i, e, n, r);
    });
  else if (Jo(t))
    for (const i in t)
      Ke(t[i], e, n, r);
  return t;
}
function yr(t, e) {
  if (Jt === null)
    return t;
  const n = ei(Jt) || Jt.proxy, r = t.dirs || (t.dirs = []);
  for (let i = 0; i < e.length; i++) {
    let [s, o, l, u = vt] = e[i];
    s && (ut(s) && (s = {
      mounted: s,
      updated: s
    }), s.deep && Ke(o), r.push({
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
function qe(t, e, n, r) {
  const i = t.dirs, s = e && e.dirs;
  for (let o = 0; o < i.length; o++) {
    const l = i[o];
    s && (l.oldValue = s[o].value);
    let u = l.dir[r];
    u && (en(), ae(u, n, 8, [
      t.el,
      l,
      t,
      e
    ]), nn());
  }
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function ds(t, e) {
  return ut(t) ? (
    // #8326: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    Ct({ name: t.name }, e, { setup: t })
  ) : t;
}
const _r = (t) => !!t.type.__asyncLoader, Rl = (t) => t.type.__isKeepAlive;
function Dc(t, e) {
  Cl(t, "a", e);
}
function Vc(t, e) {
  Cl(t, "da", e);
}
function Cl(t, e, n = At) {
  const r = t.__wdc || (t.__wdc = () => {
    let i = n;
    for (; i; ) {
      if (i.isDeactivated)
        return;
      i = i.parent;
    }
    return t();
  });
  if (Jr(e, r, n), n) {
    let i = n.parent;
    for (; i && i.parent; )
      Rl(i.parent.vnode) && qc(r, e, n, i), i = i.parent;
  }
}
function qc(t, e, n, r) {
  const i = Jr(
    e,
    t,
    r,
    !0
    /* prepend */
  );
  ps(() => {
    ts(r[e], i);
  }, n);
}
function Jr(t, e, n = At, r = !1) {
  if (n) {
    const i = n[t] || (n[t] = []), s = e.__weh || (e.__weh = (...o) => {
      if (n.isUnmounted)
        return;
      en();
      const l = Xn(n), u = ae(e, n, t, o);
      return l(), nn(), u;
    });
    return r ? i.unshift(s) : i.push(s), s;
  }
}
const Ne = (t) => (e, n = At) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!ti || t === "sp") && Jr(t, (...r) => e(...r), n)
), Tl = Ne("bm"), Pl = Ne("m"), Gc = Ne("bu"), Hc = Ne("u"), Uc = Ne("bum"), ps = Ne("um"), Wc = Ne("sp"), Kc = Ne(
  "rtg"
), Xc = Ne(
  "rtc"
);
function Yc(t, e = At) {
  Jr("ec", t, e);
}
function Ks(t, e, n, r) {
  let i;
  const s = n;
  if (rt(t) || Tt(t)) {
    i = new Array(t.length);
    for (let o = 0, l = t.length; o < l; o++)
      i[o] = e(t[o], o, void 0, s);
  } else if (typeof t == "number") {
    i = new Array(t);
    for (let o = 0; o < t; o++)
      i[o] = e(o + 1, o, void 0, s);
  } else if (Et(t))
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
const Ti = (t) => t ? Vl(t) ? ei(t) || t.proxy : Ti(t.parent) : null, In = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ Ct(/* @__PURE__ */ Object.create(null), {
    $: (t) => t,
    $el: (t) => t.vnode.el,
    $data: (t) => t.data,
    $props: (t) => t.props,
    $attrs: (t) => t.attrs,
    $slots: (t) => t.slots,
    $refs: (t) => t.refs,
    $parent: (t) => Ti(t.parent),
    $root: (t) => Ti(t.root),
    $emit: (t) => t.emit,
    $options: (t) => gs(t),
    $forceUpdate: (t) => t.f || (t.f = () => {
      t.effect.dirty = !0, hs(t.update);
    }),
    $nextTick: (t) => t.n || (t.n = vl.bind(t.proxy)),
    $watch: (t) => zc.bind(t)
  })
), di = (t, e) => t !== vt && !t.__isScriptSetup && ft(t, e), Jc = {
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
        if (di(r, e))
          return o[e] = 1, r[e];
        if (i !== vt && ft(i, e))
          return o[e] = 2, i[e];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (c = t.propsOptions[0]) && ft(c, e)
        )
          return o[e] = 3, s[e];
        if (n !== vt && ft(n, e))
          return o[e] = 4, n[e];
        Pi && (o[e] = 0);
      }
    }
    const a = In[e];
    let f, h;
    if (a)
      return e === "$attrs" && Ut(t, "get", e), a(t);
    if (
      // css module (injected by vue-loader)
      (f = l.__cssModules) && (f = f[e])
    )
      return f;
    if (n !== vt && ft(n, e))
      return o[e] = 4, n[e];
    if (
      // global properties
      h = u.config.globalProperties, ft(h, e)
    )
      return h[e];
  },
  set({ _: t }, e, n) {
    const { data: r, setupState: i, ctx: s } = t;
    return di(i, e) ? (i[e] = n, !0) : r !== vt && ft(r, e) ? (r[e] = n, !0) : ft(t.props, e) || e[0] === "$" && e.slice(1) in t ? !1 : (s[e] = n, !0);
  },
  has({
    _: { data: t, setupState: e, accessCache: n, ctx: r, appContext: i, propsOptions: s }
  }, o) {
    let l;
    return !!n[o] || t !== vt && ft(t, o) || di(e, o) || (l = s[0]) && ft(l, o) || ft(r, o) || ft(In, o) || ft(i.config.globalProperties, o);
  },
  defineProperty(t, e, n) {
    return n.get != null ? t._.accessCache[e] = 0 : ft(n, "value") && this.set(t, e, n.value, null), Reflect.defineProperty(t, e, n);
  }
};
function Xs(t) {
  return rt(t) ? t.reduce(
    (e, n) => (e[n] = null, e),
    {}
  ) : t;
}
let Pi = !0;
function Qc(t) {
  const e = gs(t), n = t.proxy, r = t.ctx;
  Pi = !1, e.beforeCreate && Ys(e.beforeCreate, t, "bc");
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
    updated: w,
    activated: v,
    deactivated: _,
    beforeDestroy: d,
    beforeUnmount: C,
    destroyed: P,
    unmounted: y,
    render: k,
    renderTracked: L,
    renderTriggered: D,
    errorCaptured: G,
    serverPrefetch: Q,
    // public API
    expose: X,
    inheritAttrs: et,
    // assets
    components: ot,
    directives: U,
    filters: x
  } = e;
  if (c && Zc(c, r, null), o)
    for (const A in o) {
      const z = o[A];
      ut(z) && (r[A] = z.bind(n));
    }
  if (i) {
    const A = i.call(n, n);
    Et(A) && (t.data = Kr(A));
  }
  if (Pi = !0, s)
    for (const A in s) {
      const z = s[A], Y = ut(z) ? z.bind(n, n) : ut(z.get) ? z.get.bind(n, n) : re, J = !ut(z) && ut(z.set) ? z.set.bind(n) : re, it = Ai({
        get: Y,
        set: J
      });
      Object.defineProperty(r, A, {
        enumerable: !0,
        configurable: !0,
        get: () => it.value,
        set: (lt) => it.value = lt
      });
    }
  if (l)
    for (const A in l)
      Ll(l[A], r, n, A);
  if (u) {
    const A = ut(u) ? u.call(n) : u;
    Reflect.ownKeys(A).forEach((z) => {
      sa(z, A[z]);
    });
  }
  a && Ys(a, t, "c");
  function N(A, z) {
    rt(z) ? z.forEach((Y) => A(Y.bind(n))) : z && A(z.bind(n));
  }
  if (N(Tl, f), N(Pl, h), N(Gc, p), N(Hc, w), N(Dc, v), N(Vc, _), N(Yc, G), N(Xc, L), N(Kc, D), N(Uc, C), N(ps, y), N(Wc, Q), rt(X))
    if (X.length) {
      const A = t.exposed || (t.exposed = {});
      X.forEach((z) => {
        Object.defineProperty(A, z, {
          get: () => n[z],
          set: (Y) => n[z] = Y
        });
      });
    } else t.exposed || (t.exposed = {});
  k && t.render === re && (t.render = k), et != null && (t.inheritAttrs = et), ot && (t.components = ot), U && (t.directives = U);
}
function Zc(t, e, n = re) {
  rt(t) && (t = Li(t));
  for (const r in t) {
    const i = t[r];
    let s;
    Et(i) ? "default" in i ? s = vr(
      i.from || r,
      i.default,
      !0
    ) : s = vr(i.from || r) : s = vr(i), Wt(s) ? Object.defineProperty(e, r, {
      enumerable: !0,
      configurable: !0,
      get: () => s.value,
      set: (o) => s.value = o
    }) : e[r] = s;
  }
}
function Ys(t, e, n) {
  ae(
    rt(t) ? t.map((r) => r.bind(e.proxy)) : t.bind(e.proxy),
    e,
    n
  );
}
function Ll(t, e, n, r) {
  const i = r.includes(".") ? Nl(n, r) : () => n[r];
  if (Tt(t)) {
    const s = e[t];
    ut(s) && hi(i, s);
  } else if (ut(t))
    hi(i, t.bind(n));
  else if (Et(t))
    if (rt(t))
      t.forEach((s) => Ll(s, e, n, r));
    else {
      const s = ut(t.handler) ? t.handler.bind(n) : e[t.handler];
      ut(s) && hi(i, s, t);
    }
}
function gs(t) {
  const e = t.type, { mixins: n, extends: r } = e, {
    mixins: i,
    optionsCache: s,
    config: { optionMergeStrategies: o }
  } = t.appContext, l = s.get(e);
  let u;
  return l ? u = l : !i.length && !n && !r ? u = e : (u = {}, i.length && i.forEach(
    (c) => Lr(u, c, o, !0)
  ), Lr(u, e, o)), Et(e) && s.set(e, u), u;
}
function Lr(t, e, n, r = !1) {
  const { mixins: i, extends: s } = e;
  s && Lr(t, s, n, !0), i && i.forEach(
    (o) => Lr(t, o, n, !0)
  );
  for (const o in e)
    if (!(r && o === "expose")) {
      const l = ta[o] || n && n[o];
      t[o] = l ? l(t[o], e[o]) : e[o];
    }
  return t;
}
const ta = {
  data: Js,
  props: Qs,
  emits: Qs,
  // objects
  methods: Cn,
  computed: Cn,
  // lifecycle
  beforeCreate: $t,
  created: $t,
  beforeMount: $t,
  mounted: $t,
  beforeUpdate: $t,
  updated: $t,
  beforeDestroy: $t,
  beforeUnmount: $t,
  destroyed: $t,
  unmounted: $t,
  activated: $t,
  deactivated: $t,
  errorCaptured: $t,
  serverPrefetch: $t,
  // assets
  components: Cn,
  directives: Cn,
  // watch
  watch: na,
  // provide / inject
  provide: Js,
  inject: ea
};
function Js(t, e) {
  return e ? t ? function() {
    return Ct(
      ut(t) ? t.call(this, this) : t,
      ut(e) ? e.call(this, this) : e
    );
  } : e : t;
}
function ea(t, e) {
  return Cn(Li(t), Li(e));
}
function Li(t) {
  if (rt(t)) {
    const e = {};
    for (let n = 0; n < t.length; n++)
      e[t[n]] = t[n];
    return e;
  }
  return t;
}
function $t(t, e) {
  return t ? [...new Set([].concat(t, e))] : e;
}
function Cn(t, e) {
  return t ? Ct(/* @__PURE__ */ Object.create(null), t, e) : e;
}
function Qs(t, e) {
  return t ? rt(t) && rt(e) ? [.../* @__PURE__ */ new Set([...t, ...e])] : Ct(
    /* @__PURE__ */ Object.create(null),
    Xs(t),
    Xs(e ?? {})
  ) : e;
}
function na(t, e) {
  if (!t)
    return e;
  if (!e)
    return t;
  const n = Ct(/* @__PURE__ */ Object.create(null), t);
  for (const r in e)
    n[r] = $t(t[r], e[r]);
  return n;
}
function Il() {
  return {
    app: null,
    config: {
      isNativeTag: Bu,
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
let ra = 0;
function ia(t, e) {
  return function(r, i = null) {
    ut(r) || (r = Ct({}, r)), i != null && !Et(i) && (i = null);
    const s = Il(), o = /* @__PURE__ */ new WeakSet();
    let l = !1;
    const u = s.app = {
      _uid: ra++,
      _component: r,
      _props: i,
      _container: null,
      _context: s,
      _instance: null,
      version: Pa,
      get config() {
        return s.config;
      },
      set config(c) {
      },
      use(c, ...a) {
        return o.has(c) || (c && ut(c.install) ? (o.add(c), c.install(u, ...a)) : ut(c) && (o.add(c), c(u, ...a))), u;
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
          const h = we(r, i);
          return h.appContext = s, f === !0 ? f = "svg" : f === !1 && (f = void 0), a && e ? e(h, c) : t(h, c, f), l = !0, u._container = c, c.__vue_app__ = u, ei(h.component) || h.component.proxy;
        }
      },
      unmount() {
        l && (t(null, u._container), delete u._container.__vue_app__);
      },
      provide(c, a) {
        return s.provides[c] = a, u;
      },
      runWithContext(c) {
        const a = $n;
        $n = u;
        try {
          return c();
        } finally {
          $n = a;
        }
      }
    };
    return u;
  };
}
let $n = null;
function sa(t, e) {
  if (At) {
    let n = At.provides;
    const r = At.parent && At.parent.provides;
    r === n && (n = At.provides = Object.create(r)), n[t] = e;
  }
}
function vr(t, e, n = !1) {
  const r = At || Jt;
  if (r || $n) {
    const i = r ? r.parent == null ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : $n._context.provides;
    if (i && t in i)
      return i[t];
    if (arguments.length > 1)
      return n && ut(e) ? e.call(r && r.proxy) : e;
  }
}
function oa(t, e, n, r = !1) {
  const i = {}, s = {};
  Rr(s, Zr, 1), t.propsDefaults = /* @__PURE__ */ Object.create(null), $l(t, e, i, s);
  for (const o in t.propsOptions[0])
    o in i || (i[o] = void 0);
  n ? t.props = r ? i : _c(i) : t.type.props ? t.props = i : t.props = s, t.attrs = s;
}
function la(t, e, n, r) {
  const {
    props: i,
    attrs: s,
    vnode: { patchFlag: o }
  } = t, l = dt(i), [u] = t.propsOptions;
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
        if (Yr(t.emitsOptions, h))
          continue;
        const p = e[h];
        if (u)
          if (ft(s, h))
            p !== s[h] && (s[h] = p, c = !0);
          else {
            const w = Se(h);
            i[w] = Ii(
              u,
              l,
              w,
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
    $l(t, e, i, s) && (c = !0);
    let a;
    for (const f in l)
      (!e || // for camelCase
      !ft(e, f) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((a = le(f)) === f || !ft(e, a))) && (u ? n && // for camelCase
      (n[f] !== void 0 || // for kebab-case
      n[a] !== void 0) && (i[f] = Ii(
        u,
        l,
        f,
        void 0,
        t,
        !0
      )) : delete i[f]);
    if (s !== l)
      for (const f in s)
        (!e || !ft(e, f)) && (delete s[f], c = !0);
  }
  c && ke(t, "set", "$attrs");
}
function $l(t, e, n, r) {
  const [i, s] = t.propsOptions;
  let o = !1, l;
  if (e)
    for (let u in e) {
      if (Ln(u))
        continue;
      const c = e[u];
      let a;
      i && ft(i, a = Se(u)) ? !s || !s.includes(a) ? n[a] = c : (l || (l = {}))[a] = c : Yr(t.emitsOptions, u) || (!(u in r) || c !== r[u]) && (r[u] = c, o = !0);
    }
  if (s) {
    const u = dt(n), c = l || vt;
    for (let a = 0; a < s.length; a++) {
      const f = s[a];
      n[f] = Ii(
        i,
        u,
        f,
        c[f],
        t,
        !ft(c, f)
      );
    }
  }
  return o;
}
function Ii(t, e, n, r, i, s) {
  const o = t[n];
  if (o != null) {
    const l = ft(o, "default");
    if (l && r === void 0) {
      const u = o.default;
      if (o.type !== Function && !o.skipFactory && ut(u)) {
        const { propsDefaults: c } = i;
        if (n in c)
          r = c[n];
        else {
          const a = Xn(i);
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
    ] && (r === "" || r === le(n)) && (r = !0));
  }
  return r;
}
function Ol(t, e, n = !1) {
  const r = e.propsCache, i = r.get(t);
  if (i)
    return i;
  const s = t.props, o = {}, l = [];
  let u = !1;
  if (!ut(t)) {
    const a = (f) => {
      u = !0;
      const [h, p] = Ol(f, e, !0);
      Ct(o, h), p && l.push(...p);
    };
    !n && e.mixins.length && e.mixins.forEach(a), t.extends && a(t.extends), t.mixins && t.mixins.forEach(a);
  }
  if (!s && !u)
    return Et(t) && r.set(t, un), un;
  if (rt(s))
    for (let a = 0; a < s.length; a++) {
      const f = Se(s[a]);
      Zs(f) && (o[f] = vt);
    }
  else if (s)
    for (const a in s) {
      const f = Se(a);
      if (Zs(f)) {
        const h = s[a], p = o[f] = rt(h) || ut(h) ? { type: h } : Ct({}, h);
        if (p) {
          const w = no(Boolean, p.type), v = no(String, p.type);
          p[
            0
            /* shouldCast */
          ] = w > -1, p[
            1
            /* shouldCastTrue */
          ] = v < 0 || w < v, (w > -1 || ft(p, "default")) && l.push(f);
        }
      }
    }
  const c = [o, l];
  return Et(t) && r.set(t, c), c;
}
function Zs(t) {
  return t[0] !== "$" && !Ln(t);
}
function to(t) {
  return t === null ? "null" : typeof t == "function" ? t.name || "" : typeof t == "object" && t.constructor && t.constructor.name || "";
}
function eo(t, e) {
  return to(t) === to(e);
}
function no(t, e) {
  return rt(e) ? e.findIndex((n) => eo(n, t)) : ut(e) && eo(e, t) ? 0 : -1;
}
const Al = (t) => t[0] === "_" || t === "$stable", ms = (t) => rt(t) ? t.map(pe) : [pe(t)], ua = (t, e, n) => {
  if (e._n)
    return e;
  const r = Tc((...i) => ms(e(...i)), n);
  return r._c = !1, r;
}, Fl = (t, e, n) => {
  const r = t._ctx;
  for (const i in t) {
    if (Al(i))
      continue;
    const s = t[i];
    if (ut(s))
      e[i] = ua(i, s, r);
    else if (s != null) {
      const o = ms(s);
      e[i] = () => o;
    }
  }
}, jl = (t, e) => {
  const n = ms(e);
  t.slots.default = () => n;
}, ca = (t, e) => {
  if (t.vnode.shapeFlag & 32) {
    const n = e._;
    n ? (t.slots = dt(e), Rr(e, "_", n)) : Fl(
      e,
      t.slots = {}
    );
  } else
    t.slots = {}, e && jl(t, e);
  Rr(t.slots, Zr, 1);
}, aa = (t, e, n) => {
  const { vnode: r, slots: i } = t;
  let s = !0, o = vt;
  if (r.shapeFlag & 32) {
    const l = e._;
    l ? n && l === 1 ? s = !1 : (Ct(i, e), !n && l === 1 && delete i._) : (s = !e.$stable, Fl(e, i)), o = e;
  } else e && (jl(t, e), o = { default: 1 });
  if (s)
    for (const l in i)
      !Al(l) && o[l] == null && delete i[l];
};
function $i(t, e, n, r, i = !1) {
  if (rt(t)) {
    t.forEach(
      (h, p) => $i(
        h,
        e && (rt(e) ? e[p] : e),
        n,
        r,
        i
      )
    );
    return;
  }
  if (_r(r) && !i)
    return;
  const s = r.shapeFlag & 4 ? ei(r.component) || r.component.proxy : r.el, o = i ? null : s, { i: l, r: u } = t, c = e && e.r, a = l.refs === vt ? l.refs = {} : l.refs, f = l.setupState;
  if (c != null && c !== u && (Tt(c) ? (a[c] = null, ft(f, c) && (f[c] = null)) : Wt(c) && (c.value = null)), ut(u))
    je(u, l, 12, [o, a]);
  else {
    const h = Tt(u), p = Wt(u);
    if (h || p) {
      const w = () => {
        if (t.f) {
          const v = h ? ft(f, u) ? f[u] : a[u] : u.value;
          i ? rt(v) && ts(v, s) : rt(v) ? v.includes(s) || v.push(s) : h ? (a[u] = [s], ft(f, u) && (f[u] = a[u])) : (u.value = [s], t.k && (a[t.k] = u.value));
        } else h ? (a[u] = o, ft(f, u) && (f[u] = o)) : p && (u.value = o, t.k && (a[t.k] = o));
      };
      o ? (w.id = -1, qt(w, n)) : w();
    }
  }
}
const qt = Fc;
function fa(t) {
  return ha(t);
}
function ha(t, e) {
  const n = Zo();
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
    setScopeId: p = re,
    insertStaticContent: w
  } = t, v = (m, b, T, $ = null, O = null, q = null, W = void 0, B = null, H = !!b.dynamicChildren) => {
    if (m === b)
      return;
    m && !En(m, b) && ($ = bt(m), lt(m, O, q, !0), m = null), b.patchFlag === -2 && (H = !1, b.dynamicChildren = null);
    const { type: F, ref: K, shapeFlag: tt } = b;
    switch (F) {
      case Qr:
        _(m, b, T, $);
        break;
      case Dn:
        d(m, b, T, $);
        break;
      case gi:
        m == null && C(b, T, $, W);
        break;
      case ne:
        ot(
          m,
          b,
          T,
          $,
          O,
          q,
          W,
          B,
          H
        );
        break;
      default:
        tt & 1 ? k(
          m,
          b,
          T,
          $,
          O,
          q,
          W,
          B,
          H
        ) : tt & 6 ? U(
          m,
          b,
          T,
          $,
          O,
          q,
          W,
          B,
          H
        ) : (tt & 64 || tt & 128) && F.process(
          m,
          b,
          T,
          $,
          O,
          q,
          W,
          B,
          H,
          Zt
        );
    }
    K != null && O && $i(K, m && m.ref, q, b || m, !b);
  }, _ = (m, b, T, $) => {
    if (m == null)
      r(
        b.el = l(b.children),
        T,
        $
      );
    else {
      const O = b.el = m.el;
      b.children !== m.children && c(O, b.children);
    }
  }, d = (m, b, T, $) => {
    m == null ? r(
      b.el = u(b.children || ""),
      T,
      $
    ) : b.el = m.el;
  }, C = (m, b, T, $) => {
    [m.el, m.anchor] = w(
      m.children,
      b,
      T,
      $,
      m.el,
      m.anchor
    );
  }, P = ({ el: m, anchor: b }, T, $) => {
    let O;
    for (; m && m !== b; )
      O = h(m), r(m, T, $), m = O;
    r(b, T, $);
  }, y = ({ el: m, anchor: b }) => {
    let T;
    for (; m && m !== b; )
      T = h(m), i(m), m = T;
    i(b);
  }, k = (m, b, T, $, O, q, W, B, H) => {
    b.type === "svg" ? W = "svg" : b.type === "math" && (W = "mathml"), m == null ? L(
      b,
      T,
      $,
      O,
      q,
      W,
      B,
      H
    ) : Q(
      m,
      b,
      O,
      q,
      W,
      B,
      H
    );
  }, L = (m, b, T, $, O, q, W, B) => {
    let H, F;
    const { props: K, shapeFlag: tt, transition: Z, dirs: nt } = m;
    if (H = m.el = o(
      m.type,
      q,
      K && K.is,
      K
    ), tt & 8 ? a(H, m.children) : tt & 16 && G(
      m.children,
      H,
      null,
      $,
      O,
      pi(m, q),
      W,
      B
    ), nt && qe(m, null, $, "created"), D(H, m, m.scopeId, W, $), K) {
      for (const ht in K)
        ht !== "value" && !Ln(ht) && s(
          H,
          ht,
          null,
          K[ht],
          q,
          m.children,
          $,
          O,
          mt
        );
      "value" in K && s(H, "value", null, K.value, q), (F = K.onVnodeBeforeMount) && he(F, $, m);
    }
    nt && qe(m, null, $, "beforeMount");
    const ct = da(O, Z);
    ct && Z.beforeEnter(H), r(H, b, T), ((F = K && K.onVnodeMounted) || ct || nt) && qt(() => {
      F && he(F, $, m), ct && Z.enter(H), nt && qe(m, null, $, "mounted");
    }, O);
  }, D = (m, b, T, $, O) => {
    if (T && p(m, T), $)
      for (let q = 0; q < $.length; q++)
        p(m, $[q]);
    if (O) {
      let q = O.subTree;
      if (b === q) {
        const W = O.vnode;
        D(
          m,
          W,
          W.scopeId,
          W.slotScopeIds,
          O.parent
        );
      }
    }
  }, G = (m, b, T, $, O, q, W, B, H = 0) => {
    for (let F = H; F < m.length; F++) {
      const K = m[F] = B ? $e(m[F]) : pe(m[F]);
      v(
        null,
        K,
        b,
        T,
        $,
        O,
        q,
        W,
        B
      );
    }
  }, Q = (m, b, T, $, O, q, W) => {
    const B = b.el = m.el;
    let { patchFlag: H, dynamicChildren: F, dirs: K } = b;
    H |= m.patchFlag & 16;
    const tt = m.props || vt, Z = b.props || vt;
    let nt;
    if (T && Ge(T, !1), (nt = Z.onVnodeBeforeUpdate) && he(nt, T, b, m), K && qe(b, m, T, "beforeUpdate"), T && Ge(T, !0), F ? X(
      m.dynamicChildren,
      F,
      B,
      T,
      $,
      pi(b, O),
      q
    ) : W || z(
      m,
      b,
      B,
      null,
      T,
      $,
      pi(b, O),
      q,
      !1
    ), H > 0) {
      if (H & 16)
        et(
          B,
          b,
          tt,
          Z,
          T,
          $,
          O
        );
      else if (H & 2 && tt.class !== Z.class && s(B, "class", null, Z.class, O), H & 4 && s(B, "style", tt.style, Z.style, O), H & 8) {
        const ct = b.dynamicProps;
        for (let ht = 0; ht < ct.length; ht++) {
          const _t = ct[ht], Nt = tt[_t], Dt = Z[_t];
          (Dt !== Nt || _t === "value") && s(
            B,
            _t,
            Nt,
            Dt,
            O,
            m.children,
            T,
            $,
            mt
          );
        }
      }
      H & 1 && m.children !== b.children && a(B, b.children);
    } else !W && F == null && et(
      B,
      b,
      tt,
      Z,
      T,
      $,
      O
    );
    ((nt = Z.onVnodeUpdated) || K) && qt(() => {
      nt && he(nt, T, b, m), K && qe(b, m, T, "updated");
    }, $);
  }, X = (m, b, T, $, O, q, W) => {
    for (let B = 0; B < b.length; B++) {
      const H = m[B], F = b[B], K = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        H.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (H.type === ne || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !En(H, F) || // - In the case of a component, it could contain anything.
        H.shapeFlag & 70) ? f(H.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          T
        )
      );
      v(
        H,
        F,
        K,
        null,
        $,
        O,
        q,
        W,
        !0
      );
    }
  }, et = (m, b, T, $, O, q, W) => {
    if (T !== $) {
      if (T !== vt)
        for (const B in T)
          !Ln(B) && !(B in $) && s(
            m,
            B,
            T[B],
            null,
            W,
            b.children,
            O,
            q,
            mt
          );
      for (const B in $) {
        if (Ln(B))
          continue;
        const H = $[B], F = T[B];
        H !== F && B !== "value" && s(
          m,
          B,
          F,
          H,
          W,
          b.children,
          O,
          q,
          mt
        );
      }
      "value" in $ && s(m, "value", T.value, $.value, W);
    }
  }, ot = (m, b, T, $, O, q, W, B, H) => {
    const F = b.el = m ? m.el : l(""), K = b.anchor = m ? m.anchor : l("");
    let { patchFlag: tt, dynamicChildren: Z, slotScopeIds: nt } = b;
    nt && (B = B ? B.concat(nt) : nt), m == null ? (r(F, T, $), r(K, T, $), G(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      b.children || [],
      T,
      K,
      O,
      q,
      W,
      B,
      H
    )) : tt > 0 && tt & 64 && Z && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    m.dynamicChildren ? (X(
      m.dynamicChildren,
      Z,
      T,
      O,
      q,
      W,
      B
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (b.key != null || O && b === O.subTree) && Bl(
      m,
      b,
      !0
      /* shallow */
    )) : z(
      m,
      b,
      T,
      K,
      O,
      q,
      W,
      B,
      H
    );
  }, U = (m, b, T, $, O, q, W, B, H) => {
    b.slotScopeIds = B, m == null ? b.shapeFlag & 512 ? O.ctx.activate(
      b,
      T,
      $,
      W,
      H
    ) : x(
      b,
      T,
      $,
      O,
      q,
      W,
      H
    ) : V(m, b, H);
  }, x = (m, b, T, $, O, q, W) => {
    const B = m.component = ka(
      m,
      $,
      O
    );
    if (Rl(m) && (B.ctx.renderer = Zt), Ma(B), B.asyncDep) {
      if (O && O.registerDep(B, N), !m.el) {
        const H = B.subTree = we(Dn);
        d(null, H, b, T);
      }
    } else
      N(
        B,
        m,
        b,
        T,
        O,
        q,
        W
      );
  }, V = (m, b, T) => {
    const $ = b.component = m.component;
    if (Ic(m, b, T))
      if ($.asyncDep && !$.asyncResolved) {
        A($, b, T);
        return;
      } else
        $.next = b, Mc($.update), $.effect.dirty = !0, $.update();
    else
      b.el = m.el, $.vnode = b;
  }, N = (m, b, T, $, O, q, W) => {
    const B = () => {
      if (m.isMounted) {
        let { next: K, bu: tt, u: Z, parent: nt, vnode: ct } = m;
        {
          const be = zl(m);
          if (be) {
            K && (K.el = ct.el, A(m, K, W)), be.asyncDep.then(() => {
              m.isUnmounted || B();
            });
            return;
          }
        }
        let ht = K, _t;
        Ge(m, !1), K ? (K.el = ct.el, A(m, K, W)) : K = ct, tt && ci(tt), (_t = K.props && K.props.onVnodeBeforeUpdate) && he(_t, nt, K, ct), Ge(m, !0);
        const Nt = fi(m), Dt = m.subTree;
        m.subTree = Nt, v(
          Dt,
          Nt,
          // parent may have changed if it's in a teleport
          f(Dt.el),
          // anchor may have changed if it's in a fragment
          bt(Dt),
          m,
          O,
          q
        ), K.el = Nt.el, ht === null && $c(m, Nt.el), Z && qt(Z, O), (_t = K.props && K.props.onVnodeUpdated) && qt(
          () => he(_t, nt, K, ct),
          O
        );
      } else {
        let K;
        const { el: tt, props: Z } = b, { bm: nt, m: ct, parent: ht } = m, _t = _r(b);
        if (Ge(m, !1), nt && ci(nt), !_t && (K = Z && Z.onVnodeBeforeMount) && he(K, ht, b), Ge(m, !0), tt && ze) {
          const Nt = () => {
            m.subTree = fi(m), ze(
              tt,
              m.subTree,
              m,
              O,
              null
            );
          };
          _t ? b.type.__asyncLoader().then(
            // note: we are moving the render call into an async callback,
            // which means it won't track dependencies - but it's ok because
            // a server-rendered async wrapper is already in resolved state
            // and it will never need to change.
            () => !m.isUnmounted && Nt()
          ) : Nt();
        } else {
          const Nt = m.subTree = fi(m);
          v(
            null,
            Nt,
            T,
            $,
            m,
            O,
            q
          ), b.el = Nt.el;
        }
        if (ct && qt(ct, O), !_t && (K = Z && Z.onVnodeMounted)) {
          const Nt = b;
          qt(
            () => he(K, ht, Nt),
            O
          );
        }
        (b.shapeFlag & 256 || ht && _r(ht.vnode) && ht.vnode.shapeFlag & 256) && m.a && qt(m.a, O), m.isMounted = !0, b = T = $ = null;
      }
    }, H = m.effect = new is(
      B,
      re,
      () => hs(F),
      m.scope
      // track it in component's effect scope
    ), F = m.update = () => {
      H.dirty && H.run();
    };
    F.id = m.uid, Ge(m, !0), F();
  }, A = (m, b, T) => {
    b.component = m;
    const $ = m.vnode.props;
    m.vnode = b, m.next = null, la(m, b.props, $, T), aa(m, b.children, T), en(), Us(m), nn();
  }, z = (m, b, T, $, O, q, W, B, H = !1) => {
    const F = m && m.children, K = m ? m.shapeFlag : 0, tt = b.children, { patchFlag: Z, shapeFlag: nt } = b;
    if (Z > 0) {
      if (Z & 128) {
        J(
          F,
          tt,
          T,
          $,
          O,
          q,
          W,
          B,
          H
        );
        return;
      } else if (Z & 256) {
        Y(
          F,
          tt,
          T,
          $,
          O,
          q,
          W,
          B,
          H
        );
        return;
      }
    }
    nt & 8 ? (K & 16 && mt(F, O, q), tt !== F && a(T, tt)) : K & 16 ? nt & 16 ? J(
      F,
      tt,
      T,
      $,
      O,
      q,
      W,
      B,
      H
    ) : mt(F, O, q, !0) : (K & 8 && a(T, ""), nt & 16 && G(
      tt,
      T,
      $,
      O,
      q,
      W,
      B,
      H
    ));
  }, Y = (m, b, T, $, O, q, W, B, H) => {
    m = m || un, b = b || un;
    const F = m.length, K = b.length, tt = Math.min(F, K);
    let Z;
    for (Z = 0; Z < tt; Z++) {
      const nt = b[Z] = H ? $e(b[Z]) : pe(b[Z]);
      v(
        m[Z],
        nt,
        T,
        null,
        O,
        q,
        W,
        B,
        H
      );
    }
    F > K ? mt(
      m,
      O,
      q,
      !0,
      !1,
      tt
    ) : G(
      b,
      T,
      $,
      O,
      q,
      W,
      B,
      H,
      tt
    );
  }, J = (m, b, T, $, O, q, W, B, H) => {
    let F = 0;
    const K = b.length;
    let tt = m.length - 1, Z = K - 1;
    for (; F <= tt && F <= Z; ) {
      const nt = m[F], ct = b[F] = H ? $e(b[F]) : pe(b[F]);
      if (En(nt, ct))
        v(
          nt,
          ct,
          T,
          null,
          O,
          q,
          W,
          B,
          H
        );
      else
        break;
      F++;
    }
    for (; F <= tt && F <= Z; ) {
      const nt = m[tt], ct = b[Z] = H ? $e(b[Z]) : pe(b[Z]);
      if (En(nt, ct))
        v(
          nt,
          ct,
          T,
          null,
          O,
          q,
          W,
          B,
          H
        );
      else
        break;
      tt--, Z--;
    }
    if (F > tt) {
      if (F <= Z) {
        const nt = Z + 1, ct = nt < K ? b[nt].el : $;
        for (; F <= Z; )
          v(
            null,
            b[F] = H ? $e(b[F]) : pe(b[F]),
            T,
            ct,
            O,
            q,
            W,
            B,
            H
          ), F++;
      }
    } else if (F > Z)
      for (; F <= tt; )
        lt(m[F], O, q, !0), F++;
    else {
      const nt = F, ct = F, ht = /* @__PURE__ */ new Map();
      for (F = ct; F <= Z; F++) {
        const It = b[F] = H ? $e(b[F]) : pe(b[F]);
        It.key != null && ht.set(It.key, F);
      }
      let _t, Nt = 0;
      const Dt = Z - ct + 1;
      let be = !1, Zn = 0;
      const De = new Array(Dt);
      for (F = 0; F < Dt; F++)
        De[F] = 0;
      for (F = nt; F <= tt; F++) {
        const It = m[F];
        if (Nt >= Dt) {
          lt(It, O, q, !0);
          continue;
        }
        let te;
        if (It.key != null)
          te = ht.get(It.key);
        else
          for (_t = ct; _t <= Z; _t++)
            if (De[_t - ct] === 0 && En(It, b[_t])) {
              te = _t;
              break;
            }
        te === void 0 ? lt(It, O, q, !0) : (De[te - ct] = F + 1, te >= Zn ? Zn = te : be = !0, v(
          It,
          b[te],
          T,
          null,
          O,
          q,
          W,
          B,
          H
        ), Nt++);
      }
      const tr = be ? pa(De) : un;
      for (_t = tr.length - 1, F = Dt - 1; F >= 0; F--) {
        const It = ct + F, te = b[It], er = It + 1 < K ? b[It + 1].el : $;
        De[F] === 0 ? v(
          null,
          te,
          T,
          er,
          O,
          q,
          W,
          B,
          H
        ) : be && (_t < 0 || F !== tr[_t] ? it(te, T, er, 2) : _t--);
      }
    }
  }, it = (m, b, T, $, O = null) => {
    const { el: q, type: W, transition: B, children: H, shapeFlag: F } = m;
    if (F & 6) {
      it(m.component.subTree, b, T, $);
      return;
    }
    if (F & 128) {
      m.suspense.move(b, T, $);
      return;
    }
    if (F & 64) {
      W.move(m, b, T, Zt);
      return;
    }
    if (W === ne) {
      r(q, b, T);
      for (let tt = 0; tt < H.length; tt++)
        it(H[tt], b, T, $);
      r(m.anchor, b, T);
      return;
    }
    if (W === gi) {
      P(m, b, T);
      return;
    }
    if ($ !== 2 && F & 1 && B)
      if ($ === 0)
        B.beforeEnter(q), r(q, b, T), qt(() => B.enter(q), O);
      else {
        const { leave: tt, delayLeave: Z, afterLeave: nt } = B, ct = () => r(q, b, T), ht = () => {
          tt(q, () => {
            ct(), nt && nt();
          });
        };
        Z ? Z(q, ct, ht) : ht();
      }
    else
      r(q, b, T);
  }, lt = (m, b, T, $ = !1, O = !1) => {
    const {
      type: q,
      props: W,
      ref: B,
      children: H,
      dynamicChildren: F,
      shapeFlag: K,
      patchFlag: tt,
      dirs: Z
    } = m;
    if (B != null && $i(B, null, T, m, !0), K & 256) {
      b.ctx.deactivate(m);
      return;
    }
    const nt = K & 1 && Z, ct = !_r(m);
    let ht;
    if (ct && (ht = W && W.onVnodeBeforeUnmount) && he(ht, b, m), K & 6)
      gt(m.component, T, $);
    else {
      if (K & 128) {
        m.suspense.unmount(T, $);
        return;
      }
      nt && qe(m, null, b, "beforeUnmount"), K & 64 ? m.type.remove(
        m,
        b,
        T,
        O,
        Zt,
        $
      ) : F && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (q !== ne || tt > 0 && tt & 64) ? mt(
        F,
        b,
        T,
        !1,
        !0
      ) : (q === ne && tt & 384 || !O && K & 16) && mt(H, b, T), $ && St(m);
    }
    (ct && (ht = W && W.onVnodeUnmounted) || nt) && qt(() => {
      ht && he(ht, b, m), nt && qe(m, null, b, "unmounted");
    }, T);
  }, St = (m) => {
    const { type: b, el: T, anchor: $, transition: O } = m;
    if (b === ne) {
      pt(T, $);
      return;
    }
    if (b === gi) {
      y(m);
      return;
    }
    const q = () => {
      i(T), O && !O.persisted && O.afterLeave && O.afterLeave();
    };
    if (m.shapeFlag & 1 && O && !O.persisted) {
      const { leave: W, delayLeave: B } = O, H = () => W(T, q);
      B ? B(m.el, q, H) : H();
    } else
      q();
  }, pt = (m, b) => {
    let T;
    for (; m !== b; )
      T = h(m), i(m), m = T;
    i(b);
  }, gt = (m, b, T) => {
    const { bum: $, scope: O, update: q, subTree: W, um: B } = m;
    $ && ci($), O.stop(), q && (q.active = !1, lt(W, m, b, T)), B && qt(B, b), qt(() => {
      m.isUnmounted = !0;
    }, b), b && b.pendingBranch && !b.isUnmounted && m.asyncDep && !m.asyncResolved && m.suspenseId === b.pendingId && (b.deps--, b.deps === 0 && b.resolve());
  }, mt = (m, b, T, $ = !1, O = !1, q = 0) => {
    for (let W = q; W < m.length; W++)
      lt(m[W], b, T, $, O);
  }, bt = (m) => m.shapeFlag & 6 ? bt(m.component.subTree) : m.shapeFlag & 128 ? m.suspense.next() : h(m.anchor || m.el);
  let kt = !1;
  const zt = (m, b, T) => {
    m == null ? b._vnode && lt(b._vnode, null, null, !0) : v(
      b._vnode || null,
      m,
      b,
      null,
      null,
      null,
      T
    ), kt || (kt = !0, Us(), xl(), kt = !1), b._vnode = m;
  }, Zt = {
    p: v,
    um: lt,
    m: it,
    r: St,
    mt: x,
    mc: G,
    pc: z,
    pbc: X,
    n: bt,
    o: t
  };
  let ve, ze;
  return {
    render: zt,
    hydrate: ve,
    createApp: ia(zt, ve)
  };
}
function pi({ type: t, props: e }, n) {
  return n === "svg" && t === "foreignObject" || n === "mathml" && t === "annotation-xml" && e && e.encoding && e.encoding.includes("html") ? void 0 : n;
}
function Ge({ effect: t, update: e }, n) {
  t.allowRecurse = e.allowRecurse = n;
}
function da(t, e) {
  return (!t || t && !t.pendingBranch) && e && !e.persisted;
}
function Bl(t, e, n = !1) {
  const r = t.children, i = e.children;
  if (rt(r) && rt(i))
    for (let s = 0; s < r.length; s++) {
      const o = r[s];
      let l = i[s];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = i[s] = $e(i[s]), l.el = o.el), n || Bl(o, l)), l.type === Qr && (l.el = o.el);
    }
}
function pa(t) {
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
function zl(t) {
  const e = t.subTree.component;
  if (e)
    return e.asyncDep && !e.asyncResolved ? e : zl(e);
}
const ga = (t) => t.__isTeleport, ne = Symbol.for("v-fgt"), Qr = Symbol.for("v-txt"), Dn = Symbol.for("v-cmt"), gi = Symbol.for("v-stc"), On = [];
let ce = null;
function Te(t = !1) {
  On.push(ce = t ? null : []);
}
function ma() {
  On.pop(), ce = On[On.length - 1] || null;
}
let Vn = 1;
function ro(t) {
  Vn += t;
}
function wa(t) {
  return t.dynamicChildren = Vn > 0 ? ce || un : null, ma(), Vn > 0 && ce && ce.push(t), t;
}
function Pe(t, e, n, r, i, s) {
  return wa(
    Xt(
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
function ya(t) {
  return t ? t.__v_isVNode === !0 : !1;
}
function En(t, e) {
  return t.type === e.type && t.key === e.key;
}
const Zr = "__vInternal", Dl = ({ key: t }) => t ?? null, br = ({
  ref: t,
  ref_key: e,
  ref_for: n
}) => (typeof t == "number" && (t = "" + t), t != null ? Tt(t) || Wt(t) || ut(t) ? { i: Jt, r: t, k: e, f: !!n } : t : null);
function Xt(t, e = null, n = null, r = 0, i = null, s = t === ne ? 0 : 1, o = !1, l = !1) {
  const u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t,
    props: e,
    key: e && Dl(e),
    ref: e && br(e),
    scopeId: kl,
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
    ctx: Jt
  };
  return l ? (ws(u, n), s & 128 && t.normalize(u)) : n && (u.shapeFlag |= Tt(n) ? 8 : 16), Vn > 0 && // avoid a block node from tracking itself
  !o && // has current parent block
  ce && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (u.patchFlag > 0 || s & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  u.patchFlag !== 32 && ce.push(u), u;
}
const we = _a;
function _a(t, e = null, n = null, r = 0, i = null, s = !1) {
  if ((!t || t === Oc) && (t = Dn), ya(t)) {
    const l = mn(
      t,
      e,
      !0
      /* mergeRef: true */
    );
    return n && ws(l, n), Vn > 0 && !s && ce && (l.shapeFlag & 6 ? ce[ce.indexOf(t)] = l : ce.push(l)), l.patchFlag |= -2, l;
  }
  if (Ta(t) && (t = t.__vccOpts), e) {
    e = va(e);
    let { class: l, style: u } = e;
    l && !Tt(l) && (e.class = rs(l)), Et(u) && (pl(u) && !rt(u) && (u = Ct({}, u)), e.style = ns(u));
  }
  const o = Tt(t) ? 1 : Ac(t) ? 128 : ga(t) ? 64 : Et(t) ? 4 : ut(t) ? 2 : 0;
  return Xt(
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
function va(t) {
  return t ? pl(t) || Zr in t ? Ct({}, t) : t : null;
}
function mn(t, e, n = !1) {
  const { props: r, ref: i, patchFlag: s, children: o } = t, l = e ? xa(r || {}, e) : r;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t.type,
    props: l,
    key: l && Dl(l),
    ref: e && e.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && i ? rt(i) ? i.concat(br(e)) : [i, br(e)] : br(e)
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
    patchFlag: e && t.type !== ne ? s === -1 ? 16 : s | 16 : s,
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
    ssContent: t.ssContent && mn(t.ssContent),
    ssFallback: t.ssFallback && mn(t.ssFallback),
    el: t.el,
    anchor: t.anchor,
    ctx: t.ctx,
    ce: t.ce
  };
}
function ba(t = " ", e = 0) {
  return we(Qr, null, t, e);
}
function pe(t) {
  return t == null || typeof t == "boolean" ? we(Dn) : rt(t) ? we(
    ne,
    null,
    // #3666, avoid reference pollution when reusing vnode
    t.slice()
  ) : typeof t == "object" ? $e(t) : we(Qr, null, String(t));
}
function $e(t) {
  return t.el === null && t.patchFlag !== -1 || t.memo ? t : mn(t);
}
function ws(t, e) {
  let n = 0;
  const { shapeFlag: r } = t;
  if (e == null)
    e = null;
  else if (rt(e))
    n = 16;
  else if (typeof e == "object")
    if (r & 65) {
      const i = e.default;
      i && (i._c && (i._d = !1), ws(t, i()), i._c && (i._d = !0));
      return;
    } else {
      n = 32;
      const i = e._;
      !i && !(Zr in e) ? e._ctx = Jt : i === 3 && Jt && (Jt.slots._ === 1 ? e._ = 1 : (e._ = 2, t.patchFlag |= 1024));
    }
  else ut(e) ? (e = { default: e, _ctx: Jt }, n = 32) : (e = String(e), r & 64 ? (n = 16, e = [ba(e)]) : n = 8);
  t.children = e, t.shapeFlag |= n;
}
function xa(...t) {
  const e = {};
  for (let n = 0; n < t.length; n++) {
    const r = t[n];
    for (const i in r)
      if (i === "class")
        e.class !== r.class && (e.class = rs([e.class, r.class]));
      else if (i === "style")
        e.style = ns([e.style, r.style]);
      else if (Gr(i)) {
        const s = e[i], o = r[i];
        o && s !== o && !(rt(s) && s.includes(o)) && (e[i] = s ? [].concat(s, o) : o);
      } else i !== "" && (e[i] = r[i]);
  }
  return e;
}
function he(t, e, n, r = null) {
  ae(t, e, 7, [
    n,
    r
  ]);
}
const Ea = Il();
let Sa = 0;
function ka(t, e, n) {
  const r = t.type, i = (e ? e.appContext : t.appContext) || Ea, s = {
    uid: Sa++,
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
    scope: new Ju(
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
    propsOptions: Ol(r, i),
    emitsOptions: Sl(r, i),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: vt,
    // inheritAttrs
    inheritAttrs: r.inheritAttrs,
    // state
    ctx: vt,
    data: vt,
    props: vt,
    attrs: vt,
    slots: vt,
    refs: vt,
    setupState: vt,
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
  return s.ctx = { _: s }, s.root = e ? e.root : s, s.emit = Cc.bind(null, s), t.ce && t.ce(s), s;
}
let At = null, Ir, Oi;
{
  const t = Zo(), e = (n, r) => {
    let i;
    return (i = t[n]) || (i = t[n] = []), i.push(r), (s) => {
      i.length > 1 ? i.forEach((o) => o(s)) : i[0](s);
    };
  };
  Ir = e(
    "__VUE_INSTANCE_SETTERS__",
    (n) => At = n
  ), Oi = e(
    "__VUE_SSR_SETTERS__",
    (n) => ti = n
  );
}
const Xn = (t) => {
  const e = At;
  return Ir(t), t.scope.on(), () => {
    t.scope.off(), Ir(e);
  };
}, io = () => {
  At && At.scope.off(), Ir(null);
};
function Vl(t) {
  return t.vnode.shapeFlag & 4;
}
let ti = !1;
function Ma(t, e = !1) {
  e && Oi(e);
  const { props: n, children: r } = t.vnode, i = Vl(t);
  oa(t, n, i, e), ca(t, r);
  const s = i ? Na(t, e) : void 0;
  return e && Oi(!1), s;
}
function Na(t, e) {
  const n = t.type;
  t.accessCache = /* @__PURE__ */ Object.create(null), t.proxy = gl(new Proxy(t.ctx, Jc));
  const { setup: r } = n;
  if (r) {
    const i = t.setupContext = r.length > 1 ? Ca(t) : null, s = Xn(t);
    en();
    const o = je(
      r,
      t,
      0,
      [
        t.props,
        i
      ]
    );
    if (nn(), s(), Xo(o)) {
      if (o.then(io, io), e)
        return o.then((l) => {
          so(t, l, e);
        }).catch((l) => {
          Xr(l, t, 0);
        });
      t.asyncDep = o;
    } else
      so(t, o, e);
  } else
    ql(t, e);
}
function so(t, e, n) {
  ut(e) ? t.type.__ssrInlineRender ? t.ssrRender = e : t.render = e : Et(e) && (t.setupState = yl(e)), ql(t, n);
}
let oo;
function ql(t, e, n) {
  const r = t.type;
  if (!t.render) {
    if (!e && oo && !r.render) {
      const i = r.template || gs(t).template;
      if (i) {
        const { isCustomElement: s, compilerOptions: o } = t.appContext.config, { delimiters: l, compilerOptions: u } = r, c = Ct(
          Ct(
            {
              isCustomElement: s,
              delimiters: l
            },
            o
          ),
          u
        );
        r.render = oo(i, c);
      }
    }
    t.render = r.render || re;
  }
  {
    const i = Xn(t);
    en();
    try {
      Qc(t);
    } finally {
      nn(), i();
    }
  }
}
function Ra(t) {
  return t.attrsProxy || (t.attrsProxy = new Proxy(
    t.attrs,
    {
      get(e, n) {
        return Ut(t, "get", "$attrs"), e[n];
      }
    }
  ));
}
function Ca(t) {
  const e = (n) => {
    t.exposed = n || {};
  };
  return {
    get attrs() {
      return Ra(t);
    },
    slots: t.slots,
    emit: t.emit,
    expose: e
  };
}
function ei(t) {
  if (t.exposed)
    return t.exposeProxy || (t.exposeProxy = new Proxy(yl(gl(t.exposed)), {
      get(e, n) {
        if (n in e)
          return e[n];
        if (n in In)
          return In[n](t);
      },
      has(e, n) {
        return n in e || n in In;
      }
    }));
}
function Ta(t) {
  return ut(t) && "__vccOpts" in t;
}
const Ai = (t, e) => vc(t, e, ti), Pa = "3.4.21";
/**
* @vue/runtime-dom v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const La = "http://www.w3.org/2000/svg", Ia = "http://www.w3.org/1998/Math/MathML", Oe = typeof document < "u" ? document : null, lo = Oe && /* @__PURE__ */ Oe.createElement("template"), $a = {
  insert: (t, e, n) => {
    e.insertBefore(t, n || null);
  },
  remove: (t) => {
    const e = t.parentNode;
    e && e.removeChild(t);
  },
  createElement: (t, e, n, r) => {
    const i = e === "svg" ? Oe.createElementNS(La, t) : e === "mathml" ? Oe.createElementNS(Ia, t) : Oe.createElement(t, n ? { is: n } : void 0);
    return t === "select" && r && r.multiple != null && i.setAttribute("multiple", r.multiple), i;
  },
  createText: (t) => Oe.createTextNode(t),
  createComment: (t) => Oe.createComment(t),
  setText: (t, e) => {
    t.nodeValue = e;
  },
  setElementText: (t, e) => {
    t.textContent = e;
  },
  parentNode: (t) => t.parentNode,
  nextSibling: (t) => t.nextSibling,
  querySelector: (t) => Oe.querySelector(t),
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
      lo.innerHTML = r === "svg" ? `<svg>${t}</svg>` : r === "mathml" ? `<math>${t}</math>` : t;
      const l = lo.content;
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
}, Oa = Symbol("_vtc");
function Aa(t, e, n) {
  const r = t[Oa];
  r && (e = (e ? [e, ...r] : [...r]).join(" ")), e == null ? t.removeAttribute("class") : n ? t.setAttribute("class", e) : t.className = e;
}
const $r = Symbol("_vod"), Gl = Symbol("_vsh"), xr = {
  beforeMount(t, { value: e }, { transition: n }) {
    t[$r] = t.style.display === "none" ? "" : t.style.display, n && e ? n.beforeEnter(t) : Sn(t, e);
  },
  mounted(t, { value: e }, { transition: n }) {
    n && e && n.enter(t);
  },
  updated(t, { value: e, oldValue: n }, { transition: r }) {
    !e != !n && (r ? e ? (r.beforeEnter(t), Sn(t, !0), r.enter(t)) : r.leave(t, () => {
      Sn(t, !1);
    }) : Sn(t, e));
  },
  beforeUnmount(t, { value: e }) {
    Sn(t, e);
  }
};
function Sn(t, e) {
  t.style.display = e ? t[$r] : "none", t[Gl] = !e;
}
const Fa = Symbol(""), ja = /(^|;)\s*display\s*:/;
function Ba(t, e, n) {
  const r = t.style, i = Tt(n);
  let s = !1;
  if (n && !i) {
    if (e)
      if (Tt(e))
        for (const o of e.split(";")) {
          const l = o.slice(0, o.indexOf(":")).trim();
          n[l] == null && Er(r, l, "");
        }
      else
        for (const o in e)
          n[o] == null && Er(r, o, "");
    for (const o in n)
      o === "display" && (s = !0), Er(r, o, n[o]);
  } else if (i) {
    if (e !== n) {
      const o = r[Fa];
      o && (n += ";" + o), r.cssText = n, s = ja.test(n);
    }
  } else e && t.removeAttribute("style");
  $r in t && (t[$r] = s ? r.display : "", t[Gl] && (r.display = "none"));
}
const uo = /\s*!important$/;
function Er(t, e, n) {
  if (rt(n))
    n.forEach((r) => Er(t, e, r));
  else if (n == null && (n = ""), e.startsWith("--"))
    t.setProperty(e, n);
  else {
    const r = za(t, e);
    uo.test(n) ? t.setProperty(
      le(r),
      n.replace(uo, ""),
      "important"
    ) : t[r] = n;
  }
}
const co = ["Webkit", "Moz", "ms"], mi = {};
function za(t, e) {
  const n = mi[e];
  if (n)
    return n;
  let r = Se(e);
  if (r !== "filter" && r in t)
    return mi[e] = r;
  r = Qo(r);
  for (let i = 0; i < co.length; i++) {
    const s = co[i] + r;
    if (s in t)
      return mi[e] = s;
  }
  return e;
}
const ao = "http://www.w3.org/1999/xlink";
function Da(t, e, n, r, i) {
  if (r && e.startsWith("xlink:"))
    n == null ? t.removeAttributeNS(ao, e.slice(6, e.length)) : t.setAttributeNS(ao, e, n);
  else {
    const s = Yu(e);
    n == null || s && !tl(n) ? t.removeAttribute(e) : t.setAttribute(e, s ? "" : n);
  }
}
function Va(t, e, n, r, i, s, o) {
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
    c === "boolean" ? n = tl(n) : n == null && c === "string" ? (n = "", u = !0) : c === "number" && (n = 0, u = !0);
  }
  try {
    t[e] = n;
  } catch {
  }
  u && t.removeAttribute(e);
}
function qa(t, e, n, r) {
  t.addEventListener(e, n, r);
}
function Ga(t, e, n, r) {
  t.removeEventListener(e, n, r);
}
const fo = Symbol("_vei");
function Ha(t, e, n, r, i = null) {
  const s = t[fo] || (t[fo] = {}), o = s[e];
  if (r && o)
    o.value = r;
  else {
    const [l, u] = Ua(e);
    if (r) {
      const c = s[e] = Xa(r, i);
      qa(t, l, c, u);
    } else o && (Ga(t, l, o, u), s[e] = void 0);
  }
}
const ho = /(?:Once|Passive|Capture)$/;
function Ua(t) {
  let e;
  if (ho.test(t)) {
    e = {};
    let r;
    for (; r = t.match(ho); )
      t = t.slice(0, t.length - r[0].length), e[r[0].toLowerCase()] = !0;
  }
  return [t[2] === ":" ? t.slice(3) : le(t.slice(2)), e];
}
let wi = 0;
const Wa = /* @__PURE__ */ Promise.resolve(), Ka = () => wi || (Wa.then(() => wi = 0), wi = Date.now());
function Xa(t, e) {
  const n = (r) => {
    if (!r._vts)
      r._vts = Date.now();
    else if (r._vts <= n.attached)
      return;
    ae(
      Ya(r, n.value),
      e,
      5,
      [r]
    );
  };
  return n.value = t, n.attached = Ka(), n;
}
function Ya(t, e) {
  if (rt(e)) {
    const n = t.stopImmediatePropagation;
    return t.stopImmediatePropagation = () => {
      n.call(t), t._stopped = !0;
    }, e.map((r) => (i) => !i._stopped && r && r(i));
  } else
    return e;
}
const po = (t) => t.charCodeAt(0) === 111 && t.charCodeAt(1) === 110 && // lowercase letter
t.charCodeAt(2) > 96 && t.charCodeAt(2) < 123, Ja = (t, e, n, r, i, s, o, l, u) => {
  const c = i === "svg";
  e === "class" ? Aa(t, r, c) : e === "style" ? Ba(t, n, r) : Gr(e) ? Zi(e) || Ha(t, e, n, r, o) : (e[0] === "." ? (e = e.slice(1), !0) : e[0] === "^" ? (e = e.slice(1), !1) : Qa(t, e, r, c)) ? Va(
    t,
    e,
    r,
    s,
    o,
    l,
    u
  ) : (e === "true-value" ? t._trueValue = r : e === "false-value" && (t._falseValue = r), Da(t, e, r, c));
};
function Qa(t, e, n, r) {
  if (r)
    return !!(e === "innerHTML" || e === "textContent" || e in t && po(e) && ut(n));
  if (e === "spellcheck" || e === "draggable" || e === "translate" || e === "form" || e === "list" && t.tagName === "INPUT" || e === "type" && t.tagName === "TEXTAREA")
    return !1;
  if (e === "width" || e === "height") {
    const i = t.tagName;
    if (i === "IMG" || i === "VIDEO" || i === "CANVAS" || i === "SOURCE")
      return !1;
  }
  return po(e) && Tt(n) ? !1 : e in t;
}
const Za = /* @__PURE__ */ Ct({ patchProp: Ja }, $a);
let go;
function tf() {
  return go || (go = fa(Za));
}
const mo = (...t) => {
  tf().render(...t);
}, ef = { class: "graph-controller__controls-overview" }, nf = { key: 0 }, rf = { key: 1 }, sf = { key: 0 }, of = { key: 1 }, lf = /* @__PURE__ */ ds({
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
    return (o, l) => (Te(), Pe("table", ef, [
      yr(Xt("thead", null, [
        Xt("tr", null, [
          Xt("th", null, Re(i[0]), 1),
          Xt("th", null, Re(i[1]), 1)
        ])
      ], 512), [
        [xr, e.showHeader]
      ]),
      Xt("tbody", null, [
        (Te(), Pe(ne, null, Ks(n, (u) => yr(Xt("tr", {
          key: u.action
        }, [
          Xt("td", null, Re(u.action), 1),
          Tr(s) ? (Te(), Pe("td", nf, Re(u.touch), 1)) : (Te(), Pe("td", rf, Re(u.desktop), 1))
        ]), [
          [xr, e.showControlsGraph]
        ])), 64)),
        (Te(), Pe(ne, null, Ks(r, (u) => yr(Xt("tr", {
          key: u.action
        }, [
          Xt("td", null, Re(u.action), 1),
          Tr(s) ? (Te(), Pe("td", sf, Re(u.touch), 1)) : (Te(), Pe("td", of, Re(u.desktop), 1))
        ]), [
          [xr, e.showControlsEnvironment]
        ])), 64))
      ])
    ]));
  }
}), uf = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [r, i] of e)
    n[r] = i;
  return n;
}, cf = /* @__PURE__ */ uf(lf, [["__scopeId", "data-v-8c3d818f"]]);
var af = { value: () => {
} };
function Yn() {
  for (var t = 0, e = arguments.length, n = {}, r; t < e; ++t) {
    if (!(r = arguments[t] + "") || r in n || /[\s.]/.test(r)) throw new Error("illegal type: " + r);
    n[r] = [];
  }
  return new Sr(n);
}
function Sr(t) {
  this._ = t;
}
function ff(t, e) {
  return t.trim().split(/^|\s+/).map(function(n) {
    var r = "", i = n.indexOf(".");
    if (i >= 0 && (r = n.slice(i + 1), n = n.slice(0, i)), n && !e.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: r };
  });
}
Sr.prototype = Yn.prototype = {
  constructor: Sr,
  on: function(t, e) {
    var n = this._, r = ff(t + "", n), i, s = -1, o = r.length;
    if (arguments.length < 2) {
      for (; ++s < o; ) if ((i = (t = r[s]).type) && (i = hf(n[i], t.name))) return i;
      return;
    }
    if (e != null && typeof e != "function") throw new Error("invalid callback: " + e);
    for (; ++s < o; )
      if (i = (t = r[s]).type) n[i] = wo(n[i], t.name, e);
      else if (e == null) for (i in n) n[i] = wo(n[i], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, e = this._;
    for (var n in e) t[n] = e[n].slice();
    return new Sr(t);
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
function hf(t, e) {
  for (var n = 0, r = t.length, i; n < r; ++n)
    if ((i = t[n]).name === e)
      return i.value;
}
function wo(t, e, n) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === e) {
      t[r] = af, t = t.slice(0, r).concat(t.slice(r + 1));
      break;
    }
  return n != null && t.push({ name: e, value: n }), t;
}
var Fi = "http://www.w3.org/1999/xhtml";
const yo = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Fi,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function ni(t) {
  var e = t += "", n = e.indexOf(":");
  return n >= 0 && (e = t.slice(0, n)) !== "xmlns" && (t = t.slice(n + 1)), yo.hasOwnProperty(e) ? { space: yo[e], local: t } : t;
}
function df(t) {
  return function() {
    var e = this.ownerDocument, n = this.namespaceURI;
    return n === Fi && e.documentElement.namespaceURI === Fi ? e.createElement(t) : e.createElementNS(n, t);
  };
}
function pf(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function Hl(t) {
  var e = ni(t);
  return (e.local ? pf : df)(e);
}
function gf() {
}
function ys(t) {
  return t == null ? gf : function() {
    return this.querySelector(t);
  };
}
function mf(t) {
  typeof t != "function" && (t = ys(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var s = e[i], o = s.length, l = r[i] = new Array(o), u, c, a = 0; a < o; ++a)
      (u = s[a]) && (c = t.call(u, u.__data__, a, s)) && ("__data__" in u && (c.__data__ = u.__data__), l[a] = c);
  return new Qt(r, this._parents);
}
function wf(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function yf() {
  return [];
}
function Ul(t) {
  return t == null ? yf : function() {
    return this.querySelectorAll(t);
  };
}
function _f(t) {
  return function() {
    return wf(t.apply(this, arguments));
  };
}
function vf(t) {
  typeof t == "function" ? t = _f(t) : t = Ul(t);
  for (var e = this._groups, n = e.length, r = [], i = [], s = 0; s < n; ++s)
    for (var o = e[s], l = o.length, u, c = 0; c < l; ++c)
      (u = o[c]) && (r.push(t.call(u, u.__data__, c, o)), i.push(u));
  return new Qt(r, i);
}
function Wl(t) {
  return function() {
    return this.matches(t);
  };
}
function Kl(t) {
  return function(e) {
    return e.matches(t);
  };
}
var bf = Array.prototype.find;
function xf(t) {
  return function() {
    return bf.call(this.children, t);
  };
}
function Ef() {
  return this.firstElementChild;
}
function Sf(t) {
  return this.select(t == null ? Ef : xf(typeof t == "function" ? t : Kl(t)));
}
var kf = Array.prototype.filter;
function Mf() {
  return Array.from(this.children);
}
function Nf(t) {
  return function() {
    return kf.call(this.children, t);
  };
}
function Rf(t) {
  return this.selectAll(t == null ? Mf : Nf(typeof t == "function" ? t : Kl(t)));
}
function Cf(t) {
  typeof t != "function" && (t = Wl(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var s = e[i], o = s.length, l = r[i] = [], u, c = 0; c < o; ++c)
      (u = s[c]) && t.call(u, u.__data__, c, s) && l.push(u);
  return new Qt(r, this._parents);
}
function Xl(t) {
  return new Array(t.length);
}
function Tf() {
  return new Qt(this._enter || this._groups.map(Xl), this._parents);
}
function Or(t, e) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = e;
}
Or.prototype = {
  constructor: Or,
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
function Pf(t) {
  return function() {
    return t;
  };
}
function Lf(t, e, n, r, i, s) {
  for (var o = 0, l, u = e.length, c = s.length; o < c; ++o)
    (l = e[o]) ? (l.__data__ = s[o], r[o] = l) : n[o] = new Or(t, s[o]);
  for (; o < u; ++o)
    (l = e[o]) && (i[o] = l);
}
function If(t, e, n, r, i, s, o) {
  var l, u, c = /* @__PURE__ */ new Map(), a = e.length, f = s.length, h = new Array(a), p;
  for (l = 0; l < a; ++l)
    (u = e[l]) && (h[l] = p = o.call(u, u.__data__, l, e) + "", c.has(p) ? i[l] = u : c.set(p, u));
  for (l = 0; l < f; ++l)
    p = o.call(t, s[l], l, s) + "", (u = c.get(p)) ? (r[l] = u, u.__data__ = s[l], c.delete(p)) : n[l] = new Or(t, s[l]);
  for (l = 0; l < a; ++l)
    (u = e[l]) && c.get(h[l]) === u && (i[l] = u);
}
function $f(t) {
  return t.__data__;
}
function Of(t, e) {
  if (!arguments.length) return Array.from(this, $f);
  var n = e ? If : Lf, r = this._parents, i = this._groups;
  typeof t != "function" && (t = Pf(t));
  for (var s = i.length, o = new Array(s), l = new Array(s), u = new Array(s), c = 0; c < s; ++c) {
    var a = r[c], f = i[c], h = f.length, p = Af(t.call(a, a && a.__data__, c, r)), w = p.length, v = l[c] = new Array(w), _ = o[c] = new Array(w), d = u[c] = new Array(h);
    n(a, f, v, _, d, p, e);
    for (var C = 0, P = 0, y, k; C < w; ++C)
      if (y = v[C]) {
        for (C >= P && (P = C + 1); !(k = _[P]) && ++P < w; ) ;
        y._next = k || null;
      }
  }
  return o = new Qt(o, r), o._enter = l, o._exit = u, o;
}
function Af(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function Ff() {
  return new Qt(this._exit || this._groups.map(Xl), this._parents);
}
function jf(t, e, n) {
  var r = this.enter(), i = this, s = this.exit();
  return typeof t == "function" ? (r = t(r), r && (r = r.selection())) : r = r.append(t + ""), e != null && (i = e(i), i && (i = i.selection())), n == null ? s.remove() : n(s), r && i ? r.merge(i).order() : i;
}
function Bf(t) {
  for (var e = t.selection ? t.selection() : t, n = this._groups, r = e._groups, i = n.length, s = r.length, o = Math.min(i, s), l = new Array(i), u = 0; u < o; ++u)
    for (var c = n[u], a = r[u], f = c.length, h = l[u] = new Array(f), p, w = 0; w < f; ++w)
      (p = c[w] || a[w]) && (h[w] = p);
  for (; u < i; ++u)
    l[u] = n[u];
  return new Qt(l, this._parents);
}
function zf() {
  for (var t = this._groups, e = -1, n = t.length; ++e < n; )
    for (var r = t[e], i = r.length - 1, s = r[i], o; --i >= 0; )
      (o = r[i]) && (s && o.compareDocumentPosition(s) ^ 4 && s.parentNode.insertBefore(o, s), s = o);
  return this;
}
function Df(t) {
  t || (t = Vf);
  function e(f, h) {
    return f && h ? t(f.__data__, h.__data__) : !f - !h;
  }
  for (var n = this._groups, r = n.length, i = new Array(r), s = 0; s < r; ++s) {
    for (var o = n[s], l = o.length, u = i[s] = new Array(l), c, a = 0; a < l; ++a)
      (c = o[a]) && (u[a] = c);
    u.sort(e);
  }
  return new Qt(i, this._parents).order();
}
function Vf(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function qf() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function Gf() {
  return Array.from(this);
}
function Hf() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, s = r.length; i < s; ++i) {
      var o = r[i];
      if (o) return o;
    }
  return null;
}
function Uf() {
  let t = 0;
  for (const e of this) ++t;
  return t;
}
function Wf() {
  return !this.node();
}
function Kf(t) {
  for (var e = this._groups, n = 0, r = e.length; n < r; ++n)
    for (var i = e[n], s = 0, o = i.length, l; s < o; ++s)
      (l = i[s]) && t.call(l, l.__data__, s, i);
  return this;
}
function Xf(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Yf(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Jf(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function Qf(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function Zf(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttribute(t) : this.setAttribute(t, n);
  };
}
function th(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, n);
  };
}
function eh(t, e) {
  var n = ni(t);
  if (arguments.length < 2) {
    var r = this.node();
    return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n);
  }
  return this.each((e == null ? n.local ? Yf : Xf : typeof e == "function" ? n.local ? th : Zf : n.local ? Qf : Jf)(n, e));
}
function Yl(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function nh(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function rh(t, e, n) {
  return function() {
    this.style.setProperty(t, e, n);
  };
}
function ih(t, e, n) {
  return function() {
    var r = e.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, n);
  };
}
function sh(t, e, n) {
  return arguments.length > 1 ? this.each((e == null ? nh : typeof e == "function" ? ih : rh)(t, e, n ?? "")) : wn(this.node(), t);
}
function wn(t, e) {
  return t.style.getPropertyValue(e) || Yl(t).getComputedStyle(t, null).getPropertyValue(e);
}
function oh(t) {
  return function() {
    delete this[t];
  };
}
function lh(t, e) {
  return function() {
    this[t] = e;
  };
}
function uh(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? delete this[t] : this[t] = n;
  };
}
function ch(t, e) {
  return arguments.length > 1 ? this.each((e == null ? oh : typeof e == "function" ? uh : lh)(t, e)) : this.node()[t];
}
function Jl(t) {
  return t.trim().split(/^|\s+/);
}
function _s(t) {
  return t.classList || new Ql(t);
}
function Ql(t) {
  this._node = t, this._names = Jl(t.getAttribute("class") || "");
}
Ql.prototype = {
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
function Zl(t, e) {
  for (var n = _s(t), r = -1, i = e.length; ++r < i; ) n.add(e[r]);
}
function tu(t, e) {
  for (var n = _s(t), r = -1, i = e.length; ++r < i; ) n.remove(e[r]);
}
function ah(t) {
  return function() {
    Zl(this, t);
  };
}
function fh(t) {
  return function() {
    tu(this, t);
  };
}
function hh(t, e) {
  return function() {
    (e.apply(this, arguments) ? Zl : tu)(this, t);
  };
}
function dh(t, e) {
  var n = Jl(t + "");
  if (arguments.length < 2) {
    for (var r = _s(this.node()), i = -1, s = n.length; ++i < s; ) if (!r.contains(n[i])) return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? hh : e ? ah : fh)(n, e));
}
function ph() {
  this.textContent = "";
}
function gh(t) {
  return function() {
    this.textContent = t;
  };
}
function mh(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
function wh(t) {
  return arguments.length ? this.each(t == null ? ph : (typeof t == "function" ? mh : gh)(t)) : this.node().textContent;
}
function yh() {
  this.innerHTML = "";
}
function _h(t) {
  return function() {
    this.innerHTML = t;
  };
}
function vh(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function bh(t) {
  return arguments.length ? this.each(t == null ? yh : (typeof t == "function" ? vh : _h)(t)) : this.node().innerHTML;
}
function xh() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Eh() {
  return this.each(xh);
}
function Sh() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function kh() {
  return this.each(Sh);
}
function Mh(t) {
  var e = typeof t == "function" ? t : Hl(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function Nh() {
  return null;
}
function Rh(t, e) {
  var n = typeof t == "function" ? t : Hl(t), r = e == null ? Nh : typeof e == "function" ? e : ys(e);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function Ch() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function Th() {
  return this.each(Ch);
}
function Ph() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Lh() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Ih(t) {
  return this.select(t ? Lh : Ph);
}
function $h(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function Oh(t) {
  return function(e) {
    t.call(this, e, this.__data__);
  };
}
function Ah(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var n = "", r = e.indexOf(".");
    return r >= 0 && (n = e.slice(r + 1), e = e.slice(0, r)), { type: e, name: n };
  });
}
function Fh(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var n = 0, r = -1, i = e.length, s; n < i; ++n)
        s = e[n], (!t.type || s.type === t.type) && s.name === t.name ? this.removeEventListener(s.type, s.listener, s.options) : e[++r] = s;
      ++r ? e.length = r : delete this.__on;
    }
  };
}
function jh(t, e, n) {
  return function() {
    var r = this.__on, i, s = Oh(e);
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
function Bh(t, e, n) {
  var r = Ah(t + ""), i, s = r.length, o;
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
  for (l = e ? jh : Fh, i = 0; i < s; ++i) this.each(l(r[i], e, n));
  return this;
}
function eu(t, e, n) {
  var r = Yl(t), i = r.CustomEvent;
  typeof i == "function" ? i = new i(e, n) : (i = r.document.createEvent("Event"), n ? (i.initEvent(e, n.bubbles, n.cancelable), i.detail = n.detail) : i.initEvent(e, !1, !1)), t.dispatchEvent(i);
}
function zh(t, e) {
  return function() {
    return eu(this, t, e);
  };
}
function Dh(t, e) {
  return function() {
    return eu(this, t, e.apply(this, arguments));
  };
}
function Vh(t, e) {
  return this.each((typeof e == "function" ? Dh : zh)(t, e));
}
function* qh() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, s = r.length, o; i < s; ++i)
      (o = r[i]) && (yield o);
}
var nu = [null];
function Qt(t, e) {
  this._groups = t, this._parents = e;
}
function Jn() {
  return new Qt([[document.documentElement]], nu);
}
function Gh() {
  return this;
}
Qt.prototype = Jn.prototype = {
  constructor: Qt,
  select: mf,
  selectAll: vf,
  selectChild: Sf,
  selectChildren: Rf,
  filter: Cf,
  data: Of,
  enter: Tf,
  exit: Ff,
  join: jf,
  merge: Bf,
  selection: Gh,
  order: zf,
  sort: Df,
  call: qf,
  nodes: Gf,
  node: Hf,
  size: Uf,
  empty: Wf,
  each: Kf,
  attr: eh,
  style: sh,
  property: ch,
  classed: dh,
  text: wh,
  html: bh,
  raise: Eh,
  lower: kh,
  append: Mh,
  insert: Rh,
  remove: Th,
  clone: Ih,
  datum: $h,
  on: Bh,
  dispatch: Vh,
  [Symbol.iterator]: qh
};
function xt(t) {
  return typeof t == "string" ? new Qt([[document.querySelector(t)]], [document.documentElement]) : new Qt([[t]], nu);
}
function ru(t) {
  let e;
  for (; e = t.sourceEvent; ) t = e;
  return t;
}
function ee(t, e) {
  if (t = ru(t), e === void 0 && (e = t.currentTarget), e) {
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
function Hh(t, e) {
  return t.target && (t = ru(t), e === void 0 && (e = t.currentTarget), t = t.touches || [t]), Array.from(t, (n) => ee(n, e));
}
const Uh = { passive: !1 }, qn = { capture: !0, passive: !1 };
function yi(t) {
  t.stopImmediatePropagation();
}
function hn(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function iu(t) {
  var e = t.document.documentElement, n = xt(t).on("dragstart.drag", hn, qn);
  "onselectstart" in e ? n.on("selectstart.drag", hn, qn) : (e.__noselect = e.style.MozUserSelect, e.style.MozUserSelect = "none");
}
function su(t, e) {
  var n = t.document.documentElement, r = xt(t).on("dragstart.drag", null);
  e && (r.on("click.drag", hn, qn), setTimeout(function() {
    r.on("click.drag", null);
  }, 0)), "onselectstart" in n ? r.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
const ur = (t) => () => t;
function ji(t, {
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
ji.prototype.on = function() {
  var t = this._.on.apply(this._, arguments);
  return t === this._ ? this : t;
};
function Wh(t) {
  return !t.ctrlKey && !t.button;
}
function Kh() {
  return this.parentNode;
}
function Xh(t, e) {
  return e ?? { x: t.x, y: t.y };
}
function Yh() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Jh() {
  var t = Wh, e = Kh, n = Xh, r = Yh, i = {}, s = Yn("start", "drag", "end"), o = 0, l, u, c, a, f = 0;
  function h(y) {
    y.on("mousedown.drag", p).filter(r).on("touchstart.drag", _).on("touchmove.drag", d, Uh).on("touchend.drag touchcancel.drag", C).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function p(y, k) {
    if (!(a || !t.call(this, y, k))) {
      var L = P(this, e.call(this, y, k), y, k, "mouse");
      L && (xt(y.view).on("mousemove.drag", w, qn).on("mouseup.drag", v, qn), iu(y.view), yi(y), c = !1, l = y.clientX, u = y.clientY, L("start", y));
    }
  }
  function w(y) {
    if (hn(y), !c) {
      var k = y.clientX - l, L = y.clientY - u;
      c = k * k + L * L > f;
    }
    i.mouse("drag", y);
  }
  function v(y) {
    xt(y.view).on("mousemove.drag mouseup.drag", null), su(y.view, c), hn(y), i.mouse("end", y);
  }
  function _(y, k) {
    if (t.call(this, y, k)) {
      var L = y.changedTouches, D = e.call(this, y, k), G = L.length, Q, X;
      for (Q = 0; Q < G; ++Q)
        (X = P(this, D, y, k, L[Q].identifier, L[Q])) && (yi(y), X("start", y, L[Q]));
    }
  }
  function d(y) {
    var k = y.changedTouches, L = k.length, D, G;
    for (D = 0; D < L; ++D)
      (G = i[k[D].identifier]) && (hn(y), G("drag", y, k[D]));
  }
  function C(y) {
    var k = y.changedTouches, L = k.length, D, G;
    for (a && clearTimeout(a), a = setTimeout(function() {
      a = null;
    }, 500), D = 0; D < L; ++D)
      (G = i[k[D].identifier]) && (yi(y), G("end", y, k[D]));
  }
  function P(y, k, L, D, G, Q) {
    var X = s.copy(), et = ee(Q || L, k), ot, U, x;
    if ((x = n.call(y, new ji("beforestart", {
      sourceEvent: L,
      target: h,
      identifier: G,
      active: o,
      x: et[0],
      y: et[1],
      dx: 0,
      dy: 0,
      dispatch: X
    }), D)) != null)
      return ot = x.x - et[0] || 0, U = x.y - et[1] || 0, function V(N, A, z) {
        var Y = et, J;
        switch (N) {
          case "start":
            i[G] = V, J = o++;
            break;
          case "end":
            delete i[G], --o;
          case "drag":
            et = ee(z || A, k), J = o;
            break;
        }
        X.call(
          N,
          y,
          new ji(N, {
            sourceEvent: A,
            subject: x,
            target: h,
            identifier: G,
            active: J,
            x: et[0] + ot,
            y: et[1] + U,
            dx: et[0] - Y[0],
            dy: et[1] - Y[1],
            dispatch: X
          }),
          D
        );
      };
  }
  return h.filter = function(y) {
    return arguments.length ? (t = typeof y == "function" ? y : ur(!!y), h) : t;
  }, h.container = function(y) {
    return arguments.length ? (e = typeof y == "function" ? y : ur(y), h) : e;
  }, h.subject = function(y) {
    return arguments.length ? (n = typeof y == "function" ? y : ur(y), h) : n;
  }, h.touchable = function(y) {
    return arguments.length ? (r = typeof y == "function" ? y : ur(!!y), h) : r;
  }, h.on = function() {
    var y = s.on.apply(s, arguments);
    return y === s ? h : y;
  }, h.clickDistance = function(y) {
    return arguments.length ? (f = (y = +y) * y, h) : Math.sqrt(f);
  }, h;
}
function vs(t, e, n) {
  t.prototype = e.prototype = n, n.constructor = t;
}
function ou(t, e) {
  var n = Object.create(t.prototype);
  for (var r in e) n[r] = e[r];
  return n;
}
function Qn() {
}
var Gn = 0.7, Ar = 1 / Gn, dn = "\\s*([+-]?\\d+)\\s*", Hn = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", ye = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", Qh = /^#([0-9a-f]{3,8})$/, Zh = new RegExp(`^rgb\\(${dn},${dn},${dn}\\)$`), td = new RegExp(`^rgb\\(${ye},${ye},${ye}\\)$`), ed = new RegExp(`^rgba\\(${dn},${dn},${dn},${Hn}\\)$`), nd = new RegExp(`^rgba\\(${ye},${ye},${ye},${Hn}\\)$`), rd = new RegExp(`^hsl\\(${Hn},${ye},${ye}\\)$`), id = new RegExp(`^hsla\\(${Hn},${ye},${ye},${Hn}\\)$`), _o = {
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
vs(Qn, Ze, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: vo,
  // Deprecated! Use color.formatHex.
  formatHex: vo,
  formatHex8: sd,
  formatHsl: od,
  formatRgb: bo,
  toString: bo
});
function vo() {
  return this.rgb().formatHex();
}
function sd() {
  return this.rgb().formatHex8();
}
function od() {
  return lu(this).formatHsl();
}
function bo() {
  return this.rgb().formatRgb();
}
function Ze(t) {
  var e, n;
  return t = (t + "").trim().toLowerCase(), (e = Qh.exec(t)) ? (n = e[1].length, e = parseInt(e[1], 16), n === 6 ? xo(e) : n === 3 ? new Ht(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : n === 8 ? cr(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : n === 4 ? cr(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = Zh.exec(t)) ? new Ht(e[1], e[2], e[3], 1) : (e = td.exec(t)) ? new Ht(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = ed.exec(t)) ? cr(e[1], e[2], e[3], e[4]) : (e = nd.exec(t)) ? cr(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = rd.exec(t)) ? ko(e[1], e[2] / 100, e[3] / 100, 1) : (e = id.exec(t)) ? ko(e[1], e[2] / 100, e[3] / 100, e[4]) : _o.hasOwnProperty(t) ? xo(_o[t]) : t === "transparent" ? new Ht(NaN, NaN, NaN, 0) : null;
}
function xo(t) {
  return new Ht(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function cr(t, e, n, r) {
  return r <= 0 && (t = e = n = NaN), new Ht(t, e, n, r);
}
function ld(t) {
  return t instanceof Qn || (t = Ze(t)), t ? (t = t.rgb(), new Ht(t.r, t.g, t.b, t.opacity)) : new Ht();
}
function Bi(t, e, n, r) {
  return arguments.length === 1 ? ld(t) : new Ht(t, e, n, r ?? 1);
}
function Ht(t, e, n, r) {
  this.r = +t, this.g = +e, this.b = +n, this.opacity = +r;
}
vs(Ht, Bi, ou(Qn, {
  brighter(t) {
    return t = t == null ? Ar : Math.pow(Ar, t), new Ht(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Gn : Math.pow(Gn, t), new Ht(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Ht(Qe(this.r), Qe(this.g), Qe(this.b), Fr(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Eo,
  // Deprecated! Use color.formatHex.
  formatHex: Eo,
  formatHex8: ud,
  formatRgb: So,
  toString: So
}));
function Eo() {
  return `#${Xe(this.r)}${Xe(this.g)}${Xe(this.b)}`;
}
function ud() {
  return `#${Xe(this.r)}${Xe(this.g)}${Xe(this.b)}${Xe((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function So() {
  const t = Fr(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${Qe(this.r)}, ${Qe(this.g)}, ${Qe(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function Fr(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function Qe(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function Xe(t) {
  return t = Qe(t), (t < 16 ? "0" : "") + t.toString(16);
}
function ko(t, e, n, r) {
  return r <= 0 ? t = e = n = NaN : n <= 0 || n >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new ue(t, e, n, r);
}
function lu(t) {
  if (t instanceof ue) return new ue(t.h, t.s, t.l, t.opacity);
  if (t instanceof Qn || (t = Ze(t)), !t) return new ue();
  if (t instanceof ue) return t;
  t = t.rgb();
  var e = t.r / 255, n = t.g / 255, r = t.b / 255, i = Math.min(e, n, r), s = Math.max(e, n, r), o = NaN, l = s - i, u = (s + i) / 2;
  return l ? (e === s ? o = (n - r) / l + (n < r) * 6 : n === s ? o = (r - e) / l + 2 : o = (e - n) / l + 4, l /= u < 0.5 ? s + i : 2 - s - i, o *= 60) : l = u > 0 && u < 1 ? 0 : o, new ue(o, l, u, t.opacity);
}
function cd(t, e, n, r) {
  return arguments.length === 1 ? lu(t) : new ue(t, e, n, r ?? 1);
}
function ue(t, e, n, r) {
  this.h = +t, this.s = +e, this.l = +n, this.opacity = +r;
}
vs(ue, cd, ou(Qn, {
  brighter(t) {
    return t = t == null ? Ar : Math.pow(Ar, t), new ue(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Gn : Math.pow(Gn, t), new ue(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, e = isNaN(t) || isNaN(this.s) ? 0 : this.s, n = this.l, r = n + (n < 0.5 ? n : 1 - n) * e, i = 2 * n - r;
    return new Ht(
      _i(t >= 240 ? t - 240 : t + 120, i, r),
      _i(t, i, r),
      _i(t < 120 ? t + 240 : t - 120, i, r),
      this.opacity
    );
  },
  clamp() {
    return new ue(Mo(this.h), ar(this.s), ar(this.l), Fr(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = Fr(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${Mo(this.h)}, ${ar(this.s) * 100}%, ${ar(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function Mo(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function ar(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function _i(t, e, n) {
  return (t < 60 ? e + (n - e) * t / 60 : t < 180 ? n : t < 240 ? e + (n - e) * (240 - t) / 60 : e) * 255;
}
const bs = (t) => () => t;
function ad(t, e) {
  return function(n) {
    return t + n * e;
  };
}
function fd(t, e, n) {
  return t = Math.pow(t, n), e = Math.pow(e, n) - t, n = 1 / n, function(r) {
    return Math.pow(t + r * e, n);
  };
}
function hd(t) {
  return (t = +t) == 1 ? uu : function(e, n) {
    return n - e ? fd(e, n, t) : bs(isNaN(e) ? n : e);
  };
}
function uu(t, e) {
  var n = e - t;
  return n ? ad(t, n) : bs(isNaN(t) ? e : t);
}
const jr = function t(e) {
  var n = hd(e);
  function r(i, s) {
    var o = n((i = Bi(i)).r, (s = Bi(s)).r), l = n(i.g, s.g), u = n(i.b, s.b), c = uu(i.opacity, s.opacity);
    return function(a) {
      return i.r = o(a), i.g = l(a), i.b = u(a), i.opacity = c(a), i + "";
    };
  }
  return r.gamma = t, r;
}(1);
function dd(t, e) {
  e || (e = []);
  var n = t ? Math.min(e.length, t.length) : 0, r = e.slice(), i;
  return function(s) {
    for (i = 0; i < n; ++i) r[i] = t[i] * (1 - s) + e[i] * s;
    return r;
  };
}
function pd(t) {
  return ArrayBuffer.isView(t) && !(t instanceof DataView);
}
function gd(t, e) {
  var n = e ? e.length : 0, r = t ? Math.min(n, t.length) : 0, i = new Array(r), s = new Array(n), o;
  for (o = 0; o < r; ++o) i[o] = xs(t[o], e[o]);
  for (; o < n; ++o) s[o] = e[o];
  return function(l) {
    for (o = 0; o < r; ++o) s[o] = i[o](l);
    return s;
  };
}
function md(t, e) {
  var n = /* @__PURE__ */ new Date();
  return t = +t, e = +e, function(r) {
    return n.setTime(t * (1 - r) + e * r), n;
  };
}
function ge(t, e) {
  return t = +t, e = +e, function(n) {
    return t * (1 - n) + e * n;
  };
}
function wd(t, e) {
  var n = {}, r = {}, i;
  (t === null || typeof t != "object") && (t = {}), (e === null || typeof e != "object") && (e = {});
  for (i in e)
    i in t ? n[i] = xs(t[i], e[i]) : r[i] = e[i];
  return function(s) {
    for (i in n) r[i] = n[i](s);
    return r;
  };
}
var zi = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, vi = new RegExp(zi.source, "g");
function yd(t) {
  return function() {
    return t;
  };
}
function _d(t) {
  return function(e) {
    return t(e) + "";
  };
}
function cu(t, e) {
  var n = zi.lastIndex = vi.lastIndex = 0, r, i, s, o = -1, l = [], u = [];
  for (t = t + "", e = e + ""; (r = zi.exec(t)) && (i = vi.exec(e)); )
    (s = i.index) > n && (s = e.slice(n, s), l[o] ? l[o] += s : l[++o] = s), (r = r[0]) === (i = i[0]) ? l[o] ? l[o] += i : l[++o] = i : (l[++o] = null, u.push({ i: o, x: ge(r, i) })), n = vi.lastIndex;
  return n < e.length && (s = e.slice(n), l[o] ? l[o] += s : l[++o] = s), l.length < 2 ? u[0] ? _d(u[0].x) : yd(e) : (e = u.length, function(c) {
    for (var a = 0, f; a < e; ++a) l[(f = u[a]).i] = f.x(c);
    return l.join("");
  });
}
function xs(t, e) {
  var n = typeof e, r;
  return e == null || n === "boolean" ? bs(e) : (n === "number" ? ge : n === "string" ? (r = Ze(e)) ? (e = r, jr) : cu : e instanceof Ze ? jr : e instanceof Date ? md : pd(e) ? dd : Array.isArray(e) ? gd : typeof e.valueOf != "function" && typeof e.toString != "function" || isNaN(e) ? wd : ge)(t, e);
}
var No = 180 / Math.PI, Di = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function au(t, e, n, r, i, s) {
  var o, l, u;
  return (o = Math.sqrt(t * t + e * e)) && (t /= o, e /= o), (u = t * n + e * r) && (n -= t * u, r -= e * u), (l = Math.sqrt(n * n + r * r)) && (n /= l, r /= l, u /= l), t * r < e * n && (t = -t, e = -e, u = -u, o = -o), {
    translateX: i,
    translateY: s,
    rotate: Math.atan2(e, t) * No,
    skewX: Math.atan(u) * No,
    scaleX: o,
    scaleY: l
  };
}
var fr;
function vd(t) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return e.isIdentity ? Di : au(e.a, e.b, e.c, e.d, e.e, e.f);
}
function bd(t) {
  return t == null || (fr || (fr = document.createElementNS("http://www.w3.org/2000/svg", "g")), fr.setAttribute("transform", t), !(t = fr.transform.baseVal.consolidate())) ? Di : (t = t.matrix, au(t.a, t.b, t.c, t.d, t.e, t.f));
}
function fu(t, e, n, r) {
  function i(c) {
    return c.length ? c.pop() + " " : "";
  }
  function s(c, a, f, h, p, w) {
    if (c !== f || a !== h) {
      var v = p.push("translate(", null, e, null, n);
      w.push({ i: v - 4, x: ge(c, f) }, { i: v - 2, x: ge(a, h) });
    } else (f || h) && p.push("translate(" + f + e + h + n);
  }
  function o(c, a, f, h) {
    c !== a ? (c - a > 180 ? a += 360 : a - c > 180 && (c += 360), h.push({ i: f.push(i(f) + "rotate(", null, r) - 2, x: ge(c, a) })) : a && f.push(i(f) + "rotate(" + a + r);
  }
  function l(c, a, f, h) {
    c !== a ? h.push({ i: f.push(i(f) + "skewX(", null, r) - 2, x: ge(c, a) }) : a && f.push(i(f) + "skewX(" + a + r);
  }
  function u(c, a, f, h, p, w) {
    if (c !== f || a !== h) {
      var v = p.push(i(p) + "scale(", null, ",", null, ")");
      w.push({ i: v - 4, x: ge(c, f) }, { i: v - 2, x: ge(a, h) });
    } else (f !== 1 || h !== 1) && p.push(i(p) + "scale(" + f + "," + h + ")");
  }
  return function(c, a) {
    var f = [], h = [];
    return c = t(c), a = t(a), s(c.translateX, c.translateY, a.translateX, a.translateY, f, h), o(c.rotate, a.rotate, f, h), l(c.skewX, a.skewX, f, h), u(c.scaleX, c.scaleY, a.scaleX, a.scaleY, f, h), c = a = null, function(p) {
      for (var w = -1, v = h.length, _; ++w < v; ) f[(_ = h[w]).i] = _.x(p);
      return f.join("");
    };
  };
}
var xd = fu(vd, "px, ", "px)", "deg)"), Ed = fu(bd, ", ", ")", ")"), Sd = 1e-12;
function Ro(t) {
  return ((t = Math.exp(t)) + 1 / t) / 2;
}
function kd(t) {
  return ((t = Math.exp(t)) - 1 / t) / 2;
}
function Md(t) {
  return ((t = Math.exp(2 * t)) - 1) / (t + 1);
}
const Nd = function t(e, n, r) {
  function i(s, o) {
    var l = s[0], u = s[1], c = s[2], a = o[0], f = o[1], h = o[2], p = a - l, w = f - u, v = p * p + w * w, _, d;
    if (v < Sd)
      d = Math.log(h / c) / e, _ = function(D) {
        return [
          l + D * p,
          u + D * w,
          c * Math.exp(e * D * d)
        ];
      };
    else {
      var C = Math.sqrt(v), P = (h * h - c * c + r * v) / (2 * c * n * C), y = (h * h - c * c - r * v) / (2 * h * n * C), k = Math.log(Math.sqrt(P * P + 1) - P), L = Math.log(Math.sqrt(y * y + 1) - y);
      d = (L - k) / e, _ = function(D) {
        var G = D * d, Q = Ro(k), X = c / (n * C) * (Q * Md(e * G + k) - kd(k));
        return [
          l + X * p,
          u + X * w,
          c * Q / Ro(e * G + k)
        ];
      };
    }
    return _.duration = d * 1e3 * e / Math.SQRT2, _;
  }
  return i.rho = function(s) {
    var o = Math.max(1e-3, +s), l = o * o, u = l * l;
    return t(o, l, u);
  }, i;
}(Math.SQRT2, 2, 4);
var yn = 0, Tn = 0, kn = 0, hu = 1e3, Br, Pn, zr = 0, tn = 0, ri = 0, Un = typeof performance == "object" && performance.now ? performance : Date, du = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function Es() {
  return tn || (du(Rd), tn = Un.now() + ri);
}
function Rd() {
  tn = 0;
}
function Dr() {
  this._call = this._time = this._next = null;
}
Dr.prototype = Ss.prototype = {
  constructor: Dr,
  restart: function(t, e, n) {
    if (typeof t != "function") throw new TypeError("callback is not a function");
    n = (n == null ? Es() : +n) + (e == null ? 0 : +e), !this._next && Pn !== this && (Pn ? Pn._next = this : Br = this, Pn = this), this._call = t, this._time = n, Vi();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Vi());
  }
};
function Ss(t, e, n) {
  var r = new Dr();
  return r.restart(t, e, n), r;
}
function Cd() {
  Es(), ++yn;
  for (var t = Br, e; t; )
    (e = tn - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
  --yn;
}
function Co() {
  tn = (zr = Un.now()) + ri, yn = Tn = 0;
  try {
    Cd();
  } finally {
    yn = 0, Pd(), tn = 0;
  }
}
function Td() {
  var t = Un.now(), e = t - zr;
  e > hu && (ri -= e, zr = t);
}
function Pd() {
  for (var t, e = Br, n, r = 1 / 0; e; )
    e._call ? (r > e._time && (r = e._time), t = e, e = e._next) : (n = e._next, e._next = null, e = t ? t._next = n : Br = n);
  Pn = t, Vi(r);
}
function Vi(t) {
  if (!yn) {
    Tn && (Tn = clearTimeout(Tn));
    var e = t - tn;
    e > 24 ? (t < 1 / 0 && (Tn = setTimeout(Co, t - Un.now() - ri)), kn && (kn = clearInterval(kn))) : (kn || (zr = Un.now(), kn = setInterval(Td, hu)), yn = 1, du(Co));
  }
}
function To(t, e, n) {
  var r = new Dr();
  return e = e == null ? 0 : +e, r.restart((i) => {
    r.stop(), t(i + e);
  }, e, n), r;
}
var Ld = Yn("start", "end", "cancel", "interrupt"), Id = [], pu = 0, Po = 1, qi = 2, kr = 3, Lo = 4, Gi = 5, Mr = 6;
function ii(t, e, n, r, i, s) {
  var o = t.__transition;
  if (!o) t.__transition = {};
  else if (n in o) return;
  $d(t, n, {
    name: e,
    index: r,
    // For context during callback.
    group: i,
    // For context during callback.
    on: Ld,
    tween: Id,
    time: s.time,
    delay: s.delay,
    duration: s.duration,
    ease: s.ease,
    timer: null,
    state: pu
  });
}
function ks(t, e) {
  var n = fe(t, e);
  if (n.state > pu) throw new Error("too late; already scheduled");
  return n;
}
function _e(t, e) {
  var n = fe(t, e);
  if (n.state > kr) throw new Error("too late; already running");
  return n;
}
function fe(t, e) {
  var n = t.__transition;
  if (!n || !(n = n[e])) throw new Error("transition not found");
  return n;
}
function $d(t, e, n) {
  var r = t.__transition, i;
  r[e] = n, n.timer = Ss(s, 0, n.time);
  function s(c) {
    n.state = Po, n.timer.restart(o, n.delay, n.time), n.delay <= c && o(c - n.delay);
  }
  function o(c) {
    var a, f, h, p;
    if (n.state !== Po) return u();
    for (a in r)
      if (p = r[a], p.name === n.name) {
        if (p.state === kr) return To(o);
        p.state === Lo ? (p.state = Mr, p.timer.stop(), p.on.call("interrupt", t, t.__data__, p.index, p.group), delete r[a]) : +a < e && (p.state = Mr, p.timer.stop(), p.on.call("cancel", t, t.__data__, p.index, p.group), delete r[a]);
      }
    if (To(function() {
      n.state === kr && (n.state = Lo, n.timer.restart(l, n.delay, n.time), l(c));
    }), n.state = qi, n.on.call("start", t, t.__data__, n.index, n.group), n.state === qi) {
      for (n.state = kr, i = new Array(h = n.tween.length), a = 0, f = -1; a < h; ++a)
        (p = n.tween[a].value.call(t, t.__data__, n.index, n.group)) && (i[++f] = p);
      i.length = f + 1;
    }
  }
  function l(c) {
    for (var a = c < n.duration ? n.ease.call(null, c / n.duration) : (n.timer.restart(u), n.state = Gi, 1), f = -1, h = i.length; ++f < h; )
      i[f].call(t, a);
    n.state === Gi && (n.on.call("end", t, t.__data__, n.index, n.group), u());
  }
  function u() {
    n.state = Mr, n.timer.stop(), delete r[e];
    for (var c in r) return;
    delete t.__transition;
  }
}
function Nr(t, e) {
  var n = t.__transition, r, i, s = !0, o;
  if (n) {
    e = e == null ? null : e + "";
    for (o in n) {
      if ((r = n[o]).name !== e) {
        s = !1;
        continue;
      }
      i = r.state > qi && r.state < Gi, r.state = Mr, r.timer.stop(), r.on.call(i ? "interrupt" : "cancel", t, t.__data__, r.index, r.group), delete n[o];
    }
    s && delete t.__transition;
  }
}
function Od(t) {
  return this.each(function() {
    Nr(this, t);
  });
}
function Ad(t, e) {
  var n, r;
  return function() {
    var i = _e(this, t), s = i.tween;
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
function Fd(t, e, n) {
  var r, i;
  if (typeof n != "function") throw new Error();
  return function() {
    var s = _e(this, t), o = s.tween;
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
function jd(t, e) {
  var n = this._id;
  if (t += "", arguments.length < 2) {
    for (var r = fe(this.node(), n).tween, i = 0, s = r.length, o; i < s; ++i)
      if ((o = r[i]).name === t)
        return o.value;
    return null;
  }
  return this.each((e == null ? Ad : Fd)(n, t, e));
}
function Ms(t, e, n) {
  var r = t._id;
  return t.each(function() {
    var i = _e(this, r);
    (i.value || (i.value = {}))[e] = n.apply(this, arguments);
  }), function(i) {
    return fe(i, r).value[e];
  };
}
function gu(t, e) {
  var n;
  return (typeof e == "number" ? ge : e instanceof Ze ? jr : (n = Ze(e)) ? (e = n, jr) : cu)(t, e);
}
function Bd(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function zd(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Dd(t, e, n) {
  var r, i = n + "", s;
  return function() {
    var o = this.getAttribute(t);
    return o === i ? null : o === r ? s : s = e(r = o, n);
  };
}
function Vd(t, e, n) {
  var r, i = n + "", s;
  return function() {
    var o = this.getAttributeNS(t.space, t.local);
    return o === i ? null : o === r ? s : s = e(r = o, n);
  };
}
function qd(t, e, n) {
  var r, i, s;
  return function() {
    var o, l = n(this), u;
    return l == null ? void this.removeAttribute(t) : (o = this.getAttribute(t), u = l + "", o === u ? null : o === r && u === i ? s : (i = u, s = e(r = o, l)));
  };
}
function Gd(t, e, n) {
  var r, i, s;
  return function() {
    var o, l = n(this), u;
    return l == null ? void this.removeAttributeNS(t.space, t.local) : (o = this.getAttributeNS(t.space, t.local), u = l + "", o === u ? null : o === r && u === i ? s : (i = u, s = e(r = o, l)));
  };
}
function Hd(t, e) {
  var n = ni(t), r = n === "transform" ? Ed : gu;
  return this.attrTween(t, typeof e == "function" ? (n.local ? Gd : qd)(n, r, Ms(this, "attr." + t, e)) : e == null ? (n.local ? zd : Bd)(n) : (n.local ? Vd : Dd)(n, r, e));
}
function Ud(t, e) {
  return function(n) {
    this.setAttribute(t, e.call(this, n));
  };
}
function Wd(t, e) {
  return function(n) {
    this.setAttributeNS(t.space, t.local, e.call(this, n));
  };
}
function Kd(t, e) {
  var n, r;
  function i() {
    var s = e.apply(this, arguments);
    return s !== r && (n = (r = s) && Wd(t, s)), n;
  }
  return i._value = e, i;
}
function Xd(t, e) {
  var n, r;
  function i() {
    var s = e.apply(this, arguments);
    return s !== r && (n = (r = s) && Ud(t, s)), n;
  }
  return i._value = e, i;
}
function Yd(t, e) {
  var n = "attr." + t;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (e == null) return this.tween(n, null);
  if (typeof e != "function") throw new Error();
  var r = ni(t);
  return this.tween(n, (r.local ? Kd : Xd)(r, e));
}
function Jd(t, e) {
  return function() {
    ks(this, t).delay = +e.apply(this, arguments);
  };
}
function Qd(t, e) {
  return e = +e, function() {
    ks(this, t).delay = e;
  };
}
function Zd(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Jd : Qd)(e, t)) : fe(this.node(), e).delay;
}
function tp(t, e) {
  return function() {
    _e(this, t).duration = +e.apply(this, arguments);
  };
}
function ep(t, e) {
  return e = +e, function() {
    _e(this, t).duration = e;
  };
}
function np(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? tp : ep)(e, t)) : fe(this.node(), e).duration;
}
function rp(t, e) {
  if (typeof e != "function") throw new Error();
  return function() {
    _e(this, t).ease = e;
  };
}
function ip(t) {
  var e = this._id;
  return arguments.length ? this.each(rp(e, t)) : fe(this.node(), e).ease;
}
function sp(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    _e(this, t).ease = n;
  };
}
function op(t) {
  if (typeof t != "function") throw new Error();
  return this.each(sp(this._id, t));
}
function lp(t) {
  typeof t != "function" && (t = Wl(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var s = e[i], o = s.length, l = r[i] = [], u, c = 0; c < o; ++c)
      (u = s[c]) && t.call(u, u.__data__, c, s) && l.push(u);
  return new Me(r, this._parents, this._name, this._id);
}
function up(t) {
  if (t._id !== this._id) throw new Error();
  for (var e = this._groups, n = t._groups, r = e.length, i = n.length, s = Math.min(r, i), o = new Array(r), l = 0; l < s; ++l)
    for (var u = e[l], c = n[l], a = u.length, f = o[l] = new Array(a), h, p = 0; p < a; ++p)
      (h = u[p] || c[p]) && (f[p] = h);
  for (; l < r; ++l)
    o[l] = e[l];
  return new Me(o, this._parents, this._name, this._id);
}
function cp(t) {
  return (t + "").trim().split(/^|\s+/).every(function(e) {
    var n = e.indexOf(".");
    return n >= 0 && (e = e.slice(0, n)), !e || e === "start";
  });
}
function ap(t, e, n) {
  var r, i, s = cp(e) ? ks : _e;
  return function() {
    var o = s(this, t), l = o.on;
    l !== r && (i = (r = l).copy()).on(e, n), o.on = i;
  };
}
function fp(t, e) {
  var n = this._id;
  return arguments.length < 2 ? fe(this.node(), n).on.on(t) : this.each(ap(n, t, e));
}
function hp(t) {
  return function() {
    var e = this.parentNode;
    for (var n in this.__transition) if (+n !== t) return;
    e && e.removeChild(this);
  };
}
function dp() {
  return this.on("end.remove", hp(this._id));
}
function pp(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = ys(t));
  for (var r = this._groups, i = r.length, s = new Array(i), o = 0; o < i; ++o)
    for (var l = r[o], u = l.length, c = s[o] = new Array(u), a, f, h = 0; h < u; ++h)
      (a = l[h]) && (f = t.call(a, a.__data__, h, l)) && ("__data__" in a && (f.__data__ = a.__data__), c[h] = f, ii(c[h], e, n, h, c, fe(a, n)));
  return new Me(s, this._parents, e, n);
}
function gp(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = Ul(t));
  for (var r = this._groups, i = r.length, s = [], o = [], l = 0; l < i; ++l)
    for (var u = r[l], c = u.length, a, f = 0; f < c; ++f)
      if (a = u[f]) {
        for (var h = t.call(a, a.__data__, f, u), p, w = fe(a, n), v = 0, _ = h.length; v < _; ++v)
          (p = h[v]) && ii(p, e, n, v, h, w);
        s.push(h), o.push(a);
      }
  return new Me(s, o, e, n);
}
var mp = Jn.prototype.constructor;
function wp() {
  return new mp(this._groups, this._parents);
}
function yp(t, e) {
  var n, r, i;
  return function() {
    var s = wn(this, t), o = (this.style.removeProperty(t), wn(this, t));
    return s === o ? null : s === n && o === r ? i : i = e(n = s, r = o);
  };
}
function mu(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function _p(t, e, n) {
  var r, i = n + "", s;
  return function() {
    var o = wn(this, t);
    return o === i ? null : o === r ? s : s = e(r = o, n);
  };
}
function vp(t, e, n) {
  var r, i, s;
  return function() {
    var o = wn(this, t), l = n(this), u = l + "";
    return l == null && (u = l = (this.style.removeProperty(t), wn(this, t))), o === u ? null : o === r && u === i ? s : (i = u, s = e(r = o, l));
  };
}
function bp(t, e) {
  var n, r, i, s = "style." + e, o = "end." + s, l;
  return function() {
    var u = _e(this, t), c = u.on, a = u.value[s] == null ? l || (l = mu(e)) : void 0;
    (c !== n || i !== a) && (r = (n = c).copy()).on(o, i = a), u.on = r;
  };
}
function xp(t, e, n) {
  var r = (t += "") == "transform" ? xd : gu;
  return e == null ? this.styleTween(t, yp(t, r)).on("end.style." + t, mu(t)) : typeof e == "function" ? this.styleTween(t, vp(t, r, Ms(this, "style." + t, e))).each(bp(this._id, t)) : this.styleTween(t, _p(t, r, e), n).on("end.style." + t, null);
}
function Ep(t, e, n) {
  return function(r) {
    this.style.setProperty(t, e.call(this, r), n);
  };
}
function Sp(t, e, n) {
  var r, i;
  function s() {
    var o = e.apply(this, arguments);
    return o !== i && (r = (i = o) && Ep(t, o, n)), r;
  }
  return s._value = e, s;
}
function kp(t, e, n) {
  var r = "style." + (t += "");
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (e == null) return this.tween(r, null);
  if (typeof e != "function") throw new Error();
  return this.tween(r, Sp(t, e, n ?? ""));
}
function Mp(t) {
  return function() {
    this.textContent = t;
  };
}
function Np(t) {
  return function() {
    var e = t(this);
    this.textContent = e ?? "";
  };
}
function Rp(t) {
  return this.tween("text", typeof t == "function" ? Np(Ms(this, "text", t)) : Mp(t == null ? "" : t + ""));
}
function Cp(t) {
  return function(e) {
    this.textContent = t.call(this, e);
  };
}
function Tp(t) {
  var e, n;
  function r() {
    var i = t.apply(this, arguments);
    return i !== n && (e = (n = i) && Cp(i)), e;
  }
  return r._value = t, r;
}
function Pp(t) {
  var e = "text";
  if (arguments.length < 1) return (e = this.tween(e)) && e._value;
  if (t == null) return this.tween(e, null);
  if (typeof t != "function") throw new Error();
  return this.tween(e, Tp(t));
}
function Lp() {
  for (var t = this._name, e = this._id, n = wu(), r = this._groups, i = r.length, s = 0; s < i; ++s)
    for (var o = r[s], l = o.length, u, c = 0; c < l; ++c)
      if (u = o[c]) {
        var a = fe(u, e);
        ii(u, t, n, c, o, {
          time: a.time + a.delay + a.duration,
          delay: 0,
          duration: a.duration,
          ease: a.ease
        });
      }
  return new Me(r, this._parents, t, n);
}
function Ip() {
  var t, e, n = this, r = n._id, i = n.size();
  return new Promise(function(s, o) {
    var l = { value: o }, u = { value: function() {
      --i === 0 && s();
    } };
    n.each(function() {
      var c = _e(this, r), a = c.on;
      a !== t && (e = (t = a).copy(), e._.cancel.push(l), e._.interrupt.push(l), e._.end.push(u)), c.on = e;
    }), i === 0 && s();
  });
}
var $p = 0;
function Me(t, e, n, r) {
  this._groups = t, this._parents = e, this._name = n, this._id = r;
}
function wu() {
  return ++$p;
}
var xe = Jn.prototype;
Me.prototype = {
  constructor: Me,
  select: pp,
  selectAll: gp,
  selectChild: xe.selectChild,
  selectChildren: xe.selectChildren,
  filter: lp,
  merge: up,
  selection: wp,
  transition: Lp,
  call: xe.call,
  nodes: xe.nodes,
  node: xe.node,
  size: xe.size,
  empty: xe.empty,
  each: xe.each,
  on: fp,
  attr: Hd,
  attrTween: Yd,
  style: xp,
  styleTween: kp,
  text: Rp,
  textTween: Pp,
  remove: dp,
  tween: jd,
  delay: Zd,
  duration: np,
  ease: ip,
  easeVarying: op,
  end: Ip,
  [Symbol.iterator]: xe[Symbol.iterator]
};
const Op = (t) => +t;
function Ap(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var Fp = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Ap
};
function jp(t, e) {
  for (var n; !(n = t.__transition) || !(n = n[e]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${e} not found`);
  return n;
}
function Bp(t) {
  var e, n;
  t instanceof Me ? (e = t._id, t = t._name) : (e = wu(), (n = Fp).time = Es(), t = t == null ? null : t + "");
  for (var r = this._groups, i = r.length, s = 0; s < i; ++s)
    for (var o = r[s], l = o.length, u, c = 0; c < l; ++c)
      (u = o[c]) && ii(u, t, e, c, o, n || jp(u, e));
  return new Me(r, this._parents, t, e);
}
Jn.prototype.interrupt = Od;
Jn.prototype.transition = Bp;
const Hi = Math.PI, Ui = 2 * Hi, Ue = 1e-6, zp = Ui - Ue;
function yu(t) {
  this._ += t[0];
  for (let e = 1, n = t.length; e < n; ++e)
    this._ += arguments[e] + t[e];
}
function Dp(t) {
  let e = Math.floor(t);
  if (!(e >= 0)) throw new Error(`invalid digits: ${t}`);
  if (e > 15) return yu;
  const n = 10 ** e;
  return function(r) {
    this._ += r[0];
    for (let i = 1, s = r.length; i < s; ++i)
      this._ += Math.round(arguments[i] * n) / n + r[i];
  };
}
class Vp {
  constructor(e) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null, this._ = "", this._append = e == null ? yu : Dp(e);
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
    else if (h > Ue) if (!(Math.abs(f * u - c * a) > Ue) || !s)
      this._append`L${this._x1 = e},${this._y1 = n}`;
    else {
      let p = r - o, w = i - l, v = u * u + c * c, _ = p * p + w * w, d = Math.sqrt(v), C = Math.sqrt(h), P = s * Math.tan((Hi - Math.acos((v + h - _) / (2 * d * C))) / 2), y = P / C, k = P / d;
      Math.abs(y - 1) > Ue && this._append`L${e + y * a},${n + y * f}`, this._append`A${s},${s},0,0,${+(f * p > a * w)},${this._x1 = e + k * u},${this._y1 = n + k * c}`;
    }
  }
  arc(e, n, r, i, s, o) {
    if (e = +e, n = +n, r = +r, o = !!o, r < 0) throw new Error(`negative radius: ${r}`);
    let l = r * Math.cos(i), u = r * Math.sin(i), c = e + l, a = n + u, f = 1 ^ o, h = o ? i - s : s - i;
    this._x1 === null ? this._append`M${c},${a}` : (Math.abs(this._x1 - c) > Ue || Math.abs(this._y1 - a) > Ue) && this._append`L${c},${a}`, r && (h < 0 && (h = h % Ui + Ui), h > zp ? this._append`A${r},${r},0,1,${f},${e - l},${n - u}A${r},${r},0,1,${f},${this._x1 = c},${this._y1 = a}` : h > Ue && this._append`A${r},${r},0,${+(h >= Hi)},${f},${this._x1 = e + r * Math.cos(s)},${this._y1 = n + r * Math.sin(s)}`);
  }
  rect(e, n, r, i) {
    this._append`M${this._x0 = this._x1 = +e},${this._y0 = this._y1 = +n}h${r = +r}v${+i}h${-r}Z`;
  }
  toString() {
    return this._;
  }
}
function qp(t) {
  const e = +this._x.call(null, t), n = +this._y.call(null, t);
  return _u(this.cover(e, n), e, n, t);
}
function _u(t, e, n, r) {
  if (isNaN(e) || isNaN(n)) return t;
  var i, s = t._root, o = { data: r }, l = t._x0, u = t._y0, c = t._x1, a = t._y1, f, h, p, w, v, _, d, C;
  if (!s) return t._root = o, t;
  for (; s.length; )
    if ((v = e >= (f = (l + c) / 2)) ? l = f : c = f, (_ = n >= (h = (u + a) / 2)) ? u = h : a = h, i = s, !(s = s[d = _ << 1 | v])) return i[d] = o, t;
  if (p = +t._x.call(null, s.data), w = +t._y.call(null, s.data), e === p && n === w) return o.next = s, i ? i[d] = o : t._root = o, t;
  do
    i = i ? i[d] = new Array(4) : t._root = new Array(4), (v = e >= (f = (l + c) / 2)) ? l = f : c = f, (_ = n >= (h = (u + a) / 2)) ? u = h : a = h;
  while ((d = _ << 1 | v) === (C = (w >= h) << 1 | p >= f));
  return i[C] = s, i[d] = o, t;
}
function Gp(t) {
  var e, n, r = t.length, i, s, o = new Array(r), l = new Array(r), u = 1 / 0, c = 1 / 0, a = -1 / 0, f = -1 / 0;
  for (n = 0; n < r; ++n)
    isNaN(i = +this._x.call(null, e = t[n])) || isNaN(s = +this._y.call(null, e)) || (o[n] = i, l[n] = s, i < u && (u = i), i > a && (a = i), s < c && (c = s), s > f && (f = s));
  if (u > a || c > f) return this;
  for (this.cover(u, c).cover(a, f), n = 0; n < r; ++n)
    _u(this, o[n], l[n], t[n]);
  return this;
}
function Hp(t, e) {
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
function Up() {
  var t = [];
  return this.visit(function(e) {
    if (!e.length) do
      t.push(e.data);
    while (e = e.next);
  }), t;
}
function Wp(t) {
  return arguments.length ? this.cover(+t[0][0], +t[0][1]).cover(+t[1][0], +t[1][1]) : isNaN(this._x0) ? void 0 : [[this._x0, this._y0], [this._x1, this._y1]];
}
function Ft(t, e, n, r, i) {
  this.node = t, this.x0 = e, this.y0 = n, this.x1 = r, this.y1 = i;
}
function Kp(t, e, n) {
  var r, i = this._x0, s = this._y0, o, l, u, c, a = this._x1, f = this._y1, h = [], p = this._root, w, v;
  for (p && h.push(new Ft(p, i, s, a, f)), n == null ? n = 1 / 0 : (i = t - n, s = e - n, a = t + n, f = e + n, n *= n); w = h.pop(); )
    if (!(!(p = w.node) || (o = w.x0) > a || (l = w.y0) > f || (u = w.x1) < i || (c = w.y1) < s))
      if (p.length) {
        var _ = (o + u) / 2, d = (l + c) / 2;
        h.push(
          new Ft(p[3], _, d, u, c),
          new Ft(p[2], o, d, _, c),
          new Ft(p[1], _, l, u, d),
          new Ft(p[0], o, l, _, d)
        ), (v = (e >= d) << 1 | t >= _) && (w = h[h.length - 1], h[h.length - 1] = h[h.length - 1 - v], h[h.length - 1 - v] = w);
      } else {
        var C = t - +this._x.call(null, p.data), P = e - +this._y.call(null, p.data), y = C * C + P * P;
        if (y < n) {
          var k = Math.sqrt(n = y);
          i = t - k, s = e - k, a = t + k, f = e + k, r = p.data;
        }
      }
  return r;
}
function Xp(t) {
  if (isNaN(a = +this._x.call(null, t)) || isNaN(f = +this._y.call(null, t))) return this;
  var e, n = this._root, r, i, s, o = this._x0, l = this._y0, u = this._x1, c = this._y1, a, f, h, p, w, v, _, d;
  if (!n) return this;
  if (n.length) for (; ; ) {
    if ((w = a >= (h = (o + u) / 2)) ? o = h : u = h, (v = f >= (p = (l + c) / 2)) ? l = p : c = p, e = n, !(n = n[_ = v << 1 | w])) return this;
    if (!n.length) break;
    (e[_ + 1 & 3] || e[_ + 2 & 3] || e[_ + 3 & 3]) && (r = e, d = _);
  }
  for (; n.data !== t; ) if (i = n, !(n = n.next)) return this;
  return (s = n.next) && delete n.next, i ? (s ? i.next = s : delete i.next, this) : e ? (s ? e[_] = s : delete e[_], (n = e[0] || e[1] || e[2] || e[3]) && n === (e[3] || e[2] || e[1] || e[0]) && !n.length && (r ? r[d] = n : this._root = n), this) : (this._root = s, this);
}
function Yp(t) {
  for (var e = 0, n = t.length; e < n; ++e) this.remove(t[e]);
  return this;
}
function Jp() {
  return this._root;
}
function Qp() {
  var t = 0;
  return this.visit(function(e) {
    if (!e.length) do
      ++t;
    while (e = e.next);
  }), t;
}
function Zp(t) {
  var e = [], n, r = this._root, i, s, o, l, u;
  for (r && e.push(new Ft(r, this._x0, this._y0, this._x1, this._y1)); n = e.pop(); )
    if (!t(r = n.node, s = n.x0, o = n.y0, l = n.x1, u = n.y1) && r.length) {
      var c = (s + l) / 2, a = (o + u) / 2;
      (i = r[3]) && e.push(new Ft(i, c, a, l, u)), (i = r[2]) && e.push(new Ft(i, s, a, c, u)), (i = r[1]) && e.push(new Ft(i, c, o, l, a)), (i = r[0]) && e.push(new Ft(i, s, o, c, a));
    }
  return this;
}
function tg(t) {
  var e = [], n = [], r;
  for (this._root && e.push(new Ft(this._root, this._x0, this._y0, this._x1, this._y1)); r = e.pop(); ) {
    var i = r.node;
    if (i.length) {
      var s, o = r.x0, l = r.y0, u = r.x1, c = r.y1, a = (o + u) / 2, f = (l + c) / 2;
      (s = i[0]) && e.push(new Ft(s, o, l, a, f)), (s = i[1]) && e.push(new Ft(s, a, l, u, f)), (s = i[2]) && e.push(new Ft(s, o, f, a, c)), (s = i[3]) && e.push(new Ft(s, a, f, u, c));
    }
    n.push(r);
  }
  for (; r = n.pop(); )
    t(r.node, r.x0, r.y0, r.x1, r.y1);
  return this;
}
function eg(t) {
  return t[0];
}
function ng(t) {
  return arguments.length ? (this._x = t, this) : this._x;
}
function rg(t) {
  return t[1];
}
function ig(t) {
  return arguments.length ? (this._y = t, this) : this._y;
}
function Ns(t, e, n) {
  var r = new Rs(e ?? eg, n ?? rg, NaN, NaN, NaN, NaN);
  return t == null ? r : r.addAll(t);
}
function Rs(t, e, n, r, i, s) {
  this._x = t, this._y = e, this._x0 = n, this._y0 = r, this._x1 = i, this._y1 = s, this._root = void 0;
}
function Io(t) {
  for (var e = { data: t.data }, n = e; t = t.next; ) n = n.next = { data: t.data };
  return e;
}
var Bt = Ns.prototype = Rs.prototype;
Bt.copy = function() {
  var t = new Rs(this._x, this._y, this._x0, this._y0, this._x1, this._y1), e = this._root, n, r;
  if (!e) return t;
  if (!e.length) return t._root = Io(e), t;
  for (n = [{ source: e, target: t._root = new Array(4) }]; e = n.pop(); )
    for (var i = 0; i < 4; ++i)
      (r = e.source[i]) && (r.length ? n.push({ source: r, target: e.target[i] = new Array(4) }) : e.target[i] = Io(r));
  return t;
};
Bt.add = qp;
Bt.addAll = Gp;
Bt.cover = Hp;
Bt.data = Up;
Bt.extent = Wp;
Bt.find = Kp;
Bt.remove = Xp;
Bt.removeAll = Yp;
Bt.root = Jp;
Bt.size = Qp;
Bt.visit = Zp;
Bt.visitAfter = tg;
Bt.x = ng;
Bt.y = ig;
function jt(t) {
  return function() {
    return t;
  };
}
function Ae(t) {
  return (t() - 0.5) * 1e-6;
}
function sg(t) {
  return t.x + t.vx;
}
function og(t) {
  return t.y + t.vy;
}
function lg(t) {
  var e, n, r, i = 1, s = 1;
  typeof t != "function" && (t = jt(t == null ? 1 : +t));
  function o() {
    for (var c, a = e.length, f, h, p, w, v, _, d = 0; d < s; ++d)
      for (f = Ns(e, sg, og).visitAfter(l), c = 0; c < a; ++c)
        h = e[c], v = n[h.index], _ = v * v, p = h.x + h.vx, w = h.y + h.vy, f.visit(C);
    function C(P, y, k, L, D) {
      var G = P.data, Q = P.r, X = v + Q;
      if (G) {
        if (G.index > h.index) {
          var et = p - G.x - G.vx, ot = w - G.y - G.vy, U = et * et + ot * ot;
          U < X * X && (et === 0 && (et = Ae(r), U += et * et), ot === 0 && (ot = Ae(r), U += ot * ot), U = (X - (U = Math.sqrt(U))) / U * i, h.vx += (et *= U) * (X = (Q *= Q) / (_ + Q)), h.vy += (ot *= U) * X, G.vx -= et * (X = 1 - X), G.vy -= ot * X);
        }
        return;
      }
      return y > p + X || L < p - X || k > w + X || D < w - X;
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
    return arguments.length ? (t = typeof c == "function" ? c : jt(+c), u(), o) : t;
  }, o;
}
function ug(t) {
  return t.index;
}
function $o(t, e) {
  var n = t.get(e);
  if (!n) throw new Error("node not found: " + e);
  return n;
}
function cg(t) {
  var e = ug, n = f, r, i = jt(30), s, o, l, u, c, a = 1;
  t == null && (t = []);
  function f(_) {
    return 1 / Math.min(l[_.source.index], l[_.target.index]);
  }
  function h(_) {
    for (var d = 0, C = t.length; d < a; ++d)
      for (var P = 0, y, k, L, D, G, Q, X; P < C; ++P)
        y = t[P], k = y.source, L = y.target, D = L.x + L.vx - k.x - k.vx || Ae(c), G = L.y + L.vy - k.y - k.vy || Ae(c), Q = Math.sqrt(D * D + G * G), Q = (Q - s[P]) / Q * _ * r[P], D *= Q, G *= Q, L.vx -= D * (X = u[P]), L.vy -= G * X, k.vx += D * (X = 1 - X), k.vy += G * X;
  }
  function p() {
    if (o) {
      var _, d = o.length, C = t.length, P = new Map(o.map((k, L) => [e(k, L, o), k])), y;
      for (_ = 0, l = new Array(d); _ < C; ++_)
        y = t[_], y.index = _, typeof y.source != "object" && (y.source = $o(P, y.source)), typeof y.target != "object" && (y.target = $o(P, y.target)), l[y.source.index] = (l[y.source.index] || 0) + 1, l[y.target.index] = (l[y.target.index] || 0) + 1;
      for (_ = 0, u = new Array(C); _ < C; ++_)
        y = t[_], u[_] = l[y.source.index] / (l[y.source.index] + l[y.target.index]);
      r = new Array(C), w(), s = new Array(C), v();
    }
  }
  function w() {
    if (o)
      for (var _ = 0, d = t.length; _ < d; ++_)
        r[_] = +n(t[_], _, t);
  }
  function v() {
    if (o)
      for (var _ = 0, d = t.length; _ < d; ++_)
        s[_] = +i(t[_], _, t);
  }
  return h.initialize = function(_, d) {
    o = _, c = d, p();
  }, h.links = function(_) {
    return arguments.length ? (t = _, p(), h) : t;
  }, h.id = function(_) {
    return arguments.length ? (e = _, h) : e;
  }, h.iterations = function(_) {
    return arguments.length ? (a = +_, h) : a;
  }, h.strength = function(_) {
    return arguments.length ? (n = typeof _ == "function" ? _ : jt(+_), w(), h) : n;
  }, h.distance = function(_) {
    return arguments.length ? (i = typeof _ == "function" ? _ : jt(+_), v(), h) : i;
  }, h;
}
const ag = 1664525, fg = 1013904223, Oo = 4294967296;
function hg() {
  let t = 1;
  return () => (t = (ag * t + fg) % Oo) / Oo;
}
function dg(t) {
  return t.x;
}
function pg(t) {
  return t.y;
}
var gg = 10, mg = Math.PI * (3 - Math.sqrt(5));
function wg(t) {
  var e, n = 1, r = 1e-3, i = 1 - Math.pow(r, 1 / 300), s = 0, o = 0.6, l = /* @__PURE__ */ new Map(), u = Ss(f), c = Yn("tick", "end"), a = hg();
  t == null && (t = []);
  function f() {
    h(), c.call("tick", e), n < r && (u.stop(), c.call("end", e));
  }
  function h(v) {
    var _, d = t.length, C;
    v === void 0 && (v = 1);
    for (var P = 0; P < v; ++P)
      for (n += (s - n) * i, l.forEach(function(y) {
        y(n);
      }), _ = 0; _ < d; ++_)
        C = t[_], C.fx == null ? C.x += C.vx *= o : (C.x = C.fx, C.vx = 0), C.fy == null ? C.y += C.vy *= o : (C.y = C.fy, C.vy = 0);
    return e;
  }
  function p() {
    for (var v = 0, _ = t.length, d; v < _; ++v) {
      if (d = t[v], d.index = v, d.fx != null && (d.x = d.fx), d.fy != null && (d.y = d.fy), isNaN(d.x) || isNaN(d.y)) {
        var C = gg * Math.sqrt(0.5 + v), P = v * mg;
        d.x = C * Math.cos(P), d.y = C * Math.sin(P);
      }
      (isNaN(d.vx) || isNaN(d.vy)) && (d.vx = d.vy = 0);
    }
  }
  function w(v) {
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
      return arguments.length ? (t = v, p(), l.forEach(w), e) : t;
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
      return arguments.length ? (a = v, l.forEach(w), e) : a;
    },
    force: function(v, _) {
      return arguments.length > 1 ? (_ == null ? l.delete(v) : l.set(v, w(_)), e) : l.get(v);
    },
    find: function(v, _, d) {
      var C = 0, P = t.length, y, k, L, D, G;
      for (d == null ? d = 1 / 0 : d *= d, C = 0; C < P; ++C)
        D = t[C], y = v - D.x, k = _ - D.y, L = y * y + k * k, L < d && (G = D, d = L);
      return G;
    },
    on: function(v, _) {
      return arguments.length > 1 ? (c.on(v, _), e) : c.on(v);
    }
  };
}
function yg() {
  var t, e, n, r, i = jt(-30), s, o = 1, l = 1 / 0, u = 0.81;
  function c(p) {
    var w, v = t.length, _ = Ns(t, dg, pg).visitAfter(f);
    for (r = p, w = 0; w < v; ++w) e = t[w], _.visit(h);
  }
  function a() {
    if (t) {
      var p, w = t.length, v;
      for (s = new Array(w), p = 0; p < w; ++p) v = t[p], s[v.index] = +i(v, p, t);
    }
  }
  function f(p) {
    var w = 0, v, _, d = 0, C, P, y;
    if (p.length) {
      for (C = P = y = 0; y < 4; ++y)
        (v = p[y]) && (_ = Math.abs(v.value)) && (w += v.value, d += _, C += _ * v.x, P += _ * v.y);
      p.x = C / d, p.y = P / d;
    } else {
      v = p, v.x = v.data.x, v.y = v.data.y;
      do
        w += s[v.data.index];
      while (v = v.next);
    }
    p.value = w;
  }
  function h(p, w, v, _) {
    if (!p.value) return !0;
    var d = p.x - e.x, C = p.y - e.y, P = _ - w, y = d * d + C * C;
    if (P * P / u < y)
      return y < l && (d === 0 && (d = Ae(n), y += d * d), C === 0 && (C = Ae(n), y += C * C), y < o && (y = Math.sqrt(o * y)), e.vx += d * p.value * r / y, e.vy += C * p.value * r / y), !0;
    if (p.length || y >= l) return;
    (p.data !== e || p.next) && (d === 0 && (d = Ae(n), y += d * d), C === 0 && (C = Ae(n), y += C * C), y < o && (y = Math.sqrt(o * y)));
    do
      p.data !== e && (P = s[p.data.index] * r / y, e.vx += d * P, e.vy += C * P);
    while (p = p.next);
  }
  return c.initialize = function(p, w) {
    t = p, n = w, a();
  }, c.strength = function(p) {
    return arguments.length ? (i = typeof p == "function" ? p : jt(+p), a(), c) : i;
  }, c.distanceMin = function(p) {
    return arguments.length ? (o = p * p, c) : Math.sqrt(o);
  }, c.distanceMax = function(p) {
    return arguments.length ? (l = p * p, c) : Math.sqrt(l);
  }, c.theta = function(p) {
    return arguments.length ? (u = p * p, c) : Math.sqrt(u);
  }, c;
}
function _g(t) {
  var e = jt(0.1), n, r, i;
  typeof t != "function" && (t = jt(t == null ? 0 : +t));
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
    return arguments.length ? (e = typeof l == "function" ? l : jt(+l), o(), s) : e;
  }, s.x = function(l) {
    return arguments.length ? (t = typeof l == "function" ? l : jt(+l), o(), s) : t;
  }, s;
}
function vg(t) {
  var e = jt(0.1), n, r, i;
  typeof t != "function" && (t = jt(t == null ? 0 : +t));
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
    return arguments.length ? (e = typeof l == "function" ? l : jt(+l), o(), s) : e;
  }, s.y = function(l) {
    return arguments.length ? (t = typeof l == "function" ? l : jt(+l), o(), s) : t;
  }, s;
}
function Gt(t) {
  return function() {
    return t;
  };
}
const Ao = Math.abs, Pt = Math.atan2, He = Math.cos, bg = Math.max, bi = Math.min, de = Math.sin, ln = Math.sqrt, Vt = 1e-12, Wn = Math.PI, Vr = Wn / 2, xg = 2 * Wn;
function Eg(t) {
  return t > 1 ? 0 : t < -1 ? Wn : Math.acos(t);
}
function Fo(t) {
  return t >= 1 ? Vr : t <= -1 ? -Vr : Math.asin(t);
}
function vu(t) {
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
  }, () => new Vp(e);
}
function Sg(t) {
  return t.innerRadius;
}
function kg(t) {
  return t.outerRadius;
}
function Mg(t) {
  return t.startAngle;
}
function Ng(t) {
  return t.endAngle;
}
function Rg(t) {
  return t && t.padAngle;
}
function Cg(t, e, n, r, i, s, o, l) {
  var u = n - t, c = r - e, a = o - i, f = l - s, h = f * u - a * c;
  if (!(h * h < Vt))
    return h = (a * (e - s) - f * (t - i)) / h, [t + h * u, e + h * c];
}
function hr(t, e, n, r, i, s, o) {
  var l = t - n, u = e - r, c = (o ? s : -s) / ln(l * l + u * u), a = c * u, f = -c * l, h = t + a, p = e + f, w = n + a, v = r + f, _ = (h + w) / 2, d = (p + v) / 2, C = w - h, P = v - p, y = C * C + P * P, k = i - s, L = h * v - w * p, D = (P < 0 ? -1 : 1) * ln(bg(0, k * k * y - L * L)), G = (L * P - C * D) / y, Q = (-L * C - P * D) / y, X = (L * P + C * D) / y, et = (-L * C + P * D) / y, ot = G - _, U = Q - d, x = X - _, V = et - d;
  return ot * ot + U * U > x * x + V * V && (G = X, Q = et), {
    cx: G,
    cy: Q,
    x01: -a,
    y01: -f,
    x11: G * (i / k - 1),
    y11: Q * (i / k - 1)
  };
}
function Tg() {
  var t = Sg, e = kg, n = Gt(0), r = null, i = Mg, s = Ng, o = Rg, l = null, u = vu(c);
  function c() {
    var a, f, h = +t.apply(this, arguments), p = +e.apply(this, arguments), w = i.apply(this, arguments) - Vr, v = s.apply(this, arguments) - Vr, _ = Ao(v - w), d = v > w;
    if (l || (l = a = u()), p < h && (f = p, p = h, h = f), !(p > Vt)) l.moveTo(0, 0);
    else if (_ > xg - Vt)
      l.moveTo(p * He(w), p * de(w)), l.arc(0, 0, p, w, v, !d), h > Vt && (l.moveTo(h * He(v), h * de(v)), l.arc(0, 0, h, v, w, d));
    else {
      var C = w, P = v, y = w, k = v, L = _, D = _, G = o.apply(this, arguments) / 2, Q = G > Vt && (r ? +r.apply(this, arguments) : ln(h * h + p * p)), X = bi(Ao(p - h) / 2, +n.apply(this, arguments)), et = X, ot = X, U, x;
      if (Q > Vt) {
        var V = Fo(Q / h * de(G)), N = Fo(Q / p * de(G));
        (L -= V * 2) > Vt ? (V *= d ? 1 : -1, y += V, k -= V) : (L = 0, y = k = (w + v) / 2), (D -= N * 2) > Vt ? (N *= d ? 1 : -1, C += N, P -= N) : (D = 0, C = P = (w + v) / 2);
      }
      var A = p * He(C), z = p * de(C), Y = h * He(k), J = h * de(k);
      if (X > Vt) {
        var it = p * He(P), lt = p * de(P), St = h * He(y), pt = h * de(y), gt;
        if (_ < Wn)
          if (gt = Cg(A, z, St, pt, it, lt, Y, J)) {
            var mt = A - gt[0], bt = z - gt[1], kt = it - gt[0], zt = lt - gt[1], Zt = 1 / de(Eg((mt * kt + bt * zt) / (ln(mt * mt + bt * bt) * ln(kt * kt + zt * zt))) / 2), ve = ln(gt[0] * gt[0] + gt[1] * gt[1]);
            et = bi(X, (h - ve) / (Zt - 1)), ot = bi(X, (p - ve) / (Zt + 1));
          } else
            et = ot = 0;
      }
      D > Vt ? ot > Vt ? (U = hr(St, pt, A, z, p, ot, d), x = hr(it, lt, Y, J, p, ot, d), l.moveTo(U.cx + U.x01, U.cy + U.y01), ot < X ? l.arc(U.cx, U.cy, ot, Pt(U.y01, U.x01), Pt(x.y01, x.x01), !d) : (l.arc(U.cx, U.cy, ot, Pt(U.y01, U.x01), Pt(U.y11, U.x11), !d), l.arc(0, 0, p, Pt(U.cy + U.y11, U.cx + U.x11), Pt(x.cy + x.y11, x.cx + x.x11), !d), l.arc(x.cx, x.cy, ot, Pt(x.y11, x.x11), Pt(x.y01, x.x01), !d))) : (l.moveTo(A, z), l.arc(0, 0, p, C, P, !d)) : l.moveTo(A, z), !(h > Vt) || !(L > Vt) ? l.lineTo(Y, J) : et > Vt ? (U = hr(Y, J, it, lt, h, -et, d), x = hr(A, z, St, pt, h, -et, d), l.lineTo(U.cx + U.x01, U.cy + U.y01), et < X ? l.arc(U.cx, U.cy, et, Pt(U.y01, U.x01), Pt(x.y01, x.x01), !d) : (l.arc(U.cx, U.cy, et, Pt(U.y01, U.x01), Pt(U.y11, U.x11), !d), l.arc(0, 0, h, Pt(U.cy + U.y11, U.cx + U.x11), Pt(x.cy + x.y11, x.cx + x.x11), d), l.arc(x.cx, x.cy, et, Pt(x.y11, x.x11), Pt(x.y01, x.x01), !d))) : l.arc(0, 0, h, k, y, d);
    }
    if (l.closePath(), a) return l = null, a + "" || null;
  }
  return c.centroid = function() {
    var a = (+t.apply(this, arguments) + +e.apply(this, arguments)) / 2, f = (+i.apply(this, arguments) + +s.apply(this, arguments)) / 2 - Wn / 2;
    return [He(f) * a, de(f) * a];
  }, c.innerRadius = function(a) {
    return arguments.length ? (t = typeof a == "function" ? a : Gt(+a), c) : t;
  }, c.outerRadius = function(a) {
    return arguments.length ? (e = typeof a == "function" ? a : Gt(+a), c) : e;
  }, c.cornerRadius = function(a) {
    return arguments.length ? (n = typeof a == "function" ? a : Gt(+a), c) : n;
  }, c.padRadius = function(a) {
    return arguments.length ? (r = a == null ? null : typeof a == "function" ? a : Gt(+a), c) : r;
  }, c.startAngle = function(a) {
    return arguments.length ? (i = typeof a == "function" ? a : Gt(+a), c) : i;
  }, c.endAngle = function(a) {
    return arguments.length ? (s = typeof a == "function" ? a : Gt(+a), c) : s;
  }, c.padAngle = function(a) {
    return arguments.length ? (o = typeof a == "function" ? a : Gt(+a), c) : o;
  }, c.context = function(a) {
    return arguments.length ? (l = a ?? null, c) : l;
  }, c;
}
function Pg(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function bu(t) {
  this._context = t;
}
bu.prototype = {
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
function Lg(t) {
  return new bu(t);
}
function Ig(t) {
  return t[0];
}
function $g(t) {
  return t[1];
}
function Og(t, e) {
  var n = Gt(!0), r = null, i = Lg, s = null, o = vu(l);
  t = typeof t == "function" ? t : t === void 0 ? Ig : Gt(t), e = typeof e == "function" ? e : e === void 0 ? $g : Gt(e);
  function l(u) {
    var c, a = (u = Pg(u)).length, f, h = !1, p;
    for (r == null && (s = i(p = o())), c = 0; c <= a; ++c)
      !(c < a && n(f = u[c], c, u)) === h && ((h = !h) ? s.lineStart() : s.lineEnd()), h && s.point(+t(f, c, u), +e(f, c, u));
    if (p) return s = null, p + "" || null;
  }
  return l.x = function(u) {
    return arguments.length ? (t = typeof u == "function" ? u : Gt(+u), l) : t;
  }, l.y = function(u) {
    return arguments.length ? (e = typeof u == "function" ? u : Gt(+u), l) : e;
  }, l.defined = function(u) {
    return arguments.length ? (n = typeof u == "function" ? u : Gt(!!u), l) : n;
  }, l.curve = function(u) {
    return arguments.length ? (i = u, r != null && (s = i(r)), l) : i;
  }, l.context = function(u) {
    return arguments.length ? (u == null ? r = s = null : s = i(r = u), l) : r;
  }, l;
}
const dr = (t) => () => t;
function Ag(t, {
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
function Ee(t, e, n) {
  this.k = t, this.x = e, this.y = n;
}
Ee.prototype = {
  constructor: Ee,
  scale: function(t) {
    return t === 1 ? this : new Ee(this.k * t, this.x, this.y);
  },
  translate: function(t, e) {
    return t === 0 & e === 0 ? this : new Ee(this.k, this.x + this.k * t, this.y + this.k * e);
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
var xu = new Ee(1, 0, 0);
Ee.prototype;
function xi(t) {
  t.stopImmediatePropagation();
}
function Mn(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function Fg(t) {
  return (!t.ctrlKey || t.type === "wheel") && !t.button;
}
function jg() {
  var t = this;
  return t instanceof SVGElement ? (t = t.ownerSVGElement || t, t.hasAttribute("viewBox") ? (t = t.viewBox.baseVal, [[t.x, t.y], [t.x + t.width, t.y + t.height]]) : [[0, 0], [t.width.baseVal.value, t.height.baseVal.value]]) : [[0, 0], [t.clientWidth, t.clientHeight]];
}
function jo() {
  return this.__zoom || xu;
}
function Bg(t) {
  return -t.deltaY * (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 2e-3) * (t.ctrlKey ? 10 : 1);
}
function zg() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Dg(t, e, n) {
  var r = t.invertX(e[0][0]) - n[0][0], i = t.invertX(e[1][0]) - n[1][0], s = t.invertY(e[0][1]) - n[0][1], o = t.invertY(e[1][1]) - n[1][1];
  return t.translate(
    i > r ? (r + i) / 2 : Math.min(0, r) || Math.max(0, i),
    o > s ? (s + o) / 2 : Math.min(0, s) || Math.max(0, o)
  );
}
function Vg() {
  var t = Fg, e = jg, n = Dg, r = Bg, i = zg, s = [0, 1 / 0], o = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], l = 250, u = Nd, c = Yn("start", "zoom", "end"), a, f, h, p = 500, w = 150, v = 0, _ = 10;
  function d(x) {
    x.property("__zoom", jo).on("wheel.zoom", G, { passive: !1 }).on("mousedown.zoom", Q).on("dblclick.zoom", X).filter(i).on("touchstart.zoom", et).on("touchmove.zoom", ot).on("touchend.zoom touchcancel.zoom", U).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  d.transform = function(x, V, N, A) {
    var z = x.selection ? x.selection() : x;
    z.property("__zoom", jo), x !== z ? k(x, V, N, A) : z.interrupt().each(function() {
      L(this, arguments).event(A).start().zoom(null, typeof V == "function" ? V.apply(this, arguments) : V).end();
    });
  }, d.scaleBy = function(x, V, N, A) {
    d.scaleTo(x, function() {
      var z = this.__zoom.k, Y = typeof V == "function" ? V.apply(this, arguments) : V;
      return z * Y;
    }, N, A);
  }, d.scaleTo = function(x, V, N, A) {
    d.transform(x, function() {
      var z = e.apply(this, arguments), Y = this.__zoom, J = N == null ? y(z) : typeof N == "function" ? N.apply(this, arguments) : N, it = Y.invert(J), lt = typeof V == "function" ? V.apply(this, arguments) : V;
      return n(P(C(Y, lt), J, it), z, o);
    }, N, A);
  }, d.translateBy = function(x, V, N, A) {
    d.transform(x, function() {
      return n(this.__zoom.translate(
        typeof V == "function" ? V.apply(this, arguments) : V,
        typeof N == "function" ? N.apply(this, arguments) : N
      ), e.apply(this, arguments), o);
    }, null, A);
  }, d.translateTo = function(x, V, N, A, z) {
    d.transform(x, function() {
      var Y = e.apply(this, arguments), J = this.__zoom, it = A == null ? y(Y) : typeof A == "function" ? A.apply(this, arguments) : A;
      return n(xu.translate(it[0], it[1]).scale(J.k).translate(
        typeof V == "function" ? -V.apply(this, arguments) : -V,
        typeof N == "function" ? -N.apply(this, arguments) : -N
      ), Y, o);
    }, A, z);
  };
  function C(x, V) {
    return V = Math.max(s[0], Math.min(s[1], V)), V === x.k ? x : new Ee(V, x.x, x.y);
  }
  function P(x, V, N) {
    var A = V[0] - N[0] * x.k, z = V[1] - N[1] * x.k;
    return A === x.x && z === x.y ? x : new Ee(x.k, A, z);
  }
  function y(x) {
    return [(+x[0][0] + +x[1][0]) / 2, (+x[0][1] + +x[1][1]) / 2];
  }
  function k(x, V, N, A) {
    x.on("start.zoom", function() {
      L(this, arguments).event(A).start();
    }).on("interrupt.zoom end.zoom", function() {
      L(this, arguments).event(A).end();
    }).tween("zoom", function() {
      var z = this, Y = arguments, J = L(z, Y).event(A), it = e.apply(z, Y), lt = N == null ? y(it) : typeof N == "function" ? N.apply(z, Y) : N, St = Math.max(it[1][0] - it[0][0], it[1][1] - it[0][1]), pt = z.__zoom, gt = typeof V == "function" ? V.apply(z, Y) : V, mt = u(pt.invert(lt).concat(St / pt.k), gt.invert(lt).concat(St / gt.k));
      return function(bt) {
        if (bt === 1) bt = gt;
        else {
          var kt = mt(bt), zt = St / kt[2];
          bt = new Ee(zt, lt[0] - kt[0] * zt, lt[1] - kt[1] * zt);
        }
        J.zoom(null, bt);
      };
    });
  }
  function L(x, V, N) {
    return !N && x.__zooming || new D(x, V);
  }
  function D(x, V) {
    this.that = x, this.args = V, this.active = 0, this.sourceEvent = null, this.extent = e.apply(x, V), this.taps = 0;
  }
  D.prototype = {
    event: function(x) {
      return x && (this.sourceEvent = x), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(x, V) {
      return this.mouse && x !== "mouse" && (this.mouse[1] = V.invert(this.mouse[0])), this.touch0 && x !== "touch" && (this.touch0[1] = V.invert(this.touch0[0])), this.touch1 && x !== "touch" && (this.touch1[1] = V.invert(this.touch1[0])), this.that.__zoom = V, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(x) {
      var V = xt(this.that).datum();
      c.call(
        x,
        this.that,
        new Ag(x, {
          sourceEvent: this.sourceEvent,
          target: d,
          type: x,
          transform: this.that.__zoom,
          dispatch: c
        }),
        V
      );
    }
  };
  function G(x, ...V) {
    if (!t.apply(this, arguments)) return;
    var N = L(this, V).event(x), A = this.__zoom, z = Math.max(s[0], Math.min(s[1], A.k * Math.pow(2, r.apply(this, arguments)))), Y = ee(x);
    if (N.wheel)
      (N.mouse[0][0] !== Y[0] || N.mouse[0][1] !== Y[1]) && (N.mouse[1] = A.invert(N.mouse[0] = Y)), clearTimeout(N.wheel);
    else {
      if (A.k === z) return;
      N.mouse = [Y, A.invert(Y)], Nr(this), N.start();
    }
    Mn(x), N.wheel = setTimeout(J, w), N.zoom("mouse", n(P(C(A, z), N.mouse[0], N.mouse[1]), N.extent, o));
    function J() {
      N.wheel = null, N.end();
    }
  }
  function Q(x, ...V) {
    if (h || !t.apply(this, arguments)) return;
    var N = x.currentTarget, A = L(this, V, !0).event(x), z = xt(x.view).on("mousemove.zoom", lt, !0).on("mouseup.zoom", St, !0), Y = ee(x, N), J = x.clientX, it = x.clientY;
    iu(x.view), xi(x), A.mouse = [Y, this.__zoom.invert(Y)], Nr(this), A.start();
    function lt(pt) {
      if (Mn(pt), !A.moved) {
        var gt = pt.clientX - J, mt = pt.clientY - it;
        A.moved = gt * gt + mt * mt > v;
      }
      A.event(pt).zoom("mouse", n(P(A.that.__zoom, A.mouse[0] = ee(pt, N), A.mouse[1]), A.extent, o));
    }
    function St(pt) {
      z.on("mousemove.zoom mouseup.zoom", null), su(pt.view, A.moved), Mn(pt), A.event(pt).end();
    }
  }
  function X(x, ...V) {
    if (t.apply(this, arguments)) {
      var N = this.__zoom, A = ee(x.changedTouches ? x.changedTouches[0] : x, this), z = N.invert(A), Y = N.k * (x.shiftKey ? 0.5 : 2), J = n(P(C(N, Y), A, z), e.apply(this, V), o);
      Mn(x), l > 0 ? xt(this).transition().duration(l).call(k, J, A, x) : xt(this).call(d.transform, J, A, x);
    }
  }
  function et(x, ...V) {
    if (t.apply(this, arguments)) {
      var N = x.touches, A = N.length, z = L(this, V, x.changedTouches.length === A).event(x), Y, J, it, lt;
      for (xi(x), J = 0; J < A; ++J)
        it = N[J], lt = ee(it, this), lt = [lt, this.__zoom.invert(lt), it.identifier], z.touch0 ? !z.touch1 && z.touch0[2] !== lt[2] && (z.touch1 = lt, z.taps = 0) : (z.touch0 = lt, Y = !0, z.taps = 1 + !!a);
      a && (a = clearTimeout(a)), Y && (z.taps < 2 && (f = lt[0], a = setTimeout(function() {
        a = null;
      }, p)), Nr(this), z.start());
    }
  }
  function ot(x, ...V) {
    if (this.__zooming) {
      var N = L(this, V).event(x), A = x.changedTouches, z = A.length, Y, J, it, lt;
      for (Mn(x), Y = 0; Y < z; ++Y)
        J = A[Y], it = ee(J, this), N.touch0 && N.touch0[2] === J.identifier ? N.touch0[0] = it : N.touch1 && N.touch1[2] === J.identifier && (N.touch1[0] = it);
      if (J = N.that.__zoom, N.touch1) {
        var St = N.touch0[0], pt = N.touch0[1], gt = N.touch1[0], mt = N.touch1[1], bt = (bt = gt[0] - St[0]) * bt + (bt = gt[1] - St[1]) * bt, kt = (kt = mt[0] - pt[0]) * kt + (kt = mt[1] - pt[1]) * kt;
        J = C(J, Math.sqrt(bt / kt)), it = [(St[0] + gt[0]) / 2, (St[1] + gt[1]) / 2], lt = [(pt[0] + mt[0]) / 2, (pt[1] + mt[1]) / 2];
      } else if (N.touch0) it = N.touch0[0], lt = N.touch0[1];
      else return;
      N.zoom("touch", n(P(J, it, lt), N.extent, o));
    }
  }
  function U(x, ...V) {
    if (this.__zooming) {
      var N = L(this, V).event(x), A = x.changedTouches, z = A.length, Y, J;
      for (xi(x), h && clearTimeout(h), h = setTimeout(function() {
        h = null;
      }, p), Y = 0; Y < z; ++Y)
        J = A[Y], N.touch0 && N.touch0[2] === J.identifier ? delete N.touch0 : N.touch1 && N.touch1[2] === J.identifier && delete N.touch1;
      if (N.touch1 && !N.touch0 && (N.touch0 = N.touch1, delete N.touch1), N.touch0) N.touch0[1] = this.__zoom.invert(N.touch0[0]);
      else if (N.end(), N.taps === 2 && (J = ee(J, this), Math.hypot(f[0] - J[0], f[1] - J[1]) < _)) {
        var it = xt(this).on("dblclick.zoom");
        it && it.apply(this, arguments);
      }
    }
  }
  return d.wheelDelta = function(x) {
    return arguments.length ? (r = typeof x == "function" ? x : dr(+x), d) : r;
  }, d.filter = function(x) {
    return arguments.length ? (t = typeof x == "function" ? x : dr(!!x), d) : t;
  }, d.touchable = function(x) {
    return arguments.length ? (i = typeof x == "function" ? x : dr(!!x), d) : i;
  }, d.extent = function(x) {
    return arguments.length ? (e = typeof x == "function" ? x : dr([[+x[0][0], +x[0][1]], [+x[1][0], +x[1][1]]]), d) : e;
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
    return arguments.length ? (_ = +x, d) : _;
  }, d;
}
function qg(t, e) {
  let n = Vg().filter((r) => {
    var i;
    return r.button === 0 || ((i = r.touches) == null ? void 0 : i.length) >= 2;
  });
  return Gg(n, t, e);
}
function Gg(t, e, n) {
  return n ? t.scaleExtent([0.5, 5]).on("zoom", (r) => e(r, !0)) : t.scaleExtent([1, 1]).on("zoom", (r) => e(r, !1));
}
class Wi {
  /**
   * @param id - The internal ID which is used for node referencing.
   * @param idImported - The external ID provided for imported nodes (solely used for the purpose of imported node creation).
   * @param x - The nodes x position
   * @param y - The nodes y position
   * @param label - The nodes label
   * @param color - The color of the node which was set (for default color this is empty)
   * @param fixedPosition - A fixed node can't be dragged via GUI and isn't influenced by the simulation forces
   * @param deletable - If the node is deletable via GUI
   * @param labelEditable - If the nodes label is editable via GUI
   * @param allowIncomingLinks - If the node can get new incoming links via GUI
   * @param allowOutgoingLinks - If the node can get new outgoing links via GUI
   */
  constructor(e, n, r, i, s, o, l, u, c, a, f) {
    wt(this, "fx");
    wt(this, "fy");
    wt(this, "_fixedPosition");
    this.id = e, this.idImported = n, this.x = r, this.y = i, this.label = s, this.color = o, this.deletable = u, this.labelEditable = c, this.allowIncomingLinks = a, this.allowOutgoingLinks = f, this.fixedPosition = l;
  }
  set fixedPosition(e) {
    var n, r;
    this._fixedPosition = e, this.fx = (n = this.fixedPosition) != null && n.x ? this.x : void 0, this.fy = (r = this.fixedPosition) != null && r.y ? this.y : void 0;
  }
  get fixedPosition() {
    return this._fixedPosition;
  }
}
function Hg(t, e) {
  const n = new CustomEvent("nodecreated", {
    detail: {
      node: { id: t.id, label: t.label, x: t.x, y: t.y }
    }
  });
  e.node().dispatchEvent(n);
}
function Ug(t, e) {
  const n = new CustomEvent("linkcreated", {
    detail: {
      link: { id: t.id, label: t.label }
    }
  });
  e.node().dispatchEvent(n);
}
function Wg(t, e, n) {
  const r = new CustomEvent("nodeclicked", {
    detail: {
      node: { id: t.id, label: t.label, x: t.x, y: t.y },
      button: e
    }
  });
  n.node().dispatchEvent(r);
}
function Kg(t, e, n) {
  const r = new CustomEvent("linkclicked", {
    detail: {
      link: { id: t.id, label: t.label },
      button: e
    }
  });
  n.node().dispatchEvent(r);
}
function Ei(t, e) {
  const n = new CustomEvent("nodedeleted", {
    detail: {
      node: { id: t.id, label: t.label, x: t.x, y: t.y }
    }
  });
  e.node().dispatchEvent(n);
}
function Nn(t, e) {
  const n = new CustomEvent("linkdeleted", {
    detail: {
      link: { id: t.id, label: t.label }
    }
  });
  e.node().dispatchEvent(n);
}
function Xg(t, e, n) {
  const r = new CustomEvent("labeledited", {
    detail: {
      parent: { id: t.id },
      label: e
    }
  });
  n.node().dispatchEvent(r);
}
function Kt(t) {
  t.preventDefault(), t.stopPropagation();
}
function Yg(t, e, n, r) {
  return Jh().filter(
    (i, s) => {
      var o, l;
      return i.button === 0 && //left mouse click
      (((o = s.fixedPosition) == null ? void 0 : o.x) !== !0 || ((l = s.fixedPosition) == null ? void 0 : l.y) !== !0);
    }
  ).on("start", (i, s) => {
    var o, l;
    Kt(i.sourceEvent), i.active === 0 && t.alphaTarget(0.5).restart(), ((o = s.fixedPosition) == null ? void 0 : o.x) !== !0 && (s.fx = s.x), ((l = s.fixedPosition) == null ? void 0 : l.y) !== !0 && (s.fy = s.y);
  }).on("drag", (i, s) => {
    var o, l;
    ((o = s.fixedPosition) == null ? void 0 : o.x) !== !0 && (s.fx = Math.max(r, Math.min(e - r, i.x))), ((l = s.fixedPosition) == null ? void 0 : l.y) !== !0 && (s.fy = Math.max(r, Math.min(n - r, i.y)));
  }).on("end", (i, s) => {
    var o, l;
    i.active === 0 && t.alphaTarget(0), ((o = s.fixedPosition) == null ? void 0 : o.x) !== !0 && (s.fx = void 0), ((l = s.fixedPosition) == null ? void 0 : l.y) !== !0 && (s.fy = void 0);
  });
}
function Jg(t, e, n, r, i) {
  const s = t.append("svg").attr("class", "graph-controller__graph-canvas").on("pointermove", (o) => n(o)).on("pointerup", (o) => r(o)).on("contextmenu", (o) => Kt(o)).on("dblclick", (o) => i(o)).call(e).on("dblclick.zoom", null).append("g");
  return s.append("rect").attr("width", "100%").attr("height", "100%").attr("fill", "white"), s;
}
var Yt = /* @__PURE__ */ ((t) => (t.LINE = "LINE", t.LINEREVERSE = "LINE-REVERSE", t.ARC = "ARC", t.ARCREVERSE = "ARC-REVERSE", t.REFLEXIVE = "REFLEXIVE", t))(Yt || {});
class Qg {
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
    wt(this, "id");
    this.source = e, this.target = n, this.pathType = r, this.label = i, this.color = s, this.deletable = o, this.labelEditable = l, this.id = `${e.id}-${n.id}`;
  }
}
function Zg(t) {
  return t.append("g").classed("links", !0).selectAll("path");
}
function tm(t) {
  return t.append("g").classed("nodes", !0).selectAll("circle");
}
function Rn(t) {
  let e = [], n = [];
  if (!Array.isArray(t))
    typeof t == "number" ? e = [t] : n = [t];
  else {
    let r = t.map(String);
    n = r.filter((i) => i.includes("-")), e = r.filter((i) => !i.includes("-")).map(Number);
  }
  return [e, n];
}
function pr(t, e) {
  e !== void 0 && (typeof e == "boolean" ? e ? t.fixedPosition = { x: !0, y: !0 } : t.fixedPosition = { x: !1, y: !1 } : em(["x", "y"], Object.keys(e)) && (t.fixedPosition = e, Ki(["x", "y"], Object.keys(e))));
}
function Kn(t) {
  return t.replace(/([#.,;:<>+~^$|[\]()\\/])/g, "\\$1");
}
function Bo(t) {
  let e = t.target;
  e.hasPointerCapture(t.pointerId) && e.releasePointerCapture(t.pointerId);
}
function Ki(t, e, n) {
  let r = !0;
  return e.forEach((i) => {
    t.includes(
      i
      // we actually just check if the type is keyof
    ) || (r = !1, An(
      `Option not valid: ${i}`,
      `Use the following: ${t.join(", ")}.`
    ));
  }), r;
}
function em(t, e, n) {
  let r = !0, i = t.filter((s) => !e.includes(s));
  return i.length > 0 && (r = !1, An("Option missing", `Add: ${i}`)), r;
}
function An(t, e) {
  console.error(t + `
` + e);
}
function nm(t, e, n, r) {
  if (Fn(t, n, e + "-link-arrow", "graph-controller__arrow", !1), Fn(
    t,
    n,
    e + "-link-arrow-reverse",
    "graph-controller__arrow",
    !0
  ), Fn(
    t,
    n,
    e + "-draggable-link-arrow",
    "graph-controller__arrow draggable",
    !1
  ), r)
    for (let i of r)
      Xi(t, e, n, i);
}
function Xi(t, e, n, r) {
  t.select(`#${e}-link-arrow-` + Kn(r)).empty() && (Fn(
    t,
    n,
    e + "-link-arrow-" + r,
    "graph-controller__arrow " + r,
    !1,
    r
  ), Fn(
    t,
    n,
    e + "-link-arrow-reverse-" + r,
    "graph-controller__arrow colored",
    !0,
    r
  ));
}
function Si(t, e, n) {
  t.select(`#${e}-link-arrow-` + Kn(n)).select(function() {
    return this.parentNode;
  }).remove(), t.select(`#${e}-link-arrow-reverse-` + Kn(n)).select(function() {
    return this.parentNode;
  }).remove();
}
function Fn(t, e, n, r, i, s) {
  t.append("defs").append("marker").attr("id", n).attr("viewBox", e.markerPath).attr("refX", e.markerRef).attr("refY", e.markerRef).attr("markerWidth", e.markerBoxSize).attr("markerHeight", e.markerBoxSize).attr("orient", i ? "auto-start-reverse" : "auto").classed(r, !0).append("path").attr("d", `${Og()(e.arrowPoints)}`).style("fill", s || "");
}
function rm(t) {
  return t.append("path").classed("graph-controller__link draggable hidden", !0).attr("d", "M0,0L0,0");
}
class zo {
  constructor() {
    wt(this, "nodeIdCounter", 0);
    wt(this, "nodes", []);
    wt(this, "links", []);
  }
  createNode(e, n, r, i, s, o = { x: !1, y: !1 }, l = !0, u = !0, c = !0, a = !0) {
    const f = new Wi(
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
      a
    );
    return this.nodes.push(f), f;
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
    const a = new Qg(
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
function im(t, e, n, r, i) {
  let s = wg(t.nodes).on("tick", () => i()).force(
    "collision",
    lg().radius(e.nodeRadius)
    //stop overlapping
  );
  return s = sm(t, s, n, r, e), s = Su(s, t, e, e.fixedLinkDistanceEnabled), s = Eu(s, e.nodePhysicsEnabled, n, r), s;
}
function sm(t, e, n, r, i) {
  return e.force("bounds", () => {
    for (const s of t.nodes)
      s.x = Math.max(i.nodeRadius, Math.min(n - i.nodeRadius, s.x)), s.y = Math.max(i.nodeRadius, Math.min(r - i.nodeRadius, s.y));
  });
}
function Eu(t, e, n, r) {
  return e ? t.force("charge", yg().strength(-500)).force("x", _g(n / 2).strength(0.05)).force("y", vg(r / 2).strength(0.05)) : t.force("charge", null).force("x", null).force("y", null);
}
function Su(t, e, n, r) {
  return r ? t.force(
    "link",
    cg().links(e.links).id((i) => i.id).distance(n.nodeRadius * 10)
  ) : t.force("link", null);
}
const om = Object.prototype.toString;
function qr(t) {
  const e = om.call(t);
  return e.endsWith("Array]") && !e.includes("Big");
}
function lm(t) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (!qr(t))
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
function um(t) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (!qr(t))
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
function Do(t) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (qr(t)) {
    if (t.length === 0)
      throw new TypeError("input must not be empty");
  } else throw new TypeError("input must be an array");
  var n;
  if (e.output !== void 0) {
    if (!qr(e.output))
      throw new TypeError("output option must be an array if specified");
    n = e.output;
  } else
    n = new Array(t.length);
  var r = um(t), i = lm(t);
  if (r === i)
    throw new RangeError("minimum and maximum input values are equal. Cannot rescale a constant array");
  var s = e.min, o = s === void 0 ? e.autoMinMax ? r : 0 : s, l = e.max, u = l === void 0 ? e.autoMinMax ? i : 1 : l;
  if (o >= u)
    throw new RangeError("min option must be smaller than max option");
  for (var c = (u - o) / (i - r), a = 0; a < t.length; a++)
    n[a] = (t[a] - r) * c + o;
  return n;
}
const gr = " ".repeat(2), ku = " ".repeat(4);
function cm() {
  return Mu(this);
}
function Mu(t, e = {}) {
  const { maxRows: n = 15, maxColumns: r = 10, maxNumSize: i = 8 } = e;
  return `${t.constructor.name} {
${gr}[
${ku}${am(t, n, r, i)}
${gr}]
${gr}rows: ${t.rows}
${gr}columns: ${t.columns}
}`;
}
function am(t, e, n, r) {
  const { rows: i, columns: s } = t, o = Math.min(i, e), l = Math.min(s, n), u = [];
  for (let c = 0; c < o; c++) {
    let a = [];
    for (let f = 0; f < l; f++)
      a.push(fm(t.get(c, f), r));
    u.push(`${a.join(" ")}`);
  }
  return l !== s && (u[u.length - 1] += ` ... ${s - n} more columns`), o !== i && u.push(`... ${i - e} more rows`), u.join(`
${ku}`);
}
function fm(t, e) {
  const n = String(t);
  if (n.length <= e)
    return n.padEnd(e, " ");
  const r = t.toPrecision(e - 2);
  if (r.length <= e)
    return r;
  const i = t.toExponential(e - 2), s = i.indexOf("e"), o = i.slice(s);
  return i.slice(0, e - o.length) + o;
}
function hm(t, e) {
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
function se(t, e, n) {
  let r = n ? t.rows : t.rows - 1;
  if (e < 0 || e > r)
    throw new RangeError("Row index out of range");
}
function oe(t, e, n) {
  let r = n ? t.columns : t.columns - 1;
  if (e < 0 || e > r)
    throw new RangeError("Column index out of range");
}
function sn(t, e) {
  if (e.to1DArray && (e = e.to1DArray()), e.length !== t.columns)
    throw new RangeError(
      "vector size must be the same as the number of columns"
    );
  return e;
}
function on(t, e) {
  if (e.to1DArray && (e = e.to1DArray()), e.length !== t.rows)
    throw new RangeError("vector size must be the same as the number of rows");
  return e;
}
function dm(t, e, n) {
  return {
    row: pm(t, e),
    column: gm(t, n)
  };
}
function pm(t, e) {
  if (typeof e != "object")
    throw new TypeError("unexpected type for row indices");
  if (e.some((r) => r < 0 || r >= t.rows))
    throw new RangeError("row indices are out of range");
  return Array.isArray(e) || (e = Array.from(e)), e;
}
function gm(t, e) {
  if (typeof e != "object")
    throw new TypeError("unexpected type for column indices");
  if (e.some((r) => r < 0 || r >= t.columns))
    throw new RangeError("column indices are out of range");
  return Array.isArray(e) || (e = Array.from(e)), e;
}
function Vo(t, e, n, r, i) {
  if (arguments.length !== 5)
    throw new RangeError("expected 4 arguments");
  if (mr("startRow", e), mr("endRow", n), mr("startColumn", r), mr("endColumn", i), e > n || r > i || e < 0 || e >= t.rows || n < 0 || n >= t.rows || r < 0 || r >= t.columns || i < 0 || i >= t.columns)
    throw new RangeError("Submatrix indices are out of range");
}
function si(t, e = 0) {
  let n = [];
  for (let r = 0; r < t; r++)
    n.push(e);
  return n;
}
function mr(t, e) {
  if (typeof e != "number")
    throw new TypeError(`${t} must be a number`);
}
function rn(t) {
  if (t.isEmpty())
    throw new Error("Empty matrix has no elements to index");
}
function mm(t) {
  let e = si(t.rows);
  for (let n = 0; n < t.rows; ++n)
    for (let r = 0; r < t.columns; ++r)
      e[n] += t.get(n, r);
  return e;
}
function wm(t) {
  let e = si(t.columns);
  for (let n = 0; n < t.rows; ++n)
    for (let r = 0; r < t.columns; ++r)
      e[r] += t.get(n, r);
  return e;
}
function ym(t) {
  let e = 0;
  for (let n = 0; n < t.rows; n++)
    for (let r = 0; r < t.columns; r++)
      e += t.get(n, r);
  return e;
}
function _m(t) {
  let e = si(t.rows, 1);
  for (let n = 0; n < t.rows; ++n)
    for (let r = 0; r < t.columns; ++r)
      e[n] *= t.get(n, r);
  return e;
}
function vm(t) {
  let e = si(t.columns, 1);
  for (let n = 0; n < t.rows; ++n)
    for (let r = 0; r < t.columns; ++r)
      e[r] *= t.get(n, r);
  return e;
}
function bm(t) {
  let e = 1;
  for (let n = 0; n < t.rows; n++)
    for (let r = 0; r < t.columns; r++)
      e *= t.get(n, r);
  return e;
}
function xm(t, e, n) {
  const r = t.rows, i = t.columns, s = [];
  for (let o = 0; o < r; o++) {
    let l = 0, u = 0, c = 0;
    for (let a = 0; a < i; a++)
      c = t.get(o, a) - n[o], l += c, u += c * c;
    e ? s.push((u - l * l / i) / (i - 1)) : s.push((u - l * l / i) / i);
  }
  return s;
}
function Em(t, e, n) {
  const r = t.rows, i = t.columns, s = [];
  for (let o = 0; o < i; o++) {
    let l = 0, u = 0, c = 0;
    for (let a = 0; a < r; a++)
      c = t.get(a, o) - n[o], l += c, u += c * c;
    e ? s.push((u - l * l / r) / (r - 1)) : s.push((u - l * l / r) / r);
  }
  return s;
}
function Sm(t, e, n) {
  const r = t.rows, i = t.columns, s = r * i;
  let o = 0, l = 0, u = 0;
  for (let c = 0; c < r; c++)
    for (let a = 0; a < i; a++)
      u = t.get(c, a) - n, o += u, l += u * u;
  return e ? (l - o * o / s) / (s - 1) : (l - o * o / s) / s;
}
function km(t, e) {
  for (let n = 0; n < t.rows; n++)
    for (let r = 0; r < t.columns; r++)
      t.set(n, r, t.get(n, r) - e[n]);
}
function Mm(t, e) {
  for (let n = 0; n < t.rows; n++)
    for (let r = 0; r < t.columns; r++)
      t.set(n, r, t.get(n, r) - e[r]);
}
function Nm(t, e) {
  for (let n = 0; n < t.rows; n++)
    for (let r = 0; r < t.columns; r++)
      t.set(n, r, t.get(n, r) - e);
}
function Rm(t) {
  const e = [];
  for (let n = 0; n < t.rows; n++) {
    let r = 0;
    for (let i = 0; i < t.columns; i++)
      r += Math.pow(t.get(n, i), 2) / (t.columns - 1);
    e.push(Math.sqrt(r));
  }
  return e;
}
function Cm(t, e) {
  for (let n = 0; n < t.rows; n++)
    for (let r = 0; r < t.columns; r++)
      t.set(n, r, t.get(n, r) / e[n]);
}
function Tm(t) {
  const e = [];
  for (let n = 0; n < t.columns; n++) {
    let r = 0;
    for (let i = 0; i < t.rows; i++)
      r += Math.pow(t.get(i, n), 2) / (t.rows - 1);
    e.push(Math.sqrt(r));
  }
  return e;
}
function Pm(t, e) {
  for (let n = 0; n < t.rows; n++)
    for (let r = 0; r < t.columns; r++)
      t.set(n, r, t.get(n, r) / e[r]);
}
function Lm(t) {
  const e = t.size - 1;
  let n = 0;
  for (let r = 0; r < t.columns; r++)
    for (let i = 0; i < t.rows; i++)
      n += Math.pow(t.get(i, r), 2) / e;
  return Math.sqrt(n);
}
function Im(t, e) {
  for (let n = 0; n < t.rows; n++)
    for (let r = 0; r < t.columns; r++)
      t.set(n, r, t.get(n, r) / e);
}
class at {
  static from1DArray(e, n, r) {
    if (e * n !== r.length)
      throw new RangeError("data length does not match given dimensions");
    let s = new st(e, n);
    for (let o = 0; o < e; o++)
      for (let l = 0; l < n; l++)
        s.set(o, l, r[o * n + l]);
    return s;
  }
  static rowVector(e) {
    let n = new st(1, e.length);
    for (let r = 0; r < e.length; r++)
      n.set(0, r, e[r]);
    return n;
  }
  static columnVector(e) {
    let n = new st(e.length, 1);
    for (let r = 0; r < e.length; r++)
      n.set(r, 0, e[r]);
    return n;
  }
  static zeros(e, n) {
    return new st(e, n);
  }
  static ones(e, n) {
    return new st(e, n).fill(1);
  }
  static rand(e, n, r = {}) {
    if (typeof r != "object")
      throw new TypeError("options must be an object");
    const { random: i = Math.random } = r;
    let s = new st(e, n);
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
    let l = s - i, u = new st(e, n);
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
    let r = e.rows, i = e.columns, s = new st(r, i);
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
    return at.isMatrix(e) ? e : new st(e);
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
    let i = new st(this.rows * n, this.columns * r);
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
    se(this, e);
    let n = [];
    for (let r = 0; r < this.columns; r++)
      n.push(this.get(e, r));
    return n;
  }
  getRowVector(e) {
    return st.rowVector(this.getRow(e));
  }
  setRow(e, n) {
    se(this, e), n = sn(this, n);
    for (let r = 0; r < this.columns; r++)
      this.set(e, r, n[r]);
    return this;
  }
  swapRows(e, n) {
    se(this, e), se(this, n);
    for (let r = 0; r < this.columns; r++) {
      let i = this.get(e, r);
      this.set(e, r, this.get(n, r)), this.set(n, r, i);
    }
    return this;
  }
  getColumn(e) {
    oe(this, e);
    let n = [];
    for (let r = 0; r < this.rows; r++)
      n.push(this.get(r, e));
    return n;
  }
  getColumnVector(e) {
    return st.columnVector(this.getColumn(e));
  }
  setColumn(e, n) {
    oe(this, e), n = on(this, n);
    for (let r = 0; r < this.rows; r++)
      this.set(r, e, n[r]);
    return this;
  }
  swapColumns(e, n) {
    oe(this, e), oe(this, n);
    for (let r = 0; r < this.rows; r++) {
      let i = this.get(r, e);
      this.set(r, e, this.get(r, n)), this.set(r, n, i);
    }
    return this;
  }
  addRowVector(e) {
    e = sn(this, e);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, this.get(n, r) + e[r]);
    return this;
  }
  subRowVector(e) {
    e = sn(this, e);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, this.get(n, r) - e[r]);
    return this;
  }
  mulRowVector(e) {
    e = sn(this, e);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, this.get(n, r) * e[r]);
    return this;
  }
  divRowVector(e) {
    e = sn(this, e);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, this.get(n, r) / e[r]);
    return this;
  }
  addColumnVector(e) {
    e = on(this, e);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, this.get(n, r) + e[n]);
    return this;
  }
  subColumnVector(e) {
    e = on(this, e);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, this.get(n, r) - e[n]);
    return this;
  }
  mulColumnVector(e) {
    e = on(this, e);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, this.get(n, r) * e[n]);
    return this;
  }
  divColumnVector(e) {
    e = on(this, e);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, this.get(n, r) / e[n]);
    return this;
  }
  mulRow(e, n) {
    se(this, e);
    for (let r = 0; r < this.columns; r++)
      this.set(e, r, this.get(e, r) * n);
    return this;
  }
  mulColumn(e, n) {
    oe(this, e);
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
    rn(this);
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
    rn(this);
    let e = this.get(0, 0), n = [0, 0];
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.get(r, i) < e && (e = this.get(r, i), n[0] = r, n[1] = i);
    return n;
  }
  maxRow(e) {
    if (se(this, e), this.isEmpty())
      return NaN;
    let n = this.get(e, 0);
    for (let r = 1; r < this.columns; r++)
      this.get(e, r) > n && (n = this.get(e, r));
    return n;
  }
  maxRowIndex(e) {
    se(this, e), rn(this);
    let n = this.get(e, 0), r = [e, 0];
    for (let i = 1; i < this.columns; i++)
      this.get(e, i) > n && (n = this.get(e, i), r[1] = i);
    return r;
  }
  minRow(e) {
    if (se(this, e), this.isEmpty())
      return NaN;
    let n = this.get(e, 0);
    for (let r = 1; r < this.columns; r++)
      this.get(e, r) < n && (n = this.get(e, r));
    return n;
  }
  minRowIndex(e) {
    se(this, e), rn(this);
    let n = this.get(e, 0), r = [e, 0];
    for (let i = 1; i < this.columns; i++)
      this.get(e, i) < n && (n = this.get(e, i), r[1] = i);
    return r;
  }
  maxColumn(e) {
    if (oe(this, e), this.isEmpty())
      return NaN;
    let n = this.get(0, e);
    for (let r = 1; r < this.rows; r++)
      this.get(r, e) > n && (n = this.get(r, e));
    return n;
  }
  maxColumnIndex(e) {
    oe(this, e), rn(this);
    let n = this.get(0, e), r = [0, e];
    for (let i = 1; i < this.rows; i++)
      this.get(i, e) > n && (n = this.get(i, e), r[0] = i);
    return r;
  }
  minColumn(e) {
    if (oe(this, e), this.isEmpty())
      return NaN;
    let n = this.get(0, e);
    for (let r = 1; r < this.rows; r++)
      this.get(r, e) < n && (n = this.get(r, e));
    return n;
  }
  minColumnIndex(e) {
    oe(this, e), rn(this);
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
    at.isMatrix(e) && (e = e.to1DArray());
    let n = this.to1DArray();
    if (n.length !== e.length)
      throw new RangeError("vectors do not have the same size");
    let r = 0;
    for (let i = 0; i < n.length; i++)
      r += n[i] * e[i];
    return r;
  }
  mmul(e) {
    e = st.checkMatrix(e);
    let n = this.rows, r = this.columns, i = e.columns, s = new st(n, i), o = new Float64Array(r);
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
    e = st.checkMatrix(e);
    let n = new st(2, 2);
    const r = this.get(0, 0), i = e.get(0, 0), s = this.get(0, 1), o = e.get(0, 1), l = this.get(1, 0), u = e.get(1, 0), c = this.get(1, 1), a = e.get(1, 1), f = (r + c) * (i + a), h = (l + c) * i, p = r * (o - a), w = c * (u - i), v = (r + s) * a, _ = (l - r) * (i + o), d = (s - c) * (u + a), C = f + w - v + d, P = p + v, y = h + w, k = f - h + p + _;
    return n.set(0, 0, C), n.set(0, 1, P), n.set(1, 0, y), n.set(1, 1, k), n;
  }
  strassen3x3(e) {
    e = st.checkMatrix(e);
    let n = new st(3, 3);
    const r = this.get(0, 0), i = this.get(0, 1), s = this.get(0, 2), o = this.get(1, 0), l = this.get(1, 1), u = this.get(1, 2), c = this.get(2, 0), a = this.get(2, 1), f = this.get(2, 2), h = e.get(0, 0), p = e.get(0, 1), w = e.get(0, 2), v = e.get(1, 0), _ = e.get(1, 1), d = e.get(1, 2), C = e.get(2, 0), P = e.get(2, 1), y = e.get(2, 2), k = (r + i + s - o - l - a - f) * _, L = (r - o) * (-p + _), D = l * (-h + p + v - _ - d - C + y), G = (-r + o + l) * (h - p + _), Q = (o + l) * (-h + p), X = r * h, et = (-r + c + a) * (h - w + d), ot = (-r + c) * (w - d), U = (c + a) * (-h + w), x = (r + i + s - l - u - c - a) * d, V = a * (-h + w + v - _ - d - C + P), N = (-s + a + f) * (_ + C - P), A = (s - f) * (_ - P), z = s * C, Y = (a + f) * (-C + P), J = (-s + l + u) * (d + C - y), it = (s - u) * (d - y), lt = (l + u) * (-C + y), St = i * v, pt = u * P, gt = o * w, mt = c * p, bt = f * y, kt = X + z + St, zt = k + G + Q + X + N + z + Y, Zt = X + et + U + x + z + J + lt, ve = L + D + G + X + z + J + it, ze = L + G + Q + X + pt, m = z + J + it + lt + gt, b = X + et + ot + V + N + A + z, T = N + A + z + Y + mt, $ = X + et + ot + U + bt;
    return n.set(0, 0, kt), n.set(0, 1, zt), n.set(0, 2, Zt), n.set(1, 0, ve), n.set(1, 1, ze), n.set(1, 2, m), n.set(2, 0, b), n.set(2, 1, T), n.set(2, 2, $), n;
  }
  mmulStrassen(e) {
    e = st.checkMatrix(e);
    let n = this.clone(), r = n.rows, i = n.columns, s = e.rows, o = e.columns;
    i !== s && console.warn(
      `Multiplying ${r} x ${i} and ${s} x ${o} matrix: dimensions do not match.`
    );
    function l(f, h, p) {
      let w = f.rows, v = f.columns;
      if (w === h && v === p)
        return f;
      {
        let _ = at.zeros(h, p);
        return _ = _.setSubMatrix(f, 0, 0), _;
      }
    }
    let u = Math.max(r, s), c = Math.max(i, o);
    n = l(n, u, c), e = l(e, u, c);
    function a(f, h, p, w) {
      if (p <= 512 || w <= 512)
        return f.mmul(h);
      p % 2 === 1 && w % 2 === 1 ? (f = l(f, p + 1, w + 1), h = l(h, p + 1, w + 1)) : p % 2 === 1 ? (f = l(f, p + 1, w), h = l(h, p + 1, w)) : w % 2 === 1 && (f = l(f, p, w + 1), h = l(h, p, w + 1));
      let v = parseInt(f.rows / 2, 10), _ = parseInt(f.columns / 2, 10), d = f.subMatrix(0, v - 1, 0, _ - 1), C = h.subMatrix(0, v - 1, 0, _ - 1), P = f.subMatrix(0, v - 1, _, f.columns - 1), y = h.subMatrix(0, v - 1, _, h.columns - 1), k = f.subMatrix(v, f.rows - 1, 0, _ - 1), L = h.subMatrix(v, h.rows - 1, 0, _ - 1), D = f.subMatrix(v, f.rows - 1, _, f.columns - 1), G = h.subMatrix(v, h.rows - 1, _, h.columns - 1), Q = a(
        at.add(d, D),
        at.add(C, G),
        v,
        _
      ), X = a(at.add(k, D), C, v, _), et = a(d, at.sub(y, G), v, _), ot = a(D, at.sub(L, C), v, _), U = a(at.add(d, P), G, v, _), x = a(
        at.sub(k, d),
        at.add(C, y),
        v,
        _
      ), V = a(
        at.sub(P, D),
        at.add(L, G),
        v,
        _
      ), N = at.add(Q, ot);
      N.sub(U), N.add(V);
      let A = at.add(et, U), z = at.add(X, ot), Y = at.sub(Q, X);
      Y.add(et), Y.add(x);
      let J = at.zeros(2 * N.rows, 2 * N.columns);
      return J = J.setSubMatrix(N, 0, 0), J = J.setSubMatrix(A, N.rows, 0), J = J.setSubMatrix(z, 0, N.columns), J = J.setSubMatrix(Y, N.rows, N.columns), J.subMatrix(0, p - 1, 0, w - 1);
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
    let i = new st(this.rows, this.columns);
    for (let s = 0; s < this.rows; s++) {
      const o = this.getRow(s);
      o.length > 0 && Do(o, { min: n, max: r, output: o }), i.setRow(s, o);
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
    let i = new st(this.rows, this.columns);
    for (let s = 0; s < this.columns; s++) {
      const o = this.getColumn(s);
      o.length && Do(o, {
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
    e = st.checkMatrix(e);
    let n = this.rows, r = this.columns, i = e.rows, s = e.columns, o = new st(n * i, r * s);
    for (let l = 0; l < n; l++)
      for (let u = 0; u < r; u++)
        for (let c = 0; c < i; c++)
          for (let a = 0; a < s; a++)
            o.set(i * l + c, s * u + a, this.get(l, u) * e.get(c, a));
    return o;
  }
  kroneckerSum(e) {
    if (e = st.checkMatrix(e), !this.isSquare() || !e.isSquare())
      throw new Error("Kronecker Sum needs two Square Matrices");
    let n = this.rows, r = e.rows, i = this.kroneckerProduct(st.eye(r, r)), s = st.eye(n, n).kroneckerProduct(e);
    return i.add(s);
  }
  transpose() {
    let e = new st(this.columns, this.rows);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        e.set(r, n, this.get(n, r));
    return e;
  }
  sortRows(e = qo) {
    for (let n = 0; n < this.rows; n++)
      this.setRow(n, this.getRow(n).sort(e));
    return this;
  }
  sortColumns(e = qo) {
    for (let n = 0; n < this.columns; n++)
      this.setColumn(n, this.getColumn(n).sort(e));
    return this;
  }
  subMatrix(e, n, r, i) {
    Vo(this, e, n, r, i);
    let s = new st(
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
    let i = new st(e.length, r - n + 1);
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
    let i = new st(r - n + 1, e.length);
    for (let s = 0; s < e.length; s++)
      for (let o = n; o <= r; o++) {
        if (e[s] < 0 || e[s] >= this.columns)
          throw new RangeError(`Column index out of range: ${e[s]}`);
        i.set(o - n, s, this.get(o, e[s]));
      }
    return i;
  }
  setSubMatrix(e, n, r) {
    if (e = st.checkMatrix(e), e.isEmpty())
      return this;
    let i = n + e.rows - 1, s = r + e.columns - 1;
    Vo(this, n, i, r, s);
    for (let o = 0; o < e.rows; o++)
      for (let l = 0; l < e.columns; l++)
        this.set(n + o, r + l, e.get(o, l));
    return this;
  }
  selection(e, n) {
    let r = dm(this, e, n), i = new st(e.length, n.length);
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
    let e = new st(this.rows, this.columns);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        e.set(n, r, this.get(n, r));
    return e;
  }
  sum(e) {
    switch (e) {
      case "row":
        return mm(this);
      case "column":
        return wm(this);
      case void 0:
        return ym(this);
      default:
        throw new Error(`invalid option: ${e}`);
    }
  }
  product(e) {
    switch (e) {
      case "row":
        return _m(this);
      case "column":
        return vm(this);
      case void 0:
        return bm(this);
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
        return xm(this, r, i);
      }
      case "column": {
        if (!Array.isArray(i))
          throw new TypeError("mean must be an array");
        return Em(this, r, i);
      }
      case void 0: {
        if (typeof i != "number")
          throw new TypeError("mean must be a number");
        return Sm(this, r, i);
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
        return km(this, r), this;
      }
      case "column": {
        if (!Array.isArray(r))
          throw new TypeError("center must be an array");
        return Mm(this, r), this;
      }
      case void 0: {
        if (typeof r != "number")
          throw new TypeError("center must be a number");
        return Nm(this, r), this;
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
          r = Rm(this);
        else if (!Array.isArray(r))
          throw new TypeError("scale must be an array");
        return Cm(this, r), this;
      }
      case "column": {
        if (r === void 0)
          r = Tm(this);
        else if (!Array.isArray(r))
          throw new TypeError("scale must be an array");
        return Pm(this, r), this;
      }
      case void 0: {
        if (r === void 0)
          r = Lm(this);
        else if (typeof r != "number")
          throw new TypeError("scale must be a number");
        return Im(this, r), this;
      }
      default:
        throw new Error(`invalid option: ${e}`);
    }
  }
  toString(e) {
    return Mu(this, e);
  }
}
at.prototype.klass = "Matrix";
typeof Symbol < "u" && (at.prototype[Symbol.for("nodejs.util.inspect.custom")] = cm);
function qo(t, e) {
  return t - e;
}
at.random = at.rand;
at.randomInt = at.randInt;
at.diagonal = at.diag;
at.prototype.diagonal = at.prototype.diag;
at.identity = at.eye;
at.prototype.negate = at.prototype.neg;
at.prototype.tensorProduct = at.prototype.kroneckerProduct;
class st extends at {
  constructor(e, n) {
    if (super(), st.isMatrix(e))
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
    return se(this, e), this.data.splice(e, 1), this.rows -= 1, this;
  }
  addRow(e, n) {
    return n === void 0 && (n = e, e = this.rows), se(this, e, !0), n = Float64Array.from(sn(this, n)), this.data.splice(e, 0, n), this.rows += 1, this;
  }
  removeColumn(e) {
    oe(this, e);
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
    typeof n > "u" && (n = e, e = this.columns), oe(this, e, !0), n = on(this, n);
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
hm(at, st);
var $m = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Om(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var Nu = { exports: {} };
(function(t, e) {
  (function(n, r) {
    t.exports = r();
  })($m, function() {
    function n(o) {
      o = o.replace(/,/g, " ").replace(/([^eE])-/g, "$1 -").replace(/\s*([achlmqstvzACHLMQSTVZ])\s*/g, " $1 ").replace(/\s+/g, " ").replace(/(\d*\.\d+([eE]-?\d+)?)((\.\d+)+)/g, (N, A, z, Y) => A + Y.replaceAll(".", " ."));
      var l = o.replace(/([achlmqstvzACHLMQSTVZ])\s?/g, "|$1").split("|"), u = l.length, c, a, f, h, p, w = [], v = [], _, d, C = 0, P = 0, y = 0, k = 0, L = 0, D = 0, G = 0, Q = 0, X = 0, et = 0, ot = 0, U = 0, x = 0, V = "";
      for (c = 1; c < u; c++) {
        if (a = l[c], f = a.substring(0, 1), h = f.toLowerCase(), w = a.replace(f, "").trim().split(" ").filter(function(N) {
          return N !== "";
        }), v = w, w = w.map(parseFloat), _ = w.length, h === "m") {
          if (V += "M ", f === "m" ? (y += w[0], k += w[1]) : (y = w[0], k = w[1]), C = y, P = k, V += y + " " + k + " ", _ > 2)
            for (d = 0; d < _; d += 2)
              f === "m" ? (y += w[d], k += w[d + 1]) : (y = w[d], k = w[d + 1]), V += "L " + y + " " + k + " ";
        } else if (h === "l")
          for (d = 0; d < _; d += 2)
            f === "l" ? (y += w[d], k += w[d + 1]) : (y = w[d], k = w[d + 1]), V += "L " + y + " " + k + " ";
        else if (h === "h")
          for (d = 0; d < _; d++)
            f === "h" ? y += w[d] : y = w[d], V += "L " + y + " " + k + " ";
        else if (h === "v")
          for (d = 0; d < _; d++)
            f === "v" ? k += w[d] : k = w[d], V += "L " + y + " " + k + " ";
        else if (h === "q")
          for (d = 0; d < _; d += 4)
            f === "q" ? (L = y + w[d], D = k + w[d + 1], y += w[d + 2], k += w[d + 3]) : (L = w[d], D = w[d + 1], y = w[d + 2], k = w[d + 3]), V += "Q " + L + " " + D + " " + y + " " + k + " ";
        else if (h === "t")
          for (d = 0; d < _; d += 2)
            ["t", "q"].indexOf(p) > -1 ? (L = y + (y - L), D = k + (k - D)) : (L = y, D = k), f === "t" ? (y += w[d], k += w[d + 1]) : (y = w[d], k = w[d + 1]), V += "Q " + L + " " + D + " " + y + " " + k + " ", p = h;
        else if (h === "c")
          for (d = 0; d < _; d += 6)
            f === "c" ? (L = y + w[d], D = k + w[d + 1], G = y + w[d + 2], Q = k + w[d + 3], y += w[d + 4], k += w[d + 5]) : (L = w[d], D = w[d + 1], G = w[d + 2], Q = w[d + 3], y = w[d + 4], k = w[d + 5]), V += "C " + L + " " + D + " " + G + " " + Q + " " + y + " " + k + " ";
        else if (h === "s")
          for (d = 0; d < _; d += 4)
            L = y, D = k, ["s", "c"].indexOf(p) > -1 && (L += y - G, D += k - Q), f === "s" ? (G = y + w[d], Q = k + w[d + 1], y += w[d + 2], k += w[d + 3]) : (G = w[d], Q = w[d + 1], y = w[d + 2], k = w[d + 3]), V += "C " + L + " " + D + " " + G + " " + Q + " " + y + " " + k + " ";
        else if (h === "a")
          for (d = 0; d < _; d += 7) {
            X = w[d], et = w[d + 1], ot = w[d + 2], U = v[d + 3];
            let N = !1;
            if (U.length > 1) {
              let A = parseInt(U[0]), z = parseInt(U[1]), Y;
              U.length > 2 && (Y = parseFloat(U.substring(2))), w[d + 3] = A, w.splice(d + 4, 0, z), v.splice(d + 4, 0, "+"), Y !== void 0 && w.splice(d + 5, 0, Y), N = !0;
            }
            U = w[d + 3], x = N ? w[d + 4] : v[d + 4], !N && x.length > 1 && (w[d + 4] = parseInt(x[0]), w.splice(d + 5, 0, parseFloat(x.substring(1)))), x = w[d + 4], f === "a" ? (y += w[d + 5], k += w[d + 6]) : (y = w[d + 5], k = w[d + 6]), V += "A " + X + " " + et + " " + ot + " " + U + " " + x + " " + y + " " + k + " ";
          }
        else h === "z" && (V += "Z ", y = C, k = P);
        p = h;
      }
      return V.trim();
    }
    function r(o) {
      var l = o.trim().split(" "), u, c = l.length, a = c - 1, f, h = [], p, w, v, _, d, C = new RegExp("[QAZLCM]", ""), P = l.slice(-1)[0].toUpperCase() === "Z";
      for (f = 0; f < c; f++)
        if (u = l[f], C.test(u)) {
          if (u === "A") {
            h.push(l[f + 5] === "0" ? "1" : "0"), h.push(l[f + 4]), h.push(l[f + 3]), h.push(l[f + 2]), h.push(l[f + 1]), h.push(u), h.push(l[f + 7]), h.push(l[f + 6]), f += 7;
            continue;
          } else if (u === "C")
            _ = 3, d = 2;
          else if (u === "Q")
            _ = 2, d = 1;
          else if (u === "L")
            _ = 1, d = 1;
          else if (u === "M")
            _ = 1, d = 0;
          else
            continue;
          for (_ === d && h.push(u), v = 0; v < _; v++)
            v === d && h.push(u), p = l[++f], w = l[++f], h.push(w), h.push(p);
        } else {
          var y = l.slice(Math.max(f - 3, 0), 3).join(" ");
          throw post = l.slice(f + 1, Math.min(f + 4, a)).join(" "), range = y + " [" + u + "] " + post, "Error while trying to reverse normalized SVG path, at position " + f + " (" + range + `).
Either the path is not normalised, or it's malformed.`;
        }
      h.push("M");
      var k = "", L = h.length - 1, D;
      for (D = L; D > 0; D--)
        k += h[D] + " ";
      return P && (k += "Z"), k = k.replace(/M M/g, "Z M"), k;
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
})(Nu);
var Am = Nu.exports;
const Go = /* @__PURE__ */ Om(Am);
function Fm(t, e, n, r) {
  switch (t.pathType) {
    case Yt.REFLEXIVE:
      return Ru(t.source, [e / 2, n / 2], r);
    case Yt.ARC:
      return Ji(t.source, t.target, r);
    case Yt.ARCREVERSE:
      return Go.reverse(Ji(t.source, t.target, r));
    case Yt.LINE:
      return Yi(t.source, t.target, r);
    case Yt.LINEREVERSE:
      return Go.reverse(Yi(t.source, t.target, r));
    default:
      return "";
  }
}
function jm(t, e, n) {
  return t.id === e.id ? Yt.REFLEXIVE : n.hasBidirectionalConnection(t, e) ? Uo(t, e) ? Yt.ARCREVERSE : Yt.ARC : Uo(t, e) ? Yt.LINEREVERSE : Yt.LINE;
}
function Yi(t, e, n) {
  const r = e.x - t.x, i = e.y - t.y, s = Math.sqrt(r * r + i * i), o = r / s, l = i / s, u = t.x + (n.nodeRadius - 1) * o, c = t.y + (n.nodeRadius - 1) * l, a = e.x - n.markerPadding * o, f = e.y - n.markerPadding * l;
  return `M${u},${c}
          L${a},${f}`;
}
function Ji(t, e, n) {
  const r = new st([[t.x, t.y]]), i = new st([[e.x, e.y]]), s = st.subtract(i, r), o = s.norm("frobenius"), l = s.divide(o), u = Cu(10), c = pn(l, -u).multiply(n.nodeRadius - 1).add(r), a = st.multiply(l, -1), f = pn(a, u).multiply(n.nodeRadius).add(i).add(pn(a, u).multiply(2 * n.markerBoxSize)), h = 1.2 * o;
  return `M${c.get(0, 0)},${c.get(0, 1)}
          A${h},${h},0,0,1,${f.get(0, 0)},${f.get(0, 1)}`;
}
function Ru(t, e, n) {
  const r = new st([[t.x, t.y]]), i = new st([e]);
  r.get(0, 0) === i.get(0, 0) && r.get(0, 1) === i.get(0, 1) && i.add([[0, 1]]);
  const s = st.subtract(r, i), o = s.divide(s.norm("frobenius")), l = Cu(40), u = pn(o, l).multiply(n.nodeRadius - 1).add(r), c = pn(o, -l).multiply(n.nodeRadius).add(r).add(pn(o, -l).multiply(2 * n.markerBoxSize));
  return `M${u.get(0, 0)},${u.get(0, 1)}
          A${n.nodeRadius},${n.nodeRadius},0,1,0,${c.get(0, 0)},${c.get(0, 1)}`;
}
function Ho(t, e) {
  return `M${t[0]},${t[1]}
          L${e[0]},${e[1]}`;
}
function Uo(t, e) {
  return t.x > e.x;
}
function Cu(t) {
  return t * (Math.PI / 180);
}
function pn(t, e) {
  const n = t.get(0, 0), r = t.get(0, 1);
  return new st([
    [
      n * Math.cos(e) - r * Math.sin(e),
      n * Math.sin(e) + r * Math.cos(e)
    ]
  ]);
}
class Bm {
  constructor() {
    wt(this, "persistSettingsLocalStorage", !1);
    wt(this, "hasToolbar", !1);
    wt(this, "_nodeRadius", 24);
    wt(this, "showNodeLabels", !0);
    wt(this, "nodePhysicsEnabled", !1);
    wt(this, "isGraphEditableInGUI", !0);
    wt(this, "zoomEnabled", !1);
    wt(this, "showLinkLabels", !0);
    wt(this, "fixedLinkDistanceEnabled", !1);
    wt(this, "markerBoxSize", 4);
    wt(this, "_markerPadding", this._nodeRadius + 2 * this.markerBoxSize);
  }
  get nodeRadius() {
    return this._nodeRadius;
  }
  set nodeRadius(e) {
    this._nodeRadius = e, this._markerPadding = this._nodeRadius + 2 * this.markerBoxSize;
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
function zm(t) {
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
function Dm(t) {
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
const Vm = {
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
}, Tu = {
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
}, Mt = {
  tablet: "tablet",
  mobile: "mobile",
  desktop: "desktop",
  tv: "tv"
}, Ot = {
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
}, Le = {
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
    return Vm[e];
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
    return Tu[e] || "";
  }
}
const yt = /version\/(\d+(\.?_?\d+)+)/i, qm = [
  /* Googlebot */
  {
    test: [/googlebot/i],
    describe(t) {
      const e = {
        name: "Googlebot"
      }, n = I.getFirstMatch(/googlebot\/(\d+(\.\d+))/i, t) || I.getFirstMatch(yt, t);
      return n && (e.version = n), e;
    }
  },
  /* Opera < 13.0 */
  {
    test: [/opera/i],
    describe(t) {
      const e = {
        name: "Opera"
      }, n = I.getFirstMatch(yt, t) || I.getFirstMatch(/(?:opera)[\s/](\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  /* Opera > 13.0 */
  {
    test: [/opr\/|opios/i],
    describe(t) {
      const e = {
        name: "Opera"
      }, n = I.getFirstMatch(/(?:opr|opios)[\s/](\S+)/i, t) || I.getFirstMatch(yt, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/SamsungBrowser/i],
    describe(t) {
      const e = {
        name: "Samsung Internet for Android"
      }, n = I.getFirstMatch(yt, t) || I.getFirstMatch(/(?:SamsungBrowser)[\s/](\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/Whale/i],
    describe(t) {
      const e = {
        name: "NAVER Whale Browser"
      }, n = I.getFirstMatch(yt, t) || I.getFirstMatch(/(?:whale)[\s/](\d+(?:\.\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/MZBrowser/i],
    describe(t) {
      const e = {
        name: "MZ Browser"
      }, n = I.getFirstMatch(/(?:MZBrowser)[\s/](\d+(?:\.\d+)+)/i, t) || I.getFirstMatch(yt, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/focus/i],
    describe(t) {
      const e = {
        name: "Focus"
      }, n = I.getFirstMatch(/(?:focus)[\s/](\d+(?:\.\d+)+)/i, t) || I.getFirstMatch(yt, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/swing/i],
    describe(t) {
      const e = {
        name: "Swing"
      }, n = I.getFirstMatch(/(?:swing)[\s/](\d+(?:\.\d+)+)/i, t) || I.getFirstMatch(yt, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/coast/i],
    describe(t) {
      const e = {
        name: "Opera Coast"
      }, n = I.getFirstMatch(yt, t) || I.getFirstMatch(/(?:coast)[\s/](\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/opt\/\d+(?:.?_?\d+)+/i],
    describe(t) {
      const e = {
        name: "Opera Touch"
      }, n = I.getFirstMatch(/(?:opt)[\s/](\d+(\.?_?\d+)+)/i, t) || I.getFirstMatch(yt, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/yabrowser/i],
    describe(t) {
      const e = {
        name: "Yandex Browser"
      }, n = I.getFirstMatch(/(?:yabrowser)[\s/](\d+(\.?_?\d+)+)/i, t) || I.getFirstMatch(yt, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/ucbrowser/i],
    describe(t) {
      const e = {
        name: "UC Browser"
      }, n = I.getFirstMatch(yt, t) || I.getFirstMatch(/(?:ucbrowser)[\s/](\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/Maxthon|mxios/i],
    describe(t) {
      const e = {
        name: "Maxthon"
      }, n = I.getFirstMatch(yt, t) || I.getFirstMatch(/(?:Maxthon|mxios)[\s/](\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/epiphany/i],
    describe(t) {
      const e = {
        name: "Epiphany"
      }, n = I.getFirstMatch(yt, t) || I.getFirstMatch(/(?:epiphany)[\s/](\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/puffin/i],
    describe(t) {
      const e = {
        name: "Puffin"
      }, n = I.getFirstMatch(yt, t) || I.getFirstMatch(/(?:puffin)[\s/](\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/sleipnir/i],
    describe(t) {
      const e = {
        name: "Sleipnir"
      }, n = I.getFirstMatch(yt, t) || I.getFirstMatch(/(?:sleipnir)[\s/](\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/k-meleon/i],
    describe(t) {
      const e = {
        name: "K-Meleon"
      }, n = I.getFirstMatch(yt, t) || I.getFirstMatch(/(?:k-meleon)[\s/](\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/micromessenger/i],
    describe(t) {
      const e = {
        name: "WeChat"
      }, n = I.getFirstMatch(/(?:micromessenger)[\s/](\d+(\.?_?\d+)+)/i, t) || I.getFirstMatch(yt, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/qqbrowser/i],
    describe(t) {
      const e = {
        name: /qqbrowserlite/i.test(t) ? "QQ Browser Lite" : "QQ Browser"
      }, n = I.getFirstMatch(/(?:qqbrowserlite|qqbrowser)[/](\d+(\.?_?\d+)+)/i, t) || I.getFirstMatch(yt, t);
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
      }, n = I.getFirstMatch(yt, t) || I.getFirstMatch(/blackberry[\d]+\/(\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/(web|hpw)[o0]s/i],
    describe(t) {
      const e = {
        name: "WebOS Browser"
      }, n = I.getFirstMatch(yt, t) || I.getFirstMatch(/w(?:eb)?[o0]sbrowser\/(\d+(\.?_?\d+)+)/i, t);
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
      }, n = I.getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.?_?\d+)+)/i, t) || I.getFirstMatch(yt, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/qupzilla/i],
    describe(t) {
      const e = {
        name: "QupZilla"
      }, n = I.getFirstMatch(/(?:qupzilla)[\s/](\d+(\.?_?\d+)+)/i, t) || I.getFirstMatch(yt, t);
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
      }, n = I.getFirstMatch(/(?:chromium)[\s/](\d+(\.?_?\d+)+)/i, t) || I.getFirstMatch(yt, t);
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
      }, n = I.getFirstMatch(yt, t);
      return n && (e.version = n), e;
    }
  },
  /* PlayStation 4 */
  {
    test: [/playstation 4/i],
    describe(t) {
      const e = {
        name: "PlayStation 4"
      }, n = I.getFirstMatch(yt, t);
      return n && (e.version = n), e;
    }
  },
  /* Safari */
  {
    test: [/safari|applewebkit/i],
    describe(t) {
      const e = {
        name: "Safari"
      }, n = I.getFirstMatch(yt, t);
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
], Gm = [
  /* Roku */
  {
    test: [/Roku\/DVP/],
    describe(t) {
      const e = I.getFirstMatch(/Roku\/DVP-(\d+\.\d+)/i, t);
      return {
        name: Ot.Roku,
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
        name: Ot.WindowsPhone,
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
        name: Ot.Windows,
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
        name: Ot.iOS
      }, n = I.getSecondMatch(/(Version\/)(\d[\d.]+)/, t);
      return n && (e.version = n), e;
    }
  },
  /* macOS */
  {
    test: [/macintosh/i],
    describe(t) {
      const e = I.getFirstMatch(/mac os x (\d+(\.?_?\d+)+)/i, t).replace(/[_\s]/g, "."), n = I.getMacOSVersionName(e), r = {
        name: Ot.MacOS,
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
        name: Ot.iOS,
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
        name: Ot.Android,
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
        name: Ot.WebOS
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
        name: Ot.BlackBerry,
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
        name: Ot.Bada,
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
        name: Ot.Tizen,
        version: e
      };
    }
  },
  /* Linux */
  {
    test: [/linux/i],
    describe() {
      return {
        name: Ot.Linux
      };
    }
  },
  /* Chrome OS */
  {
    test: [/CrOS/],
    describe() {
      return {
        name: Ot.ChromeOS
      };
    }
  },
  /* Playstation 4 */
  {
    test: [/PlayStation 4/],
    describe(t) {
      const e = I.getFirstMatch(/PlayStation 4[/\s](\d+(\.\d+)*)/i, t);
      return {
        name: Ot.PlayStation4,
        version: e
      };
    }
  }
], Hm = [
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
        type: Mt.mobile,
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
        type: Mt.tablet,
        vendor: "Nexus"
      };
    }
  },
  /* iPad */
  {
    test: [/ipad/i],
    describe() {
      return {
        type: Mt.tablet,
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
        type: Mt.tablet,
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
        type: Mt.tablet,
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
        type: Mt.tablet,
        vendor: "Amazon"
      };
    }
  },
  /* Tablet */
  {
    test: [/tablet(?! pc)/i],
    describe() {
      return {
        type: Mt.tablet
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
        type: Mt.mobile,
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
        type: Mt.mobile,
        vendor: "Nexus"
      };
    }
  },
  /* Mobile */
  {
    test: [/[^-]mobi/i],
    describe() {
      return {
        type: Mt.mobile
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
        type: Mt.mobile,
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
        type: Mt.mobile
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
        type: Mt.mobile,
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
        type: Mt.tablet
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
        type: Mt.mobile
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
        type: Mt.desktop,
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
        type: Mt.desktop
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
        type: Mt.desktop
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
        type: Mt.tv
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
        type: Mt.tv
      };
    }
  }
], Um = [
  /* EdgeHTML */
  {
    test(t) {
      return t.getBrowserName(!0) === "microsoft edge";
    },
    describe(t) {
      if (/\sedg\//i.test(t))
        return {
          name: Le.Blink
        };
      const n = I.getFirstMatch(/edge\/(\d+(\.?_?\d+)+)/i, t);
      return {
        name: Le.EdgeHTML,
        version: n
      };
    }
  },
  /* Trident */
  {
    test: [/trident/i],
    describe(t) {
      const e = {
        name: Le.Trident
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
        name: Le.Presto
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
        name: Le.Gecko
      }, n = I.getFirstMatch(/gecko\/(\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  /* Blink */
  {
    test: [/(apple)?webkit\/537\.36/i],
    describe() {
      return {
        name: Le.Blink
      };
    }
  },
  /* WebKit */
  {
    test: [/(apple)?webkit/i],
    describe(t) {
      const e = {
        name: Le.WebKit
      }, n = I.getFirstMatch(/webkit\/(\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  }
];
class Wo {
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
    const e = I.find(qm, (n) => {
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
    const e = I.find(Gm, (n) => {
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
    const e = I.find(Hm, (n) => {
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
    const e = I.find(Um, (n) => {
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
class Wm {
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
    return new Wo(e, n);
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
    return new Wo(e).getResult();
  }
  static get BROWSER_MAP() {
    return Tu;
  }
  static get ENGINE_MAP() {
    return Le;
  }
  static get OS_MAP() {
    return Ot;
  }
  static get PLATFORMS_MAP() {
    return Mt;
  }
}
const Km = /* @__PURE__ */ Xt("div", { class: "graph-controller__graph-host uninitialised" }, null, -1), Xm = /* @__PURE__ */ ds({
  __name: "GraphComponent",
  setup(t, { expose: e }) {
    const n = Ai(() => {
      const g = document.querySelectorAll("graph-component");
      let E;
      for (let S = 0; S < g.length; S++) {
        const M = g[S], R = xt(M.shadowRoot);
        let j;
        if (R.empty() ? j = xt(
          ".graph-controller__graph-host.uninitialised"
        ) : j = R.select(
          ".graph-controller__graph-host.uninitialised"
        ), !j.empty()) {
          j.classed("uninitialised", !1), E = j;
          break;
        }
      }
      return E === void 0 && (E = xt(
        ".graph-controller__graph-host.uninitialised"
      ), E.classed("uninitialised", !1)), E;
    }), r = Ai(() => {
      let g = n.value.node().parentElement;
      g || (g = n.value.node().getRootNode().host);
      let E = g.getAttribute("id");
      return E || "gc";
    });
    Tl(() => {
      ze();
    }), Pl(() => {
      m(), window.addEventListener("resize", $s);
    }), ps(() => {
      window.removeEventListener("resize", $s);
    });
    const s = Wm.getParser(window.navigator.userAgent).getPlatformType(!0);
    let o = !1;
    const l = Hs(new zo()), u = Hs(!1), c = Kr(new Bm());
    let a, f = 400, h = 400, p, w, v, _, d, C, P, y, k, L = 0, D = 0, G = 1, Q, X;
    e({
      getGraph: et,
      setGraph: ot,
      printGraph: U,
      setNodeColor: x,
      setLinkColor: V,
      deleteNode: N,
      deleteLink: A,
      setLabel: z,
      setNodeRadius: Y,
      setDeletable: J,
      setLabelEditable: it,
      setNodesLinkPermission: lt,
      setNodesFixedPosition: St,
      setNodeEditability: pt,
      setLinkEditability: gt,
      toggleNodeLabels: zt,
      toggleLinkLabels: kt,
      toggleZoom: Zt,
      toggleNodePhysics: mt,
      toggleFixedLinkDistance: bt,
      toggleGraphEditingInGUI: ve,
      resetView: bn
    });
    function et(g = "json", E = !0, S = !0, M = !0) {
      if (g.toLowerCase() === "json")
        return JSON.parse(
          l.value.toJSON(
            c.showLinkLabels,
            c.showLinkLabels,
            E,
            E,
            S,
            M,
            M
          )
        );
      if (g.toLowerCase() === "tgf")
        return l.value.toTGF(c.showNodeLabels, c.showLinkLabels, !0, !0);
      console.error('Invalid format while using getGraph(). Please choose "JSON" or "TGF".');
    }
    function ot(g) {
      typeof g == "object" || typeof g == "string" ? $u(g) : Os();
    }
    function U(g = "json", E = !0, S = !0, M = !0) {
      g.toLowerCase() === "json" ? console.log(
        l.value.toJSON(
          c.showLinkLabels,
          c.showLinkLabels,
          E,
          E,
          S,
          M,
          M
        )
      ) : console.log(l.value.toTGF(c.showNodeLabels, c.showLinkLabels));
    }
    function x(g, E) {
      if (E !== void 0) {
        const M = (Array.isArray(E) ? E : [E]).map(Number);
        for (const R of M)
          d.selectAll("circle").filter((j) => j.id === R).each((j) => j.color = g).style("fill", g);
      } else
        d.selectAll("circle").each((S) => S.color = g).style("fill", g);
    }
    function V(g, E) {
      if (E) {
        const S = Array.isArray(E) ? E : [E];
        Is(S);
        for (const M of S)
          _.selectAll(".graph-controller__link").filter((R) => R.id === M).each((R) => R.color = g).style("stroke", g);
      } else
        Is(l.value.links.map((S) => S.id)), _.selectAll(".graph-controller__link").each((S) => S.color = g).style("stroke", g);
      Xi(v, r.value, c, g);
    }
    function N(g) {
      const E = Array.isArray(g) ? g : [g];
      for (const S of E)
        d.selectAll("circle").filter((M) => M.id === S).each(function(M) {
          let R = l.value.removeNode(M);
          if (R !== void 0) {
            let [j, Rt] = R;
            Ei(j, n.value), Rt.forEach((Ve) => {
              Nn(Ve, n.value);
            });
          }
        });
      u.value = l.value.nodes.length > 0;
    }
    function A(g) {
      const E = Array.isArray(g) ? g : [g];
      for (const S of E)
        _.selectAll("path").filter((M) => M.id === S).each(function(M) {
          let R = l.value.removeLink(M);
          R !== void 0 && Nn(R, n.value);
        });
    }
    function z(g, E) {
      if (E !== void 0) {
        const [S, M] = Rn(E);
        for (const R of S)
          d.filter((j) => j.id === R).each((j) => {
            vn(j, g);
          });
        for (const R of M)
          _.filter((j) => j.id === R).each((j) => {
            vn(j, g);
          });
      } else
        d.each((S) => {
          vn(S, g);
        }), _.each((S) => {
          vn(S, g);
        });
    }
    function Y(g) {
      g > 0 ? (c.nodeRadius = g, bn()) : An("Invalid Radius", "The radius should be greater than zero.");
    }
    function J(g, E) {
      if (E !== void 0) {
        const [S, M] = Rn(E);
        for (const R of S)
          d.filter((j) => j.id === R).each((j) => {
            j.deletable = g;
          });
        for (const R of M)
          _.filter((j) => j.id === R).each((j) => {
            j.deletable = g;
          });
      } else
        d.each((S) => {
          S.deletable = g;
        }), _.each((S) => {
          S.deletable = g;
        });
    }
    function it(g, E) {
      if (E !== void 0) {
        const [S, M] = Rn(E);
        for (const R of S)
          d.filter((j) => j.id === R).each((j) => {
            j.labelEditable = g;
          });
        for (const R of M)
          _.filter((j) => j.id === R).each((j) => {
            j.labelEditable = g;
          });
      } else
        d.each((S) => {
          S.labelEditable = g;
        }), _.each((S) => {
          S.labelEditable = g;
        });
    }
    function lt(g, E, S) {
      if (S !== void 0) {
        const [M, R] = Rn(S);
        for (const j of M)
          d.filter((Rt) => Rt.id === j).each((Rt) => {
            Rt.allowIncomingLinks = g, Rt.allowOutgoingLinks = E;
          });
      } else
        d.each((M) => {
          M.allowIncomingLinks = g, M.allowOutgoingLinks = E;
        });
    }
    function St(g, E) {
      if (E !== void 0) {
        const [S, M] = Rn(E);
        for (const R of S)
          d.filter((j) => j.id === R).each((j) => {
            pr(j, g);
          });
      } else
        d.each((S) => {
          pr(S, g);
        });
    }
    function pt(g, E) {
      if (E !== void 0) {
        const M = (Array.isArray(E) ? E : [E]).map(Number);
        for (const R of M)
          d.selectAll("circle").filter((j) => j.id === R).each(function(j) {
            pr(j, g.fixedPosition), j.deletable = g.deletable ?? j.deletable, j.labelEditable = g.labelEditable ?? j.labelEditable, j.allowIncomingLinks = g.allowIncomingLinks ?? j.allowIncomingLinks, j.allowOutgoingLinks = g.allowOutgoingLinks ?? j.allowOutgoingLinks;
          });
      } else
        d.selectAll("circle").each(function(S) {
          pr(S, g.fixedPosition), S.deletable = g.deletable ?? S.deletable, S.labelEditable = g.labelEditable ?? S.labelEditable, S.allowIncomingLinks = g.allowIncomingLinks ?? S.allowIncomingLinks, S.allowOutgoingLinks = g.allowOutgoingLinks ?? S.allowOutgoingLinks;
        });
      Ki(
        ["fixedPosition", "deletable", "labelEditable", "allowIncomingLinks", "allowOutgoingLinks"],
        Object.keys(g)
      );
    }
    function gt(g, E) {
      if (E) {
        const S = Array.isArray(E) ? E : [E];
        for (const M of S)
          _.selectAll(".graph-controller__link").filter((R) => R.id === M).each(function(R) {
            R.deletable = g.deletable ?? R.deletable, R.labelEditable = g.labelEditable ?? R.labelEditable;
          });
      } else
        _.selectAll(".graph-controller__link").each(function(S) {
          S.deletable = g.deletable ?? S.deletable, S.labelEditable = g.labelEditable ?? S.labelEditable;
        });
      Ki(["deletable", "labelEditable"], Object.keys(g));
    }
    function mt(g) {
      c.nodePhysicsEnabled = g, Eu(a, g, f, h);
    }
    function bt(g) {
      c.fixedLinkDistanceEnabled = g, Su(a, l.value, c, g);
    }
    function kt(g) {
      c.showLinkLabels = g;
    }
    function zt(g) {
      c.showNodeLabels = g;
    }
    function Zt(g) {
      c.zoomEnabled = g, bn();
    }
    function ve(g) {
      c.isGraphEditableInGUI = g;
    }
    function ze() {
      const g = (E) => E === "false" ? !1 : !!E;
      localStorage.showNodeLabels && (c.showNodeLabels = g(localStorage.showNodeLabels)), localStorage.enableNodePhysics && (c.nodePhysicsEnabled = g(localStorage.enableNodePhysics)), localStorage.showLinkLabels && (c.showLinkLabels = g(localStorage.showLinkLabels)), localStorage.enableFixedLinkDistance && (c.fixedLinkDistanceEnabled = g(localStorage.enableFixedLinkDistance)), localStorage.enableZoom && (c.zoomEnabled = g(localStorage.enableZoom)), localStorage.persistSettings && (c.persistSettingsLocalStorage = g(localStorage.persistSettings));
    }
    function m() {
      f = n.value.node().clientWidth, h = n.value.node().clientHeight, p = qg(
        (g) => b(g, c.zoomEnabled),
        c.zoomEnabled
      ), v = Jg(
        n.value,
        p,
        (g) => c.isGraphEditableInGUI ? Nt(g) : null,
        (g) => c.isGraphEditableInGUI ? ct(g) : null,
        (g) => {
          c.isGraphEditableInGUI && $(
            ee(g, v.node())[0],
            ee(g, v.node())[1]
          );
        }
      ), nm(v, r.value, c, l.value.getNonDefaultLinkColors()), C = rm(v), _ = Zg(v), d = tm(v), a = im(l.value, c, f, h, () => O()), w = Yg(a, f, h, c.nodeRadius), B();
    }
    function b(g, E = !0) {
      E && (L = g.transform.x, D = g.transform.y, G = g.transform.k, v.attr("transform", `translate(${L},${D})scale(${G})`));
    }
    function T(g, E, S, M, R = !0, j = !0) {
      let Rt = l.value.createLink(
        g.id,
        E.id,
        S,
        M,
        R,
        j
      );
      Rt !== void 0 && Ug(Rt, n.value), B();
    }
    function $(g, E, S, M, R, j = { x: !1, y: !1 }, Rt = !0, Ve = !0, xn = !0, li = !0) {
      let Au = l.value.createNode(
        g ?? f / 2,
        E ?? h / 2,
        S,
        M,
        R,
        j,
        Rt,
        Ve,
        xn,
        li
      );
      Hg(Au, n.value), u.value = !0, B();
    }
    function O() {
      d.attr("transform", (g) => `translate(${g.x},${g.y})`), _.selectAll("path").attr("d", (g) => (q(g), Fm(g, f, h, c))), F();
    }
    function q(g) {
      let E = g.pathType;
      g.pathType = jm(g.source, g.target, l.value), E !== g.pathType && B();
    }
    function W() {
      const g = P;
      if (g !== void 0) {
        const E = y;
        if (E !== void 0)
          C.attr("d", () => g.id === E.id ? Ru(g, [f / 2, h / 2], c) : l.value.hasBidirectionalConnection(g, E) ? Yi(g, E, c) : Ji(g, E, c));
        else if (k !== void 0) {
          const S = [g.x, g.y];
          C.attr("d", Ho(S, k));
        }
      }
    }
    function B(g = 0.5) {
      var E;
      _ = _.data(l.value.links, (S) => S.id).join(
        (S) => {
          const M = S.append("g").classed("graph-controller__link-container", !0);
          return M.append("path").classed("graph-controller__link", !0).style("stroke", (R) => R.color ? R.color : "").attr("id", (R) => r.value + "-link-" + R.id), M.append("path").classed("graph-controller__click-box", !0).on("dblclick", (R) => {
            Kt(R);
          }).on("pointerout", (R) => Zn(R)).on("pointerdown", (R, j) => {
            Kg(j, R.button, n.value), c.isGraphEditableInGUI && tr(R, j);
          }).on("pointerup", (R, j) => {
            De(R, j);
          }), M.append("text").attr("class", (R) => {
            var j;
            return `graph-controller__${(j = R.pathType) == null ? void 0 : j.toLowerCase()}-path-text`;
          }).append("textPath").attr(
            "class",
            (R) => R.label ? "graph-controller__link-label" : "graph-controller__link-label-placeholder"
          ).attr("href", (R) => `#${r.value + "-link-" + R.id}`).text((R) => R.label ? R.label : "add label").on("click", (R, j) => {
            c.isGraphEditableInGUI && Ts(R, j);
          }).on("dblclick", (R) => {
            Kt(R);
          }), M.append("foreignObject").classed("graph-controller__link-label-mathjax-container", !0).attr("xmlns", "http://www.w3.org/2000/svg").attr("width", 1).attr("height", 1).html(
            (R) => `<div class=${R.label ? "graph-controller__link-label" : "graph-controller__link-label-placeholder"}>
                        </div>`
          ).on("click", (R, j) => {
            c.isGraphEditableInGUI && Ts(R, j);
          }).on("dblclick", (R) => {
            Kt(R);
          }), M;
        }
      ), _.selectChild("path").attr("marker-start", function(S) {
        var M;
        if ((M = S.pathType) != null && M.includes("REVERSE")) {
          let R = `url(#${r.value}-link-arrow-reverse`;
          return S.color && (R += "-" + Kn(S.color)), R += ")", R;
        } else
          return null;
      }).attr("marker-end", function(S) {
        var M;
        if ((M = S.pathType) != null && M.includes("REVERSE"))
          return null;
        {
          let R = `url(#${r.value}-link-arrow`;
          return S.color && (R += "-" + Kn(S.color)), R += ")", R;
        }
      }), _.selectChild("text").attr("class", (S) => {
        var M;
        return `graph-controller__${(M = S.pathType) == null ? void 0 : M.toLowerCase()}-path-text`;
      }).attr("dy", (S) => {
        var M;
        return S.pathType === Yt.REFLEXIVE ? 15 : S.pathType == Yt.LINEREVERSE ? -10 : (M = S.pathType) != null && M.includes("REVERSE") ? 20 : -10;
      }).selectChild("textPath").attr(
        "class",
        (S) => S.label ? "graph-controller__link-label" : "graph-controller__link-label-placeholder"
      ).classed("hidden", (S) => !c.showLinkLabels || !S.label && !S.labelEditable).classed("not-editable", !c.isGraphEditableInGUI).attr("startOffset", (S) => {
        var M;
        return (M = S.pathType) != null && M.includes("REVERSE") ? "46%" : "50%";
      }).text((S) => S.label ? S.label : "add label"), d = d.data(l.value.nodes, (S) => S.id).join(
        (S) => {
          const M = S.append("g").classed("graph-controller__node-container", !0).call(w).on("dblclick", (R) => {
            Kt(R);
          }).on("pointerenter", (R, j) => Dt(j)).on("pointerout", (R, j) => be(j)).on("pointerdown", (R, j) => {
            Wg(j, R.button, n.value), c.isGraphEditableInGUI && K(R, j);
          }).on("pointerup", (R, j) => {
            c.isGraphEditableInGUI && ct(R, j);
          });
          return M.append("circle").classed("graph-controller__node", !0).attr("id", (R) => `${r.value + "-node-" + R.id}`).attr("r", c.nodeRadius).style("fill", (R) => R.color ? R.color : ""), M.append("foreignObject").classed("graph-controller__node-label-container", !0).attr("xmlns", "http://www.w3.org/2000/svg").attr("width", 2 * c.nodeRadius).attr("height", 2 * c.nodeRadius).attr("x", -c.nodeRadius).attr("y", -c.nodeRadius).append("xhtml:div").on("click", (R, j) => {
            c.isGraphEditableInGUI && Pu(R, j);
          }).on("dblclick", (R) => {
            Kt(R);
          }).on("pointerenter", (R, j) => Dt(j)).on("pointerout", (R, j) => be(j)), M;
        },
        (S) => (S.selectChild("circle").attr("r", c.nodeRadius), S.selectChild("foreignObject").selectChild("div").classed(
          "hidden",
          (M) => !c.showNodeLabels || !M.label && !M.labelEditable
        ).classed("not-editable", !c.isGraphEditableInGUI), S)
      ), d.selectChild("foreignObject").selectChild("div").attr(
        "class",
        (S) => S.label ? "graph-controller__node-label" : "graph-controller__node-label-placeholder"
      ).text((S) => S.label ? S.label : "add label"), (E = window.MathJax) != null && E.version && window.MathJax.typesetPromise().then(() => {
        H();
      }), a.nodes(l.value.nodes), a.alpha(g).restart();
    }
    function H() {
      _.selectChild("text").selectChild("textPath").selectChild("mjx-container").each(function(g) {
        const E = this, S = g, M = xt(E.parentNode.parentNode.parentNode).selectChild("foreignObject").selectChild("div").attr("class", "graph-controller__link-label").classed(
          "hidden",
          !c.showLinkLabels || !S.label && !S.labelEditable
        ).node();
        M.replaceChild(E, M.childNodes[0]);
      }), _.selectChild("text").selectChild("textPath").each(function() {
        const g = this;
        let E = !1;
        g.childNodes.forEach((M) => {
          var R;
          (M == null ? void 0 : M.nodeType) === Node.TEXT_NODE && ((R = M == null ? void 0 : M.textContent) == null ? void 0 : R.trim()) !== "" && (E = !0);
        }), E || xt(g).text("I").attr("class", "graph-controller__link-label-placeholder mjx-hidden");
      }), F();
    }
    function F() {
      _.selectChild("text").selectChild("textPath").each(function() {
        const g = this, [E, S] = Ls(g);
        xt(g.parentNode.parentNode).select("foreignObject").attr("x", E).attr("y", S);
      });
    }
    function K(g, E) {
      (g.button === 2 || g.pointerType === "touch") && (Bo(g), E.allowOutgoingLinks && nt(E), E.deletable && (Q = setTimeout(() => {
        y = void 0, tt(E);
      }, 250)));
    }
    function tt(g) {
      let E = n.value.node().querySelector(`#${r.value + "-node-" + g.id}`);
      xt(E).classed("on-deletion", !0);
      let S = xt(E.parentElement);
      S.select("g.arc").remove();
      let M = Tg().outerRadius(c.nodeRadius + 4).innerRadius(c.nodeRadius), R = [{ startAngle: 0, endAngle: 0 }];
      S.append("g").attr("class", "arc").selectAll("path.arc").data(R).enter().append("path").attr("class", "arc").style("fill", "black").style("opacity", 0.7).transition().duration(750).ease(Op).attrTween("d", function(Rt) {
        let Ve = { startAngle: 0, endAngle: 2 * Math.PI }, xn = xs(Rt, Ve);
        return function(li) {
          return M(xn(li));
        };
      }).on("end", () => Z(g));
    }
    function Z(g) {
      if (c.isGraphEditableInGUI) {
        let E = l.value.removeNode(g);
        if (E !== void 0) {
          let [S, M] = E;
          Ei(S, n.value), M.forEach((R) => {
            Nn(R, n.value);
          });
        }
        u.value = l.value.nodes.length > 0, oi(), B();
      }
    }
    function nt(g) {
      const E = [g.x, g.y];
      k = E, P = g, C.attr("marker-end", `url(#${r.value}-draggable-link-arrow)`).classed("hidden", !1).attr("d", Ho(E, E)), B();
    }
    function ct(g, E = void 0) {
      Kt(g), clearTimeout(Q), E && ht(E), _t();
    }
    function ht(g) {
      let E = n.value.node().querySelector(`#${r.value + "-node-" + g.id}`).parentElement, S = xt(E);
      S.select("circle").classed("on-deletion", !1), S.select("g.arc").select("path.arc").interrupt().remove();
    }
    function _t() {
      const g = P, E = y;
      oi(), !(g === void 0 || E === void 0) && T(g, E);
    }
    function Nt(g) {
      if (Kt(g), P !== void 0) {
        const E = Hh(g, n.value.node())[0];
        k = [(E[0] - L) / G, (E[1] - D) / G], W();
      }
    }
    function Dt(g) {
      g.allowIncomingLinks && (y = g);
    }
    function be(g) {
      g && ht(g), y = void 0, clearTimeout(Q);
    }
    function Zn(g) {
      Kt(g), clearTimeout(X);
    }
    function De(g, E) {
      Kt(g), clearTimeout(X), (g.button === 2 || g.pointerType === "touch") && E.deletable && er(E);
    }
    function tr(g, E) {
      (g.button === 2 || g.pointerType === "touch") && (Bo(g), E.deletable && (X = setTimeout(() => {
        It(E);
      }, 250)));
    }
    function It(g) {
      let E = n.value.node().querySelector(`#${r.value + "-link-" + g.id}`);
      if (xt(E).classed("on-deletion", !0), E instanceof SVGPathElement) {
        let S = xt(E), M = E.getTotalLength(), R = E.parentElement.querySelector("text"), j = Array.from(R.classList).some(
          (xn) => xn.includes("reverse")
        ), Rt = 0, Ve = j ? M : -M;
        S.attr("stroke-dasharray", M).attr("stroke-dashoffset", Rt).transition().duration(750).attr("stroke-dashoffset", Ve).on("end", () => te(g));
      }
    }
    function te(g) {
      let E = g.color;
      if (c.isGraphEditableInGUI) {
        let S = l.value.removeLink(g);
        S !== void 0 && Nn(S, n.value), E && (l.value.hasNonDefaultLinkColor(E) || Si(v, r.value, E));
      }
      B();
    }
    function er(g) {
      let E = n.value.node().querySelector(`#${r.value + "-link-" + g.id}`);
      if (xt(E).classed("on-deletion") && E instanceof SVGPathElement) {
        let S = xt(E), M = E.getTotalLength();
        S.attr("stroke-dasharray", M).attr("stroke-dashoffset", M).transition().attr("stroke-dashoffset", 0).on("end", () => {
          S.attr("stroke-dasharray", null).attr("stroke-dashoffset", null);
        });
      }
      xt(E).classed("on-deletion", !1);
    }
    function Pu(g, E) {
      Kt(g), E.labelEditable && Ps(E, [E.x, E.y]);
    }
    function Ts(g, E) {
      if (E.labelEditable) {
        let S = g.target, M;
        S.nodeName === "textPath" ? M = S : M = S.closest(".graph-controller__link-container").querySelector("textPath");
        let R = Ls(M);
        Ps(E, R);
      }
    }
    function Ps(g, E) {
      let S = g instanceof Wi ? "node" : "link";
      const M = document.createElement("input");
      M.setAttribute("class", "graph-controller__label-input"), M.setAttribute("id", `${S}-label-input-field`), g.label == null ? M.value = "" : M.value = g.label, M.placeholder = `Enter ${S} label`;
      const R = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
      R.setAttribute("width", "100%"), R.setAttribute("height", "100%"), R.setAttribute("x", `${E[0] - 90}`), R.setAttribute("y", `${E[1] - 12}`), R.append(M), n.value.select("svg").select("g").node().append(R), M.focus(), s !== "desktop" && (o = !0), M.ondblclick = function(Rt) {
        Kt(Rt);
      };
      let j = !1;
      M.onkeyup = function(Rt) {
        Rt.key === "Enter" ? (j = !0, M.blur()) : Rt.key === "Escape" && (M.value = "", M.blur());
      }, M.onblur = function() {
        j && vn(g, M.value.trim()), R.remove(), s !== "desktop" && (o = !1);
      };
    }
    function vn(g, E) {
      Xg(g, E, n.value), g.label = E, B();
      let S = g instanceof Wi ? "node" : "link";
      S === "link" ? Lu(g) : S === "node" && E !== "" && Iu(g);
    }
    function Lu(g) {
      var S;
      const E = n.value.node().querySelector(
        `#${r.value + "-link-" + g.id}`
      ).parentElement;
      (S = E.querySelector("mjx-container")) == null || S.remove(), E.querySelector("div").setAttribute("class", "graph-controller__link-label-placeholder"), B();
    }
    function Iu(g) {
      const E = n.value.node().querySelector(`#${r.value + "-node-" + g.id}`).parentElement;
      if (E) {
        const S = E.parentElement;
        E.remove(), S.append(E);
      }
    }
    function Ls(g) {
      let E = n.value.select("svg").node().getBoundingClientRect(), S = g.getBoundingClientRect(), M = (S.x - E.x - L) / G, R = (S.y - E.y - D) / G;
      return [M, R];
    }
    function oi() {
      C == null || C.classed("hidden", !0).attr("marker-end", "null"), P = void 0, y = void 0, k = void 0;
    }
    function $u(g) {
      let E, S;
      try {
        if (typeof g == "string")
          [E, S] = zm(g);
        else if (typeof g == "object")
          [E, S] = Dm(g);
        else {
          An("Invalid graph import type:", "Must either be TGF or JSON.");
          return;
        }
      } catch (M) {
        An("Error during parsing:", `Invalid data format:
` + M);
        return;
      }
      Os(), Ou(E, S);
    }
    function Ou(g, E) {
      for (let M of g)
        $(
          M.x,
          M.y,
          M.idImported,
          M.label,
          M.color,
          M.fixedPosition,
          M.deletable,
          M.labelEditable,
          M.allowIncomingLinks,
          M.allowOutgoingLinks
        );
      const S = (M) => l.value.nodes.find((R) => R.idImported === M);
      for (let M of E) {
        let R = S(M.sourceIdImported), j = S(M.targetIdImported);
        R && j && (T(
          R,
          j,
          M.label,
          M.color,
          M.deletable,
          M.labelEditable
        ), M.color && Xi(v, r.value, c, M.color));
      }
    }
    function Is(g) {
      for (let E of g) {
        const S = l.value.links.filter((M) => M.id === E).map((M) => M.color).shift();
        S && (l.value.hasNonDefaultLinkColor(S, E) ? l.value.getLinkIdsWithNonDefaultLinkColors(
          S,
          E
        ).every(
          (j) => g.includes(j)
        ) && Si(v, r.value, S) : Si(v, r.value, S));
      }
    }
    function bn() {
      a.stop(), n.value.selectChildren().remove(), p = void 0, L = 0, D = 0, G = 1, v = void 0, C = void 0, _ = void 0, d = void 0, a = void 0, oi(), ze(), m();
    }
    function $s() {
      o || bn();
    }
    function Os() {
      l.value.links.forEach((g) => Nn(g, n.value)), l.value.nodes.forEach((g) => Ei(g, n.value)), l.value = new zo(), u.value = !1, bn();
    }
    return (g, E) => (Te(), Pe(ne, null, [
      Km,
      yr(Xt("div", null, [
        we(cf, {
          class: "graph-controller__info-text-background",
          "show-controls-graph": "",
          "show-latex-info": !0,
          "show-controls-environment": !1,
          "show-header": !0,
          "platform-type": Tr(s)
        }, null, 8, ["platform-type"])
      ], 512), [
        [xr, !u.value]
      ])
    ], 64));
  }
});
/*! (c) Andrea Giammarchi - ISC */
const Ym = (() => {
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
      const { prototype: c } = l, { connectedCallback: a } = c, f = u + "Callback", h = (w, v, _, d) => {
        v.disconnect(), _.removeEventListener(t, d), p(w);
      }, p = (w) => {
        n.length || requestAnimationFrame(i), n.push([w, f]);
      };
      return Object.defineProperties(
        c,
        {
          connectedCallback: {
            configurable: !0,
            writable: !0,
            value() {
              if (a && a.apply(this, arguments), f in this && !e.has(this)) {
                const w = this, { ownerDocument: v } = w;
                if (e.set(w, !1), v.readyState === "complete" || r(w))
                  p(w);
                else {
                  const _ = () => h(w, d, v, _);
                  v.addEventListener(t, _);
                  const d = new MutationObserver(() => {
                    r(w) && h(w, d, v, _);
                  });
                  d.observe(w.parentNode, { childList: !0, subtree: !0 });
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
function Jm(t, e, n) {
  const r = /* @__PURE__ */ ds(t);
  class i extends Cs {
    constructor(o) {
      super(r, o, e, n);
    }
  }
  return wt(i, "def", r), i;
}
const Qm = typeof HTMLElement < "u" ? Ym : class {
};
class Cs extends Qm {
  constructor(n, r = {}, i = {}, s) {
    super();
    /**
     * @internal
     */
    wt(this, "_instance", null);
    wt(this, "_connected", !1);
    wt(this, "_resolved", !1);
    wt(this, "_numberProps", null);
    wt(this, "_styles");
    wt(this, "_slots");
    wt(this, "_ob", null);
    this._def = n, this._props = r, this._config = i, this._config = Ct(
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
    this._connected = !1, this._ob && (this._ob.disconnect(), this._ob = null), vl(() => {
      this._connected || (mo(null, this._root), this._instance = null);
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
      if (o && !rt(o))
        for (const c in o) {
          const a = o[c];
          (a === Number || a && a.type === Number) && (c in this._props && (this._props[c] = As(this._props[c])), (u || (u = /* @__PURE__ */ Object.create(null)))[Se(c)] = !0);
        }
      this._numberProps = u, s && this._resolveProps(i), this._config.shadowRoot || (this._slots = Array.from(this.children).map((c) => c.cloneNode(!0)), this.replaceChildren()), this._applyStyles(l), this._update();
    }, r = this._def.__asyncLoader;
    r ? r().then((i) => n(i, !0)) : n(this._def);
  }
  _resolveProps(n) {
    const { props: r } = n, i = rt(r) ? r : Object.keys(r || {});
    for (const s of Object.keys(this))
      s[0] !== "_" && i.includes(s) && this._setProp(s, this[s], !0, !1);
    for (const s of i.map(Se))
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
    const i = Se(n);
    this._numberProps && this._numberProps[i] && (r = As(r)), this._setProp(i, r, !1);
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
    r !== this._props[n] && (this._props[n] = r, s && this._instance && this._update(), i && (r === !0 ? this.setAttribute(le(n), "") : typeof r == "string" || typeof r == "number" ? this.setAttribute(le(n), r + "") : r || this.removeAttribute(le(n))));
  }
  _update() {
    mo(this._createVNode(), this._root);
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
        return o.innerHTML = s.innerHTML, we(s.tagName, o, null);
      });
    });
    const r = we(this._def, Ct({}, this._props), n);
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
        s(l, u), le(l) !== l && s(le(l), u);
      };
      let o = this;
      for (; o = o && (o.parentNode || o.host); )
        if (o instanceof Cs) {
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
  /* @__PURE__ */ Jm(Xm, { shadowRoot: !1 })
  // With ShadowRoot without LaTeX
  // defineCustomElement(GraphEditor)
  /* for switching off the LaTeX control info background, in the graph editor template
  in the graph controls tag you can use :show-latex-info="true" */
);
