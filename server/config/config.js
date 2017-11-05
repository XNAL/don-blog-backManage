var path = require('path');

module.exports = {
	db: {
        mysql: {
            host     : '127.0.0.1',
            user     : 'root',
            password : '123456',
            database : 'don_blog',
            connectionLimit:10
        }
	},
    root: path.normalize(__dirname + '/..'),
    appPath:"src",
	port: 9000
};
