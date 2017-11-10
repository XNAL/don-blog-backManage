const router = require('koa-router')();
const controller = require('./admin.controller');

router.post('/login', controller.login);
router.get('/getPostList', controller.getPostList);

module.exports = router;