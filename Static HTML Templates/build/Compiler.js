/// <reference path="typings/imports.d.ts" />

/* -------------------------------------------------------------------------------
Example of a custom HTTP Server
------------------------------------------------------------------------------- */
var templHtml = 'scripts/Linker.template.html';
var templPath = 'scripts/Linker.template.js';
var encoderPath = 'scripts/lib/Base64.js';
var protoStrPath = 'scripts/lib/StringPrototyped.js';
var basePath = '../';
var outPath = 'compiled/';

var fs = require('fs');
var path = require('path');
var compiler = require('./scripts/HtmlCompiler.js');
var lzwCompressor = require('./scripts/lib/lzwCompressor.js');
var Base64 = require('./scripts/lib/Base64.js');

function InspectFiles(file, contents) {
    return compiler
        .gen(file, contents)
        .then(function (output) {
            return GenerateFile(file, output);
        });
}

function GenerateFile(filename, output) {
    console.log('   + ' + filename);

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

    var srcPath = templPath;
    var targetPath = path.join((outPath || process.cwd()), 'script/');
    var targetScript = path.join(targetPath, filename + '.link.js');
    if (!fs.existsSync(targetPath)) {
        fs.mkdirSync(targetPath);
    }

    var contents = fs.readFileSync(srcPath, 'utf-8').replace(/^\uFEFF/, '');
    var requires = fs.readFileSync(encoderPath, 'utf-8').replace(/^\uFEFF/, '');
    var protoStr = fs.readFileSync(protoStrPath, 'utf-8').replace(/^\uFEFF/, '');
    var jsonEnc = Base64.encode(JSON.stringify(output));
    var encoded = '\'' + jsonEnc + '\'';
    var result = !contents ? null : contents
        .replace('/*{0}*/', encoded)
        .replace('/*{1}*/', requires)
        .replace('/*{2}*/', protoStr)

    var fileContents = result;
    if (result) {
        try {
            // Check for minification?
            var opts = { fromString: true };
            if (compiler.opts.minifyScripts) {
                opts = {
                    fromString: true,
                    mangle: {},
                    warnings: true,
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
        fs.writeFile(targetScript, fileContents, function (err) {
            if (err) {
                deferred.reject(new Error(err));
            }
            deferred.resolve(fileContents);
        });
    } else {
        deferred.reject(new Error('No Result'));
    }

    return deferred.promise;
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
                var srcPath = path.join(process.cwd(), '../') + file;
                var contents = fs.readFileSync(srcPath, 'utf-8');
                var promise = InspectFiles(file, contents)
                    .then(function (output) {
                        if (output) {
                            output = output.replace(/( *\r\n *)/g, '');
                            targets[file] = output;
                        }
                    });
                promises.push(promise);
            });
    }

    var q = require('q');
    q.all(promises).then(function () {
        console.log(' - Generating Index...');
        var builderFile = outPath + 'index.html';
        var contents = fs.readFileSync(templHtml, 'utf-8');
        var links = '';
        for (var filename in targets) {
            var jscript = targets[filename];
            links += '<li><a class="btn btn-lg btn-default pull-left" style="width: 200px; margin-right: 8px;" href=\'javascript:' + jscript + '\'>' + filename.replace(/(\.html)$/i, '') + '</a></li>';
        }
        var placeholder = '<li><a href="javascript:void()">Placeholder</a></li>';
        var result = contents
                        .replace(placeholder, links)
                        .replace(/(\/\*[\w\'\s\r\n\*]*\*\/)|(\/\/[\w\s\']*)|(\<![\-\-\s\w\>\/]*\>)/g, '')
                        .replace(/( *\r\n *)/g, '');

        fs.writeFileSync(builderFile, result);
        console.log('-------------------------------------------------------------------------------');
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