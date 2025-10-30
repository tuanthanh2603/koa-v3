import vi from '~/i18n/locales/vi.json'
import en from '~/i18n/locales/en.json'

export default defineI18nConfig(() => {
  // Gán mặc định
  let locale: 'vi' | 'en' = 'vi'

  if (process.client) {
    const saved = localStorage.getItem('lang')
    if (saved === 'en' || saved === 'vi') {
      locale = saved
    }
  }

  return {
    legacy: false,
    locale, // kiểu giờ đã chính xác
    fallbackLocale: 'vi',
    messages: {
      vi,
      en,
    },
  }
})
