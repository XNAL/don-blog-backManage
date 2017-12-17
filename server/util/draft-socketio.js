const SocketIO = require('socket.io');
const config =  require('../config/environment');
const DraftRedis =  require('./draft-redis');

const DRAFTREDISKEY = 'DRAFTPSOTKEY';

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

    socket.on('test', function (val) {
      console.log('test from client', val);
      socket.emit('test', 'from server');
    });

    // 离开编辑文章页面
    socket.on('disconnect', function () {
      console.info('[%s] DISCONNECTED', socket.address);
    });

    // 进入新增文章页面，获取已保存的草稿（可以为空）
    socket.on('getDraftPost', function () {
      let data = draftRedis.get(DRAFTREDISKEY);
      socket.emit('getDraftPost', data);
    });

    // 实时保存文章内容
    socket.on('saveDraftPost', function (data) {
      draftRedis.set(DRAFTREDISKEY, data);
      socket.emit('saveDraftPost', 'success');
    });

    // 保存后清空已保存的文章草稿
    socket.on('clearDraftPost', function () {
      draftRedis.destroy(DRAFTREDISKEY);
      socket.emit('clearDraftPost', 'success');
    });
  });
};
