"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var process_1 = __importDefault(require("process"));
var path_1 = __importDefault(require("path"));
var lodash_1 = __importDefault(require("lodash"));
var inquirer_1 = __importDefault(require("inquirer"));
var child_process_1 = require("child_process");
var App = /** @class */ (function () {
    function App() {
        //
    }
    App.prototype.run = function () {
        var cwd = process_1.default.cwd();
        var packageJson = require(path_1.default.join(cwd, './package.json'));
        if (packageJson.scripts) {
            var cmdKeys = lodash_1.default.keys(packageJson.scripts);
            var cmdVals_1 = lodash_1.default.values(packageJson.scripts);
            var choices = cmdKeys.map(function (k, i) { return "\"" + k + "\" " + cmdVals_1[i]; });
            inquirer_1.default.prompt([
                {
                    type: 'list',
                    name: 'cmd',
                    message: 'Which script do you want to run?',
                    choices: choices
                }
            ]).then(function (answers) {
                var cmd = answers.cmd;
                var scriptKeyIndex = cmd.lastIndexOf(':');
                var script = cmd.slice(0, scriptKeyIndex);
                var scriptProcess = child_process_1.exec("npm run " + script);
                if (scriptProcess.stdout) {
                    scriptProcess.stdout.pipe(process_1.default.stdout);
                }
                if (scriptProcess.stderr) {
                    scriptProcess.stderr.pipe(process_1.default.stderr);
                }
            });
        }
        else {
            console.log('cannot find scripts in package.json');
        }
    };
    return App;
}());
exports.App = App;
