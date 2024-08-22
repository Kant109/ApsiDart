import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useManagementAppStore = defineStore('ManagementApp', () => {
  const isAppLoaded = ref(false)

  return { isAppLoaded }
})
