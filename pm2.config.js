module.exports = {
    apps: [
        {
            name: "lyz",
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
            max_memory_restart: '512M',
            log_date_format: "YYYY-MM-DD HH:mm Z",
        }
    ]
}