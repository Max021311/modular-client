import axios, { type AxiosRequestConfig } from 'axios'
import { defineNuxtPlugin, useRuntimeConfig, navigateTo } from '#imports'
import type { CustomAxiosInstance } from '~/types/axios'

function createAxiosInstance(config: AxiosRequestConfig) {
  const http = axios.create(config) as CustomAxiosInstance

  http.setHeader = function setHeader(name, value, scopes = ['common']) {
    for (const scope of Array.isArray(scopes) ? scopes : [scopes]) {
      if (!value) {
        delete this.defaults.headers[scope]?.[name]
      } else {
        this.defaults.headers[scope] = {
          ...this.defaults.headers[scope],
          [name]: value
        }
      }
    }
  }

  http.setToken = function setToken(token, type, scopes = ['common']) {
    const value = !token ? null : (type ? type + ' ' : '') + token
    this.setHeader('Authorization', value, scopes)
  }

  return http
}

export default defineNuxtPlugin(() => {
  const loginStore = useLoginStore()
  const config = useRuntimeConfig()

  const http = createAxiosInstance({
    baseURL: config.public.serverHost
  })

  // Response interceptor (global actions only)
  http.interceptors.response.use(
    response => response,
    (error) => {
      if (error.response) {
        const { status } = error.response

        // Global authentication error handling
        if (status === 401) {
          // Clear token and redirect to login
          loginStore.logout()

          // Redirect to login if not already there
          if (window.location.pathname !== '/login') {
            navigateTo('/login')
          }
        }
      }

      return Promise.reject(error)
    }
  )

  loginStore.$onAction((action) => {
    if (action.name === 'setJWT') {
      http.setToken(action.args[0], 'Bearer')
    }
  })

  return {
    provide: {
      axios: http
    }
  }
})
