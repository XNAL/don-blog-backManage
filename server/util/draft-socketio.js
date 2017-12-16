const SocketIO = require('socket.io');
const config =  require('../config/environment');

exports.initSocket = function (server) {
  //socket.io
  let socketHandle = SocketIO(server, {
    serveClient: true,
    path: config.socketioPath
  });

  socketHandle.on('connection', function (socket) {
    socket.address =
      socket.handshake.address !== null
        ? socket.request.connection.remoteAddress
        : process.env.DOMAIN;

    socket.connectedAt = new Date();

    // 离开编辑文章页面
    socket.on('disconnect', function () {
      console.info('[%s] DISCONNECTED', socket.address);
    });

    // 进入新增文章页面，获取已保存的草稿（可以为空）
    socket.on('getDraftPost', function () {
      
    });

    // 实时保存文章内容
    socket.on('saveDraftPost', function (data) {

    });

    // 保存后清空已保存的文章草稿
    socket.on('clearDraftPost', function () {

    });
    console.info('[%s] CONNECTED', socket.address);
  });
};
