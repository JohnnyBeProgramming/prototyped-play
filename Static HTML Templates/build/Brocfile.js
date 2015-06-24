var pickFiles = require('broccoli-static-compiler');
var compileLess = require('broccoli-less-single');
var concatenate = require('broccoli-concat');
var mergeTrees = require('broccoli-merge-trees');
var uglifyJs = require('broccoli-uglify-js');

var app = '../';

/** 
 * move the index.html file from the project /app folder
 * into the build production folder
 */
var appHtml = pickFiles(app, {
    srcDir: './',
    files: [
        'AngularJS.html',
        'Template.html'
    ],
    destDir: '/build/gen'
});

/**
 * compile all of the SASS in the project /resources folder into 
 * a single app.css file in the build production/resources folder
 */
var appCss = compileLess(app, 'assets/css/app.less', '/build/gen/app.css', {
    paths: [
        '.',
    ]
});

/**
 * concatenate and compress all of our JavaScript files in 
 * the project /app folder into a single app.js file in 
 * the build production folder
 */
var appJs = concatenate(app, {
    inputFiles: [
        'assets/lib/app.js',
    ],
    outputFile: '/build/gen/app.js',
    header: '/** Dont feed the trolls... **/'
});
appJs = uglifyJs(appJs, {
    compress: true
});


// merge HTML, JavaScript and CSS trees into a single tree and export it
module.exports = mergeTrees([appHtml, appJs, appCss]);