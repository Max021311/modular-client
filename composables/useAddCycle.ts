import { ref } from 'vue'
import type { Ref } from 'vue'
import { isAxiosError } from 'axios'
import type { FastifyError } from '~/types/api/error.d'
import type { CreateCycle, Cycle } from '~/types/api/cycle.d'
import useAxios from '~/composables/useAxios'
import { useFetchCyclesKey } from '~/composables/useFetchCycles'

export const useAddCycle = () => {
  const axios = useAxios()

  const error: Ref<Error | FastifyError | null> = ref(null)
  const pending = ref(false)
  const data: Ref<Cycle | null> = ref(null)

  const mutate = async (payload: CreateCycle, token: string): Promise<void> => {
    try {
      pending.value = true
      error.value = null
      data.value = null

      const response = await axios.post<Cycle>('/cycles', payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      data.value = response.data
      refreshNuxtData(useFetchCyclesKey)
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
