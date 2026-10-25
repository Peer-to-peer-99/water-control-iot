import {Reservoir} from '../reservoirs/reservoirs.model';

export class ReservoirFlowService {
    private lastUpdateAt: number;

    constructor(
        private readonly reservoir: Reservoir,
        private readonly inflowLitersPerMinute: number,
    ) {
        if (
            !Number.isFinite(inflowLitersPerMinute) ||
            inflowLitersPerMinute < 0
        ) {
            throw new Error(
                'The inflow rate must be a non-negative number.',
            );
        }

        this.lastUpdateAt = Date.now();
    }

    update(): void {
        const now = Date.now();

        const elapsedSeconds =
            (now - this.lastUpdateAt) / 1000;

        this.lastUpdateAt = now;

        const inflowLiters =
            (this.inflowLitersPerMinute / 60) * elapsedSeconds;

        this.reservoir.fill(inflowLiters);
    }

    getReservoirState() {
        return this.reservoir.toJSON();
    }
}