<script setup lang="ts">
import {IonPage, IonContent} from '@ionic/vue';
import {useFountainStore} from '../../stores/fountain.stores.ts';
import {onMounted} from 'vue';
import {useRoute} from 'vue-router';

const route = useRoute();
const fountainStore = useFountainStore();

onMounted(async () => {
  const id = Number(route.params.id);

  if (Number.isInteger(id) && id > 0) {
    await fountainStore.getFountain(id);
  }
});
</script>

<template>
<ion-page>
  <ion-content>
    <section>
    </section>
    <div class="absolute inset-x-0 top-0 z-10 flex ">

    </div>
  </ion-content>
</ion-page>
</template>

<style scoped>

</style>