<script setup lang="ts">
import MoneyItem from './MoneyItem.vue';
import type { Money } from '../../types/money';

defineProps<{
  moneyOptions: Money[];
  selectedId: string | null;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  select: [money: Money];
}>();
</script>

<template>
  <section class="money-selector">
    <div class="section-heading">
      <div>
        <h2>Choose the money</h2>
        <p>Select a coin or banknote to insert.</p>
      </div>
    </div>

    <section class="money-group">
      <h3>Coins</h3>
      <div class="coins-grid">
        <MoneyItem
            v-for="money in moneyOptions.filter(item => item.type === 'coin')"
            :key="money.id"
            :money="money"
            :selected="selectedId === money.id"
            :disabled="disabled"
            @select="emit('select', $event)"
        />
      </div>
    </section>

    <section class="money-group">
      <h3>Banknotes</h3>

      <div class="bills-grid">
        <MoneyItem
            v-for="money in moneyOptions.filter(item => item.type === 'bill')"
            :key="money.id"
            :money="money"
            :selected="selectedId === money.id"
            :disabled="disabled"
            @select="emit('select', $event)"
        />
      </div>
    </section>
  </section>
</template>

<style scoped>
.money-selector {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.section-heading h2 {
  margin: 0 0 8px;
  font-size: 22px;
}

.section-heading p {
  margin: 0;
  color: #64748b;
  font-size: 14px;
}

.money-group h3 {
  margin: 0 0 16px;
  color: #475569;
  font-size: 15px;
}

.coins-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  align-items: stretch;
  gap: 12px;
}

.bills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(145px, 1fr));
  align-items: stretch;
  gap: 12px;
}
</style>