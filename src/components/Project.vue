<template>
  <section class="project">
    <div :class="['part-one', `${positions.includes(postion) ? position : 'left'}`]">
      <img :src="project.poster" alt="项目图片">
    </div>
    <div :class="['part-two', `${positions.includes(postion) ? position : 'left'}`]">
      <h3 class="name">{{ project.name }}</h3>
      <p class="description">{{ project.description }}</p>
      <p><a :href="project.link" class="link">在线效果</a></p>
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
    postion: String
  },
  data () {
    return {
      positions: ['left', 'right']
    };
  }
};
</script>

<style lang="scss" scoped>
.project {
  position: relative;
  overflow: hidden;
  margin: 2em auto;

  .part-one {
    width: 50%;
    padding: 0 1em;
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
    width: 50%;
    padding: 0 1em;
    box-sizing: border-box;

    &.left {
      float: left;
    }
    &.right {
      float: right;
    }
  }
}
</style>


