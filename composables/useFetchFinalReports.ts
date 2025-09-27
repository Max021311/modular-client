import type { MaybeRef } from 'vue'
import type { H3Error } from 'h3'
import type { FinalReportWithRelations } from '~/types/api/final-reports.d'
import { useRuntimeConfig } from '#imports'
import { useLoginStore } from '~/stores/login'
import type { FastifyError } from '~/types/api/error.d'

interface UseFetchFinalReportsParams {
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

interface FetchFinalReportsResponse {
  total: number
  records: FinalReportWithRelations[]
}

export const useFetchFinalReportsKey = 'final-reports-list'

export const useFetchFinalReports = (params: UseFetchFinalReportsParams = {}) => {
  const config = useRuntimeConfig()
  const loginStore = useLoginStore()

  const query = computed(() => ({
    order: unref(params.order) ?? '-FinalReports.createdAt',
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

  const { data, status: fetchStatus, error, refresh, pending } = useFetch<FetchFinalReportsResponse, H3Error<FastifyError>>('/final-reports', {
    baseURL: config.public.serverHost,
    headers: {
      Authorization: `Bearer ${loginStore.token}`
    },
    query,
    key: useFetchFinalReportsKey
  })

  const finalReports = computed(() => data.value?.records ?? [])
  const total = computed(() => data.value?.total ?? 0)
  const pages = computed(() => Math.ceil(total.value / (unref(params.limit) ?? 50)))

  return {
    // Data
    data,
    finalReports,
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
