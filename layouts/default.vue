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
    <div 
      v-if="isHydrated" 
      :class="[
        'min-h-screen transition-colors duration-500',
        colorMode.value === 'dark'
          ? 'bg-black text-white'
          : 'bg-white text-black'
      ]"
      class="
        pt-8 px-2
        sm:pt-[110px] sm:px-4
        md:pt-[130px] md:px-6
        lg:pt-[150px] lg:px-8
      "
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