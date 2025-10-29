<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getProjectBySlug } from '~/mocks/project'
import type { Project } from '~/types/project'

const route = useRoute()
const router = useRouter()

const project = ref<Project | null>(null)
const selectedImageIndex = ref(0)
const isLightboxOpen = ref(false)
const thumbnailContainer = ref<HTMLElement | null>(null)

onMounted(() => {
  const slug = route.params.slug as string
  project.value = getProjectBySlug(slug)
  
  if (!project.value) {
    router.push('/projects')
  }
})

const getImages = () => {
  if (!project.value) return []
  return project.value.images || (project.value.image ? [{ id: '1', image: project.value.image }] : [])
}

const selectImage = (index: number) => {
  selectedImageIndex.value = index
  scrollThumbnailIntoView(index)
}

const scrollThumbnailIntoView = (index: number) => {
  if (!thumbnailContainer.value) return
  
  const thumbnails = thumbnailContainer.value.querySelectorAll('[data-thumbnail]')
  const thumbnail = thumbnails[index] as HTMLElement
  
  if (thumbnail) {
    thumbnail.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }
}

const nextImage = () => {
  const images = getImages()
  selectImage((selectedImageIndex.value + 1) % images.length)
}

const prevImage = () => {
  const images = getImages()
  selectImage((selectedImageIndex.value - 1 + images.length) % images.length)
}

const openLightbox = () => {
  isLightboxOpen.value = true
}

const closeLightbox = () => {
  isLightboxOpen.value = false
}

const goBack = () => {
  router.push('/projects')
}
</script>

<template>
  <div v-if="project" class="min-h-screen bg-gray-50 py-[6%] px-4">
    <!-- Header -->
    <div class="bg-white shadow-sm mb-8">
      <div class="max-w-7xl mx-auto px-4 py-6">
        <button @click="goBack" class="flex items-center gap-2 text-gray-600 hover:text-black transition-colors mb-4 mt-5 cursor-pointer">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Quay lại
        </button>
        
        <div>
          <h1 class="text-xl font-bold text-gray-900 mb-3">{{ project.name }}</h1>
          <p class="text-gray-600 text-base">{{ project.description }}</p>
        </div>
      </div>
    </div>

    <!-- Main Gallery -->
    <div class="max-w-7xl mx-auto px-4">
      <div v-if="getImages().length > 0" class="flex gap-6">
        <!-- Left: Main Image -->
        <div class="flex-1 flex flex-col">
          <div 
            @click="openLightbox"
            class="relative bg-gray-200 rounded-lg overflow-hidden cursor-pointer group flex-1 flex items-center justify-center max-h-[70vh]"
          >
            <img 
              :src="getImages()[selectedImageIndex].image" 
              :alt="project.name"
              class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          </div>

          <!-- Navigation buttons below main image -->
          <div class="flex justify-between items-center mt-4 gap-2">
            <button 
              @click="prevImage"
              class="flex items-center justify-center w-10 h-10 rounded-lg bg-white border border-gray-300 hover:border-gray-500 transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <p class="text-sm text-gray-600">{{ selectedImageIndex + 1 }} / {{ getImages().length }}</p>
            <button 
              @click="nextImage"
              class="flex items-center justify-center w-10 h-10 rounded-lg bg-white border border-gray-300 hover:border-gray-500 transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Right: Thumbnail List -->
        <div class="w-24">
          <div 
            ref="thumbnailContainer"
            class="flex flex-col gap-3 max-h-[70vh] overflow-y-auto pr-2"
          >
            <div 
              v-for="(img, index) in getImages()" 
              :key="img.id"
              :data-thumbnail="index"
              @click="selectImage(index)"
              class="relative aspect-square flex-shrink-0 rounded-lg overflow-hidden cursor-pointer border-2 transition-all duration-200"
              :class="selectedImageIndex === index 
                ? 'border-blue-500 shadow-md' 
                : 'border-gray-300 hover:border-gray-400'"
            >
              <img 
                :src="img.image" 
                :alt="`${project.name} - ${index + 1}`"
                class="w-full h-full object-cover"
              />
              <div v-if="selectedImageIndex === index" class="absolute inset-0 bg-blue-500/10" />
            </div>
          </div>
        </div>
      </div>

      <!-- No images message -->
      <div v-else class="text-center py-20">
        <svg class="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p class="text-gray-500 text-lg">Chưa có hình ảnh cho dự án này</p>
      </div>
    </div>

    <!-- Lightbox Modal -->
    <div 
      v-if="isLightboxOpen" 
      @click="closeLightbox"
      class="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
    >
      <button 
        @click="closeLightbox"
        class="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
      >
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      
      <img 
        :src="getImages()[selectedImageIndex].image" 
        alt="Project image"
        class="max-w-full max-h-[90vh] object-contain"
        @click.stop
      />
    </div>
  </div>

  <!-- Loading or not found state -->
  <div v-else class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
      <p class="text-gray-600">Đang tải...</p>
    </div>
  </div>
</template>

<style scoped>
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}
</style>