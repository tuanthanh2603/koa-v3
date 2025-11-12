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

    <!-- 📱 Floating Contact Icons -->
    <div class="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
      <!-- Cuộc gọi -->
      <a
        href="tel:+84785968888"
        target="_blank"
        rel="noopener noreferrer"
        :class="[
          'w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110',
          colorMode.value === 'dark'
            ? 'bg-white text-black hover:bg-gray-200'
            : 'bg-black text-white hover:bg-gray-800'
        ]"
        title="Gọi cho chúng tôi"
      >
        <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      </a>

      <!-- Facebook -->
      <a
        href="https://www.facebook.com/kientruckoa"
        target="_blank"
        rel="noopener noreferrer"
        :class="[
          'w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110',
          colorMode.value === 'dark'
            ? 'bg-white text-black hover:bg-gray-200'
            : 'bg-black text-white hover:bg-gray-800'
        ]"
        title="Kết nối trên Facebook"
      >
        <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      </a>
    </div>
  </section>
</template>

<style scoped>
div {
  @apply transition-colors duration-500;
}

@keyframes pulse-ring {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

a {
  animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

a:hover {
  animation: none;
}
</style>