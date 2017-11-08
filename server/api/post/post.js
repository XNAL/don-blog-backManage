const router = require('koa-router')();
const controller = require('./post.controller');

router.get('/getPostList', controller.getPostList);
router.get('/getPost/:id', controller.getPost);
router.get('/getArchive', controller.getArchive);
router.get('/category/:id', controller.getPostsByCatId);
router.get('/tag/:id', controller.getPostsByTagId);
router.get('/keyword/:keyword', controller.getPostsByKeyword);

router.get('/getLaboratory', controller.getLaboratory);

module.exports = router;