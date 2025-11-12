<script setup lang="ts">
import { ref, onMounted, computed, nextTick } from 'vue'
import { getProjectBySlug, categories } from '~/mocks/project'
import type { Project } from '~/types/project'

const route = useRoute()
const router = useRouter()
const colorMode = useColorMode()
const isHydrated = ref(false)

const project = ref<Project | null>(null)
const selectedImageIndex = ref(0)
const isLightboxOpen = ref(false)
const thumbnailContainer = ref<HTMLElement | null>(null)
const pageLoaded = ref(false)
const headerVisible = ref(false)
const galleryVisible = ref(false)

const currentCategory = computed(() => {
  if (!project.value) return null
  return categories.find(cat => 
    cat.projects.some(p => p.id === project.value?.id)
  )
})

const categoryId = computed(() => currentCategory.value?.id || '')

// Lấy 3 ảnh để hiển thị (trước, hiện tại, sau)
const displayedImages = computed(() => {
  const images = getImages()
  if (images.length === 0) return []
  
  const prevIndex = (selectedImageIndex.value - 1 + images.length) % images.length
  const nextIndex = (selectedImageIndex.value + 1) % images.length
  
  return [
    images[prevIndex],
    images[selectedImageIndex.value],
    images[nextIndex]
  ]
})

