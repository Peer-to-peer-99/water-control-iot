<script setup>
import {IonTabs, IonRouterOutlet} from '@ionic/vue';
import BottomNav from '../components/BottomNav.vue';
</script>

<template>
  <ion-tabs>
    <ion-router-outlet/>
    <BottomNav/>
  </ion-tabs>
</template>

<style scoped>

</style>