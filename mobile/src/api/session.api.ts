import api from './index';
import type { SessionResponse, LoginResponse } from '../../types/session';
import {LoginCredentials} from "../types/session";
async function checkSession(): Promise<boolean>
{
    try {
        const response = await api.get<SessionResponse>('/v1/session/check');
        return response.data;
    }catch (error){
        throw error;
    }
}

async function getCsrfCookie(): Promise<void>{
    await api.get('http://localhost:8000/sanctum/csrf-cookie');
}
async function login(credentials: LoginCredentials): Promise<LoginResponse>{
    await getCsrfCookie();
    const response = await api.post<LoginResponse>('/v1/auth/login', credentials);
    return response.data;
}
function loginWithGoogle(): void {
    window.location.href = `${api.defaults.baseURL}/auth/google/redirect`;
}

export {
    checkSession,
    loginWithGoogle,
    login
};