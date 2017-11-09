const router = require('koa-router')();
const controller = require('./admin.controller');

router.post('/login', controller.login);

module.exports = router;