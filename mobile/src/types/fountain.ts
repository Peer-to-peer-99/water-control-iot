interface Fountain
{
    id: number;
    name: string;
    description: string;
    latitude: number;
    longitude: number;
    status: string;
}

interface FountainState
{
    error: string | null;
    loading: boolean;
    fountains: Fountain[],
    fountain: Fountain
}
export {Fountain, FountainState};