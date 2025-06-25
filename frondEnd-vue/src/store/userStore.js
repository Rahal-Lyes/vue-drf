import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    isLoading: false,
    isAuthenticated: false,
    token: "",
  }),

  actions: {
  
    initializeStore() {
      const token = localStorage.getItem("token")
      if (token) {
        this.token = token
        this.isAuthenticated = true
      } else {
        this.token = ""
        this.isAuthenticated = false
      }
    },
    setIsLoading(status) {
      this.isLoading = status;
    },
    setToken(token){
      this.token=token
      this.isAuthenticated=true
    },
    removeToken(){
      this.token='',
      this.isAuthenticated=false
    }
  },

});
