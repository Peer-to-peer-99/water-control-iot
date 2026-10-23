interface SensorReading {
    distanceCm: number;
    measuredAt: string;
}
interface DeviceReadingPayload {
    device_id: string;
    distance_cm: number;
    measured_at: string;
}

export type {
    SensorReading,
    DeviceReadingPayload
}