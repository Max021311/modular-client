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
  console.log({
    requiredScope,
    isAuthenticated: loginStore.isAuthenticated,
    scope: loginStore.userInfo?.scope
  })

  const redirect = () => {
    const redirectQuery = to.fullPath !== '/' ? { redirect_to: to.fullPath } : {}
    console.log('Redirecting to login')
    return navigateTo({
      path: authPath,
      query: redirectQuery
    })
  }

  loginStore.$onAction((action) => {
    if (action.name === 'logout') {
      console.log('Logout')
      navigateTo(authPath)
    }
  })

  if (loginStore.isAuthenticated && loginStore.userInfo) {
    console.log([to.path, authPath])
    if (to.path === authPath) {
      console.log('Do not go to login if user is already authenticated')
      return navigateTo(userScopeToPathPrefix[loginStore.userInfo.scope])
    } else if (requiredScope === 'public') {
      return
    } else if (requiredScope !== loginStore.userInfo.scope) {
      console.log('Different user scope')
      return navigateTo(userScopeToPathPrefix[loginStore.userInfo.scope])
    }
    return
  }

  return requiredScope === 'public' ? undefined : redirect()
})
