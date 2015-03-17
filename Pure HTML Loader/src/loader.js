function loadResources() {
    var opts = window.opts;
    try {
        // Populate options for styles and scripts
        createList('ulStyles', 'style', opts);
        createList('ulScripts', 'script', opts);

        // Define a script loading utility (StringPrototyped Extender)
        var found = typeof StringPrototyped != 'undefined';
        !function (window, document) {
            var encoders = {}, lzwCompressor = { encode: function (e) { for (var t, n = {}, o = (e + "").split(""), r = [], c = o[0], i = 256, d = 1; d < o.length; d++) t = o[d], null != n[c + t] ? c += t : (r.push(c.length > 1 ? n[c] : c.charCodeAt(0)), n[c + t] = i, i++, c = t); r.push(c.length > 1 ? n[c] : c.charCodeAt(0)); for (var d = 0; d < r.length; d++) r[d] = String.fromCharCode(r[d]); return r.join("") }, decode: function (e) { for (var t, n = {}, o = (e + "").split(""), r = o[0], c = r, i = [r], d = 256, s = 1; s < o.length; s++) { var u = o[s].charCodeAt(0); t = 256 > u ? o[s] : n[u] ? n[u] : c + r, i.push(t), r = t.charAt(0), n[d] = c + r, d++, c = t } return i.join("") } }; if (encoders.lzw = lzwCompressor, "undefined" != typeof SCSU) { var scsuWorker = new SCSU, scsuCompressor = { encode: function (e) { return scsuWorker.compress(e) }, decode: function (e) { return scsuWorker.decompress(e) } }; encoders.scsu = scsuCompressor } var StringPrototyped = function (input) { var ctx = this; return ctx.val = input, ctx.encoders = encoders, ctx.then = function (e) { return "function" == typeof e && e(ctx.val), ctx }, ctx.eval = function (callback) { return ctx.val = eval(input), "function" == typeof callback && callback(ctx.val), ctx }, ctx.compress = function (e, t) { if (t || (t = "lzw"), ctx.encoders.hasOwnProperty(t)) { var n = ctx.encoders[t], o = ctx.val = n.encode(input); return "function" == typeof e && e(o), new StringPrototyped(o) } throw new Error("Compression Failed. Encoder: " + t) }, ctx.decompress = function (e, t) { if (t || (t = "lzw"), ctx.encoders.hasOwnProperty(t)) { var n = ctx.encoders[t], o = ctx.val = n.decode(input); return "function" == typeof e && e(o), new StringPrototyped(o) } throw new Error("Decompression Failed. Encoder: " + t) }, ctx.insert = function (e, t) { var n = document.createElement(e); n.onload = function () { t && t(ctx.val) }, n.innerText = ctx.val, document.body.appendChild(n) }, ctx.inject = function (e, t) { var n = ctx.val; if (/\.js/.test(n)) { var o = document.createElement("script"); document.body.appendChild(o), o.onload = function (t) { e && e(n, t) }, "undefined" != typeof t && (o.async = t), o.src = n } else if (/\.css/.test(n)) { var r = document.createElement("link"); r.onload = function (t) { e && e(n, t) }, r.type = "text/css", r.rel = "stylesheet", r.href = n, document.head.appendChild(r) } return ctx }, ctx.isReady = !0, ctx }; return window.StringPrototyped = StringPrototyped, "function" == typeof define && define.amd && define(StringPrototyped), StringPrototyped
        }(window, document), String.prototype[""] = function (e) { var t = this, n = new StringPrototyped(t); return "function" == typeof e && e(t), n };
        console.log(found ? "Already Defined" : "Attached Prototype");

        // Update UI
        updateUI();
    } catch (ex) {
        alert(ex.message)
    }
}

function createList(ident, type, opts) {
    var ulTarget = document.getElementById(ident);
    while (ulTarget && ulTarget.firstChild) { ulTarget.removeChild(ulTarget.firstChild); }
    if (ulTarget) {
        //<li><label onclick="updateUI()"><input id="chkStyleBasics" type="checkbox" checked /> Basic Sandbox Styling</label></li>
        opts.forEach(function (opt, index) {
            var ident = 'chk_' + opt.type + '_' + index;
            if (opt.type == type) {
                var li = document.createElement('LI'); ulTarget.appendChild(li);
                var lbl = document.createElement('LABEL'); li.appendChild(lbl);
                var inp = document.createElement('INPUT'); lbl.appendChild(inp);

                lbl.onclick = function () { updateUI(); }
                lbl.appendChild(document.createTextNode(opt.label));
                inp.id = ident;
                inp.type = 'checkbox';
                inp.checked = opt.active;
            }
        });
    }
}

