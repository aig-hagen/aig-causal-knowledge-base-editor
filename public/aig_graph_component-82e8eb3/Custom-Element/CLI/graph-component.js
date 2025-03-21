var Fu = Object.defineProperty;
var Au = (t, e, n) => e in t ? Fu(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var wt = (t, e, n) => Au(t, typeof e != "symbol" ? e + "" : e, n);
/**
* @vue/shared v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function Qi(t, e) {
  const n = new Set(t.split(","));
  return (r) => n.has(r);
}
const vt = {}, cn = [], re = () => {
}, ju = () => !1, Gr = (t) => t.charCodeAt(0) === 111 && t.charCodeAt(1) === 110 && // uppercase letter
(t.charCodeAt(2) > 122 || t.charCodeAt(2) < 97), Zi = (t) => t.startsWith("onUpdate:"), Ct = Object.assign, ts = (t, e) => {
  const n = t.indexOf(e);
  n > -1 && t.splice(n, 1);
}, Bu = Object.prototype.hasOwnProperty, ft = (t, e) => Bu.call(t, e), rt = Array.isArray, an = (t) => Hr(t) === "[object Map]", Ko = (t) => Hr(t) === "[object Set]", ut = (t) => typeof t == "function", Tt = (t) => typeof t == "string", vn = (t) => typeof t == "symbol", Et = (t) => t !== null && typeof t == "object", Xo = (t) => (Et(t) || ut(t)) && ut(t.then) && ut(t.catch), Yo = Object.prototype.toString, Hr = (t) => Yo.call(t), zu = (t) => Hr(t).slice(8, -1), Jo = (t) => Hr(t) === "[object Object]", es = (t) => Tt(t) && t !== "NaN" && t[0] !== "-" && "" + parseInt(t, 10) === t, Ln = /* @__PURE__ */ Qi(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Ur = (t) => {
  const e = /* @__PURE__ */ Object.create(null);
  return (n) => e[n] || (e[n] = t(n));
}, Du = /-(\w)/g, Ee = Ur((t) => t.replace(Du, (e, n) => n ? n.toUpperCase() : "")), Vu = /\B([A-Z])/g, le = Ur(
  (t) => t.replace(Vu, "-$1").toLowerCase()
), Qo = Ur((t) => t.charAt(0).toUpperCase() + t.slice(1)), ui = Ur((t) => t ? `on${Qo(t)}` : ""), Be = (t, e) => !Object.is(t, e), ci = (t, e) => {
  for (let n = 0; n < t.length; n++)
    t[n](e);
}, Rr = (t, e, n) => {
  Object.defineProperty(t, e, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
}, qu = (t) => {
  const e = parseFloat(t);
  return isNaN(e) ? t : e;
}, Fs = (t) => {
  const e = Tt(t) ? Number(t) : NaN;
  return isNaN(e) ? t : e;
};
let As;
const Zo = () => As || (As = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function ns(t) {
  if (rt(t)) {
    const e = {};
    for (let n = 0; n < t.length; n++) {
      const r = t[n], i = Tt(r) ? Wu(r) : ns(r);
      if (i)
        for (const s in i)
          e[s] = i[s];
    }
    return e;
  } else if (Tt(t) || Et(t))
    return t;
}
const Gu = /;(?![^(]*\))/g, Hu = /:([^]+)/, Uu = /\/\*[^]*?\*\//g;
function Wu(t) {
  const e = {};
  return t.replace(Uu, "").split(Gu).forEach((n) => {
    if (n) {
      const r = n.split(Hu);
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
const Ku = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Xu = /* @__PURE__ */ Qi(Ku);
function tl(t) {
  return !!t || t === "";
}
const Re = (t) => Tt(t) ? t : t == null ? "" : rt(t) || Et(t) && (t.toString === Yo || !ut(t.toString)) ? JSON.stringify(t, el, 2) : String(t), el = (t, e) => e && e.__v_isRef ? el(t, e.value) : an(e) ? {
  [`Map(${e.size})`]: [...e.entries()].reduce(
    (n, [r, i], s) => (n[ai(r, s) + " =>"] = i, n),
    {}
  )
} : Ko(e) ? {
  [`Set(${e.size})`]: [...e.values()].map((n) => ai(n))
} : vn(e) ? ai(e) : Et(e) && !rt(e) && !Jo(e) ? String(e) : e, ai = (t, e = "") => {
  var n;
  return vn(t) ? `Symbol(${(n = t.description) != null ? n : e})` : t;
};
/**
* @vue/reactivity v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let ie;
class Yu {
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
function Ju(t, e = ie) {
  e && e.active && e.effects.push(t);
}
function Qu() {
  return ie;
}
let Ye;
class is {
  constructor(e, n, r, i) {
    this.fn = e, this.trigger = n, this.scheduler = r, this.active = !0, this.deps = [], this._dirtyLevel = 4, this._trackId = 0, this._runnings = 0, this._shouldSchedule = !1, this._depsLength = 0, Ju(this, i);
  }
  get dirty() {
    if (this._dirtyLevel === 2 || this._dirtyLevel === 3) {
      this._dirtyLevel = 1, en();
      for (let e = 0; e < this._depsLength; e++) {
        const n = this.deps[e];
        if (n.computed && (Zu(n.computed), this._dirtyLevel >= 4))
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
    let e = Ae, n = Ye;
    try {
      return Ae = !0, Ye = this, this._runnings++, js(this), this.fn();
    } finally {
      Bs(this), this._runnings--, Ye = n, Ae = e;
    }
  }
  stop() {
    var e;
    this.active && (js(this), Bs(this), (e = this.onStop) == null || e.call(this), this.active = !1);
  }
}
function Zu(t) {
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
let Ae = !0, ki = 0;
const rl = [];
function en() {
  rl.push(Ae), Ae = !1;
}
function nn() {
  const t = rl.pop();
  Ae = t === void 0 ? !0 : t;
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
  if (Ae && Ye) {
    let r = Ni.get(t);
    r || Ni.set(t, r = /* @__PURE__ */ new Map());
    let i = r.get(n);
    i || r.set(n, i = ol(() => r.delete(n))), il(
      Ye,
      i
    );
  }
}
function Se(t, e, n, r, i, s) {
  const o = Ni.get(t);
  if (!o)
    return;
  let l = [];
  if (e === "clear")
    l = [...o.values()];
  else if (n === "length" && rt(t)) {
    const u = Number(r);
    o.forEach((c, a) => {
      (a === "length" || !vn(a) && a >= u) && l.push(c);
    });
  } else
    switch (n !== void 0 && l.push(o.get(n)), e) {
      case "add":
        rt(t) ? es(n) && l.push(o.get("length")) : (l.push(o.get(Je)), an(t) && l.push(o.get(Ri)));
        break;
      case "delete":
        rt(t) || (l.push(o.get(Je)), an(t) && l.push(o.get(Ri)));
        break;
      case "set":
        an(t) && l.push(o.get(Je));
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
const tc = /* @__PURE__ */ Qi("__proto__,__v_isRef,__isVue"), ll = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((t) => t !== "arguments" && t !== "caller").map((t) => Symbol[t]).filter(vn)
), zs = /* @__PURE__ */ ec();
function ec() {
  const t = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((e) => {
    t[e] = function(...n) {
      const r = ht(this);
      for (let s = 0, o = this.length; s < o; s++)
        Ut(r, "get", s + "");
      const i = r[e](...n);
      return i === -1 || i === !1 ? r[e](...n.map(ht)) : i;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((e) => {
    t[e] = function(...n) {
      en(), ss();
      const r = ht(this)[e].apply(this, n);
      return os(), nn(), r;
    };
  }), t;
}
function nc(t) {
  const e = ht(this);
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
      return r === (i ? s ? gc : hl : s ? fl : al).get(e) || // receiver is not the reactive proxy, but has the same prototype
      // this means the reciever is a user proxy of the reactive proxy
      Object.getPrototypeOf(e) === Object.getPrototypeOf(r) ? e : void 0;
    const o = rt(e);
    if (!i) {
      if (o && ft(zs, n))
        return Reflect.get(zs, n, r);
      if (n === "hasOwnProperty")
        return nc;
    }
    const l = Reflect.get(e, n, r);
    return (vn(n) ? ll.has(n) : tc(n)) || (i || Ut(e, "get", n), s) ? l : Wt(l) ? o && es(n) ? l : l.value : Et(l) ? i ? dl(l) : Kr(l) : l;
  }
}
class cl extends ul {
  constructor(e = !1) {
    super(!1, e);
  }
  set(e, n, r, i) {
    let s = e[n];
    if (!this._isShallow) {
      const u = mn(s);
      if (!Cr(r) && !mn(r) && (s = ht(s), r = ht(r)), !rt(e) && Wt(s) && !Wt(r))
        return u ? !1 : (s.value = r, !0);
    }
    const o = rt(e) && es(n) ? Number(n) < e.length : ft(e, n), l = Reflect.set(e, n, r, i);
    return e === ht(i) && (o ? Be(r, s) && Se(e, "set", n, r) : Se(e, "add", n, r)), l;
  }
  deleteProperty(e, n) {
    const r = ft(e, n);
    e[n];
    const i = Reflect.deleteProperty(e, n);
    return i && r && Se(e, "delete", n, void 0), i;
  }
  has(e, n) {
    const r = Reflect.has(e, n);
    return (!vn(n) || !ll.has(n)) && Ut(e, "has", n), r;
  }
  ownKeys(e) {
    return Ut(
      e,
      "iterate",
      rt(e) ? "length" : Je
    ), Reflect.ownKeys(e);
  }
}
class rc extends ul {
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
const ic = /* @__PURE__ */ new cl(), sc = /* @__PURE__ */ new rc(), oc = /* @__PURE__ */ new cl(
  !0
), ls = (t) => t, Wr = (t) => Reflect.getPrototypeOf(t);
function nr(t, e, n = !1, r = !1) {
  t = t.__v_raw;
  const i = ht(t), s = ht(e);
  n || (Be(e, s) && Ut(i, "get", e), Ut(i, "get", s));
  const { has: o } = Wr(i), l = r ? ls : n ? as : jn;
  if (o.call(i, e))
    return l(t.get(e));
  if (o.call(i, s))
    return l(t.get(s));
  t !== i && t.get(e);
}
function rr(t, e = !1) {
  const n = this.__v_raw, r = ht(n), i = ht(t);
  return e || (Be(t, i) && Ut(r, "has", t), Ut(r, "has", i)), t === i ? n.has(t) : n.has(t) || n.has(i);
}
function ir(t, e = !1) {
  return t = t.__v_raw, !e && Ut(ht(t), "iterate", Je), Reflect.get(t, "size", t);
}
function Ds(t) {
  t = ht(t);
  const e = ht(this);
  return Wr(e).has.call(e, t) || (e.add(t), Se(e, "add", t, t)), this;
}
function Vs(t, e) {
  e = ht(e);
  const n = ht(this), { has: r, get: i } = Wr(n);
  let s = r.call(n, t);
  s || (t = ht(t), s = r.call(n, t));
  const o = i.call(n, t);
  return n.set(t, e), s ? Be(e, o) && Se(n, "set", t, e) : Se(n, "add", t, e), this;
}
function qs(t) {
  const e = ht(this), { has: n, get: r } = Wr(e);
  let i = n.call(e, t);
  i || (t = ht(t), i = n.call(e, t)), r && r.call(e, t);
  const s = e.delete(t);
  return i && Se(e, "delete", t, void 0), s;
}
function Gs() {
  const t = ht(this), e = t.size !== 0, n = t.clear();
  return e && Se(t, "clear", void 0, void 0), n;
}
function sr(t, e) {
  return function(r, i) {
    const s = this, o = s.__v_raw, l = ht(o), u = e ? ls : t ? as : jn;
    return !t && Ut(l, "iterate", Je), o.forEach((c, a) => r.call(i, u(c), u(a), s));
  };
}
function or(t, e, n) {
  return function(...r) {
    const i = this.__v_raw, s = ht(i), o = an(s), l = t === "entries" || t === Symbol.iterator && o, u = t === "keys" && o, c = i[t](...r), a = n ? ls : e ? as : jn;
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
function lc() {
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
  uc,
  cc,
  ac,
  fc
] = /* @__PURE__ */ lc();
function us(t, e) {
  const n = e ? t ? fc : ac : t ? cc : uc;
  return (r, i, s) => i === "__v_isReactive" ? !t : i === "__v_isReadonly" ? t : i === "__v_raw" ? r : Reflect.get(
    ft(n, i) && i in r ? n : r,
    i,
    s
  );
}
const hc = {
  get: /* @__PURE__ */ us(!1, !1)
}, dc = {
  get: /* @__PURE__ */ us(!1, !0)
}, pc = {
  get: /* @__PURE__ */ us(!0, !1)
}, al = /* @__PURE__ */ new WeakMap(), fl = /* @__PURE__ */ new WeakMap(), hl = /* @__PURE__ */ new WeakMap(), gc = /* @__PURE__ */ new WeakMap();
function mc(t) {
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
function wc(t) {
  return t.__v_skip || !Object.isExtensible(t) ? 0 : mc(zu(t));
}
function Kr(t) {
  return mn(t) ? t : cs(
    t,
    !1,
    ic,
    hc,
    al
  );
}
function yc(t) {
  return cs(
    t,
    !1,
    oc,
    dc,
    fl
  );
}
function dl(t) {
  return cs(
    t,
    !0,
    sc,
    pc,
    hl
  );
}
function cs(t, e, n, r, i) {
  if (!Et(t) || t.__v_raw && !(e && t.__v_isReactive))
    return t;
  const s = i.get(t);
  if (s)
    return s;
  const o = wc(t);
  if (o === 0)
    return t;
  const l = new Proxy(
    t,
    o === 2 ? r : n
  );
  return i.set(t, l), l;
}
function fn(t) {
  return mn(t) ? fn(t.__v_raw) : !!(t && t.__v_isReactive);
}
function mn(t) {
  return !!(t && t.__v_isReadonly);
}
function Cr(t) {
  return !!(t && t.__v_isShallow);
}
function pl(t) {
  return fn(t) || mn(t);
}
function ht(t) {
  const e = t && t.__v_raw;
  return e ? ht(e) : t;
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
    const e = ht(this);
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
function _c(t, e, n = !1) {
  let r, i;
  const s = ut(t);
  return s ? (r = t, i = re) : (r = t.get, i = t.set), new ml(r, i, s || !i, n);
}
function wl(t) {
  var e;
  Ae && Ye && (t = ht(t), il(
    Ye,
    (e = t.dep) != null ? e : t.dep = ol(
      () => t.dep = void 0,
      t instanceof ml ? t : void 0
    )
  ));
}
function wr(t, e = 4, n) {
  t = ht(t);
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
  return vc(t, !1);
}
function vc(t, e) {
  return Wt(t) ? t : new bc(t, e);
}
class bc {
  constructor(e, n) {
    this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? e : ht(e), this._value = n ? e : jn(e);
  }
  get value() {
    return wl(this), this._value;
  }
  set value(e) {
    const n = this.__v_isShallow || Cr(e) || mn(e);
    e = n ? e : ht(e), Be(e, this._rawValue) && (this._rawValue = e, this._value = n ? e : jn(e), wr(this, 4));
  }
}
function Tr(t) {
  return Wt(t) ? t.value : t;
}
const xc = {
  get: (t, e, n) => Tr(Reflect.get(t, e, n)),
  set: (t, e, n, r) => {
    const i = t[e];
    return Wt(i) && !Wt(n) ? (i.value = n, !0) : Reflect.set(t, e, n, r);
  }
};
function yl(t) {
  return fn(t) ? t : new Proxy(t, xc);
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
  Ec(t, n, i, r);
}
function Ec(t, e, n, r = !0) {
  console.error(t);
}
let Bn = !1, Ci = !1;
const Lt = [];
let we = 0;
const hn = [];
let Ie = null, We = 0;
const _l = /* @__PURE__ */ Promise.resolve();
let fs = null;
function vl(t) {
  const e = fs || _l;
  return t ? e.then(this ? t.bind(this) : t) : e;
}
function Sc(t) {
  let e = we + 1, n = Lt.length;
  for (; e < n; ) {
    const r = e + n >>> 1, i = Lt[r], s = zn(i);
    s < t || s === t && i.pre ? e = r + 1 : n = r;
  }
  return e;
}
function hs(t) {
  (!Lt.length || !Lt.includes(
    t,
    Bn && t.allowRecurse ? we + 1 : we
  )) && (t.id == null ? Lt.push(t) : Lt.splice(Sc(t.id), 0, t), bl());
}
function bl() {
  !Bn && !Ci && (Ci = !0, fs = _l.then(El));
}
function kc(t) {
  const e = Lt.indexOf(t);
  e > we && Lt.splice(e, 1);
}
function Mc(t) {
  rt(t) ? hn.push(...t) : (!Ie || !Ie.includes(
    t,
    t.allowRecurse ? We + 1 : We
  )) && hn.push(t), bl();
}
function Us(t, e, n = Bn ? we + 1 : 0) {
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
  if (hn.length) {
    const e = [...new Set(hn)].sort(
      (n, r) => zn(n) - zn(r)
    );
    if (hn.length = 0, Ie) {
      Ie.push(...e);
      return;
    }
    for (Ie = e, We = 0; We < Ie.length; We++)
      Ie[We]();
    Ie = null, We = 0;
  }
}
const zn = (t) => t.id == null ? 1 / 0 : t.id, Nc = (t, e) => {
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
  Ci = !1, Bn = !0, Lt.sort(Nc);
  try {
    for (we = 0; we < Lt.length; we++) {
      const e = Lt[we];
      e && e.active !== !1 && je(e, null, 14);
    }
  } finally {
    we = 0, Lt.length = 0, xl(), Bn = !1, fs = null, (Lt.length || hn.length) && El();
  }
}
function Rc(t, e, ...n) {
  if (t.isUnmounted)
    return;
  const r = t.vnode.props || vt;
  let i = n;
  const s = e.startsWith("update:"), o = s && e.slice(7);
  if (o && o in r) {
    const a = `${o === "modelValue" ? "model" : o}Modifiers`, { number: f, trim: h } = r[a] || vt;
    h && (i = n.map((p) => Tt(p) ? p.trim() : p)), f && (i = n.map(qu));
  }
  let l, u = r[l = ui(e)] || // also try camelCase event handler (#2249)
  r[l = ui(Ee(e))];
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
function Cc(t, e = Jt, n) {
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
      _ = ge(
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
      _ = ge(
        y.length > 1 ? y(
          s,
          { attrs: u, slots: l, emit: c }
        ) : y(
          s,
          null
          /* we know it doesn't need it */
        )
      ), d = e.props ? u : Tc(u);
    }
  } catch (y) {
    On.length = 0, Xr(y, t, 1), _ = ye(Dn);
  }
  let P = _;
  if (d && v !== !1) {
    const y = Object.keys(d), { shapeFlag: k } = P;
    y.length && k & 7 && (o && y.some(Zi) && (d = Pc(
      d,
      o
    )), P = wn(P, d));
  }
  return n.dirs && (P = wn(P), P.dirs = P.dirs ? P.dirs.concat(n.dirs) : n.dirs), n.transition && (P.transition = n.transition), _ = P, Pr(C), _;
}
const Tc = (t) => {
  let e;
  for (const n in t)
    (n === "class" || n === "style" || Gr(n)) && ((e || (e = {}))[n] = t[n]);
  return e;
}, Pc = (t, e) => {
  const n = {};
  for (const r in t)
    (!Zi(r) || !(r.slice(9) in e)) && (n[r] = t[r]);
  return n;
};
function Lc(t, e, n) {
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
function Ic({ vnode: t, parent: e }, n) {
  for (; e; ) {
    const r = e.subTree;
    if (r.suspense && r.suspense.activeBranch === t && (r.el = t.el), r === t)
      (t = e.vnode).el = n, e = e.parent;
    else
      break;
  }
}
const $c = Symbol.for("v-ndc"), Oc = (t) => t.__isSuspense;
function Fc(t, e) {
  e && e.pendingBranch ? rt(t) ? e.effects.push(...t) : e.effects.push(t) : Mc(t);
}
const Ac = Symbol.for("v-scx"), jc = () => vr(Ac), lr = {};
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
    e = (...z) => {
      L(...z), k();
    };
  }
  const u = Ft, c = (L) => r === !0 ? L : (
    // for deep: false, only traverse root-level properties
    Ke(L, r === !1 ? 1 : void 0)
  );
  let a, f = !1, h = !1;
  if (Wt(t) ? (a = () => t.value, f = Cr(t)) : fn(t) ? (a = () => c(t), f = !0) : rt(t) ? (h = !0, f = t.some((L) => fn(L) || Cr(L)), a = () => t.map((L) => {
    if (Wt(L))
      return L.value;
    if (fn(L))
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
      const L = jc();
      v = L.__watcherHandles || (L.__watcherHandles = []);
    } else
      return re;
  let _ = h ? new Array(t.length).fill(lr) : lr;
  const d = () => {
    if (!(!P.active || !P.dirty))
      if (e) {
        const L = P.run();
        (r || f || (h ? L.some((z, H) => Be(z, _[H])) : Be(L, _))) && (p && p(), ae(e, u, 3, [
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
  const P = new is(a, re, C), y = Qu(), k = () => {
    P.stop(), y && ts(y.effects, P);
  };
  return e ? n ? d() : _ = P.run() : i === "post" ? qt(
    P.run.bind(P),
    u && u.suspense
  ) : P.run(), v && v.push(k), k;
}
function Bc(t, e, n) {
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
  else if (Ko(t) || an(t))
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
function zc(t, e) {
  Cl(t, "a", e);
}
function Dc(t, e) {
  Cl(t, "da", e);
}
function Cl(t, e, n = Ft) {
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
      Rl(i.parent.vnode) && Vc(r, e, n, i), i = i.parent;
  }
}
function Vc(t, e, n, r) {
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
function Jr(t, e, n = Ft, r = !1) {
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
const Me = (t) => (e, n = Ft) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!ti || t === "sp") && Jr(t, (...r) => e(...r), n)
), Tl = Me("bm"), Pl = Me("m"), qc = Me("bu"), Gc = Me("u"), Hc = Me("bum"), ps = Me("um"), Uc = Me("sp"), Wc = Me(
  "rtg"
), Kc = Me(
  "rtc"
);
function Xc(t, e = Ft) {
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
    $watch: (t) => Bc.bind(t)
  })
), di = (t, e) => t !== vt && !t.__isScriptSetup && ft(t, e), Yc = {
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
function Jc(t) {
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
    renderTriggered: z,
    errorCaptured: H,
    serverPrefetch: Q,
    // public API
    expose: X,
    inheritAttrs: et,
    // assets
    components: ot,
    directives: W,
    filters: x
  } = e;
  if (c && Qc(c, r, null), o)
    for (const A in o) {
      const B = o[A];
      ut(B) && (r[A] = B.bind(n));
    }
  if (i) {
    const A = i.call(n, n);
    Et(A) && (t.data = Kr(A));
  }
  if (Pi = !0, s)
    for (const A in s) {
      const B = s[A], Y = ut(B) ? B.bind(n, n) : ut(B.get) ? B.get.bind(n, n) : re, J = !ut(B) && ut(B.set) ? B.set.bind(n) : re, it = Fi({
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
    Reflect.ownKeys(A).forEach((B) => {
      ia(B, A[B]);
    });
  }
  a && Ys(a, t, "c");
  function N(A, B) {
    rt(B) ? B.forEach((Y) => A(Y.bind(n))) : B && A(B.bind(n));
  }
  if (N(Tl, f), N(Pl, h), N(qc, p), N(Gc, w), N(zc, v), N(Dc, _), N(Xc, H), N(Kc, L), N(Wc, z), N(Hc, C), N(ps, y), N(Uc, Q), rt(X))
    if (X.length) {
      const A = t.exposed || (t.exposed = {});
      X.forEach((B) => {
        Object.defineProperty(A, B, {
          get: () => n[B],
          set: (Y) => n[B] = Y
        });
      });
    } else t.exposed || (t.exposed = {});
  k && t.render === re && (t.render = k), et != null && (t.inheritAttrs = et), ot && (t.components = ot), W && (t.directives = W);
}
function Qc(t, e, n = re) {
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
      const l = Zc[o] || n && n[o];
      t[o] = l ? l(t[o], e[o]) : e[o];
    }
  return t;
}
const Zc = {
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
  watch: ea,
  // provide / inject
  provide: Js,
  inject: ta
};
function Js(t, e) {
  return e ? t ? function() {
    return Ct(
      ut(t) ? t.call(this, this) : t,
      ut(e) ? e.call(this, this) : e
    );
  } : e : t;
}
function ta(t, e) {
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
function ea(t, e) {
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
      isNativeTag: ju,
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
let na = 0;
function ra(t, e) {
  return function(r, i = null) {
    ut(r) || (r = Ct({}, r)), i != null && !Et(i) && (i = null);
    const s = Il(), o = /* @__PURE__ */ new WeakSet();
    let l = !1;
    const u = s.app = {
      _uid: na++,
      _component: r,
      _props: i,
      _container: null,
      _context: s,
      _instance: null,
      version: Ta,
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
          const h = ye(r, i);
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
function ia(t, e) {
  if (Ft) {
    let n = Ft.provides;
    const r = Ft.parent && Ft.parent.provides;
    r === n && (n = Ft.provides = Object.create(r)), n[t] = e;
  }
}
function vr(t, e, n = !1) {
  const r = Ft || Jt;
  if (r || $n) {
    const i = r ? r.parent == null ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : $n._context.provides;
    if (i && t in i)
      return i[t];
    if (arguments.length > 1)
      return n && ut(e) ? e.call(r && r.proxy) : e;
  }
}
function sa(t, e, n, r = !1) {
  const i = {}, s = {};
  Rr(s, Zr, 1), t.propsDefaults = /* @__PURE__ */ Object.create(null), $l(t, e, i, s);
  for (const o in t.propsOptions[0])
    o in i || (i[o] = void 0);
  n ? t.props = r ? i : yc(i) : t.type.props ? t.props = i : t.props = s, t.attrs = s;
}
function oa(t, e, n, r) {
  const {
    props: i,
    attrs: s,
    vnode: { patchFlag: o }
  } = t, l = ht(i), [u] = t.propsOptions;
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
            const w = Ee(h);
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
  c && Se(t, "set", "$attrs");
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
      i && ft(i, a = Ee(u)) ? !s || !s.includes(a) ? n[a] = c : (l || (l = {}))[a] = c : Yr(t.emitsOptions, u) || (!(u in r) || c !== r[u]) && (r[u] = c, o = !0);
    }
  if (s) {
    const u = ht(n), c = l || vt;
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
    return Et(t) && r.set(t, cn), cn;
  if (rt(s))
    for (let a = 0; a < s.length; a++) {
      const f = Ee(s[a]);
      Zs(f) && (o[f] = vt);
    }
  else if (s)
    for (const a in s) {
      const f = Ee(a);
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
const Fl = (t) => t[0] === "_" || t === "$stable", ms = (t) => rt(t) ? t.map(ge) : [ge(t)], la = (t, e, n) => {
  if (e._n)
    return e;
  const r = Cc((...i) => ms(e(...i)), n);
  return r._c = !1, r;
}, Al = (t, e, n) => {
  const r = t._ctx;
  for (const i in t) {
    if (Fl(i))
      continue;
    const s = t[i];
    if (ut(s))
      e[i] = la(i, s, r);
    else if (s != null) {
      const o = ms(s);
      e[i] = () => o;
    }
  }
}, jl = (t, e) => {
  const n = ms(e);
  t.slots.default = () => n;
}, ua = (t, e) => {
  if (t.vnode.shapeFlag & 32) {
    const n = e._;
    n ? (t.slots = ht(e), Rr(e, "_", n)) : Al(
      e,
      t.slots = {}
    );
  } else
    t.slots = {}, e && jl(t, e);
  Rr(t.slots, Zr, 1);
}, ca = (t, e, n) => {
  const { vnode: r, slots: i } = t;
  let s = !0, o = vt;
  if (r.shapeFlag & 32) {
    const l = e._;
    l ? n && l === 1 ? s = !1 : (Ct(i, e), !n && l === 1 && delete i._) : (s = !e.$stable, Al(e, i)), o = e;
  } else e && (jl(t, e), o = { default: 1 });
  if (s)
    for (const l in i)
      !Fl(l) && o[l] == null && delete i[l];
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
function aa(t) {
  return fa(t);
}
function fa(t, e) {
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
  } = t, v = (m, b, T, $ = null, O = null, q = null, G = void 0, V = null, U = !!b.dynamicChildren) => {
    if (m === b)
      return;
    m && !Sn(m, b) && ($ = bt(m), lt(m, O, q, !0), m = null), b.patchFlag === -2 && (U = !1, b.dynamicChildren = null);
    const { type: j, ref: K, shapeFlag: tt } = b;
    switch (j) {
      case Qr:
        _(m, b, T, $);
        break;
      case Dn:
        d(m, b, T, $);
        break;
      case gi:
        m == null && C(b, T, $, G);
        break;
      case ne:
        ot(
          m,
          b,
          T,
          $,
          O,
          q,
          G,
          V,
          U
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
          G,
          V,
          U
        ) : tt & 6 ? W(
          m,
          b,
          T,
          $,
          O,
          q,
          G,
          V,
          U
        ) : (tt & 64 || tt & 128) && j.process(
          m,
          b,
          T,
          $,
          O,
          q,
          G,
          V,
          U,
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
  }, k = (m, b, T, $, O, q, G, V, U) => {
    b.type === "svg" ? G = "svg" : b.type === "math" && (G = "mathml"), m == null ? L(
      b,
      T,
      $,
      O,
      q,
      G,
      V,
      U
    ) : Q(
      m,
      b,
      O,
      q,
      G,
      V,
      U
    );
  }, L = (m, b, T, $, O, q, G, V) => {
    let U, j;
    const { props: K, shapeFlag: tt, transition: Z, dirs: nt } = m;
    if (U = m.el = o(
      m.type,
      q,
      K && K.is,
      K
    ), tt & 8 ? a(U, m.children) : tt & 16 && H(
      m.children,
      U,
      null,
      $,
      O,
      pi(m, q),
      G,
      V
    ), nt && qe(m, null, $, "created"), z(U, m, m.scopeId, G, $), K) {
      for (const dt in K)
        dt !== "value" && !Ln(dt) && s(
          U,
          dt,
          null,
          K[dt],
          q,
          m.children,
          $,
          O,
          mt
        );
      "value" in K && s(U, "value", null, K.value, q), (j = K.onVnodeBeforeMount) && de(j, $, m);
    }
    nt && qe(m, null, $, "beforeMount");
    const ct = ha(O, Z);
    ct && Z.beforeEnter(U), r(U, b, T), ((j = K && K.onVnodeMounted) || ct || nt) && qt(() => {
      j && de(j, $, m), ct && Z.enter(U), nt && qe(m, null, $, "mounted");
    }, O);
  }, z = (m, b, T, $, O) => {
    if (T && p(m, T), $)
      for (let q = 0; q < $.length; q++)
        p(m, $[q]);
    if (O) {
      let q = O.subTree;
      if (b === q) {
        const G = O.vnode;
        z(
          m,
          G,
          G.scopeId,
          G.slotScopeIds,
          O.parent
        );
      }
    }
  }, H = (m, b, T, $, O, q, G, V, U = 0) => {
    for (let j = U; j < m.length; j++) {
      const K = m[j] = V ? $e(m[j]) : ge(m[j]);
      v(
        null,
        K,
        b,
        T,
        $,
        O,
        q,
        G,
        V
      );
    }
  }, Q = (m, b, T, $, O, q, G) => {
    const V = b.el = m.el;
    let { patchFlag: U, dynamicChildren: j, dirs: K } = b;
    U |= m.patchFlag & 16;
    const tt = m.props || vt, Z = b.props || vt;
    let nt;
    if (T && Ge(T, !1), (nt = Z.onVnodeBeforeUpdate) && de(nt, T, b, m), K && qe(b, m, T, "beforeUpdate"), T && Ge(T, !0), j ? X(
      m.dynamicChildren,
      j,
      V,
      T,
      $,
      pi(b, O),
      q
    ) : G || B(
      m,
      b,
      V,
      null,
      T,
      $,
      pi(b, O),
      q,
      !1
    ), U > 0) {
      if (U & 16)
        et(
          V,
          b,
          tt,
          Z,
          T,
          $,
          O
        );
      else if (U & 2 && tt.class !== Z.class && s(V, "class", null, Z.class, O), U & 4 && s(V, "style", tt.style, Z.style, O), U & 8) {
        const ct = b.dynamicProps;
        for (let dt = 0; dt < ct.length; dt++) {
          const _t = ct[dt], Mt = tt[_t], Dt = Z[_t];
          (Dt !== Mt || _t === "value") && s(
            V,
            _t,
            Mt,
            Dt,
            O,
            m.children,
            T,
            $,
            mt
          );
        }
      }
      U & 1 && m.children !== b.children && a(V, b.children);
    } else !G && j == null && et(
      V,
      b,
      tt,
      Z,
      T,
      $,
      O
    );
    ((nt = Z.onVnodeUpdated) || K) && qt(() => {
      nt && de(nt, T, b, m), K && qe(b, m, T, "updated");
    }, $);
  }, X = (m, b, T, $, O, q, G) => {
    for (let V = 0; V < b.length; V++) {
      const U = m[V], j = b[V], K = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        U.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (U.type === ne || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Sn(U, j) || // - In the case of a component, it could contain anything.
        U.shapeFlag & 70) ? f(U.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          T
        )
      );
      v(
        U,
        j,
        K,
        null,
        $,
        O,
        q,
        G,
        !0
      );
    }
  }, et = (m, b, T, $, O, q, G) => {
    if (T !== $) {
      if (T !== vt)
        for (const V in T)
          !Ln(V) && !(V in $) && s(
            m,
            V,
            T[V],
            null,
            G,
            b.children,
            O,
            q,
            mt
          );
      for (const V in $) {
        if (Ln(V))
          continue;
        const U = $[V], j = T[V];
        U !== j && V !== "value" && s(
          m,
          V,
          j,
          U,
          G,
          b.children,
          O,
          q,
          mt
        );
      }
      "value" in $ && s(m, "value", T.value, $.value, G);
    }
  }, ot = (m, b, T, $, O, q, G, V, U) => {
    const j = b.el = m ? m.el : l(""), K = b.anchor = m ? m.anchor : l("");
    let { patchFlag: tt, dynamicChildren: Z, slotScopeIds: nt } = b;
    nt && (V = V ? V.concat(nt) : nt), m == null ? (r(j, T, $), r(K, T, $), H(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      b.children || [],
      T,
      K,
      O,
      q,
      G,
      V,
      U
    )) : tt > 0 && tt & 64 && Z && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    m.dynamicChildren ? (X(
      m.dynamicChildren,
      Z,
      T,
      O,
      q,
      G,
      V
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (b.key != null || O && b === O.subTree) && Bl(
      m,
      b,
      !0
      /* shallow */
    )) : B(
      m,
      b,
      T,
      K,
      O,
      q,
      G,
      V,
      U
    );
  }, W = (m, b, T, $, O, q, G, V, U) => {
    b.slotScopeIds = V, m == null ? b.shapeFlag & 512 ? O.ctx.activate(
      b,
      T,
      $,
      G,
      U
    ) : x(
      b,
      T,
      $,
      O,
      q,
      G,
      U
    ) : D(m, b, U);
  }, x = (m, b, T, $, O, q, G) => {
    const V = m.component = Sa(
      m,
      $,
      O
    );
    if (Rl(m) && (V.ctx.renderer = Zt), ka(V), V.asyncDep) {
      if (O && O.registerDep(V, N), !m.el) {
        const U = V.subTree = ye(Dn);
        d(null, U, b, T);
      }
    } else
      N(
        V,
        m,
        b,
        T,
        O,
        q,
        G
      );
  }, D = (m, b, T) => {
    const $ = b.component = m.component;
    if (Lc(m, b, T))
      if ($.asyncDep && !$.asyncResolved) {
        A($, b, T);
        return;
      } else
        $.next = b, kc($.update), $.effect.dirty = !0, $.update();
    else
      b.el = m.el, $.vnode = b;
  }, N = (m, b, T, $, O, q, G) => {
    const V = () => {
      if (m.isMounted) {
        let { next: K, bu: tt, u: Z, parent: nt, vnode: ct } = m;
        {
          const Ne = zl(m);
          if (Ne) {
            K && (K.el = ct.el, A(m, K, G)), Ne.asyncDep.then(() => {
              m.isUnmounted || V();
            });
            return;
          }
        }
        let dt = K, _t;
        Ge(m, !1), K ? (K.el = ct.el, A(m, K, G)) : K = ct, tt && ci(tt), (_t = K.props && K.props.onVnodeBeforeUpdate) && de(_t, nt, K, ct), Ge(m, !0);
        const Mt = fi(m), Dt = m.subTree;
        m.subTree = Mt, v(
          Dt,
          Mt,
          // parent may have changed if it's in a teleport
          f(Dt.el),
          // anchor may have changed if it's in a fragment
          bt(Dt),
          m,
          O,
          q
        ), K.el = Mt.el, dt === null && Ic(m, Mt.el), Z && qt(Z, O), (_t = K.props && K.props.onVnodeUpdated) && qt(
          () => de(_t, nt, K, ct),
          O
        );
      } else {
        let K;
        const { el: tt, props: Z } = b, { bm: nt, m: ct, parent: dt } = m, _t = _r(b);
        if (Ge(m, !1), nt && ci(nt), !_t && (K = Z && Z.onVnodeBeforeMount) && de(K, dt, b), Ge(m, !0), tt && ze) {
          const Mt = () => {
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
            () => !m.isUnmounted && Mt()
          ) : Mt();
        } else {
          const Mt = m.subTree = fi(m);
          v(
            null,
            Mt,
            T,
            $,
            m,
            O,
            q
          ), b.el = Mt.el;
        }
        if (ct && qt(ct, O), !_t && (K = Z && Z.onVnodeMounted)) {
          const Mt = b;
          qt(
            () => de(K, dt, Mt),
            O
          );
        }
        (b.shapeFlag & 256 || dt && _r(dt.vnode) && dt.vnode.shapeFlag & 256) && m.a && qt(m.a, O), m.isMounted = !0, b = T = $ = null;
      }
    }, U = m.effect = new is(
      V,
      re,
      () => hs(j),
      m.scope
      // track it in component's effect scope
    ), j = m.update = () => {
      U.dirty && U.run();
    };
    j.id = m.uid, Ge(m, !0), j();
  }, A = (m, b, T) => {
    b.component = m;
    const $ = m.vnode.props;
    m.vnode = b, m.next = null, oa(m, b.props, $, T), ca(m, b.children, T), en(), Us(m), nn();
  }, B = (m, b, T, $, O, q, G, V, U = !1) => {
    const j = m && m.children, K = m ? m.shapeFlag : 0, tt = b.children, { patchFlag: Z, shapeFlag: nt } = b;
    if (Z > 0) {
      if (Z & 128) {
        J(
          j,
          tt,
          T,
          $,
          O,
          q,
          G,
          V,
          U
        );
        return;
      } else if (Z & 256) {
        Y(
          j,
          tt,
          T,
          $,
          O,
          q,
          G,
          V,
          U
        );
        return;
      }
    }
    nt & 8 ? (K & 16 && mt(j, O, q), tt !== j && a(T, tt)) : K & 16 ? nt & 16 ? J(
      j,
      tt,
      T,
      $,
      O,
      q,
      G,
      V,
      U
    ) : mt(j, O, q, !0) : (K & 8 && a(T, ""), nt & 16 && H(
      tt,
      T,
      $,
      O,
      q,
      G,
      V,
      U
    ));
  }, Y = (m, b, T, $, O, q, G, V, U) => {
    m = m || cn, b = b || cn;
    const j = m.length, K = b.length, tt = Math.min(j, K);
    let Z;
    for (Z = 0; Z < tt; Z++) {
      const nt = b[Z] = U ? $e(b[Z]) : ge(b[Z]);
      v(
        m[Z],
        nt,
        T,
        null,
        O,
        q,
        G,
        V,
        U
      );
    }
    j > K ? mt(
      m,
      O,
      q,
      !0,
      !1,
      tt
    ) : H(
      b,
      T,
      $,
      O,
      q,
      G,
      V,
      U,
      tt
    );
  }, J = (m, b, T, $, O, q, G, V, U) => {
    let j = 0;
    const K = b.length;
    let tt = m.length - 1, Z = K - 1;
    for (; j <= tt && j <= Z; ) {
      const nt = m[j], ct = b[j] = U ? $e(b[j]) : ge(b[j]);
      if (Sn(nt, ct))
        v(
          nt,
          ct,
          T,
          null,
          O,
          q,
          G,
          V,
          U
        );
      else
        break;
      j++;
    }
    for (; j <= tt && j <= Z; ) {
      const nt = m[tt], ct = b[Z] = U ? $e(b[Z]) : ge(b[Z]);
      if (Sn(nt, ct))
        v(
          nt,
          ct,
          T,
          null,
          O,
          q,
          G,
          V,
          U
        );
      else
        break;
      tt--, Z--;
    }
    if (j > tt) {
      if (j <= Z) {
        const nt = Z + 1, ct = nt < K ? b[nt].el : $;
        for (; j <= Z; )
          v(
            null,
            b[j] = U ? $e(b[j]) : ge(b[j]),
            T,
            ct,
            O,
            q,
            G,
            V,
            U
          ), j++;
      }
    } else if (j > Z)
      for (; j <= tt; )
        lt(m[j], O, q, !0), j++;
    else {
      const nt = j, ct = j, dt = /* @__PURE__ */ new Map();
      for (j = ct; j <= Z; j++) {
        const It = b[j] = U ? $e(b[j]) : ge(b[j]);
        It.key != null && dt.set(It.key, j);
      }
      let _t, Mt = 0;
      const Dt = Z - ct + 1;
      let Ne = !1, Zn = 0;
      const De = new Array(Dt);
      for (j = 0; j < Dt; j++)
        De[j] = 0;
      for (j = nt; j <= tt; j++) {
        const It = m[j];
        if (Mt >= Dt) {
          lt(It, O, q, !0);
          continue;
        }
        let te;
        if (It.key != null)
          te = dt.get(It.key);
        else
          for (_t = ct; _t <= Z; _t++)
            if (De[_t - ct] === 0 && Sn(It, b[_t])) {
              te = _t;
              break;
            }
        te === void 0 ? lt(It, O, q, !0) : (De[te - ct] = j + 1, te >= Zn ? Zn = te : Ne = !0, v(
          It,
          b[te],
          T,
          null,
          O,
          q,
          G,
          V,
          U
        ), Mt++);
      }
      const tr = Ne ? da(De) : cn;
      for (_t = tr.length - 1, j = Dt - 1; j >= 0; j--) {
        const It = ct + j, te = b[It], er = It + 1 < K ? b[It + 1].el : $;
        De[j] === 0 ? v(
          null,
          te,
          T,
          er,
          O,
          q,
          G,
          V,
          U
        ) : Ne && (_t < 0 || j !== tr[_t] ? it(te, T, er, 2) : _t--);
      }
    }
  }, it = (m, b, T, $, O = null) => {
    const { el: q, type: G, transition: V, children: U, shapeFlag: j } = m;
    if (j & 6) {
      it(m.component.subTree, b, T, $);
      return;
    }
    if (j & 128) {
      m.suspense.move(b, T, $);
      return;
    }
    if (j & 64) {
      G.move(m, b, T, Zt);
      return;
    }
    if (G === ne) {
      r(q, b, T);
      for (let tt = 0; tt < U.length; tt++)
        it(U[tt], b, T, $);
      r(m.anchor, b, T);
      return;
    }
    if (G === gi) {
      P(m, b, T);
      return;
    }
    if ($ !== 2 && j & 1 && V)
      if ($ === 0)
        V.beforeEnter(q), r(q, b, T), qt(() => V.enter(q), O);
      else {
        const { leave: tt, delayLeave: Z, afterLeave: nt } = V, ct = () => r(q, b, T), dt = () => {
          tt(q, () => {
            ct(), nt && nt();
          });
        };
        Z ? Z(q, ct, dt) : dt();
      }
    else
      r(q, b, T);
  }, lt = (m, b, T, $ = !1, O = !1) => {
    const {
      type: q,
      props: G,
      ref: V,
      children: U,
      dynamicChildren: j,
      shapeFlag: K,
      patchFlag: tt,
      dirs: Z
    } = m;
    if (V != null && $i(V, null, T, m, !0), K & 256) {
      b.ctx.deactivate(m);
      return;
    }
    const nt = K & 1 && Z, ct = !_r(m);
    let dt;
    if (ct && (dt = G && G.onVnodeBeforeUnmount) && de(dt, b, m), K & 6)
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
      ) : j && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (q !== ne || tt > 0 && tt & 64) ? mt(
        j,
        b,
        T,
        !1,
        !0
      ) : (q === ne && tt & 384 || !O && K & 16) && mt(U, b, T), $ && St(m);
    }
    (ct && (dt = G && G.onVnodeUnmounted) || nt) && qt(() => {
      dt && de(dt, b, m), nt && qe(m, null, b, "unmounted");
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
      const { leave: G, delayLeave: V } = O, U = () => G(T, q);
      V ? V(m.el, q, U) : U();
    } else
      q();
  }, pt = (m, b) => {
    let T;
    for (; m !== b; )
      T = h(m), i(m), m = T;
    i(b);
  }, gt = (m, b, T) => {
    const { bum: $, scope: O, update: q, subTree: G, um: V } = m;
    $ && ci($), O.stop(), q && (q.active = !1, lt(G, m, b, T)), V && qt(V, b), qt(() => {
      m.isUnmounted = !0;
    }, b), b && b.pendingBranch && !b.isUnmounted && m.asyncDep && !m.asyncResolved && m.suspenseId === b.pendingId && (b.deps--, b.deps === 0 && b.resolve());
  }, mt = (m, b, T, $ = !1, O = !1, q = 0) => {
    for (let G = q; G < m.length; G++)
      lt(m[G], b, T, $, O);
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
    mc: H,
    pc: B,
    pbc: X,
    n: bt,
    o: t
  };
  let he, ze;
  return {
    render: zt,
    hydrate: he,
    createApp: ra(zt, he)
  };
}
function pi({ type: t, props: e }, n) {
  return n === "svg" && t === "foreignObject" || n === "mathml" && t === "annotation-xml" && e && e.encoding && e.encoding.includes("html") ? void 0 : n;
}
function Ge({ effect: t, update: e }, n) {
  t.allowRecurse = e.allowRecurse = n;
}
function ha(t, e) {
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
function da(t) {
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
const pa = (t) => t.__isTeleport, ne = Symbol.for("v-fgt"), Qr = Symbol.for("v-txt"), Dn = Symbol.for("v-cmt"), gi = Symbol.for("v-stc"), On = [];
let ce = null;
function Te(t = !1) {
  On.push(ce = t ? null : []);
}
function ga() {
  On.pop(), ce = On[On.length - 1] || null;
}
let Vn = 1;
function ro(t) {
  Vn += t;
}
function ma(t) {
  return t.dynamicChildren = Vn > 0 ? ce || cn : null, ga(), Vn > 0 && ce && ce.push(t), t;
}
function Pe(t, e, n, r, i, s) {
  return ma(
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
function wa(t) {
  return t ? t.__v_isVNode === !0 : !1;
}
function Sn(t, e) {
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
const ye = ya;
function ya(t, e = null, n = null, r = 0, i = null, s = !1) {
  if ((!t || t === $c) && (t = Dn), wa(t)) {
    const l = wn(
      t,
      e,
      !0
      /* mergeRef: true */
    );
    return n && ws(l, n), Vn > 0 && !s && ce && (l.shapeFlag & 6 ? ce[ce.indexOf(t)] = l : ce.push(l)), l.patchFlag |= -2, l;
  }
  if (Ca(t) && (t = t.__vccOpts), e) {
    e = _a(e);
    let { class: l, style: u } = e;
    l && !Tt(l) && (e.class = rs(l)), Et(u) && (pl(u) && !rt(u) && (u = Ct({}, u)), e.style = ns(u));
  }
  const o = Tt(t) ? 1 : Oc(t) ? 128 : pa(t) ? 64 : Et(t) ? 4 : ut(t) ? 2 : 0;
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
function _a(t) {
  return t ? pl(t) || Zr in t ? Ct({}, t) : t : null;
}
function wn(t, e, n = !1) {
  const { props: r, ref: i, patchFlag: s, children: o } = t, l = e ? ba(r || {}, e) : r;
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
    ssContent: t.ssContent && wn(t.ssContent),
    ssFallback: t.ssFallback && wn(t.ssFallback),
    el: t.el,
    anchor: t.anchor,
    ctx: t.ctx,
    ce: t.ce
  };
}
function va(t = " ", e = 0) {
  return ye(Qr, null, t, e);
}
function ge(t) {
  return t == null || typeof t == "boolean" ? ye(Dn) : rt(t) ? ye(
    ne,
    null,
    // #3666, avoid reference pollution when reusing vnode
    t.slice()
  ) : typeof t == "object" ? $e(t) : ye(Qr, null, String(t));
}
function $e(t) {
  return t.el === null && t.patchFlag !== -1 || t.memo ? t : wn(t);
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
  else ut(e) ? (e = { default: e, _ctx: Jt }, n = 32) : (e = String(e), r & 64 ? (n = 16, e = [va(e)]) : n = 8);
  t.children = e, t.shapeFlag |= n;
}
function ba(...t) {
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
function de(t, e, n, r = null) {
  ae(t, e, 7, [
    n,
    r
  ]);
}
const xa = Il();
let Ea = 0;
function Sa(t, e, n) {
  const r = t.type, i = (e ? e.appContext : t.appContext) || xa, s = {
    uid: Ea++,
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
    scope: new Yu(
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
  return s.ctx = { _: s }, s.root = e ? e.root : s, s.emit = Rc.bind(null, s), t.ce && t.ce(s), s;
}
let Ft = null, Ir, Oi;
{
  const t = Zo(), e = (n, r) => {
    let i;
    return (i = t[n]) || (i = t[n] = []), i.push(r), (s) => {
      i.length > 1 ? i.forEach((o) => o(s)) : i[0](s);
    };
  };
  Ir = e(
    "__VUE_INSTANCE_SETTERS__",
    (n) => Ft = n
  ), Oi = e(
    "__VUE_SSR_SETTERS__",
    (n) => ti = n
  );
}
const Xn = (t) => {
  const e = Ft;
  return Ir(t), t.scope.on(), () => {
    t.scope.off(), Ir(e);
  };
}, io = () => {
  Ft && Ft.scope.off(), Ir(null);
};
function Vl(t) {
  return t.vnode.shapeFlag & 4;
}
let ti = !1;
function ka(t, e = !1) {
  e && Oi(e);
  const { props: n, children: r } = t.vnode, i = Vl(t);
  sa(t, n, i, e), ua(t, r);
  const s = i ? Ma(t, e) : void 0;
  return e && Oi(!1), s;
}
function Ma(t, e) {
  const n = t.type;
  t.accessCache = /* @__PURE__ */ Object.create(null), t.proxy = gl(new Proxy(t.ctx, Yc));
  const { setup: r } = n;
  if (r) {
    const i = t.setupContext = r.length > 1 ? Ra(t) : null, s = Xn(t);
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
      Jc(t);
    } finally {
      nn(), i();
    }
  }
}
function Na(t) {
  return t.attrsProxy || (t.attrsProxy = new Proxy(
    t.attrs,
    {
      get(e, n) {
        return Ut(t, "get", "$attrs"), e[n];
      }
    }
  ));
}
function Ra(t) {
  const e = (n) => {
    t.exposed = n || {};
  };
  return {
    get attrs() {
      return Na(t);
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
function Ca(t) {
  return ut(t) && "__vccOpts" in t;
}
const Fi = (t, e) => _c(t, e, ti), Ta = "3.4.21";
/**
* @vue/runtime-dom v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const Pa = "http://www.w3.org/2000/svg", La = "http://www.w3.org/1998/Math/MathML", Oe = typeof document < "u" ? document : null, lo = Oe && /* @__PURE__ */ Oe.createElement("template"), Ia = {
  insert: (t, e, n) => {
    e.insertBefore(t, n || null);
  },
  remove: (t) => {
    const e = t.parentNode;
    e && e.removeChild(t);
  },
  createElement: (t, e, n, r) => {
    const i = e === "svg" ? Oe.createElementNS(Pa, t) : e === "mathml" ? Oe.createElementNS(La, t) : Oe.createElement(t, n ? { is: n } : void 0);
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
}, $a = Symbol("_vtc");
function Oa(t, e, n) {
  const r = t[$a];
  r && (e = (e ? [e, ...r] : [...r]).join(" ")), e == null ? t.removeAttribute("class") : n ? t.setAttribute("class", e) : t.className = e;
}
const $r = Symbol("_vod"), Gl = Symbol("_vsh"), xr = {
  beforeMount(t, { value: e }, { transition: n }) {
    t[$r] = t.style.display === "none" ? "" : t.style.display, n && e ? n.beforeEnter(t) : kn(t, e);
  },
  mounted(t, { value: e }, { transition: n }) {
    n && e && n.enter(t);
  },
  updated(t, { value: e, oldValue: n }, { transition: r }) {
    !e != !n && (r ? e ? (r.beforeEnter(t), kn(t, !0), r.enter(t)) : r.leave(t, () => {
      kn(t, !1);
    }) : kn(t, e));
  },
  beforeUnmount(t, { value: e }) {
    kn(t, e);
  }
};
function kn(t, e) {
  t.style.display = e ? t[$r] : "none", t[Gl] = !e;
}
const Fa = Symbol(""), Aa = /(^|;)\s*display\s*:/;
function ja(t, e, n) {
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
      o && (n += ";" + o), r.cssText = n, s = Aa.test(n);
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
    const r = Ba(t, e);
    uo.test(n) ? t.setProperty(
      le(r),
      n.replace(uo, ""),
      "important"
    ) : t[r] = n;
  }
}
const co = ["Webkit", "Moz", "ms"], mi = {};
function Ba(t, e) {
  const n = mi[e];
  if (n)
    return n;
  let r = Ee(e);
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
function za(t, e, n, r, i) {
  if (r && e.startsWith("xlink:"))
    n == null ? t.removeAttributeNS(ao, e.slice(6, e.length)) : t.setAttributeNS(ao, e, n);
  else {
    const s = Xu(e);
    n == null || s && !tl(n) ? t.removeAttribute(e) : t.setAttribute(e, s ? "" : n);
  }
}
function Da(t, e, n, r, i, s, o) {
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
function Va(t, e, n, r) {
  t.addEventListener(e, n, r);
}
function qa(t, e, n, r) {
  t.removeEventListener(e, n, r);
}
const fo = Symbol("_vei");
function Ga(t, e, n, r, i = null) {
  const s = t[fo] || (t[fo] = {}), o = s[e];
  if (r && o)
    o.value = r;
  else {
    const [l, u] = Ha(e);
    if (r) {
      const c = s[e] = Ka(r, i);
      Va(t, l, c, u);
    } else o && (qa(t, l, o, u), s[e] = void 0);
  }
}
const ho = /(?:Once|Passive|Capture)$/;
function Ha(t) {
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
const Ua = /* @__PURE__ */ Promise.resolve(), Wa = () => wi || (Ua.then(() => wi = 0), wi = Date.now());
function Ka(t, e) {
  const n = (r) => {
    if (!r._vts)
      r._vts = Date.now();
    else if (r._vts <= n.attached)
      return;
    ae(
      Xa(r, n.value),
      e,
      5,
      [r]
    );
  };
  return n.value = t, n.attached = Wa(), n;
}
function Xa(t, e) {
  if (rt(e)) {
    const n = t.stopImmediatePropagation;
    return t.stopImmediatePropagation = () => {
      n.call(t), t._stopped = !0;
    }, e.map((r) => (i) => !i._stopped && r && r(i));
  } else
    return e;
}
const po = (t) => t.charCodeAt(0) === 111 && t.charCodeAt(1) === 110 && // lowercase letter
t.charCodeAt(2) > 96 && t.charCodeAt(2) < 123, Ya = (t, e, n, r, i, s, o, l, u) => {
  const c = i === "svg";
  e === "class" ? Oa(t, r, c) : e === "style" ? ja(t, n, r) : Gr(e) ? Zi(e) || Ga(t, e, n, r, o) : (e[0] === "." ? (e = e.slice(1), !0) : e[0] === "^" ? (e = e.slice(1), !1) : Ja(t, e, r, c)) ? Da(
    t,
    e,
    r,
    s,
    o,
    l,
    u
  ) : (e === "true-value" ? t._trueValue = r : e === "false-value" && (t._falseValue = r), za(t, e, r, c));
};
function Ja(t, e, n, r) {
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
const Qa = /* @__PURE__ */ Ct({ patchProp: Ya }, Ia);
let go;
function Za() {
  return go || (go = aa(Qa));
}
const mo = (...t) => {
  Za().render(...t);
}, tf = { class: "graph-controller__controls-overview" }, ef = { key: 0 }, nf = { key: 1 }, rf = { key: 0 }, sf = { key: 1 }, of = /* @__PURE__ */ ds({
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
    return (o, l) => (Te(), Pe("table", tf, [
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
          Tr(s) ? (Te(), Pe("td", ef, Re(u.touch), 1)) : (Te(), Pe("td", nf, Re(u.desktop), 1))
        ]), [
          [xr, e.showControlsGraph]
        ])), 64)),
        (Te(), Pe(ne, null, Ks(r, (u) => yr(Xt("tr", {
          key: u.action
        }, [
          Xt("td", null, Re(u.action), 1),
          Tr(s) ? (Te(), Pe("td", rf, Re(u.touch), 1)) : (Te(), Pe("td", sf, Re(u.desktop), 1))
        ]), [
          [xr, e.showControlsEnvironment]
        ])), 64))
      ])
    ]));
  }
}), lf = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [r, i] of e)
    n[r] = i;
  return n;
}, uf = /* @__PURE__ */ lf(of, [["__scopeId", "data-v-8c3d818f"]]);
var cf = { value: () => {
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
function af(t, e) {
  return t.trim().split(/^|\s+/).map(function(n) {
    var r = "", i = n.indexOf(".");
    if (i >= 0 && (r = n.slice(i + 1), n = n.slice(0, i)), n && !e.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: r };
  });
}
Sr.prototype = Yn.prototype = {
  constructor: Sr,
  on: function(t, e) {
    var n = this._, r = af(t + "", n), i, s = -1, o = r.length;
    if (arguments.length < 2) {
      for (; ++s < o; ) if ((i = (t = r[s]).type) && (i = ff(n[i], t.name))) return i;
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
function ff(t, e) {
  for (var n = 0, r = t.length, i; n < r; ++n)
    if ((i = t[n]).name === e)
      return i.value;
}
function wo(t, e, n) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === e) {
      t[r] = cf, t = t.slice(0, r).concat(t.slice(r + 1));
      break;
    }
  return n != null && t.push({ name: e, value: n }), t;
}
var Ai = "http://www.w3.org/1999/xhtml";
const yo = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Ai,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function ni(t) {
  var e = t += "", n = e.indexOf(":");
  return n >= 0 && (e = t.slice(0, n)) !== "xmlns" && (t = t.slice(n + 1)), yo.hasOwnProperty(e) ? { space: yo[e], local: t } : t;
}
function hf(t) {
  return function() {
    var e = this.ownerDocument, n = this.namespaceURI;
    return n === Ai && e.documentElement.namespaceURI === Ai ? e.createElement(t) : e.createElementNS(n, t);
  };
}
function df(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function Hl(t) {
  var e = ni(t);
  return (e.local ? df : hf)(e);
}
function pf() {
}
function ys(t) {
  return t == null ? pf : function() {
    return this.querySelector(t);
  };
}
function gf(t) {
  typeof t != "function" && (t = ys(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var s = e[i], o = s.length, l = r[i] = new Array(o), u, c, a = 0; a < o; ++a)
      (u = s[a]) && (c = t.call(u, u.__data__, a, s)) && ("__data__" in u && (c.__data__ = u.__data__), l[a] = c);
  return new Qt(r, this._parents);
}
function mf(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function wf() {
  return [];
}
function Ul(t) {
  return t == null ? wf : function() {
    return this.querySelectorAll(t);
  };
}
function yf(t) {
  return function() {
    return mf(t.apply(this, arguments));
  };
}
function _f(t) {
  typeof t == "function" ? t = yf(t) : t = Ul(t);
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
var vf = Array.prototype.find;
function bf(t) {
  return function() {
    return vf.call(this.children, t);
  };
}
function xf() {
  return this.firstElementChild;
}
function Ef(t) {
  return this.select(t == null ? xf : bf(typeof t == "function" ? t : Kl(t)));
}
var Sf = Array.prototype.filter;
function kf() {
  return Array.from(this.children);
}
function Mf(t) {
  return function() {
    return Sf.call(this.children, t);
  };
}
function Nf(t) {
  return this.selectAll(t == null ? kf : Mf(typeof t == "function" ? t : Kl(t)));
}
function Rf(t) {
  typeof t != "function" && (t = Wl(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var s = e[i], o = s.length, l = r[i] = [], u, c = 0; c < o; ++c)
      (u = s[c]) && t.call(u, u.__data__, c, s) && l.push(u);
  return new Qt(r, this._parents);
}
function Xl(t) {
  return new Array(t.length);
}
function Cf() {
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
function Tf(t) {
  return function() {
    return t;
  };
}
function Pf(t, e, n, r, i, s) {
  for (var o = 0, l, u = e.length, c = s.length; o < c; ++o)
    (l = e[o]) ? (l.__data__ = s[o], r[o] = l) : n[o] = new Or(t, s[o]);
  for (; o < u; ++o)
    (l = e[o]) && (i[o] = l);
}
function Lf(t, e, n, r, i, s, o) {
  var l, u, c = /* @__PURE__ */ new Map(), a = e.length, f = s.length, h = new Array(a), p;
  for (l = 0; l < a; ++l)
    (u = e[l]) && (h[l] = p = o.call(u, u.__data__, l, e) + "", c.has(p) ? i[l] = u : c.set(p, u));
  for (l = 0; l < f; ++l)
    p = o.call(t, s[l], l, s) + "", (u = c.get(p)) ? (r[l] = u, u.__data__ = s[l], c.delete(p)) : n[l] = new Or(t, s[l]);
  for (l = 0; l < a; ++l)
    (u = e[l]) && c.get(h[l]) === u && (i[l] = u);
}
function If(t) {
  return t.__data__;
}
function $f(t, e) {
  if (!arguments.length) return Array.from(this, If);
  var n = e ? Lf : Pf, r = this._parents, i = this._groups;
  typeof t != "function" && (t = Tf(t));
  for (var s = i.length, o = new Array(s), l = new Array(s), u = new Array(s), c = 0; c < s; ++c) {
    var a = r[c], f = i[c], h = f.length, p = Of(t.call(a, a && a.__data__, c, r)), w = p.length, v = l[c] = new Array(w), _ = o[c] = new Array(w), d = u[c] = new Array(h);
    n(a, f, v, _, d, p, e);
    for (var C = 0, P = 0, y, k; C < w; ++C)
      if (y = v[C]) {
        for (C >= P && (P = C + 1); !(k = _[P]) && ++P < w; ) ;
        y._next = k || null;
      }
  }
  return o = new Qt(o, r), o._enter = l, o._exit = u, o;
}
function Of(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function Ff() {
  return new Qt(this._exit || this._groups.map(Xl), this._parents);
}
function Af(t, e, n) {
  var r = this.enter(), i = this, s = this.exit();
  return typeof t == "function" ? (r = t(r), r && (r = r.selection())) : r = r.append(t + ""), e != null && (i = e(i), i && (i = i.selection())), n == null ? s.remove() : n(s), r && i ? r.merge(i).order() : i;
}
function jf(t) {
  for (var e = t.selection ? t.selection() : t, n = this._groups, r = e._groups, i = n.length, s = r.length, o = Math.min(i, s), l = new Array(i), u = 0; u < o; ++u)
    for (var c = n[u], a = r[u], f = c.length, h = l[u] = new Array(f), p, w = 0; w < f; ++w)
      (p = c[w] || a[w]) && (h[w] = p);
  for (; u < i; ++u)
    l[u] = n[u];
  return new Qt(l, this._parents);
}
function Bf() {
  for (var t = this._groups, e = -1, n = t.length; ++e < n; )
    for (var r = t[e], i = r.length - 1, s = r[i], o; --i >= 0; )
      (o = r[i]) && (s && o.compareDocumentPosition(s) ^ 4 && s.parentNode.insertBefore(o, s), s = o);
  return this;
}
function zf(t) {
  t || (t = Df);
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
function Df(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function Vf() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function qf() {
  return Array.from(this);
}
function Gf() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, s = r.length; i < s; ++i) {
      var o = r[i];
      if (o) return o;
    }
  return null;
}
function Hf() {
  let t = 0;
  for (const e of this) ++t;
  return t;
}
function Uf() {
  return !this.node();
}
function Wf(t) {
  for (var e = this._groups, n = 0, r = e.length; n < r; ++n)
    for (var i = e[n], s = 0, o = i.length, l; s < o; ++s)
      (l = i[s]) && t.call(l, l.__data__, s, i);
  return this;
}
function Kf(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Xf(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Yf(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function Jf(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function Qf(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttribute(t) : this.setAttribute(t, n);
  };
}
function Zf(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, n);
  };
}
function th(t, e) {
  var n = ni(t);
  if (arguments.length < 2) {
    var r = this.node();
    return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n);
  }
  return this.each((e == null ? n.local ? Xf : Kf : typeof e == "function" ? n.local ? Zf : Qf : n.local ? Jf : Yf)(n, e));
}
function Yl(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function eh(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function nh(t, e, n) {
  return function() {
    this.style.setProperty(t, e, n);
  };
}
function rh(t, e, n) {
  return function() {
    var r = e.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, n);
  };
}
function ih(t, e, n) {
  return arguments.length > 1 ? this.each((e == null ? eh : typeof e == "function" ? rh : nh)(t, e, n ?? "")) : yn(this.node(), t);
}
function yn(t, e) {
  return t.style.getPropertyValue(e) || Yl(t).getComputedStyle(t, null).getPropertyValue(e);
}
function sh(t) {
  return function() {
    delete this[t];
  };
}
function oh(t, e) {
  return function() {
    this[t] = e;
  };
}
function lh(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? delete this[t] : this[t] = n;
  };
}
function uh(t, e) {
  return arguments.length > 1 ? this.each((e == null ? sh : typeof e == "function" ? lh : oh)(t, e)) : this.node()[t];
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
function ch(t) {
  return function() {
    Zl(this, t);
  };
}
function ah(t) {
  return function() {
    tu(this, t);
  };
}
function fh(t, e) {
  return function() {
    (e.apply(this, arguments) ? Zl : tu)(this, t);
  };
}
function hh(t, e) {
  var n = Jl(t + "");
  if (arguments.length < 2) {
    for (var r = _s(this.node()), i = -1, s = n.length; ++i < s; ) if (!r.contains(n[i])) return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? fh : e ? ch : ah)(n, e));
}
function dh() {
  this.textContent = "";
}
function ph(t) {
  return function() {
    this.textContent = t;
  };
}
function gh(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
function mh(t) {
  return arguments.length ? this.each(t == null ? dh : (typeof t == "function" ? gh : ph)(t)) : this.node().textContent;
}
function wh() {
  this.innerHTML = "";
}
function yh(t) {
  return function() {
    this.innerHTML = t;
  };
}
function _h(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function vh(t) {
  return arguments.length ? this.each(t == null ? wh : (typeof t == "function" ? _h : yh)(t)) : this.node().innerHTML;
}
function bh() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function xh() {
  return this.each(bh);
}
function Eh() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Sh() {
  return this.each(Eh);
}
function kh(t) {
  var e = typeof t == "function" ? t : Hl(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function Mh() {
  return null;
}
function Nh(t, e) {
  var n = typeof t == "function" ? t : Hl(t), r = e == null ? Mh : typeof e == "function" ? e : ys(e);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function Rh() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function Ch() {
  return this.each(Rh);
}
function Th() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Ph() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Lh(t) {
  return this.select(t ? Ph : Th);
}
function Ih(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function $h(t) {
  return function(e) {
    t.call(this, e, this.__data__);
  };
}
function Oh(t) {
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
function Ah(t, e, n) {
  return function() {
    var r = this.__on, i, s = $h(e);
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
function jh(t, e, n) {
  var r = Oh(t + ""), i, s = r.length, o;
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
  for (l = e ? Ah : Fh, i = 0; i < s; ++i) this.each(l(r[i], e, n));
  return this;
}
function eu(t, e, n) {
  var r = Yl(t), i = r.CustomEvent;
  typeof i == "function" ? i = new i(e, n) : (i = r.document.createEvent("Event"), n ? (i.initEvent(e, n.bubbles, n.cancelable), i.detail = n.detail) : i.initEvent(e, !1, !1)), t.dispatchEvent(i);
}
function Bh(t, e) {
  return function() {
    return eu(this, t, e);
  };
}
function zh(t, e) {
  return function() {
    return eu(this, t, e.apply(this, arguments));
  };
}
function Dh(t, e) {
  return this.each((typeof e == "function" ? zh : Bh)(t, e));
}
function* Vh() {
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
function qh() {
  return this;
}
Qt.prototype = Jn.prototype = {
  constructor: Qt,
  select: gf,
  selectAll: _f,
  selectChild: Ef,
  selectChildren: Nf,
  filter: Rf,
  data: $f,
  enter: Cf,
  exit: Ff,
  join: Af,
  merge: jf,
  selection: qh,
  order: Bf,
  sort: zf,
  call: Vf,
  nodes: qf,
  node: Gf,
  size: Hf,
  empty: Uf,
  each: Wf,
  attr: th,
  style: ih,
  property: uh,
  classed: hh,
  text: mh,
  html: vh,
  raise: xh,
  lower: Sh,
  append: kh,
  insert: Nh,
  remove: Ch,
  clone: Lh,
  datum: Ih,
  on: jh,
  dispatch: Dh,
  [Symbol.iterator]: Vh
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
function Gh(t, e) {
  return t.target && (t = ru(t), e === void 0 && (e = t.currentTarget), t = t.touches || [t]), Array.from(t, (n) => ee(n, e));
}
const Hh = { passive: !1 }, qn = { capture: !0, passive: !1 };
function yi(t) {
  t.stopImmediatePropagation();
}
function dn(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function iu(t) {
  var e = t.document.documentElement, n = xt(t).on("dragstart.drag", dn, qn);
  "onselectstart" in e ? n.on("selectstart.drag", dn, qn) : (e.__noselect = e.style.MozUserSelect, e.style.MozUserSelect = "none");
}
function su(t, e) {
  var n = t.document.documentElement, r = xt(t).on("dragstart.drag", null);
  e && (r.on("click.drag", dn, qn), setTimeout(function() {
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
function Uh(t) {
  return !t.ctrlKey && !t.button;
}
function Wh() {
  return this.parentNode;
}
function Kh(t, e) {
  return e ?? { x: t.x, y: t.y };
}
function Xh() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Yh() {
  var t = Uh, e = Wh, n = Kh, r = Xh, i = {}, s = Yn("start", "drag", "end"), o = 0, l, u, c, a, f = 0;
  function h(y) {
    y.on("mousedown.drag", p).filter(r).on("touchstart.drag", _).on("touchmove.drag", d, Hh).on("touchend.drag touchcancel.drag", C).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function p(y, k) {
    if (!(a || !t.call(this, y, k))) {
      var L = P(this, e.call(this, y, k), y, k, "mouse");
      L && (xt(y.view).on("mousemove.drag", w, qn).on("mouseup.drag", v, qn), iu(y.view), yi(y), c = !1, l = y.clientX, u = y.clientY, L("start", y));
    }
  }
  function w(y) {
    if (dn(y), !c) {
      var k = y.clientX - l, L = y.clientY - u;
      c = k * k + L * L > f;
    }
    i.mouse("drag", y);
  }
  function v(y) {
    xt(y.view).on("mousemove.drag mouseup.drag", null), su(y.view, c), dn(y), i.mouse("end", y);
  }
  function _(y, k) {
    if (t.call(this, y, k)) {
      var L = y.changedTouches, z = e.call(this, y, k), H = L.length, Q, X;
      for (Q = 0; Q < H; ++Q)
        (X = P(this, z, y, k, L[Q].identifier, L[Q])) && (yi(y), X("start", y, L[Q]));
    }
  }
  function d(y) {
    var k = y.changedTouches, L = k.length, z, H;
    for (z = 0; z < L; ++z)
      (H = i[k[z].identifier]) && (dn(y), H("drag", y, k[z]));
  }
  function C(y) {
    var k = y.changedTouches, L = k.length, z, H;
    for (a && clearTimeout(a), a = setTimeout(function() {
      a = null;
    }, 500), z = 0; z < L; ++z)
      (H = i[k[z].identifier]) && (yi(y), H("end", y, k[z]));
  }
  function P(y, k, L, z, H, Q) {
    var X = s.copy(), et = ee(Q || L, k), ot, W, x;
    if ((x = n.call(y, new ji("beforestart", {
      sourceEvent: L,
      target: h,
      identifier: H,
      active: o,
      x: et[0],
      y: et[1],
      dx: 0,
      dy: 0,
      dispatch: X
    }), z)) != null)
      return ot = x.x - et[0] || 0, W = x.y - et[1] || 0, function D(N, A, B) {
        var Y = et, J;
        switch (N) {
          case "start":
            i[H] = D, J = o++;
            break;
          case "end":
            delete i[H], --o;
          case "drag":
            et = ee(B || A, k), J = o;
            break;
        }
        X.call(
          N,
          y,
          new ji(N, {
            sourceEvent: A,
            subject: x,
            target: h,
            identifier: H,
            active: J,
            x: et[0] + ot,
            y: et[1] + W,
            dx: et[0] - Y[0],
            dy: et[1] - Y[1],
            dispatch: X
          }),
          z
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
var Gn = 0.7, Fr = 1 / Gn, pn = "\\s*([+-]?\\d+)\\s*", Hn = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", _e = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", Jh = /^#([0-9a-f]{3,8})$/, Qh = new RegExp(`^rgb\\(${pn},${pn},${pn}\\)$`), Zh = new RegExp(`^rgb\\(${_e},${_e},${_e}\\)$`), td = new RegExp(`^rgba\\(${pn},${pn},${pn},${Hn}\\)$`), ed = new RegExp(`^rgba\\(${_e},${_e},${_e},${Hn}\\)$`), nd = new RegExp(`^hsl\\(${Hn},${_e},${_e}\\)$`), rd = new RegExp(`^hsla\\(${Hn},${_e},${_e},${Hn}\\)$`), _o = {
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
  formatHex8: id,
  formatHsl: sd,
  formatRgb: bo,
  toString: bo
});
function vo() {
  return this.rgb().formatHex();
}
function id() {
  return this.rgb().formatHex8();
}
function sd() {
  return lu(this).formatHsl();
}
function bo() {
  return this.rgb().formatRgb();
}
function Ze(t) {
  var e, n;
  return t = (t + "").trim().toLowerCase(), (e = Jh.exec(t)) ? (n = e[1].length, e = parseInt(e[1], 16), n === 6 ? xo(e) : n === 3 ? new Ht(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : n === 8 ? cr(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : n === 4 ? cr(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = Qh.exec(t)) ? new Ht(e[1], e[2], e[3], 1) : (e = Zh.exec(t)) ? new Ht(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = td.exec(t)) ? cr(e[1], e[2], e[3], e[4]) : (e = ed.exec(t)) ? cr(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = nd.exec(t)) ? ko(e[1], e[2] / 100, e[3] / 100, 1) : (e = rd.exec(t)) ? ko(e[1], e[2] / 100, e[3] / 100, e[4]) : _o.hasOwnProperty(t) ? xo(_o[t]) : t === "transparent" ? new Ht(NaN, NaN, NaN, 0) : null;
}
function xo(t) {
  return new Ht(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function cr(t, e, n, r) {
  return r <= 0 && (t = e = n = NaN), new Ht(t, e, n, r);
}
function od(t) {
  return t instanceof Qn || (t = Ze(t)), t ? (t = t.rgb(), new Ht(t.r, t.g, t.b, t.opacity)) : new Ht();
}
function Bi(t, e, n, r) {
  return arguments.length === 1 ? od(t) : new Ht(t, e, n, r ?? 1);
}
function Ht(t, e, n, r) {
  this.r = +t, this.g = +e, this.b = +n, this.opacity = +r;
}
vs(Ht, Bi, ou(Qn, {
  brighter(t) {
    return t = t == null ? Fr : Math.pow(Fr, t), new Ht(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Gn : Math.pow(Gn, t), new Ht(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Ht(Qe(this.r), Qe(this.g), Qe(this.b), Ar(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Eo,
  // Deprecated! Use color.formatHex.
  formatHex: Eo,
  formatHex8: ld,
  formatRgb: So,
  toString: So
}));
function Eo() {
  return `#${Xe(this.r)}${Xe(this.g)}${Xe(this.b)}`;
}
function ld() {
  return `#${Xe(this.r)}${Xe(this.g)}${Xe(this.b)}${Xe((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function So() {
  const t = Ar(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${Qe(this.r)}, ${Qe(this.g)}, ${Qe(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function Ar(t) {
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
function ud(t, e, n, r) {
  return arguments.length === 1 ? lu(t) : new ue(t, e, n, r ?? 1);
}
function ue(t, e, n, r) {
  this.h = +t, this.s = +e, this.l = +n, this.opacity = +r;
}
vs(ue, ud, ou(Qn, {
  brighter(t) {
    return t = t == null ? Fr : Math.pow(Fr, t), new ue(this.h, this.s, this.l * t, this.opacity);
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
    return new ue(Mo(this.h), ar(this.s), ar(this.l), Ar(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = Ar(this.opacity);
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
function cd(t, e) {
  return function(n) {
    return t + n * e;
  };
}
function ad(t, e, n) {
  return t = Math.pow(t, n), e = Math.pow(e, n) - t, n = 1 / n, function(r) {
    return Math.pow(t + r * e, n);
  };
}
function fd(t) {
  return (t = +t) == 1 ? uu : function(e, n) {
    return n - e ? ad(e, n, t) : bs(isNaN(e) ? n : e);
  };
}
function uu(t, e) {
  var n = e - t;
  return n ? cd(t, n) : bs(isNaN(t) ? e : t);
}
const jr = function t(e) {
  var n = fd(e);
  function r(i, s) {
    var o = n((i = Bi(i)).r, (s = Bi(s)).r), l = n(i.g, s.g), u = n(i.b, s.b), c = uu(i.opacity, s.opacity);
    return function(a) {
      return i.r = o(a), i.g = l(a), i.b = u(a), i.opacity = c(a), i + "";
    };
  }
  return r.gamma = t, r;
}(1);
function hd(t, e) {
  e || (e = []);
  var n = t ? Math.min(e.length, t.length) : 0, r = e.slice(), i;
  return function(s) {
    for (i = 0; i < n; ++i) r[i] = t[i] * (1 - s) + e[i] * s;
    return r;
  };
}
function dd(t) {
  return ArrayBuffer.isView(t) && !(t instanceof DataView);
}
function pd(t, e) {
  var n = e ? e.length : 0, r = t ? Math.min(n, t.length) : 0, i = new Array(r), s = new Array(n), o;
  for (o = 0; o < r; ++o) i[o] = xs(t[o], e[o]);
  for (; o < n; ++o) s[o] = e[o];
  return function(l) {
    for (o = 0; o < r; ++o) s[o] = i[o](l);
    return s;
  };
}
function gd(t, e) {
  var n = /* @__PURE__ */ new Date();
  return t = +t, e = +e, function(r) {
    return n.setTime(t * (1 - r) + e * r), n;
  };
}
function me(t, e) {
  return t = +t, e = +e, function(n) {
    return t * (1 - n) + e * n;
  };
}
function md(t, e) {
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
function wd(t) {
  return function() {
    return t;
  };
}
function yd(t) {
  return function(e) {
    return t(e) + "";
  };
}
function cu(t, e) {
  var n = zi.lastIndex = vi.lastIndex = 0, r, i, s, o = -1, l = [], u = [];
  for (t = t + "", e = e + ""; (r = zi.exec(t)) && (i = vi.exec(e)); )
    (s = i.index) > n && (s = e.slice(n, s), l[o] ? l[o] += s : l[++o] = s), (r = r[0]) === (i = i[0]) ? l[o] ? l[o] += i : l[++o] = i : (l[++o] = null, u.push({ i: o, x: me(r, i) })), n = vi.lastIndex;
  return n < e.length && (s = e.slice(n), l[o] ? l[o] += s : l[++o] = s), l.length < 2 ? u[0] ? yd(u[0].x) : wd(e) : (e = u.length, function(c) {
    for (var a = 0, f; a < e; ++a) l[(f = u[a]).i] = f.x(c);
    return l.join("");
  });
}
function xs(t, e) {
  var n = typeof e, r;
  return e == null || n === "boolean" ? bs(e) : (n === "number" ? me : n === "string" ? (r = Ze(e)) ? (e = r, jr) : cu : e instanceof Ze ? jr : e instanceof Date ? gd : dd(e) ? hd : Array.isArray(e) ? pd : typeof e.valueOf != "function" && typeof e.toString != "function" || isNaN(e) ? md : me)(t, e);
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
function _d(t) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return e.isIdentity ? Di : au(e.a, e.b, e.c, e.d, e.e, e.f);
}
function vd(t) {
  return t == null || (fr || (fr = document.createElementNS("http://www.w3.org/2000/svg", "g")), fr.setAttribute("transform", t), !(t = fr.transform.baseVal.consolidate())) ? Di : (t = t.matrix, au(t.a, t.b, t.c, t.d, t.e, t.f));
}
function fu(t, e, n, r) {
  function i(c) {
    return c.length ? c.pop() + " " : "";
  }
  function s(c, a, f, h, p, w) {
    if (c !== f || a !== h) {
      var v = p.push("translate(", null, e, null, n);
      w.push({ i: v - 4, x: me(c, f) }, { i: v - 2, x: me(a, h) });
    } else (f || h) && p.push("translate(" + f + e + h + n);
  }
  function o(c, a, f, h) {
    c !== a ? (c - a > 180 ? a += 360 : a - c > 180 && (c += 360), h.push({ i: f.push(i(f) + "rotate(", null, r) - 2, x: me(c, a) })) : a && f.push(i(f) + "rotate(" + a + r);
  }
  function l(c, a, f, h) {
    c !== a ? h.push({ i: f.push(i(f) + "skewX(", null, r) - 2, x: me(c, a) }) : a && f.push(i(f) + "skewX(" + a + r);
  }
  function u(c, a, f, h, p, w) {
    if (c !== f || a !== h) {
      var v = p.push(i(p) + "scale(", null, ",", null, ")");
      w.push({ i: v - 4, x: me(c, f) }, { i: v - 2, x: me(a, h) });
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
var bd = fu(_d, "px, ", "px)", "deg)"), xd = fu(vd, ", ", ")", ")"), Ed = 1e-12;
function Ro(t) {
  return ((t = Math.exp(t)) + 1 / t) / 2;
}
function Sd(t) {
  return ((t = Math.exp(t)) - 1 / t) / 2;
}
function kd(t) {
  return ((t = Math.exp(2 * t)) - 1) / (t + 1);
}
const Md = function t(e, n, r) {
  function i(s, o) {
    var l = s[0], u = s[1], c = s[2], a = o[0], f = o[1], h = o[2], p = a - l, w = f - u, v = p * p + w * w, _, d;
    if (v < Ed)
      d = Math.log(h / c) / e, _ = function(z) {
        return [
          l + z * p,
          u + z * w,
          c * Math.exp(e * z * d)
        ];
      };
    else {
      var C = Math.sqrt(v), P = (h * h - c * c + r * v) / (2 * c * n * C), y = (h * h - c * c - r * v) / (2 * h * n * C), k = Math.log(Math.sqrt(P * P + 1) - P), L = Math.log(Math.sqrt(y * y + 1) - y);
      d = (L - k) / e, _ = function(z) {
        var H = z * d, Q = Ro(k), X = c / (n * C) * (Q * kd(e * H + k) - Sd(k));
        return [
          l + X * p,
          u + X * w,
          c * Q / Ro(e * H + k)
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
var _n = 0, Tn = 0, Mn = 0, hu = 1e3, Br, Pn, zr = 0, tn = 0, ri = 0, Un = typeof performance == "object" && performance.now ? performance : Date, du = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function Es() {
  return tn || (du(Nd), tn = Un.now() + ri);
}
function Nd() {
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
function Rd() {
  Es(), ++_n;
  for (var t = Br, e; t; )
    (e = tn - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
  --_n;
}
function Co() {
  tn = (zr = Un.now()) + ri, _n = Tn = 0;
  try {
    Rd();
  } finally {
    _n = 0, Td(), tn = 0;
  }
}
function Cd() {
  var t = Un.now(), e = t - zr;
  e > hu && (ri -= e, zr = t);
}
function Td() {
  for (var t, e = Br, n, r = 1 / 0; e; )
    e._call ? (r > e._time && (r = e._time), t = e, e = e._next) : (n = e._next, e._next = null, e = t ? t._next = n : Br = n);
  Pn = t, Vi(r);
}
function Vi(t) {
  if (!_n) {
    Tn && (Tn = clearTimeout(Tn));
    var e = t - tn;
    e > 24 ? (t < 1 / 0 && (Tn = setTimeout(Co, t - Un.now() - ri)), Mn && (Mn = clearInterval(Mn))) : (Mn || (zr = Un.now(), Mn = setInterval(Cd, hu)), _n = 1, du(Co));
  }
}
function To(t, e, n) {
  var r = new Dr();
  return e = e == null ? 0 : +e, r.restart((i) => {
    r.stop(), t(i + e);
  }, e, n), r;
}
var Pd = Yn("start", "end", "cancel", "interrupt"), Ld = [], pu = 0, Po = 1, qi = 2, kr = 3, Lo = 4, Gi = 5, Mr = 6;
function ii(t, e, n, r, i, s) {
  var o = t.__transition;
  if (!o) t.__transition = {};
  else if (n in o) return;
  Id(t, n, {
    name: e,
    index: r,
    // For context during callback.
    group: i,
    // For context during callback.
    on: Pd,
    tween: Ld,
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
function ve(t, e) {
  var n = fe(t, e);
  if (n.state > kr) throw new Error("too late; already running");
  return n;
}
function fe(t, e) {
  var n = t.__transition;
  if (!n || !(n = n[e])) throw new Error("transition not found");
  return n;
}
function Id(t, e, n) {
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
function $d(t) {
  return this.each(function() {
    Nr(this, t);
  });
}
function Od(t, e) {
  var n, r;
  return function() {
    var i = ve(this, t), s = i.tween;
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
    var s = ve(this, t), o = s.tween;
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
function Ad(t, e) {
  var n = this._id;
  if (t += "", arguments.length < 2) {
    for (var r = fe(this.node(), n).tween, i = 0, s = r.length, o; i < s; ++i)
      if ((o = r[i]).name === t)
        return o.value;
    return null;
  }
  return this.each((e == null ? Od : Fd)(n, t, e));
}
function Ms(t, e, n) {
  var r = t._id;
  return t.each(function() {
    var i = ve(this, r);
    (i.value || (i.value = {}))[e] = n.apply(this, arguments);
  }), function(i) {
    return fe(i, r).value[e];
  };
}
function gu(t, e) {
  var n;
  return (typeof e == "number" ? me : e instanceof Ze ? jr : (n = Ze(e)) ? (e = n, jr) : cu)(t, e);
}
function jd(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Bd(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function zd(t, e, n) {
  var r, i = n + "", s;
  return function() {
    var o = this.getAttribute(t);
    return o === i ? null : o === r ? s : s = e(r = o, n);
  };
}
function Dd(t, e, n) {
  var r, i = n + "", s;
  return function() {
    var o = this.getAttributeNS(t.space, t.local);
    return o === i ? null : o === r ? s : s = e(r = o, n);
  };
}
function Vd(t, e, n) {
  var r, i, s;
  return function() {
    var o, l = n(this), u;
    return l == null ? void this.removeAttribute(t) : (o = this.getAttribute(t), u = l + "", o === u ? null : o === r && u === i ? s : (i = u, s = e(r = o, l)));
  };
}
function qd(t, e, n) {
  var r, i, s;
  return function() {
    var o, l = n(this), u;
    return l == null ? void this.removeAttributeNS(t.space, t.local) : (o = this.getAttributeNS(t.space, t.local), u = l + "", o === u ? null : o === r && u === i ? s : (i = u, s = e(r = o, l)));
  };
}
function Gd(t, e) {
  var n = ni(t), r = n === "transform" ? xd : gu;
  return this.attrTween(t, typeof e == "function" ? (n.local ? qd : Vd)(n, r, Ms(this, "attr." + t, e)) : e == null ? (n.local ? Bd : jd)(n) : (n.local ? Dd : zd)(n, r, e));
}
function Hd(t, e) {
  return function(n) {
    this.setAttribute(t, e.call(this, n));
  };
}
function Ud(t, e) {
  return function(n) {
    this.setAttributeNS(t.space, t.local, e.call(this, n));
  };
}
function Wd(t, e) {
  var n, r;
  function i() {
    var s = e.apply(this, arguments);
    return s !== r && (n = (r = s) && Ud(t, s)), n;
  }
  return i._value = e, i;
}
function Kd(t, e) {
  var n, r;
  function i() {
    var s = e.apply(this, arguments);
    return s !== r && (n = (r = s) && Hd(t, s)), n;
  }
  return i._value = e, i;
}
function Xd(t, e) {
  var n = "attr." + t;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (e == null) return this.tween(n, null);
  if (typeof e != "function") throw new Error();
  var r = ni(t);
  return this.tween(n, (r.local ? Wd : Kd)(r, e));
}
function Yd(t, e) {
  return function() {
    ks(this, t).delay = +e.apply(this, arguments);
  };
}
function Jd(t, e) {
  return e = +e, function() {
    ks(this, t).delay = e;
  };
}
function Qd(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Yd : Jd)(e, t)) : fe(this.node(), e).delay;
}
function Zd(t, e) {
  return function() {
    ve(this, t).duration = +e.apply(this, arguments);
  };
}
function tp(t, e) {
  return e = +e, function() {
    ve(this, t).duration = e;
  };
}
function ep(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Zd : tp)(e, t)) : fe(this.node(), e).duration;
}
function np(t, e) {
  if (typeof e != "function") throw new Error();
  return function() {
    ve(this, t).ease = e;
  };
}
function rp(t) {
  var e = this._id;
  return arguments.length ? this.each(np(e, t)) : fe(this.node(), e).ease;
}
function ip(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    ve(this, t).ease = n;
  };
}
function sp(t) {
  if (typeof t != "function") throw new Error();
  return this.each(ip(this._id, t));
}
function op(t) {
  typeof t != "function" && (t = Wl(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var s = e[i], o = s.length, l = r[i] = [], u, c = 0; c < o; ++c)
      (u = s[c]) && t.call(u, u.__data__, c, s) && l.push(u);
  return new ke(r, this._parents, this._name, this._id);
}
function lp(t) {
  if (t._id !== this._id) throw new Error();
  for (var e = this._groups, n = t._groups, r = e.length, i = n.length, s = Math.min(r, i), o = new Array(r), l = 0; l < s; ++l)
    for (var u = e[l], c = n[l], a = u.length, f = o[l] = new Array(a), h, p = 0; p < a; ++p)
      (h = u[p] || c[p]) && (f[p] = h);
  for (; l < r; ++l)
    o[l] = e[l];
  return new ke(o, this._parents, this._name, this._id);
}
function up(t) {
  return (t + "").trim().split(/^|\s+/).every(function(e) {
    var n = e.indexOf(".");
    return n >= 0 && (e = e.slice(0, n)), !e || e === "start";
  });
}
function cp(t, e, n) {
  var r, i, s = up(e) ? ks : ve;
  return function() {
    var o = s(this, t), l = o.on;
    l !== r && (i = (r = l).copy()).on(e, n), o.on = i;
  };
}
function ap(t, e) {
  var n = this._id;
  return arguments.length < 2 ? fe(this.node(), n).on.on(t) : this.each(cp(n, t, e));
}
function fp(t) {
  return function() {
    var e = this.parentNode;
    for (var n in this.__transition) if (+n !== t) return;
    e && e.removeChild(this);
  };
}
function hp() {
  return this.on("end.remove", fp(this._id));
}
function dp(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = ys(t));
  for (var r = this._groups, i = r.length, s = new Array(i), o = 0; o < i; ++o)
    for (var l = r[o], u = l.length, c = s[o] = new Array(u), a, f, h = 0; h < u; ++h)
      (a = l[h]) && (f = t.call(a, a.__data__, h, l)) && ("__data__" in a && (f.__data__ = a.__data__), c[h] = f, ii(c[h], e, n, h, c, fe(a, n)));
  return new ke(s, this._parents, e, n);
}
function pp(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = Ul(t));
  for (var r = this._groups, i = r.length, s = [], o = [], l = 0; l < i; ++l)
    for (var u = r[l], c = u.length, a, f = 0; f < c; ++f)
      if (a = u[f]) {
        for (var h = t.call(a, a.__data__, f, u), p, w = fe(a, n), v = 0, _ = h.length; v < _; ++v)
          (p = h[v]) && ii(p, e, n, v, h, w);
        s.push(h), o.push(a);
      }
  return new ke(s, o, e, n);
}
var gp = Jn.prototype.constructor;
function mp() {
  return new gp(this._groups, this._parents);
}
function wp(t, e) {
  var n, r, i;
  return function() {
    var s = yn(this, t), o = (this.style.removeProperty(t), yn(this, t));
    return s === o ? null : s === n && o === r ? i : i = e(n = s, r = o);
  };
}
function mu(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function yp(t, e, n) {
  var r, i = n + "", s;
  return function() {
    var o = yn(this, t);
    return o === i ? null : o === r ? s : s = e(r = o, n);
  };
}
function _p(t, e, n) {
  var r, i, s;
  return function() {
    var o = yn(this, t), l = n(this), u = l + "";
    return l == null && (u = l = (this.style.removeProperty(t), yn(this, t))), o === u ? null : o === r && u === i ? s : (i = u, s = e(r = o, l));
  };
}
function vp(t, e) {
  var n, r, i, s = "style." + e, o = "end." + s, l;
  return function() {
    var u = ve(this, t), c = u.on, a = u.value[s] == null ? l || (l = mu(e)) : void 0;
    (c !== n || i !== a) && (r = (n = c).copy()).on(o, i = a), u.on = r;
  };
}
function bp(t, e, n) {
  var r = (t += "") == "transform" ? bd : gu;
  return e == null ? this.styleTween(t, wp(t, r)).on("end.style." + t, mu(t)) : typeof e == "function" ? this.styleTween(t, _p(t, r, Ms(this, "style." + t, e))).each(vp(this._id, t)) : this.styleTween(t, yp(t, r, e), n).on("end.style." + t, null);
}
function xp(t, e, n) {
  return function(r) {
    this.style.setProperty(t, e.call(this, r), n);
  };
}
function Ep(t, e, n) {
  var r, i;
  function s() {
    var o = e.apply(this, arguments);
    return o !== i && (r = (i = o) && xp(t, o, n)), r;
  }
  return s._value = e, s;
}
function Sp(t, e, n) {
  var r = "style." + (t += "");
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (e == null) return this.tween(r, null);
  if (typeof e != "function") throw new Error();
  return this.tween(r, Ep(t, e, n ?? ""));
}
function kp(t) {
  return function() {
    this.textContent = t;
  };
}
function Mp(t) {
  return function() {
    var e = t(this);
    this.textContent = e ?? "";
  };
}
function Np(t) {
  return this.tween("text", typeof t == "function" ? Mp(Ms(this, "text", t)) : kp(t == null ? "" : t + ""));
}
function Rp(t) {
  return function(e) {
    this.textContent = t.call(this, e);
  };
}
function Cp(t) {
  var e, n;
  function r() {
    var i = t.apply(this, arguments);
    return i !== n && (e = (n = i) && Rp(i)), e;
  }
  return r._value = t, r;
}
function Tp(t) {
  var e = "text";
  if (arguments.length < 1) return (e = this.tween(e)) && e._value;
  if (t == null) return this.tween(e, null);
  if (typeof t != "function") throw new Error();
  return this.tween(e, Cp(t));
}
function Pp() {
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
  return new ke(r, this._parents, t, n);
}
function Lp() {
  var t, e, n = this, r = n._id, i = n.size();
  return new Promise(function(s, o) {
    var l = { value: o }, u = { value: function() {
      --i === 0 && s();
    } };
    n.each(function() {
      var c = ve(this, r), a = c.on;
      a !== t && (e = (t = a).copy(), e._.cancel.push(l), e._.interrupt.push(l), e._.end.push(u)), c.on = e;
    }), i === 0 && s();
  });
}
var Ip = 0;
function ke(t, e, n, r) {
  this._groups = t, this._parents = e, this._name = n, this._id = r;
}
function wu() {
  return ++Ip;
}
var be = Jn.prototype;
ke.prototype = {
  constructor: ke,
  select: dp,
  selectAll: pp,
  selectChild: be.selectChild,
  selectChildren: be.selectChildren,
  filter: op,
  merge: lp,
  selection: mp,
  transition: Pp,
  call: be.call,
  nodes: be.nodes,
  node: be.node,
  size: be.size,
  empty: be.empty,
  each: be.each,
  on: ap,
  attr: Gd,
  attrTween: Xd,
  style: bp,
  styleTween: Sp,
  text: Np,
  textTween: Tp,
  remove: hp,
  tween: Ad,
  delay: Qd,
  duration: ep,
  ease: rp,
  easeVarying: sp,
  end: Lp,
  [Symbol.iterator]: be[Symbol.iterator]
};
const $p = (t) => +t;
function Op(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var Fp = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Op
};
function Ap(t, e) {
  for (var n; !(n = t.__transition) || !(n = n[e]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${e} not found`);
  return n;
}
function jp(t) {
  var e, n;
  t instanceof ke ? (e = t._id, t = t._name) : (e = wu(), (n = Fp).time = Es(), t = t == null ? null : t + "");
  for (var r = this._groups, i = r.length, s = 0; s < i; ++s)
    for (var o = r[s], l = o.length, u, c = 0; c < l; ++c)
      (u = o[c]) && ii(u, t, e, c, o, n || Ap(u, e));
  return new ke(r, this._parents, t, e);
}
Jn.prototype.interrupt = $d;
Jn.prototype.transition = jp;
const Hi = Math.PI, Ui = 2 * Hi, Ue = 1e-6, Bp = Ui - Ue;
function yu(t) {
  this._ += t[0];
  for (let e = 1, n = t.length; e < n; ++e)
    this._ += arguments[e] + t[e];
}
function zp(t) {
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
class Dp {
  constructor(e) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null, this._ = "", this._append = e == null ? yu : zp(e);
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
    this._x1 === null ? this._append`M${c},${a}` : (Math.abs(this._x1 - c) > Ue || Math.abs(this._y1 - a) > Ue) && this._append`L${c},${a}`, r && (h < 0 && (h = h % Ui + Ui), h > Bp ? this._append`A${r},${r},0,1,${f},${e - l},${n - u}A${r},${r},0,1,${f},${this._x1 = c},${this._y1 = a}` : h > Ue && this._append`A${r},${r},0,${+(h >= Hi)},${f},${this._x1 = e + r * Math.cos(s)},${this._y1 = n + r * Math.sin(s)}`);
  }
  rect(e, n, r, i) {
    this._append`M${this._x0 = this._x1 = +e},${this._y0 = this._y1 = +n}h${r = +r}v${+i}h${-r}Z`;
  }
  toString() {
    return this._;
  }
}
function Vp(t) {
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
function qp(t) {
  var e, n, r = t.length, i, s, o = new Array(r), l = new Array(r), u = 1 / 0, c = 1 / 0, a = -1 / 0, f = -1 / 0;
  for (n = 0; n < r; ++n)
    isNaN(i = +this._x.call(null, e = t[n])) || isNaN(s = +this._y.call(null, e)) || (o[n] = i, l[n] = s, i < u && (u = i), i > a && (a = i), s < c && (c = s), s > f && (f = s));
  if (u > a || c > f) return this;
  for (this.cover(u, c).cover(a, f), n = 0; n < r; ++n)
    _u(this, o[n], l[n], t[n]);
  return this;
}
function Gp(t, e) {
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
function Hp() {
  var t = [];
  return this.visit(function(e) {
    if (!e.length) do
      t.push(e.data);
    while (e = e.next);
  }), t;
}
function Up(t) {
  return arguments.length ? this.cover(+t[0][0], +t[0][1]).cover(+t[1][0], +t[1][1]) : isNaN(this._x0) ? void 0 : [[this._x0, this._y0], [this._x1, this._y1]];
}
function At(t, e, n, r, i) {
  this.node = t, this.x0 = e, this.y0 = n, this.x1 = r, this.y1 = i;
}
function Wp(t, e, n) {
  var r, i = this._x0, s = this._y0, o, l, u, c, a = this._x1, f = this._y1, h = [], p = this._root, w, v;
  for (p && h.push(new At(p, i, s, a, f)), n == null ? n = 1 / 0 : (i = t - n, s = e - n, a = t + n, f = e + n, n *= n); w = h.pop(); )
    if (!(!(p = w.node) || (o = w.x0) > a || (l = w.y0) > f || (u = w.x1) < i || (c = w.y1) < s))
      if (p.length) {
        var _ = (o + u) / 2, d = (l + c) / 2;
        h.push(
          new At(p[3], _, d, u, c),
          new At(p[2], o, d, _, c),
          new At(p[1], _, l, u, d),
          new At(p[0], o, l, _, d)
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
function Kp(t) {
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
function Xp(t) {
  for (var e = 0, n = t.length; e < n; ++e) this.remove(t[e]);
  return this;
}
function Yp() {
  return this._root;
}
function Jp() {
  var t = 0;
  return this.visit(function(e) {
    if (!e.length) do
      ++t;
    while (e = e.next);
  }), t;
}
function Qp(t) {
  var e = [], n, r = this._root, i, s, o, l, u;
  for (r && e.push(new At(r, this._x0, this._y0, this._x1, this._y1)); n = e.pop(); )
    if (!t(r = n.node, s = n.x0, o = n.y0, l = n.x1, u = n.y1) && r.length) {
      var c = (s + l) / 2, a = (o + u) / 2;
      (i = r[3]) && e.push(new At(i, c, a, l, u)), (i = r[2]) && e.push(new At(i, s, a, c, u)), (i = r[1]) && e.push(new At(i, c, o, l, a)), (i = r[0]) && e.push(new At(i, s, o, c, a));
    }
  return this;
}
function Zp(t) {
  var e = [], n = [], r;
  for (this._root && e.push(new At(this._root, this._x0, this._y0, this._x1, this._y1)); r = e.pop(); ) {
    var i = r.node;
    if (i.length) {
      var s, o = r.x0, l = r.y0, u = r.x1, c = r.y1, a = (o + u) / 2, f = (l + c) / 2;
      (s = i[0]) && e.push(new At(s, o, l, a, f)), (s = i[1]) && e.push(new At(s, a, l, u, f)), (s = i[2]) && e.push(new At(s, o, f, a, c)), (s = i[3]) && e.push(new At(s, a, f, u, c));
    }
    n.push(r);
  }
  for (; r = n.pop(); )
    t(r.node, r.x0, r.y0, r.x1, r.y1);
  return this;
}
function tg(t) {
  return t[0];
}
function eg(t) {
  return arguments.length ? (this._x = t, this) : this._x;
}
function ng(t) {
  return t[1];
}
function rg(t) {
  return arguments.length ? (this._y = t, this) : this._y;
}
function Ns(t, e, n) {
  var r = new Rs(e ?? tg, n ?? ng, NaN, NaN, NaN, NaN);
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
Bt.add = Vp;
Bt.addAll = qp;
Bt.cover = Gp;
Bt.data = Hp;
Bt.extent = Up;
Bt.find = Wp;
Bt.remove = Kp;
Bt.removeAll = Xp;
Bt.root = Yp;
Bt.size = Jp;
Bt.visit = Qp;
Bt.visitAfter = Zp;
Bt.x = eg;
Bt.y = rg;
function jt(t) {
  return function() {
    return t;
  };
}
function Fe(t) {
  return (t() - 0.5) * 1e-6;
}
function ig(t) {
  return t.x + t.vx;
}
function sg(t) {
  return t.y + t.vy;
}
function og(t) {
  var e, n, r, i = 1, s = 1;
  typeof t != "function" && (t = jt(t == null ? 1 : +t));
  function o() {
    for (var c, a = e.length, f, h, p, w, v, _, d = 0; d < s; ++d)
      for (f = Ns(e, ig, sg).visitAfter(l), c = 0; c < a; ++c)
        h = e[c], v = n[h.index], _ = v * v, p = h.x + h.vx, w = h.y + h.vy, f.visit(C);
    function C(P, y, k, L, z) {
      var H = P.data, Q = P.r, X = v + Q;
      if (H) {
        if (H.index > h.index) {
          var et = p - H.x - H.vx, ot = w - H.y - H.vy, W = et * et + ot * ot;
          W < X * X && (et === 0 && (et = Fe(r), W += et * et), ot === 0 && (ot = Fe(r), W += ot * ot), W = (X - (W = Math.sqrt(W))) / W * i, h.vx += (et *= W) * (X = (Q *= Q) / (_ + Q)), h.vy += (ot *= W) * X, H.vx -= et * (X = 1 - X), H.vy -= ot * X);
        }
        return;
      }
      return y > p + X || L < p - X || k > w + X || z < w - X;
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
function lg(t) {
  return t.index;
}
function $o(t, e) {
  var n = t.get(e);
  if (!n) throw new Error("node not found: " + e);
  return n;
}
function ug(t) {
  var e = lg, n = f, r, i = jt(30), s, o, l, u, c, a = 1;
  t == null && (t = []);
  function f(_) {
    return 1 / Math.min(l[_.source.index], l[_.target.index]);
  }
  function h(_) {
    for (var d = 0, C = t.length; d < a; ++d)
      for (var P = 0, y, k, L, z, H, Q, X; P < C; ++P)
        y = t[P], k = y.source, L = y.target, z = L.x + L.vx - k.x - k.vx || Fe(c), H = L.y + L.vy - k.y - k.vy || Fe(c), Q = Math.sqrt(z * z + H * H), Q = (Q - s[P]) / Q * _ * r[P], z *= Q, H *= Q, L.vx -= z * (X = u[P]), L.vy -= H * X, k.vx += z * (X = 1 - X), k.vy += H * X;
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
const cg = 1664525, ag = 1013904223, Oo = 4294967296;
function fg() {
  let t = 1;
  return () => (t = (cg * t + ag) % Oo) / Oo;
}
function hg(t) {
  return t.x;
}
function dg(t) {
  return t.y;
}
var pg = 10, gg = Math.PI * (3 - Math.sqrt(5));
function mg(t) {
  var e, n = 1, r = 1e-3, i = 1 - Math.pow(r, 1 / 300), s = 0, o = 0.6, l = /* @__PURE__ */ new Map(), u = Ss(f), c = Yn("tick", "end"), a = fg();
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
        var C = pg * Math.sqrt(0.5 + v), P = v * gg;
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
      var C = 0, P = t.length, y, k, L, z, H;
      for (d == null ? d = 1 / 0 : d *= d, C = 0; C < P; ++C)
        z = t[C], y = v - z.x, k = _ - z.y, L = y * y + k * k, L < d && (H = z, d = L);
      return H;
    },
    on: function(v, _) {
      return arguments.length > 1 ? (c.on(v, _), e) : c.on(v);
    }
  };
}
function wg() {
  var t, e, n, r, i = jt(-30), s, o = 1, l = 1 / 0, u = 0.81;
  function c(p) {
    var w, v = t.length, _ = Ns(t, hg, dg).visitAfter(f);
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
      return y < l && (d === 0 && (d = Fe(n), y += d * d), C === 0 && (C = Fe(n), y += C * C), y < o && (y = Math.sqrt(o * y)), e.vx += d * p.value * r / y, e.vy += C * p.value * r / y), !0;
    if (p.length || y >= l) return;
    (p.data !== e || p.next) && (d === 0 && (d = Fe(n), y += d * d), C === 0 && (C = Fe(n), y += C * C), y < o && (y = Math.sqrt(o * y)));
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
function yg(t) {
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
function _g(t) {
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
const Fo = Math.abs, Pt = Math.atan2, He = Math.cos, vg = Math.max, bi = Math.min, pe = Math.sin, un = Math.sqrt, Vt = 1e-12, Wn = Math.PI, Vr = Wn / 2, bg = 2 * Wn;
function xg(t) {
  return t > 1 ? 0 : t < -1 ? Wn : Math.acos(t);
}
function Ao(t) {
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
  }, () => new Dp(e);
}
function Eg(t) {
  return t.innerRadius;
}
function Sg(t) {
  return t.outerRadius;
}
function kg(t) {
  return t.startAngle;
}
function Mg(t) {
  return t.endAngle;
}
function Ng(t) {
  return t && t.padAngle;
}
function Rg(t, e, n, r, i, s, o, l) {
  var u = n - t, c = r - e, a = o - i, f = l - s, h = f * u - a * c;
  if (!(h * h < Vt))
    return h = (a * (e - s) - f * (t - i)) / h, [t + h * u, e + h * c];
}
function hr(t, e, n, r, i, s, o) {
  var l = t - n, u = e - r, c = (o ? s : -s) / un(l * l + u * u), a = c * u, f = -c * l, h = t + a, p = e + f, w = n + a, v = r + f, _ = (h + w) / 2, d = (p + v) / 2, C = w - h, P = v - p, y = C * C + P * P, k = i - s, L = h * v - w * p, z = (P < 0 ? -1 : 1) * un(vg(0, k * k * y - L * L)), H = (L * P - C * z) / y, Q = (-L * C - P * z) / y, X = (L * P + C * z) / y, et = (-L * C + P * z) / y, ot = H - _, W = Q - d, x = X - _, D = et - d;
  return ot * ot + W * W > x * x + D * D && (H = X, Q = et), {
    cx: H,
    cy: Q,
    x01: -a,
    y01: -f,
    x11: H * (i / k - 1),
    y11: Q * (i / k - 1)
  };
}
function Cg() {
  var t = Eg, e = Sg, n = Gt(0), r = null, i = kg, s = Mg, o = Ng, l = null, u = vu(c);
  function c() {
    var a, f, h = +t.apply(this, arguments), p = +e.apply(this, arguments), w = i.apply(this, arguments) - Vr, v = s.apply(this, arguments) - Vr, _ = Fo(v - w), d = v > w;
    if (l || (l = a = u()), p < h && (f = p, p = h, h = f), !(p > Vt)) l.moveTo(0, 0);
    else if (_ > bg - Vt)
      l.moveTo(p * He(w), p * pe(w)), l.arc(0, 0, p, w, v, !d), h > Vt && (l.moveTo(h * He(v), h * pe(v)), l.arc(0, 0, h, v, w, d));
    else {
      var C = w, P = v, y = w, k = v, L = _, z = _, H = o.apply(this, arguments) / 2, Q = H > Vt && (r ? +r.apply(this, arguments) : un(h * h + p * p)), X = bi(Fo(p - h) / 2, +n.apply(this, arguments)), et = X, ot = X, W, x;
      if (Q > Vt) {
        var D = Ao(Q / h * pe(H)), N = Ao(Q / p * pe(H));
        (L -= D * 2) > Vt ? (D *= d ? 1 : -1, y += D, k -= D) : (L = 0, y = k = (w + v) / 2), (z -= N * 2) > Vt ? (N *= d ? 1 : -1, C += N, P -= N) : (z = 0, C = P = (w + v) / 2);
      }
      var A = p * He(C), B = p * pe(C), Y = h * He(k), J = h * pe(k);
      if (X > Vt) {
        var it = p * He(P), lt = p * pe(P), St = h * He(y), pt = h * pe(y), gt;
        if (_ < Wn)
          if (gt = Rg(A, B, St, pt, it, lt, Y, J)) {
            var mt = A - gt[0], bt = B - gt[1], kt = it - gt[0], zt = lt - gt[1], Zt = 1 / pe(xg((mt * kt + bt * zt) / (un(mt * mt + bt * bt) * un(kt * kt + zt * zt))) / 2), he = un(gt[0] * gt[0] + gt[1] * gt[1]);
            et = bi(X, (h - he) / (Zt - 1)), ot = bi(X, (p - he) / (Zt + 1));
          } else
            et = ot = 0;
      }
      z > Vt ? ot > Vt ? (W = hr(St, pt, A, B, p, ot, d), x = hr(it, lt, Y, J, p, ot, d), l.moveTo(W.cx + W.x01, W.cy + W.y01), ot < X ? l.arc(W.cx, W.cy, ot, Pt(W.y01, W.x01), Pt(x.y01, x.x01), !d) : (l.arc(W.cx, W.cy, ot, Pt(W.y01, W.x01), Pt(W.y11, W.x11), !d), l.arc(0, 0, p, Pt(W.cy + W.y11, W.cx + W.x11), Pt(x.cy + x.y11, x.cx + x.x11), !d), l.arc(x.cx, x.cy, ot, Pt(x.y11, x.x11), Pt(x.y01, x.x01), !d))) : (l.moveTo(A, B), l.arc(0, 0, p, C, P, !d)) : l.moveTo(A, B), !(h > Vt) || !(L > Vt) ? l.lineTo(Y, J) : et > Vt ? (W = hr(Y, J, it, lt, h, -et, d), x = hr(A, B, St, pt, h, -et, d), l.lineTo(W.cx + W.x01, W.cy + W.y01), et < X ? l.arc(W.cx, W.cy, et, Pt(W.y01, W.x01), Pt(x.y01, x.x01), !d) : (l.arc(W.cx, W.cy, et, Pt(W.y01, W.x01), Pt(W.y11, W.x11), !d), l.arc(0, 0, h, Pt(W.cy + W.y11, W.cx + W.x11), Pt(x.cy + x.y11, x.cx + x.x11), d), l.arc(x.cx, x.cy, et, Pt(x.y11, x.x11), Pt(x.y01, x.x01), !d))) : l.arc(0, 0, h, k, y, d);
    }
    if (l.closePath(), a) return l = null, a + "" || null;
  }
  return c.centroid = function() {
    var a = (+t.apply(this, arguments) + +e.apply(this, arguments)) / 2, f = (+i.apply(this, arguments) + +s.apply(this, arguments)) / 2 - Wn / 2;
    return [He(f) * a, pe(f) * a];
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
function Tg(t) {
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
function Pg(t) {
  return new bu(t);
}
function Lg(t) {
  return t[0];
}
function Ig(t) {
  return t[1];
}
function $g(t, e) {
  var n = Gt(!0), r = null, i = Pg, s = null, o = vu(l);
  t = typeof t == "function" ? t : t === void 0 ? Lg : Gt(t), e = typeof e == "function" ? e : e === void 0 ? Ig : Gt(e);
  function l(u) {
    var c, a = (u = Tg(u)).length, f, h = !1, p;
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
function Og(t, {
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
function xe(t, e, n) {
  this.k = t, this.x = e, this.y = n;
}
xe.prototype = {
  constructor: xe,
  scale: function(t) {
    return t === 1 ? this : new xe(this.k * t, this.x, this.y);
  },
  translate: function(t, e) {
    return t === 0 & e === 0 ? this : new xe(this.k, this.x + this.k * t, this.y + this.k * e);
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
var xu = new xe(1, 0, 0);
xe.prototype;
function xi(t) {
  t.stopImmediatePropagation();
}
function Nn(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function Fg(t) {
  return (!t.ctrlKey || t.type === "wheel") && !t.button;
}
function Ag() {
  var t = this;
  return t instanceof SVGElement ? (t = t.ownerSVGElement || t, t.hasAttribute("viewBox") ? (t = t.viewBox.baseVal, [[t.x, t.y], [t.x + t.width, t.y + t.height]]) : [[0, 0], [t.width.baseVal.value, t.height.baseVal.value]]) : [[0, 0], [t.clientWidth, t.clientHeight]];
}
function jo() {
  return this.__zoom || xu;
}
function jg(t) {
  return -t.deltaY * (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 2e-3) * (t.ctrlKey ? 10 : 1);
}
function Bg() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function zg(t, e, n) {
  var r = t.invertX(e[0][0]) - n[0][0], i = t.invertX(e[1][0]) - n[1][0], s = t.invertY(e[0][1]) - n[0][1], o = t.invertY(e[1][1]) - n[1][1];
  return t.translate(
    i > r ? (r + i) / 2 : Math.min(0, r) || Math.max(0, i),
    o > s ? (s + o) / 2 : Math.min(0, s) || Math.max(0, o)
  );
}
function Dg() {
  var t = Fg, e = Ag, n = zg, r = jg, i = Bg, s = [0, 1 / 0], o = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], l = 250, u = Md, c = Yn("start", "zoom", "end"), a, f, h, p = 500, w = 150, v = 0, _ = 10;
  function d(x) {
    x.property("__zoom", jo).on("wheel.zoom", H, { passive: !1 }).on("mousedown.zoom", Q).on("dblclick.zoom", X).filter(i).on("touchstart.zoom", et).on("touchmove.zoom", ot).on("touchend.zoom touchcancel.zoom", W).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  d.transform = function(x, D, N, A) {
    var B = x.selection ? x.selection() : x;
    B.property("__zoom", jo), x !== B ? k(x, D, N, A) : B.interrupt().each(function() {
      L(this, arguments).event(A).start().zoom(null, typeof D == "function" ? D.apply(this, arguments) : D).end();
    });
  }, d.scaleBy = function(x, D, N, A) {
    d.scaleTo(x, function() {
      var B = this.__zoom.k, Y = typeof D == "function" ? D.apply(this, arguments) : D;
      return B * Y;
    }, N, A);
  }, d.scaleTo = function(x, D, N, A) {
    d.transform(x, function() {
      var B = e.apply(this, arguments), Y = this.__zoom, J = N == null ? y(B) : typeof N == "function" ? N.apply(this, arguments) : N, it = Y.invert(J), lt = typeof D == "function" ? D.apply(this, arguments) : D;
      return n(P(C(Y, lt), J, it), B, o);
    }, N, A);
  }, d.translateBy = function(x, D, N, A) {
    d.transform(x, function() {
      return n(this.__zoom.translate(
        typeof D == "function" ? D.apply(this, arguments) : D,
        typeof N == "function" ? N.apply(this, arguments) : N
      ), e.apply(this, arguments), o);
    }, null, A);
  }, d.translateTo = function(x, D, N, A, B) {
    d.transform(x, function() {
      var Y = e.apply(this, arguments), J = this.__zoom, it = A == null ? y(Y) : typeof A == "function" ? A.apply(this, arguments) : A;
      return n(xu.translate(it[0], it[1]).scale(J.k).translate(
        typeof D == "function" ? -D.apply(this, arguments) : -D,
        typeof N == "function" ? -N.apply(this, arguments) : -N
      ), Y, o);
    }, A, B);
  };
  function C(x, D) {
    return D = Math.max(s[0], Math.min(s[1], D)), D === x.k ? x : new xe(D, x.x, x.y);
  }
  function P(x, D, N) {
    var A = D[0] - N[0] * x.k, B = D[1] - N[1] * x.k;
    return A === x.x && B === x.y ? x : new xe(x.k, A, B);
  }
  function y(x) {
    return [(+x[0][0] + +x[1][0]) / 2, (+x[0][1] + +x[1][1]) / 2];
  }
  function k(x, D, N, A) {
    x.on("start.zoom", function() {
      L(this, arguments).event(A).start();
    }).on("interrupt.zoom end.zoom", function() {
      L(this, arguments).event(A).end();
    }).tween("zoom", function() {
      var B = this, Y = arguments, J = L(B, Y).event(A), it = e.apply(B, Y), lt = N == null ? y(it) : typeof N == "function" ? N.apply(B, Y) : N, St = Math.max(it[1][0] - it[0][0], it[1][1] - it[0][1]), pt = B.__zoom, gt = typeof D == "function" ? D.apply(B, Y) : D, mt = u(pt.invert(lt).concat(St / pt.k), gt.invert(lt).concat(St / gt.k));
      return function(bt) {
        if (bt === 1) bt = gt;
        else {
          var kt = mt(bt), zt = St / kt[2];
          bt = new xe(zt, lt[0] - kt[0] * zt, lt[1] - kt[1] * zt);
        }
        J.zoom(null, bt);
      };
    });
  }
  function L(x, D, N) {
    return !N && x.__zooming || new z(x, D);
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
      var D = xt(this.that).datum();
      c.call(
        x,
        this.that,
        new Og(x, {
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
  function H(x, ...D) {
    if (!t.apply(this, arguments)) return;
    var N = L(this, D).event(x), A = this.__zoom, B = Math.max(s[0], Math.min(s[1], A.k * Math.pow(2, r.apply(this, arguments)))), Y = ee(x);
    if (N.wheel)
      (N.mouse[0][0] !== Y[0] || N.mouse[0][1] !== Y[1]) && (N.mouse[1] = A.invert(N.mouse[0] = Y)), clearTimeout(N.wheel);
    else {
      if (A.k === B) return;
      N.mouse = [Y, A.invert(Y)], Nr(this), N.start();
    }
    Nn(x), N.wheel = setTimeout(J, w), N.zoom("mouse", n(P(C(A, B), N.mouse[0], N.mouse[1]), N.extent, o));
    function J() {
      N.wheel = null, N.end();
    }
  }
  function Q(x, ...D) {
    if (h || !t.apply(this, arguments)) return;
    var N = x.currentTarget, A = L(this, D, !0).event(x), B = xt(x.view).on("mousemove.zoom", lt, !0).on("mouseup.zoom", St, !0), Y = ee(x, N), J = x.clientX, it = x.clientY;
    iu(x.view), xi(x), A.mouse = [Y, this.__zoom.invert(Y)], Nr(this), A.start();
    function lt(pt) {
      if (Nn(pt), !A.moved) {
        var gt = pt.clientX - J, mt = pt.clientY - it;
        A.moved = gt * gt + mt * mt > v;
      }
      A.event(pt).zoom("mouse", n(P(A.that.__zoom, A.mouse[0] = ee(pt, N), A.mouse[1]), A.extent, o));
    }
    function St(pt) {
      B.on("mousemove.zoom mouseup.zoom", null), su(pt.view, A.moved), Nn(pt), A.event(pt).end();
    }
  }
  function X(x, ...D) {
    if (t.apply(this, arguments)) {
      var N = this.__zoom, A = ee(x.changedTouches ? x.changedTouches[0] : x, this), B = N.invert(A), Y = N.k * (x.shiftKey ? 0.5 : 2), J = n(P(C(N, Y), A, B), e.apply(this, D), o);
      Nn(x), l > 0 ? xt(this).transition().duration(l).call(k, J, A, x) : xt(this).call(d.transform, J, A, x);
    }
  }
  function et(x, ...D) {
    if (t.apply(this, arguments)) {
      var N = x.touches, A = N.length, B = L(this, D, x.changedTouches.length === A).event(x), Y, J, it, lt;
      for (xi(x), J = 0; J < A; ++J)
        it = N[J], lt = ee(it, this), lt = [lt, this.__zoom.invert(lt), it.identifier], B.touch0 ? !B.touch1 && B.touch0[2] !== lt[2] && (B.touch1 = lt, B.taps = 0) : (B.touch0 = lt, Y = !0, B.taps = 1 + !!a);
      a && (a = clearTimeout(a)), Y && (B.taps < 2 && (f = lt[0], a = setTimeout(function() {
        a = null;
      }, p)), Nr(this), B.start());
    }
  }
  function ot(x, ...D) {
    if (this.__zooming) {
      var N = L(this, D).event(x), A = x.changedTouches, B = A.length, Y, J, it, lt;
      for (Nn(x), Y = 0; Y < B; ++Y)
        J = A[Y], it = ee(J, this), N.touch0 && N.touch0[2] === J.identifier ? N.touch0[0] = it : N.touch1 && N.touch1[2] === J.identifier && (N.touch1[0] = it);
      if (J = N.that.__zoom, N.touch1) {
        var St = N.touch0[0], pt = N.touch0[1], gt = N.touch1[0], mt = N.touch1[1], bt = (bt = gt[0] - St[0]) * bt + (bt = gt[1] - St[1]) * bt, kt = (kt = mt[0] - pt[0]) * kt + (kt = mt[1] - pt[1]) * kt;
        J = C(J, Math.sqrt(bt / kt)), it = [(St[0] + gt[0]) / 2, (St[1] + gt[1]) / 2], lt = [(pt[0] + mt[0]) / 2, (pt[1] + mt[1]) / 2];
      } else if (N.touch0) it = N.touch0[0], lt = N.touch0[1];
      else return;
      N.zoom("touch", n(P(J, it, lt), N.extent, o));
    }
  }
  function W(x, ...D) {
    if (this.__zooming) {
      var N = L(this, D).event(x), A = x.changedTouches, B = A.length, Y, J;
      for (xi(x), h && clearTimeout(h), h = setTimeout(function() {
        h = null;
      }, p), Y = 0; Y < B; ++Y)
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
function Vg(t, e) {
  let n = Dg().filter((r) => {
    var i;
    return r.button === 0 || ((i = r.touches) == null ? void 0 : i.length) >= 2;
  });
  return qg(n, t, e);
}
function qg(t, e, n) {
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
function Gg(t, e) {
  const n = new CustomEvent("nodecreated", {
    detail: {
      node: { id: t.id, label: t.label, x: t.x, y: t.y }
    }
  });
  e.node().dispatchEvent(n);
}
function Hg(t, e) {
  const n = new CustomEvent("linkcreated", {
    detail: {
      link: { id: t.id, label: t.label }
    }
  });
  e.node().dispatchEvent(n);
}
function Ug(t, e, n) {
  const r = new CustomEvent("nodeclicked", {
    detail: {
      node: { id: t.id, label: t.label, x: t.x, y: t.y },
      button: e
    }
  });
  n.node().dispatchEvent(r);
}
function Wg(t, e, n) {
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
function Rn(t, e) {
  const n = new CustomEvent("linkdeleted", {
    detail: {
      link: { id: t.id, label: t.label }
    }
  });
  e.node().dispatchEvent(n);
}
function Kg(t, e, n) {
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
function Xg(t, e, n, r) {
  return Yh().filter(
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
function Yg(t, e, n, r, i) {
  const s = t.append("svg").attr("class", "graph-controller__graph-canvas").on("pointermove", (o) => n(o)).on("pointerup", (o) => r(o)).on("contextmenu", (o) => Kt(o)).on("dblclick", (o) => i(o)).call(e).on("dblclick.zoom", null).append("g");
  return s.append("rect").attr("width", "100%").attr("height", "100%").attr("fill", "white"), s;
}
var Yt = /* @__PURE__ */ ((t) => (t.LINE = "LINE", t.LINEREVERSE = "LINE-REVERSE", t.ARC = "ARC", t.ARCREVERSE = "ARC-REVERSE", t.REFLEXIVE = "REFLEXIVE", t))(Yt || {});
class Jg {
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
function Qg(t) {
  return t.append("g").classed("links", !0).selectAll("path");
}
function Zg(t) {
  return t.append("g").classed("nodes", !0).selectAll("circle");
}
function rn(t) {
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
  e !== void 0 && (typeof e == "boolean" ? e ? t.fixedPosition = { x: !0, y: !0 } : t.fixedPosition = { x: !1, y: !1 } : tm(["x", "y"], Object.keys(e)) && (t.fixedPosition = e, Ki(["x", "y"], Object.keys(e))));
}
function Kn(t) {
  return t.replace(/([#.,;:<>+~^$|[\]()%\\ ])/g, "\\$1");
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
    ) || (r = !1, Fn(
      `Option not valid: ${i}`,
      `Use the following: ${t.join(", ")}.`
    ));
  }), r;
}
function tm(t, e, n) {
  let r = !0, i = t.filter((s) => !e.includes(s));
  return i.length > 0 && (r = !1, Fn("Option missing", `Add: ${i}`)), r;
}
function Fn(t, e) {
  console.error(t + `
` + e);
}
function em(t, e, n, r) {
  if (An(t, n, e + "-link-arrow", "graph-controller__arrow", !1), An(
    t,
    n,
    e + "-link-arrow-reverse",
    "graph-controller__arrow",
    !0
  ), An(
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
  t.select(`#${e}-link-arrow-` + Kn(r)).empty() && (An(
    t,
    n,
    e + "-link-arrow-" + r,
    "graph-controller__arrow " + r,
    !1,
    r
  ), An(
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
function An(t, e, n, r, i, s) {
  t.append("defs").append("marker").attr("id", n).attr("viewBox", e.markerPath).attr("refX", e.markerRef).attr("refY", e.markerRef).attr("markerWidth", e.markerBoxSize).attr("markerHeight", e.markerBoxSize).attr("orient", i ? "auto-start-reverse" : "auto").classed(r, !0).append("path").attr("d", `${$g()(e.arrowPoints)}`).style("fill", s || "");
}
function nm(t) {
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
    const a = new Jg(
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
function rm(t, e, n, r, i) {
  let s = mg(t.nodes).on("tick", () => i()).force(
    "collision",
    og().radius(e.nodeRadius)
    //stop overlapping
  );
  return s = im(t, s, n, r, e), s = Su(s, t, e, e.fixedLinkDistanceEnabled), s = Eu(s, e.nodePhysicsEnabled, n, r), s;
}
function im(t, e, n, r, i) {
  return e.force("bounds", () => {
    for (const s of t.nodes)
      s.x = Math.max(i.nodeRadius, Math.min(n - i.nodeRadius, s.x)), s.y = Math.max(i.nodeRadius, Math.min(r - i.nodeRadius, s.y));
  });
}
function Eu(t, e, n, r) {
  return e ? t.force("charge", wg().strength(-500)).force("x", yg(n / 2).strength(0.05)).force("y", _g(r / 2).strength(0.05)) : t.force("charge", null).force("x", null).force("y", null);
}
function Su(t, e, n, r) {
  return r ? t.force(
    "link",
    ug().links(e.links).id((i) => i.id).distance(n.nodeRadius * 10)
  ) : t.force("link", null);
}
const sm = Object.prototype.toString;
function qr(t) {
  const e = sm.call(t);
  return e.endsWith("Array]") && !e.includes("Big");
}
function om(t) {
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
  var r = lm(t), i = om(t);
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
function um() {
  return Mu(this);
}
function Mu(t, e = {}) {
  const { maxRows: n = 15, maxColumns: r = 10, maxNumSize: i = 8 } = e;
  return `${t.constructor.name} {
${gr}[
${ku}${cm(t, n, r, i)}
${gr}]
${gr}rows: ${t.rows}
${gr}columns: ${t.columns}
}`;
}
function cm(t, e, n, r) {
  const { rows: i, columns: s } = t, o = Math.min(i, e), l = Math.min(s, n), u = [];
  for (let c = 0; c < o; c++) {
    let a = [];
    for (let f = 0; f < l; f++)
      a.push(am(t.get(c, f), r));
    u.push(`${a.join(" ")}`);
  }
  return l !== s && (u[u.length - 1] += ` ... ${s - n} more columns`), o !== i && u.push(`... ${i - e} more rows`), u.join(`
${ku}`);
}
function am(t, e) {
  const n = String(t);
  if (n.length <= e)
    return n.padEnd(e, " ");
  const r = t.toPrecision(e - 2);
  if (r.length <= e)
    return r;
  const i = t.toExponential(e - 2), s = i.indexOf("e"), o = i.slice(s);
  return i.slice(0, e - o.length) + o;
}
function fm(t, e) {
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
function on(t, e) {
  if (e.to1DArray && (e = e.to1DArray()), e.length !== t.columns)
    throw new RangeError(
      "vector size must be the same as the number of columns"
    );
  return e;
}
function ln(t, e) {
  if (e.to1DArray && (e = e.to1DArray()), e.length !== t.rows)
    throw new RangeError("vector size must be the same as the number of rows");
  return e;
}
function hm(t, e, n) {
  return {
    row: dm(t, e),
    column: pm(t, n)
  };
}
function dm(t, e) {
  if (typeof e != "object")
    throw new TypeError("unexpected type for row indices");
  if (e.some((r) => r < 0 || r >= t.rows))
    throw new RangeError("row indices are out of range");
  return Array.isArray(e) || (e = Array.from(e)), e;
}
function pm(t, e) {
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
function sn(t) {
  if (t.isEmpty())
    throw new Error("Empty matrix has no elements to index");
}
function gm(t) {
  let e = si(t.rows);
  for (let n = 0; n < t.rows; ++n)
    for (let r = 0; r < t.columns; ++r)
      e[n] += t.get(n, r);
  return e;
}
function mm(t) {
  let e = si(t.columns);
  for (let n = 0; n < t.rows; ++n)
    for (let r = 0; r < t.columns; ++r)
      e[r] += t.get(n, r);
  return e;
}
function wm(t) {
  let e = 0;
  for (let n = 0; n < t.rows; n++)
    for (let r = 0; r < t.columns; r++)
      e += t.get(n, r);
  return e;
}
function ym(t) {
  let e = si(t.rows, 1);
  for (let n = 0; n < t.rows; ++n)
    for (let r = 0; r < t.columns; ++r)
      e[n] *= t.get(n, r);
  return e;
}
function _m(t) {
  let e = si(t.columns, 1);
  for (let n = 0; n < t.rows; ++n)
    for (let r = 0; r < t.columns; ++r)
      e[r] *= t.get(n, r);
  return e;
}
function vm(t) {
  let e = 1;
  for (let n = 0; n < t.rows; n++)
    for (let r = 0; r < t.columns; r++)
      e *= t.get(n, r);
  return e;
}
function bm(t, e, n) {
  const r = t.rows, i = t.columns, s = [];
  for (let o = 0; o < r; o++) {
    let l = 0, u = 0, c = 0;
    for (let a = 0; a < i; a++)
      c = t.get(o, a) - n[o], l += c, u += c * c;
    e ? s.push((u - l * l / i) / (i - 1)) : s.push((u - l * l / i) / i);
  }
  return s;
}
function xm(t, e, n) {
  const r = t.rows, i = t.columns, s = [];
  for (let o = 0; o < i; o++) {
    let l = 0, u = 0, c = 0;
    for (let a = 0; a < r; a++)
      c = t.get(a, o) - n[o], l += c, u += c * c;
    e ? s.push((u - l * l / r) / (r - 1)) : s.push((u - l * l / r) / r);
  }
  return s;
}
function Em(t, e, n) {
  const r = t.rows, i = t.columns, s = r * i;
  let o = 0, l = 0, u = 0;
  for (let c = 0; c < r; c++)
    for (let a = 0; a < i; a++)
      u = t.get(c, a) - n, o += u, l += u * u;
  return e ? (l - o * o / s) / (s - 1) : (l - o * o / s) / s;
}
function Sm(t, e) {
  for (let n = 0; n < t.rows; n++)
    for (let r = 0; r < t.columns; r++)
      t.set(n, r, t.get(n, r) - e[n]);
}
function km(t, e) {
  for (let n = 0; n < t.rows; n++)
    for (let r = 0; r < t.columns; r++)
      t.set(n, r, t.get(n, r) - e[r]);
}
function Mm(t, e) {
  for (let n = 0; n < t.rows; n++)
    for (let r = 0; r < t.columns; r++)
      t.set(n, r, t.get(n, r) - e);
}
function Nm(t) {
  const e = [];
  for (let n = 0; n < t.rows; n++) {
    let r = 0;
    for (let i = 0; i < t.columns; i++)
      r += Math.pow(t.get(n, i), 2) / (t.columns - 1);
    e.push(Math.sqrt(r));
  }
  return e;
}
function Rm(t, e) {
  for (let n = 0; n < t.rows; n++)
    for (let r = 0; r < t.columns; r++)
      t.set(n, r, t.get(n, r) / e[n]);
}
function Cm(t) {
  const e = [];
  for (let n = 0; n < t.columns; n++) {
    let r = 0;
    for (let i = 0; i < t.rows; i++)
      r += Math.pow(t.get(i, n), 2) / (t.rows - 1);
    e.push(Math.sqrt(r));
  }
  return e;
}
function Tm(t, e) {
  for (let n = 0; n < t.rows; n++)
    for (let r = 0; r < t.columns; r++)
      t.set(n, r, t.get(n, r) / e[r]);
}
function Pm(t) {
  const e = t.size - 1;
  let n = 0;
  for (let r = 0; r < t.columns; r++)
    for (let i = 0; i < t.rows; i++)
      n += Math.pow(t.get(i, r), 2) / e;
  return Math.sqrt(n);
}
function Lm(t, e) {
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
    se(this, e), n = on(this, n);
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
    oe(this, e), n = ln(this, n);
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
    e = on(this, e);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, this.get(n, r) + e[r]);
    return this;
  }
  subRowVector(e) {
    e = on(this, e);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, this.get(n, r) - e[r]);
    return this;
  }
  mulRowVector(e) {
    e = on(this, e);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, this.get(n, r) * e[r]);
    return this;
  }
  divRowVector(e) {
    e = on(this, e);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, this.get(n, r) / e[r]);
    return this;
  }
  addColumnVector(e) {
    e = ln(this, e);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, this.get(n, r) + e[n]);
    return this;
  }
  subColumnVector(e) {
    e = ln(this, e);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, this.get(n, r) - e[n]);
    return this;
  }
  mulColumnVector(e) {
    e = ln(this, e);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, this.get(n, r) * e[n]);
    return this;
  }
  divColumnVector(e) {
    e = ln(this, e);
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
    sn(this);
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
    sn(this);
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
    se(this, e), sn(this);
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
    se(this, e), sn(this);
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
    oe(this, e), sn(this);
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
    oe(this, e), sn(this);
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
    const r = this.get(0, 0), i = this.get(0, 1), s = this.get(0, 2), o = this.get(1, 0), l = this.get(1, 1), u = this.get(1, 2), c = this.get(2, 0), a = this.get(2, 1), f = this.get(2, 2), h = e.get(0, 0), p = e.get(0, 1), w = e.get(0, 2), v = e.get(1, 0), _ = e.get(1, 1), d = e.get(1, 2), C = e.get(2, 0), P = e.get(2, 1), y = e.get(2, 2), k = (r + i + s - o - l - a - f) * _, L = (r - o) * (-p + _), z = l * (-h + p + v - _ - d - C + y), H = (-r + o + l) * (h - p + _), Q = (o + l) * (-h + p), X = r * h, et = (-r + c + a) * (h - w + d), ot = (-r + c) * (w - d), W = (c + a) * (-h + w), x = (r + i + s - l - u - c - a) * d, D = a * (-h + w + v - _ - d - C + P), N = (-s + a + f) * (_ + C - P), A = (s - f) * (_ - P), B = s * C, Y = (a + f) * (-C + P), J = (-s + l + u) * (d + C - y), it = (s - u) * (d - y), lt = (l + u) * (-C + y), St = i * v, pt = u * P, gt = o * w, mt = c * p, bt = f * y, kt = X + B + St, zt = k + H + Q + X + N + B + Y, Zt = X + et + W + x + B + J + lt, he = L + z + H + X + B + J + it, ze = L + H + Q + X + pt, m = B + J + it + lt + gt, b = X + et + ot + D + N + A + B, T = N + A + B + Y + mt, $ = X + et + ot + W + bt;
    return n.set(0, 0, kt), n.set(0, 1, zt), n.set(0, 2, Zt), n.set(1, 0, he), n.set(1, 1, ze), n.set(1, 2, m), n.set(2, 0, b), n.set(2, 1, T), n.set(2, 2, $), n;
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
      let v = parseInt(f.rows / 2, 10), _ = parseInt(f.columns / 2, 10), d = f.subMatrix(0, v - 1, 0, _ - 1), C = h.subMatrix(0, v - 1, 0, _ - 1), P = f.subMatrix(0, v - 1, _, f.columns - 1), y = h.subMatrix(0, v - 1, _, h.columns - 1), k = f.subMatrix(v, f.rows - 1, 0, _ - 1), L = h.subMatrix(v, h.rows - 1, 0, _ - 1), z = f.subMatrix(v, f.rows - 1, _, f.columns - 1), H = h.subMatrix(v, h.rows - 1, _, h.columns - 1), Q = a(
        at.add(d, z),
        at.add(C, H),
        v,
        _
      ), X = a(at.add(k, z), C, v, _), et = a(d, at.sub(y, H), v, _), ot = a(z, at.sub(L, C), v, _), W = a(at.add(d, P), H, v, _), x = a(
        at.sub(k, d),
        at.add(C, y),
        v,
        _
      ), D = a(
        at.sub(P, z),
        at.add(L, H),
        v,
        _
      ), N = at.add(Q, ot);
      N.sub(W), N.add(D);
      let A = at.add(et, W), B = at.add(X, ot), Y = at.sub(Q, X);
      Y.add(et), Y.add(x);
      let J = at.zeros(2 * N.rows, 2 * N.columns);
      return J = J.setSubMatrix(N, 0, 0), J = J.setSubMatrix(A, N.rows, 0), J = J.setSubMatrix(B, 0, N.columns), J = J.setSubMatrix(Y, N.rows, N.columns), J.subMatrix(0, p - 1, 0, w - 1);
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
    let r = hm(this, e, n), i = new st(e.length, n.length);
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
        return gm(this);
      case "column":
        return mm(this);
      case void 0:
        return wm(this);
      default:
        throw new Error(`invalid option: ${e}`);
    }
  }
  product(e) {
    switch (e) {
      case "row":
        return ym(this);
      case "column":
        return _m(this);
      case void 0:
        return vm(this);
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
        return bm(this, r, i);
      }
      case "column": {
        if (!Array.isArray(i))
          throw new TypeError("mean must be an array");
        return xm(this, r, i);
      }
      case void 0: {
        if (typeof i != "number")
          throw new TypeError("mean must be a number");
        return Em(this, r, i);
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
        return Sm(this, r), this;
      }
      case "column": {
        if (!Array.isArray(r))
          throw new TypeError("center must be an array");
        return km(this, r), this;
      }
      case void 0: {
        if (typeof r != "number")
          throw new TypeError("center must be a number");
        return Mm(this, r), this;
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
          r = Nm(this);
        else if (!Array.isArray(r))
          throw new TypeError("scale must be an array");
        return Rm(this, r), this;
      }
      case "column": {
        if (r === void 0)
          r = Cm(this);
        else if (!Array.isArray(r))
          throw new TypeError("scale must be an array");
        return Tm(this, r), this;
      }
      case void 0: {
        if (r === void 0)
          r = Pm(this);
        else if (typeof r != "number")
          throw new TypeError("scale must be a number");
        return Lm(this, r), this;
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
typeof Symbol < "u" && (at.prototype[Symbol.for("nodejs.util.inspect.custom")] = um);
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
    return n === void 0 && (n = e, e = this.rows), se(this, e, !0), n = Float64Array.from(on(this, n)), this.data.splice(e, 0, n), this.rows += 1, this;
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
    typeof n > "u" && (n = e, e = this.columns), oe(this, e, !0), n = ln(this, n);
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
fm(at, st);
var Im = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function $m(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var Nu = { exports: {} };
(function(t, e) {
  (function(n, r) {
    t.exports = r();
  })(Im, function() {
    function n(o) {
      o = o.replace(/,/g, " ").replace(/([^eE])-/g, "$1 -").replace(/\s*([achlmqstvzACHLMQSTVZ])\s*/g, " $1 ").replace(/\s+/g, " ").replace(/(\d*\.\d+([eE]-?\d+)?)((\.\d+)+)/g, (N, A, B, Y) => A + Y.replaceAll(".", " ."));
      var l = o.replace(/([achlmqstvzACHLMQSTVZ])\s?/g, "|$1").split("|"), u = l.length, c, a, f, h, p, w = [], v = [], _, d, C = 0, P = 0, y = 0, k = 0, L = 0, z = 0, H = 0, Q = 0, X = 0, et = 0, ot = 0, W = 0, x = 0, D = "";
      for (c = 1; c < u; c++) {
        if (a = l[c], f = a.substring(0, 1), h = f.toLowerCase(), w = a.replace(f, "").trim().split(" ").filter(function(N) {
          return N !== "";
        }), v = w, w = w.map(parseFloat), _ = w.length, h === "m") {
          if (D += "M ", f === "m" ? (y += w[0], k += w[1]) : (y = w[0], k = w[1]), C = y, P = k, D += y + " " + k + " ", _ > 2)
            for (d = 0; d < _; d += 2)
              f === "m" ? (y += w[d], k += w[d + 1]) : (y = w[d], k = w[d + 1]), D += "L " + y + " " + k + " ";
        } else if (h === "l")
          for (d = 0; d < _; d += 2)
            f === "l" ? (y += w[d], k += w[d + 1]) : (y = w[d], k = w[d + 1]), D += "L " + y + " " + k + " ";
        else if (h === "h")
          for (d = 0; d < _; d++)
            f === "h" ? y += w[d] : y = w[d], D += "L " + y + " " + k + " ";
        else if (h === "v")
          for (d = 0; d < _; d++)
            f === "v" ? k += w[d] : k = w[d], D += "L " + y + " " + k + " ";
        else if (h === "q")
          for (d = 0; d < _; d += 4)
            f === "q" ? (L = y + w[d], z = k + w[d + 1], y += w[d + 2], k += w[d + 3]) : (L = w[d], z = w[d + 1], y = w[d + 2], k = w[d + 3]), D += "Q " + L + " " + z + " " + y + " " + k + " ";
        else if (h === "t")
          for (d = 0; d < _; d += 2)
            ["t", "q"].indexOf(p) > -1 ? (L = y + (y - L), z = k + (k - z)) : (L = y, z = k), f === "t" ? (y += w[d], k += w[d + 1]) : (y = w[d], k = w[d + 1]), D += "Q " + L + " " + z + " " + y + " " + k + " ", p = h;
        else if (h === "c")
          for (d = 0; d < _; d += 6)
            f === "c" ? (L = y + w[d], z = k + w[d + 1], H = y + w[d + 2], Q = k + w[d + 3], y += w[d + 4], k += w[d + 5]) : (L = w[d], z = w[d + 1], H = w[d + 2], Q = w[d + 3], y = w[d + 4], k = w[d + 5]), D += "C " + L + " " + z + " " + H + " " + Q + " " + y + " " + k + " ";
        else if (h === "s")
          for (d = 0; d < _; d += 4)
            L = y, z = k, ["s", "c"].indexOf(p) > -1 && (L += y - H, z += k - Q), f === "s" ? (H = y + w[d], Q = k + w[d + 1], y += w[d + 2], k += w[d + 3]) : (H = w[d], Q = w[d + 1], y = w[d + 2], k = w[d + 3]), D += "C " + L + " " + z + " " + H + " " + Q + " " + y + " " + k + " ";
        else if (h === "a")
          for (d = 0; d < _; d += 7) {
            X = w[d], et = w[d + 1], ot = w[d + 2], W = v[d + 3];
            let N = !1;
            if (W.length > 1) {
              let A = parseInt(W[0]), B = parseInt(W[1]), Y;
              W.length > 2 && (Y = parseFloat(W.substring(2))), w[d + 3] = A, w.splice(d + 4, 0, B), v.splice(d + 4, 0, "+"), Y !== void 0 && w.splice(d + 5, 0, Y), N = !0;
            }
            W = w[d + 3], x = N ? w[d + 4] : v[d + 4], !N && x.length > 1 && (w[d + 4] = parseInt(x[0]), w.splice(d + 5, 0, parseFloat(x.substring(1)))), x = w[d + 4], f === "a" ? (y += w[d + 5], k += w[d + 6]) : (y = w[d + 5], k = w[d + 6]), D += "A " + X + " " + et + " " + ot + " " + W + " " + x + " " + y + " " + k + " ";
          }
        else h === "z" && (D += "Z ", y = C, k = P);
        p = h;
      }
      return D.trim();
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
      var k = "", L = h.length - 1, z;
      for (z = L; z > 0; z--)
        k += h[z] + " ";
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
var Om = Nu.exports;
const Go = /* @__PURE__ */ $m(Om);
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
function Am(t, e, n) {
  return t.id === e.id ? Yt.REFLEXIVE : n.hasBidirectionalConnection(t, e) ? Uo(t, e) ? Yt.ARCREVERSE : Yt.ARC : Uo(t, e) ? Yt.LINEREVERSE : Yt.LINE;
}
function Yi(t, e, n) {
  const r = e.x - t.x, i = e.y - t.y, s = Math.sqrt(r * r + i * i), o = r / s, l = i / s, u = t.x + (n.nodeRadius - 1) * o, c = t.y + (n.nodeRadius - 1) * l, a = e.x - n.markerPadding * o, f = e.y - n.markerPadding * l;
  return `M${u},${c}
          L${a},${f}`;
}
function Ji(t, e, n) {
  const r = new st([[t.x, t.y]]), i = new st([[e.x, e.y]]), s = st.subtract(i, r), o = s.norm("frobenius"), l = s.divide(o), u = Cu(10), c = gn(l, -u).multiply(n.nodeRadius - 1).add(r), a = st.multiply(l, -1), f = gn(a, u).multiply(n.nodeRadius).add(i).add(gn(a, u).multiply(2 * n.markerBoxSize)), h = 1.2 * o;
  return `M${c.get(0, 0)},${c.get(0, 1)}
          A${h},${h},0,0,1,${f.get(0, 0)},${f.get(0, 1)}`;
}
function Ru(t, e, n) {
  const r = new st([[t.x, t.y]]), i = new st([e]);
  r.get(0, 0) === i.get(0, 0) && r.get(0, 1) === i.get(0, 1) && i.add([[0, 1]]);
  const s = st.subtract(r, i), o = s.divide(s.norm("frobenius")), l = Cu(40), u = gn(o, l).multiply(n.nodeRadius - 1).add(r), c = gn(o, -l).multiply(n.nodeRadius).add(r).add(gn(o, -l).multiply(2 * n.markerBoxSize));
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
function gn(t, e) {
  const n = t.get(0, 0), r = t.get(0, 1);
  return new st([
    [
      n * Math.cos(e) - r * Math.sin(e),
      n * Math.sin(e) + r * Math.cos(e)
    ]
  ]);
}
class jm {
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
function Bm(t) {
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
function zm(t) {
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
const Dm = {
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
}, Nt = {
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
    return Dm[e];
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
const yt = /version\/(\d+(\.?_?\d+)+)/i, Vm = [
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
], qm = [
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
], Gm = [
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
        type: Nt.mobile,
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
        type: Nt.tablet,
        vendor: "Nexus"
      };
    }
  },
  /* iPad */
  {
    test: [/ipad/i],
    describe() {
      return {
        type: Nt.tablet,
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
        type: Nt.tablet,
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
        type: Nt.tablet,
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
        type: Nt.tablet,
        vendor: "Amazon"
      };
    }
  },
  /* Tablet */
  {
    test: [/tablet(?! pc)/i],
    describe() {
      return {
        type: Nt.tablet
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
        type: Nt.mobile,
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
        type: Nt.mobile,
        vendor: "Nexus"
      };
    }
  },
  /* Mobile */
  {
    test: [/[^-]mobi/i],
    describe() {
      return {
        type: Nt.mobile
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
        type: Nt.mobile,
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
        type: Nt.mobile
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
        type: Nt.mobile,
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
        type: Nt.tablet
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
        type: Nt.mobile
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
        type: Nt.desktop,
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
        type: Nt.desktop
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
        type: Nt.desktop
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
        type: Nt.tv
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
        type: Nt.tv
      };
    }
  }
], Hm = [
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
    const e = I.find(Vm, (n) => {
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
    const e = I.find(qm, (n) => {
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
    const e = I.find(Gm, (n) => {
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
    const e = I.find(Hm, (n) => {
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
class Um {
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
    return Nt;
  }
}
const Wm = /* @__PURE__ */ Xt("div", { class: "graph-controller__graph-host uninitialised" }, null, -1), Km = /* @__PURE__ */ ds({
  __name: "GraphComponent",
  setup(t, { expose: e }) {
    const n = Fi(() => {
      const g = document.querySelectorAll("graph-component");
      let S;
      for (let E = 0; E < g.length; E++) {
        const M = g[E], R = xt(M.shadowRoot);
        let F;
        if (R.empty() ? F = xt(
          ".graph-controller__graph-host.uninitialised"
        ) : F = R.select(
          ".graph-controller__graph-host.uninitialised"
        ), !F.empty()) {
          F.classed("uninitialised", !1), S = F;
          break;
        }
      }
      return S === void 0 && (S = xt(
        ".graph-controller__graph-host.uninitialised"
      ), S.classed("uninitialised", !1)), S;
    }), r = Fi(() => {
      let g = n.value.node().parentElement;
      g || (g = n.value.node().getRootNode().host);
      let S = g.getAttribute("id");
      return S || "gc";
    });
    Tl(() => {
      he();
    }), Pl(() => {
      ze(), window.addEventListener("resize", $s);
    }), ps(() => {
      window.removeEventListener("resize", $s);
    });
    const s = Um.getParser(window.navigator.userAgent).getPlatformType(!0);
    let o = !1;
    const l = Hs(new zo()), u = Hs(!1), c = Kr(new jm());
    let a, f = 400, h = 400, p, w, v, _, d, C, P, y, k, L = 0, z = 0, H = 1, Q, X;
    e({
      getGraph: et,
      setGraph: ot,
      printGraph: W,
      deleteNode: x,
      deleteLink: D,
      setLabel: N,
      setColor: A,
      setNodeRadius: B,
      setDeletable: Y,
      setLabelEditable: J,
      setNodesLinkPermission: it,
      setNodesFixedPosition: lt,
      setNodeEditability: St,
      setLinkEditability: pt,
      toggleNodeLabels: kt,
      toggleLinkLabels: bt,
      toggleZoom: zt,
      toggleNodePhysics: gt,
      toggleFixedLinkDistance: mt,
      toggleGraphEditingInGUI: Zt,
      resetView: xn
    });
    function et(g = "json", S = !0, E = !0, M = !0) {
      if (g.toLowerCase() === "json")
        return JSON.parse(
          l.value.toJSON(
            c.showLinkLabels,
            c.showLinkLabels,
            S,
            S,
            E,
            M,
            M
          )
        );
      if (g.toLowerCase() === "tgf")
        return l.value.toTGF(c.showNodeLabels, c.showLinkLabels, !0, !0);
      console.error('Invalid format while using getGraph(). Please choose "JSON" or "TGF".');
    }
    function ot(g) {
      typeof g == "object" || typeof g == "string" ? Iu(g) : Os();
    }
    function W(g = "json", S = !0, E = !0, M = !0) {
      g.toLowerCase() === "json" ? console.log(
        l.value.toJSON(
          c.showLinkLabels,
          c.showLinkLabels,
          S,
          S,
          E,
          M,
          M
        )
      ) : console.log(l.value.toTGF(c.showNodeLabels, c.showLinkLabels));
    }
    function x(g) {
      const S = Array.isArray(g) ? g : [g];
      for (const E of S)
        d.selectAll("circle").filter((M) => M.id === E).each(function(M) {
          let R = l.value.removeNode(M);
          if (R !== void 0) {
            let [F, Rt] = R;
            Ei(F, n.value), Rt.forEach((Ve) => {
              Rn(Ve, n.value);
            });
          }
        });
      u.value = l.value.nodes.length > 0;
    }
    function D(g) {
      const S = Array.isArray(g) ? g : [g];
      for (const E of S)
        _.selectAll("path").filter((M) => M.id === E).each(function(M) {
          let R = l.value.removeLink(M);
          R !== void 0 && Rn(R, n.value);
        });
    }
    function N(g, S) {
      if (S !== void 0) {
        const [E, M] = rn(S);
        for (const R of E)
          d.filter((F) => F.id === R).each((F) => {
            bn(F, g);
          });
        for (const R of M)
          _.filter((F) => F.id === R).each((F) => {
            bn(F, g);
          });
      } else
        d.each((E) => {
          bn(E, g);
        }), _.each((E) => {
          bn(E, g);
        });
    }
    function A(g, S) {
      if (S !== void 0) {
        const [E, M] = rn(S);
        Is(M);
        for (const R of E)
          d.selectAll("circle").filter((F) => F.id === R).each((F) => F.color = g).style("fill", g);
        for (const R of M)
          _.selectAll(".graph-controller__link").filter((F) => F.id === R).each((F) => F.color = g).style("stroke", g);
      } else
        d.selectAll("circle").each((E) => E.color = g).style("fill", g), Is(l.value.links.map((E) => E.id)), _.selectAll(".graph-controller__link").each((E) => E.color = g).style("stroke", g);
      Xi(v, r.value, c, g), G();
    }
    function B(g) {
      g > 0 ? (c.nodeRadius = g, xn()) : Fn("Invalid Radius", "The radius should be greater than zero.");
    }
    function Y(g, S) {
      if (S !== void 0) {
        const [E, M] = rn(S);
        for (const R of E)
          d.filter((F) => F.id === R).each((F) => {
            F.deletable = g;
          });
        for (const R of M)
          _.filter((F) => F.id === R).each((F) => {
            F.deletable = g;
          });
      } else
        d.each((E) => {
          E.deletable = g;
        }), _.each((E) => {
          E.deletable = g;
        });
    }
    function J(g, S) {
      if (S !== void 0) {
        const [E, M] = rn(S);
        for (const R of E)
          d.filter((F) => F.id === R).each((F) => {
            F.labelEditable = g;
          });
        for (const R of M)
          _.filter((F) => F.id === R).each((F) => {
            F.labelEditable = g;
          });
      } else
        d.each((E) => {
          E.labelEditable = g;
        }), _.each((E) => {
          E.labelEditable = g;
        });
    }
    function it(g, S, E) {
      if (E !== void 0) {
        const [M, R] = rn(E);
        for (const F of M)
          d.filter((Rt) => Rt.id === F).each((Rt) => {
            Rt.allowIncomingLinks = g, Rt.allowOutgoingLinks = S;
          });
      } else
        d.each((M) => {
          M.allowIncomingLinks = g, M.allowOutgoingLinks = S;
        });
    }
    function lt(g, S) {
      if (S !== void 0) {
        const [E, M] = rn(S);
        for (const R of E)
          d.filter((F) => F.id === R).each((F) => {
            pr(F, g);
          });
      } else
        d.each((E) => {
          pr(E, g);
        });
    }
    function St(g, S) {
      if (S !== void 0) {
        const M = (Array.isArray(S) ? S : [S]).map(Number);
        for (const R of M)
          d.selectAll("circle").filter((F) => F.id === R).each(function(F) {
            pr(F, g.fixedPosition), F.deletable = g.deletable ?? F.deletable, F.labelEditable = g.labelEditable ?? F.labelEditable, F.allowIncomingLinks = g.allowIncomingLinks ?? F.allowIncomingLinks, F.allowOutgoingLinks = g.allowOutgoingLinks ?? F.allowOutgoingLinks;
          });
      } else
        d.selectAll("circle").each(function(E) {
          pr(E, g.fixedPosition), E.deletable = g.deletable ?? E.deletable, E.labelEditable = g.labelEditable ?? E.labelEditable, E.allowIncomingLinks = g.allowIncomingLinks ?? E.allowIncomingLinks, E.allowOutgoingLinks = g.allowOutgoingLinks ?? E.allowOutgoingLinks;
        });
      Ki(
        ["fixedPosition", "deletable", "labelEditable", "allowIncomingLinks", "allowOutgoingLinks"],
        Object.keys(g)
      );
    }
    function pt(g, S) {
      if (S) {
        const E = Array.isArray(S) ? S : [S];
        for (const M of E)
          _.selectAll(".graph-controller__link").filter((R) => R.id === M).each(function(R) {
            R.deletable = g.deletable ?? R.deletable, R.labelEditable = g.labelEditable ?? R.labelEditable;
          });
      } else
        _.selectAll(".graph-controller__link").each(function(E) {
          E.deletable = g.deletable ?? E.deletable, E.labelEditable = g.labelEditable ?? E.labelEditable;
        });
      Ki(["deletable", "labelEditable"], Object.keys(g));
    }
    function gt(g) {
      c.nodePhysicsEnabled = g, Eu(a, g, f, h);
    }
    function mt(g) {
      c.fixedLinkDistanceEnabled = g, Su(a, l.value, c, g);
    }
    function bt(g) {
      c.showLinkLabels = g;
    }
    function kt(g) {
      c.showNodeLabels = g;
    }
    function zt(g) {
      c.zoomEnabled = g, xn();
    }
    function Zt(g) {
      c.isGraphEditableInGUI = g;
    }
    function he() {
      const g = (S) => S === "false" ? !1 : !!S;
      localStorage.showNodeLabels && (c.showNodeLabels = g(localStorage.showNodeLabels)), localStorage.enableNodePhysics && (c.nodePhysicsEnabled = g(localStorage.enableNodePhysics)), localStorage.showLinkLabels && (c.showLinkLabels = g(localStorage.showLinkLabels)), localStorage.enableFixedLinkDistance && (c.fixedLinkDistanceEnabled = g(localStorage.enableFixedLinkDistance)), localStorage.enableZoom && (c.zoomEnabled = g(localStorage.enableZoom)), localStorage.persistSettings && (c.persistSettingsLocalStorage = g(localStorage.persistSettings));
    }
    function ze() {
      f = n.value.node().clientWidth, h = n.value.node().clientHeight, p = Vg(
        (g) => m(g, c.zoomEnabled),
        c.zoomEnabled
      ), v = Yg(
        n.value,
        p,
        (g) => c.isGraphEditableInGUI ? _t(g) : null,
        (g) => c.isGraphEditableInGUI ? nt(g) : null,
        (g) => {
          c.isGraphEditableInGUI && T(
            ee(g, v.node())[0],
            ee(g, v.node())[1]
          );
        }
      ), em(v, r.value, c, l.value.getNonDefaultLinkColors()), C = nm(v), _ = Qg(v), d = Zg(v), a = rm(l.value, c, f, h, () => $()), w = Xg(a, f, h, c.nodeRadius), G();
    }
    function m(g, S = !0) {
      S && (L = g.transform.x, z = g.transform.y, H = g.transform.k, v.attr("transform", `translate(${L},${z})scale(${H})`));
    }
    function b(g, S, E, M, R = !0, F = !0) {
      let Rt = l.value.createLink(
        g.id,
        S.id,
        E,
        M,
        R,
        F
      );
      Rt !== void 0 && Hg(Rt, n.value), G();
    }
    function T(g, S, E, M, R, F = { x: !1, y: !1 }, Rt = !0, Ve = !0, En = !0, li = !0) {
      let Ou = l.value.createNode(
        g ?? f / 2,
        S ?? h / 2,
        E,
        M,
        R,
        F,
        Rt,
        Ve,
        En,
        li
      );
      Gg(Ou, n.value), u.value = !0, G();
    }
    function $() {
      d.attr("transform", (g) => `translate(${g.x},${g.y})`), _.selectAll("path").attr("d", (g) => (O(g), Fm(g, f, h, c))), U();
    }
    function O(g) {
      let S = g.pathType;
      g.pathType = Am(g.source, g.target, l.value), S !== g.pathType && G();
    }
    function q() {
      const g = P;
      if (g !== void 0) {
        const S = y;
        if (S !== void 0)
          C.attr("d", () => g.id === S.id ? Ru(g, [f / 2, h / 2], c) : l.value.hasBidirectionalConnection(g, S) ? Yi(g, S, c) : Ji(g, S, c));
        else if (k !== void 0) {
          const E = [g.x, g.y];
          C.attr("d", Ho(E, k));
        }
      }
    }
    function G(g = 0.5) {
      var S;
      _ = _.data(l.value.links, (E) => E.id).join(
        (E) => {
          const M = E.append("g").classed("graph-controller__link-container", !0);
          return M.append("path").classed("graph-controller__link", !0).style("stroke", (R) => R.color ? R.color : "").attr("id", (R) => r.value + "-link-" + R.id), M.append("path").classed("graph-controller__click-box", !0).on("dblclick", (R) => {
            Kt(R);
          }).on("pointerout", (R) => Ne(R)).on("pointerdown", (R, F) => {
            Wg(F, R.button, n.value), c.isGraphEditableInGUI && De(R, F);
          }).on("pointerup", (R, F) => {
            Zn(R, F);
          }), M.append("text").attr("class", (R) => {
            var F;
            return `graph-controller__${(F = R.pathType) == null ? void 0 : F.toLowerCase()}-path-text`;
          }).append("textPath").attr(
            "class",
            (R) => R.label ? "graph-controller__link-label" : "graph-controller__link-label-placeholder"
          ).attr("href", (R) => `#${r.value + "-link-" + R.id}`).text((R) => R.label ? R.label : "add label").on("click", (R, F) => {
            c.isGraphEditableInGUI && Ts(R, F);
          }).on("dblclick", (R) => {
            Kt(R);
          }), M.append("foreignObject").classed("graph-controller__link-label-mathjax-container", !0).attr("xmlns", "http://www.w3.org/2000/svg").attr("width", 1).attr("height", 1).html(
            (R) => `<div class=${R.label ? "graph-controller__link-label" : "graph-controller__link-label-placeholder"}>
                        </div>`
          ).on("click", (R, F) => {
            c.isGraphEditableInGUI && Ts(R, F);
          }).on("dblclick", (R) => {
            Kt(R);
          }), M;
        }
      ), _.selectChild("path").attr("marker-start", function(E) {
        var M;
        if ((M = E.pathType) != null && M.includes("REVERSE")) {
          let R = `url(#${r.value}-link-arrow-reverse`;
          return E.color && (R += "-" + Kn(E.color)), R += ")", R;
        } else
          return null;
      }).attr("marker-end", function(E) {
        var M;
        if ((M = E.pathType) != null && M.includes("REVERSE"))
          return null;
        {
          let R = `url(#${r.value}-link-arrow`;
          return E.color && (R += "-" + Kn(E.color)), R += ")", R;
        }
      }), _.selectChild("text").attr("class", (E) => {
        var M;
        return `graph-controller__${(M = E.pathType) == null ? void 0 : M.toLowerCase()}-path-text`;
      }).attr("dy", (E) => {
        var M;
        return E.pathType === Yt.REFLEXIVE ? 15 : E.pathType == Yt.LINEREVERSE ? -10 : (M = E.pathType) != null && M.includes("REVERSE") ? 20 : -10;
      }).selectChild("textPath").attr(
        "class",
        (E) => E.label ? "graph-controller__link-label" : "graph-controller__link-label-placeholder"
      ).classed("hidden", (E) => !c.showLinkLabels || !E.label && !E.labelEditable).classed("not-editable", !c.isGraphEditableInGUI).attr("startOffset", (E) => {
        var M;
        return (M = E.pathType) != null && M.includes("REVERSE") ? "46%" : "50%";
      }).text((E) => E.label ? E.label : "add label"), d = d.data(l.value.nodes, (E) => E.id).join(
        (E) => {
          const M = E.append("g").classed("graph-controller__node-container", !0).call(w).on("dblclick", (R) => {
            Kt(R);
          }).on("pointerenter", (R, F) => Mt(F)).on("pointerout", (R, F) => Dt(F)).on("pointerdown", (R, F) => {
            Ug(F, R.button, n.value), c.isGraphEditableInGUI && j(R, F);
          }).on("pointerup", (R, F) => {
            c.isGraphEditableInGUI && nt(R, F);
          });
          return M.append("circle").classed("graph-controller__node", !0).attr("id", (R) => `${r.value + "-node-" + R.id}`).attr("r", c.nodeRadius).style("fill", (R) => R.color ? R.color : ""), M.append("foreignObject").classed("graph-controller__node-label-container", !0).attr("xmlns", "http://www.w3.org/2000/svg").attr("width", 2 * c.nodeRadius).attr("height", 2 * c.nodeRadius).attr("x", -c.nodeRadius).attr("y", -c.nodeRadius).append("xhtml:div").on("click", (R, F) => {
            c.isGraphEditableInGUI && er(R, F);
          }).on("dblclick", (R) => {
            Kt(R);
          }).on("pointerenter", (R, F) => Mt(F)).on("pointerout", (R, F) => Dt(F)), M;
        },
        (E) => (E.selectChild("circle").attr("r", c.nodeRadius), E.selectChild("foreignObject").selectChild("div").classed(
          "hidden",
          (M) => !c.showNodeLabels || !M.label && !M.labelEditable
        ).classed("not-editable", !c.isGraphEditableInGUI), E)
      ), d.selectChild("foreignObject").selectChild("div").attr(
        "class",
        (E) => E.label ? "graph-controller__node-label" : "graph-controller__node-label-placeholder"
      ).text((E) => E.label ? E.label : "add label"), (S = window.MathJax) != null && S.version && window.MathJax.typesetPromise().then(() => {
        V();
      }), a.nodes(l.value.nodes), a.alpha(g).restart();
    }
    function V() {
      _.selectChild("text").selectChild("textPath").selectChild("mjx-container").each(function(g) {
        const S = this, E = g, M = xt(S.parentNode.parentNode.parentNode).selectChild("foreignObject").selectChild("div").attr("class", "graph-controller__link-label").classed(
          "hidden",
          !c.showLinkLabels || !E.label && !E.labelEditable
        ).node();
        M.replaceChild(S, M.childNodes[0]);
      }), _.selectChild("text").selectChild("textPath").each(function() {
        const g = this;
        let S = !1;
        g.childNodes.forEach((M) => {
          var R;
          (M == null ? void 0 : M.nodeType) === Node.TEXT_NODE && ((R = M == null ? void 0 : M.textContent) == null ? void 0 : R.trim()) !== "" && (S = !0);
        }), S || xt(g).text("I").attr("class", "graph-controller__link-label-placeholder mjx-hidden");
      }), U();
    }
    function U() {
      _.selectChild("text").selectChild("textPath").each(function() {
        const g = this, [S, E] = Ls(g);
        xt(g.parentNode.parentNode).select("foreignObject").attr("x", S).attr("y", E);
      });
    }
    function j(g, S) {
      (g.button === 2 || g.pointerType === "touch") && (Bo(g), S.allowOutgoingLinks && Z(S), S.deletable && (Q = setTimeout(() => {
        y = void 0, K(S);
      }, 250)));
    }
    function K(g) {
      let S = n.value.node().querySelector(`#${r.value + "-node-" + g.id}`);
      xt(S).classed("on-deletion", !0);
      let E = xt(S.parentElement);
      E.select("g.arc").remove();
      let M = Cg().outerRadius(c.nodeRadius + 4).innerRadius(c.nodeRadius), R = [{ startAngle: 0, endAngle: 0 }];
      E.append("g").attr("class", "arc").selectAll("path.arc").data(R).enter().append("path").attr("class", "arc").style("fill", "black").style("opacity", 0.7).transition().duration(750).ease($p).attrTween("d", function(Rt) {
        let Ve = { startAngle: 0, endAngle: 2 * Math.PI }, En = xs(Rt, Ve);
        return function(li) {
          return M(En(li));
        };
      }).on("end", () => tt(g));
    }
    function tt(g) {
      if (c.isGraphEditableInGUI) {
        let S = l.value.removeNode(g);
        if (S !== void 0) {
          let [E, M] = S;
          Ei(E, n.value), M.forEach((R) => {
            Rn(R, n.value);
          });
        }
        u.value = l.value.nodes.length > 0, oi(), G();
      }
    }
    function Z(g) {
      const S = [g.x, g.y];
      k = S, P = g, C.attr("marker-end", `url(#${r.value}-draggable-link-arrow)`).classed("hidden", !1).attr("d", Ho(S, S)), G();
    }
    function nt(g, S = void 0) {
      Kt(g), clearTimeout(Q), S && ct(S), dt();
    }
    function ct(g) {
      let S = n.value.node().querySelector(`#${r.value + "-node-" + g.id}`).parentElement, E = xt(S);
      E.select("circle").classed("on-deletion", !1), E.select("g.arc").select("path.arc").interrupt().remove();
    }
    function dt() {
      const g = P, S = y;
      oi(), !(g === void 0 || S === void 0) && b(g, S);
    }
    function _t(g) {
      if (Kt(g), P !== void 0) {
        const S = Gh(g, n.value.node())[0];
        k = [(S[0] - L) / H, (S[1] - z) / H], q();
      }
    }
    function Mt(g) {
      g.allowIncomingLinks && (y = g);
    }
    function Dt(g) {
      g && ct(g), y = void 0, clearTimeout(Q);
    }
    function Ne(g) {
      Kt(g), clearTimeout(X);
    }
    function Zn(g, S) {
      Kt(g), clearTimeout(X), (g.button === 2 || g.pointerType === "touch") && S.deletable && te(S);
    }
    function De(g, S) {
      (g.button === 2 || g.pointerType === "touch") && (Bo(g), S.deletable && (X = setTimeout(() => {
        tr(S);
      }, 250)));
    }
    function tr(g) {
      let S = n.value.node().querySelector(`#${r.value + "-link-" + g.id}`);
      if (xt(S).classed("on-deletion", !0), S instanceof SVGPathElement) {
        let E = xt(S), M = S.getTotalLength(), R = S.parentElement.querySelector("text"), F = Array.from(R.classList).some(
          (En) => En.includes("reverse")
        ), Rt = 0, Ve = F ? M : -M;
        E.attr("stroke-dasharray", M).attr("stroke-dashoffset", Rt).transition().duration(750).attr("stroke-dashoffset", Ve).on("end", () => It(g));
      }
    }
    function It(g) {
      let S = g.color;
      if (c.isGraphEditableInGUI) {
        let E = l.value.removeLink(g);
        E !== void 0 && Rn(E, n.value), S && (l.value.hasNonDefaultLinkColor(S) || Si(v, r.value, S));
      }
      G();
    }
    function te(g) {
      let S = n.value.node().querySelector(`#${r.value + "-link-" + g.id}`);
      if (xt(S).classed("on-deletion") && S instanceof SVGPathElement) {
        let E = xt(S), M = S.getTotalLength();
        E.attr("stroke-dasharray", M).attr("stroke-dashoffset", M).transition().attr("stroke-dashoffset", 0).on("end", () => {
          E.attr("stroke-dasharray", null).attr("stroke-dashoffset", null);
        });
      }
      xt(S).classed("on-deletion", !1);
    }
    function er(g, S) {
      Kt(g), S.labelEditable && Ps(S, [S.x, S.y]);
    }
    function Ts(g, S) {
      if (S.labelEditable) {
        let E = g.target, M;
        E.nodeName === "textPath" ? M = E : M = E.closest(".graph-controller__link-container").querySelector("textPath");
        let R = Ls(M);
        Ps(S, R);
      }
    }
    function Ps(g, S) {
      let E = g instanceof Wi ? "node" : "link";
      const M = document.createElement("input");
      M.setAttribute("class", "graph-controller__label-input"), M.setAttribute("id", `${E}-label-input-field`), g.label == null ? M.value = "" : M.value = g.label, M.placeholder = `Enter ${E} label`;
      const R = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
      R.setAttribute("width", "100%"), R.setAttribute("height", "100%"), R.setAttribute("x", `${S[0] - 90}`), R.setAttribute("y", `${S[1] - 12}`), R.append(M), n.value.select("svg").select("g").node().append(R), M.focus(), s !== "desktop" && (o = !0), M.ondblclick = function(Rt) {
        Kt(Rt);
      };
      let F = !1;
      M.onkeyup = function(Rt) {
        Rt.key === "Enter" ? (F = !0, M.blur()) : Rt.key === "Escape" && (M.value = "", M.blur());
      }, M.onblur = function() {
        F && bn(g, M.value.trim()), R.remove(), s !== "desktop" && (o = !1);
      };
    }
    function bn(g, S) {
      Kg(g, S, n.value), g.label = S, G();
      let E = g instanceof Wi ? "node" : "link";
      E === "link" ? Pu(g) : E === "node" && S !== "" && Lu(g);
    }
    function Pu(g) {
      var E;
      const S = n.value.node().querySelector(
        `#${r.value + "-link-" + g.id}`
      ).parentElement;
      (E = S.querySelector("mjx-container")) == null || E.remove(), S.querySelector("div").setAttribute("class", "graph-controller__link-label-placeholder"), G();
    }
    function Lu(g) {
      const S = n.value.node().querySelector(`#${r.value + "-node-" + g.id}`).parentElement;
      if (S) {
        const E = S.parentElement;
        S.remove(), E.append(S);
      }
    }
    function Ls(g) {
      let S = n.value.select("svg").node().getBoundingClientRect(), E = g.getBoundingClientRect(), M = (E.x - S.x - L) / H, R = (E.y - S.y - z) / H;
      return [M, R];
    }
    function oi() {
      C == null || C.classed("hidden", !0).attr("marker-end", "null"), P = void 0, y = void 0, k = void 0;
    }
    function Iu(g) {
      let S, E;
      try {
        if (typeof g == "string")
          [S, E] = Bm(g);
        else if (typeof g == "object")
          [S, E] = zm(g);
        else {
          Fn("Invalid graph import type:", "Must either be TGF or JSON.");
          return;
        }
      } catch (M) {
        Fn("Error during parsing:", `Invalid data format:
` + M);
        return;
      }
      Os(), $u(S, E);
    }
    function $u(g, S) {
      for (let M of g)
        T(
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
      const E = (M) => l.value.nodes.find((R) => R.idImported === M);
      for (let M of S) {
        let R = E(M.sourceIdImported), F = E(M.targetIdImported);
        R && F && (b(
          R,
          F,
          M.label,
          M.color,
          M.deletable,
          M.labelEditable
        ), M.color && Xi(v, r.value, c, M.color));
      }
    }
    function Is(g) {
      for (let S of g) {
        const E = l.value.links.filter((M) => M.id === S).map((M) => M.color).shift();
        E && (l.value.hasNonDefaultLinkColor(E, S) ? l.value.getLinkIdsWithNonDefaultLinkColors(
          E,
          S
        ).every(
          (F) => g.includes(F)
        ) && Si(v, r.value, E) : Si(v, r.value, E));
      }
    }
    function xn() {
      a.stop(), n.value.selectChildren().remove(), p = void 0, L = 0, z = 0, H = 1, v = void 0, C = void 0, _ = void 0, d = void 0, a = void 0, oi(), he(), ze();
    }
    function $s() {
      o || xn();
    }
    function Os() {
      l.value.links.forEach((g) => Rn(g, n.value)), l.value.nodes.forEach((g) => Ei(g, n.value)), l.value = new zo(), u.value = !1, xn();
    }
    return (g, S) => (Te(), Pe(ne, null, [
      Wm,
      yr(Xt("div", null, [
        ye(uf, {
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
const Xm = (() => {
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
function Ym(t, e, n) {
  const r = /* @__PURE__ */ ds(t);
  class i extends Cs {
    constructor(o) {
      super(r, o, e, n);
    }
  }
  return wt(i, "def", r), i;
}
const Jm = typeof HTMLElement < "u" ? Xm : class {
};
class Cs extends Jm {
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
          (a === Number || a && a.type === Number) && (c in this._props && (this._props[c] = Fs(this._props[c])), (u || (u = /* @__PURE__ */ Object.create(null)))[Ee(c)] = !0);
        }
      this._numberProps = u, s && this._resolveProps(i), this._config.shadowRoot || (this._slots = Array.from(this.children).map((c) => c.cloneNode(!0)), this.replaceChildren()), this._applyStyles(l), this._update();
    }, r = this._def.__asyncLoader;
    r ? r().then((i) => n(i, !0)) : n(this._def);
  }
  _resolveProps(n) {
    const { props: r } = n, i = rt(r) ? r : Object.keys(r || {});
    for (const s of Object.keys(this))
      s[0] !== "_" && i.includes(s) && this._setProp(s, this[s], !0, !1);
    for (const s of i.map(Ee))
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
    const i = Ee(n);
    this._numberProps && this._numberProps[i] && (r = Fs(r)), this._setProp(i, r, !1);
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
        return o.innerHTML = s.innerHTML, ye(s.tagName, o, null);
      });
    });
    const r = ye(this._def, Ct({}, this._props), n);
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
  /* @__PURE__ */ Ym(Km, { shadowRoot: !1 })
  // With ShadowRoot without LaTeX
  // defineCustomElement(GraphEditor)
  /* for switching off the LaTeX control info background, in the graph editor template
  in the graph controls tag you can use :show-latex-info="true" */
);
