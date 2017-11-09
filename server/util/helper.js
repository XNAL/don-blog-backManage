const crypto = require('crypto');

/**
   * Make salt
   *
   * @return {String}
   * @api public
   */
exports.makeSalt = () => {
  return crypto.randomBytes(16).toString('base64');
};

/**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */
exports.encryptPassword = (password, salt) => {
  if (!password || !salt) return '';
  var salt = new Buffer(salt, 'base64');
  return crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha1')
    .toString('base64');
};
