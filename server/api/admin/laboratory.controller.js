
exports.getLaboratories = async(ctx) => {
  let sql = `SELECT * FROM laboratory ORDER BY createTime desc`;
  try {
    let results = await ctx.execSql(sql);
    ctx.body = {
      success: 1,
      message: '',
      laboratories: results.length > 0 ? results : []
    };
  } catch (error) {
    console.log(error);
    ctx.body = {
      success: 0,
      message: '查询数据出错'
    };
  }
}