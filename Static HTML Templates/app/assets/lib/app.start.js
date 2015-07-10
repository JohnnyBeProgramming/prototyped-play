var appLoader = {
    counter: 0,
    init: function (deps, callback, errorHandler) {
        appLoader.counter = 0;
        appLoader.failures = 0;
        var requirements = [];
        for (var name in deps) {
            var dep = deps[name];
            if (!('qry' in dep) || dep.qry) {
                requirements.push(dep.url);
            }
        }

        if (requirements.length) {
            console.log(' - Loading dependencies');
            requirements.forEach(function (url) {
                console.log('   + ', url);
                appLoader.counter++;
                appLoader.load(url, function (result) {
                    if (!result) {
                        console.warn('Warning: Script timed out:', url);
                        appLoader.failures++;
                    } else {
                        // Loaded...
                    }
                    appLoader.counter--;
                    appLoader.check(callback, errorHandler);
                });
            });
        } else {
            appLoader.check(callback, errorHandler);
        }
    },

    load: function (url, callback) {
        var hasLoaded = false;
        var srciptElem = document.createElement('script');
        if (srciptElem) {
            srciptElem.onload = function (evt) {
                hasLoaded = true;
                if (callback) callback(url, evt);
            }
            srciptElem.src = url;
            document.body.appendChild(srciptElem);
        }
        var intv = setInterval(function () {
            clearInterval(intv);
            if (!hasLoaded && callback) {
                callback(false, null);
            }
        }, 2 * 60 * 1000);
    },

    check: function (callback, errorHandler) {
        if (appLoader.counter == 0) {
            if (appLoader.failures > 0) {
                var err = new Error('Failed to load one or more dependencies...');
                if (errorHandler) errorHandler(err);
                throw err;
            } else {
                if (callback) callback();
            }
        }
    },
};