onMounted(async () => {
  if (process.client) {
    const savedColorMode = localStorage.getItem('nuxt-color-mode')
    if (savedColorMode === 'dark' || savedColorMode === 'light') {
      colorMode.preference = savedColorMode
    }
    isHydrated.value = true
  }

  const slug = route.params.slug as string
  project.value = getProjectBySlug(slug)
  
  if (!project.value) {
    router.push('/projects')
    return
  }

  await nextTick()
  setTimeout(() => {
    pageLoaded.value = true
    setTimeout(() => {
      headerVisible.value = true
      setTimeout(() => {
        galleryVisible.value = true
      }, 200)
    }, 150)
  }, 100)
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
    thumbnail.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
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

const goToProjects = () => {
  router.push({
    path: '/projects',
    query: {
      category: categoryId.value
    }
  })
}

const { locale } = useI18n()

const steps = [
  {
    id: 1,
    title: 'TIẾP NHẬN',
    description: 'Tiếp nhận thông tin và yêu cầu của khách hàng.',
    icon: 'i-heroicons-magnifying-glass',
    top: true
  },
  {
    id: 2,
    title: 'TƯ VẤN VÀ BÁO GIÁ',
    description: 'Tư vấn báo giá gói thiết kế và dự trù gói thi công.',
    icon: 'i-heroicons-users',
    top: true
  },
  {
    id: 3,
    title: 'KHẢO SÁT KỸ HỢP ĐỒNG',
    description: 'Gặp trực tiếp khách hàng, khảo sát lô đất tư vấn chỉ tiết và ký hợp đồng thiết kế.',
    icon: 'i-heroicons-hand-raised',
    top: true
  },
  {
    id: 4,
    title: 'MẶT BẰNG CÔNG NĂNG',
    description: 'Triển khai mặt bằng công năng theo yêu cầu yêu cầu của khách hàng.',
    icon: 'i-heroicons-square-3-stack-3d',
    top: true
  },
  {
    id: 5,
    title: 'THIẾT KẾ 3D KIẾN TRÚC',
    description: 'Thiết kế 3D kiến trúc công trình.',
    icon: 'i-heroicons-computer-desktop',
    top: true
  },
  {
    id: 6,
    title: 'HỒ SƠ XIN PHÉP & HỒ SƠ THI CÔNG',
    description: 'Triển khai hồ sơ xin phép và hồ sơ thi công công trình.',
    icon: 'i-heroicons-document-text',
    top: false
  },
  {
    id: 7,
    title: 'THIẾT KẾ 3D & TRIỂN KHAI NỘI THẤT',
    description: 'Thiết kế 3D nội thất công trình và triển khai hồ sơ chỉ tiết nộ thất.',
    icon: 'i-heroicons-window',
    top: false
  },
  {
    id: 8,
    title: 'ĐỒNG BỘ',
    description: 'Đồng bộ hồ sơ kiến trúc theo nội thất.',
    icon: 'i-heroicons-check-circle',
    top: false
  },
  {
    id: 9,
    title: 'BÀN GIAO',
    description: 'Bàn giao hồ sơ toàn bộ công trình tới tay khách hàng.',
    icon: 'i-heroicons-arrow-up-tray',
    top: false
  }
]
const topSteps = computed(() => steps.filter(s => s.top))
const bottomSteps = computed(() => steps.filter(s => !s.top))
</script>

<template>
  <div v-if="isHydrated && project" :class="[
    'transition-colors duration-500',
    colorMode.value === 'dark' ? 'bg-black text-white' : 'bg-white'
  ]">
    <div :class="{ 'opacity-0': !pageLoaded }" class="transition-opacity duration-700 ease-out">
      <!-- Breadcrumb Navigation -->
      <div class="max-w-7xl mx-auto mb-8 px-4 transition-all duration-700 ease-out delay-100" :class="{ 'opacity-0 translate-y-[-10px]': !pageLoaded }">
        <nav :class="[
          'flex items-center gap-2 text-sm transition-colors duration-300',
          colorMode.value === 'dark' ? 'text-slate-400' : 'text-gray-600'
        ]">
          <router-link to="/" :class="[
            'hover:transition-colors transition-colors',
            colorMode.value === 'dark' ? 'hover:text-white' : 'hover:text-black'
          ]">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-3m0 0l7-4 7 4M5 9v10a1 1 0 001 1h12a1 1 0 001-1V9m-9 11l4-4m0 0l4 4m-4-4v4" />
            </svg>
          </router-link>
          
          <span>/</span>
          
          <button 
            @click="goToProjects"
            :class="[
              'hover:transition-colors transition-colors hover:underline',
              colorMode.value === 'dark' ? 'hover:text-white' : 'hover:text-black'
            ]"
          >
            {{ locale === 'vi' ? 'Dự án' : 'Projects' }}
          </button>
          
          <span>/</span>
          
          <button 
            v-if="currentCategory"
            @click="goToProjects"
            :class="[
              'hover:transition-colors transition-colors hover:underline max-w-[200px] truncate',
              colorMode.value === 'dark' ? 'hover:text-white' : 'hover:text-black'
            ]"
          >
            {{ locale === 'vi' ? currentCategory.name_vn : currentCategory.name_en }}
          </button>
          
          <span v-if="currentCategory">/</span>
          
          <span :class="[
            'font-semibold max-w-[300px] truncate',
            colorMode.value === 'dark' ? 'text-slate-100' : 'text-gray-900'
          ]">
            {{ locale === 'vi' ? project.name_vn : project.name_en }}
          </span>
        </nav>
      </div>

      <!-- Header -->
      <div 
        :class="[
          '-mx-4 px-4 py-8 mb-8 transition-all duration-1000 ease-out',
          colorMode.value === 'dark' ? 'bg-black' : 'bg-gray-50',
          { 'opacity-0 translate-y-[-20px]': !headerVisible }
        ]"
      >
        <div class="max-w-7xl mx-auto">
          <h1 :class="[
            'text-2xl font-bold mb-4 text-center transition-colors duration-300',
            colorMode.value === 'dark' ? 'text-slate-100' : 'text-gray-900'
          ]">
            {{ locale === 'vi' ? project.name_vn : project.name_en }}
          </h1>
          <p :class="[
            'text-base max-w-2xl transition-colors duration-300',
            colorMode.value === 'dark' ? 'text-slate-400' : 'text-gray-600'
          ]">
            {{ locale === 'vi' ? project.description_vn : project.description_en }}
          </p>
        </div>
      </div>

      <!-- Main Gallery -->
      <div 
        class="max-w-7xl mx-auto px-4 transition-all duration-1000 ease-out delay-300"
        :class="{ 'opacity-0 translate-y-[20px]': !galleryVisible }"
      >
        <div v-if="getImages().length > 0" class="space-y-4">
          <!-- 3-Image Carousel Display -->
          <div class="relative">
            <div 
              :class="[
                'relative rounded-2xl overflow-hidden flex items-center justify-center transition-colors duration-300 py-2 max-h-[85vh]',
                colorMode.value === 'dark' ? 'bg-slate-800' : 'bg-gray-100'
              ]"
            >
              <div class="flex items-center justify-center w-full h-full">
                <!-- Ảnh bên trái (mờ) -->
                <div
                  :class="[
                    'flex-1 h-full rounded-lg overflow-hidden opacity-40 transition-all duration-300 transform scale-75 flex items-center justify-center',
                    colorMode.value === 'dark' ? 'bg-slate-700' : 'bg-gray-200'
                  ]"
                >
                  <img 
                    :src="displayedImages[0]?.image" 
                    :alt="project.name_en"
                    class="w-full h-full object-cover"
                  />
                </div>

                <!-- Ảnh chính (nổi bật) -->
                <div
                  @click="openLightbox"
                  :class="[
                    'flex-1 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ring-2 ring-offset-4 shadow-2xl flex items-center justify-center group',
                    colorMode.value === 'dark' 
                      ? 'ring-black ring-offset-slate-800' 
                      : 'ring-black ring-offset-white'
                  ]"
                >
                  <img 
                    :src="displayedImages[1]?.image" 
                    :alt="project.name_en"
                    class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <!-- Ảnh bên phải (mờ) -->
                <div
                  :class="[
                    'flex-1 h-full rounded-lg overflow-hidden opacity-40 transition-all duration-300 transform scale-75 flex items-center justify-center',
                    colorMode.value === 'dark' ? 'bg-slate-700' : 'bg-gray-200'
                  ]"
                >
                  <img 
                    :src="displayedImages[2]?.image" 
                    :alt="project.name_en"
                    class="w-full h-full object-cover"
                  />
                </div>
              </div>

              <!-- Navigation buttons -->
              <button 
                @click="prevImage"
                :class="[
                  'absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-12 rounded-full backdrop-blur-sm border transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg hover:shadow-xl z-10',
                  colorMode.value === 'dark'
                    ? 'bg-slate-800/90 hover:bg-slate-800 border-slate-700 hover:border-slate-600'
                    : 'bg-white/90 hover:bg-white border-gray-200 hover:border-gray-300'
                ]"
              >
                <svg class="w-5 h-5" :class="colorMode.value === 'dark' ? 'text-slate-200' : 'text-gray-700'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button 
                @click="nextImage"
                :class="[
                  'absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-12 rounded-full backdrop-blur-sm border transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg hover:shadow-xl z-10',
                  colorMode.value === 'dark'
                    ? 'bg-slate-800/90 hover:bg-slate-800 border-slate-700 hover:border-slate-600'
                    : 'bg-white/90 hover:bg-white border-gray-200 hover:border-gray-300'
                ]"
              >
                <svg class="w-5 h-5" :class="colorMode.value === 'dark' ? 'text-slate-200' : 'text-gray-700'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <!-- Image counter -->
              <div :class="[
                'absolute top-4 right-4 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-medium z-10',
                colorMode.value === 'dark' ? 'bg-black/60' : 'bg-black/50'
              ]">
                {{ selectedImageIndex + 1 }} / {{ getImages().length }}
              </div>
            </div>

            <!-- Navigation buttons mobile -->
            <div class="flex justify-center items-center mt-6 gap-4 md:hidden">
              <button 
                @click="prevImage"
                :class="[
                  'flex items-center justify-center w-12 h-12 rounded-lg border-2 transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm hover:shadow-md',
                  colorMode.value === 'dark'
                    ? 'bg-slate-800 border-slate-700 hover:border-slate-600 hover:bg-slate-700'
                    : 'bg-white border-gray-300 hover:border-gray-600 hover:bg-gray-50'
                ]"
              >
                <svg class="w-5 h-5" :class="colorMode.value === 'dark' ? 'text-slate-200' : 'text-gray-700'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <p :class="[
                'text-sm font-medium transition-colors duration-300',
                colorMode.value === 'dark' ? 'text-slate-400' : 'text-gray-600'
              ]">
                {{ selectedImageIndex + 1 }} / {{ getImages().length }}
              </p>
              <button 
                @click="nextImage"
                :class="[
                  'flex items-center justify-center w-12 h-12 rounded-lg border-2 transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm hover:shadow-md',
                  colorMode.value === 'dark'
                    ? 'bg-slate-800 border-slate-700 hover:border-slate-600 hover:bg-slate-700'
                    : 'bg-white border-gray-300 hover:border-gray-600 hover:bg-gray-50'
                ]"
              >
                <svg class="w-5 h-5" :class="colorMode.value === 'dark' ? 'text-slate-200' : 'text-gray-700'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
          
          <!-- Thumbnail Strip - Horizontal Scroll -->
          <div class="relative">
            <div 
              ref="thumbnailContainer"
              class="flex gap-4 overflow-x-auto pb-1 pt-2 scroll-smooth snap-x snap-mandatory -mx-4 px-4 scrollbar-thin"
            >
              <TransitionGroup
                name="thumbnail"
                tag="div"
                class="flex gap-4"
              >
                <div 
                  v-for="(img, index) in getImages()" 
                  :key="`${img.image}-${index}`"
                  :data-thumbnail="index"
                  @click="selectImage(index)"
                  :class="[
                    'relative shrink-0 h-28 sm:h-32 rounded-xl overflow-hidden cursor-pointer border-2 transition-all duration-300 hover:scale-105 active:scale-95 snap-start',
                    selectedImageIndex === index 
                      ? colorMode.value === 'dark'
                        ? 'border-black shadow-lg ring-2 ring-black scale-105'
                        : 'border-black shadow-lg ring-2 ring-black scale-105'
                      : colorMode.value === 'dark'
                        ? 'border-slate-700 hover:border-slate-600'
                        : 'border-gray-300 hover:border-gray-400'
                  ]"
                >
                  <img 
                    :src="img.image" 
                    :alt="`${project.name_en} - ${index + 1}`"
                    class="w-full h-full object-cover transition-transform duration-300"
                  />
                  <Transition
                    enter-active-class="transition-opacity duration-300"
                    leave-active-class="transition-opacity duration-300"
                    enter-from-class="opacity-0"
                    leave-to-class="opacity-0"
                  >
                    <div v-if="selectedImageIndex === index" :class="[
                      'absolute inset-0',
                      colorMode.value === 'dark' ? 'bg-blue-600/20' : 'bg-blue-500/20'
                    ]" />
                  </Transition>
                  
                  <div :class="[
                    'absolute bottom-2 right-2 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full font-medium',
                    colorMode.value === 'dark' ? 'bg-black/60' : 'bg-black/60'
                  ]">
                    {{ index + 1 }}
                  </div>
                </div>
              </TransitionGroup>
            </div>
          </div>
        </div>

        <!-- No images message -->
        <div v-else class="text-center py-20">
          <svg class="w-24 h-24 mx-auto mb-4 transition-colors duration-300" :class="colorMode.value === 'dark' ? 'text-slate-700' : 'text-gray-300'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p :class="[
            'text-lg transition-colors duration-300',
            colorMode.value === 'dark' ? 'text-slate-500' : 'text-gray-500'
          ]">
            {{ locale === 'vi' ? 'Chưa có hình ảnh cho dự án này' : 'No images available for this project' }}
          </p>
        </div>
      </div>

      <!-- Lightbox Modal -->
      <Transition
        enter-active-class="transition-all duration-500 ease-out"
        leave-active-class="transition-all duration-500 ease-in"
        enter-from-class="opacity-0 backdrop-blur-none"
        enter-to-class="opacity-100 backdrop-blur-md"
        leave-from-class="opacity-100 backdrop-blur-md"
        leave-to-class="opacity-0 backdrop-blur-none"
      >
        <div 
          v-if="isLightboxOpen" 
          @click="closeLightbox"
          class="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
        >
          <button 
            @click="closeLightbox"
            class="absolute top-6 right-6 text-white hover:text-gray-300 transition-all duration-300 z-10 hover:scale-110 active:scale-95 rounded-full p-2 hover:bg-white/10"
          >
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <Transition
            mode="out-in"
            enter-active-class="transition-all duration-700 ease-out"
            leave-active-class="transition-all duration-700 ease-in"
            enter-from-class="opacity-0 scale-95"
            leave-to-class="opacity-0 scale-105"
          >
            <img 
              :key="selectedImageIndex"
              :src="getImages()[selectedImageIndex].image" 
              alt="Project image"
              class="max-w-full max-h-[90vh] object-contain"
              @click.stop
            />
          </Transition>

          <button
            @click.stop="prevImage"
            class="absolute left-6 top-1/2 -translate-y-1/2 text-white hover:text-gray-200 transition-all duration-300 hover:scale-110 active:scale-95 rounded-full p-3 hover:bg-white/10"
          >
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            @click.stop="nextImage"
            class="absolute right-6 top-1/2 -translate-y-1/2 text-white hover:text-gray-200 transition-all duration-300 hover:scale-110 active:scale-95 rounded-full p-3 hover:bg-white/10"
          >
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </Transition>
    </div>
  </div>

  <!-- Loading or not found state -->
  <div v-else class="min-h-screen flex items-center justify-center" :class="colorMode.value === 'dark' ? 'bg-slate-950' : 'bg-white'">
    <div class="text-center">
      <div :class="[
        'animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4',
        colorMode.value === 'dark' ? 'border-slate-200' : 'border-gray-900'
      ]"></div>
      <p :class="colorMode.value === 'dark' ? 'text-slate-400' : 'text-gray-600'">
        {{ locale === 'vi' ? 'Đang tải...' : 'Loading...' }}
      </p>
    </div>
  </div>
  <div v-if="isHydrated" :class="colorMode.value === 'dark' ? 'bg-black text-white' : 'bg-white text-black'" class="min-h-screen transition-colors duration-300 p-8 md:p-16">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-16">
        <!-- <p :class="colorMode.value === 'dark' ? 'text-gray-400' : 'text-gray-600'" class="text-sm tracking-widest mb-4"></p> -->
        <h1 :class="colorMode.value === 'dark' ? 'text-white' : 'text-black'" class="text-xl md:text-3xl font-bold tracking-wide">QUY TRÌNH TƯ VẤN THIẾT KẾ</h1>
      </div>

      <!-- Top Row -->
      <div class="">
        <div class="flex justify-between items-start gap-6">
          <div
            v-for="step in topSteps"
            :key="step.id"
            class="flex flex-col items-center flex-1"
          >

          
        
            <!-- Card -->
            <div :class="[
              'border rounded-lg p-6 w-full mb-8 aspect-square flex flex-col justify-between transition-all duration-300 hover:scale-105',
              colorMode.value === 'dark' 
                ? 'border-gray-600 hover:border-gray-400 hover:shadow-lg hover:shadow-gray-700/50 bg-gray-900' 
                : 'border-gray-300 hover:border-gray-600 hover:shadow-lg hover:shadow-gray-400/50 bg-gray-50'
            ]">
              <div class="flex justify-end mb-4">
                <UIcon 
                  :name="step.icon" 
                  :class="colorMode.value === 'dark' ? 'text-gray-300' : 'text-gray-700'" 
                  class="w-12 h-12 transition-colors duration-300" 
                />
              </div>
              <div>
                <p :class="colorMode.value === 'dark' ? 'text-gray-500' : 'text-gray-600'" class="text-xs tracking-wider mb-2">0{{ step.id }}.</p>
                <h3 :class="colorMode.value === 'dark' ? 'text-white' : 'text-black'" class="font-bold text-sm mb-3 line-clamp-2">{{ step.title }}</h3>
                <p :class="colorMode.value === 'dark' ? 'text-gray-400' : 'text-gray-700'" class="text-xs leading-relaxed">{{ step.description }}</p>
              </div>
            </div>

            <!-- Connecting line and circle -->
            <div class="flex flex-col items-center">
              <div :class="['w-8 h-8 border-2 rounded-full flex items-center justify-center mb-4 transition-colors duration-300', colorMode.value === 'dark' ? 'border-gray-600' : 'border-gray-400']">
                <div :class="colorMode.value === 'dark' ? 'bg-gray-600' : 'bg-gray-400'" class="w-3 h-3 rounded-full transition-colors duration-300"></div>
              </div>
            </div>
            <div :class="['w-0.5 h-12 bg-gradient-to-b mb-4 transition-colors duration-300', colorMode.value === 'dark' ? 'from-gray-600 to-transparent' : 'from-gray-400 to-transparent']"></div>

          </div>
        </div>
      </div>

      <!-- Bottom Row -->
      <div>
        <div class="flex justify-between items-start gap-6">
          <div
            v-for="step in bottomSteps"
            :key="step.id"
            class="flex flex-col items-center flex-1"
          >
            <!-- Connecting line from top -->
            <div :class="['w-0.5 h-12 bg-gradient-to-b mb-4 transition-colors duration-300', colorMode.value === 'dark' ? 'from-gray-600 to-transparent' : 'from-gray-400 to-transparent']"></div>

            <!-- Circle marker -->
            <div :class="['w-8 h-8 border-2 rounded-full flex items-center justify-center mb-4 transition-colors duration-300', colorMode.value === 'dark' ? 'border-gray-600' : 'border-gray-400']">
              <div :class="colorMode.value === 'dark' ? 'bg-gray-600' : 'bg-gray-400'" class="w-3 h-3 rounded-full transition-colors duration-300"></div>
            </div>

            <!-- Card -->
            <div :class="[
              'border rounded-lg p-6 w-full transition-all duration-300 hover:scale-105',
              colorMode.value === 'dark' 
                ? 'border-gray-600 hover:border-gray-400 hover:shadow-lg hover:shadow-gray-700/50 bg-gray-900' 
                : 'border-gray-300 hover:border-gray-600 hover:shadow-lg hover:shadow-gray-400/50 bg-gray-50'
            ]">
              <div class="flex justify-center mb-4">
                <UIcon 
                  :name="step.icon" 
                  :class="colorMode.value === 'dark' ? 'text-gray-300' : 'text-gray-700'" 
                  class="w-12 h-12 transition-colors duration-300" 
                />
              </div>
              <p :class="colorMode.value === 'dark' ? 'text-gray-500' : 'text-gray-600'" class="text-xs tracking-wider mb-2 text-center">0{{ step.id }}.</p>
              <h3 :class="colorMode.value === 'dark' ? 'text-white' : 'text-black'" class="font-bold text-sm mb-3 text-center line-clamp-2">{{ step.title }}</h3>
              <p :class="colorMode.value === 'dark' ? 'text-gray-400' : 'text-gray-700'" class="text-xs leading-relaxed text-center">{{ step.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 3px;
  transition: background 0.3s ease;
}

::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

.scrollbar-thin::-webkit-scrollbar {
  height: 4px;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background: #9ca3af;
  border-radius: 2px;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}

.carousel-enter-active,
.carousel-leave-active {
  transition: opacity 0.3s ease;
}

.carousel-enter-from {
  opacity: 0;
}

.carousel-leave-to {
  opacity: 0;
}

.thumbnail-enter-active,
.thumbnail-leave-active {
  transition: all 0.3s ease;
}

.thumbnail-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.thumbnail-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

img {
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
}

.scroll-smooth {
  scroll-behavior: smooth;
  scroll-padding: 10px;
}

button:focus-visible {
  outline: 2px solid rgba(59, 130, 246, 0.5);
  outline-offset: 2px;
}
</style>