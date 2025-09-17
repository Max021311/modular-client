import type { MaybeRef } from 'vue'
import type { H3Error } from 'h3'
import type { StudentWithCareer } from '~/types/api/student.d'
import { useRuntimeConfig } from '#imports'
import { useLoginStore } from '~/stores/login'
import type { FastifyError } from '~/types/api/error.d'

interface UseFetchStudentsByVacancyIdParams {
  vacancyId: MaybeRef<string | number>
}

const keyPrefix = 'vacancy-students-'

export function getVacancyStudentsKey(vacancyId: string | number) {
  return `${keyPrefix}${vacancyId}`
}

export const useFetchStudentsByVacancyId = (params: UseFetchStudentsByVacancyIdParams) => {
  const config = useRuntimeConfig()
  const loginStore = useLoginStore()

  const { vacancyId } = params

  const computedVacancyId = computed(() => unref(vacancyId))

  const { data, status, error, refresh, pending } = useFetch<StudentWithCareer[], H3Error<FastifyError>>(() => `/vacancies/${computedVacancyId.value}/students`, {
    baseURL: config.public.serverHost,
    headers: {
      Authorization: `Bearer ${loginStore.token}`
    },
    key: () => `vacancy-students-${computedVacancyId.value}`
  })

  const students = computed(() => data.value ?? [])

  return {
    // Data
    data,
    students,

    // State
    status,
    error,
    pending,

    // Actions
    refresh
  }
}
