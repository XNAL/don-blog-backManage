const router =  require('koa-router')();
const post = require('../api/post/post');
const admin = require('../api/admin/admin');
const github = require('../api/oauth/github');

router.use('/blogapi/post', post.routes(), post.allowedMethods());
router.use('/backapi/admin', admin.routes(), admin.allowedMethods());
router.use('/blogapi/oauth/github', github.routes(), github.allowedMethods());

module.exports = router;