const Koa = require('koa');
const koaJson = require('koa-json');
const bodyParser = require('koa-bodyparser');
const resource = require('koa-static');
const path = require('path');
const config = require('./config');


const app = new Koa();

app.use(bodyParser());
app.use(koaJson());
app.use(resource(path.join(config.root, config.appPath)));

module.exports = app;
