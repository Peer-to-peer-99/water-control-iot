<script setup>
import Input from '../../components/Input.vue';
import {ref} from 'vue';
import { Mails, Lock, Eye, EyeOff } from '@lucide/vue';
import Logo from '../../assets/icon/logo.svg';

const isPasswordVisible = ref(false);
function togglePasswordVisibility() {
  isPasswordVisible.value = !isPasswordVisible.value;
}
</script>

<template>
  <main class="flex flex-col mx-5 space-y-4 justify-center h-screen">
    <img :src="Logo" class="h-25"/>
    <header>
      <h2 class="font-bold">Sign In</h2>
      <p>Access your account to get water and track your usage</p>
    </header>
    <Input
      type="email"
      :left-icon="Mails"
      placeholder="E-mail or phone"
    />
    <Input
        :type="isPasswordVisible ? 'text' : 'password'"
        :left-icon="Lock" placeholder="Password"
        :right-icon="isPasswordVisible ? Eye : EyeOff"
        :on-right-icon-click="togglePasswordVisibility"
    />
    <IonButton class="flex items-center justify-center bg-observatory-500 rounded-lg text-white px-3 py-2">Sign in</IonButton>
    <p class="text-center text-observatory-600">Forgot my password</p>
    <IonButton fill="outline" class="px-3 py-2 flex items-center justify-center border border-gray-400 rounded-lg">
      Continue with Google
    </IonButton>
    <p class="text-center">Don't have an account? <span class="text-observatory-600 underline">Sign up</span></p>
  </main>
</template>

<style scoped>

</style>