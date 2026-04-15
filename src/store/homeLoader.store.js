import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useContentStore } from '@/store/content.store'
import { useCalendarEventsStore } from '@/store/calendar.store'

export const useHomeLoaderStore = defineStore('homeLoaderStore', () => {
  const loadStatus = ref('idle')
  const loadError = ref('')
  const loadEvents = ref([])
  const listeners = []

  function addEvent(type, message) {
    const event = {
      type,
      message: message || '',
      timestamp: new Date().toISOString(),
    }
    loadEvents.value.unshift(event)
    if (loadEvents.value.length > 30) {
      loadEvents.value.splice(30)
    }
    listeners.forEach(cb => cb(event))
  }

  function setStatus(status, message = '') {
    loadStatus.value = status
    if (status === 'error') {
      loadError.value = message || 'Ошибка загрузки данных'
    } else if (status === 'success') {
      loadError.value = ''
    }
    addEvent(status, message)
  }

  async function loadAllHomeData(force = false) {
    if (loadStatus.value === 'loading' && !force) {
      return true
    }

    setStatus('loading', 'Запуск загрузки данных')
    const contentStore = useContentStore()
    const calendarStore = useCalendarEventsStore()

    const tasks = [
      contentStore.getSunday(force),
      contentStore.getStories(force),
      contentStore.getNews(force),
      calendarStore.getCalendarEvents(force),
    ]

    const results = await Promise.allSettled(tasks)
    const errors = results.filter(result => result.status === 'rejected')
    if (errors.length) {
      const message = errors
        .map(result => result.status === 'rejected' ? result.reason?.message || 'Unknown error' : '')
        .filter(Boolean)
        .join('; ')
      setStatus('error', message)
      return false
    }

    setStatus('success', 'Данные загружены')
    return true
  }

  async function refreshHomeData() {
    return loadAllHomeData(true)
  }

  function addLoadingListener(callback) {
    listeners.push(callback)
    return () => {
      const index = listeners.indexOf(callback)
      if (index !== -1) listeners.splice(index, 1)
    }
  }

  function handleOnline() {
    addEvent('network-online', 'Сеть восстановлена')
    loadAllHomeData(true).catch(() => {})
  }

  function handleOffline() {
    addEvent('network-offline', 'Соединение потеряно')
  }

  function init() {
    if (typeof window === 'undefined') return

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    addEvent('init', `Сеть ${navigator.onLine ? 'online' : 'offline'}`)
  }

  return {
    loadStatus,
    loadError,
    loadEvents,
    loadAllHomeData,
    refreshHomeData,
    addLoadingListener,
    init,
  }
})
