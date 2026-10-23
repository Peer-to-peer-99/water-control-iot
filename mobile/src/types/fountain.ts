interface Fountain
{
    id: number;
    name: string;
    latitude: number;
    longitude: number;
}

interface FountainState
{
    error: string | null;
    loading: boolean;
    fountains: Fountain[]
}
export {Fountain, FountainState};