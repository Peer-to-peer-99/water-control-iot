import api from "./index";
import {Reading} from "../types/reading";
export async function fetchLatestReading(
    fountainId: number,
): Promise<Reading> {
    const response = await api.get(
        `v1/fountains/${fountainId}/readings/latest`,
    );

    return response.data;
}