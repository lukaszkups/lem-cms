<script setup lang="ts">
import { onBeforeMount } from 'vue'

defineProps<{ msg: string }>()
// console.warn(123, this.$t);

// const count = ref(0)
onBeforeMount(() => {
})
</script>

<template>
  <h1>{{ $t('headings.welcome') }}</h1>
  <button @click="$i18n.changeLanguage('pl')">PL</button>
  <button @click="$i18n.changeLanguage('en')">EN</button>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
