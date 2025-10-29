<script setup lang="ts">
import { ref } from 'vue'

const hoveredIndex = ref<number | null>(null)
</script>

<template>
    <section class="h-screen snap-start flex items-center justify-center text-white text-3xl">
        <div class="grid grid-cols-5 w-full h-full">
            <div 
                v-for="(item, index) in [
                    { label: 'Dự án', image: '/images/PK_SKYVIEW1.jpg' },
                    { label: 'Kiến thức', image: '/images/PK_SKYVIEW6.jpg' },
                    { label: 'Tuyển dụng', image: '/images/PK_SKYVIEW6.jpg' },
                    { label: 'Thông tin', image: '/images/PLV_SKYVIEW4.jpg' },
                    { label: 'Liên hệ', image: '/images/PK_SKYVIEW1.jpg' }
                ]"
                :key="index"
                class="flex items-center justify-center bg-center bg-cover cursor-pointer transition-all duration-300 relative overflow-hidden"
                :style="{
                    backgroundImage: `url('${item.image}')`,
                    filter: hoveredIndex === null ? 'brightness(0.4)' : (hoveredIndex === index ? 'brightness(1)' : 'brightness(0.4)')
                }"
                @mouseenter="hoveredIndex = index"
                @mouseleave="hoveredIndex = null"
            >
                <h3 class="bg-black/50 p-4 rounded-lg hover:bg-black/70 transition-colors">
                    {{ item.label }}
                </h3>
            </div>
        </div>
    </section>
</template>