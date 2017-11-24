<template>
  <section class="header">
    <template v-for="(item, index) in $route.meta.paths"> 
      <router-link class="breadcrumb no-underline" :to="item.link" :key="index" v-if="item.link !== ''">
        {{ item.name }}
      </router-link>
      <span class="no-link" :key="index" v-else>{{ item.name }}</span>
      <span class="separator" :key="index" v-show="index !== $route.meta.paths.length - 1">/</span>
    </template> 
  </section>
</template>

<style lang="scss" scoped>
.header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4em;
  line-height: 4em;
  padding-left: 1em;
  background: #eff2f7;

  .no-link {
    color: #97a8be;
    cursor: text;
  }
  .separator {
    margin: 0 0.5em 0 0.3em;
  }  
}
</style>

