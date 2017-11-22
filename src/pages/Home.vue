<template>
  <section class="home right-container">
    <back-menu></back-menu>
    <div>首页计划做一些图表</div>
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

