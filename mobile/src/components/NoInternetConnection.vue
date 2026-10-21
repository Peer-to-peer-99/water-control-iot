<script setup lang="ts">
import {IonPage, IonContent, IonButton} from '@ionic/vue';
const emit = defineEmits<{
    retry: []
}>();

function checkConnection(){
  emit('retry');
}
</script>

<template>
  <ion-page>
    <ion-content >
      <div>
        <h1>No connection</h1>
        <p>Unable to update the fountain information. Please check your internet connection and try again.</p>
        <ion-button
            color=" bg-observatory-500 "
            class="w-full px-4 text-center !rounded-lg text-white"
        >Try again</ion-button>
        <ion-button expand="block"
                    color="bg-white"
                    class="w-full px-4 text-center !rounded-lg text-observatory-600"
        >Back to the beginning</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<style scoped>

</style>