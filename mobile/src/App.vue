<script setup>
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import {useNetwork} from "./composables/useNetwork.ts";
import NoInternetConnection from "./components/NoInternetConnection.vue";
const {isConnected, checkConnection} = useNetwork();
</script>

<template>
  <ion-app>
    <NoInternetConnection v-if="!isConnected" @retry="checkConnection"/>
    <ion-router-outlet v-else/>
  </ion-app>
</template>

<style scoped>

</style>