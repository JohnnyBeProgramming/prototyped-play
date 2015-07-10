// Load the main app with dependencies...
require('./app.start.js');
require('./app.modules.js')
    .run(function () {
        console.log(' - App Started: ', (new Date()).toString());
    });
require('./app.tpl.js');
