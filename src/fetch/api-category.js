import async from './fetch';
const baseUrl = '/backapi/admin';

export default {
  getCategories () {
    return async(`${baseUrl}/getCategories`);
  },
  addNewCategory (name) {
    return async(`${baseUrl}/addNewCategory/${name}`, {}, 'put');
  },
  updateCategory (id, name) {
    return async(`${baseUrl}/updateCategory/${id}?name=${name}`, {}, 'put');
  },
  deleteCategory (id) {
    return async(`${baseUrl}/deleteCategory/${id}`, {}, 'put');
  }
};
