<script setup lang="ts">
import { computed } from 'vue';
import { Check } from '@lucide/vue';

const props = withDefaults(
    defineProps<{
      value: number | null;
      size?: number;
      thickness?: number;
      color?: string;
      trackColor?: string;
      valveClosed?: boolean;
    }>(),
    {
      size: 120,
      thickness: 8,
      color: '#16a34a',
      trackColor: '#e5e7eb',
      valveClosed: false,
    },
);

const normalizedValue = computed(() =>
    Math.min(100, Math.max(0, Number(props.value) || 0)),
);

const isFull = computed(() => normalizedValue.value >= 100);
const isComplete = computed(() => isFull.value && props.valveClosed);

const radius = computed(() => (100 - props.thickness) / 2);
const circumference = computed(() => 2 * Math.PI * radius.value);

const offset = computed(
    () =>
        circumference.value -
        (normalizedValue.value / 100) * circumference.value,
);

const sweepLength = computed(() => circumference.value * 0.16);
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    <div
        class="sonar-container relative inline-flex items-center justify-center"
        :style="{
        width: `${size}px`,
        height: `${size}px`,
        '--sonar-color': isComplete ? '#16a34a' : color,
      }"
        role="progressbar"
        :aria-valuenow="normalizedValue"
        aria-valuemin="0"
        aria-valuemax="100"
        :aria-label="`Water level: ${normalizedValue}%`"
    >
      <div
          v-if="!isComplete"
          class="sonar-pulse"
          aria-hidden="true"
      />

      <svg
          viewBox="0 0 100 100"
          class="relative z-10 -rotate-90 overflow-visible"
          width="100%"
          height="100%"
          aria-hidden="true"
      >
        <defs>
          <linearGradient id="sonar-gradient">
            <stop offset="0%" :stop-color="color" stop-opacity="0.15" />
            <stop offset="100%" :stop-color="color" stop-opacity="1" />
          </linearGradient>
        </defs>

        <circle
            cx="50"
            cy="50"
            :r="radius"
            fill="none"
            :stroke="trackColor"
            :stroke-width="thickness"
            opacity="0.3"
        />

        <circle
            cx="50"
            cy="50"
            :r="radius"
            fill="none"
            :stroke="isComplete ? '#16a34a' : color"
            :stroke-width="thickness"
            stroke-linecap="round"
            :stroke-dasharray="circumference"
            :stroke-dashoffset="offset"
            class="progress-ring"
        />

        <circle
            v-if="!isComplete"
            cx="50"
            cy="50"
            :r="radius"
            fill="none"
            stroke="url(#sonar-gradient)"
            :stroke-width="thickness"
            stroke-linecap="round"
            :stroke-dasharray="`${sweepLength} ${circumference}`"
            class="sonar-sweep"
        />
      </svg>

      <Transition name="check">
        <div
            v-if="isComplete"
            class="absolute z-20 flex items-center justify-center rounded-full bg-green-600 text-white"
            :style="{
            width: `${size * 0.52}px`,
            height: `${size * 0.52}px`,
          }"
            aria-label="Recipient full and valve closed"
        >
          <Check :size="size * 0.3" :stroke-width="3" />
        </div>

        <span
            v-else
            class="absolute z-20 text-xl font-semibold text-white"
        >
          {{ normalizedValue.toFixed(0) }}%
        </span>
      </Transition>
    </div>

    <Transition name="notice">
      <div
          v-if="isComplete"
          class="completion-notice rounded-xl border border-green-500/30 bg-green-500/10 p-4 text-center"
          role="status"
          aria-live="polite"
      >
        <h3 class="font-semibold text-green-400">
          Recipient full
        </h3>

        <p class="mt-1 text-sm text-white">
          The valve has been closed to prevent water waste.
        </p>

        <p class="mt-2 text-xs text-green-300">
          Water supply stopped successfully.
        </p>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.sonar-container {
  isolation: isolate;
}

.progress-ring {
  transition:
      stroke-dashoffset 1.2s cubic-bezier(0.22, 1, 0.36, 1),
      stroke 0.3s ease;
}

.sonar-sweep {
  transform-box: view-box;
  transform-origin: center;
  animation: sonar-rotate 3s linear infinite;
  filter: drop-shadow(0 0 3px var(--sonar-color));
  pointer-events: none;
}

.sonar-pulse {
  position: absolute;
  inset: 4px;
  border: 1px solid var(--sonar-color);
  border-radius: 50%;
  opacity: 0;
  pointer-events: none;
  animation: sonar-pulse 3s ease-out infinite;
}

.check-enter-active {
  animation: check-appear 0.45s cubic-bezier(0.18, 0.89, 0.32, 1.28);
}

.check-leave-active {
  transition: opacity 0.15s ease;
}

.check-leave-to {
  opacity: 0;
}

.notice-enter-active {
  animation: notice-appear 0.4s ease-out;
}

.notice-leave-active {
  transition: opacity 0.2s ease;
}

.notice-leave-to {
  opacity: 0;
}

@keyframes sonar-rotate {
  to {
    transform: rotate(360deg);
  }
}

@keyframes sonar-pulse {
  0% {
    transform: scale(0.92);
    opacity: 0.45;
  }

  70%,
  100% {
    transform: scale(1.35);
    opacity: 0;
  }
}

@keyframes check-appear {
  from {
    transform: scale(0.3);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes notice-appear {
  from {
    transform: translateY(8px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .sonar-sweep,
  .sonar-pulse,
  .check-enter-active,
  .notice-enter-active {
    animation: none;
  }

  .progress-ring {
    transition: none;
  }
}
</style>