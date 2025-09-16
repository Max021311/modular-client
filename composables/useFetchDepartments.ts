import type { MaybeRef } from 'vue'
import type { H3Error } from 'h3'
import type { Department } from '~/types/api/department.d'
import { useRuntimeConfig } from '#imports'
import { useLoginStore } from '~/stores/login'
import type { FastifyError } from '~/types/api/error.d'

interface UseFetchDepartmentsParams {
  search?: MaybeRef<string | undefined>
  limit?: MaybeRef<number>
  offset?: MaybeRef<number>
  order?: MaybeRef<string>
}

interface FetchDepartmentsResponse {
  total: number
  records: Department[]
}

export const useFetchDepartmentsKey = 'departments-list'

export const useFetchDepartments = (params: UseFetchDepartmentsParams = {}) => {
  const config = useRuntimeConfig()
  const loginStore = useLoginStore()

  const {
    search = undefined,
    limit = 50,
    offset = 0,
    order = '-Departments.createdAt'
  } = params

  const query = computed(() => ({
    search: unref(search),
    limit: unref(limit),
    offset: unref(offset),
    order: unref(order)
  }))

  const { data, status, error, refresh, pending } = useFetch<FetchDepartmentsResponse, H3Error<FastifyError>>('/departments', {
    baseURL: config.public.serverHost,
    headers: {
      Authorization: `Bearer ${loginStore.token}`
    },
    query,
    key: useFetchDepartmentsKey
  })

  const departments = computed(() => data.value?.records ?? [])
  const total = computed(() => data.value?.total ?? 0)
  const pages = computed(() => Math.ceil(total.value / unref(limit)))

  return {
    // Data
    data,
    departments,
    total,
    pages,

    // State
    status,
    error,
    pending,

    // Actions
    refresh
  }
}
