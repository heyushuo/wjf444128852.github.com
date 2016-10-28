(function(a, b) {
    var c = "createTouch" in document || "ontouchstart" in a || 0,
        d = document.documentElement || document.getElementsByTagName("html")[0],
        e = "WebkitTransition" in d.style || "MsTransition" in d.style || "MozTransition" in d.style || "OTransition" in d.style || "transition" in d.style || 0,
        f = c ? "touchstart" : "mousedown",
        g = c ? "touchmove" : "mousemove",
        h = c ? "touchend" : "mouseup",
        i = function(a) {
            this.opt = this.parse_args(a), this.container = this.$(this.opt.id);
            try {
                this.container.nodeName.toLowerCase() == "ul" ? (this.element = this.container, this.container = this.element.parentNode) : this.element = this.container.getElementsByTagName("ul")[0];
                if (typeof this.element == "undefined") throw new Error('Can\'t find "ul"');
                for (var b = 0; b < this.instance.length; b++)
                    if (this.instance[b] == this.container) throw new Error("An instance is running");
                this.instance.push(this.container), this.setup()
            } catch (c) {
                this.status = -1, this.errorInfo = c.message
            }
        };
    i.prototype = {
        _default: {
            id: "slider",
            fx: "ease-out",
            auto: 0,
            speed: 600,
            timeout: 5e3,
            className: "",
            direction: "left",
            mouseWheel: !1,
            before: new Function,
            after: new Function
        },
        instance: [],
        $: function(a) {
            return document.getElementById(a)
        },
        $E: function(a, b, c) {
            var d = [],
                e = c.getElementsByTagName(b);
            for (var f = 0, g = e.length; f < g; f++)(new RegExp("(?:^|\\s+)" + a + "(?:\\s+|$)")).test(e[f].className) && d.push(e[f]);
            return d
        },
        isIE: function() {
            return !-[1]
        },
        css: function() {
            var a = function(a) {
                    switch (a) {
                        case "float":
                            return "cssFloat" in document.body.style ? "cssFloat" : "styleFloat";
                        case "opacity":
                            return "opacity" in document.body.style ? "opacity" : {
                                get: function(a, b) {
                                    var c = b.filter;
                                    return c && c.indexOf("opacity") >= 0 && parseFloat(c.match(/opacity=([^)]*)/i)[1]) / 100 + "" || "1"
                                },
                                set: function(a, b) {
                                    a.style.filter = "alpha(opacity=" + b * 100 + ")", a.style.zoom = 1
                                }
                            };
                        default:
                            var b = a.split("-");
                            for (var c = 1; c < b.length; c++) b[c] = b[c].substring(0, 1).toUpperCase() + b[c].substring(1);
                            return a = b.join(""), a
                    }
                },
                b = function(b, c) {
                    c = a(c);
                    var d = b.style[c];
                    if (!d) {
                        var e = document.defaultView && document.defaultView.getComputedStyle && getComputedStyle(b, null) || b.currentStyle || b.style;
                        typeof c == "string" ? d = e[c] : d = c.get(b, e)
                    }
                    return d == "auto" ? "" : d
                },
                c = function(b, c) {
                    var d;
                    for (var e in c) d = a(e), typeof d == "string" ? b.style[d] = c[e] : d.set(b, c[e])
                };
            return function(a, d) {
                return typeof d == "string" ? b(a, d) : c(a, d)
            }
        }(),
        parse_args: function(a) {
            var b = {},
                c = Object.prototype.toString;
            if (a && c.call(a) == "[object Object]")
                for (var d in this._default) b[d] = typeof a[d] == "undefined" ? this._default[d] : c.call(this._default[d]) == "[object Number]" ? parseInt(parseFloat(a[d]) * 100) / 100 : a[d];
            else b = this._default;
            return b
        },
        addListener: function(a, b, c, d) {
            return a.addEventListener ? (a.addEventListener(b, c, d), !0) : a.attachEvent ? (a.attachEvent("on" + b, c), !0) : !1
        },
        getMousePoint: function(b) {
            var d = y = 0,
                e = document.documentElement,
                f = document.body;
            b || (b = a.event), a.pageYoffset ? (d = a.pageXOffset, y = a.pageYOffset) : (d = (e && e.scrollLeft || f && f.scrollLeft || 0) - (e && e.clientLeft || f && f.clientLeft || 0), y = (e && e.scrollTop || f && f.scrollTop || 0) - (e && e.clientTop || f && f.clientTop || 0));
            if (c && b.touches.length) {
                var g = b.touches[0];
                d += g.clientX, y += g.clientY
            } else d += b.clientX, y += b.clientY;
            return {
                x: d,
                y: y
            }
        },
        bind: function(a, b) {
            return function() {
                return a.apply(b, arguments)
            }
        },
        preventDefault: function(b) {
            a.event ? a.event.returnValue = !1 : b.preventDefault()
        },
        setup: function() {
            this.status = 0, this.slides = this.opt.className ? this.$E(this.opt.className, "li", this.element) : this.element.getElementsByTagName("li"), this.length = this.slides.length, this.opt.timeout = Math.max(this.opt.timeout, this.opt.speed), this.touching = !!c, this.css3transition = !!e, this.index = this.opt.auto < 0 || this.opt.auto >= this.length ? 0 : this.opt.auto;
            if (this.length < 2) return;
            switch (this.opt.direction) {
                case "up":
                    this.direction = "up", this.vertical = !0;
                    break;
                case "down":
                    this.direction = "down", this.vertical = !0;
                    break;
                case "right":
                    this.direction = "right", this.vertical = !1;
                    break;
                default:
                    this.direction = "left", this.vertical = !1
            }
            this.resize(), this.begin(), this.addListener(this.element, f, this.bind(this._start, this), !1), this.addListener(document, g, this.bind(this._move, this), !1), this.addListener(document, h, this.bind(this._end, this), !1), this.addListener(this.element, "webkitTransitionEnd", this.bind(this._transitionend, this), !1), this.addListener(this.element, "msTransitionEnd", this.bind(this._transitionend, this), !1), this.addListener(this.element, "oTransitionEnd", this.bind(this._transitionend, this), !1), this.addListener(this.element, "transitionend", this.bind(this._transitionend, this), !1), this.addListener(a, "resize", this.bind(function() {
                clearTimeout(this.resizeTimer), this.resizeTimer = setTimeout(this.bind(this.resize, this), 100)
            }, this), !1), this.addListener(this.element, "mousewheel", this.bind(this.mouseScroll, this), !1), this.addListener(this.element, "DOMMouseScroll", this.bind(this.mouseScroll, this), !1)
        },
        resize: function() {
            var a;
            this.css(this.container, {
                overflow: "hidden",
                visibility: "hidden",
                listStyle: "none",
                position: "relative"
            }), this.width = this.container.clientWidth - parseInt(this.css(this.container, "padding-left")) - parseInt(this.css(this.container, "padding-right")), this.height = this.container.clientHeight - parseInt(this.css(this.container, "padding-top")) - parseInt(this.css(this.container, "padding-bottom")), a = {
                position: "relative",
                webkitTransitionDuration: "0ms",
                MozTransitionDuration: "0ms",
                msTransitionDuration: "0ms",
                OTransitionDuration: "0ms",
                transitionDuration: "0ms"
            }, this.vertical ? (a.height = this.height * this.length + "px", a.top = -this.height * this.index + "px", this.css(this.container, {
                // height: this.height + "px"
            })) : (a.width = this.width * this.length + "px", a.left = -this.width * this.index + "px"), this.css(this.element, a);
            for (var b = 0; b < this.length; b++) this.css(this.slides[b], {
                width: this.width + "px",
                // height: this.height + "px",
                display: this.vertical ? "table-row" : "table-cell",
                padding: 0,
                margin: 0,
                "float": "left",
                verticalAlign: "top"
            });
            this.css(this.container, {
                visibility: "visible"
            })
        },
        slide: function(a, b) {
            var c = this.vertical ? "top" : "left",
                d = this.vertical ? "height" : "width";
            a = a < 0 ? this.length - 1 : a >= this.length ? 0 : a, b = typeof b == "undefined" ? this.opt.speed : parseInt(b);
            var f = this.element,
                g = null,
                h = f.style,
                i = this,
                j = 0,
                k = parseInt(h[c]) || 0,
                l = -a * this[d] - k,
                m = Math.abs(l) < this[d] ? Math.ceil(Math.abs(l) / this[d] * b / 10) : b / 10,
                n = function(a, b, c, d) {
                    return -c * ((a = a / d - 1) * a * a * a - 1) + b
                },
                o = function() {
                    j < m && !e ? (j++, h[c] = Math.ceil(n(j, k, l, m)) + "px", g = setTimeout(o, 10)) : (h[c] = -i[d] * a + "px", i.index = a, e || i._transitionend(), i.pause(), i.begin())
                };
            h.WebkitTransition = h.MozTransition = h.msTransition = h.OTransition = h.transition = c + " " + m * 10 + "ms " + this.opt.fx, this.opt.before.call(this, a, this.slides[this.index]), o()
        },
        begin: function() {
            if (this.timer || this.opt.auto < 0) return !0;
            this.timer = setTimeout(this.bind(function() {
                this.direction == "left" || this.direction == "up" ? this.next() : this.prev()
            }, this), this.opt.timeout), this.status = 1
        },
        pause: function() {
            clearInterval(this.timer), this.timer = null, this.status = 2
        },
        stop: function() {
            this.pause(), this.index = 0, this.slide(0), this.status = 0
        },
        prev: function(a) {
            a = typeof a == "undefined" ? a = 1 : a % this.length;
            var b = a > this.index ? this.length + this.index - a : this.index - a;
            this.slide(b)
        },
        next: function(a) {
            typeof a == "undefined" && (a = 1), this.slide((this.index + a) % this.length)
        },
        _start: function(a) {
            this.touching || this.preventDefault(a), this.element.onclick = null, this.startPos = this.getMousePoint(a);
            var b = this.element.style;
            b.webkitTransitionDuration = b.MozTransitionDuration = b.msTransitionDuration = b.OTransitionDuration = b.transitionDuration = "0ms", this.scrolling = 1, this.startTime = new Date
        },
        _move: function(a) {
            if (!this.scrolling || a.touches && a.touches.length > 1 || a.scale && a.scale !== 1) return;
            var b = this.vertical ? "top" : "left",
                c = this.vertical ? "height" : "width",
                d = this.vertical ? "y" : "x",
                e = this.vertical ? "x" : "y";
            this.endPos = this.getMousePoint(a);
            var f = this.endPos[d] - this.startPos[d];
            this.scrolling === 2 || Math.abs(f) >= Math.abs(this.endPos[e] - this.startPos[e]) ? (this.preventDefault(a), this.pause(), f /= !this.index && f > 0 || this.index == this.length - 1 && f < 0 ? Math.abs(f) / this[c] + 1 : 1, this.element.style[b] = -this.index * this[c] + f + "px", f != 0 && (this.scrolling = 2)) : this.scrolling = 0
        },
        _end: function(a) {
            if (typeof this.scrolling != "undefined") {
                try {
                    var b = this.vertical ? "y" : "x",
                        c = this.vertical ? "height" : "width",
                        d = this.endPos[b] - this.startPos[b];
                    this.scrolling === 2 && (this.element.onclick = new Function("return false;"))
                } catch (e) {
                    d = 0
                }(new Date - this.startTime < 250 && Math.abs(d) > this[c] * .1 || Math.abs(d) > this[c] / 2) && (d < 0 && this.index + 1 < this.length || d > 0 && this.index > 0) ? d > 0 ? this.prev() : this.next(): this.slide(this.index), delete this.scrolling, delete this.startPos, delete this.endPos, delete this.startTime, this.opt.auto >= 0 && this.begin()
            }
        },
        mouseScroll: function(b) {
            if (this.opt.mouseWheel) {
                this.preventDefault(b), b = b || a.event;
                var c = b.wheelDelta || b.detail && b.detail * -1 || 0,
                    d = c / Math.abs(c);
                c > 0 ? this.next() : this.prev()
            }
        },
        _transitionend: function(a) {
            this.opt.after.call(this, this.index, this.slides[this.index])
        }
    }, a.TouchSlider = i
})(window, undefined)
