import { defineStore } from 'pinia';
import type {AuthState} from '../types/auth.ts';

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
    }),
    getters: {
        isLoggedIn: (state): boolean => state.isAuthenticated,
    },
    actions: {
        async login(credentials: LoginCredentials): Promise<void> {
            this.isLoading = true;
            this.error = null;

            try {
                const response: LoginResponse = await loginRequest(credentials);

                this.user = response.user;
                this.token = response.token ?? null;
                this.isAuthenticated = true;

            } catch (error: unknown) {
                this.error = 'Não foi possível realizar o login.';
                throw error;
            } finally {
                this.isLoading = false;
            }
        },
    }
});