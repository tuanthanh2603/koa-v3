<script setup lang="ts">
import Header from '~/components/Header.vue';
</script>
<template>
    <section>
        <Header />
        <div>
            <slot />
        </div>
    </section>
</template>