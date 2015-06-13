angular.module('myApp', [
])
    .controller('MainViewController', function ($rootScope) {
        this.expanded = false;
        this.show = function (link) {
            this.expanded = true;
        }
        this.import = function (link) {
            this.expanded = false;
        }
    })
    .run(function () {
        console.log(' - Application Started: ', Date.now().toString());
    })