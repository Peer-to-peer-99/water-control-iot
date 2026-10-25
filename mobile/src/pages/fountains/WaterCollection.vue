```vue
<script setup lang="ts">
import {Clock, Droplet, Thermometer} from '@lucide/vue';
import { IonPage, IonContent } from '@ionic/vue';
import { useReadingStore } from "../../stores/reading.stores";
import {computed, onBeforeUnmount, onMounted} from "vue";
import { useRoute, useRouter } from 'vue-router';
import CircularProgress from "../../components/CircularProgress.vue";
import {useFountainStore} from "../../stores/fountain.stores";

const route = useRoute();
const fountainStore = useFountainStore();

const metrics = computed(() => [
  {
    icon: Droplet,
    name: "Current level",
    value:  fountainStore.fountain?.water_level?.percentage + '%'
  },
  {
    icon: Clock,
    name:  "Flow rate",
    value: "1,8L/min"
  },
  {
    icon: Thermometer,
    name: "Temperature",
    value: "24ºC"
  }
]);

let intervalId: ReturnType<typeof setInterval> | undefined;

async function updateFountain() {
  const id = Number(route.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return;
  }

  await fountainStore.getFountain(id);
}

onMounted(async () => {
  await updateFountain();

  intervalId = setInterval(() => {
    void updateFountain();
  }, 5000);
});
onBeforeUnmount(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
});
</script>

<template>
  <ion-page>
    <ion-content>
      <div class="bg-observatory-800 px-6 h-screen space-y-3">
        <section class="flex justify-center py-6 ">
          <CircularProgress :value="fountainStore.fountain?.water_level?.percentage" :size="120" :thickness="8" color="#16a34a" track-color="#e5e7eb"/>
        </section>
        <div class="text-center">
          <p class="text-white">Estimated time</p>
          <div class="justify-center flex py-2 text-white gap-3">
            <Clock/>
            <p>~ 4 min</p>
          </div>
        </div>
        <div class="rounded-lg bg-observatory-600"  >
          <div   class="flex px-6 py-2 text-white" v-for="metric in metrics">
            <div class="w-full flex items-center  gap-3">
              <component v-if="metric.icon" :is="metric.icon"/>
              <label>{{metric.name}}</label>
            </div>
            <label>{{metric.value}}</label>
          </div>
        </div>
        <button
            class=" w-full !rounded-lg bg-observatory-500 h-10 text-white"
            @click="stopCollection"
        >
          Stop collection
        </button>
      </div>
    </ion-content>
  </ion-page>
</template>

<style scoped>

</style>
```