import { ref } from 'vue'
import type { Ref } from 'vue'
import { isAxiosError } from 'axios'
import type { FastifyError } from '~/types/api/error.d'
import type { Student } from '~/types/api/student.d'
import useAxios from '~/composables/useAxios'
import { useLoginStore } from '~/stores/login'
import { useNotificationStore } from '~/stores/notification'
import { keyPrefix as studentKeyPrefix } from '~/composables/useFetchStudent'
import { key as studentsKey } from '~/composables/useFetchStudents'

export const useActivateStudent = () => {
  const axios = useAxios()
  const loginStore = useLoginStore()
  const notificationStore = useNotificationStore()

  const error: Ref<Error | FastifyError | null> = ref(null)
  const pending = ref(false)
  const data: Ref<Student | null> = ref(null)

  const mutate = async (id: string | number): Promise<void> => {
    try {
      pending.value = true
      error.value = null
      data.value = null

      const response = await axios.patch<Student>(`/students/${id}/activate`, {}, {
        headers: {
          Authorization: `Bearer ${loginStore.token}`
        }
      })

      data.value = response.data

      // Show success notification
      notificationStore.add({
        type: 'success',
        title: 'Alumno activado',
        description: 'El alumno ha sido activado exitosamente'
      })

      // Refresh any cached data related to students
      refreshNuxtData(studentsKey)
      refreshNuxtData(studentKeyPrefix + id)
    } catch (err: unknown) {
      console.error('Error activating student:', err)

      if (isAxiosError<FastifyError>(err) && err.response) {
        const messages: Record<string, string> = {
          'Student not found': 'Alumno no encontrado',
          'Student is already active': 'El alumno ya está activo'
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
          description: 'Error al activar el alumno'
        })
      } else {
        error.value = new Error('Unknown error')
        notificationStore.add({
          type: 'error',
          title: 'Error al activar',
          description: 'Error desconocido al activar el alumno'
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
