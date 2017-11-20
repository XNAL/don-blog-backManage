var path = require('path');

module.exports = {
	db: {
        mysql: {
            host     : '127.0.0.1',
            user     : 'root',
            password : '123456',
            database : 'don_blog',
            connectionLimit:10
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
    root: path.normalize(__dirname + '/..'),
    appPath: 'src',
    tempUploads: 'tempUploads',
    uploads: 'uploads',
	port: 9000
};
