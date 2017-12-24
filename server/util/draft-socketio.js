const SocketIO = require('socket.io');
const config =  require('../config/environment');
const DraftRedis =  require('./draft-redis');
const redisMysql = require('./redis-mysql');

const draftPostRedisKey = config.draftPostRedisKey;

exports.initSocket = function (server) {
  console.log('init websocket');
  //socket.io
  let socketHandle = SocketIO(server, {
    serveClient: true,
    path: config.socketioPath
  });

  let draftRedis = new DraftRedis(config.db.redis);
  socketHandle.on('connection', function (socket) {
    console.log('socket connected');

    // 离开编辑文章页面
    socket.on('disconnect', function () {
      console.info('[%s] DISCONNECTED', socket.sid);
    });

    // 进入新增文章页面，获取已保存的草稿（可以为空）
    socket.on('getDraftPost', async function () {
      let data = await draftRedis.get(draftPostRedisKey);
      if (!data) {
        data = await redisMysql.getDraftPostFromMysql();
        socket.emit('getDraftPost', data);
        await draftRedis.set(draftPostRedisKey, data);
      } else {
        socket.emit('getDraftPost', data);
      }
    });

    // 实时保存文章内容
    socket.on('saveDraftPost', async function (data) {
      let res = await draftRedis.set(draftPostRedisKey, data);
      socket.emit('saveDraftPost', res);
    });

    // 保存后清空已保存的文章草稿
    socket.on('clearDraftPost', async function () {
      await draftRedis.destroy(draftPostRedisKey);
      await redisMysql.clearDraftPostOfMysql();
      socket.emit('clearDraftPost', true);
    });
  });
};
