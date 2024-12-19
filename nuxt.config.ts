// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  router: {
    options: {
      strict: true,
      sensitive: true,
    }
  },
  css: ['~/assets/css/main.css'],
  // Route rules
  // routeRules: {
  //   '/blog/**': { swr: true },
  //   '/admin/**': { ssr: false }
  // }
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  modules: ['@nuxt/eslint'],
  eslint: {
    config: {
      stylistic: {
        braceStyle: '1tbs',
        commaDangle: 'never',
        jsx: false,
        indent: 2,
        semi: false
      }
    }
  }
})
