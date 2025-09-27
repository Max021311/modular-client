// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@vueuse/nuxt', '@pinia/nuxt'],
  ssr: false,
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  router: {
    options: {
      strict: true,
      sensitive: true
    }
  },
  runtimeConfig: {
    dialogflow: {
      privateKey: '',
      clientEmail: ''
    },
    public: {
      serverHost: ''
    }
  },
  compatibilityDate: '2024-11-01',
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  eslint: {
    config: {
      stylistic: {
        braceStyle: '1tbs',
        commaDangle: 'never',
        quoteProps: 'as-needed',
        jsx: false,
        indent: 2,
        semi: false
      }
    }
  }
})
