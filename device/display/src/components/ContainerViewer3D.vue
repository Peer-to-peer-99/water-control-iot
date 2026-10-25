<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch } from "vue";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const props = defineProps<{
  modelUrl: string;
  fillPercentage: number;
}>();

const containerElement = ref<HTMLDivElement | null>(null);
const loading = ref(true);
const errorMessage = ref("");

let scene: THREE.Scene | undefined;
let camera: THREE.PerspectiveCamera | undefined;
let renderer: THREE.WebGLRenderer | undefined;
let controls: OrbitControls | undefined;
let resizeObserver: ResizeObserver | undefined;
let animationFrameId = 0;

let model: THREE.Object3D | undefined;
let water: THREE.Mesh | undefined;
let waterGeometry: THREE.CylinderGeometry | undefined;
let waterMaterial: THREE.MeshPhysicalMaterial | undefined;

let modelMinY = 0;
let modelMaxY = 1;
let modelWidth = 1;
let modelDepth = 1;
let disposed = false;

const loader = new GLTFLoader();

function createScene() {
  if (!containerElement.value) return;

  const width = containerElement.value.clientWidth || 600;
  const height = containerElement.value.clientHeight || 500;

  scene = new THREE.Scene();
  scene.background = new THREE.Color("#f4f8fc");

  camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
  camera.position.set(3, 2.5, 4);

  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: false,
  });

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(width, height);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;

  containerElement.value.appendChild(renderer.domElement);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.06;
  controls.minDistance = 1.5;
  controls.maxDistance = 12;
  controls.target.set(0, 0, 0);

  scene.add(new THREE.HemisphereLight(0xffffff, 0xb6c8d8, 2));

  const mainLight = new THREE.DirectionalLight(0xffffff, 3);
  mainLight.position.set(4, 6, 5);
  scene.add(mainLight);

  const fillLight = new THREE.DirectionalLight(0xc4e8ff, 1.5);
  fillLight.position.set(-4, 2, -3);
  scene.add(fillLight);

  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(200, 200),
    new THREE.MeshStandardMaterial({
      color: "#f4f8fc",
      roughness: 1,
    }),
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -1;
  scene.add(ground);

  resizeObserver = new ResizeObserver(resizeRenderer);
  resizeObserver.observe(containerElement.value);

  animate();
}

function resizeRenderer() {
  if (!containerElement.value || !camera || !renderer) return;

  const width = containerElement.value.clientWidth;
  const height = containerElement.value.clientHeight;

  if (width <= 0 || height <= 0) return;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
}

function animate() {
  if (disposed || !renderer || !scene || !camera || !controls) return;

  animationFrameId = requestAnimationFrame(animate);

  controls.update();
  renderer.render(scene, camera);
}

function disposeObject(object: THREE.Object3D) {
  object.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return;

    child.geometry.dispose();

    const materials = Array.isArray(child.material)
      ? child.material
      : [child.material];

    materials.forEach((material) => material.dispose());
  });
}

function clearModel() {
  if (model && scene) {
    scene.remove(model);
    disposeObject(model);
    model = undefined;
  }

  if (water && scene) {
    scene.remove(water);
    water = undefined;
  }

  waterGeometry?.dispose();
  waterGeometry = undefined;

  waterMaterial?.dispose();
  waterMaterial = undefined;
}

function updateWater() {
  if (!water || !waterGeometry) return;

  const percentage = THREE.MathUtils.clamp(props.fillPercentage / 100, 0, 1);

  const modelHeight = modelMaxY - modelMinY;

  if (percentage <= 0 || modelHeight <= 0) {
    water.visible = false;
    return;
  }

  water.visible = true;
  const waterHeight = modelHeight * percentage;

  water.scale.y = waterHeight;
  water.position.y = modelMinY + waterHeight / 2;

  water.position.x = 0;
  water.position.z = 0;

  waterGeometry.parameters.height = waterHeight;
}

function fitCameraToModel(object: THREE.Object3D) {
  if (!camera || !controls) return;

  const box = new THREE.Box3().setFromObject(object);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());

  const maxDimension = Math.max(size.x, size.y, size.z);

  if (maxDimension <= 0) return;

  const scale = 2 / maxDimension;
  object.scale.multiplyScalar(scale);
  object.position.multiplyScalar(scale);

  const normalizedBox = new THREE.Box3().setFromObject(object);
  const normalizedSize = normalizedBox.getSize(new THREE.Vector3());
  const normalizedCenter = normalizedBox.getCenter(new THREE.Vector3());

  modelMinY = normalizedBox.min.y;
  modelMaxY = normalizedBox.max.y;
  modelWidth = normalizedSize.x;
  modelDepth = normalizedSize.z;

  controls.target.copy(normalizedCenter);

  const maxSize = Math.max(
    normalizedSize.x,
    normalizedSize.y,
    normalizedSize.z,
  );

  const distance =
    (maxSize / (2 * Math.tan((camera.fov * Math.PI) / 360))) * 1.6;

  camera.position.set(
    normalizedCenter.x + distance * 0.8,
    normalizedCenter.y + distance * 0.45,
    normalizedCenter.z + distance,
  );

  camera.near = Math.max(distance / 100, 0.01);
  camera.far = distance * 100;
  camera.updateProjectionMatrix();

  controls.minDistance = distance * 0.35;
  controls.maxDistance = distance * 4;
  controls.update();
}

