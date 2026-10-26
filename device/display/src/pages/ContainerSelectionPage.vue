<script setup lang="ts">
import { computed, ref } from 'vue';
import ContainerSelector from '../components/containers/ContainerSelector.vue';
import ContainerViewer3D from '../components/containers/ContainerViewer3D.vue';
import type {Container} from '../types/container'

const containers: Container[] = [
  {
    id: 'jug-20l',
    name: 'Water jug',
    capacity: 20,
    model: '/models/jug-20l.glb',
  },

];

const selectedContainerId = ref('jug-20l');
const currentVolume = ref(12);
const sensorConnected = ref(true);

const selectedContainer = computed(
    () =>
        containers.find(
            (container) => container.id === selectedContainerId.value,
        ) ?? containers[0],
);

const fillPercentage = computed(() => {
  const capacity = selectedContainer.value.capacity;

  if (capacity <= 0) return 0;

  return Math.min(
      100,
      Math.max(0, (currentVolume.value / capacity) * 100),
  );
});

function selectContainer(containerId: string) {
  selectedContainerId.value = containerId;

  currentVolume.value = Math.min(
      currentVolume.value,
      selectedContainer.value.capacity,
  );
}
</script>

<template>
  <main class="dashboard">
    <header class="header">
      <div class="header-content">
        <p class="eyebrow">WATER CONTROL IOT</p>
        <h1>Reservoir simulator</h1>
        <p class="subtitle">
          Select a container and monitor the water level in 3D.
        </p>
      </div>

      <div
          class="connection-status"
          :class="{ disconnected: !sensorConnected }"
      >
        <span class="status-indicator"></span>
        {{ sensorConnected ? 'Sensor connected' : 'Sensor disconnected' }}
      </div>
    </header>

    <section class="metrics">
      <article class="metric-card">
        <span class="metric-label">Current volume</span>

        <strong class="metric-value">
          {{ currentVolume.toFixed(1) }}
          <small>L</small>
        </strong>
      </article>

      <article class="metric-card">
        <span class="metric-label">Maximum capacity</span>

        <strong class="metric-value">
          {{ selectedContainer.capacity }}
          <small>L</small>
        </strong>
      </article>

      <article class="metric-card">
        <span class="metric-label">Water level</span>

        <strong class="metric-value">
          {{ fillPercentage.toFixed(1) }}
          <small>%</small>
        </strong>

        <div
            class="progress-track"
            role="progressbar"
            :aria-valuenow="fillPercentage"
            aria-valuemin="0"
            aria-valuemax="100"
            :aria-label="`Water level: ${fillPercentage.toFixed(1)}%`"
        >
          <div
              class="progress-value"
              :style="{ width: `${fillPercentage}%` }"
          ></div>
        </div>
      </article>
    </section>

    <section class="workspace">
      <aside class="sidebar">
        <div class="section-heading">
          <h2>Container type</h2>
          <p>Select the model you wish to view.</p>
        </div>

        <ContainerSelector
            :containers="containers"
            :selected-id="selectedContainerId"
            @select="selectContainer"
        />

        <div class="selected-info">
          <span class="info-label">Selected model</span>
          <strong>{{ selectedContainer.name }}</strong>

          <span class="info-label">Maximum capacity</span>
          <strong>{{ selectedContainer.capacity }} liters</strong>
        </div>
      </aside>

      <section class="viewer-panel">
        <div class="viewer-header">
          <div>
            <h2>3D Visualization</h2>
            <p>
              {{ selectedContainer.name }} ·
              {{ selectedContainer.capacity }} L
            </p>
          </div>

          <span class="model-badge">3D</span>
        </div>

        <ContainerViewer3D
            :key="selectedContainer.id"
            :model-url="selectedContainer.model"
            :fill-percentage="fillPercentage"
        />

        <p class="viewer-hint">
          Drag to rotate the model and use the mouse wheel to zoom in.
        </p>
      </section>
    </section>
  </main>
</template>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family:
      Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
      "Segoe UI", sans-serif;
  color: #172b4d;
  background: #f4f7fb;
}

button {
  font: inherit;
}

.dashboard {
  min-height: 100vh;
  padding: 36px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  margin-bottom: 32px;
}

.eyebrow {
  margin: 0 0 8px;
  color: #087eaa;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 2px;
}

.header h1 {
  margin: 0;
  font-size: 30px;
  font-weight: 750;
}

.subtitle {
  margin: 10px 0 0;
  color: #718096;
  line-height: 1.5;
}

.connection-status {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 10px 14px;
  border: 1px solid #b7ebd0;
  border-radius: 24px;
  background: #edfff5;
  color: #16794b;
  font-size: 13px;
  white-space: nowrap;
}

.connection-status.disconnected {
  border-color: #fecaca;
  background: #fef2f2;
  color: #b91c1c;
}

.status-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: currentColor;
}

.metrics {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
  margin-bottom: 28px;
}

.metric-card {
  min-width: 0;
  padding: 24px;
  border: 1px solid #e6edf5;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 4px 18px rgb(28 48 74 / 4%);
}

.metric-label {
  display: block;
  margin-bottom: 12px;
  color: #718096;
  font-size: 13px;
}

.metric-value {
  font-size: 32px;
  font-weight: 750;
}

.metric-value small {
  color: #718096;
  font-size: 15px;
  font-weight: 500;
}

.progress-track {
  height: 6px;
  margin-top: 18px;
  overflow: hidden;
  border-radius: 6px;
  background: #e8eff7;
}

.progress-value {
  height: 100%;
  border-radius: inherit;
  background: #0785b7;
  transition: width 250ms ease;
}

.workspace {
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr);
  gap: 24px;
  align-items: start;
}

.sidebar,
.viewer-panel {
  min-width: 0;
  padding: 24px;
  border: 1px solid #e6edf5;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 4px 18px rgb(28 48 74 / 4%);
}

.section-heading h2,
.viewer-header h2 {
  margin: 0;
  font-size: 18px;
}

.section-heading p,
.viewer-header p {
  margin: 8px 0 20px;
  color: #718096;
  font-size: 13px;
  line-height: 1.5;
}

.selected-info {
  display: grid;
  gap: 8px;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid #e6edf5;
}

.selected-info strong {
  margin-bottom: 10px;
  font-size: 14px;
}

.info-label {
  color: #718096;
  font-size: 12px;
}

.viewer-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.viewer-header p {
  margin-bottom: 0;
}

.model-badge {
  padding: 6px 10px;
  border-radius: 8px;
  background: #e8f5fc;
  color: #087eaa;
  font-size: 12px;
  font-weight: 800;
}

.viewer-hint {
  margin: 12px 0 0;
  color: #718096;
  font-size: 12px;
  line-height: 1.5;
  text-align: center;
}

@media (max-width: 850px) {
  .dashboard {
    padding: 20px;
  }

  .header {
    align-items: flex-start;
    flex-direction: column;
  }

  .metrics {
    grid-template-columns: 1fr;
  }

  .workspace {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .dashboard {
    padding: 14px;
  }

  .header h1 {
    font-size: 24px;
  }

  .metric-card,
  .sidebar,
  .viewer-panel {
    padding: 18px;
  }
}
</style>