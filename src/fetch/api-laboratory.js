import async from './fetch';
const baseUrl = '/backapi/admin';

export default {
  getLaboratories () {
    return async(`${baseUrl}/getLaboratories`);
  },
  createNewLaboratory (params) {
    return async(`${baseUrl}/createNewLaboratory`, params, 'post', true);
  },
  updateLaboratory (params) {
    return async(`${baseUrl}/updateLaboratory`, params, 'post', true);
  },
  deleteLaboratory (id) {
    return async(`${baseUrl}/deleteLaboratory/${id}`, {}, 'delete');
  }
};
