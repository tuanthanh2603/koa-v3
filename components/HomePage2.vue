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

const getFilter = (index: number) => {
  if (hoveredIndex.value === null) {
    return 'brightness(0.5)'
  }
  if (hoveredIndex.value === index) {
    return 'brightness(1.1)'
  }
  return 'brightness(0.3) blur(1px)'
}

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
        class="grid-item"
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
          class="skeleton"
        />

        <!-- Label -->
        <h3 
          class="label"
          :class="hoveredIndex === index && 'hovered'"
        >
          {{ item.label }}
        </h3>

        <!-- Overlay -->
        <div 
          v-if="isImageLoaded(index)"
          class="overlay"
          :class="hoveredIndex === index && 'hidden'"
        />

        <!-- Shine effect -->
        <div 
          v-if="isImageLoaded(index) && hoveredIndex === index"
          class="shine"
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
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  width: 100%;
  height: 100%;
}

/* ✅ Mobile: 2 cột */
@media (max-width: 1024px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
    height: auto;
  }
  
  .grid-item {
    min-height: 300px;
  }
}

/* ✅ Tablet: 1 cột */
@media (max-width: 640px) {
  .grid {
    grid-template-columns: 1fr;
    height: auto;
  }
  
  .grid-item {
    min-height: 280px;
  }
  
  .label {
    font-size: 1rem;
    padding: 0.4rem 0.8rem;
  }
}

/* ✅ Chỉ apply transition trên những cái cần thiết */
.grid-item {
  display: flex;
  align-items: center;
  justify-content: center;
  background-position: center;
  background-size: cover;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  
  /* ✅ Quan trọng: will-change + transform-gpu */
  will-change: filter, transform, z-index;
  transform: translateZ(0);
  backface-visibility: hidden;
  
  /* ✅ Chỉ transition filter & transform */
  transition: filter 0.3s ease, transform 0.3s ease;
}

/* Loading skeleton */
.skeleton {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, #4b5563, #3f4654, #4b5563);
  background-size: 200% 100%;
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

/* Label */
.label {
  font-family: 'MBFSpaceHabitat', sans-serif;
  font-size: 1.25rem;
  position: relative;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: background-color 0.3s ease, transform 0.3s ease;
  will-change: background-color, transform;
}

.label.hovered {
  background-color: rgba(0, 0, 0, 0.7);
  transform: scale(1.05);
}

/* Overlay */
.overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.3);
  transition: opacity 0.3s ease;
  will-change: opacity;
}

.overlay.hidden {
  opacity: 0;
}

/* Shine effect */
.shine {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  pointer-events: none;
  animation: shine 0.8s ease-in-out forwards;
  will-change: transform;
}

@keyframes shine {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
</style>