/// <reference path="typings/imports.d.ts" />

/* -------------------------------------------------------------------------------
Example of a custom HTTP Server
------------------------------------------------------------------------------- */
var templHtml = 'assets/Linker.template.html';
var templPath = 'assets/Linker.template.js';
var encoderPath = 'assets/lib/lzwCompressor.js';
var basePath = '../';
var outPath = 'gen/';

var fs = require('fs');
var path = require('path');
var compiler = require('./assets/HtmlCompiler.js');
var lzwCompressor = require('./assets/lib/lzwCompressor.js');
var Base64 = require('./assets/lib/Base64.js');

function InspectFiles(file, contents) {
    return compiler
        .gen(file, contents)
        .then(function (output) {
            return GenerateFile(file, output);
        });
}

function GenerateFile(filename, output) {
    var contents = JSON.stringify(output, null, 4);
    var targetPath = outPath || process.cwd();
    if (!fs.existsSync(targetPath)) {
        fs.mkdirSync(targetPath);
    }
    var targetJSON = path.join(targetPath, filename + '.json');
    fs.writeFileSync(targetJSON, contents);
    console.log(' - ' + targetJSON);

    var targetScript = path.join(targetPath, filename + '.link.js');
    return GenerateScript(targetScript, output);
}

function GenerateScript(filename, output) {
    var q = require('q');
    var deferred = q.defer();


    var srcPath = templPath;
    var requires = fs.readFileSync(encoderPath, 'utf-8').replace(/^\uFEFF/, '');
    var contents = fs.readFileSync(srcPath, 'utf-8').replace(/^\uFEFF/, '');
    var jsonEnc = Base64.encode(JSON.stringify(output));
    var encoded = '\'' + jsonEnc + '\'';
    var result = !contents ? null : contents
        .replace('/*{0}*/', encoded)
        .replace('/*{1}*/', requires);
    if (result) {
        var fileContents = result;
        fs.writeFile(filename, fileContents, function (err) {
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
    console.log(' - Searching: ', targetPath);
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
            links += '<li> &raquo; <a href="javascript:' + jscript + '">' + filename + '</a></li>';
        }
        var placeholder = '<li><a href="javascript:void()">Placeholder</a></li>';
        var result = contents.replace(placeholder, links).replace(/( *\r\n *)/g, '');
        fs.writeFileSync(builderFile, result);
        console.log(' - Done.');
    });

} catch (ex) {
    success = false;
    throw ex;
}
module.exports = {
    success: success
};