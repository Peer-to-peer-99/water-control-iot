import { WaterLevelSensor } from '../sensors/water-level.sensor';

async function main(): Promise<void> {
    const sensor = new WaterLevelSensor();

    for (let i = 0; i < 5; i++) {
        const reading = await sensor.read();

        console.log(`Read ${i + 1}:`, reading);
    }
}

main().catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
});