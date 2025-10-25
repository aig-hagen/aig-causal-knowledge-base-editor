var Nu = Object.defineProperty;
var Ru = (e, t, n) => t in e ? Nu(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var Ne = (e, t, n) => Ru(e, typeof t != "symbol" ? t + "" : t, n);
/**
* @vue/shared v3.5.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function _s(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const Ee = {}, Tn = [], Lt = () => {
}, _l = () => !1, pi = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), vs = (e) => e.startsWith("onUpdate:"), Ie = Object.assign, bs = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, Lu = Object.prototype.hasOwnProperty, we = (e, t) => Lu.call(e, t), le = Array.isArray, kn = (e) => gi(e) === "[object Map]", vl = (e) => gi(e) === "[object Set]", ce = (e) => typeof e == "function", Oe = (e) => typeof e == "string", nn = (e) => typeof e == "symbol", Ce = (e) => e !== null && typeof e == "object", bl = (e) => (Ce(e) || ce(e)) && ce(e.then) && ce(e.catch), xl = Object.prototype.toString, gi = (e) => xl.call(e), Pu = (e) => gi(e).slice(8, -1), mi = (e) => gi(e) === "[object Object]", xs = (e) => Oe(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Yn = /* @__PURE__ */ _s(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), wi = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, Ou = /-\w/g, Et = wi(
  (e) => e.replace(Ou, (t) => t.slice(1).toUpperCase())
), Iu = /\B([A-Z])/g, mt = wi(
  (e) => e.replace(Iu, "-$1").toLowerCase()
), El = wi((e) => e.charAt(0).toUpperCase() + e.slice(1)), Li = wi(
  (e) => e ? `on${El(e)}` : ""
), en = (e, t) => !Object.is(e, t), Pi = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, Sl = (e, t, n, r = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: r,
    value: n
  });
}, Au = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
}, ao = (e) => {
  const t = Oe(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
};
let uo;
const yi = () => uo || (uo = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Es(e) {
  if (le(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n], i = Oe(r) ? Bu(r) : Es(r);
      if (i)
        for (const s in i)
          t[s] = i[s];
    }
    return t;
  } else if (Oe(e) || Ce(e))
    return e;
}
const $u = /;(?![^(]*\))/g, Fu = /:([^]+)/, zu = /\/\*[^]*?\*\//g;
function Bu(e) {
  const t = {};
  return e.replace(zu, "").split($u).forEach((n) => {
    if (n) {
      const r = n.split(Fu);
      r.length > 1 && (t[r[0].trim()] = r[1].trim());
    }
  }), t;
}
function Ss(e) {
  let t = "";
  if (Oe(e))
    t = e;
  else if (le(e))
    for (let n = 0; n < e.length; n++) {
      const r = Ss(e[n]);
      r && (t += r + " ");
    }
  else if (Ce(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const ju = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Du = /* @__PURE__ */ _s(ju);
function Ml(e) {
  return !!e || e === "";
}
const Tl = (e) => !!(e && e.__v_isRef === !0), Ft = (e) => Oe(e) ? e : e == null ? "" : le(e) || Ce(e) && (e.toString === xl || !ce(e.toString)) ? Tl(e) ? Ft(e.value) : JSON.stringify(e, kl, 2) : String(e), kl = (e, t) => Tl(t) ? kl(e, t.value) : kn(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [r, i], s) => (n[Oi(r, s) + " =>"] = i, n),
    {}
  )
} : vl(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => Oi(n))
} : nn(t) ? Oi(t) : Ce(t) && !le(t) && !mi(t) ? String(t) : t, Oi = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    nn(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
/**
* @vue/reactivity v3.5.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let et;
class Gu {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.parent = et, !t && et && (this.index = (et.scopes || (et.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = !0;
      let t, n;
      if (this.scopes)
        for (t = 0, n = this.scopes.length; t < n; t++)
          this.scopes[t].pause();
      for (t = 0, n = this.effects.length; t < n; t++)
        this.effects[t].pause();
    }
  }
  /**
   * Resumes the effect scope, including all child scopes and effects.
   */
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1;
      let t, n;
      if (this.scopes)
        for (t = 0, n = this.scopes.length; t < n; t++)
          this.scopes[t].resume();
      for (t = 0, n = this.effects.length; t < n; t++)
        this.effects[t].resume();
    }
  }
  run(t) {
    if (this._active) {
      const n = et;
      try {
        return et = this, t();
      } finally {
        et = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = et, et = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    this._on > 0 && --this._on === 0 && (et = this.prevScope, this.prevScope = void 0);
  }
  stop(t) {
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
      if (!this.detached && this.parent && !t) {
        const i = this.parent.scopes.pop();
        i && i !== this && (this.parent.scopes[this.index] = i, i.index = this.index);
      }
      this.parent = void 0;
    }
  }
}
function Vu() {
  return et;
}
let Me;
const Ii = /* @__PURE__ */ new WeakSet();
class Cl {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, et && et.active && et.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Ii.has(this) && (Ii.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Rl(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, co(this), Ll(this);
    const t = Me, n = St;
    Me = this, St = !0;
    try {
      return this.fn();
    } finally {
      Pl(this), Me = t, St = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        ks(t);
      this.deps = this.depsTail = void 0, co(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Ii.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    Yi(this) && this.run();
  }
  get dirty() {
    return Yi(this);
  }
}
let Nl = 0, Jn, Qn;
function Rl(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = Qn, Qn = e;
    return;
  }
  e.next = Jn, Jn = e;
}
function Ms() {
  Nl++;
}
function Ts() {
  if (--Nl > 0)
    return;
  if (Qn) {
    let t = Qn;
    for (Qn = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; Jn; ) {
    let t = Jn;
    for (Jn = void 0; t; ) {
      const n = t.next;
      if (t.next = void 0, t.flags &= -9, t.flags & 1)
        try {
          t.trigger();
        } catch (r) {
          e || (e = r);
        }
      t = n;
    }
  }
  if (e) throw e;
}
function Ll(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Pl(e) {
  let t, n = e.depsTail, r = n;
  for (; r; ) {
    const i = r.prevDep;
    r.version === -1 ? (r === n && (n = i), ks(r), Hu(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = i;
  }
  e.deps = t, e.depsTail = n;
}
function Yi(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (Ol(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function Ol(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === sr) || (e.globalVersion = sr, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Yi(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = Me, r = St;
  Me = e, St = !0;
  try {
    Ll(e);
    const i = e.fn(e._value);
    (t.version === 0 || en(i, e._value)) && (e.flags |= 128, e._value = i, t.version++);
  } catch (i) {
    throw t.version++, i;
  } finally {
    Me = n, St = r, Pl(e), e.flags &= -3;
  }
}
function ks(e, t = !1) {
  const { dep: n, prevSub: r, nextSub: i } = e;
  if (r && (r.nextSub = i, e.prevSub = void 0), i && (i.prevSub = r, e.nextSub = void 0), n.subs === e && (n.subs = r, !r && n.computed)) {
    n.computed.flags &= -5;
    for (let s = n.computed.deps; s; s = s.nextDep)
      ks(s, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function Hu(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let St = !0;
const Il = [];
function Vt() {
  Il.push(St), St = !1;
}
function Ht() {
  const e = Il.pop();
  St = e === void 0 ? !0 : e;
}
function co(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = Me;
    Me = void 0;
    try {
      t();
    } finally {
      Me = n;
    }
  }
}
let sr = 0;
class qu {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Cs {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!Me || !St || Me === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== Me)
      n = this.activeLink = new qu(Me, this), Me.deps ? (n.prevDep = Me.depsTail, Me.depsTail.nextDep = n, Me.depsTail = n) : Me.deps = Me.depsTail = n, Al(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const r = n.nextDep;
      r.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = r), n.prevDep = Me.depsTail, n.nextDep = void 0, Me.depsTail.nextDep = n, Me.depsTail = n, Me.deps === n && (Me.deps = r);
    }
    return n;
  }
  trigger(t) {
    this.version++, sr++, this.notify(t);
  }
  notify(t) {
    Ms();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      Ts();
    }
  }
}
function Al(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let r = t.deps; r; r = r.nextDep)
        Al(r);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
  }
}
const Ji = /* @__PURE__ */ new WeakMap(), dn = Symbol(
  ""
), Qi = Symbol(
  ""
), or = Symbol(
  ""
);
function Be(e, t, n) {
  if (St && Me) {
    let r = Ji.get(e);
    r || Ji.set(e, r = /* @__PURE__ */ new Map());
    let i = r.get(n);
    i || (r.set(n, i = new Cs()), i.map = r, i.key = n), i.track();
  }
}
function Bt(e, t, n, r, i, s) {
  const o = Ji.get(e);
  if (!o) {
    sr++;
    return;
  }
  const l = (a) => {
    a && a.trigger();
  };
  if (Ms(), t === "clear")
    o.forEach(l);
  else {
    const a = le(e), c = a && xs(n);
    if (a && n === "length") {
      const u = Number(r);
      o.forEach((f, h) => {
        (h === "length" || h === or || !nn(h) && h >= u) && l(f);
      });
    } else
      switch ((n !== void 0 || o.has(void 0)) && l(o.get(n)), c && l(o.get(or)), t) {
        case "add":
          a ? c && l(o.get("length")) : (l(o.get(dn)), kn(e) && l(o.get(Qi)));
          break;
        case "delete":
          a || (l(o.get(dn)), kn(e) && l(o.get(Qi)));
          break;
        case "set":
          kn(e) && l(o.get(dn));
          break;
      }
  }
  Ts();
}
function wn(e) {
  const t = ye(e);
  return t === e ? t : (Be(t, "iterate", or), yt(e) ? t : t.map(Ae));
}
function _i(e) {
  return Be(e = ye(e), "iterate", or), e;
}
const Uu = {
  __proto__: null,
  [Symbol.iterator]() {
    return Ai(this, Symbol.iterator, Ae);
  },
  concat(...e) {
    return wn(this).concat(
      ...e.map((t) => le(t) ? wn(t) : t)
    );
  },
  entries() {
    return Ai(this, "entries", (e) => (e[1] = Ae(e[1]), e));
  },
  every(e, t) {
    return At(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return At(this, "filter", e, t, (n) => n.map(Ae), arguments);
  },
  find(e, t) {
    return At(this, "find", e, t, Ae, arguments);
  },
  findIndex(e, t) {
    return At(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return At(this, "findLast", e, t, Ae, arguments);
  },
  findLastIndex(e, t) {
    return At(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return At(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return $i(this, "includes", e);
  },
  indexOf(...e) {
    return $i(this, "indexOf", e);
  },
  join(e) {
    return wn(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return $i(this, "lastIndexOf", e);
  },
  map(e, t) {
    return At(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return Dn(this, "pop");
  },
  push(...e) {
    return Dn(this, "push", e);
  },
  reduce(e, ...t) {
    return fo(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return fo(this, "reduceRight", e, t);
  },
  shift() {
    return Dn(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return At(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return Dn(this, "splice", e);
  },
  toReversed() {
    return wn(this).toReversed();
  },
  toSorted(e) {
    return wn(this).toSorted(e);
  },
  toSpliced(...e) {
    return wn(this).toSpliced(...e);
  },
  unshift(...e) {
    return Dn(this, "unshift", e);
  },
  values() {
    return Ai(this, "values", Ae);
  }
};
function Ai(e, t, n) {
  const r = _i(e), i = r[t]();
  return r !== e && !yt(e) && (i._next = i.next, i.next = () => {
    const s = i._next();
    return s.value && (s.value = n(s.value)), s;
  }), i;
}
const Wu = Array.prototype;
function At(e, t, n, r, i, s) {
  const o = _i(e), l = o !== e && !yt(e), a = o[t];
  if (a !== Wu[t]) {
    const f = a.apply(e, s);
    return l ? Ae(f) : f;
  }
  let c = n;
  o !== e && (l ? c = function(f, h) {
    return n.call(this, Ae(f), h, e);
  } : n.length > 2 && (c = function(f, h) {
    return n.call(this, f, h, e);
  }));
  const u = a.call(o, c, r);
  return l && i ? i(u) : u;
}
function fo(e, t, n, r) {
  const i = _i(e);
  let s = n;
  return i !== e && (yt(e) ? n.length > 3 && (s = function(o, l, a) {
    return n.call(this, o, l, a, e);
  }) : s = function(o, l, a) {
    return n.call(this, o, Ae(l), a, e);
  }), i[t](s, ...r);
}
function $i(e, t, n) {
  const r = ye(e);
  Be(r, "iterate", or);
  const i = r[t](...n);
  return (i === -1 || i === !1) && Ls(n[0]) ? (n[0] = ye(n[0]), r[t](...n)) : i;
}
function Dn(e, t, n = []) {
  Vt(), Ms();
  const r = ye(e)[t].apply(e, n);
  return Ts(), Ht(), r;
}
const Ku = /* @__PURE__ */ _s("__proto__,__v_isRef,__isVue"), $l = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(nn)
);
function Xu(e) {
  nn(e) || (e = String(e));
  const t = ye(this);
  return Be(t, "has", e), t.hasOwnProperty(e);
}
class Fl {
  constructor(t = !1, n = !1) {
    this._isReadonly = t, this._isShallow = n;
  }
  get(t, n, r) {
    if (n === "__v_skip") return t.__v_skip;
    const i = this._isReadonly, s = this._isShallow;
    if (n === "__v_isReactive")
      return !i;
    if (n === "__v_isReadonly")
      return i;
    if (n === "__v_isShallow")
      return s;
    if (n === "__v_raw")
      return r === (i ? s ? sc : Dl : s ? jl : Bl).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(r) ? t : void 0;
    const o = le(t);
    if (!i) {
      let a;
      if (o && (a = Uu[n]))
        return a;
      if (n === "hasOwnProperty")
        return Xu;
    }
    const l = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      je(t) ? t : r
    );
    return (nn(n) ? $l.has(n) : Ku(n)) || (i || Be(t, "get", n), s) ? l : je(l) ? o && xs(n) ? l : l.value : Ce(l) ? i ? Gl(l) : vi(l) : l;
  }
}
class zl extends Fl {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, r, i) {
    let s = t[n];
    if (!this._isShallow) {
      const a = tn(s);
      if (!yt(r) && !tn(r) && (s = ye(s), r = ye(r)), !le(t) && je(s) && !je(r))
        return a || (s.value = r), !0;
    }
    const o = le(t) && xs(n) ? Number(n) < t.length : we(t, n), l = Reflect.set(
      t,
      n,
      r,
      je(t) ? t : i
    );
    return t === ye(i) && (o ? en(r, s) && Bt(t, "set", n, r) : Bt(t, "add", n, r)), l;
  }
  deleteProperty(t, n) {
    const r = we(t, n);
    t[n];
    const i = Reflect.deleteProperty(t, n);
    return i && r && Bt(t, "delete", n, void 0), i;
  }
  has(t, n) {
    const r = Reflect.has(t, n);
    return (!nn(n) || !$l.has(n)) && Be(t, "has", n), r;
  }
  ownKeys(t) {
    return Be(
      t,
      "iterate",
      le(t) ? "length" : dn
    ), Reflect.ownKeys(t);
  }
}
class Yu extends Fl {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return !0;
  }
  deleteProperty(t, n) {
    return !0;
  }
}
const Ju = /* @__PURE__ */ new zl(), Qu = /* @__PURE__ */ new Yu(), Zu = /* @__PURE__ */ new zl(!0);
const Zi = (e) => e, Tr = (e) => Reflect.getPrototypeOf(e);
function ec(e, t, n) {
  return function(...r) {
    const i = this.__v_raw, s = ye(i), o = kn(s), l = e === "entries" || e === Symbol.iterator && o, a = e === "keys" && o, c = i[e](...r), u = n ? Zi : t ? Xr : Ae;
    return !t && Be(
      s,
      "iterate",
      a ? Qi : dn
    ), {
      // iterator protocol
      next() {
        const { value: f, done: h } = c.next();
        return h ? { value: f, done: h } : {
          value: l ? [u(f[0]), u(f[1])] : u(f),
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
function kr(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function tc(e, t) {
  const n = {
    get(i) {
      const s = this.__v_raw, o = ye(s), l = ye(i);
      e || (en(i, l) && Be(o, "get", i), Be(o, "get", l));
      const { has: a } = Tr(o), c = t ? Zi : e ? Xr : Ae;
      if (a.call(o, i))
        return c(s.get(i));
      if (a.call(o, l))
        return c(s.get(l));
      s !== o && s.get(i);
    },
    get size() {
      const i = this.__v_raw;
      return !e && Be(ye(i), "iterate", dn), i.size;
    },
    has(i) {
      const s = this.__v_raw, o = ye(s), l = ye(i);
      return e || (en(i, l) && Be(o, "has", i), Be(o, "has", l)), i === l ? s.has(i) : s.has(i) || s.has(l);
    },
    forEach(i, s) {
      const o = this, l = o.__v_raw, a = ye(l), c = t ? Zi : e ? Xr : Ae;
      return !e && Be(a, "iterate", dn), l.forEach((u, f) => i.call(s, c(u), c(f), o));
    }
  };
  return Ie(
    n,
    e ? {
      add: kr("add"),
      set: kr("set"),
      delete: kr("delete"),
      clear: kr("clear")
    } : {
      add(i) {
        !t && !yt(i) && !tn(i) && (i = ye(i));
        const s = ye(this);
        return Tr(s).has.call(s, i) || (s.add(i), Bt(s, "add", i, i)), this;
      },
      set(i, s) {
        !t && !yt(s) && !tn(s) && (s = ye(s));
        const o = ye(this), { has: l, get: a } = Tr(o);
        let c = l.call(o, i);
        c || (i = ye(i), c = l.call(o, i));
        const u = a.call(o, i);
        return o.set(i, s), c ? en(s, u) && Bt(o, "set", i, s) : Bt(o, "add", i, s), this;
      },
      delete(i) {
        const s = ye(this), { has: o, get: l } = Tr(s);
        let a = o.call(s, i);
        a || (i = ye(i), a = o.call(s, i)), l && l.call(s, i);
        const c = s.delete(i);
        return a && Bt(s, "delete", i, void 0), c;
      },
      clear() {
        const i = ye(this), s = i.size !== 0, o = i.clear();
        return s && Bt(
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
    n[i] = ec(i, e, t);
  }), n;
}
function Ns(e, t) {
  const n = tc(e, t);
  return (r, i, s) => i === "__v_isReactive" ? !e : i === "__v_isReadonly" ? e : i === "__v_raw" ? r : Reflect.get(
    we(n, i) && i in r ? n : r,
    i,
    s
  );
}
const nc = {
  get: /* @__PURE__ */ Ns(!1, !1)
}, rc = {
  get: /* @__PURE__ */ Ns(!1, !0)
}, ic = {
  get: /* @__PURE__ */ Ns(!0, !1)
};
const Bl = /* @__PURE__ */ new WeakMap(), jl = /* @__PURE__ */ new WeakMap(), Dl = /* @__PURE__ */ new WeakMap(), sc = /* @__PURE__ */ new WeakMap();
function oc(e) {
  switch (e) {
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
function lc(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : oc(Pu(e));
}
function vi(e) {
  return tn(e) ? e : Rs(
    e,
    !1,
    Ju,
    nc,
    Bl
  );
}
function ac(e) {
  return Rs(
    e,
    !1,
    Zu,
    rc,
    jl
  );
}
function Gl(e) {
  return Rs(
    e,
    !0,
    Qu,
    ic,
    Dl
  );
}
function Rs(e, t, n, r, i) {
  if (!Ce(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const s = lc(e);
  if (s === 0)
    return e;
  const o = i.get(e);
  if (o)
    return o;
  const l = new Proxy(
    e,
    s === 2 ? r : n
  );
  return i.set(e, l), l;
}
function Cn(e) {
  return tn(e) ? Cn(e.__v_raw) : !!(e && e.__v_isReactive);
}
function tn(e) {
  return !!(e && e.__v_isReadonly);
}
function yt(e) {
  return !!(e && e.__v_isShallow);
}
function Ls(e) {
  return e ? !!e.__v_raw : !1;
}
function ye(e) {
  const t = e && e.__v_raw;
  return t ? ye(t) : e;
}
function uc(e) {
  return !we(e, "__v_skip") && Object.isExtensible(e) && Sl(e, "__v_skip", !0), e;
}
const Ae = (e) => Ce(e) ? vi(e) : e, Xr = (e) => Ce(e) ? Gl(e) : e;
function je(e) {
  return e ? e.__v_isRef === !0 : !1;
}
function ho(e) {
  return cc(e, !1);
}
function cc(e, t) {
  return je(e) ? e : new fc(e, t);
}
class fc {
  constructor(t, n) {
    this.dep = new Cs(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : ye(t), this._value = n ? t : Ae(t), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, r = this.__v_isShallow || yt(t) || tn(t);
    t = r ? t : ye(t), en(t, n) && (this._rawValue = t, this._value = r ? t : Ae(t), this.dep.trigger());
  }
}
function lr(e) {
  return je(e) ? e.value : e;
}
const hc = {
  get: (e, t, n) => t === "__v_raw" ? e : lr(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const i = e[t];
    return je(i) && !je(n) ? (i.value = n, !0) : Reflect.set(e, t, n, r);
  }
};
function Vl(e) {
  return Cn(e) ? e : new Proxy(e, hc);
}
class dc {
  constructor(t, n, r) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new Cs(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = sr - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = r;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    Me !== this)
      return Rl(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return Ol(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
function pc(e, t, n = !1) {
  let r, i;
  return ce(e) ? r = e : (r = e.get, i = e.set), new dc(r, i, n);
}
const Cr = {}, Yr = /* @__PURE__ */ new WeakMap();
let cn;
function gc(e, t = !1, n = cn) {
  if (n) {
    let r = Yr.get(n);
    r || Yr.set(n, r = []), r.push(e);
  }
}
function mc(e, t, n = Ee) {
  const { immediate: r, deep: i, once: s, scheduler: o, augmentJob: l, call: a } = n, c = (w) => i ? w : yt(w) || i === !1 || i === 0 ? jt(w, 1) : jt(w);
  let u, f, h, g, y = !1, x = !1;
  if (je(e) ? (f = () => e.value, y = yt(e)) : Cn(e) ? (f = () => c(e), y = !0) : le(e) ? (x = !0, y = e.some((w) => Cn(w) || yt(w)), f = () => e.map((w) => {
    if (je(w))
      return w.value;
    if (Cn(w))
      return c(w);
    if (ce(w))
      return a ? a(w, 2) : w();
  })) : ce(e) ? t ? f = a ? () => a(e, 2) : e : f = () => {
    if (h) {
      Vt();
      try {
        h();
      } finally {
        Ht();
      }
    }
    const w = cn;
    cn = u;
    try {
      return a ? a(e, 3, [g]) : e(g);
    } finally {
      cn = w;
    }
  } : f = Lt, t && i) {
    const w = f, C = i === !0 ? 1 / 0 : i;
    f = () => jt(w(), C);
  }
  const b = Vu(), p = () => {
    u.stop(), b && b.active && bs(b.effects, u);
  };
  if (s && t) {
    const w = t;
    t = (...C) => {
      w(...C), p();
    };
  }
  let k = x ? new Array(e.length).fill(Cr) : Cr;
  const P = (w) => {
    if (!(!(u.flags & 1) || !u.dirty && !w))
      if (t) {
        const C = u.run();
        if (i || y || (x ? C.some((B, G) => en(B, k[G])) : en(C, k))) {
          h && h();
          const B = cn;
          cn = u;
          try {
            const G = [
              C,
              // pass undefined as the old value when it's changed for the first time
              k === Cr ? void 0 : x && k[0] === Cr ? [] : k,
              g
            ];
            k = C, a ? a(t, 3, G) : (
              // @ts-expect-error
              t(...G)
            );
          } finally {
            cn = B;
          }
        }
      } else
        u.run();
  };
  return l && l(P), u = new Cl(f), u.scheduler = o ? () => o(P, !1) : P, g = (w) => gc(w, !1, u), h = u.onStop = () => {
    const w = Yr.get(u);
    if (w) {
      if (a)
        a(w, 4);
      else
        for (const C of w) C();
      Yr.delete(u);
    }
  }, t ? r ? P(!0) : k = u.run() : o ? o(P.bind(null, !0), !0) : u.run(), p.pause = u.pause.bind(u), p.resume = u.resume.bind(u), p.stop = p, p;
}
function jt(e, t = 1 / 0, n) {
  if (t <= 0 || !Ce(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t))
    return e;
  if (n.set(e, t), t--, je(e))
    jt(e.value, t, n);
  else if (le(e))
    for (let r = 0; r < e.length; r++)
      jt(e[r], t, n);
  else if (vl(e) || kn(e))
    e.forEach((r) => {
      jt(r, t, n);
    });
  else if (mi(e)) {
    for (const r in e)
      jt(e[r], t, n);
    for (const r of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, r) && jt(e[r], t, n);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function wr(e, t, n, r) {
  try {
    return r ? e(...r) : e();
  } catch (i) {
    bi(i, t, n);
  }
}
function Ot(e, t, n, r) {
  if (ce(e)) {
    const i = wr(e, t, n, r);
    return i && bl(i) && i.catch((s) => {
      bi(s, t, n);
    }), i;
  }
  if (le(e)) {
    const i = [];
    for (let s = 0; s < e.length; s++)
      i.push(Ot(e[s], t, n, r));
    return i;
  }
}
function bi(e, t, n, r = !0) {
  const i = t ? t.vnode : null, { errorHandler: s, throwUnhandledErrorInProduction: o } = t && t.appContext.config || Ee;
  if (t) {
    let l = t.parent;
    const a = t.proxy, c = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; l; ) {
      const u = l.ec;
      if (u) {
        for (let f = 0; f < u.length; f++)
          if (u[f](e, a, c) === !1)
            return;
      }
      l = l.parent;
    }
    if (s) {
      Vt(), wr(s, null, 10, [
        e,
        a,
        c
      ]), Ht();
      return;
    }
  }
  wc(e, n, i, r, o);
}
function wc(e, t, n, r = !0, i = !1) {
  if (i)
    throw e;
  console.error(e);
}
const Ue = [];
let Ct = -1;
const Nn = [];
let Qt = null, _n = 0;
const Hl = /* @__PURE__ */ Promise.resolve();
let Jr = null;
function ql(e) {
  const t = Jr || Hl;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function yc(e) {
  let t = Ct + 1, n = Ue.length;
  for (; t < n; ) {
    const r = t + n >>> 1, i = Ue[r], s = ar(i);
    s < e || s === e && i.flags & 2 ? t = r + 1 : n = r;
  }
  return t;
}
function Ps(e) {
  if (!(e.flags & 1)) {
    const t = ar(e), n = Ue[Ue.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= ar(n) ? Ue.push(e) : Ue.splice(yc(t), 0, e), e.flags |= 1, Ul();
  }
}
function Ul() {
  Jr || (Jr = Hl.then(Kl));
}
function _c(e) {
  le(e) ? Nn.push(...e) : Qt && e.id === -1 ? Qt.splice(_n + 1, 0, e) : e.flags & 1 || (Nn.push(e), e.flags |= 1), Ul();
}
function po(e, t, n = Ct + 1) {
  for (; n < Ue.length; n++) {
    const r = Ue[n];
    if (r && r.flags & 2) {
      if (e && r.id !== e.uid)
        continue;
      Ue.splice(n, 1), n--, r.flags & 4 && (r.flags &= -2), r(), r.flags & 4 || (r.flags &= -2);
    }
  }
}
function Wl(e) {
  if (Nn.length) {
    const t = [...new Set(Nn)].sort(
      (n, r) => ar(n) - ar(r)
    );
    if (Nn.length = 0, Qt) {
      Qt.push(...t);
      return;
    }
    for (Qt = t, _n = 0; _n < Qt.length; _n++) {
      const n = Qt[_n];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
    }
    Qt = null, _n = 0;
  }
}
const ar = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function Kl(e) {
  try {
    for (Ct = 0; Ct < Ue.length; Ct++) {
      const t = Ue[Ct];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), wr(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; Ct < Ue.length; Ct++) {
      const t = Ue[Ct];
      t && (t.flags &= -2);
    }
    Ct = -1, Ue.length = 0, Wl(), Jr = null, (Ue.length || Nn.length) && Kl();
  }
}
let wt = null, Xl = null;
function Qr(e) {
  const t = wt;
  return wt = e, Xl = e && e.type.__scopeId || null, t;
}
function vc(e, t = wt, n) {
  if (!t || e._n)
    return e;
  const r = (...i) => {
    r._d && Mo(-1);
    const s = Qr(t);
    let o;
    try {
      o = e(...i);
    } finally {
      Qr(s), r._d && Mo(1);
    }
    return o;
  };
  return r._n = !0, r._c = !0, r._d = !0, r;
}
function Br(e, t) {
  if (wt === null)
    return e;
  const n = Mi(wt), r = e.dirs || (e.dirs = []);
  for (let i = 0; i < t.length; i++) {
    let [s, o, l, a = Ee] = t[i];
    s && (ce(s) && (s = {
      mounted: s,
      updated: s
    }), s.deep && jt(o), r.push({
      dir: s,
      instance: n,
      value: o,
      oldValue: void 0,
      arg: l,
      modifiers: a
    }));
  }
  return e;
}
function sn(e, t, n, r) {
  const i = e.dirs, s = t && t.dirs;
  for (let o = 0; o < i.length; o++) {
    const l = i[o];
    s && (l.oldValue = s[o].value);
    let a = l.dir[r];
    a && (Vt(), Ot(a, n, 8, [
      e.el,
      l,
      e,
      t
    ]), Ht());
  }
}
const bc = Symbol("_vte"), xc = (e) => e.__isTeleport, Ec = Symbol("_leaveCb");
function Os(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, Os(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
// @__NO_SIDE_EFFECTS__
function Is(e, t) {
  return ce(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    Ie({ name: e.name }, t, { setup: e })
  ) : e;
}
function Yl(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
const Zr = /* @__PURE__ */ new WeakMap();
function Zn(e, t, n, r, i = !1) {
  if (le(e)) {
    e.forEach(
      (y, x) => Zn(
        y,
        t && (le(t) ? t[x] : t),
        n,
        r,
        i
      )
    );
    return;
  }
  if (er(r) && !i) {
    r.shapeFlag & 512 && r.type.__asyncResolved && r.component.subTree.component && Zn(e, t, n, r.component.subTree);
    return;
  }
  const s = r.shapeFlag & 4 ? Mi(r.component) : r.el, o = i ? null : s, { i: l, r: a } = e, c = t && t.r, u = l.refs === Ee ? l.refs = {} : l.refs, f = l.setupState, h = ye(f), g = f === Ee ? _l : (y) => we(h, y);
  if (c != null && c !== a) {
    if (go(t), Oe(c))
      u[c] = null, g(c) && (f[c] = null);
    else if (je(c)) {
      c.value = null;
      const y = t;
      y.k && (u[y.k] = null);
    }
  }
  if (ce(a))
    wr(a, l, 12, [o, u]);
  else {
    const y = Oe(a), x = je(a);
    if (y || x) {
      const b = () => {
        if (e.f) {
          const p = y ? g(a) ? f[a] : u[a] : a.value;
          if (i)
            le(p) && bs(p, s);
          else if (le(p))
            p.includes(s) || p.push(s);
          else if (y)
            u[a] = [s], g(a) && (f[a] = u[a]);
          else {
            const k = [s];
            a.value = k, e.k && (u[e.k] = k);
          }
        } else y ? (u[a] = o, g(a) && (f[a] = o)) : x && (a.value = o, e.k && (u[e.k] = o));
      };
      if (o) {
        const p = () => {
          b(), Zr.delete(e);
        };
        p.id = -1, Zr.set(e, p), st(p, n);
      } else
        go(e), b();
    }
  }
}
function go(e) {
  const t = Zr.get(e);
  t && (t.flags |= 8, Zr.delete(e));
}
yi().requestIdleCallback;
yi().cancelIdleCallback;
const er = (e) => !!e.type.__asyncLoader, Jl = (e) => e.type.__isKeepAlive;
function Sc(e, t) {
  Ql(e, "a", t);
}
function Mc(e, t) {
  Ql(e, "da", t);
}
function Ql(e, t, n = Ke) {
  const r = e.__wdc || (e.__wdc = () => {
    let i = n;
    for (; i; ) {
      if (i.isDeactivated)
        return;
      i = i.parent;
    }
    return e();
  });
  if (xi(t, r, n), n) {
    let i = n.parent;
    for (; i && i.parent; )
      Jl(i.parent.vnode) && Tc(r, t, n, i), i = i.parent;
  }
}
function Tc(e, t, n, r) {
  const i = xi(
    t,
    e,
    r,
    !0
    /* prepend */
  );
  As(() => {
    bs(r[t], i);
  }, n);
}
function xi(e, t, n = Ke, r = !1) {
  if (n) {
    const i = n[e] || (n[e] = []), s = t.__weh || (t.__weh = (...o) => {
      Vt();
      const l = yr(n), a = Ot(t, n, e, o);
      return l(), Ht(), a;
    });
    return r ? i.unshift(s) : i.push(s), s;
  }
}
const Ut = (e) => (t, n = Ke) => {
  (!cr || e === "sp") && xi(e, (...r) => t(...r), n);
}, kc = Ut("bm"), Zl = Ut("m"), Cc = Ut(
  "bu"
), Nc = Ut("u"), Rc = Ut(
  "bum"
), As = Ut("um"), Lc = Ut(
  "sp"
), Pc = Ut("rtg"), Oc = Ut("rtc");
function Ic(e, t = Ke) {
  xi("ec", e, t);
}
const Ac = Symbol.for("v-ndc");
function mo(e, t, n, r) {
  let i;
  const s = n, o = le(e);
  if (o || Oe(e)) {
    const l = o && Cn(e);
    let a = !1, c = !1;
    l && (a = !yt(e), c = tn(e), e = _i(e)), i = new Array(e.length);
    for (let u = 0, f = e.length; u < f; u++)
      i[u] = t(
        a ? c ? Xr(Ae(e[u])) : Ae(e[u]) : e[u],
        u,
        void 0,
        s
      );
  } else if (typeof e == "number") {
    i = new Array(e);
    for (let l = 0; l < e; l++)
      i[l] = t(l + 1, l, void 0, s);
  } else if (Ce(e))
    if (e[Symbol.iterator])
      i = Array.from(
        e,
        (l, a) => t(l, a, void 0, s)
      );
    else {
      const l = Object.keys(e);
      i = new Array(l.length);
      for (let a = 0, c = l.length; a < c; a++) {
        const u = l[a];
        i[a] = t(e[u], u, a, s);
      }
    }
  else
    i = [];
  return i;
}
const es = (e) => e ? _a(e) ? Mi(e) : es(e.parent) : null, tr = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ Ie(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => es(e.parent),
    $root: (e) => es(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => ta(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      Ps(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = ql.bind(e.proxy)),
    $watch: (e) => rf.bind(e)
  })
), Fi = (e, t) => e !== Ee && !e.__isScriptSetup && we(e, t), $c = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: r, data: i, props: s, accessCache: o, type: l, appContext: a } = e;
    let c;
    if (t[0] !== "$") {
      const g = o[t];
      if (g !== void 0)
        switch (g) {
          case 1:
            return r[t];
          case 2:
            return i[t];
          case 4:
            return n[t];
          case 3:
            return s[t];
        }
      else {
        if (Fi(r, t))
          return o[t] = 1, r[t];
        if (i !== Ee && we(i, t))
          return o[t] = 2, i[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (c = e.propsOptions[0]) && we(c, t)
        )
          return o[t] = 3, s[t];
        if (n !== Ee && we(n, t))
          return o[t] = 4, n[t];
        ts && (o[t] = 0);
      }
    }
    const u = tr[t];
    let f, h;
    if (u)
      return t === "$attrs" && Be(e.attrs, "get", ""), u(e);
    if (
      // css module (injected by vue-loader)
      (f = l.__cssModules) && (f = f[t])
    )
      return f;
    if (n !== Ee && we(n, t))
      return o[t] = 4, n[t];
    if (
      // global properties
      h = a.config.globalProperties, we(h, t)
    )
      return h[t];
  },
  set({ _: e }, t, n) {
    const { data: r, setupState: i, ctx: s } = e;
    return Fi(i, t) ? (i[t] = n, !0) : r !== Ee && we(r, t) ? (r[t] = n, !0) : we(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (s[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: i, propsOptions: s, type: o }
  }, l) {
    let a, c;
    return !!(n[l] || e !== Ee && l[0] !== "$" && we(e, l) || Fi(t, l) || (a = s[0]) && we(a, l) || we(r, l) || we(tr, l) || we(i.config.globalProperties, l) || (c = o.__cssModules) && c[l]);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : we(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function wo(e) {
  return le(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let ts = !0;
function Fc(e) {
  const t = ta(e), n = e.proxy, r = e.ctx;
  ts = !1, t.beforeCreate && yo(t.beforeCreate, e, "bc");
  const {
    // state
    data: i,
    computed: s,
    methods: o,
    watch: l,
    provide: a,
    inject: c,
    // lifecycle
    created: u,
    beforeMount: f,
    mounted: h,
    beforeUpdate: g,
    updated: y,
    activated: x,
    deactivated: b,
    beforeDestroy: p,
    beforeUnmount: k,
    destroyed: P,
    unmounted: w,
    render: C,
    renderTracked: B,
    renderTriggered: G,
    errorCaptured: W,
    serverPrefetch: Q,
    // public API
    expose: ee,
    inheritAttrs: oe,
    // assets
    components: he,
    directives: K,
    filters: T
  } = t;
  if (c && zc(c, r, null), o)
    for (const $ in o) {
      const D = o[$];
      ce(D) && (r[$] = D.bind(n));
    }
  if (i) {
    const $ = i.call(n, n);
    Ce($) && (e.data = vi($));
  }
  if (ts = !0, s)
    for (const $ in s) {
      const D = s[$], X = ce(D) ? D.bind(n, n) : ce(D.get) ? D.get.bind(n, n) : Lt, Y = !ce(D) && ce(D.set) ? D.set.bind(n) : Lt, ae = ss({
        get: X,
        set: Y
      });
      Object.defineProperty(r, $, {
        enumerable: !0,
        configurable: !0,
        get: () => ae.value,
        set: (ue) => ae.value = ue
      });
    }
  if (l)
    for (const $ in l)
      ea(l[$], r, n, $);
  if (a) {
    const $ = ce(a) ? a.call(n) : a;
    Reflect.ownKeys($).forEach((D) => {
      Hc(D, $[D]);
    });
  }
  u && yo(u, e, "c");
  function N($, D) {
    le(D) ? D.forEach((X) => $(X.bind(n))) : D && $(D.bind(n));
  }
  if (N(kc, f), N(Zl, h), N(Cc, g), N(Nc, y), N(Sc, x), N(Mc, b), N(Ic, W), N(Oc, B), N(Pc, G), N(Rc, k), N(As, w), N(Lc, Q), le(ee))
    if (ee.length) {
      const $ = e.exposed || (e.exposed = {});
      ee.forEach((D) => {
        Object.defineProperty($, D, {
          get: () => n[D],
          set: (X) => n[D] = X,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  C && e.render === Lt && (e.render = C), oe != null && (e.inheritAttrs = oe), he && (e.components = he), K && (e.directives = K), Q && Yl(e);
}
function zc(e, t, n = Lt) {
  le(e) && (e = ns(e));
  for (const r in e) {
    const i = e[r];
    let s;
    Ce(i) ? "default" in i ? s = jr(
      i.from || r,
      i.default,
      !0
    ) : s = jr(i.from || r) : s = jr(i), je(s) ? Object.defineProperty(t, r, {
      enumerable: !0,
      configurable: !0,
      get: () => s.value,
      set: (o) => s.value = o
    }) : t[r] = s;
  }
}
function yo(e, t, n) {
  Ot(
    le(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function ea(e, t, n, r) {
  let i = r.includes(".") ? pa(n, r) : () => n[r];
  if (Oe(e)) {
    const s = t[e];
    ce(s) && Bi(i, s);
  } else if (ce(e))
    Bi(i, e.bind(n));
  else if (Ce(e))
    if (le(e))
      e.forEach((s) => ea(s, t, n, r));
    else {
      const s = ce(e.handler) ? e.handler.bind(n) : t[e.handler];
      ce(s) && Bi(i, s, e);
    }
}
function ta(e) {
  const t = e.type, { mixins: n, extends: r } = t, {
    mixins: i,
    optionsCache: s,
    config: { optionMergeStrategies: o }
  } = e.appContext, l = s.get(t);
  let a;
  return l ? a = l : !i.length && !n && !r ? a = t : (a = {}, i.length && i.forEach(
    (c) => ei(a, c, o, !0)
  ), ei(a, t, o)), Ce(t) && s.set(t, a), a;
}
function ei(e, t, n, r = !1) {
  const { mixins: i, extends: s } = t;
  s && ei(e, s, n, !0), i && i.forEach(
    (o) => ei(e, o, n, !0)
  );
  for (const o in t)
    if (!(r && o === "expose")) {
      const l = Bc[o] || n && n[o];
      e[o] = l ? l(e[o], t[o]) : t[o];
    }
  return e;
}
const Bc = {
  data: _o,
  props: vo,
  emits: vo,
  // objects
  methods: Un,
  computed: Un,
  // lifecycle
  beforeCreate: Ve,
  created: Ve,
  beforeMount: Ve,
  mounted: Ve,
  beforeUpdate: Ve,
  updated: Ve,
  beforeDestroy: Ve,
  beforeUnmount: Ve,
  destroyed: Ve,
  unmounted: Ve,
  activated: Ve,
  deactivated: Ve,
  errorCaptured: Ve,
  serverPrefetch: Ve,
  // assets
  components: Un,
  directives: Un,
  // watch
  watch: Dc,
  // provide / inject
  provide: _o,
  inject: jc
};
function _o(e, t) {
  return t ? e ? function() {
    return Ie(
      ce(e) ? e.call(this, this) : e,
      ce(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function jc(e, t) {
  return Un(ns(e), ns(t));
}
function ns(e) {
  if (le(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function Ve(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Un(e, t) {
  return e ? Ie(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function vo(e, t) {
  return e ? le(e) && le(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : Ie(
    /* @__PURE__ */ Object.create(null),
    wo(e),
    wo(t ?? {})
  ) : t;
}
function Dc(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = Ie(/* @__PURE__ */ Object.create(null), e);
  for (const r in t)
    n[r] = Ve(e[r], t[r]);
  return n;
}
function na() {
  return {
    app: null,
    config: {
      isNativeTag: _l,
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
let Gc = 0;
function Vc(e, t) {
  return function(r, i = null) {
    ce(r) || (r = Ie({}, r)), i != null && !Ce(i) && (i = null);
    const s = na(), o = /* @__PURE__ */ new WeakSet(), l = [];
    let a = !1;
    const c = s.app = {
      _uid: Gc++,
      _component: r,
      _props: i,
      _container: null,
      _context: s,
      _instance: null,
      version: Cf,
      get config() {
        return s.config;
      },
      set config(u) {
      },
      use(u, ...f) {
        return o.has(u) || (u && ce(u.install) ? (o.add(u), u.install(c, ...f)) : ce(u) && (o.add(u), u(c, ...f))), c;
      },
      mixin(u) {
        return s.mixins.includes(u) || s.mixins.push(u), c;
      },
      component(u, f) {
        return f ? (s.components[u] = f, c) : s.components[u];
      },
      directive(u, f) {
        return f ? (s.directives[u] = f, c) : s.directives[u];
      },
      mount(u, f, h) {
        if (!a) {
          const g = c._ceVNode || Gt(r, i);
          return g.appContext = s, h === !0 ? h = "svg" : h === !1 && (h = void 0), e(g, u, h), a = !0, c._container = u, u.__vue_app__ = c, Mi(g.component);
        }
      },
      onUnmount(u) {
        l.push(u);
      },
      unmount() {
        a && (Ot(
          l,
          c._instance,
          16
        ), e(null, c._container), delete c._container.__vue_app__);
      },
      provide(u, f) {
        return s.provides[u] = f, c;
      },
      runWithContext(u) {
        const f = Rn;
        Rn = c;
        try {
          return u();
        } finally {
          Rn = f;
        }
      }
    };
    return c;
  };
}
let Rn = null;
function Hc(e, t) {
  if (Ke) {
    let n = Ke.provides;
    const r = Ke.parent && Ke.parent.provides;
    r === n && (n = Ke.provides = Object.create(r)), n[e] = t;
  }
}
function jr(e, t, n = !1) {
  const r = xf();
  if (r || Rn) {
    let i = Rn ? Rn._context.provides : r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
    if (i && e in i)
      return i[e];
    if (arguments.length > 1)
      return n && ce(t) ? t.call(r && r.proxy) : t;
  }
}
const ra = {}, ia = () => Object.create(ra), sa = (e) => Object.getPrototypeOf(e) === ra;
function qc(e, t, n, r = !1) {
  const i = {}, s = ia();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), oa(e, t, i, s);
  for (const o in e.propsOptions[0])
    o in i || (i[o] = void 0);
  n ? e.props = r ? i : ac(i) : e.type.props ? e.props = i : e.props = s, e.attrs = s;
}
function Uc(e, t, n, r) {
  const {
    props: i,
    attrs: s,
    vnode: { patchFlag: o }
  } = e, l = ye(i), [a] = e.propsOptions;
  let c = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (r || o > 0) && !(o & 16)
  ) {
    if (o & 8) {
      const u = e.vnode.dynamicProps;
      for (let f = 0; f < u.length; f++) {
        let h = u[f];
        if (Ei(e.emitsOptions, h))
          continue;
        const g = t[h];
        if (a)
          if (we(s, h))
            g !== s[h] && (s[h] = g, c = !0);
          else {
            const y = Et(h);
            i[y] = rs(
              a,
              l,
              y,
              g,
              e,
              !1
            );
          }
        else
          g !== s[h] && (s[h] = g, c = !0);
      }
    }
  } else {
    oa(e, t, i, s) && (c = !0);
    let u;
    for (const f in l)
      (!t || // for camelCase
      !we(t, f) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((u = mt(f)) === f || !we(t, u))) && (a ? n && // for camelCase
      (n[f] !== void 0 || // for kebab-case
      n[u] !== void 0) && (i[f] = rs(
        a,
        l,
        f,
        void 0,
        e,
        !0
      )) : delete i[f]);
    if (s !== l)
      for (const f in s)
        (!t || !we(t, f)) && (delete s[f], c = !0);
  }
  c && Bt(e.attrs, "set", "");
}
function oa(e, t, n, r) {
  const [i, s] = e.propsOptions;
  let o = !1, l;
  if (t)
    for (let a in t) {
      if (Yn(a))
        continue;
      const c = t[a];
      let u;
      i && we(i, u = Et(a)) ? !s || !s.includes(u) ? n[u] = c : (l || (l = {}))[u] = c : Ei(e.emitsOptions, a) || (!(a in r) || c !== r[a]) && (r[a] = c, o = !0);
    }
  if (s) {
    const a = ye(n), c = l || Ee;
    for (let u = 0; u < s.length; u++) {
      const f = s[u];
      n[f] = rs(
        i,
        a,
        f,
        c[f],
        e,
        !we(c, f)
      );
    }
  }
  return o;
}
function rs(e, t, n, r, i, s) {
  const o = e[n];
  if (o != null) {
    const l = we(o, "default");
    if (l && r === void 0) {
      const a = o.default;
      if (o.type !== Function && !o.skipFactory && ce(a)) {
        const { propsDefaults: c } = i;
        if (n in c)
          r = c[n];
        else {
          const u = yr(i);
          r = c[n] = a.call(
            null,
            t
          ), u();
        }
      } else
        r = a;
      i.ce && i.ce._setProp(n, r);
    }
    o[
      0
      /* shouldCast */
    ] && (s && !l ? r = !1 : o[
      1
      /* shouldCastTrue */
    ] && (r === "" || r === mt(n)) && (r = !0));
  }
  return r;
}
const Wc = /* @__PURE__ */ new WeakMap();
function la(e, t, n = !1) {
  const r = n ? Wc : t.propsCache, i = r.get(e);
  if (i)
    return i;
  const s = e.props, o = {}, l = [];
  let a = !1;
  if (!ce(e)) {
    const u = (f) => {
      a = !0;
      const [h, g] = la(f, t, !0);
      Ie(o, h), g && l.push(...g);
    };
    !n && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u);
  }
  if (!s && !a)
    return Ce(e) && r.set(e, Tn), Tn;
  if (le(s))
    for (let u = 0; u < s.length; u++) {
      const f = Et(s[u]);
      bo(f) && (o[f] = Ee);
    }
  else if (s)
    for (const u in s) {
      const f = Et(u);
      if (bo(f)) {
        const h = s[u], g = o[f] = le(h) || ce(h) ? { type: h } : Ie({}, h), y = g.type;
        let x = !1, b = !0;
        if (le(y))
          for (let p = 0; p < y.length; ++p) {
            const k = y[p], P = ce(k) && k.name;
            if (P === "Boolean") {
              x = !0;
              break;
            } else P === "String" && (b = !1);
          }
        else
          x = ce(y) && y.name === "Boolean";
        g[
          0
          /* shouldCast */
        ] = x, g[
          1
          /* shouldCastTrue */
        ] = b, (x || we(g, "default")) && l.push(f);
      }
    }
  const c = [o, l];
  return Ce(e) && r.set(e, c), c;
}
function bo(e) {
  return e[0] !== "$" && !Yn(e);
}
const $s = (e) => e === "_" || e === "_ctx" || e === "$stable", Fs = (e) => le(e) ? e.map(Nt) : [Nt(e)], Kc = (e, t, n) => {
  if (t._n)
    return t;
  const r = vc((...i) => Fs(t(...i)), n);
  return r._c = !1, r;
}, aa = (e, t, n) => {
  const r = e._ctx;
  for (const i in e) {
    if ($s(i)) continue;
    const s = e[i];
    if (ce(s))
      t[i] = Kc(i, s, r);
    else if (s != null) {
      const o = Fs(s);
      t[i] = () => o;
    }
  }
}, ua = (e, t) => {
  const n = Fs(t);
  e.slots.default = () => n;
}, ca = (e, t, n) => {
  for (const r in t)
    (n || !$s(r)) && (e[r] = t[r]);
}, Xc = (e, t, n) => {
  const r = e.slots = ia();
  if (e.vnode.shapeFlag & 32) {
    const i = t._;
    i ? (ca(r, t, n), n && Sl(r, "_", i, !0)) : aa(t, r);
  } else t && ua(e, t);
}, Yc = (e, t, n) => {
  const { vnode: r, slots: i } = e;
  let s = !0, o = Ee;
  if (r.shapeFlag & 32) {
    const l = t._;
    l ? n && l === 1 ? s = !1 : ca(i, t, n) : (s = !t.$stable, aa(t, i)), o = t;
  } else t && (ua(e, t), o = { default: 1 });
  if (s)
    for (const l in i)
      !$s(l) && o[l] == null && delete i[l];
}, st = hf;
function Jc(e) {
  return Qc(e);
}
function Qc(e, t) {
  const n = yi();
  n.__VUE__ = !0;
  const {
    insert: r,
    remove: i,
    patchProp: s,
    createElement: o,
    createText: l,
    createComment: a,
    setText: c,
    setElementText: u,
    parentNode: f,
    nextSibling: h,
    setScopeId: g = Lt,
    insertStaticContent: y
  } = e, x = (v, S, L, F = null, I = null, A = null, q = void 0, H = null, z = !!S.dynamicChildren) => {
    if (v === S)
      return;
    v && !Gn(v, S) && (F = Te(v), ue(v, I, A, !0), v = null), S.patchFlag === -2 && (z = !1, S.dynamicChildren = null);
    const { type: j, ref: te, shapeFlag: U } = S;
    switch (j) {
      case Si:
        b(v, S, L, F);
        break;
      case On:
        p(v, S, L, F);
        break;
      case ji:
        v == null && k(S, L, F, q);
        break;
      case gt:
        he(
          v,
          S,
          L,
          F,
          I,
          A,
          q,
          H,
          z
        );
        break;
      default:
        U & 1 ? C(
          v,
          S,
          L,
          F,
          I,
          A,
          q,
          H,
          z
        ) : U & 6 ? K(
          v,
          S,
          L,
          F,
          I,
          A,
          q,
          H,
          z
        ) : (U & 64 || U & 128) && j.process(
          v,
          S,
          L,
          F,
          I,
          A,
          q,
          H,
          z,
          rt
        );
    }
    te != null && I ? Zn(te, v && v.ref, A, S || v, !S) : te == null && v && v.ref != null && Zn(v.ref, null, A, v, !0);
  }, b = (v, S, L, F) => {
    if (v == null)
      r(
        S.el = l(S.children),
        L,
        F
      );
    else {
      const I = S.el = v.el;
      S.children !== v.children && c(I, S.children);
    }
  }, p = (v, S, L, F) => {
    v == null ? r(
      S.el = a(S.children || ""),
      L,
      F
    ) : S.el = v.el;
  }, k = (v, S, L, F) => {
    [v.el, v.anchor] = y(
      v.children,
      S,
      L,
      F,
      v.el,
      v.anchor
    );
  }, P = ({ el: v, anchor: S }, L, F) => {
    let I;
    for (; v && v !== S; )
      I = h(v), r(v, L, F), v = I;
    r(S, L, F);
  }, w = ({ el: v, anchor: S }) => {
    let L;
    for (; v && v !== S; )
      L = h(v), i(v), v = L;
    i(S);
  }, C = (v, S, L, F, I, A, q, H, z) => {
    S.type === "svg" ? q = "svg" : S.type === "math" && (q = "mathml"), v == null ? B(
      S,
      L,
      F,
      I,
      A,
      q,
      H,
      z
    ) : Q(
      v,
      S,
      I,
      A,
      q,
      H,
      z
    );
  }, B = (v, S, L, F, I, A, q, H) => {
    let z, j;
    const { props: te, shapeFlag: U, transition: Z, dirs: se } = v;
    if (z = v.el = o(
      v.type,
      A,
      te && te.is,
      te
    ), U & 8 ? u(z, v.children) : U & 16 && W(
      v.children,
      z,
      null,
      F,
      I,
      zi(v, A),
      q,
      H
    ), se && sn(v, null, F, "created"), G(z, v, v.scopeId, q, F), te) {
      for (const _e in te)
        _e !== "value" && !Yn(_e) && s(z, _e, null, te[_e], A, F);
      "value" in te && s(z, "value", null, te.value, A), (j = te.onVnodeBeforeMount) && Tt(j, F, v);
    }
    se && sn(v, null, F, "beforeMount");
    const de = Zc(I, Z);
    de && Z.beforeEnter(z), r(z, S, L), ((j = te && te.onVnodeMounted) || de || se) && st(() => {
      j && Tt(j, F, v), de && Z.enter(z), se && sn(v, null, F, "mounted");
    }, I);
  }, G = (v, S, L, F, I) => {
    if (L && g(v, L), F)
      for (let A = 0; A < F.length; A++)
        g(v, F[A]);
    if (I) {
      let A = I.subTree;
      if (S === A || ma(A.type) && (A.ssContent === S || A.ssFallback === S)) {
        const q = I.vnode;
        G(
          v,
          q,
          q.scopeId,
          q.slotScopeIds,
          I.parent
        );
      }
    }
  }, W = (v, S, L, F, I, A, q, H, z = 0) => {
    for (let j = z; j < v.length; j++) {
      const te = v[j] = H ? Zt(v[j]) : Nt(v[j]);
      x(
        null,
        te,
        S,
        L,
        F,
        I,
        A,
        q,
        H
      );
    }
  }, Q = (v, S, L, F, I, A, q) => {
    const H = S.el = v.el;
    let { patchFlag: z, dynamicChildren: j, dirs: te } = S;
    z |= v.patchFlag & 16;
    const U = v.props || Ee, Z = S.props || Ee;
    let se;
    if (L && on(L, !1), (se = Z.onVnodeBeforeUpdate) && Tt(se, L, S, v), te && sn(S, v, L, "beforeUpdate"), L && on(L, !0), (U.innerHTML && Z.innerHTML == null || U.textContent && Z.textContent == null) && u(H, ""), j ? ee(
      v.dynamicChildren,
      j,
      H,
      L,
      F,
      zi(S, I),
      A
    ) : q || D(
      v,
      S,
      H,
      null,
      L,
      F,
      zi(S, I),
      A,
      !1
    ), z > 0) {
      if (z & 16)
        oe(H, U, Z, L, I);
      else if (z & 2 && U.class !== Z.class && s(H, "class", null, Z.class, I), z & 4 && s(H, "style", U.style, Z.style, I), z & 8) {
        const de = S.dynamicProps;
        for (let _e = 0; _e < de.length; _e++) {
          const re = de[_e], $e = U[re], Fe = Z[re];
          (Fe !== $e || re === "value") && s(H, re, $e, Fe, I, L);
        }
      }
      z & 1 && v.children !== S.children && u(H, S.children);
    } else !q && j == null && oe(H, U, Z, L, I);
    ((se = Z.onVnodeUpdated) || te) && st(() => {
      se && Tt(se, L, S, v), te && sn(S, v, L, "updated");
    }, F);
  }, ee = (v, S, L, F, I, A, q) => {
    for (let H = 0; H < S.length; H++) {
      const z = v[H], j = S[H], te = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        z.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (z.type === gt || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Gn(z, j) || // - In the case of a component, it could contain anything.
        z.shapeFlag & 198) ? f(z.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          L
        )
      );
      x(
        z,
        j,
        te,
        null,
        F,
        I,
        A,
        q,
        !0
      );
    }
  }, oe = (v, S, L, F, I) => {
    if (S !== L) {
      if (S !== Ee)
        for (const A in S)
          !Yn(A) && !(A in L) && s(
            v,
            A,
            S[A],
            null,
            I,
            F
          );
      for (const A in L) {
        if (Yn(A)) continue;
        const q = L[A], H = S[A];
        q !== H && A !== "value" && s(v, A, H, q, I, F);
      }
      "value" in L && s(v, "value", S.value, L.value, I);
    }
  }, he = (v, S, L, F, I, A, q, H, z) => {
    const j = S.el = v ? v.el : l(""), te = S.anchor = v ? v.anchor : l("");
    let { patchFlag: U, dynamicChildren: Z, slotScopeIds: se } = S;
    se && (H = H ? H.concat(se) : se), v == null ? (r(j, L, F), r(te, L, F), W(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      S.children || [],
      L,
      te,
      I,
      A,
      q,
      H,
      z
    )) : U > 0 && U & 64 && Z && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    v.dynamicChildren ? (ee(
      v.dynamicChildren,
      Z,
      L,
      I,
      A,
      q,
      H
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (S.key != null || I && S === I.subTree) && fa(
      v,
      S,
      !0
      /* shallow */
    )) : D(
      v,
      S,
      L,
      te,
      I,
      A,
      q,
      H,
      z
    );
  }, K = (v, S, L, F, I, A, q, H, z) => {
    S.slotScopeIds = H, v == null ? S.shapeFlag & 512 ? I.ctx.activate(
      S,
      L,
      F,
      q,
      z
    ) : T(
      S,
      L,
      F,
      I,
      A,
      q,
      z
    ) : V(v, S, z);
  }, T = (v, S, L, F, I, A, q) => {
    const H = v.component = bf(
      v,
      F,
      I
    );
    if (Jl(v) && (H.ctx.renderer = rt), Ef(H, !1, q), H.asyncDep) {
      if (I && I.registerDep(H, N, q), !v.el) {
        const z = H.subTree = Gt(On);
        p(null, z, S, L), v.placeholder = z.el;
      }
    } else
      N(
        H,
        v,
        S,
        L,
        I,
        A,
        q
      );
  }, V = (v, S, L) => {
    const F = S.component = v.component;
    if (cf(v, S, L))
      if (F.asyncDep && !F.asyncResolved) {
        $(F, S, L);
        return;
      } else
        F.next = S, F.update();
    else
      S.el = v.el, F.vnode = S;
  }, N = (v, S, L, F, I, A, q) => {
    const H = () => {
      if (v.isMounted) {
        let { next: U, bu: Z, u: se, parent: de, vnode: _e } = v;
        {
          const ht = ha(v);
          if (ht) {
            U && (U.el = _e.el, $(v, U, q)), ht.asyncDep.then(() => {
              v.isUnmounted || H();
            });
            return;
          }
        }
        let re = U, $e;
        on(v, !1), U ? (U.el = _e.el, $(v, U, q)) : U = _e, Z && Pi(Z), ($e = U.props && U.props.onVnodeBeforeUpdate) && Tt($e, de, U, _e), on(v, !0);
        const Fe = Eo(v), it = v.subTree;
        v.subTree = Fe, x(
          it,
          Fe,
          // parent may have changed if it's in a teleport
          f(it.el),
          // anchor may have changed if it's in a fragment
          Te(it),
          v,
          I,
          A
        ), U.el = Fe.el, re === null && ff(v, Fe.el), se && st(se, I), ($e = U.props && U.props.onVnodeUpdated) && st(
          () => Tt($e, de, U, _e),
          I
        );
      } else {
        let U;
        const { el: Z, props: se } = S, { bm: de, m: _e, parent: re, root: $e, type: Fe } = v, it = er(S);
        on(v, !1), de && Pi(de), !it && (U = se && se.onVnodeBeforeMount) && Tt(U, re, S), on(v, !0);
        {
          $e.ce && // @ts-expect-error _def is private
          $e.ce._def.shadowRoot !== !1 && $e.ce._injectChildStyle(Fe);
          const ht = v.subTree = Eo(v);
          x(
            null,
            ht,
            L,
            F,
            v,
            I,
            A
          ), S.el = ht.el;
        }
        if (_e && st(_e, I), !it && (U = se && se.onVnodeMounted)) {
          const ht = S;
          st(
            () => Tt(U, re, ht),
            I
          );
        }
        (S.shapeFlag & 256 || re && er(re.vnode) && re.vnode.shapeFlag & 256) && v.a && st(v.a, I), v.isMounted = !0, S = L = F = null;
      }
    };
    v.scope.on();
    const z = v.effect = new Cl(H);
    v.scope.off();
    const j = v.update = z.run.bind(z), te = v.job = z.runIfDirty.bind(z);
    te.i = v, te.id = v.uid, z.scheduler = () => Ps(te), on(v, !0), j();
  }, $ = (v, S, L) => {
    S.component = v;
    const F = v.vnode.props;
    v.vnode = S, v.next = null, Uc(v, S.props, F, L), Yc(v, S.children, L), Vt(), po(v), Ht();
  }, D = (v, S, L, F, I, A, q, H, z = !1) => {
    const j = v && v.children, te = v ? v.shapeFlag : 0, U = S.children, { patchFlag: Z, shapeFlag: se } = S;
    if (Z > 0) {
      if (Z & 128) {
        Y(
          j,
          U,
          L,
          F,
          I,
          A,
          q,
          H,
          z
        );
        return;
      } else if (Z & 256) {
        X(
          j,
          U,
          L,
          F,
          I,
          A,
          q,
          H,
          z
        );
        return;
      }
    }
    se & 8 ? (te & 16 && ke(j, I, A), U !== j && u(L, U)) : te & 16 ? se & 16 ? Y(
      j,
      U,
      L,
      F,
      I,
      A,
      q,
      H,
      z
    ) : ke(j, I, A, !0) : (te & 8 && u(L, ""), se & 16 && W(
      U,
      L,
      F,
      I,
      A,
      q,
      H,
      z
    ));
  }, X = (v, S, L, F, I, A, q, H, z) => {
    v = v || Tn, S = S || Tn;
    const j = v.length, te = S.length, U = Math.min(j, te);
    let Z;
    for (Z = 0; Z < U; Z++) {
      const se = S[Z] = z ? Zt(S[Z]) : Nt(S[Z]);
      x(
        v[Z],
        se,
        L,
        null,
        I,
        A,
        q,
        H,
        z
      );
    }
    j > te ? ke(
      v,
      I,
      A,
      !0,
      !1,
      U
    ) : W(
      S,
      L,
      F,
      I,
      A,
      q,
      H,
      z,
      U
    );
  }, Y = (v, S, L, F, I, A, q, H, z) => {
    let j = 0;
    const te = S.length;
    let U = v.length - 1, Z = te - 1;
    for (; j <= U && j <= Z; ) {
      const se = v[j], de = S[j] = z ? Zt(S[j]) : Nt(S[j]);
      if (Gn(se, de))
        x(
          se,
          de,
          L,
          null,
          I,
          A,
          q,
          H,
          z
        );
      else
        break;
      j++;
    }
    for (; j <= U && j <= Z; ) {
      const se = v[U], de = S[Z] = z ? Zt(S[Z]) : Nt(S[Z]);
      if (Gn(se, de))
        x(
          se,
          de,
          L,
          null,
          I,
          A,
          q,
          H,
          z
        );
      else
        break;
      U--, Z--;
    }
    if (j > U) {
      if (j <= Z) {
        const se = Z + 1, de = se < te ? S[se].el : F;
        for (; j <= Z; )
          x(
            null,
            S[j] = z ? Zt(S[j]) : Nt(S[j]),
            L,
            de,
            I,
            A,
            q,
            H,
            z
          ), j++;
      }
    } else if (j > Z)
      for (; j <= U; )
        ue(v[j], I, A, !0), j++;
    else {
      const se = j, de = j, _e = /* @__PURE__ */ new Map();
      for (j = de; j <= Z; j++) {
        const Ge = S[j] = z ? Zt(S[j]) : Nt(S[j]);
        Ge.key != null && _e.set(Ge.key, j);
      }
      let re, $e = 0;
      const Fe = Z - de + 1;
      let it = !1, ht = 0;
      const rn = new Array(Fe);
      for (j = 0; j < Fe; j++) rn[j] = 0;
      for (j = se; j <= U; j++) {
        const Ge = v[j];
        if ($e >= Fe) {
          ue(Ge, I, A, !0);
          continue;
        }
        let dt;
        if (Ge.key != null)
          dt = _e.get(Ge.key);
        else
          for (re = de; re <= Z; re++)
            if (rn[re - de] === 0 && Gn(Ge, S[re])) {
              dt = re;
              break;
            }
        dt === void 0 ? ue(Ge, I, A, !0) : (rn[dt - de] = j + 1, dt >= ht ? ht = dt : it = !0, x(
          Ge,
          S[dt],
          L,
          null,
          I,
          A,
          q,
          H,
          z
        ), $e++);
      }
      const Fn = it ? ef(rn) : Tn;
      for (re = Fn.length - 1, j = Fe - 1; j >= 0; j--) {
        const Ge = de + j, dt = S[Ge], zn = S[Ge + 1], xr = Ge + 1 < te ? (
          // #13559, fallback to el placeholder for unresolved async component
          zn.el || zn.placeholder
        ) : F;
        rn[j] === 0 ? x(
          null,
          dt,
          L,
          xr,
          I,
          A,
          q,
          H,
          z
        ) : it && (re < 0 || j !== Fn[re] ? ae(dt, L, xr, 2) : re--);
      }
    }
  }, ae = (v, S, L, F, I = null) => {
    const { el: A, type: q, transition: H, children: z, shapeFlag: j } = v;
    if (j & 6) {
      ae(v.component.subTree, S, L, F);
      return;
    }
    if (j & 128) {
      v.suspense.move(S, L, F);
      return;
    }
    if (j & 64) {
      q.move(v, S, L, rt);
      return;
    }
    if (q === gt) {
      r(A, S, L);
      for (let U = 0; U < z.length; U++)
        ae(z[U], S, L, F);
      r(v.anchor, S, L);
      return;
    }
    if (q === ji) {
      P(v, S, L);
      return;
    }
    if (F !== 2 && j & 1 && H)
      if (F === 0)
        H.beforeEnter(A), r(A, S, L), st(() => H.enter(A), I);
      else {
        const { leave: U, delayLeave: Z, afterLeave: se } = H, de = () => {
          v.ctx.isUnmounted ? i(A) : r(A, S, L);
        }, _e = () => {
          A._isLeaving && A[Ec](
            !0
            /* cancelled */
          ), U(A, () => {
            de(), se && se();
          });
        };
        Z ? Z(A, de, _e) : _e();
      }
    else
      r(A, S, L);
  }, ue = (v, S, L, F = !1, I = !1) => {
    const {
      type: A,
      props: q,
      ref: H,
      children: z,
      dynamicChildren: j,
      shapeFlag: te,
      patchFlag: U,
      dirs: Z,
      cacheIndex: se
    } = v;
    if (U === -2 && (I = !1), H != null && (Vt(), Zn(H, null, L, v, !0), Ht()), se != null && (S.renderCache[se] = void 0), te & 256) {
      S.ctx.deactivate(v);
      return;
    }
    const de = te & 1 && Z, _e = !er(v);
    let re;
    if (_e && (re = q && q.onVnodeBeforeUnmount) && Tt(re, S, v), te & 6)
      be(v.component, L, F);
    else {
      if (te & 128) {
        v.suspense.unmount(L, F);
        return;
      }
      de && sn(v, null, S, "beforeUnmount"), te & 64 ? v.type.remove(
        v,
        S,
        L,
        rt,
        F
      ) : j && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !j.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (A !== gt || U > 0 && U & 64) ? ke(
        j,
        S,
        L,
        !1,
        !0
      ) : (A === gt && U & 384 || !I && te & 16) && ke(z, S, L), F && Re(v);
    }
    (_e && (re = q && q.onVnodeUnmounted) || de) && st(() => {
      re && Tt(re, S, v), de && sn(v, null, S, "unmounted");
    }, L);
  }, Re = (v) => {
    const { type: S, el: L, anchor: F, transition: I } = v;
    if (S === gt) {
      ve(L, F);
      return;
    }
    if (S === ji) {
      w(v);
      return;
    }
    const A = () => {
      i(L), I && !I.persisted && I.afterLeave && I.afterLeave();
    };
    if (v.shapeFlag & 1 && I && !I.persisted) {
      const { leave: q, delayLeave: H } = I, z = () => q(L, A);
      H ? H(v.el, A, z) : z();
    } else
      A();
  }, ve = (v, S) => {
    let L;
    for (; v !== S; )
      L = h(v), i(v), v = L;
    i(S);
  }, be = (v, S, L) => {
    const { bum: F, scope: I, job: A, subTree: q, um: H, m: z, a: j } = v;
    xo(z), xo(j), F && Pi(F), I.stop(), A && (A.flags |= 8, ue(q, v, S, L)), H && st(H, S), st(() => {
      v.isUnmounted = !0;
    }, S);
  }, ke = (v, S, L, F = !1, I = !1, A = 0) => {
    for (let q = A; q < v.length; q++)
      ue(v[q], S, L, F, I);
  }, Te = (v) => {
    if (v.shapeFlag & 6)
      return Te(v.component.subTree);
    if (v.shapeFlag & 128)
      return v.suspense.next();
    const S = h(v.anchor || v.el), L = S && S[bc];
    return L ? h(L) : S;
  };
  let Le = !1;
  const De = (v, S, L) => {
    v == null ? S._vnode && ue(S._vnode, null, null, !0) : x(
      S._vnode || null,
      v,
      S,
      null,
      null,
      null,
      L
    ), S._vnode = v, Le || (Le = !0, po(), Wl(), Le = !1);
  }, rt = {
    p: x,
    um: ue,
    m: ae,
    r: Re,
    mt: T,
    mc: W,
    pc: D,
    pbc: ee,
    n: Te,
    o: e
  };
  return {
    render: De,
    hydrate: void 0,
    createApp: Vc(De)
  };
}
function zi({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function on({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Zc(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function fa(e, t, n = !1) {
  const r = e.children, i = t.children;
  if (le(r) && le(i))
    for (let s = 0; s < r.length; s++) {
      const o = r[s];
      let l = i[s];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = i[s] = Zt(i[s]), l.el = o.el), !n && l.patchFlag !== -2 && fa(o, l)), l.type === Si && // avoid cached text nodes retaining detached dom nodes
      l.patchFlag !== -1 && (l.el = o.el), l.type === On && !l.el && (l.el = o.el);
    }
}
function ef(e) {
  const t = e.slice(), n = [0];
  let r, i, s, o, l;
  const a = e.length;
  for (r = 0; r < a; r++) {
    const c = e[r];
    if (c !== 0) {
      if (i = n[n.length - 1], e[i] < c) {
        t[r] = i, n.push(r);
        continue;
      }
      for (s = 0, o = n.length - 1; s < o; )
        l = s + o >> 1, e[n[l]] < c ? s = l + 1 : o = l;
      c < e[n[s]] && (s > 0 && (t[r] = n[s - 1]), n[s] = r);
    }
  }
  for (s = n.length, o = n[s - 1]; s-- > 0; )
    n[s] = o, o = t[o];
  return n;
}
function ha(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : ha(t);
}
function xo(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
const tf = Symbol.for("v-scx"), nf = () => jr(tf);
function Bi(e, t, n) {
  return da(e, t, n);
}
function da(e, t, n = Ee) {
  const { immediate: r, deep: i, flush: s, once: o } = n, l = Ie({}, n), a = t && r || !t && s !== "post";
  let c;
  if (cr) {
    if (s === "sync") {
      const g = nf();
      c = g.__watcherHandles || (g.__watcherHandles = []);
    } else if (!a) {
      const g = () => {
      };
      return g.stop = Lt, g.resume = Lt, g.pause = Lt, g;
    }
  }
  const u = Ke;
  l.call = (g, y, x) => Ot(g, u, y, x);
  let f = !1;
  s === "post" ? l.scheduler = (g) => {
    st(g, u && u.suspense);
  } : s !== "sync" && (f = !0, l.scheduler = (g, y) => {
    y ? g() : Ps(g);
  }), l.augmentJob = (g) => {
    t && (g.flags |= 4), f && (g.flags |= 2, u && (g.id = u.uid, g.i = u));
  };
  const h = mc(e, t, l);
  return cr && (c ? c.push(h) : a && h()), h;
}
function rf(e, t, n) {
  const r = this.proxy, i = Oe(e) ? e.includes(".") ? pa(r, e) : () => r[e] : e.bind(r, r);
  let s;
  ce(t) ? s = t : (s = t.handler, n = t);
  const o = yr(this), l = da(i, s.bind(r), n);
  return o(), l;
}
function pa(e, t) {
  const n = t.split(".");
  return () => {
    let r = e;
    for (let i = 0; i < n.length && r; i++)
      r = r[n[i]];
    return r;
  };
}
const sf = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Et(t)}Modifiers`] || e[`${mt(t)}Modifiers`];
function of(e, t, ...n) {
  if (e.isUnmounted) return;
  const r = e.vnode.props || Ee;
  let i = n;
  const s = t.startsWith("update:"), o = s && sf(r, t.slice(7));
  o && (o.trim && (i = n.map((u) => Oe(u) ? u.trim() : u)), o.number && (i = n.map(Au)));
  let l, a = r[l = Li(t)] || // also try camelCase event handler (#2249)
  r[l = Li(Et(t))];
  !a && s && (a = r[l = Li(mt(t))]), a && Ot(
    a,
    e,
    6,
    i
  );
  const c = r[l + "Once"];
  if (c) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[l])
      return;
    e.emitted[l] = !0, Ot(
      c,
      e,
      6,
      i
    );
  }
}
const lf = /* @__PURE__ */ new WeakMap();
function ga(e, t, n = !1) {
  const r = n ? lf : t.emitsCache, i = r.get(e);
  if (i !== void 0)
    return i;
  const s = e.emits;
  let o = {}, l = !1;
  if (!ce(e)) {
    const a = (c) => {
      const u = ga(c, t, !0);
      u && (l = !0, Ie(o, u));
    };
    !n && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a);
  }
  return !s && !l ? (Ce(e) && r.set(e, null), null) : (le(s) ? s.forEach((a) => o[a] = null) : Ie(o, s), Ce(e) && r.set(e, o), o);
}
function Ei(e, t) {
  return !e || !pi(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), we(e, t[0].toLowerCase() + t.slice(1)) || we(e, mt(t)) || we(e, t));
}
function Eo(e) {
  const {
    type: t,
    vnode: n,
    proxy: r,
    withProxy: i,
    propsOptions: [s],
    slots: o,
    attrs: l,
    emit: a,
    render: c,
    renderCache: u,
    props: f,
    data: h,
    setupState: g,
    ctx: y,
    inheritAttrs: x
  } = e, b = Qr(e);
  let p, k;
  try {
    if (n.shapeFlag & 4) {
      const w = i || r, C = w;
      p = Nt(
        c.call(
          C,
          w,
          u,
          f,
          g,
          h,
          y
        )
      ), k = l;
    } else {
      const w = t;
      p = Nt(
        w.length > 1 ? w(
          f,
          { attrs: l, slots: o, emit: a }
        ) : w(
          f,
          null
        )
      ), k = t.props ? l : af(l);
    }
  } catch (w) {
    nr.length = 0, bi(w, e, 1), p = Gt(On);
  }
  let P = p;
  if (k && x !== !1) {
    const w = Object.keys(k), { shapeFlag: C } = P;
    w.length && C & 7 && (s && w.some(vs) && (k = uf(
      k,
      s
    )), P = In(P, k, !1, !0));
  }
  return n.dirs && (P = In(P, null, !1, !0), P.dirs = P.dirs ? P.dirs.concat(n.dirs) : n.dirs), n.transition && Os(P, n.transition), p = P, Qr(b), p;
}
const af = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || pi(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, uf = (e, t) => {
  const n = {};
  for (const r in e)
    (!vs(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
  return n;
};
function cf(e, t, n) {
  const { props: r, children: i, component: s } = e, { props: o, children: l, patchFlag: a } = t, c = s.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && a >= 0) {
    if (a & 1024)
      return !0;
    if (a & 16)
      return r ? So(r, o, c) : !!o;
    if (a & 8) {
      const u = t.dynamicProps;
      for (let f = 0; f < u.length; f++) {
        const h = u[f];
        if (o[h] !== r[h] && !Ei(c, h))
          return !0;
      }
    }
  } else
    return (i || l) && (!l || !l.$stable) ? !0 : r === o ? !1 : r ? o ? So(r, o, c) : !0 : !!o;
  return !1;
}
function So(e, t, n) {
  const r = Object.keys(t);
  if (r.length !== Object.keys(e).length)
    return !0;
  for (let i = 0; i < r.length; i++) {
    const s = r[i];
    if (t[s] !== e[s] && !Ei(n, s))
      return !0;
  }
  return !1;
}
function ff({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const r = t.subTree;
    if (r.suspense && r.suspense.activeBranch === e && (r.el = e.el), r === e)
      (e = t.vnode).el = n, t = t.parent;
    else
      break;
  }
}
const ma = (e) => e.__isSuspense;
function hf(e, t) {
  t && t.pendingBranch ? le(e) ? t.effects.push(...e) : t.effects.push(e) : _c(e);
}
const gt = Symbol.for("v-fgt"), Si = Symbol.for("v-txt"), On = Symbol.for("v-cmt"), ji = Symbol.for("v-stc"), nr = [];
let ut = null;
function Kt(e = !1) {
  nr.push(ut = e ? null : []);
}
function df() {
  nr.pop(), ut = nr[nr.length - 1] || null;
}
let ur = 1;
function Mo(e, t = !1) {
  ur += e, e < 0 && ut && t && (ut.hasOnce = !0);
}
function pf(e) {
  return e.dynamicChildren = ur > 0 ? ut || Tn : null, df(), ur > 0 && ut && ut.push(e), e;
}
function Xt(e, t, n, r, i, s) {
  return pf(
    lt(
      e,
      t,
      n,
      r,
      i,
      s,
      !0
    )
  );
}
function wa(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Gn(e, t) {
  return e.type === t.type && e.key === t.key;
}
const ya = ({ key: e }) => e ?? null, Dr = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? Oe(e) || je(e) || ce(e) ? { i: wt, r: e, k: t, f: !!n } : e : null);
function lt(e, t = null, n = null, r = 0, i = null, s = e === gt ? 0 : 1, o = !1, l = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && ya(t),
    ref: t && Dr(t),
    scopeId: Xl,
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
    ctx: wt
  };
  return l ? (zs(a, n), s & 128 && e.normalize(a)) : n && (a.shapeFlag |= Oe(n) ? 8 : 16), ur > 0 && // avoid a block node from tracking itself
  !o && // has current parent block
  ut && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || s & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && ut.push(a), a;
}
const Gt = gf;
function gf(e, t = null, n = null, r = 0, i = null, s = !1) {
  if ((!e || e === Ac) && (e = On), wa(e)) {
    const l = In(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && zs(l, n), ur > 0 && !s && ut && (l.shapeFlag & 6 ? ut[ut.indexOf(e)] = l : ut.push(l)), l.patchFlag = -2, l;
  }
  if (kf(e) && (e = e.__vccOpts), t) {
    t = mf(t);
    let { class: l, style: a } = t;
    l && !Oe(l) && (t.class = Ss(l)), Ce(a) && (Ls(a) && !le(a) && (a = Ie({}, a)), t.style = Es(a));
  }
  const o = Oe(e) ? 1 : ma(e) ? 128 : xc(e) ? 64 : Ce(e) ? 4 : ce(e) ? 2 : 0;
  return lt(
    e,
    t,
    n,
    r,
    i,
    o,
    s,
    !0
  );
}
function mf(e) {
  return e ? Ls(e) || sa(e) ? Ie({}, e) : e : null;
}
function In(e, t, n = !1, r = !1) {
  const { props: i, ref: s, patchFlag: o, children: l, transition: a } = e, c = t ? yf(i || {}, t) : i, u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: c,
    key: c && ya(c),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && s ? le(s) ? s.concat(Dr(t)) : [s, Dr(t)] : Dr(t)
    ) : s,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: l,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== gt ? o === -1 ? 16 : o | 16 : o,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: a,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && In(e.ssContent),
    ssFallback: e.ssFallback && In(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return a && r && Os(
    u,
    a.clone(u)
  ), u;
}
function wf(e = " ", t = 0) {
  return Gt(Si, null, e, t);
}
function Nt(e) {
  return e == null || typeof e == "boolean" ? Gt(On) : le(e) ? Gt(
    gt,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : wa(e) ? Zt(e) : Gt(Si, null, String(e));
}
function Zt(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : In(e);
}
function zs(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null)
    t = null;
  else if (le(t))
    n = 16;
  else if (typeof t == "object")
    if (r & 65) {
      const i = t.default;
      i && (i._c && (i._d = !1), zs(e, i()), i._c && (i._d = !0));
      return;
    } else {
      n = 32;
      const i = t._;
      !i && !sa(t) ? t._ctx = wt : i === 3 && wt && (wt.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else ce(t) ? (t = { default: t, _ctx: wt }, n = 32) : (t = String(t), r & 64 ? (n = 16, t = [wf(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function yf(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const i in r)
      if (i === "class")
        t.class !== r.class && (t.class = Ss([t.class, r.class]));
      else if (i === "style")
        t.style = Es([t.style, r.style]);
      else if (pi(i)) {
        const s = t[i], o = r[i];
        o && s !== o && !(le(s) && s.includes(o)) && (t[i] = s ? [].concat(s, o) : o);
      } else i !== "" && (t[i] = r[i]);
  }
  return t;
}
function Tt(e, t, n, r = null) {
  Ot(e, t, 7, [
    n,
    r
  ]);
}
const _f = na();
let vf = 0;
function bf(e, t, n) {
  const r = e.type, i = (t ? t.appContext : e.appContext) || _f, s = {
    uid: vf++,
    vnode: e,
    type: r,
    parent: t,
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
    scope: new Gu(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(i.provides),
    ids: t ? t.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: la(r, i),
    emitsOptions: ga(r, i),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: Ee,
    // inheritAttrs
    inheritAttrs: r.inheritAttrs,
    // state
    ctx: Ee,
    data: Ee,
    props: Ee,
    attrs: Ee,
    slots: Ee,
    refs: Ee,
    setupState: Ee,
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
  return s.ctx = { _: s }, s.root = t ? t.root : s, s.emit = of.bind(null, s), e.ce && e.ce(s), s;
}
let Ke = null;
const xf = () => Ke || wt;
let ti, is;
{
  const e = yi(), t = (n, r) => {
    let i;
    return (i = e[n]) || (i = e[n] = []), i.push(r), (s) => {
      i.length > 1 ? i.forEach((o) => o(s)) : i[0](s);
    };
  };
  ti = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => Ke = n
  ), is = t(
    "__VUE_SSR_SETTERS__",
    (n) => cr = n
  );
}
const yr = (e) => {
  const t = Ke;
  return ti(e), e.scope.on(), () => {
    e.scope.off(), ti(t);
  };
}, To = () => {
  Ke && Ke.scope.off(), ti(null);
};
function _a(e) {
  return e.vnode.shapeFlag & 4;
}
let cr = !1;
function Ef(e, t = !1, n = !1) {
  t && is(t);
  const { props: r, children: i } = e.vnode, s = _a(e);
  qc(e, r, s, t), Xc(e, i, n || t);
  const o = s ? Sf(e, t) : void 0;
  return t && is(!1), o;
}
function Sf(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, $c);
  const { setup: r } = n;
  if (r) {
    Vt();
    const i = e.setupContext = r.length > 1 ? Tf(e) : null, s = yr(e), o = wr(
      r,
      e,
      0,
      [
        e.props,
        i
      ]
    ), l = bl(o);
    if (Ht(), s(), (l || e.sp) && !er(e) && Yl(e), l) {
      if (o.then(To, To), t)
        return o.then((a) => {
          ko(e, a);
        }).catch((a) => {
          bi(a, e, 0);
        });
      e.asyncDep = o;
    } else
      ko(e, o);
  } else
    va(e);
}
function ko(e, t, n) {
  ce(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : Ce(t) && (e.setupState = Vl(t)), va(e);
}
function va(e, t, n) {
  const r = e.type;
  e.render || (e.render = r.render || Lt);
  {
    const i = yr(e);
    Vt();
    try {
      Fc(e);
    } finally {
      Ht(), i();
    }
  }
}
const Mf = {
  get(e, t) {
    return Be(e, "get", ""), e[t];
  }
};
function Tf(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, Mf),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Mi(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Vl(uc(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in tr)
        return tr[n](e);
    },
    has(t, n) {
      return n in t || n in tr;
    }
  })) : e.proxy;
}
function kf(e) {
  return ce(e) && "__vccOpts" in e;
}
const ss = (e, t) => pc(e, t, cr), Cf = "3.5.21";
/**
* @vue/runtime-dom v3.5.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let os;
const Co = typeof window < "u" && window.trustedTypes;
if (Co)
  try {
    os = /* @__PURE__ */ Co.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const ba = os ? (e) => os.createHTML(e) : (e) => e, Nf = "http://www.w3.org/2000/svg", Rf = "http://www.w3.org/1998/Math/MathML", zt = typeof document < "u" ? document : null, No = zt && /* @__PURE__ */ zt.createElement("template"), Lf = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, r) => {
    const i = t === "svg" ? zt.createElementNS(Nf, e) : t === "mathml" ? zt.createElementNS(Rf, e) : n ? zt.createElement(e, { is: n }) : zt.createElement(e);
    return e === "select" && r && r.multiple != null && i.setAttribute("multiple", r.multiple), i;
  },
  createText: (e) => zt.createTextNode(e),
  createComment: (e) => zt.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => zt.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, n, r, i, s) {
    const o = n ? n.previousSibling : t.lastChild;
    if (i && (i === s || i.nextSibling))
      for (; t.insertBefore(i.cloneNode(!0), n), !(i === s || !(i = i.nextSibling)); )
        ;
    else {
      No.innerHTML = ba(
        r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e
      );
      const l = No.content;
      if (r === "svg" || r === "mathml") {
        const a = l.firstChild;
        for (; a.firstChild; )
          l.appendChild(a.firstChild);
        l.removeChild(a);
      }
      t.insertBefore(l, n);
    }
    return [
      // first
      o ? o.nextSibling : t.firstChild,
      // last
      n ? n.previousSibling : t.lastChild
    ];
  }
}, Pf = Symbol("_vtc");
function Of(e, t, n) {
  const r = e[Pf];
  r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const ni = Symbol("_vod"), xa = Symbol("_vsh"), Gr = {
  // used for prop mismatch check during hydration
  name: "show",
  beforeMount(e, { value: t }, { transition: n }) {
    e[ni] = e.style.display === "none" ? "" : e.style.display, n && t ? n.beforeEnter(e) : Vn(e, t);
  },
  mounted(e, { value: t }, { transition: n }) {
    n && t && n.enter(e);
  },
  updated(e, { value: t, oldValue: n }, { transition: r }) {
    !t != !n && (r ? t ? (r.beforeEnter(e), Vn(e, !0), r.enter(e)) : r.leave(e, () => {
      Vn(e, !1);
    }) : Vn(e, t));
  },
  beforeUnmount(e, { value: t }) {
    Vn(e, t);
  }
};
function Vn(e, t) {
  e.style.display = t ? e[ni] : "none", e[xa] = !t;
}
const If = Symbol(""), Af = /(?:^|;)\s*display\s*:/;
function $f(e, t, n) {
  const r = e.style, i = Oe(n);
  let s = !1;
  if (n && !i) {
    if (t)
      if (Oe(t))
        for (const o of t.split(";")) {
          const l = o.slice(0, o.indexOf(":")).trim();
          n[l] == null && Vr(r, l, "");
        }
      else
        for (const o in t)
          n[o] == null && Vr(r, o, "");
    for (const o in n)
      o === "display" && (s = !0), Vr(r, o, n[o]);
  } else if (i) {
    if (t !== n) {
      const o = r[If];
      o && (n += ";" + o), r.cssText = n, s = Af.test(n);
    }
  } else t && e.removeAttribute("style");
  ni in e && (e[ni] = s ? r.display : "", e[xa] && (r.display = "none"));
}
const Ro = /\s*!important$/;
function Vr(e, t, n) {
  if (le(n))
    n.forEach((r) => Vr(e, t, r));
  else if (n == null && (n = ""), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const r = Ff(e, t);
    Ro.test(n) ? e.setProperty(
      mt(r),
      n.replace(Ro, ""),
      "important"
    ) : e[r] = n;
  }
}
const Lo = ["Webkit", "Moz", "ms"], Di = {};
function Ff(e, t) {
  const n = Di[t];
  if (n)
    return n;
  let r = Et(t);
  if (r !== "filter" && r in e)
    return Di[t] = r;
  r = El(r);
  for (let i = 0; i < Lo.length; i++) {
    const s = Lo[i] + r;
    if (s in e)
      return Di[t] = s;
  }
  return t;
}
const Po = "http://www.w3.org/1999/xlink";
function Oo(e, t, n, r, i, s = Du(t)) {
  r && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(Po, t.slice(6, t.length)) : e.setAttributeNS(Po, t, n) : n == null || s && !Ml(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    s ? "" : nn(n) ? String(n) : n
  );
}
function Io(e, t, n, r, i) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? ba(n) : n);
    return;
  }
  const s = e.tagName;
  if (t === "value" && s !== "PROGRESS" && // custom elements may use _value internally
  !s.includes("-")) {
    const l = s === "OPTION" ? e.getAttribute("value") || "" : e.value, a = n == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      e.type === "checkbox" ? "on" : ""
    ) : String(n);
    (l !== a || !("_value" in e)) && (e.value = a), n == null && e.removeAttribute(t), e._value = n;
    return;
  }
  let o = !1;
  if (n === "" || n == null) {
    const l = typeof e[t];
    l === "boolean" ? n = Ml(n) : n == null && l === "string" ? (n = "", o = !0) : l === "number" && (n = 0, o = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  o && e.removeAttribute(i || t);
}
function zf(e, t, n, r) {
  e.addEventListener(t, n, r);
}
function Bf(e, t, n, r) {
  e.removeEventListener(t, n, r);
}
const Ao = Symbol("_vei");
function jf(e, t, n, r, i = null) {
  const s = e[Ao] || (e[Ao] = {}), o = s[t];
  if (r && o)
    o.value = r;
  else {
    const [l, a] = Df(t);
    if (r) {
      const c = s[t] = Hf(
        r,
        i
      );
      zf(e, l, c, a);
    } else o && (Bf(e, l, o, a), s[t] = void 0);
  }
}
const $o = /(?:Once|Passive|Capture)$/;
function Df(e) {
  let t;
  if ($o.test(e)) {
    t = {};
    let r;
    for (; r = e.match($o); )
      e = e.slice(0, e.length - r[0].length), t[r[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : mt(e.slice(2)), t];
}
let Gi = 0;
const Gf = /* @__PURE__ */ Promise.resolve(), Vf = () => Gi || (Gf.then(() => Gi = 0), Gi = Date.now());
function Hf(e, t) {
  const n = (r) => {
    if (!r._vts)
      r._vts = Date.now();
    else if (r._vts <= n.attached)
      return;
    Ot(
      qf(r, n.value),
      t,
      5,
      [r]
    );
  };
  return n.value = e, n.attached = Vf(), n;
}
function qf(e, t) {
  if (le(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0;
    }, t.map(
      (r) => (i) => !i._stopped && r && r(i)
    );
  } else
    return t;
}
const Fo = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Uf = (e, t, n, r, i, s) => {
  const o = i === "svg";
  t === "class" ? Of(e, r, o) : t === "style" ? $f(e, n, r) : pi(t) ? vs(t) || jf(e, t, n, r, s) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Wf(e, t, r, o)) ? (Io(e, t, r), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Oo(e, t, r, o, s, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && (/[A-Z]/.test(t) || !Oe(r)) ? Io(e, Et(t), r, s, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), Oo(e, t, r, o));
};
function Wf(e, t, n, r) {
  if (r)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Fo(t) && ce(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const i = e.tagName;
    if (i === "IMG" || i === "VIDEO" || i === "CANVAS" || i === "SOURCE")
      return !1;
  }
  return Fo(t) && Oe(n) ? !1 : t in e;
}
const zo = {};
// @__NO_SIDE_EFFECTS__
function Kf(e, t, n) {
  let r = /* @__PURE__ */ Is(e, t);
  mi(r) && (r = Ie({}, r, t));
  class i extends Bs {
    constructor(o) {
      super(r, o, n);
    }
  }
  return i.def = r, i;
}
const Xf = typeof HTMLElement < "u" ? HTMLElement : class {
};
class Bs extends Xf {
  constructor(t, n = {}, r = jo) {
    super(), this._def = t, this._props = n, this._createApp = r, this._isVueCE = !0, this._instance = null, this._app = null, this._nonce = this._def.nonce, this._connected = !1, this._resolved = !1, this._numberProps = null, this._styleChildren = /* @__PURE__ */ new WeakSet(), this._ob = null, this.shadowRoot && r !== jo ? this._root = this.shadowRoot : t.shadowRoot !== !1 ? (this.attachShadow({ mode: "open" }), this._root = this.shadowRoot) : this._root = this;
  }
  connectedCallback() {
    if (!this.isConnected) return;
    !this.shadowRoot && !this._resolved && this._parseSlots(), this._connected = !0;
    let t = this;
    for (; t = t && (t.parentNode || t.host); )
      if (t instanceof Bs) {
        this._parent = t;
        break;
      }
    this._instance || (this._resolved ? this._mount(this._def) : t && t._pendingResolve ? this._pendingResolve = t._pendingResolve.then(() => {
      this._pendingResolve = void 0, this._resolveDef();
    }) : this._resolveDef());
  }
  _setParent(t = this._parent) {
    t && (this._instance.parent = t._instance, this._inheritParentContext(t));
  }
  _inheritParentContext(t = this._parent) {
    t && this._app && Object.setPrototypeOf(
      this._app._context.provides,
      t._instance.provides
    );
  }
  disconnectedCallback() {
    this._connected = !1, ql(() => {
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
    const t = (r, i = !1) => {
      this._resolved = !0, this._pendingResolve = void 0;
      const { props: s, styles: o } = r;
      let l;
      if (s && !le(s))
        for (const a in s) {
          const c = s[a];
          (c === Number || c && c.type === Number) && (a in this._props && (this._props[a] = ao(this._props[a])), (l || (l = /* @__PURE__ */ Object.create(null)))[Et(a)] = !0);
        }
      this._numberProps = l, this._resolveProps(r), this.shadowRoot && this._applyStyles(o), this._mount(r);
    }, n = this._def.__asyncLoader;
    n ? this._pendingResolve = n().then((r) => {
      r.configureApp = this._def.configureApp, t(this._def = r, !0);
    }) : t(this._def);
  }
  _mount(t) {
    this._app = this._createApp(t), this._inheritParentContext(), t.configureApp && t.configureApp(this._app), this._app._ceVNode = this._createVNode(), this._app.mount(this._root);
    const n = this._instance && this._instance.exposed;
    if (n)
      for (const r in n)
        we(this, r) || Object.defineProperty(this, r, {
          // unwrap ref to be consistent with public instance behavior
          get: () => lr(n[r])
        });
  }
  _resolveProps(t) {
    const { props: n } = t, r = le(n) ? n : Object.keys(n || {});
    for (const i of Object.keys(this))
      i[0] !== "_" && r.includes(i) && this._setProp(i, this[i]);
    for (const i of r.map(Et))
      Object.defineProperty(this, i, {
        get() {
          return this._getProp(i);
        },
        set(s) {
          this._setProp(i, s, !0, !0);
        }
      });
  }
  _setAttr(t) {
    if (t.startsWith("data-v-")) return;
    const n = this.hasAttribute(t);
    let r = n ? this.getAttribute(t) : zo;
    const i = Et(t);
    n && this._numberProps && this._numberProps[i] && (r = ao(r)), this._setProp(i, r, !1, !0);
  }
  /**
   * @internal
   */
  _getProp(t) {
    return this._props[t];
  }
  /**
   * @internal
   */
  _setProp(t, n, r = !0, i = !1) {
    if (n !== this._props[t] && (n === zo ? delete this._props[t] : (this._props[t] = n, t === "key" && this._app && (this._app._ceVNode.key = n)), i && this._instance && this._update(), r)) {
      const s = this._ob;
      s && s.disconnect(), n === !0 ? this.setAttribute(mt(t), "") : typeof n == "string" || typeof n == "number" ? this.setAttribute(mt(t), n + "") : n || this.removeAttribute(mt(t)), s && s.observe(this, { attributes: !0 });
    }
  }
  _update() {
    const t = this._createVNode();
    this._app && (t.appContext = this._app._context), Jf(t, this._root);
  }
  _createVNode() {
    const t = {};
    this.shadowRoot || (t.onVnodeMounted = t.onVnodeUpdated = this._renderSlots.bind(this));
    const n = Gt(this._def, Ie(t, this._props));
    return this._instance || (n.ce = (r) => {
      this._instance = r, r.ce = this, r.isCE = !0;
      const i = (s, o) => {
        this.dispatchEvent(
          new CustomEvent(
            s,
            mi(o[0]) ? Ie({ detail: o }, o[0]) : { detail: o }
          )
        );
      };
      r.emit = (s, ...o) => {
        i(s, o), mt(s) !== s && i(mt(s), o);
      }, this._setParent();
    }), n;
  }
  _applyStyles(t, n) {
    if (!t) return;
    if (n) {
      if (n === this._def || this._styleChildren.has(n))
        return;
      this._styleChildren.add(n);
    }
    const r = this._nonce;
    for (let i = t.length - 1; i >= 0; i--) {
      const s = document.createElement("style");
      r && s.setAttribute("nonce", r), s.textContent = t[i], this.shadowRoot.prepend(s);
    }
  }
  /**
   * Only called when shadowRoot is false
   */
  _parseSlots() {
    const t = this._slots = {};
    let n;
    for (; n = this.firstChild; ) {
      const r = n.nodeType === 1 && n.getAttribute("slot") || "default";
      (t[r] || (t[r] = [])).push(n), this.removeChild(n);
    }
  }
  /**
   * Only called when shadowRoot is false
   */
  _renderSlots() {
    const t = (this._teleportTarget || this).querySelectorAll("slot"), n = this._instance.type.__scopeId;
    for (let r = 0; r < t.length; r++) {
      const i = t[r], s = i.getAttribute("name") || "default", o = this._slots[s], l = i.parentNode;
      if (o)
        for (const a of o) {
          if (n && a.nodeType === 1) {
            const c = n + "-s", u = document.createTreeWalker(a, 1);
            a.setAttribute(c, "");
            let f;
            for (; f = u.nextNode(); )
              f.setAttribute(c, "");
          }
          l.insertBefore(a, i);
        }
      else
        for (; i.firstChild; ) l.insertBefore(i.firstChild, i);
      l.removeChild(i);
    }
  }
  /**
   * @internal
   */
  _injectChildStyle(t) {
    this._applyStyles(t.styles, t);
  }
  /**
   * @internal
   */
  _removeChildStyle(t) {
  }
}
const Yf = /* @__PURE__ */ Ie({ patchProp: Uf }, Lf);
let Bo;
function Ea() {
  return Bo || (Bo = Jc(Yf));
}
const Jf = (...e) => {
  Ea().render(...e);
}, jo = (...e) => {
  const t = Ea().createApp(...e), { mount: n } = t;
  return t.mount = (r) => {
    const i = Zf(r);
    if (!i) return;
    const s = t._component;
    !ce(s) && !s.render && !s.template && (s.template = i.innerHTML), i.nodeType === 1 && (i.textContent = "");
    const o = n(i, !1, Qf(i));
    return i instanceof Element && (i.removeAttribute("v-cloak"), i.setAttribute("data-v-app", "")), o;
  }, t;
};
function Qf(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function Zf(e) {
  return Oe(e) ? document.querySelector(e) : e;
}
const eh = { class: "graph-controller__controls-overview" }, th = { key: 0 }, nh = { key: 1 }, rh = { key: 0 }, ih = { key: 1 }, sh = /* @__PURE__ */ Is({
  __name: "GraphControls",
  props: {
    showHeader: { type: Boolean },
    showControlsGraph: { type: Boolean },
    showLatexInfo: { type: Boolean },
    showControlsEnvironment: { type: Boolean },
    platformType: {}
  },
  setup(e) {
    const t = e, n = [
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
        desktop: t.showLatexInfo ? "Left-click on label, $$ for $\\LaTeX$" : "Left-click on label",
        touch: t.showLatexInfo ? "Tap on label, $$ for $\\LaTeX$" : "Tap on label"
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
    let s = t.platformType === "mobile" || t.platformType === "tablet";
    return (o, l) => (Kt(), Xt("table", eh, [
      Br(lt("thead", null, [
        lt("tr", null, [
          lt("th", null, Ft(i[0]), 1),
          lt("th", null, Ft(i[1]), 1)
        ])
      ], 512), [
        [Gr, t.showHeader]
      ]),
      lt("tbody", null, [
        (Kt(), Xt(gt, null, mo(n, (a) => Br(lt("tr", {
          key: a.action
        }, [
          lt("td", null, Ft(a.action), 1),
          lr(s) ? (Kt(), Xt("td", th, Ft(a.touch), 1)) : (Kt(), Xt("td", nh, Ft(a.desktop), 1))
        ]), [
          [Gr, t.showControlsGraph]
        ])), 64)),
        (Kt(), Xt(gt, null, mo(r, (a) => Br(lt("tr", {
          key: a.action
        }, [
          lt("td", null, Ft(a.action), 1),
          lr(s) ? (Kt(), Xt("td", rh, Ft(a.touch), 1)) : (Kt(), Xt("td", ih, Ft(a.desktop), 1))
        ]), [
          [Gr, t.showControlsEnvironment]
        ])), 64))
      ])
    ]));
  }
}), oh = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [r, i] of t)
    n[r] = i;
  return n;
}, lh = /* @__PURE__ */ oh(sh, [["__scopeId", "data-v-8c3d818f"]]);
var ah = { value: () => {
} };
function _r() {
  for (var e = 0, t = arguments.length, n = {}, r; e < t; ++e) {
    if (!(r = arguments[e] + "") || r in n || /[\s.]/.test(r)) throw new Error("illegal type: " + r);
    n[r] = [];
  }
  return new Hr(n);
}
function Hr(e) {
  this._ = e;
}
function uh(e, t) {
  return e.trim().split(/^|\s+/).map(function(n) {
    var r = "", i = n.indexOf(".");
    if (i >= 0 && (r = n.slice(i + 1), n = n.slice(0, i)), n && !t.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: r };
  });
}
Hr.prototype = _r.prototype = {
  constructor: Hr,
  on: function(e, t) {
    var n = this._, r = uh(e + "", n), i, s = -1, o = r.length;
    if (arguments.length < 2) {
      for (; ++s < o; ) if ((i = (e = r[s]).type) && (i = ch(n[i], e.name))) return i;
      return;
    }
    if (t != null && typeof t != "function") throw new Error("invalid callback: " + t);
    for (; ++s < o; )
      if (i = (e = r[s]).type) n[i] = Do(n[i], e.name, t);
      else if (t == null) for (i in n) n[i] = Do(n[i], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, t = this._;
    for (var n in t) e[n] = t[n].slice();
    return new Hr(e);
  },
  call: function(e, t) {
    if ((i = arguments.length - 2) > 0) for (var n = new Array(i), r = 0, i, s; r < i; ++r) n[r] = arguments[r + 2];
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (s = this._[e], r = 0, i = s.length; r < i; ++r) s[r].value.apply(t, n);
  },
  apply: function(e, t, n) {
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (var r = this._[e], i = 0, s = r.length; i < s; ++i) r[i].value.apply(t, n);
  }
};
function ch(e, t) {
  for (var n = 0, r = e.length, i; n < r; ++n)
    if ((i = e[n]).name === t)
      return i.value;
}
function Do(e, t, n) {
  for (var r = 0, i = e.length; r < i; ++r)
    if (e[r].name === t) {
      e[r] = ah, e = e.slice(0, r).concat(e.slice(r + 1));
      break;
    }
  return n != null && e.push({ name: t, value: n }), e;
}
var ls = "http://www.w3.org/1999/xhtml";
const Go = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: ls,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Ti(e) {
  var t = e += "", n = t.indexOf(":");
  return n >= 0 && (t = e.slice(0, n)) !== "xmlns" && (e = e.slice(n + 1)), Go.hasOwnProperty(t) ? { space: Go[t], local: e } : e;
}
function fh(e) {
  return function() {
    var t = this.ownerDocument, n = this.namespaceURI;
    return n === ls && t.documentElement.namespaceURI === ls ? t.createElement(e) : t.createElementNS(n, e);
  };
}
function hh(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function Sa(e) {
  var t = Ti(e);
  return (t.local ? hh : fh)(t);
}
function dh() {
}
function js(e) {
  return e == null ? dh : function() {
    return this.querySelector(e);
  };
}
function ph(e) {
  typeof e != "function" && (e = js(e));
  for (var t = this._groups, n = t.length, r = new Array(n), i = 0; i < n; ++i)
    for (var s = t[i], o = s.length, l = r[i] = new Array(o), a, c, u = 0; u < o; ++u)
      (a = s[u]) && (c = e.call(a, a.__data__, u, s)) && ("__data__" in a && (c.__data__ = a.__data__), l[u] = c);
  return new ft(r, this._parents);
}
function gh(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function mh() {
  return [];
}
function Ma(e) {
  return e == null ? mh : function() {
    return this.querySelectorAll(e);
  };
}
function wh(e) {
  return function() {
    return gh(e.apply(this, arguments));
  };
}
function yh(e) {
  typeof e == "function" ? e = wh(e) : e = Ma(e);
  for (var t = this._groups, n = t.length, r = [], i = [], s = 0; s < n; ++s)
    for (var o = t[s], l = o.length, a, c = 0; c < l; ++c)
      (a = o[c]) && (r.push(e.call(a, a.__data__, c, o)), i.push(a));
  return new ft(r, i);
}
function Ta(e) {
  return function() {
    return this.matches(e);
  };
}
function ka(e) {
  return function(t) {
    return t.matches(e);
  };
}
var _h = Array.prototype.find;
function vh(e) {
  return function() {
    return _h.call(this.children, e);
  };
}
function bh() {
  return this.firstElementChild;
}
function xh(e) {
  return this.select(e == null ? bh : vh(typeof e == "function" ? e : ka(e)));
}
var Eh = Array.prototype.filter;
function Sh() {
  return Array.from(this.children);
}
function Mh(e) {
  return function() {
    return Eh.call(this.children, e);
  };
}
function Th(e) {
  return this.selectAll(e == null ? Sh : Mh(typeof e == "function" ? e : ka(e)));
}
function kh(e) {
  typeof e != "function" && (e = Ta(e));
  for (var t = this._groups, n = t.length, r = new Array(n), i = 0; i < n; ++i)
    for (var s = t[i], o = s.length, l = r[i] = [], a, c = 0; c < o; ++c)
      (a = s[c]) && e.call(a, a.__data__, c, s) && l.push(a);
  return new ft(r, this._parents);
}
function Ca(e) {
  return new Array(e.length);
}
function Ch() {
  return new ft(this._enter || this._groups.map(Ca), this._parents);
}
function ri(e, t) {
  this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
ri.prototype = {
  constructor: ri,
  appendChild: function(e) {
    return this._parent.insertBefore(e, this._next);
  },
  insertBefore: function(e, t) {
    return this._parent.insertBefore(e, t);
  },
  querySelector: function(e) {
    return this._parent.querySelector(e);
  },
  querySelectorAll: function(e) {
    return this._parent.querySelectorAll(e);
  }
};
function Nh(e) {
  return function() {
    return e;
  };
}
function Rh(e, t, n, r, i, s) {
  for (var o = 0, l, a = t.length, c = s.length; o < c; ++o)
    (l = t[o]) ? (l.__data__ = s[o], r[o] = l) : n[o] = new ri(e, s[o]);
  for (; o < a; ++o)
    (l = t[o]) && (i[o] = l);
}
function Lh(e, t, n, r, i, s, o) {
  var l, a, c = /* @__PURE__ */ new Map(), u = t.length, f = s.length, h = new Array(u), g;
  for (l = 0; l < u; ++l)
    (a = t[l]) && (h[l] = g = o.call(a, a.__data__, l, t) + "", c.has(g) ? i[l] = a : c.set(g, a));
  for (l = 0; l < f; ++l)
    g = o.call(e, s[l], l, s) + "", (a = c.get(g)) ? (r[l] = a, a.__data__ = s[l], c.delete(g)) : n[l] = new ri(e, s[l]);
  for (l = 0; l < u; ++l)
    (a = t[l]) && c.get(h[l]) === a && (i[l] = a);
}
function Ph(e) {
  return e.__data__;
}
function Oh(e, t) {
  if (!arguments.length) return Array.from(this, Ph);
  var n = t ? Lh : Rh, r = this._parents, i = this._groups;
  typeof e != "function" && (e = Nh(e));
  for (var s = i.length, o = new Array(s), l = new Array(s), a = new Array(s), c = 0; c < s; ++c) {
    var u = r[c], f = i[c], h = f.length, g = Ih(e.call(u, u && u.__data__, c, r)), y = g.length, x = l[c] = new Array(y), b = o[c] = new Array(y), p = a[c] = new Array(h);
    n(u, f, x, b, p, g, t);
    for (var k = 0, P = 0, w, C; k < y; ++k)
      if (w = x[k]) {
        for (k >= P && (P = k + 1); !(C = b[P]) && ++P < y; ) ;
        w._next = C || null;
      }
  }
  return o = new ft(o, r), o._enter = l, o._exit = a, o;
}
function Ih(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function Ah() {
  return new ft(this._exit || this._groups.map(Ca), this._parents);
}
function $h(e, t, n) {
  var r = this.enter(), i = this, s = this.exit();
  return typeof e == "function" ? (r = e(r), r && (r = r.selection())) : r = r.append(e + ""), t != null && (i = t(i), i && (i = i.selection())), n == null ? s.remove() : n(s), r && i ? r.merge(i).order() : i;
}
function Fh(e) {
  for (var t = e.selection ? e.selection() : e, n = this._groups, r = t._groups, i = n.length, s = r.length, o = Math.min(i, s), l = new Array(i), a = 0; a < o; ++a)
    for (var c = n[a], u = r[a], f = c.length, h = l[a] = new Array(f), g, y = 0; y < f; ++y)
      (g = c[y] || u[y]) && (h[y] = g);
  for (; a < i; ++a)
    l[a] = n[a];
  return new ft(l, this._parents);
}
function zh() {
  for (var e = this._groups, t = -1, n = e.length; ++t < n; )
    for (var r = e[t], i = r.length - 1, s = r[i], o; --i >= 0; )
      (o = r[i]) && (s && o.compareDocumentPosition(s) ^ 4 && s.parentNode.insertBefore(o, s), s = o);
  return this;
}
function Bh(e) {
  e || (e = jh);
  function t(f, h) {
    return f && h ? e(f.__data__, h.__data__) : !f - !h;
  }
  for (var n = this._groups, r = n.length, i = new Array(r), s = 0; s < r; ++s) {
    for (var o = n[s], l = o.length, a = i[s] = new Array(l), c, u = 0; u < l; ++u)
      (c = o[u]) && (a[u] = c);
    a.sort(t);
  }
  return new ft(i, this._parents).order();
}
function jh(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function Dh() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function Gh() {
  return Array.from(this);
}
function Vh() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var r = e[t], i = 0, s = r.length; i < s; ++i) {
      var o = r[i];
      if (o) return o;
    }
  return null;
}
function Hh() {
  let e = 0;
  for (const t of this) ++e;
  return e;
}
function qh() {
  return !this.node();
}
function Uh(e) {
  for (var t = this._groups, n = 0, r = t.length; n < r; ++n)
    for (var i = t[n], s = 0, o = i.length, l; s < o; ++s)
      (l = i[s]) && e.call(l, l.__data__, s, i);
  return this;
}
function Wh(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function Kh(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function Xh(e, t) {
  return function() {
    this.setAttribute(e, t);
  };
}
function Yh(e, t) {
  return function() {
    this.setAttributeNS(e.space, e.local, t);
  };
}
function Jh(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttribute(e) : this.setAttribute(e, n);
  };
}
function Qh(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, n);
  };
}
function Zh(e, t) {
  var n = Ti(e);
  if (arguments.length < 2) {
    var r = this.node();
    return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n);
  }
  return this.each((t == null ? n.local ? Kh : Wh : typeof t == "function" ? n.local ? Qh : Jh : n.local ? Yh : Xh)(n, t));
}
function Na(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function ed(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function td(e, t, n) {
  return function() {
    this.style.setProperty(e, t, n);
  };
}
function nd(e, t, n) {
  return function() {
    var r = t.apply(this, arguments);
    r == null ? this.style.removeProperty(e) : this.style.setProperty(e, r, n);
  };
}
function rd(e, t, n) {
  return arguments.length > 1 ? this.each((t == null ? ed : typeof t == "function" ? nd : td)(e, t, n ?? "")) : An(this.node(), e);
}
function An(e, t) {
  return e.style.getPropertyValue(t) || Na(e).getComputedStyle(e, null).getPropertyValue(t);
}
function id(e) {
  return function() {
    delete this[e];
  };
}
function sd(e, t) {
  return function() {
    this[e] = t;
  };
}
function od(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? delete this[e] : this[e] = n;
  };
}
function ld(e, t) {
  return arguments.length > 1 ? this.each((t == null ? id : typeof t == "function" ? od : sd)(e, t)) : this.node()[e];
}
function Ra(e) {
  return e.trim().split(/^|\s+/);
}
function Ds(e) {
  return e.classList || new La(e);
}
function La(e) {
  this._node = e, this._names = Ra(e.getAttribute("class") || "");
}
La.prototype = {
  add: function(e) {
    var t = this._names.indexOf(e);
    t < 0 && (this._names.push(e), this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function(e) {
    var t = this._names.indexOf(e);
    t >= 0 && (this._names.splice(t, 1), this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function(e) {
    return this._names.indexOf(e) >= 0;
  }
};
function Pa(e, t) {
  for (var n = Ds(e), r = -1, i = t.length; ++r < i; ) n.add(t[r]);
}
function Oa(e, t) {
  for (var n = Ds(e), r = -1, i = t.length; ++r < i; ) n.remove(t[r]);
}
function ad(e) {
  return function() {
    Pa(this, e);
  };
}
function ud(e) {
  return function() {
    Oa(this, e);
  };
}
function cd(e, t) {
  return function() {
    (t.apply(this, arguments) ? Pa : Oa)(this, e);
  };
}
function fd(e, t) {
  var n = Ra(e + "");
  if (arguments.length < 2) {
    for (var r = Ds(this.node()), i = -1, s = n.length; ++i < s; ) if (!r.contains(n[i])) return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? cd : t ? ad : ud)(n, t));
}
function hd() {
  this.textContent = "";
}
function dd(e) {
  return function() {
    this.textContent = e;
  };
}
function pd(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function gd(e) {
  return arguments.length ? this.each(e == null ? hd : (typeof e == "function" ? pd : dd)(e)) : this.node().textContent;
}
function md() {
  this.innerHTML = "";
}
function wd(e) {
  return function() {
    this.innerHTML = e;
  };
}
function yd(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function _d(e) {
  return arguments.length ? this.each(e == null ? md : (typeof e == "function" ? yd : wd)(e)) : this.node().innerHTML;
}
function vd() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function bd() {
  return this.each(vd);
}
function xd() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Ed() {
  return this.each(xd);
}
function Sd(e) {
  var t = typeof e == "function" ? e : Sa(e);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function Md() {
  return null;
}
function Td(e, t) {
  var n = typeof e == "function" ? e : Sa(e), r = t == null ? Md : typeof t == "function" ? t : js(t);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function kd() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function Cd() {
  return this.each(kd);
}
function Nd() {
  var e = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Rd() {
  var e = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Ld(e) {
  return this.select(e ? Rd : Nd);
}
function Pd(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function Od(e) {
  return function(t) {
    e.call(this, t, this.__data__);
  };
}
function Id(e) {
  return e.trim().split(/^|\s+/).map(function(t) {
    var n = "", r = t.indexOf(".");
    return r >= 0 && (n = t.slice(r + 1), t = t.slice(0, r)), { type: t, name: n };
  });
}
function Ad(e) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var n = 0, r = -1, i = t.length, s; n < i; ++n)
        s = t[n], (!e.type || s.type === e.type) && s.name === e.name ? this.removeEventListener(s.type, s.listener, s.options) : t[++r] = s;
      ++r ? t.length = r : delete this.__on;
    }
  };
}
function $d(e, t, n) {
  return function() {
    var r = this.__on, i, s = Od(t);
    if (r) {
      for (var o = 0, l = r.length; o < l; ++o)
        if ((i = r[o]).type === e.type && i.name === e.name) {
          this.removeEventListener(i.type, i.listener, i.options), this.addEventListener(i.type, i.listener = s, i.options = n), i.value = t;
          return;
        }
    }
    this.addEventListener(e.type, s, n), i = { type: e.type, name: e.name, value: t, listener: s, options: n }, r ? r.push(i) : this.__on = [i];
  };
}
function Fd(e, t, n) {
  var r = Id(e + ""), i, s = r.length, o;
  if (arguments.length < 2) {
    var l = this.node().__on;
    if (l) {
      for (var a = 0, c = l.length, u; a < c; ++a)
        for (i = 0, u = l[a]; i < s; ++i)
          if ((o = r[i]).type === u.type && o.name === u.name)
            return u.value;
    }
    return;
  }
  for (l = t ? $d : Ad, i = 0; i < s; ++i) this.each(l(r[i], t, n));
  return this;
}
function Ia(e, t, n) {
  var r = Na(e), i = r.CustomEvent;
  typeof i == "function" ? i = new i(t, n) : (i = r.document.createEvent("Event"), n ? (i.initEvent(t, n.bubbles, n.cancelable), i.detail = n.detail) : i.initEvent(t, !1, !1)), e.dispatchEvent(i);
}
function zd(e, t) {
  return function() {
    return Ia(this, e, t);
  };
}
function Bd(e, t) {
  return function() {
    return Ia(this, e, t.apply(this, arguments));
  };
}
function jd(e, t) {
  return this.each((typeof t == "function" ? Bd : zd)(e, t));
}
function* Dd() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var r = e[t], i = 0, s = r.length, o; i < s; ++i)
      (o = r[i]) && (yield o);
}
var Aa = [null];
function ft(e, t) {
  this._groups = e, this._parents = t;
}
function vr() {
  return new ft([[document.documentElement]], Aa);
}
function Gd() {
  return this;
}
ft.prototype = vr.prototype = {
  constructor: ft,
  select: ph,
  selectAll: yh,
  selectChild: xh,
  selectChildren: Th,
  filter: kh,
  data: Oh,
  enter: Ch,
  exit: Ah,
  join: $h,
  merge: Fh,
  selection: Gd,
  order: zh,
  sort: Bh,
  call: Dh,
  nodes: Gh,
  node: Vh,
  size: Hh,
  empty: qh,
  each: Uh,
  attr: Zh,
  style: rd,
  property: ld,
  classed: fd,
  text: gd,
  html: _d,
  raise: bd,
  lower: Ed,
  append: Sd,
  insert: Td,
  remove: Cd,
  clone: Ld,
  datum: Pd,
  on: Fd,
  dispatch: jd,
  [Symbol.iterator]: Dd
};
function pe(e) {
  return typeof e == "string" ? new ft([[document.querySelector(e)]], [document.documentElement]) : new ft([[e]], Aa);
}
function $a(e) {
  let t;
  for (; t = e.sourceEvent; ) e = t;
  return e;
}
function pt(e, t) {
  if (e = $a(e), t === void 0 && (t = e.currentTarget), t) {
    var n = t.ownerSVGElement || t;
    if (n.createSVGPoint) {
      var r = n.createSVGPoint();
      return r.x = e.clientX, r.y = e.clientY, r = r.matrixTransform(t.getScreenCTM().inverse()), [r.x, r.y];
    }
    if (t.getBoundingClientRect) {
      var i = t.getBoundingClientRect();
      return [e.clientX - i.left - t.clientLeft, e.clientY - i.top - t.clientTop];
    }
  }
  return [e.pageX, e.pageY];
}
function Vd(e, t) {
  return e.target && (e = $a(e), t === void 0 && (t = e.currentTarget), e = e.touches || [e]), Array.from(e, (n) => pt(n, t));
}
const Hd = { passive: !1 }, fr = { capture: !0, passive: !1 };
function Vi(e) {
  e.stopImmediatePropagation();
}
function Ln(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function Fa(e) {
  var t = e.document.documentElement, n = pe(e).on("dragstart.drag", Ln, fr);
  "onselectstart" in t ? n.on("selectstart.drag", Ln, fr) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function za(e, t) {
  var n = e.document.documentElement, r = pe(e).on("dragstart.drag", null);
  t && (r.on("click.drag", Ln, fr), setTimeout(function() {
    r.on("click.drag", null);
  }, 0)), "onselectstart" in n ? r.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
const Nr = (e) => () => e;
function as(e, {
  sourceEvent: t,
  subject: n,
  target: r,
  identifier: i,
  active: s,
  x: o,
  y: l,
  dx: a,
  dy: c,
  dispatch: u
}) {
  Object.defineProperties(this, {
    type: { value: e, enumerable: !0, configurable: !0 },
    sourceEvent: { value: t, enumerable: !0, configurable: !0 },
    subject: { value: n, enumerable: !0, configurable: !0 },
    target: { value: r, enumerable: !0, configurable: !0 },
    identifier: { value: i, enumerable: !0, configurable: !0 },
    active: { value: s, enumerable: !0, configurable: !0 },
    x: { value: o, enumerable: !0, configurable: !0 },
    y: { value: l, enumerable: !0, configurable: !0 },
    dx: { value: a, enumerable: !0, configurable: !0 },
    dy: { value: c, enumerable: !0, configurable: !0 },
    _: { value: u }
  });
}
as.prototype.on = function() {
  var e = this._.on.apply(this._, arguments);
  return e === this._ ? this : e;
};
function qd(e) {
  return !e.ctrlKey && !e.button;
}
function Ud() {
  return this.parentNode;
}
function Wd(e, t) {
  return t ?? { x: e.x, y: e.y };
}
function Kd() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Xd() {
  var e = qd, t = Ud, n = Wd, r = Kd, i = {}, s = _r("start", "drag", "end"), o = 0, l, a, c, u, f = 0;
  function h(w) {
    w.on("mousedown.drag", g).filter(r).on("touchstart.drag", b).on("touchmove.drag", p, Hd).on("touchend.drag touchcancel.drag", k).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function g(w, C) {
    if (!(u || !e.call(this, w, C))) {
      var B = P(this, t.call(this, w, C), w, C, "mouse");
      B && (pe(w.view).on("mousemove.drag", y, fr).on("mouseup.drag", x, fr), Fa(w.view), Vi(w), c = !1, l = w.clientX, a = w.clientY, B("start", w));
    }
  }
  function y(w) {
    if (Ln(w), !c) {
      var C = w.clientX - l, B = w.clientY - a;
      c = C * C + B * B > f;
    }
    i.mouse("drag", w);
  }
  function x(w) {
    pe(w.view).on("mousemove.drag mouseup.drag", null), za(w.view, c), Ln(w), i.mouse("end", w);
  }
  function b(w, C) {
    if (e.call(this, w, C)) {
      var B = w.changedTouches, G = t.call(this, w, C), W = B.length, Q, ee;
      for (Q = 0; Q < W; ++Q)
        (ee = P(this, G, w, C, B[Q].identifier, B[Q])) && (Vi(w), ee("start", w, B[Q]));
    }
  }
  function p(w) {
    var C = w.changedTouches, B = C.length, G, W;
    for (G = 0; G < B; ++G)
      (W = i[C[G].identifier]) && (Ln(w), W("drag", w, C[G]));
  }
  function k(w) {
    var C = w.changedTouches, B = C.length, G, W;
    for (u && clearTimeout(u), u = setTimeout(function() {
      u = null;
    }, 500), G = 0; G < B; ++G)
      (W = i[C[G].identifier]) && (Vi(w), W("end", w, C[G]));
  }
  function P(w, C, B, G, W, Q) {
    var ee = s.copy(), oe = pt(Q || B, C), he, K, T;
    if ((T = n.call(w, new as("beforestart", {
      sourceEvent: B,
      target: h,
      identifier: W,
      active: o,
      x: oe[0],
      y: oe[1],
      dx: 0,
      dy: 0,
      dispatch: ee
    }), G)) != null)
      return he = T.x - oe[0] || 0, K = T.y - oe[1] || 0, function V(N, $, D) {
        var X = oe, Y;
        switch (N) {
          case "start":
            i[W] = V, Y = o++;
            break;
          case "end":
            delete i[W], --o;
          case "drag":
            oe = pt(D || $, C), Y = o;
            break;
        }
        ee.call(
          N,
          w,
          new as(N, {
            sourceEvent: $,
            subject: T,
            target: h,
            identifier: W,
            active: Y,
            x: oe[0] + he,
            y: oe[1] + K,
            dx: oe[0] - X[0],
            dy: oe[1] - X[1],
            dispatch: ee
          }),
          G
        );
      };
  }
  return h.filter = function(w) {
    return arguments.length ? (e = typeof w == "function" ? w : Nr(!!w), h) : e;
  }, h.container = function(w) {
    return arguments.length ? (t = typeof w == "function" ? w : Nr(w), h) : t;
  }, h.subject = function(w) {
    return arguments.length ? (n = typeof w == "function" ? w : Nr(w), h) : n;
  }, h.touchable = function(w) {
    return arguments.length ? (r = typeof w == "function" ? w : Nr(!!w), h) : r;
  }, h.on = function() {
    var w = s.on.apply(s, arguments);
    return w === s ? h : w;
  }, h.clickDistance = function(w) {
    return arguments.length ? (f = (w = +w) * w, h) : Math.sqrt(f);
  }, h;
}
function Gs(e, t, n) {
  e.prototype = t.prototype = n, n.constructor = e;
}
function Ba(e, t) {
  var n = Object.create(e.prototype);
  for (var r in t) n[r] = t[r];
  return n;
}
function br() {
}
var hr = 0.7, ii = 1 / hr, Pn = "\\s*([+-]?\\d+)\\s*", dr = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Pt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", Yd = /^#([0-9a-f]{3,8})$/, Jd = new RegExp(`^rgb\\(${Pn},${Pn},${Pn}\\)$`), Qd = new RegExp(`^rgb\\(${Pt},${Pt},${Pt}\\)$`), Zd = new RegExp(`^rgba\\(${Pn},${Pn},${Pn},${dr}\\)$`), ep = new RegExp(`^rgba\\(${Pt},${Pt},${Pt},${dr}\\)$`), tp = new RegExp(`^hsl\\(${dr},${Pt},${Pt}\\)$`), np = new RegExp(`^hsla\\(${dr},${Pt},${Pt},${dr}\\)$`), Vo = {
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
Gs(br, gn, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Ho,
  // Deprecated! Use color.formatHex.
  formatHex: Ho,
  formatHex8: rp,
  formatHsl: ip,
  formatRgb: qo,
  toString: qo
});
function Ho() {
  return this.rgb().formatHex();
}
function rp() {
  return this.rgb().formatHex8();
}
function ip() {
  return ja(this).formatHsl();
}
function qo() {
  return this.rgb().formatRgb();
}
function gn(e) {
  var t, n;
  return e = (e + "").trim().toLowerCase(), (t = Yd.exec(e)) ? (n = t[1].length, t = parseInt(t[1], 16), n === 6 ? Uo(t) : n === 3 ? new nt(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : n === 8 ? Rr(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : n === 4 ? Rr(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = Jd.exec(e)) ? new nt(t[1], t[2], t[3], 1) : (t = Qd.exec(e)) ? new nt(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = Zd.exec(e)) ? Rr(t[1], t[2], t[3], t[4]) : (t = ep.exec(e)) ? Rr(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = tp.exec(e)) ? Xo(t[1], t[2] / 100, t[3] / 100, 1) : (t = np.exec(e)) ? Xo(t[1], t[2] / 100, t[3] / 100, t[4]) : Vo.hasOwnProperty(e) ? Uo(Vo[e]) : e === "transparent" ? new nt(NaN, NaN, NaN, 0) : null;
}
function Uo(e) {
  return new nt(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function Rr(e, t, n, r) {
  return r <= 0 && (e = t = n = NaN), new nt(e, t, n, r);
}
function sp(e) {
  return e instanceof br || (e = gn(e)), e ? (e = e.rgb(), new nt(e.r, e.g, e.b, e.opacity)) : new nt();
}
function us(e, t, n, r) {
  return arguments.length === 1 ? sp(e) : new nt(e, t, n, r ?? 1);
}
function nt(e, t, n, r) {
  this.r = +e, this.g = +t, this.b = +n, this.opacity = +r;
}
Gs(nt, us, Ba(br, {
  brighter(e) {
    return e = e == null ? ii : Math.pow(ii, e), new nt(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? hr : Math.pow(hr, e), new nt(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new nt(pn(this.r), pn(this.g), pn(this.b), si(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Wo,
  // Deprecated! Use color.formatHex.
  formatHex: Wo,
  formatHex8: op,
  formatRgb: Ko,
  toString: Ko
}));
function Wo() {
  return `#${hn(this.r)}${hn(this.g)}${hn(this.b)}`;
}
function op() {
  return `#${hn(this.r)}${hn(this.g)}${hn(this.b)}${hn((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Ko() {
  const e = si(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${pn(this.r)}, ${pn(this.g)}, ${pn(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function si(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function pn(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function hn(e) {
  return e = pn(e), (e < 16 ? "0" : "") + e.toString(16);
}
function Xo(e, t, n, r) {
  return r <= 0 ? e = t = n = NaN : n <= 0 || n >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new xt(e, t, n, r);
}
function ja(e) {
  if (e instanceof xt) return new xt(e.h, e.s, e.l, e.opacity);
  if (e instanceof br || (e = gn(e)), !e) return new xt();
  if (e instanceof xt) return e;
  e = e.rgb();
  var t = e.r / 255, n = e.g / 255, r = e.b / 255, i = Math.min(t, n, r), s = Math.max(t, n, r), o = NaN, l = s - i, a = (s + i) / 2;
  return l ? (t === s ? o = (n - r) / l + (n < r) * 6 : n === s ? o = (r - t) / l + 2 : o = (t - n) / l + 4, l /= a < 0.5 ? s + i : 2 - s - i, o *= 60) : l = a > 0 && a < 1 ? 0 : o, new xt(o, l, a, e.opacity);
}
function lp(e, t, n, r) {
  return arguments.length === 1 ? ja(e) : new xt(e, t, n, r ?? 1);
}
function xt(e, t, n, r) {
  this.h = +e, this.s = +t, this.l = +n, this.opacity = +r;
}
Gs(xt, lp, Ba(br, {
  brighter(e) {
    return e = e == null ? ii : Math.pow(ii, e), new xt(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? hr : Math.pow(hr, e), new xt(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, n = this.l, r = n + (n < 0.5 ? n : 1 - n) * t, i = 2 * n - r;
    return new nt(
      Hi(e >= 240 ? e - 240 : e + 120, i, r),
      Hi(e, i, r),
      Hi(e < 120 ? e + 240 : e - 120, i, r),
      this.opacity
    );
  },
  clamp() {
    return new xt(Yo(this.h), Lr(this.s), Lr(this.l), si(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = si(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${Yo(this.h)}, ${Lr(this.s) * 100}%, ${Lr(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function Yo(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function Lr(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function Hi(e, t, n) {
  return (e < 60 ? t + (n - t) * e / 60 : e < 180 ? n : e < 240 ? t + (n - t) * (240 - e) / 60 : t) * 255;
}
const Vs = (e) => () => e;
function ap(e, t) {
  return function(n) {
    return e + n * t;
  };
}
function up(e, t, n) {
  return e = Math.pow(e, n), t = Math.pow(t, n) - e, n = 1 / n, function(r) {
    return Math.pow(e + r * t, n);
  };
}
function cp(e) {
  return (e = +e) == 1 ? Da : function(t, n) {
    return n - t ? up(t, n, e) : Vs(isNaN(t) ? n : t);
  };
}
function Da(e, t) {
  var n = t - e;
  return n ? ap(e, n) : Vs(isNaN(e) ? t : e);
}
const oi = function e(t) {
  var n = cp(t);
  function r(i, s) {
    var o = n((i = us(i)).r, (s = us(s)).r), l = n(i.g, s.g), a = n(i.b, s.b), c = Da(i.opacity, s.opacity);
    return function(u) {
      return i.r = o(u), i.g = l(u), i.b = a(u), i.opacity = c(u), i + "";
    };
  }
  return r.gamma = e, r;
}(1);
function fp(e, t) {
  t || (t = []);
  var n = e ? Math.min(t.length, e.length) : 0, r = t.slice(), i;
  return function(s) {
    for (i = 0; i < n; ++i) r[i] = e[i] * (1 - s) + t[i] * s;
    return r;
  };
}
function hp(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function dp(e, t) {
  var n = t ? t.length : 0, r = e ? Math.min(n, e.length) : 0, i = new Array(r), s = new Array(n), o;
  for (o = 0; o < r; ++o) i[o] = Hs(e[o], t[o]);
  for (; o < n; ++o) s[o] = t[o];
  return function(l) {
    for (o = 0; o < r; ++o) s[o] = i[o](l);
    return s;
  };
}
function pp(e, t) {
  var n = /* @__PURE__ */ new Date();
  return e = +e, t = +t, function(r) {
    return n.setTime(e * (1 - r) + t * r), n;
  };
}
function Rt(e, t) {
  return e = +e, t = +t, function(n) {
    return e * (1 - n) + t * n;
  };
}
function gp(e, t) {
  var n = {}, r = {}, i;
  (e === null || typeof e != "object") && (e = {}), (t === null || typeof t != "object") && (t = {});
  for (i in t)
    i in e ? n[i] = Hs(e[i], t[i]) : r[i] = t[i];
  return function(s) {
    for (i in n) r[i] = n[i](s);
    return r;
  };
}
var cs = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, qi = new RegExp(cs.source, "g");
function mp(e) {
  return function() {
    return e;
  };
}
function wp(e) {
  return function(t) {
    return e(t) + "";
  };
}
function Ga(e, t) {
  var n = cs.lastIndex = qi.lastIndex = 0, r, i, s, o = -1, l = [], a = [];
  for (e = e + "", t = t + ""; (r = cs.exec(e)) && (i = qi.exec(t)); )
    (s = i.index) > n && (s = t.slice(n, s), l[o] ? l[o] += s : l[++o] = s), (r = r[0]) === (i = i[0]) ? l[o] ? l[o] += i : l[++o] = i : (l[++o] = null, a.push({ i: o, x: Rt(r, i) })), n = qi.lastIndex;
  return n < t.length && (s = t.slice(n), l[o] ? l[o] += s : l[++o] = s), l.length < 2 ? a[0] ? wp(a[0].x) : mp(t) : (t = a.length, function(c) {
    for (var u = 0, f; u < t; ++u) l[(f = a[u]).i] = f.x(c);
    return l.join("");
  });
}
function Hs(e, t) {
  var n = typeof t, r;
  return t == null || n === "boolean" ? Vs(t) : (n === "number" ? Rt : n === "string" ? (r = gn(t)) ? (t = r, oi) : Ga : t instanceof gn ? oi : t instanceof Date ? pp : hp(t) ? fp : Array.isArray(t) ? dp : typeof t.valueOf != "function" && typeof t.toString != "function" || isNaN(t) ? gp : Rt)(e, t);
}
var Jo = 180 / Math.PI, fs = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function Va(e, t, n, r, i, s) {
  var o, l, a;
  return (o = Math.sqrt(e * e + t * t)) && (e /= o, t /= o), (a = e * n + t * r) && (n -= e * a, r -= t * a), (l = Math.sqrt(n * n + r * r)) && (n /= l, r /= l, a /= l), e * r < t * n && (e = -e, t = -t, a = -a, o = -o), {
    translateX: i,
    translateY: s,
    rotate: Math.atan2(t, e) * Jo,
    skewX: Math.atan(a) * Jo,
    scaleX: o,
    scaleY: l
  };
}
var Pr;
function yp(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? fs : Va(t.a, t.b, t.c, t.d, t.e, t.f);
}
function _p(e) {
  return e == null || (Pr || (Pr = document.createElementNS("http://www.w3.org/2000/svg", "g")), Pr.setAttribute("transform", e), !(e = Pr.transform.baseVal.consolidate())) ? fs : (e = e.matrix, Va(e.a, e.b, e.c, e.d, e.e, e.f));
}
function Ha(e, t, n, r) {
  function i(c) {
    return c.length ? c.pop() + " " : "";
  }
  function s(c, u, f, h, g, y) {
    if (c !== f || u !== h) {
      var x = g.push("translate(", null, t, null, n);
      y.push({ i: x - 4, x: Rt(c, f) }, { i: x - 2, x: Rt(u, h) });
    } else (f || h) && g.push("translate(" + f + t + h + n);
  }
  function o(c, u, f, h) {
    c !== u ? (c - u > 180 ? u += 360 : u - c > 180 && (c += 360), h.push({ i: f.push(i(f) + "rotate(", null, r) - 2, x: Rt(c, u) })) : u && f.push(i(f) + "rotate(" + u + r);
  }
  function l(c, u, f, h) {
    c !== u ? h.push({ i: f.push(i(f) + "skewX(", null, r) - 2, x: Rt(c, u) }) : u && f.push(i(f) + "skewX(" + u + r);
  }
  function a(c, u, f, h, g, y) {
    if (c !== f || u !== h) {
      var x = g.push(i(g) + "scale(", null, ",", null, ")");
      y.push({ i: x - 4, x: Rt(c, f) }, { i: x - 2, x: Rt(u, h) });
    } else (f !== 1 || h !== 1) && g.push(i(g) + "scale(" + f + "," + h + ")");
  }
  return function(c, u) {
    var f = [], h = [];
    return c = e(c), u = e(u), s(c.translateX, c.translateY, u.translateX, u.translateY, f, h), o(c.rotate, u.rotate, f, h), l(c.skewX, u.skewX, f, h), a(c.scaleX, c.scaleY, u.scaleX, u.scaleY, f, h), c = u = null, function(g) {
      for (var y = -1, x = h.length, b; ++y < x; ) f[(b = h[y]).i] = b.x(g);
      return f.join("");
    };
  };
}
var vp = Ha(yp, "px, ", "px)", "deg)"), bp = Ha(_p, ", ", ")", ")"), xp = 1e-12;
function Qo(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function Ep(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function Sp(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const Mp = function e(t, n, r) {
  function i(s, o) {
    var l = s[0], a = s[1], c = s[2], u = o[0], f = o[1], h = o[2], g = u - l, y = f - a, x = g * g + y * y, b, p;
    if (x < xp)
      p = Math.log(h / c) / t, b = function(G) {
        return [
          l + G * g,
          a + G * y,
          c * Math.exp(t * G * p)
        ];
      };
    else {
      var k = Math.sqrt(x), P = (h * h - c * c + r * x) / (2 * c * n * k), w = (h * h - c * c - r * x) / (2 * h * n * k), C = Math.log(Math.sqrt(P * P + 1) - P), B = Math.log(Math.sqrt(w * w + 1) - w);
      p = (B - C) / t, b = function(G) {
        var W = G * p, Q = Qo(C), ee = c / (n * k) * (Q * Sp(t * W + C) - Ep(C));
        return [
          l + ee * g,
          a + ee * y,
          c * Q / Qo(t * W + C)
        ];
      };
    }
    return b.duration = p * 1e3 * t / Math.SQRT2, b;
  }
  return i.rho = function(s) {
    var o = Math.max(1e-3, +s), l = o * o, a = l * l;
    return e(o, l, a);
  }, i;
}(Math.SQRT2, 2, 4);
var $n = 0, Wn = 0, Hn = 0, qa = 1e3, li, Kn, ai = 0, mn = 0, ki = 0, pr = typeof performance == "object" && performance.now ? performance : Date, Ua = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function qs() {
  return mn || (Ua(Tp), mn = pr.now() + ki);
}
function Tp() {
  mn = 0;
}
function ui() {
  this._call = this._time = this._next = null;
}
ui.prototype = Us.prototype = {
  constructor: ui,
  restart: function(e, t, n) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    n = (n == null ? qs() : +n) + (t == null ? 0 : +t), !this._next && Kn !== this && (Kn ? Kn._next = this : li = this, Kn = this), this._call = e, this._time = n, hs();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, hs());
  }
};
function Us(e, t, n) {
  var r = new ui();
  return r.restart(e, t, n), r;
}
function kp() {
  qs(), ++$n;
  for (var e = li, t; e; )
    (t = mn - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --$n;
}
function Zo() {
  mn = (ai = pr.now()) + ki, $n = Wn = 0;
  try {
    kp();
  } finally {
    $n = 0, Np(), mn = 0;
  }
}
function Cp() {
  var e = pr.now(), t = e - ai;
  t > qa && (ki -= t, ai = e);
}
function Np() {
  for (var e, t = li, n, r = 1 / 0; t; )
    t._call ? (r > t._time && (r = t._time), e = t, t = t._next) : (n = t._next, t._next = null, t = e ? e._next = n : li = n);
  Kn = e, hs(r);
}
function hs(e) {
  if (!$n) {
    Wn && (Wn = clearTimeout(Wn));
    var t = e - mn;
    t > 24 ? (e < 1 / 0 && (Wn = setTimeout(Zo, e - pr.now() - ki)), Hn && (Hn = clearInterval(Hn))) : (Hn || (ai = pr.now(), Hn = setInterval(Cp, qa)), $n = 1, Ua(Zo));
  }
}
function el(e, t, n) {
  var r = new ui();
  return t = t == null ? 0 : +t, r.restart((i) => {
    r.stop(), e(i + t);
  }, t, n), r;
}
var Rp = _r("start", "end", "cancel", "interrupt"), Lp = [], Wa = 0, tl = 1, ds = 2, qr = 3, nl = 4, ps = 5, Ur = 6;
function Ci(e, t, n, r, i, s) {
  var o = e.__transition;
  if (!o) e.__transition = {};
  else if (n in o) return;
  Pp(e, n, {
    name: t,
    index: r,
    // For context during callback.
    group: i,
    // For context during callback.
    on: Rp,
    tween: Lp,
    time: s.time,
    delay: s.delay,
    duration: s.duration,
    ease: s.ease,
    timer: null,
    state: Wa
  });
}
function Ws(e, t) {
  var n = Mt(e, t);
  if (n.state > Wa) throw new Error("too late; already scheduled");
  return n;
}
function It(e, t) {
  var n = Mt(e, t);
  if (n.state > qr) throw new Error("too late; already running");
  return n;
}
function Mt(e, t) {
  var n = e.__transition;
  if (!n || !(n = n[t])) throw new Error("transition not found");
  return n;
}
function Pp(e, t, n) {
  var r = e.__transition, i;
  r[t] = n, n.timer = Us(s, 0, n.time);
  function s(c) {
    n.state = tl, n.timer.restart(o, n.delay, n.time), n.delay <= c && o(c - n.delay);
  }
  function o(c) {
    var u, f, h, g;
    if (n.state !== tl) return a();
    for (u in r)
      if (g = r[u], g.name === n.name) {
        if (g.state === qr) return el(o);
        g.state === nl ? (g.state = Ur, g.timer.stop(), g.on.call("interrupt", e, e.__data__, g.index, g.group), delete r[u]) : +u < t && (g.state = Ur, g.timer.stop(), g.on.call("cancel", e, e.__data__, g.index, g.group), delete r[u]);
      }
    if (el(function() {
      n.state === qr && (n.state = nl, n.timer.restart(l, n.delay, n.time), l(c));
    }), n.state = ds, n.on.call("start", e, e.__data__, n.index, n.group), n.state === ds) {
      for (n.state = qr, i = new Array(h = n.tween.length), u = 0, f = -1; u < h; ++u)
        (g = n.tween[u].value.call(e, e.__data__, n.index, n.group)) && (i[++f] = g);
      i.length = f + 1;
    }
  }
  function l(c) {
    for (var u = c < n.duration ? n.ease.call(null, c / n.duration) : (n.timer.restart(a), n.state = ps, 1), f = -1, h = i.length; ++f < h; )
      i[f].call(e, u);
    n.state === ps && (n.on.call("end", e, e.__data__, n.index, n.group), a());
  }
  function a() {
    n.state = Ur, n.timer.stop(), delete r[t];
    for (var c in r) return;
    delete e.__transition;
  }
}
function Wr(e, t) {
  var n = e.__transition, r, i, s = !0, o;
  if (n) {
    t = t == null ? null : t + "";
    for (o in n) {
      if ((r = n[o]).name !== t) {
        s = !1;
        continue;
      }
      i = r.state > ds && r.state < ps, r.state = Ur, r.timer.stop(), r.on.call(i ? "interrupt" : "cancel", e, e.__data__, r.index, r.group), delete n[o];
    }
    s && delete e.__transition;
  }
}
function Op(e) {
  return this.each(function() {
    Wr(this, e);
  });
}
function Ip(e, t) {
  var n, r;
  return function() {
    var i = It(this, e), s = i.tween;
    if (s !== n) {
      r = n = s;
      for (var o = 0, l = r.length; o < l; ++o)
        if (r[o].name === t) {
          r = r.slice(), r.splice(o, 1);
          break;
        }
    }
    i.tween = r;
  };
}
function Ap(e, t, n) {
  var r, i;
  if (typeof n != "function") throw new Error();
  return function() {
    var s = It(this, e), o = s.tween;
    if (o !== r) {
      i = (r = o).slice();
      for (var l = { name: t, value: n }, a = 0, c = i.length; a < c; ++a)
        if (i[a].name === t) {
          i[a] = l;
          break;
        }
      a === c && i.push(l);
    }
    s.tween = i;
  };
}
function $p(e, t) {
  var n = this._id;
  if (e += "", arguments.length < 2) {
    for (var r = Mt(this.node(), n).tween, i = 0, s = r.length, o; i < s; ++i)
      if ((o = r[i]).name === e)
        return o.value;
    return null;
  }
  return this.each((t == null ? Ip : Ap)(n, e, t));
}
function Ks(e, t, n) {
  var r = e._id;
  return e.each(function() {
    var i = It(this, r);
    (i.value || (i.value = {}))[t] = n.apply(this, arguments);
  }), function(i) {
    return Mt(i, r).value[t];
  };
}
function Ka(e, t) {
  var n;
  return (typeof t == "number" ? Rt : t instanceof gn ? oi : (n = gn(t)) ? (t = n, oi) : Ga)(e, t);
}
function Fp(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function zp(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function Bp(e, t, n) {
  var r, i = n + "", s;
  return function() {
    var o = this.getAttribute(e);
    return o === i ? null : o === r ? s : s = t(r = o, n);
  };
}
function jp(e, t, n) {
  var r, i = n + "", s;
  return function() {
    var o = this.getAttributeNS(e.space, e.local);
    return o === i ? null : o === r ? s : s = t(r = o, n);
  };
}
function Dp(e, t, n) {
  var r, i, s;
  return function() {
    var o, l = n(this), a;
    return l == null ? void this.removeAttribute(e) : (o = this.getAttribute(e), a = l + "", o === a ? null : o === r && a === i ? s : (i = a, s = t(r = o, l)));
  };
}
function Gp(e, t, n) {
  var r, i, s;
  return function() {
    var o, l = n(this), a;
    return l == null ? void this.removeAttributeNS(e.space, e.local) : (o = this.getAttributeNS(e.space, e.local), a = l + "", o === a ? null : o === r && a === i ? s : (i = a, s = t(r = o, l)));
  };
}
function Vp(e, t) {
  var n = Ti(e), r = n === "transform" ? bp : Ka;
  return this.attrTween(e, typeof t == "function" ? (n.local ? Gp : Dp)(n, r, Ks(this, "attr." + e, t)) : t == null ? (n.local ? zp : Fp)(n) : (n.local ? jp : Bp)(n, r, t));
}
function Hp(e, t) {
  return function(n) {
    this.setAttribute(e, t.call(this, n));
  };
}
function qp(e, t) {
  return function(n) {
    this.setAttributeNS(e.space, e.local, t.call(this, n));
  };
}
function Up(e, t) {
  var n, r;
  function i() {
    var s = t.apply(this, arguments);
    return s !== r && (n = (r = s) && qp(e, s)), n;
  }
  return i._value = t, i;
}
function Wp(e, t) {
  var n, r;
  function i() {
    var s = t.apply(this, arguments);
    return s !== r && (n = (r = s) && Hp(e, s)), n;
  }
  return i._value = t, i;
}
function Kp(e, t) {
  var n = "attr." + e;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  var r = Ti(e);
  return this.tween(n, (r.local ? Up : Wp)(r, t));
}
function Xp(e, t) {
  return function() {
    Ws(this, e).delay = +t.apply(this, arguments);
  };
}
function Yp(e, t) {
  return t = +t, function() {
    Ws(this, e).delay = t;
  };
}
function Jp(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? Xp : Yp)(t, e)) : Mt(this.node(), t).delay;
}
function Qp(e, t) {
  return function() {
    It(this, e).duration = +t.apply(this, arguments);
  };
}
function Zp(e, t) {
  return t = +t, function() {
    It(this, e).duration = t;
  };
}
function eg(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? Qp : Zp)(t, e)) : Mt(this.node(), t).duration;
}
function tg(e, t) {
  if (typeof t != "function") throw new Error();
  return function() {
    It(this, e).ease = t;
  };
}
function ng(e) {
  var t = this._id;
  return arguments.length ? this.each(tg(t, e)) : Mt(this.node(), t).ease;
}
function rg(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    It(this, e).ease = n;
  };
}
function ig(e) {
  if (typeof e != "function") throw new Error();
  return this.each(rg(this._id, e));
}
function sg(e) {
  typeof e != "function" && (e = Ta(e));
  for (var t = this._groups, n = t.length, r = new Array(n), i = 0; i < n; ++i)
    for (var s = t[i], o = s.length, l = r[i] = [], a, c = 0; c < o; ++c)
      (a = s[c]) && e.call(a, a.__data__, c, s) && l.push(a);
  return new qt(r, this._parents, this._name, this._id);
}
function og(e) {
  if (e._id !== this._id) throw new Error();
  for (var t = this._groups, n = e._groups, r = t.length, i = n.length, s = Math.min(r, i), o = new Array(r), l = 0; l < s; ++l)
    for (var a = t[l], c = n[l], u = a.length, f = o[l] = new Array(u), h, g = 0; g < u; ++g)
      (h = a[g] || c[g]) && (f[g] = h);
  for (; l < r; ++l)
    o[l] = t[l];
  return new qt(o, this._parents, this._name, this._id);
}
function lg(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var n = t.indexOf(".");
    return n >= 0 && (t = t.slice(0, n)), !t || t === "start";
  });
}
function ag(e, t, n) {
  var r, i, s = lg(t) ? Ws : It;
  return function() {
    var o = s(this, e), l = o.on;
    l !== r && (i = (r = l).copy()).on(t, n), o.on = i;
  };
}
function ug(e, t) {
  var n = this._id;
  return arguments.length < 2 ? Mt(this.node(), n).on.on(e) : this.each(ag(n, e, t));
}
function cg(e) {
  return function() {
    var t = this.parentNode;
    for (var n in this.__transition) if (+n !== e) return;
    t && t.removeChild(this);
  };
}
function fg() {
  return this.on("end.remove", cg(this._id));
}
function hg(e) {
  var t = this._name, n = this._id;
  typeof e != "function" && (e = js(e));
  for (var r = this._groups, i = r.length, s = new Array(i), o = 0; o < i; ++o)
    for (var l = r[o], a = l.length, c = s[o] = new Array(a), u, f, h = 0; h < a; ++h)
      (u = l[h]) && (f = e.call(u, u.__data__, h, l)) && ("__data__" in u && (f.__data__ = u.__data__), c[h] = f, Ci(c[h], t, n, h, c, Mt(u, n)));
  return new qt(s, this._parents, t, n);
}
function dg(e) {
  var t = this._name, n = this._id;
  typeof e != "function" && (e = Ma(e));
  for (var r = this._groups, i = r.length, s = [], o = [], l = 0; l < i; ++l)
    for (var a = r[l], c = a.length, u, f = 0; f < c; ++f)
      if (u = a[f]) {
        for (var h = e.call(u, u.__data__, f, a), g, y = Mt(u, n), x = 0, b = h.length; x < b; ++x)
          (g = h[x]) && Ci(g, t, n, x, h, y);
        s.push(h), o.push(u);
      }
  return new qt(s, o, t, n);
}
var pg = vr.prototype.constructor;
function gg() {
  return new pg(this._groups, this._parents);
}
function mg(e, t) {
  var n, r, i;
  return function() {
    var s = An(this, e), o = (this.style.removeProperty(e), An(this, e));
    return s === o ? null : s === n && o === r ? i : i = t(n = s, r = o);
  };
}
function Xa(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function wg(e, t, n) {
  var r, i = n + "", s;
  return function() {
    var o = An(this, e);
    return o === i ? null : o === r ? s : s = t(r = o, n);
  };
}
function yg(e, t, n) {
  var r, i, s;
  return function() {
    var o = An(this, e), l = n(this), a = l + "";
    return l == null && (a = l = (this.style.removeProperty(e), An(this, e))), o === a ? null : o === r && a === i ? s : (i = a, s = t(r = o, l));
  };
}
function _g(e, t) {
  var n, r, i, s = "style." + t, o = "end." + s, l;
  return function() {
    var a = It(this, e), c = a.on, u = a.value[s] == null ? l || (l = Xa(t)) : void 0;
    (c !== n || i !== u) && (r = (n = c).copy()).on(o, i = u), a.on = r;
  };
}
function vg(e, t, n) {
  var r = (e += "") == "transform" ? vp : Ka;
  return t == null ? this.styleTween(e, mg(e, r)).on("end.style." + e, Xa(e)) : typeof t == "function" ? this.styleTween(e, yg(e, r, Ks(this, "style." + e, t))).each(_g(this._id, e)) : this.styleTween(e, wg(e, r, t), n).on("end.style." + e, null);
}
function bg(e, t, n) {
  return function(r) {
    this.style.setProperty(e, t.call(this, r), n);
  };
}
function xg(e, t, n) {
  var r, i;
  function s() {
    var o = t.apply(this, arguments);
    return o !== i && (r = (i = o) && bg(e, o, n)), r;
  }
  return s._value = t, s;
}
function Eg(e, t, n) {
  var r = "style." + (e += "");
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (t == null) return this.tween(r, null);
  if (typeof t != "function") throw new Error();
  return this.tween(r, xg(e, t, n ?? ""));
}
function Sg(e) {
  return function() {
    this.textContent = e;
  };
}
function Mg(e) {
  return function() {
    var t = e(this);
    this.textContent = t ?? "";
  };
}
function Tg(e) {
  return this.tween("text", typeof e == "function" ? Mg(Ks(this, "text", e)) : Sg(e == null ? "" : e + ""));
}
function kg(e) {
  return function(t) {
    this.textContent = e.call(this, t);
  };
}
function Cg(e) {
  var t, n;
  function r() {
    var i = e.apply(this, arguments);
    return i !== n && (t = (n = i) && kg(i)), t;
  }
  return r._value = e, r;
}
function Ng(e) {
  var t = "text";
  if (arguments.length < 1) return (t = this.tween(t)) && t._value;
  if (e == null) return this.tween(t, null);
  if (typeof e != "function") throw new Error();
  return this.tween(t, Cg(e));
}
function Rg() {
  for (var e = this._name, t = this._id, n = Ya(), r = this._groups, i = r.length, s = 0; s < i; ++s)
    for (var o = r[s], l = o.length, a, c = 0; c < l; ++c)
      if (a = o[c]) {
        var u = Mt(a, t);
        Ci(a, e, n, c, o, {
          time: u.time + u.delay + u.duration,
          delay: 0,
          duration: u.duration,
          ease: u.ease
        });
      }
  return new qt(r, this._parents, e, n);
}
function Lg() {
  var e, t, n = this, r = n._id, i = n.size();
  return new Promise(function(s, o) {
    var l = { value: o }, a = { value: function() {
      --i === 0 && s();
    } };
    n.each(function() {
      var c = It(this, r), u = c.on;
      u !== e && (t = (e = u).copy(), t._.cancel.push(l), t._.interrupt.push(l), t._.end.push(a)), c.on = t;
    }), i === 0 && s();
  });
}
var Pg = 0;
function qt(e, t, n, r) {
  this._groups = e, this._parents = t, this._name = n, this._id = r;
}
function Ya() {
  return ++Pg;
}
var $t = vr.prototype;
qt.prototype = {
  constructor: qt,
  select: hg,
  selectAll: dg,
  selectChild: $t.selectChild,
  selectChildren: $t.selectChildren,
  filter: sg,
  merge: og,
  selection: gg,
  transition: Rg,
  call: $t.call,
  nodes: $t.nodes,
  node: $t.node,
  size: $t.size,
  empty: $t.empty,
  each: $t.each,
  on: ug,
  attr: Vp,
  attrTween: Kp,
  style: vg,
  styleTween: Eg,
  text: Tg,
  textTween: Ng,
  remove: fg,
  tween: $p,
  delay: Jp,
  duration: eg,
  ease: ng,
  easeVarying: ig,
  end: Lg,
  [Symbol.iterator]: $t[Symbol.iterator]
};
const rl = (e) => +e;
function Og(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var Ig = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Og
};
function Ag(e, t) {
  for (var n; !(n = e.__transition) || !(n = n[t]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${t} not found`);
  return n;
}
function $g(e) {
  var t, n;
  e instanceof qt ? (t = e._id, e = e._name) : (t = Ya(), (n = Ig).time = qs(), e = e == null ? null : e + "");
  for (var r = this._groups, i = r.length, s = 0; s < i; ++s)
    for (var o = r[s], l = o.length, a, c = 0; c < l; ++c)
      (a = o[c]) && Ci(a, e, t, c, o, n || Ag(a, t));
  return new qt(r, this._parents, e, t);
}
vr.prototype.interrupt = Op;
vr.prototype.transition = $g;
const gs = Math.PI, ms = 2 * gs, fn = 1e-6, Fg = ms - fn;
function Ja(e) {
  this._ += e[0];
  for (let t = 1, n = e.length; t < n; ++t)
    this._ += arguments[t] + e[t];
}
function zg(e) {
  let t = Math.floor(e);
  if (!(t >= 0)) throw new Error(`invalid digits: ${e}`);
  if (t > 15) return Ja;
  const n = 10 ** t;
  return function(r) {
    this._ += r[0];
    for (let i = 1, s = r.length; i < s; ++i)
      this._ += Math.round(arguments[i] * n) / n + r[i];
  };
}
class Bg {
  constructor(t) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null, this._ = "", this._append = t == null ? Ja : zg(t);
  }
  moveTo(t, n) {
    this._append`M${this._x0 = this._x1 = +t},${this._y0 = this._y1 = +n}`;
  }
  closePath() {
    this._x1 !== null && (this._x1 = this._x0, this._y1 = this._y0, this._append`Z`);
  }
  lineTo(t, n) {
    this._append`L${this._x1 = +t},${this._y1 = +n}`;
  }
  quadraticCurveTo(t, n, r, i) {
    this._append`Q${+t},${+n},${this._x1 = +r},${this._y1 = +i}`;
  }
  bezierCurveTo(t, n, r, i, s, o) {
    this._append`C${+t},${+n},${+r},${+i},${this._x1 = +s},${this._y1 = +o}`;
  }
  arcTo(t, n, r, i, s) {
    if (t = +t, n = +n, r = +r, i = +i, s = +s, s < 0) throw new Error(`negative radius: ${s}`);
    let o = this._x1, l = this._y1, a = r - t, c = i - n, u = o - t, f = l - n, h = u * u + f * f;
    if (this._x1 === null)
      this._append`M${this._x1 = t},${this._y1 = n}`;
    else if (h > fn) if (!(Math.abs(f * a - c * u) > fn) || !s)
      this._append`L${this._x1 = t},${this._y1 = n}`;
    else {
      let g = r - o, y = i - l, x = a * a + c * c, b = g * g + y * y, p = Math.sqrt(x), k = Math.sqrt(h), P = s * Math.tan((gs - Math.acos((x + h - b) / (2 * p * k))) / 2), w = P / k, C = P / p;
      Math.abs(w - 1) > fn && this._append`L${t + w * u},${n + w * f}`, this._append`A${s},${s},0,0,${+(f * g > u * y)},${this._x1 = t + C * a},${this._y1 = n + C * c}`;
    }
  }
  arc(t, n, r, i, s, o) {
    if (t = +t, n = +n, r = +r, o = !!o, r < 0) throw new Error(`negative radius: ${r}`);
    let l = r * Math.cos(i), a = r * Math.sin(i), c = t + l, u = n + a, f = 1 ^ o, h = o ? i - s : s - i;
    this._x1 === null ? this._append`M${c},${u}` : (Math.abs(this._x1 - c) > fn || Math.abs(this._y1 - u) > fn) && this._append`L${c},${u}`, r && (h < 0 && (h = h % ms + ms), h > Fg ? this._append`A${r},${r},0,1,${f},${t - l},${n - a}A${r},${r},0,1,${f},${this._x1 = c},${this._y1 = u}` : h > fn && this._append`A${r},${r},0,${+(h >= gs)},${f},${this._x1 = t + r * Math.cos(s)},${this._y1 = n + r * Math.sin(s)}`);
  }
  rect(t, n, r, i) {
    this._append`M${this._x0 = this._x1 = +t},${this._y0 = this._y1 = +n}h${r = +r}v${+i}h${-r}Z`;
  }
  toString() {
    return this._;
  }
}
function jg(e) {
  const t = +this._x.call(null, e), n = +this._y.call(null, e);
  return Qa(this.cover(t, n), t, n, e);
}
function Qa(e, t, n, r) {
  if (isNaN(t) || isNaN(n)) return e;
  var i, s = e._root, o = { data: r }, l = e._x0, a = e._y0, c = e._x1, u = e._y1, f, h, g, y, x, b, p, k;
  if (!s) return e._root = o, e;
  for (; s.length; )
    if ((x = t >= (f = (l + c) / 2)) ? l = f : c = f, (b = n >= (h = (a + u) / 2)) ? a = h : u = h, i = s, !(s = s[p = b << 1 | x])) return i[p] = o, e;
  if (g = +e._x.call(null, s.data), y = +e._y.call(null, s.data), t === g && n === y) return o.next = s, i ? i[p] = o : e._root = o, e;
  do
    i = i ? i[p] = new Array(4) : e._root = new Array(4), (x = t >= (f = (l + c) / 2)) ? l = f : c = f, (b = n >= (h = (a + u) / 2)) ? a = h : u = h;
  while ((p = b << 1 | x) === (k = (y >= h) << 1 | g >= f));
  return i[k] = s, i[p] = o, e;
}
function Dg(e) {
  var t, n, r = e.length, i, s, o = new Array(r), l = new Array(r), a = 1 / 0, c = 1 / 0, u = -1 / 0, f = -1 / 0;
  for (n = 0; n < r; ++n)
    isNaN(i = +this._x.call(null, t = e[n])) || isNaN(s = +this._y.call(null, t)) || (o[n] = i, l[n] = s, i < a && (a = i), i > u && (u = i), s < c && (c = s), s > f && (f = s));
  if (a > u || c > f) return this;
  for (this.cover(a, c).cover(u, f), n = 0; n < r; ++n)
    Qa(this, o[n], l[n], e[n]);
  return this;
}
function Gg(e, t) {
  if (isNaN(e = +e) || isNaN(t = +t)) return this;
  var n = this._x0, r = this._y0, i = this._x1, s = this._y1;
  if (isNaN(n))
    i = (n = Math.floor(e)) + 1, s = (r = Math.floor(t)) + 1;
  else {
    for (var o = i - n || 1, l = this._root, a, c; n > e || e >= i || r > t || t >= s; )
      switch (c = (t < r) << 1 | e < n, a = new Array(4), a[c] = l, l = a, o *= 2, c) {
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
function Vg() {
  var e = [];
  return this.visit(function(t) {
    if (!t.length) do
      e.push(t.data);
    while (t = t.next);
  }), e;
}
function Hg(e) {
  return arguments.length ? this.cover(+e[0][0], +e[0][1]).cover(+e[1][0], +e[1][1]) : isNaN(this._x0) ? void 0 : [[this._x0, this._y0], [this._x1, this._y1]];
}
function Xe(e, t, n, r, i) {
  this.node = e, this.x0 = t, this.y0 = n, this.x1 = r, this.y1 = i;
}
function qg(e, t, n) {
  var r, i = this._x0, s = this._y0, o, l, a, c, u = this._x1, f = this._y1, h = [], g = this._root, y, x;
  for (g && h.push(new Xe(g, i, s, u, f)), n == null ? n = 1 / 0 : (i = e - n, s = t - n, u = e + n, f = t + n, n *= n); y = h.pop(); )
    if (!(!(g = y.node) || (o = y.x0) > u || (l = y.y0) > f || (a = y.x1) < i || (c = y.y1) < s))
      if (g.length) {
        var b = (o + a) / 2, p = (l + c) / 2;
        h.push(
          new Xe(g[3], b, p, a, c),
          new Xe(g[2], o, p, b, c),
          new Xe(g[1], b, l, a, p),
          new Xe(g[0], o, l, b, p)
        ), (x = (t >= p) << 1 | e >= b) && (y = h[h.length - 1], h[h.length - 1] = h[h.length - 1 - x], h[h.length - 1 - x] = y);
      } else {
        var k = e - +this._x.call(null, g.data), P = t - +this._y.call(null, g.data), w = k * k + P * P;
        if (w < n) {
          var C = Math.sqrt(n = w);
          i = e - C, s = t - C, u = e + C, f = t + C, r = g.data;
        }
      }
  return r;
}
function Ug(e) {
  if (isNaN(u = +this._x.call(null, e)) || isNaN(f = +this._y.call(null, e))) return this;
  var t, n = this._root, r, i, s, o = this._x0, l = this._y0, a = this._x1, c = this._y1, u, f, h, g, y, x, b, p;
  if (!n) return this;
  if (n.length) for (; ; ) {
    if ((y = u >= (h = (o + a) / 2)) ? o = h : a = h, (x = f >= (g = (l + c) / 2)) ? l = g : c = g, t = n, !(n = n[b = x << 1 | y])) return this;
    if (!n.length) break;
    (t[b + 1 & 3] || t[b + 2 & 3] || t[b + 3 & 3]) && (r = t, p = b);
  }
  for (; n.data !== e; ) if (i = n, !(n = n.next)) return this;
  return (s = n.next) && delete n.next, i ? (s ? i.next = s : delete i.next, this) : t ? (s ? t[b] = s : delete t[b], (n = t[0] || t[1] || t[2] || t[3]) && n === (t[3] || t[2] || t[1] || t[0]) && !n.length && (r ? r[p] = n : this._root = n), this) : (this._root = s, this);
}
function Wg(e) {
  for (var t = 0, n = e.length; t < n; ++t) this.remove(e[t]);
  return this;
}
function Kg() {
  return this._root;
}
function Xg() {
  var e = 0;
  return this.visit(function(t) {
    if (!t.length) do
      ++e;
    while (t = t.next);
  }), e;
}
function Yg(e) {
  var t = [], n, r = this._root, i, s, o, l, a;
  for (r && t.push(new Xe(r, this._x0, this._y0, this._x1, this._y1)); n = t.pop(); )
    if (!e(r = n.node, s = n.x0, o = n.y0, l = n.x1, a = n.y1) && r.length) {
      var c = (s + l) / 2, u = (o + a) / 2;
      (i = r[3]) && t.push(new Xe(i, c, u, l, a)), (i = r[2]) && t.push(new Xe(i, s, u, c, a)), (i = r[1]) && t.push(new Xe(i, c, o, l, u)), (i = r[0]) && t.push(new Xe(i, s, o, c, u));
    }
  return this;
}
function Jg(e) {
  var t = [], n = [], r;
  for (this._root && t.push(new Xe(this._root, this._x0, this._y0, this._x1, this._y1)); r = t.pop(); ) {
    var i = r.node;
    if (i.length) {
      var s, o = r.x0, l = r.y0, a = r.x1, c = r.y1, u = (o + a) / 2, f = (l + c) / 2;
      (s = i[0]) && t.push(new Xe(s, o, l, u, f)), (s = i[1]) && t.push(new Xe(s, u, l, a, f)), (s = i[2]) && t.push(new Xe(s, o, f, u, c)), (s = i[3]) && t.push(new Xe(s, u, f, a, c));
    }
    n.push(r);
  }
  for (; r = n.pop(); )
    e(r.node, r.x0, r.y0, r.x1, r.y1);
  return this;
}
function Qg(e) {
  return e[0];
}
function Zg(e) {
  return arguments.length ? (this._x = e, this) : this._x;
}
function e0(e) {
  return e[1];
}
function t0(e) {
  return arguments.length ? (this._y = e, this) : this._y;
}
function Za(e, t, n) {
  var r = new Xs(t ?? Qg, n ?? e0, NaN, NaN, NaN, NaN);
  return e == null ? r : r.addAll(e);
}
function Xs(e, t, n, r, i, s) {
  this._x = e, this._y = t, this._x0 = n, this._y0 = r, this._x1 = i, this._y1 = s, this._root = void 0;
}
function il(e) {
  for (var t = { data: e.data }, n = t; e = e.next; ) n = n.next = { data: e.data };
  return t;
}
var Je = Za.prototype = Xs.prototype;
Je.copy = function() {
  var e = new Xs(this._x, this._y, this._x0, this._y0, this._x1, this._y1), t = this._root, n, r;
  if (!t) return e;
  if (!t.length) return e._root = il(t), e;
  for (n = [{ source: t, target: e._root = new Array(4) }]; t = n.pop(); )
    for (var i = 0; i < 4; ++i)
      (r = t.source[i]) && (r.length ? n.push({ source: r, target: t.target[i] = new Array(4) }) : t.target[i] = il(r));
  return e;
};
Je.add = jg;
Je.addAll = Dg;
Je.cover = Gg;
Je.data = Vg;
Je.extent = Hg;
Je.find = qg;
Je.remove = Ug;
Je.removeAll = Wg;
Je.root = Kg;
Je.size = Xg;
Je.visit = Yg;
Je.visitAfter = Jg;
Je.x = Zg;
Je.y = t0;
function ct(e) {
  return function() {
    return e;
  };
}
function xn(e) {
  return (e() - 0.5) * 1e-6;
}
function n0(e) {
  return e.index;
}
function sl(e, t) {
  var n = e.get(t);
  if (!n) throw new Error("node not found: " + t);
  return n;
}
function r0(e) {
  var t = n0, n = f, r, i = ct(30), s, o, l, a, c, u = 1;
  e == null && (e = []);
  function f(b) {
    return 1 / Math.min(l[b.source.index], l[b.target.index]);
  }
  function h(b) {
    for (var p = 0, k = e.length; p < u; ++p)
      for (var P = 0, w, C, B, G, W, Q, ee; P < k; ++P)
        w = e[P], C = w.source, B = w.target, G = B.x + B.vx - C.x - C.vx || xn(c), W = B.y + B.vy - C.y - C.vy || xn(c), Q = Math.sqrt(G * G + W * W), Q = (Q - s[P]) / Q * b * r[P], G *= Q, W *= Q, B.vx -= G * (ee = a[P]), B.vy -= W * ee, C.vx += G * (ee = 1 - ee), C.vy += W * ee;
  }
  function g() {
    if (o) {
      var b, p = o.length, k = e.length, P = new Map(o.map((C, B) => [t(C, B, o), C])), w;
      for (b = 0, l = new Array(p); b < k; ++b)
        w = e[b], w.index = b, typeof w.source != "object" && (w.source = sl(P, w.source)), typeof w.target != "object" && (w.target = sl(P, w.target)), l[w.source.index] = (l[w.source.index] || 0) + 1, l[w.target.index] = (l[w.target.index] || 0) + 1;
      for (b = 0, a = new Array(k); b < k; ++b)
        w = e[b], a[b] = l[w.source.index] / (l[w.source.index] + l[w.target.index]);
      r = new Array(k), y(), s = new Array(k), x();
    }
  }
  function y() {
    if (o)
      for (var b = 0, p = e.length; b < p; ++b)
        r[b] = +n(e[b], b, e);
  }
  function x() {
    if (o)
      for (var b = 0, p = e.length; b < p; ++b)
        s[b] = +i(e[b], b, e);
  }
  return h.initialize = function(b, p) {
    o = b, c = p, g();
  }, h.links = function(b) {
    return arguments.length ? (e = b, g(), h) : e;
  }, h.id = function(b) {
    return arguments.length ? (t = b, h) : t;
  }, h.iterations = function(b) {
    return arguments.length ? (u = +b, h) : u;
  }, h.strength = function(b) {
    return arguments.length ? (n = typeof b == "function" ? b : ct(+b), y(), h) : n;
  }, h.distance = function(b) {
    return arguments.length ? (i = typeof b == "function" ? b : ct(+b), x(), h) : i;
  }, h;
}
const i0 = 1664525, s0 = 1013904223, ol = 4294967296;
function o0() {
  let e = 1;
  return () => (e = (i0 * e + s0) % ol) / ol;
}
function l0(e) {
  return e.x;
}
function a0(e) {
  return e.y;
}
var u0 = 10, c0 = Math.PI * (3 - Math.sqrt(5));
function f0(e) {
  var t, n = 1, r = 1e-3, i = 1 - Math.pow(r, 1 / 300), s = 0, o = 0.6, l = /* @__PURE__ */ new Map(), a = Us(f), c = _r("tick", "end"), u = o0();
  e == null && (e = []);
  function f() {
    h(), c.call("tick", t), n < r && (a.stop(), c.call("end", t));
  }
  function h(x) {
    var b, p = e.length, k;
    x === void 0 && (x = 1);
    for (var P = 0; P < x; ++P)
      for (n += (s - n) * i, l.forEach(function(w) {
        w(n);
      }), b = 0; b < p; ++b)
        k = e[b], k.fx == null ? k.x += k.vx *= o : (k.x = k.fx, k.vx = 0), k.fy == null ? k.y += k.vy *= o : (k.y = k.fy, k.vy = 0);
    return t;
  }
  function g() {
    for (var x = 0, b = e.length, p; x < b; ++x) {
      if (p = e[x], p.index = x, p.fx != null && (p.x = p.fx), p.fy != null && (p.y = p.fy), isNaN(p.x) || isNaN(p.y)) {
        var k = u0 * Math.sqrt(0.5 + x), P = x * c0;
        p.x = k * Math.cos(P), p.y = k * Math.sin(P);
      }
      (isNaN(p.vx) || isNaN(p.vy)) && (p.vx = p.vy = 0);
    }
  }
  function y(x) {
    return x.initialize && x.initialize(e, u), x;
  }
  return g(), t = {
    tick: h,
    restart: function() {
      return a.restart(f), t;
    },
    stop: function() {
      return a.stop(), t;
    },
    nodes: function(x) {
      return arguments.length ? (e = x, g(), l.forEach(y), t) : e;
    },
    alpha: function(x) {
      return arguments.length ? (n = +x, t) : n;
    },
    alphaMin: function(x) {
      return arguments.length ? (r = +x, t) : r;
    },
    alphaDecay: function(x) {
      return arguments.length ? (i = +x, t) : +i;
    },
    alphaTarget: function(x) {
      return arguments.length ? (s = +x, t) : s;
    },
    velocityDecay: function(x) {
      return arguments.length ? (o = 1 - x, t) : 1 - o;
    },
    randomSource: function(x) {
      return arguments.length ? (u = x, l.forEach(y), t) : u;
    },
    force: function(x, b) {
      return arguments.length > 1 ? (b == null ? l.delete(x) : l.set(x, y(b)), t) : l.get(x);
    },
    find: function(x, b, p) {
      var k = 0, P = e.length, w, C, B, G, W;
      for (p == null ? p = 1 / 0 : p *= p, k = 0; k < P; ++k)
        G = e[k], w = x - G.x, C = b - G.y, B = w * w + C * C, B < p && (W = G, p = B);
      return W;
    },
    on: function(x, b) {
      return arguments.length > 1 ? (c.on(x, b), t) : c.on(x);
    }
  };
}
function h0() {
  var e, t, n, r, i = ct(-30), s, o = 1, l = 1 / 0, a = 0.81;
  function c(g) {
    var y, x = e.length, b = Za(e, l0, a0).visitAfter(f);
    for (r = g, y = 0; y < x; ++y) t = e[y], b.visit(h);
  }
  function u() {
    if (e) {
      var g, y = e.length, x;
      for (s = new Array(y), g = 0; g < y; ++g) x = e[g], s[x.index] = +i(x, g, e);
    }
  }
  function f(g) {
    var y = 0, x, b, p = 0, k, P, w;
    if (g.length) {
      for (k = P = w = 0; w < 4; ++w)
        (x = g[w]) && (b = Math.abs(x.value)) && (y += x.value, p += b, k += b * x.x, P += b * x.y);
      g.x = k / p, g.y = P / p;
    } else {
      x = g, x.x = x.data.x, x.y = x.data.y;
      do
        y += s[x.data.index];
      while (x = x.next);
    }
    g.value = y;
  }
  function h(g, y, x, b) {
    if (!g.value) return !0;
    var p = g.x - t.x, k = g.y - t.y, P = b - y, w = p * p + k * k;
    if (P * P / a < w)
      return w < l && (p === 0 && (p = xn(n), w += p * p), k === 0 && (k = xn(n), w += k * k), w < o && (w = Math.sqrt(o * w)), t.vx += p * g.value * r / w, t.vy += k * g.value * r / w), !0;
    if (g.length || w >= l) return;
    (g.data !== t || g.next) && (p === 0 && (p = xn(n), w += p * p), k === 0 && (k = xn(n), w += k * k), w < o && (w = Math.sqrt(o * w)));
    do
      g.data !== t && (P = s[g.data.index] * r / w, t.vx += p * P, t.vy += k * P);
    while (g = g.next);
  }
  return c.initialize = function(g, y) {
    e = g, n = y, u();
  }, c.strength = function(g) {
    return arguments.length ? (i = typeof g == "function" ? g : ct(+g), u(), c) : i;
  }, c.distanceMin = function(g) {
    return arguments.length ? (o = g * g, c) : Math.sqrt(o);
  }, c.distanceMax = function(g) {
    return arguments.length ? (l = g * g, c) : Math.sqrt(l);
  }, c.theta = function(g) {
    return arguments.length ? (a = g * g, c) : Math.sqrt(a);
  }, c;
}
function d0(e) {
  var t = ct(0.1), n, r, i;
  typeof e != "function" && (e = ct(e == null ? 0 : +e));
  function s(l) {
    for (var a = 0, c = n.length, u; a < c; ++a)
      u = n[a], u.vx += (i[a] - u.x) * r[a] * l;
  }
  function o() {
    if (n) {
      var l, a = n.length;
      for (r = new Array(a), i = new Array(a), l = 0; l < a; ++l)
        r[l] = isNaN(i[l] = +e(n[l], l, n)) ? 0 : +t(n[l], l, n);
    }
  }
  return s.initialize = function(l) {
    n = l, o();
  }, s.strength = function(l) {
    return arguments.length ? (t = typeof l == "function" ? l : ct(+l), o(), s) : t;
  }, s.x = function(l) {
    return arguments.length ? (e = typeof l == "function" ? l : ct(+l), o(), s) : e;
  }, s;
}
function p0(e) {
  var t = ct(0.1), n, r, i;
  typeof e != "function" && (e = ct(e == null ? 0 : +e));
  function s(l) {
    for (var a = 0, c = n.length, u; a < c; ++a)
      u = n[a], u.vy += (i[a] - u.y) * r[a] * l;
  }
  function o() {
    if (n) {
      var l, a = n.length;
      for (r = new Array(a), i = new Array(a), l = 0; l < a; ++l)
        r[l] = isNaN(i[l] = +e(n[l], l, n)) ? 0 : +t(n[l], l, n);
    }
  }
  return s.initialize = function(l) {
    n = l, o();
  }, s.strength = function(l) {
    return arguments.length ? (t = typeof l == "function" ? l : ct(+l), o(), s) : t;
  }, s.y = function(l) {
    return arguments.length ? (e = typeof l == "function" ? l : ct(+l), o(), s) : e;
  }, s;
}
function tt(e) {
  return function() {
    return e;
  };
}
const ll = Math.abs, ze = Math.atan2, ln = Math.cos, g0 = Math.max, Ui = Math.min, kt = Math.sin, En = Math.sqrt, Ze = 1e-12, gr = Math.PI, ci = gr / 2, m0 = 2 * gr;
function w0(e) {
  return e > 1 ? 0 : e < -1 ? gr : Math.acos(e);
}
function al(e) {
  return e >= 1 ? ci : e <= -1 ? -ci : Math.asin(e);
}
function eu(e) {
  let t = 3;
  return e.digits = function(n) {
    if (!arguments.length) return t;
    if (n == null)
      t = null;
    else {
      const r = Math.floor(n);
      if (!(r >= 0)) throw new RangeError(`invalid digits: ${n}`);
      t = r;
    }
    return e;
  }, () => new Bg(t);
}
function y0(e) {
  return e.innerRadius;
}
function _0(e) {
  return e.outerRadius;
}
function v0(e) {
  return e.startAngle;
}
function b0(e) {
  return e.endAngle;
}
function x0(e) {
  return e && e.padAngle;
}
function E0(e, t, n, r, i, s, o, l) {
  var a = n - e, c = r - t, u = o - i, f = l - s, h = f * a - u * c;
  if (!(h * h < Ze))
    return h = (u * (t - s) - f * (e - i)) / h, [e + h * a, t + h * c];
}
function Or(e, t, n, r, i, s, o) {
  var l = e - n, a = t - r, c = (o ? s : -s) / En(l * l + a * a), u = c * a, f = -c * l, h = e + u, g = t + f, y = n + u, x = r + f, b = (h + y) / 2, p = (g + x) / 2, k = y - h, P = x - g, w = k * k + P * P, C = i - s, B = h * x - y * g, G = (P < 0 ? -1 : 1) * En(g0(0, C * C * w - B * B)), W = (B * P - k * G) / w, Q = (-B * k - P * G) / w, ee = (B * P + k * G) / w, oe = (-B * k + P * G) / w, he = W - b, K = Q - p, T = ee - b, V = oe - p;
  return he * he + K * K > T * T + V * V && (W = ee, Q = oe), {
    cx: W,
    cy: Q,
    x01: -u,
    y01: -f,
    x11: W * (i / C - 1),
    y11: Q * (i / C - 1)
  };
}
function S0() {
  var e = y0, t = _0, n = tt(0), r = null, i = v0, s = b0, o = x0, l = null, a = eu(c);
  function c() {
    var u, f, h = +e.apply(this, arguments), g = +t.apply(this, arguments), y = i.apply(this, arguments) - ci, x = s.apply(this, arguments) - ci, b = ll(x - y), p = x > y;
    if (l || (l = u = a()), g < h && (f = g, g = h, h = f), !(g > Ze)) l.moveTo(0, 0);
    else if (b > m0 - Ze)
      l.moveTo(g * ln(y), g * kt(y)), l.arc(0, 0, g, y, x, !p), h > Ze && (l.moveTo(h * ln(x), h * kt(x)), l.arc(0, 0, h, x, y, p));
    else {
      var k = y, P = x, w = y, C = x, B = b, G = b, W = o.apply(this, arguments) / 2, Q = W > Ze && (r ? +r.apply(this, arguments) : En(h * h + g * g)), ee = Ui(ll(g - h) / 2, +n.apply(this, arguments)), oe = ee, he = ee, K, T;
      if (Q > Ze) {
        var V = al(Q / h * kt(W)), N = al(Q / g * kt(W));
        (B -= V * 2) > Ze ? (V *= p ? 1 : -1, w += V, C -= V) : (B = 0, w = C = (y + x) / 2), (G -= N * 2) > Ze ? (N *= p ? 1 : -1, k += N, P -= N) : (G = 0, k = P = (y + x) / 2);
      }
      var $ = g * ln(k), D = g * kt(k), X = h * ln(C), Y = h * kt(C);
      if (ee > Ze) {
        var ae = g * ln(P), ue = g * kt(P), Re = h * ln(w), ve = h * kt(w), be;
        if (b < gr)
          if (be = E0($, D, Re, ve, ae, ue, X, Y)) {
            var ke = $ - be[0], Te = D - be[1], Le = ae - be[0], De = ue - be[1], rt = 1 / kt(w0((ke * Le + Te * De) / (En(ke * ke + Te * Te) * En(Le * Le + De * De))) / 2), Wt = En(be[0] * be[0] + be[1] * be[1]);
            oe = Ui(ee, (h - Wt) / (rt - 1)), he = Ui(ee, (g - Wt) / (rt + 1));
          } else
            oe = he = 0;
      }
      G > Ze ? he > Ze ? (K = Or(Re, ve, $, D, g, he, p), T = Or(ae, ue, X, Y, g, he, p), l.moveTo(K.cx + K.x01, K.cy + K.y01), he < ee ? l.arc(K.cx, K.cy, he, ze(K.y01, K.x01), ze(T.y01, T.x01), !p) : (l.arc(K.cx, K.cy, he, ze(K.y01, K.x01), ze(K.y11, K.x11), !p), l.arc(0, 0, g, ze(K.cy + K.y11, K.cx + K.x11), ze(T.cy + T.y11, T.cx + T.x11), !p), l.arc(T.cx, T.cy, he, ze(T.y11, T.x11), ze(T.y01, T.x01), !p))) : (l.moveTo($, D), l.arc(0, 0, g, k, P, !p)) : l.moveTo($, D), !(h > Ze) || !(B > Ze) ? l.lineTo(X, Y) : oe > Ze ? (K = Or(X, Y, ae, ue, h, -oe, p), T = Or($, D, Re, ve, h, -oe, p), l.lineTo(K.cx + K.x01, K.cy + K.y01), oe < ee ? l.arc(K.cx, K.cy, oe, ze(K.y01, K.x01), ze(T.y01, T.x01), !p) : (l.arc(K.cx, K.cy, oe, ze(K.y01, K.x01), ze(K.y11, K.x11), !p), l.arc(0, 0, h, ze(K.cy + K.y11, K.cx + K.x11), ze(T.cy + T.y11, T.cx + T.x11), p), l.arc(T.cx, T.cy, oe, ze(T.y11, T.x11), ze(T.y01, T.x01), !p))) : l.arc(0, 0, h, C, w, p);
    }
    if (l.closePath(), u) return l = null, u + "" || null;
  }
  return c.centroid = function() {
    var u = (+e.apply(this, arguments) + +t.apply(this, arguments)) / 2, f = (+i.apply(this, arguments) + +s.apply(this, arguments)) / 2 - gr / 2;
    return [ln(f) * u, kt(f) * u];
  }, c.innerRadius = function(u) {
    return arguments.length ? (e = typeof u == "function" ? u : tt(+u), c) : e;
  }, c.outerRadius = function(u) {
    return arguments.length ? (t = typeof u == "function" ? u : tt(+u), c) : t;
  }, c.cornerRadius = function(u) {
    return arguments.length ? (n = typeof u == "function" ? u : tt(+u), c) : n;
  }, c.padRadius = function(u) {
    return arguments.length ? (r = u == null ? null : typeof u == "function" ? u : tt(+u), c) : r;
  }, c.startAngle = function(u) {
    return arguments.length ? (i = typeof u == "function" ? u : tt(+u), c) : i;
  }, c.endAngle = function(u) {
    return arguments.length ? (s = typeof u == "function" ? u : tt(+u), c) : s;
  }, c.padAngle = function(u) {
    return arguments.length ? (o = typeof u == "function" ? u : tt(+u), c) : o;
  }, c.context = function(u) {
    return arguments.length ? (l = u ?? null, c) : l;
  }, c;
}
function M0(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function tu(e) {
  this._context = e;
}
tu.prototype = {
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
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
        break;
      case 1:
        this._point = 2;
      default:
        this._context.lineTo(e, t);
        break;
    }
  }
};
function T0(e) {
  return new tu(e);
}
function k0(e) {
  return e[0];
}
function C0(e) {
  return e[1];
}
function N0(e, t) {
  var n = tt(!0), r = null, i = T0, s = null, o = eu(l);
  e = typeof e == "function" ? e : e === void 0 ? k0 : tt(e), t = typeof t == "function" ? t : t === void 0 ? C0 : tt(t);
  function l(a) {
    var c, u = (a = M0(a)).length, f, h = !1, g;
    for (r == null && (s = i(g = o())), c = 0; c <= u; ++c)
      !(c < u && n(f = a[c], c, a)) === h && ((h = !h) ? s.lineStart() : s.lineEnd()), h && s.point(+e(f, c, a), +t(f, c, a));
    if (g) return s = null, g + "" || null;
  }
  return l.x = function(a) {
    return arguments.length ? (e = typeof a == "function" ? a : tt(+a), l) : e;
  }, l.y = function(a) {
    return arguments.length ? (t = typeof a == "function" ? a : tt(+a), l) : t;
  }, l.defined = function(a) {
    return arguments.length ? (n = typeof a == "function" ? a : tt(!!a), l) : n;
  }, l.curve = function(a) {
    return arguments.length ? (i = a, r != null && (s = i(r)), l) : i;
  }, l.context = function(a) {
    return arguments.length ? (a == null ? r = s = null : s = i(r = a), l) : r;
  }, l;
}
const Ir = (e) => () => e;
function R0(e, {
  sourceEvent: t,
  target: n,
  transform: r,
  dispatch: i
}) {
  Object.defineProperties(this, {
    type: { value: e, enumerable: !0, configurable: !0 },
    sourceEvent: { value: t, enumerable: !0, configurable: !0 },
    target: { value: n, enumerable: !0, configurable: !0 },
    transform: { value: r, enumerable: !0, configurable: !0 },
    _: { value: i }
  });
}
function Dt(e, t, n) {
  this.k = e, this.x = t, this.y = n;
}
Dt.prototype = {
  constructor: Dt,
  scale: function(e) {
    return e === 1 ? this : new Dt(this.k * e, this.x, this.y);
  },
  translate: function(e, t) {
    return e === 0 & t === 0 ? this : new Dt(this.k, this.x + this.k * e, this.y + this.k * t);
  },
  apply: function(e) {
    return [e[0] * this.k + this.x, e[1] * this.k + this.y];
  },
  applyX: function(e) {
    return e * this.k + this.x;
  },
  applyY: function(e) {
    return e * this.k + this.y;
  },
  invert: function(e) {
    return [(e[0] - this.x) / this.k, (e[1] - this.y) / this.k];
  },
  invertX: function(e) {
    return (e - this.x) / this.k;
  },
  invertY: function(e) {
    return (e - this.y) / this.k;
  },
  rescaleX: function(e) {
    return e.copy().domain(e.range().map(this.invertX, this).map(e.invert, e));
  },
  rescaleY: function(e) {
    return e.copy().domain(e.range().map(this.invertY, this).map(e.invert, e));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
var nu = new Dt(1, 0, 0);
Dt.prototype;
function Wi(e) {
  e.stopImmediatePropagation();
}
function qn(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function L0(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function P0() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function ul() {
  return this.__zoom || nu;
}
function O0(e) {
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * (e.ctrlKey ? 10 : 1);
}
function I0() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function A0(e, t, n) {
  var r = e.invertX(t[0][0]) - n[0][0], i = e.invertX(t[1][0]) - n[1][0], s = e.invertY(t[0][1]) - n[0][1], o = e.invertY(t[1][1]) - n[1][1];
  return e.translate(
    i > r ? (r + i) / 2 : Math.min(0, r) || Math.max(0, i),
    o > s ? (s + o) / 2 : Math.min(0, s) || Math.max(0, o)
  );
}
function $0() {
  var e = L0, t = P0, n = A0, r = O0, i = I0, s = [0, 1 / 0], o = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], l = 250, a = Mp, c = _r("start", "zoom", "end"), u, f, h, g = 500, y = 150, x = 0, b = 10;
  function p(T) {
    T.property("__zoom", ul).on("wheel.zoom", W, { passive: !1 }).on("mousedown.zoom", Q).on("dblclick.zoom", ee).filter(i).on("touchstart.zoom", oe).on("touchmove.zoom", he).on("touchend.zoom touchcancel.zoom", K).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  p.transform = function(T, V, N, $) {
    var D = T.selection ? T.selection() : T;
    D.property("__zoom", ul), T !== D ? C(T, V, N, $) : D.interrupt().each(function() {
      B(this, arguments).event($).start().zoom(null, typeof V == "function" ? V.apply(this, arguments) : V).end();
    });
  }, p.scaleBy = function(T, V, N, $) {
    p.scaleTo(T, function() {
      var D = this.__zoom.k, X = typeof V == "function" ? V.apply(this, arguments) : V;
      return D * X;
    }, N, $);
  }, p.scaleTo = function(T, V, N, $) {
    p.transform(T, function() {
      var D = t.apply(this, arguments), X = this.__zoom, Y = N == null ? w(D) : typeof N == "function" ? N.apply(this, arguments) : N, ae = X.invert(Y), ue = typeof V == "function" ? V.apply(this, arguments) : V;
      return n(P(k(X, ue), Y, ae), D, o);
    }, N, $);
  }, p.translateBy = function(T, V, N, $) {
    p.transform(T, function() {
      return n(this.__zoom.translate(
        typeof V == "function" ? V.apply(this, arguments) : V,
        typeof N == "function" ? N.apply(this, arguments) : N
      ), t.apply(this, arguments), o);
    }, null, $);
  }, p.translateTo = function(T, V, N, $, D) {
    p.transform(T, function() {
      var X = t.apply(this, arguments), Y = this.__zoom, ae = $ == null ? w(X) : typeof $ == "function" ? $.apply(this, arguments) : $;
      return n(nu.translate(ae[0], ae[1]).scale(Y.k).translate(
        typeof V == "function" ? -V.apply(this, arguments) : -V,
        typeof N == "function" ? -N.apply(this, arguments) : -N
      ), X, o);
    }, $, D);
  };
  function k(T, V) {
    return V = Math.max(s[0], Math.min(s[1], V)), V === T.k ? T : new Dt(V, T.x, T.y);
  }
  function P(T, V, N) {
    var $ = V[0] - N[0] * T.k, D = V[1] - N[1] * T.k;
    return $ === T.x && D === T.y ? T : new Dt(T.k, $, D);
  }
  function w(T) {
    return [(+T[0][0] + +T[1][0]) / 2, (+T[0][1] + +T[1][1]) / 2];
  }
  function C(T, V, N, $) {
    T.on("start.zoom", function() {
      B(this, arguments).event($).start();
    }).on("interrupt.zoom end.zoom", function() {
      B(this, arguments).event($).end();
    }).tween("zoom", function() {
      var D = this, X = arguments, Y = B(D, X).event($), ae = t.apply(D, X), ue = N == null ? w(ae) : typeof N == "function" ? N.apply(D, X) : N, Re = Math.max(ae[1][0] - ae[0][0], ae[1][1] - ae[0][1]), ve = D.__zoom, be = typeof V == "function" ? V.apply(D, X) : V, ke = a(ve.invert(ue).concat(Re / ve.k), be.invert(ue).concat(Re / be.k));
      return function(Te) {
        if (Te === 1) Te = be;
        else {
          var Le = ke(Te), De = Re / Le[2];
          Te = new Dt(De, ue[0] - Le[0] * De, ue[1] - Le[1] * De);
        }
        Y.zoom(null, Te);
      };
    });
  }
  function B(T, V, N) {
    return !N && T.__zooming || new G(T, V);
  }
  function G(T, V) {
    this.that = T, this.args = V, this.active = 0, this.sourceEvent = null, this.extent = t.apply(T, V), this.taps = 0;
  }
  G.prototype = {
    event: function(T) {
      return T && (this.sourceEvent = T), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(T, V) {
      return this.mouse && T !== "mouse" && (this.mouse[1] = V.invert(this.mouse[0])), this.touch0 && T !== "touch" && (this.touch0[1] = V.invert(this.touch0[0])), this.touch1 && T !== "touch" && (this.touch1[1] = V.invert(this.touch1[0])), this.that.__zoom = V, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(T) {
      var V = pe(this.that).datum();
      c.call(
        T,
        this.that,
        new R0(T, {
          sourceEvent: this.sourceEvent,
          target: p,
          transform: this.that.__zoom,
          dispatch: c
        }),
        V
      );
    }
  };
  function W(T, ...V) {
    if (!e.apply(this, arguments)) return;
    var N = B(this, V).event(T), $ = this.__zoom, D = Math.max(s[0], Math.min(s[1], $.k * Math.pow(2, r.apply(this, arguments)))), X = pt(T);
    if (N.wheel)
      (N.mouse[0][0] !== X[0] || N.mouse[0][1] !== X[1]) && (N.mouse[1] = $.invert(N.mouse[0] = X)), clearTimeout(N.wheel);
    else {
      if ($.k === D) return;
      N.mouse = [X, $.invert(X)], Wr(this), N.start();
    }
    qn(T), N.wheel = setTimeout(Y, y), N.zoom("mouse", n(P(k($, D), N.mouse[0], N.mouse[1]), N.extent, o));
    function Y() {
      N.wheel = null, N.end();
    }
  }
  function Q(T, ...V) {
    if (h || !e.apply(this, arguments)) return;
    var N = T.currentTarget, $ = B(this, V, !0).event(T), D = pe(T.view).on("mousemove.zoom", ue, !0).on("mouseup.zoom", Re, !0), X = pt(T, N), Y = T.clientX, ae = T.clientY;
    Fa(T.view), Wi(T), $.mouse = [X, this.__zoom.invert(X)], Wr(this), $.start();
    function ue(ve) {
      if (qn(ve), !$.moved) {
        var be = ve.clientX - Y, ke = ve.clientY - ae;
        $.moved = be * be + ke * ke > x;
      }
      $.event(ve).zoom("mouse", n(P($.that.__zoom, $.mouse[0] = pt(ve, N), $.mouse[1]), $.extent, o));
    }
    function Re(ve) {
      D.on("mousemove.zoom mouseup.zoom", null), za(ve.view, $.moved), qn(ve), $.event(ve).end();
    }
  }
  function ee(T, ...V) {
    if (e.apply(this, arguments)) {
      var N = this.__zoom, $ = pt(T.changedTouches ? T.changedTouches[0] : T, this), D = N.invert($), X = N.k * (T.shiftKey ? 0.5 : 2), Y = n(P(k(N, X), $, D), t.apply(this, V), o);
      qn(T), l > 0 ? pe(this).transition().duration(l).call(C, Y, $, T) : pe(this).call(p.transform, Y, $, T);
    }
  }
  function oe(T, ...V) {
    if (e.apply(this, arguments)) {
      var N = T.touches, $ = N.length, D = B(this, V, T.changedTouches.length === $).event(T), X, Y, ae, ue;
      for (Wi(T), Y = 0; Y < $; ++Y)
        ae = N[Y], ue = pt(ae, this), ue = [ue, this.__zoom.invert(ue), ae.identifier], D.touch0 ? !D.touch1 && D.touch0[2] !== ue[2] && (D.touch1 = ue, D.taps = 0) : (D.touch0 = ue, X = !0, D.taps = 1 + !!u);
      u && (u = clearTimeout(u)), X && (D.taps < 2 && (f = ue[0], u = setTimeout(function() {
        u = null;
      }, g)), Wr(this), D.start());
    }
  }
  function he(T, ...V) {
    if (this.__zooming) {
      var N = B(this, V).event(T), $ = T.changedTouches, D = $.length, X, Y, ae, ue;
      for (qn(T), X = 0; X < D; ++X)
        Y = $[X], ae = pt(Y, this), N.touch0 && N.touch0[2] === Y.identifier ? N.touch0[0] = ae : N.touch1 && N.touch1[2] === Y.identifier && (N.touch1[0] = ae);
      if (Y = N.that.__zoom, N.touch1) {
        var Re = N.touch0[0], ve = N.touch0[1], be = N.touch1[0], ke = N.touch1[1], Te = (Te = be[0] - Re[0]) * Te + (Te = be[1] - Re[1]) * Te, Le = (Le = ke[0] - ve[0]) * Le + (Le = ke[1] - ve[1]) * Le;
        Y = k(Y, Math.sqrt(Te / Le)), ae = [(Re[0] + be[0]) / 2, (Re[1] + be[1]) / 2], ue = [(ve[0] + ke[0]) / 2, (ve[1] + ke[1]) / 2];
      } else if (N.touch0) ae = N.touch0[0], ue = N.touch0[1];
      else return;
      N.zoom("touch", n(P(Y, ae, ue), N.extent, o));
    }
  }
  function K(T, ...V) {
    if (this.__zooming) {
      var N = B(this, V).event(T), $ = T.changedTouches, D = $.length, X, Y;
      for (Wi(T), h && clearTimeout(h), h = setTimeout(function() {
        h = null;
      }, g), X = 0; X < D; ++X)
        Y = $[X], N.touch0 && N.touch0[2] === Y.identifier ? delete N.touch0 : N.touch1 && N.touch1[2] === Y.identifier && delete N.touch1;
      if (N.touch1 && !N.touch0 && (N.touch0 = N.touch1, delete N.touch1), N.touch0) N.touch0[1] = this.__zoom.invert(N.touch0[0]);
      else if (N.end(), N.taps === 2 && (Y = pt(Y, this), Math.hypot(f[0] - Y[0], f[1] - Y[1]) < b)) {
        var ae = pe(this).on("dblclick.zoom");
        ae && ae.apply(this, arguments);
      }
    }
  }
  return p.wheelDelta = function(T) {
    return arguments.length ? (r = typeof T == "function" ? T : Ir(+T), p) : r;
  }, p.filter = function(T) {
    return arguments.length ? (e = typeof T == "function" ? T : Ir(!!T), p) : e;
  }, p.touchable = function(T) {
    return arguments.length ? (i = typeof T == "function" ? T : Ir(!!T), p) : i;
  }, p.extent = function(T) {
    return arguments.length ? (t = typeof T == "function" ? T : Ir([[+T[0][0], +T[0][1]], [+T[1][0], +T[1][1]]]), p) : t;
  }, p.scaleExtent = function(T) {
    return arguments.length ? (s[0] = +T[0], s[1] = +T[1], p) : [s[0], s[1]];
  }, p.translateExtent = function(T) {
    return arguments.length ? (o[0][0] = +T[0][0], o[1][0] = +T[1][0], o[0][1] = +T[0][1], o[1][1] = +T[1][1], p) : [[o[0][0], o[0][1]], [o[1][0], o[1][1]]];
  }, p.constrain = function(T) {
    return arguments.length ? (n = T, p) : n;
  }, p.duration = function(T) {
    return arguments.length ? (l = +T, p) : l;
  }, p.interpolate = function(T) {
    return arguments.length ? (a = T, p) : a;
  }, p.on = function() {
    var T = c.on.apply(c, arguments);
    return T === c ? p : T;
  }, p.clickDistance = function(T) {
    return arguments.length ? (x = (T = +T) * T, p) : Math.sqrt(x);
  }, p.tapDistance = function(T) {
    return arguments.length ? (b = +T, p) : b;
  }, p;
}
function F0(e, t) {
  let n = $0().filter((r) => {
    var i;
    return r.button === 0 || ((i = r.touches) == null ? void 0 : i.length) >= 2;
  });
  return z0(n, e, t);
}
function z0(e, t, n) {
  return n ? e.scaleExtent([0.5, 5]).on("zoom", (r) => t(r, !0)) : e.scaleExtent([1, 1]).on("zoom", (r) => t(r, !1));
}
var J = /* @__PURE__ */ ((e) => (e.CIRCLE = "circle", e.RECTANGLE = "rect", e))(J || {}), me = /* @__PURE__ */ ((e) => (e.RIGHT = "RIGHT", e.BOTTOMRIGHT = "BOTTOMRIGHT", e.BOTTOM = "BOTTOM", e.BOTTOMLEFT = "BOTTOMLEFT", e.LEFT = "LEFT", e.TOPLEFT = "TOPLEFT", e.TOP = "TOP", e.TOPRIGHT = "TOPRIGHT", e))(me || {});
class B0 {
  constructor() {
    // private _nodeProps: NodeProps = { shape: NodeShape.CIRCLE, radius: 48 }
    Ne(this, "_nodeProps", {
      shape: J.RECTANGLE,
      width: 128,
      height: 48,
      cornerRadius: 4,
      reflexiveEdgeStart: "MOVABLE"
    });
    Ne(this, "_nodeGUIEditability", {
      fixedPosition: { x: !1, y: !1 },
      deletable: !0,
      labelEditable: !0,
      allowIncomingLinks: !0,
      allowOutgoingLinks: !0
    });
    /**
     * If this is set to true, the nodes can grow dynamically to match the width and height
     * of the labels, provided they exceed the size set in the node props.
     * Words in the label will stay on a single line (no horizontal wrapping).
     *
     * If set to false, the nodes have a fixed size, and label words may wrap to the next line
     * or potentially overflow.
     */
    Ne(this, "nodeAutoGrowToLabelSize", !0);
    Ne(this, "showNodeLabels", !0);
    Ne(this, "nodePhysicsEnabled", !1);
    Ne(this, "_linkGUIEditability", {
      deletable: !0,
      labelEditable: !0
    });
    Ne(this, "showLinkLabels", !0);
    Ne(this, "fixedLinkDistanceEnabled", !1);
    Ne(this, "allowNodeCreationViaGUI", !0);
    Ne(this, "zoomEnabled", !1);
    Ne(this, "markerBoxSize", 4);
    Ne(this, "_markerPadding", 2 * this.markerBoxSize);
    Ne(this, "nodeGroupsFn", () => /* @__PURE__ */ new Set());
  }
  set nodeSize(t) {
    this.nodeProps.shape === J.CIRCLE ? typeof t == "number" ? this.nodeProps.radius = t : this.nodeProps.radius = t.radius ?? 24 : this.nodeProps.shape === J.RECTANGLE && (typeof t == "number" ? (this.nodeProps.width = t, this.nodeProps.height = t) : (this.nodeProps.width = t.width ?? 48, this.nodeProps.height = t.height ?? 48));
  }
  get nodeSize() {
    let t, n, r;
    return this.nodeProps.shape === J.CIRCLE ? (r = this.nodeProps.radius, t = 2 * r, n = 2 * r) : (t = this.nodeProps.width, n = this.nodeProps.height, r = t / 2), {
      width: t,
      height: n,
      radius: r
    };
  }
  set nodeProps(t) {
    t.shape = t.shape ?? this._nodeProps.shape, this._nodeProps = t, t.shape === J.CIRCLE ? this.nodeSize = { radius: t.radius } : t.shape === J.RECTANGLE && (this.nodeSize = { width: t.width, height: t.height }, t.cornerRadius === void 0 && (this._nodeProps.cornerRadius = 4), t.reflexiveEdgeStart === void 0 && (this._nodeProps.reflexiveEdgeStart = "MOVABLE"));
  }
  get nodeProps() {
    return this._nodeProps;
  }
  set nodeGUIEditability(t) {
    this._nodeGUIEditability = {
      ...this._nodeGUIEditability,
      ...t,
      fixedPosition: {
        ...this._nodeGUIEditability.fixedPosition,
        ...t.fixedPosition
      }
    };
  }
  get nodeGUIEditability() {
    return this._nodeGUIEditability;
  }
  set linkGUIEditability(t) {
    this._linkGUIEditability = {
      ...this._linkGUIEditability,
      ...t
    };
  }
  get linkGUIEditability() {
    return this._linkGUIEditability;
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
class fi {
  /**
   * @param id - The internal ID which is used for node referencing.
   * @param props - The properties (size, shape, ...) of the node
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
  constructor(t, n, r, i, s, o, l, a, c, u, f, h) {
    Ne(this, "fx");
    Ne(this, "fy");
    Ne(this, "_fixedPosition");
    /**
     * @param _renderedSize - The actual size used for rendering the node.
     * By default, this is equal to the size defined in `props`.
     * When nodes are allowed to grow to fit their label size *(`nodeAutoGrowToLabelSize` in `config`)*,
     * `renderedSize` may grow beyond the configured size in `props`.
     */
    Ne(this, "_renderedSize");
    this.id = t, this.props = n, this.idImported = r, this.x = i, this.y = s, this.label = o, this.color = l, this.deletable = c, this.labelEditable = u, this.allowIncomingLinks = f, this.allowOutgoingLinks = h, this.fixedPosition = a, this._renderedSize = this.getSize();
  }
  set fixedPosition(t) {
    var n, r;
    this._fixedPosition = t, this.fx = (n = this.fixedPosition) != null && n.x ? this.x : void 0, this.fy = (r = this.fixedPosition) != null && r.y ? this.y : void 0;
  }
  get fixedPosition() {
    return this._fixedPosition;
  }
  setShape(t, n) {
    if (t === J.CIRCLE) {
      let r = n.nodeProps.radius ?? 0.5 * this.props.width;
      this.props = {
        shape: J.CIRCLE,
        radius: r
      };
    } else if (t === J.RECTANGLE) {
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
  setSize(t, n) {
    this.props.shape === J.CIRCLE ? typeof t == "number" ? this.props.radius = t / 2 : this.props.radius = t.radius ?? n.nodeProps.radius : this.props.shape === J.RECTANGLE && (typeof t == "number" ? (this.props.width = t, this.props.height = t) : (this.props.width = t.width ?? n.nodeProps.width, this.props.height = t.height ?? n.nodeProps.height));
  }
  /**
   * Returns the node's defined base size.
   *
   * If the node is not allowed to grow to fit its label size, this is identical to the
   * rendered size. Otherwise, the rendered size may be larger, and this value
   * represents the minimal size the node can shrink to.
   */
  getSize() {
    return this.props.shape === J.CIRCLE ? { radius: this.props.radius } : { width: this.props.width, height: this.props.height };
  }
  /**
   * Sets the nodes rendered size so it is large enough to fit the given size,
   * but at least as large as the minimal size defined in the node properties.
   *
   * @param size - The required size
   */
  set renderedSize(t) {
    if (this.props.shape === J.CIRCLE) {
      typeof t == "number" && (t = { radius: t / 2 });
      const n = t.radius > this.props.radius ? t.radius : this.props.radius;
      this._renderedSize.radius !== n && (this._renderedSize = { radius: n });
    } else if (this.props.shape === J.RECTANGLE) {
      typeof t == "number" && (t = { width: t, height: t });
      const n = t.width > this.props.width ? t.width : this.props.width, r = t.height > this.props.height ? t.height : this.props.height;
      (this._renderedSize.width !== n || this._renderedSize.height !== r) && (this._renderedSize = { width: n, height: r });
    }
  }
  get renderedSize() {
    return this._renderedSize;
  }
}
var He = /* @__PURE__ */ ((e) => (e.USER_ACTION = "user-action", e.PROGRAMMATIC_ACTION = "programmatic-action", e))(He || {});
function j0(e, t, n) {
  const r = new CustomEvent("nodecreated", {
    detail: {
      node: { id: e.id, label: e.label, x: e.x, y: e.y },
      cause: n
    }
  });
  t.node().dispatchEvent(r);
}
function D0(e, t) {
  const n = new CustomEvent("linkcreated", {
    detail: {
      link: { id: e.id, label: e.label }
    }
  });
  t.node().dispatchEvent(n);
}
function G0(e, t, n) {
  const r = new CustomEvent("nodeclicked", {
    detail: {
      node: { id: e.id, label: e.label, x: e.x, y: e.y },
      button: t
    }
  });
  n.node().dispatchEvent(r);
}
function V0(e, t, n) {
  const r = new CustomEvent("linkclicked", {
    detail: {
      link: { id: e.id, label: e.label },
      button: t
    }
  });
  n.node().dispatchEvent(r);
}
function Ar(e, t, n) {
  const r = new CustomEvent("nodedeleted", {
    detail: {
      node: { id: e.id, label: e.label, x: e.x, y: e.y },
      cause: n
    }
  });
  t.node().dispatchEvent(r);
}
function an(e, t, n) {
  const r = new CustomEvent("linkdeleted", {
    detail: {
      link: { id: e.id, label: e.label },
      cause: n
    }
  });
  t.node().dispatchEvent(r);
}
function H0(e, t, n) {
  const r = new CustomEvent("labeledited", {
    detail: {
      parent: { id: e.id },
      label: t
    }
  });
  n.node().dispatchEvent(r);
}
function q0(e, t, n) {
  const r = new CustomEvent("noderenderedsizechange", {
    detail: {
      node: { id: e.id, renderedSize: e.renderedSize, baseSize: e.getSize() },
      previousRenderedSize: t
    }
  });
  n.node().dispatchEvent(r);
}
function ot(e) {
  e.preventDefault(), e.stopPropagation();
}
function U0(e, t, n, r, i) {
  return Xd().filter(
    (s, o) => {
      var l, a;
      return s.button === 0 && //left mouse click
      (((l = o.fixedPosition) == null ? void 0 : l.x) !== !0 || ((a = o.fixedPosition) == null ? void 0 : a.y) !== !0);
    }
  ).on("start", (s, o) => {
    var l, a;
    ot(s.sourceEvent), s.active === 0 && e.alphaTarget(0.5).restart(), ((l = o.fixedPosition) == null ? void 0 : l.x) !== !0 && (o.fx = o.x), ((a = o.fixedPosition) == null ? void 0 : a.y) !== !0 && (o.fy = o.y), Ki(r, o, i);
  }).on("drag", (s, o) => {
    var l, a;
    ((l = o.fixedPosition) == null ? void 0 : l.x) !== !0 && (r.isCanvasBoundToView ? o.props.shape === J.CIRCLE ? o.fx = Math.max(
      o.renderedSize.radius,
      Math.min(t - o.renderedSize.radius, s.x)
    ) : o.props.shape === J.RECTANGLE && (o.fx = Math.max(
      0.5 * o.renderedSize.width,
      Math.min(t - 0.5 * o.renderedSize.width, s.x)
    )) : o.fx = s.x), ((a = o.fixedPosition) == null ? void 0 : a.y) !== !0 && (r.isCanvasBoundToView ? o.props.shape === J.CIRCLE ? o.fy = Math.max(
      o.renderedSize.radius,
      Math.min(n - o.renderedSize.radius, s.y)
    ) : o.props.shape === J.RECTANGLE && (o.fy = Math.max(
      0.5 * o.renderedSize.height,
      Math.min(n - 0.5 * o.renderedSize.height, s.y)
    )) : o.fy = s.y), Ki(r, o, i);
  }).on("end", (s, o) => {
    var l, a;
    s.active === 0 && e.alphaTarget(0), ((l = o.fixedPosition) == null ? void 0 : l.x) !== !0 && (o.fx = void 0), ((a = o.fixedPosition) == null ? void 0 : a.y) !== !0 && (o.fy = void 0), Ki(r, o, i);
  });
}
function Ki(e, t, n) {
  const r = e.nodeGroupsFn(t.id), i = n.nodes.filter((s) => r.has(s.id));
  if (t.fx === void 0)
    for (const s of i) {
      const o = s.x - t.x;
      s.fx = t.x + o;
    }
  else
    for (const s of i) {
      const o = s.x - t.x;
      s.fx = t.fx + o;
    }
  if (t.fy === void 0)
    for (const s of i) {
      const o = s.y - t.y;
      s.fy = t.y + o;
    }
  else
    for (const s of i) {
      const o = s.y - t.y;
      s.fy = t.fy + o;
    }
}
function W0(e, t, n, r, i) {
  return e.append("svg").attr("class", "graph-controller__graph-canvas").style("background-color", "white").on("pointermove", (o) => n(o)).on("pointerup", (o) => r(o)).on("contextmenu", (o) => ot(o)).on("dblclick", (o) => i(o)).call(t).on("dblclick.zoom", null).append("g");
}
var at = /* @__PURE__ */ ((e) => (e.LINE = "LINE", e.LINEREVERSE = "LINE-REVERSE", e.ARC = "ARC", e.ARCREVERSE = "ARC-REVERSE", e.REFLEXIVE = "REFLEXIVE", e))(at || {});
class K0 {
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
  constructor(t, n, r, i, s, o, l) {
    Ne(this, "id");
    this.source = t, this.target = n, this.pathType = r, this.label = i, this.color = s, this.deletable = o, this.labelEditable = l, this.id = `${t.id}-${n.id}`;
  }
}
function X0(e) {
  return e.append("g").classed("links", !0).selectAll(".graph-controller__link-container");
}
function Y0(e) {
  return e.append("g").classed("nodes", !0).selectAll(".graph-controller__node-container");
}
function _t(e) {
  let t = [], n = [];
  if (!Array.isArray(e))
    typeof e == "number" ? t = [e] : n = [e];
  else {
    let r = e.map(String);
    n = r.filter((i) => i.includes("-")), t = r.filter((i) => !i.includes("-")).map(Number);
  }
  return [t, n];
}
function $r(e, t) {
  t !== void 0 && (typeof t == "boolean" ? t ? e.fixedPosition = { x: !0, y: !0 } : e.fixedPosition = { x: !1, y: !1 } : Yt(["x", "y"], Object.keys(t), !0) && (e.fixedPosition = t, Xn(["x", "y"], Object.keys(t))));
}
function J0(e, t, n) {
  return `
    M ${-0.5 * e}, ${-0.5 * t + n}
    A ${n},${n} 0 0 1 ${-0.5 * e + n}, ${-0.5 * t}
    H ${0.5 * e - n}
    A ${n},${n} 0 0 1 ${0.5 * e}, ${-0.5 * t + n}
    V ${0.5 * t - n}
    A ${n},${n} 0 0 1 ${0.5 * e - n}, ${0.5 * t}
    H ${-0.5 * e + n}
    A ${n},${n} 0 0 1 ${-0.5 * e}, ${0.5 * t - n}
    Z
`;
}
function mr(e) {
  return e.replace(/([#.,;:<>+~^$|[\]()%\\ ])/g, "\\$1");
}
function cl(e) {
  let t = e.target;
  t.hasPointerCapture(e.pointerId) && t.releasePointerCapture(e.pointerId);
}
function Q0(e, t, n = 2) {
  const r = Math.abs(e.x - t.x), i = Math.abs(e.y - t.y);
  return r < n && i < n;
}
function Xn(e, t, n) {
  let r = !0;
  return t.forEach((i) => {
    e.includes(
      i
      // we actually just check if the type is keyof
    ) || (r = !1, Sn(
      `Option not valid: ${i}`,
      `Use the following: ${e.join(", ")}.`
    ));
  }), r;
}
function Yt(e, t, n) {
  let r = !0, i = e.filter((s) => !t.includes(s));
  return i.length > 0 && (r = !1, n && Sn("Option missing", `Add: ${i}`)), r;
}
function Sn(e, t) {
  console.error(e + `
` + t);
}
function Z0(e, t, n, r) {
  if (rr(e, n, t + "-link-arrow", "graph-controller__arrow", !1), rr(
    e,
    n,
    t + "-link-arrow-reverse",
    "graph-controller__arrow",
    !0
  ), rr(
    e,
    n,
    t + "-draggable-link-arrow",
    "graph-controller__arrow draggable",
    !1
  ), r)
    for (let i of r)
      ws(e, t, n, i);
}
function ws(e, t, n, r) {
  e.select(`#${t}-link-arrow-` + mr(r)).empty() && (rr(
    e,
    n,
    t + "-link-arrow-" + r,
    "graph-controller__arrow " + r,
    !1,
    r
  ), rr(
    e,
    n,
    t + "-link-arrow-reverse-" + r,
    "graph-controller__arrow colored",
    !0,
    r
  ));
}
function Xi(e, t, n) {
  e.select(`#${t}-link-arrow-` + mr(n)).select(function() {
    return this.parentNode;
  }).remove(), e.select(`#${t}-link-arrow-reverse-` + mr(n)).select(function() {
    return this.parentNode;
  }).remove();
}
function rr(e, t, n, r, i, s) {
  e.append("defs").append("marker").attr("id", n).attr("viewBox", t.markerPath).attr("refX", t.markerRef).attr("refY", t.markerRef).attr("markerWidth", t.markerBoxSize).attr("markerHeight", t.markerBoxSize).attr("orient", i ? "auto-start-reverse" : "auto").classed(r, !0).append("path").attr("d", `${N0()(t.arrowPoints)}`).style("fill", s || "");
}
function em(e, t) {
  return t.append("path").classed("graph-controller__link draggable hidden", !0).attr("d", "M0,0L0,0").style("marker-end", `url(#${e}-draggable-link-arrow)`);
}
class fl {
  constructor() {
    Ne(this, "nodeIdCounter", 0);
    Ne(this, "nodes", []);
    Ne(this, "links", []);
  }
  createNode(t, n, r, i, s, o, l, a, c, u, f) {
    const h = new fi(
      this.nodeIdCounter++,
      t,
      i,
      n,
      r,
      s,
      o,
      l,
      a,
      c,
      u,
      f
    );
    return this.nodes.push(h), h;
  }
  createLink(t, n, r, i, s, o) {
    if (this.links.find(
      (f) => f.source.id === t && f.target.id === n
    ) !== void 0)
      return;
    const a = this.nodes.find((f) => f.id === t);
    if (a === void 0)
      return;
    const c = this.nodes.find((f) => f.id === n);
    if (c === void 0)
      return;
    const u = new K0(
      a,
      c,
      void 0,
      r,
      i,
      s,
      o
    );
    return this.links.push(u), u;
  }
  removeNode(t) {
    const n = this.nodes.findIndex((i) => i.id === t.id);
    if (n === -1)
      return;
    this.nodes.splice(n, 1);
    const r = this.links.filter(
      (i) => i.source.id === t.id || i.target.id === t.id
    );
    return r.forEach((i) => {
      const s = this.links.indexOf(i, 0);
      this.links.splice(s, 1);
    }), [t, r];
  }
  removeLink(t) {
    const n = this.links.findIndex(
      (r) => r.source.id === t.source.id && r.target.id === t.target.id
    );
    if (n !== -1)
      return this.links.splice(n, 1), t;
  }
  /**
   * Checks if a link in a given (not default) color exists.
   * @param color - Color to check on.
   * @param excludedLinkId - You can optionally exclude one or more links via their ID from this check
   * @returns True if non-default colored links exist, false otherwise.
   */
  hasNonDefaultLinkColor(t, n = "") {
    return this.links.some((r) => r.color === t && r.id !== n);
  }
  /**
   * Get the existing non-default colors of links.
   * @returns An array of strings representing non-default colors, empty if none exist.
   */
  getNonDefaultLinkColors() {
    return this.links.map((t) => t.color).filter((t) => t !== void 0 && t !== "");
  }
  /**
   * Get the link ids of links with provided color.
   * @param color - Color to check on.
   * @param excludedLinkId - You can optionally exclude a link from this check via its ID
   * @returns An array of link IDs that have the provided color (without the excludedLinkId)
   */
  getLinkIdsWithNonDefaultLinkColors(t, n = "") {
    return this.links.filter((r) => r.color === t && r.id !== n).map((r) => r.id);
  }
  /**
   * Determine if a source and a target node have a bidirectional link connection.
   * @param source
   * @param target
   */
  hasBidirectionalConnection(t, n) {
    return t.id !== n.id && this.links.some((r) => r.target.id === t.id && r.source.id === n.id) && this.links.some((r) => r.target.id === n.id && r.source.id === t.id);
  }
  /** Formats the graph in trivial graph format.
   * @param includeNodeLabels if node labels should be included
   * @param includeLinkLabels if link labels should be included
   * @param includeNodeColor TGF normally has no color option, this is just used for internal purposes
   * @param includeLinkColor TGF normally has no color option, this is just used for internal purposes
   * @returns The graph in TGF format
   */
  toTGF(t = !0, n = !0, r = !1, i = !1) {
    if (this.nodes.length === 0 && this.links.length === 0)
      return "";
    let s, o;
    return s = this.nodes.map((l) => {
      let a = `${l.id}`;
      return t && l.label !== void 0 && (a += ` ${l.label}`), r && l.color !== void 0 && (a += ` /COLOR:/${l.color}`), a;
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
   * @param includeNodePosition if position should be included
   * @param includeNodeLabels if node labels should be included
   * @param includeLinkLabels if link labels should be included
   * @param includeNodeProps if node props should be included
   * @param includeNodeColor if node color should be included
   * @param includeLinkColor if link color should be included
   * @param includeNodeEditability if editability of node via GUI should be included
   * @param includeLinkEditability if editability of link via GUI should be included
   * @returns The graph in JSON format*/
  toJSON(t = !0, n = !0, r = !0, i = !0, s = !0, o = !0, l = !0, a = !0, c = !0) {
    const u = this.nodes.map((h) => {
      const g = {
        id: h.id
      };
      return t && (g.x = h.x, g.y = h.y), n && (g.label = h.label), i && (g.props = h.props), s && (g.color = h.color), c && (g.idImported = h.idImported), l && (g.fixedPosition = h.fixedPosition, g.deletable = h.deletable, g.labelEditable = h.labelEditable, g.allowIncomingLinks = h.allowIncomingLinks, g.allowOutgoingLinks = h.allowOutgoingLinks), g;
    }), f = this.links.map((h) => {
      const g = {
        sourceId: h.source.id,
        targetId: h.target.id
      };
      return r && (g.label = h.label), o && (g.color = h.color), a && (g.deletable = h.deletable, g.labelEditable = h.labelEditable), g;
    });
    return JSON.stringify({ nodes: u, links: f }, null, 4);
  }
}
function tm(e) {
  var t = +this._x.call(null, e), n = +this._y.call(null, e);
  return ru(this.cover(t, n), t, n, e);
}
function ru(e, t, n, r) {
  if (isNaN(t) || isNaN(n)) return e;
  var i, s = e._root, o = { data: r }, l = e._x0, a = e._y0, c = e._x1, u = e._y1, f, h, g, y, x, b, p, k;
  if (!s) return e._root = o, e;
  for (; s.length; )
    if ((x = t >= (f = (l + c) / 2)) ? l = f : c = f, (b = n >= (h = (a + u) / 2)) ? a = h : u = h, i = s, !(s = s[p = b << 1 | x])) return i[p] = o, e;
  if (g = +e._x.call(null, s.data), y = +e._y.call(null, s.data), t === g && n === y) return o.next = s, i ? i[p] = o : e._root = o, e;
  do
    i = i ? i[p] = new Array(4) : e._root = new Array(4), (x = t >= (f = (l + c) / 2)) ? l = f : c = f, (b = n >= (h = (a + u) / 2)) ? a = h : u = h;
  while ((p = b << 1 | x) === (k = (y >= h) << 1 | g >= f));
  return i[k] = s, i[p] = o, e;
}
function nm(e) {
  var t, n, r = e.length, i, s, o = new Array(r), l = new Array(r), a = 1 / 0, c = 1 / 0, u = -1 / 0, f = -1 / 0;
  for (n = 0; n < r; ++n)
    isNaN(i = +this._x.call(null, t = e[n])) || isNaN(s = +this._y.call(null, t)) || (o[n] = i, l[n] = s, i < a && (a = i), i > u && (u = i), s < c && (c = s), s > f && (f = s));
  for (u < a && (a = this._x0, u = this._x1), f < c && (c = this._y0, f = this._y1), this.cover(a, c).cover(u, f), n = 0; n < r; ++n)
    ru(this, o[n], l[n], e[n]);
  return this;
}
function rm(e, t) {
  if (isNaN(e = +e) || isNaN(t = +t)) return this;
  var n = this._x0, r = this._y0, i = this._x1, s = this._y1;
  if (isNaN(n))
    i = (n = Math.floor(e)) + 1, s = (r = Math.floor(t)) + 1;
  else if (n > e || e > i || r > t || t > s) {
    var o = i - n, l = this._root, a, c;
    switch (c = (t < (r + s) / 2) << 1 | e < (n + i) / 2) {
      case 0: {
        do
          a = new Array(4), a[c] = l, l = a;
        while (o *= 2, i = n + o, s = r + o, e > i || t > s);
        break;
      }
      case 1: {
        do
          a = new Array(4), a[c] = l, l = a;
        while (o *= 2, n = i - o, s = r + o, n > e || t > s);
        break;
      }
      case 2: {
        do
          a = new Array(4), a[c] = l, l = a;
        while (o *= 2, i = n + o, r = s - o, e > i || r > t);
        break;
      }
      case 3: {
        do
          a = new Array(4), a[c] = l, l = a;
        while (o *= 2, n = i - o, r = s - o, n > e || r > t);
        break;
      }
    }
    this._root && this._root.length && (this._root = l);
  } else return this;
  return this._x0 = n, this._y0 = r, this._x1 = i, this._y1 = s, this;
}
function im() {
  var e = [];
  return this.visit(function(t) {
    if (!t.length) do
      e.push(t.data);
    while (t = t.next);
  }), e;
}
function sm(e) {
  return arguments.length ? this.cover(+e[0][0], +e[0][1]).cover(+e[1][0], +e[1][1]) : isNaN(this._x0) ? void 0 : [[this._x0, this._y0], [this._x1, this._y1]];
}
function Ye(e, t, n, r, i) {
  this.node = e, this.x0 = t, this.y0 = n, this.x1 = r, this.y1 = i;
}
function om(e, t, n) {
  var r, i = this._x0, s = this._y0, o, l, a, c, u = this._x1, f = this._y1, h = [], g = this._root, y, x;
  for (g && h.push(new Ye(g, i, s, u, f)), n == null ? n = 1 / 0 : (i = e - n, s = t - n, u = e + n, f = t + n, n *= n); y = h.pop(); )
    if (!(!(g = y.node) || (o = y.x0) > u || (l = y.y0) > f || (a = y.x1) < i || (c = y.y1) < s))
      if (g.length) {
        var b = (o + a) / 2, p = (l + c) / 2;
        h.push(
          new Ye(g[3], b, p, a, c),
          new Ye(g[2], o, p, b, c),
          new Ye(g[1], b, l, a, p),
          new Ye(g[0], o, l, b, p)
        ), (x = (t >= p) << 1 | e >= b) && (y = h[h.length - 1], h[h.length - 1] = h[h.length - 1 - x], h[h.length - 1 - x] = y);
      } else {
        var k = e - +this._x.call(null, g.data), P = t - +this._y.call(null, g.data), w = k * k + P * P;
        if (w < n) {
          var C = Math.sqrt(n = w);
          i = e - C, s = t - C, u = e + C, f = t + C, r = g.data;
        }
      }
  return r;
}
function lm(e) {
  if (isNaN(u = +this._x.call(null, e)) || isNaN(f = +this._y.call(null, e))) return this;
  var t, n = this._root, r, i, s, o = this._x0, l = this._y0, a = this._x1, c = this._y1, u, f, h, g, y, x, b, p;
  if (!n) return this;
  if (n.length) for (; ; ) {
    if ((y = u >= (h = (o + a) / 2)) ? o = h : a = h, (x = f >= (g = (l + c) / 2)) ? l = g : c = g, t = n, !(n = n[b = x << 1 | y])) return this;
    if (!n.length) break;
    (t[b + 1 & 3] || t[b + 2 & 3] || t[b + 3 & 3]) && (r = t, p = b);
  }
  for (; n.data !== e; ) if (i = n, !(n = n.next)) return this;
  return (s = n.next) && delete n.next, i ? (s ? i.next = s : delete i.next, this) : t ? (s ? t[b] = s : delete t[b], (n = t[0] || t[1] || t[2] || t[3]) && n === (t[3] || t[2] || t[1] || t[0]) && !n.length && (r ? r[p] = n : this._root = n), this) : (this._root = s, this);
}
function am(e) {
  for (var t = 0, n = e.length; t < n; ++t) this.remove(e[t]);
  return this;
}
function um() {
  return this._root;
}
function cm() {
  var e = 0;
  return this.visit(function(t) {
    if (!t.length) do
      ++e;
    while (t = t.next);
  }), e;
}
function fm(e) {
  var t = [], n, r = this._root, i, s, o, l, a;
  for (r && t.push(new Ye(r, this._x0, this._y0, this._x1, this._y1)); n = t.pop(); )
    if (!e(r = n.node, s = n.x0, o = n.y0, l = n.x1, a = n.y1) && r.length) {
      var c = (s + l) / 2, u = (o + a) / 2;
      (i = r[3]) && t.push(new Ye(i, c, u, l, a)), (i = r[2]) && t.push(new Ye(i, s, u, c, a)), (i = r[1]) && t.push(new Ye(i, c, o, l, u)), (i = r[0]) && t.push(new Ye(i, s, o, c, u));
    }
  return this;
}
function hm(e) {
  var t = [], n = [], r;
  for (this._root && t.push(new Ye(this._root, this._x0, this._y0, this._x1, this._y1)); r = t.pop(); ) {
    var i = r.node;
    if (i.length) {
      var s, o = r.x0, l = r.y0, a = r.x1, c = r.y1, u = (o + a) / 2, f = (l + c) / 2;
      (s = i[0]) && t.push(new Ye(s, o, l, u, f)), (s = i[1]) && t.push(new Ye(s, u, l, a, f)), (s = i[2]) && t.push(new Ye(s, o, f, u, c)), (s = i[3]) && t.push(new Ye(s, u, f, a, c));
    }
    n.push(r);
  }
  for (; r = n.pop(); )
    e(r.node, r.x0, r.y0, r.x1, r.y1);
  return this;
}
function dm(e) {
  return arguments.length ? (this._x = e, this) : this._x;
}
function pm(e) {
  return arguments.length ? (this._y = e, this) : this._y;
}
function iu(e, t, n, r, i, s) {
  this._x = e, this._y = t, this._x0 = n, this._y0 = r, this._x1 = i, this._y1 = s, this._root = void 0;
}
function hl(e) {
  for (var t = { data: e.data }, n = t; e = e.next; ) n = n.next = { data: e.data };
  return t;
}
var Qe = iu.prototype;
Qe.copy = function() {
  var e = new iu(this._x, this._y, this._x0, this._y0, this._x1, this._y1), t = this._root, n, r;
  if (!t) return e;
  if (!t.length) return e._root = hl(t), e;
  for (n = [{ source: t, target: e._root = new Array(4) }]; t = n.pop(); )
    for (var i = 0; i < 4; ++i)
      (r = t.source[i]) && (r.length ? n.push({ source: r, target: t.target[i] = new Array(4) }) : t.target[i] = hl(r));
  return e;
};
Qe.add = tm;
Qe.addAll = nm;
Qe.cover = rm;
Qe.data = im;
Qe.extent = sm;
Qe.find = om;
Qe.remove = lm;
Qe.removeAll = am;
Qe.root = um;
Qe.size = cm;
Qe.visit = fm;
Qe.visitAfter = hm;
Qe.x = dm;
Qe.y = pm;
function gm(e, t, n, r, i) {
  let s = f0(e.nodes).on("tick", () => i());
  return s = Kr(s), t.isCanvasBoundToView && (s = mm(s, e, n, r)), s = ou(s, e, t, t.fixedLinkDistanceEnabled), s = su(s, t.nodePhysicsEnabled, n, r), s;
}
function Kr(e, t, n) {
  return e;
}
function mm(e, t, n, r) {
  return e.force("bounds", () => {
    for (const i of t.nodes)
      i.props.shape === J.CIRCLE ? (i.x = Math.max(
        i.renderedSize.radius,
        Math.min(n - i.renderedSize.radius, i.x)
      ), i.y = Math.max(
        i.renderedSize.radius,
        Math.min(r - i.renderedSize.radius, i.y)
      )) : i.props.shape === J.RECTANGLE && (i.x = Math.max(
        0.5 * i.renderedSize.width,
        Math.min(n - 0.5 * i.renderedSize.width, i.x)
      ), i.y = Math.max(
        0.5 * i.renderedSize.height,
        Math.min(r - 0.5 * i.renderedSize.height, i.y)
      ));
  });
}
function su(e, t, n, r) {
  return t ? e.force("charge", h0().strength(-500)).force("x", d0(n / 2).strength(0.05)).force("y", p0(r / 2).strength(0.05)) : e.force("charge", null).force("x", null).force("y", null);
}
function ou(e, t, n, r) {
  if (r) {
    let i = 0;
    return n.nodeProps.shape === J.CIRCLE ? i = n.nodeProps.radius : n.nodeProps.shape === J.RECTANGLE && (n.nodeProps.width < n.nodeProps.height ? i = n.nodeProps.width / 2 : i = n.nodeProps.height / 2), e.force(
      "link",
      r0().links(t.links).id((s) => s.id).distance(i * 10)
    );
  } else
    return e.force("link", null);
}
const wm = Object.prototype.toString;
function hi(e) {
  const t = wm.call(e);
  return t.endsWith("Array]") && !t.includes("Big");
}
function ym(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (!hi(e))
    throw new TypeError("input must be an array");
  if (e.length === 0)
    throw new TypeError("input must not be empty");
  var n = t.fromIndex, r = n === void 0 ? 0 : n, i = t.toIndex, s = i === void 0 ? e.length : i;
  if (r < 0 || r >= e.length || !Number.isInteger(r))
    throw new Error("fromIndex must be a positive integer smaller than length");
  if (s <= r || s > e.length || !Number.isInteger(s))
    throw new Error("toIndex must be an integer greater than fromIndex and at most equal to length");
  for (var o = e[r], l = r + 1; l < s; l++)
    e[l] > o && (o = e[l]);
  return o;
}
function _m(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (!hi(e))
    throw new TypeError("input must be an array");
  if (e.length === 0)
    throw new TypeError("input must not be empty");
  var n = t.fromIndex, r = n === void 0 ? 0 : n, i = t.toIndex, s = i === void 0 ? e.length : i;
  if (r < 0 || r >= e.length || !Number.isInteger(r))
    throw new Error("fromIndex must be a positive integer smaller than length");
  if (s <= r || s > e.length || !Number.isInteger(s))
    throw new Error("toIndex must be an integer greater than fromIndex and at most equal to length");
  for (var o = e[r], l = r + 1; l < s; l++)
    e[l] < o && (o = e[l]);
  return o;
}
function dl(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (hi(e)) {
    if (e.length === 0)
      throw new TypeError("input must not be empty");
  } else throw new TypeError("input must be an array");
  var n;
  if (t.output !== void 0) {
    if (!hi(t.output))
      throw new TypeError("output option must be an array if specified");
    n = t.output;
  } else
    n = new Array(e.length);
  var r = _m(e), i = ym(e);
  if (r === i)
    throw new RangeError("minimum and maximum input values are equal. Cannot rescale a constant array");
  var s = t.min, o = s === void 0 ? t.autoMinMax ? r : 0 : s, l = t.max, a = l === void 0 ? t.autoMinMax ? i : 1 : l;
  if (o >= a)
    throw new RangeError("min option must be smaller than max option");
  for (var c = (a - o) / (i - r), u = 0; u < e.length; u++)
    n[u] = (e[u] - r) * c + o;
  return n;
}
const Fr = " ".repeat(2), lu = " ".repeat(4);
function vm() {
  return au(this);
}
function au(e, t = {}) {
  const { maxRows: n = 15, maxColumns: r = 10, maxNumSize: i = 8 } = t;
  return `${e.constructor.name} {
${Fr}[
${lu}${bm(e, n, r, i)}
${Fr}]
${Fr}rows: ${e.rows}
${Fr}columns: ${e.columns}
}`;
}
function bm(e, t, n, r) {
  const { rows: i, columns: s } = e, o = Math.min(i, t), l = Math.min(s, n), a = [];
  for (let c = 0; c < o; c++) {
    let u = [];
    for (let f = 0; f < l; f++)
      u.push(xm(e.get(c, f), r));
    a.push(`${u.join(" ")}`);
  }
  return l !== s && (a[a.length - 1] += ` ... ${s - n} more columns`), o !== i && a.push(`... ${i - t} more rows`), a.join(`
${lu}`);
}
function xm(e, t) {
  const n = String(e);
  if (n.length <= t)
    return n.padEnd(t, " ");
  const r = e.toPrecision(t - 2);
  if (r.length <= t)
    return r;
  const i = e.toExponential(t - 2), s = i.indexOf("e"), o = i.slice(s);
  return i.slice(0, t - o.length) + o;
}
function Em(e, t) {
  e.prototype.add = function(r) {
    return typeof r == "number" ? this.addS(r) : this.addM(r);
  }, e.prototype.addS = function(r) {
    for (let i = 0; i < this.rows; i++)
      for (let s = 0; s < this.columns; s++)
        this.set(i, s, this.get(i, s) + r);
    return this;
  }, e.prototype.addM = function(r) {
    if (r = t.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let i = 0; i < this.rows; i++)
      for (let s = 0; s < this.columns; s++)
        this.set(i, s, this.get(i, s) + r.get(i, s));
    return this;
  }, e.add = function(r, i) {
    return new t(r).add(i);
  }, e.prototype.sub = function(r) {
    return typeof r == "number" ? this.subS(r) : this.subM(r);
  }, e.prototype.subS = function(r) {
    for (let i = 0; i < this.rows; i++)
      for (let s = 0; s < this.columns; s++)
        this.set(i, s, this.get(i, s) - r);
    return this;
  }, e.prototype.subM = function(r) {
    if (r = t.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let i = 0; i < this.rows; i++)
      for (let s = 0; s < this.columns; s++)
        this.set(i, s, this.get(i, s) - r.get(i, s));
    return this;
  }, e.sub = function(r, i) {
    return new t(r).sub(i);
  }, e.prototype.subtract = e.prototype.sub, e.prototype.subtractS = e.prototype.subS, e.prototype.subtractM = e.prototype.subM, e.subtract = e.sub, e.prototype.mul = function(r) {
    return typeof r == "number" ? this.mulS(r) : this.mulM(r);
  }, e.prototype.mulS = function(r) {
    for (let i = 0; i < this.rows; i++)
      for (let s = 0; s < this.columns; s++)
        this.set(i, s, this.get(i, s) * r);
    return this;
  }, e.prototype.mulM = function(r) {
    if (r = t.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let i = 0; i < this.rows; i++)
      for (let s = 0; s < this.columns; s++)
        this.set(i, s, this.get(i, s) * r.get(i, s));
    return this;
  }, e.mul = function(r, i) {
    return new t(r).mul(i);
  }, e.prototype.multiply = e.prototype.mul, e.prototype.multiplyS = e.prototype.mulS, e.prototype.multiplyM = e.prototype.mulM, e.multiply = e.mul, e.prototype.div = function(r) {
    return typeof r == "number" ? this.divS(r) : this.divM(r);
  }, e.prototype.divS = function(r) {
    for (let i = 0; i < this.rows; i++)
      for (let s = 0; s < this.columns; s++)
        this.set(i, s, this.get(i, s) / r);
    return this;
  }, e.prototype.divM = function(r) {
    if (r = t.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let i = 0; i < this.rows; i++)
      for (let s = 0; s < this.columns; s++)
        this.set(i, s, this.get(i, s) / r.get(i, s));
    return this;
  }, e.div = function(r, i) {
    return new t(r).div(i);
  }, e.prototype.divide = e.prototype.div, e.prototype.divideS = e.prototype.divS, e.prototype.divideM = e.prototype.divM, e.divide = e.div, e.prototype.mod = function(r) {
    return typeof r == "number" ? this.modS(r) : this.modM(r);
  }, e.prototype.modS = function(r) {
    for (let i = 0; i < this.rows; i++)
      for (let s = 0; s < this.columns; s++)
        this.set(i, s, this.get(i, s) % r);
    return this;
  }, e.prototype.modM = function(r) {
    if (r = t.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let i = 0; i < this.rows; i++)
      for (let s = 0; s < this.columns; s++)
        this.set(i, s, this.get(i, s) % r.get(i, s));
    return this;
  }, e.mod = function(r, i) {
    return new t(r).mod(i);
  }, e.prototype.modulus = e.prototype.mod, e.prototype.modulusS = e.prototype.modS, e.prototype.modulusM = e.prototype.modM, e.modulus = e.mod, e.prototype.and = function(r) {
    return typeof r == "number" ? this.andS(r) : this.andM(r);
  }, e.prototype.andS = function(r) {
    for (let i = 0; i < this.rows; i++)
      for (let s = 0; s < this.columns; s++)
        this.set(i, s, this.get(i, s) & r);
    return this;
  }, e.prototype.andM = function(r) {
    if (r = t.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let i = 0; i < this.rows; i++)
      for (let s = 0; s < this.columns; s++)
        this.set(i, s, this.get(i, s) & r.get(i, s));
    return this;
  }, e.and = function(r, i) {
    return new t(r).and(i);
  }, e.prototype.or = function(r) {
    return typeof r == "number" ? this.orS(r) : this.orM(r);
  }, e.prototype.orS = function(r) {
    for (let i = 0; i < this.rows; i++)
      for (let s = 0; s < this.columns; s++)
        this.set(i, s, this.get(i, s) | r);
    return this;
  }, e.prototype.orM = function(r) {
    if (r = t.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let i = 0; i < this.rows; i++)
      for (let s = 0; s < this.columns; s++)
        this.set(i, s, this.get(i, s) | r.get(i, s));
    return this;
  }, e.or = function(r, i) {
    return new t(r).or(i);
  }, e.prototype.xor = function(r) {
    return typeof r == "number" ? this.xorS(r) : this.xorM(r);
  }, e.prototype.xorS = function(r) {
    for (let i = 0; i < this.rows; i++)
      for (let s = 0; s < this.columns; s++)
        this.set(i, s, this.get(i, s) ^ r);
    return this;
  }, e.prototype.xorM = function(r) {
    if (r = t.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let i = 0; i < this.rows; i++)
      for (let s = 0; s < this.columns; s++)
        this.set(i, s, this.get(i, s) ^ r.get(i, s));
    return this;
  }, e.xor = function(r, i) {
    return new t(r).xor(i);
  }, e.prototype.leftShift = function(r) {
    return typeof r == "number" ? this.leftShiftS(r) : this.leftShiftM(r);
  }, e.prototype.leftShiftS = function(r) {
    for (let i = 0; i < this.rows; i++)
      for (let s = 0; s < this.columns; s++)
        this.set(i, s, this.get(i, s) << r);
    return this;
  }, e.prototype.leftShiftM = function(r) {
    if (r = t.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let i = 0; i < this.rows; i++)
      for (let s = 0; s < this.columns; s++)
        this.set(i, s, this.get(i, s) << r.get(i, s));
    return this;
  }, e.leftShift = function(r, i) {
    return new t(r).leftShift(i);
  }, e.prototype.signPropagatingRightShift = function(r) {
    return typeof r == "number" ? this.signPropagatingRightShiftS(r) : this.signPropagatingRightShiftM(r);
  }, e.prototype.signPropagatingRightShiftS = function(r) {
    for (let i = 0; i < this.rows; i++)
      for (let s = 0; s < this.columns; s++)
        this.set(i, s, this.get(i, s) >> r);
    return this;
  }, e.prototype.signPropagatingRightShiftM = function(r) {
    if (r = t.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let i = 0; i < this.rows; i++)
      for (let s = 0; s < this.columns; s++)
        this.set(i, s, this.get(i, s) >> r.get(i, s));
    return this;
  }, e.signPropagatingRightShift = function(r, i) {
    return new t(r).signPropagatingRightShift(i);
  }, e.prototype.rightShift = function(r) {
    return typeof r == "number" ? this.rightShiftS(r) : this.rightShiftM(r);
  }, e.prototype.rightShiftS = function(r) {
    for (let i = 0; i < this.rows; i++)
      for (let s = 0; s < this.columns; s++)
        this.set(i, s, this.get(i, s) >>> r);
    return this;
  }, e.prototype.rightShiftM = function(r) {
    if (r = t.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let i = 0; i < this.rows; i++)
      for (let s = 0; s < this.columns; s++)
        this.set(i, s, this.get(i, s) >>> r.get(i, s));
    return this;
  }, e.rightShift = function(r, i) {
    return new t(r).rightShift(i);
  }, e.prototype.zeroFillRightShift = e.prototype.rightShift, e.prototype.zeroFillRightShiftS = e.prototype.rightShiftS, e.prototype.zeroFillRightShiftM = e.prototype.rightShiftM, e.zeroFillRightShift = e.rightShift, e.prototype.not = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, ~this.get(r, i));
    return this;
  }, e.not = function(r) {
    return new t(r).not();
  }, e.prototype.abs = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.abs(this.get(r, i)));
    return this;
  }, e.abs = function(r) {
    return new t(r).abs();
  }, e.prototype.acos = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.acos(this.get(r, i)));
    return this;
  }, e.acos = function(r) {
    return new t(r).acos();
  }, e.prototype.acosh = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.acosh(this.get(r, i)));
    return this;
  }, e.acosh = function(r) {
    return new t(r).acosh();
  }, e.prototype.asin = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.asin(this.get(r, i)));
    return this;
  }, e.asin = function(r) {
    return new t(r).asin();
  }, e.prototype.asinh = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.asinh(this.get(r, i)));
    return this;
  }, e.asinh = function(r) {
    return new t(r).asinh();
  }, e.prototype.atan = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.atan(this.get(r, i)));
    return this;
  }, e.atan = function(r) {
    return new t(r).atan();
  }, e.prototype.atanh = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.atanh(this.get(r, i)));
    return this;
  }, e.atanh = function(r) {
    return new t(r).atanh();
  }, e.prototype.cbrt = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.cbrt(this.get(r, i)));
    return this;
  }, e.cbrt = function(r) {
    return new t(r).cbrt();
  }, e.prototype.ceil = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.ceil(this.get(r, i)));
    return this;
  }, e.ceil = function(r) {
    return new t(r).ceil();
  }, e.prototype.clz32 = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.clz32(this.get(r, i)));
    return this;
  }, e.clz32 = function(r) {
    return new t(r).clz32();
  }, e.prototype.cos = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.cos(this.get(r, i)));
    return this;
  }, e.cos = function(r) {
    return new t(r).cos();
  }, e.prototype.cosh = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.cosh(this.get(r, i)));
    return this;
  }, e.cosh = function(r) {
    return new t(r).cosh();
  }, e.prototype.exp = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.exp(this.get(r, i)));
    return this;
  }, e.exp = function(r) {
    return new t(r).exp();
  }, e.prototype.expm1 = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.expm1(this.get(r, i)));
    return this;
  }, e.expm1 = function(r) {
    return new t(r).expm1();
  }, e.prototype.floor = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.floor(this.get(r, i)));
    return this;
  }, e.floor = function(r) {
    return new t(r).floor();
  }, e.prototype.fround = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.fround(this.get(r, i)));
    return this;
  }, e.fround = function(r) {
    return new t(r).fround();
  }, e.prototype.log = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.log(this.get(r, i)));
    return this;
  }, e.log = function(r) {
    return new t(r).log();
  }, e.prototype.log1p = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.log1p(this.get(r, i)));
    return this;
  }, e.log1p = function(r) {
    return new t(r).log1p();
  }, e.prototype.log10 = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.log10(this.get(r, i)));
    return this;
  }, e.log10 = function(r) {
    return new t(r).log10();
  }, e.prototype.log2 = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.log2(this.get(r, i)));
    return this;
  }, e.log2 = function(r) {
    return new t(r).log2();
  }, e.prototype.round = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.round(this.get(r, i)));
    return this;
  }, e.round = function(r) {
    return new t(r).round();
  }, e.prototype.sign = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.sign(this.get(r, i)));
    return this;
  }, e.sign = function(r) {
    return new t(r).sign();
  }, e.prototype.sin = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.sin(this.get(r, i)));
    return this;
  }, e.sin = function(r) {
    return new t(r).sin();
  }, e.prototype.sinh = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.sinh(this.get(r, i)));
    return this;
  }, e.sinh = function(r) {
    return new t(r).sinh();
  }, e.prototype.sqrt = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.sqrt(this.get(r, i)));
    return this;
  }, e.sqrt = function(r) {
    return new t(r).sqrt();
  }, e.prototype.tan = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.tan(this.get(r, i)));
    return this;
  }, e.tan = function(r) {
    return new t(r).tan();
  }, e.prototype.tanh = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.tanh(this.get(r, i)));
    return this;
  }, e.tanh = function(r) {
    return new t(r).tanh();
  }, e.prototype.trunc = function() {
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.set(r, i, Math.trunc(this.get(r, i)));
    return this;
  }, e.trunc = function(r) {
    return new t(r).trunc();
  }, e.pow = function(r, i) {
    return new t(r).pow(i);
  }, e.prototype.pow = function(r) {
    return typeof r == "number" ? this.powS(r) : this.powM(r);
  }, e.prototype.powS = function(r) {
    for (let i = 0; i < this.rows; i++)
      for (let s = 0; s < this.columns; s++)
        this.set(i, s, Math.pow(this.get(i, s), r));
    return this;
  }, e.prototype.powM = function(r) {
    if (r = t.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let i = 0; i < this.rows; i++)
      for (let s = 0; s < this.columns; s++)
        this.set(i, s, Math.pow(this.get(i, s), r.get(i, s)));
    return this;
  };
}
function vt(e, t, n) {
  let r = n ? e.rows : e.rows - 1;
  if (t < 0 || t > r)
    throw new RangeError("Row index out of range");
}
function bt(e, t, n) {
  let r = n ? e.columns : e.columns - 1;
  if (t < 0 || t > r)
    throw new RangeError("Column index out of range");
}
function vn(e, t) {
  if (t.to1DArray && (t = t.to1DArray()), t.length !== e.columns)
    throw new RangeError(
      "vector size must be the same as the number of columns"
    );
  return t;
}
function bn(e, t) {
  if (t.to1DArray && (t = t.to1DArray()), t.length !== e.rows)
    throw new RangeError("vector size must be the same as the number of rows");
  return t;
}
function Sm(e, t, n) {
  return {
    row: Mm(e, t),
    column: Tm(e, n)
  };
}
function Mm(e, t) {
  if (typeof t != "object")
    throw new TypeError("unexpected type for row indices");
  if (t.some((r) => r < 0 || r >= e.rows))
    throw new RangeError("row indices are out of range");
  return Array.isArray(t) || (t = Array.from(t)), t;
}
function Tm(e, t) {
  if (typeof t != "object")
    throw new TypeError("unexpected type for column indices");
  if (t.some((r) => r < 0 || r >= e.columns))
    throw new RangeError("column indices are out of range");
  return Array.isArray(t) || (t = Array.from(t)), t;
}
function pl(e, t, n, r, i) {
  if (arguments.length !== 5)
    throw new RangeError("expected 4 arguments");
  if (zr("startRow", t), zr("endRow", n), zr("startColumn", r), zr("endColumn", i), t > n || r > i || t < 0 || t >= e.rows || n < 0 || n >= e.rows || r < 0 || r >= e.columns || i < 0 || i >= e.columns)
    throw new RangeError("Submatrix indices are out of range");
}
function Ni(e, t = 0) {
  let n = [];
  for (let r = 0; r < e; r++)
    n.push(t);
  return n;
}
function zr(e, t) {
  if (typeof t != "number")
    throw new TypeError(`${e} must be a number`);
}
function yn(e) {
  if (e.isEmpty())
    throw new Error("Empty matrix has no elements to index");
}
function km(e) {
  let t = Ni(e.rows);
  for (let n = 0; n < e.rows; ++n)
    for (let r = 0; r < e.columns; ++r)
      t[n] += e.get(n, r);
  return t;
}
function Cm(e) {
  let t = Ni(e.columns);
  for (let n = 0; n < e.rows; ++n)
    for (let r = 0; r < e.columns; ++r)
      t[r] += e.get(n, r);
  return t;
}
function Nm(e) {
  let t = 0;
  for (let n = 0; n < e.rows; n++)
    for (let r = 0; r < e.columns; r++)
      t += e.get(n, r);
  return t;
}
function Rm(e) {
  let t = Ni(e.rows, 1);
  for (let n = 0; n < e.rows; ++n)
    for (let r = 0; r < e.columns; ++r)
      t[n] *= e.get(n, r);
  return t;
}
function Lm(e) {
  let t = Ni(e.columns, 1);
  for (let n = 0; n < e.rows; ++n)
    for (let r = 0; r < e.columns; ++r)
      t[r] *= e.get(n, r);
  return t;
}
function Pm(e) {
  let t = 1;
  for (let n = 0; n < e.rows; n++)
    for (let r = 0; r < e.columns; r++)
      t *= e.get(n, r);
  return t;
}
function Om(e, t, n) {
  const r = e.rows, i = e.columns, s = [];
  for (let o = 0; o < r; o++) {
    let l = 0, a = 0, c = 0;
    for (let u = 0; u < i; u++)
      c = e.get(o, u) - n[o], l += c, a += c * c;
    t ? s.push((a - l * l / i) / (i - 1)) : s.push((a - l * l / i) / i);
  }
  return s;
}
function Im(e, t, n) {
  const r = e.rows, i = e.columns, s = [];
  for (let o = 0; o < i; o++) {
    let l = 0, a = 0, c = 0;
    for (let u = 0; u < r; u++)
      c = e.get(u, o) - n[o], l += c, a += c * c;
    t ? s.push((a - l * l / r) / (r - 1)) : s.push((a - l * l / r) / r);
  }
  return s;
}
function Am(e, t, n) {
  const r = e.rows, i = e.columns, s = r * i;
  let o = 0, l = 0, a = 0;
  for (let c = 0; c < r; c++)
    for (let u = 0; u < i; u++)
      a = e.get(c, u) - n, o += a, l += a * a;
  return t ? (l - o * o / s) / (s - 1) : (l - o * o / s) / s;
}
function $m(e, t) {
  for (let n = 0; n < e.rows; n++)
    for (let r = 0; r < e.columns; r++)
      e.set(n, r, e.get(n, r) - t[n]);
}
function Fm(e, t) {
  for (let n = 0; n < e.rows; n++)
    for (let r = 0; r < e.columns; r++)
      e.set(n, r, e.get(n, r) - t[r]);
}
function zm(e, t) {
  for (let n = 0; n < e.rows; n++)
    for (let r = 0; r < e.columns; r++)
      e.set(n, r, e.get(n, r) - t);
}
function Bm(e) {
  const t = [];
  for (let n = 0; n < e.rows; n++) {
    let r = 0;
    for (let i = 0; i < e.columns; i++)
      r += Math.pow(e.get(n, i), 2) / (e.columns - 1);
    t.push(Math.sqrt(r));
  }
  return t;
}
function jm(e, t) {
  for (let n = 0; n < e.rows; n++)
    for (let r = 0; r < e.columns; r++)
      e.set(n, r, e.get(n, r) / t[n]);
}
function Dm(e) {
  const t = [];
  for (let n = 0; n < e.columns; n++) {
    let r = 0;
    for (let i = 0; i < e.rows; i++)
      r += Math.pow(e.get(i, n), 2) / (e.rows - 1);
    t.push(Math.sqrt(r));
  }
  return t;
}
function Gm(e, t) {
  for (let n = 0; n < e.rows; n++)
    for (let r = 0; r < e.columns; r++)
      e.set(n, r, e.get(n, r) / t[r]);
}
function Vm(e) {
  const t = e.size - 1;
  let n = 0;
  for (let r = 0; r < e.columns; r++)
    for (let i = 0; i < e.rows; i++)
      n += Math.pow(e.get(i, r), 2) / t;
  return Math.sqrt(n);
}
function Hm(e, t) {
  for (let n = 0; n < e.rows; n++)
    for (let r = 0; r < e.columns; r++)
      e.set(n, r, e.get(n, r) / t);
}
class fe {
  static from1DArray(t, n, r) {
    if (t * n !== r.length)
      throw new RangeError("data length does not match given dimensions");
    let s = new ie(t, n);
    for (let o = 0; o < t; o++)
      for (let l = 0; l < n; l++)
        s.set(o, l, r[o * n + l]);
    return s;
  }
  static rowVector(t) {
    let n = new ie(1, t.length);
    for (let r = 0; r < t.length; r++)
      n.set(0, r, t[r]);
    return n;
  }
  static columnVector(t) {
    let n = new ie(t.length, 1);
    for (let r = 0; r < t.length; r++)
      n.set(r, 0, t[r]);
    return n;
  }
  static zeros(t, n) {
    return new ie(t, n);
  }
  static ones(t, n) {
    return new ie(t, n).fill(1);
  }
  static rand(t, n, r = {}) {
    if (typeof r != "object")
      throw new TypeError("options must be an object");
    const { random: i = Math.random } = r;
    let s = new ie(t, n);
    for (let o = 0; o < t; o++)
      for (let l = 0; l < n; l++)
        s.set(o, l, i());
    return s;
  }
  static randInt(t, n, r = {}) {
    if (typeof r != "object")
      throw new TypeError("options must be an object");
    const { min: i = 0, max: s = 1e3, random: o = Math.random } = r;
    if (!Number.isInteger(i)) throw new TypeError("min must be an integer");
    if (!Number.isInteger(s)) throw new TypeError("max must be an integer");
    if (i >= s) throw new RangeError("min must be smaller than max");
    let l = s - i, a = new ie(t, n);
    for (let c = 0; c < t; c++)
      for (let u = 0; u < n; u++) {
        let f = i + Math.round(o() * l);
        a.set(c, u, f);
      }
    return a;
  }
  static eye(t, n, r) {
    n === void 0 && (n = t), r === void 0 && (r = 1);
    let i = Math.min(t, n), s = this.zeros(t, n);
    for (let o = 0; o < i; o++)
      s.set(o, o, r);
    return s;
  }
  static diag(t, n, r) {
    let i = t.length;
    n === void 0 && (n = i), r === void 0 && (r = n);
    let s = Math.min(i, n, r), o = this.zeros(n, r);
    for (let l = 0; l < s; l++)
      o.set(l, l, t[l]);
    return o;
  }
  static min(t, n) {
    t = this.checkMatrix(t), n = this.checkMatrix(n);
    let r = t.rows, i = t.columns, s = new ie(r, i);
    for (let o = 0; o < r; o++)
      for (let l = 0; l < i; l++)
        s.set(o, l, Math.min(t.get(o, l), n.get(o, l)));
    return s;
  }
  static max(t, n) {
    t = this.checkMatrix(t), n = this.checkMatrix(n);
    let r = t.rows, i = t.columns, s = new this(r, i);
    for (let o = 0; o < r; o++)
      for (let l = 0; l < i; l++)
        s.set(o, l, Math.max(t.get(o, l), n.get(o, l)));
    return s;
  }
  static checkMatrix(t) {
    return fe.isMatrix(t) ? t : new ie(t);
  }
  static isMatrix(t) {
    return t != null && t.klass === "Matrix";
  }
  get size() {
    return this.rows * this.columns;
  }
  apply(t) {
    if (typeof t != "function")
      throw new TypeError("callback must be a function");
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        t.call(this, n, r);
    return this;
  }
  to1DArray() {
    let t = [];
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        t.push(this.get(n, r));
    return t;
  }
  to2DArray() {
    let t = [];
    for (let n = 0; n < this.rows; n++) {
      t.push([]);
      for (let r = 0; r < this.columns; r++)
        t[n].push(this.get(n, r));
    }
    return t;
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
      for (let t = 0; t < this.rows; t++)
        for (let n = 0; n <= t; n++)
          if (this.get(t, n) !== this.get(n, t))
            return !1;
      return !0;
    }
    return !1;
  }
  isEchelonForm() {
    let t = 0, n = 0, r = -1, i = !0, s = !1;
    for (; t < this.rows && i; ) {
      for (n = 0, s = !1; n < this.columns && s === !1; )
        this.get(t, n) === 0 ? n++ : this.get(t, n) === 1 && n > r ? (s = !0, r = n) : (i = !1, s = !0);
      t++;
    }
    return i;
  }
  isReducedEchelonForm() {
    let t = 0, n = 0, r = -1, i = !0, s = !1;
    for (; t < this.rows && i; ) {
      for (n = 0, s = !1; n < this.columns && s === !1; )
        this.get(t, n) === 0 ? n++ : this.get(t, n) === 1 && n > r ? (s = !0, r = n) : (i = !1, s = !0);
      for (let o = n + 1; o < this.rows; o++)
        this.get(t, o) !== 0 && (i = !1);
      t++;
    }
    return i;
  }
  echelonForm() {
    let t = this.clone(), n = 0, r = 0;
    for (; n < t.rows && r < t.columns; ) {
      let i = n;
      for (let s = n; s < t.rows; s++)
        t.get(s, r) > t.get(i, r) && (i = s);
      if (t.get(i, r) === 0)
        r++;
      else {
        t.swapRows(n, i);
        let s = t.get(n, r);
        for (let o = r; o < t.columns; o++)
          t.set(n, o, t.get(n, o) / s);
        for (let o = n + 1; o < t.rows; o++) {
          let l = t.get(o, r) / t.get(n, r);
          t.set(o, r, 0);
          for (let a = r + 1; a < t.columns; a++)
            t.set(o, a, t.get(o, a) - t.get(n, a) * l);
        }
        n++, r++;
      }
    }
    return t;
  }
  reducedEchelonForm() {
    let t = this.echelonForm(), n = t.columns, r = t.rows, i = r - 1;
    for (; i >= 0; )
      if (t.maxRow(i) === 0)
        i--;
      else {
        let s = 0, o = !1;
        for (; s < r && o === !1; )
          t.get(i, s) === 1 ? o = !0 : s++;
        for (let l = 0; l < i; l++) {
          let a = t.get(l, s);
          for (let c = s; c < n; c++) {
            let u = t.get(l, c) - a * t.get(i, c);
            t.set(l, c, u);
          }
        }
        i--;
      }
    return t;
  }
  set() {
    throw new Error("set method is unimplemented");
  }
  get() {
    throw new Error("get method is unimplemented");
  }
  repeat(t = {}) {
    if (typeof t != "object")
      throw new TypeError("options must be an object");
    const { rows: n = 1, columns: r = 1 } = t;
    if (!Number.isInteger(n) || n <= 0)
      throw new TypeError("rows must be a positive integer");
    if (!Number.isInteger(r) || r <= 0)
      throw new TypeError("columns must be a positive integer");
    let i = new ie(this.rows * n, this.columns * r);
    for (let s = 0; s < n; s++)
      for (let o = 0; o < r; o++)
        i.setSubMatrix(this, this.rows * s, this.columns * o);
    return i;
  }
  fill(t) {
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, t);
    return this;
  }
  neg() {
    return this.mulS(-1);
  }
  getRow(t) {
    vt(this, t);
    let n = [];
    for (let r = 0; r < this.columns; r++)
      n.push(this.get(t, r));
    return n;
  }
  getRowVector(t) {
    return ie.rowVector(this.getRow(t));
  }
  setRow(t, n) {
    vt(this, t), n = vn(this, n);
    for (let r = 0; r < this.columns; r++)
      this.set(t, r, n[r]);
    return this;
  }
  swapRows(t, n) {
    vt(this, t), vt(this, n);
    for (let r = 0; r < this.columns; r++) {
      let i = this.get(t, r);
      this.set(t, r, this.get(n, r)), this.set(n, r, i);
    }
    return this;
  }
  getColumn(t) {
    bt(this, t);
    let n = [];
    for (let r = 0; r < this.rows; r++)
      n.push(this.get(r, t));
    return n;
  }
  getColumnVector(t) {
    return ie.columnVector(this.getColumn(t));
  }
  setColumn(t, n) {
    bt(this, t), n = bn(this, n);
    for (let r = 0; r < this.rows; r++)
      this.set(r, t, n[r]);
    return this;
  }
  swapColumns(t, n) {
    bt(this, t), bt(this, n);
    for (let r = 0; r < this.rows; r++) {
      let i = this.get(r, t);
      this.set(r, t, this.get(r, n)), this.set(r, n, i);
    }
    return this;
  }
  addRowVector(t) {
    t = vn(this, t);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, this.get(n, r) + t[r]);
    return this;
  }
  subRowVector(t) {
    t = vn(this, t);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, this.get(n, r) - t[r]);
    return this;
  }
  mulRowVector(t) {
    t = vn(this, t);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, this.get(n, r) * t[r]);
    return this;
  }
  divRowVector(t) {
    t = vn(this, t);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, this.get(n, r) / t[r]);
    return this;
  }
  addColumnVector(t) {
    t = bn(this, t);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, this.get(n, r) + t[n]);
    return this;
  }
  subColumnVector(t) {
    t = bn(this, t);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, this.get(n, r) - t[n]);
    return this;
  }
  mulColumnVector(t) {
    t = bn(this, t);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, this.get(n, r) * t[n]);
    return this;
  }
  divColumnVector(t) {
    t = bn(this, t);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, this.get(n, r) / t[n]);
    return this;
  }
  mulRow(t, n) {
    vt(this, t);
    for (let r = 0; r < this.columns; r++)
      this.set(t, r, this.get(t, r) * n);
    return this;
  }
  mulColumn(t, n) {
    bt(this, t);
    for (let r = 0; r < this.rows; r++)
      this.set(r, t, this.get(r, t) * n);
    return this;
  }
  max() {
    if (this.isEmpty())
      return NaN;
    let t = this.get(0, 0);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.get(n, r) > t && (t = this.get(n, r));
    return t;
  }
  maxIndex() {
    yn(this);
    let t = this.get(0, 0), n = [0, 0];
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.get(r, i) > t && (t = this.get(r, i), n[0] = r, n[1] = i);
    return n;
  }
  min() {
    if (this.isEmpty())
      return NaN;
    let t = this.get(0, 0);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.get(n, r) < t && (t = this.get(n, r));
    return t;
  }
  minIndex() {
    yn(this);
    let t = this.get(0, 0), n = [0, 0];
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.get(r, i) < t && (t = this.get(r, i), n[0] = r, n[1] = i);
    return n;
  }
  maxRow(t) {
    if (vt(this, t), this.isEmpty())
      return NaN;
    let n = this.get(t, 0);
    for (let r = 1; r < this.columns; r++)
      this.get(t, r) > n && (n = this.get(t, r));
    return n;
  }
  maxRowIndex(t) {
    vt(this, t), yn(this);
    let n = this.get(t, 0), r = [t, 0];
    for (let i = 1; i < this.columns; i++)
      this.get(t, i) > n && (n = this.get(t, i), r[1] = i);
    return r;
  }
  minRow(t) {
    if (vt(this, t), this.isEmpty())
      return NaN;
    let n = this.get(t, 0);
    for (let r = 1; r < this.columns; r++)
      this.get(t, r) < n && (n = this.get(t, r));
    return n;
  }
  minRowIndex(t) {
    vt(this, t), yn(this);
    let n = this.get(t, 0), r = [t, 0];
    for (let i = 1; i < this.columns; i++)
      this.get(t, i) < n && (n = this.get(t, i), r[1] = i);
    return r;
  }
  maxColumn(t) {
    if (bt(this, t), this.isEmpty())
      return NaN;
    let n = this.get(0, t);
    for (let r = 1; r < this.rows; r++)
      this.get(r, t) > n && (n = this.get(r, t));
    return n;
  }
  maxColumnIndex(t) {
    bt(this, t), yn(this);
    let n = this.get(0, t), r = [0, t];
    for (let i = 1; i < this.rows; i++)
      this.get(i, t) > n && (n = this.get(i, t), r[0] = i);
    return r;
  }
  minColumn(t) {
    if (bt(this, t), this.isEmpty())
      return NaN;
    let n = this.get(0, t);
    for (let r = 1; r < this.rows; r++)
      this.get(r, t) < n && (n = this.get(r, t));
    return n;
  }
  minColumnIndex(t) {
    bt(this, t), yn(this);
    let n = this.get(0, t), r = [0, t];
    for (let i = 1; i < this.rows; i++)
      this.get(i, t) < n && (n = this.get(i, t), r[0] = i);
    return r;
  }
  diag() {
    let t = Math.min(this.rows, this.columns), n = [];
    for (let r = 0; r < t; r++)
      n.push(this.get(r, r));
    return n;
  }
  norm(t = "frobenius") {
    let n = 0;
    if (t === "max")
      return this.max();
    if (t === "frobenius") {
      for (let r = 0; r < this.rows; r++)
        for (let i = 0; i < this.columns; i++)
          n = n + this.get(r, i) * this.get(r, i);
      return Math.sqrt(n);
    } else
      throw new RangeError(`unknown norm type: ${t}`);
  }
  cumulativeSum() {
    let t = 0;
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        t += this.get(n, r), this.set(n, r, t);
    return this;
  }
  dot(t) {
    fe.isMatrix(t) && (t = t.to1DArray());
    let n = this.to1DArray();
    if (n.length !== t.length)
      throw new RangeError("vectors do not have the same size");
    let r = 0;
    for (let i = 0; i < n.length; i++)
      r += n[i] * t[i];
    return r;
  }
  mmul(t) {
    t = ie.checkMatrix(t);
    let n = this.rows, r = this.columns, i = t.columns, s = new ie(n, i), o = new Float64Array(r);
    for (let l = 0; l < i; l++) {
      for (let a = 0; a < r; a++)
        o[a] = t.get(a, l);
      for (let a = 0; a < n; a++) {
        let c = 0;
        for (let u = 0; u < r; u++)
          c += this.get(a, u) * o[u];
        s.set(a, l, c);
      }
    }
    return s;
  }
  strassen2x2(t) {
    t = ie.checkMatrix(t);
    let n = new ie(2, 2);
    const r = this.get(0, 0), i = t.get(0, 0), s = this.get(0, 1), o = t.get(0, 1), l = this.get(1, 0), a = t.get(1, 0), c = this.get(1, 1), u = t.get(1, 1), f = (r + c) * (i + u), h = (l + c) * i, g = r * (o - u), y = c * (a - i), x = (r + s) * u, b = (l - r) * (i + o), p = (s - c) * (a + u), k = f + y - x + p, P = g + x, w = h + y, C = f - h + g + b;
    return n.set(0, 0, k), n.set(0, 1, P), n.set(1, 0, w), n.set(1, 1, C), n;
  }
  strassen3x3(t) {
    t = ie.checkMatrix(t);
    let n = new ie(3, 3);
    const r = this.get(0, 0), i = this.get(0, 1), s = this.get(0, 2), o = this.get(1, 0), l = this.get(1, 1), a = this.get(1, 2), c = this.get(2, 0), u = this.get(2, 1), f = this.get(2, 2), h = t.get(0, 0), g = t.get(0, 1), y = t.get(0, 2), x = t.get(1, 0), b = t.get(1, 1), p = t.get(1, 2), k = t.get(2, 0), P = t.get(2, 1), w = t.get(2, 2), C = (r + i + s - o - l - u - f) * b, B = (r - o) * (-g + b), G = l * (-h + g + x - b - p - k + w), W = (-r + o + l) * (h - g + b), Q = (o + l) * (-h + g), ee = r * h, oe = (-r + c + u) * (h - y + p), he = (-r + c) * (y - p), K = (c + u) * (-h + y), T = (r + i + s - l - a - c - u) * p, V = u * (-h + y + x - b - p - k + P), N = (-s + u + f) * (b + k - P), $ = (s - f) * (b - P), D = s * k, X = (u + f) * (-k + P), Y = (-s + l + a) * (p + k - w), ae = (s - a) * (p - w), ue = (l + a) * (-k + w), Re = i * x, ve = a * P, be = o * y, ke = c * g, Te = f * w, Le = ee + D + Re, De = C + W + Q + ee + N + D + X, rt = ee + oe + K + T + D + Y + ue, Wt = B + G + W + ee + D + Y + ae, v = B + W + Q + ee + ve, S = D + Y + ae + ue + be, L = ee + oe + he + V + N + $ + D, F = N + $ + D + X + ke, I = ee + oe + he + K + Te;
    return n.set(0, 0, Le), n.set(0, 1, De), n.set(0, 2, rt), n.set(1, 0, Wt), n.set(1, 1, v), n.set(1, 2, S), n.set(2, 0, L), n.set(2, 1, F), n.set(2, 2, I), n;
  }
  mmulStrassen(t) {
    t = ie.checkMatrix(t);
    let n = this.clone(), r = n.rows, i = n.columns, s = t.rows, o = t.columns;
    i !== s && console.warn(
      `Multiplying ${r} x ${i} and ${s} x ${o} matrix: dimensions do not match.`
    );
    function l(f, h, g) {
      let y = f.rows, x = f.columns;
      if (y === h && x === g)
        return f;
      {
        let b = fe.zeros(h, g);
        return b = b.setSubMatrix(f, 0, 0), b;
      }
    }
    let a = Math.max(r, s), c = Math.max(i, o);
    n = l(n, a, c), t = l(t, a, c);
    function u(f, h, g, y) {
      if (g <= 512 || y <= 512)
        return f.mmul(h);
      g % 2 === 1 && y % 2 === 1 ? (f = l(f, g + 1, y + 1), h = l(h, g + 1, y + 1)) : g % 2 === 1 ? (f = l(f, g + 1, y), h = l(h, g + 1, y)) : y % 2 === 1 && (f = l(f, g, y + 1), h = l(h, g, y + 1));
      let x = parseInt(f.rows / 2, 10), b = parseInt(f.columns / 2, 10), p = f.subMatrix(0, x - 1, 0, b - 1), k = h.subMatrix(0, x - 1, 0, b - 1), P = f.subMatrix(0, x - 1, b, f.columns - 1), w = h.subMatrix(0, x - 1, b, h.columns - 1), C = f.subMatrix(x, f.rows - 1, 0, b - 1), B = h.subMatrix(x, h.rows - 1, 0, b - 1), G = f.subMatrix(x, f.rows - 1, b, f.columns - 1), W = h.subMatrix(x, h.rows - 1, b, h.columns - 1), Q = u(
        fe.add(p, G),
        fe.add(k, W),
        x,
        b
      ), ee = u(fe.add(C, G), k, x, b), oe = u(p, fe.sub(w, W), x, b), he = u(G, fe.sub(B, k), x, b), K = u(fe.add(p, P), W, x, b), T = u(
        fe.sub(C, p),
        fe.add(k, w),
        x,
        b
      ), V = u(
        fe.sub(P, G),
        fe.add(B, W),
        x,
        b
      ), N = fe.add(Q, he);
      N.sub(K), N.add(V);
      let $ = fe.add(oe, K), D = fe.add(ee, he), X = fe.sub(Q, ee);
      X.add(oe), X.add(T);
      let Y = fe.zeros(2 * N.rows, 2 * N.columns);
      return Y = Y.setSubMatrix(N, 0, 0), Y = Y.setSubMatrix($, N.rows, 0), Y = Y.setSubMatrix(D, 0, N.columns), Y = Y.setSubMatrix(X, N.rows, N.columns), Y.subMatrix(0, g - 1, 0, y - 1);
    }
    return u(n, t, a, c);
  }
  scaleRows(t = {}) {
    if (typeof t != "object")
      throw new TypeError("options must be an object");
    const { min: n = 0, max: r = 1 } = t;
    if (!Number.isFinite(n)) throw new TypeError("min must be a number");
    if (!Number.isFinite(r)) throw new TypeError("max must be a number");
    if (n >= r) throw new RangeError("min must be smaller than max");
    let i = new ie(this.rows, this.columns);
    for (let s = 0; s < this.rows; s++) {
      const o = this.getRow(s);
      o.length > 0 && dl(o, { min: n, max: r, output: o }), i.setRow(s, o);
    }
    return i;
  }
  scaleColumns(t = {}) {
    if (typeof t != "object")
      throw new TypeError("options must be an object");
    const { min: n = 0, max: r = 1 } = t;
    if (!Number.isFinite(n)) throw new TypeError("min must be a number");
    if (!Number.isFinite(r)) throw new TypeError("max must be a number");
    if (n >= r) throw new RangeError("min must be smaller than max");
    let i = new ie(this.rows, this.columns);
    for (let s = 0; s < this.columns; s++) {
      const o = this.getColumn(s);
      o.length && dl(o, {
        min: n,
        max: r,
        output: o
      }), i.setColumn(s, o);
    }
    return i;
  }
  flipRows() {
    const t = Math.ceil(this.columns / 2);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < t; r++) {
        let i = this.get(n, r), s = this.get(n, this.columns - 1 - r);
        this.set(n, r, s), this.set(n, this.columns - 1 - r, i);
      }
    return this;
  }
  flipColumns() {
    const t = Math.ceil(this.rows / 2);
    for (let n = 0; n < this.columns; n++)
      for (let r = 0; r < t; r++) {
        let i = this.get(r, n), s = this.get(this.rows - 1 - r, n);
        this.set(r, n, s), this.set(this.rows - 1 - r, n, i);
      }
    return this;
  }
  kroneckerProduct(t) {
    t = ie.checkMatrix(t);
    let n = this.rows, r = this.columns, i = t.rows, s = t.columns, o = new ie(n * i, r * s);
    for (let l = 0; l < n; l++)
      for (let a = 0; a < r; a++)
        for (let c = 0; c < i; c++)
          for (let u = 0; u < s; u++)
            o.set(i * l + c, s * a + u, this.get(l, a) * t.get(c, u));
    return o;
  }
  kroneckerSum(t) {
    if (t = ie.checkMatrix(t), !this.isSquare() || !t.isSquare())
      throw new Error("Kronecker Sum needs two Square Matrices");
    let n = this.rows, r = t.rows, i = this.kroneckerProduct(ie.eye(r, r)), s = ie.eye(n, n).kroneckerProduct(t);
    return i.add(s);
  }
  transpose() {
    let t = new ie(this.columns, this.rows);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        t.set(r, n, this.get(n, r));
    return t;
  }
  sortRows(t = gl) {
    for (let n = 0; n < this.rows; n++)
      this.setRow(n, this.getRow(n).sort(t));
    return this;
  }
  sortColumns(t = gl) {
    for (let n = 0; n < this.columns; n++)
      this.setColumn(n, this.getColumn(n).sort(t));
    return this;
  }
  subMatrix(t, n, r, i) {
    pl(this, t, n, r, i);
    let s = new ie(
      n - t + 1,
      i - r + 1
    );
    for (let o = t; o <= n; o++)
      for (let l = r; l <= i; l++)
        s.set(o - t, l - r, this.get(o, l));
    return s;
  }
  subMatrixRow(t, n, r) {
    if (n === void 0 && (n = 0), r === void 0 && (r = this.columns - 1), n > r || n < 0 || n >= this.columns || r < 0 || r >= this.columns)
      throw new RangeError("Argument out of range");
    let i = new ie(t.length, r - n + 1);
    for (let s = 0; s < t.length; s++)
      for (let o = n; o <= r; o++) {
        if (t[s] < 0 || t[s] >= this.rows)
          throw new RangeError(`Row index out of range: ${t[s]}`);
        i.set(s, o - n, this.get(t[s], o));
      }
    return i;
  }
  subMatrixColumn(t, n, r) {
    if (n === void 0 && (n = 0), r === void 0 && (r = this.rows - 1), n > r || n < 0 || n >= this.rows || r < 0 || r >= this.rows)
      throw new RangeError("Argument out of range");
    let i = new ie(r - n + 1, t.length);
    for (let s = 0; s < t.length; s++)
      for (let o = n; o <= r; o++) {
        if (t[s] < 0 || t[s] >= this.columns)
          throw new RangeError(`Column index out of range: ${t[s]}`);
        i.set(o - n, s, this.get(o, t[s]));
      }
    return i;
  }
  setSubMatrix(t, n, r) {
    if (t = ie.checkMatrix(t), t.isEmpty())
      return this;
    let i = n + t.rows - 1, s = r + t.columns - 1;
    pl(this, n, i, r, s);
    for (let o = 0; o < t.rows; o++)
      for (let l = 0; l < t.columns; l++)
        this.set(n + o, r + l, t.get(o, l));
    return this;
  }
  selection(t, n) {
    let r = Sm(this, t, n), i = new ie(t.length, n.length);
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
    let t = Math.min(this.rows, this.columns), n = 0;
    for (let r = 0; r < t; r++)
      n += this.get(r, r);
    return n;
  }
  clone() {
    let t = new ie(this.rows, this.columns);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        t.set(n, r, this.get(n, r));
    return t;
  }
  sum(t) {
    switch (t) {
      case "row":
        return km(this);
      case "column":
        return Cm(this);
      case void 0:
        return Nm(this);
      default:
        throw new Error(`invalid option: ${t}`);
    }
  }
  product(t) {
    switch (t) {
      case "row":
        return Rm(this);
      case "column":
        return Lm(this);
      case void 0:
        return Pm(this);
      default:
        throw new Error(`invalid option: ${t}`);
    }
  }
  mean(t) {
    const n = this.sum(t);
    switch (t) {
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
        throw new Error(`invalid option: ${t}`);
    }
  }
  variance(t, n = {}) {
    if (typeof t == "object" && (n = t, t = void 0), typeof n != "object")
      throw new TypeError("options must be an object");
    const { unbiased: r = !0, mean: i = this.mean(t) } = n;
    if (typeof r != "boolean")
      throw new TypeError("unbiased must be a boolean");
    switch (t) {
      case "row": {
        if (!Array.isArray(i))
          throw new TypeError("mean must be an array");
        return Om(this, r, i);
      }
      case "column": {
        if (!Array.isArray(i))
          throw new TypeError("mean must be an array");
        return Im(this, r, i);
      }
      case void 0: {
        if (typeof i != "number")
          throw new TypeError("mean must be a number");
        return Am(this, r, i);
      }
      default:
        throw new Error(`invalid option: ${t}`);
    }
  }
  standardDeviation(t, n) {
    typeof t == "object" && (n = t, t = void 0);
    const r = this.variance(t, n);
    if (t === void 0)
      return Math.sqrt(r);
    for (let i = 0; i < r.length; i++)
      r[i] = Math.sqrt(r[i]);
    return r;
  }
  center(t, n = {}) {
    if (typeof t == "object" && (n = t, t = void 0), typeof n != "object")
      throw new TypeError("options must be an object");
    const { center: r = this.mean(t) } = n;
    switch (t) {
      case "row": {
        if (!Array.isArray(r))
          throw new TypeError("center must be an array");
        return $m(this, r), this;
      }
      case "column": {
        if (!Array.isArray(r))
          throw new TypeError("center must be an array");
        return Fm(this, r), this;
      }
      case void 0: {
        if (typeof r != "number")
          throw new TypeError("center must be a number");
        return zm(this, r), this;
      }
      default:
        throw new Error(`invalid option: ${t}`);
    }
  }
  scale(t, n = {}) {
    if (typeof t == "object" && (n = t, t = void 0), typeof n != "object")
      throw new TypeError("options must be an object");
    let r = n.scale;
    switch (t) {
      case "row": {
        if (r === void 0)
          r = Bm(this);
        else if (!Array.isArray(r))
          throw new TypeError("scale must be an array");
        return jm(this, r), this;
      }
      case "column": {
        if (r === void 0)
          r = Dm(this);
        else if (!Array.isArray(r))
          throw new TypeError("scale must be an array");
        return Gm(this, r), this;
      }
      case void 0: {
        if (r === void 0)
          r = Vm(this);
        else if (typeof r != "number")
          throw new TypeError("scale must be a number");
        return Hm(this, r), this;
      }
      default:
        throw new Error(`invalid option: ${t}`);
    }
  }
  toString(t) {
    return au(this, t);
  }
}
fe.prototype.klass = "Matrix";
typeof Symbol < "u" && (fe.prototype[Symbol.for("nodejs.util.inspect.custom")] = vm);
function gl(e, t) {
  return e - t;
}
fe.random = fe.rand;
fe.randomInt = fe.randInt;
fe.diagonal = fe.diag;
fe.prototype.diagonal = fe.prototype.diag;
fe.identity = fe.eye;
fe.prototype.negate = fe.prototype.neg;
fe.prototype.tensorProduct = fe.prototype.kroneckerProduct;
class ie extends fe {
  constructor(t, n) {
    if (super(), ie.isMatrix(t))
      return t.clone();
    if (Number.isInteger(t) && t >= 0)
      if (this.data = [], Number.isInteger(n) && n >= 0)
        for (let r = 0; r < t; r++)
          this.data.push(new Float64Array(n));
      else
        throw new TypeError("nColumns must be a positive integer");
    else if (Array.isArray(t)) {
      const r = t;
      if (t = r.length, n = t ? r[0].length : 0, typeof n != "number")
        throw new TypeError(
          "Data must be a 2D array with at least one element"
        );
      this.data = [];
      for (let i = 0; i < t; i++) {
        if (r[i].length !== n)
          throw new RangeError("Inconsistent array dimensions");
        this.data.push(Float64Array.from(r[i]));
      }
    } else
      throw new TypeError(
        "First argument must be a positive number or an array"
      );
    this.rows = t, this.columns = n;
  }
  set(t, n, r) {
    return this.data[t][n] = r, this;
  }
  get(t, n) {
    return this.data[t][n];
  }
  removeRow(t) {
    return vt(this, t), this.data.splice(t, 1), this.rows -= 1, this;
  }
  addRow(t, n) {
    return n === void 0 && (n = t, t = this.rows), vt(this, t, !0), n = Float64Array.from(vn(this, n)), this.data.splice(t, 0, n), this.rows += 1, this;
  }
  removeColumn(t) {
    bt(this, t);
    for (let n = 0; n < this.rows; n++) {
      const r = new Float64Array(this.columns - 1);
      for (let i = 0; i < t; i++)
        r[i] = this.data[n][i];
      for (let i = t + 1; i < this.columns; i++)
        r[i - 1] = this.data[n][i];
      this.data[n] = r;
    }
    return this.columns -= 1, this;
  }
  addColumn(t, n) {
    typeof n > "u" && (n = t, t = this.columns), bt(this, t, !0), n = bn(this, n);
    for (let r = 0; r < this.rows; r++) {
      const i = new Float64Array(this.columns + 1);
      let s = 0;
      for (; s < t; s++)
        i[s] = this.data[r][s];
      for (i[s++] = n[r]; s < this.columns + 1; s++)
        i[s] = this.data[r][s - 1];
      this.data[r] = i;
    }
    return this.columns += 1, this;
  }
}
Em(fe, ie);
var qm = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Um(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var uu = { exports: {} };
(function(e, t) {
  (function(n, r) {
    e.exports = r();
  })(qm, function() {
    function n(o) {
      o = o.replace(/,/g, " ").replace(/([^eE])-/g, "$1 -").replace(/\s*([achlmqstvzACHLMQSTVZ])\s*/g, " $1 ").replace(/\s+/g, " ").replace(/(\d*\.\d+([eE]-?\d+)?)((\.\d+)+)/g, (N, $, D, X) => $ + X.replaceAll(".", " ."));
      var l = o.replace(/([achlmqstvzACHLMQSTVZ])\s?/g, "|$1").split("|"), a = l.length, c, u, f, h, g, y = [], x = [], b, p, k = 0, P = 0, w = 0, C = 0, B = 0, G = 0, W = 0, Q = 0, ee = 0, oe = 0, he = 0, K = 0, T = 0, V = "";
      for (c = 1; c < a; c++) {
        if (u = l[c], f = u.substring(0, 1), h = f.toLowerCase(), y = u.replace(f, "").trim().split(" ").filter(function(N) {
          return N !== "";
        }), x = y, y = y.map(parseFloat), b = y.length, h === "m") {
          if (V += "M ", f === "m" ? (w += y[0], C += y[1]) : (w = y[0], C = y[1]), k = w, P = C, V += w + " " + C + " ", b > 2)
            for (p = 0; p < b; p += 2)
              f === "m" ? (w += y[p], C += y[p + 1]) : (w = y[p], C = y[p + 1]), V += "L " + w + " " + C + " ";
        } else if (h === "l")
          for (p = 0; p < b; p += 2)
            f === "l" ? (w += y[p], C += y[p + 1]) : (w = y[p], C = y[p + 1]), V += "L " + w + " " + C + " ";
        else if (h === "h")
          for (p = 0; p < b; p++)
            f === "h" ? w += y[p] : w = y[p], V += "L " + w + " " + C + " ";
        else if (h === "v")
          for (p = 0; p < b; p++)
            f === "v" ? C += y[p] : C = y[p], V += "L " + w + " " + C + " ";
        else if (h === "q")
          for (p = 0; p < b; p += 4)
            f === "q" ? (B = w + y[p], G = C + y[p + 1], w += y[p + 2], C += y[p + 3]) : (B = y[p], G = y[p + 1], w = y[p + 2], C = y[p + 3]), V += "Q " + B + " " + G + " " + w + " " + C + " ";
        else if (h === "t")
          for (p = 0; p < b; p += 2)
            ["t", "q"].indexOf(g) > -1 ? (B = w + (w - B), G = C + (C - G)) : (B = w, G = C), f === "t" ? (w += y[p], C += y[p + 1]) : (w = y[p], C = y[p + 1]), V += "Q " + B + " " + G + " " + w + " " + C + " ", g = h;
        else if (h === "c")
          for (p = 0; p < b; p += 6)
            f === "c" ? (B = w + y[p], G = C + y[p + 1], W = w + y[p + 2], Q = C + y[p + 3], w += y[p + 4], C += y[p + 5]) : (B = y[p], G = y[p + 1], W = y[p + 2], Q = y[p + 3], w = y[p + 4], C = y[p + 5]), V += "C " + B + " " + G + " " + W + " " + Q + " " + w + " " + C + " ";
        else if (h === "s")
          for (p = 0; p < b; p += 4)
            B = w, G = C, ["s", "c"].indexOf(g) > -1 && (B += w - W, G += C - Q), f === "s" ? (W = w + y[p], Q = C + y[p + 1], w += y[p + 2], C += y[p + 3]) : (W = y[p], Q = y[p + 1], w = y[p + 2], C = y[p + 3]), V += "C " + B + " " + G + " " + W + " " + Q + " " + w + " " + C + " ";
        else if (h === "a")
          for (p = 0; p < b; p += 7) {
            ee = y[p], oe = y[p + 1], he = y[p + 2], K = x[p + 3];
            let N = !1;
            if (K.length > 1) {
              let $ = parseInt(K[0]), D = parseInt(K[1]), X;
              K.length > 2 && (X = parseFloat(K.substring(2))), y[p + 3] = $, y.splice(p + 4, 0, D), x.splice(p + 4, 0, "+"), X !== void 0 && y.splice(p + 5, 0, X), N = !0;
            }
            K = y[p + 3], T = N ? y[p + 4] : x[p + 4], !N && T.length > 1 && (y[p + 4] = parseInt(T[0]), y.splice(p + 5, 0, parseFloat(T.substring(1)))), T = y[p + 4], f === "a" ? (w += y[p + 5], C += y[p + 6]) : (w = y[p + 5], C = y[p + 6]), V += "A " + ee + " " + oe + " " + he + " " + K + " " + T + " " + w + " " + C + " ";
          }
        else h === "z" && (V += "Z ", w = k, C = P);
        g = h;
      }
      return V.trim();
    }
    function r(o) {
      var l = o.trim().split(" "), a, c = l.length, u = c - 1, f, h = [], g, y, x, b, p, k = new RegExp("[QAZLCM]", ""), P = l.slice(-1)[0].toUpperCase() === "Z";
      for (f = 0; f < c; f++)
        if (a = l[f], k.test(a)) {
          if (a === "A") {
            h.push(l[f + 5] === "0" ? "1" : "0"), h.push(l[f + 4]), h.push(l[f + 3]), h.push(l[f + 2]), h.push(l[f + 1]), h.push(a), h.push(l[f + 7]), h.push(l[f + 6]), f += 7;
            continue;
          } else if (a === "C")
            b = 3, p = 2;
          else if (a === "Q")
            b = 2, p = 1;
          else if (a === "L")
            b = 1, p = 1;
          else if (a === "M")
            b = 1, p = 0;
          else
            continue;
          for (b === p && h.push(a), x = 0; x < b; x++)
            x === p && h.push(a), g = l[++f], y = l[++f], h.push(y), h.push(g);
        } else {
          var w = l.slice(Math.max(f - 3, 0), 3).join(" ");
          throw post = l.slice(f + 1, Math.min(f + 4, u)).join(" "), range = w + " [" + a + "] " + post, "Error while trying to reverse normalized SVG path, at position " + f + " (" + range + `).
Either the path is not normalised, or it's malformed.`;
        }
      h.push("M");
      var C = "", B = h.length - 1, G;
      for (G = B; G > 0; G--)
        C += h[G] + " ";
      return P && (C += "Z"), C = C.replace(/M M/g, "Z M"), C;
    }
    function i(a, l) {
      l = parseInt(l) == l ? l : !1;
      var a = n(a), c = a.replace(/M/g, "|M").split("|"), u;
      if (c.splice(0, 1), l !== !1 && l >= c.length)
        return a;
      if (l === !1)
        c = c.map(function(h) {
          return r(h.trim());
        });
      else {
        var f = c[l];
        f && (u = r(f.trim()), c[l] = u);
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
})(uu);
var Wm = uu.exports;
const ml = /* @__PURE__ */ Um(Wm);
function Km(e, t, n, r) {
  switch (e.pathType) {
    case at.REFLEXIVE:
      return cu(e.source, [t / 2, n / 2], r);
    case at.ARC:
      return ys(e.source, e.target, r);
    case at.ARCREVERSE:
      return ml.reverse(ys(e.source, e.target, r));
    case at.LINE:
      return ir(e.source, e.target, r);
    case at.LINEREVERSE:
      return ml.reverse(ir(e.source, e.target, r));
    default:
      return "";
  }
}
function Xm(e, t, n) {
  return e.id === t.id ? at.REFLEXIVE : n.hasBidirectionalConnection(e, t) ? wl(e, t) ? at.ARCREVERSE : at.ARC : wl(e, t) ? at.LINEREVERSE : at.LINE;
}
function ir(e, t, n) {
  const r = { x: t.x - e.x, y: t.y - e.y };
  let i = Math.sqrt(r.x * r.x + r.y * r.y);
  i === 0 && (i = Number.EPSILON);
  const s = r.x / i, o = r.y / i, l = Ym(e, t, n, s, o);
  return `M${l.start.x},${l.start.y}
          L${l.end.x},${l.end.y}`;
}
function Ym(e, t, n, r, i) {
  let s, o;
  return e.props.shape === J.CIRCLE ? s = {
    x: e.x + (e.renderedSize.radius - 1) * r,
    y: e.y + (e.renderedSize.radius - 1) * i
  } : e.props.shape === J.RECTANGLE && (s = di(
    e.x,
    e.y,
    e.renderedSize.width,
    e.renderedSize.height,
    r,
    i,
    2
  )), t instanceof fi ? o = t.props.shape === J.CIRCLE ? {
    x: t.x - (t.renderedSize.radius + n.markerPadding) * r,
    y: t.y - (t.renderedSize.radius + n.markerPadding) * i
  } : di(
    t.x,
    t.y,
    t.renderedSize.width,
    t.renderedSize.height,
    -r,
    -i,
    -n.markerPadding + 1
  ) : o = {
    x: t.x,
    y: t.y
  }, { start: s, end: o };
}
function ys(e, t, n) {
  const r = new ie([[e.x, e.y]]), i = new ie([[t.x, t.y]]), s = ie.subtract(i, r), o = s.norm("frobenius"), l = s.divide(o);
  let a = e.props.shape === J.CIRCLE ? Mn(10) : Mn(30), c = t.props.shape === J.CIRCLE ? Mn(10) : Mn(30), u = 1.2 * o;
  const f = Jm(e, t, n, r, i, l, {
    start: a,
    end: c
  });
  return `M${f.start.get(0, 0)},${f.start.get(0, 1)}
          A${u},${u},0,0,1,${f.end.get(0, 0)},${f.end.get(0, 1)}`;
}
function Jm(e, t, n, r, i, s, o) {
  let l, a;
  if (e.props.shape === J.CIRCLE)
    l = We(s, -o.start).multiply(e.renderedSize.radius - 1).add(r);
  else if (e.props.shape === J.RECTANGLE) {
    const c = di(
      e.x,
      e.y,
      e.renderedSize.width,
      e.renderedSize.height,
      s.get(0, 0),
      s.get(0, 1),
      2
    );
    l = We(s, -o.start).add([[c.x, c.y]]);
  }
  if (t.props.shape === J.CIRCLE) {
    const c = ie.multiply(s, -1);
    a = We(c, o.end).multiply(t.renderedSize.radius).add(i).add(We(c, o.end).multiply(2 * n.markerBoxSize));
  } else if (t.props.shape === J.RECTANGLE) {
    const c = di(
      t.x,
      t.y,
      t.renderedSize.width,
      t.renderedSize.height,
      -s.get(0, 0),
      -s.get(0, 1)
    ), u = ie.multiply(s, -1);
    a = We(u, o.end).add([[c.x, c.y]]).add(We(u, o.end).multiply(2 * n.markerBoxSize));
  }
  return { start: l, end: a };
}
function cu(e, t, n) {
  const r = new ie([t]);
  if (e.props.shape === J.CIRCLE) {
    const i = new ie([[e.x, e.y]]);
    i.get(0, 0) === r.get(0, 0) && i.get(0, 1) === r.get(0, 1) && r.add([[0, 1]]);
    const s = ie.subtract(i, r), o = s.divide(s.norm("frobenius")), l = Mn(40), a = We(o, l).multiply(e.renderedSize.radius - 1).add(i), c = We(o, -l).multiply(e.renderedSize.radius).add(i).add(We(o, -l).multiply(2 * n.markerBoxSize));
    return `M${a.get(0, 0)},${a.get(0, 1)}
              A${e.renderedSize.radius},${e.renderedSize.radius},0,1,0,${c.get(0, 0)},${c.get(0, 1)}`;
  } else return e.props.shape === J.RECTANGLE ? e.props.reflexiveEdgeStart == "MOVABLE" ? Qm(e, n, r) : Zm(e, n) : "";
}
function wl(e, t) {
  return e.x > t.x;
}
function Qm(e, t, n) {
  if (e.props.shape === J.RECTANGLE) {
    const r = new ie([[e.x, e.y]]);
    r.get(0, 0) === n.get(0, 0) && r.get(0, 1) === n.get(0, 1) && n.add([[0, 1]]);
    const i = ie.subtract(r, n), s = i.divide(i.norm("frobenius")), o = Mn(45);
    let l, a, c = 0.5 * e.renderedSize.width, u = 0.5 * e.renderedSize.height;
    const f = ew(
      i.get(0, 0),
      i.get(0, 1),
      30
    );
    if (f === me.BOTTOMLEFT || f === me.BOTTOMRIGHT || f === me.TOPLEFT || f === me.TOPRIGHT) {
      let h = fu(f, e, t);
      l = h.start, a = h.end, e.renderedSize.width > e.renderedSize.height ? (f === me.TOPLEFT || f === me.BOTTOMRIGHT) && (c = 0.25 * e.renderedSize.width) : e.renderedSize.height > e.renderedSize.width && (f === me.TOPRIGHT || f === me.BOTTOMLEFT) && (u = 0.25 * e.renderedSize.height);
    } else f === me.LEFT || f === me.RIGHT ? (l = We(s, o).multiply(0.5 * e.renderedSize.width - 1).add(r), a = We(s, -o).multiply(0.5 * e.renderedSize.height - 1).add(r).add(We(s, -o).multiply(2 * t.markerBoxSize))) : (l = We(s, o).multiply(0.5 * e.renderedSize.height - 1).add(r), a = We(s, -o).multiply(0.5 * e.renderedSize.width - 1).add(r).add(We(s, -o).multiply(2 * t.markerBoxSize)));
    return `M${l.get(0, 0)},${l.get(0, 1)} A${c},${u}, 0, 1, 0, ${a.get(0, 0)},${a.get(0, 1)}`;
  } else
    return "";
}
function Zm(e, t) {
  if (e.props.shape === J.RECTANGLE && e.props.reflexiveEdgeStart !== "MOVABLE") {
    let n, r, i = 0.5 * e.renderedSize.width, s = 0.5 * e.renderedSize.height;
    e.renderedSize.width > e.renderedSize.height ? (e.props.reflexiveEdgeStart === me.TOPLEFT || e.props.reflexiveEdgeStart === me.BOTTOMRIGHT) && (i = e.renderedSize.width / e.renderedSize.height + e.renderedSize.height) : e.renderedSize.height > e.renderedSize.width && (e.props.reflexiveEdgeStart === me.TOPRIGHT || e.props.reflexiveEdgeStart === me.BOTTOMLEFT) && (s = e.renderedSize.height / e.renderedSize.width + e.renderedSize.width);
    let o = fu(
      e.props.reflexiveEdgeStart,
      e,
      t
    );
    return n = o.start, r = o.end, `M${n.get(0, 0)},${n.get(0, 1)} A${i},${s}, 0, 1, 0, ${r.get(0, 0)},${r.get(0, 1)}`;
  } else
    return "";
}
function di(e, t, n, r, i, s, o = 0) {
  const l = e - 0.5 * n, a = e + 0.5 * n, c = t - 0.5 * r, u = t + 0.5 * r;
  i === 0 && (i = Number.EPSILON), s === 0 && (s = Number.EPSILON);
  const f = i < 0 ? l : a, h = s < 0 ? c : u, g = (f - e) / i, y = (h - t) / s, x = Math.min(g, y);
  let b = e + x * i, p = t + x * s;
  if (o !== 0)
    if (g < y) {
      let k;
      f === l ? k = 1 : k = -1, b = b + o * k;
    } else {
      let k;
      h === c ? k = 1 : k = -1, p = p + o * k;
    }
  return { x: b, y: p };
}
function ew(e, t, n = 30) {
  let r = tw(Math.atan2(e, t));
  return r < 0 && (r += 360), un(r, 0, n) ? me.BOTTOMLEFT : un(r, [0, 90], -n) ? me.BOTTOM : un(r, 90, n) ? me.BOTTOMRIGHT : un(r, [90, 180], -n) ? me.RIGHT : un(r, 180, n) ? me.TOPRIGHT : un(r, [180, 270], -n) ? me.TOP : un(r, 270, n) ? me.TOPLEFT : me.LEFT;
}
function fu(e, t, n) {
  const r = t.x, i = t.y, s = 0.5 * t.renderedSize.width, o = 0.5 * t.renderedSize.height, l = n.markerBoxSize, a = {
    [me.BOTTOMLEFT]: {
      start: [r - s + 2, i + o - 1],
      end: [r + s - 2 * l, i + o + 2 * l]
    },
    [me.BOTTOM]: {
      start: [r + 0.5 * s, i + o - 1],
      end: [r + s + 2 * l, i + 0.5 * o]
    },
    [me.BOTTOMRIGHT]: {
      start: [r + s - 2, i + o - 1],
      end: [r + s + 2 * l, i - o + 2 * l]
    },
    [me.RIGHT]: {
      start: [r + s - 1, i + 0.5 * o],
      end: [r + 0.5 * s, i - 2 * l]
    },
    [me.TOPRIGHT]: {
      start: [r + s - 2, i - o + 1],
      end: [r - s + 2 * l, i - o - 2 * l]
    },
    [me.TOP]: {
      start: [r + 0.5 * s, i + 1],
      end: [r - 2 * l, i + 0.5 * o]
    },
    [me.TOPLEFT]: {
      start: [r - s + 2, i - o + 1],
      end: [r - s - 2 * l, i + o - 2 * l]
    },
    [me.LEFT]: {
      start: [r + 1, i + 0.5 * o],
      end: [r + 0.5 * s, i + o + 2 * l]
    }
  }, { start: c, end: u } = a[e];
  return {
    start: new ie([c]),
    end: new ie([u])
  };
}
function un(e, t, n = 0) {
  e = (e + 360) % 360;
  let r, i;
  return typeof t == "number" ? (r = (t - n + 360) % 360, i = (t + n) % 360) : (r = (t[0] - n + 360) % 360, i = (t[1] + n) % 360), r < i ? e >= r && e <= i : e >= r || e <= i;
}
function Mn(e) {
  return e * (Math.PI / 180);
}
function tw(e) {
  return e * (180 / Math.PI);
}
function We(e, t) {
  const n = e.get(0, 0), r = e.get(0, 1);
  return new ie([
    [
      n * Math.cos(t) - r * Math.sin(t),
      n * Math.sin(t) + r * Math.cos(t)
    ]
  ]);
}
function nw(e) {
  const t = e.replace(/\r\n/g, `
`).split(`
`), n = t.findIndex((l) => l.trim().startsWith("#")), r = n !== -1 ? t.slice(0, n) : t, i = n !== -1 ? t.slice(n + 1) : [], s = [];
  if (r.length)
    for (const l of r) {
      let [, a, c, u] = (l.match(/(\w+) (.*) \/COLOR:\/(.+)/) || l.match(/(\w+) (.*)/) || l.match(/(\w+)/) || []).map((f) => f.trim());
      c != null && c.includes("/COLOR:/") && (u = c, c = ""), a && s.push({
        idImported: a,
        label: c,
        color: u == null ? void 0 : u.replace("/COLOR:/", "")
      });
    }
  const o = [];
  if (i.length)
    for (const l of i) {
      let [, a, c, u, f] = (l.match(/(\w+) (\w+) (.*) \/COLOR:\/(.+)/) || l.match(/(\w+) (\w+) (.*)/) || l.match(/(\w+) (\w+)/) || []).map((h) => h.trim());
      u != null && u.includes("/COLOR:/") && (f = u, u = ""), a && c && o.push({
        sourceIdImported: a,
        targetIdImported: c,
        label: u,
        color: f == null ? void 0 : f.replace("/COLOR:/", "")
      });
    }
  return [s, o];
}
function rw(e) {
  const t = [];
  for (let r of e.nodes)
    t.push({
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
  for (let r of e.links)
    n.push({
      sourceIdImported: r.sourceId,
      targetIdImported: r.targetId,
      label: r.label,
      color: r.color,
      deletable: r.deletable,
      labelEditable: r.labelEditable
    });
  return [t, n];
}
const iw = {
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
}, hu = {
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
}, Pe = {
  tablet: "tablet",
  mobile: "mobile",
  desktop: "desktop",
  tv: "tv"
}, qe = {
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
}, Jt = {
  EdgeHTML: "EdgeHTML",
  Blink: "Blink",
  Trident: "Trident",
  Presto: "Presto",
  Gecko: "Gecko",
  WebKit: "WebKit"
};
class O {
  /**
   * Get first matched item for a string
   * @param {RegExp} regexp
   * @param {String} ua
   * @return {Array|{index: number, input: string}|*|boolean|string}
   */
  static getFirstMatch(t, n) {
    const r = n.match(t);
    return r && r.length > 0 && r[1] || "";
  }
  /**
   * Get second matched item for a string
   * @param regexp
   * @param {String} ua
   * @return {Array|{index: number, input: string}|*|boolean|string}
   */
  static getSecondMatch(t, n) {
    const r = n.match(t);
    return r && r.length > 1 && r[2] || "";
  }
  /**
   * Match a regexp and return a constant or undefined
   * @param {RegExp} regexp
   * @param {String} ua
   * @param {*} _const Any const that will be returned if regexp matches the string
   * @return {*}
   */
  static matchAndReturnConst(t, n, r) {
    if (t.test(n))
      return r;
  }
  static getWindowsVersionName(t) {
    switch (t) {
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
  static getMacOSVersionName(t) {
    const n = t.split(".").splice(0, 2).map((r) => parseInt(r, 10) || 0);
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
  static getAndroidVersionName(t) {
    const n = t.split(".").splice(0, 2).map((r) => parseInt(r, 10) || 0);
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
  static getVersionPrecision(t) {
    return t.split(".").length;
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
  static compareVersions(t, n, r = !1) {
    const i = O.getVersionPrecision(t), s = O.getVersionPrecision(n);
    let o = Math.max(i, s), l = 0;
    const a = O.map([t, n], (c) => {
      const u = o - O.getVersionPrecision(c), f = c + new Array(u + 1).join(".0");
      return O.map(f.split("."), (h) => new Array(20 - h.length).join("0") + h).reverse();
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
  static map(t, n) {
    const r = [];
    let i;
    if (Array.prototype.map)
      return Array.prototype.map.call(t, n);
    for (i = 0; i < t.length; i += 1)
      r.push(n(t[i]));
    return r;
  }
  /**
   * Array::find polyfill
   *
   * @param  {Array} arr
   * @param  {Function} predicate
   * @return {Array}
   */
  static find(t, n) {
    let r, i;
    if (Array.prototype.find)
      return Array.prototype.find.call(t, n);
    for (r = 0, i = t.length; r < i; r += 1) {
      const s = t[r];
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
  static assign(t, ...n) {
    const r = t;
    let i, s;
    if (Object.assign)
      return Object.assign(t, ...n);
    for (i = 0, s = n.length; i < s; i += 1) {
      const o = n[i];
      typeof o == "object" && o !== null && Object.keys(o).forEach((a) => {
        r[a] = o[a];
      });
    }
    return t;
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
  static getBrowserAlias(t) {
    return iw[t];
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
  static getBrowserTypeByAlias(t) {
    return hu[t] || "";
  }
}
const xe = /version\/(\d+(\.?_?\d+)+)/i, sw = [
  /* Googlebot */
  {
    test: [/googlebot/i],
    describe(e) {
      const t = {
        name: "Googlebot"
      }, n = O.getFirstMatch(/googlebot\/(\d+(\.\d+))/i, e) || O.getFirstMatch(xe, e);
      return n && (t.version = n), t;
    }
  },
  /* Opera < 13.0 */
  {
    test: [/opera/i],
    describe(e) {
      const t = {
        name: "Opera"
      }, n = O.getFirstMatch(xe, e) || O.getFirstMatch(/(?:opera)[\s/](\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  /* Opera > 13.0 */
  {
    test: [/opr\/|opios/i],
    describe(e) {
      const t = {
        name: "Opera"
      }, n = O.getFirstMatch(/(?:opr|opios)[\s/](\S+)/i, e) || O.getFirstMatch(xe, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/SamsungBrowser/i],
    describe(e) {
      const t = {
        name: "Samsung Internet for Android"
      }, n = O.getFirstMatch(xe, e) || O.getFirstMatch(/(?:SamsungBrowser)[\s/](\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/Whale/i],
    describe(e) {
      const t = {
        name: "NAVER Whale Browser"
      }, n = O.getFirstMatch(xe, e) || O.getFirstMatch(/(?:whale)[\s/](\d+(?:\.\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/MZBrowser/i],
    describe(e) {
      const t = {
        name: "MZ Browser"
      }, n = O.getFirstMatch(/(?:MZBrowser)[\s/](\d+(?:\.\d+)+)/i, e) || O.getFirstMatch(xe, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/focus/i],
    describe(e) {
      const t = {
        name: "Focus"
      }, n = O.getFirstMatch(/(?:focus)[\s/](\d+(?:\.\d+)+)/i, e) || O.getFirstMatch(xe, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/swing/i],
    describe(e) {
      const t = {
        name: "Swing"
      }, n = O.getFirstMatch(/(?:swing)[\s/](\d+(?:\.\d+)+)/i, e) || O.getFirstMatch(xe, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/coast/i],
    describe(e) {
      const t = {
        name: "Opera Coast"
      }, n = O.getFirstMatch(xe, e) || O.getFirstMatch(/(?:coast)[\s/](\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/opt\/\d+(?:.?_?\d+)+/i],
    describe(e) {
      const t = {
        name: "Opera Touch"
      }, n = O.getFirstMatch(/(?:opt)[\s/](\d+(\.?_?\d+)+)/i, e) || O.getFirstMatch(xe, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/yabrowser/i],
    describe(e) {
      const t = {
        name: "Yandex Browser"
      }, n = O.getFirstMatch(/(?:yabrowser)[\s/](\d+(\.?_?\d+)+)/i, e) || O.getFirstMatch(xe, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/ucbrowser/i],
    describe(e) {
      const t = {
        name: "UC Browser"
      }, n = O.getFirstMatch(xe, e) || O.getFirstMatch(/(?:ucbrowser)[\s/](\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/Maxthon|mxios/i],
    describe(e) {
      const t = {
        name: "Maxthon"
      }, n = O.getFirstMatch(xe, e) || O.getFirstMatch(/(?:Maxthon|mxios)[\s/](\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/epiphany/i],
    describe(e) {
      const t = {
        name: "Epiphany"
      }, n = O.getFirstMatch(xe, e) || O.getFirstMatch(/(?:epiphany)[\s/](\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/puffin/i],
    describe(e) {
      const t = {
        name: "Puffin"
      }, n = O.getFirstMatch(xe, e) || O.getFirstMatch(/(?:puffin)[\s/](\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/sleipnir/i],
    describe(e) {
      const t = {
        name: "Sleipnir"
      }, n = O.getFirstMatch(xe, e) || O.getFirstMatch(/(?:sleipnir)[\s/](\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/k-meleon/i],
    describe(e) {
      const t = {
        name: "K-Meleon"
      }, n = O.getFirstMatch(xe, e) || O.getFirstMatch(/(?:k-meleon)[\s/](\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/micromessenger/i],
    describe(e) {
      const t = {
        name: "WeChat"
      }, n = O.getFirstMatch(/(?:micromessenger)[\s/](\d+(\.?_?\d+)+)/i, e) || O.getFirstMatch(xe, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/qqbrowser/i],
    describe(e) {
      const t = {
        name: /qqbrowserlite/i.test(e) ? "QQ Browser Lite" : "QQ Browser"
      }, n = O.getFirstMatch(/(?:qqbrowserlite|qqbrowser)[/](\d+(\.?_?\d+)+)/i, e) || O.getFirstMatch(xe, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/msie|trident/i],
    describe(e) {
      const t = {
        name: "Internet Explorer"
      }, n = O.getFirstMatch(/(?:msie |rv:)(\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/\sedg\//i],
    describe(e) {
      const t = {
        name: "Microsoft Edge"
      }, n = O.getFirstMatch(/\sedg\/(\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/edg([ea]|ios)/i],
    describe(e) {
      const t = {
        name: "Microsoft Edge"
      }, n = O.getSecondMatch(/edg([ea]|ios)\/(\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/vivaldi/i],
    describe(e) {
      const t = {
        name: "Vivaldi"
      }, n = O.getFirstMatch(/vivaldi\/(\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/seamonkey/i],
    describe(e) {
      const t = {
        name: "SeaMonkey"
      }, n = O.getFirstMatch(/seamonkey\/(\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/sailfish/i],
    describe(e) {
      const t = {
        name: "Sailfish"
      }, n = O.getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/silk/i],
    describe(e) {
      const t = {
        name: "Amazon Silk"
      }, n = O.getFirstMatch(/silk\/(\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/phantom/i],
    describe(e) {
      const t = {
        name: "PhantomJS"
      }, n = O.getFirstMatch(/phantomjs\/(\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/slimerjs/i],
    describe(e) {
      const t = {
        name: "SlimerJS"
      }, n = O.getFirstMatch(/slimerjs\/(\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/blackberry|\bbb\d+/i, /rim\stablet/i],
    describe(e) {
      const t = {
        name: "BlackBerry"
      }, n = O.getFirstMatch(xe, e) || O.getFirstMatch(/blackberry[\d]+\/(\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/(web|hpw)[o0]s/i],
    describe(e) {
      const t = {
        name: "WebOS Browser"
      }, n = O.getFirstMatch(xe, e) || O.getFirstMatch(/w(?:eb)?[o0]sbrowser\/(\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/bada/i],
    describe(e) {
      const t = {
        name: "Bada"
      }, n = O.getFirstMatch(/dolfin\/(\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/tizen/i],
    describe(e) {
      const t = {
        name: "Tizen"
      }, n = O.getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.?_?\d+)+)/i, e) || O.getFirstMatch(xe, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/qupzilla/i],
    describe(e) {
      const t = {
        name: "QupZilla"
      }, n = O.getFirstMatch(/(?:qupzilla)[\s/](\d+(\.?_?\d+)+)/i, e) || O.getFirstMatch(xe, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/firefox|iceweasel|fxios/i],
    describe(e) {
      const t = {
        name: "Firefox"
      }, n = O.getFirstMatch(/(?:firefox|iceweasel|fxios)[\s/](\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/electron/i],
    describe(e) {
      const t = {
        name: "Electron"
      }, n = O.getFirstMatch(/(?:electron)\/(\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/MiuiBrowser/i],
    describe(e) {
      const t = {
        name: "Miui"
      }, n = O.getFirstMatch(/(?:MiuiBrowser)[\s/](\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/chromium/i],
    describe(e) {
      const t = {
        name: "Chromium"
      }, n = O.getFirstMatch(/(?:chromium)[\s/](\d+(\.?_?\d+)+)/i, e) || O.getFirstMatch(xe, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/chrome|crios|crmo/i],
    describe(e) {
      const t = {
        name: "Chrome"
      }, n = O.getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/GSA/i],
    describe(e) {
      const t = {
        name: "Google Search"
      }, n = O.getFirstMatch(/(?:GSA)\/(\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  /* Android Browser */
  {
    test(e) {
      const t = !e.test(/like android/i), n = e.test(/android/i);
      return t && n;
    },
    describe(e) {
      const t = {
        name: "Android Browser"
      }, n = O.getFirstMatch(xe, e);
      return n && (t.version = n), t;
    }
  },
  /* PlayStation 4 */
  {
    test: [/playstation 4/i],
    describe(e) {
      const t = {
        name: "PlayStation 4"
      }, n = O.getFirstMatch(xe, e);
      return n && (t.version = n), t;
    }
  },
  /* Safari */
  {
    test: [/safari|applewebkit/i],
    describe(e) {
      const t = {
        name: "Safari"
      }, n = O.getFirstMatch(xe, e);
      return n && (t.version = n), t;
    }
  },
  /* Something else */
  {
    test: [/.*/i],
    describe(e) {
      const t = /^(.*)\/(.*) /, n = /^(.*)\/(.*)[ \t]\((.*)/, i = e.search("\\(") !== -1 ? n : t;
      return {
        name: O.getFirstMatch(i, e),
        version: O.getSecondMatch(i, e)
      };
    }
  }
], ow = [
  /* Roku */
  {
    test: [/Roku\/DVP/],
    describe(e) {
      const t = O.getFirstMatch(/Roku\/DVP-(\d+\.\d+)/i, e);
      return {
        name: qe.Roku,
        version: t
      };
    }
  },
  /* Windows Phone */
  {
    test: [/windows phone/i],
    describe(e) {
      const t = O.getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i, e);
      return {
        name: qe.WindowsPhone,
        version: t
      };
    }
  },
  /* Windows */
  {
    test: [/windows /i],
    describe(e) {
      const t = O.getFirstMatch(/Windows ((NT|XP)( \d\d?.\d)?)/i, e), n = O.getWindowsVersionName(t);
      return {
        name: qe.Windows,
        version: t,
        versionName: n
      };
    }
  },
  /* Firefox on iPad */
  {
    test: [/Macintosh(.*?) FxiOS(.*?)\//],
    describe(e) {
      const t = {
        name: qe.iOS
      }, n = O.getSecondMatch(/(Version\/)(\d[\d.]+)/, e);
      return n && (t.version = n), t;
    }
  },
  /* macOS */
  {
    test: [/macintosh/i],
    describe(e) {
      const t = O.getFirstMatch(/mac os x (\d+(\.?_?\d+)+)/i, e).replace(/[_\s]/g, "."), n = O.getMacOSVersionName(t), r = {
        name: qe.MacOS,
        version: t
      };
      return n && (r.versionName = n), r;
    }
  },
  /* iOS */
  {
    test: [/(ipod|iphone|ipad)/i],
    describe(e) {
      const t = O.getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i, e).replace(/[_\s]/g, ".");
      return {
        name: qe.iOS,
        version: t
      };
    }
  },
  /* Android */
  {
    test(e) {
      const t = !e.test(/like android/i), n = e.test(/android/i);
      return t && n;
    },
    describe(e) {
      const t = O.getFirstMatch(/android[\s/-](\d+(\.\d+)*)/i, e), n = O.getAndroidVersionName(t), r = {
        name: qe.Android,
        version: t
      };
      return n && (r.versionName = n), r;
    }
  },
  /* WebOS */
  {
    test: [/(web|hpw)[o0]s/i],
    describe(e) {
      const t = O.getFirstMatch(/(?:web|hpw)[o0]s\/(\d+(\.\d+)*)/i, e), n = {
        name: qe.WebOS
      };
      return t && t.length && (n.version = t), n;
    }
  },
  /* BlackBerry */
  {
    test: [/blackberry|\bbb\d+/i, /rim\stablet/i],
    describe(e) {
      const t = O.getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i, e) || O.getFirstMatch(/blackberry\d+\/(\d+([_\s]\d+)*)/i, e) || O.getFirstMatch(/\bbb(\d+)/i, e);
      return {
        name: qe.BlackBerry,
        version: t
      };
    }
  },
  /* Bada */
  {
    test: [/bada/i],
    describe(e) {
      const t = O.getFirstMatch(/bada\/(\d+(\.\d+)*)/i, e);
      return {
        name: qe.Bada,
        version: t
      };
    }
  },
  /* Tizen */
  {
    test: [/tizen/i],
    describe(e) {
      const t = O.getFirstMatch(/tizen[/\s](\d+(\.\d+)*)/i, e);
      return {
        name: qe.Tizen,
        version: t
      };
    }
  },
  /* Linux */
  {
    test: [/linux/i],
    describe() {
      return {
        name: qe.Linux
      };
    }
  },
  /* Chrome OS */
  {
    test: [/CrOS/],
    describe() {
      return {
        name: qe.ChromeOS
      };
    }
  },
  /* Playstation 4 */
  {
    test: [/PlayStation 4/],
    describe(e) {
      const t = O.getFirstMatch(/PlayStation 4[/\s](\d+(\.\d+)*)/i, e);
      return {
        name: qe.PlayStation4,
        version: t
      };
    }
  }
], lw = [
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
    describe(e) {
      const t = O.getFirstMatch(/(can-l01)/i, e) && "Nova", n = {
        type: Pe.mobile,
        vendor: "Huawei"
      };
      return t && (n.model = t), n;
    }
  },
  /* Nexus Tablet */
  {
    test: [/nexus\s*(?:7|8|9|10).*/i],
    describe() {
      return {
        type: Pe.tablet,
        vendor: "Nexus"
      };
    }
  },
  /* iPad */
  {
    test: [/ipad/i],
    describe() {
      return {
        type: Pe.tablet,
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
        type: Pe.tablet,
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
        type: Pe.tablet,
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
        type: Pe.tablet,
        vendor: "Amazon"
      };
    }
  },
  /* Tablet */
  {
    test: [/tablet(?! pc)/i],
    describe() {
      return {
        type: Pe.tablet
      };
    }
  },
  /* iPod/iPhone */
  {
    test(e) {
      const t = e.test(/ipod|iphone/i), n = e.test(/like (ipod|iphone)/i);
      return t && !n;
    },
    describe(e) {
      const t = O.getFirstMatch(/(ipod|iphone)/i, e);
      return {
        type: Pe.mobile,
        vendor: "Apple",
        model: t
      };
    }
  },
  /* Nexus Mobile */
  {
    test: [/nexus\s*[0-6].*/i, /galaxy nexus/i],
    describe() {
      return {
        type: Pe.mobile,
        vendor: "Nexus"
      };
    }
  },
  /* Mobile */
  {
    test: [/[^-]mobi/i],
    describe() {
      return {
        type: Pe.mobile
      };
    }
  },
  /* BlackBerry */
  {
    test(e) {
      return e.getBrowserName(!0) === "blackberry";
    },
    describe() {
      return {
        type: Pe.mobile,
        vendor: "BlackBerry"
      };
    }
  },
  /* Bada */
  {
    test(e) {
      return e.getBrowserName(!0) === "bada";
    },
    describe() {
      return {
        type: Pe.mobile
      };
    }
  },
  /* Windows Phone */
  {
    test(e) {
      return e.getBrowserName() === "windows phone";
    },
    describe() {
      return {
        type: Pe.mobile,
        vendor: "Microsoft"
      };
    }
  },
  /* Android Tablet */
  {
    test(e) {
      const t = Number(String(e.getOSVersion()).split(".")[0]);
      return e.getOSName(!0) === "android" && t >= 3;
    },
    describe() {
      return {
        type: Pe.tablet
      };
    }
  },
  /* Android Mobile */
  {
    test(e) {
      return e.getOSName(!0) === "android";
    },
    describe() {
      return {
        type: Pe.mobile
      };
    }
  },
  /* desktop */
  {
    test(e) {
      return e.getOSName(!0) === "macos";
    },
    describe() {
      return {
        type: Pe.desktop,
        vendor: "Apple"
      };
    }
  },
  /* Windows */
  {
    test(e) {
      return e.getOSName(!0) === "windows";
    },
    describe() {
      return {
        type: Pe.desktop
      };
    }
  },
  /* Linux */
  {
    test(e) {
      return e.getOSName(!0) === "linux";
    },
    describe() {
      return {
        type: Pe.desktop
      };
    }
  },
  /* PlayStation 4 */
  {
    test(e) {
      return e.getOSName(!0) === "playstation 4";
    },
    describe() {
      return {
        type: Pe.tv
      };
    }
  },
  /* Roku */
  {
    test(e) {
      return e.getOSName(!0) === "roku";
    },
    describe() {
      return {
        type: Pe.tv
      };
    }
  }
], aw = [
  /* EdgeHTML */
  {
    test(e) {
      return e.getBrowserName(!0) === "microsoft edge";
    },
    describe(e) {
      if (/\sedg\//i.test(e))
        return {
          name: Jt.Blink
        };
      const n = O.getFirstMatch(/edge\/(\d+(\.?_?\d+)+)/i, e);
      return {
        name: Jt.EdgeHTML,
        version: n
      };
    }
  },
  /* Trident */
  {
    test: [/trident/i],
    describe(e) {
      const t = {
        name: Jt.Trident
      }, n = O.getFirstMatch(/trident\/(\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  /* Presto */
  {
    test(e) {
      return e.test(/presto/i);
    },
    describe(e) {
      const t = {
        name: Jt.Presto
      }, n = O.getFirstMatch(/presto\/(\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  /* Gecko */
  {
    test(e) {
      const t = e.test(/gecko/i), n = e.test(/like gecko/i);
      return t && !n;
    },
    describe(e) {
      const t = {
        name: Jt.Gecko
      }, n = O.getFirstMatch(/gecko\/(\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  /* Blink */
  {
    test: [/(apple)?webkit\/537\.36/i],
    describe() {
      return {
        name: Jt.Blink
      };
    }
  },
  /* WebKit */
  {
    test: [/(apple)?webkit/i],
    describe(e) {
      const t = {
        name: Jt.WebKit
      }, n = O.getFirstMatch(/webkit\/(\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  }
];
class yl {
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
  constructor(t, n = !1) {
    if (t == null || t === "")
      throw new Error("UserAgent parameter can't be empty");
    this._ua = t, this.parsedResult = {}, n !== !0 && this.parse();
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
  test(t) {
    return t.test(this._ua);
  }
  /**
   * Get parsed browser object
   * @return {Object}
   */
  parseBrowser() {
    this.parsedResult.browser = {};
    const t = O.find(sw, (n) => {
      if (typeof n.test == "function")
        return n.test(this);
      if (n.test instanceof Array)
        return n.test.some((r) => this.test(r));
      throw new Error("Browser's test function is not valid");
    });
    return t && (this.parsedResult.browser = t.describe(this.getUA())), this.parsedResult.browser;
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
  getBrowserName(t) {
    return t ? String(this.getBrowser().name).toLowerCase() || "" : this.getBrowser().name || "";
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
    const t = O.find(ow, (n) => {
      if (typeof n.test == "function")
        return n.test(this);
      if (n.test instanceof Array)
        return n.test.some((r) => this.test(r));
      throw new Error("Browser's test function is not valid");
    });
    return t && (this.parsedResult.os = t.describe(this.getUA())), this.parsedResult.os;
  }
  /**
   * Get OS name
   * @param {Boolean} [toLowerCase] return lower-cased value
   * @return {String} name of the OS — macOS, Windows, Linux, etc.
   */
  getOSName(t) {
    const { name: n } = this.getOS();
    return t ? String(n).toLowerCase() || "" : n || "";
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
  getPlatformType(t = !1) {
    const { type: n } = this.getPlatform();
    return t ? String(n).toLowerCase() || "" : n || "";
  }
  /**
   * Get parsed platform
   * @return {{}}
   */
  parsePlatform() {
    this.parsedResult.platform = {};
    const t = O.find(lw, (n) => {
      if (typeof n.test == "function")
        return n.test(this);
      if (n.test instanceof Array)
        return n.test.some((r) => this.test(r));
      throw new Error("Browser's test function is not valid");
    });
    return t && (this.parsedResult.platform = t.describe(this.getUA())), this.parsedResult.platform;
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
  getEngineName(t) {
    return t ? String(this.getEngine().name).toLowerCase() || "" : this.getEngine().name || "";
  }
  /**
   * Get parsed platform
   * @return {{}}
   */
  parseEngine() {
    this.parsedResult.engine = {};
    const t = O.find(aw, (n) => {
      if (typeof n.test == "function")
        return n.test(this);
      if (n.test instanceof Array)
        return n.test.some((r) => this.test(r));
      throw new Error("Browser's test function is not valid");
    });
    return t && (this.parsedResult.engine = t.describe(this.getUA())), this.parsedResult.engine;
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
    return O.assign({}, this.parsedResult);
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
  satisfies(t) {
    const n = {};
    let r = 0;
    const i = {};
    let s = 0;
    if (Object.keys(t).forEach((l) => {
      const a = t[l];
      typeof a == "string" ? (i[l] = a, s += 1) : typeof a == "object" && (n[l] = a, r += 1);
    }), r > 0) {
      const l = Object.keys(n), a = O.find(l, (u) => this.isOS(u));
      if (a) {
        const u = this.satisfies(n[a]);
        if (u !== void 0)
          return u;
      }
      const c = O.find(
        l,
        (u) => this.isPlatform(u)
      );
      if (c) {
        const u = this.satisfies(n[c]);
        if (u !== void 0)
          return u;
      }
    }
    if (s > 0) {
      const l = Object.keys(i), a = O.find(l, (c) => this.isBrowser(c, !0));
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
  isBrowser(t, n = !1) {
    const r = this.getBrowserName().toLowerCase();
    let i = t.toLowerCase();
    const s = O.getBrowserTypeByAlias(i);
    return n && s && (i = s.toLowerCase()), i === r;
  }
  compareVersion(t) {
    let n = [0], r = t, i = !1;
    const s = this.getBrowserVersion();
    if (typeof s == "string")
      return t[0] === ">" || t[0] === "<" ? (r = t.substr(1), t[1] === "=" ? (i = !0, r = t.substr(2)) : n = [], t[0] === ">" ? n.push(1) : n.push(-1)) : t[0] === "=" ? r = t.substr(1) : t[0] === "~" && (i = !0, r = t.substr(1)), n.indexOf(
        O.compareVersions(s, r, i)
      ) > -1;
  }
  isOS(t) {
    return this.getOSName(!0) === String(t).toLowerCase();
  }
  isPlatform(t) {
    return this.getPlatformType(!0) === String(t).toLowerCase();
  }
  isEngine(t) {
    return this.getEngineName(!0) === String(t).toLowerCase();
  }
  /**
   * Is anything? Check if the browser is called "anything",
   * the OS called "anything" or the platform called "anything"
   * @param {String} anything
   * @param [includingAlias=false] The flag showing whether alias will be included into comparison
   * @returns {Boolean}
   */
  is(t, n = !1) {
    return this.isBrowser(t, n) || this.isOS(t) || this.isPlatform(t);
  }
  /**
   * Check if any of the given values satisfies this.is(anything)
   * @param {String[]} anythings
   * @returns {Boolean}
   */
  some(t = []) {
    return t.some((n) => this.is(n));
  }
}
/*!
 * Bowser - a browser detector
 * https://github.com/lancedikson/bowser
 * MIT License | (c) Dustin Diaz 2012-2015
 * MIT License | (c) Denis Demchenko 2015-2019
 */
class uw {
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
  static getParser(t, n = !1) {
    if (typeof t != "string")
      throw new Error("UserAgent should be a string");
    return new yl(t, n);
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
  static parse(t) {
    return new yl(t).getResult();
  }
  static get BROWSER_MAP() {
    return hu;
  }
  static get ENGINE_MAP() {
    return Jt;
  }
  static get OS_MAP() {
    return qe;
  }
  static get PLATFORMS_MAP() {
    return Pe;
  }
}
const cw = /* @__PURE__ */ Is({
  __name: "GraphComponent",
  setup(e, { expose: t }) {
    const n = ss(() => {
      const d = document.querySelectorAll("graph-component");
      let _;
      for (let m = 0; m < d.length; m++) {
        const M = d[m], E = pe(M.shadowRoot);
        let R;
        if (E.empty() ? R = pe(
          ".graph-controller__graph-host.uninitialised"
        ) : R = E.select(
          ".graph-controller__graph-host.uninitialised"
        ), !R.empty()) {
          R.classed("uninitialised", !1), _ = R;
          break;
        }
      }
      return _ === void 0 && (_ = pe(
        ".graph-controller__graph-host.uninitialised"
      ), _.classed("uninitialised", !1)), _;
    }), r = ss(() => {
      let d = n.value.node().parentElement;
      d || (d = n.value.node().getRootNode().host);
      let _ = d.getAttribute("id");
      return _ || "gc";
    });
    Zl(() => {
      A(), window.addEventListener("resize", so);
    }), As(() => {
      window.removeEventListener("resize", so);
    });
    const s = uw.getParser(window.navigator.userAgent).getPlatformType(!0);
    let o = !1, l = { x: -1e5, y: -1e5 };
    const a = ho(new fl()), c = ho(!1), u = vi(new B0());
    let f, h = 400, g = 400, y, x, b, p, k, P, w, C, B, G = 0, W = 0, Q = 1, ee, oe, he;
    t({
      setDefaults: K,
      getGraph: T,
      setGraph: V,
      printGraph: N,
      deleteElement: $,
      setLabel: D,
      setColor: X,
      setNodeSize: ae,
      getNodeSize: Y,
      setNodeShape: ue,
      setNodeProps: Re,
      setDeletable: ve,
      setLabelEditable: be,
      setNodesLinkPermission: ke,
      setNodesFixedPosition: Te,
      setEditability: Le,
      toggleNodeLabels: v,
      toggleLinkLabels: Wt,
      toggleZoom: S,
      toggleNodePhysics: De,
      toggleFixedLinkDistance: rt,
      toggleNodeCreationViaGUI: L,
      toggleNodeAutoGrow: F,
      resetView: Sr,
      setNodeGroupsFn: I,
      createNode: U,
      getNodeFixedPosition: Mu,
      setNodeFixedPosition: Tu,
      setNodePosition: ku
    });
    function K(d) {
      d.zoomEnabled !== void 0 && S(d.zoomEnabled), d.nodePhysicsEnabled !== void 0 && De(d.nodePhysicsEnabled), d.fixedLinkDistanceEnabled !== void 0 && rt(d.fixedLinkDistanceEnabled), d.showNodeLabels !== void 0 && v(d.showNodeLabels), d.showLinkLabels !== void 0 && Wt(d.showLinkLabels), d.nodeAutoGrowToLabelSize !== void 0 && F(d.nodeAutoGrowToLabelSize), d.allowNodeCreationViaGUI !== void 0 && L(d.allowNodeCreationViaGUI), u.nodeProps = d.nodeProps ?? u.nodeProps, u.nodeGUIEditability = d.nodeGUIEditability ?? u.nodeGUIEditability, u.linkGUIEditability = d.linkGUIEditability ?? u.linkGUIEditability, re();
    }
    function T(d = "json", _ = !0, m = !0, M = !0, E = !0, R = !0) {
      if (d.toLowerCase() === "json")
        return JSON.parse(
          a.value.toJSON(
            _,
            u.showNodeLabels,
            u.showLinkLabels,
            m,
            M,
            M,
            E,
            E,
            R
          )
        );
      if (d.toLowerCase() === "tgf")
        return a.value.toTGF(u.showNodeLabels, u.showLinkLabels, !0, !0);
      console.error('Invalid format while using getGraph(). Please choose "JSON" or "TGF".');
    }
    function V(d) {
      typeof d == "object" || typeof d == "string" ? Eu(d) : oo();
    }
    function N(d = "json", _ = !0, m = !0, M = !0, E = !0, R = !0) {
      d.toLowerCase() === "json" ? console.log(
        a.value.toJSON(
          _,
          u.showNodeLabels,
          u.showLinkLabels,
          m,
          M,
          M,
          E,
          E,
          R
        )
      ) : console.log(a.value.toTGF(u.showNodeLabels, u.showLinkLabels));
    }
    function $(d) {
      if (d !== void 0) {
        const [_, m] = _t(d);
        for (const M of _)
          k.filter((E) => E.id === M).each(function(E) {
            let R = a.value.removeNode(E);
            if (R !== void 0) {
              let [ne, Se] = R;
              Ar(ne, n.value, He.PROGRAMMATIC_ACTION), Se.forEach((ge) => {
                an(ge, n.value, He.PROGRAMMATIC_ACTION);
              });
            }
          });
        for (const M of m)
          p.filter((E) => E.id === M).each(function(E) {
            let R = a.value.removeLink(E);
            R !== void 0 && an(R, n.value, He.PROGRAMMATIC_ACTION);
          });
      } else
        k.each(function(_) {
          let m = a.value.removeNode(_);
          if (m !== void 0) {
            let [M, E] = m;
            Ar(M, n.value, He.PROGRAMMATIC_ACTION), E.forEach((R) => {
              an(R, n.value, He.PROGRAMMATIC_ACTION);
            });
          }
        }), p.each(function(_) {
          let m = a.value.removeLink(_);
          m !== void 0 && an(m, n.value, He.PROGRAMMATIC_ACTION);
        });
      c.value = a.value.nodes.length > 0, re();
    }
    function D(d, _) {
      if (_ !== void 0) {
        const [m, M] = _t(_);
        for (const E of m)
          k.filter((R) => R.id === E).each((R) => {
            Bn(R, d);
          });
        for (const E of M)
          p.filter((R) => R.id === E).each((R) => {
            Bn(R, d);
          });
      } else
        k.each((m) => {
          Bn(m, d);
        }), p.each((m) => {
          Bn(m, d);
        });
    }
    function X(d, _) {
      if (_ !== void 0) {
        const [m, M] = _t(_);
        io(M);
        for (const E of m)
          k.selectAll(".graph-controller__node").filter((R) => R.id === E).each((R) => R.color = d).style("fill", d);
        for (const E of M)
          p.selectAll(".graph-controller__link").filter((R) => R.id === E).each((R) => R.color = d).style("stroke", d);
      } else
        k.selectAll(".graph-controller__node").each((m) => m.color = d).style("fill", d), io(a.value.links.map((m) => m.id)), p.selectAll(".graph-controller__link").each((m) => m.color = d).style("stroke", d);
      ws(b, r.value, u, d), re();
    }
    function Y(d) {
      return Mr(d).getSize();
    }
    function ae(d, _) {
      if (_ !== void 0) {
        const [m] = _t(_);
        for (const M of m)
          k.filter((E) => E.id === M).each(function(E) {
            let R, ne;
            u.nodeAutoGrowToLabelSize && (R = pe(this).select("foreignObject").select("div").node().getBoundingClientRect()), typeof d == "number" ? (E.setSize(d, u), u.nodeAutoGrowToLabelSize && R ? ne = R : ne = { width: 0, height: 0 }, z(E, ne)) : E.props.shape === J.CIRCLE && Yt(["radius"], Object.keys(d), !0) ? (E.setSize(d, u), u.nodeAutoGrowToLabelSize && R ? ne = R : ne = { width: 0, height: 0 }, z(E, ne)) : E.props.shape === J.RECTANGLE && Yt(["width", "height"], Object.keys(d), !0) && (E.setSize(d, u), u.nodeAutoGrowToLabelSize && R ? ne = R : ne = { width: 0, height: 0 }, z(E, ne));
          });
      } else
        k.each(function(m) {
          let M, E;
          u.nodeAutoGrowToLabelSize && (M = pe(this).select("foreignObject").select("div").node().getBoundingClientRect()), typeof d == "number" ? (m.setSize(d, u), u.nodeAutoGrowToLabelSize && M ? E = M : E = { width: 0, height: 0 }, z(m, E)) : m.props.shape === J.CIRCLE && Yt(["radius"], Object.keys(d), !1) ? (m.setSize(d, u), u.nodeAutoGrowToLabelSize && M ? E = M : E = { width: 0, height: 0 }, z(m, E)) : m.props.shape === J.RECTANGLE && Yt(["width", "height"], Object.keys(d), !1) && (m.setSize(d, u), u.nodeAutoGrowToLabelSize && M ? E = M : E = { width: 0, height: 0 }, z(m, E));
        });
      re();
    }
    function ue(d, _) {
      if (_ !== void 0) {
        const [m] = _t(_);
        for (const M of m)
          k.filter((E) => E.id === M).each(function(E) {
            if (E.props.shape !== d) {
              let R, ne;
              u.nodeAutoGrowToLabelSize && (R = pe(this).select("foreignObject").select("div").node(), ne = R.getBoundingClientRect()), E.setShape(d, u), u.nodeAutoGrowToLabelSize && ne && z(E, ne);
            }
          });
      } else
        k.each(function(m) {
          if (m.props.shape !== d) {
            let M, E;
            u.nodeAutoGrowToLabelSize && (M = pe(this).select("foreignObject").select("div").node(), E = M.getBoundingClientRect()), m.setShape(d, u), u.nodeAutoGrowToLabelSize && E && z(m, E);
          }
        });
      re();
    }
    function Re(d, _) {
      if (Yt(["shape"], Object.keys(d), !1)) {
        let m;
        if (_ !== void 0 ? [m] = _t(_) : m = void 0, d.shape === J.CIRCLE) {
          const M = ["shape", "radius"];
          if (Yt(M, Object.keys(d), !0))
            if (m !== void 0)
              for (const E of m)
                k.filter((R) => R.id === E).each(function(R) {
                  R.props = d;
                  let ne;
                  if (u.nodeAutoGrowToLabelSize) {
                    let Se, ge;
                    Se = pe(this).select("foreignObject").select("div").node(), ge = Se.getBoundingClientRect(), ne = ge;
                  } else
                    ne = { width: 0, height: 0 };
                  z(R, ne);
                });
            else
              k.each(function(E) {
                E.props = d;
                let R;
                if (u.nodeAutoGrowToLabelSize) {
                  let ne, Se;
                  ne = pe(this).select("foreignObject").select("div").node(), Se = ne.getBoundingClientRect(), R = Se;
                } else
                  R = { width: 0, height: 0 };
                z(E, R);
              });
          Xn(M, Object.keys(d));
        } else if (d.shape === J.RECTANGLE) {
          const M = [
            "shape",
            "width",
            "height",
            "cornerRadius",
            "reflexiveEdgeStart"
          ];
          if (Yt(M, Object.keys(d), !0)) {
            if (Object.values(me).includes(d.reflexiveEdgeStart) || d.reflexiveEdgeStart === "MOVABLE")
              if (m !== void 0)
                for (const E of m)
                  k.filter((R) => R.id === E).each(function(R) {
                    R.props = d;
                    let ne;
                    if (u.nodeAutoGrowToLabelSize) {
                      let Se, ge;
                      Se = pe(this).select("foreignObject").select("div").node(), ge = Se.getBoundingClientRect(), ne = ge;
                    } else
                      ne = { width: 0, height: 0 };
                    z(R, ne);
                  });
              else
                k.each(function(E) {
                  E.props = d;
                  let R;
                  if (u.nodeAutoGrowToLabelSize) {
                    let ne, Se;
                    ne = pe(this).select("foreignObject").select("div").node(), Se = ne.getBoundingClientRect(), R = Se;
                  } else
                    R = { width: 0, height: 0 };
                  z(E, R);
                });
          } else
            Sn(
              "Invalid reflexiveEdgeStart Value",
              "Use RIGHT, BOTTOMRIGHT, BOTTOM, BOTTOMLEFT, LEFT, TOPLEFT, TOP, TOPRIGHT or MOVABLE."
            );
          Xn(M, Object.keys(d));
        }
        re();
      } else
        Sn(
          "Invalid NodeProps Object",
          `For circular nodes: {shape: NodeShape, radius: number}
For rectangular nodes: {shape: 'rect', width: number, height: number, cornerRadius: number, reflexiveEdgeStart: SideType | 'MOVABLE'}`
        );
    }
    function ve(d, _) {
      if (_ !== void 0) {
        const [m, M] = _t(_);
        for (const E of m)
          k.filter((R) => R.id === E).each((R) => {
            R.deletable = d;
          });
        for (const E of M)
          p.filter((R) => R.id === E).each((R) => {
            R.deletable = d;
          });
      } else
        k.each((m) => {
          m.deletable = d;
        }), p.each((m) => {
          m.deletable = d;
        });
    }
    function be(d, _) {
      if (_ !== void 0) {
        const [m, M] = _t(_);
        for (const E of m)
          k.filter((R) => R.id === E).each((R) => {
            R.labelEditable = d;
          });
        for (const E of M)
          p.filter((R) => R.id === E).each((R) => {
            R.labelEditable = d;
          });
      } else
        k.each((m) => {
          m.labelEditable = d;
        }), p.each((m) => {
          m.labelEditable = d;
        });
    }
    function ke(d, _, m) {
      if (m !== void 0) {
        const [M] = _t(m);
        for (const E of M)
          k.filter((R) => R.id === E).each((R) => {
            R.allowIncomingLinks = d, R.allowOutgoingLinks = _;
          });
      } else
        k.each((M) => {
          M.allowIncomingLinks = d, M.allowOutgoingLinks = _;
        });
    }
    function Te(d, _) {
      if (_ !== void 0) {
        const [m] = _t(_);
        for (const M of m)
          k.filter((E) => E.id === M).each((E) => {
            $r(E, d);
          });
      } else
        k.each((m) => {
          $r(m, d);
        });
    }
    function Le(d, _) {
      const m = [
        "fixedPosition",
        "deletable",
        "labelEditable",
        "allowIncomingLinks",
        "allowOutgoingLinks"
      ], M = ["deletable", "labelEditable"];
      if (_ !== void 0) {
        const [E, R] = _t(_), ne = E.length === 0;
        for (const Se of E)
          k.filter((ge) => ge.id === Se).each(function(ge) {
            ge.deletable = d.deletable ?? ge.deletable, ge.labelEditable = d.labelEditable ?? ge.labelEditable, "fixedPosition" in d && $r(ge, d.fixedPosition), "allowIncomingLinks" in d && (ge.allowIncomingLinks = d.allowIncomingLinks ?? ge.allowIncomingLinks), "allowOutgoingLinks" in d && (ge.allowOutgoingLinks = d.allowOutgoingLinks ?? ge.allowOutgoingLinks);
          });
        for (const Se of R)
          p.selectAll(".graph-controller__link").filter((ge) => ge.id === Se).each(function(ge) {
            ge.deletable = d.deletable ?? ge.deletable, ge.labelEditable = d.labelEditable ?? ge.labelEditable;
          });
        Xn(
          ne ? M : m,
          Object.keys(d)
        );
      } else
        k.each(function(E) {
          E.deletable = d.deletable ?? E.deletable, E.labelEditable = d.labelEditable ?? E.labelEditable, "fixedPosition" in d && $r(E, d.fixedPosition), "allowIncomingLinks" in d && (E.allowIncomingLinks = d.allowIncomingLinks ?? E.allowIncomingLinks), "allowOutgoingLinks" in d && (E.allowOutgoingLinks = d.allowOutgoingLinks ?? E.allowOutgoingLinks);
        }), p.selectAll(".graph-controller__link").each(function(E) {
          E.deletable = d.deletable ?? E.deletable, E.labelEditable = d.labelEditable ?? E.labelEditable;
        }), Xn(m, Object.keys(d));
      re();
    }
    function De(d) {
      u.nodePhysicsEnabled = d, su(f, d, h, g);
    }
    function rt(d) {
      u.fixedLinkDistanceEnabled = d, ou(f, a.value, u, d);
    }
    function Wt(d) {
      u.showLinkLabels = d;
    }
    function v(d) {
      u.showNodeLabels = d;
    }
    function S(d) {
      u.zoomEnabled = d, Sr();
    }
    function L(d) {
      u.allowNodeCreationViaGUI = d;
    }
    function F(d) {
      u.nodeAutoGrowToLabelSize = d, d || (he.disconnect(), k.each(function(_) {
        z(_, { width: 0, height: 0 });
      })), re();
    }
    function I(d) {
      u.nodeGroupsFn = d;
    }
    function A() {
      h = n.value.node().clientWidth, g = n.value.node().clientHeight, y = F0(
        (d) => j(d, u.zoomEnabled),
        u.zoomEnabled
      ), b = W0(
        n.value,
        y,
        (d) => u.allowNodeCreationViaGUI ? du(d) : null,
        (d) => u.allowNodeCreationViaGUI ? Ys(d) : null,
        (d) => {
          u.allowNodeCreationViaGUI && Z(
            He.USER_ACTION,
            { ...u.nodeProps },
            pt(d, b.node())[0],
            pt(d, b.node())[1]
          );
        }
      ), Z0(b, r.value, u, a.value.getNonDefaultLinkColors()), P = em(r.value, b), p = X0(b), k = Y0(b), f = gm(a.value, u, h, g, () => se()), x = U0(f, h, g, u, a.value), he = q(), re();
    }
    function q() {
      return new ResizeObserver((d) => {
        let _ = !1;
        for (let m of d) {
          const M = m;
          if (M) {
            const E = {
              width: M.borderBoxSize[0].inlineSize,
              height: M.borderBoxSize[0].blockSize
            }, ne = pe(M.target).datum();
            _ = z(ne, E);
          }
        }
        _ && re();
      });
    }
    function H() {
      n.value.node().querySelectorAll(
        ".graph-controller__node-label, .graph-controller__node-label-placeholder"
      ).forEach((_) => he.observe(_));
    }
    function z(d, _) {
      let m = !1;
      const M = { ...d.renderedSize }, E = _.width > _.height ? _.width / 2 : _.height / 2, R = _.width, ne = _.height;
      return d.renderedSize = { width: R, height: ne, radius: E }, JSON.stringify(M) !== JSON.stringify(d.renderedSize) && (m = !0, q0(d, M, n.value)), m;
    }
    function j(d, _ = !0) {
      _ && (G = d.transform.x, W = d.transform.y, Q = d.transform.k, b.attr("transform", `translate(${G},${W})scale(${Q})`));
    }
    function te(d, _, m, M, E = u.linkGUIEditability.deletable, R = u.linkGUIEditability.labelEditable) {
      let ne = a.value.createLink(
        d.id,
        _.id,
        m,
        M,
        E,
        R
      );
      ne !== void 0 && D0(ne, n.value), re();
    }
    function U(d, _, m, M, E, R, ne = u.nodeGUIEditability.fixedPosition, Se = u.nodeGUIEditability.deletable, ge = u.nodeGUIEditability.labelEditable, jn = u.nodeGUIEditability.allowIncomingLinks, Ri = u.nodeGUIEditability.allowOutgoingLinks) {
      return Z(
        He.PROGRAMMATIC_ACTION,
        d,
        _,
        m,
        M,
        E,
        R,
        ne,
        Se,
        ge,
        jn,
        Ri
      );
    }
    function Z(d, _, m, M, E, R, ne, Se = u.nodeGUIEditability.fixedPosition, ge = u.nodeGUIEditability.deletable, jn = u.nodeGUIEditability.labelEditable, Ri = u.nodeGUIEditability.allowIncomingLinks, Cu = u.nodeGUIEditability.allowOutgoingLinks) {
      let lo = a.value.createNode(
        _,
        m ?? h / 2,
        M ?? g / 2,
        E,
        R,
        ne,
        Se,
        ge,
        jn,
        Ri,
        Cu
      );
      return j0(lo, n.value, d), Kr(f, a.value), c.value = !0, re(), lo.id;
    }
    function se() {
      k.attr("transform", (d) => `translate(${d.x},${d.y})`), p.selectAll(".graph-controller__link, .graph-controller__link-click-box").attr("d", (d) => (de(d), Km(d, h, g, u))), Fn();
    }
    function de(d) {
      let _ = d.pathType;
      d.pathType = Xm(d.source, d.target, a.value), _ !== d.pathType && re();
    }
    function _e() {
      const d = w, _ = pe(
        n.value.node().querySelector(`#${r.value + "-node-" + d.id}`)
      ).classed("on-deletion");
      if (d !== void 0 && !_) {
        const m = C;
        m !== void 0 ? P.attr("d", () => d.id === m.id ? cu(d, [h / 2, g / 2], u) : a.value.hasBidirectionalConnection(d, m) ? ir(d, m, u) : ys(d, m, u)) : B !== void 0 && P.attr(
          "d",
          ir(d, { x: B[0], y: B[1] }, u)
        );
      }
    }
    function re(d = 0.5) {
      var _;
      p = p.data(a.value.links, (m) => m.id).join((m) => {
        const M = m.append("g").classed("graph-controller__link-container", !0);
        return M.append("path").classed("graph-controller__link", !0).style("stroke", (E) => E.color ? E.color : "").attr("id", (E) => r.value + "-link-" + E.id), M.append("path").classed("graph-controller__link-click-box", !0).on("dblclick", (E) => {
          ot(E);
        }).on("pointerout", (E) => pu(E)).on("pointerdown", (E, R) => {
          V0(R, E.button, n.value), mu(E, R);
        }).on("pointerup", (E, R) => {
          gu(E, R);
        }), M.append("text").attr("class", (E) => {
          var R;
          return `graph-controller__${(R = E.pathType) == null ? void 0 : R.toLowerCase()}-path-text`;
        }).append("textPath").attr(
          "class",
          (E) => E.label ? "graph-controller__link-label" : "graph-controller__link-label-placeholder"
        ).attr("href", (E) => `#${r.value + "-link-" + E.id}`).text((E) => E.label ? E.label : "add label").on("click", (E, R) => {
          to(E, R);
        }).on("dblclick", (E) => {
          ot(E);
        }), M.append("foreignObject").classed("graph-controller__link-label-mathjax-container", !0).attr("xmlns", "http://www.w3.org/2000/svg").attr("width", 1).attr("height", 1).html(
          (E) => `<div class='${E.label ? "graph-controller__link-label" : "graph-controller__link-label-placeholder"}'>
                        </div>`
        ).on("click", (E, R) => {
          to(E, R);
        }).on("dblclick", (E) => {
          ot(E);
        }), M;
      }), p.selectChild(".graph-controller__link").attr("marker-start", function(m) {
        var M;
        if ((M = m.pathType) != null && M.includes("REVERSE")) {
          let E = `url(#${r.value}-link-arrow-reverse`;
          return m.color && (E += "-" + mr(m.color)), E += ")", E;
        } else
          return null;
      }).attr("marker-end", function(m) {
        var M;
        if ((M = m.pathType) != null && M.includes("REVERSE"))
          return null;
        {
          let E = `url(#${r.value}-link-arrow`;
          return m.color && (E += "-" + mr(m.color)), E += ")", E;
        }
      }).style("display", "none").each(function() {
        this.getBBox();
      }).style("display", null), p.selectChild("text").attr("class", (m) => {
        var M;
        return `graph-controller__${(M = m.pathType) == null ? void 0 : M.toLowerCase()}-path-text`;
      }).attr("dy", (m) => {
        var M;
        return m.pathType === at.REFLEXIVE ? 15 : m.pathType == at.LINEREVERSE ? -10 : (M = m.pathType) != null && M.includes("REVERSE") ? 20 : -10;
      }).selectChild("textPath").attr(
        "class",
        (m) => m.label ? "graph-controller__link-label" : "graph-controller__link-label-placeholder"
      ).classed("hidden", (m) => !u.showLinkLabels || !m.label && !m.labelEditable).classed("not-editable", (m) => !m.labelEditable).attr("startOffset", (m) => {
        var M;
        return (M = m.pathType) != null && M.includes("REVERSE") ? "46%" : "50%";
      }).text((m) => m.label ? m.label : "add label"), k = k.data(a.value.nodes, (m) => m.id).join(
        (m) => {
          const M = m.append("g").classed("graph-controller__node-container", !0).call(x).on("dblclick", (E) => {
            ot(E);
          }).on("pointerenter", (E, R) => Zs(R)).on("pointerout", (E, R) => eo(R)).on("pointerdown", (E, R) => {
            G0(R, E.button, n.value), l = { x: E.x, y: E.y }, Ge(E, R);
          }).on("pointerup", (E, R) => {
            Ys(E, R);
          });
          return it(M);
        },
        (m) => (m.each(function(M) {
          const E = pe(this), R = E.selectChild(".graph-controller__node").node();
          $e(M, R) ? (Fe(R, E), Kr(f, a.value)) : ht(E);
        }), m)
      ), k.selectChild("foreignObject").selectChild("div").attr(
        "class",
        (m) => m.label ? "graph-controller__node-label" : "graph-controller__node-label-placeholder"
      ).classed("controls-node-size", u.nodeAutoGrowToLabelSize).classed("hidden", (m) => !u.showNodeLabels || !m.label && !m.labelEditable).classed("not-editable", (m) => !m.labelEditable).text((m) => m.label ? m.label : "add label"), (_ = window.MathJax) != null && _.version && window.MathJax.typesetPromise().then(() => {
        rn();
      }), u.nodeAutoGrowToLabelSize && H(), f.nodes(a.value.nodes), f.alpha(d).restart();
    }
    function $e(d, _) {
      return d.props.shape === J.CIRCLE && _.tagName !== "circle" || d.props.shape === J.RECTANGLE && _.tagName !== "rect";
    }
    function Fe(d, _) {
      u.nodeAutoGrowToLabelSize && he.unobserve(
        _.select(
          ".graph-controller__node-label, .graph-controller__node-label-placeholder"
        ).node()
      ), d.remove(), _.selectChild(".graph-controller__node-label-container").remove(), it(_);
    }
    function it(d) {
      d.filter((m) => m.props.shape === J.CIRCLE).append(J.CIRCLE).classed("graph-controller__node", !0).attr("id", (m) => `${r.value + "-node-" + m.id}`).attr("r", (m) => m.renderedSize.radius).style("fill", (m) => m.color ? m.color : ""), d.filter((m) => m.props.shape === J.RECTANGLE).append(J.RECTANGLE).classed("graph-controller__node", !0).attr("id", (m) => `${r.value + "-node-" + m.id}`).attr("width", (m) => m.renderedSize.width).attr("height", (m) => m.renderedSize.height).attr("x", (m) => -0.5 * m.renderedSize.width).attr("y", (m) => -0.5 * m.renderedSize.height).attr("rx", (m) => m.props.cornerRadius).attr("ry", (m) => m.props.cornerRadius).style("fill", (m) => m.color ? m.color : "");
      const _ = d.append("foreignObject").classed("graph-controller__node-label-container", !0).attr("xmlns", "http://www.w3.org/2000/svg");
      return _.filter((m) => m.props.shape === J.CIRCLE).attr("width", (m) => 2 * m.renderedSize.radius).attr("height", (m) => 2 * m.renderedSize.radius).attr("x", (m) => -m.renderedSize.radius).attr("y", (m) => -m.renderedSize.radius), _.filter((m) => m.props.shape === J.RECTANGLE).attr("width", (m) => m.renderedSize.width).attr("height", (m) => m.renderedSize.height).attr("x", (m) => -0.5 * m.renderedSize.width).attr("y", (m) => -0.5 * m.renderedSize.height), _.append("xhtml:div").on("click", (m, M) => {
        vu(m, M);
      }).on("dblclick", (m) => {
        ot(m);
      }).on("pointerenter", (m, M) => Zs(M)).on("pointerout", (m, M) => eo(M)), d;
    }
    function ht(d) {
      d.selectChild(".graph-controller__node").filter((_) => _.props.shape === J.CIRCLE).attr("r", (_) => _.renderedSize.radius), d.filter((_) => _.props.shape === J.CIRCLE).selectChild(".graph-controller__node-label-container").attr("width", (_) => 2 * _.renderedSize.radius).attr("height", (_) => 2 * _.renderedSize.radius).attr("x", (_) => -_.renderedSize.radius).attr("y", (_) => -_.renderedSize.radius), d.selectChild(".graph-controller__node").filter((_) => _.props.shape === J.RECTANGLE).attr("width", (_) => _.renderedSize.width).attr("height", (_) => _.renderedSize.height).attr("x", (_) => -0.5 * _.renderedSize.width).attr("y", (_) => -0.5 * _.renderedSize.height).attr("rx", (_) => {
        var m;
        return (m = _.props) == null ? void 0 : m.cornerRadius;
      }).attr("ry", (_) => {
        var m;
        return (m = _.props) == null ? void 0 : m.cornerRadius;
      }), d.filter((_) => _.props.shape === J.RECTANGLE).selectChild(".graph-controller__node-label-container").attr("width", (_) => _.renderedSize.width).attr("height", (_) => _.renderedSize.height).attr("x", (_) => -0.5 * _.renderedSize.width).attr("y", (_) => -0.5 * _.renderedSize.height);
    }
    function rn() {
      p.selectChild("text").selectChild("textPath").selectChild("mjx-container").each(function(d) {
        const _ = this, m = d, M = pe(_.parentNode.parentNode.parentNode).selectChild("foreignObject").selectChild("div").attr("class", "graph-controller__link-label").classed(
          "hidden",
          !u.showLinkLabels || !m.label && !m.labelEditable
        ).node();
        M.replaceChild(_, M.childNodes[0]);
      }), p.selectChild("text").selectChild("textPath").each(function() {
        const d = this;
        let _ = !1;
        d.childNodes.forEach((M) => {
          var E;
          (M == null ? void 0 : M.nodeType) === Node.TEXT_NODE && ((E = M == null ? void 0 : M.textContent) == null ? void 0 : E.trim()) !== "" && (_ = !0);
        }), _ || pe(d).text("I").attr("class", "graph-controller__link-label-placeholder mjx-hidden");
      }), Fn();
    }
    function Fn() {
      p.selectChild("text").selectChild("textPath").each(function() {
        const d = this, [_, m] = ro(d);
        pe(d.parentNode.parentNode).select("foreignObject").attr("x", _).attr("y", m);
      });
    }
    function Ge(d, _) {
      (d.button === 2 || d.pointerType === "touch") && (cl(d), _.allowOutgoingLinks && xr(_), _.deletable && (ee = setTimeout(() => {
        C = void 0, dt(_);
      }, 250)));
    }
    function dt(d) {
      let _ = n.value.node().querySelector(`#${r.value + "-node-" + d.id}`);
      pe(_).classed("on-deletion", !0);
      let m = pe(_.parentElement);
      if (d.props.shape === J.CIRCLE) {
        let M = S0().outerRadius(d.props.radius + 4).innerRadius(d.props.radius), E = [{ startAngle: 0, endAngle: 0 }];
        m.append("g").attr("class", "arc").selectAll("path.arc").data(E).enter().append("path").attr("class", "arc").style("fill", "black").style("opacity", 0.7).transition().duration(750).ease(rl).attrTween("d", function(ne) {
          let Se = { startAngle: 0, endAngle: 2 * Math.PI }, ge = Hs(ne, Se);
          return function(jn) {
            return M(ge(jn));
          };
        }).on("end", () => zn(d));
      } else if (d.props.shape === J.RECTANGLE) {
        const M = J0(
          d.renderedSize.width,
          d.renderedSize.height,
          d.props.cornerRadius
        );
        let E = m.append("path").attr("fill", "none").attr("stroke", "black").attr("stroke-width", 4).attr("opacity", "0.7").attr("d", M), R = 2 * d.renderedSize.width + 2 * d.renderedSize.height;
        E.attr("stroke-dasharray", R).attr("stroke-dashoffset", R).transition().duration(750).ease(rl).attr("stroke-dashoffset", 0).on("end", () => zn(d));
      }
    }
    function zn(d) {
      let _ = a.value.removeNode(d);
      if (_ !== void 0) {
        let [m, M] = _;
        Ar(m, n.value, He.USER_ACTION), M.forEach((E) => {
          an(E, n.value, He.USER_ACTION);
        }), Kr(f, a.value);
      }
      c.value = a.value.nodes.length > 0, Er(), re();
    }
    function xr(d) {
      B = [d.x, d.y], w = d, P.classed("hidden", !1).attr("d", ir(d, { x: B[0], y: B[1] }, u));
    }
    function Ys(d, _ = void 0) {
      ot(d), clearTimeout(ee), _ && Js(_), d.pointerType === "mouse" || (d.pointerType === "touch" || d.pointerType === "pen") && !Q0(
        { x: l.x, y: l.y },
        { x: d.x, y: d.y }
      ) ? Qs() : Er();
    }
    function Js(d) {
      let _ = n.value.node().querySelector(`#${r.value + "-node-" + d.id}`), m = pe(_), M = pe(_.parentElement);
      d.props.shape === J.CIRCLE ? (m.classed("on-deletion", !1), M.select("g.arc").select("path.arc").interrupt().remove(), M.select("g.arc").remove()) : d.props.shape === J.RECTANGLE && (m.classed("on-deletion") && M.select("path").attr("stroke-dasharray", 2 * d.props.width + 2 * d.props.height).attr("stroke-dashoffset", 0).transition().attr("stroke-dashoffset", 2 * d.props.width + 2 * d.props.height).on("end", () => {
        M.select("path").remove();
      }), m.classed("on-deletion", !1));
    }
    function Qs() {
      const d = w, _ = C;
      Er(), !(d === void 0 || _ === void 0) && te(d, _);
    }
    function du(d) {
      if (ot(d), w !== void 0) {
        const _ = Vd(d, n.value.node())[0];
        B = [(_[0] - G) / Q, (_[1] - W) / Q], _e();
      }
    }
    function Zs(d) {
      d.allowIncomingLinks && (C = d);
    }
    function eo(d) {
      d && Js(d), C = void 0, clearTimeout(ee);
    }
    function pu(d) {
      ot(d), clearTimeout(oe);
    }
    function gu(d, _) {
      ot(d), clearTimeout(oe), (d.button === 2 || d.pointerType === "touch") && _.deletable && _u(_);
    }
    function mu(d, _) {
      (d.button === 2 || d.pointerType === "touch") && (cl(d), _.deletable && (oe = setTimeout(() => {
        wu(_);
      }, 250)));
    }
    function wu(d) {
      let _ = n.value.node().querySelector(`#${r.value + "-link-" + d.id}`);
      if (pe(_).classed("on-deletion", !0), _ instanceof SVGPathElement) {
        let m = pe(_), M = _.getTotalLength(), E = _.parentElement.querySelector("text"), R = Array.from(E.classList).some(
          (ge) => ge.includes("reverse")
        ), ne = 0, Se = R ? M : -M;
        m.attr("stroke-dasharray", M).attr("stroke-dashoffset", ne).transition().duration(750).attr("stroke-dashoffset", Se).on("end", () => yu(d));
      }
    }
    function yu(d) {
      let _ = d.color, m = a.value.removeLink(d);
      m !== void 0 && an(m, n.value, He.USER_ACTION), _ && (a.value.hasNonDefaultLinkColor(_) || Xi(b, r.value, _)), re();
    }
    function _u(d) {
      let _ = n.value.node().querySelector(`#${r.value + "-link-" + d.id}`);
      if (pe(_).classed("on-deletion") && _ instanceof SVGPathElement) {
        let m = pe(_), M = _.getTotalLength();
        m.attr("stroke-dasharray", M).attr("stroke-dashoffset", M).transition().attr("stroke-dashoffset", 0).on("end", () => {
          m.attr("stroke-dasharray", null).attr("stroke-dashoffset", null);
        });
      }
      pe(_).classed("on-deletion", !1);
    }
    function vu(d, _) {
      ot(d), _.labelEditable && no(_, [_.x, _.y]);
    }
    function to(d, _) {
      if (_.labelEditable) {
        let m = d.target, M;
        m.nodeName === "textPath" ? M = m : M = m.closest(".graph-controller__link-container").querySelector("textPath");
        let E = ro(M);
        no(_, E);
      }
    }
    function no(d, _) {
      let m = d instanceof fi ? "node" : "link";
      const M = document.createElement("input");
      M.setAttribute("class", "graph-controller__label-input"), M.setAttribute("id", `${m}-label-input-field`), d.label == null ? M.value = "" : M.value = d.label, M.placeholder = `Enter ${m} label`;
      const E = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
      E.setAttribute("width", "100%"), E.setAttribute("height", "100%"), E.setAttribute("x", `${_[0] - 90}`), E.setAttribute("y", `${_[1] - 12}`), E.append(M), n.value.select("svg").select("g").node().append(E), M.focus(), s !== "desktop" && (o = !0), M.ondblclick = function(ne) {
        ot(ne);
      };
      let R = !1;
      M.onkeyup = function(ne) {
        ne.key === "Enter" ? (R = !0, M.blur()) : ne.key === "Escape" && (M.value = "", M.blur());
      }, M.onblur = function() {
        R && Bn(d, M.value.trim()), E.remove(), s !== "desktop" && (o = !1);
      };
    }
    function Bn(d, _) {
      H0(d, _, n.value), d.label = _, re();
      let m = d instanceof fi ? "node" : "link";
      m === "link" ? bu(d) : m === "node" && _ !== "" && xu(d);
    }
    function bu(d) {
      var m;
      const _ = n.value.node().querySelector(
        `#${r.value + "-link-" + d.id}`
      ).parentElement;
      (m = _.querySelector("mjx-container")) == null || m.remove(), _.querySelector("div").setAttribute("class", "graph-controller__link-label-placeholder"), re();
    }
    function xu(d) {
      const _ = n.value.node().querySelector(`#${r.value + "-node-" + d.id}`).parentElement;
      if (_) {
        const m = _.parentElement, M = _.nextSibling;
        _.remove(), m.insertBefore(_, M);
      }
    }
    function ro(d) {
      let _ = n.value.select("svg").node().getBoundingClientRect(), m = d.getBoundingClientRect(), M = (m.x - _.x - G) / Q, E = (m.y - _.y - W) / Q;
      return [M, E];
    }
    function Er() {
      P == null || P.classed("hidden", !0), w = void 0, C = void 0, B = void 0;
    }
    function Eu(d) {
      let _, m;
      try {
        if (typeof d == "string")
          [_, m] = nw(d);
        else if (typeof d == "object")
          [_, m] = rw(d);
        else {
          Sn("Invalid graph import type:", "Must either be TGF or JSON.");
          return;
        }
      } catch (M) {
        Sn("Error during parsing:", `Invalid data format:
` + M);
        return;
      }
      oo(), Su(_, m);
    }
    function Su(d, _) {
      for (let M of d)
        Z(
          He.PROGRAMMATIC_ACTION,
          M.props ?? u.nodeProps,
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
      const m = (M) => a.value.nodes.find((E) => E.idImported === M);
      for (let M of _) {
        let E = m(M.sourceIdImported), R = m(M.targetIdImported);
        E && R && (te(
          E,
          R,
          M.label,
          M.color,
          M.deletable,
          M.labelEditable
        ), M.color && ws(b, r.value, u, M.color));
      }
    }
    function io(d) {
      for (let _ of d) {
        const m = a.value.links.filter((M) => M.id === _).map((M) => M.color).shift();
        m && (a.value.hasNonDefaultLinkColor(m, _) ? a.value.getLinkIdsWithNonDefaultLinkColors(
          m,
          _
        ).every(
          (R) => d.includes(R)
        ) && Xi(b, r.value, m) : Xi(b, r.value, m));
      }
    }
    function Sr() {
      f.stop(), n.value.selectChildren().remove(), y = void 0, G = 0, W = 0, Q = 1, b = void 0, P = void 0, p = void 0, k = void 0, f = void 0, Er(), A();
    }
    function so() {
      u.isCanvasBoundToView && (o || Sr());
    }
    function oo() {
      a.value.links.forEach((d) => an(d, n.value, He.PROGRAMMATIC_ACTION)), a.value.nodes.forEach((d) => Ar(d, n.value, He.PROGRAMMATIC_ACTION)), a.value = new fl(), c.value = !1, Sr();
    }
    function Mr(d) {
      const _ = a.value.nodes.find((m) => m.id === d);
      if (_ === void 0)
        throw new Error(`Node with id ${d} not found`);
      return _;
    }
    function Mu(d) {
      const _ = Mr(d), m = _.x;
      if (m === void 0)
        throw new Error(`Node with id ${d} has no x position`);
      const M = _.y;
      if (M === void 0)
        throw new Error(`Node with id ${d} has no y position`);
      return { x: m, y: M };
    }
    function Tu(d, _) {
      const m = Mr(_);
      m.fx = d.x, m.fy = d.y, re();
    }
    function ku(d, _) {
      const m = Mr(_);
      m.x = d.x, m.y = d.y, re();
    }
    return (d, _) => (Kt(), Xt(gt, null, [
      _[0] || (_[0] = lt("div", { class: "graph-controller__graph-host uninitialised" }, null, -1)),
      Br(lt("div", null, [
        Gt(lh, {
          class: "graph-controller__info-text-background",
          "show-controls-graph": "",
          "show-latex-info": !0,
          "show-controls-environment": !1,
          "show-header": !0,
          "platform-type": lr(s)
        }, null, 8, ["platform-type"])
      ], 512), [
        [Gr, !c.value]
      ])
    ], 64));
  }
});
customElements.define(
  "graph-component",
  // With LaTeX without ShadowRoot for MathJax to work
  /* @__PURE__ */ Kf(cw, { shadowRoot: !1 })
  // With ShadowRoot without LaTeX
  // defineCustomElement(GraphEditor)
  /* for switching off the LaTeX control info background, in the graph editor template
  in the graph controls tag you can use :show-latex-info="true" */
);
