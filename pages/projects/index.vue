<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { categories } from '~/mocks/project'
import type { Project } from '~/types/project'

const route = useRoute()
const router = useRouter()
const colorMode = useColorMode()
const isHydrated = ref(false)
const activeCategory = ref<number | null>(null)
const hoveredProject = ref<number | null>(null)
const { locale } = useI18n()

/* ===============================
  LOAD MORE
================================ */
const INITIAL_VISIBLE = 6
const visibleCount = ref(INITIAL_VISIBLE)
const isLoadingMore = ref(false)

/* ===============================
  IMAGE PRELOAD (NEW)
  - Only show grid when images are ready
================================ */
const imagesLoaded = ref(false)
const isLoadingMoreImages = ref(false)

// preload helper (NEW)
const preloadImages = (urls: string[]) => {
  return Promise.all(
    urls.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new Image()
          img.src = src
          img.onload = () => resolve()
          img.onerror = () => resolve() // avoid blocking UI if an image fails
        })
    )
  )
}

/* ===============================
  COMPUTED CATEGORY
================================ */
const currentCategory = computed(() => {
  const projects =
    activeCategory.value === null
      ? categories.flatMap(cat => cat.projects)
      : categories[activeCategory.value].projects

  return {
    ...(activeCategory.value === null
      ? {
          id: 0,
          name_en: 'All Projects',
          name_vn: 'Tất cả dự án'
        }
      : categories[activeCategory.value]),
    projects: [...projects].sort((a, b) => a.id - b.id)
  }
})

/* ===============================
  DISPLAY PROJECTS
================================ */
const visibleProjects = computed(() => {
  return currentCategory.value.projects.slice(0, visibleCount.value)
})

const canLoadMore = computed(() => {
  return visibleCount.value < currentCategory.value.projects.length
})

/* ===============================
  PRELOAD WHEN visibleProjects CHANGES (NEW)
================================ */
watch(
  () => visibleProjects.value.map(p => p.image),
  async (images) => {
    // If not hydrated yet, skip (avoid SSR mismatch)
    if (!isHydrated.value) return

    imagesLoaded.value = false
    await preloadImages(images)
    imagesLoaded.value = true
  },
  { immediate: false }
)

/* ===============================
  SYNC CATEGORY
================================ */
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
    const categoryId =
      activeCategory.value !== null ? categories[activeCategory.value].id : null

    if (categoryId) {
      localStorage.setItem('lastProjectCategory', String(categoryId))
    }

    router.push({
      path: `/projects/${project.slug}`,
      query: categoryId ? { category: categoryId } : {}
    })
  }
}

const isTouchDevice = ref(false)

