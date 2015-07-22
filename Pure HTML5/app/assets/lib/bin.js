(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Define some dependencies
if (typeof appUI === 'undefined') {
    window.appUI = require('./app/ui.js');
}
if (typeof remoteScripts === 'undefined') {
    window.remoteScripts = require('../../../build/node_modules/proto-js-loader/ScriptLoader.js');
}

// Load the main app with dependencies...
require('./app/modules.js')
    .run(function () {
        console.log(' - App Started: ', (new Date()).toString());
    });

// Load the compiled templates...
require('./app/tpl.js');
},{"../../../build/node_modules/proto-js-loader/ScriptLoader.js":5,"./app/modules.js":2,"./app/tpl.js":3,"./app/ui.js":4}],2:[function(require,module,exports){

module.exports = angular.module('myApp', [])
    .constant('myAppState', {
        lastError: null,
    })
    .factory('$exceptionHandler', ['myAppState', function (myAppState) {
        return function errorCatcherHandler(exception, cause) {
            var err = new Error('Angular exception');
            myAppState.lastError = err;
            console.warn(err);
        };
    }])
    .factory('errorHttpInterceptor', ['$q', 'myAppState', function ($q, myAppState) {
        return {
            responseError: function responseError(rejection) {
                var err = new Error('HTTP response error');
                myAppState.lastError = err;
                console.warn(err);
                /*{
                    extra: {
                        config: rejection.config,
                        status: rejection.status
                    }
                }*/
                return $q.reject(rejection);
            }
        };
    }])
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('errorHttpInterceptor');
    }])
    .directive('dockedContainer', function () {
        return {
            restrict: 'AEM',
            replace: true,
            transclude: true,
            templateUrl: 'views/common/docked/container.tpl.html'
        };
    })
    .directive('dockedIcon', function () {
        return {
            restrict: 'AEM',
            replace: true,
            transclude: true,
            templateUrl: 'views/common/docked/icon.tpl.html'
        };
    })
    .directive('dockedTop', function () {
        return {
            restrict: 'AEM',
            replace: true,
            transclude: true,
            templateUrl: 'views/common/docked/top.tpl.html'
        };
    })
    .directive('dockedTopLeft', function () {
        return {
            restrict: 'AEM',
            replace: true,
            transclude: true,
            templateUrl: 'views/common/docked/topLeft.tpl.html'
        };
    })
    .directive('dockedTopRight', function () {
        return {
            restrict: 'AEM',
            replace: true,
            transclude: true,
            templateUrl: 'views/common/docked/topRight.tpl.html'
        };
    })
    .directive('dockedLeftNav', function () {
        return {
            restrict: 'AEM',
            replace: true,
            transclude: true,
            templateUrl: 'views/common/docked/left.tpl.html'
        };
    })
    .directive('dockedMain', function () {
        return {
            restrict: 'AEM',
            replace: true,
            transclude: true,
            templateUrl: 'views/common/docked/main.tpl.html'
        };
    })
    .directive('dockedFooter', function () {
        return {
            restrict: 'AEM',
            replace: true,
            transclude: true,
            templateUrl: 'views/common/docked/footer.tpl.html'
        };
    })

},{}],3:[function(require,module,exports){
angular.module('myApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/common/docked/container.tpl.html',
    "<div class=docked-container ng:transclude><!-- Top Navigation --><div class=anim-fade docked:top></div><!-- Toggle Button --><div docked:icon></div><!-- Left Navigation --><div class=\"anim-fade view-panel\" docked:left:nav>Left Navigation</div><!-- Main Contents --><div class=\"anim-fade view-panel\" docked:container></div><!-- Footer --><div class=anim-fade docked:footer>Footer</div></div>"
  );


  $templateCache.put('views/common/docked/footer.tpl.html',
    "<div class=\"anim-fade bottom-spacer\"><div class=\"mask noselect\"></div><div class=\"view-panel bottom-container\" ng:transclude></div></div>"
  );


  $templateCache.put('views/common/docked/icon.tpl.html',
    "<div class=top-spacer><div class=\"mask noselect anim-fade\"></div><span class=anim-slide><a href=\"\" ng-click=\"docker.enabled = !docker.enabled\"><i class=\"fa fa-globe\" style=\"font-size: xx-large\"></i></a></span></div>"
  );


  $templateCache.put('views/common/docked/left.tpl.html',
    "<div class=\"anim-fade view-panel vertical-spacer right\"><div class=\"mask noselect\"></div><div class=left-container ng:transclude></div></div>"
  );


  $templateCache.put('views/common/docked/main.tpl.html',
    "<div class=\"anim-fade view-panel main-contents\" ng:transclude></div>"
  );


  $templateCache.put('views/common/docked/top.tpl.html',
    "<div class=anim-fade><div class=view-panel docked:top:left>Top Navigation ( <a href=#>Left</a> )</div><div class=view-panel docked:top:right>Top Navigation ( <a href=#>Right</a> )</div></div>"
  );


  $templateCache.put('views/common/docked/topLeft.tpl.html',
    "<div class=\"view-toolbar left\" ng:transclude></div>"
  );


  $templateCache.put('views/common/docked/topRight.tpl.html',
    "<div class=\"view-toolbar right\" ng:transclude></div>"
  );

}]);

},{}],4:[function(require,module,exports){

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

if (typeof module !== 'undefined') {
    module.exports = appUI;
}

window.appUI = appUI;
},{}],5:[function(require,module,exports){
var remoteScripts = {
    delay: 10 * 1000,
    options: {
        containerId: 'XssNotifyBox',
        containerCss: 'xss-notify',
    },
    urlStates: {},
    define: function (urls, detect, done, parentElem) {
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

        // Convert to an array
        urls = Array.isArray(urls) ? urls : (typeof urls === 'string' ? [urls] : []);
        urls.forEach(function (url) {
            var info = (url in remoteScripts.urlStates) ? remoteScripts.urlStates[url] : {
                url: url,
                qry: detect,
                done: done,
                elem: null,
                state: null,
                parent: parentElem,
            };
            var elem = info ? info.elem : null;
            if (info && info.qry && info.qry(url)) {
                info.state = true;
                remoteScripts.remove(url);
                if (done) done(url, info);
                return; // Already defined...
            }
            if (url in remoteScripts.urlStates) {
                if (!info.state) {
                    remoteScripts.retry(url);
                }
                return; // Already Busy...
            } else {
                console.log('   + ', url);

                elem = document.createElement('div');
                {
                    elem.className = 'bar info';
                    elem.innerHTML =
                        '<i class="fa fa-cog faa-spin animated" style="margin-right: 3px;"></i>' +
                        '<span>Loading resource: </span>' +
                        '<a target="_blank" href="' + url + '">' + url + '</a>' +
                        '<a href="#" style="float: right; margin-right: 8px;">Dismis</a>' +
                        '<a href="#" style="float: right; margin-right: 8px;">Retry</a>';
                }
                container.appendChild(elem);

                info.elem = elem;
            }

            var btnLink = (elem.childNodes.length > 2) ? elem.childNodes[2] : null;
            if (btnLink) {
                btnLink.onclick = function () {
                    return remoteScripts.fetch(this, info);
                }
                if (info.state === null) btnLink.click();
            }

            var btnClose = (elem.childNodes.length > 3) ? elem.childNodes[3] : null;
            if (btnClose) {
                btnClose.style.display = 'none';
                btnClose.onclick = function () {
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
        });
    },
    fetch: function (link, info) {
        var url = link.href;
        if (url in remoteScripts.urlStates) {
            if (info.state) {
                remoteScripts.ready(url);
                return false;
            } else {
                // Open in new window...
            }
        } else {
            // First try and load with normal script tag...
            remoteScripts.urlStates[url] = info;
            remoteScripts.attach(url, remoteScripts.result, info.parent);

            // Cancel event bubbling...
            return false;
        }
    },
    attach: function (url, callback, parentElem) {
        try {
            // Try and load the script normally
            var srciptElem = document.createElement('script');
            if (srciptElem) {
                srciptElem.onload = function (evt) {
                    if (callback) callback(url, true);
                }
                srciptElem.src = url;
                (parentElem || document.body).appendChild(srciptElem);
            }

            // Set timer to check for timeout
            var intv = setInterval(function () {
                if (callback) {
                    callback(url, false);
                }
                clearInterval(intv);
            }, remoteScripts.delay);
        } catch (ex) {
            console.warn('Warning: Script refused to load. ' + ex.message);
            callback(url, false);
        }
    },
    result: function (url, success) {
        var info = (url in remoteScripts.urlStates) ? remoteScripts.urlStates[url] : null;
        if (!success) {

            // Failed to load script normally, try workaround...
            remoteScripts.retry(url);

            // Notify script failed
            var info = (url in remoteScripts.urlStates) ? remoteScripts.urlStates[url] : null;
            if (info && info.done) {
                info.done(url, info);
            }
        } else {
            // Loaded normally...
            remoteScripts.ready(url);
        }
    },
    retry: function (url) {
        var info = (url in remoteScripts.urlStates) ? remoteScripts.urlStates[url] : null;
        if (info && !info.state) {
            info.state = null;

            console.warn('   R ', url);

            if (info.done) {
                info.done(url, info);
            }

            // Update UI state...
            if (info.elem && info.elem.childNodes.length > 4) {
                info.elem.className = 'bar warn';
                info.elem.childNodes[0].className = 'fa fa-question-circle faa-tada animated';
                info.elem.childNodes[1].innerHTML = '<b>Loading:</b> ';
                info.elem.childNodes[3].style.display = 'inline';
                info.elem.childNodes[4].style.display = 'inline';
            }

            // Detect if present...
            if (info.qry && info.qry()) {
                remoteScripts.ready(url);
                return; // Already loaded...
            }

            // Set a timer to check for reult (if exist)
            var msCounter = 0;
            var msChecker = 1 * 1000; // Check every 2 seconds
            var msTimeout = 2 * 60 * 1000; // Timeout in 2 mins
            if (!info.intv) {
                info.intv = setInterval(function () {
                    // Count ellapsed time
                    msCounter += msChecker;

                    // Check for timeout
                    if (info.done && msCounter >= msTimeout) {
                        // Failed to load...
                        info.intv = clearInterval(info.intv);
                        return remoteScripts.failed(url);
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
    ready: function (url) {
        var info = (url in remoteScripts.urlStates) ? remoteScripts.urlStates[url] : null;
        if (info && info.done) {
            info.state = true;
            info.done(url, info);
        }
        remoteScripts.remove(url);
    },
    failed: function (url) {
        var info = (url in remoteScripts.urlStates) ? remoteScripts.urlStates[url] : null;

        // Update UI state...
        if (info && info.elem && info.elem.childNodes.length > 4) {
            info.elem.className = 'bar error';
            info.elem.childNodes[0].className = 'fa fa-exclamation-circle faa-tada animated';
            info.elem.childNodes[1].innerHTML = '<b>Failure:</b> ';
            info.elem.childNodes[3].style.display = 'inline';
            info.elem.childNodes[4].style.display = 'inline';
        }

        if (info && info.done) {
            info.state = false;
            info.done(url, info);
        }
        //remoteScripts.remove(url);
    },
    remove: function (url) {
        if (url in remoteScripts.urlStates) {
            var info = remoteScripts.urlStates[url];
            var intv = info.intv;
            if (intv) info.intv = clearInterval(intv);

            var elem = info.elem;
            if (elem && elem.parentNode) {
                elem.parentNode.removeChild(elem);
            }
            delete remoteScripts.urlStates[url];
        }
    },
};


// Expose as an AMD module
if (typeof define === 'function' && define.amd) {
    define(remoteScripts);
}

// Expose as CommonJS module
if (typeof module !== 'undefined') {
    module.exports = remoteScripts;
}
},{}]},{},[1]);
