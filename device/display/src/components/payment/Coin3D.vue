<script setup lang="ts">
import {
  onMounted,
  onBeforeUnmount,
  ref,
  watch,
} from 'vue';

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const props = withDefaults(
    defineProps<{
      modelUrl: string;
      selected?: boolean;
      size?: number;
    }>(),
    {
      selected: false,
      size: 76,
    },
);

const emit = defineEmits<{
  select: [];
}>();

const container = ref<HTMLDivElement | null>(null);

let scene: THREE.Scene | null = null;
let camera: THREE.PerspectiveCamera | null = null;
let renderer: THREE.WebGLRenderer | null = null;
let coin: THREE.Group | null = null;
let animationFrame = 0;
let resizeObserver: ResizeObserver | undefined;
let disposed = false;
let loadVersion = 0;

const loader = new GLTFLoader();

function resize() {
  if (!container.value || !camera || !renderer) return;

  const width = container.value.clientWidth;
  const height = container.value.clientHeight;

  if (width <= 0 || height <= 0) return;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height, false);
}

function removeCoin() {
  if (!coin || !scene) return;

  scene.remove(coin);

  coin.traverse((object) => {
    if (!(object instanceof THREE.Mesh)) return;

    object.geometry.dispose();

    const materials = Array.isArray(object.material)
        ? object.material
        : [object.material];

    materials.forEach((material) => material.dispose());
  });

  coin = null;
}
function loadCoin() {
  const version = ++loadVersion;

  loader.load(
      props.modelUrl,
      (gltf) => {
        if (disposed || version !== loadVersion || !scene) {
          gltf.scene.traverse((object) => {
            if (!(object instanceof THREE.Mesh)) return;

            object.geometry.dispose();

            const materials = Array.isArray(object.material)
                ? object.material
                : [object.material];

            materials.forEach((material) => material.dispose());
          });

          return;
        }

        removeCoin();

        coin = new THREE.Group();

        const pivot = new THREE.Group();
        const model = gltf.scene;

        pivot.add(model);

        pivot.updateMatrixWorld(true);

        const bounds = new THREE.Box3().setFromObject(model);
        const center = bounds.getCenter(new THREE.Vector3());
        const dimensions = bounds.getSize(new THREE.Vector3());

        const maxDimension = Math.max(
            dimensions.x,
            dimensions.y,
            dimensions.z,
        );

        model.position.x -= center.x;
        model.position.y -= center.y;
        model.position.z -= center.z;

        if (maxDimension > 0) {
          pivot.scale.setScalar(1.5 / maxDimension);
        }

        coin.add(pivot);
        coin.position.set(0, 0, 0);

        scene.add(coin);
      },
      undefined,
      (error) => {
        if (version === loadVersion && !disposed) {
          console.error(
              `Could not load the model ${props.modelUrl}:`,
              error,
          );
        }
      },
  );
}
function animate() {
  if (disposed || !renderer || !scene || !camera) return;

  animationFrame = requestAnimationFrame(animate);

  if (coin) {
    coin.rotation.y += 0.035;
  }

  renderer.render(scene, camera);
}

function initializeScene() {
  if (!container.value) return;

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
      35,
      1,
      0.1,
      100,
  );

  camera.position.set(0, 0, 4);

  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  });

  renderer.setPixelRatio(
      Math.min(window.devicePixelRatio || 1, 2),
  );

  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;

  container.value.appendChild(renderer.domElement);

  scene.add(new THREE.AmbientLight(0xffffff, 1.8));

  const keyLight = new THREE.DirectionalLight(0xffffff, 3);
  keyLight.position.set(3, 4, 5);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0xffd76a, 2);
  fillLight.position.set(-3, 1, -3);
  scene.add(fillLight);

  resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(container.value);

  resize();
  loadCoin();
  animate();
}

watch(
    () => props.modelUrl,
    () => {
      if (scene) loadCoin();
    },
);

onMounted(initializeScene);

onBeforeUnmount(() => {
  disposed = true;
  loadVersion++;

  cancelAnimationFrame(animationFrame);
  resizeObserver?.disconnect();

  removeCoin();

  renderer?.dispose();
  renderer?.domElement.remove();

  renderer = null;
  camera = null;
  scene = null;
});
</script>

<template>
  <button
      class="coin-button"
      :class="{ selected }"
      type="button"
      :aria-label="`Select currency: ${modelUrl}`"
      :aria-pressed="selected"
      @click="emit('select')"
  >
    <span
        ref="container"
        class="coin-viewer"
        :style="{
        width: `${size}px`,
        height: `${size}px`,
      }"
    />
  </button>
</template>

<style scoped>
.coin-button {
  display: grid;
  place-items: center;
  padding: 4px;
  border: 2px solid transparent;
  border-radius: 16px;
  background: transparent;
  cursor: pointer;
  transition:
      border-color 0.2s ease,
      background 0.2s ease,
      transform 0.2s ease;
}

.coin-button:hover {
  transform: translateY(-3px);
}

.coin-button.selected {
  border-color: #0284c7;
  background: #e0f2fe;
}

.coin-button:focus-visible {
  outline: 2px solid #0284c7;
  outline-offset: 3px;
}

.coin-viewer {
  display: block;
  overflow: hidden;
}

.coin-viewer :deep(canvas) {
  display: block;
  width: 100%;
  height: 100%;
}
</style>