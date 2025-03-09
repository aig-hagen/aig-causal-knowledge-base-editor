import { defineStore } from 'pinia'
import { ref } from 'vue'

interface Notification {
  id: number
  message: string
  type: 'success' | 'error'
}

export const useNotifications = defineStore('notifications', () => {
  const notifications = ref<Notification[]>([])
  const nextId = ref(1)

  function addSuccessNotification(message: string, timeout = 5_000) {
    const id = nextId.value++
    notifications.value.push({ id, message, type: 'success' })

    setTimeout(() => {
      removeNotification(id)
    }, timeout)
  }

  function addErrorNotification(message: string) {
    const id = nextId.value++
    notifications.value.push({ id, message, type: 'error' })
  }

  function clearNotifications() {
    notifications.value = []
  }

  function removeNotification(id: number) {
    notifications.value = notifications.value.filter((notification) => notification.id !== id)
  }

  return {
    notifications,
    nextId,
    addSuccessNotification,
    addErrorNotification,
    clearNotifications,
    removeNotification,
  }
})
