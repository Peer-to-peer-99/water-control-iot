import type { DeviceReadingPayload } from '../types/reading';

export class ReadingService {
    constructor(private readonly apiUrl: string) {}

    async send(reading: DeviceReadingPayload): Promise<void> {
        const response = await fetch(this.apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(reading),
        });

        if (!response.ok) {
            const responseBody = await response.text();

            throw new Error(
                `Error HTTP ${response.status}: ${responseBody}`,
            );
        }
    }
}