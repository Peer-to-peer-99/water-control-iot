interface SensorReading {
    distanceCm: number;
    measuredAt: string;
}

interface DeviceReadingPayload {
    //device_id?: string;
    device_uuid: string;
    reservoir_id: string;
    distance_cm: number;
    volume_liters: number;
    capacity_liters: number;
    level_percentage: number;
    measured_at: string;
}
interface Reservoir {
    levelPercentage: number;
    id: string;
    name: string;
    capacityLiters: number;
    currentVolumeLiters: number;
}

export type {
    SensorReading,
    DeviceReadingPayload,
    Reservoir
}