import { ref } from 'vue'
import type { Ref } from 'vue'
import { isAxiosError } from 'axios'
import type { FastifyError } from '~/types/api/error.d'
import useAxios from '~/composables/useAxios'
import { useFetchVacanciesKey } from '~/composables/useFetchVacancies'

interface AssociateVacancyPayload {
  vacancyId: number
  studentId: number
}

interface AssociateVacancyResponse {
  message: string
}

export const useAssociateVacancy = () => {
  const axios = useAxios()
  const loginStore = useLoginStore()

  const error: Ref<Error | FastifyError | null> = ref(null)
  const pending = ref(false)
  const data: Ref<AssociateVacancyResponse | null> = ref(null)

  const mutate = async (vacancyId: number, studentId: number): Promise<void> => {
    try {
      pending.value = true
      error.value = null
      data.value = null

      const payload: AssociateVacancyPayload = {
        vacancyId,
        studentId
      }

      const response = await axios.post<AssociateVacancyResponse>(`/vacancies/${vacancyId}/associate/${studentId}`, payload, {
        headers: {
          Authorization: `Bearer ${loginStore.token}`
        }
      })

      data.value = response.data

      // Refresh the vacancies list to reflect the new association
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
