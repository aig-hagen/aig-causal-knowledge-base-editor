var xo = Object.defineProperty;
var Eo = (t, e, n) => e in t ? xo(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var re = (t, e, n) => Eo(t, typeof e != "symbol" ? e + "" : e, n);
import { defineComponent as ni, createElementBlock as De, openBlock as qe, withDirectives as Jt, createElementVNode as Le, toDisplayString as Ve, vShow as Kt, Fragment as In, renderList as _r, unref as Pn, computed as xr, onMounted as So, onUnmounted as ko, ref as Er, reactive as Mo, createVNode as No, defineCustomElement as To } from "vue";
const Lo = { class: "graph-controller__controls-overview" }, Ro = { key: 0 }, Co = { key: 1 }, Io = { key: 0 }, Po = { key: 1 }, Oo = /* @__PURE__ */ ni({
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
    let o = e.platformType === "mobile" || e.platformType === "tablet";
    return (s, l) => (qe(), De("table", Lo, [
      Jt(Le("thead", null, [
        Le("tr", null, [
          Le("th", null, Ve(i[0]), 1),
          Le("th", null, Ve(i[1]), 1)
        ])
      ], 512), [
        [Kt, e.showHeader]
      ]),
      Le("tbody", null, [
        (qe(), De(In, null, _r(n, (a) => Jt(Le("tr", {
          key: a.action
        }, [
          Le("td", null, Ve(a.action), 1),
          Pn(o) ? (qe(), De("td", Ro, Ve(a.touch), 1)) : (qe(), De("td", Co, Ve(a.desktop), 1))
        ]), [
          [Kt, e.showControlsGraph]
        ])), 64)),
        (qe(), De(In, null, _r(r, (a) => Jt(Le("tr", {
          key: a.action
        }, [
          Le("td", null, Ve(a.action), 1),
          Pn(o) ? (qe(), De("td", Io, Ve(a.touch), 1)) : (qe(), De("td", Po, Ve(a.desktop), 1))
        ]), [
          [Kt, e.showControlsEnvironment]
        ])), 64))
      ])
    ]));
  }
}), $o = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [r, i] of e)
    n[r] = i;
  return n;
}, zo = /* @__PURE__ */ $o(Oo, [["__scopeId", "data-v-8c3d818f"]]);
var Ao = { value: () => {
} };
function Ct() {
  for (var t = 0, e = arguments.length, n = {}, r; t < e; ++t) {
    if (!(r = arguments[t] + "") || r in n || /[\s.]/.test(r)) throw new Error("illegal type: " + r);
    n[r] = [];
  }
  return new en(n);
}
function en(t) {
  this._ = t;
}
function Bo(t, e) {
  return t.trim().split(/^|\s+/).map(function(n) {
    var r = "", i = n.indexOf(".");
    if (i >= 0 && (r = n.slice(i + 1), n = n.slice(0, i)), n && !e.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: r };
  });
}
en.prototype = Ct.prototype = {
  constructor: en,
  on: function(t, e) {
    var n = this._, r = Bo(t + "", n), i, o = -1, s = r.length;
    if (arguments.length < 2) {
      for (; ++o < s; ) if ((i = (t = r[o]).type) && (i = Fo(n[i], t.name))) return i;
      return;
    }
    if (e != null && typeof e != "function") throw new Error("invalid callback: " + e);
    for (; ++o < s; )
      if (i = (t = r[o]).type) n[i] = Sr(n[i], t.name, e);
      else if (e == null) for (i in n) n[i] = Sr(n[i], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, e = this._;
    for (var n in e) t[n] = e[n].slice();
    return new en(t);
  },
  call: function(t, e) {
    if ((i = arguments.length - 2) > 0) for (var n = new Array(i), r = 0, i, o; r < i; ++r) n[r] = arguments[r + 2];
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (o = this._[t], r = 0, i = o.length; r < i; ++r) o[r].value.apply(e, n);
  },
  apply: function(t, e, n) {
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (var r = this._[t], i = 0, o = r.length; i < o; ++i) r[i].value.apply(e, n);
  }
};
function Fo(t, e) {
  for (var n = 0, r = t.length, i; n < r; ++n)
    if ((i = t[n]).name === e)
      return i.value;
}
function Sr(t, e, n) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === e) {
      t[r] = Ao, t = t.slice(0, r).concat(t.slice(r + 1));
      break;
    }
  return n != null && t.push({ name: e, value: n }), t;
}
var On = "http://www.w3.org/1999/xhtml";
const kr = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: On,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function wn(t) {
  var e = t += "", n = e.indexOf(":");
  return n >= 0 && (e = t.slice(0, n)) !== "xmlns" && (t = t.slice(n + 1)), kr.hasOwnProperty(e) ? { space: kr[e], local: t } : t;
}
function Go(t) {
  return function() {
    var e = this.ownerDocument, n = this.namespaceURI;
    return n === On && e.documentElement.namespaceURI === On ? e.createElement(t) : e.createElementNS(n, t);
  };
}
function jo(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function ri(t) {
  var e = wn(t);
  return (e.local ? jo : Go)(e);
}
function Vo() {
}
function Un(t) {
  return t == null ? Vo : function() {
    return this.querySelector(t);
  };
}
function Do(t) {
  typeof t != "function" && (t = Un(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = e[i], s = o.length, l = r[i] = new Array(s), a, h, u = 0; u < s; ++u)
      (a = o[u]) && (h = t.call(a, a.__data__, u, o)) && ("__data__" in a && (h.__data__ = a.__data__), l[u] = h);
  return new ke(r, this._parents);
}
function qo(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function Ho() {
  return [];
}
function ii(t) {
  return t == null ? Ho : function() {
    return this.querySelectorAll(t);
  };
}
function Uo(t) {
  return function() {
    return qo(t.apply(this, arguments));
  };
}
function Wo(t) {
  typeof t == "function" ? t = Uo(t) : t = ii(t);
  for (var e = this._groups, n = e.length, r = [], i = [], o = 0; o < n; ++o)
    for (var s = e[o], l = s.length, a, h = 0; h < l; ++h)
      (a = s[h]) && (r.push(t.call(a, a.__data__, h, s)), i.push(a));
  return new ke(r, i);
}
function oi(t) {
  return function() {
    return this.matches(t);
  };
}
function si(t) {
  return function(e) {
    return e.matches(t);
  };
}
var Xo = Array.prototype.find;
function Yo(t) {
  return function() {
    return Xo.call(this.children, t);
  };
}
function Qo() {
  return this.firstElementChild;
}
function Zo(t) {
  return this.select(t == null ? Qo : Yo(typeof t == "function" ? t : si(t)));
}
var Jo = Array.prototype.filter;
function Ko() {
  return Array.from(this.children);
}
function es(t) {
  return function() {
    return Jo.call(this.children, t);
  };
}
function ts(t) {
  return this.selectAll(t == null ? Ko : es(typeof t == "function" ? t : si(t)));
}
function ns(t) {
  typeof t != "function" && (t = oi(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = e[i], s = o.length, l = r[i] = [], a, h = 0; h < s; ++h)
      (a = o[h]) && t.call(a, a.__data__, h, o) && l.push(a);
  return new ke(r, this._parents);
}
function li(t) {
  return new Array(t.length);
}
function rs() {
  return new ke(this._enter || this._groups.map(li), this._parents);
}
function sn(t, e) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = e;
}
sn.prototype = {
  constructor: sn,
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
function is(t) {
  return function() {
    return t;
  };
}
function os(t, e, n, r, i, o) {
  for (var s = 0, l, a = e.length, h = o.length; s < h; ++s)
    (l = e[s]) ? (l.__data__ = o[s], r[s] = l) : n[s] = new sn(t, o[s]);
  for (; s < a; ++s)
    (l = e[s]) && (i[s] = l);
}
function ss(t, e, n, r, i, o, s) {
  var l, a, h = /* @__PURE__ */ new Map(), u = e.length, p = o.length, f = new Array(u), m;
  for (l = 0; l < u; ++l)
    (a = e[l]) && (f[l] = m = s.call(a, a.__data__, l, e) + "", h.has(m) ? i[l] = a : h.set(m, a));
  for (l = 0; l < p; ++l)
    m = s.call(t, o[l], l, o) + "", (a = h.get(m)) ? (r[l] = a, a.__data__ = o[l], h.delete(m)) : n[l] = new sn(t, o[l]);
  for (l = 0; l < u; ++l)
    (a = e[l]) && h.get(f[l]) === a && (i[l] = a);
}
function ls(t) {
  return t.__data__;
}
function as(t, e) {
  if (!arguments.length) return Array.from(this, ls);
  var n = e ? ss : os, r = this._parents, i = this._groups;
  typeof t != "function" && (t = is(t));
  for (var o = i.length, s = new Array(o), l = new Array(o), a = new Array(o), h = 0; h < o; ++h) {
    var u = r[h], p = i[h], f = p.length, m = us(t.call(u, u && u.__data__, h, r)), y = m.length, S = l[h] = new Array(y), b = s[h] = new Array(y), d = a[h] = new Array(f);
    n(u, p, S, b, d, m, e);
    for (var k = 0, R = 0, v, N; k < y; ++k)
      if (v = S[k]) {
        for (k >= R && (R = k + 1); !(N = b[R]) && ++R < y; ) ;
        v._next = N || null;
      }
  }
  return s = new ke(s, r), s._enter = l, s._exit = a, s;
}
function us(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function hs() {
  return new ke(this._exit || this._groups.map(li), this._parents);
}
function cs(t, e, n) {
  var r = this.enter(), i = this, o = this.exit();
  return typeof t == "function" ? (r = t(r), r && (r = r.selection())) : r = r.append(t + ""), e != null && (i = e(i), i && (i = i.selection())), n == null ? o.remove() : n(o), r && i ? r.merge(i).order() : i;
}
function fs(t) {
  for (var e = t.selection ? t.selection() : t, n = this._groups, r = e._groups, i = n.length, o = r.length, s = Math.min(i, o), l = new Array(i), a = 0; a < s; ++a)
    for (var h = n[a], u = r[a], p = h.length, f = l[a] = new Array(p), m, y = 0; y < p; ++y)
      (m = h[y] || u[y]) && (f[y] = m);
  for (; a < i; ++a)
    l[a] = n[a];
  return new ke(l, this._parents);
}
function ds() {
  for (var t = this._groups, e = -1, n = t.length; ++e < n; )
    for (var r = t[e], i = r.length - 1, o = r[i], s; --i >= 0; )
      (s = r[i]) && (o && s.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(s, o), o = s);
  return this;
}
function ps(t) {
  t || (t = gs);
  function e(p, f) {
    return p && f ? t(p.__data__, f.__data__) : !p - !f;
  }
  for (var n = this._groups, r = n.length, i = new Array(r), o = 0; o < r; ++o) {
    for (var s = n[o], l = s.length, a = i[o] = new Array(l), h, u = 0; u < l; ++u)
      (h = s[u]) && (a[u] = h);
    a.sort(e);
  }
  return new ke(i, this._parents).order();
}
function gs(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function ms() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function ws() {
  return Array.from(this);
}
function ys() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, o = r.length; i < o; ++i) {
      var s = r[i];
      if (s) return s;
    }
  return null;
}
function vs() {
  let t = 0;
  for (const e of this) ++t;
  return t;
}
function bs() {
  return !this.node();
}
function _s(t) {
  for (var e = this._groups, n = 0, r = e.length; n < r; ++n)
    for (var i = e[n], o = 0, s = i.length, l; o < s; ++o)
      (l = i[o]) && t.call(l, l.__data__, o, i);
  return this;
}
function xs(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Es(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Ss(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function ks(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function Ms(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttribute(t) : this.setAttribute(t, n);
  };
}
function Ns(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, n);
  };
}
function Ts(t, e) {
  var n = wn(t);
  if (arguments.length < 2) {
    var r = this.node();
    return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n);
  }
  return this.each((e == null ? n.local ? Es : xs : typeof e == "function" ? n.local ? Ns : Ms : n.local ? ks : Ss)(n, e));
}
function ai(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function Ls(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Rs(t, e, n) {
  return function() {
    this.style.setProperty(t, e, n);
  };
}
function Cs(t, e, n) {
  return function() {
    var r = e.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, n);
  };
}
function Is(t, e, n) {
  return arguments.length > 1 ? this.each((e == null ? Ls : typeof e == "function" ? Cs : Rs)(t, e, n ?? "")) : ft(this.node(), t);
}
function ft(t, e) {
  return t.style.getPropertyValue(e) || ai(t).getComputedStyle(t, null).getPropertyValue(e);
}
function Ps(t) {
  return function() {
    delete this[t];
  };
}
function Os(t, e) {
  return function() {
    this[t] = e;
  };
}
function $s(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? delete this[t] : this[t] = n;
  };
}
function zs(t, e) {
  return arguments.length > 1 ? this.each((e == null ? Ps : typeof e == "function" ? $s : Os)(t, e)) : this.node()[t];
}
function ui(t) {
  return t.trim().split(/^|\s+/);
}
function Wn(t) {
  return t.classList || new hi(t);
}
function hi(t) {
  this._node = t, this._names = ui(t.getAttribute("class") || "");
}
hi.prototype = {
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
function ci(t, e) {
  for (var n = Wn(t), r = -1, i = e.length; ++r < i; ) n.add(e[r]);
}
function fi(t, e) {
  for (var n = Wn(t), r = -1, i = e.length; ++r < i; ) n.remove(e[r]);
}
function As(t) {
  return function() {
    ci(this, t);
  };
}
function Bs(t) {
  return function() {
    fi(this, t);
  };
}
function Fs(t, e) {
  return function() {
    (e.apply(this, arguments) ? ci : fi)(this, t);
  };
}
function Gs(t, e) {
  var n = ui(t + "");
  if (arguments.length < 2) {
    for (var r = Wn(this.node()), i = -1, o = n.length; ++i < o; ) if (!r.contains(n[i])) return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? Fs : e ? As : Bs)(n, e));
}
function js() {
  this.textContent = "";
}
function Vs(t) {
  return function() {
    this.textContent = t;
  };
}
function Ds(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
function qs(t) {
  return arguments.length ? this.each(t == null ? js : (typeof t == "function" ? Ds : Vs)(t)) : this.node().textContent;
}
function Hs() {
  this.innerHTML = "";
}
function Us(t) {
  return function() {
    this.innerHTML = t;
  };
}
function Ws(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function Xs(t) {
  return arguments.length ? this.each(t == null ? Hs : (typeof t == "function" ? Ws : Us)(t)) : this.node().innerHTML;
}
function Ys() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Qs() {
  return this.each(Ys);
}
function Zs() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Js() {
  return this.each(Zs);
}
function Ks(t) {
  var e = typeof t == "function" ? t : ri(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function el() {
  return null;
}
function tl(t, e) {
  var n = typeof t == "function" ? t : ri(t), r = e == null ? el : typeof e == "function" ? e : Un(e);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function nl() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function rl() {
  return this.each(nl);
}
function il() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function ol() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function sl(t) {
  return this.select(t ? ol : il);
}
function ll(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function al(t) {
  return function(e) {
    t.call(this, e, this.__data__);
  };
}
function ul(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var n = "", r = e.indexOf(".");
    return r >= 0 && (n = e.slice(r + 1), e = e.slice(0, r)), { type: e, name: n };
  });
}
function hl(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var n = 0, r = -1, i = e.length, o; n < i; ++n)
        o = e[n], (!t.type || o.type === t.type) && o.name === t.name ? this.removeEventListener(o.type, o.listener, o.options) : e[++r] = o;
      ++r ? e.length = r : delete this.__on;
    }
  };
}
function cl(t, e, n) {
  return function() {
    var r = this.__on, i, o = al(e);
    if (r) {
      for (var s = 0, l = r.length; s < l; ++s)
        if ((i = r[s]).type === t.type && i.name === t.name) {
          this.removeEventListener(i.type, i.listener, i.options), this.addEventListener(i.type, i.listener = o, i.options = n), i.value = e;
          return;
        }
    }
    this.addEventListener(t.type, o, n), i = { type: t.type, name: t.name, value: e, listener: o, options: n }, r ? r.push(i) : this.__on = [i];
  };
}
function fl(t, e, n) {
  var r = ul(t + ""), i, o = r.length, s;
  if (arguments.length < 2) {
    var l = this.node().__on;
    if (l) {
      for (var a = 0, h = l.length, u; a < h; ++a)
        for (i = 0, u = l[a]; i < o; ++i)
          if ((s = r[i]).type === u.type && s.name === u.name)
            return u.value;
    }
    return;
  }
  for (l = e ? cl : hl, i = 0; i < o; ++i) this.each(l(r[i], e, n));
  return this;
}
function di(t, e, n) {
  var r = ai(t), i = r.CustomEvent;
  typeof i == "function" ? i = new i(e, n) : (i = r.document.createEvent("Event"), n ? (i.initEvent(e, n.bubbles, n.cancelable), i.detail = n.detail) : i.initEvent(e, !1, !1)), t.dispatchEvent(i);
}
function dl(t, e) {
  return function() {
    return di(this, t, e);
  };
}
function pl(t, e) {
  return function() {
    return di(this, t, e.apply(this, arguments));
  };
}
function gl(t, e) {
  return this.each((typeof e == "function" ? pl : dl)(t, e));
}
function* ml() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, o = r.length, s; i < o; ++i)
      (s = r[i]) && (yield s);
}
var pi = [null];
function ke(t, e) {
  this._groups = t, this._parents = e;
}
function It() {
  return new ke([[document.documentElement]], pi);
}
function wl() {
  return this;
}
ke.prototype = It.prototype = {
  constructor: ke,
  select: Do,
  selectAll: Wo,
  selectChild: Zo,
  selectChildren: ts,
  filter: ns,
  data: as,
  enter: rs,
  exit: hs,
  join: cs,
  merge: fs,
  selection: wl,
  order: ds,
  sort: ps,
  call: ms,
  nodes: ws,
  node: ys,
  size: vs,
  empty: bs,
  each: _s,
  attr: Ts,
  style: Is,
  property: zs,
  classed: Gs,
  text: qs,
  html: Xs,
  raise: Qs,
  lower: Js,
  append: Ks,
  insert: tl,
  remove: rl,
  clone: sl,
  datum: ll,
  on: fl,
  dispatch: gl,
  [Symbol.iterator]: ml
};
function Y(t) {
  return typeof t == "string" ? new ke([[document.querySelector(t)]], [document.documentElement]) : new ke([[t]], pi);
}
function gi(t) {
  let e;
  for (; e = t.sourceEvent; ) t = e;
  return t;
}
function Ne(t, e) {
  if (t = gi(t), e === void 0 && (e = t.currentTarget), e) {
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
function yl(t, e) {
  return t.target && (t = gi(t), e === void 0 && (e = t.currentTarget), t = t.touches || [t]), Array.from(t, (n) => Ne(n, e));
}
const vl = { passive: !1 }, kt = { capture: !0, passive: !1 };
function kn(t) {
  t.stopImmediatePropagation();
}
function ht(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function mi(t) {
  var e = t.document.documentElement, n = Y(t).on("dragstart.drag", ht, kt);
  "onselectstart" in e ? n.on("selectstart.drag", ht, kt) : (e.__noselect = e.style.MozUserSelect, e.style.MozUserSelect = "none");
}
function wi(t, e) {
  var n = t.document.documentElement, r = Y(t).on("dragstart.drag", null);
  e && (r.on("click.drag", ht, kt), setTimeout(function() {
    r.on("click.drag", null);
  }, 0)), "onselectstart" in n ? r.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
const Vt = (t) => () => t;
function $n(t, {
  sourceEvent: e,
  subject: n,
  target: r,
  identifier: i,
  active: o,
  x: s,
  y: l,
  dx: a,
  dy: h,
  dispatch: u
}) {
  Object.defineProperties(this, {
    type: { value: t, enumerable: !0, configurable: !0 },
    sourceEvent: { value: e, enumerable: !0, configurable: !0 },
    subject: { value: n, enumerable: !0, configurable: !0 },
    target: { value: r, enumerable: !0, configurable: !0 },
    identifier: { value: i, enumerable: !0, configurable: !0 },
    active: { value: o, enumerable: !0, configurable: !0 },
    x: { value: s, enumerable: !0, configurable: !0 },
    y: { value: l, enumerable: !0, configurable: !0 },
    dx: { value: a, enumerable: !0, configurable: !0 },
    dy: { value: h, enumerable: !0, configurable: !0 },
    _: { value: u }
  });
}
$n.prototype.on = function() {
  var t = this._.on.apply(this._, arguments);
  return t === this._ ? this : t;
};
function bl(t) {
  return !t.ctrlKey && !t.button;
}
function _l() {
  return this.parentNode;
}
function xl(t, e) {
  return e ?? { x: t.x, y: t.y };
}
function El() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Sl() {
  var t = bl, e = _l, n = xl, r = El, i = {}, o = Ct("start", "drag", "end"), s = 0, l, a, h, u, p = 0;
  function f(v) {
    v.on("mousedown.drag", m).filter(r).on("touchstart.drag", b).on("touchmove.drag", d, vl).on("touchend.drag touchcancel.drag", k).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function m(v, N) {
    if (!(u || !t.call(this, v, N))) {
      var I = R(this, e.call(this, v, N), v, N, "mouse");
      I && (Y(v.view).on("mousemove.drag", y, kt).on("mouseup.drag", S, kt), mi(v.view), kn(v), h = !1, l = v.clientX, a = v.clientY, I("start", v));
    }
  }
  function y(v) {
    if (ht(v), !h) {
      var N = v.clientX - l, I = v.clientY - a;
      h = N * N + I * I > p;
    }
    i.mouse("drag", v);
  }
  function S(v) {
    Y(v.view).on("mousemove.drag mouseup.drag", null), wi(v.view, h), ht(v), i.mouse("end", v);
  }
  function b(v, N) {
    if (t.call(this, v, N)) {
      var I = v.changedTouches, P = e.call(this, v, N), F = I.length, V, q;
      for (V = 0; V < F; ++V)
        (q = R(this, P, v, N, I[V].identifier, I[V])) && (kn(v), q("start", v, I[V]));
    }
  }
  function d(v) {
    var N = v.changedTouches, I = N.length, P, F;
    for (P = 0; P < I; ++P)
      (F = i[N[P].identifier]) && (ht(v), F("drag", v, N[P]));
  }
  function k(v) {
    var N = v.changedTouches, I = N.length, P, F;
    for (u && clearTimeout(u), u = setTimeout(function() {
      u = null;
    }, 500), P = 0; P < I; ++P)
      (F = i[N[P].identifier]) && (kn(v), F("end", v, N[P]));
  }
  function R(v, N, I, P, F, V) {
    var q = o.copy(), H = Ne(V || I, N), J, z, E;
    if ((E = n.call(v, new $n("beforestart", {
      sourceEvent: I,
      target: f,
      identifier: F,
      active: s,
      x: H[0],
      y: H[1],
      dx: 0,
      dy: 0,
      dispatch: q
    }), P)) != null)
      return J = E.x - H[0] || 0, z = E.y - H[1] || 0, function C(T, O, $) {
        var G = H, B;
        switch (T) {
          case "start":
            i[F] = C, B = s++;
            break;
          case "end":
            delete i[F], --s;
          case "drag":
            H = Ne($ || O, N), B = s;
            break;
        }
        q.call(
          T,
          v,
          new $n(T, {
            sourceEvent: O,
            subject: E,
            target: f,
            identifier: F,
            active: B,
            x: H[0] + J,
            y: H[1] + z,
            dx: H[0] - G[0],
            dy: H[1] - G[1],
            dispatch: q
          }),
          P
        );
      };
  }
  return f.filter = function(v) {
    return arguments.length ? (t = typeof v == "function" ? v : Vt(!!v), f) : t;
  }, f.container = function(v) {
    return arguments.length ? (e = typeof v == "function" ? v : Vt(v), f) : e;
  }, f.subject = function(v) {
    return arguments.length ? (n = typeof v == "function" ? v : Vt(v), f) : n;
  }, f.touchable = function(v) {
    return arguments.length ? (r = typeof v == "function" ? v : Vt(!!v), f) : r;
  }, f.on = function() {
    var v = o.on.apply(o, arguments);
    return v === o ? f : v;
  }, f.clickDistance = function(v) {
    return arguments.length ? (p = (v = +v) * v, f) : Math.sqrt(p);
  }, f;
}
function Xn(t, e, n) {
  t.prototype = e.prototype = n, n.constructor = t;
}
function yi(t, e) {
  var n = Object.create(t.prototype);
  for (var r in e) n[r] = e[r];
  return n;
}
function Pt() {
}
var Mt = 0.7, ln = 1 / Mt, ct = "\\s*([+-]?\\d+)\\s*", Nt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", ze = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", kl = /^#([0-9a-f]{3,8})$/, Ml = new RegExp(`^rgb\\(${ct},${ct},${ct}\\)$`), Nl = new RegExp(`^rgb\\(${ze},${ze},${ze}\\)$`), Tl = new RegExp(`^rgba\\(${ct},${ct},${ct},${Nt}\\)$`), Ll = new RegExp(`^rgba\\(${ze},${ze},${ze},${Nt}\\)$`), Rl = new RegExp(`^hsl\\(${Nt},${ze},${ze}\\)$`), Cl = new RegExp(`^hsla\\(${Nt},${ze},${ze},${Nt}\\)$`), Mr = {
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
Xn(Pt, tt, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Nr,
  // Deprecated! Use color.formatHex.
  formatHex: Nr,
  formatHex8: Il,
  formatHsl: Pl,
  formatRgb: Tr,
  toString: Tr
});
function Nr() {
  return this.rgb().formatHex();
}
function Il() {
  return this.rgb().formatHex8();
}
function Pl() {
  return vi(this).formatHsl();
}
function Tr() {
  return this.rgb().formatRgb();
}
function tt(t) {
  var e, n;
  return t = (t + "").trim().toLowerCase(), (e = kl.exec(t)) ? (n = e[1].length, e = parseInt(e[1], 16), n === 6 ? Lr(e) : n === 3 ? new _e(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : n === 8 ? Dt(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : n === 4 ? Dt(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = Ml.exec(t)) ? new _e(e[1], e[2], e[3], 1) : (e = Nl.exec(t)) ? new _e(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = Tl.exec(t)) ? Dt(e[1], e[2], e[3], e[4]) : (e = Ll.exec(t)) ? Dt(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = Rl.exec(t)) ? Ir(e[1], e[2] / 100, e[3] / 100, 1) : (e = Cl.exec(t)) ? Ir(e[1], e[2] / 100, e[3] / 100, e[4]) : Mr.hasOwnProperty(t) ? Lr(Mr[t]) : t === "transparent" ? new _e(NaN, NaN, NaN, 0) : null;
}
function Lr(t) {
  return new _e(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function Dt(t, e, n, r) {
  return r <= 0 && (t = e = n = NaN), new _e(t, e, n, r);
}
function Ol(t) {
  return t instanceof Pt || (t = tt(t)), t ? (t = t.rgb(), new _e(t.r, t.g, t.b, t.opacity)) : new _e();
}
function zn(t, e, n, r) {
  return arguments.length === 1 ? Ol(t) : new _e(t, e, n, r ?? 1);
}
function _e(t, e, n, r) {
  this.r = +t, this.g = +e, this.b = +n, this.opacity = +r;
}
Xn(_e, zn, yi(Pt, {
  brighter(t) {
    return t = t == null ? ln : Math.pow(ln, t), new _e(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Mt : Math.pow(Mt, t), new _e(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new _e(et(this.r), et(this.g), et(this.b), an(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Rr,
  // Deprecated! Use color.formatHex.
  formatHex: Rr,
  formatHex8: $l,
  formatRgb: Cr,
  toString: Cr
}));
function Rr() {
  return `#${Ke(this.r)}${Ke(this.g)}${Ke(this.b)}`;
}
function $l() {
  return `#${Ke(this.r)}${Ke(this.g)}${Ke(this.b)}${Ke((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Cr() {
  const t = an(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${et(this.r)}, ${et(this.g)}, ${et(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function an(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function et(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function Ke(t) {
  return t = et(t), (t < 16 ? "0" : "") + t.toString(16);
}
function Ir(t, e, n, r) {
  return r <= 0 ? t = e = n = NaN : n <= 0 || n >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new Ie(t, e, n, r);
}
function vi(t) {
  if (t instanceof Ie) return new Ie(t.h, t.s, t.l, t.opacity);
  if (t instanceof Pt || (t = tt(t)), !t) return new Ie();
  if (t instanceof Ie) return t;
  t = t.rgb();
  var e = t.r / 255, n = t.g / 255, r = t.b / 255, i = Math.min(e, n, r), o = Math.max(e, n, r), s = NaN, l = o - i, a = (o + i) / 2;
  return l ? (e === o ? s = (n - r) / l + (n < r) * 6 : n === o ? s = (r - e) / l + 2 : s = (e - n) / l + 4, l /= a < 0.5 ? o + i : 2 - o - i, s *= 60) : l = a > 0 && a < 1 ? 0 : s, new Ie(s, l, a, t.opacity);
}
function zl(t, e, n, r) {
  return arguments.length === 1 ? vi(t) : new Ie(t, e, n, r ?? 1);
}
function Ie(t, e, n, r) {
  this.h = +t, this.s = +e, this.l = +n, this.opacity = +r;
}
Xn(Ie, zl, yi(Pt, {
  brighter(t) {
    return t = t == null ? ln : Math.pow(ln, t), new Ie(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Mt : Math.pow(Mt, t), new Ie(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, e = isNaN(t) || isNaN(this.s) ? 0 : this.s, n = this.l, r = n + (n < 0.5 ? n : 1 - n) * e, i = 2 * n - r;
    return new _e(
      Mn(t >= 240 ? t - 240 : t + 120, i, r),
      Mn(t, i, r),
      Mn(t < 120 ? t + 240 : t - 120, i, r),
      this.opacity
    );
  },
  clamp() {
    return new Ie(Pr(this.h), qt(this.s), qt(this.l), an(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = an(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${Pr(this.h)}, ${qt(this.s) * 100}%, ${qt(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function Pr(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function qt(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function Mn(t, e, n) {
  return (t < 60 ? e + (n - e) * t / 60 : t < 180 ? n : t < 240 ? e + (n - e) * (240 - t) / 60 : e) * 255;
}
const Yn = (t) => () => t;
function Al(t, e) {
  return function(n) {
    return t + n * e;
  };
}
function Bl(t, e, n) {
  return t = Math.pow(t, n), e = Math.pow(e, n) - t, n = 1 / n, function(r) {
    return Math.pow(t + r * e, n);
  };
}
function Fl(t) {
  return (t = +t) == 1 ? bi : function(e, n) {
    return n - e ? Bl(e, n, t) : Yn(isNaN(e) ? n : e);
  };
}
function bi(t, e) {
  var n = e - t;
  return n ? Al(t, n) : Yn(isNaN(t) ? e : t);
}
const un = function t(e) {
  var n = Fl(e);
  function r(i, o) {
    var s = n((i = zn(i)).r, (o = zn(o)).r), l = n(i.g, o.g), a = n(i.b, o.b), h = bi(i.opacity, o.opacity);
    return function(u) {
      return i.r = s(u), i.g = l(u), i.b = a(u), i.opacity = h(u), i + "";
    };
  }
  return r.gamma = t, r;
}(1);
function Gl(t, e) {
  e || (e = []);
  var n = t ? Math.min(e.length, t.length) : 0, r = e.slice(), i;
  return function(o) {
    for (i = 0; i < n; ++i) r[i] = t[i] * (1 - o) + e[i] * o;
    return r;
  };
}
function jl(t) {
  return ArrayBuffer.isView(t) && !(t instanceof DataView);
}
function Vl(t, e) {
  var n = e ? e.length : 0, r = t ? Math.min(n, t.length) : 0, i = new Array(r), o = new Array(n), s;
  for (s = 0; s < r; ++s) i[s] = Qn(t[s], e[s]);
  for (; s < n; ++s) o[s] = e[s];
  return function(l) {
    for (s = 0; s < r; ++s) o[s] = i[s](l);
    return o;
  };
}
function Dl(t, e) {
  var n = /* @__PURE__ */ new Date();
  return t = +t, e = +e, function(r) {
    return n.setTime(t * (1 - r) + e * r), n;
  };
}
function $e(t, e) {
  return t = +t, e = +e, function(n) {
    return t * (1 - n) + e * n;
  };
}
function ql(t, e) {
  var n = {}, r = {}, i;
  (t === null || typeof t != "object") && (t = {}), (e === null || typeof e != "object") && (e = {});
  for (i in e)
    i in t ? n[i] = Qn(t[i], e[i]) : r[i] = e[i];
  return function(o) {
    for (i in n) r[i] = n[i](o);
    return r;
  };
}
var An = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Nn = new RegExp(An.source, "g");
function Hl(t) {
  return function() {
    return t;
  };
}
function Ul(t) {
  return function(e) {
    return t(e) + "";
  };
}
function _i(t, e) {
  var n = An.lastIndex = Nn.lastIndex = 0, r, i, o, s = -1, l = [], a = [];
  for (t = t + "", e = e + ""; (r = An.exec(t)) && (i = Nn.exec(e)); )
    (o = i.index) > n && (o = e.slice(n, o), l[s] ? l[s] += o : l[++s] = o), (r = r[0]) === (i = i[0]) ? l[s] ? l[s] += i : l[++s] = i : (l[++s] = null, a.push({ i: s, x: $e(r, i) })), n = Nn.lastIndex;
  return n < e.length && (o = e.slice(n), l[s] ? l[s] += o : l[++s] = o), l.length < 2 ? a[0] ? Ul(a[0].x) : Hl(e) : (e = a.length, function(h) {
    for (var u = 0, p; u < e; ++u) l[(p = a[u]).i] = p.x(h);
    return l.join("");
  });
}
function Qn(t, e) {
  var n = typeof e, r;
  return e == null || n === "boolean" ? Yn(e) : (n === "number" ? $e : n === "string" ? (r = tt(e)) ? (e = r, un) : _i : e instanceof tt ? un : e instanceof Date ? Dl : jl(e) ? Gl : Array.isArray(e) ? Vl : typeof e.valueOf != "function" && typeof e.toString != "function" || isNaN(e) ? ql : $e)(t, e);
}
var Or = 180 / Math.PI, Bn = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function xi(t, e, n, r, i, o) {
  var s, l, a;
  return (s = Math.sqrt(t * t + e * e)) && (t /= s, e /= s), (a = t * n + e * r) && (n -= t * a, r -= e * a), (l = Math.sqrt(n * n + r * r)) && (n /= l, r /= l, a /= l), t * r < e * n && (t = -t, e = -e, a = -a, s = -s), {
    translateX: i,
    translateY: o,
    rotate: Math.atan2(e, t) * Or,
    skewX: Math.atan(a) * Or,
    scaleX: s,
    scaleY: l
  };
}
var Ht;
function Wl(t) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return e.isIdentity ? Bn : xi(e.a, e.b, e.c, e.d, e.e, e.f);
}
function Xl(t) {
  return t == null || (Ht || (Ht = document.createElementNS("http://www.w3.org/2000/svg", "g")), Ht.setAttribute("transform", t), !(t = Ht.transform.baseVal.consolidate())) ? Bn : (t = t.matrix, xi(t.a, t.b, t.c, t.d, t.e, t.f));
}
function Ei(t, e, n, r) {
  function i(h) {
    return h.length ? h.pop() + " " : "";
  }
  function o(h, u, p, f, m, y) {
    if (h !== p || u !== f) {
      var S = m.push("translate(", null, e, null, n);
      y.push({ i: S - 4, x: $e(h, p) }, { i: S - 2, x: $e(u, f) });
    } else (p || f) && m.push("translate(" + p + e + f + n);
  }
  function s(h, u, p, f) {
    h !== u ? (h - u > 180 ? u += 360 : u - h > 180 && (h += 360), f.push({ i: p.push(i(p) + "rotate(", null, r) - 2, x: $e(h, u) })) : u && p.push(i(p) + "rotate(" + u + r);
  }
  function l(h, u, p, f) {
    h !== u ? f.push({ i: p.push(i(p) + "skewX(", null, r) - 2, x: $e(h, u) }) : u && p.push(i(p) + "skewX(" + u + r);
  }
  function a(h, u, p, f, m, y) {
    if (h !== p || u !== f) {
      var S = m.push(i(m) + "scale(", null, ",", null, ")");
      y.push({ i: S - 4, x: $e(h, p) }, { i: S - 2, x: $e(u, f) });
    } else (p !== 1 || f !== 1) && m.push(i(m) + "scale(" + p + "," + f + ")");
  }
  return function(h, u) {
    var p = [], f = [];
    return h = t(h), u = t(u), o(h.translateX, h.translateY, u.translateX, u.translateY, p, f), s(h.rotate, u.rotate, p, f), l(h.skewX, u.skewX, p, f), a(h.scaleX, h.scaleY, u.scaleX, u.scaleY, p, f), h = u = null, function(m) {
      for (var y = -1, S = f.length, b; ++y < S; ) p[(b = f[y]).i] = b.x(m);
      return p.join("");
    };
  };
}
var Yl = Ei(Wl, "px, ", "px)", "deg)"), Ql = Ei(Xl, ", ", ")", ")"), Zl = 1e-12;
function $r(t) {
  return ((t = Math.exp(t)) + 1 / t) / 2;
}
function Jl(t) {
  return ((t = Math.exp(t)) - 1 / t) / 2;
}
function Kl(t) {
  return ((t = Math.exp(2 * t)) - 1) / (t + 1);
}
const ea = function t(e, n, r) {
  function i(o, s) {
    var l = o[0], a = o[1], h = o[2], u = s[0], p = s[1], f = s[2], m = u - l, y = p - a, S = m * m + y * y, b, d;
    if (S < Zl)
      d = Math.log(f / h) / e, b = function(P) {
        return [
          l + P * m,
          a + P * y,
          h * Math.exp(e * P * d)
        ];
      };
    else {
      var k = Math.sqrt(S), R = (f * f - h * h + r * S) / (2 * h * n * k), v = (f * f - h * h - r * S) / (2 * f * n * k), N = Math.log(Math.sqrt(R * R + 1) - R), I = Math.log(Math.sqrt(v * v + 1) - v);
      d = (I - N) / e, b = function(P) {
        var F = P * d, V = $r(N), q = h / (n * k) * (V * Kl(e * F + N) - Jl(N));
        return [
          l + q * m,
          a + q * y,
          h * V / $r(e * F + N)
        ];
      };
    }
    return b.duration = d * 1e3 * e / Math.SQRT2, b;
  }
  return i.rho = function(o) {
    var s = Math.max(1e-3, +o), l = s * s, a = l * l;
    return t(s, l, a);
  }, i;
}(Math.SQRT2, 2, 4);
var dt = 0, bt = 0, yt = 0, Si = 1e3, hn, _t, cn = 0, nt = 0, yn = 0, Tt = typeof performance == "object" && performance.now ? performance : Date, ki = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function Zn() {
  return nt || (ki(ta), nt = Tt.now() + yn);
}
function ta() {
  nt = 0;
}
function fn() {
  this._call = this._time = this._next = null;
}
fn.prototype = Jn.prototype = {
  constructor: fn,
  restart: function(t, e, n) {
    if (typeof t != "function") throw new TypeError("callback is not a function");
    n = (n == null ? Zn() : +n) + (e == null ? 0 : +e), !this._next && _t !== this && (_t ? _t._next = this : hn = this, _t = this), this._call = t, this._time = n, Fn();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Fn());
  }
};
function Jn(t, e, n) {
  var r = new fn();
  return r.restart(t, e, n), r;
}
function na() {
  Zn(), ++dt;
  for (var t = hn, e; t; )
    (e = nt - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
  --dt;
}
function zr() {
  nt = (cn = Tt.now()) + yn, dt = bt = 0;
  try {
    na();
  } finally {
    dt = 0, ia(), nt = 0;
  }
}
function ra() {
  var t = Tt.now(), e = t - cn;
  e > Si && (yn -= e, cn = t);
}
function ia() {
  for (var t, e = hn, n, r = 1 / 0; e; )
    e._call ? (r > e._time && (r = e._time), t = e, e = e._next) : (n = e._next, e._next = null, e = t ? t._next = n : hn = n);
  _t = t, Fn(r);
}
function Fn(t) {
  if (!dt) {
    bt && (bt = clearTimeout(bt));
    var e = t - nt;
    e > 24 ? (t < 1 / 0 && (bt = setTimeout(zr, t - Tt.now() - yn)), yt && (yt = clearInterval(yt))) : (yt || (cn = Tt.now(), yt = setInterval(ra, Si)), dt = 1, ki(zr));
  }
}
function Ar(t, e, n) {
  var r = new fn();
  return e = e == null ? 0 : +e, r.restart((i) => {
    r.stop(), t(i + e);
  }, e, n), r;
}
var oa = Ct("start", "end", "cancel", "interrupt"), sa = [], Mi = 0, Br = 1, Gn = 2, tn = 3, Fr = 4, jn = 5, nn = 6;
function vn(t, e, n, r, i, o) {
  var s = t.__transition;
  if (!s) t.__transition = {};
  else if (n in s) return;
  la(t, n, {
    name: e,
    index: r,
    // For context during callback.
    group: i,
    // For context during callback.
    on: oa,
    tween: sa,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: Mi
  });
}
function Kn(t, e) {
  var n = Pe(t, e);
  if (n.state > Mi) throw new Error("too late; already scheduled");
  return n;
}
function Ae(t, e) {
  var n = Pe(t, e);
  if (n.state > tn) throw new Error("too late; already running");
  return n;
}
function Pe(t, e) {
  var n = t.__transition;
  if (!n || !(n = n[e])) throw new Error("transition not found");
  return n;
}
function la(t, e, n) {
  var r = t.__transition, i;
  r[e] = n, n.timer = Jn(o, 0, n.time);
  function o(h) {
    n.state = Br, n.timer.restart(s, n.delay, n.time), n.delay <= h && s(h - n.delay);
  }
  function s(h) {
    var u, p, f, m;
    if (n.state !== Br) return a();
    for (u in r)
      if (m = r[u], m.name === n.name) {
        if (m.state === tn) return Ar(s);
        m.state === Fr ? (m.state = nn, m.timer.stop(), m.on.call("interrupt", t, t.__data__, m.index, m.group), delete r[u]) : +u < e && (m.state = nn, m.timer.stop(), m.on.call("cancel", t, t.__data__, m.index, m.group), delete r[u]);
      }
    if (Ar(function() {
      n.state === tn && (n.state = Fr, n.timer.restart(l, n.delay, n.time), l(h));
    }), n.state = Gn, n.on.call("start", t, t.__data__, n.index, n.group), n.state === Gn) {
      for (n.state = tn, i = new Array(f = n.tween.length), u = 0, p = -1; u < f; ++u)
        (m = n.tween[u].value.call(t, t.__data__, n.index, n.group)) && (i[++p] = m);
      i.length = p + 1;
    }
  }
  function l(h) {
    for (var u = h < n.duration ? n.ease.call(null, h / n.duration) : (n.timer.restart(a), n.state = jn, 1), p = -1, f = i.length; ++p < f; )
      i[p].call(t, u);
    n.state === jn && (n.on.call("end", t, t.__data__, n.index, n.group), a());
  }
  function a() {
    n.state = nn, n.timer.stop(), delete r[e];
    for (var h in r) return;
    delete t.__transition;
  }
}
function rn(t, e) {
  var n = t.__transition, r, i, o = !0, s;
  if (n) {
    e = e == null ? null : e + "";
    for (s in n) {
      if ((r = n[s]).name !== e) {
        o = !1;
        continue;
      }
      i = r.state > Gn && r.state < jn, r.state = nn, r.timer.stop(), r.on.call(i ? "interrupt" : "cancel", t, t.__data__, r.index, r.group), delete n[s];
    }
    o && delete t.__transition;
  }
}
function aa(t) {
  return this.each(function() {
    rn(this, t);
  });
}
function ua(t, e) {
  var n, r;
  return function() {
    var i = Ae(this, t), o = i.tween;
    if (o !== n) {
      r = n = o;
      for (var s = 0, l = r.length; s < l; ++s)
        if (r[s].name === e) {
          r = r.slice(), r.splice(s, 1);
          break;
        }
    }
    i.tween = r;
  };
}
function ha(t, e, n) {
  var r, i;
  if (typeof n != "function") throw new Error();
  return function() {
    var o = Ae(this, t), s = o.tween;
    if (s !== r) {
      i = (r = s).slice();
      for (var l = { name: e, value: n }, a = 0, h = i.length; a < h; ++a)
        if (i[a].name === e) {
          i[a] = l;
          break;
        }
      a === h && i.push(l);
    }
    o.tween = i;
  };
}
function ca(t, e) {
  var n = this._id;
  if (t += "", arguments.length < 2) {
    for (var r = Pe(this.node(), n).tween, i = 0, o = r.length, s; i < o; ++i)
      if ((s = r[i]).name === t)
        return s.value;
    return null;
  }
  return this.each((e == null ? ua : ha)(n, t, e));
}
function er(t, e, n) {
  var r = t._id;
  return t.each(function() {
    var i = Ae(this, r);
    (i.value || (i.value = {}))[e] = n.apply(this, arguments);
  }), function(i) {
    return Pe(i, r).value[e];
  };
}
function Ni(t, e) {
  var n;
  return (typeof e == "number" ? $e : e instanceof tt ? un : (n = tt(e)) ? (e = n, un) : _i)(t, e);
}
function fa(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function da(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function pa(t, e, n) {
  var r, i = n + "", o;
  return function() {
    var s = this.getAttribute(t);
    return s === i ? null : s === r ? o : o = e(r = s, n);
  };
}
function ga(t, e, n) {
  var r, i = n + "", o;
  return function() {
    var s = this.getAttributeNS(t.space, t.local);
    return s === i ? null : s === r ? o : o = e(r = s, n);
  };
}
function ma(t, e, n) {
  var r, i, o;
  return function() {
    var s, l = n(this), a;
    return l == null ? void this.removeAttribute(t) : (s = this.getAttribute(t), a = l + "", s === a ? null : s === r && a === i ? o : (i = a, o = e(r = s, l)));
  };
}
function wa(t, e, n) {
  var r, i, o;
  return function() {
    var s, l = n(this), a;
    return l == null ? void this.removeAttributeNS(t.space, t.local) : (s = this.getAttributeNS(t.space, t.local), a = l + "", s === a ? null : s === r && a === i ? o : (i = a, o = e(r = s, l)));
  };
}
function ya(t, e) {
  var n = wn(t), r = n === "transform" ? Ql : Ni;
  return this.attrTween(t, typeof e == "function" ? (n.local ? wa : ma)(n, r, er(this, "attr." + t, e)) : e == null ? (n.local ? da : fa)(n) : (n.local ? ga : pa)(n, r, e));
}
function va(t, e) {
  return function(n) {
    this.setAttribute(t, e.call(this, n));
  };
}
function ba(t, e) {
  return function(n) {
    this.setAttributeNS(t.space, t.local, e.call(this, n));
  };
}
function _a(t, e) {
  var n, r;
  function i() {
    var o = e.apply(this, arguments);
    return o !== r && (n = (r = o) && ba(t, o)), n;
  }
  return i._value = e, i;
}
function xa(t, e) {
  var n, r;
  function i() {
    var o = e.apply(this, arguments);
    return o !== r && (n = (r = o) && va(t, o)), n;
  }
  return i._value = e, i;
}
function Ea(t, e) {
  var n = "attr." + t;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (e == null) return this.tween(n, null);
  if (typeof e != "function") throw new Error();
  var r = wn(t);
  return this.tween(n, (r.local ? _a : xa)(r, e));
}
function Sa(t, e) {
  return function() {
    Kn(this, t).delay = +e.apply(this, arguments);
  };
}
function ka(t, e) {
  return e = +e, function() {
    Kn(this, t).delay = e;
  };
}
function Ma(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Sa : ka)(e, t)) : Pe(this.node(), e).delay;
}
function Na(t, e) {
  return function() {
    Ae(this, t).duration = +e.apply(this, arguments);
  };
}
function Ta(t, e) {
  return e = +e, function() {
    Ae(this, t).duration = e;
  };
}
function La(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Na : Ta)(e, t)) : Pe(this.node(), e).duration;
}
function Ra(t, e) {
  if (typeof e != "function") throw new Error();
  return function() {
    Ae(this, t).ease = e;
  };
}
function Ca(t) {
  var e = this._id;
  return arguments.length ? this.each(Ra(e, t)) : Pe(this.node(), e).ease;
}
function Ia(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    Ae(this, t).ease = n;
  };
}
function Pa(t) {
  if (typeof t != "function") throw new Error();
  return this.each(Ia(this._id, t));
}
function Oa(t) {
  typeof t != "function" && (t = oi(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = e[i], s = o.length, l = r[i] = [], a, h = 0; h < s; ++h)
      (a = o[h]) && t.call(a, a.__data__, h, o) && l.push(a);
  return new je(r, this._parents, this._name, this._id);
}
function $a(t) {
  if (t._id !== this._id) throw new Error();
  for (var e = this._groups, n = t._groups, r = e.length, i = n.length, o = Math.min(r, i), s = new Array(r), l = 0; l < o; ++l)
    for (var a = e[l], h = n[l], u = a.length, p = s[l] = new Array(u), f, m = 0; m < u; ++m)
      (f = a[m] || h[m]) && (p[m] = f);
  for (; l < r; ++l)
    s[l] = e[l];
  return new je(s, this._parents, this._name, this._id);
}
function za(t) {
  return (t + "").trim().split(/^|\s+/).every(function(e) {
    var n = e.indexOf(".");
    return n >= 0 && (e = e.slice(0, n)), !e || e === "start";
  });
}
function Aa(t, e, n) {
  var r, i, o = za(e) ? Kn : Ae;
  return function() {
    var s = o(this, t), l = s.on;
    l !== r && (i = (r = l).copy()).on(e, n), s.on = i;
  };
}
function Ba(t, e) {
  var n = this._id;
  return arguments.length < 2 ? Pe(this.node(), n).on.on(t) : this.each(Aa(n, t, e));
}
function Fa(t) {
  return function() {
    var e = this.parentNode;
    for (var n in this.__transition) if (+n !== t) return;
    e && e.removeChild(this);
  };
}
function Ga() {
  return this.on("end.remove", Fa(this._id));
}
function ja(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = Un(t));
  for (var r = this._groups, i = r.length, o = new Array(i), s = 0; s < i; ++s)
    for (var l = r[s], a = l.length, h = o[s] = new Array(a), u, p, f = 0; f < a; ++f)
      (u = l[f]) && (p = t.call(u, u.__data__, f, l)) && ("__data__" in u && (p.__data__ = u.__data__), h[f] = p, vn(h[f], e, n, f, h, Pe(u, n)));
  return new je(o, this._parents, e, n);
}
function Va(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = ii(t));
  for (var r = this._groups, i = r.length, o = [], s = [], l = 0; l < i; ++l)
    for (var a = r[l], h = a.length, u, p = 0; p < h; ++p)
      if (u = a[p]) {
        for (var f = t.call(u, u.__data__, p, a), m, y = Pe(u, n), S = 0, b = f.length; S < b; ++S)
          (m = f[S]) && vn(m, e, n, S, f, y);
        o.push(f), s.push(u);
      }
  return new je(o, s, e, n);
}
var Da = It.prototype.constructor;
function qa() {
  return new Da(this._groups, this._parents);
}
function Ha(t, e) {
  var n, r, i;
  return function() {
    var o = ft(this, t), s = (this.style.removeProperty(t), ft(this, t));
    return o === s ? null : o === n && s === r ? i : i = e(n = o, r = s);
  };
}
function Ti(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Ua(t, e, n) {
  var r, i = n + "", o;
  return function() {
    var s = ft(this, t);
    return s === i ? null : s === r ? o : o = e(r = s, n);
  };
}
function Wa(t, e, n) {
  var r, i, o;
  return function() {
    var s = ft(this, t), l = n(this), a = l + "";
    return l == null && (a = l = (this.style.removeProperty(t), ft(this, t))), s === a ? null : s === r && a === i ? o : (i = a, o = e(r = s, l));
  };
}
function Xa(t, e) {
  var n, r, i, o = "style." + e, s = "end." + o, l;
  return function() {
    var a = Ae(this, t), h = a.on, u = a.value[o] == null ? l || (l = Ti(e)) : void 0;
    (h !== n || i !== u) && (r = (n = h).copy()).on(s, i = u), a.on = r;
  };
}
function Ya(t, e, n) {
  var r = (t += "") == "transform" ? Yl : Ni;
  return e == null ? this.styleTween(t, Ha(t, r)).on("end.style." + t, Ti(t)) : typeof e == "function" ? this.styleTween(t, Wa(t, r, er(this, "style." + t, e))).each(Xa(this._id, t)) : this.styleTween(t, Ua(t, r, e), n).on("end.style." + t, null);
}
function Qa(t, e, n) {
  return function(r) {
    this.style.setProperty(t, e.call(this, r), n);
  };
}
function Za(t, e, n) {
  var r, i;
  function o() {
    var s = e.apply(this, arguments);
    return s !== i && (r = (i = s) && Qa(t, s, n)), r;
  }
  return o._value = e, o;
}
function Ja(t, e, n) {
  var r = "style." + (t += "");
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (e == null) return this.tween(r, null);
  if (typeof e != "function") throw new Error();
  return this.tween(r, Za(t, e, n ?? ""));
}
function Ka(t) {
  return function() {
    this.textContent = t;
  };
}
function eu(t) {
  return function() {
    var e = t(this);
    this.textContent = e ?? "";
  };
}
function tu(t) {
  return this.tween("text", typeof t == "function" ? eu(er(this, "text", t)) : Ka(t == null ? "" : t + ""));
}
function nu(t) {
  return function(e) {
    this.textContent = t.call(this, e);
  };
}
function ru(t) {
  var e, n;
  function r() {
    var i = t.apply(this, arguments);
    return i !== n && (e = (n = i) && nu(i)), e;
  }
  return r._value = t, r;
}
function iu(t) {
  var e = "text";
  if (arguments.length < 1) return (e = this.tween(e)) && e._value;
  if (t == null) return this.tween(e, null);
  if (typeof t != "function") throw new Error();
  return this.tween(e, ru(t));
}
function ou() {
  for (var t = this._name, e = this._id, n = Li(), r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var s = r[o], l = s.length, a, h = 0; h < l; ++h)
      if (a = s[h]) {
        var u = Pe(a, e);
        vn(a, t, n, h, s, {
          time: u.time + u.delay + u.duration,
          delay: 0,
          duration: u.duration,
          ease: u.ease
        });
      }
  return new je(r, this._parents, t, n);
}
function su() {
  var t, e, n = this, r = n._id, i = n.size();
  return new Promise(function(o, s) {
    var l = { value: s }, a = { value: function() {
      --i === 0 && o();
    } };
    n.each(function() {
      var h = Ae(this, r), u = h.on;
      u !== t && (e = (t = u).copy(), e._.cancel.push(l), e._.interrupt.push(l), e._.end.push(a)), h.on = e;
    }), i === 0 && o();
  });
}
var lu = 0;
function je(t, e, n, r) {
  this._groups = t, this._parents = e, this._name = n, this._id = r;
}
function Li() {
  return ++lu;
}
var Fe = It.prototype;
je.prototype = {
  constructor: je,
  select: ja,
  selectAll: Va,
  selectChild: Fe.selectChild,
  selectChildren: Fe.selectChildren,
  filter: Oa,
  merge: $a,
  selection: qa,
  transition: ou,
  call: Fe.call,
  nodes: Fe.nodes,
  node: Fe.node,
  size: Fe.size,
  empty: Fe.empty,
  each: Fe.each,
  on: Ba,
  attr: ya,
  attrTween: Ea,
  style: Ya,
  styleTween: Ja,
  text: tu,
  textTween: iu,
  remove: Ga,
  tween: ca,
  delay: Ma,
  duration: La,
  ease: Ca,
  easeVarying: Pa,
  end: su,
  [Symbol.iterator]: Fe[Symbol.iterator]
};
const Gr = (t) => +t;
function au(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var uu = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: au
};
function hu(t, e) {
  for (var n; !(n = t.__transition) || !(n = n[e]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${e} not found`);
  return n;
}
function cu(t) {
  var e, n;
  t instanceof je ? (e = t._id, t = t._name) : (e = Li(), (n = uu).time = Zn(), t = t == null ? null : t + "");
  for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var s = r[o], l = s.length, a, h = 0; h < l; ++h)
      (a = s[h]) && vn(a, t, e, h, s, n || hu(a, e));
  return new je(r, this._parents, t, e);
}
It.prototype.interrupt = aa;
It.prototype.transition = cu;
const Vn = Math.PI, Dn = 2 * Vn, Je = 1e-6, fu = Dn - Je;
function Ri(t) {
  this._ += t[0];
  for (let e = 1, n = t.length; e < n; ++e)
    this._ += arguments[e] + t[e];
}
function du(t) {
  let e = Math.floor(t);
  if (!(e >= 0)) throw new Error(`invalid digits: ${t}`);
  if (e > 15) return Ri;
  const n = 10 ** e;
  return function(r) {
    this._ += r[0];
    for (let i = 1, o = r.length; i < o; ++i)
      this._ += Math.round(arguments[i] * n) / n + r[i];
  };
}
class pu {
  constructor(e) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null, this._ = "", this._append = e == null ? Ri : du(e);
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
  bezierCurveTo(e, n, r, i, o, s) {
    this._append`C${+e},${+n},${+r},${+i},${this._x1 = +o},${this._y1 = +s}`;
  }
  arcTo(e, n, r, i, o) {
    if (e = +e, n = +n, r = +r, i = +i, o = +o, o < 0) throw new Error(`negative radius: ${o}`);
    let s = this._x1, l = this._y1, a = r - e, h = i - n, u = s - e, p = l - n, f = u * u + p * p;
    if (this._x1 === null)
      this._append`M${this._x1 = e},${this._y1 = n}`;
    else if (f > Je) if (!(Math.abs(p * a - h * u) > Je) || !o)
      this._append`L${this._x1 = e},${this._y1 = n}`;
    else {
      let m = r - s, y = i - l, S = a * a + h * h, b = m * m + y * y, d = Math.sqrt(S), k = Math.sqrt(f), R = o * Math.tan((Vn - Math.acos((S + f - b) / (2 * d * k))) / 2), v = R / k, N = R / d;
      Math.abs(v - 1) > Je && this._append`L${e + v * u},${n + v * p}`, this._append`A${o},${o},0,0,${+(p * m > u * y)},${this._x1 = e + N * a},${this._y1 = n + N * h}`;
    }
  }
  arc(e, n, r, i, o, s) {
    if (e = +e, n = +n, r = +r, s = !!s, r < 0) throw new Error(`negative radius: ${r}`);
    let l = r * Math.cos(i), a = r * Math.sin(i), h = e + l, u = n + a, p = 1 ^ s, f = s ? i - o : o - i;
    this._x1 === null ? this._append`M${h},${u}` : (Math.abs(this._x1 - h) > Je || Math.abs(this._y1 - u) > Je) && this._append`L${h},${u}`, r && (f < 0 && (f = f % Dn + Dn), f > fu ? this._append`A${r},${r},0,1,${p},${e - l},${n - a}A${r},${r},0,1,${p},${this._x1 = h},${this._y1 = u}` : f > Je && this._append`A${r},${r},0,${+(f >= Vn)},${p},${this._x1 = e + r * Math.cos(o)},${this._y1 = n + r * Math.sin(o)}`);
  }
  rect(e, n, r, i) {
    this._append`M${this._x0 = this._x1 = +e},${this._y0 = this._y1 = +n}h${r = +r}v${+i}h${-r}Z`;
  }
  toString() {
    return this._;
  }
}
function gu(t) {
  const e = +this._x.call(null, t), n = +this._y.call(null, t);
  return Ci(this.cover(e, n), e, n, t);
}
function Ci(t, e, n, r) {
  if (isNaN(e) || isNaN(n)) return t;
  var i, o = t._root, s = { data: r }, l = t._x0, a = t._y0, h = t._x1, u = t._y1, p, f, m, y, S, b, d, k;
  if (!o) return t._root = s, t;
  for (; o.length; )
    if ((S = e >= (p = (l + h) / 2)) ? l = p : h = p, (b = n >= (f = (a + u) / 2)) ? a = f : u = f, i = o, !(o = o[d = b << 1 | S])) return i[d] = s, t;
  if (m = +t._x.call(null, o.data), y = +t._y.call(null, o.data), e === m && n === y) return s.next = o, i ? i[d] = s : t._root = s, t;
  do
    i = i ? i[d] = new Array(4) : t._root = new Array(4), (S = e >= (p = (l + h) / 2)) ? l = p : h = p, (b = n >= (f = (a + u) / 2)) ? a = f : u = f;
  while ((d = b << 1 | S) === (k = (y >= f) << 1 | m >= p));
  return i[k] = o, i[d] = s, t;
}
function mu(t) {
  var e, n, r = t.length, i, o, s = new Array(r), l = new Array(r), a = 1 / 0, h = 1 / 0, u = -1 / 0, p = -1 / 0;
  for (n = 0; n < r; ++n)
    isNaN(i = +this._x.call(null, e = t[n])) || isNaN(o = +this._y.call(null, e)) || (s[n] = i, l[n] = o, i < a && (a = i), i > u && (u = i), o < h && (h = o), o > p && (p = o));
  if (a > u || h > p) return this;
  for (this.cover(a, h).cover(u, p), n = 0; n < r; ++n)
    Ci(this, s[n], l[n], t[n]);
  return this;
}
function wu(t, e) {
  if (isNaN(t = +t) || isNaN(e = +e)) return this;
  var n = this._x0, r = this._y0, i = this._x1, o = this._y1;
  if (isNaN(n))
    i = (n = Math.floor(t)) + 1, o = (r = Math.floor(e)) + 1;
  else {
    for (var s = i - n || 1, l = this._root, a, h; n > t || t >= i || r > e || e >= o; )
      switch (h = (e < r) << 1 | t < n, a = new Array(4), a[h] = l, l = a, s *= 2, h) {
        case 0:
          i = n + s, o = r + s;
          break;
        case 1:
          n = i - s, o = r + s;
          break;
        case 2:
          i = n + s, r = o - s;
          break;
        case 3:
          n = i - s, r = o - s;
          break;
      }
    this._root && this._root.length && (this._root = l);
  }
  return this._x0 = n, this._y0 = r, this._x1 = i, this._y1 = o, this;
}
function yu() {
  var t = [];
  return this.visit(function(e) {
    if (!e.length) do
      t.push(e.data);
    while (e = e.next);
  }), t;
}
function vu(t) {
  return arguments.length ? this.cover(+t[0][0], +t[0][1]).cover(+t[1][0], +t[1][1]) : isNaN(this._x0) ? void 0 : [[this._x0, this._y0], [this._x1, this._y1]];
}
function pe(t, e, n, r, i) {
  this.node = t, this.x0 = e, this.y0 = n, this.x1 = r, this.y1 = i;
}
function bu(t, e, n) {
  var r, i = this._x0, o = this._y0, s, l, a, h, u = this._x1, p = this._y1, f = [], m = this._root, y, S;
  for (m && f.push(new pe(m, i, o, u, p)), n == null ? n = 1 / 0 : (i = t - n, o = e - n, u = t + n, p = e + n, n *= n); y = f.pop(); )
    if (!(!(m = y.node) || (s = y.x0) > u || (l = y.y0) > p || (a = y.x1) < i || (h = y.y1) < o))
      if (m.length) {
        var b = (s + a) / 2, d = (l + h) / 2;
        f.push(
          new pe(m[3], b, d, a, h),
          new pe(m[2], s, d, b, h),
          new pe(m[1], b, l, a, d),
          new pe(m[0], s, l, b, d)
        ), (S = (e >= d) << 1 | t >= b) && (y = f[f.length - 1], f[f.length - 1] = f[f.length - 1 - S], f[f.length - 1 - S] = y);
      } else {
        var k = t - +this._x.call(null, m.data), R = e - +this._y.call(null, m.data), v = k * k + R * R;
        if (v < n) {
          var N = Math.sqrt(n = v);
          i = t - N, o = e - N, u = t + N, p = e + N, r = m.data;
        }
      }
  return r;
}
function _u(t) {
  if (isNaN(u = +this._x.call(null, t)) || isNaN(p = +this._y.call(null, t))) return this;
  var e, n = this._root, r, i, o, s = this._x0, l = this._y0, a = this._x1, h = this._y1, u, p, f, m, y, S, b, d;
  if (!n) return this;
  if (n.length) for (; ; ) {
    if ((y = u >= (f = (s + a) / 2)) ? s = f : a = f, (S = p >= (m = (l + h) / 2)) ? l = m : h = m, e = n, !(n = n[b = S << 1 | y])) return this;
    if (!n.length) break;
    (e[b + 1 & 3] || e[b + 2 & 3] || e[b + 3 & 3]) && (r = e, d = b);
  }
  for (; n.data !== t; ) if (i = n, !(n = n.next)) return this;
  return (o = n.next) && delete n.next, i ? (o ? i.next = o : delete i.next, this) : e ? (o ? e[b] = o : delete e[b], (n = e[0] || e[1] || e[2] || e[3]) && n === (e[3] || e[2] || e[1] || e[0]) && !n.length && (r ? r[d] = n : this._root = n), this) : (this._root = o, this);
}
function xu(t) {
  for (var e = 0, n = t.length; e < n; ++e) this.remove(t[e]);
  return this;
}
function Eu() {
  return this._root;
}
function Su() {
  var t = 0;
  return this.visit(function(e) {
    if (!e.length) do
      ++t;
    while (e = e.next);
  }), t;
}
function ku(t) {
  var e = [], n, r = this._root, i, o, s, l, a;
  for (r && e.push(new pe(r, this._x0, this._y0, this._x1, this._y1)); n = e.pop(); )
    if (!t(r = n.node, o = n.x0, s = n.y0, l = n.x1, a = n.y1) && r.length) {
      var h = (o + l) / 2, u = (s + a) / 2;
      (i = r[3]) && e.push(new pe(i, h, u, l, a)), (i = r[2]) && e.push(new pe(i, o, u, h, a)), (i = r[1]) && e.push(new pe(i, h, s, l, u)), (i = r[0]) && e.push(new pe(i, o, s, h, u));
    }
  return this;
}
function Mu(t) {
  var e = [], n = [], r;
  for (this._root && e.push(new pe(this._root, this._x0, this._y0, this._x1, this._y1)); r = e.pop(); ) {
    var i = r.node;
    if (i.length) {
      var o, s = r.x0, l = r.y0, a = r.x1, h = r.y1, u = (s + a) / 2, p = (l + h) / 2;
      (o = i[0]) && e.push(new pe(o, s, l, u, p)), (o = i[1]) && e.push(new pe(o, u, l, a, p)), (o = i[2]) && e.push(new pe(o, s, p, u, h)), (o = i[3]) && e.push(new pe(o, u, p, a, h));
    }
    n.push(r);
  }
  for (; r = n.pop(); )
    t(r.node, r.x0, r.y0, r.x1, r.y1);
  return this;
}
function Nu(t) {
  return t[0];
}
function Tu(t) {
  return arguments.length ? (this._x = t, this) : this._x;
}
function Lu(t) {
  return t[1];
}
function Ru(t) {
  return arguments.length ? (this._y = t, this) : this._y;
}
function Ii(t, e, n) {
  var r = new tr(e ?? Nu, n ?? Lu, NaN, NaN, NaN, NaN);
  return t == null ? r : r.addAll(t);
}
function tr(t, e, n, r, i, o) {
  this._x = t, this._y = e, this._x0 = n, this._y0 = r, this._x1 = i, this._y1 = o, this._root = void 0;
}
function jr(t) {
  for (var e = { data: t.data }, n = e; t = t.next; ) n = n.next = { data: t.data };
  return e;
}
var me = Ii.prototype = tr.prototype;
me.copy = function() {
  var t = new tr(this._x, this._y, this._x0, this._y0, this._x1, this._y1), e = this._root, n, r;
  if (!e) return t;
  if (!e.length) return t._root = jr(e), t;
  for (n = [{ source: e, target: t._root = new Array(4) }]; e = n.pop(); )
    for (var i = 0; i < 4; ++i)
      (r = e.source[i]) && (r.length ? n.push({ source: r, target: e.target[i] = new Array(4) }) : e.target[i] = jr(r));
  return t;
};
me.add = gu;
me.addAll = mu;
me.cover = wu;
me.data = yu;
me.extent = vu;
me.find = bu;
me.remove = _u;
me.removeAll = xu;
me.root = Eu;
me.size = Su;
me.visit = ku;
me.visitAfter = Mu;
me.x = Tu;
me.y = Ru;
function Se(t) {
  return function() {
    return t;
  };
}
function st(t) {
  return (t() - 0.5) * 1e-6;
}
function Cu(t) {
  return t.index;
}
function Vr(t, e) {
  var n = t.get(e);
  if (!n) throw new Error("node not found: " + e);
  return n;
}
function Iu(t) {
  var e = Cu, n = p, r, i = Se(30), o, s, l, a, h, u = 1;
  t == null && (t = []);
  function p(b) {
    return 1 / Math.min(l[b.source.index], l[b.target.index]);
  }
  function f(b) {
    for (var d = 0, k = t.length; d < u; ++d)
      for (var R = 0, v, N, I, P, F, V, q; R < k; ++R)
        v = t[R], N = v.source, I = v.target, P = I.x + I.vx - N.x - N.vx || st(h), F = I.y + I.vy - N.y - N.vy || st(h), V = Math.sqrt(P * P + F * F), V = (V - o[R]) / V * b * r[R], P *= V, F *= V, I.vx -= P * (q = a[R]), I.vy -= F * q, N.vx += P * (q = 1 - q), N.vy += F * q;
  }
  function m() {
    if (s) {
      var b, d = s.length, k = t.length, R = new Map(s.map((N, I) => [e(N, I, s), N])), v;
      for (b = 0, l = new Array(d); b < k; ++b)
        v = t[b], v.index = b, typeof v.source != "object" && (v.source = Vr(R, v.source)), typeof v.target != "object" && (v.target = Vr(R, v.target)), l[v.source.index] = (l[v.source.index] || 0) + 1, l[v.target.index] = (l[v.target.index] || 0) + 1;
      for (b = 0, a = new Array(k); b < k; ++b)
        v = t[b], a[b] = l[v.source.index] / (l[v.source.index] + l[v.target.index]);
      r = new Array(k), y(), o = new Array(k), S();
    }
  }
  function y() {
    if (s)
      for (var b = 0, d = t.length; b < d; ++b)
        r[b] = +n(t[b], b, t);
  }
  function S() {
    if (s)
      for (var b = 0, d = t.length; b < d; ++b)
        o[b] = +i(t[b], b, t);
  }
  return f.initialize = function(b, d) {
    s = b, h = d, m();
  }, f.links = function(b) {
    return arguments.length ? (t = b, m(), f) : t;
  }, f.id = function(b) {
    return arguments.length ? (e = b, f) : e;
  }, f.iterations = function(b) {
    return arguments.length ? (u = +b, f) : u;
  }, f.strength = function(b) {
    return arguments.length ? (n = typeof b == "function" ? b : Se(+b), y(), f) : n;
  }, f.distance = function(b) {
    return arguments.length ? (i = typeof b == "function" ? b : Se(+b), S(), f) : i;
  }, f;
}
const Pu = 1664525, Ou = 1013904223, Dr = 4294967296;
function $u() {
  let t = 1;
  return () => (t = (Pu * t + Ou) % Dr) / Dr;
}
function zu(t) {
  return t.x;
}
function Au(t) {
  return t.y;
}
var Bu = 10, Fu = Math.PI * (3 - Math.sqrt(5));
function Gu(t) {
  var e, n = 1, r = 1e-3, i = 1 - Math.pow(r, 1 / 300), o = 0, s = 0.6, l = /* @__PURE__ */ new Map(), a = Jn(p), h = Ct("tick", "end"), u = $u();
  t == null && (t = []);
  function p() {
    f(), h.call("tick", e), n < r && (a.stop(), h.call("end", e));
  }
  function f(S) {
    var b, d = t.length, k;
    S === void 0 && (S = 1);
    for (var R = 0; R < S; ++R)
      for (n += (o - n) * i, l.forEach(function(v) {
        v(n);
      }), b = 0; b < d; ++b)
        k = t[b], k.fx == null ? k.x += k.vx *= s : (k.x = k.fx, k.vx = 0), k.fy == null ? k.y += k.vy *= s : (k.y = k.fy, k.vy = 0);
    return e;
  }
  function m() {
    for (var S = 0, b = t.length, d; S < b; ++S) {
      if (d = t[S], d.index = S, d.fx != null && (d.x = d.fx), d.fy != null && (d.y = d.fy), isNaN(d.x) || isNaN(d.y)) {
        var k = Bu * Math.sqrt(0.5 + S), R = S * Fu;
        d.x = k * Math.cos(R), d.y = k * Math.sin(R);
      }
      (isNaN(d.vx) || isNaN(d.vy)) && (d.vx = d.vy = 0);
    }
  }
  function y(S) {
    return S.initialize && S.initialize(t, u), S;
  }
  return m(), e = {
    tick: f,
    restart: function() {
      return a.restart(p), e;
    },
    stop: function() {
      return a.stop(), e;
    },
    nodes: function(S) {
      return arguments.length ? (t = S, m(), l.forEach(y), e) : t;
    },
    alpha: function(S) {
      return arguments.length ? (n = +S, e) : n;
    },
    alphaMin: function(S) {
      return arguments.length ? (r = +S, e) : r;
    },
    alphaDecay: function(S) {
      return arguments.length ? (i = +S, e) : +i;
    },
    alphaTarget: function(S) {
      return arguments.length ? (o = +S, e) : o;
    },
    velocityDecay: function(S) {
      return arguments.length ? (s = 1 - S, e) : 1 - s;
    },
    randomSource: function(S) {
      return arguments.length ? (u = S, l.forEach(y), e) : u;
    },
    force: function(S, b) {
      return arguments.length > 1 ? (b == null ? l.delete(S) : l.set(S, y(b)), e) : l.get(S);
    },
    find: function(S, b, d) {
      var k = 0, R = t.length, v, N, I, P, F;
      for (d == null ? d = 1 / 0 : d *= d, k = 0; k < R; ++k)
        P = t[k], v = S - P.x, N = b - P.y, I = v * v + N * N, I < d && (F = P, d = I);
      return F;
    },
    on: function(S, b) {
      return arguments.length > 1 ? (h.on(S, b), e) : h.on(S);
    }
  };
}
function ju() {
  var t, e, n, r, i = Se(-30), o, s = 1, l = 1 / 0, a = 0.81;
  function h(m) {
    var y, S = t.length, b = Ii(t, zu, Au).visitAfter(p);
    for (r = m, y = 0; y < S; ++y) e = t[y], b.visit(f);
  }
  function u() {
    if (t) {
      var m, y = t.length, S;
      for (o = new Array(y), m = 0; m < y; ++m) S = t[m], o[S.index] = +i(S, m, t);
    }
  }
  function p(m) {
    var y = 0, S, b, d = 0, k, R, v;
    if (m.length) {
      for (k = R = v = 0; v < 4; ++v)
        (S = m[v]) && (b = Math.abs(S.value)) && (y += S.value, d += b, k += b * S.x, R += b * S.y);
      m.x = k / d, m.y = R / d;
    } else {
      S = m, S.x = S.data.x, S.y = S.data.y;
      do
        y += o[S.data.index];
      while (S = S.next);
    }
    m.value = y;
  }
  function f(m, y, S, b) {
    if (!m.value) return !0;
    var d = m.x - e.x, k = m.y - e.y, R = b - y, v = d * d + k * k;
    if (R * R / a < v)
      return v < l && (d === 0 && (d = st(n), v += d * d), k === 0 && (k = st(n), v += k * k), v < s && (v = Math.sqrt(s * v)), e.vx += d * m.value * r / v, e.vy += k * m.value * r / v), !0;
    if (m.length || v >= l) return;
    (m.data !== e || m.next) && (d === 0 && (d = st(n), v += d * d), k === 0 && (k = st(n), v += k * k), v < s && (v = Math.sqrt(s * v)));
    do
      m.data !== e && (R = o[m.data.index] * r / v, e.vx += d * R, e.vy += k * R);
    while (m = m.next);
  }
  return h.initialize = function(m, y) {
    t = m, n = y, u();
  }, h.strength = function(m) {
    return arguments.length ? (i = typeof m == "function" ? m : Se(+m), u(), h) : i;
  }, h.distanceMin = function(m) {
    return arguments.length ? (s = m * m, h) : Math.sqrt(s);
  }, h.distanceMax = function(m) {
    return arguments.length ? (l = m * m, h) : Math.sqrt(l);
  }, h.theta = function(m) {
    return arguments.length ? (a = m * m, h) : Math.sqrt(a);
  }, h;
}
function Vu(t) {
  var e = Se(0.1), n, r, i;
  typeof t != "function" && (t = Se(t == null ? 0 : +t));
  function o(l) {
    for (var a = 0, h = n.length, u; a < h; ++a)
      u = n[a], u.vx += (i[a] - u.x) * r[a] * l;
  }
  function s() {
    if (n) {
      var l, a = n.length;
      for (r = new Array(a), i = new Array(a), l = 0; l < a; ++l)
        r[l] = isNaN(i[l] = +t(n[l], l, n)) ? 0 : +e(n[l], l, n);
    }
  }
  return o.initialize = function(l) {
    n = l, s();
  }, o.strength = function(l) {
    return arguments.length ? (e = typeof l == "function" ? l : Se(+l), s(), o) : e;
  }, o.x = function(l) {
    return arguments.length ? (t = typeof l == "function" ? l : Se(+l), s(), o) : t;
  }, o;
}
function Du(t) {
  var e = Se(0.1), n, r, i;
  typeof t != "function" && (t = Se(t == null ? 0 : +t));
  function o(l) {
    for (var a = 0, h = n.length, u; a < h; ++a)
      u = n[a], u.vy += (i[a] - u.y) * r[a] * l;
  }
  function s() {
    if (n) {
      var l, a = n.length;
      for (r = new Array(a), i = new Array(a), l = 0; l < a; ++l)
        r[l] = isNaN(i[l] = +t(n[l], l, n)) ? 0 : +e(n[l], l, n);
    }
  }
  return o.initialize = function(l) {
    n = l, s();
  }, o.strength = function(l) {
    return arguments.length ? (e = typeof l == "function" ? l : Se(+l), s(), o) : e;
  }, o.y = function(l) {
    return arguments.length ? (t = typeof l == "function" ? l : Se(+l), s(), o) : t;
  }, o;
}
function be(t) {
  return function() {
    return t;
  };
}
const qr = Math.abs, ce = Math.atan2, Ye = Math.cos, qu = Math.max, Tn = Math.min, Oe = Math.sin, lt = Math.sqrt, ve = 1e-12, Lt = Math.PI, dn = Lt / 2, Hu = 2 * Lt;
function Uu(t) {
  return t > 1 ? 0 : t < -1 ? Lt : Math.acos(t);
}
function Hr(t) {
  return t >= 1 ? dn : t <= -1 ? -dn : Math.asin(t);
}
function Pi(t) {
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
  }, () => new pu(e);
}
function Wu(t) {
  return t.innerRadius;
}
function Xu(t) {
  return t.outerRadius;
}
function Yu(t) {
  return t.startAngle;
}
function Qu(t) {
  return t.endAngle;
}
function Zu(t) {
  return t && t.padAngle;
}
function Ju(t, e, n, r, i, o, s, l) {
  var a = n - t, h = r - e, u = s - i, p = l - o, f = p * a - u * h;
  if (!(f * f < ve))
    return f = (u * (e - o) - p * (t - i)) / f, [t + f * a, e + f * h];
}
function Ut(t, e, n, r, i, o, s) {
  var l = t - n, a = e - r, h = (s ? o : -o) / lt(l * l + a * a), u = h * a, p = -h * l, f = t + u, m = e + p, y = n + u, S = r + p, b = (f + y) / 2, d = (m + S) / 2, k = y - f, R = S - m, v = k * k + R * R, N = i - o, I = f * S - y * m, P = (R < 0 ? -1 : 1) * lt(qu(0, N * N * v - I * I)), F = (I * R - k * P) / v, V = (-I * k - R * P) / v, q = (I * R + k * P) / v, H = (-I * k + R * P) / v, J = F - b, z = V - d, E = q - b, C = H - d;
  return J * J + z * z > E * E + C * C && (F = q, V = H), {
    cx: F,
    cy: V,
    x01: -u,
    y01: -p,
    x11: F * (i / N - 1),
    y11: V * (i / N - 1)
  };
}
function Ku() {
  var t = Wu, e = Xu, n = be(0), r = null, i = Yu, o = Qu, s = Zu, l = null, a = Pi(h);
  function h() {
    var u, p, f = +t.apply(this, arguments), m = +e.apply(this, arguments), y = i.apply(this, arguments) - dn, S = o.apply(this, arguments) - dn, b = qr(S - y), d = S > y;
    if (l || (l = u = a()), m < f && (p = m, m = f, f = p), !(m > ve)) l.moveTo(0, 0);
    else if (b > Hu - ve)
      l.moveTo(m * Ye(y), m * Oe(y)), l.arc(0, 0, m, y, S, !d), f > ve && (l.moveTo(f * Ye(S), f * Oe(S)), l.arc(0, 0, f, S, y, d));
    else {
      var k = y, R = S, v = y, N = S, I = b, P = b, F = s.apply(this, arguments) / 2, V = F > ve && (r ? +r.apply(this, arguments) : lt(f * f + m * m)), q = Tn(qr(m - f) / 2, +n.apply(this, arguments)), H = q, J = q, z, E;
      if (V > ve) {
        var C = Hr(V / f * Oe(F)), T = Hr(V / m * Oe(F));
        (I -= C * 2) > ve ? (C *= d ? 1 : -1, v += C, N -= C) : (I = 0, v = N = (y + S) / 2), (P -= T * 2) > ve ? (T *= d ? 1 : -1, k += T, R -= T) : (P = 0, k = R = (y + S) / 2);
      }
      var O = m * Ye(k), $ = m * Oe(k), G = f * Ye(N), B = f * Oe(N);
      if (q > ve) {
        var W = m * Ye(R), K = m * Oe(R), le = f * Ye(v), te = f * Oe(v), ne;
        if (b < Lt)
          if (ne = Ju(O, $, le, te, W, K, G, B)) {
            var ae = O - ne[0], oe = $ - ne[1], ue = W - ne[0], Me = K - ne[1], We = 1 / Oe(Uu((ae * ue + oe * Me) / (lt(ae * ae + oe * oe) * lt(ue * ue + Me * Me))) / 2), Xe = lt(ne[0] * ne[0] + ne[1] * ne[1]);
            H = Tn(q, (f - Xe) / (We - 1)), J = Tn(q, (m - Xe) / (We + 1));
          } else
            H = J = 0;
      }
      P > ve ? J > ve ? (z = Ut(le, te, O, $, m, J, d), E = Ut(W, K, G, B, m, J, d), l.moveTo(z.cx + z.x01, z.cy + z.y01), J < q ? l.arc(z.cx, z.cy, J, ce(z.y01, z.x01), ce(E.y01, E.x01), !d) : (l.arc(z.cx, z.cy, J, ce(z.y01, z.x01), ce(z.y11, z.x11), !d), l.arc(0, 0, m, ce(z.cy + z.y11, z.cx + z.x11), ce(E.cy + E.y11, E.cx + E.x11), !d), l.arc(E.cx, E.cy, J, ce(E.y11, E.x11), ce(E.y01, E.x01), !d))) : (l.moveTo(O, $), l.arc(0, 0, m, k, R, !d)) : l.moveTo(O, $), !(f > ve) || !(I > ve) ? l.lineTo(G, B) : H > ve ? (z = Ut(G, B, W, K, f, -H, d), E = Ut(O, $, le, te, f, -H, d), l.lineTo(z.cx + z.x01, z.cy + z.y01), H < q ? l.arc(z.cx, z.cy, H, ce(z.y01, z.x01), ce(E.y01, E.x01), !d) : (l.arc(z.cx, z.cy, H, ce(z.y01, z.x01), ce(z.y11, z.x11), !d), l.arc(0, 0, f, ce(z.cy + z.y11, z.cx + z.x11), ce(E.cy + E.y11, E.cx + E.x11), d), l.arc(E.cx, E.cy, H, ce(E.y11, E.x11), ce(E.y01, E.x01), !d))) : l.arc(0, 0, f, N, v, d);
    }
    if (l.closePath(), u) return l = null, u + "" || null;
  }
  return h.centroid = function() {
    var u = (+t.apply(this, arguments) + +e.apply(this, arguments)) / 2, p = (+i.apply(this, arguments) + +o.apply(this, arguments)) / 2 - Lt / 2;
    return [Ye(p) * u, Oe(p) * u];
  }, h.innerRadius = function(u) {
    return arguments.length ? (t = typeof u == "function" ? u : be(+u), h) : t;
  }, h.outerRadius = function(u) {
    return arguments.length ? (e = typeof u == "function" ? u : be(+u), h) : e;
  }, h.cornerRadius = function(u) {
    return arguments.length ? (n = typeof u == "function" ? u : be(+u), h) : n;
  }, h.padRadius = function(u) {
    return arguments.length ? (r = u == null ? null : typeof u == "function" ? u : be(+u), h) : r;
  }, h.startAngle = function(u) {
    return arguments.length ? (i = typeof u == "function" ? u : be(+u), h) : i;
  }, h.endAngle = function(u) {
    return arguments.length ? (o = typeof u == "function" ? u : be(+u), h) : o;
  }, h.padAngle = function(u) {
    return arguments.length ? (s = typeof u == "function" ? u : be(+u), h) : s;
  }, h.context = function(u) {
    return arguments.length ? (l = u ?? null, h) : l;
  }, h;
}
function eh(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function Oi(t) {
  this._context = t;
}
Oi.prototype = {
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
function th(t) {
  return new Oi(t);
}
function nh(t) {
  return t[0];
}
function rh(t) {
  return t[1];
}
function ih(t, e) {
  var n = be(!0), r = null, i = th, o = null, s = Pi(l);
  t = typeof t == "function" ? t : t === void 0 ? nh : be(t), e = typeof e == "function" ? e : e === void 0 ? rh : be(e);
  function l(a) {
    var h, u = (a = eh(a)).length, p, f = !1, m;
    for (r == null && (o = i(m = s())), h = 0; h <= u; ++h)
      !(h < u && n(p = a[h], h, a)) === f && ((f = !f) ? o.lineStart() : o.lineEnd()), f && o.point(+t(p, h, a), +e(p, h, a));
    if (m) return o = null, m + "" || null;
  }
  return l.x = function(a) {
    return arguments.length ? (t = typeof a == "function" ? a : be(+a), l) : t;
  }, l.y = function(a) {
    return arguments.length ? (e = typeof a == "function" ? a : be(+a), l) : e;
  }, l.defined = function(a) {
    return arguments.length ? (n = typeof a == "function" ? a : be(!!a), l) : n;
  }, l.curve = function(a) {
    return arguments.length ? (i = a, r != null && (o = i(r)), l) : i;
  }, l.context = function(a) {
    return arguments.length ? (a == null ? r = o = null : o = i(r = a), l) : r;
  }, l;
}
const Wt = (t) => () => t;
function oh(t, {
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
var nr = new Ge(1, 0, 0);
Ge.prototype;
function Ln(t) {
  t.stopImmediatePropagation();
}
function vt(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function sh(t) {
  return (!t.ctrlKey || t.type === "wheel") && !t.button;
}
function lh() {
  var t = this;
  return t instanceof SVGElement ? (t = t.ownerSVGElement || t, t.hasAttribute("viewBox") ? (t = t.viewBox.baseVal, [[t.x, t.y], [t.x + t.width, t.y + t.height]]) : [[0, 0], [t.width.baseVal.value, t.height.baseVal.value]]) : [[0, 0], [t.clientWidth, t.clientHeight]];
}
function Ur() {
  return this.__zoom || nr;
}
function ah(t) {
  return -t.deltaY * (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 2e-3) * (t.ctrlKey ? 10 : 1);
}
function uh() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function hh(t, e, n) {
  var r = t.invertX(e[0][0]) - n[0][0], i = t.invertX(e[1][0]) - n[1][0], o = t.invertY(e[0][1]) - n[0][1], s = t.invertY(e[1][1]) - n[1][1];
  return t.translate(
    i > r ? (r + i) / 2 : Math.min(0, r) || Math.max(0, i),
    s > o ? (o + s) / 2 : Math.min(0, o) || Math.max(0, s)
  );
}
function ch() {
  var t = sh, e = lh, n = hh, r = ah, i = uh, o = [0, 1 / 0], s = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], l = 250, a = ea, h = Ct("start", "zoom", "end"), u, p, f, m = 500, y = 150, S = 0, b = 10;
  function d(E) {
    E.property("__zoom", Ur).on("wheel.zoom", F, { passive: !1 }).on("mousedown.zoom", V).on("dblclick.zoom", q).filter(i).on("touchstart.zoom", H).on("touchmove.zoom", J).on("touchend.zoom touchcancel.zoom", z).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  d.transform = function(E, C, T, O) {
    var $ = E.selection ? E.selection() : E;
    $.property("__zoom", Ur), E !== $ ? N(E, C, T, O) : $.interrupt().each(function() {
      I(this, arguments).event(O).start().zoom(null, typeof C == "function" ? C.apply(this, arguments) : C).end();
    });
  }, d.scaleBy = function(E, C, T, O) {
    d.scaleTo(E, function() {
      var $ = this.__zoom.k, G = typeof C == "function" ? C.apply(this, arguments) : C;
      return $ * G;
    }, T, O);
  }, d.scaleTo = function(E, C, T, O) {
    d.transform(E, function() {
      var $ = e.apply(this, arguments), G = this.__zoom, B = T == null ? v($) : typeof T == "function" ? T.apply(this, arguments) : T, W = G.invert(B), K = typeof C == "function" ? C.apply(this, arguments) : C;
      return n(R(k(G, K), B, W), $, s);
    }, T, O);
  }, d.translateBy = function(E, C, T, O) {
    d.transform(E, function() {
      return n(this.__zoom.translate(
        typeof C == "function" ? C.apply(this, arguments) : C,
        typeof T == "function" ? T.apply(this, arguments) : T
      ), e.apply(this, arguments), s);
    }, null, O);
  }, d.translateTo = function(E, C, T, O, $) {
    d.transform(E, function() {
      var G = e.apply(this, arguments), B = this.__zoom, W = O == null ? v(G) : typeof O == "function" ? O.apply(this, arguments) : O;
      return n(nr.translate(W[0], W[1]).scale(B.k).translate(
        typeof C == "function" ? -C.apply(this, arguments) : -C,
        typeof T == "function" ? -T.apply(this, arguments) : -T
      ), G, s);
    }, O, $);
  };
  function k(E, C) {
    return C = Math.max(o[0], Math.min(o[1], C)), C === E.k ? E : new Ge(C, E.x, E.y);
  }
  function R(E, C, T) {
    var O = C[0] - T[0] * E.k, $ = C[1] - T[1] * E.k;
    return O === E.x && $ === E.y ? E : new Ge(E.k, O, $);
  }
  function v(E) {
    return [(+E[0][0] + +E[1][0]) / 2, (+E[0][1] + +E[1][1]) / 2];
  }
  function N(E, C, T, O) {
    E.on("start.zoom", function() {
      I(this, arguments).event(O).start();
    }).on("interrupt.zoom end.zoom", function() {
      I(this, arguments).event(O).end();
    }).tween("zoom", function() {
      var $ = this, G = arguments, B = I($, G).event(O), W = e.apply($, G), K = T == null ? v(W) : typeof T == "function" ? T.apply($, G) : T, le = Math.max(W[1][0] - W[0][0], W[1][1] - W[0][1]), te = $.__zoom, ne = typeof C == "function" ? C.apply($, G) : C, ae = a(te.invert(K).concat(le / te.k), ne.invert(K).concat(le / ne.k));
      return function(oe) {
        if (oe === 1) oe = ne;
        else {
          var ue = ae(oe), Me = le / ue[2];
          oe = new Ge(Me, K[0] - ue[0] * Me, K[1] - ue[1] * Me);
        }
        B.zoom(null, oe);
      };
    });
  }
  function I(E, C, T) {
    return !T && E.__zooming || new P(E, C);
  }
  function P(E, C) {
    this.that = E, this.args = C, this.active = 0, this.sourceEvent = null, this.extent = e.apply(E, C), this.taps = 0;
  }
  P.prototype = {
    event: function(E) {
      return E && (this.sourceEvent = E), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(E, C) {
      return this.mouse && E !== "mouse" && (this.mouse[1] = C.invert(this.mouse[0])), this.touch0 && E !== "touch" && (this.touch0[1] = C.invert(this.touch0[0])), this.touch1 && E !== "touch" && (this.touch1[1] = C.invert(this.touch1[0])), this.that.__zoom = C, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(E) {
      var C = Y(this.that).datum();
      h.call(
        E,
        this.that,
        new oh(E, {
          sourceEvent: this.sourceEvent,
          target: d,
          transform: this.that.__zoom,
          dispatch: h
        }),
        C
      );
    }
  };
  function F(E, ...C) {
    if (!t.apply(this, arguments)) return;
    var T = I(this, C).event(E), O = this.__zoom, $ = Math.max(o[0], Math.min(o[1], O.k * Math.pow(2, r.apply(this, arguments)))), G = Ne(E);
    if (T.wheel)
      (T.mouse[0][0] !== G[0] || T.mouse[0][1] !== G[1]) && (T.mouse[1] = O.invert(T.mouse[0] = G)), clearTimeout(T.wheel);
    else {
      if (O.k === $) return;
      T.mouse = [G, O.invert(G)], rn(this), T.start();
    }
    vt(E), T.wheel = setTimeout(B, y), T.zoom("mouse", n(R(k(O, $), T.mouse[0], T.mouse[1]), T.extent, s));
    function B() {
      T.wheel = null, T.end();
    }
  }
  function V(E, ...C) {
    if (f || !t.apply(this, arguments)) return;
    var T = E.currentTarget, O = I(this, C, !0).event(E), $ = Y(E.view).on("mousemove.zoom", K, !0).on("mouseup.zoom", le, !0), G = Ne(E, T), B = E.clientX, W = E.clientY;
    mi(E.view), Ln(E), O.mouse = [G, this.__zoom.invert(G)], rn(this), O.start();
    function K(te) {
      if (vt(te), !O.moved) {
        var ne = te.clientX - B, ae = te.clientY - W;
        O.moved = ne * ne + ae * ae > S;
      }
      O.event(te).zoom("mouse", n(R(O.that.__zoom, O.mouse[0] = Ne(te, T), O.mouse[1]), O.extent, s));
    }
    function le(te) {
      $.on("mousemove.zoom mouseup.zoom", null), wi(te.view, O.moved), vt(te), O.event(te).end();
    }
  }
  function q(E, ...C) {
    if (t.apply(this, arguments)) {
      var T = this.__zoom, O = Ne(E.changedTouches ? E.changedTouches[0] : E, this), $ = T.invert(O), G = T.k * (E.shiftKey ? 0.5 : 2), B = n(R(k(T, G), O, $), e.apply(this, C), s);
      vt(E), l > 0 ? Y(this).transition().duration(l).call(N, B, O, E) : Y(this).call(d.transform, B, O, E);
    }
  }
  function H(E, ...C) {
    if (t.apply(this, arguments)) {
      var T = E.touches, O = T.length, $ = I(this, C, E.changedTouches.length === O).event(E), G, B, W, K;
      for (Ln(E), B = 0; B < O; ++B)
        W = T[B], K = Ne(W, this), K = [K, this.__zoom.invert(K), W.identifier], $.touch0 ? !$.touch1 && $.touch0[2] !== K[2] && ($.touch1 = K, $.taps = 0) : ($.touch0 = K, G = !0, $.taps = 1 + !!u);
      u && (u = clearTimeout(u)), G && ($.taps < 2 && (p = K[0], u = setTimeout(function() {
        u = null;
      }, m)), rn(this), $.start());
    }
  }
  function J(E, ...C) {
    if (this.__zooming) {
      var T = I(this, C).event(E), O = E.changedTouches, $ = O.length, G, B, W, K;
      for (vt(E), G = 0; G < $; ++G)
        B = O[G], W = Ne(B, this), T.touch0 && T.touch0[2] === B.identifier ? T.touch0[0] = W : T.touch1 && T.touch1[2] === B.identifier && (T.touch1[0] = W);
      if (B = T.that.__zoom, T.touch1) {
        var le = T.touch0[0], te = T.touch0[1], ne = T.touch1[0], ae = T.touch1[1], oe = (oe = ne[0] - le[0]) * oe + (oe = ne[1] - le[1]) * oe, ue = (ue = ae[0] - te[0]) * ue + (ue = ae[1] - te[1]) * ue;
        B = k(B, Math.sqrt(oe / ue)), W = [(le[0] + ne[0]) / 2, (le[1] + ne[1]) / 2], K = [(te[0] + ae[0]) / 2, (te[1] + ae[1]) / 2];
      } else if (T.touch0) W = T.touch0[0], K = T.touch0[1];
      else return;
      T.zoom("touch", n(R(B, W, K), T.extent, s));
    }
  }
  function z(E, ...C) {
    if (this.__zooming) {
      var T = I(this, C).event(E), O = E.changedTouches, $ = O.length, G, B;
      for (Ln(E), f && clearTimeout(f), f = setTimeout(function() {
        f = null;
      }, m), G = 0; G < $; ++G)
        B = O[G], T.touch0 && T.touch0[2] === B.identifier ? delete T.touch0 : T.touch1 && T.touch1[2] === B.identifier && delete T.touch1;
      if (T.touch1 && !T.touch0 && (T.touch0 = T.touch1, delete T.touch1), T.touch0) T.touch0[1] = this.__zoom.invert(T.touch0[0]);
      else if (T.end(), T.taps === 2 && (B = Ne(B, this), Math.hypot(p[0] - B[0], p[1] - B[1]) < b)) {
        var W = Y(this).on("dblclick.zoom");
        W && W.apply(this, arguments);
      }
    }
  }
  return d.wheelDelta = function(E) {
    return arguments.length ? (r = typeof E == "function" ? E : Wt(+E), d) : r;
  }, d.filter = function(E) {
    return arguments.length ? (t = typeof E == "function" ? E : Wt(!!E), d) : t;
  }, d.touchable = function(E) {
    return arguments.length ? (i = typeof E == "function" ? E : Wt(!!E), d) : i;
  }, d.extent = function(E) {
    return arguments.length ? (e = typeof E == "function" ? E : Wt([[+E[0][0], +E[0][1]], [+E[1][0], +E[1][1]]]), d) : e;
  }, d.scaleExtent = function(E) {
    return arguments.length ? (o[0] = +E[0], o[1] = +E[1], d) : [o[0], o[1]];
  }, d.translateExtent = function(E) {
    return arguments.length ? (s[0][0] = +E[0][0], s[1][0] = +E[1][0], s[0][1] = +E[0][1], s[1][1] = +E[1][1], d) : [[s[0][0], s[0][1]], [s[1][0], s[1][1]]];
  }, d.constrain = function(E) {
    return arguments.length ? (n = E, d) : n;
  }, d.duration = function(E) {
    return arguments.length ? (l = +E, d) : l;
  }, d.interpolate = function(E) {
    return arguments.length ? (a = E, d) : a;
  }, d.on = function() {
    var E = h.on.apply(h, arguments);
    return E === h ? d : E;
  }, d.clickDistance = function(E) {
    return arguments.length ? (S = (E = +E) * E, d) : Math.sqrt(S);
  }, d.tapDistance = function(E) {
    return arguments.length ? (b = +E, d) : b;
  }, d;
}
function fh(t, e) {
  let n = ch().filter((r) => {
    var i;
    return r.button === 0 || ((i = r.touches) == null ? void 0 : i.length) >= 2;
  });
  return dh(n, t, e);
}
function dh(t, e, n) {
  return n ? t.scaleExtent([0.5, 5]).on("zoom", (r) => e(r, !0)) : t.scaleExtent([1, 1]).on("zoom", (r) => e(r, !1));
}
var A = /* @__PURE__ */ ((t) => (t.CIRCLE = "circle", t.RECTANGLE = "rect", t))(A || {}), Z = /* @__PURE__ */ ((t) => (t.RIGHT = "RIGHT", t.BOTTOMRIGHT = "BOTTOMRIGHT", t.BOTTOM = "BOTTOM", t.BOTTOMLEFT = "BOTTOMLEFT", t.LEFT = "LEFT", t.TOPLEFT = "TOPLEFT", t.TOP = "TOP", t.TOPRIGHT = "TOPRIGHT", t))(Z || {});
class ph {
  constructor() {
    // private _nodeProps: NodeProps = { shape: NodeShape.CIRCLE, radius: 48 }
    re(this, "_nodeProps", {
      shape: A.RECTANGLE,
      width: 128,
      height: 48,
      cornerRadius: 4,
      reflexiveEdgeStart: "MOVABLE"
    });
    re(this, "_nodeGUIEditability", {
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
    re(this, "nodeAutoGrowToLabelSize", !0);
    re(this, "showNodeLabels", !0);
    re(this, "nodePhysicsEnabled", !1);
    re(this, "_linkGUIEditability", {
      deletable: !0,
      labelEditable: !0
    });
    re(this, "showLinkLabels", !0);
    re(this, "fixedLinkDistanceEnabled", !1);
    re(this, "allowNodeCreationViaGUI", !0);
    re(this, "zoomEnabled", !1);
    re(this, "markerBoxSize", 4);
    re(this, "_markerPadding", 2 * this.markerBoxSize);
    re(this, "nodeGroupsFn", () => /* @__PURE__ */ new Set());
  }
  set nodeSize(e) {
    this.nodeProps.shape === A.CIRCLE ? typeof e == "number" ? this.nodeProps.radius = e : this.nodeProps.radius = e.radius ?? 24 : this.nodeProps.shape === A.RECTANGLE && (typeof e == "number" ? (this.nodeProps.width = e, this.nodeProps.height = e) : (this.nodeProps.width = e.width ?? 48, this.nodeProps.height = e.height ?? 48));
  }
  get nodeSize() {
    let e, n, r;
    return this.nodeProps.shape === A.CIRCLE ? (r = this.nodeProps.radius, e = 2 * r, n = 2 * r) : (e = this.nodeProps.width, n = this.nodeProps.height, r = e / 2), {
      width: e,
      height: n,
      radius: r
    };
  }
  set nodeProps(e) {
    e.shape = e.shape ?? this._nodeProps.shape, this._nodeProps = e, e.shape === A.CIRCLE ? this.nodeSize = { radius: e.radius } : e.shape === A.RECTANGLE && (this.nodeSize = { width: e.width, height: e.height }, e.cornerRadius === void 0 && (this._nodeProps.cornerRadius = 4), e.reflexiveEdgeStart === void 0 && (this._nodeProps.reflexiveEdgeStart = "MOVABLE"));
  }
  get nodeProps() {
    return this._nodeProps;
  }
  set nodeGUIEditability(e) {
    this._nodeGUIEditability = {
      ...this._nodeGUIEditability,
      ...e,
      fixedPosition: {
        ...this._nodeGUIEditability.fixedPosition,
        ...e.fixedPosition
      }
    };
  }
  get nodeGUIEditability() {
    return this._nodeGUIEditability;
  }
  set linkGUIEditability(e) {
    this._linkGUIEditability = {
      ...this._linkGUIEditability,
      ...e
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
class pn {
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
  constructor(e, n, r, i, o, s, l, a, h, u, p, f) {
    re(this, "fx");
    re(this, "fy");
    re(this, "_fixedPosition");
    /**
     * @param _renderedSize - The actual size used for rendering the node.
     * By default, this is equal to the size defined in `props`.
     * When nodes are allowed to grow to fit their label size *(`nodeAutoGrowToLabelSize` in `config`)*,
     * `renderedSize` may grow beyond the configured size in `props`.
     */
    re(this, "_renderedSize");
    this.id = e, this.props = n, this.idImported = r, this.x = i, this.y = o, this.label = s, this.color = l, this.deletable = h, this.labelEditable = u, this.allowIncomingLinks = p, this.allowOutgoingLinks = f, this.fixedPosition = a, this._renderedSize = this.getSize();
  }
  set fixedPosition(e) {
    var n, r;
    this._fixedPosition = e, this.fx = (n = this.fixedPosition) != null && n.x ? this.x : void 0, this.fy = (r = this.fixedPosition) != null && r.y ? this.y : void 0;
  }
  get fixedPosition() {
    return this._fixedPosition;
  }
  setShape(e, n) {
    if (e === A.CIRCLE) {
      let r = n.nodeProps.radius ?? 0.5 * this.props.width;
      this.props = {
        shape: A.CIRCLE,
        radius: r
      };
    } else if (e === A.RECTANGLE) {
      let r = n.nodeProps.width ?? 2 * this.props.radius, i = n.nodeProps.height ?? this.props.radius, o = n.nodeProps.cornerRadius ?? 4, s = n.nodeProps.reflexiveEdgeStart ?? "MOVABLE";
      this.props = {
        shape: A.RECTANGLE,
        width: r,
        height: i,
        cornerRadius: o,
        reflexiveEdgeStart: s
      };
    }
  }
  setSize(e, n) {
    this.props.shape === A.CIRCLE ? typeof e == "number" ? this.props.radius = e / 2 : this.props.radius = e.radius ?? n.nodeProps.radius : this.props.shape === A.RECTANGLE && (typeof e == "number" ? (this.props.width = e, this.props.height = e) : (this.props.width = e.width ?? n.nodeProps.width, this.props.height = e.height ?? n.nodeProps.height));
  }
  /**
   * Returns the node's defined base size.
   *
   * If the node is not allowed to grow to fit its label size, this is identical to the
   * rendered size. Otherwise, the rendered size may be larger, and this value
   * represents the minimal size the node can shrink to.
   */
  getSize() {
    return this.props.shape === A.CIRCLE ? { radius: this.props.radius } : { width: this.props.width, height: this.props.height };
  }
  /**
   * Sets the nodes rendered size so it is large enough to fit the given size,
   * but at least as large as the minimal size defined in the node properties.
   *
   * @param size - The required size
   */
  set renderedSize(e) {
    if (this.props.shape === A.CIRCLE) {
      typeof e == "number" && (e = { radius: e / 2 });
      const n = e.radius > this.props.radius ? e.radius : this.props.radius;
      this._renderedSize.radius !== n && (this._renderedSize = { radius: n });
    } else if (this.props.shape === A.RECTANGLE) {
      typeof e == "number" && (e = { width: e, height: e });
      const n = e.width > this.props.width ? e.width : this.props.width, r = e.height > this.props.height ? e.height : this.props.height;
      (this._renderedSize.width !== n || this._renderedSize.height !== r) && (this._renderedSize = { width: n, height: r });
    }
  }
  get renderedSize() {
    return this._renderedSize;
  }
}
var he = /* @__PURE__ */ ((t) => (t.USER_ACTION = "user-action", t.PROGRAMMATIC_ACTION = "programmatic-action", t))(he || {});
function gh(t, e, n) {
  const r = new CustomEvent("nodecreated", {
    detail: {
      node: { id: t.id, label: t.label, x: t.x, y: t.y },
      cause: n
    }
  });
  e.node().dispatchEvent(r);
}
function mh(t, e, n) {
  const r = new CustomEvent("linkcreated", {
    detail: {
      link: { id: t.id, label: t.label },
      cause: n
    }
  });
  e.node().dispatchEvent(r);
}
function wh(t, e, n, r) {
  const i = new CustomEvent("nodeclicked", {
    detail: {
      node: { id: t.id, label: t.label, x: t.x, y: t.y },
      button: e,
      originalEvent: r
    }
  });
  n.node().dispatchEvent(i);
}
function yh(t, e, n, r) {
  const i = new CustomEvent("linkclicked", {
    detail: {
      link: { id: t.id, label: t.label },
      button: e,
      originalEvent: r
    }
  });
  n.node().dispatchEvent(i);
}
function Xt(t, e, n) {
  const r = new CustomEvent("nodedeleted", {
    detail: {
      node: { id: t.id, label: t.label, x: t.x, y: t.y },
      cause: n
    }
  });
  e.node().dispatchEvent(r);
}
function Qe(t, e, n) {
  const r = new CustomEvent("linkdeleted", {
    detail: {
      link: { id: t.id, label: t.label },
      cause: n
    }
  });
  e.node().dispatchEvent(r);
}
function vh(t, e, n) {
  const r = new CustomEvent("labeledited", {
    detail: {
      parent: { id: t.id },
      label: e
    }
  });
  n.node().dispatchEvent(r);
}
function bh(t, e, n) {
  const r = new CustomEvent("noderenderedsizechange", {
    detail: {
      node: { id: t.id, renderedSize: t.renderedSize, baseSize: t.getSize() },
      previousRenderedSize: e
    }
  });
  n.node().dispatchEvent(r);
}
function xe(t) {
  t.preventDefault(), t.stopPropagation();
}
function _h(t, e, n, r, i) {
  return Sl().filter(
    (o, s) => {
      var l, a;
      return o.button === 0 && //left mouse click
      (((l = s.fixedPosition) == null ? void 0 : l.x) !== !0 || ((a = s.fixedPosition) == null ? void 0 : a.y) !== !0);
    }
  ).on("start", (o, s) => {
    var l, a;
    xe(o.sourceEvent), o.active === 0 && t.alphaTarget(0.5).restart(), ((l = s.fixedPosition) == null ? void 0 : l.x) !== !0 && (s.fx = s.x), ((a = s.fixedPosition) == null ? void 0 : a.y) !== !0 && (s.fy = s.y), Rn(r, s, i);
  }).on("drag", (o, s) => {
    var l, a;
    ((l = s.fixedPosition) == null ? void 0 : l.x) !== !0 && (r.isCanvasBoundToView ? s.props.shape === A.CIRCLE ? s.fx = Math.max(
      s.renderedSize.radius,
      Math.min(e - s.renderedSize.radius, o.x)
    ) : s.props.shape === A.RECTANGLE && (s.fx = Math.max(
      0.5 * s.renderedSize.width,
      Math.min(e - 0.5 * s.renderedSize.width, o.x)
    )) : s.fx = o.x), ((a = s.fixedPosition) == null ? void 0 : a.y) !== !0 && (r.isCanvasBoundToView ? s.props.shape === A.CIRCLE ? s.fy = Math.max(
      s.renderedSize.radius,
      Math.min(n - s.renderedSize.radius, o.y)
    ) : s.props.shape === A.RECTANGLE && (s.fy = Math.max(
      0.5 * s.renderedSize.height,
      Math.min(n - 0.5 * s.renderedSize.height, o.y)
    )) : s.fy = o.y), Rn(r, s, i);
  }).on("end", (o, s) => {
    var l, a;
    o.active === 0 && t.alphaTarget(0), ((l = s.fixedPosition) == null ? void 0 : l.x) !== !0 && (s.fx = void 0), ((a = s.fixedPosition) == null ? void 0 : a.y) !== !0 && (s.fy = void 0), Rn(r, s, i);
  });
}
function Rn(t, e, n) {
  const r = t.nodeGroupsFn(e.id), i = n.nodes.filter((o) => r.has(o.id));
  if (e.fx === void 0)
    for (const o of i) {
      const s = o.x - e.x;
      o.fx = e.x + s;
    }
  else
    for (const o of i) {
      const s = o.x - e.x;
      o.fx = e.fx + s;
    }
  if (e.fy === void 0)
    for (const o of i) {
      const s = o.y - e.y;
      o.fy = e.y + s;
    }
  else
    for (const o of i) {
      const s = o.y - e.y;
      o.fy = e.fy + s;
    }
}
function xh(t, e, n, r, i) {
  return t.append("svg").attr("class", "graph-controller__graph-canvas").style("background-color", "white").on("pointermove", (s) => n(s)).on("pointerup", (s) => r(s)).on("contextmenu", (s) => xe(s)).on("dblclick", (s) => i(s)).call(e).on("dblclick.zoom", null).append("g");
}
var Ee = /* @__PURE__ */ ((t) => (t.LINE = "LINE", t.LINEREVERSE = "LINE-REVERSE", t.ARC = "ARC", t.ARCREVERSE = "ARC-REVERSE", t.REFLEXIVE = "REFLEXIVE", t))(Ee || {});
class Eh {
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
  constructor(e, n, r, i, o, s, l) {
    re(this, "id");
    this.source = e, this.target = n, this.pathType = r, this.label = i, this.color = o, this.deletable = s, this.labelEditable = l, this.id = `${e.id}-${n.id}`;
  }
}
function Sh(t) {
  return t.append("g").classed("links", !0).selectAll(".graph-controller__link-container");
}
function kh(t) {
  return t.append("g").classed("nodes", !0).selectAll(".graph-controller__node-container");
}
function Te(t) {
  let e = [], n = [];
  if (!Array.isArray(t))
    typeof t == "number" ? e = [t] : n = [t];
  else {
    let r = t.map(String);
    n = r.filter((i) => i.includes("-")), e = r.filter((i) => !i.includes("-")).map(Number);
  }
  return [e, n];
}
function Yt(t, e) {
  e !== void 0 && (typeof e == "boolean" ? e ? t.fixedPosition = { x: !0, y: !0 } : t.fixedPosition = { x: !1, y: !1 } : He(["x", "y"], Object.keys(e), !0) && (t.fixedPosition = e, xt(["x", "y"], Object.keys(e))));
}
function Mh(t, e, n) {
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
function Rt(t) {
  return t.replace(/([#.,;:<>+~^$|[\]()%\\ ])/g, "\\$1");
}
function Wr(t) {
  let e = t.target;
  e.hasPointerCapture(t.pointerId) && e.releasePointerCapture(t.pointerId);
}
function Nh(t, e, n = 2) {
  const r = Math.abs(t.x - e.x), i = Math.abs(t.y - e.y);
  return r < n && i < n;
}
function xt(t, e, n) {
  let r = !0;
  return e.forEach((i) => {
    t.includes(
      i
      // we actually just check if the type is keyof
    ) || (r = !1, at(
      `Option not valid: ${i}`,
      `Use the following: ${t.join(", ")}.`
    ));
  }), r;
}
function He(t, e, n) {
  let r = !0, i = t.filter((o) => !e.includes(o));
  return i.length > 0 && (r = !1, n && at("Option missing", `Add: ${i}`)), r;
}
function at(t, e) {
  console.error(t + `
` + e);
}
function Th(t, e, n, r) {
  if (Et(t, n, e + "-link-arrow", "graph-controller__arrow", !1), Et(
    t,
    n,
    e + "-link-arrow-reverse",
    "graph-controller__arrow",
    !0
  ), Et(
    t,
    n,
    e + "-draggable-link-arrow",
    "graph-controller__arrow draggable",
    !1
  ), r)
    for (let i of r)
      qn(t, e, n, i);
}
function qn(t, e, n, r) {
  t.select(`#${e}-link-arrow-` + Rt(r)).empty() && (Et(
    t,
    n,
    e + "-link-arrow-" + r,
    "graph-controller__arrow " + r,
    !1,
    r
  ), Et(
    t,
    n,
    e + "-link-arrow-reverse-" + r,
    "graph-controller__arrow colored",
    !0,
    r
  ));
}
function Cn(t, e, n) {
  t.select(`#${e}-link-arrow-` + Rt(n)).select(function() {
    return this.parentNode;
  }).remove(), t.select(`#${e}-link-arrow-reverse-` + Rt(n)).select(function() {
    return this.parentNode;
  }).remove();
}
function Et(t, e, n, r, i, o) {
  t.append("defs").append("marker").attr("id", n).attr("viewBox", e.markerPath).attr("refX", e.markerRef).attr("refY", e.markerRef).attr("markerWidth", e.markerBoxSize).attr("markerHeight", e.markerBoxSize).attr("orient", i ? "auto-start-reverse" : "auto").classed(r, !0).append("path").attr("d", `${ih()(e.arrowPoints)}`).style("fill", o || "");
}
function Lh(t, e) {
  return e.append("path").classed("graph-controller__link draggable hidden", !0).attr("d", "M0,0L0,0").style("marker-end", `url(#${t}-draggable-link-arrow)`);
}
class Xr {
  constructor() {
    re(this, "nodeIdCounter", 0);
    re(this, "nodes", []);
    re(this, "links", []);
  }
  createNode(e, n, r, i, o, s, l, a, h, u, p) {
    const f = new pn(
      this.nodeIdCounter++,
      e,
      i,
      n,
      r,
      o,
      s,
      l,
      a,
      h,
      u,
      p
    );
    return this.nodes.push(f), f;
  }
  createLink(e, n, r, i, o, s) {
    if (this.links.find(
      (p) => p.source.id === e && p.target.id === n
    ) !== void 0)
      return;
    const a = this.nodes.find((p) => p.id === e);
    if (a === void 0)
      return;
    const h = this.nodes.find((p) => p.id === n);
    if (h === void 0)
      return;
    const u = new Eh(
      a,
      h,
      void 0,
      r,
      i,
      o,
      s
    );
    return this.links.push(u), u;
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
      const o = this.links.indexOf(i, 0);
      this.links.splice(o, 1);
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
    let o, s;
    return o = this.nodes.map((l) => {
      let a = `${l.id}`;
      return e && l.label !== void 0 && (a += ` ${l.label}`), r && l.color !== void 0 && (a += ` /COLOR:/${l.color}`), a;
    }).join(`
`), s = this.links.map((l) => {
      let a = `${l.source.id} ${l.target.id}`;
      return n && l.label !== void 0 && (a += ` ${l.label}`), i && l.color !== void 0 && (a += ` /COLOR:/${l.color}`), a;
    }).join(`
`), `${o}${s ? `
#
` : ""}${s}`;
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
  toJSON(e = !0, n = !0, r = !0, i = !0, o = !0, s = !0, l = !0, a = !0, h = !0) {
    const u = this.nodes.map((f) => {
      const m = {
        id: f.id
      };
      return e && (m.x = f.x, m.y = f.y), n && (m.label = f.label), i && (m.props = f.props), o && (m.color = f.color), h && (m.idImported = f.idImported), l && (m.fixedPosition = f.fixedPosition, m.deletable = f.deletable, m.labelEditable = f.labelEditable, m.allowIncomingLinks = f.allowIncomingLinks, m.allowOutgoingLinks = f.allowOutgoingLinks), m;
    }), p = this.links.map((f) => {
      const m = {
        sourceId: f.source.id,
        targetId: f.target.id
      };
      return r && (m.label = f.label), s && (m.color = f.color), a && (m.deletable = f.deletable, m.labelEditable = f.labelEditable), m;
    });
    return JSON.stringify({ nodes: u, links: p }, null, 4);
  }
}
function Rh(t) {
  if (t.nodes.length === 0)
    return null;
  let e = Number.POSITIVE_INFINITY, n = Number.NEGATIVE_INFINITY, r = Number.POSITIVE_INFINITY, i = Number.NEGATIVE_INFINITY;
  for (const o of t.nodes) {
    let s, l, a, h;
    if (!(o.x === void 0 || o.y === void 0)) {
      if (o.props.shape === A.CIRCLE) {
        const u = o.props.radius;
        s = o.y - u, l = o.y + u, a = o.x - u, h = o.x + u;
      } else if (o.props.shape === A.RECTANGLE) {
        const u = o.props.width, p = o.props.height;
        s = o.y - p / 2, l = o.y + p / 2, a = o.x - u / 2, h = o.x + u / 2;
      } else
        throw new Error("Unknown node shape for node " + JSON.stringify(o));
      e = Math.min(e, s), n = Math.max(n, l), r = Math.min(r, a), i = Math.max(i, h);
    }
  }
  return {
    yMin: e,
    yMax: n,
    xMin: r,
    xMax: i
  };
}
function Ch(t) {
  var e = +this._x.call(null, t), n = +this._y.call(null, t);
  return $i(this.cover(e, n), e, n, t);
}
function $i(t, e, n, r) {
  if (isNaN(e) || isNaN(n)) return t;
  var i, o = t._root, s = { data: r }, l = t._x0, a = t._y0, h = t._x1, u = t._y1, p, f, m, y, S, b, d, k;
  if (!o) return t._root = s, t;
  for (; o.length; )
    if ((S = e >= (p = (l + h) / 2)) ? l = p : h = p, (b = n >= (f = (a + u) / 2)) ? a = f : u = f, i = o, !(o = o[d = b << 1 | S])) return i[d] = s, t;
  if (m = +t._x.call(null, o.data), y = +t._y.call(null, o.data), e === m && n === y) return s.next = o, i ? i[d] = s : t._root = s, t;
  do
    i = i ? i[d] = new Array(4) : t._root = new Array(4), (S = e >= (p = (l + h) / 2)) ? l = p : h = p, (b = n >= (f = (a + u) / 2)) ? a = f : u = f;
  while ((d = b << 1 | S) === (k = (y >= f) << 1 | m >= p));
  return i[k] = o, i[d] = s, t;
}
function Ih(t) {
  var e, n, r = t.length, i, o, s = new Array(r), l = new Array(r), a = 1 / 0, h = 1 / 0, u = -1 / 0, p = -1 / 0;
  for (n = 0; n < r; ++n)
    isNaN(i = +this._x.call(null, e = t[n])) || isNaN(o = +this._y.call(null, e)) || (s[n] = i, l[n] = o, i < a && (a = i), i > u && (u = i), o < h && (h = o), o > p && (p = o));
  for (u < a && (a = this._x0, u = this._x1), p < h && (h = this._y0, p = this._y1), this.cover(a, h).cover(u, p), n = 0; n < r; ++n)
    $i(this, s[n], l[n], t[n]);
  return this;
}
function Ph(t, e) {
  if (isNaN(t = +t) || isNaN(e = +e)) return this;
  var n = this._x0, r = this._y0, i = this._x1, o = this._y1;
  if (isNaN(n))
    i = (n = Math.floor(t)) + 1, o = (r = Math.floor(e)) + 1;
  else if (n > t || t > i || r > e || e > o) {
    var s = i - n, l = this._root, a, h;
    switch (h = (e < (r + o) / 2) << 1 | t < (n + i) / 2) {
      case 0: {
        do
          a = new Array(4), a[h] = l, l = a;
        while (s *= 2, i = n + s, o = r + s, t > i || e > o);
        break;
      }
      case 1: {
        do
          a = new Array(4), a[h] = l, l = a;
        while (s *= 2, n = i - s, o = r + s, n > t || e > o);
        break;
      }
      case 2: {
        do
          a = new Array(4), a[h] = l, l = a;
        while (s *= 2, i = n + s, r = o - s, t > i || r > e);
        break;
      }
      case 3: {
        do
          a = new Array(4), a[h] = l, l = a;
        while (s *= 2, n = i - s, r = o - s, n > t || r > e);
        break;
      }
    }
    this._root && this._root.length && (this._root = l);
  } else return this;
  return this._x0 = n, this._y0 = r, this._x1 = i, this._y1 = o, this;
}
function Oh() {
  var t = [];
  return this.visit(function(e) {
    if (!e.length) do
      t.push(e.data);
    while (e = e.next);
  }), t;
}
function $h(t) {
  return arguments.length ? this.cover(+t[0][0], +t[0][1]).cover(+t[1][0], +t[1][1]) : isNaN(this._x0) ? void 0 : [[this._x0, this._y0], [this._x1, this._y1]];
}
function ge(t, e, n, r, i) {
  this.node = t, this.x0 = e, this.y0 = n, this.x1 = r, this.y1 = i;
}
function zh(t, e, n) {
  var r, i = this._x0, o = this._y0, s, l, a, h, u = this._x1, p = this._y1, f = [], m = this._root, y, S;
  for (m && f.push(new ge(m, i, o, u, p)), n == null ? n = 1 / 0 : (i = t - n, o = e - n, u = t + n, p = e + n, n *= n); y = f.pop(); )
    if (!(!(m = y.node) || (s = y.x0) > u || (l = y.y0) > p || (a = y.x1) < i || (h = y.y1) < o))
      if (m.length) {
        var b = (s + a) / 2, d = (l + h) / 2;
        f.push(
          new ge(m[3], b, d, a, h),
          new ge(m[2], s, d, b, h),
          new ge(m[1], b, l, a, d),
          new ge(m[0], s, l, b, d)
        ), (S = (e >= d) << 1 | t >= b) && (y = f[f.length - 1], f[f.length - 1] = f[f.length - 1 - S], f[f.length - 1 - S] = y);
      } else {
        var k = t - +this._x.call(null, m.data), R = e - +this._y.call(null, m.data), v = k * k + R * R;
        if (v < n) {
          var N = Math.sqrt(n = v);
          i = t - N, o = e - N, u = t + N, p = e + N, r = m.data;
        }
      }
  return r;
}
function Ah(t) {
  if (isNaN(u = +this._x.call(null, t)) || isNaN(p = +this._y.call(null, t))) return this;
  var e, n = this._root, r, i, o, s = this._x0, l = this._y0, a = this._x1, h = this._y1, u, p, f, m, y, S, b, d;
  if (!n) return this;
  if (n.length) for (; ; ) {
    if ((y = u >= (f = (s + a) / 2)) ? s = f : a = f, (S = p >= (m = (l + h) / 2)) ? l = m : h = m, e = n, !(n = n[b = S << 1 | y])) return this;
    if (!n.length) break;
    (e[b + 1 & 3] || e[b + 2 & 3] || e[b + 3 & 3]) && (r = e, d = b);
  }
  for (; n.data !== t; ) if (i = n, !(n = n.next)) return this;
  return (o = n.next) && delete n.next, i ? (o ? i.next = o : delete i.next, this) : e ? (o ? e[b] = o : delete e[b], (n = e[0] || e[1] || e[2] || e[3]) && n === (e[3] || e[2] || e[1] || e[0]) && !n.length && (r ? r[d] = n : this._root = n), this) : (this._root = o, this);
}
function Bh(t) {
  for (var e = 0, n = t.length; e < n; ++e) this.remove(t[e]);
  return this;
}
function Fh() {
  return this._root;
}
function Gh() {
  var t = 0;
  return this.visit(function(e) {
    if (!e.length) do
      ++t;
    while (e = e.next);
  }), t;
}
function jh(t) {
  var e = [], n, r = this._root, i, o, s, l, a;
  for (r && e.push(new ge(r, this._x0, this._y0, this._x1, this._y1)); n = e.pop(); )
    if (!t(r = n.node, o = n.x0, s = n.y0, l = n.x1, a = n.y1) && r.length) {
      var h = (o + l) / 2, u = (s + a) / 2;
      (i = r[3]) && e.push(new ge(i, h, u, l, a)), (i = r[2]) && e.push(new ge(i, o, u, h, a)), (i = r[1]) && e.push(new ge(i, h, s, l, u)), (i = r[0]) && e.push(new ge(i, o, s, h, u));
    }
  return this;
}
function Vh(t) {
  var e = [], n = [], r;
  for (this._root && e.push(new ge(this._root, this._x0, this._y0, this._x1, this._y1)); r = e.pop(); ) {
    var i = r.node;
    if (i.length) {
      var o, s = r.x0, l = r.y0, a = r.x1, h = r.y1, u = (s + a) / 2, p = (l + h) / 2;
      (o = i[0]) && e.push(new ge(o, s, l, u, p)), (o = i[1]) && e.push(new ge(o, u, l, a, p)), (o = i[2]) && e.push(new ge(o, s, p, u, h)), (o = i[3]) && e.push(new ge(o, u, p, a, h));
    }
    n.push(r);
  }
  for (; r = n.pop(); )
    t(r.node, r.x0, r.y0, r.x1, r.y1);
  return this;
}
function Dh(t) {
  return arguments.length ? (this._x = t, this) : this._x;
}
function qh(t) {
  return arguments.length ? (this._y = t, this) : this._y;
}
function zi(t, e, n, r, i, o) {
  this._x = t, this._y = e, this._x0 = n, this._y0 = r, this._x1 = i, this._y1 = o, this._root = void 0;
}
function Yr(t) {
  for (var e = { data: t.data }, n = e; t = t.next; ) n = n.next = { data: t.data };
  return e;
}
var we = zi.prototype;
we.copy = function() {
  var t = new zi(this._x, this._y, this._x0, this._y0, this._x1, this._y1), e = this._root, n, r;
  if (!e) return t;
  if (!e.length) return t._root = Yr(e), t;
  for (n = [{ source: e, target: t._root = new Array(4) }]; e = n.pop(); )
    for (var i = 0; i < 4; ++i)
      (r = e.source[i]) && (r.length ? n.push({ source: r, target: e.target[i] = new Array(4) }) : e.target[i] = Yr(r));
  return t;
};
we.add = Ch;
we.addAll = Ih;
we.cover = Ph;
we.data = Oh;
we.extent = $h;
we.find = zh;
we.remove = Ah;
we.removeAll = Bh;
we.root = Fh;
we.size = Gh;
we.visit = jh;
we.visitAfter = Vh;
we.x = Dh;
we.y = qh;
function Hh(t, e, n, r, i) {
  let o = Gu(t.nodes).on("tick", () => i());
  return o = on(o), e.isCanvasBoundToView && (o = Uh(o, t, n, r)), o = Bi(o, t, e, e.fixedLinkDistanceEnabled), o = Ai(o, e.nodePhysicsEnabled, n, r), o;
}
function on(t, e, n) {
  return t;
}
function Uh(t, e, n, r) {
  return t.force("bounds", () => {
    for (const i of e.nodes)
      i.props.shape === A.CIRCLE ? (i.x = Math.max(
        i.renderedSize.radius,
        Math.min(n - i.renderedSize.radius, i.x)
      ), i.y = Math.max(
        i.renderedSize.radius,
        Math.min(r - i.renderedSize.radius, i.y)
      )) : i.props.shape === A.RECTANGLE && (i.x = Math.max(
        0.5 * i.renderedSize.width,
        Math.min(n - 0.5 * i.renderedSize.width, i.x)
      ), i.y = Math.max(
        0.5 * i.renderedSize.height,
        Math.min(r - 0.5 * i.renderedSize.height, i.y)
      ));
  });
}
function Ai(t, e, n, r) {
  return e ? t.force("charge", ju().strength(-500)).force("x", Vu(n / 2).strength(0.05)).force("y", Du(r / 2).strength(0.05)) : t.force("charge", null).force("x", null).force("y", null);
}
function Bi(t, e, n, r) {
  if (r) {
    let i = 0;
    return n.nodeProps.shape === A.CIRCLE ? i = n.nodeProps.radius : n.nodeProps.shape === A.RECTANGLE && (n.nodeProps.width < n.nodeProps.height ? i = n.nodeProps.width / 2 : i = n.nodeProps.height / 2), t.force(
      "link",
      Iu().links(e.links).id((o) => o.id).distance(i * 10)
    );
  } else
    return t.force("link", null);
}
const Wh = Object.prototype.toString;
function gn(t) {
  const e = Wh.call(t);
  return e.endsWith("Array]") && !e.includes("Big");
}
function Xh(t) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (!gn(t))
    throw new TypeError("input must be an array");
  if (t.length === 0)
    throw new TypeError("input must not be empty");
  var n = e.fromIndex, r = n === void 0 ? 0 : n, i = e.toIndex, o = i === void 0 ? t.length : i;
  if (r < 0 || r >= t.length || !Number.isInteger(r))
    throw new Error("fromIndex must be a positive integer smaller than length");
  if (o <= r || o > t.length || !Number.isInteger(o))
    throw new Error("toIndex must be an integer greater than fromIndex and at most equal to length");
  for (var s = t[r], l = r + 1; l < o; l++)
    t[l] > s && (s = t[l]);
  return s;
}
function Yh(t) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (!gn(t))
    throw new TypeError("input must be an array");
  if (t.length === 0)
    throw new TypeError("input must not be empty");
  var n = e.fromIndex, r = n === void 0 ? 0 : n, i = e.toIndex, o = i === void 0 ? t.length : i;
  if (r < 0 || r >= t.length || !Number.isInteger(r))
    throw new Error("fromIndex must be a positive integer smaller than length");
  if (o <= r || o > t.length || !Number.isInteger(o))
    throw new Error("toIndex must be an integer greater than fromIndex and at most equal to length");
  for (var s = t[r], l = r + 1; l < o; l++)
    t[l] < s && (s = t[l]);
  return s;
}
function Qr(t) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (gn(t)) {
    if (t.length === 0)
      throw new TypeError("input must not be empty");
  } else throw new TypeError("input must be an array");
  var n;
  if (e.output !== void 0) {
    if (!gn(e.output))
      throw new TypeError("output option must be an array if specified");
    n = e.output;
  } else
    n = new Array(t.length);
  var r = Yh(t), i = Xh(t);
  if (r === i)
    throw new RangeError("minimum and maximum input values are equal. Cannot rescale a constant array");
  var o = e.min, s = o === void 0 ? e.autoMinMax ? r : 0 : o, l = e.max, a = l === void 0 ? e.autoMinMax ? i : 1 : l;
  if (s >= a)
    throw new RangeError("min option must be smaller than max option");
  for (var h = (a - s) / (i - r), u = 0; u < t.length; u++)
    n[u] = (t[u] - r) * h + s;
  return n;
}
const Qt = " ".repeat(2), Fi = " ".repeat(4);
function Qh() {
  return Gi(this);
}
function Gi(t, e = {}) {
  const { maxRows: n = 15, maxColumns: r = 10, maxNumSize: i = 8 } = e;
  return `${t.constructor.name} {
${Qt}[
${Fi}${Zh(t, n, r, i)}
${Qt}]
${Qt}rows: ${t.rows}
${Qt}columns: ${t.columns}
}`;
}
function Zh(t, e, n, r) {
  const { rows: i, columns: o } = t, s = Math.min(i, e), l = Math.min(o, n), a = [];
  for (let h = 0; h < s; h++) {
    let u = [];
    for (let p = 0; p < l; p++)
      u.push(Jh(t.get(h, p), r));
    a.push(`${u.join(" ")}`);
  }
  return l !== o && (a[a.length - 1] += ` ... ${o - n} more columns`), s !== i && a.push(`... ${i - e} more rows`), a.join(`
${Fi}`);
}
function Jh(t, e) {
  const n = String(t);
  if (n.length <= e)
    return n.padEnd(e, " ");
  const r = t.toPrecision(e - 2);
  if (r.length <= e)
    return r;
  const i = t.toExponential(e - 2), o = i.indexOf("e"), s = i.slice(o);
  return i.slice(0, e - s.length) + s;
}
function Kh(t, e) {
  t.prototype.add = function(r) {
    return typeof r == "number" ? this.addS(r) : this.addM(r);
  }, t.prototype.addS = function(r) {
    for (let i = 0; i < this.rows; i++)
      for (let o = 0; o < this.columns; o++)
        this.set(i, o, this.get(i, o) + r);
    return this;
  }, t.prototype.addM = function(r) {
    if (r = e.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let i = 0; i < this.rows; i++)
      for (let o = 0; o < this.columns; o++)
        this.set(i, o, this.get(i, o) + r.get(i, o));
    return this;
  }, t.add = function(r, i) {
    return new e(r).add(i);
  }, t.prototype.sub = function(r) {
    return typeof r == "number" ? this.subS(r) : this.subM(r);
  }, t.prototype.subS = function(r) {
    for (let i = 0; i < this.rows; i++)
      for (let o = 0; o < this.columns; o++)
        this.set(i, o, this.get(i, o) - r);
    return this;
  }, t.prototype.subM = function(r) {
    if (r = e.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let i = 0; i < this.rows; i++)
      for (let o = 0; o < this.columns; o++)
        this.set(i, o, this.get(i, o) - r.get(i, o));
    return this;
  }, t.sub = function(r, i) {
    return new e(r).sub(i);
  }, t.prototype.subtract = t.prototype.sub, t.prototype.subtractS = t.prototype.subS, t.prototype.subtractM = t.prototype.subM, t.subtract = t.sub, t.prototype.mul = function(r) {
    return typeof r == "number" ? this.mulS(r) : this.mulM(r);
  }, t.prototype.mulS = function(r) {
    for (let i = 0; i < this.rows; i++)
      for (let o = 0; o < this.columns; o++)
        this.set(i, o, this.get(i, o) * r);
    return this;
  }, t.prototype.mulM = function(r) {
    if (r = e.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let i = 0; i < this.rows; i++)
      for (let o = 0; o < this.columns; o++)
        this.set(i, o, this.get(i, o) * r.get(i, o));
    return this;
  }, t.mul = function(r, i) {
    return new e(r).mul(i);
  }, t.prototype.multiply = t.prototype.mul, t.prototype.multiplyS = t.prototype.mulS, t.prototype.multiplyM = t.prototype.mulM, t.multiply = t.mul, t.prototype.div = function(r) {
    return typeof r == "number" ? this.divS(r) : this.divM(r);
  }, t.prototype.divS = function(r) {
    for (let i = 0; i < this.rows; i++)
      for (let o = 0; o < this.columns; o++)
        this.set(i, o, this.get(i, o) / r);
    return this;
  }, t.prototype.divM = function(r) {
    if (r = e.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let i = 0; i < this.rows; i++)
      for (let o = 0; o < this.columns; o++)
        this.set(i, o, this.get(i, o) / r.get(i, o));
    return this;
  }, t.div = function(r, i) {
    return new e(r).div(i);
  }, t.prototype.divide = t.prototype.div, t.prototype.divideS = t.prototype.divS, t.prototype.divideM = t.prototype.divM, t.divide = t.div, t.prototype.mod = function(r) {
    return typeof r == "number" ? this.modS(r) : this.modM(r);
  }, t.prototype.modS = function(r) {
    for (let i = 0; i < this.rows; i++)
      for (let o = 0; o < this.columns; o++)
        this.set(i, o, this.get(i, o) % r);
    return this;
  }, t.prototype.modM = function(r) {
    if (r = e.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let i = 0; i < this.rows; i++)
      for (let o = 0; o < this.columns; o++)
        this.set(i, o, this.get(i, o) % r.get(i, o));
    return this;
  }, t.mod = function(r, i) {
    return new e(r).mod(i);
  }, t.prototype.modulus = t.prototype.mod, t.prototype.modulusS = t.prototype.modS, t.prototype.modulusM = t.prototype.modM, t.modulus = t.mod, t.prototype.and = function(r) {
    return typeof r == "number" ? this.andS(r) : this.andM(r);
  }, t.prototype.andS = function(r) {
    for (let i = 0; i < this.rows; i++)
      for (let o = 0; o < this.columns; o++)
        this.set(i, o, this.get(i, o) & r);
    return this;
  }, t.prototype.andM = function(r) {
    if (r = e.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let i = 0; i < this.rows; i++)
      for (let o = 0; o < this.columns; o++)
        this.set(i, o, this.get(i, o) & r.get(i, o));
    return this;
  }, t.and = function(r, i) {
    return new e(r).and(i);
  }, t.prototype.or = function(r) {
    return typeof r == "number" ? this.orS(r) : this.orM(r);
  }, t.prototype.orS = function(r) {
    for (let i = 0; i < this.rows; i++)
      for (let o = 0; o < this.columns; o++)
        this.set(i, o, this.get(i, o) | r);
    return this;
  }, t.prototype.orM = function(r) {
    if (r = e.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let i = 0; i < this.rows; i++)
      for (let o = 0; o < this.columns; o++)
        this.set(i, o, this.get(i, o) | r.get(i, o));
    return this;
  }, t.or = function(r, i) {
    return new e(r).or(i);
  }, t.prototype.xor = function(r) {
    return typeof r == "number" ? this.xorS(r) : this.xorM(r);
  }, t.prototype.xorS = function(r) {
    for (let i = 0; i < this.rows; i++)
      for (let o = 0; o < this.columns; o++)
        this.set(i, o, this.get(i, o) ^ r);
    return this;
  }, t.prototype.xorM = function(r) {
    if (r = e.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let i = 0; i < this.rows; i++)
      for (let o = 0; o < this.columns; o++)
        this.set(i, o, this.get(i, o) ^ r.get(i, o));
    return this;
  }, t.xor = function(r, i) {
    return new e(r).xor(i);
  }, t.prototype.leftShift = function(r) {
    return typeof r == "number" ? this.leftShiftS(r) : this.leftShiftM(r);
  }, t.prototype.leftShiftS = function(r) {
    for (let i = 0; i < this.rows; i++)
      for (let o = 0; o < this.columns; o++)
        this.set(i, o, this.get(i, o) << r);
    return this;
  }, t.prototype.leftShiftM = function(r) {
    if (r = e.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let i = 0; i < this.rows; i++)
      for (let o = 0; o < this.columns; o++)
        this.set(i, o, this.get(i, o) << r.get(i, o));
    return this;
  }, t.leftShift = function(r, i) {
    return new e(r).leftShift(i);
  }, t.prototype.signPropagatingRightShift = function(r) {
    return typeof r == "number" ? this.signPropagatingRightShiftS(r) : this.signPropagatingRightShiftM(r);
  }, t.prototype.signPropagatingRightShiftS = function(r) {
    for (let i = 0; i < this.rows; i++)
      for (let o = 0; o < this.columns; o++)
        this.set(i, o, this.get(i, o) >> r);
    return this;
  }, t.prototype.signPropagatingRightShiftM = function(r) {
    if (r = e.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let i = 0; i < this.rows; i++)
      for (let o = 0; o < this.columns; o++)
        this.set(i, o, this.get(i, o) >> r.get(i, o));
    return this;
  }, t.signPropagatingRightShift = function(r, i) {
    return new e(r).signPropagatingRightShift(i);
  }, t.prototype.rightShift = function(r) {
    return typeof r == "number" ? this.rightShiftS(r) : this.rightShiftM(r);
  }, t.prototype.rightShiftS = function(r) {
    for (let i = 0; i < this.rows; i++)
      for (let o = 0; o < this.columns; o++)
        this.set(i, o, this.get(i, o) >>> r);
    return this;
  }, t.prototype.rightShiftM = function(r) {
    if (r = e.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let i = 0; i < this.rows; i++)
      for (let o = 0; o < this.columns; o++)
        this.set(i, o, this.get(i, o) >>> r.get(i, o));
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
      for (let o = 0; o < this.columns; o++)
        this.set(i, o, Math.pow(this.get(i, o), r));
    return this;
  }, t.prototype.powM = function(r) {
    if (r = e.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let i = 0; i < this.rows; i++)
      for (let o = 0; o < this.columns; o++)
        this.set(i, o, Math.pow(this.get(i, o), r.get(i, o)));
    return this;
  };
}
function Re(t, e, n) {
  let r = n ? t.rows : t.rows - 1;
  if (e < 0 || e > r)
    throw new RangeError("Row index out of range");
}
function Ce(t, e, n) {
  let r = n ? t.columns : t.columns - 1;
  if (e < 0 || e > r)
    throw new RangeError("Column index out of range");
}
function it(t, e) {
  if (e.to1DArray && (e = e.to1DArray()), e.length !== t.columns)
    throw new RangeError(
      "vector size must be the same as the number of columns"
    );
  return e;
}
function ot(t, e) {
  if (e.to1DArray && (e = e.to1DArray()), e.length !== t.rows)
    throw new RangeError("vector size must be the same as the number of rows");
  return e;
}
function ec(t, e, n) {
  return {
    row: tc(t, e),
    column: nc(t, n)
  };
}
function tc(t, e) {
  if (typeof e != "object")
    throw new TypeError("unexpected type for row indices");
  if (e.some((r) => r < 0 || r >= t.rows))
    throw new RangeError("row indices are out of range");
  return Array.isArray(e) || (e = Array.from(e)), e;
}
function nc(t, e) {
  if (typeof e != "object")
    throw new TypeError("unexpected type for column indices");
  if (e.some((r) => r < 0 || r >= t.columns))
    throw new RangeError("column indices are out of range");
  return Array.isArray(e) || (e = Array.from(e)), e;
}
function Zr(t, e, n, r, i) {
  if (arguments.length !== 5)
    throw new RangeError("expected 4 arguments");
  if (Zt("startRow", e), Zt("endRow", n), Zt("startColumn", r), Zt("endColumn", i), e > n || r > i || e < 0 || e >= t.rows || n < 0 || n >= t.rows || r < 0 || r >= t.columns || i < 0 || i >= t.columns)
    throw new RangeError("Submatrix indices are out of range");
}
function bn(t, e = 0) {
  let n = [];
  for (let r = 0; r < t; r++)
    n.push(e);
  return n;
}
function Zt(t, e) {
  if (typeof e != "number")
    throw new TypeError(`${t} must be a number`);
}
function rt(t) {
  if (t.isEmpty())
    throw new Error("Empty matrix has no elements to index");
}
function rc(t) {
  let e = bn(t.rows);
  for (let n = 0; n < t.rows; ++n)
    for (let r = 0; r < t.columns; ++r)
      e[n] += t.get(n, r);
  return e;
}
function ic(t) {
  let e = bn(t.columns);
  for (let n = 0; n < t.rows; ++n)
    for (let r = 0; r < t.columns; ++r)
      e[r] += t.get(n, r);
  return e;
}
function oc(t) {
  let e = 0;
  for (let n = 0; n < t.rows; n++)
    for (let r = 0; r < t.columns; r++)
      e += t.get(n, r);
  return e;
}
function sc(t) {
  let e = bn(t.rows, 1);
  for (let n = 0; n < t.rows; ++n)
    for (let r = 0; r < t.columns; ++r)
      e[n] *= t.get(n, r);
  return e;
}
function lc(t) {
  let e = bn(t.columns, 1);
  for (let n = 0; n < t.rows; ++n)
    for (let r = 0; r < t.columns; ++r)
      e[r] *= t.get(n, r);
  return e;
}
function ac(t) {
  let e = 1;
  for (let n = 0; n < t.rows; n++)
    for (let r = 0; r < t.columns; r++)
      e *= t.get(n, r);
  return e;
}
function uc(t, e, n) {
  const r = t.rows, i = t.columns, o = [];
  for (let s = 0; s < r; s++) {
    let l = 0, a = 0, h = 0;
    for (let u = 0; u < i; u++)
      h = t.get(s, u) - n[s], l += h, a += h * h;
    e ? o.push((a - l * l / i) / (i - 1)) : o.push((a - l * l / i) / i);
  }
  return o;
}
function hc(t, e, n) {
  const r = t.rows, i = t.columns, o = [];
  for (let s = 0; s < i; s++) {
    let l = 0, a = 0, h = 0;
    for (let u = 0; u < r; u++)
      h = t.get(u, s) - n[s], l += h, a += h * h;
    e ? o.push((a - l * l / r) / (r - 1)) : o.push((a - l * l / r) / r);
  }
  return o;
}
function cc(t, e, n) {
  const r = t.rows, i = t.columns, o = r * i;
  let s = 0, l = 0, a = 0;
  for (let h = 0; h < r; h++)
    for (let u = 0; u < i; u++)
      a = t.get(h, u) - n, s += a, l += a * a;
  return e ? (l - s * s / o) / (o - 1) : (l - s * s / o) / o;
}
function fc(t, e) {
  for (let n = 0; n < t.rows; n++)
    for (let r = 0; r < t.columns; r++)
      t.set(n, r, t.get(n, r) - e[n]);
}
function dc(t, e) {
  for (let n = 0; n < t.rows; n++)
    for (let r = 0; r < t.columns; r++)
      t.set(n, r, t.get(n, r) - e[r]);
}
function pc(t, e) {
  for (let n = 0; n < t.rows; n++)
    for (let r = 0; r < t.columns; r++)
      t.set(n, r, t.get(n, r) - e);
}
function gc(t) {
  const e = [];
  for (let n = 0; n < t.rows; n++) {
    let r = 0;
    for (let i = 0; i < t.columns; i++)
      r += Math.pow(t.get(n, i), 2) / (t.columns - 1);
    e.push(Math.sqrt(r));
  }
  return e;
}
function mc(t, e) {
  for (let n = 0; n < t.rows; n++)
    for (let r = 0; r < t.columns; r++)
      t.set(n, r, t.get(n, r) / e[n]);
}
function wc(t) {
  const e = [];
  for (let n = 0; n < t.columns; n++) {
    let r = 0;
    for (let i = 0; i < t.rows; i++)
      r += Math.pow(t.get(i, n), 2) / (t.rows - 1);
    e.push(Math.sqrt(r));
  }
  return e;
}
function yc(t, e) {
  for (let n = 0; n < t.rows; n++)
    for (let r = 0; r < t.columns; r++)
      t.set(n, r, t.get(n, r) / e[r]);
}
function vc(t) {
  const e = t.size - 1;
  let n = 0;
  for (let r = 0; r < t.columns; r++)
    for (let i = 0; i < t.rows; i++)
      n += Math.pow(t.get(i, r), 2) / e;
  return Math.sqrt(n);
}
function bc(t, e) {
  for (let n = 0; n < t.rows; n++)
    for (let r = 0; r < t.columns; r++)
      t.set(n, r, t.get(n, r) / e);
}
class U {
  static from1DArray(e, n, r) {
    if (e * n !== r.length)
      throw new RangeError("data length does not match given dimensions");
    let o = new D(e, n);
    for (let s = 0; s < e; s++)
      for (let l = 0; l < n; l++)
        o.set(s, l, r[s * n + l]);
    return o;
  }
  static rowVector(e) {
    let n = new D(1, e.length);
    for (let r = 0; r < e.length; r++)
      n.set(0, r, e[r]);
    return n;
  }
  static columnVector(e) {
    let n = new D(e.length, 1);
    for (let r = 0; r < e.length; r++)
      n.set(r, 0, e[r]);
    return n;
  }
  static zeros(e, n) {
    return new D(e, n);
  }
  static ones(e, n) {
    return new D(e, n).fill(1);
  }
  static rand(e, n, r = {}) {
    if (typeof r != "object")
      throw new TypeError("options must be an object");
    const { random: i = Math.random } = r;
    let o = new D(e, n);
    for (let s = 0; s < e; s++)
      for (let l = 0; l < n; l++)
        o.set(s, l, i());
    return o;
  }
  static randInt(e, n, r = {}) {
    if (typeof r != "object")
      throw new TypeError("options must be an object");
    const { min: i = 0, max: o = 1e3, random: s = Math.random } = r;
    if (!Number.isInteger(i)) throw new TypeError("min must be an integer");
    if (!Number.isInteger(o)) throw new TypeError("max must be an integer");
    if (i >= o) throw new RangeError("min must be smaller than max");
    let l = o - i, a = new D(e, n);
    for (let h = 0; h < e; h++)
      for (let u = 0; u < n; u++) {
        let p = i + Math.round(s() * l);
        a.set(h, u, p);
      }
    return a;
  }
  static eye(e, n, r) {
    n === void 0 && (n = e), r === void 0 && (r = 1);
    let i = Math.min(e, n), o = this.zeros(e, n);
    for (let s = 0; s < i; s++)
      o.set(s, s, r);
    return o;
  }
  static diag(e, n, r) {
    let i = e.length;
    n === void 0 && (n = i), r === void 0 && (r = n);
    let o = Math.min(i, n, r), s = this.zeros(n, r);
    for (let l = 0; l < o; l++)
      s.set(l, l, e[l]);
    return s;
  }
  static min(e, n) {
    e = this.checkMatrix(e), n = this.checkMatrix(n);
    let r = e.rows, i = e.columns, o = new D(r, i);
    for (let s = 0; s < r; s++)
      for (let l = 0; l < i; l++)
        o.set(s, l, Math.min(e.get(s, l), n.get(s, l)));
    return o;
  }
  static max(e, n) {
    e = this.checkMatrix(e), n = this.checkMatrix(n);
    let r = e.rows, i = e.columns, o = new this(r, i);
    for (let s = 0; s < r; s++)
      for (let l = 0; l < i; l++)
        o.set(s, l, Math.max(e.get(s, l), n.get(s, l)));
    return o;
  }
  static checkMatrix(e) {
    return U.isMatrix(e) ? e : new D(e);
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
    let e = 0, n = 0, r = -1, i = !0, o = !1;
    for (; e < this.rows && i; ) {
      for (n = 0, o = !1; n < this.columns && o === !1; )
        this.get(e, n) === 0 ? n++ : this.get(e, n) === 1 && n > r ? (o = !0, r = n) : (i = !1, o = !0);
      e++;
    }
    return i;
  }
  isReducedEchelonForm() {
    let e = 0, n = 0, r = -1, i = !0, o = !1;
    for (; e < this.rows && i; ) {
      for (n = 0, o = !1; n < this.columns && o === !1; )
        this.get(e, n) === 0 ? n++ : this.get(e, n) === 1 && n > r ? (o = !0, r = n) : (i = !1, o = !0);
      for (let s = n + 1; s < this.rows; s++)
        this.get(e, s) !== 0 && (i = !1);
      e++;
    }
    return i;
  }
  echelonForm() {
    let e = this.clone(), n = 0, r = 0;
    for (; n < e.rows && r < e.columns; ) {
      let i = n;
      for (let o = n; o < e.rows; o++)
        e.get(o, r) > e.get(i, r) && (i = o);
      if (e.get(i, r) === 0)
        r++;
      else {
        e.swapRows(n, i);
        let o = e.get(n, r);
        for (let s = r; s < e.columns; s++)
          e.set(n, s, e.get(n, s) / o);
        for (let s = n + 1; s < e.rows; s++) {
          let l = e.get(s, r) / e.get(n, r);
          e.set(s, r, 0);
          for (let a = r + 1; a < e.columns; a++)
            e.set(s, a, e.get(s, a) - e.get(n, a) * l);
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
        let o = 0, s = !1;
        for (; o < r && s === !1; )
          e.get(i, o) === 1 ? s = !0 : o++;
        for (let l = 0; l < i; l++) {
          let a = e.get(l, o);
          for (let h = o; h < n; h++) {
            let u = e.get(l, h) - a * e.get(i, h);
            e.set(l, h, u);
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
    let i = new D(this.rows * n, this.columns * r);
    for (let o = 0; o < n; o++)
      for (let s = 0; s < r; s++)
        i.setSubMatrix(this, this.rows * o, this.columns * s);
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
    Re(this, e);
    let n = [];
    for (let r = 0; r < this.columns; r++)
      n.push(this.get(e, r));
    return n;
  }
  getRowVector(e) {
    return D.rowVector(this.getRow(e));
  }
  setRow(e, n) {
    Re(this, e), n = it(this, n);
    for (let r = 0; r < this.columns; r++)
      this.set(e, r, n[r]);
    return this;
  }
  swapRows(e, n) {
    Re(this, e), Re(this, n);
    for (let r = 0; r < this.columns; r++) {
      let i = this.get(e, r);
      this.set(e, r, this.get(n, r)), this.set(n, r, i);
    }
    return this;
  }
  getColumn(e) {
    Ce(this, e);
    let n = [];
    for (let r = 0; r < this.rows; r++)
      n.push(this.get(r, e));
    return n;
  }
  getColumnVector(e) {
    return D.columnVector(this.getColumn(e));
  }
  setColumn(e, n) {
    Ce(this, e), n = ot(this, n);
    for (let r = 0; r < this.rows; r++)
      this.set(r, e, n[r]);
    return this;
  }
  swapColumns(e, n) {
    Ce(this, e), Ce(this, n);
    for (let r = 0; r < this.rows; r++) {
      let i = this.get(r, e);
      this.set(r, e, this.get(r, n)), this.set(r, n, i);
    }
    return this;
  }
  addRowVector(e) {
    e = it(this, e);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, this.get(n, r) + e[r]);
    return this;
  }
  subRowVector(e) {
    e = it(this, e);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, this.get(n, r) - e[r]);
    return this;
  }
  mulRowVector(e) {
    e = it(this, e);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, this.get(n, r) * e[r]);
    return this;
  }
  divRowVector(e) {
    e = it(this, e);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, this.get(n, r) / e[r]);
    return this;
  }
  addColumnVector(e) {
    e = ot(this, e);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, this.get(n, r) + e[n]);
    return this;
  }
  subColumnVector(e) {
    e = ot(this, e);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, this.get(n, r) - e[n]);
    return this;
  }
  mulColumnVector(e) {
    e = ot(this, e);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, this.get(n, r) * e[n]);
    return this;
  }
  divColumnVector(e) {
    e = ot(this, e);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        this.set(n, r, this.get(n, r) / e[n]);
    return this;
  }
  mulRow(e, n) {
    Re(this, e);
    for (let r = 0; r < this.columns; r++)
      this.set(e, r, this.get(e, r) * n);
    return this;
  }
  mulColumn(e, n) {
    Ce(this, e);
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
    rt(this);
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
    rt(this);
    let e = this.get(0, 0), n = [0, 0];
    for (let r = 0; r < this.rows; r++)
      for (let i = 0; i < this.columns; i++)
        this.get(r, i) < e && (e = this.get(r, i), n[0] = r, n[1] = i);
    return n;
  }
  maxRow(e) {
    if (Re(this, e), this.isEmpty())
      return NaN;
    let n = this.get(e, 0);
    for (let r = 1; r < this.columns; r++)
      this.get(e, r) > n && (n = this.get(e, r));
    return n;
  }
  maxRowIndex(e) {
    Re(this, e), rt(this);
    let n = this.get(e, 0), r = [e, 0];
    for (let i = 1; i < this.columns; i++)
      this.get(e, i) > n && (n = this.get(e, i), r[1] = i);
    return r;
  }
  minRow(e) {
    if (Re(this, e), this.isEmpty())
      return NaN;
    let n = this.get(e, 0);
    for (let r = 1; r < this.columns; r++)
      this.get(e, r) < n && (n = this.get(e, r));
    return n;
  }
  minRowIndex(e) {
    Re(this, e), rt(this);
    let n = this.get(e, 0), r = [e, 0];
    for (let i = 1; i < this.columns; i++)
      this.get(e, i) < n && (n = this.get(e, i), r[1] = i);
    return r;
  }
  maxColumn(e) {
    if (Ce(this, e), this.isEmpty())
      return NaN;
    let n = this.get(0, e);
    for (let r = 1; r < this.rows; r++)
      this.get(r, e) > n && (n = this.get(r, e));
    return n;
  }
  maxColumnIndex(e) {
    Ce(this, e), rt(this);
    let n = this.get(0, e), r = [0, e];
    for (let i = 1; i < this.rows; i++)
      this.get(i, e) > n && (n = this.get(i, e), r[0] = i);
    return r;
  }
  minColumn(e) {
    if (Ce(this, e), this.isEmpty())
      return NaN;
    let n = this.get(0, e);
    for (let r = 1; r < this.rows; r++)
      this.get(r, e) < n && (n = this.get(r, e));
    return n;
  }
  minColumnIndex(e) {
    Ce(this, e), rt(this);
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
    U.isMatrix(e) && (e = e.to1DArray());
    let n = this.to1DArray();
    if (n.length !== e.length)
      throw new RangeError("vectors do not have the same size");
    let r = 0;
    for (let i = 0; i < n.length; i++)
      r += n[i] * e[i];
    return r;
  }
  mmul(e) {
    e = D.checkMatrix(e);
    let n = this.rows, r = this.columns, i = e.columns, o = new D(n, i), s = new Float64Array(r);
    for (let l = 0; l < i; l++) {
      for (let a = 0; a < r; a++)
        s[a] = e.get(a, l);
      for (let a = 0; a < n; a++) {
        let h = 0;
        for (let u = 0; u < r; u++)
          h += this.get(a, u) * s[u];
        o.set(a, l, h);
      }
    }
    return o;
  }
  strassen2x2(e) {
    e = D.checkMatrix(e);
    let n = new D(2, 2);
    const r = this.get(0, 0), i = e.get(0, 0), o = this.get(0, 1), s = e.get(0, 1), l = this.get(1, 0), a = e.get(1, 0), h = this.get(1, 1), u = e.get(1, 1), p = (r + h) * (i + u), f = (l + h) * i, m = r * (s - u), y = h * (a - i), S = (r + o) * u, b = (l - r) * (i + s), d = (o - h) * (a + u), k = p + y - S + d, R = m + S, v = f + y, N = p - f + m + b;
    return n.set(0, 0, k), n.set(0, 1, R), n.set(1, 0, v), n.set(1, 1, N), n;
  }
  strassen3x3(e) {
    e = D.checkMatrix(e);
    let n = new D(3, 3);
    const r = this.get(0, 0), i = this.get(0, 1), o = this.get(0, 2), s = this.get(1, 0), l = this.get(1, 1), a = this.get(1, 2), h = this.get(2, 0), u = this.get(2, 1), p = this.get(2, 2), f = e.get(0, 0), m = e.get(0, 1), y = e.get(0, 2), S = e.get(1, 0), b = e.get(1, 1), d = e.get(1, 2), k = e.get(2, 0), R = e.get(2, 1), v = e.get(2, 2), N = (r + i + o - s - l - u - p) * b, I = (r - s) * (-m + b), P = l * (-f + m + S - b - d - k + v), F = (-r + s + l) * (f - m + b), V = (s + l) * (-f + m), q = r * f, H = (-r + h + u) * (f - y + d), J = (-r + h) * (y - d), z = (h + u) * (-f + y), E = (r + i + o - l - a - h - u) * d, C = u * (-f + y + S - b - d - k + R), T = (-o + u + p) * (b + k - R), O = (o - p) * (b - R), $ = o * k, G = (u + p) * (-k + R), B = (-o + l + a) * (d + k - v), W = (o - a) * (d - v), K = (l + a) * (-k + v), le = i * S, te = a * R, ne = s * y, ae = h * m, oe = p * v, ue = q + $ + le, Me = N + F + V + q + T + $ + G, We = q + H + z + E + $ + B + K, Xe = I + P + F + q + $ + B + W, Ot = I + F + V + q + te, $t = $ + B + W + K + ne, zt = q + H + J + C + T + O + $, At = T + O + $ + G + ae, _n = q + H + J + z + oe;
    return n.set(0, 0, ue), n.set(0, 1, Me), n.set(0, 2, We), n.set(1, 0, Xe), n.set(1, 1, Ot), n.set(1, 2, $t), n.set(2, 0, zt), n.set(2, 1, At), n.set(2, 2, _n), n;
  }
  mmulStrassen(e) {
    e = D.checkMatrix(e);
    let n = this.clone(), r = n.rows, i = n.columns, o = e.rows, s = e.columns;
    i !== o && console.warn(
      `Multiplying ${r} x ${i} and ${o} x ${s} matrix: dimensions do not match.`
    );
    function l(p, f, m) {
      let y = p.rows, S = p.columns;
      if (y === f && S === m)
        return p;
      {
        let b = U.zeros(f, m);
        return b = b.setSubMatrix(p, 0, 0), b;
      }
    }
    let a = Math.max(r, o), h = Math.max(i, s);
    n = l(n, a, h), e = l(e, a, h);
    function u(p, f, m, y) {
      if (m <= 512 || y <= 512)
        return p.mmul(f);
      m % 2 === 1 && y % 2 === 1 ? (p = l(p, m + 1, y + 1), f = l(f, m + 1, y + 1)) : m % 2 === 1 ? (p = l(p, m + 1, y), f = l(f, m + 1, y)) : y % 2 === 1 && (p = l(p, m, y + 1), f = l(f, m, y + 1));
      let S = parseInt(p.rows / 2, 10), b = parseInt(p.columns / 2, 10), d = p.subMatrix(0, S - 1, 0, b - 1), k = f.subMatrix(0, S - 1, 0, b - 1), R = p.subMatrix(0, S - 1, b, p.columns - 1), v = f.subMatrix(0, S - 1, b, f.columns - 1), N = p.subMatrix(S, p.rows - 1, 0, b - 1), I = f.subMatrix(S, f.rows - 1, 0, b - 1), P = p.subMatrix(S, p.rows - 1, b, p.columns - 1), F = f.subMatrix(S, f.rows - 1, b, f.columns - 1), V = u(
        U.add(d, P),
        U.add(k, F),
        S,
        b
      ), q = u(U.add(N, P), k, S, b), H = u(d, U.sub(v, F), S, b), J = u(P, U.sub(I, k), S, b), z = u(U.add(d, R), F, S, b), E = u(
        U.sub(N, d),
        U.add(k, v),
        S,
        b
      ), C = u(
        U.sub(R, P),
        U.add(I, F),
        S,
        b
      ), T = U.add(V, J);
      T.sub(z), T.add(C);
      let O = U.add(H, z), $ = U.add(q, J), G = U.sub(V, q);
      G.add(H), G.add(E);
      let B = U.zeros(2 * T.rows, 2 * T.columns);
      return B = B.setSubMatrix(T, 0, 0), B = B.setSubMatrix(O, T.rows, 0), B = B.setSubMatrix($, 0, T.columns), B = B.setSubMatrix(G, T.rows, T.columns), B.subMatrix(0, m - 1, 0, y - 1);
    }
    return u(n, e, a, h);
  }
  scaleRows(e = {}) {
    if (typeof e != "object")
      throw new TypeError("options must be an object");
    const { min: n = 0, max: r = 1 } = e;
    if (!Number.isFinite(n)) throw new TypeError("min must be a number");
    if (!Number.isFinite(r)) throw new TypeError("max must be a number");
    if (n >= r) throw new RangeError("min must be smaller than max");
    let i = new D(this.rows, this.columns);
    for (let o = 0; o < this.rows; o++) {
      const s = this.getRow(o);
      s.length > 0 && Qr(s, { min: n, max: r, output: s }), i.setRow(o, s);
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
    let i = new D(this.rows, this.columns);
    for (let o = 0; o < this.columns; o++) {
      const s = this.getColumn(o);
      s.length && Qr(s, {
        min: n,
        max: r,
        output: s
      }), i.setColumn(o, s);
    }
    return i;
  }
  flipRows() {
    const e = Math.ceil(this.columns / 2);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < e; r++) {
        let i = this.get(n, r), o = this.get(n, this.columns - 1 - r);
        this.set(n, r, o), this.set(n, this.columns - 1 - r, i);
      }
    return this;
  }
  flipColumns() {
    const e = Math.ceil(this.rows / 2);
    for (let n = 0; n < this.columns; n++)
      for (let r = 0; r < e; r++) {
        let i = this.get(r, n), o = this.get(this.rows - 1 - r, n);
        this.set(r, n, o), this.set(this.rows - 1 - r, n, i);
      }
    return this;
  }
  kroneckerProduct(e) {
    e = D.checkMatrix(e);
    let n = this.rows, r = this.columns, i = e.rows, o = e.columns, s = new D(n * i, r * o);
    for (let l = 0; l < n; l++)
      for (let a = 0; a < r; a++)
        for (let h = 0; h < i; h++)
          for (let u = 0; u < o; u++)
            s.set(i * l + h, o * a + u, this.get(l, a) * e.get(h, u));
    return s;
  }
  kroneckerSum(e) {
    if (e = D.checkMatrix(e), !this.isSquare() || !e.isSquare())
      throw new Error("Kronecker Sum needs two Square Matrices");
    let n = this.rows, r = e.rows, i = this.kroneckerProduct(D.eye(r, r)), o = D.eye(n, n).kroneckerProduct(e);
    return i.add(o);
  }
  transpose() {
    let e = new D(this.columns, this.rows);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        e.set(r, n, this.get(n, r));
    return e;
  }
  sortRows(e = Jr) {
    for (let n = 0; n < this.rows; n++)
      this.setRow(n, this.getRow(n).sort(e));
    return this;
  }
  sortColumns(e = Jr) {
    for (let n = 0; n < this.columns; n++)
      this.setColumn(n, this.getColumn(n).sort(e));
    return this;
  }
  subMatrix(e, n, r, i) {
    Zr(this, e, n, r, i);
    let o = new D(
      n - e + 1,
      i - r + 1
    );
    for (let s = e; s <= n; s++)
      for (let l = r; l <= i; l++)
        o.set(s - e, l - r, this.get(s, l));
    return o;
  }
  subMatrixRow(e, n, r) {
    if (n === void 0 && (n = 0), r === void 0 && (r = this.columns - 1), n > r || n < 0 || n >= this.columns || r < 0 || r >= this.columns)
      throw new RangeError("Argument out of range");
    let i = new D(e.length, r - n + 1);
    for (let o = 0; o < e.length; o++)
      for (let s = n; s <= r; s++) {
        if (e[o] < 0 || e[o] >= this.rows)
          throw new RangeError(`Row index out of range: ${e[o]}`);
        i.set(o, s - n, this.get(e[o], s));
      }
    return i;
  }
  subMatrixColumn(e, n, r) {
    if (n === void 0 && (n = 0), r === void 0 && (r = this.rows - 1), n > r || n < 0 || n >= this.rows || r < 0 || r >= this.rows)
      throw new RangeError("Argument out of range");
    let i = new D(r - n + 1, e.length);
    for (let o = 0; o < e.length; o++)
      for (let s = n; s <= r; s++) {
        if (e[o] < 0 || e[o] >= this.columns)
          throw new RangeError(`Column index out of range: ${e[o]}`);
        i.set(s - n, o, this.get(s, e[o]));
      }
    return i;
  }
  setSubMatrix(e, n, r) {
    if (e = D.checkMatrix(e), e.isEmpty())
      return this;
    let i = n + e.rows - 1, o = r + e.columns - 1;
    Zr(this, n, i, r, o);
    for (let s = 0; s < e.rows; s++)
      for (let l = 0; l < e.columns; l++)
        this.set(n + s, r + l, e.get(s, l));
    return this;
  }
  selection(e, n) {
    let r = ec(this, e, n), i = new D(e.length, n.length);
    for (let o = 0; o < r.row.length; o++) {
      let s = r.row[o];
      for (let l = 0; l < r.column.length; l++) {
        let a = r.column[l];
        i.set(o, l, this.get(s, a));
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
    let e = new D(this.rows, this.columns);
    for (let n = 0; n < this.rows; n++)
      for (let r = 0; r < this.columns; r++)
        e.set(n, r, this.get(n, r));
    return e;
  }
  sum(e) {
    switch (e) {
      case "row":
        return rc(this);
      case "column":
        return ic(this);
      case void 0:
        return oc(this);
      default:
        throw new Error(`invalid option: ${e}`);
    }
  }
  product(e) {
    switch (e) {
      case "row":
        return sc(this);
      case "column":
        return lc(this);
      case void 0:
        return ac(this);
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
        return uc(this, r, i);
      }
      case "column": {
        if (!Array.isArray(i))
          throw new TypeError("mean must be an array");
        return hc(this, r, i);
      }
      case void 0: {
        if (typeof i != "number")
          throw new TypeError("mean must be a number");
        return cc(this, r, i);
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
        return fc(this, r), this;
      }
      case "column": {
        if (!Array.isArray(r))
          throw new TypeError("center must be an array");
        return dc(this, r), this;
      }
      case void 0: {
        if (typeof r != "number")
          throw new TypeError("center must be a number");
        return pc(this, r), this;
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
          r = gc(this);
        else if (!Array.isArray(r))
          throw new TypeError("scale must be an array");
        return mc(this, r), this;
      }
      case "column": {
        if (r === void 0)
          r = wc(this);
        else if (!Array.isArray(r))
          throw new TypeError("scale must be an array");
        return yc(this, r), this;
      }
      case void 0: {
        if (r === void 0)
          r = vc(this);
        else if (typeof r != "number")
          throw new TypeError("scale must be a number");
        return bc(this, r), this;
      }
      default:
        throw new Error(`invalid option: ${e}`);
    }
  }
  toString(e) {
    return Gi(this, e);
  }
}
U.prototype.klass = "Matrix";
typeof Symbol < "u" && (U.prototype[Symbol.for("nodejs.util.inspect.custom")] = Qh);
function Jr(t, e) {
  return t - e;
}
U.random = U.rand;
U.randomInt = U.randInt;
U.diagonal = U.diag;
U.prototype.diagonal = U.prototype.diag;
U.identity = U.eye;
U.prototype.negate = U.prototype.neg;
U.prototype.tensorProduct = U.prototype.kroneckerProduct;
class D extends U {
  constructor(e, n) {
    if (super(), D.isMatrix(e))
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
    return Re(this, e), this.data.splice(e, 1), this.rows -= 1, this;
  }
  addRow(e, n) {
    return n === void 0 && (n = e, e = this.rows), Re(this, e, !0), n = Float64Array.from(it(this, n)), this.data.splice(e, 0, n), this.rows += 1, this;
  }
  removeColumn(e) {
    Ce(this, e);
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
    typeof n > "u" && (n = e, e = this.columns), Ce(this, e, !0), n = ot(this, n);
    for (let r = 0; r < this.rows; r++) {
      const i = new Float64Array(this.columns + 1);
      let o = 0;
      for (; o < e; o++)
        i[o] = this.data[r][o];
      for (i[o++] = n[r]; o < this.columns + 1; o++)
        i[o] = this.data[r][o - 1];
      this.data[r] = i;
    }
    return this.columns += 1, this;
  }
}
Kh(U, D);
var _c = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function xc(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var ji = { exports: {} };
(function(t, e) {
  (function(n, r) {
    t.exports = r();
  })(_c, function() {
    function n(s) {
      s = s.replace(/,/g, " ").replace(/([^eE])-/g, "$1 -").replace(/\s*([achlmqstvzACHLMQSTVZ])\s*/g, " $1 ").replace(/\s+/g, " ").replace(/(\d*\.\d+([eE]-?\d+)?)((\.\d+)+)/g, (T, O, $, G) => O + G.replaceAll(".", " ."));
      var l = s.replace(/([achlmqstvzACHLMQSTVZ])\s?/g, "|$1").split("|"), a = l.length, h, u, p, f, m, y = [], S = [], b, d, k = 0, R = 0, v = 0, N = 0, I = 0, P = 0, F = 0, V = 0, q = 0, H = 0, J = 0, z = 0, E = 0, C = "";
      for (h = 1; h < a; h++) {
        if (u = l[h], p = u.substring(0, 1), f = p.toLowerCase(), y = u.replace(p, "").trim().split(" ").filter(function(T) {
          return T !== "";
        }), S = y, y = y.map(parseFloat), b = y.length, f === "m") {
          if (C += "M ", p === "m" ? (v += y[0], N += y[1]) : (v = y[0], N = y[1]), k = v, R = N, C += v + " " + N + " ", b > 2)
            for (d = 0; d < b; d += 2)
              p === "m" ? (v += y[d], N += y[d + 1]) : (v = y[d], N = y[d + 1]), C += "L " + v + " " + N + " ";
        } else if (f === "l")
          for (d = 0; d < b; d += 2)
            p === "l" ? (v += y[d], N += y[d + 1]) : (v = y[d], N = y[d + 1]), C += "L " + v + " " + N + " ";
        else if (f === "h")
          for (d = 0; d < b; d++)
            p === "h" ? v += y[d] : v = y[d], C += "L " + v + " " + N + " ";
        else if (f === "v")
          for (d = 0; d < b; d++)
            p === "v" ? N += y[d] : N = y[d], C += "L " + v + " " + N + " ";
        else if (f === "q")
          for (d = 0; d < b; d += 4)
            p === "q" ? (I = v + y[d], P = N + y[d + 1], v += y[d + 2], N += y[d + 3]) : (I = y[d], P = y[d + 1], v = y[d + 2], N = y[d + 3]), C += "Q " + I + " " + P + " " + v + " " + N + " ";
        else if (f === "t")
          for (d = 0; d < b; d += 2)
            ["t", "q"].indexOf(m) > -1 ? (I = v + (v - I), P = N + (N - P)) : (I = v, P = N), p === "t" ? (v += y[d], N += y[d + 1]) : (v = y[d], N = y[d + 1]), C += "Q " + I + " " + P + " " + v + " " + N + " ", m = f;
        else if (f === "c")
          for (d = 0; d < b; d += 6)
            p === "c" ? (I = v + y[d], P = N + y[d + 1], F = v + y[d + 2], V = N + y[d + 3], v += y[d + 4], N += y[d + 5]) : (I = y[d], P = y[d + 1], F = y[d + 2], V = y[d + 3], v = y[d + 4], N = y[d + 5]), C += "C " + I + " " + P + " " + F + " " + V + " " + v + " " + N + " ";
        else if (f === "s")
          for (d = 0; d < b; d += 4)
            I = v, P = N, ["s", "c"].indexOf(m) > -1 && (I += v - F, P += N - V), p === "s" ? (F = v + y[d], V = N + y[d + 1], v += y[d + 2], N += y[d + 3]) : (F = y[d], V = y[d + 1], v = y[d + 2], N = y[d + 3]), C += "C " + I + " " + P + " " + F + " " + V + " " + v + " " + N + " ";
        else if (f === "a")
          for (d = 0; d < b; d += 7) {
            q = y[d], H = y[d + 1], J = y[d + 2], z = S[d + 3];
            let T = !1;
            if (z.length > 1) {
              let O = parseInt(z[0]), $ = parseInt(z[1]), G;
              z.length > 2 && (G = parseFloat(z.substring(2))), y[d + 3] = O, y.splice(d + 4, 0, $), S.splice(d + 4, 0, "+"), G !== void 0 && y.splice(d + 5, 0, G), T = !0;
            }
            z = y[d + 3], E = T ? y[d + 4] : S[d + 4], !T && E.length > 1 && (y[d + 4] = parseInt(E[0]), y.splice(d + 5, 0, parseFloat(E.substring(1)))), E = y[d + 4], p === "a" ? (v += y[d + 5], N += y[d + 6]) : (v = y[d + 5], N = y[d + 6]), C += "A " + q + " " + H + " " + J + " " + z + " " + E + " " + v + " " + N + " ";
          }
        else f === "z" && (C += "Z ", v = k, N = R);
        m = f;
      }
      return C.trim();
    }
    function r(s) {
      var l = s.trim().split(" "), a, h = l.length, u = h - 1, p, f = [], m, y, S, b, d, k = new RegExp("[QAZLCM]", ""), R = l.slice(-1)[0].toUpperCase() === "Z";
      for (p = 0; p < h; p++)
        if (a = l[p], k.test(a)) {
          if (a === "A") {
            f.push(l[p + 5] === "0" ? "1" : "0"), f.push(l[p + 4]), f.push(l[p + 3]), f.push(l[p + 2]), f.push(l[p + 1]), f.push(a), f.push(l[p + 7]), f.push(l[p + 6]), p += 7;
            continue;
          } else if (a === "C")
            b = 3, d = 2;
          else if (a === "Q")
            b = 2, d = 1;
          else if (a === "L")
            b = 1, d = 1;
          else if (a === "M")
            b = 1, d = 0;
          else
            continue;
          for (b === d && f.push(a), S = 0; S < b; S++)
            S === d && f.push(a), m = l[++p], y = l[++p], f.push(y), f.push(m);
        } else {
          var v = l.slice(Math.max(p - 3, 0), 3).join(" ");
          throw post = l.slice(p + 1, Math.min(p + 4, u)).join(" "), range = v + " [" + a + "] " + post, "Error while trying to reverse normalized SVG path, at position " + p + " (" + range + `).
Either the path is not normalised, or it's malformed.`;
        }
      f.push("M");
      var N = "", I = f.length - 1, P;
      for (P = I; P > 0; P--)
        N += f[P] + " ";
      return R && (N += "Z"), N = N.replace(/M M/g, "Z M"), N;
    }
    function i(a, l) {
      l = parseInt(l) == l ? l : !1;
      var a = n(a), h = a.replace(/M/g, "|M").split("|"), u;
      if (h.splice(0, 1), l !== !1 && l >= h.length)
        return a;
      if (l === !1)
        h = h.map(function(f) {
          return r(f.trim());
        });
      else {
        var p = h[l];
        p && (u = r(p.trim()), h[l] = u);
      }
      return h.reverse().join(" ").replace(/ +/g, " ").trim();
    }
    var o = {
      normalize: n,
      reverseNormalized: r,
      reverse: i
    };
    return o;
  });
})(ji);
var Ec = ji.exports;
const Kr = /* @__PURE__ */ xc(Ec);
function Sc(t, e, n, r) {
  switch (t.pathType) {
    case Ee.REFLEXIVE:
      return Vi(t.source, [e / 2, n / 2], r);
    case Ee.ARC:
      return Hn(t.source, t.target, r);
    case Ee.ARCREVERSE:
      return Kr.reverse(Hn(t.source, t.target, r));
    case Ee.LINE:
      return St(t.source, t.target, r);
    case Ee.LINEREVERSE:
      return Kr.reverse(St(t.source, t.target, r));
    default:
      return "";
  }
}
function kc(t, e, n) {
  return t.id === e.id ? Ee.REFLEXIVE : n.hasBidirectionalConnection(t, e) ? ei(t, e) ? Ee.ARCREVERSE : Ee.ARC : ei(t, e) ? Ee.LINEREVERSE : Ee.LINE;
}
function St(t, e, n) {
  const r = { x: e.x - t.x, y: e.y - t.y };
  let i = Math.sqrt(r.x * r.x + r.y * r.y);
  i === 0 && (i = Number.EPSILON);
  const o = r.x / i, s = r.y / i, l = Mc(t, e, n, o, s);
  return `M${l.start.x},${l.start.y}
          L${l.end.x},${l.end.y}`;
}
function Mc(t, e, n, r, i) {
  let o, s;
  return t.props.shape === A.CIRCLE ? o = {
    x: t.x + (t.renderedSize.radius - 1) * r,
    y: t.y + (t.renderedSize.radius - 1) * i
  } : t.props.shape === A.RECTANGLE && (o = mn(
    t.x,
    t.y,
    t.renderedSize.width,
    t.renderedSize.height,
    r,
    i,
    2
  )), e instanceof pn ? s = e.props.shape === A.CIRCLE ? {
    x: e.x - (e.renderedSize.radius + n.markerPadding) * r,
    y: e.y - (e.renderedSize.radius + n.markerPadding) * i
  } : mn(
    e.x,
    e.y,
    e.renderedSize.width,
    e.renderedSize.height,
    -r,
    -i,
    -n.markerPadding + 1
  ) : s = {
    x: e.x,
    y: e.y
  }, { start: o, end: s };
}
function Hn(t, e, n) {
  const r = new D([[t.x, t.y]]), i = new D([[e.x, e.y]]), o = D.subtract(i, r), s = o.norm("frobenius"), l = o.divide(s);
  let a = t.props.shape === A.CIRCLE ? ut(10) : ut(30), h = e.props.shape === A.CIRCLE ? ut(10) : ut(30), u = 1.2 * s;
  const p = Nc(t, e, n, r, i, l, {
    start: a,
    end: h
  });
  return `M${p.start.get(0, 0)},${p.start.get(0, 1)}
          A${u},${u},0,0,1,${p.end.get(0, 0)},${p.end.get(0, 1)}`;
}
function Nc(t, e, n, r, i, o, s) {
  let l, a;
  if (t.props.shape === A.CIRCLE)
    l = de(o, -s.start).multiply(t.renderedSize.radius - 1).add(r);
  else if (t.props.shape === A.RECTANGLE) {
    const h = mn(
      t.x,
      t.y,
      t.renderedSize.width,
      t.renderedSize.height,
      o.get(0, 0),
      o.get(0, 1),
      2
    );
    l = de(o, -s.start).add([[h.x, h.y]]);
  }
  if (e.props.shape === A.CIRCLE) {
    const h = D.multiply(o, -1);
    a = de(h, s.end).multiply(e.renderedSize.radius).add(i).add(de(h, s.end).multiply(2 * n.markerBoxSize));
  } else if (e.props.shape === A.RECTANGLE) {
    const h = mn(
      e.x,
      e.y,
      e.renderedSize.width,
      e.renderedSize.height,
      -o.get(0, 0),
      -o.get(0, 1)
    ), u = D.multiply(o, -1);
    a = de(u, s.end).add([[h.x, h.y]]).add(de(u, s.end).multiply(2 * n.markerBoxSize));
  }
  return { start: l, end: a };
}
function Vi(t, e, n) {
  const r = new D([e]);
  if (t.props.shape === A.CIRCLE) {
    const i = new D([[t.x, t.y]]);
    i.get(0, 0) === r.get(0, 0) && i.get(0, 1) === r.get(0, 1) && r.add([[0, 1]]);
    const o = D.subtract(i, r), s = o.divide(o.norm("frobenius")), l = ut(40), a = de(s, l).multiply(t.renderedSize.radius - 1).add(i), h = de(s, -l).multiply(t.renderedSize.radius).add(i).add(de(s, -l).multiply(2 * n.markerBoxSize));
    return `M${a.get(0, 0)},${a.get(0, 1)}
              A${t.renderedSize.radius},${t.renderedSize.radius},0,1,0,${h.get(0, 0)},${h.get(0, 1)}`;
  } else return t.props.shape === A.RECTANGLE ? t.props.reflexiveEdgeStart == "MOVABLE" ? Tc(t, n, r) : Lc(t, n) : "";
}
function ei(t, e) {
  return t.x > e.x;
}
function Tc(t, e, n) {
  if (t.props.shape === A.RECTANGLE) {
    const r = new D([[t.x, t.y]]);
    r.get(0, 0) === n.get(0, 0) && r.get(0, 1) === n.get(0, 1) && n.add([[0, 1]]);
    const i = D.subtract(r, n), o = i.divide(i.norm("frobenius")), s = ut(45);
    let l, a, h = 0.5 * t.renderedSize.width, u = 0.5 * t.renderedSize.height;
    const p = Rc(
      i.get(0, 0),
      i.get(0, 1),
      30
    );
    if (p === Z.BOTTOMLEFT || p === Z.BOTTOMRIGHT || p === Z.TOPLEFT || p === Z.TOPRIGHT) {
      let f = Di(p, t, e);
      l = f.start, a = f.end, t.renderedSize.width > t.renderedSize.height ? (p === Z.TOPLEFT || p === Z.BOTTOMRIGHT) && (h = 0.25 * t.renderedSize.width) : t.renderedSize.height > t.renderedSize.width && (p === Z.TOPRIGHT || p === Z.BOTTOMLEFT) && (u = 0.25 * t.renderedSize.height);
    } else p === Z.LEFT || p === Z.RIGHT ? (l = de(o, s).multiply(0.5 * t.renderedSize.width - 1).add(r), a = de(o, -s).multiply(0.5 * t.renderedSize.height - 1).add(r).add(de(o, -s).multiply(2 * e.markerBoxSize))) : (l = de(o, s).multiply(0.5 * t.renderedSize.height - 1).add(r), a = de(o, -s).multiply(0.5 * t.renderedSize.width - 1).add(r).add(de(o, -s).multiply(2 * e.markerBoxSize)));
    return `M${l.get(0, 0)},${l.get(0, 1)} A${h},${u}, 0, 1, 0, ${a.get(0, 0)},${a.get(0, 1)}`;
  } else
    return "";
}
function Lc(t, e) {
  if (t.props.shape === A.RECTANGLE && t.props.reflexiveEdgeStart !== "MOVABLE") {
    let n, r, i = 0.5 * t.renderedSize.width, o = 0.5 * t.renderedSize.height;
    t.renderedSize.width > t.renderedSize.height ? (t.props.reflexiveEdgeStart === Z.TOPLEFT || t.props.reflexiveEdgeStart === Z.BOTTOMRIGHT) && (i = t.renderedSize.width / t.renderedSize.height + t.renderedSize.height) : t.renderedSize.height > t.renderedSize.width && (t.props.reflexiveEdgeStart === Z.TOPRIGHT || t.props.reflexiveEdgeStart === Z.BOTTOMLEFT) && (o = t.renderedSize.height / t.renderedSize.width + t.renderedSize.width);
    let s = Di(
      t.props.reflexiveEdgeStart,
      t,
      e
    );
    return n = s.start, r = s.end, `M${n.get(0, 0)},${n.get(0, 1)} A${i},${o}, 0, 1, 0, ${r.get(0, 0)},${r.get(0, 1)}`;
  } else
    return "";
}
function mn(t, e, n, r, i, o, s = 0) {
  const l = t - 0.5 * n, a = t + 0.5 * n, h = e - 0.5 * r, u = e + 0.5 * r;
  i === 0 && (i = Number.EPSILON), o === 0 && (o = Number.EPSILON);
  const p = i < 0 ? l : a, f = o < 0 ? h : u, m = (p - t) / i, y = (f - e) / o, S = Math.min(m, y);
  let b = t + S * i, d = e + S * o;
  if (s !== 0)
    if (m < y) {
      let k;
      p === l ? k = 1 : k = -1, b = b + s * k;
    } else {
      let k;
      f === h ? k = 1 : k = -1, d = d + s * k;
    }
  return { x: b, y: d };
}
function Rc(t, e, n = 30) {
  let r = Cc(Math.atan2(t, e));
  return r < 0 && (r += 360), Ze(r, 0, n) ? Z.BOTTOMLEFT : Ze(r, [0, 90], -n) ? Z.BOTTOM : Ze(r, 90, n) ? Z.BOTTOMRIGHT : Ze(r, [90, 180], -n) ? Z.RIGHT : Ze(r, 180, n) ? Z.TOPRIGHT : Ze(r, [180, 270], -n) ? Z.TOP : Ze(r, 270, n) ? Z.TOPLEFT : Z.LEFT;
}
function Di(t, e, n) {
  const r = e.x, i = e.y, o = 0.5 * e.renderedSize.width, s = 0.5 * e.renderedSize.height, l = n.markerBoxSize, a = {
    [Z.BOTTOMLEFT]: {
      start: [r - o + 2, i + s - 1],
      end: [r + o - 2 * l, i + s + 2 * l]
    },
    [Z.BOTTOM]: {
      start: [r + 0.5 * o, i + s - 1],
      end: [r + o + 2 * l, i + 0.5 * s]
    },
    [Z.BOTTOMRIGHT]: {
      start: [r + o - 2, i + s - 1],
      end: [r + o + 2 * l, i - s + 2 * l]
    },
    [Z.RIGHT]: {
      start: [r + o - 1, i + 0.5 * s],
      end: [r + 0.5 * o, i - 2 * l]
    },
    [Z.TOPRIGHT]: {
      start: [r + o - 2, i - s + 1],
      end: [r - o + 2 * l, i - s - 2 * l]
    },
    [Z.TOP]: {
      start: [r + 0.5 * o, i + 1],
      end: [r - 2 * l, i + 0.5 * s]
    },
    [Z.TOPLEFT]: {
      start: [r - o + 2, i - s + 1],
      end: [r - o - 2 * l, i + s - 2 * l]
    },
    [Z.LEFT]: {
      start: [r + 1, i + 0.5 * s],
      end: [r + 0.5 * o, i + s + 2 * l]
    }
  }, { start: h, end: u } = a[t];
  return {
    start: new D([h]),
    end: new D([u])
  };
}
function Ze(t, e, n = 0) {
  t = (t + 360) % 360;
  let r, i;
  return typeof e == "number" ? (r = (e - n + 360) % 360, i = (e + n) % 360) : (r = (e[0] - n + 360) % 360, i = (e[1] + n) % 360), r < i ? t >= r && t <= i : t >= r || t <= i;
}
function ut(t) {
  return t * (Math.PI / 180);
}
function Cc(t) {
  return t * (180 / Math.PI);
}
function de(t, e) {
  const n = t.get(0, 0), r = t.get(0, 1);
  return new D([
    [
      n * Math.cos(e) - r * Math.sin(e),
      n * Math.sin(e) + r * Math.cos(e)
    ]
  ]);
}
function Ic(t) {
  const e = t.replace(/\r\n/g, `
`).split(`
`), n = e.findIndex((l) => l.trim().startsWith("#")), r = n !== -1 ? e.slice(0, n) : e, i = n !== -1 ? e.slice(n + 1) : [], o = [];
  if (r.length)
    for (const l of r) {
      let [, a, h, u] = (l.match(/(\w+) (.*) \/COLOR:\/(.+)/) || l.match(/(\w+) (.*)/) || l.match(/(\w+)/) || []).map((p) => p.trim());
      h != null && h.includes("/COLOR:/") && (u = h, h = ""), a && o.push({
        idImported: a,
        label: h,
        color: u == null ? void 0 : u.replace("/COLOR:/", "")
      });
    }
  const s = [];
  if (i.length)
    for (const l of i) {
      let [, a, h, u, p] = (l.match(/(\w+) (\w+) (.*) \/COLOR:\/(.+)/) || l.match(/(\w+) (\w+) (.*)/) || l.match(/(\w+) (\w+)/) || []).map((f) => f.trim());
      u != null && u.includes("/COLOR:/") && (p = u, u = ""), a && h && s.push({
        sourceIdImported: a,
        targetIdImported: h,
        label: u,
        color: p == null ? void 0 : p.replace("/COLOR:/", "")
      });
    }
  return [o, s];
}
function Pc(t) {
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
const Oc = {
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
}, qi = {
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
}, ie = {
  tablet: "tablet",
  mobile: "mobile",
  desktop: "desktop",
  tv: "tv"
}, fe = {
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
}, Ue = {
  EdgeHTML: "EdgeHTML",
  Blink: "Blink",
  Trident: "Trident",
  Presto: "Presto",
  Gecko: "Gecko",
  WebKit: "WebKit"
};
class L {
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
    const i = L.getVersionPrecision(e), o = L.getVersionPrecision(n);
    let s = Math.max(i, o), l = 0;
    const a = L.map([e, n], (h) => {
      const u = s - L.getVersionPrecision(h), p = h + new Array(u + 1).join(".0");
      return L.map(p.split("."), (f) => new Array(20 - f.length).join("0") + f).reverse();
    });
    for (r && (l = s - Math.min(i, o)), s -= 1; s >= l; ) {
      if (a[0][s] > a[1][s])
        return 1;
      if (a[0][s] === a[1][s]) {
        if (s === l)
          return 0;
        s -= 1;
      } else if (a[0][s] < a[1][s])
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
      const o = e[r];
      if (n(o, r))
        return o;
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
    let i, o;
    if (Object.assign)
      return Object.assign(e, ...n);
    for (i = 0, o = n.length; i < o; i += 1) {
      const s = n[i];
      typeof s == "object" && s !== null && Object.keys(s).forEach((a) => {
        r[a] = s[a];
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
    return Oc[e];
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
    return qi[e] || "";
  }
}
const ee = /version\/(\d+(\.?_?\d+)+)/i, $c = [
  /* Googlebot */
  {
    test: [/googlebot/i],
    describe(t) {
      const e = {
        name: "Googlebot"
      }, n = L.getFirstMatch(/googlebot\/(\d+(\.\d+))/i, t) || L.getFirstMatch(ee, t);
      return n && (e.version = n), e;
    }
  },
  /* Opera < 13.0 */
  {
    test: [/opera/i],
    describe(t) {
      const e = {
        name: "Opera"
      }, n = L.getFirstMatch(ee, t) || L.getFirstMatch(/(?:opera)[\s/](\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  /* Opera > 13.0 */
  {
    test: [/opr\/|opios/i],
    describe(t) {
      const e = {
        name: "Opera"
      }, n = L.getFirstMatch(/(?:opr|opios)[\s/](\S+)/i, t) || L.getFirstMatch(ee, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/SamsungBrowser/i],
    describe(t) {
      const e = {
        name: "Samsung Internet for Android"
      }, n = L.getFirstMatch(ee, t) || L.getFirstMatch(/(?:SamsungBrowser)[\s/](\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/Whale/i],
    describe(t) {
      const e = {
        name: "NAVER Whale Browser"
      }, n = L.getFirstMatch(ee, t) || L.getFirstMatch(/(?:whale)[\s/](\d+(?:\.\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/MZBrowser/i],
    describe(t) {
      const e = {
        name: "MZ Browser"
      }, n = L.getFirstMatch(/(?:MZBrowser)[\s/](\d+(?:\.\d+)+)/i, t) || L.getFirstMatch(ee, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/focus/i],
    describe(t) {
      const e = {
        name: "Focus"
      }, n = L.getFirstMatch(/(?:focus)[\s/](\d+(?:\.\d+)+)/i, t) || L.getFirstMatch(ee, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/swing/i],
    describe(t) {
      const e = {
        name: "Swing"
      }, n = L.getFirstMatch(/(?:swing)[\s/](\d+(?:\.\d+)+)/i, t) || L.getFirstMatch(ee, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/coast/i],
    describe(t) {
      const e = {
        name: "Opera Coast"
      }, n = L.getFirstMatch(ee, t) || L.getFirstMatch(/(?:coast)[\s/](\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/opt\/\d+(?:.?_?\d+)+/i],
    describe(t) {
      const e = {
        name: "Opera Touch"
      }, n = L.getFirstMatch(/(?:opt)[\s/](\d+(\.?_?\d+)+)/i, t) || L.getFirstMatch(ee, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/yabrowser/i],
    describe(t) {
      const e = {
        name: "Yandex Browser"
      }, n = L.getFirstMatch(/(?:yabrowser)[\s/](\d+(\.?_?\d+)+)/i, t) || L.getFirstMatch(ee, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/ucbrowser/i],
    describe(t) {
      const e = {
        name: "UC Browser"
      }, n = L.getFirstMatch(ee, t) || L.getFirstMatch(/(?:ucbrowser)[\s/](\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/Maxthon|mxios/i],
    describe(t) {
      const e = {
        name: "Maxthon"
      }, n = L.getFirstMatch(ee, t) || L.getFirstMatch(/(?:Maxthon|mxios)[\s/](\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/epiphany/i],
    describe(t) {
      const e = {
        name: "Epiphany"
      }, n = L.getFirstMatch(ee, t) || L.getFirstMatch(/(?:epiphany)[\s/](\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/puffin/i],
    describe(t) {
      const e = {
        name: "Puffin"
      }, n = L.getFirstMatch(ee, t) || L.getFirstMatch(/(?:puffin)[\s/](\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/sleipnir/i],
    describe(t) {
      const e = {
        name: "Sleipnir"
      }, n = L.getFirstMatch(ee, t) || L.getFirstMatch(/(?:sleipnir)[\s/](\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/k-meleon/i],
    describe(t) {
      const e = {
        name: "K-Meleon"
      }, n = L.getFirstMatch(ee, t) || L.getFirstMatch(/(?:k-meleon)[\s/](\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/micromessenger/i],
    describe(t) {
      const e = {
        name: "WeChat"
      }, n = L.getFirstMatch(/(?:micromessenger)[\s/](\d+(\.?_?\d+)+)/i, t) || L.getFirstMatch(ee, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/qqbrowser/i],
    describe(t) {
      const e = {
        name: /qqbrowserlite/i.test(t) ? "QQ Browser Lite" : "QQ Browser"
      }, n = L.getFirstMatch(/(?:qqbrowserlite|qqbrowser)[/](\d+(\.?_?\d+)+)/i, t) || L.getFirstMatch(ee, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/msie|trident/i],
    describe(t) {
      const e = {
        name: "Internet Explorer"
      }, n = L.getFirstMatch(/(?:msie |rv:)(\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/\sedg\//i],
    describe(t) {
      const e = {
        name: "Microsoft Edge"
      }, n = L.getFirstMatch(/\sedg\/(\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/edg([ea]|ios)/i],
    describe(t) {
      const e = {
        name: "Microsoft Edge"
      }, n = L.getSecondMatch(/edg([ea]|ios)\/(\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/vivaldi/i],
    describe(t) {
      const e = {
        name: "Vivaldi"
      }, n = L.getFirstMatch(/vivaldi\/(\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/seamonkey/i],
    describe(t) {
      const e = {
        name: "SeaMonkey"
      }, n = L.getFirstMatch(/seamonkey\/(\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/sailfish/i],
    describe(t) {
      const e = {
        name: "Sailfish"
      }, n = L.getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/silk/i],
    describe(t) {
      const e = {
        name: "Amazon Silk"
      }, n = L.getFirstMatch(/silk\/(\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/phantom/i],
    describe(t) {
      const e = {
        name: "PhantomJS"
      }, n = L.getFirstMatch(/phantomjs\/(\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/slimerjs/i],
    describe(t) {
      const e = {
        name: "SlimerJS"
      }, n = L.getFirstMatch(/slimerjs\/(\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/blackberry|\bbb\d+/i, /rim\stablet/i],
    describe(t) {
      const e = {
        name: "BlackBerry"
      }, n = L.getFirstMatch(ee, t) || L.getFirstMatch(/blackberry[\d]+\/(\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/(web|hpw)[o0]s/i],
    describe(t) {
      const e = {
        name: "WebOS Browser"
      }, n = L.getFirstMatch(ee, t) || L.getFirstMatch(/w(?:eb)?[o0]sbrowser\/(\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/bada/i],
    describe(t) {
      const e = {
        name: "Bada"
      }, n = L.getFirstMatch(/dolfin\/(\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/tizen/i],
    describe(t) {
      const e = {
        name: "Tizen"
      }, n = L.getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.?_?\d+)+)/i, t) || L.getFirstMatch(ee, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/qupzilla/i],
    describe(t) {
      const e = {
        name: "QupZilla"
      }, n = L.getFirstMatch(/(?:qupzilla)[\s/](\d+(\.?_?\d+)+)/i, t) || L.getFirstMatch(ee, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/firefox|iceweasel|fxios/i],
    describe(t) {
      const e = {
        name: "Firefox"
      }, n = L.getFirstMatch(/(?:firefox|iceweasel|fxios)[\s/](\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/electron/i],
    describe(t) {
      const e = {
        name: "Electron"
      }, n = L.getFirstMatch(/(?:electron)\/(\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/MiuiBrowser/i],
    describe(t) {
      const e = {
        name: "Miui"
      }, n = L.getFirstMatch(/(?:MiuiBrowser)[\s/](\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/chromium/i],
    describe(t) {
      const e = {
        name: "Chromium"
      }, n = L.getFirstMatch(/(?:chromium)[\s/](\d+(\.?_?\d+)+)/i, t) || L.getFirstMatch(ee, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/chrome|crios|crmo/i],
    describe(t) {
      const e = {
        name: "Chrome"
      }, n = L.getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  {
    test: [/GSA/i],
    describe(t) {
      const e = {
        name: "Google Search"
      }, n = L.getFirstMatch(/(?:GSA)\/(\d+(\.?_?\d+)+)/i, t);
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
      }, n = L.getFirstMatch(ee, t);
      return n && (e.version = n), e;
    }
  },
  /* PlayStation 4 */
  {
    test: [/playstation 4/i],
    describe(t) {
      const e = {
        name: "PlayStation 4"
      }, n = L.getFirstMatch(ee, t);
      return n && (e.version = n), e;
    }
  },
  /* Safari */
  {
    test: [/safari|applewebkit/i],
    describe(t) {
      const e = {
        name: "Safari"
      }, n = L.getFirstMatch(ee, t);
      return n && (e.version = n), e;
    }
  },
  /* Something else */
  {
    test: [/.*/i],
    describe(t) {
      const e = /^(.*)\/(.*) /, n = /^(.*)\/(.*)[ \t]\((.*)/, i = t.search("\\(") !== -1 ? n : e;
      return {
        name: L.getFirstMatch(i, t),
        version: L.getSecondMatch(i, t)
      };
    }
  }
], zc = [
  /* Roku */
  {
    test: [/Roku\/DVP/],
    describe(t) {
      const e = L.getFirstMatch(/Roku\/DVP-(\d+\.\d+)/i, t);
      return {
        name: fe.Roku,
        version: e
      };
    }
  },
  /* Windows Phone */
  {
    test: [/windows phone/i],
    describe(t) {
      const e = L.getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i, t);
      return {
        name: fe.WindowsPhone,
        version: e
      };
    }
  },
  /* Windows */
  {
    test: [/windows /i],
    describe(t) {
      const e = L.getFirstMatch(/Windows ((NT|XP)( \d\d?.\d)?)/i, t), n = L.getWindowsVersionName(e);
      return {
        name: fe.Windows,
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
        name: fe.iOS
      }, n = L.getSecondMatch(/(Version\/)(\d[\d.]+)/, t);
      return n && (e.version = n), e;
    }
  },
  /* macOS */
  {
    test: [/macintosh/i],
    describe(t) {
      const e = L.getFirstMatch(/mac os x (\d+(\.?_?\d+)+)/i, t).replace(/[_\s]/g, "."), n = L.getMacOSVersionName(e), r = {
        name: fe.MacOS,
        version: e
      };
      return n && (r.versionName = n), r;
    }
  },
  /* iOS */
  {
    test: [/(ipod|iphone|ipad)/i],
    describe(t) {
      const e = L.getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i, t).replace(/[_\s]/g, ".");
      return {
        name: fe.iOS,
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
      const e = L.getFirstMatch(/android[\s/-](\d+(\.\d+)*)/i, t), n = L.getAndroidVersionName(e), r = {
        name: fe.Android,
        version: e
      };
      return n && (r.versionName = n), r;
    }
  },
  /* WebOS */
  {
    test: [/(web|hpw)[o0]s/i],
    describe(t) {
      const e = L.getFirstMatch(/(?:web|hpw)[o0]s\/(\d+(\.\d+)*)/i, t), n = {
        name: fe.WebOS
      };
      return e && e.length && (n.version = e), n;
    }
  },
  /* BlackBerry */
  {
    test: [/blackberry|\bbb\d+/i, /rim\stablet/i],
    describe(t) {
      const e = L.getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i, t) || L.getFirstMatch(/blackberry\d+\/(\d+([_\s]\d+)*)/i, t) || L.getFirstMatch(/\bbb(\d+)/i, t);
      return {
        name: fe.BlackBerry,
        version: e
      };
    }
  },
  /* Bada */
  {
    test: [/bada/i],
    describe(t) {
      const e = L.getFirstMatch(/bada\/(\d+(\.\d+)*)/i, t);
      return {
        name: fe.Bada,
        version: e
      };
    }
  },
  /* Tizen */
  {
    test: [/tizen/i],
    describe(t) {
      const e = L.getFirstMatch(/tizen[/\s](\d+(\.\d+)*)/i, t);
      return {
        name: fe.Tizen,
        version: e
      };
    }
  },
  /* Linux */
  {
    test: [/linux/i],
    describe() {
      return {
        name: fe.Linux
      };
    }
  },
  /* Chrome OS */
  {
    test: [/CrOS/],
    describe() {
      return {
        name: fe.ChromeOS
      };
    }
  },
  /* Playstation 4 */
  {
    test: [/PlayStation 4/],
    describe(t) {
      const e = L.getFirstMatch(/PlayStation 4[/\s](\d+(\.\d+)*)/i, t);
      return {
        name: fe.PlayStation4,
        version: e
      };
    }
  }
], Ac = [
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
      const e = L.getFirstMatch(/(can-l01)/i, t) && "Nova", n = {
        type: ie.mobile,
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
        type: ie.tablet,
        vendor: "Nexus"
      };
    }
  },
  /* iPad */
  {
    test: [/ipad/i],
    describe() {
      return {
        type: ie.tablet,
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
        type: ie.tablet,
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
        type: ie.tablet,
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
        type: ie.tablet,
        vendor: "Amazon"
      };
    }
  },
  /* Tablet */
  {
    test: [/tablet(?! pc)/i],
    describe() {
      return {
        type: ie.tablet
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
      const e = L.getFirstMatch(/(ipod|iphone)/i, t);
      return {
        type: ie.mobile,
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
        type: ie.mobile,
        vendor: "Nexus"
      };
    }
  },
  /* Mobile */
  {
    test: [/[^-]mobi/i],
    describe() {
      return {
        type: ie.mobile
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
        type: ie.mobile,
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
        type: ie.mobile
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
        type: ie.mobile,
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
        type: ie.tablet
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
        type: ie.mobile
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
        type: ie.desktop,
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
        type: ie.desktop
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
        type: ie.desktop
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
        type: ie.tv
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
        type: ie.tv
      };
    }
  }
], Bc = [
  /* EdgeHTML */
  {
    test(t) {
      return t.getBrowserName(!0) === "microsoft edge";
    },
    describe(t) {
      if (/\sedg\//i.test(t))
        return {
          name: Ue.Blink
        };
      const n = L.getFirstMatch(/edge\/(\d+(\.?_?\d+)+)/i, t);
      return {
        name: Ue.EdgeHTML,
        version: n
      };
    }
  },
  /* Trident */
  {
    test: [/trident/i],
    describe(t) {
      const e = {
        name: Ue.Trident
      }, n = L.getFirstMatch(/trident\/(\d+(\.?_?\d+)+)/i, t);
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
        name: Ue.Presto
      }, n = L.getFirstMatch(/presto\/(\d+(\.?_?\d+)+)/i, t);
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
        name: Ue.Gecko
      }, n = L.getFirstMatch(/gecko\/(\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  },
  /* Blink */
  {
    test: [/(apple)?webkit\/537\.36/i],
    describe() {
      return {
        name: Ue.Blink
      };
    }
  },
  /* WebKit */
  {
    test: [/(apple)?webkit/i],
    describe(t) {
      const e = {
        name: Ue.WebKit
      }, n = L.getFirstMatch(/webkit\/(\d+(\.?_?\d+)+)/i, t);
      return n && (e.version = n), e;
    }
  }
];
class ti {
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
    const e = L.find($c, (n) => {
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
    const e = L.find(zc, (n) => {
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
    const e = L.find(Ac, (n) => {
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
    const e = L.find(Bc, (n) => {
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
    return L.assign({}, this.parsedResult);
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
    let o = 0;
    if (Object.keys(e).forEach((l) => {
      const a = e[l];
      typeof a == "string" ? (i[l] = a, o += 1) : typeof a == "object" && (n[l] = a, r += 1);
    }), r > 0) {
      const l = Object.keys(n), a = L.find(l, (u) => this.isOS(u));
      if (a) {
        const u = this.satisfies(n[a]);
        if (u !== void 0)
          return u;
      }
      const h = L.find(
        l,
        (u) => this.isPlatform(u)
      );
      if (h) {
        const u = this.satisfies(n[h]);
        if (u !== void 0)
          return u;
      }
    }
    if (o > 0) {
      const l = Object.keys(i), a = L.find(l, (h) => this.isBrowser(h, !0));
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
    const o = L.getBrowserTypeByAlias(i);
    return n && o && (i = o.toLowerCase()), i === r;
  }
  compareVersion(e) {
    let n = [0], r = e, i = !1;
    const o = this.getBrowserVersion();
    if (typeof o == "string")
      return e[0] === ">" || e[0] === "<" ? (r = e.substr(1), e[1] === "=" ? (i = !0, r = e.substr(2)) : n = [], e[0] === ">" ? n.push(1) : n.push(-1)) : e[0] === "=" ? r = e.substr(1) : e[0] === "~" && (i = !0, r = e.substr(1)), n.indexOf(
        L.compareVersions(o, r, i)
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
class Fc {
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
    return new ti(e, n);
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
    return new ti(e).getResult();
  }
  static get BROWSER_MAP() {
    return qi;
  }
  static get ENGINE_MAP() {
    return Ue;
  }
  static get OS_MAP() {
    return fe;
  }
  static get PLATFORMS_MAP() {
    return ie;
  }
}
const Gc = /* @__PURE__ */ ni({
  __name: "GraphComponent",
  setup(t, { expose: e }) {
    const n = xr(() => {
      const c = document.querySelectorAll("graph-component");
      let w;
      for (let g = 0; g < c.length; g++) {
        const x = c[g], _ = Y(x.shadowRoot);
        let M;
        if (_.empty() ? M = Y(
          ".graph-controller__graph-host.uninitialised"
        ) : M = _.select(
          ".graph-controller__graph-host.uninitialised"
        ), !M.empty()) {
          M.classed("uninitialised", !1), w = M;
          break;
        }
      }
      return w === void 0 && (w = Y(
        ".graph-controller__graph-host.uninitialised"
      ), w.classed("uninitialised", !1)), w;
    }), r = xr(() => {
      let c = n.value.node().parentElement;
      c || (c = n.value.node().getRootNode().host);
      let w = c.getAttribute("id");
      return w || "gc";
    });
    So(() => {
      rr(), window.addEventListener("resize", wr);
    }), ko(() => {
      window.removeEventListener("resize", wr);
    });
    const o = Fc.getParser(window.navigator.userAgent).getPlatformType(!0);
    let s = !1, l = { x: -1e5, y: -1e5 };
    const a = Er(new Xr()), h = Er(!1), u = Mo(new ph());
    let p, f = 400, m = 400, y, S, b, d, k, R, v, N, I, P = 0, F = 0, V = 1, q, H, J;
    e({
      setDefaults: z,
      getGraph: E,
      setGraph: C,
      printGraph: T,
      deleteElement: O,
      setLabel: $,
      setColor: G,
      setNodeSize: W,
      getNodeSize: B,
      setNodeShape: K,
      setNodeProps: le,
      setDeletable: te,
      setLabelEditable: ne,
      setNodesLinkPermission: ae,
      setNodesFixedPosition: oe,
      setEditability: ue,
      toggleNodeLabels: Ot,
      toggleLinkLabels: Xe,
      toggleZoom: $t,
      toggleNodePhysics: Me,
      toggleFixedLinkDistance: We,
      toggleNodeCreationViaGUI: zt,
      toggleNodeAutoGrow: At,
      resetView: Ft,
      setNodeGroupsFn: _n,
      createNode: Xi,
      getNodeFixedPosition: yo,
      setNodeFixedPosition: vo,
      setNodePosition: bo,
      centerView: _o
    });
    function z(c) {
      c.zoomEnabled !== void 0 && $t(c.zoomEnabled), c.nodePhysicsEnabled !== void 0 && Me(c.nodePhysicsEnabled), c.fixedLinkDistanceEnabled !== void 0 && We(c.fixedLinkDistanceEnabled), c.showNodeLabels !== void 0 && Ot(c.showNodeLabels), c.showLinkLabels !== void 0 && Xe(c.showLinkLabels), c.nodeAutoGrowToLabelSize !== void 0 && At(c.nodeAutoGrowToLabelSize), c.allowNodeCreationViaGUI !== void 0 && zt(c.allowNodeCreationViaGUI), u.nodeProps = c.nodeProps ?? u.nodeProps, u.nodeGUIEditability = c.nodeGUIEditability ?? u.nodeGUIEditability, u.linkGUIEditability = c.linkGUIEditability ?? u.linkGUIEditability, se();
    }
    function E(c = "json", w = !0, g = !0, x = !0, _ = !0, M = !0) {
      if (c.toLowerCase() === "json")
        return JSON.parse(
          a.value.toJSON(
            w,
            u.showNodeLabels,
            u.showLinkLabels,
            g,
            x,
            x,
            _,
            _,
            M
          )
        );
      if (c.toLowerCase() === "tgf")
        return a.value.toTGF(u.showNodeLabels, u.showLinkLabels, !0, !0);
      console.error('Invalid format while using getGraph(). Please choose "JSON" or "TGF".');
    }
    function C(c) {
      typeof c == "object" || typeof c == "string" ? mo(c) : yr();
    }
    function T(c = "json", w = !0, g = !0, x = !0, _ = !0, M = !0) {
      c.toLowerCase() === "json" ? console.log(
        a.value.toJSON(
          w,
          u.showNodeLabels,
          u.showLinkLabels,
          g,
          x,
          x,
          _,
          _,
          M
        )
      ) : console.log(a.value.toTGF(u.showNodeLabels, u.showLinkLabels));
    }
    function O(c) {
      if (c !== void 0) {
        const [w, g] = Te(c);
        for (const x of w)
          k.filter((_) => _.id === x).each(function(_) {
            let M = a.value.removeNode(_);
            if (M !== void 0) {
              let [j, Q] = M;
              Xt(j, n.value, he.PROGRAMMATIC_ACTION), Q.forEach((X) => {
                Qe(X, n.value, he.PROGRAMMATIC_ACTION);
              });
            }
          });
        for (const x of g)
          d.filter((_) => _.id === x).each(function(_) {
            let M = a.value.removeLink(_);
            M !== void 0 && Qe(M, n.value, he.PROGRAMMATIC_ACTION);
          });
      } else
        k.each(function(w) {
          let g = a.value.removeNode(w);
          if (g !== void 0) {
            let [x, _] = g;
            Xt(x, n.value, he.PROGRAMMATIC_ACTION), _.forEach((M) => {
              Qe(M, n.value, he.PROGRAMMATIC_ACTION);
            });
          }
        }), d.each(function(w) {
          let g = a.value.removeLink(w);
          g !== void 0 && Qe(g, n.value, he.PROGRAMMATIC_ACTION);
        });
      h.value = a.value.nodes.length > 0, se();
    }
    function $(c, w) {
      if (w !== void 0) {
        const [g, x] = Te(w);
        for (const _ of g)
          k.filter((M) => M.id === _).each((M) => {
            pt(M, c);
          });
        for (const _ of x)
          d.filter((M) => M.id === _).each((M) => {
            pt(M, c);
          });
      } else
        k.each((g) => {
          pt(g, c);
        }), d.each((g) => {
          pt(g, c);
        });
    }
    function G(c, w) {
      if (w !== void 0) {
        const [g, x] = Te(w);
        mr(x);
        for (const _ of g)
          k.selectAll(".graph-controller__node").filter((M) => M.id === _).each((M) => M.color = c).style("fill", c);
        for (const _ of x)
          d.selectAll(".graph-controller__link").filter((M) => M.id === _).each((M) => M.color = c).style("stroke", c);
      } else
        k.selectAll(".graph-controller__node").each((g) => g.color = c).style("fill", c), mr(a.value.links.map((g) => g.id)), d.selectAll(".graph-controller__link").each((g) => g.color = c).style("stroke", c);
      qn(b, r.value, u, c), se();
    }
    function B(c) {
      return Gt(c).getSize();
    }
    function W(c, w) {
      if (w !== void 0) {
        const [g] = Te(w);
        for (const x of g)
          k.filter((_) => _.id === x).each(function(_) {
            let M, j;
            u.nodeAutoGrowToLabelSize && (M = Y(this).select("foreignObject").select("div").node().getBoundingClientRect()), typeof c == "number" ? (_.setSize(c, u), u.nodeAutoGrowToLabelSize && M ? j = M : j = { width: 0, height: 0 }, ye(_, j)) : _.props.shape === A.CIRCLE && He(["radius"], Object.keys(c), !0) ? (_.setSize(c, u), u.nodeAutoGrowToLabelSize && M ? j = M : j = { width: 0, height: 0 }, ye(_, j)) : _.props.shape === A.RECTANGLE && He(["width", "height"], Object.keys(c), !0) && (_.setSize(c, u), u.nodeAutoGrowToLabelSize && M ? j = M : j = { width: 0, height: 0 }, ye(_, j));
          });
      } else
        k.each(function(g) {
          let x, _;
          u.nodeAutoGrowToLabelSize && (x = Y(this).select("foreignObject").select("div").node().getBoundingClientRect()), typeof c == "number" ? (g.setSize(c, u), u.nodeAutoGrowToLabelSize && x ? _ = x : _ = { width: 0, height: 0 }, ye(g, _)) : g.props.shape === A.CIRCLE && He(["radius"], Object.keys(c), !1) ? (g.setSize(c, u), u.nodeAutoGrowToLabelSize && x ? _ = x : _ = { width: 0, height: 0 }, ye(g, _)) : g.props.shape === A.RECTANGLE && He(["width", "height"], Object.keys(c), !1) && (g.setSize(c, u), u.nodeAutoGrowToLabelSize && x ? _ = x : _ = { width: 0, height: 0 }, ye(g, _));
        });
      se();
    }
    function K(c, w) {
      if (w !== void 0) {
        const [g] = Te(w);
        for (const x of g)
          k.filter((_) => _.id === x).each(function(_) {
            if (_.props.shape !== c) {
              let M, j;
              u.nodeAutoGrowToLabelSize && (M = Y(this).select("foreignObject").select("div").node(), j = M.getBoundingClientRect()), _.setShape(c, u), u.nodeAutoGrowToLabelSize && j && ye(_, j);
            }
          });
      } else
        k.each(function(g) {
          if (g.props.shape !== c) {
            let x, _;
            u.nodeAutoGrowToLabelSize && (x = Y(this).select("foreignObject").select("div").node(), _ = x.getBoundingClientRect()), g.setShape(c, u), u.nodeAutoGrowToLabelSize && _ && ye(g, _);
          }
        });
      se();
    }
    function le(c, w) {
      if (He(["shape"], Object.keys(c), !1)) {
        let g;
        if (w !== void 0 ? [g] = Te(w) : g = void 0, c.shape === A.CIRCLE) {
          const x = ["shape", "radius"];
          if (He(x, Object.keys(c), !0))
            if (g !== void 0)
              for (const _ of g)
                k.filter((M) => M.id === _).each(function(M) {
                  M.props = c;
                  let j;
                  if (u.nodeAutoGrowToLabelSize) {
                    let Q, X;
                    Q = Y(this).select("foreignObject").select("div").node(), X = Q.getBoundingClientRect(), j = X;
                  } else
                    j = { width: 0, height: 0 };
                  ye(M, j);
                });
            else
              k.each(function(_) {
                _.props = c;
                let M;
                if (u.nodeAutoGrowToLabelSize) {
                  let j, Q;
                  j = Y(this).select("foreignObject").select("div").node(), Q = j.getBoundingClientRect(), M = Q;
                } else
                  M = { width: 0, height: 0 };
                ye(_, M);
              });
          xt(x, Object.keys(c));
        } else if (c.shape === A.RECTANGLE) {
          const x = [
            "shape",
            "width",
            "height",
            "cornerRadius",
            "reflexiveEdgeStart"
          ];
          if (He(x, Object.keys(c), !0)) {
            if (Object.values(Z).includes(c.reflexiveEdgeStart) || c.reflexiveEdgeStart === "MOVABLE")
              if (g !== void 0)
                for (const _ of g)
                  k.filter((M) => M.id === _).each(function(M) {
                    M.props = c;
                    let j;
                    if (u.nodeAutoGrowToLabelSize) {
                      let Q, X;
                      Q = Y(this).select("foreignObject").select("div").node(), X = Q.getBoundingClientRect(), j = X;
                    } else
                      j = { width: 0, height: 0 };
                    ye(M, j);
                  });
              else
                k.each(function(_) {
                  _.props = c;
                  let M;
                  if (u.nodeAutoGrowToLabelSize) {
                    let j, Q;
                    j = Y(this).select("foreignObject").select("div").node(), Q = j.getBoundingClientRect(), M = Q;
                  } else
                    M = { width: 0, height: 0 };
                  ye(_, M);
                });
          } else
            at(
              "Invalid reflexiveEdgeStart Value",
              "Use RIGHT, BOTTOMRIGHT, BOTTOM, BOTTOMLEFT, LEFT, TOPLEFT, TOP, TOPRIGHT or MOVABLE."
            );
          xt(x, Object.keys(c));
        }
        se();
      } else
        at(
          "Invalid NodeProps Object",
          `For circular nodes: {shape: NodeShape, radius: number}
For rectangular nodes: {shape: 'rect', width: number, height: number, cornerRadius: number, reflexiveEdgeStart: SideType | 'MOVABLE'}`
        );
    }
    function te(c, w) {
      if (w !== void 0) {
        const [g, x] = Te(w);
        for (const _ of g)
          k.filter((M) => M.id === _).each((M) => {
            M.deletable = c;
          });
        for (const _ of x)
          d.filter((M) => M.id === _).each((M) => {
            M.deletable = c;
          });
      } else
        k.each((g) => {
          g.deletable = c;
        }), d.each((g) => {
          g.deletable = c;
        });
    }
    function ne(c, w) {
      if (w !== void 0) {
        const [g, x] = Te(w);
        for (const _ of g)
          k.filter((M) => M.id === _).each((M) => {
            M.labelEditable = c;
          });
        for (const _ of x)
          d.filter((M) => M.id === _).each((M) => {
            M.labelEditable = c;
          });
      } else
        k.each((g) => {
          g.labelEditable = c;
        }), d.each((g) => {
          g.labelEditable = c;
        });
    }
    function ae(c, w, g) {
      if (g !== void 0) {
        const [x] = Te(g);
        for (const _ of x)
          k.filter((M) => M.id === _).each((M) => {
            M.allowIncomingLinks = c, M.allowOutgoingLinks = w;
          });
      } else
        k.each((x) => {
          x.allowIncomingLinks = c, x.allowOutgoingLinks = w;
        });
    }
    function oe(c, w) {
      if (w !== void 0) {
        const [g] = Te(w);
        for (const x of g)
          k.filter((_) => _.id === x).each((_) => {
            Yt(_, c);
          });
      } else
        k.each((g) => {
          Yt(g, c);
        });
    }
    function ue(c, w) {
      const g = [
        "fixedPosition",
        "deletable",
        "labelEditable",
        "allowIncomingLinks",
        "allowOutgoingLinks"
      ], x = ["deletable", "labelEditable"];
      if (w !== void 0) {
        const [_, M] = Te(w), j = _.length === 0;
        for (const Q of _)
          k.filter((X) => X.id === Q).each(function(X) {
            X.deletable = c.deletable ?? X.deletable, X.labelEditable = c.labelEditable ?? X.labelEditable, "fixedPosition" in c && Yt(X, c.fixedPosition), "allowIncomingLinks" in c && (X.allowIncomingLinks = c.allowIncomingLinks ?? X.allowIncomingLinks), "allowOutgoingLinks" in c && (X.allowOutgoingLinks = c.allowOutgoingLinks ?? X.allowOutgoingLinks);
          });
        for (const Q of M)
          d.selectAll(".graph-controller__link").filter((X) => X.id === Q).each(function(X) {
            X.deletable = c.deletable ?? X.deletable, X.labelEditable = c.labelEditable ?? X.labelEditable;
          });
        xt(
          j ? x : g,
          Object.keys(c)
        );
      } else
        k.each(function(_) {
          _.deletable = c.deletable ?? _.deletable, _.labelEditable = c.labelEditable ?? _.labelEditable, "fixedPosition" in c && Yt(_, c.fixedPosition), "allowIncomingLinks" in c && (_.allowIncomingLinks = c.allowIncomingLinks ?? _.allowIncomingLinks), "allowOutgoingLinks" in c && (_.allowOutgoingLinks = c.allowOutgoingLinks ?? _.allowOutgoingLinks);
        }), d.selectAll(".graph-controller__link").each(function(_) {
          _.deletable = c.deletable ?? _.deletable, _.labelEditable = c.labelEditable ?? _.labelEditable;
        }), xt(g, Object.keys(c));
      se();
    }
    function Me(c) {
      u.nodePhysicsEnabled = c, Ai(p, c, f, m);
    }
    function We(c) {
      u.fixedLinkDistanceEnabled = c, Bi(p, a.value, u, c);
    }
    function Xe(c) {
      u.showLinkLabels = c;
    }
    function Ot(c) {
      u.showNodeLabels = c;
    }
    function $t(c) {
      u.zoomEnabled = c, Ft();
    }
    function zt(c) {
      u.allowNodeCreationViaGUI = c;
    }
    function At(c) {
      u.nodeAutoGrowToLabelSize = c, c || (J.disconnect(), k.each(function(w) {
        ye(w, { width: 0, height: 0 });
      })), se();
    }
    function _n(c) {
      u.nodeGroupsFn = c;
    }
    function rr() {
      f = n.value.node().clientWidth, m = n.value.node().clientHeight, y = fh(
        (c) => Wi(c, u.zoomEnabled),
        u.zoomEnabled
      ), b = xh(
        n.value,
        y,
        (c) => u.allowNodeCreationViaGUI ? oo(c) : null,
        (c) => u.allowNodeCreationViaGUI ? ar(c) : null,
        (c) => {
          u.allowNodeCreationViaGUI && xn(
            he.USER_ACTION,
            { ...u.nodeProps },
            Ne(c, b.node())[0],
            Ne(c, b.node())[1]
          );
        }
      ), Th(b, r.value, u, a.value.getNonDefaultLinkColors()), R = Lh(r.value, b), d = Sh(b), k = kh(b), p = Hh(a.value, u, f, m, () => Yi()), S = _h(p, f, m, u, a.value), J = Hi(), se();
    }
    function Hi() {
      return new ResizeObserver((c) => {
        let w = !1;
        for (let g of c) {
          const x = g;
          if (x) {
            const _ = {
              width: x.borderBoxSize[0].inlineSize,
              height: x.borderBoxSize[0].blockSize
            }, j = Y(x.target).datum();
            w = ye(j, _);
          }
        }
        w && se();
      });
    }
    function Ui() {
      n.value.node().querySelectorAll(
        ".graph-controller__node-label, .graph-controller__node-label-placeholder"
      ).forEach((w) => J.observe(w));
    }
    function ye(c, w) {
      let g = !1;
      const x = { ...c.renderedSize }, _ = w.width > w.height ? w.width / 2 : w.height / 2, M = w.width, j = w.height;
      return c.renderedSize = { width: M, height: j, radius: _ }, JSON.stringify(x) !== JSON.stringify(c.renderedSize) && (g = !0, bh(c, x, n.value)), g;
    }
    function Wi(c, w = !0) {
      w && (P = c.transform.x, F = c.transform.y, V = c.transform.k, b.attr("transform", `translate(${P},${F})scale(${V})`));
    }
    function ir(c, w, g, x, _, M = u.linkGUIEditability.deletable, j = u.linkGUIEditability.labelEditable) {
      let Q = a.value.createLink(
        w.id,
        g.id,
        x,
        _,
        M,
        j
      );
      Q !== void 0 && mh(Q, n.value, c), se();
    }
    function Xi(c, w, g, x, _, M, j = u.nodeGUIEditability.fixedPosition, Q = u.nodeGUIEditability.deletable, X = u.nodeGUIEditability.labelEditable, Be = u.nodeGUIEditability.allowIncomingLinks, gt = u.nodeGUIEditability.allowOutgoingLinks) {
      return xn(
        he.PROGRAMMATIC_ACTION,
        c,
        w,
        g,
        x,
        _,
        M,
        j,
        Q,
        X,
        Be,
        gt
      );
    }
    function xn(c, w, g, x, _, M, j, Q = u.nodeGUIEditability.fixedPosition, X = u.nodeGUIEditability.deletable, Be = u.nodeGUIEditability.labelEditable, gt = u.nodeGUIEditability.allowIncomingLinks, jt = u.nodeGUIEditability.allowOutgoingLinks) {
      let mt = a.value.createNode(
        w,
        g ?? f / 2,
        x ?? m / 2,
        _,
        M,
        j,
        Q,
        X,
        Be,
        gt,
        jt
      );
      return gh(mt, n.value, c), on(p, a.value), h.value = !0, se(), mt.id;
    }
    function Yi() {
      k.attr("transform", (c) => `translate(${c.x},${c.y})`), d.selectAll(".graph-controller__link, .graph-controller__link-click-box").attr("d", (c) => (Qi(c), Sc(c, f, m, u))), sr();
    }
    function Qi(c) {
      let w = c.pathType;
      c.pathType = kc(c.source, c.target, a.value), w !== c.pathType && se();
    }
    function Zi() {
      const c = v, w = Y(
        n.value.node().querySelector(`#${r.value + "-node-" + c.id}`)
      ).classed("on-deletion");
      if (c !== void 0 && !w) {
        const g = N;
        g !== void 0 ? R.attr("d", () => c.id === g.id ? Vi(c, [f / 2, m / 2], u) : a.value.hasBidirectionalConnection(c, g) ? St(c, g, u) : Hn(c, g, u)) : I !== void 0 && R.attr(
          "d",
          St(c, { x: I[0], y: I[1] }, u)
        );
      }
    }
    function se(c = 0.5) {
      var w;
      d = d.data(a.value.links, (g) => g.id).join((g) => {
        const x = g.append("g").classed("graph-controller__link-container", !0);
        return x.append("path").classed("graph-controller__link", !0).style("stroke", (_) => _.color ? _.color : "").attr("id", (_) => r.value + "-link-" + _.id), x.append("path").classed("graph-controller__link-click-box", !0).on("dblclick", (_) => {
          xe(_);
        }).on("pointerout", (_) => so(_)).on("pointerdown", (_, M) => {
          yh(M, _.button, n.value, _), ao(_, M);
        }).on("pointerup", (_, M) => {
          lo(_, M);
        }), x.append("text").attr("class", (_) => {
          var M;
          return `graph-controller__${(M = _.pathType) == null ? void 0 : M.toLowerCase()}-path-text`;
        }).append("textPath").attr(
          "class",
          (_) => _.label ? "graph-controller__link-label" : "graph-controller__link-label-placeholder"
        ).attr("href", (_) => `#${r.value + "-link-" + _.id}`).text((_) => _.label ? _.label : "add label").on("click", (_, M) => {
          dr(_, M);
        }).on("dblclick", (_) => {
          xe(_);
        }), x.append("foreignObject").classed("graph-controller__link-label-mathjax-container", !0).attr("xmlns", "http://www.w3.org/2000/svg").attr("width", 1).attr("height", 1).html(
          (_) => `<div class='${_.label ? "graph-controller__link-label" : "graph-controller__link-label-placeholder"}'>
                        </div>`
        ).on("click", (_, M) => {
          dr(_, M);
        }).on("dblclick", (_) => {
          xe(_);
        }), x;
      }), d.selectChild(".graph-controller__link").attr("marker-start", function(g) {
        var x;
        if ((x = g.pathType) != null && x.includes("REVERSE")) {
          let _ = `url(#${r.value}-link-arrow-reverse`;
          return g.color && (_ += "-" + Rt(g.color)), _ += ")", _;
        } else
          return null;
      }).attr("marker-end", function(g) {
        var x;
        if ((x = g.pathType) != null && x.includes("REVERSE"))
          return null;
        {
          let _ = `url(#${r.value}-link-arrow`;
          return g.color && (_ += "-" + Rt(g.color)), _ += ")", _;
        }
      }).style("display", "none").each(function() {
        this.getBBox();
      }).style("display", null), d.selectChild("text").attr("class", (g) => {
        var x;
        return `graph-controller__${(x = g.pathType) == null ? void 0 : x.toLowerCase()}-path-text`;
      }).attr("dy", (g) => {
        var x;
        return g.pathType === Ee.REFLEXIVE ? 15 : g.pathType == Ee.LINEREVERSE ? -10 : (x = g.pathType) != null && x.includes("REVERSE") ? 20 : -10;
      }).selectChild("textPath").attr(
        "class",
        (g) => g.label ? "graph-controller__link-label" : "graph-controller__link-label-placeholder"
      ).classed("hidden", (g) => !u.showLinkLabels || !g.label && !g.labelEditable).classed("not-editable", (g) => !g.labelEditable).attr("startOffset", (g) => {
        var x;
        return (x = g.pathType) != null && x.includes("REVERSE") ? "46%" : "50%";
      }).text((g) => g.label ? g.label : "add label"), k = k.data(a.value.nodes, (g) => g.id).join(
        (g) => {
          const x = g.append("g").classed("graph-controller__node-container", !0).call(S).on("dblclick", (_) => {
            xe(_);
          }).on("pointerenter", (_, M) => cr(M)).on("pointerout", (_, M) => fr(M)).on("pointerdown", (_, M) => {
            wh(M, _.button, n.value, _), l = { x: _.x, y: _.y }, no(_, M);
          }).on("pointerup", (_, M) => {
            ar(_, M);
          });
          return or(x);
        },
        (g) => (g.each(function(x) {
          const _ = Y(this), M = _.selectChild(".graph-controller__node").node();
          Ji(x, M) ? (Ki(M, _), on(p, a.value)) : eo(_);
        }), g)
      ), k.selectChild("foreignObject").selectChild("div").attr(
        "class",
        (g) => g.label ? "graph-controller__node-label" : "graph-controller__node-label-placeholder"
      ).classed("controls-node-size", u.nodeAutoGrowToLabelSize).classed("hidden", (g) => !u.showNodeLabels || !g.label && !g.labelEditable).classed("not-editable", (g) => !g.labelEditable).text((g) => g.label ? g.label : "add label"), (w = window.MathJax) != null && w.version && window.MathJax.typesetPromise().then(() => {
        to();
      }), u.nodeAutoGrowToLabelSize && Ui(), p.nodes(a.value.nodes), p.alpha(c).restart();
    }
    function Ji(c, w) {
      return c.props.shape === A.CIRCLE && w.tagName !== "circle" || c.props.shape === A.RECTANGLE && w.tagName !== "rect";
    }
    function Ki(c, w) {
      u.nodeAutoGrowToLabelSize && J.unobserve(
        w.select(
          ".graph-controller__node-label, .graph-controller__node-label-placeholder"
        ).node()
      ), c.remove(), w.selectChild(".graph-controller__node-label-container").remove(), or(w);
    }
    function or(c) {
      c.filter((g) => g.props.shape === A.CIRCLE).append(A.CIRCLE).classed("graph-controller__node", !0).attr("id", (g) => `${r.value + "-node-" + g.id}`).attr("r", (g) => g.renderedSize.radius).style("fill", (g) => g.color ? g.color : ""), c.filter((g) => g.props.shape === A.RECTANGLE).append(A.RECTANGLE).classed("graph-controller__node", !0).attr("id", (g) => `${r.value + "-node-" + g.id}`).attr("width", (g) => g.renderedSize.width).attr("height", (g) => g.renderedSize.height).attr("x", (g) => -0.5 * g.renderedSize.width).attr("y", (g) => -0.5 * g.renderedSize.height).attr("rx", (g) => g.props.cornerRadius).attr("ry", (g) => g.props.cornerRadius).style("fill", (g) => g.color ? g.color : "");
      const w = c.append("foreignObject").classed("graph-controller__node-label-container", !0).attr("xmlns", "http://www.w3.org/2000/svg");
      return w.filter((g) => g.props.shape === A.CIRCLE).attr("width", (g) => 2 * g.renderedSize.radius).attr("height", (g) => 2 * g.renderedSize.radius).attr("x", (g) => -g.renderedSize.radius).attr("y", (g) => -g.renderedSize.radius), w.filter((g) => g.props.shape === A.RECTANGLE).attr("width", (g) => g.renderedSize.width).attr("height", (g) => g.renderedSize.height).attr("x", (g) => -0.5 * g.renderedSize.width).attr("y", (g) => -0.5 * g.renderedSize.height), w.append("xhtml:div").on("click", (g, x) => {
        fo(g, x);
      }).on("dblclick", (g) => {
        xe(g);
      }).on("pointerenter", (g, x) => cr(x)).on("pointerout", (g, x) => fr(x)), c;
    }
    function eo(c) {
      c.selectChild(".graph-controller__node").filter((w) => w.props.shape === A.CIRCLE).attr("r", (w) => w.renderedSize.radius), c.filter((w) => w.props.shape === A.CIRCLE).selectChild(".graph-controller__node-label-container").attr("width", (w) => 2 * w.renderedSize.radius).attr("height", (w) => 2 * w.renderedSize.radius).attr("x", (w) => -w.renderedSize.radius).attr("y", (w) => -w.renderedSize.radius), c.selectChild(".graph-controller__node").filter((w) => w.props.shape === A.RECTANGLE).attr("width", (w) => w.renderedSize.width).attr("height", (w) => w.renderedSize.height).attr("x", (w) => -0.5 * w.renderedSize.width).attr("y", (w) => -0.5 * w.renderedSize.height).attr("rx", (w) => {
        var g;
        return (g = w.props) == null ? void 0 : g.cornerRadius;
      }).attr("ry", (w) => {
        var g;
        return (g = w.props) == null ? void 0 : g.cornerRadius;
      }), c.filter((w) => w.props.shape === A.RECTANGLE).selectChild(".graph-controller__node-label-container").attr("width", (w) => w.renderedSize.width).attr("height", (w) => w.renderedSize.height).attr("x", (w) => -0.5 * w.renderedSize.width).attr("y", (w) => -0.5 * w.renderedSize.height);
    }
    function to() {
      d.selectChild("text").selectChild("textPath").selectChild("mjx-container").each(function(c) {
        const w = this, g = c, x = Y(w.parentNode.parentNode.parentNode).selectChild("foreignObject").selectChild("div").attr("class", "graph-controller__link-label").classed(
          "hidden",
          !u.showLinkLabels || !g.label && !g.labelEditable
        ).node();
        x.replaceChild(w, x.childNodes[0]);
      }), d.selectChild("text").selectChild("textPath").each(function() {
        const c = this;
        let w = !1;
        c.childNodes.forEach((x) => {
          var _;
          (x == null ? void 0 : x.nodeType) === Node.TEXT_NODE && ((_ = x == null ? void 0 : x.textContent) == null ? void 0 : _.trim()) !== "" && (w = !0);
        }), w || Y(c).text("I").attr("class", "graph-controller__link-label-placeholder mjx-hidden");
      }), sr();
    }
    function sr() {
      d.selectChild("text").selectChild("textPath").each(function() {
        const c = this, [w, g] = gr(c);
        Y(c.parentNode.parentNode).select("foreignObject").attr("x", w).attr("y", g);
      });
    }
    function no(c, w) {
      (c.button === 2 || c.pointerType === "touch") && (Wr(c), w.allowOutgoingLinks && io(w), w.deletable && (q = setTimeout(() => {
        N = void 0, ro(w);
      }, 250)));
    }
    function ro(c) {
      let w = n.value.node().querySelector(`#${r.value + "-node-" + c.id}`);
      Y(w).classed("on-deletion", !0);
      let g = Y(w.parentElement);
      if (c.props.shape === A.CIRCLE) {
        let x = Ku().outerRadius(c.props.radius + 4).innerRadius(c.props.radius), _ = [{ startAngle: 0, endAngle: 0 }];
        g.append("g").attr("class", "arc").selectAll("path.arc").data(_).enter().append("path").attr("class", "arc").style("fill", "black").style("opacity", 0.7).transition().duration(750).ease(Gr).attrTween("d", function(j) {
          let Q = { startAngle: 0, endAngle: 2 * Math.PI }, X = Qn(j, Q);
          return function(Be) {
            return x(X(Be));
          };
        }).on("end", () => lr(c));
      } else if (c.props.shape === A.RECTANGLE) {
        const x = Mh(
          c.renderedSize.width,
          c.renderedSize.height,
          c.props.cornerRadius
        );
        let _ = g.append("path").attr("fill", "none").attr("stroke", "black").attr("stroke-width", 4).attr("opacity", "0.7").attr("d", x), M = 2 * c.renderedSize.width + 2 * c.renderedSize.height;
        _.attr("stroke-dasharray", M).attr("stroke-dashoffset", M).transition().duration(750).ease(Gr).attr("stroke-dashoffset", 0).on("end", () => lr(c));
      }
    }
    function lr(c) {
      let w = a.value.removeNode(c);
      if (w !== void 0) {
        let [g, x] = w;
        Xt(g, n.value, he.USER_ACTION), x.forEach((_) => {
          Qe(_, n.value, he.USER_ACTION);
        }), on(p, a.value);
      }
      h.value = a.value.nodes.length > 0, Bt(), se();
    }
    function io(c) {
      I = [c.x, c.y], v = c, R.classed("hidden", !1).attr("d", St(c, { x: I[0], y: I[1] }, u));
    }
    function ar(c, w = void 0) {
      xe(c), clearTimeout(q), w && ur(w), c.pointerType === "mouse" || (c.pointerType === "touch" || c.pointerType === "pen") && !Nh(
        { x: l.x, y: l.y },
        { x: c.x, y: c.y }
      ) ? hr() : Bt();
    }
    function ur(c) {
      let w = n.value.node().querySelector(`#${r.value + "-node-" + c.id}`), g = Y(w), x = Y(w.parentElement);
      c.props.shape === A.CIRCLE ? (g.classed("on-deletion", !1), x.select("g.arc").select("path.arc").interrupt().remove(), x.select("g.arc").remove()) : c.props.shape === A.RECTANGLE && (g.classed("on-deletion") && x.select("path").attr("stroke-dasharray", 2 * c.props.width + 2 * c.props.height).attr("stroke-dashoffset", 0).transition().attr("stroke-dashoffset", 2 * c.props.width + 2 * c.props.height).on("end", () => {
        x.select("path").remove();
      }), g.classed("on-deletion", !1));
    }
    function hr() {
      const c = v, w = N;
      Bt(), !(c === void 0 || w === void 0) && ir(he.USER_ACTION, c, w);
    }
    function oo(c) {
      if (xe(c), v !== void 0) {
        const w = yl(c, n.value.node())[0];
        I = [(w[0] - P) / V, (w[1] - F) / V], Zi();
      }
    }
    function cr(c) {
      c.allowIncomingLinks && (N = c);
    }
    function fr(c) {
      c && ur(c), N = void 0, clearTimeout(q);
    }
    function so(c) {
      xe(c), clearTimeout(H);
    }
    function lo(c, w) {
      xe(c), clearTimeout(H), (c.button === 2 || c.pointerType === "touch") && w.deletable && co(w);
    }
    function ao(c, w) {
      (c.button === 2 || c.pointerType === "touch") && (Wr(c), w.deletable && (H = setTimeout(() => {
        uo(w);
      }, 250)));
    }
    function uo(c) {
      let w = n.value.node().querySelector(`#${r.value + "-link-" + c.id}`);
      if (Y(w).classed("on-deletion", !0), w instanceof SVGPathElement) {
        let g = Y(w), x = w.getTotalLength(), _ = w.parentElement.querySelector("text"), M = Array.from(_.classList).some(
          (X) => X.includes("reverse")
        ), j = 0, Q = M ? x : -x;
        g.attr("stroke-dasharray", x).attr("stroke-dashoffset", j).transition().duration(750).attr("stroke-dashoffset", Q).on("end", () => ho(c));
      }
    }
    function ho(c) {
      let w = c.color, g = a.value.removeLink(c);
      g !== void 0 && Qe(g, n.value, he.USER_ACTION), w && (a.value.hasNonDefaultLinkColor(w) || Cn(b, r.value, w)), se();
    }
    function co(c) {
      let w = n.value.node().querySelector(`#${r.value + "-link-" + c.id}`);
      if (Y(w).classed("on-deletion") && w instanceof SVGPathElement) {
        let g = Y(w), x = w.getTotalLength();
        g.attr("stroke-dasharray", x).attr("stroke-dashoffset", x).transition().attr("stroke-dashoffset", 0).on("end", () => {
          g.attr("stroke-dasharray", null).attr("stroke-dashoffset", null);
        });
      }
      Y(w).classed("on-deletion", !1);
    }
    function fo(c, w) {
      xe(c), w.labelEditable && pr(w, [w.x, w.y]);
    }
    function dr(c, w) {
      if (w.labelEditable) {
        let g = c.target, x;
        g.nodeName === "textPath" ? x = g : x = g.closest(".graph-controller__link-container").querySelector("textPath");
        let _ = gr(x);
        pr(w, _);
      }
    }
    function pr(c, w) {
      let g = c instanceof pn ? "node" : "link";
      const x = document.createElement("input");
      x.setAttribute("class", "graph-controller__label-input"), x.setAttribute("id", `${g}-label-input-field`), c.label == null ? x.value = "" : x.value = c.label, x.placeholder = `Enter ${g} label`;
      const _ = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
      _.setAttribute("width", "100%"), _.setAttribute("height", "100%"), _.setAttribute("x", `${w[0] - 90}`), _.setAttribute("y", `${w[1] - 12}`), _.append(x), n.value.select("svg").select("g").node().append(_), x.focus(), o !== "desktop" && (s = !0), x.ondblclick = function(j) {
        xe(j);
      };
      let M = !1;
      x.onkeyup = function(j) {
        j.key === "Enter" ? (M = !0, x.blur()) : j.key === "Escape" && (x.value = "", x.blur());
      }, x.onblur = function() {
        M && pt(c, x.value.trim()), _.remove(), o !== "desktop" && (s = !1);
      };
    }
    function pt(c, w) {
      vh(c, w, n.value), c.label = w, se();
      let g = c instanceof pn ? "node" : "link";
      g === "link" ? po(c) : g === "node" && w !== "" && go(c);
    }
    function po(c) {
      var g;
      const w = n.value.node().querySelector(
        `#${r.value + "-link-" + c.id}`
      ).parentElement;
      (g = w.querySelector("mjx-container")) == null || g.remove(), w.querySelector("div").setAttribute("class", "graph-controller__link-label-placeholder"), se();
    }
    function go(c) {
      const w = n.value.node().querySelector(`#${r.value + "-node-" + c.id}`).parentElement;
      if (w) {
        const g = w.parentElement, x = w.nextSibling;
        w.remove(), g.insertBefore(w, x);
      }
    }
    function gr(c) {
      let w = n.value.select("svg").node().getBoundingClientRect(), g = c.getBoundingClientRect(), x = (g.x - w.x - P) / V, _ = (g.y - w.y - F) / V;
      return [x, _];
    }
    function Bt() {
      R == null || R.classed("hidden", !0), v = void 0, N = void 0, I = void 0;
    }
    function mo(c) {
      let w, g;
      try {
        if (typeof c == "string")
          [w, g] = Ic(c);
        else if (typeof c == "object")
          [w, g] = Pc(c);
        else {
          at("Invalid graph import type:", "Must either be TGF or JSON.");
          return;
        }
      } catch (x) {
        at("Error during parsing:", `Invalid data format:
` + x);
        return;
      }
      yr(), wo(w, g);
    }
    function wo(c, w) {
      for (let x of c)
        xn(
          he.PROGRAMMATIC_ACTION,
          x.props ?? u.nodeProps,
          x.x,
          x.y,
          x.idImported,
          x.label,
          x.color,
          x.fixedPosition,
          x.deletable,
          x.labelEditable,
          x.allowIncomingLinks,
          x.allowOutgoingLinks
        );
      const g = (x) => a.value.nodes.find((_) => _.idImported === x);
      for (let x of w) {
        let _ = g(x.sourceIdImported), M = g(x.targetIdImported);
        _ && M && (ir(
          he.PROGRAMMATIC_ACTION,
          _,
          M,
          x.label,
          x.color,
          x.deletable,
          x.labelEditable
        ), x.color && qn(b, r.value, u, x.color));
      }
    }
    function mr(c) {
      for (let w of c) {
        const g = a.value.links.filter((x) => x.id === w).map((x) => x.color).shift();
        g && (a.value.hasNonDefaultLinkColor(g, w) ? a.value.getLinkIdsWithNonDefaultLinkColors(
          g,
          w
        ).every(
          (M) => c.includes(M)
        ) && Cn(b, r.value, g) : Cn(b, r.value, g));
      }
    }
    function Ft() {
      p.stop(), n.value.selectChildren().remove(), y = void 0, P = 0, F = 0, V = 1, b = void 0, R = void 0, d = void 0, k = void 0, p = void 0, Bt(), rr();
    }
    function wr() {
      u.isCanvasBoundToView && (s || Ft());
    }
    function yr() {
      a.value.links.forEach((c) => Qe(c, n.value, he.PROGRAMMATIC_ACTION)), a.value.nodes.forEach((c) => Xt(c, n.value, he.PROGRAMMATIC_ACTION)), a.value = new Xr(), h.value = !1, Ft();
    }
    function Gt(c) {
      const w = a.value.nodes.find((g) => g.id === c);
      if (w === void 0)
        throw new Error(`Node with id ${c} not found`);
      return w;
    }
    function yo(c) {
      const w = Gt(c), g = w.x;
      if (g === void 0)
        throw new Error(`Node with id ${c} has no x position`);
      const x = w.y;
      if (x === void 0)
        throw new Error(`Node with id ${c} has no y position`);
      return { x: g, y: x };
    }
    function vo(c, w) {
      const g = Gt(w);
      g.fx = c.x, g.fy = c.y, se();
    }
    function bo(c, w) {
      const g = Gt(w);
      g.x = c.x, g.y = c.y, se();
    }
    function _o(c) {
      const w = {
        marginTop: 0,
        marginRight: 0,
        marginBottom: 0,
        marginLeft: 0
      };
      c !== void 0 && Object.assign(w, c);
      const { marginTop: g, marginRight: x, marginBottom: _, marginLeft: M } = w;
      if (b === void 0)
        return;
      const j = Rh(a.value);
      if (j === null)
        return;
      console.log(g, x, _, M);
      const Q = j.yMin - g, X = j.yMax + _, Be = j.xMin - M, gt = j.xMax + x, jt = X - Q, mt = gt - Be, vr = m / jt, br = f / mt;
      let wt, En, Sn;
      vr < br ? (wt = vr, En = Q, Sn = Be - (f / wt - mt) / 2) : (wt = br, En = Q - (m / wt - jt) / 2, Sn = Be), n.value.select("svg").call(y.transform, nr.scale(wt).translate(-Sn, -En));
    }
    return (c, w) => (qe(), De(In, null, [
      w[0] || (w[0] = Le("div", { class: "graph-controller__graph-host uninitialised" }, null, -1)),
      Jt(Le("div", null, [
        No(zo, {
          class: "graph-controller__info-text-background",
          "show-controls-graph": "",
          "show-latex-info": !0,
          "show-controls-environment": !1,
          "show-header": !0,
          "platform-type": Pn(o)
        }, null, 8, ["platform-type"])
      ], 512), [
        [Kt, !h.value]
      ])
    ], 64));
  }
});
customElements.define(
  "graph-component",
  // With LaTeX without ShadowRoot for MathJax to work
  To(Gc, { shadowRoot: !1 })
  // With ShadowRoot without LaTeX
  // defineCustomElement(GraphEditor)
  /* for switching off the LaTeX control info background, in the graph editor template
  in the graph controls tag you can use :show-latex-info="true" */
);
