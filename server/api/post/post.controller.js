exports.getPostList = async(ctx) => {
    console.log('getPostList');
    let page = ctx.query.page || 1,
        pageNum = ctx.query.pagenum || 10;
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
            data: results
        };
    } catch (error) {
        ctx.body = {
            success: 0,
            message: '查询数据出错',
            data: null
        };
    }
}

