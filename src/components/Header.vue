<template>
  <section class="header">
    <template v-for="(item, index) in $route.meta.paths"> 
      <router-link class="breadcrumb no-underline" :to="item.link" :key="index" v-if="item.link !== ''">
        {{ item.name }}
      </router-link>
      <span class="no-link" :key="index" v-else>{{ item.name }}</span>
      <span class="separator" :key="index" v-show="index !== $route.meta.paths.length - 1">/</span>
    </template> 
    <span class="sign-out" title="退出登录" @click="signOut">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-signout"></use>
      </svg>
    </span>
  </section>
</template>

<script>
import api from '../fetch/api';

export default {
  methods: {
    signOut: function () {
      this.$msgBox.showMsgBox({
        title: '退出登录',
        content: '确认退出系统？'
      }).then(async () => {
        let res = await api.signOut();
        if (res.success === 1) {
          localStorage.removeItem('DON_BLOG_TOKEN');
          this.$router.push({ path: '/login' });
        } else {
          this.$message.showMessage({
            type: 'error',
            content: res.message
          });
        }
      }).catch(() => {
        return false;
      });
    }
  }
};
</script>


<style lang="scss" scoped>
.header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4em;
  line-height: 4em;
  padding-left: 1em;
  background: #eff2f7;

  .no-link {
    color: #97a8be;
    cursor: text;
  }
  .separator {
    margin: 0 0.5em 0 0.3em;
  }  
  .sign-out {
    position: absolute;
    top: 0;
    right: 2em;
    cursor: pointer;

    .icon {
      margin-top: 1em;
      width: 2em;
      height: 2em;
      color: #fa5555;
    }
  }
}
</style>

