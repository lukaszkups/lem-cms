<script setup lang="ts">
import { onBeforeMount } from 'vue'

defineProps<{ msg: string }>()
// console.warn(123, this.$t);

// const count = ref(0)
onBeforeMount(() => {
})
</script>

<template>
  <h1>{{ $t('welcome.home') }}</h1>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
