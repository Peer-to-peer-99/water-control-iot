import "dotenv/config";

function requiredEnv(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`The variable ${name} has not been set.`);
    }

    return value;
}

const intervalMs = Number(
    process.env.SIMULATION_INTERVAL_MS ?? 5000,
);


if (!Number.isFinite(intervalMs) || intervalMs <= 0) {
    throw new Error(
        'SIMULATION_INTERVAL_MS must be a positive number.',
    );
}

export const env = {
    deviceId: requiredEnv('DEVICE_ID'),
    deviceApiUrl: requiredEnv('DEVICE_API_URL'),
    simulationIntervalMs: intervalMs,
};
