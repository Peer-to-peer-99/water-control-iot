<script setup>
import Input from '../../components/Input.vue';
import {ref} from 'vue';
import { Mails, Lock, Eye, EyeOff } from '@lucide/vue';
import Logo from '../../assets/icon/logo.svg';
import {useSessionStore} from "../../stores/session.stores.ts";
import {useForm} from "vee-validate";
import {loginSchema} from "../../validation/auth.schema.ts";
import {toTypedSchema} from "@vee-validate/zod";
import { IonPage } from '@ionic/vue';

const sessionStore = useSessionStore();
const isPasswordVisible = ref(false);

const {defineField, errors, handleSubmit} = useForm({
  validationSchema: toTypedSchema(loginSchema)
});
const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('password');


function togglePasswordVisibility() {
  isPasswordVisible.value = !isPasswordVisible.value;
}
const onSubmit = handleSubmit(async (values) => {
  await sessionStore.login(values);
});

</script>

<template>

  <IonPage class="flex flex-col mx-5 space-y-4 justify-center h-screen">
    <img :src="Logo" class="h-25"/>
    <header>
      <h2 class="font-bold">Sign In</h2>
      <p>Access your account to get water and track your usage</p>
    </header>

    <div>
      <Input
          type="email"
          v-model="email"
          v-bind="emailAttrs"
          :left-icon="Mails"
          placeholder="E-mail or phone"
      />
      <p v-if="errors.email"  class="text-red-500">{{errors.email}}</p>
    </div>

    <div>
      <Input
          :type="isPasswordVisible ? 'text' : 'password'"
          v-model="password"
          v-bind="passwordAttrs"
          :left-icon="Lock" placeholder="Password"
          :right-icon="isPasswordVisible ? Eye : EyeOff"
          :on-right-icon-click="togglePasswordVisibility"
      />
      <p v-if="errors.password"  class="text-red-500">{{errors.password}}</p>
    </div>
    <IonButton
        @click="onSubmit"
        class="flex items-center justify-center bg-observatory-500 rounded-lg text-white px-3 py-2">Sign in</IonButton>
    <p class="text-center text-observatory-600">Forgot my password</p>
    <IonButton
        @click="sessionStore.loginWithGoogle()"
        fill="outline" class="px-3 py-2 flex items-center justify-center border border-gray-400 rounded-lg">
      Continue with Google
    </IonButton>
    <p class="text-center">Don't have an account? <span class="text-observatory-600 underline">Sign up</span></p>
  </IonPage>
</template>

<style scoped>

</style>