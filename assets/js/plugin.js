/* ajaxcgimp */
(function ($) {
  "use strict";
  $.ajaxChimp = {
    responses: {
      "We have sent you a confirmation email": 0,
      "Please enter a value": 1,
      "An email address must contain a single @": 2,
      "The domain portion of the email address is invalid (the portion after the @: )": 3,
      "The username portion of the email address is invalid (the portion before the @: )": 4,
      "This email address looks fake or invalid. Please enter a real email address": 5
    }, translations: { en: null }, init: function (selector, options) {
      $(selector).ajaxChimp(options)
    }
  };
  $.fn.ajaxChimp = function (options) {
    $(this).each(function (i, elem) {
      var form = $(elem);
      var email = form.find("input[type=email]");
      var label = form.find("label[for=" + email.attr("id") + "]");
      var settings = $.extend({ url: form.attr("action"), language: "en" }, options);
      var url = settings.url.replace("/post?", "/post-json?").concat("&c=?");
      form.attr("novalidate", "true");
      email.attr("name", "EMAIL");
      form.submit(function () {
        var msg;

        function successCallback(resp) {
          if (resp.result === "success") {
            msg = "We have sent you a confirmation email";
            label.removeClass("error").addClass("valid");
            email.removeClass("error").addClass("valid")
          } else {
            email.removeClass("valid").addClass("error");
            label.removeClass("valid").addClass("error");
            var index = -1;
            try {
              var parts = resp.msg.split(" - ", 2);
              if (parts[1] === undefined) {
                msg = resp.msg
              } else {
                var i = parseInt(parts[0], 10);
                if (i.toString() === parts[0]) {
                  index = parts[0];
                  msg = parts[1]
                } else {
                  index = -1;
                  msg = resp.msg
                }
              }
            } catch (e) {
              index = -1;
              msg = resp.msg
            }
          }
          if (settings.language !== "en" && $.ajaxChimp.responses[msg] !== undefined && $.ajaxChimp.translations && $.ajaxChimp.translations[settings.language] && $.ajaxChimp.translations[settings.language][$.ajaxChimp.responses[msg]]) {
            msg = $.ajaxChimp.translations[settings.language][$.ajaxChimp.responses[msg]]
          }
          label.html(msg);
          label.show(2e3);
          if (settings.callback) {
            settings.callback(resp)
          }
        }

        var data = {};
        var dataArray = form.serializeArray();
        $.each(dataArray, function (index, item) {
          data[item.name] = item.value
        });
        $.ajax({
          url: url, data: data, success: successCallback, dataType: "jsonp", error: function (resp, text) {
            console.log("mailchimp ajax submit error: " + text)
          }
        });
        var submitMsg = "Submitting...";
        if (settings.language !== "en" && $.ajaxChimp.translations && $.ajaxChimp.translations[settings.language] && $.ajaxChimp.translations[settings.language]["submit"]) {
          submitMsg = $.ajaxChimp.translations[settings.language]["submit"]
        }
        label.html(submitMsg).show(2e3);
        return false
      })
    });
    return this
  }
})(jQuery);

/*! Magnific Popup - v1.0.0 - 2014-12-12
* http://dimsemenov.com/plugins/magnific-popup/
* Copyright (c) 2014 Dmitry Semenov; */
(function (e) {
  "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof exports ? e(require("jquery")) : e(window.jQuery || window.Zepto)
})(function (e) {
  var t, n, i, o, r, a, s, l = "Close", c = "BeforeClose", d = "AfterClose", u = "BeforeAppend", p = "MarkupParse",
    f = "Open", m = "Change", g = "mfp", h = "." + g, v = "mfp-ready", C = "mfp-removing", y = "mfp-prevent-close",
    w = function () {
    }, b = !!window.jQuery, I = e(window), x = function (e, n) {
      t.ev.on(g + e + h, n)
    }, k = function (t, n, i, o) {
      var r = document.createElement("div");
      return r.className = "mfp-" + t, i && (r.innerHTML = i), o ? n && n.appendChild(r) : (r = e(r), n && r.appendTo(n)), r
    }, T = function (n, i) {
      t.ev.triggerHandler(g + n, i), t.st.callbacks && (n = n.charAt(0).toLowerCase() + n.slice(1), t.st.callbacks[n] && t.st.callbacks[n].apply(t, e.isArray(i) ? i : [i]))
    }, E = function (n) {
      return n === s && t.currTemplate.closeBtn || (t.currTemplate.closeBtn = e(t.st.closeMarkup.replace("%title%", t.st.tClose)), s = n), t.currTemplate.closeBtn
    }, _ = function () {
      e.magnificPopup.instance || (t = new w, t.init(), e.magnificPopup.instance = t)
    }, S = function () {
      var e = document.createElement("p").style, t = ["ms", "O", "Moz", "Webkit"];
      if (void 0 !== e.transition) return !0;
      for (; t.length;) if (t.pop() + "Transition" in e) return !0;
      return !1
    };
  w.prototype = {
    constructor: w, init: function () {
      var n = navigator.appVersion;
      t.isIE7 = -1 !== n.indexOf("MSIE 7."), t.isIE8 = -1 !== n.indexOf("MSIE 8."), t.isLowIE = t.isIE7 || t.isIE8, t.isAndroid = /android/gi.test(n), t.isIOS = /iphone|ipad|ipod/gi.test(n), t.supportsTransition = S(), t.probablyMobile = t.isAndroid || t.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), o = e(document), t.popupsCache = {}
    }, open: function (n) {
      i || (i = e(document.body));
      var r;
      if (n.isObj === !1) {
        t.items = n.items.toArray(), t.index = 0;
        var s, l = n.items;
        for (r = 0; l.length > r; r++) if (s = l[r], s.parsed && (s = s.el[0]), s === n.el[0]) {
          t.index = r;
          break
        }
      } else t.items = e.isArray(n.items) ? n.items : [n.items], t.index = n.index || 0;
      if (t.isOpen) return t.updateItemHTML(), void 0;
      t.types = [], a = "", t.ev = n.mainEl && n.mainEl.length ? n.mainEl.eq(0) : o, n.key ? (t.popupsCache[n.key] || (t.popupsCache[n.key] = {}), t.currTemplate = t.popupsCache[n.key]) : t.currTemplate = {}, t.st = e.extend(!0, {}, e.magnificPopup.defaults, n), t.fixedContentPos = "auto" === t.st.fixedContentPos ? !t.probablyMobile : t.st.fixedContentPos, t.st.modal && (t.st.closeOnContentClick = !1, t.st.closeOnBgClick = !1, t.st.showCloseBtn = !1, t.st.enableEscapeKey = !1), t.bgOverlay || (t.bgOverlay = k("bg").on("click" + h, function () {
        t.close()
      }), t.wrap = k("wrap").attr("tabindex", -1).on("click" + h, function (e) {
        t._checkIfClose(e.target) && t.close()
      }), t.container = k("container", t.wrap)), t.contentContainer = k("content"), t.st.preloader && (t.preloader = k("preloader", t.container, t.st.tLoading));
      var c = e.magnificPopup.modules;
      for (r = 0; c.length > r; r++) {
        var d = c[r];
        d = d.charAt(0).toUpperCase() + d.slice(1), t["init" + d].call(t)
      }
      T("BeforeOpen"), t.st.showCloseBtn && (t.st.closeBtnInside ? (x(p, function (e, t, n, i) {
        n.close_replaceWith = E(i.type)
      }), a += " mfp-close-btn-in") : t.wrap.append(E())), t.st.alignTop && (a += " mfp-align-top"), t.fixedContentPos ? t.wrap.css({
        overflow: t.st.overflowY,
        overflowX: "hidden",
        overflowY: t.st.overflowY
      }) : t.wrap.css({
        top: I.scrollTop(),
        position: "absolute"
      }), (t.st.fixedBgPos === !1 || "auto" === t.st.fixedBgPos && !t.fixedContentPos) && t.bgOverlay.css({
        height: o.height(),
        position: "absolute"
      }), t.st.enableEscapeKey && o.on("keyup" + h, function (e) {
        27 === e.keyCode && t.close()
      }), I.on("resize" + h, function () {
        t.updateSize()
      }), t.st.closeOnContentClick || (a += " mfp-auto-cursor"), a && t.wrap.addClass(a);
      var u = t.wH = I.height(), m = {};
      if (t.fixedContentPos && t._hasScrollBar(u)) {
        var g = t._getScrollbarSize();
        g && (m.marginRight = g)
      }
      t.fixedContentPos && (t.isIE7 ? e("body, html").css("overflow", "hidden") : m.overflow = "hidden");
      var C = t.st.mainClass;
      return t.isIE7 && (C += " mfp-ie7"), C && t._addClassToMFP(C), t.updateItemHTML(), T("BuildControls"), e("html").css(m), t.bgOverlay.add(t.wrap).prependTo(t.st.prependTo || i), t._lastFocusedEl = document.activeElement, setTimeout(function () {
        t.content ? (t._addClassToMFP(v), t._setFocus()) : t.bgOverlay.addClass(v), o.on("focusin" + h, t._onFocusIn)
      }, 16), t.isOpen = !0, t.updateSize(u), T(f), n
    }, close: function () {
      t.isOpen && (T(c), t.isOpen = !1, t.st.removalDelay && !t.isLowIE && t.supportsTransition ? (t._addClassToMFP(C), setTimeout(function () {
        t._close()
      }, t.st.removalDelay)) : t._close())
    }, _close: function () {
      T(l);
      var n = C + " " + v + " ";
      if (t.bgOverlay.detach(), t.wrap.detach(), t.container.empty(), t.st.mainClass && (n += t.st.mainClass + " "), t._removeClassFromMFP(n), t.fixedContentPos) {
        var i = { marginRight: "" };
        t.isIE7 ? e("body, html").css("overflow", "") : i.overflow = "", e("html").css(i)
      }
      o.off("keyup" + h + " focusin" + h), t.ev.off(h), t.wrap.attr("class", "mfp-wrap").removeAttr("style"), t.bgOverlay.attr("class", "mfp-bg"), t.container.attr("class", "mfp-container"), !t.st.showCloseBtn || t.st.closeBtnInside && t.currTemplate[t.currItem.type] !== !0 || t.currTemplate.closeBtn && t.currTemplate.closeBtn.detach(), t._lastFocusedEl && e(t._lastFocusedEl).focus(), t.currItem = null, t.content = null, t.currTemplate = null, t.prevHeight = 0, T(d)
    }, updateSize: function (e) {
      if (t.isIOS) {
        var n = document.documentElement.clientWidth / window.innerWidth, i = window.innerHeight * n;
        t.wrap.css("height", i), t.wH = i
      } else t.wH = e || I.height();
      t.fixedContentPos || t.wrap.css("height", t.wH), T("Resize")
    }, updateItemHTML: function () {
      var n = t.items[t.index];
      t.contentContainer.detach(), t.content && t.content.detach(), n.parsed || (n = t.parseEl(t.index));
      var i = n.type;
      if (T("BeforeChange", [t.currItem ? t.currItem.type : "", i]), t.currItem = n, !t.currTemplate[i]) {
        var o = t.st[i] ? t.st[i].markup : !1;
        T("FirstMarkupParse", o), t.currTemplate[i] = o ? e(o) : !0
      }
      r && r !== n.type && t.container.removeClass("mfp-" + r + "-holder");
      var a = t["get" + i.charAt(0).toUpperCase() + i.slice(1)](n, t.currTemplate[i]);
      t.appendContent(a, i), n.preloaded = !0, T(m, n), r = n.type, t.container.prepend(t.contentContainer), T("AfterChange")
    }, appendContent: function (e, n) {
      t.content = e, e ? t.st.showCloseBtn && t.st.closeBtnInside && t.currTemplate[n] === !0 ? t.content.find(".mfp-close").length || t.content.append(E()) : t.content = e : t.content = "", T(u), t.container.addClass("mfp-" + n + "-holder"), t.contentContainer.append(t.content)
    }, parseEl: function (n) {
      var i, o = t.items[n];
      if (o.tagName ? o = { el: e(o) } : (i = o.type, o = { data: o, src: o.src }), o.el) {
        for (var r = t.types, a = 0; r.length > a; a++) if (o.el.hasClass("mfp-" + r[a])) {
          i = r[a];
          break
        }
        o.src = o.el.attr("data-mfp-src"), o.src || (o.src = o.el.attr("href"))
      }
      return o.type = i || t.st.type || "inline", o.index = n, o.parsed = !0, t.items[n] = o, T("ElementParse", o), t.items[n]
    }, addGroup: function (e, n) {
      var i = function (i) {
        i.mfpEl = this, t._openClick(i, e, n)
      };
      n || (n = {});
      var o = "click.magnificPopup";
      n.mainEl = e, n.items ? (n.isObj = !0, e.off(o).on(o, i)) : (n.isObj = !1, n.delegate ? e.off(o).on(o, n.delegate, i) : (n.items = e, e.off(o).on(o, i)))
    }, _openClick: function (n, i, o) {
      var r = void 0 !== o.midClick ? o.midClick : e.magnificPopup.defaults.midClick;
      if (r || 2 !== n.which && !n.ctrlKey && !n.metaKey) {
        var a = void 0 !== o.disableOn ? o.disableOn : e.magnificPopup.defaults.disableOn;
        if (a) if (e.isFunction(a)) {
          if (!a.call(t)) return !0
        } else if (a > I.width()) return !0;
        n.type && (n.preventDefault(), t.isOpen && n.stopPropagation()), o.el = e(n.mfpEl), o.delegate && (o.items = i.find(o.delegate)), t.open(o)
      }
    }, updateStatus: function (e, i) {
      if (t.preloader) {
        n !== e && t.container.removeClass("mfp-s-" + n), i || "loading" !== e || (i = t.st.tLoading);
        var o = { status: e, text: i };
        T("UpdateStatus", o), e = o.status, i = o.text, t.preloader.html(i), t.preloader.find("a").on("click", function (e) {
          e.stopImmediatePropagation()
        }), t.container.addClass("mfp-s-" + e), n = e
      }
    }, _checkIfClose: function (n) {
      if (!e(n).hasClass(y)) {
        var i = t.st.closeOnContentClick, o = t.st.closeOnBgClick;
        if (i && o) return !0;
        if (!t.content || e(n).hasClass("mfp-close") || t.preloader && n === t.preloader[0]) return !0;
        if (n === t.content[0] || e.contains(t.content[0], n)) {
          if (i) return !0
        } else if (o && e.contains(document, n)) return !0;
        return !1
      }
    }, _addClassToMFP: function (e) {
      t.bgOverlay.addClass(e), t.wrap.addClass(e)
    }, _removeClassFromMFP: function (e) {
      this.bgOverlay.removeClass(e), t.wrap.removeClass(e)
    }, _hasScrollBar: function (e) {
      return (t.isIE7 ? o.height() : document.body.scrollHeight) > (e || I.height())
    }, _setFocus: function () {
      (t.st.focus ? t.content.find(t.st.focus).eq(0) : t.wrap).focus()
    }, _onFocusIn: function (n) {
      return n.target === t.wrap[0] || e.contains(t.wrap[0], n.target) ? void 0 : (t._setFocus(), !1)
    }, _parseMarkup: function (t, n, i) {
      var o;
      i.data && (n = e.extend(i.data, n)), T(p, [t, n, i]), e.each(n, function (e, n) {
        if (void 0 === n || n === !1) return !0;
        if (o = e.split("_"), o.length > 1) {
          var i = t.find(h + "-" + o[0]);
          if (i.length > 0) {
            var r = o[1];
            "replaceWith" === r ? i[0] !== n[0] && i.replaceWith(n) : "img" === r ? i.is("img") ? i.attr("src", n) : i.replaceWith('<img src="' + n + '" class="' + i.attr("class") + '" />') : i.attr(o[1], n)
          }
        } else t.find(h + "-" + e).html(n)
      })
    }, _getScrollbarSize: function () {
      if (void 0 === t.scrollbarSize) {
        var e = document.createElement("div");
        e.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(e), t.scrollbarSize = e.offsetWidth - e.clientWidth, document.body.removeChild(e)
      }
      return t.scrollbarSize
    }
  }, e.magnificPopup = {
    instance: null,
    proto: w.prototype,
    modules: [],
    open: function (t, n) {
      return _(), t = t ? e.extend(!0, {}, t) : {}, t.isObj = !0, t.index = n || 0, this.instance.open(t)
    },
    close: function () {
      return e.magnificPopup.instance && e.magnificPopup.instance.close()
    },
    registerModule: function (t, n) {
      n.options && (e.magnificPopup.defaults[t] = n.options), e.extend(this.proto, n.proto), this.modules.push(t)
    },
    defaults: {
      disableOn: 0,
      key: null,
      midClick: !1,
      mainClass: "",
      preloader: !0,
      focus: "",
      closeOnContentClick: !1,
      closeOnBgClick: !0,
      closeBtnInside: !0,
      showCloseBtn: !0,
      enableEscapeKey: !0,
      modal: !1,
      alignTop: !1,
      removalDelay: 0,
      prependTo: null,
      fixedContentPos: "auto",
      fixedBgPos: "auto",
      overflowY: "auto",
      closeMarkup: '<button title="%title%" type="button" class="mfp-close">&times;</button>',
      tClose: "Close (Esc)",
      tLoading: "Loading..."
    }
  }, e.fn.magnificPopup = function (n) {
    _();
    var i = e(this);
    if ("string" == typeof n) if ("open" === n) {
      var o, r = b ? i.data("magnificPopup") : i[0].magnificPopup, a = parseInt(arguments[1], 10) || 0;
      r.items ? o = r.items[a] : (o = i, r.delegate && (o = o.find(r.delegate)), o = o.eq(a)), t._openClick({ mfpEl: o }, i, r)
    } else t.isOpen && t[n].apply(t, Array.prototype.slice.call(arguments, 1)); else n = e.extend(!0, {}, n), b ? i.data("magnificPopup", n) : i[0].magnificPopup = n, t.addGroup(i, n);
    return i
  };
  var P, O, z, M = "inline", B = function () {
    z && (O.after(z.addClass(P)).detach(), z = null)
  };
  e.magnificPopup.registerModule(M, {
    options: { hiddenClass: "hide", markup: "", tNotFound: "Content not found" },
    proto: {
      initInline: function () {
        t.types.push(M), x(l + "." + M, function () {
          B()
        })
      }, getInline: function (n, i) {
        if (B(), n.src) {
          var o = t.st.inline, r = e(n.src);
          if (r.length) {
            var a = r[0].parentNode;
            a && a.tagName && (O || (P = o.hiddenClass, O = k(P), P = "mfp-" + P), z = r.after(O).detach().removeClass(P)), t.updateStatus("ready")
          } else t.updateStatus("error", o.tNotFound), r = e("<div>");
          return n.inlineElement = r, r
        }
        return t.updateStatus("ready"), t._parseMarkup(i, {}, n), i
      }
    }
  });
  var F, H = "ajax", L = function () {
    F && i.removeClass(F)
  }, A = function () {
    L(), t.req && t.req.abort()
  };
  e.magnificPopup.registerModule(H, {
    options: {
      settings: null,
      cursor: "mfp-ajax-cur",
      tError: '<a href="%url%">The content</a> could not be loaded.'
    }, proto: {
      initAjax: function () {
        t.types.push(H), F = t.st.ajax.cursor, x(l + "." + H, A), x("BeforeChange." + H, A)
      }, getAjax: function (n) {
        F && i.addClass(F), t.updateStatus("loading");
        var o = e.extend({
          url: n.src, success: function (i, o, r) {
            var a = { data: i, xhr: r };
            T("ParseAjax", a), t.appendContent(e(a.data), H), n.finished = !0, L(), t._setFocus(), setTimeout(function () {
              t.wrap.addClass(v)
            }, 16), t.updateStatus("ready"), T("AjaxContentAdded")
          }, error: function () {
            L(), n.finished = n.loadError = !0, t.updateStatus("error", t.st.ajax.tError.replace("%url%", n.src))
          }
        }, t.st.ajax.settings);
        return t.req = e.ajax(o), ""
      }
    }
  });
  var j, N = function (n) {
    if (n.data && void 0 !== n.data.title) return n.data.title;
    var i = t.st.image.titleSrc;
    if (i) {
      if (e.isFunction(i)) return i.call(t, n);
      if (n.el) return n.el.attr(i) || ""
    }
    return ""
  };
  e.magnificPopup.registerModule("image", {
    options: {
      markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
      cursor: "mfp-zoom-out-cur",
      titleSrc: "title",
      verticalFit: !0,
      tError: '<a href="%url%">The image</a> could not be loaded.'
    }, proto: {
      initImage: function () {
        var e = t.st.image, n = ".image";
        t.types.push("image"), x(f + n, function () {
          "image" === t.currItem.type && e.cursor && i.addClass(e.cursor)
        }), x(l + n, function () {
          e.cursor && i.removeClass(e.cursor), I.off("resize" + h)
        }), x("Resize" + n, t.resizeImage), t.isLowIE && x("AfterChange", t.resizeImage)
      }, resizeImage: function () {
        var e = t.currItem;
        if (e && e.img && t.st.image.verticalFit) {
          var n = 0;
          t.isLowIE && (n = parseInt(e.img.css("padding-top"), 10) + parseInt(e.img.css("padding-bottom"), 10)), e.img.css("max-height", t.wH - n)
        }
      }, _onImageHasSize: function (e) {
        e.img && (e.hasSize = !0, j && clearInterval(j), e.isCheckingImgSize = !1, T("ImageHasSize", e), e.imgHidden && (t.content && t.content.removeClass("mfp-loading"), e.imgHidden = !1))
      }, findImageSize: function (e) {
        var n = 0, i = e.img[0], o = function (r) {
          j && clearInterval(j), j = setInterval(function () {
            return i.naturalWidth > 0 ? (t._onImageHasSize(e), void 0) : (n > 200 && clearInterval(j), n++, 3 === n ? o(10) : 40 === n ? o(50) : 100 === n && o(500), void 0)
          }, r)
        };
        o(1)
      }, getImage: function (n, i) {
        var o = 0, r = function () {
          n && (n.img[0].complete ? (n.img.off(".mfploader"), n === t.currItem && (t._onImageHasSize(n), t.updateStatus("ready")), n.hasSize = !0, n.loaded = !0, T("ImageLoadComplete")) : (o++, 200 > o ? setTimeout(r, 100) : a()))
        }, a = function () {
          n && (n.img.off(".mfploader"), n === t.currItem && (t._onImageHasSize(n), t.updateStatus("error", s.tError.replace("%url%", n.src))), n.hasSize = !0, n.loaded = !0, n.loadError = !0)
        }, s = t.st.image, l = i.find(".mfp-img");
        if (l.length) {
          var c = document.createElement("img");
          c.className = "mfp-img", n.el && n.el.find("img").length && (c.alt = n.el.find("img").attr("alt")), n.img = e(c).on("load.mfploader", r).on("error.mfploader", a), c.src = n.src, l.is("img") && (n.img = n.img.clone()), c = n.img[0], c.naturalWidth > 0 ? n.hasSize = !0 : c.width || (n.hasSize = !1)
        }
        return t._parseMarkup(i, {
          title: N(n),
          img_replaceWith: n.img
        }, n), t.resizeImage(), n.hasSize ? (j && clearInterval(j), n.loadError ? (i.addClass("mfp-loading"), t.updateStatus("error", s.tError.replace("%url%", n.src))) : (i.removeClass("mfp-loading"), t.updateStatus("ready")), i) : (t.updateStatus("loading"), n.loading = !0, n.hasSize || (n.imgHidden = !0, i.addClass("mfp-loading"), t.findImageSize(n)), i)
      }
    }
  });
  var W, R = function () {
    return void 0 === W && (W = void 0 !== document.createElement("p").style.MozTransform), W
  };
  e.magnificPopup.registerModule("zoom", {
    options: {
      enabled: !1,
      easing: "ease-in-out",
      duration: 300,
      opener: function (e) {
        return e.is("img") ? e : e.find("img")
      }
    }, proto: {
      initZoom: function () {
        var e, n = t.st.zoom, i = ".zoom";
        if (n.enabled && t.supportsTransition) {
          var o, r, a = n.duration, s = function (e) {
            var t = e.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
              i = "all " + n.duration / 1e3 + "s " + n.easing,
              o = { position: "fixed", zIndex: 9999, left: 0, top: 0, "-webkit-backface-visibility": "hidden" },
              r = "transition";
            return o["-webkit-" + r] = o["-moz-" + r] = o["-o-" + r] = o[r] = i, t.css(o), t
          }, d = function () {
            t.content.css("visibility", "visible")
          };
          x("BuildControls" + i, function () {
            if (t._allowZoom()) {
              if (clearTimeout(o), t.content.css("visibility", "hidden"), e = t._getItemToZoom(), !e) return d(), void 0;
              r = s(e), r.css(t._getOffset()), t.wrap.append(r), o = setTimeout(function () {
                r.css(t._getOffset(!0)), o = setTimeout(function () {
                  d(), setTimeout(function () {
                    r.remove(), e = r = null, T("ZoomAnimationEnded")
                  }, 16)
                }, a)
              }, 16)
            }
          }), x(c + i, function () {
            if (t._allowZoom()) {
              if (clearTimeout(o), t.st.removalDelay = a, !e) {
                if (e = t._getItemToZoom(), !e) return;
                r = s(e)
              }
              r.css(t._getOffset(!0)), t.wrap.append(r), t.content.css("visibility", "hidden"), setTimeout(function () {
                r.css(t._getOffset())
              }, 16)
            }
          }), x(l + i, function () {
            t._allowZoom() && (d(), r && r.remove(), e = null)
          })
        }
      }, _allowZoom: function () {
        return "image" === t.currItem.type
      }, _getItemToZoom: function () {
        return t.currItem.hasSize ? t.currItem.img : !1
      }, _getOffset: function (n) {
        var i;
        i = n ? t.currItem.img : t.st.zoom.opener(t.currItem.el || t.currItem);
        var o = i.offset(), r = parseInt(i.css("padding-top"), 10), a = parseInt(i.css("padding-bottom"), 10);
        o.top -= e(window).scrollTop() - r;
        var s = { width: i.width(), height: (b ? i.innerHeight() : i[0].offsetHeight) - a - r };
        return R() ? s["-moz-transform"] = s.transform = "translate(" + o.left + "px," + o.top + "px)" : (s.left = o.left, s.top = o.top), s
      }
    }
  });
  var Z = "iframe", q = "//about:blank", D = function (e) {
    if (t.currTemplate[Z]) {
      var n = t.currTemplate[Z].find("iframe");
      n.length && (e || (n[0].src = q), t.isIE8 && n.css("display", e ? "block" : "none"))
    }
  };
  e.magnificPopup.registerModule(Z, {
    options: {
      markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
      srcAction: "iframe_src",
      patterns: {
        youtube: { index: "youtube.com", id: "v=", src: "//www.youtube.com/embed/%id%?autoplay=1" },
        vimeo: { index: "vimeo.com/", id: "/", src: "//player.vimeo.com/video/%id%?autoplay=1" },
        gmaps: { index: "//maps.google.", src: "%id%&output=embed" }
      }
    }, proto: {
      initIframe: function () {
        t.types.push(Z), x("BeforeChange", function (e, t, n) {
          t !== n && (t === Z ? D() : n === Z && D(!0))
        }), x(l + "." + Z, function () {
          D()
        })
      }, getIframe: function (n, i) {
        var o = n.src, r = t.st.iframe;
        e.each(r.patterns, function () {
          return o.indexOf(this.index) > -1 ? (this.id && (o = "string" == typeof this.id ? o.substr(o.lastIndexOf(this.id) + this.id.length, o.length) : this.id.call(this, o)), o = this.src.replace("%id%", o), !1) : void 0
        });
        var a = {};
        return r.srcAction && (a[r.srcAction] = o), t._parseMarkup(i, a, n), t.updateStatus("ready"), i
      }
    }
  });
  var K = function (e) {
    var n = t.items.length;
    return e > n - 1 ? e - n : 0 > e ? n + e : e
  }, Y = function (e, t, n) {
    return e.replace(/%curr%/gi, t + 1).replace(/%total%/gi, n)
  };
  e.magnificPopup.registerModule("gallery", {
    options: {
      enabled: !1,
      arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
      preload: [0, 2],
      navigateByImgClick: !0,
      arrows: !0,
      tPrev: "Previous (Left arrow key)",
      tNext: "Next (Right arrow key)",
      tCounter: "%curr% of %total%"
    }, proto: {
      initGallery: function () {
        var n = t.st.gallery, i = ".mfp-gallery", r = Boolean(e.fn.mfpFastClick);
        return t.direction = !0, n && n.enabled ? (a += " mfp-gallery", x(f + i, function () {
          n.navigateByImgClick && t.wrap.on("click" + i, ".mfp-img", function () {
            return t.items.length > 1 ? (t.next(), !1) : void 0
          }), o.on("keydown" + i, function (e) {
            37 === e.keyCode ? t.prev() : 39 === e.keyCode && t.next()
          })
        }), x("UpdateStatus" + i, function (e, n) {
          n.text && (n.text = Y(n.text, t.currItem.index, t.items.length))
        }), x(p + i, function (e, i, o, r) {
          var a = t.items.length;
          o.counter = a > 1 ? Y(n.tCounter, r.index, a) : ""
        }), x("BuildControls" + i, function () {
          if (t.items.length > 1 && n.arrows && !t.arrowLeft) {
            var i = n.arrowMarkup,
              o = t.arrowLeft = e(i.replace(/%title%/gi, n.tPrev).replace(/%dir%/gi, "left")).addClass(y),
              a = t.arrowRight = e(i.replace(/%title%/gi, n.tNext).replace(/%dir%/gi, "right")).addClass(y),
              s = r ? "mfpFastClick" : "click";
            o[s](function () {
              t.prev()
            }), a[s](function () {
              t.next()
            }), t.isIE7 && (k("b", o[0], !1, !0), k("a", o[0], !1, !0), k("b", a[0], !1, !0), k("a", a[0], !1, !0)), t.container.append(o.add(a))
          }
        }), x(m + i, function () {
          t._preloadTimeout && clearTimeout(t._preloadTimeout), t._preloadTimeout = setTimeout(function () {
            t.preloadNearbyImages(), t._preloadTimeout = null
          }, 16)
        }), x(l + i, function () {
          o.off(i), t.wrap.off("click" + i), t.arrowLeft && r && t.arrowLeft.add(t.arrowRight).destroyMfpFastClick(), t.arrowRight = t.arrowLeft = null
        }), void 0) : !1
      }, next: function () {
        t.direction = !0, t.index = K(t.index + 1), t.updateItemHTML()
      }, prev: function () {
        t.direction = !1, t.index = K(t.index - 1), t.updateItemHTML()
      }, goTo: function (e) {
        t.direction = e >= t.index, t.index = e, t.updateItemHTML()
      }, preloadNearbyImages: function () {
        var e, n = t.st.gallery.preload, i = Math.min(n[0], t.items.length), o = Math.min(n[1], t.items.length);
        for (e = 1; (t.direction ? o : i) >= e; e++) t._preloadItem(t.index + e);
        for (e = 1; (t.direction ? i : o) >= e; e++) t._preloadItem(t.index - e)
      }, _preloadItem: function (n) {
        if (n = K(n), !t.items[n].preloaded) {
          var i = t.items[n];
          i.parsed || (i = t.parseEl(n)), T("LazyLoad", i), "image" === i.type && (i.img = e('<img class="mfp-img" />').on("load.mfploader", function () {
            i.hasSize = !0
          }).on("error.mfploader", function () {
            i.hasSize = !0, i.loadError = !0, T("LazyLoadError", i)
          }).attr("src", i.src)), i.preloaded = !0
        }
      }
    }
  });
  var U = "retina";
  e.magnificPopup.registerModule(U, {
    options: {
      replaceSrc: function (e) {
        return e.src.replace(/\.\w+$/, function (e) {
          return "@2x" + e
        })
      }, ratio: 1
    }, proto: {
      initRetina: function () {
        if (window.devicePixelRatio > 1) {
          var e = t.st.retina, n = e.ratio;
          n = isNaN(n) ? n() : n, n > 1 && (x("ImageHasSize." + U, function (e, t) {
            t.img.css({ "max-width": t.img[0].naturalWidth / n, width: "100%" })
          }), x("ElementParse." + U, function (t, i) {
            i.src = e.replaceSrc(i, n)
          }))
        }
      }
    }
  }), function () {
    var t = 1e3, n = "ontouchstart" in window, i = function () {
      I.off("touchmove" + r + " touchend" + r)
    }, o = "mfpFastClick", r = "." + o;
    e.fn.mfpFastClick = function (o) {
      return e(this).each(function () {
        var a, s = e(this);
        if (n) {
          var l, c, d, u, p, f;
          s.on("touchstart" + r, function (e) {
            u = !1, f = 1, p = e.originalEvent ? e.originalEvent.touches[0] : e.touches[0], c = p.clientX, d = p.clientY, I.on("touchmove" + r, function (e) {
              p = e.originalEvent ? e.originalEvent.touches : e.touches, f = p.length, p = p[0], (Math.abs(p.clientX - c) > 10 || Math.abs(p.clientY - d) > 10) && (u = !0, i())
            }).on("touchend" + r, function (e) {
              i(), u || f > 1 || (a = !0, e.preventDefault(), clearTimeout(l), l = setTimeout(function () {
                a = !1
              }, t), o())
            })
          })
        }
        s.on("click" + r, function () {
          a || o()
        })
      })
    }, e.fn.destroyMfpFastClick = function () {
      e(this).off("touchstart" + r + " click" + r), n && I.off("touchmove" + r + " touchend" + r)
    }
  }(), _()
});

