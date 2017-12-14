const crypto = require('crypto');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const config = require('../config/environment');
const moment = require('moment');

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

function mkdirsSync (dirname) {
  if (fs.existsSync(dirname)) {
    return true;
  } else {
    if (mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname);
      return true;
    }
  }
}

exports.uploadFile = (ctx) => {
  return new Promise((resolve, reject) => {
    let form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.keepExtensions = true; // 保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024; // 文件大小2M
    form.multiples = true;
    form.uploadDir = path.join(config.root, config.appPath, config.tempUploads);
    mkdirsSync(form.uploadDir);

    form.parse(ctx.req, (err, fields, files) => {
      if (err) {
        reject(err)
      }
      let data = JSON.parse(fields.data);

      // 更新时未修改图片的情况
      if(files.uploadFile === undefined && data.poster !== '') {
        return resolve({
          fields: data,
          filePath: data.poster
        })
      }
      
      let filePath = '';
      // 如果提交文件的form中将上传文件的input名设置为uploadFile，就从uploadFile中取上传文件。否则取for in循环第一个上传的文件。
      if (files.uploadFile) {
        filePath = files.uploadFile.path;
      } else {
        for (let key in files) {
          if (files[key].path && filePath === '') {
            filePath = files[key].path;
            break;
          }
        }
      }

      //文件移动的目录文件夹，不存在时创建目标文件夹
      let dirName = moment().format('YYYYMMDD');
      let targetDir = path.join(config.root, config.appPath, config.uploads, dirName);
      mkdirsSync(targetDir);
      
      //以当前时间戳对上传文件进行重命名
      let fileExt = filePath.substring(filePath.lastIndexOf('.'));
      let fileName = new Date().getTime() + fileExt;
      let targetFile = path.join(targetDir, fileName);
      //移动文件
      fs.rename(filePath, targetFile, function (err) {
        if (err) {
          reject(err);
        } else {
            //上传成功，返回文件的相对路径
            return resolve({
              fields: data,
              filePath: path.join(path.sep, config.uploads, dirName, fileName)
            })
        }
      });
    });
    ctx.session.fileUploadProgress = 0
    // 文件上传中事件
    form.on('progress', (bytesReceived, bytesExpected) => {
      // 百分比
      let percent = Math.round(bytesReceived / bytesExpected * 100)
      console.log('precent', percent)
      ctx.session.fileUploadProgress = percent
    })
    form.on('end', () => {
      ctx.session.fileUploadProgress = 100
    })
  });
};

