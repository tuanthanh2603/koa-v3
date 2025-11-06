<script setup lang="ts">
import ImageLogo from '~/assets/images/logo__Artboard 5.png'
import ImageLogoDark from '~/assets/images/logo__Artboard 52.png'
import { categories } from '~/mocks/project'

// ============ State Management ============
const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const colorMode = useColorMode()
const isHydrated = ref(false) // ✅ Track hydration status
const { locale } = useI18n()
const selectedLang = ref(locale.value)

const isSearchOpen = ref(false)
const searchQuery = ref('')
const searchResults = ref<any[]>([])
const router = useRouter()

// ============ Menu Items ============
const menuItems = [
  { labelKey: 'menu.projects', to: '/projects' },
  { labelKey: 'menu.knowledge', to: '/knowledge' },
  { labelKey: 'menu.recruitment', to: '/recruitment' },
  { labelKey: 'menu.info', to: '/info' },
  { labelKey: 'menu.contact', to: '/contact' }
]

// ============ Language Management ============
const toggleLanguage = () => {
  selectedLang.value = selectedLang.value === 'vi' ? 'en' : 'vi'
  locale.value = selectedLang.value
  if (process.client) {
    localStorage.setItem('lang', selectedLang.value)
  }
}

// ============ Color Mode Management ============
const toggleDarkMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  if (process.client) {
    localStorage.setItem('nuxt-color-mode', colorMode.preference)
  }
}

// ============ Scroll Detection ============
const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

// ============ Search Functionality ============
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

// ============ Keyboard Shortcuts ============
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && isSearchOpen.value) {
    isSearchOpen.value = false
  }
}

