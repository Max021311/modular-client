import { ref } from 'vue'
import type { Ref } from 'vue'
import { isAxiosError } from 'axios'
import type { FastifyError } from '~/types/api/error.d'
import type { UpdateDepartment, Department } from '~/types/api/department.d'
import useAxios from '~/composables/useAxios'
import { getDepartmentKey } from '~/composables/useFetchDepartment'

export const useEditDepartment = () => {
  const axios = useAxios()

  const error: Ref<Error | FastifyError | null> = ref(null)
  const pending = ref(false)
  const data: Ref<Department | null> = ref(null)

  const mutate = async (id: string | number, payload: UpdateDepartment, token: string): Promise<void> => {
    try {
      pending.value = true
      error.value = null
      data.value = null

      const response = await axios.put<Department>(`/departments/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      data.value = response.data

      refreshNuxtData(getDepartmentKey(id))
      refreshNuxtData('departments-list')
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
