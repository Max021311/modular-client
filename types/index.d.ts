import type { Pinia } from 'pinia'
import type { CustomAxiosInstance } from './axios'

interface PluginsInjections {
  $axios: CustomAxiosInstance
  $pinia: Pinia
}

declare module '#app' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface NuxtApp extends PluginsInjections {}
}

declare module 'vue' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface ComponentCustomProperties extends PluginsInjections {}
}

declare module '@vue/runtime-core' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface ComponentCustomProperties extends PluginsInjections {}
}
