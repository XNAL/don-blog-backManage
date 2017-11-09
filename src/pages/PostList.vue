<template>
  <section class="post-list">
    <back-menu></back-menu>
    <div>文章列表</div>
  </section>
</template>

<script>
import Menu from '../components/Menu';

export default {
  components: {
    'back-menu': Menu
  }
};
</script>

<style lang="scss" scoped>
.post-list {
  margin-left: 12em;
  padding: 1em;
}
</style>

