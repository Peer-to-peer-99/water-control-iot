<script setup lang="ts">
import {onMounted} from "vue";
import {IonPage, IonAvatar} from '@ionic/vue';
import {useSessionStore} from '../stores/session.stores.ts';
import {User, ChevronRight, Phone, CircleQuestionMark, Info, LogOut} from '@lucide/vue'
import {ProfileItem} from "../types/profile.ts";
const sessionStore = useSessionStore();
const items: ProfileItem[]  = [
  {
    title:  'My data',
    link: '/profile/data',
    iconLeft: User,
    iconRight: ChevronRight,
    classesName: 'rounded-xl border border-slate-100'
  },
  {
    title: 'My devices',
    description: 'Preference history',
    link: '/profile/devices',
    iconLeft: Phone,
    iconRight: ChevronRight,
    classesName: 'rounded-xl border border-slate-100 flex gap-2  justify-between'
  },
  {
    title: 'Help and support',
    link: '/profile/help',
    iconLeft: CircleQuestionMark,
    iconRight: ChevronRight,
    classesName: 'rounded-xl border border-slate-100'
  },
  {
    title: 'About the app',
    link: '/profile/about',
    iconLeft: Info,
    iconRight: ChevronRight,
    classesName: 'rounded-xl border border-slate-100'
  },
  {
    title: 'Logout',
    iconLeft: LogOut,
    classesName: 'rounded-xl border border-slate-100 text-red-500'
  }
];
onMounted(async () => {
  await sessionStore.getUser();
})
</script>

<template>
  <ion-page>
    <ion-content  class="space-y-6">
      <div class="flex gap-4">
        <ion-avatar/>
        <div>
          <h3 class="text-lg font-semibold text-slate-800">{{sessionStore.user?.name}}</h3>
          <p>{{sessionStore.user?.email}}</p>
        </div>
      </div>
      <ion-list
          :inset="false"
          v-for="item in items"
          class="flex flex-col items-start"
      >
        <ion-item
            button
            detail="false"
            :router-link="item"
            :class="item.classesName"
        >
          <component v-if="item.iconLeft" :is="item.iconLeft"/>
          <ion-label >
            <h2>{{item.title}}</h2>
            <p>{{item.description}}</p>
          </ion-label>
          <component v-if="item.iconRight" :is="item.iconRight"/>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<style scoped>

</style>