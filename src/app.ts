import process from 'process'
import path from 'path'
import _ from 'lodash'
import inquirer from 'inquirer'
import { exec } from 'child_process'

export class App {
    constructor() {
        //
    }
    run() {
        const cwd = process.cwd()
        const packageJson = require(path.join(cwd, './package.json'))
        if (packageJson.scripts) {
            const cmdKeys = _.keys(packageJson.scripts)
            const cmdVals = _.values(packageJson.scripts)
            const choices = cmdKeys.map((k, i) => `"${k}" ${cmdVals[i]}` )
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'cmd',
                    message: 'Which script do you want to run?',
                    choices
                }
            ]).then(answers => {
                const cmd: string = (answers as any).cmd;
                const scriptKeyIndex = cmd.indexOf(' ')
                const script = cmd.slice(0, scriptKeyIndex)
                const scriptProcess = exec(`npm run "${script}"`)
                if (scriptProcess.stdout) {
                    scriptProcess.stdout.pipe(process.stdout)
                }
                if (scriptProcess.stderr) {
                    scriptProcess.stderr.pipe(process.stderr)
                }
            })
        } else {
            console.log('cannot find scripts in package.json');
        }
    }
}