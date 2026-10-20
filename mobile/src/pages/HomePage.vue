<script setup>
import {useSessionStore} from "../stores/session.stores.ts";
import {onMounted} from "vue";

const sessionStore = useSessionStore();

onMounted(async () => {
  await sessionStore.getUser();
});
</script>

<template>
  <div>
    <h1>Hello,  {{sessionStore.user}}</h1>
  </div>

</template>

<style scoped>

</style>