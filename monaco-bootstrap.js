/// <reference path="node_modules/monaco-editor/monaco.d.ts" />
require.config({ paths: { 'vs': '../../node_modules/monaco-editor/min/vs' } });
require(['vs/editor/editor.main'], function () {
    var params = window.location.search
        .substring(1)
        .split('&')
        .map(function (param) { return param.split('='); })
        .reduce(function (o1, o2) { o1[o2[0]] = o2[1]; return o1; }, {});
    var id = params.id;
    var config = {
        promises: [],
        code: ''
    };
    if (id) {
        var element = window.parent.document.getElementById(id);
        var referenceString = element.getAttribute('reference');
        if (referenceString) {
            try {
                var references = JSON.parse(referenceString);
                references.forEach(function(reference) {
                    config.promises.push(xhr('../../' + reference)
                        .then(function(response) { 
                            monaco.languages.typescript.javascriptDefaults.addExtraLib(response.responseText, reference);
                            monaco.languages.typescript.typescriptDefaults.addExtraLib(response.responseText, reference);
                        }, function(error) {
                            console.warn("Error loading reference '" + reference + "': ", error);
                        }));
                });
            } catch (error) {
                console.warn('Reference value "' + referenceString + '" is not a valid JSON array. More information: ', error);
            }
        }
        config.code = extractCode(element, id);
        config.language = element.getAttribute('language');
        config.theme = element.getAttribute('theme');
        config.fontSize = element.getAttribute('fontSize');
    }
    //var editor = load();
    Promise.all(config.promises)
        .then(load);

    function load() {
        var editorOptions = {
            value: config.code || "",
            language: config.language || 'typescript',
            theme: config.theme || 'vs-dark',
            fontSize: config.fontSize || 20
        };
        editor = monaco.editor.create(document.getElementById('monaco-container'), editorOptions);
    }

    function extractCode(element, id) {
        var code;
        var url = element.getAttribute('url');
        if (url) {
            config.promises.push(xhr('../../' + url)
                .then(function (c) { config.code = c.responseText; }, 
                      function (e) { config.code = "Error loading '" + url + "': " + JSON.stringify(e); }));
            code = "(Loading " + url + "...)";
        }
        else {
            code = element.getAttribute('code');
            if (code) {
                code = code.replace(/\\n/g, '\n')
                    .replace(/\\r/g, '\r')
                    .replace(/\\t/g, '\t');
            }
            else {
                var codeElement = element.querySelectorAll('.monaco-code')[0];
                if (codeElement) {
                    code = codeElement.innerHTML.trim();
                }
                else {
                    console.warn('Monaco Code editor with id of ' + id +
                        ' has no code to display. Either use the "code" attribute on "#' + id +
                        '" or create a child span with class "monaco-code" to provide code for the editor.');
                }
            }
        }
        return code;
    }
    /**
     * Taken from https://github.com/Microsoft/monaco-editor/blob/5cee62a7c0d1007660d79c280963c7989590aae3/website/playground/playground.js#L311
     */
    function xhr(url) {
        var req = null;
        return new Promise(function (resolve, reject, p) {
            req = new XMLHttpRequest();
            req.onreadystatechange = function () {
                if (req._canceled) {
                    return;
                }
                if (req.readyState === 4) {
                    if ((req.status >= 200 && req.status < 300) || req.status === 1223) {
                        resolve(req);
                    }
                    else {
                        reject(req);
                    }
                    req.onreadystatechange = function () { };
                }
                else {
                    //p(req);
                }
            };
            req.open("GET", url, true);
            req.responseType = "";
            req.send(null);
        }, function () {
            req._canceled = true;
            req.abort();
        });
    }
});
