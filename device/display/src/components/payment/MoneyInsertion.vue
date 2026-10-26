<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue';

import type { Money } from '../../types/money';

const props = defineProps<{
  money: Money | null;
  active: boolean;
}>();

const emit = defineEmits<{
  complete: [];
}>();

const animationFinished = ref(false);

let timeoutId: ReturnType<typeof setTimeout> | undefined;

const formattedValue = computed(() => {
  if (!props.money) return '';

  return props.money.value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
});

watch(
    () => props.active,
    (active) => {
      clearTimeout(timeoutId);
      animationFinished.value = false;

      if (!active || !props.money) return;

      timeoutId = setTimeout(() => {
        animationFinished.value = true;
        emit('complete');
      }, 850);
    },
);

onBeforeUnmount(() => {
  clearTimeout(timeoutId);
});
</script>

<template>
  <Transition name="insertion">
    <div
        v-if="active && money"
        class="insertion-overlay"
        role="status"
        aria-live="polite"
    >
      <div class="insertion-card">
        <span class="insertion-label">INSERTING MONEY</span>
        <div class="machine-slot">
          <div class="slot-opening">
            <span class="slot-light"></span>
          </div>

          <div
              class="money-visual"
              :class="{
              coin: money.type === 'coin',
              bill: money.type === 'bill',
              finished: animationFinished,
            }"
          >
            <span v-if="money.type === 'coin'" class="coin-face">
              {{ money.label }}
            </span>

            <span v-else class="bill-face">
              {{ money.label }}
            </span>
          </div>
        </div>

        <strong>{{ formattedValue }}</strong>

        <p>Please wait while the money is being inserted.</p>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.insertion-overlay {
  position: fixed;
  z-index: 1000;
  inset: 0;
  display: grid;
  place-items: center;
  padding: 20px;
  background: rgb(15 23 42 / 65%);
  backdrop-filter: blur(5px);
}

.insertion-card {
  width: min(100%, 380px);
  padding: 28px;
  border-radius: 20px;
  background: white;
  color: #172033;
  text-align: center;
}

.insertion-label {
  color: #64748b;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.5px;
}

.machine-slot {
  position: relative;
  display: flex;
  height: 180px;
  align-items: center;
  justify-content: center;
  margin: 24px 0;
  overflow: hidden;
  border-radius: 14px;
  background: #e2e8f0;
}

.slot-opening {
  position: absolute;
  top: 28px;
  z-index: 2;
  width: 130px;
  height: 18px;
  border: 4px solid #475569;
  border-radius: 12px;
  background: #0f172a;
  box-shadow: 0 4px 8px rgb(0 0 0 / 20%);
}

.slot-light {
  display: block;
  width: 60%;
  height: 2px;
  margin: 4px auto;
  border-radius: 4px;
  background: #38bdf8;
  box-shadow: 0 0 8px #38bdf8;
}

.money-visual {
  position: absolute;
  top: 80px;
  display: grid;
  place-items: center;
  font-weight: 700;
  animation: insert-money 850ms cubic-bezier(0.4, 0, 0.8, 0.3) forwards;
}

.money-visual.coin {
  width: 64px;
  height: 64px;
  border: 5px double #b08d36;
  border-radius: 50%;
  background: linear-gradient(135deg, #fff0a3, #d4a72c, #fff0a3);
  color: #62470c;
}

.coin-face {
  font-size: 10px;
}

.money-visual.bill {
  width: 110px;
  height: 55px;
  border: 1px solid #4f9475;
  border-radius: 5px;
  background: #ccebd8;
  color: #176b50;
}

.bill-face {
  font-size: 14px;
}

.money-visual.finished {
  opacity: 0;
}

.insertion-card > strong {
  font-size: 22px;
}

.insertion-card p {
  margin: 12px 0 0;
  color: #64748b;
  font-size: 13px;
}

.insertion-enter-active,
.insertion-leave-active {
  transition: opacity 0.2s ease;
}

.insertion-enter-from,
.insertion-leave-to {
  opacity: 0;
}

@keyframes insert-money {
  0% {
    top: 95px;
    transform: translateY(30px) rotate(0deg) scale(1);
    opacity: 1;
  }

  65% {
    top: 50px;
    transform: translateY(0) rotate(180deg) scale(0.8);
    opacity: 1;
  }

  100% {
    top: 15px;
    transform: translateY(-10px) rotate(360deg) scale(0.3);
    opacity: 0;
  }
}
</style>