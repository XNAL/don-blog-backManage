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
        <div class="tag-group">
          <span class="tag" v-for="(tag, index) in tags" :key="tag.id">
            {{ tag.name }}
            <svg class="icon" aria-hidden="true"
                  @click.stop="deleteTag(tag, index)">
              <use xlink:href="#icon-delete"></use>
            </svg>
          </span>
          <input type="text" v-model.trim="newTag" placeholder="标签，可使用 逗号, 分号; 分割">
        </div>
      </div>
      <div class="form-group col-12">
        <db-markdown :content="post.content" @sync-content="syncContent"></db-markdown>
      </div>
    </form>
    <div class="btn-group">
      <button class="btn-default btn-primary" @click="publishPost">发布文章</button>
      <button class="btn-default" @click="draftPost">保存草稿</button>
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
      tags: [],
      newTag: ''
    };
  },
  watch: {
    $route: function () {
      if (this.$route.params.id) {
        this.getPostById(this.$route.params.id);
      } else {
        this.post = {
          title: '',
          content: '',
          categoryId: 0,
          status: ''
        };
        this.tags = [];
      }
    },
    newTag: async function () {
      if (this.newTag.indexOf(',') > -1 || this.newTag.indexOf(';') > -1) {
        let tagTemp = this.newTag.replace(',', '').replace(';', '');
        let res = await api.addNewTag(tagTemp);
        if (res.success === 1) {
          this.tags.push({
            id: res.newId,
            name: tagTemp
          });
          this.newTag = '';
        }
      }
    }
  },
  created () {
    this.getCategories();
    if (this.$route.params.id) {
      this.getPostById(this.$route.params.id);
    }
  },
  methods: {
    syncContent: function (content) {
      this.post.content = content;
    },
    getPostById: async function (id) {
      let res = await api.getPostById(id);
      if (res.success === 1) {
        this.post = res.post;
        this.tags = res.tags;
      }
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
    },
    publishPost: async function () {
      this.post.status = 'PUBLISHED';
      let newPost = Object.assign({}, this.post);
      newPost.tags = this.tags;
      let res = null;
      if (this.$route.params.id) {
        res = await api.updatePost(this.$route.params.id, newPost);
      } else {
        res = await api.addPost(newPost);
      }
      if (res.success === 1) {
        this.$message.showMessage({
          type: 'success',
          content: '文章发布成功'
        });
      }
    },
    draftPost: async function () {
      this.post.status = 'DRAFT';
      let newPost = Object.assign({}, this.post);
      newPost.tags = this.tags;
      let res = null;
      if (this.$route.params.id) {
        res = await api.updatePost(this.$route.params.id, newPost);
      } else {
        res = await api.addPost(newPost);
      }
      if (res.success === 1) {
        this.$message.showMessage({
          type: 'success',
          content: '文章保存草稿成功'
        });
      }
    },
    deleteTag: function (index) {
      this.tags.splice(index, 1);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/app';
.edit {
  position: relative;

  .post-form {
    margin: 0 -1em 5em;

    .tag-group {
      width: 100%;
      border: 1px solid #ccc;
      border-radius: 0.2em;
      outline: none;
      box-sizing: border-box;
      span {
        position: relative;
        float: left;
        margin: 0.5em 0 0 0.3em;
        padding: 0 1.6em 0 0.5em;
        line-height: 2em;
        background: $base-color;
        color: #fff;
        border-radius: 0.2em;
        .icon {
          position: absolute;
          top: 0.7em;
          right: 0.2em;
          width: 0.6em;
          height: 0.6em;
          color: red;
          vertical-align: -0.05em;
          margin-right: 0.2em;
        }
      }
      input {
        border: none;
        width: auto;
        min-width: 15em;
        padding: 0 0.5em;
      }
    }
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


