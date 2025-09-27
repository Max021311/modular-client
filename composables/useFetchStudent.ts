import type { MaybeRef } from 'vue'
import type { H3Error } from 'h3'
import type { StudentWithCareer } from '~/types/api/student.d'
import { useRuntimeConfig } from '#imports'
import { useLoginStore } from '~/stores/login'
import type { FastifyError } from '~/types/api/error.d'

interface UseFetchStudentParams {
  id: MaybeRef<number | string>
  includeCareer?: MaybeRef<boolean>
}

export const keyPrefix = 'student-'

export const useFetchStudent = (params: UseFetchStudentParams) => {
  const config = useRuntimeConfig()
  const loginStore = useLoginStore()

  const {
    id,
    includeCareer = true
  } = params

  const query = computed(() => ({
    includeCareer: unref(includeCareer)
  }))

  const { data, status, error, refresh, pending } = useFetch<StudentWithCareer, H3Error<FastifyError>>(() => `/students/${unref(id)}`, {
    baseURL: config.public.serverHost,
    headers: {
      Authorization: `Bearer ${loginStore.token}`
    },
    query,
    key: computed(() => `${keyPrefix}${unref(id)}`)
  })

  const student = computed(() => data.value)

  return {
    // Data
    data,
    student,

    // State
    status,
    error,
    pending,

    // Actions
    refresh
  }
}
