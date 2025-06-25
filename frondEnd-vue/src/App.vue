<template>
  <div id="app">
    <NavBar />

    <section class="section">
      <router-view></router-view>
    </section>

    <SnackBar
      :show="show"
      :message="message"
      @update:show="show = $event"
      :icon="icon"
      :color="color"
      :duration="timer"
    />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import axios from "axios";
import NavBar from "@/components/layout/NavBar.vue";
import SnackBar from "@/components/SnackBar.vue";
import { useToastStore } from "@/store/ToastStore.js";
import { useUserStore } from "@/store/userStore.js";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const toast_store = useToastStore();
const { message, color, timer, icon, show } = storeToRefs(toast_store);
// Set up axios defaults
onMounted(() => {
  userStore.initializeStore();

  if (userStore.token) {
    axios.defaults.headers.common["Authorization"] = "Token " + userStore.token;
  } else {
    axios.defaults.headers.common["Authorization"] = "";
  }
});
</script>
