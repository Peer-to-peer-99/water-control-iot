import { createApp } from 'vue';
import { IonicVue } from '@ionic/vue'

import App from "./App.vue";
import router from './router';
import {createPinia} from 'pinia';

import './css/style.css';

import '@ionic/vue/css/core.css';
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

const app = createApp(App);
const pinia = createPinia();

app.use(IonicVue);
app.use(router);
app.use(pinia);

router.isReady().then(() => {
    app.mount('#app');
});