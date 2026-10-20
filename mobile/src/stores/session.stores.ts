import {defineStore} from 'pinia';
import type {LoginCredentials, SessionState} from '../types/session';
import {checkSession, loginWithGoogle as redirectToGoogle, login, fetchUser} from '../api/session.api';
export const useSessionStore = defineStore('session',  {
    state: (): SessionState => ({
        authenticated: false,
        loading: false,
        error: null,
        user: null
    }),
    actions: {
        async getUser(){
            this.loading = true;
            this.error = null;
            try {
                this.user = await fetchUser();
                this.authenticated = this.user !== null;

                return this.user;
            } catch (error) {
                this.error = 'Unable to retrieve user.';
                throw error;
            } finally {
                this.loading = false;
            }
        },
        async verifySession(): Promise<boolean>{
            this.loading = true;
            this.error = null;

            try {
                this.authenticated = await checkSession();
                return this.authenticated;
            }catch (error){
                this.error = 'Unable to verify the session.';
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
                const response = await login(credentials);
                this.user = response.data;
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