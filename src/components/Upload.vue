<template>
	<section class="upload">
		<div :class="['upload-file', { 'existFile': imgSrc !== ''}]">
			<img :src="imgSrc" alt="">
      <span class="add-file" @click="addFile">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-add"></use>
        </svg>
      </span>
      <span class="delete-file" @click="deleteFile">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-delete"></use>
        </svg>
      </span>
		</div>
		<input type="file" ref="file" accept="image/png,image/jpeg" @change="fileChanged">
	</section>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    },
    maxSize: {
      type: Number,
      default: 2048
    }
  },
  data () {
    return {
      file: {
        name: '',
        size: 0
      },
      imgSrc: ''
    };
  },
  watch: {
    src: function () {
      this.imgSrc = this.src;
    }
  },
  created () {
    this.imgSrc = this.src;
  },
  methods: {
    addFile () {
      this.$refs.file.click();
    },
    deleteFile () {
      this.imgSrc = '';
      this.$refs.file.value = '';
      this.file = {
        name: '',
        size: 0
      };
      this.$emit('upload-file', this.file, this.imgSrc);
    },
    fileChanged () {
      const newFile = this.$refs.file.files[0];
      if (
        newFile.type.indexOf('image/png') === -1 &&
        newFile.type.indexOf('image/jpeg') === -1
      ) {
        this.$message.showMessage({
          type: 'warning',
          content: '上传文件格式错误，只接受jpg、png格式的图片'
        });
        this.$refs.file.value = '';
        return;
      }
      if (newFile.size > this.maxSize * 1024) {
        this.$message.showMessage({
          type: 'warning',
          content: `上传图片最大不能超过${this.maxSize}kb`
        });
        this.$refs.file.value = '';
        return;
      }
      if (this.file.name !== newFile.name || this.file.size !== newFile.size) {
        this.html5Reader(newFile);
      }
      this.$refs.file.value = '';
    },
    // 将图片文件转成BASE64格式
    html5Reader (file) {
      const reader = new FileReader();
      reader.onload = e => {
        this.imgSrc = e.target.result;
        let image = new Image();
        image.onload = () => {
          let width = image.width;
          let height = image.height;
          if (width / height >= 1.8 && width / height <= 2.2) {
            this.file = file;
            this.$emit('upload-file', this.file, this.imgSrc);
          } else {
            this.$message.showMessage({
              type: 'warning',
              content: `上传图片的宽/高比要求在1.8-2.2之间`
            });
            this.imgSrc = '';
            this.$refs.file.value = '';
          }
        };
        image.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/app';
.upload {
  height: 100%;
  text-align: center;

  .upload-file {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    img {
      width: 100%;
      height: 100%;
    }

    &.existFile {
      .add-file {
        display: none;
      }
      .delete-file {        
        display: inline-block;
      }
    }
  }
  .add-file {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: inline-block;
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
  }
  .delete-file {
    display: none;
    position: absolute;
    top: 0.2em;
    right: 0.2em;
    width: 2em;
    height: 2em;
    padding: 0.5em;
    border-radius: 50%;
    background: #fa5555;
    box-sizing: border-box;
    cursor: pointer;
    .icon {
      width: 1em;
      height: 1em;
      color: #fff;
    }
  }
  input[type='file'] {
    display: none;
  }
}
</style>


