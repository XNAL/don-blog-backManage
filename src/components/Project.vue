<template>
  <section class="project">
    <div class="part-one">
      <img :src="project.poster" alt="项目图片">
    </div>
    <div class="part-two">
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
    }
  }
};
</script>

<style lang="scss" scoped>
.preoject {
  position: relative;
  overflow: hidden;

  .part-one {
    width: 50%;
  }
  .part-two {
    width: 50%;
  }
}
</style>


