import msgVue from './index.vue';

// 定义插件对象
const Message = {};
// vue的install方法，用于定义vue插件
Message.install = function (Vue, options) {
  const MessageInstance = Vue.extend(msgVue);
  let currentMsg;
  const initInstance = () => {
    // 实例化vue实例
    currentMsg = new MessageInstance();
    let msgEl = currentMsg.$mount().$el;
    document.body.appendChild(msgEl);
  };
  // 在Vue的原型上添加实例方法，以全局调用
  Vue.prototype.$message = {
    showMessage (options) {
      if (!currentMsg) {
        initInstance();
      } else {
        return;
      }
      if (typeof options === 'string') {
        currentMsg.content = options;
      } else if (typeof options === 'object') {
        Object.assign(currentMsg, options);
      }
      return currentMsg.showMessage()
        .then(val => {
          currentMsg = null;
          return Promise.resolve(val);
        })
        .catch(err => {
          currentMsg = null;
          return Promise.reject(err);
        });
    }
  };
};
export default Message;
