/// <reference path="typings/imports.d.ts" />

/* -------------------------------------------------------------------------------
Example of a custom HTTP Server
------------------------------------------------------------------------------- */
var outPath = 'compiled/';
var templHtml = 'scripts/Linker.template.html';
var templPathJS = 'scripts/Linker.template.js';
var protoStrPath = './scripts/lib/StringPrototyped.js';

var q = require('q');
var fs = require('fs');
var path = require('path');
var sp = require(protoStrPath);
var compiler = require('./scripts/HtmlCompiler.js');
var basePath = compiler.opts.base = '../';

function CompileHtml(file, contents) {
    return compiler
        .gen(file, contents)
        .then(function (output) {
            return GenerateFile(file, output);
        });
}

function GenerateFile(filename, output) {

    // Generate Data (sync)
    GenerateJSON(filename, output);

    // Generate the compiled script (async)
    return GenerateScript(filename, output);
}

function GenerateJSON(filename, output) {
    var contents = JSON.stringify(output, null, 4);
    var targetPath = path.join((outPath || process.cwd()), 'data/');
    var targetJSON = path.join(targetPath, filename + '.json');
    if (!fs.existsSync(targetPath)) {
        fs.mkdirSync(targetPath);
    }
    fs.writeFileSync(targetJSON, contents);
}

function GenerateScript(filename, output) {
    var q = require('q');
    var deferred = q.defer();

    var targetPath = path.join((outPath || process.cwd()), 'script/');
    var targetScript = path.join(targetPath, filename + '.link.js');
    if (!fs.existsSync(targetPath)) {
        fs.mkdirSync(targetPath);
    }

    try {
        var fileContents = JSON.stringify(output);

        // ================================================================================
        //console.log('   + [INPUT]:', fileContents.length);
        if (fileContents && templPathJS) {
            var contents = fs.readFileSync(templPathJS, 'utf-8').replace(/^\uFEFF/, '');
            var protoStr = fs.readFileSync(protoStrPath, 'utf-8').replace(/^\uFEFF/, '');
            var jsonEnc = compiler.spx.encoders.base64.encode(fileContents);
            var encoded = '\'' + jsonEnc + '\'';

            fileContents = !contents ? contents : contents
                .replace(/___ctx___/g, compiler.opts.prefix)
                .replace('/*{0}*/', encoded)
                .replace('/*{1}*/', protoStr)
                .replace('/*{2}*/', '')
        }
        //console.log('   + [OUTPUT]:', fileContents.length);
        // ================================================================================

        if (fileContents && compiler.opts.minifyScripts) {
            fileContents = GenerateMinified(fileContents);
        }

        // ================================================================================
        // Finally
        if (fileContents) {
            fs.writeFile(targetScript, fileContents, function (err) {
                if (err) {
                    deferred.reject(new Error(err));
                }
                deferred.resolve(fileContents);
            });
        } else {
            deferred.reject(new Error('No Result'));
        }
        // ================================================================================


    } catch (ex) {
        deferred.reject(ex);
    }

    return deferred.promise;
}

function GenerateMinified(fileContents) {
    try {
        // Check for minification?
        var opts = { fromString: true };
        if (compiler.opts.minifyScripts) {
            opts = {
                fromString: true,
                mangle: {},
                warnings: false,
                compress: {
                    pure_funcs: compiler.opts.excludeStatements,
                }
            };
        } else {
            opts = {
                fromString: true,
                mangle: false,
                compress: false
            }
        }

        var UglifyJS = require("uglify-js");
        var minified = UglifyJS.minify(fileContents, opts);

        fileContents = minified.code;

    } catch (ex) {
        console.log(' - Error: ' + ex.message);
    }
    return fileContents;
}

var success = true;
try {
    if (outPath && !fs.existsSync(outPath)) {
        fs.mkdirSync(outPath);
    }

    var targets = {};
    var promises = [];
    var targetPath = path.join(process.cwd(), basePath);
    console.log('-------------------------------------------------------------------------------');
    console.log(' - Searching: ', targetPath);
    console.log('-------------------------------------------------------------------------------');

    var files = fs.readdirSync(targetPath);
    if (files) {
        files.sort();
        files
            .filter(function (file) {
                return file.substr(-5) === '.html';
            })
            .forEach(function (file) {
                console.log('   + ' + file);
                var srcPath = path.join(process.cwd(), '../') + file;
                var contents = fs.readFileSync(srcPath, 'utf-8');
                var promise = CompileHtml(file, contents)
                    .then(function (output) {
                        if (output) {
                            output = output.replace(/( *\r\n *)/g, '');
                            targets[file] = output;
                        }
                    })                

                promises.push(promise);
            });
    }

    q.all(promises).then(function () {
        console.log('-------------------------------------------------------------------------------');
        console.log(' - Generating Index...');

        var builderFile = outPath + 'index.html';
        var builderOut = fs.readFileSync(templHtml, 'utf-8');
        var links = '';
        var list = [];
        for (var filename in targets) {
            list.push(filename);
        }
        list.sort().forEach(function (filename) {
            var jscript = targets[filename];
            var style = 'width: 200px; margin-right: 8px;';
            var css = 'btn btn-lg btn-default pull-left';
            if (jscript) {
                jscript
                    .replace(/(\/\*[\w\'\s\r\n\*]*\*\/)|(\/\/[\w\s\']*)|(\<![\-\-\s\w\>\/]*\>)/g, '')
                    .replace(/( *\r\n *)/g, '')

                links += '<li><a class="' + css + '" style="' + style + '" href=\'javascript:' + jscript + '\'>'
                       + filename.replace(/(\.html)$/i, '')
                       + '</a></li>';
            }
        });

        var placeholder = '<li><a href="javascript:void()">Placeholder</a></li>';
        var result = builderOut
                        .replace(placeholder, links)
                        .replace(/( *\r\n *)/g, '');

        fs.writeFileSync(builderFile, result);

        console.log(' - Done.');
        console.log('-------------------------------------------------------------------------------');
    });

} catch (ex) {
    success = false;
    throw ex;
}
module.exports = {
    success: success
};