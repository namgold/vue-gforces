<template>
  <div id="app" class='row justify-content-center'>
    <div class='col-sm-12 col-md-10 col-lg-8 col-xl-6'>
      <img class="logo" src="./assets/logo.svg">
      <h2 id="tech-challenge-vue-js-6-">Tech Challenge (<a href="https://vuejs.org">Vue.js</a>)</h2>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style lang="scss">
  @import 'assets/scss/style';
</style>
