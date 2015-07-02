var toHtml = require('htmlparser-to-html');
var HtmlCompiler = {
    opts: {
        prefix: 'ctx',
        mergeGroups: true,
        ignoreComments: false,
        trimWhiteSpace: true,
    },

    gen: function (file, contents, callback) {
        var q = require('q');
        var deferred = q.defer();

        // Strip non-html prefix
        var pilot = contents.indexOf('<html');
        if (pilot > 0) contents = contents.substr(pilot);
        //console.log(contents);

        var htmlparser = require("htmlparser");
        var handler = new htmlparser.DefaultHandler(function (error, dom) {
            if (error)
                deferred.reject(new Error(error));
            else if (dom.length > 0 && dom[0].name == 'html') {
                var html = dom[0];
                var output = {
                    lang: html.attribs.lang,
                    head: [],
                    body: [],
                };

                html.children.forEach(function (child) {
                    if (child.type == 'tag') {
                        switch (child.name) {
                            case 'head':
                                output.head = HtmlCompiler.inspectGroup(child);
                                break;
                            case 'body':
                                output.body = HtmlCompiler.inspectGroup(child);
                                break;
                        }
                    }
                });

                if (callback) {
                    callback(output);
                }
                deferred.resolve(output);
            }
        });

        var parser = new htmlparser.Parser(handler);
        parser.parseComplete(contents);

        return deferred.promise;
    },

    expandElem: function (item) {        
        return toHtml(item);
    },

    parseElem: function (item) {
        var output = null;
        switch (item.type) {
            case 'tag':
                switch (item.name) {
                    case 'base':
                        if (item.attribs && item.attribs.href) {
                            output = {
                                type: 'script',
                                text: HtmlCompiler.opts.prefix + '.base("' + item.attribs.href + '");',
                            };
                        }
                        break;
                    case 'title':
                        output = {
                            type: 'script',
                            text: 'ctx.title(' + JSON.stringify(item.data) + ');',
                        };
                        break;
                    case 'meta':
                        output = {
                            type: 'script',
                            text: 'ctx.meta(' + JSON.stringify(item.attribs) + ');',
                        };
                        break;
                    case 'link':
                        output = {
                            type: 'script',
                            text: 'ctx.link(' + JSON.stringify(item.attribs) + ');',
                        };
                        break;
                    case 'script':
                        output = {
                            type: 'script',
                            text: 'ctx.script("' + JSON.stringify(item) + '");',
                        };
                        break;
                    default:
                        var contents = HtmlCompiler.expandElem(item);
                        output = {
                            type: 'text',
                            text: contents,
                        };
                        break;
                }
                break;
            case 'script':
                if (item.attribs && item.attribs.src) {
                    output = {
                        type: 'script',
                        text: 'ctx.scriptUrl("' + item.attribs.src + '");',
                    };
                } else if (item.data) {
                    output = {
                        type: 'script',
                        text: 'ctx.scriptBody("' + item.data + '");',
                    };
                }
                break;
            case 'text':
                // Check if not empty?
                if (!HtmlCompiler.opts.trimWhiteSpace || !item.data.replace(/ +?/g, '')) {
                    output = {
                        type: 'text',
                        text: item.data,
                    };
                }
                break;
            case 'comment':
                // Disable comments?
                if (!HtmlCompiler.opts.ignoreComments) {
                    output = {
                        type: 'comment',
                        text: item.data,
                    };
                }
                break;
            default:
                console.log('   ? [UNKNOWN ELEM]: ', item);
                break;
        }
        return output;
    },

    inspectGroup: function (domElem) {
        var result = [];
        if (domElem.children) {
            domElem.children.forEach(function (item) {
                var output = HtmlCompiler.parseElem(item);
                if (output) {
                    result.push(output);
                }
            });
        }
        if (HtmlCompiler.opts.mergeGroups) {
            result = HtmlCompiler.mergeGroups(result);
        }
        return result;
    },

    mergeGroups: function (nodes) {
        if (!nodes.length) return nodes;
        var newNodes = [];
        var lastNode = null;
        for (var i = 0; i < nodes.length; i++) {
            var currNode = nodes[i];
            if (lastNode && lastNode.type == currNode.type) {
                lastNode.text += '\r\n' + currNode.text;
            } else {
                newNodes.push(currNode);
                lastNode = currNode;
            }
        }
        return newNodes;
    }
};
module.exports = HtmlCompiler;