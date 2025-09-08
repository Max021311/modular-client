import { defineStore } from 'pinia'
import { computed } from 'vue'

export interface InternalNotification {
  id: number
  title: string
  description?: string
  type: 'success' | 'error' | 'warning' | 'info'
}
type Notification = Omit<InternalNotification, 'id'>

export const TIMEOUT = 8 * 1000

/**
 * @description Pinia doesn't support private state so can be mutated directly, to avoid this it's
 * possible to write a private store used by another store
 */
const privateStore = defineStore('privateNotification', {
  state: () => ({
    notifications: [] as InternalNotification[],
    timeoutId: null as number | null
  }),
  actions: {
    shift() {
      this.notifications.shift()
    },
    poll() {
      this.timeoutId = null
      this.shift()
      if (this.notifications.length > 0) {
        const timeoutId = window.setTimeout(() => {
          this.poll()
        }, TIMEOUT)
        this.timeoutId = timeoutId
      }
    }
  }
})

export const useNotificationStore = defineStore('notification', () => {
  const privateState = privateStore()
  const counter = ref(0)

  const notifications = computed(() => privateState.notifications)
  const current = computed(
    () => privateState.notifications.length > 0 ? privateState.notifications[0] : null
  )

  function add(notification: Notification) {
    privateState.notifications.push({
      id: counter.value++,
      ...notification
    })
    console.log({ notifications: privateState.notifications })
    if (privateState.timeoutId === null) {
      const timeoutId = window.setTimeout(() => {
        privateState.poll()
      }, TIMEOUT)
      privateState.timeoutId = timeoutId
    }
  }

  function next() {
    const timeoutId = privateState.timeoutId
    if (timeoutId) {
      window.clearTimeout(timeoutId)
      privateState.poll()
    }
  }

  return {
    notifications,
    current,
    add,
    next
  }
})
