import api from './index';
import type { SessionResponse } from '../../types/session';
async function checkSession(): Promise<boolean>
{
    try {
        const response = await api.get<SessionResponse>('/v1/session/check');
        return response.data;
    }catch (error){
        throw error;
    }
}

export {checkSession};