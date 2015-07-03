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
