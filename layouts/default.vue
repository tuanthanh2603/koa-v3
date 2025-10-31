<script setup lang="ts">
import Header from '~/components/Header.vue';
</script>
<template>
    <section>
        <Header />
        <div class="min-h-screen bg-white pt-[22%] px-2 md:px-4 md:py-[12%]">
            <slot />
        </div>
    </section>
</template>