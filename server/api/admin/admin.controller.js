const helper = require('../../util/helper');

exports.login = async(ctx) => {
  let userName = ctx.request.body.userName || '',
      password = ctx.request.body.password || '';
  if (!userName || !password) {
    ctx.body = {
      success: 0,
      message: '用户名或密码不能为空'
    };
    return;
  }

  try {
    let results = await ctx.execSql(`SELECT hashedPassword, salt FROM user WHERE role='ADMIN' and userName = '${userName}'`);
    if (results.length > 0) {
      let hashedPassword = results[0].hashedPassword,
          salt = results[0].salt,
          hashPassword = helper.encryptPassword(password, salt);
      if (hashedPassword === hashPassword) {
        ctx.session.user = userName;
        ctx.body = {
          success: 1,
          message: ''
        };
      } else {
        ctx.body = {
          success: 0,
          message: '用户名或密码错误'
        };
      }      
    } else {
      ctx.body = {
        success: 0,
        message: '用户名或密码错误'
      };
    }
  } catch (error) {
    console.log(error);
    ctx.body = {
      success: 0,
      message: '查询数据出错'
    };
  }
}
