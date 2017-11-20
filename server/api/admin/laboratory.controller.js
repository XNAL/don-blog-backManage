const helper = require('../../util/helper');

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

exports.createNewLaboratory = async(ctx) => {
  let result;
  try {    
    result = await helper.uploadFile(ctx);
  } catch (error) {
    console.log('result-error', error);
  }
  let fields = result.fields;
  let laboratory = {
    name: fields.name,
    link: fields.link,
    description: fields.description,
    poster: result.filePath
  };
  let insert = await ctx.execSql('INSERT INTO laboratory SET ?', laboratory);
  if (insert.affectedRows > 0) {
    ctx.body = {
      id: insert.insertId,
      poster: laboratory.poster
    };
  }
}