<template>
<div class="message-box" v-show="isShowMessageBox">
	<div class="mask" @click="cancel"></div>
	<div class="message-content">
    <svg class="icon" aria-hidden="true" @click="cancel">
      <use xlink:href="#icon-delete"></use>
    </svg>
		<h3 class="title">{{ title }}</h3>
		<p class="content">{{ content }}</p>
    <div>
      <input type="text" v-model="inputValue" v-if="isShowInput" ref="input">
    </div>
		<div class="btn-group">
			<button class="btn-default" @click="cancel" v-show="isShowCancelBtn">{{ cancelBtnText }}</button>
			<button class="btn-primary btn-confirm" @click="confirm" v-show="isShowConfimrBtn">{{ confirmBtnText }}</button>
		</div>
	</div>
</div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '标题'
    },
    content: {
      type: String,
      default: '这是弹框内容'
    },
    isShowInput: false,
    inputValue: '',
    isShowCancelBtn: {
      type: Boolean,
      default: true
    },
    isShowConfimrBtn: {
      type: Boolean,
      default: true
    },
    cancelBtnText: {
      type: String,
      default: '取消'
    },
    confirmBtnText: {
      type: String,
      default: '确定'
    }
  },
  data () {
    return {
      isShowMessageBox: false,
      resolve: '',
      reject: '',
      promise: '' // 保存promise对象
    };
  },
  methods: {
    // 确定,将promise断定为完成态
    confirm: function () {
      this.isShowMessageBox = false;
      if (this.isShowInput) {
        this.resolve(this.inputValue);
      } else {
        this.resolve('confirm');
      }
      this.remove();
    },
    // 取消,将promise断定为reject状态
    cancel: function () {
      this.isShowMessageBox = false;
      this.reject('cancel');
      this.remove();
    },
    // 弹出messageBox,并创建promise对象，给父组件调用
    showMsgBox: function () {
      this.isShowMessageBox = true;
      this.promise = new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
      // 返回promise对象,给父级组件调用
      return this.promise;
    },
    remove: function () {
      setTimeout(() => {
        this.destroy();
      }, 300);
    },
    destroy: function () {
      this.$destroy();
      document.body.removeChild(this.$el);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/sass/app.scss';
.message-box {
  position: relative;

  .message-content {
    position: fixed;
    box-sizing: border-box;
    padding: 1em;
    min-width: 30em;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 0.4em;
    background: #fff;
    z-index: 50001;
    .icon {
      position: absolute;
      top: 1em;
      right: 1em;
      width: 0.9em;
      height: 0.9em;
      color: #878d99;
      cursor: pointer;

      &:hover {
        color: $base-color;
      }
    }
    .title {
      font-size: 1.2em;
      font-weight: 600;
      margin-bottom: 1em;
    }
    .content {
      font-size: 1em;
      line-height: 2em;
      color: #555;
    }
    input {
      width: 100%;
      margin: 1em 0;
      background-color: #fff;
      border-radius: 0.4em;
      border: 1px solid #d8dce5;
      box-sizing: border-box;
      color: #5a5e66;
      display: inline-block;
      font-size: inherit;
      height: 3em;
      line-height: 1;
      outline: none;
      padding: 0 1em;

      &:focus {
        border-color: $base-color;
      }
    }
    .btn-group {
      margin-top: 1em;
      float: right;
      overflow: hidden;

      .btn-confirm {
        margin-left: 1em;
      }
    }
  }
}
</style>
