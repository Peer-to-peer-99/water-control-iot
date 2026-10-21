import {onMounted, onUnmounted, ref} from 'vue';
import {PluginListenerHandle} from "@capacitor/core";
import { Network } from "@capacitor/network";

export function useNetwork(){
    const isConnected = ref();
    let listener: PluginListenerHandle | undefined;

    onMounted(async () => {
        const status = await Network.getStatus();
        isConnected.value = status.connected;

        listener = await Network.addListener('networkStatusChange',
            (status) => {
                isConnected.value = status.connected;
            });
    });

    onUnmounted(() => {
        listener?.remove();
    });

    async function checkConnection() {
        const status = await Network.getStatus();
        isConnected.value = status.connected;
    }


    return {isConnected, checkConnection};
}