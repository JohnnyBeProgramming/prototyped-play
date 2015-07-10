var pickFiles = require('broccoli-static-compiler');
var compileLess = require('broccoli-less-single');
var concatenate = require('broccoli-concat');
var mergeTrees = require('broccoli-merge-trees');
var ngTemplCache = require('broccoli-ng-templatecache');
var uglifyJs = require('broccoli-uglify-js');
var stew = require('broccoli-stew');
var path = require('path');
var base = '../';
var dest = '../../../dest';

/** 
 * move the index.html file from the project /app folder
 * into the build production folder
 */
var appHtml = pickFiles(base, {
    srcDir: './app',
    files: [
        '**/*.js',
        '**/*.css',
        '**/*.html',
    ],
    destDir: dest,
});
/*
// Generate ng Templates
var templates = new ngTemplCache([appHtml], {
    module: 'myApp.templates',
    outputFile: 'xxx.resx.js', // ./assets/lib/app.js
    standalone: true,
    prefix: './',
});
*/
/*
var appCss = compileLess(app, 'assets/css/app.less', 'assets/css/app.css', {
    paths: ['/assets/css']
});
 */
var appCss = pickFiles(base, {
    srcDir: './app/assets/css/',
    files: [
//        '**/*.css',
    ],
    destDir: path.join(dest, 'assets/css/'),
})

/**
 * concatenate and compress all of our JavaScript files in 
 * the project /app folder into a single app.js file in 
 * the build production folder
var appJs = concatenate(app, {
    inputFiles: [
        'assets/lib/vend/jquery/jquery-2.1.3.min.js',
        'assets/lib/vend/angular/angular.min.js',
        'assets/lib/vend/angular/angular-animate.js',
        'assets/lib/app.js',
    ],
    outputFile: path.join(process.cwd(), dest, 'assets/lib/vendor.js'),
});
 */
var appJs = pickFiles(base, {
    srcDir: './app/assets/lib/',
    files: [
//        '**/*.js',
    ],
    destDir: path.join(dest, 'assets/lib/'),
})

/*
appJs = uglifyJs(appJs, {
    compress: true
});
*/
// merge HTML, JavaScript and CSS trees into a single tree and export it
var appTree = mergeTrees([appHtml, appCss, appJs/*, templates*/]);
module.exports = appTree;
//module.exports = stew.rm(appTree, '/build/**');
