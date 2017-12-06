const app = require('./config/koa');
const config = require('./config/config');
const query = require('./util/mysql-async');
const Store = require('./util/redis-store');
const session = require('koa-session2');
const http = require('http');
const fs = require('fs');
const path = require('path');

app.use(session({
  store: new Store(config.db.redis),
  ttl: 2 * 60 * 60 * 1000
}));

app.use(async(ctx, next) => {
  ctx.execSql = query;
  ctx.set('Access-Control-Allow-Origin', config.accessControlAllowOrigin);
  await next();
});

// routes
fs.readdirSync(path.join(__dirname, 'routes')).forEach(function (file) {
    if (~file.indexOf('.js')) {
      app.use(require(path.join(__dirname, 'routes', file)).routes());
    }
});

app.use(function (ctx, next) {
   ctx.redirect('/404.html');
});

app.on('error', (error, ctx) => {
  console.log('something error ' + JSON.stringify(ctx.onerror));
  ctx.redirect('/500.httml');
})

http.createServer(app.callback())
	.listen(config.port)
	.on('listening', function () {
	  console.log('server listening on: ' + config.port);
	})