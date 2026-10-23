import { env } from './config/env';
import { WaterLevelSensor } from './sensors/water-level.sensor';
import { ReadingService } from './services/reading.service';
import { Device } from './devices/device';

async function main(): Promise<void> {
    const sensor = new WaterLevelSensor();

    const readingService = new ReadingService(
        env.deviceApiUrl,
    );

    const device = new Device(sensor, readingService);
    console.log('Starting IoT simulator...');

    await device.start();
}

main().catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
});