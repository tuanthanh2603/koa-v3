<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { categories, getProjectBySlug } from '~/mocks/project'
import type { Project } from '~/types/project'

const route = useRoute()
const router = useRouter()
const activeCategory = ref(0)
const hoveredProject = ref<number | null>(null)
const { locale } = useI18n()

const currentCategory = computed(() => categories[ activeCategory.value ])
const syncCategoryFromQuery = () => {
  const catId = Number(route.query.category)
  const foundIndex = categories.findIndex(cat => cat.id === catId)
  activeCategory.value = foundIndex !== -1 ? foundIndex : 0
}


onMounted(() => {
  syncCategoryFromQuery()
})

// Theo dõi khi URL query thay đổi (nếu bạn dùng navigation nội bộ)
watch(() => route.query.category, syncCategoryFromQuery)

// 🧭 Khi click, đổi URL để giữ trạng thái category trên route
const handleCategoryClick = (idx: number) => {
  activeCategory.value = idx
  router.push({
    path: '/projects',
    query: { category: categories[ idx ].id }
  })
}

const navigateToProject = (project: Project) => {
  if (project.slug) {
    // ✅ Lưu category trước khi navigate
    localStorage.setItem('lastProjectCategory', categories[ activeCategory.value ].id as unknown as string)
    router.push({
      path: `/projects/${project.slug}`,
      query: {
        category: categories[ activeCategory.value ].id
      }
    })
  }
}
</script>

<template>
  <div class="min-h-screen bg-white py-[12%] px-4">
    <!-- Header -->
    <div class="max-w-7xl mx-auto mb-10">
      <!-- <div class="text-center mb-2">
        <h1 class="text-2xl font-bold text-gray-900 mb-4">Dự án nổi bật</h1>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Khám phá những dự án nổi bật, mỗi công trình là sự kết hợp hoàn hảo giữa kiến trúc và sáng tạo
        </p>
      </div> -->

      <!-- Category Navigation -->
      <div class="flex flex-wrap justify-center gap-4 mb-10">
        <button v-for="(cat, idx) in categories" :key="cat.id" @click="handleCategoryClick(idx)" :class="[
          'relative w-36 px-6 py-3 font-semibold text-sm overflow-hidden transition-all duration-300 group text-center',
          activeCategory === idx
            ? 'text-black border-2 border-black bg-black/5'
            : 'text-gray-700 border-2 border-black/30 hover:border-black hover:text-black'
        ]">
          {{ locale === 'vi' ? cat.name_vn : cat.name_en }}
          <span
            class="absolute inset-0 border border-black opacity-0 scale-75 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100" />
        </button>
      </div>

    </div>

    <!-- Projects Grid -->
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div v-for="project in currentCategory.projects" :key="project.id" @mouseenter="hoveredProject = project.id"
          @mouseleave="hoveredProject = null" class="group mb-5">
          <div class="relative aspect-square overflow-hidden bg-gray-200 shadow-lg">
            <img :src="project.image" :alt="project.name_en"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />

            <div
              class="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/70 backdrop-blur-sm flex flex-col justify-end p-8 transition-opacity duration-500"
              :class="hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
                ">
              <div class="text-white text-left transition-all duration-300" :class="hoveredProject === project.id
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0'
                ">
                <h4 class="text-lg font-bold mb-2">{{ locale === 'vi' ? project.name_vn : project.name_en }}</h4>
                <p class="text-sm text-gray-100 mb-6 line-clamp-4">
                  {{ locale === 'vi' ? project.description_vn : project.description_en }}
                </p>

                <button @click="navigateToProject(project)"
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

          <h3 @click="navigateToProject(project)"
            class="cursor-pointer mt-4 text-base text-center text-gray-900 uppercase tracking-wide group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
            {{ locale === 'vi' ? project.name_vn : project.name_en }}
          </h3>
        </div>

      </div>

      <div v-if="currentCategory.projects.length === 0" class="text-center py-20">
        <p class="text-gray-600 text-lg">{{ locale === 'vi' ? 'Chưa có dự án trong danh mục này' : 'No project in this category' }}</p>
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