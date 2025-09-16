import { ref } from 'vue'
import type { Ref } from 'vue'
import { isAxiosError } from 'axios'
import type { FastifyError } from '~/types/api/error.d'
import type { CreateDepartment, Department } from '~/types/api/department.d'
import useAxios from '~/composables/useAxios'
import { useFetchDepartmentsKey } from '~/composables/useFetchDepartments'

export const useAddDepartment = () => {
  const axios = useAxios()

  const error: Ref<Error | FastifyError | null> = ref(null)
  const pending = ref(false)
  const data: Ref<Department | null> = ref(null)

  const mutate = async (payload: CreateDepartment, token: string): Promise<void> => {
    try {
      pending.value = true
      error.value = null
      data.value = null

      const response = await axios.post<Department>('/departments', payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      data.value = response.data
      refreshNuxtData(useFetchDepartmentsKey)
    } catch (err: unknown) {
      if (isAxiosError<FastifyError>(err) && err.response) {
        error.value = err.response.data
      } else if (err instanceof Error) {
        error.value = err
      } else {
        error.value = new Error('Unknown error')
      }
    } finally {
      pending.value = false
    }
  }

  return {
    error,
    pending,
    data,
    mutate
  }
}
