var de = Object.defineProperty;
var ce = (E, e, i) => e in E ? de(E, e, { enumerable: !0, configurable: !0, writable: !0, value: i }) : E[e] = i;
var O = (E, e, i) => (ce(E, typeof e != "symbol" ? e + "" : e, i), i);
import { nextTick as M, toRaw as U, reactive as he, defineComponent as ee, ref as G, openBlock as D, createElementBlock as B, Fragment as J, renderList as $, normalizeStyle as te, toDisplayString as ae, onBeforeMount as pe, withModifiers as ue, createElementVNode as W, withDirectives as fe, vModelText as me, createCommentVNode as Z, createTextVNode as ge, getCurrentInstance as ye, watch as ne, onBeforeUnmount as Ee, mergeProps as xe, unref as X, withKeys as ie, createBlock as se, Teleport as re, createVNode as oe } from "vue";
var y = /* @__PURE__ */ ((E) => (E[E.TEXT = 0] = "TEXT", E[E.LINK = 1] = "LINK", E[E.IMAGE = 2] = "IMAGE", E))(y || {});
class b {
  static handle(e, i) {
    let a = "";
    for (let t of e.arr) {
      let n;
      if (t.type == y.TEXT)
        if (t.style && Object.keys(t.style).length > 0) {
          if (n = document.createElement("span"), n.innerText = t.value, t.style)
            for (let l in t.style)
              n.style[l] = t.style[l];
        } else {
          a += t.value;
          continue;
        }
      else
        t.type == y.LINK ? n = document.createElement("a") : t.type == y.IMAGE ? n = document.createElement("img") : n = document.createElement("a"), i == null || i(n, t);
      n && (a += n.outerHTML);
    }
    return a;
  }
  static handleInnerHtml(e, i, a = !1, t) {
    e.selectEndIndexPath = [], e.selectStartIndexPath = [], e.arr = [], i.childNodes.forEach((d) => {
      var f, u, c, p, g, k, I, L;
      if (d.nodeType == Node.TEXT_NODE) {
        let P = {
          value: d.nodeValue,
          style: {},
          type: y.TEXT
        };
        e.arr.push(P);
      } else if (d.nodeType == Node.ELEMENT_NODE) {
        let P = {
          value: "",
          style: {}
        }, C = d;
        C.tagName == "SPAN" ? (P.type = y.TEXT, P.value = C.innerText ?? "") : t == null || t(P, C), (f = C.style) != null && f.color && (P.style.color = (u = C.style) == null ? void 0 : u.color), (c = C.style) != null && c.fontStyle && (P.style.fontStyle = C.style.fontStyle), (p = C.style) != null && p.fontWeight && (P.style.fontWeight = C.style.fontWeight), (g = C.style) != null && g.fontSize && (P.style.fontSize = C.style.fontSize), (k = C.style) != null && k.backgroundColor && (P.style.backgroundColor = (I = C.style) == null ? void 0 : I.backgroundColor), (L = C.style) != null && L.textDecoration && (P.style.textDecoration = C.style.textDecoration), e.arr.push(P);
      }
    });
    let n = window.getSelection(), l;
    n.rangeCount > 0 ? l = n.getRangeAt(0) : (l = document.createRange(), l.selectNodeContents(i), l.collapse(!1));
    let s = l.startOffset, r = l.endOffset, o = l.startContainer, h = l.endContainer;
    if (i.contains(o))
      if (i == o)
        o.childNodes.length == 0 || s >= o.childNodes.length ? e.selectStartIndexPath = [s > 0 ? s - 1 : 0, o.childNodes.length == 0 ? 0 : o.lastChild.textContent ? o.lastChild.textContent.length : 0] : e.selectStartIndexPath = [s, 0];
      else {
        e.selectStartIndexPath.unshift(s);
        let d = o.parentElement;
        d == i ? (s = Array.from(d.childNodes).indexOf(o), e.selectStartIndexPath.unshift(s)) : (s = Array.from(d.parentElement.childNodes).indexOf(d), e.selectStartIndexPath.unshift(s));
      }
    if (i.contains(h))
      if (i == h)
        h.childNodes.length == 0 || r >= h.childNodes.length ? e.selectEndIndexPath = [r > 0 ? r - 1 : 0, h.childNodes.length == 0 ? 0 : h.lastChild.textContent ? h.lastChild.textContent.length : 0] : e.selectEndIndexPath = [r, 0];
      else {
        e.selectEndIndexPath.unshift(r);
        let d = h.parentElement;
        d == i ? (r = Array.from(d.childNodes).indexOf(h), e.selectEndIndexPath.unshift(r)) : (r = Array.from(d.parentElement.childNodes).indexOf(d), e.selectEndIndexPath.unshift(r));
      }
    if (a) {
      for (; o.tagName !== "DIV"; )
        o = o.parentElement;
      for (; h.tagName !== "DIV"; )
        h = h.parentElement;
      M(() => {
        if (o == i) {
          let d = o.childNodes[e.selectStartIndexPath[0]];
          if (!d)
            return;
          if (d.nodeType == Node.TEXT_NODE)
            l.setStart(d, e.selectStartIndexPath[1]);
          else if (d.nodeType == Node.ELEMENT_NODE)
            if (d.tagName == "BR") {
              l.selectNode(d);
              return;
            } else if (d.tagName == "IMG") {
              l.selectNode(d), l.collapse(!1);
              return;
            } else
              d.contentEditable == "true" && l.setStart(d.firstChild, e.selectStartIndexPath[1]);
        }
        if (h == i) {
          let d = h.childNodes[e.selectEndIndexPath[0]];
          if (!d)
            return;
          if (d.nodeType == Node.TEXT_NODE)
            l.setEnd(d, e.selectEndIndexPath[1]);
          else if (d.nodeType == Node.ELEMENT_NODE)
            if (d.tagName == "BR" || d.tagName == "IMG") {
              l.selectNode(d);
              return;
            } else
              d.contentEditable === "true" && l.setEnd(d.firstChild, e.selectEndIndexPath[1]);
        }
      });
    }
  }
  static fixLine(e, i) {
    for (let a = 1; a < e.arr.length; a++) {
      let t = e.arr[a], n = e.arr[a - 1];
      if (t.style && n.style && JSON.stringify(t.style) === JSON.stringify(n.style) && t.type == n.type && t.type == y.TEXT || !t.value && t.type != y.IMAGE) {
        let l = n.value.length;
        n.value += t.value, e.arr.splice(a, 1), a--, i && (U(i.startItem) === U(t) && (i.startItem = n, i.startIndex += l), U(i.endItem) === U(t) && (i.endItem = n, i.endIndex += l));
      }
    }
    for (let a = 0; a < e.arr.length; a++) {
      let t = e.arr[a];
      !t.value && t.type != y.IMAGE && (e.arr.splice(a, 1), a--);
    }
  }
}
function Ie(E, e) {
  let i = E.getLineList(), a = E.getRoot(), t = E.getSelectElementList();
  if (t.length == 1) {
    let n = i[Array.from(a.value.children).indexOf(t[0])];
    if (n.selectStartIndexPath.length > 0 && n.selectEndIndexPath.length > 0) {
      let l;
      if (n.selectEndIndexPath[0] > n.selectStartIndexPath[0]) {
        let s = n.arr[n.selectStartIndexPath[0]], r = n.arr[n.selectEndIndexPath[0]], o;
        for (let d = n.selectStartIndexPath[0]; d <= n.selectEndIndexPath[0]; d++) {
          let f = n.arr[d];
          f == s ? n.selectStartIndexPath[1] > 0 && f.link != e ? (o = {
            style: {
              ...f.style
            },
            value: f.value.substring(n.selectStartIndexPath[1]),
            type: y.LINK,
            link: e
          }, f.value = f.value.substring(0, n.selectStartIndexPath[1]), n.arr.splice(d + 1, 0, o), d++, n.selectEndIndexPath[0]++, s = o) : (f.link = e, f.type = y.LINK, s = f) : f == r ? (s.value += f.value.substring(0, n.selectEndIndexPath[1]), f.value = f.value.substring(n.selectEndIndexPath[1])) : (s.value += f.value, n.arr.splice(d, 1), d--, n.selectEndIndexPath[0]--);
        }
        let h = {
          startItem: s
        };
        b.fixLine(n, h), M(() => {
          let d = window.getSelection(), f = document.createRange(), u = t[0].childNodes[n.arr.indexOf(h.startItem)];
          f.selectNode(u), d.removeAllRanges(), d.addRange(f);
        });
      } else {
        let s = n.arr[n.selectStartIndexPath[0]];
        if (!s)
          return;
        let r, o = s.value.substring(n.selectStartIndexPath[1], n.selectEndIndexPath[1]), h = s.value.substring(0, n.selectStartIndexPath[1]), d = s.value.substring(n.selectEndIndexPath[1]);
        s.value = h, l = {
          value: o,
          style: {
            ...s.style
          },
          type: y.LINK,
          link: e
        }, n.arr.splice(n.selectStartIndexPath[0] + 1, 0, l, {
          value: d,
          style: {
            ...s.style
          },
          type: s.type,
          ...s.link && {
            link: s.link
          }
        }), b.fixLine(n), r = l, M(() => {
          let f = window.getSelection(), u = document.createRange(), c = t[0].childNodes[n.arr.indexOf(r)];
          c && (u.selectNode(c), f.removeAllRanges(), f.addRange(u));
        });
      }
    }
  }
}
function be(E, e, i) {
  let a = E.getLineList(), t = E.getRoot(), n = E.getSelectElementList();
  if (n.length == 1) {
    let l = a[Array.from(t.value.children).indexOf(n[0])];
    if (b.handleInnerHtml(l, t.value.children[a.indexOf(l)], !1, E.onGetLineConfigType), l.arr.length == 0) {
      let s = {
        type: y.IMAGE,
        link: e,
        value: "",
        width: i
      };
      l.arr.push(s);
    } else {
      let s = l.arr[l.selectStartIndexPath[0]], r = {
        type: y.IMAGE,
        value: "",
        link: e,
        width: i
      }, o = JSON.parse(JSON.stringify(s));
      o.type == y.IMAGE ? l.arr.splice(l.selectStartIndexPath[0] + 1, 0, r) : (o.value = o.value.substring(l.selectStartIndexPath[1]), s.value = s.value.substring(0, l.selectStartIndexPath[1]), l.arr.splice(l.selectStartIndexPath[0] + 1, 0, r, o));
    }
  }
}
function z(E, e, i) {
  let a = E.getLineList(), t = E.getRoot(), n = E.getSelectElementList();
  if (n.length == 1) {
    let l = a[Array.from(t.value.children).indexOf(n[0])];
    if (l.selectStartIndexPath.length > 0 && l.selectEndIndexPath.length > 0) {
      let s;
      if (l.selectEndIndexPath[0] > l.selectStartIndexPath[0]) {
        let r = l.arr[l.selectStartIndexPath[0]], o = l.arr[l.selectEndIndexPath[0]], h, d;
        for (let u = l.selectStartIndexPath[0]; u <= l.selectEndIndexPath[0]; u++) {
          let c = l.arr[u];
          if (c == r)
            if (l.selectStartIndexPath[1] > 0 && c.style[e] != i) {
              let p;
              if (i)
                p = {
                  style: Object.assign({}, c.style, {
                    [e]: i
                  }),
                  value: c.value.substring(l.selectStartIndexPath[1]),
                  type: y.TEXT
                };
              else {
                let g = {
                  ...c.style
                };
                delete g[e], p = {
                  style: g,
                  value: c.value.substring(l.selectStartIndexPath[1]),
                  type: y.TEXT
                };
              }
              c.value = c.value.substring(0, l.selectStartIndexPath[1]), l.arr.splice(u + 1, 0, p), u++, l.selectEndIndexPath[0]++, r = p, h = 0;
            } else
              i ? Object.assign(c.style, c.style, {
                [e]: i
              }) : delete c.style[e], r = c, h = l.selectStartIndexPath[1];
          else if (c == o)
            if (l.selectEndIndexPath[1] < c.value.length && c.style[e] != i) {
              let p;
              if (i)
                p = {
                  style: Object.assign({}, c.style, {
                    [e]: i
                  }),
                  value: c.value.substring(0, l.selectEndIndexPath[1]),
                  type: y.TEXT
                };
              else {
                let g = {
                  ...c.style
                };
                delete g[e], p = {
                  style: g,
                  value: c.value.substring(0, l.selectEndIndexPath[1]),
                  type: y.TEXT
                };
              }
              c.value = c.value.substring(l.selectEndIndexPath[1]), l.arr.splice(u, 0, p), u++, l.selectEndIndexPath[0]++, o = p, d = p.value.length;
            } else
              i ? Object.assign(c.style, c.style, {
                [e]: i
              }) : delete c.style[e], o = c, d = l.selectEndIndexPath[1];
          else
            i ? Object.assign(c.style, c.style, {
              [e]: i
            }) : delete c.style[e];
        }
        let f = {
          startItem: r,
          endItem: o,
          startIndex: h,
          endIndex: d
        };
        b.fixLine(l, f), M(() => {
          let u = window.getSelection(), c = document.createRange(), p = n[0].childNodes[l.arr.indexOf(f.startItem)], g = n[0].childNodes[l.arr.indexOf(f.endItem)];
          p.nodeType == Node.TEXT_NODE ? c.setStart(p, f.startIndex) : p.nodeType == Node.ELEMENT_NODE && (p.tagName == "IMG" ? c.setStartBefore(p) : c.setStart(p.firstChild, f.startIndex)), g.nodeType == Node.TEXT_NODE ? c.setEnd(g, f.endIndex) : g.nodeType == Node.ELEMENT_NODE && (g.tagName == "IMG" ? c.setEndAfter(g) : c.setEnd(g.firstChild, f.endIndex)), u.removeAllRanges(), u.addRange(c);
        });
      } else {
        let r = l.arr[l.selectStartIndexPath[0]];
        if (!r)
          return;
        let o, h, d;
        if (r.style[e] != i) {
          let f = r.value.substring(l.selectStartIndexPath[1], l.selectEndIndexPath[1]), u = r.value.substring(0, l.selectStartIndexPath[1]), c = r.value.substring(l.selectEndIndexPath[1]);
          if (r.value = u, i)
            s = JSON.parse(JSON.stringify(r)), s.value = f, s.style = Object.assign({}, r.style, {
              [e]: i
            });
          else {
            s = JSON.parse(JSON.stringify(r));
            let p = {
              ...r.style
            };
            delete p[e], s.value = f, s.style = p;
          }
          l.arr.splice(l.selectStartIndexPath[0] + 1, 0, s, {
            value: c,
            style: {
              ...r.style
            },
            type: y.TEXT
          }), b.fixLine(l), o = 0, h = s.value.length, d = s;
        } else
          d = r, o = l.selectStartIndexPath[1], h = l.selectEndIndexPath[1];
        M(() => {
          let f = window.getSelection(), u = document.createRange(), c = n[0].childNodes[l.arr.indexOf(d)];
          c && (c.nodeType == Node.TEXT_NODE ? (u.setStart(c, o), u.setEnd(c, h)) : c.nodeType == Node.ELEMENT_NODE && (c.tagName == "IMG" ? u.selectNode(c) : (u.setStart(c.firstChild, o), u.setEnd(c.firstChild, h))), f.removeAllRanges(), f.addRange(u));
        });
      }
    }
  } else if (n.length > 1) {
    let l = [];
    n.forEach((N) => {
      l.push(a[Array.from(t.value.children).indexOf(N)]);
    });
    let s = window.getSelection(), r = s.getRangeAt(0), o = r.startOffset, h = r.endOffset, d = r.startContainer, f = r.endContainer, u = [], c = [];
    if (d.tagName == "DIV")
      u = [o, 0];
    else {
      u.unshift(o);
      let N = d.parentElement;
      N.tagName == "DIV" ? (o = Array.from(N.childNodes).indexOf(d), u.unshift(o)) : (o = Array.from(N.parentElement.childNodes).indexOf(N), u.unshift(o));
    }
    if (f.tagName == "DIV")
      c = [h, f.childNodes[h].textContent.length];
    else {
      c.unshift(h);
      let N = f.parentElement;
      N.tagName == "DIV" ? (h = Array.from(N.childNodes).indexOf(f), c.unshift(h)) : (h = Array.from(N.parentElement.childNodes).indexOf(N), c.unshift(h));
    }
    let p = l[0], g = l[l.length - 1], k = p.arr[u[0]], I = g.arr[c[0]], L = k, P = I, C, q;
    for (let N of l)
      if (N == p)
        for (let w = u[0]; w < p.arr.length; w++) {
          let T = p.arr[w];
          if (T.style[e] != i)
            if (T == k) {
              let H;
              if (i)
                H = {
                  value: T.value.substring(u[1]),
                  style: {
                    ...T.style,
                    [e]: i
                  },
                  type: y.TEXT
                };
              else {
                let m = {
                  ...T.style
                };
                delete m[e], H = {
                  value: T.value.substring(u[1]),
                  style: m,
                  type: y.TEXT
                };
              }
              T.value = T.value.substring(0, u[1]), p.arr.splice(w + 1, 0, H), w++, L = H, C = 0;
            } else
              i ? T.style[e] = i : delete T.style[e];
          else
            T == k && (C = u[1]);
        }
      else if (N == g)
        for (let w = 0; w <= c[0]; w++) {
          let T = g.arr[w];
          if (T.style[e] != i)
            if (T == I) {
              let H;
              if (i)
                H = {
                  value: T.value.substring(0, c[1]),
                  style: {
                    ...T.style,
                    [e]: i
                  },
                  type: y.TEXT
                };
              else {
                let m = {
                  ...T.style
                };
                delete m[e], H = {
                  value: T.value.substring(0, c[1]),
                  style: m,
                  type: y.TEXT
                };
              }
              T.value = T.value.substring(c[1]), g.arr.splice(w, 0, H), P = H, q = H.value.length;
            } else
              i ? T.style[e] = i : delete T.style[e];
          else
            T == I && (q = c[1]);
        }
      else
        N.arr.forEach((w) => {
          w.style[e] != i && (i ? w.style[e] = i : delete w.style[e]);
        });
    let F = {
      startItem: L,
      startIndex: C
    }, K = {
      endItem: P,
      endIndex: q
    };
    for (let N of l)
      N == p ? b.fixLine(N, F) : N == g ? b.fixLine(N, K) : b.fixLine(N);
    M(() => {
      let N = n[0].childNodes[p.arr.indexOf(F.startItem)], w = n[n.length - 1].childNodes[g.arr.indexOf(K.endItem)];
      N.nodeType == Node.TEXT_NODE ? r.setStart(N, F.startIndex) : N.nodeType == Node.ELEMENT_NODE && (N.tagName == "IMG" ? r.setStartBefore(N) : r.setStart(N.firstChild, F.startIndex)), w.nodeType == Node.TEXT_NODE ? r.setEnd(w, K.endIndex) : w.nodeType == Node.ELEMENT_NODE && (w.tagName == "IMG" ? r.setEndAfter(w) : r.setEnd(w.firstChild, K.endIndex)), s.removeAllRanges(), s.addRange(r);
    });
  }
}
function Q(E, e, i) {
  let a = [];
  E.getSelectionItemList().forEach((t) => {
    a.push(...t.data.filter((n) => n.type === y.TEXT || n.type === y.LINK));
  });
  for (let t of a)
    if (!t.style || t.style[e] != i)
      return !1;
  return !0;
}
class j {
  static isBold(e) {
    return Q(e, "fontWeight", "bold");
  }
  static bold(e, i) {
    z(e, "fontWeight", i ? "bold" : void 0);
  }
  static isItalic(e) {
    return Q(e, "fontStyle", "italic");
  }
  static italic(e, i) {
    z(e, "fontStyle", i ? "italic" : void 0);
  }
  static isUnderLine(e) {
    return Q(e, "textDecoration", "underline");
  }
  static underLine(e, i) {
    z(e, "textDecoration", i ? "underline" : void 0);
  }
  static isDeleteLine(e) {
    return Q(e, "textDecoration", "line-through");
  }
  static deleteLine(e, i) {
    z(e, "textDecoration", i ? "line-through" : void 0);
  }
  static fontSize(e, i) {
    z(e, "fontSize", i);
  }
  static color(e, i) {
    z(e, "color", i);
  }
  static backgroundColor(e, i) {
    z(e, "backgroundColor", i);
  }
  static link(e, i) {
    Ie(e, i);
  }
  static image(e, i) {
    let a = document.createElement("img");
    a.src = i, a.onload = () => {
      be(e, i, a.width), a = null;
    };
  }
}
let _;
function Le(E) {
  var i, a, t;
  let e = (i = window.getSelection()) == null ? void 0 : i.getRangeAt(0);
  if (E.key === "Backspace" && _ && e && ((a = _.getRoot().value) != null && a.contains(e.commonAncestorContainer)) && _.getSelectElementList().length > 0 && !((t = window.getSelection().getRangeAt(0)) != null && t.collapsed)) {
    E.preventDefault(), E.stopPropagation();
    let n = _.getSelectionItemList(), l = {
      startItem: null,
      startIndex: 0
    };
    if (n.length == 1) {
      let s = n[0].line, r = s.arr[s.selectStartIndexPath[0]], o = s.arr[s.selectEndIndexPath[0]];
      if (r === o) {
        if (r.type === y.TEXT || r.type === y.LINK) {
          let h = r.value.substring(0, s.selectStartIndexPath[1]), d = r.value.substring(s.selectEndIndexPath[1]);
          r.value = h + d;
        } else
          s.arr.splice(s.selectStartIndexPath[0], 1);
        l.startItem = r, l.startIndex = s.selectStartIndexPath[1];
      } else
        for (let h of n[0].data)
          h === r ? (r.type === y.TEXT || r.type === y.LINK ? r.value = r.value.substring(0, s.selectStartIndexPath[1]) : s.arr.splice(s.arr.indexOf(r), 1), l.startItem = r, l.startIndex = s.selectStartIndexPath[1]) : h === o ? o.type === y.TEXT || o.type === y.LINK ? o.value = o.value.substring(s.selectEndIndexPath[1]) : s.arr.splice(s.arr.indexOf(o), 1) : s.arr.splice(s.arr.indexOf(h), 1);
      b.fixLine(s, l);
    } else {
      let s;
      for (let r = 0; r < n.length; r++) {
        let o = n[r], h = o.line;
        if (r == 0 || r == n.length - 1)
          if (r == 0) {
            s = h;
            for (let d = 0; d < o.data.length; d++) {
              let f = o.data[d];
              d == 0 && (f.type === y.TEXT || f.type === y.LINK) ? f.value = f.value.substring(0, h.selectStartIndexPath[1]) : h.arr.splice(h.arr.indexOf(f), 1);
            }
          } else {
            for (let d = 0; d < o.data.length; d++) {
              let f = o.data[d];
              d == o.data.length - 1 && (f.type === y.TEXT || f.type === y.LINK) ? f.value = f.value.substring(h.selectEndIndexPath[1]) : h.arr.splice(h.arr.indexOf(f), 1);
            }
            s.arr = s.arr.concat(h.arr), _.getLineList().splice(_.getLineList().indexOf(h), 1), b.fixLine(s);
          }
        else
          _.getLineList().splice(_.getLineList().indexOf(h), 1);
      }
    }
    M(() => {
      let s = window.getSelection(), r = document.createRange(), o = _.getLineList().indexOf(n[0].line), h = _.getRoot().value.children[o].childNodes[n[0].line.selectStartIndexPath[0]];
      if (h) {
        if (h.nodeType === Node.TEXT_NODE || h.tagName === "SPAN") {
          let d = h.tagName === "SPAN" ? h.innerText : h.textContent;
          n[0].line.selectStartIndexPath[1] >= d.length ? (r.setStartAfter(h), r.setEndAfter(h)) : (r.setStart(h, n[0].line.selectStartIndexPath[1]), r.setEnd(h, n[0].line.selectStartIndexPath[1]));
        } else
          r.setStartAfter(h), r.setEndAfter(h);
        s.removeAllRanges(), s.addRange(r);
        for (let d of _.getSelectElementList())
          d.contentEditable = "true";
        _.setSelectElementList([]);
      }
    });
  }
}
class Ne {
  constructor(e, i, a) {
    O(this, "selectElementList", []);
    O(this, "isMouseDown", !1);
    O(this, "root");
    O(this, "lineList", he([]));
    O(this, "imageHelperElement");
    O(this, "resizeImage");
    O(this, "resizeObserver");
    O(this, "selectionMenuElement");
    O(this, "selectionTextElement");
    O(this, "selectionLinkElement");
    O(this, "selectionColorElement");
    O(this, "linkEditElement");
    O(this, "popMenuPosition");
    O(this, "quotePosition");
    O(this, "destroyFunc");
    O(this, "destroyQuoteFunc");
    O(this, "onUploadFileFunc");
    O(this, "onPopMenuClickFunc");
    O(this, "onCustomMenuClickFunc");
    O(this, "onQuoteListFunc");
    O(this, "onSetLineConfigType");
    O(this, "onGetLineConfigType");
    this.root = e, this.popMenuPosition = i, this.quotePosition = a, document.addEventListener("keydown", Le);
  }
  setSelectElementList(e) {
    this.selectElementList = e;
  }
  clear() {
    var e, i, a, t, n, l;
    (e = this.destroyFunc) == null || e.call(this), (i = this.destroyQuoteFunc) == null || i.call(this), (a = this.imageHelperElement) == null || a.remove(), (t = this.resizeObserver) == null || t.disconnect(), (n = this.selectionMenuElement) == null || n.remove(), (l = this.linkEditElement) == null || l.remove(), this.popMenuPosition.value = null, this.quotePosition.value = null;
  }
  clearQuote() {
    this.quotePosition.value = null;
  }
  getLineList() {
    return this.lineList;
  }
  setLineList(e) {
    this.lineList.splice(0, this.lineList.length, ...e);
  }
  getSelectElementList() {
    return this.selectElementList;
  }
  getRoot() {
    return this.root;
  }
  addLine(e, i) {
    let a = {
      arr: [
        {
          value: e,
          ...i,
          type: y.TEXT
        }
      ],
      selectEndIndexPath: [],
      selectStartIndexPath: []
    };
    this.lineList.push(a);
  }
  onFocus(e, i) {
    _ = this, this.selectElementList.length == 0 && (this.selectElementList = [i.currentTarget]);
  }
  onDbClick(e) {
    this.selectElementList = [e.currentTarget];
  }
  onBlur(e, i) {
    b.handleInnerHtml(e, i.currentTarget, !0, this.onGetLineConfigType), this.selectionMenuElement && !this.selectionMenuElement.contains(i.relatedTarget) && !this.selectionLinkElement.contains(i.relatedTarget) && (this.selectionMenuElement.style.display = "none"), this.imageHelperElement && (this.imageHelperElement.style.display = "none", this.resizeObserver.unobserve(this.imageHelperElement), this.resizeImage = null), this.popMenuPosition.value = null;
  }
  onEnter(e, i, a) {
    a.preventDefault(), a.stopPropagation(), b.handleInnerHtml(e, a.currentTarget, !1, this.onGetLineConfigType);
    let t = e.arr[e.selectStartIndexPath[0]], n = {
      arr: e.arr.slice(e.selectStartIndexPath[0] + 1),
      selectStartIndexPath: [],
      selectEndIndexPath: []
    };
    if (!t || t.type === y.TEXT || t.type === y.LINK) {
      let l = t == null ? void 0 : t.value.substring(e.selectStartIndexPath[1]);
      l ? (n.arr.unshift({
        value: l,
        style: {
          ...t.style
        },
        type: y.TEXT
      }), t.value = t.value.substring(0, e.selectStartIndexPath[1])) : n.arr.unshift({
        value: "",
        style: {},
        type: y.TEXT
      });
    }
    e.arr.splice(e.selectStartIndexPath[0] + 1), this.lineList.splice(i + 1, 0, n), M(() => {
      this.selectElementList = [this.root.value.children[i + 1]];
      let l = this.root.value.children[i + 1], s = window.getSelection(), r = document.createRange();
      r.selectNodeContents(l), r.collapse(!0), s.removeAllRanges(), s.addRange(r);
    });
  }
  onDelete(e, i, a) {
    let t = a.currentTarget, l = window.getSelection().getRangeAt(0), s = l.startOffset, r = l.endOffset, o = l.startContainer, h = o, d = l.endContainer, f = d, u = [], c = [];
    if (o.tagName == "DIV")
      u = [0, s];
    else {
      u.unshift(s);
      let p = o.parentElement;
      p.tagName == "DIV" ? (s = Array.from(p.childNodes).indexOf(o), u.unshift(s), o = p) : (s = Array.from(p.parentElement.childNodes).indexOf(p), u.unshift(s), o = p.parentElement);
    }
    if (d.tagName == "DIV")
      c = [0, r];
    else {
      c.unshift(r);
      let p = d.parentElement;
      p.tagName == "DIV" ? (r = Array.from(p.childNodes).indexOf(d), c.unshift(r), d = p) : (r = Array.from(p.parentElement.childNodes).indexOf(p), c.unshift(r), d = p.parentElement);
    }
    if (u[0] == 0 && u[1] == 0 && c[0] == 0 && c[1] == 0 && h == f && e > 0) {
      a.preventDefault(), a.stopPropagation(), b.handleInnerHtml(i, t, !1, this.onGetLineConfigType);
      let p = this.lineList[e - 1];
      i.arr = i.arr.filter((k) => k.value.length > 0 || k.type === y.IMAGE);
      let g = [p.arr.length - 1 >= 0 ? p.arr.length - 1 : 0, p.arr.length > 0 ? p.arr[p.arr.length - 1].value.length : 0];
      p.arr = p.arr.concat(i.arr), this.lineList.splice(e, 1), b.fixLine(p), M(() => {
        let k = window.getSelection(), I = document.createRange(), L = this.root.value.children[e - 1].childNodes[g[0]];
        if (L)
          L.nodeType == Node.TEXT_NODE ? (I.setStart(L, g[1]), I.setEnd(L, g[1])) : L.nodeType == Node.ELEMENT_NODE && (L.tagName == "IMG" || L.tagName == "A" ? (I.selectNode(L), I.collapse(!1)) : (I.setStart(L.firstChild, g[1]), I.setEnd(L.firstChild, g[1])));
        else {
          let P = this.root.value.children[e - 1];
          I.selectNodeContents(P), I.collapse(!0);
        }
        k.removeAllRanges(), k.addRange(I);
      });
    }
  }
  onMouseDown(e) {
    this.popMenuPosition.value = null, this.clearQuote(), e.detail == 1 && (this.selectElementList = [e.currentTarget], this.isMouseDown = !0);
  }
  onMouseMove(e) {
    let i = e.currentTarget;
    if (this.isMouseDown && !this.selectElementList.includes(i)) {
      this.selectElementList.push(i);
      for (let a of this.selectElementList)
        a.innerHTML !== "" && (a.contentEditable = "false");
    }
  }
  onMouseUp(e) {
    this.isMouseDown = !1;
    let i = window.getSelection();
    if (i.rangeCount == 0)
      return;
    let a = i.getRangeAt(0);
    if (this.selectElementList.length > 0) {
      a = a.cloneRange();
      for (let s of this.selectElementList)
        M(() => {
          s.contentEditable = "true";
        });
      let t = a.startContainer;
      for (; t.tagName !== "DIV"; )
        t = t.parentElement;
      let n = a.endContainer;
      for (; n.tagName !== "DIV"; )
        n = n.parentElement;
      let l = Array.from(this.root.value.children);
      this.selectElementList = [];
      for (let s = l.indexOf(t); s <= l.indexOf(n); s++)
        this.selectElementList.push(l[s]);
      i.removeAllRanges(), i.addRange(a), this.handleMenu(e, a);
    }
  }
  onClick(e) {
    var a;
    let i = e.target;
    if (i.tagName === "A" || i.parentElement.tagName === "A") {
      let t;
      i.tagName === "A" ? t = i : i.parentElement.tagName === "A" && (t = i.parentElement);
      let n = t.getAttribute("type");
      n && ((a = this.onCustomMenuClickFunc) == null || a.call(this, Number(n), t.getAttribute("value"), t.getAttribute("link"), t.innerText));
    }
  }
  generatorSelectionMenu(e) {
    let i = e.offsetParent;
    this.selectionMenuElement = document.createElement("div"), this.selectionMenuElement.tabIndex = -1, this.selectionMenuElement.style.position = "absolute", this.selectionMenuElement.style.borderRadius = "5px", this.selectionMenuElement.style.boxShadow = "0px 0px 2px 2px rgba(169, 169, 169, 0.2)", this.selectionMenuElement.style.backgroundColor = "white", this.selectionMenuElement.style.border = "1px solid rgba(169, 169, 169, 0.2)";
    let a = document.createElement("span");
    a.setAttribute("name", "text"), a.style.cursor = "pointer", a.style.display = "inline-block", a.style.width = "50px", a.style.height = "30px", a.style.textAlign = "center", a.style.lineHeight = "30px", a.style.borderRight = "1px solid lightgray", a.innerText = "Text", a.onmouseenter = () => {
      this.selectionTextElement.style.display = "block", this.selectionTextElement.style.left = this.selectionMenuElement.offsetLeft + "px", this.selectionTextElement.style.top = this.selectionMenuElement.offsetTop + this.selectionMenuElement.offsetHeight - 2 + "px";
    }, a.onmouseleave = (h) => {
      let d = h.relatedTarget;
      (!d || !this.selectionTextElement.contains(d)) && (this.selectionTextElement.style.display = "none");
    }, this.selectionMenuElement.appendChild(a);
    let t = document.createElement("button");
    t.setAttribute("name", "bold"), t.style.cursor = "pointer", t.style.width = "30px", t.style.height = "30px", t.style.textAlign = "center", t.style.lineHeight = "30px", t.style.fontWeight = "bold", t.style.backgroundColor = "transparent", t.style.border = "0px", t.innerText = "B", t.onclick = () => {
      j.bold(this, t.style.color == "black"), t.style.color = t.style.color == "black" ? "blue" : "black";
    }, this.selectionMenuElement.appendChild(t);
    let n = document.createElement("button");
    n.setAttribute("name", "italic"), n.style.cursor = "pointer", n.style.width = "30px", n.style.height = "30px", n.style.textAlign = "center", n.style.lineHeight = "30px", n.style.fontStyle = "italic", n.style.backgroundColor = "transparent", n.style.border = "0px", n.innerText = "I", n.onclick = () => {
      j.italic(this, n.style.color == "black"), n.style.color = n.style.color == "black" ? "blue" : "black";
    }, this.selectionMenuElement.appendChild(n);
    let l = document.createElement("button");
    l.setAttribute("name", "underline"), l.style.cursor = "pointer", l.style.width = "30px", l.style.height = "30px", l.style.textAlign = "center", l.style.lineHeight = "30px", l.style.textDecoration = "underline", l.style.backgroundColor = "transparent", l.style.border = "0px", l.innerText = "U", l.onclick = () => {
      j.underLine(this, l.style.color == "black"), l.style.color = l.style.color == "black" ? "blue" : "black";
    }, this.selectionMenuElement.appendChild(l);
    let s = document.createElement("button");
    s.setAttribute("name", "lineThrough"), s.style.cursor = "pointer", s.style.width = "30px", s.style.height = "30px", s.style.textAlign = "center", s.style.lineHeight = "30px", s.style.textDecoration = "line-through", s.style.backgroundColor = "transparent", s.style.border = "0px", s.innerText = "S", s.onclick = () => {
      j.deleteLine(this, s.style.color == "black"), s.style.color = s.style.color == "black" ? "blue" : "black";
    }, this.selectionMenuElement.appendChild(s);
    let r = document.createElement("span");
    r.setAttribute("name", "color"), r.style.cursor = "pointer", r.style.display = "inline-block", r.style.width = "30px", r.style.height = "30px", r.style.textAlign = "center", r.style.lineHeight = "30px", r.innerText = "A", r.onmouseenter = () => {
      this.selectionColorElement.style.display = "block", this.selectionColorElement.style.left = this.selectionMenuElement.offsetLeft + r.offsetLeft - 100 + "px", this.selectionColorElement.style.top = this.selectionMenuElement.offsetTop + this.selectionMenuElement.offsetHeight - 2 + "px";
    }, r.onmouseleave = (h) => {
      let d = h.relatedTarget;
      (!d || !this.selectionColorElement.contains(d)) && (this.selectionColorElement.style.display = "none");
    }, this.selectionMenuElement.appendChild(r);
    let o = document.createElement("span");
    o.setAttribute("name", "link"), o.style.cursor = "pointer", o.style.display = "inline-block", o.style.width = "50px", o.style.height = "30px", o.style.textAlign = "center", o.style.lineHeight = "30px", o.innerText = "Link", o.onmouseenter = () => {
      this.selectionLinkElement.style.display = "block", this.selectionLinkElement.style.left = this.selectionMenuElement.offsetLeft + o.offsetLeft - 100 + "px", this.selectionLinkElement.style.top = this.selectionMenuElement.offsetTop + this.selectionMenuElement.offsetHeight - 2 + "px", this.selectionLinkElement.querySelector("input").value = "";
    }, o.onmouseleave = (h) => {
      let d = h.relatedTarget;
      (!d || !this.selectionLinkElement.contains(d)) && (this.selectionLinkElement.style.display = "none");
    }, this.selectionMenuElement.appendChild(o), i.appendChild(this.selectionMenuElement);
  }
  generatorSelectionColor(e) {
    let i = e.offsetParent;
    this.selectionColorElement = document.createElement("div"), this.selectionColorElement.style.position = "absolute", this.selectionColorElement.setAttribute("name", "colorList"), this.selectionColorElement.style.display = "none", this.selectionColorElement.appendChild(document.createTextNode("Text Color")), this.selectionColorElement.style.borderRadius = "5px", this.selectionColorElement.style.boxShadow = "0px 0px 2px 2px rgba(169, 169, 169, 0.2)", this.selectionColorElement.style.backgroundColor = "white", this.selectionColorElement.style.border = "1px solid rgba(169, 169, 169, 0.2)", this.selectionColorElement.style.width = "200px", this.selectionColorElement.style.padding = "5px", this.selectionColorElement.style.color = "gray", this.selectionColorElement.style.fontSize = "14px", this.selectionColorElement.onmouseleave = () => {
      this.selectionColorElement.style.display = "none";
    };
    let a = document.createElement("div");
    a.style.display = "flex", a.style.flexWrap = "wrap", a.style.marginTop = "5px", a.style.marginBottom = "10px";
    let t = ["black", "red", "blue", "green", "yellow", "gray", "brown", "orange", "pink", "purple"];
    for (let s of t) {
      let r = document.createElement("button");
      r.style.cursor = "pointer", r.style.width = "25px", r.style.height = "25px", r.style.textAlign = "center", r.style.lineHeight = "25px", r.style.backgroundColor = "transparent", r.style.border = "1px solid lightgray", r.style.color = s, r.style.marginRight = "5px", r.style.marginTop = "5px", r.style.borderRadius = "5px", r.innerText = "A", r.onclick = () => {
        j.color(this, s), this.selectionColorElement.style.display = "none";
      }, a.appendChild(r);
    }
    this.selectionColorElement.appendChild(a), this.selectionColorElement.appendChild(document.createTextNode("Background Color"));
    let n = document.createElement("div");
    n.style.display = "flex", n.style.flexWrap = "wrap", n.style.marginTop = "5px";
    let l = ["transparent", "red", "blue", "green", "yellow", "gray", "brown", "orange", "pink", "purple"];
    for (let s of l) {
      let r = document.createElement("button");
      r.style.cursor = "pointer", r.style.width = "25px", r.style.height = "25px", r.style.marginRight = "5px", r.style.marginTop = "5px", r.style.border = "0px", r.style.borderRadius = "5px", s != "transparent" && (r.style.backgroundColor = s), r.onclick = () => {
        j.backgroundColor(this, s), this.selectionColorElement.style.display = "none";
      }, n.appendChild(r);
    }
    this.selectionColorElement.appendChild(n), i.appendChild(this.selectionColorElement);
  }
  generatorSelectionText(e) {
    let i = e.offsetParent;
    this.selectionTextElement = document.createElement("div"), this.selectionTextElement.setAttribute("name", "fontSizeList"), this.selectionTextElement.style.display = "none", this.selectionTextElement.style.flexDirection = "column", this.selectionTextElement.style.width = "60px", this.selectionTextElement.style.position = "absolute", this.selectionTextElement.style.borderRadius = "5px", this.selectionTextElement.style.boxShadow = "0px 0px 2px 2px rgba(169, 169, 169, 0.2)", this.selectionTextElement.style.backgroundColor = "white", this.selectionTextElement.style.border = "1px solid rgba(169, 169, 169, 0.2)", this.selectionTextElement.onmouseleave = () => {
      this.selectionTextElement.style.display = "none";
    };
    for (let a = 16; a <= 48; a += 8) {
      let t = document.createElement("button");
      t.style.cursor = "pointer", t.style.width = "100%", t.style.height = "30px", t.style.textAlign = "center", t.style.lineHeight = "30px", t.style.backgroundColor = "transparent", t.style.border = "0px", a == 16 ? t.innerText = "Normal" : a == 24 ? t.innerText = "H4" : a == 32 ? t.innerText = "H3" : a == 40 ? t.innerText = "H2" : a == 48 && (t.innerText = "H1"), t.onclick = () => {
        j.fontSize(this, String(a) + "px"), this.selectionTextElement.style.display = "none";
      }, this.selectionTextElement.appendChild(t);
    }
    i.appendChild(this.selectionTextElement);
  }
  generatorSelectionLink(e) {
    let i = e.offsetParent;
    this.selectionLinkElement = document.createElement("div"), this.selectionLinkElement.setAttribute("name", "link"), this.selectionLinkElement.style.display = "none", this.selectionLinkElement.style.position = "absolute", this.selectionLinkElement.style.borderRadius = "5px", this.selectionLinkElement.style.boxShadow = "0px 0px 2px 2px rgba(169, 169, 169, 0.2)", this.selectionLinkElement.style.backgroundColor = "white", this.selectionLinkElement.style.border = "1px solid rgba(169, 169, 169, 0.2)", this.selectionLinkElement.style.padding = "5px", this.selectionLinkElement.onmouseleave = () => {
      this.selectionLinkElement.style.display = "none";
    };
    let a = document.createElement("input");
    a.placeholder = "type your link";
    let t = document.createElement("button");
    t.innerText = "save", t.style.backgroundColor = "transparent", t.style.border = "0px", t.style.marginLeft = "10px", t.onclick = () => {
      a.value && (j.link(this, a.value), this.selectionLinkElement.style.display = "none");
    }, this.selectionLinkElement.appendChild(a), this.selectionLinkElement.appendChild(t), i.appendChild(this.selectionLinkElement);
  }
  generatorLinkEdit(e) {
    let i = e.offsetParent;
    this.linkEditElement = document.createElement("div"), this.linkEditElement.setAttribute("name", "linkEdit"), this.linkEditElement.style.display = "none", this.linkEditElement.style.position = "absolute", this.linkEditElement.style.borderRadius = "5px", this.linkEditElement.style.boxShadow = "0px 0px 2px 2px rgba(169, 169, 169, 0.2)", this.linkEditElement.style.backgroundColor = "white", this.linkEditElement.style.border = "1px solid rgba(169, 169, 169, 0.2)", this.linkEditElement.style.padding = "5px", this.linkEditElement.style.color = "gray", this.linkEditElement.style.fontSize = "14px", this.linkEditElement.onmouseleave = () => {
      this.linkEditElement.style.display = "none";
    }, this.linkEditElement.appendChild(document.createTextNode("uri")), this.linkEditElement.appendChild(document.createElement("br"));
    let a = document.createElement("input");
    a.style.marginTop = "5px", a.style.marginBottom = "10px", a.style.width = "90%", a.placeholder = "type your link", this.linkEditElement.appendChild(a), this.linkEditElement.appendChild(document.createElement("br")), this.linkEditElement.appendChild(document.createTextNode("title")), this.linkEditElement.appendChild(document.createElement("br"));
    let t = document.createElement("input");
    t.placeholder = "type your title", t.style.marginTop = "5px", t.style.width = "90%", this.linkEditElement.appendChild(t);
    let n = document.createElement("button");
    n.setAttribute("name", "save"), n.innerText = "save", n.style.borderRadius = "5px", n.style.border = "0px", n.style.marginTop = "10px", n.style.width = "100%", n.style.height = "25px", this.linkEditElement.appendChild(n), this.linkEditElement.appendChild(document.createElement("br"));
    let l = document.createElement("button");
    l.setAttribute("name", "remove"), l.innerText = "remove", l.style.borderRadius = "5px", l.style.border = "0px", l.style.marginTop = "10px", l.style.width = "100%", l.style.height = "25px", this.linkEditElement.appendChild(l), i.appendChild(this.linkEditElement);
  }
  handleMenu(e, i) {
    if (i.collapsed) {
      this.selectionMenuElement && (this.selectionMenuElement.style.display = "none");
      let a = e.target;
      if (a.tagName == "A" && a.getAttribute("target")) {
        this.linkEditElement || this.generatorLinkEdit(a);
        let t = a.parentElement, n = Array.from(t.childNodes).indexOf(a), l = Array.from(this.root.value.children).indexOf(t), s = this.lineList[l].arr[n];
        this.linkEditElement.style.display = "block";
        let r = i.getBoundingClientRect(), h = e.target.offsetParent.getBoundingClientRect(), d = r.left - h.left;
        r.top - h.top;
        let f = r.bottom - h.top, u = d - 10, c = f + 10;
        u < 0 && (u = 0), this.linkEditElement.style.left = u + "px", this.linkEditElement.style.top = c + "px";
        let p = this.linkEditElement.querySelectorAll("input")[0];
        p.value = s.link;
        let g = this.linkEditElement.querySelectorAll("input")[1];
        g.value = s.value;
        let k = this.linkEditElement.querySelector("[name='save']");
        k.onclick = () => {
          let L = this.lineList[l].arr[n], P = p.value, C = g.value;
          !P || !C || (L.link = P, L.value = C, this.linkEditElement.style.display = "none");
        };
        let I = this.linkEditElement.querySelector("[name='remove']");
        I.onclick = () => {
          let L = this.lineList[l].arr[n];
          L.type = y.TEXT, delete L.link, b.fixLine(this.lineList[l]), this.linkEditElement.style.display = "none";
        };
      }
    } else {
      if (!this.selectionMenuElement) {
        let g = e.target;
        this.generatorSelectionMenu(g), this.generatorSelectionText(g), this.generatorSelectionColor(g), this.generatorSelectionLink(g);
      }
      this.selectionMenuElement.style.display = "block";
      let a = i.getBoundingClientRect(), n = e.target.offsetParent.getBoundingClientRect(), l = a.left - n.left, s = a.top - n.top, r = a.bottom - n.top, o = l - 10, h = s - 40;
      o < 0 && (o = l), h < 0 && (h = r + 10), this.selectionMenuElement.style.left = o + "px", this.selectionMenuElement.style.top = h + "px";
      let d = j.isBold(this), f = j.isItalic(this), u = j.isUnderLine(this), c = j.isDeleteLine(this), p = this.selectionMenuElement.querySelector("[name='bold']");
      p.style.color = d ? "blue" : "black", p = this.selectionMenuElement.querySelector("[name='italic']"), p.style.color = f ? "blue" : "black", p = this.selectionMenuElement.querySelector("[name='underline']"), p.style.color = u ? "blue" : "black", p = this.selectionMenuElement.querySelector("[name='lineThrough']"), p.style.color = c ? "blue" : "black";
    }
  }
  onCopy(e) {
    const i = window.getSelection().getRangeAt(0);
    i.startContainer.nodeType === Node.TEXT_NODE && i.startContainer.parentElement.tagName === "A" && i.setStartBefore(i.startContainer.parentElement);
    const a = i.cloneContents(), t = document.createElement("div");
    t.setAttribute("copy", "teamlinker"), t.appendChild(a), e.clipboardData.setData("text/html", t.outerHTML), e.clipboardData.setData("text/plain", t.innerText), e.preventDefault(), e.stopPropagation();
  }
  onPaste(e) {
    var a;
    let i = e.clipboardData.types;
    if (this.getSelectElementList(), i.includes("Files")) {
      let t = e.clipboardData.files[0];
      if (t) {
        let n = window.getSelection(), s = n.getRangeAt(0).startContainer;
        for (; s.tagName != "DIV"; )
          s = s.parentElement;
        let r = Array.from(this.root.value.children).indexOf(s), o = this.lineList[r];
        b.handleInnerHtml(o, s, !0, this.onGetLineConfigType), (a = this.onUploadFileFunc) == null || a.call(this, t, (h, d) => {
          let f = o.arr[o.selectStartIndexPath[0]], u = {
            value: h,
            link: d,
            type: y.IMAGE
          }, c;
          if (f) {
            let p = JSON.parse(JSON.stringify(f));
            p.value = p.value.substring(o.selectStartIndexPath[1]);
            let g = [...o.arr.slice(o.selectStartIndexPath[0] + 1)];
            p.type != y.IMAGE && g.unshift(p), f.value = f.value.substring(0, o.selectStartIndexPath[1]), o.arr.splice(o.selectStartIndexPath[0] + 1, 0, u), c = o.arr.length - 1, o.arr = o.arr.concat(g);
          } else
            o.arr = [u], c = 0;
          b.fixLine(o), M(() => {
            let p = document.createRange();
            p.selectNode(s.childNodes[c]), p.collapse(!1), n.removeAllRanges(), n.addRange(p);
          });
        });
      }
    } else if (i != null && i.includes("text/html")) {
      e.stopPropagation(), e.preventDefault();
      let t = document.createElement("div");
      t.innerHTML = e.clipboardData.getData("text/html");
      let n = t.getElementsByTagName("div"), l = !1;
      t.childNodes.length == 2 && t.firstChild.tagName === "META" && t.childNodes[1].tagName === "DIV" && t.childNodes[1].getAttribute("copy") === "teamlinker" && (l = !0);
      let s = window.getSelection(), o = s.getRangeAt(0).startContainer;
      for (; o.tagName != "DIV"; )
        o = o.parentElement;
      let h = Array.from(this.root.value.children).indexOf(o), d = this.lineList[Array.from(this.root.value.children).indexOf(o)];
      if (b.handleInnerHtml(d, o, !0, this.onGetLineConfigType), l) {
        let f, u = [];
        for (let c = 0; c < n.length; c++) {
          let p = {
            arr: [],
            selectEndIndexPath: [],
            selectStartIndexPath: []
          };
          if (b.handleInnerHtml(p, n[c], !1, this.onGetLineConfigType), c == 0 || c == n.length - 1)
            if (c == 0) {
              let g = "", k = !1;
              if (d.arr.forEach((I) => {
                g += I.value, I.type == y.IMAGE && (k = !0);
              }), !g && !k)
                this.lineList.splice(this.lineList.indexOf(d), 1, p);
              else {
                let I = d.arr[d.selectStartIndexPath[0]], L = JSON.parse(JSON.stringify(I));
                L.value = L.value.substring(d.selectStartIndexPath[1]), f = [...d.arr.slice(d.selectStartIndexPath[0] + 1)], L.type != y.IMAGE && f.unshift(L), I.value = I.value.substring(0, d.selectStartIndexPath[1]), d.arr.splice(d.selectStartIndexPath[0] + 1, d.arr.length, ...p.arr), b.fixLine(d);
              }
              if (n.length == 1) {
                let I;
                f && (I = {
                  endItem: d.arr[d.arr.length - 1]
                }, d.arr = d.arr.concat(f), b.fixLine(d, I)), u = [h + c, I ? d.arr.indexOf(I.endItem) : p.arr.length - 1];
              }
            } else {
              let g;
              f && (g = {
                endItem: p.arr[p.arr.length - 1]
              }, p.arr = p.arr.concat(f), b.fixLine(p, g)), this.lineList.splice(h + c, 0, p), u = [h + c, g ? p.arr.indexOf(g.endItem) : p.arr.length - 1];
            }
          else
            this.lineList.splice(h + c, 0, p);
        }
        M(() => {
          let c = window.getSelection(), p = document.createRange();
          p.selectNode(this.root.value.children[u[0]].childNodes[u[1]]), p.collapse(!1), c.removeAllRanges(), c.addRange(p);
        });
      } else {
        let f = d.arr[d.selectStartIndexPath[0]];
        if (f) {
          let u = (f.value.substring(0, d.selectStartIndexPath[1]) + t.innerText).length;
          f.value = f.value.substring(0, d.selectStartIndexPath[1]) + t.innerText + f.value.substring(d.selectStartIndexPath[1]), M(() => {
            let c = o.childNodes[d.selectStartIndexPath[0]], p = document.createRange();
            c.nodeType == Node.TEXT_NODE ? (p.setStart(c, u), p.setEnd(c, u)) : c.nodeType == Node.ELEMENT_NODE && (c.tagName == "IMG" ? (p.selectNode(c), p.collapse(!1)) : (p.setStart(c.firstChild, u), p.setEnd(c.firstChild, u))), s.removeAllRanges(), s.addRange(p);
          });
        } else
          d.arr.push({
            value: t.innerText,
            type: y.TEXT,
            style: {}
          }), M(() => {
            let u = o.firstChild, c = document.createRange();
            c.selectNodeContents(u), c.collapse(!1), s.removeAllRanges(), s.addRange(c);
          });
      }
    }
  }
  onMouseOver(e) {
    let i = e.target;
    if (i.tagName == "IMG") {
      let a = i.offsetParent, t = a.getBoundingClientRect(), n = i.getBoundingClientRect(), l = n.left - t.left, s = n.top - t.top, r = i.offsetWidth, o = i.offsetHeight;
      this.imageHelperElement || (this.imageHelperElement = document.createElement("div"), a.appendChild(this.imageHelperElement), this.resizeObserver = new ResizeObserver((h, d) => {
        for (let f of h)
          this.resizeImage && (this.resizeImage.width = f.contentRect.width);
      })), this.imageHelperElement.style.border = "1px solid blue", this.imageHelperElement.style.position = "absolute", this.imageHelperElement.style.left = l + "px", this.imageHelperElement.style.top = s + "px", this.imageHelperElement.style.width = r + "px", this.imageHelperElement.style.height = o + "px", this.imageHelperElement.style.overflow = "hidden", this.imageHelperElement.style.resize = "both", this.imageHelperElement.style.display = "block", this.resizeImage = i, this.resizeObserver.observe(this.imageHelperElement);
    } else
      this.imageHelperElement && (this.imageHelperElement.style.display = "none", this.resizeObserver.unobserve(this.imageHelperElement)), this.resizeImage && (this.resizeImage = null);
  }
  onKeyDown(e) {
    if ((e.metaKey || e.ctrlKey) && e.key == "a") {
      e.stopPropagation(), e.preventDefault();
      let i = window.getSelection(), t = i.getRangeAt(0).startContainer;
      for (; t.tagName != "DIV"; )
        t = t.parentElement;
      let n = Array.from(this.root.value.children).indexOf(t), l = this.lineList[n];
      b.handleInnerHtml(l, t, !1, this.onGetLineConfigType), this.selectElementList = Array.from(this.root.value.children), M(() => {
        let s = document.createRange(), r, o;
        for (let h = 0; h < this.root.value.childNodes.length; h++) {
          let d = this.root.value.childNodes[h];
          for (let f = 0; f < d.childNodes.length; f++) {
            let u = d.childNodes[f];
            if (u) {
              r = u;
              break;
            }
          }
          if (r)
            break;
        }
        for (let h = this.root.value.childNodes.length - 1; h >= 0; h--) {
          let d = this.root.value.childNodes[h];
          for (let f = d.childNodes.length - 1; f >= 0; f--) {
            let u = d.childNodes[f];
            if (u) {
              o = u;
              break;
            }
          }
          if (o)
            break;
        }
        r && o && (s.setStartBefore(r), s.setEndAfter(o), i.removeAllRanges(), i.addRange(s));
      });
    }
    if (e.key === "/") {
      let a = window.getSelection().getRangeAt(0), t = a.getBoundingClientRect();
      if (t.left == 0 && t.top == 0 && t.width == 0 && t.height == 0) {
        if (a.startContainer.tagName == "DIV" && a.startOffset !== 0)
          return;
        t = a.startContainer.getBoundingClientRect();
      }
      let n = t.right + t.width, l = t.bottom, s, r;
      n > 160 ? s = t.left : s = t.left - 150, document.body.clientHeight - l > 210 ? r = t.top + t.height : r = t.top - 200, this.popMenuPosition.value = {
        left: s,
        top: r
      };
    } else
      this.popMenuPosition.value = null;
    if (e.key === "@") {
      if (!this.onQuoteListFunc)
        return;
      let a = window.getSelection().getRangeAt(0), t = a.getBoundingClientRect();
      if (t.left == 0 && t.top == 0 && t.width == 0 && t.height == 0) {
        if (a.startContainer.tagName == "DIV" && a.startOffset !== 0)
          return;
        t = a.startContainer.getBoundingClientRect();
      }
      let n = t.right + t.width, l = t.bottom, s, r;
      n > 160 ? s = t.left : s = t.left - 150, document.body.clientHeight - l > 210 ? r = t.top + t.height : r = t.top - 200, this.quotePosition.value = {
        left: s,
        top: r
      };
    } else
      this.clearQuote();
    if (e.key == "ArrowDown") {
      let i = window.getSelection(), a = i.getRangeAt(0), t = a.startOffset, n = a.startContainer, l = [];
      l.unshift(t);
      let s = n.parentElement;
      if (n.tagName == "DIV" ? l.unshift(0) : s.tagName == "DIV" ? (t = Array.from(s.childNodes).indexOf(n), l.unshift(t), n = s) : (t = Array.from(s.parentElement.childNodes).indexOf(s), l.unshift(t), n = s.parentElement), a.collapsed && (n.childNodes.length == 0 || l[0] == n.childNodes.length - 1 && l[1] == n.lastChild.textContent.length)) {
        e.stopPropagation(), e.preventDefault();
        let r = Array.from(this.root.value.children).indexOf(n);
        if (r < this.lineList.length - 1) {
          let o = document.createRange();
          o.selectNodeContents(this.root.value.children[r + 1]), o.collapse(!0), i.removeAllRanges(), i.addRange(o);
        }
      }
    } else if (e.key == "ArrowUp") {
      let i = window.getSelection(), a = i.getRangeAt(0), t = a.startOffset, n = a.startContainer, l = [];
      if (l.unshift(t), n.tagName == "DIV")
        l.unshift(0);
      else {
        let s = n.parentElement;
        s.tagName == "DIV" ? (t = Array.from(s.childNodes).indexOf(n), l.unshift(t), n = s) : (t = Array.from(s.parentElement.childNodes).indexOf(s), l.unshift(t), n = s.parentElement);
      }
      if (a.collapsed && l[0] == 0 && l[1] == 0) {
        e.stopPropagation(), e.preventDefault();
        let s = Array.from(this.root.value.children).indexOf(n);
        if (s > 0) {
          let r = document.createRange();
          r.selectNodeContents(this.root.value.children[s - 1]), r.collapse(!1), i.removeAllRanges(), i.addRange(r);
        }
      }
    }
  }
  getSelectionItemList() {
    let e = [];
    this.selectElementList.forEach((u) => {
      e.push(this.lineList[Array.from(this.root.value.children).indexOf(u)]);
    });
    let a = window.getSelection().getRangeAt(0), t = a.startOffset, n = a.endOffset, l = a.startContainer, s = a.endContainer, r = [], o = [];
    if (l.tagName == "DIV")
      r = [t, 0];
    else {
      r.unshift(t);
      let u = l.parentElement;
      u.tagName == "DIV" ? (t = Array.from(u.childNodes).indexOf(l), r.unshift(t), l = u) : (t = Array.from(u.parentElement.childNodes).indexOf(u), r.unshift(t), l = u.parentElement);
    }
    if (s.tagName == "DIV")
      o = [n, s.childNodes[n] ? s.childNodes[n].textContent.length : 0];
    else {
      o.unshift(n);
      let u = s.parentElement;
      u.tagName == "DIV" ? (n = Array.from(u.childNodes).indexOf(s), o.unshift(n), s = u) : (n = Array.from(u.parentElement.childNodes).indexOf(u), o.unshift(n), s = u.parentElement);
    }
    let h = e[0];
    h.selectStartIndexPath = r;
    let d = e[e.length - 1];
    d.selectEndIndexPath = o;
    let f = [];
    if (e.length == 1)
      b.handleInnerHtml(e[0], l, !1, this.onGetLineConfigType), f = [{
        line: e[0],
        data: [...e[0].arr.slice(r[0], o[0] + 1)]
      }];
    else
      for (let u of e) {
        let c = f.find((p) => p.line === u);
        if (c || (c = {
          line: u,
          data: []
        }, f.push(c)), u == h) {
          b.handleInnerHtml(u, l, !1, this.onGetLineConfigType);
          for (let p = r[0]; p < h.arr.length; p++) {
            let g = h.arr[p];
            c.data.push(g);
          }
        } else if (u == d) {
          b.handleInnerHtml(u, s, !1, this.onGetLineConfigType);
          for (let p = 0; p <= o[0]; p++) {
            let g = d.arr[p];
            g && c.data.push(g);
          }
        } else
          b.handleInnerHtml(u, this.root.value.children[this.lineList.indexOf(u)], !1, this.onGetLineConfigType), u.arr.forEach((p) => {
            c.data.push(p);
          });
      }
    return f;
  }
  getCurrentInfo() {
    let a = window.getSelection().getRangeAt(0).startContainer, t = a;
    for (; t.tagName != "DIV"; )
      t = t.parentElement;
    let n = Array.from(this.root.value.children).indexOf(t), l = this.lineList[n], s, r;
    return a != t && (r = Array.from(t.childNodes).indexOf(a), s = l.arr[r]), {
      element: t,
      line: l,
      lineIndex: n,
      item: s,
      itemIndex: r
    };
  }
}
const Se = {
  style: { position: "absolute", boxShadow: "0px 0px 2px 2px rgba(169, 169, 169, 0.2)", backgroundColor: "white", border: "1px solid rgba(169, 169, 169, 0.2)", width: "150px", height: "200px", overflow: "auto", outlineWidth: "0", "z-index": "10000" },
  tabIndex: "-1"
}, ve = ["onMousedown"], Te = /* @__PURE__ */ ee({
  __name: "popMenu",
  props: {
    objEditor: {},
    popMenuList: {}
  },
  setup(E) {
    const e = E, i = G(e.popMenuList ?? []), a = async (t) => {
      var s, r;
      let n = e.objEditor.getSelectionItemList(), l = JSON.parse(JSON.stringify(n[0].line.selectStartIndexPath));
      (r = (s = e.objEditor).onPopMenuClickFunc) == null || r.call(s, t.type, (o) => {
        let h = n[0].line, d = e.objEditor.getRoot().value.children[e.objEditor.getLineList().indexOf(h)], f = h.arr[l[0]], u = JSON.parse(JSON.stringify(f));
        u.value = f.value.substring(l[1]), f.value = f.value.substring(0, l[1] - 1), h.arr.splice(l[0] + 1, 0, o, u);
        let c = { startIndex: l[0] + 1 };
        b.fixLine(h, c), M(() => {
          let p = window.getSelection(), g = document.createRange();
          g.setStartAfter(d.childNodes[c.startIndex] ?? d.lastChild), g.setEndAfter(d.childNodes[c.startIndex] ?? d.lastChild), p.removeAllRanges(), p.addRange(g);
        });
      });
    };
    return (t, n) => (D(), B("div", Se, [
      (D(!0), B(J, null, $(i.value, (l, s) => (D(), B("div", {
        class: "item",
        style: te([{ height: "35px", display: "flex", "align-items": "center", "justify-content": "center", cursor: "pointer" }, { borderBottom: s !== i.value.length - 1 ? "rgb(241,241,241) 1px solid" : "" }]),
        key: l.type,
        onMousedown: (r) => a(l)
      }, ae(l.title), 45, ve))), 128))
    ]));
  }
});
const le = (E, e) => {
  const i = E.__vccOpts || E;
  for (const [a, t] of e)
    i[a] = t;
  return i;
}, Ce = /* @__PURE__ */ le(Te, [["__scopeId", "data-v-5cf468f7"]]), ke = ["onClick"], Pe = { style: { height: "30px", "border-bottom": "1px lightgray solid" } }, we = ["onClick"], Oe = ["src"], Ae = /* @__PURE__ */ ee({
  __name: "quote",
  props: {
    objEditor: {},
    quoteType: {},
    position: {}
  },
  setup(E) {
    const e = E, i = G(""), a = G(), t = G([]);
    let n, l;
    const s = async () => {
      var d, f;
      (f = (d = e.objEditor).onQuoteListFunc) == null || f.call(d, i.value, (u) => {
        t.value = u;
      });
    }, r = (d) => {
      e.objEditor.clearQuote();
    }, o = (d) => {
      n || (n = e.objEditor.getSelectionItemList(), l = JSON.parse(JSON.stringify(n[0].line.selectStartIndexPath)));
    }, h = async (d) => {
      e.objEditor.clearQuote();
      let f = n[0].line, u = e.objEditor.getRoot().value.children[e.objEditor.getLineList().indexOf(f)], c = f.arr[l[0]], p = JSON.parse(JSON.stringify(c));
      p.value = c.value.substring(l[1]), c.value = c.value.substring(0, l[1] - 1);
      let g = {
        type: e.quoteType,
        value: d.value,
        label: d.label
      };
      f.arr.splice(l[0] + 1, 0, g, p);
      let k = { startIndex: l[0] + 1 };
      b.fixLine(f, k), M(() => {
        let I = window.getSelection(), L = document.createRange();
        L.setStartAfter(u.childNodes[k.startIndex] ?? u.lastChild), L.setEndAfter(u.childNodes[k.startIndex] ?? u.lastChild), I.removeAllRanges(), I.addRange(L);
      });
    };
    return pe(() => {
      s();
    }), (d, f) => (D(), B("div", {
      style: { width: "100%", height: "100%", position: "absolute", "z-index": "10000", left: "0px", top: "0px" },
      onClick: ue(r, ["self"])
    }, [
      W("div", {
        style: te([{ width: "150px", height: "200px", padding: "5px", "box-sizing": "border-box", position: "absolute", "box-shadow": "0px 0px 2px 2px rgba(169, 169, 169, 0.2)", border: "1px solid rgba(169, 169, 169, 0.2)", "background-color": "white", overflow: "auto", "outline-width": "0" }, {
          left: d.position.left + "px",
          top: d.position.top + "px"
        }]),
        ref_key: "rootEle",
        ref: a,
        onMousedown: o
      }, [
        W("div", Pe, [
          fe(W("input", {
            "onUpdate:modelValue": f[0] || (f[0] = (u) => i.value = u),
            style: { width: "100%", "box-sizing": "border-box" },
            onInput: s
          }, null, 544), [
            [me, i.value]
          ])
        ]),
        (D(!0), B(J, null, $(t.value, (u) => (D(), B("div", {
          class: "hover",
          style: { height: "40px", display: "flex", "align-items": "center" },
          onClick: (c) => h(u)
        }, [
          u.photo ? (D(), B("img", {
            key: 0,
            style: { width: "30px", height: "30px", "border-radius": "15px" },
            src: u.photo
          }, null, 8, Oe)) : Z("", !0),
          ge("  " + ae(u.label), 1)
        ], 8, we))), 256))
      ], 36)
    ], 8, ke));
  }
});
const Me = /* @__PURE__ */ le(Ae, [["__scopeId", "data-v-d7f26c8d"]]), Re = ["onBlur", "innerHTML", "onKeydown", "onFocus", "placeholder"], De = ["innerHTML"], _e = /* @__PURE__ */ ee({
  __name: "index",
  props: {
    readonly: { type: Boolean },
    modelValue: {},
    border: { type: Boolean },
    popMenuList: {},
    placeholder: {},
    quoteType: {}
  },
  emits: ["update:modelValue", "uploadFile", "popMenuClick", "customAnchorClick", "quoteList", "metaEnter", "linkClick", "setLineConfigType", "getLineConfigType"],
  setup(E, { expose: e, emit: i }) {
    const a = E, t = G(), n = G([]);
    let l = [0, 0, 0];
    const s = G(), r = G(), o = new Ne(t, s, r);
    o.onSetLineConfigType = (m, x) => {
      i("setLineConfigType", m, x);
    }, o.onGetLineConfigType = (m, x) => {
      i("getLineConfigType", m, x);
    }, o.onUploadFileFunc = (m, x) => {
      i("uploadFile", m, x);
    }, o.onPopMenuClickFunc = (m, x) => {
      i("popMenuClick", m, x);
    }, o.onCustomMenuClickFunc = (m, x, v, S) => {
      i("customAnchorClick", m, x, v, S);
    }, ye().vnode.props.onQuoteList && (o.onQuoteListFunc = (m, x) => {
      i("quoteList", m, x);
    });
    const h = o.getLineList();
    let d = [], f = !1;
    ne(h, () => {
      i("update:modelValue", h);
    }, {
      deep: !0
    }), ne(() => a.modelValue, (m, x, v) => {
      if (o.setLineList(a.modelValue), h.length == 0 && o.addLine(""), x && x.length > 0 && !f) {
        let S = JSON.parse(JSON.stringify(x));
        S.forEach((R) => {
          delete R.selectStartIndexPath, delete R.selectEndIndexPath;
        });
        let A = JSON.stringify(S);
        if (d.length == 0)
          d.unshift(S);
        else {
          let R = d[0];
          JSON.stringify(R) !== A && d.unshift(S);
        }
        d.length > 10 && d.pop();
      } else
        f === !0 && (f = !1);
    }, {
      deep: !0,
      immediate: !0
    });
    const u = (m, x) => {
      o.onFocus(m, x);
    }, c = (m) => {
      o.onDbClick(m);
    }, p = (m, x) => {
      o.onBlur(m, x);
    }, g = (m, x, v) => {
      v.metaKey ? (b.handleInnerHtml(m, v.currentTarget, !1, o.onGetLineConfigType), M(() => {
        i("metaEnter");
      })) : o.onEnter(m, x, v);
    }, k = (m, x, v) => {
      o.onDelete(m, x, v);
    }, I = (m) => {
      o.onMouseDown(m);
    }, L = (m) => {
      o.onMouseMove(m);
    }, P = () => {
      let m = window.getSelection();
      if (m.rangeCount == 0)
        return;
      let x = m.getRangeAt(0), v = x.startOffset;
      l = [];
      let S = x.startContainer;
      if (S.tagName === "DIV")
        l = [0, v], l.unshift(Array.from(S.parentElement.children).indexOf(S));
      else {
        l = [v];
        let A = S.parentElement;
        A.tagName == "DIV" ? (v = Array.from(A.childNodes).indexOf(S), l.unshift(v), S = A) : (v = Array.from(A.parentElement.childNodes).indexOf(A), l.unshift(v), S = A.parentElement), l.unshift(Array.from(S.parentElement.children).indexOf(S));
      }
    }, C = (m) => {
      P();
    }, q = (m) => {
      o.onMouseUp(m), P();
    }, F = (m) => {
      o.onPaste(m);
    }, K = (m) => {
      a.readonly || o.onMouseOver(m);
    }, N = (m) => {
      o.onCopy(m);
    }, w = (m) => {
      if (!a.readonly && (o.onKeyDown(m), m.key == "z" && (m.metaKey || m.ctrlKey))) {
        if (m.stopPropagation(), m.preventDefault(), d.length > 0) {
          let x = d.shift();
          o.setLineList(x);
        }
        f = !0;
      }
    }, T = (m) => {
      if (o.onClick(m), a.readonly) {
        let x = m.target, v = x.getAttribute("type");
        if (x.tagName === "A" && v) {
          let S = x.getAttribute("value");
          i("linkClick", Number(v), S, m.x, m.y);
        }
      }
    }, H = (m) => {
      if (m.length == 0)
        return;
      let x = [];
      m.forEach((V) => {
        x.push(V, {
          type: y.TEXT,
          value: "&nbsp;"
        });
      });
      let v = h[l[0]], S = n.value[l[0]];
      b.handleInnerHtml(v, S, !1, o.onGetLineConfigType);
      let A = v.arr[l[1]], R;
      if (A) {
        let V = JSON.parse(JSON.stringify(A));
        V.value = A.value.substring(l[2]), A.value = A.value.substring(0, l[2]), v.arr.splice(l[1] + 1, 0, ...x, V), R = { endIndex: l[1] + x.length };
      } else
        v.arr.push(...x), R = { endIndex: l[1] + x.length - 1 };
      b.fixLine(v, R), M(() => {
        let V = window.getSelection(), Y = document.createRange();
        Y.setStart(S.childNodes[R.endIndex], 1), Y.setEnd(S.childNodes[R.endIndex], 1), V.removeAllRanges(), V.addRange(Y);
      });
    };
    return Ee(() => {
      o.clear();
    }), e({
      insertConfig: H
    }), (m, x) => {
      var v;
      return D(), B(J, null, [
        W("div", xe({
          ref_key: "root",
          ref: t,
          onMouseover: K,
          onKeydown: w,
          style: [{ padding: "10px" }, { border: m.border ? "border: 1px solid lightgray;" : "0px" }],
          onKeyup: C,
          onCopy: N
        }, m.$attrs), [
          m.readonly ? (D(!0), B(J, { key: 1 }, $(X(h), (S, A) => (D(), B("div", {
            onClick: T,
            key: A + 1,
            innerHTML: X(b).handle(S, X(o).onSetLineConfigType),
            style: { "line-height": "1.5", "min-height": "21px" }
          }, null, 8, De))), 128)) : (D(!0), B(J, { key: 0 }, $(X(h), (S, A) => (D(), B("div", {
            key: A,
            contenteditable: "true",
            onBlur: (R) => p(S, R),
            ref_for: !0,
            ref_key: "elementList",
            ref: n,
            innerHTML: X(b).handle(S, X(o).onSetLineConfigType),
            onKeydown: [
              ie((R) => g(S, A, R), ["enter"]),
              ie((R) => k(A, S, R), ["delete"])
            ],
            style: { "line-height": "1.5" },
            onFocus: (R) => u(S, R),
            onMousedown: I,
            onMouseup: q,
            onMousemove: L,
            onDblclick: c,
            onPaste: F,
            onClick: T,
            placeholder: m.placeholder ?? "type something"
          }, null, 40, Re))), 128))
        ], 16),
        s.value && ((v = m.popMenuList) == null ? void 0 : v.length) > 0 ? (D(), se(re, {
          key: 0,
          to: "body"
        }, [
          oe(Ce, {
            "obj-editor": X(o),
            "pop-menu-list": m.popMenuList,
            style: te({
              left: s.value.left + "px",
              top: s.value.top + "px"
            })
          }, null, 8, ["obj-editor", "pop-menu-list", "style"])
        ])) : Z("", !0),
        r.value && m.quoteType != null ? (D(), se(re, {
          key: 1,
          to: "body"
        }, [
          oe(Me, {
            "obj-editor": X(o),
            "quote-type": m.quoteType,
            position: r.value
          }, null, 8, ["obj-editor", "quote-type", "position"])
        ])) : Z("", !0)
      ], 64);
    };
  }
});
const He = /* @__PURE__ */ le(_e, [["__scopeId", "data-v-81822f8b"]]), Xe = {
  install(E) {
    E.component("TLEditor", He);
  }
};
export {
  He as Editor,
  Xe as default
};
