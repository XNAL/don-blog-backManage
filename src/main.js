// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import VueSocketio from 'vue-socket.io';
import socketio from 'socket.io-client';

import MessageBox from './components/MessageBox/index';
import Message from './components/Message/index';
Vue.use(MessageBox);
Vue.use(Message);

Vue.use(VueSocketio, socketio('http://localhost:9000', {
  path: '/testsocketiopath'
}));

Vue.config.productionTip = false;

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status === 401) {
      Vue.prototype.$msgBox.showMsgBox({
        title: '错误提示',
        content: '您的登录信息已失效，请重新登录',
        isShowCancelBtn: false
      }).then((val) => {
        router.push('/login');
      }).catch(() => {
        console.log('cancel');
      });
    } else {
      Vue.prototype.$message.showMessage({
        type: 'error',
        content: '系统出现错误'
      });
    }
    return Promise.reject(error);
  }
);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
