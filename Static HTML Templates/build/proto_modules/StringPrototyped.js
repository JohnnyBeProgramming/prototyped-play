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
            ctx.elem().appendChild(node);
            if (callback) callback(res, parentElem);
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
            if (/\.js/.test(url)) {
                var srcipt = ctx.define('script');
                ctx.elem().appendChild(script);
                srcipt.onload = function (evt) {
                    if (callback) callback(url, evt);
                }
                if (typeof async !== 'undefined') {
                    srcipt.async = async;
                }
                srcipt.src = url;
            } else if (/\.css/.test(url)) {
                var link = ctx.define('link');
                link.onload = function (evt) {
                    if (callback) callback(url, evt);
                }
                link.type = 'text/css';
                link.rel = 'stylesheet';
                link.href = url;
                ctx.elem().appendChild(link);
            }

            return ctx;
        };


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
    var md5 = (function () {
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
    encoders.md5 = {
        encode: function (s) { return md5(s); },
        decode: function (s) { throw new Error('Permanent: Cannot decrypt one way md5 hash...') },
    };

    // Regoster the SCSU Compression module (if found)
    if (typeof SCSU !== 'undefined') {
        var scsuWorker = new SCSU();
        var scsuCompressor = {
            encode: function (input) {
                return scsuWorker.compress(input);
            },
            decode: function (input) {
                return scsuWorker.decompress(input);
            }
        };
        encoders.scsu = scsuCompressor;
    }

    // expose as an AMD module
    if (typeof define === 'function' && define.amd) {
        define(StringPrototyped);
    }

    // Return the defined type
    return StringPrototyped;

})(typeof document !== 'undefined' ? document : {
    // Used DOM functionality
    notReady: true,
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

if (typeof module !== 'undefined') {
    module.exports = StringPrototyped;
}