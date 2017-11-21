import async from './fetch';
const baseUrl = '/backapi/admin';

export default {
  getLaboratories () {
    return async(`${baseUrl}/getLaboratories`);
  },
  createNewLaboratory (params) {
    return async(`${baseUrl}/createNewLaboratory`, params, 'post', true);
  }
};
