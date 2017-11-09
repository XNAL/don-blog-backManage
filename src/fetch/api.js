import async from './fetch';

const baseUrl = '/backapi/admin';

export default {
  login (userName, password) {
    return async(
      `${baseUrl}/login`,
      {
        userName: userName,
        password: password
      },
      'post'
    );
  }
};
