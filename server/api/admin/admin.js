const router = require('koa-router')();
const controller = require('./admin.controller');
const category = require('./category.controller');
const tag = require('./tag.controller');

router.post('/login', controller.login);
router.get('/getPostList', controller.getPostList);
router.get('/getPostTotal', controller.getPostTotal);
router.put('/offlinePost/:id', controller.offlinePost);
router.put('/publishPost/:id', controller.publishPost);

router.get('/getCategories', category.getCategories);
router.get('/getPostsByCatId/:id', category.getPostsByCatId);
router.put('/addNewCategory/:name', category.addNewCategory);
router.put('/updateCategory/:id', category.updateCategory);
router.put('/deleteCategory/:id', category.deleteCategory);

router.get('/getTags', tag.getTags);
router.get('/getPostsByTagId/:id', tag.getPostsByTagId);
router.put('/addNewTag/:name', tag.addNewTag);
router.put('/updateTag/:id', tag.updateTag);
router.put('/deleteTag/:id', tag.deleteTag);

module.exports = router;