import { env } from './config/env';
import { WaterLevelSensor } from './sensors/water-level.sensor';
import { ReadingService } from './services/reading.service';
import { Device } from './devices/device';
import {Reservoir} from "./reservoirs/reservoirs.model";
import {ReservoirFlowService} from "./services/reservoir-flow.service";

async function main(): Promise<void> {
    const reservoir = new Reservoir(
        'reservoir-001',
        'Reservatório principal',
        1000,
        500,
    );

    const sensor = new WaterLevelSensor(reservoir,  100);


    const readingService = new ReadingService(
        env.deviceApiUrl,
    );
    const flowService = new ReservoirFlowService(reservoir, 120);

    const device = new Device(sensor, readingService, flowService);
    console.log('Starting IoT simulator...');

    await device.start();
}

main().catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
});