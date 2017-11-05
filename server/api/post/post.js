const router = require('koa-router')();
const controller = require('./post.controller');

router.get('/getPostList', controller.getPostList);
router.get('/getPost/:id', controller.getPost);

module.exports = router;