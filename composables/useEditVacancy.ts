import { ref } from 'vue'
import type { Ref } from 'vue'
import { isAxiosError } from 'axios'
import type { FastifyError } from '~/types/api/error.d'
import type { UpdateVacancy, Vacancy } from '~/types/api/vacancy.d'
import useAxios from '~/composables/useAxios'
import { getVacancyKey } from '~/composables/useFetchVacancy'
import { useFetchVacanciesKey } from '~/composables/useFetchVacancies'

export const useEditVacancy = () => {
  const axios = useAxios()

  const error: Ref<Error | FastifyError | null> = ref(null)
  const pending = ref(false)
  const data: Ref<Vacancy | null> = ref(null)

  const mutate = async (id: string | number, payload: UpdateVacancy, token: string): Promise<void> => {
    try {
      pending.value = true
      error.value = null
      data.value = null

      const response = await axios.put<Vacancy>(`/vacancies/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      data.value = response.data

      refreshNuxtData(getVacancyKey(id))
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