onMounted(async () => {
  // Load color mode from localStorage
  if (process.client) {
    const savedColorMode = localStorage.getItem('nuxt-color-mode')
    if (savedColorMode === 'dark' || savedColorMode === 'light') {
      colorMode.preference = savedColorMode
    }
    isHydrated.value = true
  }

  syncCategoryFromQuery()
  isTouchDevice.value =
    typeof window !== 'undefined' &&
    ('ontouchstart' in window ||
      (navigator as any).maxTouchPoints > 0 ||
      (navigator as any).msMaxTouchPoints > 0)

  // Initial preload after hydration (NEW)
  imagesLoaded.value = false
  await preloadImages(visibleProjects.value.map(p => p.image))
  imagesLoaded.value = true
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

/* Reset về 6 khi đổi category / projects list thay đổi */
// watch(
//   () => currentCategory.value.projects,
//   async () => {
//     visibleCount.value = INITIAL_VISIBLE
//     hoveredProject.value = null

//     imagesLoaded.value = false
//     await preloadImages(visibleProjects.value.map(p => p.image))
//     imagesLoaded.value = true
//   }
// )


const handleCategoryClick = (idx: number | null) => {
  activeCategory.value = idx
  visibleCount.value = INITIAL_VISIBLE
  hoveredProject.value = null

  if (idx === null) {
    router.push({ path: '/projects' })
  } else {
    router.push({
      path: '/projects',
      query: { category: categories[idx].id }
    })
  }
}

/* Click xem thêm -> show hết luôn */
const loadMore = async () => {
  if (!canLoadMore.value) return

  isLoadingMore.value = true
  isLoadingMoreImages.value = true

  const oldCount = visibleCount.value
  const total = currentCategory.value.projects.length

  // lấy CHỈ ảnh mới
  const newImages = currentCategory.value.projects
    .slice(oldCount, total)
    .map(p => p.image)

  await preloadImages(newImages)

  // sau khi ảnh mới load xong → mới tăng visibleCount
  visibleCount.value = total

  isLoadingMore.value = false
  isLoadingMoreImages.value = false
}

</script>

<template>
  <!-- ✅ Chỉ render khi đã hydrate xong -->
  <div
    v-if="isHydrated"
    :class="[
      'min-h-screen transition-colors duration-500',
      colorMode.value === 'dark' ? 'bg-black text-white' : 'bg-white'
    ]"
  >
    <!-- Header -->
    <div class="max-w-7xl mx-auto mb-10">
      <!-- Category Navigation -->
      <div
        class="grid grid-cols-3 md:flex md:flex-wrap md:justify-center gap-2 md:gap-4 mb-10 mt-16"
      >
        <!-- Nút "Tất cả" -->
        <button
          @click="handleCategoryClick(null)"
          :class="[
            'relative px-4 py-2 md:px-6 md:py-3 font-semibold text-xs md:text-sm overflow-hidden transition-all duration-300 group text-center w-full md:w-36',
            activeCategory === null
              ? colorMode.value === 'dark'
                ? 'text-white border-2 border-white bg-white/10'
                : 'text-black border-2 border-black bg-black/5'
              : colorMode.value === 'dark'
                ? 'text-slate-300 border-2 border-slate-600 hover:border-white hover:text-white'
                : 'text-gray-700 border-2 border-black/30 hover:border-black hover:text-black'
          ]"
        >
          {{ locale === 'vi' ? 'Tất cả' : 'All' }}
          <span
            :class="[
              'absolute inset-0 border opacity-0 scale-75 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100',
              colorMode.value === 'dark' ? 'border-white' : 'border-black'
            ]"
          />
        </button>

        <!-- Các danh mục khác -->
        <button
          v-for="(cat, idx) in categories"
          :key="cat.id"
          @click="handleCategoryClick(idx)"
          :class="[
            'relative px-4 py-2 md:px-6 md:py-3 font-semibold text-xs md:text-sm overflow-hidden transition-all duration-300 group text-center w-full md:w-36',
            activeCategory === idx
              ? colorMode.value === 'dark'
                ? 'text-white border-2 border-white bg-white/10'
                : 'text-black border-2 border-black bg-black/5'
              : colorMode.value === 'dark'
                ? 'text-slate-300 border-2 border-slate-600 hover:border-white hover:text-white'
                : 'text-gray-700 border-2 border-black/30 hover:border-black hover:text-black'
          ]"
        >
          {{ locale === 'vi' ? cat.name_vn : cat.name_en }}
          <span
            :class="[
              'absolute inset-0 border opacity-0 scale-75 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100',
              colorMode.value === 'dark' ? 'border-white' : 'border-black'
            ]"
          />
        </button>
      </div>
    </div>

    <!-- Projects Grid -->
    <div class="max-w-7xl mx-auto">
      <!-- ✅ REAL GRID: only when all images are loaded (NEW) -->
      <div
        v-if="imagesLoaded"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
      >
        <div
          v-for="project in visibleProjects"
          :key="project.id"
          @mouseenter="hoveredProject = project.id"
          @mouseleave="hoveredProject = null"
          class="group mb-5"
        >
          <div
            class="relative aspect-square overflow-hidden shadow-lg mb-4 transition-colors duration-300"
            :class="colorMode.value === 'dark' ? 'bg-slate-800' : 'bg-gray-200'"
            @click="handleProjectClick(project)"
          >
            <img
              :src="project.image"
              :alt="project.name_en"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 cursor-pointer"
            />

            <div
              class="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/70 backdrop-blur-sm flex flex-col justify-end p-8 transition-opacity duration-500"
              :class="hoveredProject === project.id ? 'opacity-100' : 'opacity-0'"
            >
              <div
                class="text-white text-left transition-all duration-300"
                :class="
                  hoveredProject === project.id
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-8 opacity-0'
                "
              >
                <h4 class="text-lg font-bold mb-2">
                  {{ locale === 'vi' ? project.name_vn : project.name_en }}
                </h4>

                <p
                  class="text-sm text-gray-100 mb-6 line-clamp-4"
                  v-html="locale === 'vi' ? project.description_vn : project.description_en"
                ></p>

                <button
                  @click.stop="navigateToProject(project)"
                  class="wave-button cursor-pointer group/btn relative w-full bg-white/10 border-2 border-white text-white font-semibold py-3 px-6 transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden hover:bg-white hover:text-black hover:shadow-xl"
                >
                  <span class="relative z-10 flex items-center gap-2">
                    {{ locale === 'vi' ? 'Xem chi tiết' : 'View details' }}
                    <svg
                      class="w-4 h-4 group-hover/btn:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5l7 7-7 7"
                      />
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
            ]"
          >
            {{ locale === 'vi' ? project.name_vn : project.name_en }}
          </h3>
        </div>
      </div>

      <!-- ✅ SKELETON GRID while images preloading (NEW) -->
      <div
        v-else
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
      >
        <div
          v-for="i in (visibleProjects.length || INITIAL_VISIBLE)"
          :key="i"
          class="group mb-5"
        >
          <div
            class="relative aspect-square overflow-hidden shadow-lg mb-4 transition-colors duration-300"
            :class="colorMode.value === 'dark' ? 'bg-slate-800' : 'bg-gray-200'"
          >
            <div class="w-full h-full animate-pulse"
              :class="colorMode.value === 'dark' ? 'bg-slate-700' : 'bg-gray-300'"
            />
            <div class="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/30" />
          </div>

          <div
            class="h-5 w-3/4 mx-auto animate-pulse rounded"
            :class="colorMode.value === 'dark' ? 'bg-slate-700' : 'bg-gray-300'"
          />
        </div>
      </div>

      <!-- Load more button (bấm 1 lần -> show hết) -->
      <div v-if="canLoadMore" class="flex justify-center mt-4">
        <button
          @click="loadMore"
          :disabled="isLoadingMore"
          class="wave-button cursor-pointer group/btn relative px-10 py-4 bg-white/10 border-2 font-semibold transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden hover:shadow-xl"
          :class="colorMode.value === 'dark'
            ? 'border-white text-white hover:bg-white hover:text-black'
            : 'border-black text-black hover:bg-black hover:text-white'"
        >
          <svg
            v-if="isLoadingMore"
            class="w-5 h-5 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            />
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4l3-3-3-3v4a12 12 0 00-12 12h4z"
            />
          </svg>

          <span class="relative z-10">
            {{
              isLoadingMore
                ? (locale === 'vi' ? 'Đang tải...' : 'Loading...')
                : (locale === 'vi' ? 'Xem thêm' : 'Load more')
            }}
          </span>
        </button>
      </div>

      <!-- Empty state -->
      <div v-if="currentCategory.projects.length === 0" class="text-center py-20">
        <p
          :class="[
            'text-lg transition-colors duration-300',
            colorMode.value === 'dark' ? 'text-slate-400' : 'text-gray-600'
          ]"
        >
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
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  border-radius: 0.375rem;
}

.wave-button:hover::before {
  animation: wave 0.6s ease-in-out;
}
</style>
