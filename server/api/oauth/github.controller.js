const config = require('../../config/environment');
const sqlQuery = require('../../util/mysql-async');
const fetch = require('node-fetch');
const moment = require('moment');
const jwt = require('jsonwebtoken');

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
          let userId = 0;
          let selectGuest = await sqlQuery(`SELECT * FROM user WHERE role = 'GUEST' AND userName = ?`, [res.login]);
          if (selectGuest.length > 0) {
            userId = selectGuest[0].id;
            await sqlQuery(`UPDATE user SET avatar = ?, email = ? WHERE id = ?`, [res.avatar_url, res.email, userId]);
          } else {
            let newGuest = {
							userName: res.login,
							avatar: res.avatar_url,
							email: res.email,
							role: 'GUEST',
							createTime: moment().format('YYYY-MM-DD HH:mm:ss')
						};
            let insertGuest = await sqlQuery(`INSERT INTO user SET ?`, newGuest);
            if (insertGuest.affectedRows > 0) {
              userId = insertGuest.insertId;
            }
          }
          if (userId > 0) {
            ctx.session.user = res.login;
            // 用户token
            const userToken = {
              name: res.login,
              id: userId
            };
            // 签发token
            const token = jwt.sign(userToken, config.tokenSecret, { expiresIn: '2h' });
            ctx.body = {
              success: 1,
              token: token,
							userName: res.login,
							avatar: res.avatar_url,
              message: ''
            };
          } else {
            ctx.body = {
              success: 0,
              token: '',
              message: 'GitHub授权登录失败'
            };
          }
        });
  })
  .catch(e => {
    console.log(e);
    ctx.body = {
      success: 0,
      token: '',
      message: 'GitHub授权登录失败'
    };
  });
};
