import ContainerSelectionPage from "../pages/ContainerSelectionPage.vue";
import {createRouter, createWebHistory} from "vue-router";
import PaymentPage from "../pages/PaymentPage.vue";

const routes = [
    {
        path: '/',
        name: 'ContainerSelection',
        component: ContainerSelectionPage
    },
    {
        path: '/payment',
        name: 'Payment',
        component: PaymentPage
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;