import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import PostList from '@/pages/PostList';
import Category from '@/pages/Category';
import Laboratory from '@/pages/Laboratory';
import Tag from '@/pages/Tag';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: [
        {
          name: '首页', link: ''
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/postlist',
      name: 'PostList',
      component: PostList,
      meta: [
        {
          name: '首页',
          link: '/'
        },
        {
          name: '文章列表',
          link: ''
        }
      ]
    },
    {
      path: '/category',
      name: 'Category',
      component: Category,
      meta: [
        {
          name: '首页',
          link: '/'
        },
        {
          name: '分类管理',
          link: ''
        }
      ]
    },
    {
      path: '/tag',
      name: 'Tag',
      component: Tag,
      meta: [
        {
          name: '首页',
          link: '/'
        },
        {
          name: '标签管理',
          link: ''
        }
      ]
    },
    {
      path: '/laboratory',
      name: 'Laboratory',
      component: Laboratory,
      meta: [
        {
          name: '首页',
          link: '/'
        },
        {
          name: '实验室',
          link: ''
        }
      ]
    }
  ]
});
