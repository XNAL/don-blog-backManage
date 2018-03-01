const router = require('koa-router')();
const github = require('./github.controller');

router.get('/github/github_oauth', github.githubOAuth);

module.exports = router;
