const schedule = require('node-schedule');
const moment = require('moment');
const sqlQuery = require('./mysql-async');
const DraftRedis = require('./draft-redis');
const config =  require('../config/environment');

const draftPostRedisKey = config.draftPostRedisKey;

// redis向mysql中写入数据定时任务
exports.redisToMysqlTask = function () {
  let draftRedis = new DraftRedis(config.db.redis);

  // 每天凌晨3点执行任务
  let rule = new schedule.RecurrenceRule();
  rule.hour = 3;
  rule.minute = 0;

  schedule.scheduleJob(rule, async function () {
    console.log('定时任务开始执行!', moment().format('YYYY-MM-DD HH:mm:ss'));
    let redisPost = await draftRedis.get(draftPostRedisKey);
    if(redisPost) {
      let redisPostData = JSON.parse(redisPost);
      let sqlPost = {
        postId: redisPostData.id,
        title: redisPostData.title,
        content: redisPostData.content,
        categoryId: redisPostData.categoryId,
        tags: JSON.stringify(redisPostData.tags),
        poster: redisPostData.poster
      };
      let selectResult = await sqlQuery('SELECT * FROM draft_post_redis WHERE redisKey = ?', draftPostRedisKey);
      if (selectResult && selectResult.length > 0) {
        console.log('update');
        await sqlQuery('UPDATE draft_post_redis SET ? WHERE id = ?', [sqlPost, selectResult[0].id]);
      } else {
        console.log('insert');
        sqlPost.redisKey = draftPostRedisKey;
        await sqlQuery('INSERT INTO draft_post_redis SET ?', sqlPost);
      }
    }
    console.log('redis向mysql中写入数据完成！', moment().format('YYYY-MM-DD HH:mm:ss'));
  });
}

exports.getDraftPostFromMysql = async function () {
  let selectResult = await sqlQuery('SELECT * FROM draft_post_redis WHERE redisKey = ?', draftPostRedisKey);
  if (selectResult && selectResult.length > 0) {
    var redisPost = selectResult[0];
    return {
      id: redisPost.postId,
      title: redisPost.title,
      content: redisPost.content,
      categoryId: redisPost.categoryId,
      tags: JSON.parse(redisPost.tags),
      poster: redisPost.poster
    };
  }
  return {};
}

exports.clearDraftPostOfMysql = async function () {
  let selectResult = await sqlQuery('DELETE FROM draft_post_redis WHERE redisKey = ?', draftPostRedisKey);
  return true;
}