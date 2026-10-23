import { createRouter,  createWebHistory }  from "@ionic/vue-router";

import SplashPage from "../pages/SplashPage.vue";
import Login from "../pages/auth/Login.vue";
import HomePage from "../pages/HomePage.vue";
import ProfilePage from '../pages/ProfilePage.vue';
import TabsLayout from '../layouts/TabsLayout.vue';

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
        path: '/tabs',
        component: TabsLayout,
        children: [
            {
                path: '',
                redirect: '/tabs/home'
            },
            {
                path: 'home',
                name: 'Home',
                component:  HomePage
            },
            {
                path: 'profile',
                name: 'Profile',
                component: ProfilePage
            }
        ]
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;