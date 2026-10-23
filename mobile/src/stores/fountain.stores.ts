import {defineStore} from "pinia";
import {FountainState} from "../types/fountain";
export const fountainStore = defineStore('fountain', {
    state: (): FountainState => ({
        fountains: [],
        loading: false,
        error: null,
    }),
});