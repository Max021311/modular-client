import { ref } from 'vue'
import type { Ref } from 'vue'
import { isAxiosError } from 'axios'
import type { FastifyError } from '~/types/api/error.d'
import type { Vacancy } from '~/types/api/vacancy.d'
import useAxios from '~/composables/useAxios'
import { useLoginStore } from '~/stores/login'
import { useNotificationStore } from '~/stores/notification'
import { keyPrefix as vacancyKeyPrefix } from '~/composables/useFetchVacancy'
import { useFetchVacanciesKey } from '~/composables/useFetchVacancies'

export const useActivateVacancy = () => {
  const axios = useAxios()
  const loginStore = useLoginStore()
  const notificationStore = useNotificationStore()

  const error: Ref<Error | FastifyError | null> = ref(null)
  const pending = ref(false)
  const data: Ref<Vacancy | null> = ref(null)

  const mutate = async (id: string | number): Promise<void> => {
    try {
      pending.value = true
      error.value = null
      data.value = null

      const response = await axios.patch<Vacancy>(`/vacancies/${id}/activate`, {}, {
        headers: {
          Authorization: `Bearer ${loginStore.token}`
        }
      })

      data.value = response.data

      // Show success notification
      notificationStore.add({
        type: 'success',
        title: 'Plaza activada',
        description: 'La plaza ha sido activada exitosamente'
      })

      // Refresh any cached data related to vacancies
      refreshNuxtData(useFetchVacanciesKey)
      refreshNuxtData(vacancyKeyPrefix + id)
    } catch (err: unknown) {
      console.error('Error activating vacancy:', err)

      if (isAxiosError<FastifyError>(err) && err.response) {
        const messages: Record<string, string> = {
          'Vacancy not found': 'Plaza no encontrada',
          'Vacancy is already active': 'La plaza ya está activa'
        }
        error.value = err.response.data
        notificationStore.add({
          type: 'error',
          title: 'Error al activar',
          description: messages[err.response.data.message] ?? 'Error desconocido'
        })
      } else if (err instanceof Error) {
        error.value = err
        notificationStore.add({
          type: 'error',
          title: 'Error al activar',
          description: 'Error al activar la plaza'
        })
      } else {
        error.value = new Error('Unknown error')
        notificationStore.add({
          type: 'error',
          title: 'Error al activar',
          description: 'Error desconocido al activar la plaza'
        })
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
