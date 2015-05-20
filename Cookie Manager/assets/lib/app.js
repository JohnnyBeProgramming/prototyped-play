angular.module('myApp', [
    'ui.router',
    'ui.bootstrap',
    'ngCookies',
])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        // Configure module state
        $stateProvider
            .state('main', {
                url: '/',
                views: {
                    'left@': {
                        templateUrl: 'views/left.tpl.html',
                    },
                    'main@': {
                        templateUrl: 'views/main.tpl.html',
                        controller: 'MainViewController',
                        controllerAs: 'mainCtrl',
                    },
                }
            })

        $urlRouterProvider
            .when('', '/')
            .when('index.html', '/')

    }])
    .provider('CookieStore', function () {
        this.selected = {};
        this.all = function () {
            var list = [];
            var theCookies = document.cookie.split(';');
            for (var i = 1 ; i <= theCookies.length; i++) {
                var parts = theCookies[i - 1].split('=');
                if (parts.length > 1) {
                    list.push({
                        key: parts[0],
                        val: parts[1],
                    });
                }
            }
            return list;
        }
        this.create = function (name, value, days) {
            var expires;
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toGMTString();
            }
            else {
                expires = "";
            }
            document.cookie = name + "=" + value + expires + "; path=/";
            this.refres();
        }
        this.get = function (c_name) {
            if (document.cookie.length > 0) {
                c_start = document.cookie.indexOf(c_name + "=");
                if (c_start != -1) {
                    c_start = c_start + c_name.length + 1;
                    c_end = document.cookie.indexOf(";", c_start);
                    if (c_end == -1) {
                        c_end = document.cookie.length;
                    }
                    return unescape(document.cookie.substring(c_start, c_end));
                }
            }
            return "";
        }
        this.remove = function (c_name) {
            this.create(c_name, '', -1);
            this.refres();
        }
        this.refres = function () {
            this.current = this.all();
        }
        this.refres();

        this.$get = function () {
            return this;
        };
    })
    .controller('MainViewController', function ($rootScope, $sce, CookieStore) {
        this.domain = window.location.host;
        this.linked = [
            { label: 'Sub Domain', url: 'cookies.html' },
            { label: 'Localhost', url: 'http://localhost/' },
            { label: 'Wikipedia', url: 'http://www.wikipedia.com/' },
        ];
        this.cookies = CookieStore;
        this.create = function (link) {
            var key = 'Last Exported';
            var val = new Date().toGMTString();
            var url = 'admin/writecookie.php?c=' + encodeURIComponent(key) + '&v=' + encodeURIComponent(val);
            console.info(' - Write Cookie: ', url);
            var refreshObject = new XMLHttpRequest();
            if (!refreshObject) {
                //IE6 or older
                try {
                    refreshObject = new ActiveXObject("Msxml2.XMLHTTP");
                }
                catch (e) {
                    try {
                        refreshObject = new ActiveXObject("Microsoft.XMLHTTP");
                    }
                    catch (e) {
                        return;
                    }
                }
            }
            refreshObject.open('GET', url);
            refreshObject.send();
        }
        this.import = function (link) {
            link.active = null;
            try {
                var iframe = !!link.url ? $('[src="' + link.url + '"].preview').first() : null;
                if (iframe && iframe.length) {
                    var cmd = 'javascript:alert(document.cookie)';
                    var wnd = iframe[0].contentWindow || iframe;
                    console.log(' - Link: ' + cmd);
                    console.log(' - Window', wnd);
                    if (wnd.eval) {
                        wnd.eval(cmd);
                    } else {
                        //iframe[0].src = cmd;
                        iframe.attr('src', cmd);
                    }
                }
                link.active = true;
            } catch (ex) {
                link.active = false;
                link.lastError = ex.message;
                console.error(ex.message);
            }
        }
        this.test = function (link) {
            link.active = null;
            try {
                var iframe = !!link.url ? $('[src="' + link.url + '"].preview').first() : null;
                if (iframe && iframe.length) {
                    var wnd = iframe[0].contentWindow || iframe;
                    if (wnd.postMessage) {
                        wnd.postMessage({ type: 'link', target: JSON.parse(JSON.stringify(link)) }, '*');
                    } else {
                        console.warn('Warning: Could not post the message to a chile iFrame.');
                    }                    
                    /*
                    var newfile = document.createElement('script');
                    newfile.setAttribute("type", "text/javascript");
                    newfile.setAttribute("src", 'http://first.com/doAjax?getCookie&callback=passCookie');
                    document.getElementsByTagName("head")[0].appendChild(newfile);
                    */
                }
                link.active = true;
            } catch (ex) {
                link.active = false;
                link.lastError = ex.message;
                console.error(ex.message);
            }
        }
        this.trustSrc = function (src, iFrame) {
            console.log(' - Trust Src:', src);
            return $sce.trustAsResourceUrl(src);
        }
    })
    .controller('CookieViewController', function ($rootScope, CookieStore) {
        this.cookies = CookieStore;
        this.select = function (cookie) {
            $rootScope.$applyAsync(function () {
                console.log(' - Select: ', cookie);
                CookieStore.selected = cookie;
            });
        }
        this.process = function () {
            var cookieObj = CookieStore.selected;
            var key = cookieObj.key;
            var value = cookieObj.val;
            var domain = cookieObj.domain;
            console.log(' - Create or Update Cookie: ' + key, value);
            if (key) {
                CookieStore.create(key, value, 6);
            }
            CookieStore.selected = {};
        }
    })
    .run(function (CookieStore) {
        console.log(' - Application Started: ', CookieStore);

        window.addEventListener('message', function (event) {
            // IMPORTANT: Check the origin of the data!
            if (~event.origin.indexOf(window.location.host)) {
                // The data has been sent from your site

                // The data sent with postMessage is stored in event.data
                console.log(' - Origin: ', event.origin);
                console.log(' - Message:', event.data);
            } else {
                // The data hasn't been sent from your site!
                // Be careful! Do not use it.
                console.warn(' - Origin: ', event.origin);
                console.warn(' - Message:', event.data);
                return;
            }
        });
    })