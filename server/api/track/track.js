const router = require('koa-router')();
const track = require('./track.controller');

router.post('/addEventTrack', track.addEventTrack);

module.exports = router;
