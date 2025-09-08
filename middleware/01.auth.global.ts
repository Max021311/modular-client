import { useLoginStore } from '~/stores/login'

export default defineNuxtRouteMiddleware((to) => {
  const loginStore = useLoginStore()
  const auth = to.meta.auth as 'public' | 'user' | undefined ?? 'user'
  const publicAuthPaths = [
    '/sign-in'
  ]

  const redirect = () => {
    const redirectQuery = to.fullPath !== '/' ? { redirect_to: to.fullPath } : {}

    return navigateTo({
      path: '/sign-in',
      query: redirectQuery
    })
  }

  loginStore.$onAction((action) => {
    if (action.name === 'logout') redirect()
  })

  if (auth === 'public') {
    if (loginStore.isAuthenticated && publicAuthPaths.includes(to.path)) {
      return navigateTo('/')
    }
    return
  }

  if (!loginStore.isAuthenticated) return redirect()

  return
})
