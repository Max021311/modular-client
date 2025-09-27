import type { MaybeRef } from 'vue'
import type { H3Error } from 'h3'
import type { VacancyWithRelations } from '~/types/api/vacancy.d'
import { useRuntimeConfig } from '#imports'
import { useLoginStore } from '~/stores/login'
import type { FastifyError } from '~/types/api/error.d'

interface UseFetchVacancyParams {
  id: MaybeRef<string | number>
  includeCycle?: MaybeRef<boolean>
  includeDepartment?: MaybeRef<boolean>
}

export const keyPrefix = 'vacancy-'

export function getVacancyKey(id: string | number) {
  return `${keyPrefix}${id}`
}

export const useFetchVacancy = (params: UseFetchVacancyParams) => {
  const config = useRuntimeConfig()
  const loginStore = useLoginStore()

  const {
    id,
    includeCycle = false,
    includeDepartment = false
  } = params

  const vacancyId = computed(() => unref(id))

  const query = computed(() => ({
    includeCycle: unref(includeCycle),
    includeDepartment: unref(includeDepartment)
  }))

  const { data, status, error, refresh, pending } = useFetch<VacancyWithRelations, H3Error<FastifyError>>(() => `/vacancies/${vacancyId.value}`, {
    baseURL: config.public.serverHost,
    headers: {
      Authorization: `Bearer ${loginStore.token}`
    },
    query,
    key: () => `${keyPrefix}${vacancyId.value}`
  })

  const vacancy = computed(() => data.value ?? null)

  return {
    // Data
    data,
    vacancy,

    // State
    status,
    error,
    pending,

    // Actions
    refresh
  }
}
