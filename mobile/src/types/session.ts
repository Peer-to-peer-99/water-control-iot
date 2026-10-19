export interface SessionResponse {
    authenticated: boolean
}

export interface SessionState {
    error: string | null;
    loading: boolean;
    authenticated: boolean;
}