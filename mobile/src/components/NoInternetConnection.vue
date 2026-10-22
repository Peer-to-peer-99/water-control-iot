<script setup lang="ts">
import {IonPage, IonContent, IonButton} from '@ionic/vue';
import FountainPNG from '../assets/imgs/fountain.png';
const emit = defineEmits<{
    retry: []
}>();

function checkConnection(){
  emit('retry');
}
</script>

<template>
  <ion-page>
    <ion-content>
      <div class="h-screen mx-4 flex flex-col items-center text-center space-y-5">
        <img :src="FountainPNG" alt="Fountain Image" class="h-25"/>
        <h1>No connection</h1>
        <p>Unable to update the fountain information.<br> Please check your internet connection <br> and try again.</p>
        <button
            class="w-full bg-observatory-500 text-center h-8 text-white"
            style="border-radius: 8px;"
            @click="checkConnection()"
        >Try again</button>
        <button
            class="w-full text-center h-8 text-observatory-800 "
            style="border-radius: 8px;"
        >Back to the beginning</button>
      </div>
    </ion-content>
  </ion-page>
</template>

<style scoped>

</style>