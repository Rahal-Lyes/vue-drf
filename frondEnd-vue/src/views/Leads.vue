<template>

  <div class="container">
    <h1 class="title">Leads</h1>
    <div class="box">
      <p>Welcome to the Leads page!</p>
      <p>This is where you can manage your leads.</p>
    {{ leads }}
    </div>

  </div>
</template>

<script setup>
import { onMounted,ref } from "vue";
import axios from "axios";
const leads = ref([]);

onMounted(()=> {
  axios.get("/api/v1/leads/")
    .then(response => {
    leads.value = response.data;
      
    })
    .catch(error => {
      console.error("Error fetching leads:", error);
    });
})
 
</script>