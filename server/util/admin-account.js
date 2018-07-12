const moment = require('moment');
const helper = require('./helper');
const sqlQuery = require('./mysql-async');
const config = require('../config/environment');

const account = {
  name: config.adminName,
  password: config.adminPassword
};

exports.saveAdminAccount = async function () {
  try {
    let salt = helper.makeSalt();
    let hashedPassword = helper.encryptPassword(account.password, salt);

    let selectAdmin = await sqlQuery(`SELECT * FROM user WHERE role='ADMIN'`);
    if (selectAdmin.length > 0) {
      let id = selectAdmin[0].id;
      console.log('id:', id);
      await sqlQuery(`UPDATE user SET hashedPassword = ?, salt = ? WHERE id = ?`, [hashedPassword, salt, id]);
    } else {
      let newAdmin = {
        userName: account.name,
        hashedPassword: hashedPassword,
        salt: salt,
        role: 'ADMIN',
        createTime: moment().format('YYYY-MM-DD HH:mm:ss')
      };
      await sqlQuery(`INSERT INTO user SET ?`, newAdmin);
    }
  } catch (error) {
    console.log('saveAdminAccount', error);
  }
};
