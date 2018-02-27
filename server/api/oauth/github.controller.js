const config = require('../../config/environment');
const sqlQuery = require('../../util/mysql-async');
const fetch = require('node-fetch');
const moment = require('moment');

exports.githubOAuth = async(ctx) => {
  const code = ctx.query.code;
  let path = 'https://github.com/login/oauth/access_token';
  const params = {
    client_id: config.oAuth.github.client_id,
    client_secret: config.oAuth.github.client_secret,
    code: code
  };
  await fetch(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  })
  .then(res => {
    return res.text();
  })
  .then(body => {
    const args = body.split('&');
    let arg = args[0].split('=');
    return arg[1];
  })
  .then(async(token) => {
    const url = ' https://api.github.com/user?access_token=' + token;
    await fetch(url)
        .then(res => {
          return res.json();
        })
        .then(async(res) => {
          let selectGuest = await sqlQuery(`SELECT * FROM user WHERE role='ADMIN' AND userName=?`, res.login);
          if (selectGuest.length > 0) {
            await sqlQuery(`UPDATE user SET avatar = ?, email = ? WHERE id = ?`, [res.avatar_url, res.email, selectGuest[0].id]);
          } else {
            let newGuest = {
							userName: res.login,
							avatar: res.avatar_url,
							email: res.email,
							role: 'GUEST',
							createTime: moment().format('YYYY-MM-DD HH:mm:ss')
						};
            await sqlQuery(`INSERT INTO user SET ?`, newGuest);
          }
          ctx.body = res;
        });
  })
  .catch(e => {
    console.log(e);
  });
};
