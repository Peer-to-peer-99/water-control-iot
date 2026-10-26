<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

import MoneySelector from '../components/payment/MoneySelector.vue';
import MoneyInsertion from '../components/payment/MoneyInsertion.vue';
import PaymentSummary from '../components/payment/PaymentSummary.vue';

import { moneyOptions } from '../data/money';
import type { Money } from '../types/money';

const router = useRouter();
const amountDue = ref(5);

const selectedMoney = ref<Money | null>(null);
const insertedMoney = ref<Money[]>([]);
const isInserting = ref(false);

const amountInserted = computed(() => {
  const total = insertedMoney.value.reduce(
      (sum, money) => sum + Math.round(money.value * 100),
      0,
  );

  return total / 100;
});

const remainingAmount = computed(() =>
    Math.max(
        0,
        Math.round((amountDue.value - amountInserted.value) * 100) / 100,
    ),
);

const changeAmount = computed(() =>
    Math.max(
        0,
        Math.round((amountInserted.value - amountDue.value) * 100) / 100,
    ),
);

const canContinue = computed(() =>
    amountInserted.value >= amountDue.value,
);

function selectMoney(money: Money) {
  if (isInserting.value) return;

  selectedMoney.value = money;
}

function startInsertion() {
  if (!selectedMoney.value || isInserting.value) return;

  isInserting.value = true;
}

function finishInsertion() {
  if (!selectedMoney.value || !isInserting.value) return;

  insertedMoney.value.push(selectedMoney.value);

  selectedMoney.value = null;
  isInserting.value = false;
}

function resetPayment() {
  if (isInserting.value) return;

  insertedMoney.value = [];
  selectedMoney.value = null;
}

function goBack() {
  if (isInserting.value) return;

  router.push('/');
}

function continueToRefilling() {
  if (!canContinue.value || isInserting.value) return;

  router.push('/refilling');
}
</script>

<template>
  <main class="payment-page">
    <header class="page-header">
      <button
          class="back-button"
          type="button"
          :disabled="isInserting"
          @click="goBack"
      >
        <ChevlotLeft/>
        Back
      </button>

      <div>
        <span class="eyebrow">WATER CONTROL IOT</span>
        <h1>Payment</h1>

        <p>
          Choose the coins and banknotes you wish to insert into the machine.
        </p>
      </div>
    </header>

    <div class="payment-layout">
      <section class="money-panel">
        <MoneySelector
            :money-options="moneyOptions"
            :selected-id="selectedMoney?.id ?? null"
            :disabled="isInserting"
            @select="selectMoney"
        />

        <div class="insertion-controls">
          <div class="selected-description">
            <span>Selected money</span>

            <strong v-if="selectedMoney">
              {{ selectedMoney.label }}
              —
              {{
                selectedMoney.value.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })
              }}
            </strong>

            <strong v-else class="no-selection">
              No item selected
            </strong>
          </div>

          <button
              class="insert-button"
              type="button"
              :disabled="!selectedMoney || isInserting"
              @click="startInsertion"
          >
            Insert money
          </button>
        </div>

        <section class="inserted-list">
          <h2>Money inserted</h2>
          <p v-if="insertedMoney.length === 0" class="empty-state">
            No coins or banknotes inserted.
          </p>

          <ul v-else>
            <li
                v-for="(money, index) in insertedMoney"
                :key="`${money.id}-${index}`"
            >
              <span>{{ money.label }}</span>

              <strong>
                {{
                  money.value.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })
                }}
              </strong>
            </li>
          </ul>
        </section>
      </section>

      <PaymentSummary
          :amount-due="amountDue"
          :amount-inserted="amountInserted"
          :remaining-amount="remainingAmount"
          :change-amount="changeAmount"
          :inserted-count="insertedMoney.length"
          :can-continue="canContinue"
          @reset="resetPayment"
          @continue="continueToRefilling"
      />
    </div>

    <MoneyInsertion
        :money="selectedMoney"
        :active="isInserting"
        @complete="finishInsertion"
    />
  </main>
</template>

<style scoped>
.payment-page {
  min-height: 100vh;
  padding: 32px;
  background: #f4f7fb;
  color: #172033;
}

.page-header {
  display: flex;
  align-items: flex-start;
  gap: 24px;
  margin-bottom: 32px;
}

.page-header h1 {
  margin: 0 0 8px;
  font-size: 30px;
}

.page-header p {
  margin: 0;
  color: #64748b;
}

.eyebrow {
  display: block;
  margin-bottom: 8px;
  color: #64748b;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.5px;
}

.back-button {
  padding: 10px 16px;
  border: 1px solid #dbe3ee;
  border-radius: 10px;
  background: white;
  color: #334155;
  cursor: pointer;
}

.back-button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.payment-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 340px;
  gap: 24px;
  align-items: start;
}

.money-panel {
  min-width: 0;
  padding: 24px;
  border: 1px solid #e2e8f0;
  border-radius: 18px;
  background: white;
}

.insertion-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: 28px;
  padding-top: 24px;
  border-top: 1px solid #e2e8f0;
}

.selected-description {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.selected-description > span {
  color: #64748b;
  font-size: 12px;
}

.selected-description strong {
  font-size: 14px;
}

.no-selection {
  color: #94a3b8;
}

.insert-button {
  flex-shrink: 0;
  padding: 13px 18px;
  border: none;
  border-radius: 10px;
  background: #0284c7;
  color: white;
  font-weight: 600;
  cursor: pointer;
}

.insert-button:disabled {
  background: #cbd5e1;
  cursor: not-allowed;
}

.inserted-list {
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #e2e8f0;
}

.inserted-list h2 {
  margin: 0 0 16px;
  font-size: 17px;
}

.empty-state {
  color: #64748b;
  font-size: 13px;
}

.inserted-list ul {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.inserted-list li {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  background: #f8fafc;
  font-size: 13px;
}

@media (max-width: 1000px) {
  .payment-layout {
    grid-template-columns: minmax(0, 1fr);
  }
}

@media (max-width: 600px) {
  .payment-page {
    padding: 18px;
  }

  .page-header {
    flex-direction: column;
    gap: 16px;
  }

  .money-panel {
    padding: 16px;
  }

  .insertion-controls {
    align-items: stretch;
    flex-direction: column;
  }

  .insert-button {
    width: 100%;
  }
}
</style>