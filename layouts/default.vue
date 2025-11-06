<script setup lang="ts">
import Header from '~/components/Header.vue'

const colorMode = useColorMode()
const isHydrated = ref(false)

onMounted(() => {
  if (process.client) {
    const savedColorMode = localStorage.getItem('nuxt-color-mode')
    if (savedColorMode === 'dark' || savedColorMode === 'light') {
      colorMode.preference = savedColorMode
    }
    // ✅ Đánh dấu đã hydrate xong
    isHydrated.value = true
  }
})
</script>

<template>
  <section>
    <Header />
    <!-- ✅ Chỉ render khi đã hydrate xong để tránh flash -->
    <div v-if="isHydrated" :class="[
      'min-h-screen transition-colors duration-500',
      colorMode.value === 'dark'
        ? 'bg-slate-950'
        : 'bg-white'
    ]"
      class="pt-[22%] px-2 md:px-4 md:py-[12%]"
    >
      <slot />
    </div>
  </section>
</template>

<style scoped>
div {
  @apply transition-colors duration-500;
}
</style>