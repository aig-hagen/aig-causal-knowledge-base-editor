var ba = Object.defineProperty;
var xa = (t, e, n) => e in t ? ba(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var Nt = (t, e, n) => xa(t, typeof e != "symbol" ? e + "" : e, n);
/**
* @vue/shared v3.5.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function ms(t) {
  const e = /* @__PURE__ */ Object.create(null);
  for (const n of t.split(",")) e[n] = 1;
  return (n) => n in e;
}
const vt = {}, Mn = [], Pe = () => {
}, dl = () => !1, fi = (t) => t.charCodeAt(0) === 111 && t.charCodeAt(1) === 110 && // uppercase letter
(t.charCodeAt(2) > 122 || t.charCodeAt(2) < 97), ws = (t) => t.startsWith("onUpdate:"), Pt = Object.assign, ys = (t, e) => {
  const n = t.indexOf(e);
  n > -1 && t.splice(n, 1);
}, Ea = Object.prototype.hasOwnProperty, pt = (t, e) => Ea.call(t, e), ot = Array.isArray, Tn = (t) => hi(t) === "[object Map]", pl = (t) => hi(t) === "[object Set]", at = (t) => typeof t == "function", Lt = (t) => typeof t == "string", nn = (t) => typeof t == "symbol", Mt = (t) => t !== null && typeof t == "object", gl = (t) => (Mt(t) || at(t)) && at(t.then) && at(t.catch), ml = Object.prototype.toString, hi = (t) => ml.call(t), Sa = (t) => hi(t).slice(8, -1), di = (t) => hi(t) === "[object Object]", _s = (t) => Lt(t) && t !== "NaN" && t[0] !== "-" && "" + parseInt(t, 10) === t, Yn = /* @__PURE__ */ ms(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), pi = (t) => {
  const e = /* @__PURE__ */ Object.create(null);
  return (n) => e[n] || (e[n] = t(n));
}, ka = /-\w/g, Ee = pi(
  (t) => t.replace(ka, (e) => e.slice(1).toUpperCase())
), Ma = /\B([A-Z])/g, ge = pi(
  (t) => t.replace(Ma, "-$1").toLowerCase()
), wl = pi((t) => t.charAt(0).toUpperCase() + t.slice(1)), Ci = pi(
  (t) => t ? `on${wl(t)}` : ""
), tn = (t, e) => !Object.is(t, e), Ni = (t, ...e) => {
  for (let n = 0; n < t.length; n++)
    t[n](...e);
}, yl = (t, e, n, r = !1) => {
  Object.defineProperty(t, e, {
    configurable: !0,
    enumerable: !1,
    writable: r,
    value: n
  });
}, Ta = (t) => {
  const e = parseFloat(t);
  return isNaN(e) ? t : e;
}, no = (t) => {
  const e = Lt(t) ? Number(t) : NaN;
  return isNaN(e) ? t : e;
};
let ro;
const gi = () => ro || (ro = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function vs(t) {
  if (ot(t)) {
    const e = {};
    for (let n = 0; n < t.length; n++) {
      const r = t[n], i = Lt(r) ? La(r) : vs(r);
      if (i)
        for (const s in i)
          e[s] = i[s];
    }
    return e;
  } else if (Lt(t) || Mt(t))
    return t;
}
const Ca = /;(?![^(]*\))/g, Na = /:([^]+)/, Ra = /\/\*[^]*?\*\//g;
function La(t) {
  const e = {};
  return t.replace(Ra, "").split(Ca).forEach((n) => {
    if (n) {
      const r = n.split(Na);
      r.length > 1 && (e[r[0].trim()] = r[1].trim());
    }
  }), e;
}
function bs(t) {
  let e = "";
  if (Lt(t))
    e = t;
  else if (ot(t))
    for (let n = 0; n < t.length; n++) {
      const r = bs(t[n]);
      r && (e += r + " ");
    }
  else if (Mt(t))
    for (const n in t)
      t[n] && (e += n + " ");
  return e.trim();
}
const Pa = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Oa = /* @__PURE__ */ ms(Pa);
function _l(t) {
  return !!t || t === "";
}
const vl = (t) => !!(t && t.__v_isRef === !0), je = (t) => Lt(t) ? t : t == null ? "" : ot(t) || Mt(t) && (t.toString === ml || !at(t.toString)) ? vl(t) ? je(t.value) : JSON.stringify(t, bl, 2) : String(t), bl = (t, e) => vl(e) ? bl(t, e.value) : Tn(e) ? {
  [`Map(${e.size})`]: [...e.entries()].reduce(
    (n, [r, i], s) => (n[Ri(r, s) + " =>"] = i, n),
    {}
  )
} : pl(e) ? {
  [`Set(${e.size})`]: [...e.values()].map((n) => Ri(n))
} : nn(e) ? Ri(e) : Mt(e) && !ot(e) && !di(e) ? String(e) : e, Ri = (t, e = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    nn(t) ? `Symbol(${(n = t.description) != null ? n : e})` : t
  );
};
/**
* @vue/reactivity v3.5.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let Qt;
class Ia {
  constructor(e = !1) {
    this.detached = e, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.parent = Qt, !e && Qt && (this.index = (Qt.scopes || (Qt.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = !0;
      let e, n;
      if (this.scopes)
        for (e = 0, n = this.scopes.length; e < n; e++)
          this.scopes[e].pause();
      for (e = 0, n = this.effects.length; e < n; e++)
        this.effects[e].pause();
    }
  }
  /**
   * Resumes the effect scope, including all child scopes and effects.
   */
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1;
      let e, n;
      if (this.scopes)
        for (e = 0, n = this.scopes.length; e < n; e++)
          this.scopes[e].resume();
      for (e = 0, n = this.effects.length; e < n; e++)
        this.effects[e].resume();
    }
  }
  run(e) {
    if (this._active) {
      const n = Qt;
      try {
        return Qt = this, e();
      } finally {
        Qt = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = Qt, Qt = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    this._on > 0 && --this._on === 0 && (Qt = this.prevScope, this.prevScope = void 0);
  }
  stop(e) {
    if (this._active) {
      this._active = !1;
      let n, r;
      for (n = 0, r = this.effects.length; n < r; n++)
        this.effects[n].stop();
      for (this.effects.length = 0, n = 0, r = this.cleanups.length; n < r; n++)
        this.cleanups[n]();
      if (this.cleanups.length = 0, this.scopes) {
        for (n = 0, r = this.scopes.length; n < r; n++)
          this.scopes[n].stop(!0);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !e) {
        const i = this.parent.scopes.pop();
        i && i !== this && (this.parent.scopes[this.index] = i, i.index = this.index);
      }
      this.parent = void 0;
    }
  }
}
function $a() {
  return Qt;
}
let Et;
const Li = /* @__PURE__ */ new WeakSet();
class xl {
  constructor(e) {
    this.fn = e, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, Qt && Qt.active && Qt.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Li.has(this) && (Li.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Sl(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, io(this), kl(this);
    const e = Et, n = Se;
    Et = this, Se = !0;
    try {
      return this.fn();
    } finally {
      Ml(this), Et = e, Se = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let e = this.deps; e; e = e.nextDep)
        Ss(e);
      this.deps = this.depsTail = void 0, io(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Li.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    Ui(this) && this.run();
  }
  get dirty() {
    return Ui(this);
  }
}
let El = 0, Jn, Qn;
function Sl(t, e = !1) {
  if (t.flags |= 8, e) {
    t.next = Qn, Qn = t;
    return;
  }
  t.next = Jn, Jn = t;
}
function xs() {
  El++;
}
function Es() {
  if (--El > 0)
    return;
  if (Qn) {
    let e = Qn;
    for (Qn = void 0; e; ) {
      const n = e.next;
      e.next = void 0, e.flags &= -9, e = n;
    }
  }
  let t;
  for (; Jn; ) {
    let e = Jn;
    for (Jn = void 0; e; ) {
      const n = e.next;
      if (e.next = void 0, e.flags &= -9, e.flags & 1)
        try {
          e.trigger();
        } catch (r) {
          t || (t = r);
        }
      e = n;
    }
  }
  if (t) throw t;
}
function kl(t) {
  for (let e = t.deps; e; e = e.nextDep)
    e.version = -1, e.prevActiveLink = e.dep.activeLink, e.dep.activeLink = e;
}
function Ml(t) {
  let e, n = t.depsTail, r = n;
  for (; r; ) {
    const i = r.prevDep;
    r.version === -1 ? (r === n && (n = i), Ss(r), Aa(r)) : e = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = i;
  }
  t.deps = e, t.depsTail = n;
}
function Ui(t) {
  for (let e = t.deps; e; e = e.nextDep)
    if (e.dep.version !== e.version || e.dep.computed && (Tl(e.dep.computed) || e.dep.version !== e.version))
      return !0;
  return !!t._dirty;
}
function Tl(t) {
  if (t.flags & 4 && !(t.flags & 16) || (t.flags &= -17, t.globalVersion === sr) || (t.globalVersion = sr, !t.isSSR && t.flags & 128 && (!t.deps && !t._dirty || !Ui(t))))
    return;
  t.flags |= 2;
  const e = t.dep, n = Et, r = Se;
  Et = t, Se = !0;
  try {
    kl(t);
    const i = t.fn(t._value);
    (e.version === 0 || tn(i, t._value)) && (t.flags |= 128, t._value = i, e.version++);
  } catch (i) {
    throw e.version++, i;
  } finally {
    Et = n, Se = r, Ml(t), t.flags &= -3;
  }
}
function Ss(t, e = !1) {
  const { dep: n, prevSub: r, nextSub: i } = t;
  if (r && (r.nextSub = i, t.prevSub = void 0), i && (i.prevSub = r, t.nextSub = void 0), n.subs === t && (n.subs = r, !r && n.computed)) {
    n.computed.flags &= -5;
    for (let s = n.computed.deps; s; s = s.nextDep)
      Ss(s, !0);
  }
  !e && !--n.sc && n.map && n.map.delete(n.key);
}
function Aa(t) {
  const { prevDep: e, nextDep: n } = t;
  e && (e.nextDep = n, t.prevDep = void 0), n && (n.prevDep = e, t.nextDep = void 0);
}
let Se = !0;
const Cl = [];
function He() {
  Cl.push(Se), Se = !1;
}
function qe() {
  const t = Cl.pop();
  Se = t === void 0 ? !0 : t;
}
function io(t) {
  const { cleanup: e } = t;
  if (t.cleanup = void 0, e) {
    const n = Et;
    Et = void 0;
    try {
      e();
    } finally {
      Et = n;
    }
  }
}
let sr = 0;
class Fa {
  constructor(e, n) {
    this.sub = e, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class ks {
  // TODO isolatedDeclarations "__v_skip"
  constructor(e) {
    this.computed = e, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(e) {
    if (!Et || !Se || Et === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== Et)
      n = this.activeLink = new Fa(Et, this), Et.deps ? (n.prevDep = Et.depsTail, Et.depsTail.nextDep = n, Et.depsTail = n) : Et.deps = Et.depsTail = n, Nl(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const r = n.nextDep;
      r.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = r), n.prevDep = Et.depsTail, n.nextDep = void 0, Et.depsTail.nextDep = n, Et.depsTail = n, Et.deps === n && (Et.deps = r);
    }
    return n;
  }
  trigger(e) {
    this.version++, sr++, this.notify(e);
  }
  notify(e) {
    xs();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      Es();
    }
  }
}
function Nl(t) {
  if (t.dep.sc++, t.sub.flags & 4) {
    const e = t.dep.computed;
    if (e && !t.dep.subs) {
      e.flags |= 20;
      for (let r = e.deps; r; r = r.nextDep)
        Nl(r);
    }
    const n = t.dep.subs;
    n !== t && (t.prevSub = n, n && (n.nextSub = t)), t.dep.subs = t;
  }
}
const Ki = /* @__PURE__ */ new WeakMap(), pn = Symbol(
  ""
), Xi = Symbol(
  ""
), or = Symbol(
  ""
);
function Bt(t, e, n) {
  if (Se && Et) {
    let r = Ki.get(t);
    r || Ki.set(t, r = /* @__PURE__ */ new Map());
    let i = r.get(n);
    i || (r.set(n, i = new ks()), i.map = r, i.key = n), i.track();
  }
}
function De(t, e, n, r, i, s) {
  const o = Ki.get(t);
  if (!o) {
    sr++;
    return;
  }
  const l = (u) => {
    u && u.trigger();
  };
  if (xs(), e === "clear")
    o.forEach(l);
  else {
    const u = ot(t), c = u && _s(n);
    if (u && n === "length") {
      const a = Number(r);
      o.forEach((f, h) => {
        (h === "length" || h === or || !nn(h) && h >= a) && l(f);
      });
    } else
      switch ((n !== void 0 || o.has(void 0)) && l(o.get(n)), c && l(o.get(or)), e) {
        case "add":
          u ? c && l(o.get("length")) : (l(o.get(pn)), Tn(t) && l(o.get(Xi)));
          break;
        case "delete":
          u || (l(o.get(pn)), Tn(t) && l(o.get(Xi)));
          break;
        case "set":
          Tn(t) && l(o.get(pn));
          break;
      }
  }
  Es();
}
function yn(t) {
  const e = gt(t);
  return e === t ? e : (Bt(e, "iterate", or), we(t) ? e : e.map($t));
}
function mi(t) {
  return Bt(t = gt(t), "iterate", or), t;
}
const ja = {
  __proto__: null,
  [Symbol.iterator]() {
    return Pi(this, Symbol.iterator, $t);
  },
  concat(...t) {
    return yn(this).concat(
      ...t.map((e) => ot(e) ? yn(e) : e)
    );
  },
  entries() {
    return Pi(this, "entries", (t) => (t[1] = $t(t[1]), t));
  },
  every(t, e) {
    return Ae(this, "every", t, e, void 0, arguments);
  },
  filter(t, e) {
    return Ae(this, "filter", t, e, (n) => n.map($t), arguments);
  },
  find(t, e) {
    return Ae(this, "find", t, e, $t, arguments);
  },
  findIndex(t, e) {
    return Ae(this, "findIndex", t, e, void 0, arguments);
  },
  findLast(t, e) {
    return Ae(this, "findLast", t, e, $t, arguments);
  },
  findLastIndex(t, e) {
    return Ae(this, "findLastIndex", t, e, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(t, e) {
    return Ae(this, "forEach", t, e, void 0, arguments);
  },
  includes(...t) {
    return Oi(this, "includes", t);
  },
  indexOf(...t) {
    return Oi(this, "indexOf", t);
  },
  join(t) {
    return yn(this).join(t);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...t) {
    return Oi(this, "lastIndexOf", t);
  },
  map(t, e) {
    return Ae(this, "map", t, e, void 0, arguments);
  },
  pop() {
    return Vn(this, "pop");
  },
  push(...t) {
    return Vn(this, "push", t);
  },
  reduce(t, ...e) {
    return so(this, "reduce", t, e);
  },
  reduceRight(t, ...e) {
    return so(this, "reduceRight", t, e);
  },
  shift() {
    return Vn(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(t, e) {
    return Ae(this, "some", t, e, void 0, arguments);
  },
  splice(...t) {
    return Vn(this, "splice", t);
  },
  toReversed() {
    return yn(this).toReversed();
  },
  toSorted(t) {
    return yn(this).toSorted(t);
  },
  toSpliced(...t) {
    return yn(this).toSpliced(...t);
  },
  unshift(...t) {
    return Vn(this, "unshift", t);
  },
  values() {
    return Pi(this, "values", $t);
  }
};
function Pi(t, e, n) {
  const r = mi(t), i = r[e]();
  return r !== t && !we(t) && (i._next = i.next, i.next = () => {
    const s = i._next();
    return s.value && (s.value = n(s.value)), s;
  }), i;
}
const Ba = Array.prototype;
function Ae(t, e, n, r, i, s) {
  const o = mi(t), l = o !== t && !we(t), u = o[e];
  if (u !== Ba[e]) {
    const f = u.apply(t, s);
    return l ? $t(f) : f;
  }
  let c = n;
  o !== t && (l ? c = function(f, h) {
    return n.call(this, $t(f), h, t);
  } : n.length > 2 && (c = function(f, h) {
    return n.call(this, f, h, t);
  }));
  const a = u.call(o, c, r);
  return l && i ? i(a) : a;
}
function so(t, e, n, r) {
  const i = mi(t);
  let s = n;
  return i !== t && (we(t) ? n.length > 3 && (s = function(o, l, u) {
    return n.call(this, o, l, u, t);
  }) : s = function(o, l, u) {
    return n.call(this, o, $t(l), u, t);
  }), i[e](s, ...r);
}
function Oi(t, e, n) {
  const r = gt(t);
  Bt(r, "iterate", or);
  const i = r[e](...n);
  return (i === -1 || i === !1) && Cs(n[0]) ? (n[0] = gt(n[0]), r[e](...n)) : i;
}
function Vn(t, e, n = []) {
  He(), xs();
  const r = gt(t)[e].apply(t, n);
  return Es(), qe(), r;
}
const Da = /* @__PURE__ */ ms("__proto__,__v_isRef,__isVue"), Rl = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((t) => t !== "arguments" && t !== "caller").map((t) => Symbol[t]).filter(nn)
);
function Va(t) {
  nn(t) || (t = String(t));
  const e = gt(this);
  return Bt(e, "has", t), e.hasOwnProperty(t);
}
class Ll {
  constructor(e = !1, n = !1) {
    this._isReadonly = e, this._isShallow = n;
  }
  get(e, n, r) {
    if (n === "__v_skip") return e.__v_skip;
    const i = this._isReadonly, s = this._isShallow;
    if (n === "__v_isReactive")
      return !i;
    if (n === "__v_isReadonly")
      return i;
    if (n === "__v_isShallow")
      return s;
    if (n === "__v_raw")
      return r === (i ? s ? Ja : $l : s ? Il : Ol).get(e) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(e) === Object.getPrototypeOf(r) ? e : void 0;
    const o = ot(e);
    if (!i) {
      let u;
      if (o && (u = ja[n]))
        return u;
      if (n === "hasOwnProperty")
        return Va;
    }
    const l = Reflect.get(
      e,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      Dt(e) ? e : r
    );
    return (nn(n) ? Rl.has(n) : Da(n)) || (i || Bt(e, "get", n), s) ? l : Dt(l) ? o && _s(n) ? l : l.value : Mt(l) ? i ? Al(l) : wi(l) : l;
  }
}
class Pl extends Ll {
  constructor(e = !1) {
    super(!1, e);
  }
  set(e, n, r, i) {
    let s = e[n];
    if (!this._isShallow) {
      const u = en(s);
      if (!we(r) && !en(r) && (s = gt(s), r = gt(r)), !ot(e) && Dt(s) && !Dt(r))
        return u || (s.value = r), !0;
    }
    const o = ot(e) && _s(n) ? Number(n) < e.length : pt(e, n), l = Reflect.set(
      e,
      n,
      r,
      Dt(e) ? e : i
    );
    return e === gt(i) && (o ? tn(r, s) && De(e, "set", n, r) : De(e, "add", n, r)), l;
  }
  deleteProperty(e, n) {
    const r = pt(e, n);
    e[n];
    const i = Reflect.deleteProperty(e, n);
    return i && r && De(e, "delete", n, void 0), i;
  }
  has(e, n) {
    const r = Reflect.has(e, n);
    return (!nn(n) || !Rl.has(n)) && Bt(e, "has", n), r;
  }
  ownKeys(e) {
    return Bt(
      e,
      "iterate",
      ot(e) ? "length" : pn
    ), Reflect.ownKeys(e);
  }
}
class Ga extends Ll {
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
const za = /* @__PURE__ */ new Pl(), Ha = /* @__PURE__ */ new Ga(), qa = /* @__PURE__ */ new Pl(!0);
const Yi = (t) => t, Sr = (t) => Reflect.getPrototypeOf(t);
function Wa(t, e, n) {
  return function(...r) {
    const i = this.__v_raw, s = gt(i), o = Tn(s), l = t === "entries" || t === Symbol.iterator && o, u = t === "keys" && o, c = i[t](...r), a = n ? Yi : e ? Wr : $t;
    return !e && Bt(
      s,
      "iterate",
      u ? Xi : pn
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
function kr(t) {
  return function(...e) {
    return t === "delete" ? !1 : t === "clear" ? void 0 : this;
  };
}
function Ua(t, e) {
  const n = {
    get(i) {
      const s = this.__v_raw, o = gt(s), l = gt(i);
      t || (tn(i, l) && Bt(o, "get", i), Bt(o, "get", l));
      const { has: u } = Sr(o), c = e ? Yi : t ? Wr : $t;
      if (u.call(o, i))
        return c(s.get(i));
      if (u.call(o, l))
        return c(s.get(l));
      s !== o && s.get(i);
    },
    get size() {
      const i = this.__v_raw;
      return !t && Bt(gt(i), "iterate", pn), i.size;
    },
    has(i) {
      const s = this.__v_raw, o = gt(s), l = gt(i);
      return t || (tn(i, l) && Bt(o, "has", i), Bt(o, "has", l)), i === l ? s.has(i) : s.has(i) || s.has(l);
    },
    forEach(i, s) {
      const o = this, l = o.__v_raw, u = gt(l), c = e ? Yi : t ? Wr : $t;
      return !t && Bt(u, "iterate", pn), l.forEach((a, f) => i.call(s, c(a), c(f), o));
    }
  };
  return Pt(
    n,
    t ? {
      add: kr("add"),
      set: kr("set"),
      delete: kr("delete"),
      clear: kr("clear")
    } : {
      add(i) {
        !e && !we(i) && !en(i) && (i = gt(i));
        const s = gt(this);
        return Sr(s).has.call(s, i) || (s.add(i), De(s, "add", i, i)), this;
      },
      set(i, s) {
        !e && !we(s) && !en(s) && (s = gt(s));
        const o = gt(this), { has: l, get: u } = Sr(o);
        let c = l.call(o, i);
        c || (i = gt(i), c = l.call(o, i));
        const a = u.call(o, i);
        return o.set(i, s), c ? tn(s, a) && De(o, "set", i, s) : De(o, "add", i, s), this;
      },
      delete(i) {
        const s = gt(this), { has: o, get: l } = Sr(s);
        let u = o.call(s, i);
        u || (i = gt(i), u = o.call(s, i)), l && l.call(s, i);
        const c = s.delete(i);
        return u && De(s, "delete", i, void 0), c;
      },
      clear() {
        const i = gt(this), s = i.size !== 0, o = i.clear();
        return s && De(
          i,
          "clear",
          void 0,
          void 0
        ), o;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((i) => {
    n[i] = Wa(i, t, e);
  }), n;
}
function Ms(t, e) {
  const n = Ua(t, e);
  return (r, i, s) => i === "__v_isReactive" ? !t : i === "__v_isReadonly" ? t : i === "__v_raw" ? r : Reflect.get(
    pt(n, i) && i in r ? n : r,
    i,
    s
  );
}
const Ka = {
  get: /* @__PURE__ */ Ms(!1, !1)
}, Xa = {
  get: /* @__PURE__ */ Ms(!1, !0)
}, Ya = {
  get: /* @__PURE__ */ Ms(!0, !1)
};
const Ol = /* @__PURE__ */ new WeakMap(), Il = /* @__PURE__ */ new WeakMap(), $l = /* @__PURE__ */ new WeakMap(), Ja = /* @__PURE__ */ new WeakMap();
function Qa(t) {
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
function Za(t) {
  return t.__v_skip || !Object.isExtensible(t) ? 0 : Qa(Sa(t));
}
function wi(t) {
  return en(t) ? t : Ts(
    t,
    !1,
    za,
    Ka,
    Ol
  );
}
function tc(t) {
  return Ts(
    t,
    !1,
    qa,
    Xa,
    Il
  );
}
function Al(t) {
  return Ts(
    t,
    !0,
    Ha,
    Ya,
    $l
  );
}
function Ts(t, e, n, r, i) {
  if (!Mt(t) || t.__v_raw && !(e && t.__v_isReactive))
    return t;
  const s = Za(t);
  if (s === 0)
    return t;
  const o = i.get(t);
  if (o)
    return o;
  const l = new Proxy(
    t,
    s === 2 ? r : n
  );
  return i.set(t, l), l;
}
function Cn(t) {
  return en(t) ? Cn(t.__v_raw) : !!(t && t.__v_isReactive);
}
function en(t) {
  return !!(t && t.__v_isReadonly);
}
function we(t) {
  return !!(t && t.__v_isShallow);
}
function Cs(t) {
  return t ? !!t.__v_raw : !1;
}
function gt(t) {
  const e = t && t.__v_raw;
  return e ? gt(e) : t;
}
function ec(t) {
  return !pt(t, "__v_skip") && Object.isExtensible(t) && yl(t, "__v_skip", !0), t;
}
const $t = (t) => Mt(t) ? wi(t) : t, Wr = (t) => Mt(t) ? Al(t) : t;
function Dt(t) {
  return t ? t.__v_isRef === !0 : !1;
}
function oo(t) {
  return nc(t, !1);
}
function nc(t, e) {
  return Dt(t) ? t : new rc(t, e);
}
class rc {
  constructor(e, n) {
    this.dep = new ks(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? e : gt(e), this._value = n ? e : $t(e), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(e) {
    const n = this._rawValue, r = this.__v_isShallow || we(e) || en(e);
    e = r ? e : gt(e), tn(e, n) && (this._rawValue = e, this._value = r ? e : $t(e), this.dep.trigger());
  }
}
function On(t) {
  return Dt(t) ? t.value : t;
}
const ic = {
  get: (t, e, n) => e === "__v_raw" ? t : On(Reflect.get(t, e, n)),
  set: (t, e, n, r) => {
    const i = t[e];
    return Dt(i) && !Dt(n) ? (i.value = n, !0) : Reflect.set(t, e, n, r);
  }
};
function Fl(t) {
  return Cn(t) ? t : new Proxy(t, ic);
}
class sc {
  constructor(e, n, r) {
    this.fn = e, this.setter = n, this._value = void 0, this.dep = new ks(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = sr - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = r;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    Et !== this)
      return Sl(this, !0), !0;
  }
  get value() {
    const e = this.dep.track();
    return Tl(this), e && (e.version = this.dep.version), this._value;
  }
  set value(e) {
    this.setter && this.setter(e);
  }
}
function oc(t, e, n = !1) {
  let r, i;
  return at(t) ? r = t : (r = t.get, i = t.set), new sc(r, i, n);
}
const Mr = {}, Ur = /* @__PURE__ */ new WeakMap();
let cn;
function lc(t, e = !1, n = cn) {
  if (n) {
    let r = Ur.get(n);
    r || Ur.set(n, r = []), r.push(t);
  }
}
function uc(t, e, n = vt) {
  const { immediate: r, deep: i, once: s, scheduler: o, augmentJob: l, call: u } = n, c = (w) => i ? w : we(w) || i === !1 || i === 0 ? Ve(w, 1) : Ve(w);
  let a, f, h, g, y = !1, x = !1;
  if (Dt(t) ? (f = () => t.value, y = we(t)) : Cn(t) ? (f = () => c(t), y = !0) : ot(t) ? (x = !0, y = t.some((w) => Cn(w) || we(w)), f = () => t.map((w) => {
    if (Dt(w))
      return w.value;
    if (Cn(w))
      return c(w);
    if (at(w))
      return u ? u(w, 2) : w();
  })) : at(t) ? e ? f = u ? () => u(t, 2) : t : f = () => {
    if (h) {
      He();
      try {
        h();
      } finally {
        qe();
      }
    }
    const w = cn;
    cn = a;
    try {
      return u ? u(t, 3, [g]) : t(g);
    } finally {
      cn = w;
    }
  } : f = Pe, e && i) {
    const w = f, C = i === !0 ? 1 / 0 : i;
    f = () => Ve(w(), C);
  }
  const v = $a(), p = () => {
    a.stop(), v && v.active && ys(v.effects, a);
  };
  if (s && e) {
    const w = e;
    e = (...C) => {
      w(...C), p();
    };
  }
  let k = x ? new Array(t.length).fill(Mr) : Mr;
  const L = (w) => {
    if (!(!(a.flags & 1) || !a.dirty && !w))
      if (e) {
        const C = a.run();
        if (i || y || (x ? C.some((B, V) => tn(B, k[V])) : tn(C, k))) {
          h && h();
          const B = cn;
          cn = a;
          try {
            const V = [
              C,
              // pass undefined as the old value when it's changed for the first time
              k === Mr ? void 0 : x && k[0] === Mr ? [] : k,
              g
            ];
            k = C, u ? u(e, 3, V) : (
              // @ts-expect-error
              e(...V)
            );
          } finally {
            cn = B;
          }
        }
      } else
        a.run();
  };
  return l && l(L), a = new xl(f), a.scheduler = o ? () => o(L, !1) : L, g = (w) => lc(w, !1, a), h = a.onStop = () => {
    const w = Ur.get(a);
    if (w) {
      if (u)
        u(w, 4);
      else
        for (const C of w) C();
      Ur.delete(a);
    }
  }, e ? r ? L(!0) : k = a.run() : o ? o(L.bind(null, !0), !0) : a.run(), p.pause = a.pause.bind(a), p.resume = a.resume.bind(a), p.stop = p, p;
}
function Ve(t, e = 1 / 0, n) {
  if (e <= 0 || !Mt(t) || t.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(t) || 0) >= e))
    return t;
  if (n.set(t, e), e--, Dt(t))
    Ve(t.value, e, n);
  else if (ot(t))
    for (let r = 0; r < t.length; r++)
      Ve(t[r], e, n);
  else if (pl(t) || Tn(t))
    t.forEach((r) => {
      Ve(r, e, n);
    });
  else if (di(t)) {
    for (const r in t)
      Ve(t[r], e, n);
    for (const r of Object.getOwnPropertySymbols(t))
      Object.prototype.propertyIsEnumerable.call(t, r) && Ve(t[r], e, n);
  }
  return t;
}
/**
* @vue/runtime-core v3.5.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function mr(t, e, n, r) {
  try {
    return r ? t(...r) : t();
  } catch (i) {
    yi(i, e, n);
  }
}
function Ie(t, e, n, r) {
  if (at(t)) {
    const i = mr(t, e, n, r);
    return i && gl(i) && i.catch((s) => {
      yi(s, e, n);
    }), i;
  }
  if (ot(t)) {
    const i = [];
    for (let s = 0; s < t.length; s++)
      i.push(Ie(t[s], e, n, r));
    return i;
  }
}
function yi(t, e, n, r = !0) {
  const i = e ? e.vnode : null, { errorHandler: s, throwUnhandledErrorInProduction: o } = e && e.appContext.config || vt;
  if (e) {
    let l = e.parent;
    const u = e.proxy, c = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; l; ) {
      const a = l.ec;
      if (a) {
        for (let f = 0; f < a.length; f++)
          if (a[f](t, u, c) === !1)
            return;
      }
      l = l.parent;
    }
    if (s) {
      He(), mr(s, null, 10, [
        t,
        u,
        c
      ]), qe();
      return;
    }
  }
  ac(t, n, i, r, o);
}
function ac(t, e, n, r = !0, i = !1) {
  if (i)
    throw t;
  console.error(t);
}
const zt = [];
let Ce = -1;
const Nn = [];
let Qe = null, vn = 0;
const jl = /* @__PURE__ */ Promise.resolve();
let Kr = null;
function Bl(t) {
  const e = Kr || jl;
  return t ? e.then(this ? t.bind(this) : t) : e;
}
function cc(t) {
  let e = Ce + 1, n = zt.length;
  for (; e < n; ) {
    const r = e + n >>> 1, i = zt[r], s = lr(i);
    s < t || s === t && i.flags & 2 ? e = r + 1 : n = r;
  }
  return e;
}
function Ns(t) {
  if (!(t.flags & 1)) {
    const e = lr(t), n = zt[zt.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(t.flags & 2) && e >= lr(n) ? zt.push(t) : zt.splice(cc(e), 0, t), t.flags |= 1, Dl();
  }
}
function Dl() {
  Kr || (Kr = jl.then(Gl));
}
function fc(t) {
  ot(t) ? Nn.push(...t) : Qe && t.id === -1 ? Qe.splice(vn + 1, 0, t) : t.flags & 1 || (Nn.push(t), t.flags |= 1), Dl();
}
function lo(t, e, n = Ce + 1) {
  for (; n < zt.length; n++) {
    const r = zt[n];
    if (r && r.flags & 2) {
      if (t && r.id !== t.uid)
        continue;
      zt.splice(n, 1), n--, r.flags & 4 && (r.flags &= -2), r(), r.flags & 4 || (r.flags &= -2);
    }
  }
}
function Vl(t) {
  if (Nn.length) {
    const e = [...new Set(Nn)].sort(
      (n, r) => lr(n) - lr(r)
    );
    if (Nn.length = 0, Qe) {
      Qe.push(...e);
      return;
    }
    for (Qe = e, vn = 0; vn < Qe.length; vn++) {
      const n = Qe[vn];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
    }
    Qe = null, vn = 0;
  }
}
const lr = (t) => t.id == null ? t.flags & 2 ? -1 : 1 / 0 : t.id;
function Gl(t) {
  try {
    for (Ce = 0; Ce < zt.length; Ce++) {
      const e = zt[Ce];
      e && !(e.flags & 8) && (e.flags & 4 && (e.flags &= -2), mr(
        e,
        e.i,
        e.i ? 15 : 14
      ), e.flags & 4 || (e.flags &= -2));
    }
  } finally {
    for (; Ce < zt.length; Ce++) {
      const e = zt[Ce];
      e && (e.flags &= -2);
    }
    Ce = -1, zt.length = 0, Vl(), Kr = null, (zt.length || Nn.length) && Gl();
  }
}
let me = null, zl = null;
function Xr(t) {
  const e = me;
  return me = t, zl = t && t.type.__scopeId || null, e;
}
function hc(t, e = me, n) {
  if (!e || t._n)
    return t;
  const r = (...i) => {
    r._d && _o(-1);
    const s = Xr(e);
    let o;
    try {
      o = t(...i);
    } finally {
      Xr(s), r._d && _o(1);
    }
    return o;
  };
  return r._n = !0, r._c = !0, r._d = !0, r;
}
function Fr(t, e) {
  if (me === null)
    return t;
  const n = xi(me), r = t.dirs || (t.dirs = []);
  for (let i = 0; i < e.length; i++) {
    let [s, o, l, u = vt] = e[i];
    s && (at(s) && (s = {
      mounted: s,
      updated: s
    }), s.deep && Ve(o), r.push({
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
function sn(t, e, n, r) {
  const i = t.dirs, s = e && e.dirs;
  for (let o = 0; o < i.length; o++) {
    const l = i[o];
    s && (l.oldValue = s[o].value);
    let u = l.dir[r];
    u && (He(), Ie(u, n, 8, [
      t.el,
      l,
      t,
      e
    ]), qe());
  }
}
const dc = Symbol("_vte"), pc = (t) => t.__isTeleport, gc = Symbol("_leaveCb");
function Rs(t, e) {
  t.shapeFlag & 6 && t.component ? (t.transition = e, Rs(t.component.subTree, e)) : t.shapeFlag & 128 ? (t.ssContent.transition = e.clone(t.ssContent), t.ssFallback.transition = e.clone(t.ssFallback)) : t.transition = e;
}
// @__NO_SIDE_EFFECTS__
function Ls(t, e) {
  return at(t) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    Pt({ name: t.name }, e, { setup: t })
  ) : t;
}
function Hl(t) {
  t.ids = [t.ids[0] + t.ids[2]++ + "-", 0, 0];
}
const Yr = /* @__PURE__ */ new WeakMap();
function Zn(t, e, n, r, i = !1) {
  if (ot(t)) {
    t.forEach(
      (y, x) => Zn(
        y,
        e && (ot(e) ? e[x] : e),
        n,
        r,
        i
      )
    );
    return;
  }
  if (tr(r) && !i) {
    r.shapeFlag & 512 && r.type.__asyncResolved && r.component.subTree.component && Zn(t, e, n, r.component.subTree);
    return;
  }
  const s = r.shapeFlag & 4 ? xi(r.component) : r.el, o = i ? null : s, { i: l, r: u } = t, c = e && e.r, a = l.refs === vt ? l.refs = {} : l.refs, f = l.setupState, h = gt(f), g = f === vt ? dl : (y) => pt(h, y);
  if (c != null && c !== u) {
    if (uo(e), Lt(c))
      a[c] = null, g(c) && (f[c] = null);
    else if (Dt(c)) {
      c.value = null;
      const y = e;
      y.k && (a[y.k] = null);
    }
  }
  if (at(u))
    mr(u, l, 12, [o, a]);
  else {
    const y = Lt(u), x = Dt(u);
    if (y || x) {
      const v = () => {
        if (t.f) {
          const p = y ? g(u) ? f[u] : a[u] : u.value;
          if (i)
            ot(p) && ys(p, s);
          else if (ot(p))
            p.includes(s) || p.push(s);
          else if (y)
            a[u] = [s], g(u) && (f[u] = a[u]);
          else {
            const k = [s];
            u.value = k, t.k && (a[t.k] = k);
          }
        } else y ? (a[u] = o, g(u) && (f[u] = o)) : x && (u.value = o, t.k && (a[t.k] = o));
      };
      if (o) {
        const p = () => {
          v(), Yr.delete(t);
        };
        p.id = -1, Yr.set(t, p), ie(p, n);
      } else
        uo(t), v();
    }
  }
}
function uo(t) {
  const e = Yr.get(t);
  e && (e.flags |= 8, Yr.delete(t));
}
gi().requestIdleCallback;
gi().cancelIdleCallback;
const tr = (t) => !!t.type.__asyncLoader, ql = (t) => t.type.__isKeepAlive;
function mc(t, e) {
  Wl(t, "a", e);
}
function wc(t, e) {
  Wl(t, "da", e);
}
function Wl(t, e, n = qt) {
  const r = t.__wdc || (t.__wdc = () => {
    let i = n;
    for (; i; ) {
      if (i.isDeactivated)
        return;
      i = i.parent;
    }
    return t();
  });
  if (_i(e, r, n), n) {
    let i = n.parent;
    for (; i && i.parent; )
      ql(i.parent.vnode) && yc(r, e, n, i), i = i.parent;
  }
}
function yc(t, e, n, r) {
  const i = _i(
    e,
    t,
    r,
    !0
    /* prepend */
  );
  Ps(() => {
    ys(r[e], i);
  }, n);
}
function _i(t, e, n = qt, r = !1) {
  if (n) {
    const i = n[t] || (n[t] = []), s = e.__weh || (e.__weh = (...o) => {
      He();
      const l = wr(n), u = Ie(e, n, t, o);
      return l(), qe(), u;
    });
    return r ? i.unshift(s) : i.push(s), s;
  }
}
const Ue = (t) => (e, n = qt) => {
  (!ar || t === "sp") && _i(t, (...r) => e(...r), n);
}, _c = Ue("bm"), Ul = Ue("m"), vc = Ue(
  "bu"
), bc = Ue("u"), xc = Ue(
  "bum"
), Ps = Ue("um"), Ec = Ue(
  "sp"
), Sc = Ue("rtg"), kc = Ue("rtc");
function Mc(t, e = qt) {
  _i("ec", t, e);
}
const Tc = Symbol.for("v-ndc");
function ao(t, e, n, r) {
  let i;
  const s = n, o = ot(t);
  if (o || Lt(t)) {
    const l = o && Cn(t);
    let u = !1, c = !1;
    l && (u = !we(t), c = en(t), t = mi(t)), i = new Array(t.length);
    for (let a = 0, f = t.length; a < f; a++)
      i[a] = e(
        u ? c ? Wr($t(t[a])) : $t(t[a]) : t[a],
        a,
        void 0,
        s
      );
  } else if (typeof t == "number") {
    i = new Array(t);
    for (let l = 0; l < t; l++)
      i[l] = e(l + 1, l, void 0, s);
  } else if (Mt(t))
    if (t[Symbol.iterator])
      i = Array.from(
        t,
        (l, u) => e(l, u, void 0, s)
      );
    else {
      const l = Object.keys(t);
      i = new Array(l.length);
      for (let u = 0, c = l.length; u < c; u++) {
        const a = l[u];
        i[u] = e(t[a], a, u, s);
      }
    }
  else
    i = [];
  return i;
}
const Ji = (t) => t ? du(t) ? xi(t) : Ji(t.parent) : null, er = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ Pt(/* @__PURE__ */ Object.create(null), {
    $: (t) => t,
    $el: (t) => t.vnode.el,
    $data: (t) => t.data,
    $props: (t) => t.props,
    $attrs: (t) => t.attrs,
    $slots: (t) => t.slots,
    $refs: (t) => t.refs,
    $parent: (t) => Ji(t.parent),
    $root: (t) => Ji(t.root),
    $host: (t) => t.ce,
    $emit: (t) => t.emit,
    $options: (t) => Xl(t),
    $forceUpdate: (t) => t.f || (t.f = () => {
      Ns(t.update);
    }),
    $nextTick: (t) => t.n || (t.n = Bl.bind(t.proxy)),
    $watch: (t) => Xc.bind(t)
  })
), Ii = (t, e) => t !== vt && !t.__isScriptSetup && pt(t, e), Cc = {
  get({ _: t }, e) {
    if (e === "__v_skip")
      return !0;
    const { ctx: n, setupState: r, data: i, props: s, accessCache: o, type: l, appContext: u } = t;
    let c;
    if (e[0] !== "$") {
      const g = o[e];
      if (g !== void 0)
        switch (g) {
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
        if (Ii(r, e))
          return o[e] = 1, r[e];
        if (i !== vt && pt(i, e))
          return o[e] = 2, i[e];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (c = t.propsOptions[0]) && pt(c, e)
        )
          return o[e] = 3, s[e];
        if (n !== vt && pt(n, e))
          return o[e] = 4, n[e];
        Qi && (o[e] = 0);
      }
    }
    const a = er[e];
    let f, h;
    if (a)
      return e === "$attrs" && Bt(t.attrs, "get", ""), a(t);
    if (
      // css module (injected by vue-loader)
      (f = l.__cssModules) && (f = f[e])
    )
      return f;
    if (n !== vt && pt(n, e))
      return o[e] = 4, n[e];
    if (
      // global properties
      h = u.config.globalProperties, pt(h, e)
    )
      return h[e];
  },
  set({ _: t }, e, n) {
    const { data: r, setupState: i, ctx: s } = t;
    return Ii(i, e) ? (i[e] = n, !0) : r !== vt && pt(r, e) ? (r[e] = n, !0) : pt(t.props, e) || e[0] === "$" && e.slice(1) in t ? !1 : (s[e] = n, !0);
  },
  has({
    _: { data: t, setupState: e, accessCache: n, ctx: r, appContext: i, propsOptions: s, type: o }
  }, l) {
    let u, c;
    return !!(n[l] || t !== vt && l[0] !== "$" && pt(t, l) || Ii(e, l) || (u = s[0]) && pt(u, l) || pt(r, l) || pt(er, l) || pt(i.config.globalProperties, l) || (c = o.__cssModules) && c[l]);
  },
  defineProperty(t, e, n) {
    return n.get != null ? t._.accessCache[e] = 0 : pt(n, "value") && this.set(t, e, n.value, null), Reflect.defineProperty(t, e, n);
  }
};
function co(t) {
  return ot(t) ? t.reduce(
    (e, n) => (e[n] = null, e),
    {}
  ) : t;
}
let Qi = !0;
function Nc(t) {
  const e = Xl(t), n = t.proxy, r = t.ctx;
  Qi = !1, e.beforeCreate && fo(e.beforeCreate, t, "bc");
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
    beforeUpdate: g,
    updated: y,
    activated: x,
    deactivated: v,
    beforeDestroy: p,
    beforeUnmount: k,
    destroyed: L,
    unmounted: w,
    render: C,
    renderTracked: B,
    renderTriggered: V,
    errorCaptured: U,
    serverPrefetch: Q,
    // public API
    expose: Z,
    inheritAttrs: st,
    // assets
    components: ft,
    directives: K,
    filters: S
  } = e;
  if (c && Rc(c, r, null), o)
    for (const A in o) {
      const D = o[A];
      at(D) && (r[A] = D.bind(n));
    }
  if (i) {
    const A = i.call(n, n);
    Mt(A) && (t.data = wi(A));
  }
  if (Qi = !0, s)
    for (const A in s) {
      const D = s[A], X = at(D) ? D.bind(n, n) : at(D.get) ? D.get.bind(n, n) : Pe, Y = !at(D) && at(D.set) ? D.set.bind(n) : Pe, lt = ns({
        get: X,
        set: Y
      });
      Object.defineProperty(r, A, {
        enumerable: !0,
        configurable: !0,
        get: () => lt.value,
        set: (ut) => lt.value = ut
      });
    }
  if (l)
    for (const A in l)
      Kl(l[A], r, n, A);
  if (u) {
    const A = at(u) ? u.call(n) : u;
    Reflect.ownKeys(A).forEach((D) => {
      Ac(D, A[D]);
    });
  }
  a && fo(a, t, "c");
  function N(A, D) {
    ot(D) ? D.forEach((X) => A(X.bind(n))) : D && A(D.bind(n));
  }
  if (N(_c, f), N(Ul, h), N(vc, g), N(bc, y), N(mc, x), N(wc, v), N(Mc, U), N(kc, B), N(Sc, V), N(xc, k), N(Ps, w), N(Ec, Q), ot(Z))
    if (Z.length) {
      const A = t.exposed || (t.exposed = {});
      Z.forEach((D) => {
        Object.defineProperty(A, D, {
          get: () => n[D],
          set: (X) => n[D] = X,
          enumerable: !0
        });
      });
    } else t.exposed || (t.exposed = {});
  C && t.render === Pe && (t.render = C), st != null && (t.inheritAttrs = st), ft && (t.components = ft), K && (t.directives = K), Q && Hl(t);
}
function Rc(t, e, n = Pe) {
  ot(t) && (t = Zi(t));
  for (const r in t) {
    const i = t[r];
    let s;
    Mt(i) ? "default" in i ? s = jr(
      i.from || r,
      i.default,
      !0
    ) : s = jr(i.from || r) : s = jr(i), Dt(s) ? Object.defineProperty(e, r, {
      enumerable: !0,
      configurable: !0,
      get: () => s.value,
      set: (o) => s.value = o
    }) : e[r] = s;
  }
}
function fo(t, e, n) {
  Ie(
    ot(t) ? t.map((r) => r.bind(e.proxy)) : t.bind(e.proxy),
    e,
    n
  );
}
function Kl(t, e, n, r) {
  let i = r.includes(".") ? uu(n, r) : () => n[r];
  if (Lt(t)) {
    const s = e[t];
    at(s) && Ai(i, s);
  } else if (at(t))
    Ai(i, t.bind(n));
  else if (Mt(t))
    if (ot(t))
      t.forEach((s) => Kl(s, e, n, r));
    else {
      const s = at(t.handler) ? t.handler.bind(n) : e[t.handler];
      at(s) && Ai(i, s, t);
    }
}
function Xl(t) {
  const e = t.type, { mixins: n, extends: r } = e, {
    mixins: i,
    optionsCache: s,
    config: { optionMergeStrategies: o }
  } = t.appContext, l = s.get(e);
  let u;
  return l ? u = l : !i.length && !n && !r ? u = e : (u = {}, i.length && i.forEach(
    (c) => Jr(u, c, o, !0)
  ), Jr(u, e, o)), Mt(e) && s.set(e, u), u;
}
function Jr(t, e, n, r = !1) {
  const { mixins: i, extends: s } = e;
  s && Jr(t, s, n, !0), i && i.forEach(
    (o) => Jr(t, o, n, !0)
  );
  for (const o in e)
    if (!(r && o === "expose")) {
      const l = Lc[o] || n && n[o];
      t[o] = l ? l(t[o], e[o]) : e[o];
    }
  return t;
}
const Lc = {
  data: ho,
  props: po,
  emits: po,
  // objects
  methods: Wn,
  computed: Wn,
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
  components: Wn,
  directives: Wn,
  // watch
  watch: Oc,
  // provide / inject
  provide: ho,
  inject: Pc
};
function ho(t, e) {
  return e ? t ? function() {
    return Pt(
      at(t) ? t.call(this, this) : t,
      at(e) ? e.call(this, this) : e
    );
  } : e : t;
}
function Pc(t, e) {
  return Wn(Zi(t), Zi(e));
}
function Zi(t) {
  if (ot(t)) {
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
function Wn(t, e) {
  return t ? Pt(/* @__PURE__ */ Object.create(null), t, e) : e;
}
function po(t, e) {
  return t ? ot(t) && ot(e) ? [.../* @__PURE__ */ new Set([...t, ...e])] : Pt(
    /* @__PURE__ */ Object.create(null),
    co(t),
    co(e ?? {})
  ) : e;
}
function Oc(t, e) {
  if (!t) return e;
  if (!e) return t;
  const n = Pt(/* @__PURE__ */ Object.create(null), t);
  for (const r in e)
    n[r] = Vt(t[r], e[r]);
  return n;
}
function Yl() {
  return {
    app: null,
    config: {
      isNativeTag: dl,
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
let Ic = 0;
function $c(t, e) {
  return function(r, i = null) {
    at(r) || (r = Pt({}, r)), i != null && !Mt(i) && (i = null);
    const s = Yl(), o = /* @__PURE__ */ new WeakSet(), l = [];
    let u = !1;
    const c = s.app = {
      _uid: Ic++,
      _component: r,
      _props: i,
      _container: null,
      _context: s,
      _instance: null,
      version: vf,
      get config() {
        return s.config;
      },
      set config(a) {
      },
      use(a, ...f) {
        return o.has(a) || (a && at(a.install) ? (o.add(a), a.install(c, ...f)) : at(a) && (o.add(a), a(c, ...f))), c;
      },
      mixin(a) {
        return s.mixins.includes(a) || s.mixins.push(a), c;
      },
      component(a, f) {
        return f ? (s.components[a] = f, c) : s.components[a];
      },
      directive(a, f) {
        return f ? (s.directives[a] = f, c) : s.directives[a];
      },
      mount(a, f, h) {
        if (!u) {
          const g = c._ceVNode || ze(r, i);
          return g.appContext = s, h === !0 ? h = "svg" : h === !1 && (h = void 0), t(g, a, h), u = !0, c._container = a, a.__vue_app__ = c, xi(g.component);
        }
      },
      onUnmount(a) {
        l.push(a);
      },
      unmount() {
        u && (Ie(
          l,
          c._instance,
          16
        ), t(null, c._container), delete c._container.__vue_app__);
      },
      provide(a, f) {
        return s.provides[a] = f, c;
      },
      runWithContext(a) {
        const f = Rn;
        Rn = c;
        try {
          return a();
        } finally {
          Rn = f;
        }
      }
    };
    return c;
  };
}
let Rn = null;
function Ac(t, e) {
  if (qt) {
    let n = qt.provides;
    const r = qt.parent && qt.parent.provides;
    r === n && (n = qt.provides = Object.create(r)), n[t] = e;
  }
}
function jr(t, e, n = !1) {
  const r = pf();
  if (r || Rn) {
    let i = Rn ? Rn._context.provides : r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
    if (i && t in i)
      return i[t];
    if (arguments.length > 1)
      return n && at(e) ? e.call(r && r.proxy) : e;
  }
}
const Jl = {}, Ql = () => Object.create(Jl), Zl = (t) => Object.getPrototypeOf(t) === Jl;
function Fc(t, e, n, r = !1) {
  const i = {}, s = Ql();
  t.propsDefaults = /* @__PURE__ */ Object.create(null), tu(t, e, i, s);
  for (const o in t.propsOptions[0])
    o in i || (i[o] = void 0);
  n ? t.props = r ? i : tc(i) : t.type.props ? t.props = i : t.props = s, t.attrs = s;
}
function jc(t, e, n, r) {
  const {
    props: i,
    attrs: s,
    vnode: { patchFlag: o }
  } = t, l = gt(i), [u] = t.propsOptions;
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
        if (vi(t.emitsOptions, h))
          continue;
        const g = e[h];
        if (u)
          if (pt(s, h))
            g !== s[h] && (s[h] = g, c = !0);
          else {
            const y = Ee(h);
            i[y] = ts(
              u,
              l,
              y,
              g,
              t,
              !1
            );
          }
        else
          g !== s[h] && (s[h] = g, c = !0);
      }
    }
  } else {
    tu(t, e, i, s) && (c = !0);
    let a;
    for (const f in l)
      (!e || // for camelCase
      !pt(e, f) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((a = ge(f)) === f || !pt(e, a))) && (u ? n && // for camelCase
      (n[f] !== void 0 || // for kebab-case
      n[a] !== void 0) && (i[f] = ts(
        u,
        l,
        f,
        void 0,
        t,
        !0
      )) : delete i[f]);
    if (s !== l)
      for (const f in s)
        (!e || !pt(e, f)) && (delete s[f], c = !0);
  }
  c && De(t.attrs, "set", "");
}
function tu(t, e, n, r) {
  const [i, s] = t.propsOptions;
  let o = !1, l;
  if (e)
    for (let u in e) {
      if (Yn(u))
        continue;
      const c = e[u];
      let a;
      i && pt(i, a = Ee(u)) ? !s || !s.includes(a) ? n[a] = c : (l || (l = {}))[a] = c : vi(t.emitsOptions, u) || (!(u in r) || c !== r[u]) && (r[u] = c, o = !0);
    }
  if (s) {
    const u = gt(n), c = l || vt;
    for (let a = 0; a < s.length; a++) {
      const f = s[a];
      n[f] = ts(
        i,
        u,
        f,
        c[f],
        t,
        !pt(c, f)
      );
    }
  }
  return o;
}
function ts(t, e, n, r, i, s) {
  const o = t[n];
  if (o != null) {
    const l = pt(o, "default");
    if (l && r === void 0) {
      const u = o.default;
      if (o.type !== Function && !o.skipFactory && at(u)) {
        const { propsDefaults: c } = i;
        if (n in c)
          r = c[n];
        else {
          const a = wr(i);
          r = c[n] = u.call(
            null,
            e
          ), a();
        }
      } else
        r = u;
      i.ce && i.ce._setProp(n, r);
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
const Bc = /* @__PURE__ */ new WeakMap();
function eu(t, e, n = !1) {
  const r = n ? Bc : e.propsCache, i = r.get(t);
  if (i)
    return i;
  const s = t.props, o = {}, l = [];
  let u = !1;
  if (!at(t)) {
    const a = (f) => {
      u = !0;
      const [h, g] = eu(f, e, !0);
      Pt(o, h), g && l.push(...g);
    };
    !n && e.mixins.length && e.mixins.forEach(a), t.extends && a(t.extends), t.mixins && t.mixins.forEach(a);
  }
  if (!s && !u)
    return Mt(t) && r.set(t, Mn), Mn;
  if (ot(s))
    for (let a = 0; a < s.length; a++) {
      const f = Ee(s[a]);
      go(f) && (o[f] = vt);
    }
  else if (s)
    for (const a in s) {
      const f = Ee(a);
      if (go(f)) {
        const h = s[a], g = o[f] = ot(h) || at(h) ? { type: h } : Pt({}, h), y = g.type;
        let x = !1, v = !0;
        if (ot(y))
          for (let p = 0; p < y.length; ++p) {
            const k = y[p], L = at(k) && k.name;
            if (L === "Boolean") {
              x = !0;
              break;
            } else L === "String" && (v = !1);
          }
        else
          x = at(y) && y.name === "Boolean";
        g[
          0
          /* shouldCast */
        ] = x, g[
          1
          /* shouldCastTrue */
        ] = v, (x || pt(g, "default")) && l.push(f);
      }
    }
  const c = [o, l];
  return Mt(t) && r.set(t, c), c;
}
function go(t) {
  return t[0] !== "$" && !Yn(t);
}
const Os = (t) => t === "_" || t === "_ctx" || t === "$stable", Is = (t) => ot(t) ? t.map(Re) : [Re(t)], Dc = (t, e, n) => {
  if (e._n)
    return e;
  const r = hc((...i) => Is(e(...i)), n);
  return r._c = !1, r;
}, nu = (t, e, n) => {
  const r = t._ctx;
  for (const i in t) {
    if (Os(i)) continue;
    const s = t[i];
    if (at(s))
      e[i] = Dc(i, s, r);
    else if (s != null) {
      const o = Is(s);
      e[i] = () => o;
    }
  }
}, ru = (t, e) => {
  const n = Is(e);
  t.slots.default = () => n;
}, iu = (t, e, n) => {
  for (const r in e)
    (n || !Os(r)) && (t[r] = e[r]);
}, Vc = (t, e, n) => {
  const r = t.slots = Ql();
  if (t.vnode.shapeFlag & 32) {
    const i = e._;
    i ? (iu(r, e, n), n && yl(r, "_", i, !0)) : nu(e, r);
  } else e && ru(t, e);
}, Gc = (t, e, n) => {
  const { vnode: r, slots: i } = t;
  let s = !0, o = vt;
  if (r.shapeFlag & 32) {
    const l = e._;
    l ? n && l === 1 ? s = !1 : iu(i, e, n) : (s = !e.$stable, nu(e, i)), o = e;
  } else e && (ru(t, e), o = { default: 1 });
  if (s)
    for (const l in i)
      !Os(l) && o[l] == null && delete i[l];
}, ie = rf;
function zc(t) {
  return Hc(t);
}
function Hc(t, e) {
  const n = gi();
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
    setScopeId: g = Pe,
    insertStaticContent: y
  } = t, x = (_, E, R, F = null, I = null, $ = null, q = void 0, H = null, z = !!E.dynamicChildren) => {
    if (_ === E)
      return;
    _ && !Gn(_, E) && (F = St(_), ut(_, I, $, !0), _ = null), E.patchFlag === -2 && (z = !1, E.dynamicChildren = null);
    const { type: j, ref: nt, shapeFlag: W } = E;
    switch (j) {
      case bi:
        v(_, E, R, F);
        break;
      case In:
        p(_, E, R, F);
        break;
      case Fi:
        _ == null && k(E, R, F, q);
        break;
      case pe:
        ft(
          _,
          E,
          R,
          F,
          I,
          $,
          q,
          H,
          z
        );
        break;
      default:
        W & 1 ? C(
          _,
          E,
          R,
          F,
          I,
          $,
          q,
          H,
          z
        ) : W & 6 ? K(
          _,
          E,
          R,
          F,
          I,
          $,
          q,
          H,
          z
        ) : (W & 64 || W & 128) && j.process(
          _,
          E,
          R,
          F,
          I,
          $,
          q,
          H,
          z,
          ee
        );
    }
    nt != null && I ? Zn(nt, _ && _.ref, $, E || _, !E) : nt == null && _ && _.ref != null && Zn(_.ref, null, $, _, !0);
  }, v = (_, E, R, F) => {
    if (_ == null)
      r(
        E.el = l(E.children),
        R,
        F
      );
    else {
      const I = E.el = _.el;
      E.children !== _.children && c(I, E.children);
    }
  }, p = (_, E, R, F) => {
    _ == null ? r(
      E.el = u(E.children || ""),
      R,
      F
    ) : E.el = _.el;
  }, k = (_, E, R, F) => {
    [_.el, _.anchor] = y(
      _.children,
      E,
      R,
      F,
      _.el,
      _.anchor
    );
  }, L = ({ el: _, anchor: E }, R, F) => {
    let I;
    for (; _ && _ !== E; )
      I = h(_), r(_, R, F), _ = I;
    r(E, R, F);
  }, w = ({ el: _, anchor: E }) => {
    let R;
    for (; _ && _ !== E; )
      R = h(_), i(_), _ = R;
    i(E);
  }, C = (_, E, R, F, I, $, q, H, z) => {
    E.type === "svg" ? q = "svg" : E.type === "math" && (q = "mathml"), _ == null ? B(
      E,
      R,
      F,
      I,
      $,
      q,
      H,
      z
    ) : Q(
      _,
      E,
      I,
      $,
      q,
      H,
      z
    );
  }, B = (_, E, R, F, I, $, q, H) => {
    let z, j;
    const { props: nt, shapeFlag: W, transition: tt, dirs: it } = _;
    if (z = _.el = o(
      _.type,
      $,
      nt && nt.is,
      nt
    ), W & 8 ? a(z, _.children) : W & 16 && U(
      _.children,
      z,
      null,
      F,
      I,
      $i(_, $),
      q,
      H
    ), it && sn(_, null, F, "created"), V(z, _, _.scopeId, q, F), nt) {
      for (const mt in nt)
        mt !== "value" && !Yn(mt) && s(z, mt, null, nt[mt], $, F);
      "value" in nt && s(z, "value", null, nt.value, $), (j = nt.onVnodeBeforeMount) && Me(j, F, _);
    }
    it && sn(_, null, F, "beforeMount");
    const et = qc(I, tt);
    et && tt.beforeEnter(z), r(z, E, R), ((j = nt && nt.onVnodeMounted) || et || it) && ie(() => {
      j && Me(j, F, _), et && tt.enter(z), it && sn(_, null, F, "mounted");
    }, I);
  }, V = (_, E, R, F, I) => {
    if (R && g(_, R), F)
      for (let $ = 0; $ < F.length; $++)
        g(_, F[$]);
    if (I) {
      let $ = I.subTree;
      if (E === $ || cu($.type) && ($.ssContent === E || $.ssFallback === E)) {
        const q = I.vnode;
        V(
          _,
          q,
          q.scopeId,
          q.slotScopeIds,
          I.parent
        );
      }
    }
  }, U = (_, E, R, F, I, $, q, H, z = 0) => {
    for (let j = z; j < _.length; j++) {
      const nt = _[j] = H ? Ze(_[j]) : Re(_[j]);
      x(
        null,
        nt,
        E,
        R,
        F,
        I,
        $,
        q,
        H
      );
    }
  }, Q = (_, E, R, F, I, $, q) => {
    const H = E.el = _.el;
    let { patchFlag: z, dynamicChildren: j, dirs: nt } = E;
    z |= _.patchFlag & 16;
    const W = _.props || vt, tt = E.props || vt;
    let it;
    if (R && on(R, !1), (it = tt.onVnodeBeforeUpdate) && Me(it, R, E, _), nt && sn(E, _, R, "beforeUpdate"), R && on(R, !0), (W.innerHTML && tt.innerHTML == null || W.textContent && tt.textContent == null) && a(H, ""), j ? Z(
      _.dynamicChildren,
      j,
      H,
      R,
      F,
      $i(E, I),
      $
    ) : q || D(
      _,
      E,
      H,
      null,
      R,
      F,
      $i(E, I),
      $,
      !1
    ), z > 0) {
      if (z & 16)
        st(H, W, tt, R, I);
      else if (z & 2 && W.class !== tt.class && s(H, "class", null, tt.class, I), z & 4 && s(H, "style", W.style, tt.style, I), z & 8) {
        const et = E.dynamicProps;
        for (let mt = 0; mt < et.length; mt++) {
          const dt = et[mt], Ot = W[dt], At = tt[dt];
          (At !== Ot || dt === "value") && s(H, dt, Ot, At, I, R);
        }
      }
      z & 1 && _.children !== E.children && a(H, E.children);
    } else !q && j == null && st(H, W, tt, R, I);
    ((it = tt.onVnodeUpdated) || nt) && ie(() => {
      it && Me(it, R, E, _), nt && sn(E, _, R, "updated");
    }, F);
  }, Z = (_, E, R, F, I, $, q) => {
    for (let H = 0; H < E.length; H++) {
      const z = _[H], j = E[H], nt = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        z.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (z.type === pe || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Gn(z, j) || // - In the case of a component, it could contain anything.
        z.shapeFlag & 198) ? f(z.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          R
        )
      );
      x(
        z,
        j,
        nt,
        null,
        F,
        I,
        $,
        q,
        !0
      );
    }
  }, st = (_, E, R, F, I) => {
    if (E !== R) {
      if (E !== vt)
        for (const $ in E)
          !Yn($) && !($ in R) && s(
            _,
            $,
            E[$],
            null,
            I,
            F
          );
      for (const $ in R) {
        if (Yn($)) continue;
        const q = R[$], H = E[$];
        q !== H && $ !== "value" && s(_, $, H, q, I, F);
      }
      "value" in R && s(_, "value", E.value, R.value, I);
    }
  }, ft = (_, E, R, F, I, $, q, H, z) => {
    const j = E.el = _ ? _.el : l(""), nt = E.anchor = _ ? _.anchor : l("");
    let { patchFlag: W, dynamicChildren: tt, slotScopeIds: it } = E;
    it && (H = H ? H.concat(it) : it), _ == null ? (r(j, R, F), r(nt, R, F), U(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      E.children || [],
      R,
      nt,
      I,
      $,
      q,
      H,
      z
    )) : W > 0 && W & 64 && tt && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    _.dynamicChildren ? (Z(
      _.dynamicChildren,
      tt,
      R,
      I,
      $,
      q,
      H
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (E.key != null || I && E === I.subTree) && su(
      _,
      E,
      !0
      /* shallow */
    )) : D(
      _,
      E,
      R,
      nt,
      I,
      $,
      q,
      H,
      z
    );
  }, K = (_, E, R, F, I, $, q, H, z) => {
    E.slotScopeIds = H, _ == null ? E.shapeFlag & 512 ? I.ctx.activate(
      E,
      R,
      F,
      q,
      z
    ) : S(
      E,
      R,
      F,
      I,
      $,
      q,
      z
    ) : G(_, E, z);
  }, S = (_, E, R, F, I, $, q) => {
    const H = _.component = df(
      _,
      F,
      I
    );
    if (ql(_) && (H.ctx.renderer = ee), gf(H, !1, q), H.asyncDep) {
      if (I && I.registerDep(H, N, q), !_.el) {
        const z = H.subTree = ze(In);
        p(null, z, E, R), _.placeholder = z.el;
      }
    } else
      N(
        H,
        _,
        E,
        R,
        I,
        $,
        q
      );
  }, G = (_, E, R) => {
    const F = E.component = _.component;
    if (ef(_, E, R))
      if (F.asyncDep && !F.asyncResolved) {
        A(F, E, R);
        return;
      } else
        F.next = E, F.update();
    else
      E.el = _.el, F.vnode = E;
  }, N = (_, E, R, F, I, $, q) => {
    const H = () => {
      if (_.isMounted) {
        let { next: W, bu: tt, u: it, parent: et, vnode: mt } = _;
        {
          const ne = ou(_);
          if (ne) {
            W && (W.el = mt.el, A(_, W, q)), ne.asyncDep.then(() => {
              _.isUnmounted || H();
            });
            return;
          }
        }
        let dt = W, Ot;
        on(_, !1), W ? (W.el = mt.el, A(_, W, q)) : W = mt, tt && Ni(tt), (Ot = W.props && W.props.onVnodeBeforeUpdate) && Me(Ot, et, W, mt), on(_, !0);
        const At = wo(_), fe = _.subTree;
        _.subTree = At, x(
          fe,
          At,
          // parent may have changed if it's in a teleport
          f(fe.el),
          // anchor may have changed if it's in a fragment
          St(fe),
          _,
          I,
          $
        ), W.el = At.el, dt === null && nf(_, At.el), it && ie(it, I), (Ot = W.props && W.props.onVnodeUpdated) && ie(
          () => Me(Ot, et, W, mt),
          I
        );
      } else {
        let W;
        const { el: tt, props: it } = E, { bm: et, m: mt, parent: dt, root: Ot, type: At } = _, fe = tr(E);
        on(_, !1), et && Ni(et), !fe && (W = it && it.onVnodeBeforeMount) && Me(W, dt, E), on(_, !0);
        {
          Ot.ce && // @ts-expect-error _def is private
          Ot.ce._def.shadowRoot !== !1 && Ot.ce._injectChildStyle(At);
          const ne = _.subTree = wo(_);
          x(
            null,
            ne,
            R,
            F,
            _,
            I,
            $
          ), E.el = ne.el;
        }
        if (mt && ie(mt, I), !fe && (W = it && it.onVnodeMounted)) {
          const ne = E;
          ie(
            () => Me(W, dt, ne),
            I
          );
        }
        (E.shapeFlag & 256 || dt && tr(dt.vnode) && dt.vnode.shapeFlag & 256) && _.a && ie(_.a, I), _.isMounted = !0, E = R = F = null;
      }
    };
    _.scope.on();
    const z = _.effect = new xl(H);
    _.scope.off();
    const j = _.update = z.run.bind(z), nt = _.job = z.runIfDirty.bind(z);
    nt.i = _, nt.id = _.uid, z.scheduler = () => Ns(nt), on(_, !0), j();
  }, A = (_, E, R) => {
    E.component = _;
    const F = _.vnode.props;
    _.vnode = E, _.next = null, jc(_, E.props, F, R), Gc(_, E.children, R), He(), lo(_), qe();
  }, D = (_, E, R, F, I, $, q, H, z = !1) => {
    const j = _ && _.children, nt = _ ? _.shapeFlag : 0, W = E.children, { patchFlag: tt, shapeFlag: it } = E;
    if (tt > 0) {
      if (tt & 128) {
        Y(
          j,
          W,
          R,
          F,
          I,
          $,
          q,
          H,
          z
        );
        return;
      } else if (tt & 256) {
        X(
          j,
          W,
          R,
          F,
          I,
          $,
          q,
          H,
          z
        );
        return;
      }
    }
    it & 8 ? (nt & 16 && kt(j, I, $), W !== j && a(R, W)) : nt & 16 ? it & 16 ? Y(
      j,
      W,
      R,
      F,
      I,
      $,
      q,
      H,
      z
    ) : kt(j, I, $, !0) : (nt & 8 && a(R, ""), it & 16 && U(
      W,
      R,
      F,
      I,
      $,
      q,
      H,
      z
    ));
  }, X = (_, E, R, F, I, $, q, H, z) => {
    _ = _ || Mn, E = E || Mn;
    const j = _.length, nt = E.length, W = Math.min(j, nt);
    let tt;
    for (tt = 0; tt < W; tt++) {
      const it = E[tt] = z ? Ze(E[tt]) : Re(E[tt]);
      x(
        _[tt],
        it,
        R,
        null,
        I,
        $,
        q,
        H,
        z
      );
    }
    j > nt ? kt(
      _,
      I,
      $,
      !0,
      !1,
      W
    ) : U(
      E,
      R,
      F,
      I,
      $,
      q,
      H,
      z,
      W
    );
  }, Y = (_, E, R, F, I, $, q, H, z) => {
    let j = 0;
    const nt = E.length;
    let W = _.length - 1, tt = nt - 1;
    for (; j <= W && j <= tt; ) {
      const it = _[j], et = E[j] = z ? Ze(E[j]) : Re(E[j]);
      if (Gn(it, et))
        x(
          it,
          et,
          R,
          null,
          I,
          $,
          q,
          H,
          z
        );
      else
        break;
      j++;
    }
    for (; j <= W && j <= tt; ) {
      const it = _[W], et = E[tt] = z ? Ze(E[tt]) : Re(E[tt]);
      if (Gn(it, et))
        x(
          it,
          et,
          R,
          null,
          I,
          $,
          q,
          H,
          z
        );
      else
        break;
      W--, tt--;
    }
    if (j > W) {
      if (j <= tt) {
        const it = tt + 1, et = it < nt ? E[it].el : F;
        for (; j <= tt; )
          x(
            null,
            E[j] = z ? Ze(E[j]) : Re(E[j]),
            R,
            et,
            I,
            $,
            q,
            H,
            z
          ), j++;
      }
    } else if (j > tt)
      for (; j <= W; )
        ut(_[j], I, $, !0), j++;
    else {
      const it = j, et = j, mt = /* @__PURE__ */ new Map();
      for (j = et; j <= tt; j++) {
        const Ft = E[j] = z ? Ze(E[j]) : Re(E[j]);
        Ft.key != null && mt.set(Ft.key, j);
      }
      let dt, Ot = 0;
      const At = tt - et + 1;
      let fe = !1, ne = 0;
      const rn = new Array(At);
      for (j = 0; j < At; j++) rn[j] = 0;
      for (j = it; j <= W; j++) {
        const Ft = _[j];
        if (Ot >= At) {
          ut(Ft, I, $, !0);
          continue;
        }
        let he;
        if (Ft.key != null)
          he = mt.get(Ft.key);
        else
          for (dt = et; dt <= tt; dt++)
            if (rn[dt - et] === 0 && Gn(Ft, E[dt])) {
              he = dt;
              break;
            }
        he === void 0 ? ut(Ft, I, $, !0) : (rn[he - et] = j + 1, he >= ne ? ne = he : fe = !0, x(
          Ft,
          E[he],
          R,
          null,
          I,
          $,
          q,
          H,
          z
        ), Ot++);
      }
      const br = fe ? Wc(rn) : Mn;
      for (dt = br.length - 1, j = At - 1; j >= 0; j--) {
        const Ft = et + j, he = E[Ft], jn = E[Ft + 1], Bn = Ft + 1 < nt ? (
          // #13559, fallback to el placeholder for unresolved async component
          jn.el || jn.placeholder
        ) : F;
        rn[j] === 0 ? x(
          null,
          he,
          R,
          Bn,
          I,
          $,
          q,
          H,
          z
        ) : fe && (dt < 0 || j !== br[dt] ? lt(he, R, Bn, 2) : dt--);
      }
    }
  }, lt = (_, E, R, F, I = null) => {
    const { el: $, type: q, transition: H, children: z, shapeFlag: j } = _;
    if (j & 6) {
      lt(_.component.subTree, E, R, F);
      return;
    }
    if (j & 128) {
      _.suspense.move(E, R, F);
      return;
    }
    if (j & 64) {
      q.move(_, E, R, ee);
      return;
    }
    if (q === pe) {
      r($, E, R);
      for (let W = 0; W < z.length; W++)
        lt(z[W], E, R, F);
      r(_.anchor, E, R);
      return;
    }
    if (q === Fi) {
      L(_, E, R);
      return;
    }
    if (F !== 2 && j & 1 && H)
      if (F === 0)
        H.beforeEnter($), r($, E, R), ie(() => H.enter($), I);
      else {
        const { leave: W, delayLeave: tt, afterLeave: it } = H, et = () => {
          _.ctx.isUnmounted ? i($) : r($, E, R);
        }, mt = () => {
          $._isLeaving && $[gc](
            !0
            /* cancelled */
          ), W($, () => {
            et(), it && it();
          });
        };
        tt ? tt($, et, mt) : mt();
      }
    else
      r($, E, R);
  }, ut = (_, E, R, F = !1, I = !1) => {
    const {
      type: $,
      props: q,
      ref: H,
      children: z,
      dynamicChildren: j,
      shapeFlag: nt,
      patchFlag: W,
      dirs: tt,
      cacheIndex: it
    } = _;
    if (W === -2 && (I = !1), H != null && (He(), Zn(H, null, R, _, !0), qe()), it != null && (E.renderCache[it] = void 0), nt & 256) {
      E.ctx.deactivate(_);
      return;
    }
    const et = nt & 1 && tt, mt = !tr(_);
    let dt;
    if (mt && (dt = q && q.onVnodeBeforeUnmount) && Me(dt, E, _), nt & 6)
      yt(_.component, R, F);
    else {
      if (nt & 128) {
        _.suspense.unmount(R, F);
        return;
      }
      et && sn(_, null, E, "beforeUnmount"), nt & 64 ? _.type.remove(
        _,
        E,
        R,
        ee,
        F
      ) : j && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !j.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      ($ !== pe || W > 0 && W & 64) ? kt(
        j,
        E,
        R,
        !1,
        !0
      ) : ($ === pe && W & 384 || !I && nt & 16) && kt(z, E, R), F && Tt(_);
    }
    (mt && (dt = q && q.onVnodeUnmounted) || et) && ie(() => {
      dt && Me(dt, E, _), et && sn(_, null, E, "unmounted");
    }, R);
  }, Tt = (_) => {
    const { type: E, el: R, anchor: F, transition: I } = _;
    if (E === pe) {
      wt(R, F);
      return;
    }
    if (E === Fi) {
      w(_);
      return;
    }
    const $ = () => {
      i(R), I && !I.persisted && I.afterLeave && I.afterLeave();
    };
    if (_.shapeFlag & 1 && I && !I.persisted) {
      const { leave: q, delayLeave: H } = I, z = () => q(R, $);
      H ? H(_.el, $, z) : z();
    } else
      $();
  }, wt = (_, E) => {
    let R;
    for (; _ !== E; )
      R = h(_), i(_), _ = R;
    i(E);
  }, yt = (_, E, R) => {
    const { bum: F, scope: I, job: $, subTree: q, um: H, m: z, a: j } = _;
    mo(z), mo(j), F && Ni(F), I.stop(), $ && ($.flags |= 8, ut(q, _, E, R)), H && ie(H, E), ie(() => {
      _.isUnmounted = !0;
    }, E);
  }, kt = (_, E, R, F = !1, I = !1, $ = 0) => {
    for (let q = $; q < _.length; q++)
      ut(_[q], E, R, F, I);
  }, St = (_) => {
    if (_.shapeFlag & 6)
      return St(_.component.subTree);
    if (_.shapeFlag & 128)
      return _.suspense.next();
    const E = h(_.anchor || _.el), R = E && E[dc];
    return R ? h(R) : E;
  };
  let Ct = !1;
  const Yt = (_, E, R) => {
    _ == null ? E._vnode && ut(E._vnode, null, null, !0) : x(
      E._vnode || null,
      _,
      E,
      null,
      null,
      null,
      R
    ), E._vnode = _, Ct || (Ct = !0, lo(), Vl(), Ct = !1);
  }, ee = {
    p: x,
    um: ut,
    m: lt,
    r: Tt,
    mt: S,
    mc: U,
    pc: D,
    pbc: Z,
    n: St,
    o: t
  };
  return {
    render: Yt,
    hydrate: void 0,
    createApp: $c(Yt)
  };
}
function $i({ type: t, props: e }, n) {
  return n === "svg" && t === "foreignObject" || n === "mathml" && t === "annotation-xml" && e && e.encoding && e.encoding.includes("html") ? void 0 : n;
}
function on({ effect: t, job: e }, n) {
  n ? (t.flags |= 32, e.flags |= 4) : (t.flags &= -33, e.flags &= -5);
}
function qc(t, e) {
  return (!t || t && !t.pendingBranch) && e && !e.persisted;
}
function su(t, e, n = !1) {
  const r = t.children, i = e.children;
  if (ot(r) && ot(i))
    for (let s = 0; s < r.length; s++) {
      const o = r[s];
      let l = i[s];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = i[s] = Ze(i[s]), l.el = o.el), !n && l.patchFlag !== -2 && su(o, l)), l.type === bi && // avoid cached text nodes retaining detached dom nodes
      l.patchFlag !== -1 && (l.el = o.el), l.type === In && !l.el && (l.el = o.el);
    }
}
function Wc(t) {
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
function ou(t) {
  const e = t.subTree.component;
  if (e)
    return e.asyncDep && !e.asyncResolved ? e : ou(e);
}
function mo(t) {
  if (t)
    for (let e = 0; e < t.length; e++)
      t[e].flags |= 8;
}
const Uc = Symbol.for("v-scx"), Kc = () => jr(Uc);
function Ai(t, e, n) {
  return lu(t, e, n);
}
function lu(t, e, n = vt) {
  const { immediate: r, deep: i, flush: s, once: o } = n, l = Pt({}, n), u = e && r || !e && s !== "post";
  let c;
  if (ar) {
    if (s === "sync") {
      const g = Kc();
      c = g.__watcherHandles || (g.__watcherHandles = []);
    } else if (!u) {
      const g = () => {
      };
      return g.stop = Pe, g.resume = Pe, g.pause = Pe, g;
    }
  }
  const a = qt;
  l.call = (g, y, x) => Ie(g, a, y, x);
  let f = !1;
  s === "post" ? l.scheduler = (g) => {
    ie(g, a && a.suspense);
  } : s !== "sync" && (f = !0, l.scheduler = (g, y) => {
    y ? g() : Ns(g);
  }), l.augmentJob = (g) => {
    e && (g.flags |= 4), f && (g.flags |= 2, a && (g.id = a.uid, g.i = a));
  };
  const h = uc(t, e, l);
  return ar && (c ? c.push(h) : u && h()), h;
}
function Xc(t, e, n) {
  const r = this.proxy, i = Lt(t) ? t.includes(".") ? uu(r, t) : () => r[t] : t.bind(r, r);
  let s;
  at(e) ? s = e : (s = e.handler, n = e);
  const o = wr(this), l = lu(i, s.bind(r), n);
  return o(), l;
}
function uu(t, e) {
  const n = e.split(".");
  return () => {
    let r = t;
    for (let i = 0; i < n.length && r; i++)
      r = r[n[i]];
    return r;
  };
}
const Yc = (t, e) => e === "modelValue" || e === "model-value" ? t.modelModifiers : t[`${e}Modifiers`] || t[`${Ee(e)}Modifiers`] || t[`${ge(e)}Modifiers`];
function Jc(t, e, ...n) {
  if (t.isUnmounted) return;
  const r = t.vnode.props || vt;
  let i = n;
  const s = e.startsWith("update:"), o = s && Yc(r, e.slice(7));
  o && (o.trim && (i = n.map((a) => Lt(a) ? a.trim() : a)), o.number && (i = n.map(Ta)));
  let l, u = r[l = Ci(e)] || // also try camelCase event handler (#2249)
  r[l = Ci(Ee(e))];
  !u && s && (u = r[l = Ci(ge(e))]), u && Ie(
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
    t.emitted[l] = !0, Ie(
      c,
      t,
      6,
      i
    );
  }
}
const Qc = /* @__PURE__ */ new WeakMap();
function au(t, e, n = !1) {
  const r = n ? Qc : e.emitsCache, i = r.get(t);
  if (i !== void 0)
    return i;
  const s = t.emits;
  let o = {}, l = !1;
  if (!at(t)) {
    const u = (c) => {
      const a = au(c, e, !0);
      a && (l = !0, Pt(o, a));
    };
    !n && e.mixins.length && e.mixins.forEach(u), t.extends && u(t.extends), t.mixins && t.mixins.forEach(u);
  }
  return !s && !l ? (Mt(t) && r.set(t, null), null) : (ot(s) ? s.forEach((u) => o[u] = null) : Pt(o, s), Mt(t) && r.set(t, o), o);
}
function vi(t, e) {
  return !t || !fi(e) ? !1 : (e = e.slice(2).replace(/Once$/, ""), pt(t, e[0].toLowerCase() + e.slice(1)) || pt(t, ge(e)) || pt(t, e));
}
function wo(t) {
  const {
    type: e,
    vnode: n,
    proxy: r,
    withProxy: i,
    propsOptions: [s],
    slots: o,
    attrs: l,
    emit: u,
    render: c,
    renderCache: a,
    props: f,
    data: h,
    setupState: g,
    ctx: y,
    inheritAttrs: x
  } = t, v = Xr(t);
  let p, k;
  try {
    if (n.shapeFlag & 4) {
      const w = i || r, C = w;
      p = Re(
        c.call(
          C,
          w,
          a,
          f,
          g,
          h,
          y
        )
      ), k = l;
    } else {
      const w = e;
      p = Re(
        w.length > 1 ? w(
          f,
          { attrs: l, slots: o, emit: u }
        ) : w(
          f,
          null
        )
      ), k = e.props ? l : Zc(l);
    }
  } catch (w) {
    nr.length = 0, yi(w, t, 1), p = ze(In);
  }
  let L = p;
  if (k && x !== !1) {
    const w = Object.keys(k), { shapeFlag: C } = L;
    w.length && C & 7 && (s && w.some(ws) && (k = tf(
      k,
      s
    )), L = $n(L, k, !1, !0));
  }
  return n.dirs && (L = $n(L, null, !1, !0), L.dirs = L.dirs ? L.dirs.concat(n.dirs) : n.dirs), n.transition && Rs(L, n.transition), p = L, Xr(v), p;
}
const Zc = (t) => {
  let e;
  for (const n in t)
    (n === "class" || n === "style" || fi(n)) && ((e || (e = {}))[n] = t[n]);
  return e;
}, tf = (t, e) => {
  const n = {};
  for (const r in t)
    (!ws(r) || !(r.slice(9) in e)) && (n[r] = t[r]);
  return n;
};
function ef(t, e, n) {
  const { props: r, children: i, component: s } = t, { props: o, children: l, patchFlag: u } = e, c = s.emitsOptions;
  if (e.dirs || e.transition)
    return !0;
  if (n && u >= 0) {
    if (u & 1024)
      return !0;
    if (u & 16)
      return r ? yo(r, o, c) : !!o;
    if (u & 8) {
      const a = e.dynamicProps;
      for (let f = 0; f < a.length; f++) {
        const h = a[f];
        if (o[h] !== r[h] && !vi(c, h))
          return !0;
      }
    }
  } else
    return (i || l) && (!l || !l.$stable) ? !0 : r === o ? !1 : r ? o ? yo(r, o, c) : !0 : !!o;
  return !1;
}
function yo(t, e, n) {
  const r = Object.keys(e);
  if (r.length !== Object.keys(t).length)
    return !0;
  for (let i = 0; i < r.length; i++) {
    const s = r[i];
    if (e[s] !== t[s] && !vi(n, s))
      return !0;
  }
  return !1;
}
function nf({ vnode: t, parent: e }, n) {
  for (; e; ) {
    const r = e.subTree;
    if (r.suspense && r.suspense.activeBranch === t && (r.el = t.el), r === t)
      (t = e.vnode).el = n, e = e.parent;
    else
      break;
  }
}
const cu = (t) => t.__isSuspense;
function rf(t, e) {
  e && e.pendingBranch ? ot(t) ? e.effects.push(...t) : e.effects.push(t) : fc(t);
}
const pe = Symbol.for("v-fgt"), bi = Symbol.for("v-txt"), In = Symbol.for("v-cmt"), Fi = Symbol.for("v-stc"), nr = [];
let ue = null;
function Xe(t = !1) {
  nr.push(ue = t ? null : []);
}
function sf() {
  nr.pop(), ue = nr[nr.length - 1] || null;
}
let ur = 1;
function _o(t, e = !1) {
  ur += t, t < 0 && ue && e && (ue.hasOnce = !0);
}
function of(t) {
  return t.dynamicChildren = ur > 0 ? ue || Mn : null, sf(), ur > 0 && ue && ue.push(t), t;
}
function Ye(t, e, n, r, i, s) {
  return of(
    oe(
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
function fu(t) {
  return t ? t.__v_isVNode === !0 : !1;
}
function Gn(t, e) {
  return t.type === e.type && t.key === e.key;
}
const hu = ({ key: t }) => t ?? null, Br = ({
  ref: t,
  ref_key: e,
  ref_for: n
}) => (typeof t == "number" && (t = "" + t), t != null ? Lt(t) || Dt(t) || at(t) ? { i: me, r: t, k: e, f: !!n } : t : null);
function oe(t, e = null, n = null, r = 0, i = null, s = t === pe ? 0 : 1, o = !1, l = !1) {
  const u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t,
    props: e,
    key: e && hu(e),
    ref: e && Br(e),
    scopeId: zl,
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
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: s,
    patchFlag: r,
    dynamicProps: i,
    dynamicChildren: null,
    appContext: null,
    ctx: me
  };
  return l ? ($s(u, n), s & 128 && t.normalize(u)) : n && (u.shapeFlag |= Lt(n) ? 8 : 16), ur > 0 && // avoid a block node from tracking itself
  !o && // has current parent block
  ue && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (u.patchFlag > 0 || s & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  u.patchFlag !== 32 && ue.push(u), u;
}
const ze = lf;
function lf(t, e = null, n = null, r = 0, i = null, s = !1) {
  if ((!t || t === Tc) && (t = In), fu(t)) {
    const l = $n(
      t,
      e,
      !0
      /* mergeRef: true */
    );
    return n && $s(l, n), ur > 0 && !s && ue && (l.shapeFlag & 6 ? ue[ue.indexOf(t)] = l : ue.push(l)), l.patchFlag = -2, l;
  }
  if (_f(t) && (t = t.__vccOpts), e) {
    e = uf(e);
    let { class: l, style: u } = e;
    l && !Lt(l) && (e.class = bs(l)), Mt(u) && (Cs(u) && !ot(u) && (u = Pt({}, u)), e.style = vs(u));
  }
  const o = Lt(t) ? 1 : cu(t) ? 128 : pc(t) ? 64 : Mt(t) ? 4 : at(t) ? 2 : 0;
  return oe(
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
function uf(t) {
  return t ? Cs(t) || Zl(t) ? Pt({}, t) : t : null;
}
function $n(t, e, n = !1, r = !1) {
  const { props: i, ref: s, patchFlag: o, children: l, transition: u } = t, c = e ? cf(i || {}, e) : i, a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t.type,
    props: c,
    key: c && hu(c),
    ref: e && e.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && s ? ot(s) ? s.concat(Br(e)) : [s, Br(e)] : Br(e)
    ) : s,
    scopeId: t.scopeId,
    slotScopeIds: t.slotScopeIds,
    children: l,
    target: t.target,
    targetStart: t.targetStart,
    targetAnchor: t.targetAnchor,
    staticCount: t.staticCount,
    shapeFlag: t.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: e && t.type !== pe ? o === -1 ? 16 : o | 16 : o,
    dynamicProps: t.dynamicProps,
    dynamicChildren: t.dynamicChildren,
    appContext: t.appContext,
    dirs: t.dirs,
    transition: u,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: t.component,
    suspense: t.suspense,
    ssContent: t.ssContent && $n(t.ssContent),
    ssFallback: t.ssFallback && $n(t.ssFallback),
    placeholder: t.placeholder,
    el: t.el,
    anchor: t.anchor,
    ctx: t.ctx,
    ce: t.ce
  };
  return u && r && Rs(
    a,
    u.clone(a)
  ), a;
}
function af(t = " ", e = 0) {
  return ze(bi, null, t, e);
}
function Re(t) {
  return t == null || typeof t == "boolean" ? ze(In) : ot(t) ? ze(
    pe,
    null,
    // #3666, avoid reference pollution when reusing vnode
    t.slice()
  ) : fu(t) ? Ze(t) : ze(bi, null, String(t));
}
function Ze(t) {
  return t.el === null && t.patchFlag !== -1 || t.memo ? t : $n(t);
}
function $s(t, e) {
  let n = 0;
  const { shapeFlag: r } = t;
  if (e == null)
    e = null;
  else if (ot(e))
    n = 16;
  else if (typeof e == "object")
    if (r & 65) {
      const i = e.default;
      i && (i._c && (i._d = !1), $s(t, i()), i._c && (i._d = !0));
      return;
    } else {
      n = 32;
      const i = e._;
      !i && !Zl(e) ? e._ctx = me : i === 3 && me && (me.slots._ === 1 ? e._ = 1 : (e._ = 2, t.patchFlag |= 1024));
    }
  else at(e) ? (e = { default: e, _ctx: me }, n = 32) : (e = String(e), r & 64 ? (n = 16, e = [af(e)]) : n = 8);
  t.children = e, t.shapeFlag |= n;
}
function cf(...t) {
  const e = {};
  for (let n = 0; n < t.length; n++) {
    const r = t[n];
    for (const i in r)
      if (i === "class")
        e.class !== r.class && (e.class = bs([e.class, r.class]));
      else if (i === "style")
        e.style = vs([e.style, r.style]);
      else if (fi(i)) {
        const s = e[i], o = r[i];
        o && s !== o && !(ot(s) && s.includes(o)) && (e[i] = s ? [].concat(s, o) : o);
      } else i !== "" && (e[i] = r[i]);
  }
  return e;
}
function Me(t, e, n, r = null) {
  Ie(t, e, 7, [
    n,
    r
  ]);
}
const ff = Yl();
let hf = 0;
function df(t, e, n) {
  const r = t.type, i = (e ? e.appContext : t.appContext) || ff, s = {
    uid: hf++,
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
    job: null,
    scope: new Ia(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: e ? e.provides : Object.create(i.provides),
    ids: e ? e.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: eu(r, i),
    emitsOptions: au(r, i),
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
  return s.ctx = { _: s }, s.root = e ? e.root : s, s.emit = Jc.bind(null, s), t.ce && t.ce(s), s;
}
let qt = null;
const pf = () => qt || me;
let Qr, es;
{
  const t = gi(), e = (n, r) => {
    let i;
    return (i = t[n]) || (i = t[n] = []), i.push(r), (s) => {
      i.length > 1 ? i.forEach((o) => o(s)) : i[0](s);
    };
  };
  Qr = e(
    "__VUE_INSTANCE_SETTERS__",
    (n) => qt = n
  ), es = e(
    "__VUE_SSR_SETTERS__",
    (n) => ar = n
  );
}
const wr = (t) => {
  const e = qt;
  return Qr(t), t.scope.on(), () => {
    t.scope.off(), Qr(e);
  };
}, vo = () => {
  qt && qt.scope.off(), Qr(null);
};
function du(t) {
  return t.vnode.shapeFlag & 4;
}
let ar = !1;
function gf(t, e = !1, n = !1) {
  e && es(e);
  const { props: r, children: i } = t.vnode, s = du(t);
  Fc(t, r, s, e), Vc(t, i, n || e);
  const o = s ? mf(t, e) : void 0;
  return e && es(!1), o;
}
function mf(t, e) {
  const n = t.type;
  t.accessCache = /* @__PURE__ */ Object.create(null), t.proxy = new Proxy(t.ctx, Cc);
  const { setup: r } = n;
  if (r) {
    He();
    const i = t.setupContext = r.length > 1 ? yf(t) : null, s = wr(t), o = mr(
      r,
      t,
      0,
      [
        t.props,
        i
      ]
    ), l = gl(o);
    if (qe(), s(), (l || t.sp) && !tr(t) && Hl(t), l) {
      if (o.then(vo, vo), e)
        return o.then((u) => {
          bo(t, u);
        }).catch((u) => {
          yi(u, t, 0);
        });
      t.asyncDep = o;
    } else
      bo(t, o);
  } else
    pu(t);
}
function bo(t, e, n) {
  at(e) ? t.type.__ssrInlineRender ? t.ssrRender = e : t.render = e : Mt(e) && (t.setupState = Fl(e)), pu(t);
}
function pu(t, e, n) {
  const r = t.type;
  t.render || (t.render = r.render || Pe);
  {
    const i = wr(t);
    He();
    try {
      Nc(t);
    } finally {
      qe(), i();
    }
  }
}
const wf = {
  get(t, e) {
    return Bt(t, "get", ""), t[e];
  }
};
function yf(t) {
  const e = (n) => {
    t.exposed = n || {};
  };
  return {
    attrs: new Proxy(t.attrs, wf),
    slots: t.slots,
    emit: t.emit,
    expose: e
  };
}
function xi(t) {
  return t.exposed ? t.exposeProxy || (t.exposeProxy = new Proxy(Fl(ec(t.exposed)), {
    get(e, n) {
      if (n in e)
        return e[n];
      if (n in er)
        return er[n](t);
    },
    has(e, n) {
      return n in e || n in er;
    }
  })) : t.proxy;
}
function _f(t) {
  return at(t) && "__vccOpts" in t;
}
const ns = (t, e) => oc(t, e, ar), vf = "3.5.21";
/**
* @vue/runtime-dom v3.5.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let rs;
const xo = typeof window < "u" && window.trustedTypes;
if (xo)
  try {
    rs = /* @__PURE__ */ xo.createPolicy("vue", {
      createHTML: (t) => t
    });
  } catch {
  }
const gu = rs ? (t) => rs.createHTML(t) : (t) => t, bf = "http://www.w3.org/2000/svg", xf = "http://www.w3.org/1998/Math/MathML", Be = typeof document < "u" ? document : null, Eo = Be && /* @__PURE__ */ Be.createElement("template"), Ef = {
  insert: (t, e, n) => {
    e.insertBefore(t, n || null);
  },
  remove: (t) => {
    const e = t.parentNode;
    e && e.removeChild(t);
  },
  createElement: (t, e, n, r) => {
    const i = e === "svg" ? Be.createElementNS(bf, t) : e === "mathml" ? Be.createElementNS(xf, t) : n ? Be.createElement(t, { is: n }) : Be.createElement(t);
    return t === "select" && r && r.multiple != null && i.setAttribute("multiple", r.multiple), i;
  },
  createText: (t) => Be.createTextNode(t),
  createComment: (t) => Be.createComment(t),
  setText: (t, e) => {
    t.nodeValue = e;
  },
  setElementText: (t, e) => {
    t.textContent = e;
  },
  parentNode: (t) => t.parentNode,
  nextSibling: (t) => t.nextSibling,
  querySelector: (t) => Be.querySelector(t),
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
      Eo.innerHTML = gu(
        r === "svg" ? `<svg>${t}</svg>` : r === "mathml" ? `<math>${t}</math>` : t
      );
      const l = Eo.content;
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
}, Sf = Symbol("_vtc");
function kf(t, e, n) {
  const r = t[Sf];
  r && (e = (e ? [e, ...r] : [...r]).join(" ")), e == null ? t.removeAttribute("class") : n ? t.setAttribute("class", e) : t.className = e;
}
const Zr = Symbol("_vod"), mu = Symbol("_vsh"), Dr = {
  // used for prop mismatch check during hydration
  name: "show",
  beforeMount(t, { value: e }, { transition: n }) {
    t[Zr] = t.style.display === "none" ? "" : t.style.display, n && e ? n.beforeEnter(t) : zn(t, e);
  },
  mounted(t, { value: e }, { transition: n }) {
    n && e && n.enter(t);
  },
  updated(t, { value: e, oldValue: n }, { transition: r }) {
    !e != !n && (r ? e ? (r.beforeEnter(t), zn(t, !0), r.enter(t)) : r.leave(t, () => {
      zn(t, !1);
    }) : zn(t, e));
  },
  beforeUnmount(t, { value: e }) {
    zn(t, e);
  }
};
function zn(t, e) {
  t.style.display = e ? t[Zr] : "none", t[mu] = !e;
}
const Mf = Symbol(""), Tf = /(?:^|;)\s*display\s*:/;
function Cf(t, e, n) {
  const r = t.style, i = Lt(n);
  let s = !1;
  if (n && !i) {
    if (e)
      if (Lt(e))
        for (const o of e.split(";")) {
          const l = o.slice(0, o.indexOf(":")).trim();
          n[l] == null && Vr(r, l, "");
        }
      else
        for (const o in e)
          n[o] == null && Vr(r, o, "");
    for (const o in n)
      o === "display" && (s = !0), Vr(r, o, n[o]);
  } else if (i) {
    if (e !== n) {
      const o = r[Mf];
      o && (n += ";" + o), r.cssText = n, s = Tf.test(n);
    }
  } else e && t.removeAttribute("style");
  Zr in t && (t[Zr] = s ? r.display : "", t[mu] && (r.display = "none"));
}
const So = /\s*!important$/;
function Vr(t, e, n) {
  if (ot(n))
    n.forEach((r) => Vr(t, e, r));
  else if (n == null && (n = ""), e.startsWith("--"))
    t.setProperty(e, n);
  else {
    const r = Nf(t, e);
    So.test(n) ? t.setProperty(
      ge(r),
      n.replace(So, ""),
      "important"
    ) : t[r] = n;
  }
}
const ko = ["Webkit", "Moz", "ms"], ji = {};
function Nf(t, e) {
  const n = ji[e];
  if (n)
    return n;
  let r = Ee(e);
  if (r !== "filter" && r in t)
    return ji[e] = r;
  r = wl(r);
  for (let i = 0; i < ko.length; i++) {
    const s = ko[i] + r;
    if (s in t)
      return ji[e] = s;
  }
  return e;
}
const Mo = "http://www.w3.org/1999/xlink";
function To(t, e, n, r, i, s = Oa(e)) {
  r && e.startsWith("xlink:") ? n == null ? t.removeAttributeNS(Mo, e.slice(6, e.length)) : t.setAttributeNS(Mo, e, n) : n == null || s && !_l(n) ? t.removeAttribute(e) : t.setAttribute(
    e,
    s ? "" : nn(n) ? String(n) : n
  );
}
function Co(t, e, n, r, i) {
  if (e === "innerHTML" || e === "textContent") {
    n != null && (t[e] = e === "innerHTML" ? gu(n) : n);
    return;
  }
  const s = t.tagName;
  if (e === "value" && s !== "PROGRESS" && // custom elements may use _value internally
  !s.includes("-")) {
    const l = s === "OPTION" ? t.getAttribute("value") || "" : t.value, u = n == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      t.type === "checkbox" ? "on" : ""
    ) : String(n);
    (l !== u || !("_value" in t)) && (t.value = u), n == null && t.removeAttribute(e), t._value = n;
    return;
  }
  let o = !1;
  if (n === "" || n == null) {
    const l = typeof t[e];
    l === "boolean" ? n = _l(n) : n == null && l === "string" ? (n = "", o = !0) : l === "number" && (n = 0, o = !0);
  }
  try {
    t[e] = n;
  } catch {
  }
  o && t.removeAttribute(i || e);
}
function Rf(t, e, n, r) {
  t.addEventListener(e, n, r);
}
function Lf(t, e, n, r) {
  t.removeEventListener(e, n, r);
}
const No = Symbol("_vei");
function Pf(t, e, n, r, i = null) {
  const s = t[No] || (t[No] = {}), o = s[e];
  if (r && o)
    o.value = r;
  else {
    const [l, u] = Of(e);
    if (r) {
      const c = s[e] = Af(
        r,
        i
      );
      Rf(t, l, c, u);
    } else o && (Lf(t, l, o, u), s[e] = void 0);
  }
}
const Ro = /(?:Once|Passive|Capture)$/;
function Of(t) {
  let e;
  if (Ro.test(t)) {
    e = {};
    let r;
    for (; r = t.match(Ro); )
      t = t.slice(0, t.length - r[0].length), e[r[0].toLowerCase()] = !0;
  }
  return [t[2] === ":" ? t.slice(3) : ge(t.slice(2)), e];
}
let Bi = 0;
const If = /* @__PURE__ */ Promise.resolve(), $f = () => Bi || (If.then(() => Bi = 0), Bi = Date.now());
function Af(t, e) {
  const n = (r) => {
    if (!r._vts)
      r._vts = Date.now();
    else if (r._vts <= n.attached)
      return;
    Ie(
      Ff(r, n.value),
      e,
      5,
      [r]
    );
  };
  return n.value = t, n.attached = $f(), n;
}
function Ff(t, e) {
  if (ot(e)) {
    const n = t.stopImmediatePropagation;
    return t.stopImmediatePropagation = () => {
      n.call(t), t._stopped = !0;
    }, e.map(
      (r) => (i) => !i._stopped && r && r(i)
    );
  } else
    return e;
}
const Lo = (t) => t.charCodeAt(0) === 111 && t.charCodeAt(1) === 110 && // lowercase letter
t.charCodeAt(2) > 96 && t.charCodeAt(2) < 123, jf = (t, e, n, r, i, s) => {
  const o = i === "svg";
  e === "class" ? kf(t, r, o) : e === "style" ? Cf(t, n, r) : fi(e) ? ws(e) || Pf(t, e, n, r, s) : (e[0] === "." ? (e = e.slice(1), !0) : e[0] === "^" ? (e = e.slice(1), !1) : Bf(t, e, r, o)) ? (Co(t, e, r), !t.tagName.includes("-") && (e === "value" || e === "checked" || e === "selected") && To(t, e, r, o, s, e !== "value")) : /* #11081 force set props for possible async custom element */ t._isVueCE && (/[A-Z]/.test(e) || !Lt(r)) ? Co(t, Ee(e), r, s, e) : (e === "true-value" ? t._trueValue = r : e === "false-value" && (t._falseValue = r), To(t, e, r, o));
};
function Bf(t, e, n, r) {
  if (r)
    return !!(e === "innerHTML" || e === "textContent" || e in t && Lo(e) && at(n));
  if (e === "spellcheck" || e === "draggable" || e === "translate" || e === "autocorrect" || e === "form" || e === "list" && t.tagName === "INPUT" || e === "type" && t.tagName === "TEXTAREA")
    return !1;
  if (e === "width" || e === "height") {
    const i = t.tagName;
    if (i === "IMG" || i === "VIDEO" || i === "CANVAS" || i === "SOURCE")
      return !1;
  }
  return Lo(e) && Lt(n) ? !1 : e in t;
}
const Po = {};
// @__NO_SIDE_EFFECTS__
function Df(t, e, n) {
  let r = /* @__PURE__ */ Ls(t, e);
  di(r) && (r = Pt({}, r, e));
  class i extends As {
    constructor(o) {
      super(r, o, n);
    }
  }
  return i.def = r, i;
}
const Vf = typeof HTMLElement < "u" ? HTMLElement : class {
};
class As extends Vf {
  constructor(e, n = {}, r = Io) {
    super(), this._def = e, this._props = n, this._createApp = r, this._isVueCE = !0, this._instance = null, this._app = null, this._nonce = this._def.nonce, this._connected = !1, this._resolved = !1, this._numberProps = null, this._styleChildren = /* @__PURE__ */ new WeakSet(), this._ob = null, this.shadowRoot && r !== Io ? this._root = this.shadowRoot : e.shadowRoot !== !1 ? (this.attachShadow({ mode: "open" }), this._root = this.shadowRoot) : this._root = this;
  }
  connectedCallback() {
    if (!this.isConnected) return;
    !this.shadowRoot && !this._resolved && this._parseSlots(), this._connected = !0;
    let e = this;
    for (; e = e && (e.parentNode || e.host); )
      if (e instanceof As) {
        this._parent = e;
        break;
      }
    this._instance || (this._resolved ? this._mount(this._def) : e && e._pendingResolve ? this._pendingResolve = e._pendingResolve.then(() => {
      this._pendingResolve = void 0, this._resolveDef();
    }) : this._resolveDef());
  }
  _setParent(e = this._parent) {
    e && (this._instance.parent = e._instance, this._inheritParentContext(e));
  }
  _inheritParentContext(e = this._parent) {
    e && this._app && Object.setPrototypeOf(
      this._app._context.provides,
      e._instance.provides
    );
  }
  disconnectedCallback() {
    this._connected = !1, Bl(() => {
      this._connected || (this._ob && (this._ob.disconnect(), this._ob = null), this._app && this._app.unmount(), this._instance && (this._instance.ce = void 0), this._app = this._instance = null);
    });
  }
  /**
   * resolve inner component definition (handle possible async component)
   */
  _resolveDef() {
    if (this._pendingResolve)
      return;
    for (let r = 0; r < this.attributes.length; r++)
      this._setAttr(this.attributes[r].name);
    this._ob = new MutationObserver((r) => {
      for (const i of r)
        this._setAttr(i.attributeName);
    }), this._ob.observe(this, { attributes: !0 });
    const e = (r, i = !1) => {
      this._resolved = !0, this._pendingResolve = void 0;
      const { props: s, styles: o } = r;
      let l;
      if (s && !ot(s))
        for (const u in s) {
          const c = s[u];
          (c === Number || c && c.type === Number) && (u in this._props && (this._props[u] = no(this._props[u])), (l || (l = /* @__PURE__ */ Object.create(null)))[Ee(u)] = !0);
        }
      this._numberProps = l, this._resolveProps(r), this.shadowRoot && this._applyStyles(o), this._mount(r);
    }, n = this._def.__asyncLoader;
    n ? this._pendingResolve = n().then((r) => {
      r.configureApp = this._def.configureApp, e(this._def = r, !0);
    }) : e(this._def);
  }
  _mount(e) {
    this._app = this._createApp(e), this._inheritParentContext(), e.configureApp && e.configureApp(this._app), this._app._ceVNode = this._createVNode(), this._app.mount(this._root);
    const n = this._instance && this._instance.exposed;
    if (n)
      for (const r in n)
        pt(this, r) || Object.defineProperty(this, r, {
          // unwrap ref to be consistent with public instance behavior
          get: () => On(n[r])
        });
  }
  _resolveProps(e) {
    const { props: n } = e, r = ot(n) ? n : Object.keys(n || {});
    for (const i of Object.keys(this))
      i[0] !== "_" && r.includes(i) && this._setProp(i, this[i]);
    for (const i of r.map(Ee))
      Object.defineProperty(this, i, {
        get() {
          return this._getProp(i);
        },
        set(s) {
          this._setProp(i, s, !0, !0);
        }
      });
  }
  _setAttr(e) {
    if (e.startsWith("data-v-")) return;
    const n = this.hasAttribute(e);
    let r = n ? this.getAttribute(e) : Po;
    const i = Ee(e);
    n && this._numberProps && this._numberProps[i] && (r = no(r)), this._setProp(i, r, !1, !0);
  }
  /**
   * @internal
   */
  _getProp(e) {
    return this._props[e];
  }
  /**
   * @internal
   */
  _setProp(e, n, r = !0, i = !1) {
    if (n !== this._props[e] && (n === Po ? delete this._props[e] : (this._props[e] = n, e === "key" && this._app && (this._app._ceVNode.key = n)), i && this._instance && this._update(), r)) {
      const s = this._ob;
      s && s.disconnect(), n === !0 ? this.setAttribute(ge(e), "") : typeof n == "string" || typeof n == "number" ? this.setAttribute(ge(e), n + "") : n || this.removeAttribute(ge(e)), s && s.observe(this, { attributes: !0 });
    }
  }
  _update() {
    const e = this._createVNode();
    this._app && (e.appContext = this._app._context), zf(e, this._root);
  }
  _createVNode() {
    const e = {};
    this.shadowRoot || (e.onVnodeMounted = e.onVnodeUpdated = this._renderSlots.bind(this));
    const n = ze(this._def, Pt(e, this._props));
    return this._instance || (n.ce = (r) => {
      this._instance = r, r.ce = this, r.isCE = !0;
      const i = (s, o) => {
        this.dispatchEvent(
          new CustomEvent(
            s,
            di(o[0]) ? Pt({ detail: o }, o[0]) : { detail: o }
          )
        );
      };
      r.emit = (s, ...o) => {
        i(s, o), ge(s) !== s && i(ge(s), o);
      }, this._setParent();
    }), n;
  }
  _applyStyles(e, n) {
    if (!e) return;
    if (n) {
      if (n === this._def || this._styleChildren.has(n))
        return;
      this._styleChildren.add(n);
    }
    const r = this._nonce;
    for (let i = e.length - 1; i >= 0; i--) {
      const s = document.createElement("style");
      r && s.setAttribute("nonce", r), s.textContent = e[i], this.shadowRoot.prepend(s);
    }
  }
  /**
   * Only called when shadowRoot is false
   */
  _parseSlots() {
    const e = this._slots = {};
    let n;
    for (; n = this.firstChild; ) {
      const r = n.nodeType === 1 && n.getAttribute("slot") || "default";
      (e[r] || (e[r] = [])).push(n), this.removeChild(n);
    }
  }
  /**
   * Only called when shadowRoot is false
   */
  _renderSlots() {
    const e = (this._teleportTarget || this).querySelectorAll("slot"), n = this._instance.type.__scopeId;
    for (let r = 0; r < e.length; r++) {
      const i = e[r], s = i.getAttribute("name") || "default", o = this._slots[s], l = i.parentNode;
      if (o)
        for (const u of o) {
          if (n && u.nodeType === 1) {
            const c = n + "-s", a = document.createTreeWalker(u, 1);
            u.setAttribute(c, "");
            let f;
            for (; f = a.nextNode(); )
              f.setAttribute(c, "");
          }
          l.insertBefore(u, i);
        }
      else
        for (; i.firstChild; ) l.insertBefore(i.firstChild, i);
      l.removeChild(i);
    }
  }
  /**
   * @internal
   */
  _injectChildStyle(e) {
    this._applyStyles(e.styles, e);
  }
  /**
   * @internal
   */
  _removeChildStyle(e) {
  }
}
const Gf = /* @__PURE__ */ Pt({ patchProp: jf }, Ef);
let Oo;
function wu() {
  return Oo || (Oo = zc(Gf));
}
const zf = (...t) => {
  wu().render(...t);
}, Io = (...t) => {
  const e = wu().createApp(...t), { mount: n } = e;
  return e.mount = (r) => {
    const i = qf(r);
    if (!i) return;
    const s = e._component;
    !at(s) && !s.render && !s.template && (s.template = i.innerHTML), i.nodeType === 1 && (i.textContent = "");
    const o = n(i, !1, Hf(i));
    return i instanceof Element && (i.removeAttribute("v-cloak"), i.setAttribute("data-v-app", "")), o;
  }, e;
};
function Hf(t) {
  if (t instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && t instanceof MathMLElement)
    return "mathml";
}
function qf(t) {
  return Lt(t) ? document.querySelector(t) : t;
}
const Wf = { class: "graph-controller__controls-overview" }, Uf = { key: 0 }, Kf = { key: 1 }, Xf = { key: 0 }, Yf = { key: 1 }, Jf = /* @__PURE__ */ Ls({
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
    return (o, l) => (Xe(), Ye("table", Wf, [
      Fr(oe("thead", null, [
        oe("tr", null, [
          oe("th", null, je(i[0]), 1),
          oe("th", null, je(i[1]), 1)
        ])
      ], 512), [
        [Dr, e.showHeader]
      ]),
      oe("tbody", null, [
        (Xe(), Ye(pe, null, ao(n, (u) => Fr(oe("tr", {
          key: u.action
        }, [
          oe("td", null, je(u.action), 1),
          On(s) ? (Xe(), Ye("td", Uf, je(u.touch), 1)) : (Xe(), Ye("td", Kf, je(u.desktop), 1))
        ]), [
          [Dr, e.showControlsGraph]
        ])), 64)),
        (Xe(), Ye(pe, null, ao(r, (u) => Fr(oe("tr", {
          key: u.action
        }, [
          oe("td", null, je(u.action), 1),
          On(s) ? (Xe(), Ye("td", Xf, je(u.touch), 1)) : (Xe(), Ye("td", Yf, je(u.desktop), 1))
        ]), [
          [Dr, e.showControlsEnvironment]
        ])), 64))
      ])
    ]));
  }
}), Qf = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [r, i] of e)
    n[r] = i;
  return n;
}, Zf = /* @__PURE__ */ Qf(Jf, [["__scopeId", "data-v-8c3d818f"]]);
var th = { value: () => {
} };
function yr() {
  for (var t = 0, e = arguments.length, n = {}, r; t < e; ++t) {
    if (!(r = arguments[t] + "") || r in n || /[\s.]/.test(r)) throw new Error("illegal type: " + r);
    n[r] = [];
  }
  return new Gr(n);
}
function Gr(t) {
  this._ = t;
}
function eh(t, e) {
  return t.trim().split(/^|\s+/).map(function(n) {
    var r = "", i = n.indexOf(".");
    if (i >= 0 && (r = n.slice(i + 1), n = n.slice(0, i)), n && !e.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: r };
  });
}
Gr.prototype = yr.prototype = {
  constructor: Gr,
  on: function(t, e) {
    var n = this._, r = eh(t + "", n), i, s = -1, o = r.length;
    if (arguments.length < 2) {
      for (; ++s < o; ) if ((i = (t = r[s]).type) && (i = nh(n[i], t.name))) return i;
      return;
    }
    if (e != null && typeof e != "function") throw new Error("invalid callback: " + e);
    for (; ++s < o; )
      if (i = (t = r[s]).type) n[i] = $o(n[i], t.name, e);
      else if (e == null) for (i in n) n[i] = $o(n[i], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, e = this._;
    for (var n in e) t[n] = e[n].slice();
    return new Gr(t);
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
function nh(t, e) {
  for (var n = 0, r = t.length, i; n < r; ++n)
    if ((i = t[n]).name === e)
      return i.value;
}
function $o(t, e, n) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === e) {
      t[r] = th, t = t.slice(0, r).concat(t.slice(r + 1));
      break;
    }
  return n != null && t.push({ name: e, value: n }), t;
}
var is = "http://www.w3.org/1999/xhtml";
const Ao = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: is,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Ei(t) {
  var e = t += "", n = e.indexOf(":");
  return n >= 0 && (e = t.slice(0, n)) !== "xmlns" && (t = t.slice(n + 1)), Ao.hasOwnProperty(e) ? { space: Ao[e], local: t } : t;
}
function rh(t) {
  return function() {
    var e = this.ownerDocument, n = this.namespaceURI;
    return n === is && e.documentElement.namespaceURI === is ? e.createElement(t) : e.createElementNS(n, t);
  };
}
function ih(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function yu(t) {
  var e = Ei(t);
  return (e.local ? ih : rh)(e);
}
function sh() {
}
function Fs(t) {
  return t == null ? sh : function() {
    return this.querySelector(t);
  };
}
function oh(t) {
  typeof t != "function" && (t = Fs(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var s = e[i], o = s.length, l = r[i] = new Array(o), u, c, a = 0; a < o; ++a)
      (u = s[a]) && (c = t.call(u, u.__data__, a, s)) && ("__data__" in u && (c.__data__ = u.__data__), l[a] = c);
  return new ce(r, this._parents);
}
function lh(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function uh() {
  return [];
}
function _u(t) {
  return t == null ? uh : function() {
    return this.querySelectorAll(t);
  };
}
function ah(t) {
  return function() {
    return lh(t.apply(this, arguments));
  };
}
function ch(t) {
  typeof t == "function" ? t = ah(t) : t = _u(t);
  for (var e = this._groups, n = e.length, r = [], i = [], s = 0; s < n; ++s)
    for (var o = e[s], l = o.length, u, c = 0; c < l; ++c)
      (u = o[c]) && (r.push(t.call(u, u.__data__, c, o)), i.push(u));
  return new ce(r, i);
}
function vu(t) {
  return function() {
    return this.matches(t);
  };
}
function bu(t) {
  return function(e) {
    return e.matches(t);
  };
}
var fh = Array.prototype.find;
function hh(t) {
  return function() {
    return fh.call(this.children, t);
  };
}
function dh() {
  return this.firstElementChild;
}
function ph(t) {
  return this.select(t == null ? dh : hh(typeof t == "function" ? t : bu(t)));
}
var gh = Array.prototype.filter;
function mh() {
  return Array.from(this.children);
}
function wh(t) {
  return function() {
    return gh.call(this.children, t);
  };
}
function yh(t) {
  return this.selectAll(t == null ? mh : wh(typeof t == "function" ? t : bu(t)));
}
function _h(t) {
  typeof t != "function" && (t = vu(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var s = e[i], o = s.length, l = r[i] = [], u, c = 0; c < o; ++c)
      (u = s[c]) && t.call(u, u.__data__, c, s) && l.push(u);
  return new ce(r, this._parents);
}
function xu(t) {
  return new Array(t.length);
}
function vh() {
  return new ce(this._enter || this._groups.map(xu), this._parents);
}
function ti(t, e) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = e;
}
ti.prototype = {
  constructor: ti,
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
function bh(t) {
  return function() {
    return t;
  };
}
function xh(t, e, n, r, i, s) {
  for (var o = 0, l, u = e.length, c = s.length; o < c; ++o)
    (l = e[o]) ? (l.__data__ = s[o], r[o] = l) : n[o] = new ti(t, s[o]);
  for (; o < u; ++o)
    (l = e[o]) && (i[o] = l);
}
function Eh(t, e, n, r, i, s, o) {
  var l, u, c = /* @__PURE__ */ new Map(), a = e.length, f = s.length, h = new Array(a), g;
  for (l = 0; l < a; ++l)
    (u = e[l]) && (h[l] = g = o.call(u, u.__data__, l, e) + "", c.has(g) ? i[l] = u : c.set(g, u));
  for (l = 0; l < f; ++l)
    g = o.call(t, s[l], l, s) + "", (u = c.get(g)) ? (r[l] = u, u.__data__ = s[l], c.delete(g)) : n[l] = new ti(t, s[l]);
  for (l = 0; l < a; ++l)
    (u = e[l]) && c.get(h[l]) === u && (i[l] = u);
}
function Sh(t) {
  return t.__data__;
}
function kh(t, e) {
  if (!arguments.length) return Array.from(this, Sh);
  var n = e ? Eh : xh, r = this._parents, i = this._groups;
  typeof t != "function" && (t = bh(t));
  for (var s = i.length, o = new Array(s), l = new Array(s), u = new Array(s), c = 0; c < s; ++c) {
    var a = r[c], f = i[c], h = f.length, g = Mh(t.call(a, a && a.__data__, c, r)), y = g.length, x = l[c] = new Array(y), v = o[c] = new Array(y), p = u[c] = new Array(h);
    n(a, f, x, v, p, g, e);
    for (var k = 0, L = 0, w, C; k < y; ++k)
      if (w = x[k]) {
        for (k >= L && (L = k + 1); !(C = v[L]) && ++L < y; ) ;
        w._next = C || null;
      }
  }
  return o = new ce(o, r), o._enter = l, o._exit = u, o;
}
function Mh(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function Th() {
  return new ce(this._exit || this._groups.map(xu), this._parents);
}
function Ch(t, e, n) {
  var r = this.enter(), i = this, s = this.exit();
  return typeof t == "function" ? (r = t(r), r && (r = r.selection())) : r = r.append(t + ""), e != null && (i = e(i), i && (i = i.selection())), n == null ? s.remove() : n(s), r && i ? r.merge(i).order() : i;
}
function Nh(t) {
  for (var e = t.selection ? t.selection() : t, n = this._groups, r = e._groups, i = n.length, s = r.length, o = Math.min(i, s), l = new Array(i), u = 0; u < o; ++u)
    for (var c = n[u], a = r[u], f = c.length, h = l[u] = new Array(f), g, y = 0; y < f; ++y)
      (g = c[y] || a[y]) && (h[y] = g);
  for (; u < i; ++u)
    l[u] = n[u];
  return new ce(l, this._parents);
}
function Rh() {
  for (var t = this._groups, e = -1, n = t.length; ++e < n; )
    for (var r = t[e], i = r.length - 1, s = r[i], o; --i >= 0; )
      (o = r[i]) && (s && o.compareDocumentPosition(s) ^ 4 && s.parentNode.insertBefore(o, s), s = o);
  return this;
}
function Lh(t) {
  t || (t = Ph);
  function e(f, h) {
    return f && h ? t(f.__data__, h.__data__) : !f - !h;
  }
  for (var n = this._groups, r = n.length, i = new Array(r), s = 0; s < r; ++s) {
    for (var o = n[s], l = o.length, u = i[s] = new Array(l), c, a = 0; a < l; ++a)
      (c = o[a]) && (u[a] = c);
    u.sort(e);
  }
  return new ce(i, this._parents).order();
}
function Ph(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function Oh() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function Ih() {
  return Array.from(this);
}
function $h() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, s = r.length; i < s; ++i) {
      var o = r[i];
      if (o) return o;
    }
  return null;
}
function Ah() {
  let t = 0;
  for (const e of this) ++t;
  return t;
}
function Fh() {
  return !this.node();
}
function jh(t) {
  for (var e = this._groups, n = 0, r = e.length; n < r; ++n)
    for (var i = e[n], s = 0, o = i.length, l; s < o; ++s)
      (l = i[s]) && t.call(l, l.__data__, s, i);
  return this;
}
function Bh(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Dh(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Vh(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function Gh(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function zh(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttribute(t) : this.setAttribute(t, n);
  };
}
function Hh(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, n);
  };
}
function qh(t, e) {
  var n = Ei(t);
  if (arguments.length < 2) {
    var r = this.node();
    return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n);
  }
  return this.each((e == null ? n.local ? Dh : Bh : typeof e == "function" ? n.local ? Hh : zh : n.local ? Gh : Vh)(n, e));
}
function Eu(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function Wh(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Uh(t, e, n) {
  return function() {
    this.style.setProperty(t, e, n);
  };
}
function Kh(t, e, n) {
  return function() {
    var r = e.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, n);
  };
}
function Xh(t, e, n) {
  return arguments.length > 1 ? this.each((e == null ? Wh : typeof e == "function" ? Kh : Uh)(t, e, n ?? "")) : An(this.node(), t);
}
function An(t, e) {
  return t.style.getPropertyValue(e) || Eu(t).getComputedStyle(t, null).getPropertyValue(e);
}
function Yh(t) {
  return function() {
    delete this[t];
  };
}
function Jh(t, e) {
  return function() {
    this[t] = e;
  };
}
function Qh(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? delete this[t] : this[t] = n;
  };
}
function Zh(t, e) {
  return arguments.length > 1 ? this.each((e == null ? Yh : typeof e == "function" ? Qh : Jh)(t, e)) : this.node()[t];
}
function Su(t) {
  return t.trim().split(/^|\s+/);
}
function js(t) {
  return t.classList || new ku(t);
}
function ku(t) {
  this._node = t, this._names = Su(t.getAttribute("class") || "");
}
ku.prototype = {
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
function Mu(t, e) {
  for (var n = js(t), r = -1, i = e.length; ++r < i; ) n.add(e[r]);
}
function Tu(t, e) {
  for (var n = js(t), r = -1, i = e.length; ++r < i; ) n.remove(e[r]);
}
function td(t) {
  return function() {
    Mu(this, t);
  };
}
function ed(t) {
  return function() {
    Tu(this, t);
  };
}
function nd(t, e) {
  return function() {
    (e.apply(this, arguments) ? Mu : Tu)(this, t);
  };
}
function rd(t, e) {
  var n = Su(t + "");
  if (arguments.length < 2) {
    for (var r = js(this.node()), i = -1, s = n.length; ++i < s; ) if (!r.contains(n[i])) return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? nd : e ? td : ed)(n, e));
}
function id() {
  this.textContent = "";
}
function sd(t) {
  return function() {
    this.textContent = t;
  };
}
function od(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
function ld(t) {
  return arguments.length ? this.each(t == null ? id : (typeof t == "function" ? od : sd)(t)) : this.node().textContent;
}
function ud() {
  this.innerHTML = "";
}
function ad(t) {
  return function() {
    this.innerHTML = t;
  };
}
function cd(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function fd(t) {
  return arguments.length ? this.each(t == null ? ud : (typeof t == "function" ? cd : ad)(t)) : this.node().innerHTML;
}
function hd() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function dd() {
  return this.each(hd);
}
function pd() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function gd() {
  return this.each(pd);
}
function md(t) {
  var e = typeof t == "function" ? t : yu(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function wd() {
  return null;
}
function yd(t, e) {
  var n = typeof t == "function" ? t : yu(t), r = e == null ? wd : typeof e == "function" ? e : Fs(e);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function _d() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function vd() {
  return this.each(_d);
}
function bd() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function xd() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Ed(t) {
  return this.select(t ? xd : bd);
}
function Sd(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function kd(t) {
  return function(e) {
    t.call(this, e, this.__data__);
  };
}
function Md(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var n = "", r = e.indexOf(".");
    return r >= 0 && (n = e.slice(r + 1), e = e.slice(0, r)), { type: e, name: n };
  });
}
function Td(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var n = 0, r = -1, i = e.length, s; n < i; ++n)
        s = e[n], (!t.type || s.type === t.type) && s.name === t.name ? this.removeEventListener(s.type, s.listener, s.options) : e[++r] = s;
      ++r ? e.length = r : delete this.__on;
    }
  };
}
function Cd(t, e, n) {
  return function() {
    var r = this.__on, i, s = kd(e);
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
function Nd(t, e, n) {
  var r = Md(t + ""), i, s = r.length, o;
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
  for (l = e ? Cd : Td, i = 0; i < s; ++i) this.each(l(r[i], e, n));
  return this;
}
function Cu(t, e, n) {
  var r = Eu(t), i = r.CustomEvent;
  typeof i == "function" ? i = new i(e, n) : (i = r.document.createEvent("Event"), n ? (i.initEvent(e, n.bubbles, n.cancelable), i.detail = n.detail) : i.initEvent(e, !1, !1)), t.dispatchEvent(i);
}
function Rd(t, e) {
  return function() {
    return Cu(this, t, e);
  };
}
function Ld(t, e) {
  return function() {
    return Cu(this, t, e.apply(this, arguments));
  };
}
function Pd(t, e) {
  return this.each((typeof e == "function" ? Ld : Rd)(t, e));
}
function* Od() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, s = r.length, o; i < s; ++i)
      (o = r[i]) && (yield o);
}
var Nu = [null];
function ce(t, e) {
  this._groups = t, this._parents = e;
}
function _r() {
  return new ce([[document.documentElement]], Nu);
}
function Id() {
  return this;
}
ce.prototype = _r.prototype = {
  constructor: ce,
  select: oh,
  selectAll: ch,
  selectChild: ph,
  selectChildren: yh,
  filter: _h,
  data: kh,
  enter: vh,
  exit: Th,
  join: Ch,
  merge: Nh,
  selection: Id,
  order: Rh,
  sort: Lh,
  call: Oh,
  nodes: Ih,
  node: $h,
  size: Ah,
  empty: Fh,
  each: jh,
  attr: qh,
  style: Xh,
  property: Zh,
  classed: rd,
  text: ld,
  html: fd,
  raise: dd,
  lower: gd,
  append: md,
  insert: yd,
  remove: vd,
  clone: Ed,
  datum: Sd,
  on: Nd,
  dispatch: Pd,
  [Symbol.iterator]: Od
};
function xt(t) {
  return typeof t == "string" ? new ce([[document.querySelector(t)]], [document.documentElement]) : new ce([[t]], Nu);
}
function Ru(t) {
  let e;
  for (; e = t.sourceEvent; ) t = e;
  return t;
}
function de(t, e) {
  if (t = Ru(t), e === void 0 && (e = t.currentTarget), e) {
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
function $d(t, e) {
  return t.target && (t = Ru(t), e === void 0 && (e = t.currentTarget), t = t.touches || [t]), Array.from(t, (n) => de(n, e));
}
const Ad = { passive: !1 }, cr = { capture: !0, passive: !1 };
function Di(t) {
  t.stopImmediatePropagation();
}
function Ln(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function Lu(t) {
  var e = t.document.documentElement, n = xt(t).on("dragstart.drag", Ln, cr);
  "onselectstart" in e ? n.on("selectstart.drag", Ln, cr) : (e.__noselect = e.style.MozUserSelect, e.style.MozUserSelect = "none");
}
function Pu(t, e) {
  var n = t.document.documentElement, r = xt(t).on("dragstart.drag", null);
  e && (r.on("click.drag", Ln, cr), setTimeout(function() {
    r.on("click.drag", null);
  }, 0)), "onselectstart" in n ? r.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
const Tr = (t) => () => t;
function ss(t, {
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
ss.prototype.on = function() {
  var t = this._.on.apply(this._, arguments);
  return t === this._ ? this : t;
};
function Fd(t) {
  return !t.ctrlKey && !t.button;
}
function jd() {
  return this.parentNode;
}
function Bd(t, e) {
  return e ?? { x: t.x, y: t.y };
}
function Dd() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Vd() {
  var t = Fd, e = jd, n = Bd, r = Dd, i = {}, s = yr("start", "drag", "end"), o = 0, l, u, c, a, f = 0;
  function h(w) {
    w.on("mousedown.drag", g).filter(r).on("touchstart.drag", v).on("touchmove.drag", p, Ad).on("touchend.drag touchcancel.drag", k).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function g(w, C) {
    if (!(a || !t.call(this, w, C))) {
      var B = L(this, e.call(this, w, C), w, C, "mouse");
      B && (xt(w.view).on("mousemove.drag", y, cr).on("mouseup.drag", x, cr), Lu(w.view), Di(w), c = !1, l = w.clientX, u = w.clientY, B("start", w));
    }
  }
  function y(w) {
    if (Ln(w), !c) {
      var C = w.clientX - l, B = w.clientY - u;
      c = C * C + B * B > f;
    }
    i.mouse("drag", w);
  }
  function x(w) {
    xt(w.view).on("mousemove.drag mouseup.drag", null), Pu(w.view, c), Ln(w), i.mouse("end", w);
  }
  function v(w, C) {
    if (t.call(this, w, C)) {
      var B = w.changedTouches, V = e.call(this, w, C), U = B.length, Q, Z;
      for (Q = 0; Q < U; ++Q)
        (Z = L(this, V, w, C, B[Q].identifier, B[Q])) && (Di(w), Z("start", w, B[Q]));
    }
  }
  function p(w) {
    var C = w.changedTouches, B = C.length, V, U;
    for (V = 0; V < B; ++V)
      (U = i[C[V].identifier]) && (Ln(w), U("drag", w, C[V]));
  }
  function k(w) {
    var C = w.changedTouches, B = C.length, V, U;
    for (a && clearTimeout(a), a = setTimeout(function() {
      a = null;
    }, 500), V = 0; V < B; ++V)
      (U = i[C[V].identifier]) && (Di(w), U("end", w, C[V]));
  }
  function L(w, C, B, V, U, Q) {
    var Z = s.copy(), st = de(Q || B, C), ft, K, S;
    if ((S = n.call(w, new ss("beforestart", {
      sourceEvent: B,
      target: h,
      identifier: U,
      active: o,
      x: st[0],
      y: st[1],
      dx: 0,
      dy: 0,
      dispatch: Z
    }), V)) != null)
      return ft = S.x - st[0] || 0, K = S.y - st[1] || 0, function G(N, A, D) {
        var X = st, Y;
        switch (N) {
          case "start":
            i[U] = G, Y = o++;
            break;
          case "end":
            delete i[U], --o;
          case "drag":
            st = de(D || A, C), Y = o;
            break;
        }
        Z.call(
          N,
          w,
          new ss(N, {
            sourceEvent: A,
            subject: S,
            target: h,
            identifier: U,
            active: Y,
            x: st[0] + ft,
            y: st[1] + K,
            dx: st[0] - X[0],
            dy: st[1] - X[1],
            dispatch: Z
          }),
          V
        );
      };
  }
  return h.filter = function(w) {
    return arguments.length ? (t = typeof w == "function" ? w : Tr(!!w), h) : t;
  }, h.container = function(w) {
    return arguments.length ? (e = typeof w == "function" ? w : Tr(w), h) : e;
  }, h.subject = function(w) {
    return arguments.length ? (n = typeof w == "function" ? w : Tr(w), h) : n;
  }, h.touchable = function(w) {
    return arguments.length ? (r = typeof w == "function" ? w : Tr(!!w), h) : r;
  }, h.on = function() {
    var w = s.on.apply(s, arguments);
    return w === s ? h : w;
  }, h.clickDistance = function(w) {
    return arguments.length ? (f = (w = +w) * w, h) : Math.sqrt(f);
  }, h;
}
function Bs(t, e, n) {
  t.prototype = e.prototype = n, n.constructor = t;
}
function Ou(t, e) {
  var n = Object.create(t.prototype);
  for (var r in e) n[r] = e[r];
  return n;
}
function vr() {
}
var fr = 0.7, ei = 1 / fr, Pn = "\\s*([+-]?\\d+)\\s*", hr = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Oe = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", Gd = /^#([0-9a-f]{3,8})$/, zd = new RegExp(`^rgb\\(${Pn},${Pn},${Pn}\\)$`), Hd = new RegExp(`^rgb\\(${Oe},${Oe},${Oe}\\)$`), qd = new RegExp(`^rgba\\(${Pn},${Pn},${Pn},${hr}\\)$`), Wd = new RegExp(`^rgba\\(${Oe},${Oe},${Oe},${hr}\\)$`), Ud = new RegExp(`^hsl\\(${hr},${Oe},${Oe}\\)$`), Kd = new RegExp(`^hsla\\(${hr},${Oe},${Oe},${hr}\\)$`), Fo = {
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
Bs(vr, mn, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: jo,
  // Deprecated! Use color.formatHex.
  formatHex: jo,
  formatHex8: Xd,
  formatHsl: Yd,
  formatRgb: Bo,
  toString: Bo
});
function jo() {
  return this.rgb().formatHex();
}
function Xd() {
  return this.rgb().formatHex8();
}
function Yd() {
  return Iu(this).formatHsl();
}
function Bo() {
  return this.rgb().formatRgb();
}
function mn(t) {
  var e, n;
  return t = (t + "").trim().toLowerCase(), (e = Gd.exec(t)) ? (n = e[1].length, e = parseInt(e[1], 16), n === 6 ? Do(e) : n === 3 ? new te(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : n === 8 ? Cr(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : n === 4 ? Cr(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = zd.exec(t)) ? new te(e[1], e[2], e[3], 1) : (e = Hd.exec(t)) ? new te(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = qd.exec(t)) ? Cr(e[1], e[2], e[3], e[4]) : (e = Wd.exec(t)) ? Cr(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = Ud.exec(t)) ? zo(e[1], e[2] / 100, e[3] / 100, 1) : (e = Kd.exec(t)) ? zo(e[1], e[2] / 100, e[3] / 100, e[4]) : Fo.hasOwnProperty(t) ? Do(Fo[t]) : t === "transparent" ? new te(NaN, NaN, NaN, 0) : null;
}
function Do(t) {
  return new te(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function Cr(t, e, n, r) {
  return r <= 0 && (t = e = n = NaN), new te(t, e, n, r);
}
function Jd(t) {
  return t instanceof vr || (t = mn(t)), t ? (t = t.rgb(), new te(t.r, t.g, t.b, t.opacity)) : new te();
}
function os(t, e, n, r) {
  return arguments.length === 1 ? Jd(t) : new te(t, e, n, r ?? 1);
}
function te(t, e, n, r) {
  this.r = +t, this.g = +e, this.b = +n, this.opacity = +r;
}
Bs(te, os, Ou(vr, {
  brighter(t) {
    return t = t == null ? ei : Math.pow(ei, t), new te(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? fr : Math.pow(fr, t), new te(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new te(gn(this.r), gn(this.g), gn(this.b), ni(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Vo,
  // Deprecated! Use color.formatHex.
  formatHex: Vo,
  formatHex8: Qd,
  formatRgb: Go,
  toString: Go
}));
function Vo() {
  return `#${dn(this.r)}${dn(this.g)}${dn(this.b)}`;
}
function Qd() {
  return `#${dn(this.r)}${dn(this.g)}${dn(this.b)}${dn((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Go() {
  const t = ni(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${gn(this.r)}, ${gn(this.g)}, ${gn(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function ni(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function gn(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function dn(t) {
  return t = gn(t), (t < 16 ? "0" : "") + t.toString(16);
}
function zo(t, e, n, r) {
  return r <= 0 ? t = e = n = NaN : n <= 0 || n >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new xe(t, e, n, r);
}
function Iu(t) {
  if (t instanceof xe) return new xe(t.h, t.s, t.l, t.opacity);
  if (t instanceof vr || (t = mn(t)), !t) return new xe();
  if (t instanceof xe) return t;
  t = t.rgb();
  var e = t.r / 255, n = t.g / 255, r = t.b / 255, i = Math.min(e, n, r), s = Math.max(e, n, r), o = NaN, l = s - i, u = (s + i) / 2;
  return l ? (e === s ? o = (n - r) / l + (n < r) * 6 : n === s ? o = (r - e) / l + 2 : o = (e - n) / l + 4, l /= u < 0.5 ? s + i : 2 - s - i, o *= 60) : l = u > 0 && u < 1 ? 0 : o, new xe(o, l, u, t.opacity);
}
function Zd(t, e, n, r) {
  return arguments.length === 1 ? Iu(t) : new xe(t, e, n, r ?? 1);
}
function xe(t, e, n, r) {
  this.h = +t, this.s = +e, this.l = +n, this.opacity = +r;
}
Bs(xe, Zd, Ou(vr, {
  brighter(t) {
    return t = t == null ? ei : Math.pow(ei, t), new xe(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? fr : Math.pow(fr, t), new xe(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, e = isNaN(t) || isNaN(this.s) ? 0 : this.s, n = this.l, r = n + (n < 0.5 ? n : 1 - n) * e, i = 2 * n - r;
    return new te(
      Vi(t >= 240 ? t - 240 : t + 120, i, r),
      Vi(t, i, r),
      Vi(t < 120 ? t + 240 : t - 120, i, r),
      this.opacity
    );
  },
  clamp() {
    return new xe(Ho(this.h), Nr(this.s), Nr(this.l), ni(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = ni(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${Ho(this.h)}, ${Nr(this.s) * 100}%, ${Nr(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function Ho(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function Nr(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function Vi(t, e, n) {
  return (t < 60 ? e + (n - e) * t / 60 : t < 180 ? n : t < 240 ? e + (n - e) * (240 - t) / 60 : e) * 255;
}
const Ds = (t) => () => t;
function tp(t, e) {
  return function(n) {
    return t + n * e;
  };
}
function ep(t, e, n) {
  return t = Math.pow(t, n), e = Math.pow(e, n) - t, n = 1 / n, function(r) {
    return Math.pow(t + r * e, n);
  };
}
function np(t) {
  return (t = +t) == 1 ? $u : function(e, n) {
    return n - e ? ep(e, n, t) : Ds(isNaN(e) ? n : e);
  };
}
function $u(t, e) {
  var n = e - t;
  return n ? tp(t, n) : Ds(isNaN(t) ? e : t);
}
const ri = function t(e) {
  var n = np(e);
  function r(i, s) {
    var o = n((i = os(i)).r, (s = os(s)).r), l = n(i.g, s.g), u = n(i.b, s.b), c = $u(i.opacity, s.opacity);
    return function(a) {
      return i.r = o(a), i.g = l(a), i.b = u(a), i.opacity = c(a), i + "";
    };
  }
  return r.gamma = t, r;
}(1);
function rp(t, e) {
  e || (e = []);
  var n = t ? Math.min(e.length, t.length) : 0, r = e.slice(), i;
  return function(s) {
    for (i = 0; i < n; ++i) r[i] = t[i] * (1 - s) + e[i] * s;
    return r;
  };
}
function ip(t) {
  return ArrayBuffer.isView(t) && !(t instanceof DataView);
}
function sp(t, e) {
  var n = e ? e.length : 0, r = t ? Math.min(n, t.length) : 0, i = new Array(r), s = new Array(n), o;
  for (o = 0; o < r; ++o) i[o] = Vs(t[o], e[o]);
  for (; o < n; ++o) s[o] = e[o];
  return function(l) {
    for (o = 0; o < r; ++o) s[o] = i[o](l);
    return s;
  };
}
function op(t, e) {
  var n = /* @__PURE__ */ new Date();
  return t = +t, e = +e, function(r) {
    return n.setTime(t * (1 - r) + e * r), n;
  };
}
function Le(t, e) {
  return t = +t, e = +e, function(n) {
    return t * (1 - n) + e * n;
  };
}
function lp(t, e) {
  var n = {}, r = {}, i;
  (t === null || typeof t != "object") && (t = {}), (e === null || typeof e != "object") && (e = {});
  for (i in e)
    i in t ? n[i] = Vs(t[i], e[i]) : r[i] = e[i];
  return function(s) {
    for (i in n) r[i] = n[i](s);
    return r;
  };
}
var ls = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Gi = new RegExp(ls.source, "g");
function up(t) {
  return function() {
    return t;
  };
}
function ap(t) {
  return function(e) {
    return t(e) + "";
  };
}
function Au(t, e) {
  var n = ls.lastIndex = Gi.lastIndex = 0, r, i, s, o = -1, l = [], u = [];
  for (t = t + "", e = e + ""; (r = ls.exec(t)) && (i = Gi.exec(e)); )
    (s = i.index) > n && (s = e.slice(n, s), l[o] ? l[o] += s : l[++o] = s), (r = r[0]) === (i = i[0]) ? l[o] ? l[o] += i : l[++o] = i : (l[++o] = null, u.push({ i: o, x: Le(r, i) })), n = Gi.lastIndex;
  return n < e.length && (s = e.slice(n), l[o] ? l[o] += s : l[++o] = s), l.length < 2 ? u[0] ? ap(u[0].x) : up(e) : (e = u.length, function(c) {
    for (var a = 0, f; a < e; ++a) l[(f = u[a]).i] = f.x(c);
    return l.join("");
  });
}
function Vs(t, e) {
  var n = typeof e, r;
  return e == null || n === "boolean" ? Ds(e) : (n === "number" ? Le : n === "string" ? (r = mn(e)) ? (e = r, ri) : Au : e instanceof mn ? ri : e instanceof Date ? op : ip(e) ? rp : Array.isArray(e) ? sp : typeof e.valueOf != "function" && typeof e.toString != "function" || isNaN(e) ? lp : Le)(t, e);
}
var qo = 180 / Math.PI, us = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function Fu(t, e, n, r, i, s) {
  var o, l, u;
  return (o = Math.sqrt(t * t + e * e)) && (t /= o, e /= o), (u = t * n + e * r) && (n -= t * u, r -= e * u), (l = Math.sqrt(n * n + r * r)) && (n /= l, r /= l, u /= l), t * r < e * n && (t = -t, e = -e, u = -u, o = -o), {
    translateX: i,
    translateY: s,
    rotate: Math.atan2(e, t) * qo,
    skewX: Math.atan(u) * qo,
    scaleX: o,
    scaleY: l
  };
}
var Rr;
function cp(t) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return e.isIdentity ? us : Fu(e.a, e.b, e.c, e.d, e.e, e.f);
}
function fp(t) {
  return t == null || (Rr || (Rr = document.createElementNS("http://www.w3.org/2000/svg", "g")), Rr.setAttribute("transform", t), !(t = Rr.transform.baseVal.consolidate())) ? us : (t = t.matrix, Fu(t.a, t.b, t.c, t.d, t.e, t.f));
}
function ju(t, e, n, r) {
  function i(c) {
    return c.length ? c.pop() + " " : "";
  }
  function s(c, a, f, h, g, y) {
    if (c !== f || a !== h) {
      var x = g.push("translate(", null, e, null, n);
      y.push({ i: x - 4, x: Le(c, f) }, { i: x - 2, x: Le(a, h) });
    } else (f || h) && g.push("translate(" + f + e + h + n);
  }
  function o(c, a, f, h) {
    c !== a ? (c - a > 180 ? a += 360 : a - c > 180 && (c += 360), h.push({ i: f.push(i(f) + "rotate(", null, r) - 2, x: Le(c, a) })) : a && f.push(i(f) + "rotate(" + a + r);
  }
  function l(c, a, f, h) {
    c !== a ? h.push({ i: f.push(i(f) + "skewX(", null, r) - 2, x: Le(c, a) }) : a && f.push(i(f) + "skewX(" + a + r);
  }
  function u(c, a, f, h, g, y) {
    if (c !== f || a !== h) {
      var x = g.push(i(g) + "scale(", null, ",", null, ")");
      y.push({ i: x - 4, x: Le(c, f) }, { i: x - 2, x: Le(a, h) });
    } else (f !== 1 || h !== 1) && g.push(i(g) + "scale(" + f + "," + h + ")");
  }
  return function(c, a) {
    var f = [], h = [];
    return c = t(c), a = t(a), s(c.translateX, c.translateY, a.translateX, a.translateY, f, h), o(c.rotate, a.rotate, f, h), l(c.skewX, a.skewX, f, h), u(c.scaleX, c.scaleY, a.scaleX, a.scaleY, f, h), c = a = null, function(g) {
      for (var y = -1, x = h.length, v; ++y < x; ) f[(v = h[y]).i] = v.x(g);
      return f.join("");
    };
  };
}
var hp = ju(cp, "px, ", "px)", "deg)"), dp = ju(fp, ", ", ")", ")"), pp = 1e-12;
function Wo(t) {
  return ((t = Math.exp(t)) + 1 / t) / 2;
}
function gp(t) {
  return ((t = Math.exp(t)) - 1 / t) / 2;
}
function mp(t) {
  return ((t = Math.exp(2 * t)) - 1) / (t + 1);
}
const wp = function t(e, n, r) {
  function i(s, o) {
    var l = s[0], u = s[1], c = s[2], a = o[0], f = o[1], h = o[2], g = a - l, y = f - u, x = g * g + y * y, v, p;
    if (x < pp)
      p = Math.log(h / c) / e, v = function(V) {
        return [
          l + V * g,
          u + V * y,
          c * Math.exp(e * V * p)
        ];
      };
    else {
      var k = Math.sqrt(x), L = (h * h - c * c + r * x) / (2 * c * n * k), w = (h * h - c * c - r * x) / (2 * h * n * k), C = Math.log(Math.sqrt(L * L + 1) - L), B = Math.log(Math.sqrt(w * w + 1) - w);
      p = (B - C) / e, v = function(V) {
        var U = V * p, Q = Wo(C), Z = c / (n * k) * (Q * mp(e * U + C) - gp(C));
        return [
          l + Z * g,
          u + Z * y,
          c * Q / Wo(e * U + C)
        ];
      };
    }
    return v.duration = p * 1e3 * e / Math.SQRT2, v;
  }
  return i.rho = function(s) {
    var o = Math.max(1e-3, +s), l = o * o, u = l * l;
    return t(o, l, u);
  }, i;
}(Math.SQRT2, 2, 4);
var Fn = 0, Un = 0, Hn = 0, Bu = 1e3, ii, Kn, si = 0, wn = 0, Si = 0, dr = typeof performance == "object" && performance.now ? performance : Date, Du = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function Gs() {
  return wn || (Du(yp), wn = dr.now() + Si);
}
function yp() {
  wn = 0;
}
function oi() {
  this._call = this._time = this._next = null;
}
oi.prototype = zs.prototype = {
  constructor: oi,
  restart: function(t, e, n) {
    if (typeof t != "function") throw new TypeError("callback is not a function");
    n = (n == null ? Gs() : +n) + (e == null ? 0 : +e), !this._next && Kn !== this && (Kn ? Kn._next = this : ii = this, Kn = this), this._call = t, this._time = n, as();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, as());
  }
};
function zs(t, e, n) {
  var r = new oi();
  return r.restart(t, e, n), r;
}
function _p() {
  Gs(), ++Fn;
  for (var t = ii, e; t; )
    (e = wn - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
  --Fn;
}
function Uo() {
  wn = (si = dr.now()) + Si, Fn = Un = 0;
  try {
    _p();
  } finally {
    Fn = 0, bp(), wn = 0;
  }
}
function vp() {
  var t = dr.now(), e = t - si;
  e > Bu && (Si -= e, si = t);
}
function bp() {
  for (var t, e = ii, n, r = 1 / 0; e; )
    e._call ? (r > e._time && (r = e._time), t = e, e = e._next) : (n = e._next, e._next = null, e = t ? t._next = n : ii = n);
  Kn = t, as(r);
}
function as(t) {
  if (!Fn) {
    Un && (Un = clearTimeout(Un));
    var e = t - wn;
    e > 24 ? (t < 1 / 0 && (Un = setTimeout(Uo, t - dr.now() - Si)), Hn && (Hn = clearInterval(Hn))) : (Hn || (si = dr.now(), Hn = setInterval(vp, Bu)), Fn = 1, Du(Uo));
  }
}
function Ko(t, e, n) {
  var r = new oi();
  return e = e == null ? 0 : +e, r.restart((i) => {
    r.stop(), t(i + e);
  }, e, n), r;
}
var xp = yr("start", "end", "cancel", "interrupt"), Ep = [], Vu = 0, Xo = 1, cs = 2, zr = 3, Yo = 4, fs = 5, Hr = 6;
function ki(t, e, n, r, i, s) {
  var o = t.__transition;
  if (!o) t.__transition = {};
  else if (n in o) return;
  Sp(t, n, {
    name: e,
    index: r,
    // For context during callback.
    group: i,
    // For context during callback.
    on: xp,
    tween: Ep,
    time: s.time,
    delay: s.delay,
    duration: s.duration,
    ease: s.ease,
    timer: null,
    state: Vu
  });
}
function Hs(t, e) {
  var n = ke(t, e);
  if (n.state > Vu) throw new Error("too late; already scheduled");
  return n;
}
function $e(t, e) {
  var n = ke(t, e);
  if (n.state > zr) throw new Error("too late; already running");
  return n;
}
function ke(t, e) {
  var n = t.__transition;
  if (!n || !(n = n[e])) throw new Error("transition not found");
  return n;
}
function Sp(t, e, n) {
  var r = t.__transition, i;
  r[e] = n, n.timer = zs(s, 0, n.time);
  function s(c) {
    n.state = Xo, n.timer.restart(o, n.delay, n.time), n.delay <= c && o(c - n.delay);
  }
  function o(c) {
    var a, f, h, g;
    if (n.state !== Xo) return u();
    for (a in r)
      if (g = r[a], g.name === n.name) {
        if (g.state === zr) return Ko(o);
        g.state === Yo ? (g.state = Hr, g.timer.stop(), g.on.call("interrupt", t, t.__data__, g.index, g.group), delete r[a]) : +a < e && (g.state = Hr, g.timer.stop(), g.on.call("cancel", t, t.__data__, g.index, g.group), delete r[a]);
      }
    if (Ko(function() {
      n.state === zr && (n.state = Yo, n.timer.restart(l, n.delay, n.time), l(c));
    }), n.state = cs, n.on.call("start", t, t.__data__, n.index, n.group), n.state === cs) {
      for (n.state = zr, i = new Array(h = n.tween.length), a = 0, f = -1; a < h; ++a)
        (g = n.tween[a].value.call(t, t.__data__, n.index, n.group)) && (i[++f] = g);
      i.length = f + 1;
    }
  }
  function l(c) {
    for (var a = c < n.duration ? n.ease.call(null, c / n.duration) : (n.timer.restart(u), n.state = fs, 1), f = -1, h = i.length; ++f < h; )
      i[f].call(t, a);
    n.state === fs && (n.on.call("end", t, t.__data__, n.index, n.group), u());
  }
  function u() {
    n.state = Hr, n.timer.stop(), delete r[e];
    for (var c in r) return;
    delete t.__transition;
  }
}
function qr(t, e) {
  var n = t.__transition, r, i, s = !0, o;
  if (n) {
    e = e == null ? null : e + "";
    for (o in n) {
      if ((r = n[o]).name !== e) {
        s = !1;
        continue;
      }
      i = r.state > cs && r.state < fs, r.state = Hr, r.timer.stop(), r.on.call(i ? "interrupt" : "cancel", t, t.__data__, r.index, r.group), delete n[o];
    }
    s && delete t.__transition;
  }
}
function kp(t) {
  return this.each(function() {
    qr(this, t);
  });
}
function Mp(t, e) {
  var n, r;
  return function() {
    var i = $e(this, t), s = i.tween;
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
function Tp(t, e, n) {
  var r, i;
  if (typeof n != "function") throw new Error();
  return function() {
    var s = $e(this, t), o = s.tween;
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
function Cp(t, e) {
  var n = this._id;
  if (t += "", arguments.length < 2) {
    for (var r = ke(this.node(), n).tween, i = 0, s = r.length, o; i < s; ++i)
      if ((o = r[i]).name === t)
        return o.value;
    return null;
  }
  return this.each((e == null ? Mp : Tp)(n, t, e));
}
function qs(t, e, n) {
  var r = t._id;
  return t.each(function() {
    var i = $e(this, r);
    (i.value || (i.value = {}))[e] = n.apply(this, arguments);
  }), function(i) {
    return ke(i, r).value[e];
  };
}
function Gu(t, e) {
  var n;
  return (typeof e == "number" ? Le : e instanceof mn ? ri : (n = mn(e)) ? (e = n, ri) : Au)(t, e);
}
function Np(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Rp(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Lp(t, e, n) {
  var r, i = n + "", s;
  return function() {
    var o = this.getAttribute(t);
    return o === i ? null : o === r ? s : s = e(r = o, n);
  };
}
function Pp(t, e, n) {
  var r, i = n + "", s;
  return function() {
    var o = this.getAttributeNS(t.space, t.local);
    return o === i ? null : o === r ? s : s = e(r = o, n);
  };
}
function Op(t, e, n) {
  var r, i, s;
  return function() {
    var o, l = n(this), u;
    return l == null ? void this.removeAttribute(t) : (o = this.getAttribute(t), u = l + "", o === u ? null : o === r && u === i ? s : (i = u, s = e(r = o, l)));
  };
}
function Ip(t, e, n) {
  var r, i, s;
  return function() {
    var o, l = n(this), u;
    return l == null ? void this.removeAttributeNS(t.space, t.local) : (o = this.getAttributeNS(t.space, t.local), u = l + "", o === u ? null : o === r && u === i ? s : (i = u, s = e(r = o, l)));
  };
}
function $p(t, e) {
  var n = Ei(t), r = n === "transform" ? dp : Gu;
  return this.attrTween(t, typeof e == "function" ? (n.local ? Ip : Op)(n, r, qs(this, "attr." + t, e)) : e == null ? (n.local ? Rp : Np)(n) : (n.local ? Pp : Lp)(n, r, e));
}
function Ap(t, e) {
  return function(n) {
    this.setAttribute(t, e.call(this, n));
  };
}
function Fp(t, e) {
  return function(n) {
    this.setAttributeNS(t.space, t.local, e.call(this, n));
  };
}
function jp(t, e) {
  var n, r;
  function i() {
    var s = e.apply(this, arguments);
    return s !== r && (n = (r = s) && Fp(t, s)), n;
  }
  return i._value = e, i;
}
function Bp(t, e) {
  var n, r;
  function i() {
    var s = e.apply(this, arguments);
    return s !== r && (n = (r = s) && Ap(t, s)), n;
  }
  return i._value = e, i;
}
function Dp(t, e) {
  var n = "attr." + t;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (e == null) return this.tween(n, null);
  if (typeof e != "function") throw new Error();
  var r = Ei(t);
  return this.tween(n, (r.local ? jp : Bp)(r, e));
}
function Vp(t, e) {
  return function() {
    Hs(this, t).delay = +e.apply(this, arguments);
  };
}
function Gp(t, e) {
  return e = +e, function() {
    Hs(this, t).delay = e;
  };
}
function zp(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Vp : Gp)(e, t)) : ke(this.node(), e).delay;
}
function Hp(t, e) {
  return function() {
    $e(this, t).duration = +e.apply(this, arguments);
  };
}
function qp(t, e) {
  return e = +e, function() {
    $e(this, t).duration = e;
  };
}
function Wp(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Hp : qp)(e, t)) : ke(this.node(), e).duration;
}
function Up(t, e) {
  if (typeof e != "function") throw new Error();
  return function() {
    $e(this, t).ease = e;
  };
}
function Kp(t) {
  var e = this._id;
  return arguments.length ? this.each(Up(e, t)) : ke(this.node(), e).ease;
}
function Xp(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    $e(this, t).ease = n;
  };
}
function Yp(t) {
  if (typeof t != "function") throw new Error();
  return this.each(Xp(this._id, t));
}
function Jp(t) {
  typeof t != "function" && (t = vu(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var s = e[i], o = s.length, l = r[i] = [], u, c = 0; c < o; ++c)
      (u = s[c]) && t.call(u, u.__data__, c, s) && l.push(u);
  return new We(r, this._parents, this._name, this._id);
}
function Qp(t) {
  if (t._id !== this._id) throw new Error();
  for (var e = this._groups, n = t._groups, r = e.length, i = n.length, s = Math.min(r, i), o = new Array(r), l = 0; l < s; ++l)
    for (var u = e[l], c = n[l], a = u.length, f = o[l] = new Array(a), h, g = 0; g < a; ++g)
      (h = u[g] || c[g]) && (f[g] = h);
  for (; l < r; ++l)
    o[l] = e[l];
  return new We(o, this._parents, this._name, this._id);
}
function Zp(t) {
  return (t + "").trim().split(/^|\s+/).every(function(e) {
    var n = e.indexOf(".");
    return n >= 0 && (e = e.slice(0, n)), !e || e === "start";
  });
}
function tg(t, e, n) {
  var r, i, s = Zp(e) ? Hs : $e;
  return function() {
    var o = s(this, t), l = o.on;
    l !== r && (i = (r = l).copy()).on(e, n), o.on = i;
  };
}
function eg(t, e) {
  var n = this._id;
  return arguments.length < 2 ? ke(this.node(), n).on.on(t) : this.each(tg(n, t, e));
}
function ng(t) {
  return function() {
    var e = this.parentNode;
    for (var n in this.__transition) if (+n !== t) return;
    e && e.removeChild(this);
  };
}
function rg() {
  return this.on("end.remove", ng(this._id));
}
function ig(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = Fs(t));
  for (var r = this._groups, i = r.length, s = new Array(i), o = 0; o < i; ++o)
    for (var l = r[o], u = l.length, c = s[o] = new Array(u), a, f, h = 0; h < u; ++h)
      (a = l[h]) && (f = t.call(a, a.__data__, h, l)) && ("__data__" in a && (f.__data__ = a.__data__), c[h] = f, ki(c[h], e, n, h, c, ke(a, n)));
  return new We(s, this._parents, e, n);
}
function sg(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = _u(t));
  for (var r = this._groups, i = r.length, s = [], o = [], l = 0; l < i; ++l)
    for (var u = r[l], c = u.length, a, f = 0; f < c; ++f)
      if (a = u[f]) {
        for (var h = t.call(a, a.__data__, f, u), g, y = ke(a, n), x = 0, v = h.length; x < v; ++x)
          (g = h[x]) && ki(g, e, n, x, h, y);
        s.push(h), o.push(a);
      }
  return new We(s, o, e, n);
}
var og = _r.prototype.constructor;
function lg() {
  return new og(this._groups, this._parents);
}
function ug(t, e) {
  var n, r, i;
  return function() {
    var s = An(this, t), o = (this.style.removeProperty(t), An(this, t));
    return s === o ? null : s === n && o === r ? i : i = e(n = s, r = o);
  };
}
function zu(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function ag(t, e, n) {
  var r, i = n + "", s;
  return function() {
    var o = An(this, t);
    return o === i ? null : o === r ? s : s = e(r = o, n);
  };
}
function cg(t, e, n) {
  var r, i, s;
  return function() {
    var o = An(this, t), l = n(this), u = l + "";
    return l == null && (u = l = (this.style.removeProperty(t), An(this, t))), o === u ? null : o === r && u === i ? s : (i = u, s = e(r = o, l));
  };
}
function fg(t, e) {
  var n, r, i, s = "style." + e, o = "end." + s, l;
  return function() {
    var u = $e(this, t), c = u.on, a = u.value[s] == null ? l || (l = zu(e)) : void 0;
    (c !== n || i !== a) && (r = (n = c).copy()).on(o, i = a), u.on = r;
  };
}
function hg(t, e, n) {
  var r = (t += "") == "transform" ? hp : Gu;
  return e == null ? this.styleTween(t, ug(t, r)).on("end.style." + t, zu(t)) : typeof e == "function" ? this.styleTween(t, cg(t, r, qs(this, "style." + t, e))).each(fg(this._id, t)) : this.styleTween(t, ag(t, r, e), n).on("end.style." + t, null);
}
function dg(t, e, n) {
  return function(r) {
    this.style.setProperty(t, e.call(this, r), n);
  };
}
function pg(t, e, n) {
  var r, i;
  function s() {
    var o = e.apply(this, arguments);
    return o !== i && (r = (i = o) && dg(t, o, n)), r;
  }
  return s._value = e, s;
}
function gg(t, e, n) {
  var r = "style." + (t += "");
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (e == null) return this.tween(r, null);
  if (typeof e != "function") throw new Error();
  return this.tween(r, pg(t, e, n ?? ""));
}
function mg(t) {
  return function() {
    this.textContent = t;
  };
}
function wg(t) {
  return function() {
    var e = t(this);
    this.textContent = e ?? "";
  };
}
function yg(t) {
  return this.tween("text", typeof t == "function" ? wg(qs(this, "text", t)) : mg(t == null ? "" : t + ""));
}
function _g(t) {
  return function(e) {
    this.textContent = t.call(this, e);
  };
}
function vg(t) {
  var e, n;
  function r() {
    var i = t.apply(this, arguments);
    return i !== n && (e = (n = i) && _g(i)), e;
  }
  return r._value = t, r;
}
function bg(t) {
  var e = "text";
  if (arguments.length < 1) return (e = this.tween(e)) && e._value;
  if (t == null) return this.tween(e, null);
  if (typeof t != "function") throw new Error();
  return this.tween(e, vg(t));
}
function xg() {
  for (var t = this._name, e = this._id, n = Hu(), r = this._groups, i = r.length, s = 0; s < i; ++s)
    for (var o = r[s], l = o.length, u, c = 0; c < l; ++c)
      if (u = o[c]) {
        var a = ke(u, e);
        ki(u, t, n, c, o, {
          time: a.time + a.delay + a.duration,
          delay: 0,
          duration: a.duration,
          ease: a.ease
        });
      }
  return new We(r, this._parents, t, n);
}
function Eg() {
  var t, e, n = this, r = n._id, i = n.size();
  return new Promise(function(s, o) {
    var l = { value: o }, u = { value: function() {
      --i === 0 && s();
    } };
    n.each(function() {
      var c = $e(this, r), a = c.on;
      a !== t && (e = (t = a).copy(), e._.cancel.push(l), e._.interrupt.push(l), e._.end.push(u)), c.on = e;
    }), i === 0 && s();
  });
}
var Sg = 0;
function We(t, e, n, r) {
  this._groups = t, this._parents = e, this._name = n, this._id = r;
}
function Hu() {
  return ++Sg;
}
var Fe = _r.prototype;
We.prototype = {
  constructor: We,
  select: ig,
  selectAll: sg,
  selectChild: Fe.selectChild,
  selectChildren: Fe.selectChildren,
  filter: Jp,
  merge: Qp,
  selection: lg,
  transition: xg,
  call: Fe.call,
  nodes: Fe.nodes,
  node: Fe.node,
  size: Fe.size,
  empty: Fe.empty,
  each: Fe.each,
  on: eg,
  attr: $p,
  attrTween: Dp,
  style: hg,
  styleTween: gg,
  text: yg,
  textTween: bg,
  remove: rg,
  tween: Cp,
  delay: zp,
  duration: Wp,
  ease: Kp,
  easeVarying: Yp,
  end: Eg,
  [Symbol.iterator]: Fe[Symbol.iterator]
};
const Jo = (t) => +t;
function kg(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var Mg = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: kg
};
function Tg(t, e) {
  for (var n; !(n = t.__transition) || !(n = n[e]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${e} not found`);
  return n;
}
function Cg(t) {
  var e, n;
  t instanceof We ? (e = t._id, t = t._name) : (e = Hu(), (n = Mg).time = Gs(), t = t == null ? null : t + "");
  for (var r = this._groups, i = r.length, s = 0; s < i; ++s)
    for (var o = r[s], l = o.length, u, c = 0; c < l; ++c)
      (u = o[c]) && ki(u, t, e, c, o, n || Tg(u, e));
  return new We(r, this._parents, t, e);
}
_r.prototype.interrupt = kp;
_r.prototype.transition = Cg;
const hs = Math.PI, ds = 2 * hs, fn = 1e-6, Ng = ds - fn;
function qu(t) {
  this._ += t[0];
  for (let e = 1, n = t.length; e < n; ++e)
    this._ += arguments[e] + t[e];
}
function Rg(t) {
  let e = Math.floor(t);
  if (!(e >= 0)) throw new Error(`invalid digits: ${t}`);
  if (e > 15) return qu;
  const n = 10 ** e;
  return function(r) {
    this._ += r[0];
    for (let i = 1, s = r.length; i < s; ++i)
      this._ += Math.round(arguments[i] * n) / n + r[i];
  };
}
class Lg {
  constructor(e) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null, this._ = "", this._append = e == null ? qu : Rg(e);
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
    else if (h > fn) if (!(Math.abs(f * u - c * a) > fn) || !s)
      this._append`L${this._x1 = e},${this._y1 = n}`;
    else {
      let g = r - o, y = i - l, x = u * u + c * c, v = g * g + y * y, p = Math.sqrt(x), k = Math.sqrt(h), L = s * Math.tan((hs - Math.acos((x + h - v) / (2 * p * k))) / 2), w = L / k, C = L / p;
      Math.abs(w - 1) > fn && this._append`L${e + w * a},${n + w * f}`, this._append`A${s},${s},0,0,${+(f * g > a * y)},${this._x1 = e + C * u},${this._y1 = n + C * c}`;
    }
  }
  arc(e, n, r, i, s, o) {
    if (e = +e, n = +n, r = +r, o = !!o, r < 0) throw new Error(`negative radius: ${r}`);
    let l = r * Math.cos(i), u = r * Math.sin(i), c = e + l, a = n + u, f = 1 ^ o, h = o ? i - s : s - i;
    this._x1 === null ? this._append`M${c},${a}` : (Math.abs(this._x1 - c) > fn || Math.abs(this._y1 - a) > fn) && this._append`L${c},${a}`, r && (h < 0 && (h = h % ds + ds), h > Ng ? this._append`A${r},${r},0,1,${f},${e - l},${n - u}A${r},${r},0,1,${f},${this._x1 = c},${this._y1 = a}` : h > fn && this._append`A${r},${r},0,${+(h >= hs)},${f},${this._x1 = e + r * Math.cos(s)},${this._y1 = n + r * Math.sin(s)}`);
  }
  rect(e, n, r, i) {
    this._append`M${this._x0 = this._x1 = +e},${this._y0 = this._y1 = +n}h${r = +r}v${+i}h${-r}Z`;
  }
  toString() {
    return this._;
  }
}
function Pg(t) {
  const e = +this._x.call(null, t), n = +this._y.call(null, t);
  return Wu(this.cover(e, n), e, n, t);
}
function Wu(t, e, n, r) {
  if (isNaN(e) || isNaN(n)) return t;
  var i, s = t._root, o = { data: r }, l = t._x0, u = t._y0, c = t._x1, a = t._y1, f, h, g, y, x, v, p, k;
  if (!s) return t._root = o, t;
  for (; s.length; )
    if ((x = e >= (f = (l + c) / 2)) ? l = f : c = f, (v = n >= (h = (u + a) / 2)) ? u = h : a = h, i = s, !(s = s[p = v << 1 | x])) return i[p] = o, t;
  if (g = +t._x.call(null, s.data), y = +t._y.call(null, s.data), e === g && n === y) return o.next = s, i ? i[p] = o : t._root = o, t;
  do
    i = i ? i[p] = new Array(4) : t._root = new Array(4), (x = e >= (f = (l + c) / 2)) ? l = f : c = f, (v = n >= (h = (u + a) / 2)) ? u = h : a = h;
  while ((p = v << 1 | x) === (k = (y >= h) << 1 | g >= f));
  return i[k] = s, i[p] = o, t;
}
function Og(t) {
  var e, n, r = t.length, i, s, o = new Array(r), l = new Array(r), u = 1 / 0, c = 1 / 0, a = -1 / 0, f = -1 / 0;
  for (n = 0; n < r; ++n)
    isNaN(i = +this._x.call(null, e = t[n])) || isNaN(s = +this._y.call(null, e)) || (o[n] = i, l[n] = s, i < u && (u = i), i > a && (a = i), s < c && (c = s), s > f && (f = s));
  if (u > a || c > f) return this;
  for (this.cover(u, c).cover(a, f), n = 0; n < r; ++n)
    Wu(this, o[n], l[n], t[n]);
  return this;
}
function Ig(t, e) {
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
function $g() {
  var t = [];
  return this.visit(function(e) {
    if (!e.length) do
      t.push(e.data);
    while (e = e.next);
  }), t;
}
function Ag(t) {
  return arguments.length ? this.cover(+t[0][0], +t[0][1]).cover(+t[1][0], +t[1][1]) : isNaN(this._x0) ? void 0 : [[this._x0, this._y0], [this._x1, this._y1]];
}
function Wt(t, e, n, r, i) {
  this.node = t, this.x0 = e, this.y0 = n, this.x1 = r, this.y1 = i;
}
function Fg(t, e, n) {
  var r, i = this._x0, s = this._y0, o, l, u, c, a = this._x1, f = this._y1, h = [], g = this._root, y, x;
  for (g && h.push(new Wt(g, i, s, a, f)), n == null ? n = 1 / 0 : (i = t - n, s = e - n, a = t + n, f = e + n, n *= n); y = h.pop(); )
    if (!(!(g = y.node) || (o = y.x0) > a || (l = y.y0) > f || (u = y.x1) < i || (c = y.y1) < s))
      if (g.length) {
        var v = (o + u) / 2, p = (l + c) / 2;
        h.push(
          new Wt(g[3], v, p, u, c),
          new Wt(g[2], o, p, v, c),
          new Wt(g[1], v, l, u, p),
          new Wt(g[0], o, l, v, p)
        ), (x = (e >= p) << 1 | t >= v) && (y = h[h.length - 1], h[h.length - 1] = h[h.length - 1 - x], h[h.length - 1 - x] = y);
      } else {
        var k = t - +this._x.call(null, g.data), L = e - +this._y.call(null, g.data), w = k * k + L * L;
        if (w < n) {
          var C = Math.sqrt(n = w);
          i = t - C, s = e - C, a = t + C, f = e + C, r = g.data;
        }
      }
  return r;
}
function jg(t) {
  if (isNaN(a = +this._x.call(null, t)) || isNaN(f = +this._y.call(null, t))) return this;
  var e, n = this._root, r, i, s, o = this._x0, l = this._y0, u = this._x1, c = this._y1, a, f, h, g, y, x, v, p;
  if (!n) return this;
  if (n.length) for (; ; ) {
    if ((y = a >= (h = (o + u) / 2)) ? o = h : u = h, (x = f >= (g = (l + c) / 2)) ? l = g : c = g, e = n, !(n = n[v = x << 1 | y])) return this;
    if (!n.length) break;
    (e[v + 1 & 3] || e[v + 2 & 3] || e[v + 3 & 3]) && (r = e, p = v);
  }
  for (; n.data !== t; ) if (i = n, !(n = n.next)) return this;
  return (s = n.next) && delete n.next, i ? (s ? i.next = s : delete i.next, this) : e ? (s ? e[v] = s : delete e[v], (n = e[0] || e[1] || e[2] || e[3]) && n === (e[3] || e[2] || e[1] || e[0]) && !n.length && (r ? r[p] = n : this._root = n), this) : (this._root = s, this);
}
function Bg(t) {
  for (var e = 0, n = t.length; e < n; ++e) this.remove(t[e]);
  return this;
}
function Dg() {
  return this._root;
}
function Vg() {
  var t = 0;
  return this.visit(function(e) {
    if (!e.length) do
      ++t;
    while (e = e.next);
  }), t;
}
function Gg(t) {
  var e = [], n, r = this._root, i, s, o, l, u;
  for (r && e.push(new Wt(r, this._x0, this._y0, this._x1, this._y1)); n = e.pop(); )
    if (!t(r = n.node, s = n.x0, o = n.y0, l = n.x1, u = n.y1) && r.length) {
      var c = (s + l) / 2, a = (o + u) / 2;
      (i = r[3]) && e.push(new Wt(i, c, a, l, u)), (i = r[2]) && e.push(new Wt(i, s, a, c, u)), (i = r[1]) && e.push(new Wt(i, c, o, l, a)), (i = r[0]) && e.push(new Wt(i, s, o, c, a));
    }
  return this;
}
function zg(t) {
  var e = [], n = [], r;
  for (this._root && e.push(new Wt(this._root, this._x0, this._y0, this._x1, this._y1)); r = e.pop(); ) {
    var i = r.node;
    if (i.length) {
      var s, o = r.x0, l = r.y0, u = r.x1, c = r.y1, a = (o + u) / 2, f = (l + c) / 2;
      (s = i[0]) && e.push(new Wt(s, o, l, a, f)), (s = i[1]) && e.push(new Wt(s, a, l, u, f)), (s = i[2]) && e.push(new Wt(s, o, f, a, c)), (s = i[3]) && e.push(new Wt(s, a, f, u, c));
    }
    n.push(r);
  }
  for (; r = n.pop(); )
    t(r.node, r.x0, r.y0, r.x1, r.y1);
  return this;
}
function Hg(t) {
  return t[0];
}
function qg(t) {
  return arguments.length ? (this._x = t, this) : this._x;
}
function Wg(t) {
  return t[1];
}
function Ug(t) {
  return arguments.length ? (this._y = t, this) : this._y;
}
function Uu(t, e, n) {
  var r = new Ws(e ?? Hg, n ?? Wg, NaN, NaN, NaN, NaN);
  return t == null ? r : r.addAll(t);
}
function Ws(t, e, n, r, i, s) {
  this._x = t, this._y = e, this._x0 = n, this._y0 = r, this._x1 = i, this._y1 = s, this._root = void 0;
}
function Qo(t) {
  for (var e = { data: t.data }, n = e; t = t.next; ) n = n.next = { data: t.data };
  return e;
}
var Kt = Uu.prototype = Ws.prototype;
Kt.copy = function() {
  var t = new Ws(this._x, this._y, this._x0, this._y0, this._x1, this._y1), e = this._root, n, r;
  if (!e) return t;
  if (!e.length) return t._root = Qo(e), t;
  for (n = [{ source: e, target: t._root = new Array(4) }]; e = n.pop(); )
    for (var i = 0; i < 4; ++i)
      (r = e.source[i]) && (r.length ? n.push({ source: r, target: e.target[i] = new Array(4) }) : e.target[i] = Qo(r));
  return t;
};
Kt.add = Pg;
Kt.addAll = Og;
Kt.cover = Ig;
Kt.data = $g;
Kt.extent = Ag;
Kt.find = Fg;
Kt.remove = jg;
Kt.removeAll = Bg;
Kt.root = Dg;
Kt.size = Vg;
Kt.visit = Gg;
Kt.visitAfter = zg;
Kt.x = qg;
Kt.y = Ug;
function ae(t) {
  return function() {
    return t;
  };
}
function En(t) {
  return (t() - 0.5) * 1e-6;
}
function Kg(t) {
  return t.index;
}
function Zo(t, e) {
  var n = t.get(e);
  if (!n) throw new Error("node not found: " + e);
  return n;
}
function Xg(t) {
  var e = Kg, n = f, r, i = ae(30), s, o, l, u, c, a = 1;
  t == null && (t = []);
  function f(v) {
    return 1 / Math.min(l[v.source.index], l[v.target.index]);
  }
  function h(v) {
    for (var p = 0, k = t.length; p < a; ++p)
      for (var L = 0, w, C, B, V, U, Q, Z; L < k; ++L)
        w = t[L], C = w.source, B = w.target, V = B.x + B.vx - C.x - C.vx || En(c), U = B.y + B.vy - C.y - C.vy || En(c), Q = Math.sqrt(V * V + U * U), Q = (Q - s[L]) / Q * v * r[L], V *= Q, U *= Q, B.vx -= V * (Z = u[L]), B.vy -= U * Z, C.vx += V * (Z = 1 - Z), C.vy += U * Z;
  }
  function g() {
    if (o) {
      var v, p = o.length, k = t.length, L = new Map(o.map((C, B) => [e(C, B, o), C])), w;
      for (v = 0, l = new Array(p); v < k; ++v)
        w = t[v], w.index = v, typeof w.source != "object" && (w.source = Zo(L, w.source)), typeof w.target != "object" && (w.target = Zo(L, w.target)), l[w.source.index] = (l[w.source.index] || 0) + 1, l[w.target.index] = (l[w.target.index] || 0) + 1;
      for (v = 0, u = new Array(k); v < k; ++v)
        w = t[v], u[v] = l[w.source.index] / (l[w.source.index] + l[w.target.index]);
      r = new Array(k), y(), s = new Array(k), x();
    }
  }
  function y() {
    if (o)
      for (var v = 0, p = t.length; v < p; ++v)
        r[v] = +n(t[v], v, t);
  }
  function x() {
    if (o)
      for (var v = 0, p = t.length; v < p; ++v)
        s[v] = +i(t[v], v, t);
  }
  return h.initialize = function(v, p) {
    o = v, c = p, g();
  }, h.links = function(v) {
    return arguments.length ? (t = v, g(), h) : t;
  }, h.id = function(v) {
    return arguments.length ? (e = v, h) : e;
  }, h.iterations = function(v) {
    return arguments.length ? (a = +v, h) : a;
  }, h.strength = function(v) {
    return arguments.length ? (n = typeof v == "function" ? v : ae(+v), y(), h) : n;
  }, h.distance = function(v) {
    return arguments.length ? (i = typeof v == "function" ? v : ae(+v), x(), h) : i;
  }, h;
}
const Yg = 1664525, Jg = 1013904223, tl = 4294967296;
function Qg() {
  let t = 1;
  return () => (t = (Yg * t + Jg) % tl) / tl;
}
function Zg(t) {
  return t.x;
}
function t0(t) {
  return t.y;
}
var e0 = 10, n0 = Math.PI * (3 - Math.sqrt(5));
function r0(t) {
  var e, n = 1, r = 1e-3, i = 1 - Math.pow(r, 1 / 300), s = 0, o = 0.6, l = /* @__PURE__ */ new Map(), u = zs(f), c = yr("tick", "end"), a = Qg();
  t == null && (t = []);
  function f() {
    h(), c.call("tick", e), n < r && (u.stop(), c.call("end", e));
  }
  function h(x) {
    var v, p = t.length, k;
    x === void 0 && (x = 1);
    for (var L = 0; L < x; ++L)
      for (n += (s - n) * i, l.forEach(function(w) {
        w(n);
      }), v = 0; v < p; ++v)
        k = t[v], k.fx == null ? k.x += k.vx *= o : (k.x = k.fx, k.vx = 0), k.fy == null ? k.y += k.vy *= o : (k.y = k.fy, k.vy = 0);
    return e;
  }
  function g() {
    for (var x = 0, v = t.length, p; x < v; ++x) {
      if (p = t[x], p.index = x, p.fx != null && (p.x = p.fx), p.fy != null && (p.y = p.fy), isNaN(p.x) || isNaN(p.y)) {
        var k = e0 * Math.sqrt(0.5 + x), L = x * n0;
        p.x = k * Math.cos(L), p.y = k * Math.sin(L);
      }
      (isNaN(p.vx) || isNaN(p.vy)) && (p.vx = p.vy = 0);
    }
  }
  function y(x) {
    return x.initialize && x.initialize(t, a), x;
  }
  return g(), e = {
    tick: h,
    restart: function() {
      return u.restart(f), e;
    },
    stop: function() {
      return u.stop(), e;
    },
    nodes: function(x) {
      return arguments.length ? (t = x, g(), l.forEach(y), e) : t;
    },
    alpha: function(x) {
      return arguments.length ? (n = +x, e) : n;
    },
    alphaMin: function(x) {
      return arguments.length ? (r = +x, e) : r;
    },
    alphaDecay: function(x) {
      return arguments.length ? (i = +x, e) : +i;
    },
    alphaTarget: function(x) {
      return arguments.length ? (s = +x, e) : s;
    },
    velocityDecay: function(x) {
      return arguments.length ? (o = 1 - x, e) : 1 - o;
    },
    randomSource: function(x) {
      return arguments.length ? (a = x, l.forEach(y), e) : a;
    },
    force: function(x, v) {
      return arguments.length > 1 ? (v == null ? l.delete(x) : l.set(x, y(v)), e) : l.get(x);
    },
    find: function(x, v, p) {
      var k = 0, L = t.length, w, C, B, V, U;
      for (p == null ? p = 1 / 0 : p *= p, k = 0; k < L; ++k)
        V = t[k], w = x - V.x, C = v - V.y, B = w * w + C * C, B < p && (U = V, p = B);
      return U;
    },
    on: function(x, v) {
      return arguments.length > 1 ? (c.on(x, v), e) : c.on(x);
    }
  };
}
function i0() {
  var t, e, n, r, i = ae(-30), s, o = 1, l = 1 / 0, u = 0.81;
  function c(g) {
    var y, x = t.length, v = Uu(t, Zg, t0).visitAfter(f);
    for (r = g, y = 0; y < x; ++y) e = t[y], v.visit(h);
  }
  function a() {
    if (t) {
      var g, y = t.length, x;
      for (s = new Array(y), g = 0; g < y; ++g) x = t[g], s[x.index] = +i(x, g, t);
    }
  }
  function f(g) {
    var y = 0, x, v, p = 0, k, L, w;
    if (g.length) {
      for (k = L = w = 0; w < 4; ++w)
        (x = g[w]) && (v = Math.abs(x.value)) && (y += x.value, p += v, k += v * x.x, L += v * x.y);
      g.x = k / p, g.y = L / p;
    } else {
      x = g, x.x = x.data.x, x.y = x.data.y;
      do
        y += s[x.data.index];
      while (x = x.next);
    }
    g.value = y;
  }
  function h(g, y, x, v) {
    if (!g.value) return !0;
    var p = g.x - e.x, k = g.y - e.y, L = v - y, w = p * p + k * k;
    if (L * L / u < w)
      return w < l && (p === 0 && (p = En(n), w += p * p), k === 0 && (k = En(n), w += k * k), w < o && (w = Math.sqrt(o * w)), e.vx += p * g.value * r / w, e.vy += k * g.value * r / w), !0;
    if (g.length || w >= l) return;
    (g.data !== e || g.next) && (p === 0 && (p = En(n), w += p * p), k === 0 && (k = En(n), w += k * k), w < o && (w = Math.sqrt(o * w)));
    do
      g.data !== e && (L = s[g.data.index] * r / w, e.vx += p * L, e.vy += k * L);
    while (g = g.next);
  }
  return c.initialize = function(g, y) {
    t = g, n = y, a();
  }, c.strength = function(g) {
    return arguments.length ? (i = typeof g == "function" ? g : ae(+g), a(), c) : i;
  }, c.distanceMin = function(g) {
    return arguments.length ? (o = g * g, c) : Math.sqrt(o);
  }, c.distanceMax = function(g) {
    return arguments.length ? (l = g * g, c) : Math.sqrt(l);
  }, c.theta = function(g) {
    return arguments.length ? (u = g * g, c) : Math.sqrt(u);
  }, c;
}
function s0(t) {
  var e = ae(0.1), n, r, i;
  typeof t != "function" && (t = ae(t == null ? 0 : +t));
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
    return arguments.length ? (e = typeof l == "function" ? l : ae(+l), o(), s) : e;
  }, s.x = function(l) {
    return arguments.length ? (t = typeof l == "function" ? l : ae(+l), o(), s) : t;
  }, s;
}
function o0(t) {
  var e = ae(0.1), n, r, i;
  typeof t != "function" && (t = ae(t == null ? 0 : +t));
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
    return arguments.length ? (e = typeof l == "function" ? l : ae(+l), o(), s) : e;
  }, s.y = function(l) {
    return arguments.length ? (t = typeof l == "function" ? l : ae(+l), o(), s) : t;
  }, s;
}
function Zt(t) {
  return function() {
    return t;
  };
}
const el = Math.abs, jt = Math.atan2, ln = Math.cos, l0 = Math.max, zi = Math.min, Te = Math.sin, Sn = Math.sqrt, Jt = 1e-12, pr = Math.PI, li = pr / 2, u0 = 2 * pr;
function a0(t) {
  return t > 1 ? 0 : t < -1 ? pr : Math.acos(t);
}
function nl(t) {
  return t >= 1 ? li : t <= -1 ? -li : Math.asin(t);
}
function Ku(t) {
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
  }, () => new Lg(e);
}
function c0(t) {
  return t.innerRadius;
}
function f0(t) {
  return t.outerRadius;
}
function h0(t) {
  return t.startAngle;
}
function d0(t) {
  return t.endAngle;
}
function p0(t) {
  return t && t.padAngle;
}
function g0(t, e, n, r, i, s, o, l) {
  var u = n - t, c = r - e, a = o - i, f = l - s, h = f * u - a * c;
  if (!(h * h < Jt))
    return h = (a * (e - s) - f * (t - i)) / h, [t + h * u, e + h * c];
}
function Lr(t, e, n, r, i, s, o) {
  var l = t - n, u = e - r, c = (o ? s : -s) / Sn(l * l + u * u), a = c * u, f = -c * l, h = t + a, g = e + f, y = n + a, x = r + f, v = (h + y) / 2, p = (g + x) / 2, k = y - h, L = x - g, w = k * k + L * L, C = i - s, B = h * x - y * g, V = (L < 0 ? -1 : 1) * Sn(l0(0, C * C * w - B * B)), U = (B * L - k * V) / w, Q = (-B * k - L * V) / w, Z = (B * L + k * V) / w, st = (-B * k + L * V) / w, ft = U - v, K = Q - p, S = Z - v, G = st - p;
  return ft * ft + K * K > S * S + G * G && (U = Z, Q = st), {
    cx: U,
    cy: Q,
    x01: -a,
    y01: -f,
    x11: U * (i / C - 1),
    y11: Q * (i / C - 1)
  };
}
function m0() {
  var t = c0, e = f0, n = Zt(0), r = null, i = h0, s = d0, o = p0, l = null, u = Ku(c);
  function c() {
    var a, f, h = +t.apply(this, arguments), g = +e.apply(this, arguments), y = i.apply(this, arguments) - li, x = s.apply(this, arguments) - li, v = el(x - y), p = x > y;
    if (l || (l = a = u()), g < h && (f = g, g = h, h = f), !(g > Jt)) l.moveTo(0, 0);
    else if (v > u0 - Jt)
      l.moveTo(g * ln(y), g * Te(y)), l.arc(0, 0, g, y, x, !p), h > Jt && (l.moveTo(h * ln(x), h * Te(x)), l.arc(0, 0, h, x, y, p));
    else {
      var k = y, L = x, w = y, C = x, B = v, V = v, U = o.apply(this, arguments) / 2, Q = U > Jt && (r ? +r.apply(this, arguments) : Sn(h * h + g * g)), Z = zi(el(g - h) / 2, +n.apply(this, arguments)), st = Z, ft = Z, K, S;
      if (Q > Jt) {
        var G = nl(Q / h * Te(U)), N = nl(Q / g * Te(U));
        (B -= G * 2) > Jt ? (G *= p ? 1 : -1, w += G, C -= G) : (B = 0, w = C = (y + x) / 2), (V -= N * 2) > Jt ? (N *= p ? 1 : -1, k += N, L -= N) : (V = 0, k = L = (y + x) / 2);
      }
      var A = g * ln(k), D = g * Te(k), X = h * ln(C), Y = h * Te(C);
      if (Z > Jt) {
        var lt = g * ln(L), ut = g * Te(L), Tt = h * ln(w), wt = h * Te(w), yt;
        if (v < pr)
          if (yt = g0(A, D, Tt, wt, lt, ut, X, Y)) {
            var kt = A - yt[0], St = D - yt[1], Ct = lt - yt[0], Yt = ut - yt[1], ee = 1 / Te(a0((kt * Ct + St * Yt) / (Sn(kt * kt + St * St) * Sn(Ct * Ct + Yt * Yt))) / 2), Ke = Sn(yt[0] * yt[0] + yt[1] * yt[1]);
            st = zi(Z, (h - Ke) / (ee - 1)), ft = zi(Z, (g - Ke) / (ee + 1));
          } else
            st = ft = 0;
      }
      V > Jt ? ft > Jt ? (K = Lr(Tt, wt, A, D, g, ft, p), S = Lr(lt, ut, X, Y, g, ft, p), l.moveTo(K.cx + K.x01, K.cy + K.y01), ft < Z ? l.arc(K.cx, K.cy, ft, jt(K.y01, K.x01), jt(S.y01, S.x01), !p) : (l.arc(K.cx, K.cy, ft, jt(K.y01, K.x01), jt(K.y11, K.x11), !p), l.arc(0, 0, g, jt(K.cy + K.y11, K.cx + K.x11), jt(S.cy + S.y11, S.cx + S.x11), !p), l.arc(S.cx, S.cy, ft, jt(S.y11, S.x11), jt(S.y01, S.x01), !p))) : (l.moveTo(A, D), l.arc(0, 0, g, k, L, !p)) : l.moveTo(A, D), !(h > Jt) || !(B > Jt) ? l.lineTo(X, Y) : st > Jt ? (K = Lr(X, Y, lt, ut, h, -st, p), S = Lr(A, D, Tt, wt, h, -st, p), l.lineTo(K.cx + K.x01, K.cy + K.y01), st < Z ? l.arc(K.cx, K.cy, st, jt(K.y01, K.x01), jt(S.y01, S.x01), !p) : (l.arc(K.cx, K.cy, st, jt(K.y01, K.x01), jt(K.y11, K.x11), !p), l.arc(0, 0, h, jt(K.cy + K.y11, K.cx + K.x11), jt(S.cy + S.y11, S.cx + S.x11), p), l.arc(S.cx, S.cy, st, jt(S.y11, S.x11), jt(S.y01, S.x01), !p))) : l.arc(0, 0, h, C, w, p);
    }
    if (l.closePath(), a) return l = null, a + "" || null;
  }
  return c.centroid = function() {
    var a = (+t.apply(this, arguments) + +e.apply(this, arguments)) / 2, f = (+i.apply(this, arguments) + +s.apply(this, arguments)) / 2 - pr / 2;
    return [ln(f) * a, Te(f) * a];
  }, c.innerRadius = function(a) {
    return arguments.length ? (t = typeof a == "function" ? a : Zt(+a), c) : t;
  }, c.outerRadius = function(a) {
    return arguments.length ? (e = typeof a == "function" ? a : Zt(+a), c) : e;
  }, c.cornerRadius = function(a) {
    return arguments.length ? (n = typeof a == "function" ? a : Zt(+a), c) : n;
  }, c.padRadius = function(a) {
    return arguments.length ? (r = a == null ? null : typeof a == "function" ? a : Zt(+a), c) : r;
  }, c.startAngle = function(a) {
    return arguments.length ? (i = typeof a == "function" ? a : Zt(+a), c) : i;
  }, c.endAngle = function(a) {
    return arguments.length ? (s = typeof a == "function" ? a : Zt(+a), c) : s;
  }, c.padAngle = function(a) {
    return arguments.length ? (o = typeof a == "function" ? a : Zt(+a), c) : o;
  }, c.context = function(a) {
    return arguments.length ? (l = a ?? null, c) : l;
  }, c;
}
function w0(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function Xu(t) {
  this._context = t;
}
Xu.prototype = {
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
function y0(t) {
  return new Xu(t);
}
function _0(t) {
  return t[0];
}
function v0(t) {
  return t[1];
}
function b0(t, e) {
  var n = Zt(!0), r = null, i = y0, s = null, o = Ku(l);
  t = typeof t == "function" ? t : t === void 0 ? _0 : Zt(t), e = typeof e == "function" ? e : e === void 0 ? v0 : Zt(e);
  function l(u) {
    var c, a = (u = w0(u)).length, f, h = !1, g;
    for (r == null && (s = i(g = o())), c = 0; c <= a; ++c)
      !(c < a && n(f = u[c], c, u)) === h && ((h = !h) ? s.lineStart() : s.lineEnd()), h && s.point(+t(f, c, u), +e(f, c, u));
    if (g) return s = null, g + "" || null;
  }
  return l.x = function(u) {
    return arguments.length ? (t = typeof u == "function" ? u : Zt(+u), l) : t;
  }, l.y = function(u) {
    return arguments.length ? (e = typeof u == "function" ? u : Zt(+u), l) : e;
  }, l.defined = function(u) {
    return arguments.length ? (n = typeof u == "function" ? u : Zt(!!u), l) : n;
  }, l.curve = function(u) {
    return arguments.length ? (i = u, r != null && (s = i(r)), l) : i;
  }, l.context = function(u) {
    return arguments.length ? (u == null ? r = s = null : s = i(r = u), l) : r;
  }, l;
}
const Pr = (t) => () => t;
function x0(t, {
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
function Ge(t, e, n) {
  this.k = t, this.x = e, this.y = n;
}
Ge.prototype = {
  constructor: Ge,
  scale: function(t) {
    return t === 1 ? this : new Ge(this.k * t, this.x, this.y);
  },
  translate: function(t, e) {
    return t === 0 & e === 0 ? this : new Ge(this.k, this.x + this.k * t, this.y + this.k * e);
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
var Yu = new Ge(1, 0, 0);
Ge.prototype;
function Hi(t) {
  t.stopImmediatePropagation();
}
function qn(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function E0(t) {
  return (!t.ctrlKey || t.type === "wheel") && !t.button;
}
function S0() {
  var t = this;
  return t instanceof SVGElement ? (t = t.ownerSVGElement || t, t.hasAttribute("viewBox") ? (t = t.viewBox.baseVal, [[t.x, t.y], [t.x + t.width, t.y + t.height]]) : [[0, 0], [t.width.baseVal.value, t.height.baseVal.value]]) : [[0, 0], [t.clientWidth, t.clientHeight]];
}
function rl() {
  return this.__zoom || Yu;
}
function k0(t) {
  return -t.deltaY * (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 2e-3) * (t.ctrlKey ? 10 : 1);
}
function M0() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function T0(t, e, n) {
  var r = t.invertX(e[0][0]) - n[0][0], i = t.invertX(e[1][0]) - n[1][0], s = t.invertY(e[0][1]) - n[0][1], o = t.invertY(e[1][1]) - n[1][1];
  return t.translate(
    i > r ? (r + i) / 2 : Math.min(0, r) || Math.max(0, i),
    o > s ? (s + o) / 2 : Math.min(0, s) || Math.max(0, o)
  );
}
function C0() {
  var t = E0, e = S0, n = T0, r = k0, i = M0, s = [0, 1 / 0], o = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], l = 250, u = wp, c = yr("start", "zoom", "end"), a, f, h, g = 500, y = 150, x = 0, v = 10;
  function p(S) {
    S.property("__zoom", rl).on("wheel.zoom", U, { passive: !1 }).on("mousedown.zoom", Q).on("dblclick.zoom", Z).filter(i).on("touchstart.zoom", st).on("touchmove.zoom", ft).on("touchend.zoom touchcancel.zoom", K).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  p.transform = function(S, G, N, A) {
    var D = S.selection ? S.selection() : S;
    D.property("__zoom", rl), S !== D ? C(S, G, N, A) : D.interrupt().each(function() {
      B(this, arguments).event(A).start().zoom(null, typeof G == "function" ? G.apply(this, arguments) : G).end();
    });
  }, p.scaleBy = function(S, G, N, A) {
    p.scaleTo(S, function() {
      var D = this.__zoom.k, X = typeof G == "function" ? G.apply(this, arguments) : G;
      return D * X;
    }, N, A);
  }, p.scaleTo = function(S, G, N, A) {
    p.transform(S, function() {
      var D = e.apply(this, arguments), X = this.__zoom, Y = N == null ? w(D) : typeof N == "function" ? N.apply(this, arguments) : N, lt = X.invert(Y), ut = typeof G == "function" ? G.apply(this, arguments) : G;
      return n(L(k(X, ut), Y, lt), D, o);
    }, N, A);
  }, p.translateBy = function(S, G, N, A) {
    p.transform(S, function() {
      return n(this.__zoom.translate(
        typeof G == "function" ? G.apply(this, arguments) : G,
        typeof N == "function" ? N.apply(this, arguments) : N
      ), e.apply(this, arguments), o);
    }, null, A);
  }, p.translateTo = function(S, G, N, A, D) {
    p.transform(S, function() {
      var X = e.apply(this, arguments), Y = this.__zoom, lt = A == null ? w(X) : typeof A == "function" ? A.apply(this, arguments) : A;
      return n(Yu.translate(lt[0], lt[1]).scale(Y.k).translate(
        typeof G == "function" ? -G.apply(this, arguments) : -G,
        typeof N == "function" ? -N.apply(this, arguments) : -N
      ), X, o);
    }, A, D);
  };
  function k(S, G) {
    return G = Math.max(s[0], Math.min(s[1], G)), G === S.k ? S : new Ge(G, S.x, S.y);
  }
  function L(S, G, N) {
    var A = G[0] - N[0] * S.k, D = G[1] - N[1] * S.k;
    return A === S.x && D === S.y ? S : new Ge(S.k, A, D);
  }
  function w(S) {
    return [(+S[0][0] + +S[1][0]) / 2, (+S[0][1] + +S[1][1]) / 2];
  }
  function C(S, G, N, A) {
    S.on("start.zoom", function() {
      B(this, arguments).event(A).start();
    }).on("interrupt.zoom end.zoom", function() {
      B(this, arguments).event(A).end();
    }).tween("zoom", function() {
      var D = this, X = arguments, Y = B(D, X).event(A), lt = e.apply(D, X), ut = N == null ? w(lt) : typeof N == "function" ? N.apply(D, X) : N, Tt = Math.max(lt[1][0] - lt[0][0], lt[1][1] - lt[0][1]), wt = D.__zoom, yt = typeof G == "function" ? G.apply(D, X) : G, kt = u(wt.invert(ut).concat(Tt / wt.k), yt.invert(ut).concat(Tt / yt.k));
      return function(St) {
        if (St === 1) St = yt;
        else {
          var Ct = kt(St), Yt = Tt / Ct[2];
          St = new Ge(Yt, ut[0] - Ct[0] * Yt, ut[1] - Ct[1] * Yt);
        }
        Y.zoom(null, St);
      };
    });
  }
  function B(S, G, N) {
    return !N && S.__zooming || new V(S, G);
  }
  function V(S, G) {
    this.that = S, this.args = G, this.active = 0, this.sourceEvent = null, this.extent = e.apply(S, G), this.taps = 0;
  }
  V.prototype = {
    event: function(S) {
      return S && (this.sourceEvent = S), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(S, G) {
      return this.mouse && S !== "mouse" && (this.mouse[1] = G.invert(this.mouse[0])), this.touch0 && S !== "touch" && (this.touch0[1] = G.invert(this.touch0[0])), this.touch1 && S !== "touch" && (this.touch1[1] = G.invert(this.touch1[0])), this.that.__zoom = G, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(S) {
      var G = xt(this.that).datum();
      c.call(
        S,
        this.that,
        new x0(S, {
          sourceEvent: this.sourceEvent,
          target: p,
          transform: this.that.__zoom,
          dispatch: c
        }),
        G
      );
    }
  };
  function U(S, ...G) {
    if (!t.apply(this, arguments)) return;
    var N = B(this, G).event(S), A = this.__zoom, D = Math.max(s[0], Math.min(s[1], A.k * Math.pow(2, r.apply(this, arguments)))), X = de(S);
    if (N.wheel)
      (N.mouse[0][0] !== X[0] || N.mouse[0][1] !== X[1]) && (N.mouse[1] = A.invert(N.mouse[0] = X)), clearTimeout(N.wheel);
    else {
      if (A.k === D) return;
      N.mouse = [X, A.invert(X)], qr(this), N.start();
    }
    qn(S), N.wheel = setTimeout(Y, y), N.zoom("mouse", n(L(k(A, D), N.mouse[0], N.mouse[1]), N.extent, o));
    function Y() {
      N.wheel = null, N.end();
    }
  }
  function Q(S, ...G) {
    if (h || !t.apply(this, arguments)) return;
    var N = S.currentTarget, A = B(this, G, !0).event(S), D = xt(S.view).on("mousemove.zoom", ut, !0).on("mouseup.zoom", Tt, !0), X = de(S, N), Y = S.clientX, lt = S.clientY;
    Lu(S.view), Hi(S), A.mouse = [X, this.__zoom.invert(X)], qr(this), A.start();
    function ut(wt) {
      if (qn(wt), !A.moved) {
        var yt = wt.clientX - Y, kt = wt.clientY - lt;
        A.moved = yt * yt + kt * kt > x;
      }
      A.event(wt).zoom("mouse", n(L(A.that.__zoom, A.mouse[0] = de(wt, N), A.mouse[1]), A.extent, o));
    }
    function Tt(wt) {
      D.on("mousemove.zoom mouseup.zoom", null), Pu(wt.view, A.moved), qn(wt), A.event(wt).end();
    }
  }
  function Z(S, ...G) {
    if (t.apply(this, arguments)) {
      var N = this.__zoom, A = de(S.changedTouches ? S.changedTouches[0] : S, this), D = N.invert(A), X = N.k * (S.shiftKey ? 0.5 : 2), Y = n(L(k(N, X), A, D), e.apply(this, G), o);
      qn(S), l > 0 ? xt(this).transition().duration(l).call(C, Y, A, S) : xt(this).call(p.transform, Y, A, S);
    }
  }
  function st(S, ...G) {
    if (t.apply(this, arguments)) {
      var N = S.touches, A = N.length, D = B(this, G, S.changedTouches.length === A).event(S), X, Y, lt, ut;
      for (Hi(S), Y = 0; Y < A; ++Y)
        lt = N[Y], ut = de(lt, this), ut = [ut, this.__zoom.invert(ut), lt.identifier], D.touch0 ? !D.touch1 && D.touch0[2] !== ut[2] && (D.touch1 = ut, D.taps = 0) : (D.touch0 = ut, X = !0, D.taps = 1 + !!a);
      a && (a = clearTimeout(a)), X && (D.taps < 2 && (f = ut[0], a = setTimeout(function() {
        a = null;
      }, g)), qr(this), D.start());
    }
  }
  function ft(S, ...G) {
    if (this.__zooming) {
      var N = B(this, G).event(S), A = S.changedTouches, D = A.length, X, Y, lt, ut;
      for (qn(S), X = 0; X < D; ++X)
        Y = A[X], lt = de(Y, this), N.touch0 && N.touch0[2] === Y.identifier ? N.touch0[0] = lt : N.touch1 && N.touch1[2] === Y.identifier && (N.touch1[0] = lt);
      if (Y = N.that.__zoom, N.touch1) {
        var Tt = N.touch0[0], wt = N.touch0[1], yt = N.touch1[0], kt = N.touch1[1], St = (St = yt[0] - Tt[0]) * St + (St = yt[1] - Tt[1]) * St, Ct = (Ct = kt[0] - wt[0]) * Ct + (Ct = kt[1] - wt[1]) * Ct;
        Y = k(Y, Math.sqrt(St / Ct)), lt = [(Tt[0] + yt[0]) / 2, (Tt[1] + yt[1]) / 2], ut = [(wt[0] + kt[0]) / 2, (wt[1] + kt[1]) / 2];
      } else if (N.touch0) lt = N.touch0[0], ut = N.touch0[1];
      else return;
      N.zoom("touch", n(L(Y, lt, ut), N.extent, o));
    }
  }
  function K(S, ...G) {
    if (this.__zooming) {
      var N = B(this, G).event(S), A = S.changedTouches, D = A.length, X, Y;
      for (Hi(S), h && clearTimeout(h), h = setTimeout(function() {
        h = null;
      }, g), X = 0; X < D; ++X)
        Y = A[X], N.touch0 && N.touch0[2] === Y.identifier ? delete N.touch0 : N.touch1 && N.touch1[2] === Y.identifier && delete N.touch1;
      if (N.touch1 && !N.touch0 && (N.touch0 = N.touch1, delete N.touch1), N.touch0) N.touch0[1] = this.__zoom.invert(N.touch0[0]);
      else if (N.end(), N.taps === 2 && (Y = de(Y, this), Math.hypot(f[0] - Y[0], f[1] - Y[1]) < v)) {
        var lt = xt(this).on("dblclick.zoom");
        lt && lt.apply(this, arguments);
      }
    }
  }
  return p.wheelDelta = function(S) {
    return arguments.length ? (r = typeof S == "function" ? S : Pr(+S), p) : r;
  }, p.filter = function(S) {
    return arguments.length ? (t = typeof S == "function" ? S : Pr(!!S), p) : t;
  }, p.touchable = function(S) {
    return arguments.length ? (i = typeof S == "function" ? S : Pr(!!S), p) : i;
  }, p.extent = function(S) {
    return arguments.length ? (e = typeof S == "function" ? S : Pr([[+S[0][0], +S[0][1]], [+S[1][0], +S[1][1]]]), p) : e;
  }, p.scaleExtent = function(S) {
    return arguments.length ? (s[0] = +S[0], s[1] = +S[1], p) : [s[0], s[1]];
  }, p.translateExtent = function(S) {
    return arguments.length ? (o[0][0] = +S[0][0], o[1][0] = +S[1][0], o[0][1] = +S[0][1], o[1][1] = +S[1][1], p) : [[o[0][0], o[0][1]], [o[1][0], o[1][1]]];
  }, p.constrain = function(S) {
    return arguments.length ? (n = S, p) : n;
  }, p.duration = function(S) {
    return arguments.length ? (l = +S, p) : l;
  }, p.interpolate = function(S) {
    return arguments.length ? (u = S, p) : u;
  }, p.on = function() {
    var S = c.on.apply(c, arguments);
    return S === c ? p : S;
  }, p.clickDistance = function(S) {
    return arguments.length ? (x = (S = +S) * S, p) : Math.sqrt(x);
  }, p.tapDistance = function(S) {
    return arguments.length ? (v = +S, p) : v;
  }, p;
}
function N0(t, e) {
  let n = C0().filter((r) => {
    var i;
    return r.button === 0 || ((i = r.touches) == null ? void 0 : i.length) >= 2;
  });
  return R0(n, t, e);
}
function R0(t, e, n) {
  return n ? t.scaleExtent([0.5, 5]).on("zoom", (r) => e(r, !0)) : t.scaleExtent([1, 1]).on("zoom", (r) => e(r, !1));
}
var J = /* @__PURE__ */ ((t) => (t.CIRCLE = "circle", t.RECTANGLE = "rect", t))(J || {}), ht = /* @__PURE__ */ ((t) => (t.RIGHT = "RIGHT", t.BOTTOMRIGHT = "BOTTOMRIGHT", t.BOTTOM = "BOTTOM", t.BOTTOMLEFT = "BOTTOMLEFT", t.LEFT = "LEFT", t.TOPLEFT = "TOPLEFT", t.TOP = "TOP", t.TOPRIGHT = "TOPRIGHT", t))(ht || {});
class L0 {
  constructor() {
    Nt(this, "persistSettingsLocalStorage", !1);
    Nt(this, "hasToolbar", !1);
    // private _nodeProps: NodeProps = { shape: NodeShape.CIRCLE, radius: 48 }
    Nt(this, "_nodeProps", {
      shape: J.RECTANGLE,
      width: 128,
      height: 48,
      cornerRadius: 4,
      reflexiveEdgeStart: "MOVABLE"
    });
    /**
     * If set to true, the node resizes dynamically to match the label's width and height.
     * Words in the label will stay on a single line (no horizontal wrapping).
     *
     * If set to false, the node has a fixed size, and label words may wrap to the next line
     * or potentially overflow.
     */
    Nt(this, "nodeAutoResizeToLabelSize", !0);
    Nt(this, "showNodeLabels", !0);
    Nt(this, "nodePhysicsEnabled", !1);
    Nt(this, "isGraphEditableInGUI", !0);
    Nt(this, "zoomEnabled", !0);
    Nt(this, "showLinkLabels", !0);
    Nt(this, "fixedLinkDistanceEnabled", !1);
    Nt(this, "markerBoxSize", 4);
    Nt(this, "_markerPadding", 2 * this.markerBoxSize);
    Nt(this, "nodeGroupsFn", (e) => [e]);
  }
  set nodeSize(e) {
    this.nodeProps.shape === J.CIRCLE ? typeof e == "number" ? this.nodeProps.radius = e : this.nodeProps.radius = e.radius ?? 24 : this.nodeProps.shape === J.RECTANGLE && (typeof e == "number" ? (this.nodeProps.width = e, this.nodeProps.height = e) : (this.nodeProps.width = e.width ?? 48, this.nodeProps.height = e.height ?? 48));
  }
  get nodeSize() {
    return this.nodeProps.shape === J.CIRCLE ? { radius: this.nodeProps.radius } : { width: this.nodeProps.width, height: this.nodeProps.height };
  }
  set nodeProps(e) {
    this._nodeProps = e, e.shape === J.CIRCLE ? this.nodeSize = { radius: e.radius } : e.shape === J.RECTANGLE && (this.nodeSize = { width: e.width, height: e.height });
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
class ui {
  /**
   * @param id - The internal ID which is used for node referencing.
   * @param props - The props of the node
   * @param idImported - The external ID provided for imported nodes (solely used for the purpose of imported node creation).
   * @param x - The x coordinate of the node's center
   * @param y - The y coordinate of the node's center
   * @param label - The nodes label
   * @param color - The color of the node which was set (for default color this is empty)
   * @param fixedPosition - A fixed node can't be dragged via GUI and isn't influenced by the simulation forces
   * @param deletable - If the node is deletable via GUI
   * @param labelEditable - If the nodes label is editable via GUI
   * @param allowIncomingLinks - If the node can get new incoming links via GUI
   * @param allowOutgoingLinks - If the node can get new outgoing links via GUI
   */
  constructor(e, n, r, i, s, o, l, u, c, a, f, h) {
    Nt(this, "fx");
    Nt(this, "fy");
    Nt(this, "_fixedPosition");
    this.id = e, this.props = n, this.idImported = r, this.x = i, this.y = s, this.label = o, this.color = l, this.deletable = c, this.labelEditable = a, this.allowIncomingLinks = f, this.allowOutgoingLinks = h, this.fixedPosition = u;
  }
  set fixedPosition(e) {
    var n, r;
    this._fixedPosition = e, this.fx = (n = this.fixedPosition) != null && n.x ? this.x : void 0, this.fy = (r = this.fixedPosition) != null && r.y ? this.y : void 0;
  }
  get fixedPosition() {
    return this._fixedPosition;
  }
  setShape(e, n) {
    if (e === J.CIRCLE) {
      let r = n.nodeProps.radius ?? 0.5 * this.props.width;
      this.props = {
        shape: J.CIRCLE,
        radius: r
      };
    } else if (e === J.RECTANGLE) {
      let r = n.nodeProps.width ?? 2 * this.props.radius, i = n.nodeProps.height ?? this.props.radius, s = n.nodeProps.cornerRadius ?? 4, o = n.nodeProps.reflexiveEdgeStart ?? "MOVABLE";
      this.props = {
        shape: J.RECTANGLE,
        width: r,
        height: i,
        cornerRadius: s,
        reflexiveEdgeStart: o
      };
    }
  }
  setSize(e, n) {
    this.props.shape === J.CIRCLE ? typeof e == "number" ? this.props.radius = e : this.props.radius = e.radius ?? n.nodeProps.radius : this.props.shape === J.RECTANGLE && (typeof e == "number" ? (this.props.width = e, this.props.height = e) : (this.props.width = e.width ?? n.nodeProps.width, this.props.height = e.height ?? n.nodeProps.height));
  }
}
function P0(t, e) {
  const n = new CustomEvent("nodecreated", {
    detail: {
      node: { id: t.id, label: t.label, x: t.x, y: t.y }
    }
  });
  e.node().dispatchEvent(n);
}
function O0(t, e) {
  const n = new CustomEvent("linkcreated", {
    detail: {
      link: { id: t.id, label: t.label }
    }
  });
  e.node().dispatchEvent(n);
}
function I0(t, e, n) {
  const r = new CustomEvent("nodeclicked", {
    detail: {
      node: { id: t.id, label: t.label, x: t.x, y: t.y },
      button: e
    }
  });
  n.node().dispatchEvent(r);
}
function $0(t, e, n) {
  const r = new CustomEvent("linkclicked", {
    detail: {
      link: { id: t.id, label: t.label },
      button: e
    }
  });
  n.node().dispatchEvent(r);
}
function Or(t, e) {
  const n = new CustomEvent("nodedeleted", {
    detail: {
      node: { id: t.id, label: t.label, x: t.x, y: t.y }
    }
  });
  e.node().dispatchEvent(n);
}
function un(t, e) {
  const n = new CustomEvent("linkdeleted", {
    detail: {
      link: { id: t.id, label: t.label }
    }
  });
  e.node().dispatchEvent(n);
}
function A0(t, e, n) {
  const r = new CustomEvent("labeledited", {
    detail: {
      parent: { id: t.id },
      label: e
    }
  });
  n.node().dispatchEvent(r);
}
function se(t) {
  t.preventDefault(), t.stopPropagation();
}
function F0(t, e, n, r) {
  return Vd().filter(
    (i, s) => {
      var o, l;
      return i.button === 0 && //left mouse click
      (((o = s.fixedPosition) == null ? void 0 : o.x) !== !0 || ((l = s.fixedPosition) == null ? void 0 : l.y) !== !0);
    }
  ).on("start", (i, s) => {
    var o, l;
    se(i.sourceEvent), i.active === 0 && t.alphaTarget(0.5).restart(), ((o = s.fixedPosition) == null ? void 0 : o.x) !== !0 && (s.fx = s.x), ((l = s.fixedPosition) == null ? void 0 : l.y) !== !0 && (s.fy = s.y), qi(r, s);
  }).on("drag", (i, s) => {
    var o, l;
    ((o = s.fixedPosition) == null ? void 0 : o.x) !== !0 && (r.isCanvasBoundToView ? s.props.shape === J.CIRCLE ? s.fx = Math.max(s.props.radius, Math.min(e - s.props.radius, i.x)) : s.props.shape === J.RECTANGLE && (s.fx = Math.max(
      0.5 * s.props.width,
      Math.min(e - 0.5 * s.props.width, i.x)
    )) : s.fx = i.x), ((l = s.fixedPosition) == null ? void 0 : l.y) !== !0 && (r.isCanvasBoundToView ? s.props.shape === J.CIRCLE ? s.fy = Math.max(s.props.radius, Math.min(n - s.props.radius, i.y)) : s.props.shape === J.RECTANGLE && (s.fy = Math.max(
      0.5 * s.props.height,
      Math.min(n - 0.5 * s.props.height, i.y)
    )) : s.fy = i.y), qi(r, s);
  }).on("end", (i, s) => {
    var o, l;
    i.active === 0 && t.alphaTarget(0), ((o = s.fixedPosition) == null ? void 0 : o.x) !== !0 && (s.fx = void 0), ((l = s.fixedPosition) == null ? void 0 : l.y) !== !0 && (s.fy = void 0), qi(r, s);
  });
}
function qi(t, e) {
  const n = t.nodeGroupsFn(e);
  if (e.fx === void 0)
    for (const r of n) {
      const i = r.x - e.x;
      r.fx = e.x + i;
    }
  else
    for (const r of n) {
      const i = r.x - e.x;
      r.fx = e.fx + i;
    }
  if (e.fy === void 0)
    for (const r of n) {
      const i = r.y - e.y;
      r.fy = e.y + i;
    }
  else
    for (const r of n) {
      const i = r.y - e.y;
      r.fy = e.fy + i;
    }
}
function j0(t, e, n, r, i) {
  return t.append("svg").attr("class", "graph-controller__graph-canvas").style("background-color", "white").on("pointermove", (o) => n(o)).on("pointerup", (o) => r(o)).on("contextmenu", (o) => se(o)).on("dblclick", (o) => i(o)).call(e).on("dblclick.zoom", null).append("g");
}
var le = /* @__PURE__ */ ((t) => (t.LINE = "LINE", t.LINEREVERSE = "LINE-REVERSE", t.ARC = "ARC", t.ARCREVERSE = "ARC-REVERSE", t.REFLEXIVE = "REFLEXIVE", t))(le || {});
class B0 {
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
    Nt(this, "id");
    this.source = e, this.target = n, this.pathType = r, this.label = i, this.color = s, this.deletable = o, this.labelEditable = l, this.id = `${e.id}-${n.id}`;
  }
}
function D0(t) {
  return t.append("g").classed("links", !0).selectAll(".graph-controller__link-container");
}
function V0(t) {
  return t.append("g").classed("nodes", !0).selectAll(".graph-controller__node-container");
}
function _e(t) {
  let e = [], n = [];
  if (!Array.isArray(t))
    typeof t == "number" ? e = [t] : n = [t];
  else {
    let r = t.map(String);
    n = r.filter((i) => i.includes("-")), e = r.filter((i) => !i.includes("-")).map(Number);
  }
  return [e, n];
}
function Ir(t, e) {
  e !== void 0 && (typeof e == "boolean" ? e ? t.fixedPosition = { x: !0, y: !0 } : t.fixedPosition = { x: !1, y: !1 } : re(["x", "y"], Object.keys(e), !0) && (t.fixedPosition = e, hn(["x", "y"], Object.keys(e))));
}
function G0(t, e, n) {
  return `
    M ${-0.5 * t}, ${-0.5 * e + n}
    A ${n},${n} 0 0 1 ${-0.5 * t + n}, ${-0.5 * e}
    H ${0.5 * t - n}
    A ${n},${n} 0 0 1 ${0.5 * t}, ${-0.5 * e + n}
    V ${0.5 * e - n}
    A ${n},${n} 0 0 1 ${0.5 * t - n}, ${0.5 * e}
    H ${-0.5 * t + n}
    A ${n},${n} 0 0 1 ${-0.5 * t}, ${0.5 * e - n}
    Z
`;
}
function gr(t) {
  return t.replace(/([#.,;:<>+~^$|[\]()%\\ ])/g, "\\$1");
}
function il(t) {
  let e = t.target;
  e.hasPointerCapture(t.pointerId) && e.releasePointerCapture(t.pointerId);
}
function z0(t, e, n = 2) {
  const r = Math.abs(t.x - e.x), i = Math.abs(t.y - e.y);
  return r < n && i < n;
}
function hn(t, e, n) {
  let r = !0;
  return e.forEach((i) => {
    t.includes(
      i
      // we actually just check if the type is keyof
    ) || (r = !1, Ne(
      `Option not valid: ${i}`,
      `Use the following: ${t.join(", ")}.`
    ));
  }), r;
}
function re(t, e, n) {
  let r = !0, i = t.filter((s) => !e.includes(s));
  return i.length > 0 && (r = !1, n && Ne("Option missing", `Add: ${i}`)), r;
}
function Ne(t, e) {
  console.error(t + `
` + e);
}
function H0(t, e, n, r) {
  if (rr(t, n, e + "-link-arrow", "graph-controller__arrow", !1), rr(
    t,
    n,
    e + "-link-arrow-reverse",
    "graph-controller__arrow",
    !0
  ), rr(
    t,
    n,
    e + "-draggable-link-arrow",
    "graph-controller__arrow draggable",
    !1
  ), r)
    for (let i of r)
      ps(t, e, n, i);
}
function ps(t, e, n, r) {
  t.select(`#${e}-link-arrow-` + gr(r)).empty() && (rr(
    t,
    n,
    e + "-link-arrow-" + r,
    "graph-controller__arrow " + r,
    !1,
    r
  ), rr(
    t,
    n,
    e + "-link-arrow-reverse-" + r,
    "graph-controller__arrow colored",
    !0,
    r
  ));
}
function Wi(t, e, n) {
  t.select(`#${e}-link-arrow-` + gr(n)).select(function() {
    return this.parentNode;
  }).remove(), t.select(`#${e}-link-arrow-reverse-` + gr(n)).select(function() {
    return this.parentNode;
  }).remove();
}
function rr(t, e, n, r, i, s) {
  t.append("defs").append("marker").attr("id", n).attr("viewBox", e.markerPath).attr("refX", e.markerRef).attr("refY", e.markerRef).attr("markerWidth", e.markerBoxSize).attr("markerHeight", e.markerBoxSize).attr("orient", i ? "auto-start-reverse" : "auto").classed(r, !0).append("path").attr("d", `${b0()(e.arrowPoints)}`).style("fill", s || "");
}
function q0(t, e) {
  return e.append("path").classed("graph-controller__link draggable hidden", !0).attr("d", "M0,0L0,0").style("marker-end", `url(#${t}-draggable-link-arrow)`);
}
class sl {
  constructor() {
    Nt(this, "nodeIdCounter", 0);
    Nt(this, "nodes", []);
    Nt(this, "links", []);
  }
  createNode(e, n, r, i, s, o, l = { x: !1, y: !1 }, u = !0, c = !0, a = !0, f = !0) {
    const h = new ui(
      this.nodeIdCounter++,
      e,
      i,
      n,
      r,
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
    const a = new B0(
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
   * @param includeNodePosition if position should be included
   * @param includeNodeLabels if node labels should be included
   * @param includeLinkLabels if link labels should be included
   * @param includeNodeProps if node props should be included
   * @param includeNodeColor if node color should be included
   * @param includeLinkColor if link color should be included
   * @param includeNodeEditability if editability of node via GUI should be included
   * @param includeLinkEditability if editability of link via GUI should be included
   * @returns The graph in JSON format*/
  toJSON(e = !0, n = !0, r = !0, i = !0, s = !0, o = !0, l = !0, u = !0, c = !0) {
    const a = this.nodes.map((h) => {
      const g = {
        id: h.id
      };
      return e && (g.x = h.x, g.y = h.y), n && (g.label = h.label), i && (g.props = h.props), s && (g.color = h.color), c && (g.idImported = h.idImported), l && (g.fixedPosition = h.fixedPosition, g.deletable = h.deletable, g.labelEditable = h.labelEditable, g.allowIncomingLinks = h.allowIncomingLinks, g.allowOutgoingLinks = h.allowOutgoingLinks), g;
    }), f = this.links.map((h) => {
      const g = {
        sourceId: h.source.id,
        targetId: h.target.id
      };
      return r && (g.label = h.label), o && (g.color = h.color), u && (g.deletable = h.deletable, g.labelEditable = h.labelEditable), g;
    });
    return JSON.stringify({ nodes: a, links: f }, null, 4);
  }
}
function W0(t) {
  var e = +this._x.call(null, t), n = +this._y.call(null, t);
  return Ju(this.cover(e, n), e, n, t);
}
function Ju(t, e, n, r) {
  if (isNaN(e) || isNaN(n)) return t;
  var i, s = t._root, o = { data: r }, l = t._x0, u = t._y0, c = t._x1, a = t._y1, f, h, g, y, x, v, p, k;
  if (!s) return t._root = o, t;
  for (; s.length; )
    if ((x = e >= (f = (l + c) / 2)) ? l = f : c = f, (v = n >= (h = (u + a) / 2)) ? u = h : a = h, i = s, !(s = s[p = v << 1 | x])) return i[p] = o, t;
  if (g = +t._x.call(null, s.data), y = +t._y.call(null, s.data), e === g && n === y) return o.next = s, i ? i[p] = o : t._root = o, t;
  do
    i = i ? i[p] = new Array(4) : t._root = new Array(4), (x = e >= (f = (l + c) / 2)) ? l = f : c = f, (v = n >= (h = (u + a) / 2)) ? u = h : a = h;
  while ((p = v << 1 | x) === (k = (y >= h) << 1 | g >= f));
  return i[k] = s, i[p] = o, t;
}
function U0(t) {
  var e, n, r = t.length, i, s, o = new Array(r), l = new Array(r), u = 1 / 0, c = 1 / 0, a = -1 / 0, f = -1 / 0;
  for (n = 0; n < r; ++n)
    isNaN(i = +this._x.call(null, e = t[n])) || isNaN(s = +this._y.call(null, e)) || (o[n] = i, l[n] = s, i < u && (u = i), i > a && (a = i), s < c && (c = s), s > f && (f = s));
  for (a < u && (u = this._x0, a = this._x1), f < c && (c = this._y0, f = this._y1), this.cover(u, c).cover(a, f), n = 0; n < r; ++n)
    Ju(this, o[n], l[n], t[n]);
  return this;
}
function K0(t, e) {
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
function X0() {
  var t = [];
  return this.visit(function(e) {
    if (!e.length) do
      t.push(e.data);
    while (e = e.next);
  }), t;
}
function Y0(t) {
  return arguments.length ? this.cover(+t[0][0], +t[0][1]).cover(+t[1][0], +t[1][1]) : isNaN(this._x0) ? void 0 : [[this._x0, this._y0], [this._x1, this._y1]];
}
function Ut(t, e, n, r, i) {
  this.node = t, this.x0 = e, this.y0 = n, this.x1 = r, this.y1 = i;
}
function J0(t, e, n) {
  var r, i = this._x0, s = this._y0, o, l, u, c, a = this._x1, f = this._y1, h = [], g = this._root, y, x;
  for (g && h.push(new Ut(g, i, s, a, f)), n == null ? n = 1 / 0 : (i = t - n, s = e - n, a = t + n, f = e + n, n *= n); y = h.pop(); )
    if (!(!(g = y.node) || (o = y.x0) > a || (l = y.y0) > f || (u = y.x1) < i || (c = y.y1) < s))
      if (g.length) {
        var v = (o + u) / 2, p = (l + c) / 2;
        h.push(
          new Ut(g[3], v, p, u, c),
          new Ut(g[2], o, p, v, c),
          new Ut(g[1], v, l, u, p),
          new Ut(g[0], o, l, v, p)
        ), (x = (e >= p) << 1 | t >= v) && (y = h[h.length - 1], h[h.length - 1] = h[h.length - 1 - x], h[h.length - 1 - x] = y);
      } else {
        var k = t - +this._x.call(null, g.data), L = e - +this._y.call(null, g.data), w = k * k + L * L;
        if (w < n) {
          var C = Math.sqrt(n = w);
          i = t - C, s = e - C, a = t + C, f = e + C, r = g.data;
        }
      }
  return r;
}
function Q0(t) {
  if (isNaN(a = +this._x.call(null, t)) || isNaN(f = +this._y.call(null, t))) return this;
  var e, n = this._root, r, i, s, o = this._x0, l = this._y0, u = this._x1, c = this._y1, a, f, h, g, y, x, v, p;
  if (!n) return this;
  if (n.length) for (; ; ) {
    if ((y = a >= (h = (o + u) / 2)) ? o = h : u = h, (x = f >= (g = (l + c) / 2)) ? l = g : c = g, e = n, !(n = n[v = x << 1 | y])) return this;
    if (!n.length) break;
    (e[v + 1 & 3] || e[v + 2 & 3] || e[v + 3 & 3]) && (r = e, p = v);
  }
  for (; n.data !== t; ) if (i = n, !(n = n.next)) return this;
  return (s = n.next) && delete n.next, i ? (s ? i.next = s : delete i.next, this) : e ? (s ? e[v] = s : delete e[v], (n = e[0] || e[1] || e[2] || e[3]) && n === (e[3] || e[2] || e[1] || e[0]) && !n.length && (r ? r[p] = n : this._root = n), this) : (this._root = s, this);
}
function Z0(t) {
  for (var e = 0, n = t.length; e < n; ++e) this.remove(t[e]);
  return this;
}
function tm() {
  return this._root;
}
function em() {
  var t = 0;
  return this.visit(function(e) {
    if (!e.length) do
      ++t;
    while (e = e.next);
  }), t;
}
function nm(t) {
  var e = [], n, r = this._root, i, s, o, l, u;
  for (r && e.push(new Ut(r, this._x0, this._y0, this._x1, this._y1)); n = e.pop(); )
    if (!t(r = n.node, s = n.x0, o = n.y0, l = n.x1, u = n.y1) && r.length) {
      var c = (s + l) / 2, a = (o + u) / 2;
      (i = r[3]) && e.push(new Ut(i, c, a, l, u)), (i = r[2]) && e.push(new Ut(i, s, a, c, u)), (i = r[1]) && e.push(new Ut(i, c, o, l, a)), (i = r[0]) && e.push(new Ut(i, s, o, c, a));
    }
  return this;
}
function rm(t) {
  var e = [], n = [], r;
  for (this._root && e.push(new Ut(this._root, this._x0, this._y0, this._x1, this._y1)); r = e.pop(); ) {
    var i = r.node;
    if (i.length) {
      var s, o = r.x0, l = r.y0, u = r.x1, c = r.y1, a = (o + u) / 2, f = (l + c) / 2;
      (s = i[0]) && e.push(new Ut(s, o, l, a, f)), (s = i[1]) && e.push(new Ut(s, a, l, u, f)), (s = i[2]) && e.push(new Ut(s, o, f, a, c)), (s = i[3]) && e.push(new Ut(s, a, f, u, c));
    }
    n.push(r);
  }
  for (; r = n.pop(); )
    t(r.node, r.x0, r.y0, r.x1, r.y1);
  return this;
}
function im(t) {
  return arguments.length ? (this._x = t, this) : this._x;
}
function sm(t) {
  return arguments.length ? (this._y = t, this) : this._y;
}
function Qu(t, e, n, r, i, s) {
  this._x = t, this._y = e, this._x0 = n, this._y0 = r, this._x1 = i, this._y1 = s, this._root = void 0;
}
function ol(t) {
  for (var e = { data: t.data }, n = e; t = t.next; ) n = n.next = { data: t.data };
  return e;
}
var Xt = Qu.prototype;
Xt.copy = function() {
  var t = new Qu(this._x, this._y, this._x0, this._y0, this._x1, this._y1), e = this._root, n, r;
  if (!e) return t;
  if (!e.length) return t._root = ol(e), t;
  for (n = [{ source: e, target: t._root = new Array(4) }]; e = n.pop(); )
    for (var i = 0; i < 4; ++i)
      (r = e.source[i]) && (r.length ? n.push({ source: r, target: e.target[i] = new Array(4) }) : e.target[i] = ol(r));
  return t;
};
Xt.add = W0;
Xt.addAll = U0;
Xt.cover = K0;
Xt.data = X0;
Xt.extent = Y0;
Xt.find = J0;
Xt.remove = Q0;
Xt.removeAll = Z0;
Xt.root = tm;
Xt.size = em;
Xt.visit = nm;
Xt.visitAfter = rm;
Xt.x = im;
Xt.y = sm;
function om(t, e, n, r, i) {
  let s = r0(t.nodes).on("tick", () => i());
  return s = Xn(s), e.isCanvasBoundToView && (s = lm(s, t, n, r)), s = ta(s, t, e, e.fixedLinkDistanceEnabled), s = Zu(s, e.nodePhysicsEnabled, n, r), s;
}
function Xn(t, e, n) {
  return t;
}
function lm(t, e, n, r) {
  return t.force("bounds", () => {
    for (const i of e.nodes)
      i.props.shape === J.CIRCLE ? (i.x = Math.max(i.props.radius, Math.min(n - i.props.radius, i.x)), i.y = Math.max(i.props.radius, Math.min(r - i.props.radius, i.y))) : i.props.shape === J.RECTANGLE && (i.x = Math.max(
        0.5 * i.props.width,
        Math.min(n - 0.5 * i.props.width, i.x)
      ), i.y = Math.max(
        0.5 * i.props.height,
        Math.min(r - 0.5 * i.props.height, i.y)
      ));
  });
}
function Zu(t, e, n, r) {
  return e ? t.force("charge", i0().strength(-500)).force("x", s0(n / 2).strength(0.05)).force("y", o0(r / 2).strength(0.05)) : t.force("charge", null).force("x", null).force("y", null);
}
function ta(t, e, n, r) {
  if (r) {
    let i = 0;
    return n.nodeProps.shape === J.CIRCLE ? i = n.nodeProps.radius : n.nodeProps.shape === J.RECTANGLE && (n.nodeProps.width < n.nodeProps.height ? i = n.nodeProps.width / 2 : i = n.nodeProps.height / 2), t.force(
      "link",
      Xg().links(e.links).id((s) => s.id).distance(i * 10)
    );
  } else
    return t.force("link", null);
}
const um = Object.prototype.toString;
function ai(t) {
  const e = um.call(t);
  return e.endsWith("Array]") && !e.includes("Big");
}
function am(t) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (!ai(t))
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
function cm(t) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (!ai(t))
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
function ll(t) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (ai(t)) {
    if (t.length === 0)
      throw new TypeError("input must not be empty");
  } else throw new TypeError("input must be an array");
  var n;
  if (e.output !== void 0) {
    if (!ai(e.output))
      throw new TypeError("output option must be an array if specified");
    n = e.output;
  } else
    n = new Array(t.length);
  var r = cm(t), i = am(t);
  if (r === i)
    throw new RangeError("minimum and maximum input values are equal. Cannot rescale a constant array");
  var s = e.min, o = s === void 0 ? e.autoMinMax ? r : 0 : s, l = e.max, u = l === void 0 ? e.autoMinMax ? i : 1 : l;
  if (o >= u)
    throw new RangeError("min option must be smaller than max option");
  for (var c = (u - o) / (i - r), a = 0; a < t.length; a++)
    n[a] = (t[a] - r) * c + o;
  return n;
}
const $r = " ".repeat(2), ea = " ".repeat(4);
function fm() {
  return na(this);
}
function na(t, e = {}) {
  const { maxRows: n = 15, maxColumns: r = 10, maxNumSize: i = 8 } = e;
  return `${t.constructor.name} {
${$r}[
${ea}${hm(t, n, r, i)}
${$r}]
${$r}rows: ${t.rows}
${$r}columns: ${t.columns}
}`;
}
function hm(t, e, n, r) {
  const { rows: i, columns: s } = t, o = Math.min(i, e), l = Math.min(s, n), u = [];
  for (let c = 0; c < o; c++) {
    let a = [];
    for (let f = 0; f < l; f++)
      a.push(dm(t.get(c, f), r));
    u.push(`${a.join(" ")}`);
  }
  return l !== s && (u[u.length - 1] += ` ... ${s - n} more columns`), o !== i && u.push(`... ${i - e} more rows`), u.join(`
${ea}`);
}
function dm(t, e) {
  const n = String(t);
  if (n.length <= e)
    return n.padEnd(e, " ");
  const r = t.toPrecision(e - 2);
  if (r.length <= e)
    return r;
  const i = t.toExponential(e - 2), s = i.indexOf("e"), o = i.slice(s);
  return i.slice(0, e - o.length) + o;
}
function pm(t, e) {
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
function ve(t, e, n) {
  let r = n ? t.rows : t.rows - 1;
  if (e < 0 || e > r)
    throw new RangeError("Row index out of range");
}
function be(t, e, n) {
  let r = n ? t.columns : t.columns - 1;
  if (e < 0 || e > r)
    throw new RangeError("Column index out of range");
}
function bn(t, e) {
  if (e.to1DArray && (e = e.to1DArray()), e.length !== t.columns)
    throw new RangeError(
      "vector size must be the same as the number of columns"
    );
  return e;
}
function xn(t, e) {
  if (e.to1DArray && (e = e.to1DArray()), e.length !== t.rows)
    throw new RangeError("vector size must be the same as the number of rows");
  return e;
}
function gm(t, e, n) {
  return {
    row: mm(t, e),
    column: wm(t, n)
  };
}
function mm(t, e) {
  if (typeof e != "object")
    throw new TypeError("unexpected type for row indices");
  if (e.some((r) => r < 0 || r >= t.rows))
    throw new RangeError("row indices are out of range");
  return Array.isArray(e) || (e = Array.from(e)), e;
}
function wm(t, e) {
  if (typeof e != "object")
    throw new TypeError("unexpected type for column indices");
  if (e.some((r) => r < 0 || r >= t.columns))
    throw new RangeError("column indices are out of range");
  return Array.isArray(e) || (e = Array.from(e)), e;
}
function ul(t, e, n, r, i) {
  if (arguments.length !== 5)
    throw new RangeError("expected 4 arguments");
  if (Ar("startRow", e), Ar("endRow", n), Ar("startColumn", r), Ar("endColumn", i), e > n || r > i || e < 0 || e >= t.rows || n < 0 || n >= t.rows || r < 0 || r >= t.columns || i < 0 || i >= t.columns)
    throw new RangeError("Submatrix indices are out of range");
}
function Mi(t, e = 0) {
  let n = [];
  for (let r = 0; r < t; r++)
    n.push(e);
  return n;
}
function Ar(t, e) {
  if (typeof e != "number")
    throw new TypeError(`${t} must be a number`);
}
function _n(t) {
  if (t.isEmpty())
    throw new Error("Empty matrix has no elements to index");
}
function ym(t) {
  let e = Mi(t.rows);
  for (let n = 0; n < t.rows; ++n)
    for (let r = 0; r < t.columns; ++r)
      e[n] += t.get(n, r);
  return e;
}
function _m(t) {
  let e = Mi(t.columns);
  for (let n = 0; n < t.rows; ++n)
    for (let r = 0; r < t.columns; ++r)
      e[r] += t.get(n, r);
  return e;
}
function vm(t) {
  let e = 0;
  for (let n = 0; n < t.rows; n++)
    for (let r = 0; r < t.columns; r++)
      e += t.get(n, r);
  return e;
}
function bm(t) {
  let e = Mi(t.rows, 1);
  for (let n = 0; n < t.rows; ++n)
    for (let r = 0; r < t.columns; ++r)
      e[n] *= t.get(n, r);
  return e;
}
function xm(t) {
  let e = Mi(t.columns, 1);
  for (let n = 0; n < t.rows; ++n)
    for (let r = 0; r < t.columns; ++r)
      e[r] *= t.get(n, r);
  return e;
}
function Em(t) {
  let e = 1;
  for (let n = 0; n < t.rows; n++)
    for (let r = 0; r < t.columns; r++)
      e *= t.get(n, r);
  return e;
}
function Sm(t, e, n) {
  const r = t.rows, i = t.columns, s = [];
  for (let o = 0; o < r; o++) {
    let l = 0, u = 0, c = 0;
    for (let a = 0; a < i; a++)
      c = t.get(o, a) - n[o], l += c, u += c * c;
    e ? s.push((u - l * l / i) / (i - 1)) : s.push((u - l * l / i) / i);
  }
  return s;
}
function km(t, e, n) {
  const r = t.rows, i = t.columns, s = [];
  for (let o = 0; o < i; o++) {
    let l = 0, u = 0, c = 0;
    for (let a = 0; a < r; a++)
      c = t.get(a, o) - n[o], l += c, u += c * c;
    e ? s.push((u - l * l / r) / (r - 1)) : s.push((u - l * l / r) / r);
  }
  return s;
}
function Mm(t, e, n) {
  const r = t.rows, i = t.columns, s = r * i;
  let o = 0, l = 0, u = 0;
  for (let c = 0; c < r; c++)
    for (let a = 0; a < i; a++)
      u = t.get(c, a) - n, o += u, l += u * u;
  return e ? (l - o * o / s) / (s - 1) : (l - o * o / s) / s;
}
function Tm(t, e) {
  for (let n = 0; n < t.rows; n++)
    for (let r = 0; r < t.columns; r++)
      t.set(n, r, t.get(n, r) - e[n]);
}
function Cm(t, e) {
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
function Lm(t, e) {
  for (let n = 0; n < t.rows; n++)
    for (let r = 0; r < t.columns; r++)
      t.set(n, r, t.get(n, r) / e[n]);
}
function Pm(t) {
  const e = [];
  for (let n = 0; n < t.columns; n++) {
    let r = 0;
    for (let i = 0; i < t.rows; i++)
      r += Math.pow(t.get(i, n), 2) / (t.rows - 1);
    e.push(Math.sqrt(r));
  }
  return e;
}
function Om(t, e) {
  for (let n = 0; n < t.rows; n++)
    for (let r = 0; r < t.columns; r++)
      t.set(n, r, t.get(n, r) / e[r]);
}
function Im(t) {
  const e = t.size - 1;
  let n = 0;
  for (let r = 0; r < t.columns; r++)
    for (let i = 0; i < t.rows; i++)
      n += Math.pow(t.get(i, r), 2) / e;
  return Math.sqrt(n);
}
function $m(t, e) {
  for (let n = 0; n < t.rows; n++)
    for (let r = 0; r < t.columns; r++)
      t.set(n, r, t.get(n, r) / e);
}
class ct {
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
    return ct.isMatrix(e) ? e : new rt(e);
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
    ve(this, e);
    let n = [];
    for (let r = 0; r < this.columns; r++)
      n.push(this.get(e, r));
    return n;
  }
  getRowVector(e) {
    return rt.rowVector(this.getRow(e));
  }
  setRow(e, n) {
    ve(this, e), n = bn(this, n);
    for (let r = 0; r < this.columns; r++)
      this.set(e, r, n[r]);
    return this;
  }
  swapRows(e, n) {
    ve(this, e), ve(this, n);
    for (let r = 0; r < this.columns; r++) {
      let i = this.get(e, r);
      this.set(e, r, this.get(n, r)), this.set(n, r, i);
    }
    return this;
  }
  getColumn(e) {
    be(this, e);
    let n = [];
    for (let r = 0; r < this.rows; r++)
      n.push(this.get(r, e));
    return n;
  }
  getColumnVector(e) {
    return rt.columnVector(this.getColumn(e));
  }
  setColumn(e, n) {
    be(this, e), n = xn(this, n);
    for (let r = 0; r < this.rows; r++)
      this.set(r, e, n[r]);
    return this;
  }
  swapColumns(e, n) {
    be(this, e), be(this, n);
    for (let r = 0; r < this.rows; r++) {
      let i = this.get(r, e);
      this.set(r, e, this.get(r, n)), this.set(r, n, i);
    }
    return this;
  }
  addRowVector(e) {
    e = bn(this, e);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, this.get(n, r) + e[r]);
    return this;
  }
  subRowVector(e) {
    e = bn(this, e);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, this.get(n, r) - e[r]);
    return this;
  }
  mulRowVector(e) {
    e = bn(this, e);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, this.get(n, r) * e[r]);
    return this;
  }
  divRowVector(e) {
    e = bn(this, e);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, this.get(n, r) / e[r]);
    return this;
  }
  addColumnVector(e) {
    e = xn(this, e);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, this.get(n, r) + e[n]);
    return this;
  }
  subColumnVector(e) {
    e = xn(this, e);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, this.get(n, r) - e[n]);
    return this;
  }
  mulColumnVector(e) {
    e = xn(this, e);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, this.get(n, r) * e[n]);
    return this;
  }
  divColumnVector(e) {
    e = xn(this, e);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, this.get(n, r) / e[n]);
    return this;
  }
  mulRow(e, n) {
    ve(this, e);
    for (let r = 0; r < this.columns; r++)
      this.set(e, r, this.get(e, r) * n);
    return this;
  }
  mulColumn(e, n) {
    be(this, e);
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
    _n(this);
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
    _n(this);
    let e = this.get(0, 0), n = [0, 0];
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.get(r, i) < e && (e = this.get(r, i), n[0] = r, n[1] = i);
    return n;
  }
  maxRow(e) {
    if (ve(this, e), this.isEmpty())
      return NaN;
    let n = this.get(e, 0);
    for (let r = 1; r < this.columns; r++)
      this.get(e, r) > n && (n = this.get(e, r));
    return n;
  }
  maxRowIndex(e) {
    ve(this, e), _n(this);
    let n = this.get(e, 0), r = [e, 0];
    for (let i = 1; i < this.columns; i++)
      this.get(e, i) > n && (n = this.get(e, i), r[1] = i);
    return r;
  }
  minRow(e) {
    if (ve(this, e), this.isEmpty())
      return NaN;
    let n = this.get(e, 0);
    for (let r = 1; r < this.columns; r++)
      this.get(e, r) < n && (n = this.get(e, r));
    return n;
  }
  minRowIndex(e) {
    ve(this, e), _n(this);
    let n = this.get(e, 0), r = [e, 0];
    for (let i = 1; i < this.columns; i++)
      this.get(e, i) < n && (n = this.get(e, i), r[1] = i);
    return r;
  }
  maxColumn(e) {
    if (be(this, e), this.isEmpty())
      return NaN;
    let n = this.get(0, e);
    for (let r = 1; r < this.rows; r++)
      this.get(r, e) > n && (n = this.get(r, e));
    return n;
  }
  maxColumnIndex(e) {
    be(this, e), _n(this);
    let n = this.get(0, e), r = [0, e];
    for (let i = 1; i < this.rows; i++)
      this.get(i, e) > n && (n = this.get(i, e), r[0] = i);
    return r;
  }
  minColumn(e) {
    if (be(this, e), this.isEmpty())
      return NaN;
    let n = this.get(0, e);
    for (let r = 1; r < this.rows; r++)
      this.get(r, e) < n && (n = this.get(r, e));
    return n;
  }
  minColumnIndex(e) {
    be(this, e), _n(this);
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
    ct.isMatrix(e) && (e = e.to1DArray());
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
    const r = this.get(0, 0), i = e.get(0, 0), s = this.get(0, 1), o = e.get(0, 1), l = this.get(1, 0), u = e.get(1, 0), c = this.get(1, 1), a = e.get(1, 1), f = (r + c) * (i + a), h = (l + c) * i, g = r * (o - a), y = c * (u - i), x = (r + s) * a, v = (l - r) * (i + o), p = (s - c) * (u + a), k = f + y - x + p, L = g + x, w = h + y, C = f - h + g + v;
    return n.set(0, 0, k), n.set(0, 1, L), n.set(1, 0, w), n.set(1, 1, C), n;
  }
  strassen3x3(e) {
    e = rt.checkMatrix(e);
    let n = new rt(3, 3);
    const r = this.get(0, 0), i = this.get(0, 1), s = this.get(0, 2), o = this.get(1, 0), l = this.get(1, 1), u = this.get(1, 2), c = this.get(2, 0), a = this.get(2, 1), f = this.get(2, 2), h = e.get(0, 0), g = e.get(0, 1), y = e.get(0, 2), x = e.get(1, 0), v = e.get(1, 1), p = e.get(1, 2), k = e.get(2, 0), L = e.get(2, 1), w = e.get(2, 2), C = (r + i + s - o - l - a - f) * v, B = (r - o) * (-g + v), V = l * (-h + g + x - v - p - k + w), U = (-r + o + l) * (h - g + v), Q = (o + l) * (-h + g), Z = r * h, st = (-r + c + a) * (h - y + p), ft = (-r + c) * (y - p), K = (c + a) * (-h + y), S = (r + i + s - l - u - c - a) * p, G = a * (-h + y + x - v - p - k + L), N = (-s + a + f) * (v + k - L), A = (s - f) * (v - L), D = s * k, X = (a + f) * (-k + L), Y = (-s + l + u) * (p + k - w), lt = (s - u) * (p - w), ut = (l + u) * (-k + w), Tt = i * x, wt = u * L, yt = o * y, kt = c * g, St = f * w, Ct = Z + D + Tt, Yt = C + U + Q + Z + N + D + X, ee = Z + st + K + S + D + Y + ut, Ke = B + V + U + Z + D + Y + lt, _ = B + U + Q + Z + wt, E = D + Y + lt + ut + yt, R = Z + st + ft + G + N + A + D, F = N + A + D + X + kt, I = Z + st + ft + K + St;
    return n.set(0, 0, Ct), n.set(0, 1, Yt), n.set(0, 2, ee), n.set(1, 0, Ke), n.set(1, 1, _), n.set(1, 2, E), n.set(2, 0, R), n.set(2, 1, F), n.set(2, 2, I), n;
  }
  mmulStrassen(e) {
    e = rt.checkMatrix(e);
    let n = this.clone(), r = n.rows, i = n.columns, s = e.rows, o = e.columns;
    i !== s && console.warn(
      `Multiplying ${r} x ${i} and ${s} x ${o} matrix: dimensions do not match.`
    );
    function l(f, h, g) {
      let y = f.rows, x = f.columns;
      if (y === h && x === g)
        return f;
      {
        let v = ct.zeros(h, g);
        return v = v.setSubMatrix(f, 0, 0), v;
      }
    }
    let u = Math.max(r, s), c = Math.max(i, o);
    n = l(n, u, c), e = l(e, u, c);
    function a(f, h, g, y) {
      if (g <= 512 || y <= 512)
        return f.mmul(h);
      g % 2 === 1 && y % 2 === 1 ? (f = l(f, g + 1, y + 1), h = l(h, g + 1, y + 1)) : g % 2 === 1 ? (f = l(f, g + 1, y), h = l(h, g + 1, y)) : y % 2 === 1 && (f = l(f, g, y + 1), h = l(h, g, y + 1));
      let x = parseInt(f.rows / 2, 10), v = parseInt(f.columns / 2, 10), p = f.subMatrix(0, x - 1, 0, v - 1), k = h.subMatrix(0, x - 1, 0, v - 1), L = f.subMatrix(0, x - 1, v, f.columns - 1), w = h.subMatrix(0, x - 1, v, h.columns - 1), C = f.subMatrix(x, f.rows - 1, 0, v - 1), B = h.subMatrix(x, h.rows - 1, 0, v - 1), V = f.subMatrix(x, f.rows - 1, v, f.columns - 1), U = h.subMatrix(x, h.rows - 1, v, h.columns - 1), Q = a(
        ct.add(p, V),
        ct.add(k, U),
        x,
        v
      ), Z = a(ct.add(C, V), k, x, v), st = a(p, ct.sub(w, U), x, v), ft = a(V, ct.sub(B, k), x, v), K = a(ct.add(p, L), U, x, v), S = a(
        ct.sub(C, p),
        ct.add(k, w),
        x,
        v
      ), G = a(
        ct.sub(L, V),
        ct.add(B, U),
        x,
        v
      ), N = ct.add(Q, ft);
      N.sub(K), N.add(G);
      let A = ct.add(st, K), D = ct.add(Z, ft), X = ct.sub(Q, Z);
      X.add(st), X.add(S);
      let Y = ct.zeros(2 * N.rows, 2 * N.columns);
      return Y = Y.setSubMatrix(N, 0, 0), Y = Y.setSubMatrix(A, N.rows, 0), Y = Y.setSubMatrix(D, 0, N.columns), Y = Y.setSubMatrix(X, N.rows, N.columns), Y.subMatrix(0, g - 1, 0, y - 1);
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
      o.length > 0 && ll(o, { min: n, max: r, output: o }), i.setRow(s, o);
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
      o.length && ll(o, {
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
  sortRows(e = al) {
    for (let n = 0; n < this.rows; n++)
      this.setRow(n, this.getRow(n).sort(e));
    return this;
  }
  sortColumns(e = al) {
    for (let n = 0; n < this.columns; n++)
      this.setColumn(n, this.getColumn(n).sort(e));
    return this;
  }
  subMatrix(e, n, r, i) {
    ul(this, e, n, r, i);
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
    ul(this, n, i, r, s);
    for (let o = 0; o < e.rows; o++)
      for (let l = 0; l < e.columns; l++)
        this.set(n + o, r + l, e.get(o, l));
    return this;
  }
  selection(e, n) {
    let r = gm(this, e, n), i = new rt(e.length, n.length);
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
        return ym(this);
      case "column":
        return _m(this);
      case void 0:
        return vm(this);
      default:
        throw new Error(`invalid option: ${e}`);
    }
  }
  product(e) {
    switch (e) {
      case "row":
        return bm(this);
      case "column":
        return xm(this);
      case void 0:
        return Em(this);
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
        return Sm(this, r, i);
      }
      case "column": {
        if (!Array.isArray(i))
          throw new TypeError("mean must be an array");
        return km(this, r, i);
      }
      case void 0: {
        if (typeof i != "number")
          throw new TypeError("mean must be a number");
        return Mm(this, r, i);
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
        return Tm(this, r), this;
      }
      case "column": {
        if (!Array.isArray(r))
          throw new TypeError("center must be an array");
        return Cm(this, r), this;
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
        return Lm(this, r), this;
      }
      case "column": {
        if (r === void 0)
          r = Pm(this);
        else if (!Array.isArray(r))
          throw new TypeError("scale must be an array");
        return Om(this, r), this;
      }
      case void 0: {
        if (r === void 0)
          r = Im(this);
        else if (typeof r != "number")
          throw new TypeError("scale must be a number");
        return $m(this, r), this;
      }
      default:
        throw new Error(`invalid option: ${e}`);
    }
  }
  toString(e) {
    return na(this, e);
  }
}
ct.prototype.klass = "Matrix";
typeof Symbol < "u" && (ct.prototype[Symbol.for("nodejs.util.inspect.custom")] = fm);
function al(t, e) {
  return t - e;
}
ct.random = ct.rand;
ct.randomInt = ct.randInt;
ct.diagonal = ct.diag;
ct.prototype.diagonal = ct.prototype.diag;
ct.identity = ct.eye;
ct.prototype.negate = ct.prototype.neg;
ct.prototype.tensorProduct = ct.prototype.kroneckerProduct;
class rt extends ct {
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
    return ve(this, e), this.data.splice(e, 1), this.rows -= 1, this;
  }
  addRow(e, n) {
    return n === void 0 && (n = e, e = this.rows), ve(this, e, !0), n = Float64Array.from(bn(this, n)), this.data.splice(e, 0, n), this.rows += 1, this;
  }
  removeColumn(e) {
    be(this, e);
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
    typeof n > "u" && (n = e, e = this.columns), be(this, e, !0), n = xn(this, n);
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
pm(ct, rt);
var Am = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Fm(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var ra = { exports: {} };
(function(t, e) {
  (function(n, r) {
    t.exports = r();
  })(Am, function() {
    function n(o) {
      o = o.replace(/,/g, " ").replace(/([^eE])-/g, "$1 -").replace(/\s*([achlmqstvzACHLMQSTVZ])\s*/g, " $1 ").replace(/\s+/g, " ").replace(/(\d*\.\d+([eE]-?\d+)?)((\.\d+)+)/g, (N, A, D, X) => A + X.replaceAll(".", " ."));
      var l = o.replace(/([achlmqstvzACHLMQSTVZ])\s?/g, "|$1").split("|"), u = l.length, c, a, f, h, g, y = [], x = [], v, p, k = 0, L = 0, w = 0, C = 0, B = 0, V = 0, U = 0, Q = 0, Z = 0, st = 0, ft = 0, K = 0, S = 0, G = "";
      for (c = 1; c < u; c++) {
        if (a = l[c], f = a.substring(0, 1), h = f.toLowerCase(), y = a.replace(f, "").trim().split(" ").filter(function(N) {
          return N !== "";
        }), x = y, y = y.map(parseFloat), v = y.length, h === "m") {
          if (G += "M ", f === "m" ? (w += y[0], C += y[1]) : (w = y[0], C = y[1]), k = w, L = C, G += w + " " + C + " ", v > 2)
            for (p = 0; p < v; p += 2)
              f === "m" ? (w += y[p], C += y[p + 1]) : (w = y[p], C = y[p + 1]), G += "L " + w + " " + C + " ";
        } else if (h === "l")
          for (p = 0; p < v; p += 2)
            f === "l" ? (w += y[p], C += y[p + 1]) : (w = y[p], C = y[p + 1]), G += "L " + w + " " + C + " ";
        else if (h === "h")
          for (p = 0; p < v; p++)
            f === "h" ? w += y[p] : w = y[p], G += "L " + w + " " + C + " ";
        else if (h === "v")
          for (p = 0; p < v; p++)
            f === "v" ? C += y[p] : C = y[p], G += "L " + w + " " + C + " ";
        else if (h === "q")
          for (p = 0; p < v; p += 4)
            f === "q" ? (B = w + y[p], V = C + y[p + 1], w += y[p + 2], C += y[p + 3]) : (B = y[p], V = y[p + 1], w = y[p + 2], C = y[p + 3]), G += "Q " + B + " " + V + " " + w + " " + C + " ";
        else if (h === "t")
          for (p = 0; p < v; p += 2)
            ["t", "q"].indexOf(g) > -1 ? (B = w + (w - B), V = C + (C - V)) : (B = w, V = C), f === "t" ? (w += y[p], C += y[p + 1]) : (w = y[p], C = y[p + 1]), G += "Q " + B + " " + V + " " + w + " " + C + " ", g = h;
        else if (h === "c")
          for (p = 0; p < v; p += 6)
            f === "c" ? (B = w + y[p], V = C + y[p + 1], U = w + y[p + 2], Q = C + y[p + 3], w += y[p + 4], C += y[p + 5]) : (B = y[p], V = y[p + 1], U = y[p + 2], Q = y[p + 3], w = y[p + 4], C = y[p + 5]), G += "C " + B + " " + V + " " + U + " " + Q + " " + w + " " + C + " ";
        else if (h === "s")
          for (p = 0; p < v; p += 4)
            B = w, V = C, ["s", "c"].indexOf(g) > -1 && (B += w - U, V += C - Q), f === "s" ? (U = w + y[p], Q = C + y[p + 1], w += y[p + 2], C += y[p + 3]) : (U = y[p], Q = y[p + 1], w = y[p + 2], C = y[p + 3]), G += "C " + B + " " + V + " " + U + " " + Q + " " + w + " " + C + " ";
        else if (h === "a")
          for (p = 0; p < v; p += 7) {
            Z = y[p], st = y[p + 1], ft = y[p + 2], K = x[p + 3];
            let N = !1;
            if (K.length > 1) {
              let A = parseInt(K[0]), D = parseInt(K[1]), X;
              K.length > 2 && (X = parseFloat(K.substring(2))), y[p + 3] = A, y.splice(p + 4, 0, D), x.splice(p + 4, 0, "+"), X !== void 0 && y.splice(p + 5, 0, X), N = !0;
            }
            K = y[p + 3], S = N ? y[p + 4] : x[p + 4], !N && S.length > 1 && (y[p + 4] = parseInt(S[0]), y.splice(p + 5, 0, parseFloat(S.substring(1)))), S = y[p + 4], f === "a" ? (w += y[p + 5], C += y[p + 6]) : (w = y[p + 5], C = y[p + 6]), G += "A " + Z + " " + st + " " + ft + " " + K + " " + S + " " + w + " " + C + " ";
          }
        else h === "z" && (G += "Z ", w = k, C = L);
        g = h;
      }
      return G.trim();
    }
    function r(o) {
      var l = o.trim().split(" "), u, c = l.length, a = c - 1, f, h = [], g, y, x, v, p, k = new RegExp("[QAZLCM]", ""), L = l.slice(-1)[0].toUpperCase() === "Z";
      for (f = 0; f < c; f++)
        if (u = l[f], k.test(u)) {
          if (u === "A") {
            h.push(l[f + 5] === "0" ? "1" : "0"), h.push(l[f + 4]), h.push(l[f + 3]), h.push(l[f + 2]), h.push(l[f + 1]), h.push(u), h.push(l[f + 7]), h.push(l[f + 6]), f += 7;
            continue;
          } else if (u === "C")
            v = 3, p = 2;
          else if (u === "Q")
            v = 2, p = 1;
          else if (u === "L")
            v = 1, p = 1;
          else if (u === "M")
            v = 1, p = 0;
          else
            continue;
          for (v === p && h.push(u), x = 0; x < v; x++)
            x === p && h.push(u), g = l[++f], y = l[++f], h.push(y), h.push(g);
        } else {
          var w = l.slice(Math.max(f - 3, 0), 3).join(" ");
          throw post = l.slice(f + 1, Math.min(f + 4, a)).join(" "), range = w + " [" + u + "] " + post, "Error while trying to reverse normalized SVG path, at position " + f + " (" + range + `).
Either the path is not normalised, or it's malformed.`;
        }
      h.push("M");
      var C = "", B = h.length - 1, V;
      for (V = B; V > 0; V--)
        C += h[V] + " ";
      return L && (C += "Z"), C = C.replace(/M M/g, "Z M"), C;
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
})(ra);
var jm = ra.exports;
const cl = /* @__PURE__ */ Fm(jm);
function Bm(t, e, n, r) {
  switch (t.pathType) {
    case le.REFLEXIVE:
      return ia(t.source, [e / 2, n / 2], r);
    case le.ARC:
      return gs(t.source, t.target, r);
    case le.ARCREVERSE:
      return cl.reverse(gs(t.source, t.target, r));
    case le.LINE:
      return ir(t.source, t.target, r);
    case le.LINEREVERSE:
      return cl.reverse(ir(t.source, t.target, r));
    default:
      return "";
  }
}
function Dm(t, e, n) {
  return t.id === e.id ? le.REFLEXIVE : n.hasBidirectionalConnection(t, e) ? fl(t, e) ? le.ARCREVERSE : le.ARC : fl(t, e) ? le.LINEREVERSE : le.LINE;
}
function ir(t, e, n) {
  const r = { x: e.x - t.x, y: e.y - t.y };
  let i = Math.sqrt(r.x * r.x + r.y * r.y);
  i === 0 && (i = Number.EPSILON);
  const s = r.x / i, o = r.y / i, l = Vm(t, e, n, s, o);
  return `M${l.start.x},${l.start.y}
          L${l.end.x},${l.end.y}`;
}
function Vm(t, e, n, r, i) {
  let s, o;
  return t.props.shape === J.CIRCLE ? s = {
    x: t.x + (t.props.radius - 1) * r,
    y: t.y + (t.props.radius - 1) * i
  } : t.props.shape === J.RECTANGLE && (s = ci(
    t.x,
    t.y,
    t.props.width,
    t.props.height,
    r,
    i,
    2
  )), e instanceof ui ? o = e.props.shape === J.CIRCLE ? {
    x: e.x - (e.props.radius + n.markerPadding) * r,
    y: e.y - (e.props.radius + n.markerPadding) * i
  } : ci(
    e.x,
    e.y,
    e.props.width,
    e.props.height,
    -r,
    -i,
    -n.markerPadding + 1
  ) : o = {
    x: e.x,
    y: e.y
  }, { start: s, end: o };
}
function gs(t, e, n) {
  const r = new rt([[t.x, t.y]]), i = new rt([[e.x, e.y]]), s = rt.subtract(i, r), o = s.norm("frobenius"), l = s.divide(o);
  let u = t.props.shape === J.CIRCLE ? kn(10) : kn(30), c = e.props.shape === J.CIRCLE ? kn(10) : kn(30), a = 1.2 * o;
  const f = Gm(t, e, n, r, i, l, {
    start: u,
    end: c
  });
  return `M${f.start.get(0, 0)},${f.start.get(0, 1)}
          A${a},${a},0,0,1,${f.end.get(0, 0)},${f.end.get(0, 1)}`;
}
function Gm(t, e, n, r, i, s, o) {
  let l, u;
  if (t.props.shape === J.CIRCLE)
    l = Ht(s, -o.start).multiply(t.props.radius - 1).add(r);
  else if (t.props.shape === J.RECTANGLE) {
    const c = ci(
      t.x,
      t.y,
      t.props.width,
      t.props.height,
      s.get(0, 0),
      s.get(0, 1),
      2
    );
    l = Ht(s, -o.start).add([[c.x, c.y]]);
  }
  if (e.props.shape === J.CIRCLE) {
    const c = rt.multiply(s, -1);
    u = Ht(c, o.end).multiply(e.props.radius).add(i).add(Ht(c, o.end).multiply(2 * n.markerBoxSize));
  } else if (e.props.shape === J.RECTANGLE) {
    const c = ci(
      e.x,
      e.y,
      e.props.width,
      e.props.height,
      -s.get(0, 0),
      -s.get(0, 1)
    ), a = rt.multiply(s, -1);
    u = Ht(a, o.end).add([[c.x, c.y]]).add(Ht(a, o.end).multiply(2 * n.markerBoxSize));
  }
  return { start: l, end: u };
}
function ia(t, e, n) {
  const r = new rt([e]);
  if (t.props.shape === J.CIRCLE) {
    const i = new rt([[t.x, t.y]]);
    i.get(0, 0) === r.get(0, 0) && i.get(0, 1) === r.get(0, 1) && r.add([[0, 1]]);
    const s = rt.subtract(i, r), o = s.divide(s.norm("frobenius")), l = kn(40), u = Ht(o, l).multiply(t.props.radius - 1).add(i), c = Ht(o, -l).multiply(t.props.radius).add(i).add(Ht(o, -l).multiply(2 * n.markerBoxSize));
    return `M${u.get(0, 0)},${u.get(0, 1)}
              A${t.props.radius},${t.props.radius},0,1,0,${c.get(0, 0)},${c.get(0, 1)}`;
  } else return t.props.shape === J.RECTANGLE ? t.props.reflexiveEdgeStart == "MOVABLE" ? zm(t, n, r) : Hm(t, n) : "";
}
function fl(t, e) {
  return t.x > e.x;
}
function zm(t, e, n) {
  if (t.props.shape === J.RECTANGLE) {
    const r = new rt([[t.x, t.y]]);
    r.get(0, 0) === n.get(0, 0) && r.get(0, 1) === n.get(0, 1) && n.add([[0, 1]]);
    const i = rt.subtract(r, n), s = i.divide(i.norm("frobenius")), o = kn(45);
    let l, u, c = 0.5 * t.props.width, a = 0.5 * t.props.height;
    const f = qm(
      i.get(0, 0),
      i.get(0, 1),
      30
    );
    if (f === ht.BOTTOMLEFT || f === ht.BOTTOMRIGHT || f === ht.TOPLEFT || f === ht.TOPRIGHT) {
      let h = sa(f, t, e);
      l = h.start, u = h.end, t.props.width > t.props.height ? (f === ht.TOPLEFT || f === ht.BOTTOMRIGHT) && (c = 0.25 * t.props.width) : t.props.height > t.props.width && (f === ht.TOPRIGHT || f === ht.BOTTOMLEFT) && (a = 0.25 * t.props.height);
    } else f === ht.LEFT || f === ht.RIGHT ? (l = Ht(s, o).multiply(0.5 * t.props.width - 1).add(r), u = Ht(s, -o).multiply(0.5 * t.props.height - 1).add(r).add(Ht(s, -o).multiply(2 * e.markerBoxSize))) : (l = Ht(s, o).multiply(0.5 * t.props.height - 1).add(r), u = Ht(s, -o).multiply(0.5 * t.props.width - 1).add(r).add(Ht(s, -o).multiply(2 * e.markerBoxSize)));
    return `M${l.get(0, 0)},${l.get(0, 1)} A${c},${a}, 0, 1, 0, ${u.get(0, 0)},${u.get(0, 1)}`;
  } else
    return "";
}
function Hm(t, e) {
  if (t.props.shape === J.RECTANGLE && t.props.reflexiveEdgeStart !== "MOVABLE") {
    let n, r, i = 0.5 * t.props.width, s = 0.5 * t.props.height;
    t.props.width > t.props.height ? (t.props.reflexiveEdgeStart === ht.TOPLEFT || t.props.reflexiveEdgeStart === ht.BOTTOMRIGHT) && (i = t.props.width / t.props.height + t.props.height) : t.props.height > t.props.width && (t.props.reflexiveEdgeStart === ht.TOPRIGHT || t.props.reflexiveEdgeStart === ht.BOTTOMLEFT) && (s = t.props.height / t.props.width + t.props.width);
    let o = sa(
      t.props.reflexiveEdgeStart,
      t,
      e
    );
    return n = o.start, r = o.end, `M${n.get(0, 0)},${n.get(0, 1)} A${i},${s}, 0, 1, 0, ${r.get(0, 0)},${r.get(0, 1)}`;
  } else
    return "";
}
function ci(t, e, n, r, i, s, o = 0) {
  const l = t - 0.5 * n, u = t + 0.5 * n, c = e - 0.5 * r, a = e + 0.5 * r;
  i === 0 && (i = Number.EPSILON), s === 0 && (s = Number.EPSILON);
  const f = i < 0 ? l : u, h = s < 0 ? c : a, g = (f - t) / i, y = (h - e) / s, x = Math.min(g, y);
  let v = t + x * i, p = e + x * s;
  if (o !== 0)
    if (g < y) {
      let k;
      f === l ? k = 1 : k = -1, v = v + o * k;
    } else {
      let k;
      h === c ? k = 1 : k = -1, p = p + o * k;
    }
  return { x: v, y: p };
}
function qm(t, e, n = 30) {
  let r = Wm(Math.atan2(t, e));
  return r < 0 && (r += 360), an(r, 0, n) ? ht.BOTTOMLEFT : an(r, [0, 90], -n) ? ht.BOTTOM : an(r, 90, n) ? ht.BOTTOMRIGHT : an(r, [90, 180], -n) ? ht.RIGHT : an(r, 180, n) ? ht.TOPRIGHT : an(r, [180, 270], -n) ? ht.TOP : an(r, 270, n) ? ht.TOPLEFT : ht.LEFT;
}
function sa(t, e, n) {
  const r = e.x, i = e.y, s = 0.5 * e.props.width, o = 0.5 * e.props.height, l = n.markerBoxSize, u = {
    [ht.BOTTOMLEFT]: {
      start: [r - s + 2, i + o - 1],
      end: [r + s - 2 * l, i + o + 2 * l]
    },
    [ht.BOTTOM]: {
      start: [r + 0.5 * s, i + o - 1],
      end: [r + s + 2 * l, i + 0.5 * o]
    },
    [ht.BOTTOMRIGHT]: {
      start: [r + s - 2, i + o - 1],
      end: [r + s + 2 * l, i - o + 2 * l]
    },
    [ht.RIGHT]: {
      start: [r + s - 1, i + 0.5 * o],
      end: [r + 0.5 * s, i - 2 * l]
    },
    [ht.TOPRIGHT]: {
      start: [r + s - 2, i - o + 1],
      end: [r - s + 2 * l, i - o - 2 * l]
    },
    [ht.TOP]: {
      start: [r + 0.5 * s, i + 1],
      end: [r - 2 * l, i + 0.5 * o]
    },
    [ht.TOPLEFT]: {
      start: [r - s + 2, i - o + 1],
      end: [r - s - 2 * l, i + o - 2 * l]
    },
    [ht.LEFT]: {
      start: [r + 1, i + 0.5 * o],
      end: [r + 0.5 * s, i + o + 2 * l]
    }
  }, { start: c, end: a } = u[t];
  return {
    start: new rt([c]),
    end: new rt([a])
  };
}
function an(t, e, n = 0) {
  t = (t + 360) % 360;
  let r, i;
  return typeof e == "number" ? (r = (e - n + 360) % 360, i = (e + n) % 360) : (r = (e[0] - n + 360) % 360, i = (e[1] + n) % 360), r < i ? t >= r && t <= i : t >= r || t <= i;
}
function kn(t) {
  return t * (Math.PI / 180);
}
function Wm(t) {
  return t * (180 / Math.PI);
}
function Ht(t, e) {
  const n = t.get(0, 0), r = t.get(0, 1);
  return new rt([
    [
      n * Math.cos(e) - r * Math.sin(e),
      n * Math.sin(e) + r * Math.cos(e)
    ]
  ]);
}
function Um(t) {
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
function Km(t) {
  const e = [];
  for (let r of t.nodes)
    e.push({
      idImported: r.id,
      x: r.x,
      y: r.y,
      label: r.label,
      props: r.props,
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
const Xm = {
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
}, oa = {
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
}, Gt = {
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
}, Je = {
  EdgeHTML: "EdgeHTML",
  Blink: "Blink",
  Trident: "Trident",
  Presto: "Presto",
  Gecko: "Gecko",
  WebKit: "WebKit"
};
class P {
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
    const i = P.getVersionPrecision(e), s = P.getVersionPrecision(n);
    let o = Math.max(i, s), l = 0;
    const u = P.map([e, n], (c) => {
      const a = o - P.getVersionPrecision(c), f = c + new Array(a + 1).join(".0");
      return P.map(f.split("."), (h) => new Array(20 - h.length).join("0") + h).reverse();
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
    return Xm[e];
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
    return oa[e] || "";
  }
}
const _t = /version\/(\d+(\.?_?\d+)+)/i, Ym = [
  /* Googlebot */
  {
    test: [/googlebot/i],
    describe(t) {
      const e = {
        name: "Googlebot"
      }, n = P.getFirstMatch(/googlebot\/(\d+(\.\d+))/i, t) || P.getFirstMatch(_t, t);
      return n && (e.version = n), e;
    }
  },
  /* Opera < 13.0 */
  {
    test: [/opera/i],
    describe(t) {
      const e = {
        name: "Opera"
      }, n = P.getFirstMatch(_t, t) || P.getFirstMatch(/(?:opera)[\s/](\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  /* Opera > 13.0 */
  {
    test: [/opr\/|opios/i],
    describe(t) {
      const e = {
        name: "Opera"
      }, n = P.getFirstMatch(/(?:opr|opios)[\s/](\S+)/i, t) || P.getFirstMatch(_t, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/SamsungBrowser/i],
    describe(t) {
      const e = {
        name: "Samsung Internet for Android"
      }, n = P.getFirstMatch(_t, t) || P.getFirstMatch(/(?:SamsungBrowser)[\s/](\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/Whale/i],
    describe(t) {
      const e = {
        name: "NAVER Whale Browser"
      }, n = P.getFirstMatch(_t, t) || P.getFirstMatch(/(?:whale)[\s/](\d+(?:\.\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/MZBrowser/i],
    describe(t) {
      const e = {
        name: "MZ Browser"
      }, n = P.getFirstMatch(/(?:MZBrowser)[\s/](\d+(?:\.\d+)+)/i, t) || P.getFirstMatch(_t, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/focus/i],
    describe(t) {
      const e = {
        name: "Focus"
      }, n = P.getFirstMatch(/(?:focus)[\s/](\d+(?:\.\d+)+)/i, t) || P.getFirstMatch(_t, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/swing/i],
    describe(t) {
      const e = {
        name: "Swing"
      }, n = P.getFirstMatch(/(?:swing)[\s/](\d+(?:\.\d+)+)/i, t) || P.getFirstMatch(_t, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/coast/i],
    describe(t) {
      const e = {
        name: "Opera Coast"
      }, n = P.getFirstMatch(_t, t) || P.getFirstMatch(/(?:coast)[\s/](\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/opt\/\d+(?:.?_?\d+)+/i],
    describe(t) {
      const e = {
        name: "Opera Touch"
      }, n = P.getFirstMatch(/(?:opt)[\s/](\d+(\.?_?\d+)+)/i, t) || P.getFirstMatch(_t, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/yabrowser/i],
    describe(t) {
      const e = {
        name: "Yandex Browser"
      }, n = P.getFirstMatch(/(?:yabrowser)[\s/](\d+(\.?_?\d+)+)/i, t) || P.getFirstMatch(_t, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/ucbrowser/i],
    describe(t) {
      const e = {
        name: "UC Browser"
      }, n = P.getFirstMatch(_t, t) || P.getFirstMatch(/(?:ucbrowser)[\s/](\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/Maxthon|mxios/i],
    describe(t) {
      const e = {
        name: "Maxthon"
      }, n = P.getFirstMatch(_t, t) || P.getFirstMatch(/(?:Maxthon|mxios)[\s/](\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/epiphany/i],
    describe(t) {
      const e = {
        name: "Epiphany"
      }, n = P.getFirstMatch(_t, t) || P.getFirstMatch(/(?:epiphany)[\s/](\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/puffin/i],
    describe(t) {
      const e = {
        name: "Puffin"
      }, n = P.getFirstMatch(_t, t) || P.getFirstMatch(/(?:puffin)[\s/](\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/sleipnir/i],
    describe(t) {
      const e = {
        name: "Sleipnir"
      }, n = P.getFirstMatch(_t, t) || P.getFirstMatch(/(?:sleipnir)[\s/](\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/k-meleon/i],
    describe(t) {
      const e = {
        name: "K-Meleon"
      }, n = P.getFirstMatch(_t, t) || P.getFirstMatch(/(?:k-meleon)[\s/](\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/micromessenger/i],
    describe(t) {
      const e = {
        name: "WeChat"
      }, n = P.getFirstMatch(/(?:micromessenger)[\s/](\d+(\.?_?\d+)+)/i, t) || P.getFirstMatch(_t, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/qqbrowser/i],
    describe(t) {
      const e = {
        name: /qqbrowserlite/i.test(t) ? "QQ Browser Lite" : "QQ Browser"
      }, n = P.getFirstMatch(/(?:qqbrowserlite|qqbrowser)[/](\d+(\.?_?\d+)+)/i, t) || P.getFirstMatch(_t, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/msie|trident/i],
    describe(t) {
      const e = {
        name: "Internet Explorer"
      }, n = P.getFirstMatch(/(?:msie |rv:)(\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/\sedg\//i],
    describe(t) {
      const e = {
        name: "Microsoft Edge"
      }, n = P.getFirstMatch(/\sedg\/(\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/edg([ea]|ios)/i],
    describe(t) {
      const e = {
        name: "Microsoft Edge"
      }, n = P.getSecondMatch(/edg([ea]|ios)\/(\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/vivaldi/i],
    describe(t) {
      const e = {
        name: "Vivaldi"
      }, n = P.getFirstMatch(/vivaldi\/(\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/seamonkey/i],
    describe(t) {
      const e = {
        name: "SeaMonkey"
      }, n = P.getFirstMatch(/seamonkey\/(\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/sailfish/i],
    describe(t) {
      const e = {
        name: "Sailfish"
      }, n = P.getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/silk/i],
    describe(t) {
      const e = {
        name: "Amazon Silk"
      }, n = P.getFirstMatch(/silk\/(\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/phantom/i],
    describe(t) {
      const e = {
        name: "PhantomJS"
      }, n = P.getFirstMatch(/phantomjs\/(\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/slimerjs/i],
    describe(t) {
      const e = {
        name: "SlimerJS"
      }, n = P.getFirstMatch(/slimerjs\/(\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/blackberry|\bbb\d+/i, /rim\stablet/i],
    describe(t) {
      const e = {
        name: "BlackBerry"
      }, n = P.getFirstMatch(_t, t) || P.getFirstMatch(/blackberry[\d]+\/(\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/(web|hpw)[o0]s/i],
    describe(t) {
      const e = {
        name: "WebOS Browser"
      }, n = P.getFirstMatch(_t, t) || P.getFirstMatch(/w(?:eb)?[o0]sbrowser\/(\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/bada/i],
    describe(t) {
      const e = {
        name: "Bada"
      }, n = P.getFirstMatch(/dolfin\/(\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/tizen/i],
    describe(t) {
      const e = {
        name: "Tizen"
      }, n = P.getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.?_?\d+)+)/i, t) || P.getFirstMatch(_t, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/qupzilla/i],
    describe(t) {
      const e = {
        name: "QupZilla"
      }, n = P.getFirstMatch(/(?:qupzilla)[\s/](\d+(\.?_?\d+)+)/i, t) || P.getFirstMatch(_t, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/firefox|iceweasel|fxios/i],
    describe(t) {
      const e = {
        name: "Firefox"
      }, n = P.getFirstMatch(/(?:firefox|iceweasel|fxios)[\s/](\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/electron/i],
    describe(t) {
      const e = {
        name: "Electron"
      }, n = P.getFirstMatch(/(?:electron)\/(\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/MiuiBrowser/i],
    describe(t) {
      const e = {
        name: "Miui"
      }, n = P.getFirstMatch(/(?:MiuiBrowser)[\s/](\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/chromium/i],
    describe(t) {
      const e = {
        name: "Chromium"
      }, n = P.getFirstMatch(/(?:chromium)[\s/](\d+(\.?_?\d+)+)/i, t) || P.getFirstMatch(_t, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/chrome|crios|crmo/i],
    describe(t) {
      const e = {
        name: "Chrome"
      }, n = P.getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/GSA/i],
    describe(t) {
      const e = {
        name: "Google Search"
      }, n = P.getFirstMatch(/(?:GSA)\/(\d+(\.?_?\d+)+)/i, t);
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
      }, n = P.getFirstMatch(_t, t);
      return n && (e.version = n), e;
    }
  },
  /* PlayStation 4 */
  {
    test: [/playstation 4/i],
    describe(t) {
      const e = {
        name: "PlayStation 4"
      }, n = P.getFirstMatch(_t, t);
      return n && (e.version = n), e;
    }
  },
  /* Safari */
  {
    test: [/safari|applewebkit/i],
    describe(t) {
      const e = {
        name: "Safari"
      }, n = P.getFirstMatch(_t, t);
      return n && (e.version = n), e;
    }
  },
  /* Something else */
  {
    test: [/.*/i],
    describe(t) {
      const e = /^(.*)\/(.*) /, n = /^(.*)\/(.*)[ \t]\((.*)/, i = t.search("\\(") !== -1 ? n : e;
      return {
        name: P.getFirstMatch(i, t),
        version: P.getSecondMatch(i, t)
      };
    }
  }
], Jm = [
  /* Roku */
  {
    test: [/Roku\/DVP/],
    describe(t) {
      const e = P.getFirstMatch(/Roku\/DVP-(\d+\.\d+)/i, t);
      return {
        name: Gt.Roku,
        version: e
      };
    }
  },
  /* Windows Phone */
  {
    test: [/windows phone/i],
    describe(t) {
      const e = P.getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i, t);
      return {
        name: Gt.WindowsPhone,
        version: e
      };
    }
  },
  /* Windows */
  {
    test: [/windows /i],
    describe(t) {
      const e = P.getFirstMatch(/Windows ((NT|XP)( \d\d?.\d)?)/i, t), n = P.getWindowsVersionName(e);
      return {
        name: Gt.Windows,
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
        name: Gt.iOS
      }, n = P.getSecondMatch(/(Version\/)(\d[\d.]+)/, t);
      return n && (e.version = n), e;
    }
  },
  /* macOS */
  {
    test: [/macintosh/i],
    describe(t) {
      const e = P.getFirstMatch(/mac os x (\d+(\.?_?\d+)+)/i, t).replace(/[_\s]/g, "."), n = P.getMacOSVersionName(e), r = {
        name: Gt.MacOS,
        version: e
      };
      return n && (r.versionName = n), r;
    }
  },
  /* iOS */
  {
    test: [/(ipod|iphone|ipad)/i],
    describe(t) {
      const e = P.getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i, t).replace(/[_\s]/g, ".");
      return {
        name: Gt.iOS,
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
      const e = P.getFirstMatch(/android[\s/-](\d+(\.\d+)*)/i, t), n = P.getAndroidVersionName(e), r = {
        name: Gt.Android,
        version: e
      };
      return n && (r.versionName = n), r;
    }
  },
  /* WebOS */
  {
    test: [/(web|hpw)[o0]s/i],
    describe(t) {
      const e = P.getFirstMatch(/(?:web|hpw)[o0]s\/(\d+(\.\d+)*)/i, t), n = {
        name: Gt.WebOS
      };
      return e && e.length && (n.version = e), n;
    }
  },
  /* BlackBerry */
  {
    test: [/blackberry|\bbb\d+/i, /rim\stablet/i],
    describe(t) {
      const e = P.getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i, t) || P.getFirstMatch(/blackberry\d+\/(\d+([_\s]\d+)*)/i, t) || P.getFirstMatch(/\bbb(\d+)/i, t);
      return {
        name: Gt.BlackBerry,
        version: e
      };
    }
  },
  /* Bada */
  {
    test: [/bada/i],
    describe(t) {
      const e = P.getFirstMatch(/bada\/(\d+(\.\d+)*)/i, t);
      return {
        name: Gt.Bada,
        version: e
      };
    }
  },
  /* Tizen */
  {
    test: [/tizen/i],
    describe(t) {
      const e = P.getFirstMatch(/tizen[/\s](\d+(\.\d+)*)/i, t);
      return {
        name: Gt.Tizen,
        version: e
      };
    }
  },
  /* Linux */
  {
    test: [/linux/i],
    describe() {
      return {
        name: Gt.Linux
      };
    }
  },
  /* Chrome OS */
  {
    test: [/CrOS/],
    describe() {
      return {
        name: Gt.ChromeOS
      };
    }
  },
  /* Playstation 4 */
  {
    test: [/PlayStation 4/],
    describe(t) {
      const e = P.getFirstMatch(/PlayStation 4[/\s](\d+(\.\d+)*)/i, t);
      return {
        name: Gt.PlayStation4,
        version: e
      };
    }
  }
], Qm = [
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
      const e = P.getFirstMatch(/(can-l01)/i, t) && "Nova", n = {
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
      const e = P.getFirstMatch(/(ipod|iphone)/i, t);
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
], Zm = [
  /* EdgeHTML */
  {
    test(t) {
      return t.getBrowserName(!0) === "microsoft edge";
    },
    describe(t) {
      if (/\sedg\//i.test(t))
        return {
          name: Je.Blink
        };
      const n = P.getFirstMatch(/edge\/(\d+(\.?_?\d+)+)/i, t);
      return {
        name: Je.EdgeHTML,
        version: n
      };
    }
  },
  /* Trident */
  {
    test: [/trident/i],
    describe(t) {
      const e = {
        name: Je.Trident
      }, n = P.getFirstMatch(/trident\/(\d+(\.?_?\d+)+)/i, t);
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
        name: Je.Presto
      }, n = P.getFirstMatch(/presto\/(\d+(\.?_?\d+)+)/i, t);
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
        name: Je.Gecko
      }, n = P.getFirstMatch(/gecko\/(\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  /* Blink */
  {
    test: [/(apple)?webkit\/537\.36/i],
    describe() {
      return {
        name: Je.Blink
      };
    }
  },
  /* WebKit */
  {
    test: [/(apple)?webkit/i],
    describe(t) {
      const e = {
        name: Je.WebKit
      }, n = P.getFirstMatch(/webkit\/(\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  }
];
class hl {
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
    const e = P.find(Ym, (n) => {
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
    const e = P.find(Jm, (n) => {
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
    const e = P.find(Qm, (n) => {
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
    const e = P.find(Zm, (n) => {
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
    return P.assign({}, this.parsedResult);
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
      const l = Object.keys(n), u = P.find(l, (a) => this.isOS(a));
      if (u) {
        const a = this.satisfies(n[u]);
        if (a !== void 0)
          return a;
      }
      const c = P.find(
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
      const l = Object.keys(i), u = P.find(l, (c) => this.isBrowser(c, !0));
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
    const s = P.getBrowserTypeByAlias(i);
    return n && s && (i = s.toLowerCase()), i === r;
  }
  compareVersion(e) {
    let n = [0], r = e, i = !1;
    const s = this.getBrowserVersion();
    if (typeof s == "string")
      return e[0] === ">" || e[0] === "<" ? (r = e.substr(1), e[1] === "=" ? (i = !0, r = e.substr(2)) : n = [], e[0] === ">" ? n.push(1) : n.push(-1)) : e[0] === "=" ? r = e.substr(1) : e[0] === "~" && (i = !0, r = e.substr(1)), n.indexOf(
        P.compareVersions(s, r, i)
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
class tw {
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
    return new hl(e, n);
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
    return new hl(e).getResult();
  }
  static get BROWSER_MAP() {
    return oa;
  }
  static get ENGINE_MAP() {
    return Je;
  }
  static get OS_MAP() {
    return Gt;
  }
  static get PLATFORMS_MAP() {
    return Rt;
  }
}
const ew = /* @__PURE__ */ Ls({
  __name: "GraphComponent",
  setup(t, { expose: e }) {
    const n = ns(() => {
      const d = document.querySelectorAll("graph-component");
      let b;
      for (let m = 0; m < d.length; m++) {
        const T = d[m], M = xt(T.shadowRoot);
        let O;
        if (M.empty() ? O = xt(
          ".graph-controller__graph-host.uninitialised"
        ) : O = M.select(
          ".graph-controller__graph-host.uninitialised"
        ), !O.empty()) {
          O.classed("uninitialised", !1), b = O;
          break;
        }
      }
      return b === void 0 && (b = xt(
        ".graph-controller__graph-host.uninitialised"
      ), b.classed("uninitialised", !1)), b;
    }), r = ns(() => {
      let d = n.value.node().parentElement;
      d || (d = n.value.node().getRootNode().host);
      let b = d.getAttribute("id");
      return b || "gc";
    });
    Ul(() => {
      $(), window.addEventListener("resize", to);
    }), Ps(() => {
      window.removeEventListener("resize", to);
    });
    const s = tw.getParser(window.navigator.userAgent).getPlatformType(!0);
    let o = !1, l = { x: -1e5, y: -1e5 };
    const u = oo(new sl()), c = oo(!1), a = wi(new L0());
    let f, h = 400, g = 400, y, x, v, p, k, L, w, C, B, V = 0, U = 0, Q = 1, Z, st;
    e({
      setDefaults: ft,
      getGraph: K,
      setGraph: S,
      printGraph: G,
      deleteElement: N,
      setLabel: A,
      setColor: D,
      setNodeSizeDefault: X,
      setNodeSize: Y,
      setNodeShapeDefault: ut,
      setNodeShape: lt,
      setNodePropsDefault: Tt,
      setNodeProps: wt,
      setDeletable: yt,
      setLabelEditable: kt,
      setNodesLinkPermission: St,
      setNodesFixedPosition: Ct,
      setEditability: Yt,
      toggleNodeLabels: E,
      toggleLinkLabels: _,
      toggleZoom: R,
      toggleNodePhysics: ee,
      toggleFixedLinkDistance: Ke,
      toggleGraphEditingInGUI: F,
      resetView: Er,
      createNode: z,
      setNodeGroupsFn: I,
      modifyGraph: nt
    });
    function ft(d) {
      d.isGraphEditableInGUI !== void 0 && F(d.isGraphEditableInGUI), d.zoomEnabled !== void 0 && R(d.zoomEnabled), d.nodePhysicsEnabled !== void 0 && ee(d.nodePhysicsEnabled), d.fixedLinkDistanceEnabled !== void 0 && Ke(d.fixedLinkDistanceEnabled), d.showNodeLabels !== void 0 && E(d.showNodeLabels), d.showLinkLabels !== void 0 && _(d.showLinkLabels), a.nodeAutoResizeToLabelSize = d.nodeAutoResizeToLabelSize ?? a.nodeAutoResizeToLabelSize, a.nodeProps = d.nodeProps ?? a.nodeProps, et();
    }
    function K(d = "json", b = !0, m = !0, T = !0, M = !0, O = !0) {
      if (d.toLowerCase() === "json")
        return JSON.parse(
          u.value.toJSON(
            b,
            a.showNodeLabels,
            a.showLinkLabels,
            m,
            T,
            T,
            M,
            M,
            O
          )
        );
      if (d.toLowerCase() === "tgf")
        return u.value.toTGF(a.showNodeLabels, a.showLinkLabels, !0, !0);
      console.error('Invalid format while using getGraph(). Please choose "JSON" or "TGF".');
    }
    function S(d) {
      typeof d == "object" || typeof d == "string" ? wa(d) : eo();
    }
    function G(d = "json", b = !0, m = !0, T = !0, M = !0, O = !0) {
      d.toLowerCase() === "json" ? console.log(
        u.value.toJSON(
          b,
          a.showNodeLabels,
          a.showLinkLabels,
          m,
          T,
          T,
          M,
          M,
          O
        )
      ) : console.log(u.value.toTGF(a.showNodeLabels, a.showLinkLabels));
    }
    function N(d) {
      if (d !== void 0) {
        const [b, m] = _e(d);
        for (const T of b)
          k.filter((M) => M.id === T).each(function(M) {
            let O = u.value.removeNode(M);
            if (O !== void 0) {
              let [It, ye] = O;
              Or(It, n.value), ye.forEach((bt) => {
                un(bt, n.value);
              });
            }
          });
        for (const T of m)
          p.filter((M) => M.id === T).each(function(M) {
            let O = u.value.removeLink(M);
            O !== void 0 && un(O, n.value);
          });
      } else
        k.each(function(b) {
          let m = u.value.removeNode(b);
          if (m !== void 0) {
            let [T, M] = m;
            Or(T, n.value), M.forEach((O) => {
              un(O, n.value);
            });
          }
        }), p.each(function(b) {
          let m = u.value.removeLink(b);
          m !== void 0 && un(m, n.value);
        });
      c.value = u.value.nodes.length > 0, et();
    }
    function A(d, b) {
      if (b !== void 0) {
        const [m, T] = _e(b);
        for (const M of m)
          k.filter((O) => O.id === M).each((O) => {
            Dn(O, d);
          });
        for (const M of T)
          p.filter((O) => O.id === M).each((O) => {
            Dn(O, d);
          });
      } else
        k.each((m) => {
          Dn(m, d);
        }), p.each((m) => {
          Dn(m, d);
        });
    }
    function D(d, b) {
      if (b !== void 0) {
        const [m, T] = _e(b);
        Zs(T);
        for (const M of m)
          k.selectAll(".graph-controller__node").filter((O) => O.id === M).each((O) => O.color = d).style("fill", d);
        for (const M of T)
          p.selectAll(".graph-controller__link").filter((O) => O.id === M).each((O) => O.color = d).style("stroke", d);
      } else
        k.selectAll(".graph-controller__node").each((m) => m.color = d).style("fill", d), Zs(u.value.links.map((m) => m.id)), p.selectAll(".graph-controller__link").each((m) => m.color = d).style("stroke", d);
      ps(v, r.value, a, d), j || et();
    }
    function X(d, b) {
      typeof d == "number" && typeof b == "number" && a.nodeProps.shape === J.RECTANGLE ? a.nodeSize = { width: d, height: b } : typeof d == "number" ? a.nodeSize = { radius: d } : a.nodeProps.shape === J.CIRCLE && re(["radius"], Object.keys(d), !1) || a.nodeProps.shape === J.RECTANGLE && re(["width", "height"], Object.keys(d), !1) ? a.nodeSize = d : Ne(
        "Invalid Size Object",
        `For circular nodes: {radius: number}
For rectangular nodes: {width: number, height: number}`
      ), et();
    }
    function Y(d, b) {
      if (b !== void 0) {
        const [m] = _e(b);
        for (const T of m)
          k.filter((M) => M.id === T).each((M) => {
            (typeof d == "number" || M.props.shape === J.CIRCLE && re(["radius"], Object.keys(d), !0) || M.props.shape === J.RECTANGLE && re(["width", "height"], Object.keys(d), !0)) && M.setSize(d, a);
          });
      } else
        k.each((m) => {
          (typeof d == "number" || m.props.shape === J.CIRCLE && re(["radius"], Object.keys(d), !1) || m.props.shape === J.RECTANGLE && re(["width", "height"], Object.keys(d), !1)) && m.setSize(d, a);
        });
      et();
    }
    function lt(d, b) {
      if (b !== void 0) {
        const [m] = _e(b);
        for (const T of m)
          k.filter((M) => M.id === T).each((M) => {
            M.props.shape !== d && M.setShape(d, a);
          });
      } else
        k.each((m) => {
          m.props.shape !== d && m.setShape(d, a);
        });
      et();
    }
    function ut(d) {
      if (d === "circle") d = J.CIRCLE;
      else if (d === "rect") d = J.RECTANGLE;
      else {
        Ne("Invalid Shape", `For circular nodes: 'circle'
For rectangular nodes: 'rect'`);
        return;
      }
      let b = a.nodeSize;
      a.nodeProps.shape !== d && (d === J.CIRCLE ? a.nodeProps = {
        shape: d,
        radius: b.width / 2
      } : d === J.RECTANGLE && (a.nodeProps = {
        shape: d,
        width: b.radius * 2,
        height: b.radius,
        cornerRadius: 4,
        reflexiveEdgeStart: "MOVABLE"
      }), et());
    }
    function Tt(d) {
      if (re(["shape"], Object.keys(d), !1)) {
        if (d.shape === J.CIRCLE) {
          const b = ["shape", "radius"];
          re(b, Object.keys(d), !0) && (a.nodeProps = d), hn(b, Object.keys(d));
        } else if (d.shape === J.RECTANGLE) {
          const b = [
            "shape",
            "width",
            "height",
            "cornerRadius",
            "reflexiveEdgeStart"
          ];
          re(b, Object.keys(d), !0) && (Object.values(ht).includes(d.reflexiveEdgeStart) || d.reflexiveEdgeStart === "MOVABLE" ? a.nodeProps = d : Ne(
            "Invalid reflexiveEdgeStart Value",
            "Use RIGHT, BOTTOMRIGHT, BOTTOM, BOTTOMLEFT, LEFT, TOPLEFT, TOP, TOPRIGHT or MOVABLE."
          )), hn(b, Object.keys(d));
        }
        et();
      } else
        Ne(
          "Invalid NodeProps Object",
          `For circular nodes: {shape: NodeShape, radius: number}
For rectangular nodes: {shape: 'rect', width: number, height: number, cornerRadius: number, reflexiveEdgeStart: SideType | 'MOVABLE'}`
        );
    }
    function wt(d, b) {
      if (re(["shape"], Object.keys(d), !1)) {
        let m;
        if (b !== void 0 ? [m] = _e(b) : m = void 0, d.shape === J.CIRCLE) {
          const T = ["shape", "radius"];
          if (re(T, Object.keys(d), !0))
            if (m !== void 0)
              for (const M of m)
                k.filter((O) => O.id === M).each((O) => {
                  O.props = d;
                });
            else
              k.each((M) => {
                M.props = d;
              });
          hn(T, Object.keys(d));
        } else if (d.shape === J.RECTANGLE) {
          const T = [
            "shape",
            "width",
            "height",
            "cornerRadius",
            "reflexiveEdgeStart"
          ];
          if (re(T, Object.keys(d), !0)) {
            if (Object.values(ht).includes(d.reflexiveEdgeStart) || d.reflexiveEdgeStart === "MOVABLE")
              if (m !== void 0)
                for (const M of m)
                  k.filter((O) => O.id === M).each((O) => {
                    O.props = d;
                  });
              else
                k.each((M) => {
                  M.props = d;
                });
          } else
            Ne(
              "Invalid reflexiveEdgeStart Value",
              "Use RIGHT, BOTTOMRIGHT, BOTTOM, BOTTOMLEFT, LEFT, TOPLEFT, TOP, TOPRIGHT or MOVABLE."
            );
          hn(T, Object.keys(d));
        }
        et();
      } else
        Ne(
          "Invalid NodeProps Object",
          `For circular nodes: {shape: NodeShape, radius: number}
For rectangular nodes: {shape: 'rect', width: number, height: number, cornerRadius: number, reflexiveEdgeStart: SideType | 'MOVABLE'}`
        );
    }
    function yt(d, b) {
      if (b !== void 0) {
        const [m, T] = _e(b);
        for (const M of m)
          k.filter((O) => O.id === M).each((O) => {
            O.deletable = d;
          });
        for (const M of T)
          p.filter((O) => O.id === M).each((O) => {
            O.deletable = d;
          });
      } else
        k.each((m) => {
          m.deletable = d;
        }), p.each((m) => {
          m.deletable = d;
        });
    }
    function kt(d, b) {
      if (b !== void 0) {
        const [m, T] = _e(b);
        for (const M of m)
          k.filter((O) => O.id === M).each((O) => {
            O.labelEditable = d;
          });
        for (const M of T)
          p.filter((O) => O.id === M).each((O) => {
            O.labelEditable = d;
          });
      } else
        k.each((m) => {
          m.labelEditable = d;
        }), p.each((m) => {
          m.labelEditable = d;
        });
    }
    function St(d, b, m) {
      if (m !== void 0) {
        const [T] = _e(m);
        for (const M of T)
          k.filter((O) => O.id === M).each((O) => {
            O.allowIncomingLinks = d, O.allowOutgoingLinks = b;
          });
      } else
        k.each((T) => {
          T.allowIncomingLinks = d, T.allowOutgoingLinks = b;
        });
    }
    function Ct(d, b) {
      if (b !== void 0) {
        const [m] = _e(b);
        for (const T of m)
          k.filter((M) => M.id === T).each((M) => {
            Ir(M, d);
          });
      } else
        k.each((m) => {
          Ir(m, d);
        });
    }
    function Yt(d, b) {
      const m = [
        "fixedPosition",
        "deletable",
        "labelEditable",
        "allowIncomingLinks",
        "allowOutgoingLinks"
      ], T = ["deletable", "labelEditable"];
      if (b !== void 0) {
        const [M, O] = _e(b), It = M.length === 0;
        for (const ye of M)
          k.filter((bt) => bt.id === ye).each(function(bt) {
            bt.deletable = d.deletable ?? bt.deletable, bt.labelEditable = d.labelEditable ?? bt.labelEditable, "fixedPosition" in d && Ir(bt, d.fixedPosition), "allowIncomingLinks" in d && (bt.allowIncomingLinks = d.allowIncomingLinks ?? bt.allowIncomingLinks), "allowOutgoingLinks" in d && (bt.allowOutgoingLinks = d.allowOutgoingLinks ?? bt.allowOutgoingLinks);
          });
        for (const ye of O)
          p.selectAll(".graph-controller__link").filter((bt) => bt.id === ye).each(function(bt) {
            bt.deletable = d.deletable ?? bt.deletable, bt.labelEditable = d.labelEditable ?? bt.labelEditable;
          });
        hn(
          It ? T : m,
          Object.keys(d)
        );
      } else
        k.each(function(M) {
          M.deletable = d.deletable ?? M.deletable, M.labelEditable = d.labelEditable ?? M.labelEditable, "fixedPosition" in d && Ir(M, d.fixedPosition), "allowIncomingLinks" in d && (M.allowIncomingLinks = d.allowIncomingLinks ?? M.allowIncomingLinks), "allowOutgoingLinks" in d && (M.allowOutgoingLinks = d.allowOutgoingLinks ?? M.allowOutgoingLinks);
        }), p.selectAll(".graph-controller__link").each(function(M) {
          M.deletable = d.deletable ?? M.deletable, M.labelEditable = d.labelEditable ?? M.labelEditable;
        }), hn(m, Object.keys(d));
      et();
    }
    function ee(d) {
      a.nodePhysicsEnabled = d, Zu(f, d, h, g);
    }
    function Ke(d) {
      a.fixedLinkDistanceEnabled = d, ta(f, u.value, a, d);
    }
    function _(d) {
      a.showLinkLabels = d;
    }
    function E(d) {
      a.showNodeLabels = d;
    }
    function R(d) {
      a.zoomEnabled = d, Er();
    }
    function F(d) {
      a.isGraphEditableInGUI = d;
    }
    function I(d) {
      a.nodeGroupsFn = d;
    }
    function $() {
      h = n.value.node().clientWidth, g = n.value.node().clientHeight, y = N0(
        (d) => q(d, a.zoomEnabled),
        a.zoomEnabled
      ), v = j0(
        n.value,
        y,
        (d) => a.isGraphEditableInGUI ? la(d) : null,
        (d) => a.isGraphEditableInGUI ? jn(d) : null,
        (d) => {
          a.isGraphEditableInGUI && z(
            { ...a.nodeProps },
            de(d, v.node())[0],
            de(d, v.node())[1]
          );
        }
      ), H0(v, r.value, a, u.value.getNonDefaultLinkColors()), L = q0(r.value, v), p = D0(v), k = V0(v), f = om(u.value, a, h, g, () => W()), x = F0(f, h, g, a), et();
    }
    function q(d, b = !0) {
      b && (V = d.transform.x, U = d.transform.y, Q = d.transform.k, v.attr("transform", `translate(${V},${U})scale(${Q})`));
    }
    function H(d, b, m, T, M = !0, O = !0) {
      let It = u.value.createLink(
        d.id,
        b.id,
        m,
        T,
        M,
        O
      );
      It !== void 0 && O0(It, n.value), et();
    }
    function z(d, b, m, T, M, O, It = { x: !1, y: !1 }, ye = !0, bt = !0, Ti = !0, _a = !0) {
      let va = u.value.createNode(
        d,
        b ?? h / 2,
        m ?? g / 2,
        T,
        M,
        O,
        It,
        ye,
        bt,
        Ti,
        _a
      );
      P0(va, n.value), Xn(f, u.value), c.value = !0;
    }
    let j = !1;
    function nt(d) {
      try {
        j = !0, d(On(u));
      } finally {
        j = !1;
      }
      c.value = u.value.nodes.length > 0, Xn(f, u.value), et();
    }
    function W() {
      k.attr("transform", (d) => `translate(${d.x},${d.y})`), p.selectAll(".graph-controller__link, .graph-controller__link-click-box").attr("d", (d) => (tt(d), Bm(d, h, g, a))), ne();
    }
    function tt(d) {
      let b = d.pathType;
      d.pathType = Dm(d.source, d.target, u.value), b !== d.pathType && et();
    }
    function it() {
      const d = w, b = xt(
        n.value.node().querySelector(`#${r.value + "-node-" + d.id}`)
      ).classed("on-deletion");
      if (d !== void 0 && !b) {
        const m = C;
        m !== void 0 ? L.attr("d", () => d.id === m.id ? ia(d, [h / 2, g / 2], a) : u.value.hasBidirectionalConnection(d, m) ? ir(d, m, a) : gs(d, m, a)) : B !== void 0 && L.attr(
          "d",
          ir(d, { x: B[0], y: B[1] }, a)
        );
      }
    }
    function et(d = 0.5) {
      var b;
      p = p.data(u.value.links, (m) => m.id).join((m) => {
        const T = m.append("g").classed("graph-controller__link-container", !0);
        return T.append("path").classed("graph-controller__link", !0).style("stroke", (M) => M.color ? M.color : "").attr("id", (M) => r.value + "-link-" + M.id), T.append("path").classed("graph-controller__link-click-box", !0).on("dblclick", (M) => {
          se(M);
        }).on("pointerout", (M) => ua(M)).on("pointerdown", (M, O) => {
          $0(O, M.button, n.value), a.isGraphEditableInGUI && ca(M, O);
        }).on("pointerup", (M, O) => {
          aa(M, O);
        }), T.append("text").attr("class", (M) => {
          var O;
          return `graph-controller__${(O = M.pathType) == null ? void 0 : O.toLowerCase()}-path-text`;
        }).append("textPath").attr(
          "class",
          (M) => M.label ? "graph-controller__link-label" : "graph-controller__link-label-placeholder"
        ).attr("href", (M) => `#${r.value + "-link-" + M.id}`).text((M) => M.label ? M.label : "add label").on("click", (M, O) => {
          a.isGraphEditableInGUI && Ys(M, O);
        }).on("dblclick", (M) => {
          se(M);
        }), T.append("foreignObject").classed("graph-controller__link-label-mathjax-container", !0).attr("xmlns", "http://www.w3.org/2000/svg").attr("width", 1).attr("height", 1).html(
          (M) => `<div class='${M.label ? "graph-controller__link-label" : "graph-controller__link-label-placeholder"}'>
                        </div>`
        ).on("click", (M, O) => {
          a.isGraphEditableInGUI && Ys(M, O);
        }).on("dblclick", (M) => {
          se(M);
        }), T;
      }), p.selectChild(".graph-controller__link").attr("marker-start", function(m) {
        var T;
        if ((T = m.pathType) != null && T.includes("REVERSE")) {
          let M = `url(#${r.value}-link-arrow-reverse`;
          return m.color && (M += "-" + gr(m.color)), M += ")", M;
        } else
          return null;
      }).attr("marker-end", function(m) {
        var T;
        if ((T = m.pathType) != null && T.includes("REVERSE"))
          return null;
        {
          let M = `url(#${r.value}-link-arrow`;
          return m.color && (M += "-" + gr(m.color)), M += ")", M;
        }
      }).style("display", "none").each(function() {
        this.getBBox();
      }).style("display", null), p.selectChild("text").attr("class", (m) => {
        var T;
        return `graph-controller__${(T = m.pathType) == null ? void 0 : T.toLowerCase()}-path-text`;
      }).attr("dy", (m) => {
        var T;
        return m.pathType === le.REFLEXIVE ? 15 : m.pathType == le.LINEREVERSE ? -10 : (T = m.pathType) != null && T.includes("REVERSE") ? 20 : -10;
      }).selectChild("textPath").attr(
        "class",
        (m) => m.label ? "graph-controller__link-label" : "graph-controller__link-label-placeholder"
      ).classed("hidden", (m) => !a.showLinkLabels || !m.label && !m.labelEditable).classed("not-editable", !a.isGraphEditableInGUI).attr("startOffset", (m) => {
        var T;
        return (T = m.pathType) != null && T.includes("REVERSE") ? "46%" : "50%";
      }).text((m) => m.label ? m.label : "add label"), k = k.data(u.value.nodes, (m) => m.id).join(
        (m) => {
          const T = m.append("g").classed("graph-controller__node-container", !0).call(x).on("dblclick", (M) => {
            se(M);
          }).on("pointerenter", (M, O) => Ks(O)).on("pointerout", (M, O) => Xs(O)).on("pointerdown", (M, O) => {
            I0(O, M.button, n.value), l = { x: M.x, y: M.y }, a.isGraphEditableInGUI && rn(M, O);
          }).on("pointerup", (M, O) => {
            a.isGraphEditableInGUI && jn(M, O);
          });
          return Ot(T);
        },
        (m) => (m.each(function(T) {
          const M = xt(this), O = M.selectChild(".graph-controller__node").node();
          mt(T, O) ? (dt(O, M), Xn(f, u.value)) : At(M);
        }), m)
      ), k.selectChild("foreignObject").selectChild("div").attr("class", (m) => m.label ? a.nodeAutoResizeToLabelSize ? "graph-controller__node-label controls-node-size" : "graph-controller__node-label" : "graph-controller__node-label-placeholder").classed("hidden", (m) => !a.showNodeLabels || !m.label && !m.labelEditable).classed("not-editable", !a.isGraphEditableInGUI).text((m) => m.label ? m.label : "add label"), (b = window.MathJax) != null && b.version && window.MathJax.typesetPromise().then(() => {
        fe();
      }), a.nodeAutoResizeToLabelSize, f.nodes(u.value.nodes), f.alpha(d).restart();
    }
    function mt(d, b) {
      return d.props.shape === J.CIRCLE && b.tagName !== "circle" || d.props.shape === J.RECTANGLE && b.tagName !== "rect";
    }
    function dt(d, b) {
      d.remove(), b.selectChild(".graph-controller__node-label-container").remove(), Ot(b);
    }
    function Ot(d) {
      d.filter((m) => m.props.shape === J.CIRCLE).append(J.CIRCLE).classed("graph-controller__node", !0).attr("id", (m) => `${r.value + "-node-" + m.id}`).attr("r", (m) => m.props.radius).style("fill", (m) => m.color ? m.color : ""), d.filter((m) => m.props.shape === J.RECTANGLE).append(J.RECTANGLE).classed("graph-controller__node", !0).attr("id", (m) => `${r.value + "-node-" + m.id}`).attr("width", (m) => m.props.width).attr("height", (m) => m.props.height).attr("x", (m) => -0.5 * m.props.width).attr("y", (m) => -0.5 * m.props.height).attr("rx", (m) => m.props.cornerRadius).attr("ry", (m) => m.props.cornerRadius).style("fill", (m) => m.color ? m.color : "");
      const b = d.append("foreignObject").classed("graph-controller__node-label-container", !0).attr("xmlns", "http://www.w3.org/2000/svg");
      return b.filter((m) => m.props.shape === J.CIRCLE).attr("width", (m) => 2 * m.props.radius).attr("height", (m) => 2 * m.props.radius).attr("x", (m) => -m.props.radius).attr("y", (m) => -m.props.radius), b.filter((m) => m.props.shape === J.RECTANGLE).attr("width", (m) => m.props.width).attr("height", (m) => m.props.height).attr("x", (m) => -0.5 * m.props.width).attr("y", (m) => -0.5 * m.props.height), b.append("xhtml:div").on("click", (m, T) => {
        a.isGraphEditableInGUI && pa(m, T);
      }).on("dblclick", (m) => {
        se(m);
      }).on("pointerenter", (m, T) => Ks(T)).on("pointerout", (m, T) => Xs(T)), d;
    }
    function At(d) {
      d.selectChild(".graph-controller__node").filter((b) => b.props.shape === J.CIRCLE).attr("r", (b) => b.props.radius), d.filter((b) => b.props.shape === J.CIRCLE).selectChild(".graph-controller__node-label-container").attr("width", (b) => 2 * b.props.radius).attr("height", (b) => 2 * b.props.radius).attr("x", (b) => -b.props.radius).attr("y", (b) => -b.props.radius), d.selectChild(".graph-controller__node").filter((b) => b.props.shape === J.RECTANGLE).attr("width", (b) => {
        var m;
        return (m = b.props) == null ? void 0 : m.width;
      }).attr("height", (b) => {
        var m;
        return (m = b.props) == null ? void 0 : m.height;
      }).attr("x", (b) => -0.5 * b.props.width).attr("y", (b) => -0.5 * b.props.height).attr("rx", (b) => {
        var m;
        return (m = b.props) == null ? void 0 : m.cornerRadius;
      }).attr("ry", (b) => {
        var m;
        return (m = b.props) == null ? void 0 : m.cornerRadius;
      }), d.filter((b) => b.props.shape === J.RECTANGLE).selectChild(".graph-controller__node-label-container").attr("width", (b) => {
        var m;
        return (m = b.props) == null ? void 0 : m.width;
      }).attr("height", (b) => {
        var m;
        return (m = b.props) == null ? void 0 : m.height;
      }).attr("x", (b) => -0.5 * b.props.width).attr("y", (b) => -0.5 * b.props.height);
    }
    function fe() {
      p.selectChild("text").selectChild("textPath").selectChild("mjx-container").each(function(d) {
        const b = this, m = d, T = xt(b.parentNode.parentNode.parentNode).selectChild("foreignObject").selectChild("div").attr("class", "graph-controller__link-label").classed(
          "hidden",
          !a.showLinkLabels || !m.label && !m.labelEditable
        ).node();
        T.replaceChild(b, T.childNodes[0]);
      }), p.selectChild("text").selectChild("textPath").each(function() {
        const d = this;
        let b = !1;
        d.childNodes.forEach((T) => {
          var M;
          (T == null ? void 0 : T.nodeType) === Node.TEXT_NODE && ((M = T == null ? void 0 : T.textContent) == null ? void 0 : M.trim()) !== "" && (b = !0);
        }), b || xt(d).text("I").attr("class", "graph-controller__link-label-placeholder mjx-hidden");
      }), ne();
    }
    function ne() {
      p.selectChild("text").selectChild("textPath").each(function() {
        const d = this, [b, m] = Qs(d);
        xt(d.parentNode.parentNode).select("foreignObject").attr("x", b).attr("y", m);
      });
    }
    function rn(d, b) {
      (d.button === 2 || d.pointerType === "touch") && (il(d), b.allowOutgoingLinks && he(b), b.deletable && (Z = setTimeout(() => {
        C = void 0, br(b);
      }, 250)));
    }
    function br(d) {
      let b = n.value.node().querySelector(`#${r.value + "-node-" + d.id}`);
      xt(b).classed("on-deletion", !0);
      let m = xt(b.parentElement);
      if (d.props.shape === J.CIRCLE) {
        let T = m0().outerRadius(d.props.radius + 4).innerRadius(d.props.radius), M = [{ startAngle: 0, endAngle: 0 }];
        m.append("g").attr("class", "arc").selectAll("path.arc").data(M).enter().append("path").attr("class", "arc").style("fill", "black").style("opacity", 0.7).transition().duration(750).ease(Jo).attrTween("d", function(It) {
          let ye = { startAngle: 0, endAngle: 2 * Math.PI }, bt = Vs(It, ye);
          return function(Ti) {
            return T(bt(Ti));
          };
        }).on("end", () => Ft(d));
      } else if (d.props.shape === J.RECTANGLE) {
        const T = G0(
          d.props.width,
          d.props.height,
          d.props.cornerRadius
        );
        let M = m.append("path").attr("fill", "none").attr("stroke", "black").attr("stroke-width", 4).attr("opacity", "0.7").attr("d", T), O = 2 * d.props.width + 2 * d.props.height;
        M.attr("stroke-dasharray", O).attr("stroke-dashoffset", O).transition().duration(750).ease(Jo).attr("stroke-dashoffset", 0).on("end", () => Ft(d));
      }
    }
    function Ft(d) {
      if (a.isGraphEditableInGUI) {
        let b = u.value.removeNode(d);
        if (b !== void 0) {
          let [m, T] = b;
          Or(m, n.value), T.forEach((M) => {
            un(M, n.value);
          }), Xn(f, u.value);
        }
        c.value = u.value.nodes.length > 0, xr(), et();
      }
    }
    function he(d) {
      B = [d.x, d.y], w = d, L.classed("hidden", !1).attr("d", ir(d, { x: B[0], y: B[1] }, a));
    }
    function jn(d, b = void 0) {
      se(d), clearTimeout(Z), b && Bn(b), d.pointerType === "mouse" || (d.pointerType === "touch" || d.pointerType === "pen") && !z0(
        { x: l.x, y: l.y },
        { x: d.x, y: d.y }
      ) ? Us() : xr();
    }
    function Bn(d) {
      let b = n.value.node().querySelector(`#${r.value + "-node-" + d.id}`), m = xt(b), T = xt(b.parentElement);
      d.props.shape === J.CIRCLE ? (m.classed("on-deletion", !1), T.select("g.arc").select("path.arc").interrupt().remove(), T.select("g.arc").remove()) : d.props.shape === J.RECTANGLE && (m.classed("on-deletion") && T.select("path").attr("stroke-dasharray", 2 * d.props.width + 2 * d.props.height).attr("stroke-dashoffset", 0).transition().attr("stroke-dashoffset", 2 * d.props.width + 2 * d.props.height).on("end", () => {
        T.select("path").remove();
      }), m.classed("on-deletion", !1));
    }
    function Us() {
      const d = w, b = C;
      xr(), !(d === void 0 || b === void 0) && H(d, b);
    }
    function la(d) {
      if (se(d), w !== void 0) {
        const b = $d(d, n.value.node())[0];
        B = [(b[0] - V) / Q, (b[1] - U) / Q], it();
      }
    }
    function Ks(d) {
      d.allowIncomingLinks && (C = d);
    }
    function Xs(d) {
      d && Bn(d), C = void 0, clearTimeout(Z);
    }
    function ua(d) {
      se(d), clearTimeout(st);
    }
    function aa(d, b) {
      se(d), clearTimeout(st), (d.button === 2 || d.pointerType === "touch") && b.deletable && da(b);
    }
    function ca(d, b) {
      (d.button === 2 || d.pointerType === "touch") && (il(d), b.deletable && (st = setTimeout(() => {
        fa(b);
      }, 250)));
    }
    function fa(d) {
      let b = n.value.node().querySelector(`#${r.value + "-link-" + d.id}`);
      if (xt(b).classed("on-deletion", !0), b instanceof SVGPathElement) {
        let m = xt(b), T = b.getTotalLength(), M = b.parentElement.querySelector("text"), O = Array.from(M.classList).some(
          (bt) => bt.includes("reverse")
        ), It = 0, ye = O ? T : -T;
        m.attr("stroke-dasharray", T).attr("stroke-dashoffset", It).transition().duration(750).attr("stroke-dashoffset", ye).on("end", () => ha(d));
      }
    }
    function ha(d) {
      let b = d.color;
      if (a.isGraphEditableInGUI) {
        let m = u.value.removeLink(d);
        m !== void 0 && un(m, n.value), b && (u.value.hasNonDefaultLinkColor(b) || Wi(v, r.value, b));
      }
      et();
    }
    function da(d) {
      let b = n.value.node().querySelector(`#${r.value + "-link-" + d.id}`);
      if (xt(b).classed("on-deletion") && b instanceof SVGPathElement) {
        let m = xt(b), T = b.getTotalLength();
        m.attr("stroke-dasharray", T).attr("stroke-dashoffset", T).transition().attr("stroke-dashoffset", 0).on("end", () => {
          m.attr("stroke-dasharray", null).attr("stroke-dashoffset", null);
        });
      }
      xt(b).classed("on-deletion", !1);
    }
    function pa(d, b) {
      se(d), b.labelEditable && Js(b, [b.x, b.y]);
    }
    function Ys(d, b) {
      if (b.labelEditable) {
        let m = d.target, T;
        m.nodeName === "textPath" ? T = m : T = m.closest(".graph-controller__link-container").querySelector("textPath");
        let M = Qs(T);
        Js(b, M);
      }
    }
    function Js(d, b) {
      let m = d instanceof ui ? "node" : "link";
      const T = document.createElement("input");
      T.setAttribute("class", "graph-controller__label-input"), T.setAttribute("id", `${m}-label-input-field`), d.label == null ? T.value = "" : T.value = d.label, T.placeholder = `Enter ${m} label`;
      const M = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
      M.setAttribute("width", "100%"), M.setAttribute("height", "100%"), M.setAttribute("x", `${b[0] - 90}`), M.setAttribute("y", `${b[1] - 12}`), M.append(T), n.value.select("svg").select("g").node().append(M), T.focus(), s !== "desktop" && (o = !0), T.ondblclick = function(It) {
        se(It);
      };
      let O = !1;
      T.onkeyup = function(It) {
        It.key === "Enter" ? (O = !0, T.blur()) : It.key === "Escape" && (T.value = "", T.blur());
      }, T.onblur = function() {
        O && Dn(d, T.value.trim()), M.remove(), s !== "desktop" && (o = !1);
      };
    }
    function Dn(d, b) {
      A0(d, b, n.value), d.label = b, et();
      let m = d instanceof ui ? "node" : "link";
      m === "link" ? ga(d) : m === "node" && b !== "" && ma(d);
    }
    function ga(d) {
      var m;
      const b = n.value.node().querySelector(
        `#${r.value + "-link-" + d.id}`
      ).parentElement;
      (m = b.querySelector("mjx-container")) == null || m.remove(), b.querySelector("div").setAttribute("class", "graph-controller__link-label-placeholder"), et();
    }
    function ma(d) {
      const b = n.value.node().querySelector(`#${r.value + "-node-" + d.id}`).parentElement;
      if (b) {
        const m = b.parentElement, T = b.nextSibling;
        b.remove(), m.insertBefore(b, T);
      }
    }
    function Qs(d) {
      let b = n.value.select("svg").node().getBoundingClientRect(), m = d.getBoundingClientRect(), T = (m.x - b.x - V) / Q, M = (m.y - b.y - U) / Q;
      return [T, M];
    }
    function xr() {
      L == null || L.classed("hidden", !0), w = void 0, C = void 0, B = void 0;
    }
    function wa(d) {
      let b, m;
      try {
        if (typeof d == "string")
          [b, m] = Um(d);
        else if (typeof d == "object")
          [b, m] = Km(d);
        else {
          Ne("Invalid graph import type:", "Must either be TGF or JSON.");
          return;
        }
      } catch (T) {
        Ne("Error during parsing:", `Invalid data format:
` + T);
        return;
      }
      eo(), ya(b, m);
    }
    function ya(d, b) {
      for (let T of d)
        z(
          T.props ?? a.nodeProps,
          T.x,
          T.y,
          T.idImported,
          T.label,
          T.color,
          T.fixedPosition,
          T.deletable,
          T.labelEditable,
          T.allowIncomingLinks,
          T.allowOutgoingLinks
        );
      const m = (T) => u.value.nodes.find((M) => M.idImported === T);
      for (let T of b) {
        let M = m(T.sourceIdImported), O = m(T.targetIdImported);
        M && O && (H(
          M,
          O,
          T.label,
          T.color,
          T.deletable,
          T.labelEditable
        ), T.color && ps(v, r.value, a, T.color));
      }
    }
    function Zs(d) {
      for (let b of d) {
        const m = u.value.links.filter((T) => T.id === b).map((T) => T.color).shift();
        m && (u.value.hasNonDefaultLinkColor(m, b) ? u.value.getLinkIdsWithNonDefaultLinkColors(
          m,
          b
        ).every(
          (O) => d.includes(O)
        ) && Wi(v, r.value, m) : Wi(v, r.value, m));
      }
    }
    function Er() {
      f.stop(), n.value.selectChildren().remove(), y = void 0, V = 0, U = 0, Q = 1, v = void 0, L = void 0, p = void 0, k = void 0, f = void 0, xr(), $();
    }
    function to() {
      a.isCanvasBoundToView && (o || Er());
    }
    function eo() {
      u.value.links.forEach((d) => un(d, n.value)), u.value.nodes.forEach((d) => Or(d, n.value)), u.value = new sl(), c.value = !1, Er();
    }
    return (d, b) => (Xe(), Ye(pe, null, [
      b[0] || (b[0] = oe("div", { class: "graph-controller__graph-host uninitialised" }, null, -1)),
      Fr(oe("div", null, [
        ze(Zf, {
          class: "graph-controller__info-text-background",
          "show-controls-graph": "",
          "show-latex-info": !0,
          "show-controls-environment": !1,
          "show-header": !0,
          "platform-type": On(s)
        }, null, 8, ["platform-type"])
      ], 512), [
        [Dr, !c.value]
      ])
    ], 64));
  }
});
customElements.define(
  "graph-component",
  // With LaTeX without ShadowRoot for MathJax to work
  /* @__PURE__ */ Df(ew, { shadowRoot: !1 })
  // With ShadowRoot without LaTeX
  // defineCustomElement(GraphEditor)
  /* for switching off the LaTeX control info background, in the graph editor template
  in the graph controls tag you can use :show-latex-info="true" */
);
