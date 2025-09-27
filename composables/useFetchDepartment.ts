import type { MaybeRef } from 'vue'
import type { H3Error } from 'h3'
import type { Department } from '~/types/api/department.d'
import { useRuntimeConfig } from '#imports'
import { useLoginStore } from '~/stores/login'
import type { FastifyError } from '~/types/api/error.d'

interface UseFetchDepartmentParams {
  id: MaybeRef<string | number>
}

const keyPrefix = 'department-'

export function getDepartmentKey(id: string | number) {
  return `${keyPrefix}${id}`
}

export const useFetchDepartment = (params: UseFetchDepartmentParams) => {
  const config = useRuntimeConfig()
  const loginStore = useLoginStore()

  const { id } = params

  const departmentId = computed(() => unref(id))

  const { data, status, error, refresh, pending } = useFetch<Department, H3Error<FastifyError>>(() => `/departments/${departmentId.value}`, {
    baseURL: config.public.serverHost,
    headers: {
      Authorization: `Bearer ${loginStore.token}`
    },
    key: () => `${keyPrefix}${departmentId.value}`
  })

  const department = computed(() => data.value ?? null)

  return {
    // Data
    data,
    department,

    // State
    status,
    error,
    pending,

    // Actions
    refresh
  }
}
