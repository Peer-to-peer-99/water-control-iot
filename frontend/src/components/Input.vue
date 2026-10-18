<script setup lang="ts">
import type {Component} from 'vue';

const props = defineProps<{
  leftIcon?: Component,
  rightIcon?: Component,
  placeholder?: string,
  type?: string,
  onRightIconClick?: () => void,
}>();
</script>

<template>
<div class="flex gap-2 rounded-lg p-2 border border-malibu-600">
  <component v-if="props.leftIcon" :is="props.leftIcon" />
  <input :type="props.type" :placeholder="props.placeholder" class="border border-transparent focus:border-transparent focus:outline-none"/>
  <component  v-if="props.rightIcon" :is="props.rightIcon" @click="onRightIconClick" />
</div>
</template>

<style scoped>

</style>