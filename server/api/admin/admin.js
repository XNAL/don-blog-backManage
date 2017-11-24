const router = require('koa-router')();
const admin = require('./admin.controller');
const category = require('./category.controller');
const tag = require('./tag.controller');
const laboratory = require('./laboratory.controller');

router.post('/login', admin.login);

router.get('/getPostList', admin.getPostList);
router.get('/getPostTotal', admin.getPostTotal);
router.put('/offlinePost/:id', admin.offlinePost);
router.put('/publishPost/:id', admin.publishPost);
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