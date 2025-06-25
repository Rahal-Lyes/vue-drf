<template>
  <div>
    <button class="button is-danger" @click="logout">Logout</button>
  </div>
</template>
<script setup>
import { useUserStore } from "@/store/userStore.js";
import axios from "axios";
import { useRouter } from "vue-router";
const router= useRouter();

const userStore = useUserStore();
async function logout() {
  try {
      userStore.setIsLoading(true);
    await axios.post("/api/v1/token/logout/");
    // Redirect to login page or home page after logout
  
  } catch (error) {
    console.error("Logout failed:", error);
  }


  axios.defaults.headers.common["Authorization"] = null;
  localStorage.removeItem("token");
  userStore.removeToken();
    router.push("/login");
    userStore.setIsLoading(false);
}
</script>
