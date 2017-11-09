<template>
  <section class="login">
    <div class="login-section">
      <h2>Don's Blog 后台管理系统</h2>
      <div class="login-form">
        <div class="form-group">
          <input type="text" class="username" v-model="userName" placeholder="用户名">
        </div>
        <div class="form-group">
          <input type="password" class="passowrd" v-model="password" placeholder="密码">
        </div>
        <div class="form-group">
          <button class="btnLogin" ref="login" @click="login">登陆</button>
        </div>
        <p class="error">{{ errMsg }}</p>
      </div>
    </div>
  </section>
</template>

<script>
import api from '../fetch/api';

export default {
  data () {
    return {
      userName: '',
      password: '',
      errMsg: ''
    };
  },
  methods: {
    login: async function () {
      if (this.userName === '') {
        this.errMsg = '用户名不能为空';
        return false;
      }
      if (this.password === '') {
        this.errMsg = '密码不能为空';
        return false;
      }

      let res = await api.login(this.userName, this.password);
      if (res.data.success === 0) {
        this.errMsg = res.data.message;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/app';
.login {
  position: relative;
  min-height: 100%;
  background-color: #324057;
  .login-section {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%);
  }
  h2 {
    font-size: 2.5em;
    color: #fff;
    text-align: center;
    margin-bottom: 1.5em;
  }
  .login-form {
    padding: 2em;
    background-color: #fff;
    border-radius: 0.2em;
  }
  .form-group {
    margin-bottom: 1.5em;
    input, button {
      width: 100%;
      font-size: 1em;
      margin: 0;
      padding: 0.8em 1em;
      border: 1px solid #ddd;
      border-radius: 4em;
      outline: none;
      box-sizing: border-box;

      &:focus {
        border-color: $base-color;
      }
    }
    .btnLogin {
      color: #fff;
      cursor: pointer;
      border-color: $base-color;
      background-color: $base-color;
    }
  }
  .error {
    position: absolute;
    left: 50%;
    bottom: 1em;
    transform: translateX(-50%);
    font-size: 1em;
    color: red;
    text-align: center;
  }
}
</style>


