import type {SensorReading} from "../types/reading";

export interface Sensor {
    read(): Promise<SensorReading>
}