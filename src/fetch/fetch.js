import axios from 'axios';
import qs from 'qs';

// 需要使用代理来解决跨域问题
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';
axios.defaults.timeout = 20000;

// Add a request interceptor
axios.interceptors.request.use(
  config => {
    if (config.method === 'post') {
      config.data = qs.stringify(config.data);
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  response => {
    if (!response.status === 200) {
      return Promise.reject(response);
    }
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

export default async (url = '', params = {}, method = 'get') => {
  method = method.toLowerCase();
  if (method === 'get') {
    let paramArr = [];
    for (let [key, value] of Object.entries(params)) {
      paramArr.push(key + '=' + value);
    }
    if (paramArr.length > 0) {
      url += '?' + paramArr.join('&').replace(/#/g, '%23');
    }
    return new Promise((resolve, reject) => {
      axios
        .get(url)
        .then(
          response => {
            resolve(response);
          },
          err => {
            reject(err);
          }
        )
        .catch(error => {
          reject(error);
        });
    });
  } else if (method === 'post') {
    return new Promise((resolve, reject) => {
      axios
        .post(url, params)
        .then(
          response => {
            resolve(response);
          },
          err => {
            reject(err);
          }
        )
        .catch(error => {
          reject(error);
        });
    });
  } else {
    let error = '传递的参数错误';
    return Promise.reject(error);
  }
};
