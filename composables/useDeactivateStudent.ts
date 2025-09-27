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

export const useDeactivateStudent = () => {
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

      const response = await axios.patch<Student>(`/students/${id}/deactivate`, {}, {
        headers: {
          Authorization: `Bearer ${loginStore.token}`
        }
      })

      data.value = response.data

      // Show success notification
      notificationStore.add({
        type: 'success',
        title: 'Alumno desactivado',
        description: 'El alumno ha sido desactivado exitosamente'
      })

      // Refresh any cached data related to students
      refreshNuxtData(studentsKey)
      refreshNuxtData(studentKeyPrefix + id)
    } catch (err: unknown) {
      console.error('Error deactivating student:', err)

      if (isAxiosError<FastifyError>(err) && err.response) {
        const messages: Record<string, string> = {
          'Student not found': 'Alumno no encontrado',
          'Student is already deactivated': 'El alumno ya está desactivado'
        }
        error.value = err.response.data
        notificationStore.add({
          type: 'error',
          title: 'Error al desactivar',
          description: messages[err.response.data.message] ?? 'Error desconocido'
        })
      } else if (err instanceof Error) {
        error.value = err
        notificationStore.add({
          type: 'error',
          title: 'Error al desactivar',
          description: 'Error al desactivar el alumno'
        })
      } else {
        error.value = new Error('Unknown error')
        notificationStore.add({
          type: 'error',
          title: 'Error al desactivar',
          description: 'Error desconocido al desactivar el alumno'
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
