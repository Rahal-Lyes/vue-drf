import { defineStore } from 'pinia';
import { ACCESS_TOKEN_LOCAL_STORAGE } from '@/utils/local_storage';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        permissions: [],
    }),
    actions: {
        ActionDoLogout() {
            localStorage.removeItem(ACCESS_TOKEN_LOCAL_STORAGE);
            this.permissions = [];
        },
    }
});
