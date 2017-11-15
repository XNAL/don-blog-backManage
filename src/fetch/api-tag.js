import async from './fetch';
const baseUrl = '/backapi/admin';

export default {
  getTags () {
    return async(`${baseUrl}/getTags`);
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
