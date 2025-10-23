<template>
  <h1 class="text-3xl font-bold">Welcome to Nuxt 3</h1>
  <p class="mt-4">This is your starter template.</p>
  <UCard>
    <template #header>
      <Placeholder class="h-8" />
    </template>

    <Placeholder class="h-32" />

    <template #footer>
      <Placeholder class="h-8" />
    </template>
    <UButton color="neutral">Button</UButton>
  </UCard>
</template>
