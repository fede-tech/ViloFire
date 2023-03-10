jQuery.extendIf = function (d, e) {
  if (d && e) {
    for (var b in e) {
      if (typeof d[b] == "undefined") {
        d[b] = e[b];
      }
    }
  }
  return d;
};
if (typeof Ext == "undefined") {
  jQuery.extend(Function.prototype, {
    createCallback: function () {
      var b = arguments;
      var c = this;
      return function () {
        return c.apply(window, b);
      };
    },
    createDelegate: function (d, c, b) {
      var e = this;
      return function () {
        var g = c || arguments;
        if (b === true) {
          g = Array.prototype.slice.call(arguments, 0);
          g = g.concat(c);
        } else {
          if (typeof b == "number") {
            g = Array.prototype.slice.call(arguments, 0);
            var f = [b, 0].concat(c);
            Array.prototype.splice.apply(g, f);
          }
        }
        return e.apply(d || window, g);
      };
    },
    defer: function (d, f, c, b) {
      var e = this.createDelegate(f, c, b);
      if (d) {
        return setTimeout(e, d);
      }
      e();
      return 0;
    },
    createSequence: function (c, b) {
      if (typeof c != "function") {
        return this;
      }
      var d = this;
      return function () {
        var e = d.apply(this || window, arguments);
        c.apply(b || this || window, arguments);
        return e;
      };
    },
    createInterceptor: function (c, b) {
      if (typeof c != "function") {
        return this;
      }
      var d = this;
      return function () {
        c.target = this;
        c.method = d;
        if (c.apply(b || this || window, arguments) === false) {
          return;
        }
        return d.apply(this || window, arguments);
      };
    },
  });
  jQuery.extendIf(String, {
    escape: function (b) {
      return b.replace(/('|\\)/g, "\\$1");
    },
    leftPad: function (e, c, d) {
      var b = new String(e);
      if (!d) {
        d = " ";
      }
      while (b.length < c) {
        b = d + b;
      }
      return b.toString();
    },
    format: function (c) {
      var b = Array.prototype.slice.call(arguments, 1);
      return c.replace(/\{(\d+)\}/g, function (d, e) {
        return b[e];
      });
    },
  });
}
String.prototype.isInteger = function () {
  return !isNaN(parseInt(this));
};
String.prototype.isFloat = function () {
  return !isNaN(parseFloat(this));
};
String.prototype.toggle = function (c, b) {
  return this == c ? b : c;
};
String.prototype.trim = (function () {
  var b = /^\s+|\s+$/g;
  return function () {
    return this.replace(b, "");
  };
})();
String.prototype.translate = function (e, d) {
  if (!(e.length && d.length) || e.length != d.length) {
    return this;
  }
  var c = this;
  for (var b = 0; b < e.length; b++) {
    if (typeof e == "string") {
      c = c.replace(new RegExp(e.charAt(b), "g"), d.charAt(b));
    } else {
      c = c.replace(new RegExp(e[b], "g"), d[b]);
    }
  }
  return c;
};
String.prototype.isDigit = function () {
  return /^\d+$/.test(this);
};
String.prototype.removeWords = function (f) {
  var e = this.split(" ");
  var d = new Array();
  for (var c = 0; c < e.length; c++) {
    d.push(e[c]);
    for (var b = 0; b < f.length; b++) {
      if (d[c] == f[b]) {
        d.pop();
        break;
      }
    }
  }
  return d.join(" ");
};
jQuery.extendIf(Number.prototype, {
  constrain: function (c, b) {
    return Math.min(Math.max(this, c), b);
  },
  isInteger: function () {
    return !isNaN(parseInt(this));
  },
  isFloat: function () {
    return !isNaN(parseFloat(this));
  },
});
jQuery.extendIf(Array.prototype, {
  indexOf: function (d) {
    for (var c = 0, b = this.length; c < b; c++) {
      if (this[c] == d) {
        return c;
      }
    }
    return -1;
  },
  removeObject: function (c) {
    var b = this.indexOf(c);
    if (b != -1) {
      this.splice(b, 1);
    }
    return this;
  },
  binarySearch: function binarySearch(g, c) {
    var b = 0,
      f = this.length - 1,
      d,
      e;
    while (b <= f) {
      d = parseInt((b + f) / 2, 10);
      e = c(this[d], g);
      if (e < 0) {
        b = d + 1;
        continue;
      }
      if (e > 0) {
        f = d - 1;
        continue;
      }
      return d;
    }
    return -1;
  },
  inject: function (d, c) {
    for (var b = 0; b < this.length; b++) {
      d = c(d, this[b], b);
    }
    return d;
  },
  map: function (e, d) {
    var b = new Array(this.length);
    for (var c = 0, f = this.length; c < f; c++) {
      if (c in this) {
        b[c] = e.call(d, this[c], c, this);
      }
    }
    return b;
  },
  intersect: function () {
    if (!arguments.length) {
      return [];
    }
    var e = this;
    var d = (a2 = null);
    var h = 0;
    while (h < arguments.length) {
      d = [];
      a2 = arguments[h];
      var c = e.length;
      var b = a2.length;
      for (var g = 0; g < c; g++) {
        for (var f = 0; f < b; f++) {
          if (e[g] === a2[f]) {
            d.push(e[g]);
          }
        }
      }
      e = d;
      h++;
    }
    return d.unique();
  },
  unique: function () {
    var c = [];
    var b = this.length;
    for (var e = 0; e < b; e++) {
      for (var d = e + 1; d < b; d++) {
        if (this[e] === this[d]) {
          d = ++e;
        }
      }
      c.push(this[e]);
    }
    return c;
  },
});
Date.prototype.getElapsed = function (b) {
  return Math.abs((b || new Date()).getTime() - this.getTime());
};
if (typeof usig == "undefined") {
  usig = {};
}
usig.debug = function (b) {
  if (window.console && window.console.log) {
    window.console.log(b);
  }
};
if (typeof usig == "undefined") {
  usig = {};
}
jQuery.extendIf(usig, {
  loadingJs: [],
  loadingJsListeners: {},
  __callLoadJsListeners: function (c) {
    for (var d = 0, b = usig.loadingJsListeners[c].length; d < b; d++) {
      usig.loadingJsListeners[c][d]();
    }
  },
  loadJs: function (c, f) {
    if (usig.loadingJs.indexOf(c) < 0) {
      usig.loadingJs.push(c);
      usig.loadingJsListeners[c] = typeof f == "function" ? [f] : [];
      var b = document.createElement("script"),
        d = document.getElementsByTagName("head")[0],
        e = false;
      b.onload = b.onreadystatechange = function () {
        if (
          (b.readyState &&
            b.readyState !== "complete" &&
            b.readyState !== "loaded") ||
          e
        ) {
          return false;
        }
        b.onload = b.onreadystatechange = null;
        e = true;
        usig.__callLoadJsListeners(c);
      };
      b.src = c;
      d.insertBefore(b, d.firstChild);
    } else {
      usig.loadingJsListeners[c].push(f);
    }
  },
  loadCss: function (b) {
    var c = document.createElement("link");
    c.setAttribute("rel", "stylesheet");
    c.setAttribute("type", "text/css");
    c.setAttribute("href", b);
    if (typeof c != "undefined") {
      document.getElementsByTagName("head")[0].appendChild(c);
    }
  },
  removeJs: function (b) {
    var d = document.getElementsByTagName("script");
    for (var c = d.length; c >= 0; c--) {
      if (
        d[c] &&
        d[c].getAttribute("src") != null &&
        d[c].getAttribute("src").indexOf(b) != -1
      ) {
        d[c].parentNode.removeChild(d[c]);
      }
    }
  },
  removeCss: function (b) {
    var d = document.getElementsByTagName("link");
    for (var c = d.length; c >= 0; c--) {
      if (
        d[c] &&
        d[c].getAttribute("href") != null &&
        d[c].getAttribute("href").indexOf(b) != -1
      ) {
        d[c].parentNode.removeChild(d[c]);
      }
    }
  },
  Animator: function (d, e, f, g) {
    var c = 0;
    function b() {
      if (d.length > c) {
        e(d[c]);
        c++;
        setTimeout(b, f);
      } else {
        if (typeof g == "function") {
          g();
        }
      }
    }
    this.stop = function () {
      c = d.length + 1;
    };
    b();
  },
  parseUri: function (f) {
    var b = [
        "source",
        "protocol",
        "authority",
        "domain",
        "port",
        "path",
        "directoryPath",
        "fileName",
        "query",
        "anchor",
      ],
      c = new RegExp(
        "^(?:([^:/?#.]+):)?(?://)?(([^:/?#]*)(?::(\\d*))?)((/(?:[^?#](?![^?#/]*\\.[^?#/.]+(?:[\\?#]|$)))*/?)?([^?#/]*))?(?:\\?([^#]*))?(?:#(.*))?"
      ).exec(f),
      e = {};
    for (var d = 0; d < 10; d++) {
      e[b[d]] = c[d] ? c[d] : "";
    }
    if (e.directoryPath.length > 0) {
      e.directoryPath = e.directoryPath.replace(/\/?$/, "/");
    }
    return e;
  },
  registeredSuggesters: {},
  registerSuggester: function (b, c) {
    usig.registeredSuggesters[b] = c;
  },
  createSuggester: function (c, b) {
    if (typeof usig.registeredSuggesters[c] != "function") {
      throw "Suggester " + c + " is not registered.";
      return null;
    }
    return new usig.registeredSuggesters[c](b);
  },
});
jQuery.expr[":"].Contains = function (c, d, b) {
  return jQuery(c).text().toUpperCase().indexOf(b[3].toUpperCase()) >= 0;
};
jQuery.expr[":"].ContainsFilter = function (c, d, b) {
  if (c.innerHTML.indexOf("data-filter") >= 0) {
    var e =
      c.innerHTML
        .match(/data-filter\=\"(.*?)\"/)[1]
        .toUpperCase()
        .indexOf(b[3].toUpperCase()) >= 0;
  }
  return jQuery(c).text().toUpperCase().indexOf(b[3].toUpperCase()) >= 0 || e;
};
(function () {
  var b = false,
    c = /xyz/.test(function () {
      xyz;
    })
      ? /\b_super\b/
      : /.*/;
  jQuery.Class = function () {};
  jQuery.Class.create = function (h) {
    var g = this.prototype;
    b = true;
    var f = new this();
    b = false;
    for (var e in h) {
      f[e] =
        typeof h[e] == "function" && typeof g[e] == "function" && c.test(h[e])
          ? (function (i, j) {
              return function () {
                var l = this._super;
                this._super = g[i];
                var k = j.apply(this, arguments);
                this._super = l;
                return k;
              };
            })(e, h[e])
          : h[e];
    }
    function d() {
      if (!b && d.prototype.init) {
        return d.prototype.init.apply(this, arguments);
      }
    }
    d.prototype = f;
    d.prototype.constructor = d;
    d.extend = arguments.callee;
    return d;
  };
})();
if (typeof usig == "undefined") {
  usig = {};
}
usig.InputController = (function (b) {
  return function (e, d) {
    var h = document.getElementById(e);
    var c = "";
    var g = b.extend({}, usig.InputController.defaults, d);
    var i = function (k) {
      var j = k.keyCode;
      if (window.event && window.event.keyCode > 0) {
        j = window.event.keyCode;
      }
      if (
        k.type != "blur" &&
        k.type != "focus" &&
        typeof g.onKeyUp == "function"
      ) {
        g.onKeyUp(j, h.value);
      }
      if (
        k.type != "blur" &&
        k.type != "focus" &&
        h.value != c &&
        typeof g.onChange == "function"
      ) {
        c = h.value;
        g.onChange(h.value);
      }
      if (k.type == "blur" && typeof g.onBlur == "function") {
        g.onBlur();
      }
      if (k.type == "focus" && typeof g.onFocus == "function") {
        g.onFocus();
      }
    };
    var f = i.createDelegate(this);
    this.unbind = function () {
      b(h).unbind(g.events, f);
    };
    this.bind = function () {
      b(h).bind(g.events, f);
      c = b(h).val();
    };
    this.setOptions = function (j) {
      g = b.extend({}, g, j);
    };
    this.setValue = function (j) {
      h.value = j;
      c = j;
    };
    this.setFocus = function () {
      try {
        b(h).focus();
      } catch (j) {}
    };
    if (!h) {
      throw "InvalidField";
      return;
    } else {
      this.bind();
    }
  };
})(jQuery);
usig.InputController.defaults = {
  events: document.all
    ? "blur keydown keyup input focus"
    : "blur keydown input focus",
};
if (typeof usig == "undefined") {
  usig = {};
}
usig.AutoCompleter = (function (b) {
  return function (l, f, c) {
    var d = document.getElementById(l),
      u = c,
      r = [],
      h = {},
      v = b.extend({}, usig.AutoCompleter.defaults, f),
      A = null,
      q = true,
      m = [],
      s = [],
      z = null,
      o = {},
      t = 0,
      k = false,
      g = false;
    d.setAttribute("autocomplete", "off");
    this.unbind = function () {
      A.unbind();
      e();
      u.hide();
    };
    this.bind = function () {
      A.bind();
    };
    this.destroy = function () {
      this.unbind();
      u.remove();
      delete A;
      while (r.length > 0) {
        r.pop();
      }
      for (var K = 0; K < m.length; K++) {
        delete m[K];
      }
    };
    this.setViewControl = function (i) {
      u = i;
      u.onSelection(I.createDelegate(this));
    };
    this.setOptions = function (i) {
      v = b.extend({}, v, i);
      u.setOptions(i);
    };
    this.addSuggester = function (N, L) {
      var K = typeof N == "string" ? N : N.name;
      if (typeof h[K] == "undefined") {
        var i = N;
        if (typeof N == "string") {
          try {
            i = usig.createSuggester(K, {
              onReady: v.onReady,
              debug: v.debug,
              maxRetries: v.maxRetries,
              afterServerRequest: B.createDelegate(this, [K], 1),
              afterServerResponse: F.createDelegate(this, [K], 1),
              afterAbort: G.createDelegate(this, [K], 1),
            });
          } catch (O) {
            return false;
          }
        } else {
          i.setOptions({
            debug: v.debug,
            maxRetries: v.maxRetries,
            afterServerRequest: B.createDelegate(this, [K], 1),
            afterServerResponse: F.createDelegate(this, [K], 1),
            afterAbort: G.createDelegate(this, [K], 1),
          });
        }
        h[K] = i;
        o[K] = 0;
        var M = {
          inputPause: v.inputPause,
          maxSuggestions: v.maxSuggestions,
          serverTimeout: v.serverTimeout,
          minTextLength: v.minTextLength,
          maxRetries: v.maxRetries,
          showError: v.showError,
        };
        M = b.extend({}, M, L);
        r.push({ suggester: i, options: M, inputTimer: null });
      } else {
      }
    };
    this.removeSuggester = function (K) {
      if (typeof h[K] != "undefined") {
        h[K] = undefined;
        for (var L = 0; L < r.length; L++) {
          if (r[L].suggester.name == K) {
            r.removeObject(r[L]);
            break;
          }
        }
      } else {
      }
    };
    this.setSuggesterOptions = function (L, K) {
      if (typeof h[L] != "undefined") {
        for (var M = 0; M < r.length; M++) {
          if (r[M].suggester.name == L) {
            r[M].options = b.extend(r[M].options, K);
            break;
          }
        }
      } else {
      }
    };
    this.getSuggesters = function () {
      var L = {};
      for (var K = 0; K < r.length; K++) {
        L[r[K].suggester.name] = b.extend({}, r[K].options);
      }
      return L;
    };
    this.changeSkin = function (i) {
      u.changeSkin(i);
    };
    this.getOptions = function () {
      return v;
    };
    this.selectOption = function (i) {
      return u.selectOption(i);
    };
    this.getNumSuggestions = function () {
      return u.getNumSuggestions();
    };
    this.getSuggestion = function (i) {
      return u.getSuggestion(i);
    };
    this.hide = function () {
      u.hide();
    };
    this.ready = function (K) {
      var i = false;
      if (K) {
        i = h[K].ready();
      } else {
        for (E = 0; E < r.length; E++) {
          i = i || r[E].suggester.ready();
        }
      }
      return i;
    };
    function y() {
      if (d.value != "" && s.length > 0) {
        u.show(s, g);
      }
      s = [];
      z = null;
    }
    function x(M, N) {
      if (!N) {
        s = [];
        g = false;
      }
      for (var L = 0, K = M.length; L < K; L++) {
        s.push(M[L]);
      }
      if (!z) {
        g = N;
        z = y.defer(v.flushTimeout, this);
      }
    }
    function J(N, M) {
      var L = N.suggester;
      var K = N.options;
      i = function i(P, O) {
        if (d.value == O) {
          if (P.getErrorMessage != undefined) {
            try {
              if (!k && K.showError) {
                u.showMessage(P.getErrorMessage());
              }
            } catch (Q) {
              if (!k && K.showError) {
                u.showMessage(v.texts.nothingFound);
              }
            }
          } else {
            if (P.length == 0) {
              if (!k && K.showError) {
                u.showMessage(v.texts.nothingFound);
              }
            } else {
              P = P.map(function (R) {
                R.suggesterName = L.name;
                return R;
              });
              if (v.flushTimeout > 0) {
                x(P, k);
              } else {
                u.show(P, k);
              }
              k = true;
              if (!q) {
                u.hide();
              }
            }
          }
          if (typeof v.afterSuggest == "function") {
            v.afterSuggest();
          }
        } else {
        }
      };
      L.getSuggestions(M, i.createDelegate(this, [M], 1), K.maxSuggestions);
    }
    function e() {
      for (var K = 0; K < r.length; K++) {
        if (r[K].inputTimer) {
          clearTimeout(r[K].inputTimer);
        }
        r[K].suggester.abort();
      }
      if (typeof v.afterAbort == "function") {
        v.afterAbort();
      }
    }
    function I(i) {
      e();
      var K = i.toString();
      A.setValue(K);
      if (typeof v.afterSelection == "function") {
        v.afterSelection(i);
      }
      if (typeof v.afterGeoCoding == "function") {
        if (typeof v.beforeGeoCoding == "function") {
          v.beforeGeoCoding();
        }
        h[i.suggesterName].getGeoCoding(i, j);
      }
      A.setFocus();
    }
    function H(i, L, K) {
      if (i.descripcion != undefined && i.descripcion != "") {
        return (
          '<li class="acv_op"><a href="#" class="acv_op" name="' +
          L +
          '"><span class="tl"/><span class="tr"/><span>' +
          K(i.toString()) +
          '</span><span class="clase">(' +
          i.descripcion +
          ")</span></a></li>"
        );
      } else {
        return (
          '<li class="acv_op"><a href="#" class="acv_op" name="' +
          L +
          '"><span class="tl"/><span class="tr"/><span>' +
          K(i.toString()) +
          "</span></a></li>"
        );
      }
    }
    function C(M) {
      try {
        e();
        u.update(M);
        if (typeof v.onInputChange == "function") {
          v.onInputChange(M);
        }
      } catch (K) {
        throw K;
      }
      k = false;
      for (var L = 0; L < r.length; L++) {
        if (M.length >= r[L].options.minTextLength) {
          r[L].inputTimer = J.defer(r[L].options.inputPause, this, [r[L], M]);
        }
      }
    }
    function n(i) {
      u.keyUp(i);
    }
    function w() {
      q = false;
      if (v.hideOnBlur) {
        u.hide.defer(300);
      }
    }
    function p() {
      q = true;
    }
    function G(i) {
      if (o[i] > 0) {
        o[i]--;
        t--;
      }
    }
    function B(i) {
      o[i]++;
      t++;
      if (typeof v.afterServerRequest == "function") {
        v.afterServerRequest();
      }
    }
    function F(i) {
      if (o[i] > 0) {
        o[i]--;
        t--;
      }
      if (typeof v.afterServerResponse == "function" && t == 0) {
        v.afterServerResponse();
      }
    }
    function j(i) {
      if (i instanceof usig.Suggester.GeoCodingTypeError) {
        A.setValue(d.value + " ");
      }
      v.afterGeoCoding(i);
    }
    try {
      A = new usig.InputController(l, {
        onKeyUp: n.createDelegate(this),
        onChange: C.createDelegate(this),
        onBlur: w.createDelegate(this),
        onFocus: p.createDelegate(this),
        debug: v.debug,
      });
    } catch (D) {
      throw D;
    }
    for (var E = 0; E < v.suggesters.length; E++) {
      this.addSuggester(v.suggesters[E].suggester, v.suggesters[E].options);
    }
    if (!u) {
      u = new usig.AutoCompleterDialog(l, {
        maxOptions: v.maxOptions,
        rootUrl: v.rootUrl,
        debug: v.debug,
        skin: v.skin,
        autoSelect: v.autoSelect,
        autoHideTimeout: v.autoHideTimeout,
        optionsFormatter: H,
        onEnterWithoutSelection: v.onEnterWithoutSelection,
        idDiv: v.idOptionsDiv,
      });
      m.push(u);
    }
    u.onSelection(I.createDelegate(this));
  };
})(jQuery);
usig.AutoCompleter.defaults = {
  inputPause: 200,
  maxSuggestions: 10,
  serverTimeout: 30000,
  minTextLength: 3,
  maxRetries: 1,
  showError: true,
  maxOptions: 10,
  offsetY: -5,
  zIndex: 10000,
  autoHideTimeout: 10000,
  flushTimeout: 0,
  hideOnBlur: true,
  autoSelect: true,
  rootUrl: "//servicios.usig.buenosaires.gob.ar/usig-js/3.1/",
  skin: "bootstrap",
  idOptionsDiv: undefined,
  suggesters: [
    { suggester: "Direcciones", options: { inputPause: 10, minTextLength: 3 } },
    {
      suggester: "Lugares",
      options: { inputPause: 500, minTextLength: 3, showError: false },
    },
  ],
  debug: false,
  texts: {
    nothingFound:
      "No se hallaron resultados coincidentes con su b&uacute;squeda.",
  },
};
if (typeof usig == "undefined") {
  usig = {};
}
usig.AutoCompleterDialog = (function (b) {
  return function (i, e) {
    var c = document.getElementById(i),
      j = c.value,
      p = b.extend({}, usig.AutoCompleterDialog.defaults, e),
      s = p.idDiv || "usig_acv_" + i,
      o = null,
      h = -1,
      r = false,
      d = false,
      m = 0,
      x = null,
      g = {},
      y = { arrUp: 38, arrDn: 40, enter: 13, esc: 27 };
    function l() {
      clearTimeout(o);
    }
    function q() {
      l();
      if (p.autoHideTimeout > 0) {
        o = t.defer(p.autoHideTimeout, this);
      }
    }
    function t() {
      if (x) {
        x.fadeOut("slow");
      }
    }
    function u(z) {
      l();
      if (x) {
        b("#" + s + " div.content").html(z);
        x.show();
        h = -1;
      } else {
        x = b(
          '<div id="' +
            s +
            '" class="usig_acv">						<div class="header">							<div class="corner"/>							<div class="bar"/>						</div>						<div class="content">' +
            z +
            '</div>						<div class="footer">							<div class="corner"/>							<div class="bar"/>						</div>					</div>'
        );
        var A = b(c).offset();
        x.css({
          position: "absolute",
          left: A.left + "px",
          top: A.top + c.offsetHeight + parseInt(p.offsetY) + "px",
          width: c.offsetWidth,
          zIndex: p.zIndex,
        });
        b("body").append(x);
        x.mouseover(l.createDelegate(this));
        x.mouseout(q.createDelegate(this));
        h = -1;
        x.show();
      }
      o = t.defer(p.autoHideTimeout, this);
    }
    function k() {
      if (x) {
        h = -1;
        b("ul.options li.highlight", x).removeClass("highlight");
      }
    }
    function f(z) {
      if (x) {
        h = z;
        b("ul.options li.highlight", x).removeClass("highlight");
        if (typeof z == "string") {
          b('ul.options li:has(a[name="' + z + '"])', x).addClass("highlight");
          h = parseInt(z.replace(s, ""));
        } else {
          b("ul.options li:has(a)", x)
            .slice(z, z + 1)
            .addClass("highlight");
        }
      }
    }
    function n(z) {
      var G = new z.constructor(z);
      G.marked = Array();
      var F = j.split(" ");
      for (var C = 0; C < F.length; C++) {
        var E = G.toLowerCase().indexOf(F[C].toLowerCase());
        if (E < 0) {
          var E = G.toLowerCase().indexOf(
            F[C].translate(
              "???????????????????????????????????????????????????? ???????????????????????????????????????",
              "aeiouuAEIOUUaeiouAEIOU"
            ).toLowerCase()
          );
        }
        if (E >= 0) {
          for (var D = 0; D < F[C].length; D++) {
            G.marked[E + D] = true;
          }
        }
      }
      var B = "";
      var A = false;
      for (var C = 0; C < G.length; C++) {
        if (G.marked[C] && !A) {
          B = B + "<em>" + G.substring(C, C + 1);
          A = true;
        } else {
          if ((G.marked[C] && A) || (!G.marked[C] && !A)) {
            B = B + G.substring(C, C + 1);
          } else {
            B = B + "</em>" + G.substring(C, C + 1);
            A = false;
          }
        }
      }
      if (A) {
        B = B + "</em>";
      }
      return B;
    }
    function w(z) {
      if (typeof p.onSelection == "function") {
        l();
        t();
        p.onSelection(z);
      }
    }
    function v() {
      l();
      h = -1;
      m = 0;
      g = {};
    }
    this.setOptions = function (z) {
      p = b.extend({}, p, z);
    };
    this.update = function (z) {
      if (z == "" && x) {
        x.hide();
      }
      j = z;
      v();
    };
    this.getOptions = function () {
      return p;
    };
    this.show = function (A, z) {
      var C = "";
      var D = isNaN(parseInt(z)) ? 0 : parseInt(z);
      if (z != undefined) {
        if (D > 0) {
          b("ul.options li", x).slice(D).remove();
          m = b("ul.options li a", x).length;
        }
      } else {
        m = 0;
        g = {};
      }
      var B = n;
      b.each(A, function (E, F) {
        if (m >= p.maxOptions) {
          return false;
        }
        if (typeof F == "string") {
          C += '<li class="acv_op message">' + F + "</li>";
        } else {
          if (typeof p.optionsFormatter == "function") {
            C += p.optionsFormatter(F, s + m, B);
            g[s + m] = F;
            m++;
          } else {
            if (typeof F.toString == "function") {
              C +=
                '<li class="acv_op"><a href="#" class="acv_op" name="' +
                s +
                m +
                '"><span class="tl"/><span class="tr"/><span>' +
                B(F.toString()) +
                "</span></a></li>";
              g[s + m] = F;
              m++;
            }
          }
        }
      });
      if (
        (z === true || !isNaN(parseInt(z))) &&
        x &&
        b("ul.options li a", x).length > 0
      ) {
        if (m > 1 && d) {
          d = false;
          k();
        }
        b("ul.options", x).append(C);
      } else {
        if (p.idDiv) {
          x.html(
            '<div class="content"><ul class="options">' + C + "</ul></div>"
          );
          x.show();
        } else {
          u('<ul class="options">' + C + "</ul>");
        }
      }
      b("ul.options li.acv_op", x).mouseover(
        function (F, E) {
          if (F.target.name) {
            E(F.target.name);
          } else {
            E(b(F.target).parents("a").attr("name"));
          }
          r = true;
        }.createDelegate(this, [f], 1)
      );
      b("ul.options li.acv_op", x).mouseout(
        function (E) {
          if (r) {
            r = false;
            k();
          }
        }.createDelegate(this)
      );
      b("ul.options li.acv_op", x).click(
        function (F) {
          F.preventDefault();
          var G = F.target ? F.target : F.srcElement;
          var E =
            b(G).parents("a.acv_op").attr("name") ||
            b("a.acv_op", b(G)).attr("name") ||
            b(G).attr("name");
          w(g[E]);
        }.createDelegate(this)
      );
      if (p.autoSelect && m == 1) {
        h = 0;
        d = true;
        f(h);
      }
    };
    this.showMessage = function (z) {
      if (p.idDiv) {
        x.html(
          '<div class="content"><div class="message">' + z + "</div></div>"
        );
        x.show();
      } else {
        u('<div class="message">' + z + "</div>");
      }
    };
    this.keyUp = function (z) {
      if (h == undefined) {
        h = -1;
      }
      if ((z == y.arrDn || z == y.arrUp) && m > 0) {
        if (x.css("display") != "block") {
          x.show();
        } else {
          q();
          h =
            z == y.arrDn
              ? (h + 1).constrain(0, m - 1)
              : (h - 1).constrain(0, m - 1);
          f(h);
        }
      }
      if (y.enter == z) {
        if (x && x.css("display") != "block") {
          if (typeof p.onEnterWithoutSelection == "function") {
            p.onEnterWithoutSelection(j);
          }
          x.show();
        } else {
          if (h >= 0 || m == 1) {
            if (h >= 0) {
              w(g[s + h]);
            } else {
              w(g[s + "0"]);
            }
          } else {
            if (m > 0 && typeof p.onEnterWithoutSelection == "function") {
              p.onEnterWithoutSelection(j);
            }
          }
        }
      }
      if (y.esc == z) {
        l();
        t();
      }
    };
    this.remove = function () {
      l();
      if (x) {
        x.remove();
      }
    };
    this.onSelection = function (z) {
      if (typeof z == "function") {
        p.onSelection = z;
      }
    };
    this.selectOption = function (z) {
      if (m > z) {
        if (x.css("display") != "block") {
          x.show();
        }
        f(z);
        w(g[s + h]);
        return true;
      }
      return false;
    };
    this.getNumSuggestions = function () {
      return m;
    };
    this.getSuggestion = function (z) {
      var A = z || 0;
      if (m > A) {
        return g[s + A];
      }
      return false;
    };
    this.changeSkin = function (z) {
      usig.removeCss(
        p.rootUrl + "css/usig.AutoCompleterDialog." + p.skin + ".css"
      );
      p.skin = z;
      usig.loadCss(
        p.rootUrl + "css/usig.AutoCompleterDialog." + p.skin + ".css"
      );
    };
    this.hide = function () {
      l();
      if (x) {
        x.hide();
      }
    };
    if (p.skin != "custom") {
      usig.loadCss(
        p.rootUrl + "css/usig.AutoCompleterDialog." + p.skin + ".css"
      );
    }
    if (p.idDiv) {
      x = b("#" + p.idDiv);
      x.addClass("usig_acv");
    }
  };
})(jQuery);
usig.AutoCompleterDialog.defaults = {
  maxOptions: 10,
  debug: false,
  offsetY: -5,
  zIndex: 10000,
  autoHideTimeout: 5000,
  autoSelect: true,
  rootUrl: "//servicios.usig.buenosaires.gob.ar/usig-js/3.1/",
  skin: "usig4",
};
if (typeof usig == "undefined") {
  usig = {};
}
usig.Suggester = (function (b) {
  return jQuery.Class.create({
    init: function (d, c) {
      this.name = d;
      this.cleanList = [];
      this.opts = b.extend({}, usig.Suggester.defaults, c);
    },
    getSuggestions: function (c, e, d) {
      throw new usig.Suggester.MethodNotImplemented();
    },
    getGeoCoding: function (c, d) {
      throw new usig.Suggester.MethodNotImplemented();
    },
    abort: function () {},
    setOptions: function (c) {
      this.opts = b.extend({}, this.opts, c);
    },
    getOptions: function () {
      return this.opts;
    },
    ready: function () {
      throw new usig.Suggester.MethodNotImplemented();
    },
    destroy: function () {
      for (var c = 0; c < this.cleanList.length; c++) {
        delete this.cleanList[c];
      }
    },
  });
})(jQuery);
usig.Suggester.defaults = {
  debug: false,
  serverTimeout: 15000,
  maxRetries: 5,
  maxSuggestions: 10,
};
usig.Suggester.MethodNotImplemented = function () {
  this.msg = "Suggester: Method Not Implemented.";
  this.toString = function () {
    return this.msg;
  };
};
usig.Suggester.GeoCodingTypeError = function () {
  this.msg = "Suggester: Wrong object type for geocoding.";
  this.toString = function () {
    return this.msg;
  };
};
if (typeof usig == "undefined") {
  usig = {};
}
usig.AjaxComponent = (function (b) {
  return jQuery.Class.create({
    init: function (f, c, e) {
      this.name = f;
      var d =
        e.dataType ||
        (window.location.host == usig.parseUri(c).authority ? "json" : "jsonp");
      this.defaultParams = { type: "GET", url: c, dataType: d };
      this.opts = b.extend({}, usig.AjaxComponent.defaults, e);
    },
    mkRequest: function (h, l, j, e) {
      var d = null,
        i = 0;
      function c(n, o) {
        clearTimeout(d);
        if (typeof this.opts.afterServerResponse == "function") {
          this.opts.afterServerResponse();
        }
        o(n);
      }
      function g(n, o) {
        if (i >= this.opts.maxRetries) {
          clearTimeout(d);
          if (typeof o == "function") {
            o(n);
          }
        } else {
        }
      }
      function k(n, p) {
        if (n != null && n.readyState != 0 && n.readyState != 4) {
          n.abort();
          if (typeof this.opts.afterAbort == "function") {
            this.opts.afterAbort();
          }
          if (this.opts.maxRetries > i) {
            i++;
            var o = b.ajax(p);
            if (typeof this.opts.afterRetry == "function") {
              this.opts.afterRetry();
            }
            d = setTimeout(
              k.createDelegate(this, [o, m]),
              this.opts.serverTimeout
            );
          } else {
            if (typeof p.error == "function") {
              p.error(
                "Se produjo un error al intentar acceder al servidor: " + p.url
              );
            }
          }
        }
      }
      if (typeof l != "function") {
        return;
      }
      if (typeof j != "undefined" && typeof j != "function") {
        return;
      }
      var m = b.extend(true, {}, this.defaultParams, {
        success: c.createDelegate(this, [l], 1),
        error: g.createDelegate(this, [j], 1),
        data: h,
      });
      if (e) {
        m.url = e;
      }
      var f = b.ajax(m);
      if (typeof this.opts.afterServerRequest == "function") {
        this.opts.afterServerRequest();
      }
      if (this.opts.serverTimeout > 0) {
        d = setTimeout(k.createDelegate(this, [f, m]), this.opts.serverTimeout);
      }
      return f;
    },
    setOptions: function (c) {
      this.opts = b.extend({}, this.opts, c);
    },
    getOptions: function () {
      return this.opts;
    },
  });
})(jQuery);
usig.AjaxComponent.defaults = {
  debug: false,
  serverTimeout: 30000,
  maxRetries: 1,
};
if (typeof usig == "undefined") {
  usig = {};
}
usig.Punto = function (c, b) {
  this.x = this.lon = c;
  this.y = this.lat = b;
  this.getX = function () {
    return this.x;
  };
  this.getY = function () {
    return this.y;
  };
  this.toJson = function () {
    return '{ "x":' + this.x + ', "y": ' + this.y + " }";
  };
  this.toString = function () {
    return "(" + this.x + ", " + this.y + ")";
  };
};
usig.Punto.fromWkt = function (c) {
  var d = /^POINT *\(([0-9]+\.[0-9]+) ([0-9]+\.[0-9]+)\)$/;
  var b = null;
  if ((resMatch = c.match(d))) {
    b = new usig.Punto(resMatch[1], resMatch[2]);
  }
  return b;
};
usig.Punto.fromPunto = function (b) {
  return new usig.Punto(b.getX(), b.getY());
};
usig.Punto.fromObj = function (b) {
  return new usig.Punto(b.x, b.y);
};
if (typeof usig == "undefined") {
  usig = {};
}
if (typeof usig.Calle == "undefined") {
  usig.Calle = function (b, c, e, d) {
    this.codigo = b;
    this.nombre = c;
    this.alturaValida = function (g) {
      if (e instanceof Array) {
        if (e.length == 0) {
          throw new usig.ErrorCalleSinAlturas(this.nombre);
          return false;
        }
        var f = false;
        for (a in e) {
          f =
            f ||
            (parseInt(e[a][0]) <= parseInt(g) &&
              parseInt(e[a][1]) >= parseInt(g));
        }
        return f;
      }
    };
    this.getTramos = function () {
      return e;
    };
    this.toString = function () {
      return this.nombre;
    };
    this.seCruzaCon = function (f) {
      if (d) {
        return d.indexOf(f.codigo) >= 0;
      }
    };
    this.toJson = function () {
      return { codigo: this.codigo, nombre: this.nombre };
    };
    this.isEqual = function (f) {
      return this.codigo == f.codigo;
    };
  };
  usig.Calle.fromObj = function (b) {
    return new usig.Calle(b.codigo, b.nombre);
  };
}
if (typeof usig == "undefined") {
  usig = {};
}
if (typeof usig.Direccion == "undefined") {
  usig.Direccion = (function (b) {
    return function (c, g) {
      var f = null;
      var j = null;
      var i = 0;
      var e = null;
      var h = "";
      var d = null;
      if (c instanceof usig.Calle) {
        f = c;
      } else {
        return null;
      }
      if (g instanceof usig.Calle) {
        j = g;
        e = usig.Direccion.CALLE_Y_CALLE;
      } else {
        if (!isNaN(parseInt(g))) {
          e = usig.Direccion.CALLE_ALTURA;
          i = parseInt(g);
        } else {
          return null;
        }
      }
      this.getCalle = function () {
        return f;
      };
      this.getCalleCruce = function () {
        if (e == usig.Direccion.CALLE_Y_CALLE) {
          return j;
        } else {
          return null;
        }
      };
      this.getAltura = function () {
        return i;
      };
      this.getTipo = function () {
        return e;
      };
      this.toString = function () {
        if (e == usig.Direccion.CALLE_ALTURA) {
          return f.toString() + " " + (i > 0 ? i : "S/N");
        } else {
          var k = j.toString();
          var l = k.match(/^(I|Hi|HI).*/) ? " e " : " y ";
          return f.toString() + l + k;
        }
      };
      this.setCoordenadas = function (k) {
        d = usig.Punto.fromPunto(k);
      };
      this.setSmp = function (k) {
        h = k;
      };
      this.getCoordenadas = function () {
        return d;
      };
      this.getSmp = function () {
        return h;
      };
      this.clone = function () {
        var k = new usig.Direccion(f, g);
        return b.extend(true, k, this);
      };
      this.toJson = function () {
        return {
          tipo: e,
          calle: f.toJson(),
          altura: i,
          calle_cruce: j ? j.toJson() : null,
          smp: h,
          coordenadas: d,
        };
      };
      this.isEqual = function (k) {
        var l =
          k instanceof usig.Direccion &&
          e == k.getTipo() &&
          ((e == usig.Direccion.CALLE_ALTURA &&
            f.isEqual(k.getCalle()) &&
            i == k.getAltura()) ||
            (e == usig.Direccion.CALLE_Y_CALLE &&
              ((f.isEqual(k.getCalle()) && j.isEqual(k.getCalleCruce())) ||
                (f.isEqual(k.getCalleCruce()) && j.isEqual(k.getCalle())))));
        return l;
      };
    };
  })(jQuery);
  usig.Direccion.CALLE_ALTURA = 0;
  usig.Direccion.CALLE_Y_CALLE = 1;
  usig.Direccion.fromObj = function (d) {
    var b = null;
    if (d.tipo != undefined) {
      b = new usig.Direccion(
        usig.Calle.fromObj(d.calle),
        d.tipo == usig.Direccion.CALLE_ALTURA
          ? d.altura
          : usig.Calle.fromObj(d.calle_cruce)
      );
    } else {
      var c = new usig.Calle(d.cod_calle, d.calle);
      if (d.cod_calle2 != null) {
        b = new usig.Direccion(c, new usig.Calle(d.cod_calle2, d.calle2));
      } else {
        b = new usig.Direccion(c, d.altura);
      }
    }
    if (d.smp != undefined && d.smp != null) {
      b.setSmp(d.smp);
    }
    if (d.coordenadas != undefined && d.coordenadas != null) {
      if (typeof d.coordenadas == "string") {
        b.setCoordenadas(usig.Punto.fromWkt(d.coordenadas));
      } else {
        b.setCoordenadas(usig.Punto.fromObj(d.coordenadas));
      }
    }
    return b;
  };
}
if (typeof usig == "undefined") {
  usig = {};
}
usig.GeoCoder = (function (b) {
  return usig.AjaxComponent.extend({
    metodos: ["interpolacion", "puertas", "centroide"],
    init: function (c) {
      var d = b.extend({}, usig.GeoCoder.defaults, c);
      this._super("GeoCoder", usig.GeoCoder.defaults.server, d);
    },
    validarMetodo: function (c) {
      if (c != undefined) {
        if (this.metodos.indexOf(c) >= 0) {
          return c;
        }
      } else {
        if (this.opts.metodo != undefined) {
          return this.opts.metodo;
        }
      }
      return undefined;
    },
    onSuccess: function (c, d) {
      if (typeof c != "string") {
        d(new usig.Punto(c.x, c.y));
      } else {
        d(c);
      }
    },
    geoCodificarDireccion: function (d, f, c, e) {
      if (!(d instanceof usig.Direccion)) {
        throw "dir debe ser una instancia de usig.Direccion";
        return;
      }
      if (d.getTipo() == usig.Direccion.CALLE_ALTURA) {
        this.geoCodificarCodigoDeCalleAltura(
          d.getCalle().codigo,
          d.getAltura(),
          f,
          c,
          e
        );
      } else {
        this.geoCodificar2CodigosDeCalle(
          d.getCalle().codigo,
          d.getCalleCruce().codigo,
          f,
          c
        );
      }
    },
    geoCodificarCalleAltura: function (f, h, g, c, d) {
      if (!h.isInteger()) {
        throw "altura tiene que ser un entero";
        return;
      }
      var e = { cod_calle: f, altura: h };
      d = this.validarMetodo(d);
      if (d != undefined) {
        e.metodo = d;
      }
      this.mkRequest(
        e,
        this.onSuccess.createDelegate(this, [g], 1),
        c,
        this.opts.server + "geocoding/"
      );
    },
    geoCodificarCodigoDeCalleAltura: function (e, h, g, c, d) {
      if (!e.isInteger()) {
        throw "codCalle tiene que ser un entero";
        return;
      }
      if (!h.isInteger()) {
        throw "altura tiene que ser un entero";
        return;
      }
      var f = { cod_calle: e, altura: h };
      d = this.validarMetodo(d);
      if (d != undefined) {
        f.metodo = d;
      }
      this.mkRequest(
        f,
        this.onSuccess.createDelegate(this, [g], 1),
        c,
        this.opts.server + "geocoding/"
      );
    },
    geoCodificarCalleYCalle: function (d, c, g, e) {
      var f = { cod_calle1: d, cod_calle2: c };
      this.mkRequest(
        f,
        this.onSuccess.createDelegate(this, [g], 1),
        e,
        this.opts.server + "geocoding/"
      );
    },
    geoCodificar2CodigosDeCalle: function (g, e, f, c) {
      if (!g.isInteger()) {
        throw "codCalle1 tiene que ser un entero";
        return;
      }
      if (!e.isInteger()) {
        throw "codCalle2 tiene que ser un entero";
        return;
      }
      var d = { cod_calle1: g, cod_calle2: e };
      this.mkRequest(
        d,
        this.onSuccess.createDelegate(this, [f], 1),
        c,
        this.opts.server + "geocoding/"
      );
    },
    reverseGeoCoding: function (c, g, f, d) {
      var e = { x: c, y: g };
      this.mkRequest(e, f, d, this.opts.server + "reversegeocoding/");
    },
    getSMP: function (g, f, e, c) {
      var d = { cod_calle: g, altura: f };
      this.mkRequest(d, e, c, this.opts.server + "smp/");
    },
  });
})(jQuery);
usig.GeoCoder.defaults = {
  debug: false,
  server: "//ws.usig.buenosaires.gob.ar/geocoder/2.2/",
  metodo: undefined,
};
if (typeof usig == "undefined") {
  usig = {};
}
usig.Inventario = (function (b) {
  return usig.AjaxComponent.extend({
    lastRequest: null,
    lastRequestEpok: null,
    init: function (c) {
      var d = b.extend({}, usig.Inventario.defaults, c);
      this._super("Inventario", usig.Inventario.defaults.server, d);
    },
    getCategorias: function (d, c) {
      this.lastRequest = this.mkRequest(
        {},
        d,
        c,
        this.opts.server + "getCategorias/"
      );
    },
    getParcelaPorDir: function (d, e, c) {
      this.lastRequest = this.mkRequest(
        { cod_calle: d.cod, altura: d.alt },
        e,
        c,
        this.opts.server + "getParcela/"
      );
    },
    getDir: function (d, e, c) {
      this.lastRequest = this.mkRequest(d, e, c, this.opts.server + "getDir/");
    },
    getParcela: function (e, d, f, c) {
      this.lastRequest = this.mkRequest(
        e,
        f,
        c,
        this.opts.server + "getParcela" + d + "/"
      );
    },
    getDatosTransporte: function (d, e, c) {
      this.lastRequest = this.mkRequest(
        d,
        e,
        c,
        this.opts.server + "getDatosTransporte/"
      );
    },
    buscar: function (j, i, d, c) {
      var f = b.extend({}, usig.Inventario.defaults.searchOptions, c),
        g = {
          start: f.start,
          limit: f.limit,
          texto: j,
          tipo: f.tipoBusqueda,
          totalFull: f.totalFull,
        };
      function e(k, n) {
        var m = {},
          l = [];
        b.each(k.clasesEncontradas, function (o, p) {
          m[p.id] = new usig.inventario.Clase(
            p.id,
            p.nombre,
            p.nombreId,
            p.nombreNorm
          );
        });
        b.each(k.instancias, function (o, p) {
          l.push(new usig.inventario.Objeto(p, m[p.claseId]));
        });
        if (typeof n == "function") {
          n(l);
        }
      }
      if (f.categoria != undefined) {
        g.categoria = f.categoria;
      }
      if (f.clase != undefined) {
        g.clase = f.clase;
      }
      if (f.bbox) {
        g.bbox = [
          f.extent.left,
          f.extent.bottom,
          f.extent.right,
          f.extent.top,
        ].join(",");
      }
      var h = e.createDelegate(this, [i], 1);
      if (f.returnRawData) {
        h = i;
      }
      if (f.searchInventario) {
        this.lastRequest = this.mkRequest(
          g,
          h,
          d,
          this.opts.server + "buscar/"
        );
      }
      if (f.searchEpok) {
        this.lastRequestEpok = this.mkRequest(
          g,
          h,
          d,
          this.opts.serverEpok + "buscar/"
        );
      }
    },
    getObjeto: function (e, f, c) {
      function d(h, j, i) {
        if (i instanceof usig.inventario.Objeto) {
          i.fill(h);
          j(i);
        } else {
          j(new usig.inventario.Objeto(h));
        }
      }
      var g = typeof e == "object" ? e.id : e;
      if (typeof g == "string") {
        this.lastRequestEpok = this.mkRequest(
          { id: g },
          d.createDelegate(this, [f, e], 1),
          c,
          this.opts.serverEpok + "getObjectContent/"
        );
      } else {
        g = parseInt(g);
        if (g > 0) {
          this.lastRequest = this.mkRequest(
            { id: g },
            d.createDelegate(this, [f, e], 1),
            c,
            this.opts.server + "getObjectContent/"
          );
        }
      }
    },
    getFeatureInfo: function (d, e, c) {
      this.lastRequest = this.mkRequest(
        d,
        e,
        c,
        this.opts.server + "getObjectContent/"
      );
    },
    getCloseFeatures: function (d, e, c) {
      this.lastRequest = this.mkRequest(
        d,
        e,
        c,
        this.opts.server + "objetosCercanos/"
      );
    },
    getGeom: function (c, e, d) {
      this.lastRequest = this.mkRequest(
        { id: c },
        e,
        d,
        this.opts.server + "getGeometria/"
      );
    },
    abort: function () {
      if (this.lastRequest) {
        this.lastRequest.abort();
        this.lastRequest = null;
        if (typeof this.opts.afterAbort == "function") {
          this.opts.afterAbort();
        }
      } else {
      }
    },
  });
})(jQuery);
usig.Inventario.defaults = {
  debug: false,
  server: "//inventario.usig.buenosaires.gob.ar/publico/",
  serverEpok: "//epok.buenosaires.gob.ar/",
  dataType: "jsonp",
  searchOptions: {
    start: 0,
    limit: 20,
    tipoBusqueda: "ranking",
    categoria: undefined,
    clase: undefined,
    bbox: false,
    totalFull: false,
    extent: undefined,
    returnRawData: false,
    searchInventario: false,
    searchEpok: true,
  },
};
if (typeof usig == "undefined") {
  usig = {};
}
if (typeof usig.inventario == "undefined") {
  usig.inventario = {};
}
usig.inventario.Objeto = (function (b) {
  return function (c, d) {
    this.id = 0;
    this.nombre = usig.inventario.Objeto.defaults.texts.noName;
    this.ubicacion = null;
    this.clase = d;
    this.direccionAsociada = null;
    this.fechaAlta = null;
    this.fechaUltimaModificacion = null;
    this.datos = {};
    this.rawData = {};
    this.descripcion = null;
    if (d != undefined) {
      this.descripcion = d.getNombre();
    }
    this.fill = function (f) {
      if (f.id) {
        this.id = f.id;
      }
      if (f.nombre) {
        this.nombre = f.nombre;
      }
      if (f.ubicacion) {
        this.ubicacion = new usig.inventario.Ubicacion(f.ubicacion);
        this.rawData.ubicacion = f.ubicacion;
      }
      if (f.fechaAlta) {
        this.fechaAlta = new Date(f.fechaAlta);
        this.rawData.fechaAlta = f.fechaAlta;
      }
      if (f.fechaUltimaModificacion) {
        this.fechaUltimaModificacion = new Date(f.fechaUltimaModificacion);
        this.rawData.fechaUltimaModificacion = f.fechaUltimaModificacion;
      }
      if (f.direccionAsociada) {
        try {
          this.direccionAsociada = usig.Direccion.fromObj(f.direccionAsociada);
          this.rawData.direccionAsociada = f.direccionAsociada;
        } catch (g) {}
      } else {
        if (f.direccionNormalizada && usig.NormalizadorDirecciones) {
          try {
            this.direccionAsociada = usig.NormalizadorDirecciones.normalizar(
              f.direccionNormalizada,
              10,
              true
            )[0];
            this.direccionAsociada.setCoordenadas(
              this.ubicacion.getCentroide()
            );
            if (f.smp) {
              this.direccionAsociada.setSmp(f.smp);
            }
            this.rawData.direccionAsociada = this.direccionAsociada.toJson();
          } catch (g) {}
        }
      }
      if (f.contenido) {
        var h = this.datos;
        b.each(f.contenido, function (j, e) {
          h[e.nombreId] = { alias: e.nombre, valor: e.valor, pos: e.posicion };
        });
        if (this.datos.nombre) {
          this.nombre = this.datos.nombre.valor;
        }
      }
      this.rawData = b.extend(this.rawData, f);
    };
    this.toString = function () {
      return this.nombre;
    };
    this.getRawData = function () {
      return this.rawData;
    };
    this.clone = function () {
      var e = new usig.inventario.Objeto(c, d);
      return b.extend(true, e, this);
    };
    this.toJson = function () {
      var e = this.getRawData();
      if (this.clase && this.clase.toJson) {
        e.clase = this.clase.toJson();
      }
      if (this.direccionAsociada && this.direccionAsociada.toJson) {
        e.direccionAsociada = this.direccionAsociada.toJson();
      }
      return e;
    };
    this.isEqual = function (e) {
      return e instanceof usig.inventario.Objeto && e.id == this.id;
    };
    this.getSmp = function () {
      return (
        this.rawData.smp ||
        (this.direccionAsociada ? this.direccionAsociada.getSmp() : "")
      );
    };
    this.getCoordenadas = function () {
      if (this.ubicacion) {
        return this.ubicacion.getCentroide();
      } else {
        if (this.direccionAsociada) {
          return this.direccionAsociada.getCoordenadas();
        }
      }
    };
    this.fill(c);
    this.rawData = b.extend(this.rawData, c);
  };
})(jQuery);
usig.inventario.Objeto.fromObj = function (b) {
  return new usig.inventario.Objeto(b, usig.inventario.Clase.fromObj(b.clase));
};
usig.inventario.Objeto.defaults = { texts: { noName: "Sin Nombre" } };
if (typeof usig == "undefined") {
  usig = {};
}
if (typeof usig.inventario == "undefined") {
  usig.inventario = {};
}
usig.inventario.Clase = function (e, d, c, b) {
  this.getId = function () {
    return e;
  };
  this.getNombre = function () {
    return d;
  };
  this.getNombreId = function () {
    return c;
  };
  this.getNombreNormalizado = function () {
    return b;
  };
  this.toJson = function () {
    return { id: e, nombre: d, nombreId: c, nombreNormalizado: b };
  };
};
usig.inventario.Clase.fromObj = function (b) {
  return new usig.inventario.Clase(
    b.id,
    b.nombre,
    b.nombreId,
    b.nombreNormalizado
  );
};
if (typeof usig == "undefined") {
  usig = {};
}
if (typeof usig.inventario == "undefined") {
  usig.inventario = {};
}
usig.inventario.Ubicacion = function (b) {
  var c = null;
  if (b instanceof usig.Punto) {
    c = b;
  } else {
    if (b.centroide != undefined) {
      c = usig.Punto.fromWkt(b.centroide);
    }
  }
  this.getCentroide = function () {
    return c;
  };
  this.getTipo = function () {
    return b.tipo;
  };
};
if (typeof usig == "undefined") {
  usig = {};
}
usig.SuggesterLugares = (function (b) {
  return usig.Suggester.extend({
    init: function (c) {
      if (c != undefined) {
        var d = b.extend(
          {},
          usig.SuggesterLugares.defaults.searchOptions,
          c.searchOptions
        );
        c.searchOpts = d;
      }
      var e = b.extend({}, usig.SuggesterLugares.defaults, c);
      this._super("Lugares", e);
      if (!this.opts.inventario) {
        this.opts.inventario = new usig.Inventario(e);
        this.cleanList.push(this.opts.inventario);
      }
      if (e.onReady && typeof e.onReady == "function") {
        e.onReady();
      }
    },
    getSuggestions: function (e, g, f) {
      var c = f != undefined ? f : this.opts.maxSuggestions;
      try {
        this.opts.inventario.buscar(e, g, function () {}, { limit: c });
      } catch (d) {
        g(d);
      }
    },
    getGeoCoding: function (c, d) {
      if (!(c instanceof usig.inventario.Objeto)) {
        d(new usig.Suggester.GeoCodingTypeError());
      } else {
        this.opts.inventario.getObjeto(
          c,
          function (e) {
            if (e.direccionAsociada) {
              d(e.direccionAsociada.getCoordenadas());
            } else {
              if (e.ubicacion) {
                d(e.ubicacion.getCentroide());
              }
            }
          },
          function () {}
        );
      }
    },
    abort: function () {
      this.opts.inventario.abort();
    },
    ready: function () {
      return true;
    },
    setOptions: function (c) {
      this._super(c);
      this.opts.inventario.setOptions(c);
    },
  });
})(jQuery);
usig.SuggesterLugares.defaults = {
  serverTimeout: 30000,
  maxRetries: 1,
  maxSuggestions: 10,
  searchOptions: {
    start: 0,
    limit: 20,
    tipoBusqueda: "ranking",
    categoria: undefined,
    clase: undefined,
    bbox: false,
    extent: undefined,
    returnRawData: false,
  },
};
usig.registerSuggester("Lugares", usig.SuggesterLugares);
if (typeof usig == "undefined") {
  usig = {};
}
usig.SuggesterDirecciones = (function (b) {
  return usig.Suggester.extend({
    init: function (c) {
      var d = b.extend({}, usig.SuggesterDirecciones.defaults, c);
      this._super("Direcciones", d);
      if (!this.opts.normalizadorDirecciones) {
        this.opts.normalizadorDirecciones = usig.NormalizadorDirecciones.init({
          aceptarCallesSinAlturas: this.opts.acceptSN,
          callesEnMinusculas: this.opts.callesEnMinusculas,
          onReady: this.opts.onReady,
        });
        this.cleanList.push(this.opts.normalizadorDirecciones);
      }
      if (!this.opts.geoCoder) {
        this.opts.geoCoder = new usig.GeoCoder(this.opts);
        this.cleanList.push(this.opts.geoCoder);
      }
    },
    getSuggestions: function (e, h, g) {
      var c = g != undefined ? g : this.opts.maxSuggestions;
      try {
        h(this.opts.normalizadorDirecciones.normalizar(e, c));
      } catch (d) {
        if (this.opts.ignorarTextoSobrante) {
          try {
            var f = this.opts.normalizadorDirecciones.buscarDireccion(e);
            if (f !== false) {
              h([f.match]);
            } else {
              h(d);
            }
          } catch (d) {
            h(d);
          }
        } else {
          h(d);
        }
      }
    },
    getGeoCoding: function (c, d) {
      if (!(c instanceof usig.Direccion)) {
        d(new usig.Suggester.GeoCodingTypeError());
      } else {
        this.opts.geoCoder.geoCodificarDireccion(c, d);
      }
    },
    ready: function () {
      return this.opts.normalizadorDirecciones.listo();
    },
    setOptions: function (c) {
      opts = b.extend({}, this.opts, c);
      this._super(opts);
      this.opts.geoCoder.setOptions(opts);
    },
  });
})(jQuery);
usig.SuggesterDirecciones.defaults = {
  debug: false,
  serverTimeout: 5000,
  maxRetries: 5,
  maxSuggestions: 10,
  acceptSN: true,
  callesEnMinusculas: false,
  ignorarTextoSobrante: true,
};
usig.registerSuggester("Direcciones", usig.SuggesterDirecciones);
jQuery.extendIf = function (d, e) {
  if (d && e) {
    for (var b in e) {
      if (typeof d[b] == "undefined") {
        d[b] = e[b];
      }
    }
  }
  return d;
};
if (typeof Ext == "undefined") {
  jQuery.extend(Function.prototype, {
    createCallback: function () {
      var b = arguments;
      var c = this;
      return function () {
        return c.apply(window, b);
      };
    },
    createDelegate: function (d, c, b) {
      var e = this;
      return function () {
        var g = c || arguments;
        if (b === true) {
          g = Array.prototype.slice.call(arguments, 0);
          g = g.concat(c);
        } else {
          if (typeof b == "number") {
            g = Array.prototype.slice.call(arguments, 0);
            var f = [b, 0].concat(c);
            Array.prototype.splice.apply(g, f);
          }
        }
        return e.apply(d || window, g);
      };
    },
    defer: function (d, f, c, b) {
      var e = this.createDelegate(f, c, b);
      if (d) {
        return setTimeout(e, d);
      }
      e();
      return 0;
    },
    createSequence: function (c, b) {
      if (typeof c != "function") {
        return this;
      }
      var d = this;
      return function () {
        var e = d.apply(this || window, arguments);
        c.apply(b || this || window, arguments);
        return e;
      };
    },
    createInterceptor: function (c, b) {
      if (typeof c != "function") {
        return this;
      }
      var d = this;
      return function () {
        c.target = this;
        c.method = d;
        if (c.apply(b || this || window, arguments) === false) {
          return;
        }
        return d.apply(this || window, arguments);
      };
    },
  });
  jQuery.extendIf(String, {
    escape: function (b) {
      return b.replace(/('|\\)/g, "\\$1");
    },
    leftPad: function (e, c, d) {
      var b = new String(e);
      if (!d) {
        d = " ";
      }
      while (b.length < c) {
        b = d + b;
      }
      return b.toString();
    },
    format: function (c) {
      var b = Array.prototype.slice.call(arguments, 1);
      return c.replace(/\{(\d+)\}/g, function (d, e) {
        return b[e];
      });
    },
  });
}
String.prototype.isInteger = function () {
  return !isNaN(parseInt(this));
};
String.prototype.isFloat = function () {
  return !isNaN(parseFloat(this));
};
String.prototype.toggle = function (c, b) {
  return this == c ? b : c;
};
String.prototype.trim = (function () {
  var b = /^\s+|\s+$/g;
  return function () {
    return this.replace(b, "");
  };
})();
String.prototype.translate = function (e, d) {
  if (!(e.length && d.length) || e.length != d.length) {
    return this;
  }
  var c = this;
  for (var b = 0; b < e.length; b++) {
    if (typeof e == "string") {
      c = c.replace(new RegExp(e.charAt(b), "g"), d.charAt(b));
    } else {
      c = c.replace(new RegExp(e[b], "g"), d[b]);
    }
  }
  return c;
};
String.prototype.isDigit = function () {
  return /^\d+$/.test(this);
};
String.prototype.removeWords = function (f) {
  var e = this.split(" ");
  var d = new Array();
  for (var c = 0; c < e.length; c++) {
    d.push(e[c]);
    for (var b = 0; b < f.length; b++) {
      if (d[c] == f[b]) {
        d.pop();
        break;
      }
    }
  }
  return d.join(" ");
};
jQuery.extendIf(Number.prototype, {
  constrain: function (c, b) {
    return Math.min(Math.max(this, c), b);
  },
  isInteger: function () {
    return !isNaN(parseInt(this));
  },
  isFloat: function () {
    return !isNaN(parseFloat(this));
  },
});
jQuery.extendIf(Array.prototype, {
  indexOf: function (d) {
    for (var c = 0, b = this.length; c < b; c++) {
      if (this[c] == d) {
        return c;
      }
    }
    return -1;
  },
  removeObject: function (c) {
    var b = this.indexOf(c);
    if (b != -1) {
      this.splice(b, 1);
    }
    return this;
  },
  binarySearch: function binarySearch(g, c) {
    var b = 0,
      f = this.length - 1,
      d,
      e;
    while (b <= f) {
      d = parseInt((b + f) / 2, 10);
      e = c(this[d], g);
      if (e < 0) {
        b = d + 1;
        continue;
      }
      if (e > 0) {
        f = d - 1;
        continue;
      }
      return d;
    }
    return -1;
  },
  inject: function (d, c) {
    for (var b = 0; b < this.length; b++) {
      d = c(d, this[b], b);
    }
    return d;
  },
  map: function (e, d) {
    var b = new Array(this.length);
    for (var c = 0, f = this.length; c < f; c++) {
      if (c in this) {
        b[c] = e.call(d, this[c], c, this);
      }
    }
    return b;
  },
  intersect: function () {
    if (!arguments.length) {
      return [];
    }
    var e = this;
    var d = (a2 = null);
    var h = 0;
    while (h < arguments.length) {
      d = [];
      a2 = arguments[h];
      var c = e.length;
      var b = a2.length;
      for (var g = 0; g < c; g++) {
        for (var f = 0; f < b; f++) {
          if (e[g] === a2[f]) {
            d.push(e[g]);
          }
        }
      }
      e = d;
      h++;
    }
    return d.unique();
  },
  unique: function () {
    var c = [];
    var b = this.length;
    for (var e = 0; e < b; e++) {
      for (var d = e + 1; d < b; d++) {
        if (this[e] === this[d]) {
          d = ++e;
        }
      }
      c.push(this[e]);
    }
    return c;
  },
});
Date.prototype.getElapsed = function (b) {
  return Math.abs((b || new Date()).getTime() - this.getTime());
};
if (typeof usig == "undefined") {
  usig = {};
}
usig.debug = function (b) {
  if (window.console && window.console.log) {
    window.console.log(b);
  }
};
if (typeof usig == "undefined") {
  usig = {};
}
if (typeof usig.Calle == "undefined") {
  usig.Calle = function (b, c, e, d) {
    this.codigo = b;
    this.nombre = c;
    this.alturaValida = function (g) {
      if (e instanceof Array) {
        if (e.length == 0) {
          throw new usig.ErrorCalleSinAlturas(this.nombre);
          return false;
        }
        var f = false;
        for (a in e) {
          f =
            f ||
            (parseInt(e[a][0]) <= parseInt(g) &&
              parseInt(e[a][1]) >= parseInt(g));
        }
        return f;
      }
    };
    this.getTramos = function () {
      return e;
    };
    this.toString = function () {
      return this.nombre;
    };
    this.seCruzaCon = function (f) {
      if (d) {
        return d.indexOf(f.codigo) >= 0;
      }
    };
    this.toJson = function () {
      return { codigo: this.codigo, nombre: this.nombre };
    };
    this.isEqual = function (f) {
      return this.codigo == f.codigo;
    };
  };
  usig.Calle.fromObj = function (b) {
    return new usig.Calle(b.codigo, b.nombre);
  };
}
if (typeof usig == "undefined") {
  usig = {};
}
if (typeof usig.Direccion == "undefined") {
  usig.Direccion = (function (b) {
    return function (c, g) {
      var f = null;
      var k = null;
      var j = 0;
      var e = null;
      var h = "";
      var d = null;
      if (c instanceof usig.Calle) {
        f = c;
      } else {
        return null;
      }
      if (g instanceof usig.Calle) {
        k = g;
        e = usig.Direccion.CALLE_Y_CALLE;
      } else {
        if (!isNaN(parseInt(g))) {
          e = usig.Direccion.CALLE_ALTURA;
          j = parseInt(g);
        } else {
          return null;
        }
      }
      this.getCalle = function () {
        return f;
      };
      this.getCalleCruce = function () {
        if (e == usig.Direccion.CALLE_Y_CALLE) {
          return k;
        } else {
          return null;
        }
      };
      this.getAltura = function () {
        return j;
      };
      this.getTipo = function () {
        return e;
      };
      this.toString = function () {
        if (e == usig.Direccion.CALLE_ALTURA) {
          res = f.toString() + " " + (j > 0 ? j : "S/N");
        } else {
          var l = k.nombre;
          var m = l.match(/^(I|Hi|HI).*/) ? " e " : " y ";
          res = f.nombre + m + k.nombre;
        }
        if (f.partido != undefined) {
          res = res + ", " + f.localidad;
        }
        return res;
      };
      this.setCoordenadas = function (l) {
        d = usig.Punto.fromPunto(l);
      };
      this.setSmp = function (l) {
        h = l;
      };
      this.getCoordenadas = function () {
        return d;
      };
      this.getSmp = function () {
        return h;
      };
      this.clone = function () {
        var l = new usig.Direccion(f, g);
        return b.extend(true, l, this);
      };
      this.toJson = function () {
        return {
          tipo: e,
          calle: f.toJson(),
          altura: j,
          calle_cruce: k ? k.toJson() : null,
          smp: h,
          coordenadas: d,
        };
      };
      this.isEqual = function (l) {
        var m =
          l instanceof usig.Direccion &&
          e == l.getTipo() &&
          ((e == usig.Direccion.CALLE_ALTURA &&
            f.isEqual(l.getCalle()) &&
            j == l.getAltura()) ||
            (e == usig.Direccion.CALLE_Y_CALLE &&
              ((f.isEqual(l.getCalle()) && k.isEqual(l.getCalleCruce())) ||
                (f.isEqual(l.getCalleCruce()) && k.isEqual(l.getCalle())))));
        return m;
      };
    };
  })(jQuery);
  usig.Direccion.CALLE_ALTURA = 0;
  usig.Direccion.CALLE_Y_CALLE = 1;
  usig.Direccion.fromObj = function (d) {
    var b = null;
    if (d.tipo != undefined) {
      b = new usig.Direccion(
        usig.Calle.fromObj(d.calle),
        d.tipo == usig.Direccion.CALLE_ALTURA
          ? d.altura
          : usig.Calle.fromObj(d.calle_cruce)
      );
    } else {
      var c = new usig.Calle(d.cod_calle, d.calle);
      if (d.cod_calle2 != null) {
        b = new usig.Direccion(c, new usig.Calle(d.cod_calle2, d.calle2));
      } else {
        b = new usig.Direccion(c, d.altura);
      }
    }
    if (d.smp != undefined && d.smp != null) {
      b.setSmp(d.smp);
    }
    if (d.coordenadas != undefined && d.coordenadas != null) {
      if (typeof d.coordenadas == "string") {
        b.setCoordenadas(usig.Punto.fromWkt(d.coordenadas));
      } else {
        b.setCoordenadas(usig.Punto.fromObj(d.coordenadas));
      }
    }
    return b;
  };
}
if (!this.JSON) {
  this.JSON = {};
}
(function () {
  function f(n) {
    return n < 10 ? "0" + n : n;
  }
  if (typeof Date.prototype.toJSON !== "function") {
    Date.prototype.toJSON = function (key) {
      return isFinite(this.valueOf())
        ? this.getUTCFullYear() +
            "-" +
            f(this.getUTCMonth() + 1) +
            "-" +
            f(this.getUTCDate()) +
            "T" +
            f(this.getUTCHours()) +
            ":" +
            f(this.getUTCMinutes()) +
            ":" +
            f(this.getUTCSeconds()) +
            "Z"
        : null;
    };
    String.prototype.toJSON =
      Number.prototype.toJSON =
      Boolean.prototype.toJSON =
        function (key) {
          return this.valueOf();
        };
  }
  var cx =
      /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
    escapable =
      /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
    gap,
    indent,
    meta = {
      "\b": "\\b",
      "\t": "\\t",
      "\n": "\\n",
      "\f": "\\f",
      "\r": "\\r",
      '"': '\\"',
      "\\": "\\\\",
    },
    rep;
  function quote(string) {
    escapable.lastIndex = 0;
    return escapable.test(string)
      ? '"' +
          string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === "string"
              ? c
              : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
          }) +
          '"'
      : '"' + string + '"';
  }
  function str(key, holder) {
    var i,
      k,
      v,
      length,
      mind = gap,
      partial,
      value = holder[key];
    if (
      value &&
      typeof value === "object" &&
      typeof value.toJSON === "function"
    ) {
      value = value.toJSON(key);
    }
    if (typeof rep === "function") {
      value = rep.call(holder, key, value);
    }
    switch (typeof value) {
      case "string":
        return quote(value);
      case "number":
        return isFinite(value) ? String(value) : "null";
      case "boolean":
      case "null":
        return String(value);
      case "object":
        if (!value) {
          return "null";
        }
        gap += indent;
        partial = [];
        if (Object.prototype.toString.apply(value) === "[object Array]") {
          length = value.length;
          for (i = 0; i < length; i += 1) {
            partial[i] = str(i, value) || "null";
          }
          v =
            partial.length === 0
              ? "[]"
              : gap
              ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]"
              : "[" + partial.join(",") + "]";
          gap = mind;
          return v;
        }
        if (rep && typeof rep === "object") {
          length = rep.length;
          for (i = 0; i < length; i += 1) {
            k = rep[i];
            if (typeof k === "string") {
              v = str(k, value);
              if (v) {
                partial.push(quote(k) + (gap ? ": " : ":") + v);
              }
            }
          }
        } else {
          for (k in value) {
            if (Object.hasOwnProperty.call(value, k)) {
              v = str(k, value);
              if (v) {
                partial.push(quote(k) + (gap ? ": " : ":") + v);
              }
            }
          }
        }
        v =
          partial.length === 0
            ? "{}"
            : gap
            ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}"
            : "{" + partial.join(",") + "}";
        gap = mind;
        return v;
    }
  }
  if (typeof JSON.stringify !== "function") {
    JSON.stringify = function (value, replacer, space) {
      var i;
      gap = "";
      indent = "";
      if (typeof space === "number") {
        for (i = 0; i < space; i += 1) {
          indent += " ";
        }
      } else {
        if (typeof space === "string") {
          indent = space;
        }
      }
      rep = replacer;
      if (
        replacer &&
        typeof replacer !== "function" &&
        (typeof replacer !== "object" || typeof replacer.length !== "number")
      ) {
        throw new Error("JSON.stringify");
      }
      return str("", { "": value });
    };
  }
  if (typeof JSON.parse !== "function") {
    JSON.parse = function (text, reviver) {
      var j;
      function walk(holder, key) {
        var k,
          v,
          value = holder[key];
        if (value && typeof value === "object") {
          for (k in value) {
            if (Object.hasOwnProperty.call(value, k)) {
              v = walk(value, k);
              if (v !== undefined) {
                value[k] = v;
              } else {
                delete value[k];
              }
            }
          }
        }
        return reviver.call(holder, key, value);
      }
      cx.lastIndex = 0;
      if (cx.test(text)) {
        text = text.replace(cx, function (a) {
          return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
        });
      }
      if (
        /^[\],:{}\s]*$/.test(
          text
            .replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@")
            .replace(
              /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
              "]"
            )
            .replace(/(?:^|:|,)(?:\s*\[)+/g, "")
        )
      ) {
        j = eval("(" + text + ")");
        return typeof reviver === "function" ? walk({ "": j }, "") : j;
      }
      throw new SyntaxError("JSON.parse");
    };
  }
})();
if (typeof usig == "undefined") {
  usig = {};
}
if (typeof usig.data == "undefined") {
  usig.data = {};
}
if (typeof usig.defaults == "undefined") {
  usig.defaults = {};
}
usig.defaults.Callejero = {
  server: "//servicios.usig.buenosaires.gob.ar/callejero",
  lazyDataLoad: false,
  loadFullDatabase: true,
  callesEnMinusculas: false,
  encoding: "utf-8",
  expirationTime: 10080,
};
usig.Callejero = (function (h) {
  var b = {},
    p = this,
    e = false,
    m = { ready: [] },
    n = false;
  function f(u, x) {
    var t = true;
    for (var s = 0; s < u.length; s++) {
      var v = u[s];
      v.lastIndex = 0;
      if (!v.test(x[2])) {
        t = false;
        break;
      }
    }
    return t;
  }
  function q(s) {
    n = false;
    if (s.length != usig.data.Callejero.length) {
      alert(
        "Se produjo un error al cargar la informaci????n de cruces de calles."
      );
      return;
    }
    for (var r = 0; r < usig.data.Callejero.length; r++) {
      usig.data.Callejero[r].push(s[r]);
    }
  }
  function o(r) {
    usig.data.Callejero = r;
    n = false;
    d("ready");
  }
  function j() {
    n = true;
    h.ajax({
      type: "GET",
      url: b.server,
      data: { full: 1, cruces: 1, encoding: b.encoding },
      dataType: "jsonp",
      success: q,
      error: function () {
        alert(
          "Se produjo un error al intentar cargar la informaci????n de calles."
        );
      },
    });
  }
  function c(r) {
    n = true;
    h.ajax({
      type: "GET",
      url: b.server,
      data: b.loadFullDatabase
        ? {
            full: 1,
            encoding: b.encoding,
            minusculas: b.callesEnMinusculas ? 1 : 0,
          }
        : { encoding: b.encoding, minusculas: b.callesEnMinusculas ? 1 : 0 },
      dataType: "jsonp",
      success: r,
      error: function () {
        alert(
          "Se produjo un error al intentar cargar la informaci????n de calles."
        );
      },
    });
  }
  function g() {
    if (!n) {
      if (!l()) {
        c(o);
      } else {
        var s;
        try {
          if (localStorage.callejero) {
            s = JSON.parse(localStorage.callejero);
          }
          if (s && new Date().getTime() < s.expiration) {
            o(JSON.parse(s.calles));
          } else {
            c(function (v) {
              var t = b.expirationTime * 60 * 1000;
              var u = {
                calles: JSON.stringify(v),
                expiration: new Date().getTime() + t,
              };
              try {
                localStorage.callejero = JSON.stringify(u);
              } catch (w) {
                console.log("No se pudo grabar el callejero en LocalStorage.");
              }
              o(v);
            });
          }
        } catch (r) {
          c(o);
        }
      }
    }
  }
  function l() {
    try {
      return "localStorage" in window && window.localStorage !== null;
    } catch (r) {
      return false;
    }
  }
  function d(s) {
    for (var r = 0; r < m[s].length; r++) {
      m[s][r]();
    }
  }
  function k(t, s) {
    var u = false;
    for (var r = 0; r < m[t].length; r++) {
      u = u || m[t][r] == s;
    }
    if (!u) {
      m[t].push(s);
    }
  }
  return {
    init: function (r) {
      b = h.extend({}, usig.defaults.Callejero, r);
      if (typeof b.onReady == "function") {
        k("ready", b.onReady);
      }
      e = true;
      if (!usig.data.Callejero && !b.lazyDataLoad) {
        g.defer(100);
      } else {
        if (usig.data.Callejero) {
          d("ready");
          m.ready = [];
        }
      }
      return this;
    },
    buscarPorCodigo: function (u) {
      var r = [];
      if (/^[0-9]+$/.test(u)) {
        var t = usig.data.Callejero.binarySearch(u, function (w, v) {
          return w[0] - v;
        });
        if (t > -1) {
          var s = usig.data.Callejero[t];
          r.push(new usig.Calle(s[0], s[1], s[3], s[4]));
          i = t + 1;
          while (
            i < usig.data.Callejero.length &&
            usig.data.Callejero[i][0] == u
          ) {
            s = usig.data.Callejero[i];
            r.push(new usig.Calle(s[0], s[1], s[3], s[4]));
            i++;
          }
          i = t - 1;
          while (i >= 0 && usig.data.Callejero[i][0] == u) {
            s = usig.data.Callejero[i];
            r.unshift(new usig.Calle(s[0], s[1], s[3], s[4]));
            i--;
          }
        }
      }
      return r;
    },
    matcheaCalle: function (w, r) {
      var u = [];
      var t = [];
      var s = w
        .replace(/"/g, "")
        .translate(
          "???????????????????????????????????????????????????? ???????????????????????????????????????",
          "aeiouuAEIOUUaeiouAEIOU"
        )
        .toUpperCase()
        .trim();
      var v = s.split(" ");
      wordsRE = v.map(function (z) {
        return new RegExp("^" + z + "| " + z, "gi");
      });
      var y = new RegExp("SNO|SIN NOMBRE OFICIAL|NO OFICIAL|PASAJE|PJE", "i");
      if (this.listo()) {
        for (var x = 0; x < usig.data.Callejero.length; x++) {
          if (f(wordsRE, usig.data.Callejero[x])) {
            if (
              !y.test(usig.data.Callejero[x][1]) &&
              usig.data.Callejero[x][3].length != 0
            ) {
              u.push(
                new usig.Calle(
                  usig.data.Callejero[x][0],
                  usig.data.Callejero[x][1],
                  usig.data.Callejero[x][3],
                  usig.data.Callejero[x][4]
                )
              );
            } else {
              t.push(
                new usig.Calle(
                  usig.data.Callejero[x][0],
                  usig.data.Callejero[x][1],
                  usig.data.Callejero[x][3],
                  usig.data.Callejero[x][4]
                )
              );
            }
            if (!isNaN(parseInt(r)) && u.length >= parseInt(r)) {
              break;
            }
          }
        }
        u = u.concat(t);
        if (!isNaN(parseInt(r)) && u.length >= parseInt(r)) {
          u = u.splice(0, r);
        }
        if (usig.data.Callejero[0].length < 5 && !n) {
          j();
        }
      } else {
        g();
        throw new usig.ErrorEnCargaDelCallejero();
      }
      return u;
    },
    tieneTramosComoAv: function (s) {
      var r = usig.data.Callejero.binarySearch(s.codigo, function (u, t) {
        return u[0] - t;
      });
      return (
        s.codigo != 0 &&
        (usig.data.Callejero[r - 1][0] == s.codigo ||
          usig.data.Callejero[r + 1][0] == s.codigo)
      );
    },
    getNombreCalle: function (t, u) {
      var r = this.buscarPorCodigo(t);
      for (var s = 0; s < r.length; s++) {
        if (r[s].alturaValida(u)) {
          return r[s].nombre;
        }
      }
      return "";
    },
    listo: function () {
      return usig.data.Callejero && usig.data.Callejero instanceof Array;
    },
    inicializado: function () {
      return e;
    },
  };
})(jQuery);
if (typeof usig == "undefined") {
  usig = {};
}
usig.StringDireccion = (function (b) {
  return function (e, d) {
    this.tipo = usig.StringDireccion.INVALIDO;
    this.strCalles = "";
    this.strAltura = "";
    this.strInput = e
      .replace(/"/g, "")
      .replace(/[\.,\(\)']/g, " ")
      .toUpperCase()
      .trim();
    var j = /[sS][/\\][nN]/;
    function f(l, k) {
      return l.isDigit() || (k && j.test(l));
    }
    this.setearCalleAltura = function () {
      c = this.strInput.split(" ");
      this.maxWordLen = c.inject(0, function (n, l, m) {
        return Math.max(l.trim().length, n);
      });
      var k = c.length;
      if (k > 1 && f(c[k - 1], d)) {
        this.tipo = usig.StringDireccion.CALLE_ALTURA;
        this.strCalles = c.inject("", function (n, l, m) {
          return m < k - 1 ? (n != "" ? n + " " + l : l) : n;
        });
        this.strAltura = c[k - 1];
      } else {
        this.tipo = usig.StringDireccion.CALLE;
        this.strCalles = this.strInput;
      }
    };
    if (this.strInput.length > 0) {
      var c = this.strInput.split(" Y ");
      if (c.length >= 2) {
        var h = g(this.strInput);
        c = h.split(" Y ");
        if (c.length >= 2) {
          this.tipo = usig.StringDireccion.CALLE_Y_CALLE;
          this.strCalles = [
            c[0].replace(" & ", " Y "),
            c[1].replace(" & ", " Y "),
          ];
        }
      }
      c = this.strInput.split(" E ");
      if (c.length >= 2) {
        if (parseInt(c[c.length - 1]) != c[c.length - 1]) {
          this.tipo = usig.StringDireccion.CALLE_Y_CALLE;
          this.strCalles = c;
        }
      }
      if (this.tipo == usig.StringDireccion.INVALIDO) {
        this.setearCalleAltura();
      }
    } else {
      this.tipo = usig.StringDireccion.INVALIDO;
    }
    function g(k) {
      return k.translate(
        [
          "GELLY Y OBES",
          "MENENDEZ Y PELAYO",
          "OLAGUER Y FELIU",
          "ORTEGA Y GASSET",
          "PAULA Y RODRIGUEZ",
          "PAZ Y FIGUEROA",
          "PI Y MARGALL",
          "RAMON Y CAJAL",
          "TORRES Y TENORIO",
          "TREINTA Y TRES",
        ],
        [
          "GELLY & OBES",
          "MENENDEZ & PELAYO",
          "OLAGUER & FELIU",
          "ORTEGA & GASSET",
          "PAULA & RODRIGUEZ",
          "PAZ & FIGUEROA",
          "PI & MARGALL",
          "RAMON & CAJAL",
          "TORRES & TENORIO",
          "TREINTA & TRES",
        ]
      );
    }
    this.quitarAvsCalle = function () {
      var k = ["AV", "AVDA", "AVENIDA"];
      if (this.tipo == usig.StringDireccion.CALLE_ALTURA) {
        this.strCalles = this.strCalles.removeWords(k);
      } else {
        if (this.tipo == usig.StringDireccion.CALLE_Y_CALLE) {
          this.strCalles[0] = this.strCalles[0].removeWords(k);
        }
      }
    };
    this.quitarAvsCalleCruce = function () {
      var k = ["AV", "AVDA", "AVENIDA"];
      if (this.tipo == usig.StringDireccion.CALLE_Y_CALLE) {
        this.strCalles[1] = this.strCalles[1].removeWords(k);
      }
    };
    this.quitarPasajes = function () {
      var k = ["PJE", "PSJE", "PASAJE"];
      if (this.tipo == usig.StringDireccion.CALLE_ALTURA) {
        this.strCalles = this.strCalles.removeWords(k);
      } else {
        if (this.tipo == usig.StringDireccion.CALLE_Y_CALLE) {
          this.strCalles[0] = this.strCalles[0].removeWords(k);
          this.strCalles[1] = this.strCalles[1].removeWords(k);
        }
      }
    };
    this.esAlturaSN = function (k) {
      return j.test(k);
    };
  };
})(jQuery);
usig.StringDireccion.CALLE = 0;
usig.StringDireccion.CALLE_ALTURA = 1;
usig.StringDireccion.CALLE_Y_CALLE = 2;
usig.StringDireccion.INVALIDO = -1;
if (typeof usig == "undefined") {
  usig = {};
}
usig.ErrorCalleInexistente = function (b) {
  this.toString = function () {
    return "Calle inexistente: " + b;
  };
  this.getNombreCalle = function () {
    return b;
  };
  this.getErrorMessage = function () {
    return usig.ErrorCalleInexistente.defaults.texts.message;
  };
};
usig.ErrorCalleInexistente.defaults = {
  texts: {
    message:
      "No pudo hallarse ninguna calle existente que coincidiera con su b&uacute;squeda. Por favor, revise el nombre ingresado y vuelva a intentarlo.",
  },
};
if (typeof usig == "undefined") {
  usig = {};
}
usig.ErrorCalleInexistenteAEsaAltura = (function (b) {
  return function (d, c, e) {
    this.getCalle = function () {
      return d;
    };
    this.getMatchings = function () {
      return c;
    };
    this.getAltura = function () {
      return e;
    };
    this.toString = function () {
      return "La calle " + d + " no existe a la altura " + e;
    };
    this.getErrorMessage = function () {
      var f =
        usig.ErrorCalleInexistenteAEsaAltura.defaults.texts.message + "<ul>";
      b.each(c, function (h, j) {
        var g = j.getTramos();
        b.each(g, function (k, l) {
          f += "<li>" + j.nombre + " " + l[0] + "-" + l[1] + "</li>";
        });
      });
      f += "</ul>";
      return f;
    };
  };
})(jQuery);
usig.ErrorCalleInexistenteAEsaAltura.defaults = {
  texts: {
    message:
      "La altura indicada no es v&aacute;lida para la calle ingresada. A continuaci&oacute;n se muestran algunas opciones v&aacute;lidas halladas:",
  },
};
if (typeof usig == "undefined") {
  usig = {};
}
usig.ErrorCruceInexistente = (function (b) {
  return function (d, f, c, e) {
    this.getCalle1 = function () {
      return d;
    };
    this.getCalle2 = function () {
      return c;
    };
    this.getMatchingsCalle1 = function () {
      return f;
    };
    this.getMatchingsCalle2 = function () {
      return e;
    };
    this.toString = function () {
      return "Cruce inexistente: " + d + " y " + c;
    };
    this.getErrorMessage = function () {
      var g = usig.ErrorCruceInexistente.defaults.texts.message;
      g +=
        "<br/>" +
        usig.ErrorCruceInexistente.defaults.texts.detalleCalle1 +
        "<ul>";
      b.each(f, function (h, j) {
        g += "<li>" + j.nombre + "</li>";
      });
      g += "</ul>";
      g += usig.ErrorCruceInexistente.defaults.texts.detalleCalle2 + "<ul>";
      b.each(e, function (h, j) {
        g += "<li>" + j.nombre + "</li>";
      });
      g += "</ul>";
      return g;
    };
  };
})(jQuery);
usig.ErrorCruceInexistente.defaults = {
  texts: {
    message:
      "El cruce de calles indicado no existe. A continuaci&oacute;n se muestran algunas calles que coinciden con su b&uacute;squeda.",
    detalleCalle1:
      "Algunas calles halladas que coinciden con la 1ra calle ingresada son:",
    detalleCalle2:
      "Algunas calles halladas que coinciden con la 2da calle ingresada son:",
  },
};
if (typeof usig == "undefined") {
  usig = {};
}
usig.ErrorCalleSinAlturas = function (b) {
  this.toString = function () {
    return usig.ErrorCalleSinAlturas.defaults.texts.message.replace(
      "{calle}",
      b
    );
  };
  this.getNombreCalle = function () {
    return b;
  };
  this.getErrorMessage = function () {
    return usig.ErrorCalleSinAlturas.defaults.texts.message.replace(
      "{calle}",
      b
    );
  };
};
usig.ErrorCalleSinAlturas.defaults = {
  texts: {
    message:
      "La calle {calle} no posee alturas oficiales. Utilice intersecciones para hallar direcciones v&aacute;lidas sobre esta calle o escriba S/N en lugar de la altura.",
  },
};
if (typeof usig == "undefined") {
  usig = {};
}
usig.ErrorEnCargaDelCallejero = function () {
  this.toString = function () {
    return "Callejero no disponible.";
  };
  this.getErrorMessage = function () {
    return "El callejero no se encuentra cargado a????n o se produjo un error al intentar cargarlo";
  };
};
if (typeof usig == "undefined") {
  usig = {};
}
if (typeof usig.defaults == "undefined") {
  usig.defaults = {};
}
usig.defaults.NormalizadorDirecciones = {
  lazyDataLoad: false,
  loadFullDatabase: true,
  aceptarCallesSinAlturas: false,
  callesEnMinusculas: false,
  maxPalabras: 7,
};
usig.NormalizadorDirecciones = (function (f) {
  var h = {},
    e = false,
    l = { ready: [] },
    u = null;
  re = { cruceCalles: /\s+y\s+/gi, calleAltura: [], calle: [] };
  function j(z, A, y) {
    var c = u.matcheaCalle(z.strCalles);
    try {
      var x = s(z, c, A);
    } catch (w) {
      throw w;
    }
    if (x.length == 0 && c.length > 0) {
      z.quitarAvsCalle();
      c = u.matcheaCalle(z.strCalles);
      try {
        x = s(z, c, A);
      } catch (w) {
        throw w;
      }
      x = n(x);
      if (x.length == 0) {
        throw new usig.ErrorCalleInexistenteAEsaAltura(
          z.strCalles,
          c,
          z.strAltura
        );
      }
    } else {
      if (x.length == 0 && c.length == 0) {
        z.quitarPasajes();
        c = u.matcheaCalle(z.strCalles);
        try {
          x = s(z, c, A);
        } catch (w) {
          throw w;
        }
      }
    }
    if (y && x.length > 1) {
      f.each(x, function (C, B) {
        if (m(z.strCalles, B.getCalle().nombre)) {
          x = [B];
        }
      });
    }
    return x;
  }
  function m(x, w) {
    function c(y) {
      y = y
        .replace(/"/g, "")
        .translate(
          "???????????????????????????????????????????????????? ???????????????????????????????????????",
          "aeiouuAEIOUUaeiouAEIOU"
        )
        .toUpperCase()
        .trim();
      y = y.split(" ");
      return y;
    }
    x = c(x);
    w = c(w);
    if (x.length == w.length) {
      intersect = x.intersect(w);
      if (x.length == intersect.length) {
        return true;
      }
    }
    return false;
  }
  function s(A, w, B) {
    var c = new Array();
    var z = 0;
    if (w.length != 0) {
      for (var y = 0; y < w.length; y++) {
        try {
          if (w[y].alturaValida(A.strAltura)) {
            c.push(new usig.Direccion(w[y], A.strAltura));
          }
        } catch (x) {
          if (
            x instanceof usig.ErrorCalleSinAlturas &&
            h.aceptarCallesSinAlturas &&
            A.esAlturaSN(A.strAltura)
          ) {
            c.push(new usig.Direccion(w[y], 0));
          }
          z++;
        }
        if (!isNaN(parseInt(B)) && c.length >= parseInt(B)) {
          break;
        }
      }
      if (w.length == z && c.length == 0) {
        throw new usig.ErrorCalleSinAlturas(w[0].toString());
      }
    }
    return c;
  }
  function n(y, z) {
    var x = z ? z : "getCalle";
    var w = new Array();
    for (var c = 0; c < y.length; c++) {
      if (u.tieneTramosComoAv(y[c][x]())) {
        w.push(y[c]);
      }
    }
    return w;
  }
  function t(J, I) {
    var L = u.matcheaCalle(J.strCalles[0]);
    var K = u.matcheaCalle(J.strCalles[1]);
    var F = new Array();
    function G(N, M) {
      return Math.min(N.codigo, M.codigo) + Math.max(N.codigo, M.codigo);
    }
    var c = new Array();
    for (var C = 0; C < L.length; C++) {
      for (var z = 0; z < K.length; z++) {
        if (
          L[C].codigo != K[z].codigo &&
          F.indexOf(G(L[C], K[z])) < 0 &&
          L[C].seCruzaCon(K[z]) &&
          K[z].seCruzaCon(L[C])
        ) {
          c.push(new usig.Direccion(L[C], K[z]));
          F.push(G(L[C], K[z]));
          if (!isNaN(parseInt(I)) && c.length >= parseInt(I)) {
            break;
          }
        }
      }
      if (!isNaN(parseInt(I)) && c.length >= parseInt(I)) {
        break;
      }
    }
    if (c.length == 0 && L.length > 0 && K.length > 0) {
      var E = J.strCalles[0].split(" ");
      var B = J.strCalles[1].split(" ");
      if (
        E.indexOf("AV") >= 0 ||
        E.indexOf("AVDA") >= 0 ||
        E.indexOf("AVENIDA") >= 0
      ) {
        var D = f.extend(true, {}, J);
        D.quitarAvsCalle();
        try {
          var y = t(D, I);
        } catch (H) {
          throw new usig.ErrorCruceInexistente(
            J.strCalles[0],
            L,
            J.strCalles[1],
            K
          );
        }
        n(y);
        if (y instanceof Array) {
          return y;
        }
      }
      if (
        B.indexOf("AV") >= 0 ||
        B.indexOf("AVDA") >= 0 ||
        B.indexOf("AVENIDA") >= 0
      ) {
        var A = f.extend(true, {}, J);
        A.quitarAvsCalleCruce();
        try {
          var x = t(A, I);
        } catch (H) {
          throw new usig.ErrorCruceInexistente(
            J.strCalles[0],
            L,
            J.strCalles[1],
            K
          );
        }
        n(x, "getCalleCruce");
        if (x instanceof Array) {
          return x;
        }
      }
    }
    if (c.length < I) {
      var w = u.matcheaCalle(J.strInput);
      var C = 0;
      while (c.length < I && C < w.length) {
        c.push(w[C]);
        C++;
      }
    }
    if (c.length == 0 && L.length > 0 && K.length > 0) {
      throw new usig.ErrorCruceInexistente(
        J.strCalles[0],
        L,
        J.strCalles[1],
        K
      );
    }
    return c;
  }
  function p(w) {
    for (var c = 0; c < l[w].length; c++) {
      l[w][c]();
    }
    if (w == "ready") {
      l.ready = [];
    }
  }
  function o(x, w) {
    var y = false;
    for (var c = 0; c < l[x].length; c++) {
      y = y || l[x][c] == w;
    }
    if (!y) {
      l[x].push(w);
    }
  }
  function v(y, z, w) {
    if (typeof w == "undefined") {
      w = true;
    }
    if (typeof jQuery == "undefined") {
      throw "Error: Este componente requiere jQuery y no se encontro.";
      return [];
    }
    var x = new usig.StringDireccion(y, h.aceptarCallesSinAlturas);
    var c = [];
    switch (x.tipo) {
      case usig.StringDireccion.CALLE:
        c = u.matcheaCalle(x.strCalles, z);
        break;
      case usig.StringDireccion.CALLE_ALTURA:
        c = j(x, z, w);
        break;
      case usig.StringDireccion.CALLE_Y_CALLE:
        c = t(x, z);
        if (c.length == 0) {
          x.setearCalleAltura();
          c = j(x, z, w);
        }
        break;
      case usig.StringDireccion.INVALIDO:
        c = [];
        break;
    }
    if (c instanceof Array) {
      if (c.length > 0) {
        return c;
      } else {
        throw new usig.ErrorCalleInexistente(y);
      }
    } else {
      return c;
    }
  }
  function d(w, x, z) {
    textoCalle = w.substring(0, x).reverse();
    textoCruce = w.substr(x + z);
    conector = w.substr(x, z);
    var B = (cruce = "");
    var c = (rCruce = []);
    try {
      try {
        for (var y = 1; y < h.maxPalabras; ++y) {
          cruce = textoCruce.match(re.calle[y])[0];
          if (textoCruce.search(re.calle[y]) != 0) {
            throw "Direccion no valida";
          }
          rCruce = v(cruce, 2, false);
        }
      } catch (A) {
        cruce = textoCruce.match(re.calle[y - 1])[0];
      }
      try {
        for (var y = 1; y < h.maxPalabras; ++y) {
          B = textoCalle.match(re.calle[y])[0].reverse();
          if (textoCalle.search(re.calle[y]) != 0) {
            throw "Direccion no valida";
          }
          c = v(B, 2, false);
        }
      } catch (A) {
        B = textoCalle.match(re.calle[y - 1])[0].reverse();
      }
      resultados = v(B + conector + cruce, 2, false);
      if (resultados.length == 1 && r(resultados[0], B + conector + cruce)) {
        return {
          match: resultados[0],
          pos: w.search(B),
          len: B.length + conector.length + cruce.length,
        };
      } else {
        return false;
      }
    } catch (C) {
      return false;
    }
    return false;
  }
  function q(c) {
    textoDireccion = c.reverse();
    var x = "";
    var A = [];
    try {
      try {
        for (var w = 1; w < h.maxPalabras; ++w) {
          x = textoDireccion.match(re.calleAltura[w])[0].reverse();
          if (textoDireccion.search(re.calleAltura[w]) != 0) {
            throw "Direccion no valida";
          }
          A = v(x, 2, false);
        }
      } catch (y) {
        x = textoDireccion.match(re.calleAltura[w - 1])[0].reverse();
        A = v(x, 2, false);
      }
      if (r(A[0], x)) {
        return { match: A[0], pos: c.search(x), len: x.length };
      }
    } catch (z) {
      return false;
    }
    return false;
  }
  function b(c, w) {
    var x = [];
    var y = /((\s+y\s+)|(\s+\d+))/gi;
    while ((matcheo = y.exec(c))) {
      if (matcheo[0].match(re.cruceCalles)) {
        res = d(c, matcheo.index, matcheo[0].length);
      } else {
        res = q(c.substring(0, matcheo.index + matcheo[0].length));
      }
      if (res) {
        if (x.length > 0) {
          if (
            res.pos == x[x.length - 1].pos &&
            res.match.toString() == x[x.length - 1].match.toString()
          ) {
            if (res.len > x[x.length - 1].len) {
              x.pop();
              x.push(res);
            }
          } else {
            x.push(res);
          }
        } else {
          x.push(res);
        }
      }
      if (!(!w || x.length < w)) {
        return x;
      }
    }
    return x.length > 0 ? x : false;
  }
  function k(y) {
    var x = ["????", "?????", "????", "?????", "????", "????"];
    var w = ["A", "E", "I", "O", "U", "U"];
    for (var c = 0; c < x.length; ++c) {
      y = y.replace(x[c], w[c]);
    }
    return y;
  }
  function r(y, w) {
    var c = k(w.toUpperCase()).split(" ");
    var x = y.toString().toUpperCase().replace(/[,.]/g, "").split(" ");
    for (var A = 0; A < c.length - 1; A++) {
      for (var z = 0; z < x.length - 1; z++) {
        if (c[A] == x[z] && c[A].length > 3) {
          return true;
        }
      }
    }
    return false;
  }
  function g(w, c) {
    return w.pos - c.pos;
  }
  return {
    normalizar: v,
    buscarDireccion: function (c) {
      var w = b(c, 1);
      return w ? w[0] : false;
    },
    buscarDirecciones: function (c, w) {
      var x = b(c, w);
      return x ? x : false;
    },
    listo: function () {
      return u ? u.listo() : false;
    },
    setOptions: function (c) {
      h = f.extend({}, h, c);
      if (typeof h.onReady == "function") {
        o("ready", h.onReady);
      }
    },
    init: function (c) {
      h = f.extend({}, usig.defaults.NormalizadorDirecciones, c);
      if (typeof h.onReady == "function") {
        o("ready", h.onReady);
      }
      u = usig.Callejero.init({
        lazyDataLoad: h.lazyDataLoad,
        loadFullDatabase: h.loadFullDatabase,
        callesEnMinusculas: h.callesEnMinusculas,
        onReady: p.createDelegate(this, ["ready"]),
      });
      for (var w = 1; w <= h.maxPalabras; w++) {
        re.calleAltura[w] = new RegExp(
          "(\\d+(\\s+(\\w|\\d|????|????|????|????|????|????|????|'|`|,|\\.)+){" + w + "})",
          "gi"
        );
        re.calle[w] = new RegExp(
          "(\\w|\\d|????|????|????|????|????|????|????|'|`|,|\\.)+(\\s+(\\w|\\d|????|????|????|????|????|????|????|'|`|,|\\.)+){" +
            (w - 1) +
            "}",
          "gi"
        );
      }
      String.prototype.reverse = function () {
        return this.split("").reverse().join("");
      };
      e = true;
      return this;
    },
    c: u,
    inicializado: function () {
      return e;
    },
  };
})(jQuery);
