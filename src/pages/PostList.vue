<template>
  <section class="post-list right-container">
    <back-menu></back-menu>
    <back-header></back-header>    
    <div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>标题</th>
            <th>分类</th>
            <th>创建时间</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(post, index) in postList">
            <tr :key="post.id">
              <td>{{ index + 1 }}</td>
              <td>{{ post.title }}</td>
              <td>{{ post.categoryName }}</td>
              <td>{{ post.createTime | formatTime }}</td>
              <td>{{ post.status | setStatus }}</td>
              <td>
                <button class="btn-edit" @click="editPost(post.id)">编辑</button>
                <button class="btn-offline" @click="offlinePost(post.id)">下线</button>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
import moment from 'moment';
import api from '../fetch/api';
import Menu from '../components/Menu';
import Header from '../components/Header';

export default {
  components: {
    'back-menu': Menu,
    'back-header': Header
  },
  data () {
    return {
      postList: []
    };
  },
  filters: {
    formatTime: function (createTime) {
      return moment(createTime).format('YYYY-MM-DD HH:mm:ss');
    },
    setStatus: function (status) {
      let showStatus = '';
      switch (status) {
        case 'PUBLISHED':
          showStatus = '已发布';
          break;
        case 'DRAFT':
          showStatus = '草稿';
          break;
        case 'OFFLINE':
          showStatus = '已下线';
          break;
        default:
          break;
      }
      return showStatus;
    }
  },
  created () {
    this.getPostList();
  },
  methods: {
    getPostList: async function () {
      let res = await api.getPostList();
      if (res.data.success === 1) {
        this.postList = res.data.posts;
      }
    },
    editPost: function (postId) {
      console.log('edit', postId);
    },
    offlinePost: function (postId) {
      console.log('offline', postId);
    }
  }
};
</script>

<style lang="scss" scoped>
table {
  width: 100%;
  thead {
    background: #eef1f6;
  }
  tr {
    line-height: 3;
    &:hover {
      background: #eef1f6;
    }
    th,
    td {
      text-align: left;
      padding-left: 1em;
      border: 1px solid #dfe6ec;
    }

    button {
      padding: 0.3em 1em;
      background-color: #fff;
      border: 1px solid #d8dce5;
      border-radius: 0.2em;
      outline: none;
      cursor: pointer;

      &.btn-offline {
        margin-left: 1em;
        background-color: #fa5555;
        color: #fff;
        border-color: #fa5555;
      }
    }
  }
}
</style>

