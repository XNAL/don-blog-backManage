const moment = require('moment');

exports.addComment = async(ctx) => {
  let commentData = ctx.request.body;
  commentData.createTime = moment().format('YYYY-MM-DD HH:mm:ss');
  try {
    let insert = await ctx.execSql('INSERT INTO comment SET ?', commentData);
    if (insert.affectedRows > 0) {
      ctx.body = {
        success: 1,
        id: insert.insertId
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
    sql = `SELECT comments.*, user.avatar, user.userName, cr.content AS replyContent, cr.createdTime AS replyTime, cru.userName AS replyUserName, cru.avatar AS replyAvatar FROM comments 
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
