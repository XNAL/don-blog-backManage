<template>
  <section class="edit right-container">
    <back-menu></back-menu>
    <back-header></back-header>    
    <form class="post-form">
      <div class="form-group col-12">
        <input type="text" class="title" v-model="post.title" placeholder="文章标题">
      </div>
      <div class="form-group col-12">
        <select class="category" v-model="post.categoryId" placeholder="文章分类">
          <option v-for="category in categories" :value="category.id" :key="category.id">
            {{ category.name }}
          </option>
        </select>
      </div>
      <div class="form-group col-12">
        <input type="text" class="tag" v-model="tags" placeholder="文章标签">
      </div>
      <div class="form-group col-12">
        <db-markdown :content.sync="post.content" @sync-content="syncContent"></db-markdown>
      </div>
    </form>
    <div class="btn-group">
      <button class="btn-default btn-primary">发布文章</button>
      <button class="btn-default">保存草稿</button>
    </div>
  </section>
</template>

<script>
import api from '../fetch/api';
import Menu from '../components/Menu';
import Header from '../components/Header';
import DBMarkdown from '../components/DB-Markdown';

export default {
  components: {
    'back-menu': Menu,
    'back-header': Header,
    'db-markdown': DBMarkdown
  },
  data () {
    return {
      post: {
        title: '',
        content: '',
        categoryId: 0,
        status: ''
      },
      categories: [{
        id: 0,
        name: '请选择文章分类'
      }],
      tags: []
    };
  },
  created () {
    this.getCategories();
  },
  methods: {
    syncContent: function (content) {
      this.post.content = content;
    },
    getCategories: async function () {
      let res = await api.getCategories();
      if (res.success === 1) {
        let categories = res.categories;
        categories.unshift({
          id: 0,
          name: '请选择文章分类'
        });
        this.categories = categories;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.edit {
  position: relative;

  .post-form {
    margin: 0 -1em 5em;
  }

  .btn-group {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    z-index: 999;
    padding: 1em 0;
    button {
      float: right;
      margin-right: 1em;
    }
  }
}
</style>


