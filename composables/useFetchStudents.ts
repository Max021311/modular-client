import type { MaybeRef } from 'vue'
import type { H3Error } from 'h3'
import type { StudentWithCareer } from '~/types/api/student.d'
import { useRuntimeConfig } from '#imports'
import { useLoginStore } from '~/stores/login'
import type { FastifyError } from '~/types/api/error.d'

interface UseFetchStudentsParams {
  search?: MaybeRef<string | undefined>
  limit?: MaybeRef<number>
  offset?: MaybeRef<number>
  order?: MaybeRef<string>
  includeCareer?: MaybeRef<boolean>
}

interface FetchStudentsResponse {
  total: number
  records: StudentWithCareer[]
}

export const useFetchStudents = (params: UseFetchStudentsParams = {}) => {
  const config = useRuntimeConfig()
  const loginStore = useLoginStore()

  const {
    search = undefined,
    limit = 30,
    offset = 0,
    order = '-Students.createdAt',
    includeCareer = true
  } = params

  const query = computed(() => ({
    search: unref(search),
    limit: unref(limit),
    offset: unref(offset),
    order: unref(order),
    includeCareer: unref(includeCareer)
  }))

  const { data, status, error, refresh, pending } = useFetch<FetchStudentsResponse, H3Error<FastifyError>>('/students?include=career', {
    baseURL: config.public.serverHost,
    headers: {
      Authorization: `Bearer ${loginStore.token}`
    },
    query,
    key: 'students-list'
  })

  const students = computed(() => data.value?.records ?? [])
  const total = computed(() => data.value?.total ?? 0)
  const pages = computed(() => Math.ceil(total.value / unref(limit)))

  return {
    // Data
    data,
    students,
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
