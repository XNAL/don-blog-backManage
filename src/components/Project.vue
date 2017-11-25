<template>
  <section class="project">
    <div :class="['part-one', `${position === 'right' ? 'right' : 'left'}`]">
      <img :src="project.poster" alt="项目图片">
      <div class="operate">
        <span class="operate-update">
          <svg class="icon" aria-hidden="true" @click="updateProject">
            <use xlink:href="#icon-edit"></use>
          </svg>
        </span>
        <span class="operate-delete">
          <svg class="icon" aria-hidden="true" @click="deleteProject">
            <use xlink:href="#icon-rubbish"></use>
          </svg>
        </span>
      </div>
    </div>
    <div :class="['part-two', `${(position === 'right' ? 'right' : 'left') === 'left' ? 'right' : 'left'}`]">
      <h3 class="name">{{ project.name }}</h3>
      <p class="description">{{ project.description }}</p>
      <p class="link-address" v-if="project.link !== ''">
        <a :href="project.link" class="btn-default link no-underline" target="_blank">
          <svg class="icon" aria-hidden="true" @click="deleteProject">
            <use xlink:href="#icon-web"></use>
          </svg>在线效果
        </a>
      </p>
      <p class="link-address" v-if="project.github">
        <a :href="project.github" class="btn-default github no-underline" target="_blank">
          <svg class="icon" aria-hidden="true" @click="deleteProject">
            <use xlink:href="#icon-github1"></use>
          </svg>GitHub查看
        </a>
      </p>
    </div>
    <db-dialog :title="dialogTitle" :visible="isShowDialog" @hide-dialog="hideDialog">
      <form class="dialog-form">
        <div class="form-group mb0">
          <div class="col-6 fl">
            <div class="form-label">
              <label for="laboratory.poster">项目图片</label>
            </div>
            <div class="file-img">
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
            <label for="github">GitHub地址</label>
          </div>
          <input type="text" id="github" v-model="laboratory.github">
        </div>
        <div class="form-group col-12">
          <div class="form-label">
            <label for="description">项目介绍</label>
          </div>
          <textarea name="description" id="description" v-model="laboratory.description"></textarea>
        </div>
      </form>
      <div slot="footer" class="dialog-footer">
        <button class="btn-default" @click="cancel">取 消</button>
        <button class="btn-primary" @click="confrimLaboratory">确 定</button>
      </div>
    </db-dialog>
  </section>
</template>

<script>
import api from '../fetch/api';
import Upload from './Upload';
import DBDialog from '../components/DB-Dialog';
export default {
  components: {
    'db-dialog': DBDialog,
    'db-upload': Upload
  },
  props: {
    project: {
      type: Object,
      default: {}
    },
    position: String
  },
  data () {
    return {
      isShowDialog: false,
      imgFile: null,
      laboratory: {},
      dialogTitle: '编辑项目'
    };
  },
  created () {
    this.laboratory = Object.assign({}, this.project);
  },
  methods: {
    updateProject: function () {
      this.isShowDialog = true;
    },
    deleteProject: function () {
      this.$msgBox.showMsgBox({
        title: '确认删除',
        content: '确实是否删除该项目？'
      }).then(async () => {
        let res = await api.deleteLaboratory(this.project.id);
        if (res.success === 1) {
          this.$message.showMessage({
            type: 'success',
            content: '删除项目成功'
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
    },
    hideDialog: function () {
      this.isShowDialog = false;
    },
    getImgFile (file, imgSrc) {
      this.imgFile = file;
      this.laboratory.poster = imgSrc;
    },
    confrimLaboratory: async function () {
      this.isShowDialog = false;
      let formData = new FormData();
      formData.append('uploadFile', this.imgFile);
      formData.append('data', JSON.stringify(this.laboratory));
      let res = await api.updateLaboratory(formData);
      if (res.success === 1) {
        this.$message.showMessage({
          type: 'success',
          content: '修改项目成功'
        });
      } else {
        this.$message.showMessage({
          type: 'error',
          content: res.message
        });
      }
    },
    cancel: function () {
      this.laboratory = Object.assign({}, this.project);
      this.isShowDialog = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/app';
.project {
  position: relative;
  overflow: hidden;
  margin: 2em auto 4em;

  .part-one {
    position: relative;
    width: 50%;
    box-sizing: border-box;
    img {
      width: 100%;
    }

    &.left {
      float: left;
    }
    &.right {
      float: right;
    }
    .operate {
      display: none;
    }
    &:hover {
      .operate {
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        span {
          display: inline-block;
          margin: 0 1em;
          width: 2.5em;
          height: 2.5em;
          padding: 0.5em;
          border-radius: 50%;
          background: $base-color;
          box-sizing: border-box;
          cursor: pointer;
          .icon {
            width: 1.5em;
            height: 1.5em;
            color: #fff;
          }

          &.operate-delete {
            background: #fa5555;
          }
        }
      }
    }
  }
  .part-two {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 50%;
    box-sizing: border-box;
    text-align: center;
    line-height: 2;

    &.left {
      float: left;
      left: 25%;
    }
    &.right {
      float: right;
      left: 75%;
    }

    h3 {
      font-size: 1.5em;
    }
    .link-address {
      margin: 1em auto;
      .icon {
        margin-right: 0.4em;
        width: 0.9em;
        height: 0.9em;
        vertical-align: -0.04em;
      }
    }
    .link,
    .github {
      padding: 0.4em 0.8em;
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


