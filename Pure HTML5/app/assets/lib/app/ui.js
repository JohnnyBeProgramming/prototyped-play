
var appUI = {
    start: function (callback) {
        console.log(' - Bootstrapping...');
        appUI.status(null, 'fa fa-globe', null);
        if (callback) callback();
    },
    define: function () {
        // Define container
        var container = document.getElementById('XssNotifyBox');
        if (!container) {
            container = document.createElement('div');
            container.id = 'XssNotifyBox';
            container.className = 'xss-notify';
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
    message: function (text, icon, css) {
        var box = appUI.define();
        var elem = document.createElement('div');
        if (elem) {
            elem.innerHTML = (typeof icon !== 'undefined' ? ('<i class="' + icon + '"></i>') + text : text);
            elem.className = 'bar ' + (css || '');
            elem.style.display = 'block';
        }

        var link = document.createElement('a');
        if (link && elem) {
            elem.insertBefore(link, elem.firstChild);
            link.href = '';
            link.style.cursor = 'pointer';
            link.style.float = 'right';
            link.style.marginRight = '8px';
            link.innerHTML = 'Dismis';
            link.onclick = function () {
                if (elem.parentNode) {
                    elem.parentNode.removeChild(elem);
                }
                return false;
            }
        }

        if (box) {
            box.appendChild(elem);
        }
        return elem;
    },
    error: function (err) {
        var ico = 'fa fa-exclamation-circle faa-ring animated';
        appUI.status('red', ico, '0 0 2px #800');
        appUI.message(err ? (err.message || err) : 'An unknown application error occured.', ico, 'error');
    },
    warning: function (message) {
        var ico = 'fa fa-exclamation-circle faa-tada animated';
        appUI.status('orange', ico, '0 0 2px #800');
        appUI.message(message || 'An unknown application warning occured.', ico, 'warn');
    },
    status: function (color, icon, shadow) {
        var elem = document.getElementById('__appIcon');
        if (elem) {
            elem.className = icon;
            elem.style.color = color;
            elem.style.textShadow = shadow;
        }
    },
};

if (typeof module !== 'undefined') {
    module.exports = appUI;
}

window.appUI = appUI;