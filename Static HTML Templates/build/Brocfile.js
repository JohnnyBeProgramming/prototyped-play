var pickFiles = require('broccoli-static-compiler');
var compileLess = require('broccoli-less-single');
var concatenate = require('broccoli-concat');
var mergeTrees = require('broccoli-merge-trees');
var uglifyJs = require('broccoli-uglify-js');
var stew = require('broccoli-stew');
var app = '../';

/** 
 * move the index.html file from the project /app folder
 * into the build production folder
 */
var appHtml = pickFiles(app, {
    srcDir: './',
    files: [
        '**/*.html',
    ],
    destDir: '/'
});

/*
var appCss = compileLess(app, 'assets/css/app.less', 'assets/css/app.css', {
    paths: ['/assets/css']
});
 */
var appCss = pickFiles(app, {
    srcDir: '/assets/css/',
    files: [
        '**/*.css',
    ],
    destDir: '/assets/css/'
})

/**
 * concatenate and compress all of our JavaScript files in 
 * the project /app folder into a single app.js file in 
 * the build production folder
 */
var appJs = concatenate(app, {
    inputFiles: [
        'assets/lib/vend/jquery/jquery-2.1.3.min.js',
        'assets/lib/vend/angular/angular.js',
        'assets/lib/vend/angular/angular-animate.js',
        'assets/lib/app.js',
    ],
    outputFile: '/assets/lib/app.js',
    header: '/** Dont feed the trolls... **/'
});
/*
appJs = uglifyJs(appJs, {
    compress: true
});
*/
// merge HTML, JavaScript and CSS trees into a single tree and export it
var appTree = mergeTrees([appHtml, appJs, appCss]);
module.exports = appTree;
//module.exports = stew.rm(appTree, '/build/**');
