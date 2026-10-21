<script setup>
import {useSessionStore} from "../stores/session.stores.ts";
import {onMounted} from "vue";

import { IonPage, IonContent, IonTabButton, IonLabel, IonRouterOutlet } from '@ionic/vue';
import Input from "../components/Input.vue";
import {Search, LucideHome} from '@lucide/vue'
import Map from "../components/Map.vue";
const sessionStore = useSessionStore();

onMounted(async () => {
  await sessionStore.getUser();
});
</script>

<template>
  <ion-page>
    <ion-content>
      <div class="mx-5 space-y-4">
        <div>
          <h1 class="font-bold">Hello,  {{sessionStore.user?.name}}</h1>
          <p>Find the nearest drinking fountain</p>
        </div>
        <Input :left-icon="Search" placeholder="Search by address or name"/>
      </div>
    </ion-content>
  </ion-page>
</template>

<style scoped>

</style>