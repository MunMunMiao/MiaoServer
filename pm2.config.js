const userConfig = require('./config')

const config = {
    apps: [
        {
            name: "ElrisServer",
            script: "./app/index.js",
            watch: true,
            instances: 'max',
            exec_mode: 'cluster',
            autorestart: true,
            ignore_watch: [
                'node_modules',
                '.git',
                '.idea',
                '.vscode'
            ],
            watch_options: {
                followSymlinks: false
            },
            max_memory_restart: '1024M',
            // log_date_format: "YYYY-MM-DD HH:mm Z",
            // error_file: userConfig.path.error_log,
            // out_file: userConfig.path.log,
        }
    ]
}
module.exports = config