const router = require('koa-router')();
const post = require('./post.controller');
const comment = require('./comment.controller');

router.get('/getPostList', post.getPostList);
router.get('/getPost/:id', post.getPost);
router.get('/getArchive', post.getArchive);
router.get('/category/:id', post.getPostsByCatId);
router.get('/tag/:id', post.getPostsByTagId);
router.get('/keyword/:keyword', post.getPostsByKeyword);

router.get('/getLaboratory', post.getLaboratory);

router.post('/addComment', comment.addComment);
router.get('/getCommentsByPostId/:postId', comment.getCommentsByPostId);

module.exports = router;
