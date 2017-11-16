<template>
  <transition name="fade">
    <section :class="['message', `message-${types.includes(type) ? type : 'info'}` ]" 
              v-if="isShowMessage" @mouseover="mouseOver" @mouseleave="mouseLeave">
      <p class="content">
        <svg class="icon" aria-hidden="true">
          <use :xlink:href="`#icon-${types.includes(type) ? type : 'info'}`"></use>
        </svg>{{ content }}
      </p>
    </section>
  </transition>
</template>

<script>
export default {
  data () {
    return {
      isShowMessage: false,
      content: '提示内容',
      duration: 2000,
      type: '',
      types: ['success', 'warning', 'info', 'error'],
      timer: null
    };
  },
  methods: {
    showMessage: function () {
      this.isShowMessage = true;
      this.messageTimer();
    },
    remove: function () {
      this.isShowMessage = false;
      setTimeout(() => {
        this.destroy();
      }, 300);
    },
    destroy: function () {
      this.$destroy();
      document.body.removeChild(this.$el);
    },
    messageTimer: function () {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          this.remove();
        }, this.duration);
      }
    },
    mouseOver: function () {
      clearTimeout(this.timer);
    },
    mouseLeave: function () {
      this.messageTimer();
    }
  }
};
</script>

<style lang="scss" scoped>
.message {
  position: fixed;
  top: 2em;
  left: 50%;
  font-size: 1em;
  color: red;
  line-height: 3em;
  min-width: 20em;
  padding: 0 1em;
  border: 1px solid #fff;
  border-radius: 0.2em;
  transform: translate(-50%, 0);
  background: #fff;
  z-index: 99999;

  &.message-success {
    background-color: #f0f9eb;
    border-color: #e1f3d8;
    color: #67c23a;
  }
  &.message-warning {
    background-color: oldlace;
    border-color: #fbeccd;
    color: #eb9e05;
  }
  &.message-error {
    background-color: #fee;
    border-color: #fedddd;
    color: #fa5555;
  }
  &.message-info {
    background-color: #edf2fc;
    border-color: #e6ebf5;
    color: #878d99;
  }
  
  .content {
    .icon {
      width: 0.9em;
      height: 0.9em;
      vertical-align: -0.08em;
      margin-right: 0.4em;
    }
  }
}
.fade-enter-active, .fade-leave-active {
  transition: all .3s ease;
}
.fade-enter, .fade-leave-to {
  transform: translate(-50%, -2em);
  opacity: 0;
}
</style>



