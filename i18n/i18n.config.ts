import { defineI18nConfig } from '#i18n'
import vi from './locales/vi.json'
import en from './locales/en.json'

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'vi',
  fallbackLocale: 'en',
  messages: {
    vi,
    en
  }
}))
