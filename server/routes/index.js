const router =  require('koa-router')();
const post = require('../api/post/post');
const admin = require('../api/admin/admin');

router.use('/blogapi/post', post.routes(), post.allowedMethods());
router.use('/backapi/admin', admin.routes(), admin.allowedMethods());

module.exports = router;