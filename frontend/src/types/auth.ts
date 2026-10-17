export interface LoginCredentials {
    email: string
    password: string
}

export interface AuthUser {
    id: number;
    name: string;
    email: string;
}

export interface LoginResponse {
    user: AuthUser;
    token?: string;
}

export interface AuthState {
    user: AuthUser | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}