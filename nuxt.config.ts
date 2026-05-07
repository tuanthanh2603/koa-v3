// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxtjs/i18n', '@nuxtjs/color-mode', 'nuxt-site-config', 'nuxt-simple-sitemap', 'nuxt-simple-robots', '@nuxt/image'],
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
  // robots module options moved to the modules array above
  site: {
    url: 'https://koa.vn', // ✅ Domain gốc
    name: 'KOA Architecture',
    description:
      'KOA Architecture - công ty tiên phong trong thiết kế và thi công nội ngoại thất, kiến trúc và xây dựng tại Việt Nam.',
  },
  sitemap: {
    sitemapName: 'sitemap.xml',
    urls: [
      '/',
      '/projects',
      '/knowledge',
      '/recruitment',
      '/info',
      '/contact',
    ],
  },
  robots: {
    enabled: true,
    sitemap: [ 'https://koa.vn/sitemap.xml' ],
    allow: [ '/' ],
    disallow: [ '/admin', '/api' ],
  },
  app: {
    head: {
      title: 'KOA',
      charset: "utf-8",
      meta: [
        { name: 'description', content: 'Kiến Trúc KOA - KOA Architecture' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'keywords',
          content: 'thiết kế nội thất, thi công nội thất, thiết kế kiến trúc, KOA Architecture, thiết kế biệt thự, thiết kế nhà phố, thiết kế văn phòng, thiết kế căn hộ, thi công trọn gói, cải tạo nhà cũ, nội thất cao cấp, kiến trúc sư, thiết kế phòng khách, thiết kế phòng ngủ, thiết kế phòng bếp, thiết kế showroom, thiết kế quán cafe, thiết kế nhà hàng, thiết kế hiện đại, phong cách kiến trúc Châu Âu, thiết kế nhà thông minh, nội thất thông minh'
        },

        { name: 'author', content: 'KOA Architecture' },
        { property: 'og:title', content: 'KOA Architecture | Thiết kế & Thi công Nội thất & Kiến trúc' },
        {
          property: 'og:description',
          content:
            'KOA Architecture mang đến không gian sống và làm việc tuyệt vời, phản ánh phong cách riêng của bạn. Đội ngũ kiến trúc sư & kỹ sư chuyên nghiệp.',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://koa.vn' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'KOA Architecture' },
        { name: 'twitter:description', content: 'Thiết kế & Thi công Nội thất & Kiến trúc chuyên nghiệp tại Việt Nam' },
      ],

    }
  },
})