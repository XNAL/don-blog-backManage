const router =  require('koa-router')();
const post = require('../api/post/post');

router.use('/blogapi/post', post.routes(), post.allowedMethods());

module.exports = router;