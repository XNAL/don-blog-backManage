exports.getPostList = async(ctx) => {
  let page = ctx.query.page || 1,
    pageNum = ctx.query.pageNum || 10;
  let pageIndex = (page - 1) * pageNum < 0 ? 0 : (page - 1) * pageNum;
  let sql = ` SELECT post.id, post.title, SUBSTRING_INDEX(post.content, '<!-- more -->', 1) AS content, 
                post.poster, post.createTime, post.categoryId, category.name AS categoryName 
                FROM post LEFT JOIN category ON post.categoryId = category.id WHERE post.status = 'PUBLISHED'
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

exports.getPost = async(ctx) => {
	let id = ctx.params.id || 0,
      sql = ` SELECT post.id, post.title, REPLACE(post.content, '<!-- more -->', '') AS content, 
              post.poster, post.createTime, post.categoryId, category.name AS categoryName 
              FROM post LEFT JOIN category ON post.categoryId = category.id 
              WHERE post.status = 'PUBLISHED' AND post.id = ${id}`,
      tagSql = ` SELECT tagId, tag.name AS tagName from post_tag a LEFT JOIN tag on a.tagId = tag.id 
                 WHERE a.postId = ${id}`,
      prevNextSql = ` SELECT -1 AS sort, id, title FROM post WHERE id > ${id} AND status = 'PUBLISHED' LIMIT 0, 1
                      UNION
                      SELECT 1 AS sort, id, title FROM (SELECT * FROM post WHERE id < ${id} 
                        AND status = 'PUBLISHED' ORDER BY id DESC LIMIT 0, 1) AS tab`
  try {
    let results = await ctx.execSql(sql);
    if (results.length > 0) {
      let tagResults = await ctx.execSql(tagSql);
      let prevNextResults = await ctx.execSql(prevNextSql);
      let prev = {},
          next = {};
      for(let value of Object.values(prevNextResults)) {
        if(value.sort === 1) {
          Object.assign(next, value);
        }
        if(value.sort === -1) {
          Object.assign(prev, value);
        }
      }
      ctx.body = {
        success: 1,
        message: '',
        post: results[0],
        tags: tagResults.length > 0 ? tagResults : [],
        prev: prev,
        next: next
      };
    } else {
      ctx.body = {
        success: 1,
        message: '',
        post: null,
        prev: null,
        next: null
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
