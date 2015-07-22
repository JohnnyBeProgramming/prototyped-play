
var appUI = {
    start: function (callback) {
        console.log(' - Bootstrapping...');
        appUI.status(null, 'fa fa-globe', null);
        if (callback) callback();
    },
    error: function (err) {
        appUI.status('red', 'fa fa-exclamation-circle faa-ring animated', '0 0 2px #800');
        var elem = document.getElementById('__appStatusText');
        if (elem) {
            elem.innerText = err.message;
            elem.style.display = '';
            elem.style.color = 'darkred';
            elem.style.padding = '6px';
            elem.style.fontSize = '24px';
            elem.style.verticalAlign = 'top';
        }
        throw err;
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