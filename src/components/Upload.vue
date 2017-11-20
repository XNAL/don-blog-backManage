<template>
	<section class="upload">
		<div class="upload-file">
			<img :src="imgSrc" alt="">
		</div>
		<p class="add-file" @click="addFile">添加/修改图片</p>
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
    fileChanged () {
      const newFile = this.$refs.file.files[0];
      if (
        newFile.type.indexOf('image/png') === -1 &&
        newFile.type.indexOf('image/jpeg') === -1
      ) {
        this.$Notice.warning({
          title: '上传图片出错',
          desc: `上传文件格式错误，只接受jpg、png格式的图片。`
        });
        this.$refs.file.value = '';
        return;
      }
      if (newFile.size > this.maxSize * 1024) {
        this.$Notice.warning({
          title: '上传图片出错',
          desc: `上传图片最大不能超过${this.maxSize}kb。`
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
        this.file = file;
        this.$emit('upload-file', this.file);
      };
      reader.readAsDataURL(file);
    }
  }
};
</script>

<style lang="scss" scoped>
.upload {
  text-align: center;

  .upload-file {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .add-file {
    margin: 10px 0 5px;
    font-size: 14px;
    line-height: 1;
    color: #4cb549;
    text-decoration: underline;
    cursor: pointer;
  }
  input[type='file'] {
    display: none;
  }
}
</style>


