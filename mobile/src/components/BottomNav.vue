<script setup>
import {IonTabBar, IonTabButton, IonLabel} from '@ionic/vue';
import {LucideHome, RotateCwIcon, BellDot} from '@lucide/vue'
</script>

<template>
  <ion-tab-bar  slot="bottom" class="py-4 border-t-gray-300">
    <ion-tab-button tab="home" href="/tabs/home">
      <LucideHome/>
      <ion-label>Home</ion-label>
    </ion-tab-button>
    <ion-tab-button>
      <RotateCwIcon/>
      <ion-label>History</ion-label>
    </ion-tab-button>
    <ion-tab-button tab="profile" href="/tabs/profile">
      <BellDot/>
      <ion-label>Profile</ion-label>
    </ion-tab-button>
  </ion-tab-bar>
</template>

<style scoped>

</style>