const path = require('path');

module.exports = {
  db: {
    mysql: {
      host: '127.0.0.1',
      user: 'root',
      password: '123456',
      database: 'don_blog',
      connectionLimit: 10
    },
    redis: {
      port: 6379,
      host: '127.0.0.1',
      db: 3,
      options: {
        return_buffers: false,
        auth_pass: ''
      }
    }
  },
  oAuth: {
    github: {
      client_id: '6625cb27769b1bc52415',
      client_secret: '5ead47391fd5b132957bc4bf84400d5cacd1e748'
    }
  },
  root: path.normalize(__dirname + '/..'),
  appPath: 'src',
  tempUploads: 'tempUploads',
  uploads: 'uploads',
  port: 9000,
  tokenSecret: 'test',
  isUpdateAdmin: true,
  accessControlAllowOrigin: 'http://localhost:3000',
  adminName: 'admin',
  adminPassword: '123456',
  socketioPath: '/testsocketiopath',
  draftPostRedisKey: 'DRAFTPSOTKEY'
};
