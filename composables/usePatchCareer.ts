import { ref } from 'vue'
import type { Ref } from 'vue'
import { isAxiosError } from 'axios'
import type { FastifyError } from '~/types/api/error.d'
import type { UpdateCareer, Career } from '~/types/api/career.d'
import useAxios from '~/composables/useAxios'
import { key as careersListKey } from '~/composables/useFetchCareers'

export const usePatchCareer = () => {
  const axios = useAxios()

  const error: Ref<Error | FastifyError | null> = ref(null)
  const pending = ref(false)
  const data: Ref<Career | null> = ref(null)

  const mutate = async (id: string | number, payload: UpdateCareer, token: string): Promise<void> => {
    try {
      pending.value = true
      error.value = null
      data.value = null

      const response = await axios.patch<Career>(`/careers/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      data.value = response.data
      refreshNuxtData(careersListKey)
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