/*! Backstretch - v2.0.4 - 2013-06-19
* http://srobbin.com/jquery-plugins/backstretch/
* Copyright (c) 2013 Scott Robbin; Licensed MIT */
(function (a, d, p) {
  a.fn.backstretch = function (c, b) {
    (c === p || 0 === c.length) && a.error("No images were supplied for Backstretch");
    0 === a(d).scrollTop() && d.scrollTo(0, 0);
    return this.each(function () {
      var d = a(this), g = d.data("backstretch");
      if (g) {
        if ("string" == typeof c && "function" == typeof g[c]) {
          g[c](b);
          return
        }
        b = a.extend(g.options, b);
        g.destroy(!0)
      }
      g = new q(this, c, b);
      d.data("backstretch", g)
    })
  };
  a.backstretch = function (c, b) {
    return a("body").backstretch(c, b).data("backstretch")
  };
  a.expr[":"].backstretch = function (c) {
    return a(c).data("backstretch") !== p
  };
  a.fn.backstretch.defaults = { centeredX: !0, centeredY: !0, duration: 5E3, fade: 0 };
  var r = {
    left: 0,
    top: 0,
    overflow: "hidden",
    margin: 0,
    padding: 0,
    height: "100%",
    width: "100%",
    zIndex: -999999
  }, s = {
    position: "absolute",
    display: "none",
    margin: 0,
    padding: 0,
    border: "none",
    width: "auto",
    height: "auto",
    maxHeight: "none",
    maxWidth: "none",
    zIndex: -999999
  }, q = function (c, b, e) {
    this.options = a.extend({}, a.fn.backstretch.defaults, e || {});
    this.images = a.isArray(b) ? b : [b];
    a.each(this.images, function () {
      a("<img />")[0].src = this
    });
    this.isBody = c === document.body;
    this.$container = a(c);
    this.$root = this.isBody ? l ? a(d) : a(document) : this.$container;
    c = this.$container.children(".backstretch").first();
    this.$wrap = c.length ? c : a('<div class="backstretch"></div>').css(r).appendTo(this.$container);
    this.isBody || (c = this.$container.css("position"), b = this.$container.css("zIndex"), this.$container.css({
      position: "static" === c ? "relative" : c,
      zIndex: "auto" === b ? 0 : b,
      background: "none"
    }), this.$wrap.css({ zIndex: -999998 }));
    this.$wrap.css({ position: this.isBody && l ? "fixed" : "absolute" });
    this.index = 0;
    this.show(this.index);
    a(d).on("resize.backstretch", a.proxy(this.resize, this)).on("orientationchange.backstretch", a.proxy(function () {
      this.isBody && 0 === d.pageYOffset && (d.scrollTo(0, 1), this.resize())
    }, this))
  };
  q.prototype = {
    resize: function () {
      try {
        var a = { left: 0, top: 0 }, b = this.isBody ? this.$root.width() : this.$root.innerWidth(), e = b,
          g = this.isBody ? d.innerHeight ? d.innerHeight : this.$root.height() : this.$root.innerHeight(),
          j = e / this.$img.data("ratio"), f;
        j >= g ? (f = (j - g) / 2, this.options.centeredY && (a.top = "-" + f + "px")) : (j = g, e = j * this.$img.data("ratio"), f = (e - b) / 2, this.options.centeredX && (a.left = "-" + f + "px"));
        this.$wrap.css({ width: b, height: g }).find("img:not(.deleteable)").css({ width: e, height: j }).css(a)
      } catch (h) {
      }
      return this
    }, show: function (c) {
      if (!(Math.abs(c) > this.images.length - 1)) {
        var b = this, e = b.$wrap.find("img").addClass("deleteable"), d = { relatedTarget: b.$container[0] };
        b.$container.trigger(a.Event("backstretch.before", d), [b, c]);
        this.index = c;
        clearInterval(b.interval);
        b.$img = a("<img />").css(s).bind("load", function (f) {
          var h = this.width || a(f.target).width();
          f = this.height || a(f.target).height();
          a(this).data("ratio", h / f);
          a(this).fadeIn(b.options.speed || b.options.fade, function () {
            e.remove();
            b.paused || b.cycle();
            a(["after", "show"]).each(function () {
              b.$container.trigger(a.Event("backstretch." + this, d), [b, c])
            })
          });
          b.resize()
        }).appendTo(b.$wrap);
        b.$img.attr("src", b.images[c]);
        return b
      }
    }, next: function () {
      return this.show(this.index < this.images.length - 1 ? this.index + 1 : 0)
    }, prev: function () {
      return this.show(0 === this.index ? this.images.length - 1 : this.index - 1)
    }, pause: function () {
      this.paused = !0;
      return this
    }, resume: function () {
      this.paused = !1;
      this.next();
      return this
    }, cycle: function () {
      1 < this.images.length && (clearInterval(this.interval), this.interval = setInterval(a.proxy(function () {
        this.paused || this.next()
      }, this), this.options.duration));
      return this
    }, destroy: function (c) {
      a(d).off("resize.backstretch orientationchange.backstretch");
      clearInterval(this.interval);
      c || this.$wrap.remove();
      this.$container.removeData("backstretch")
    }
  };
  var l, f = navigator.userAgent, m = navigator.platform, e = f.match(/AppleWebKit\/([0-9]+)/), e = !!e && e[1],
    h = f.match(/Fennec\/([0-9]+)/), h = !!h && h[1], n = f.match(/Opera Mobi\/([0-9]+)/), t = !!n && n[1],
    k = f.match(/MSIE ([0-9]+)/), k = !!k && k[1];
  l = !((-1 < m.indexOf("iPhone") || -1 < m.indexOf("iPad") || -1 < m.indexOf("iPod")) && e && 534 > e || d.operamini && "[object OperaMini]" === {}.toString.call(d.operamini) || n && 7458 > t || -1 < f.indexOf("Android") && e && 533 > e || h && 6 > h || "palmGetResource" in d && e && 534 > e || -1 < f.indexOf("MeeGo") && -1 < f.indexOf("NokiaBrowser/8.5.0") || k && 6 >= k)
})(jQuery, window);

