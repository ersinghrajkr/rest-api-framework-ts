// {
//   "extension": ["ts"],
//   "spec": ["src/**/*.spec.ts"],
//   "require": ["ts-node/register"]
// }

'use strict';

module.exports = {
    require: [
        "ts-node/register",
        "mochawesome/register"
    ],
    extension: ["ts"],
    'node-option': [
        "experimental-specifier-resolution=node",
        "loader=ts-node/esm",
        "no-warnings"
    ],
    spec: ["./src/tests/**/*.spec.ts"],
    watchFiles: [],
    timeout: 3000000,
    parallel: false,
    recursive: true,
    color: true,
    reporter: "mochawesome",
    reporterOptions: [
        'reportFilename=API TEST Report',
        'timestamp=longDate',
        'showHooks=always',
        'showPassed=true',
        'showFailed=true',
        'showPending=true',
        'showSkipped=true',
        'reportPageTitle=Otalio Report',
        'quiet=true',
        'consoleReporter=Spec'
    ],
    retries: 0,
    ignore: ["/path/to/some/ignored/file"],
    ui: 'bdd',
    'full-trace': true,
    exit: true,
    slow: 300,
    diff: true,
    'inline-diffs': true
}