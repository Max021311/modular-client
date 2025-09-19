import { ref } from 'vue'
import type { Ref } from 'vue'
import { isAxiosError } from 'axios'
import type { FastifyError } from '~/types/api/error.d'
import type { ComissionOffice } from '~/types/api/comission-office.d'
import useAxios from '~/composables/useAxios'
import { useLoginStore } from '~/stores/login'
import { useNotificationStore } from '~/stores/notification'

interface PatchComissionOfficePayload {
  status: 'APPROVED' | 'REJECTED' | 'PENDING'
}

export const usePatchComissionOffice = () => {
  const axios = useAxios()
  const loginStore = useLoginStore()
  const notificationStore = useNotificationStore()

  const error: Ref<Error | FastifyError | null> = ref(null)
  const pending = ref(false)
  const data: Ref<ComissionOffice | null> = ref(null)

  const mutate = async (id: string | number, payload: PatchComissionOfficePayload): Promise<void> => {
    try {
      pending.value = true
      error.value = null
      data.value = null

      const response = await axios.patch<ComissionOffice>(`/comission-offices/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${loginStore.token}`
        }
      })

      data.value = response.data

      // Show success notification based on status
      const successMessages = {
        APPROVED: {
          title: 'Oficio aprobado',
          description: 'El oficio de comisión ha sido aprobado exitosamente'
        },
        REJECTED: {
          title: 'Oficio rechazado',
          description: 'El oficio de comisión ha sido rechazado exitosamente'
        },
        PENDING: {
          title: 'Oficio actualizado',
          description: 'El oficio de comisión ha sido marcado como pendiente'
        }
      }

      notificationStore.add({
        type: 'success',
        title: successMessages[payload.status].title,
        description: successMessages[payload.status].description
      })

      // Refresh any cached data related to comission offices
      refreshNuxtData('comission-offices-list')
    } catch (err: unknown) {
      console.error('Error updating commission office:', err)

      if (isAxiosError<FastifyError>(err) && err.response) {
        const messages: Record<string, string> = {
          'Comission office not found': 'Oficio de comisión no encontrado',
          'Cannot change status. Only PENDING status can be changed to APPROVED or REJECTED.': 'No se puede cambiar el estado del oficio de comisión. Solo el estado pendiente puede ser cambiado a aprobado o rechazado.'
        }
        error.value = err.response.data
        notificationStore.add({
          type: 'error',
          title: 'Error al actualizar',
          description: messages[err.response.data.message] ?? 'Error desconocido'
        })
      } else if (err instanceof Error) {
        error.value = err
        notificationStore.add({
          type: 'error',
          title: 'Error al actualizar',
          description: 'Error al actualizar el oficio'
        })
      } else {
        error.value = new Error('Unknown error')
        notificationStore.add({
          type: 'error',
          title: 'Error al actualizar',
          description: 'Error desconocido al actualizar el oficio de comisión'
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
