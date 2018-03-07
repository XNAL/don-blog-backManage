const moment = require('moment');
const jwt = require('jsonwebtoken');
const config = require('../../config/environment');
const util = require('util');
const verify = util.promisify(jwt.verify);

exports.addComment = async(ctx) => {
  let commentData = ctx.request.body.comment;
  commentData.createdTime = moment().format('YYYY-MM-DD HH:mm:ss');
  try {
    // 解密payload，获取用户名和ID
    let payload = await verify(ctx.request.body.token.split(' ')[1], config.tokenSecret);
    commentData.userId = payload.id;
  } catch (error) {
    console.log(error);
    ctx.body = {
      success: -1,
      message: '用户登录信息已过期，请重新登录'
    };
    return;
  }
  try {
    let maxData = await ctx.execSql('SELECT IFNULL(max(number), 0) AS maxNumber FROM comments WHERE postId = ?', commentData.postId);
    let maxNumber = maxData[0].maxNumber + 1;
    commentData.number = maxNumber;
    let insert = await ctx.execSql('INSERT INTO comments SET ?', commentData);
    if (insert.affectedRows > 0) {
      ctx.body = {
        success: 1,
        id: insert.insertId,
        number: maxNumber
      };
    } else {
      ctx.body = {
        success: 0,
        message: '添加文章出错'
      };
    }
  } catch (error) {
    console.log(error);
    ctx.body = {
      success: 0,
      message: '添加文章出错'
    };
  }
};

exports.getCommentsByPostId = async(ctx) => {
  let postId = ctx.params.postId || 0,
    sql = `SELECT comments.*, user.avatar, user.userName, cr.content AS replyContent, 
      cr.createdTime AS replyTime, cru.userName AS replyUserName, 
      cru.avatar AS replyAvatar, cr.number AS replyNumber
      FROM comments 
      LEFT JOIN user ON comments.userId = user.id
      LEFT JOIN comments cr on comments.replyId = cr.id
      LEFT JOIN user cru on cr.userId = cru.id 
      WHERE comments.postId = ? ORDER BY comments.createdTime DESC`;
  try {
    let comments = await ctx.execSql(sql, postId);
    ctx.body = {
      success: 1,
      message: '',
      comments: comments
    };
  } catch (error) {
    console.log(error);
    ctx.body = {
      success: 0,
      message: '查询数据出错',
      comments: null
    };
  }
};
