const mysql = require('mysql');
const config = require('./config');

const pool = mysql.createPool({
  host     :  config.db.mysql.host,
  user     :  config.db.mysql.user,
  password :  config.db.mysql.password,
  database :  config.db.mysql.database,
  connectionLimit: config.db.mysql.connectionLimit
})

let query = function( sql, values ) {
  return new Promise(( resolve, reject ) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        return reject(err);
      } else {
        connection.query(sql, values, (err,rows) => {
          connection.release();
          if (err) {
            return reject(err)
          } else {
            return resolve(rows);
          }
        })
      }
    })
  })
}

module.exports = query;