import { ref } from 'vue'
import type { Ref } from 'vue'
import { isAxiosError } from 'axios'
import type { FastifyError } from '~/types/api/error.d'
import type { CreateVacancy, Vacancy } from '~/types/api/vacancy.d'
import useAxios from '~/composables/useAxios'
import { useFetchVacanciesKey } from '~/composables/useFetchVacancies'

export const useAddVacancy = () => {
  const axios = useAxios()

  const loginStore = useLoginStore()
  const error: Ref<Error | FastifyError | null> = ref(null)
  const pending = ref(false)
  const data: Ref<Vacancy | null> = ref(null)

  const mutate = async (payload: CreateVacancy): Promise<void> => {
    try {
      pending.value = true
      error.value = null
      data.value = null

      const response = await axios.post<Vacancy>('/vacancies', payload, {
        headers: {
          Authorization: `Bearer ${loginStore.token}`
        }
      })

      data.value = response.data
      refreshNuxtData(useFetchVacanciesKey)
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
