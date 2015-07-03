try {
    // Define the payload
    var encoders = {};
    var module = {};
    var ctx = {
        init: function () {
            
            // Include: Base64 Encoder Utils
            /*{1}*/

            // Link included module
            if (module.exports) {
                window.Base64 = encoders.Base64 = module.exports;
                module.exports = null;
            }

            // Include: String Prototype
            /*{2}*/

            // Link included module
            if (module.exports) {
                encoders.sp = module.exports;
                encoders.lzw = new encoders.sp().encoders.lwz;
                module.exports = null;
            }
        },
        load: function (payload) {
            if (payload) {
                var success = true;
                try {
                    // Decode and parse contents of the payload
                    var decoded = encoders.Base64.decode(payload);
                    var htmlObj = JSON.parse(decoded);

                    console.log(' - Unpacking:', htmlObj);

                    // 1) Set document Language
                    var html = document.getElementsByTagName('html')[0];
                    if (htmlObj.lang && (html.lang != htmlObj.lang)) {
                        console.log(' - Setting Language: ', htmlObj.lang);
                        html.lang = htmlObj.lang;
                    }

                    // 2) Load String Prototype (if not exist)
                    if (typeof StringPrototyped === 'undefined') {
                        console.log(' - Loading Utils...');
                    }

                    // 3) Load Headers
                    if (htmlObj.head && htmlObj.head.length) {
                        console.log(' - Loading Headers...');
                        htmlObj.head.forEach(function (item) {
                            console.log('   + ' + item.type);
                        });
                    }

                    // 4) Load Body
                    if (htmlObj.body && htmlObj.body.length) {
                        console.log(' - Loading Body...');
                        htmlObj.body.forEach(function (item) {
                            console.log('   + ' + item.type);
                        });
                    }

                    // 5) Call Ready
                    console.log(' - Ready.');

                } catch (ex) {
                    success = false;
                    alert(ex.message);
                }

            }
        },
        title: function(desc){
        },
        meta: function (attrs) {
        },
    };

    ctx.init();
    ctx.load(/*{0}*/);

} catch (ex) {
    alert(ex.message);
}