// ============ Lifecycle Hooks ============
onMounted(() => {
  // Load language from localStorage
  if (process.client) {
    const saved = localStorage.getItem('lang')
    if (saved === 'vi' || saved === 'en') {
      selectedLang.value = saved
      locale.value = saved
    }

    // Load color mode from localStorage
    const savedColorMode = localStorage.getItem('nuxt-color-mode')
    if (savedColorMode === 'dark' || savedColorMode === 'light') {
      colorMode.preference = savedColorMode
    }

    // ✅ Đánh dấu đã hydrate xong
    isHydrated.value = true
  }

  // Event listeners
  window.addEventListener('scroll', handleScroll)
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <!-- ✅ Chỉ render khi đã hydrate xong -->
  <header v-if="isHydrated" :class="[
    'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out',
    isScrolled
      ? colorMode.value === 'dark'
        ? 'bg-slate-900/95 backdrop-blur-md shadow-lg'
        : 'bg-white/95 backdrop-blur-md shadow-lg'
      : colorMode.value === 'dark'
        ? 'bg-slate-950'
        : 'bg-white'
  ]">
    <div class="border-b transition-all duration-500 ease-in-out"
      :class="[
        isScrolled
          ? colorMode.value === 'dark'
            ? 'border-slate-700/50'
            : 'border-white/10'
          : colorMode.value === 'dark'
            ? 'border-slate-700/30'
            : 'border-white/10'
      ]">
      <UContainer>
        <!-- Top Row -->
        <div :class="[
          'mb-1 flex items-center justify-between transition-all duration-500 ease-in-out',
          isScrolled ? 'h-12' : 'h-20'
        ]">
        <!-- Left: Language & Dark Mode Buttons -->
        <div class="flex flex-1">
          <!-- Language Toggle -->
          <button 
            @click="toggleLanguage" 
            :class="[
              'group flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 hover:scale-105',
              isScrolled
                ? colorMode.value === 'dark'
                  ? 'text-slate-200 hover:bg-slate-800'
                  : 'text-gray-800 hover:bg-gray-100'
                : colorMode.value === 'dark'
                  ? 'text-slate-300 hover:bg-slate-800/50'
                  : 'text-gray-800 hover:bg-white/10'
            ]"
          >
            <UIcon name="i-heroicons-language" class="w-5 h-5" />
            <span class="font-light tracking-wide text-sm uppercase">
              {{ selectedLang === 'vi' ? 'VI' : 'EN' }}
            </span>
            <!-- <UIcon 
              name="i-heroicons-chevron-down"
              class="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" 
            /> -->
          </button>

          <!-- Dark Mode Toggle -->
          <button 
            @click="toggleDarkMode" 
            :class="[
              'group flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 hover:scale-105',
              isScrolled
                ? colorMode.value === 'dark'
                  ? 'text-slate-200 hover:bg-slate-800'
                  : 'text-gray-800 hover:bg-gray-300'
                : colorMode.value === 'dark'
                  ? 'text-slate-300 hover:bg-slate-800/50'
                  : 'text-gray-800 hover:bg-white/10'
            ]"
          >
            <UIcon 
              :name="colorMode.value === 'dark' ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
              class="w-5 h-5" 
            />
            <!-- <span class="font-light tracking-wide text-sm uppercase">
              {{ colorMode.value === 'dark' ? 'Dark' : 'Light' }}
            </span> -->
          </button>
        </div>

        <!-- Center: Logo -->
        <div class="flex-1 flex justify-center">
          <NuxtLink to="/" class="shrink-0">
            <img 
              :src="colorMode.value === 'dark' ? ImageLogoDark : ImageLogo" 
              alt="Logo" 
              class="transition-all duration-500 ease-in-out mt-1" 
              :class="[
                isScrolled
                  ? 'w-[100px] md:w-[160px] opacity-90'
                  : 'w-[140px] md:w-[220px] opacity-100'
              ]" 
            />
          </NuxtLink>
        </div>

        <!-- Right: Contact & Search -->
        <div class="flex-1 flex justify-end items-center gap-2">
          <!-- Desktop Contact Info -->
          <div :class="[
            'hidden md:flex items-center gap-2 text-sm font-light tracking-wide transition-colors duration-300',
            colorMode.value === 'dark'
              ? 'text-slate-200'
              : 'text-gray-800'
          ]">
            <UButton 
              icon="i-heroicons-magnifying-glass" 
              variant="ghost" 
              :color="colorMode.value === 'dark' ? 'gray' : 'neutral'" 
              square
              @click="isSearchOpen = true" 
            />
            <UIcon name="i-heroicons-phone" class="w-4 h-4" />
            <span class="uppercase">Contact</span>
            <span>|</span>
            <a href="tel:0785968888" class="hover:opacity-70 transition-opacity">
              0785 96 8888
            </a>
          </div>

          <!-- Mobile Search & Menu Button -->
          <UButton 
            icon="i-heroicons-magnifying-glass" 
            variant="ghost" 
            :color="colorMode.value === 'dark' ? 'gray' : 'neutral'" 
            class="md:hidden" 
            @click="isSearchOpen = true" 
            square 
          />
          <UButton 
            :icon="isMobileMenuOpen ? 'i-heroicons-x-mark' : 'i-heroicons-bars-3'" 
            variant="ghost"
            :color="colorMode.value === 'dark' ? 'gray' : 'neutral'" 
            class="md:hidden" 
            @click="isMobileMenuOpen = !isMobileMenuOpen" 
            square 
          />
        </div>
      </div>

      <!-- Desktop Navigation Menu -->
      <nav 
        class="hidden md:flex items-center justify-center h-16 space-x-10 transition-all duration-500" 
        :class="isScrolled ? 'mb-[-2%]' : 'mb-[-5%]'"
      >
        <NuxtLink 
          v-for="item in menuItems" 
          :key="item.labelKey" 
          :to="item.to" 
          :class="[
            'text-sm tracking-widest uppercase font-light transition-all duration-300 hover:tracking-wider relative group',
            isScrolled
              ? colorMode.value === 'dark'
                ? 'text-slate-200 hover:text-white mt-[-10px]'
                : 'text-gray-800 hover:text-black mt-[-10px]'
              : colorMode.value === 'dark'
                ? 'text-slate-300 hover:text-white'
                : 'text-black hover:text-gray-700'
          ]"
        >
          {{ $t(item.labelKey) }}
          <span 
            :class="[
              'absolute bottom-0 left-0 w-0 h-px transition-all duration-300 group-hover:w-full',
              colorMode.value === 'dark' ? 'bg-white' : 'bg-black'
            ]" 
          />
        </NuxtLink>
      </nav>

      <!-- Mobile Navigation Menu -->
      <div v-if="isMobileMenuOpen" class="md:hidden px-2 pb-3">
        <div :class="[
          'mt-2 rounded-lg shadow-lg ring-1 overflow-hidden transition-all duration-300',
          colorMode.value === 'dark'
            ? 'bg-slate-800 ring-slate-700'
            : 'bg-white ring-black/5'
        ]">
          <nav class="flex flex-col">
            <NuxtLink
              v-for="item in menuItems"
              :key="`mobile-${item.labelKey}`"
              :to="item.to"
              :class="[
                'px-4 py-3 text-sm uppercase tracking-widest transition-colors duration-200',
                colorMode.value === 'dark'
                  ? 'text-slate-200 hover:bg-slate-700'
                  : 'text-gray-800 hover:bg-gray-100'
              ]"
              @click="isMobileMenuOpen = false"
            >
              {{ $t(item.labelKey) }}
            </NuxtLink>
          </nav>
        </div>
      </div>
    </UContainer>
    </div>

    <!-- Decorative Line -->
    <div :class="[
      'h-px transition-opacity duration-500',
      isScrolled
        ? colorMode.value === 'dark'
          ? 'opacity-100 bg-linear-to-r from-transparent via-amber-500/50 to-transparent'
          : 'opacity-100 bg-linear-to-r from-transparent via-amber-600 to-transparent'
        : 'opacity-0'
    ]" />
  </header>

  <!-- Search Modal (Teleported to body) -->
  <Teleport to="body">
    <div 
      v-if="isSearchOpen" 
      class="fixed inset-0 z-60" 
      aria-modal="true" 
      role="dialog"
      @click.self="isSearchOpen = false"
    >
      <!-- Backdrop -->
      <div :class="[
        'absolute inset-0 backdrop-blur-sm transition-colors duration-300',
        colorMode.value === 'dark' ? 'bg-black/70' : 'bg-black/50'
      ]"></div>

      <!-- Search Panel -->
      <div :class="[
        'relative mx-auto mt-0 md:mt-24 w-full max-w-2xl md:rounded-lg p-4 shadow-xl transition-all duration-300',
        colorMode.value === 'dark' ? 'bg-slate-800' : 'bg-white'
      ]">
        <!-- Header -->
        <div class="flex items-center justify-between mb-4">
          <h2 :class="[
            'text-base font-semibold transition-colors duration-300',
            colorMode.value === 'dark' ? 'text-slate-100' : 'text-gray-900'
          ]">
            {{ selectedLang === 'vi' ? 'Tìm kiếm dự án' : 'Search projects' }}
          </h2>
          <button 
            :class="[
              'p-2 rounded-full transition-all duration-200 cursor-pointer',
              colorMode.value === 'dark'
                ? 'hover:bg-slate-700 active:bg-slate-600'
                : 'hover:bg-gray-100 active:bg-gray-200'
            ]"
            aria-label="Close search"
            @click="isSearchOpen = false"
          >
            <UIcon 
              name="i-heroicons-x-mark" 
              :class="[
                'w-5 h-5',
                colorMode.value === 'dark' ? 'text-slate-300' : 'text-gray-700'
              ]" 
            />
          </button>
        </div>

        <!-- Search Input -->
        <div class="relative w-full mb-4">
          <span :class="[
            'absolute left-3 inset-y-0 flex items-center pointer-events-none',
            colorMode.value === 'dark' ? 'text-slate-500' : 'text-gray-500'
          ]">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-4.35-4.35M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14z" />
            </svg>
          </span>

          <input 
            v-model="searchQuery" 
            :placeholder="selectedLang === 'vi' ? 'Nhập tên dự án' : 'Enter project name'" 
            autofocus 
            @input="performSearch"
            @keyup.enter="performSearch"
            :class="[
              'w-full bg-transparent border-0 border-b-2 focus:outline-none focus:ring-0 pl-10 py-2 text-base transition-colors duration-200',
              colorMode.value === 'dark'
                ? 'border-slate-600 text-slate-100 placeholder-slate-500 focus:border-slate-400'
                : 'border-black text-gray-900 placeholder-gray-400 focus:border-black'
            ]"
            aria-label="Search projects" 
          />
        </div>

        <!-- Search Results -->
        <div v-if="searchResults.length" class="max-h-96 overflow-y-auto">
          <div 
            v-for="result in searchResults" 
            :key="result.id"
            :class="[
              'flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors duration-200',
              colorMode.value === 'dark'
                ? 'hover:bg-slate-700'
                : 'hover:bg-gray-100'
            ]"
            @click="selectResult(result)"
          >
            <img :src="result.image" alt="Project thumbnail" class="w-12 h-12 object-cover rounded-md flex-shrink-0" />
            <div>
              <p :class="[
                'text-sm font-medium transition-colors duration-300',
                colorMode.value === 'dark' ? 'text-slate-100' : 'text-gray-900'
              ]">
                {{ selectedLang === 'vi' ? result.name_vn : result.name_en }}
              </p>
            </div>
          </div>
        </div>

        <!-- No Results Message -->
        <div v-else-if="searchQuery" :class="[
          'text-center py-8 text-sm transition-colors duration-300',
          colorMode.value === 'dark' ? 'text-slate-500' : 'text-gray-500'
        ]">
          {{ selectedLang === 'vi' ? 'Không tìm thấy kết quả phù hợp.' : 'No matching results found.' }}
        </div>

        <!-- Empty State -->
        <div v-else :class="[
          'text-center py-8 text-sm transition-colors duration-300',
          colorMode.value === 'dark' ? 'text-slate-500' : 'text-gray-500'
        ]">
          {{ selectedLang === 'vi' ? 'Nhập tên dự án để tìm kiếm' : 'Enter a project name to search' }}
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.font-serif {
  font-family: 'Playfair Display', 'Georgia', serif;
}

/* Smooth scrolling for results */
div::-webkit-scrollbar {
  width: 6px;
}

div::-webkit-scrollbar-track {
  background: transparent;
}

div::-webkit-scrollbar-thumb {
  background: rgba(156, 163, 175, 0.4);
  border-radius: 3px;
}

div::-webkit-scrollbar-thumb:hover {
  background: rgba(156, 163, 175, 0.6);
}
</style>