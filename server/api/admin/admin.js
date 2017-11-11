const router = require('koa-router')();
const controller = require('./admin.controller');

router.post('/login', controller.login);
router.get('/getPostList', controller.getPostList);
router.get('/getPostTotal', controller.getPostTotal);
router.put('/offlinePost/:id', controller.offlinePost);
router.put('/publishPost/:id', controller.publishPost);
router.get('/getCategories', controller.getCategories);
router.get('/getPostsByCatId/:id', controller.getPostsByCatId);
router.get('/getTags', controller.getTags);

module.exports = router;