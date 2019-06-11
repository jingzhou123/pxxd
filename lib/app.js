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
            var choices = cmdKeys.map(function (k, i) { return k + ":" + cmdVals_1[i]; });
            inquirer_1.default.prompt([
                {
                    type: 'list',
                    name: 'cmd',
                    message: 'Which script do you want to run?',
                    choices: choices
                }
            ]).then(function (answers) {
                var script = answers.cmd.split(':')[0];
                child_process_1.exec("npm run " + script, function (err, stdo, stdi) {
                    if (err) {
                        console.error(err);
                    }
                    else {
                        console.log(stdo);
                    }
                });
            });
        }
        else {
            console.log('cannot find scripts in package.json');
        }
    };
    return App;
}());
exports.App = App;