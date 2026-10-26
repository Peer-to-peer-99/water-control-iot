<script setup lang="ts">
import {useSessionStore} from "../stores/session.stores.ts";
import {useFountainStore} from '../stores/fountain.stores.ts';
import {onMounted} from "vue";
import {storeToRefs} from 'pinia';
import {useRouter} from 'vue-router';

import { IonPage, IonContent, IonTabButton, IonLabel, IonRouterOutlet } from '@ionic/vue';
import Input from "../components/Input.vue";
import {Search, LucideHome} from '@lucide/vue'
import Map from "../components/Map.vue";

const router = useRouter();

const sessionStore = useSessionStore();
const fountainStore = useFountainStore();
const { fountains } = storeToRefs(fountainStore);

import  {ChevronRight} from '@lucide/vue';

onMounted(async () => {
  await sessionStore.getUser();
  await fountainStore.getFountains();
});

function openFountain(id: number)
{
  router.push({
    name: 'FountainDetails',
    params: {
      id
    }
  });
}
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
      <section>
        <Map />
      </section>
      <section class="relative mb-4">
          <ion-list
              :inset="false"
              v-for="fountain in fountainStore.fountains"
              class="flex flex-col items-start"
              @click="openFountain(fountain.id)"
          >
            <ion-item
                button
                detail="false"
            >
                <label>{{fountain.name}}</label>
                <span>{{fountain.status}}</span>
                <ChevronRight/>
            </ion-item>
          </ion-list>
      </section>
    </ion-content>
  </ion-page>
</template>

<style scoped>

</style>