import { createRouter,  createWebHistory }  from "@ionic/vue-router";

import SplashPage from "../pages/SplashPage.vue";
import Login from "../pages/auth/Login.vue";
import HomePage from "../pages/HomePage.vue";

const routes = [
    {
        path: '/',
        redirect: '/splash'
    },
    {
        path: '/splash',
        name: 'Splash',
        component: SplashPage,
    },
    {
        path: '/Login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/home',
        name: 'Home',
        component:  HomePage
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;