angular.module('myApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/_layout.tpl.html',
    "<!DOCTYPE html><html lang=en><head><title>HTML Template</title><link href=./assets/css/app.min.css rel=\"stylesheet\"><style>@import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.3.0/css/font-awesome.min.css';</style></head><body><div class=docked-container ng-class=\"{ 'docked-left':!docked, 'docked-full':docked }\" ng-init=\"docked = true\"><!-- Top Navigation --><div class=anim-fade><div class=\"view-panel view-toolbar left\">Top Navigation ( Left )</div><div class=\"view-panel view-toolbar right\">Top Navigation ( Right )</div></div><div class=top-spacer><div class=\"mask noselect anim-fade\"></div><span class=anim-slide><a href=\"\" ng-click=\"docked = !docked\"><i id=__appIcon class=\"fa fa-cog faa-spin animated\" style=\"font-size: xx-large\"></i></a></span> <span id=__appStatusText style=\"display: none\"></span></div><!-- Left Navigation --><div class=\"vertical-spacer right view-panel anim-fade\"><div class=\"mask noselect\"></div><div class=left-container>Left Navigation</div></div><!-- Main Contents --><div class=\"main-contents view-panel anim-fade\"></div><!-- Footer --><div class=\"bottom-spacer anim-fade\"><div class=\"mask noselect\"></div><div class=\"view-panel bottom-container\">Footer</div></div></div><!--[if gt IE 9]><!--><!--Load all the required libraries (exclude IE < 10 from the party) --><script src=assets/lib/jquery/jquery-2.1.3.min.js></script><script src=assets/lib/ng/angular.min.js></script><script src=assets/lib/app/ui.js></script><script>try {\r" +
    "\n" +
    "            if (typeof angular !== 'undefined') {\r" +
    "\n" +
    "                appUI.start(function () {\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    angular.module('myApp', []);\r" +
    "\n" +
    "                    angular.module('myUI', [])\r" +
    "\n" +
    "                        .run(['$rootScope', function ($rootScope) {\r" +
    "\n" +
    "                            $rootScope.docker = { enabled: true };\r" +
    "\n" +
    "                        }]);\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    angular.bootstrap($('.docked-container'), ['myApp', 'myUI']);\r" +
    "\n" +
    "\r" +
    "\n" +
    "                });\r" +
    "\n" +
    "            } else {\r" +
    "\n" +
    "                appUI.error(new Error('Application offline...'));\r" +
    "\n" +
    "            }\r" +
    "\n" +
    "        } catch (ex) {\r" +
    "\n" +
    "            appUI.error(ex);\r" +
    "\n" +
    "        }</script><!--<![endif]--></body></html>"
  );


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
