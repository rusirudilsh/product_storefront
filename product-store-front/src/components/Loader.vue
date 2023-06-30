<script setup lang="ts">
import axios from 'axios';
import ProgressSpinner from 'primevue/progressspinner';
import { onMounted, ref } from 'vue';

const isVisible = ref(false)

onMounted(async() => {
    await iterceptHTTPRequests();
    await iterceptHTTPResponses();
  })

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
    <div v-if="isVisible" class="card flex justify-content-center loader" >
        <ProgressSpinner />
    </div>     
</template>

<style scoped>
.loader {
    position: absolute;
    left: calc(50% - 50px);
    top: calc(50% - 100px);
    z-index: 999;
}

</style>
