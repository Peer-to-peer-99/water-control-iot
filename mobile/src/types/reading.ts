interface Reading {
    id: number;
    device_id: number;
    reservoir_id: string;
    distance_cm: number | string;
    volume_liters: number | string;
    capacity_liters: number | string;
    level_percentage: number | string;
    measured_at: string;
}

interface ReadingState {
    reading: Reading | null;
    loading: boolean;
    error: string | null;
}

export {
    Reading,
    ReadingState
}