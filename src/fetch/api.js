import async from './fetch';
import apiPost from './api-post';
import apiCategory from './api-category';
import apiTag from './api-tag';

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
  ...apiPost,
  ...apiCategory,
  ...apiTag
};
