const router = require('koa-router')();
const controller = require('./post.controller');

router.get('/getPostList', controller.getPostList);

module.exports = router;