const userConfig = require('./config')

const config = {
    apps: [
        {
            name: "ElrisServer",
            script: "./app.js",
            watch: true,
            instances: '1',
            ignore_watch: [
                'node_modules',
                '.git',
                '.idea',
                '.vscode'
            ],
            watch_options: {
                followSymlinks: false
            },
            // error_file: userConfig.path.error_log,
            // out_file: userConfig.path.log,
        }
    ]
}
module.exports = config