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
            //device_id: env.deviceId,
            device_uuid: env.deviceUuid,
            distance_cm: reading.distanceCm,
            measured_at: reading.measuredAt,
        };
        try {
            await this.readingService.send(payload);
        } catch (error: unknown) {
            console.error('[Device] Failed to send reading:', error);
        }
    }

    async start(): Promise<void> {
        console.log(
            `[Device] Simulator started. Interval: ${env.simulationIntervalMs} ms`,
        );
        await this.sendReading();
        setInterval(() => {
            void this.sendReading();
        }, env.simulationIntervalMs);
    }
}