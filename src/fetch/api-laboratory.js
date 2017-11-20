import async from './fetch';
const baseUrl = '/backapi/admin';

export default {
  createNewLaboratory (params) {
    return async(`${baseUrl}/createNewLaboratory`, params, 'post', true);
  }
};
