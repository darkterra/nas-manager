/*
 * SystemJS v0.19.16
 */
! function() {
    function e() {
        ! function(e) {
            function t(e, t) {
                var n;
                return e instanceof Error ? (n = new Error(e.message, e.fileName, e.lineNumber), M ? (n.message = e.message + "\n	" + t, n.stack = e.stack) : (n.message = e.message, n.stack = e.stack + "\n	" + t)) : n = e + "\n	" + t, n
            }

            function n(e, n, r) {
                try {
                    new Function(e).call(r)
                } catch (a) {
                    throw t(a, "Evaluating " + n)
                }
            }

            function r() {}

            function a(t) {
                this._loader = {
                    loaderObj: this,
                    loads: [],
                    modules: {},
                    importPromises: {},
                    moduleRecords: {}
                }, z(this, "global", {
                    get: function() {
                        return e
                    }
                })
            }

            function o() {
                a.call(this), this.paths = {}
            }

            function i(e, t) {
                var n, r = "",
                    a = 0;
                for (var o in e) {
                    var i = o.split("*");
                    if (i.length > 2) throw new TypeError("Only one wildcard in a path is permitted");
                    if (1 == i.length) {
                        if (t == o) {
                            r = o;
                            break
                        }
                    } else {
                        var s = i[0].length;
                        s >= a && t.substr(0, i[0].length) == i[0] && t.substr(t.length - i[1].length) == i[1] && (a = s, r = o, n = t.substr(i[0].length, t.length - i[1].length - i[0].length))
                    }
                }
                var l = e[r];
                return "string" == typeof n && (l = l.replace("*", n)), l
            }

            function s() {}

            function l() {
                o.call(this), U.call(this)
            }

            function u() {}

            function d(e, t) {
                l.prototype[e] = t(l.prototype[e] || function() {})
            }

            function c(e) {
                U = e(U || function() {})
            }

            function f(e) {
                for (var t = [], n = [], r = 0, a = e.length; a > r; r++) {
                    var o = T.call(t, e[r]); - 1 === o ? (t.push(e[r]), n.push([r])) : n[o].push(r)
                }
                return {
                    names: t,
                    indices: n
                }
            }

            function m(e) {
                var t = {};
                if ("object" == typeof e || "function" == typeof e)
                    if (J) {
                        var n;
                        for (var r in e)(n = Object.getOwnPropertyDescriptor(e, r)) && z(t, r, n)
                    } else {
                        var a = e && e.hasOwnProperty;
                        for (var r in e)(!a || e.hasOwnProperty(r)) && (t[r] = e[r])
                    }
                return t["default"] = e, z(t, "__useDefault", {
                    value: !0
                }), t
            }

            function p(e, t, n) {
                for (var r in t) n && r in e || (e[r] = t[r]);
                return e
            }

            function h(e, t, n) {
                for (var r in t) {
                    var a = t[r];
                    r in e ? a instanceof Array && e[r] instanceof Array ? e[r] = [].concat(n ? a : e[r]).concat(n ? e[r] : a) : "object" == typeof a && null !== a && "object" == typeof e[r] ? e[r] = p(p({}, e[r]), a, n) : n || (e[r] = a) : e[r] = a
                }
            }

            function g(e) {
                this.warnings && "undefined" != typeof console && console.warn
            }

            function v(e, t) {
                for (var n = e.split("."); n.length;) t = t[n.shift()];
                return t
            }

            function y() {
                if (X[this.baseURL]) return X[this.baseURL];
                "/" != this.baseURL[this.baseURL.length - 1] && (this.baseURL += "/");
                var e = new F(this.baseURL, L);
                return this.baseURL = e.href, X[this.baseURL] = e
            }

            function b(e, t) {
                var n, r = 0;
                for (var a in e)
                    if (t.substr(0, a.length) == a && (t.length == a.length || "/" == t[a.length])) {
                        var o = a.split("/").length;
                        if (r >= o) continue;
                        n = a, r = o
                    }
                return n
            }

            function x(e) {
                this.set("@system-env", this.newModule({
                    browser: M,
                    node: !!this._nodeRequire,
                    env: e,
                    production: "production" == e,
                    development: "development" == e
                }))
            }

            function w(e) {
                var t = e.match(V);
                return t && "System.register" == e.substr(t[0].length, 15)
            }

            function S() {
                return {
                    name: null,
                    deps: null,
                    originalIndices: null,
                    declare: null,
                    execute: null,
                    executingRequire: !1,
                    declarative: !1,
                    normalizedDeps: null,
                    groupIndex: null,
                    evaluated: !1,
                    module: null,
                    esModule: null,
                    esmExports: !1
                }
            }

            function E(e) {
                var t, n, r, r = "~" == e[0],
                    a = e.lastIndexOf("|");
                return -1 != a ? (t = e.substr(a + 1), n = e.substr(r, a - r) || "@system-env") : (t = null, n = e.substr(r)), {
                    module: n,
                    prop: t,
                    negate: r
                }
            }

            function _(e) {
                return (e.negate ? "~" : "") + e.module + (e.prop ? "|" + e.prop : "")
            }

            function k(e, t, n) {
                return this["import"](e.module, t).then(function(t) {
                    return e.prop ? t = v(e.prop, t) : "object" == typeof t && t + "" == "Module" && (t = t["default"]), e.negate ? !t : t
                })
            }

            function j(e, t) {
                var n = e.match(Y);
                if (!n) return Promise.resolve(e);
                var r = E(n[0].substr(2, n[0].length - 3));
                return this.builder ? this.normalize(r.module, t).then(function(t) {
                    return r.module = t, e.replace(Y, "#{" + _(r) + "}")
                }) : k.call(this, r, t, !1).then(function(n) {
                    if ("string" != typeof n) throw new TypeError("The condition value for " + e + " doesn't resolve to a string.");
                    if (-1 != n.indexOf("/")) throw new TypeError("Unabled to interpolate conditional " + e + (t ? " in " + t : "") + "\n	The condition value " + n + ' cannot contain a "/" separator.');
                    return e.replace(Y, n)
                })
            }

            function P(e, t) {
                var n = e.lastIndexOf("#?");
                if (-1 == n) return Promise.resolve(e);
                var r = E(e.substr(n + 2));
                return this.builder ? this.normalize(r.module, t).then(function(t) {
                    return r.module = t, e.substr(0, n) + "#?" + _(r)
                }) : k.call(this, r, t, !0).then(function(t) {
                    return t ? e.substr(0, n) : "@empty"
                })
            }
            var R = "undefined" == typeof window && "undefined" != typeof self && "undefined" != typeof importScripts,
                M = "undefined" != typeof window && "undefined" != typeof document,
                O = "undefined" != typeof process && "undefined" != typeof process.platform && !!process.platform.match(/^win/);
            e.console || (e.console = {
                assert: function() {}
            });
            var z, T = Array.prototype.indexOf || function(e) {
                for (var t = 0, n = this.length; n > t; t++)
                    if (this[t] === e) return t;
                return -1
            };
            ! function() {
                try {
                    Object.defineProperty({}, "a", {}) && (z = Object.defineProperty)
                } catch (e) {
                    z = function(e, t, n) {
                        try {
                            e[t] = n.value || n.get.call(e)
                        } catch (r) {}
                    }
                }
            }();
            var L;
            if ("undefined" != typeof document && document.getElementsByTagName) {
                if (L = document.baseURI, !L) {
                    var I = document.getElementsByTagName("base");
                    L = I[0] && I[0].href || window.location.href
                }
                L = L.split("#")[0].split("?")[0], L = L.substr(0, L.lastIndexOf("/") + 1)
            } else if ("undefined" != typeof process && process.cwd) L = "file://" + (O ? "/" : "") + process.cwd() + "/", O && (L = L.replace(/\\/g, "/"));
            else {
                if ("undefined" == typeof location) throw new TypeError("No environment baseURI");
                L = e.location.href
            }
            var F = e.URLPolyfill || e.URL;
            z(r.prototype, "toString", {
                    value: function() {
                        return "Module"
                    }
                }),
                function() {
                    function o(e) {
                        return {
                            status: "loading",
                            name: e,
                            linkSets: [],
                            dependencies: [],
                            metadata: {}
                        }
                    }

                    function i(e, t, n) {
                        return new Promise(c({
                            step: n.address ? "fetch" : "locate",
                            loader: e,
                            moduleName: t,
                            moduleMetadata: n && n.metadata || {},
                            moduleSource: n.source,
                            moduleAddress: n.address
                        }))
                    }

                    function s(e, t, n, r) {
                        return new Promise(function(a, o) {
                            a(e.loaderObj.normalize(t, n, r))
                        }).then(function(t) {
                            var n;
                            if (e.modules[t]) return n = o(t), n.status = "linked", n.module = e.modules[t], n;
                            for (var r = 0, a = e.loads.length; a > r; r++)
                                if (n = e.loads[r], n.name == t) return n;
                            return n = o(t), e.loads.push(n), l(e, n), n
                        })
                    }

                    function l(e, t) {
                        u(e, t, Promise.resolve().then(function() {
                            return e.loaderObj.locate({
                                name: t.name,
                                metadata: t.metadata
                            })
                        }))
                    }

                    function u(e, t, n) {
                        d(e, t, n.then(function(n) {
                            return "loading" == t.status ? (t.address = n, e.loaderObj.fetch({
                                name: t.name,
                                metadata: t.metadata,
                                address: n
                            })) : void 0
                        }))
                    }

                    function d(t, r, a) {
                        a.then(function(a) {
                            return "loading" == r.status ? Promise.resolve(t.loaderObj.translate({
                                name: r.name,
                                metadata: r.metadata,
                                address: r.address,
                                source: a
                            })).then(function(e) {
                                return r.source = e, t.loaderObj.instantiate({
                                    name: r.name,
                                    metadata: r.metadata,
                                    address: r.address,
                                    source: e
                                })
                            }).then(function(a) {
                                if (void 0 === a) return r.address = r.address || "<Anonymous Module " + ++_ + ">", r.isDeclarative = !0, E.call(t.loaderObj, r).then(function(t) {
                                    var a = e.System,
                                        o = a.register;
                                    a.register = function(e, t, n) {
                                        "string" != typeof e && (n = t, t = e), r.declare = n, r.depsList = t
                                    }, n(t, r.address, {}), a.register = o
                                });
                                if ("object" != typeof a) throw TypeError("Invalid instantiate return value");
                                r.depsList = a.deps || [], r.execute = a.execute, r.isDeclarative = !1
                            }).then(function() {
                                r.dependencies = [];
                                for (var e = r.depsList, n = [], a = 0, o = e.length; o > a; a++)(function(e, a) {
                                    n.push(s(t, e, r.name, r.address).then(function(t) {
                                        if (r.dependencies[a] = {
                                                key: e,
                                                value: t.name
                                            }, "linked" != t.status)
                                            for (var n = r.linkSets.concat([]), o = 0, i = n.length; i > o; o++) m(n[o], t)
                                    }))
                                })(e[a], a);
                                return Promise.all(n)
                            }).then(function() {
                                r.status = "loaded";
                                for (var e = r.linkSets.concat([]), t = 0, n = e.length; n > t; t++) h(e[t], r)
                            }) : void 0
                        })["catch"](function(e) {
                            r.status = "failed", r.exception = e;
                            for (var t = r.linkSets.concat([]), n = 0, a = t.length; a > n; n++) g(t[n], r, e)
                        })
                    }

                    function c(e) {
                        return function(t, n) {
                            var r = e.loader,
                                a = e.moduleName,
                                i = e.step;
                            if (r.modules[a]) throw new TypeError('"' + a + '" already exists in the module table');
                            for (var s, c = 0, m = r.loads.length; m > c; c++)
                                if (r.loads[c].name == a && (s = r.loads[c], "translate" != i || s.source || (s.address = e.moduleAddress, d(r, s, Promise.resolve(e.moduleSource))), s.linkSets.length && s.linkSets[0].loads[0].name == s.name)) return s.linkSets[0].done.then(function() {
                                    t(s)
                                });
                            var p = s || o(a);
                            p.metadata = e.moduleMetadata;
                            var h = f(r, p);
                            r.loads.push(p), t(h.done), "locate" == i ? l(r, p) : "fetch" == i ? u(r, p, Promise.resolve(e.moduleAddress)) : (p.address = e.moduleAddress, d(r, p, Promise.resolve(e.moduleSource)))
                        }
                    }

                    function f(e, t) {
                        var n = {
                            loader: e,
                            loads: [],
                            startingLoad: t,
                            loadingCount: 0
                        };
                        return n.done = new Promise(function(e, t) {
                            n.resolve = e, n.reject = t
                        }), m(n, t), n
                    }

                    function m(e, t) {
                        if ("failed" != t.status) {
                            for (var n = 0, r = e.loads.length; r > n; n++)
                                if (e.loads[n] == t) return;
                            e.loads.push(t), t.linkSets.push(e), "loaded" != t.status && e.loadingCount++;
                            for (var a = e.loader, n = 0, r = t.dependencies.length; r > n; n++)
                                if (t.dependencies[n]) {
                                    var o = t.dependencies[n].value;
                                    if (!a.modules[o])
                                        for (var i = 0, s = a.loads.length; s > i; i++)
                                            if (a.loads[i].name == o) {
                                                m(e, a.loads[i]);
                                                break
                                            }
                                }
                        }
                    }

                    function p(e) {
                        var t = !1;
                        try {
                            x(e, function(n, r) {
                                g(e, n, r), t = !0
                            })
                        } catch (n) {
                            g(e, null, n), t = !0
                        }
                        return t
                    }

                    function h(e, t) {
                        if (e.loadingCount--, !(e.loadingCount > 0)) {
                            var n = e.startingLoad;
                            if (e.loader.loaderObj.execute === !1) {
                                for (var r = [].concat(e.loads), a = 0, o = r.length; o > a; a++) {
                                    var t = r[a];
                                    t.module = t.isDeclarative ? {
                                        name: t.name,
                                        module: k({}),
                                        evaluated: !0
                                    } : {
                                        module: k({})
                                    }, t.status = "linked", v(e.loader, t)
                                }
                                return e.resolve(n)
                            }
                            var i = p(e);
                            i || e.resolve(n)
                        }
                    }

                    function g(e, n, r) {
                        var a = e.loader;
                        e: if (n)
                            if (e.loads[0].name == n.name) r = t(r, "Error loading " + n.name);
                            else {
                                for (var o = 0; o < e.loads.length; o++)
                                    for (var i = e.loads[o], s = 0; s < i.dependencies.length; s++) {
                                        var l = i.dependencies[s];
                                        if (l.value == n.name) {
                                            r = t(r, "Error loading " + n.name + ' as "' + l.key + '" from ' + i.name);
                                            break e
                                        }
                                    }
                                r = t(r, "Error loading " + n.name + " from " + e.loads[0].name)
                            } else r = t(r, "Error linking " + e.loads[0].name);
                        for (var u = e.loads.concat([]), o = 0, d = u.length; d > o; o++) {
                            var n = u[o];
                            a.loaderObj.failed = a.loaderObj.failed || [], -1 == T.call(a.loaderObj.failed, n) && a.loaderObj.failed.push(n);
                            var c = T.call(n.linkSets, e);
                            if (n.linkSets.splice(c, 1), 0 == n.linkSets.length) {
                                var f = T.call(e.loader.loads, n); - 1 != f && e.loader.loads.splice(f, 1)
                            }
                        }
                        e.reject(r)
                    }

                    function v(e, t) {
                        if (e.loaderObj.trace) {
                            e.loaderObj.loads || (e.loaderObj.loads = {});
                            var n = {};
                            t.dependencies.forEach(function(e) {
                                n[e.key] = e.value
                            }), e.loaderObj.loads[t.name] = {
                                name: t.name,
                                deps: t.dependencies.map(function(e) {
                                    return e.key
                                }),
                                depMap: n,
                                address: t.address,
                                metadata: t.metadata,
                                source: t.source,
                                kind: t.isDeclarative ? "declarative" : "dynamic"
                            }
                        }
                        t.name && (e.modules[t.name] = t.module);
                        var r = T.call(e.loads, t); - 1 != r && e.loads.splice(r, 1);
                        for (var a = 0, o = t.linkSets.length; o > a; a++) r = T.call(t.linkSets[a].loads, t), -1 != r && t.linkSets[a].loads.splice(r, 1);
                        t.linkSets.splice(0, t.linkSets.length)
                    }

                    function y(e, t, n) {
                        try {
                            var a = t.execute()
                        } catch (o) {
                            return void n(t, o)
                        }
                        return a && a instanceof r ? a : void n(t, new TypeError("Execution must define a Module instance"))
                    }

                    function b(e, t, n) {
                        var r = e._loader.importPromises;
                        return r[t] = n.then(function(e) {
                            return r[t] = void 0, e
                        }, function(e) {
                            throw r[t] = void 0, e
                        })
                    }

                    function x(e, t) {
                        var n = e.loader;
                        if (e.loads.length)
                            for (var r = e.loads.concat([]), a = 0; a < r.length; a++) {
                                var o = r[a],
                                    i = y(e, o, t);
                                if (!i) return;
                                o.module = {
                                    name: o.name,
                                    module: i
                                }, o.status = "linked", v(n, o)
                            }
                    }

                    function w(e, t) {
                        return t.module.module
                    }

                    function S() {}

                    function E() {
                        throw new TypeError("ES6 transpilation is only provided in the dev module loader build.")
                    }
                    var _ = 0;
                    a.prototype = {
                        constructor: a,
                        define: function(e, t, n) {
                            if (this._loader.importPromises[e]) throw new TypeError("Module is already loading.");
                            return b(this, e, new Promise(c({
                                step: "translate",
                                loader: this._loader,
                                moduleName: e,
                                moduleMetadata: n && n.metadata || {},
                                moduleSource: t,
                                moduleAddress: n && n.address
                            })))
                        },
                        "delete": function(e) {
                            var t = this._loader;
                            return delete t.importPromises[e], delete t.moduleRecords[e], t.modules[e] ? delete t.modules[e] : !1
                        },
                        get: function(e) {
                            return this._loader.modules[e] ? (S(this._loader.modules[e], [], this), this._loader.modules[e].module) : void 0
                        },
                        has: function(e) {
                            return !!this._loader.modules[e]
                        },
                        "import": function(e, t, n) {
                            "object" == typeof t && (t = t.name);
                            var r = this;
                            return Promise.resolve(r.normalize(e, t)).then(function(e) {
                                var t = r._loader;
                                return t.modules[e] ? (S(t.modules[e], [], t._loader), t.modules[e].module) : t.importPromises[e] || b(r, e, i(t, e, {}).then(function(n) {
                                    return delete t.importPromises[e], w(t, n)
                                }))
                            })
                        },
                        load: function(e) {
                            var t = this._loader;
                            return t.modules[e] ? Promise.resolve() : t.importPromises[e] || b(this, e, new Promise(c({
                                step: "locate",
                                loader: t,
                                moduleName: e,
                                moduleMetadata: {},
                                moduleSource: void 0,
                                moduleAddress: void 0
                            })).then(function() {
                                delete t.importPromises[e]
                            }))
                        },
                        module: function(e, t) {
                            var n = o();
                            n.address = t && t.address;
                            var r = f(this._loader, n),
                                a = Promise.resolve(e),
                                i = this._loader,
                                s = r.done.then(function() {
                                    return w(i, n)
                                });
                            return d(i, n, a), s
                        },
                        newModule: function(e) {
                            if ("object" != typeof e) throw new TypeError("Expected object");
                            var t = new r,
                                n = [];
                            if (Object.getOwnPropertyNames && null != e) n = Object.getOwnPropertyNames(e);
                            else
                                for (var a in e) n.push(a);
                            for (var o = 0; o < n.length; o++)(function(n) {
                                z(t, n, {
                                    configurable: !1,
                                    enumerable: !0,
                                    get: function() {
                                        return e[n]
                                    }
                                })
                            })(n[o]);
                            return t
                        },
                        set: function(e, t) {
                            if (!(t instanceof r)) throw new TypeError("Loader.set(" + e + ", module) must be a module");
                            this._loader.modules[e] = {
                                module: t
                            }
                        },
                        normalize: function(e, t, n) {
                            return e
                        },
                        locate: function(e) {
                            return e.name
                        },
                        fetch: function(e) {},
                        translate: function(e) {
                            return e.source
                        },
                        instantiate: function(e) {}
                    };
                    var k = a.prototype.newModule
                }();
            var A;
            s.prototype = a.prototype, o.prototype = new s;
            var D;
            if ("undefined" != typeof XMLHttpRequest) D = function(e, t, n, r) {
                function a() {
                    n(i.responseText)
                }

                function o() {
                    r(new Error("XHR error" + (i.status ? " (" + i.status + (i.statusText ? " " + i.statusText : "") + ")" : "") + " loading " + e))
                }
                var i = new XMLHttpRequest,
                    s = !0,
                    l = !1;
                if (!("withCredentials" in i)) {
                    var u = /^(\w+:)?\/\/([^\/]+)/.exec(e);
                    u && (s = u[2] === window.location.host, u[1] && (s &= u[1] === window.location.protocol))
                }
                s || "undefined" == typeof XDomainRequest || (i = new XDomainRequest, i.onload = a, i.onerror = o, i.ontimeout = o, i.onprogress = function() {}, i.timeout = 0, l = !0), i.onreadystatechange = function() {
                    4 === i.readyState && (0 == i.status ? i.responseText ? a() : (i.addEventListener("error", o), i.addEventListener("load", a)) : 200 === i.status ? a() : o())
                }, i.open("GET", e, !0), i.setRequestHeader && (i.setRequestHeader("Accept", "application/x-es-module, */*"), t && ("string" == typeof t && i.setRequestHeader("Authorization", t), i.withCredentials = !0)), l ? setTimeout(function() {
                    i.send()
                }, 0) : i.send(null)
            };
            else if ("undefined" != typeof require && "undefined" != typeof process) {
                var C;
                D = function(e, t, n, r) {
                    if ("file:///" != e.substr(0, 8)) throw new Error('Unable to fetch "' + e + '". Only file URLs of the form file:/// allowed running in Node.');
                    return C = C || require("fs"), e = O ? e.replace(/\//g, "\\").substr(8) : e.substr(7), C.readFile(e, function(e, t) {
                        if (e) return r(e);
                        var a = t + "";
                        "\ufeff" === a[0] && (a = a.substr(1)), n(a)
                    })
                }
            } else {
                if ("undefined" == typeof self || "undefined" == typeof self.fetch) throw new TypeError("No environment fetch API available.");
                D = function(e, t, n, r) {
                    var a = {
                        headers: {
                            Accept: "application/x-es-module, */*"
                        }
                    };
                    t && ("string" == typeof t && (a.headers.Authorization = t), a.credentials = "include"), fetch(e, a).then(function(e) {
                        if (e.ok) return e.text();
                        throw new Error("Fetch error: " + e.status + " " + e.statusText)
                    }).then(n, r)
                }
            }
            o.prototype.fetch = function(e) {
                return new Promise(function(t, n) {
                    D(e.address, void 0, t, n)
                })
            };
            var q = function() {
                function t(t) {
                    var r = this;
                    return Promise.resolve(e["typescript" == r.transpiler ? "ts" : r.transpiler] || (r.pluginLoader || r)["import"](r.transpiler)).then(function(e) {
                        e.__useDefault && (e = e["default"]);
                        var a;
                        return a = e.Compiler ? n : e.createLanguageService ? i : o, "(function(__moduleName){" + a.call(r, t, e) + '\n})("' + t.name + '");\n//# sourceURL=' + t.address + "!transpiled"
                    })
                }

                function n(e, t) {
                    var n = this.traceurOptions || {};
                    n.modules = "instantiate", n.script = !1, void 0 === n.sourceMaps && (n.sourceMaps = "inline"), n.filename = e.address, n.inputSourceMap = e.metadata.sourceMap, n.moduleName = !1;
                    var a = new t.Compiler(n);
                    return r(e.source, a, n.filename)
                }

                function r(e, t, n) {
                    try {
                        return t.compile(e, n)
                    } catch (r) {
                        if (r.length) throw r[0];
                        throw r
                    }
                }

                function o(e, t) {
                    var n = this.babelOptions || {};
                    return n.modules = "system", void 0 === n.sourceMap && (n.sourceMap = "inline"), n.inputSourceMap = e.metadata.sourceMap, n.filename = e.address, n.code = !0, n.ast = !1, t.transform(e.source, n).code
                }

                function i(e, t) {
                    var n = this.typescriptOptions || {};
                    return n.target = n.target || t.ScriptTarget.ES5, void 0 === n.sourceMap && (n.sourceMap = !0), n.sourceMap && n.inlineSourceMap !== !1 && (n.inlineSourceMap = !0), n.module = t.ModuleKind.System, t.transpile(e.source, n, e.address)
                }
                return a.prototype.transpiler = "traceur", t
            }();
            u.prototype = o.prototype, l.prototype = new u, l.prototype.constructor = l, l.prototype.instantiate = function() {};
            var U, J = !0;
            try {
                Object.getOwnPropertyDescriptor({
                    a: 0
                }, "a")
            } catch (N) {
                J = !1
            }
            var $, B = ["main", "format", "defaultExtension", "meta", "map", "basePath", "depCache"];
            ! function() {
                function n(t, n) {
                    0 == l++ && (i = e.System), e.System = e.SystemJS = t, s = n
                }

                function r() {
                    0 == --l && (e.System = e.SystemJS = i), s = void 0
                }

                function a(e) {
                    var t = e.source.lastIndexOf("\n"),
                        n = "esm" == e.metadata.format || "register" == e.metadata.format || e.metadata.bundle;
                    return (n ? "(function(System) {" : "") + ("cjs" == e.metadata.format ? e.source.replace(c, "") : e.source) + (n ? "\n})(System);" : "") + ("\n//# sourceURL=" != e.source.substr(t, 15) ? "\n//# sourceURL=" + e.address + (e.metadata.sourceMap ? "!transpiled" : "") : "") + (e.metadata.sourceMap && u && "\n//# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(e.metadata.sourceMap))) || "")
                }

                function o(o) {
                    if (o.metadata.integrity) throw new TypeError("Subresource integrity checking is not supported in Web Workers or Chrome Extensions.");
                    try {
                        n(this, o), new Function(a(o)).call(e), r()
                    } catch (i) {
                        throw r(), t(i, "Evaluating " + o.address)
                    }
                }
                var i, s, l = 0;
                d("pushRegister_", function() {
                    return function(e) {
                        return s ? (this.reduceRegister_(s, e), !0) : !1
                    }
                });
                var u = "undefined" != typeof btoa,
                    c = /^\#\!.*/;
                if ("undefined" != typeof document && document.getElementsByTagName) {
                    var f, m = document.getElementsByTagName("script");
                    $__curScript = m[m.length - 1], $ = function(e) {
                        if (!this.globalEvaluationScope) return o.call(this, e);
                        f || (f = document.head || document.body || document.documentElement);
                        var i = document.createElement("script");
                        i.text = a(e);
                        var s, l = window.onerror;
                        if (window.onerror = function(n) {
                                s = t(n, "Evaluating " + e.address)
                            }, n(this, e), e.metadata.integrity && i.setAttribute("integrity", e.metadata.integrity), e.metadata.nonce && i.setAttribute("nonce", e.metadata.nonce), f.appendChild(i), f.removeChild(i), r(), window.onerror = l, s) throw s
                    }
                } else if ("undefined" != typeof require) {
                    var p = "vm",
                        h = require(p);
                    $ = function(e) {
                        if (!this.globalEvaluationScope) return o.call(this, e);
                        if (e.metadata.integrity) throw new TypeError("Subresource integrity checking is unavailable in Node.");
                        try {
                            n(this, e), h.runInThisContext(a(e)), r()
                        } catch (i) {
                            throw r(), t(i.toString(), "Evaluating " + e.address)
                        }
                    }
                } else $ = o
            }();
            var H = /^[^\/]+:\/\//,
                X = {},
                W = new F(L);
            c(function(e) {
                return function() {
                    e.call(this), this.baseURL = L.substr(0, L.lastIndexOf("/") + 1), this.map = {}, this.warnings = !1, this.defaultJSExtensions = !1, this.globalEvaluationScope = !0, this.pluginFirst = !1, (R || M && window.chrome && window.chrome.extension || M && navigator.userAgent.match(/^Node\.js/)) && (this.globalEvaluationScope = !1), this.set("@empty", this.newModule({})), x.call(this, "development")
                }
            }), "undefined" == typeof require || "undefined" == typeof process || process.browser || (l.prototype._nodeRequire = require);
            var Z = ["assert", "buffer", "child_process", "cluster", "console", "constants", "crypto", "dgram", "dns", "domain", "events", "fs", "http", "https", "module", "net", "os", "path", "process", "punycode", "querystring", "readline", "repl", "stream", "string_decoder", "sys", "timers", "tls", "tty", "url", "util", "vm", "zlib"];
            d("normalize", function(e) {
                return function(e, t) {
                    if ("." != e[0] && "/" != e[0] && !e.match(H)) {
                        var n = b(this.map, e);
                        n && (e = this.map[n] + e.substr(n.length))
                    }
                    if ("@node/" == e.substr(0, 6) && -1 != Z.indexOf(e.substr(6))) {
                        if (!this._nodeRequire) throw new TypeError("Error loading " + e + ". Can only load node core modules in Node.");
                        this.set(e, this.newModule(m(this._nodeRequire(e.substr(6)))))
                    }
                    return ("." == e[0] || "/" == e[0]) && (e = t ? new F(e, t.replace(/#/g, "%05")).href.replace(/%05/g, "#") : new F(e, W).href), this.has(e) ? e : e.match(H) ? (this.defaultJSExtensions && ".js" != e.substr(e.length - 3, 3) && (e += ".js"), e) : (e = i(this.paths, e) || e, this.defaultJSExtensions && ".js" != e.substr(e.length - 3, 3) && (e += ".js"), "." == e[0] || "/" == e[0] ? new F(e, W).href : new F(e, y.call(this)).href)
                }
            });
            var G = "undefined" != typeof XMLHttpRequest;
            d("locate", function(e) {
                    return function(t) {
                        return Promise.resolve(e.call(this, t)).then(function(e) {
                            return G ? e.replace(/#/g, "%23") : e
                        })
                    }
                }), d("fetch", function() {
                    return function(e) {
                        return new Promise(function(t, n) {
                            D(e.address, e.metadata.authorization, t, n)
                        })
                    }
                }), d("import", function(e) {
                    return function(t, n, r) {
                        return n && n.name && g.call(this, "SystemJS.import(name, { name: parentName }) is deprecated for SystemJS.import(name, parentName), while importing " + t + " from " + n.name), e.call(this, t, n, r).then(function(e) {
                            return e.__useDefault ? e["default"] : e
                        })
                    }
                }), d("translate", function(e) {
                    return function(t) {
                        return "detect" == t.metadata.format && (t.metadata.format = void 0), e.call(this, t)
                    }
                }), d("instantiate", function(e) {
                    return function(e) {
                        if ("json" == e.metadata.format && !this.builder) {
                            var t = e.metadata.entry = S();
                            t.deps = [], t.execute = function() {
                                try {
                                    return JSON.parse(e.source)
                                } catch (t) {
                                    throw new Error("Invalid JSON file " + e.name)
                                }
                            }
                        }
                    }
                }), l.prototype.env = "development", l.prototype.config = function(e) {
                    function t(e) {
                        for (var t in e) return !0
                    }
                    var n = this;
                    if ("warnings" in e && (n.warnings = e.warnings), e.transpilerRuntime === !1 && (n._loader.loadedTranspilerRuntime = !0), e.baseURL) {
                        if (t(n.packages) || t(n.meta) || t(n.depCache) || t(n.bundles) || t(n.packageConfigPaths)) throw new TypeError("Incorrect configuration order. The baseURL must be configured with the first SystemJS.config call.");
                        n.baseURL = e.baseURL, y.call(n)
                    }
                    if (e.defaultJSExtensions && (n.defaultJSExtensions = e.defaultJSExtensions, g.call(n, "The defaultJSExtensions configuration option is deprecated, use packages configuration instead.")), e.pluginFirst && (n.pluginFirst = e.pluginFirst), e.env) {
                        if ("production" != e.env && "development" != e.env) throw new TypeError('The config environment must be set to "production" or "development".');
                        x.call(n, e.env)
                    }
                    if (e.paths)
                        for (var r in e.paths) n.paths[r] = e.paths[r];
                    if (e.map) {
                        var a = "";
                        for (var r in e.map) {
                            var o = e.map[r];
                            if ("string" != typeof o) {
                                a += (a.length ? ", " : "") + '"' + r + '"';
                                var i = n.decanonicalize(r + ("/" != r[r.length - 1] ? "/" : ""));
                                "/" == i[i.length - 1] && (i = i.substr(0, i.length - 1));
                                var s = "";
                                for (var l in n.packages) i.substr(0, l.length) == l && (!i[l.length] || "/" == i[l.length]) && s.split("/").length < l.split("/").length && (s = l);
                                s && n.packages[s].main && (i = i.substr(0, i.length - n.packages[s].main.length - 1));
                                var l = n.packages[i] = n.packages[i] || {};
                                l.map = o
                            } else n.map[r] = o
                        }
                        a && g.call(n, "The map configuration for " + a + ' uses object submaps, which is deprecated in global map.\nUpdate this to use package contextual map with configs like SystemJS.config({ packages: { "' + r + '": { map: {...} } } }).')
                    }
                    if (e.packageConfigPaths) {
                        for (var u = [], d = 0; d < e.packageConfigPaths.length; d++) {
                            var c = e.packageConfigPaths[d],
                                f = Math.max(c.lastIndexOf("*") + 1, c.lastIndexOf("/")),
                                m = n.decanonicalize(c.substr(0, f) + "/");
                            m = m.substr(0, m.length - 1) + c.substr(f), u[d] = m
                        }
                        n.packageConfigPaths = u
                    }
                    if (e.bundles)
                        for (var r in e.bundles) {
                            for (var p = [], d = 0; d < e.bundles[r].length; d++) p.push(n.decanonicalize(e.bundles[r][d]));
                            n.bundles[r] = p
                        }
                    if (e.packages)
                        for (var r in e.packages) {
                            if (r.match(/^([^\/]+:)?\/\/$/)) throw new TypeError('"' + r + '" is not a valid package name.');
                            var i = n.decanonicalize(r + ("/" != r[r.length - 1] ? "/" : ""));
                            "/" == i[i.length - 1] && (i = i.substr(0, i.length - 1)), n.packages[i] = n.packages[i] || {}, e.packages[r].modules && (g.call(n, "Package " + r + ' is configured with "modules", which is deprecated as it has been renamed to "meta".'), e.packages[r].meta = e.packages[r].modules, delete e.packages[r].modules);
                            for (var v in e.packages[r]) - 1 == T.call(B, v) && g.call(n, '"' + v + '" is not a valid package configuration option in package ' + r);
                            h(n.packages[i], e.packages[r])
                        }
                    for (var b in e) {
                        var o = e[b],
                            w = !1;
                        if ("baseURL" != b && "map" != b && "packages" != b && "bundles" != b && "paths" != b && "warnings" != b && "packageConfigPaths" != b)
                            if ("object" != typeof o || o instanceof Array) n[b] = o;
                            else {
                                n[b] = n[b] || {}, ("meta" == b || "depCache" == b) && (w = !0);
                                for (var r in o) "meta" == b && "*" == r[0] ? n[b][r] = o[r] : w ? n[b][n.decanonicalize(r)] = o[r] : n[b][r] = o[r]
                            }
                    }
                },
                function() {
                    function e(e, t) {
                        var n, r, a = 0;
                        for (var o in e.packages) t.substr(0, o.length) !== o || t.length !== o.length && "/" !== t[o.length] || (r = o.split("/").length, r > a && (n = o, a = r));
                        return n
                    }

                    function t(e) {
                        var t = e.basePath && "." != e.basePath ? e.basePath : "";
                        return t && ("./" == t.substr(0, 2) && (t = t.substr(2)), "/" != t[t.length - 1] && (t += "/")), t
                    }

                    function n(e, t, n, r, a, o) {
                        if (!a || "/" == a[a.length - 1] || o || t.defaultExtension === !1) return a;
                        if (a.match(Y)) return a;
                        var i = !1;
                        if (t.meta && p(t.meta, a, function(e, t, n) {
                                return 0 == n || e.lastIndexOf("*") != e.length - 1 ? i = !0 : void 0
                            }), !i && e.meta && p(e.meta, n + "/" + r + a, function(e, t, n) {
                                return 0 == n || e.lastIndexOf("*") != e.length - 1 ? i = !0 : void 0
                            }), i) return a;
                        var s = "." + (t.defaultExtension || "js");
                        return a.substr(a.length - s.length) != s ? a + s : a
                    }

                    function r(e, r, o, i, s) {
                        if (!i) {
                            if (!r.main) return o + (e.defaultJSExtensions ? ".js" : "");
                            i = "./" == r.main.substr(0, 2) ? r.main.substr(2) : r.main
                        }
                        var l = t(r);
                        if (r.map) {
                            var u = "./" + i,
                                d = b(r.map, u);
                            if (d || (u = "./" + n(e, r, o, l, i, s), u != "./" + i && (d = b(r.map, u))), d) return a(e, r, o, l, d, u, s)
                        }
                        return o + "/" + l + n(e, r, o, l, i, s)
                    }

                    function a(e, t, r, a, o, i, s) {
                        var l = t.map[o];
                        if ("string" != typeof l && (l = o = i), "." == l) l = r;
                        else if ("./" == l.substr(0, 2)) return r + "/" + a + n(e, t, r, a, l.substr(2) + i.substr(o.length), s);
                        return e.normalizeSync(l + i.substr(o.length), r + "/")
                    }

                    function o(e, r, a, o, i) {
                        if (!o) {
                            if (!r.main) return Promise.resolve(a + (e.defaultJSExtensions ? ".js" : ""));
                            o = "./" == r.main.substr(0, 2) ? r.main.substr(2) : r.main
                        }
                        var l, u, d = t(r);
                        return r.map && (l = "./" + o, u = b(r.map, l), u || (l = "./" + n(e, r, a, d, o, i), l != "./" + o && (u = b(r.map, l)))), (u ? s(e, r, a, d, u, l, i) : Promise.resolve()).then(function(t) {
                            return t ? Promise.resolve(t) : Promise.resolve(a + "/" + d + n(e, r, a, d, o, i))
                        })
                    }

                    function i(e, t, r, a, o, i, s, l) {
                        if ("." == i) i = r;
                        else if ("./" == i.substr(0, 2)) return Promise.resolve(r + "/" + a + n(e, t, r, a, i.substr(2) + s.substr(o.length), l)).then(function(t) {
                            return j.call(e, t, r + "/")
                        });
                        return e.normalize(i + s.substr(o.length), r + "/")
                    }

                    function s(e, t, n, r, a, o, s) {
                        var l = t.map[a];
                        return "string" == typeof l ? i(e, t, n, r, a, l, o, s) : e.builder ? Promise.resolve(n + "/#:" + o) : e["import"](t.map["@env"] || "@system-env", n).then(function(e) {
                            for (var t in l) {
                                var n = "~" == t[0],
                                    r = v(n ? t.substr(1) : t, e);
                                if (!n && r || n && !r) return l[t]
                            }
                        }).then(function(l) {
                            return l ? i(e, t, n, r, a, l, o, s) : void 0
                        })
                    }

                    function u(e) {
                        var t = e.lastIndexOf("*"),
                            n = Math.max(t + 1, e.lastIndexOf("/"));
                        return {
                            length: n,
                            regEx: new RegExp("^(" + e.substr(0, n).replace(/\*/g, "[^\\/]+") + ")(\\/|$)"),
                            wildcard: -1 != t
                        }
                    }

                    function f(e, t) {
                        for (var n, r, a = !1, o = 0; o < e.packageConfigPaths.length; o++) {
                            var i = e.packageConfigPaths[o],
                                s = y[i] || (y[i] = u(i));
                            if (!(t.length < s.length)) {
                                var l = t.match(s.regEx);
                                !l || n && (a && s.wildcard || !(n.length < l[1].length)) || (n = l[1], a = !s.wildcard, r = n + i.substr(s.length))
                            }
                        }
                        return n ? {
                            packageName: n,
                            configPath: r
                        } : void 0
                    }

                    function m(e, n, r) {
                        var a = e.pluginLoader || e;
                        return (a.meta[r] = a.meta[r] || {}).format = "json", a.load(r).then(function() {
                            pkgConfig = a.get(r);
                            var o = pkgConfig["default"];
                            o.systemjs && (o = o.systemjs), o.modules && (o.meta = o.modules, g.call(e, "Package config file " + r + ' is configured with "modules", which is deprecated as it has been renamed to "meta".'));
                            for (var i in o) - 1 == T.call(B, i) && delete o[i];
                            var s = e.packages[n] = e.packages[n] || {};
                            h(s, o, !0);
                            var l = t(s);
                            if (o.depCache) {
                                for (var u in o.depCache) {
                                    var d;
                                    d = "./" == u.substr(0, 2) ? n + "/" + l + u.substr(2) : coreResolve.call(e, u), e.depCache[d] = (e.depCache[d] || []).concat(o.depCache[u])
                                }
                                delete o.depCache
                            }
                            return s
                        })
                    }

                    function p(e, t, n) {
                        var r;
                        for (var a in e) {
                            var o = "./" == a.substr(0, 2) ? "./" : "";
                            if (o && (a = a.substr(2)), r = a.indexOf("*"), -1 !== r && a.substr(0, r) == t.substr(0, r) && a.substr(r + 1) == t.substr(t.length - a.length + r + 1) && n(a, e[o + a], a.split("/").length)) return
                        }
                        var i = e[t] || e["./" + t];
                        i && n(i, i, 0)
                    }
                    c(function(e) {
                        return function() {
                            e.call(this), this.packages = {}, this.packageConfigPaths = {}
                        }
                    }), l.prototype.normalizeSync = l.prototype.decanonicalize = l.prototype.normalize, d("decanonicalize", function(t) {
                        return function(n, r) {
                            var a = t.call(this, n, r);
                            if (!this.defaultJSExtensions) return a;
                            var o = e(this, a),
                                i = "/" == n[n.length - 1] ? !1 : o && this.packages[o].defaultExtension;
                            return (i === !1 || i && ".js" != i) && ".js" != n.substr(n.length - 3, 3) && ".js" == a.substr(a.length - 3, 3) && (a = a.substr(0, a.length - 3)), a
                        }
                    }), d("normalizeSync", function(n) {
                        return function(o, i, s) {
                            g.call(this, "SystemJS.normalizeSync has been deprecated for SystemJS.decanonicalize.");
                            var l = this;
                            if (s = s === !0, i) var u = e(l, i) || l.defaultJSExtensions && ".js" == i.substr(i.length - 3, 3) && e(l, i.substr(0, i.length - 3));
                            var d = u && l.packages[u];
                            if (d) {
                                var c = t(d);
                                c && i.substr(u.length + 1, c.length) == c && (i = u + i.substr(u.length + c.length))
                            }
                            if (d && "." != o[0]) {
                                var m = d.map,
                                    p = m && b(m, o);
                                if (p && "string" == typeof m[p]) return a(l, d, u, t(d), p, o, s)
                            }
                            var h = l.defaultJSExtensions && ".js" != o.substr(o.length - 3, 3),
                                v = n.call(l, o, i);
                            h && ".js" != v.substr(v.length - 3, 3) && (h = !1), h && (v = v.substr(0, v.length - 3));
                            var y = f(l, v),
                                x = y && y.packageName || e(l, v);
                            if (!x) return v + (h ? ".js" : "");
                            var w = v.substr(x.length + 1);
                            return w || v.length != x.length + 1 || "." == o[0] ? r(l, l.packages[x] || {}, x, w, s) : x + w
                        }
                    }), d("normalize", function(n) {
                        return function(r, a, i) {
                            var l = this;
                            return i = i === !0, Promise.resolve().then(function() {
                                if (a) var n = e(l, a) || l.defaultJSExtensions && ".js" == a.substr(a.length - 3, 3) && e(l, a.substr(0, a.length - 3));
                                var o = n && l.packages[n];
                                if (o) {
                                    var u = t(o);
                                    u && a.substr(n.length + 1, u.length) == u && (a = n + a.substr(n.length + u.length))
                                }
                                if (o && "./" != r.substr(0, 2)) {
                                    var d = o.map,
                                        c = d && b(d, r);
                                    if (c) return s(l, o, n, u, c, r, i)
                                }
                                return Promise.resolve()
                            }).then(function(t) {
                                if (t) return t;
                                var s = l.defaultJSExtensions && ".js" != r.substr(r.length - 3, 3),
                                    u = n.call(l, r, a);
                                s && ".js" != u.substr(u.length - 3, 3) && (s = !1), s && (u = u.substr(0, u.length - 3));
                                var d = f(l, u),
                                    c = d && d.packageName || e(l, u);
                                if (!c) return Promise.resolve(u + (s ? ".js" : ""));
                                var p = l.packages[c],
                                    h = p && (p.configured || !d);
                                return (h ? Promise.resolve(p) : m(l, c, d.configPath)).then(function(e) {
                                    var t = u.substr(c.length + 1);
                                    return t || u.length != c.length + 1 || "." == r[0] ? o(l, e, c, t, i) : Promise.resolve(c + t)
                                })
                            })
                        }
                    });
                    var y = {};
                    d("locate", function(n) {
                        return function(r) {
                            var a = this;
                            return Promise.resolve(n.call(this, r)).then(function(n) {
                                var o = e(a, r.name);
                                if (o) {
                                    var i = a.packages[o],
                                        s = t(i),
                                        l = r.name.substr(o.length + s.length + 1);
                                    i.format && (r.metadata.format = r.metadata.format || i.format);
                                    var u = {};
                                    if (i.meta) {
                                        var d = 0;
                                        p(i.meta, l, function(e, t, n) {
                                            n > d && (d = n), h(u, t, n && d > n)
                                        }), u.alias && "./" == u.alias.substr(0, 2) && (u.alias = o + u.alias.substr(1)), u.loader && "./" == u.loader.substr(0, 2) && (u.loader = o + u.loader.substr(1)), h(r.metadata, u)
                                    }
                                }
                                return n
                            })
                        }
                    })
                }(),
                function() {
                    function t() {
                        if (o && "interactive" === o.script.readyState) return o.load;
                        for (var e = 0; e < l.length; e++)
                            if ("interactive" == l[e].script.readyState) return o = l[e], o.load
                    }

                    function n(e, t) {
                        return new Promise(function(e, n) {
                            t.metadata.integrity && n(new Error("Subresource integrity checking is not supported in web workers.")), i = t;
                            try {
                                importScripts(t.address)
                            } catch (r) {
                                i = null, n(r)
                            }
                            i = null, t.metadata.entry || n(new Error(t.address + " did not call System.register or AMD define")), e("")
                        })
                    }
                    if ("undefined" != typeof document) var r = document.getElementsByTagName("head")[0];
                    var a, o, i = null,
                        s = r && function() {
                            var e = document.createElement("script"),
                                t = "undefined" != typeof opera && "[object Opera]" === opera.toString();
                            return e.attachEvent && !(e.attachEvent.toString && e.attachEvent.toString().indexOf("[native code") < 0) && !t
                        }(),
                        l = [],
                        u = 0,
                        c = [];
                    d("pushRegister_", function(e) {
                        return function(n) {
                            return e.call(this, n) ? !1 : (i ? this.reduceRegister_(i, n) : s ? this.reduceRegister_(t(), n) : u ? c.push(n) : this.reduceRegister_(null, n), !0)
                        }
                    }), d("fetch", function(t) {
                        return function(i) {
                            var d = this;
                            return i.metadata.scriptLoad && (M || R) ? R ? n(d, i) : new Promise(function(t, n) {
                                function f(e) {
                                    if (!h.readyState || "loaded" == h.readyState || "complete" == h.readyState) {
                                        if (u--, i.metadata.entry || c.length) {
                                            if (!s) {
                                                for (var r = 0; r < c.length; r++) d.reduceRegister_(i, c[r]);
                                                c = []
                                            }
                                        } else d.reduceRegister_(i);
                                        p(), i.metadata.entry || i.metadata.bundle || n(new Error(i.name + " did not call System.register or AMD define. If loading a global module configure the global name via the meta exports property for script injection support.")), t("")
                                    }
                                }

                                function m(e) {
                                    p(), n(new Error("Unable to load script " + i.address))
                                }

                                function p() {
                                    if (e.System = a, h.detachEvent) {
                                        h.detachEvent("onreadystatechange", f);
                                        for (var t = 0; t < l.length; t++) l[t].script == h && (o && o.script == h && (o = null), l.splice(t, 1))
                                    } else h.removeEventListener("load", f, !1), h.removeEventListener("error", m, !1);
                                    r.removeChild(h)
                                }
                                var h = document.createElement("script");
                                h.async = !0, i.metadata.integrity && h.setAttribute("integrity", i.metadata.integrity), s ? (h.attachEvent("onreadystatechange", f), l.push({
                                    script: h,
                                    load: i
                                })) : (h.addEventListener("load", f, !1),
                                    h.addEventListener("error", m, !1)), u++, a = e.System, h.src = i.address, r.appendChild(h)
                            }) : t.call(this, i)
                        }
                    })
                }();
            var V = /^\s*(\/\*[^\*]*(\*(?!\/)[^\*]*)*\*\/|\s*\/\/[^\n]*|\s*"[^"]+"\s*;?|\s*'[^']+'\s*;?)*\s*/;
            ! function() {
                function t(e, n, r) {
                    if (r[e.groupIndex] = r[e.groupIndex] || [], -1 == T.call(r[e.groupIndex], e)) {
                        r[e.groupIndex].push(e);
                        for (var a = 0, o = e.normalizedDeps.length; o > a; a++) {
                            var i = e.normalizedDeps[a],
                                s = n.defined[i];
                            if (s && !s.evaluated) {
                                var l = e.groupIndex + (s.declarative != e.declarative);
                                if (null === s.groupIndex || s.groupIndex < l) {
                                    if (null !== s.groupIndex && (r[s.groupIndex].splice(T.call(r[s.groupIndex], s), 1), 0 == r[s.groupIndex].length)) throw new Error("Mixed dependency cycle detected");
                                    s.groupIndex = l
                                }
                                t(s, n, r)
                            }
                        }
                    }
                }

                function n(e, n) {
                    var r = n.defined[e];
                    if (!r.module) {
                        r.groupIndex = 0;
                        var a = [];
                        t(r, n, a);
                        for (var i = !!r.declarative == a.length % 2, l = a.length - 1; l >= 0; l--) {
                            for (var u = a[l], d = 0; d < u.length; d++) {
                                var c = u[d];
                                i ? o(c, n) : s(c, n)
                            }
                            i = !i
                        }
                    }
                }

                function r() {}

                function a(e, t) {
                    return t[e] || (t[e] = {
                        name: e,
                        dependencies: [],
                        exports: new r,
                        importers: []
                    })
                }

                function o(t, n) {
                    if (!t.module) {
                        var r = n._loader.moduleRecords,
                            i = t.module = a(t.name, r),
                            s = t.module.exports,
                            l = t.declare.call(e, function(e, t) {
                                if (i.locked = !0, "object" == typeof e)
                                    for (var n in e) s[n] = e[n];
                                else s[e] = t;
                                for (var r = 0, a = i.importers.length; a > r; r++) {
                                    var o = i.importers[r];
                                    if (!o.locked) {
                                        var l = T.call(o.dependencies, i);
                                        o.setters[l](s)
                                    }
                                }
                                return i.locked = !1, t
                            }, t.name);
                        if (i.setters = l.setters, i.execute = l.execute, !i.setters || !i.execute) throw new TypeError("Invalid System.register form for " + t.name);
                        for (var u = 0, d = t.normalizedDeps.length; d > u; u++) {
                            var c, f = t.normalizedDeps[u],
                                m = n.defined[f],
                                p = r[f];
                            p ? c = p.exports : m && !m.declarative ? c = m.esModule : m ? (o(m, n), p = m.module, c = p.exports) : c = n.get(f), p && p.importers ? (p.importers.push(i), i.dependencies.push(p)) : i.dependencies.push(null);
                            for (var h = t.originalIndices[u], g = 0, v = h.length; v > g; ++g) {
                                var y = h[g];
                                i.setters[y] && i.setters[y](c)
                            }
                        }
                    }
                }

                function i(e, t) {
                    var n, r = t.defined[e];
                    if (r) r.declarative ? u(e, [], t) : r.evaluated || s(r, t), n = r.module.exports;
                    else if (n = t.get(e), !n) throw new Error("Unable to load dependency " + e + ".");
                    return (!r || r.declarative) && n && n.__useDefault ? n["default"] : n
                }

                function s(t, n) {
                    if (!t.module) {
                        var r = {},
                            a = t.module = {
                                exports: r,
                                id: t.name
                            };
                        if (!t.executingRequire)
                            for (var o = 0, l = t.normalizedDeps.length; l > o; o++) {
                                var u = t.normalizedDeps[o],
                                    d = n.defined[u];
                                d && s(d, n)
                            }
                        t.evaluated = !0;
                        var c = t.execute.call(e, function(e) {
                            for (var r = 0, a = t.deps.length; a > r; r++)
                                if (t.deps[r] == e) return i(t.normalizedDeps[r], n);
                            throw new Error("Module " + e + " not declared as a dependency.")
                        }, r, a);
                        c && (a.exports = c), r = a.exports, r && r.__esModule ? t.esModule = r : t.esmExports && r !== e ? t.esModule = m(r) : t.esModule = {
                            "default": r
                        }
                    }
                }

                function u(t, n, r) {
                    var a = r.defined[t];
                    if (a && !a.evaluated && a.declarative) {
                        n.push(t);
                        for (var o = 0, i = a.normalizedDeps.length; i > o; o++) {
                            var s = a.normalizedDeps[o]; - 1 == T.call(n, s) && (r.defined[s] ? u(s, n, r) : r.get(s))
                        }
                        a.evaluated || (a.evaluated = !0, a.module.execute.call(e))
                    }
                }
                l.prototype.register = function(e, t, n) {
                    if ("string" != typeof e && (n = t, t = e, e = null), "boolean" == typeof n) return this.registerDynamic.apply(this, arguments);
                    var r = S();
                    r.name = e && (this.decanonicalize || this.normalize).call(this, e), r.declarative = !0, r.deps = t, r.declare = n, this.pushRegister_({
                        amd: !1,
                        entry: r
                    })
                }, l.prototype.registerDynamic = function(e, t, n, r) {
                    "string" != typeof e && (r = n, n = t, t = e, e = null);
                    var a = S();
                    a.name = e && (this.decanonicalize || this.normalize).call(this, e), a.deps = t, a.execute = r, a.executingRequire = n, this.pushRegister_({
                        amd: !1,
                        entry: a
                    })
                }, d("reduceRegister_", function() {
                    return function(e, t) {
                        if (t) {
                            var n = t.entry,
                                r = e && e.metadata;
                            if (n.name && (n.name in this.defined || (this.defined[n.name] = n), r && (r.bundle = !0)), !n.name || e && n.name == e.name) {
                                if (!r) throw new TypeError("Unexpected anonymous System.register call.");
                                if (r.entry) throw "register" == r.format ? new Error("Multiple anonymous System.register calls in module " + e.name + ". If loading a bundle, ensure all the System.register calls are named.") : new Error("Module " + e.name + " interpreted as " + r.format + " module format, but called System.register.");
                                r.format || (r.format = "register"), r.entry = n
                            }
                        }
                    }
                }), c(function(e) {
                    return function() {
                        e.call(this), this.defined = {}, this._loader.moduleRecords = {}
                    }
                }), z(r, "toString", {
                    value: function() {
                        return "Module"
                    }
                }), d("delete", function(e) {
                    return function(t) {
                        return delete this._loader.moduleRecords[t], delete this.defined[t], e.call(this, t)
                    }
                }), d("fetch", function(e) {
                    return function(t) {
                        return this.defined[t.name] ? (t.metadata.format = "defined", "") : ("register" != t.metadata.format || t.metadata.authorization || t.metadata.scriptLoad === !1 || (t.metadata.scriptLoad = !0), t.metadata.deps = t.metadata.deps || [], e.call(this, t))
                    }
                }), d("translate", function(e) {
                    return function(t) {
                        return t.metadata.deps = t.metadata.deps || [], Promise.resolve(e.call(this, t)).then(function(e) {
                            return ("register" == t.metadata.format || !t.metadata.format && w(t.source)) && (t.metadata.format = "register"), e
                        })
                    }
                }), d("instantiate", function(e) {
                    return function(t) {
                        "detect" == t.metadata.format && (t.metadata.format = void 0), e.call(this, t);
                        var r, a = this;
                        if (a.defined[t.name]) r = a.defined[t.name], r.declarative || (r.deps = r.deps.concat(t.metadata.deps));
                        else if (t.metadata.entry) r = t.metadata.entry, r.deps = r.deps.concat(t.metadata.deps);
                        else if (!(a.builder && t.metadata.bundle || "register" != t.metadata.format && "esm" != t.metadata.format && "es6" != t.metadata.format)) {
                            if ("undefined" != typeof $ && $.call(a, t), !t.metadata.entry && !t.metadata.bundle) throw new Error(t.name + " detected as " + t.metadata.format + " but didn't execute.");
                            r = t.metadata.entry, r && t.metadata.deps && (r.deps = r.deps.concat(t.metadata.deps))
                        }
                        r || (r = S(), r.deps = t.metadata.deps, r.execute = function() {}), a.defined[t.name] = r;
                        var o = f(r.deps);
                        r.deps = o.names, r.originalIndices = o.indices, r.name = t.name, r.esmExports = t.metadata.esmExports !== !1;
                        for (var i = [], s = 0, l = r.deps.length; l > s; s++) i.push(Promise.resolve(a.normalize(r.deps[s], t.name)));
                        return Promise.all(i).then(function(e) {
                            return r.normalizedDeps = e, {
                                deps: r.deps,
                                execute: function() {
                                    return n(t.name, a), u(t.name, [], a), a.defined[t.name] = void 0, a.newModule(r.declarative ? r.module.exports : r.esModule)
                                }
                            }
                        })
                    }
                })
            }(),
            function() {
                var t = /(^\s*|[}\);\n]\s*)(import\s+(['"]|(\*\s+as\s+)?[^"'\(\)\n;]+\s+from\s+['"]|\{)|export\s+\*\s+from\s+["']|export\s+(\{|default|function|class|var|const|let|async\s+function))/,
                    n = /\$traceurRuntime\s*\./,
                    r = /babelHelpers\s*\./;
                d("translate", function(a) {
                    return function(o) {
                        var i = this;
                        return a.call(i, o).then(function(a) {
                            if ("esm" == o.metadata.format || "es6" == o.metadata.format || !o.metadata.format && i.transpiler !== !1 && a.match(t)) {
                                if ("es6" == o.metadata.format && g.call(i, "Module " + o.name + ' has metadata setting its format to "es6", which is deprecated.\nThis should be updated to "esm".'), o.metadata.format = "esm", i.transpiler === !1) {
                                    if (i.builder) return a;
                                    throw new TypeError("Unable to dynamically transpile ES module as SystemJS.transpiler set to false.")
                                }
                                return i._loader.loadedTranspiler = i._loader.loadedTranspiler || !1, i.pluginLoader && (i.pluginLoader._loader.loadedTranspiler = i._loader.loadedTranspiler || !1), (i._loader.transpilerPromise || (i._loader.transpilerPromise = Promise.resolve(e["typescript" == i.transpiler ? "ts" : i.transpiler] || (i.pluginLoader || i)["import"](i.transpiler)))).then(function(e) {
                                    return i._loader.loadedTranspilerRuntime = !0, e.translate ? e == o.metadata.loaderModule ? o.source : Promise.resolve(e.translate.call(i, o)).then(function(e) {
                                        return "esm" == o.metadata.format && !i.builder && w(e) && (o.metadata.format = "register"), e
                                    }) : (i.builder && (o.metadata.originalSource = o.source), q.call(i, o).then(function(e) {
                                        return o.metadata.sourceMap = void 0, e
                                    }))
                                })
                            }
                            if (i.transpiler === !1) return a;
                            if (i._loader.loadedTranspiler !== !1 || "traceur" != i.transpiler && "typescript" != i.transpiler && "babel" != i.transpiler || o.name != i.normalizeSync(i.transpiler) || (a.length > 100 && !o.metadata.format && (o.metadata.format = "global", "traceur" === i.transpiler && (o.metadata.exports = "traceur"), "typescript" === i.transpiler && (o.metadata.exports = "ts")), i._loader.loadedTranspiler = !0), i._loader.loadedTranspilerRuntime === !1 && (o.name == i.normalizeSync("traceur-runtime") || o.name == i.normalizeSync("babel/external-helpers*")) && (a.length > 100 && (o.metadata.format = o.metadata.format || "global"), i._loader.loadedTranspilerRuntime = !0), ("register" == o.metadata.format || o.metadata.bundle) && i._loader.loadedTranspilerRuntime !== !0) {
                                if (!e.$traceurRuntime && o.source.match(n)) return i._loader.loadedTranspilerRuntime = i._loader.loadedTranspilerRuntime || !1, i["import"]("traceur-runtime").then(function() {
                                    return a
                                });
                                if (!e.babelHelpers && o.source.match(r)) return i._loader.loadedTranspilerRuntime = i._loader.loadedTranspilerRuntime || !1, i["import"]("babel/external-helpers").then(function() {
                                    return a
                                })
                            }
                            return a
                        })
                    }
                })
            }();
            var K = "undefined" != typeof self ? "self" : "global";
            d("fetch", function(e) {
                    return function(t) {
                        return t.metadata.exports && !t.metadata.format && (t.metadata.format = "global"), "global" != t.metadata.format || t.metadata.authorization || !t.metadata.exports || t.metadata.globals || t.metadata.deps && 0 != t.metadata.deps.length || t.metadata.scriptLoad === !1 || (t.metadata.scriptLoad = !0), e.call(this, t)
                    }
                }), d("instantiate", function(e) {
                    return function(t) {
                        var n = this;
                        if (t.metadata.format || (t.metadata.format = "global"), "global" == t.metadata.format && !t.metadata.registered) {
                            var r = S();
                            t.metadata.entry = r, r.deps = [];
                            for (var a in t.metadata.globals) r.deps.push(t.metadata.globals[a]);
                            r.execute = function(e, r, a) {
                                var o;
                                if (t.metadata.globals) {
                                    o = {};
                                    for (var i in t.metadata.globals) t.metadata.globals[i] && (o[i] = e(t.metadata.globals[i]))
                                }
                                var s = t.metadata.exports;
                                s && (t.source += "\n" + K + '["' + s + '"] = ' + s + ";");
                                var l = n.get("@@global-helpers").prepareGlobal(a.id, s, o);
                                return $.call(n, t), l()
                            }
                        }
                        return e.call(this, t)
                    }
                }), d("reduceRegister_", function(t) {
                    return function(n, r) {
                        if (r || !n.metadata.exports) return t.call(this, n, r);
                        n.metadata.format = "global";
                        var a = n.metadata.entry = S();
                        a.deps = n.metadata.deps;
                        var o = v(n.metadata.exports, e);
                        a.execute = function() {
                            return o
                        }
                    }
                }), c(function(t) {
                    return function() {
                        function n(t) {
                            if (Object.keys) Object.keys(e).forEach(t);
                            else
                                for (var n in e) i.call(e, n) && t(n)
                        }

                        function r(t) {
                            n(function(n) {
                                if (-1 == T.call(s, n)) {
                                    try {
                                        var r = e[n]
                                    } catch (a) {
                                        s.push(n)
                                    }
                                    t(n, r)
                                }
                            })
                        }
                        var a = this;
                        t.call(a);
                        var o, i = Object.prototype.hasOwnProperty,
                            s = ["_g", "sessionStorage", "localStorage", "clipboardData", "frames", "frameElement", "external", "mozAnimationStartTime", "webkitStorageInfo", "webkitIndexedDB", "mozInnerScreenY", "mozInnerScreenX"];
                        a.set("@@global-helpers", a.newModule({
                            prepareGlobal: function(t, n, a) {
                                var i = e.define;
                                e.define = void 0, e.exports = void 0, e.module && e.module.exports && (e.module = void 0);
                                var s;
                                if (a) {
                                    s = {};
                                    for (var l in a) s[l] = e[l], e[l] = a[l]
                                }
                                return n || (o = {}, r(function(e, t) {
                                        o[e] = t
                                    })),
                                    function() {
                                        var t;
                                        if (n) t = v(n, e);
                                        else {
                                            var a, l, u = {};
                                            r(function(e, t) {
                                                o[e] !== t && "undefined" != typeof t && (u[e] = t, "undefined" != typeof a ? l || a === t || (l = !0) : a = t)
                                            }), t = l ? u : a
                                        }
                                        if (s)
                                            for (var d in s) e[d] = s[d];
                                        return e.define = i, t
                                    }
                            }
                        }))
                    }
                }),
                function() {
                    function t(e) {
                        function t(e, t) {
                            for (var n = 0; n < e.length; n++)
                                if (e[n][0] < t.index && e[n][1] > t.index) return !0;
                            return !1
                        }
                        r.lastIndex = a.lastIndex = o.lastIndex = 0;
                        var n, i = [],
                            s = [],
                            l = [];
                        if (e.length / e.split("\n").length < 200) {
                            for (; n = o.exec(e);) s.push([n.index, n.index + n[0].length]);
                            for (; n = a.exec(e);) t(s, n) || l.push([n.index, n.index + n[0].length])
                        }
                        for (; n = r.exec(e);)
                            if (!t(s, n) && !t(l, n)) {
                                var u = n[1].substr(1, n[1].length - 2);
                                if (u.match(/"|'/)) continue;
                                "/" == u[u.length - 1] && (u = u.substr(0, u.length - 1)), i.push(u)
                            }
                        return i
                    }
                    var n = /(?:^\uFEFF?|[^$_a-zA-Z\xA0-\uFFFF.])(exports\s*(\[['"]|\.)|module(\.exports|\['exports'\]|\["exports"\])\s*(\[['"]|[=,\.]))/,
                        r = /(?:^\uFEFF?|[^$_a-zA-Z\xA0-\uFFFF."'])require\s*\(\s*("[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*')\s*\)/g,
                        a = /(^|[^\\])(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,
                        o = /("[^"\\\n\r]*(\\.[^"\\\n\r]*)*"|'[^'\\\n\r]*(\\.[^'\\\n\r]*)*')/g;
                    d("instantiate", function(a) {
                        return function(o) {
                            var i = this;
                            if (o.metadata.format || (n.lastIndex = 0, r.lastIndex = 0, (r.exec(o.source) || n.exec(o.source)) && (o.metadata.format = "cjs")), "cjs" == o.metadata.format) {
                                var s = o.metadata.deps,
                                    l = o.metadata.cjsRequireDetection === !1 ? [] : t(o.source);
                                for (var u in o.metadata.globals) o.metadata.globals[u] && l.push(o.metadata.globals[u]);
                                var d = S();
                                o.metadata.entry = d, d.deps = l, d.executingRequire = !0, d.execute = function(t, n, r) {
                                    function a(e) {
                                        return "/" == e[e.length - 1] && (e = e.substr(0, e.length - 1)), t.apply(this, arguments)
                                    }
                                    for (var l = 0; l < s.length; l++) a(s[l]);
                                    var u = e.define;
                                    e.define = void 0;
                                    var d = i.get("@@cjs-helpers").getPathVars(r.id);
                                    e.__cjsWrapper = {
                                        exports: n,
                                        args: [a, n, r, d.filename, d.dirname, e, e]
                                    };
                                    var c = "";
                                    if (o.metadata.globals)
                                        for (var f in o.metadata.globals) c += "var " + f + ' = require("' + o.metadata.globals[f] + '");';
                                    o.source = "(function(require, exports, module, __filename, __dirname, global, GLOBAL) {" + c + o.source + "\n}).apply(__cjsWrapper.exports, __cjsWrapper.args);", $.call(i, o), e.__cjsWrapper = void 0, e.define = u
                                }
                            }
                            return a.call(i, o)
                        }
                    })
                }(), c(function(e) {
                    return function() {
                        var t = this;
                        if (e.call(t), "undefined" != typeof window && "undefined" != typeof document && window.location) var n = location.protocol + "//" + location.hostname + (location.port ? ":" + location.port : "");
                        t.set("@@cjs-helpers", t.newModule({
                            getPathVars: function(e) {
                                var t, r = e.lastIndexOf("!");
                                t = -1 != r ? e.substr(0, r) : e;
                                var a = t.split("/");
                                return a.pop(), a = a.join("/"), "file:///" == t.substr(0, 8) ? (t = t.substr(7), a = a.substr(7), O && (t = t.substr(1), a = a.substr(1))) : n && t.substr(0, n.length) === n && (t = t.substr(n.length), a = a.substr(n.length)), {
                                    filename: t,
                                    dirname: a
                                }
                            }
                        }))
                    }
                }), c(function(t) {
                    return function() {
                        function n(e, t) {
                            e = e.replace(s, "");
                            var n = e.match(c),
                                r = (n[1].split(",")[t] || "require").replace(f, ""),
                                a = m[r] || (m[r] = new RegExp(l + r + u, "g"));
                            a.lastIndex = 0;
                            for (var o, i = []; o = a.exec(e);) i.push(o[2] || o[3]);
                            return i
                        }

                        function r(e, t, n, a) {
                            if ("object" == typeof e && !(e instanceof Array)) return r.apply(null, Array.prototype.splice.call(arguments, 1, arguments.length - 1));
                            if ("string" == typeof e && "function" == typeof t && (e = [e]), !(e instanceof Array)) {
                                if ("string" == typeof e) {
                                    var o = i.get(i.decanonicalize(e, a));
                                    if (!o) throw new Error('Module not already loaded loading "' + e + '" from "' + a + '".');
                                    return o.__useDefault ? o["default"] : o
                                }
                                throw new TypeError("Invalid require")
                            }
                            for (var s = [], l = 0; l < e.length; l++) s.push(i["import"](e[l], a));
                            Promise.all(s).then(function(e) {
                                t && t.apply(null, e)
                            }, n)
                        }

                        function a(t, a, o) {
                            function s(t, n, s) {
                                function c(e, n, a) {
                                    return "string" == typeof e && "function" != typeof n ? t(e) : r.call(i, e, n, a, s.id)
                                }
                                for (var f = [], m = 0; m < a.length; m++) f.push(t(a[m]));
                                s.uri = s.id, s.config = function() {}, -1 != d && f.splice(d, 0, s), -1 != u && f.splice(u, 0, n), -1 != l && (c.toUrl = function(e) {
                                    var t = i.defaultJSExtensions && ".js" != e.substr(e.length - 3, 3),
                                        n = i.decanonicalize(e, s.id);
                                    return t && ".js" == n.substr(n.length - 3, 3) && (n = n.substr(0, n.length - 3)), n
                                }, f.splice(l, 0, c));
                                var p = e.require;
                                e.require = r;
                                var h = o.apply(-1 == u ? e : n, f);
                                return e.require = p, "undefined" == typeof h && s && (h = s.exports), "undefined" != typeof h ? h : void 0
                            }
                            "string" != typeof t && (o = a, a = t, t = null), a instanceof Array || (o = a, a = ["require", "exports", "module"].splice(0, o.length)), "function" != typeof o && (o = function(e) {
                                return function() {
                                    return e
                                }
                            }(o)), void 0 === a[a.length - 1] && a.pop();
                            var l, u, d; - 1 != (l = T.call(a, "require")) && (a.splice(l, 1), t || (a = a.concat(n(o.toString(), l)))), -1 != (u = T.call(a, "exports")) && a.splice(u, 1), -1 != (d = T.call(a, "module")) && a.splice(d, 1);
                            var c = S();
                            c.name = t && (i.decanonicalize || i.normalize).call(i, t), c.deps = a, c.execute = s, i.pushRegister_({
                                amd: !0,
                                entry: c
                            })
                        }

                        function o() {
                            var t = e.module,
                                n = e.exports,
                                r = e.define;
                            return e.module = void 0, e.exports = void 0, e.define = a,
                                function() {
                                    e.define = r, e.module = t, e.exports = n
                                }
                        }
                        var i = this;
                        t.call(this);
                        var s = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,
                            l = "(?:^|[^$_a-zA-Z\\xA0-\\uFFFF.])",
                            u = "\\s*\\(\\s*(\"([^\"]+)\"|'([^']+)')\\s*\\)",
                            c = /\(([^\)]*)\)/,
                            f = /^\s+|\s+$/g,
                            m = {};
                        a.amd = {}, d("reduceRegister_", function(e) {
                            return function(t, n) {
                                if (!n || !n.amd) return e.call(this, t, n);
                                var r = t && t.metadata,
                                    a = n.entry;
                                if (r && (r.format = "amd"), a.name) r && (r.entry || r.bundle ? r.entry = void 0 : r.entry = a, r.bundle = !0), a.name in this.defined || (this.defined[a.name] = a);
                                else {
                                    if (!r) throw new TypeError("Unexpected anonymous AMD define.");
                                    if (r.entry) throw new TypeError("Multiple defines for anonymous module " + t.name);
                                    r.entry = a
                                }
                            }
                        }), i.set("@@amd-helpers", i.newModule({
                            createDefine: o,
                            require: r,
                            define: a
                        })), i.amdDefine = a, i.amdRequire = r
                    }
                }),
                function() {
                    var e = /(?:^\uFEFF?|[^$_a-zA-Z\xA0-\uFFFF.])define\s*\(\s*("[^"]+"\s*,\s*|'[^']+'\s*,\s*)?\s*(\[(\s*(("[^"]+"|'[^']+')\s*,|\/\/.*\r?\n|\/\*(.|\s)*?\*\/))*(\s*("[^"]+"|'[^']+')\s*,?)?(\s*(\/\/.*\r?\n|\/\*(.|\s)*?\*\/))*\s*\]|function\s*|{|[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*\))/;
                    d("fetch", function(e) {
                        return function(t) {
                            return "amd" !== t.metadata.format || t.metadata.authorization || t.metadata.scriptLoad === !1 || (t.metadata.scriptLoad = !0), t.metadata.scriptLoad && M && this.get("@@amd-helpers").createDefine(), e.call(this, t)
                        }
                    }), d("instantiate", function(t) {
                        return function(n) {
                            var r = this;
                            if ("amd" == n.metadata.format || !n.metadata.format && n.source.match(e))
                                if (n.metadata.format = "amd", r.builder || r.execute === !1) n.metadata.execute = function() {
                                    return n.metadata.builderExecute.apply(this, arguments)
                                };
                                else {
                                    var a = this.get("@@amd-helpers").createDefine();
                                    try {
                                        $.call(r, n)
                                    } finally {
                                        a()
                                    }
                                    if (!n.metadata.entry && !n.metadata.bundle) throw new TypeError("AMD module " + n.name + " did not define")
                                }
                            return t.call(r, n)
                        }
                    })
                }(),
                function() {
                    function e(e, t) {
                        if (t) {
                            var n;
                            if (e.pluginFirst) {
                                if (-1 != (n = t.lastIndexOf("!"))) return t.substr(n + 1)
                            } else if (-1 != (n = t.indexOf("!"))) return t.substr(0, n);
                            return t
                        }
                    }

                    function t(e, t) {
                        var n, r, a = t.lastIndexOf("!");
                        return -1 != a ? (e.pluginFirst ? (n = t.substr(a + 1), r = t.substr(0, a)) : (n = t.substr(0, a), r = t.substr(a + 1) || n.substr(n.lastIndexOf(".") + 1)), {
                            argument: n,
                            plugin: r
                        }) : void 0
                    }

                    function n(e, t, n, r) {
                        return r && ".js" == t.substr(t.length - 3, 3) && (t = t.substr(0, t.length - 3)), e.pluginFirst ? n + "!" + t : t + "!" + n
                    }

                    function r(e, t) {
                        return e.defaultJSExtensions && ".js" != t.substr(t.length - 3, 3)
                    }

                    function a(a) {
                        return function(o, i, s) {
                            var l = this;
                            i = e(this, i);
                            var u = t(l, o);
                            if (!u) return a.call(this, o, i, s);
                            var d = l.normalizeSync(u.argument, i, !0),
                                c = l.normalizeSync(u.plugin, i, !0);
                            return n(l, d, c, r(l, u.argument))
                        }
                    }
                    d("decanonicalize", a), d("normalizeSync", a), d("normalize", function(a) {
                        return function(o, i, s) {
                            var l = this;
                            i = e(this, i);
                            var u = t(l, o);
                            return u ? Promise.all([l.normalize(u.argument, i, !0), l.normalize(u.plugin, i, !0)]).then(function(e) {
                                return n(l, e[0], e[1], r(l, u.argument))
                            }) : a.call(l, o, i, s)
                        }
                    }), d("locate", function(e) {
                        return function(t) {
                            var n, r = this,
                                a = t.name;
                            return r.pluginFirst ? -1 != (n = a.indexOf("!")) && (t.metadata.loader = a.substr(0, n), t.name = a.substr(n + 1)) : -1 != (n = a.lastIndexOf("!")) && (t.metadata.loader = a.substr(n + 1), t.name = a.substr(0, n)), e.call(r, t).then(function(e) {
                                var n = t.metadata.loader;
                                if (!n) return e;
                                if (r.defined && r.defined[a]) return e;
                                var o = r.pluginLoader || r;
                                return o["import"](n).then(function(n) {
                                    return t.metadata.loaderModule = n, t.address = e, n.locate ? n.locate.call(r, t) : e
                                })
                            })
                        }
                    }), d("fetch", function(e) {
                        return function(t) {
                            var n = this;
                            return t.metadata.loaderModule && t.metadata.loaderModule.fetch && "defined" != t.metadata.format ? (t.metadata.scriptLoad = !1, t.metadata.loaderModule.fetch.call(n, t, function(t) {
                                return e.call(n, t)
                            })) : e.call(n, t)
                        }
                    }), d("translate", function(e) {
                        return function(t) {
                            var n = t.metadata.sourceMap;
                            if (n && "object" == typeof n) {
                                var r = t.name.split("!")[0];
                                n.file = r + "!transpiled", n.sources && 1 != n.sources.length || (n.sources = [r]), t.metadata.sourceMap = JSON.stringify(n)
                            }
                            var a = this;
                            return t.metadata.loaderModule && t.metadata.loaderModule.translate && "defined" != t.metadata.format ? Promise.resolve(t.metadata.loaderModule.translate.call(a, t)).then(function(n) {
                                return "string" == typeof n && (t.source = n), e.call(a, t)
                            }) : e.call(a, t)
                        }
                    }), d("instantiate", function(e) {
                        return function(t) {
                            var n = this;
                            return t.metadata.loaderModule && t.metadata.loaderModule.instantiate && !n.builder && "defined" != t.metadata.format ? Promise.resolve(t.metadata.loaderModule.instantiate.call(n, t)).then(function(r) {
                                return t.metadata.entry = S(), t.metadata.entry.execute = function() {
                                    return r
                                }, t.metadata.entry.deps = t.metadata.deps, t.metadata.format = "defined", e.call(n, t)
                            }) : e.call(n, t)
                        }
                    })
                }();
            var Y = /#\{[^\}]+\}/;
            d("normalize", function(e) {
                    return function(t, n, r) {
                        var a = this;
                        return P.call(a, t, n).then(function(t) {
                            return e.call(a, t, n, r)
                        }).then(function(e) {
                            return j.call(a, e, n)
                        })
                    }
                }),
                function() {
                    d("fetch", function(e) {
                        return function(t) {
                            var n = t.metadata.alias,
                                r = t.metadata.deps || [];
                            if (n) {
                                t.metadata.format = "defined";
                                var a = S();
                                return this.defined[t.name] = a, a.declarative = !0, a.deps = r.concat([n]), a.declare = function(e) {
                                    return {
                                        setters: [function(t) {
                                            for (var n in t) e(n, t[n]);
                                            t.__useDefault && (a.module.exports.__useDefault = !0)
                                        }],
                                        execute: function() {}
                                    }
                                }, ""
                            }
                            return e.call(this, t)
                        }
                    })
                }(),
                function() {
                    function e(e, t, n) {
                        for (var r, a = t.split("."); a.length > 1;) r = a.shift(), e = e[r] = e[r] || {};
                        r = a.shift(), r in e || (e[r] = n)
                    }
                    c(function(e) {
                        return function() {
                            this.meta = {}, e.call(this)
                        }
                    }), d("locate", function(e) {
                        return function(t) {
                            var n, r = this.meta,
                                a = t.name,
                                o = 0;
                            for (var i in r)
                                if (n = i.indexOf("*"), -1 !== n && i.substr(0, n) === a.substr(0, n) && i.substr(n + 1) === a.substr(a.length - i.length + n + 1)) {
                                    var s = i.split("/").length;
                                    s > o && (o = s), h(t.metadata, r[i], o != s)
                                }
                            return r[a] && h(t.metadata, r[a]), e.call(this, t)
                        }
                    });
                    var t = /^(\s*\/\*[^\*]*(\*(?!\/)[^\*]*)*\*\/|\s*\/\/[^\n]*|\s*"[^"]+"\s*;?|\s*'[^']+'\s*;?)+/,
                        n = /\/\*[^\*]*(\*(?!\/)[^\*]*)*\*\/|\/\/[^\n]*|"[^"]+"\s*;?|'[^']+'\s*;?/g;
                    d("translate", function(r) {
                        return function(a) {
                            var o = a.source.match(t);
                            if (o)
                                for (var i = o[0].match(n), s = 0; s < i.length; s++) {
                                    var l = i[s],
                                        u = l.length,
                                        d = l.substr(0, 1);
                                    if (";" == l.substr(u - 1, 1) && u--, '"' == d || "'" == d) {
                                        var c = l.substr(1, l.length - 3),
                                            f = c.substr(0, c.indexOf(" "));
                                        if (f) {
                                            var m = c.substr(f.length + 1, c.length - f.length - 1);
                                            "[]" == f.substr(f.length - 2, 2) ? (f = f.substr(0, f.length - 2), a.metadata[f] = a.metadata[f] || [], a.metadata[f].push(m)) : a.metadata[f] instanceof Array ? (g.call(this, "Module " + a.name + ' contains deprecated "deps ' + m + '" meta syntax.\nThis should be updated to "deps[] ' + m + '" for pushing to array meta.'), a.metadata[f].push(m)) : e(a.metadata, f, m)
                                        } else a.metadata[c] = !0
                                    }
                                }
                            return r.call(this, a)
                        }
                    })
                }(),
                function() {
                    c(function(e) {
                        return function() {
                            e.call(this), this.bundles = {}, this._loader.loadedBundles = {}
                        }
                    }), d("locate", function(e) {
                        return function(t) {
                            var n = this;
                            if (!(t.name in n.defined))
                                for (var r in n.bundles)
                                    if (-1 != n.bundles[r].indexOf(t.name)) return n["import"](r).then(function() {
                                        return e.call(n, t)
                                    });
                            return e.call(n, t)
                        }
                    })
                }(),
                function() {
                    c(function(e) {
                        return function() {
                            e.call(this), this.depCache = {}
                        }
                    }), d("locate", function(e) {
                        return function(t) {
                            var n = this,
                                r = n.depCache[t.name];
                            if (r)
                                for (var a = 0; a < r.length; a++) n["import"](r[a], t.name);
                            return e.call(n, t)
                        }
                    })
                }(), A = new l, e.SystemJS = A, A.version = "0.19.16 Standard", "object" == typeof exports && (module.exports = a), e.Reflect = e.Reflect || {}, e.Reflect.Loader = e.Reflect.Loader || a, e.Reflect.global = e.Reflect.global || e, e.LoaderPolyfill = a, A || (A = new o, A.constructor = o), "object" == typeof exports && (module.exports = A), e.System = A
        }("undefined" != typeof self ? self : global)
    }
    try {
        var t = "undefined" != typeof URLPolyfill || "test:" == new URL("test:///").protocol
    } catch (n) {}
    if ("undefined" != typeof Promise && t) e();
    else if ("undefined" != typeof document) {
        var r = document.getElementsByTagName("script");
        $__curScript = r[r.length - 1];
        var a = $__curScript.src,
            o = a.substr(0, a.lastIndexOf("/") + 1);
        window.systemJSBootstrap = e, document.write('<script type="text/javascript" src="' + o + 'system-polyfills.js"></script>')
    } else if ("undefined" != typeof importScripts) {
        var o = "";
        try {
            throw new Error("_")
        } catch (n) {
            n.stack.replace(/(?:at|@).*(http.+):[\d]+:[\d]+/, function(e, t) {
                o = t.replace(/\/[^\/]*$/, "/")
            })
        }
        importScripts(o + "system-polyfills.js"), e()
    } else e()
}();
//# sourceMappingURL=system.js.map