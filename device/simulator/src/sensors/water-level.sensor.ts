import type { Sensor } from './sensor.interface';
import type { SensorReading } from '../types/reading';
import type { Reservoir } from '../reservoirs/reservoir.model';

export class WaterLevelSensor implements Sensor {
    constructor(
        private readonly reservoir: Reservoir,
        private readonly heightCm: number,
    ) {
        if (!Number.isFinite(heightCm) || heightCm <= 0) {
            throw new Error(
                'The height of the reservoir must be greater than zero.',
            );
        }
    }

    async read(): Promise<SensorReading> {
        const waterHeightCm =
            (this.reservoir.levelPercentage / 100) * this.heightCm;

        const distanceCm = Number(
            (this.heightCm - waterHeightCm).toFixed(2),
        );

        return {
            distanceCm,
            measuredAt: new Date().toISOString(),
        };
    }
}