import {defineStore} from 'pinia'
import {ref} from 'vue'

export const useAppState = defineStore('appState', () => {
  const drawer = ref(null)
  const theme = ref('mbvLight')
  const isPending = ref(false)
  const pendingRequests = ref(0)

  function startLoading() {
    pendingRequests.value += 1
    isPending.value = true
  }

  function finishLoading() {
    pendingRequests.value = Math.max(0, pendingRequests.value - 1)
    if (pendingRequests.value === 0) {
      isPending.value = false
    }
  }

  const handleTheme = () => {
    if (theme.value === 'dark') {
      theme.value = 'mbvLight'
    } else {
      theme.value = 'dark'
    }
  }

  return {
    drawer,
    theme,
    isPending,
    pendingRequests,
    startLoading,
    finishLoading,
    handleTheme,
  }
})
