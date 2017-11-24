const jwt = require('jsonwebtoken');
const helper = require('../../util/helper');
const config = require('../../config/config');

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
    let results = await ctx.execSql(`SELECT id, hashedPassword, salt FROM user WHERE role='ADMIN' and userName = ?`, userName);
    if (results.length > 0) {
      let hashedPassword = results[0].hashedPassword,
          salt = results[0].salt,
          hashPassword = helper.encryptPassword(password, salt);
      if (hashedPassword === hashPassword) {
        ctx.session.user = userName;
        // 用户token
        const userToken = {
          name: userName,
          id: results[0].id
        };
        // 签发token
        const token = jwt.sign(userToken, config.tokenSecret, { expiresIn: '2h' });
        ctx.body = {
          success: 1,
          token: token,
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

exports.getPostList = async(ctx) => {
  let page = ctx.query.page || 1,
      pageNum = ctx.query.pageNum || 10;
  let pageIndex = (page - 1) * pageNum < 0 ? 0 : (page - 1) * pageNum;
  let sql = ` SELECT post.id, post.title, post.createTime, post.status, post.categoryId, 
                category.name AS categoryName FROM post 
                LEFT JOIN category ON post.categoryId = category.id 
                ORDER BY post.createTime DESC LIMIT ${pageIndex}, ${pageNum}`;
  try {
    let results = await ctx.execSql(sql);
    ctx.body = {
      success: 1,
      message: '',
      posts: results
    };
  } catch (error) {
    console.log(error);
    ctx.body = {
      success: 0,
      message: '查询数据出错',
      posts: null
    };
  }
}

exports.getPostTotal = async(ctx) => {
  try {
    let results = await ctx.execSql(`SELECT * FROM post`);
    ctx.body = {
      success: 1,
      message: '',
      total: results.length || 0
    };
  } catch (error) {
    console.log(error);
    ctx.body = {
      success: 0,
      message: '查询数据出错',
      total: 0
    };
  }
}

exports.offlinePost = async(ctx) => {
  let id = ctx.params.id || 0;
  try {
    let results = await ctx.execSql(`UPDATE post SET status = 'OFFLINE' WHERE id = ?`, id);
    ctx.body = {
      success: 1,
      message: ''
    };
  } catch (error) {
    console.log(error);
    ctx.body = {
      success: 0,
      message: '文章下线出错'
    };
  }
}

exports.publishPost = async(ctx) => {
  let id = ctx.params.id || 0;
  try {
    let results = await ctx.execSql(`UPDATE post SET status = 'PUBLISHED' WHERE id = ?`, id);
    ctx.body = {
      success: 1,
      message: ''
    };
  } catch (error) {
    console.log(error);
    ctx.body = {
      success: 0,
      message: '文章发布出错'
    };
  }
}



