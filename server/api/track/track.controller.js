const moment = require('moment');
const fetch = require('node-fetch');
const config = require('../../config/environment');

exports.addEventTrack = async(ctx) => {
  let ip = ctx.request.ip.replace('::ffff:', '');
  let address = await fetch(config.aliCloudApi + ip, {
    method: 'GET',
    headers: {
      'Authorization': `APPCODE ${config.aliCloud_APPCODE}`
    }
  })
  .then(res => {
    return res.json();
  })
  .catch(e => {
    console.log('addEventTrack(aliCloudApi-error):', e);
  });

  try {
    let postData = ctx.request.body;
    let eventTrack = {
      key: postData.key,
      ip: ip || '',
      data_id: postData.id || '',
      keyword: postData.keyword || '',
      province: address.province || '',
      city: address.city || '',
      createTime: moment().format('YYYY-MM-DD HH:mm:ss')
    };
    let insert = await ctx.execSql('INSERT INTO event_track SET ?', eventTrack);
    if (insert.affectedRows > 0) {
      ctx.body = {
        success: 1,
        message: ''
      };
    }
  } catch (error) {
    console.log('addEventTrack(insert-error):', error);
    ctx.body = {
      success: 0,
      message: '上传数据出错'
    };
  }
};
