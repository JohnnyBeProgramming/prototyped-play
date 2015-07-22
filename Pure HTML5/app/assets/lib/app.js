// Define the remote scripting library
window.remoteScripts = require('../../../build/node_modules/proto-js-loader/ScriptLoader.js');

// Load the main app with dependencies...
require('./app.start.js');
require('./app.modules.js')
    .run(function () {
        console.log(' - App Started: ', (new Date()).toString());
    });
require('./app.tpl.js');