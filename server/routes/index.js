const router =  require('koa-router')();
const post = require('../api/post/post');
const admin = require('../api/admin/admin');
const oauth = require('../api/oauth/index');

router.use('/blogapi/post', post.routes(), post.allowedMethods());
router.use('/backapi/admin', admin.routes(), admin.allowedMethods());
router.use('/blogapi/oauth', oauth.routes(), oauth.allowedMethods());

module.exports = router;