/*! VelocityJS.org (1.2.2). (C) 2014 Julian Shapiro. MIT @license: en.wikipedia.org/wiki/MIT_License */
/*! VelocityJS.org jQuery Shim (1.0.1). (C) 2014 The jQuery Foundation. MIT @license: en.wikipedia.org/wiki/MIT_License. */
!function (e) {
  function t(e) {
    var t = e.length, r = $.type(e);
    return "function" === r || $.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === r || 0 === t || "number" == typeof t && t > 0 && t - 1 in e
  }

  if (!e.jQuery) {
    var $ = function (e, t) {
      return new $.fn.init(e, t)
    };
    $.isWindow = function (e) {
      return null != e && e == e.window
    }, $.type = function (e) {
      return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? a[o.call(e)] || "object" : typeof e
    }, $.isArray = Array.isArray || function (e) {
      return "array" === $.type(e)
    }, $.isPlainObject = function (e) {
      var t;
      if (!e || "object" !== $.type(e) || e.nodeType || $.isWindow(e)) return !1;
      try {
        if (e.constructor && !n.call(e, "constructor") && !n.call(e.constructor.prototype, "isPrototypeOf")) return !1
      } catch (r) {
        return !1
      }
      for (t in e) ;
      return void 0 === t || n.call(e, t)
    }, $.each = function (e, r, a) {
      var n, o = 0, i = e.length, s = t(e);
      if (a) {
        if (s) for (; i > o && (n = r.apply(e[o], a), n !== !1); o++) ; else for (o in e) if (n = r.apply(e[o], a), n === !1) break
      } else if (s) for (; i > o && (n = r.call(e[o], o, e[o]), n !== !1); o++) ; else for (o in e) if (n = r.call(e[o], o, e[o]), n === !1) break;
      return e
    }, $.data = function (e, t, a) {
      if (void 0 === a) {
        var n = e[$.expando], o = n && r[n];
        if (void 0 === t) return o;
        if (o && t in o) return o[t]
      } else if (void 0 !== t) {
        var n = e[$.expando] || (e[$.expando] = ++$.uuid);
        return r[n] = r[n] || {}, r[n][t] = a, a
      }
    }, $.removeData = function (e, t) {
      var a = e[$.expando], n = a && r[a];
      n && $.each(t, function (e, t) {
        delete n[t]
      })
    }, $.extend = function () {
      var e, t, r, a, n, o, i = arguments[0] || {}, s = 1, l = arguments.length, u = !1;
      for ("boolean" == typeof i && (u = i, i = arguments[s] || {}, s++), "object" != typeof i && "function" !== $.type(i) && (i = {}), s === l && (i = this, s--); l > s; s++) if (null != (n = arguments[s])) for (a in n) e = i[a], r = n[a], i !== r && (u && r && ($.isPlainObject(r) || (t = $.isArray(r))) ? (t ? (t = !1, o = e && $.isArray(e) ? e : []) : o = e && $.isPlainObject(e) ? e : {}, i[a] = $.extend(u, o, r)) : void 0 !== r && (i[a] = r));
      return i
    }, $.queue = function (e, r, a) {
      function n(e, r) {
        var a = r || [];
        return null != e && (t(Object(e)) ? !function (e, t) {
          for (var r = +t.length, a = 0, n = e.length; r > a;) e[n++] = t[a++];
          if (r !== r) for (; void 0 !== t[a];) e[n++] = t[a++];
          return e.length = n, e
        }(a, "string" == typeof e ? [e] : e) : [].push.call(a, e)), a
      }

      if (e) {
        r = (r || "fx") + "queue";
        var o = $.data(e, r);
        return a ? (!o || $.isArray(a) ? o = $.data(e, r, n(a)) : o.push(a), o) : o || []
      }
    }, $.dequeue = function (e, t) {
      $.each(e.nodeType ? [e] : e, function (e, r) {
        t = t || "fx";
        var a = $.queue(r, t), n = a.shift();
        "inprogress" === n && (n = a.shift()), n && ("fx" === t && a.unshift("inprogress"), n.call(r, function () {
          $.dequeue(r, t)
        }))
      })
    }, $.fn = $.prototype = {
      init: function (e) {
        if (e.nodeType) return this[0] = e, this;
        throw new Error("Not a DOM node.")
      }, offset: function () {
        var t = this[0].getBoundingClientRect ? this[0].getBoundingClientRect() : { top: 0, left: 0 };
        return {
          top: t.top + (e.pageYOffset || document.scrollTop || 0) - (document.clientTop || 0),
          left: t.left + (e.pageXOffset || document.scrollLeft || 0) - (document.clientLeft || 0)
        }
      }, position: function () {
        function e() {
          for (var e = this.offsetParent || document; e && "html" === !e.nodeType.toLowerCase && "static" === e.style.position;) e = e.offsetParent;
          return e || document
        }

        var t = this[0], e = e.apply(t), r = this.offset(),
          a = /^(?:body|html)$/i.test(e.nodeName) ? { top: 0, left: 0 } : $(e).offset();
        return r.top -= parseFloat(t.style.marginTop) || 0, r.left -= parseFloat(t.style.marginLeft) || 0, e.style && (a.top += parseFloat(e.style.borderTopWidth) || 0, a.left += parseFloat(e.style.borderLeftWidth) || 0), {
          top: r.top - a.top,
          left: r.left - a.left
        }
      }
    };
    var r = {};
    $.expando = "velocity" + (new Date).getTime(), $.uuid = 0;
    for (var a = {}, n = a.hasOwnProperty, o = a.toString, i = "Boolean Number String Function Array Date RegExp Object Error".split(" "), s = 0; s < i.length; s++) a["[object " + i[s] + "]"] = i[s].toLowerCase();
    $.fn.init.prototype = $.fn, e.Velocity = { Utilities: $ }
  }
}(window), function (e) {
  "object" == typeof module && "object" == typeof module.exports ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : e()
}(function () {
  return function (e, t, r, a) {
    function n(e) {
      for (var t = -1, r = e ? e.length : 0, a = []; ++t < r;) {
        var n = e[t];
        n && a.push(n)
      }
      return a
    }

    function o(e) {
      return g.isWrapped(e) ? e = [].slice.call(e) : g.isNode(e) && (e = [e]), e
    }

    function i(e) {
      var t = $.data(e, "velocity");
      return null === t ? a : t
    }

    function s(e) {
      return function (t) {
        return Math.round(t * e) * (1 / e)
      }
    }

    function l(e, r, a, n) {
      function o(e, t) {
        return 1 - 3 * t + 3 * e
      }

      function i(e, t) {
        return 3 * t - 6 * e
      }

      function s(e) {
        return 3 * e
      }

      function l(e, t, r) {
        return ((o(t, r) * e + i(t, r)) * e + s(t)) * e
      }

      function u(e, t, r) {
        return 3 * o(t, r) * e * e + 2 * i(t, r) * e + s(t)
      }

      function c(t, r) {
        for (var n = 0; m > n; ++n) {
          var o = u(r, e, a);
          if (0 === o) return r;
          var i = l(r, e, a) - t;
          r -= i / o
        }
        return r
      }

      function p() {
        for (var t = 0; b > t; ++t) w[t] = l(t * x, e, a)
      }

      function f(t, r, n) {
        var o, i, s = 0;
        do i = r + (n - r) / 2, o = l(i, e, a) - t, o > 0 ? n = i : r = i; while (Math.abs(o) > h && ++s < v);
        return i
      }

      function d(t) {
        for (var r = 0, n = 1, o = b - 1; n != o && w[n] <= t; ++n) r += x;
        --n;
        var i = (t - w[n]) / (w[n + 1] - w[n]), s = r + i * x, l = u(s, e, a);
        return l >= y ? c(t, s) : 0 == l ? s : f(t, r, r + x)
      }

      function g() {
        V = !0, (e != r || a != n) && p()
      }

      var m = 4, y = .001, h = 1e-7, v = 10, b = 11, x = 1 / (b - 1), S = "Float32Array" in t;
      if (4 !== arguments.length) return !1;
      for (var P = 0; 4 > P; ++P) if ("number" != typeof arguments[P] || isNaN(arguments[P]) || !isFinite(arguments[P])) return !1;
      e = Math.min(e, 1), a = Math.min(a, 1), e = Math.max(e, 0), a = Math.max(a, 0);
      var w = S ? new Float32Array(b) : new Array(b), V = !1, C = function (t) {
        return V || g(), e === r && a === n ? t : 0 === t ? 0 : 1 === t ? 1 : l(d(t), r, n)
      };
      C.getControlPoints = function () {
        return [{ x: e, y: r }, { x: a, y: n }]
      };
      var T = "generateBezier(" + [e, r, a, n] + ")";
      return C.toString = function () {
        return T
      }, C
    }

    function u(e, t) {
      var r = e;
      return g.isString(e) ? v.Easings[e] || (r = !1) : r = g.isArray(e) && 1 === e.length ? s.apply(null, e) : g.isArray(e) && 2 === e.length ? b.apply(null, e.concat([t])) : g.isArray(e) && 4 === e.length ? l.apply(null, e) : !1, r === !1 && (r = v.Easings[v.defaults.easing] ? v.defaults.easing : h), r
    }

    function c(e) {
      if (e) {
        var t = (new Date).getTime(), r = v.State.calls.length;
        r > 1e4 && (v.State.calls = n(v.State.calls));
        for (var o = 0; r > o; o++) if (v.State.calls[o]) {
          var s = v.State.calls[o], l = s[0], u = s[2], f = s[3], d = !!f, m = null;
          f || (f = v.State.calls[o][3] = t - 16);
          for (var y = Math.min((t - f) / u.duration, 1), h = 0, b = l.length; b > h; h++) {
            var S = l[h], w = S.element;
            if (i(w)) {
              var V = !1;
              if (u.display !== a && null !== u.display && "none" !== u.display) {
                if ("flex" === u.display) {
                  var C = ["-webkit-box", "-moz-box", "-ms-flexbox", "-webkit-flex"];
                  $.each(C, function (e, t) {
                    x.setPropertyValue(w, "display", t)
                  })
                }
                x.setPropertyValue(w, "display", u.display)
              }
              u.visibility !== a && "hidden" !== u.visibility && x.setPropertyValue(w, "visibility", u.visibility);
              for (var T in S) if ("element" !== T) {
                var k = S[T], A, F = g.isString(k.easing) ? v.Easings[k.easing] : k.easing;
                if (1 === y) A = k.endValue; else {
                  var E = k.endValue - k.startValue;
                  if (A = k.startValue + E * F(y, u, E), !d && A === k.currentValue) continue
                }
                if (k.currentValue = A, "tween" === T) m = A; else {
                  if (x.Hooks.registered[T]) {
                    var j = x.Hooks.getRoot(T), H = i(w).rootPropertyValueCache[j];
                    H && (k.rootPropertyValue = H)
                  }
                  var N = x.setPropertyValue(w, T, k.currentValue + (0 === parseFloat(A) ? "" : k.unitType), k.rootPropertyValue, k.scrollData);
                  x.Hooks.registered[T] && (i(w).rootPropertyValueCache[j] = x.Normalizations.registered[j] ? x.Normalizations.registered[j]("extract", null, N[1]) : N[1]), "transform" === N[0] && (V = !0)
                }
              }
              u.mobileHA && i(w).transformCache.translate3d === a && (i(w).transformCache.translate3d = "(0px, 0px, 0px)", V = !0), V && x.flushTransformCache(w)
            }
          }
          u.display !== a && "none" !== u.display && (v.State.calls[o][2].display = !1), u.visibility !== a && "hidden" !== u.visibility && (v.State.calls[o][2].visibility = !1), u.progress && u.progress.call(s[1], s[1], y, Math.max(0, f + u.duration - t), f, m), 1 === y && p(o)
        }
      }
      v.State.isTicking && P(c)
    }

    function p(e, t) {
      if (!v.State.calls[e]) return !1;
      for (var r = v.State.calls[e][0], n = v.State.calls[e][1], o = v.State.calls[e][2], s = v.State.calls[e][4], l = !1, u = 0, c = r.length; c > u; u++) {
        var p = r[u].element;
        if (t || o.loop || ("none" === o.display && x.setPropertyValue(p, "display", o.display), "hidden" === o.visibility && x.setPropertyValue(p, "visibility", o.visibility)), o.loop !== !0 && ($.queue(p)[1] === a || !/\.velocityQueueEntryFlag/i.test($.queue(p)[1])) && i(p)) {
          i(p).isAnimating = !1, i(p).rootPropertyValueCache = {};
          var f = !1;
          $.each(x.Lists.transforms3D, function (e, t) {
            var r = /^scale/.test(t) ? 1 : 0, n = i(p).transformCache[t];
            i(p).transformCache[t] !== a && new RegExp("^\\(" + r + "[^.]").test(n) && (f = !0, delete i(p).transformCache[t])
          }), o.mobileHA && (f = !0, delete i(p).transformCache.translate3d), f && x.flushTransformCache(p), x.Values.removeClass(p, "velocity-animating")
        }
        if (!t && o.complete && !o.loop && u === c - 1) try {
          o.complete.call(n, n)
        } catch (d) {
          setTimeout(function () {
            throw d
          }, 1)
        }
        s && o.loop !== !0 && s(n), i(p) && o.loop === !0 && !t && ($.each(i(p).tweensContainer, function (e, t) {
          /^rotate/.test(e) && 360 === parseFloat(t.endValue) && (t.endValue = 0, t.startValue = 360), /^backgroundPosition/.test(e) && 100 === parseFloat(t.endValue) && "%" === t.unitType && (t.endValue = 0, t.startValue = 100)
        }), v(p, "reverse", { loop: !0, delay: o.delay })), o.queue !== !1 && $.dequeue(p, o.queue)
      }
      v.State.calls[e] = !1;
      for (var g = 0, m = v.State.calls.length; m > g; g++) if (v.State.calls[g] !== !1) {
        l = !0;
        break
      }
      l === !1 && (v.State.isTicking = !1, delete v.State.calls, v.State.calls = [])
    }

    var f = function () {
      if (r.documentMode) return r.documentMode;
      for (var e = 7; e > 4; e--) {
        var t = r.createElement("div");
        if (t.innerHTML = "<!--[if IE " + e + "]><span></span><![endif]-->", t.getElementsByTagName("span").length) return t = null, e
      }
      return a
    }(), d = function () {
      var e = 0;
      return t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || function (t) {
        var r = (new Date).getTime(), a;
        return a = Math.max(0, 16 - (r - e)), e = r + a, setTimeout(function () {
          t(r + a)
        }, a)
      }
    }(), g = {
      isString: function (e) {
        return "string" == typeof e
      }, isArray: Array.isArray || function (e) {
        return "[object Array]" === Object.prototype.toString.call(e)
      }, isFunction: function (e) {
        return "[object Function]" === Object.prototype.toString.call(e)
      }, isNode: function (e) {
        return e && e.nodeType
      }, isNodeList: function (e) {
        return "object" == typeof e && /^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(e)) && e.length !== a && (0 === e.length || "object" == typeof e[0] && e[0].nodeType > 0)
      }, isWrapped: function (e) {
        return e && (e.jquery || t.Zepto && t.Zepto.zepto.isZ(e))
      }, isSVG: function (e) {
        return t.SVGElement && e instanceof t.SVGElement
      }, isEmptyObject: function (e) {
        for (var t in e) return !1;
        return !0
      }
    }, $, m = !1;
    if (e.fn && e.fn.jquery ? ($ = e, m = !0) : $ = t.Velocity.Utilities, 8 >= f && !m) throw new Error("Velocity: IE8 and below require jQuery to be loaded before Velocity.");
    if (7 >= f) return void(jQuery.fn.velocity = jQuery.fn.animate);
    var y = 400, h = "swing", v = {
      State: {
        isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
        isAndroid: /Android/i.test(navigator.userAgent),
        isGingerbread: /Android 2\.3\.[3-7]/i.test(navigator.userAgent),
        isChrome: t.chrome,
        isFirefox: /Firefox/i.test(navigator.userAgent),
        prefixElement: r.createElement("div"),
        prefixMatches: {},
        scrollAnchor: null,
        scrollPropertyLeft: null,
        scrollPropertyTop: null,
        isTicking: !1,
        calls: []
      },
      CSS: {},
      Utilities: $,
      Redirects: {},
      Easings: {},
      Promise: t.Promise,
      defaults: {
        queue: "",
        duration: y,
        easing: h,
        begin: a,
        complete: a,
        progress: a,
        display: a,
        visibility: a,
        loop: !1,
        delay: !1,
        mobileHA: !0,
        _cacheValues: !0
      },
      init: function (e) {
        $.data(e, "velocity", {
          isSVG: g.isSVG(e),
          isAnimating: !1,
          computedStyle: null,
          tweensContainer: null,
          rootPropertyValueCache: {},
          transformCache: {}
        })
      },
      hook: null,
      mock: !1,
      version: { major: 1, minor: 2, patch: 2 },
      debug: !1
    };
    t.pageYOffset !== a ? (v.State.scrollAnchor = t, v.State.scrollPropertyLeft = "pageXOffset", v.State.scrollPropertyTop = "pageYOffset") : (v.State.scrollAnchor = r.documentElement || r.body.parentNode || r.body, v.State.scrollPropertyLeft = "scrollLeft", v.State.scrollPropertyTop = "scrollTop");
    var b = function () {
      function e(e) {
        return -e.tension * e.x - e.friction * e.v
      }

      function t(t, r, a) {
        var n = { x: t.x + a.dx * r, v: t.v + a.dv * r, tension: t.tension, friction: t.friction };
        return { dx: n.v, dv: e(n) }
      }

      function r(r, a) {
        var n = { dx: r.v, dv: e(r) }, o = t(r, .5 * a, n), i = t(r, .5 * a, o), s = t(r, a, i),
          l = 1 / 6 * (n.dx + 2 * (o.dx + i.dx) + s.dx), u = 1 / 6 * (n.dv + 2 * (o.dv + i.dv) + s.dv);
        return r.x = r.x + l * a, r.v = r.v + u * a, r
      }

      return function a(e, t, n) {
        var o = { x: -1, v: 0, tension: null, friction: null }, i = [0], s = 0, l = 1e-4, u = .016, c, p, f;
        for (e = parseFloat(e) || 500, t = parseFloat(t) || 20, n = n || null, o.tension = e, o.friction = t, c = null !== n, c ? (s = a(e, t), p = s / n * u) : p = u; ;) if (f = r(f || o, p), i.push(1 + f.x), s += 16, !(Math.abs(f.x) > l && Math.abs(f.v) > l)) break;
        return c ? function (e) {
          return i[e * (i.length - 1) | 0]
        } : s
      }
    }();
    v.Easings = {
      linear: function (e) {
        return e
      }, swing: function (e) {
        return .5 - Math.cos(e * Math.PI) / 2
      }, spring: function (e) {
        return 1 - Math.cos(4.5 * e * Math.PI) * Math.exp(6 * -e)
      }
    }, $.each([["ease", [.25, .1, .25, 1]], ["ease-in", [.42, 0, 1, 1]], ["ease-out", [0, 0, .58, 1]], ["ease-in-out", [.42, 0, .58, 1]], ["easeInSine", [.47, 0, .745, .715]], ["easeOutSine", [.39, .575, .565, 1]], ["easeInOutSine", [.445, .05, .55, .95]], ["easeInQuad", [.55, .085, .68, .53]], ["easeOutQuad", [.25, .46, .45, .94]], ["easeInOutQuad", [.455, .03, .515, .955]], ["easeInCubic", [.55, .055, .675, .19]], ["easeOutCubic", [.215, .61, .355, 1]], ["easeInOutCubic", [.645, .045, .355, 1]], ["easeInQuart", [.895, .03, .685, .22]], ["easeOutQuart", [.165, .84, .44, 1]], ["easeInOutQuart", [.77, 0, .175, 1]], ["easeInQuint", [.755, .05, .855, .06]], ["easeOutQuint", [.23, 1, .32, 1]], ["easeInOutQuint", [.86, 0, .07, 1]], ["easeInExpo", [.95, .05, .795, .035]], ["easeOutExpo", [.19, 1, .22, 1]], ["easeInOutExpo", [1, 0, 0, 1]], ["easeInCirc", [.6, .04, .98, .335]], ["easeOutCirc", [.075, .82, .165, 1]], ["easeInOutCirc", [.785, .135, .15, .86]]], function (e, t) {
      v.Easings[t[0]] = l.apply(null, t[1])
    });
    var x = v.CSS = {
      RegEx: {
        isHex: /^#([A-f\d]{3}){1,2}$/i,
        valueUnwrap: /^[A-z]+\((.*)\)$/i,
        wrappedValueAlreadyExtracted: /[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/,
        valueSplit: /([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/gi
      },
      Lists: {
        colors: ["fill", "stroke", "stopColor", "color", "backgroundColor", "borderColor", "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor", "outlineColor"],
        transformsBase: ["translateX", "translateY", "scale", "scaleX", "scaleY", "skewX", "skewY", "rotateZ"],
        transforms3D: ["transformPerspective", "translateZ", "scaleZ", "rotateX", "rotateY"]
      },
      Hooks: {
        templates: {
          textShadow: ["Color X Y Blur", "black 0px 0px 0px"],
          boxShadow: ["Color X Y Blur Spread", "black 0px 0px 0px 0px"],
          clip: ["Top Right Bottom Left", "0px 0px 0px 0px"],
          backgroundPosition: ["X Y", "0% 0%"],
          transformOrigin: ["X Y Z", "50% 50% 0px"],
          perspectiveOrigin: ["X Y", "50% 50%"]
        }, registered: {}, register: function () {
          for (var e = 0; e < x.Lists.colors.length; e++) {
            var t = "color" === x.Lists.colors[e] ? "0 0 0 1" : "255 255 255 1";
            x.Hooks.templates[x.Lists.colors[e]] = ["Red Green Blue Alpha", t]
          }
          var r, a, n;
          if (f) for (r in x.Hooks.templates) {
            a = x.Hooks.templates[r], n = a[0].split(" ");
            var o = a[1].match(x.RegEx.valueSplit);
            "Color" === n[0] && (n.push(n.shift()), o.push(o.shift()), x.Hooks.templates[r] = [n.join(" "), o.join(" ")])
          }
          for (r in x.Hooks.templates) {
            a = x.Hooks.templates[r], n = a[0].split(" ");
            for (var e in n) {
              var i = r + n[e], s = e;
              x.Hooks.registered[i] = [r, s]
            }
          }
        }, getRoot: function (e) {
          var t = x.Hooks.registered[e];
          return t ? t[0] : e
        }, cleanRootPropertyValue: function (e, t) {
          return x.RegEx.valueUnwrap.test(t) && (t = t.match(x.RegEx.valueUnwrap)[1]), x.Values.isCSSNullValue(t) && (t = x.Hooks.templates[e][1]), t
        }, extractValue: function (e, t) {
          var r = x.Hooks.registered[e];
          if (r) {
            var a = r[0], n = r[1];
            return t = x.Hooks.cleanRootPropertyValue(a, t), t.toString().match(x.RegEx.valueSplit)[n]
          }
          return t
        }, injectValue: function (e, t, r) {
          var a = x.Hooks.registered[e];
          if (a) {
            var n = a[0], o = a[1], i, s;
            return r = x.Hooks.cleanRootPropertyValue(n, r), i = r.toString().match(x.RegEx.valueSplit), i[o] = t, s = i.join(" ")
          }
          return r
        }
      },
      Normalizations: {
        registered: {
          clip: function (e, t, r) {
            switch (e) {
              case"name":
                return "clip";
              case"extract":
                var a;
                return x.RegEx.wrappedValueAlreadyExtracted.test(r) ? a = r : (a = r.toString().match(x.RegEx.valueUnwrap), a = a ? a[1].replace(/,(\s+)?/g, " ") : r), a;
              case"inject":
                return "rect(" + r + ")"
            }
          }, blur: function (e, t, r) {
            switch (e) {
              case"name":
                return v.State.isFirefox ? "filter" : "-webkit-filter";
              case"extract":
                var a = parseFloat(r);
                if (!a && 0 !== a) {
                  var n = r.toString().match(/blur\(([0-9]+[A-z]+)\)/i);
                  a = n ? n[1] : 0
                }
                return a;
              case"inject":
                return parseFloat(r) ? "blur(" + r + ")" : "none"
            }
          }, opacity: function (e, t, r) {
            if (8 >= f) switch (e) {
              case"name":
                return "filter";
              case"extract":
                var a = r.toString().match(/alpha\(opacity=(.*)\)/i);
                return r = a ? a[1] / 100 : 1;
              case"inject":
                return t.style.zoom = 1, parseFloat(r) >= 1 ? "" : "alpha(opacity=" + parseInt(100 * parseFloat(r), 10) + ")"
            } else switch (e) {
              case"name":
                return "opacity";
              case"extract":
                return r;
              case"inject":
                return r
            }
          }
        }, register: function () {
          9 >= f || v.State.isGingerbread || (x.Lists.transformsBase = x.Lists.transformsBase.concat(x.Lists.transforms3D));
          for (var e = 0; e < x.Lists.transformsBase.length; e++) !function () {
            var t = x.Lists.transformsBase[e];
            x.Normalizations.registered[t] = function (e, r, n) {
              switch (e) {
                case"name":
                  return "transform";
                case"extract":
                  return i(r) === a || i(r).transformCache[t] === a ? /^scale/i.test(t) ? 1 : 0 : i(r).transformCache[t].replace(/[()]/g, "");
                case"inject":
                  var o = !1;
                  switch (t.substr(0, t.length - 1)) {
                    case"translate":
                      o = !/(%|px|em|rem|vw|vh|\d)$/i.test(n);
                      break;
                    case"scal":
                    case"scale":
                      v.State.isAndroid && i(r).transformCache[t] === a && 1 > n && (n = 1), o = !/(\d)$/i.test(n);
                      break;
                    case"skew":
                      o = !/(deg|\d)$/i.test(n);
                      break;
                    case"rotate":
                      o = !/(deg|\d)$/i.test(n)
                  }
                  return o || (i(r).transformCache[t] = "(" + n + ")"), i(r).transformCache[t]
              }
            }
          }();
          for (var e = 0; e < x.Lists.colors.length; e++) !function () {
            var t = x.Lists.colors[e];
            x.Normalizations.registered[t] = function (e, r, n) {
              switch (e) {
                case"name":
                  return t;
                case"extract":
                  var o;
                  if (x.RegEx.wrappedValueAlreadyExtracted.test(n)) o = n; else {
                    var i, s = {
                      black: "rgb(0, 0, 0)",
                      blue: "rgb(0, 0, 255)",
                      gray: "rgb(128, 128, 128)",
                      green: "rgb(0, 128, 0)",
                      red: "rgb(255, 0, 0)",
                      white: "rgb(255, 255, 255)"
                    };
                    /^[A-z]+$/i.test(n) ? i = s[n] !== a ? s[n] : s.black : x.RegEx.isHex.test(n) ? i = "rgb(" + x.Values.hexToRgb(n).join(" ") + ")" : /^rgba?\(/i.test(n) || (i = s.black), o = (i || n).toString().match(x.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g, " ")
                  }
                  return 8 >= f || 3 !== o.split(" ").length || (o += " 1"), o;
                case"inject":
                  return 8 >= f ? 4 === n.split(" ").length && (n = n.split(/\s+/).slice(0, 3).join(" ")) : 3 === n.split(" ").length && (n += " 1"), (8 >= f ? "rgb" : "rgba") + "(" + n.replace(/\s+/g, ",").replace(/\.(\d)+(?=,)/g, "") + ")"
              }
            }
          }()
        }
      },
      Names: {
        camelCase: function (e) {
          return e.replace(/-(\w)/g, function (e, t) {
            return t.toUpperCase()
          })
        }, SVGAttribute: function (e) {
          var t = "width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2";
          return (f || v.State.isAndroid && !v.State.isChrome) && (t += "|transform"), new RegExp("^(" + t + ")$", "i").test(e)
        }, prefixCheck: function (e) {
          if (v.State.prefixMatches[e]) return [v.State.prefixMatches[e], !0];
          for (var t = ["", "Webkit", "Moz", "ms", "O"], r = 0, a = t.length; a > r; r++) {
            var n;
            if (n = 0 === r ? e : t[r] + e.replace(/^\w/, function (e) {
                return e.toUpperCase()
              }), g.isString(v.State.prefixElement.style[n])) return v.State.prefixMatches[e] = n, [n, !0]
          }
          return [e, !1]
        }
      },
      Values: {
        hexToRgb: function (e) {
          var t = /^#?([a-f\d])([a-f\d])([a-f\d])$/i, r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i, a;
          return e = e.replace(t, function (e, t, r, a) {
            return t + t + r + r + a + a
          }), a = r.exec(e), a ? [parseInt(a[1], 16), parseInt(a[2], 16), parseInt(a[3], 16)] : [0, 0, 0]
        }, isCSSNullValue: function (e) {
          return 0 == e || /^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(e)
        }, getUnitType: function (e) {
          return /^(rotate|skew)/i.test(e) ? "deg" : /(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(e) ? "" : "px"
        }, getDisplayType: function (e) {
          var t = e && e.tagName.toString().toLowerCase();
          return /^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(t) ? "inline" : /^(li)$/i.test(t) ? "list-item" : /^(tr)$/i.test(t) ? "table-row" : /^(table)$/i.test(t) ? "table" : /^(tbody)$/i.test(t) ? "table-row-group" : "block"
        }, addClass: function (e, t) {
          e.classList ? e.classList.add(t) : e.className += (e.className.length ? " " : "") + t
        }, removeClass: function (e, t) {
          e.classList ? e.classList.remove(t) : e.className = e.className.toString().replace(new RegExp("(^|\\s)" + t.split(" ").join("|") + "(\\s|$)", "gi"), " ")
        }
      },
      getPropertyValue: function (e, r, n, o) {
        function s(e, r) {
          function n() {
            u && x.setPropertyValue(e, "display", "none")
          }

          var l = 0;
          if (8 >= f) l = $.css(e, r); else {
            var u = !1;
            if (/^(width|height)$/.test(r) && 0 === x.getPropertyValue(e, "display") && (u = !0, x.setPropertyValue(e, "display", x.Values.getDisplayType(e))), !o) {
              if ("height" === r && "border-box" !== x.getPropertyValue(e, "boxSizing").toString().toLowerCase()) {
                var c = e.offsetHeight - (parseFloat(x.getPropertyValue(e, "borderTopWidth")) || 0) - (parseFloat(x.getPropertyValue(e, "borderBottomWidth")) || 0) - (parseFloat(x.getPropertyValue(e, "paddingTop")) || 0) - (parseFloat(x.getPropertyValue(e, "paddingBottom")) || 0);
                return n(), c
              }
              if ("width" === r && "border-box" !== x.getPropertyValue(e, "boxSizing").toString().toLowerCase()) {
                var p = e.offsetWidth - (parseFloat(x.getPropertyValue(e, "borderLeftWidth")) || 0) - (parseFloat(x.getPropertyValue(e, "borderRightWidth")) || 0) - (parseFloat(x.getPropertyValue(e, "paddingLeft")) || 0) - (parseFloat(x.getPropertyValue(e, "paddingRight")) || 0);
                return n(), p
              }
            }
            var d;
            d = i(e) === a ? t.getComputedStyle(e, null) : i(e).computedStyle ? i(e).computedStyle : i(e).computedStyle = t.getComputedStyle(e, null), "borderColor" === r && (r = "borderTopColor"), l = 9 === f && "filter" === r ? d.getPropertyValue(r) : d[r], ("" === l || null === l) && (l = e.style[r]), n()
          }
          if ("auto" === l && /^(top|right|bottom|left)$/i.test(r)) {
            var g = s(e, "position");
            ("fixed" === g || "absolute" === g && /top|left/i.test(r)) && (l = $(e).position()[r] + "px")
          }
          return l
        }

        var l;
        if (x.Hooks.registered[r]) {
          var u = r, c = x.Hooks.getRoot(u);
          n === a && (n = x.getPropertyValue(e, x.Names.prefixCheck(c)[0])), x.Normalizations.registered[c] && (n = x.Normalizations.registered[c]("extract", e, n)), l = x.Hooks.extractValue(u, n)
        } else if (x.Normalizations.registered[r]) {
          var p, d;
          p = x.Normalizations.registered[r]("name", e), "transform" !== p && (d = s(e, x.Names.prefixCheck(p)[0]), x.Values.isCSSNullValue(d) && x.Hooks.templates[r] && (d = x.Hooks.templates[r][1])), l = x.Normalizations.registered[r]("extract", e, d)
        }
        if (!/^[\d-]/.test(l)) if (i(e) && i(e).isSVG && x.Names.SVGAttribute(r)) if (/^(height|width)$/i.test(r)) try {
          l = e.getBBox()[r]
        } catch (g) {
          l = 0
        } else l = e.getAttribute(r); else l = s(e, x.Names.prefixCheck(r)[0]);
        return x.Values.isCSSNullValue(l) && (l = 0), v.debug >= 2 && console.log("Get " + r + ": " + l), l
      },
      setPropertyValue: function (e, r, a, n, o) {
        var s = r;
        if ("scroll" === r) o.container ? o.container["scroll" + o.direction] = a : "Left" === o.direction ? t.scrollTo(a, o.alternateValue) : t.scrollTo(o.alternateValue, a); else if (x.Normalizations.registered[r] && "transform" === x.Normalizations.registered[r]("name", e)) x.Normalizations.registered[r]("inject", e, a), s = "transform", a = i(e).transformCache[r]; else {
          if (x.Hooks.registered[r]) {
            var l = r, u = x.Hooks.getRoot(r);
            n = n || x.getPropertyValue(e, u), a = x.Hooks.injectValue(l, a, n), r = u
          }
          if (x.Normalizations.registered[r] && (a = x.Normalizations.registered[r]("inject", e, a), r = x.Normalizations.registered[r]("name", e)), s = x.Names.prefixCheck(r)[0], 8 >= f) try {
            e.style[s] = a
          } catch (c) {
            v.debug && console.log("Browser does not support [" + a + "] for [" + s + "]")
          } else i(e) && i(e).isSVG && x.Names.SVGAttribute(r) ? e.setAttribute(r, a) : e.style[s] = a;
          v.debug >= 2 && console.log("Set " + r + " (" + s + "): " + a)
        }
        return [s, a]
      },
      flushTransformCache: function (e) {
        function t(t) {
          return parseFloat(x.getPropertyValue(e, t))
        }

        var r = "";
        if ((f || v.State.isAndroid && !v.State.isChrome) && i(e).isSVG) {
          var a = {
            translate: [t("translateX"), t("translateY")],
            skewX: [t("skewX")],
            skewY: [t("skewY")],
            scale: 1 !== t("scale") ? [t("scale"), t("scale")] : [t("scaleX"), t("scaleY")],
            rotate: [t("rotateZ"), 0, 0]
          };
          $.each(i(e).transformCache, function (e) {
            /^translate/i.test(e) ? e = "translate" : /^scale/i.test(e) ? e = "scale" : /^rotate/i.test(e) && (e = "rotate"), a[e] && (r += e + "(" + a[e].join(" ") + ") ", delete a[e])
          })
        } else {
          var n, o;
          $.each(i(e).transformCache, function (t) {
            return n = i(e).transformCache[t], "transformPerspective" === t ? (o = n, !0) : (9 === f && "rotateZ" === t && (t = "rotate"), void(r += t + n + " "))
          }), o && (r = "perspective" + o + " " + r)
        }
        x.setPropertyValue(e, "transform", r)
      }
    };
    x.Hooks.register(), x.Normalizations.register(), v.hook = function (e, t, r) {
      var n = a;
      return e = o(e), $.each(e, function (e, o) {
        if (i(o) === a && v.init(o), r === a) n === a && (n = v.CSS.getPropertyValue(o, t)); else {
          var s = v.CSS.setPropertyValue(o, t, r);
          "transform" === s[0] && v.CSS.flushTransformCache(o), n = s
        }
      }), n
    };
    var S = function () {
      function e() {
        return l ? T.promise || null : f
      }

      function n() {
        function e(e) {
          function p(e, t) {
            var r = a, i = a, s = a;
            return g.isArray(e) ? (r = e[0], !g.isArray(e[1]) && /^[\d-]/.test(e[1]) || g.isFunction(e[1]) || x.RegEx.isHex.test(e[1]) ? s = e[1] : (g.isString(e[1]) && !x.RegEx.isHex.test(e[1]) || g.isArray(e[1])) && (i = t ? e[1] : u(e[1], o.duration), e[2] !== a && (s = e[2]))) : r = e, t || (i = i || o.easing), g.isFunction(r) && (r = r.call(n, w, P)), g.isFunction(s) && (s = s.call(n, w, P)), [r || 0, i, s]
          }

          function f(e, t) {
            var r, a;
            return a = (t || "0").toString().toLowerCase().replace(/[%A-z]+$/, function (e) {
              return r = e, ""
            }), r || (r = x.Values.getUnitType(e)), [a, r]
          }

          function d() {
            var e = {
              myParent: n.parentNode || r.body,
              position: x.getPropertyValue(n, "position"),
              fontSize: x.getPropertyValue(n, "fontSize")
            }, a = e.position === N.lastPosition && e.myParent === N.lastParent, o = e.fontSize === N.lastFontSize;
            N.lastParent = e.myParent, N.lastPosition = e.position, N.lastFontSize = e.fontSize;
            var s = 100, l = {};
            if (o && a) l.emToPx = N.lastEmToPx, l.percentToPxWidth = N.lastPercentToPxWidth, l.percentToPxHeight = N.lastPercentToPxHeight; else {
              var u = i(n).isSVG ? r.createElementNS("http://www.w3.org/2000/svg", "rect") : r.createElement("div");
              v.init(u), e.myParent.appendChild(u), $.each(["overflow", "overflowX", "overflowY"], function (e, t) {
                v.CSS.setPropertyValue(u, t, "hidden")
              }), v.CSS.setPropertyValue(u, "position", e.position), v.CSS.setPropertyValue(u, "fontSize", e.fontSize), v.CSS.setPropertyValue(u, "boxSizing", "content-box"), $.each(["minWidth", "maxWidth", "width", "minHeight", "maxHeight", "height"], function (e, t) {
                v.CSS.setPropertyValue(u, t, s + "%")
              }), v.CSS.setPropertyValue(u, "paddingLeft", s + "em"), l.percentToPxWidth = N.lastPercentToPxWidth = (parseFloat(x.getPropertyValue(u, "width", null, !0)) || 1) / s, l.percentToPxHeight = N.lastPercentToPxHeight = (parseFloat(x.getPropertyValue(u, "height", null, !0)) || 1) / s, l.emToPx = N.lastEmToPx = (parseFloat(x.getPropertyValue(u, "paddingLeft")) || 1) / s, e.myParent.removeChild(u)
            }
            return null === N.remToPx && (N.remToPx = parseFloat(x.getPropertyValue(r.body, "fontSize")) || 16), null === N.vwToPx && (N.vwToPx = parseFloat(t.innerWidth) / 100, N.vhToPx = parseFloat(t.innerHeight) / 100), l.remToPx = N.remToPx, l.vwToPx = N.vwToPx, l.vhToPx = N.vhToPx, v.debug >= 1 && console.log("Unit ratios: " + JSON.stringify(l), n), l
          }

          if (o.begin && 0 === w) try {
            o.begin.call(m, m)
          } catch (y) {
            setTimeout(function () {
              throw y
            }, 1)
          }
          if ("scroll" === k) {
            var S = /^x$/i.test(o.axis) ? "Left" : "Top", V = parseFloat(o.offset) || 0, C, A, F;
            o.container ? g.isWrapped(o.container) || g.isNode(o.container) ? (o.container = o.container[0] || o.container, C = o.container["scroll" + S], F = C + $(n).position()[S.toLowerCase()] + V) : o.container = null : (C = v.State.scrollAnchor[v.State["scrollProperty" + S]], A = v.State.scrollAnchor[v.State["scrollProperty" + ("Left" === S ? "Top" : "Left")]], F = $(n).offset()[S.toLowerCase()] + V), s = {
              scroll: {
                rootPropertyValue: !1,
                startValue: C,
                currentValue: C,
                endValue: F,
                unitType: "",
                easing: o.easing,
                scrollData: { container: o.container, direction: S, alternateValue: A }
              }, element: n
            }, v.debug && console.log("tweensContainer (scroll): ", s.scroll, n)
          } else if ("reverse" === k) {
            if (!i(n).tweensContainer) return void $.dequeue(n, o.queue);
            "none" === i(n).opts.display && (i(n).opts.display = "auto"), "hidden" === i(n).opts.visibility && (i(n).opts.visibility = "visible"), i(n).opts.loop = !1, i(n).opts.begin = null, i(n).opts.complete = null, b.easing || delete o.easing, b.duration || delete o.duration, o = $.extend({}, i(n).opts, o);
            var E = $.extend(!0, {}, i(n).tweensContainer);
            for (var j in E) if ("element" !== j) {
              var H = E[j].startValue;
              E[j].startValue = E[j].currentValue = E[j].endValue, E[j].endValue = H, g.isEmptyObject(b) || (E[j].easing = o.easing), v.debug && console.log("reverse tweensContainer (" + j + "): " + JSON.stringify(E[j]), n)
            }
            s = E
          } else if ("start" === k) {
            var E;
            i(n).tweensContainer && i(n).isAnimating === !0 && (E = i(n).tweensContainer), $.each(h, function (e, t) {
              if (RegExp("^" + x.Lists.colors.join("$|^") + "$").test(e)) {
                var r = p(t, !0), n = r[0], o = r[1], i = r[2];
                if (x.RegEx.isHex.test(n)) {
                  for (var s = ["Red", "Green", "Blue"], l = x.Values.hexToRgb(n), u = i ? x.Values.hexToRgb(i) : a, c = 0; c < s.length; c++) {
                    var f = [l[c]];
                    o && f.push(o), u !== a && f.push(u[c]), h[e + s[c]] = f
                  }
                  delete h[e]
                }
              }
            });
            for (var R in h) {
              var O = p(h[R]), z = O[0], q = O[1], M = O[2];
              R = x.Names.camelCase(R);
              var I = x.Hooks.getRoot(R), B = !1;
              if (i(n).isSVG || "tween" === I || x.Names.prefixCheck(I)[1] !== !1 || x.Normalizations.registered[I] !== a) {
                (o.display !== a && null !== o.display && "none" !== o.display || o.visibility !== a && "hidden" !== o.visibility) && /opacity|filter/.test(R) && !M && 0 !== z && (M = 0), o._cacheValues && E && E[R] ? (M === a && (M = E[R].endValue + E[R].unitType), B = i(n).rootPropertyValueCache[I]) : x.Hooks.registered[R] ? M === a ? (B = x.getPropertyValue(n, I), M = x.getPropertyValue(n, R, B)) : B = x.Hooks.templates[I][1] : M === a && (M = x.getPropertyValue(n, R));
                var W, G, D, X = !1;
                if (W = f(R, M), M = W[0], D = W[1], W = f(R, z), z = W[0].replace(/^([+-\/*])=/, function (e, t) {
                    return X = t, ""
                  }), G = W[1], M = parseFloat(M) || 0, z = parseFloat(z) || 0, "%" === G && (/^(fontSize|lineHeight)$/.test(R) ? (z /= 100, G = "em") : /^scale/.test(R) ? (z /= 100, G = "") : /(Red|Green|Blue)$/i.test(R) && (z = z / 100 * 255, G = "")), /[\/*]/.test(X)) G = D; else if (D !== G && 0 !== M) if (0 === z) G = D; else {
                  l = l || d();
                  var Y = /margin|padding|left|right|width|text|word|letter/i.test(R) || /X$/.test(R) || "x" === R ? "x" : "y";
                  switch (D) {
                    case"%":
                      M *= "x" === Y ? l.percentToPxWidth : l.percentToPxHeight;
                      break;
                    case"px":
                      break;
                    default:
                      M *= l[D + "ToPx"]
                  }
                  switch (G) {
                    case"%":
                      M *= 1 / ("x" === Y ? l.percentToPxWidth : l.percentToPxHeight);
                      break;
                    case"px":
                      break;
                    default:
                      M *= 1 / l[G + "ToPx"]
                  }
                }
                switch (X) {
                  case"+":
                    z = M + z;
                    break;
                  case"-":
                    z = M - z;
                    break;
                  case"*":
                    z = M * z;
                    break;
                  case"/":
                    z = M / z
                }
                s[R] = {
                  rootPropertyValue: B,
                  startValue: M,
                  currentValue: M,
                  endValue: z,
                  unitType: G,
                  easing: q
                }, v.debug && console.log("tweensContainer (" + R + "): " + JSON.stringify(s[R]), n)
              } else v.debug && console.log("Skipping [" + I + "] due to a lack of browser support.")
            }
            s.element = n
          }
          s.element && (x.Values.addClass(n, "velocity-animating"), L.push(s), "" === o.queue && (i(n).tweensContainer = s, i(n).opts = o), i(n).isAnimating = !0, w === P - 1 ? (v.State.calls.push([L, m, o, null, T.resolver]), v.State.isTicking === !1 && (v.State.isTicking = !0, c())) : w++)
        }

        var n = this, o = $.extend({}, v.defaults, b), s = {}, l;
        switch (i(n) === a && v.init(n), parseFloat(o.delay) && o.queue !== !1 && $.queue(n, o.queue, function (e) {
          v.velocityQueueEntryFlag = !0, i(n).delayTimer = { setTimeout: setTimeout(e, parseFloat(o.delay)), next: e }
        }), o.duration.toString().toLowerCase()) {
          case"fast":
            o.duration = 200;
            break;
          case"normal":
            o.duration = y;
            break;
          case"slow":
            o.duration = 600;
            break;
          default:
            o.duration = parseFloat(o.duration) || 1
        }
        v.mock !== !1 && (v.mock === !0 ? o.duration = o.delay = 1 : (o.duration *= parseFloat(v.mock) || 1, o.delay *= parseFloat(v.mock) || 1)), o.easing = u(o.easing, o.duration), o.begin && !g.isFunction(o.begin) && (o.begin = null), o.progress && !g.isFunction(o.progress) && (o.progress = null), o.complete && !g.isFunction(o.complete) && (o.complete = null), o.display !== a && null !== o.display && (o.display = o.display.toString().toLowerCase(), "auto" === o.display && (o.display = v.CSS.Values.getDisplayType(n))), o.visibility !== a && null !== o.visibility && (o.visibility = o.visibility.toString().toLowerCase()), o.mobileHA = o.mobileHA && v.State.isMobile && !v.State.isGingerbread, o.queue === !1 ? o.delay ? setTimeout(e, o.delay) : e() : $.queue(n, o.queue, function (t, r) {
          return r === !0 ? (T.promise && T.resolver(m), !0) : (v.velocityQueueEntryFlag = !0, void e(t))
        }), "" !== o.queue && "fx" !== o.queue || "inprogress" === $.queue(n)[0] || $.dequeue(n)
      }

      var s = arguments[0] && (arguments[0].p || $.isPlainObject(arguments[0].properties) && !arguments[0].properties.names || g.isString(arguments[0].properties)),
        l, f, d, m, h, b;
      if (g.isWrapped(this) ? (l = !1, d = 0, m = this, f = this) : (l = !0, d = 1, m = s ? arguments[0].elements || arguments[0].e : arguments[0]), m = o(m)) {
        s ? (h = arguments[0].properties || arguments[0].p, b = arguments[0].options || arguments[0].o) : (h = arguments[d], b = arguments[d + 1]);
        var P = m.length, w = 0;
        if (!/^(stop|finish)$/i.test(h) && !$.isPlainObject(b)) {
          var V = d + 1;
          b = {};
          for (var C = V; C < arguments.length; C++) g.isArray(arguments[C]) || !/^(fast|normal|slow)$/i.test(arguments[C]) && !/^\d/.test(arguments[C]) ? g.isString(arguments[C]) || g.isArray(arguments[C]) ? b.easing = arguments[C] : g.isFunction(arguments[C]) && (b.complete = arguments[C]) : b.duration = arguments[C]
        }
        var T = { promise: null, resolver: null, rejecter: null };
        l && v.Promise && (T.promise = new v.Promise(function (e, t) {
          T.resolver = e, T.rejecter = t
        }));
        var k;
        switch (h) {
          case"scroll":
            k = "scroll";
            break;
          case"reverse":
            k = "reverse";
            break;
          case"finish":
          case"stop":
            $.each(m, function (e, t) {
              i(t) && i(t).delayTimer && (clearTimeout(i(t).delayTimer.setTimeout), i(t).delayTimer.next && i(t).delayTimer.next(), delete i(t).delayTimer)
            });
            var A = [];
            return $.each(v.State.calls, function (e, t) {
              t && $.each(t[1], function (r, n) {
                var o = b === a ? "" : b;
                return o === !0 || t[2].queue === o || b === a && t[2].queue === !1 ? void $.each(m, function (r, a) {
                  a === n && ((b === !0 || g.isString(b)) && ($.each($.queue(a, g.isString(b) ? b : ""), function (e, t) {
                    g.isFunction(t) && t(null, !0)
                  }), $.queue(a, g.isString(b) ? b : "", [])), "stop" === h ? (i(a) && i(a).tweensContainer && o !== !1 && $.each(i(a).tweensContainer, function (e, t) {
                    t.endValue = t.currentValue
                  }), A.push(e)) : "finish" === h && (t[2].duration = 1))
                }) : !0
              })
            }), "stop" === h && ($.each(A, function (e, t) {
              p(t, !0)
            }), T.promise && T.resolver(m)), e();
          default:
            if (!$.isPlainObject(h) || g.isEmptyObject(h)) {
              if (g.isString(h) && v.Redirects[h]) {
                var F = $.extend({}, b), E = F.duration, j = F.delay || 0;
                return F.backwards === !0 && (m = $.extend(!0, [], m).reverse()), $.each(m, function (e, t) {
                  parseFloat(F.stagger) ? F.delay = j + parseFloat(F.stagger) * e : g.isFunction(F.stagger) && (F.delay = j + F.stagger.call(t, e, P)), F.drag && (F.duration = parseFloat(E) || (/^(callout|transition)/.test(h) ? 1e3 : y), F.duration = Math.max(F.duration * (F.backwards ? 1 - e / P : (e + 1) / P), .75 * F.duration, 200)), v.Redirects[h].call(t, t, F || {}, e, P, m, T.promise ? T : a)
                }), e()
              }
              var H = "Velocity: First argument (" + h + ") was not a property map, a known action, or a registered redirect. Aborting.";
              return T.promise ? T.rejecter(new Error(H)) : console.log(H), e()
            }
            k = "start"
        }
        var N = {
          lastParent: null,
          lastPosition: null,
          lastFontSize: null,
          lastPercentToPxWidth: null,
          lastPercentToPxHeight: null,
          lastEmToPx: null,
          remToPx: null,
          vwToPx: null,
          vhToPx: null
        }, L = [];
        $.each(m, function (e, t) {
          g.isNode(t) && n.call(t)
        });
        var F = $.extend({}, v.defaults, b), R;
        if (F.loop = parseInt(F.loop), R = 2 * F.loop - 1, F.loop) for (var O = 0; R > O; O++) {
          var z = { delay: F.delay, progress: F.progress };
          O === R - 1 && (z.display = F.display, z.visibility = F.visibility, z.complete = F.complete), S(m, "reverse", z)
        }
        return e()
      }
    };
    v = $.extend(S, v), v.animate = S;
    var P = t.requestAnimationFrame || d;
    return v.State.isMobile || r.hidden === a || r.addEventListener("visibilitychange", function () {
      r.hidden ? (P = function (e) {
        return setTimeout(function () {
          e(!0)
        }, 16)
      }, c()) : P = t.requestAnimationFrame || d
    }), e.Velocity = v, e !== t && (e.fn.velocity = S, e.fn.velocity.defaults = v.defaults), $.each(["Down", "Up"], function (e, t) {
      v.Redirects["slide" + t] = function (e, r, n, o, i, s) {
        var l = $.extend({}, r), u = l.begin, c = l.complete,
          p = { height: "", marginTop: "", marginBottom: "", paddingTop: "", paddingBottom: "" }, f = {};
        l.display === a && (l.display = "Down" === t ? "inline" === v.CSS.Values.getDisplayType(e) ? "inline-block" : "block" : "none"), l.begin = function () {
          u && u.call(i, i);
          for (var r in p) {
            f[r] = e.style[r];
            var a = v.CSS.getPropertyValue(e, r);
            p[r] = "Down" === t ? [a, 0] : [0, a]
          }
          f.overflow = e.style.overflow, e.style.overflow = "hidden"
        }, l.complete = function () {
          for (var t in f) e.style[t] = f[t];
          c && c.call(i, i), s && s.resolver(i)
        }, v(e, p, l)
      }
    }), $.each(["In", "Out"], function (e, t) {
      v.Redirects["fade" + t] = function (e, r, n, o, i, s) {
        var l = $.extend({}, r), u = { opacity: "In" === t ? 1 : 0 }, c = l.complete;
        l.complete = n !== o - 1 ? l.begin = null : function () {
          c && c.call(i, i), s && s.resolver(i)
        }, l.display === a && (l.display = "In" === t ? "auto" : "none"), v(this, u, l)
      }
    }), v
  }(window.jQuery || window.Zepto || window, window, document)
});

/* VelocityJS.org UI Pack (5.0.4). (C) 2014 Julian Shapiro. MIT @license: en.wikipedia.org/wiki/MIT_License. Portions copyright Daniel Eden, Christian Pucci. */
!function (t) {
  "function" == typeof require && "object" == typeof exports ? module.exports = t() : "function" == typeof define && define.amd ? define(["velocity"], t) : t()
}(function () {
  return function (t, a, e, r) {
    function n(t, a) {
      var e = [];
      return t && a ? ($.each([t, a], function (t, a) {
        var r = [];
        $.each(a, function (t, a) {
          for (; a.toString().length < 5;) a = "0" + a;
          r.push(a)
        }), e.push(r.join(""))
      }), parseFloat(e[0]) > parseFloat(e[1])) : !1
    }

    if (!t.Velocity || !t.Velocity.Utilities) return void(a.console && console.log("Velocity UI Pack: Velocity must be loaded first. Aborting."));
    var i = t.Velocity, $ = i.Utilities, s = i.version, o = { major: 1, minor: 1, patch: 0 };
    if (n(o, s)) {
      var l = "Velocity UI Pack: You need to update Velocity (jquery.velocity.js) to a newer version. Visit http://github.com/julianshapiro/velocity.";
      throw alert(l), new Error(l)
    }
    i.RegisterEffect = i.RegisterUI = function (t, a) {
      function e(t, a, e, r) {
        var n = 0, s;
        $.each(t.nodeType ? [t] : t, function (t, a) {
          r && (e += t * r), s = a.parentNode, $.each(["height", "paddingTop", "paddingBottom", "marginTop", "marginBottom"], function (t, e) {
            n += parseFloat(i.CSS.getPropertyValue(a, e))
          })
        }), i.animate(s, { height: ("In" === a ? "+" : "-") + "=" + n }, {
          queue: !1,
          easing: "ease-in-out",
          duration: e * ("In" === a ? .6 : 1)
        })
      }

      return i.Redirects[t] = function (n, s, o, l, c, u) {
        function f() {
          s.display !== r && "none" !== s.display || !/Out$/.test(t) || $.each(c.nodeType ? [c] : c, function (t, a) {
            i.CSS.setPropertyValue(a, "display", "none")
          }), s.complete && s.complete.call(c, c), u && u.resolver(c || n)
        }

        var p = o === l - 1;
        a.defaultDuration = "function" == typeof a.defaultDuration ? a.defaultDuration.call(c, c) : parseFloat(a.defaultDuration);
        for (var d = 0; d < a.calls.length; d++) {
          var g = a.calls[d], y = g[0], m = s.duration || a.defaultDuration || 1e3, X = g[1], Y = g[2] || {}, O = {};
          if (O.duration = m * (X || 1), O.queue = s.queue || "", O.easing = Y.easing || "ease", O.delay = parseFloat(Y.delay) || 0, O._cacheValues = Y._cacheValues || !0, 0 === d) {
            if (O.delay += parseFloat(s.delay) || 0, 0 === o && (O.begin = function () {
                s.begin && s.begin.call(c, c);
                var a = t.match(/(In|Out)$/);
                a && "In" === a[0] && y.opacity !== r && $.each(c.nodeType ? [c] : c, function (t, a) {
                  i.CSS.setPropertyValue(a, "opacity", 0)
                }), s.animateParentHeight && a && e(c, a[0], m + O.delay, s.stagger)
              }), null !== s.display) if (s.display !== r && "none" !== s.display) O.display = s.display; else if (/In$/.test(t)) {
              var v = i.CSS.Values.getDisplayType(n);
              O.display = "inline" === v ? "inline-block" : v
            }
            s.visibility && "hidden" !== s.visibility && (O.visibility = s.visibility)
          }
          d === a.calls.length - 1 && (O.complete = function () {
            if (a.reset) {
              for (var t in a.reset) {
                var e = a.reset[t];
                i.CSS.Hooks.registered[t] !== r || "string" != typeof e && "number" != typeof e || (a.reset[t] = [a.reset[t], a.reset[t]])
              }
              var s = { duration: 0, queue: !1 };
              p && (s.complete = f), i.animate(n, a.reset, s)
            } else p && f()
          }, "hidden" === s.visibility && (O.visibility = s.visibility)), i.animate(n, y, O)
        }
      }, i
    }, i.RegisterEffect.packagedEffects = {
      "callout.bounce": {
        defaultDuration: 550,
        calls: [[{ translateY: -30 }, .25], [{ translateY: 0 }, .125], [{ translateY: -15 }, .125], [{ translateY: 0 }, .25]]
      },
      "callout.shake": {
        defaultDuration: 800,
        calls: [[{ translateX: -11 }, .125], [{ translateX: 11 }, .125], [{ translateX: -11 }, .125], [{ translateX: 11 }, .125], [{ translateX: -11 }, .125], [{ translateX: 11 }, .125], [{ translateX: -11 }, .125], [{ translateX: 0 }, .125]]
      },
      "callout.flash": {
        defaultDuration: 1100,
        calls: [[{ opacity: [0, "easeInOutQuad", 1] }, .25], [{ opacity: [1, "easeInOutQuad"] }, .25], [{ opacity: [0, "easeInOutQuad"] }, .25], [{ opacity: [1, "easeInOutQuad"] }, .25]]
      },
      "callout.pulse": {
        defaultDuration: 825,
        calls: [[{ scaleX: 1.1, scaleY: 1.1 }, .5, { easing: "easeInExpo" }], [{ scaleX: 1, scaleY: 1 }, .5]]
      },
      "callout.swing": {
        defaultDuration: 950,
        calls: [[{ rotateZ: 15 }, .2], [{ rotateZ: -10 }, .2], [{ rotateZ: 5 }, .2], [{ rotateZ: -5 }, .2], [{ rotateZ: 0 }, .2]]
      },
      "callout.tada": {
        defaultDuration: 1e3,
        calls: [[{ scaleX: .9, scaleY: .9, rotateZ: -3 }, .1], [{
          scaleX: 1.1,
          scaleY: 1.1,
          rotateZ: 3
        }, .1], [{
          scaleX: 1.1,
          scaleY: 1.1,
          rotateZ: -3
        }, .1], ["reverse", .125], ["reverse", .125], ["reverse", .125], ["reverse", .125], ["reverse", .125], [{
          scaleX: 1,
          scaleY: 1,
          rotateZ: 0
        }, .2]]
      },
      "transition.fadeIn": { defaultDuration: 500, calls: [[{ opacity: [1, 0] }]] },
      "transition.fadeOut": { defaultDuration: 500, calls: [[{ opacity: [0, 1] }]] },
      "transition.flipXIn": {
        defaultDuration: 700,
        calls: [[{ opacity: [1, 0], transformPerspective: [800, 800], rotateY: [0, -55] }]],
        reset: { transformPerspective: 0 }
      },
      "transition.flipXOut": {
        defaultDuration: 700,
        calls: [[{ opacity: [0, 1], transformPerspective: [800, 800], rotateY: 55 }]],
        reset: { transformPerspective: 0, rotateY: 0 }
      },
      "transition.flipYIn": {
        defaultDuration: 800,
        calls: [[{ opacity: [1, 0], transformPerspective: [800, 800], rotateX: [0, -45] }]],
        reset: { transformPerspective: 0 }
      },
      "transition.flipYOut": {
        defaultDuration: 800,
        calls: [[{ opacity: [0, 1], transformPerspective: [800, 800], rotateX: 25 }]],
        reset: { transformPerspective: 0, rotateX: 0 }
      },
      "transition.flipBounceXIn": {
        defaultDuration: 900,
        calls: [[{ opacity: [.725, 0], transformPerspective: [400, 400], rotateY: [-10, 90] }, .5], [{
          opacity: .8,
          rotateY: 10
        }, .25], [{ opacity: 1, rotateY: 0 }, .25]],
        reset: { transformPerspective: 0 }
      },
      "transition.flipBounceXOut": {
        defaultDuration: 800,
        calls: [[{ opacity: [.9, 1], transformPerspective: [400, 400], rotateY: -10 }, .5], [{
          opacity: 0,
          rotateY: 90
        }, .5]],
        reset: { transformPerspective: 0, rotateY: 0 }
      },
      "transition.flipBounceYIn": {
        defaultDuration: 850,
        calls: [[{ opacity: [.725, 0], transformPerspective: [400, 400], rotateX: [-10, 90] }, .5], [{
          opacity: .8,
          rotateX: 10
        }, .25], [{ opacity: 1, rotateX: 0 }, .25]],
        reset: { transformPerspective: 0 }
      },
      "transition.flipBounceYOut": {
        defaultDuration: 800,
        calls: [[{ opacity: [.9, 1], transformPerspective: [400, 400], rotateX: -15 }, .5], [{
          opacity: 0,
          rotateX: 90
        }, .5]],
        reset: { transformPerspective: 0, rotateX: 0 }
      },
      "transition.swoopIn": {
        defaultDuration: 850,
        calls: [[{
          opacity: [1, 0],
          transformOriginX: ["100%", "50%"],
          transformOriginY: ["100%", "100%"],
          scaleX: [1, 0],
          scaleY: [1, 0],
          translateX: [0, -700],
          translateZ: 0
        }]],
        reset: { transformOriginX: "50%", transformOriginY: "50%" }
      },
      "transition.swoopOut": {
        defaultDuration: 850,
        calls: [[{
          opacity: [0, 1],
          transformOriginX: ["50%", "100%"],
          transformOriginY: ["100%", "100%"],
          scaleX: 0,
          scaleY: 0,
          translateX: -700,
          translateZ: 0
        }]],
        reset: { transformOriginX: "50%", transformOriginY: "50%", scaleX: 1, scaleY: 1, translateX: 0 }
      },
      "transition.whirlIn": {
        defaultDuration: 850,
        calls: [[{
          opacity: [1, 0],
          transformOriginX: ["50%", "50%"],
          transformOriginY: ["50%", "50%"],
          scaleX: [1, 0],
          scaleY: [1, 0],
          rotateY: [0, 160]
        }, 1, { easing: "easeInOutSine" }]]
      },
      "transition.whirlOut": {
        defaultDuration: 750,
        calls: [[{
          opacity: [0, "easeInOutQuint", 1],
          transformOriginX: ["50%", "50%"],
          transformOriginY: ["50%", "50%"],
          scaleX: 0,
          scaleY: 0,
          rotateY: 160
        }, 1, { easing: "swing" }]],
        reset: { scaleX: 1, scaleY: 1, rotateY: 0 }
      },
      "transition.shrinkIn": {
        defaultDuration: 750,
        calls: [[{
          opacity: [1, 0],
          transformOriginX: ["50%", "50%"],
          transformOriginY: ["50%", "50%"],
          scaleX: [1, 1.5],
          scaleY: [1, 1.5],
          translateZ: 0
        }]]
      },
      "transition.shrinkOut": {
        defaultDuration: 600,
        calls: [[{
          opacity: [0, 1],
          transformOriginX: ["50%", "50%"],
          transformOriginY: ["50%", "50%"],
          scaleX: 1.3,
          scaleY: 1.3,
          translateZ: 0
        }]],
        reset: { scaleX: 1, scaleY: 1 }
      },
      "transition.expandIn": {
        defaultDuration: 700,
        calls: [[{
          opacity: [1, 0],
          transformOriginX: ["50%", "50%"],
          transformOriginY: ["50%", "50%"],
          scaleX: [1, .625],
          scaleY: [1, .625],
          translateZ: 0
        }]]
      },
      "transition.expandOut": {
        defaultDuration: 700,
        calls: [[{
          opacity: [0, 1],
          transformOriginX: ["50%", "50%"],
          transformOriginY: ["50%", "50%"],
          scaleX: .5,
          scaleY: .5,
          translateZ: 0
        }]],
        reset: { scaleX: 1, scaleY: 1 }
      },
      "transition.bounceIn": {
        defaultDuration: 800,
        calls: [[{ opacity: [1, 0], scaleX: [1.05, .3], scaleY: [1.05, .3] }, .4], [{
          scaleX: .9,
          scaleY: .9,
          translateZ: 0
        }, .2], [{ scaleX: 1, scaleY: 1 }, .5]]
      },
      "transition.bounceOut": {
        defaultDuration: 800,
        calls: [[{ scaleX: .95, scaleY: .95 }, .35], [{
          scaleX: 1.1,
          scaleY: 1.1,
          translateZ: 0
        }, .35], [{ opacity: [0, 1], scaleX: .3, scaleY: .3 }, .3]],
        reset: { scaleX: 1, scaleY: 1 }
      },
      "transition.bounceUpIn": {
        defaultDuration: 800,
        calls: [[{
          opacity: [1, 0],
          translateY: [-30, 1e3]
        }, .6, { easing: "easeOutCirc" }], [{ translateY: 10 }, .2], [{ translateY: 0 }, .2]]
      },
      "transition.bounceUpOut": {
        defaultDuration: 1e3,
        calls: [[{ translateY: 20 }, .2], [{ opacity: [0, "easeInCirc", 1], translateY: -1e3 }, .8]],
        reset: { translateY: 0 }
      },
      "transition.bounceDownIn": {
        defaultDuration: 800,
        calls: [[{
          opacity: [1, 0],
          translateY: [30, -1e3]
        }, .6, { easing: "easeOutCirc" }], [{ translateY: -10 }, .2], [{ translateY: 0 }, .2]]
      },
      "transition.bounceDownOut": {
        defaultDuration: 1e3,
        calls: [[{ translateY: -20 }, .2], [{ opacity: [0, "easeInCirc", 1], translateY: 1e3 }, .8]],
        reset: { translateY: 0 }
      },
      "transition.bounceLeftIn": {
        defaultDuration: 750,
        calls: [[{
          opacity: [1, 0],
          translateX: [30, -1250]
        }, .6, { easing: "easeOutCirc" }], [{ translateX: -10 }, .2], [{ translateX: 0 }, .2]]
      },
      "transition.bounceLeftOut": {
        defaultDuration: 750,
        calls: [[{ translateX: 30 }, .2], [{ opacity: [0, "easeInCirc", 1], translateX: -1250 }, .8]],
        reset: { translateX: 0 }
      },
      "transition.bounceRightIn": {
        defaultDuration: 750,
        calls: [[{
          opacity: [1, 0],
          translateX: [-30, 1250]
        }, .6, { easing: "easeOutCirc" }], [{ translateX: 10 }, .2], [{ translateX: 0 }, .2]]
      },
      "transition.bounceRightOut": {
        defaultDuration: 750,
        calls: [[{ translateX: -30 }, .2], [{ opacity: [0, "easeInCirc", 1], translateX: 1250 }, .8]],
        reset: { translateX: 0 }
      },
      "transition.slideUpIn": {
        defaultDuration: 900,
        calls: [[{ opacity: [1, 0], translateY: [0, 20], translateZ: 0 }]]
      },
      "transition.slideUpOut": {
        defaultDuration: 900,
        calls: [[{ opacity: [0, 1], translateY: -20, translateZ: 0 }]],
        reset: { translateY: 0 }
      },
      "transition.slideDownIn": {
        defaultDuration: 900,
        calls: [[{ opacity: [1, 0], translateY: [0, -20], translateZ: 0 }]]
      },
      "transition.slideDownOut": {
        defaultDuration: 900,
        calls: [[{ opacity: [0, 1], translateY: 20, translateZ: 0 }]],
        reset: { translateY: 0 }
      },
      "transition.slideLeftIn": {
        defaultDuration: 1e3,
        calls: [[{ opacity: [1, 0], translateX: [0, -20], translateZ: 0 }]]
      },
      "transition.slideLeftOut": {
        defaultDuration: 1050,
        calls: [[{ opacity: [0, 1], translateX: -20, translateZ: 0 }]],
        reset: { translateX: 0 }
      },
      "transition.slideRightIn": {
        defaultDuration: 1e3,
        calls: [[{ opacity: [1, 0], translateX: [0, 20], translateZ: 0 }]]
      },
      "transition.slideRightOut": {
        defaultDuration: 1050,
        calls: [[{ opacity: [0, 1], translateX: 20, translateZ: 0 }]],
        reset: { translateX: 0 }
      },
      "transition.slideUpBigIn": {
        defaultDuration: 850,
        calls: [[{ opacity: [1, 0], translateY: [0, 75], translateZ: 0 }]]
      },
      "transition.slideUpBigOut": {
        defaultDuration: 800,
        calls: [[{ opacity: [0, 1], translateY: -75, translateZ: 0 }]],
        reset: { translateY: 0 }
      },
      "transition.slideDownBigIn": {
        defaultDuration: 850,
        calls: [[{ opacity: [1, 0], translateY: [0, -75], translateZ: 0 }]]
      },
      "transition.slideDownBigOut": {
        defaultDuration: 800,
        calls: [[{ opacity: [0, 1], translateY: 75, translateZ: 0 }]],
        reset: { translateY: 0 }
      },
      "transition.slideLeftBigIn": {
        defaultDuration: 800,
        calls: [[{ opacity: [1, 0], translateX: [0, -75], translateZ: 0 }]]
      },
      "transition.slideLeftBigOut": {
        defaultDuration: 750,
        calls: [[{ opacity: [0, 1], translateX: -75, translateZ: 0 }]],
        reset: { translateX: 0 }
      },
      "transition.slideRightBigIn": {
        defaultDuration: 800,
        calls: [[{ opacity: [1, 0], translateX: [0, 75], translateZ: 0 }]]
      },
      "transition.slideRightBigOut": {
        defaultDuration: 750,
        calls: [[{ opacity: [0, 1], translateX: 75, translateZ: 0 }]],
        reset: { translateX: 0 }
      },
      "transition.perspectiveUpIn": {
        defaultDuration: 800,
        calls: [[{
          opacity: [1, 0],
          transformPerspective: [800, 800],
          transformOriginX: [0, 0],
          transformOriginY: ["100%", "100%"],
          rotateX: [0, -180]
        }]],
        reset: { transformPerspective: 0, transformOriginX: "50%", transformOriginY: "50%" }
      },
      "transition.perspectiveUpOut": {
        defaultDuration: 850,
        calls: [[{
          opacity: [0, 1],
          transformPerspective: [800, 800],
          transformOriginX: [0, 0],
          transformOriginY: ["100%", "100%"],
          rotateX: -180
        }]],
        reset: { transformPerspective: 0, transformOriginX: "50%", transformOriginY: "50%", rotateX: 0 }
      },
      "transition.perspectiveDownIn": {
        defaultDuration: 800,
        calls: [[{
          opacity: [1, 0],
          transformPerspective: [800, 800],
          transformOriginX: [0, 0],
          transformOriginY: [0, 0],
          rotateX: [0, 180]
        }]],
        reset: { transformPerspective: 0, transformOriginX: "50%", transformOriginY: "50%" }
      },
      "transition.perspectiveDownOut": {
        defaultDuration: 850,
        calls: [[{
          opacity: [0, 1],
          transformPerspective: [800, 800],
          transformOriginX: [0, 0],
          transformOriginY: [0, 0],
          rotateX: 180
        }]],
        reset: { transformPerspective: 0, transformOriginX: "50%", transformOriginY: "50%", rotateX: 0 }
      },
      "transition.perspectiveLeftIn": {
        defaultDuration: 950,
        calls: [[{
          opacity: [1, 0],
          transformPerspective: [2e3, 2e3],
          transformOriginX: [0, 0],
          transformOriginY: [0, 0],
          rotateY: [0, -180]
        }]],
        reset: { transformPerspective: 0, transformOriginX: "50%", transformOriginY: "50%" }
      },
      "transition.perspectiveLeftOut": {
        defaultDuration: 950,
        calls: [[{
          opacity: [0, 1],
          transformPerspective: [2e3, 2e3],
          transformOriginX: [0, 0],
          transformOriginY: [0, 0],
          rotateY: -180
        }]],
        reset: { transformPerspective: 0, transformOriginX: "50%", transformOriginY: "50%", rotateY: 0 }
      },
      "transition.perspectiveRightIn": {
        defaultDuration: 950,
        calls: [[{
          opacity: [1, 0],
          transformPerspective: [2e3, 2e3],
          transformOriginX: ["100%", "100%"],
          transformOriginY: [0, 0],
          rotateY: [0, 180]
        }]],
        reset: { transformPerspective: 0, transformOriginX: "50%", transformOriginY: "50%" }
      },
      "transition.perspectiveRightOut": {
        defaultDuration: 950,
        calls: [[{
          opacity: [0, 1],
          transformPerspective: [2e3, 2e3],
          transformOriginX: ["100%", "100%"],
          transformOriginY: [0, 0],
          rotateY: 180
        }]],
        reset: { transformPerspective: 0, transformOriginX: "50%", transformOriginY: "50%", rotateY: 0 }
      }
    };
    for (var c in i.RegisterEffect.packagedEffects) i.RegisterEffect(c, i.RegisterEffect.packagedEffects[c]);
    i.RunSequence = function (t) {
      var a = $.extend(!0, [], t);
      a.length > 1 && ($.each(a.reverse(), function (t, e) {
        var r = a[t + 1];
        if (r) {
          var n = e.o || e.options, s = r.o || r.options, o = n && n.sequenceQueue === !1 ? "begin" : "complete",
            l = s && s[o], c = {};
          c[o] = function () {
            var t = r.e || r.elements, a = t.nodeType ? [t] : t;
            l && l.call(a, a), i(e)
          }, r.o ? r.o = $.extend({}, s, c) : r.options = $.extend({}, s, c)
        }
      }), a.reverse()), i(a[0])
    }
  }(window.jQuery || window.Zepto || window, window, document)
});

/*jquery.mb.YTPlayer 30-05-2015
 _ jquery.mb.components
 _ email: matteo@open-lab.com
 _ Copyright (c) 2001-2015. Matteo Bicocchi (Pupunzi);
 _ blog: http://pupunzi.open-lab.com
 _ Open Lab s.r.l., Florence - Italy
 */
function onYouTubeIframeAPIReady() {
  ytp.YTAPIReady || (ytp.YTAPIReady = !0, jQuery(document).trigger("YTAPIReady"))
}

var ytp = ytp || {};
!function (jQuery, ytp) {
  var getYTPVideoID = function (a) {
    var b, c;
    return a.indexOf("youtu.be") > 0 ? (b = a.substr(a.lastIndexOf("/") + 1, a.length), c = b.indexOf("?list=") > 0 ? b.substr(b.lastIndexOf("="), b.length) : null, b = c ? b.substr(0, b.lastIndexOf("?")) : b) : a.indexOf("http") > -1 ? (b = a.match(/[\\?&]v=([^&#]*)/)[1], c = a.indexOf("list=") > 0 ? a.match(/[\\?&]list=([^&#]*)/)[1] : null) : (b = a.length > 15 ? null : a, c = b ? null : a), {
      videoID: b,
      playlistID: c
    }
  };
  jQuery.mbYTPlayer = {
    name: "jquery.mb.YTPlayer",
    version: "2.9.3",
    author: "Matteo Bicocchi",
    apiKey: "",
    defaults: {
      containment: "body",
      ratio: "auto",
      videoURL: null,
      playlistURL: null,
      startAt: 0,
      stopAt: 0,
      autoPlay: !0,
      vol: 50,
      addRaster: !1,
      opacity: 1,
      quality: "default",
      mute: !1,
      loop: !0,
      showControls: !0,
      showAnnotations: !1,
      showYTLogo: !0,
      stopMovieOnBlur: !0,
      realfullscreen: !0,
      gaTrack: !0,
      optimizeDisplay: !0,
      onReady: function (a) {
      }
    },
    controls: { play: "P", pause: "p", mute: "M", unmute: "A", onlyYT: "O", showSite: "R", ytLogo: "Y" },
    locationProtocol: "https:",
    buildPlayer: function (options) {
      return this.each(function () {
        var YTPlayer = this, $YTPlayer = jQuery(YTPlayer);
        YTPlayer.loop = 0, YTPlayer.opt = {}, YTPlayer.state = {}, YTPlayer.filtersEnabled = !0, YTPlayer.filters = {
          grayscale: {
            value: 0,
            unit: "%"
          },
          hue_rotate: { value: 0, unit: "deg" },
          invert: { value: 0, unit: "%" },
          opacity: { value: 0, unit: "%" },
          saturate: { value: 0, unit: "%" },
          sepia: { value: 0, unit: "%" },
          brightness: { value: 0, unit: "%" },
          contrast: { value: 0, unit: "%" },
          blur: { value: 0, unit: "px" }
        }, $YTPlayer.addClass("mb_YTPlayer");
        var property = $YTPlayer.data("property") && "string" == typeof $YTPlayer.data("property") ? eval("(" + $YTPlayer.data("property") + ")") : $YTPlayer.data("property");
        "undefined" != typeof property && "undefined" != typeof property.vol && (property.vol = 0 === property.vol ? property.vol = 1 : property.vol), jQuery.extend(YTPlayer.opt, jQuery.mbYTPlayer.defaults, options, property), YTPlayer.hasChanged || (YTPlayer.defaultOpt = {}, jQuery.extend(YTPlayer.defaultOpt, jQuery.mbYTPlayer.defaults, options, property)), YTPlayer.isRetina = window.retina || window.devicePixelRatio > 1;
        var isIframe = function () {
          var a = !1;
          try {
            self.location.href != top.location.href && (a = !0)
          } catch (b) {
            a = !0
          }
          return a
        };
        YTPlayer.canGoFullScreen = !(jQuery.browser.msie || jQuery.browser.opera || isIframe()), YTPlayer.canGoFullScreen || (YTPlayer.opt.realfullscreen = !1), $YTPlayer.attr("id") || $YTPlayer.attr("id", "video_" + (new Date).getTime());
        var playerID = "mbYTP_" + YTPlayer.id;
        YTPlayer.isAlone = !1, YTPlayer.hasFocus = !0;
        var videoID = this.opt.videoURL ? getYTPVideoID(this.opt.videoURL).videoID : $YTPlayer.attr("href") ? getYTPVideoID($YTPlayer.attr("href")).videoID : !1,
          playlistID = this.opt.videoURL ? getYTPVideoID(this.opt.videoURL).playlistID : $YTPlayer.attr("href") ? getYTPVideoID($YTPlayer.attr("href")).playlistID : !1;
        YTPlayer.videoID = videoID, YTPlayer.playlistID = playlistID, YTPlayer.opt.showAnnotations = YTPlayer.opt.showAnnotations ? "0" : "3";
        var playerVars = {
          autoplay: 0,
          modestbranding: 1,
          controls: 0,
          showinfo: 0,
          rel: 0,
          enablejsapi: 1,
          version: 3,
          playerapiid: playerID,
          origin: "*",
          allowfullscreen: !0,
          wmode: "transparent",
          iv_load_policy: YTPlayer.opt.showAnnotations
        };
        document.createElement("video").canPlayType && jQuery.extend(playerVars, { html5: 1 }), jQuery.browser.msie && jQuery.browser.version < 9 && (this.opt.opacity = 1);
        var playerBox = jQuery("<div/>").attr("id", playerID).addClass("playerBox"), overlay = jQuery("<div/>").css({
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%"
        }).addClass("YTPOverlay");
        if (YTPlayer.isSelf = "self" == YTPlayer.opt.containment, YTPlayer.defaultOpt.containment = YTPlayer.opt.containment = jQuery("self" == YTPlayer.opt.containment ? this : YTPlayer.opt.containment), YTPlayer.isBackground = "body" == YTPlayer.opt.containment.get(0).tagName.toLowerCase(), !YTPlayer.isBackground || !ytp.backgroundIsInited) {
          var isPlayer = YTPlayer.opt.containment.is(jQuery(this));
          if (YTPlayer.canPlayOnMobile = isPlayer && 0 === jQuery(this).children().length, isPlayer ? YTPlayer.isPlayer = !0 : $YTPlayer.hide(), jQuery.browser.mobile && !YTPlayer.canPlayOnMobile) return void $YTPlayer.remove();
          var wrapper = jQuery("<div/>").addClass("mbYTP_wrapper").attr("id", "wrapper_" + playerID);
          if (wrapper.css({
              position: "absolute",
              zIndex: 0,
              minWidth: "100%",
              minHeight: "100%",
              left: 0,
              top: 0,
              overflow: "hidden",
              opacity: 0
            }), playerBox.css({
              position: "absolute",
              zIndex: 0,
              width: "100%",
              height: "100%",
              top: 0,
              left: 0,
              overflow: "hidden"
            }), wrapper.append(playerBox), YTPlayer.opt.containment.children().not("script, style").each(function () {
              "static" == jQuery(this).css("position") && jQuery(this).css("position", "relative")
            }), YTPlayer.isBackground ? (jQuery("body").css({ boxSizing: "border-box" }), wrapper.css({
              position: "fixed",
              top: 0,
              left: 0,
              zIndex: 0
            }), $YTPlayer.hide()) : "static" == YTPlayer.opt.containment.css("position") && YTPlayer.opt.containment.css({ position: "relative" }), YTPlayer.opt.containment.prepend(wrapper), YTPlayer.wrapper = wrapper, playerBox.css({ opacity: 1 }), jQuery.browser.mobile || (playerBox.after(overlay), YTPlayer.overlay = overlay), YTPlayer.isBackground || overlay.on("mouseenter", function () {
              YTPlayer.controlBar && YTPlayer.controlBar.addClass("visible")
            }).on("mouseleave", function () {
              YTPlayer.controlBar && YTPlayer.controlBar.removeClass("visible")
            }), ytp.YTAPIReady) setTimeout(function () {
            jQuery(document).trigger("YTAPIReady")
          }, 100); else {
            jQuery("#YTAPI").remove();
            var tag = jQuery("<script></script>").attr({
              src: jQuery.mbYTPlayer.locationProtocol + "//www.youtube.com/iframe_api?v=" + jQuery.mbYTPlayer.version,
              id: "YTAPI"
            });
            jQuery("head").prepend(tag)
          }
          jQuery(document).on("YTAPIReady", function () {
            YTPlayer.isBackground && ytp.backgroundIsInited || YTPlayer.isInit || (YTPlayer.isBackground && (ytp.backgroundIsInited = !0), YTPlayer.opt.autoPlay = "undefined" == typeof YTPlayer.opt.autoPlay ? YTPlayer.isBackground ? !0 : !1 : YTPlayer.opt.autoPlay, YTPlayer.opt.vol = YTPlayer.opt.vol ? YTPlayer.opt.vol : 100, jQuery.mbYTPlayer.getDataFromAPI(YTPlayer), jQuery(YTPlayer).on("YTPChanged", function () {
              if (!YTPlayer.isInit) {
                if (YTPlayer.isInit = !0, jQuery.browser.mobile && YTPlayer.canPlayOnMobile) {
                  if (YTPlayer.opt.containment.outerWidth() > jQuery(window).width()) {
                    YTPlayer.opt.containment.css({ maxWidth: "100%" });
                    var h = .6 * YTPlayer.opt.containment.outerWidth();
                    YTPlayer.opt.containment.css({ maxHeight: h })
                  }
                  return void new YT.Player(playerID, {
                    videoId: YTPlayer.videoID.toString(),
                    height: "100%",
                    width: "100%",
                    events: {
                      onReady: function (a) {
                        YTPlayer.player = a.target, playerBox.css({ opacity: 1 }), YTPlayer.wrapper.css({ opacity: 1 })
                      }
                    }
                  })
                }
                new YT.Player(playerID, {
                  videoId: YTPlayer.videoID.toString(),
                  playerVars: playerVars,
                  events: {
                    onReady: function (a) {
                      if (YTPlayer.player = a.target, !YTPlayer.isReady) {
                        YTPlayer.isReady = YTPlayer.isPlayer && !YTPlayer.opt.autoPlay ? !1 : !0, YTPlayer.playerEl = YTPlayer.player.getIframe(), $YTPlayer.optimizeDisplay(), YTPlayer.videoID = videoID, jQuery(window).on("resize.YTP", function () {
                          $YTPlayer.optimizeDisplay()
                        }), jQuery.mbYTPlayer.checkForState(YTPlayer);
                        var b = jQuery.Event("YTPUnstarted");
                        b.time = YTPlayer.player.time, YTPlayer.canTrigger && jQuery(YTPlayer).trigger(b)
                      }
                    }, onStateChange: function (event) {
                      if ("function" == typeof event.target.getPlayerState) {
                        var state = event.target.getPlayerState();
                        if (YTPlayer.state != state) {
                          YTPlayer.state = state;
                          var eventType;
                          switch (state) {
                            case-1:
                              eventType = "YTPUnstarted";
                              break;
                            case 0:
                              eventType = "YTPEnd";
                              break;
                            case 1:
                              eventType = "YTPStart", YTPlayer.controlBar && YTPlayer.controlBar.find(".mb_YTPPlaypause").html(jQuery.mbYTPlayer.controls.pause), "undefined" != typeof _gaq && eval(YTPlayer.opt.gaTrack) && _gaq.push(["_trackEvent", "YTPlayer", "Play", YTPlayer.hasData ? YTPlayer.videoData.title : YTPlayer.videoID.toString()]), "undefined" != typeof ga && eval(YTPlayer.opt.gaTrack) && ga("send", "event", "YTPlayer", "play", YTPlayer.hasData ? YTPlayer.videoData.title : YTPlayer.videoID.toString());
                              break;
                            case 2:
                              eventType = "YTPPause", YTPlayer.controlBar && YTPlayer.controlBar.find(".mb_YTPPlaypause").html(jQuery.mbYTPlayer.controls.play);
                              break;
                            case 3:
                              YTPlayer.player.setPlaybackQuality(YTPlayer.opt.quality), eventType = "YTPBuffering", YTPlayer.controlBar && YTPlayer.controlBar.find(".mb_YTPPlaypause").html(jQuery.mbYTPlayer.controls.play);
                              break;
                            case 5:
                              eventType = "YTPCued"
                          }
                          var YTPEvent = jQuery.Event(eventType);
                          YTPEvent.time = YTPlayer.player.time, YTPlayer.canTrigger && jQuery(YTPlayer).trigger(YTPEvent)
                        }
                      }
                    }, onPlaybackQualityChange: function (a) {
                      var b = a.target.getPlaybackQuality(), c = jQuery.Event("YTPQualityChange");
                      c.quality = b, jQuery(YTPlayer).trigger(c)
                    }, onError: function (a) {
                      150 == a.data && (console.log("Embedding this video is restricted by Youtube."), YTPlayer.isPlayList && jQuery(YTPlayer).playNext()), 2 == a.data && YTPlayer.isPlayList && jQuery(YTPlayer).playNext(), "function" == typeof YTPlayer.opt.onError && YTPlayer.opt.onError($YTPlayer, a)
                    }
                  }
                })
              }
            }))
          })
        }
      })
    },
    getDataFromAPI: function (a) {
      if (a.videoData = jQuery.mbStorage.get("YYTPlayer_data_" + a.videoID), a.videoData) setTimeout(function () {
        a.opt.ratio = "auto" == a.opt.ratio ? "16/9" : a.opt.ratio, a.dataReceived = !0, jQuery(a).trigger("YTPChanged");
        var b = jQuery.Event("YTPData");
        b.prop = {};
        for (var c in a.videoData) b.prop[c] = a.videoData[c];
        jQuery(a).trigger(b)
      }, 500), a.hasData = !0; else if (jQuery.mbYTPlayer.apiKey) jQuery.getJSON("https://www.googleapis.com/youtube/v3/videos?id=" + a.videoID + "&key=" + jQuery.mbYTPlayer.apiKey + "&part=snippet", function (b) {
        function c(b) {
          a.videoData = {}, a.videoData.id = a.videoID, a.videoData.channelTitle = b.channelTitle, a.videoData.title = b.title, a.videoData.description = b.description.length < 400 ? b.description : b.description.substring(0, 400) + " ...", a.videoData.aspectratio = "auto" == a.opt.ratio ? "16/9" : a.opt.ratio, a.opt.ratio = a.videoData.aspectratio, a.videoData.thumb_max = b.thumbnails.maxres ? b.thumbnails.maxres.url : null, a.videoData.thumb_high = b.thumbnails.high ? b.thumbnails.high.url : null, a.videoData.thumb_medium = b.thumbnails.medium ? b.thumbnails.medium.url : null, jQuery.mbStorage.set("YYTPlayer_data_" + a.videoID, a.videoData)
        }

        a.dataReceived = !0, jQuery(a).trigger("YTPChanged"), c(b.items[0].snippet), a.hasData = !0;
        var d = jQuery.Event("YTPData");
        d.prop = {};
        for (var e in a.videoData) d.prop[e] = a.videoData[e];
        jQuery(a).trigger(d)
      }); else {
        if (setTimeout(function () {
            jQuery(a).trigger("YTPChanged")
          }, 50), a.isPlayer && !a.opt.autoPlay) {
          var b = "https://i.ytimg.com/vi/" + a.videoID + "/hqdefault.jpg";
          a.opt.containment.css({
            background: "rgba(0,0,0,0.5) url(" + b + ") center center",
            backgroundSize: "cover"
          }), a.opt.backgroundUrl = b
        }
        a.videoData = null, a.opt.ratio = "auto" == a.opt.ratio ? "16/9" : a.opt.ratio
      }
      jQuery(a).off("YTPData.YTPlayer").on("YTPData.YTPlayer", function () {
        if (!a.hasData && (a.hasData = !0, a.isPlayer && !a.opt.autoPlay)) {
          var b = a.videoData.thumb_max || a.videoData.thumb_high || a.videoData.thumb_medium;
          a.opt.containment.css({
            background: "rgba(0,0,0,0.5) url(" + b + ") center center",
            backgroundSize: "cover"
          }), a.opt.backgroundUrl = b
        }
      }), a.isPlayer && !a.opt.autoPlay && (a.loading = jQuery("<div/>").addClass("loading").html("Loading").hide(), jQuery(a).append(a.loading), a.loading.fadeIn())
    },
    removeStoredData: function () {
      jQuery.mbStorage.remove()
    },
    getVideoData: function () {
      var a = this.get(0);
      return a.videoData
    },
    getVideoID: function () {
      var a = this.get(0);
      return a.videoID || !1
    },
    setVideoQuality: function (a) {
      var b = this.get(0);
      jQuery.browser.chrome || b.player.setPlaybackQuality(a)
    },
    playlist: function (a, b, c) {
      var d = this, e = d.get(0);
      return e.isPlayList = !0, b && (a = jQuery.shuffle(a)), e.videoID || (e.videos = a, e.videoCounter = 0, e.videoLength = a.length, jQuery(e).data("property", a[0]), jQuery(e).mb_YTPlayer()), "function" == typeof c && jQuery(e).on("YTPChanged", function () {
        c(e)
      }), jQuery(e).on("YTPEnd", function () {
        jQuery(e).playNext()
      }), d
    },
    playNext: function () {
      var a = this.get(0);
      return a.videoCounter++, a.videoCounter >= a.videoLength && (a.videoCounter = 0), jQuery(a).changeMovie(a.videos[a.videoCounter]), this
    },
    playPrev: function () {
      var a = this.get(0);
      return a.videoCounter--, a.videoCounter < 0 && (a.videoCounter = a.videoLength - 1), jQuery(a).changeMovie(a.videos[a.videoCounter]), this
    },
    changeMovie: function (a) {
      var b = this.get(0);
      b.opt.startAt = 0, b.opt.stopAt = 0, b.opt.mute = !0, b.hasData = !1, b.hasChanged = !0, a && jQuery.extend(b.opt, b.defaultOpt, a), b.videoID = getYTPVideoID(b.opt.videoURL).videoID, jQuery(b.playerEl).CSSAnimate({ opacity: 0 }, 200, function () {
        return jQuery(b).YTPGetPlayer().cueVideoByUrl(encodeURI(jQuery.mbYTPlayer.locationProtocol + "//www.youtube.com/v/" + b.videoID), 1, b.opt.quality), jQuery.mbYTPlayer.checkForState(b), jQuery(b).optimizeDisplay(), jQuery.mbYTPlayer.getDataFromAPI(b), this
      })
    },
    getPlayer: function () {
      return jQuery(this).get(0).player
    },
    playerDestroy: function () {
      var a = this.get(0);
      ytp.YTAPIReady = !1, ytp.backgroundIsInited = !1, a.isInit = !1, a.videoID = null;
      var b = a.wrapper;
      return b.remove(), jQuery("#controlBar_" + a.id).remove(), clearInterval(a.checkForStartAt), clearInterval(a.getState), this
    },
    fullscreen: function (real) {
      function hideMouse() {
        YTPlayer.overlay.css({ cursor: "none" })
      }

      function RunPrefixMethod(a, b) {
        for (var c, d, e = ["webkit", "moz", "ms", "o", ""], f = 0; f < e.length && !a[c];) {
          if (c = b, "" == e[f] && (c = c.substr(0, 1).toLowerCase() + c.substr(1)), c = e[f] + c, d = typeof a[c], "undefined" != d) return e = [e[f]], "function" == d ? a[c]() : a[c];
          f++
        }
      }

      function launchFullscreen(a) {
        RunPrefixMethod(a, "RequestFullScreen")
      }

      function cancelFullscreen() {
        (RunPrefixMethod(document, "FullScreen") || RunPrefixMethod(document, "IsFullScreen")) && RunPrefixMethod(document, "CancelFullScreen")
      }

      var YTPlayer = this.get(0);
      "undefined" == typeof real && (real = YTPlayer.opt.realfullscreen), real = eval(real);
      var controls = jQuery("#controlBar_" + YTPlayer.id), fullScreenBtn = controls.find(".mb_OnlyYT"),
        videoWrapper = YTPlayer.isSelf ? YTPlayer.opt.containment : YTPlayer.wrapper;
      if (real) {
        var fullscreenchange = jQuery.browser.mozilla ? "mozfullscreenchange" : jQuery.browser.webkit ? "webkitfullscreenchange" : "fullscreenchange";
        jQuery(document).off(fullscreenchange).on(fullscreenchange, function () {
          var a = RunPrefixMethod(document, "IsFullScreen") || RunPrefixMethod(document, "FullScreen");
          a ? (jQuery(YTPlayer).YTPSetVideoQuality("default"), jQuery(YTPlayer).trigger("YTPFullScreenStart")) : (YTPlayer.isAlone = !1, fullScreenBtn.html(jQuery.mbYTPlayer.controls.onlyYT), jQuery(YTPlayer).YTPSetVideoQuality(YTPlayer.opt.quality), videoWrapper.removeClass("fullscreen"), videoWrapper.CSSAnimate({ opacity: YTPlayer.opt.opacity }, 500), videoWrapper.css({ zIndex: 0 }), YTPlayer.isBackground ? jQuery("body").after(controls) : YTPlayer.wrapper.before(controls), jQuery(window).resize(), jQuery(YTPlayer).trigger("YTPFullScreenEnd"))
        })
      }
      return YTPlayer.isAlone ? (jQuery(document).off("mousemove.YTPlayer"), YTPlayer.overlay.css({ cursor: "auto" }), real ? cancelFullscreen() : (videoWrapper.CSSAnimate({ opacity: YTPlayer.opt.opacity }, 500), videoWrapper.css({ zIndex: 0 })), fullScreenBtn.html(jQuery.mbYTPlayer.controls.onlyYT), YTPlayer.isAlone = !1) : (jQuery(document).on("mousemove.YTPlayer", function (a) {
        YTPlayer.overlay.css({ cursor: "auto" }), clearTimeout(YTPlayer.hideCursor), jQuery(a.target).parents().is(".mb_YTPBar") || (YTPlayer.hideCursor = setTimeout(hideMouse, 3e3))
      }), hideMouse(), real ? (videoWrapper.css({ opacity: 0 }), videoWrapper.addClass("fullscreen"), launchFullscreen(videoWrapper.get(0)), setTimeout(function () {
        videoWrapper.CSSAnimate({ opacity: 1 }, 1e3), YTPlayer.wrapper.append(controls), jQuery(YTPlayer).optimizeDisplay(), YTPlayer.player.seekTo(YTPlayer.player.getCurrentTime() + .1, !0)
      }, 500)) : videoWrapper.css({ zIndex: 1e4 }).CSSAnimate({ opacity: 1 }, 1e3), fullScreenBtn.html(jQuery.mbYTPlayer.controls.showSite), YTPlayer.isAlone = !0), this
    },
    toggleLoops: function () {
      var a = this.get(0), b = a.opt;
      return 1 == b.loop ? b.loop = 0 : (b.startAt ? a.player.seekTo(b.startAt) : a.player.playVideo(), b.loop = 1), this
    },
    play: function () {
      var a = this.get(0);
      if (a.isReady) {
        var b = jQuery("#controlBar_" + a.id), c = b.find(".mb_YTPPlaypause");
        return c.html(jQuery.mbYTPlayer.controls.pause), a.player.playVideo(), a.wrapper.CSSAnimate({ opacity: a.isAlone ? 1 : a.opt.opacity }, 2e3), jQuery(a.playerEl).CSSAnimate({ opacity: 1 }, 1e3), jQuery(a).css("background-image", "none"), this
      }
    },
    togglePlay: function (a) {
      var b = this.get(0);
      return 1 == b.state ? this.YTPPause() : this.YTPPlay(), "function" == typeof a && a(b.state), this
    },
    stop: function () {
      var a = this.get(0), b = jQuery("#controlBar_" + a.id), c = b.find(".mb_YTPPlaypause");
      return c.html(jQuery.mbYTPlayer.controls.play), a.player.stopVideo(), this
    },
    pause: function () {
      var a = this.get(0), b = jQuery("#controlBar_" + a.id), c = b.find(".mb_YTPPlaypause");
      return c.html(jQuery.mbYTPlayer.controls.play), a.player.pauseVideo(), this
    },
    seekTo: function (a) {
      var b = this.get(0);
      return b.player.seekTo(a, !0), this
    },
    setVolume: function (a) {
      var b = this.get(0);
      return a || b.opt.vol || 0 != b.player.getVolume() ? !a && b.player.getVolume() > 0 || a && b.opt.vol == a ? b.isMute ? jQuery(b).YTPUnmute() : jQuery(b).YTPMute() : (b.opt.vol = a, b.player.setVolume(b.opt.vol), b.volumeBar && b.volumeBar.length && b.volumeBar.updateSliderVal(a)) : jQuery(b).YTPUnmute(), this
    },
    mute: function () {
      var a = this.get(0);
      if (!a.isMute) {
        a.player.mute(), a.isMute = !0, a.player.setVolume(0), a.volumeBar && a.volumeBar.length && a.volumeBar.width() > 10 && a.volumeBar.updateSliderVal(0);
        var b = jQuery("#controlBar_" + a.id), c = b.find(".mb_YTPMuteUnmute");
        c.html(jQuery.mbYTPlayer.controls.unmute), jQuery(a).addClass("isMuted"), a.volumeBar && a.volumeBar.length && a.volumeBar.addClass("muted");
        var d = jQuery.Event("YTPMuted");
        return d.time = a.player.time, a.canTrigger && jQuery(a).trigger(d), this
      }
    },
    unmute: function () {
      var a = this.get(0);
      if (a.isMute) {
        a.player.unMute(), a.isMute = !1, a.player.setVolume(a.opt.vol), a.volumeBar && a.volumeBar.length && a.volumeBar.updateSliderVal(a.opt.vol > 10 ? a.opt.vol : 10);
        var b = jQuery("#controlBar_" + a.id), c = b.find(".mb_YTPMuteUnmute");
        c.html(jQuery.mbYTPlayer.controls.mute), jQuery(a).removeClass("isMuted"), a.volumeBar && a.volumeBar.length && a.volumeBar.removeClass("muted");
        var d = jQuery.Event("YTPUnmuted");
        return d.time = a.player.time, a.canTrigger && jQuery(a).trigger(d), this
      }
    },
    applyFilter: function (a, b) {
      var c = this.get(0);
      return c.filters[a].value = b, c.filtersEnabled && this.YTPEnableFilters(), this
    },
    applyFilters: function (a) {
      var b = this.get(0);
      return this.on("YTPReady", function () {
        for (var c in a) b.filters[c].value = a[c], jQuery(b).YTPApplyFilter(c, a[c]);
        jQuery(b).trigger("YTPFiltersApplied")
      }), this
    },
    toggleFilter: function (a, b) {
      return this.each(function () {
        var c = this;
        c.filters[a].value ? c.filters[a].value = 0 : c.filters[a].value = b, c.filtersEnabled && jQuery(this).YTPEnableFilters()
      })
    },
    toggleFilters: function (a) {
      return this.each(function () {
        var b = this;
        b.filtersEnabled ? (jQuery(b).trigger("YTPDisableFilters"), jQuery(b).YTPDisableFilters()) : (jQuery(b).YTPEnableFilters(), jQuery(b).trigger("YTPEnableFilters")), "function" == typeof a && a(b.filtersEnabled)
      })
    },
    disableFilters: function () {
      return this.each(function () {
        var a = this, b = jQuery(a.playerEl);
        b.css("-webkit-filter", ""), b.css("filter", ""), a.filtersEnabled = !1
      })
    },
    enableFilters: function () {
      return this.each(function () {
        var a = this, b = jQuery(a.playerEl), c = "";
        for (var d in a.filters) a.filters[d].value && (c += d.replace("_", "-") + "(" + a.filters[d].value + a.filters[d].unit + ") ");
        b.css("-webkit-filter", c), b.css("filter", c), a.filtersEnabled = !0
      })
    },
    removeFilter: function (a, b) {
      return this.each(function () {
        "function" == typeof a && (b = a, a = null);
        var c = this;
        if (a) jQuery(this).YTPApplyFilter(a, 0), "function" == typeof b && b(a); else for (var d in c.filters) jQuery(this).YTPApplyFilter(d, 0), "function" == typeof b && b(d)
      })
    },
    manageProgress: function () {
      var a = this.get(0), b = jQuery("#controlBar_" + a.id), c = b.find(".mb_YTPProgress"),
        d = b.find(".mb_YTPLoaded"), e = b.find(".mb_YTPseekbar"), f = c.outerWidth(),
        g = Math.floor(a.player.getCurrentTime()), h = Math.floor(a.player.getDuration()), i = g * f / h, j = 0,
        k = 100 * a.player.getVideoLoadedFraction();
      return d.css({ left: j, width: k + "%" }), e.css({ left: 0, width: i }), { totalTime: h, currentTime: g }
    },
    buildControls: function (YTPlayer) {
      var data = YTPlayer.opt;
      if (data.showYTLogo = data.showYTLogo || data.printUrl, !jQuery("#controlBar_" + YTPlayer.id).length) {
        YTPlayer.controlBar = jQuery("<span/>").attr("id", "controlBar_" + YTPlayer.id).addClass("mb_YTPBar").css({
          whiteSpace: "noWrap",
          position: YTPlayer.isBackground ? "fixed" : "absolute",
          zIndex: YTPlayer.isBackground ? 1e4 : 1e3
        }).hide();
        var buttonBar = jQuery("<div/>").addClass("buttonBar"),
          playpause = jQuery("<span>" + jQuery.mbYTPlayer.controls.play + "</span>").addClass("mb_YTPPlaypause ytpicon").click(function () {
            1 == YTPlayer.player.getPlayerState() ? jQuery(YTPlayer).YTPPause() : jQuery(YTPlayer).YTPPlay()
          }),
          MuteUnmute = jQuery("<span>" + jQuery.mbYTPlayer.controls.mute + "</span>").addClass("mb_YTPMuteUnmute ytpicon").click(function () {
            0 == YTPlayer.player.getVolume() ? jQuery(YTPlayer).YTPUnmute() : jQuery(YTPlayer).YTPMute()
          }), volumeBar = jQuery("<div/>").addClass("mb_YTPVolumeBar").css({ display: "inline-block" });
        YTPlayer.volumeBar = volumeBar;
        var idx = jQuery("<span/>").addClass("mb_YTPTime"), vURL = data.videoURL ? data.videoURL : "";
        vURL.indexOf("http") < 0 && (vURL = jQuery.mbYTPlayer.locationProtocol + "//www.youtube.com/watch?v=" + data.videoURL);
        var movieUrl = jQuery("<span/>").html(jQuery.mbYTPlayer.controls.ytLogo).addClass("mb_YTPUrl ytpicon").attr("title", "view on YouTube").on("click", function () {
            window.open(vURL, "viewOnYT")
          }),
          onlyVideo = jQuery("<span/>").html(jQuery.mbYTPlayer.controls.onlyYT).addClass("mb_OnlyYT ytpicon").on("click", function () {
            jQuery(YTPlayer).YTPFullscreen(data.realfullscreen)
          }), progressBar = jQuery("<div/>").addClass("mb_YTPProgress").css("position", "absolute").click(function (a) {
            timeBar.css({ width: a.clientX - timeBar.offset().left }), YTPlayer.timeW = a.clientX - timeBar.offset().left, YTPlayer.controlBar.find(".mb_YTPLoaded").css({ width: 0 });
            var b = Math.floor(YTPlayer.player.getDuration());
            YTPlayer["goto"] = timeBar.outerWidth() * b / progressBar.outerWidth(), YTPlayer.player.seekTo(parseFloat(YTPlayer["goto"]), !0), YTPlayer.controlBar.find(".mb_YTPLoaded").css({ width: 0 })
          }), loadedBar = jQuery("<div/>").addClass("mb_YTPLoaded").css("position", "absolute"),
          timeBar = jQuery("<div/>").addClass("mb_YTPseekbar").css("position", "absolute");
        progressBar.append(loadedBar).append(timeBar), buttonBar.append(playpause).append(MuteUnmute).append(volumeBar).append(idx), data.showYTLogo && buttonBar.append(movieUrl), (YTPlayer.isBackground || eval(YTPlayer.opt.realfullscreen) && !YTPlayer.isBackground) && buttonBar.append(onlyVideo), YTPlayer.controlBar.append(buttonBar).append(progressBar), YTPlayer.isBackground ? jQuery("body").after(YTPlayer.controlBar) : (YTPlayer.controlBar.addClass("inlinePlayer"), YTPlayer.wrapper.before(YTPlayer.controlBar)), volumeBar.simpleSlider({
          initialval: YTPlayer.opt.vol,
          scale: 100,
          orientation: "h",
          callback: function (a) {
            0 == a.value ? jQuery(YTPlayer).YTPMute() : jQuery(YTPlayer).YTPUnmute(), YTPlayer.player.setVolume(a.value), YTPlayer.isMute || (YTPlayer.opt.vol = a.value)
          }
        })
      }
    },
    checkForState: function (YTPlayer) {
      var interval = YTPlayer.opt.showControls ? 100 : 1e3;
      return clearInterval(YTPlayer.getState), jQuery.contains(document, YTPlayer) ? (jQuery.mbYTPlayer.checkForStart(YTPlayer), void(YTPlayer.getState = setInterval(function () {
        var prog = jQuery(YTPlayer).YTPManageProgress(), $YTPlayer = jQuery(YTPlayer), data = YTPlayer.opt,
          startAt = YTPlayer.opt.startAt ? YTPlayer.opt.startAt : 0,
          stopAt = YTPlayer.opt.stopAt > YTPlayer.opt.startAt ? YTPlayer.opt.stopAt : 0;
        if (stopAt = stopAt < YTPlayer.player.getDuration() ? stopAt : 0, YTPlayer.player.time != prog.currentTime) {
          var YTPEvent = jQuery.Event("YTPTime");
          YTPEvent.time = YTPlayer.player.time, jQuery(YTPlayer).trigger(YTPEvent)
        }
        if (YTPlayer.player.time = prog.currentTime, 0 == YTPlayer.player.getVolume() ? $YTPlayer.addClass("isMuted") : $YTPlayer.removeClass("isMuted"), YTPlayer.opt.showControls && (prog.totalTime ? YTPlayer.controlBar.find(".mb_YTPTime").html(jQuery.mbYTPlayer.formatTime(prog.currentTime) + " / " + jQuery.mbYTPlayer.formatTime(prog.totalTime)) : YTPlayer.controlBar.find(".mb_YTPTime").html("-- : -- / -- : --")), eval(YTPlayer.opt.stopMovieOnBlur) && (document.hasFocus() ? document.hasFocus() && !YTPlayer.hasFocus && -1 != YTPlayer.state && 0 != YTPlayer.state && (YTPlayer.hasFocus = !0, $YTPlayer.YTPPlay()) : 1 == YTPlayer.state && (YTPlayer.hasFocus = !1, $YTPlayer.YTPPause())), YTPlayer.controlBar && YTPlayer.controlBar.outerWidth() <= 400 && !YTPlayer.isCompact ? (YTPlayer.controlBar.addClass("compact"), YTPlayer.isCompact = !0, !YTPlayer.isMute && YTPlayer.volumeBar && YTPlayer.volumeBar.updateSliderVal(YTPlayer.opt.vol)) : YTPlayer.controlBar && YTPlayer.controlBar.outerWidth() > 400 && YTPlayer.isCompact && (YTPlayer.controlBar.removeClass("compact"), YTPlayer.isCompact = !1, !YTPlayer.isMute && YTPlayer.volumeBar && YTPlayer.volumeBar.updateSliderVal(YTPlayer.opt.vol)), 1 == YTPlayer.player.getPlayerState() && (parseFloat(YTPlayer.player.getDuration() - 3) < YTPlayer.player.getCurrentTime() || stopAt > 0 && parseFloat(YTPlayer.player.getCurrentTime()) > stopAt)) {
          if (YTPlayer.isEnded) return;
          if (YTPlayer.isEnded = !0, setTimeout(function () {
              YTPlayer.isEnded = !1
            }, 2e3), YTPlayer.isPlayList) {
            clearInterval(YTPlayer.getState);
            var YTPEnd = jQuery.Event("YTPEnd");
            return YTPEnd.time = YTPlayer.player.time, void jQuery(YTPlayer).trigger(YTPEnd)
          }
          data.loop ? YTPlayer.player.seekTo(startAt, !0) : (YTPlayer.player.pauseVideo(), YTPlayer.wrapper.CSSAnimate({ opacity: 0 }, 1e3, function () {
            var a = jQuery.Event("YTPEnd");
            a.time = YTPlayer.player.time, jQuery(YTPlayer).trigger(a), YTPlayer.player.seekTo(startAt, !0), YTPlayer.isBackground || YTPlayer.opt.containment.css({
              background: "rgba(0,0,0,0.5) url(" + YTPlayer.opt.backgroundUrl + ") center center",
              backgroundSize: "cover"
            })
          }))
        }
      }, interval))) : (jQuery(YTPlayer).YTPPlayerDestroy(), clearInterval(YTPlayer.getState), void clearInterval(YTPlayer.checkForStartAt))
    },
    checkForStart: function (a) {
      var b = jQuery(a);
      if (!jQuery.contains(document, a)) return void jQuery(a).YTPPlayerDestroy();
      if (jQuery.browser.chrome && (a.opt.quality = "default"), a.player.pauseVideo(), jQuery(a).muteYTPVolume(), jQuery("#controlBar_" + a.id).remove(), a.opt.showControls && jQuery.mbYTPlayer.buildControls(a), a.opt.addRaster) {
        var c = "dot" == a.opt.addRaster ? "raster-dot" : "raster";
        a.overlay.addClass(a.isRetina ? c + " retina" : c)
      } else a.overlay.removeClass(function (a, b) {
        var c = b.split(" "), d = [];
        return jQuery.each(c, function (a, b) {
          /raster.*/.test(b) && d.push(b)
        }), d.push("retina"), d.join(" ")
      });
      a.checkForStartAt = setInterval(function () {
        jQuery(a).YTPMute();
        var c = a.opt.startAt ? a.opt.startAt : 1, d = a.player.getVideoLoadedFraction() > c / a.player.getDuration();
        if (a.player.getDuration() > 0 && a.player.getCurrentTime() >= c && d) {
          clearInterval(a.checkForStartAt), a.isReady = !0, "function" == typeof a.opt.onReady && a.opt.onReady(a);
          var e = jQuery.Event("YTPReady");
          jQuery(a).trigger(e), a.player.pauseVideo(), a.opt.mute || jQuery(a).YTPUnmute(), a.canTrigger = !0, a.opt.autoPlay ? (b.YTPPlay(), b.css("background-image", "none"), jQuery(a.playerEl).CSSAnimate({ opacity: 1 }, 1e3), a.wrapper.CSSAnimate({ opacity: a.isAlone ? 1 : a.opt.opacity }, 1e3)) : (a.player.pauseVideo(), a.isPlayer || (jQuery(a.playerEl).CSSAnimate({ opacity: 1 }, 1e3), a.wrapper.CSSAnimate({ opacity: a.isAlone ? 1 : a.opt.opacity }, 1e3))), a.isPlayer && !a.opt.autoPlay && (a.loading.html("Ready"), setTimeout(function () {
            a.loading.fadeOut()
          }, 100)), a.controlBar && a.controlBar.slideDown(1e3)
        } else c >= 0 && a.player.seekTo(c, !0)
      }, 1e3)
    },
    formatTime: function (a) {
      var b = Math.floor(a / 60), c = Math.floor(a - 60 * b);
      return (9 >= b ? "0" + b : b) + " : " + (9 >= c ? "0" + c : c)
    }
  }, jQuery.fn.toggleVolume = function () {
    var a = this.get(0);
    if (a) return a.player.isMuted() ? (jQuery(a).YTPUnmute(), !0) : (jQuery(a).YTPMute(), !1)
  }, jQuery.fn.optimizeDisplay = function () {
    var a = this.get(0), b = a.opt, c = jQuery(a.playerEl), d = {}, e = a.wrapper;
    d.width = e.outerWidth(), d.height = e.outerHeight();
    var f = 24, g = 100, h = {};
    b.optimizeDisplay ? (h.width = d.width + d.width * f / 100, h.height = "16/9" == b.ratio ? Math.ceil(9 * d.width / 16) : Math.ceil(3 * d.width / 4), h.marginTop = -((h.height - d.height) / 2), h.marginLeft = -(d.width * (f / 2) / 100), h.height < d.height && (h.height = d.height + d.height * f / 100, h.width = "16/9" == b.ratio ? Math.floor(16 * d.height / 9) : Math.floor(4 * d.height / 3), h.marginTop = -(d.height * (f / 2) / 100), h.marginLeft = -((h.width - d.width) / 2)), h.width += g, h.height += g, h.marginTop -= g / 2, h.marginLeft -= g / 2) : (h.width = "100%", h.height = "100%", h.marginTop = 0, h.marginLeft = 0), c.css({
      width: h.width,
      height: h.height,
      marginTop: h.marginTop,
      marginLeft: h.marginLeft
    })
  }, jQuery.shuffle = function (a) {
    for (var b = a.slice(), c = b.length, d = c; d--;) {
      var e = parseInt(Math.random() * c), f = b[d];
      b[d] = b[e], b[e] = f
    }
    return b
  }, jQuery.fn.YTPlayer = jQuery.mbYTPlayer.buildPlayer, jQuery.fn.YTPlaylist = jQuery.mbYTPlayer.playlist, jQuery.fn.YTPPlayNext = jQuery.mbYTPlayer.playNext, jQuery.fn.YTPPlayPrev = jQuery.mbYTPlayer.playPrev, jQuery.fn.YTPChangeMovie = jQuery.mbYTPlayer.changeMovie, jQuery.fn.YTPGetVideoID = jQuery.mbYTPlayer.getVideoID, jQuery.fn.YTPGetPlayer = jQuery.mbYTPlayer.getPlayer, jQuery.fn.YTPPlayerDestroy = jQuery.mbYTPlayer.playerDestroy, jQuery.fn.YTPFullscreen = jQuery.mbYTPlayer.fullscreen, jQuery.fn.YTPPlay = jQuery.mbYTPlayer.play, jQuery.fn.YTPTogglePlay = jQuery.mbYTPlayer.togglePlay, jQuery.fn.YTPToggleLoops = jQuery.mbYTPlayer.toggleLoops, jQuery.fn.YTPStop = jQuery.mbYTPlayer.stop, jQuery.fn.YTPPause = jQuery.mbYTPlayer.pause, jQuery.fn.YTPSeekTo = jQuery.mbYTPlayer.seekTo, jQuery.fn.YTPMute = jQuery.mbYTPlayer.mute, jQuery.fn.YTPUnmute = jQuery.mbYTPlayer.unmute, jQuery.fn.YTPToggleVolume = jQuery.mbYTPlayer.toggleVolume, jQuery.fn.YTPSetVolume = jQuery.mbYTPlayer.setVolume, jQuery.fn.YTPSetVideoQuality = jQuery.mbYTPlayer.setVideoQuality, jQuery.fn.YTPManageProgress = jQuery.mbYTPlayer.manageProgress, jQuery.fn.YTPGetVideoData = jQuery.mbYTPlayer.getVideoData, jQuery.fn.YTPApplyFilter = jQuery.mbYTPlayer.applyFilter, jQuery.fn.YTPApplyFilters = jQuery.mbYTPlayer.applyFilters, jQuery.fn.YTPToggleFilter = jQuery.mbYTPlayer.toggleFilter, jQuery.fn.YTPToggleFilters = jQuery.mbYTPlayer.toggleFilters, jQuery.fn.YTPRemoveFilter = jQuery.mbYTPlayer.removeFilter, jQuery.fn.YTPDisableFilters = jQuery.mbYTPlayer.disableFilters, jQuery.fn.YTPEnableFilters = jQuery.mbYTPlayer.enableFilters, jQuery.fn.mb_YTPlayer = jQuery.mbYTPlayer.buildPlayer, jQuery.fn.playNext = jQuery.mbYTPlayer.playNext, jQuery.fn.playPrev = jQuery.mbYTPlayer.playPrev, jQuery.fn.changeMovie = jQuery.mbYTPlayer.changeMovie, jQuery.fn.getVideoID = jQuery.mbYTPlayer.getVideoID, jQuery.fn.getPlayer = jQuery.mbYTPlayer.getPlayer, jQuery.fn.playerDestroy = jQuery.mbYTPlayer.playerDestroy, jQuery.fn.fullscreen = jQuery.mbYTPlayer.fullscreen, jQuery.fn.buildYTPControls = jQuery.mbYTPlayer.buildControls, jQuery.fn.playYTP = jQuery.mbYTPlayer.play, jQuery.fn.toggleLoops = jQuery.mbYTPlayer.toggleLoops, jQuery.fn.stopYTP = jQuery.mbYTPlayer.stop, jQuery.fn.pauseYTP = jQuery.mbYTPlayer.pause, jQuery.fn.seekToYTP = jQuery.mbYTPlayer.seekTo, jQuery.fn.muteYTPVolume = jQuery.mbYTPlayer.mute, jQuery.fn.unmuteYTPVolume = jQuery.mbYTPlayer.unmute, jQuery.fn.setYTPVolume = jQuery.mbYTPlayer.setVolume, jQuery.fn.setVideoQuality = jQuery.mbYTPlayer.setVideoQuality, jQuery.fn.manageYTPProgress = jQuery.mbYTPlayer.manageProgress, jQuery.fn.YTPGetDataFromFeed = jQuery.mbYTPlayer.getVideoData
}(jQuery, ytp), !function ($) {
  function uncamel(a) {
    return a.replace(/([A-Z])/g, function (a) {
      return "-" + a.toLowerCase()
    })
  }

  function setUnit(a, b) {
    return "string" != typeof a || a.match(/^[\-0-9\.]+$/) ? "" + a + b : a
  }

  function setFilter(a, b, c) {
    var d = uncamel(b), e = jQuery.browser.mozilla ? "" : $.CSS.sfx;
    a[e + "filter"] = a[e + "filter"] || "", c = setUnit(c > $.CSS.filters[b].max ? $.CSS.filters[b].max : c, $.CSS.filters[b].unit), a[e + "filter"] += d + "(" + c + ") ", delete a[b]
  }

  eval(function (a, b, c, d, e, f) {
    if (e = function (a) {
        return a
      }, !"".replace(/^/, String)) {
      for (; c--;) f[c] = d[c] || c;
      d = [function (a) {
        return f[a]
      }], e = function () {
        return "\\w+"
      }, c = 1
    }
    for (; c--;) d[c] && (a = a.replace(new RegExp("\\b" + e(c) + "\\b", "g"), d[c]));
    return a
  }('29 11=17.53;24(!2.9){2.9={};2.9.34=!1;2.9.22=!1;2.9.45=!1;2.9.42=!1;2.9.40=!1;2.9.28=!1;2.9.56=11;2.9.16=17.51;2.9.13=""+47(17.23);2.9.18=26(17.23,10);29 32,12,20;24(-1!=(12=11.15("33")))2.9.45=!0,2.9.16="33",2.9.13=11.14(12+6),-1!=(12=11.15("25"))&&(2.9.13=11.14(12+8));27 24(-1!=(12=11.15("58")))2.9.28=!0,2.9.16="36 38 39",2.9.13=11.14(12+5);27 24(-1!=11.15("57")){2.9.28=!0;2.9.16="36 38 39";29 30=11.15("59:")+3,43=30+4;2.9.13=11.14(30,43)}27-1!=(12=11.15("41"))?(2.9.22=!0,2.9.40=!0,2.9.16="41",2.9.13=11.14(12+7)):-1!=(12=11.15("31"))?(2.9.22=!0,2.9.42=!0,2.9.16="31",2.9.13=11.14(12+7),-1!=(12=11.15("25"))&&(2.9.13=11.14(12+8))):-1!=(12=11.15("68"))?(2.9.22=!0,2.9.16="31",2.9.13=11.14(12+7),-1!=(12=11.15("25"))&&(2.9.13=11.14(12+8))):-1!=(12=11.15("35"))?(2.9.34=!0,2.9.16="35",2.9.13=11.14(12+8)):(32=11.37(" ")+1)<(12=11.37("/"))&&(2.9.16=11.14(32,12),2.9.13=11.14(12+1),2.9.16.63()==2.9.16.64()&&(2.9.16=17.51));-1!=(20=2.9.13.15(";"))&&(2.9.13=2.9.13.14(0,20));-1!=(20=2.9.13.15(" "))&&(2.9.13=2.9.13.14(0,20));2.9.18=26(""+2.9.13,10);67(2.9.18)&&(2.9.13=""+47(17.23),2.9.18=26(17.23,10));2.9.69=2.9.18}2.9.46=/65/19.21(11);2.9.49=/66/19.21(11);2.9.48=/60|61|55/19.21(11);2.9.50=/33 52/19.21(11);2.9.44=/54/19.21(11);2.9.62=2.9.46||2.9.49||2.9.48||2.9.44||2.9.50;', 10, 70, "||jQuery|||||||browser||nAgt|verOffset|fullVersion|substring|indexOf|name|navigator|majorVersion|i|ix|test|webkit|appVersion|if|Version|parseInt|else|msie|var|start|Safari|nameOffset|Opera|mozilla|Firefox|Microsoft|lastIndexOf|Internet|Explorer|chrome|Chrome|safari|end|windowsMobile|opera|android|parseFloat|ios|blackberry|operaMobile|appName|Mini|userAgent|IEMobile|iPod|ua|Trident|MSIE|rv|iPhone|iPad|mobile|toLowerCase|toUpperCase|Android|BlackBerry|isNaN|AppleWebkit|version".split("|"), 0, {})),
    jQuery.support.CSStransition = function () {
      var a = document.body || document.documentElement, b = a.style;
      return void 0 !== b.transition || void 0 !== b.WebkitTransition || void 0 !== b.MozTransition || void 0 !== b.MsTransition || void 0 !== b.OTransition
    }(), $.CSS = {
    name: "mb.CSSAnimate",
    author: "Matteo Bicocchi",
    version: "2.0.0",
    transitionEnd: "transitionEnd",
    sfx: "",
    filters: {
      blur: { min: 0, max: 100, unit: "px" },
      brightness: { min: 0, max: 400, unit: "%" },
      contrast: { min: 0, max: 400, unit: "%" },
      grayscale: { min: 0, max: 100, unit: "%" },
      hueRotate: { min: 0, max: 360, unit: "deg" },
      invert: { min: 0, max: 100, unit: "%" },
      saturate: { min: 0, max: 400, unit: "%" },
      sepia: { min: 0, max: 100, unit: "%" }
    },
    normalizeCss: function (a) {
      var b = jQuery.extend(!0, {}, a);
      jQuery.browser.webkit || jQuery.browser.opera ? $.CSS.sfx = "-webkit-" : jQuery.browser.mozilla ? $.CSS.sfx = "-moz-" : jQuery.browser.msie && ($.CSS.sfx = "-ms-");
      for (var c in b) {
        "transform" === c && (b[$.CSS.sfx + "transform"] = b[c], delete b[c]), "transform-origin" === c && (b[$.CSS.sfx + "transform-origin"] = a[c], delete b[c]), "filter" !== c || jQuery.browser.mozilla || (b[$.CSS.sfx + "filter"] = a[c], delete b[c]), "blur" === c && setFilter(b, "blur", a[c]), "brightness" === c && setFilter(b, "brightness", a[c]), "contrast" === c && setFilter(b, "contrast", a[c]), "grayscale" === c && setFilter(b, "grayscale", a[c]), "hueRotate" === c && setFilter(b, "hueRotate", a[c]), "invert" === c && setFilter(b, "invert", a[c]), "saturate" === c && setFilter(b, "saturate", a[c]), "sepia" === c && setFilter(b, "sepia", a[c]);
        var d = "";
        "x" === c && (d = $.CSS.sfx + "transform", b[d] = b[d] || "", b[d] += " translateX(" + setUnit(a[c], "px") + ")", delete b[c]), "y" === c && (d = $.CSS.sfx + "transform", b[d] = b[d] || "", b[d] += " translateY(" + setUnit(a[c], "px") + ")", delete b[c]), "z" === c && (d = $.CSS.sfx + "transform", b[d] = b[d] || "", b[d] += " translateZ(" + setUnit(a[c], "px") + ")", delete b[c]), "rotate" === c && (d = $.CSS.sfx + "transform", b[d] = b[d] || "", b[d] += " rotate(" + setUnit(a[c], "deg") + ")", delete b[c]), "rotateX" === c && (d = $.CSS.sfx + "transform", b[d] = b[d] || "", b[d] += " rotateX(" + setUnit(a[c], "deg") + ")", delete b[c]), "rotateY" === c && (d = $.CSS.sfx + "transform", b[d] = b[d] || "", b[d] += " rotateY(" + setUnit(a[c], "deg") + ")", delete b[c]), "rotateZ" === c && (d = $.CSS.sfx + "transform", b[d] = b[d] || "", b[d] += " rotateZ(" + setUnit(a[c], "deg") + ")", delete b[c]), "scale" === c && (d = $.CSS.sfx + "transform", b[d] = b[d] || "", b[d] += " scale(" + setUnit(a[c], "") + ")", delete b[c]), "scaleX" === c && (d = $.CSS.sfx + "transform", b[d] = b[d] || "", b[d] += " scaleX(" + setUnit(a[c], "") + ")", delete b[c]), "scaleY" === c && (d = $.CSS.sfx + "transform", b[d] = b[d] || "", b[d] += " scaleY(" + setUnit(a[c], "") + ")", delete b[c]), "scaleZ" === c && (d = $.CSS.sfx + "transform", b[d] = b[d] || "", b[d] += " scaleZ(" + setUnit(a[c], "") + ")", delete b[c]), "skew" === c && (d = $.CSS.sfx + "transform", b[d] = b[d] || "", b[d] += " skew(" + setUnit(a[c], "deg") + ")", delete b[c]), "skewX" === c && (d = $.CSS.sfx + "transform", b[d] = b[d] || "", b[d] += " skewX(" + setUnit(a[c], "deg") + ")", delete b[c]), "skewY" === c && (d = $.CSS.sfx + "transform", b[d] = b[d] || "", b[d] += " skewY(" + setUnit(a[c], "deg") + ")", delete b[c]), "perspective" === c && (d = $.CSS.sfx + "transform", b[d] = b[d] || "", b[d] += " perspective(" + setUnit(a[c], "px") + ")", delete b[c])
      }
      return b
    },
    getProp: function (a) {
      var b = [];
      for (var c in a) b.indexOf(c) < 0 && b.push(uncamel(c));
      return b.join(",")
    },
    animate: function (a, b, c, d, e) {
      return this.each(function () {
        function f() {
          g.called = !0, g.CSSAIsRunning = !1, h.off($.CSS.transitionEnd + "." + g.id), clearTimeout(g.timeout), h.css($.CSS.sfx + "transition", ""), "function" == typeof e && e.apply(g), "function" == typeof g.CSSqueue && (g.CSSqueue(), g.CSSqueue = null)
        }

        var g = this, h = jQuery(this);
        g.id = g.id || "CSSA_" + (new Date).getTime();
        var i = i || { type: "noEvent" };
        if (g.CSSAIsRunning && g.eventType == i.type && !jQuery.browser.msie && jQuery.browser.version <= 9) return void(g.CSSqueue = function () {
          h.CSSAnimate(a, b, c, d, e)
        });
        if (g.CSSqueue = null, g.eventType = i.type, 0 !== h.length && a) {
          if (a = $.normalizeCss(a), g.CSSAIsRunning = !0, "function" == typeof b && (e = b, b = jQuery.fx.speeds._default), "function" == typeof c && (d = c, c = 0), "string" == typeof c && (e = c, c = 0), "function" == typeof d && (e = d, d = "cubic-bezier(0.65,0.03,0.36,0.72)"), "string" == typeof b) for (var j in jQuery.fx.speeds) {
            if (b == j) {
              b = jQuery.fx.speeds[j];
              break
            }
            b = jQuery.fx.speeds._default
          }
          if (b || (b = jQuery.fx.speeds._default), "string" == typeof e && (d = e, e = null), !jQuery.support.CSStransition) {
            for (var k in a) {
              if ("transform" === k && delete a[k], "filter" === k && delete a[k], "transform-origin" === k && delete a[k], "auto" === a[k] && delete a[k], "x" === k) {
                var l = a[k], m = "left";
                a[m] = l, delete a[k]
              }
              if ("y" === k) {
                var l = a[k], m = "top";
                a[m] = l, delete a[k]
              }
              ("-ms-transform" === k || "-ms-filter" === k) && delete a[k]
            }
            return void h.delay(c).animate(a, b, e)
          }
          var n = {
            "default": "ease",
            "in": "ease-in",
            out: "ease-out",
            "in-out": "ease-in-out",
            snap: "cubic-bezier(0,1,.5,1)",
            easeOutCubic: "cubic-bezier(.215,.61,.355,1)",
            easeInOutCubic: "cubic-bezier(.645,.045,.355,1)",
            easeInCirc: "cubic-bezier(.6,.04,.98,.335)",
            easeOutCirc: "cubic-bezier(.075,.82,.165,1)",
            easeInOutCirc: "cubic-bezier(.785,.135,.15,.86)",
            easeInExpo: "cubic-bezier(.95,.05,.795,.035)",
            easeOutExpo: "cubic-bezier(.19,1,.22,1)",
            easeInOutExpo: "cubic-bezier(1,0,0,1)",
            easeInQuad: "cubic-bezier(.55,.085,.68,.53)",
            easeOutQuad: "cubic-bezier(.25,.46,.45,.94)",
            easeInOutQuad: "cubic-bezier(.455,.03,.515,.955)",
            easeInQuart: "cubic-bezier(.895,.03,.685,.22)",
            easeOutQuart: "cubic-bezier(.165,.84,.44,1)",
            easeInOutQuart: "cubic-bezier(.77,0,.175,1)",
            easeInQuint: "cubic-bezier(.755,.05,.855,.06)",
            easeOutQuint: "cubic-bezier(.23,1,.32,1)",
            easeInOutQuint: "cubic-bezier(.86,0,.07,1)",
            easeInSine: "cubic-bezier(.47,0,.745,.715)",
            easeOutSine: "cubic-bezier(.39,.575,.565,1)",
            easeInOutSine: "cubic-bezier(.445,.05,.55,.95)",
            easeInBack: "cubic-bezier(.6,-.28,.735,.045)",
            easeOutBack: "cubic-bezier(.175, .885,.32,1.275)",
            easeInOutBack: "cubic-bezier(.68,-.55,.265,1.55)"
          };
          n[d] && (d = n[d]), h.off($.CSS.transitionEnd + "." + g.id);
          var o = $.CSS.getProp(a), p = {};
          $.extend(p, a), p[$.CSS.sfx + "transition-property"] = o, p[$.CSS.sfx + "transition-duration"] = b + "ms", p[$.CSS.sfx + "transition-delay"] = c + "ms", p[$.CSS.sfx + "transition-timing-function"] = d, setTimeout(function () {
            h.one($.CSS.transitionEnd + "." + g.id, f), h.css(p)
          }, 1), g.timeout = setTimeout(function () {
            return g.called || !e ? (g.called = !1, void(g.CSSAIsRunning = !1)) : (h.css($.CSS.sfx + "transition", ""), e.apply(g), g.CSSAIsRunning = !1, void("function" == typeof g.CSSqueue && (g.CSSqueue(), g.CSSqueue = null)))
          }, b + c + 10)
        }
      })
    }
  }, $.fn.CSSAnimate = $.CSS.animate, $.normalizeCss = $.CSS.normalizeCss, $.fn.css3 = function (a) {
    return this.each(function () {
      var b = $(this), c = $.normalizeCss(a);
      b.css(c)
    })
  }
}(jQuery);
var nAgt = navigator.userAgent;
if (!jQuery.browser) {
  jQuery.browser = {}, jQuery.browser.mozilla = !1, jQuery.browser.webkit = !1, jQuery.browser.opera = !1, jQuery.browser.safari = !1, jQuery.browser.chrome = !1, jQuery.browser.msie = !1, jQuery.browser.ua = nAgt, jQuery.browser.name = navigator.appName, jQuery.browser.fullVersion = "" + parseFloat(navigator.appVersion), jQuery.browser.majorVersion = parseInt(navigator.appVersion, 10);
  var nameOffset, verOffset, ix;
  if (-1 != (verOffset = nAgt.indexOf("Opera"))) jQuery.browser.opera = !0, jQuery.browser.name = "Opera", jQuery.browser.fullVersion = nAgt.substring(verOffset + 6), -1 != (verOffset = nAgt.indexOf("Version")) && (jQuery.browser.fullVersion = nAgt.substring(verOffset + 8)); else if (-1 != (verOffset = nAgt.indexOf("OPR"))) jQuery.browser.opera = !0, jQuery.browser.name = "Opera", jQuery.browser.fullVersion = nAgt.substring(verOffset + 4); else if (-1 != (verOffset = nAgt.indexOf("MSIE"))) jQuery.browser.msie = !0, jQuery.browser.name = "Microsoft Internet Explorer", jQuery.browser.fullVersion = nAgt.substring(verOffset + 5); else if (-1 != nAgt.indexOf("Trident")) {
    jQuery.browser.msie = !0, jQuery.browser.name = "Microsoft Internet Explorer";
    var start = nAgt.indexOf("rv:") + 3, end = start + 4;
    jQuery.browser.fullVersion = nAgt.substring(start, end)
  } else -1 != (verOffset = nAgt.indexOf("Chrome")) ? (jQuery.browser.webkit = !0, jQuery.browser.chrome = !0, jQuery.browser.name = "Chrome", jQuery.browser.fullVersion = nAgt.substring(verOffset + 7)) : -1 != (verOffset = nAgt.indexOf("Safari")) ? (jQuery.browser.webkit = !0, jQuery.browser.safari = !0, jQuery.browser.name = "Safari", jQuery.browser.fullVersion = nAgt.substring(verOffset + 7), -1 != (verOffset = nAgt.indexOf("Version")) && (jQuery.browser.fullVersion = nAgt.substring(verOffset + 8))) : -1 != (verOffset = nAgt.indexOf("AppleWebkit")) ? (jQuery.browser.webkit = !0, jQuery.browser.name = "Safari", jQuery.browser.fullVersion = nAgt.substring(verOffset + 7), -1 != (verOffset = nAgt.indexOf("Version")) && (jQuery.browser.fullVersion = nAgt.substring(verOffset + 8))) : -1 != (verOffset = nAgt.indexOf("Firefox")) ? (jQuery.browser.mozilla = !0, jQuery.browser.name = "Firefox", jQuery.browser.fullVersion = nAgt.substring(verOffset + 8)) : (nameOffset = nAgt.lastIndexOf(" ") + 1) < (verOffset = nAgt.lastIndexOf("/")) && (jQuery.browser.name = nAgt.substring(nameOffset, verOffset), jQuery.browser.fullVersion = nAgt.substring(verOffset + 1), jQuery.browser.name.toLowerCase() == jQuery.browser.name.toUpperCase() && (jQuery.browser.name = navigator.appName));
  -1 != (ix = jQuery.browser.fullVersion.indexOf(";")) && (jQuery.browser.fullVersion = jQuery.browser.fullVersion.substring(0, ix)), -1 != (ix = jQuery.browser.fullVersion.indexOf(" ")) && (jQuery.browser.fullVersion = jQuery.browser.fullVersion.substring(0, ix)), jQuery.browser.majorVersion = parseInt("" + jQuery.browser.fullVersion, 10), isNaN(jQuery.browser.majorVersion) && (jQuery.browser.fullVersion = "" + parseFloat(navigator.appVersion), jQuery.browser.majorVersion = parseInt(navigator.appVersion, 10)), jQuery.browser.version = jQuery.browser.majorVersion
}
jQuery.browser.android = /Android/i.test(nAgt), jQuery.browser.blackberry = /BlackBerry|BB|PlayBook/i.test(nAgt), jQuery.browser.ios = /iPhone|iPad|iPod|webOS/i.test(nAgt), jQuery.browser.operaMobile = /Opera Mini/i.test(nAgt), jQuery.browser.windowsMobile = /IEMobile|Windows Phone/i.test(nAgt), jQuery.browser.kindle = /Kindle|Silk/i.test(nAgt), jQuery.browser.mobile = jQuery.browser.android || jQuery.browser.blackberry || jQuery.browser.ios || jQuery.browser.windowsMobile || jQuery.browser.operaMobile || jQuery.browser.kindle, jQuery.isMobile = jQuery.browser.mobile, jQuery.isAndroidDefault = jQuery.browser.android && !/chrome/i.test(nAgt), !function (a) {
  /iphone|ipod|ipad|android|ie|blackberry|fennec/.test(navigator.userAgent.toLowerCase());
  var b = "ontouchstart" in window || window.navigator && window.navigator.msPointerEnabled && window.MSGesture || window.DocumentTouch && document instanceof DocumentTouch || !1;
  a.simpleSlider = {
    defaults: { initialval: 0, scale: 100, orientation: "h", readonly: !1, callback: !1 },
    events: {
      start: b ? "touchstart" : "mousedown",
      end: b ? "touchend" : "mouseup",
      move: b ? "touchmove" : "mousemove"
    },
    init: function (c) {
      return this.each(function () {
        var d = this, e = a(d);
        e.addClass("simpleSlider"), d.opt = {}, a.extend(d.opt, a.simpleSlider.defaults, c), a.extend(d.opt, e.data());
        var f = "h" == d.opt.orientation ? "horizontal" : "vertical", g = a("<div/>").addClass("level").addClass(f);
        e.prepend(g), d.level = g, e.css({ cursor: "default" }), "auto" == d.opt.scale && (d.opt.scale = a(d).outerWidth()), e.updateSliderVal(), d.opt.readonly || (e.on(a.simpleSlider.events.start, function (a) {
          b && (a = a.changedTouches[0]), d.canSlide = !0, e.updateSliderVal(a), e.css({ cursor: "col-resize" }), a.preventDefault(), a.stopPropagation()
        }), a(document).on(a.simpleSlider.events.move, function (c) {
          b && (c = c.changedTouches[0]), d.canSlide && (a(document).css({ cursor: "default" }), e.updateSliderVal(c), c.preventDefault(), c.stopPropagation())
        }).on(a.simpleSlider.events.end, function () {
          a(document).css({ cursor: "auto" }), d.canSlide = !1, e.css({ cursor: "auto" })
        }))
      })
    },
    updateSliderVal: function (b) {
      function c(a, b) {
        return Math.floor(100 * a / b)
      }

      var d = this, e = d.get(0);
      e.opt.initialval = "number" == typeof e.opt.initialval ? e.opt.initialval : e.opt.initialval(e);
      var f = a(e).outerWidth(), g = a(e).outerHeight();
      e.x = "object" == typeof b ? b.clientX + document.body.scrollLeft - d.offset().left : "number" == typeof b ? b * f / e.opt.scale : e.opt.initialval * f / e.opt.scale, e.y = "object" == typeof b ? b.clientY + document.body.scrollTop - d.offset().top : "number" == typeof b ? (e.opt.scale - e.opt.initialval - b) * g / e.opt.scale : e.opt.initialval * g / e.opt.scale, e.y = d.outerHeight() - e.y, e.scaleX = e.x * e.opt.scale / f, e.scaleY = e.y * e.opt.scale / g, e.outOfRangeX = e.scaleX > e.opt.scale ? e.scaleX - e.opt.scale : e.scaleX < 0 ? e.scaleX : 0, e.outOfRangeY = e.scaleY > e.opt.scale ? e.scaleY - e.opt.scale : e.scaleY < 0 ? e.scaleY : 0, e.outOfRange = "h" == e.opt.orientation ? e.outOfRangeX : e.outOfRangeY, e.value = "undefined" != typeof b ? "h" == e.opt.orientation ? e.x >= d.outerWidth() ? e.opt.scale : e.x <= 0 ? 0 : e.scaleX : e.y >= d.outerHeight() ? e.opt.scale : e.y <= 0 ? 0 : e.scaleY : "h" == e.opt.orientation ? e.scaleX : e.scaleY, "h" == e.opt.orientation ? e.level.width(c(e.x, f) + "%") : e.level.height(c(e.y, g)), "function" == typeof e.opt.callback && e.opt.callback(e)
    }
  }, a.fn.simpleSlider = a.simpleSlider.init, a.fn.updateSliderVal = a.simpleSlider.updateSliderVal
}(jQuery), !function (a) {
  a.mbCookie = {
    set: function (a, b, c, d) {
      b = JSON.stringify(b), c || (c = 7), d = d ? "; domain=" + d : "";
      var e, f = new Date;
      f.setTime(f.getTime() + 864e5 * c), e = "; expires=" + f.toGMTString(), document.cookie = a + "=" + b + e + "; path=/" + d
    }, get: function (a) {
      for (var b = a + "=", c = document.cookie.split(";"), d = 0; d < c.length; d++) {
        for (var e = c[d]; " " == e.charAt(0);) e = e.substring(1, e.length);
        if (0 == e.indexOf(b)) return JSON.parse(e.substring(b.length, e.length))
      }
      return null
    }, remove: function (b) {
      a.mbCookie.set(b, "", -1)
    }
  }, a.mbStorage = {
    set: function (a, b) {
      b = JSON.stringify(b), localStorage.setItem(a, b)
    }, get: function (a) {
      return localStorage[a] ? JSON.parse(localStorage[a]) : null
    }, remove: function (a) {
      a ? localStorage.removeItem(a) : localStorage.clear()
    }
  }
}(jQuery);

/*!
 * imagesLoaded PACKAGED v3.1.8
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

(function () {
  function e() {
  }

  function t(e, t) {
    for (var n = e.length; n--;) if (e[n].listener === t) return n;
    return -1
  }

  function n(e) {
    return function () {
      return this[e].apply(this, arguments)
    }
  }

  var i = e.prototype, r = this, o = r.EventEmitter;
  i.getListeners = function (e) {
    var t, n, i = this._getEvents();
    if ("object" == typeof e) {
      t = {};
      for (n in i) i.hasOwnProperty(n) && e.test(n) && (t[n] = i[n])
    } else t = i[e] || (i[e] = []);
    return t
  }, i.flattenListeners = function (e) {
    var t, n = [];
    for (t = 0; e.length > t; t += 1) n.push(e[t].listener);
    return n
  }, i.getListenersAsObject = function (e) {
    var t, n = this.getListeners(e);
    return n instanceof Array && (t = {}, t[e] = n), t || n
  }, i.addListener = function (e, n) {
    var i, r = this.getListenersAsObject(e), o = "object" == typeof n;
    for (i in r) r.hasOwnProperty(i) && -1 === t(r[i], n) && r[i].push(o ? n : { listener: n, once: !1 });
    return this
  }, i.on = n("addListener"), i.addOnceListener = function (e, t) {
    return this.addListener(e, { listener: t, once: !0 })
  }, i.once = n("addOnceListener"), i.defineEvent = function (e) {
    return this.getListeners(e), this
  }, i.defineEvents = function (e) {
    for (var t = 0; e.length > t; t += 1) this.defineEvent(e[t]);
    return this
  }, i.removeListener = function (e, n) {
    var i, r, o = this.getListenersAsObject(e);
    for (r in o) o.hasOwnProperty(r) && (i = t(o[r], n), -1 !== i && o[r].splice(i, 1));
    return this
  }, i.off = n("removeListener"), i.addListeners = function (e, t) {
    return this.manipulateListeners(!1, e, t)
  }, i.removeListeners = function (e, t) {
    return this.manipulateListeners(!0, e, t)
  }, i.manipulateListeners = function (e, t, n) {
    var i, r, o = e ? this.removeListener : this.addListener, s = e ? this.removeListeners : this.addListeners;
    if ("object" != typeof t || t instanceof RegExp) for (i = n.length; i--;) o.call(this, t, n[i]); else for (i in t) t.hasOwnProperty(i) && (r = t[i]) && ("function" == typeof r ? o.call(this, i, r) : s.call(this, i, r));
    return this
  }, i.removeEvent = function (e) {
    var t, n = typeof e, i = this._getEvents();
    if ("string" === n) delete i[e]; else if ("object" === n) for (t in i) i.hasOwnProperty(t) && e.test(t) && delete i[t]; else delete this._events;
    return this
  }, i.removeAllListeners = n("removeEvent"), i.emitEvent = function (e, t) {
    var n, i, r, o, s = this.getListenersAsObject(e);
    for (r in s) if (s.hasOwnProperty(r)) for (i = s[r].length; i--;) n = s[r][i], n.once === !0 && this.removeListener(e, n.listener), o = n.listener.apply(this, t || []), o === this._getOnceReturnValue() && this.removeListener(e, n.listener);
    return this
  }, i.trigger = n("emitEvent"), i.emit = function (e) {
    var t = Array.prototype.slice.call(arguments, 1);
    return this.emitEvent(e, t)
  }, i.setOnceReturnValue = function (e) {
    return this._onceReturnValue = e, this
  }, i._getOnceReturnValue = function () {
    return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0
  }, i._getEvents = function () {
    return this._events || (this._events = {})
  }, e.noConflict = function () {
    return r.EventEmitter = o, e
  }, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function () {
    return e
  }) : "object" == typeof module && module.exports ? module.exports = e : this.EventEmitter = e
}).call(this), function (e) {
  function t(t) {
    var n = e.event;
    return n.target = n.target || n.srcElement || t, n
  }

  var n = document.documentElement, i = function () {
  };
  n.addEventListener ? i = function (e, t, n) {
    e.addEventListener(t, n, !1)
  } : n.attachEvent && (i = function (e, n, i) {
    e[n + i] = i.handleEvent ? function () {
      var n = t(e);
      i.handleEvent.call(i, n)
    } : function () {
      var n = t(e);
      i.call(e, n)
    }, e.attachEvent("on" + n, e[n + i])
  });
  var r = function () {
  };
  n.removeEventListener ? r = function (e, t, n) {
    e.removeEventListener(t, n, !1)
  } : n.detachEvent && (r = function (e, t, n) {
    e.detachEvent("on" + t, e[t + n]);
    try {
      delete e[t + n]
    } catch (i) {
      e[t + n] = void 0
    }
  });
  var o = { bind: i, unbind: r };
  "function" == typeof define && define.amd ? define("eventie/eventie", o) : e.eventie = o
}(this), function (e, t) {
  "function" == typeof define && define.amd ? define(["eventEmitter/EventEmitter", "eventie/eventie"], function (n, i) {
    return t(e, n, i)
  }) : "object" == typeof exports ? module.exports = t(e, require("wolfy87-eventemitter"), require("eventie")) : e.imagesLoaded = t(e, e.EventEmitter, e.eventie)
}(window, function (e, t, n) {
  function i(e, t) {
    for (var n in t) e[n] = t[n];
    return e
  }

  function r(e) {
    return "[object Array]" === d.call(e)
  }

  function o(e) {
    var t = [];
    if (r(e)) t = e; else if ("number" == typeof e.length) for (var n = 0, i = e.length; i > n; n++) t.push(e[n]); else t.push(e);
    return t
  }

  function s(e, t, n) {
    if (!(this instanceof s)) return new s(e, t);
    "string" == typeof e && (e = document.querySelectorAll(e)), this.elements = o(e), this.options = i({}, this.options), "function" == typeof t ? n = t : i(this.options, t), n && this.on("always", n), this.getImages(), a && (this.jqDeferred = new a.Deferred);
    var r = this;
    setTimeout(function () {
      r.check()
    })
  }

  function f(e) {
    this.img = e
  }

  function c(e) {
    this.src = e, v[e] = this
  }

  var a = e.jQuery, u = e.console, h = u !== void 0, d = Object.prototype.toString;
  s.prototype = new t, s.prototype.options = {}, s.prototype.getImages = function () {
    this.images = [];
    for (var e = 0, t = this.elements.length; t > e; e++) {
      var n = this.elements[e];
      "IMG" === n.nodeName && this.addImage(n);
      var i = n.nodeType;
      if (i && (1 === i || 9 === i || 11 === i)) for (var r = n.querySelectorAll("img"), o = 0, s = r.length; s > o; o++) {
        var f = r[o];
        this.addImage(f)
      }
    }
  }, s.prototype.addImage = function (e) {
    var t = new f(e);
    this.images.push(t)
  }, s.prototype.check = function () {
    function e(e, r) {
      return t.options.debug && h && u.log("confirm", e, r), t.progress(e), n++, n === i && t.complete(), !0
    }

    var t = this, n = 0, i = this.images.length;
    if (this.hasAnyBroken = !1, !i) return this.complete(), void 0;
    for (var r = 0; i > r; r++) {
      var o = this.images[r];
      o.on("confirm", e), o.check()
    }
  }, s.prototype.progress = function (e) {
    this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded;
    var t = this;
    setTimeout(function () {
      t.emit("progress", t, e), t.jqDeferred && t.jqDeferred.notify && t.jqDeferred.notify(t, e)
    })
  }, s.prototype.complete = function () {
    var e = this.hasAnyBroken ? "fail" : "done";
    this.isComplete = !0;
    var t = this;
    setTimeout(function () {
      if (t.emit(e, t), t.emit("always", t), t.jqDeferred) {
        var n = t.hasAnyBroken ? "reject" : "resolve";
        t.jqDeferred[n](t)
      }
    })
  }, a && (a.fn.imagesLoaded = function (e, t) {
    var n = new s(this, e, t);
    return n.jqDeferred.promise(a(this))
  }), f.prototype = new t, f.prototype.check = function () {
    var e = v[this.img.src] || new c(this.img.src);
    if (e.isConfirmed) return this.confirm(e.isLoaded, "cached was confirmed"), void 0;
    if (this.img.complete && void 0 !== this.img.naturalWidth) return this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), void 0;
    var t = this;
    e.on("confirm", function (e, n) {
      return t.confirm(e.isLoaded, n), !0
    }), e.check()
  }, f.prototype.confirm = function (e, t) {
    this.isLoaded = e, this.emit("confirm", this, t)
  };
  var v = {};
  return c.prototype = new t, c.prototype.check = function () {
    if (!this.isChecked) {
      var e = new Image;
      n.bind(e, "load", this), n.bind(e, "error", this), e.src = this.src, this.isChecked = !0
    }
  }, c.prototype.handleEvent = function (e) {
    var t = "on" + e.type;
    this[t] && this[t](e)
  }, c.prototype.onload = function (e) {
    this.confirm(!0, "onload"), this.unbindProxyEvents(e)
  }, c.prototype.onerror = function (e) {
    this.confirm(!1, "onerror"), this.unbindProxyEvents(e)
  }, c.prototype.confirm = function (e, t) {
    this.isConfirmed = !0, this.isLoaded = e, this.emit("confirm", this, t)
  }, c.prototype.unbindProxyEvents = function (e) {
    n.unbind(e.target, "load", this), n.unbind(e.target, "error", this)
  }, s
});

/**
 * downCount: Simple Countdown clock with offset
 * Author: Sonny T. <hi@sonnyt.com>, sonnyt.com
 */
!function (e) {
  e.fn.downCount = function (t, n) {
    function r() {
      var e = new Date(o.date), t = i(), r = e - t;
      if (0 > r) return clearInterval(a), void(n && "function" == typeof n && n());
      var d = 1e3, s = 60 * d, u = 60 * s, l = 24 * u, h = Math.floor(r / l), c = Math.floor(r % l / u),
        g = Math.floor(r % u / s), v = Math.floor(r % s / d);
      h = String(h).length >= 2 ? h : "0" + h, c = String(c).length >= 2 ? c : "0" + c, g = String(g).length >= 2 ? g : "0" + g, v = String(v).length >= 2 ? v : "0" + v;
      var x = 1 === h ? "day" : "days", m = 1 === c ? "hour" : "hours", y = 1 === g ? "minute" : "minutes",
        D = 1 === v ? "second" : "seconds";
      f.find(".days").text(h), f.find(".hours").text(c), f.find(".minutes").text(g), f.find(".seconds").text(v), f.find(".days_ref").text(x), f.find(".hours_ref").text(m), f.find(".minutes_ref").text(y), f.find(".seconds_ref").text(D)
    }

    var o = e.extend({ date: null, offset: null }, t);
    o.date || e.error("Date is not defined."), Date.parse(o.date) || e.error("Incorrect date format, it should look like this, 12/24/2012 12:00:00.");
    var f = this, i = function () {
      var e = new Date, t = e.getTime() + 6e4 * e.getTimezoneOffset(), n = new Date(t + 36e5 * o.offset);
      return n
    }, a = setInterval(r, 1e3)
  }
}(jQuery);

/* owl carousel */

eval(function (p, a, c, k, e, r) {
  e = function (c) {
    return (c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
  };
  if (!''.replace(/^/, String)) {
    while (c--) r[e(c)] = k[c] || e(c);
    k = [function (e) {
      return r[e]
    }];
    e = function () {
      return '\\w+'
    };
    c = 1
  }
  ;
  while (c--) if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]);
  return p
}('7(A 3c.3q!=="9"){3c.3q=9(e){9 t(){}t.5S=e;p 5R t}}(9(e,t,n){h r={1N:9(t,n){h r=c;r.$k=e(n);r.6=e.4M({},e.37.2B.6,r.$k.v(),t);r.2A=t;r.4L()},4L:9(){9 r(e){h n,r="";7(A t.6.33==="9"){t.6.33.R(c,[e])}l{1A(n 38 e.d){7(e.d.5M(n)){r+=e.d[n].1K}}t.$k.2y(r)}t.3t()}h t=c,n;7(A t.6.2H==="9"){t.6.2H.R(c,[t.$k])}7(A t.6.2O==="2Y"){n=t.6.2O;e.5K(n,r)}l{t.3t()}},3t:9(){h e=c;e.$k.v("d-4I",e.$k.2x("2w")).v("d-4F",e.$k.2x("H"));e.$k.z({2u:0});e.2t=e.6.q;e.4E();e.5v=0;e.1X=14;e.23()},23:9(){h e=c;7(e.$k.25().N===0){p b}e.1M();e.4C();e.$S=e.$k.25();e.E=e.$S.N;e.4B();e.$G=e.$k.17(".d-1K");e.$K=e.$k.17(".d-1p");e.3u="U";e.13=0;e.26=[0];e.m=0;e.4A();e.4z()},4z:9(){h e=c;e.2V();e.2W();e.4t();e.30();e.4r();e.4q();e.2p();e.4o();7(e.6.2o!==b){e.4n(e.6.2o)}7(e.6.O===j){e.6.O=4Q}e.19();e.$k.17(".d-1p").z("4i","4h");7(!e.$k.2m(":3n")){e.3o()}l{e.$k.z("2u",1)}e.5O=b;e.2l();7(A e.6.3s==="9"){e.6.3s.R(c,[e.$k])}},2l:9(){h e=c;7(e.6.1Z===j){e.1Z()}7(e.6.1B===j){e.1B()}e.4g();7(A e.6.3w==="9"){e.6.3w.R(c,[e.$k])}},3x:9(){h e=c;7(A e.6.3B==="9"){e.6.3B.R(c,[e.$k])}e.3o();e.2V();e.2W();e.4f();e.30();e.2l();7(A e.6.3D==="9"){e.6.3D.R(c,[e.$k])}},3F:9(){h e=c;t.1c(9(){e.3x()},0)},3o:9(){h e=c;7(e.$k.2m(":3n")===b){e.$k.z({2u:0});t.18(e.1C);t.18(e.1X)}l{p b}e.1X=t.4d(9(){7(e.$k.2m(":3n")){e.3F();e.$k.4b({2u:1},2M);t.18(e.1X)}},5x)},4B:9(){h e=c;e.$S.5n(\'<L H="d-1p">\').4a(\'<L H="d-1K"></L>\');e.$k.17(".d-1p").4a(\'<L H="d-1p-49">\');e.1H=e.$k.17(".d-1p-49");e.$k.z("4i","4h")},1M:9(){h e=c,t=e.$k.1I(e.6.1M),n=e.$k.1I(e.6.2i);7(!t){e.$k.I(e.6.1M)}7(!n){e.$k.I(e.6.2i)}},2V:9(){h t=c,n,r;7(t.6.2Z===b){p b}7(t.6.48===j){t.6.q=t.2t=1;t.6.1h=b;t.6.1s=b;t.6.1O=b;t.6.22=b;t.6.1Q=b;t.6.1R=b;p b}n=e(t.6.47).1f();7(n>(t.6.1s[0]||t.2t)){t.6.q=t.2t}7(t.6.1h!==b){t.6.1h.5g(9(e,t){p e[0]-t[0]});1A(r=0;r<t.6.1h.N;r+=1){7(t.6.1h[r][0]<=n){t.6.q=t.6.1h[r][1]}}}l{7(n<=t.6.1s[0]&&t.6.1s!==b){t.6.q=t.6.1s[1]}7(n<=t.6.1O[0]&&t.6.1O!==b){t.6.q=t.6.1O[1]}7(n<=t.6.22[0]&&t.6.22!==b){t.6.q=t.6.22[1]}7(n<=t.6.1Q[0]&&t.6.1Q!==b){t.6.q=t.6.1Q[1]}7(n<=t.6.1R[0]&&t.6.1R!==b){t.6.q=t.6.1R[1]}}7(t.6.q>t.E&&t.6.46===j){t.6.q=t.E}},4r:9(){h n=c,r,i;7(n.6.2Z!==j){p b}i=e(t).1f();n.3d=9(){7(e(t).1f()!==i){7(n.6.O!==b){t.18(n.1C)}t.5d(r);r=t.1c(9(){i=e(t).1f();n.3x()},n.6.45)}};e(t).44(n.3d)},4f:9(){h e=c;e.2g(e.m);7(e.6.O!==b){e.3j()}},43:9(){h t=c,n=0,r=t.E-t.6.q;t.$G.2f(9(i){h s=e(c);s.z({1f:t.M}).v("d-1K",3p(i));7(i%t.6.q===0||i===r){7(!(i>r)){n+=1}}s.v("d-24",n)})},42:9(){h e=c,t=e.$G.N*e.M;e.$K.z({1f:t*2,T:0});e.43()},2W:9(){h e=c;e.40();e.42();e.3Z();e.3v()},40:9(){h e=c;e.M=1F.4O(e.$k.1f()/e.6.q)},3v:9(){h e=c,t=(e.E*e.M-e.6.q*e.M)*-1;7(e.6.q>e.E){e.D=0;t=0;e.3z=0}l{e.D=e.E-e.6.q;e.3z=t}p t},3Y:9(){p 0},3Z:9(){h t=c,n=0,r=0,i,s,o;t.J=[0];t.3E=[];1A(i=0;i<t.E;i+=1){r+=t.M;t.J.2D(-r);7(t.6.12===j){s=e(t.$G[i]);o=s.v("d-24");7(o!==n){t.3E[n]=t.J[i];n=o}}}},4t:9(){h t=c;7(t.6.2a===j||t.6.1v===j){t.B=e(\'<L H="d-5A"/>\').5m("5l",!t.F.15).5c(t.$k)}7(t.6.1v===j){t.3T()}7(t.6.2a===j){t.3S()}},3S:9(){h t=c,n=e(\'<L H="d-4U"/>\');t.B.1o(n);t.1u=e("<L/>",{"H":"d-1n",2y:t.6.2U[0]||""});t.1q=e("<L/>",{"H":"d-U",2y:t.6.2U[1]||""});n.1o(t.1u).1o(t.1q);n.w("2X.B 21.B",\'L[H^="d"]\',9(e){e.1l()});n.w("2n.B 28.B",\'L[H^="d"]\',9(n){n.1l();7(e(c).1I("d-U")){t.U()}l{t.1n()}})},3T:9(){h t=c;t.1k=e(\'<L H="d-1v"/>\');t.B.1o(t.1k);t.1k.w("2n.B 28.B",".d-1j",9(n){n.1l();7(3p(e(c).v("d-1j"))!==t.m){t.1g(3p(e(c).v("d-1j")),j)}})},3P:9(){h t=c,n,r,i,s,o,u;7(t.6.1v===b){p b}t.1k.2y("");n=0;r=t.E-t.E%t.6.q;1A(s=0;s<t.E;s+=1){7(s%t.6.q===0){n+=1;7(r===s){i=t.E-t.6.q}o=e("<L/>",{"H":"d-1j"});u=e("<3N></3N>",{4R:t.6.39===j?n:"","H":t.6.39===j?"d-59":""});o.1o(u);o.v("d-1j",r===s?i:s);o.v("d-24",n);t.1k.1o(o)}}t.35()},35:9(){h t=c;7(t.6.1v===b){p b}t.1k.17(".d-1j").2f(9(){7(e(c).v("d-24")===e(t.$G[t.m]).v("d-24")){t.1k.17(".d-1j").Z("2d");e(c).I("2d")}})},3e:9(){h e=c;7(e.6.2a===b){p b}7(e.6.2e===b){7(e.m===0&&e.D===0){e.1u.I("1b");e.1q.I("1b")}l 7(e.m===0&&e.D!==0){e.1u.I("1b");e.1q.Z("1b")}l 7(e.m===e.D){e.1u.Z("1b");e.1q.I("1b")}l 7(e.m!==0&&e.m!==e.D){e.1u.Z("1b");e.1q.Z("1b")}}},30:9(){h e=c;e.3P();e.3e();7(e.B){7(e.6.q>=e.E){e.B.3K()}l{e.B.3J()}}},55:9(){h e=c;7(e.B){e.B.3k()}},U:9(e){h t=c;7(t.1E){p b}t.m+=t.6.12===j?t.6.q:1;7(t.m>t.D+(t.6.12===j?t.6.q-1:0)){7(t.6.2e===j){t.m=0;e="2k"}l{t.m=t.D;p b}}t.1g(t.m,e)},1n:9(e){h t=c;7(t.1E){p b}7(t.6.12===j&&t.m>0&&t.m<t.6.q){t.m=0}l{t.m-=t.6.12===j?t.6.q:1}7(t.m<0){7(t.6.2e===j){t.m=t.D;e="2k"}l{t.m=0;p b}}t.1g(t.m,e)},1g:9(e,n,r){h i=c,s;7(i.1E){p b}7(A i.6.1Y==="9"){i.6.1Y.R(c,[i.$k])}7(e>=i.D){e=i.D}l 7(e<=0){e=0}i.m=i.d.m=e;7(i.6.2o!==b&&r!=="4e"&&i.6.q===1&&i.F.1x===j){i.1t(0);7(i.F.1x===j){i.1L(i.J[e])}l{i.1r(i.J[e],1)}i.2r();i.4l();p b}s=i.J[e];7(i.F.1x===j){i.1T=b;7(n===j){i.1t("1w");t.1c(9(){i.1T=j},i.6.1w)}l 7(n==="2k"){i.1t(i.6.2v);t.1c(9(){i.1T=j},i.6.2v)}l{i.1t("1m");t.1c(9(){i.1T=j},i.6.1m)}i.1L(s)}l{7(n===j){i.1r(s,i.6.1w)}l 7(n==="2k"){i.1r(s,i.6.2v)}l{i.1r(s,i.6.1m)}}i.2r()},2g:9(e){h t=c;7(A t.6.1Y==="9"){t.6.1Y.R(c,[t.$k])}7(e>=t.D||e===-1){e=t.D}l 7(e<=0){e=0}t.1t(0);7(t.F.1x===j){t.1L(t.J[e])}l{t.1r(t.J[e],1)}t.m=t.d.m=e;t.2r()},2r:9(){h e=c;e.26.2D(e.m);e.13=e.d.13=e.26[e.26.N-2];e.26.5f(0);7(e.13!==e.m){e.35();e.3e();e.2l();7(e.6.O!==b){e.3j()}}7(A e.6.3y==="9"&&e.13!==e.m){e.6.3y.R(c,[e.$k])}},X:9(){h e=c;e.3A="X";t.18(e.1C)},3j:9(){h e=c;7(e.3A!=="X"){e.19()}},19:9(){h e=c;e.3A="19";7(e.6.O===b){p b}t.18(e.1C);e.1C=t.4d(9(){e.U(j)},e.6.O)},1t:9(e){h t=c;7(e==="1m"){t.$K.z(t.2z(t.6.1m))}l 7(e==="1w"){t.$K.z(t.2z(t.6.1w))}l 7(A e!=="2Y"){t.$K.z(t.2z(e))}},2z:9(e){p{"-1G-1a":"2C "+e+"1z 2s","-1W-1a":"2C "+e+"1z 2s","-o-1a":"2C "+e+"1z 2s",1a:"2C "+e+"1z 2s"}},3H:9(){p{"-1G-1a":"","-1W-1a":"","-o-1a":"",1a:""}},3I:9(e){p{"-1G-P":"1i("+e+"V, C, C)","-1W-P":"1i("+e+"V, C, C)","-o-P":"1i("+e+"V, C, C)","-1z-P":"1i("+e+"V, C, C)",P:"1i("+e+"V, C,C)"}},1L:9(e){h t=c;t.$K.z(t.3I(e))},3L:9(e){h t=c;t.$K.z({T:e})},1r:9(e,t){h n=c;n.29=b;n.$K.X(j,j).4b({T:e},{54:t||n.6.1m,3M:9(){n.29=j}})},4E:9(){h e=c,r="1i(C, C, C)",i=n.56("L"),s,o,u,a;i.2w.3O="  -1W-P:"+r+"; -1z-P:"+r+"; -o-P:"+r+"; -1G-P:"+r+"; P:"+r;s=/1i\\(C, C, C\\)/g;o=i.2w.3O.5i(s);u=o!==14&&o.N===1;a="5z"38 t||t.5Q.4P;e.F={1x:u,15:a}},4q:9(){h e=c;7(e.6.27!==b||e.6.1U!==b){e.3Q();e.3R()}},4C:9(){h e=c,t=["s","e","x"];e.16={};7(e.6.27===j&&e.6.1U===j){t=["2X.d 21.d","2N.d 3U.d","2n.d 3V.d 28.d"]}l 7(e.6.27===b&&e.6.1U===j){t=["2X.d","2N.d","2n.d 3V.d"]}l 7(e.6.27===j&&e.6.1U===b){t=["21.d","3U.d","28.d"]}e.16.3W=t[0];e.16.2K=t[1];e.16.2J=t[2]},3R:9(){h t=c;t.$k.w("5y.d",9(e){e.1l()});t.$k.w("21.3X",9(t){p e(t.1d).2m("5C, 5E, 5F, 5N")})},3Q:9(){9 s(e){7(e.2b!==W){p{x:e.2b[0].2c,y:e.2b[0].41}}7(e.2b===W){7(e.2c!==W){p{x:e.2c,y:e.41}}7(e.2c===W){p{x:e.52,y:e.53}}}}9 o(t){7(t==="w"){e(n).w(r.16.2K,a);e(n).w(r.16.2J,f)}l 7(t==="Q"){e(n).Q(r.16.2K);e(n).Q(r.16.2J)}}9 u(n){h u=n.3h||n||t.3g,a;7(u.5a===3){p b}7(r.E<=r.6.q){p}7(r.29===b&&!r.6.3f){p b}7(r.1T===b&&!r.6.3f){p b}7(r.6.O!==b){t.18(r.1C)}7(r.F.15!==j&&!r.$K.1I("3b")){r.$K.I("3b")}r.11=0;r.Y=0;e(c).z(r.3H());a=e(c).2h();i.2S=a.T;i.2R=s(u).x-a.T;i.2P=s(u).y-a.5o;o("w");i.2j=b;i.2L=u.1d||u.4c}9 a(o){h u=o.3h||o||t.3g,a,f;r.11=s(u).x-i.2R;r.2I=s(u).y-i.2P;r.Y=r.11-i.2S;7(A r.6.2E==="9"&&i.3C!==j&&r.Y!==0){i.3C=j;r.6.2E.R(r,[r.$k])}7((r.Y>8||r.Y<-8)&&r.F.15===j){7(u.1l!==W){u.1l()}l{u.5L=b}i.2j=j}7((r.2I>10||r.2I<-10)&&i.2j===b){e(n).Q("2N.d")}a=9(){p r.Y/5};f=9(){p r.3z+r.Y/5};r.11=1F.3v(1F.3Y(r.11,a()),f());7(r.F.1x===j){r.1L(r.11)}l{r.3L(r.11)}}9 f(n){h s=n.3h||n||t.3g,u,a,f;s.1d=s.1d||s.4c;i.3C=b;7(r.F.15!==j){r.$K.Z("3b")}7(r.Y<0){r.1y=r.d.1y="T"}l{r.1y=r.d.1y="3i"}7(r.Y!==0){u=r.4j();r.1g(u,b,"4e");7(i.2L===s.1d&&r.F.15!==j){e(s.1d).w("3a.4k",9(t){t.4S();t.4T();t.1l();e(t.1d).Q("3a.4k")});a=e.4N(s.1d,"4V").3a;f=a.4W();a.4X(0,0,f)}}o("Q")}h r=c,i={2R:0,2P:0,4Y:0,2S:0,2h:14,4Z:14,50:14,2j:14,51:14,2L:14};r.29=j;r.$k.w(r.16.3W,".d-1p",u)},4j:9(){h e=c,t=e.4m();7(t>e.D){e.m=e.D;t=e.D}l 7(e.11>=0){t=0;e.m=0}p t},4m:9(){h t=c,n=t.6.12===j?t.3E:t.J,r=t.11,i=14;e.2f(n,9(s,o){7(r-t.M/20>n[s+1]&&r-t.M/20<o&&t.34()==="T"){i=o;7(t.6.12===j){t.m=e.4p(i,t.J)}l{t.m=s}}l 7(r+t.M/20<o&&r+t.M/20>(n[s+1]||n[s]-t.M)&&t.34()==="3i"){7(t.6.12===j){i=n[s+1]||n[n.N-1];t.m=e.4p(i,t.J)}l{i=n[s+1];t.m=s+1}}});p t.m},34:9(){h e=c,t;7(e.Y<0){t="3i";e.3u="U"}l{t="T";e.3u="1n"}p t},4A:9(){h e=c;e.$k.w("d.U",9(){e.U()});e.$k.w("d.1n",9(){e.1n()});e.$k.w("d.19",9(t,n){e.6.O=n;e.19();e.32="19"});e.$k.w("d.X",9(){e.X();e.32="X"});e.$k.w("d.1g",9(t,n){e.1g(n)});e.$k.w("d.2g",9(t,n){e.2g(n)})},2p:9(){h e=c;7(e.6.2p===j&&e.F.15!==j&&e.6.O!==b){e.$k.w("57",9(){e.X()});e.$k.w("58",9(){7(e.32!=="X"){e.19()}})}},1Z:9(){h t=c,n,r,i,s,o;7(t.6.1Z===b){p b}1A(n=0;n<t.E;n+=1){r=e(t.$G[n]);7(r.v("d-1e")==="1e"){4s}i=r.v("d-1K");s=r.17(".5b");7(A s.v("1J")!=="2Y"){r.v("d-1e","1e");4s}7(r.v("d-1e")===W){s.3K();r.I("4u").v("d-1e","5e")}7(t.6.4v===j){o=i>=t.m}l{o=j}7(o&&i<t.m+t.6.q&&s.N){t.4w(r,s)}}},4w:9(e,n){9 o(){e.v("d-1e","1e").Z("4u");n.5h("v-1J");7(r.6.4x==="4y"){n.5j(5k)}l{n.3J()}7(A r.6.2T==="9"){r.6.2T.R(c,[r.$k])}}9 u(){i+=1;7(r.2Q(n.3l(0))||s===j){o()}l 7(i<=2q){t.1c(u,2q)}l{o()}}h r=c,i=0,s;7(n.5p("5q")==="5r"){n.z("5s-5t","5u("+n.v("1J")+")");s=j}l{n[0].1J=n.v("1J")}u()},1B:9(){9 s(){h r=e(n.$G[n.m]).2G();n.1H.z("2G",r+"V");7(!n.1H.1I("1B")){t.1c(9(){n.1H.I("1B")},0)}}9 o(){i+=1;7(n.2Q(r.3l(0))){s()}l 7(i<=2q){t.1c(o,2q)}l{n.1H.z("2G","")}}h n=c,r=e(n.$G[n.m]).17("5w"),i;7(r.3l(0)!==W){i=0;o()}l{s()}},2Q:9(e){h t;7(!e.3M){p b}t=A e.4D;7(t!=="W"&&e.4D===0){p b}p j},4g:9(){h t=c,n;7(t.6.2F===j){t.$G.Z("2d")}t.1D=[];1A(n=t.m;n<t.m+t.6.q;n+=1){t.1D.2D(n);7(t.6.2F===j){e(t.$G[n]).I("2d")}}t.d.1D=t.1D},4n:9(e){h t=c;t.4G="d-"+e+"-5B";t.4H="d-"+e+"-38"},4l:9(){9 a(e){p{2h:"5D",T:e+"V"}}h e=c,t=e.4G,n=e.4H,r=e.$G.1S(e.m),i=e.$G.1S(e.13),s=1F.4J(e.J[e.m])+e.J[e.13],o=1F.4J(e.J[e.m])+e.M/2,u="5G 5H 5I 5J";e.1E=j;e.$K.I("d-1P").z({"-1G-P-1P":o+"V","-1W-4K-1P":o+"V","4K-1P":o+"V"});i.z(a(s,10)).I(t).w(u,9(){e.3m=j;i.Q(u);e.31(i,t)});r.I(n).w(u,9(){e.36=j;r.Q(u);e.31(r,n)})},31:9(e,t){h n=c;e.z({2h:"",T:""}).Z(t);7(n.3m&&n.36){n.$K.Z("d-1P");n.3m=b;n.36=b;n.1E=b}},4o:9(){h e=c;e.d={2A:e.2A,5P:e.$k,S:e.$S,G:e.$G,m:e.m,13:e.13,1D:e.1D,15:e.F.15,F:e.F,1y:e.1y}},3G:9(){h r=c;r.$k.Q(".d d 21.3X");e(n).Q(".d d");e(t).Q("44",r.3d)},1V:9(){h e=c;7(e.$k.25().N!==0){e.$K.3r();e.$S.3r().3r();7(e.B){e.B.3k()}}e.3G();e.$k.2x("2w",e.$k.v("d-4I")||"").2x("H",e.$k.v("d-4F"))},5T:9(){h e=c;e.X();t.18(e.1X);e.1V();e.$k.5U()},5V:9(t){h n=c,r=e.4M({},n.2A,t);n.1V();n.1N(r,n.$k)},5W:9(e,t){h n=c,r;7(!e){p b}7(n.$k.25().N===0){n.$k.1o(e);n.23();p b}n.1V();7(t===W||t===-1){r=-1}l{r=t}7(r>=n.$S.N||r===-1){n.$S.1S(-1).5X(e)}l{n.$S.1S(r).5Y(e)}n.23()},5Z:9(e){h t=c,n;7(t.$k.25().N===0){p b}7(e===W||e===-1){n=-1}l{n=e}t.1V();t.$S.1S(n).3k();t.23()}};e.37.2B=9(t){p c.2f(9(){7(e(c).v("d-1N")===j){p b}e(c).v("d-1N",j);h n=3c.3q(r);n.1N(t,c);e.v(c,"2B",n)})};e.37.2B.6={q:5,1h:b,1s:[60,4],1O:[61,3],22:[62,2],1Q:b,1R:[63,1],48:b,46:b,1m:2M,1w:64,2v:65,O:b,2p:b,2a:b,2U:["1n","U"],2e:j,12:b,1v:j,39:b,2Z:j,45:2M,47:t,1M:"d-66",2i:"d-2i",1Z:b,4v:j,4x:"4y",1B:b,2O:b,33:b,3f:j,27:j,1U:j,2F:b,2o:b,3B:b,3D:b,2H:b,3s:b,1Y:b,3y:b,3w:b,2E:b,2T:b}})(67,68,69)', 62, 382, '||||||options|if||function||false|this|owl||||var||true|elem|else|currentItem|||return|items|||||data|on|||css|typeof|owlControls|0px|maximumItem|itemsAmount|browser|owlItems|class|addClass|positionsInArray|owlWrapper|div|itemWidth|length|autoPlay|transform|off|apply|userItems|left|next|px|undefined|stop|newRelativeX|removeClass||newPosX|scrollPerPage|prevItem|null|isTouch|ev_types|find|clearInterval|play|transition|disabled|setTimeout|target|loaded|width|goTo|itemsCustom|translate3d|page|paginationWrapper|preventDefault|slideSpeed|prev|append|wrapper|buttonNext|css2slide|itemsDesktop|swapSpeed|buttonPrev|pagination|paginationSpeed|support3d|dragDirection|ms|for|autoHeight|autoPlayInterval|visibleItems|isTransition|Math|webkit|wrapperOuter|hasClass|src|item|transition3d|baseClass|init|itemsDesktopSmall|origin|itemsTabletSmall|itemsMobile|eq|isCss3Finish|touchDrag|unWrap|moz|checkVisible|beforeMove|lazyLoad||mousedown|itemsTablet|setVars|roundPages|children|prevArr|mouseDrag|mouseup|isCssFinish|navigation|touches|pageX|active|rewindNav|each|jumpTo|position|theme|sliding|rewind|eachMoveUpdate|is|touchend|transitionStyle|stopOnHover|100|afterGo|ease|orignalItems|opacity|rewindSpeed|style|attr|html|addCssSpeed|userOptions|owlCarousel|all|push|startDragging|addClassActive|height|beforeInit|newPosY|end|move|targetElement|200|touchmove|jsonPath|offsetY|completeImg|offsetX|relativePos|afterLazyLoad|navigationText|updateItems|calculateAll|touchstart|string|responsive|updateControls|clearTransStyle|hoverStatus|jsonSuccess|moveDirection|checkPagination|endCurrent|fn|in|paginationNumbers|click|grabbing|Object|resizer|checkNavigation|dragBeforeAnimFinish|event|originalEvent|right|checkAp|remove|get|endPrev|visible|watchVisibility|Number|create|unwrap|afterInit|logIn|playDirection|max|afterAction|updateVars|afterMove|maximumPixels|apStatus|beforeUpdate|dragging|afterUpdate|pagesInArray|reload|clearEvents|removeTransition|doTranslate|show|hide|css2move|complete|span|cssText|updatePagination|gestures|disabledEvents|buildButtons|buildPagination|mousemove|touchcancel|start|disableTextSelect|min|loops|calculateWidth|pageY|appendWrapperSizes|appendItemsSizes|resize|responsiveRefreshRate|itemsScaleUp|responsiveBaseWidth|singleItem|outer|wrap|animate|srcElement|setInterval|drag|updatePosition|onVisibleItems|block|display|getNewPosition|disable|singleItemTransition|closestItem|transitionTypes|owlStatus|inArray|moveEvents|response|continue|buildControls|loading|lazyFollow|lazyPreload|lazyEffect|fade|onStartup|customEvents|wrapItems|eventTypes|naturalWidth|checkBrowser|originalClasses|outClass|inClass|originalStyles|abs|perspective|loadContent|extend|_data|round|msMaxTouchPoints|5e3|text|stopImmediatePropagation|stopPropagation|buttons|events|pop|splice|baseElWidth|minSwipe|maxSwipe|dargging|clientX|clientY|duration|destroyControls|createElement|mouseover|mouseout|numbers|which|lazyOwl|appendTo|clearTimeout|checked|shift|sort|removeAttr|match|fadeIn|400|clickable|toggleClass|wrapAll|top|prop|tagName|DIV|background|image|url|wrapperWidth|img|500|dragstart|ontouchstart|controls|out|input|relative|textarea|select|webkitAnimationEnd|oAnimationEnd|MSAnimationEnd|animationend|getJSON|returnValue|hasOwnProperty|option|onstartup|baseElement|navigator|new|prototype|destroy|removeData|reinit|addItem|after|before|removeItem|1199|979|768|479|800|1e3|carousel|jQuery|window|document'.split('|'), 0, {}))