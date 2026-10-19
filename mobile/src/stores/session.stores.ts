import {defineStore} from 'pinia';
import type {SessionState} from '../types/session';
import {checkSession} from '../api/session.api';
export const useSessionStore = defineStore('session',  {
    state: (): SessionState => ({
        authenticated: false,
        loading: false,
        error: null
    }),
    actions: {
        async verifySession(): Promise<boolean>{
            this.loading = true;
            this.error = null;

            try {
                this.authenticated = await checkSession();
                return this.authenticated;
            }catch (error){
                this.error = 'Unable to verify the session.';
                throw new Error(this.error);
            }finally {
                this.loading = false;
            }
        }
    }
});