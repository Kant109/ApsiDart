import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useGestionsAppStore = defineStore('GestionsApp', () => {
  const isAppLoaded = ref(false)

  return { isAppLoaded }
})
