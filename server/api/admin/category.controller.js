exports.getCategories = async(ctx) => {
  let sql = ` SELECT category.id, category.name, COUNT(post.id) AS count 
                FROM category LEFT JOIN post ON post.categoryId = category.id 
                GROUP BY category.id`;
  try {
    let results = await ctx.execSql(sql);
    ctx.body = {
      success: 1,
      message: '',
      categories: results.length > 0 ? results : []
    };
  } catch (error) {
    console.log(error);
    ctx.body = {
      success: 0,
      message: '查询数据出错'
    };
  }
}

exports.getPostsByCatId = async(ctx) => {  
  let id = ctx.params.id || 0,
      page = ctx.query.page || 1,
      pageNum = ctx.query.pageNum || 10,
      pageIndex = (page - 1) * pageNum < 0 ? 0 : (page - 1) * pageNum,
      fliter = id == 0 ? '' : ` WHERE post.categoryId = ${id} `,
      sql = ` SELECT post.id, post.title, post.createTime, post.status, post.categoryId, 
              category.name AS categoryName FROM post LEFT JOIN category 
              ON post.categoryId = category.id ${fliter}
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

exports.addNewCategory = async(ctx) => {
  let name = ctx.params.name || 0;
  try {
    let results = await ctx.execSql(`INSERT INTO category SET name = '${name}'`);
    ctx.body = {
      success: 1,
      message: '',
      newId: results.insertId
    };
  } catch (error) {
    console.log(error);
    ctx.body = {
      success: 0,
      message: '添加新分类出错',
      newId: 0
    };
  }
}

exports.updateCategory = async(ctx) => {
  let id = ctx.params.id || 0,
      name = ctx.query.name || '';
  try {
    let results = await ctx.execSql(`UPDATE category SET name = '${name}' WHERE id = ${id}`);
    ctx.body = {
      success: 1,
      message: ''
    };
  } catch (error) {
    console.log(error);
    ctx.body = {
      success: 0,
      message: '更新分类出错'
    };
  }
}


exports.deleteCategory = async(ctx) => {
  let id = ctx.params.id || 0;
  try {
    let results = await ctx.execSql(`DELETE FROM category WHERE id = ${id}`);
    ctx.body = {
      success: 1,
      message: ''
    };
  } catch (error) {
    console.log(error);
    ctx.body = {
      success: 0,
      message: '删除分类出错'
    };
  }
}