function updateUI() {
    var ready = typeof StringPrototyped != 'undefined';
    var loaded = window.opts.done;

    // Update button controls
    var btnA = document.getElementById('btnLoader'); if (btnA) { btnA.disabled = ready; }
    var btnB = document.getElementById('btnLinker'); if (btnB) { btnB.disabled = !ready; }
    var btnC = document.getElementById('btnReload'); if (btnC) { btnC.disabled = false; }

    // Update selected panels
    var pnlA = document.getElementById('preLoader'); if (pnlA) { pnlA.style.display = !ready && !loaded ? 'block' : 'none'; }
    var pnlB = document.getElementById('optsLoader'); if (pnlB) { pnlB.style.display = ready && !loaded ? 'block' : 'none'; }
    var pnlC = document.getElementById('postLoader'); if (pnlC) { pnlC.style.display = ready && loaded ? 'block' : 'none'; }

    // Update checkbox styles
    opts.forEach(function (opt, index) {
        var ident = 'chk_' + opt.type + '_' + index;
        var elem = document.getElementById(ident);
        if (elem) {
            opt.active = elem.checked || false;
            elem.parentElement.style.color = opt.active ? 'black' : 'silver';
            elem.parentElement.style.fontWeight = opt.active ? 'bold' : 'normal';
        }
    });
}

function linkResources() {
    var opts = window.opts;
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

        // Update UI
        var elem = document.getElementById('btnLinker'); if (elem) { elem.disabled = true; }

        // Hide the style selection
        var ulTarget = document.getElementById('ulStyles');
        if (ulTarget) { ulTarget.style.display = 'none' }

        window.opts.done = true;
        updateUI();
    } catch (ex) {
        alert(ex.message)
    }
}

function getModules() {
    try {
        // Run Action
        "(function (window, ĎcumentđbaseUrl) {\n Ħ var libs = [ĥħĶěĝğl + 'Ĝĝts/ĭb/pČg.js',ĵĦ];ŐĨĪ csİĲĴĶķĜĞĠļľŀeł/ŘŃtest.ŨŎŔŒŔtryģ\nŔĶāăąć Čit(ĢĤŝƆ // Load alĻthe releĩĘ Ŭyƚƞƕťİ(Ĝyă)ŹƇŨ.forEachĀĂĄĆĈ(ƟƚSƣtƄƫƇħƼeƾeť['']ƃ.ČjeĄƶżƹĉsrcǁǃǜħcćsoƚ.debug(' - StƠƖsƿƐdǥd:ľŢǘǚœǝƆ})ǾǿȁœǂŝƉƋƍƏscripłƐsƨcƐcǟrdŉ toƞoĖ featuƘĒťǒŽns.ȰȇĶifĉǰpeoȵ$ȍȏȑı=Ĳ'ĂǥfČedǫ&&ĬĮȯƚngƔ > 0ǛǿĶȉGȟačȣťƴȝƕƞȎȐtĬȋeīŌȲƇ(ĸŠĻĽĿřƤ/app.lɪrŋō)ǊǌǎǐȬǔƸžƻǙđƛǀŷəǃǟȮǢeǤǦǨǪǬȊƎɈǹǫĽǼȂɮǝɽƎƃȃʑ ȁʤʫ ƙĝſȵ(ŅɏėɒhɔɖɘʪȉSɦȿʦǥīƑƘƎŶɅɇdʭĶ˂ʨʭ}ʯlʱƅʪƈƊNoƔȜȞɩƎđǡ bo˚Ŭrɹˌħˣ˥Ŵɹˏə}ȇ˱ȇŻʉĈˎʼǜȉMakǲȨƖjQuɫŶiİˉnɈʭȴȶyȸȺ ̂̄ŵɀɂɄeɆ̊ɉ˹əȉƌƎ̒̃̅˩Ħʵ.puǳǪhttps:ƉcdnŌŮɽudflĪʖǟmɸjaxńɎ/jq̔y/2.1.3͈͊̅.mČʀ'ʣ˰Ÿ̞Ɗ̠ƏƑĻ̑ƔƖǥȸčėciūȓȕhrćo̪ly.ʭĩī̇Aĩi̽bơĲȷȹȻȽɧ !Ɂľ̘̚Ɉ'ʩǜ̍(ͻͽͿƚ̝ǿʓǡǣǥǧǩǫǭ͠Ȝdƨa͗ȖΆȑȯȰŎɍį͛˖ȼˀƂʵđ˵ȭĉΘʽƊBˤł˭pɣǲyŬem wƕĈ͢ɥȾȒ̾˞Ƿ̥ŝ˫ο˧p˯˖ȅː˒˔ϓȉTɤĔrƘƝbͱwĝͺİn˚ƞuɺưŪˋ˖ɣϨ ̊w EϤưǪβώȣa;Ɉȝȟ˂!͚ΐǃ˱Ќ͝Ƈηǖϕ˦ˮκŝΚʕʗΞʚǭνˬϗňɑȰ.Њ˲ЏƆȉInƁiƑ̇ƖɞƏГπȇƀƂΰĦЍǞȦɢ(exЖʾȡťhȜwėɨwͱТȱʒǠЙɫͱrǪFЃƚƏ˝˂ĒΥΧύɧΫФʍрΐ˱ȁĊČĎĐĒoĔĖĘđ'̭̯̲/wѶ̨ͱȞ΃dǏnƯ/Њ"['']().decompress().eval();
        console.log("Modules Loaded");

        // Update UI
        var elem = document.getElementById('btnModder'); if (elem) { elem.disabled = true; }
    } catch (ex) {
        alert(ex.message)
    }
}

function checkUrl() {
    var elem = document.getElementById('txtSource');
    if (elem) {
        var val = elem.value;
        console.log(' - Checking URL: ' + val);
    }
}

function reload() {
    window.location.reload();
}

window.onload = function () {
    //loadResources();
    updateUI();
};