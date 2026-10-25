<script setup lang="ts">
import type {Container} from '../types/container';

defineProps<{
  containers: Container[];
  selectedId: string;
}>();

const emit = defineEmits<{
  (event: 'select', containerId: string): void;
}>();
</script>

<template>
  <div class="container-list">
    <button
        v-for="container in containers"
        :key="container.id"
        type="button"
        class="container-option"
        :class="{ selected: selectedId === container.id }"
        :aria-pressed="selectedId === container.id"
        @click="emit('select', container.id)"
    >
      <div class="container-icon">
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.6"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
        >
          <path d="M8 3h8" />
          <path d="M9 3v3l-2 2v11a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V8l-2-2V3" />
          <path d="M7 13h10" />
        </svg>
      </div>

      <div class="container-info">
        <strong>{{ container.name }}</strong>
        <span>{{ container.capacity }} litros</span>
      </div>

      <span
          v-if="selectedId === container.id"
          class="selected-indicator"
          aria-label="Selecionado"
      >
        ✓
      </span>
    </button>
  </div>
</template>

<style scoped>
.container-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.container-option {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 14px;
  border: 1px solid #e6edf5;
  border-radius: 12px;
  background: #fff;
  color: #172b4d;
  text-align: left;
  cursor: pointer;
  transition:
      border-color 180ms ease,
      background 180ms ease,
      box-shadow 180ms ease;
}

.container-option:hover {
  border-color: #8ccce4;
  background: #f8fcff;
}

.container-option.selected {
  border-color: #0785b7;
  background: #eef9fd;
  box-shadow: 0 0 0 1px #0785b7;
}

.container-icon {
  display: grid;
  flex-shrink: 0;
  width: 42px;
  height: 42px;
  place-items: center;
  border-radius: 10px;
  background: #e8f5fc;
  color: #087eaa;
}

.container-icon svg {
  width: 25px;
  height: 25px;
}

.container-info {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 5px;
  min-width: 0;
}

.container-info strong {
  font-size: 13px;
  font-weight: 700;
}

.container-info span {
  color: #718096;
  font-size: 12px;
}

.selected-indicator {
  display: grid;
  flex-shrink: 0;
  width: 22px;
  height: 22px;
  place-items: center;
  border-radius: 50%;
  background: #0785b7;
  color: white;
  font-size: 13px;
  font-weight: 700;
}
</style>