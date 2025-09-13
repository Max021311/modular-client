import { useLoginStore } from '~/stores/login'
import { getPathScope } from '~/common/get-path-scope'

export default defineNuxtRouteMiddleware((to) => {
  const loginStore = useLoginStore()
  const userScopeToPathPrefix = {
    user: '/administrativo',
    student: '/alumno'
  } as const
  const authPath = '/sign-in' as const

  const requiredScope = getPathScope(to.path)

  const redirect = () => {
    const redirectQuery = to.fullPath !== '/' ? { redirect_to: to.fullPath } : {}
    return navigateTo({
      path: authPath,
      query: redirectQuery
    })
  }

  loginStore.$onAction((action) => {
    if (action.name === 'logout') {
      navigateTo(authPath)
    }
  })

  if (loginStore.isAuthenticated && loginStore.userInfo) {
    if (to.path === authPath) {
      return navigateTo(userScopeToPathPrefix[loginStore.userInfo.scope])
    } else if (requiredScope === 'public') {
      return
    } else if (requiredScope !== loginStore.userInfo.scope) {
      return navigateTo(userScopeToPathPrefix[loginStore.userInfo.scope])
    }
    return
  }

  return requiredScope === 'public' ? undefined : redirect()
})
