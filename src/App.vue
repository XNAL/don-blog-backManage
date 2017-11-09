<template>
  <div id="app">
    <!-- <back-menu></back-menu> -->
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
import Menu from './components/Menu';
export default {
  name: 'app',
  components: {
    'back-menu': Menu
  }
};
</script>

<style lang="scss">
@import './assets/sass/app';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  /* text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}
</style>
