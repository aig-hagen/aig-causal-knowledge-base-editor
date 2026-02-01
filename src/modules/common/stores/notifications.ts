/*
 * Causal Knowledge Base Editor - A graphical application to reason with causal knowledge.
 *
 * Copyright (C) 2026  Artificial Intelligence Group at the Faculty of Mathematics and Computer Science of the FernUniversität in Hagen <https://www.fernuni-hagen.de/aig/en/>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'

// XXX consider binding notifications to component instead of making them global.

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
