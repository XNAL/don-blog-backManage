import async from './fetch';
const baseUrl = '/backapi/admin';

export default {
  getTags () {
    return async(`${baseUrl}/getTags`);
  },
  addNewTagWhenPost (name) {
    return async(`${baseUrl}/addNewTagWhenPost/${name}`, {}, 'put');
  },
  addNewTag (name) {
    return async(`${baseUrl}/addNewTag/${name}`, {}, 'put');
  },
  updateTag (id, name) {
    return async(`${baseUrl}/updateTag/${id}?name=${name}`, {}, 'put');
  },
  deleteTag (id) {
    return async(`${baseUrl}/deleteTag/${id}`, {}, 'delete');
  },
  searchTagByName (name) {
    return async(`${baseUrl}/searchTagByName/${name}`);
  }
};
