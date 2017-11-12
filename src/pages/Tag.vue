<template>
  <section class="tag right-container">
    <back-menu></back-menu>
    <back-header></back-header>  
    <div class="tag-header">
      <ul class="tag-list">
        <li class="tag-item" v-for="tag in tagList" :key="tag.id">
          <button :class="{ active: currentTag.id === tag.id }" 
                  @click="queryTag(tag)">
            {{ tag.name}} ({{ tag.count }})
          </button>
        </li>
      </ul>
      <button class="btn-add">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-add"></use>
        </svg>添加标签
      </button>
    </div>
    <post-table :post-list="postList"></post-table>
    <pagination :page-size="pageSize" 
                :total="total" 
                :current-page="page" 
                @change-page="changePage">
    </pagination>
  </section>
</template>

<script>
import api from '../fetch/api';
import Menu from '../components/Menu';
import Header from '../components/Header';
import PostTable from '../components/PostTable';
import Pagination from '../components/Pagination';

export default {
  components: {
    'back-menu': Menu,
    'back-header': Header,
    PostTable,
    Pagination
  },
  data () {
    return {
      tagList: [],
      currentTag: {
        id: 0,
        name: '全部标签',
        count: 0
      },
      postList: [],
      page: 1,
      pageSize: 10,
      total: 0
    };
  },
  created () {
    this.getTags();
    this.queryTag(this.currentTag);
  },
  methods: {
    getTags: async function () {
      let res = await api.getTags();
      if (res.data.success === 1) {
        let tags = res.data.tags;
        let total = res.data.total;
        tags.unshift({
          id: 0,
          name: '全部标签',
          count: total
        });
        this.total = total;
        this.tagList = tags;
      }
    },
    queryTag: async function (tag) {
      this.currentTag = tag;
      this.total = tag.count;
      let res = await api.getPostsByTagId(tag.id, this.page, this.pageSize);
      if (res.data.success === 1) {
        this.postList = res.data.posts;
      }
    },
    changePage: function (newPage) {
      this.page = newPage;
      this.queryTag(this.currentTag);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/app';
.tag {
  .tag-header {
    position: relative;
    .btn-add {
      position: absolute;
      top: 0;
      right: 0;
      padding: 0.4em 0.6em;
      // background: $base-color;
      font-size: 1em;
      // color: #fff;
      color: $base-color;
      background: #fff;
      text-align: center;
      border: 1px solid $base-color;
      border-radius: 0.2em;
      box-sizing: border-box;
      cursor: pointer;

      .icon {
        width: 0.9em;
        height: 0.9em;
        vertical-align: -0.05em;
        margin-right: 0.4em;
      }
    }
  }
  .tag-list {
    overflow: hidden;
    margin-right: 6em;

    .tag-item {
      float: left;

      button {
        margin: 0 0.4em 1em;
        padding: 0.4em;
        background: #fff;
        font-size: 1em;
        color: #666;
        text-align: center;
        border: 1px solid #d1dbe5;
        border-radius: 0.2em;
        box-sizing: border-box;
        cursor: pointer;
        &.active {
          color: #fff;
          background: $base-color;
          border-color: $base-color;
        }
        &:hover {
          color: #fff;
          background: $base-color;
          border-color: $base-color;
        }
      }
    }
  }
}
</style>

