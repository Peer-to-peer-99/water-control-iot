import { defineStore } from 'pinia';
import type { ReadingState } from '../types/reading';
import { fetchLatestReading } from '../api/reading.api';

function toNumberOrNull(value: unknown): number | null {
  if (value === null || value === undefined || value === '') {
    return null;
  }

  const number = Number(value);

  return Number.isFinite(number) ? number : null;
}

function formatNumber(
  value: number | null,
  maximumFractionDigits = 1,
): string {
  return value === null
    ? '--'
    : value.toLocaleString('en-US', { maximumFractionDigits });
}

export const useReadingStore = defineStore('reading', {
  state: (): ReadingState => ({
    reading: null,
    loading: false,
    error: null,
  }),

  getters: {
    distanceCm: (state): number | null =>
      toNumberOrNull(state.reading?.distance_cm),

    volumeLiters: (state): number | null =>
      toNumberOrNull(state.reading?.volume_liters),

    capacityLiters: (state): number | null =>
      toNumberOrNull(state.reading?.capacity_liters),

    levelPercentage: (state): number | null => {
      const level = toNumberOrNull(state.reading?.level_percentage);

      return level !== null && level >= 0 && level <= 100
        ? level
        : null;
    },

    availableCapacityLiters(): number | null {
      if (
        this.volumeLiters === null ||
        this.capacityLiters === null
      ) {
        return null;
      }

      return Math.max(0, this.capacityLiters - this.volumeLiters);
    },

    formattedVolume(): string {
      return formatNumber(this.volumeLiters);
    },

    formattedCapacity(): string {
      return formatNumber(this.capacityLiters, 0);
    },

    formattedAvailableCapacity(): string {
      return formatNumber(this.availableCapacityLiters);
    },

    formattedLevel(): string {
      return this.levelPercentage === null
        ? '--'
        : `${this.levelPercentage.toFixed(1)}%`;
    },

    formattedDistance(): string {
      return this.distanceCm === null
        ? '--'
        : `${this.distanceCm.toFixed(1)} cm`;
    },

    formattedMeasuredAt(): string {
      const measuredAt = this.reading?.measured_at;

      if (!measuredAt) {
        return 'Awaiting reading';
      }

      const date = new Date(measuredAt);

      if (Number.isNaN(date.getTime())) {
        return 'Date unavailable';
      }

      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
    },
  },

  actions: {
    async getLatestReading(fountainId: number): Promise<void> {
      this.loading = true;
      this.error = null;

      try {
        this.reading = await fetchLatestReading(fountainId);
      } catch {
        this.error = 'Unable to load the reservoir reading.';
      } finally {
        this.loading = false;
      }
    },
  },
});
