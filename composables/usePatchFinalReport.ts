import { ref } from 'vue'
import type { Ref } from 'vue'
import { isAxiosError } from 'axios'
import type { FastifyError } from '~/types/api/error.d'
import type { FinalReport, UpdateFinalReport } from '~/types/api/final-reports.d'
import useAxios from '~/composables/useAxios'
import { useLoginStore } from '~/stores/login'
import { useNotificationStore } from '~/stores/notification'

interface PatchFinalReportPayload extends UpdateFinalReport {
  status?: 'APPROVED' | 'REJECTED' | 'PENDING'
  hours?: number
  fileId?: number
}

export const usePatchFinalReport = () => {
  const axios = useAxios()
  const loginStore = useLoginStore()
  const notificationStore = useNotificationStore()

  const error: Ref<Error | FastifyError | null> = ref(null)
  const pending = ref(false)
  const data: Ref<FinalReport | null> = ref(null)

  const mutate = async (id: string | number, payload: PatchFinalReportPayload): Promise<void> => {
    try {
      pending.value = true
      error.value = null
      data.value = null

      const response = await axios.patch<FinalReport>(`/final-reports/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${loginStore.token}`
        }
      })

      data.value = response.data

      // Show success notification based on what was updated
      if (payload.status) {
        const successMessages = {
          APPROVED: {
            title: 'Reporte aprobado',
            description: 'El reporte final ha sido aprobado exitosamente'
          },
          REJECTED: {
            title: 'Reporte rechazado',
            description: 'El reporte final ha sido rechazado exitosamente'
          },
          PENDING: {
            title: 'Reporte actualizado',
            description: 'El reporte final ha sido marcado como pendiente'
          }
        }

        notificationStore.add({
          type: 'success',
          title: successMessages[payload.status].title,
          description: successMessages[payload.status].description
        })
      } else {
        notificationStore.add({
          type: 'success',
          title: 'Reporte actualizado',
          description: 'El reporte final ha sido actualizado exitosamente'
        })
      }

      // Refresh any cached data related to final reports
      refreshNuxtData('final-reports-list')
    } catch (err: unknown) {
      console.error('Error updating final report:', err)

      if (isAxiosError<FastifyError>(err) && err.response) {
        const messages: Record<string, string> = {
          'Final report not found': 'Reporte final no encontrado',
          'Cannot change status. Only PENDING status can be changed to APPROVED or REJECTED.': 'No se puede cambiar el estado del reporte final. Solo el estado pendiente puede ser cambiado a aprobado o rechazado.',
          'Invalid hours value': 'Valor de horas inválido',
          'File not found': 'Archivo no encontrado'
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
          description: 'Error al actualizar el reporte'
        })
      } else {
        error.value = new Error('Unknown error')
        notificationStore.add({
          type: 'error',
          title: 'Error al actualizar',
          description: 'Error desconocido al actualizar el reporte final'
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
