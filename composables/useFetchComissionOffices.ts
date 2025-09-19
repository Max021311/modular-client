import type { MaybeRef } from 'vue'
import type { H3Error } from 'h3'
import type { ComissionOfficeWithRelations } from '~/types/api/comission-office.d'
import { useRuntimeConfig } from '#imports'
import { useLoginStore } from '~/stores/login'
import type { FastifyError } from '~/types/api/error.d'

interface UseFetchComissionOfficesParams {
  order?: MaybeRef<string>
  limit?: MaybeRef<number>
  offset?: MaybeRef<number>
  cycleId?: MaybeRef<number | undefined>
  studentId?: MaybeRef<number | undefined>
  vacancyId?: MaybeRef<number | undefined>
  includeStudent?: MaybeRef<boolean>
  includeVacancy?: MaybeRef<boolean>
  includeCycle?: MaybeRef<boolean>
  status?: MaybeRef<'APPROVED' | 'REJECTED' | 'PENDING' | undefined>
}

interface FetchComissionOfficesResponse {
  total: number
  records: ComissionOfficeWithRelations[]
}

export const useFetchComissionOfficesKey = 'comission-offices-list'

export const useFetchComissionOffices = (params: UseFetchComissionOfficesParams = {}) => {
  const config = useRuntimeConfig()
  const loginStore = useLoginStore()

  const query = computed(() => ({
    order: unref(params.order) ?? '-ComissionOffices.createdAt',
    limit: unref(params.limit) ?? 50,
    offset: unref(params.offset) ?? 0,
    cycleId: unref(params.cycleId) ?? undefined,
    studentId: unref(params.studentId) ?? undefined,
    vacancyId: unref(params.vacancyId) ?? undefined,
    status: unref(params.status) ?? undefined,
    includeStudent: unref(params.includeStudent) ?? false,
    includeVacancy: unref(params.includeVacancy) ?? false,
    includeCycle: unref(params.includeCycle) ?? false
  }))

  const { data, status: fetchStatus, error, refresh, pending } = useFetch<FetchComissionOfficesResponse, H3Error<FastifyError>>('/comission-offices', {
    baseURL: config.public.serverHost,
    headers: {
      Authorization: `Bearer ${loginStore.token}`
    },
    query,
    key: useFetchComissionOfficesKey
  })

  const comissionOffices = computed(() => data.value?.records ?? [])
  const total = computed(() => data.value?.total ?? 0)
  const pages = computed(() => Math.ceil(total.value / (unref(params.limit) ?? 50)))

  return {
    // Data
    data,
    comissionOffices,
    total,
    pages,

    // State
    status: fetchStatus,
    error,
    pending,

    // Actions
    refresh
  }
}
