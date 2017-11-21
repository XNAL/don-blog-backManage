<template>
  <section class="category right-container">
    <back-menu></back-menu>
    <back-header></back-header>  
    <div class="cat-header">
      <ul class="cat-list">
        <li class="cat-item" v-for="(cat, index) in catList" :key="cat.id">
          <button :class="currentCat.id === cat.id ? 'btn-primary' : 'btn-default'" 
                  @click="queryCat(cat)" @dblclick="editCategory(cat, index)">
            {{ cat.name}} ({{ cat.count }})
            <svg class="icon" aria-hidden="true" v-if="cat.id !== 0" 
                  @click.stop="deleteCategory(cat, index)">
              <use xlink:href="#icon-delete"></use>
            </svg>
          </button>
        </li>
      </ul>
      <button class="btn-default btn-add" @click="addCategory">
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
    this.getCategories();
    this.queryCat(this.currentCat);
  },
  methods: {
    getCategories: async function () {
      let res = await api.getCategories();
      if (res.success === 1) {
        let categories = res.categories;
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
      if (res.success === 1) {
        this.postList = res.posts;
      }
    },
    changePage: function (newPage) {
      this.page = newPage;
      this.queryCat(this.currentCat);
    },
    addCategory: function () {
      this.$msgBox.showMsgBox({
        title: '添加分类',
        content: '请填写分类名称',
        isShowInput: true
      }).then(async (val) => {
        let res = await api.addNewCategory(val);
        if (res.success === 1) {
          this.catList.push({
            id: res.newId,
            name: val,
            count: 0
          });
          this.$message.showMessage({
            type: 'success',
            content: '添加分类成功'
          });
        } else {
          this.$message.showMessage({
            type: 'error',
            content: res.message
          });
        }
      }).catch(() => {
        console.log('cancel');
      });
    },
    editCategory: function (cat, index) {
      this.$msgBox.showMsgBox({
        title: '编辑分类',
        content: '请填写分类名称',
        isShowInput: true,
        inputValue: cat.name
      }).then(async (val) => {
        let res = await api.updateCategory(cat.id, val);
        if (res.success === 1) {
          this.catList[index].name = val;
          this.$message.showMessage({
            type: 'success',
            content: '修改分类成功'
          });
          this.queryCat(this.catList[index]);
        } else {
          this.$message.showMessage({
            type: 'error',
            content: res.message
          });
        }
      }).catch(() => {
        console.log('cancel');
      });
    },
    deleteCategory: function (cat, index) {
      if (cat.count > 0) {
        this.$msgBox.showMsgBox({
          title: '删除提示',
          content: '当前分类下存在文章，不允许删除该分类！'
        }).then(() => {
          return false;
        }).catch(() => {
          return false;
        });
      } else {
        this.$msgBox.showMsgBox({
          title: '确认删除',
          content: '确认是否删除该分类？'
        }).then(async () => {
          let res = await api.deleteCategory(cat.id);
          if (res.success === 1) {
            this.catList.splice(index, 1);
            this.$message.showMessage({
              type: 'success',
              content: '删除分类成功'
            });
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
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/app';
.category {
  .cat-header {
    position: relative;
    min-height: 3em;
    .btn-add {
      position: absolute;
      top: 0;
      right: 0;
      color: $base-color;
      border-color: $base-color;

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
        position: relative;
        margin: 0 1em 1em 0;
        padding-right: 2em;
        .icon {
          position: absolute;
          top: 1em;
          right: 0.2em;
          width: 0.6em;
          height: 0.6em;
          color: red;
          vertical-align: -0.05em;
          margin-right: 0.4em;
        }
      }
    }
  }
}
</style>

