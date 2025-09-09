import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import Axios from 'axios'
import { jwtDecode, type JwtPayload } from 'jwt-decode'
import type { PERMISSIONS, Roles } from '~/common/constants/permissions'
import validateJWT from '~/common/validate-jwt'

export interface UserTokenPayload extends JwtPayload {
  id: number
  name: string
  user: string
  role: keyof Roles
  permissions: PERMISSIONS[]
  createdAt: Date
  updatedAt: Date
  scope: 'user'
}

type TokenPayloads = UserTokenPayload

export const useLoginStore = defineStore('login', () => {
  const config = useRuntimeConfig()
  const jwt = useLocalStorage<string | null>('token', null)

  const userInfo: Ref<null | TokenPayloads> = ref(null)

  function setUser(user: TokenPayloads) {
    userInfo.value = user
  }

  function setJWT(value: string) {
    console.trace('setJWT')
    const user = jwtDecode<TokenPayloads>(value)
    setUser(user)
    jwt.value = value
  }

  function logout() {
    jwt.value = null
    userInfo.value = null
  }

  async function loginAsAdministrativeUser(user: string, password: string) {
    const response = await Axios<{ token: string }>({
      method: 'POST',
      baseURL: config.public.serverHost,
      url: '/user/auth',
      data: {
        user,
        password
      }
    })
    setJWT(response.data.token)
  }

  async function loginAsStudentUser(user: string, password: string) {
    const response = await Axios<{ token: string }>({
      method: 'POST',
      baseURL: config.public.serverHost,
      url: '/student/auth',
      data: {
        user,
        password
      }
    })
    setJWT(response.data.token)
  }

  const isAuthenticated = computed(() => validateJWT(jwt.value))

  return {
    token: jwt,
    userInfo,
    logout,
    setUser,
    setJWT,
    isAuthenticated,
    loginAsAdministrativeUser,
    loginAsStudentUser
  }
})
