<script setup lang="ts">
import { useAuthStore } from '../../stores/auth.stores';
import { Mails, Lock, Eye, EyeOff } from '@lucide/vue'
import {ref} from 'vue';
import Input from '../../components/Input.vue';
//const authStore = useAuthStore();

const isPasswordVisible = ref(false);
function togglePasswordVisibility(){
  isPasswordVisible.value = !isPasswordVisible.value;
}
</script>

<template>
  <main class="flex h-screen items-center justify-center">
    <div class="space-y-2">
      <Input type="email" :left-icon="Mails" placeholder="Email or phone"/>
      <Input :type="isPasswordVisible ? 'text' : 'password'" :left-icon="Lock"
             :right-icon="isPasswordVisible ? EyeOff : Eye" placeholder="Password"
             :on-right-icon-click="togglePasswordVisibility"
      />
      <button class="flex gap-2 px-5 py-2 text-black rounded-full bg-white dark:text-white dark:bg-black">
        <svg
            class="text-black dark:text-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            width="24"
            height="24"
            fill="currentColor"
            aria-hidden="true"
        >
          <path
              d="M11 7c-4.973 0-9 4.027-9 9s4.027 9 9 9s9-4.027 9-9c0-.617-.066-1.219-.188-1.8l-.046-.2H11v3h6c-.477 2.836-3.027 5-6 5c-3.313 0-6-2.688-6-6c0-3.313 2.688-6 6-6c1.5 0 2.867.555 3.922 1.465l2.148-2.106A8.96 8.96 0 0 0 11 7m14 4v3h-3v2h3v3h2v-3h3v-2h-3v-3z"
          />
        </svg>
        Login with google
      </button>
    </div>
  </main>
</template>

<style scoped>

</style>