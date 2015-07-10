(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Load the main app with dependencies...
require('./app.start.js');
require('./app.modules.js')
    .run(function () {
        console.log(' - App Started: ', (new Date()).toString());
    });
require('./app.tpl.js');

},{"./app.modules.js":2,"./app.start.js":3,"./app.tpl.js":4}],2:[function(require,module,exports){

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

module.exports = window.appLoader = appLoader;
},{}],4:[function(require,module,exports){
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

},{}]},{},[1]);
