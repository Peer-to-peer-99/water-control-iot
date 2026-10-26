<script setup lang="ts">
defineProps<{
  amountDue: number;
  amountInserted: number;
  remainingAmount: number;
  changeAmount: number;
  insertedCount: number;
  canContinue: boolean;
}>();

const emit = defineEmits<{
  reset: [];
  continue: [];
}>();

function formatCurrency(value: number) {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}
</script>

<template>
  <aside class="payment-summary">
    <span class="eyebrow">PAYMENT SUMMARY</span>
    <div class="summary-row">
      <span>Amount to pay</span>
      <strong>{{ formatCurrency(amountDue) }}</strong>
    </div>

    <div class="summary-row">
      <span>Money inserted</span>
      <strong class="inserted">
        {{ formatCurrency(amountInserted) }}
      </strong>
    </div>

    <div class="summary-row">
      <span>Number of items</span>
      <strong>{{ insertedCount }}</strong>
    </div>

    <div v-if="remainingAmount > 0" class="summary-row">
      <span>Needs to be inserted</span>
      <strong class="remaining">
        {{ formatCurrency(remainingAmount) }}
      </strong>
    </div>

    <div v-else class="summary-row">
      <span>Estimated change</span>
      <strong class="change">
        {{ formatCurrency(changeAmount) }}
      </strong>
    </div>

    <div
        class="payment-status"
        :class="{ paid: canContinue }"
    >
      <span class="status-indicator"></span>

      {{
        canContinue
            ? 'Sufficient amount'
            : 'Awaiting payment'
      }}
    </div>

    <button
        type="button"
        class="reset-button"
        :disabled="insertedCount === 0"
        @click="emit('reset')"
    >
      Restart payment
    </button>


    <button
        type="button"
        class="continue-button"
        :disabled="!canContinue"
        @click="emit('continue')"
    >
      Proceed to restock
    </button>

    <p class="summary-hint">
      The entered amount is updated with each coin or banknote.
    </p>
  </aside>
</template>

<style scoped>
.payment-summary {
  position: sticky;
  top: 24px;
  padding: 24px;
  border: 1px solid #e2e8f0;
  border-radius: 18px;
  background: white;
  color: #172033;
}

.eyebrow {
  display: block;
  margin-bottom: 16px;
  color: #64748b;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.5px;
}

.summary-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 16px 0;
  border-bottom: 1px solid #e2e8f0;
  font-size: 13px;
}

.summary-row strong {
  text-align: right;
}

.inserted {
  color: #0284c7;
  font-size: 19px;
}

.remaining {
  color: #dc2626;
}

.change {
  color: #15803d;
}

.payment-status {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
  padding: 12px;
  border-radius: 10px;
  background: #fff7ed;
  color: #9a3412;
  font-size: 12px;
  font-weight: 600;
}

.payment-status.paid {
  background: #dcfce7;
  color: #166534;
}

.status-indicator {
  width: 8px;
  height: 8px;
  flex-shrink: 0;
  border-radius: 50%;
  background: currentColor;
}

.reset-button,
.continue-button {
  width: 100%;
  margin-top: 14px;
  padding: 13px;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
}

.reset-button {
  border: 1px solid #cbd5e1;
  background: white;
  color: #334155;
}

.continue-button {
  border: none;
  background: #0284c7;
  color: white;
}

.reset-button:disabled,
.continue-button:disabled {
  cursor: not-allowed;
  opacity: 0.45;
}

.summary-hint {
  margin: 14px 0 0;
  color: #64748b;
  font-size: 11px;
  line-height: 1.5;
}

@media (max-width: 900px) {
  .payment-summary {
    position: static;
  }
}
</style>