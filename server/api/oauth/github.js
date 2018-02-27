const router = require('koa-router')();
const github = require('./github.controller');

router.get('/github_oauth_cb', github.githubOAuth);

module.exports = router;
