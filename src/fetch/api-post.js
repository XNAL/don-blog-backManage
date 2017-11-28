import async from './fetch';
const baseUrl = '/backapi/admin';

export default {
  getPostById (id) {
    return async(`${baseUrl}/getPostById/${id}`);
  },
  addPost (params) {
    return async(`${baseUrl}/addPost`, params, 'post');
  },
  updatePost (id, params) {
    return async(`${baseUrl}/updatePost/${id}`, params, 'post');
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
  getPostsByCatId (id, page = 1, pageNum = 10) {
    return async(`${baseUrl}/getPostsByCatId/${id}`, {
      page: page,
      pageNum: pageNum
    });
  },
  getPostsByTagId (id, page = 1, pageNum = 10) {
    return async(`${baseUrl}/getPostsByTagId/${id}`, {
      page: page,
      pageNum: pageNum
    });
  }
};
