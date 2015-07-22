var appLoader = {
    timeout: 5 * 1000, //2 * 60 * 1000,
    failures: 0,
    init: function (deps, callback, errorHandler) {
        appLoader.failures = 0;
        var requirements = [];
        for (var name in deps) {
            var dep = deps[name];
            if (!('qry' in dep) || dep.qry) {
                requirements.push(dep.url);
            }
        }

        if (requirements.length) {
            console.log(' - Loading dependencies:');
            appLoader.next(requirements, callback, errorHandler);
        } else {
            if (callback) callback();
        }
    },
    next: function (requirements, callback, errorHandler) {
        try {
            if (!requirements.length) {
                // Queue is empty or done...
                if (appLoader.failures > 0) {
                    var err = new Error('Failed to load one or more dependencies...');
                    if (errorHandler) errorHandler(err);
                    throw err;
                } else {
                    if (callback) callback();
                }
                return;
            }

            var url = requirements.splice(0, 1)[0];
            appLoader.load(url, function (result) {
                if (!result) {
                    console.warn('Warning: Script timed out:', url);
                    appLoader.failures++;
                    //ToDo: Find a fallback mechanism...
                    appLoader.next(requirements, callback, errorHandler);
                    return; // Not loaded...
                } else {
                    // Loaded...
                    appLoader.next(requirements, callback, errorHandler);
                }
            });

        } catch (err) {
            if (errorHandler) errorHandler(err);
            throw err;
        }
    },

    load: function (url, callback) {
        // ToDo: Replace with...
        // url['']().inject(callback, async)

        if (typeof remoteScripts !== 'undefined') {
            console.log(' - remoteScripts:', remoteScripts);
            //remoteScripts.define(url, null, callback);
        } else {
            // Fallback method...
            var isReady = false;
            try {
                console.log('   + ', url);
                var srciptElem = document.createElement('script');
                if (srciptElem) {
                    srciptElem.onload = function (evt) {
                        isReady = true;
                        if (callback) callback(url, evt);
                    }
                    srciptElem.src = url;
                    document.body.appendChild(srciptElem);
                }
                var intv = setInterval(function () {
                    clearInterval(intv);
                    if (!isReady && callback) {
                        isReady = true;
                        callback(false, null);
                    }
                }, appLoader.timeout);

            } catch (ex) {
                console.warn('Warning: Script refused to load. ' + ex.message);
                isReady = true;
                callback(false, null);
            }
        }
    },


};

if (typeof module !== 'undefined') {
    module.exports = appLoader;
}

window.appLoader = appLoader;