const router = require('koa-router')();
const admin = require('./admin.controller');
const post = require('./post.controller');
const category = require('./category.controller');
const tag = require('./tag.controller');
const laboratory = require('./laboratory.controller');

router.post('/login', admin.login);

router.get('/getPostById/:id', post.getPostById);
router.post('/addPost', post.addPost);
router.post('/updatePost/:id', post.updatePost);
router.get('/getPostList', post.getPostList);
router.get('/getPostTotal', post.getPostTotal);
router.put('/offlinePost/:id', post.offlinePost);
router.put('/publishPost/:id', post.publishPost);

router.get('/getPostsByCatId/:id', category.getPostsByCatId);
router.get('/getPostsByTagId/:id', tag.getPostsByTagId);

router.get('/getCategories', category.getCategories);
router.put('/addNewCategory/:name', category.addNewCategory);
router.put('/updateCategory/:id', category.updateCategory);
router.delete('/deleteCategory/:id', category.deleteCategory);

router.get('/getTags', tag.getTags);
router.put('/addNewTagWhenPost/:name', tag.addNewTagWhenPost);
router.put('/addNewTag/:name', tag.addNewTag);
router.put('/updateTag/:id', tag.updateTag);
router.delete('/deleteTag/:id', tag.deleteTag);
router.get('/searchTagByName/:name', tag.searchTagByName);

router.get('/getLaboratories', laboratory.getLaboratories);
router.post('/createNewLaboratory', laboratory.createNewLaboratory);
router.post('/updateLaboratory', laboratory.updateLaboratory);
router.delete('/deleteLaboratory/:id', laboratory.deleteLaboratory);

module.exports = router;