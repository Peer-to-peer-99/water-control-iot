import { createRouter,  createWebHistory }  from "@ionic/vue-router";

import SplashPage from "../pages/SplashPage.vue";
import Login from "../pages/auth/Login.vue";
import HomePage from "../pages/HomePage.vue";
import WaterCollection from '../pages/fountains/WaterCollection.vue';
import ProfilePage from '../pages/ProfilePage.vue';
import TabsLayout from '../layouts/TabsLayout.vue';
import {useSessionStore} from "../stores/session.stores";

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
        meta: {
            guestOnly: true
        }
    },
    {
        path: '/tabs',
        component: TabsLayout,
        meta: {
            requiresAuth: true
        },
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
    {
        path: '/fountain/:id',
        name: 'FountainDetails',
        component: () => import('../pages/fountains/FountainDetails.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/fountain/:id/collect',
        name: 'WaterCollection',
        component: WaterCollection,
        props: true,
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach((to) => {
    const sessionStore = useSessionStore();

    if (to.meta.requiresAuth && !sessionStore.authenticated) {
        return { name: 'Login' };
    }
});
export default router;