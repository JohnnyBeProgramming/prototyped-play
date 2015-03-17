var concat = require('broccoli-concat'),  
    pickFiles = require('broccoli-static-compiler'),
    mergeTrees = require('broccoli-merge-trees');

// concat the JS
var scripts = concat('src/', {  
  inputFiles: ['**/*.js'],
  outputFile: '/assets/app.js'
});
// concat the CSS
var styles = concat('.', {  
  inputFiles: ['**/*.css'],
  outputFile: '/assets/app.css'
});
// grab any static assets
var public = pickFiles('src', {  
  srcDir: '.',
  destDir: '.'
});
// and merge all the trees together
module.exports = mergeTrees([scripts, styles, public]);  

/*
var compileTypeScript = require('broccoli-typescript')
var compileES6 = require('broccoli-es6-concatenator')
var pickFiles = require('broccoli-static-compiler')
var mergeTrees = require('broccoli-merge-trees')
var env = require('broccoli-env').getEnv()

function preprocess (tree) {  
  // compile  the typescript files
  //tree = compileTypeScript(tree, {
  //	out: 'app/app.ts.js',
  //	outDir: 'app',
  //});
  return tree
}

// create tree for files in the app folder
var app = 'src'
app = pickFiles(app, {
  //srcDir: 'src',
  //destDir: 'app' // move under appkit namespace
})
app = preprocess(app)

// include app, styles and vendor trees
var sourceTrees = [app]

// merge array into tree
var appAndDependencies = new mergeTrees(sourceTrees, { overwrite: true })

// Transpile ES6 modules and concatenate them,
// recursively including modules referenced by import statements.
var appJs = compileES6(appAndDependencies, {
  // Prepend contents of vendor/loader.js
  //loaderFile: 'app.loader.js',
  //ignoredModules: [ ],
  inputFiles: [ ],
  wrapInEval: env !== 'production',
  outputFile: '/assets/app.js'
})

// merge js, css and public file trees, and export the
module.exports = mergeTrees([appJs])
*/