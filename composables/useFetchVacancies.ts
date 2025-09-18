import type { MaybeRef } from 'vue'
import type { H3Error } from 'h3'
import type { VacancyWithRelations } from '~/types/api/vacancy.d'
import { useRuntimeConfig } from '#imports'
import { useLoginStore } from '~/stores/login'
import type { FastifyError } from '~/types/api/error.d'

interface UseFetchVacanciesParams {
  search?: MaybeRef<string | undefined>
  limit?: MaybeRef<number>
  offset?: MaybeRef<number>
  order?: MaybeRef<string>
  includeCycle?: MaybeRef<boolean>
  includeDepartment?: MaybeRef<boolean>
  departmentId?: MaybeRef<number | undefined>
  cycleId?: MaybeRef<number | undefined>
  studentId?: MaybeRef<number | undefined>
}

interface FetchVacanciesResponse {
  total: number
  records: VacancyWithRelations[]
}

export const useFetchVacanciesKey = 'vacancies-list'

export const useFetchVacancies = (params: UseFetchVacanciesParams = {}) => {
  const config = useRuntimeConfig()
  const loginStore = useLoginStore()

  const {
    search = undefined,
    limit = 50,
    offset = 0,
    order = '-Vacancies.createdAt',
    includeCycle = false,
    includeDepartment = false,
    departmentId = undefined,
    cycleId = undefined,
    studentId = undefined
  } = params

  const query = computed(() => ({
    search: unref(search),
    limit: unref(limit),
    offset: unref(offset),
    order: unref(order),
    includeCycle: unref(includeCycle),
    includeDepartment: unref(includeDepartment),
    departmentId: unref(departmentId),
    cycleId: unref(cycleId),
    studentId: unref(studentId)
  }))

  const { data, status, error, refresh, pending } = useFetch<FetchVacanciesResponse, H3Error<FastifyError>>('/vacancies', {
    baseURL: config.public.serverHost,
    headers: {
      Authorization: `Bearer ${loginStore.token}`
    },
    query,
    key: useFetchVacanciesKey
  })

  const vacancies = computed(() => data.value?.records ?? [])
  const total = computed(() => data.value?.total ?? 0)
  const pages = computed(() => Math.ceil(total.value / unref(limit)))

  return {
    // Data
    data,
    vacancies,
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
