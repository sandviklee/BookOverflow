import { defineStore } from 'pinia'

export const userStore = defineStore('UserStore', {
  state: () => {
    return {
      uid: 'no user',
    }
  },
  persist: true,
})
  