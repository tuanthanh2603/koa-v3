<script setup lang="ts">
import BG1 from '~/assets/images/bg-1.jpg'
import Logo1 from '~/assets/images/logo__Artboard 4.png'
import Logo2 from '~/assets/images/logo__Artboard 52.png'
import HomePage2 from '~/components/HomePage2.vue'

definePageMeta({
  layout: false,
})

const showSplash = ref(true)
const fadeOut = ref(false)
const showMenu = ref(false)
const showButtonMenu = ref(false)
const showLogo2 = ref(false)
const homePageRef = ref<HTMLElement>()

const menuItems = [
  { labelKey: 'menu.projects', to: '/projects' },
  { labelKey: 'menu.knowledge', to: '/knowledge' },
  { labelKey: 'menu.recruitment', to: '/recruitment' },
  { labelKey: 'menu.info', to: '/info' },
  { labelKey: 'menu.contact', to: '/contact' }
]

// Scroll to HomePage2
const scrollToHomePage = () => {
  if (homePageRef.value) {
    homePageRef.value.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

onMounted(() => {
  // Sử dụng requestAnimationFrame để schedule animation tối ưu
  requestAnimationFrame(() => {
    setTimeout(() => {
      fadeOut.value = true
    }, 1500)

    setTimeout(() => {
      showSplash.value = false
      // Tách riêng việc show logo2 để không quá tải
      requestAnimationFrame(() => {
        showLogo2.value = true
      })
      requestAnimationFrame(() => {
        showButtonMenu.value = true
      })
    }, 2000)
  })
})
</script>

<template>
  <div class="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth">
    <section class="relative h-screen snap-start flex items-center justify-center text-white text-3xl">
      
      <!-- Splash Screen - Đơn giản hóa transition -->
      <Transition 
        enter-active-class="transition-opacity duration-500" 
        enter-from-class="opacity-0"
        enter-to-class="opacity-100" 
        leave-active-class="transition-opacity duration-500" 
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
        @leave-end="() => {/* cleanup nếu cần */}"
      >
        <div v-if="showSplash" class="fixed inset-0 z-50 bg-white flex items-center justify-center">
          <img 
            :src="Logo1" 
            alt="Logo" 
            class="w-[400px] h-auto will-change-transform"
            style="animation: scaleIn 0.8s ease-out forwards;"
          />
        </div>
      </Transition>

      <!-- Main Content -->
      <!-- Background - Sử dụng will-change & contain -->
      <div v-if="!showSplash" class="relative w-full h-screen contain-layout">
        <img 
          :src="BG1" 
          alt="Background Image" 
          class="w-full h-screen object-cover will-change-transform"
          style="animation: reveal-vertical 0.8s ease-out forwards;"
          loading="eager"
        />
      </div>

      <!-- Logo nổi trên cùng - Tối ưu transition -->
      <Transition 
        enter-active-class="transition-all duration-700 ease-out" 
        enter-from-class="opacity-0 scale-75"
        enter-to-class="opacity-100 scale-100"
        mode="out-in"
      >
        <div v-if="showLogo2" class="absolute top-[5%] left-1/2 transform -translate-x-1/2 z-50 will-change-transform">
          <img 
            :src="Logo1" 
            alt="Logo"
            class="w-[350px] h-auto brightness-150 drop-shadow-[0_4px_15px_rgba(255,255,255,0.8)]"
            decoding="async"
          />
        </div>
      </Transition>

      <!-- Button - Tối ưu transition -->
      <Transition 
        enter-active-class="transition-all duration-700 ease-out" 
        enter-from-class="opacity-0 scale-75"
        enter-to-class="opacity-100 scale-100"
        mode="out-in"
      >
        <button 
          v-if="showLogo2"
          @click="scrollToHomePage"
          class="text-sm absolute bottom-[24%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 px-8 py-1 border-2 border-white text-white font-semibold hover:bg-white hover:text-black transition duration-300 flex items-center gap-2 group will-change-transform"
        >
          Khám phá
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            class="h-4 w-4 group-hover:scale-125 transition duration-300"
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </Transition>

      <!-- Toggle Menu Button -->
      <button 
        v-if="showButtonMenu" 
        @click="showMenu = !showMenu"
        class="fixed top-4 right-4 z-50 text-white bg-black/50 p-3 rounded-full hover:bg-black/70 transition flex items-center justify-center"
      >
        <svg 
          v-if="!showMenu" 
          xmlns="http://www.w3.org/2000/svg" 
          class="h-6 w-6" 
          fill="none" 
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg 
          v-else 
          xmlns="http://www.w3.org/2000/svg" 
          class="h-6 w-6" 
          fill="none" 
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Menu Overlay -->
      <transition name="fade">
        <div v-if="showMenu" class="fixed inset-0 z-40 flex flex-col justify-between">
          <div class="absolute inset-0 bg-black/70" @click="showMenu = false"></div>

          <transition name="slide">
            <div class="relative z-40 flex flex-col items-center justify-center flex-1 space-y-6">
              <NuxtLink 
                v-for="item in menuItems" 
                :key="item.labelKey" 
                :to="item.to" 
                class="text-base tracking-widest uppercase font-light transition-all duration-300 hover:tracking-wider relative group text-gray-200 hover:text-white"
              >
                {{ $t(item.labelKey) }}
                <span class="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
              </NuxtLink>
            </div>
          </transition>

          <div class="relative z-40 p-6 w-full flex justify-between items-center text-sm text-gray-200">
            <div class="px-5">© 2025 KOA. All rights reserved.</div>
            <div class="flex space-x-4 px-5">
              <a href="https://facebook.com" target="_blank" class="hover:text-blue-500 transition mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 5.01 3.657 9.163 8.438 9.878v-6.987h-2.54v-2.891h2.54V9.797c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.464h-1.26c-1.243 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.891h-2.33v6.987C18.343 21.163 22 17.01 22 12z" />
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" class="hover:text-pink-400 transition mt-[1px]">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.056 1.97.24 2.433.415a4.918 4.918 0 011.775 1.175 4.918 4.918 0 011.175 1.775c.175.463.36 1.263.415 2.433.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.056 1.17-.24 1.97-.415 2.433a4.918 4.918 0 01-1.175 1.775 4.918 4.918 0 01-1.775 1.175c-.463.175-1.263.36-2.433.415-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.056-1.97-.24-2.433-.415a4.918 4.918 0 01-1.775-1.175 4.918 4.918 0 01-1.175-1.775c-.175-.463-.36-1.263-.415-2.433C2.175 15.747 2.163 15.367 2.163 12s.012-3.584.07-4.85c.056-1.17.24-1.97.415-2.433a4.918 4.918 0 011.175-1.775 4.918 4.918 0 011.775-1.175c.463-.175 1.263-.36 2.433-.415C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.77.131 4.842.346 4.042.698a6.918 6.918 0 00-2.51 1.63 6.918 6.918 0 00-1.63 2.51C-.346 5.158-.131 6.086-.072 7.368.013 8.648 0 9.057 0 12s.013 3.352.072 4.632c.059 1.282.274 2.21.626 3.01a6.918 6.918 0 001.63 2.51 6.918 6.918 0 002.51 1.63c.8.352 1.728.567 3.01.626C8.648 23.987 9.057 24 12 24s3.352-.013 4.632-.072c1.282-.059 2.21-.274 3.01-.626a6.918 6.918 0 002.51-1.63 6.918 6.918 0 001.63-2.51c.352-.8.567-1.728.626-3.01.059-1.28.072-1.689.072-4.632s-.013-3.352-.072-4.632c-.059-1.282-.274-2.21-.626-3.01a6.918 6.918 0 00-1.63-2.51 6.918 6.918 0 00-2.51-1.63c-.8-.352-1.728-.567-3.01-.626C15.352.013 14.943 0 12 0z" />
                  <path d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998z" />
                  <circle cx="18.406" cy="5.594" r="1.44" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </transition>
    </section>
    <section ref="homePageRef">
      <HomePage2 />
    </section>
  </div>
</template>

<style scoped>
@keyframes scaleIn {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-scale-in {
  animation: scaleIn 0.8s ease-out forwards;
}

/* Thay clip-path bằng transform + opacity (hiệu suất tốt hơn) */
@keyframes reveal-vertical {
  0% {
    opacity: 0;
    transform: scaleY(0.5);
  }
  100% {
    opacity: 1;
    transform: scaleY(1);
  }
}

.reveal-vertical {
  animation: reveal-vertical 0.8s ease-out forwards;
  transform-origin: center;
}

@keyframes fadeOut {
  from { opacity: 1; }
  to { opacity: 0; }
}

.animate-fade-out {
  animation: fadeOut 0.5s ease-out forwards;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.slide-enter-from {
  transform: translateY(-20px);
  opacity: 0;
}

.slide-enter-to {
  transform: translateY(0);
  opacity: 1;
}

.slide-leave-from {
  transform: translateY(0);
  opacity: 1;
}

.slide-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

.scroll-smooth {
  scroll-behavior: smooth;
}

/* Performance optimizations */
.will-change-transform {
  will-change: transform;
}

.contain-layout {
  contain: layout style paint;
}
</style>