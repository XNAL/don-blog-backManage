<template>
  <section class="laboratory right-container">
    <back-menu></back-menu>
    <back-header></back-header>
    <div class="laboratory-header">
      <h2>实验室项目列表</h2>
      <button class="btn-default btn-add" @click="addProject">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-add"></use>
        </svg>添加项目
      </button>
    </div>
    <db-dialog :title="dialogTitle" :visible="isShowDialog" @hide-dialog="hideDialog">
      <form class="dialog-form">
        <div class="form-group mb0">
          <div class="col-6 fl">
            <div class="form-label">
              <label for="laboratory.poster">项目图片</label>
            </div>
            <div class="file-img">
              <!-- <input type="file" id="poster">
              <img src="" alt="">
              <label for="poster" class="btn-default btnUpload">上传图片</label> -->
              <db-upload :src="laboratory.poster" @upload-file="getImgFile"></db-upload>
            </div>
          </div>

          <div class="col-6 fl">
            <div class="form-group">
              <div class="form-label">
                <label for="name">项目名称</label>
              </div>
              <input type="text" id="name" v-model="laboratory.name">
            </div>
            <div class="form-group">
              <div class="form-label">
                <label for="link">在线地址</label>
              </div>
              <input type="text" id="link" v-model="laboratory.link">
            </div>
          </div>
        </div>
        <div class="form-group col-12">
          <div class="form-label">
            <label for="description">项目介绍</label>
          </div>
          <textarea name="description" id="description" v-model="laboratory.description"></textarea>
        </div>
      </form>
      <div slot="footer" class="dialog-footer">
        <button class="btn-default" @click="isShowDialog = false">取 消</button>
        <button class="btn-primary" @click="confrimLaboratory">确 定</button>
      </div>
    </db-dialog>
  </section>
</template>

<script>
import api from '../fetch/api';
import Menu from '../components/Menu';
import Header from '../components/Header';
import DBDialog from '../components/DB-Dialog';
import Upload from '../components/Upload';

export default {
  components: {
    'back-menu': Menu,
    'back-header': Header,
    'db-dialog': DBDialog,
    'db-upload': Upload
  },
  data () {
    return {
      isShowDialog: false,
      dialogTitle: '',
      imgFile: null,
      laboratory: {
        id: 0,
        name: '',
        link: '',
        poster: '',
        description: ''
      }
    };
  },
  methods: {
    hideDialog: function () {
      this.isShowDialog = false;
    },
    addProject: function () {
      this.dialogTitle = '添加项目';
      this.isShowDialog = true;
    },
    getImgFile (file) {
      this.imgFile = file;
      console.log('file', file);
    },
    confrimLaboratory: async function () {
      this.isShowDialog = false;
      let formData = new FormData();
      formData.append('uploadFile', this.imgFile);
      formData.append('data', JSON.stringify(this.laboratory));
      let res = await api.createNewLaboratory(formData);
      console.log('res', res);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/app';
.laboratory {
  .laboratory-header {
    position: relative;
    line-height: 2.8em;
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
  .dialog-footer {
    float: right;
    margin-top: 0.5em;
    .btn-primary {
      margin-left: 1em;
    }
  }
  .dialog-form {
    .file-img {
      position: relative;
      border: 1px solid #ccc;
      height: 9.2em;
      box-sizing: border-box;
    }
  }
}
</style>


