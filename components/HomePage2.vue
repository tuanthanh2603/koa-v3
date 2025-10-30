<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import img1 from '~/assets/images/PK_SKYVIEW1.jpg'
import img2 from '~/assets/images/PK_SKYVIEW6.jpg'
import img3 from '~/assets/images/PLV_SKYVIEW4.jpg'

interface GridItem {
  label: string
  image: string
  path: string
}

const router = useRouter()
const hoveredIndex = ref<number | null>(null)
const imagesLoaded = ref<Set<number>>(new Set())

const items: GridItem[] = [
  { label: 'Dự án', image: img1, path: '/projects' },
  { label: 'Kiến thức', image: img2, path: '/knowledge' },
  { label: 'Tuyển dụng', image: img2, path: '/recruitment' },
  { label: 'Thông tin', image: img3, path: '/info' },
  { label: 'Liên hệ', image: img1, path: '/contact' }
]

const preloadImages = () => {
  items.forEach((item, index) => {
    const img = new Image()
    img.onload = () => imagesLoaded.value.add(index)
    img.onerror = () => {
      console.warn(`Failed to load image: ${item.image}`)
      imagesLoaded.value.add(index)
    }
    img.src = item.image
  })
}

onMounted(() => {
  preloadImages()
})

const isImageLoaded = (index: number) => imagesLoaded.value.has(index)

// ✅ Cập nhật filter logic - cột hover sáng hơn
const getFilter = (index: number) => {
  if (hoveredIndex.value === null) {
    return 'brightness(0.5) blur(0px)'
  }
  if (hoveredIndex.value === index) {
    return 'brightness(1.1) blur(0px)'  // Cột hover sáng nhất
  }
  return 'brightness(0.3) blur(1px)'    // Các cột khác tối hơn + blur nhẹ
}

// ✅ Thêm hàm tính scale - cột hover to hơn
const getScale = (index: number) => {
  return hoveredIndex.value === index ? 'scale(1.05)' : 'scale(1)'
}

const handleClick = (path: string) => {
  router.push(path)
}
</script>

<template>
  <section class="h-screen snap-start flex items-center justify-center text-white text-3xl">
    <div class="grid grid-cols-5 w-full h-full">
      <div 
        v-for="(item, index) in items"
        :key="index"
        class="flex items-center justify-center bg-center bg-cover cursor-pointer transition-all duration-300 relative overflow-hidden group"
        :style="{
          backgroundImage: isImageLoaded(index) ? `url('${item.image}')` : 'none',
          backgroundColor: isImageLoaded(index) ? 'transparent' : '#1a1a1a',
          filter: getFilter(index),
          transform: getScale(index),
          zIndex: hoveredIndex === index ? 20 : 10
        }"
        @mouseenter="hoveredIndex = index"
        @mouseleave="hoveredIndex = null"
        @click="handleClick(item.path)" 
      >
        <!-- Loading skeleton -->
        <div 
          v-if="!isImageLoaded(index)"
          class="absolute inset-0 bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600 bg-200% animate-pulse"
        />

        <!-- Label -->
        <h3 
          class="font-MBFSpaceHabitat text-xl relative z-10 bg-black/50 py-2 px-4 rounded-lg transition-all duration-300"
          :class="hoveredIndex === index ? 'bg-black/70 scale-105' : 'group-hover:bg-black/70'"
        >
          {{ item.label }}
        </h3>

        <!-- Overlay - Hiệu ứng khi hover -->
        <div 
          v-if="isImageLoaded(index)"
          class="absolute inset-0 transition-opacity duration-300"
          :class="hoveredIndex === index ? 'opacity-0' : 'opacity-30 bg-black'"
        />

        <!-- Shine effect khi hover -->
        <div 
          v-if="isImageLoaded(index) && hoveredIndex === index"
          class="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-10 pointer-events-none"
          style="animation: shine 0.6s ease-in-out infinite;"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  contain: layout style paint;
}

.grid {
  contain: layout style;
}

.group {
  will-change: filter, transform;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.animate-pulse {
  animation: shimmer 2s infinite;
}

/* Shine effect - hiệu ứng sáng bóng khi hover */
@keyframes shine {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

/* Smooth transition cho tất cả */
div {
  transition: filter 0.3s ease, transform 0.3s ease, opacity 0.3s ease;
}
</style>