export class Reservoir {
    private volumeLiters: number;

    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly capacityLiters: number,
        initialVolumeLiters: number,
    ) {
        if (!Number.isFinite(capacityLiters) || capacityLiters <= 0) {
            throw new Error('The capacity must be greater than zero.');
        }

        if (
            !Number.isFinite(initialVolumeLiters) ||
            initialVolumeLiters < 0 ||
            initialVolumeLiters > capacityLiters
        ) {
            throw new Error(
                'The initial volume must be between zero and the maximum capacity.',
            );
        }

        this.volumeLiters = initialVolumeLiters;
    }

    get currentVolumeLiters(): number {
        return this.volumeLiters;
    }

    get levelPercentage(): number {
        return (this.volumeLiters / this.capacityLiters) * 100;
    }

    get availableCapacityLiters(): number {
        return this.capacityLiters - this.volumeLiters;
    }

    get isFull(): boolean {
        return this.volumeLiters >= this.capacityLiters;
    }

    get isEmpty(): boolean {
        return this.volumeLiters <= 0;
    }

    fill(volumeLiters: number): void {
        this.validateVolume(volumeLiters);

        this.volumeLiters = Math.min(
            this.capacityLiters,
            this.volumeLiters + volumeLiters,
        );
    }

    drain(volumeLiters: number): void {
        this.validateVolume(volumeLiters);

        this.volumeLiters = Math.max(
            0,
            this.volumeLiters - volumeLiters,
        );
    }

    private validateVolume(volumeLiters: number): void {
        if (!Number.isFinite(volumeLiters) || volumeLiters < 0) {
            throw new Error('The volume must be a non-negative number.');
        }
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            capacityLiters: this.capacityLiters,
            currentVolumeLiters: this.currentVolumeLiters,
            levelPercentage: this.levelPercentage,
            availableCapacityLiters: this.availableCapacityLiters,
            isFull: this.isFull,
            isEmpty: this.isEmpty,
        };
    }
}