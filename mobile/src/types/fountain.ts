interface WaterLevel {
    distance_cm: number | null;
    percentage: number | null;
}


interface FountainConnection {
    status: 'connected' | 'disconnected';
    last_seen: string | null;
}

interface FountainTemperature {
    value: number | null;
    unit: string;
}


interface Fountain
{
    id: number;
    name: string;
    description: string;
    latitude: number;
    longitude: number;
    status: string;
    water_level?: WaterLevel;
    connection?: FountainConnection;
    temperature?: FountainTemperature;
}

interface FountainState
{
    error: string | null;
    loading: boolean;
    fountains: Fountain[],
    fountain: Fountain | null
}
export {Fountain, FountainState, WaterLevel, FountainConnection, FountainTemperature};