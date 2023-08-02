<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <v-toolbar density="compact" title="Application">
    <v-app-bar-nav-icon></v-app-bar-nav-icon>
  </v-toolbar>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/electron-vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped lang="scss">
</style>
