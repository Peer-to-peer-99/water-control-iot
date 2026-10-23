import type {Sensor} from  './sensor.interface';
import type {SensorReading} from "../types/reading";

export class WaterLevelSensor  implements Sensor
{
    async read(): Promise<SensorReading>{
        const distanceCm = Number(
            (10 + Math.random() * 70).toFixed(2),
        );
        return {
            distanceCm,
            measuredAt: new Date().toISOString()
        };
    }
}