import {defineStore} from 'pinia';
import type {LoginCredentials, SessionState} from '../types/session';
import {checkSession, loginWithGoogle as redirectToGoogle, login} from '../api/session.api';
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
        },
        async loginWithGoogle(): Promise<void> {
            this.error = null;
            redirectToGoogle();
        },
        async login(credentials: LoginCredentials): Promise<any> {
            this.loading = true;
            this.error = null;

            try {
                await login(credentials);
                this.authenticated = true;
            }catch (error){
                this.error = 'Unable to log in.';
                throw new Error(this.error);
            }finally {
                this.loading = false;
            }
        }
    }
});