import browserSync from 'browser-sync';
import config from '../config';

const server = browserSync.create();

// in CL 'gulp server --open' to open current project in browser
// in CL 'gulp server --tunnel siteName' to make project available over http://siteName.localtunnel.me
const build = (cb) => {
  server.init({
    server: {
      baseDir: !config.production ? [config.dest.root, config.src.root] : config.dest.root,
      directory: false,
      serveStaticOptions: {
        extensions: ['html'],
      },
    },
    files: [
      config.dest.html + '/*.html',
      config.dest.css + '/*.css',
      config.dest.js + '/*.js',
      config.dest.img + '/**/*',
    ],
    port: config.argv.port || 3000,
    logLevel: 'info', // 'debug', 'info', 'silent', 'warn'
    logConnections: false,
    logFileChanges: true,
    open: Boolean(config.argv.open || true),
    notify: false,
    ghostMode: false,
    online: true,
    tunnel: config.argv.tunnel || null,
  });
  cb();
};

module.exports.build = build;
module.exports.server = server;
