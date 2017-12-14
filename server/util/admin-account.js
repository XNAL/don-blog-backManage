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
    let deleteAdmin = await sqlQuery(`DELETE FROM user WHERE role='ADMIN'`);
    let salt = helper.makeSalt();
    let hashedPassword = helper.encryptPassword(account.password, salt);
    let newAdmin = {
      userName: account.name,
      hashedPassword: hashedPassword,
      salt: salt,
      role: 'ADMIN',
      createTime: moment().format('YYYY-MM-DD HH:mm:ss')
    };
    let insertAdmin = await sqlQuery(`INSERT INTO user SET ?`, newAdmin);
  } catch (error) {
    console.log('saveAdminAccount', error);
  }
};
