<template>
  <!-- <transition name="fade"> -->
    <section class="db-dialog" v-show="visible">
      <div class="mask" @click="cancel"></div>
      <div class="db-dialog-section">
        <svg class="icon" aria-hidden="true" @click="cancel">
          <use xlink:href="#icon-delete"></use>
        </svg>
        <h3 class="db-dialog-title">{{ title }}</h3>
        <div class="db-dialog-body">
          <slot></slot>
        </div>
        <div class="db-dialog-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </section>
  <!-- </transition> -->
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    cancel: function () {
      this.$emit('hide-dialog');
    }
  }
};
</script>


<style lang="scss" scoped>
@import '../assets/sass/app';
.db-dialog {
  position: relative;

  .db-dialog-section {
    position: fixed;
    box-sizing: border-box;
    padding: 1.5em;
    width: 50%;
    min-width: 40em;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 0.4em;
    background: #fff;
    z-index: 50001;
    .icon {
      position: absolute;
      top: 1.5em;
      right: 1.5em;
      width: 0.9em;
      height: 0.9em;
      color: #878d99;
      cursor: pointer;

      &:hover {
        color: $base-color;
      }
    }
    .db-dialog-title {
      font-size: 1.2em;
      font-weight: 600;
      margin-bottom: 1.5em;
      text-align: center;
    }
  }
}
</style>


