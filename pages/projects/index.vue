<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { categories, getProjectBySlug } from '~/mocks/project'
import type { Project } from '~/types/project'

const route = useRoute()
const router = useRouter()
const colorMode = useColorMode()
const isHydrated = ref(false)
const activeCategory = ref<number | null>(null)
const hoveredProject = ref<number | null>(null)
const { locale } = useI18n()

const currentCategory = computed(() => {
  if (activeCategory.value === null) {
    return {
      id: 0,
      name_en: 'All Projects',
      name_vn: 'Tất cả dự án',
      projects: categories.flatMap(cat => cat.projects)
    }
  }
  return categories[activeCategory.value]
})

const syncCategoryFromQuery = () => {
  const catId = route.query.category ? Number(route.query.category) : null
  
  if (catId === null) {
    activeCategory.value = null
  } else {
    const foundIndex = categories.findIndex(cat => cat.id === catId)
    activeCategory.value = foundIndex !== -1 ? foundIndex : null
  }
}

const navigateToProject = (project: Project) => {
  if (project.slug) {
    const categoryId = activeCategory.value !== null 
      ? categories[activeCategory.value].id 
      : null
    
    if (categoryId) {
      localStorage.setItem('lastProjectCategory', categoryId as unknown as string)
    }
    
    router.push({
      path: `/projects/${project.slug}`,
      query: categoryId ? { category: categoryId } : {}
    })
  }
}

const isTouchDevice = ref(false)

onMounted(() => {
  // Load color mode from localStorage
  if (process.client) {
    const savedColorMode = localStorage.getItem('nuxt-color-mode')
    if (savedColorMode === 'dark' || savedColorMode === 'light') {
      colorMode.preference = savedColorMode
    }
    isHydrated.value = true
  }

  syncCategoryFromQuery()
  isTouchDevice.value = typeof window !== 'undefined' && (
    'ontouchstart' in window ||
    (navigator as any).maxTouchPoints > 0 ||
    (navigator as any).msMaxTouchPoints > 0
  )
})

const handleProjectClick = (project: Project) => {
  if (!isTouchDevice.value) {
    navigateToProject(project)
    return
  }
  if (hoveredProject.value !== project.id) {
    hoveredProject.value = project.id
    return
  }
  navigateToProject(project)
}

watch(() => route.query.category, syncCategoryFromQuery)

const handleCategoryClick = (idx: number | null) => {
  activeCategory.value = idx
  if (idx === null) {
    router.push({ path: '/projects' })
  } else {
    router.push({
      path: '/projects',
      query: { category: categories[idx].id }
    })
  }
}
</script>

<template>
  <!-- ✅ Chỉ render khi đã hydrate xong -->
  <div v-if="isHydrated" :class="[
    'min-h-screen transition-colors duration-500',
    colorMode.value === 'dark'
      ? 'bg-slate-950'
      : 'bg-white'
  ]">
    <!-- Header -->
    <div class="max-w-7xl mx-auto mb-10">
      <!-- Category Navigation -->
      <div class="flex flex-wrap justify-center gap-4 mb-10">
        <!-- Nút "Tất cả" -->
        <button 
          @click="handleCategoryClick(null)" 
          :class="[
            'relative w-36 px-6 py-3 font-semibold text-sm overflow-hidden transition-all duration-300 group text-center',
            activeCategory === null
              ? colorMode.value === 'dark'
                ? 'text-white border-2 border-white bg-white/10'
                : 'text-black border-2 border-black bg-black/5'
              : colorMode.value === 'dark'
                ? 'text-slate-300 border-2 border-slate-600 hover:border-white hover:text-white'
                : 'text-gray-700 border-2 border-black/30 hover:border-black hover:text-black'
          ]">
          {{ locale === 'vi' ? 'Tất cả' : 'All' }}
          <span
            :class="[
              'absolute inset-0 border opacity-0 scale-75 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100',
              colorMode.value === 'dark' ? 'border-white' : 'border-black'
            ]" />
        </button>

        <!-- Các danh mục khác -->
        <button 
          v-for="(cat, idx) in categories" 
          :key="cat.id" 
          @click="handleCategoryClick(idx)" 
          :class="[
            'relative w-36 px-6 py-3 font-semibold text-sm overflow-hidden transition-all duration-300 group text-center',
            activeCategory === idx
              ? colorMode.value === 'dark'
                ? 'text-white border-2 border-white bg-white/10'
                : 'text-black border-2 border-black bg-black/5'
              : colorMode.value === 'dark'
                ? 'text-slate-300 border-2 border-slate-600 hover:border-white hover:text-white'
                : 'text-gray-700 border-2 border-black/30 hover:border-black hover:text-black'
          ]">
          {{ locale === 'vi' ? cat.name_vn : cat.name_en }}
          <span
            :class="[
              'absolute inset-0 border opacity-0 scale-75 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100',
              colorMode.value === 'dark' ? 'border-white' : 'border-black'
            ]" />
        </button>
      </div>
    </div>

    <!-- Projects Grid -->
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div 
          v-for="project in currentCategory.projects" 
          :key="project.id" 
          @mouseenter="hoveredProject = project.id"
          @mouseleave="hoveredProject = null" 
          class="group mb-5">
          <div 
            class="relative aspect-square overflow-hidden shadow-lg mb-4 transition-colors duration-300" 
            :class="colorMode.value === 'dark' ? 'bg-slate-800' : 'bg-gray-200'"
            @click="handleProjectClick(project)">
            <img 
              :src="project.image" 
              :alt="project.name_en"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 cursor-pointer" />

            <div
              class="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/70 backdrop-blur-sm flex flex-col justify-end p-8 transition-opacity duration-500"
              :class="hoveredProject === project.id ? 'opacity-100' : 'opacity-0'">
              <div 
                class="text-white text-left transition-all duration-300" 
                :class="hoveredProject === project.id
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-8 opacity-0'">
                <h4 class="text-lg font-bold mb-2">{{ locale === 'vi' ? project.name_vn : project.name_en }}</h4>
                <p class="text-sm text-gray-100 mb-6 line-clamp-4">
                  {{ locale === 'vi' ? project.description_vn : project.description_en }}
                </p>

                <button 
                  @click.stop="navigateToProject(project)"
                  class="wave-button cursor-pointer group/btn relative w-full bg-white/10 border-2 border-white text-white font-semibold py-3 px-6 transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden hover:bg-white hover:text-black hover:shadow-xl">
                  <span class="relative z-10 flex items-center gap-2">
                    {{ locale === 'vi' ? 'Xem chi tiết' : 'View details' }}
                    <svg class="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none"
                      stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>

          <h3 
            @click="navigateToProject(project)"
            :class="[
              'cursor-pointer text-base text-center uppercase tracking-wide transition-all duration-300 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-600 group-hover:bg-clip-text',
              colorMode.value === 'dark' ? 'text-slate-100' : 'text-gray-900'
            ]">
            {{ locale === 'vi' ? project.name_vn : project.name_en }}
          </h3>
        </div>
      </div>

      <div v-if="currentCategory.projects.length === 0" class="text-center py-20">
        <p :class="[
          'text-lg transition-colors duration-300',
          colorMode.value === 'dark' ? 'text-slate-400' : 'text-gray-600'
        ]">
          {{ locale === 'vi' ? 'Chưa có dự án trong danh mục này' : 'No project in this category' }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes wave {
  0% {
    left: -100%;
  }

  100% {
    left: 100%;
  }
}

.wave-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent);
  border-radius: 0.375rem;
}

.wave-button:hover::before {
  animation: wave 0.6s ease-in-out;
}
</style>