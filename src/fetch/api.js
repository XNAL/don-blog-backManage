import async from './fetch';

const baseUrl = '/backapi/admin';

export default {
  login (userName, password) {
    return async(
      `${baseUrl}/login`, {
        userName: userName,
        password: password
      },
      'post'
    );
  },
  getPostList (page = 1, pageNum = 10) {
    return async(`${baseUrl}/getPostList`, {
      page: page,
      pageNum: pageNum
    });
  }
};