function createWater() {
  if (!scene) return;

  waterGeometry?.dispose();
  waterMaterial?.dispose();

  const radius = Math.max(Math.min(modelWidth, modelDepth) * 0.35, 0.01);

  waterGeometry = new THREE.CylinderGeometry(radius, radius, 1, 48, 1, false);

  waterMaterial = new THREE.MeshPhysicalMaterial({
    color: "#159fe8",
    transparent: true,
    opacity: 0.7,
    roughness: 0.12,
    metalness: 0,
    transmission: 0.1,
    thickness: 0.2,
    depthWrite: false,
  });

  water = new THREE.Mesh(waterGeometry, waterMaterial);
  water.renderOrder = 1;

  scene.add(water);

  updateWater();
}

async function loadModel() {
  clearModel();

  loading.value = true;
  errorMessage.value = "";

  try {
    const gltf = await loader.loadAsync(props.modelUrl);

    if (disposed) {
      disposeObject(gltf.scene);
      return;
    }

    model = gltf.scene;

    model.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;

      child.castShadow = true;
      child.receiveShadow = true;
    });

    scene?.add(model);

    fitCameraToModel(model);
    createWater();

    loading.value = false;
  } catch (error) {
    if (disposed) return;

    console.error("Error loading the 3D model:", error);

    errorMessage.value =
      `Could not load the model "${props.modelUrl}". ` +
      "Check if the GLB file exists in public/models.";

    loading.value = false;
  }
}

onMounted(async () => {
  createScene();
  await loadModel();
});

watch(
  () => props.modelUrl,
  async () => {
    if (!disposed && scene) {
      await loadModel();
    }
  },
);

watch(
  () => props.fillPercentage,
  () => {
    updateWater();
  },
);

onBeforeUnmount(() => {
  disposed = true;

  cancelAnimationFrame(animationFrameId);
  resizeObserver?.disconnect();

  controls?.dispose();

  clearModel();

  if (scene) {
    scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.geometry.dispose();

        const materials = Array.isArray(object.material)
          ? object.material
          : [object.material];

        materials.forEach((material) => material.dispose());
      }
    });

    scene.clear();
  }

  renderer?.dispose();

  if (renderer?.domElement.parentElement) {
    renderer.domElement.parentElement.removeChild(renderer.domElement);
  }

  renderer = undefined;
  scene = undefined;
  camera = undefined;
});
</script>

<template>
  <div class="viewer">
    <div ref="containerElement" class="canvas-container"></div>

    <div v-if="loading" class="overlay">
      <div class="spinner"></div>
      <span>Carregando modelo 3D...</span>
    </div>

    <div v-else-if="errorMessage" class="overlay error">
      <span>{{ errorMessage }}</span>
    </div>

    <div v-else class="level-indicator">
      <span class="level-dot"></span>
      Nível: {{ Math.round(fillPercentage) }}%
    </div>
  </div>
</template>

<style scoped>
.viewer {
  position: relative;
  width: 100%;
  height: 480px;
  min-height: 320px;
  overflow: hidden;
  border-radius: 12px;
  background: #f4f8fc;
}

.canvas-container {
  width: 100%;
  height: 100%;
}

.canvas-container :deep(canvas) {
  display: block;
  width: 100%;
  height: 100%;
}

.overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 12px;
  padding: 24px;
  background: rgb(244 248 252 / 92%);
  color: #52657d;
  font-size: 13px;
  text-align: center;
}

.overlay.error {
  color: #b91c1c;
}

.spinner {
  width: 30px;
  height: 30px;
  border: 3px solid #d6e8f3;
  border-top-color: #0785b7;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.level-indicator {
  position: absolute;
  right: 16px;
  bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 12px;
  border: 1px solid #dce8f2;
  border-radius: 20px;
  background: rgb(255 255 255 / 90%);
  color: #172b4d;
  font-size: 12px;
  font-weight: 700;
  pointer-events: none;
}

.level-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #159fe8;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 600px) {
  .viewer {
    height: 360px;
  }
}
</style>
