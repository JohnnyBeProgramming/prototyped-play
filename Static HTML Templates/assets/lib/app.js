angular.module('myApp', [
])
    .run(function () {
        console.log(' - Application Started: ', (new Date()).toString());
    })