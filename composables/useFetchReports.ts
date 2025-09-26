import type { MaybeRef } from 'vue'
import type { H3Error } from 'h3'
import type { ReportWithRelations } from '~/types/api/report.d'
import { useRuntimeConfig } from '#imports'
import { useLoginStore } from '~/stores/login'
import type { FastifyError } from '~/types/api/error.d'

interface UseFetchReportsParams {
  order?: MaybeRef<string>
  limit?: MaybeRef<number>
  offset?: MaybeRef<number>
  cycleId?: MaybeRef<number | undefined>
  studentId?: MaybeRef<number | undefined>
  vacancyId?: MaybeRef<number | undefined>
  reportNumber?: MaybeRef<'1' | '2' | undefined>
  includeStudent?: MaybeRef<boolean>
  includeVacancy?: MaybeRef<boolean>
  includeCycle?: MaybeRef<boolean>
  status?: MaybeRef<'APPROVED' | 'REJECTED' | 'PENDING' | undefined>
}

interface FetchReportsResponse {
  total: number
  records: ReportWithRelations[]
}

export const useFetchReportsKey = 'reports-list'

export const useFetchReports = (params: UseFetchReportsParams = {}) => {
  const config = useRuntimeConfig()
  const loginStore = useLoginStore()

  const query = computed(() => ({
    order: unref(params.order) ?? '-Reports.createdAt',
    limit: unref(params.limit) ?? 50,
    offset: unref(params.offset) ?? 0,
    cycleId: unref(params.cycleId) ?? undefined,
    studentId: unref(params.studentId) ?? undefined,
    vacancyId: unref(params.vacancyId) ?? undefined,
    reportNumber: unref(params.reportNumber) ?? undefined,
    status: unref(params.status) ?? undefined,
    includeStudent: unref(params.includeStudent) ?? false,
    includeVacancy: unref(params.includeVacancy) ?? false,
    includeCycle: unref(params.includeCycle) ?? false
  }))

  const { data, status: fetchStatus, error, refresh, pending } = useFetch<FetchReportsResponse, H3Error<FastifyError>>('/reports', {
    baseURL: config.public.serverHost,
    headers: {
      Authorization: `Bearer ${loginStore.token}`
    },
    query,
    key: useFetchReportsKey
  })

  const reports = computed(() => data.value?.records ?? [])
  const total = computed(() => data.value?.total ?? 0)
  const pages = computed(() => Math.ceil(total.value / (unref(params.limit) ?? 50)))

  return {
    // Data
    data,
    reports,
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
