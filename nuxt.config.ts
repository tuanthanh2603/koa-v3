// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxtjs/i18n', '@nuxtjs/color-mode'],
  css: [ '~/assets/css/main.css' ],
  i18n: {
    vueI18n: '~/i18n/i18n.config.ts', // đường dẫn đúng
    locales: [
      { code: 'vi', name: 'Vietnamese' },
      { code: 'en', name: 'English' }
    ],
    defaultLocale: 'vi',
    strategy: 'no_prefix', // 👉 không thêm /vi hay /en vào URL
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'lang',
      redirectOn: 'root', // hoặc 'no_prefix' tùy cách bạn định tuyến
    }
  },
  app: {
    head: {
      title: 'KOA',
      charset: "utf-8",
      meta: [
        { name: 'description', content: 'Kiến Trúc KOA - KOA Architecture' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],

    }
  },
})