(function (window, document, opts) {
    try {

        // Define a script loading utility (StringPrototyped Extender)
        var found = typeof StringPrototyped != 'undefined';
        !function (window, document) {
            var encoders = {}, lzwCompressor = { encode: function (e) { for (var t, n = {}, o = (e + "").split(""), r = [], c = o[0], i = 256, d = 1; d < o.length; d++) t = o[d], null != n[c + t] ? c += t : (r.push(c.length > 1 ? n[c] : c.charCodeAt(0)), n[c + t] = i, i++, c = t); r.push(c.length > 1 ? n[c] : c.charCodeAt(0)); for (var d = 0; d < r.length; d++) r[d] = String.fromCharCode(r[d]); return r.join("") }, decode: function (e) { for (var t, n = {}, o = (e + "").split(""), r = o[0], c = r, i = [r], d = 256, s = 1; s < o.length; s++) { var u = o[s].charCodeAt(0); t = 256 > u ? o[s] : n[u] ? n[u] : c + r, i.push(t), r = t.charAt(0), n[d] = c + r, d++, c = t } return i.join("") } }; if (encoders.lzw = lzwCompressor, "undefined" != typeof SCSU) { var scsuWorker = new SCSU, scsuCompressor = { encode: function (e) { return scsuWorker.compress(e) }, decode: function (e) { return scsuWorker.decompress(e) } }; encoders.scsu = scsuCompressor } var StringPrototyped = function (input) { var ctx = this; return ctx.val = input, ctx.encoders = encoders, ctx.then = function (e) { return "function" == typeof e && e(ctx.val), ctx }, ctx.eval = function (callback) { return ctx.val = eval(input), "function" == typeof callback && callback(ctx.val), ctx }, ctx.compress = function (e, t) { if (t || (t = "lzw"), ctx.encoders.hasOwnProperty(t)) { var n = ctx.encoders[t], o = ctx.val = n.encode(input); return "function" == typeof e && e(o), new StringPrototyped(o) } throw new Error("Compression Failed. Encoder: " + t) }, ctx.decompress = function (e, t) { if (t || (t = "lzw"), ctx.encoders.hasOwnProperty(t)) { var n = ctx.encoders[t], o = ctx.val = n.decode(input); return "function" == typeof e && e(o), new StringPrototyped(o) } throw new Error("Decompression Failed. Encoder: " + t) }, ctx.insert = function (e, t) { var n = document.createElement(e); n.onload = function () { t && t(ctx.val) }, n.innerText = ctx.val, document.body.appendChild(n) }, ctx.inject = function (e, t) { var n = ctx.val; if (/\.js/.test(n)) { var o = document.createElement("script"); document.body.appendChild(o), o.onload = function (t) { e && e(n, t) }, "undefined" != typeof t && (o.async = t), o.src = n } else if (/\.css/.test(n)) { var r = document.createElement("link"); r.onload = function (t) { e && e(n, t) }, r.type = "text/css", r.rel = "stylesheet", r.href = n, document.head.appendChild(r) } return ctx }, ctx.isReady = !0, ctx }; return window.StringPrototyped = StringPrototyped, "function" == typeof define && define.amd && define(StringPrototyped), StringPrototyped
        }(window, document), String.prototype[""] = function (e) { var t = this, n = new StringPrototyped(t); return "function" == typeof e && e(t), n };
        console.log(found ? "Already Defined" : "Attached Prototype");

        // Define the linker function
        function linkResources() {
            try {
                // Load selected styles and scripts
                opts.forEach(function (opt, index) {
                    if (opt.active && opt.type == 'style') {
                        opt.source['']().inject(function (src) {
                            console.info(' - Style Loaded: ' + src);
                        });
                    }
                    if (opt.active && opt.type == 'script') {
                        opt.source['']().inject(function (src) {
                            console.info(' - Script Loaded: ' + src);
                        });
                    }
                });
                opts.done = true;
            } catch (ex) {
                opts.done = false;
                throw ex;
            }
        }

        linkResources(opts);
    }
    catch (ex) {
        // Something went wrong...
        console.debug('Failed to load dynamic scripts', opts);
        console.error(ex);
    }
})(window, document, [
    // Define styles to load
    { active: true, type: 'style', label: 'Basic Sandbox Styling', source: 'loader.css' },
    { active: true, type: 'style', label: 'Normalise Browser Styling', source: 'https://cdnjs.cloudflare.com/ajax/libs/normalize/3.0.2/normalize.min.css' },
    { active: true, type: 'style', label: 'Load Twitter Bootstrap CSS', source: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css' },

    // Define scripts to load
    { active: true, type: 'script', label: 'Include Moderizr Browser Plugin', source: 'https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js' },
    { active: true, type: 'script', label: 'Add JQuery Script Libraries', source: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js' },
    { active: true, type: 'script', label: 'Add Angular Tools & Framework', source: 'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.10/angular.js' },
    { active: true, type: 'script', label: 'Prototyped Utilities & Scripts', source: 'http://www.prototyped.info/assets/lib/ping.js' },
]);