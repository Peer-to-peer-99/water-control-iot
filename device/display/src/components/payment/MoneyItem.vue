<script setup lang="ts">
import { computed } from 'vue';

import Coin3D from './Coin3D.vue';
import type { Money } from '../../types/money';

const props = defineProps<{
  money: Money;
  selected?: boolean;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  select: [money: Money];
}>();

const visualWidth = computed(() =>
    Math.min(180, Math.max(60, props.money.width * 1.2)),
);

const visualHeight = computed(() =>
    Math.min(100, Math.max(36, props.money.height * 1.2)),
);

const formattedValue = computed(() =>
    props.money.value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }),
);

function selectMoney() {
  if (props.disabled) return;

  emit('select', props.money);
}
</script>

<template>
  <button
      class="money-item"
      :class="{
      selected,
      'is-coin': money.type === 'coin',
      'is-bill': money.type === 'bill',
    }"
      type="button"
      :disabled="disabled"
      :aria-pressed="selected"
      @click="selectMoney"
  >
    <Coin3D
        v-if="money.type === 'coin' && money.modelUrl"
        :model-url="money.modelUrl"
        :selected="selected"
        :size="Math.min(88, Math.max(56, (money.diameter ?? money.width) * 3))"
        @select="selectMoney"
    />

    <div
        v-else-if="money.type === 'coin'"
        class="coin-fallback"
        :style="{
        width: `${Math.min(88, Math.max(56, money.width * 3))}px`,
        height: `${Math.min(88, Math.max(56, money.height * 3))}px`,
      }"
    >
      {{ money.label }}
    </div>

    <div
        v-else
        class="bill"
        :style="{
        width: `${visualWidth}px`,
        height: `${visualHeight}px`,
      }"
    >
      <img
          v-if="money.imageUrl"
          :src="money.imageUrl"
          :alt="`Nota de ${formattedValue}`"
          class="bill-image"
      />

      <span v-else class="bill-placeholder">
        {{ money.label }}
      </span>
    </div>

    <strong>{{ formattedValue }}</strong>
    <span class="money-label">{{ money.label }}</span>
  </button>
</template>

<style scoped>
.money-item {
  display: flex;
  min-width: 0;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  padding: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  background: white;
  color: #172033;
  cursor: pointer;
  transition:
      border-color 0.2s,
      background 0.2s,
      transform 0.2s;
}

.money-item:hover:not(:disabled) {
  transform: translateY(-3px);
  border-color: #38bdf8;
}

.money-item.selected {
  border-color: #0284c7;
  background: #f0f9ff;
}

.money-item:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.money-item strong {
  font-size: 14px;
}

.money-label {
  color: #64748b;
  font-size: 12px;
  text-align: center;
}

.bill {
  display: grid;
  flex-shrink: 0;
  overflow: hidden;
  place-items: center;
  border: 1px solid #86bca8;
  border-radius: 5px;
  background: #e5f5ed;
}

.bill-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.bill-placeholder {
  color: #176b50;
  font-size: 16px;
  font-weight: 700;
}

.coin-fallback {
  display: grid;
  flex-shrink: 0;
  place-items: center;
  border: 4px double #94a3b8;
  border-radius: 50%;
  background: #e2e8f0;
  color: #334155;
  font-size: 11px;
  font-weight: 700;
}
</style>