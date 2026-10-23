<script setup lang="ts">
import type {Component} from 'vue';
import {IonInput} from '@ionic/vue';

const props = withDefaults(
    defineProps<{
      leftIcon?: Component;
      rightIcon?: Component;
      placeholder?: string;
      type?: string;
      modelValue?: string;
      onRightIconClick?: () => void;
    }>(),
    {
      type: 'text',
      placeholder: '',
      modelValue: '',
    },
);

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void;
}>();
function handleInput(event: CustomEvent) {
  const value = String(event.detail.value ?? '');
  emit('update:modelValue', value);
}
</script>

<template>
  <div class="flex items-center px-2 gap-2 rounded-lg border border-observatory-600">
    <component v-if="props.leftIcon" :is="props.leftIcon"/>
    <ion-input
        @ionInput="handleInput"
        :value="props.modelValue"
        :type="props.type" :placeholder="props.placeholder"
        class="w-full"
    />
    <component v-if="props.rightIcon" :is="props.rightIcon" @click="onRightIconClick"/>
  </div>
</template>

<style scoped>

</style>