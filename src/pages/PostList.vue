<template>
  <section class="post-list">
    <back-menu></back-menu>
    <div>文章列表</div>
    <back-header></back-header>
  </section>
</template>

<script>
import Menu from '../components/Menu';
import Header from '../components/Header';

export default {
  components: {
    'back-menu': Menu,
    'back-header': Header
  }
};
</script>

<style lang="scss" scoped>
.post-list {
  position: relative;
  margin-left: 12em;
  padding: 5em 1em 1em;
}
</style>

