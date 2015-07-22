// Define some dependencies
if (typeof appUI === 'undefined') {
    window.appUI = require('./app/ui.js');
}
if (typeof remoteScripts === 'undefined') {
    window.remoteScripts = require('../../../build/node_modules/proto-js-loader/ScriptLoader.js');
}

// Load the main app with dependencies...
require('./app/modules.js')
    .run(function () {
        console.log(' - App Started: ', (new Date()).toString());
    });

// Load the compiled templates...
require('./app/tpl.js');