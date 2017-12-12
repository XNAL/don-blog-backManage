import async from './fetch';
import apiPost from './api-post';
import apiCategory from './api-category';
import apiTag from './api-tag';
import apiLaboratory from './api-laboratory';

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
  signOut () {
    return async(`${baseUrl}/signOut`);
  },
  ...apiPost,
  ...apiCategory,
  ...apiTag,
  ...apiLaboratory
};
