import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useManagementAppStore = defineStore('ManagementApp', () => {
  const isAppLoaded = ref(false);
  const isDarkMode = ref(false);

  return { isAppLoaded, isDarkMode }
})
