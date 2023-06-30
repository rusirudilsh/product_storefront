<script setup lang="ts">
import axios from 'axios';
import ProgressSpinner from 'primevue/progressspinner';
import { onMounted, ref } from 'vue';

const isVisible = ref(false)

onMounted(async() => {
    await iterceptHTTPRequests();
    await iterceptHTTPResponses();
  })

   //the ideal way of doing this is to move axios interceptors in to a another service
   //then use event emitors or store to communicate the Http event changes to this compoenent.
  async function iterceptHTTPRequests() {
    await axios.interceptors.request.use(function (config) {
        isVisible.value = true;
        return config;
    }, function (error) {
        isVisible.value = false;
        return Promise.reject(error);
    });
  }

  async function iterceptHTTPResponses() {
    await axios.interceptors.response.use(function (response) {
        isVisible.value = false;
        return response;
    }, function (error) {
        isVisible.value = false;
        return Promise.reject(error);
    });
  }
</script>


<template>
    <div v-if="isVisible" class="loader-overlay">
        <div class="card flex justify-content-center loader" >
        <ProgressSpinner />
    </div>  
    </div>
       
</template>

<style scoped>

.loader-overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99999;
  cursor: pointer;
}

.loader {
    position: fixed;
    left: calc(50% - 50px);
    top: calc(50% - 100px);
    z-index: 999;
}

</style>
