<script setup lang="ts">
import ImageLogo from '~/assets/images/logo__Artboard 5.png'
const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})

const handleScroll = () => {
    isScrolled.value = window.scrollY > 20
}

const languages = [
    { value: 'vi', label: 'Tiếng Việt' },
    { value: 'en', label: 'English' }
]

const menuItems = [
    { labelKey: 'menu.projects', to: '/projects' },
    { labelKey: 'menu.knowledge', to: '/knowledge' },
    { labelKey: 'menu.recruitment', to: '/recruitment' },
    { labelKey: 'menu.info', to: '/info' },
    { labelKey: 'menu.contact', to: '/contact' }
]

const { locale } = useI18n()
const selectedLang = ref(locale.value)
const toggleLanguage = () => {
    selectedLang.value = selectedLang.value === 'vi' ? 'en' : 'vi'
    locale.value = selectedLang.value
}
onMounted(() => {
    const saved = localStorage.getItem('lang')
    if (saved === 'vi' || saved === 'en') {
        selectedLang.value = saved
        locale.value = saved
    }
})


</script>

<template>
    <header :class="[
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg'
            : 'bg-gradient-to-b from-black/50 to-transparent'
    ]">
        <UContainer>
            <!-- Top Row: Language Selector | Logo | Contact Info -->
            <div class="flex items-center justify-between h-20 border-b border-white/10">
                <!-- Left: Language Selector -->
                <div class="flex-1">
                    <button @click="toggleLanguage" :class="[
                        'group flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 hover:scale-105',
                        isScrolled
                            ? 'text-gray-800 hover:bg-gray-100'
                            : 'text-white hover:bg-white/10'
                    ]">
                        <UIcon name="i-heroicons-language" class="w-5 h-5" />
                        <span class="font-light tracking-wide text-sm uppercase">
                            {{ selectedLang === 'vi' ? 'VI' : 'EN' }}
                        </span>
                        <UIcon name="i-heroicons-chevron-down"
                            class="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
                    </button>

                </div>
                <!-- Center: Logo -->
                <div class="flex-1 flex justify-center">
                    <NuxtLink to="/" class="flex-shrink-0">
                        <img :src="ImageLogo" alt="Logo" class="hidden md:block w-[200px] h-auto mt-1" />
                    </NuxtLink>
                </div>


                <!-- Right: Contact Info -->
                <div class="flex-1 flex justify-end items-center">
                    <div :class="[
                        'hidden md:flex items-center gap-2 text-sm font-light tracking-wide transition-colors duration-300',
                        isScrolled ? 'text-gray-800' : 'text-white'
                    ]">
                        <UButton icon="i-heroicons-magnifying-glass" variant="ghost" color="black" square />
                        <UIcon name="i-heroicons-phone" class="w-4 h-4" />
                        <span class="uppercase">Contact</span>
                        <span>|</span>
                        <a href="tel:0785968888" class="hover:opacity-70 transition-opacity">
                            0785 96 8888
                        </a>
                    </div>

                    <!-- Mobile Menu Button -->
                    <UButton :icon="isMobileMenuOpen ? 'i-heroicons-x-mark' : 'i-heroicons-bars-3'" variant="ghost"
                        :color="isScrolled ? 'black' : 'white'" class="md:hidden ml-4"
                        @click="isMobileMenuOpen = !isMobileMenuOpen" square />
                </div>
            </div>

            <!-- Bottom Row: Navigation Menu (Desktop) -->
            <nav class="hidden md:flex items-center justify-center h-16 space-x-8">
                <NuxtLink v-for="item in menuItems" :key="item.labelKey" :to="item.to" :class="[
                    'text-sm tracking-widest uppercase font-light transition-all duration-300 hover:tracking-wider relative group',
                    isScrolled ? 'text-gray-800 hover:text-black' : 'text-black hover:text-gray-700'
                ]">
                    {{ $t(item.labelKey) }}
                    <span :class="[
                        'absolute bottom-0 left-0 w-0 h-px transition-all duration-300 group-hover:w-full',
                        isScrolled ? 'bg-black' : 'bg-black'
                    ]" />
                </NuxtLink>

            </nav>
        </UContainer>

        <!-- Mobile Menu -->
        <Transition enter-active-class="transition-all duration-500 ease-out" enter-from-class="max-h-0 opacity-0"
            enter-to-class="max-h-[32rem] opacity-100" leave-active-class="transition-all duration-500 ease-in"
            leave-from-class="max-h-[32rem] opacity-100" leave-to-class="max-h-0 opacity-0">
            <div v-show="isMobileMenuOpen" class="md:hidden overflow-hidden">
                <div class="px-4 pt-4 pb-6 space-y-4 bg-white shadow-lg">
                    <NuxtLink v-for="item in menuItems" :key="item.label" :to="item.to"
                        class="block text-gray-800 text-sm tracking-widest uppercase font-light hover:text-black hover:pl-2 transition-all duration-300"
                        @click="isMobileMenuOpen = false">
                        {{ item.label }}
                    </NuxtLink>

                    <div class="pt-4 border-t border-gray-200">
                        <a href="tel:0785968888"
                            class="flex items-center gap-2 text-gray-800 hover:text-black transition-colors">
                            <UIcon name="i-heroicons-phone" class="w-5 h-5" />
                            <span class="text-sm">
                                <span class="uppercase font-semibold">Contact</span>
                                <span class="mx-2">|</span>
                                <span>0785 96 8888</span>
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </Transition>

        <!-- Decorative Line -->
        <div :class="[
            'h-px transition-opacity duration-500',
            isScrolled ? 'opacity-100 bg-gradient-to-r from-transparent via-amber-600 to-transparent' : 'opacity-0'
        ]" />
    </header>
</template>

<style scoped>
.font-serif {
    font-family: 'Playfair Display', 'Georgia', serif;
}
</style>