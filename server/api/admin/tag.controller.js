
exports.getTags = async(ctx) => {
  let sql = ` SELECT tag.id, tag.name, COUNT(post.id) AS count FROM tag 
                LEFT JOIN post_tag ON tag.id = post_tag.tagId
                LEFT JOIN post ON post_tag.postId = post.id AND post.status = 'PUBLISHED'
                GROUP BY tag.id`;
  try {
    let results = await ctx.execSql(sql);
    let totalResult = await ctx.execSql(`SELECT COUNT(*) AS total FROM post`);
    ctx.body = {
      success: 1,
      message: '',
      tags: results.length > 0 ? results : [],
      total: totalResult.length > 0 ? totalResult[0].total : 0
    };
  } catch (error) {
    console.log(error);
    ctx.body = {
      success: 0,
      message: '查询数据出错'
    };
  }
}

exports.getPostsByTagId = async(ctx) => {  
  let id = ctx.params.id || 0,
      page = ctx.query.page || 1,
      pageNum = ctx.query.pageNum || 10,
      pageIndex = (page - 1) * pageNum < 0 ? 0 : (page - 1) * pageNum,
      fliter = id == 0 ? '' : ` WHERE post_tag.tagId = ${id} `,
      sql = ` SELECT post.id, post.title, post.createTime, post.status, 
              post.categoryId, category.name AS categoryName 
              FROM post LEFT JOIN category ON post.categoryId = category.id 
              LEFT JOIN post_tag ON post.id = post_tag.postId ${fliter}
              GROUP BY post.id, post.title, post.createTime, post.status, 
              post.categoryId, category.name
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

exports.addNewTag = async(ctx) => {
  let name = ctx.params.name || 0;
  try {
    let existName = await ctx.execSql(`SELECT * FROM tag WHERE name = '${name}'`);
    if (existName.length > 0) {
      ctx.body = {
        success: 0,
        message: '标签名称已存在！'
      };
      return false;
    }
    let results = await ctx.execSql(`INSERT INTO tag SET name = '${name}'`);
    ctx.body = {
      success: 1,
      message: '',
      newId: results.insertId
    };
  } catch (error) {
    console.log(error);
    ctx.body = {
      success: 0,
      message: '添加新标签出错',
      newId: 0
    };
  }
}

exports.updateTag = async(ctx) => {
  let id = ctx.params.id || 0,
      name = ctx.query.name || '';
  try {
    let existName = await ctx.execSql(`SELECT * FROM tag WHERE name = '${name}' AND id <> ${id}`);
    if (existName.length > 0) {
      ctx.body = {
        success: 0,
        message: '标签名称已存在！'
      };
      return false;
    }
    let results = await ctx.execSql(`UPDATE tag SET name = '${name}' WHERE id = ${id}`);
    ctx.body = {
      success: 1,
      message: ''
    };
  } catch (error) {
    console.log(error);
    ctx.body = {
      success: 0,
      message: '更新标签出错'
    };
  }
}


exports.deleteTag = async(ctx) => {
  let id = ctx.params.id || 0;
  try {
    let results = await ctx.execSql(`DELETE FROM tag WHERE id = ${id}`);
    let results2 = await ctx.execSql(`DELETE FROM post_tag WHERE tagId = ${id}`);
    ctx.body = {
      success: 1,
      message: ''
    };
  } catch (error) {
    console.log(error);
    ctx.body = {
      success: 0,
      message: '删除标签出错'
    };
  }
}