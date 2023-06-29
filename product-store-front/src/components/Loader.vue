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
        console.log(response)
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
.loader {
    position: absolute;
    left: calc(50% - 50px);
    top: calc(50% - 100px);
}

.loader-overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 254, 254, 0.884);
    z-index: 999;
    cursor: pointer;
}

</style>
