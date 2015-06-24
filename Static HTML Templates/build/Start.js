/// <reference path="typings/imports.d.ts" />

/* -------------------------------------------------------------------------------
Example of a custom HTTP Server
------------------------------------------------------------------------------- */
var fs = require('fs');
var path = require('path');

function inspectFile(file, contents, callback) {
    console.log(' - Parsing: ' + file);

    var pilot = contents.indexOf('<html');
    if (pilot > 0) contents = contents.substr(pilot);
    //console.log(contents);

    var htmlparser = require("htmlparser");
    var handler = new htmlparser.DefaultHandler(function (error, dom) {
        if (error)
            console.error(error);
        else if (dom.length > 0 && dom[0].name == 'html') {
            var html = dom[0];
            var output = {
                head: [],
                body: [],
            };

            html.children.forEach(function (child) {
                if (child.type == 'tag') {
                    switch (child.name) {
                        case 'head':
                            output.head = inspectHead(child);
                            break;
                        case 'body':
                            output.body = inspectBody(child);
                            break;
                    }
                }
            });

            if (callback) {
                callback(output);
            }
        }
    });
    var parser = new htmlparser.Parser(handler);
    parser.parseComplete(contents);

}

function inspectHead(domElem) {
    if (domElem.children) {
        domElem.children.forEach(function (item) {
            switch (item.type) {
                case 'tag':
                    switch (item.name) {
                        case 'base': break;
                        case 'meta': break;
                        case 'link': break;
                        case 'title': break;
                        case 'script': break;
                        default: break;
                    }
                    console.log('   + HEAD: ', item.data);
                    break;
                case 'script':
                    console.log('   + HEAD: ', item.data);
                    break;
                case 'text':
                    //console.log('   + HEAD: ', item.data);
                    break;
                case 'comment':
                    //console.log('   + HEAD: ', item.data);
                    break;
                default:
                    console.log('   - HEAD: ', item.type);
                    break;
            }
        });
    }
    return domElem;
}

function inspectBody(domElem) {
    if (domElem.children) {
        domElem.children.forEach(function (item) {
            switch (item.type) {
                case 'tag':
                    switch (item.name) {
                        case 'link': break;
                        case 'script': break;
                        default: break;
                    }
                    console.log('   + BODY: ', item.data);
                    break;
                case 'script':
                    console.log('   + BODY: ', item.data);
                    break;
                case 'text':
                    //console.log('   + BODY: ', item.data);
                    break;
                case 'comment':
                    //console.log('   + BODY: ', item.data);
                    break;
                default:
                    console.log('   - BODY: ', item.type);
                    break;
            }
        });
    }
    return domElem;
}

function parseData(filename, output) {
    //console.log(' - Parse Data: ', output);
}


var success = true;
try {
    console.log(' - Searching files...');
    var targetPath = path.join(process.cwd(), '../');
    fs.readdir(targetPath, function (err, files) {
        if (err) {
            console.error(err);
            return;
        }
        files
            .filter(function (file) {
                return file.substr(-5) === '.html';
            })
            .forEach(function (file) {
                var srcPath = path.join(process.cwd(), '../') + file;
                fs.readFile(srcPath, 'utf-8', function (err, contents) {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    inspectFile(file, contents, function (output) {
                        parseData(file, output);
                    });
                });
            });

    });

} catch (ex) {
    success = false;
    throw ex;
}
module.exports = {
    success: success
};