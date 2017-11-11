<template>
  <section class="post-table">
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
                <button class="btn-offline" @click="offlinePost(post.id, index)" 
                        v-if="post.status === 'PUBLISHED'">下线</button>
                <button class="btn-publish" @click="publishPost(post.id, index)" v-else>发布</button>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
  </section>
</template>

<script>
import moment from 'moment';
import api from '../fetch/api';

export default {
  props: {
    postList: Array
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
  methods: {
    editPost: function (postId) {
      console.log('edit', postId);
    },
    offlinePost: async function (postId, index) {
      let res = await api.offlinePost(postId);
      if (res.data.success === 1) {
        this.postList[index].status = 'OFFLINE';
      }
    },
    publishPost: async function (postId, index) {
      let res = await api.publishPost(postId);
      if (res.data.success === 1) {
        this.postList[index].status = 'PUBLISHED';
      }
    }
  }
};
</script>


<style lang="scss" scoped>
@import "../assets/sass/app";
.post-table {
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
        cursor: pointer;

        &.btn-offline {
          margin-left: 1em;
          background-color: #fa5555;
          color: #fff;
          border-color: #fa5555;
        }
        &.btn-publish {
          margin-left: 1em;
          background-color: $base-color;
          color: #fff;
          border-color: $base-color;
        }
      }
    }
  }
}
</style>

