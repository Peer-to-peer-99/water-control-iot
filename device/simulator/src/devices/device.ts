import type { Sensor } from '../sensors/sensor.interface';
import type { DeviceReadingPayload } from '../types/reading';
import { ReadingService } from '../services/reading.service';
import { env } from '../config/env';

export class Device {
    constructor(
        private readonly sensor: Sensor,
        private readonly readingService: ReadingService,
    ) {}

    async sendReading(): Promise<void> {
        const reading = await this.sensor.read();

        const payload: DeviceReadingPayload = {
            device_id: env.deviceId,
            distance_cm: reading.distanceCm,
            measured_at: reading.measuredAt,
        };
        try {
            await this.readingService.send(payload);
        } catch (error: unknown) {
            console.error(error);
        }
    }

    async start(): Promise<void> {
        await this.sendReading();
        setInterval(() => {
            void this.sendReading();
        }, env.simulationIntervalMs);
    }
}