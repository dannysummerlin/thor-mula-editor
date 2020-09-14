var VueMention = function(e, t) {
    "use strict";
    function n(e, t) {
        return function(e) {
            if (Array.isArray(e))
                return e
        }(e) || function(e, t) {
            if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(e)))
                return;
            var n = []
              , i = !0
              , o = !1
              , r = void 0;
            try {
                for (var s, a = e[Symbol.iterator](); !(i = (s = a.next()).done) && (n.push(s.value),
                !t || n.length !== t); i = !0)
                    ;
            } catch (e) {
                o = !0,
                r = e
            } finally {
                try {
                    i || null == a.return || a.return()
                } finally {
                    if (o)
                        throw r
                }
            }
            return n
        }(e, t) || function(e, t) {
            if (!e)
                return;
            if ("string" == typeof e)
                return i(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            "Object" === n && e.constructor && (n = e.constructor.name);
            if ("Map" === n || "Set" === n)
                return Array.from(n);
            if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
                return i(e, t)
        }(e, t) || function() {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }()
    }
    function i(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, i = new Array(t); n < t; n++)
            i[n] = e[n];
        return i
    }
    var o = function(e, t) {
        return e(t = {
            exports: {}
        }, t.exports),
        t.exports
    }((function(e) {
        var t, n, i;
        t = ["direction", "boxSizing", "width", "height", "overflowX", "overflowY", "borderTopWidth", "borderRightWidth", "borderBottomWidth", "borderLeftWidth", "borderStyle", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "fontStyle", "fontVariant", "fontWeight", "fontStretch", "fontSize", "fontSizeAdjust", "lineHeight", "fontFamily", "textAlign", "textTransform", "textIndent", "textDecoration", "letterSpacing", "wordSpacing", "tabSize", "MozTabSize"],
        n = "undefined" != typeof window,
        i = n && null != window.mozInnerScreenX,
        e.exports = function(e, o, r) {
            if (!n)
                throw new Error("textarea-caret-position#getCaretCoordinates should only be called in a browser");
            var s = r && r.debug || !1;
            if (s) {
                var a = document.querySelector("#input-textarea-caret-position-mirror-div");
                a && a.parentNode.removeChild(a)
            }
            var l = document.createElement("div");
            l.id = "input-textarea-caret-position-mirror-div",
            document.body.appendChild(l);
            var u = l.style
              , c = window.getComputedStyle ? window.getComputedStyle(e) : e.currentStyle
              , d = "INPUT" === e.nodeName || "TEXTAREA" === e.nodeName;
            u.whiteSpace = "pre-wrap",
            d || (u.wordWrap = "break-word"),
            u.position = "absolute",
            s || (u.visibility = "hidden"),
            t.forEach((function(e) {
                d && "lineHeight" === e ? u.lineHeight = c.height : u[e] = c[e]
            }
            )),
            i ? e.scrollHeight > parseInt(c.height) && (u.overflowY = "scroll") : u.overflow = "hidden",
            l.textContent = e.value.substring(0, o),
            d && (l.textContent = l.textContent.replace(/\s/g, " "));
            var h = document.createElement("span");
            h.textContent = e.value.substring(o) || ".",
            l.appendChild(h);
            var p = {
                top: h.offsetTop + parseInt(c.borderTopWidth),
                left: h.offsetLeft + parseInt(c.borderLeftWidth),
                height: parseInt(c.lineHeight)
            };
            return s ? h.style.backgroundColor = "#aaa" : document.body.removeChild(l),
            p
        }
    }
    ))
      , r = "undefined" != typeof window ? window.navigator.userAgent : ""
      , s = -1 !== r.indexOf("MSIE ") || -1 !== r.indexOf("Trident/");
    const a = function(e, t, n, i, o, r, s, a, l, u) {
        "boolean" != typeof s && (l = a,
        a = s,
        s = !1);
        var c, d = "function" == typeof n ? n.options : n;
        if (e && e.render && (d.render = e.render,
        d.staticRenderFns = e.staticRenderFns,
        d._compiled = !0,
        o && (d.functional = !0)),
        i && (d._scopeId = i),
        r ? (c = function(e) {
            (e = e || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) || "undefined" == typeof __VUE_SSR_CONTEXT__ || (e = __VUE_SSR_CONTEXT__),
            t && t.call(this, l(e)),
            e && e._registeredComponents && e._registeredComponents.add(r)
        }
        ,
        d._ssrRegister = c) : t && (c = s ? function(e) {
            t.call(this, u(e, this.$root.$options.shadowRoot))
        }
        : function(e) {
            t.call(this, a(e))
        }
        ),
        c)
            if (d.functional) {
                var h = d.render;
                d.render = function(e, t) {
                    return c.call(t),
                    h(e, t)
                }
            } else {
                var p = d.beforeCreate;
                d.beforeCreate = p ? [].concat(p, c) : [c]
            }
        return n
    }({
        render: function() {
            var e = this
              , t = e.$createElement
              , n = e._self._c || t;
            return n("div", {
                staticClass: "mentionable",
                staticStyle: {
                    position: "relative"
                }
            }, [e._t("default"), e._v(" "), n("VPopover", e._b({
                ref: "popper",
                staticClass: "popper",
                staticStyle: {
                    position: "absolute"
                },
                style: e.caretPosition ? {
                    top: e.caretPosition.top + "px",
                    left: e.caretPosition.left + "px"
                } : {},
                attrs: {
                    placement: e.placement,
                    html: true,
                    open: !!e.key,
                    trigger: "manual",
                    "auto-hide": !1
                },
                scopedSlots: e._u([{
                    key: "popover",
                    fn: function() {
                        return [e.displayedItems.length ? e._l(e.displayedItems, (function(t, i) {
                            return n("div", {
                                key: i,
                                staticClass: "mention-item",
                                class: {
                                    "mention-selected": e.selectedIndex === i
                                },
                                on: {
                                    mouseover: function(t) {
                                        e.selectedIndex = i
                                    },
                                    mousedown: function(t) {
                                        return e.applyMention(i)
                                    }
                                }
                            }, [e._t("item-" + (e.key || e.oldKey), [e._t("item", [e._v("\n              " + e._s(t.label || t.value) + "\n            ")], {
                                item: t,
                                index: i
                            })], {
                                item: t,
                                index: i
                            })], 2)
                        }
                        )) : n("div", [e._t("no-result", [e._v("\n          No result\n        ")])], 2)]
                    },
                    proxy: !0
                }], null, !0)
            }, "VPopover", e.$attrs, !1), [n("div", {
                style: e.caretPosition ? {
                    height: e.caretPosition.height + "px"
                } : {}
            })])], 2)
        },
        staticRenderFns: []
    }, void 0, {
        components: {
            VPopover: t.VPopover
        },
        inheritAttrs: !1,
        props: {
            keys: {
                type: Array,
                required: !0
            },
            placement: {
                type: String,
                default: "top-start"
            },
            items: {
                type: Array,
                default: function() {
                    return []
                }
            },
            omitKey: {
                type: Boolean,
                default: !1
            },
            filteringDisabled: {
                type: Boolean,
                default: !1
            },
            insertSpace: {
                type: Boolean,
                default: !1
            },
            mapInsert: {
                type: Function,
                default: null
            },
            limit: {
                type: Number,
                default: 8
            }
        },
        data: function() {
            return {
                key: null,
                oldKey: null,
                searchText: null,
                caretPosition: null,
                selectedIndex: 0
            }
        },
        computed: {
            filteredItems: function() {
                if (!this.searchText || this.filteringDisabled)
                    return this.items;
                const ignoreCharacters = /[.*+?^${}()|[\]\\]/g
                var e = new RegExp(this.searchText.replace(ignoreCharacters,''),"i");
                return this.items.filter((function(t) {
                    if (t.searchText)
                        return e.test(t.searchText);
                    if (t.label)
                        return e.test(t.label);
                    var n = "";
                    for (var i in t)
                        n += t[i];
                    return e.test(n)
                }
                ))
            },
            displayedItems: function() {
                return this.filteredItems.slice(0, this.limit)
            }
        },
        watch: {
            displayedItems: function() {
                this.selectedIndex = 0
            },
            searchText: function(e, t) {
                e && this.$emit("search", e, t)
            }
        },
        mounted: function() {
            this.input = this.getInput(),
            this.attach()
        },
        updated: function() {
            var e = this.getInput();
            e !== this.input && (this.detach(),
            this.input = e,
            this.attach())
        },
        beforeDestroy: function() {
            this.detach()
        },
        methods: {
            getInput: function() {
                var e = n(this.$scopedSlots.default(), 1)[0]
                const i = e.elm.tagName == 'DIV' ? e.elm.querySelector('textarea') : e.elm
                return i ? i : e.elm.querySelector('input')
            },
            attach: function() {
                this.input && (this.input.addEventListener("input", this.onInput),
                this.input.addEventListener("keydown", this.onKeyDown),
                this.input.addEventListener("keyup", this.onKeyUp),
                this.input.addEventListener("scroll", this.onScroll),
                this.input.addEventListener("blur", this.onBlur))
            },
            detach: function() {
                this.input && (this.input.removeEventListener("input", this.onInput),
                this.input.removeEventListener("keydown", this.onKeyDown),
                this.input.removeEventListener("keyup", this.onKeyUp),
                this.input.removeEventListener("scroll", this.onScroll),
                this.input.removeEventListener("blur", this.onBlur))
            },
            onInput: function() {
                this.checkKey()
            },
            onBlur: function() {
                this.closeMenu()
            },
            onKeyDown: function(e) {
                this.key && ("ArrowDown" !== e.key && 40 !== e.keyCode || (this.selectedIndex++,
                this.selectedIndex >= this.displayedItems.length && (this.selectedIndex = 0),
                this.cancelEvent(e)),
                "ArrowUp" !== e.key && 38 !== e.keyCode || (this.selectedIndex--,
                this.selectedIndex < 0 && (this.selectedIndex = this.displayedItems.length - 1),
                this.cancelEvent(e)),
                ("Enter" === e.key || "Tab" === e.key || 13 === e.keyCode || 9 === e.keyCode) && this.displayedItems.length > 0 && (this.applyMention(this.selectedIndex),
                this.cancelEvent(e)),
                "Escape" !== e.key && 27 !== e.keyCode || (this.closeMenu(),
                this.cancelEvent(e)))
            },
            onKeyUp: function(e) {
                !this.cancelKeyUp || e.key !== this.cancelKeyUp && e.keyCode !== this.cancelKeyCode || this.cancelEvent(e),
                this.cancelKeyUp = null,
                this.cancelKeyCode = null
            },
            cancelEvent: function(e) {
                e.preventDefault(),
                e.stopPropagation(),
                this.cancelKeyUp = e.key,
                this.cancelKeyCode = e.keyCode
            },
            onScroll: function() {
                this.updateCaretPosition()
            },
            getSelectionStart: function() {
                return this.input.selectionStart
            },
            setCaretPosition: function(e) {
                var t = this;
                this.$nextTick((function() {
                    t.input.selectionEnd = e
                }
                ))
            },
            getValue: function() {
                return this.input.value
            },
            setValue: function(e) {
                this.input.value = e,
                this.emitInputEvent("input")
            },
            emitInputEvent: function(e) {
                var t;
                s ? (t = document.createEvent("Event")).initEvent(e, !0, !0) : t = new Event(e),
                this.input.dispatchEvent(t)
            },
            checkKey: function() {
                var e = this.getSelectionStart();
                if (e >= 0) {
                    var t = this.getLastKeyBeforeCaret(e)
                      , n = t.key
                      , i = t.keyIndex
                      , o = this.getLastSearchText(e, i);
                    if (null != o)
                        return this.openMenu(n, i),
                        this.searchText = o,
                        !0
                }
                return this.closeMenu(),
                !1
            },
            getLastKeyBeforeCaret: function(e) {
                var t = this;
                return n(this.keys.map((function(n) {
                    return {
                        key: n,
                        keyIndex: t.getValue().lastIndexOf(n, e - 1)
                    }
                }
                )).sort((function(e, t) {
                    return t.keyIndex - e.keyIndex
                }
                )), 1)[0]
            },
            getLastSearchText: function(e, t) {
                if (-1 !== t) {
                    var n = this.getValue().substring(t + 1, e);
                    if (!/\s/.test(n))
                        return n
                }
                return null
            },
            openMenu: function(e, t) {
                this.key !== e && (this.key = e,
                this.keyIndex = t,
                this.updateCaretPosition(),
                this.selectedIndex = 0,
                this.$emit("open", e))
            },
            closeMenu: function() {
                this.oldKey = this.key,
                this.key = null
            },
            updateCaretPosition: function() {
                this.key && (this.caretPosition = o(this.input, this.keyIndex),
                this.caretPosition.top -= this.input.scrollTop,
                this.$refs.popper && this.$refs.popper.popperInstance && this.$refs.popper.popperInstance.scheduleUpdate())
            },
            applyMention: function(e) {
                var t = this.displayedItems[e]
                  , n = (this.omitKey ? "" : this.key) + String(this.mapInsert ? this.mapInsert(t, this.key) : t.value) + (this.insertSpace ? " " : "");
                this.setValue(this.replaceText(this.getValue(), this.searchText, n, this.keyIndex)),
                this.setCaretPosition(this.keyIndex + n.length),
                this.closeMenu()
            },
            replaceText: function(e, t, n, i) {
                return e.slice(0, i) + n + e.slice(i + t.length + 1, e.length)
            }
        }
    }, void 0, !1, void 0, !1, void 0, void 0, void 0);
    var l = {
        version: "0.1.7",
        install: function(e, t) {
            var n = Object.assign({}, {
                installComponents: !0,
                componentsPrefix: ""
            }, t);
            n.installComponents && function(e, t) {
                e.component("".concat(t, "mentionable"), a),
                e.component("".concat(t, "Mentionable"), a)
            }(e, n.componentsPrefix)
        }
    }
      , u = null;
    return "undefined" != typeof window ? u = window.Vue : "undefined" != typeof global && (u = global.Vue),
    u && u.use(l),
    e.Mentionable = a,
    e.default = l,
    e
}({}, VTooltip);
//# sourceMappingURL=vue-mention.min.js.map