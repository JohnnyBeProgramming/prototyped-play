window['$__$'] = (function (window, document) {
    try {
        // Define the payload
        var encoders = {};
        var module = {};
        var ctx = window.$__$ = window.$__$ || {
            busy: true,
            init: function () {
                // Save Initial state
                if (!ctx.state) {
                    ctx.state = {
                        head: document.head.innerHTML,
                        body: document.body.innerHTML,
                    };
                }

                // Include: String Prototype
                // Prototyped string parsers and extenders
                var StringPrototyped = (function (document) {

                    // Define the encoders
                    var encoders = {};

                    // Define the main class
                    var StringPrototyped = function (input) {
                        var ctx = this;

                        // Store current value(s)
                        ctx.val = input;
                        ctx.encoders = encoders;

                        // Define the extender functions
                        ctx.then = function (callback) {
                            // Run the callback (if specified)
                            if (typeof callback === 'function') {
                                callback(ctx.val);
                            }
                            return ctx;
                        };
                        ctx.hashCode = function () {
                            var val = ctx.val;
                            var hash = 0, i, chr, len;
                            if (val.length == 0) return hash;
                            for (i = 0, len = val.length; i < len; i++) {
                                chr = val.charCodeAt(i);
                                hash = ((hash << 5) - hash) + chr;
                                hash |= 0; // Convert to 32bit integer
                            }
                            return hash;
                        };
                        ctx.eval = function (callback) {
                            ctx.val = eval(input);
                            if (typeof callback === 'function') {
                                callback(ctx.val);
                            }
                            return ctx;
                        };
                        ctx.compress = function (callback, encoder) {
                            if (!encoder) encoder = 'lzw';
                            if (ctx.encoders.hasOwnProperty(encoder)) {
                                var worker = ctx.encoders[encoder];
                                var output = ctx.val = worker.encode(input);
                                if (typeof callback === 'function') {
                                    callback(output);
                                }
                                return new StringPrototyped(output);
                            } else throw new Error('Compression Failed. Encoder: ' + encoder);
                        };
                        ctx.decompress = function (callback, encoder) {
                            if (!encoder) encoder = 'lzw';
                            if (ctx.encoders.hasOwnProperty(encoder)) {
                                var worker = ctx.encoders[encoder];
                                var output = ctx.val = worker.decode(input);
                                if (typeof callback === 'function') {
                                    callback(output);
                                }
                                return new StringPrototyped(output);
                            } else throw new Error('Decompression Failed. Encoder: ' + encoder);
                        };
                        ctx.md5 = function () {
                            var md5Invoker = (function () {
                                function md5(s) {
                                    return hex(md51(s));
                                }
                                var hex_chr = '0123456789abcdef'.split('');
                                function hex(x) {
                                    for (var i = 0; i < x.length; i++)
                                        x[i] = rhex(x[i]);
                                    return x.join('');
                                }
                                function md5cycle(x, k) {
                                    var a = x[0], b = x[1], c = x[2], d = x[3];

                                    a = ff(a, b, c, d, k[0], 7, -680876936);
                                    d = ff(d, a, b, c, k[1], 12, -389564586);
                                    c = ff(c, d, a, b, k[2], 17, 606105819);
                                    b = ff(b, c, d, a, k[3], 22, -1044525330);
                                    a = ff(a, b, c, d, k[4], 7, -176418897);
                                    d = ff(d, a, b, c, k[5], 12, 1200080426);
                                    c = ff(c, d, a, b, k[6], 17, -1473231341);
                                    b = ff(b, c, d, a, k[7], 22, -45705983);
                                    a = ff(a, b, c, d, k[8], 7, 1770035416);
                                    d = ff(d, a, b, c, k[9], 12, -1958414417);
                                    c = ff(c, d, a, b, k[10], 17, -42063);
                                    b = ff(b, c, d, a, k[11], 22, -1990404162);
                                    a = ff(a, b, c, d, k[12], 7, 1804603682);
                                    d = ff(d, a, b, c, k[13], 12, -40341101);
                                    c = ff(c, d, a, b, k[14], 17, -1502002290);
                                    b = ff(b, c, d, a, k[15], 22, 1236535329);

                                    a = gg(a, b, c, d, k[1], 5, -165796510);
                                    d = gg(d, a, b, c, k[6], 9, -1069501632);
                                    c = gg(c, d, a, b, k[11], 14, 643717713);
                                    b = gg(b, c, d, a, k[0], 20, -373897302);
                                    a = gg(a, b, c, d, k[5], 5, -701558691);
                                    d = gg(d, a, b, c, k[10], 9, 38016083);
                                    c = gg(c, d, a, b, k[15], 14, -660478335);
                                    b = gg(b, c, d, a, k[4], 20, -405537848);
                                    a = gg(a, b, c, d, k[9], 5, 568446438);
                                    d = gg(d, a, b, c, k[14], 9, -1019803690);
                                    c = gg(c, d, a, b, k[3], 14, -187363961);
                                    b = gg(b, c, d, a, k[8], 20, 1163531501);
                                    a = gg(a, b, c, d, k[13], 5, -1444681467);
                                    d = gg(d, a, b, c, k[2], 9, -51403784);
                                    c = gg(c, d, a, b, k[7], 14, 1735328473);
                                    b = gg(b, c, d, a, k[12], 20, -1926607734);

                                    a = hh(a, b, c, d, k[5], 4, -378558);
                                    d = hh(d, a, b, c, k[8], 11, -2022574463);
                                    c = hh(c, d, a, b, k[11], 16, 1839030562);
                                    b = hh(b, c, d, a, k[14], 23, -35309556);
                                    a = hh(a, b, c, d, k[1], 4, -1530992060);
                                    d = hh(d, a, b, c, k[4], 11, 1272893353);
                                    c = hh(c, d, a, b, k[7], 16, -155497632);
                                    b = hh(b, c, d, a, k[10], 23, -1094730640);
                                    a = hh(a, b, c, d, k[13], 4, 681279174);
                                    d = hh(d, a, b, c, k[0], 11, -358537222);
                                    c = hh(c, d, a, b, k[3], 16, -722521979);
                                    b = hh(b, c, d, a, k[6], 23, 76029189);
                                    a = hh(a, b, c, d, k[9], 4, -640364487);
                                    d = hh(d, a, b, c, k[12], 11, -421815835);
                                    c = hh(c, d, a, b, k[15], 16, 530742520);
                                    b = hh(b, c, d, a, k[2], 23, -995338651);

                                    a = ii(a, b, c, d, k[0], 6, -198630844);
                                    d = ii(d, a, b, c, k[7], 10, 1126891415);
                                    c = ii(c, d, a, b, k[14], 15, -1416354905);
                                    b = ii(b, c, d, a, k[5], 21, -57434055);
                                    a = ii(a, b, c, d, k[12], 6, 1700485571);
                                    d = ii(d, a, b, c, k[3], 10, -1894986606);
                                    c = ii(c, d, a, b, k[10], 15, -1051523);
                                    b = ii(b, c, d, a, k[1], 21, -2054922799);
                                    a = ii(a, b, c, d, k[8], 6, 1873313359);
                                    d = ii(d, a, b, c, k[15], 10, -30611744);
                                    c = ii(c, d, a, b, k[6], 15, -1560198380);
                                    b = ii(b, c, d, a, k[13], 21, 1309151649);
                                    a = ii(a, b, c, d, k[4], 6, -145523070);
                                    d = ii(d, a, b, c, k[11], 10, -1120210379);
                                    c = ii(c, d, a, b, k[2], 15, 718787259);
                                    b = ii(b, c, d, a, k[9], 21, -343485551);

                                    x[0] = add32(a, x[0]);
                                    x[1] = add32(b, x[1]);
                                    x[2] = add32(c, x[2]);
                                    x[3] = add32(d, x[3]);

                                }
                                function cmn(q, a, b, x, s, t) {
                                    a = add32(add32(a, q), add32(x, t));
                                    return add32((a << s) | (a >>> (32 - s)), b);
                                }
                                function ff(a, b, c, d, x, s, t) {
                                    return cmn((b & c) | ((~b) & d), a, b, x, s, t);
                                }
                                function gg(a, b, c, d, x, s, t) {
                                    return cmn((b & d) | (c & (~d)), a, b, x, s, t);
                                }
                                function hh(a, b, c, d, x, s, t) {
                                    return cmn(b ^ c ^ d, a, b, x, s, t);
                                }
                                function ii(a, b, c, d, x, s, t) {
                                    return cmn(c ^ (b | (~d)), a, b, x, s, t);
                                }
                                function md51(s) {
                                    txt = '';
                                    var n = s.length,
                                    state = [1732584193, -271733879, -1732584194, 271733878], i;
                                    for (i = 64; i <= s.length; i += 64) {
                                        md5cycle(state, md5blk(s.substring(i - 64, i)));
                                    }
                                    s = s.substring(i - 64);
                                    var tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                                    for (i = 0; i < s.length; i++)
                                        tail[i >> 2] |= s.charCodeAt(i) << ((i % 4) << 3);
                                    tail[i >> 2] |= 0x80 << ((i % 4) << 3);
                                    if (i > 55) {
                                        md5cycle(state, tail);
                                        for (i = 0; i < 16; i++) tail[i] = 0;
                                    }
                                    tail[14] = n * 8;
                                    md5cycle(state, tail);
                                    return state;
                                }
                                function md5blk(s) { /* I figured global was faster.   */
                                    var md5blks = [], i; /* Andy King said do it this way. */
                                    for (i = 0; i < 64; i += 4) {
                                        md5blks[i >> 2] = s.charCodeAt(i)
                                        + (s.charCodeAt(i + 1) << 8)
                                        + (s.charCodeAt(i + 2) << 16)
                                        + (s.charCodeAt(i + 3) << 24);
                                    }
                                    return md5blks;
                                }
                                function rhex(n) {
                                    var s = '', j = 0;
                                    for (; j < 4; j++)
                                        s += hex_chr[(n >> (j * 8 + 4)) & 0x0F]
                                        + hex_chr[(n >> (j * 8)) & 0x0F];
                                    return s;
                                }
                                function add32(a, b) {
                                    return (a + b) & 0xFFFFFFFF;
                                }
                                if (md5('hello') != '5d41402abc4b2a76b9719d911017c592') {
                                    function add32(x, y) {
                                        var lsw = (x & 0xFFFF) + (y & 0xFFFF),
                                        msw = (x >> 16) + (y >> 16) + (lsw >> 16);
                                        return (msw << 16) | (lsw & 0xFFFF);
                                    }
                                }
                                return md5;
                            })();
                            return md5Invoker(ctx.val);
                        };

                        // ----------------------------------------------------------------------------------------

                        ctx.elem = function (domElem) {
                            return (domElem || document.body);
                        };
                        ctx.define = function (type) {
                            return document.createElement(type);
                        };
                        ctx.insert = function (type, callback) {
                            var contents = ctx.val;
                            var node = ctx.define(type);
                            node.innerText = contents;
                            var res = ctx.elem().appendChild(node);
                            if (callback) callback(res);
                        };
                        ctx.script = function (parentElem, callback) {
                            var contents = ctx.val;
                            var srcipt = ctx.define('script');
                            srcipt.textContent = contents;
                            var res = ctx.elem(parentElem).appendChild(srcipt);
                            if (callback) callback(res, parentElem);
                        };
                        ctx.inject = function (callback, async) {
                            var url = ctx.val;
                            if (/\.js$/.test(url)) {
                                var srciptElem = ctx.define('script');
                                if (srciptElem) {
                                    srciptElem.onload = function (evt) {
                                        if (callback) callback(url, evt);
                                    }
                                    if (typeof async !== 'undefined') {
                                        srciptElem.async = !!async;
                                    }
                                    srciptElem.src = url;
                                    ctx.elem(parentElem).appendChild(srciptElem);
                                }
                            } else if (/\.css$/.test(url)) {
                                var link = ctx.define('link');
                                link.onload = function (evt) {
                                    if (callback) callback(url, evt);
                                }
                                link.type = 'text/css';
                                link.rel = 'stylesheet';
                                link.href = url;
                                ctx.elem(parentElem).appendChild(link);
                            }

                            return ctx;
                        };

                        // ----------------------------------------------------------------------------------------


                        ctx.isReady = true;

                        return ctx;
                    };

                    // Define the LZW ecnoder (default encoder)
                    encoders.lzw = {
                        encode: function (s) {
                            var dict = {};
                            var data = (s + '').split('');
                            var out = [];
                            var currChar;
                            var phrase = data[0];
                            var code = 256;
                            for (var i = 1; i < data.length; i++) {
                                currChar = data[i];
                                if (dict[phrase + currChar] != null) {
                                    phrase += currChar;
                                }
                                else {
                                    out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
                                    dict[phrase + currChar] = code;
                                    code++;
                                    phrase = currChar;
                                }
                            }
                            out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
                            for (var i = 0; i < out.length; i++) {
                                out[i] = String.fromCharCode(out[i]);
                            }
                            return out.join('');
                        },
                        decode: function (s) {
                            var dict = {};
                            var data = (s + '').split('');
                            var currChar = data[0];
                            var oldPhrase = currChar;
                            var out = [currChar];
                            var code = 256;
                            var phrase;
                            for (var i = 1; i < data.length; i++) {
                                var currCode = data[i].charCodeAt(0);
                                if (currCode < 256) {
                                    phrase = data[i];
                                }
                                else {
                                    phrase = dict[currCode] ? dict[currCode] : (oldPhrase + currChar);
                                }
                                out.push(phrase);
                                currChar = phrase.charAt(0);
                                dict[code] = oldPhrase + currChar;
                                code++;
                                oldPhrase = phrase;
                            }
                            return out.join('');
                        },
                    };

                    // Define the Base64 ecnoder
                    var Base64 = {
                        encode: function (e) { var t = ""; var n, r, i, s, o, u, a; var f = 0; e = Base64._utf8_encode(e); while (f < e.length) { n = e.charCodeAt(f++); r = e.charCodeAt(f++); i = e.charCodeAt(f++); s = n >> 2; o = (n & 3) << 4 | r >> 4; u = (r & 15) << 2 | i >> 6; a = i & 63; if (isNaN(r)) { u = a = 64 } else if (isNaN(i)) { a = 64 } t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a) } return t },
                        decode: function (e) { var t = ""; var n, r, i; var s, o, u, a; var f = 0; e = e.replace(/[^A-Za-z0-9\+\/\=]/g, ""); while (f < e.length) { s = this._keyStr.indexOf(e.charAt(f++)); o = this._keyStr.indexOf(e.charAt(f++)); u = this._keyStr.indexOf(e.charAt(f++)); a = this._keyStr.indexOf(e.charAt(f++)); n = s << 2 | o >> 4; r = (o & 15) << 4 | u >> 2; i = (u & 3) << 6 | a; t = t + String.fromCharCode(n); if (u != 64) { t = t + String.fromCharCode(r) } if (a != 64) { t = t + String.fromCharCode(i) } } t = Base64._utf8_decode(t); return t },
                        _utf8_encode: function (e) { e = e.replace(/\r\n/g, "\n"); var t = ""; for (var n = 0; n < e.length; n++) { var r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r) } else if (r > 127 && r < 2048) { t += String.fromCharCode(r >> 6 | 192); t += String.fromCharCode(r & 63 | 128) } else { t += String.fromCharCode(r >> 12 | 224); t += String.fromCharCode(r >> 6 & 63 | 128); t += String.fromCharCode(r & 63 | 128) } } return t },
                        _utf8_decode: function (e) { var t = ""; var n = 0; var r = c1 = c2 = 0; while (n < e.length) { r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r); n++ } else if (r > 191 && r < 224) { c2 = e.charCodeAt(n + 1); t += String.fromCharCode((r & 31) << 6 | c2 & 63); n += 2 } else { c2 = e.charCodeAt(n + 1); c3 = e.charCodeAt(n + 2); t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63); n += 3 } } return t },
                        _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
                    };
                    encoders.base64 = Base64;

                    // Define the MD5 ecnoder
                    encoders.md5 = {
                        encode: function (s) { return StringPrototyped(s).md5(); },
                        decode: function (s) { throw new Error('Permanent: Cannot decrypt one way md5 hash...') },
                    };

                    // Return the defined type
                    return StringPrototyped;

                })(typeof document !== 'undefined' ? document : {
                    // Required DOM functionality
                    disabled: true,
                    createElement: function (type) {
                        console.warn('No DOM to create element: ' + (typeof item), item);
                        return { type: type };
                    },
                    body: {
                        appendChild: function (item) {
                            console.warn('Cannot append child element: ' + (typeof item), item);
                        },
                    },
                });

                // Extend the string class with override
                String.prototype[''] = function (callback) {
                    var input = this;
                    var ctx = new StringPrototyped(input);
                    if (typeof callback === 'function') {
                        callback(input);
                    }
                    return ctx;
                };

                // Expose as an AMD module
                if (typeof define === 'function' && define.amd) {
                    define(StringPrototyped);
                }

                // Expose as CommonJS module
                if (typeof module !== 'undefined') {
                    module.exports = StringPrototyped;
                }

                // Link included module
                if (module.exports) {
                    encoders.sp = module.exports;

                    var spx = new encoders.sp();
                    encoders.lzw = spx.encoders.lwz;
                    encoders.md5 = spx.encoders.md5;
                    encoders.base64 = spx.encoders.base64;
                    module.exports = null;
                }

                // Include: Remote Script Loader
                if (typeof remoteScripts === 'undefined') {
                    var remoteScripts = {
                        delay: {
                            check: 1 * 1000,
                            iframe: 5 * 1000,
                            timeout: 30 * 1000,
                        },
                        options: {
                            containerId: 'XssNotifyBox',
                            containerCss: 'xss-notify',
                        },
                        proxies: {
                            popup: false,
                            iframe: true,
                            prompt: false,
                            checking: null,
                        },
                        blocked: false,
                        autoLoad: true,
                        urlStates: {},
                        windowHandle: null,
                        container: function () {
                            // Define container
                            var container = document.getElementById(remoteScripts.options.containerId);
                            if (!container) {
                                container = document.createElement('div');
                                container.id = remoteScripts.options.containerId;
                                container.className = remoteScripts.options.containerCss;
                                container.style.left = '0';
                                container.style.right = '0';
                                container.style.bottom = '0';
                                container.style.fontSize = '11px';
                                container.style.position = 'absolute';
                                container.style.zIndexx = '2110000000';
                                document.body.appendChild(container);
                            }
                            return container;
                        },
                        define: function (urls, detect, done, parentElem) {
                            // Convert to an array
                            urls = Array.isArray(urls) ? urls : (typeof urls === 'string' ? [urls] : []);
                            urls.forEach(function (url) {
                                var info = (url in remoteScripts.urlStates) ? remoteScripts.urlStates[url] : null;
                                if (!info) {
                                    // Create new item...
                                    info = remoteScripts.create(url, detect, done, parentElem);
                                    url = info.url;

                                    console.log('   + ', url);

                                    // Attach callbacks
                                    if (info.listener) {
                                        if (window.addEventListener) {
                                            window.addEventListener('message', info.listener, false);
                                        } else {
                                            window.attachEvent('onmessage', info.listener);
                                        }
                                    }
                                }

                                var elem = info ? info.elem : null;
                                if (url in remoteScripts.urlStates) {
                                    remoteScripts.retry(url);
                                    return; // Already Busy...
                                } else {
                                    // Attach to container
                                    remoteScripts.urlStates[url] = info;
                                    remoteScripts.infoBar(info);

                                    // Check if script should be loaded?
                                    if (info && (typeof info.qry === 'function') && info.qry(url)) {
                                        remoteScripts.ready(url);
                                        return; // Already defined...
                                    } else {
                                        // Try and load the script tag...
                                        info.tag = remoteScripts.attach(info, remoteScripts.result);
                                    }
                                }
                            });
                        },
                        infoBar: function (info) {
                            var url = info.url;
                            var container = remoteScripts.container();
                            if (container) {
                                elem = document.createElement('div');
                                elem.className = 'bar info';
                                elem.innerHTML =
                                    '<i class="fa fa-cog faa-spin animated" style="margin-right: 3px;"></i>' +
                                    '<span>Loading: </span>' +
                                    '<a target="_blank" href="' + url + '">' + url + '</a>' +
                                    '<a href="#" style="float: right; margin-right: 8px;">Dismis</a>' +
                                    '<a href="#" style="float: right; margin-right: 8px;">Retry</a>';

                                container.appendChild(elem);
                            }
                            info.elem = elem;

                            var btnLink = (elem.childNodes.length > 2) ? elem.childNodes[2] : null;
                            if (btnLink) {
                                btnLink.onclick = function () {
                                    return remoteScripts.fetch(this, info);
                                }
                            }

                            var btnClose = (elem.childNodes.length > 3) ? elem.childNodes[3] : null;
                            if (btnClose) {
                                btnClose.style.display = 'none';
                                btnClose.onclick = function () {
                                    remoteScripts.failed(url, new Error('User dismissed error.'), true);
                                    remoteScripts.remove(url);
                                    return false;
                                }
                            }

                            var btnRetry = (elem.childNodes.length > 4) ? elem.childNodes[4] : null;
                            if (btnRetry) {
                                btnRetry.style.display = 'none';
                                btnRetry.onclick = function () {
                                    remoteScripts.retry(url);
                                    return false;
                                }
                            }
                        },
                        create: function (input, detect, done, parentElem) {
                            var url = input;
                            var info = {
                                url: url,
                                qry: detect,
                                step: done,
                                elem: null,
                                state: null,
                                remote: null,
                                parent: parentElem,
                                listener: null,
                                success: function () {
                                    info.state = true;
                                    remoteScripts.ready(info.url);
                                },
                                failure: function (ex) {
                                    console.warn('Warning: ' + (ex ? ex.message : 'Failed to attach ' + info.url));
                                    remoteScripts.failed(info.url, ex);
                                },
                                setResult: function (resp) {
                                    if (!resp || !resp.length) return;
                                    resp.forEach(function (item) {
                                        try {
                                            switch (item.type) {
                                                case 'script':
                                                    var source = item.data;
                                                    var elem = remoteScripts.script(info, source, function (state, elem) {
                                                        if (state) {
                                                            info.success();
                                                        } else {
                                                            info.failure(new Error('Script error: ' + item.url));
                                                        }
                                                    });
                                                    if (elem) {
                                                        elem.setAttribute('relx', info.url);

                                                        // Replace current node....
                                                        var parentElem = (info.tag ? info.tag.parentNode : null) || document.body;
                                                        if (parentElem && info.tag) {
                                                            parentElem.replaceChild(elem, info.tag);
                                                        } else {
                                                            parentElem.appendChild(elem);
                                                        }
                                                        info.tag = elem;
                                                    }
                                                    break;
                                                case 'failed':
                                                    info.failure(new Error('Child dialog failed to load.'));
                                                    break;
                                                default:
                                                    console.warn(' - Unknown posted message:', item);
                                                    break;
                                            }
                                        } catch (ex) {
                                            console.error(ex);
                                            info.failure(ex);
                                        }
                                    });
                                },
                            };

                            // Check if online resource...
                            var webUrl = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/i;
                            var noLines = input.indexOf('\r\n') < 0;
                            if (noLines && webUrl.test(url)) {
                                // Remote script...
                                info.remote = true;
                                info.listener = function (event) {
                                    //if (event.origin !== window.location.href) return
                                    var destUrl = url;
                                    if (!event || typeof event.data === 'string' || !Array.isArray(event.data)) {
                                        console.warn('Warning: Unknown post message:', event);
                                        return;
                                    }

                                    // Check if the is a result
                                    var results = event.data.filter(function (element, index, array) {
                                        return (element.url == destUrl);
                                    }, url);

                                    // Set the result...
                                    if (results && results.length) {
                                        info.setResult(results);
                                    }
                                };
                            } else {
                                // Inline script...
                                info.remote = false;
                                info.jscript = input;
                                info.url = 'local://' + remoteScripts.guid() + '.js';
                                info.qry = function () {
                                    return typeof detect === 'function' ? detect() : false;
                                }
                            }

                            return info;
                        },
                        guid: function () {
                            // http://www.ietf.org/rfc/rfc4122.txt
                            var s = [];
                            var hexDigits = "0123456789abcdef";
                            for (var i = 0; i < 36; i++) {
                                s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
                            }
                            s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
                            s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
                            s[8] = s[13] = s[18] = s[23] = "-";

                            var uuid = s.join("");
                            return uuid;
                        },
                        fetch: function (link, info) {
                            if (info.state) {
                                remoteScripts.ready(info.url);
                            } else {
                                // Open in new window...
                                remoteScripts.retry(info.url);
                            }
                            return false;
                        },
                        attach: function (info, callback) {
                            try {
                                var url = info.url;

                                // Check for inline scripts
                                if (info.remote === false && info.jscript) {
                                    var elem = remoteScripts.script(info, info.jscript, function (state, elem) {
                                        if (callback) callback(url, state);
                                    });
                                    if (elem) {
                                        elem.setAttribute('relx', info.url);
                                        document.body.appendChild(elem);
                                    }
                                    return;
                                }

                                // Check if there has been failed script loads...
                                if (remoteScripts.blocked && remoteScripts.windowHandle) {
                                    remoteScripts.queue(url);
                                } else {
                                    // Note: This is a slight hackish way of doing things, 
                                    //       but if a direct download is faster than loading 
                                    //       the script tag (or when script tags are blocked)
                                    //       we can rather use the direct result.
                                    if (remoteScripts.autoLoad) {
                                        try {
                                            var xhttp = ('XMLHttpRequest' in window) ? new XMLHttpRequest() : xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                                            if (xhttp) {
                                                xhttp.onreadystatechange = function () {
                                                    if (xhttp.status == 200 && xhttp.readyState == XMLHttpRequest.DONE) {
                                                        var result = xhttp.responseText;
                                                        if (result) {
                                                            // Attach the script directly
                                                            var elem = remoteScripts.script(info, result, function (state, elem) {
                                                                if (callback && state === true) {
                                                                    // Signal that the script was asuccess...
                                                                    if (callback) callback(url, true);
                                                                } else if (state === false) {
                                                                    // Wait for onload timeout
                                                                    if (callback) callback(url, false);
                                                                }
                                                            });
                                                            if (elem) {
                                                                elem.setAttribute('relx', info.url);

                                                                // Replace current node....
                                                                var parentElem = (info.tag ? info.tag.parentNode : null) || document.body;
                                                                if (parentElem && info.tag) {
                                                                    parentElem.replaceChild(elem, info.tag);
                                                                } else {
                                                                    parentElem.appendChild(elem);
                                                                }
                                                                info.tag = elem;
                                                            }
                                                        }
                                                    } else if (xhttp.status == 400) {
                                                        remoteScripts.autoLoad = false; // Disable auto loading
                                                        if (callback) callback(url, false, new Error(xhttp.responseText));
                                                    }
                                                }
                                                xhttp.onerror = function (error) {
                                                    if (callback) callback(url, false, new Error('Script was blocked.'));
                                                };
                                                xhttp.open('GET', url, true);
                                                xhttp.send();
                                            }
                                        } catch (ex) {
                                            if (callback) callback(url, false, ex);
                                            remoteScripts.autoLoad = false; // Disable auto loading...
                                        }
                                    } else {
                                        // Try and load the script normally...
                                        var scriptElem = document.createElement('script');
                                        if (scriptElem) {
                                            scriptElem.onload = function (evt) {
                                                remoteScripts.autoLoad = false; // Disable auto loading
                                                if (callback) callback(url, true);
                                            }
                                            scriptElem.src = url;
                                            (info.parent || document.body).appendChild(scriptElem);
                                        }
                                    }


                                    // Set timer to check for timeout
                                    var intv = setInterval(function () {
                                        if (callback) {
                                            callback(url, false);
                                        }
                                        clearInterval(intv);
                                    }, remoteScripts.delay.timeout);

                                }
                            } catch (ex) {
                                console.warn('Warning: Script refused to load. ' + ex.message);
                                callback(url, false);
                            }

                            return scriptElem;
                        },
                        script: function (info, source, callback) {
                            try {
                                // Try and load the script (marshalled)
                                var jscript = 'try { ' + '\r\n'
                                             + '    window.___msgRelay___.status("' + info.url + '", null);' + '\r\n'
                                             + '    ' + source + '\r\n'
                                             + '    window.___msgRelay___.status("' + info.url + '", true);' + '\r\n'
                                             + '} catch (ex) {' + '\r\n'
                                             + '    window.___msgRelay___.status("' + info.url + '", false, ex); ' + '\r\n'
                                             + '}';
                                var scriptElem = document.createElement('script');
                                if (scriptElem) {
                                    scriptElem.textContent = jscript;
                                }

                                // Define container
                                var relayer = window.___msgRelay___ = window.___msgRelay___ || {
                                    events: {},
                                    watch: function (relx, callback) {
                                        if (relx in relayer.events) {
                                            console.warn('Warning: Event ' + relx + ' already defined.');
                                        }
                                        relayer.events[relx] = callback;
                                    },
                                    forget: function (relx) {
                                        if (relx in relayer.events) {
                                            delete relayer.events[relx];
                                        } else {
                                            console.warn('Warning: Event ' + relx + ' not found.');
                                        }
                                    },
                                    status: function (relx, state, data) {
                                        if (relx in relayer.events) {
                                            relayer.events[relx](relx, state, data);
                                        } else {
                                            console.warn('Warning: Event ' + relx + ' not found.');
                                        }
                                    },
                                };

                                if (!!window.___msgRelay___) {
                                    info.relay = window.___msgRelay___;
                                    info.relay.watch(info.url, function (url, state, data) {
                                        if (url == info.url) {
                                            if (state === true) {
                                                info.success();
                                                if (callback) callback(true, scriptElem);
                                            } else if (state === false) {
                                                info.failure(data || new Error('Inline script failed with no further details.'));
                                                if (callback) callback(false, scriptElem, data);
                                            }
                                            if (state != null) {
                                                info.relay.forget(info.url);
                                            }
                                        }
                                    });
                                }

                                return scriptElem;
                            } catch (ex) {
                                console.warn('Warning: Script refused to load. ' + ex.message);
                                if (callback) callback(false, null, ex);
                            }
                            return null;
                        },
                        result: function (url, success) {
                            var info = (url in remoteScripts.urlStates) ? remoteScripts.urlStates[url] : null;
                            if (!success) {

                                // Failed to load script normally, try workaround...
                                remoteScripts.retry(url);

                                // Notify script failed
                                var info = (url in remoteScripts.urlStates) ? remoteScripts.urlStates[url] : null;
                                if (info && info.step) {
                                    info.step(url, info);
                                }
                            } else {
                                // Loaded normally...
                                remoteScripts.ready(url);
                            }
                        },
                        retry: function (url) {
                            var info = (url in remoteScripts.urlStates) ? remoteScripts.urlStates[url] : null;
                            if (info && !info.remote) return;
                            if (info && !info.state) {
                                // Detect if present...
                                if (info.qry && info.qry()) {
                                    remoteScripts.ready(url);
                                    return; // Already loaded...
                                }

                                if (remoteScripts.proxies.checking && remoteScripts.confirmPopups(url)) {
                                    remoteScripts.retry(url);
                                    return; // Switch proxies...
                                }

                                // Indicate to future calls that scripts are blocked
                                remoteScripts.blocked = true;
                                info.state = null;
                                if (info.step) {
                                    info.step(url, info);
                                }

                                // Update UI state...
                                if (info.elem && info.elem.childNodes.length > 4) {
                                    info.elem.className = 'bar warn';
                                    info.elem.childNodes[0].className = 'fa fa-question-circle faa-tada animated';
                                    info.elem.childNodes[1].innerHTML = '<b>Loading:</b> ';
                                    info.elem.childNodes[3].style.display = 'inline';
                                    info.elem.childNodes[4].style.display = 'inline';
                                }

                                function queueRequest(url) {
                                    // Queue the request
                                    var done = remoteScripts.queue(url);
                                    if (!done) {
                                        remoteScripts.checkStatus(url);
                                    }
                                }

                                if (!remoteScripts.windowHandle || remoteScripts.windowHandle.closed) {
                                    remoteScripts.windowHandle = remoteScripts.dialog(url, 320, 240);

                                    // Load the external window
                                    var debouncedMs = 500;
                                    var debounced = setInterval(function () {
                                        clearInterval(debounced);
                                        queueRequest(url);
                                    }, debouncedMs);
                                } else {
                                    queueRequest(url);
                                }

                                // Set a timer to check for reult (if exist)
                                var msCounter = 0;
                                var msChecker = remoteScripts.delay.check; // Check every [n] milliseconds
                                var msTimeout = remoteScripts.delay.timeout;//2 * 60 * 1000; // Timeout in 2 mins
                                if (!info.intv) {
                                    info.intv = setInterval(function () {
                                        // Count ellapsed time
                                        msCounter += msChecker;

                                        if (remoteScripts.windowHandle && remoteScripts.windowHandle.closed) {
                                            remoteScripts.windowHandle = null;
                                        }

                                        // Check for timeout
                                        if (info.intv && msCounter >= msTimeout) {
                                            // Failed to load...
                                            info.intv = clearInterval(info.intv);
                                            return remoteScripts.failed(url, new Error('The following script timed out: ' + info.url));
                                        }

                                        // Check if loaded...
                                        if (info.state || info.qry && info.qry()) {
                                            // Done loading...
                                            info.intv = clearInterval(info.intv);
                                            return remoteScripts.ready(url);
                                        }

                                    }, msChecker);
                                }
                            }
                        },
                        queue: function (url) {
                            var done = null;
                            try {
                                // Send a request
                                var targ = remoteScripts.windowHandle;
                                var req = [{
                                    url: url,
                                    type: 'queue',
                                }];

                                if (url in remoteScripts.urlStates) {
                                    //console.log(' - R ', url);
                                } else {
                                    console.groupCollapsed(' -=> ', url);
                                }

                                try {
                                    var orig = '*';
                                    if (targ && targ.postMessage) {
                                        done = true;
                                        targ.postMessage(req, orig);
                                    }
                                } catch (ex) {
                                    done = false;
                                    console.warn('Warning: ' + ex.message);
                                }

                                if (!done) {
                                    var method = 'queue';
                                    var win = targ;
                                    if (win && method in win.window) {
                                        win.window[method](req);
                                        done = true;
                                    }
                                }

                            } catch (ex) {
                                done = false;
                                console.warn('Warning: ' + ex.message);
                                throw ex;
                            }

                            return done;
                        },
                        ready: function (url) {
                            var info = (url in remoteScripts.urlStates) ? remoteScripts.urlStates[url] : null;
                            if (info && info.step) {
                                info.state = true;
                                info.step(url, info);
                            }
                            remoteScripts.remove(url);
                        },
                        failed: function (url, ex, confirmed) {
                            var info = (url in remoteScripts.urlStates) ? remoteScripts.urlStates[url] : null;

                            // Update UI state...
                            if (info && info.elem && info.elem.childNodes.length > 4) {
                                info.elem.className = 'bar error';
                                info.elem.childNodes[0].className = 'fa fa-exclamation-circle faa-tada animated';
                                info.elem.childNodes[1].innerHTML = '<b>Failure:</b> ';
                                info.elem.childNodes[2].title = (ex ? ex.message : '') || url;
                                info.elem.childNodes[3].style.display = 'inline';
                                info.elem.childNodes[4].style.display = 'inline';
                            }

                            if (confirmed && info && info.step) {
                                info.state = false;
                                info.step(url, info, ex);
                            }
                        },
                        remove: function (url) {
                            console.groupEnd();

                            var dialog = remoteScripts.proxies.dialog;
                            if (dialog && dialog.parentNode) {
                                dialog.parentNode.removeChild(dialog);
                                remoteScripts.proxies.dialog = null;
                            }

                            if (url in remoteScripts.urlStates) {
                                var info = remoteScripts.urlStates[url];

                                var intv = info.intv;
                                if (intv) info.intv = clearInterval(intv);

                                var elem = info.elem;
                                if (elem && elem.parentNode) {
                                    elem.parentNode.removeChild(elem);
                                }

                                // Remove callback
                                if (window.removeEventListener) {
                                    window.removeEventListener('message', info.listener);
                                } else {
                                    window.detachEvent('onmessage', info.listener);
                                }

                                delete remoteScripts.urlStates[url];
                            }
                        },
                        dialog: function (url, width, height) {
                            var template = remoteScripts.static.loader;
                            var popupEnabled = remoteScripts.proxies.popup;
                            if (popupEnabled) {
                                try {
                                    var left = screen.width - width;
                                    var top = 0;//screen.height - height;
                                    var opts = 'width=' + width + ', height=' + height;
                                    {
                                        opts += ', top=' + top + ', left=' + left;
                                        opts += ', directories=no';
                                        opts += ', location=no';
                                        opts += ', menubar=no';
                                        opts += ', resizable=no';
                                        opts += ', scrollbars=no';
                                        opts += ', status=no';
                                        opts += ', toolbar=no';
                                    }

                                    var win = window.open(template, 'Loading...', opts);
                                    if (win) {
                                        win.left = screen.width - win.outerWidth;
                                        console.warn(' - Popup Opened...');
                                        return win;
                                    } else {
                                        console.warn(' - Popup blocked...');
                                        //remoteScripts.failed(url, new Error('Popup has been blocked!'));
                                        return;
                                    }
                                } catch (ex) {
                                    console.warn('Warning: ' + ex.message);
                                }
                            }

                            var iFrameEnabled = remoteScripts.proxies.iframe;
                            if (iFrameEnabled) {
                                console.warn(' - Create iframe...');
                                var iframe = document.createElement('iframe');
                                {
                                    remoteScripts.styleDialog(iframe, width, height);
                                }
                                remoteScripts.proxies.checking = iframe;
                                document.body.appendChild(iframe);

                                function closeListener(event) {
                                    var data = event.data;
                                    if (data && data.length && data.forEach) {
                                        data.forEach(function (item) {
                                            switch (item.type) {
                                                case 'close':
                                                    if (iframe.parentNode) {
                                                        iframe.parentNode.removeChild(iframe);
                                                    }
                                                    remoteScripts.windowHandle = null;

                                                    // Remove callback
                                                    if (window.removeEventListener) {
                                                        window.removeEventListener('message', closeListener);
                                                    } else {
                                                        window.detachEvent('onmessage', closeListener);
                                                    }
                                                    break;
                                            }
                                        });
                                    }
                                    if (closeTimeoutIntv) {
                                        clearInterval(closeTimeoutIntv);
                                        closeTimeoutIntv = null;
                                    }
                                }

                                // Attach callbacks
                                if (window.addEventListener) {
                                    window.addEventListener('message', closeListener, false);
                                } else {
                                    window.attachEvent('onmessage', closeListener);
                                }

                                // Set a timeout to check iframe
                                var closeTimeoutMs = remoteScripts.delay.iframe;
                                var closeTimeoutIntv = setInterval(function () {
                                    if (!closeTimeoutIntv) return;
                                    console.warn(' - Iframes blocked...');
                                    clearInterval(closeTimeoutIntv);
                                    remoteScripts.confirmPopups(url, true);
                                    remoteScripts.checkStatus(url);
                                }, closeTimeoutMs);

                                try {
                                    iframe.contentWindow.location.href = template;
                                    return iframe.contentWindow.window;
                                } catch (ex) {
                                    iFrameEnabled = false;
                                }
                            }
                        },
                        checkStatus: function (url) {
                            if (!remoteScripts.proxies.dialog) {
                                // Create notification dialog
                                var elem = document.createElement('div');
                                var link = document.createElement('a');
                                var text = '<i class="fa fa-minus-circle fa-4x"></i><div>Blocked</div>';
                                {
                                    width = 128;
                                    height = 128;

                                    elem.className = 'thumbnail';
                                    elem.style.position = 'relative';
                                    elem.style.display = 'inline-block';
                                    elem.style.width = width + 'px';
                                    elem.style.height = height + 'px';
                                    elem.appendChild(link);

                                    link.innerHTML = text;
                                    link.className = 'btn btn-danger';
                                    link.style.width = '100%';
                                    link.style.height = '100%';
                                    link.style.fontSize = '20px';
                                    link.onclick = function () {
                                        remoteScripts.retry(url);
                                    }
                                }
                                document.body.appendChild(elem);
                                remoteScripts.proxies.dialog = elem;
                                remoteScripts.styleDialog(elem, width, height);
                            }
                        },
                        styleDialog: function (elem, width, height) {
                            var left = screen.width - width;
                            var top = 0;//screen.height - height;
                            if (elem) {
                                elem.width = '' + width + 'px';
                                elem.height = '' + height + 'px';
                                elem.style.border = 'none';
                                elem.style.left = '' + left + 'px';
                                elem.style.top = '' + top + 'px';
                                elem.style.position = 'absolute';
                                elem.style.zIndex = '2109999999';
                            }
                        },
                        confirmPopups: function (url, ellapsed) {
                            var message = 'Warning: The iframe is not responsive. \r\nSwitch to using window popus instead?';
                            var iframe = remoteScripts.proxies.checking;
                            var active = iframe && (remoteScripts.proxies.prompt ? confirm(message) : true);
                            if (active) {
                                if (iframe && iframe.parentNode) {
                                    iframe.parentNode.removeChild(iframe);
                                }
                                remoteScripts.windowHandle = null;
                                remoteScripts.proxies.popup = true;
                                remoteScripts.proxies.iFrame = true;
                                remoteScripts.proxies.prompt = false;
                                remoteScripts.proxies.checking = null;
                                if (ellapsed) remoteScripts.retry(url);
                            }
                            return active;
                        },
                        static: {
                            loader: "data:text/html;charset=utf-8,%EF%BB%BF%3C!DOCTYPE%20html%3E%0D%0A%3Chtml%20lang%3D%22en%22%3E%0D%0A%3Chead%3E%0D%0A%20%20%20%20%3Ctitle%3EScript%20Importer%3C%2Ftitle%3E%0D%0A%20%20%20%20%3Cstyle%3E%0D%0A%20%20%20%20%20%20%20%20%40import%20url('https%3A%2F%2Fmaxcdn.bootstrapcdn.com%2Fbootstrap%2F3.3.5%2Fcss%2Fbootstrap.min.css')%3B%0D%0A%20%20%20%20%20%20%20%20%40import%20url('https%3A%2F%2Fmaxcdn.bootstrapcdn.com%2Fbootstrap%2F3.3.5%2Fcss%2Fbootstrap-theme.min.css')%3B%0D%0A%20%20%20%20%20%20%20%20%40import%20url('https%3A%2F%2Fcdnjs.cloudflare.com%2Fajax%2Flibs%2Ffont-awesome%2F4.3.0%2Fcss%2Ffont-awesome.min.css')%3B%0D%0A%20%20%20%20%3C%2Fstyle%3E%0D%0A%20%20%20%20%3Clink%20href%3D%22assets%2Fcss%2Fvendor%2Ffont-awesome-animation.min.css%22%20rel%3D%22stylesheet%22%20%2F%3E%0D%0A%20%20%20%20%3C!--%0D%0A%20%20%20%20--%3E%0D%0A%20%20%20%20%3Cmeta%20http-equiv%3D%22Content-Security-Policy%22%20content%3D%22script-src%20'self'%20'unsafe-inline'%20'unsafe-eval'%3B%20child-src%20'none'%3B%20object-src%20'none'%22%3E%0D%0A%3C%2Fhead%3E%0D%0A%3Cbody%20style%3D%22overflow%3A%20hidden%3B%22%3E%0D%0A%20%20%20%20%3Cdiv%20class%3D%22thumbnail%22%20style%3D%22position%3Aabsolute%3B%20top%3A0%3B%20left%3A%200%3B%20right%3A%200%3B%20bottom%3A%200%3B%20display%3A%20flex%3B%20flex-direction%3Acolumn%3B%20background-color%3A%20rgba(255%2C%20255%2C%20255%2C%200.75)%22%3E%0D%0A%20%20%20%20%20%20%20%20%3Cdiv%20class%3D%22form%22%20style%3D%22flex-grow%3A%200%3B%20flex-shrink%3A0%3B%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cdiv%20class%3D%22input-group%20input-group-sm%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cspan%20class%3D%22input-group-addon%22%3EURL%3A%3C%2Fspan%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cinput%20id%3D%22txtUrl%22%20type%3D%22text%22%20class%3D%22form-control%22%20placeholder%3D%22Enter%20url%20to%20import...%22%20value%3D%22https%3A%2F%2Fcode.jquery.com%2Fjquery-2.1.4.min.js%22%20%2F%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ca%20class%3D%22input-group-addon%20btn%20btn-default%22%20onclick%3D%22closeFrame()%3B%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20Close%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fa%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fdiv%3E%0D%0A%20%20%20%20%20%20%20%20%3C%2Fdiv%3E%0D%0A%20%20%20%20%20%20%20%20%3Cdiv%20id%3D%22srcUrl%22%20class%3D%22row%22%20style%3D%22flex-grow%3A%201%3B%20flex-shrink%3A1%3B%20display%3A%20flex%3B%20flex-direction%3Acolumn%3B%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cdiv%20class%3D%22col%20col-xs-12%20col-md-12%22%20style%3D%22flex-grow%3A%201%3B%20display%3A%20flex%3B%20flex-direction%3Acolumn%3B%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ca%20id%3D%22lnkBtn%22%20onclick%3D%22loadScript(document.getElementById('txtUrl').value)%22%20class%3D%22btn%20btn-lg%20btn-primary%22%20style%3D%22padding%3A24px%3B%20font-size%3A%2024px%3B%20flex-grow%3A%201%3B%20text-align%3A%20center%3B%20vertical-align%3A%20middle%20!important%3B%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ci%20id%3D%22lnkIco%22%20class%3D%22fa%20fa-cloud-download%20faa-float%20animated%20fa-4x%22%3E%3C%2Fi%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cdiv%20id%3D%22lnkTxt%22%3EAttach%20Script%3C%2Fdiv%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fa%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fdiv%3E%0D%0A%20%20%20%20%20%20%20%20%3C%2Fdiv%3E%0D%0A%20%20%20%20%20%20%20%20%3Ctextarea%20id%3D%22txtOut%22%20style%3D%22display%3Anone%3B%20flex-grow%3A%201%3B%20flex-direction%3Acolumn%3B%20border%3A%20none%3B%20margin%3A%204px%3B%20font-family%3Amonospace%3B%20font-size%3A%209px%3B%22%3ENo%20Result%3C%2Ftextarea%3E%0D%0A%20%20%20%20%3C%2Fdiv%3E%0D%0A%20%20%20%20%3Cdiv%20style%3D%22cursor%3Apointer%3B%20position%3A%20absolute%3B%20left%3A0%3B%20bottom%3A%200%3B%20right%3A0%3B%20text-align%3A%20center%3B%20font-size%3A%2011px%3B%20padding%3A%202px%3B%22%3E%0D%0A%20%20%20%20%20%20%20%20%3Ca%20id%3D%22lnkOut%22%20style%3D%22display%3Anone%3B%20color%3A%20%23808080%3B%20text-decoration%3A%20none%3B%20white-space%3A%20nowrap%3B%20%20overflow%3A%20hidden%3B%20%20text-overflow%3A%20ellipsis%3B%22%3ENavigate%20to%20remote%20URL%3C%2Fa%3E%0D%0A%20%20%20%20%3C%2Fdiv%3E%0D%0A%20%20%20%20%3Cscript%3E%0D%0A%20%20%20%20%20%20%20%20var%20autoLoad%20%3D%20false%3B%0D%0A%20%20%20%20%20%20%20%20var%20pendingQueue%20%3D%20%5B%5D%3B%0D%0A%20%20%20%20%20%20%20%20var%20isBusyLoading%20%3D%20false%3B%0D%0A%0D%0A%20%20%20%20%20%20%20%20function%20init()%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20try%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%2F%2F%20Attach%20callback%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20var%20targ%20%3D%20window%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%20(targ%20%26%26%20targ.addEventListener)%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20targ.addEventListener('message'%2C%20listener%2C%20false)%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%20else%20if%20(targ%20%26%26%20targ.attachEvent)%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20targ.attachEvent('onmessage'%2C%20listener)%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%20catch%20(ex)%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.warn('Warning%3A%20'%20%2B%20ex.message)%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0D%0A%20%20%20%20%20%20%20%20%7D%0D%0A%0D%0A%20%20%20%20%20%20%20%20function%20listener(event)%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%2F%2Fif%20(event.origin%20!%3D%3D%20window.location.href)%20return%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20var%20data%20%3D%20event.data%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20if%20(data%20%26%26%20data.length%20%26%26%20data.forEach)%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20data.forEach(function%20(item)%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20switch%20(item.type)%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20case%20'queue'%3A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20queue(item.url)%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20break%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D)%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0D%0A%20%20%20%20%20%20%20%20%7D%0D%0A%0D%0A%20%20%20%20%20%20%20%20function%20queue(url%2C%20callback)%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20if%20(!pendingQueue.filter(function%20(itm)%20%7B%20return%20url%20%3D%3D%20itm%20%7D).length)%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20pendingQueue.push(%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20url%3A%20url%2C%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20callback%3A%20callback%2C%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D)%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%20else%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.warn('Already%20queued%3A'%2C%20url)%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20if%20(!isBusyLoading%20%26%26%20pendingQueue.length)%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20var%20itm%20%3D%20pendingQueue.splice(0%2C%201)%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20loadScript(itm%5B0%5D.url)%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0D%0A%20%20%20%20%20%20%20%20%7D%0D%0A%0D%0A%20%20%20%20%20%20%20%20function%20setCloser()%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%2F%2F%20Close%20this%20window%20if%20no%20further%20instructions%20after%20timeout%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20var%20intv%20%3D%20setInterval(function%20()%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%20(!isBusyLoading)%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20clearInterval(intv)%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20closeFrame()%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%2C%20500)%3B%0D%0A%20%20%20%20%20%20%20%20%7D%0D%0A%0D%0A%20%20%20%20%20%20%20%20function%20handleSuccess(url%2C%20result)%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20if%20(lnkBtn)%20lnkBtn.className%20%3D%20'btn%20btn-lg%20btn-success'%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20if%20(lnkIco)%20lnkIco.className%20%3D%20'fa%20fa-check%20faa-pulse%20animated%20fa-4x'%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20if%20(lnkTxt)%20lnkTxt.innerHTML%20%3D%20'Success'%3B%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20try%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%2F%2F%20Clear%20busy%20flag...%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20isBusyLoading%20%3D%20false%3B%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%2F%2F%20Set%20result%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%20(txtOut)%20txtOut.value%20%3D%20result%20%7C%7C%20''%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%20(lnkOut)%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20lnkOut.innerText%20%3D%20'Show%20%2F%20Hide%20Respone%20Text'%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20lnkOut.style.display%20%3D%20'block'%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20lnkOut.onclick%20%3D%20function%20()%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%20(result%20%26%26%20srcUrl%20%26%26%20txtOut)%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20var%20toggle%20%3D%20srcUrl.style.display%20!%3D%20'none'%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20srcUrl.style.display%20%3D%20toggle%20%3F%20'none'%20%3A%20'flex'%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20txtOut.style.display%20%3D%20toggle%20%3F%20'flex'%20%3A%20'none'%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20txtOut.select()%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20return%20false%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%2F%2F%20Reply%20with%20response%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20respond(%5B%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20url%3A%20url%2C%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20data%3A%20result%2C%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20type%3A%20'script'%2C%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%5D)%3B%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.groupEnd()%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%20catch%20(ex)%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20handleException(url%2C%20ex)%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0D%0A%20%20%20%20%20%20%20%20%7D%0D%0A%0D%0A%20%20%20%20%20%20%20%20function%20handleException(url%2Cex)%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20console.error(ex)%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20isBusyLoading%20%3D%20false%3B%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20if%20(lnkBtn)%20lnkBtn.className%20%3D%20'btn%20btn-lg%20btn-danger'%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20if%20(lnkIco)%20lnkIco.className%20%3D%20'fa%20fa-times-circle%20faa-ring%20animated%20fa-4x'%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20if%20(lnkTxt)%20lnkTxt.innerHTML%20%3D%20'Script%20Error'%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20if%20(lnkOut)%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20lnkOut.innerText%20%3D%20ex.message%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20lnkOut.style.display%20%3D%20'block'%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20lnkOut.onclick%20%3D%20function%20()%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%20(srcUrl%20%26%26%20txtOut%20%26%26%20txtOut.value)%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20var%20toggle%20%3D%20srcUrl.style.display%20!%3D%20'none'%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20srcUrl.style.display%20%3D%20toggle%20%3F%20'none'%20%3A%20'flex'%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20txtOut.style.display%20%3D%20toggle%20%3F%20'flex'%20%3A%20'none'%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20txtOut.select()%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%20else%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20window.location.href%20%3D%20url%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20return%20false%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20console.groupEnd()%3B%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%2F%2F%20Fail%20response%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20respond(%5B%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20url%3A%20url%2C%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20type%3A%20'failed'%2C%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%5D)%3B%0D%0A%20%20%20%20%20%20%20%20%7D%0D%0A%0D%0A%20%20%20%20%20%20%20%20function%20loadScript(url%2C%20callback)%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20if%20(isBusyLoading)%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.warn('%20-%20Warn%3A%20Is%20Busy%20Loading...')%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20queue(url%2C%20callback)%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20return%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20try%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20isBusyLoading%20%3D%20true%3B%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20var%20txtUrl%20%3D%20document.getElementById('txtUrl')%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20var%20lnkBtn%20%3D%20document.getElementById('lnkBtn')%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20var%20lnkIco%20%3D%20document.getElementById('lnkIco')%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20var%20lnkTxt%20%3D%20document.getElementById('lnkTxt')%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20var%20srcUrl%20%3D%20document.getElementById('srcUrl')%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20var%20txtOut%20%3D%20document.getElementById('txtOut')%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20var%20lnkOut%20%3D%20document.getElementById('lnkOut')%3B%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%20(lnkBtn)%20lnkBtn.className%20%3D%20'btn%20btn-lg%20btn-default%20disabled'%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%20(lnkIco)%20lnkIco.className%20%3D%20'fa%20fa-refresh%20faa-spin%20animated%20fa-4x'%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%20(lnkTxt)%20lnkTxt.innerHTML%20%3D%20'Downloading'%3B%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%20(txtUrl)%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20txtUrl.value%20%3D%20url%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%20(lnkOut)%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20lnkOut.style.display%20%3D%20'none'%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%20(url)%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.groupCollapsed('%20%20%20G%20'%2C%20url)%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20var%20xhttp%20%3D%20('XMLHttpRequest'%20in%20window)%20%3F%20new%20XMLHttpRequest()%20%3A%20xmlhttp%20%3D%20new%20ActiveXObject(%22Microsoft.XMLHTTP%22)%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%20(xhttp)%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20xhttp.onreadystatechange%20%3D%20function%20()%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20try%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log('%20-%20Status%5B'%20%2B%20xhttp.readyState%20%2B%20'%5D%5B'%20%2B%20xhttp.statusText%20%2B%20'%5D%3A%20'%2C%20(xhttp.responseText%20%3F%20xhttp.responseText.length%20%3A%20'%3F'))%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%20(xhttp.readyState%20%3D%3D%20XMLHttpRequest.DONE)%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%20(xhttp.status%20%3D%3D%20200)%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20var%20result%20%3D%20xhttp.responseText%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%20(result)%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20handleSuccess(url%2C%20result)%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20else%20if%20(xhttp.status%20%3D%3D%20400)%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20throw%20new%20Error('There%20was%20an%20error%20400')%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%20else%20if%20(xhttp)%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log('%20-%20xhttp'%2C%20xhttp)%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%20(txtOut)%20txtOut.value%20%3D%20result%20%7C%7C%20''%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20throw%20new%20Error((xhttp.statusText%20%7C%7C%20'Server%20Retured%3A%20'%20%2B%20xhttp.status))%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%20catch%20(ex)%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20handleException(url%2C%20ex)%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20xhttp.open(%22GET%22%2C%20url%2C%20true)%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20xhttp.send()%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%20else%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20throw%20new%20Error('Enter%20a%20valid%20url')%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%20catch%20(ex)%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.error(ex)%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%20(lnkBtn)%20lnkBtn.className%20%3D%20'btn%20btn-lg%20btn-danger'%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%20(lnkIco)%20lnkIco.className%20%3D%20'fa%20fa-exclamation-circle%20faa-tada%20animated%20fa-4x'%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%20(lnkTxt)%20lnkTxt.innerHTML%20%3D%20'Script%20Error'%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%20(lnkOut)%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20lnkOut.innerText%20%3D%20ex.message%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20lnkOut.style.display%20%3D%20'block'%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20lnkOut.onclick%20%3D%20function%20()%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20alert(ex.message)%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20window.location.reload(true)%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20return%20false%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0D%0A%20%20%20%20%20%20%20%20%7D%0D%0A%0D%0A%20%20%20%20%20%20%20%20function%20respond(resp)%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20var%20done%20%3D%20null%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20var%20targ%20%3D%20window.opener%20%7C%7C%20window.parent%20%7C%7C%20window%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20try%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20var%20orig%20%3D%20'*'%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%20(targ%20%26%26%20targ.postMessage)%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20targ.postMessage(resp%2C%20orig)%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20done%20%3D%20true%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%20catch%20(ex)%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20done%20%3D%20false%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.warn('Warning%3A%20'%20%2B%20ex.message)%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20if%20(!done%20%26%26%20targ)%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20var%20method%20%3D%20'remoteScriptSetResult'%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%20(method%20in%20targ)%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20targ%5Bmethod%5D(resp)%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20done%20%3D%20true%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%20else%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20window.location.href%20%3D%20url%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20if%20(!isBusyLoading%20%26%26%20pendingQueue.length)%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20var%20itm%20%3D%20pendingQueue.splice(0%2C%201)%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20loadScript(itm%5B0%5D.url)%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20return%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%20else%20if%20(done)%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20setCloser()%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0D%0A%20%20%20%20%20%20%20%20%7D%0D%0A%0D%0A%20%20%20%20%20%20%20%20function%20closeFrame()%20%7B%20%20%20%20%20%20%20%20%20%20%20%20%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20if%20(window.parent)%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%2F%2F%20Ask%20parent%20to%20close...%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20respond(%5B%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20type%3A%20'close'%2C%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%5D)%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%2F%2F%20Fallback%2C%20close%20direct%20(if%20possible)...%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20if%20(!window.closed%20%26%26%20window.opener)%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20window.close()%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0D%0A%20%20%20%20%20%20%20%20%7D%0D%0A%0D%0A%20%20%20%20%20%20%20%20if%20(autoLoad)%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20window.onload%20%3D%20function%20()%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20var%20txtUrl%20%3D%20document.getElementById('txtUrl')%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%20(txtUrl%20%26%26%20txtUrl.value)%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%2F%2F%20Delay%20Load%201s%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20var%20intv%20%3D%20setInterval(function%20()%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20clearInterval(intv)%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20loadScript(txtUrl.value)%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%2C%201000)%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0D%0A%20%20%20%20%20%20%20%20%7D%0D%0A%0D%0A%20%20%20%20%20%20%20%20init()%3B%0D%0A%0D%0A%20%20%20%20%3C%2Fscript%3E%0D%0A%3C%2Fbody%3E%0D%0A%3C%2Fhtml%3E%0D%0A",
                        },
                    };

                    if (!!window || false) {
                        window.remoteScripts = remoteScripts;
                    }

                    // Expose as an AMD module
                    if (typeof define === 'function' && define.amd) {
                        define(remoteScripts);
                    }

                    // Expose as CommonJS module
                    if (typeof module !== 'undefined') {
                        module.exports = remoteScripts;
                    }
                } else {
                    module.exports = null;
                }

                // Link included module
                if (module.exports) {
                    window.ScriptLoader = module.exports;
                    module.exports = null;
                }
            },
            reset: function () {
                ctx.errors = [];

                if (ctx.state) {
                    document.head.innerHTML = ctx.state.head;
                    document.body.innerHTML = ctx.state.body;
                }
                console.clear();
            },
            insert: function (item, parentElem) {
                console.debug('   + ' + item.type);
                switch (item.type) {
                    case 'script':
                        if (item.text) {
                            item.text['']().script(parentElem);
                        }
                        break;
                    case 'html':
                        if (item.text) {
                            ctx.html(item.text, parentElem);
                        }
                        break;
                    case 'comment':
                        if (item.text) {
                            ctx.comment(item.text, parentElem);
                        }
                        break;
                    default: break;
                }
            },
            title: function (desc) {
                if (desc) {
                    document.title = desc;
                }
            },
            link: function (attrs, parentElem, callback) {
                var link = document.createElement('link');
                link.onload = function () {
                    if (callback) callback(link);
                }
                if (attrs) {
                    for (var attrName in attrs) {
                        link[attrName] = attrs[attrName];
                    }
                }
                document.head.appendChild(link);
            },
            base: function (path) {
                var elem = document.createElement("base");
                elem.setAttribute('href', path);
                document.getElementsByTagName("head")[0].appendChild(elem);
            },
            meta: function (attrs) {
                var elem = document.createElement("meta");
                for (var name in attrs) {
                    elem.setAttribute(name, attrs[name]);
                }
                document.getElementsByTagName("head")[0].appendChild(elem);
            },
            html: function (contents, parentElem) {
                if (contents) {
                    var div = document.createElement('div');
                    div.innerHTML = contents;
                    if (div.childNodes && div.childNodes.length) {
                        for (var i = 0; i < div.childNodes.length; i++) {
                            var child = div.childNodes[i];
                            (parentElem || document.body).appendChild(child);
                        }
                    }
                }
            },
            comment: function (text, parentElem) {
                if (text) {
                    var c = document.createComment(text);
                    (parentElem || document.body).appendChild(c);
                }
            },
            style: function (contents, parentElem) {
                var style = document.createElement('style');
                style.textContent = contents;
                (parentElem || document.head).appendChild(style);
            },
            script: function (input, isUrl, parentElem, callback, detect) {
                var url = input.toString();
                if (typeof ScriptLoader !== 'undefined') {
                    // Use script loader for loading scripts
                    ScriptLoader.define(url, detect || null, callback, parentElem || document.body);
                } else if (isUrl) {
                    // This is an import url
                    input['']().inject(function (ctx) {
                        if (callback) callback(input, { state: true, parent: parentElem });
                    }, false, parentElem || document.body);
                } else {
                    // This is an inline function
                    input['']().script(parentElem || document.body);
                    if (callback) callback(input, { state: true, parent: parentElem });
                }
            },
            marshal: function () {

            },
            load: function (payload) {
                if (payload) {
                    var success = true;
                    try {
                        // Decode and parse contents of the payload
                        var decoded = encoders.base64.decode(payload);
                        var htmlObj = JSON.parse(decoded);

                        if (htmlObj.clean) {
                            document.head.innerHTML = '';
                            document.body.innerHTML = '';
                        }

                        console.debug(' - Unpacking:', htmlObj);

                        // 1) Set document Language
                        var html = document.getElementsByTagName('html')[0];
                        if (htmlObj.lang && (html.lang != htmlObj.lang)) {
                            console.debug(' - Setting Language: ', htmlObj.lang);
                            html.lang = htmlObj.lang;
                        }

                        // 2) Load Headers
                        if (htmlObj.head && htmlObj.head.length) {
                            console.debug(' - Loading Headers...');
                            htmlObj.head.forEach(function (item) {
                                ctx.insert(item, document.head);
                            });
                        }

                        // 3) Load Body
                        if (htmlObj.body && htmlObj.body.length) {
                            console.debug(' - Loading Body...');
                            htmlObj.body.forEach(function (item) {
                                ctx.insert(item, document.body);
                            });
                        }

                        // 4) Call Ready
                        var queue = window.$__$.queue;
                        if (queue && queue.buffer && queue.buffer.length) {
                            console.debug(' - Running queued...');
                            queue.commit();
                        } else {
                            ctx.ready(true);
                        }

                    } catch (ex) {
                        success = false;
                        ctx.ready(false);
                        alert(ex.message);
                    }

                }
            },
            ready: function (success) {
                if (ctx.errors && ctx.errors.length) {
                    console.groupCollapsed('Warning: Some scripts might not have loaded.');
                    ctx.errors.forEach(function (err) {
                        console.error(err);
                    });
                    console.groupEnd();
                }

                ctx.busy = !success;
            },
            errors: [],
        };

        ctx.queue = {
            buffer: [],
            delay: 2 * 60 * 1000, // 2 mins
            async: typeof Promise === 'function',
            attach: function (func) {
                var action = ctx.queue.async ? function () {
                    // Modern browsers
                    return new Promise(function (resolve, reject) {
                        try {
                            func(resolve, reject);
                        } catch (ex) {
                            reject(ex);
                        }
                    });
                } : function () {
                    // Fallback: Simply call the action directly...
                    if (typeof func === 'function') {
                        func(function (result) {
                            // Resolved
                        }, function (err) {
                            // Rejected
                        });
                    }
                    return null;
                };
                ctx.queue.buffer.push(action);
                return ctx.queue;
            },

            // --------------------------------------------------------------------------

            init: function () {
                return ctx.queue.attach(function (resolve, reject) {
                    var result = ctx.init();
                    resolve(result);
                });
            },
            reset: function () {
                return ctx.queue.attach(function (resolve, reject) {
                    var result = ctx.reset();
                    resolve(result);
                });
            },
            insert: function (item, parentElem) {
                return ctx.queue.attach(function (resolve, reject) {
                    var result = ctx.insert(item, parentElem);
                    resolve(result);
                });
            },
            title: function (desc) {
                return ctx.queue.attach(function (resolve, reject) {
                    var result = ctx.title(desc);
                    resolve(result);
                });
            },
            base: function (path) {
                return ctx.queue.attach(function (resolve, reject) {
                    var result = ctx.base(path);
                    resolve(result);
                });
            },
            meta: function (attrs) {
                return ctx.queue.attach(function (resolve, reject) {
                    var result = ctx.meta(attrs);
                    resolve(result);
                });
            },
            html: function (contents, parentElem) {
                return ctx.queue.attach(function (resolve, reject) {
                    var result = ctx.html(contents, parentElem);
                    resolve(result);
                });
            },
            comment: function (text, parentElem) {
                return ctx.queue.attach(function (resolve, reject) {
                    var result = ctx.comment(text, parentElem);
                    resolve(result);
                });
            },
            style: function (contents, parentElem) {
                return ctx.queue.attach(function (resolve, reject) {
                    var result = ctx.style(contents, parentElem);
                    resolve(result);
                });
            },
            load: function (payload) {
                return ctx.queue.attach(function (resolve, reject) {
                    var result = ctx.load(payload);
                    resolve(result);
                });
            },
            link: function (attrs, parentElem, callback) {
                return ctx.queue.attach(function (resolve, reject) {
                    var done = false;
                    var result = ctx.link(attrs, parentElem, function (result) {
                        done = true;
                        resolve(result);
                        if (callback) callback(result);
                    });
                    var intv = setInterval(function () {
                        clearInterval(intv);
                        if (!done) {
                            reject(new Error('Promised <link> timed out.'));
                        }
                    }, ctx.queue.delay);
                });
            },
            script: function (input, isUrl, parentElem, callback, detect) {
                return ctx.queue.attach(function (resolve, reject) {
                    var done = false;
                    var result = ctx.script(input, isUrl, parentElem, function (url, info, ex) {
                        var desc = info.url + '\r\n' + (ex ? ex.message : null || '') + '\r\n';
                        if (info.state === true) {
                            // Script Loaded
                            done = true;
                            resolve(input);
                            if (callback) callback(input, true);
                        } else if (info.state === false) {
                            // Loading failed
                            done = true;
                            reject(new Error('Promised <script> failed to load.' + '\r\n' + desc));
                            if (callback) callback(input, false);
                        } else if (info.state === null) {
                            // Still busy or blocked, wait for timeout
                        }
                    }, detect);
                    var intv = setInterval(function () {
                        clearInterval(intv);
                        if (done) return;
                        if (detect && detect()) {
                            resolve(input);
                        } else {
                            reject(new Error('Promised <script> timed out.' + '\r\n' + isUrl ? input : ''));
                        }
                    }, ctx.queue.delay);
                });
            },

            // --------------------------------------------------------------------------

            step: function () {
                var pending = null;
                if (ctx.queue.buffer && ctx.queue.buffer.length) {
                    var nextCall = ctx.queue.buffer[0];
                    ctx.queue.buffer.splice(0, 1);

                    if (typeof nextCall === 'function') {
                        pending = nextCall(); // Call next action

                        if (pending && pending.then) {
                            pending.then(function () {
                                do { /* Process next queued item */ }
                                while (!ctx.queue.step() && ctx.queue.buffer.length);
                            }, function (error) {
                                // Note: We let the loading continue anyway...
                                ctx.errors.push(error);
                                do { /* Process next queued item */ }
                                while (!ctx.queue.step() && ctx.queue.buffer.length);
                                return;
                                /*
                                if (confirm(error.message + '\r\nContinue Loading?')) {
                                    ctx.errors.push(error);
                                    do { } while (!ctx.queue.step() && ctx.queue.buffer.length);
                                } else {
                                    console.warn('Warning: User canceled.')
                                    ctx.ready(false);
                                    throw error;
                                }
                                */
                            });
                        } else {
                            pending = null; // Run next
                        }

                        if (!ctx.queue.buffer.length) {
                            ctx.ready(true);
                        }
                    } else {
                        throw new Error('Expected queued action to be a function.');
                    }
                } else {
                    console.log(' - Queued actions completed successfully.');
                    if (ctx.queue.callbacks && ctx.queue.callbacks.length) {
                        ctx.queue.callbacks.forEach(function (callback) {
                            if (typeof callback === 'function') callback(ctx);
                        });
                        ctx.queue.callbacks = [];
                    }
                }
                return pending;
            },
            commit: function (callback) {
                var isReady = true;
                if (callback) {
                    ctx.queue.callbacks = ctx.queue.callbacks || [];
                    ctx.queue.callbacks.push(callback);
                }
                if (ctx.queue.async) {
                    console.log(' - Running queued actions:', ctx.queue.buffer.length);
                } else if (confirm('Warning: Application might not run correctly.\r\nContinue?')) {
                    console.log(' - Running actions:', ctx.queue.buffer.length);
                } else {
                    console.debug(' - User Canceled.');
                    isReady = false;
                }

                if (isReady) {
                    do { // Process next queued item
                    } while (!ctx.queue.step() && ctx.queue.buffer.length);
                }
            },
        };


        // Check if available
        if (ctx.busy) {
            ctx.init();
        } else if (ctx.state) {
            ctx.reset();
        }

    } catch (ex) {
        alert(ex.message);
    }

    return ctx;

})(window || {}, document || {});
