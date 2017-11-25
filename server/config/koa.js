const Koa = require('koa');
const koaJson = require('koa-json');
const bodyParser = require('koa-bodyparser');
const resource = require('koa-static');
const path = require('path');
const jwt = require('koa-jwt');
const config = require('./config');
const tokenError = require('../middlreware/tokenError');

const app = new Koa();

app.use(tokenError());
app.use(bodyParser());
app.use(koaJson());
app.use(resource(path.join(config.root, config.appPath)));
app.use(jwt({
  secret: config.tokenSecret
}).unless({
  path: [/^\/backapi\/admin\/login/, /^\/blogapi\//]
}));

module.exports = app;
