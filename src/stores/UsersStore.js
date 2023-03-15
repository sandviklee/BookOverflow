import { defineStore } from 'pinia'
import { ref } from 'vue'

export const userStore = defineStore('UserStore', () => {
    const uid = ref('no user')
    
    return { uid }
  })
  