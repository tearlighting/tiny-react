<template>
  <div class="w-full h-screen">
    <iframe class="w-full h-full border-none" :src="iframeSrc"></iframe>
    <div v-show="loading" class="absolute inset-0 bg-blue-100 flex items-center justify-center text-gray-500 z-10">Loading demo...</div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()
const iframeSrc = computed(() => {
  const res = import.meta.env.VITE_IFRAME_ORIGIN + route.path.replace(import.meta.env.VITE_BASE_PATH, "")
  console.log(res)

  startLoading()
  return res
})

const loading = ref(true)
const startLoading = () => {
  loading.value = true
  setTimeout(() => {
    stopLoading()
  }, 300)
}
const stopLoading = () => {
  loading.value = false
}
</script>
