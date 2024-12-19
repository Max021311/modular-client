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
  
  // Route rules
  // routeRules: {
  //   '/blog/**': { swr: true },
  //   '/admin/**': { ssr: false }
  // }
})
