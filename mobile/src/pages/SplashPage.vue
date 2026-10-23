<script setup>
import {onMounted} from 'vue';
import {useRouter} from  'vue-router';
import {useSessionStore} from '../stores/session.stores.ts';

const router = useRouter();
const sessionStore = useSessionStore();

onMounted(async () => {
  try {
    const authenticated = await sessionStore.verifySession();
    if(authenticated){
      await router.replace('/home');
      return;
    }
    await router.replace('/login');
  }catch (error){
    console.log(error);
  }
});
</script>
<template>
  <main>
    <p v-if="sessionStore.loading">
      Check session...
    </p>
    <p v-if="sessionStore.error">
      {{sessionStore.error}}
    </p>
  </main>
</template>

<style scoped>

</style>