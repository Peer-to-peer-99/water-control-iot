import api from 'index.ts'
import type { LoginCredentials, LoginResponse } from "../types/auth.ts"

export async function login(
    credentials: LoginCredentials
): Promise<LoginResponse>{
    const response = await api.post<LoginResponse>(
        'v1/auth/login',
        credentials
    );

    return response.data;
}