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
  },
  getPostTotal () {
    return async(`${baseUrl}/getPostTotal`);
  },
  offlinePost (id) {
    return async(`${baseUrl}/offlinePost/${id}`, {}, 'put');
  },
  publishPost (id) {
    return async(`${baseUrl}/publishPost/${id}`, {}, 'put');
  },
  getCategories () {
    return async(`${baseUrl}/getCategories`);
  },
  getPostsByCatId (id, page = 1, pageNum = 10) {
    return async(`${baseUrl}/getPostsByCatId/${id}`, {
      page: page,
      pageNum: pageNum
    });
  },
  addNewCategory (name) {
    return async(`${baseUrl}/addNewCategory/${name}`, {}, 'put');
  },
  updateCategory (id, name) {
    return async(`${baseUrl}/updateCategory/${id}?name=${name}`, {}, 'put');
  },
  deleteCategory (id) {
    return async(`${baseUrl}/deleteCategory/${id}`, {}, 'put');
  },
  getTags () {
    return async(`${baseUrl}/getTags`);
  },
  getPostsByTagId (id, page = 1, pageNum = 10) {
    return async(`${baseUrl}/getPostsByTagId/${id}`, {
      page: page,
      pageNum: pageNum
    });
  },
  addNewTag (name) {
    return async(`${baseUrl}/addNewTag/${name}`, {}, 'put');
  },
  updateTag (id, name) {
    return async(`${baseUrl}/updateTag/${id}?name=${name}`, {}, 'put');
  },
  deleteTag (id) {
    return async(`${baseUrl}/deleteTag/${id}`, {}, 'put');
  }
};
