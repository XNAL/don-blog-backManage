<template>
  <section class="category right-container">
    <back-menu></back-menu>
    <back-header></back-header>  
    <div class="cat-header">
      <ul class="cat-list">
        <li class="cat-item" v-for="cat in catList" :key="cat.id">
          <button :class="{ active: currentCat.id === cat.id }" 
                  @click="queryCat(cat)">
            {{ cat.name}} ({{ cat.count }})
          </button>
        </li>
      </ul>
      <button class="btn-add">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-add"></use>
        </svg>添加分类
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
      catList: [],
      currentCat: {
        id: 0,
        name: '全部分类',
        count: 0
      },
      postList: [],
      page: 1,
      pageSize: 10,
      total: 0
    };
  },
  created () {
    this.getCatrgories();
    this.queryCat(this.currentCat);
  },
  methods: {
    getCatrgories: async function () {
      let res = await api.getCategories();
      if (res.data.success === 1) {
        let categories = res.data.categories;
        let total = 0;
        for (let cat of Object.values(categories)) {
          total += cat.count;
        }
        categories.unshift({
          id: 0,
          name: '全部分类',
          count: total
        });
        this.total = total;
        this.catList = categories;
      }
    },
    queryCat: async function (cat) {
      this.currentCat = cat;
      this.total = cat.count;
      let res = await api.getPostsByCatId(cat.id, this.page, this.pageSize);
      if (res.data.success === 1) {
        this.postList = res.data.posts;
      }
    },
    changePage: function (newPage) {
      this.page = newPage;
      this.queryCat();
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/app';
.category {
  .cat-header {
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
  .cat-list {
    overflow: hidden;
    margin-right: 6em;

    .cat-item {
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

