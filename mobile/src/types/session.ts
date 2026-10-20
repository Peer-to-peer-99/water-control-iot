export interface SessionResponse {
    authenticated: boolean
}
export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
}
export interface SessionState {
    error: string | null;
    loading: boolean;
    authenticated: boolean;
    user: User | null;
}

export interface LoginResponse {
    success: boolean;
    data: User;
    message: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}