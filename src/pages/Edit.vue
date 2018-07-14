<template>
  <section class="edit right-container">
    <back-menu></back-menu>
    <back-header></back-header>    
    <form class="post-form">
      <div class="form-group col-12">
        <input type="text" class="title" v-model="post.title" placeholder="文章标题">
      </div>
      <div class="form-group col-12 no-overflow">
        <db-select class="category" 
                  :selected="post.categoryId"
                  :options="categories"
                  @selected-value="changeSelectedCategory"></db-select>
        <button class="btn-default add-category" @click="addCategory">添加分类</button>
      </div>
      <div class="form-group col-12 no-overflow">
        <div class="tag-group">
          <div class="tag-list" ref="tagList">
            <span class="tag" v-for="(tag, index) in tags" :key="tag.id">
              {{ tag.name }}
              <svg class="icon" aria-hidden="true"
                    @click.stop="deleteTag(tag, index)">
                <use xlink:href="#icon-delete"></use>
              </svg>
            </span>
          </div>
          <input type="text" v-model.trim="newTag" ref="inputTag" placeholder="标签，可使用 逗号, 分号; 分割">
          <ul class="search-tag-list" ref="searchTagList" v-show="searchTags.length > 0">
            <li class="search-tag" 
                v-for="tag in searchTags" 
                :key="tag.id" 
                @click="selectTag(tag)"
                v-html='filterTag(tag.name)'>
            </li>
          </ul>
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
import DBSelect from '../components/DB-Select';

