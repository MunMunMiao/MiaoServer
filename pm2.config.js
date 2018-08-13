const userConfig = require('./config')

const config = {
    apps: [
        {
            name: "lovelyz",
            script: "./app/aliyun-oss.js",
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
            max_memory_restart: '512M',
            log_date_format: "YYYY-MM-DD HH:mm Z",
        }
    ]
}
module.exports = config