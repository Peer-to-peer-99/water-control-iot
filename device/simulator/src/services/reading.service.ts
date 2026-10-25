import type { DeviceReadingPayload } from '../types/reading';

export class ReadingService {
    constructor(private readonly apiUrl: string) {}

    async send(reading: DeviceReadingPayload): Promise<void> {
        console.log('[ReadingService] Sending reading:', {
            url: this.apiUrl,
            payload: reading,
        });

        const response = await fetch(this.apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(reading),
        });

        const responseBody = await response.text();

        console.log('[ReadingService] HTTP status:', response.status);
        console.log('[ReadingService] API response:', responseBody);

        if (!response.ok) {
            throw new Error(
                `Error HTTP ${response.status}: ${responseBody}`,
            );
        }

        console.log(
            `[ReadingService] Reading successfully sent. HTTP ${response.status}`,
        );
    }
}
