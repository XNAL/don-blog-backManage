const router = require('koa-router')();
const controller = require('./admin.controller');
const category = require('./category.controller');
const tag = require('./tag.controller');
const laboratory = require('./laboratory.controller');

router.post('/login', controller.login);

router.get('/getPostList', controller.getPostList);
router.get('/getPostTotal', controller.getPostTotal);
router.put('/offlinePost/:id', controller.offlinePost);
router.put('/publishPost/:id', controller.publishPost);
router.get('/getPostsByCatId/:id', category.getPostsByCatId);
router.get('/getPostsByTagId/:id', tag.getPostsByTagId);

router.get('/getCategories', category.getCategories);
router.put('/addNewCategory/:name', category.addNewCategory);
router.put('/updateCategory/:id', category.updateCategory);
router.delete('/deleteCategory/:id', category.deleteCategory);

router.get('/getTags', tag.getTags);
router.put('/addNewTag/:name', tag.addNewTag);
router.put('/updateTag/:id', tag.updateTag);
router.delete('/deleteTag/:id', tag.deleteTag);

router.get('/getLaboratories', laboratory.getLaboratories);
router.post('/createNewLaboratory', laboratory.createNewLaboratory);
router.post('/updateLaboratory', laboratory.updateLaboratory);
router.delete('/deleteLaboratory/:id', laboratory.deleteLaboratory);

module.exports = router;