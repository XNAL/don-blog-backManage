<template>
  <section class="project">
    <div :class="['part-one', `${position === 'right' ? 'right' : 'left'}`]">
      <img :src="project.poster" alt="项目图片">
    </div>
    <div :class="['part-two', `${(position === 'right' ? 'right' : 'left') === 'left' ? 'right' : 'left'}`]">
      <h3 class="name">{{ project.name }}</h3>
      <p class="description">{{ project.description }}</p>
      <p><a :href="project.link" class="link" target="_blank">在线效果</a></p>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    project: {
      type: Object,
      default: {}
    },
    position: String
  }
};
</script>

<style lang="scss" scoped>
.project {
  position: relative;
  overflow: hidden;
  margin: 2em auto 4em;

  .part-one {
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
  }
}
</style>


