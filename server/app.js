const app = require('./config/koa');
const config = require('./config/config');
const query = require('./config/mysql-async');
const http = require('http');
const fs = require('fs');
const path = require('path');

app.use(async(ctx, next) => {
  ctx.execSql = query;
  ctx.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  await next();
});

// routes
fs.readdirSync(path.join(__dirname, 'routes')).forEach(function (file) {
    if (~file.indexOf('.js')) app.use(require(path.join(__dirname, 'routes', file)).routes());
});

app.use(function (ctx, next) {
   ctx.redirect('/404.html');
});

app.on('error', (error, ctx) => {
  console.log('something error ' + JSON.stringify(ctx.onerror))
  ctx.redirect('/500.httml');
})

http.createServer(app.callback())
	.listen(config.port)
	.on('listening', function () {
	  console.log('server listening on: ' + config.port)
	})