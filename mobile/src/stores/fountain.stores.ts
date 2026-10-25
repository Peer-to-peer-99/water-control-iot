import {defineStore} from "pinia";
import type {FountainState} from "../types/fountain";
import {fetchFountains,  fetchFountain} from '../api/fountain.api';

export const useFountainStore = defineStore('fountain', {
    state: (): FountainState => ({
        fountains: [],
        fountain: null,
        loading: false,
        error: null,
    }),
    actions: {
        async getFountains(){
            this.loading = true;
            this.error = null;

            try {
                this.fountains = await fetchFountains();
            }catch (error){
                // @ts-ignore
                this.error = error;
            }
        },

        async getFountain(id: number){
            this.loading = true;
            this.error = null;
            this.fountain = null;

            try {
                this.fountain = await fetchFountain(id);
            }catch (error){
                // @ts-ignore
                this.error = error;
            }
        }
    }
});