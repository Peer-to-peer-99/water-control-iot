<script setup lang="ts">
import {IonPage, IonContent} from '@ionic/vue';
import {useFountainStore} from '../../stores/fountain.stores';
import {onMounted} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {Droplet, Thermometer, WifiIcon} from '@lucide/vue';

const route = useRoute();
const router = useRouter();

const fountainStore = useFountainStore();
const metrics = [
  {
    icon: Droplet,
    name: 'Water Level',
    value: fountainStore.fountain?.water_level
  },
  {
    icon: Thermometer,
    name: 'Temperature',
    value: fountainStore.fountain?.temperature
  },
  {
    icon: WifiIcon,
    name: 'Connection',
    value: fountainStore.fountain?.connection?.status
  }
];

onMounted(async () => {
  const id = Number(route.params.id);

  if (Number.isInteger(id) && id > 0) {
    await fountainStore.getFountain(id);
  }
});

function collectWater() {
  const id = fountainStore.fountain?.id;

  if (!id) {
    return;
  }

  router.push({
    name: 'WaterCollection',
    params: { id },
  });
}
</script>

<template>
<ion-page>
  <ion-content >
    <div class="mx-6">
      <h1 class="font-bold">{{fountainStore.fountain?.name}}</h1>
      <section class="grid grid-cols-3 gap-4">
        <div v-for="metric in metrics"  class="border border-gray-300 rounded-lg flex flex-col justify-center items-center space-y-2">
          <component v-if="metric.icon" :is="metric.icon"/>
          <label class="text-sm">{{metric.name}}</label>
          <label class="text-lg text-observatory-600">{{metric.value}}</label>
        </div>
      </section>
      <h4>Availability</h4>
      <div class="p-4 rounded-lg bg-observatory-50">
        <label class="text-observatory-700">Can collect water</label>
        <p class="text-observatory-600">System released for use</p>
      </div>
      <button
          @click="collectWater"
          class="w-full h-10 text-white !rounded-lg  bg-observatory-500">Start collection</button>
      <button class="w-full h-10 text-observatory-700">View on map</button>

    </div>

  </ion-content>
</ion-page>
</template>

<style scoped>

</style>