export default {
  components: {
    'back-menu': Menu,
    'back-header': Header,
    'db-markdown': DBMarkdown,
    'db-select': DBSelect
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
      newTag: '',
      searchTags: [],
      isFirtUpdatePostChange: false,  // 编辑时第一次获取到post对象时不使用websocket保存
      isFirtUpdateTagsChange: false,  // 编辑时第一次获取到tags对象时不使用websocket保存
      isLoading: false
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
      if (this.newTag.indexOf(',') > -1 || this.newTag.indexOf('，') > -1 ||
          this.newTag.indexOf(';') > -1 || this.newTag.indexOf('；') > -1) {
        let tagTemp = this.newTag.replace(',', '').replace('，', '')
                                 .replace(';', '').replace('；', '');
        // 先判断当前标签是否已存在，已存在则不添加
        let isNew = true;
        for (let tag of Object.values(this.tags)) {
          if (tag.name === tagTemp) {
            isNew = false;
            this.newTag = '';
          }
        }
        if (isNew) {
          if (this.tags.length >= 5) {
            this.$message.showMessage({
              type: 'warning',
              content: '最多添加5个标签'
            });
          } else {
            let res = await api.addNewTagWhenPost(tagTemp);
            if (res.success === 1) {
              this.tags.push({
                id: res.newId,
                name: tagTemp
              });
              this.newTag = '';
            }
          }
        }
      } else if (this.newTag) {
        this.$refs.searchTagList.style.left = (this.$refs.tagList.offsetWidth + 7) + 'px';
        let res = await api.searchTagByName(this.newTag);
        if (res.success === 1) {
          this.searchTags = res.tags;
        }
      } else {
        this.searchTags = [];
      }
    },
    post: {
      handler: function (val, oldVal) {
        if (this.isFirtUpdatePostChange) {
          this.isFirtUpdatePostChange = false;
        } else {
          let newPost = this.createSavePost();
          this.$socket.emit('saveDraftPost', newPost);
        }
      },
      deep: true
    },
    tags: function (val, oldVal) {
      if (this.isFirtUpdateTagsChange) {
        this.isFirtUpdateTagsChange = false;
      } else {
        let newPost = this.createSavePost();
        this.$socket.emit('saveDraftPost', newPost);
      }
    }
  },
  sockets: {
    connect: function () {
      console.log('socket connected');
    },
    getDraftPost: function (val) {
      if (val) {
        // let serverPost = JSON.parse(val);
        Object.assign(this.post, val);
        this.tags = val.tags || [];
      }
    }
  },
  created () {
    this.getCategories();
    if (this.$route.params.id) {
      this.getPostById(this.$route.params.id);
    } else {
      this.getDraftPost();
    }
  },
  methods: {
    filterTag: function (tag) {
      return tag.replace(this.newTag, `<strong>${this.newTag}</strong>`);
    },
    syncContent: function (content) {
      this.post.content = content;
    },
    changeSelectedCategory: function (catId) {
      this.post.categoryId = catId;
      console.log(this.post);
    },
    getPostById: async function (id) {
      let res = await api.getPostById(id);
      if (res.success === 1) {
        this.isFirtUpdatePostChange = true;
        this.isFirtUpdateTagsChange = true;
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
      if (this.isLoading) {
        return;
      }
      this.isLoading = true;
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
        this.$socket.emit('clearDraftPost');
        this.$message.showMessage({
          type: 'success',
          content: '文章发布成功'
        });
        this.$router.push({ path: '/postlist' });
      }
      this.isLoading = false;
    },
    draftPost: async function () {
      if (this.isLoading) {
        return;
      }
      this.isLoading = true;
      this.post.status = 'DRAFT';
      let newPost = this.createSavePost();
      let res = null;
      if (this.$route.params.id) {
        res = await api.updatePost(this.$route.params.id, newPost);
      } else {
        res = await api.addPost(newPost);
      }
      if (res.success === 1) {
        this.$socket.emit('clearDraftPost');
        this.$message.showMessage({
          type: 'success',
          content: '文章保存草稿成功'
        });
        this.$router.push({ path: '/postlist' });
      }
      this.isLoading = false;
    },
    deleteTag: function (index) {
      this.tags.splice(index, 1);
    },
    selectTag: function (tag) {
      // 先判断当前标签是否已存在，已存在则不添加
      let isNew = true;
      for (let tagTemp of Object.values(this.tags)) {
        if (tagTemp.name === tag.name) {
          isNew = false;
        }
      }
      if (isNew) {
        if (this.tags.length >= 5) {
          this.$message.showMessage({
            type: 'warning',
            content: '最多添加5个标签'
          });
        } else {
          this.tags.push(tag);
        }
      }
      this.newTag = '';
      this.searchTags = [];
    },
    addCategory: function () {
      this.$msgBox.showMsgBox({
        title: '添加分类',
        content: '请填写分类名称',
        isShowInput: true
      }).then(async (val) => {
        let res = await api.addNewCategory(val);
        if (res.success === 1) {
          this.categories.push({
            id: res.newId,
            name: val
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
    getDraftPost: function () {
      this.$socket.emit('getDraftPost');
    },
    createSavePost: function () {
      let savePost = {
        id: this.post.id || 0,
        title: this.post.title,
        content: this.post.content,
        categoryId: this.post.categoryId,
        status: this.post.status,
        poster: this.post.poster,
        tags: this.tags
      };
      return savePost;
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

    .no-overflow {
      overflow: visible;
    }
    .tag-list {
      float: left;
    }
    .tag-group {
      position: relative;
      width: 100%;
      border: 1px solid #ccc;
      border-radius: 0.2em;
      outline: none;
      box-sizing: border-box;
      span {
        position: relative;
        float: left;
        margin: 0.5em 0 0 1em;
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
        min-width: 20em;
      }
      .search-tag-list {
        position: absolute;
        top: 100%;
        left: 1em;
        margin-top: 0.15em;
        padding-left: 1em;
        color: #555;
        line-height: 2;
        min-width: 15em;
        z-index: 999;
        background: #eff2f7;
        box-shadow: 0 0.4em 0.8em 0 rgba(0,0,0,0.18);
      }
    }
    .category {
      width: calc(100% - 9em);
    }
    .add-category {
      position: absolute;
      top: 0.15em;
      right: 0.7em;
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


