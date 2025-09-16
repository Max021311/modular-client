import { ref } from 'vue'
import type { Ref } from 'vue'
import { isAxiosError } from 'axios'
import type { FastifyError } from '~/types/api/error.d'
import { useLoginStore } from '~/stores/login'
import useAxios from '~/composables/useAxios'

interface InviteStudentPayload {
  email: string
}

export const useInviteStudent = () => {
  const loginStore = useLoginStore()
  const axios = useAxios()

  const error: Ref<Error | FastifyError | null> = ref(null)
  const pending = ref(false)

  const mutate = async (payload: InviteStudentPayload): Promise<void> => {
    try {
      pending.value = true
      error.value = null

      await axios.post<null>('/students/invite', payload, {
        headers: {
          Authorization: `Bearer ${loginStore.token}`
        }
      })
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
    mutate
  }
}
