import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/pages/Login';
import PostList from '@/pages/PostList';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/postlist',
      name: 'PostList',
      component: PostList
    }
  ]
});
