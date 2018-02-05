exports.getPostList = async(ctx) => {
  let page = ctx.query.page || 1,
    pageNum = ctx.query.pageNum || 10;
  let pageIndex = (page - 1) * pageNum < 0 ? 0 : (page - 1) * pageNum;
  let sql = ` SELECT post.id, post.title, post.content, 
                post.poster, post.createTime, post.categoryId, category.name AS categoryName 
                FROM post LEFT JOIN category ON post.categoryId = category.id WHERE post.status = 'PUBLISHED'
                ORDER BY post.createTime DESC LIMIT ${pageIndex}, ${pageNum}`;
  try {
    let results = await ctx.execSql(sql);
    let summaryArr = [];
    results.forEach(element => {
      let tempPost = element;
      let contentArr = element.content.split('\n');
      tempPost.content = contentArr.slice(0, 10).join('\n');
      summaryArr.push(tempPost);
    });
    ctx.body = {
      success: 1,
      message: '',
      posts: summaryArr
    };
  } catch (error) {
    console.log(error);
    ctx.body = {
      success: 0,
      message: '查询数据出错',
      posts: null
    };
  }
};

exports.getPost = async(ctx) => {
  let id = ctx.params.id || 0,
    	sql = ` SELECT post.id, post.title, post.content, 
              post.poster, post.createTime, post.categoryId, category.name AS categoryName, viewTotal 
              FROM post LEFT JOIN category ON post.categoryId = category.id 
              WHERE post.status = 'PUBLISHED' AND post.id = ${id}`,
    	tagSql = ` SELECT tagId, tag.name AS tagName from post_tag a LEFT JOIN tag on a.tagId = tag.id 
                 WHERE a.postId = ${id}`,
    	prevNextSql = ` SELECT -1 AS sort, id, title FROM (SELECT * FROM post WHERE id > ${id} 
                        AND status = 'PUBLISHED' LIMIT 0, 1) AS tab
                      UNION
                      SELECT 1 AS sort, id, title FROM (SELECT * FROM post WHERE id < ${id} 
                        AND status = 'PUBLISHED' ORDER BY id DESC LIMIT 0, 1) AS tab`,
    updateSql = `UPDATE post SET viewTotal = ? WHERE id = ?`;
  try {
    let results = await ctx.execSql(sql);
    if (results.length > 0) {
      let update = await ctx.execSql(updateSql, [results[0].viewTotal + 1, id]);
      let tagResults = await ctx.execSql(tagSql);
      let prevNextResults = await ctx.execSql(prevNextSql);
      let prev = {},
        next = {};
      for (let value of Object.values(prevNextResults)) {
        if (value.sort === 1) {
          Object.assign(next, value);
        }
        if (value.sort === -1) {
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
};

exports.getArchive = async(ctx) => {
  let catSql = `  SELECT category.id, category.name, COUNT(post.id) AS count 
                    FROM category LEFT JOIN post ON post.categoryId = category.id 
                    WHERE post.status = 'PUBLISHED'
                    GROUP BY category.id`,
    	tagSql = `  SELECT tag.id, tag.name, COUNT(post.id) AS count FROM tag 
                    LEFT JOIN post_tag ON tag.id = post_tag.tagId
                    LEFT JOIN post ON post_tag.postId = post.id AND post.status = 'PUBLISHED'
                    GROUP BY tag.id`,
    timeSql = ` SELECT DATE_FORMAT(createTime,'%Y年%m月') AS yearMonth, id, title, 
                    DATE_FORMAT(createTime,'%Y-%m-%d') AS createTime FROM post 
                    WHERE post.status = 'PUBLISHED' ORDER BY createTime DESC`;
  try {
    let catResults = await ctx.execSql(catSql);
    let tagResults = await ctx.execSql(tagSql);
    let timeResults = await ctx.execSql(timeSql);
    let timePosts = new Map();
    for (let post of Object.values(timeResults)) {
      if (timePosts.has(post.yearMonth)) {
        let tempArray = timePosts.get(post.yearMonth);
        tempArray.push({
          id: post.id,
          title: post.title,
          createTime: post.createTime
        });
        timePosts.set(post.yearMonth, tempArray);
      } else {
        timePosts.set(post.yearMonth, new Array({
          id: post.id,
          title: post.title,
          createTime: post.createTime
        }));
      }
    }

    ctx.body = {
      success: 1,
      message: '',
      categories: catResults.length > 0 ? catResults : [],
      tags: tagResults.length > 0 ? tagResults : [],
      times: timePosts.size > 0 ? [...timePosts] : []
    };
  } catch (error) {
    console.log(error);
    ctx.body = {
      success: 0,
      message: '查询数据出错'
    };
  }
};

exports.getPostsByCatId = async(ctx) => {
  let id = ctx.params.id || 0,
    page = ctx.query.page || 1,
    pageNum = ctx.query.pageNum || 10,
    pageIndex = (page - 1) * pageNum < 0 ? 0 : (page - 1) * pageNum,
    sql = ` SELECT post.id, post.title, post.content, 
              post.poster, post.createTime, post.categoryId, category.name AS categoryName 
              FROM post LEFT JOIN category ON post.categoryId = category.id 
              WHERE post.status = 'PUBLISHED' AND post.categoryId = ${id}
              ORDER BY post.createTime DESC LIMIT ${pageIndex}, ${pageNum}`;
  try {
    let category = await ctx.execSql(`SELECT name FROM category WHERE id = ${id}`);
    let results = await ctx.execSql(sql);
    let summaryArr = [];
    results.forEach(element => {
      let tempPost = element;
      let contentArr = element.content.split('\n');
      tempPost.content = contentArr.slice(0, 10).join('\n');
      summaryArr.push(tempPost);
    });
    ctx.body = {
      success: 1,
      message: '',
      name: category.length > 0 ? category[0].name : '',
      posts: summaryArr
    };
  } catch (error) {
    console.log(error);
    ctx.body = {
      success: 0,
      message: '查询数据出错',
      posts: null
    };
  }
};

exports.getPostsByTagId = async(ctx) => {
  let id = ctx.params.id || 0,
    page = ctx.query.page || 1,
    pageNum = ctx.query.pageNum || 10,
    pageIndex = (page - 1) * pageNum < 0 ? 0 : (page - 1) * pageNum,
    sql = ` SELECT post.id, post.title, post.content, 
              post.poster, post.createTime, post.categoryId, category.name AS categoryName 
              FROM post LEFT JOIN category ON post.categoryId = category.id 
              LEFT JOIN post_tag ON post.id = post_tag.postId
              WHERE post.status = 'PUBLISHED' AND post_tag.tagId = ${id}
              ORDER BY post.createTime DESC LIMIT ${pageIndex}, ${pageNum}`;
  try {
    let tag = await ctx.execSql(`SELECT name FROM tag WHERE id = ${id}`);
    let results = await ctx.execSql(sql);
    let summaryArr = [];
    results.forEach(element => {
      let tempPost = element;
      let contentArr = element.content.split('\n');
      tempPost.content = contentArr.slice(0, 10).join('\n');
      summaryArr.push(tempPost);
    });
    ctx.body = {
      success: 1,
      message: '',
      name: tag.length > 0 ? tag[0].name : '',
      posts: summaryArr
    };
  } catch (error) {
    console.log(error);
    ctx.body = {
      success: 0,
      message: '查询数据出错',
      posts: null
    };
  }
};

exports.getPostsByKeyword = async(ctx) => {
  let keyword = ctx.params.keyword || '',
    page = ctx.query.page || 1,
    pageNum = ctx.query.pageNum || 10,
    pageIndex = (page - 1) * pageNum < 0 ? 0 : (page - 1) * pageNum,
    sql = ` SELECT id, title, content, poster, createTime, categoryId, categoryName FROM (
                SELECT post.id, post.title, post.content, 
                post.poster, post.createTime, post.categoryId, category.name AS categoryName 
                FROM post LEFT JOIN category ON post.categoryId = category.id 
                LEFT JOIN post_tag ON post.id = post_tag.postId
                LEFT JOIN tag ON post_tag.tagId = tag.id 
                WHERE post.status = 'PUBLISHED' AND ( post.title like '%${keyword}%' OR post.content like '%${keyword}%' 
                  OR category.name like '%${keyword}%' OR tag.name like '%${keyword}%' )
              ) AS tab GROUP BY id, title, content, poster, createTime, categoryId, categoryName
              ORDER BY createTime DESC LIMIT ${pageIndex}, ${pageNum}`;
  try {
    let results = await ctx.execSql(sql);
    let summaryArr = [];
    results.forEach(element => {
      let tempPost = element;
      let contentArr = element.content.split('\n');
      tempPost.content = contentArr.slice(0, 10).join('\n');
      summaryArr.push(tempPost);
    });
    ctx.body = {
      success: 1,
      message: '',
      posts: summaryArr
    };
  } catch (error) {
    console.log(error);
    ctx.body = {
      success: 0,
      message: '查询数据出错',
      posts: null
    };
  }
};

exports.getLaboratory = async(ctx) => {
  try {
    let results = await ctx.execSql(`SELECT * FROM laboratory ORDER BY createTime DESC`);
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
};
