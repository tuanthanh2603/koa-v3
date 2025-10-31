<script setup lang="ts">
import ImageLogo from '~/assets/images/logo__Artboard 5.png'
import { categories } from '~/mocks/project'

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const colorMode = useColorMode()
const isDark = ref(false)
const { locale } = useI18n()
const selectedLang = ref(locale.value)

// 🟢 Load ngôn ngữ từ localStorage NGAY khi component setup (nếu đang client)
if (process.client) {
  const saved = localStorage.getItem('lang')
  if (saved === 'vi' || saved === 'en') {
    selectedLang.value = saved
    locale.value = saved
  }
}
const menuItems = [ { labelKey: 'menu.projects', to: '/projects' }, { labelKey: 'menu.knowledge', to: '/knowledge' }, { labelKey: 'menu.recruitment', to: '/recruitment' }, { labelKey: 'menu.info', to: '/info' }, { labelKey: 'menu.contact', to: '/contact' } ]
const toggleLanguage = () => {
  selectedLang.value = selectedLang.value === 'vi' ? 'en' : 'vi'
  locale.value = selectedLang.value
  if (process.client) {
    localStorage.setItem('lang', selectedLang.value)
  }
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const toggleDarkMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const isSearchOpen = ref(false)
const searchQuery = ref('')
const searchResults = ref<any[]>([])
const router = useRouter()

const performSearch = () => {
  const query = searchQuery.value.trim().toLowerCase()
  if (!query) {
    searchResults.value = []
    return
  }

  const results: any[] = []
  for (const category of categories) {
    for (const project of category.projects) {
      const nameVi = project.name_vn?.toLowerCase() || ''
      const nameEn = project.name_en?.toLowerCase() || ''
      const matched = nameVi.includes(query) || nameEn.includes(query)
      if (matched) {
        results.push({
          id: project.id,
          name_vn: project.name_vn,
          name_en: project.name_en,
          image: project.image,
          slug: project.slug
        })
      }
    }
  }
  searchResults.value = results
}

const selectResult = (result: any) => {
  if (result?.slug) {
    router.push(`/projects/${result.slug}`)
  }
  isSearchOpen.value = false
  searchQuery.value = ''
  searchResults.value = []
}

// Đóng overlay khi nhấn ESC
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && isSearchOpen.value) {
    isSearchOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>


<template>
  <header :class="[
    'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out',
    isScrolled
      ? 'bg-white/95 backdrop-blur-md shadow-lg'
      : 'bg-white'
  ]">
    <UContainer>
      <!-- Top Row -->
      <div :class="[
        'mb-1 flex items-center justify-between border-b border-white/10 transition-all duration-500 ease-in-out',
        isScrolled ? 'h-12' : 'h-20'
      ]">
        <!-- Left: Language -->
        <div class="flex flex-1">
          <button @click="toggleLanguage" :class="[
            'group flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 hover:scale-105',
            isScrolled
              ? 'text-gray-800 hover:bg-gray-100'
              : 'text-gray-800 hover:bg-white/10'
          ]">
            <UIcon name="i-heroicons-language" class="w-5 h-5" />
            <span class="font-light tracking-wide text-sm uppercase">
              {{ selectedLang === 'vi' ? 'VI' : 'EN' }}
            </span>
            <UIcon name="i-heroicons-chevron-down"
              class="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
          </button>

          <!-- <button @click="toggleDarkMode" :class="[
            'group flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 hover:scale-105',
            isScrolled
              ? 'text-gray-800 hover:bg-gray-100'
              : 'text-gray-800 hover:bg-white/10'
          ]">
            <UIcon :name="colorMode.value === 'dark' ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
              class="w-5 h-5" />
            <span class="font-light tracking-wide text-sm uppercase">
              {{ colorMode.value === 'dark' ? 'Dark' : 'Light' }}
            </span>
          </button> -->
          <!-- <h1>Color mode: {{ $colorMode.value }}</h1> -->
        </div>

        <!-- Center: Logo -->
        <div class="flex-1 flex justify-center">
          <NuxtLink to="/" class="shrink-0">
            <img :src="ImageLogo" alt="Logo" class="transition-all duration-500 ease-in-out mt-1" :class="[
              isScrolled
                ? 'w-[100px] md:w-[160px] opacity-90'
                : 'w-[140px] md:w-[220px] opacity-100'
            ]" />
          </NuxtLink>
        </div>

        <!-- Right: Contact -->
        <div class="flex-1 flex justify-end items-center">
          <div :class="[
            'hidden md:flex items-center gap-2 text-sm font-light tracking-wide transition-colors duration-300',
            isScrolled ? 'text-gray-800' : 'text-gray-800'
          ]">
            <UButton icon="i-heroicons-magnifying-glass" variant="ghost" color="neutral" square
              @click="isSearchOpen = true" />
            <UIcon name="i-heroicons-phone" class="w-4 h-4" />
            <span class="uppercase">Contact</span>
            <span>|</span>
            <a href="tel:0785968888" class="hover:opacity-70 transition-opacity">
              0785 96 8888
            </a>
          </div>



          <!-- Mobile Menu Button -->
          <UButton icon="i-heroicons-magnifying-glass" variant="ghost" color="neutral" class="md:hidden mr-1"
            @click="isSearchOpen = true" square />
          <UButton :icon="isMobileMenuOpen ? 'i-heroicons-x-mark' : 'i-heroicons-bars-3'" variant="ghost"
            color="neutral" class="md:hidden" @click="isMobileMenuOpen = !isMobileMenuOpen" square />
        </div>
      </div>

      <!-- Menu -->
      <nav class="hidden md:flex items-center justify-center h-16 space-x-10 transition-all duration-500" :class="[
        isScrolled ? 'mb-[-2%]' : 'mb-[-5%]'
      ]">
        <NuxtLink v-for="item in menuItems" :key="item.labelKey" :to="item.to" :class="[
          ' text-sm tracking-widest uppercase font-light transition-all duration-300 hover:tracking-wider relative group',
          isScrolled
            ? 'text-gray-800 hover:text-black mt-[-10px]'
            : 'text-black hover:text-gray-700'
        ]">
          {{ $t(item.labelKey) }}
          <span :class="[
            'absolute bottom-0 left-0 w-0 h-px transition-all duration-300 group-hover:w-full',
            isScrolled ? 'bg-black' : 'bg-black'
          ]" />
        </NuxtLink>
      </nav>
      
      <!-- Mobile Menu Panel -->
      <div v-if="isMobileMenuOpen" class="md:hidden px-2 pb-3">
        <div class="mt-2 rounded-lg bg-white shadow-lg ring-1 ring-black/5 overflow-hidden">
          <nav class="flex flex-col">
            <NuxtLink
              v-for="item in menuItems"
              :key="`m-` + item.labelKey"
              :to="item.to"
              class="px-4 py-3 text-sm uppercase tracking-widest text-gray-800 hover:bg-gray-100"
              @click="isMobileMenuOpen = false"
            >
              {{ $t(item.labelKey) }}
            </NuxtLink>
          </nav>
        </div>
      </div>
    </UContainer>

    <!-- Decorative Line -->
    <div :class="[
      'h-px transition-opacity duration-500',
      isScrolled
        ? 'opacity-100 bg-linear-to-r from-transparent via-amber-600 to-transparent'
        : 'opacity-0'
    ]" />

  </header>
  <div v-if="isSearchOpen" class="fixed inset-0 z-60" aria-modal="true" role="dialog"
    @click.self="isSearchOpen = false">
    <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
    <div class="relative mx-auto mt-0 md:mt-24 w-full max-w-2xl md:rounded-lg bg-white p-4 shadow-xl">
      <div class="flex items-center justify-between mb-3">
        <div class="text-base font-medium">{{ selectedLang === 'vi' ? 'Tìm kiếm dự án' : 'Search projects' }}</div>
        <button class="p-2 rounded-full  active:bg-gray-200 transition cursor-pointer" aria-label="Đóng tìm kiếm"
          @click="isSearchOpen = false">
          <UIcon name="i-heroicons-x-mark" class="w-5 h-5 text-gray-700" />
        </button>
      </div>

      <div class="relative w-full">
        <!-- Icon tìm kiếm ở bên trái (pointer-events-none để click không chặn input) -->
        <span class="absolute left-3 inset-y-0 flex items-center pointer-events-none">
          <!-- Heroicons: magnifying-glass (outline) -->
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-4.35-4.35M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14z" />
          </svg>
        </span>

        <input v-model="searchQuery" :placeholder="selectedLang === 'vi' ? 'Nhập tên dự án' : 'Enter project name'" autofocus @input="performSearch"
          @keyup.enter="performSearch"
          class="w-full bg-transparent border-0 border-b-2 border-black text-gray-900 focus:outline-none focus:ring-0 focus:border-black placeholder-gray-400 transition-colors duration-200 pl-10 py-2 text-base"
          aria-label="Tìm kiếm dự án" />
      </div>

      <div v-if="searchResults.length" class="mt-4 max-h-80 overflow-auto">
        <div v-for="result in searchResults" :key="result.id"
          class="flex items-center gap-3 p-2 rounded hover:bg-gray-100 cursor-pointer" @click="selectResult(result)">
          <img :src="result.image" alt="thumb" class="w-12 h-12 object-cover rounded" />
          <div class="text-sm">
            <div class="font-medium">{{ selectedLang === 'vi' ? result.name_vn : result.name_en }}</div>
          </div>
        </div>
      </div>

      <div v-else-if="searchQuery" class="mt-4 text-sm text-gray-500">
        Không tìm thấy kết quả phù hợp.
      </div>
    </div>
  </div>
</template>

<style scoped>
.font-serif {
  font-family: 'Playfair Display', 'Georgia', serif;
}
</style>
